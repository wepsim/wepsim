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


function firm_begin_read ( context )
{
	// *begin {
	//            (XX, Y, BW=11),
	//     fetch: (X2, X0),
	//            (A0, B=0, C=0)
	// }*

	var instruccionAux = {};
	instruccionAux.name         = frm_getToken(context) ;
	instruccionAux["mc-start"]  = context.contadorMC ;
	instruccionAux["is_native"] = false;

        // skip 'begin'
	frm_nextToken(context);

	// match optional ,
	if (frm_isToken(context,",")) {
	    frm_nextToken(context);
	}

	// match optional native
	if (frm_isToken(context, "native"))
	{
	    instruccionAux["is_native"] = true;
	    frm_nextToken(context);

	    // match optional ,
	    if (frm_isToken(context,",")) {
		frm_nextToken(context);
            }

	    // add 'fetch' label
	    context.etiquetas[context.contadorMC] = "fetch" ;
	}

	if (true == instruccionAux.is_native)
	     ret = read_native(context) ;
	else ret = firm_mcode_signals_read(context) ;

	if (typeof ret.error != "undefined") {
	    return ret ;
        }

	instruccionAux.signature       = "begin" ;
	instruccionAux.signatureGlobal = "begin" ;
	instruccionAux.signatureUser   = "begin" ;
	instruccionAux.signatureRaw    = "begin" ;
	instruccionAux.NATIVE          = ret.NATIVE ;
	instruccionAux.microcode       = ret.microprograma ;
	instruccionAux.microcomments   = ret.microcomments ;
	context.instrucciones.push(instruccionAux);

	context.contadorMC = context.contadorMC + 9; // padding between instrucctions

        return {} ;
}

