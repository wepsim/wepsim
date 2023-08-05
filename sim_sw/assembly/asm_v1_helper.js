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
function wsasm_compile_prepare_context ( CU_data, asm_source )
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


// pass 1: compile assembly (data and text without replacing pseudo-instructions)

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
                   } ;

        if (null != base_elto) {
	    elto.seg_name  = base_elto.seg_name ;
	    elto.datatype  = base_elto.datatype ;
            elto.byte_size = base_elto.byte_size ;
        }

        return elto ;
}

function ws_is_EndOfFile (context)
{
        return ("" === asm_getToken(context)) && (context.t >= context.text.length) ;
}


function wsasm_read_data ( context, ret )
{
	   var possible_tag   = "" ;
           var possible_value = "" ;
           var tag            = "" ;
           var acc_cmt        = "" ;
           var elto    = null ;
           var ret_obj = [] ;

	   //
	   //  *.data*    *.data*
	   //   .text       label1: .directive "value"
	   //

           var seg_name = asm_getToken(context) ;
           asm_nextToken(context) ;
           elto = wsasm_new_objElto(null) ;


	   //
	   //   .data      .data
	   //  *.text*     *label1: .directive "value"*
	   //

	   // Loop while token read is not a segment directive (.text/.data/...) or end_of_file is found
	   while (!is_directive_segment(asm_getToken(context)) && !ws_is_EndOfFile(context))
           {
		   //
		   //  * label1: *
		   //  * label2: *  .word 2, 4
		   //

                   acc_cmt = asm_getComments(context) ;
                   asm_resetComments(context) ;

		   possible_tag = "" ;
		   while (!is_directive_datatype(asm_getToken(context)) && !ws_is_EndOfFile(context))
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

   		      if (! isValidTag(tag)) {
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
		   if (ws_is_EndOfFile(context)) {
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

			while (!is_directive(asm_getToken(context)) && !ws_is_EndOfFile(context))
                        {
				var label_found = false;

				// Get value
				var ret1   = get_inm_value(possible_value) ;
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
				    if (! isValidTag(possible_value)) {
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
				    // // // TODO
				    ret.labels["0x" + elto.seg_ptr.toString(16)] = {
                                                                                     name:         possible_value,
										     addr:         elto.seg_ptr,
										     startbit:     31,
										     stopbit:      0,
										     rel:          undefined,
										     nwords:       1,
										     labelContext: asm_getLabelContext(context)
                                                                                  } ;
				}

				// Add ELTO
                                elto.seg_name   = seg_name ;
				elto.track_source.push(possible_value) ;
		                elto.comments.push(acc_cmt) ;
			     // elto.num_bits   = num_bits ;   // No needed by now
			     // elto.free_space = free_space ; // No needed by now

				ret_obj.push(elto) ;
                                elto = wsasm_new_objElto(elto) ; // new elto, same datatype


				// optional ','
				asm_nextToken(context) ;
				if ("," == asm_getToken(context)) {
				    asm_nextToken(context) ;
                                }

			        if ( is_directive(asm_getToken(context)) ||
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
			var ret1 = isDecimal(possible_value) ;
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

			// ELTO: spaces/zeroes
                        elto.seg_name   = seg_name ;
			if (".zero" == elto.datatype)
			     elto.track_source.push('0x0') ;
			else elto.track_source.push('_') ;
			elto.comments.push(acc_cmt) ;
		        elto.byte_size  = possible_value ;
		     // elto.num_bits   = num_bits ;   // No needed by now
		     // elto.free_space = free_space ; // No needed by now

			ret_obj.push(elto) ;
			elto = wsasm_new_objElto(null) ;

			asm_nextToken(context) ;
                   }

                   else if (wsasm_has_datatype_attr(elto.datatype, "align"))
                   {
		        //   .align *2*

                        // <value>
		        asm_nextToken(context) ;
                        possible_value = asm_getToken(context) ;

			// Check if number
			var ret1 = isDecimal(possible_value) ;
			possible_value = ret1.number ;
			if ( (ret1.isDecimal == false) && (possible_value >= 0) )
                        {
			     return asm_langError(context,
			                          i18n_get_TagFor('compiler', 'INVALID ALIGN VALUE') +
                                                  "'" + possible_value + "'. " +
			                          i18n_get_TagFor('compiler', 'REMEMBER ALIGN VAL')) ;
		        }

			// Calculate offset
                        var align_offset = Math.pow(2, parseInt(possible_value)) ;

			// ELTO: spaces/zeroes
                        elto.seg_name   = seg_name ;
			elto.track_source.push('.align ' + possible_value) ;
			elto.comments.push(acc_cmt) ;
		        elto.byte_size  = align_offset ;
		     // elto.num_bits   = 0 ; // No needed by now
		     // elto.free_space = 0 ; // No needed by now

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

                        var ret1 = treatControlSequences(possible_value) ;
			if (true == ret1.error) {
			    return asm_langError(context, ret1.string);
		        }
                        possible_value = ret1.string ;

			while (!is_directive(asm_getToken(context)) && !ws_is_EndOfFile(context))
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
				elto.byte_size = possible_value.length ;
				for (i=0; i<possible_value.length; i++)
                                {
				     if (possible_value[i] == "\"") {
                                         elto.byte_size -- ;
                                     }
				}
                                if (".asciiz" == elto.datatype) {
                                     elto.byte_size ++ ;
                                }
			     // elto.num_bits   = num_bits ;   // No needed by now
			     // elto.free_space = free_space ; // No needed by now

				ret_obj.push(elto) ;
				elto = wsasm_new_objElto(elto) ;


				// optional ','
				asm_nextToken(context);

				if ("," == asm_getToken(context)) {
				    asm_nextToken(context);
			        }

			        if ( is_directive(asm_getToken(context)) || ("TAG" == asm_getTokenType(context)) || "." == asm_getToken(context)[0] )
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

           if (elto.datatype != '') {
               ret_obj.push(elto) ;
           }

	   // Fill ret with obj and return ret
           ret.obj = ret_obj ;
           return ret ;
}

function wsasm_pass2_data ( context, ret )
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
                // skip instructions right now...
                if ('instruction' == ret.obj[i].datatype) {
                     continue ;
                }

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
                if (wsasm_has_datatype_attr(ret.obj[i].datatype, "numeric"))
                {
                    // TODO

                    ret.obj[i].machine_code = 0 ; // need_in_memory as machineCode: string of 32 chars ('0'/'1')
                }
                else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "string"))
                {
                    // TODO

                    ret.obj[i].padding = elto_align - (ret.obj[i].byte_size % elto_align) ;
                    ret.obj[i].machine_code = 0 ; // need_in_memory as machineCode: string of 32 chars ('0'/'1')
                }
                else if (wsasm_has_datatype_attr(ret.obj[i].datatype, "space"))
                {
                    // TODO

                    ret.obj[i].padding = elto_align - (ret.obj[i].byte_size % elto_align) ;
                    ret.obj[i].machine_code = 0 ; // need_in_memory as machineCode: string of 32 chars ('0'/'1')
                }

                // update last address of segment...
                last_assigned[seg_name] = elto_ptr + ret.obj[i].byte_size + ret.obj[i].padding ;
           }

           return ret ;
}


function wsasm_read_text ( context, ret )
{
          //
          // TODO
          //

          asm_nextToken(context) ;

	  // Loop while token read is not a segment directive (.text/.data/...)
	  while (!is_directive_segment(asm_getToken(context)) && !ws_is_EndOfFile(context))
          {
/*****
		// check tag(s) or error
		while (
                   (typeof context.firmware[asm_getToken(context)] === "undefined") &&
                   (! ws_is_EndOfFile(context))
                )
                {
			var possible_tag = asm_getToken(context);

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

		        var tag = possible_tag.substring(0, possible_tag.length-1);
   		        if (!isValidTag(tag)) {
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

			// store tag
			ret.labels2[tag] = "0x" + seg_ptr.toString(16);

			asm_nextToken(context);
		}
*****/

		// check if end of file has been reached
                if (ws_is_EndOfFile(context)) {
               	    break ;
                }

		// get instruction
		var instruction = asm_getToken(context) ;
                asm_nextToken(context) ;

                // get possible fields...
                // ...
          }

          return ret ;
}

function wsasm_compile_pass1 ( context, ret )
{
	  ret.data_found = false;
	  ret.text_found = false;

          //
          // .segment
          // ...
          //
          asm_nextToken(context) ;
          while (!ws_is_EndOfFile(context))
          {
	       var segname = asm_getToken(context);

	       if (typeof ret.seg[segname] === "undefined") {
		   return asm_langError(context,
		                        i18n_get_TagFor('compiler', 'INVALID SEGMENT NAME') +
                                        "'" + segname + "'") ;
	       }

	       if ("data" == ret.seg[segname].kindof) {
		   ret = wsasm_read_data(context, ret);
		   ret.data_found = true;
	       }

	       if ("text" == ret.seg[segname].kindof) {
		   ret = wsasm_read_text(context, ret);
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
function wsasm_compile_pass2 ( context, ret )
{
         ret = wsasm_pass2_data(context, ret) ;

     // TODO: wsasm_pass2_text

	 return ret;
}


// pass 3: check that all used labels are defined in the text
function wsasm_compile_pass3 ( context, ret )
{
     // TODO

         // reverse labels (hash labels2 -> key)
         for (var key in ret.labels2) {
              ret.labels2_rev[ret.labels2[key]] = key ;
         }

         // reverse segments (hash segname -> properties)
         for (var skey in ret.seg) {
              ret.seg_rev.push({ 'begin': parseInt(ret.seg[skey].begin), 'name': skey }) ;
         }

	 return ret;
}


/*
 *  Compile assembly
 */

function wsasm_compile_v1_helper ( CU_data, asm_source )
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
           var context = wsasm_compile_prepare_context(CU_data, asm_source) ;
	   if (context == null) {
               return asm_langError(context,
                                    i18n_get_TagFor('compiler', 'UNKNOWN 2')) ;
	   }

           // pass 1: compile assembly (without replace pseudo-instructions)
           ret = wsasm_compile_pass1(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

           // pass 2: replace pseudo-instructions
           ret = wsasm_compile_pass2(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

	   // pass 3: check that all used labels are defined in the text
           ret = wsasm_compile_pass3(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

	   return ret;
}

