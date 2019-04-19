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

    //  To change Workspaces

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

            // return ok
            return true ;
    }

    function wsweb_change_workspace_simulator ( )
    {
	    sim_change_workspace('#main1', 0) ;

	    setTimeout(function(){
			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.simulator');
	               }, 50) ;

            // return ok
            return true ;
    }

    function wsweb_change_workspace_microcode ( )
    {
	    sim_change_workspace('#main3', 1) ;

	    setTimeout(function(){
		            inputfirm.refresh() ; 

			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.microcode');
	               }, 50) ;

            // return ok
            return true ;
    }

    function wsweb_change_workspace_assembly ( )
    {
	    sim_change_workspace('#main4', 2) ;

	    setTimeout(function(){
		            inputasm.refresh() ; 

			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.assembly');
	               }, 50) ;

            // return ok
            return true ;
    }

    function wsweb_change_show_processor ( )
    {
    	    $("#tab26").click() ;
         // $('#tab26').trigger('click') ;

            // return ok
            return true ;
    }

    function wsweb_change_show_asmdbg ( )
    {
	    $("#tab24").click() ;
         // $('#tab24').trigger('click') ;

            // return ok
            return true ;
    }

    //  Workspace simulator: execution

    function wsweb_execution_reset ( )
    {
	    wepsim_execute_reset(true, true) ;
	    simcoreui_show_hw() ;

            // return ok
            return true ;
    }

    function wsweb_execution_microinstruction ( )
    {
	    wepsim_execute_microinstruction() ;
	    simcoreui_show_hw() ;

            // return ok
            return true ;
    }

    function wsweb_execution_instruction ( )
    {
	    wepsim_execute_instruction() ;
	    simcoreui_init_hw('#config_HW') ;

            // return ok
            return true ;
    }

    function wsweb_execution_run ( )
    {
            var mode = get_cfg('ws_mode') ;
	    if ('tutorial' == mode) {
		 wepsim_notify_success('<strong>INFO</strong>',
				       'Tutorial mode on. Use the configuration to change it.') ;
	    }

	    wepsim_execute_toggle_play('#qbp', (mode == 'tutorial')) ;

            // return ok
            return true ;
    }

    //  Workspace simulator: dialog-boxes

    function wsweb_dialogbox_open_examples ( )
    {
            wepsim_open_examples_index(); 
	    $('[data-toggle=tooltip]').tooltip('hide');

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_help ( )
    {
	    wepsim_open_help_index();
	    wepsim_help_refresh(); 
	    $('[data-toggle=tooltip]').tooltip('hide');

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_config ( )
    {
	    wepsim_open_config_index() ;
	    $('[data-toggle=tooltip]').tooltip('hide') ;

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_state ( )
    {
            wepsim_dialog_current_state() ;
	    $('[data-toggle=tooltip]').tooltip('hide') ;

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_binary_assembly ( )
    {
            var textToCompile = inputasm.getValue() ;
	    var ok = wepsim_compile_assembly(textToCompile) ;
	    if (true == ok) {
		 wepsim_show_binary_code('#bin2', '#compile_results') ;
	    }

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_binary_firmware ( )
    {
            var textToMCompile = inputfirm.getValue() ;
	    var ok = wepsim_compile_firmware(textToMCompile) ;
	    if (true == ok) {
		 wepsim_show_binary_microcode('#bin2', '#compile_results') ;
		 wepsim_notify_success('<strong>INFO</strong>',
				       'Please remember to recompile the assembly code if needed.') ;
	    }

            // return ok
            return true ;
    }

    //  Workspace simulator: Selects

    function wsweb_set_details_select ( opt )
    {
	    // update interface
	    $('#tab'  + opt).trigger('click') ;
	    $('#select5a').val(opt) ;

	    // set button label...
	    var ed=$('#s5b_' + opt).html() ;
	    $('#select5b').html(ed) ;

            // return ok
            return true ;
    }

    var hash_detail2action = {
	    "CLOCK":          function(){ wepsim_execute_microinstruction(); },
	    "REGISTER_FILE":  function(){ wsweb_set_details_select(11); show_rf_values(); },
	    "CONTROL_MEMORY": function(){ wsweb_set_details_select(16); show_memories_values(); },
	    "CPU_STATS":      function(){ wsweb_set_details_select(17); show_memories_values(); },
	    "MEMORY":         function(){ wsweb_set_details_select(14); show_memories_values(); }, 
	    "MEMORY_CONFIG":  function(){ wsweb_set_details_select(18); show_memories_values(); },
	    "KEYBOARD":       function(){ wsweb_set_details_select(12); show_memories_values(); },
	    "SCREEN":         function(){ wsweb_set_details_select(12); show_memories_values(); },
	    "IO_STATS":       function(){ wsweb_set_details_select(15); show_memories_values(); }, 
	    "IO_CONFIG":      function(){ wsweb_set_details_select(19); show_memories_values(); },

	    "FRM_EDITOR":     function(){ wsweb_set_details_select(20); inputfirm.refresh(); },
	    "ASM_EDITOR":     function(){ wsweb_set_details_select(21); inputasm.refresh(); },
	    "HARDWARE":       function(){ wsweb_set_details_select(22); 
					  $('[data-toggle=tooltip]').tooltip('hide');
					  simcoreui_init_hw('#config_HW') ;
					  var ws_idiom = get_cfg('ws_idiom');
					  i18n_update_tags('gui', ws_idiom) ;
                                        }
        } ;

    function wsweb_set_details ( opt )
    {
            if (typeof hash_detail2action[opt] !== "undefined") {
                hash_detail2action[opt]() ;
            }

            // return ok
            return true ;
    }


    //  Workspace simulator: Mode

    function wepsim_show_wepmips ( )
    {
            $(".multi-collapse-2").collapse("show") ;
	    $("#slider_cpucu").hide() ;

	    $("#tab26").hide() ;
	    $("#tab21").hide() ;
	    $("#tab24").click() ;

            inputfirm.setOption('readOnly', true) ;
            $("#btn_micro1").addClass('d-none') ;

            // return ok
            return true ;
    }

    function wepsim_hide_wepmips ( )
    {
            $(".multi-collapse-2").collapse("show") ;
	    $("#slider_cpucu").show() ;

	    $("#tab26").show() ;
	    $("#tab21").show() ;

            inputfirm.setOption('readOnly', false) ;
            $("#btn_micro1").removeClass('d-none') ;

            // return ok
            return true ;
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
		simcore_init_eventlistener("svg_p", hash_detail2action);
		refresh();
	    }, false);

	    var b = document.getElementById("svg_cu");
	    b.addEventListener("load",function() {
		simcore_init_eventlistener("svg_cu", hash_detail2action);
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

            // update asmdbg
            var asmdbg_content = default_asmdbg_content_horizontal() ;
	    for (var l in SIMWARE.assembly) // <===> if (SIMWARE.assembly != {})
	    {
                 asmdbg_content = assembly2html(SIMWARE.mp, SIMWARE.labels2, SIMWARE.seg, SIMWARE.assembly) ;
		 break ;
	    }
            $("#asm_debugger").html(asmdbg_content);

            showhideAsmElements();

            // return ok
            return true ;
    }

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

            // return ok
            return true ;
    }

    function wsweb_select_main ( opt )
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

            // return ok
            return true ;
    }

    function wsweb_mode_update ( new_mode )
    {
            wsweb_select_main(new_mode);

	    // initialize hw
	    simcore_init_ui('#states_ALL', '#states_BR', '#io_ALL', 
                            '#cpu_ALL',    '#config_MP', '#config_IO') ;
	    simcoreui_init_hw('#config_HW') ;

	    // adapt to idiom
	    var ws_idiom = get_cfg('ws_idiom') ;
	    i18n_update_tags('gui', ws_idiom) ;

            // return ok
            return true ;
    }

    //  Workspace simulator: Sliders

    function wsweb_set_cpucu_size ( new_value )
    {
	    $('#slider2b').val(new_value) ;
	    set_ab_size('#eltos_cpu_a', '#eltos_cpu_b', new_value) ;

	    set_cfg('CPUCU_size', new_value) ;
	    save_cfg() ;

            // return ok
            return true ;
    }

    function wsweb_set_c1c2_size ( new_value )
    {
	    $("#slider2a").val(new_value) ;
	    set_ab_size('#col1', '#col2', new_value);

	    set_cfg('C1C2_size', new_value);
	    save_cfg() ;

            // return ok
            return true ;
    }

    //  Workspace simulator: Compile

    function wsweb_assembly_compile ( )
    {
            var textToCompile = inputasm.getValue() ;
	    var ok = wepsim_compile_assembly(textToCompile) ;

            // return ok
            return true ;
    }

    function wsweb_firmware_compile ( )
    {
	    var textToMCompile = inputfirm.getValue();
	    wepsim_compile_firmware(textToMCompile);
	    var o = '<div class=\'card m-3 border\'><div class=\'card-body m-1\'>' + 
		    'Please remember that after updates on the microcode, the assembly code has be re-compiled too.' +
		    '</div></div>' ;
	    $('#asm_debugger').html(o);

            // return ok
            return true ;
    }

