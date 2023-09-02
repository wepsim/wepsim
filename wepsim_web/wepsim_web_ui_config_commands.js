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


    ws_info.config_ui = [] ;


    //
    // General
    //

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
                      id:          "radio15",
                      type:        "General",
                      u_class:     "",
                      code_cfg:    wepsim_config_button_html_onoff('15', 'Dark mode',
                                                  i18n_get_TagFor('cfg', 'Off'),
		                                   "wepsim_restore_darkmode(false);" +
		                                   "wepsim_config_button_toggle('ws_skin_dark_mode',false,'15');",
                                                  i18n_get_TagFor('cfg', 'On'),
		                                   "wepsim_restore_darkmode(true);" +
		                                   "wepsim_config_button_toggle('ws_skin_dark_mode',true,'15');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('ws_skin_dark_mode', '15') ;
			               var optValue = get_cfg('ws_skin_dark_mode') ;
			               wepsim_restore_darkmode(optValue) ;
		                   },
                      description: "<span data-langkey='Dark Mode'>Dark Mode</span>"
                   });

    ws_info.config_ui.push({
                      id:          "slider3",
                      type:        "General",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group d-flex'>" +
				   "	    <input type='radio' name='options' id='radio8-2000'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label8-2000' for='radio8-2000' data-bs-toggle='buttons' " +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: slow'" +
				   "		   onclick=\"wepsim_config_button_toggle('NOTIF_delay',2000,'8');\"><span data-langkey='Slow'>Slow</span>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio8-1000'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label8-1000' for='radio8-1000' data-bs-toggle='buttons' " +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: normal'" +
				   "		   onclick=\"wepsim_config_button_toggle('NOTIF_delay',1000,'8');\"><span data-langkey='Normal'>Normal</span>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio8-100'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label8-100' for='radio8-100' data-bs-toggle='buttons' " +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: fast'" +
				   "		   onclick=\"wepsim_config_button_toggle('NOTIF_delay',100,'8');\"><span data-langkey='Fast'>Fast</span>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('NOTIF_delay', '8') ;
		                   },
                      description: "<span data-langkey='Notification speed: time before disapear'>Notification speed: time before disapear</span>"
                   });


    //
    // Execution
    //

    ws_info.config_ui.push({
                      id:          "radio12",
                      type:        "Execution",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "	    <input type='radio' name='options' id='radio12-50'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label12-50' for='radio12-50' " +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: slow'" +
				   "		   onclick=\"wepsim_config_button_toggle('DBG_delay', 50, '12');\"><span data-langkey='Slow'>Slow</span>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio12-5'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label12-5' for='radio12-5' " +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: normal'" +
				   "		   onclick=\"wepsim_config_button_toggle('DBG_delay', 5, '12');\"><span data-langkey='Normal'>Normal</span>" +
				   "	    </label>" +
				   "        <input type='radio' name='options' id='radio12-1'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label12-1' for='radio12-1'" +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
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
                      u_class:     "wsx_morecfg",
                      code_cfg:    wepsim_config_button_html_2options('1', 'Execution unit',
                                                   "<span class='d-none d-sm-inline-flex' data-langkey='Instructions'>Instructions</span><span class='d-sm-none'>Instruc.</span>",
                                                   "instruction",
		                                   "wepsim_config_button_toggle('DBG_level','instruction','1');",
                                                   "<span class='d-none d-sm-inline-flex' data-langkey='&#181;instructions'>&#181;instructions</span><span class='d-sm-none'>&#181;instruc.</span>",
                                                   "microinstruction",
		                                   "wepsim_config_button_toggle('DBG_level','microinstruction','1');"),
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
				   "	    <select name='select6' id='select6' " +
                                   "                class='form-control form-control-sm form-select border-secondary'" +
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
				   "	    <select name='select3' id='select3' " +
                                   "                class='form-control form-control-sm form-select border-secondary'" +
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
                      id:          "radio4",
                      type:        "Execution",
                      u_class:     "",
                      code_cfg:    wepsim_config_button_html_onoff('4', 'Skip notify: comments',
                                                  i18n_get_TagFor('cfg', 'Off'),
		                                   "update_cfg('editor_mode', false);" +
		                                   "wepsim_config_button_toggle('DBG_skip_notifycolon',false,'4');",
                                                  i18n_get_TagFor('cfg', 'On'),
		                                   "update_cfg('editor_mode', true);" +
		                                   "wepsim_config_button_toggle('DBG_skip_notifycolon',true,'4');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('DBG_skip_notifycolon', '4') ;
		                   },
	              description: "<span data-langkey='Skip notify: comments'>Skip notify: comments</span>"
                   });


    //
    // Editor
    //

    ws_info.config_ui.push({
                      id:          "select5",
                      type:        "Editor",
                      u_class:     "",
                      code_cfg:    "<div class='form-group m-0'>" +
			           "   <select name='select5' id='select5' " +
                                   "        class='form-control form-control-sm form-select border-secondary'" +
			           "	    aria-label='Editor theme'    " +
			           "	    onchange=\"var opt = $(this).find('option:selected');" +
			           "		      var optValue = opt.val();" +
			           "		      update_cfg('editor_theme', optValue);" +
			           "		      sim_cfg_editor_theme(inputfirm);" +
			           "		      sim_cfg_editor_theme(inputasm);\"" +
			           "	    data-native-menu='false'>" +
			           "	<option value='default'>(💡) default</option>" +
			           "	<option value='blackboard'>(🔅) blackboard</option>" +
			           "	<option value='eclipse'>(💡) eclipse</option>" +
			           "	<option value='cobalt'>(🔅) cobalt</option>" +
			           "	<option value='idea'>(💡) idea</option>" +
			           "	<option value='the-matrix'>(🔅) the-matrix</option>" +
			           "	<option value='neat'>(💡) neat</option>" +
			           "	<option value='abbott'>(🔅) abbott</option>" +
			           "	<option value='mdn-like'>(💡) mdn-like</option>" +
			           "	<option value='erlang-dark'>(🔅) erlang-dark</option>" +
			           "	<option value='duotone-light'>(💡) duotone-light</option>" +
			           "    </select>" +
			           "</div>",
                      code_init:   function() {
			               $('#select5').val(get_cfg('editor_theme'));
		                   },
                      description: "<span data-langkey='Editor theme: light or dark'>Editor theme: light or dark</span>"
                   });

    ws_info.config_ui.push({
                      id:          "select2",
                      type:        "Editor",
                      u_class:     "",
                      code_cfg:    "<div class='form-group m-0'>" +
			           "   <select name='select2' id='select2' " +
                                   "        class='form-control form-control-sm form-select border-secondary'" +
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


    //
    // Register file
    //

    ws_info.config_ui.push({
                      id:          "radio2",
                      type:        "Register file",
                      u_class:     "wsx_morecfg",
                      code_cfg:    "    <div class='btn-group-toggle' data-bs-toggle='buttons' >" +
                                   "    <div class='btn-group d-flex btn-group-justified'>" +
				   "	    <input type='radio' name='options' id='radio2-unsigned_16_nofill'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_16_nofill' for='radio2-unsigned_16_nofill'" +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: hexadecimal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_16_nofill','2'); show_memories_values();\">1A<sub>16</sub>" +
				   "	    </label>" +
				   "	    <input type='radio' name='options' id='radio2-unsigned_10_nofill'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_10_nofill' for='radio2-unsigned_10_nofill'" +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: decimal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_10_nofill','2');  show_memories_values();\">32<sub>10</sub>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_8_nofill'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_8_nofill' for='radio2-unsigned_8_nofill' " +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: octal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_8_nofill','2');   show_memories_values();\">26<sub>8</sub>" +
				   "	    </label>" +
                                   "    </div>" +
                                   "    <div class='btn-group d-flex btn-group-justified'>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_16_fill'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_16_fill' for='radio2-unsigned_16_fill' " +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: hexadecimal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_16_fill','2'); show_memories_values();\">001A<sub>16</sub>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_10_fill'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_10_fill' for='radio2-unsigned_10_fill' " +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: decimal'" +
				   "		   onclick=\"wepsim_config_button_toggle('RF_display_format','unsigned_10_fill','2'); show_memories_values();\">0032<sub>10</sub>" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio2-unsigned_8_fill'   autocomplete='off' class='btn-check'>" +
				   "	    <label id='label2-unsigned_8_fill' for='radio2-unsigned_8_fill'" +
				   "		   class='btn btn-sm w-50 btn-outline-secondary fw-bold' style='padding:2 2 2 2;'" +
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
                      u_class:     "wsx_morecfg",
                      code_cfg:    wepsim_config_button_html_2options('3', 'register file display name',
                                                   "<span data-langkey='Numbers'>Numbers</span>",
                                                   "numerical",
		                                   "wepsim_config_button_toggle('RF_display_name','numerical','3'); wepsim_show_rf_names();",
                                                   "<span data-langkey='Labels'>Labels</span>",
                                                   "logical",
		                                   "wepsim_config_button_toggle('RF_display_name','logical','3'); wepsim_show_rf_names();"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('RF_display_name', '3') ;
		                   },
                      description: "<span data-langkey='Register file names'>Register file names</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio9",
                      type:        "Register file",
                      u_class:     "wsx_morecfg",
                      code_cfg:    wepsim_config_button_html_onoff('9', 'Is editable',
                                                     i18n_get_TagFor('cfg', 'Off'),
		                                       "wepsim_config_button_toggle('is_editable',false,'9');",
                                                     i18n_get_TagFor('cfg', 'On'),
		                                       "wepsim_config_button_toggle('is_editable',true,'9');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_editable', '9') ;
		                   },
                      description: "<span data-langkey='Editable registers: edit register file values'>Editable registers: edit register file values</span>"
                   });


    //
    // Circuitry simulation
    //

    ws_info.config_ui.push({
                      id:          "colorpicker1",
                      type:        "Circuitry simulation",
                      u_class:     "wsx_microcode",
                      code_cfg:    wepsim_config_button_html_color('colorpicker1',
							           'Color for active active data',
							           'color_data_active'),
		      code_init:   function() {
                                       wepsim_config_color_initial('color_data_active', '#colorpicker1') ;
		                   },
                      description: "<span data-langkey='Data-path color'>Data-path color</span> <a href='#' data-bs-toggle='popover1' title='Example of data-path color' data-bs-html='true' data-bs-content='<img alt=\"register file example\" src=\"images/cfg-colors.gif\" class=\"img-fluid\">'><span <span data-langkey='(example)'>(example)</span></a>"
                   });

    ws_info.config_ui.push({
                      id:          "colorpicker2",
                      type:        "Circuitry simulation",
                      u_class:     "wsx_microcode",
                      code_cfg:    wepsim_config_button_html_color('colorpicker2',
							           'Color for active signal name',
							           'color_name_active'),
		      code_init:   function() {
                                       wepsim_config_color_initial('color_name_active', '#colorpicker2') ;
		                   },
                      description: "<span data-langkey='Signal color'>Signal color</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio10",
                      type:        "Circuitry simulation",
                      u_class:     "wsx_morecfg wsx_microcode",
                      code_cfg:    wepsim_config_button_html_onoff('10', 'Is by value',
                                                     i18n_get_TagFor('cfg', 'Off'),
		                                       "wepsim_config_button_toggle('is_byvalue',false,'10');",
                                                     i18n_get_TagFor('cfg', 'On'),
		                                       "wepsim_config_button_toggle('is_byvalue',true,'10');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_byvalue', '10') ;
		                   },
                      description: "<span data-langkey='Show by value or by activation'>Show by value or by activation</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio5",
                      type:        "Circuitry simulation",
                      u_class:     "wsx_microcode",
                      code_cfg:    wepsim_config_button_html_onoff('5', 'Is interactive',
                                                     i18n_get_TagFor('cfg', 'Off'),
		                                      "wepsim_config_button_toggle('is_interactive',false,'5');",
                                                     i18n_get_TagFor('cfg', 'On'),
		                                      "wepsim_config_button_toggle('is_interactive',true,'5');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_interactive', '5') ;
		                   },
                      description: "<span data-langkey='Interactive mode: signal value can be updated'>Interactive mode: signal value can be updated</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio6",
                      type:        "Circuitry simulation",
                      u_class:     "wsx_microcode",
                      code_cfg:    wepsim_config_button_html_onoff('6', 'Is quick interactive',
                                                  i18n_get_TagFor('cfg', 'Off'),
		                                 "wepsim_config_button_toggle('is_quick_interactive',false,'6');",
                                                  i18n_get_TagFor('cfg', 'On'),
		                                 "wepsim_config_button_toggle('is_quick_interactive',true,'6');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('is_quick_interactive', '6') ;
		                   },
                      description: "<span data-langkey='Quick interactive mode: quick update of signal value'>Quick interactive mode: quick update of signal value</span>"
                   });


    //
    // Accesibility
    //

    ws_info.config_ui.push({
                      id:          "radio11",
                      type:        "Accesibility",
                      u_class:     "wsx_morecfg",
                      code_cfg:    wepsim_config_button_html_onoff('11', 'Active voice',
                                                     i18n_get_TagFor('cfg', 'Off'),
		                                       "wepsim_config_button_toggle('use_voice',false,'11');",
                                                     i18n_get_TagFor('cfg', 'On'),
		                                       "wepsim_config_button_toggle('use_voice',true,'11');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('use_voice', '11') ;
		                   },
                      description: "<span data-langkey='Active voice: external voice control'>Active voice: external voice control</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio13",
                      type:        "Accesibility",
                      u_class:     "wsx_morecfg",
                      code_cfg:    wepsim_config_button_html_2options('13', 'Verbose',
                                                   i18n_get_TagFor('cfg', 'Text'),
                                                   "text",
		                                   "wepsim_config_button_toggle('verbal_verbose','text','13');",
                                                   i18n_get_TagFor('cfg', 'Math'),
                                                   "math",
		                                   "wepsim_config_button_toggle('verbal_verbose','math','13');"),
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
                                   " <select name='select8' id='select8' " +
                                   "         class='form-control form-control-sm form-select border-secondary'" +
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
                      id:          "radio16",
                      type:        "Accesibility",
                      u_class:     "",
                      code_cfg:    wepsim_config_button_html_onoff('16', 'AutoScrolling',
                                                     i18n_get_TagFor('cfg', 'Off'),
		                                       "wepsim_config_button_toggle('AS_enable',false,'16');",
                                                     i18n_get_TagFor('cfg', 'On'),
		                                       "wepsim_config_button_toggle('AS_enable',true,'16');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('AS_enable', '16') ;
		                   },
                      description: "<span data-langkey='Auto-scroll while executing'>Auto-scroll while executing</span>"
                   });


    //
    // Privacy
    //

    ws_info.config_ui.push({
                      id:          "radio17",
                      type:        "Privacy",
                      u_class:     "",
                      code_cfg:    wepsim_config_button_html_onoff('17', 'Use Google Analytics',
                                                     i18n_get_TagFor('cfg', 'Off'),
		                                       "wepsim_config_button_toggle('use_ga',false,'17');",
                                                     i18n_get_TagFor('cfg', 'On'),
		                                       "wepsim_config_button_toggle('use_ga',true,'17');"),
		      code_init:   function() {
                                       wepsim_config_button_pretoggle('use_ga', '17') ;
		                   },
                      description: "<span data-langkey='Use of Google Analytics to obtain anonymous statistics on the use of the application'>Use of Google Analytics to obtain anonymous statistics on the use of the application</span>"
                   });


    //
    // Extra Features
    //

    ws_info.config_ui.push({
                      id:          "radio14a",
                      type:        "Extra Features",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio14a-true'  aria-label='cache: true'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-beta_cache-false' for='radio14a-true' " +
				   "		  class='btn btn-sm w-50 btn-outline-secondary p-1 fw-bold' " +
                                   "              aria-label='User Interface set of features for WepSIM: true' " +
				   "		  onclick=\"wepsim_config_button_toggle2('beta_cache',false,'14');\">Off" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio14a-false' aria-label='cache: false' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-beta_cache-true' for='radio14a-false' " +
				   "		  class='btn btn-sm w-50 btn-outline-secondary p-1 fw-bold' " +
                                   "              aria-label='User Interface set of features for WepSIM: false' " +
				   "		  onclick=\"wepsim_config_button_toggle2('beta_cache',true,'14');\">On" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle_val2('ws_skin_user', 'beta_cache', '14') ;
		                   },
                      description: "<span data-langkey='Cache'>Cache</span>&nbsp;" +
                                   "<span class='badge text-bg-secondary py-0 px-1'>beta</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio14b",
                      type:        "Extra Features",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio14b-true'  aria-label='cache: true'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-beta_poc-false' for='radio14b-true' " +
				   "		  class='btn btn-sm w-50 btn-outline-secondary p-1 fw-bold' " +
                                   "              aria-label='User Interface set of features for WepSIM: true' " +
				   "		  onclick=\"wepsim_config_button_toggle2('beta_poc',false,'14');\">Off" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio14b-false' aria-label='cache: false' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-beta_poc-true' for='radio14b-false' " +
				   "		  class='btn btn-sm w-50 btn-outline-secondary p-1 fw-bold' " +
                                   "              aria-label='User Interface set of features for WepSIM: false' " +
				   "		  onclick=\"wepsim_config_button_toggle2('beta_poc',true,'14');\">On" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle_val2('ws_skin_user', 'beta_poc', '14') ;
		                   },
                      description: "<span data-langkey='POC CPU'>POC (proof of concept) CPU</span>&nbsp;" +
                                   "<span class='badge text-bg-secondary py-0 px-1'>beta</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio14c",
                      type:        "Extra Features",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio14c-true'  aria-label='cache: true'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-beta_ngc-false' for='radio14c-true' " +
				   "		  class='btn btn-sm w-50 btn-outline-secondary p-1 fw-bold' " +
                                   "              aria-label='User Interface set of features for WepSIM: true' " +
				   "		  onclick=\"wepsim_config_button_toggle2('beta_ngc',false,'14');\">Off" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio14c-false' aria-label='cache: false' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-beta_ngc-true' for='radio14c-false' " +
				   "		  class='btn btn-sm w-50 btn-outline-secondary p-1 fw-bold' " +
                                   "              aria-label='User Interface set of features for WepSIM: false' " +
				   "		  onclick=\"wepsim_config_button_toggle2('beta_ngc',true,'14');\">On" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle_val2('ws_skin_user', 'beta_ngc', '14') ;
		                   },
                      description: "<span data-langkey='NGC'>Next-Generation Compiler</span>&nbsp;" +
                                   "<span class='badge text-bg-secondary py-0 px-1'>beta</span>"
                   });

    ws_info.config_ui.push({
                      id:          "radio14d",
                      type:        "Extra Features",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio14d-true'  aria-label='cache: true'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-extra_morecfg-false' for='radio14d-true' " +
				   "		  class='btn btn-sm w-50 btn-outline-secondary p-1 fw-bold' " +
                                   "              aria-label='User Interface set of features for WepSIM: true' " +
				   "		  onclick=\"wepsim_config_button_toggle2('extra_morecfg',false,'14');\">Off" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio14d-false' aria-label='cache: false' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-extra_morecfg-true' for='radio14d-false' " +
				   "		  class='btn btn-sm w-50 btn-outline-secondary p-1 fw-bold' " +
                                   "              aria-label='User Interface set of features for WepSIM: false' " +
				   "		  onclick=\"wepsim_config_button_toggle2('extra_morecfg',true,'14');\">On" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle_val2('ws_skin_user', 'extra_morecfg', '14') ;
		                   },
                      description: "<span data-langkey='More configuration options'>More configuration options</span>&nbsp;"
                   });

    ws_info.config_ui.push({
                      id:          "radio14e",
                      type:        "Extra Features",
                      u_class:     "",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-bs-toggle='buttons' >" +
				   "		<input type='radio' name='options' id='radio14e-true'  aria-label='cache: true'  autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-extra_share-false' for='radio14e-true' " +
				   "		  class='btn btn-sm w-50 btn-outline-secondary p-1 fw-bold' " +
                                   "              aria-label='User Interface set of features for WepSIM: true' " +
				   "		  onclick=\"wepsim_config_button_toggle2('extra_share',false,'14');\">Off" +
				   "	    </label>" +
				   "		<input type='radio' name='options' id='radio14e-false' aria-label='cache: false' autocomplete='off' class='btn-check'>" +
				   "	    <label id='label14-extra_share-true' for='radio14e-false' " +
				   "		  class='btn btn-sm w-50 btn-outline-secondary p-1 fw-bold' " +
                                   "              aria-label='User Interface set of features for WepSIM: false' " +
				   "		  onclick=\"wepsim_config_button_toggle2('extra_share',true,'14');\">On" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() {
                                       wepsim_config_button_pretoggle_val2('ws_skin_user', 'extra_share', '14') ;
		                   },
                      description: "<span data-langkey='More share options'>More share options</span>&nbsp;"
                   });

