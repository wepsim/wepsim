/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


/*
 *  Load Firmware
 */

function find_first_cocop ( context, curr_instruction, first_co, last_co )
{
           var k = 0 ;
           var m = 0 ;

           var ret = {} ;
               ret.label_co  = '' ;
               ret.label_cop = '' ;

           // get the default length of the co+cop fields...
           var xr_info = simhw_sim_ctrlStates_get() ;
           var oc_length = 6 ;
           if (typeof xr_info.ir.default_eltos.co.length !== "undefined") {
               oc_length = parseInt(xr_info.ir.default_eltos.co.length) ;
           }
	   var eoc_length = 4 ;
           if (typeof xr_info.ir.default_eltos.cop.length !== "undefined") {
	       eoc_length = parseInt(xr_info.ir.default_eltos.cop.length) ;
           }

	   // analize if instruction has any field that uses cop bits... -> m points to
           var cop_overlaps = false ;
	   for (m=0; m<curr_instruction.fields.length; m++)
           {
	        if (curr_instruction.fields[m].stopbit === "0")
                {
                    cop_overlaps = true ;
	   	    break ;
	        }
	   }

           // find first free 'co-cop' code
	   for (j=first_co; j<last_co; j++)
	   {
                // new initial co...
		ret.label_co = j.toString(2).padStart(oc_length, "0") ;

                // (1/3) check for free co-00000...
		if (typeof context.co_cop[ret.label_co] === "undefined")
                {
		    context.co_cop[ret.label_co]         = {} ;
		    context.co_cop[ret.label_co].withcop = false ;
		    return ret ;
                }

                // (2/3) search for free co-cop...
                if (typeof curr_instruction.cop !== "undefined")
                {
                    // cop in use... -> skip cop
		    if (typeof context.co_cop[ret.label_co].cop[curr_instruction.cop] !== "undefined") {
		        continue ;
		    }

                    // use cop
		    ret.label_cop = curr_instruction.cop ;
		    return ret ;
                }

                // (3/3) check if skip (new instruction overlaps || existing instructions overlap)...
                if (cop_overlaps === true) {
		    continue ;
                }
                if (context.co_cop[ret.label_co].withcop === false) {
		    continue ;
                }

                // new initial co-cop...
                first_cop = 0 ;
                last_cop  = Math.pow(2, eoc_length) - 1 ;
		for (k=first_cop; k<last_cop; k++)
		{
		     ret.label_cop = k.toString(2).padStart(eoc_length, "0") ;

                     if (        (context.co_cop[ret.label_co].cop === null) ||
                          (typeof context.co_cop[ret.label_co].cop === 'undefined') )
                     {
		          context.co_cop[ret.label_co].cop = {};
                          return ret ;
                     }
                     if (typeof context.co_cop[ret.label_co].cop[ret.label_cop] === "undefined")
                     {
                          return ret ;
                     }
		}
	   }

           return ret ;
}

function find_first_oceoc ( context, curr_instruction, first_oc, last_oc )
{
           var k = 0 ;
           var m = 0 ;
           var xr_info = simhw_sim_ctrlStates_get() ;
	   var eoc_len = xr_info.ir.default_eltos.eoc.length ;

           var ret = {} ;
               ret.label_oc  = '' ;
               ret.label_eoc = '' ;

	   // analize if instruction has any field that uses eoc bits... -> m points to
           var eoc_overlaps = false ;
	   for (m=0; m<curr_instruction.fields.length; m++)
           {
	        if (curr_instruction.fields[m].stopbit === "0")
                {
                    eoc_overlaps = true ;
	   	    break ;
	        }
	   }

           // find first free 'oc-eoc' code
	   for (j=first_oc; j<last_oc; j++)
	   {
                // new initial oc...
		ret.label_oc = j.toString(2).padStart(6, "0") ;

                // (1/3) check for free oc-0000...
		if (typeof context.oc_eoc[ret.label_oc] === "undefined")
                {
		    context.oc_eoc[ret.label_oc]         = {} ;
		    context.oc_eoc[ret.label_oc].witheoc = false ;
		    return ret ;
                }

                // (2/3) search for free oc-eoc...
                if (typeof curr_instruction.eoc !== "undefined")
                {
                    // eoc in use... -> skip eoc
		    if (typeof context.oc_eoc[ret.label_oc].eoc[curr_instruction.eoc] !== "undefined") {
		        continue ;
		    }

                    // use eoc
		    ret.label_eoc = curr_instruction.eoc ;
		    return ret ;
                }

                // (3/3) check if skip (new instruction overlaps || existing instructions overlap)...
                if (eoc_overlaps === true) {
		    continue ;
                }
                if (context.oc_eoc[ret.label_oc].witheoc === false) {
		    continue ;
                }

                // new initial oc-eoc...
                first_eoc = 0 ;
                last_eoc  = Math.pow(2, eoc_len) - 1 ;
		for (k=first_eoc; k<last_eoc; k++)
		{
		     ret.label_eoc = k.toString(2).padStart(eoc_len, "0") ;

                     if (        (context.oc_eoc[ret.label_oc].eoc === null) ||
                          (typeof context.oc_eoc[ret.label_oc].eoc === 'undefined') )
                     {
		          context.oc_eoc[ret.label_oc].eoc = {};
                          return ret ;
                     }
                     if (typeof context.oc_eoc[ret.label_oc].eoc[ret.label_eoc] === "undefined")
                     {
                          return ret ;
                     }
		}
	   }

           return ret ;
}

function loadFirmware (text)
{
           var ret = {} ;
           var i = 0 ;

           var     xr_info = simhw_sim_ctrlStates_get() ;
           var all_ones_co = "1".repeat(xr_info.ir.default_eltos.co.length) ;
	   var all_ones_oc = "1".repeat(xr_info.ir.default_eltos.oc.length) ;

           var context = {} ;
	   context.line           	= 1 ;
       //  context.error          	= null ;
	   context.i              	= 0 ;
	   context.contadorMC     	= 0 ;
	   context.etiquetas      	= {} ;
	   context.labelsNotFound 	= [] ;
	   context.instrucciones  	= [] ;
	   context.co_cop         	= {} ;
	   context.oc_eoc       	= {} ;
	   context.registers      	= [] ;
           context.text           	= text ;
	   context.tokens         	= [] ;
	   context.token_types         	= [] ;
	   context.t              	= 0 ;
	   context.newlines       	= [] ;
	   context.pseudoInstructions	= [];
	   context.stackRegister	= null ;
           context.comments             = [] ;
           context.metadata             = { version:1 } ;


           frm_nextToken(context) ;
           //
           // optional:
           // *firmware {
           //     version  = 2,
           //     rel_mult = 2,
           //     endian   = little
           // }*
           //
           if (frm_isToken(context, "firmware"))
           {
               ret = firm_metadata_read(context) ;
	       if (ret.error != null) {
	           return ret ;
               }
           }

           // firmware (registers, instructions, etc.)
           while (context.t < context.text.length)
           {
		// *registers
		// {
		//    0=$zero,
		//    30=$fp,
		//    31=$ra
		// }*

               if (frm_isToken(context, "registers"))
               {
                   ret = firm_registers_read(context) ;
	           if (typeof ret.error != "undefined") {
	               return ret ;
                   }

                   continue ;
               }

		//
		// *pseudoinstructions
		// {
		//    li reg=reg num=inm { lui reg high(num) ; ori reg reg low(num) }
		// }*
		//

               if (frm_isToken(context, "pseudoinstructions"))
               {
                   ret = firm_pseudoinstructions_read(context) ;
	           if (ret.error != null) {
	               return ret ;
                   }

                   continue ;
               }

		// *begin {
		//            (XX, Y, BW=11),
		//     fetch: (X2, X0),
		//            (A0, B=0, C=0)
		// }*

               if (frm_isToken(context, "begin"))
               {
                   ret = firm_begin_read(context) ;
	           if (typeof ret.error != "undefined") {
	               return ret ;
                   }

                   continue ;
               }

		// *li reg val {
		//             co=000000,
		//             nwords=1,
		//             reg=reg(25,21),
		//             val=inm(15,0),
		//             {
		//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
		//             }
		// }*

               ret = firm_instruction_read(context, xr_info, all_ones_co, all_ones_oc) ;
	       if (typeof ret.error != "undefined") {
	           return ret ;
               }
           }

           // CHECK: stack_pointer exists
	   if (context.stackRegister == null) {
	       return frm_langError(context,
				i18n_get_TagFor('compiler', 'SP NOT DEFINED')) ;
           }

           // CHECK: fetch exists + fetch label
           var found = false ;
           for (i=0; i<context.instrucciones.length; i++)
           {
                if (context.instrucciones[i].name == "begin")
                {
                    for (var j=0; j<context.instrucciones[i].microcode.length; j++)
                    {
		         if ( (typeof context.etiquetas[j] != "undefined") && (context.etiquetas[j] == "fetch") ) {
                               found = true;
                         }
                    }
		    if (found === false) {
	                return frm_langError(context,
		         		 i18n_get_TagFor('compiler', 'NO LABEL FETCH')) ;
                    }
                }
           }
           if (found === false) {
	       return frm_langError(context,
		         	i18n_get_TagFor('compiler', 'NO LABEL BEGIN')) ;
           }

	   // RESOLVE: oc=111111... (111111... === "please, find one free 'oc' for me...")
	   if (context.metadata.version == 2)
           {
		var ir_oc_length = 6 ;
		if (typeof xr_info !== "undefined") {
		    ir_oc_length = xr_info.ir.default_eltos.oc.length ;
		}

		var first_oc = 0 ;
		var last_oc = Math.pow(2, ir_oc_length) - 1 ;
		var last_oc_str = last_oc.toString(2) ;

		var curr_instruction = null ;
		for (i=0; i<context.instrucciones.length; i++)
		{
			curr_instruction = context.instrucciones[i] ;

			// skip non-111111... cases
			if ( (curr_instruction.name === "begin") || (curr_instruction.oc !== last_oc_str) ) {
				continue ;
			}

			// find first free 'oc-eoc' code
			var r = find_first_oceoc(context, curr_instruction, first_oc, last_oc) ;
			if (r.j >= last_oc) {
			    return frm_langError(context,
						 i18n_get_TagFor('compiler', 'NO OC CODES')) ;
			}

			// work with this free 'oc-eoc' code
			first_oc = parseInt(r.label_oc, 2) ;

			curr_instruction.oc = r.label_oc ;
			context.oc_eoc[r.label_oc].signature = curr_instruction.signature ;

			if (r.label_eoc !== "")
			{
			    curr_instruction.eoc = r.label_eoc ;
			    context.oc_eoc[r.label_oc].eoc[r.label_eoc] = curr_instruction.signature ;
			    context.oc_eoc[r.label_oc].witheoc = true ;
			}
		}
	   }
           else
           {
		// RESOLVE: co=111111... (111111... === "please, find one free 'co' for me...")
		var ir_co_length = 6 ;
		if (typeof xr_info !== "undefined") {
		    ir_co_length = xr_info.ir.default_eltos.co.length ;
		}

		var first_co = 0 ;
		var last_co = Math.pow(2, ir_co_length) - 1 ;
		var last_co_str = last_co.toString(2) ;

		var curr_instruction = null ;
		for (i=0; i<context.instrucciones.length; i++)
		{
			curr_instruction = context.instrucciones[i] ;

			// skip non-111111... cases
			if ( (curr_instruction.name === "begin") || (curr_instruction.co !== last_co_str) ) {
			      continue ;
			}

			// find first free 'co-cop' code
			var r = find_first_cocop(context, curr_instruction, first_co, last_co) ;
			if (r.j >= last_co) {
			    return frm_langError(context,
						 i18n_get_TagFor('compiler', 'NO CO CODES')) ;
			}

			// work with this free 'co-cop' code
			first_co = parseInt(r.label_co, 2) ;

			curr_instruction.co = r.label_co ;
			context.co_cop[r.label_co].signature = curr_instruction.signature ;

			if (r.label_cop !== "")
			{
			    curr_instruction.cop = r.label_cop ;
			    context.co_cop[r.label_co].cop[r.label_cop] = curr_instruction.signature ;
			    context.co_cop[r.label_co].withcop = true ;
			}
		}
	   }

           // TO RESOLVE labels
	   var labelsFounded=0;
	   if (context.labelsNotFound.length>0)
	   {
		for (i=0; i<context.labelsNotFound.length; i++)
		{
			for (var j in context.etiquetas)
			{
				if (context.etiquetas[j] == context.labelsNotFound[i].nombre)
				{
				    context.instrucciones[context.labelsNotFound[i].instruction].microcode[context.labelsNotFound[i].cycle].MADDR = j;
				    labelsFounded++;
				}
			}

			if (labelsFounded == 0)
			{
                            // CHECK: label is defined
	                    return frm_langError(context,
		                	     i18n_get_TagFor('compiler', 'NO LABEL MADDR') +
                                             context.labelsNotFound[i].nombre) ;
			}

                        labelsFounded = 0;
		}
	   }

	   // native -> native_jit
	   var mk_native = "" ;
	   for (i=0; i<context.instrucciones.length; i++)
	   {
		   var ins = context.instrucciones[i] ;
		   if (ins.is_native)
		   {
		       mk_native += "context.instrucciones[" + i + "][\"NATIVE_JIT\"] = " +
			            " function() {\n" +
				    "\t var fields = simcore_native_get_fields(\"" + ins.signatureRaw + "\");\n" +
				    ins.NATIVE +
				    "\n};\n " ;
		   }
	   }
	   eval(mk_native) ;

	   if (context.metadata.version == 2)
           {
	        // oc_eoc_hash
		var fioc  = 0 ;
		var fieoc = 0 ;
		context.hash_oceoc = {} ;
		for (var fi in context.instrucciones)
		{
			if (context.instrucciones[fi].name == "begin") {
				continue ;
			}

			fioc  = context.instrucciones[fi].oc ;
			if (typeof context.hash_oceoc[fioc] == "undefined") {
				context.hash_oceoc[fioc] = {} ;
			}

			if (typeof context.instrucciones[fi].eoc == "undefined") {
				context.hash_oceoc[fioc].witheoc = false ;
				context.hash_oceoc[fioc].i       = context.instrucciones[fi] ;
			} else {
				fieoc = context.instrucciones[fi].eoc ;
				context.hash_oceoc[fioc].witheoc = true ;
				context.hash_oceoc[fioc][fieoc]  = context.instrucciones[fi] ;
			}
		}
	   }
           else
           {
		// co_cop_hash
		var fico  = 0 ;
		var ficop = 0 ;
		context.hash_cocop = {} ;
		for (var fi in context.instrucciones)
		{
			if (context.instrucciones[fi].name == "begin") {
				continue ;
			}

			fico  = context.instrucciones[fi].co ;
			if (typeof context.hash_cocop[fico] == "undefined") {
				context.hash_cocop[fico] = {} ;
			}

			if (typeof context.instrucciones[fi].cop == "undefined") {
				context.hash_cocop[fico].withcop = false ;
				context.hash_cocop[fico].i       = context.instrucciones[fi] ;
			} else {
				ficop = context.instrucciones[fi].cop ;
				context.hash_cocop[fico].withcop = true ;
				context.hash_cocop[fico][ficop]  = context.instrucciones[fi] ;
			}
		}
	   }

           // revlabels
           context.revlabels = {} ;
           for (key in context.instrucciones) {
                context.revlabels[context.instrucciones[key]["mc-start"]] = context.instrucciones[key].name ;
           }

           // return results
           ret = {} ;
           ret.error              = null ;
           ret.metadata           = context.metadata ;
           ret.firmware           = context.instrucciones ;
           ret.labels_firm        = context.etiquetas ;
           ret.mp                 = {} ;
           ret.seg                = {} ;
           ret.registers          = context.registers ;
           ret.pseudoInstructions = context.pseudoInstructions ;
           ret.stackRegister      = context.stackRegister ;
	   if (context.metadata.version == 2)
                ret.hash_oceoc = context.hash_oceoc ;
	   else ret.hash_cocop = context.hash_cocop ;
           ret.hash_labels_firm_rev = context.revlabels ;

           return ret ;
}


/*
 *  Save Firmware
 */

function saveFirmware ( SIMWARE )
{
	var file = "" ;

        // save as last version by default ;-)
        if (typeof SIMWARE.metadata != "undefined") {
            SIMWARE.metadata.version = 2 ;
        }

        // initial header
        file += "\n" +
                "#\n" +
                "# WepSIM (https://wepsim.github.io/wepsim/)\n" +
                "#\n" +
                "\n" ;

        // metadata
        file += firm_metadata_write(SIMWARE) ;

        // firmware
	for (i=0; i<SIMWARE.firmware.length; i++) {
             file += firm_instruction_write(SIMWARE, SIMWARE.firmware[i], SIMWARE.labels_firm) ;
	}

        // save registers
        file += firm_registers_write(SIMWARE) ;

        // save pseudo-instructions
        file += firm_pseudoinstructions_write(SIMWARE) ;

	// return firmware as string...
	return file;
}


/*
 *  Auxiliar firmware interface
 */

function decode_instruction ( curr_firm, ep_ir, binstruction )
{
    if (curr_firm.metadata.version == 2)
         return decode_instruction_v2(curr_firm, ep_ir, binstruction) ;
    else return decode_instruction_v1(curr_firm, ep_ir, binstruction) ;

    return ret ;
}

function decode_instruction_v2 ( curr_firm, ep_ir, binstruction )
{
	var ret = {
			"oinstruction": null,
			op_code: 0,
			eoc: 0
		  } ;

	// instructions as 32-string
	var bits = binstruction.toString(2).padStart(32, "0") ;

	// op-code
	var oc = bits.substr(ep_ir.default_eltos.oc.begin, ep_ir.default_eltos.oc.length);
	ret.op_code = parseInt(oc, 2) ;

	// eoc
	// https://www2.cs.sfu.ca/~ashriram/Courses/CS295_TA/assets/notebooks/RISCV/RISCV_CARD.pdf
	if (ep_ir.default_eltos.eoc.type == 2)
        {
		if (oc !='1101111' && oc != '0110111' && oc != '0010111')
                {
		    var eoc = bits.substr(ep_ir.default_eltos.eoc.bits[0][0], ep_ir.default_eltos.eoc.lengths[0]);
		    if (oc == '0110011' || oc == '1110011') {
		    	eoc += bits.substr(ep_ir.default_eltos.eoc.bits[1][0], ep_ir.default_eltos.eoc.lengths[1]);
		    } else if (oc == '0010011' && (eoc == '001' || eoc == '101')) {
			eoc += bits.substr(ep_ir.default_eltos.eoc.bits[1][0], ep_ir.default_eltos.eoc.lengths[1]);
		    }
		}
	}
        else
        {
		var eoc = bits.substr(ep_ir.default_eltos.eoc.begin, ep_ir.default_eltos.eoc.length);
	}
	ret.eoc = parseInt(eoc, 2) ;

	if ("undefined" == typeof curr_firm.hash_oceoc[oc]) {
	     return ret ;
	}

	if (false == curr_firm.hash_oceoc[oc].witheoc)
	     ret.oinstruction = curr_firm.hash_oceoc[oc].i ;
	else ret.oinstruction = curr_firm.hash_oceoc[oc][eoc] ;

    return ret ;
}

function decode_instruction_v1 ( curr_firm, ep_ir, binstruction )
{
	var ret = {
			"oinstruction": null,
			op_code: 0,
			cop_code: 0
		  } ;

	// instructions as 32-string
	var bits = binstruction.toString(2).padStart(32, "0") ;

	// op-code
	var co = bits.substr(ep_ir.default_eltos.co.begin, ep_ir.default_eltos.co.length);
	ret.op_code = parseInt(co, 2) ;

	// cop-code
	var cop = bits.substr(ep_ir.default_eltos.cop.begin, ep_ir.default_eltos.cop.length);
	ret.cop_code = parseInt(cop, 2) ;

	if ("undefined" == typeof curr_firm.hash_cocop[co]) {
	     return ret ;
	}

	if (false == curr_firm.hash_cocop[co].withcop)
	     ret.oinstruction = curr_firm.hash_cocop[co].i ;
	else ret.oinstruction = curr_firm.hash_cocop[co][cop] ;

    return ret ;
}


function decode_ram ( )
{
    var sram = "\n" ;

    var curr_ircfg = simhw_sim_ctrlStates_get().ir ;
    var curr_firm  = simhw_internalState('FIRMWARE') ;
    var curr_MP    = simhw_internalState('MP') ;
    for (var address in curr_MP)
    {
        var value        = get_value(curr_MP[address]) ;
        var binstruction = value.toString(2) ;
            binstruction = "00000000000000000000000000000000".substring(0, 32-binstruction.length) + binstruction;
        sram += "0x" + parseInt(address).toString(16) + ":" +
                decode_instruction(curr_firm, curr_ircfg, binstruction).oinstruction + "\n" ;
    }

    return sram ;
}

