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
         *  MicroCode Editor
         */

        /* jshint esversion: 6 */
        class ws_edit_mc extends ws_uielto
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
                   var o1 = '' ;

                   // load HTML
                   this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
                   var o1 = '' ;

                   var ly = 'placeholder' ;
                   if (this.layout != null)
                       ly = this.layout.trim() ;

                   // make HTML code
                   o1  = '<div id="edit_MC" style="width: inherit; overflow-y: auto; overflow-x:hidden;">' +
                         '' +
                         '    <div class="row p-0">' +
                         '	   <div class="container col-12 pr-0" role="none">' +
                         '	   <div class="col-sm px-1" role="toolbar" ' + 
                         '              aria-label="MicroCode Toolbar">' +
                         '              <ws-compilationbar' +
                         '                  icons="up"' +
                         '                  components="btn_mloadsave,btn_mcompile,btn_mshowbin"' +
                         '                  class="btn-group m-1 d-flex flex-wrap"' +
                         '                  aria-label="MicroCode Toolbar buttons"></ws-compilationbar>' +
                         '	   </div>' +
                         '	   </div>' +
                         '    </div>' +
                         '' ;

                   if (ly == 'placeholder')
                   o1 += '    <div id="t3_firm_placeholder2" ' + 
                         '         class="ui-body-d ui-content px-2 py-0" ' + 
                         '         style="height:55vh; overflow-y:auto; -webkit-overflow-scrolling:touch;">' +
                         '    </div>' +
                         '' ;
                   else
                   o1 += '    <div id="t3_firm" class="ui-body-d ui-content p-0"' +
			 '	   style="height:60vh; overflow-y:auto; -webkit-overflow-scrolling:touch;">' +
			 '	   <label class="my-0" for="inputFirmware"><span data-langkey="microcode">microcode</span>:</label>' +
			 '	   <textarea aria-label="microcode"' +
			 '		     style="min-width:90%; overflow-x:auto; -webkit-overflow-scrolling:touch;"' +
			 '		     placeholder="Please select \'Example\' or \'Load\' first in order to have an initial Microcode."' +
			 '		     id="inputFirmware" rows="20"></textarea>' +
                         '    </div>' +
                         '' ;

                   o1 += '</div>' ;

                   // load HTML
                   this.innerHTML = o1 ;
	      }
        }

        register_uielto('ws-edit-mc', ws_edit_mc) ;

