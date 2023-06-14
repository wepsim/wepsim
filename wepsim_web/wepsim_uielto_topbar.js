/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Navbar: topbar
         */

        /* jshint esversion: 6 */
        class ws_topbar extends ws_uielto
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( event_name )
	      {
		    // html holder
		    var o1 =    '<nav class="navbar navbar-expand-lg fixed-top p-0 bg-body-secondary">' +
				'    <span class="navbar-brand me-auto">' +
				'       <a class="ui-title ps-2 mx-2 text-primary" ' +
                                '          style="text-decoration: none"' +
				'          id="po1"' +
				'	   data-container="body"' +
	// bs5 toggle fails	'          onclick="if (typeof wsweb_quickmenu_toggle === \'function\')' +
	// bs5 toggle fails	'	               wsweb_quickmenu_toggle();' +
				'          onclick="if (typeof wsweb_quickmenu_show === \'function\')' +
				'	                wsweb_quickmenu_show();' +
				'	            return false;"' +
				'	  data-bs-html="true"' +
				'	  data-bs-placement="bottom">WepSIM&nbsp;<span class="badge rounded-pill text-bg-secondary"><div class="wsversion">loading ...</div></span>' +
				'       </a>' +
				'    </span>' +
				'' +
				'    <span class="navbar-brand ms-auto">' +
				'       <a class="ui-title ps-2 mx-2 text-primary" ' +
                                '          style="text-decoration: none"' +
				'          id="po1"' +
				'	   data-container="body"' +
				'          onclick="wsweb_dialog_open(\'about\');' +
				'	            return true;"' +
				'	  data-bs-html="true"' +
				'	  data-bs-placement="bottom"><span data-langkey="About">About</span>...</a>' +
				'    </span>' +
				'</nav>' ;

		    this.innerHTML = o1 ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-topbar', ws_topbar) ;
        }


        // quick menu
        function topbar_quickmenu_action ( action )
        {
            wepsim_popover_action('po1', action) ;

            // set UI config (if shown)
            if (action != 'hide')
    	        wepsim_uicfg_apply() ;

            // return ok
            return true ;
        }

