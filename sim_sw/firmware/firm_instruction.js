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


function firm_instruction_write ( context, elto, labels_firm )
{
	var o = "" ;
        var j = 0 ;
        var k = 0 ;

        // no firmware -> return empty section
	if (typeof elto == "undefined") {
            return o ;
        }

        // signature { ...
	o += elto.name + ' ' ;
        if (typeof elto.fields != "undefined")
        {
            for (var k=0; k<elto.fields.length; k++)
            {
	       if (elto.fields[k].indirect)
	            o += '(' + elto.fields[k].name + ') ' ;
	       else o += elto.fields[k].name + ' ' ;
            }
        }
        if ( (elto.name == "begin") && (elto.is_native) ) {
            o += "\n\tnative,\n" ;
        }
	o += " {" + '\n';

	// nwords = ...
	if (typeof elto.nwords != "undefined") {
	    o += '\t' + "nwords=" + elto.nwords + "," + '\n';
	}

	// fields...
	if (context.metadata.version == 2)
	{
	     o += firm_fields_v2_write(elto.fields_all) ;
	}
	else // version == 1
	{
	     // co = ...
	     if (typeof elto.co != "undefined") {
	         o += '\t' +"co=" + elto.co + "," + '\n';
	     }

	     // cop = ...
	     if (typeof elto.cop != "undefined") {
	         o += '\t' +"cop=" + elto.cop + "," + '\n';
	     }

	     o += firm_fields_v1_write(elto.fields) ;
	}
        if ( (elto.name != "begin") && (elto.is_native) ) {
            o += "\tnative,\n" ;
	}

	// microcode...
        o += firm_mcode_write(elto, labels_firm) ;

        // end instruction as string...
	o += '\n}\n\n';

        // return string
	return o ;
}


function firm_instruction_read ( context, xr_info, all_ones_co, all_ones_oc )
{
       var ret = {};

// *li reg val {*
//             co=000000,
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       var instruccionAux = {};
       instruccionAux.name         = frm_getToken(context) ;
       instruccionAux["mc-start"]  = context.contadorMC ;
       instruccionAux.nwords       = 1 ;
       instruccionAux.is_native    = false ;
       instruccionAux.help         = '' ;
       instruccionAux.overlapping  = {} ;
       instruccionAux.numeroCampos = 0 ;
       instruccionAux.fields       = [] ;
       instruccionAux.fields_all   = [] ;
       instruccionAux.fields_eoc   = [] ; // v2
       instruccionAux.fields_funct = [] ; // firmware+assembly version 1, just in case don't remove please !!

       // semantic check: valid instruction name
       var re_name = "[a-zA-Z_0-9\.]*" ;
       if (instruccionAux.name.match(re_name)[0] != instruccionAux.name) {
	   return frm_langError(context,
			        i18n_get_TagFor('compiler', 'INS. NAME') +
			        "'" + instruccionAux.name + "' " +
			        i18n_get_TagFor('compiler', 'NOT VALID FOR') + re_name) ;
       }

       var firma = "";
       var firmaGlobal= "";
       var firmaUsuario= "";

       firma = frm_getToken(context)  + ',';
       firmaUsuario = frm_getToken(context) + " ";
       frm_nextToken(context);

       // match optional ,
       while (frm_isToken(context, ',')) {
	      frm_nextToken(context);
       }

       while (! frm_isToken(context,"{"))
       {
	   // match optional ,
	   while (frm_isToken(context, ','))
		  frm_nextToken(context);

	   var plus_found = false;

	   // match optional FIELD
	   if ( !frm_isToken(context, ",") && !frm_isToken(context, "(") && !frm_isToken(context, ")") )
	   {
	       var campoAux = {};
	       var auxValue = frm_getToken(context);

	       if (auxValue[auxValue.length-1] == "+")
	       {
		   auxValue = auxValue.substring(0,auxValue.length-1);
		   plus_found = true;
	       }

	       campoAux.name = auxValue ;
               campoAux.indirect = false ;
	       instruccionAux.fields.push(campoAux);
	       instruccionAux.numeroCampos++;
	       firma = firma + auxValue ;
	       firmaUsuario = firmaUsuario + auxValue;
	       frm_nextToken(context);

	       if (instruccionAux.numeroCampos > 100) {
		   return frm_langError(context,
				        i18n_get_TagFor('compiler', 'MORE 100 FIELDS')) ;
	       }
	       if (auxValue == "co") {
		   return frm_langError(context,
				        i18n_get_TagFor('compiler', 'CO AS FIELD NAME')) ;
	       }
	       if (auxValue == "nwords") {
		   return frm_langError(context,
				        i18n_get_TagFor('compiler', 'NW AS FIELD NAME')) ;
	       }
	   }

	   // match optional "(" FIELD ")"
	   if (frm_isToken(context, "("))
	   {
		   firma = firma + ',(';

		   // next line needs concatenate '+' otherwise saveFirmware is not going to work!
		   if (plus_found)
			firmaUsuario = firmaUsuario + '+(';
		   else	firmaUsuario = firmaUsuario + ' (';

		   frm_nextToken(context);

		   if ( !frm_isToken(context, ",") && !frm_isToken(context, "(") && !frm_isToken(context, ")") )
		   {
		       var campoAux = {};
		       campoAux.name = frm_getToken(context) ;
                       campoAux.indirect = true ;
		       instruccionAux.fields.push(campoAux);
		       instruccionAux.numeroCampos++;

		       firma = firma + frm_getToken(context) ;
		       firmaUsuario = firmaUsuario + frm_getToken(context);

		       frm_nextToken(context);
		   }
		   else
		   {
		       return frm_langError(context,
					    i18n_get_TagFor('compiler', 'MISSING TOKEN ON') +
					    "'" + context.co_cop[instruccionAux.co].signature + "'") ;
		   }

		   if (frm_isToken(context,")"))
		   {
			firma = firma + ')';
			firmaUsuario = firmaUsuario + ')';

			frm_nextToken(context);
		   }
		   else
		   {
		       return frm_langError(context,
					    i18n_get_TagFor('compiler', 'MISSING ) ON') +
					    "'" + context.co_cop[instruccionAux.co].signature + "'") ;
		   }
	   }

	   firma = firma + ',';
	   firmaUsuario = firmaUsuario + ' ';
       }

       firma = firma.substr(0, firma.length-1);
       firma = firma.replace(/,,/g, ",") ;
       firmaUsuario = firmaUsuario.substr(0, firmaUsuario.length-1);
       firmaUsuario = firmaUsuario.replace(/  /g, " ") ;
       instruccionAux.signature       = firma;
       instruccionAux.signatureGlobal = firma;
       instruccionAux.signatureUser   = firmaUsuario;
       instruccionAux.signatureRaw    = firmaUsuario;


// li reg val {
//             *co=000000,
//             [cop=00000,]
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             [help='this instruction is used for...',]
//             [native,]*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       if (2 == context.metadata.version) {
           ret = firm_instruction_read_fields_v2(context, instruccionAux, xr_info, all_ones_oc) ;
       }
       else {
           ret = firm_instruction_read_flexible_fields(context, instruccionAux, xr_info, all_ones_co) ;
        // ret = firm_instruction_read_fixed_fields   (context, instruccionAux, xr_info, all_ones_co) ;
       }
       if (ret.error != null) {
           return ret ;
       }


// li reg val {
//             co=000000,
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             *{
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }*
// }

	   ret = {} ;
	   if (true == instruccionAux.is_native)
		ret = read_native(context) ;
	   else ret = firm_mcode_signals_read(context) ;

	   if (typeof ret.error != "undefined") {
	       return ret ;
           }

       instruccionAux.NATIVE        = ret.NATIVE ;
       instruccionAux.microcode     = ret.microprograma ;
       instruccionAux.microcomments = ret.microcomments ;
       context.instrucciones.push(instruccionAux);

       context.contadorMC = context.contadorMC + 9; // padding between instrucctions

// li reg val {
//             co=000000,
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// *}*

       if (! frm_isToken(context,"}")) {
	   return frm_langError(context,
			        i18n_get_TagFor('compiler', 'CLOSE BRACE NOT FOUND')) ;
       }

       frm_nextToken(context);

       return {} ;
}

