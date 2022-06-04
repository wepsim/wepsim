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
				   "		   onclick=\"wepsim_config_button_toggle('NOTIF_delay',2000,'8');\"><span data-langkey='Slow'>Slow</span>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio8-1000'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label8-1000' for='radio8-1000' data-bs-toggle='buttons' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: normal'" +
				   "		   onclick=\"wepsim_config_button_toggle('NOTIF_delay',1000,'8');\"><span data-langkey='Normal'>Normal</span>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio8-100'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label8-100' for='radio8-100' data-bs-toggle='buttons' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: fast'" +
				   "		   onclick=\"wepsim_config_button_toggle('NOTIF_delay',100,'8');\"><span data-langkey='Fast'>Fast</span>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('NOTIF_delay', '8') ;
		                   },
                      description: "<span data-langkey='Notification speed: time before disapear'>Notification speed: time before disapear</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio15",
                      type:        "General",
                      u_class:     "",
                      code_cfg:    quickcfg_html_onoff('15', 'Dark mode',
		                                   "wepsim_restore_darkmode(false);" +
		                                   "wepsim_config_button_toggle('ws_skin_dark_mode',false,'15');",
		                                   "wepsim_restore_darkmode(true);" +
		                                   "wepsim_config_button_toggle('ws_skin_dark_mode',true,'15');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('ws_skin_dark_mode', '15') ;
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
				   "		   onclick=\"wepsim_config_button_toggle('DBG_delay', 50, '12');\"><span data-langkey='Slow'>Slow</span>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio12-5'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label12-5' for='radio12-5' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: normal'" +
				   "		   onclick=\"wepsim_config_button_toggle('DBG_delay', 5, '12');\"><span data-langkey='Normal'>Normal</span>" +
				   "	    </label>" +
				   "        <input type='radio' name='options' id='radio12-1'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label12-1' for='radio12-1'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: fast'" +
				   "		   onclick=\"wepsim_config_button_toggle('DBG_delay', 1, '12');\"><span data-langkey='Fast'>Fast</span>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('DBG_delay', '12') ;
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
				   "		   onclick=\"wepsim_config_button_toggle('DBG_level','instruction','1');\">" +
				   "		<span class='d-none d-sm-inline-flex' data-langkey='Instructions'>Instructions</span><span class='d-sm-none'>Instruc.</span></label>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio1-microinstruction'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label1-microinstruction' for='radio1-microinstruction' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Execution unit: microinstruction'" +
				   "		   onclick=\"wepsim_config_button_toggle('DBG_level','microinstruction','1');\">" +
				   "		<span class='d-none d-sm-inline-flex' data-langkey='&#181;instructions'>&#181;instructions</span><span class='d-sm-none'>&#181;instruc.</span></label>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('DBG_level', '1') ;
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
				   "		   onclick=\"wepsim_config_button_toggle('editor_theme','default','7');" +
				   "			     sim_cfg_editor_theme(inputfirm) ;" +
				   "			     sim_cfg_editor_theme(inputasm) ;\"><span data-langkey='Light'>Light</span>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio7-blackboard' aria-label='Editor theme: dark' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label7-blackboard' for='radio7-blackboard' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;' " +
				   "		   onclick=\"wepsim_config_button_toggle('editor_theme','blackboard','7');" +
				   "			     sim_cfg_editor_theme(inputfirm) ;" +
				   "			     sim_cfg_editor_theme(inputasm) ;\"><span data-langkey='Dark'>Dark</span>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('editor_theme', '7') ;
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
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_16_nofill','2'); show_memories_values();\">1A<sub>16</sub>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio2-unsigned_10_nofill'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_10_nofill' for='radio2-unsigned_10_nofill'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: decimal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_10_nofill','2');  show_memories_values();\">32<sub>10</sub>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_8_nofill'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_8_nofill' for='radio2-unsigned_8_nofill' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: octal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_8_nofill','2');   show_memories_values();\">26<sub>8</sub>" +
				   "	    </label>" +
                                   "    </div>" +
                                   "    <div class='btn-group d-flex btn-group-justified'>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_16_fill'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_16_fill' for='radio2-unsigned_16_fill' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: hexadecimal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_16_fill','2'); show_memories_values();\">001A<sub>16</sub>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_10_fill'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_10_fill' for='radio2-unsigned_10_fill' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: decimal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_10_fill','2'); show_memories_values();\">0032<sub>10</sub>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_8_fill'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_8_fill' for='radio2-unsigned_8_fill'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: octal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_8_fill','2'); show_memories_values();\">0026<sub>8</sub>" +
				   "	    </label>" +
                                   "    </div>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('RF_display_format', '2') ;
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
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_name','numerical','3'); wepsim_show_rf_names();\"><span data-langkey='Numbers'>Numbers</span>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio3-logical' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label3-logical' for='radio3-logical'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display name (user identification)'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_name','logical','3'); wepsim_show_rf_names();\"><span data-langkey='Labels'>Labels</span>" +
				   "	    </label>" +
				   " </div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('RF_display_name', '3') ;
		                   },
                      description: "<span data-langkey='Register file names'>Register file names</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio9",
                      type:        "Register file",
                      u_class:     "user_archived",
                      code_cfg:    quickcfg_html_onoff('9', 'Is editable',
		                                       "wepsim_config_button_toggle('is_editable',false,'9');",
		                                       "wepsim_config_button_toggle('is_editable',true,'9');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_editable', '9') ;
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
                      code_cfg:    quickcfg_html_onoff('10', 'Is by value',
		                                       "wepsim_config_button_toggle('is_byvalue',false,'10');",
		                                       "wepsim_config_button_toggle('is_byvalue',true,'10');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_byvalue', '10') ;
		                   },
                      description: "<span data-langkey='Show by value or by activation'>Show by value or by activation</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio5",
                      type:        "Circuitry simulation",
                      u_class:     "user_microcode",
                      code_cfg:    quickcfg_html_onoff('5', 'Is interactive',
		                                      "wepsim_config_button_toggle('is_interactive',false,'5');",
		                                      "wepsim_config_button_toggle('is_interactive',true,'5');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_interactive', '5') ;
		                   },
                      description: "<span data-langkey='Interactive mode: signal value can be updated'>Interactive mode: signal value can be updated</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio6",
                      type:        "Circuitry simulation",
                      u_class:     "user_microcode",
                      code_cfg:    quickcfg_html_onoff('6', 'Is quick interactive',
		                                 "wepsim_config_button_toggle('is_quick_interactive',false,'6');",
		                                 "wepsim_config_button_toggle('is_quick_interactive',true,'6');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_quick_interactive', '6') ;
		                   },
                      description: "<span data-langkey='Quick interactive mode: quick update of signal value'>Quick interactive mode: quick update of signal value</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio11",
                      type:        "Accesibility",
                      u_class:     "user_archived",
                      code_cfg:    quickcfg_html_onoff('11', 'Active voice',
		                                       "wepsim_config_button_toggle('use_voice',false,'11');",
		                                       "wepsim_config_button_toggle('use_voice',true,'11');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('use_voice', '11') ;
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
				   "		   onclick=\"wepsim_config_button_toggle('verbal_verbose','text','13');\">Text" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio13-math'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label13-math' for='radio13-math' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Verbose: math'" +
				   "		   onclick=\"wepsim_config_button_toggle('verbal_verbose','math','13');\">Math" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('verbal_verbose', '13') ;
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
				   "		<input type='radio' name='options' id='radio14-true'  aria-label='Is expert: true'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-only_asm__of__only_frequent__of' for='radio14-true' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
                                   "               aria-label='User Interface set of features for WepSIM: true' " +
				   "		   onclick=\"var new_val = 'only_asm:of:only_frequent:of';" +
                                   "                         var val_old = 'only_asm:of:only_frequent:on'; " +
                                   "                         wepsim_config_button_toggle2('ws_skin_user', " +
                                   "                                                  val_old, new_val,'14');" +
                                   "                         wepsim_restore_view(new_val);\">Off" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio14-false' aria-label='Is expert: false' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-only_asm__of__only_frequent__on' for='radio14-false' " +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
                                   "               aria-label='User Interface set of features for WepSIM: false' " +
				   "		   onclick=\"var new_val = 'only_asm:of:only_frequent:on';" +
                                   "                         var val_old = 'only_asm:of:only_frequent:of'; " +
                                   "                         wepsim_config_button_toggle2('ws_skin_user', " +
                                   "                                                  val_old, new_val,'14');" +
                                   "                         wepsim_restore_view(new_val);\">On" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
			               var optValue = get_cfg('ws_skin_user') ;
                                       wepsim_config_button_pretoggle_val2('ws_skin_user', '14', optValue) ;
		                   },
                      description: "<span data-langkey='Beginner view'>Beginner view</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio16",
                      type:        "Accesibility",
                      u_class:     "",
                      code_cfg:    quickcfg_html_onoff('16', 'AutoScrolling',
		                                       "wepsim_config_button_toggle('AS_enable',false,'16');",
		                                       "wepsim_config_button_toggle('AS_enable',true,'16');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('AS_enable', '16') ;
		                   },
                      description: "<span data-langkey='Auto-scroll while executing'>Auto-scroll while executing</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio17",
                      type:        "Privacy",
                      u_class:     "",
                      code_cfg:    quickcfg_html_onoff('17', 'Use Google Analytics',
		                                       "wepsim_config_button_toggle('use_ga',false,'17');",
		                                       "wepsim_config_button_toggle('use_ga',true,'17');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('use_ga', '17') ;
		                   },
                      description: "<span data-langkey='Use of Google Analytics to obtain anonymous statistics on the use of the application'>Use of Google Analytics to obtain anonymous statistics on the use of the application</span>"
                   });

