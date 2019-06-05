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
         *  Register File
         */

        function show_rf_values ( )
        {
            return simcore_action_ui("CPU", 0, "show_rf_values")() ;
        }

        function show_rf_names ( )
        {
            return simcore_action_ui("CPU", 0, "show_rf_names")() ;
        }

        function show_states ( )
        {
            return simcore_action_ui("CPU", 0, "show_states")() ;
        }


        /*
	 *  Console (Screen + Keyboard)
	 */

        // get/set interface
        var   screen_content = "" ;
        var keyboard_content = "" ;

	function get_screen_content ( )
	{
	      var ui_screen = simcore_action_ui("SCREEN", 0, "get_screen_content")() ;

	      if (ui_screen !== "undefined")
	          screen_content = ui_screen ;

	      return screen_content ;
	}

	function set_screen_content ( screen )
	{
	      screen_content = screen ;

	      simcore_action_ui("SCREEN", 0, "set_screen_content")(screen) ;
	}

	function get_keyboard_content ( )
	{
	      var ui_keyboard = simcore_action_ui("KEYBOARD", 0, "get_keyboard_content")() ;

	      if (ui_keyboard !== "undefined")
	          keyboard_content = ui_keyboard ;

	      return keyboard_content ;
	}

	function set_keyboard_content ( keystrokes )
	{
	      keyboard_content = keystrokes ;

	      simcore_action_ui("KEYBOARD", 0, "set_keyboard_content")(keystrokes) ;
	}


        /*
         *  Show memories
         */

        function show_main_memory ( memory, index, redraw, updates )
        {
	    return simcore_action_ui("MEMORY", 0, "show_main_memory")(memory, index, redraw, updates) ;
        }

        function show_control_memory ( memory, memory_dashboard, index, redraw )
        {
	    return simcore_action_ui("MEMORY", 0, "show_control_memory")(memory, memory_dashboard, index, redraw) ;
        }

        function show_memories_values ( )
        {
            var f1 = new Promise(function(resolve, reject) 
		     {
			 var pc_name = simhw_sim_ctrlStates_get().pc.state ;
			 var reg_pc  = get_value(simhw_sim_state(pc_name)) ;

			 show_main_memory(simhw_internalState('MP'), reg_pc, true, true) ;
			 resolve(1);
                     });
            var f2 = new Promise(function(resolve, reject) 
		     {
			 var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
			 var reg_maddr  = get_value(simhw_sim_state(maddr_name)) ;

			 show_control_memory(simhw_internalState('MC'), simhw_internalState('MC_dashboard'), reg_maddr, true) ;
			 resolve(1);
		     });

            Promise.all([f1, f2]);
	}


        /*
         *  CPU svg: update_draw
         */

        var callback_update_draw = function () { 
		                      return true; 
	                           } ;

        function init_update_draw ( update_draw )
        {
            if (update_draw !== null) {   
                callback_update_draw = update_draw ;
            }

	    return true ;
        }

        function update_draw ( obj, value )
        {
            return callback_update_draw(obj, value) ;
        }

