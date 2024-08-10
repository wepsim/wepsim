/*
 *  Copyright 2015-2024 Saul Alonso Monsalve, Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos, Juan Banga Pardo
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


/* jshint esversion: 9 */


function wsasm_src2mem ( datosCU, asm_source, options )
{
     var context = null ;
     var ret = {
                  error: i18n_get_TagFor('compiler', 'UNKNOWN 2')
               } ;

     try
     {
         context = wsasm_prepare_context(datosCU, options) ;
	 if (context.error != null) {
	     return context;
	 }

         context = wsasm_prepare_source(context, asm_source) ;
	 if (context.error != null) {
	     return context;
	 }

         ret = wsasm_src2obj(context) ;
	 if (ret.error != null) {
	     return ret;
	 }

         ret = wsasm_obj2mem(ret) ;
	 if (ret.error != null) {
	     return ret;
	 }
     }
     catch (e)
     {
         console.log("ERROR on 'wsasm_src2mem' function :-(") ;
         console.log("Details:\n " + e) ;
         console.log("Stack:\n"    + e.stack) ;

	 ret.error = "Compilation error found !<br>" +
                     "Please review your assembly code and try another way to write your algorithm.<br>" +
                     "<br>" +
                     e.toString() ;
     }

     return ret ;
}

function wsasm_src2src ( datosCU, text, options )
{
     var context = null ;
     var ret = {
                  error: i18n_get_TagFor('compiler', 'UNKNOWN 2')
               } ;

     try
     {
         context = wsasm_prepare_context(datosCU, {}) ;
	 if (context.error != null) {
	     return context;
	 }

         context = wsasm_prepare_source(context, text) ;
	 if (context.error != null) {
	     return context;
	 }

         ret = wsasm_src2obj(context) ;
	 if (ret.error != null) {
	     return ret;
	 }

         ret = wsasm_obj2src(context, ret, options) ;
	 if (ret.error != null) {
	     return ret;
	 }
     }
     catch (e)
     {
         console.log("ERROR on 'wsasm_src2src' function :-(") ;
         console.log("Details:\n " + e) ;
         console.log("Stack:\n"    + e.stack) ;

	 ret.error = "Compilation error found !<br>" +
                     "Please review your assembly code and try another way to write your algorithm.<br>" +
                     "<br>" +
                     e.toString() ;
     }

     return ret ;
}

function wsasm_src2binsrc ( datosCU, text, options )
{
     var context = null ;
     var ret = {
                  error: i18n_get_TagFor('compiler', 'UNKNOWN 2')
               } ;

     try
     {
         context = wsasm_prepare_context(datosCU, {}) ;
	 if (context.error != null) {
	     return context;
	 }

         context = wsasm_prepare_source(context, text) ;
	 if (context.error != null) {
	     return context;
	 }

         ret = wsasm_src2obj(context) ;
	 if (ret.error != null) {
	     return ret;
	 }

         ret = wsasm_obj2bin(context, ret) ;
	 if (ret.error != null) {
	     return ret;
	 }
     }
     catch (e)
     {
         console.log("ERROR on 'wsasm_src2binsrc' function :-(") ;
         console.log("Details:\n " + e) ;
         console.log("Stack:\n"    + e.stack) ;

	 ret.error = "Compilation error found !<br>" +
                     "Please review your assembly code and try another way to write your algorithm.<br>" +
                     "<br>" +
                     e.toString() ;
     }

     return ret ;
}


