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


    ws_info.config_ui = [] ;

    ws_info.config_ui.push({
                      id:          "select7",
                      type:        "General",
                      u_class:     "",
                      code_cfg:    "<div class='form-group m-0'>" +
                                   i18n_get_selectcfg() +
                                   "</div>",
                      code_init:   function() {
			               $('#select7').val(get_cfg('ws_idiom'));
		                   },
                      description: "<span data-langkey='Idiom for help, examples, etc.'>Idiom for help, examples, etc.</span>"
                   });

    ws_info.config_ui.push({
                      id:          "slider3",
                      type:        "General",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group d-flex'>" +
				   "	    <input type='radio' name='options' id='radio8-2000'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label8-2000' for='radio8-2000' data-bs-toggle='buttons' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: slow'" +
				   "		   onclick=\"wepsim_config_button_toggle('NOTIF_delay',2000,'#label8-');\"><span data-langkey='Slow'>Slow</span>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio8-1000'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label8-1000' for='radio8-1000' data-bs-toggle='buttons' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: normal'" +
				   "		   onclick=\"wepsim_config_button_toggle('NOTIF_delay',1000,'#label8-');\"><span data-langkey='Normal'>Normal</span>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio8-100'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label8-100' for='radio8-100' data-bs-toggle='buttons' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: fast'" +
				   "		   onclick=\"wepsim_config_button_toggle('NOTIF_delay',100,'#label8-');\"><span data-langkey='Fast'>Fast</span>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('NOTIF_delay', '#label8-') ;
		                   },
                      description: "<span data-langkey='Notification speed: time before disapear'>Notification speed: time before disapear</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio15",
                      type:        "General",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "	    <input type='radio' name='options' id='radio15-true'  aria-label='Dark mode: true'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label15-true' for='radio15-true' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
                                   "               aria-label='WepSIM dark mode: true' " +
				   "		   onclick=\"wepsim_restore_darkmode(true) ; " +
				   "		             wepsim_config_button_toggle('ws_skin_dark_mode',true,'#label15-');\">On" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio15-false' aria-label='Dark mode: false' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label15-false' for='radio15-false' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
                                   "               aria-label='WepSIM dark mode: false' " +
				   "		   onclick=\"wepsim_restore_darkmode(false) ; " +
				   "		             wepsim_config_button_toggle('ws_skin_dark_mode',false,'#label15-');\">Off" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('ws_skin_dark_mode', '#label15-') ;
			               wepsim_restore_darkmode(optValue) ;
		                   },
                      description: "<span data-langkey='Dark Mode'>Dark Mode</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio12",
                      type:        "Execution",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "	    <input type='radio' name='options' id='radio12-50'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label12-50' for='radio12-50' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: slow'" +
				   "		   onclick=\"wepsim_config_button_toggle('DBG_delay', 50, '#label12-');\"><span data-langkey='Slow'>Slow</span>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio12-5'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label12-5' for='radio12-5' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: normal'" +
				   "		   onclick=\"wepsim_config_button_toggle('DBG_delay', 5, '#label12-');\"><span data-langkey='Normal'>Normal</span>" +
				   "	    </label>" +
				   "        <input type='radio' name='options' id='radio12-1'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label12-1' for='radio12-1'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: fast'" +
				   "		   onclick=\"wepsim_config_button_toggle('DBG_delay', 1, '#label12-');\"><span data-langkey='Fast'>Fast</span>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('DBG_delay', '#label12-') ;
		                   },
                      description: "<span data-langkey='Running speed: execution speed'>Running speed: execution speed</span>"
                   });

/*
    ws_info.config_ui.push({
                      id:          "radio1",
                      type:        "Execution",
                      u_class:     "user_archived",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "	    <input type='radio' name='options' id='radio1-instruction'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label1-instruction' for='radio1-instruction' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Execution unit: instruction'" +
				   "		   onclick=\"wepsim_config_button_toggle('DBG_level','instruction','#label1-');\">" +
				   "		<span class='d-none d-sm-inline-flex' data-langkey='Instructions'>Instructions</span><span class='d-sm-none'>Instruc.</span></label>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio1-microinstruction'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label1-microinstruction' for='radio1-microinstruction' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Execution unit: microinstruction'" +
				   "		   onclick=\"wepsim_config_button_toggle('DBG_level','microinstruction','#label1-');\">" +
				   "		<span class='d-none d-sm-inline-flex' data-langkey='&#181;instructions'>&#181;instructions</span><span class='d-sm-none'>&#181;instruc.</span></label>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('DBG_level', '#label1-') ;
		                   },
                      description: "<span data-langkey='Step-by-step: element in run mode'>Step-by-step: element in run mode</span>"
                   });
*/

    ws_info.config_ui.push({
                      id:          "select1",
                      type:        "Execution",
                      u_class:     "",
                      code_cfg:    "<a href='#' id='breakpointicon1' title='Please select breakpoint icon' tabindex='0'" +
			           "   data-bs-toggle='popover' data-trigger='click'>" +
		                   "   		<img alt='stop icon' id='img_select1' src='images/stop/stop_classic.gif' class='' " +
			           "                 style='position:relative; left:10px; height:30px !important; width:30px !important;'>" +
			           "</a>",
                      code_init:   function() {
			               var elto = get_cfg('ICON_theme') ;
			               $('#img_select1').attr("src",   "images/stop/stop_" + elto + ".gif");
			               $('#img_select1').attr("class", ws_info.breakpoint_icon_list[elto].addclass);
			               var popover_cfg = { 
                                                           html:       true,
					                   content:    wepsim_show_breakpoint_icon_list,
							   template:   wepsim_show_breakpoint_icon_template(),
					                   sanitizeFn: function(content){ return content; }
							 };
                                       wepsim_popover_init('#breakpointicon1', popover_cfg, 
                                                           function(shownEvent) {
                                                               wepsim_uicfg_apply();
                                                           });
		                   },
                      description: "<span data-langkey='Breakpoint icon: icon to be used for breakpoints'>Breakpoint icon: icon to be used for breakpoints</span>"
                   });

    ws_info.config_ui.push({
                      id:          "select6",
                      type:        "Execution",
                      u_class:     "",
                      code_cfg:    " <div class='form-group m-0'>" +
				   "	    <select name='select6' id='select6' class='form-control form-control-sm custom-select'" +
				   "		    aria-label='max. ticks per instruction' " +
				   "		    onchange=\"var opt = $(this).find('option:selected');" +
				   "			       var optValue = opt.val();" +
				   "			       update_cfg('DBG_limitins',optValue);\"" +
				   "		    data-native-menu='false'>" +
				   "		<option value='-1'>without limit</option>" +
				   "		<option value='500'  >500</option>" +
				   "		<option value='1000' >1000</option>" +
				   "		<option value='2000' >2000</option>" +
				   "		<option value='10000'>10000</option>" +
				   "		<option value='50000'>50000</option>" +
				   "	    </select>" +
				   "	 </div>",
                      code_init:   function() {
			               $('#select6').val(get_cfg('DBG_limitins'));
		                   },
                      description: "<span data-langkey='Limit instructions: number of instructions to be executed'>Limit instructions: number of instructions to be executed</span>"
                   });

    ws_info.config_ui.push({
                      id:          "select3",
                      type:        "Execution",
                      u_class:     "",
                      code_cfg:    " <div class='form-group m-0'>" +
				   "	    <select name='select3' id='select3' class='form-control form-control-sm custom-select'" +
				   "		    aria-label='max. ticks per instruction' " +
				   "		    onchange=\"var opt = $(this).find('option:selected');" +
				   "			       var optValue = opt.val();" +
				   "			       update_cfg('DBG_limitick',optValue);\"" +
				   "		    data-native-menu='false'>" +
				   "		<option value='-1'>without limit</option>" +
				   "		<option value='500'  >500</option>" +
				   "		<option value='1000' >1000</option>" +
				   "		<option value='2000' >2000</option>" +
				   "		<option value='10000'>10000</option>" +
				   "		<option value='50000'>50000</option>" +
				   "	    </select>" +
				   "	 </div>",
                      code_init:   function() {
			               $('#select3').val(get_cfg('DBG_limitick'));
		                   },
                      description: "<span data-langkey='Limit instruction ticks: to limit clock ticks'>Limit instruction ticks: to limit clock ticks</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio7",
                      type:        "Editor",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "	    <input type='radio' name='options' id='radio7-default' aria-label='Editor theme: light' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label7-default' for='radio7-default' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;' " +
				   "		   onclick=\"wepsim_config_button_toggle('editor_theme','default','#label7-');" +
				   "			     sim_cfg_editor_theme(inputfirm) ;" +
				   "			     sim_cfg_editor_theme(inputasm) ;\"><span data-langkey='Light'>Light</span>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio7-blackboard' aria-label='Editor theme: dark' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label7-blackboard' for='radio7-blackboard' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;' " +
				   "		   onclick=\"wepsim_config_button_toggle('editor_theme','blackboard','#label7-');" +
				   "			     sim_cfg_editor_theme(inputfirm) ;" +
				   "			     sim_cfg_editor_theme(inputasm) ;\"><span data-langkey='Dark'>Dark</span>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('editor_theme', '#label7-') ;
		                   },
                      description: "<span data-langkey='Editor theme: light or dark'>Editor theme: light or dark</span>"
                   });

    ws_info.config_ui.push({
                      id:          "select2",
                      type:        "Editor",
                      u_class:     "",
                      code_cfg:    "<div class='form-group m-0'>" +
			           "   <select name='select2' id='select2' class='form-control form-control-sm custom-select'" +
			           "	    aria-label='Editor mode'    " +
			           "	    onchange=\"var opt = $(this).find('option:selected');" +
			           "		      var optValue = opt.val();" +
			           "		      update_cfg('editor_mode',optValue);" +
			           "		      sim_cfg_editor_mode(inputfirm);" +
			           "		      sim_cfg_editor_mode(inputasm);\"" +
			           "	    data-native-menu='false'>" +
			           "	<option value='default'>default</option>" +
			           "	<option value='vim'>VIM</option>" +
			           "	<option value='emacs'>Emacs</option>" +
			           "	<option value='sublime'>Sublime</option>" +
			           "    </select>" +
			           "</div>",
                      code_init:   function() {
			               $('#select2').val(get_cfg('editor_mode'));
		                   },
                      description: "<span data-langkey='Editor mode: vim, emacs, etc.'>Editor mode: vim, emacs, etc.</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio2",
                      type:        "Register file",
                      u_class:     "user_archived",
                      code_cfg:    "    <div class='btn-group-toggle' data-bs-toggle='buttons' >" +
                                   "    <div class='btn-group d-flex btn-group-justified'>" +
				   "	    <input type='radio' name='options' id='radio2-unsigned_16_nofill'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_16_nofill' for='radio2-unsigned_16_nofill'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: hexadecimal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_16_nofill','#label2-'); show_memories_values();\">1A<sub>16</sub>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio2-unsigned_10_nofill'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_10_nofill' for='radio2-unsigned_10_nofill'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: decimal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_10_nofill','#label2-');  show_memories_values();\">32<sub>10</sub>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_8_nofill'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_8_nofill' for='radio2-unsigned_8_nofill' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: octal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_8_nofill','#label2-');   show_memories_values();\">26<sub>8</sub>" +
				   "	    </label>" +
                                   "    </div>" +
                                   "    <div class='btn-group d-flex btn-group-justified'>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_16_fill'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_16_fill' for='radio2-unsigned_16_fill' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: hexadecimal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_16_fill','#label2-'); show_memories_values();\">001A<sub>16</sub>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_10_fill'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_10_fill' for='radio2-unsigned_10_fill' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: decimal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_10_fill','#label2-'); show_memories_values();\">0032<sub>10</sub>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_8_fill'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_8_fill' for='radio2-unsigned_8_fill'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: octal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_8_fill','#label2-'); show_memories_values();\">0026<sub>8</sub>" +
				   "	    </label>" +
                                   "    </div>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('RF_display_format', '#label2-') ;
		                   },
                      description: "<span data-langkey='Display format'>Display format</span>&nbsp;" +
                                   "<a href='#' data-bs-toggle='popover1' title='Example of display formats' data-bs-html='true' " +
                                   "   data-bs-content='<img alt=\"register file example\" src=\"images/cfg-rf.gif\" class=\"img-fluid\">'><span <span data-langkey='(example)'>(example)</span></a>"
                   });

    ws_info.config_ui.push({
                      id:          "radio3",
                      type:        "Register file",
                      u_class:     "user_archived",
                      code_cfg:    " <div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio3-numerical'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label3-numerical' for='radio3-numerical'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display name (number)'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_name','numerical','#label3-'); wepsim_show_rf_names();\"><span data-langkey='Numbers'>Numbers</span>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio3-logical' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label3-logical' for='radio3-logical'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display name (user identification)'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_name','logical','#label3-'); wepsim_show_rf_names();\"><span data-langkey='Labels'>Labels</span>" +
				   "	    </label>" +
				   " </div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('RF_display_name', '#label3-') ;
		                   },
                      description: "<span data-langkey='Register file names'>Register file names</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio9",
                      type:        "Register file",
                      u_class:     "user_archived",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio9-true'  aria-label='Is editable: true'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label9-true' for='radio9-true'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
				   "		   aria-label='Is editable: true'" +
				   "		   onclick=\"wepsim_config_button_toggle('is_editable',true,'#label9-');\">On" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio9-false' aria-label='Is editable: false' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label9-false' for='radio9-false'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
				   "		   aria-label='Is editable: false'" +
				   "		   onclick=\"wepsim_config_button_toggle('is_editable',false,'#label9-');\">Off" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_editable', '#label9-') ;
		                   },
                      description: "<span data-langkey='Editable registers: edit register file values'>Editable registers: edit register file values</span>"
                   });

    ws_info.config_ui.push({
                      id:          "colorpicker1",
                      type:        "Circuitry simulation",
                      u_class:     "user_microcode",
                      code_cfg:    "<fieldset data-role='controlgroup' data-type='horizontal' data-mini='true' style='margin:0 0 0 0'>" +
                                   "<input type='color' " +
				   "	   aria-label='Color for active data'" +
                                   "       class='form-control form-control-color w-100' " +
                                   "       id='colorpicker1' " +
				   "	   onchange=\"wepsim_config_color_update('color_data_active', this.value, '#colorpicker1');\" " +
                                   "       title='Choose your color'>" +
				   "</fieldset>",
		      code_init:   function() {
                                       wepsim_config_color_initial('color_data_active', '#colorpicker1') ;
		                   },
                      description: "<span data-langkey='Data-path color'>Data-path color</span> <a href='#' data-bs-toggle='popover1' title='Example of data-path color' data-bs-html='true' data-bs-content='<img alt=\"register file example\" src=\"images/cfg-colors.gif\" class=\"img-fluid\">'><span <span data-langkey='(example)'>(example)</span></a>"
                   });

    ws_info.config_ui.push({
                      id:          "colorpicker2",
                      type:        "Circuitry simulation",
                      u_class:     "user_microcode",
                      code_cfg:    "<fieldset data-role='controlgroup' data-type='horizontal' data-mini='true' style='margin:0 0 0 0'>" +
                                   "<input type='color' " +
				   "	   aria-label='Color for active signal name'" +
                                   "       class='form-control form-control-color w-100' " +
                                   "       id='colorpicker2' value='#000000' " +
				   "	   onchange=\"wepsim_config_color_update('color_name_active', this.value, '#colorpicker2');\" " +
                                   "       title='Choose your color'>" +
				   "	 </fieldset> ",
		      code_init:   function() {
                                       wepsim_config_color_initial('color_name_active', '#colorpicker2') ;
		                   },
                      description: "<span data-langkey='Signal color'>Signal color</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio10",
                      type:        "Circuitry simulation",
                      u_class:     "user_archived user_microcode",
                      code_cfg:    " <div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio10-true'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label10-true' for='radio10-true'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is by value: true'" +
				   "		   onclick=\"wepsim_config_button_toggle('is_byvalue',true,'#label10-');\"><span data-langkey='Value'>Value</span>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio10-false'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label10-false' for='radio10-false'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is by value: false'" +
				   "		   onclick=\"wepsim_config_button_toggle('is_byvalue',false,'#label10-');\"><span data-langkey='Activation'>Activation</span>" +
				   "	    </label>" +
				   "	</div> ",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_byvalue', '#label10-') ;
		                   },
                      description: "<span data-langkey='Show by value or by activation'>Show by value or by activation</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio5",
                      type:        "Circuitry simulation",
                      u_class:     "user_microcode",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio5-true'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label5-true' for='radio5-true'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is interactive: true'" +
				   "		   onclick=\"wepsim_config_button_toggle('is_interactive',true,'#label5-');\">On" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio5-false'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label5-false' for='radio5-false'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is interactive: false'" +
				   "		   onclick=\"wepsim_config_button_toggle('is_interactive',false,'#label5-');\">Off" +
				   "	    </label>" +
				   "	</div> ",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_interactive', '#label5-') ;
		                   },
                      description: "<span data-langkey='Interactive mode: signal value can be updated'>Interactive mode: signal value can be updated</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio6",
                      type:        "Circuitry simulation",
                      u_class:     "user_microcode",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio6-true'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label6-true' for='radio6-true'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is quick interactive: true'" +
				   "		   onclick=\"wepsim_config_button_toggle('is_quick_interactive',true,'#label6-');\">On" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio6-false'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label6-false' for='radio6-false'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is quick interactive: false'" +
				   "		   onclick=\"wepsim_config_button_toggle('is_quick_interactive',false,'#label6-');\">Off" +
				   "	    </label>" +
				   "	</div> ",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_quick_interactive', '#label6-') ;
		                   },
                      description: "<span data-langkey='Quick interactive mode: quick update of signal value'>Quick interactive mode: quick update of signal value</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio11",
                      type:        "Accesibility",
                      u_class:     "user_archived",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio11-true'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label11-true' for='radio11-true' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Active voice: true'" +
				   "		   onclick=\"wepsim_config_button_toggle('use_voice',true,'#label11-'); wepsim_voice_start();\">On" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio11-false'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label11-false' for='radio11-false' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Active voice: false'" +
				   "		   onclick=\"wepsim_config_button_toggle('use_voice',false,'#label11-'); wepsim_voice_stop();\">Off" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('use_voice', '#label11-') ;
		                   },
                      description: "<span data-langkey='Active voice: external voice control'>Active voice: external voice control</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio13",
                      type:        "Accesibility",
                      u_class:     "user_archived",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio13-text'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label13-text' for='radio13-text' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Verbose: text'" +
				   "		   onclick=\"wepsim_config_button_toggle('verbal_verbose','text','#label13-');\">Text" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio13-math'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label13-math' for='radio13-math' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Verbose: math'" +
				   "		   onclick=\"wepsim_config_button_toggle('verbal_verbose','math','#label13-');\">Math" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('verbal_verbose', '#label13-') ;
		                   },
                      description: "<span data-langkey='Verbalization: textual or mathematical'>Verbalization: textual or mathematical</span>"
                   });

    ws_info.config_ui.push({
                      id:          "select8",
                      type:        "Accesibility",
                      u_class:     "",
                      code_cfg:    "<div class='form-group m-0'>" +
                                   " <select name='select8' id='select8' class='form-control form-control-sm custom-select'" +
                                   "         aria-label='User Interface for WepSIM' " +
                                   "         onchange=\"var opt = $(this).find('option:selected');" +
                                   "                    var optValue = opt.val();" +
                                   "                    update_cfg('ws_skin_ui', optValue);" +
                                   "                    window.removeEventListener('beforeunload', wepsim_confirm_exit);" +
                                   "                    window.location='wepsim-' + optValue + '.html';" +
                                   "                    return false;\"" +
                                   "         data-native-menu='false'>" +
                                   "    <option value='classic'>Desktop</option>" +
                                   "    <option value='compact'>Mobile</option>" +
                                   " </select>" +
                                   "</div>",
                      code_init:   function() {
                                       $('#select8').val(get_cfg('ws_skin_ui'));
                                   },
                      description: "<span data-langkey='WepSIM User Interface skin'>WepSIM User Interface skin</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio14",
                      type:        "Accesibility",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio14-false' aria-label='Is expert: false' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-only_asm__of__only_frequent__on' for='radio14-false' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
                                   "               aria-label='User Interface set of features for WepSIM: false' " +
				   "		   onclick=\"var optValue = 'only_asm:of:only_frequent:on';" +
				   "		             update_cfg('ws_skin_user', optValue);" +
                                   "                         wepsim_restore_view(optValue);\">On" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio14-true'  aria-label='Is expert: true'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-only_asm__of__only_frequent__of' for='radio14-true' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
                                   "               aria-label='User Interface set of features for WepSIM: true' " +
				   "		   onclick=\"var optValue = 'only_asm:of:only_frequent:of';" +
				   "		             update_cfg('ws_skin_user', optValue);" +
                                   "                         wepsim_restore_view(optValue);\">Off" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
			               var optValue = get_cfg('ws_skin_user') ;
			               $('#label14-' + optValue.replace(/:/g,"__")).button('toggle') ;
		                   },
                      description: "<span data-langkey='Beginner view'>Beginner view</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio16",
                      type:        "Accesibility",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio16-true' aria-label='AutoScroll: true' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label16-true' for='radio16-true' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
                                   "               aria-label='AutoScrolling: true' " +
				   "		   onclick=\"var optValue = true;" +
				   "		             wepsim_config_button_toggle('AS_enable', optValue, '#label16-');\">On" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio16-false'  aria-label='AutoScroll: false'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label16-false' for='radio16-false' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
                                   "               aria-label='AutoScrolling: false' " +
				   "		   onclick=\"var optValue = false;" +
				   "		             wepsim_config_button_toggle('AS_enable', optValue, '#label16-');\">Off" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('AS_enable', '#label16-') ;
		                   },
                      description: "<span data-langkey='Auto-scroll while executing'>Auto-scroll while executing</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio17",
                      type:        "Privacy",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio17-true'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label17-true' for='radio17-true' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Use Google Analytics: true'" +
				   "		   onclick=\"wepsim_config_button_toggle('use_ga', true, '#label17-');\">On" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio17-false'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label17-false' for='radio17-false' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Use Google Analytics: false'" +
				   "		   onclick=\"wepsim_config_button_toggle('use_ga', false, '#label17-');\">Off" +
				   "	    </label>" +
				   "	</div> ",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('use_ga', '#label17-') ;
		                   },
                      description: "<span data-langkey='Use of Google Analytics to obtain anonymous statistics on the use of the application'>Use of Google Analytics to obtain anonymous statistics on the use of the application</span>"
                   });

