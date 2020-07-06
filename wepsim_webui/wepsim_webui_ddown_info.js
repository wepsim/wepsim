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
         *  Dropdown (information part)
         */

        /* jshint esversion: 6 */
        class ws_ddown_info extends HTMLElement
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

	      render ( )
	      {
                   var o1  = '' ;

                   // (1/2) <nav list part>
                   o1 += '<ul class="nav nav-tabs" id="tabs1" role="tablist" style="display:none;">' +
                         '  <li class="nav-item">' +
                         '  <a class="nav-link active" role="tab" aria-controls="home" aria-selected="true"' +
                         '     data-toggle="tab" id="tab14" href="#mp">Memory</a>' +
                         '  </li>' +
                         '  <li class="nav-item">' +
                         '  <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '     data-toggle="tab" id="tab12" href="#con">Console</a>' +
                         '  </li>' +
                         '  <li class="nav-item">' +
                         '  <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '     data-toggle="tab" id="tab11" href="#all">Registers</a>' +
                         '  </li>' +
                         '  <li class="nav-item">' +
                         '  <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '     data-toggle="tab" id="tab16" href="#mc">Control Memory</a>' +
                         '  </li>' +
                         '  <li class="nav-item">' +
                         '  <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '     data-toggle="tab" id="tab13" href="#config">Configuration</a>' +
                         '  </li>' +
                         '  <li class="nav-item">' +
                         '  <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '     data-toggle="tab" id="tab15" href="#io">IO stats</a>' +
                         '  </li>' +
                         '  <li class="nav-item">' +
                         '  <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '     data-toggle="tab" id="tab17" href="#cpu">CPU stats</a>' +
                         '  </li>' +
                         '  <li class="nav-item">' +
                         '  <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '     data-toggle="tab" id="tab18" href="#mpcfg">Memory configuration</a>' +
                         '  </li>' +
                         '  <li class="nav-item">' +
                         '  <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '     data-toggle="tab" id="tab19" href="#iocfg">I/O configuration</a>' +
                         '  </li>' +
                         '  <li class="nav-item">' +
                         '  <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '     data-toggle="tab" id="tab22" href="#ed_hw">Hardware</a>' +
                         '  </li>' +
                         '  <li class="nav-item user_archived">' +
                         '  <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '     data-toggle="tab" id="tab25" href="#iol3d">3D Led</a>' +
                         '  </li>' ;
                   if (this.layout !== 'compact') {
                   o1 += '  <li class="nav-item">' +
                         '      <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '         data-toggle="tab" id="tab20" href="#ed_mc">MicroCode</a>' +
                         '  </li>' +
                         '  <li class="nav-item user_microcode">' +
                         '      <a class="nav-link" role="tab" aria-controls="home" aria-selected="true"' +
                         '         data-toggle="tab" id="tab21" href="#ed_mp">Assembly</a>' +
                         '  </li>' ;
                   }
                   o1 += '  </ul>' ;

                   // (2/2) <nav list part>
                   o1 += '  <div class="tab-content mt-3">' +
                         '	 <div class="tab-pane mx-0 my-2 active" role="tabpanel" id="all">' +
                         '		 <div id="states_ALL" style="width:inherit; overflow-y:auto;"' +
                         '		      class="container container-fluid px-1 pb-1"></div>' +
                         '		 <div id="states_BR" style="width: inherit; overflow-y: auto;"' +
                         '		      class="container container-fluid px-1 pt-1"></div>' +
                         '	 </div>' +
                         '	 <div class="tab-pane mx-2 my-2" role="tabpanel" id="mp">' +
                         '	      <ws-mainmemory></ws-mainmemory>' +
                         '	 </div>' +
                         '	 <div class="tab-pane mx-2 my-2" role="tabpanel" id="mc">' +
                         '	      <ws-dbg-mc></ws-dbg-mc>' +
                         '	 </div>' +
                         '	 <div class="tab-pane mx-2 my-2" role="tabpanel" id="con">' +
                         '	      <ws-console></ws-console>' +
                         '	 </div>' +
                         '	 <div class="tab-pane mx-2 my-2" role="tabpanel" id="io">' +
                         '	      <ws-io-info id="ioinfo1"></ws-io-info>' +
                         '	 </div>' +
                         '	 <div class="tab-pane mx-2 my-2" role="tabpanel" id="cpu">' +
                         '	      <ws-cpu id="cpu1"></ws-cpu>' +
                         '	 </div>' +
                         '	 <div class="tab-pane mx-2 my-2" role="tabpanel" id="mpcfg">' +
                         '	      <ws-mem-config id="memcfg1"></ws-mem-config>' +
                         '	 </div>' +
                         '	 <div class="tab-pane mx-2 my-2" role="tabpanel" id="iocfg">' +
                         '	      <ws-io-config id="iocfg1"></ws-io-config>' +
                         '	 </div>' +
                         '	 <div class="tab-pane mx-2 my-2" role="tabpanel" id="iol3d">' +
                         '	      <ws-l3d id="l3d1"></ws-l3d>' +
                         '	 </div>' +
                         '	 <div class="tab-pane mx-2 my-2" role="tabpanel" id="ed_hw">' +
                         '	      <div id="config_HW" style="height:58vh; width: inherit; overflow-y: scroll; -webkit-overflow-scrolling: touch;"></div>' +
                         '       </div>' ;
                   if (this.layout === 'compact') {
                   o1 += '<div class="tab-pane mx-2 my-2" role="tabpanel" id="ed_mc">' +
			 '</div>' ;
                   }
                   else {
                   o1 += ' <div class="tab-pane mx-2 my-2" role="tabpanel" id="ed_mc">' +
                         '      <div id="edit_MC" style="width: inherit; overflow-y: auto; overflow-x:hidden;">' +
                         '' +
                         '	    <div class="row p-0">' +
                         '		<div class="container col-12 pr-0" role="none">' +
                         '		<div class="col-sm px-1" role="toolbar" ' + 
                         '                   aria-label="MicroCode Toolbar">' +
                         '                 <ws-compilationbar' +
                         '                     icons="up"' +
                         '                     components="btn_mloadsave,btn_mcompile,btn_mshowbin"' +
                         '                     class="btn-group m-1 d-flex flex-wrap"' +
                         '                     aria-label="MicroCode Toolbar buttons"></ws-compilationbar>' +
                         '		</div>' +
                         '		</div>' +
                         '	    </div>' +
                         '' +
                         '	    <div id="t3_firm_placeholder2" ' + 
                         '               class="ui-body-d ui-content px-2 py-0" ' + 
                         '               style="height:55vh; overflow-y:auto; -webkit-overflow-scrolling:touch;">' +
                         '	    </div>' +
                         '' +
                         '      </div>' +
                         ' </div>' ;
                   }
                   if (this.layout === 'compact') {
                   o1 += '<div class="tab-pane mx-2 my-2" role="tabpanel" id="ed_mp">' +
			 '</div>' ;
                   }
                   else {
                   o1 += ' <div class="tab-pane mx-2 my-2" role="tabpanel" id="ed_mp">' +
                         '      <div id="edit_MP" style="width: inherit; overflow-y: auto; overflow-x:hidden;">' +
                         '' +
                         '	    <div class="row py-0 px-1">' +
                         '		<div class="container col-12 pr-0" role="none">' +
                         '		<div class="col-sm px-1" role="toolbar" aria-label="Assembly Toolbar">' +
                         '                   <ws-compilationbar' +
                         '                       icons="up"' +
                         '                       components="btn_aloadsave,btn_acompile,btn_ashowbin"' +
                         '                       class="btn-group m-1 d-flex flex-wrap"' +
                         '                       aria-label="Assembly Toolbar buttons"></ws-compilationbar>' +
                         '		</div>' +
                         '		</div>' +
                         '	    </div>' +
                         '' +
                         '	    <div id="t4_asm_placeholder2" class="ui-body-d ui-content px-2 py-0" style="height:55vh; overflow-y:auto; -webkit-overflow-scrolling:touch;">' +
                         '	    </div>' +
                         '' +
                         '      </div>' +
                         ' </div>' ;
                   }
                   o1 += '  </div>' ;

                   // load HTML
                   this.innerHTML = o1 ;
	      }

	      connectedCallback ()
	      {
                   this.name   = '' ;
                   this.layout = 'classic' ;

		   this.render() ;
	      }

	      attributeChangedCallback (name, oldValue, newValue)
	      {
		   this.render() ;
	      }

	      get layout ( )
	      {
                   return this.getAttribute('layout') ;
	      }

	      set layout ( value )
	      {
                   this.setAttribute('layout', value) ;
	      }

	      get name ( )
	      {
                   return this.getAttribute('name') ;
	      }

	      set name ( value )
	      {
                   this.setAttribute('name', value) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-ddown-info', ws_ddown_info) ;
        }

