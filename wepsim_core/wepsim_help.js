/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
     * Help management
     */

    function table_helps_html ( helps )
    {
        var o = "" ;

        var fmt_toggle    = "" ;
        var fmt_header    = "" ;
	var e_title       = "" ;
	var e_itype       = "" ;
	var e_utype       = "" ;
	var e_reference   = "" ;
	var e_description = "" ;
	var e_id          = "" ;
	var t_index       = "" ;

        var utypes = [] ;
        for (var m=0; m<helps.length; m++)
        {
	    if (false === array_includes(utypes, helps[m].u_type)) {
	         utypes.push(helps[m].u_type) ;
            }
        }

        o = o + '<div class="container grid-striped border border-light">' ;
       for (m=0; m<helps.length; m++)
       {
	        fmt_header = "" ;
	        if (e_utype != helps[m].u_type) {
		    fmt_header = "<div class='float-none text-right text-capitalize font-weight-bold col-12 border-bottom border-secondary bg-white sticky-top'>" +
			         helps[m].u_type +
			         "</div>" ;
		}

		e_title       = helps[m].title ;
		e_itype       = helps[m].i_type ;
		e_utype       = helps[m].u_type ;
		e_uclass      = helps[m].u_class ;
		e_reference   = helps[m].reference ;
		e_description = helps[m].description ;
		e_id          = helps[m].id ;

		var onclick_code = "" ;
		if ("relative" === e_itype)
		    onclick_code = 'wepsim_help_set_relative(\'' + e_reference + '\');' +
				   'wepsim_help_refresh();' ;
		if ("absolute" === e_itype)
		    onclick_code = 'wepsim_help_set_absolute(\'' + e_reference + '\');' +
				   'wepsim_help_refresh();' ;
		if ("code" === e_itype)
		    onclick_code = e_reference ;

	        if (fmt_toggle === "")
	            fmt_toggle = "bg-light" ;
	       else fmt_toggle = "" ;

	        t_index   = (m+1).toString().padStart(2, ' ').replace(/ /g, '&nbsp;') ;

		o = o + fmt_header +
		        "<div class='row py-1 " + fmt_toggle + " " + e_uclass + "' id='" + e_utype + "'>" +
			'<div class="col-md-auto">' +
			'    <span class="badge badge-pill badge-light">' + t_index + '</span>' +
			'</div>' +
			'<div class="col-md-4">' +
			'    <span class="btn-like bg-success text-white text-truncate rounded border px-1" ' +
                        '          style="cursor:pointer;" ' +
			'          id="help_index_' + m + '" ' +
                        '          data-langkey="' + e_title + '" ' +
		        '          onclick="simcore_record_append_pending(); ' +
                                            onclick_code + ' ; ' +
                        '                   return false;">' +
                             e_title + '</span>' +
			'</div>' +
			'<div class="col-md collapse7 show">' +
			'    <c>' + e_description + '</c>' +
			'</div>' +
			'</div>' ;
       }
       o = o + '</div>' ;

       return o ;
    }


    /*
     * Help
     */

    function wepsim_help_refresh ( )
    {
        // add if recording
        simcore_record_append_new('Refresh help content',
	       	                  'wepsim_help_refresh();\n') ;

        // scrolling
        var helpdiv = '#scroller-help1' ;
        var scrolltothetop = function() {
        		        var helpdiv_container = 'scroller-help1' ;
				var elto = document.getElementById(helpdiv_container) ;
				if (elto != null)
				    elto.scrollTop = 0 ;
                             } ;

        // content
        var helpurl = '' ;
	var seg_idiom = get_cfg('ws_idiom') ;
	var seg_hardw = simhw_active().sim_short_name ;

        var rel = $('#help1_ref').data('relative') ;
        if ( (typeof rel != "undefined") && (rel != "") )
        {
             var r = rel.split("#") ;
             helpurl = 'help/' + r[0] + '-' + seg_idiom + '.html' ;
             resolve_html_url(helpdiv, helpurl, '#' + r[1], scrolltothetop) ;

             ga('send', 'event', 'help', 'help.simulator', 'help.simulator.' + rel) ;

             return ;
        }

        var ab1 = $('#help1_ref').data('absolute') ;
        if ( (typeof ab1 != "undefined") && (ab1 != "") )
        {
             helpurl = 'examples/hardware/' + seg_hardw + '/help/' +
		       ab1 + '-' + seg_idiom + '.html' ;
             resolve_html_url(helpdiv, helpurl, '', scrolltothetop) ;

            ga('send', 'event', 'help', 'help.' + ab1, 'help.' + ab1 + '.*') ;

            return ;
        }

        var cod1 = $('#help1_ref').data('code') ;
        if ( (typeof cod1 != "undefined") && (cod1 === "true") )
        {
            ga('send', 'event', 'help', 'help.code', 'help.code.*') ;
            return ;
        }

        // empty rel -> show index
        if ( (typeof rel != "undefined") && (rel == "") )
        {
	     var html_index = table_helps_html(ws_help) ;
	     $(helpdiv).html(html_index) ;

             ga('send', 'event', 'help', 'help.index', 'help.index') ;

             return ;
        }
    }

    function wepsim_help_set_relative ( rel )
    {
        $('#help1_ref').data('relative', rel) ;
	$('#help1_ref').data('absolute','') ;
	$('#help1_ref').data('code','false') ;

        // add if recording
        simcore_record_append_new('Update help content',
	       	                  'wepsim_help_set_relative("' + rel + '");\n') ;
    }

    function wepsim_help_set_absolute ( ab1 )
    {
        $('#help1_ref').data('relative','') ;
        $('#help1_ref').data('absolute', ab1) ;
	$('#help1_ref').data('code','false') ;

        // add if recording
        simcore_record_append_new('Update help content',
	       	                  'wepsim_help_set_absolute("' + ab1 + '");\n') ;
    }

    function wepsim_open_help_content ( content )
    {
        $('#scroller-help1').html(content) ;

        $('#help1_ref').data('relative', '') ;
	$('#help1_ref').data('absolute', '') ;
	$('#help1_ref').data('code','true') ;
    }

    function wepsim_open_help_hardware_summary ( )
    {
            var ahw2 = simhw_active().sim_short_name ;
	    var img2 = 'examples/hardware/' + ahw2 + '/images/cpu.svg?time=20190102' ;
	    var lyr2 =  '<object id=svg_p2 ' +
			'        data=\'' + img2 + '\' ' +
			'        type=\'image/svg+xml\'>' +
			'Your browser does not support SVG' +
			'</object>' ;

	    wepsim_open_help_content(lyr2) ;

            // add if recording
            simcore_record_append_new('Open hardware summary',
		                      'wepsim_open_help_hardware_summary();\n') ;
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

	 var help_base = 'examples/hardware/' + simhw + '/help/signals-' + curr_idiom + '.html' ;
         resolve_html_url(helpdiv, help_base, '#'+key, function() { $(helpdiv).trigger('create') ; }) ;

         ga('send', 'event', 'help', 'help.signal', 'help.signal.' + simhw + '.' + key);
    }

    function update_checker_loadhelp ( helpdiv, key )
    {
         var curr_idiom = get_cfg('ws_idiom') ;
  	 var help_base = 'help/simulator-' + curr_idiom + '.html' ;

         resolve_html_url(helpdiv, help_base, '#'+key, function() { $(helpdiv).trigger('create') ; }) ;

         ga('send', 'event', 'help', 'help.checker', 'help.checker.' + key);
    }

