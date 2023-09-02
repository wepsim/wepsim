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
         *  Navbar: navtab simulator/microcode/assembly
         */

        /* jshint esversion: 6 */
        class ws_simmicasm extends ws_uielto
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
			     '<nav>' +
			     '  <div class="nav nav-tabs nav-justified nav-tabs" id="nav-tab" role="tablist">' +
			     '    <a class="nav-item nav-link active" id="nav-simulation-tab"' +
			     '       style="border-top-width:2px; border-right-width:2px; border-left-width:2px;"' +
			     '       data-bs-toggle="tab" href="#nav-simulation" role="tab"' +
			     '       aria-controls="nav-home" aria-selected="true">' +
			     '<span class="d-none d-sm-inline-flex" data-langkey="Simulation">Simulation</span><span class="d-sm-none">Sim.</span></a>' +
			     '    <a class="nav-item nav-link wsx_microcode"    id="nav-microcode-tab" data-oldid="s5b_20"' +
			     '       style="border-top-width:2px; border-right-width:2px; border-left-width:2px;"' +
			     '       onclick="setTimeout(function(){ inputfirm.refresh(); }, 200) ;' +
			     '                return false;"' +
			     '       data-bs-toggle="tab" href="#nav-microcode" role="tab"' +
			     '       aria-controls="nav-profile" aria-selected="false">' +
			     '<span class="d-none d-sm-inline-flex" data-langkey="MicroCode">MicroCode</span><span class="d-sm-none">&#181;code</span></a>' +
			     '    <a class="nav-item nav-link"        id="nav-assembly-tab"  data-oldid="s5b_21"' +
			     '       style="border-top-width:2px; border-right-width:2px; border-left-width:2px;"' +
			     '       onclick="setTimeout(function(){ inputasm.refresh(); }, 200) ;' +
			     '                return false;"' +
			     '       data-bs-toggle="tab" href="#nav-assembly" role="tab"' +
			     '       aria-controls="nav-contact" aria-selected="false">' +
			     '<span class="d-none d-sm-inline-flex" data-langkey="Assembly">Assembly</span><span class="d-sm-none">Asm.</span></a>' +
			     '  </div>' +
			     '</nav>' +
			     '' +
			     '<div class="tab-content p-1" id="nav-tabContent">' +
			     '  <div class="tab-pane fade show active" id="nav-simulation" role="tabpanel" aria-labelledby="nav-simulation-tab">' +
			     '' +
			     '    <div class="px-1 pt-1">' +
			     '    <ws-executionbar name="exebar1" class="btn-toolbar btn-block"' +
			     '		           components="btn_reset,btn_emins,btn_eins,btn_rnf"' +
			     '		           icons="up" role="toolbar"></ws-executionbar>' +
			     '    </div>' +
			     '' +
			     '    <div class="px-1 pt-1">' +
			     '    <div class="btn-toolbar btn-block" role="toolbar">' +
			     '    <ws-ddown-sel class="col btn-group p-0" style="flex-grow:6;"' +
			     '    	        components="mp,con,all,mc,io,cpu,mpcfg,iocfg,iol3d,ioldm,cm,cmcfg"></ws-ddown-sel>' +
			     '    </div>' +
			     '    </div>' +
			     '' +
			     '    <ws-ddown-info components="mp,con,all,mc,io,cpu,mpcfg,iocfg,iol3d,ioldm,cm,cmcfg"></ws-ddown-info>' +
			     '  </div>' +
			     '' +
			     '  <div class="tab-pane fade wsx_microcode" id="nav-microcode" role="tabpanel" ' +
			     '       aria-labelledby="nav-microcode-tab">' +
			     '       <ws-edit-mc layout="compilebar,editor"></ws-edit-mc>' +
			     '  </div>' +
			     '' +
			     '  <div class="tab-pane fade" id="nav-assembly" role="tabpanel" ' +
			     '       aria-labelledby="nav-assembly-tab">' +
			     '       <ws-edit-as layout="compilebar,editor"></ws-edit-as>' +
			     '  </div>' +
			     '' +
			     '  </div>' +
			     '</div>' ;

		    this.innerHTML = o1 ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-simmicasm', ws_simmicasm) ;
        }

