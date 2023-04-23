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


function firm_instruction_read_v2 ( context, xr_info, all_ones_co )
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
       instruccionAux.name        = getToken(context) ;
       instruccionAux["mc-start"] = context.contadorMC ;
       instruccionAux.nwords      = 1 ;
       instruccionAux.is_native   = false;
       instruccionAux.help        = '' ;
       instruccionAux.overlapping = {};

       // semantic check: valid instruction name
       var re_name = "[a-zA-Z_0-9\.]*" ;
       if (instruccionAux.name.match(re_name)[0] != instruccionAux.name) {
	   return langError(context,
			    i18n_get_TagFor('compiler', 'INS. NAME') +
			    "'" + instruccionAux.name + "' " +
			    i18n_get_TagFor('compiler', 'NOT VALID FOR') + re_name) ;
       }

       var firma = "";
       var firmaGlobal= "";
       var firmaUsuario= "";
       var numeroCampos = 0;
       var campos = [];

       firma = getToken(context)  + ',';
       firmaUsuario = getToken(context) + " ";
       nextToken(context);

       // match optional ,
       while (isToken(context, ','))
	      nextToken(context);

       while (! isToken(context,"{"))
       {
	   // match optional ,
	   while (isToken(context, ','))
		  nextToken(context);

	   var plus_found = false;

	   // match optional FIELD
	   if ( !isToken(context, ",") && !isToken(context, "(") && !isToken(context, ")") )
	   {
	       var campoAux = {};
	       var auxValue = getToken(context);
	
	       if (auxValue[auxValue.length-1] == "+")
	       {
		   auxValue = auxValue.substring(0,auxValue.length-1);
		   plus_found = true;
	       }

	       campoAux.name = auxValue ;
	       campos.push(campoAux);
	       numeroCampos++;
	       firma = firma + auxValue ;
	       firmaUsuario = firmaUsuario + auxValue;
	       nextToken(context);

	       if (numeroCampos > 100) {
		   return langError(context,
				    i18n_get_TagFor('compiler', 'MORE 100 FIELDS')) ;
	       }
	       if (auxValue == "co") {
		   return langError(context,
				    i18n_get_TagFor('compiler', 'CO AS FIELD NAME')) ;
	       }
	       if (auxValue == "nwords") {
		   return langError(context,
				    i18n_get_TagFor('compiler', 'NW AS FIELD NAME')) ;
	       }
	   }

	   // match optional "(" FIELD ")"
	   if (isToken(context, "("))
	   {
		   firma = firma + ',(';

		   if (plus_found)
			// next line needs concatenate '+' otherwise saveFirmware is not going to work!
			firmaUsuario = firmaUsuario + '+(';
		   else	firmaUsuario = firmaUsuario + ' (';

		   nextToken(context);

		   if ( !isToken(context, ",") && !isToken(context, "(") && !isToken(context, ")") )
		   {
		       var campoAux = {};
		       campoAux.name = getToken(context) ;
		       campos.push(campoAux);
		       numeroCampos++;

		       firma = firma + getToken(context) ;
		       firmaUsuario = firmaUsuario + getToken(context);			

		       nextToken(context);
		   }
		   else
		   {
		       return langError(context,
					i18n_get_TagFor('compiler', 'MISSING TOKEN ON') +
					"'" + context.co_cop[instruccionAux.co].signature + "'") ;
		   }

		   if (isToken(context,")"))
		   {
			firma = firma + ')';
			firmaUsuario = firmaUsuario + ')';

			nextToken(context);
		   }
		   else
		   {
		       return langError(context,
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
//             *co=000000,*
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       // read co=xxxxxx field...
       ret = firm_instruction_co_read(context, instruccionAux, xr_info, all_ones_co) ;
       if (typeof ret.error != "undefined") {
           return ret ;     
       }    

       // overlapping mask (initialized with 'co' field)
       for (i=26; i<=31; i++) {
	    instruccionAux.overlapping[i] = 1;
       }


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

       // match optional cop
       if (isToken(context,"cop"))
       {
           ret = firm_instruction_cop_read(context, instruccionAux) ;
           if (typeof ret.error != "undefined") {
               return ret ;     
           }    
       }

// li reg val {
//             co=000000,
//             *[nwords=1,]*
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       // match optional "nwords"
       if (isToken(context, "nwords"))
       {
           ret = firm_instruction_nword_read(context, instruccionAux) ;
           if (typeof ret.error != "undefined") {
               return ret ;     
           }    
       }

// li reg val {
//             co=000000,
//             nwords=1,
//             *reg=reg(25,21),
//              val=inm(15,0),*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       var camposInsertados = 0;
       while (camposInsertados < numeroCampos)
       {
           ret = firm_instruction_field_read_v1(context, instruccionAux, campos, camposInsertados) ;
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

       instruccionAux.fields = campos;

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
       if (isToken(context,"help"))
       {
           ret = firm_instruction_help_read(context, instruccionAux) ;
           if (typeof ret.error != "undefined") {
               return ret ;     
           }    
       }

// li reg val {
//             co=000000,
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             *[native,]*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

       // match optional 'native' + ','
       if (isToken(context, "native"))
       {
	   instruccionAux["is_native"] = true;
	   nextToken(context);

	   if (isToken(context,","))
	       nextToken(context);
       }

       // semantic check: valid pending value (cop.length if native.false)
       if ( (instruccionAux["is_native"]  === false) &&
	    (typeof instruccionAux.cop !== 'undefined') &&
	    (instruccionAux.cop.length !== xr_info.ir.default_eltos.cop.length) )
       {
	    return langError(context,
			     i18n_get_TagFor('compiler', 'BAD COP BIN. LEN.') +
			     "'" + getToken(context) + "'") ;
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

	   if (typeof ret.error != "undefined")
	       return ret ;

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

       if (! isToken(context,"}")) {
	   return langError(context,
			    i18n_get_TagFor('compiler', 'CLOSE BRACE NOT FOUND')) ;
       }

       nextToken(context);

       return {} ;
}

