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
         *  Navbar: topbar
         */

        /* jshint esversion: 6 */
        class ws_topbar extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
		    // html holder
		    var o1 =    '<nav class="navbar navbar-expand-lg fixed-top p-0" style="background-color: #EAEAEA">' +
				'    <span class="navbar-brand mr-auto">' +
				'       <a class="ui-title pl-2 mx-2 text-primary" style="text-decoration: none"' +
				'          id="po1"' +
				'	  data-container="body"' +
				'          onclick="if (typeof wsweb_quickmenu_toggle === \'function\')' +
				'	               wsweb_quickmenu_toggle();' +
				'	           return false;"' +
				'	  data-html="true"' +
				'	  data-placement="bottom">WepSIM&nbsp;<span class="badge badge-pill badge-secondary"><div class="wsversion">loading ...</div></span>' +
				'       </a>' +
				'    </span>' +
				'' +
				'    <button class="navbar-toggler ml-auto btn-outline-secondary" data-toggle="collapse"' +
				'            data-target="#navbarSupportedContent"' +
				'            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
				'	<em class="fas fa-bars"></em>' +
				'    </button>' +
				'' +
				'    <div id="navbarSupportedContent" class="collapse navbar-collapse mx-auto py-0 flex-row" style="background-color: #EAEAEA">' +
				'       <div class="navbar-nav nav-pills ml-auto col-md-8">' +
				'       <ul class="nav nav-pills ml-auto">' +
				'          <li class="nav-item ml-auto"><img alt="ARCOS logo" src="images/arcos.svg" style="height:30pt" class="img-fluid rounded m-0 p-1" /></li>' +
				'          <li class="nav-item ml-auto"><strong>.</strong></li>' +
				'          <li class="nav-item ml-auto"><img alt="Computer Science and Engineering Departament logo" src="images/dptoinf.png" style="height:28pt" class="img-fluid rounded m-0 p-0" /></li>' +
				'       </ul>' +
				'       </div>' +
				'    </div>' +
				'</nav>' ;

		    this.innerHTML = o1 ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
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

