/*
 *  Copyright 2015-2026 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Sound
         */

        /* jshint esversion: 6 */
        class ws_sound extends ws_uielto
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
		    var o1 = '<label class="my-0" for="snd_card" style="min-width:95%">' +
                             '  <i style="height:5vh; opacity:0.6;" ' +
                             '     class="fa-solid fa-music fa-2x mb-2"></i>' +
			     '</label>' +
			     '<textarea ' +
                             '     aria-label="monitor"' +
			     '     style="width:100%; overflow-y:auto; -webkit-overflow-scrolling: touch; margin:0 0 8 0"' +
			     '     placeholder="WepSIM" id="snd_card" rows="8" readonly></textarea>' ;

		    this.innerHTML = o1 ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-sound', ws_sound) ;
        }


        //
        // Screen / Keyboard
        //

	function wepsim_get_sound_content ( )
	{
	      var sound_content = "" ;

	      var scrobj = document.getElementById("snd_card") ;
              if (scrobj != null) {
		  sound_content = scrobj.value ;
	      }

              simcore_native_set_value("SOUND", "content", sound_content) ;

	      return sound_content ;
	}

	function wepsim_set_sound_content ( sound_content )
	{
	      var scrobj = document.getElementById("snd_card") ;
              if (scrobj != null) {
		  scrobj.value = sound_content ;
	      }

              simcore_native_set_value("SOUND", "content", sound_content) ;

              // from https://stackoverflow.com/questions/10158190/how-to-set-cursor-at-the-end-in-a-textarea
              scrobj.focus() ;
              scrobj.setSelectionRange(scrobj.value.length, scrobj.value.length) ;

	      return sound_content ;
	}

