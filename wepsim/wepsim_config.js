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
     * Config screen
     */

    function wepsim_open_config_index ( )
    {
        var config_xx = ws_config ;
	var  idiom_xx = get_cfg('ws_idiom') ;

	$('#container-config2').html(table_config_html(config_xx)) ;
        for (m=0; m<config_xx.length; m++) {
	     config_xx[m].code_init() ;
        }
	$("#container-config2").scrollTop(0);
        $('a[data-toggle="popover1"]').popover({
	     placement: 'bottom',
	     trigger: 'focus, hover',
	     animation: false,
	     delay: { "show": 500, "hide": 100 }
        }) ;

	i18n_update_tags('cfg', idiom_xx) ;
	$('#config2').modal('show') ;
    }

    function wepsim_close_config ( )
    {
        $('#config2').modal('hide') ;
    }


    /*
     * Config management
     */

    function table_config_html ( config )
    {
        var o = "" ;

        var fmt_toggle    = "" ;
        var fmt_header    = "" ;
	var e_type        = "" ;
	var e_code_cfg   = "" ;
	var e_description = "" ;
	var e_id          = "" ;

        var utypes = [] ;
        for (var m=0; m<config.length; m++)
        {
	    if (false == array_includes(utypes, config[m].type)) {
	        utypes.push(config[m].type) ;
            }
        }

        o = o + '<div class="container grid-striped border border-light">' ;
        for (m=0; m<config.length; m++)
        {
	        fmt_header = "" ;
	        if (e_type != config[m].type) {
		    fmt_header = "<div class='float-none text-right text-capitalize font-weight-bold col-12 border-bottom border-secondary bg-white sticky-top'>" + 
			         "<span data-langkey='" + config[m].type + "'>" + config[m].type + "</span>" +
			         "</div>" ;
		}

		e_type        = config[m].type ;
		e_code_cfg    = config[m].code_cfg ;
		e_description = config[m].description ;
		e_id          = config[m].id ;

	        if (fmt_toggle == "")
	            fmt_toggle = "bg-light" ;
	       else fmt_toggle = "" ;

		o = o + fmt_header +
		        "<div class='row py-1 " + fmt_toggle + "' id='" + e_type + "'>" +
			'<div class="col-md-auto">' +
			'    <span class="badge badge-pill badge-light">' + (m+1) + '</span>' +
			'</div>' +
			'<div class="col-md-4">'  + e_code_cfg   + '</div>' +
			'<div class="col-md collapse7 show"><c>' + e_description + '</c></div>' +
			'</div>' ;
       }
       o = o + '</div>' ;

       return o ;
    }

    function wepsim_show_breakpoint_icon_list ()
    {
	var o = "<div class='container'>" +
	        "<div class='row'>" ;

	var prev_type = "" ;
	for (var i=0; i<breakpoint_icon_list.length; i++)
	{
		if (breakpoint_icon_list[i].type != prev_type) 
		{
                    o = o + "</div>" +
			    "<div class='row p-1'>" +
		            "<div class='float-none text-left text-capitalize font-weight-bold col-12 border-bottom border-secondary'>" + breakpoint_icon_list[i].type + "</div>" +
		            "</div>" +
		            "<div class='row'>" ;
		    prev_type = breakpoint_icon_list[i].type ;
		}

		o = o + "<img src='images/stop/stop_" + breakpoint_icon_list[i].shortname + ".gif' alt='" + breakpoint_icon_list[i].shortname + " icon' " +
		        "     class='img-thumbnail col-3 mx-2 d-block'" +
		        "     style='height:6vh; min-height:30px;'" +
		        "     onclick=\"$('#img_select1').attr('src','images/stop/stop_" + breakpoint_icon_list[i].shortname + ".gif');" +
		        "	        set_cfg('ICON_theme','" + breakpoint_icon_list[i].shortname + "'); save_cfg();\">" ;
	}
        o = o + '</div>' +
	        '<div class="row mt-2 p-1 border-top border-secondary">' +
                '<button type="button" id="close" data-role="none" ' +
                '        class="btn btn-sm btn-danger w-100 p-0" ' +
                '        onclick="$(\'#breakpointicon1\').popover(\'hide\');">Close</button>' +
	        '</div>' +
	        '</div>';

	return o ;
    }

