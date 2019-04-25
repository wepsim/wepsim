/*
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    var ws_config = [] ;

    ws_config.push({
                      id:          "select7",
                      type:        "General",
                      code_cfg:    "<div class='form-group m-0'>" +
				   " <select name='select7' id='select7' class='form-control form-control-sm custom-select'" +
				   "	     aria-label='idiom for examples and help' " +
				   "	     onchange=\"var opt = $(this).find('option:selected');" +
				   "	 	        var optValue = opt.val();" +
				   "		        update_cfg('ws_idiom', optValue);" +
	                           "                    i18n_update_tagsFor('gui', optValue);" +
				   "		        wepsim_open_config_index();\"" +
				   "	     data-native-menu='false'>" +
				   "	<option value='es'>Spanish</option>" +
				   "	<option value='en'>English</option>" +
				   " </select>" +
			           "</div>",
                      code_init:   function() { 
			               $('#select7').val(get_cfg('ws_idiom')); 
		                   },
                      description: "<span data-langkey='Idiom for help, examples, etc.'>Idiom for help, examples, etc.</span>"
                   });

    ws_config.push({
                      id:          "select8",
                      type:        "General",
                      code_cfg:    "<div class='form-group m-0'>" +
				   " <select name='select8' id='select8' class='form-control form-control-sm custom-select'" +
				   "	     aria-label='User Interface for WepSIM' " +
				   "	     onchange=\"var opt = $(this).find('option:selected');" +
				   "	 	        var optValue = opt.val();" +
				   "		        update_cfg('ws_skin', optValue);" +
	                           "                    window.removeEventListener('beforeunload', wepsim_confirm_exit);" +
				   "		        window.location='wepsim-' + optValue + '.html';" +
				   "		        return false;\"" +
				   "	     data-native-menu='false'>" +
				   "	<option value='classic'>Classic</option>" +
				   "	<option value='compact'>Compact</option>" +
				   " </select>" +
			           "</div>",
                      code_init:   function() { 
			               $('#select8').val(get_cfg('ws_skin')); 
		                   },
                      description: "<span data-langkey='WepSIM User Interface Skin'>WepSIM User Interface Skin</span>"
                   });

    ws_config.push({
                      id:          "radio14",
                      type:        "General",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label14-true'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Beta: true'" +
				   "		   onclick=\"update_cfg('enable_beta', true);\">" +
				   "		<input type='radio' name='beta' id='radio14-true'  aria-label='enable_beta: true'  autocomplete='off' >On" +
				   "	    </label>" +
				   "	    <label id='label14-false'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Beta: false'" +
				   "		   onclick=\"update_cfg('enable_beta', false);\">" +
				   "		<input type='radio' name='beta' id='radio14-false' aria-label='enable_beta: false' autocomplete='off' >Off" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { 
			               $('#label14-' + get_cfg('enable_beta')).button('toggle');
		                   },
                      description: "<span data-langkey='Enable beta: Enable experimental features'>Enable beta: Enable experimental features</span>"
                   });

    ws_config.push({
                      id:          "radio7",
                      type:        "Editor",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label7-default'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;' " +
				   "		   onclick=\"update_cfg('editor_theme','default');" +
				   "			     sim_cfg_editor_theme(inputfirm) ;" +
				   "			     sim_cfg_editor_theme(inputasm) ;\">" +
				   "		<input type='radio' name='options' id='radio7-default' aria-label='Editor theme: light' autocomplete='off' ><span data-langkey='Light'>Light</span>" +
				   "	    </label>" +
				   "	    <label id='label7-blackboard'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;' " +
				   "		   onclick=\"update_cfg('editor_theme','blackboard');" +
				   "			     sim_cfg_editor_theme(inputfirm) ;" +
				   "			     sim_cfg_editor_theme(inputasm) ;\">" +
				   "		<input type='radio' name='options' id='radio7-blackboard' aria-label='Editor theme: dark' autocomplete='off' ><span data-langkey='Dark'>Dark</span>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { 
			               $('#label7-' +      get_cfg('editor_theme')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Editor theme: light or dark'>Editor theme: light or dark</span>"
                   });

    ws_config.push({
                      id:          "select2",
                      type:        "Editor",
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

    ws_config.push({
                      id:          "radio12",
                      type:        "Execution",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label12-50'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: slow'" +
				   "		   onclick=\"update_cfg('DBG_delay', 50);\">" +
				   "		<input type='radio' name='options' id='radio12-50'   autocomplete='off' ><span data-langkey='Slow'>Slow</span>" +
				   "	    </label>" +
				   "	    <label id='label12-5'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: normal'" +
				   "		   onclick=\"update_cfg('DBG_delay', 5);\">" +
				   "		<input type='radio' name='options' id='radio12-5'  autocomplete='off' ><span data-langkey='Normal'>Normal</span>" +
				   "	    </label>" +
				   "	    <label id='label12-1'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: fast'" +
				   "		   onclick=\"update_cfg('DBG_delay', 1);\">" +
				   "		<input type='radio' name='options' id='radio12-1'  autocomplete='off' ><span data-langkey='Fast'>Fast</span>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { 
			               $('#label12-' +        get_cfg('DBG_delay')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Running speed: execution speed'>Running speed: execution speed</span>"
                   });

    ws_config.push({
                      id:          "radio1",
                      type:        "Execution",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label1-instruction'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Execution unit: instruction'" +
				   "		   onclick=\"update_cfg('DBG_level','instruction');\">" +
				   "		<input type='radio' name='options' id='radio1-instruction'   autocomplete='off' >" +
				   "		<span class='d-none d-sm-inline-flex' data-langkey='Instructions'>Instructions</span><span class='d-sm-none'>Instruc.</span></label>" +
				   "	    </label>" +
				   "	    <label id='label1-microinstruction'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Execution unit: microinstruction'" +
				   "		   onclick=\"update_cfg('DBG_level','microinstruction');\">" +
				   "		<input type='radio' name='options' id='radio1-microinstruction'  autocomplete='off' >" +
				   "		<span class='d-none d-sm-inline-flex' data-langkey='&#181;instructions'>&#181;instructions</span><span class='d-sm-none'>&#181;instruc.</span></label>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { 
			               $('#label1-' +         get_cfg('DBG_level')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Step-by-step: element in run mode'>Step-by-step: element in run mode</span>"
                   });

    ws_config.push({
                      id:          "select1",
                      type:        "Execution",
                      code_cfg:    "<a href='#' id='breakpointicon1' title='Please select breakpoint icon' tabindex='0'" +
			           "   data-toggle='popover' data-trigger='click'>" +
		                   "   		<img alt='stop icon' id='img_select1' src='images/stop/stop_classic.gif' " +
			           "                 style='position:relative; left:10px; height:30px !important; width:30px !important;'>" +
			           "</a>",
                      code_init:   function() { 
			               $('#img_select1').attr("src","images/stop/stop_" +  get_cfg('ICON_theme') + ".gif"); 
			               $('#breakpointicon1').popover({ html: true, content: wepsim_show_breakpoint_icon_list, sanitizeFn: function(content){return content;}  }); 
		                   },
                      description: "<span data-langkey='Breakpoint icon: icon to be used for breakpoints'>Breakpoint icon: icon to be used for breakpoints</span>"
                   });

    ws_config.push({
                      id:          "select6",
                      type:        "Execution",
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

    ws_config.push({
                      id:          "select3",
                      type:        "Execution",
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

    ws_config.push({
                      id:          "radio2",
                      type:        "Register file",
                      code_cfg:    " <div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label2-16'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: hexadecimal'" +
				   "		   onclick=\"update_cfg('RF_display_format',16); show_rf_values(); show_states(); show_memories_values();\">" +
				   "		<input type='radio' name='options' id='radio2-16'   autocomplete='off' >Hex." +
				   "	    </label>" +
				   "	    <label id='label2-10'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: decimal'" +
				   "		   onclick=\"update_cfg('RF_display_format',10); show_rf_values(); show_states(); show_memories_values();\">" +
				   "		<input type='radio' name='options' id='radio2-10'  autocomplete='off' >Dec." +
				   "	    </label>" +
				   "	    <label id='label2-8'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display format: octal'" +
				   "		   onclick=\"update_cfg('RF_display_format',8); show_rf_values(); show_states(); show_memories_values();\">" +
				   "		<input type='radio' name='options' id='radio2-8'  autocomplete='off' >Oct." +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { 
			               $('#label2-' + get_cfg('RF_display_format')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Display format'>Display format</span>&nbsp;" +
                                   "<a href='#' data-toggle='popover1' title='Example of display formats' data-html='true' " +
                                   "   data-content='<img alt=\"register file example\" src=\"images/cfg-rf.gif\" class=\"img-fluid\">'><span <span data-langkey='(example)'>(example)</span></a>"
                   });

    ws_config.push({
                      id:          "radio3",
                      type:        "Register file",
                      code_cfg:    " <div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label3-numerical'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display name (number)'" +
				   "		   onclick=\"update_cfg('RF_display_name','numerical'); show_rf_names();\">" +
				   "		<input type='radio' name='options' id='radio3-numerical'  autocomplete='off' ><span data-langkey='Numbers'>Numbers</span>" +
				   "	    </label>" +
				   "	    <label id='label3-logical'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display name (user identification)'" +
				   "		   onclick=\"update_cfg('RF_display_name','logical'); show_rf_names();\">" +
				   "		<input type='radio' name='options' id='radio3-logical' autocomplete='off' ><span data-langkey='Labels'>Labels</span>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { 
			               $('#label3-' +   get_cfg('RF_display_name')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Register file names'>Register file names</span>"
                   });

    ws_config.push({
                      id:          "radio9",
                      type:        "Register file",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label9-true'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is editable: true'" +
				   "		   onclick=\"update_cfg('is_editable',true);\">" +
				   "		<input type='radio' name='options' id='radio9-true'  aria-label='Is editable: true'  autocomplete='off' >On" +
				   "	    </label>" +
				   "	    <label id='label9-false'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is editable: false'" +
				   "		   onclick=\"update_cfg('is_editable',false);\">" +
				   "		<input type='radio' name='options' id='radio9-false' aria-label='Is editable: false' autocomplete='off' >Off" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { 
			               $('#label9-' +       get_cfg('is_editable')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Editable registers: edit register file values'>Editable registers: edit register file values</span>"
                   });

    ws_config.push({
                      id:          "colorpicker1",
                      type:        "Circuitry simulation",
                      code_cfg:    "<fieldset data-role='controlgroup' data-type='horizontal' data-mini='true' style='margin:0 0 0 0'>" +
				   "	 <input type='color'" +
				   "		aria-label='Color for active data'" +
				   "		id='colorpicker1'" +
				   "		data-show-value='false'" +
				   "		class='noshadow-d m-0' " +
				   "		onchange=\"update_cfg('color_data_active', $('#colorpicker1').spectrum('get')); refresh();\">" +
				   "</fieldset>",
		      code_init:   function() { 
			               $('#colorpicker1').spectrum({ preferredFormat: 'hex', color: get_cfg('color_data_active')}); 
		                   },
                      description: "<span data-langkey='Data-path color'>Data-path color</span> <a href='#' data-toggle='popover1' title='Example of data-path color' data-html='true' data-content='<img alt=\"register file example\" src=\"images/cfg-colors.gif\" class=\"img-fluid\">'><span <span data-langkey='(example)'>(example)</span></a>"
                   });

    ws_config.push({
                      id:          "colorpicker2",
                      type:        "Circuitry simulation",
                      code_cfg:    "<fieldset data-role='controlgroup' data-type='horizontal' data-mini='true' style='margin:0 0 0 0'>" +
				   "	 <input type='color'" +
				   "		aria-label='Color for active signal name'" +
				   "		id='colorpicker2'" +
				   "		data-show-value='false'" +
				   "		class='noshadow-d m-0' " +
				   "		onchange=\"update_cfg('color_name_active', $('#colorpicker2').spectrum('get')); refresh();\">" +
				   "	 </fieldset> ",
		      code_init:   function() { 
			               $('#colorpicker2').spectrum({ preferredFormat: 'hex', color: get_cfg('color_name_active')}); 
		                   },
                      description: "<span data-langkey='Signal color'>Signal color</span>"
                   });

    ws_config.push({
                      id:          "radio10",
                      type:        "Circuitry simulation",
                      code_cfg:    " <div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label10-true'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is by value: true'" +
				   "		   onclick=\"update_cfg('is_byvalue',true);\">" +
				   "		<input type='radio' name='options' id='radio10-true'   autocomplete='off' >Value" +
				   "	    </label>" +
				   "	    <label id='label10-false'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is by value: false'" +
				   "		   onclick=\"update_cfg('is_byvalue',false);\">" +
				   "		<input type='radio' name='options' id='radio10-false'  autocomplete='off' >Activation" +
				   "	    </label>" +
				   "	</div> ",
		      code_init:   function() { 
			               $('#label10-' +       get_cfg('is_byvalue')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Show by value or by activation'>Show by value or by activation</span>"
                   });

    ws_config.push({
                      id:          "radio5",
                      type:        "Circuitry simulation",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label5-true'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is interactive: true'" +
				   "		   onclick=\"update_cfg('is_interactive',true);\">" +
				   "		<input type='radio' name='options' id='radio5-true'   autocomplete='off' >On" +
				   "	    </label>" +
				   "	    <label id='label5-false'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is interactive: false'" +
				   "		   onclick=\"update_cfg('is_interactive',false);\">" +
				   "		<input type='radio' name='options' id='radio5-false'  autocomplete='off' >Off" +
				   "	    </label>" +
				   "	</div> ",
		      code_init:   function() { 
			               $('#label5-' +    get_cfg('is_interactive')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Interactive mode: signal value can be updated'>Interactive mode: signal value can be updated</span>"
                   });

    ws_config.push({
                      id:          "radio6",
                      type:        "Circuitry simulation",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label6-true'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is quick interactive: true'" +
				   "		   onclick=\"update_cfg('is_quick_interactive',true);\">" +
				   "		<input type='radio' name='options' id='radio6-true'   autocomplete='off' >On" +
				   "	    </label>" +
				   "	    <label id='label6-false'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Is quick interactive: false'" +
				   "		   onclick=\"update_cfg('is_quick_interactive',false);\">" +
				   "		<input type='radio' name='options' id='radio6-false'  autocomplete='off' >Off" +
				   "	    </label>" +
				   "	</div> ",
		      code_init:   function() { 
			               $('#label6-' +    get_cfg('is_quick_interactive')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Quick interactive mode: quick update of signal value'>Quick interactive mode: quick update of signal value</span>"
                   });

    ws_config.push({
                      id:          "radio11",
                      type:        "Accesibility",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label11-true'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Active voice: true'" +
				   "		   onclick=\"update_cfg('use_voice',true); wepsim_voice_start();\">" +
				   "		<input type='radio' name='options' id='radio11-true'   autocomplete='off' >On" +
				   "	    </label>" +
				   "	    <label id='label11-false'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Active voice: false'" +
				   "		   onclick=\"update_cfg('use_voice',false); wepsim_voice_stop();\">" +
				   "		<input type='radio' name='options' id='radio11-false'  autocomplete='off' >Off" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { 
			               $('#label11-' +        get_cfg('use_voice')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Active voice: external voice control'>Active voice: external voice control</span>"
                   });

    ws_config.push({
                      id:          "radio13",
                      type:        "Accesibility",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label13-text'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Verbose: text'" +
				   "		   onclick=\"update_cfg('verbal_verbose','text');\">" +
				   "		<input type='radio' name='options' id='radio13-text'   autocomplete='off' >Text" +
				   "	    </label>" +
				   "	    <label id='label13-math'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Verbose: math'" +
				   "		   onclick=\"update_cfg('verbal_verbose','math');\">" +
				   "		<input type='radio' name='options' id='radio13-math'  autocomplete='off' >Math" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { 
			               $('#label13-' + get_cfg('verbal_verbose')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Verbalization: textual or mathematical'>Verbalization: textual or mathematical</span>"
                   });

    ws_config.push({
                      id:          "slider3",
                      type:        "Accesibility",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label8-2000'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: slow'" +
				   "		   onclick=\"update_cfg('NOTIF_delay', 2000);\">" +
				   "		<input type='radio' name='options' id='radio8-2000'   autocomplete='off' ><span data-langkey='Slow'>Slow</span>" +
				   "	    </label>" +
				   "	    <label id='label8-1000'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: normal'" +
				   "		   onclick=\"update_cfg('NOTIF_delay', 1000);\">" +
				   "		<input type='radio' name='options' id='radio8-1000'  autocomplete='off' ><span data-langkey='Normal'>Normal</span>" +
				   "	    </label>" +
				   "	    <label id='label8-100'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: fast'" +
				   "		   onclick=\"update_cfg('NOTIF_delay', 100);\">" +
				   "		<input type='radio' name='options' id='radio8-100'  autocomplete='off' ><span data-langkey='Fast'>Fast</span>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { 
			               $('#label8-' + get_cfg('NOTIF_delay')).button('toggle'); 
		                   },
                      description: "<span data-langkey='Notification speed: time before disapear'>Notification speed: time before disapear</span>"
                   });

