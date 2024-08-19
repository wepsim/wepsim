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


function firm_fields_v1_write ( elto_fields )
{
	var o = "" ;

        // no fields -> return empty
	if (typeof elto_fields == "undefined") {
            return o ;
        }

        // return fields as string...
	for (j=0; j<elto_fields.length; j++)
	{
		 o += '\t' + elto_fields[j].name + " = " + elto_fields[j].type;
		 o += "(" + elto_fields[j].startbit + "," + elto_fields[j].stopbit + ")";
		 if (elto_fields[j].type == "address") {
		     o += elto_fields[j].address_type;
		 }
		 o += "," + '\n';
	}

        // return string
	return o ;
}


function firm_instruction_nword_read ( context, instruccionAux )
{

// li reg val {
//             ...
//             *[nwords=1,]*
//             ...
// }

       frm_nextToken(context);
       // match mandatory =
       if (! frm_isToken(context,"=")) {
	   return frm_langError(context,
			        i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       frm_nextToken(context);
       // match mandatory NWORDS
       instruccionAux.nwords = frm_getToken(context) ;

       frm_nextToken(context);
       // match optional ,
       if (frm_isToken(context,",")) {
	   frm_nextToken(context);
       }

       return {} ;
}

function firm_instruction_help_read ( context, instruccionAux )
{

// li reg val {
//             ...
//             *[help='this instruction is used for...',]*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       // match optional help
       frm_nextToken(context);
       // match mandatory =
       if (! frm_isToken(context,"=")) {
	     return frm_langError(context,
			          i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       frm_nextToken(context);
       // match mandatory HELP value
       instruccionAux.help = frm_getToken(context) ;

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

       return {} ;
}

function firm_instruction_co_read ( context, instruccionAux, xr_info, all_ones_co )
{

// li reg val {
//             *co=000000,*
//             nwords=1,
//             ...
// }

       frm_nextToken(context);
       // match mandatory =
       if (! frm_isToken(context,"=")) {
	     return frm_langError(context,
			          i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       frm_nextToken(context);
       // match mandatory CO
       instruccionAux.co = frm_getToken(context) ;

       frm_nextToken(context);
       // match optional ,
       if (frm_isToken(context,",")) {
	   frm_nextToken(context);
       }

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

       // overlapping mask (initialized with 'co' field)
       stop  = 31 - parseInt(xr_info.ir.default_eltos.oc.end) ;   // 5 -> 26
       start = 31 - parseInt(xr_info.ir.default_eltos.oc.begin) ; // 0 -> 31
//     stop  = 26 ;
//     start = 31 ;
       for (i=stop; i<=start; i++)
       {
		if (typeof instruccionAux.overlapping[i] != "undefined") {
		    return frm_langError(context,
				         i18n_get_TagFor('compiler', 'OVERLAPPING FIELD') +
				         'co') ;
		}

		instruccionAux.overlapping[i] = 1;
       }

       return {} ;
}

function firm_instruction_cop_read ( context, instruccionAux, all_ones_co )
{

// li reg val {
//             co=000000,
//             ...
//             *[cop=00000,]*
//             nwords=1,
//             ...
// }

       frm_nextToken(context);
       // match mandatory =
       if (! frm_isToken(context,"=")) {
	     return frm_langError(context,
			          i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       frm_nextToken(context);
       // match mandatory COP value
       instruccionAux.cop = frm_getToken(context) ;

       frm_nextToken(context);
       // match optional ,
       if (frm_isToken(context,",")) {
	   frm_nextToken(context);
       }

	// semantic check: valid value
	if (instruccionAux.cop.match("[01]*")[0] != instruccionAux.cop) {
	    return frm_langError(context,
			         i18n_get_TagFor('compiler', 'INCORRECT COP BIN.') +
			         "'" + instruccionAux.cop + "'") ;
	}

	// semantic check: 'co+cop' is not already used
        if (instruccionAux.co != all_ones_co)
        {
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
        }

        return {} ;
}

function firm_instruction_field_read ( context, instruccionAux, camposInsertados )
{
	// match mandatory FIELD
	var tmp_name = frm_getToken(context) ;
	if (instruccionAux.fields[camposInsertados].name != tmp_name) {
	       return frm_langError(context,
				    i18n_get_TagFor('compiler', 'UNEXPECTED FIELD') +
				    "'" + tmp_name + "'. " +
				    i18n_get_TagFor('compiler', 'CHECK ORDER')) ;
	}

	frm_nextToken(context);
	// match mandatory =
	if (! frm_isToken(context,"=")) {
	       return frm_langError(context,
				    i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
	}

	frm_nextToken(context);
	// match mandatory reg|imm|address
	if ( !frm_isToken_arr(context, ["reg", "imm", "inm", "address"]) ) {
	      return frm_langError(context, "Incorrect type of field (reg, imm or address)") ;
	}

	instruccionAux.fields[camposInsertados].type = frm_getToken(context) ;

	frm_nextToken(context);
	// match mandatory (
	if (! frm_isToken(context,"(")) {
	      return frm_langError(context,
			           i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
	}

	frm_nextToken(context);
	// match mandatory START_BIT
	instruccionAux.fields[camposInsertados].startbit = frm_getToken(context) ;

	// check startbit range
	var start = parseInt(instruccionAux.fields[camposInsertados].startbit);
	if (start > 32*parseInt(instruccionAux.nwords)-1) {
	       return frm_langError(context,
				    i18n_get_TagFor('compiler', 'STARTBIT OoR') +
				    "'" + frm_getToken(context) + "'") ;
	}

	frm_nextToken(context);
	// match mandatory ,
	if (! frm_isToken(context,",")) {
		 return frm_langError(context,
				      i18n_get_TagFor('compiler', 'COMMA NOT FOUND')) ;
	}

	frm_nextToken(context);
	// match mandatory STOP_BIT
	instruccionAux.fields[camposInsertados].stopbit = frm_getToken(context) ;

	// check stopbit range
	var stop  = parseInt(instruccionAux.fields[camposInsertados].stopbit);
	if (stop > 32*parseInt(instruccionAux.nwords)) {
	       return frm_langError(context,
				    i18n_get_TagFor('compiler', 'STOPBIT OoR') +
				    "'" + frm_getToken(context) + "'") ;
	}

	// check overlapping
	for (i=stop; i<=start; i++)
	{
		if (typeof instruccionAux.overlapping[i] != "undefined") {
		    return frm_langError(context,
				         i18n_get_TagFor('compiler', 'OVERLAPPING FIELD') +
				         instruccionAux.fields[camposInsertados].name) ;
		}

		instruccionAux.overlapping[i] = 1;
	}

	frm_nextToken(context);
	// match mandatory )
	if (! frm_isToken(context,")")) {
		 return frm_langError(context,
				      i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
	}

	frm_nextToken(context);
	if (instruccionAux.fields[camposInsertados].type == "address")
	{
	       // match mandatory abs|rel
	       if (frm_getToken(context) !="abs" && frm_getToken(context) !="rel") {
		   return frm_langError(context,
				        i18n_get_TagFor('compiler', 'INCORRECT ADDRESSING')) ;
	       }

	       // match mandatory ADDRESS_TYPE
	       instruccionAux.fields[camposInsertados].address_type = frm_getToken(context) ;
	       frm_nextToken(context);
	}

	// match optional ,
	if (frm_isToken(context, ",")) {
	       frm_nextToken(context);
	}

       return {} ;
}

function firm_instruction_read_fixed_fields ( context, instruccionAux, xr_info, all_ones_co )
{
       var ret = {};

// li reg val {
//             *co=000000,*
//             [nwords=1,]
//             reg=reg(25,21),
//             val=imm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       frm_nextToken(context);
       // match mandatory co
       if (! frm_isToken(context,"co")) {
	     return frm_langError(context,
			          i18n_get_TagFor('compiler', 'NO CO FIELD')) ;
       }

       // read co=xxxxxx field...
       ret = firm_instruction_co_read(context, instruccionAux, xr_info, all_ones_co) ;
       if (typeof ret.error != "undefined") {
           return ret ;
       }


// li reg val {
//             co=000000,
//             *[cop=00000,]*
//             [nwords=1,]
//             reg=reg(25,21),
//             val=imm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       // match optional cop
       if (frm_isToken(context,"cop"))
       {
           ret = firm_instruction_cop_read(context, instruccionAux, all_ones_co) ;
           if (typeof ret.error != "undefined") {
               return ret ;
           }
       }

// li reg val {
//             co=000000,
//             *[nwords=1,]*
//             reg=reg(25,21),
//             val=imm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       // match optional "nwords"
       if (frm_isToken(context, "nwords"))
       {
           ret = firm_instruction_nword_read(context, instruccionAux) ;
           if (typeof ret.error != "undefined") {
               return ret ;
           }
       }

// li reg val {
//             co=000000,
//             *reg=reg(25,21),
//              val=imm(15,0),*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       var campos       = instruccionAux.fields ;
       var firma        = instruccionAux.signature ;
       var firmaUsuario = instruccionAux.signatureUser ;
       var firmaGlobal  = instruccionAux.signatureGlobal ;

       var camposInsertados = 0;
       while (camposInsertados < instruccionAux.numeroCampos)
       {
           ret = firm_instruction_field_read(context, instruccionAux, camposInsertados) ;
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
	   firmaGlobal = firmaGlobal.replace("inm" , "num"); // TODO: remove in the future
	   instruccionAux.signatureGlobal = firmaGlobal;

	   camposInsertados++;
       }

       instruccionAux.fields       = campos;
       instruccionAux.signatureRaw = firmaUsuario;

// li reg val {
//             co=000000,
//             reg=reg(25,21),
//             val=imm(15,0),
//             *[help='this instruction is used for...',]*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       // match optional help
       if (frm_isToken(context,"help"))
       {
           ret = firm_instruction_help_read(context, instruccionAux) ;
           if (typeof ret.error != "undefined") {
               return ret ;
           }
       }

// li reg val {
//             co=000000,
//             reg=reg(25,21),
//             val=imm(15,0),
//             *[native,]*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       // match optional 'native' + ','
       if (frm_isToken(context, "native"))
       {
	   instruccionAux["is_native"] = true;
	   frm_nextToken(context);

	   if (frm_isToken(context,","))
	       frm_nextToken(context);
       }

       // semantic check: valid pending value (cop.length if native.false)
       if ( (instruccionAux["is_native"]  === false) &&
	    (typeof instruccionAux.cop !== 'undefined') &&
	    (instruccionAux.cop.length !== xr_info.ir.default_eltos.cop.length) )
       {
	    return frm_langError(context,
			         i18n_get_TagFor('compiler', 'BAD COP BIN. LEN.') +
			         "'" + frm_getToken(context) + "'") ;
       }

       // return context
       context.error = null ;
       return context ;
}

function firm_instruction_read_flexible_fields ( context, instruccionAux, xr_info, all_ones_co )
{
       var ret = {};

// li reg val {
//             *co=000000,
//             [cop=00000,]
//             [nwords=1,]
//             reg=reg(25,21),
//             val=imm(15,0),
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
	       if (frm_isToken(context,"co"))
	       {
	           ret = firm_instruction_co_read(context, instruccionAux, xr_info, all_ones_co) ;
	           if (typeof ret.error != "undefined") {
		       return ret ;
	           }

                   co_inserted = 1 ;
                   continue ;
	       }

	       // match optional cop
	       if (frm_isToken(context,"cop"))
	       {
                   ret = firm_instruction_cop_read(context, instruccionAux, all_ones_co) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   continue ;
	       }

	       // match optional "nwords"
	       if (frm_isToken(context, "nwords"))
	       {
                   ret = firm_instruction_keynumber_read(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.nwords = ret.value ;
                   continue ;
	       }

	       // match optional help
	       if (frm_isToken(context,"help"))
	       {
		   ret = firm_instruction_keystring_read(context, instruccionAux) ;
		   if (typeof ret.error != "undefined") {
		       return ret ;
		   }

                   instruccionAux.help = ret.value ;
                   continue ;
	       }

	       // match optional 'native' + ','
	       if (frm_isToken(context,"native"))
	       {
		   instruccionAux["is_native"] = true;
		   frm_nextToken(context);

		   if (frm_isToken(context,","))
		       frm_nextToken(context);

                   continue ;
	       }

	       // match field...
	       {
		   ret = firm_instruction_field_read(context, instruccionAux, camposInsertados) ;
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
		   firmaGlobal = firmaGlobal.replace("inm" , "num"); // TODO: remove in the future
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
       if ( (instruccionAux["is_native"]  === false) &&
	    (typeof instruccionAux.cop !== 'undefined') &&
	    (instruccionAux.cop.length !== xr_info.ir.default_eltos.cop.length) )
       {
	    return frm_langError(context,
			         i18n_get_TagFor('compiler', 'BAD COP BIN. LEN.') +
			     "'" + frm_getToken(context) + "'") ;
       }

       // return context
       context.error = null ;
       return context ;
}

