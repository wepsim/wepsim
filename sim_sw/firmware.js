/*
 *  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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
 *  Save Firmware
 */

function saveFirmware ( SIMWARE, firm_version )
{
	var o = "" ;


        // Saving as version 2 by default ;-)
        if (typeof SIMWARE.metadata == "undefined")
        {
              SIMWARE.metadata = new Object() ;
              SIMWARE.metadata.version  = 2 ;
              SIMWARE.metadata.rel_mult = 4 ;
              SIMWARE.metadata.pc_rel_offset = 0 ;
              SIMWARE.metadata.endian   = 'little' ;
        }
        // But honor the firm_version argument
	if (typeof firm_version != "undefined")
	{
              SIMWARE.metadata.version  = parseInt(firm_version) ;
	}

        // initial header
        o += "\n" +
             "#\n" +
             "# WepSIM (https://wepsim.github.io/wepsim/)\n" +
             "#\n" +
             "\n" ;

        // save current metadata
        o += firm_metadata_write(SIMWARE) ;

        // save instructions
	for (i=0; i<SIMWARE.firmware.length; i++) {
             o += firm_instruction_write(SIMWARE, SIMWARE.firmware[i], SIMWARE.labels_firm) ;
	}

        // save registers
        o += firm_registers_write(SIMWARE) ;

        // save pseudo-instructions
        o += firm_pseudoinstructions_write(SIMWARE) ;

	// return firmware as string...
	return o;
}


/*
 *  Load Firmware
 */

function loadFirmware (text)
{
           var ret = {} ;
           var i = 0 ;

           var     xr_info = simhw_sim_ctrlStates_get() ;
	   var all_ones_oc = "1".repeat(xr_info.ir.default_eltos.oc.length) ;

           var context = {} ;
	   context.line           	= 1 ;
       //  context.error          	= null ;
	   context.i              	= 0 ;
	   context.contadorMC     	= 0 ;
	   context.etiquetas      	= {} ;
	   context.labelsNotFound 	= [] ;
	   context.instrucciones  	= [] ;
	   context.oc_eoc         	= {} ;
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

               ret = firm_instruction_read(context, xr_info, all_ones_oc) ;
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
	   if (2 == context.metadata.version) {
               ret = resolve_pending_oceoc_v2(context) ;
	   }
	   else {
               ret = resolve_pending_oceoc_v1(context) ;
	   }
           if (typeof ret.error != "undefined") {
               return ret ;
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
                                    "\t try {\n" +
				          ins.NATIVE +
                                    "\t }\n" +
                                    "\t catch (e) {\n" +
                                    "\t   wepsim_notify_error(\"Error on the native code\", '" + ins.name + " => ' + e.toString());\n" +
                                    "\t }\n" +
				    "} ;\n" ;
		   }
	   }
	   if (mk_native != "") {
	       eval(mk_native) ;
	   }

	   // oc_eoc_hash
           var fioc  = 0 ;
	   var fieoc = 0 ;
	   context.hash_oceoc = {} ;

	   for (var fi in context.instrucciones)
	   {
		if (context.instrucciones[fi].name == "begin") {
		    continue ;
		}

		fioc = context.instrucciones[fi].oc ;

		if (typeof context.hash_oceoc[fioc] == "undefined") {
		    context.hash_oceoc[fioc] = {} ;
		}

		if (typeof context.instrucciones[fi].eoc == "undefined")
                {
		    context.hash_oceoc[fioc].witheoc = false ;
		    context.hash_oceoc[fioc].i       = context.instrucciones[fi] ;
		}
                else
                {
		    fieoc = context.instrucciones[fi].eoc ;
		    context.hash_oceoc[fioc].witheoc = true ;
		    context.hash_oceoc[fioc][fieoc]  = context.instrucciones[fi] ;
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
           ret.hash_oceoc         = context.hash_oceoc ;
           ret.hash_labels_firm_rev = context.revlabels ;

           return ret ;
}


/*
 *  Auxiliar firmware interface
 */

function decode_instruction ( curr_firm, ep_ir, binstruction )
{
	var ret = {
		      "oinstruction": null,
		      oc_code:  0,
		      eoc_code: 0
		  } ;

	// instructions as 32-string
	var bits = binstruction.toString(2).padStart(32, "0") ;

	// oc/op-code
	var oc = bits.substr(ep_ir.default_eltos.oc.begin, ep_ir.default_eltos.oc.length) ;
	ret.oc_code = parseInt(oc, 2) ;

	var hash_entry = curr_firm.hash_oceoc[oc] ;
	if (typeof hash_entry == "undefined") {
	    return ret ;
	}

	// (.witheoc == false)
	if (hash_entry.witheoc == false) {
	    ret.oinstruction = hash_entry.i ;
            return ret ;
	}

	// (.witheoc == true) -> eoc/cop-code
	var maskval = 0 ;
	var masklen = 0 ;
	for (var eoc in hash_entry)
	{
	     maskval = (binstruction) & (hash_entry[eoc].opcode_mask_eocbin) ;
	     if (maskval == hash_entry[eoc].opcode_mask_valbin)
	     {
		 // if several masks are valid, the longer last one should be choosen
	         if (eoc.length < masklen) continue ;

	         ret.oinstruction = hash_entry[eoc] ;
	         ret.eoc_code     = parseInt(eoc, 2) ;
		 masklen          = eoc.length ;
	     }
	}

        return ret ;
}

function decode_ram ( )
{
    var curr_ircfg = simhw_sim_ctrlStates_get().ir ;
    var curr_firm  = simhw_internalState('FIRMWARE') ;
    var curr_MP    = simhw_internalState('MP') ;

    var sram = "\n" ;
    for (var address in curr_MP)
    {
        var value        = get_value(curr_MP[address]) ;
        var binstruction = value.toString(2).padStart(32, '0') ;
        var oinstruction = decode_instruction(curr_firm, curr_ircfg, binstruction).oinstruction ;

	var sinstruction = oinstruction.name ;
	for (var i=0; i<oinstruction.fields.length; i++) {
	     sinstruction = sinstruction + " " + oinstruction.fields[i].name ;
	}

        sram += "0x" + parseInt(address).toString(16) + ":" + sinstruction + "\n" ;
    }

    return sram ;
}

