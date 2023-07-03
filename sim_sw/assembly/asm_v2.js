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
function simlang_compile_prepare_context ( datosCU )
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
	   context.registers      	= [] ;   // here
           context.text           	= '' ;
	   context.tokens         	= [] ;
	   context.token_types    	= [] ;
	   context.t              	= 0 ;
	   context.newlines       	= [] ;
	   context.pseudoInstructions	= [];    // here
	   context.stackRegister	= null ;
	   context.firmware             = {} ;   // here
           context.comments             = [] ;

	   // Fill register names
	   for (i=0; i<datosCU.registers.length; i++)
	   {
		if (typeof datosCU.registers[i] === 'undefined') {
                    continue ;
                }
		for (var j=0; j<datosCU.registers[i].length; j++) {
		     context.registers[datosCU.registers[i][j]] = i ;
                }
	   }

	   // Fill firmware
           var elto = null ;
	   for (i=0; i<datosCU.firmware.length; i++)
           {
		var aux = datosCU.firmware[i];

	   	if (typeof context.firmware[aux.name] === "undefined") {
	   	    context.firmware[aux.name] = [];
		}

	   	elto = { 
                         name:                aux.name,
			 nwords:              parseInt(aux.nwords),
			 co:                  (typeof aux.co !== "undefined" ? aux.co : false),
			 cop:                 (typeof aux.cop !== "undefined" ? aux.cop : false),
			 fields:              (typeof aux.fields !== "undefined" ? aux.fields : false),
			 signature:           aux.signature,
			 signatureUser:       (typeof aux.signatureUser !== "undefined" ? aux.signatureUser : aux.name ),
			 isPseudoinstruction: false
                       } ;
	   	context.firmware[aux.name].push(elto) ;
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

                elto = {
                          name:initial.name,
			  fields:(typeof initial.fields !== "undefined" ? initial.fields : false),
			  signature:initial.signature,
			  signatureUser:initial.signature.replace(/,/g," "),
			  finish:finish.signature,
			  isPseudoinstruction:true
                       } ;
                context.firmware[initial.name].push(elto) ;
	   }

	   return context ;
}


// pass 1: compile assembly (without replace pseudo-instructions)
function read_data_v2  ( context, datosCU, ret )
{
     // TODO
}

function read_text_v2  ( context, datosCU, ret )
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

function simlang_compile_pass1 ( context, text )
{
          var ret = {};
	  ret.seg        = sim_segments ;
          ret.mp         = {} ;
	  ret.labels     = {} ; // [addr] = {name, addr, startbit, stopbit}
          ret.labels2    = {} ;
          ret.revlabels2 = {} ;
          ret.revseg     = [] ;
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
		   read_data_v2(context, datosCU, ret);
		   ret.data_found = true;
	       }

	       if ("text" == ret.seg[segname].kindof) {
		   read_text_v2(context, datosCU, ret);
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
         for (var i in ret.labels)
         {
		// Get label value (address number)
		var value = ret.labels2[ret.labels[i].name];

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
			    a = decimal2binary(converted - ret.labels[i].addr - WORD_BYTES, size);
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
		machineCode = assembly_replacement(machineCode,
                                                   num_bits,
                                                   ret.labels[i].startbit-(-1),
                                                   ret.labels[i].stopbit,
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
	 if (ret.text_found)
         {
	       if ( (typeof ret.labels2["main"] === "undefined" ) &&
                    (typeof ret.labels2["kmain"] === "undefined" ) )
               {
	  	     return asm_langError(context,
		                          i18n_get_TagFor('compiler', 'NO MAIN OR KMAIN')) ;
               }
	 }

         // reverse labels (hash labels2 -> key)
         for (var key in ret.labels2) {
              ret.revlabels2[ret.labels2[key]] = key ;
         }

         // reverse segments (hash segname -> properties)
         for (var skey in ret.seg) {
              ret.revseg.push({ 'begin': parseInt(ret.seg[skey].begin), 'name': skey }) ;
         }

	 return ret;
}


/*
 *  Compile assembly
 */

function simlang_compile_v2 ( text, datosCU )
{
           // pass 0: prepare context
           var context  = simlang_compile_prepare_context(datosCU) ;
           context.text = text ;

           // pass 1: compile assembly (without replace pseudo-instructions)
           var ret = simlang_compile_pass1(context, text) ;
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

