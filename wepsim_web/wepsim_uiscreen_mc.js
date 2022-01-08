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
         *  Microcode Screen
         */

        /* jshint esversion: 6 */
        class ws_uiscreen_mc extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		   // parent
		   super();
	      }

              // render
	      render ( )
	      {
                    // initialize render elements...
	            super.render() ;

                    // render current element
		    this.render_skel() ;
		    this.render_populate() ;
	      }

	      render_skel ( )
	      {
                   // make HTML code
                   var o1 = '' ;

                   // load HTML
                   this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
                   var o1 = '' ;

                   o1 += '    <h6 class="pt-3"><span data-langkey="Microcode">Microcode</span></h6>' +
			 '    <div class="row collapse show multi-collapse-1 p-1 m-0">' +
			 '' +
			 '	<div class="container col-12" role="none">' +
			 '	<div class="col-sm px-1"      role="toolbar" aria-label="MicroCode Toolbar">' +
			 '' +
			 '	      <div class="btn-group mr-2 my-1" role="group"' +
			 '		   aria-label="Toolbar Assembly, and Simulator buttons">' +
			 '		   <ws-toolbar components="switch_assembly,switch_simulator"></ws-toolbar>' +
			 '	      </div>' +
			 '' +
			 '	      <div class="btn-group mr-2 my-1" role="group"   aria-label="Toolbar load and save buttons">' +
			 '		   <ws-compilationbar icons="left" components="btn_mloadsave"></ws-compilationbar>' +
			 '	      </div>' +
			 '' +
			 '	      <div class="btn-group mr-2 my-1" role="group"   aria-label="Toolbar load and save buttons">' +
			 '		   <ws-compilationbar icons="left" components="btn_mcompile,btn_mshowbin"></ws-compilationbar>' +
			 '	      </div>' +
			 '' +
			 '	      <div class="btn-group mr-2 my-1" role="group"   aria-label="Toolbar load and save buttons">' +
			 '		    <button style="background-color: #D4DB17"' +
			 '			    class="btn btn-light shadow-sm col-auto"' +
			 '			    onclick="wsweb_dialog_open(\'help\');' +
			 '				     wepsim_help_set(\'relative\', \'simulator#help_firmware_format\');' +
			 '				     return false;"' +
			 '			    ><em class="fas fa-info-circle"></em>&nbsp;<strong><span data-langkey="Help">Help</span></strong></button>' +
			 '	      </div>' +
			 '' +
			 '	      <div class="btn-group mr-2 my-1">' +
			 '		   <ws-toolbar components="[,btn_config,btndd_action,]"></ws-toolbar>' +
			 '	      </div>' +
			 '' +
			 '	</div>' +
			 '	</div>' +
			 '' +
			 '    </div>' +
			 '' +
			 '    <ws-edit-mc layout="both"></ws-edit-mc>' ;

                   // load HTML
                   this.innerHTML = o1 ;
	      }
        }

        register_uielto('ws-screen-mc', ws_uiscreen_mc) ;

