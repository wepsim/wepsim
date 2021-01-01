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
         *  DBG-MC
         */

        /* jshint esversion: 6 */
        class ws_dbg_mc extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
		    // html holder
		    var o1 = "<div id='memory_MC' " +
                             "     style='height:60vh; width:inherit; overflow-y:scroll; -webkit-overflow-scrolling:touch;'>" +
                             "</div>" ;

		    this.innerHTML = o1 ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-dbg-mc', ws_dbg_mc) ;
        }


        //
        // breakpoints
        //

        function dbg_set_breakpoint ( addr )
        {
                // toggle
                var hexaddr  = "0x" + parseInt(addr).toString(16) ;
                var bp_state = wepsim_execute_toggle_microbreakpoint(hexaddr) ;

                // toggle UI
                var o1_content = "&nbsp;" ;
                if (false == bp_state) {
                    var icon_theme = get_cfg('ICON_theme') ;
                    o1_content = sim_core_breakpointicon_get(icon_theme) ;
                }

                var o1 = document.getElementById("mcpin" + addr) ;
                o1.innerHTML = o1_content ;

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

	function wepsim_show_dbg_mpc ( )
	{
	        var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	        var reg_maddr  = get_value(simhw_sim_state(maddr_name)) ;

                light_refresh_control_memory(simhw_internalState('MC'), reg_maddr) ;
	}


        /*
         *  Control Memory UI
         */

        function hard_refresh_control_memory ( memory, index, redraw )
        {
	    var o1 = "" ;
            var SIMWARE = get_simware() ;

            for (var key in memory) {
                 o1 += control_memory_showrow(memory, key, (key == index), SIMWARE.revlabels) ;
            }

	    if (typeof memory[index] == "undefined") {
                o1 += control_memory_showrow(memory, index, true, SIMWARE.revlabels) ;
            }

            // build and load HTML
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
            o1 = $("#maddr" + old_mc_addr) ;
            o1.css('color', 'black') ;
            o1.css('font-weight', 'normal') ;

            old_mc_addr = index ;

            o1 = $("#maddr" + old_mc_addr) ;
            o1.css('color', 'blue') ;
            o1.css('font-weight', 'bold') ;
        }

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

        //
        // Auxiliar functions
        //

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
                            '<span class="badge badge-pill badge-info text-monospace" ' +
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

                var wcolor = "color:black; font-weight:normal; " ;
                if (is_current) {
                    wcolor = "color:blue;  font-weight:bold; " ;
                }

		o1 += "<tr id='maddr" + key + "' class='d-flex' " +
                      "    style='font-size:small; " + wcolor + "' " +
		      "    onclick='" + jscode + "'>" +
		      "<td             class='col-3 col-md-2 py-0' align='right'>" + maddr + "</td>" +
		      "<td width='1%'  class='col-auto py-0 px-0' id='mcpin" + key + "'>" + trpin + "</td>" +
		      "<td             class='col py-0'>" + value + "</td>" +
                      "</tr>" ;

                // return HTML
                return o1 ;
        }

