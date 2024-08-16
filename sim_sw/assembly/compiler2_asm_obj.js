/*
 *  Copyright 2015-2024 Saul Alonso Monsalve, Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos, Juan Banga Pardo
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


/* jshint esversion: 9 */

//
// General auxiliar functions
//

// Management of JSON object
function wsasm_new_objElto ( base_elto )
{
        var elto = {
		       comments:     [],  // need_in_memory as comments: array of string
		       labels:       [],
		       track_source: [],  // need_in_memory as source_tracking: array of string

                       seg_name:     '',
                       datatype:     '',  // datatype
                       byte_size:     0,  // size(datatype) in bytes
                       value:        '0',
                       format:       '',
                       endian:       'none', // 1 byte: 'none', >1 byte: 'little' | 'big'
                       scrambled:    false,

                       binary:               '',
                       firm_reference:       null,
                       firm_reference_index: -1,
                       pending:              []
                   } ;

        if (null != base_elto) {
	    elto.seg_name  = base_elto.seg_name ;
	    elto.datatype  = base_elto.datatype ;
            elto.byte_size = base_elto.byte_size ;
            elto.endian    = base_elto.endian ;
        }

        return elto ;
}

function wsasm_make_signature_user ( elto, use_as_around )
{
        var offset = elto.signature_type_arr.length - elto.signature_size_arr.length ;

	elto.signature_user = '' ;
	for (let j=0; j<elto.signature_size_arr.length; j++)
        {
	     elto.signature_user = elto.signature_user +
                                   '[ ' +
                                       elto.signature_type_arr[j+offset] + ', ' +
                                       elto.signature_size_arr[j] + use_as_around + ' bits' +
                                   ' ]' ;
	}

	return elto.signature_user ;
}

function wsasm_get_sel_valbin ( value, start_bit, stop_bit )
{
         var sel_start = 0 ;
         var sel_stop  = 0 ;
         var valbin    = 0 ;
         var a = null ;

         if (start_bit > stop_bit) // 31>12
         {
             sel_start = (WORD_LENGTH - 1) - start_bit ; // 0
             sel_stop  = (WORD_LENGTH - 1) - stop_bit ;  // 19
         }
         else // 0>11
         {
             sel_stop  = (WORD_LENGTH - 1) - start_bit ; // 31
             sel_start = (WORD_LENGTH - 1) - stop_bit ;  // 20
         }

         a = dt_get_decimal_value(value) ;
         valbin = parseInt(a.number) ;
         if (valbin < 0)
              valbin = (valbin >>> 0).toString(2) ;
         else valbin = valbin.toString(2).padStart(WORD_LENGTH, '0') ;

         valbin = valbin.substring(sel_start, sel_stop+1) ; // [0:19], [20,31]
         return valbin ;
}

function wsasm_eltoError ( context, elto, msg )
{
         asm_setLabelContext(context, elto.associated_context) ;

         return asm_langError(context, msg) ;
}

function wsasm_get_similar_candidates ( context, elto )
{
         var msg   = "'" + elto.source + "'" ;
         var s_usr = elto.value.signature_user ;

         // if pseudo-instruction then associate it to the related instruction...
         if (typeof elto.associated_pseudo !== "undefined") {
	     msg   = msg + ' (part of pseudoinstruction "' + elto.associated_pseudo.source + '")' ;
             s_usr = "[" + elto.value.instruction + "] " + elto.value.signature_user ;
         }

         // (1) Used element (instruction or pseudo-instruction)...
         msg = i18n_get_TagFor('compiler', 'REMEMBER FORMAT USED') + msg + ": <br>" +
	       "<span class='m-2'>\u2718</span> " + s_usr + "<br>" ;

         // (2) Similar elements...
         msg += i18n_get_TagFor('compiler', 'NOT MATCH FORMAT') + ":<br>" ;
         for (let key in context.firmware)
         {
	      if ( (key.includes(elto.value.instruction)) || (elto.value.instruction.includes(key)) )
	      {
		  for (let k=0; k<context.firmware[key].length; k++) {
		       msg += "<span class='m-1'>\u2714</span> " +
			      context.firmware[key][k].signature_user + "<br>" ;
		  }
	      }
         }
         msg += i18n_get_TagFor('compiler', 'CHECKS') ;

         return msg ;
}

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

        var myRegEx = /[^a-z,_\d]/i ;
        return !(myRegEx.test(tag)) ;
}

function wsasm_order2index_startstop ( start_bit, stop_bit )
{
     // Translate from startbit/stop_bit to asm_start_bit/asm_stop_bit:
     //
     // .../63/31(MSB) ..................... 0(LSB)
     //                      ^         ^
     //                 start_bit  stop_bit

     var lower_bit = 0 ;
     var w_index   = 0 ;
     var n_bits    = 0 ;
     var w_n_bits  = WORD_LENGTH ;
     for (let m=0; m<start_bit.length; m++)
     {
          lower_bit    = Math.min(start_bit[m], stop_bit[m]) ;
          w_index      = ~~(lower_bit / w_n_bits) ;
          start_bit[m] = w_index * 2 * w_n_bits + w_n_bits - 1 - start_bit[m] ; // w_index*64+32-1 - start_bit 
          stop_bit[m]  = w_index * 2 * w_n_bits + w_n_bits - 1 - stop_bit[m] ;  // w_index*64+32-1 - stop_bit 
	  n_bits       = n_bits + Math.abs(stop_bit[m] - start_bit[m]) + 1 ;
     }

     return n_bits ;
}


//
//  (2/3) Compile assembly to JSON object
//
//  Auxiliar function tree for wsasm_src2obj ( context )
//   * wsasm_src2obj_helper  ( context, ret )
//      * wsasm_src2obj_data ( context, ret )
//      * wsasm_src2obj_text ( context, ret )
//         * wsasm_src2obj_text_elto_fields  ( context, ret, elto, pseudo_context )
//           * wsasm_src2obj_text_instr_op_match ( context, ret, elto, atom, parentheses )
//           * wsasm_src2obj_text_ops_getAtom ( context, pseudo_context )
//         * wsasm_find_candidate_and_encode ( context, ret, elto )
//           * wsasm_encode_instruction ( context, ret, elto, candidate )
//             * wsasm_encode_field ( arr_encoded, value, start_bit, stop_bit )
//           * wsasm_find_instr_candidates ( context, ret, elto )
//             * wsasm_src2obj_text_getDistance ( elto_firm_reference_i, elto_value )
//      * wsasm_src2obj_binary ( context, ret )
//   * wsasm_compute_labels ( context, ret, start_at_obj_i )
//   * wsasm_resolve_labels ( context, ret, start_at_obj_i )
//      * wsasm_resolve_labels_elto ( context, ret, elto )
//      * wsasm_get_label_value ( context, ret, elto, label )
//   * wsasm_resolve_pseudo ( context, ret )
//      * wsasm_try_resolve_pseudo ( context, ret, pseudo_elto, pseudo_elto_candidate )
//

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
           elto.seg_name = seg_name ;

	   //
	   //   .data    |   .data
	   //  *.text*   |   *label1: .directive "value"*
	   //

	   // Loop while token read is not a segment directive (.text/.data/...) or end_of_file is found
	   while (
                   (! wsasm_is_directive_segment(asm_getToken(context))) &&   // NOT .data/...
                   (! wsasm_isEndOfFile(context))                             // NOT end-of-file
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
                           (! wsasm_isEndOfFile(context))                             // NOT end-of-file
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
   		      if (wsasm_is_ValidTag(tag) == false) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'INVALID TAG FORMAT') +
                                               "'" + tag + "'") ;
		      }
		      if (context.firmware[tag]) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                               "'" + tag + "'") ;
		      }
		      if (typeof ret.labels_asm[tag] != "undefined") {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'REPEATED TAG') +
                                               "'" + tag + "'") ;
		      }

		      // Store tag
                      elto.labels.push(tag) ;
		      ret.labels_asm[tag] = 0 ;

		      // .<datatype> | tagX+1
		      asm_nextToken(context) ;
		   }

		   elto.associated_context = asm_getLabelContext(context) ;

		   // check if end of file has been reached
		   if (wsasm_isEndOfFile(context))
                   {
		        // ELTO: in case of ending with 'label:' but without data value
                        if (elto.labels.length > 0) {
		            ret.obj.push(elto) ;
                        }

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
			elto.byte_size = wsasm_get_datatype_size(elto.datatype) ;
                        if (elto.byte_size > 1) {
                            elto.endian = context.options.endian ;
                        }

                        // <value> | .<directive>
		        asm_nextToken(context) ;
                        possible_value = asm_getToken(context) ;

			while (
                                (wsasm_is_directive(asm_getToken(context)) == false) &&
                                (wsasm_isEndOfFile(context) == false)
                              )
                        {
				let number   = 0 ;
			        let num_bits = "0" ;

				// Get value
				ret1 = dt_get_imm_value(possible_value) ;
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
				    if (wsasm_is_ValidTag(possible_value) == false) {
					 return asm_langError(context,
							      i18n_get_TagFor('compiler', 'INVALID TAG FORMAT') +
                                                              "'" + possible_value + "'") ;
   				    }
				    if (context.firmware[possible_value]) {
					return asm_langError(context,
			                                     i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                                             "'" + possible_value + "'") ;
   				    }

				    // Label as number (later translation)
                                    elto.pending.push({
                                                         type:         "field-data",
						         label:        possible_value,
						         addr:         elto.seg_ptr,
						         start_bit:    [ 0 ],
						         stop_bit:     [ WORD_BYTES*BYTE_LENGTH-1 ],
						         n_bits:         WORD_BYTES*BYTE_LENGTH,
                                                         value:        0,
						         rel:          false,
						         labelContext: asm_getLabelContext(context),
                                                         field_j:      0
                                                     }) ;
                                }
                                else
                                {
				    number = ret1.number ;

				    // Decimal/Float --> binary
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
                                }

				// Add ELTO
                                elto.seg_name   = seg_name ;
		                elto.source     = possible_value ;
				elto.track_source.push(possible_value) ;
		                elto.comments.push(acc_cmt) ;
			        elto.value      = num_bits ;
                                elto.source_alt = elto.datatype + ' ' + possible_value ;
			        elto.format     = ret1.format ;

				ret.obj.push(elto) ;
                                elto = wsasm_new_objElto(elto) ; // new elto, same datatype


				// optional ','
				asm_nextToken(context) ;
				if ("," == asm_getToken(context)) {
				    asm_nextToken(context) ;
                                }

			        if ( wsasm_is_directive(asm_getToken(context)) ||
                                     ("TAG" == asm_getTokenType(context)) ||
                                     ("."   == asm_getToken(context)[0]) )
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
			if (".zero" != elto.datatype) {
                             byte_val = '_' ;
			}

			// ELTO: spaces/zeroes
                        elto.seg_name   = seg_name ;
			elto.comments.push(acc_cmt) ;
		        elto.byte_size  = possible_value ;
			elto.value      = byte_val ;
  			elto.track_source = Array(ret1.number).fill('_') ;
                        elto.source_alt = elto.datatype + ' ' + possible_value ;

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
                        elto.seg_name   = seg_name ;
			elto.track_source.push('.align ' + possible_value) ;
			elto.comments.push(acc_cmt) ;
		        elto.byte_size  = align_offset ;
			elto.value      = possible_value ;
                        elto.source_alt = elto.datatype + ' ' + possible_value ;

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

			        // ELTO: string
                                elto.seg_name   = seg_name ;
				elto.comments.push(acc_cmt) ;

				// process characters of the string
			        elto.value = [] ;
                                for (let i=0; i<possible_value.length; i++)
                                {
                                     if (possible_value[i] == "\"") {
                                         continue;
                                     }

  				     elto.track_source.push(possible_value[i]) ;
                                     num_bits = possible_value.charCodeAt(i) ;
			             elto.value.push(num_bits) ;
                                }
                                if ([".asciiz", ".string"].includes(elto.datatype)) {
                                     elto.value.push(0) ;
  				     elto.track_source.push('0x0') ;
                                }
				elto.byte_size  = elto.value.length ;
				elto.source     = possible_value ;
                                elto.source_alt = elto.datatype + ' ' + base_replaceAll(possible_value, '\n', '\\n') ;
				
				ret.obj.push(elto) ;
				elto = wsasm_new_objElto(elto) ;


				// optional ','
				asm_nextToken(context);
				if ("," == asm_getToken(context)) {
				    asm_nextToken(context);
			        }

			        if (
                                     wsasm_is_directive(asm_getToken(context)) ||
                                     ("TAG" == asm_getTokenType(context))      ||
                                     ("."   == asm_getToken(context)[0])
                                   )
                                {
				     break ; // end loop, already read token (tag/directive)
                                }

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


function wsasm_encode_field ( arr_encoded, value, start_bit, stop_bit )
{
           var val_i = 0 ;
           for (let m=0; m<=start_bit.length; m++)
           {
                for (let k=start_bit[m]; k<=stop_bit[m]; k++)
                {
                     if (typeof value[val_i] == "undefined") {
                         console.log("wsasm_encode_field: value.length < encode space :-S") ;
                     }

                     arr_encoded[k] = value[val_i] ;
                     val_i++ ;
                }
           }
}

function wsasm_encode_instruction ( context, ret, elto, candidate )
{
           var start_bit = 0 ;
           var stop_bit  = 0 ;
           var n_bits    = 0 ;
           var value       = 0 ;
           var val_encoded = "" ;
           var arr_encoded = "" ;
           var ret1      = null ;
           var bit_size  = 0 ;

           // prepare val_encoded...
           bit_size    = elto.byte_size * BYTE_LENGTH ;
           val_encoded = "0".repeat(bit_size) ;
           arr_encoded = val_encoded.split('');

           // (1) Instruction, copy 'co' and 'cop' field...
           wsasm_encode_field(arr_encoded,
                              candidate.oc.value,  candidate.oc.asm_start_bit,  candidate.oc.asm_stop_bit) ;
           wsasm_encode_field(arr_encoded,
                              candidate.eoc.value, candidate.eoc.asm_start_bit, candidate.eoc.asm_stop_bit) ;

           // (2) Fields, copy values...
           //     Example:
           //     * elto.value.signature_type_arr = [ 'li', *'reg', 'imm'* ]
           //     * candidate.fields = [ {name: 'r1', type: 'reg', asm_start_bit: [0], asm_stop_bit: [5]}, {...} ]
           for (let j=0; j<candidate.fields.length; j++)
           {
                // start/stop bit...
                start_bit = candidate.fields[j].asm_start_bit ;
                stop_bit  = candidate.fields[j].asm_stop_bit ;
                n_bits    = candidate.fields[j].asm_n_bits ;

                // value to be encode...
                if ( ["imm", "(imm)", "address", "(address)"].includes(elto.value.signature_type_arr[j+1]) )
                {
                         value = elto.value.fields[j] ;
                         if ('(' == value[0]) {
                              value = value.replace('(', '').replace(')', '') ;
                         }

			 ret1 = dt_get_imm_value(value) ;
			 if ( (ret1.isDecimal == false) && (ret1.isFloat == false) )
                         {
                              var pinfo = {
                                             type:         "field-instruction",
                                             label:        elto.value.fields[j],
                                             addr:         0,
                                             start_bit:    start_bit,
                                             stop_bit:     stop_bit,
                                             n_bits:       n_bits,
                                             value:        0,
                                             rel:          false,
					     labelContext: asm_getLabelContext(context),
                                             field_j:      j
                                          } ;
                              elto.pending.push(pinfo) ;

                              if (["address", "(address)", "inm", "imm"].includes(elto.value.signature_type_arr[j+1]))
                              {
                                   if (   (typeof candidate.fields[j].address_type != "undefined") &&
                                        ("abs" != candidate.fields[j].address_type) )
                                   {
                                        pinfo.rel = true ;
                                   }
                              }

                              continue ; // no full field to add (label to be resolved) -> skip adding this field
                         }

			 if (ret1.isDecimal)
			      a = decimal2binary(ret1.number, n_bits) ;
			 else a =   float2binary(ret1.number, n_bits) ;

			 value = a[0] ;
                         if (a[1] < 0)
                         {
			     return wsasm_eltoError(context, elto,
						    i18n_get_TagFor('compiler', 'EXPECTED VALUE') + " immediate" +
						    " (" + n_bits + " bits), " +
						    i18n_get_TagFor('compiler', 'BUT INSERTED') + elto.value.fields[i-1] +
						    " (" + value.length + " bits) " +
						    i18n_get_TagFor('compiler', 'INSTEAD') ) ;
                         }

			 value = value.padStart(n_bits, '0') ; // TOCHECK: if negative number, then already filled with '1'...
                }
                else if ( ["reg", "(reg)"].includes(elto.value.signature_type_arr[j+1]) )
                {
                         value = elto.value.fields[j] ;
                         if ('(' == value[0]) {
                              value = value.replace('(', '').replace(')', '') ;
                         }
                         value = context.registers[value] ;
			 value = (value >>> 0).toString(2) ;
			 value = value.padStart(n_bits, '0') ;
                }
                else
                {
                         // TODO: Should be error if not field type is detected ??

                         // this is a sink case...
			 value = "0".padStart(n_bits, '0') ;
                }

                // add field...
                wsasm_encode_field(arr_encoded, value, start_bit, stop_bit) ;
           }

           return arr_encoded.join('') ;
}

function wsasm_src2obj_text_getDistance ( elto_firm_reference_i, elto_value )
{
           // get candidate signature_type and signature_size...
           var candidate_type_as_string = base_replaceAll(elto_firm_reference_i.signature_type_str, 'address', 'imm') ;
           var candidate_size_as_intarr = elto_firm_reference_i.signature_size_arr ;

           // get elto signature_type and signature_size...
           var signature_type_as_string = base_replaceAll(elto_value.signature_type_arr.join(' '), 'address', 'imm') ;
           var signature_size_as_intarr = elto_value.signature_size_arr ;

           // if candidate has not the same types as expected then return is NOT candidate
           if (candidate_type_as_string != signature_type_as_string) {
               return -1 ;
           }

           // if candidate is smaller than expected then return is NOT candidate
           var distance   = 0 ;
           var distance_j = 0 ;
           var offset_j   = 0 ;
           offset_j = candidate_size_as_intarr.length - signature_size_as_intarr.length ;
           for (let j=0; j<candidate_size_as_intarr.length; j++)
           {
                distance_j = candidate_size_as_intarr[j+offset_j] - signature_size_as_intarr[j] ;
                if (distance_j < 0) {
                    return -1 ;
                }

                distance = distance + distance_j ;
           }

           return distance ;
}

function wsasm_find_instr_candidates ( context, ret, elto )
{
           var candidates = 0 ;
           var distance   = 0 ;

           // for each candidate, check if can be used...
           elto.firm_reference_distance = -1 ;
           elto.firm_reference_index    =  0 ;
           for (let i=0; i<elto.firm_reference.length; i++)
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
	   if (0 == candidates) {
               var msg = wsasm_get_similar_candidates(context, elto) ;
               return wsasm_eltoError(context, elto, msg) ;
	   }

           // update instruction size for multi-word instructions (e.g.: 'la address' in 2 words)
           elto.byte_size = elto.firm_reference[elto.firm_reference_index].nwords * WORD_BYTES ;

           // Return ret
           return ret ;
}

function wsasm_src2obj_text_instr_op_match ( context, ret, elto, atom, parentheses )
{
	   var opx = '' ;

           // if atom is register -> $0, x0, ...
	   if (typeof context.registers[atom] != "undefined")
           {
	       if (parentheses) {
	           elto.value.fields.push('(' + atom + ')') ;
	           elto.value.signature_type_arr.push('(reg)') ;
	       }
	       else {
	           elto.value.fields.push(atom) ;
	           elto.value.signature_type_arr.push('reg') ;
	       }
	       elto.value.signature_size_arr.push(context.registers[atom].toString(2).length) ;

	       // return ok
	       ret.error = null ;
	       return ret ;
           }

           // if atom is immediate -> 0x123, 12, 3.14, ...
	   var ret1 = dt_get_imm_value(atom) ;
	   if ( (ret1.isDecimal) || (ret1.isFloat) )
           {
                 var a = null ;
	         if (ret1.isDecimal)
		      a = decimal2binary(ret1.number, elto.byte_size*BYTE_LENGTH) ;
	         else a =   float2binary(ret1.number, elto.byte_size*BYTE_LENGTH) ;

		 if (parentheses) {
		     elto.value.fields.push('(' + atom + ')') ;
		     elto.value.signature_type_arr.push('(imm)') ;
		 }
		 else {
	             elto.value.fields.push(atom) ;
	             elto.value.signature_type_arr.push('imm') ;
		 }
	         elto.value.signature_size_arr.push(a[2]) ; // a[2]: minimum number of bits to represent a[0]...

		 // return ok
	         ret.error = null ;
		 return ret ;
           }

           // if atom is nor reg neither immediate -> label (it is an address)
	   if (parentheses) {
	       elto.value.fields.push('(' + atom + ')') ;
	       elto.value.signature_type_arr.push('(address)') ;
	   }
	   else {
	       elto.value.fields.push(atom) ;
	       elto.value.signature_type_arr.push('address') ;
	   }

           // while address is unknown we cannot compute the minimal number of bits to encode it -> 1 single bit
           // in resolve_labels we compute the minimal (and if needed, recompute candidate)...
	   elto.value.signature_size_arr.push(1) ;

	   // return ok
	   ret.error = null ;
	   return ret ;
}

function wsasm_src2obj_text_ops_getAtom ( context, pseudo_context )
{
         var opx = '' ;

	 if (pseudo_context != null)
         {
             // if (end-of-file) -> return ''
             if ( (pseudo_context.index+1) >= pseudo_context.parts.length) {
                   return '' ; // return empty string
             }

	     pseudo_context.index++ ;
	     opx = pseudo_context.parts[pseudo_context.index] ;
         }
         else
         {
             asm_nextToken(context) ;
             opx = asm_getToken(context) ;

             // if (end-of-file || label:) -> return ''
             if ( (wsasm_isEndOfFile(context)) || ("TAG" == asm_getTokenType(context)) ) {
	           return '' ; // return empty string
             }
         }

         // if (instruction || .data/...) -> return ''
	 if ( (typeof context.firmware[opx] !== "undefined") || (wsasm_is_directive_segment(opx)) ) {
	       return '' ; // not an atom -> return empty string
	 }

	 return opx ;
}


function wsasm_src2obj_text_elto_field_sel ( context, ret, elto, pseudo_context )
{
	  var opx    = '' ;
	  var sel    = { } ;
	  var ret2   = { error:null, atom: '' } ;
	  var valbin = '0' ;

          // initial sel value (selector by default)
	  sel = { start:0, stop: 0, label:'' } ;

	  // sel*(*31 ,  12 ,  label )
	  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	  if ('(' != opx) {
	      return wsasm_eltoError(context, elto,
				     i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
	  }

	  // sel (*31*,  12 ,  label )
	  sel.stop = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	  sel.stop = parseInt(sel.stop) ;
	  if (isNaN(sel.stop)) {
	      return wsasm_eltoError(context, elto,
				     i18n_get_TagFor('compiler', 'NO POSITIVE NUMBER') + sel.stop) ;
	  }

	  // sel ( 31*,* 12 ,  label )
	  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	  if (',' != opx) {
	      return wsasm_eltoError(context, elto,
				     i18n_get_TagFor('compiler', 'COMMA NOT FOUND')) ;
	  }

	  // sel ( 31 , *12*,  label )
	  sel.start = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	  sel.start = parseInt(sel.start) ;
	  if (isNaN(sel.start)) {
	      return wsasm_eltoError(context, elto,
				     i18n_get_TagFor('compiler', 'NO POSITIVE NUMBER') + sel.start) ;
	  }

	  // sel ( 31 ,  12*,* label )
	  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	  if (',' != opx) {
	      return wsasm_eltoError(context, elto,
				     i18n_get_TagFor('compiler', 'COMMA NOT FOUND')) ;
	  }

	  // sel ( 31 ,  12 , *label*)
	  sel.label = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;

	  // sel ( 31 ,  12 ,  label*)*
	  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	  if (')' != opx) {
	      return wsasm_eltoError(context, elto,
				     i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
	  }

	  // check if sel.label is number or tag...
	  a = dt_get_imm_value(sel.label) ;
	  if (a.isDecimal)
	  {
	      valbin = wsasm_get_sel_valbin(sel.label, sel.start, sel.stop) ;
	      ret2.atom   = dt_binary2format(valbin, a.format) ;
	  }
	  else
	  {
	      if (wsasm_is_ValidTag(sel.label) == false) {
		  return wsasm_eltoError(context, elto,
					 i18n_get_TagFor('compiler', 'LABEL NOT DEFINED') + ": '" + sel.label + "'") ;
	      }

	      // if label then define 'sel(...)' as a new 'label'... ;-)
	      ret2.atom = sel.label + "[" + sel.start + ":" + sel.stop + "]" ;
	  }

	  // { error:null, atom: '...' } ;
	  return ret2 ;
}

function wsasm_src2obj_text_elto_field_abs ( context, ret, elto, pseudo_context, sel )
{
	  var opx    = '' ;
	  var ret2   = { error:null, atom: '' } ;
	  var valbin = '0' ;

	  // %lo*(* label )
	  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	  if ('(' != opx) {
	      return wsasm_eltoError(context, elto,
				     i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
	  }

	  // %lo ( *label* )
	  sel.label = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;

	  // %lo ( label*)*
	  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	  if (')' != opx) {
	      return wsasm_eltoError(context, elto,
				     i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
	  }

	  // check if sel.label is number or tag...
	  a = dt_get_imm_value(sel.label) ;
	  if (a.isDecimal)
	  {
	      valbin = wsasm_get_sel_valbin(sel.label, sel.start, sel.stop) ;
	      ret2.atom   = dt_binary2format(valbin, a.format) ;
	  }
	  else
	  {
	      if (wsasm_is_ValidTag(sel.label) == false) {
		  return wsasm_eltoError(context, elto,
					 i18n_get_TagFor('compiler', 'LABEL NOT DEFINED') + ": '" + sel.label + "'") ;
	      }

	      // if label then define '%lo(...)' as a new 'label'... ;-)
	      ret2.atom = sel.label + "[" + sel.start + ":" + sel.stop + "]" ;
	  }

	  // { error:null, atom: '...' } ;
	  return ret2 ;
}

function wsasm_src2obj_text_elto_field_pcrel ( context, ret, elto, pseudo_context, sel )
{
	  var opx    = '' ;
	  var ret2   = { error:null, atom: '' } ;
	  var valbin = '0' ;

	  // %pcrel_lo*(* label )
	  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	  if ('(' != opx) {
	      return wsasm_eltoError(context, elto,
				     i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
	  }

	  // %pcrel_lo ( *label* )
	  sel.label = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;

	  // %pcrel_lo ( label*)*
	  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	  if (')' != opx) {
	      return wsasm_eltoError(context, elto,
				     i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
	  }

	  // check if sel.label is number or tag...
	  a = dt_get_imm_value(sel.label) ;
	  if (a.isDecimal)
	  {
	      valbin = wsasm_get_sel_valbin(sel.label, sel.start, sel.stop) ;
	      ret2.atom   = dt_binary2format(valbin, a.format) ;
	  }
	  else
	  {
	      if (wsasm_is_ValidTag(sel.label) == false) {
		  return wsasm_eltoError(context, elto,
					 i18n_get_TagFor('compiler', 'LABEL NOT DEFINED') + ": '" + sel.label + "'") ;
	      }

	      // if label then define '%pcrel_hi/lo(...)' as a new 'label'... ;-)
	      ret2.atom = sel.label + "[" + sel.start + ":" + sel.stop + "]_pc" ;
	  }

	  // { error:null, atom: '...' } ;
	  return ret2 ;
}

function wsasm_src2obj_text_elto_fields ( context, ret, elto, pseudo_context )
{
           var ret1 = null ;
           var ret2 = null ;
           var sel  = {} ;
	   var opx  = '' ;
           var atom = '' ;
           var par  = false ;

           // Example of instruction:
           //   "add x1 x2 x3"
           // Example of pseudoinstruction:
           //   "lui rd , sel ( 31 , 12 , label ) addu rd , rd , sel ( 11 , 0 , label ) "

           // skip instruction name...
           opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;

	   while ( (opx != '') && (elto.value.fields.length < 100) )
	   {
              atom = opx ;
              par  = false ;

              // *sel*(31 ,  12 ,  label )
	      if ('sel' == opx)
              {
		  ret2 = wsasm_src2obj_text_elto_field_sel(context, ret, elto, pseudo_context) ;
		  if (ret2.error != null) {
		      return ret2 ;
		  }
		  atom = ret2.atom ;
              }
              // *%hi*( label )
	      else if ('%hi' == opx)
              {
		  // %hi
		  sel  = { start:12, stop: 31, label:'' } ;
		  ret2 = wsasm_src2obj_text_elto_field_abs(context, ret, elto, pseudo_context, sel) ;
		  if (ret2.error != null) {
		      return ret2 ;
		  }
		  atom = ret2.atom ;
              }
              // *%lo*( label )
	      else if ('%lo' == opx)
              {
		  // %lo
		  sel  = { start:0, stop: 11, label:'' } ;
		  ret2 = wsasm_src2obj_text_elto_field_abs(context, ret, elto, pseudo_context, sel) ;
		  if (ret2.error != null) {
		      return ret2 ;
		  }
		  atom = ret2.atom ;
              }
              // *%pcrel_hi*( label )
	      else if ('%pcrel_hi' == opx)
              {
		  // %hi
		  sel  = { start:12, stop: 31, label:'' } ;
		  ret2 = wsasm_src2obj_text_elto_field_pcrel(context, ret, elto, pseudo_context, sel) ;
		  if (ret2.error != null) {
		      return ret2 ;
		  }
		  atom = ret2.atom ;
              }
              // *%pcrel_lo*( label )
	      else if ('%pcrel_lo' == opx)
              {
		  // %lo
		  sel  = { start:0, stop: 11, label:'' } ;
		  ret2 = wsasm_src2obj_text_elto_field_pcrel(context, ret, elto, pseudo_context, sel) ;
		  if (ret2.error != null) {
		      return ret2 ;
		  }
		  atom = ret2.atom ;
              }
              // *(*x0)
	      else if ('(' == opx)
              {
                  par = true ;

                  // (*x0*)
                  atom = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
                  if ("" == atom) {
		      return wsasm_eltoError(context, elto,
                                             i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
                  }

                  // (x0*)*
                  opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	          if (')' != opx) {
		      return wsasm_eltoError(context, elto,
                                             i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
                  }
              }

              // match 'atom' + parentheses and add to elto.fields...
              ret1 = wsasm_src2obj_text_instr_op_match(context, ret, elto, atom, par) ;
              if (ret1.error != null) {
                  return ret1 ;
              }

	      // *,* OR next operand...
              opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
	      if (',' == opx)
              {
                  do {
                    opx = wsasm_src2obj_text_ops_getAtom(context, pseudo_context) ;
                  } while (',' == opx) ;
              }
              else if (('' != opx) && (context.options.mandatory_comma))
              {
		  return asm_langError(context,
				       i18n_get_TagFor('compiler', 'COMMA NOT FOUND')) ;
              }
	   }

	   // CHECK: More than 100 fields? really? umm, might be an error...
	   if (elto.value.fields.length > 100)
	   {
	       return wsasm_eltoError(context, elto,
				      i18n_get_TagFor('compiler', 'NOT MATCH FORMAT')     + ".<br>"  +
				      i18n_get_TagFor('compiler', 'REMEMBER FORMAT USED') + " '" + elto.source + "'.<br>" +
				      i18n_get_TagFor('compiler', 'CHECK MICROCODE')) ;
	   }

           // elto: derived attributes...
	   elto.value.signature_type_str = elto.value.signature_type_arr.join(' ') ;
	   elto.value.signature_size_str = elto.value.signature_size_arr.join(' ') ;
           elto.value.signature_user     = wsasm_make_signature_user(elto.value, '+') ;

           // Return ret
           return ret ;
}

function wsasm_find_candidate_and_encode ( context, ret, elto )
{
           // Find candidate from firm_reference
           ret = wsasm_find_instr_candidates(context, ret, elto) ;
           if (ret.error != null) {
	       return ret;
           }

           var candidate = elto.firm_reference[elto.firm_reference_index] ;

           // Fill initial binary with the initial candidate...
           elto.binary = wsasm_encode_instruction(context, ret, elto, candidate) ;

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
           var elto      = null ;
           var candidate = null ;
           var oc_size   =  1 ;


	   //
	   //  *.text*   |  *.text*
	   //   .data    |    label1: instr op1 op2 op3
	   //

           var seg_name = asm_getToken(context) ;
           asm_nextToken(context) ;

           elto = wsasm_new_objElto(null) ;
           elto.seg_name = seg_name ;
           elto.endian   = context.options.endian ;

	   //
	   //   .text    |   .text
	   //  *.data*   |   *label1: instr op1 op2 op3*
	   //

	   // Loop while token read is not a segment directive (.text/.data/...) or end_of_file is found
	   while (
                   (! wsasm_is_directive_segment(asm_getToken(context))) &&   // NOT .data/...
                   (! wsasm_isEndOfFile(context))                             // NOT end-of-file
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
   		      if (wsasm_is_ValidTag(tag) == false) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'INVALID TAG FORMAT') +
                                               "'" + tag + "'") ;
		      }
		      if (context.firmware[tag]) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                               "'" + tag + "'") ;
		      }
		      if (typeof ret.labels_asm[tag] != "undefined") {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'REPEATED TAG') +
                                               "'" + tag + "'") ;
		      }

		      // Store tag
                      elto.labels.push(tag) ;
		      ret.labels_asm[tag] = 0 ;

		      // .<datatype> | tagX+1
		      asm_nextToken(context) ;
		   }

		   elto.associated_context = asm_getLabelContext(context) ;

		   // check if end of file has been reached
		   if (wsasm_isEndOfFile(context))
                   {
		        // ELTO: in case of ending with 'label:' but without instruction
                        if (elto.labels.length > 0) {
		            ret.obj.push(elto) ;
                        }

			break;
                   }

		   //
		   //    label1:
	           //    label2:   *instr* op1 op2 op3
		   //

	           possible_inst  = asm_getToken(context) ;
                   elto.byte_size = WORD_BYTES ;
		   elto.value     = {} ;

		   elto.value.instruction        = possible_inst ;
		   elto.value.fields             = [] ;
		   elto.value.signature_type_arr = [ possible_inst ] ;

                   if (typeof context.firmware[possible_inst] != "undefined")
                        elto.firm_reference = context.firmware[possible_inst] ;
                   else elto.firm_reference = [] ;

                   // oc_size
                   oc_size = context.oc_size_default ;
                   if ( (elto.firm_reference.length > 0) && (typeof elto.firm_reference[0].oc != "undefined") ) {
                         oc_size = elto.firm_reference[0].oc.value.length ;
                   }
		   elto.value.signature_size_arr = [ oc_size ] ;


		   //
		   //    label1:
	           //    label2:    instr  *op1, op2 op3*
		   //

                   ret = wsasm_src2obj_text_elto_fields(context, ret, elto, null) ;
		   if (ret.error != null) {
		       return ret;
		   }

                   if (elto.value.fields.length > 0) {
		        elto.source     = elto.value.instruction + ' ' + elto.value.fields.join(' ') ;
		        elto.source_alt = elto.value.instruction + ' ' + elto.value.fields.join(', ') ;
                   }
		   else {
                        elto.source     = elto.value.instruction ;
                        elto.source_alt = elto.source ;
                   }

		   elto.comments.push(acc_cmt) ;
		   elto.track_source.push(elto.source) ;
                   elto.source_bin = elto.source ;

		   // Find candidate from firm_reference
		   ret = wsasm_find_instr_candidates(context, ret, elto) ;
		   if (ret.error != null) {
		       return ret;
		   }

		   candidate = elto.firm_reference[elto.firm_reference_index] ;

                   // if instruction -> fill initial binary based on candidate...
		   if (candidate.isPseudoinstruction == false)
                   {
		        elto.datatype = "instruction" ;

			// Fill initial binary with the initial candidate...
			elto.binary = wsasm_encode_instruction(context, ret, elto, candidate) ;
                   }
		   else
		   {
		       elto.datatype = "pseudoinstruction" ;
		       elto.binary   = '' ;
		   }

		   // ELTO: instruction + fields
		   ret.obj.push(elto) ;
		   elto = wsasm_new_objElto(elto) ; // new elto, same datatype
           }

	   // Return ret
           return ret ;
}

function wsasm_src2obj_binary ( context, ret )
{
	   var possible_tag   = "" ;
           var possible_value = "" ;
	   var possible_addr  = "" ;
           var tag     = "" ;
           var acc_cmt = "" ;
           var elto      = null ;
           var candidate = null ;
           var oc_size   =  1 ;


	   //
	   //  *.binary* |  *.binary*
	   //   .data    |    label1: 0x1000 0x12345678
	   //

           var seg_name = asm_getToken(context) ;
           asm_nextToken(context) ;

           elto = wsasm_new_objElto(null) ;
           elto.seg_name = seg_name ;
           elto.endian   = context.options.endian ;

	   //
	   //   .binary  |   .binary
	   //  *.data*   |   *label1: 0x1000 0x12345678*
	   //

	   // Loop while token read is not a segment directive (.text/.data/...) or end_of_file is found
	   while (
                   (! wsasm_is_directive_segment(asm_getToken(context))) &&   // NOT .data/...
                   (! wsasm_isEndOfFile(context))                             // NOT end-of-file
                 )
           {
		   //
		   //  * label1: *
	           //  * label2: *  0x1000 0x12345678
		   //

                   acc_cmt = asm_getComments(context) ;
                   asm_resetComments(context) ;

                   // tagX
		   possible_tag = asm_getToken(context) ;

		   while (
                           (possible_tag.endsWith(':')) &&  // It looks like a tag AND
                           (! wsasm_isEndOfFile(context))  // NOT end-of-file
                         )
		   {
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
   		      if (wsasm_is_ValidTag(tag) == false) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'INVALID TAG FORMAT') +
                                               "'" + tag + "'") ;
		      }
		      if (context.firmware[tag]) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                               "'" + tag + "'") ;
		      }
		      if (typeof ret.labels_asm[tag] != "undefined") {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'REPEATED TAG') +
                                               "'" + tag + "'") ;
		      }

		      // Store tag
                      elto.labels.push(tag) ;
		      ret.labels_asm[tag] = 0 ;

		      // .<datatype> | tagX+1
		      asm_nextToken(context) ;

                      // tagX
		      possible_tag = asm_getToken(context) ;
		   }

		   elto.associated_context = asm_getLabelContext(context) ;

		   // check if end of file has been reached
		   if (wsasm_isEndOfFile(context))
                   {
		        // ELTO: in case of ending with 'label:' but without instruction
                        if (elto.labels.length > 0) {
		            ret.obj.push(elto) ;
                        }

			break;
                   }

		   //
		   //    label1:
	           //    label2:   *0x1000* 0x12345678
		   //

	           possible_addr = asm_getToken(context) ;

		   elto.value.instruction        = '*' ;
		   elto.value.fields             = [] ;
		   elto.value.signature_type_arr = [ '*' ] ;
                   elto.firm_reference           = [] ;
                   elto.elto_ptr                 = possible_addr ;

		   //
		   //    label1:
	           //    label2:    0x1000 *0x12345678*
		   //

		   asm_nextToken(context) ;
	           possible_value = asm_getToken(context) ;

		   elto.datatype  = "binary" ;
                   elto.byte_size = WORD_BYTES ;
		   elto.value     = {} ;
		   elto.binary    = parseInt(possible_value).toString(2) ;
                   elto.binary    = elto.binary.padStart(WORD_BYTES*BYTE_LENGTH, '0') ;

                   // oc_size
                   oc_size = context.oc_size_default ;
		   elto.value.signature_size_arr = [ oc_size ] ;

                   // source
                   elto.source     = '*' ;
                   elto.source_alt = '*' ;
                   elto.source_bin = elto.source ;

		   elto.comments.push(acc_cmt) ;
		   elto.track_source.push(elto.source) ;

		   // ELTO: instruction + fields
		   ret.obj.push(elto) ;
		   elto = wsasm_new_objElto(elto) ; // new elto, same datatype

                   // next "label: address value"...
		   asm_nextToken(context) ;
           }

	   // Return ret
           return ret ;
}


function wsasm_src2obj_helper ( context, ret )
{
	  var segname = '' ;

	  ret.data_found = false ;
	  ret.text_found = false ;

          //
          // .segment
          // ...
          //
          asm_nextToken(context) ;
          while (wsasm_isEndOfFile(context) == false)
          {
	       // optional '.section'
	       if (".section" == asm_getToken(context)) {
	           asm_nextToken(context) ;
	       }

	       segname = asm_getToken(context);

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

	       // Compile .binary and check errors
	       if ("binary" == ret.seg[segname].kindof) {
		   ret = wsasm_src2obj_binary(context, ret);
	       }

	       if (ret.error != null) {
		   return ret;
	       }
	 }

	 return ret;
}


function wsasm_try_resolve_pseudo ( context, ret, pseudo_elto, pseudo_elto_candidate )
{
         var pseudo_context = { parts: null, index: 0 } ;
         var elto           = null ;
         var possible_inst  = '' ;
         var pseudo_values  = '' ;
         var pseudo_replace = '' ;
         var pseudo_value_k = '' ;

         var ret1 = null ;
         var ret2 = {} ;
         ret2.error = null ;
         ret2.eltos = [] ;
         ret2.some_pending = false ;

         pseudo_values   = pseudo_elto.source.trim().split(' ') ;
         pseudo_replaced = pseudo_elto_candidate.finish ;
         for (let k=0; k<(pseudo_values.length-1); k++)
	 {
              pseudo_value_k = base_replaceAll(pseudo_values[k+1], '(', '') ;
	      pseudo_value_k = base_replaceAll(pseudo_value_k,     ')', '') ;

              pseudo_replaced = base_replaceAll(pseudo_replaced, pseudo_elto_candidate.fields[k].name, pseudo_value_k) ;
         }

         // example pseudo_replaced: "lui rd , sel ( 31 , 12 , label ) addu rd , rd , sel ( 11 , 0 , label ) "
         pseudo_context.parts = pseudo_replaced.split(' ') ;

         pseudo_context.index = 0 ;
         while (pseudo_context.index < (pseudo_context.parts.length-1))
         {
	         possible_inst = pseudo_context.parts[pseudo_context.index] ;

                 // skip empty possible instruction
	         if ("" == possible_inst) {
	             pseudo_context.index++ ;
                     continue ;
                 }

                 elto = wsasm_new_objElto(pseudo_elto) ;
                 elto.associated_pseudo = pseudo_elto ;
	         elto.datatype          = "instruction" ;
                 elto.binary            = '' ;

		 elto.value                    = {} ;
		 elto.value.instruction        = possible_inst ;
	         elto.value.fields             = [] ;
	         elto.value.signature_type_arr = [ possible_inst ] ;
		 elto.value.signature_size_arr = [] ;
                 elto.associated_context       = pseudo_elto.associated_context ;

                 if (typeof context.firmware[possible_inst] != "undefined")
                      elto.firm_reference = context.firmware[possible_inst] ;
                 else elto.firm_reference = [] ;

                 // Match fields of the pseudoinstruction...
                 ret1 = wsasm_src2obj_text_elto_fields(context, ret, elto, pseudo_context) ;
                 if (ret1.error != null) {
                     return ret1 ;
                 }

                 // Fill related source...
                 if (0 == ret2.eltos.length)
                      elto.track_source.push(pseudo_elto.source) ;
                 else elto.track_source.push("&nbsp;") ;
	  	 elto.source     = elto.value.instruction + ' ' + elto.value.fields.join(' ') ;
	  	 elto.source_alt = elto.value.instruction + ' ' + elto.value.fields.join(', ') ;
	  	 elto.source_bin = elto.source ;

                 // Find candidate from firm_reference and fill initial binary based on it...
                 ret = wsasm_find_candidate_and_encode(context, ret, elto) ;
		 if (ret.error != null) {
		     return ret ;
		 }

                 if (0 == ret2.eltos.length) {
                     elto.labels   = pseudo_elto.labels ;
		     elto.comments = pseudo_elto.comments.slice() ;
		 }

                 // add elto to some temporal array
                 ret2.eltos.push(elto) ;
                 if (elto.pending.length > 0) {
                     ret2.some_pending = true ;
                 }
         }

	 return ret2 ;
}

function wsasm_resolve_pseudo ( context, ret )
{
	 var ret2 = { error:null } ;
	 var ret3 = { error:null } ;
         var pseudo_elto = null ;
         var pseudo_elto_candidate = null ;

         for (let i=0; i<ret.obj.length; i++)
         {
              // (1/2) skip instructions
              if ("pseudoinstruction" != ret.obj[i].datatype) {
                   continue ;
              }
              // (2/2) skip empty pseudoinstructions, for example:
              //           "pseudo"
              //    label:         <- empty line with label, former pseudo
              if (null == ret.obj[i].firm_reference) {
                   continue ;
              }

              pseudo_elto = ret.obj[i] ;

              // find one pseudo-instruction that can be used...
	      ret2.error = "pseudoinstruction '" + pseudo_elto.source + "' not found!" ;
              for (var j=0; j<pseudo_elto.firm_reference.length; j++) // pseudo_1: from first to last
              {
                  pseudo_elto.firm_reference_index = j ;
                  pseudo_elto_candidate = pseudo_elto.firm_reference[pseudo_elto.firm_reference_index] ;
                  if (false == pseudo_elto_candidate.isPseudoinstruction) {
                       continue ;
                  }

                  ret2 = wsasm_try_resolve_pseudo(context, ret, pseudo_elto, pseudo_elto_candidate) ;

                  // if some match is available, try check if labels fits in candidate
	          if ( (null == ret2.error) && (ret2.some_pending) )
                  {
			obj_backup = ret.obj ;
			ret.obj = [...obj_backup] ;
			ret.obj.splice(i, 1, ...ret2.eltos) ;

			// compute address of labels (with current object)...
			ret3 = wsasm_compute_labels(context, ret, i) ;
			if (ret3.error != null) {
			    ret.obj = obj_backup ;
			    continue ;
			}

			// resolve labels (translate into addresses, with current object)
			ret3 = wsasm_resolve_labels(context, ret, i) ;
			if (ret3.error != null) {
			    ret.obj = obj_backup ;
			    continue ;
			}

			ret.obj = obj_backup ;
                  }

                  // if some match is available, stop search loop
	          if (null == ret2.error) {
                      break ;
	          }
              }

              // if (nothing found) then error
	      if (ret2.error != null) {
                  ret.error = ret2.error ;
		  return ret ;
	      }

              // If not pending field -> replace pseudo-instruction with the associated elements:
              // ret.obj = ret.obj[0]...ret.obj[i]  + ret2.eltos +  ret.obj[i+1]...ret.obj[ret.obj.length-1]
              ret.obj.splice(i, 1, ...ret2.eltos) ;

              ret.compute_resolve_pseudo = true ;
         }

	 return ret;
}


function wsasm_compute_labels ( context, ret, start_at_obj_i )
{
         var seg_name = '' ;
         var seg_ptr  = 0 ;
         var elto_ptr = 0 ;
         var padding  = 0 ;
         var elto_align = 0 ; // by default, align to byte
         var tag = '' ;
         var last_assigned = {} ;

         for (let i=start_at_obj_i; i<ret.obj.length; i++)
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
                     if (elto_align > 1)
                     {
                         padding = last_assigned[seg_name] % elto_align ; // temporal value for padding
                         if (padding != 0) {
                             padding = elto_align - padding ;
                         }
                         last_assigned[seg_name] += padding ;
                     }

                     // update x.elto_ptr so obj2mem will skip those bytes...
                     ret.obj[i].elto_ptr = last_assigned[seg_name] ;

                     continue ;
              }

              // get starting address of next elto
              elto_ptr = last_assigned[seg_name] ;

              if ("binary" == ret.obj[i].datatype)
              {
                  elto_ptr = parseInt(ret.obj[i].elto_ptr) ;
              }
              else if ([ "", "instruction", "pseudoinstruction" ].includes(ret.obj[i].datatype) == false)
              {
                  var datatype_size = wsasm_get_datatype_size(ret.obj[i].datatype) ;

                  // align datatype to datatype_size in bytes (4 in multiple of 4, 2 in multiple of 2...)
                  if (elto_ptr % datatype_size != 0) {
                      elto_ptr += datatype_size - (elto_ptr % datatype_size) ;
                  }
              }

              ret.obj[i].seg_ptr     = seg_ptr ;             // starting address of the .data/.kdata segment
              ret.obj[i].elto_ptr    = elto_ptr ;
              ret.obj[i].byte_offset = elto_ptr - seg_ptr ;  // offset within .data segment
              ret.obj[i].padding     = 0 ;

              // add labels_asm...
              for (var j=0; j<ret.obj[i].labels.length; j++) {
                     tag = ret.obj[i].labels[j] ;
		     ret.labels_asm[tag] = "0x" + elto_ptr.toString(16) ;
              }

              // machine_code and total size...
              if (elto_align != 0)
              {
                  if (wsasm_has_datatype_attr(ret.obj[i].datatype, "string")) {
                        ret.obj[i].padding = elto_align - (ret.obj[i].byte_size % elto_align) ;
                  }
                  else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "space")) {
                        ret.obj[i].padding = elto_align - (ret.obj[i].byte_size % elto_align) ;
                  }
              }

              // update last address of segment...
              last_assigned[seg_name] = elto_ptr + ret.obj[i].byte_size + ret.obj[i].padding ;
         }

         return ret ;
}

function wsasm_get_label_value ( context, ret, elto, label )
{
         var value  = '' ;
         var valbin = '' ;

         // if label -> return associated value as integer
         value = ret.labels_asm[label] ;
	 if (typeof value !== "undefined")
         {
              valbin = (parseInt(value) >>> 0).toString(2) ;
              ret.labels_valbin[label] = valbin ;
              return ret ;
	 }

         // try to detect if value is 'lz[xx:yy]'...
         var value_arr = label.split(/^(.*)\[(\d+):(\d+)\](.*)/s) ;
	 if (value_arr.length < 5) {
	     return wsasm_eltoError(context, elto,
				    i18n_get_TagFor('compiler', 'LABEL NOT DEFINED') + ": '" + label + "'") ;
	 }

         // Examples:
         // ['', 'w1', '12', '31', '',    '']
         // ['', 'w1', '12', '31', '_pc', '']
         //  0    1     2     3     4     5
         var sel_stop  = parseInt(value_arr[2]) ;
         var sel_start = parseInt(value_arr[3]) ;
         var sel_label = value_arr[1] ;
         var sel_pcrel = value_arr[4] ;

         // if label not found -> return error
         value = ret.labels_asm[sel_label] ;
	 if (typeof value === "undefined") {
	     return wsasm_eltoError(context, elto,
				    i18n_get_TagFor('compiler', 'LABEL NOT DEFINED') + ": '" + sel_label + "'") ;
	 }

         // if pc-relative, compute the associated relative value...
         if (sel_pcrel != '')
         {
             value = parseInt(value) ;
             value = (value >>> 0) - (elto.elto_ptr - WORD_BYTES) ;

             // 0 ... *12* ... 31
             var bit_index = sel_start ;
             if ((0 == bit_index) || ((WORD_BYTES*BYTE_LENGTH-1) == bit_index)) {
                 bit_index = sel_stop ;
             }

             // hi = offset[31:12] + offset[11]
             // lo = offset[11:0]
             var tmp_hi = ((value >>> 0) >>> (bit_index - 1)) ;
             var tmp_lo = tmp_hi & 0x1 ;
                 tmp_hi = (tmp_hi >>> 1) + tmp_lo ;
                 tmp_lo = (1 << (bit_index + 1)) - 1 ; // 0x00000FFF
                 tmp_lo = (value >>> 0) & tmp_lo ;

             value = (tmp_hi << bit_index) | tmp_lo ;
             value = '0x' + (value >>> 0).toString(16) ;
         }

	 // compute selection...
         valbin = wsasm_get_sel_valbin(value, sel_start, sel_stop) ;
         ret.labels_valbin[label] = valbin ;

         return ret ;
}

function wsasm_resolve_labels_elto ( context, ret, elto )
{
         var value = 0 ;
         var arr_encoded = null ;

         // ...review the pending labels (forth and back)
         for (let j=0; j<elto.pending.length; j++)
         {
              ret = wsasm_get_label_value(context, ret, elto, elto.pending[j].label) ;
	      if (ret.error != null) {
	          return ret;
	      }

              // to remember: value is binary as string at this point of code
              value = ret.labels_valbin[elto.pending[j].label] ;

              // address-abs vs address-rel
              if (elto.pending[j].rel)
              {
                  value = parseInt(value, 2) ;
                  value = (value >>> 0) - (elto.elto_ptr + WORD_BYTES) ;

                  // 1: bytes, 4: word (mips-32), 2: half(risc-v)
                  value = value / context.options.relative_offset_mult ;

                  if (value < 0)
                  {
                      value = (value >>> 0).toString(2);
                      value = "1" + value.replace(/^[1]+/g, "");
                      value = value.padStart(elto.pending[j].n_bits, '1') ;
                  }
                  else
                  {
                      value = value.toString(2) ;
                  }
              }

              // instruction-field
              if ("field-instruction" == elto.pending[j].type)
              {
                  elto.value.signature_size_arr[elto.pending[j].field_j + 1] = value.length ;
                  elto.value.signature_size_str = elto.value.signature_size_arr.join(' ') ;

                  // if label.size doesn't fit the field.n_bits, then try another alternative
                  if (value.length > elto.pending[j].n_bits)
                  {
                      // Resetting pending elements in this instruction (encode_instruction will populate it again)...
                      elto.pending = [] ;

                      // Find candidate from firm_reference and fill initial binary based on it...
                      ret = wsasm_find_candidate_and_encode(context, ret, elto) ;
		      if (ret.error != null) {
		          return ret ;
		      }

                      elto = elto.firm_reference[elto.firm_reference_index] ;
                      ret.compute_resolve_pseudo = true ;
                  }
              }

              // checks if value fits in the n_bits at the end...
              if (value.length > elto.pending[j].n_bits)
              {
	          return wsasm_eltoError(context, elto,
                                         "'" + elto.pending[j].label + "'" +
                                         i18n_get_TagFor('compiler', 'NEEDS') +
                                         value.length +
                                         i18n_get_TagFor('compiler', 'SPACE FOR # BITS') +
                                         elto.pending[j].n_bits + " " +
                                         i18n_get_TagFor('compiler', 'BITS')) ;
              }

              // update elto.binary
              value = value.padStart(elto.pending[j].n_bits, '0') ;
              arr_encoded = elto.binary.split('') ;
              wsasm_encode_field(arr_encoded, value, elto.pending[j].start_bit, elto.pending[j].stop_bit) ;
              elto.binary = arr_encoded.join('') ;

              // update elto.pending[j].value (binary) and source_bin (integer)
              elto.pending[j].value = value ;

              var s = elto.source.split(' ') ;
                value = value.padStart(WORD_LENGTH, value[0]) ;
                value = parseInt(value, 2) >> 0 ;
              s[elto.pending[j].field_j + 1] = value ;
              elto.source_bin = s.join(' ') ;

              // data-field -> update elto.value (is not an object as inst-field)
              if ("field-data" == elto.pending[j].type) {
                  elto.value = elto.binary ;
              }
         }

         return ret ;
}

function wsasm_resolve_labels ( context, ret, start_at_obj_i )
{
         var elto = null ;

         // for all object elements...
         for (let i=start_at_obj_i; i<ret.obj.length; i++)
         {
              elto = ret.obj[i] ;

              // ...review the pending labels (forth and back)
              ret = wsasm_resolve_labels_elto(context, ret, elto) ;
	      if (ret.error != null) {
	          return ret;
	      }
         }

         return ret ;
}


 /*
  *  Public API
  */

function wsasm_prepare_source ( context, asm_source )
{
	   // Check arguments
           if (typeof context == "undefined") {
               return { error: 'context is undefined in wsasm_prepare_source\n' } ;
           }

           // set a new assembler source code
	   context.line        	= 1 ;          // here
	   context.error       	= null ;
	   context.i            = 0 ;          // here
           context.text         = asm_source ; // here
	   context.tokens       = [] ;
	   context.token_types  = [] ;
	   context.t            = 0 ;          // here
           context.comments     = [] ;
	   context.newlines     = [] ;

           // return context
	   return context ;
}

function wsasm_src2obj ( context )
{
	   // Check arguments
           if (typeof context == "undefined") {
               return { error: 'Context is undefined in wsasm_src2obj\n' } ;
           }

           // Initialize ret object
           var ret = {} ;
           ret.obj = [] ;
           ret.mp  = {} ;
  	   ret.seg                 = sim_segments ;
           ret.hash_seg_rev        = [] ;
           ret.labels_asm          = {} ;
           ret.hash_labels_asm_rev = {} ;
	   ret.labels              = {} ; // [addr] = {name, addr, startbit, stopbit}
           ret.labels_valbin       = {} ;

           // pass 1: compile raw assembly
           ret = wsasm_src2obj_helper(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

           var r = 0 ;
           do
           {
                ret.compute_resolve_pseudo = false ;
                r = r + 1;

                // pass 2: compute address of labels (with current object)...
                ret = wsasm_compute_labels(context, ret, 0) ;
	        if (ret.error != null) {
	            return ret;
	        }

	        // pass 3: resolve labels (translate into addresses, with current object)
                ret = wsasm_resolve_labels(context, ret, 0) ;
	        if (ret.error != null) {
	            return ret;
	        }

                // pass 4: replace pseudo-instructions with resolved labels
                ret = wsasm_resolve_pseudo(context, ret) ;
	        if (ret.error != null) {
	            return ret;
	        }

           } while ( (ret.compute_resolve_pseudo) && (r<20) );

           // checks if r==20 -> it might be a circular definition
           if (20 == r) {
	       return wsasm_eltoError(context, elto,
                                      i18n_get_TagFor('compiler', 'CHECK MICROCODE') +
                                      " because it might be a circular definition: pseudo <-> pseudo") ;
           }

           // build reverse lookup hash labels (hash labels_asm -> key)
           for (var key in ret.labels_asm) {
                ret.hash_labels_asm_rev[ret.labels_asm[key]] = key ;
           }

           // build reverse lookup hash segments (hash segname -> properties)
           for (var skey in ret.seg) {
                ret.hash_seg_rev.push({ 'begin': parseInt(ret.seg[skey].begin), 'name': skey }) ;
           }

           // check if main or kmain in assembly code
           if (ret.text_found)
           {
               if ( (typeof ret.labels_asm["main"]  === "undefined" ) &&
                    (typeof ret.labels_asm["kmain"] === "undefined" ) )
               {
                     return asm_langError(context,
                                          i18n_get_TagFor('compiler', 'NO MAIN OR KMAIN')) ;
               }
           }

	   return ret;
}

function wsasm_obj2src ( context, ret, options )
{
         var o = '' ;
         var elto = null ;
         var curr_segment = '' ;

         // check params
         if (typeof ret.obj == "undefined") {
	     return wsasm_eltoError(context, elto,
				    i18n_get_TagFor('compiler', 'EMPTY OBJECT CODE')) ;
         }

         // prepare options...
         options = wsasm_expand_options(options) ;

         // for all object elements...
         for (let i=0; i<ret.obj.length; i++)
         {
              elto = ret.obj[i] ;

              // switch to another segment
              if (curr_segment != elto.seg_name) {
                  curr_segment = elto.seg_name ;
                  o += '\n' + curr_segment + '\n' ;
              }

              // show labels
              for (let j=0; j<elto.labels.length; j++) {
                   o += elto.labels[j] + ":\n" ;
              }

              // show element source code
              if ( ('instruction' == elto.datatype) && (false == options.instruction_comma) )
                   o += "\t" + base_replaceAll(elto.source_alt, ',', '') + "\n" ;
              else o += "\t" + elto.source_alt + "\n" ;
         }

         // return alternative source
         ret.src_alt = o ;
         return ret ;
}

function wsasm_obj2bin ( context, ret )
{
         var o = '' ;
         var elto = null ;

         // check params
         if (typeof ret.obj == "undefined") {
	     return wsasm_eltoError(context, elto,
				    i18n_get_TagFor('compiler', 'EMPTY OBJECT CODE')) ;
         }

         o = '\n.binary\n' ;

         // for each object element...
         for (let i=0; i<ret.obj.length; i++)
         {
              elto = ret.obj[i] ;

              // show labels
              for (let j=0; j<elto.labels.length; j++) {
                   o += elto.labels[j] + ":\n" ;
              }

              // show address and value
              o += "0x" + parseInt(elto.elto_ptr).toString(16).padStart(2*WORD_BYTES, '0') + "\t" ;
              o += "0x" + parseInt(elto.binary,2).toString(16).padStart(2*WORD_BYTES, '0') + "\n" ;
         }

         // return alternative source
         ret.src_alt = o ;
         return ret ;
}


