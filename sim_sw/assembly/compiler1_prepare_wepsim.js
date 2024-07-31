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
//  (1/3) Prepare context for compiling and loading   (see README.md for more information)
//
//  Auxiliar function tree for wsasm_prepare_context ( CU_data, asm_source )
//   * wsasm_prepare_context_firmware           ( context, CU_data )
//   * wsasm_prepare_context_pseudoinstructions ( context, CU_data )
//

function wsasm_prepare_oc ( elto, aux )
{
	elto.oc = {
                     value:         '',    // "begin {...}" has no 'co/oc' field
                     asm_start_bit: [ 0 ], // initial value to 0:0 to skip this field by default
                     asm_stop_bit:  [ 0 ]
                  } ;

        // set elto.oc.value
	if (typeof aux.co !== "undefined") {
	     elto.oc.value = aux.co ;
        }
	else
        if (typeof aux.oc !== "undefined") {
	     elto.oc.value = aux.oc ;
        }

        // IF empty 'oc' -> return default elto...
        if (0 == elto.oc.value.length) {
            return elto ;
        }

        // copy start/stop from ir.default_eltos by default
        var xr_info = simhw_sim_ctrlStates_get() ;
	elto.oc.asm_start_bit[0] = parseInt(xr_info.ir.default_eltos.oc.begin) ;
	elto.oc.asm_stop_bit [0] = parseInt(xr_info.ir.default_eltos.oc.end) ;
        elto.oc.asm_n_bits       = elto.oc.asm_stop_bit[0] - elto.oc.asm_start_bit[0] + 1 ;

        // IF firmware v1 -> return elto...
	if (typeof aux.fields_all == "undefined") {
            return elto ;
        }

        // IF firmware v2 with start/stop bit -> copy + return elto
        for (let k=0; k<aux.fields_all.length; k++)
        {
	     if (typeof aux.fields_all[k].type == "undefined") {
                 continue ;
             }
	     if (aux.fields_all[k].type != "oc") {
                 continue ;
             }

             // copy start/stop bits...
	     for (let m=0; m<aux.fields_all[k].bits_start.length; m++) {
	    	  elto.oc.asm_start_bit[m] = parseInt(aux.fields_all[k].bits_start[m]) ;
                  elto.oc.asm_stop_bit [m] = parseInt(aux.fields_all[k].bits_stop[m]) ;
	     }

             // translate bit to index...
             elto.oc.asm_n_bits = wsasm_order2index_startstop(elto.oc.asm_start_bit, elto.oc.asm_stop_bit) ;
        }

        return elto ;
}

function wsasm_prepare_eoc ( elto, aux )
{
	elto.eoc = {
                      value:         '',    // "begin {...}" has no 'cop/eoc' field
                      asm_start_bit: [ 0 ], // initial value to 0:0 to skip this field by default
                      asm_stop_bit:  [ 0 ]
                   } ;

        // elto.eoc.value
	if (typeof aux.cop !== "undefined") {
	     elto.eoc.value = aux.cop ;
        }
	else if (typeof aux.eoc !== "undefined") {
	     elto.eoc.value = aux.eoc ;
        }

        // copy start/stop from ir.default_eltos by default
        var xr_info = simhw_sim_ctrlStates_get() ;
	elto.eoc.asm_start_bit[0] = parseInt(xr_info.ir.default_eltos.eoc.begin) ;
	elto.eoc.asm_stop_bit [0] = parseInt(xr_info.ir.default_eltos.eoc.end) ;
        elto.eoc.asm_n_bits       = elto.eoc.asm_stop_bit[0] - elto.eoc.asm_start_bit[0] + 1 ;

        // IF empty 'eoc' -> return elto...
        if (0 == elto.eoc.value.length) {
	    elto.eoc.asm_start_bit[0] = elto.eoc.asm_stop_bit[0] + 1 ; // in order to skip empty eoc
            elto.eoc.asm_n_bits       = 0 ;
            return elto ;
        }

        // IF firmware v1 -> return elto...
	if (typeof aux.fields_all == "undefined") {
            return elto ;
        }

        // IF firmware v2 with start/stop bit -> copy + return elto
        for (let k=0; k<aux.fields_all.length; k++)
        {
	     if (typeof aux.fields_all[k].type == "undefined") {
                 continue ;
             }
	     if (aux.fields_all[k].type != "eoc") {
                 continue ;
             }

             // copy start/stop bits...
	     for (let m=0; m<aux.fields_all[k].bits_start.length; m++) {
	    	  elto.eoc.asm_start_bit[m] = parseInt(aux.fields_all[k].bits_start[m]) ;
                  elto.eoc.asm_stop_bit [m] = parseInt(aux.fields_all[k].bits_stop[m]) ;
	     }

             // translate bit to index...
             elto.eoc.asm_n_bits = wsasm_order2index_startstop(elto.eoc.asm_start_bit, elto.eoc.asm_stop_bit) ;
        }

        return elto ;
}

function wsasm_prepare_context_firmware ( context, CU_data )
{
           let elto = null ;
	   let aux  = null ;
           let start_bit = [] ;
           let stop_bit  = [] ;
           let lower_bit = 0 ;
           let w_n_bits  = 0 ;
           let w_index   = 0 ;
           let n_bits    = 0 ;

	   // Fill firmware
	   for (let i=0; i<CU_data.firmware.length; i++)
           {
		aux = CU_data.firmware[i];

                // elto: initial fields...
                elto = {} ;

                elto.name                = aux.name.toLowerCase() ;
		elto.isPseudoinstruction = false ;
		elto.nwords              = parseInt(aux.nwords) ;
		elto.oc                  = {} ;  // computed later
		elto.eoc                 = {} ;  // computed later
		elto.fields              = [] ;  // computed later
		elto.signature           = aux.signature ;
		elto.signature_type_str  = aux.name ;
		elto.signature_type_arr  = [] ;  // computed later
		elto.signature_size_str  = '' ;  // computed later
		elto.signature_size_arr  = [] ;  // computed later

		if (typeof aux.signatureUser !== "undefined") {
                    elto.signature_type_str = aux.signatureUser ;
                }

                // tooltip with details...
		elto["mc-start"] = aux["mc-start"] ;
		elto.microcode   = aux.microcode ;
		elto.help        = aux.help ;

                // fields: oc + eoc
                wsasm_prepare_oc(elto, aux) ;
                wsasm_prepare_eoc(elto, aux) ;

                // fields...
		if (typeof aux.fields !== "undefined") {
                    elto.fields = aux.fields ;
                }

		elto.signature_size_arr.push(elto.oc.value.length) ;
                for (let j=0; j<elto.fields.length; j++)
                {
                     // initial values...
                     start_bit = [] ;
                     stop_bit  = [] ;
                     if (1 == CU_data.metadata.version)
                     {
                         start_bit[0] = parseInt(elto.fields[j].startbit) ;
                         stop_bit[0]  = parseInt(elto.fields[j].stopbit) ;
                     }
                     else // (2 == CU_data.metadata.version)
                     {
                         if ("forwards" == context.options.field_multipart_order)
                         {
				 for (let m=0; m<elto.fields[j].bits_start.length; m++)
				 {
				      start_bit[m] = parseInt(elto.fields[j].bits_start[m]) ;
	                              stop_bit[m]  = parseInt(elto.fields[j].bits_stop[m]) ;
				 }
                         }
                         else // "backwards"
                         {
				 for (let m=0; m<elto.fields[j].bits_start.length; m++)
				 {
                                      om = elto.fields[j].bits_start.length - 1 - m ;
				      start_bit[m] = parseInt(elto.fields[j].bits_start[om]) ;
	                              stop_bit[m]  = parseInt(elto.fields[j].bits_stop[om]) ;
				 }
                         }
                     }

                     // translate from startbit/stop_bit to asm_start_bit/asm_stop_bit...
                     n_bits = wsasm_order2index_startstop(start_bit, stop_bit) ;

                     // copy back the computed values
                     elto.fields[j].asm_start_bit = start_bit ;
                     elto.fields[j].asm_stop_bit  = stop_bit ;
                     elto.fields[j].asm_n_bits    = n_bits ;

		     elto.signature_size_arr.push(n_bits) ;
                }

                // elto: derived fields...
                elto.signature_type_str = base_replaceAll(elto.signature_type_str, 'inm', 'imm') ;  // TODO: temporal fix
		elto.signature_size_str = elto.signature_size_arr.join(' ') ;
		elto.signature_type_arr = elto.signature_type_str.split(' ') ;
                elto.signature_user     = wsasm_make_signature_user(elto, '') ;

                // add elto to firmware
	   	if (typeof context.firmware[elto.name] === "undefined") {
	   	    context.firmware[elto.name] = [] ;
		}

	   	context.firmware[elto.name].push(elto) ;
	   }

	   return context ;
}

function wsasm_prepare_context_pseudoinstructions ( context, CU_data )
{
           let elto    = null ;
	   let initial = null ;
	   let finish  = null ;

	   // Fill pseudoinstructions
	   for (let i=0; i<CU_data.pseudoInstructions.length; i++)
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
	        elto.isPseudoinstruction = true ;
	        elto.fields              = [] ;
	        elto.finish              = finish.signature ;
	        elto.signature           = initial.signature ;
	        elto.signature_type_str  = initial.signature.replace(/,/g," ") ;

                if (typeof initial.fields !== "undefined")  elto.fields = initial.fields ;

                // elto: derived fields...
                elto.signature_type_str = base_replaceAll(elto.signature_type_str, 'inm', 'imm') ;  // TODO: temporal fix
	        elto.signature_type_arr = elto.signature_type_str.split(' ') ;
		elto.signature_size_arr = Array(elto.signature_type_arr.length).fill(WORD_BYTES*BYTE_LENGTH);
		elto.signature_size_str = elto.signature_size_arr.join(' ') ;
                elto.signature_user     = wsasm_make_signature_user(elto, '') ;

                // add elto to firmware
                context.firmware[initial.name].push(elto) ;
	   }

	   return context ;
}


 /*
  *  Public API (see README.md for more information)
  */

function wsasm_prepare_context ( CU_data, options )
{
	   // Check arguments
           if (typeof CU_data == "undefined") {
               return { error: 'CU_data is undefined in wsasm_prepare_context\n' } ;
           }

           // Initialize context...
           var context = {} ;
	   context.line           	= 1 ;      // here
	   context.error          	= null ;
	   context.i              	= 0 ;      // here
           context.text                 = '' ;     // here
	   context.tokens         	= [] ;
	   context.token_types    	= [] ;
	   context.t              	= 0 ;      // here
           context.comments             = [] ;
	   context.newlines       	= [] ;
	   context.registers      	= [] ;     // here
	   context.firmware             = {} ;     // here
	   context.pseudoInstructions	= [];      // here
	   context.stackRegister	= null ;
	   context.metadata	        = CU_data.metadata ;
	   context.options              = {} ;     // here

           // Fill the assembler configuration
           context.options = wsasm_expand_options(options) ;

	   if (typeof context.metadata.rel_mult != "undefined")
                context.options.relative_offset_mult = parseInt(context.metadata.rel_mult) ;
           else context.options.relative_offset_mult = WORD_BYTES ;

           if (typeof context.metadata.endian != "undefined")
                context.options.endian = context.metadata.endian ;
           else context.options.endian = 'little' ;

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
           var xr_info = simhw_sim_ctrlStates_get() ;
           context.oc_size_default = parseInt(xr_info.ir.default_eltos.oc.length) ;

           context = wsasm_prepare_context_firmware(context, CU_data) ;

	   // Fill pseudoinstructions
           context = wsasm_prepare_context_pseudoinstructions(context, CU_data) ;

           // return context
	   return context ;
}

