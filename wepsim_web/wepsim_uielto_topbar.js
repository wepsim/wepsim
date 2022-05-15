/*
 *  Copyright 2015-2022 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
		    var o1 =    '<nav class="navbar navbar-expand-lg fixed-top p-0" style="background-color: #EAEAEA">' +
				'    <span class="navbar-brand me-auto">' +
				'       <a class="ui-title ps-2 mx-2 text-primary" ' +
                                '          style="text-decoration: none"' +
				'          id="po1"' +
				'	   data-container="body"' +
	// bs5 toggle fails	'          onclick="if (typeof wsweb_quickmenu_toggle === \'function\')' +
	// bs5 toggle fails	'	               wsweb_quickmenu_toggle();' +
				'          onclick="if (typeof wsweb_quickmenu_show === \'function\')' +
				'	               wsweb_quickmenu_show();' +
				'	           return false;"' +
				'	  data-html="true"' +
				'	  data-placement="bottom">WepSIM&nbsp;<span class="badge rounded-pill text-bg-secondary"><div class="wsversion">loading ...</div></span>' +
				'       </a>' +
				'    </span>' +
				'' +
				'    <button class="navbar-toggler ms-auto btn-outline-secondary" data-bs-toggle="collapse"' +
				'            data-bs-target="#navbarSupportedContent"' +
				'            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
				'	<em class="fas fa-bars"></em>' +
				'    </button>' +
				'' +
				'    <div id="navbarSupportedContent" class="collapse navbar-collapse mx-auto py-0 flex-row" style="background-color: #EAEAEA">' +
				'       <div class="navbar-nav nav-pills ms-auto col-md-8">' +
				'       <ul class="nav nav-pills ms-auto">' +
				'          <li class="nav-item ms-auto"><img alt="ARCOS logo" src="images/arcos.svg" style="height:30pt" class="img-fluid rounded m-0 p-1" /></li>' +
				'          <li class="nav-item ms-auto"><strong>.</strong></li>' +
				'          <li class="nav-item ms-auto"><img alt="Computer Science and Engineering Departament logo" src="images/dptoinf.png" style="height:28pt" class="img-fluid rounded m-0 p-0" /></li>' +
				'       </ul>' +
				'       </div>' +
				'    </div>' +
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
    	    $('#po1').popover(action) ;

            // set UI config (if shown)
            if (action != 'hide')
    	        wepsim_uicfg_apply() ;

            // return ok
            return true ;
        }

