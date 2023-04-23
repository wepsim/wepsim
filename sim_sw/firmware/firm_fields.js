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


function firm_instruction_nword_read ( context, instruccionAux )
{

// li reg val {
//             co=000000,
//             *[nwords=1,]*
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       nextToken(context);
       // match mandatory =
       if (! isToken(context,"=")) {
	   return langError(context,
			    i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       nextToken(context);
       // match mandatory NWORDS
       instruccionAux.nwords = getToken(context) ;

       nextToken(context);
       // match optional ,
       if (isToken(context,",")) {
	   nextToken(context);
       }

       return {} ;
}

function firm_instruction_help_read ( context, instruccionAux )
{

// li reg val {
//             co=000000,
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             *[help='this instruction is used for...',]*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       // match optional help
       nextToken(context);
       // match mandatory =
       if (! isToken(context,"=")) {
	     return langError(context,
			      i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       nextToken(context);
       // match mandatory HELP value
       instruccionAux.help = getToken(context) ;

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

       return {} ;
}

function firm_instruction_co_read ( context, instruccionAux, xr_info, all_ones_co )
{

// li reg val {
//             *co=000000,*
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       nextToken(context);
       // match mandatory co
       if (! isToken(context,"co")) {
	     return langError(context,
			      i18n_get_TagFor('compiler', 'NO CO FIELD')) ;
       }

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


       return {} ;
}

function firm_instruction_cop_read ( context, instruccionAux )
{

// li reg val {
//             co=000000,
//             *[cop=0000,]*
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       nextToken(context);
       // match mandatory =
       if (! isToken(context,"=")) {
	     return langError(context,
			      i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
       }

       nextToken(context);
       // match mandatory COP value
       instruccionAux.cop = getToken(context) ;

       nextToken(context);
       // match optional ,
       if (isToken(context,",")) {
	   nextToken(context);
       }

	// semantic check: valid value
	if (instruccionAux.cop.match("[01]*")[0] != instruccionAux.cop) {
	    return langError(context,
			     i18n_get_TagFor('compiler', 'INCORRECT COP BIN.') +
			     "'" + instruccionAux.cop + "'") ;
	}

	// semantic check: 'co+cop' is not already used
	if (        (context.co_cop[instruccionAux.co].cop != null) &&
	     (typeof context.co_cop[instruccionAux.co].cop[instruccionAux.cop] != "undefined") )
	{
	      return langError(context,
			       i18n_get_TagFor('compiler', 'CO+COP ALREADY USED') +
			       "'" + context.co_cop[instruccionAux.co].cop[instruccionAux.cop] + "'") ;
	}
	if (context.co_cop[instruccionAux.co].cop == null)
	    context.co_cop[instruccionAux.co].cop = {};
	    context.co_cop[instruccionAux.co].cop[instruccionAux.cop] = instruccionAux.signature ;

       return {} ;
}

function firm_instruction_field_read_v1 ( context, instruccionAux, campos, camposInsertados )
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

