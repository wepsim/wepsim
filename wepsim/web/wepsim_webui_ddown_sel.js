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
         *  Drowndown (select part)
         */

        /* jshint esversion: 6 */
        class ws_ddown_sel extends HTMLElement
        {
              static get observedAttributes() 
	      {
	           return [ 'name', 'layout' ] ;
	      }

	      constructor ()
	      {
		   // parent
		   super();
	      }

	      get layout ( )
	      {
                   return this.getAttribute('layout') ;
	      }

	      set layout ( value )
	      {
                   this.setAttribute('layout', 'classic') ;
	      }

	      render ( elto )
	      {
  console.log(' >> ' + this.layout) ;

                   var o1  = '' ;

                   // set HTML
                   o1 += '    <button type="button" class="col-12 btn btn-light shadow-sm"' +
                         '	     data-toggle="tooltip" data-placement="bottom" data-html="true"' +
                         '	     title="This button refresh the details (and might move the scrollbar), <br>the dropdown on the right changes the element to show its details."' +
                         '	    style="border-color: #CCCCCC;"' +
                         '	    id="select5b"' +
                         '	    onclick="wsweb_select_refresh();' +
                         '		     return false;">Refresh</button>' +
                         '    <button id="dd2" type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split"' +
                         '	    style="border-color: #CCCCCC;"' +
                         '	    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                         '      <span class="sr-only">Toggle Dropdown</span>' +
                         '    </button>' +
                         '    <div class="dropdown-menu border border-secondary"' +
                         '	 style="height:55vh; overflow-y:auto !important; z-index:10000; -webkit-overflow-scrolling:touch;">' +
                         '' +
                         '      <h6 class="text-secondary mb-1">CPU</h6>' +
                         '      <a class="dropdown-item" href="#" id="s5b_11" value="11"' +
                         '	 onclick="wsweb_set_details(\'REGISTER_FILE\');' +
                         '		  return false;"><span class="bg-dark text-white">CPU</span>&nbsp;<span data-langkey=\'Registers\'>Registers</span></a>' +
                         '      <a class="dropdown-item user_microcode" href="#" id="s5b_16" value="16"' +
                         '	 onclick="wsweb_set_details(\'CONTROL_MEMORY\');' +
                         '		  return false;"><span class="bg-dark text-white">CPU</span>&nbsp;<span data-langkey=\'Control Memory\'>Control Memory</span></a>' +
                         '      <a class="dropdown-item" href="#" id="s5b_17" value="17"' +
                         '	 onclick="wsweb_set_details(\'CPU_STATS\');' +
                         '		  return false;"><span class="bg-dark text-white">CPU</span>&nbsp;<span data-langkey=\'Stats\'>Stats</span></a>' +
                         '' +
                         '      <div class="dropdown-divider m-1"></div>' +
                         '      <h6 class="text-secondary mb-1">Main Memory</h6>' +
                         '      <a class="dropdown-item" href="#" id="s5b_14" value="14"' +
                         '	 onclick="wsweb_set_details(\'MEMORY\');' +
                         '		  return false;"><span class="bg-dark text-white">MM</span>&nbsp;<span data-langkey=\'Memory\'>Memory</span></a>' +
                         '      <a class="dropdown-item" href="#" id="s5b_18" value="18"' +
                         '	 onclick="wsweb_set_details(\'MEMORY_CONFIG\');' +
                         '		  return false;"><span class="bg-dark text-white">MM</span>&nbsp;<span data-langkey=\'Configuration\'>Configuration</span></a>' +
                         '' +
                         '      <div class="dropdown-divider m-1"></div>' +
                         '      <h6 class="text-secondary mb-1">Devices</h6>' +
                         '      <a class="dropdown-item" href="#" id="s5b_12" value="12"' +
                         '	 onclick="wsweb_set_details(\'SCREEN\');' +
                         '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'Keyboard+Display\'>Keyboard+Display</span></a>' +
                         '      <a class="dropdown-item" href="#" id="s5b_15" value="15"' +
                         '	 onclick="wsweb_set_details(\'IO_STATS\');' +
                         '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'I/O Stats\'>I/O Stats</span></a>' +
                         '      <a class="dropdown-item" href="#" id="s5b_19" value="19"' +
                         '	 onclick="wsweb_set_details(\'IO_CONFIG\');' +
                         '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'I/O Configuration\'>I/O Configuration</span></a>' +
                         '      <a class="dropdown-item user_archived" href="#" id="s5b_25" value="25"' +
                         '	 onclick="wsweb_set_details(\'3DLED\');' +
                         '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'I/O 3D-Led\'>I/O 3D-Led</span></a>' +
                         '' +
                         '      <div class="dropdown-divider m-1"></div>' +
                         '      <h6 class="text-secondary mb-1">Simulation</h6>' +
                         '      <a class="dropdown-item" href="#" id="s5b_22" value="22"' +
                         '	 onclick="wsweb_set_details(\'HARDWARE\');' +
                         '		  return false;"><em class="fas fa-microchip"></em>&nbsp;Hardware</a>' ;
                   if (this.layout === 'classic') {
                   o1 += '      <a class="dropdown-item user_microcode" href="#" id="s5b_20" value="20"' +
                         '	 onclick="wsweb_set_details(\'FRM_EDITOR\');' +
                         '		  return false;"><span class="bg-dark text-white">Sim</span>&nbsp;MicroCode</a>' +
                         '      <a class="dropdown-item" href="#" id="s5b_21" value="21"' +
                         '	 onclick="wsweb_set_details(\'ASM_EDITOR\');' +
                         '		  return false;"><span class="bg-dark text-white">Sim</span>&nbsp;Assembly</a>' ;
                   }
                   o1 += '    </div>' ;

                   // load HTML
                   this.innerHTML = o1 ;
	      }

	      connectedCallback ()
	      {
		   this.render(this) ;
	      }

	      attributeChangedCallback (name, oldValue, newValue)
	      {
		   this.render(this) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-ddown-sel', ws_ddown_sel) ;
        }

