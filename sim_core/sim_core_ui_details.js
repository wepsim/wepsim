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
         *  Register File: init_x & show_x
         */

        var callback_rf_show_values = function () { 
		                         return true; 
	                              } ;

        var callback_rf_show_names  = function () { 
		                         return true; 
	                              } ;


        function init_rf ( rf_show_values, rf_show_names )
        {
            if (rf_show_values !== null) {   
                callback_rf_show_values = rf_show_values ;
            }

            if (rf_show_names !== null) {   
                callback_rf_show_names  = rf_show_names ;
            }

	    return true ;
        }

        function show_rf_values ( )
        {
            return callback_rf_show_values() ;
        }

        function show_rf_names ( )
        {
            return callback_rf_show_names() ;
        }


        /*
         *  CPU Registers outside RF: init_x & show_x
         */

        var callback_states_show = function () { 
		                      return true; 
	                           } ;

        function init_states ( states_show )
        {
            if (states_show !== null) {   
                callback_states_show = states_show ;
            }

	    return true ;
        }

        function show_states ( )
        {
            return callback_states_show() ;
        }


        /*
	 *  Console (Screen + Keyboard)
	 */

        // register callbacks interface
        var callback_getScreenContent   = function () {
		                             return "" ;
	                                  } ;
        var callback_setScreenContent   = function ( newContent ) {
		                             return true;
	                                  } ;
        var callback_getKeyboardContent = function () {
		                             return "" ;
	                                  } ;
        var callback_setKeyboardContent = function ( newContent ) {
		                             return true;
	                                  } ;

        function init_console_screen ( con_get_screen, con_set_screen )
        {
            if (con_get_screen !== null) {
                callback_getScreenContent   = con_get_screen ;
            }
            if (con_set_screen !== null) {
                callback_setScreenContent   = con_set_screen ;
            }

	    return true ;
        }

        function init_console_keyboard ( con_get_keyboard, con_set_keyboard )
        {
            if (con_get_keyboard !== null) {
                callback_getKeyboardContent = con_get_keyboard ;
            }
            if (con_set_keyboard !== null) {
                callback_setKeyboardContent = con_set_keyboard ;
            }

	    return true ;
        }


        // get/set interface
        var   screen_content = "" ;
        var keyboard_content = "" ;

	function get_screen_content ( )
	{
	      var ui_screen = callback_getScreenContent() ;

	      if (ui_screen !== "undefined")
	          screen_content = ui_screen ;

	      return screen_content ;
	}

	function set_screen_content ( screen )
	{
	      screen_content = screen ;

	      callback_setScreenContent(screen) ;
	}

	function get_keyboard_content ( )
	{
	      var ui_keyboard = callback_getKeyboardContent() ;

	      if (ui_keyboard !== "undefined")
	          keyboard_content = ui_keyboard ;

	      return keyboard_content ;
	}

	function set_keyboard_content ( keystrokes )
	{
	      keyboard_content = keystrokes ;

	      callback_setKeyboardContent(keystrokes) ;
	}


        /*
         *  Show memories
         */

        var callback_show_main_memory    = function () { 
		                              return true; 
	                                   } ;

        var callback_show_control_memory = function () { 
		                              return true; 
	                                   } ;


        function init_memory ( show_main_memory, show_control_memory )
        {
            if (show_main_memory !== null) {   
                callback_show_main_memory = show_main_memory ;
            }

            if (show_control_memory !== null) {   
                callback_show_control_memory  = show_control_memory ;
            }

	    return true ;
        }

        function show_main_memory ( memory, index, redraw, updates )
        {
            return callback_show_main_memory(memory, index, redraw, updates) ;
        }

        function show_control_memory ( memory, memory_dashboard, index, redraw )
        {
            return callback_show_control_memory(memory, memory_dashboard, index, redraw) ;
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

