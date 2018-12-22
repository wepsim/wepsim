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
         *  init_x & show_x
         */

        function hex2values_update ( index )
        {
	      var new_value     = parseInt($("#popover1")[0].value) ;
              var filter_states = simhw_internalState('filter_states') ;

              if (typeof simhw_sim_states()["BR"][index] != "undefined")
              {
	          set_value(simhw_sim_states()["BR"][index], new_value) ;
	          fullshow_rf_values() ;
                  $("#rf" + index).click() ;
                  $("#rf" + index).click() ;
              }

              if (typeof simhw_sim_states()[index] != "undefined")
              {
                  if (1 == simhw_sim_states()[index].nbits)
                      new_value = new_value % 2;

	          set_value(simhw_sim_states()[index], new_value) ;
                  fullshow_eltos(simhw_sim_states(), filter_states);
                  $("#rp" + index).click() ;
                  $("#rp" + index).click() ;
              }
        }

        function hex2values ( hexvalue, index )
        {
                var rhex = /[0-9A-F]{1,8}/gi;
                if (!rhex.test(hexvalue))
                    hexvalue = 0 ;

		var valuei   = hexvalue  >> 0;
		var valueui  = hexvalue >>> 0;
		var valuec8  = hex2char8(valueui);
		var valuef   = hex2float(valueui);
                var valuebin = hex2bin(valueui);
                var valuehex = valueui.toString(16).toUpperCase() ;
                    valuehex = "0x" + pack8(valuehex) ;

		var valuedt = "" ;
		if (get_cfg('is_editable') == true) {
		    valuedt = "<tr><td class='py-1 px-1' colspan='5' align='center'>" + 
                              "<input type='text' id='popover1' value='" + valueui + "' data-mini='true' style='width:65%'>&nbsp;" +
                              "<span class='badge badge-secondary' " +
                              "      onclick='hex2values_update(\"" + index + "\");'>update</span>" + 
                              "</td></tr>";
                }

		var vtable = "<table class='table table-bordered table-hover table-sm mb-1'>" +
			     "<tbody>" +
			     "<tr><td class='p-0 pb-1 pl-1'><strong>hex.</strong></td>" +
                             "    <td class='p-0 pb-1 pl-1'><strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>" + valuehex + "</strong></td>" +
			     "</tr>" +
			     "<tr><td class='p-0 pb-1 pl-1'><strong>binary</strong></td>" +
                             "    <td class='p-0 pb-1 pl-1'><strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>" + valuebin + "</strong></td>" +
			     "</tr>" +
			     "<tr><td class='p-0 pb-1 pl-1'><strong>signed</strong></td>" +
                             "    <td class='p-0 pb-1 pl-1'><strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>" + valuei   + "</strong></td>" +
			     "</tr>" +
			     "<tr><td class='p-0 pb-1 pl-1'><strong>unsig.</strong></td>" +
                             "    <td class='p-0 pb-1 pl-1'><strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>" + valueui  + "</strong></td>" +
			     "</tr>" +
			     "<tr><td class='p-0 pb-1 pl-1'><strong>char</strong></td>" +
                             "    <td class='p-0 pb-1 pl-1'>" + 
			     "<strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>&nbsp;" + valuec8[0] + "&nbsp;</strong>&nbsp;" + 
			     "<strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>&nbsp;" + valuec8[1] + "&nbsp;</strong>&nbsp;" + 
			     "<strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>&nbsp;" + valuec8[2] + "&nbsp;</strong>&nbsp;" + 
			     "<strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>&nbsp;" + valuec8[3] + "&nbsp;</strong>&nbsp;" + 
			     "</td>" +
			     "</tr>" +
		             "<tr><td class='p-0 pb-1 pl-1'><strong>float</strong></td>" +
                             "    <td class='p-0 pb-1 pl-1'><strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>" + valuef + "</strong></td>" +
			     "</tr>" +
			     valuedt +
			     "</tbody>" +
			     "</table>" ;

		return vtable;
        }

        function init_rf ( jqdiv )
        {
            if (jqdiv == "")
            {   // without ui
                return ;
            }

            var o1_rf = "" ;
            var o1_rn = "" ;
	    for (var index=0; index < simhw_sim_states()['BR'].length; index++)
            {
		 o1_rn = "R"  + index ;
                 if (index < 10)
                     o1_rn = o1_rn + '&nbsp;' ;

		 o1_rf += "<button type='button' class='btn py-0 px-1 mt-1 col-auto' " + 
			  "        style='border-color:#cecece; background-color:#f5f5f5' data-role='none' " +
                          "        data-toggle='popover-up' data-popover-content='" + index + "' data-container='body' " +
                          "        id='rf" + index + "'>" +
                          "<span id='name_RF" + index + "' class='p-0 text-monospace' style='float:center; color:black;'>" + o1_rn + "</span>&nbsp;" +
                          "<span class='badge badge-secondary' style='background-color:#CEECF5; color:black;' id='tbl_RF"  + index + "'>" +
                          (get_value(simhw_sim_states()['BR'][index]) >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() +
                          "</span>" +
                          "</button>" ;
	    }

            $(jqdiv).html("<div class='d-flex flex-row flex-wrap justify-content-sm-around justify-content-between'>" + o1_rf + "</div>");

	    $("[data-toggle=popover-up]").popover({
	    	    html:      true,
                    placement: 'auto',
                    animation: false,
                    trigger:   'click',
		    template:  '<div class="popover shadow" role="tooltip">' + 
                               '<div class="arrow"></div>' +
		               '<h3  class="popover-header"></h3>' +
		               '<div class="popover-body"></div>' +
		               '</div>',
		    container: 'body',
		    content: function() {
		        var index = $(this).attr("data-popover-content");
                        var hexvalue = get_value(simhw_sim_states()['BR'][index]);
                        return hex2values(hexvalue, index) ;
		    },
		    title: function() {
		        var index = $(this).attr("data-popover-content");
                        var id_button = "&quot;#rf" + index + "&quot;" ;
		        return '<span class="text-dark"><strong>R' + index + '</strong></span>' +
                               '<button type="button" id="close" class="close" ' +
                               '        onclick="$(' + id_button + ').click();">&times;</button>';
		    }
	    });
        }

        function fullshow_rf_values ( )
        {
	    if (typeof document == "undefined")
	        return ;

            var SIMWARE = get_simware() ;

	    for (var index=0; index < simhw_sim_states()['BR'].length; index++)
            {
                 var br_value = (get_value(simhw_sim_states()['BR'][index]) >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() ;
                 if (16 == get_cfg('RF_display_format'))
                     br_value = pack8(br_value) ;

                 $("#tbl_RF" + index).html(br_value);
	    }
        }

        var show_rf_values_deferred = null;

        function innershow_rf_values ( )
        {
	    fullshow_rf_values();
	    show_rf_values_deferred = null;
        }

        function show_rf_values ( )
        {
            if (null != show_rf_values_deferred)
                return;

            show_rf_values_deferred = setTimeout(innershow_rf_values, cfg_show_rf_delay);
        }

        function show_rf_names ( )
        {
	    if (typeof document == "undefined")
	        return ;

            var SIMWARE = get_simware() ;

            var br_value = "" ;
	    for (var index=0; index < simhw_sim_states()['BR'].length; index++)
            {
		 br_value = "R"  + index ;
                 if (index < 10)
                     br_value = br_value + '&nbsp;' ;

	         if ('logical' == get_cfg('RF_display_name'))
		     if (typeof SIMWARE['registers'][index] != "undefined")
		         br_value = SIMWARE['registers'][index] ;

		 var obj = document.getElementById("name_RF" + index);
		 if (obj != null)
		     obj.innerHTML = br_value ;
	    }
        }


        function init_eltos ( jqdiv, sim_eltos, filter )
        {
            if (jqdiv == "")
            {   // without ui
                return ;
            }

            var o1 = "" ;
            var part1 = "" ;
            var part2 = "" ;
            for (var i=0; i<filter.length; i++)
            {
                var s = filter[i].split(",")[0] ;

                var showkey = sim_eltos[s].name;
                if (sim_eltos[s].nbits > 1) 
	        {
                    part1 = showkey.substring(0, 3) ;
                    part2 = showkey.substring(3, showkey.length) ;

		    if (showkey.length < 3)
                         showkey = '<span class="text-monospace">' + part1 + '&nbsp;</span>' ;
		    else showkey = '<span class="text-monospace">' + part1 + '</span>' ;

		    if (part2.length > 0)
                        showkey += '<span class="d-none d-sm-inline-flex text-monospace">' + part2 + '</span>' ;
	        }

                var divclass = filter[i].split(",")[1] ;

                o1 += "<button type='button' class='btn py-0 px-1 mt-1 " + divclass + "' " + 
		      "        style='border-color:#cecece; background-color:#f5f5f5' data-role='none' " +
                      "        data-toggle='popover-bottom' data-popover-content='" + s + "' data-container='body' " +
                      "        id='rp" + s + "'>" +
                      showkey +
                      " <span class='badge badge-secondary' style='background-color:#CEECF5; color:black;' id='tbl_"  + s + "'>" +
                      sim_eltos[s].value.toString(get_cfg('RF_display_format')) +
                      "</span>" +
                      "</button>" ;
            }

            $(jqdiv).html("<div class='d-flex flex-row flex-wrap justify-content-sm-around justify-content-between'>" + o1 + "</div>");

	    $("[data-toggle=popover-bottom]").popover({
	    	    html:      true,
                    placement: 'bottom',
                    animation: false,
		    content: function() {
		        var index = $(this).attr("data-popover-content");
                        var hexvalue = get_value(simhw_sim_states()[index]);
                        return hex2values(hexvalue, index) ;
		    },
		    title: function() {
		        var index = $(this).attr("data-popover-content");
                        var id_button = "&quot;#rp" + index + "&quot;" ;
		        return '<span class="text-dark"><strong>' + simhw_sim_states()[index].name + '</strong></span>' +
                               '<button type="button" id="close" class="close" ' +
                               '        onclick="$(' + id_button + ').click();">&times;</button>';
		    }
	    });
        }

        function fullshow_eltos ( sim_eltos, filter )
        {
	    if (typeof document == "undefined")
	        return ;

            for (var i=0; i<filter.length; i++)
            {
                var r = filter[i].split(",") ;
                var key = r[0] ;
                var value = sim_eltos[key].value.toString(get_cfg('RF_display_format')) ;

                if (sim_eltos[key].nbits > 1) 
		{
                    value = (simhw_sim_state(key).value >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() ;
                    if (16 == get_cfg('RF_display_format'))
                        value = pack8(value) ;
                }

		var obj = document.getElementById("tbl_" + key);
		if (obj != null)
                    obj.innerHTML = value ;
            }
        }

        var show_eltos_deferred = null;

        function show_eltos ( sim_eltos, filter )
        {
            if (null != show_eltos_deferred)
                return;

            show_eltos_deferred = setTimeout(function() {
                                                   fullshow_eltos(sim_eltos, filter);
                                                   show_eltos_deferred = null;
                                             }, cfg_show_eltos_delay);
        }

        function init_states ( jqdiv )
        {
            var filter_states = simhw_internalState('filter_states') ;
            return init_eltos(jqdiv, simhw_sim_states(), filter_states) ;
        }

        function show_states ( )
        {
            var filter_states = simhw_internalState('filter_states') ;
            return show_eltos(simhw_sim_states(), filter_states) ;
        }

        function ko_observable ( initial_value )
        {
	    if (typeof ko != "undefined") 
                 return ko.observable(initial_value).extend({rateLimit: cfg_show_rf_refresh_delay}) ;
	    else return initial_value ;
        }

        function ko_rebind_state ( state, id_elto )
        {
	    if (typeof ko == "undefined") {
                return ;
            }

            var state_obj = simhw_sim_state(state) ;
            if (typeof state_obj.value != "function")
                state_obj.value = ko.observable(state_obj.value).extend({rateLimit: cfg_show_rf_refresh_delay}) ;
            var ko_context = document.getElementById(id_elto);
            ko.cleanNode(ko_context);
            ko.applyBindings(simhw_sim_state(state), ko_context);
        }

