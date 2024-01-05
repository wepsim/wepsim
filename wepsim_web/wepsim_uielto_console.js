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
         *  Console (keyboard + screen)
         */

        /* jshint esversion: 6 */
        class ws_console extends ws_uielto
        {
              constructor ()
              {
                    // parent
                    super();
              }

              // render
	      render ( event_name )
	      {
		    // html holder
		    var o1 = '<label class="my-0" for="kdb_con" style="min-width:95%">' +
                             '  <i style="height:5vh; opacity:0.6;" ' +
                             '     class="fas fa-desktop fa-2x mb-2"></i>' +
			     '</label>' +
			     '<textarea aria-label="monitor"' +
			     '          style="width:100%; overflow-y:auto; -webkit-overflow-scrolling: touch; margin:0 0 8 0"' +
			     '          placeholder="WepSIM" id="kdb_con" rows="8" readonly></textarea>' +
                             '' +
                             '<label class="my-0" for="kdb_key" style="min-width:95%">' +
                             '  <i style="height:5vh; opacity:0.6;" ' +
                             '     class="far fa-keyboard fa-2x mt-2 mb-1"></i>' +
                             '</label>' +
                             '<textarea aria-label="keyboard"' +
                             '          style="min-width:100%; overflow-y:auto; -webkit-overflow-scrolling: touch; margin:0 0 0 0"' +
                             '          placeholder="WepSIM" id="kdb_key" rows="2"></textarea>' ;

		    this.innerHTML = o1 ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-console', ws_console) ;
        }


        //
        // Screen / Keyboard
        //

	function wepsim_get_screen_content ( )
	{
	      var screen_content = "" ;

	      var scrobj = document.getElementById("kdb_con") ;
              if (scrobj != null) {
		  screen_content = scrobj.value ;
	      }

              simcore_native_set_value("SCREEN", "content", screen_content) ;

	      return screen_content ;
	}

	function wepsim_set_screen_content ( screen_content )
	{
	      var scrobj = document.getElementById("kdb_con") ;
              if (scrobj != null) {
		  scrobj.value = screen_content ;
	      }

              simcore_native_set_value("SCREEN", "content", screen_content) ;

	      return screen_content ;
	}

	function wepsim_get_keyboard_content ( )
	{
	      var keystrokes = "" ;

	      var keyobj = document.getElementById("kdb_key") ;
              if (keyobj != null) {
		  keystrokes = keyobj.value ;
	      }

              simcore_native_set_value("KBD", "keystrokes", keystrokes) ;

	      return keystrokes ;
	}

	function wepsim_set_keyboard_content ( keystrokes )
	{
	      var keyobj = document.getElementById("kdb_key") ;
              if (keyobj != null) {
		  keyobj.value = keystrokes ;
	      }

              simcore_native_set_value("KBD", "keystrokes", keystrokes) ;

	      return true ;
	}

