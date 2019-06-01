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

