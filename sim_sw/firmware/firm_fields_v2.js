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


function firm_instruction_co_read_v2 ( context, instruccionAux, xr_info, all_ones_co )
{

// li reg val {
//             ...
//             *co=000000,*
//             ...
// }

       nextToken(context);
       // match mandatory =
       if (! isToken(context,"=")) {
	     return langError(context,
			      i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       nextToken(context);
       // match mandatory CO
       instruccionAux.co = getToken(context) ;

       nextToken(context);
       // match optional ,
       if (isToken(context,",")) {
	   nextToken(context);
       }

       // semantic check: valid value
       if ( (instruccionAux.co.match("[01]*")[0] != instruccionAux.co) ||
	    (instruccionAux.co.length !== xr_info.ir.default_eltos.co.length) )
       {
	   return langError(context,
			    i18n_get_TagFor('compiler', 'INCORRECT CO BIN.') +
			    "'" + instruccionAux.co + "'") ;
       }

       // semantic check: 'co' is not already used
       if (instruccionAux.co != all_ones_co)
       {
	   if ( (typeof context.co_cop[instruccionAux.co] !== "undefined") &&
		       (context.co_cop[instruccionAux.co].cop === null) )
	   {
		 return langError(context,
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
       stop  = 26 ;
       start = 31 ;
       for (i=stop; i<=start; i++)
       {
		if (typeof instruccionAux.overlapping[i] != "undefined") {
		    return langError(context,
				     i18n_get_TagFor('compiler', 'OVERLAPPING FIELD') + 
				     campos[camposInsertados].name) ;
		}

		instruccionAux.overlapping[i] = 1;
       }

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

function firm_instruction_field_read_v2 ( context, instruccionAux, campos, camposInsertados )
{
	// match mandatory FIELD
	var tmp_name = getToken(context) ;
	if (campos[camposInsertados].name != tmp_name) {
	       return langError(context,
				i18n_get_TagFor('compiler', 'UNEXPECTED FIELD') +
				"'" + tmp_name + "'. " +
				i18n_get_TagFor('compiler', 'CHECK ORDER')) ;
	}

	nextToken(context);
	// match mandatory =
	if (! isToken(context,"=")) {
	       return langError(context,
				i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
	}

	nextToken(context);
	// match mandatory reg|inm|address
	if ( !isToken_arr(context, ["reg", "inm", "address"]) ) {
		return langError(context, "Incorrect type of field (reg, inm or address)") ;
	}

	campos[camposInsertados].type = getToken(context) ;

	nextToken(context);
	// match mandatory (
	if (! isToken(context,"(")) {
		 return langError(context,
				  i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
	}

	nextToken(context);
	// match mandatory START_BIT
	campos[camposInsertados].startbit = getToken(context) ;

	// check startbit range
	var start = parseInt(campos[camposInsertados].startbit);
	if (start > 32*parseInt(instruccionAux.nwords)-1) {
	       return langError(context,
				i18n_get_TagFor('compiler', 'STARTBIT OoR') +
				"'" + getToken(context) + "'") ;
	}

	nextToken(context);
	// match mandatory ,
	if (! isToken(context,",")) {
		 return langError(context,
				  i18n_get_TagFor('compiler', 'COMMA NOT FOUND')) ;
	}

	nextToken(context);
	// match mandatory STOP_BIT
	campos[camposInsertados].stopbit = getToken(context) ;

	// check stopbit range
	var stop  = parseInt(campos[camposInsertados].stopbit);
	if (stop > 32*parseInt(instruccionAux.nwords)) {
	       return langError(context,
				i18n_get_TagFor('compiler', 'STOPBIT OoR') +
				"'" + getToken(context) + "'") ;
	}

	// check overlapping
	for (i=stop; i<=start; i++)
	{
		if (typeof instruccionAux.overlapping[i] != "undefined") {
		    return langError(context,
				     i18n_get_TagFor('compiler', 'OVERLAPPING FIELD') + 
				     campos[camposInsertados].name) ;
		}

		instruccionAux.overlapping[i] = 1;
	}

	nextToken(context);
	// match mandatory )
	if (! isToken(context,")")) {
		 return langError(context,
				  i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
	}

	nextToken(context);
	if (campos[camposInsertados].type == "address")
	{
	       // match mandatory abs|rel
	       if (getToken(context) !="abs" && getToken(context) !="rel") {
		   return langError(context,
				    i18n_get_TagFor('compiler', 'INCORRECT ADDRESSING')) ;
	       }

	       // match mandatory ADDRESS_TYPE
	       campos[camposInsertados].address_type = getToken(context) ;
	       nextToken(context);
	}

	// match optional ,
	if (isToken(context, ",")) {
	       nextToken(context);
	}

       return {} ;
}

