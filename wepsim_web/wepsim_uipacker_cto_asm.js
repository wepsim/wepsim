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
         *  Navbar: navtab circuits/assembly
         */

        /* jshint esversion: 6 */
        class ws_ctoasm extends ws_uielto
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( event_name )
	      {
		    // html holder
		    var o1 = '<!-- Nav tabs -->' +
		             '<ul class="nav nav-tabs nav-justified nav-tabs">' +
		             '    <li class="nav-item wsx_microcode">' +
                             '        <a id="tab26" href="#eltos_cpu"' +
                             '           class="nav-link border-3 active" data-bs-toggle="tab" role="tab"' +
		             '		 aria-label="processor"' +
                             '           onclick="wsweb_change_show_processor();' +
                             '                    return false;">' +
                             '<em class="fas fa-microchip"></em>&nbsp;' +
                             '<span data-langkey="Processor">Processor</span>' +
                             '</a>' +
                             '    </li>' +
		             '    <li class="nav-item">' +
                             '        <a id="tab24" href="#eltos_dbg"' +
                             '           class="nav-link border-3" data-bs-toggle="tab" role="tab"' +
		             '		 aria-label="assembly debugger"' +
                             '           onclick="wsweb_change_show_asmdbg();' +
                             '                    return false;"><em class="fas fa-bug"></em>&nbsp;<span class="d-sm-none" data-langkey="Assembly">Assembly</span><span class="d-none d-sm-inline-flex" data-langkey="Assembly Debugger">Assembly Debugger</span></a>' +
                             '          </li>' +
		             '      </ul>' +
		             '\n' +
                             '<!-- Tab panes -->' +
                             '<div class="tab-content">' +
                             '  <div id="eltos_cpu" class="tab-pane active" role="tabpanel">' +
                             '     <ws-cpucu_got></ws-cpucu_got>' +
		             '  </div>' +
		             '\n' +
		             '  <div id="eltos_dbg" class="tab-pane" role="tabpanel">' +
		             '	   <ws-dbg-mp></ws-dbg-mp>' +
		             '  </div>' +
	    	             '</div>' ;

		    this.innerHTML = o1 ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-ctoasm', ws_ctoasm) ;
        }

