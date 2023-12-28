/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Assembly Editor
         */

        /* jshint esversion: 6 */
        class ws_edit_as extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		   // parent
		   super();
	      }

              // render
	      render ( event_name )
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
                   // get layout value
                   var ly = [] ;
                   if (this.layout != null) {
                       ly = this.layout.trim().split(',') ;
                   }

                   // get id values
                   var ta_id = "inputAssembly" ;
                   var ed_id = "t4_asm" ;

                   // make HTML code
                   var o1 = this.render_layout(ly, ta_id, ed_id) ;
                   if (ly.includes('compilebar')) {
                       o1 = '<div id="edit_MP" ' +
                            '     style="width:inherit; overflow-y:auto; overflow-x:hidden;">' + o1 + '</div>' ;
                   }

                   // load HTML
                   this.innerHTML = o1 ;
	      }

              // Auxiliar methods
	      render_layout ( ly, ta_id, ed_id )
	      {
                   var o1 = "" ;

                   if (ly.includes('compilebar'))
                       o1 += ' <div class="row py-0 px-1">' +
                             '	 <div class="container col-12 pe-0" role="none">' +
                             '	 <div class="col-sm px-1" role="toolbar" aria-label="Assembly Toolbar">' +
                             '       <ws-compilationbar' +
                             '            icons="up"' +
                             '            components="btn_aloadsave,btn_acompile,btn_ashowbin"' +
                             '            class="btn-group m-1 d-flex flex-wrap"' +
                             '            aria-label="Assembly Toolbar buttons"></ws-compilationbar>' +
                             '	 </div>' +
                             '	 </div>' +
                             ' </div>' ;

                   if (ly.includes('placeholder'))
                       o1 += '<div id="' + ed_id + '_placeholder2" ' +
                             '     class="ui-body-d ui-content px-2 py-0" ' +
                             '     style="height:55vh; overflow-y:auto; -webkit-overflow-scrolling:touch;">' +
                             '</div>' ;

                   if (ly.includes('editor'))
                       o1 += '<div id="' + ed_id + '" class="ui-body-d ui-content p-0"' +
		   	     '	style="height:60vh; overflow-y:auto; -webkit-overflow-scrolling:touch;">' +
	                     this.render_textarea(ta_id) +
			     '</div>' ;

                   if (ly.includes('both'))
                       o1 += ' <div id="' + ed_id + '_placeholder1" ' +
                             '      class="ui-body-d ui-content px-2 py-0" ' +
                             '      style="height:75vh; overflow-y:auto; -webkit-overflow-scrolling:touch;">' +
			     ' <div id="' + ed_id + '" class="ui-body-d ui-content p-0">' +
	                     this.render_textarea(ta_id) +
			     ' </div>' +
			     ' </div>' ;

                   return o1 ;
	      }

	      render_textarea ( ta_id )
	      {
                   return '<label class="my-0" for="' + ta_id + '">' +
                          '<span data-langkey="assembly">assembly</span>:</label>' +
                          '<textarea aria-label="assembly"' +
			  '          style="min-width:90%; overflow-x:auto; -webkit-overflow-scrolling:touch;"' +
			  '          placeholder="Please select \'Load\' first to have the assembly code to work with."' +
			  '          id="' + ta_id + '" rows="20"></textarea>' ;
	      }
        }

        register_uielto('ws-edit-as', ws_edit_as) ;

