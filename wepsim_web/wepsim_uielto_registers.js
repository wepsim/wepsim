/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Registers (Register file + transparent registers)
         */

        /* jshint esversion: 6 */
        class ws_registers extends ws_uielto
        {
	      constructor ()
	      {
		    // parent
		    super();

                    this.rf_div = "states_BR" ;
                    this.tf_div = "states_ALL" ;
	      }

	      render ( event_name )
	      {
                    // html holder
		    var o1 = "<div class='container text-end multi-collapse-3 collapse show'>" +
                             '<span class="my-0" for="popover-rfcfg" style="min-width:95%">' +
                             '<span data-langkey="quick config">quick config</span>: ' +
		             "<a data-bs-toggle='popover-rfcfg' id='popover-rfcfg' " +
			     "   tabindex='0' class='m-auto'>" +
                             "<strong><strong class='fas fa-wrench text-secondary'></strong></strong>" +
                             "</a></span>" +
                             "</div>" +
                             '<div id="' + this.tf_div + '" ' +
                             '     style="width:inherit; overflow-y:auto;"' +
                             '     class="container container-fluid px-1 pb-1">' +
                             '</div>' +
                             '<div id="' + this.rf_div + '" ' +
                             '     style="width: inherit; overflow-y: auto;"' +
                             '     class="container container-fluid px-1 pt-1">' +
                             '</div>' ;

                    this.innerHTML = o1 ;

                    // initialize loaded components
                    wepsim_quickcfg_init('popreg1') ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-registers', ws_registers) ;
        }


        /*
         *  Auxiliar to init_x & show_x
         */

        function hex2values_update ( index )
        {
              var sim_eltos = simhw_sim_states() ;
	      var new_value = parseInt($("#popover1")[0].value) ;

              if (typeof sim_eltos.BR[index] != "undefined")
              {
	          set_value(sim_eltos.BR[index], new_value) ;
                  $("#rf" + index).click() ;
                  $("#rf" + index).click() ;
              }

              if (typeof sim_eltos[index] != "undefined")
              {
                  if (1 == sim_eltos[index].nbits) {
                      new_value = new_value % 2;
                  }

	          set_value(sim_eltos[index], new_value) ;
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

		var valueui  = hexvalue >>> 0 ;
		var valuec8  = hex2char8(valueui) ;
                var valueoct = "0"  + valueui.toString(8).toUpperCase() ;
                var valuehex = valueui.toString(16).toUpperCase() ;
                    valuehex = "0x" + simcoreui_pack(valuehex, 8) ;

		var o2 = "" ;
		if (get_cfg('is_editable') == true)
		{
		    o2 = "<tr><td class='py-1 px-1 pt-2' colspan='5' align='center'>" +
                         "<input type='text' id='popover1' value='" + valueui + "' data-mini='true' " +
                         "       style='width:65%'>" +
                         "<span class='badge text-bg-secondary shadow ms-2 py-2' " +
                         "      onclick='hex2values_update(\"" + index + "\");'>" +
                         "<span data-langkey='update'>update</span></span>" +
                         "</td></tr>";
                }

		var TD_B   = "<td class='p-0 ps-1 align-middle'>" ;
                var TD_E   = "</td>" ;
                var SG_B2  = "<strong class='rounded bg-info-subtle text-body' " +
                             "        style='font-family:monospace; font-size:105%'>" ;
		var TD_B1  = TD_B + "<strong>" ;
                var TD_B2  = TD_B + SG_B2 ;
                var TD_E12 = "</strong>" + TD_E ;
                var VAL_B  = SG_B2 + "&nbsp;" ;
                var VAL_E  = "&nbsp;</strong>&nbsp;" ;

		var o1 = "<table class='table table-bordered border-secondary table-hover table-sm mb-1'>" +
			 "<tbody>" +
			 "<tr>" + TD_B1 + "hex."   + TD_E12 + TD_B2 + valuehex         + TD_E12 + "</tr>" +
			 "<tr>" + TD_B1 + "oct."   + TD_E12 + TD_B2 + valueoct         + TD_E12 + "</tr>" +
			 "<tr>" + TD_B1 + "binary" + TD_E12 + TD_B2 + hex2bin(valueui) + TD_E12 + "</tr>" +
			 "<tr>" + TD_B1 + "signed" + TD_E12 + TD_B2 + (hexvalue  >> 0) + TD_E12 + "</tr>" +
			 "<tr>" + TD_B1 + "unsig." + TD_E12 + TD_B2 + valueui          + TD_E12 + "</tr>" +
			 "<tr>" + TD_B1 + "char"   + TD_E12 +
                                  TD_B + VAL_B + valuec8[0] + VAL_E + VAL_B + valuec8[1] + VAL_E +
			                 VAL_B + valuec8[2] + VAL_E + VAL_B + valuec8[3] + VAL_E + TD_E +
			 "</tr>" +
			 "<tr>" + TD_B1 + "float"  + TD_E12 + TD_B2 + hex2float(valueui) + TD_E12 + "</tr>" +
			 o2 +
			 "</tbody>" +
			 "</table>" ;

		return o1;
        }

        var r_formats = [
		  { "label2":"0x0000001A<sub>16</sub>", "format2":"unsigned_16_fill",   "colwidth":"col-7" },
		  { "label2":"0x1A<sub>16</sub>",       "format2":"unsigned_16_nofill", "colwidth":"col"   },
		  { "label2":"00000032<sub>8</sub>",    "format2":"unsigned_8_fill",    "colwidth":"col-7" },
		  { "label2":"032<sub>8</sub>",         "format2":"unsigned_8_nofill",  "colwidth":"col"   },
		  { "label2":"00000026<sub>10</sub>",   "format2":"unsigned_10_fill",   "colwidth":"col-7" },
		  { "label2":"026<sub>10</sub>",        "format2":"unsigned_10_nofill", "colwidth":"col"   },
		  { "label2":"",                        "format2":"",                   "colwidth":""      },
		  { "label2":"3.6e-44<sub>10</sub>",    "format2":"float_10_nofill",    "colwidth":"col"   }
	    ] ;

           function quick_config_rf_register_format ( )
           {
	       var o1 = "" ;

               for (var i=0; i<r_formats.length; i++)
               {
	            if (r_formats[i].label2 === "") {
	                o1 += "<div class='col-7 p-1'></div>" ;
                        continue ;
                    }

	            o1 += quickcfg_html_btn(r_formats[i].label2,
				            "update_cfg(\"RF_display_format\", " +
				            "           \"" + r_formats[i].format2 + "\");" +
				            "wepsim_refresh_registers();",
				            r_formats[i].colwidth) ;
               }

	       return  o1 ;
           }

           function quick_config_rf_register_names ( )
           {
              var sim_eltos = simhw_sim_states() ;
              var SIMWARE   = get_simware() ;
              var o2 = "" ;

              // get: [ 'r10', 'la' ]
              var logical_defined = [] ;
	      for (var index=0; index < sim_eltos.BR.length; index++)
              {
	         if (typeof SIMWARE.registers[index] !== "undefined") {
                     logical_defined = SIMWARE.registers[index] ;
                     break;
                 }
              }

              // make menu
	      o2 += quickcfg_html_btnreg('R10',
	 			         "update_cfg(\"RF_display_name\", \"numerical\");" +
				         "wepsim_show_rf_names();",
				         'col-6') ;
              if (logical_defined.length == 0)
                   o2 += "<div class='col-6 p-1'></div>" ;
              else o2 += quickcfg_html_btnreg(logical_defined.join('|'),
	 			              "update_cfg(\"RF_display_name\", \"logical\");" +
				              "wepsim_show_rf_names();",
				              'col-6') ;

              for (var i=0; i<logical_defined.length; i++)
              {
	           o2 += quickcfg_html_btnreg(logical_defined[i],
		  		              "update_cfg(\"RF_display_name\", \"logical\");" +
                                              "wepsim_refresh_rf_names(" + (i+1) + ");",
				              'col-6') ;
              }

	      return o2 ;
           }

        function quick_config_rf ( )
        {
	      return "<div class='container mt-1'>" +
                     "<div class='row'>" +
                       quickcfg_html_header('Display format') +
                       quick_config_rf_register_format() +
                     quickcfg_html_br() +
                       quickcfg_html_header('Register file names') +
                       quick_config_rf_register_names() +
                     quickcfg_html_br() +
                       quickcfg_html_close('popover-rfcfg') +
		     "</div>" +
		     "</div>" ;
        }


        /*
         *  refresh
         */

        function wepsim_refresh_registers ( )
        {
            // register file
            var sim_eltos = simhw_sim_states() ;
	    for (var index=0; index < sim_eltos.BR.length; index++) {
		 update_value(sim_eltos.BR[index]) ;
            }

            // transparent registers
            var filter_states = simhw_internalState('filter_states') ;
            for (var i=0; i<filter_states.length; i++)
            {
                 var s = filter_states[i].split(",")[0] ;
		 update_value(sim_eltos[s]) ;
            }
        }

        function wepsim_refresh_rf_names_mkname ( disp_name, SIMWARE, index, logical_index )
        {
            var br_value = "" ;

            // numerical name
            if ( ('logical' != disp_name) || (typeof SIMWARE.registers[index] == "undefined") ) {
	         br_value = "R" + index ;
	         br_value = br_value.padEnd(3,' ') ;
                 return br_value ;
            }

            // all logical name
            if (logical_index == 0) {
		 br_value = SIMWARE.registers[index].join('|') ;
	         br_value = br_value.padEnd(6,' ') ;
                 return br_value ;
            }

            // get logical name
	    br_value = SIMWARE.registers[index][logical_index - 1] ;
            if (typeof br_value == "undefined") {
	        br_value = "R" + index ;
            }
	    br_value = br_value.padEnd(3,' ') ;
            return br_value ;
        }

        function wepsim_refresh_rf_names ( logical_index )
        {
	    var disp_name = get_cfg('RF_display_name') ;
            var sim_eltos = simhw_sim_states() ;
            var SIMWARE   = get_simware() ;

	    for (var index=0; index < sim_eltos.BR.length; index++)
            {
                 // display name
		 var obj = document.getElementById("name_RF" + index) ;
		 if (obj != null) {
		     obj.innerHTML = wepsim_refresh_rf_names_mkname(disp_name, SIMWARE, index, logical_index) ;
		 }
	    }
        }

        function wepsim_show_rf_names ( )
        {
            wepsim_refresh_rf_names(0) ;
        }


        /*
         *  init_x
         */

        function wepsim_init_rf ( )
        {
            // Registers
            var o1_rf = "" ;
            var o1_rn = "" ;
	    for (var index=0; index < simhw_sim_states().BR.length; index++)
            {
		 o1_rn = "R"  + index ;
		 o1_rn = o1_rn.padEnd(3,' ') ;

		 o1_rf += "<button type='button' " +
                          "        class='btn px-1 py-0 ms-1 mt-1 mb-0 me-0 col-auto border border-secondary bg-body-tertiary' " +
			  "        style='' data-role='none' " +
                          "        data-bs-toggle='popover-up' data-popover-content='" + index + "' data-container='body' " +
                          "        id='rf" + index + "'>" +
                          "<span id='name_RF" + index + "' class='p-0 font-monospace' style='float:center; '>" + o1_rn + "</span>&nbsp;" +
			  "<span class='w-100 d-block d-sm-none'></span>" +
                          "<span class='badge badge-secondary bg-info-subtle text-body' style='' id='tbl_RF"  + index + "'>" +
                          "<span id='rf_" + index + "'>{{ computed_value }}</span></span>" +
                          "</button>" ;
	    }

            $("#states_BR").html("<div class='d-flex flex-row flex-wrap justify-content-around justify-content-sm-between'>" + o1_rf + "</div>");

            // Pop-overs
            var popover_cfg = {
	    	    html:      true,
                    placement: 'auto',
                    animation: false,
                    trigger:   'click',
		    template:  '<div class="popover shadow" role="tooltip">' +
                               '<div class="arrow"></div>' +
		               '<h3  class="popover-header d-flex"></h3>' +
		               '<div class="popover-body"></div>' +
		               '</div>',
		    container: 'body',
		    content: function(obj) {
                        var index    = $(obj).attr('data-popover-content') ;
                        var hexvalue = get_value(simhw_sim_states().BR[index]);
                        return hex2values(hexvalue, index) ;
		    },
		    title: function(obj) {
                        var index     = $(obj).attr('data-popover-content') ;
                        var id_button = "&quot;#rf" + index + "&quot;" ;

	                var disp_name = get_cfg('RF_display_name') ;
                        var SIMWARE   = get_simware() ;
		        var rname = wepsim_refresh_rf_names_mkname(disp_name, SIMWARE, index, 0) ;

		        return '<span class="text-body font-monospace col"><strong>' + rname + '</strong></span>' +
                               '<button type="button" id="close" ' +
                               '        class="btn-close border border-secondary ms-auto" ' +
                               '        onclick="$(' + id_button + ').click();"></button>';
		    },
		    sanitizeFn: function (content) {
                        return content ; // DOMPurify.sanitize(content) ;
                    }
	    } ;
            wepsim_popovers_init("[data-bs-toggle=popover-up]", popover_cfg, null) ;

	    // vue binding
	    var f_computed_value = function(value) {
				       var rf_format = get_cfg('RF_display_format') ;
				       return value2string(rf_format, value >>> 0) ;
				    } ;

	    for (var index=0; index < simhw_sim_states().BR.length; index++)
            {
		 var ref_obj = simhw_sim_states().BR[index] ;

		 if (false == (ref_obj.value instanceof Vuex.Store)) {
		     ref_obj.value = vue_observable(ref_obj.value) ;
                 }

		 vue_appyBinding(ref_obj.value, '#rf_'+index, f_computed_value) ;
	    }
        }

        function wepsim_init_states ( )
        {
            var sim_eltos = simhw_sim_states() ;
            var filter    = simhw_internalState('filter_states') ;

            // Fast UI configuration
            var o1 = "" ;

            // Registers
	    var divclass =  "" ;
	    var value    =  "" ;

            var part1 = "" ;
            var part2 = "" ;
            for (var i=0; i<filter.length; i++)
            {
                var    s = filter[i].split(",")[0] ;
                divclass = filter[i].split(",")[1] ;

                var showkey = sim_eltos[s].name;
                if (sim_eltos[s].nbits > 1)
	        {
                    part1 = showkey.substring(0, 3) ;
                    part2 = showkey.substring(3, showkey.length) ;

		    if (showkey.length < 3)
                         showkey = '<span class="font-monospace">' + part1 + '&nbsp;</span>' ;
		    else showkey = '<span class="font-monospace">' + part1 + '</span>' ;

		    if (part2.length > 0)
                        showkey += '<span class="d-none d-sm-inline-flex font-monospace">' + part2 + '</span>' ;
	        }

                o1 += "<button type='button' " +
                      "        class='btn py-0 px-1 mt-1 ms-1 " + divclass + " border border-secondary bg-body-tertiary' " +
		      "        style='' data-role='none' " +
                      "        data-bs-toggle='popover-bottom' data-popover-content='" + s + "' data-container='body' " +
                      "        id='rp" + s + "'>" +
                      showkey +
                      " <span class='badge badge-secondary bg-info-subtle text-body' style='' id='tbl_"  + s + "'>" +
		      "<div id='rf_" + s + "'>{{ computed_value }}</div>" +
                      "</span>" +
                      "</button>" ;
            }

            $("#states_ALL").html("<div class='d-flex flex-row flex-wrap justify-content-around justify-content-sm-between'>" + o1 + "</div>");

            // Pop-overs
	    var popover_cfg = {
	    	    html:      true,
                    placement: 'bottom',
                    animation: false,
		    template:  '<div class="popover shadow" role="tooltip">' +
                               '<div class="arrow"></div>' +
		               '<h3  class="popover-header d-flex"></h3>' +
		               '<div class="popover-body"></div>' +
		               '</div>',
		    content: function(obj) {
                        var index    = $(obj).attr('data-popover-content') ;
                        var hexvalue = get_value(simhw_sim_states()[index]);
                        return hex2values(hexvalue, index) ;
		    },
		    title: function(obj) {
                        var index     = $(obj).attr('data-popover-content') ;
                        var id_button = "&quot;#rp" + index + "&quot;" ;
		        return '<span class="text-body col"><strong>' +
                               simhw_sim_states()[index].name +
                               '</strong></span>' +
                               '<button type="button" id="close" ' +
                               '        class="btn-close border border-secondary ms-auto" ' +
                               '        onclick="$(' + id_button + ').click();"></button>';
		    },
		    sanitizeFn: function (content) {
                        return content ; // DOMPurify.sanitize(content) ;
                    }
	    } ;
            wepsim_popovers_init("[data-bs-toggle=popover-bottom]", popover_cfg, null) ;

	    // vue binding
	    var f_computed_value = function(value) {
				        var rf_format = get_cfg('RF_display_format') ;
				        var rf_value = value2string('text:char:nofill', value) ;
					if (Number.isInteger(value)) {
				    	    rf_value = value2string(rf_format, (value >>> 0)) ;
				        }
				        return rf_value ;
				    } ;

            for (var i=0; i<filter.length; i++)
            {
                 var s = filter[i].split(",")[0] ;
		 var ref_obj = sim_eltos[s] ;

		 if (false == (ref_obj.value instanceof Vuex.Store)) {
		     ref_obj.value = vue_observable(ref_obj.value) ;
                 }

		 vue_appyBinding(ref_obj.value, '#rf_'+s, f_computed_value) ;
	    }
        }

