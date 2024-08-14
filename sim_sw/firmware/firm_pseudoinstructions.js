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


function firm_pseudoinstructions_write ( context )
{
	var o = "" ;
        var elto = null ;
        var ie_inst = "" ;

        // no pseudo -> return empty section
	if (typeof context.pseudoInstructions == "undefined") {
            return o ;
        }
	if (0 == context.pseudoInstructions.length) {
            return o ;
        }

        // return pseudo as string...
	o += '\n' +
	     'pseudoinstructions\n' +
	     '{' ;
	for (var ie=0; ie<context.pseudoInstructions.length; ie++)
	{
             elto = context.pseudoInstructions[ie] ;

             // li rd=reg, expression=imm
	     o += '\n' ;
             if (
                  (typeof elto.initial      != "undefined") &&
                  (typeof elto.initial.name != "undefined")
                )
             {
                 o += '\t' + elto.initial.name + ' ' ;
                 for (var k=0; k<elto.initial.fields.length; k++)
                 {
                      o += elto.initial.fields[k].name + '=' + elto.initial.fields[k].type ;

                      if (k != (elto.initial.fields.length-1)) {
                          o += ', ' ;
                      }
                 }
             }

             // { instruction-1 ... }
             o += " {" + '\n';

	     ie_inst = elto.finish.source.split('\n') ;
	     for (var ie_i=0; ie_i<ie_inst.length; ie_i++)
             {
		  o += '\t\t' + ie_inst[ie_i].trim() ;

                  if (ie_i != (ie_inst.length-1)) {
                      o += ' ;' ;
                  }
                  o += '\n' ;
	     }

	     o += '\t}\n' ;
	}
	o += '}\n' ;

        // return string
	return o ;
}


function firm_pseudoinstructions_read ( context )
{
	var tok = '' ;

        // speedup instruction name search using a hash table
        var hash_inst_name = {} ;
        for (i=0; i<context.instrucciones.length; i++) {
             hash_inst_name[context.instrucciones[i].name] = context.instrucciones[i].name ;
        }

	//
	// *pseudoinstructions
	// {
	//    li reg=reg num=imm { lui reg high(num) ; ori reg reg low(num) }
	// }*
	//

        // skip 'pseudoinstructions'
	frm_nextToken(context);
	if (! frm_isToken(context, "{")) {
	     return frm_langError(context,
			          i18n_get_TagFor('compiler', 'OPEN BRACE NOT FOUND')) ;
	}

        // skip {
	frm_nextToken(context);
	while (! frm_isToken(context, "}"))
	{
		var pseudoInstructionAux = {} ;
		var pseudoInitial	 = {} ;
		pseudoInitial.signature	 = "" ;
		pseudoInitial.name	 = "" ;
		pseudoInitial.fields	 = [] ;
		pseudoInitial.name	 = frm_getToken(context) ;
		pseudoInitial.signature	 = pseudoInitial.signature + frm_getToken(context) + "," ;

		frm_nextToken(context);
		while (! frm_isToken(context, "{"))
		{
			var pseudoFieldAux = {};
			pseudoFieldAux.name     = "" ;
			pseudoFieldAux.type     = "" ;
			pseudoFieldAux.indirect = false ;

			// *(name)*=type
			if (frm_isToken(context, "("))
			{
			    frm_nextToken(context);
			    pseudoFieldAux.name += frm_getToken(context);

			    frm_nextToken(context);
			    if (! frm_isToken(context, ")")) {
				return frm_langError(context,
						     i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
			    }

			    frm_nextToken(context);
			    pseudoFieldAux.indirect = true ;
			}
			// *name*=type
			else
			{
			    pseudoFieldAux.name += frm_getToken(context);
			    frm_nextToken(context);
			}

			// name*=*type
			if (! frm_isToken(context, "=")) {
			      return frm_langError(context,
					           i18n_get_TagFor('compiler', 'EQUAL NOT FOUND') + ' (for name=type)') ;
			}

			// name=*type*
			frm_nextToken(context);
			pseudoFieldAux.type += frm_getToken(context).replace("num", "imm");

                        if (["reg", "inm", "imm", "addr", "address"].includes(pseudoFieldAux.type) == false) {
			    return frm_langError(context,
					         i18n_get_TagFor('compiler', 'INVALID PARAMETER') +
                                                 pseudoFieldAux.type + '.' +
					         i18n_get_TagFor('compiler', 'ALLOWED PARAMETER')) ;
                        }

			pseudoInitial.fields.push(pseudoFieldAux);

			if (pseudoFieldAux.indirect == true)
			     pseudoInitial.signature += "(" + frm_getToken(context) + "),";
			else pseudoInitial.signature += frm_getToken(context) + ",";

			frm_nextToken(context);
			if (frm_isToken(context, ",")) {
			    frm_nextToken(context);
			}
		}

		frm_nextToken(context);
		pseudoInitial.signature = pseudoInitial.signature.substr(0, pseudoInitial.signature.length-1).replace(/num/g,"imm");
		pseudoInstructionAux.initial = pseudoInitial;

                // new ".finish" field in "pseudo" element
		var pseudoFinishAux = {} ;
		pseudoFinishAux.signature = "" ;
		pseudoFinishAux.source    = "" ;

                // read ".finish" field...
		var inStart = 0 ;
		while (! frm_isToken(context, "}"))
		{
		        tok = frm_getToken(context) ;

			if (inStart == 0)
			{
                            if (typeof hash_inst_name[tok] == "undefined") {
				return frm_langError(context,
						     i18n_get_TagFor('compiler', 'UNDEF. INSTR.') +
						     "'" + tok + "'") ;
			    }
			}

			if (tok == ";")
			     inStart = 0 ;
			else inStart++ ;

			pseudoFinishAux.signature = pseudoFinishAux.signature + tok + " " ;
			pseudoFinishAux.source    = pseudoFinishAux.source    + tok + " " ;

			frm_nextToken(context) ;
		}

		pseudoInstructionAux.finish = pseudoFinishAux ;
		pseudoInstructionAux.finish.signature = pseudoInstructionAux.finish.signature.replace(';', ' ') ;
		pseudoInstructionAux.finish.source    = pseudoInstructionAux.finish.source.replace(';',    '\n') ;
		context.pseudoInstructions.push(pseudoInstructionAux) ;
		frm_nextToken(context) ;
	}

        // skip }
	frm_nextToken(context);

        // return context
        context.error = null ;
        return context ;
}


