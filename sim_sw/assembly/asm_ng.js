/*
 *  Copyright 2015-2023 Saul Alonso Monsalve, Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos, Juan Banga Pardo
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


//
// Management of JSON object (see README_ng.md for more information)
//

function wsasm_new_objElto ( base_elto )
{
        var elto = {
		       comments:     [], // need_in_memory as comments: array of string
		       labels:       [],
		       track_source: [], // need_in_memory as source_tracking: array of string

                       seg_name:     '',
                       datatype:     '', // datatype
                       byte_size:    0,  // size(datatype) in bytes
                       value:        0,

                       binary:               '',
                       firm_reference:       null,
                       firm_reference_index: -1,
                       pending:              null
                   } ;

        if (null != base_elto) {
	    elto.seg_name  = base_elto.seg_name ;
	    elto.datatype  = base_elto.datatype ;
            elto.byte_size = base_elto.byte_size ;
        }

        return elto ;
}


//
//  (1/3) Prepare context for compiling and loading   (see README_ng.md for more information)
//
//  Auxiliar function tree for wsasm_prepare_context ( CU_data, asm_source )
//   * wsasm_prepare_context_firmware           ( context, CU_data )
//   * wsasm_prepare_context_pseudoinstructions ( context, CU_data )
//

function wsasm_prepare_context_firmware ( context, CU_data )
{
           let elto = null ;
	   let aux  = null ;
           let start_bit = 0 ;
           let stop_bit  = 0 ;
           let lower_bit = 0 ;
           let w_n_bits  = 0 ;
           let w_index   = 0 ;
           let n_bits    = 0 ;

	   // Fill firmware
	   for (let i=0; i<CU_data.firmware.length; i++)
           {
		aux = CU_data.firmware[i];

	   	if (typeof context.firmware[aux.name] === "undefined") {
	   	    context.firmware[aux.name] = [] ;
		}

                // initial elto fields...
                elto = {} ;

                elto.name                = aux.name ;
		elto.nwords              = parseInt(aux.nwords) ;
		elto.co                  = '' ;
		elto.cop                 = '' ;
		elto.fields              = [] ;
		elto.signature           = aux.signature ;
		elto.signature_type      = aux.name ;
		elto.signature_size      = [] ;
		elto.isPseudoinstruction = false ;

		if (typeof aux.co     !== "undefined")         elto.co     = aux.co ;
		if (typeof aux.cop    !== "undefined")         elto.cop    = aux.cop ;
		if (typeof aux.fields !== "undefined")         elto.fields = aux.fields ;
		if (typeof aux.signatureUser !== "undefined")  elto.signature_type = aux.signatureUser ;

                // asm_start/asm_stop bit...
		elto.signature_size.push(elto.co.length) ;
                for (let j=0; j<elto.fields.length; j++)
                {
                     // initial values...
                     start_bit  = parseInt(elto.fields[j].startbit) ;
                     stop_bit   = parseInt(elto.fields[j].stopbit) ;

                     // translate from startbit/stop_bit to asm_start_bit/asm_stop_bit...
                     lower_bit = Math.min(start_bit, stop_bit) ;
                     w_n_bits  = WORD_BYTES * BYTE_LENGTH ;
                     w_index   = ~~(lower_bit / w_n_bits) ;
                     start_bit = w_index * 2 * w_n_bits + w_n_bits - 1 - start_bit ; // w_index*64+32-1 - start_bit 
                     stop_bit  = w_index * 2 * w_n_bits + w_n_bits - 1 - stop_bit ;  // w_index*64+32-1 - stop_bit 
                     n_bits    = Math.abs(stop_bit - start_bit) + 1 ;

                     // copy back the computed values
                     elto.fields[j].asm_start_bit = start_bit ;
                     elto.fields[j].asm_stop_bit  = stop_bit ;
                     elto.fields[j].asm_n_bits    = n_bits ;

		     elto.signature_size.push(n_bits) ;
                }

                // TODO: add support for firmware v2

                // add elto to firmware
	   	context.firmware[aux.name].push(elto) ;
	   }

	   return context ;
}

function wsasm_prepare_context_pseudoinstructions ( context, CU_data )
{
           let elto    = null ;
	   let initial = null ;
	   let finish  = null ;

	   // Fill pseudoinstructions
	   for (i=0; i<CU_data.pseudoInstructions.length; i++)
	   {
		initial = CU_data.pseudoInstructions[i].initial ;
		finish  = CU_data.pseudoInstructions[i].finish ;

		if (typeof context.pseudoInstructions[initial.name] === "undefined")
                {
	 	    context.pseudoInstructions[initial.name] = 0 ;
		    if (typeof context.firmware[initial.name] === "undefined") {
		        context.firmware[initial.name] = [] ;
		    }
		}

		context.pseudoInstructions[initial.name]++;

                // initial elto fields...
                elto = {} ;

                elto.name                = initial.name ;
	        elto.fields              = [] ;
	        elto.signature           = initial.signature ;
	        elto.signature_type      = initial.signature.replace(/,/g," ") ;
	        elto.finish              = finish.signature ;
	        elto.isPseudoinstruction = true ;

                if (typeof initial.fields !== "undefined")  elto.fields = initial.fields ;

                // add elto to firmware
                context.firmware[initial.name].push(elto) ;
	   }

	   return context ;
}


//
//  (2/3) Compile assembly to JSON object (see README_ng.md for more information)
//
//  Auxiliar function tree for wsasm_src2obj ( context )
//   * wsasm_src2obj_helper ( context, ret )
//      * wsasm_src2obj_data(context, ret)
//      * wsasm_src2obj_text(context, ret)
//         * wsasm_encode_instruction(context, ret, elto)
//         * wsasm_src2obj_text_instr_op(context, ret, elto)
//         * wsasm_src2obj_text_candidates(context, ret, elto)
//   * wsasm_resolve_pseudo ( context, ret )
//   * wsasm_resolve_labels ( context, ret )
// 

function wsasm_is_ValidTag ( tag )
{
        var tg = tag.trim() ;
        if ("" == tg) {
            return false;
        }

        var ret = isDecimal(tg[0]) ;
        if (ret.isDecimal == true) {
            return false;
        }

        var myRegEx  = /[^a-z,_\d]/i ;
        return !(myRegEx.test(tag)) ;
}


function wsasm_src2obj_data ( context, ret )
{
	   var possible_tag   = "" ;
           var possible_value = "" ;
           var tag            = "" ;
           var acc_cmt        = "" ;
	   var ret1    = null ;
           var elto    = null ;

	   //
	   //  *.data*   |   *.data*
	   //   .text    |    label1: .directive "value"
	   //

           var seg_name = asm_getToken(context) ;
           asm_nextToken(context) ;
           elto = wsasm_new_objElto(null) ;

	   //
	   //   .data    |   .data
	   //  *.text*   |   *label1: .directive "value"*
	   //

	   // Loop while token read is not a segment directive (.text/.data/...) or end_of_file is found
	   while (
                   (! wsasm_is_directive_segment(asm_getToken(context))) &&   // NOT .data/...
                   (! wsasm_isEndOfFile(context))                            // NOT end-of-file
                 )
           {
		   //
		   //  * label1: *
		   //  * label2: *  .word 2, 4
		   //

                   acc_cmt = asm_getComments(context) ;
                   asm_resetComments(context) ;

		   possible_tag = "" ;
		   while (
                           (! wsasm_is_directive_datatype(asm_getToken(context))) &&  // NOT .data/...
                           (! wsasm_isEndOfFile(context))                            // NOT end-of-file
                         )
		   {
                      // tagX
		      possible_tag = asm_getToken(context) ;

                      // CHECK tag
		      if ("TAG" != asm_getTokenType(context))
                      {
                          if ("" == possible_tag) {
                              possible_tag = "[empty]" ;
                          }

			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'NO TAG OR DIRECTIVE') +
                                               "'" + possible_tag + "'") ;
		      }

		      tag = possible_tag.substring(0, possible_tag.length-1);

                      // CHECK tag is not an instruction, is repeated or has an invalid format
   		      if (! wsasm_is_ValidTag(tag)) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'INVALID TAG FORMAT') +
                                               "'" + tag + "'") ;
		      }
		      if (context.firmware[tag]) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                               "'" + tag + "'") ;
		      }
		      if (ret.labels2[tag]) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'REPEATED TAG') +
                                               "'" + tag + "'") ;
		      }

		      // Store tag
                      elto.labels.push(tag) ;

		      // .<datatype> | tagX+1
		      asm_nextToken(context) ;
		   }

		   // check if end of file has been reached
		   if (wsasm_isEndOfFile(context)) {
			break;
                   }

		   //
		   //    label1:
		   //    label2: *.word* 2, 4
		   //

		   elto.datatype = asm_getToken(context) ;

                   if (wsasm_has_datatype_attr(elto.datatype, "numeric"))
                   {
		        //  .word  *2, 4, 0x8F, 'a', 077*
		        //  .float *1.2345*

			// Get value size in bytes
			elto.byte_size = get_datatype_size(elto.datatype) ;

                        // <value> | .<directive>
		        asm_nextToken(context) ;
                        possible_value = asm_getToken(context) ;

			while (!wsasm_is_directive(asm_getToken(context)) && !wsasm_isEndOfFile(context))
                        {
				var label_found = false;

				// Get value
				    ret1   = get_inm_value(possible_value) ;
				var number = ret1.number ;
				if ( (ret1.isDecimal == false) && (ret1.isFloat == false) )
                                {
                                    // CHECK numerical datatype
				    if (".word" !== elto.datatype)
                                    {
					return asm_langError(context,
			                                     i18n_get_TagFor('compiler', 'NO NUMERIC DATATYPE') +
                                                             "'" + possible_value + "'") ;
				    }

                                    // CHECK valid label
				    if (! wsasm_is_ValidTag(possible_value)) {
					 return asm_langError(context,
							      i18n_get_TagFor('compiler', 'INVALID TAG FORMAT') +
                                                              "'" + possible_value + "'") ;
   				    }
				    if (context.firmware[possible_value]) {
					return asm_langError(context,
			                                     i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                                             "'" + possible_value + "'") ;
   				    }

				    number = 0 ;
				    label_found = true ;
                                }

				// Decimal --> binary
			        if (ret1.isDecimal == true)
			   	     a = decimal2binary(number, elto.byte_size*BYTE_LENGTH) ;
			        else a =   float2binary(number, elto.byte_size*BYTE_LENGTH) ;

			        num_bits   = a[0] ;
                                free_space = a[1] ;

				// CHECK size
				if (free_space < 0)
                                {
				    return asm_langError(context,
                                                         i18n_get_TagFor('compiler', 'EXPECTED VALUE') + elto.datatype +
                                                         "' (" + elto.byte_size*BYTE_LENGTH + " bits), " +
                                                         i18n_get_TagFor('compiler', 'BUT INSERTED') + possible_value +
                                                         "' (" + num_bits.length + " bits) " +
                                                         i18n_get_TagFor('compiler', 'INSTEAD') ) ;
				}

				// Label as number (later translation)
				if (label_found)
                                {
                                    elto.pending = {
                                                       type:         "field-data",
						       label:        possible_value,
						       addr:         elto.seg_ptr,
						       start_bit:    0,
						       stop_bit:     WORD_BYTES*BYTE_LENGTH-1,
						       n_bits:       WORD_BYTES*BYTE_LENGTH,
						       rel:          false,
						       labelContext: asm_getLabelContext(context)
                                                   } ;
				}

				// Add ELTO
                                elto.seg_name = seg_name ;
				elto.track_source.push(possible_value) ;
		                elto.comments.push(acc_cmt) ;
			        elto.value    = number ;

				ret.obj.push(elto) ;
                                elto = wsasm_new_objElto(elto) ; // new elto, same datatype


				// optional ','
				asm_nextToken(context) ;
				if ("," == asm_getToken(context)) {
				    asm_nextToken(context) ;
                                }

			        if ( wsasm_is_directive(asm_getToken(context)) ||
                                     ("TAG" == asm_getTokenType(context)) ||
                                     ("." == asm_getToken(context)[0]) )
                                {
				      break ; // end loop, already read token (tag/directive)
                                }

                                // <value> | .<directive>
				possible_value = asm_getToken(context) ;
                        }
                   }

                   else if (wsasm_has_datatype_attr(elto.datatype, "space"))
                   {
		        //   .space *20*
		        //   .zero  *20*

                        // <value>
		        asm_nextToken(context) ;
                        possible_value = asm_getToken(context) ;

			// CHECK valid space argument
			ret1 = isDecimal(possible_value) ;
			possible_value = ret1.number ;
                        if (ret1.isDecimal == false) {
			    return asm_langError(context,
			                         i18n_get_TagFor('compiler', 'NO NUMBER OF BYTES') +
                                                 "'" + possible_value + "'") ;
		        }
			if (possible_value < 0) {
			     return asm_langError(context,
			                          i18n_get_TagFor('compiler', 'NO POSITIVE NUMBER') +
                                                  "'" + possible_value + "'") ;
			}

                        var byte_val = '0x0' ;
			if (".zero" != elto.datatype)
                             byte_val = '_' ;

			// ELTO: spaces/zeroes
                        elto.seg_name  = seg_name ;
			elto.track_source.push(byte_val) ;
			elto.comments.push(acc_cmt) ;
		        elto.byte_size = possible_value ;
			elto.value     = byte_val ;

			ret.obj.push(elto) ;
			elto = wsasm_new_objElto(null) ;

			asm_nextToken(context) ;
                   }

                   else if (wsasm_has_datatype_attr(elto.datatype, "align"))
                   {
		        //   .align  *2*
		        //   .balign *4*

                        // <value>
		        asm_nextToken(context) ;
                        possible_value = asm_getToken(context) ;

			// CHECK if number
			ret1 = isDecimal(possible_value) ;
			possible_value = ret1.number ;
			if ( (ret1.isDecimal == false) && (possible_value >= 0) )
                        {
			     return asm_langError(context,
			                          i18n_get_TagFor('compiler', 'INVALID ALIGN VALUE') +
                                                  "'" + possible_value + "'. " +
			                          i18n_get_TagFor('compiler', 'REMEMBER ALIGN VAL')) ;
		        }

			// Calculate offset
                        var align_offset = parseInt(possible_value) ;  // .balign
                        if (".align" == elto.datatype) {
                            align_offset = Math.pow(2, align_offset) ; // .align
		        }

			// ELTO: spaces/zeroes
                        elto.seg_name  = seg_name ;
			elto.track_source.push('.align ' + possible_value) ;
			elto.comments.push(acc_cmt) ;
		        elto.byte_size = align_offset ;
			elto.value     = possible_value ;

                        ret.obj.push(elto) ;
                        elto = wsasm_new_objElto(null) ;

			asm_nextToken(context) ;
                   }

                   else if (wsasm_has_datatype_attr(elto.datatype, "string"))
                   {
		        //  .ascii  * "hola", " mundo\n" *
		        //  .asciiz * "hola mundo" *
		        //  .string * "hola mundo" *

                        // <value> | .<directive>
		        asm_nextToken(context) ;
                        possible_value = asm_getToken(context) ;

                        // CHECK valid string
                        ret1 = treatControlSequences(possible_value) ;
			if (true == ret1.error) {
			    return asm_langError(context, ret1.string);
		        }
                        possible_value = ret1.string ;

			while (!wsasm_is_directive(asm_getToken(context)) && !wsasm_isEndOfFile(context))
                        {
				// CHECK string
				if ("\"" !== possible_value[0]) {
			            return asm_langError(context,
			                                 i18n_get_TagFor('compiler', 'NO QUOTATION MARKS') +
                                                         "'" + possible_value + "'") ;
			        }
				if ("\"" !== possible_value[possible_value.length-1]) {
			            return asm_langError(context,
			                                 i18n_get_TagFor('compiler', 'NOT CLOSED STRING')) ;
			        }
				if ("" == possible_value) {
			            return asm_langError(context,
			                                 i18n_get_TagFor('compiler', 'NOT CLOSED STRING')) ;
			        }
		                if ("STRING" != asm_getTokenType(context)) {
			            return asm_langError(context,
			                                 i18n_get_TagFor('compiler', 'NO QUOTATION MARKS') +
                                                         "'" + possible_value + "'") ;
			        }

				// process characters of the string
                                elto.seg_name  = seg_name ;
				elto.track_source.push(possible_value) ;
				elto.comments.push(acc_cmt) ;
			        elto.value = [] ;
                                for (i=0; i<possible_value.length; i++)
                                {
                                        if (possible_value[i] == "\"") {
                                            continue;
                                        }

                                        num_bits = possible_value.charCodeAt(i) ;
			                elto.value.push(num_bits) ;
                                }
                                if (".asciiz" == elto.datatype) {
                                     elto.value.push(0) ;
                                }
				elto.byte_size = elto.value.length ;

				ret.obj.push(elto) ;
				elto = wsasm_new_objElto(elto) ;


				// optional ','
				asm_nextToken(context);

				if ("," == asm_getToken(context)) {
				    asm_nextToken(context);
			        }

			        if ( wsasm_is_directive(asm_getToken(context)) || ("TAG" == asm_getTokenType(context)) || "." == asm_getToken(context)[0] )
				     break ; // end loop, already read token (tag/directive)

                                // <value> | .<directive>
				possible_value = asm_getToken(context);
                                ret1 = treatControlSequences(possible_value) ;
				if (true == ret1.error) {
				    return asm_langError(context, ret1.string);
			        }
                                possible_value = ret1.string ;
                        }
		   }
		   else
		   {
                        // CHECK datatype
			return asm_langError(context,
				             i18n_get_TagFor('compiler', 'UNEXPECTED DATATYPE') +
                                             "'" + elto.datatype + "'") ;
		   }
           }

	   // Return ret
           return ret ;
}


function wsasm_encode_instruction ( context, ret, elto )
{
           // .../63/31(MSB) ..................... 0(LSB)
           //                      ^         ^
           //                 start_bit  stop_bit
           var start_bit = 0 ;
           var stop_bit  = 0 ;
           var n_bits    = 0 ;
           var value       = 0 ;
           var val_encoded = "" ;
           var arr_encoded = "" ;
           var ret1      = null ;
           var candidate = null ;

           // prepare val_encoded...
           val_encoded = "0".repeat(elto.byte_size * BYTE_LENGTH) ;
           arr_encoded = val_encoded.split('');

           // (1) Instruction, copy 'co' field...
           candidate = elto.firm_reference[elto.firm_reference_index] ;

	   for (let i=0; i<candidate.co.length; i++) {
		arr_encoded[i] = candidate.co[i] ;
	   }

           // (2) Fields, copy values...
           //     Example:
           //     * elto.value.signature_type = [ 'li', *'reg', 'inm'* ]
           //     * candidate.fields = [ {name: 'r1', type: 'reg', asm_start_bit: 0, asm_stop_bit: 5}, {...} ]
           for (let j=0; j<candidate.fields.length; j++)
           {
                // start/stop bit...
                start_bit = candidate.fields[j].asm_start_bit ;
                stop_bit  = candidate.fields[j].asm_stop_bit ;
                n_bits    = candidate.fields[j].asm_n_bits ;

                // value...
                if ("inm" == elto.value.signature_type[j+1])
                {
			 ret1 = get_inm_value(elto.value.fields[j]) ;

			 if (ret1.isDecimal)
			      a = decimal2binary(ret1.number, n_bits) ;
			 else if (ret1.isFloat)
                              a =   float2binary(ret1.number, n_bits) ;
                         else a = [ 0, -1 ] ; // TODO: pending = {...} and continue if inm is label 

			 value = a[0] ;
                         if (a[1] < 0)
                         {
			     return asm_langError(context,
						  i18n_get_TagFor('compiler', 'EXPECTED VALUE') + 'immediate' +
						  "' (" + n_bits + " bits), " +
						  i18n_get_TagFor('compiler', 'BUT INSERTED') + elto.value.fields[i-1] +
						  "' (" + value.length + " bits) " +
						  i18n_get_TagFor('compiler', 'INSTEAD') ) ;
                         }

			 value = value.padStart(n_bits, '0') ;
                }
                else if ("reg" == elto.value.signature_type[j+1])
                {
                         value = elto.value.fields[j] ;
                         value = context.registers[value] ;
			 value = (value >>> 0).toString(2) ;
			 value = value.padStart(n_bits, '0') ;
                }
                else if ("(reg)" == elto.value.signature_type[j+1])
                {
                         value = elto.value.fields[j] ;
                         value = value.replace('(', '').replace(')', '') ;
                         value = context.registers[value] ;
			 value = (value >>> 0).toString(2) ;
			 value = value.padStart(n_bits, '0') ;
                }
                else if ("address" == elto.value.signature_type[j+1])
                {
                         elto.pending = {
                                           type:         "field-instruction",
                                           label:        elto.value.fields[j],
                                           addr:         0,
                                           start_bit:    start_bit,
                                           stop_bit:     stop_bit,
                                           n_bits:       n_bits,
                                           rel:          false,
					   labelContext: asm_getLabelContext(context)
                                        } ;

                         continue ; // no field to add -> skip add field
                }
           //   else if ("..." == elto.value.signature_type[j+1])
           //   {
           //        TODO: more types of fields ??
           //   }
                else
                {
                         // TODO: this is a sink case... Should be error if not field type is detected ??
			 value = "0".padStart(n_bits, '0') ;
                }

                // add field...
                for (var k=start_bit; k<=stop_bit; k++) {
                     arr_encoded[k] = value[k-start_bit] ;
                }
           }

           return arr_encoded.join('') ;
}

function wsasm_src2obj_text_get_nbits_for ( context, type, value )
{
           var b = WORD_BYTES * BYTE_LENGTH ;

           if ("register" == type) {
	       return context.registers[value].toString(2).length ;
           }

           if ("immediate" == type)
           {
               var a = null ;
	       var ret1 = get_inm_value(value) ;

	       if (ret1.isDecimal)
		    a = decimal2binary(ret1.number, b) ;
	       else if (ret1.isFloat)
	            a =   float2binary(ret1.number, b) ;
	       else return b ;

	       return a[0].length ;
           }

           return b ;
}

function wsasm_src2obj_text_instr_op ( context, ret, elto )
{
           var opx  = "" ;
           var ret1 = null ;
           var possible_inm = 0 ;

	   asm_nextToken(context) ;
	   opx = asm_getToken(context) ;

	   while (
		   (typeof context.firmware[opx] === "undefined") &&          // NOT instruction
		   (! wsasm_is_directive_segment(asm_getToken(context))) &&   // NOT .data/....
		   ("TAG" != asm_getTokenType(context)) &&                    // NOT label:
		   (! wsasm_isEndOfFile(context)) &&                          // NOT end-of-file
	           (elto.value.fields.length < 100)                           // NOT 100+ fields already stored...
		 )
	   {
              // register -> $0, x0, ...
	      if (typeof context.registers[opx] != "undefined")
              {
	          elto.value.fields.push(opx) ;
	          elto.value.signature_type.push('reg') ;
	          elto.value.signature_size.push(wsasm_src2obj_text_get_nbits_for(context, "register", opx)) ;

                  // next operand...
	          asm_nextToken(context) ;
	          opx = asm_getToken(context) ;
                  continue ;
              }

              // (register) -> *(*x0)
	      if ('(' == opx)
              {
                  // (*x0*)
	          asm_nextToken(context) ;
	          var reg_name = asm_getToken(context) ;

                  // CHECK register name
	          if (typeof context.registers[reg_name] == "undefined")
                  {
		     return asm_langError(context,
                                          i18n_get_TagFor('compiler', 'EXPECTED (REG)') +
                                                          "'" + reg_name + "'") ;
                  }

                  // (x0*)*
	          asm_nextToken(context) ;
	          opx = asm_getToken(context) ;

                  // CHECK missing )
	          if (')' != opx)
                  {
		     return asm_langError(context,
                                          i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
                  }

	          elto.value.fields.push('(' + reg_name + ')') ;
	          elto.value.signature_type.push('(reg)') ;
	          elto.value.signature_size.push(wsasm_src2obj_text_get_nbits_for(context, "register", reg_name)) ;

                  // next operand...
	          asm_nextToken(context) ;
	          opx = asm_getToken(context) ;
                  continue ;
              }

              // *immediate*
              // *immediate*(reg)
              // *immediate* +/- immediate
	      ret1 = get_inm_value(opx) ;
	      if ( (ret1.isDecimal) || (ret1.isFloat) )
              {
                  possible_inm = opx ;
	          asm_nextToken(context) ;
	          opx = asm_getToken(context) ;

		  // 0x12345*(*x0)
                  if ('(' == opx)
                  {
                        // TODO: check if 3.14(x0) -> error because float is not an offset...

			// 0x12345(*x0*)
			asm_nextToken(context) ;
			var reg_name = asm_getToken(context) ;

                        // CHECK register name
			if (typeof context.registers[reg_name] == "undefined")
			{
			     return asm_langError(context,
						  i18n_get_TagFor('compiler', 'EXPECTED (REG)') +
								  "'" + reg_name + "'") ;
			}

			// 0x12345(x0*)*
			asm_nextToken(context) ;
			opx = asm_getToken(context) ;

                        // CHECK missing )
			if (')' != opx)
			{
			     return asm_langError(context,
						  i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
			}

			elto.value.fields.push(possible_inm) ;
			elto.value.signature_type.push('inm') ;
	                elto.value.signature_size.push(wsasm_src2obj_text_get_nbits_for(context, "immediate", possible_inm)) ;

			elto.value.fields.push('(' + reg_name + ')') ;
			elto.value.signature_type.push('(reg)') ;
	                elto.value.signature_size.push(wsasm_src2obj_text_get_nbits_for(context, "register", reg_name)) ;

			// next operand...
			asm_nextToken(context) ;
			opx = asm_getToken(context) ;
                        continue ;
                  }
		  // *+* immediate
                  else if ('+' == opx)
                  {
                      // TODO: ...

                      // next operand...
	              asm_nextToken(context) ;
	              opx = asm_getToken(context) ;
                      continue ;
                  }
		  // immediate only
                  else
                  {
	              elto.value.fields.push(possible_inm) ;
	              elto.value.signature_type.push('inm') ;
	              elto.value.signature_size.push(wsasm_src2obj_text_get_nbits_for(context, "immediate", possible_inm)) ;
                      continue ;
                  }

              } /* </immediate> */


              // TODO: other possible fields if needed...
              // if (<other type of field)
              // {
              //      ...
              //      continue ;
              // }


              // none of the former possible fields -> possible label
              if (
		    (typeof context.firmware[opx] === "undefined") &&          // NOT instruction
		    (! wsasm_is_directive_segment(asm_getToken(context))) &&   // NOT .data/....
		    ("TAG" != asm_getTokenType(context))                       // NOT label:
                 )
              {
	          elto.value.fields.push(opx) ;
	          elto.value.signature_type.push('address') ;
	          elto.value.signature_size.push(wsasm_src2obj_text_get_nbits_for(context, "immediate", opx)) ;

		  // next operand...
		  asm_nextToken(context) ;
		  opx = asm_getToken(context) ;
                  continue ;
              }

	   }

	   // CHECK: More than 100 fields? really? umm, might be an error...
	   if (elto.value.fields.length > 100)
	   {
	       return asm_langError(context,
				    i18n_get_TagFor('compiler', 'NOT MATCH MICRO')    + "<br>" +
				    i18n_get_TagFor('compiler', 'REMEMBER I. FORMAT') + elto.value.instruction + ". " +
				    i18n_get_TagFor('compiler', 'CHECK MICROCODE')) ;
	   }

           // Return ret
           return ret ;
}

function wsasm_src2obj_text_getDistance ( elto_firm_reference_i, elto_value )
{
           // get candidate signature_type and signature_size...
           var candidate_type_as_string1 = elto_firm_reference_i.signature_type ;
           var candidate_type_as_string2 = elto_firm_reference_i.signature_type.replace('address', 'inm') ;
           var candidate_size_as_intarr  = elto_firm_reference_i.signature_size ;

           // get elto signature_type and signature_size...
           var signature_type_as_string = elto_value.signature_type.join(' ') ;
           var signature_size_as_intarr = elto_value.signature_size ;

           // if candidate has not the same types as expected then return is NOT candidate
           if (
                 (candidate_type_as_string1 != signature_type_as_string) &&
                 (candidate_type_as_string2 != signature_type_as_string)
              )
           {
                return -1 ;
           }

           // if candidate is smaller than expected then return is NOT candidate
           var distance = 0 ;
           for (let j=0; j<candidate_size_as_intarr.length; j++)
           {
                if (candidate_size_as_intarr[j] < signature_size_as_intarr[j]) {
                    return -1 ;
                }

                distance = distance + (candidate_size_as_intarr[j] - signature_size_as_intarr[j]) ;
           }

           return distance ;
}

function wsasm_src2obj_text_candidates ( context, ret, elto )
{
           var candidates = 0 ;
           var distance   = 0 ;

           // for each candidate, check if can be used...
           elto.firm_reference_distance = -1 ;
           elto.firm_reference_index    =  0 ;
           for (var i=0; i<elto.firm_reference.length; i++)
           {
                distance = wsasm_src2obj_text_getDistance(elto.firm_reference[i], elto.value) ;
                if (distance < 0) {
                    continue ;
                }

                candidates++ ;
                if ( (elto.firm_reference_distance < 0) ||
                     (elto.firm_reference_distance > distance) )
                {
                    elto.firm_reference_distance = distance ;
                    elto.firm_reference_index    = i ;
                }
           }

	   // CHECK: elto signature* match at least one firm_reference
	   if (0 == candidates)
	   {
	       return asm_langError(context,
				    i18n_get_TagFor('compiler', 'NOT MATCH MICRO')    + "<br>" +
				    i18n_get_TagFor('compiler', 'REMEMBER I. FORMAT') + signature_type_as_string + ". " +
				    i18n_get_TagFor('compiler', 'CHECK MICROCODE')) ;
	   }

           // update instruction size for multi-word instructions (e.g.: 'la address' in 2 words)
           elto.byte_size = elto.firm_reference[elto.firm_reference_index].nwords * WORD_BYTES ;

           // Return ret
           return ret ;
}

function wsasm_src2obj_text ( context, ret )
{
	   var possible_tag   = "" ;
           var possible_value = "" ;
	   var possible_inst  = "" ;
           var tag     = "" ;
           var acc_cmt = "" ;
           var elto    = null ;

	   //
	   //  *.text*   |  *.text*
	   //   .data    |    label1: instr op1 op2 op3
	   //

           var seg_name = asm_getToken(context) ;
           asm_nextToken(context) ;
           elto = wsasm_new_objElto(null) ;

	   //
	   //   .text    |   .text
	   //  *.data*   |   *label1: instr op1 op2 op3*
	   //

	   // Loop while token read is not a segment directive (.text/.data/...) or end_of_file is found
	   while (
                   (! wsasm_is_directive_segment(asm_getToken(context))) &&   // NOT .data/...
                   (! wsasm_isEndOfFile(context))                            // NOT end-of-file
                 )
           {
		   //
		   //  * label1: *
	           //  * label2: *  instr op1 op2 op3
		   //

                   acc_cmt = asm_getComments(context) ;
                   asm_resetComments(context) ;

		   possible_tag = "" ;
		   while (
                           (typeof context.firmware[asm_getToken(context)] === "undefined") &&  // NOT instruction
                           (! wsasm_isEndOfFile(context))                                       // NOT end-of-file
                         )
		   {
                      // tagX
		      possible_tag = asm_getToken(context) ;

                      // CHECK tag
		      if ("TAG" != asm_getTokenType(context))
                      {
                          if ("" == possible_tag) {
                              possible_tag = "[empty]" ;
                          }

			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'NO TAG, DIR OR INS') +
                                               "'" + possible_tag + "'") ;
		      }

		      tag = possible_tag.substring(0, possible_tag.length-1);

                      // CHECK valid tag
   		      if (! wsasm_is_ValidTag(tag)) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'INVALID TAG FORMAT') +
                                               "'" + tag + "'") ;
		      }
		      if (context.firmware[tag]) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                               "'" + tag + "'") ;
		      }
		      if (ret.labels2[tag]) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'REPEATED TAG') +
                                               "'" + tag + "'") ;
		      }

		      // Store tag
                      elto.labels.push(tag) ;

		      // .<datatype> | tagX+1
		      asm_nextToken(context) ;
		   }

		   // check if end of file has been reached
		   if (wsasm_isEndOfFile(context)) {
			break;
                   }

		   //
		   //    label1:
	           //    label2:   *instr* op1 op2 op3
		   //

	           possible_inst  = asm_getToken(context) ;
                   elto.seg_name  = seg_name ;
		   elto.datatype  = "instruction" ;
                   elto.byte_size = WORD_BYTES ;
		   elto.value     = {} ;

		   elto.value.instruction    = possible_inst ;
                   elto.firm_reference       = context.firmware[possible_inst] ;
		   elto.value.fields         = [] ;
		   elto.value.signature_type = [ possible_inst ] ;
		   elto.value.signature_size = [ elto.firm_reference[0].co.length ] ;

		   //
		   //    label1:
	           //    label2:    instr  *op1, op2 op3*
		   //

                   ret = wsasm_src2obj_text_instr_op(context, ret, elto) ;
		   if (ret.error != null) {
		       return ret;
		   }

                   // Find candidate from firm_reference
                   ret = wsasm_src2obj_text_candidates(context, ret, elto) ;
		   if (ret.error != null) {
		       return ret;
		   }

		   // ELTO: instruction + fields
		   elto.source = elto.value.instruction + ' ' + elto.value.fields.join(' ') ;
                   elto.binary = wsasm_encode_instruction(context, ret, elto) ;
		   elto.comments.push(acc_cmt) ;
		   elto.track_source.push(elto.source) ;

		   ret.obj.push(elto) ;
		   elto = wsasm_new_objElto(elto) ; // new elto, same datatype
           }

	   // Return ret
           return ret ;
}


function wsasm_src2obj_helper ( context, ret )
{
	  ret.data_found = false;
	  ret.text_found = false;

          //
          // .segment
          // ...
          //
          asm_nextToken(context) ;
          while (!wsasm_isEndOfFile(context))
          {
	       var segname = asm_getToken(context);

               // CHECK segment name
	       if (typeof ret.seg[segname] === "undefined")
               {
		   return asm_langError(context,
		                        i18n_get_TagFor('compiler', 'INVALID SEGMENT NAME') +
                                        "'" + segname + "'") ;
	       }

	       // Compile .data and check errors
	       if ("data" == ret.seg[segname].kindof) {
		   ret = wsasm_src2obj_data(context, ret);
		   ret.data_found = true;
	       }

	       if (ret.error != null) {
		   return ret;
	       }

	       // Compile .text and check errors
	       if ("text" == ret.seg[segname].kindof) {
		   ret = wsasm_src2obj_text(context, ret);
		   ret.text_found = true;
	       }

	       if (ret.error != null) {
		   return ret;
	       }
	 }

	 return ret;
}


function wsasm_resolve_pseudo ( context, ret )
{
         // TODO[3]: replace pseudoinstruction with the instructions(s)...

	 return ret;
}


function wsasm_resolve_labels ( context, ret )
{
         var seg_name = '' ;
         var seg_ptr  = 0 ;
         var elto_ptr = 0 ;
         var padding  = 0 ;
         var elto_align = 4 ;
         var tag = '' ;
         var last_assigned = {} ;

         for (var i=0; i<ret.obj.length; i++)
         {
              // get starting address of segment
              seg_name = ret.obj[i].seg_name ;
              seg_ptr  = ret.seg[seg_name].begin ;
              if (typeof last_assigned[seg_name] == "undefined") {
                    last_assigned[seg_name] = seg_ptr ;
              }

              // if .align X then address of next elto must be multiple of 2^X
              if (wsasm_has_datatype_attr(ret.obj[i].datatype, "align"))
              {
                     elto_align = ret.obj[i].byte_size ;
                     if (elto_align > 1) {
                         padding  = elto_align - (last_assigned[seg_name] % elto_align) ;
                         last_assigned[seg_name] += padding ;
                     }

                     continue ;
              }

              // get starting address of next elto
              elto_ptr = last_assigned[seg_name] ;

              ret.obj[i].seg_ptr     = seg_ptr ;             // starting address of the .data/.kdata segment
              ret.obj[i].elto_ptr    = elto_ptr ;
              ret.obj[i].byte_offset = elto_ptr - seg_ptr ;  // offset within .data segment
              ret.obj[i].padding     = 0 ;

              // add labels2...
              for (var j=0; j<ret.obj[i].labels.length; j++) {
                     tag = ret.obj[i].labels[j] ;
		     ret.labels2[tag] = "0x" + elto_ptr.toString(16) ;
              }

              // machine_code and total size...
              // https://stackoverflow.com/questions/19608845/understanding-assembly-mips-align-and-memory-addressing
              if (wsasm_has_datatype_attr(ret.obj[i].datatype, "string")) {
                    ret.obj[i].padding = elto_align - (ret.obj[i].byte_size % elto_align) ;
              }
              else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "space")) {
                    ret.obj[i].padding = elto_align - (ret.obj[i].byte_size % elto_align) ;
              }

              // update last address of segment...
              last_assigned[seg_name] = elto_ptr + ret.obj[i].byte_size + ret.obj[i].padding ;
         }

         // review the pending labels (forth and back)
         var elto  = null ;
         var value = 0 ;
         var arr_encoded = null ;
         for (var i=0; i<ret.obj.length; i++)
         {
              elto = ret.obj[i] ;
              if (elto.pending != null)
              {
                  value = elto.pending.label ;
                  value = parseInt(ret.labels2[value]) ;
                  if ("field-data" == elto.pending.type) {
                      elto.value = value ;
                  }

               // TODO: address-abs vs address-rel
               // value = (address-abs) ? value : value - address_this_instruction + 4;

		  value = (value >>> 0).toString(2) ;
		  value = value.padStart(elto.pending.n_bits, '0') ;
                  arr_encoded = elto.binary.split('') ;
		  for (var k=elto.pending.start_bit; k<=elto.pending.stop_bit; k++) {
		       arr_encoded[k] = value[k-elto.pending.start_bit] ;
		  }
                  elto.binary = arr_encoded.join('') ;

                  // TODO[2]: review the pending labels (forth and back)
              }
         }

         // build reverse lookup hash labels (hash labels2 -> key)
         for (var key in ret.labels2) {
              ret.labels2_rev[ret.labels2[key]] = key ;
         }

         // build reverse lookup hash segments (hash segname -> properties)
         for (var skey in ret.seg) {
              ret.seg_rev.push({ 'begin': parseInt(ret.seg[skey].begin), 'name': skey }) ;
         }

         return ret ;
}


//
//  (3/3) Load JSON object to main memory (see README_ng.md for more information)
//
//  Auxiliar function tree for wsasm_obj2mem ( ret )
//   * wsasm_writememory_if_word ( mp, gen, track_source, track_comments )
//   * wsasm_writememory_and_accumulate ( mp, gen, valuebin )
//   * wsasm_writememory_and_accumulate_part ( mp, gen, valuebin, track_source, track_comments )
//   * wsasm_zeropadding_and_writememory ( mp, gen )
//

function wsasm_writememory_if_word ( mp, gen, track_source, track_comments )
{
        // check if a full word is present...
        if (gen.byteWord < WORD_BYTES) {
            return ;
        }

        // write into memory current word...
        var melto = {
                      "value":           gen.machine_code,
                      "source_tracking": gen.track_source,
                      "comments":        gen.comments,
		      "binary":          gen.machine_code,
                      "firm_reference":  gen.firm_reference,
                      "is_assembly":     gen.is_assembly,
                    } ;
        main_memory_set(mp, gen.addr, melto) ;

        // set 'gen' to 'default' values for next word...
        gen.byteWord       =  0 ;
        gen.addr           = '0x' + (parseInt(gen.addr) + WORD_BYTES).toString(16) ;
        gen.machine_code   = '' ;
        gen.track_source   = track_source ;
        gen.comments       = track_comments ;
        gen.firm_reference = null ;
        gen.is_assembly    = false ;
}

function wsasm_writememory_and_accumulate ( mp, gen, valuebin )
{
        wsasm_writememory_if_word(mp, gen, [], []) ;

        gen.machine_code += valuebin ;
        gen.byteWord     += 1 ;
}

function wsasm_writememory_and_accumulate_part ( mp, gen, valuebin, track_source, track_comments )
{
        wsasm_writememory_if_word(mp, gen, track_source, track_comments) ;

        gen.machine_code += valuebin ;
        gen.byteWord     += 1 ;
}

function wsasm_zeropadding_and_writememory ( mp, gen )
{
        if (0 == gen.byteWord) {
            return ;
        }

        // zero-padding...
        var left_bytes = WORD_BYTES - gen.byteWord ;
	for (var k=0; k<left_bytes; k++) {
	     wsasm_writememory_and_accumulate(mp, gen, '0'.repeat(BYTE_LENGTH)) ;
	}

        // write last full word...
        wsasm_writememory_if_word(mp, gen, [], []) ;
}


 /*
  *  Public API (see README_ng.md for more information)
  */

function wsasm_prepare_context ( CU_data, asm_source )
{
           var context = {} ;
	   context.line           	= 1 ;          // here
	   context.error          	= null ;
	   context.i              	= 0 ;          // here
           context.text                 = asm_source ; // here
	   context.tokens         	= [] ;
	   context.token_types    	= [] ;
	   context.t              	= 0 ;          // here
           context.comments             = [] ;
	   context.newlines       	= [] ;
	   context.registers      	= [] ;         // here
	   context.firmware             = {} ;         // here
	   context.pseudoInstructions	= [];          // here
	   context.stackRegister	= null ;

	   // Check arguments
           if (typeof CU_data == "undefined") {
               return { error: 'CU_data is undefined in wsasm_prepare_context\n' } ;
           }

	   // Fill register names
	   for (i=0; i<CU_data.registers.length; i++)
	   {
		if (typeof CU_data.registers[i] === 'undefined') {
                    continue ;
                }
		for (var j=0; j<CU_data.registers[i].length; j++) {
		     context.registers[CU_data.registers[i][j]] = i ;
                }
	   }

	   // Fill firmware
           context = wsasm_prepare_context_firmware(context, CU_data) ;

	   // Fill pseudoinstructions
           context = wsasm_prepare_context_pseudoinstructions(context, CU_data) ;

           // return context
	   return context ;
}

function wsasm_src2obj ( context )
{
           var ret = {} ;
           ret.obj         = [] ;
           ret.mp          = {} ;
  	   ret.seg         = sim_segments ;
           ret.seg_rev     = [] ;
           ret.labels2     = {} ;
           ret.labels2_rev = {} ;
	   ret.labels      = {} ; // [addr] = {name, addr, startbit, stopbit}

	   // Check arguments
           if (typeof context == "undefined") {
               return { error: 'Context is undefined in wsasm_src2obj\n' } ;
           }

           // pass 1: compile raw assembly
           ret = wsasm_src2obj_helper(context, ret) ;
	   if (ret.error != null) {
	         return ret;
	   }

           // pass 2: replace pseudo-instructions
           ret = wsasm_resolve_pseudo(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

	   // pass 3: resolve all labels (translate into addresses)
           ret = wsasm_resolve_labels(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

	   return ret;
}

function wsasm_obj2mem  ( ret )
{
	 var addr      = '' ;
         var n_bytes   = 0 ;
         var valuebin  = '' ;
         var valuebin8 = '' ;

         var seg_name_old    = '' ;
         var seg_name        = '' ;
         var last_assig_word = {} ;

         var gen = {} ;
         gen.byteWord     = 0 ;
         gen.addr         = -1 ;
         gen.machine_code = '' ;
         gen.track_source = [] ;
         gen.comments     = [] ;

         ret.mp = {} ;
         for (var i=0; i<ret.obj.length; i++)
         {
              // (1) flushing if there is some pending data in 'seg_name_old' segment...
              seg_name = ret.obj[i].seg_name ;
	      if (seg_name_old != seg_name)
              {
	          if (seg_name_old != '')
                      wsasm_zeropadding_and_writememory(ret.mp, gen) ;
                  seg_name_old = seg_name ;
	      }

              // ...and update initial word address for this segment if needed...
              if (typeof last_assig_word[seg_name] == "undefined")
              {
                  gen.addr = "0x" + ret.obj[i].elto_ptr.toString(16) ;
                  last_assig_word[seg_name] = gen.addr ;
              }
              gen.addr = last_assig_word[seg_name] ; // recover last saved value if we switch to other segment

              // (2) if .align X then address of next elto must be multiple of 2^X
              if (wsasm_has_datatype_attr(ret.obj[i].datatype, "align"))
              {
                     var elto_align = ret.obj[i].byte_size ;
                     if (elto_align > 1)
                     {
                         var last_assigned = parseInt(gen.addr) + gen.byteWord ;
                         var padding       = elto_align - (last_assigned % elto_align) ;
                         for (var k=0; k<padding; k++) {
                              wsasm_writememory_and_accumulate(ret.mp, gen, '0'.repeat(BYTE_LENGTH)) ;
                         }
                     }

                     // flush current word if needed...
                     wsasm_writememory_if_word(ret.mp, gen, [], []) ;
                     last_assig_word[seg_name] = gen.addr ;

                     continue ;
              }

              // (3) instructions and data...
              gen.track_source.push(...ret.obj[i].track_source) ;   // concate arrays...
              gen.comments = ret.obj[i].comments ;                  // ...but replace existing comments

              if ('instruction' == ret.obj[i].datatype)
              {
                    valuebin = ret.obj[i].binary ;
                    n_bytes  = ret.obj[i].binary.length / BYTE_LENGTH ;
                    for (var j=0; j<n_bytes; j++)
                    {
                         gen.firm_reference = ret.obj[i].firm_reference ;
                         gen.is_assembly    = true ;

                         valuebin8 = valuebin.substr(j*BYTE_LENGTH, BYTE_LENGTH) ;
                         wsasm_writememory_and_accumulate_part(ret.mp, gen, valuebin8,
                                                               ret.obj[i].track_source, ret.obj[i].comments) ;
                    }
              }
              else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "numeric"))
              {
                    n_bytes  = wsasm_get_datatype_size(ret.obj[i].datatype) ;
                    valuebin = (ret.obj[i].value >>> 0).toString(2) ;
                    if (ret.obj[i].value > 0)
                         valuebin = valuebin.padStart(n_bytes*BYTE_LENGTH, '0') ;
                    else valuebin = valuebin.substr(valuebin.length-n_bytes*BYTE_LENGTH, n_bytes*BYTE_LENGTH) ;

                    // next: fill as Little-endian... ;-)
                    for (var j=0; j<n_bytes; j++)
                    {
                         valuebin8 = valuebin.substr(j*BYTE_LENGTH, BYTE_LENGTH) ;
                         wsasm_writememory_and_accumulate_part(ret.mp, gen, valuebin8,
                                                               ret.obj[i].track_source, ret.obj[i].comments) ;
                    }
              }
              else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "string"))
              {
                    for (var j=0; j<ret.obj[i].value.length; j++)
                    {
                         valuebin = ret.obj[i].value[j].toString(2) ;
                         valuebin = valuebin.padStart(BYTE_LENGTH, '0') ;

                         wsasm_writememory_and_accumulate_part(ret.mp, gen, valuebin,
                                                               ret.obj[i].track_source, ret.obj[i].comments) ;
                    }
              }
              else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "space"))
              {
                    valuebin = "0".repeat(BYTE_LENGTH) ; // TO-CHECK: ummm, share the same object for all space is right?

                    for (var j=0; j<ret.obj[i].byte_size; j++)
                    {
                         wsasm_writememory_and_accumulate_part(ret.mp, gen, valuebin,
                                                               ret.obj[i].track_source, ret.obj[i].comments) ;
                    }
              }

              // flush current word if needed...
              wsasm_writememory_if_word(ret.mp, gen, [], []) ;
              last_assig_word[seg_name] = gen.addr ;
         }

         // flushing if there is some pending data
         wsasm_zeropadding_and_writememory(ret.mp, gen) ;

         return ret ;
}

function wsasm_src2mem ( datosCU, text )
{
     var ret     = null ;
     var context = null ;

     try
     {
         context = wsasm_prepare_context(datosCU, text) ;
	 if (context.error != null) {
	     return context;
	 }

         ret = wsasm_src2obj(context) ;
	 if (ret.error != null) {
	     return ret;
	 }

         ret = wsasm_obj2mem(ret) ;
	 if (ret.error != null) {
	     return ret;
	 }
     }
     catch (e)
     {
         console.log("ERROR on 'wsasm_src2mem' function :-(") ;
         console.log("Details:\n " + e) ;
         console.log("Stack:\n"    + e.stack) ;
     }

     return ret ;
}

