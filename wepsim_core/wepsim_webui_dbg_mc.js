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
		    // 
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

        window.customElements.define('ws-dbg-mc', ws_dbg_mc) ;


        //
        // breakpoints
        //

        function dbg_set_breakpoint ( addr )
        {
                var icon_theme = get_cfg('ICON_theme') ;
                var dbg_level  = get_cfg('DBG_level') ;

                var o1       = document.getElementById("mcpin" + addr) ;
                var bp_state = simhw_internalState_get('MC_dashboard', addr).breakpoint ;

                if (bp_state === true) {
                    bp_state = false ;
                    o1.innerHTML = "&nbsp;" ;
                } else {
                    bp_state = true ;
                    o1.innerHTML = sim_core_breakpointicon_get(icon_theme) ;
                }

                simhw_internalState_get('MC_dashboard', addr).breakpoint = bp_state ;

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

                show_control_memory(simhw_internalState('MC'),
                                    simhw_internalState('MC_dashboard'),
			            reg_maddr,
                                    false) ;
	}

