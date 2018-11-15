
    config.en.push({
                      id:          "select7",
                      type:        "General",
                      code_cfg:    "<div class='form-group' style='margin:0 0 0 0;'>" +
				   " <select name='select7' id='select7' class='form-control form-control-sm custom-select'" +
				   "	     aria-label='idiom for examples and help' " +
				   "	     onchange=\"var opt = $(this).find('option:selected');" +
				   "	 	        var optValue = opt.val();" +
				   "		        update_cfg('ws_idiom',optValue);" +
				   "		        wepsim_open_config_index();\"" +
				   "	     data-native-menu='false'>" +
				   "	<option value='es'>Spanish</option>" +
				   "	<option value='en'>English</option>" +
				   " </select>" +
			           "</div>",
                      code_init:   function() { $('#select7').val(get_cfg('ws_idiom')); },
                      description: "Idiom for help, examples, etc."
                   });

    config.en.push({
                      id:          "radio11",
                      type:        "General",
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
		      code_init:   function() { $('#radio11-' +        get_cfg('use_voice')).click(); },
                      description: "Active voice: experimental voice control"
                   });

    config.en.push({
                      id:          "slider3",
                      type:        "General",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label8-2000'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: slow'" +
				   "		   onclick=\"update_cfg('NOTIF_delay', 2000);\">" +
				   "		<input type='radio' name='options' id='radio8-2000'   autocomplete='off' >Slow" +
				   "	    </label>" +
				   "	    <label id='label8-1000'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: normal'" +
				   "		   onclick=\"update_cfg('NOTIF_delay', 1000);\">" +
				   "		<input type='radio' name='options' id='radio8-1000'  autocomplete='off' >Normal" +
				   "	    </label>" +
				   "	    <label id='label8-100'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Notification delay: fast'" +
				   "		   onclick=\"update_cfg('NOTIF_delay', 100);\">" +
				   "		<input type='radio' name='options' id='radio8-100'  autocomplete='off' >Fast" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { $('#radio8-' + get_cfg('NOTIF_delay')).click(); },
                      description: "Notification speed: time before disapear"
                   });

    config.en.push({
                      id:          "radio7",
                      type:        "Editor",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label7-default'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;' " +
				   "		   onclick=\"update_cfg('editor_theme','default');" +
				   "			     sim_cfg_editor_theme(inputfirm) ;" +
				   "			     sim_cfg_editor_theme(inputasm) ;\">" +
				   "		<input type='radio' name='options' id='radio7-default' aria-label='Editor theme: light' autocomplete='off' >Light" +
				   "	    </label>" +
				   "	    <label id='label7-blackboard'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;' " +
				   "		   onclick=\"update_cfg('editor_theme','blackboard');" +
				   "			     sim_cfg_editor_theme(inputfirm) ;" +
				   "			     sim_cfg_editor_theme(inputasm) ;\">" +
				   "		<input type='radio' name='options' id='radio7-blackboard' aria-label='Editor theme: dark' autocomplete='off' >Dark" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { $('#radio7-' +      get_cfg('editor_theme')).click(); },
                      description: "Editor theme: light or dark"
                   });

    config.en.push({
                      id:          "select2",
                      type:        "Editor",
                      code_cfg:    "<div class='form-group' style='margin:0 0 0 0;'>" +
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
                      code_init:   function() { $('#select2').val(get_cfg('editor_mode')); },
                      description: "Editor mode: vim, emacs, etc."
                   });

    config.en.push({
                      id:          "radio12",
                      type:        "Execution",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label12-50'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: slow'" +
				   "		   onclick=\"update_cfg('DBG_delay', 50);\">" +
				   "		<input type='radio' name='options' id='radio12-50'   autocomplete='off' >Slow" +
				   "	    </label>" +
				   "	    <label id='label12-5'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: normal'" +
				   "		   onclick=\"update_cfg('DBG_delay', 5);\">" +
				   "		<input type='radio' name='options' id='radio12-5'  autocomplete='off' >Normal" +
				   "	    </label>" +
				   "	    <label id='label12-1'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: fast'" +
				   "		   onclick=\"update_cfg('DBG_delay', 1);\">" +
				   "		<input type='radio' name='options' id='radio12-1'  autocomplete='off' >Fast" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { $('#radio12-' +        get_cfg('DBG_delay')).click(); },
                      description: "Running speed: execution speed"
                   });

    config.en.push({
                      id:          "radio1",
                      type:        "Execution",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label1-instruction'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Execution unit: instruction'" +
				   "		   onclick=\"update_cfg('DBG_level','instruction');\">" +
				   "		<input type='radio' name='options' id='radio1-instruction'   autocomplete='off' >" +
				   "		<span class='d-none d-sm-inline-flex'>Instructions</span><span class='d-sm-none'>Instruc.</span></label>" +
				   "	    </label>" +
				   "	    <label id='label1-microinstruction'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Execution unit: microinstruction'" +
				   "		   onclick=\"update_cfg('DBG_level','microinstruction');\">" +
				   "		<input type='radio' name='options' id='radio1-microinstruction'  autocomplete='off' >" +
				   "		<span class='d-none d-sm-inline-flex'>&#181;instructions</span><span class='d-sm-none'>&#181;instruc.</span></label>" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { $('#radio1-' +         get_cfg('DBG_level')).click(); },
                      description: "Step-by-step: element in run mode"
                   });

    config.en.push({
                      id:          "select1",
                      type:        "Execution",
                      code_cfg:    "<a href='#' id='breakpointicon1' title='Please select breakpoint icon' tabindex='0'" +
			           "   data-toggle='popover' data-trigger='focus'>" +
		                   "   		<img alt='stop icon' id='img_select1' src='images/stop/stop_classic.gif' " +
			           "                 style='position:relative; left:10px; height:30px !important; width:30px !important;'>" +
			           "</a>",
                      code_init:   function() { $('#img_select1').attr("src","images/stop/stop_" +  get_cfg('ICON_theme') + ".gif"); $('#breakpointicon1').popover({ html: true, content: wepsim_show_breakpoint_icon_list }); },
                      description: "Breakpoint icon: icon to be used for breakpoints"
                   });

    config.en.push({
                      id:          "select6",
                      type:        "Execution",
                      code_cfg:    " <div class='form-group' style='margin:0 0 0 0;'>" +
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
                      code_init:   function() { $('#select6').val(get_cfg('DBG_limitins')); },
                      description: "Limit instructions: number of instructions to be executed"
                   });

    config.en.push({
                      id:          "select3",
                      type:        "Execution",
                      code_cfg:    " <div class='form-group' style='margin:0 0 0 0;'>" +
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
                      code_init:   function() { $('#select3').val(get_cfg('DBG_limitick')); },
                      description: "Limit instruction ticks: to limit clock ticks"
                   });

    config.en.push({
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
		      code_init:   function() { $('#radio2-' + get_cfg('RF_display_format')).click(); },
                      description: "Display format&nbsp;" +
                                   "<a href='#' data-toggle='popover1' title='Example of display formats' data-html='true' " +
                                   "   data-content='<img alt=\"register file example\" src=\"images/cfg-rf.gif\" class=\"img-fluid\">'>(example)</a>"
                   });

    config.en.push({
                      id:          "radio3",
                      type:        "Register file",
                      code_cfg:    " <div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
				   "	    <label id='label3-numerical'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display name (number)'" +
				   "		   onclick=\"update_cfg('RF_display_name','numerical'); show_rf_names();\">" +
				   "		<input type='radio' name='options' id='radio3-numerical'  autocomplete='off' >Numbers" +
				   "	    </label>" +
				   "	    <label id='label3-logical'" +
				   "		   class='btn btn-sm btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='register file display name (user identification)'" +
				   "		   onclick=\"update_cfg('RF_display_name','logical'); show_rf_names();\">" +
				   "		<input type='radio' name='options' id='radio3-logical' autocomplete='off' >Labels" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { $('#radio3-' +   get_cfg('RF_display_name')).click(); },
                      description: "Register file names"
                   });

    config.en.push({
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
		      code_init:   function() { $('#radio9-' +       get_cfg('is_editable')).click(); },
                      description: "Editable registers: edit register file values"
                   });

    config.en.push({
                      id:          "colorpicker1",
                      type:        "Circuitry simulation",
                      code_cfg:    "<fieldset data-role='controlgroup' data-type='horizontal' data-mini='true' style='margin:0 0 0 0'>" +
				   "	 <input type='color'" +
				   "		aria-label='Color for active data'" +
				   "		id='colorpicker1'" +
				   "		data-show-value='false'" +
				   "		class='noshadow-d' style='margin:0 0 0 0'" +
				   "		onchange=\"update_cfg('color_data_active', $('#colorpicker1').spectrum('get')); refresh();\">" +
				   "</fieldset>",
		      code_init:   function() { $('#colorpicker1').spectrum({ preferredFormat: 'hex', color: get_cfg('color_data_active')}); },
                      description: "Data-path color <a href='#' data-toggle='popover1' title='Example of data-path color' data-html='true' data-content='<img alt=\"register file example\" src=\"images/cfg-colors.gif\" class=\"img-fluid\">'>(example)</a>"
                   });

    config.en.push({
                      id:          "colorpicker2",
                      type:        "Circuitry simulation",
                      code_cfg:    "<fieldset data-role='controlgroup' data-type='horizontal' data-mini='true' style='margin:0 0 0 0'>" +
				   "	 <input type='color'" +
				   "		aria-label='Color for active signal name'" +
				   "		id='colorpicker2'" +
				   "		data-show-value='false'" +
				   "		class='noshadow-d' style='margin:0 0 0 0'" +
				   "		onchange=\"update_cfg('color_name_active', $('#colorpicker2').spectrum('get')); refresh();\">" +
				   "	 </fieldset> ",
		      code_init:   function() { $('#colorpicker2').spectrum({ preferredFormat: 'hex', color: get_cfg('color_name_active')}); },
                      description: "Signal color"
                   });

    config.en.push({
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
		      code_init:   function() { $('#radio10-' +       get_cfg('is_byvalue')).click(); },
                      description: "Show by value or by activation"
                   });

    config.en.push({
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
		      code_init:   function() { $('#radio5-' +    get_cfg('is_interactive')).click(); },
                      description: "Interactive mode: signal value can be updated"
                   });

