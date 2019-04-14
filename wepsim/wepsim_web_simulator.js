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


    //
    // WepSIM API
    //

    //  Workspaces

    function sim_change_workspace ( page_id, carousel_id )
    {
            if ( (typeof $.mobile                             != "undefined") &&
                 (typeof $.mobile.pageContainer               != "undefined") &&
                 (typeof $.mobile.pageContainer.pagecontainer != "undefined") )
            {
                  $.mobile.pageContainer.pagecontainer('change', page_id);
            }
            else
            {
                  $('#carousel-8').carousel(carousel_id) ;
            }
    }

    function sim_change_workspace_simulator ( )
    {
	    sim_change_workspace('#main1', 0) ;

	    setTimeout(function(){
			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.simulator');
	               }, 50) ;
    }

    function sim_change_workspace_microcode ( )
    {
	    sim_change_workspace('#main3', 1) ;

	    setTimeout(function(){
		            inputfirm.refresh() ; 

			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.microcode');
	               }, 50) ;
    }

    function sim_change_workspace_assembly ( )
    {
	    sim_change_workspace('#main4', 2) ;

	    setTimeout(function(){
		            inputasm.refresh() ; 

			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.assembly');
	               }, 50) ;
    }

    // Mode

    function wepsim_change_mode ( optValue )
    {
          var hwid = -1 ;

	  // switch active hardware by name...
          switch (optValue)
          {
	      case 'newbie':
	      case 'intro':
	      case 'wepmips':
	      case 'tutorial':
                               hwid = simhw_getIdByName('ep') ;
                               wepsim_activehw(hwid) ;
                               break;
	      default:
	                       hwid = simhw_getIdByName(optValue) ;
                               wepsim_activehw(hwid) ;
                               break;
          }

	  // show/hide wepmips...
	  if ('wepmips' == optValue)
	       wepsim_show_wepmips() ;
	  else wepsim_hide_wepmips() ;

	  // intro mode...
	  if ('intro' == optValue)
	  {
	      sim_tutorial_showframe('welcome', 0);
              return ;
	  }

	  // newbie mode...
          if ('newbie' == optValue)
          {
              wepsim_newbie_tour() ;
              return ;
          }
    }

    // Selects

    function simui_select_details ( opt )
    {
	     // update interface
	     $('#tab'  + opt).trigger('click') ;
	     $('#select5a').val(opt) ;

	     // set button label...
	     var ed=$('#s5b_' + opt).html() ;
	     $('#select5b').html(ed) ;
    }

    function simui_select_main ( opt )
    {
	     // save ws_mode
	     set_cfg('ws_mode', opt) ;
	     save_cfg() ;

	     // update select4
	     wepsim_change_mode(opt) ;

	     // tutorial mode -> set green background...
	     $('#select4').css('background-color', '#F6F6F6') ;
	     if ('tutorial' == opt) {
	         $('#select4').css('background-color', '#D4DB17') ;
	     }

	     // set button label...
	     var ed = $('#s4_' + opt).html() ;
	     $('#select4').html(ed) ;
    }

    // show/hide Assembly elements/header

    function showhideAsmElements ( )
    {
	var tlabel = [ "label", "addr", "hex", "ins", "pins" ] ;

	for (var tli=0; tli<tlabel.length; tli++)
	{
             var label_name  = "SHOWCODE_"   + tlabel[tli] ;
             var column_name = "table .asm_" + tlabel[tli] ;
             var column_show = get_cfg(label_name) ;

	     if (column_show !== false)
	          $(column_name).show() ;
	     else $(column_name).hide() ;
	}
    }

    function showhideAsmHeader ( )
    {
	var tlabel = [ "label", "addr", "hex", "ins", "pins" ] ;

	for (var tli=0; tli<tlabel.length; tli++)
	{
             var label_name = "SHOWCODE_"   + tlabel[tli] ;
             var btn_show   = get_cfg(label_name) ;
             var btn_name   = "#asm_" + tlabel[tli] ;

             $(btn_name).removeClass('btn-outline-secondary').removeClass('btn-dark') ;
	     if (btn_show !== false) 
                  $(btn_name).addClass('btn-dark') ;
	     else $(btn_name).addClass('btn-outline-secondary') ;
	}
    }

    function default_asmdbg_content_horizontal ( )
    {
	 var wsi = get_cfg('ws_idiom') ;

	 var o = "<br>" +
	         "<div class='card m-3'>" +
		 "  <div class='row no-gutters'>" +
		// "  <div class='col-md-4'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/simulator/firmware002.jpg'>" +
		// "  </div>" +
		// "  <div class='col-md-8'>" + // +
		 "  <div class='col-md-12'>" + // -
		 "  <div class='card-body py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>1</div>" +
		 "    <span data-langkey='simulator intro 1'>" + 
	         i18n_get('gui',wsi,'simulator intro 1') +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "  </div>" +
		 "  </div>" +
		 "</div>" +
		 "<div class='card m-3'>" +
		 "  <div class='row no-gutters'>" +
		// "  <div class='col-md-4'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/simulator/firmware002.jpg'>" +
		// "  </div>" +
		// "  <div class='col-md-8'>" + // +
		 "  <div class='col-md-12'>" + // -
		 "  <div class='card-body py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>2</div>" +
		 "    <span data-langkey='simulator intro 2'>" + 
	         i18n_get('gui',wsi,'simulator intro 2') +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "  </div>" +
		 "  </div>" +
		 "</div>" +
		 "<div class='card m-3'>" +
		 "  <div class='row no-gutters'>" +
		// "  <div class='col-md-4'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/welcome/simulation_xinstruction.gif'>" +
		// "  </div>" +
		// "  <div class='col-md-8'>" + // +
		 "  <div class='col-md-12'>" + // -
		 "  <div class='card-body py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>3</div>" +
		 "    <span data-langkey='simulator intro 3'>" + 
	         i18n_get('gui',wsi,'simulator intro 3') +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "  </div>" +
		 "  </div>" +
		 "</div>" ;

	 return o ;
    }

    function default_asmdbg_content_vertical ( )
    {
	 var o = "<br>" +
		 "<div class='container-fluid'>" +
		 "<div class='card-column row'>" +
		 "<div class='card m-2 col-sm'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/simulator/firmware002.jpg'>" +
		 "  <div class='card-body h-50 py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>1</div>" +
		 "    <span data-langkey='simulator intro 1'>" + 
		 "    First, you need to load the microcode to be used." +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "</div>" +
		 "<div class='card m-2 col-sm'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/simulator/firmware002.jpg'>" +
		 "  <div class='card-body h-50 py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>2</div>" +
		 "    <span data-langkey='simulator intro 2'>" + 
		 "    Next, you need to load the assembly code to be used." +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "</div>" +
		 "<div class='card m-2 col-sm'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/welcome/simulation_xinstruction.gif'>" +
		 "  <div class='card-body h-50 py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>3</div>" +
		 "    <span data-langkey='simulator intro 3'>" + 
		 "    Finally, in the simulator you are able to execute the microcode plus assembly loaded before." +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "</div>" +
		 "</div>" +
		 "</div>" ;

	 return o ;
    }

    function wepsim_activehw ( mode )
    {
	    simhw_setActive(mode) ;

            // reload images
	    var o = document.getElementById('svg_p') ;
	    if (o != null) o.setAttribute('data',  simhw_active().sim_img_processor) ;
	        o = document.getElementById('svg_cu') ;
	    if (o != null) o.setAttribute('data', simhw_active().sim_img_controlunit) ;
	        o = document.getElementById('svg_p2') ;
	    if (o != null) o.setAttribute('data', simhw_active().sim_img_cpu) ;

            // reload images event-handlers
	    var a = document.getElementById("svg_p");
	    a.addEventListener("load",function() {
		simcore_init_eventlistener("svg_p");
		refresh();
	    }, false);

	    var b = document.getElementById("svg_cu");
	    b.addEventListener("load",function() {
		simcore_init_eventlistener("svg_cu");
		refresh();
	    }, false);

            // info + warning
	    wepsim_notify_warning('<strong>WARNING</strong>',
                                  'Please remember the current firmware and assembly might need to be reloaded, ' +
                                  'because previous working session of the simulated hardware are not kept.') ;
	    wepsim_notify_success('<strong>INFO</strong>',
                                  '"' + simhw_active().sim_name + '" has been activated.') ;

            // update UI
            var SIMWARE = get_simware() ;
    	    update_memories(SIMWARE) ;
            simcore_reset() ;

            var asmdbg_content = default_asmdbg_content_horizontal() ;
	    for (var l in SIMWARE.assembly) // <===> if (SIMWARE.assembly != {})
	    {
                 asmdbg_content = assembly2html(SIMWARE.mp, SIMWARE.labels2, SIMWARE.seg, SIMWARE.assembly) ;
		 break ;
	    }
            $("#asm_debugger").html(asmdbg_content);

            showhideAsmElements();
    }

    function wepsim_show_wepmips ( )
    {
        $(".multi-collapse-2").collapse("show") ;
	$("#slider_cpucu").hide() ;

	$("#tab26").hide() ;
	$("#tab21").hide() ;
	$("#tab24").click() ;

        inputfirm.setOption('readOnly', true) ;
        $("#btn_micro1").addClass('d-none') ;
    }

    function wepsim_hide_wepmips ( )
    {
        $(".multi-collapse-2").collapse("show") ;
	$("#slider_cpucu").show() ;

	$("#tab26").show() ;
	$("#tab21").show() ;

        inputfirm.setOption('readOnly', false) ;
        $("#btn_micro1").removeClass('d-none') ;
    }

    // hardware

    function wepsim_load_hw ( )
    {
/*
	    // load hardware...
	    ep_def_json = $.getJSON({'url': "examples/hardware/ep/hw_def.json", 'async': false}) ;
            simcore_hardware_import(ep_def_json.responseText) ;

	    poc_def_json = $.getJSON({'url': "examples/hardware/poc/hw_def.json", 'async': false}) ;
            simcore_hardware_import(poc_def_json.responseText) ;
*/

	    return true ;
    }

    // Popovers

    function wepsim_click_asm_columns ( name )
    {
        var label_name = "SHOWCODE_" + name ;
        var show_elto  = get_cfg(label_name) ;

	show_elto = !show_elto ;

        var column_name = "table .asm_" + name ;
        if (show_elto !== false)
   	     $(column_name).show() ;
        else $(column_name).hide() ;

	set_cfg(label_name, show_elto) ;
	save_cfg() ;

        var btn_name = "#asm_" + name ;
	$(btn_name).removeClass('btn-outline-secondary').removeClass('btn-dark') ;
        if (show_elto !== false)
	     $(btn_name).addClass('btn-dark') ;
	else $(btn_name).addClass('btn-outline-secondary') ;
    }

    function wepsim_show_asm_columns_checked ( asm_po )
    {
        var o = '<button type="button" id="asm_label" aria-label="Show label" ' +
		'        onclick="wepsim_click_asm_columns(\'label\'); return false;" ' +
		'        class="btn btn-sm btn-block btn-outline-secondary mb-1">labels</button>' +
		'<button type="button" id="asm_hex" aria-label="Show content" ' +
		'        onclick="wepsim_click_asm_columns(\'hex\'); return false;" ' +
                '        class="btn btn-sm btn-block btn-outline-secondary mb-1">content</button>' +
		'<button type="button" id="asm_ins" aria-label="Show instruction" ' +
		'        onclick="wepsim_click_asm_columns(\'ins\'); return false;" ' +
                '        class="btn btn-sm btn-block btn-outline-secondary mb-1">assembly</button>' +
		'<button type="button" id="asm_pins" aria-label="Show pseudoinstruction" ' +
		'        onclick="wepsim_click_asm_columns(\'pins\'); return false;" ' +
                '        class="btn btn-sm btn-block btn-outline-secondary mb-1">pseudo<span class="d-none d-md-inline">-instructions</span></button>' +
                '<button type="button" id="close" data-role="none" ' +
                '        class="btn btn-sm btn-danger w-100 p-0 mt-1" ' +
                '        onclick="$(\'#' + asm_po + '\').popover(\'hide\');"' + 
	        '><span data-langkey="Close">Close</span></button>' ;

        return o ;
    }

    function wepsim_show_quick_menu ( quick_po )
    {
        var wsi = get_cfg('ws_idiom') ;

        var o = '<ul class="list-group list-group-flush">' +
		'<li class="list-group-item px-0 pt-1"> ' +
		'  <em class="fas fa-flag"></em> &nbsp;' +
		'  <a class="btn btn-sm btn-outline-secondary col-auto p-1 text-left" href="#" ' +
                '     onclick="simcoreui_notify_notifications(); ' +
		'              $(\'#' + quick_po + '\').popover(\'hide\');">' +
		i18n_get('gui',wsi,'Show Notifications') + '...</a>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-bars"></em> &nbsp;' +
                '  <span class="btn-group-toggle" data-toggle="buttons">' +
		'  <label class="btn btn-sm btn-outline-secondary col-auto p-1 text-left" data-toggle="collapse" href=".multi-collapse-1">' +
		'  <input type="checkbox" checked="" autocomplete="off">' +
		i18n_get('gui',wsi,'Show/Hide ActionBar') + '</label>' +
		'  </span>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-sliders-h"></em> &nbsp;' +
                '  <span class="btn-group-toggle" data-toggle="buttons">' +
		'  <label class="btn btn-sm btn-outline-secondary col-10 p-1 text-left" data-toggle="collapse" href=".multi-collapse-2">' +
		'  <input type="checkbox" checked="" autocomplete="off">' +
		i18n_get('gui',wsi,'Show/Hide Slider') + '</label>' +
		'  </span>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-magic"></em> &nbsp;' +
		'  <a class="btn btn-sm btn-outline-secondary col-10 p-1 text-left" href="#" ' +
		'     onclick="$(\'#about2\').modal(\'show\'); ' +
		'              $(\'#' + quick_po + '\').popover(\'hide\');">' +
		i18n_get('gui',wsi,'About WepSIM') + '...</a>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-book-reader"></em> &nbsp;' +
		'  <a class="btn btn-sm btn-outline-secondary col-10 pr-2 text-left" href="#" ' +
		'     onclick="wepsim_newbie_tour(); ' +
		'              $(\'#' + quick_po + '\').popover(\'hide\');">' +
		i18n_get('gui',wsi,'Initial intro') + '...</a>' +
		'</li>' +
	        '<button type="button" id="close" data-role="none" ' + 
		'        class="btn btn-sm btn-danger w-100 p-0 mt-2" ' +
		'        onclick="$(\'#' + quick_po + '\').popover(\'hide\');">' +
		i18n_get('gui',wsi,'Close') +
                '</button>' +
		'</ul>' ;

        return o ;
    }

    // sliders

    function set_ab_size ( diva, divb, new_value )
    {
	var a = new_value;
    	var b = 12 - a;

	$(diva).removeClass();
	$(divb).removeClass();

	if (a != 0)
             $(diva).addClass('col-' + a);
	else $(diva).addClass('col-12 order-1');

	if (b != 0)
	     $(divb).addClass('col-' + b);
	else $(divb).addClass('col-12 order-2');
    }

    // Preload work

    function wepsim_preload_hash ( hash )
    {
	    var o = '' ;

	    // parameter: mode
	    if (hash['mode'] !== null)
	    {
                simui_select_main(hash['mode']) ;
	        o += '<li>Mode set to <strong>' + hash['mode'] + '</strong>.</li> ' ;
	    }

	    // parameter: example
	    if (hash['example'] !== null)
	    {
		var example_index = parseInt(hash['example']) ;
		var example_obj   = examples.en[example_index] ;
	        if (typeof example_obj !== "undefined")
		{
		    var example_uri = example_obj.hardware + ":" + example_obj.microcode + ":" + example_obj.assembly ;
	            load_from_example_firmware(example_uri, true) ;
	            o += '<li>Example titled <strong>' + example_obj.title + '</strong> has been loaded.</li> ' ;
		}
	    }

	    // parameter: simulator UI
	    var panels = [] ;
	    if (hash['simulator'] !== null) {
	        panels = hash['simulator'].split(":") ;
	        o += '<li>User interface has been adapted.</li> ' ;
            }

	    if (typeof panels[0] !== "undefined")
	    {
		if (panels[0] === "microcode") {
	            $("#tab26").click() ;
                }
		if (panels[0] === "assembly") {
	            $("#tab24").click() ;
                }
	    }

	    if (typeof panels[1] !== "undefined")
	    {
		var panel2_ref  = panels[1].toUpperCase() ;
		var evt_handler = hash_detail2action[panel2_ref] ;
		if (typeof evt_handler !== "undefined") {
		    evt_handler() ;
                }
	    }

	    // notify the user of the preloaded work
	    if (o !== '') {
		o = 'WepSIM has been instructed to preload some work for you:<br>' + 
		    '<ul>' + o + '</ul>' + 
		    'To close this notification please press in the ' +
                    '<span class="btn btn-sm btn-info py-0" data-dismiss="alert">X</span> mark. <br>' +
	            'In order to execute an example please press the ' + 
		    '<span class="btn btn-sm btn-info py-0" onclick="wepsim_execute_toggle_play(\'#qbp\',false);">Run</span> button.<br>' ;

	        simcoreui_notify('WepSIM preloads some work', o, 'info', 0) ;
	    }

	    // return ok
	    return 0 ;
    }

    function wepsim_preload_json ( json_url )
    {
	    var size = 0 ;
	    var max_size = 8*1024 ;

	    // preload json_url only if file_size(json_url) < 8 KB
	    var xhr = new XMLHttpRequest() ;
	    xhr.open("HEAD", json_url, true) ;

	    xhr.onreadystatechange = function() {
		if (this.readyState == this.DONE) {
		    size = parseInt(xhr.getResponseHeader("Content-Length")) ;
		    if (size < max_size) {
	                $.getJSON(json_url, wepsim_preload_hash) ;
		    }
		}
	    } ;

	    xhr.send();
    }

    function wepsim_preload_get ( parameters )
    {
	    var hash = {} ;

	    // 1.- get parameters
	    hash['mode']      = parameters.get('mode') ;
	    hash['example']   = parameters.get('example') ;
	    hash['simulator'] = parameters.get('simulator') ;
	    hash['preload']   = parameters.get('preload') ;

	    // 2.a.- json
	    if (hash['preload'] !== null) 
	    {
	        var uri_obj = new URL(hash['preload']) ;
	        wepsim_preload_json(uri_obj.pathname) ;
		return ;
	    }

	    // 2.b.- hash
	    wepsim_preload_hash(hash) ;
    }

