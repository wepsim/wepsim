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
	           return [ 'name', 'components' ] ;
	      }

	      constructor ()
	      {
		   // parent
		   super() ;

                   // pre-render components
	           this.ni = this.mk_items_hash() ;
	      }

              update_internal_attributes ( )
              {
                    // components
                    this.components_str = this.getAttribute('components') ;
                    if (this.components_str === null)
                        this.components_str = '' ;
                    this.components_arr = this.components_str.split(',') ;
              }

	      render ( )
	      {
                   // get updated attributes
                   this.update_internal_attributes() ;

                   // render ddown elements
                   var o1  = '' ;

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
                         '      <h6 class="text-secondary mb-1">CPU</h6>' ;

                   if (this.components_arr.indexOf('all') !== -1)
                       o1 += this.ni.all ;
                   if (this.components_arr.indexOf('mc') !== -1)
                       o1 += this.ni.mc ;
                   if (this.components_arr.indexOf('cpu') !== -1)
                       o1 += this.ni.cpu ;

                   o1 += '' +
                         '      <div class="dropdown-divider m-1"></div>' +
                         '      <h6 class="text-secondary mb-1">Main Memory</h6>' ;

                   if (this.components_arr.indexOf('mp') !== -1)
                       o1 += this.ni.mp ;
                   if (this.components_arr.indexOf('mpcfg') !== -1)
                       o1 += this.ni.mpcfg ;

                   o1 += '' +
                         '      <div class="dropdown-divider m-1"></div>' +
                         '      <h6 class="text-secondary mb-1">Devices</h6>' ;

                   if (this.components_arr.indexOf('con') !== -1)
                       o1 += this.ni.con ;
                   if (this.components_arr.indexOf('io') !== -1)
                       o1 += this.ni.io ;
                   if (this.components_arr.indexOf('iocfg') !== -1)
                       o1 += this.ni.iocfg ;
                   if (this.components_arr.indexOf('iol3d') !== -1)
                       o1 += this.ni.iol3d ;

                   o1 += '' +
                         '      <div class="dropdown-divider m-1"></div>' +
                         '      <h6 class="text-secondary mb-1">Simulation</h6>' ;

                   if (this.components_arr.indexOf('ed_hw') !== -1)
                       o1 += this.ni.ed_hw ;

                   // classic -> + ed_mc + ed_mp
                   if (this.components_arr.indexOf('ed_mc') !== -1)
                       o1 += this.ni.ed_mc ;
                   if (this.components_arr.indexOf('ed_mp') !== -1)
                       o1 += this.ni.ed_mp ;

                   o1 += '</div>' ;

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

	      get components ( )
	      {
                   return this.getAttribute('components') ;
	      }

	      set components ( value )
	      {
                   this.setAttribute('components', value) ;
	      }

	      get name ( )
	      {
                   return this.getAttribute('name') ;
	      }

	      set name ( value )
	      {
                   this.setAttribute('name', value) ;
	      }


              //
              // Auxiliar to render()
              //

	      mk_items_hash ()
	      {
                   var ni = {} ;

                   ni.all   = ' <a class="dropdown-item" href="#" id="s5b_11" value="11"' +
                              '	 onclick="wsweb_set_details(\'REGISTER_FILE\');' +
                              '		  return false;"><span class="bg-dark text-white">CPU</span>&nbsp;<span data-langkey=\'Registers\'>Registers</span></a>' ;
                   ni.mc    = ' <a class="dropdown-item user_microcode" href="#" id="s5b_16" value="16"' +
                              '	 onclick="wsweb_set_details(\'CONTROL_MEMORY\');' +
                              '		  return false;"><span class="bg-dark text-white">CPU</span>&nbsp;<span data-langkey=\'Control Memory\'>Control Memory</span></a>' ;
                   ni.cpu   = ' <a class="dropdown-item" href="#" id="s5b_17" value="17"' +
                              '	 onclick="wsweb_set_details(\'CPU_STATS\');' +
                              '		  return false;"><span class="bg-dark text-white">CPU</span>&nbsp;<span data-langkey=\'Stats\'>Stats</span></a>' ;
                   ni.mp    = ' <a class="dropdown-item" href="#" id="s5b_14" value="14"' +
                              '	 onclick="wsweb_set_details(\'MEMORY\');' +
                              '		  return false;"><span class="bg-dark text-white">MM</span>&nbsp;<span data-langkey=\'Memory\'>Memory</span></a>' ;
                   ni.mpcfg = '      <a class="dropdown-item" href="#" id="s5b_18" value="18"' +
                              '	 onclick="wsweb_set_details(\'MEMORY_CONFIG\');' +
                              '		  return false;"><span class="bg-dark text-white">MM</span>&nbsp;<span data-langkey=\'Configuration\'>Configuration</span></a>' ;
                   ni.con   = '      <a class="dropdown-item" href="#" id="s5b_12" value="12"' +
                              '	 onclick="wsweb_set_details(\'SCREEN\');' +
                              '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'Keyboard+Display\'>Keyboard+Display</span></a>' ;
                   ni.io    = '      <a class="dropdown-item" href="#" id="s5b_15" value="15"' +
                              '	 onclick="wsweb_set_details(\'IO_STATS\');' +
                              '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'I/O Stats\'>I/O Stats</span></a>' ;
                   ni.iocfg = '      <a class="dropdown-item" href="#" id="s5b_19" value="19"' +
                              '	 onclick="wsweb_set_details(\'IO_CONFIG\');' +
                              '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'I/O Configuration\'>I/O Configuration</span></a>' ;
                   ni.iol3d = '      <a class="dropdown-item user_archived" href="#" id="s5b_25" value="25"' +
                              '	 onclick="wsweb_set_details(\'3DLED\');' +
                              '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'I/O 3D-Led\'>I/O 3D-Led</span></a>' ;
                   ni.ed_hw = '      <a class="dropdown-item" href="#" id="s5b_22" value="22"' +
                              '	 onclick="wsweb_set_details(\'HARDWARE\');' +
                              '		  return false;"><em class="fas fa-microchip"></em>&nbsp;Hardware</a>' ;


                   ni.ed_mc = '      <a class="dropdown-item user_microcode" href="#" id="s5b_20" value="20"' +
                              '	 onclick="wsweb_set_details(\'FRM_EDITOR\');' +
                              '		  return false;"><span class="bg-dark text-white">Sim</span>&nbsp;MicroCode</a>' ;
                   ni.ed_mp = '      <a class="dropdown-item" href="#" id="s5b_21" value="21"' +
                              '	 onclick="wsweb_set_details(\'ASM_EDITOR\');' +
                              '		  return false;"><span class="bg-dark text-white">Sim</span>&nbsp;Assembly</a>' ;

                   return ni ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-ddown-sel', ws_ddown_sel) ;
        }

