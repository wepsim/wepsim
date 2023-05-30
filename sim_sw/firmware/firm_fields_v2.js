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


function firm_instruction_check_oc ( context, instruccionAux, xr_info, all_ones_oc )
{
       // semantic check: valid value
       if ( (instruccionAux.oc.match("[01]*")[0] != instruccionAux.oc) ||
	    (instruccionAux.oc.length !== xr_info.ir.default_eltos.oc.length) )
       {
	   return langError(context,
			    i18n_get_TagFor('compiler', 'INCORRECT OC BIN.') +
			    "'" + instruccionAux.oc + "'") ;
       }

       // semantic check: 'oc' is not already used
       if (instruccionAux.oc != all_ones_oc)
       {
	   if ( (typeof context.oc_funct[instruccionAux.oc] !== "undefined") &&
		       (context.oc_funct[instruccionAux.oc].funct === null) )
	   {
		 return langError(context,
				  i18n_get_TagFor('compiler', 'OC ALREADY USED') +
				  context.oc_funct[instruccionAux.oc].signature) ;
	   }

	   if (typeof context.oc_funct[instruccionAux.oc] == "undefined")
	   {
	       context.oc_funct[instruccionAux.oc] = {} ;
	       context.oc_funct[instruccionAux.oc].signature = instruccionAux.signature ;
	       context.oc_funt[instruccionAux.oc].funct       = null ;
	   }
       }

       return {} ;
}

function firm_instruction_check_funct ( context, instruccionAux )
{
	// semantic check: valid value
	if (instruccionAux.funct.match("[01]*")[0] != instruccionAux.funct) {
	    return langError(context,
			     i18n_get_TagFor('compiler', 'INCORRECT FUNCT BIN.') +
			     "'" + instruccionAux.funct + "'") ;
	}

	// semantic check: 'oc+funct' is not already used
	if (        (context.oc_funct[instruccionAux.oc].funct != null) &&
	     (typeof context.oc_funct[instruccionAux.oc].funct[instruccionAux.funct] != "undefined") )
	{
	      return langError(context,
			       i18n_get_TagFor('compiler', 'OC+FUNCT ALREADY USED') +
			       "'" + context.oc_funct[instruccionAux.oc].funct[instruccionAux.funct] + "'") ;
	}
	if (context.oc_funct[instruccionAux.oc].funct == null)
	    context.oc_funct[instruccionAux.oc].funct = {};
	    context.oc_funct[instruccionAux.oc].funct[instruccionAux.funct] = instruccionAux.signature ;

       return {} ;
}

function firm_instruction_keynumber_read ( context, instruccionAux )
{
       var ret = {} ;

// li reg val {
//             ...
//             *key=000000*,
//             ...
// }

       nextToken(context);
       // match mandatory =
       if (! isToken(context,"=")) {
	   return langError(context,
			    i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       nextToken(context);
       // match mandatory VALUE
       ret.value = getToken(context) ;

       nextToken(context);
       // match optional ,
       if (isToken(context,",")) {
	   nextToken(context);
       }

       return ret ;
}

function firm_instruction_keystring_read ( context, instruccionAux )
{
       var ret = {} ;

// li reg val {
//             ...
//             *key='this instruction is used for...',*
//             ...
// }

       // match optional key=string pair
       nextToken(context);
       // match mandatory =
       if (! isToken(context,"=")) {
	     return langError(context,
			      i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       nextToken(context);
       // match mandatory value
       ret.value = getToken(context) ;

       // semantic check: valid value
       if ("STRING" != getTokenType(context)) {
	    return langError(context,
			     i18n_get_TagFor('compiler', 'UNKNOWN ESCAPE CHAR') +
			     "'" + getToken(context) + "'") ;
       }

       nextToken(context);
       // match optional ,
       if (isToken(context,",")) {
	   nextToken(context);
       }

       return ret ;
}

function firm_instruction_field_read_v2 ( context, instruccionAux )
{
        var tmp_fields = {} ;
		var field_list = ["oc", "funct", "reg", "imm", "address-rel", "address-abs"] ;
		var complex_field_list = ["address-rel", "address-abs"] ;

        // ...
        // reg(15:19)=rs1,
        // ...

	// match mandatory FIELD-type: oc|funct|reg|imm|address-rel|address-abs
	if ( !isToken_arr(context, field_list) ) {
		return langError(context, "Incorrect type of field (oc, funct, reg, imm, address-rel or address-abs)") ;
	}

	tmp_fields.type = getToken(context) ;

	if ("address-rel" == tmp_fields.type) {
             tmp_fields.type         = "address" ;
             tmp_fields.address_type = "rel" ;
        }
	if ("address-abs" == tmp_fields.type) {
             tmp_fields.type         = "address" ;
             tmp_fields.address_type = "abs" ;
        }

	if ( !isToken_arr(context, complex_field_list) ) {
		//Normal start and stop bit behaivour (start:end)
		nextToken(context);
		// match mandatory (
		if (! isToken(context,"(")) {
			return langError(context,
					i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
		}

		nextToken(context);
		// match mandatory START_BIT
		tmp_fields.startbit = getToken(context) ;

		// check startbit range
		var start = parseInt(tmp_fields.startbit);
		if (start > 32*parseInt(instruccionAux.nwords)-1) {
			return langError(context,
					i18n_get_TagFor('compiler', 'STARTBIT OoR') +
					"'" + getToken(context) + "'") ;
		}

		nextToken(context);
		// match mandatory :
		if (! isToken(context,":")) {
			return langError(context,
					i18n_get_TagFor('compiler', 'COLON NOT FOUND')) ;
		}

		nextToken(context);
		// match mandatory STOP_BIT
		tmp_fields.stopbit = getToken(context) ;

		// check stopbit range
		var stop  = parseInt(tmp_fields.stopbit);
		if (stop > 32*parseInt(instruccionAux.nwords)) {
			return langError(context,
					i18n_get_TagFor('compiler', 'STOPBIT OoR') +
					"'" + getToken(context) + "'") ;
		}

		nextToken(context);
		// match mandatory )
		if (! isToken(context,")")) {
			return langError(context,
					i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
		}

	} else {
		//Complex fields (start:end|bit|start:end) ORDER MATTERS
		nextToken(context);
		// match mandatory (
		if (! isToken(context,"(")) {
			return langError(context,
					i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
		}

		var bits = [] ;
		var bits_aux = [0, 0] ;
		while (! isToken(context,")")) {
			nextToken(context);
			bits_aux[0] = getToken(context) ;

			nextToken(context);
			// match mandatory :
			if (! isToken(context,":") || ! isToken(context,"|")) {
				return langError(context,
						i18n_get_TagFor('compiler', 'COLON OR PIPE NOT FOUND')) ;
			}
			if (isToken(context,":")) {
				nextToken(context);
				bits_aux[1] = getToken(context) ;
			} else if (isToken(context,"|")) {
				bits_aux[1] = bits_aux[0] ;
			}

			bits.push(bits_aux) ;
		}

		tmp_fields.bits = bits ;

	}

	nextToken(context);
	// match mandatory =
	if (! isToken(context,"=")) {
	       return langError(context,
				i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
	}

	nextToken(context);
	// match mandatory FIELD
	var tmp_name = getToken(context) ;

        if (["oc", "funct"].includes(tmp_fields.type))
        {
                tmp_fields.value = tmp_name ; // oc(8,7)=*10101*
        }
        else
        {
		tmp_fields.name = tmp_name ; // reg(8,7)=*rs1*

		var index_name = -1 ;
		for (var i=0; (i<instruccionAux.fields.length) && (index_name == -1); i++)
		{
		     if (instruccionAux.fields[i].name == tmp_name)
		     {
			 instruccionAux.fields[i] = tmp_fields ;
			 index_name = i ;
		     }
		}
		if (index_name == -1) {
		     return langError(context,
				      i18n_get_TagFor('compiler', 'UNEXPECTED FIELD') +
				      "'" + tmp_name + "'. " +
				      i18n_get_TagFor('compiler', 'CHECK ORDER')) ;
		}
        }

	nextToken(context);
	// match optional ,
	if (isToken(context, ",")) {
	       nextToken(context);
	}

	// check overlapping
	for (i=stop; i<=start; i++)
	{
		if (typeof instruccionAux.overlapping[i] != "undefined") {
		    return langError(context,
				     i18n_get_TagFor('compiler', 'OVERLAPPING FIELD') + 
				     instruccionAux.fields[index_name].name) ;
		}

		instruccionAux.overlapping[i] = 1;
	}

        // add to field list (fields_all)
	instruccionAux.fields_all.push(tmp_fields) ;

        return tmp_fields ;
}

function firm_instruction_read_fields_v2 ( context, instruccionAux, xr_info, all_ones_oc )
{
       var ret = {};

// li reg val offset {
//            *[nwords=1,]
//              oc(31,26)=000000,
//             [funct(31,26)=000000,]
//              reg(25,21)=reg,
//              imm(15,0)=val,
//              address-rel(12|10:5|4:1|11)=offset,
//             [help='this instruction is used for...',]
//             [native,]*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       var campos       = instruccionAux.fields ;
       var firma        = instruccionAux.signature ;
       var firmaUsuario = instruccionAux.signatureUser ;
       var firmaGlobal  = instruccionAux.signatureGlobal ;

       var oc_inserted = 0;
       var camposInsertados = 0;
       nextToken(context);
       while (! isToken(context,"{"))
       {
	       // match op
	       if (isToken(context,"oc"))
	       {
		   ret = firm_instruction_field_read_v2(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.oc = ret.value ;

                   ret = firm_instruction_check_oc(context, instruccionAux, xr_info, all_ones_oc) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   oc_inserted = 1 ;
	       }

	       // match optional funct
          else if (isToken(context,"funct"))
	       {
		   ret = firm_instruction_field_read_v2(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.funct = ret.value ;

                   ret = firm_instruction_check_funct(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }
	       }

	       // match optional funct
          else if (isToken(context,"funct"))
	       {
		   ret = firm_instruction_field_read_v2(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }
 
                   instruccionAux.fields_funct.push(ret.value) ;
	       }

	       // match optional "nwords"
	  else if (isToken(context, "nwords"))
	       {
                   ret = firm_instruction_keynumber_read(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.nwords = ret.value ;
	       }

	       // match optional help
	  else if (isToken(context,"help"))
	       {
		   ret = firm_instruction_keystring_read(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.help = ret.value ;
	       }

	       // match optional 'native' + ','
	  else if (isToken(context,"native"))
	       {
		   instruccionAux["is_native"] = true;
		   nextToken(context);

		   if (isToken(context,","))
		       nextToken(context);
	       }

	       // match field...
	  else {
		   ret = firm_instruction_field_read_v2(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

		   firma = firma.replace("," + campos[camposInsertados].name, "," + campos[camposInsertados].type);
		   firma = firma.replace("(" + campos[camposInsertados].name, "(" + campos[camposInsertados].type);
		   firma = firma.replace(")" + campos[camposInsertados].name, ")" + campos[camposInsertados].type);
		   firmaUsuario = firmaUsuario.replace(campos[camposInsertados].name, campos[camposInsertados].type);

		   instruccionAux.signature     = firma;
		   instruccionAux.signatureUser = firmaUsuario;
		   firmaGlobal = firma.replace("address","num");
		   firmaGlobal = firmaGlobal.replace("imm" , "num");
		   instruccionAux.signatureGlobal = firmaGlobal;

		   camposInsertados++;
	       }
       }

       instruccionAux.fields       = campos;
       instruccionAux.signatureRaw = firmaUsuario;

       // semantic check: oc must exist
       if (1 != oc_inserted)
       {
	   return langError(context,
			    i18n_get_TagFor('compiler', 'NO OC FIELD')) ;
       }

       // semantic check: number of fields
       if (camposInsertados != instruccionAux.numeroCampos)
       {
	   return langError(context,
			    i18n_get_TagFor('compiler', 'NO FIELD')) ; // TODO
       }

       // semantic check: valid pending value (funct.length if native.false)
       if ( (instruccionAux["is_native"] === false) &&
	    (typeof instruccionAux.funct   !== 'undefined') &&
	    (instruccionAux.funct.length   !== xr_info.ir.default_eltos.funct.length) )
       {
	    return langError(context,
			     i18n_get_TagFor('compiler', 'BAD FUNCT BIN. LEN.') +
			     "'" + getToken(context) + "'") ;
       }

       return {} ;
}

