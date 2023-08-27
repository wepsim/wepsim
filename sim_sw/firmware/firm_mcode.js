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
           frm_resetComments(context) ;

	   // match mandatory {
	   if (! frm_isToken(context, "{") ) {
                 return frm_langError(context,
                                      i18n_get_TagFor('compiler', 'OPEN BRACE NOT FOUND')) ;
           }

           frm_nextToken(context) ;
	   while (! frm_isToken(context, "}") )
	   {
	       var microInstruccionAux = {};

	       // match optional etiq:
	       if (! frm_isToken(context, "(") )
	       {
	           // match mandatory LABEL
		   var newLabelName = frm_getToken(context) ;
                       newLabelName = newLabelName.substring(0, newLabelName.length-1) ; // remove the ending ':'

		   if ("TAG" != frm_getTokenType(context)) {
                        return frm_langError(context,
                                             i18n_get_TagFor('compiler', 'LABEL NOT FOUND') +
                                             "'" + newLabelName + "'") ;
                   }

	           // semantic check: existing LABEL
		   for (var contadorMCAux in context.etiquetas)
		   {
			if (context.etiquetas[contadorMCAux] == newLabelName) {
                            return frm_langError(context,
                                                 i18n_get_TagFor('compiler', 'REPEATED LABEL') +
                                                 "'" + frm_getToken(context) + "'") ;
                        }
		   }
		   context.etiquetas[context.contadorMC] = newLabelName ;

                   // semantic check: valid token
                   if (newLabelName.match("[a-zA-Z_0-9]*")[0] != newLabelName ) {
                       return frm_langError(context,
                                            i18n_get_TagFor('compiler', 'INVALID LABEL FORMAT') +
                                            "'" + frm_getToken(context) + "'") ;
                   }

                   frm_nextToken(context) ;
	       }

	       // match mandatory (
	       if (! frm_isToken(context, "(") ) {
                     return frm_langError(context,
                                          i18n_get_TagFor('compiler', 'OPEN PAREN. NOT FOUND')) ;
               }

               frm_nextToken(context) ;
	       while (! frm_isToken(context, ")") )
	       {
		   // match mandatory SIGNAL
		   var nombre_tok = frm_getToken(context).toUpperCase();

		   if (nombre_tok == "MADDR")
		   {
                        frm_nextToken(context) ;
			// match mandatory =
			if (! frm_isToken(context, "=") ) {
                            return frm_langError(context,
                                                 i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
                        }

                        frm_nextToken(context) ;
			// match mandatory VALUE
			var labelsNotFoundAux={};
			labelsNotFoundAux.nombre = frm_getToken(context) ;
			labelsNotFoundAux.cycle  = microprograma.length;
			labelsNotFoundAux.index  = context.i;
			labelsNotFoundAux.instruction = context.instrucciones.length;

			var etiquetaFounded = 0;
			for (var k in context.etiquetas)
			{
				if ( frm_isToken(context, context.etiquetas[k]) )
				{
					microInstruccionAux[nombre_tok] = k.toString();
					etiquetaFounded = 1;
				}
			}

			if (etiquetaFounded == 0) {
			    context.labelsNotFound.push(labelsNotFoundAux);
			}

                        frm_nextToken(context) ;
			// match optional ,
			if ( frm_isToken(context, ",") )
                             frm_nextToken(context) ;

			continue ;
		   }

                   // semantic check: valid signal id
		   if (typeof simhw_sim_signal(nombre_tok) == "undefined") {
                       return frm_langError(context,
                                            i18n_get_TagFor('compiler', 'SIGNAL NOT EXISTS') +
                                            "'" + nombre_tok + "'") ;
                   }

                   // semantic check: signal id can be used
		   if (typeof simhw_sim_signal(nombre_tok).forbidden != "undefined") {
                       return frm_langError(context,
                                            nombre_tok + ' ' + i18n_get_TagFor('compiler', 'SIGNAL NO DIRECTLY')) ;
                   }

		   microInstruccionAux[nombre_tok] = 1; // signal is active so far...

                   frm_nextToken(context) ;
		   // match optional =
		   if ( frm_isToken(context, "=") )
		   {
                        frm_nextToken(context) ;
			// match mandatory VALUE
			microInstruccionAux[nombre_tok] = parseInt(frm_getToken(context) , 2);

                        // semantic check: valid value
                        if (frm_getToken(context).match("[01]*")[0] != frm_getToken(context)) {
                            return frm_langError(context,
                                                 i18n_get_TagFor('compiler', 'INCORRECT BIN. FORMAT') +
                                                 "'" + frm_getToken(context) + "'") ;
                        }

                        // semantic check: value within range
		        if (microInstruccionAux[nombre_tok] >= Math.pow(2, simhw_sim_signal(nombre_tok).nbits)) {
                            return frm_langError(context,
                                                 i18n_get_TagFor('compiler', 'OUT OF RANGE') +
                                                 "'" + frm_getToken(context) + "'") ;
                        }

                        frm_nextToken(context) ;
		   }

		   // match optional ,
		   if ( frm_isToken(context, ",") ) {
                        frm_nextToken(context) ;
                   }
	       }

               var acc_cmt = frm_getComments(context) ;
               microcomments.push(acc_cmt);
               frm_resetComments(context) ;

	       microprograma.push(microInstruccionAux);
	       context.contadorMC++;

               frm_nextToken(context) ;
	       if ( frm_isToken(context, ",") )
                    frm_nextToken(context) ;
	   }

           // semantic check: empty microcode is not valid
	   if (microprograma.length === 0) {
	       return frm_langError(context,
			            i18n_get_TagFor('compiler', 'EMPTY MICROCODE')) ;
           }

	   // match mandatory }
           frm_nextToken(context) ;

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
	   if (! frm_isToken(context, "{") ) {
                 return frm_langError(context,
                                      i18n_get_TagFor('compiler', 'OPEN BRACE NOT FOUND')) ;
           }

	   // read the rest...
	   frm_nextNative(context) ;
	   var native_code = frm_getToken(context) ;

	   microprograma.push({}) ;
           microcomments.push('') ;

	   // match mandatory }
           frm_nextToken(context) ;

           return {
                    'NATIVE':        native_code,
                    'microprograma': microprograma,
                    'microcomments': microcomments
                  } ;
}


