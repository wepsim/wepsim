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


    /*
     * Help
     */

    function wepsim_help_set ( type, ref )
    {
	    $('#help1_ref').attr('components', type + ':' + ref) ;

            // add if recording
            simcore_record_append_new('Update help content',
	       	                      'wepsim_help_set("' + type + '", "' + ref + '");\n') ;
    }


    /*
     * Help URI
     */

    function request_html_url ( r_url )
    {
        var robj = null ;

	if (false === is_mobile())
        {
            if (navigator.onLine)
                 robj = fetch(r_url);
            else robj = caches.match(r_url).then() ;
        }
        else
        {
            robj = $.ajax(r_url, { type: 'GET', dataType: 'html' }) ;
        }

        return robj ;
    }

    function update_div_frompartialhtml ( helpdiv, key, data )
    {
		var default_content = '<br>Sorry, No more details available for this element.<p>\n' ;

		if ("" === data)
		     $(helpdiv).html(default_content) ;
		else $(helpdiv).html(data) ;

		if ( ("" === data) || ("" === key) || ("#" === key) ) {
                     return ;
		}

                // (key != "") && (data != "")
		var help_content = $(helpdiv).filter(key).html() ;
		if (typeof help_content === "undefined") {
		    help_content = $(helpdiv).find(key).html() ;
		}
		if (typeof help_content === "undefined") {
		    help_content = default_content ;
		}

		$(helpdiv).html(help_content) ;
    }

    function resolve_html_url ( helpdiv, r_url, key, update_div )
    {
        return request_html_url(r_url).then(function (data) {
		    if (typeof data == "object") {
			 data.text().then(function(res) {
                                             update_div_frompartialhtml(helpdiv, key, res);
                                             update_div() ;
                                          }) ;
                    }
		    else {
                         update_div_frompartialhtml(helpdiv, key, data) ;
                         update_div() ;
                    }
	       }) ;
    }

    function update_signal_loadhelp ( helpdiv, simhw, key )
    {
	 var curr_idiom = get_cfg('ws_idiom') ;

	 var help_base = 'repo/hardware/' + simhw + '/help/signals-' + curr_idiom + '.html' ;
         resolve_html_url(helpdiv, help_base, '#'+key, function() { $(helpdiv).trigger('create') ; }) ;

         simcore_ga('help', 'help.signal', 'help.signal.' + simhw + '.' + key);
    }

    function update_checker_loadhelp ( helpdiv, key )
    {
         var curr_idiom = get_cfg('ws_idiom') ;
  	 var help_base = 'help/simulator-' + curr_idiom + '.html' ;

         resolve_html_url(helpdiv, help_base, '#'+key, function() { $(helpdiv).trigger('create') ; }) ;

         simcore_ga('help', 'help.checker', 'help.checker.' + key);
    }

