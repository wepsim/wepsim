/*
 *  Copyright 2015-2025 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


function firm_registers_write ( context )
{
	var o = "" ;

        // no registers -> return empty section
	if (typeof context.registers == "undefined") {
            return o ;
        }
	if (0 == context.registers.length) {
            return o ;
        }

        // return registers as string...
	for (m=0; m< context.registers.length; m++)
	{
             // skip empty register file sections
             if (0 == context.registers[m].registers.length) {
                 continue ;
             }

	     o += 'registers ' + context.registers[m].name + '\n' +
		  '{\n' ;
	     for (i=0; i< context.registers[m].registers.length; i++)
	     {
		     if (typeof context.registers[m].registers[i] == "undefined") {
			 continue ;
		     }

		     var l = context.registers[m].registers[i].length - 1 ;
		     var r = "(" ;
		     for (j=0; j<l; j++) {
			  r += context.registers[m].registers[i][j] + ", " ;
		     }
		     r += context.registers[m].registers[i][l] + ")" ;

                     // To decide if skip stackRegister or check if current register is the stack_pointer
		     if (null == context.stackRegister) {
			 continue ;
		     }

		     if ( (context.stackRegister.rf_name == context.registers[m].name) &&
		          (context.stackRegister.r_name  == i) )
			  o += '\t' + i + "=" + r + " (stack_pointer)," + '\n' ;
		     else o += '\t' + i + "=" + r + "," + '\n' ;
	     }
	     o  = o.substr(0, o.length-2) ;
	     o += '\n' +
	          '}\n' ;
        }

        // return string
	return o ;
}


function firm_find_rf_by_name ( context, rf_name )
{
	for (var i=0; i<context.registers.length; i++)
	{
             if (context.registers[i].name == rf_name) {
                 return i ;
             }
	}

        return -1 ;
}

function firm_registers_read ( context )
{
	// *registers [register file name]
	// {*
        //    0=(zero, x0),
        //    1=(ra,   x1),
        //    2=(sp,   x2) (stack_pointer)
	// }

       var rf_item = null ;
       var rf_name = "default" ;

       // skip 'registers'
       frm_nextToken(context) ;

       // optional 'name' (or 'default' if none is used)
       if (! frm_isToken(context, "{")) {
	   rf_name = frm_getToken(context) ;
           frm_nextToken(context) ;
       }

       // check '{' and skip '{'
       if (! frm_isToken(context, "{")) {
	     return frm_langError(context,
			          i18n_get_TagFor('compiler', 'OPEN BRACE NOT FOUND')) ;
       }
       frm_nextToken(context) ;

       // find 'name' to use it or add a new one
       var rfi = firm_find_rf_by_name(context, rf_name) ;
       if (-1 == rfi) {
           rf_item = { name:"default", registers:[] } ;
           context.registers.push(rf_item) ;
       }
       else {
           rf_item = context.registers[rfi] ;
       }

       // while not '}'
       while (! frm_isToken(context, "}"))
       {
           //   *1=*ra,
           //   *1=*(ra, x1),
	   var nombre_reg = frm_getToken(context) ;

	   frm_nextToken(context) ;
	   if (! frm_isToken(context, "=")) {
		 return frm_langError(context,
				      i18n_get_TagFor('compiler', 'EQUAL NOT FOUND')) ;
	   }

           //   1=*ra*,
           //   1=*(*ra, x1),
	   frm_nextToken(context) ;
	   if (! frm_isToken(context, "(")) {
		 rf_item.registers[nombre_reg] = [] ;
		 rf_item.registers[nombre_reg].push(frm_getToken(context)) ;
	   }
	   else
	   {
		 frm_nextToken(context) ;
		 if (frm_isToken(context, ")")) {
		     return frm_langError(context,
				          i18n_get_TagFor('compiler', 'EMPTY NAME LIST')) ;
		 }

                 // 1=(ra*, x1*),
		 rf_item.registers[nombre_reg] = [] ;
		 while (! frm_isToken(context, ")"))
		 {
		       rf_item.registers[nombre_reg].push(frm_getToken(context)) ;

		       frm_nextToken(context) ;
		       if (frm_isToken(context,",")) {
			   frm_nextToken(context);
		       }
		 }
	   }

           //  2=(sp, x2) *(stack_pointer)*
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

	        context.stackRegister = {} ;
	        context.stackRegister.rf_name = rf_item.name ;
	        context.stackRegister.r_name  = nombre_reg ;

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

