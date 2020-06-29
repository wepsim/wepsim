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
         *  Load list
         */

        /* jshint esversion: 6 */
        class ws_executionbar extends HTMLElement
        {
              static get observedAttributes() 
	      {
	            return [ 'name' ] ;
	      }

	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( elto )
	      {
                    var o1   = '' ;
                    var name = this.getAttribute('name') ;

                    // load html
		    o1 += '<button id="btn_reset_' + name + '" ' +
                          '        style="background-color:#CCCCCC; border-color:white; border-width:1 1 1 1px;"' +
		          '        class="btn btn-light col"' +
			  '        onclick="wsweb_execution_reset();' +
	                  '                 return false;"' +
                          '><em class="fa fa-power-off"></em><strong><br/><span data-langkey="Reset">Reset</span></strong>' + 
                          '</button>' +
			  '<button id="btn_next_microinstruction_' + name + '"' +
                          '        style="background-color:#CCCCCC; border-color:white; border-width:1 1 1 1px;"' +
		          '        class="btn btn-light col user_microcode"' +
			  '        onclick="wsweb_execution_microinstruction();' +
                          '                 return false;"' +
                          '><em class="fa fa-step-forward"></em><strong><br/><span class="d-none d-sm-inline-flex" data-langkey="microInstruction">&#181;Instruction</span><span class="d-sm-none">&#181;Instr.</span></strong>' + 
                          '</button>' +
			  '<button id="btn_next_instruction_' + name + '"' +
                          '        style="background-color:#CCCCCC; border-color:white; border-width:1 1 1 1px;"' +
		          '        class="btn btn-light col"' +
			  '        onclick="wsweb_execution_instruction();' +
                          '                 return false;"' +
                          '><em class="fa fa-fast-forward"></em><strong><br/><span class="d-none d-sm-inline-flex" data-langkey="Instruction">Instruction</span><span class="d-sm-none">Instr.</span></strong>' + 
                          '</button>' +
			  '<button id="btn_run_stop_' + name + '"' +
                          '        style="background-color:#CCCCCC; border-color:white; border-width:1 1 1 1px;"' +
		          '        class="btn btn-light col"' +
                          '        onclick="wsweb_execution_run();' +
                          '                 return false;"' +
                          '><em class="fa fa-play"></em><strong><br/><span data-langkey="Run">Run</span></strong>' + 
                          '</button>' ;

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
            window.customElements.define('ws-executionbar', ws_executionbar) ;
        }


        /*
         *  Play/Stop button
         */

        var webui_start_button_color = 'rgb(51, 136, 204)' ;
        var  webui_stop_button_color = '#CCCCCC' ;

        function webui_button_set_stop ( name )
        {
	    var wsi     = get_cfg('ws_idiom') ;
            var run_tag = i18n_get('gui',wsi,'Run') ;

	    $('#btn_run_stop_' + name).html("<i class='fa fa-play'></i><br><b>" + run_tag + "</b>") ;
	    $('#btn_run_stop_' + name).css("backgroundColor", webui_stop_button_color) ;
        }

        function webui_button_set_start ( name )
        {
	    var wsi      = get_cfg('ws_idiom') ;
            var stop_tag = i18n_get('gui',wsi,'Stop') ;

	    $('#btn_run_stop_' + name).css("backgroundColor", webui_start_button_color) ;
	    $('#btn_run_stop_' + name).html("<i class='fa fa-stop'></i><br><b>" + stop_tag + "</b>") ;
        }

