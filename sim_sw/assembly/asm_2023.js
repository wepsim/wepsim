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


//
// Auxiliar from v1
//

function isValidTag ( tag )
{
        if (tag.trim() == "") {
	    return false;
        }

	var ret = isDecimal(tag[0]) ;
	if (ret.isDecimal == true) {
	    return false;
        }

	var myRegEx  = /[^a-z,_\d]/i ;
	return !(myRegEx.test(tag)) ;
}

function is_end_of_file (context)
{
	return ("" === asm_getToken(context)) && (context.t >= context.text.length) ;
}

function reset_assembly (nwords)
{
        return "0".repeat(WORD_LENGTH*nwords);
}

function assembly_replacement (machineCode, num_bits, startbit, stopbit, free_space)
{
	var machineCodeAux = machineCode.substring(0, machineCode.length-startbit+free_space);
	machineCode = machineCodeAux + num_bits + machineCode.substring(machineCode.length-stopbit);

	return machineCode;
}

function assembly_co_cop(machineCode, co, cop)
{
        var xr_info = simhw_sim_ctrlStates_get() ;

	if (co !== false)
	    machineCode = assembly_replacement(machineCode, co, WORD_LENGTH, WORD_LENGTH-6, 0);
	if (cop !== false)
	    machineCode = assembly_replacement(machineCode, cop, xr_info.ir.default_eltos.cop.length, 0, 0);

	return machineCode;
}

function writememory_and_reset ( mp, gen, nwords )
{
	if (gen.byteWord >= WORD_BYTES)
        {
	    var melto = {
			  "value":           gen.machineCode,
			  "source_tracking": gen.track_source,
			  "comments":        gen.comments
			} ;
            main_memory_set(mp, "0x" + gen.seg_ptr.toString(16), melto) ;

            gen.seg_ptr      = gen.seg_ptr + WORD_BYTES ;
            gen.byteWord     = 0 ;
            gen.track_source = [] ;
            gen.comments     = [] ;
            gen.machineCode  = reset_assembly(nwords) ;
        }
}

function sum_array ( a )
{
	return a.reduce(function(a, b) { return a + b; }, 0);
}

function get_candidate ( advance, instruction )
{
	var candidate = false;
	var candidates = {};
	var signatures = {};

	for (i=0; i<advance.length; i++)
        {
		if (advance[i]) {
			candidates[i] = instruction[i].nwords;
			signatures[instruction[i].signature] = 0;
		}
	}

	if (Object.keys(signatures).length === 1)
        {
		var min = false;
		for (var i in candidates)
                {
			if (min == false) {
				min = candidates[i];
				candidate = i;
			}
			else if (min == candidates[i]) {
                                 candidate = false;
			}
			else if (min > candidates[i]) {
				min = candidates[i];
				candidate = i;
			}
		}
	}

	return candidate ? parseInt(candidate) : candidate;
}



// Auxiliar for v2
function bits_size ( bits )
{
	var len = 0;
	for (var i=0; i<bits.length; i++)
	{
	     len += bits[i][0] - bits[i][1] + 1 ;
	}

	return len ;
}

function setCharAt ( str, index, chr ) {
	if(index > str.length-1) return str;
	return str.substring(0,index) + chr + str.substring(index+1);
}

function assembly_oc_eoc_v2 ( machineCode, oc, eoc )
{
	var xr_info = simhw_sim_ctrlStates_get() ;
	var bits  = xr_info.ir.default_eltos.eoc.bits_field ;
	var start = 31 - xr_info.ir.default_eltos.oc.begin + 1;
	var stop  = 31 - xr_info.ir.default_eltos.oc.end;

	if (oc !== false) {
	    machineCode = assembly_replace_v2(machineCode, oc, start, stop, 0, 0);
        }

	if (eoc !== false)
        {
		if (eoc.length === 3) {
			machineCode = assembly_replace_v2(machineCode, eoc, bits[0][0]+1, bits[0][1], 0, 0);
		} else {
			//machineCode = assembly_replace_v2(machineCode, eoc, undefined, undefined, bits, 0);
			var j = 0;
			for (var k=0; k < bits.length; k++)
                        {
				for (var i=(31-bits[k][0]); i <= (31-bits[k][1]); i++) {
					if (j < eoc.length) {
						machineCode = setCharAt(machineCode, i, eoc[j]);
						j++;
					}
				}
			}

		}
        }

	return machineCode;
}

function assembly_replace_v2 ( machineCode, num_bits, startbit, stopbit, bits, free_space )
{

	if (startbit !== undefined && stopbit !== undefined) {
		// Version 1 assembly compiler code
		var machineCodeAux = machineCode.substring(0, machineCode.length-startbit+free_space);
		machineCode = machineCodeAux + num_bits + machineCode.substring(machineCode.length-stopbit);

		// Prevent word to be less than 32 bits
		if (machineCode.length < 32) {
			machineCode = "0".repeat(32-machineCode.length) + machineCode;
		}
	} else {
		// Assembly replace for separated fields
		var j = num_bits.length-1;
		for (var k=0; k < bits.length; k++) {
			//for (var i=(31-bits[k][0]); i < (32-bits[k][1]); i++) {
			for (var i=(31-bits[k][1]); i >= (31-bits[k][0]); i--) {
				if (j >= 0) {
					machineCode = setCharAt(machineCode, i, num_bits[j]);
					j--;
				}
			}
		}
	}

	return machineCode;
}


/*
 *   Load segments
 */

function read_data_v2 ( context, datosCU, ret )
{
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
	   while (!wsasm_is_directive_segment(asm_getToken(context)) && !is_end_of_file(context))
           {
		   //
		   //  * etiq1: *
		   //  * etiq2: *  .word 2, 4
		   //

		   var possible_tag = "" ;
		   while (!wsasm_is_directive_datatype(asm_getToken(context)) && !is_end_of_file(context))
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
		      if (ret.labels_asm[tag]) {
			  return asm_langError(context,
			                       i18n_get_TagFor('compiler', 'REPEATED TAG') +
                                               "'" + tag + "'") ;
		      }

		      // Store tag
		      ret.labels_asm[tag] = "0x" + (gen.seg_ptr+gen.byteWord).toString(16);

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
			var size = wsasm_get_datatype_size(possible_datatype) ;

                        // <value> | .<directive>
		        asm_nextToken(context) ;
                        var possible_value = asm_getToken(context) ;

			while (!wsasm_is_directive(asm_getToken(context)) && !is_end_of_file(context))
                        {
				var label_found = false;

				// Get value
				var ret1 = dt_get_imm_value(possible_value) ;
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
		                    ret.labels_asm[possible_tag.substring(0, possible_tag.length-1)] = "0x" + (gen.seg_ptr+gen.byteWord).toString(16) ;
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

			while (!wsasm_is_directive(asm_getToken(context)) && !is_end_of_file(context))
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

function read_text_v2 ( context, datosCU, ret )
{
	   //
	   //  .text
	   //

           var seg_name = asm_getToken(context) ;
           var seg_ptr  = ret.seg[seg_name].begin ;

	   // get firmware and pseudoinstructions
	   var firmware = context.firmware;
	   var pseudoInstructions = context.pseudoInstructions;

	   var finish = [] ;
	   var isPseudo = false;
	   var pfinish = [] ;
	   var npseudoInstructions = 0 ;
	   var pseudo_fields = {} ;

	   var counter = -1;
	   var candidate ;
	   var error = "" ;

	   // Fill register names
	   var registers = {} ;
	   for (i=0; i<datosCU.registers.length; i++)
	   {
		if (typeof datosCU.registers[i] === 'undefined') {
                    continue ;
                }
		for (var j=0; j<datosCU.registers[i].length; j++) {
		     registers[datosCU.registers[i][j]] = i ;
                }
	   }

           asm_nextToken(context) ;

	   // Loop while token read is not a segment directive (.text/.data/...)
	   while (!wsasm_is_directive_segment(asm_getToken(context)) && !is_end_of_file(context))
           {
		// check tag or error
		while (
                   (! isPseudo) &&
                   (typeof firmware[asm_getToken(context)] === "undefined") &&
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
			if (firmware[tag]) {
			    return asm_langError(context,
			                         i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                                 "'" + tag + "'") ;
                        }
			if (ret.labels_asm[tag]) {
			    return asm_langError(context,
			                         i18n_get_TagFor('compiler', 'REPEATED TAG') +
                                                 "'" + tag + "'") ;
                        }

			// store tag
			ret.labels_asm[tag] = "0x" + seg_ptr.toString(16);

			asm_nextToken(context);
		}

		// check if end of file has been reached
                if (is_end_of_file(context)) {
               	    break ;
                }

		// get instruction
		var instruction = null ;
		if (! isPseudo) {
			finish = [] ;
			instruction = asm_getToken(context) ;
		}
		else {
			instruction = pfinish[counter++] ;
                }

		var signature_fields      = [];	// e.g. [[reg,reg], [reg,inm], [reg,addr,inm]]
		var signature_user_fields = [];	// signature user fields
		var advance = [];		// array that indicates wheather each signature can be considered or not
		var max_length = 0;		// max number of parameters of the signatures
		var binaryAux  = [];		// necessary parameters of the fields of each signature

		// Fill parameters
		var firmware_instruction_length = 0 ;
		if (typeof firmware[instruction] !== "undefined") {
		    firmware_instruction_length = firmware[instruction].length ;
		}

		var val = [] ;
		for (i=0; i<firmware_instruction_length; i++)
		{
			signature_fields[i]      = firmware[instruction][i].signature.split(",") ;
			signature_user_fields[i] = firmware[instruction][i].signatureUser.split(" ") ;
			signature_fields[i].shift() ;
			signature_user_fields[i].shift() ;
			advance[i]   = 1 ;
			binaryAux[i] = [] ;
			max_length   = Math.max(max_length, signature_fields[i].length) ;
			finish[i]    = [] ;

			// pseudoinstruction
			if (
                             (typeof pseudoInstructions[instruction] !== "function") &&
			     (pseudoInstructions[instruction]) &&
                             (typeof firmware[instruction][i].finish !== "undefined")
                           )
                        {
				val = firmware[instruction][i].finish.replace(/ ,/g,"").split(" ") ;
				val.pop() ;
				finish[i] = val ;

				npseudoInstructions = 0 ;
			}
		}

		// Iterate over fields
		var converted;
		var value;

		var s = [];
                s[0] = instruction;
		for (i=0; i<max_length; i++)
                {
                        // get next field...
			if (counter == -1)
                        {
				// optional ','
				asm_nextToken(context);
				if ("," == asm_getToken(context)) {
				    asm_nextToken(context);
                                }

                                // ... from source
				value = asm_getToken(context);
			}
			else
                        {
                                // ... from pseudoins (associated code)
				var aux_fields = pfinish[counter++];
				if (pseudo_fields[aux_fields])
				     value = pseudo_fields[aux_fields];
				else value = aux_fields;
			}

			if (("TAG" != asm_getTokenType(context)) && (!firmware[value])) {
                            s[i+1] = value ;
                        }

			// vertical search (different signatures)
			for (j=0; j<advance.length; j++)
                        {
				// check whether explore this alternative
				if (advance[j] == 0) {
				    continue;
                                }

				if (i >= signature_fields[j].length)
                                {
				    // if next token is not instruction or tag
				    if ( ("TAG" != asm_getTokenType(context)) &&
                                         (!firmware[value]) &&
                                         (!is_end_of_file(context)) )
                                    {
				          advance[j] = 0;
                                    }

				    continue;
				}

				// get field information
				var field = firmware[instruction][j].fields[i] ;
				if (field.bits !== undefined)
					var size = bits_size(field.bits) ;
				else
					var size = field.startbit - field.stopbit + 1 ;

				var label_found = false ;
				var sel_found   = false ;

				// check field
				switch(field.type)
                	        {
				    // 0xFFFFF,... | 23, 'b', ...
				    case "address":
				    case "inm":
					case "imm":
					 if (isPseudo && ("sel" == value))
                                         {
						counter++;
						var start = pfinish[counter++];
						var stop  = pfinish[counter++];
			 			var value = pseudo_fields[pfinish[counter++]];
						counter++;
						sel_found = true;
					 }

					 // Get value
       					 var ret1 = dt_get_imm_value(value) ;
					 converted = ret1.number ;
                                         if ( (ret1.isDecimal == false) && (ret1.isFloat == false) )
                                         {
			                     error = i18n_get_TagFor('compiler', 'NO NUMERIC DATATYPE') +
                                                     "'" + value + "'" ;

                                             if ((value[0] == "'")) {
                                                  advance[j] = 0 ;
                                                  break ;
                                             }
					     if (! isValidTag(value)) {
						  advance[j] = 0 ;
						  break ;
					     }
					     if (firmware[value]) {
			                          error = i18n_get_TagFor('compiler', 'TAG OR INSTRUCTION') +
                                                          "'" + value + "'" ;
						  advance[j] = 0 ;
						  break ;
					     }

					     label_found = true ;
                                         }

					 if (sel_found)
                                         {
                                             if (ret1.isDecimal == true)
					          res = decimal2binary(converted, WORD_LENGTH) ;
					     else res =   float2binary(converted, WORD_LENGTH) ;

					     if (res[1] < 0) {
						 return asm_langError(context,
								      "'" + value + "' " +
							              i18n_get_TagFor('compiler', 'BIGGER THAN') +
								      WORD_LENGTH + " " +
                                                                      i18n_get_TagFor('compiler', 'BITS'));
					     }

					     if (label_found) {
					         s[i+1] = value ;
                                             }
					     else
                                             {
					         converted = "0".repeat(res[1]) + res[0];
					         converted = converted.substring(WORD_LENGTH-start-1,
							                         WORD_LENGTH-stop);
					         converted = parseInt(converted, 2);
					         s[i+1] = "0x" + converted.toString(16);
                                             }
					 }

					 if (! label_found)
                                         {
                                             if (ret1.isDecimal == true)
					          var res = decimal2binary(converted, size) ;
					     else var res =   float2binary(converted, size) ;

					     if ((field.type == "address") && ("rel" == field.address_type))
                                             {
					       // res = decimal2binary(converted-seg_ptr-WORD_BYTES, size);
					          res = decimal2binary(converted, size);
                                             }
					 }

					 break;

				    // $1...
				    case "reg":
					 if (typeof value === "undefined") {
			                     error = i18n_get_TagFor('compiler', 'INS. MISSING FIELD') ;
					     advance[j] = 0 ;
					     break ;
					 }

					 var aux = false;
					 if (value.startsWith("("))
                                         {
						if ("(reg)" != signature_fields[j][i]) {
			                             error = i18n_get_TagFor('compiler', 'UNEXPECTED (REG)') ;
						     advance[j] = 0 ;
						     break ;
						}

						if (counter == -1) {
						    asm_nextToken(context);
						    value = asm_getToken(context);
						}
						else {
						    value = pseudo_fields[pfinish[counter++]];
						}

						aux = true;
					 }
					 else
					 {
						if ("(reg)" == signature_fields[j][i]) {
			                             error = i18n_get_TagFor('compiler', 'EXPECTED (REG)') +
                                                             "'" + value + "'" ;
						     advance[j] = 0 ;
						     break ;
						}
					 }

					 if (typeof registers[value] === "undefined")
                                         {
			                        error = i18n_get_TagFor('compiler', 'EXPECTED REG') +
                                                        "'" + value + "'" ;
						advance[j] = 0 ;
						break ;
					 }
					 if (aux)
                                         {
						s[i+1] = "(" + value + ")";

						// check closing ')'
						if (counter == -1) {
							asm_nextToken(context);
							aux = asm_getToken(context);
						}
						else {
							aux = pfinish[counter++];
						}

						if (")" != aux) {
			                             error = i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND') ;
						     advance[j] = 0 ;
						     break ;
						}
					 }

					 var ret1  = isDecimal(registers[value]) ;
					 converted = ret1.number ;
					 var res = decimal2binary(converted, size);
                                         value = s[i+1] ;
					 break;

				    default:
					 return asm_langError(context,
						              i18n_get_TagFor('compiler', 'UNKNOWN 1') +
                                                              "'" + field.type + "'") ;
				}

				// check if bits fit in the space
				if (advance[j] == 1 && !label_found)
				{
					if (res[1] < 0)
					{
						if (field.type == "address" && "rel" == field.address_type)
                                                {
						     error = "Relative value (" +
                                                             (converted - seg_ptr - WORD_BYTES) +
                                                             " in decimal)"+
				                             i18n_get_TagFor('compiler', 'NEEDS') +
                                                             res[0].length +
				                             i18n_get_TagFor('compiler', 'SPACE FOR # BITS') +
                                                             size + " " +
				                             i18n_get_TagFor('compiler', 'BITS') ;
                                                }
						else
                                                {
                                                     error = "'" + value + "'" +
				                             i18n_get_TagFor('compiler', 'NEEDS') +
                                                             res[0].length +
				                             i18n_get_TagFor('compiler', 'SPACE FOR # BITS') +
                                                             size + " " +
				                             i18n_get_TagFor('compiler', 'BITS') ;
                                                }

						advance[j] = 0;
					}
				}

				// store field
				if (advance[j] == 1 && (!(isPseudo && counter == -1)))
				{
				    binaryAux[j][i] = {
                                                         num_bits:    (label_found ? false : res[0]),
                                                         free_space:  (label_found ? false : res[1]),
                                                         startbit:    field.startbit,
                                                         stopbit:     field.stopbit,
                                                         bits:        field.bits,
                                                         rel:         (label_found ? field.address_type : false),
                                                         islabel:     label_found,
						         field_name:  value,
                                                         issel:       sel_found,
                                                         sel_start:   start,
                                                         sel_stop:    stop
                                	              };
				}
			}

			if (sum_array(advance) == 0) {
			    break;
			}

			if ("TAG" == asm_getTokenType(context) || firmware[value]) {
			    break;
			}
		}

		// get candidate
		for (i=0; i<advance.length; i++)
		{
		     if (advance[i] == 1)
                     {
			 candidate = i ;
// <TOCHECK>
                         if (! isPseudo) {
			      pfinish = finish[candidate] ;
                         }
                         isPseudo  = (isPseudo) || (typeof firmware[instruction][i].finish !== "undefined") ;
// </TOCHECK>
			 break ;
		     }
		}

		// instruction format
		var format = "" ;
		for (i=0; i<firmware_instruction_length; i++)
		{
			if (i>0 && i<firmware[instruction].length-1) {
				format += ", " ;
                        }
			if (i>0 && i==firmware[instruction].length-1) {
				format += " or " ;
                        }
			format += "'" + firmware[instruction][i].signatureUser + "'" ;
		}
                if (format == "") {
                    format = "'" + instruction + "' " +
			     i18n_get_TagFor('compiler', 'UNKNOWN MC FORMAT') ;
		}

		// check solution
		var sum_res = sum_array(advance) ;

		if (sum_res == 0)
                {
			// No candidate
			if (advance.length === 1) {
			    return asm_langError(context,
                                                 error + ". <br>" +
				                 i18n_get_TagFor('compiler', 'REMEMBER I. FORMAT') +
                                                 format);
			}

			return asm_langError(context,
				             i18n_get_TagFor('compiler', 'NOT MATCH MICRO') + "<br>" +
				             i18n_get_TagFor('compiler', 'REMEMBER I. FORMAT') + format + ". " +
				             i18n_get_TagFor('compiler', 'CHECK MICROCODE')) ;
		}

		if (sum_res > 1)
                {
			// Multiple candidates
			candidate = get_candidate(advance, firmware[instruction]);
			if (candidate === false) {
			    return asm_langError(context,
				                 i18n_get_TagFor('compiler', 'SEVERAL CANDIDATES') + format) ;
			}
		}

		// store pseudo_fields[field]=value, and continue
		if (isPseudo)
		{
			if (counter == -1)
			{
				var s_ori = s.join(" ") ;
                                    s_ori = s_ori.trim() ;

                                var key = "" ;
                                var val = "" ;
				pseudo_fields = {} ;
				for (i=0; i<signature_fields[candidate].length; i++)
                                {
				     key = firmware[instruction][candidate].fields[i].name ;
				     val = s[i+1] ;

                                     // if (val == "($2)") -> val = $2
                                     if (val.startsWith("("))
                                         val = val.substring(1, val.length) ;
                                     if (val.endsWith(")"))
                                         val = val.substring(0, val.length-1) ;

				     pseudo_fields[key] = val ;
				}

				counter++ ;
				continue ;
			}

			npseudoInstructions++ ;
			if (npseudoInstructions > 1) {
			    s_ori = "&nbsp;" ; // s_ori = "---";
			}

			if (pfinish[counter] == "\n") {
			    counter++ ;
			}
		}

		var machineCode = reset_assembly(firmware[instruction][candidate].nwords);

		if ( firmware[instruction][candidate].co !== false )
		{
			// replace OC and EOC in machine code
			machineCode = assembly_co_cop(machineCode,
											firmware[instruction][candidate].co,
											firmware[instruction][candidate].cop);
		}
		else
		{
			// replace CO and COP in machine code
			machineCode = assembly_oc_eoc_v2(machineCode,
											firmware[instruction][candidate].oc,
											firmware[instruction][candidate].eoc);
		}

		// store candidate fields in machine code
                var l_addr = "" ;
		for (i=0; i<binaryAux[candidate].length; i++)
		{
			// tag
			if (binaryAux[candidate][i].islabel)
                        {
			    l_addr = "0x" + seg_ptr.toString(16) ;
			    ret.labels[l_addr] = {
                                                   name:         binaryAux[candidate][i].field_name,
						   addr:         seg_ptr,
						   startbit:     binaryAux[candidate][i].startbit,
						   stopbit:      binaryAux[candidate][i].stopbit,
						   bits:         binaryAux[candidate][i].bits,
						   rel:          binaryAux[candidate][i].rel,
						   nwords:       firmware[instruction][candidate].nwords,
						   labelContext: asm_getLabelContext(context),
                                                   sel_found:    binaryAux[candidate][i].issel,
                                                   sel_start:    binaryAux[candidate][i].sel_start,
                                                   sel_stop:     binaryAux[candidate][i].sel_stop
                                                 } ;
                        }
			// replace instruction and fields in machine code
			else
                        {
			    machineCode = assembly_replace_v2(	machineCode,
								binaryAux[candidate][i].num_bits,
								binaryAux[candidate][i].startbit-(-1),
								binaryAux[candidate][i].stopbit,
								binaryAux[candidate][i].bits,
								binaryAux[candidate][i].free_space ) ;
                        }
		}

		// fix instruction format
		s_def = s[0] ;
		for (i=0, j=1; i<signature_user_fields[candidate].length; i++, j++)
		{
			switch(signature_user_fields[candidate][i])
			{
				case "address":
				case "inm":
				case "imm":
				case "reg":
				case "(reg)":
					s_def = s_def + " " + s[j];
					break;
				default:
					s_def = s_def + " " + s[j] + s[j+1];
					j++;
			}
		}

		if (!isPseudo) {
		     var s_ori = s_def ;
		}

		// ref has the associated information in firmware for this instruction
		var ref = firmware[instruction][candidate] ;
                var new_ref = ref ;
		while (false === ref.isPseudoinstruction)
		{
			if ( firmware[instruction][candidate].co !== false ) {
				var new_ref = datosCU.hash_cocop[firmware[instruction][candidate].co] ;
				if (new_ref.withcop)
					new_ref = new_ref[firmware[instruction][candidate].cop] ;
				else new_ref = new_ref.i ;

							// <TO-CHECK>:
							if (typeof new_ref == "undefined") {
					ref = datosCU.hash_cocop[firmware[instruction][candidate].co] ;
					ref = ref.i ;
								break ;
					}
							// </TO-CHECK>:

							ref = new_ref ;
			} else {
				var new_ref = datosCU.hash_oceoc[context.firmware[instruction][candidate].oc] ;
				if (new_ref.witheoc)
					new_ref = new_ref[context.firmware[instruction][candidate].eoc] ;
				else new_ref = new_ref.i ;

				// <TO-CHECK>:
				if (typeof new_ref == "undefined") {
					ref = datosCU.hash_oceoc[context.firmware[instruction][candidate].oc] ;
					ref = ref.i ;
					break ;
				}
				// </TO-CHECK>:

				ref = new_ref ;
			}
		}

		// process machine code with several words...
		for (i=firmware[instruction][candidate].nwords-1; i>=0; i--)
                {
			if (i<firmware[instruction][candidate].nwords-1) {
			    s_def = "" ;
			}

                        var acc_cmt = asm_getComments(context) ;
	                var melto = {
		        	       value:           machineCode.substring(i*WORD_LENGTH, (i+1)*WORD_LENGTH),
				       binary:          machineCode.substring(i*WORD_LENGTH, (i+1)*WORD_LENGTH),
				       source:          s_def,
				    // source_original: s_ori,
		        	       source_tracking: [ s_ori ],
				       firm_reference:  ref,
		        	       comments:        [ acc_cmt ],
				       is_assembly:     true
		        	    } ;
			main_memory_set(ret.mp, "0x" + seg_ptr.toString(16), melto) ;
                        asm_resetComments(context) ;

                	seg_ptr = seg_ptr + WORD_BYTES ;
		}

		// pseudoinstruction finished
		if ((isPseudo) && (counter == pfinish.length))
                {
			isPseudo            = false ;
			counter             = -1 ;
			npseudoInstructions = 0 ;
		}

                // if instruction candidates with less than max_length fields
                //    then we read ahead next token, otherwise we need to read next token
                var equals_fields = true ;
                for (var c=0; c<signature_fields.length; c++)
                {
                     if (max_length !== signature_fields[c].length) {
                         equals_fields = false ;
                         break ;
		     }
                }
                if ( (isPseudo == false) && (equals_fields || (asm_getToken(context) == ")")) )
                {
		    asm_nextToken(context) ;
                }

		if (context.t > context.text.length) {
		    break ;
		}
           }

           ret.seg[seg_name].end = seg_ptr ;  // end of segment is just last pointer value...
}


/*
 *  Compile assembly
 */

function simlang_compile_v2 (text, datosCU)
{
           var context = {} ;
	   context.line           	= 1 ;
	   context.error          	= null ;
	   context.i              	= 0 ;
	   context.contadorMC     	= 0 ;
	   context.etiquetas      	= {} ;
	   context.labelsNotFound 	= [] ;
	   context.instrucciones  	= [] ;
	   context.co_cop         	= {} ;
	   context.oc_eoc         	= {} ;
	   context.registers      	= [] ;
           context.text           	= text ;
	   context.tokens         	= [] ;
	   context.token_types    	= [] ;
	   context.t              	= 0 ;
	   context.newlines       	= [] ;
	   context.pseudoInstructions	= [];
	   context.stackRegister	= null ;
	   context.firmware             = {} ;
           context.comments             = [] ;

	   // fill firmware
	   for (i=0; i<datosCU.firmware.length; i++)
           {
		var aux = datosCU.firmware[i];

	   	if (typeof context.firmware[aux.name] === "undefined") {
	   	    context.firmware[aux.name] = [];
		}

	   	context.firmware[aux.name].push({ name:                aux.name,
						  nwords:              parseInt(aux.nwords),
						  co:                  (typeof aux.co !== "undefined" ? aux.co : false),
						  cop:                 (typeof aux.cop !== "undefined" ? aux.cop : false),
						  oc:                  (typeof aux.oc !== "undefined" ? aux.oc : false),
						  eoc:                 (typeof aux.eoc !== "undefined" ? aux.eoc : false),
						  fields:              (typeof aux.fields !== "undefined" ? aux.fields : false),
						  signature:           aux.signature,
						  signatureUser:       (typeof aux.signatureUser !== "undefined" ? aux.signatureUser : aux.name ),
						  isPseudoinstruction: false  });
	   }

	   // fill pseudoinstructions
	   for (i=0; i<datosCU.pseudoInstructions.length; i++)
	   {
		var initial = datosCU.pseudoInstructions[i].initial ;
		var finish  = datosCU.pseudoInstructions[i].finish ;

		if (typeof context.pseudoInstructions[initial.name] === "undefined")
                {
	 	    context.pseudoInstructions[initial.name] = 0 ;
		    if (typeof context.firmware[initial.name] === "undefined") {
		        context.firmware[initial.name] = [] ;
		    }
		}

		context.pseudoInstructions[initial.name]++;
                context.firmware[initial.name].push({ 	name:initial.name,
							fields:(typeof initial.fields !== "undefined" ? initial.fields : false),
							signature:initial.signature,
							signatureUser:initial.signature.replace(/,/g," "),
							finish:finish.signature,
							isPseudoinstruction:true });
	   }

          var ret = {};
          ret.mp                  = {} ;
	  ret.seg                 = sim_segments ;
          ret.hash_seg_rev        = [] ;
          ret.labels_asm          = {} ;
          ret.hash_labels_asm_rev = {} ;
	  ret.labels              = {} ; // [addr] = {name, addr, startbit, stopbit}

	  data_found = false;
	  text_found = false;

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
		   read_data_v2(context, datosCU, ret);
		   data_found = true;
	       }

	       if ("text" == ret.seg[segname].kindof) {
		   read_text_v2(context, datosCU, ret);
		   text_found = true;
	       }

	       // Check errors
	       if (context.error != null) {
	       	   ret.error = context.error;
		   return ret;
	       }
	 }

	 // Check that all used labels are defined in the text
         for (i in ret.labels)
         {
		// Get label value (address number)
		var value = ret.labels_asm[ret.labels[i].name];

		// Check if the label exists
		if (typeof value === "undefined") {
		    asm_setLabelContext(context, ret.labels[i].labelContext);
		    return asm_langError(context,
				         i18n_get_TagFor('compiler', 'LABEL NOT DEFINED') +
                                         "'" + ret.labels[i].name + "'") ;
		}

		// Get the words in memory (machine code) where the label is used
		var machineCode = "";
		var auxAddr = ret.labels[i].addr;
		for (j=0; j<ret.labels[i].nwords; j++)
                {
                        machineCode = main_memory_getvalue(ret.mp, "0x" + auxAddr.toString(16)) + machineCode ;
			auxAddr += WORD_BYTES ;
		}

		var size = ret.labels[i].startbit-ret.labels[i].stopbit+1;
		var converted;

		// Translate the address into bits
		var ret1 = isHex(value) ;
		converted = ret1.number ;
		if (ret1.isDecimal === true)
                {
                        if (ret.labels[i].sel_found)
                        {
                            var valuebin = converted.toString(2) ;
                                valuebin = simcoreui_pack(valuebin, 32) ;
		                valuebin = valuebin.substring(WORD_LENGTH-ret.labels[i].sel_start-1,
                                                              WORD_LENGTH-ret.labels[i].sel_stop);
		            converted = parseInt(valuebin, 2);
                        }

			var a = decimal2binary(converted, size);
			num_bits   = a[0] ;
                        free_space = a[1] ;
			error = "'" + ret.labels[i].name + "'" +
				i18n_get_TagFor('compiler', 'NEEDS') +
                                num_bits.length +
				i18n_get_TagFor('compiler', 'SPACE FOR # BITS') +
                                size + " " +
			        i18n_get_TagFor('compiler', 'BITS') ;

			if ("rel" == ret.labels[i].rel)
                        {
			    var a = decimal2binary(converted - ret.labels[i].addr - WORD_BYTES, size);
			    num_bits   = a[0] ;
                            free_space = a[1] ;
			    error = "Relative value (" + (converted - ret.labels[i].addr - WORD_BYTES) +
                                    " in decimal)" +
				    i18n_get_TagFor('compiler', 'NEEDS') +
                                    num_bits.length +
				    i18n_get_TagFor('compiler', 'SPACE FOR # BITS') +
                                    size + " " +
			            i18n_get_TagFor('compiler', 'BITS') ;
			}
		}
 		else
		{
		   return asm_langError(context,
				    i18n_get_TagFor('compiler', 'UNKNOWN 2')) ;
		}

		// check size
		if (free_space < 0) {
		    asm_setLabelContext(context, ret.labels[i].labelContext);
                    return asm_langError(context, error);
                }

		// Store field in machine code
		machineCode = assembly_replace_v2(machineCode,
                                                   num_bits,
                                                   ret.labels[i].startbit-(-1),
                                                   ret.labels[i].stopbit,
                                                   ret.labels[i].bits,
                                                   free_space) ;

		// process machine code with several words...
		auxAddr = ret.labels[i].addr;
		for (j=ret.labels[i].nwords-1; j>=0; j--)
                {
		        var melto = {
				      "value":           machineCode.substring(j*WORD_LENGTH, (j+1)*WORD_LENGTH),
				      "source_tracking": null,
				      "comments":        null
			            } ;
		        main_memory_set(ret.mp, "0x" + auxAddr.toString(16), melto) ;

                	auxAddr += WORD_BYTES ;
		}
	 }

	 // check if main or kmain in assembly code
	 if (text_found)
         {
	     if ( (typeof ret.labels_asm["main"] === "undefined" ) &&
                  (typeof ret.labels_asm["kmain"] === "undefined" ) )
             {
		   return asm_langError(context,
		                        i18n_get_TagFor('compiler', 'NO MAIN OR KMAIN')) ;
             }
	 }

         // reverse labels (hash labels_asm -> key)
         for (var key in ret.labels_asm) {
              ret.hash_labels_asm_rev[ret.labels_asm[key]] = key ;
         }

         // reverse segments (hash segname -> properties)
         for (var skey in ret.seg) {
              ret.hash_seg_rev.push({ 'begin': parseInt(ret.seg[skey].begin), 'name': skey }) ;
         }

	 return ret;
}

