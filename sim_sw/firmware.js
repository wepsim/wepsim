/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
		ret.label_co = j.toString(2).padStart(6, "0") ;

                // (1/3) check for free co-0000...
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
                last_cop  = Math.pow(2, 4) - 1 ;
		for (k=first_cop; k<last_cop; k++)
		{
		     ret.label_cop = k.toString(2).padStart(4, "0") ;

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

function find_first_ocfunct ( context, curr_instruction, first_oc, last_oc )
{
           var k = 0 ;
           var m = 0 ;

           var ret = {} ;
               ret.label_oc  = '' ;
               ret.label_funct = '' ;

	   // analize if instruction has any field that uses cop bits... -> m points to
           var funct_overlaps = false ;
	   for (m=0; m<curr_instruction.fields.length; m++)
           {
	        if (curr_instruction.fields[m].stopbit === "0")
                {
                    funct_overlaps = true ;
	   	    break ;
	        }
	   }

           // find first free 'oc-funct' code
	   for (j=first_oc; j<last_oc; j++)
	   {
                // new initial oc...
		ret.label_oc = j.toString(2).padStart(6, "0") ;

                // (1/3) check for free oc-0000...
		if (typeof context.oc_funct[ret.label_oc] === "undefined")
                {
		    context.oc_funct[ret.label_oc]         = {} ;
		    context.oc_funct[ret.label_oc].withfunct = false ;
		    return ret ;
                }

                // (2/3) search for free oc-funct...
                if (typeof curr_instruction.funct !== "undefined")
                {
                    // funct in use... -> skip funct
		    if (typeof context.oc_funct[ret.label_oc].funct[curr_instruction.funct] !== "undefined") {
		        continue ;
		    }

                    // use funct
		    ret.label_funct = curr_instruction.funct ;
		    return ret ;
                }

                // (3/3) check if skip (new instruction overlaps || existing instructions overlap)...
                if (funct === true) {
		    continue ;
                }
                if (context.oc_funct[ret.label_oc].withfunct === false) {
		    continue ;
                }

                // new initial oc-funct...
                first_funct = 0 ;
                last_funct  = Math.pow(2, 4) - 1 ;
		for (k=first_funct; k<last_funct; k++)
		{
		     ret.label_funct = k.toString(2).padStart(4, "0") ;

                     if (        (context.oc_funct[ret.label_oc].funct === null) ||
                          (typeof context.oc_funct[ret.label_oc].funct === 'undefined') )
                     {
		          context.oc_funct[ret.label_oc].funct = {};
                          return ret ;
                     }
                     if (typeof context.oc_funct[ret.label_oc].funct[ret.label_funct] === "undefined")
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

           var     xr_info = simhw_sim_ctrlStates_get() ;
           var all_ones_co = "1".repeat(xr_info.ir.default_eltos.co.length) ;
		   var all_ones_oc = "1".repeat(xr_info.ir.default_eltos.oc.length) ;

           var context = {} ;
	   context.line           	= 1 ;
	   context.error          	= null ;
	   context.i              	= 0 ;
	   context.contadorMC     	= 0 ;
	   context.etiquetas      	= {} ;
	   context.labelsNotFound 	= [] ;
	   context.instrucciones  	= [] ;
	   context.co_cop         	= {} ;
	   context.oc_funct       	= {} ;
	   context.registers      	= [] ;
           context.text           	= text ;
	   context.tokens         	= [] ;
	   context.token_types         	= [] ;
	   context.t              	= 0 ;
	   context.newlines       	= [] ;
	   context.pseudoInstructions	= [];
	   context.stackRegister	= null ;
           context.comments             = [] ;
           context.version              = 1 ;

           var i = 0 ;

           nextToken(context) ;
           // optional: firmware_version: 2
           if (isToken(context, "firmware_version"))
           {
	       nextToken(context);
	       // match mandatory =
	       if (! isToken(context,"=")) {
		     return langError(context,
				      i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
	       }

	       nextToken(context);
	       // match mandatory FIRMWARE_VERSION
               context.comments = [] ;
	       context.version = getToken(context) ;

               nextToken(context);
               // match optional ,
               if (isToken(context,","))
	           nextToken(context);
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

               if (isToken(context, "registers"))
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

               if (isToken(context, "pseudoinstructions"))
               {
                   ret = firm_pseudoinstructions_read(context) ;
	           if (typeof ret.error != "undefined") {
	               return ret ;
                   }

                   continue ;
               }

		// *begin {
		//            (XX, Y, BW=11),
		//     fetch: (X2, X0),
		//            (A0, B=0, C=0)
		// }*

               if (isToken(context, "begin"))
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
	       return langError(context,
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
	                return langError(context,
		         		 i18n_get_TagFor('compiler', 'NO LABEL FETCH')) ;
                    }
                }
           }
           if (found === false) {
	       return langError(context,
		         	i18n_get_TagFor('compiler', 'NO LABEL BEGIN')) ;
           }

           var ir_info = simhw_sim_ctrlStates_get() ;
		   if (context.version == 2) {
			    // RESOLVE: oc=111111... (111111... === "please, find one free 'oc' for me...")
				var ir_oc_length = 6 ;
				if (typeof ir_info !== "undefined") {
					ir_oc_length = ir_info.ir.default_eltos.oc.length ;
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

						// find first free 'oc-funct' code
						var r = find_first_occfunct(context, curr_instruction, first_oc, last_oc) ;
				if (r.j >= last_oc) {
						return langError(context,
								i18n_get_TagFor('compiler', 'NO OC CODES')) ;
				}

						// work with this free 'oc-funct' code
				first_oc = parseInt(r.label_oc, 2) ;

				curr_instruction.oc = r.label_oc ;
				context.oc_funct[r.label_oc].signature = curr_instruction.signature ;

				if (r.label_funct !== "")
						{
					curr_instruction.funct = r.label_funct ;
					context.oc_funct[r.label_oc].funct[r.label_funct] = curr_instruction.signature ;
					context.oc_funct[r.label_oc].withfunct = true ;
						}
				}
		   } else {
			    // RESOLVE: co=111111... (111111... === "please, find one free 'co' for me...")
				var ir_co_length = 6 ;
				if (typeof ir_info !== "undefined") {
					ir_co_length = ir_info.ir.default_eltos.co.length ;
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
						return langError(context,
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
	                    return langError(context,
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

	   if (context.version == 2) {
		   // oc_funct_hash
			var fioc  = 0 ;
			var fifunct = 0 ;
			context.ocfunct_hash = {} ;
			for (var fi in context.instrucciones)
			{
				if (context.instrucciones[fi].name == "begin") {
					continue ;
				}

				fioc  = context.instrucciones[fi].oc ;
				if (typeof context.ocfunct_hash[fioc] == "undefined") {
					context.ocfunct_hash[fioc] = {} ;
				}

				if (typeof context.instrucciones[fi].funct == "undefined") {
					context.ocfunct_hash[fico].withfunct = false ;
					context.ocfunct_hash[fico].i       = context.instrucciones[fi] ;
				} else {
					fifunct = context.instrucciones[fi].funct ;
					context.ocfunct_hash[fioc].withfunct = true ;
					context.ocfunct_hash[fioc][fifunct]  = context.instrucciones[fi] ;
				}
			}
	   } else {
            // co_cop_hash
			var fico  = 0 ;
			var ficop = 0 ;
			context.cocop_hash = {} ;
			for (var fi in context.instrucciones)
			{
				if (context.instrucciones[fi].name == "begin") {
					continue ;
				}

				fico  = context.instrucciones[fi].co ;
				if (typeof context.cocop_hash[fico] == "undefined") {
					context.cocop_hash[fico] = {} ;
				}

				if (typeof context.instrucciones[fi].cop == "undefined") {
					context.cocop_hash[fico].withcop = false ;
					context.cocop_hash[fico].i       = context.instrucciones[fi] ;
				} else {
					ficop = context.instrucciones[fi].cop ;
					context.cocop_hash[fico].withcop = true ;
					context.cocop_hash[fico][ficop]  = context.instrucciones[fi] ;
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
		   ret.version            = context.version ;
           ret.firmware           = context.instrucciones ;
           ret.labels_firm        = context.etiquetas ;
           ret.mp                 = {} ;
           ret.seg                = {} ;
           ret.registers          = context.registers ;
           ret.pseudoInstructions = context.pseudoInstructions ;
	   ret.stackRegister	  = context.stackRegister ;
	   ret.cocop_hash	  = context.cocop_hash ;
	   ret.revlabels	  = context.revlabels ;

           return ret ;
}

/*
 *  Save Firmware
 */

function saveFirmware ( SIMWARE )
{
	var file = "";
	for (i=0; i<SIMWARE.firmware.length; i++)
	{
		file += SIMWARE.firmware[i].signatureRaw;
		file += " {" + '\n';

		if (typeof SIMWARE.firmware[i].co != "undefined")
		{
			file += '\t' +"co=" + SIMWARE.firmware[i].co + "," + '\n';
		}

		if (typeof SIMWARE.firmware[i].cop != "undefined")
		{
			file += '\t' +"cop=" + SIMWARE.firmware[i].cop + "," + '\n';
		}

		if (typeof SIMWARE.firmware[i].nwords != "undefined")
		{
			file += '\t' + "nwords=" + SIMWARE.firmware[i].nwords + "," + '\n';
		}

		if (typeof SIMWARE.firmware[i].fields != "undefined")
		{	
			if (SIMWARE.firmware[i].fields.length>0)
			{
				for (var j=0;j<SIMWARE.firmware[i].fields.length;j++)
				{
					file += '\t' + SIMWARE.firmware[i].fields[j].name + " = " + SIMWARE.firmware[i].fields[j].type;
					file += "(" + SIMWARE.firmware[i].fields[j].startbit + "," + SIMWARE.firmware[i].fields[j].stopbit + ")";					
					if (SIMWARE.firmware[i].fields[j].type == "address")
					{
						file += SIMWARE.firmware[i].fields[j].address_type;
					}
					file += "," + '\n';
				}
			}
		}

		if (typeof SIMWARE.firmware[i].microcode != "undefined")
		{
			var addr=SIMWARE.firmware[i]["mc-start"];
			if (SIMWARE.firmware[i].name != "begin")
			{
				file += '\t' + '{' ;
			}

			for (var j=0; j<SIMWARE.firmware[i].microcode.length; j++)
			{
			        if ("" != SIMWARE.firmware[i].microcomments[j])
                                    file += '\n\t\t# ' + SIMWARE.firmware[i].microcomments[j];

				if (typeof SIMWARE.labels_firm[addr] != "undefined")
				     file += '\n' + SIMWARE.labels_firm[addr] + ":\t";
				else file += '\n' + '\t' + '\t';

				file += "(";
				var anySignal=0;
				for (var k in SIMWARE.firmware[i].microcode[j])
				{
					if ("MADDR" == k)
                                        {
                                            var val = SIMWARE.firmware[i].microcode[j][k];
                                            if (typeof SIMWARE.labels_firm[val] == "undefined")
                                                 file += k + "=" + val.toString(2) + ", ";
                                            else file += k + "=" + SIMWARE.labels_firm[val] + ", ";
                                            continue;
                                        }

					file += k + "=" + SIMWARE.firmware[i].microcode[j][k].toString(2) + ", ";

					anySignal=1;
				}
				if (anySignal==1)
				{
					file = file.substr(0, file.length - 2);
				}
				file += "),";
				addr++;
			}

			file = file.substr(0, file.length - 1);
			if (SIMWARE.firmware[i].name!="begin")
			{
				file += '\n\t}';
			}
		}

		file += '\n}\n\n';
	}	

	if ( (typeof SIMWARE.registers != "undefined") && (SIMWARE.registers.length > 0) )
	{
		file += 'registers' + '\n{\n';
		for (i=0; i< SIMWARE.registers.length; i++)
		{
                     var l = SIMWARE.registers[i].length - 1 ;
                     var r = " [ " ;
		     for (j=0; j<l; j++)
                          r += SIMWARE.registers[i][j] + ", " ;
                     r += SIMWARE.registers[i][l] + " ] " ;

		     if (SIMWARE.stackRegister == i)
		     	  file += '\t' + i + "=" + r + " (stack_pointer)," + '\n';
                     else file += '\t' + i + "=" + r + "," + '\n';
		}
		file  = file.substr(0, file.length-2);
		file += '\n}\n';
	}

        // save pseudo-instructions
	if (SIMWARE.pseudoInstructions.length !== 0)
	{
		file += '\n' +
			'pseudoinstructions\n' +
			'{' ;
		for (var ie=0; ie<SIMWARE.pseudoInstructions.length; ie++)
		{
		     file += '\n' +
			     '\t' + SIMWARE.pseudoInstructions[ie].initial.signature.replace(',', ' ') + '\n' +
			     '\t{\n' ;

		     var ie_inst = SIMWARE.pseudoInstructions[ie].finish.signature.split('\n') ;
		     for (var ie_i=0; ie_i<ie_inst.length; ie_i++)
		     {
			  file += '\t\t' + ie_inst[ie_i].trim() + ' ;\n' ;
		     }

		     file += '\t}\n' ;
		}
		file += '}\n' ;
	}

	return file;
}


/*
 *  Auxiliar firmware interface
 */

function decode_instruction ( curr_firm, ep_ir, binstruction )
{
	if (curr_firm.version == 2) {

	} else {
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

		if ("undefined" == typeof curr_firm.cocop_hash[co]) {
			return ret ;
		}

		if (false == curr_firm.cocop_hash[co].withcop)
			ret.oinstruction = curr_firm.cocop_hash[co].i ;
		else ret.oinstruction = curr_firm.cocop_hash[co][cop] ;
	}

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

