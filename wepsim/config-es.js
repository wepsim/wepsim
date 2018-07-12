
        config.es = [] ;

    config.es.push({
                      id:          "select7",
                      type:        "General",
                      code_cfg:    "<div class='form-group' style='margin:0 0 0 0;'>" +
				   " <select name='select7' id='select7' class='form-control form-control-sm custom-select'" +
				   "	     aria-label='idiom for examples and help' data-role='none'" +
				   "	     onchange=\"var opt = $(this).find('option:selected');" +
				   "	 	        var optValue = opt.val();" +
				   "		        set_cfg('ws_idiom',optValue); save_cfg();" +
				   "		        wepsim_open_config_index();\"" +
				   "	     data-native-menu='false'>" +
				   "	<option value='es'>Spanish</option>" +
				   "	<option value='en'>English</option>" +
				   " </select>" +
			           "</div>",
                      code_init:   function() { $('#select7').val(get_cfg('ws_idiom')); },
                      description: "Idioma para ayuda, ejemplos, etc."
                   });

    config.es.push({
                      id:          "radio11",
                      type:        "General",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' data-role='none'>" +
				   "	    <label id='label11-true'" +
				   "		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Active voice: true'" +
				   "		   onclick=\"set_cfg('use_voice',true); save_cfg(); wepsim_voice_start();\">" +
				   "		<input type='radio' name='options' id='radio11-true'   autocomplete='off' data-role='none'>On" +
				   "	    </label>" +
				   "	    <label id='label11-false'" +
				   "		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Active voice: false'" +
				   "		   onclick=\"set_cfg('use_voice',false); save_cfg(); wepsim_voice_stop();\">" +
				   "		<input type='radio' name='options' id='radio11-false'  autocomplete='off' data-role='none'>Off" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { $('#radio11-' +        get_cfg('use_voice')).click(); },
                      description: "Active voice: control por voz experimental"
                   });

    config.es.push({
                      id:          "slider3",
                      type:        "General",
                      code_cfg:    "<input type='range'" +
				   "	   class='custom-range' data-role='none'" +
				   "	   aria-label='Notification delay'" +
				   "	   data-show-value='false' data-theme='a'" +
				   "	   name='slider3' id='slider3'" +
				   "	   min='100' max='2000' value='1000' step='100'" +
				   "	   onchange=\"set_cfg('NOTIF_delay', this.value); save_cfg();\">",
                      code_init:   function() { $('#slider3').val(get_cfg('NOTIF_delay')); },
                      description: "Tiempo hasta que desaparecen las notificaciones (r&aacute;pido - lento)"
                   });

    config.es.push({
                      id:          "radio7",
                      type:        "Editor",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' data-role='none'>" +
				   "	    <label id='label7-default'" +
				   "		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;' " +
				   "		   onclick=\"set_cfg('editor_theme','default'); save_cfg();" +
				   "			    inputfirm.getWrapperElement().style['font-weight'] = 'bold';" +
				   "			    inputfirm.setOption('theme','default');" +
				   "			    inputasm.getWrapperElement().style['font-weight'] = 'bold';" +
				   "			    inputasm.setOption('theme','default');\">" +
				   "		<input type='radio' name='options' id='radio7-default' aria-label='Editor theme: light' autocomplete='off' data-role='none'>Light" +
				   "	    </label>" +
				   "	    <label id='label7-blackboard'" +
				   "		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;' " +
				   "		   onclick=\"set_cfg('editor_theme','blackboard'); save_cfg();" +
				   "			    inputfirm.getWrapperElement().style['font-weight'] = 'normal';" +
				   "			    inputfirm.setOption('theme','blackboard');" +
				   "			    inputasm.getWrapperElement().style['font-weight'] = 'normal';" +
				   "			    inputasm.setOption('theme','blackboard');\">" +
				   "		<input type='radio' name='options' id='radio7-blackboard' aria-label='Editor theme: dark' autocomplete='off' data-role='none'>Dark" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { $('#radio7-' +      get_cfg('editor_theme')).click(); },
                      description: "Editor theme: claro u oscuro"
                   });

    config.es.push({
                      id:          "select2",
                      type:        "Editor",
                      code_cfg:    "<div class='form-group' style='margin:0 0 0 0;'>" +
			           "   <select name='select2' id='select2' class='form-control form-control-sm custom-select'" +
			           "	    aria-label='Editor mode'    data-role='none'" +
			           "	    onchange=\"var opt = $(this).find('option:selected');" +
			           "		      var optValue = opt.val();" +
			           "		      set_cfg('editor_mode',optValue); save_cfg();" +
			           "		      inputfirm.setOption('keyMap',optValue);" +
			           "		      inputasm.setOption('keyMap',optValue);\"" +
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

    config.es.push({
                      id:          "radio12",
                      type:        "Execution",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' data-role='none'>" +
				   "	    <label id='label12-50'" +
				   "		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: slow'" +
				   "		   onclick=\"set_cfg('DBG_delay', 50); save_cfg();\">" +
				   "		<input type='radio' name='options' id='radio12-50'   autocomplete='off' data-role='none'>Slow" +
				   "	    </label>" +
				   "	    <label id='label12-5'" +
				   "		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: normal'" +
				   "		   onclick=\"set_cfg('DBG_delay', 5); save_cfg();\">" +
				   "		<input type='radio' name='options' id='radio12-5'  autocomplete='off' data-role='none'>Normal" +
				   "	    </label>" +
				   "	    <label id='label12-1'" +
				   "		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				   "		   aria-label='Speed: fast'" +
				   "		   onclick=\"set_cfg('DBG_delay', 1); save_cfg();\">" +
				   "		<input type='radio' name='options' id='radio12-1'  autocomplete='off' data-role='none'>Fast" +
				   "	    </label>" +
				   "	</div>",
		      code_init:   function() { $('#radio12-' +        get_cfg('DBG_delay')).click(); },
                      description: "Running speed: velocidad de ejecuci&oacute;n"
                   });

    config.es.push({
                      id:          "radio1",
                      type:        "Execution",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' data-role='none'>" +
				"	    <label id='label1-instruction'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='Execution unit: instruction'" +
				"		   onclick=\"set_cfg('DBG_level','instruction'); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio1-instruction'   autocomplete='off' data-role='none'>" +
				"		<span class='d-none d-sm-inline-flex'>Instructions</span><span class='d-sm-none'>Instruc.</span></label>" +
				"	    </label>" +
				"	    <label id='label1-microinstruction'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='Execution unit: microinstruction'" +
				"		   onclick=\"set_cfg('DBG_level','microinstruction'); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio1-microinstruction'  autocomplete='off' data-role='none'>" +
				"		<span class='d-none d-sm-inline-flex'>&#181;instructions</span><span class='d-sm-none'>&#181;instruc.</span></label>" +
				"	    </label>" +
				"	</div>",
		      code_init:   function() { $('#radio1-' +         get_cfg('DBG_level')).click(); },
                      description: "Step-by-step: elemento a ejecutar de uno a uno"
                   });

    config.es.push({
                      id:          "select1",
                      type:        "Execution",
                      code_cfg:    "<a href='#' id='breakpointicon1' title='Please select your breakpoint Icon or click here to cancel' tabindex='0'" +
			           "   data-toggle='popover' data-trigger='focus'>" +
		                   "   		<img alt='stop icon' id='img_select1' src='images/stop_classic.gif' " +
			           "                 style='position:relative; left:10px; height:30px !important; width:30px !important;'>" +
			           "</a>",
                      code_init:   function() { $('#img_select1').attr("src","images/stop_" +  get_cfg('ICON_theme') + ".gif"); $('#breakpointicon1').popover({ html: true, content: wepsim_show_breakpoint_icon_list }); },
                      description: "Breakpoint icon: icono a ser usado en puntos de ruptura"
                   });

    config.es.push({
                      id:          "select6",
                      type:        "Execution",
                      code_cfg:    " <div class='form-group' style='margin:0 0 0 0;'>" +
				"	    <select name='select6' id='select6' class='form-control form-control-sm custom-select'" +
				"		    aria-label='max. ticks per instruction' data-role='none'" +
				"		    onchange=\"var opt = $(this).find('option:selected');" +
				"			       var optValue = opt.val();" +
				"			       set_cfg('DBG_limitins',optValue); save_cfg();\"" +
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
                      description: "Limit instructions: n&uacute;mero de instrucciones a ser ejecutadas"
                   });

    config.es.push({
                      id:          "select3",
                      type:        "Execution",
                      code_cfg:    " <div class='form-group' style='margin:0 0 0 0;'>" +
				"	    <select name='select3' id='select3' class='form-control form-control-sm custom-select'" +
				"		    aria-label='max. ticks per instruction' data-role='none'" +
				"		    onchange=\"var opt = $(this).find('option:selected');" +
				"			       var optValue = opt.val();" +
				"			       set_cfg('DBG_limitick',optValue); save_cfg();\"" +
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
                      description: "Limit instruction ticks:  limitaci&oacute;n de ticks de reloj"
                   });

    config.es.push({
                      id:          "radio2",
                      type:        "Register file",
                      code_cfg:    " <div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' data-role='none'>" +
				"	    <label id='label2-16'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='register file display format: hexadecimal'" +
				"		   onclick=\"set_cfg('RF_display_format',16); show_rf_values(); show_states(); show_memories_values(); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio2-16'   autocomplete='off' data-role='none'>Hex." +
				"	    </label>" +
				"	    <label id='label2-10'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='register file display format: decimal'" +
				"		   onclick=\"set_cfg('RF_display_format',10); show_rf_values(); show_states(); show_memories_values(); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio2-10'  autocomplete='off' data-role='none'>Dec." +
				"	    </label>" +
				"	    <label id='label2-8'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='register file display format: octal'" +
				"		   onclick=\"set_cfg('RF_display_format',8); show_rf_values(); show_states(); show_memories_values(); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio2-8'  autocomplete='off' data-role='none'>Oct." +
				"	    </label>" +
				"	</div>",
		      code_init:   function() { $('#radio2-' + get_cfg('RF_display_format')).click(); },
                      description: "Formato de presentaci&oacute;n&nbsp;" +
                                   "<a href='#' data-toggle='popover1' title='Example of display formats' data-html='true' " +
                                   "   data-content='<img alt=\"register file example\" src=\"images/cfg-rf.gif\" style=\"height:30vh;\">'>(example)</a>"
                   });

    config.es.push({
                      id:          "radio3",
                      type:        "Register file",
                      code_cfg:    " <div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' data-role='none'>" +
				"	    <label id='label3-numerical'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='register file display name (number)'" +
				"		   onclick=\"set_cfg('RF_display_name','numerical'); show_rf_names(); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio3-numerical'  autocomplete='off' data-role='none'>Numbers" +
				"	    </label>" +
				"	    <label id='label3-logical'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='register file display name (user identification)'" +
				"		   onclick=\"set_cfg('RF_display_name','logical'); show_rf_names(); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio3-logical' autocomplete='off' data-role='none'>Labels" +
				"	    </label>" +
				"	</div>",
		      code_init:   function() { $('#radio3-' +   get_cfg('RF_display_name')).click(); },
                      description: "nombre de los registros"
                   });

    config.es.push({
                      id:          "radio9",
                      type:        "Register file",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' data-role='none'>" +
				"	    <label id='label9-true'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='Is editable: true'" +
				"		   onclick=\"set_cfg('is_editable',true); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio9-true'  aria-label='Active voice: true'  autocomplete='off' data-role='none'>On" +
				"	    </label>" +
				"	    <label id='label9-false'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='Is editable: false'" +
				"		   onclick=\"set_cfg('is_editable',false); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio9-false' aria-label='Active voice: false' autocomplete='off' data-role='none'>Off" +
				"	    </label>" +
				"	</div>",
		      code_init:   function() { $('#radio9-' +       get_cfg('is_editable')).click(); },
                      description: "Editable registers: editar los valores de los registros"
                   });

    config.es.push({
                      id:          "colorpicker1",
                      type:        "Circuitry simulation",
                      code_cfg:    "<fieldset data-role='controlgroup' data-type='horizontal' data-mini='true' style='margin:0 0 0 0'>" +
				   "	 <input type='color'" +
				   "		aria-label='Color for active data'" +
				   "		id='colorpicker1'" +
				   "		data-show-value='false'" +
				   "		class='noshadow-d' style='margin:0 0 0 0'" +
				   "		onchange=\"set_cfg('color_data_active', $('#colorpicker1').spectrum('get')); refresh(); save_cfg();\">" +
				   "</fieldset>",
		      code_init:   function() { $('#colorpicker1').spectrum({ preferredFormat: 'hex', color: get_cfg('color_data_active')}); },
                      description: "Data-path color <a href='#' data-toggle='popover1' title='Example of data-path color' data-html='true' data-content='<img alt=\"register file example\" src=\"images/cfg-colors.gif\" style=\"height:30vh;\">'>(example)</a>"
                   });

    config.es.push({
                      id:          "colorpicker2",
                      type:        "Circuitry simulation",
                      code_cfg:    "<fieldset data-role='controlgroup' data-type='horizontal' data-mini='true' style='margin:0 0 0 0'>" +
				"	 <input type='color'" +
				"		aria-label='Color for active signal name'" +
				"		id='colorpicker2'" +
				"		data-show-value='false'" +
				"		class='noshadow-d' style='margin:0 0 0 0'" +
				"		onchange=\"set_cfg('color_name_active', $('#colorpicker2').spectrum('get')); refresh(); save_cfg();\">" +
				"	 </fieldset> ",
		      code_init:   function() { $('#colorpicker2').spectrum({ preferredFormat: 'hex', color: get_cfg('color_name_active')}); },
                      description: "Color de las se&nacute;ales activas"
                   });

    config.es.push({
                      id:          "radio10",
                      type:        "Circuitry simulation",
                      code_cfg:    " <div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' data-role='none'>" +
				"	    <label id='label10-true'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='Is by value: true'" +
				"		   onclick=\"set_cfg('is_byvalue',true); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio10-true'   autocomplete='off' data-role='none'>On" +
				"	    </label>" +
				"	    <label id='label10-false'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='Is by value: false'" +
				"		   onclick=\"set_cfg('is_byvalue',false); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio10-false'  autocomplete='off' data-role='none'>Off" +
				"	    </label>" +
				"	</div> ",
		      code_init:   function() { $('#radio10-' +       get_cfg('is_byvalue')).click(); },
                      description: "Mostrar por valor o por activaci&oacute;n"
                   });

    config.es.push({
                      id:          "radio5",
                      type:        "Circuitry simulation",
                      code_cfg:    "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' data-role='none'>" +
				"	    <label id='label5-true'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='Is interactive: true'" +
				"		   onclick=\"set_cfg('is_interactive',true); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio5-true'   autocomplete='off' data-role='none'>On" +
				"	    </label>" +
				"	    <label id='label5-false'" +
				"		   class='btn btn-light w-50 btn-outline-secondary' style='padding:2 2 2 2;'" +
				"		   aria-label='Is interactive: false'" +
				"		   onclick=\"set_cfg('is_interactive',false); save_cfg();\">" +
				"		<input type='radio' name='options' id='radio5-false'  autocomplete='off' data-role='none'>Off" +
				"	    </label>" +
				"	</div> ",
		      code_init:   function() { $('#radio5-' +    get_cfg('is_interactive')).click(); },
                      description: "Interactive mode: valores de las se&nacute;ales puede actualizarse"
                   });

