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


function firm_registers_read ( context )
{
	// *registers
	// {
	//    0=$zero,
	//    30=$fp,
	//    31=$ra
	// }*

       // skip 'registers'
       frm_nextToken(context) ;
       if (! frm_isToken(context, "{")) {
	     return frm_langError(context,
			          i18n_get_TagFor('compiler', 'OPEN BRACE NOT FOUND')) ;
       }

       // skip {
       frm_nextToken(context) ;
       while (! frm_isToken(context, "}"))
       {
	   var nombre_reg = frm_getToken(context) ;

	   frm_nextToken(context) ;
	   if (! frm_isToken(context, "=")) {
		 return frm_langError(context,
				      i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
	   }

	   frm_nextToken(context) ;
	   if (! frm_isToken(context, "(")) {
		 // context.registers[nombre_reg] = frm_getToken(context) ;
		 context.registers[nombre_reg] = [] ;
		 context.registers[nombre_reg].push(frm_getToken(context)) ;
	   }
	   else
	   {
		 frm_nextToken(context) ;
		 if (frm_isToken(context, ")")) {
		     return frm_langError(context,
				          i18n_get_TagFor('compiler', 'EMPTY NAME LIST')) ;
		 }

		 context.registers[nombre_reg] = [] ;
		 while (! frm_isToken(context, ")"))
		 {
		       context.registers[nombre_reg].push(frm_getToken(context)) ;

		       frm_nextToken(context) ;
		       if (frm_isToken(context,",")) {
			   frm_nextToken(context);
		       }
		 }
	   }

	   frm_nextToken(context) ;
	   if (frm_isToken(context, "("))
	   {
		if (context.stackRegister != null) {
		    return frm_langError(context,
				         i18n_get_TagFor('compiler', 'DUPLICATE SP')) ;
		}

		frm_nextToken(context);
		if (! frm_isToken(context, "stack_pointer")) {
		    return frm_langError(context,
				         i18n_get_TagFor('compiler', 'NO SP')) ;
		}

		context.stackRegister = nombre_reg;

		frm_nextToken(context);
		if (! frm_isToken(context, ")")) {
		    return frm_langError(context,
				         i18n_get_TagFor('compiler', 'CLOSE PAREN. NOT FOUND')) ;
		}

		frm_nextToken(context);
	   }
	
	   if (frm_isToken(context,",")) {
	       frm_nextToken(context);
	   }
       }

       // skip }
       frm_nextToken(context);

       return {} ;
}

