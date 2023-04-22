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


function firm_pseudoinstructions_read ( context )
{
	//
	// *pseudoinstructions
	// {
	//    li reg=reg num=inm { lui reg high(num) ; ori reg reg low(num) }
	// }*
	//

        // skip 'pseudoinstructions'
	nextToken(context);
	if (! isToken(context, "{")) {
	     return langError(context,
			      i18n_get_TagFor('compiler', 'OPEN BRACE NOT FOUND')) ;
	}

        // skip {
	nextToken(context);
	while (! isToken(context, "}"))
	{
		var pseudoInstructionAux = {};			
		var pseudoInitial	 = {};
		pseudoInitial.signature	 = "";
		pseudoInitial.name	 = "";
		pseudoInitial.fields	 = [];
		pseudoInitial.name	 = getToken(context);
		pseudoInitial.signature	 = pseudoInitial.signature + getToken(context) + "," ;
		nextToken(context);
		while (! isToken(context, "{"))
		{
			var pseudoFieldAux = {};
			pseudoFieldAux.name     = "" ;
			pseudoFieldAux.type     = "" ;
			pseudoFieldAux.indirect = false ;

			// *(name)*=type
			if (isToken(context, "("))
			{
			    nextToken(context);
			    pseudoFieldAux.name += getToken(context);

			    nextToken(context);
			    if (! isToken(context, ")")) {
				return langError(context,
						 i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
			    }

			    nextToken(context);
			    pseudoFieldAux.indirect = true ;
			}
			// *name*=type
			else
			{
			    pseudoFieldAux.name += getToken(context);
			    nextToken(context);
			}

			// name*=*type
			if (! isToken(context, "=")) {
			      return langError(context,
					       i18n_get_TagFor('compiler', 'EQUAL NOT FOUND') + ' (for name=type)') ;
			}

			// name=*type*
			nextToken(context);
			pseudoFieldAux.type += getToken(context).replace("num", "inm");

			switch (pseudoFieldAux.type)
			{
				case "reg":
				case "inm":
				case "addr":
				case "address":
				     break;
				default:						
				     return langError(context,
						      i18n_get_TagFor('compiler', 'INVALID PARAMETER') + pseudoFieldAux.type + '.' +
						      i18n_get_TagFor('compiler', 'ALLOWED PARAMETER')) ;
			}

			pseudoInitial.fields.push(pseudoFieldAux);

			if (pseudoFieldAux.indirect == true)
			     pseudoInitial.signature += "(" + getToken(context) + "),";
			else pseudoInitial.signature += getToken(context) + ",";

			nextToken(context);
			if (isToken(context, ",")) {
			    nextToken(context);
			}
		}

		nextToken(context);
		pseudoInitial.signature = pseudoInitial.signature.substr(0, pseudoInitial.signature.length-1).replace(/num/g,"inm");
		pseudoInstructionAux.initial = pseudoInitial;	
		var contPseudoFinish = 0;

		var pseudoFinishAux = {};
		pseudoFinishAux.signature = "";
		
		var inStart = 0;
		var cont = false;

		while (! isToken(context, "}"))
		{
			if (inStart == 0)
			{
				for (i=0; i<context.instrucciones.length; i++)
				{
					if (context.instrucciones[i].name == getToken(context)){
						cont = true;
						break;
					}	
				}
				if (!cont) {
				    return langError(context,
						     i18n_get_TagFor('compiler', 'UNDEF. INSTR.') +
						     "'" + getToken(context) + "'") ;
				}
			}

			if (getToken(context) == ";")
			     inStart = 0;
			else inStart++;

			pseudoFinishAux.signature = pseudoFinishAux.signature + getToken(context) + " ";
			nextToken(context);
		}

		pseudoInstructionAux.finish=pseudoFinishAux;
		pseudoInstructionAux.finish.signature=pseudoInstructionAux.finish.signature.replace(';','\n');
		context.pseudoInstructions.push(pseudoInstructionAux);
		nextToken(context);
	}

        // skip }
	nextToken(context);

        return {} ;
}

