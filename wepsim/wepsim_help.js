/*
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

        var utypes = [] ;
        for (var m=0; m<helps.length; m++)
        {
	    if (!utypes.includes(helps[m].u_type))
	         utypes.push(helps[m].u_type) ;
        }

        o = o + '<div class="container grid-striped">' ;
       for (m=0; m<helps.length; m++)
       {
	        fmt_header = "" ;
	        if (e_utype != helps[m].u_type)
		    fmt_header = "<div class='row'>" + 
			         "<div class='float-none text-right text-capitalize font-weight-bold col-12 border-bottom border-secondary'>" + helps[m].u_type + "</div>" + 
			         "</div>" ;

		e_title       = helps[m].title ;
		e_itype       = helps[m].i_type ;
		e_utype       = helps[m].u_type ;
		e_reference   = helps[m].reference ;
		e_description = helps[m].description ;
		e_id          = helps[m].id ;

		var onclick_code = "" ;
		if ("relative" == e_itype) 
		    onclick_code = 'wepsim_help_set_relative(\'' + e_reference + '\');' + 
				   'wepsim_help_refresh();' ;
		if ("absolute" == e_itype) 
		    onclick_code = 'wepsim_help_set_absolute(\'' + e_reference + '\');' + 
				   'wepsim_help_refresh();' ;
		if ("code" == e_itype) 
		    onclick_code = e_reference ;

	        if (fmt_toggle == "")
	            fmt_toggle = "bg-light" ;
	       else fmt_toggle = "" ;

		o = o + fmt_header +
		        "<div class='row py-1 " + fmt_toggle + "' id='" + e_utype + "'>" +
			'<div class="col-md-auto">' +
			'    <span class="badge badge-pill badge-light">' + m + '</span>' +
			'</div>' +
			'<div class="col-md-4">' +
			'    <span class="bg-success text-white" style="cursor:pointer;" ' +
			'          onclick="' + onclick_code + '">' + e_title + '</span>' +
			'</div>' +
			'<div class="col-md">' +
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
        var rel = $('#help1_ref').data('relative') ;
        if ( (typeof rel != "undefined") && (rel != "") )
        {
            $('#iframe_help1').load('help/simulator-' + get_cfg('ws_idiom') + '.html ' + rel,
	    		            function() {
                                        $('#help1').trigger('updatelayout');
                                        $('#help1').modal('show');
                                    });

            ga('send', 'event', 'help', 'help.simulator', 'help.simulator.' + rel);
            return ;
        }

        var ab1 = $('#help1_ref').data('absolute') ;
        if ( (typeof ab1 != "undefined") && (ab1 != "") )
        {
            $('#iframe_help1').load('help/' + ab1 + '-' + get_cfg('ws_idiom') + '.html',
	    		            function() {
                                        $('#help1').trigger('updatelayout');
                                        $('#help1').modal('show');
                                    });

            ga('send', 'event', 'help', 'help.' + ab1, 'help.' + ab1 + '.*');
            return ;
        }

        var cod1 = $('#help1_ref').data('code') ;
        if ( (typeof cod1 != "undefined") && (cod1 == "true") )
        {
            ga('send', 'event', 'help', 'help.code', 'help.code.*');
            return ;
        }

        wepsim_open_help_index() ;
    }

    function wepsim_open_help_index ( )
    {
        var help_xx = help[get_cfg('ws_idiom')] ;

	$('#iframe_help1').html(table_helps_html(help_xx)) ;
	$('#iframe_help1').enhanceWithin() ;

	$('#help1_ref').data('relative','') ;
	$('#help1_ref').data('absolute','') ;
	$('#help1_ref').data('code','false') ;

	$('#help1').trigger('updatelayout') ;
	$('#help1').modal('show') ;
    }

    function wepsim_open_help_content ( content )
    {
        $('#iframe_help1').html(content) ;
        $('#iframe_help1').enhanceWithin() ;

        $('#help1_ref').data('relative', '') ;
	$('#help1_ref').data('absolute', '') ;
	$('#help1_ref').data('code','true') ;

        $('#help1').trigger('updatelayout') ;
        $('#help1').modal('show') ;
    }

    function wepsim_close_help ( )
    {
	$('#help1').modal('hide') ;
    }

    function wepsim_help_set_relative ( rel )
    {
        $('#help1_ref').data('relative', rel) ;
	$('#help1_ref').data('absolute','') ;
	$('#help1_ref').data('code','false') ;
    }

    function wepsim_help_set_absolute ( ab1 )
    {
        $('#help1_ref').data('relative','') ;
        $('#help1_ref').data('absolute', ab1) ;
	$('#help1_ref').data('code','false') ;
    }

    function update_checker_loadhelp ( helpdiv, key )
    {
	var help_base = 'help/simulator-' + get_cfg('ws_idiom') + '.html #' + key;
	$(helpdiv).load(help_base,
			      function(response, status, xhr) {
				  if ( $(helpdiv).html() == "" )
				       $(helpdiv).html('<br>Sorry, there is no more details.<p>\n');

				  $(helpdiv).trigger('create');
			      });

        ga('send', 'event', 'help', 'help.checker', 'help.checker.' + key);
    }

