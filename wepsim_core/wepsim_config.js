/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
     * Config management
     */

    function wepsim_show_breakpoint_icon_list ( )
    {
	var o = "<div class='container' style='max-height:65vh; overflow:auto; -webkit-overflow-scrolling:touch;'>" +
	        "<div class='row'>" ;

	var prev_type = "" ;
	for (var elto in ws_info.breakpoint_icon_list)
	{
		if (ws_info.breakpoint_icon_list[elto].type != prev_type)
		{
                    o = o + "</div>" +
			    "<div class='row p-1'>" +
		            "<div class='float-none text-left text-capitalize font-weight-bold col-12 border-bottom border-secondary'>" + ws_info.breakpoint_icon_list[elto].type + "</div>" +
		            "</div>" +
		            "<div class='row'>" ;
		    prev_type = ws_info.breakpoint_icon_list[elto].type ;
		}

		o = o + "<img src='images/stop/stop_" + elto + ".gif' alt='" + elto + " icon' " +
		        "     class='img-thumbnail col-3 mx-2 d-block " + ws_info.breakpoint_icon_list[elto].addclass + "'" +
		        "     style='height:6vh; min-height:30px;'" +
		        "     onclick=\"$('#img_select1').attr('src',        'images/stop/stop_" + elto + ".gif');" +
		        "               $('#img_select1').attr('class',      '" + ws_info.breakpoint_icon_list[elto].addclass + "');" +
		        "               $('#img_select1').attr('data-theme', '');" +
		        "	        set_cfg('ICON_theme','" + elto + "'); save_cfg();" +
                        "               $('#breakpointicon1').popover('hide');" +
                        "               wepsim_uicfg_apply();\">" ;
	}

        o = o + '</div>' +
	        '</div>';

	return o ;
    }

    function wepsim_show_breakpoint_icon_template ( )
    {
	var o = '<div class="popover" role="tooltip">' +
		'<div class="arrow"></div><h3 class="popover-header"></h3>' +
		'<div class="popover-body"></div>' +
		'<div class="popover-footer">' +
	        '  <div class="m-0 p-2" style="background-color: #f7f7f7">' +
                '  <button type="button" id="close" data-role="none" ' +
                '          class="btn btn-sm btn-danger w-100 p-0" ' +
                '          onclick="$(\'#breakpointicon1\').popover(\'hide\');"><span data-langkey="Close">Close</span></button>' +
		'  </div>' +
		'</div>' +
		'</div>' ;

	return o ;
    }

    function wepsim_config_dialog_title ( name, color, str_onchange )
    {
	 return "<div class='dropdown btn-group'>" +
                "<button type='button' " +
		"   class='btn btn-outline-" + color + " px-3 py-1 dropdown-toggle' " +
		"   data-toggle='dropdown' id='dropdown-title1' " +
		"   aria-expanded='false' aria-haspopup='true'>" +
		"<span class='font-weight-bold' data-langkey='" + name + "'>" + name + "</span>" +
		"</button>" +
		"<div class='dropdown-menu' " +
		"     style='overflow-y:auto; max-height:55vh; z-index:100000;' " +
		"     aria-labelledby='dropdown-title1'>" +
                // details
		" <form class='px-3 m-0'><div class='form-group m-0'>" +
		" <label for='wsdt" + name + "'><span data-langkey='details'>details</span></label>" +
		" <button class='btn btn-outline-secondary btn-block py-1' " +
                "         type='button' id='wsdt" + name + "' " +
		"         onclick='$(\".collapse7\").collapse(\"toggle\");'>" +
		" <span class='text-truncate'>&plusmn; <span data-langkey='Description'>Description</span></span>" +
		" </button>" +
                " </div></form>"+
                // idioms
		"<div class='dropdown-divider m-1'></div>" +
		" <form class='px-3 m-0'><div class='form-group m-0'>" +
		" <label for='dd2'><span data-langkey='idiom'>idiom</span></label>" +
                  i18n_get_select('select7b' + name, str_onchange) +
                " </div></form>"+
		"</div>" +
		"</div>" ;
    }

    function wepsim_config_dialog_dropdown ( color, base_buttons, str_onchange )
    {
	 return "<div class='dropdown btn-group'>" +
		base_buttons +
		"<button type='button' " +
		"   data-toggle='dropdown' id='dropdown-title1' " +
		"   aria-expanded='false' aria-haspopup='true' " +
		"   class='btn btn-" + color + " dropdown-toggle dropdown-toggle-split'" +
		"><span class='sr-only'>Toggle Dropdown</span>" +
		"</button>" +
		"<div class='dropdown-menu' " +
		"     style='overflow-y:auto; max-height:55vh; z-index:100000;' " +
		"     aria-labelledby='dropdown-title1'>" +
                // details
		" <form class='px-3 m-0'><div class='form-group m-0'>" +
		" <label for='wsdt" + name + "'>details</label>" +
		" <button class='btn btn-outline-secondary btn-block py-1' " +
                "         type='button' id='wsdt" + name + "' " +
		"         onclick='$(\".collapse7\").collapse(\"toggle\");'>" +
		" <span>&plusmn; <span data-langkey='Description'>Description</span></span>" +
		" </button>" +
                " </div></form>"+
                // idioms
		"<div class='dropdown-divider m-1'></div>" +
		" <form class='px-3 m-0'><div class='form-group m-0'>" +
		" <label for='dd2'>idiom</label>" +
                  i18n_get_select('select7b' + name, str_onchange) +
                " </div></form>"+
		"</div>" +
		"</div>" ;
    }

