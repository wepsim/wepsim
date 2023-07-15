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
function simlang_compile_prepare_context ( CU_data, asm_source )
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
                          name:   initial.name,
			  fields: (typeof initial.fields !== "undefined" ? initial.fields : false),
			  signature: initial.signature,
			  signatureUser: initial.signature.replace(/,/g," "),
			  finish: finish.signature,
			  isPseudoinstruction: true
                       } ;
                context.firmware[initial.name].push(elto) ;
	   }

	   return context ;
}


// pass 1: compile assembly (without replace pseudo-instructions)
function read_data_v2  ( context, ret )
{
	   var possible_tag = "" ;
           var seg_name = asm_getToken(context) ;

	   var gen = {};
	   gen.byteWord     = 0;
           gen.track_source = [] ;
           gen.comments     = [] ;
	   gen.machineCode  = reset_assembly(1);
           gen.seg_ptr      = ret.seg[seg_name].begin ;

	   //
	   //  .data
	   //  *.text*
	   //

           asm_nextToken(context) ;

	   // Loop while token read is not a segment directive (.text/.data/...)
	   while (!is_directive_segment(asm_getToken(context)) && !is_end_of_file(context))
           {
		   //
		   //  * etiq1: *
		   //  * etiq2: *  .word 2, 4
		   //

		   possible_tag = "" ;
		   while (!is_directive_datatype(asm_getToken(context)) && !is_end_of_file(context))
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

		      var tag = possible_tag.substring(0, possible_tag.length-1);

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
		      ret.labels2[tag] = "0x" + (gen.seg_ptr+gen.byteWord).toString(16);

		      // .<datatype> | tagX+1
		      asm_nextToken(context) ;
		   }

		   // check if end of file has been reached
		   if (is_end_of_file(context)) {
			break;
                   }

		   //
		   //    etiq1:
		   //    etiq2: *.word* 2, 4
		   //

		   var possible_datatype = asm_getToken(context) ;

		   //            .word  *2, 4, 0x8F, 'a', 077*
		   //            .float *1.2345*
		   if ( (".word"   == possible_datatype) ||
		        (".half"   == possible_datatype) ||
		        (".byte"   == possible_datatype) ||
		        (".float"  == possible_datatype) ||
		        (".double" == possible_datatype) )
                   {
			// Get value size in bytes
			var size = get_datatype_size(possible_datatype) ;

                        // <value> | .<directive>
		        asm_nextToken(context) ;
                        var possible_value = asm_getToken(context) ;

			while (!is_directive(asm_getToken(context)) && !is_end_of_file(context))
                        {
				var label_found = false;

				// Get value
				var ret1 = get_inm_value(possible_value) ;
				var number = ret1.number ;
				if ( (ret1.isDecimal == false) && (ret1.isFloat == false) )
                                {
				    if (".word" !== possible_datatype)
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
			   	     a = decimal2binary(number, size*BYTE_LENGTH) ;
			        else a =   float2binary(number, size*BYTE_LENGTH) ;

			        num_bits   = a[0] ;
                                free_space = a[1] ;

				// Check size
				if (free_space < 0)
                                {
				    return asm_langError(context,
                                                         i18n_get_TagFor('compiler', 'EXPECTED VALUE') + possible_datatype +
                                                         "' (" + size*BYTE_LENGTH + " bits), " +
                                                         i18n_get_TagFor('compiler', 'BUT INSERTED') + possible_value +
                                                         "' (" + num_bits.length + " bits) " +
                                                         i18n_get_TagFor('compiler', 'INSTEAD') ) ;
				}

				// Word filled
                                writememory_and_reset(ret.mp, gen, 1) ;

				// Align to size
				while ( ((gen.seg_ptr+gen.byteWord) % size) != 0 )
                                {
					gen.byteWord++;
					// Word filled
                                        writememory_and_reset(ret.mp, gen, 1) ;
				}

		                // Store tag
                                if ("" != possible_tag) {
		                    ret.labels2[possible_tag.substring(0, possible_tag.length-1)] = "0x" + (gen.seg_ptr+gen.byteWord).toString(16) ;
				    possible_tag = "" ;
				}

				// Label as number (later translation)
				if (label_found) {
				    ret.labels["0x" + gen.seg_ptr.toString(16)] = { name:possible_value,
										    addr:gen.seg_ptr,
										    startbit:31,
										    stopbit:0,
										    rel:undefined,
										    nwords:1,
										    labelContext:asm_getLabelContext(context) };
				}

				// Store number in machine code
				gen.machineCode = assembly_replacement(gen.machineCode,
								       num_bits,
            					                       BYTE_LENGTH*(size+gen.byteWord),
            					                       BYTE_LENGTH*gen.byteWord, free_space) ;
				gen.byteWord += size ;
				gen.track_source.push(possible_value) ;

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

		   //            .space *20*
		   //            .zero  *20*
		   else if ( (".space" == possible_datatype) ||
                             (".zero"  == possible_datatype) )
                   {
                        // <value>
		        asm_nextToken(context) ;
                        var possible_value = asm_getToken(context) ;

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

			// Fill with spaces/zeroes
			for (i=0; i<possible_value; i++)
                        {
				// Word filled
                                writememory_and_reset(ret.mp, gen, 1) ;
				gen.byteWord++;

		                if (".zero" == possible_datatype)
				     gen.track_source.push('0x0') ;
				else gen.track_source.push('_') ;
			}

			asm_nextToken(context) ;
                   }

		   //            .align *2*
		   else if (".align" == possible_datatype)
                   {
                        // <value>
		        asm_nextToken(context) ;
                        var possible_value = asm_getToken(context) ;

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

			// Word filled
                        writememory_and_reset(ret.mp, gen, 1) ;

			// Calculate offset
                        var align_offset = Math.pow(2,parseInt(possible_value)) ;

			switch (align_offset) {
				case 1:
					break;
				case 2:
					if (gen.byteWord & 1 == 1)
						gen.byteWord++;
					break;
				default:
					// Fill with spaces
                                        writememory_and_reset(ret.mp, gen, 1) ;
					while ((gen.seg_ptr%align_offset != 0) || (gen.byteWord != 0))
                                        {
						// Word filled
						gen.byteWord++;
                                                writememory_and_reset(ret.mp, gen, 1) ;
					}
				/*
					while (true)
                                        {
						// Word filled
                                                writememory_and_reset(ret.mp, gen, 1) ;
						if (gen.seg_ptr%align_offset == 0 && gen.byteWord == 0)
							break;
						gen.byteWord++;
					}
				*/
			}

			asm_nextToken(context) ;
                   }

		   //  * .ascii  "hola", " mundo\n"
		   //  * .asciiz "hola mundo"
		   //  * .string "hola mundo"
		   else if ( (".ascii"  == possible_datatype) ||
                             (".asciiz" == possible_datatype) ||
                             (".string" == possible_datatype) )
                   {
                        // <value> | .<directive>
		        asm_nextToken(context) ;
                        var possible_value = asm_getToken(context) ;
                        var ret1 = treatControlSequences(possible_value) ;
			if (true == ret1.error) {
			    return asm_langError(context, ret1.string);
		        }
                        possible_value = ret1.string ;

			while (!is_directive(asm_getToken(context)) && !is_end_of_file(context))
                        {
				// Word filled
                                writememory_and_reset(ret.mp, gen, 1) ;

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
				for (i=0; i<possible_value.length; i++)
                                {
					// Word filled
                                        writememory_and_reset(ret.mp, gen, 1) ;

					if (possible_value[i] == "\"") {
                                            continue;
                                        }

					num_bits = possible_value.charCodeAt(i).toString(2);

					// Store character in machine code
					gen.machineCode = assembly_replacement(gen.machineCode,
      									       num_bits,
									       BYTE_LENGTH*(1+gen.byteWord),
									       BYTE_LENGTH*gen.byteWord,
									       BYTE_LENGTH-num_bits.length) ;
					gen.byteWord++;
				        gen.track_source.push(possible_value[i]) ;
				}

                                if (".asciiz" == possible_datatype || ".string" == possible_datatype)
                                {
                                	// Word filled
                                        writememory_and_reset(ret.mp, gen, 1) ;

					num_bits = "\0".charCodeAt(0).toString(2);

					// Store field in machine code
					gen.machineCode = assembly_replacement(gen.machineCode,
								               num_bits,
									       BYTE_LENGTH*(1+gen.byteWord),
									       BYTE_LENGTH*gen.byteWord,
									       BYTE_LENGTH-num_bits.length) ;
					gen.byteWord++;
				        gen.track_source.push('0x0') ;
				}

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
                                             "'" + possible_datatype + "'") ;
		   }
           }

	   // Fill memory
	   if (gen.byteWord > 0)
	   {
	        var melto = {
			      "value":           gen.machineCode,
			      "source_tracking": gen.track_source,
			      "comments":        gen.comments
			    } ;
                main_memory_set(ret.mp, "0x" + gen.seg_ptr.toString(16), melto) ;

                gen.seg_ptr = gen.seg_ptr + WORD_BYTES ;
	   }

           ret.seg[seg_name].end = gen.seg_ptr ;  // end of segment is just last pointer value...
}

function read_text_v2  ( context, ret )
{
          //
          // TODO
          //

          asm_nextToken(context) ;

	  // Loop while token read is not a segment directive (.text/.data/...)
	  while (!is_directive_segment(asm_getToken(context)) && !is_end_of_file(context))
          {
		// check tag(s) or error
		while (
                   (typeof context.firmware[asm_getToken(context)] === "undefined") &&
                   (! is_end_of_file(context))
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

		// check if end of file has been reached
                if (is_end_of_file(context)) {
               	    break ;
                }

		// get instruction
		var instruction = asm_getToken(context) ;

                // get possible fields...


          }

          return ret ;
}

function simlang_compile_pass1 ( context, ret )
{
	  ret.data_found = false;
	  ret.text_found = false;

          //
          // .segment
          // ...
          //
          asm_nextToken(context) ;
          while (!is_end_of_file(context))
          {
	       var segname = asm_getToken(context);

	       if (typeof ret.seg[segname] === "undefined") {
		   return asm_langError(context,
		                        i18n_get_TagFor('compiler', 'INVALID SEGMENT NAME') +
                                        "'" + segname + "'") ;
	       }

	       if ("data" == ret.seg[segname].kindof) {
		   read_data_v2(context, ret);
		   ret.data_found = true;
	       }

	       if ("text" == ret.seg[segname].kindof) {
		   read_text_v2(context, ret);
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
function simlang_compile_pass2 ( context, ret )
{
     // TODO
}


// pass 3: check that all used labels are defined in the text
function simlang_compile_pass3 ( context, ret )
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

function simlang_compile_v1_helper ( CU_data, asm_source )
{
           var ret = {} ;
           ret.mp          = {} ;
	   ret.seg         = sim_segments ;
           ret.seg_rev     = [] ;
           ret.labels2     = {} ;
           ret.labels2_rev = {} ;
	   ret.labels      = {} ; // [addr] = {name, addr, startbit, stopbit}

           // pass 0: prepare context
           var context = simlang_compile_prepare_context(CU_data, asm_source) ;
	   if (context == null) {
               return asm_langError(context,
                                    i18n_get_TagFor('compiler', 'UNKNOWN 2')) ;
	   }

           // pass 1: compile assembly (without replace pseudo-instructions)
           ret = simlang_compile_pass1(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

           // pass 2: replace pseudo-instructions
           ret = simlang_compile_pass2(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

	   // pass 3: check that all used labels are defined in the text
           ret = simlang_compile_pass3(context, ret) ;
	   if (ret.error != null) {
	       return ret;
	   }

	   return ret;
}

