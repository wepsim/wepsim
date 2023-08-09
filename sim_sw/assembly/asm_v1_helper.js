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


// Pass 0: prepare context
function wsasm_prepare_context ( CU_data, asm_source )
{
           var context = {} ;
	   context.line           	= 1 ;
	   context.error          	= null ;
	   context.i              	= 0 ;
           context.text                 = asm_source ;
	   context.tokens         	= [] ;
	   context.token_types    	= [] ;
	   context.t              	= 0 ;
           context.comments             = [] ;
	   context.newlines       	= [] ;
	   context.registers      	= [] ;   // here
	   context.firmware             = {} ;   // here
	   context.pseudoInstructions	= [];    // here
	   context.stackRegister	= null ;

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
           var elto = null ;
	   for (i=0; i<CU_data.firmware.length; i++)
           {
		var aux = CU_data.firmware[i];

	   	if (typeof context.firmware[aux.name] === "undefined") {
	   	    context.firmware[aux.name] = [];
		}

	   	elto = {
                         name:                aux.name,
			 nwords:              parseInt(aux.nwords),
			 co:                  (typeof aux.co     !== "undefined" ? aux.co     : false),
			 cop:                 (typeof aux.cop    !== "undefined" ? aux.cop    : false),
			 fields:              (typeof aux.fields !== "undefined" ? aux.fields : false),
			 signature:           aux.signature,
			 signatureUser:       (typeof aux.signatureUser !== "undefined" ? aux.signatureUser : aux.name ),
			 isPseudoinstruction: false
                       } ;
	   	context.firmware[aux.name].push(elto) ;
	   }

	   // fill pseudoinstructions
	   var initial = null ;
	   var finish  = null ;
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

                elto = {
                          name:                initial.name,
			  fields:              (typeof initial.fields !== "undefined" ? initial.fields : false),
			  signature:           initial.signature,
			  signatureUser:       initial.signature.replace(/,/g," "),
			  finish:              finish.signature,
			  isPseudoinstruction: true
                       } ;
                context.firmware[initial.name].push(elto) ;
	   }

	   return context ;
}


// pass 1: compile assembly to obj (data and text without replacing pseudo-instructions)

  //  <source>            -> <eltos>
  //                      ->
  //  *l1:                -> [
  //   l2:   .word 0x2,*  ->   { "l1,l2", ".word", 4, 0x2, ... }, // elto
  //        *      0x4 *  ->   { ""     , ".word", 4, 0x4, ... }, // elto
  //  *l3:  .byte 1*      ->   { "l3",    ".byte", 1, 0x1, ... }, // elto
  //              2*      ->   { "",      ".byte", 1, 0x2, ... }  // elto
  //                      -> ]

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

                       binary:         '',
                       firm_reference: null,
                       pending:        null
                   } ;

        if (null != base_elto) {
	    elto.seg_name  = base_elto.seg_name ;
	    elto.datatype  = base_elto.datatype ;
            elto.byte_size = base_elto.byte_size ;
        }

        return elto ;
}

function wsasm_is_EndOfFile (context)
{
        return ("" === asm_getToken(context)) && (context.t >= context.text.length) ;
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
                   (! wsasm_is_EndOfFile(context))                            // NOT end-of-file
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
                           (! wsasm_is_EndOfFile(context))                            // NOT end-of-file
                         )
		   {
                      // tagX
		      possible_tag = asm_getToken(context) ;

                      // check tag
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
		   if (wsasm_is_EndOfFile(context)) {
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

			while (!wsasm_is_directive(asm_getToken(context)) && !wsasm_is_EndOfFile(context))
                        {
				var label_found = false;

				// Get value
				    ret1   = get_inm_value(possible_value) ;
				var number = ret1.number ;
				if ( (ret1.isDecimal == false) && (ret1.isFloat == false) )
                                {
				    if (".word" !== elto.datatype)
                                    {
					return asm_langError(context,
			                                     i18n_get_TagFor('compiler', 'NO NUMERIC DATATYPE') +
                                                             "'" + possible_value + "'") ;
				    }

                                    // check valid label
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

				// Check size
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
						       name:         possible_value,
						       addr:         elto.seg_ptr,
						       startbit:     31,           // TODO
						       stopbit:      0,            // TODO
						       rel:          undefined,    // TODO
						       nwords:       1,
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

			// Check
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

			// Check if number
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

                        ret1 = treatControlSequences(possible_value) ;
			if (true == ret1.error) {
			    return asm_langError(context, ret1.string);
		        }
                        possible_value = ret1.string ;

			while (!wsasm_is_directive(asm_getToken(context)) && !wsasm_is_EndOfFile(context))
                        {
				// check string
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

                                        num_bits = possible_value.charCodeAt(i) ; // TODO in obj2bin: .toString(2);
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
           // TODO: magic to transform elto into binary

           return "0".repeat(32) ;
}

function wsasm_src2obj_text ( context, ret )
{
	   var possible_tag   = "" ;
           var possible_value = "" ;
           var tag            = "" ;
           var acc_cmt        = "" ;
           var opx            = "" ;
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
                   (! wsasm_is_EndOfFile(context))                            // NOT end-of-file
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
                           (! wsasm_is_EndOfFile(context))                                      // NOT end-of-file
                         )
		   {
                      // tagX
		      possible_tag = asm_getToken(context) ;

                      // check tag
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
		   if (wsasm_is_EndOfFile(context)) {
			break;
                   }

		   //
		   //    label1:
	           //    label2:   *instr* op1 op2 op3
		   //

                   elto.seg_name  = seg_name ;
		   elto.datatype  = "instruction" ;
                   elto.byte_size = WORD_BYTES ;
		   elto.value     = {
                                       "instruction":  asm_getToken(context),
                                       "operands":     []
                                    } ;

		   //
		   //    label1:
	           //    label2:    instr  *op1, op2 op3*
		   //

		   //
                   // TODO: build auxiliar function to read operands -> reg | 10(reg) | 10+20 | 10 | (reg) | ...
		   //

                   asm_nextToken(context) ;
                   opx = asm_getToken(context) ;
		   while (
                           (typeof context.firmware[opx] === "undefined") &&          // NOT instruction
	                   (! wsasm_is_directive_segment(asm_getToken(context))) &&   // NOT .data/....
		           ("TAG" != asm_getTokenType(context)) &&                    // NOT label:
                           (! wsasm_is_EndOfFile(context))                            // NOT end-of-file
                         )
		   {
                      elto.value.operands.push(opx) ;

                      asm_nextToken(context) ;
                      opx = asm_getToken(context) ;

                      // More than 100 operands? really? umm, might be an error...
                      if (elto.value.operands.length > 100)
                      {
		          return asm_langError(context,
                                               i18n_get_TagFor('compiler', 'NOT MATCH MICRO') + "<br>" +
                                               i18n_get_TagFor('compiler', 'REMEMBER I. FORMAT') + elto.value.instruction + ". " +
                                               i18n_get_TagFor('compiler', 'CHECK MICROCODE')) ;
                      }
		   }

		   elto.source         = elto.value.instruction + ' ' + elto.value.operands.join(' ') ;
                   elto.firm_reference = context.firmware[elto.value.instruction] ;
                   elto.binary         = wsasm_encode_instruction(context, ret, elto) ;
		   elto.comments.push(acc_cmt) ;
		   elto.track_source.push(elto.source) ;

		   ret.obj.push(elto) ;
		   elto = wsasm_new_objElto(elto) ; // new elto, same datatype
           }

	   // Return ret
           return ret ;
}


function wsasm_compile_src2obj ( context, ret )
{
	  ret.data_found = false;
	  ret.text_found = false;

          //
          // .segment
          // ...
          //
          asm_nextToken(context) ;
          while (!wsasm_is_EndOfFile(context))
          {
	       var segname = asm_getToken(context);

	       if (typeof ret.seg[segname] === "undefined")
               {
		   return asm_langError(context,
		                        i18n_get_TagFor('compiler', 'INVALID SEGMENT NAME') +
                                        "'" + segname + "'") ;
	       }

	       if ("data" == ret.seg[segname].kindof) {
		   ret = wsasm_src2obj_data(context, ret);
		   ret.data_found = true;
	       }

	       if ("text" == ret.seg[segname].kindof) {
		   ret = wsasm_src2obj_text(context, ret);
		   ret.text_found = true;
	       }

	       // Check errors
	       if (context.error != null) {
	       	   ret.error = context.error;
		   return ret;
	       }
	 }

	 return ret;
}


// pass 2: replace pseudo-instructions
function wsasm_resolve_pseudo ( context, ret )
{
         // TODO: magic to replace pseudoinstruction with the instructions(s)...

	 return ret;
}


// pass 3: check that all used labels are defined in the text
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

         // TODO: review the pending labels (forth and back)
         for (var i=0; i<ret.obj.length; i++)
         {
              // skip instructions right now...
              if ('instruction' == ret.obj[i].datatype) {
                     continue ;
              }

              if (ret.obj[i].pending != null) {
                    // TODO
              }
         }


         // reverse labels (hash labels2 -> key)
         for (var key in ret.labels2) {
              ret.labels2_rev[ret.labels2[key]] = key ;
         }

         // reverse segments (hash segname -> properties)
         for (var skey in ret.seg) {
              ret.seg_rev.push({ 'begin': parseInt(ret.seg[skey].begin), 'name': skey }) ;
         }

         return ret ;
}


 /*
  *  Auxiliar for binary
  */

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
 *  Public API
 */

function wsasm_src2obj ( CU_data, asm_source )
{
         var ret = {} ;
         ret.obj         = [] ;
         ret.mp          = {} ;
	 ret.seg         = sim_segments ;
         ret.seg_rev     = [] ;
         ret.labels2     = {} ;
         ret.labels2_rev = {} ;
	 ret.labels      = {} ; // [addr] = {name, addr, startbit, stopbit}

         // pass 0: prepare context
         var context = wsasm_prepare_context(CU_data, asm_source) ;
	 if (context == null) {
               return asm_langError(context,
                                    i18n_get_TagFor('compiler', 'UNKNOWN 2')) ;
	 }

         // pass 1: compile assembly (without replace pseudo-instructions)
         ret = wsasm_compile_src2obj(context, ret) ;
	 if (ret.error != null) {
	       return ret;
	 }

         // pass 2: replace pseudo-instructions
         ret = wsasm_resolve_pseudo(context, ret) ;
	 if (ret.error != null) {
	     return ret;
	 }

	 // pass 3: check that all used labels are defined in the text
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

         var seg_name        = '' ;
         var last_assig_word = {} ;

         var gen = {} ;
         gen.byteWord     = 0 ;
         gen.addr         = -1 ;
         gen.machine_code = '' ;
         gen.track_source = [] ;
         gen.comments     = [] ;

         for (var i=0; i<ret.obj.length; i++)
         {
              // (1) update initial word address for this segment if needed...
              seg_name = ret.obj[i].seg_name ;
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

function wsasm_src2mem ( text, datosCU )
{
     var ret = null ;

     try
     {
         ret = wsasm_src2obj(datosCU, text) ;
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
         console.log("'wsasm_src2mem' found an ERROR :-(\n" + e) ;
         console.log(e.stack) ;
     }

     return ret ;
}

