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
         *  Tool bar
         */

        /* jshint esversion: 6 */
        class ws_toolbar extends HTMLElement
        {
              static get observedAttributes() 
	      {
	            return [ 'name', 'components' ] ;
	      }

	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( )
	      {
                    var o1  = '' ;

                    var components_str = this.getAttribute('components') ;
                    var components = components_str.split(',') ;
                    for (var i=0; i<components.length; i++)
                    {
			 switch (components[i]) 
			 {
			      case "switch_microcode":
				   o1 += this.render_switch_microcode();
				   break;
			      case "switch_assembly":
				   o1 += this.render_switch_assembly();
				   break;
			      case "switch_simulator":
				   o1 += this.render_switch_simulator();
				   break;
			      case "slider_cpucu":
				   o1 += this.render_slider_cpucu();
				   break;
			      case "slider_c1c2":
				   o1 += this.render_slider_c1c2();
				   break;
			      case "btn_examples":
				   o1 += this.render_btn_examples();
				   break;
			      case "btn_help":
				   o1 += this.render_btn_help();
				   break;
			      case "btn_config":
				   o1 += this.render_btn_config();
				   break;
			      case "btndd_action":
				   o1 += this.render_btndd_action();
				   break;
			      case "btndd_mode":
				   o1 += this.render_btndd_mode();
				   break;
			      case "[":
				   o1 += '<div class="col-sm-auto p-1">' +
					 '<div class="btn-toolbar btn-block" role="toolbar">' ;
				   break;
			      case "]":
				   o1 += '</div>' +
					 '</div>' ;
				   break;
			      default:
				   break;
			 }
                    }

                    this.innerHTML = o1 ;
	      }

	      render_switch_microcode ( )
	      {
		 return '<button class="btn btn-light shadow-sm col-auto m-0 user_microcode"' +
		        '        style="border-width:1 1 1 1px; border-color: #CCCCCC;"' +
                        '        id="btn_micro1"' +
		        '        data-toggle="tooltip" data-placement="bottom" data-html="true"' +
		        '        title="This button switches into the \'Microcode\' editor."' +
                        '        onclick="wsweb_change_workspace_microcode();' +
		        '	          $(\'[data-toggle=tooltip]\').tooltip(\'hide\');' +
		        '	          return false;"' +
		        '><strong><span class="d-none d-sm-inline-flex" ' + 
                        ' data-langkey=\'MicroCode\'>MicroCode</span><span class="d-sm-none">&#181;code</span></strong></button>' ;
	      }

	      render_switch_assembly ( )
	      {
		 return '<button class="btn btn-light shadow-sm col-auto m-0"' +
		        '        style="border-width:1 1 1 1px; border-color: #CCCCCC;"' +
                        '        id="btn_asm1"' +
			'        data-toggle="tooltip" data-placement="bottom" data-html="true"' +
			'        title="This button switches into the \'Assembly\' editor."' +
                        '        onclick="wsweb_change_workspace_assembly();' +
			'	          $(\'[data-toggle=tooltip]\').tooltip(\'hide\');' +
			'		  return false;"' +
			'><strong><span class="d-none d-sm-inline-flex" data-langkey=\'Assembly\'>Assembly</span><span class="d-sm-none" data-langkey=\'Assembly\'>Assembly</span></strong></button>' ;
	      }

	      render_switch_simulator ( )
	      {
		 return '<button class="btn btn-light shadow-sm col-auto m-0"' +
                        '        style="border-width:1 1 1 1px; border-color: #CCCCCC;"' +
			'        data-toggle="tooltip" data-placement="bottom" data-html="true"' +
                        '        data-transition="none" data-inline="true"' + 
			'        title="This button switches into the \'Simulator\' workspace."' +
                        '        onclick="wsweb_change_workspace_simulator();' +
			'	          $(\'[data-toggle=tooltip]\').tooltip(\'hide\');' +
			'		  return false;"' +
                        '><strong><span data-langkey=\'Simulator\'>Simulator</span></strong></button>' ;
	      }

	      render_slider_cpucu ( )
	      {
		 return '<form id="slider2f" class="full-width-slider row-auto mt-0 p-0 pt-0 pb-2">' +
			'	<label class="my-0" for="slider2b" style="min-width:95%"><span data-langkey=\'processor\'>processor</span>:</label>' +
			'	<input aria-label="Show CPU/CU" type="range" name="slider2b" id="slider2b"' +
			'		min="0" max="14" value="7" step="1"' +
			'	        data-show-value="false"' +
                        '               class="custom-range slider col mx-0 px-0"' +
                        '               oninput="wsweb_set_cpucu_size(this.value);' +
                        '                        return false;">' +
			'</form>' ;
	      }

	      render_slider_c1c2 ( )
	      {
		 return '<form id="slider2e" class="full-width-slider row-auto mt-0 p-0 pt-0 pb-2">' +
			'	 <label class="my-0" for="slider2a" style="min-width:95%"><span data-langkey=\'details\'>details</span>:</label>' +
			'	 <input aria-label="Show Main/Info" type="range" name="slider2a" id="slider2a"' +
			'		min="0" max="14" value="7" step="1"' +
			'	        data-show-value="false"' +
                        '               class="custom-range slider col mx-0 px-0"' +
                        '               oninput="wsweb_set_c1c2_size(this.value) ;' +
                        '                        return false;">' +
			'</form>' ;
	      }

	      render_btn_examples ( )
	      {
		 return '<button class="btn btn-light shadow-sm my-1 mx-0 col-auto"' +
		        '        style="border-width:1 1 1 1px; border-color: #CCCCCC; flex-grow:1;"' +
                        '        id="btn_example1"' +
			'        data-toggle="tooltip" data-placement="bottom" data-html="true"' +
			'        title="This button opens the \'Examples\' dialog."' +
			'        onclick="wsweb_dialog_open(\'examples\');' +
			'	 return false;"><strong><span data-langkey=\'Examples\'>Examples</span></strong></button>' ;
	      }

	      render_btn_help ( )
	      {
		 return '<button class="btn btn-light shadow-sm my-1 col-auto"' +
		        '        style="border-width:1 1 1 1px; border-color:#CCCCCC; background-color:#D4DB17; flex-grow:1;"' +
                        '        id="btn_help1"' +
			'        data-toggle="tooltip" data-placement="bottom" data-html="true"' +
			'        title="This button opens the \'Help\' dialog."' +
		        '        onclick="wsweb_dialog_open(\'help\');' +
			'	  return false;"><strong><span data-langkey=\'Help\'>Help</span></strong></button>' ;
	      }

	      render_btn_config ( )
	      {
		 return '<button class="btn btn-light shadow-sm my-1 mx-0"' +
		    	'        style="border-width:1 1 1 1px; border-color: #CCCCCC;"' +
                        '        id="btn_cfg1"' +
			'        data-toggle="tooltip" data-placement="bottom" data-html="true"' +
			'        title="This button opens the \'Configuration\' dialog."' +
                        '        onclick="wsweb_dialog_open(\'config\');' +
			'    	          return false;"' +
                        '><strong><span class="d-none d-sm-inline-flex" data-langkey=\'Configuration\'>Configuration</span><span class="d-sm-none">Cfg.</span></strong></button>' ;
	      }

	      render_btndd_action ( )
	      {
		 return '<div class="btn-group p-0 my-1 col-auto" style="flex-grow:6;">' +
			'   <button type="button" class="col-12 btn btn-light shadow-sm select6"' +
			'           data-toggle="tooltip" data-placement="bottom" data-html="true"' +
			'           title="Dropdown on the right let you access to common actions."' +
                        '           style="border-color: #CCCCCC;"' +
			'           data-action="checkpoint"' +
			'	    onclick="var action = $(\'#select6a\').attr(\'data-action\');' +
	                '                    wsweb_do_action(action);' +
	                '                    return false;"' +
			'           id="select6a"><strong><em class="fas fa-clone"></em>&nbsp;Actions</strong></button>' +
			'   <button id="dd2a" type="button" ' + 
                        '           class="btn btn-light dropdown-toggle dropdown-toggle-split"' +
                        '           style="border-color: #CCCCCC;"' +
			'           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
			'     <span class="sr-only">Toggle Dropdown</span>' +
			'   </button>' +
			'   <div id="action_menu1" class="dropdown-menu border border-secondary p-2">' +
                        '' +
                        '     <h6 class="text-white bg-secondary mt-2 mb-1 border border-secondary"><span data-langkey="Pick firm/soft from">Pick firm/soft from</span>:</h6>' +
                        '     <a class="dropdown-item" href="#" id="selact_examples1" value="examples"' +
			'        onclick="wsweb_select_action(\'examples\');' +
			'	 return false;"><em class="fas fa-stream"></em>&nbsp;<span data-langkey="Examples">Examples</span></a>' +
                        '     <a class="dropdown-item" href="#" id="selact_checkpoint1"  value="owncode"' +
			' onclick="wsweb_select_action(\'checkpoint\');' +
			'	  return false;"><em class="fas fa-stream"></em>&nbsp;<span data-langkey="Checkpoint">Checkpoint</span></a>' +
                        '' +
			'     <h6 class="text-white bg-secondary mt-2 mb-0 border border-secondary"><span data-langkey="Utilities">Utilities</span>:</h6>' +
                        '     <a class="dropdown-item" href="#" id="selact_notifications1" value="notifications"' +
			'        onclick="wsweb_select_action(\'notifications\');' +
			'	 return false;"><span data-langkey="Notifications">Notifications</span></a>' +
                        '     <a class="dropdown-item" href="#" id="selact_recordbar1" value="recordbar"' +
			'        onclick="wsweb_select_action(\'recordbar\');' +
			'	 return false;"><span data-langkey="RecordBar">RecordBar</span></a>' +
                        '' +
                        '     <a class="dropdown-item" href="#" id="selact_reload" value="reload"' +
			'        onclick="wsweb_select_action(\'reload\');' +
			'	          return false;"><span data-langkey="Reload">Reload</span></a>' +
                        '' +
                        '     <h6 class="text-white bg-secondary mt-2 mb-0 border border-secondary"><span data-langkey="Information from">Information from</span>:</h6>' +
                        '     <a class="dropdown-item" href="#" id="selact_help1" value="help"' +
                        '        onclick="wsweb_select_action(\'help\');' +
                        '                 return false;"><span data-langkey="Help">Help</span></a>' +
                        '     <a class="dropdown-item" href="#" id="selact_intro1" value="intro"' +
                        '        onclick="wsweb_select_action(\'intro\');' +
                        '                 return false;">Welcome tutorial...</a>' +
                        '' +
			'   </div>' +
			'</div>' ;
	      }

	      render_btndd_mode ( )
	      {
		 return '<div class="btn-group p-0 my-1 col-auto" style="flex-grow:6;">' +
			'   <button type="button" class="col-12 btn btn-light shadow-sm"' +
			'           data-toggle="tooltip" data-placement="bottom" data-html="true"' +
			'           title="This button shows the current hardware used, <br>dropdown on the right let you access to common actions."' +
                        '           style="border-color: #CCCCCC;"' +
			'           id="select4"' +
                        '           onclick="setTimeout(function(){$(\'#dd1\').dropdown(\'toggle\');},50);' +
			'	            $(\'[data-toggle=tooltip]\').tooltip(\'hide\');' +
			'	          //wsweb_set_details(\'HARDWARE\');' +
			'	            return false;">HW</button>' +
                        '' +
			'   <button id="dd1" type="button" ' +
                        '           class="btn btn-light dropdown-toggle dropdown-toggle-split"' +
                        '           style="border-color: #CCCCCC;"' +
			'	    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"' +
                        '   ><span class="sr-only">Toggle Dropdown</span></button>' +
                        '' +
			'   <div id="mode_menu" class="dropdown-menu border border-secondary p-2">' +
                        '' +
			'     <h6 class="text-white bg-secondary my-1 user_archived ml-auto border border-secondary"><span data-langkey="Micro & Assembly">Micro & Assembly</span>:</h6>' +
                        '     <a class="dropdown-item" ' +
                        '        href="#" id="s4_ep" value="ep"' +
			'	 onclick="wsweb_select_main(\'ep\');' +
			'		  return false;"><em class="fas fa-microchip"></em>&nbsp;EP</a>' +
                        '     <a class="dropdown-item user_archived" ' +
                        '        href="#" id="s4_poc" value="poc"' +
			'	 onclick="wsweb_select_main(\'poc\');' +
			'		  return false;"><em class="fas fa-microchip"></em>&nbsp;POC</a>' +
                        '' +
			'     <h6 class="text-white bg-secondary mt-2 my-1 user_archived ml-auto border border-secondary"><span data-langkey="Assembly only">Assembly only</span>:</h6>' +
                        '     <a class="dropdown-item user_archived mb-0" ' +
                        '        href="#" id="s4_asm_mips" value="asm_mips"' +
			'        data-toggle="tooltip" data-placement="bottom" data-html="true"' +
			'        title="MIPS<sub>32</sub> assembly only (integer instructions)."' +
                        '        onclick="wsweb_select_main(\'asm_mips\');' +
                        '                 return false;"><em class="fas fa-microchip"></em>&nbsp;EP+MIPS<sub>32</sub>_int</a>' +
                        '     <a class="dropdown-item user_archived mb-0" ' +
                        '        href="#" id="s4_asm_rv32" value="asm_rv32"' +
			'        data-toggle="tooltip" data-placement="bottom" data-html="true"' +
			'        title="RISC-V<sub>32</sub> assembly only."' +
                        '        onclick="wsweb_select_main(\'asm_rv32\');' +
                        '                 return false;"><em class="fas fa-microchip"></em>&nbsp;EP+RV32<sub>im</sub><sup><span class="badge badge-dark">beta</span></sup></a>' +
                        '' +
			'   </div>' +
			'</div>' ;
	      }

	      connectedCallback ()
	      {
		    this.render() ;
	      }

	      attributeChangedCallback (name, oldValue, newValue)
	      {
		    this.render() ;
	      }

	      get name ( )
	      {
                   return this.getAttribute('name') ;
	      }

	      set name ( value )
	      {
                   this.setAttribute('name', value) ;
	      }

	      get components ( )
	      {
                   return this.getAttribute('components') ;
	      }

	      set components ( value )
	      {
                   this.setAttribute('components', value) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-toolbar', ws_toolbar) ;
        }

