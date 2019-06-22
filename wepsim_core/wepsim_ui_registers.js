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
         *  Auxiliar to init_x & show_x
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
                if (!rhex.test(hexvalue)) {
                    hexvalue = 0 ;
		}

		var valuei   = hexvalue  >> 0;
		var valueui  = hexvalue >>> 0;
		var valuec8  = hex2char8(valueui);
		var valuef   = hex2float(valueui);
                var valuebin = hex2bin(valueui);
                var valueoct = valueui.toString(8).toUpperCase() ;
                var valuehex = valueui.toString(16).toUpperCase() ;
                    valuehex = "0x" + pack8(valuehex) ;

		var valuedt = "" ;
		if (get_cfg('is_editable') == true) 
		{
		    valuedt = "<tr><td class='py-1 px-1' colspan='5' align='center'>" + 
                              "<input type='text' id='popover1' value='" + valueui + "' data-mini='true' style='width:65%'>&nbsp;" +
                              "<span class='badge badge-secondary' " +
                              "      onclick='hex2values_update(\"" + index + "\");'>update</span>" + 
                              "</td></tr>";
                }

		var vtable = "<table class='table table-bordered table-hover table-sm mb-1'>" +
			     "<tbody>" +
			     "<tr><td class='p-0 pl-1 align-middle'><strong>hex.</strong></td>" +
                             "    <td class='p-0 pl-1 align-middle'><strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>" + valuehex + "</strong></td>" +
			     "</tr>" +
			     "<tr><td class='p-0 pl-1 align-middle'><strong>oct.</strong></td>" +
                             "    <td class='p-0 pl-1 align-middle'><strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>" + valueoct + "</strong></td>" +
			     "</tr>" +
			     "<tr><td class='p-0 pl-1 align-middle'><strong>binary</strong></td>" +
                             "    <td class='p-0 pl-1 align-middle'><strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>" + valuebin + "</strong></td>" +
			     "</tr>" +
			     "<tr><td class='p-0 pl-1 align-middle'><strong>signed</strong></td>" +
                             "    <td class='p-0 pl-1 align-middle'><strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>" + valuei   + "</strong></td>" +
			     "</tr>" +
			     "<tr><td class='p-0 pl-1 align-middle'><strong>unsig.</strong></td>" +
                             "    <td class='p-0 pl-1 align-middle'><strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>" + valueui  + "</strong></td>" +
			     "</tr>" +
			     "<tr><td class='p-0 pl-1 align-middle'><strong>char</strong></td>" +
                             "    <td class='p-0 pl-1 align-middle'>" + 
			     "<strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>&nbsp;" + valuec8[0] + "&nbsp;</strong>&nbsp;" + 
			     "<strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>&nbsp;" + valuec8[1] + "&nbsp;</strong>&nbsp;" + 
			     "<strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>&nbsp;" + valuec8[2] + "&nbsp;</strong>&nbsp;" + 
			     "<strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>&nbsp;" + valuec8[3] + "&nbsp;</strong>&nbsp;" + 
			     "</td>" +
			     "</tr>" +
		             "<tr><td class='p-0 pl-1 align-middle'><strong>float</strong></td>" +
                             "    <td class='p-0 pl-1 align-middle'><strong class='rounded' style='background-color:#CEECF5; color:black; font-family:monospace;'>" + valuef + "</strong></td>" +
			     "</tr>" +
			     valuedt +
			     "</tbody>" +
			     "</table>" ;

		return vtable;
        }

        function quick_config_rf ( )
        {
	       var o = "<div class='container mt-1'>" +

		       "<div class='row'>" +
		       "<div class='col-12 p-0'><span data-langkey='Display format'>Display format</span></div>" +

		       "<div class='col-7 p-1'>" +
		       "<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
		       "        onclick='update_cfg(\"RF_display_format\", \"unsigned_16_fill\"); show_rf_values(); show_states(); return true; '>" +
		       "0x<span class='mx-auto px-1 font-weight-bold rounded' style='background-color:#CEECF5; color:black;'>0000001A<sub>16</sub></span></buttom>" +
		       "</div>" +
		       "<div class='col p-1'>" +
		       "<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
		       "        onclick='update_cfg(\"RF_display_format\", \"unsigned_16_nofill\"); show_rf_values(); show_states(); return true; '>" +
		       "0x<span class='mx-auto px-1 font-weight-bold rounded' style='background-color:#CEECF5; color:black;'>1A<sub>16</sub></span></buttom>" +
		       "</div>" +

		       "<div class='w-100 border border-light'></div>" +

		       "<div class='col-7 p-1'>" +
		       "<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
		       "        onclick='update_cfg(\"RF_display_format\", \"unsigned_8_fill\"); show_rf_values(); show_states(); return true; '>" +
		       "<span class='mx-auto px-1 font-weight-bold rounded' style='background-color:#CEECF5; color:black;'>00000032<sub>8&nbsp;</sub></span></buttom>" +
		       "</div>" +
		       "<div class='col p-1'>" +
		       "<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
		       "        onclick='update_cfg(\"RF_display_format\", \"unsigned_8_nofill\"); show_rf_values(); show_states(); return true; '>" +
		       "<span class='mx-auto px-1 font-weight-bold rounded' style='background-color:#CEECF5; color:black;'>032<sub>8&nbsp;</sub></span></buttom>" +
		       "</div>" +

		       "<div class='w-100 border border-light'></div>" +

		       "<div class='col-7 p-1'>" +
		       "<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
		       "        onclick='update_cfg(\"RF_display_format\", \"unsigned_10_fill\"); show_rf_values(); show_states(); return true; '>" +
		       "+<span class='mx-auto px-1 font-weight-bold rounded' style='background-color:#CEECF5; color:black;'>00000026<sub>10</sub></span></buttom>" +
		       "</div>" +
		       "<div class='col p-1'>" +
		       "<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
		       "        onclick='update_cfg(\"RF_display_format\", \"unsigned_10_nofill\"); show_rf_values(); show_states(); return true; '>" +
		       "+<span class='mx-auto px-1 font-weight-bold rounded' style='background-color:#CEECF5; color:black;'>26<sub>10</sub></span></buttom>" +
		       "</div>" +

		       "<div class='w-100 border border-light'></div>" +

		       "<div class='col-7 p-1'>" +
		       "</div>" +
		       "<div class='col p-1'>" +
		       "<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
		       "        onclick='update_cfg(\"RF_display_format\", \"float_10_nofill\"); show_rf_values(); show_states(); return true; '>" +
		       "<span class='mx-auto px-1 font-weight-bold rounded' style='background-color:#CEECF5; color:black;'>3.6e-44<sub>10</sub></span></buttom>" +
		       "</div>" +

		       "<div class='w-100 border border-light'></div>" +
		       "<div class='col-12 p-0'><span data-langkey='Register file names'>Register file names</span></div>" +

		       "<div class='col-6 p-1'>" +
		       "<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
		       "        onclick='update_cfg(\"RF_display_name\", \"logical\"); wepsim_show_rf_names(); return true; '>" +
		       "<span class='font-weight-bold text-monospace' style='color:black;'>$t0</span>" + "&nbsp;" + 
                       "<span class='mx-auto px-1 rounded' style='background-color:#CEECF5;'>0</span></buttom>" +
		       "</div>" +
		       "<div class='col-6 p-1'>" +
		       "<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
		       "        onclick='update_cfg(\"RF_display_name\", \"numerical\"); wepsim_show_rf_names(); return true; '>" +
		       "<span class='font-weight-bold text-monospace' style='color:black;'>R10</span>" + "&nbsp;" + 
                       "<span class='mx-auto px-1 rounded' style='background-color:#CEECF5;'>0</span></buttom>" +
		       "</div>" +

		       "<div class='w-100 border border-light'></div>" +

		       "<div class='col p-1'>" +
		       "<button type='button' id='close' data-role='none' " +
		       "        class='btn btn-sm btn-danger w-100 p-0 mt-1' " +
		       "        onclick='$(\"#popover-rfcfg\").popover(\"hide\");'>Close</button>" +
		       "</div>" +
		       "</div>" +

		       "</div>" ;

		return o ;
        }


        /*
         *  init_x & show_x
         */

        function wepsim_init_rf ( jqdiv )
        {
            if (jqdiv == "")
            {   // without ui
                return ;
            }

            // Registers
	    var rf_val    = 0 ;
            var rf_format = get_cfg('RF_display_format') ;
            var o1_rf = "" ;
            var o1_rn = "" ;
	    for (var index=0; index < simhw_sim_states()['BR'].length; index++)
            {
		 o1_rn = "R"  + index ;
                 if (index < 10) {
                     o1_rn = o1_rn + '&nbsp;' ;
		 }

		 rf_val = value2string(rf_format, (get_value(simhw_sim_states()['BR'][index]) >>> 0)) ;

		 o1_rf += "<button type='button' class='btn py-0 px-1 mt-1 col-auto' " + 
			  "        style='border-color:#cecece; background-color:#f5f5f5' data-role='none' " +
                          "        data-toggle='popover-up' data-popover-content='" + index + "' data-container='body' " +
                          "        id='rf" + index + "'>" +
                          "<span id='name_RF" + index + "' class='p-0 text-monospace' style='float:center; color:black;'>" + o1_rn + "</span>&nbsp;" +
                          "<span class='badge badge-secondary' style='background-color:#CEECF5; color:black;' id='tbl_RF"  + index + "'>" +
                          rf_val +
                          "</span>" +
                          "</button>" ;
	    }

            $(jqdiv).html("<div class='d-flex flex-row flex-wrap justify-content-around justify-content-sm-between'>" + o1_rf + "</div>");

            // Pop-overs
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
		    },
		    sanitizeFn: function (content) {
                        return content ; // DOMPurify.sanitize(content) ;
                    }
	    });
        }

        function fullshow_rf_values ( )
        {
            var rf_format = get_cfg('RF_display_format') ;
	    var br_value = "" ;

	    for (var index=0; index < simhw_sim_states()['BR'].length; index++)
            {
		 br_value = value2string(rf_format, (get_value(simhw_sim_states()['BR'][index]) >>> 0)) ;

                 $("#tbl_RF" + index).html(br_value);
	    }
        }

        var show_rf_values_deferred = null;

        function innershow_rf_values ( )
        {
	    fullshow_rf_values();
	    show_rf_values_deferred = null;
        }

        function wepsim_show_rf_values ( )
        {
            if (null !== show_rf_values_deferred)
                return;

            show_rf_values_deferred = setTimeout(innershow_rf_values, cfg_show_rf_delay);
        }

        function wepsim_show_rf_names ( )
        {
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

            // Fast UI configuration
            var o1 = "<a data-toggle='popover-rfcfg' id='popover-rfcfg' " + 
	             "   tabindex='0' class='mx-auto'><strong>&equiv;</strong></a>" ;

            // Registers
            var rf_format = get_cfg('RF_display_format') ;
	    var divclass  =  "" ;
	    var value     =  "" ;

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

                divclass = filter[i].split(",")[1] ;
		value    = value2string(rf_format, sim_eltos[s].value) ;

                o1 += "<button type='button' class='btn py-0 px-1 mt-1 " + divclass + "' " + 
		      "        style='border-color:#cecece; background-color:#f5f5f5' data-role='none' " +
                      "        data-toggle='popover-bottom' data-popover-content='" + s + "' data-container='body' " +
                      "        id='rp" + s + "'>" +
                      showkey +
                      " <span class='badge badge-secondary' style='background-color:#CEECF5; color:black;' id='tbl_"  + s + "'>" +
		      value +
                      "</span>" +
                      "</button>" ;
            }

            $(jqdiv).html("<div class='d-flex flex-row flex-wrap justify-content-around justify-content-sm-between'>" + o1 + "</div>");

            // Pop-overs
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
		    },
		    sanitizeFn: function (content) {
                        return content ; // DOMPurify.sanitize(content) ;
                    }
	    });

	    $("[data-toggle=popover-rfcfg]").popover({
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
		    content:    quick_config_rf(),
		    sanitizeFn: function (content) {
                                   return content ; // DOMPurify.sanitize(content) ;
                                }
	    });
        }

        function fullshow_eltos ( sim_eltos, filter )
        {
            var rf_format = get_cfg('RF_display_format') ;
	    var value = "" ;
	    var   r = [] ;
	    var key = "" ;

            for (var i=0; i<filter.length; i++)
            {
                  r = filter[i].split(',') ;
                key = r[0] ;

                value = value2string('text:char:nofill', sim_eltos[key].value) ;
                if (sim_eltos[key].nbits > 1) {
		    value = value2string(rf_format, (simhw_sim_state(key).value >>> 0)) ;
                }

                $("#tbl_" + key).html(value);
            }
        }

        var show_eltos_deferred = null;

        function show_eltos ( sim_eltos, filter )
        {
            if (null !== show_eltos_deferred)
                return;

            show_eltos_deferred = setTimeout(function() {
                                                  fullshow_eltos(sim_eltos, filter) ;
                                                  show_eltos_deferred = null ;
                                             }, cfg_show_eltos_delay);
        }

        function wepsim_init_states ( jqdiv )
        {
            var filter_states = simhw_internalState('filter_states') ;
            return init_eltos(jqdiv, simhw_sim_states(), filter_states) ;
        }

        function wepsim_show_states ( )
        {
            var filter_states = simhw_internalState('filter_states') ;
            return show_eltos(simhw_sim_states(), filter_states) ;
        }

