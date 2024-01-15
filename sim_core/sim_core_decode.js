/*
 *  Copyright 2015-2024 Saul Alonso Monsalve, Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos
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

//
// Treat control sequences
//

 control_sequences = {
                        'b':  '\b',
                        'f':  '\f',
                        'n':  '\n',
                        'r':  '\r',
                        't':  '\t',
                        'v':  '\v',
                        'a':  String.fromCharCode(0x0007),
                        "'":  '\'',
                        "\"": '\"',
                        '0':  '\0'
                     } ;

function treatControlSequences ( possible_value )
{
        var ret = {} ;
        ret.string = "" ;
        ret.error  = false ;

	for (var i=0; i<possible_value.length; i++)
	{
		if ("\\" != possible_value[i]) {
                    ret.string = ret.string + possible_value[i] ;
                    continue ;
                }

                i++ ;

                if (control_sequences[possible_value[i]] === "undefined") {
		    ret.string = i18n_get_TagFor('compiler', 'UNKNOWN ESCAPE CHAR') +
                                 "Unknown escape char" +
                                 " '\\" + possible_value[i] + "'" ;
                    ret.error  = true ;
        	    return ret ;
                }

		ret.string = ret.string + control_sequences[possible_value[i]] ;
	}

        return ret ;
}

 //
 // Treat HTML sequences
 //

 var html_sequences = {
                         '&amp;':  '&',
                         '&lt;':   '<',
                         '&gt;':   '>',
                         '&quot;': '"',
                         '&#039;': "'"
                      } ;

function treatHTMLSequences ( text_with_html )
{
    var re  = null ;
    var key = null ;

    for (key in html_sequences)
    {
         re = new RegExp(key, "gi");
         text_with_html = text_with_html.replace(re, html_sequences[key]) ;
    }

    return text_with_html ;
}

