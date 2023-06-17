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


function firm_instruction_check_oc ( context, instruccionAux, xr_info, all_ones_co )
{
       // semantic check: valid value
       if ( (instruccionAux.co.match("[01]*")[0] != instruccionAux.co) ||
	    (instruccionAux.co.length !== xr_info.ir.default_eltos.co.length) )
       {
	   return frm_langError(context,
			        i18n_get_TagFor('compiler', 'INCORRECT CO BIN.') +
			        "'" + instruccionAux.co + "'") ;
       }

       // semantic check: 'co' is not already used
       if (instruccionAux.co != all_ones_co)
       {
	   if ( (typeof context.co_cop[instruccionAux.co] !== "undefined") &&
		       (context.co_cop[instruccionAux.co].cop === null) )
	   {
		 return frm_langError(context,
				      i18n_get_TagFor('compiler', 'CO ALREADY USED') +
				      context.co_cop[instruccionAux.co].signature) ;
	   }

	   if (typeof context.co_cop[instruccionAux.co] == "undefined")
	   {
	       context.co_cop[instruccionAux.co] = {} ;
	       context.co_cop[instruccionAux.co].signature = instruccionAux.signature ;
	       context.co_cop[instruccionAux.co].cop       = null ;
	   }
       }

       return {} ;
}

function firm_instruction_check_cop ( context, instruccionAux )
{
	// semantic check: valid value
	if (instruccionAux.cop.match("[01]*")[0] != instruccionAux.cop) {
	    return frm_langError(context,
			         i18n_get_TagFor('compiler', 'INCORRECT COP BIN.') +
			         "'" + instruccionAux.cop + "'") ;
	}

	// semantic check: 'co+cop' is not already used
	if (        (context.co_cop[instruccionAux.co].cop != null) &&
	     (typeof context.co_cop[instruccionAux.co].cop[instruccionAux.cop] != "undefined") )
	{
	      return frm_langError(context,
			           i18n_get_TagFor('compiler', 'CO+COP ALREADY USED') +
			           "'" + context.co_cop[instruccionAux.co].cop[instruccionAux.cop] + "'") ;
	}
	if (context.co_cop[instruccionAux.co].cop == null)
	    context.co_cop[instruccionAux.co].cop = {};
	    context.co_cop[instruccionAux.co].cop[instruccionAux.cop] = instruccionAux.signature ;

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

       frm_nextToken(context);
       // match mandatory =
       if (! frm_isToken(context,"=")) {
	   return frm_langError(context,
			        i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       frm_nextToken(context);
       // match mandatory VALUE
       ret.value = frm_getToken(context) ;

       frm_nextToken(context);
       // match optional ,
       if (frm_isToken(context,",")) {
	   frm_nextToken(context);
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
       frm_nextToken(context);
       // match mandatory =
       if (! frm_isToken(context,"=")) {
	     return frm_langError(context,
			          i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       frm_nextToken(context);
       // match mandatory value
       ret.value = frm_getToken(context) ;

       // semantic check: valid value
       if ("STRING" != frm_getTokenType(context)) {
	    return frm_langError(context,
			         i18n_get_TagFor('compiler', 'UNKNOWN ESCAPE CHAR') +
			         "'" + frm_getToken(context) + "'") ;
       }

       frm_nextToken(context);
       // match optional ,
       if (frm_isToken(context,",")) {
	   frm_nextToken(context);
       }

       return ret ;
}

function firm_instruction_field_read_v2 ( context, instruccionAux )
{
        var tmp_fields = {} ;
	var field_list = ["oc", "cop", "funct", "reg", "inm", "address-rel", "address-abs"] ;

        // ...
        // reg(15:19)=rs1,
        // ...

	// match mandatory FIELD-type: oc|cop|funct|reg|inm|address-rel|address-abs
	if ( !frm_isToken_arr(context, field_list) ) {
		return frm_langError(context,
                                     "Incorrect type of field (oc, funct, reg, inm, address-rel or address-abs)") ;
	}

	tmp_fields.type = frm_getToken(context) ;

	if ("address-rel" == tmp_fields.type) {
             tmp_fields.type         = "address" ;
             tmp_fields.address_type = "rel" ;
        }
	if ("address-abs" == tmp_fields.type) {
             tmp_fields.type         = "address" ;
             tmp_fields.address_type = "abs" ;
        }

	frm_nextToken(context);
	// match mandatory (
	if (! frm_isToken(context,"(")) {
		 return frm_langError(context,
				      i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
	}

	frm_nextToken(context);
	// match mandatory START_BIT
	tmp_fields.startbit = frm_getToken(context) ;

	// check startbit range
	var start = parseInt(tmp_fields.startbit);
	if (start > 32*parseInt(instruccionAux.nwords)-1) {
	       return frm_langError(context,
				    i18n_get_TagFor('compiler', 'STARTBIT OoR') +
				    "'" + frm_getToken(context) + "'") ;
	}

	frm_nextToken(context);
	// match mandatory :
	if (! frm_isToken(context,":")) {
		 return frm_langError(context,
				      i18n_get_TagFor('compiler', 'COLON NOT FOUND')) ;
	}

	frm_nextToken(context);
	// match mandatory STOP_BIT
	tmp_fields.stopbit = frm_getToken(context) ;

	// check stopbit range
	var stop  = parseInt(tmp_fields.stopbit);
	if (stop > 32*parseInt(instruccionAux.nwords)) {
	       return frm_langError(context,
				    i18n_get_TagFor('compiler', 'STOPBIT OoR') +
				    "'" + frm_getToken(context) + "'") ;
	}

	frm_nextToken(context);
	// match mandatory )
	if (! frm_isToken(context,")")) {
		 return frm_langError(context,
				      i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
	}

	frm_nextToken(context);
	// match mandatory =
	if (! frm_isToken(context,"=")) {
	       return frm_langError(context,
				    i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
	}

	frm_nextToken(context);
	// match mandatory FIELD
	var tmp_name = frm_getToken(context) ;

        if (["oc", "cop", "funct"].includes(tmp_fields.type))
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
		     return frm_langError(context,
				          i18n_get_TagFor('compiler', 'UNEXPECTED FIELD') +
				          "'" + tmp_name + "'. " +
				          i18n_get_TagFor('compiler', 'CHECK ORDER')) ;
		}
        }

	frm_nextToken(context);
	// match optional ,
	if (frm_isToken(context, ",")) {
	       frm_nextToken(context);
	}

	// check overlapping
	for (i=stop; i<=start; i++)
	{
		if (typeof instruccionAux.overlapping[i] != "undefined") {
		    return frm_langError(context,
				         i18n_get_TagFor('compiler', 'OVERLAPPING FIELD') + 
				         instruccionAux.fields[index_name].name) ;
		}

		instruccionAux.overlapping[i] = 1;
	}

        // add to field list (fields_all)
	instruccionAux.fields_all.push(tmp_fields) ;

        return tmp_fields ;
}

function firm_instruction_read_fields_v2 ( context, instruccionAux, xr_info, all_ones_co )
{
       var ret = {};

// li reg val offset {
//            *[nwords=1,]
//              oc(31,26)=000000,
//             [cop(31,26)=000000,]
//              reg(25,21)=reg,
//              inm(15,0)=val,
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

       var co_inserted = 0;
       var camposInsertados = 0;
       frm_nextToken(context);
       while (! frm_isToken(context,"{"))
       {
	       // match op
	       if (frm_isToken(context,"oc"))
	       {
		   ret = firm_instruction_field_read_v2(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.co = ret.value ;

                   ret = firm_instruction_check_oc(context, instruccionAux, xr_info, all_ones_co) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   co_inserted = 1 ;
	       }

	       // match optional cop
          else if (frm_isToken(context,"cop"))
	       {
		   ret = firm_instruction_field_read_v2(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.cop = ret.value ;

                   ret = firm_instruction_check_cop(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }
	       }

	       // match optional funct
          else if (frm_isToken(context,"funct"))
	       {
		   ret = firm_instruction_field_read_v2(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }
 
                   instruccionAux.fields_funct.push(ret.value) ;
	       }

	       // match optional "nwords"
	  else if (frm_isToken(context, "nwords"))
	       {
                   ret = firm_instruction_keynumber_read(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.nwords = ret.value ;
	       }

	       // match optional help
	  else if (frm_isToken(context,"help"))
	       {
		   ret = firm_instruction_keystring_read(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.help = ret.value ;
	       }

	       // match optional 'native' + ','
	  else if (frm_isToken(context,"native"))
	       {
		   instruccionAux["is_native"] = true;
		   frm_nextToken(context);

		   if (frm_isToken(context,","))
		       frm_nextToken(context);
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
		   firmaGlobal = firmaGlobal.replace("inm" , "num");
		   instruccionAux.signatureGlobal = firmaGlobal;

		   camposInsertados++;
	       }
       }

       instruccionAux.fields       = campos;
       instruccionAux.signatureRaw = firmaUsuario;

       // semantic check: co must exist
       if (1 != co_inserted)
       {
	   return frm_langError(context,
			        i18n_get_TagFor('compiler', 'NO CO FIELD')) ;
       }

       // semantic check: number of fields
       if (camposInsertados != instruccionAux.numeroCampos)
       {
	   return frm_langError(context,
			        i18n_get_TagFor('compiler', 'NO FIELD')) ; // TODO
       }

       // semantic check: valid pending value (cop.length if native.false)
       if ( (instruccionAux["is_native"] === false) &&
	    (typeof instruccionAux.cop   !== 'undefined') &&
	    (instruccionAux.cop.length   !== xr_info.ir.default_eltos.cop.length) )
       {
	    return frm_langError(context,
			         i18n_get_TagFor('compiler', 'BAD COP BIN. LEN.') +
			         "'" + frm_getToken(context) + "'") ;
       }

       return {} ;
}

