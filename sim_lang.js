/*      
 *  Copyright 2015 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda
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
 *  Token management
 */

function nextToken ( context )
{
          // skip whitespaces
          while ( ("# \t\n\r".indexOf(context.text[context.t]) != -1) && (context.t < context.text.length) )
          {
                 // # till end of line
                 if (context.text[context.t] == '#') {
		     while ( ("\n".indexOf(context.text[context.t]) == -1) && (context.t < context.text.length) ) {
		    	      context.t++;
		     }
                 }

                 if (context.text[context.t] == '\n') {
                     context.line++;
                     context.newlines.push(context.t) ;
                 }

		 context.t++;
	  }
	  
          // if {},()=: token, insert token
          if ( ("{},()=:".indexOf(context.text[context.t]) != -1) && (context.t < context.text.length) )
          {
               var tok = context.text[context.t] ;
               context.t++ ;
               context.tokens.push(tok) ;
               context.i = context.tokens.length - 1 ;
               return context ;
          }

          // read until whitespaces
          var first = context.t ;
          while ( ("{},()=:# \t\n\r".indexOf(context.text[context.t]) == -1) && (context.t < context.text.length) ) {
		 context.t++;
	  }
          var last = context.t ;

          // insert token
          var tok  = context.text.substring(first, last) ;
	  tok = tok.toLowerCase().trim() ;
          context.tokens.push(tok) ;
          context.i = context.tokens.length - 1 ;
          return context ;
}

function getToken ( context )
{
	 return context.tokens[context.i] ;
}

function isToken ( context, text )
{
         return (getToken(context) == text.trim()) ;
}

