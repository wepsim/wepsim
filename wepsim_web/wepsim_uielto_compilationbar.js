/*
 *  Copyright 2015-2026 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Compilation bar
         */

        /* jshint esversion: 6 */
        class ws_compilationbar extends ws_uielto
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
                    // render toolbar container
                    var o1 = '' ;
                    this.innerHTML = o1 ;
	      }

	      render_populate ( )
              {
                    // render toolbar elements
                    var o1 = '' ;
                    for (var i=0; i<this.components_arr.length; i++)
                    {
                         var name = this.components_arr[i] ;
                         o1 += this.render_btns(name) ;
                    }

                    this.innerHTML = o1 ;
	      }

              render_icon ( icon_html )
              {
                    var o = '' ;

                    o += (this.icons_str == 'no') ? ''     : icon_html ;
                    o += (this.icons_str == 'up') ? '<br>' : '&nbsp;' ;

                    return o ;
              }

	      render_btns ( name )
	      {
                    var o = '' ;

                    // load html
                    switch (name)
                    {
                       case "btn_mloadsave":
			     o += '<div class="btn-group col-auto my-1 mx-1 p-0" style="flex-grow:6;"> ' +
                                  '<button type="button" ' +
                                  '        id="select8d"' +
                                  '        data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true"' +
                                  '        data-action="txt_file"' +
                                  '        title="Dropdown on the right let you access to common actions."' +
                                  '        onclick="var action = $(\'#select8d\').attr(\'data-action\');' +
                                  '                 wsweb_dialog_open(\'load_save_firmware\'); ' +
                                  '                 return true;"' +
			          '	   class="btn bg-body-tertiary shadow-sm col-auto m-0 border border-secondary">' ;
                             o += this.render_icon('<em class="fas fa-file"></em>') ;
                             o += '<span class="fw-bold" data-langkey="Load/Save">Load/Save</span>' +
                                  '</button>' +
                                  '   <button id="dd8a" type="button" ' +
                                  '           class="btn bg-body-tertiary dropdown-toggle dropdown-toggle-split border border-secondary"' +
                                  '           data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                  '     <span class="visually-hidden sr-only">Toggle Dropdown</span>' +
                                  '   </button>' +
                                  '   <div id="action_menu1"' +
                                  '        class="dropdown-menu border border-secondary p-2">' +
                                  '\n' +
                                  '     <h6 class="dropdown-header p-0">Default:</h6>' +
                                  '     <a class="dropdown-item py-1" href="#" id="loadsave_txt_file"   value="txt_file"' +
                                  '        onclick="wsweb_dialog_open(\'load_save_firmware\');' +
                                  '               return false;"><span data-langkey="As text file...">As text file...</span></a>' +
                                  '     <div class="dropdown-divider"></div>' +
                                  '\n' +
                                  '     <h6 class="dropdown-header p-0">Option 1:</h6>' +
                                  '     <a class="dropdown-item py-1" href="#" id="loadsave_link"       value="link"' +
                                  '        onclick="wsweb_dialog_open(\'load_save_firmware_link\');' +
                                  '               return false;"><span data-langkey="As link...">As link...</span></a>' +
                                  '     <div class="dropdown-divider"></div>' +
                                  '\n' +
                                  '     <h6 class="dropdown-header p-0">Option 2:</h6>' +
                                  '     <a class="dropdown-item py-1" href="#" id="loadsave_checkpoint" value="checkpoint"' +
                                  '        onclick="wsweb_select_action(\'checkpoint\');' +
                                  '               return false;"><span data-langkey="Inside a checkpoint...">Inside a checkpoint...</span></a>' +
                                  '\n' +
                                  '   </div>' +
                                  '</div>' ;
                             break ;

                       case "btn_mcompile":
			     o += '<button id="mcc1"' +
		                  '        class="btn bg-secondary-subtle shadow-sm col-auto mx-1 border border-secondary"' +
			          '	   data-transition="none" data-inline="true"' +
			          '	   onclick="wsweb_firmware_compile();' +
                                  '                 return false;">' ;
                             o += this.render_icon('<em class="fa fa-sign-out-alt"></em>') ;
                             o += '<strong><span class="d-none d-sm-inline-flex">&#181;<span data-langkey="compile">compile</span></span><span class="d-sm-none">&#181;c.</span></strong>' +
                                  '</button>' ;
                             break ;

                       case "btn_mshowbin":
			     o += '<button style="background-color: #DDDDDD"' +
		                  '        id="mob1"' +
		                  '        class="btn bg-body-tertiary shadow-sm col-auto mx-1 border border-secondary"' +
			          '	   onclick="wsweb_dialog_open(\'binary_fir\');' +
                                  '                 return false;">' ;
                             o += this.render_icon('<em class="fa fa-memory"></em>') ;
                             o += '<strong><span class="d-none d-sm-inline-flex"><span data-langkey="Show">Show</span>&nbsp;co2&#181;a.+c.m.</span><span class="d-sm-none">co2&#181;addr+c.m.</span></strong>' +
                                  '</button>' ;
                             break ;

                       case "btn_aloadsave":
			     o += '<div class="btn-group col-auto my-1 mx-1 p-0" style="flex-grow:6;"> ' +
                                  '<button type="button" ' +
                                  '        id="select8b"' +
                                  '        data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true"' +
                                  '        data-action="txt_file"' +
                                  '        title="Dropdown on the right let you access to common actions."' +
                                  '        onclick="var action = $(\'#select8b\').attr(\'data-action\');' +
                                  '                 wsweb_dialog_open(\'load_save_assembly\'); ' +
                                  '                 return true;"' +
			          '	   class="btn bg-body-tertiary shadow-sm col-auto m-0 border border-secondary">' ;
                             o += this.render_icon('<em class="fas fa-file"></em>') ;
                             o += '<span class="fw-bold" data-langkey="Load/Save">Load/Save</span>' +
                                  '</button>' +
                                  '   <button id="dd8a" type="button" ' +
                                  '           class="btn bg-body-tertiary dropdown-toggle dropdown-toggle-split border border-secondary"' +
                                  '           data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                  '     <span class="visually-hidden sr-only">Toggle Dropdown</span>' +
                                  '   </button>' +
                                  '   <div id="action_menu1"' +
                                  '        class="dropdown-menu border border-secondary p-2">' +
                                  '\n' +
                                  '     <h6 class="dropdown-header p-0">Default:</h6>' +
                                  '     <a class="dropdown-item py-1" href="#" id="loadsave_txt_file"   value="txt_file"' +
                                  '        onclick="wsweb_dialog_open(\'load_save_assembly\');' +
                                  '               return false;"><span data-langkey="As text file...">As text file...</span></a>' +
                                  '     <div class="dropdown-divider"></div>' +
                                  '\n' +
                                  '     <h6 class="dropdown-header p-0">Option 1:</h6>' +
                                  '     <a class="dropdown-item py-1" href="#" id="loadsave_link"       value="link"' +
                                  '        onclick="wsweb_dialog_open(\'load_save_assembly_link\');' +
                                  '               return false;"><span data-langkey="As link...">As link...</span></a>' +
                                  '     <div class="dropdown-divider"></div>' +
                                  '\n' +
                                  '     <h6 class="dropdown-header p-0">Option 2:</h6>' +
                                  '     <a class="dropdown-item py-1" href="#" id="loadsave_checkpoint" value="checkpoint"' +
                                  '        onclick="wsweb_select_action(\'checkpoint\');' +
                                  '               return false;"><span data-langkey="Inside a checkpoint...">Inside a checkpoint...</span></a>' +
                                  '\n' +
                                  '   </div>' +
                                  '</div>' ;
                             break ;

                       case "btn_acompile":
		             o += '<button id="acc1"' +
		                  '        class="btn bg-secondary-subtle shadow-sm col-auto mx-1 border border-secondary"' +
			          '	   data-transition="none" data-inline="true"' +
			          '	   onclick="wsweb_assembly_compile();' +
                                  '                 return false;">' ;
                             o += this.render_icon('<em class="fas fa-sign-out-alt"></em>') ;
                             o += '<strong><span data-langkey="Compile">Compile</span></strong>' +
                                  '</button>' ;
                             break ;

                       case "btn_ashowbin":
		             o += '<button style="background-color: #DDDDDD"' +
                                  '        id="aob1"' +
		                  '        class="btn bg-body-tertiary shadow-sm col-auto mx-1 border border-secondary"' +
			          '	     onclick="wsweb_dialog_open(\'binary_asm\');' +
                                  '                   return false;">' ;
                             o += this.render_icon('<em class="fas fa-memory"></em>') ;
                             o += '<strong><span class="d-none d-sm-inline-flex"><span data-langkey="Show Main Memory">Show Main Memory</span></span><span class="d-sm-none">Main Mem.</span></strong></button>' ;
                             break ;
                    }

                    return o ;
	      }
        }

        register_uielto('ws-compilationbar', ws_compilationbar) ;

