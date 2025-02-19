/*
 *  Copyright 2015-2025 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve, Juan Banga Pardo
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

function frm_nextToken ( context )
{
	  var tok   = "" ;
	  var first = "" ;
	  var last  = "" ;
          var token_type = "" ;

          // skip whitespaces
          while ( ("# \t\n\r".indexOf(context.text[context.t]) != -1) && (context.t < context.text.length) )
          {
                 // # till end of line
                 if (context.text[context.t] == '#')
                 {
		     first = context.t + 1 ;
		     while ( ("\n".indexOf(context.text[context.t]) == -1) && (context.t < context.text.length) ) {
		    	      context.t++;
		     }
		     last = context.t ;

                     // store the comment but do not return it as token
                     tok = context.text.substring(first, last) ;
	             tok = tok.trim() ;
		     context.comments.push(tok) ;
                 }

                 if (context.text[context.t] == '\n')
                 {
                     context.line++;
                     context.newlines.push(context.t) ;
                 }

		 context.t++;
	  }

          // if {},()=: token, insert token
          if ( ("{},()=:|".indexOf(context.text[context.t]) != -1) && (context.t < context.text.length) )
          {
               tok = context.text[context.t] ;
               context.t++ ;
               context.tokens.push(tok) ;
               context.token_types.push("TOKEN") ;
               context.i = context.tokens.length - 1 ;
               return context ;
          }

          // read string "...." or token
          if ("\"" == context.text[context.t])
          {
		  // read until "
		  first = context.t ;
                  context.t++ ;
		  while ( ("\"".indexOf(context.text[context.t]) == -1) && (context.t < context.text.length) ) {
                         if ("\\".indexOf(context.text[context.t]) != -1) {
			     context.t++;
		         }
			 context.t++;
		  }
		  context.t++ ;
		  last = context.t ;

	          token_type = "STRING" ;
          }
          else if("'" == context.text[context.t])
          {
		  // read until '
		  first = context.t ;
                  context.t++ ;
		  while ( ("'".indexOf(context.text[context.t]) == -1) && (context.t < context.text.length) ) {
                         if ("\\".indexOf(context.text[context.t]) != -1) {
			     context.t++;
		         }
			 context.t++;
		  }
		  context.t++ ;
		  last = context.t ;

	          token_type = "STRING" ;
          }
          else
          {
		  // read until whitespaces
		  first = context.t ;
		  while ( ("{},()=:|# \t\n\r".indexOf(context.text[context.t]) == -1) && (context.t < context.text.length) ) {
			 context.t++;
		  }
		  last = context.t ;

	          token_type = "TOKEN" ;
          }

          // try to explore if a ":" is near...
          var tmp_context = context.t ;
          while ( ("# \t\n\r".indexOf(context.text[tmp_context]) != -1) && (tmp_context < context.text.length) )
	  {
			 if (context.text[tmp_context] == '#')
                         {
			     while ( ("\n".indexOf(context.text[tmp_context]) == -1) && (tmp_context < context.text.length) ) {
				      tmp_context++;
			     }
			 }
			 tmp_context++;
	  }
	  if (":" == context.text[tmp_context])
             {
		 token_type = "TAG" ;
                 context.t = tmp_context + 1 ;
             }

          // insert token
          tok = context.text.substring(first, last) ;
	  tok = tok.trim() ;
          if ("TAG" == token_type)
          {
              if (isNaN(tok))
              { // (tok != "25") -> "label:"
                   tok = tok + ":" ;
              }
              else
              { // (tok == "25") -> "25" ("25:20")
                   token_type = "NUMBER" ;
                   context.t = context.t - 1;
              }
          }

          context.tokens.push(tok) ;
          context.token_types.push(token_type) ;
          context.i = context.tokens.length - 1 ;

          return context ;
}

function frm_getToken ( context )
{
	 return context.tokens[context.i] ;
}

function frm_getTokenType ( context )
{
	 return context.token_types[context.i] ;
}

function frm_isToken ( context, text )
{
         return (frm_getToken(context) == text.trim()) ;
}

function frm_isToken_arr ( context, arr )
{
         for (var i=0; i<arr.length; i++)
         {
              if (frm_getToken(context) == arr[i].trim()) {
                  return true ;
              }
         }

         return false ;
}


/*
 *  Error handler
 */

function frm_langError ( context, msgError )
{
        // detect lines
	var line1 = 0 ;
	if (typeof  context.newlines[context.line-3] != "undefined") {
            line1 = context.newlines[context.line-3] + 1 ;
	}

	var line2 = 0 ;
	if (typeof  context.newlines[context.line-2] != "undefined") {
            line2 = context.newlines[context.line-2] + 1 ;
	}

        var lowI  = line1 ;
        var highI = line2 ;

        for (; (typeof context.text[highI+1] != "undefined") && (context.text[highI+1] != '\n'); highI++) ;
        var line3 = highI + 2 ;

        highI++;
        for (; (typeof context.text[highI+1] != "undefined") && (context.text[highI+1] != '\n'); highI++) ;
        highI = highI + 2 ;

        // print lines
        context.error = "<br>" +
                        "<pre class='border rounded p-3 bg-dark text-white'>" +
                        "...\n" ;
        for (var i=lowI; i<highI; i++)
        {
             if ((i == line1) && (i != line2)) context.error += " " + (context.line-1) + "\t" ;
             if (i == line2)                   context.error += "*" + (context.line+0) + "\t" ;
             if (i == line3)                   context.error += " " + (context.line+1) + "\t" ;

             if (typeof context.text[i] != "undefined")
                  context.error += context.text[i] ;
             else context.error += "&lt;EOF&gt;" ;
        }
        context.error += "\n...\n" +
                         "</pre>" +
                         "(*) " + i18n_get_TagFor('compiler', 'PROBLEM AROUND LINE') + " " +
			 context.line + ": <br>" + msgError + ".<br>" ;

        simcore_ga('cc', 'cc.err', 'cc.err.' + msgError) ;

        return context;
}

function frm_getLabelContext ( context )
{
        return { t: context.t, line: context.line, newlines: context.newlines.slice() } ;
}

function frm_setLabelContext ( context, labelContext )
{
        context.t = labelContext.t ;
        context.line = labelContext.line ;
        context.newlines = labelContext.newlines ;
}

function frm_getComments ( context )
{
        return context.comments.join('\n') ;
}

function frm_resetComments ( context )
{
        context.comments = [] ;
}


/*
 *  Native
 */

// TODO: add some checking of this code before running (like an anti-virus)

function frm_nextNative ( context )
{
	 var first = context.t ;
	 var last  = context.t ;

	 // to detect blocks inside blocks -> { if () {} }
	 var braces = 1 ;
	 while ( (context.t < context.text.length) && (braces != 0) )
	 {
	     if ('{' == context.text[context.t])
		  braces++ ;
	     if ('}' == context.text[context.t])
		  braces-- ;

             if (context.text[context.t] == '\n')
             {
                 context.line++;
                 context.newlines.push(context.t) ;
             }

	     context.t++;
	 }
	 last = context.t - 1 ;

	 // store the comment but do not return it as token
	 var tok  = context.text.substring(first, last) ;

         context.tokens.push(tok) ;
         context.token_types.push("NATIVE") ;
         context.i = context.tokens.length - 1 ;

         return context ;
}

