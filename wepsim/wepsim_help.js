/*
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
	    if (false == array_includes(utypes, helps[m].u_type)) {
	         utypes.push(helps[m].u_type) ;
            }
        }

        o = o + '<div class="container grid-striped border border-light">' ;
       for (m=0; m<helps.length; m++)
       {
	        fmt_header = "" ;
	        if (e_utype != helps[m].u_type)
		    fmt_header = "<div class='float-none text-right text-capitalize font-weight-bold col-12 border-bottom border-secondary bg-white sticky-top'>" + 
			         helps[m].u_type + 
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
			'    <span class="badge badge-pill badge-light">' + (m+1) + '</span>' +
			'</div>' +
			'<div class="col-md-4">' +
			'    <span class="bg-success text-white" style="cursor:pointer;" ' +
			'          onclick="' + onclick_code + '">' + e_title + '</span>' +
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
        var helpdiv = '#iframe_help1' ;
        var rel     = $('#help1_ref').data('relative') ;

        var helpurl = '' ;
	var seg_idiom = get_cfg('ws_idiom') ;
	var seg_hardw = simhw_active().sim_short_name ;

        if ( (typeof rel != "undefined") && (rel != "") )
        {
             helpurl = 'help/simulator-' + seg_idiom + '.html' ;
	     $('#help1').modal('show');
             resolve_html_url(helpdiv, helpurl, rel, function() { }) ;

             ga('send', 'event', 'help', 'help.simulator', 'help.simulator.' + rel);

             return ;
        }

        var ab1 = $('#help1_ref').data('absolute') ;
        if ( (typeof ab1 != "undefined") && (ab1 != "") )
        {
             helpurl = 'examples/hardware/' + seg_hardw + '/help/' + 
		       ab1 + '-' + seg_idiom + '.html' ;
	     $('#help1').modal('show');
             resolve_html_url(helpdiv, helpurl, '', function() { }) ;

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

	$('#help1_ref').data('relative','') ;
	$('#help1_ref').data('absolute','') ;
	$('#help1_ref').data('code','false') ;

      //$('#help1').trigger('updatelayout') ;
	$('#help1').modal('show') ;
    }

    function wepsim_open_help_content ( content )
    {
        $('#iframe_help1').html(content) ;

        $('#help1_ref').data('relative', '') ;
	$('#help1_ref').data('absolute', '') ;
	$('#help1_ref').data('code','true') ;

      //$('#help1').trigger('updatelayout') ;
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

