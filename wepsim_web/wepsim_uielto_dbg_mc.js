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
         *  DBG-MC
         */

        /* jshint esversion: 6 */
        class ws_dbg_mc extends ws_uielto
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( event_name )
	      {
		    // html holder
		    var o1 = "<div id='memory_MC' " +
                             "     style='height:60vh; width:inherit; overflow-y:scroll; -webkit-overflow-scrolling:touch;'>" +
                             "</div>" ;

		    this.innerHTML = o1 ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-dbg-mc', ws_dbg_mc) ;
        }


        //
        //  Breakpoints and show_dbg_mpc
        //

        function dbg_set_breakpoint ( addr )
        {
                // toggle
                var hexaddr  = "0x" + parseInt(addr).toString(16) ;
                var bp_state = wepsim_execute_toggle_microbreakpoint(hexaddr) ;

                // toggle UI
                dbg_set_breakpoint_ui(addr, bp_state) ;

                // notify if dbg_level...
                var dbg_level = get_cfg('DBG_level') ;
                if ( bp_state && ('instruction' === dbg_level) )
                {
                     wepsim_notify_do_notify('<strong>INFO</strong>',
                                             'Please remember to change configuration to execute at microinstruction level.',
		                             'success',
			                     get_cfg('NOTIF_delay')) ;
                }

		// add if recording
                simcore_record_append_new('Set firmware breakpoint at ' + addr,
                                          'dbg_set_breakpoint(' + addr + ');\n') ;
        }

        function dbg_set_breakpoint_ui ( addr, bp_state )
        {
                var o1_content = "&nbsp;" ;
                if (false == bp_state) {
                    var icon_theme = get_cfg('ICON_theme') ;
                    o1_content = sim_core_breakpointicon_get(icon_theme) ;
                }

                var o1 = document.getElementById("mcpin" + addr) ;
                o1.innerHTML = o1_content ;
        }

	function wepsim_show_dbg_mpc ( )
	{
	        var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	        var reg_maddr  = get_value(simhw_sim_state(maddr_name)) ;

                light_refresh_control_memory(simhw_internalState('MC'), reg_maddr) ;
	}


        //
        //  Control Memory UI
        //

        var show_control_memory_deferred = null;

        function wepsim_show_control_memory ( memory, index, redraw )
        {
            if (null !== show_control_memory_deferred) {
                return;
            }

            show_control_memory_deferred = setTimeout(function () {
						         if (false === redraw)
							      light_refresh_control_memory(memory, index);
                                                         else  hard_refresh_control_memory(memory, index, redraw);
                                                         show_control_memory_deferred = null;
                                                      }, cfg_show_control_memory_delay);
        }

        function hard_refresh_control_memory ( memory, index, redraw )
        {
	    var o1 = "" ;
            var SIMWARE = get_simware() ;

            // in case of empty control memory...
            if (typeof memory[index] == "undefined") {
                control_memory_set(memory, index, { value:{}, comments:[] }) ;
            }

            // build and load HTML
            for (var key in memory) {
                 o1 += control_memory_showrow(memory, key, (key == index), SIMWARE.hash_labels_firm_rev) ;
            }

            o1 = "<center><table class='table table-hover table-sm'>" +
                 "<tbody id='none'>" + o1 + "</tbody>" +
                 "</table></center>" ;

            $("#memory_MC").html(o1) ;

            // scroll up/down to index element...
	    if (redraw) {
                element_scroll_setRelative('#memory_MC', '#maddr' + index, 0) ;
            }

            // update old_mc_add for light_update
            old_mc_addr = index;
        }

        var old_mc_addr = 0;

        function light_refresh_control_memory ( memory, index )
        {
            o1 = $("#maddr" + old_mc_addr + " td") ;
            if (o1.is(':visible'))
            {
		//o1.css('color', 'black') ;
		  o1.removeClass('text-primary').addClass('text-body-emphasis') ;
		//o1.css('font-weight', 'normal') ;
		  o1.removeClass('fw-bold').addClass('fw-normal') ;
            }

            old_mc_addr = index ;

            o1 = $("#maddr" + old_mc_addr + " td") ;
            if (o1.is(':visible'))
            {
		//o1.css('color', 'blue') ;
		  o1.removeClass('text-body-emphasis').addClass('text-primary') ;
		//o1.css('font-weight', 'bold') ;
		  o1.removeClass('fw-normal').addClass('fw-bold') ;
            }
        }

        function control_memory_showrow ( memory, key, is_current, revlabels )
        {
	        var o1 = "" ;

                var value = control_memory_lineToString(memory, key) ;
                var maddr = "0x" + parseInt(key).toString(16) ;
                if (typeof revlabels[key] !== "undefined")
	        {
                    var htmllabel = revlabels[key] ;
		    var htmlfill  = 5 - htmllabel.length ;
		    if (htmlfill > 0)
                    {
			for (var i=0; i<htmlfill; i++) {
                             htmllabel = htmllabel + "&nbsp;" ;
			}
		    }

                    maddr = '<span>' +
                            '<span class="badge rounded-pill text-bg-info font-monospace" ' +
                            '      style="position:relative;top:4px;">' + htmllabel + '</span>' +
                            '<span style="border:1px solid gray;">' + maddr + '</span>' +
                            '</span>' ;
	        }

                // trpin + wcolor
                var trpin  = "&nbsp;" ;
                var jscode = "" ;
                if (typeof memory[key] !== "undefined")
	        {
		    if (true == memory[key].breakpoint) {
                        var icon_theme = get_cfg('ICON_theme') ;
                        trpin = sim_core_breakpointicon_get(icon_theme) ;
		    }

                    jscode = "dbg_set_breakpoint(" + key + "); " +
                             "if (event.stopPropagation) event.stopPropagation();" ;
		}

                // wcolor
                var wcolor = "text-body-emphasis fw-normal " ;
	        if (is_current) {
                    wcolor = "text-primary       fw-bold " ;
                }

		o1 += "<tr id='maddr" + key + "' class='d-flex' " +
                      "    style='font-size:small;' " +
		      "    onclick='" + jscode + "'>" +
		      "<td             class='col-3 col-md-2 py-0 " + wcolor + "' align='right'>" + maddr + "</td>" +
		      "<td width='1%'  class='col-auto py-0 px-0  " + wcolor + "' id='mcpin" + key + "'>" + trpin + "</td>" +
		      "<td             class='col py-0            " + wcolor + "'>" + value + "</td>" +
                      "</tr>" ;

                // return HTML
                return o1 ;
        }


        //
        // Vue-based:
        // * dbg_set_breakpoint_ui ( addr, bp_state ) { control_memory_init_vue_computed_value(e|bp...); }
	// * wepsim_show_dbg_mpc ( ) { control_memory_init_vue_computed_value(e|old,new...); }
        // * hard_refresh_control_memory ( memory, index, redraw ) { return control_memory_init_vue(redraw); }
        // * light_refresh_control_memory ( memory, index ) { return; }
        // * control_memory_init_vue ( redraw ) { ... f_computed_elements = ... try to avoid full for-loop }
        //

        function ctrmem_init_vue_computed_value_init ( elto )
        {
	       var SIMWARE = get_simware() ;
	       var key_hex = '0x' + parseInt(elto.key).toString(16) ;

               // ui-address_and_tags
	       var labels = SIMWARE.hash_labels_firm_rev[elto.key] ;
	       if (typeof labels !== 'undefined') {
		   labels = '<span>' +
			    '<span class="badge rounded-pill text-bg-info font-monospace" ' +
			    '      style="position:relative;top:4px;">' +
			    labels.padEnd(5, ' ').replace(' ', '&nbsp;') +
			    '</span>' +
			    '<span style="border:1px solid gray;">' + key_hex + '</span>' +
			    '</span>' ;
	       } else {
		   labels = '<span>' + key_hex + '</span>' ;
	       }

               // ui-value
	       var memory    = simhw_internalState('MC') ;
	       var value_str = control_memory_lineToString(memory, elto.key) ;

               // return elto.ui...
	       elto.ui = {
                            id_row:     'maddr' + elto.key,
			    addr_hex:   key_hex,
			    value_str:  value_str,
			    labels_str: labels,
			    b_icon:     '&nbsp;',
			    style_obj:  { fontSize:'small', color:'', fontWeight:'normal' }
		         } ;

	       return elto.ui ;
        }

        function ctrmem_init_vue_computed_value_update ( elto )
        {
               // ui-breakpoint-icon
	       var icon_theme = get_cfg('ICON_theme') ;
	       var icon_pin = '&nbsp;' ;
	       if (elto.breakpoint) {
		   icon_pin = sim_core_breakpointicon_get(icon_theme) ;
	       }
	       elto.ui.b_icon = icon_pin ;

               // ui-style
	       var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	       var index      = get_value(simhw_sim_state(maddr_name)) ;
	       var style_obj = { fontSize:'small', color:'', fontWeight:'normal' } ;
	       if (elto.key == index) {
		   style_obj = { fontSize:'small', color:'blue', fontWeight:'bold' } ;
	       }
	       elto.ui.style_obj = style_obj ;

               // ui-value
	       //var memory    = simhw_internalState('MC') ;
	       //var value_str = control_memory_lineToString(memory, elto.key) ;
	       //elto.ui.value_str = value_str ;

	       return elto.ui ;
        }

        function control_memory_init_vue ( redraw )
        {
            var memory     = simhw_internalState('MC') ;
	    var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	    var index      = get_value(simhw_sim_state(maddr_name)) ;

            // in case of empty control memory...
            if (typeof memory[index] == "undefined") {
                control_memory_set(memory, index, { value:{}, comments:[] }) ;
            }

            // build and load HTML
            var o1 = "<center><table id='ctrl_mem' class='table table-hover table-sm'>" +
                     "<tbody>" +
                     "<tr v-for='(elto, index) in computed_value' " +
                     "    :id='elto.ui.id_row' class='d-flex' " +
                     "    :data-info='elto.key' v-bind:key='elto.key' " +
                     "    :style='elto.ui.style_obj' " +
	 	     "    onclick='var key = this.getAttribute(\"data-info\"); " +
                     "             dbg_set_breakpoint(key); " +
                     "             if (event.stopPropagation) event.stopPropagation();'>" +
 	             "<td class='col-3 col-md-2 py-0' align='right' v-html='elto.ui.labels_str'></td>" +
	             "<td class='col-auto py-0 px-0'  width='1%'    v-html='elto.ui.b_icon'></td>" +
	             "<td class='col py-0'>{{ elto.ui.value_str }}</td>" +
                     "</tr>" +
                     "</tbody>" +
                     "</table></center>" ;

            $("#memory_MC").html(o1) ;

            // vue binding
	    for (var key in memory) {
		 memory[key].key = key ;
		 ctrmem_init_vue_computed_value_init(memory[key]) ;
	    }

            var f_computed_elements = function(arr) {
					    for (var key in arr) {
						 ctrmem_init_vue_computed_value_update(arr[key]) ;
					    }
                                            return arr ;
                                      } ;

            if (false == (memory instanceof Vuex.Store)) {
                memory = vue_observable(memory) ;
            }
            vue_appyBinding(memory, '#ctrl_mem', f_computed_elements) ;

            // scroll up/down to index element...
	    if (redraw) {
                element_scroll_setRelative('#memory_MC', '#maddr' + index, 0) ;
            }
        }

