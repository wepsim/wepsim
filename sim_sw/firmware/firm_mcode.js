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

function firm_mcode_signals_read ( context )
{
	   // {
	   //           (TA, R, BW=11, C1=1),
	   //    etiq:  (T2, C0),
	   //           (A0, B=0, C=0)
	   // }

           var microprograma = [];
           var microcomments = [];
           resetComments(context) ;

	   // match mandatory {
	   if (! isToken(context, "{") ) {
                 return langError(context,
                                  i18n_get_TagFor('compiler', 'OPEN BRACE NOT FOUND')) ;
           }

           nextToken(context) ;
	   while (! isToken(context, "}") )
	   {
	       var microInstruccionAux = {};

	       // match optional etiq:
	       if (! isToken(context, "(") )
	       {
	           // match mandatory LABEL
		   var newLabelName = getToken(context) ;
                       newLabelName = newLabelName.substring(0, newLabelName.length-1) ; // remove the ending ':'

		   if ("TAG" != getTokenType(context)) {
                        return langError(context,
                                         i18n_get_TagFor('compiler', 'LABEL NOT FOUND') +
                                         "'" + newLabelName + "'") ;
                   }

	           // semantic check: existing LABEL
		   for (var contadorMCAux in context.etiquetas)
		   {
			if (context.etiquetas[contadorMCAux] == newLabelName) {
                            return langError(context,
                                             i18n_get_TagFor('compiler', 'REPEATED LABEL') +
                                             "'" + getToken(context) + "'") ;
                        }
		   }
		   context.etiquetas[context.contadorMC] = newLabelName ;

                   // semantic check: valid token
                   if (newLabelName.match("[a-zA-Z_0-9]*")[0] != newLabelName ) {
                       return langError(context,
                                        i18n_get_TagFor('compiler', 'INVALID LABEL FORMAT') +
                                        "'" + getToken(context) + "'") ;
                   }

                   nextToken(context) ;
	       }

	       // match mandatory (
	       if (! isToken(context, "(") ) {
                     return langError(context,
                                      i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
               }

               nextToken(context) ;
	       while (! isToken(context, ")") )
	       {
		   // match mandatory SIGNAL
		   var nombre_tok = getToken(context).toUpperCase();

		   if (nombre_tok == "MADDR")
		   {
                        nextToken(context) ;
			// match mandatory =
			if (! isToken(context, "=") ) {
                            return langError(context,
                                             i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
                        }

                        nextToken(context) ;
			// match mandatory VALUE
			var labelsNotFoundAux={};
			labelsNotFoundAux.nombre = getToken(context) ;
			labelsNotFoundAux.cycle  = microprograma.length;
			labelsNotFoundAux.index  = context.i;
			labelsNotFoundAux.instruction = context.instrucciones.length;

			var etiquetaFounded = 0;
			for (var k in context.etiquetas)
			{
				if ( isToken(context, context.etiquetas[k]) )
				{
					microInstruccionAux[nombre_tok] = k.toString();
					etiquetaFounded = 1;
				}
			}

			if (etiquetaFounded == 0) {
			    context.labelsNotFound.push(labelsNotFoundAux);
			}

                        nextToken(context) ;
			// match optional ,
			if ( isToken(context, ",") )
                             nextToken(context) ;

			continue ;
		   }

                   // semantic check: valid signal id
		   if (typeof simhw_sim_signal(nombre_tok) == "undefined") {
                       return langError(context,
                                        i18n_get_TagFor('compiler', 'SIGNAL NOT EXISTS') +
                                        "'" + nombre_tok + "'") ;
                   }

                   // semantic check: signal id can be used
		   if (typeof simhw_sim_signal(nombre_tok).forbidden != "undefined") {
                       return langError(context,
                                        nombre_tok + ' ' + i18n_get_TagFor('compiler', 'SIGNAL NO DIRECTLY')) ;
                   }

		   microInstruccionAux[nombre_tok] = 1; // signal is active so far...

                   nextToken(context) ;
		   // match optional =
		   if ( isToken(context, "=") )
		   {
                        nextToken(context) ;
			// match mandatory VALUE
			microInstruccionAux[nombre_tok] = parseInt(getToken(context) , 2);

                        // semantic check: valid value
                        if (getToken(context).match("[01]*")[0] != getToken(context)) {
                            return langError(context,
                                             i18n_get_TagFor('compiler', 'INCORRECT BIN. FORMAT') +
                                             "'" + getToken(context) + "'") ;
                        }

                        // semantic check: value within range
		        if (microInstruccionAux[nombre_tok] >= Math.pow(2, simhw_sim_signal(nombre_tok).nbits)) {
                            return langError(context,
                                             i18n_get_TagFor('compiler', 'OUT OF RANGE') +
                                             "'" + getToken(context) + "'") ;
                        }

                        nextToken(context) ;
		   }

		   // match optional ,
		   if ( isToken(context, ",") ) {
                        nextToken(context) ;
                   }
	       }

               var acc_cmt = getComments(context) ;
               microcomments.push(acc_cmt);
               resetComments(context) ;

	       microprograma.push(microInstruccionAux);
	       context.contadorMC++;

               nextToken(context) ;
	       if ( isToken(context, ",") )
                    nextToken(context) ;
	   }

           // semantic check: empty microcode is not valid
	   if (microprograma.length === 0) {
	       return langError(context,
			        i18n_get_TagFor('compiler', 'EMPTY MICROCODE')) ;
           }

	   // match mandatory }
           nextToken(context) ;

           return { 
                    'NATIVE':        '',
                    'microprograma': microprograma,
                    'microcomments': microcomments
                  } ;
}

function read_native ( context )
{
           var microprograma = [];
           var microcomments = [];

	   // match mandatory {
	   if (! isToken(context, "{") ) {
                 return langError(context,
                                  i18n_get_TagFor('compiler', 'OPEN BRACE NOT FOUND')) ;
           }

	   // read the rest...
	   nextNative(context) ;
	   var native_code = getToken(context) ;

	   microprograma.push({}) ;
           microcomments.push('') ;

	   // match mandatory }
           nextToken(context) ;

           return { 
                    'NATIVE':        native_code,
                    'microprograma': microprograma,
                    'microcomments': microcomments
                  } ;
}


