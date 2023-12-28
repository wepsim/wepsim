/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

    var hash_skin2action = {
	    "classic": {
		         "simulator": function() {
					  sim_change_workspace('#main1', 0) ;

			                  var actual_details = $('#select5b').text() ;
			                  if (actual_details.includes('MicroCode')) {
                                              jQuery("#t3_firm").detach().appendTo("#t3_firm_placeholder2");
					      setTimeout(function() {
							    inputfirm.refresh();
						         }, 50) ;
					  }
			             else if (actual_details.includes('Assembly')) {
                                              jQuery("#t4_asm").detach().appendTo("#t4_asm_placeholder2");
					      setTimeout(function() {
							    inputasm.refresh() ;
						         }, 50) ;
					  }
	                              },
		         "microcode": function() {
		                          sim_change_workspace('#main3', 1) ;

					  var t3_firm = document.getElementById("t3_firm");
					  var ct3firm = document.getElementById("t3_firm_placeholder1");
					  if (![...ct3firm.children].includes(t3_firm)) {
                                              jQuery("#t3_firm").detach().appendTo('#t3_firm_placeholder1');
                                          }

					  if (inputfirm.is_refreshed != true) {
					      inputfirm.is_refreshed = true ;
			                      setTimeout(function(){
					                    inputfirm.refresh() ;
				                         }, 50) ;
                                          }
	                              },
		         "assembly":  function() {
					  sim_change_workspace('#main4', 2) ;

					  var t4_asm = document.getElementById("t4_asm");
					  var ct4asm = document.getElementById("t4_asm_placeholder1");
					  if (![...ct4asm.children].includes(t4_asm)) {
                                              jQuery("#t4_asm").detach().appendTo("#t4_asm_placeholder1") ;
                                          }

					  if (inputasm.is_refreshed != true) {
					      inputasm.is_refreshed = true ;
					      setTimeout(function(){
							    inputasm.refresh() ;
					    	         }, 50) ;
					  }
	                              }
		       },
	    "compact": {
		         "simulator": function() {
	                                  $("#nav-simulation-tab").click() ;
	                              },
		         "microcode": function() {
	                                  $("#nav-microcode-tab").click() ;
	                              },
		         "assembly":  function() {
	                                  $("#nav-assembly-tab").click() ;
	                              }
		       }
        } ;

    function wsweb_change_workspace_simulator ( )
    {
	    var skin_ui = get_cfg('ws_skin_ui') ;

            if (typeof hash_skin2action[skin_ui] !== "undefined") {
                hash_skin2action[skin_ui].simulator() ;
	    }

	    // stats about ui
	    setTimeout(function(){
		           simcore_ga('ui', 'ui.workspace', 'ui.workspace.simulator') ;
		       }, 50) ;

            // add if recording
            simcore_record_append_new('Change to workspace simulator',
		                      'wsweb_change_workspace_simulator();\n') ;

            // return ok
            return true ;
    }

    function wsweb_change_workspace_microcode ( )
    {
	    var skin_ui = get_cfg('ws_skin_ui') ;

            if (typeof hash_skin2action[skin_ui] !== "undefined") {
                hash_skin2action[skin_ui].microcode() ;
	    }

	    // stats about ui
	    setTimeout(function(){
			   simcore_ga('ui', 'ui.workspace', 'ui.workspace.microcode') ;
		       }, 50) ;

            // add if recording
            simcore_record_append_new('Change to workspace microcode',
		                      'wsweb_change_workspace_microcode();\n') ;

            // return ok
            return true ;
    }

    function wsweb_change_workspace_assembly ( )
    {
	    var skin_ui = get_cfg('ws_skin_ui') ;

            if (typeof hash_skin2action[skin_ui] !== "undefined") {
                hash_skin2action[skin_ui].assembly() ;
	    }

	    // stats about ui
	    setTimeout(function(){
			   simcore_ga('ui', 'ui.workspace', 'ui.workspace.assembly') ;
		       }, 50) ;

            // add if recording
            simcore_record_append_new('Change to workspace assembly',
	       	                      'wsweb_change_workspace_assembly();\n') ;

            // return ok
            return true ;
    }

    function wsweb_change_show_processor ( )
    {
	    $("#tab26").tab('show') ;

            wepsim_svg_start_drawing() ;
            cpucu_show_graph() ;

            // add if recording
            simcore_record_append_new('Show processor details',
		                      'wsweb_change_show_processor();\n') ;

            // return ok
            return true ;
    }

    function wsweb_change_show_asmdbg ( )
    {
	    $("#tab24").tab('show') ;

            var ahw = simhw_active() ;
            if (ahw !== null)
            {
                wepsim_svg_stop_drawing() ;

                // if code then move scroll
	        var o1 = fullshow_asmdbg_pc() ;
	        if (null === o1) {
	            return true ;
                }

	        var obj_byid = $('#asm_debugger_container') ;
                if (typeof obj_byid === 'undefined') {
                    return true ;
                }

                if ( (typeof o1 !== 'undefined') && (typeof o1[0] !== 'undefined') )
                {
	              var off1 = o1[0].offsetTop ;
	              if (off1 > 10)
                          off1 = off1 - 10 ;
	              obj_byid[0].scrollTop = off1 ;
                }
            }

            // add if recording
            simcore_record_append_new('Show assembly debugger',
		                      'wsweb_change_show_asmdbg();\n') ;

            // return ok
            return true ;
    }

    //  Workspace simulator: execution

    function wsweb_execution_reset ( )
    {
            if (simhw_active() !== null)
            {
	        wepsim_execute_reset(true, true) ;
	        simcoreui_show_hw() ;
            }

            // add if recording
            simcore_record_append_new('Reset',
		                      'wsweb_execution_reset();\n') ;

            // return ok
            return true ;
    }

    function wsweb_execution_microinstruction ( )
    {
            if (simhw_active() !== null)
            {
	        wepsim_execute_microinstruction() ;
	        simcoreui_show_hw() ;
            }

            // add if recording
            simcore_record_append_new('Execute microinstruction',
		                      'wsweb_execution_microinstruction();\n') ;

            // return ok
            return true ;
    }

    function wsweb_execution_instruction ( )
    {
            if (simhw_active() !== null)
            {
	        wepsim_execute_instruction() ;
	        simcoreui_show_hw() ;
            }

            // add if recording
            simcore_record_append_new('Execute instruction',
		                      'wsweb_execution_instruction();\n') ;

            // return ok
            return true ;
    }

    function wsweb_execution_run ( )
    {
            if (false == inputfirm.is_compiled) {
		wsweb_dlg_alert('The Microcode is not microcompiled.<br>\n');
                return false ;
            }

            if (simhw_active() !== null) {
	        webui_executionbar_toggle_play('exebar1') ;
            }

            // add if recording
            simcore_record_append_new('Run',
		                      'wsweb_execution_run();\n') ;

            // intercept events...
	    $("#current_state2").one("hidden.bs.modal",
		                     function () {
					 simcore_record_append_new('Close execution summary',
						                   'wsweb_dialogbox_close_all();\n');
				     });

            // return ok
            return true ;
    }

    //  Workspace simulator: dialog-boxes

    function wsweb_dialog_open ( dialog_id )
    {
	    // check params
	    if (typeof wsweb_dialogs[dialog_id] === "undefined") {
                return null ;
            }

	    // open dialog
            var d1 = wsweb_dlg_open(wsweb_dialogs[dialog_id]) ;

            // intercept events...
	    d1.one("hidden.bs.modal",
		    function () {
			wsweb_dialog_close(dialog_id) ;
		    });

            // add if recording
            simcore_record_append_new('Open dialogbox ' + dialog_id,
		                      'wsweb_dialog_open("' + dialog_id + '");\n') ;

	    // stats about ui
            simcore_ga('ui', 'ui.dialog', 'ui.dialog.' + wsweb_dialogs[dialog_id].id) ;

	    // return dialog
	    return d1 ;
    }

    function wsweb_dialog_close ( dialog_id )
    {
	    // check params
	    if (typeof wsweb_dialogs[dialog_id] === "undefined") {
                return null ;
            }

	    // close dialog
            var d1 = wsweb_dlg_close(wsweb_dialogs[dialog_id]) ;

            // add if recording
            simcore_record_append_new('Close dialogbox ' + dialog_id,
		                      'wsweb_dialog_close("' + dialog_id + '");\n') ;

	    // return dialog
	    return d1 ;
    }

    function wsweb_dialogbox_close_all ( )
    {
	    // Close all dialogbox
	    wsweb_dialog_close('help') ;
	    wsweb_dialog_close('config') ;
	    wsweb_dialog_close('examples') ;
	    wsweb_dialog_close('state') ;
	    wsweb_dialog_close('current_checkpoint') ;
	    $('#current_state2').modal('hide') ;

            // add if recording
            simcore_record_append_new('Close all dialogboxes',
		                      'wsweb_dialogbox_close_all();\n') ;

            // return ok
            return true ;
    }

    //  Workspace simulator: Signal dialog

    var hash_signal2action = {
	    "<all>":  function(key, event_type){ wsweb_dialogbox_open_updatesignal(key, event_type); },
        } ;

    function wsweb_dialogbox_open_updatesignal ( key, event_type )
    {
	    // update interface
            if (false === get_cfg('is_interactive')) {
                return true;
            }

	    if ( (true === get_cfg('is_quick_interactive')) && (event_type == 'click') )
            {
	          wepsim_update_signal_quick(key) ;
	          // show_states();

                  // return ok
                  return true ;
            }

            // add if recording
            simcore_record_append_new('Open update signal dialogbox for ' + key,
                                      'wepsim_update_signal_dialog(\'' + key + '\');\n') ;

            wepsim_update_signal_dialog(key) ;
	    // show_states();

            // intercept events...
	    $("#dlg_updatesignal").one("hidden.bs.modal",
		                       function () {
					  simcore_record_append_new('Close update signal dialog',
						                    'wsweb_dialogbox_close_updatesignal();\n') ;
				       });

            // return ok
            return true ;
    }

    function wsweb_dialogbox_close_updatesignal ( )
    {
	    $('#dlg_updatesignal').modal('hide') ;

            // add if recording
            simcore_record_append_new('Close update signal dialogbox',
		                      'wsweb_dialogbox_close_updatesignal();\n') ;

            // return ok
            return true ;
    }

    //  Workspace simulator: Selects

    function wsweb_set_details_select ( opt )
    {
	    // update interface
            uipacker_ddown_sel_set_select(opt) ;
            uipacker_ddown_info_set_select(opt) ;

            // add if recording
            simcore_record_append_new('Change select details to ' + opt,
		                      'wsweb_set_details_select(' + opt + ');\n') ;

            // return ok
            return true ;
    }

    var hash_detail2action = {
	    "CLOCK":          function(){ wepsim_execute_microinstruction(); },
	    "REGISTER_FILE":  function(){ wsweb_set_details_select(11); },

	    "CONTROL_MEMORY": function(){ wsweb_set_details_select(16); show_memories_values(); },
	    "CPU_STATS":      function(){ wsweb_set_details_select(17); show_memories_values(); },
	    "MEMORY":         function(){ wsweb_set_details_select(14); show_memories_values(); },
	    "MEMORY_CONFIG":  function(){ wsweb_set_details_select(18); show_memories_values(); },
	    "CACHE":          function(){ wsweb_set_details_select(28); show_memories_values(); },
	    "CACHE_CONFIG":   function(){ wsweb_set_details_select(29); show_memories_values(); },
	    "KEYBOARD":       function(){ wsweb_set_details_select(12); show_memories_values(); },
	    "SCREEN":         function(){ wsweb_set_details_select(12); show_memories_values(); },
	    "IO_STATS":       function(){ wsweb_set_details_select(15); show_memories_values(); },
	    "IO_CONFIG":      function(){ wsweb_set_details_select(19); show_memories_values(); },
	    "3DLED":          function(){ wsweb_set_details_select(25); show_memories_values(); },
	    "LEDMATRIX":      function(){ wsweb_set_details_select(27); show_memories_values(); },


	    "FRM_EDITOR":     function(){ wsweb_set_details_select(20);
					  var t3_firm = document.getElementById("t3_firm");
					  var ct3firm = document.getElementById("t3_firm_placeholder2");
					  if (![...ct3firm.children].includes(t3_firm)) {
                                              jQuery("#t3_firm").detach().appendTo('#t3_firm_placeholder2');
                                          }
					  setTimeout(function() {
                                                        inputfirm.refresh();
						     }, 50) ;
                                        },
	    "ASM_EDITOR":     function(){ wsweb_set_details_select(21);
					  var t4_asm = document.getElementById("t4_asm");
					  var ct4asm = document.getElementById("t4_asm_placeholder2");
					  if (![...ct4asm.children].includes(t4_asm)) {
                                              jQuery("#t4_asm").detach().appendTo("#t4_asm_placeholder2") ;
                                          }
					  setTimeout(function() {
							inputasm.refresh() ;
						     }, 50) ;
                                        },

	    "HARDWARE":       function(){ wsweb_set_details_select(22);
                                          wepsim_tooltips_hide('[data-bs-toggle=tooltip]');
	                                  simcoreui_show_hw();
					  var ws_idiom = get_cfg('ws_idiom');
					  i18n_update_tags('gui', ws_idiom);
                                        }
        } ;

    function wsweb_set_details ( opt )
    {
            if (
                 (simhw_active() !== null) &&
                 (typeof hash_detail2action[opt] !== "undefined")
            )
            {
                hash_detail2action[opt]() ;
            }

            // add if recording
            simcore_record_append_new('Set details to ' + opt,
		                      'wsweb_set_details(\'' + opt + '\');\n') ;

            // return ok
            return true ;
    }

    function wsweb_select_refresh ( )
    {
            if (simhw_active() !== null)
            {
                wepsim_tooltips_hide('[data-bs-toggle=tooltip]');
		show_memories_values() ;
                scroll_memory_to_lastaddress() ;
		wepsim_reset_max_turbo() ;
            }

            // add if recording
            simcore_record_append_new('Refresh in selection',
		                      'wsweb_select_refresh();\n') ;

            // return ok
            return true ;
    }

    //  Workspace simulator: Mode

    function wsweb_select_main ( opt )
    {
	    // save ws_mode
	    set_cfg('ws_mode', opt) ;
	    save_cfg() ;

	    // update select4
	    wepsim_mode_change(opt) ;

	    // set button label...
            webui_toolbar_updateMode(opt) ;

	    // adapt to idiom
	    var ws_idiom = get_cfg('ws_idiom') ;
	    i18n_update_tags('gui', ws_idiom) ;

            // add if recording
            simcore_record_append_new('Set main work mode to ' + opt,
		                      'wsweb_select_main("' + opt + '");\n') ;

            // return ok
            return true ;
    }

    function wsweb_do_action ( opt )
    {
	    switch (opt)
	    {
	        case 'examples':
		      wsweb_dialog_open('examples') ;
		      break ;

	        case 'checkpoint':
		      wsweb_dialog_open('current_checkpoint') ;
		      break ;

	        case 'notifications':
		      wsweb_dialog_open('notifications') ;
		      break ;

	        case 'recordbar':
		      wsweb_recordbar_toggle() ;
		      break ;

	        case 'reload':
		      wsweb_dialog_open('reload') ;
		      break ;

	        case 'help':
		      wsweb_dialog_open('help') ;
		      break ;

	        case 'welcome':
		      wsweb_select_main('intro') ;
		      setTimeout(wsweb_record_play, 1000) ;
		      break ;

	        case 'intro':
                      wepsim_newbie_tour('tour1') ;
		      break ;

	        case 'hw_summary':
		      wsweb_dialog_open('help') ;
                      wepsim_help_set('code', 'hardware_summary') ;
		      break ;

	        case 'sw_summary':
		      wsweb_dialog_open('help') ;
                      wepsim_help_set('code', 'assembly_summary') ;
		      break ;
	    }

	    return false;
    }

    function wsweb_select_action ( opt )
    {
	    // save ws_action
	    set_cfg('ws_action', opt) ;
	    save_cfg() ;

	    // set button label...
            webui_toolbar_updateAction(opt) ;

	    // adapt to idiom
	    var ws_idiom = get_cfg('ws_idiom') ;
	    i18n_update_tags('gui', ws_idiom) ;

	    // do action
	    wsweb_do_action(opt) ;

            // return ok
            return true ;
    }

    //  Workspace simulator: Sliders

    function wsweb_set_cpucu_size ( new_value )
    {
            var int_value = parseInt(new_value, 10) ;

	    $('#slider2b').val(new_value) ;
	    set_ab_size('#eltos_cpu_a', '#eltos_cpu_b', int_value) ;

	    set_cfg('CPUCU_size', int_value) ;
	    save_cfg() ;

            // add if recording
            simcore_record_append_new('Set cpu-cu size to ' + new_value,
		                      'wsweb_set_cpucu_size(' + new_value + ');\n') ;

            // return ok
            return true ;
    }

    function wsweb_set_c1c2_size ( new_value )
    {
            var int_value = parseInt(new_value, 10) ;

	    $("#slider2a").val(new_value) ;
	    set_ab_size('#col1', '#col2', int_value) ;

	    set_cfg('C1C2_size', int_value) ;
	    save_cfg() ;

            // add if recording
            simcore_record_append_new('Set c1-c2 size to ' + new_value,
		                      'wsweb_set_c1c2_size(' + new_value + ');\n') ;

            // return ok
            return true ;
    }

    //  Workspace simulator: Compile

    function wsweb_assembly_compile ( )
    {
            if (false == inputfirm.is_compiled)
            {
		wsweb_dlg_alert('The Microcode is not microcompiled.<br>\n' +
	   	   	        'Please load a Microcode first in memory in order to used it.');
                return false ;
            }

            var textToCompile = inputasm.getValue() ;
	    var ok = wepsim_compile_assembly(textToCompile) ;
            inputasm.is_compiled = ok ;

            // add if recording
            simcore_record_append_new('Compile assembly',
		                      'wsweb_assembly_compile();\n') ;

            // return ok
            return true ;
    }

    function wsweb_firmware_compile ( )
    {
	    var textToMCompile = inputfirm.getValue();
	    var ok = wepsim_compile_firmware(textToMCompile);
            inputfirm.is_compiled = ok ;

            // if microcode changed -> recompile assembly
            inputasm.is_compiled = false ;
	    var o = '<div class=\'card m-3 border\'><div class=\'card-body m-1\'>' +
		    'Please remember that after updates on the microcode, the assembly code has be re-compiled too.' +
		    '</div></div>' ;
	    $('#asm_debugger').html(o);

            // add if recording
            simcore_record_append_new('Compile firmware',
		                      'wsweb_firmware_compile();\n') ;

            // return ok
            return true ;
    }

    //  Workspace simulator: Files

    function wsweb_save_controlmemory_to_file ( )
    {
            var wsi = get_cfg('ws_idiom') ;

            var q = i18n_get('dialogs',wsi,'Sure Control Memory...') + '\n\n' ;
            if (confirm(q))
	    {
	        var SIMWARE = get_simware() ;
	        var simware_as_text = saveFirmware(SIMWARE);
	        if (simware_as_text.trim() == '') {
		    wsweb_dlg_alert('The Microcode loaded in memory is empty!<br>\n' +
	   	   	            'Please load a Microcode first in memory in order to save it.');
                }
	        else inputfirm.setValue(simware_as_text);

	        var fileNameToSaveAs = document.getElementById('inputFileNameToSaveAs').value;
	        var textToWrite      = inputfirm.getValue();
	        wepsim_save_to_file(textToWrite, fileNameToSaveAs);
	    }

            // add if recording
            simcore_record_append_new('Save control memory to file',
		                      'wsweb_save_controlmemory_to_file();\n') ;

            // return ok
            return true ;
    }

    //  Workspace simulator: record

    function wsweb_record_on ( )
    {
	    simcore_record_start() ;

	    // stats about recordbar
	    simcore_ga('recordbar', 'recordbar.action', 'recordbar.action.record') ;

            // return ok
            return true ;
    }

    function wsweb_record_off ( )
    {
	    simcore_record_stop() ;

	    // stats about recordbar
	    simcore_ga('recordbar', 'recordbar.action', 'recordbar.action.stop') ;

            // return ok
            return true ;
    }

    function wsweb_record_reset ( )
    {
	    simcore_record_reset() ;

	    // stats about recordbar
	    simcore_ga('recordbar', 'recordbar.action', 'recordbar.action.reset') ;

            // return ok
            return true ;
    }

    function wsweb_record_play ( )
    {
	    simcore_record_play() ;

	    // stats about recordbar
	    simcore_ga('recordbar', 'recordbar.action', 'recordbar.action.play') ;

            // return ok
            return true ;
    }

    function wsweb_record_pause ( )
    {
	    simcore_record_pause() ;

	    // stats about recordbar
	    simcore_ga('recordbar', 'recordbar.action', 'recordbar.action.pause') ;

            // return ok
            return true ;
    }

    function wsweb_record_playInterval ( from, to )
    {
	    simcore_record_playInterval(from, to) ;

	    // stats about recordbar
	    simcore_ga('recordbar', 'recordbar.action', 'recordbar.action.play-' + from + '-' + to) ;

            // return ok
            return true ;
    }

    function wsweb_record_confirmReset ( )
    {
	    // show dialogbox
            wsweb_dlg_open(wsweb_dialogs.rec_confirm_reset) ;

            // return ok
            return true ;
    }


    //
    //  All workspaces: popovers and modals from quick-menu...
    //

    // quick menu
    function wsweb_quickmenu_show ( )
    {
            topbar_quickmenu_action('show') ;

            // add if recording
            simcore_record_append_new('Open the "quick menu"',
		                      'wsweb_quickmenu_show();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickmenu_close ( )
    {
            topbar_quickmenu_action('hide') ;

            // add if recording
            simcore_record_append_new('Close the "quick menu"',
		                      'wsweb_quickmenu_close();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickmenu_toggle ( )
    {
            topbar_quickmenu_action('toggle') ;

            // add if recording
            simcore_record_append_new('Toggle the "quick menu"',
		                      'wsweb_quickmenu_toggle();\n') ;

            // return ok
            return true ;
    }

    // quick slider(s)
    function wsweb_quickslider_show ( )
    {
            wepsim_popover_show('popover-slidercfg') ;

            // add if recording
            simcore_record_append_new('Open the "quick slider"',
		                      'wsweb_quickslider_show();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickslider_close ( )
    {
            wepsim_popover_hide('popover-slidercfg') ;

            // add if recording
            simcore_record_append_new('Close the "quick slider"',
		                      'wsweb_quickslider_close();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickslider_toggle ( )
    {
            wepsim_popover_action('popover-slidercfg', 'toggle') ;

            // add if recording
            simcore_record_append_new('Toggle the "quick slider"',
		                      'wsweb_quickslider_toggle();\n') ;

            // return ok
            return true ;
    }

    // quick cpucu
    function wsweb_quickcpuview_show ( )
    {
            wepsim_popover_show('popover-cpuview') ;

            // add if recording
            simcore_record_append_new('Open the "quick cpuview"',
		                      'wsweb_quickcpuview_show();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickcpuview_close ( )
    {
            wepsim_popover_hide('popover-cpuview') ;

            // add if recording
            simcore_record_append_new('Close the "quick cpuview"',
		                      'wsweb_quickcpuview_close();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickcpuview_toggle ( )
    {
            wepsim_popover_action('popover-cpuview', 'toggle') ;

            // add if recording
            simcore_record_append_new('Toggle the "quick cpuview"',
		                      'wsweb_quickcpuview_toggle();\n') ;

            // return ok
            return true ;
    }

    function wsweb_cpuview_as_graph ( )
    {
            update_cfg("CPUCU_show_graph", true) ;
            show_cpuview_view() ;

            // add if recording
            simcore_record_append_new('Toggle to "view as graphic"',
		                      'wsweb_cpuview_as_graph();\n') ;

            // return ok
            return true ;
    }

    function wsweb_cpuview_as_text ( )
    {
            update_cfg("CPUCU_show_graph", false) ;
            show_cpuview_view() ;

            // add if recording
            simcore_record_append_new('Toggle to "view as text"',
		                      'wsweb_cpuview_as_text();\n') ;

            // return ok
            return true ;
    }

    // quick rfcfg
    function wsweb_quickrf_show ( )
    {
            wepsim_popover_show('popover-rfcfg') ;

            // add if recording
            simcore_record_append_new('Open the "quick rfcfg"',
		                      'wsweb_quickrf_show();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickrf_close ( )
    {
            wepsim_popover_hide('popover-rfcfg') ;

            // add if recording
            simcore_record_append_new('Close the "quick rfcfg"',
		                      'wsweb_quickrf_close();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickrf_toggle ( )
    {
            wepsim_popover_action('popover-rfcfg', 'toggle') ;

            // add if recording
            simcore_record_append_new('Toggle the "quick rfcfg"',
		                      'wsweb_quickrf_toggle();\n') ;

            // return ok
            return true ;
    }

    // recordbar
    function wsweb_recordbar_show ( )
    {
	    $('#record_div').collapse('show') ;

            // add if recording
            simcore_record_append_new('Open the "record toolbar"',
		                      'wsweb_recordbar_show();\n') ;

            // return ok
            return true ;
    }

    function wsweb_recordbar_toggle ( )
    {
	    $('#record_div').collapse('toggle') ;

            // add if recording
            simcore_record_append_new('Toggle the "record toolbar"',
		                      'wsweb_recordbar_toggle();\n') ;

            // return ok
            return true ;
    }

    function wsweb_recordbar_close ( )
    {
	    $('#record_div').hide() ;

            // add if recording
            simcore_record_append_new('Close the "record toolbar"',
		                      'wsweb_recordbar_close();\n') ;

            // return ok
            return true ;
    }


    //
    // Auxiliar functions
    //

    // timer

    var wepsim_updatediv_timer = null ;

    function wepsim_updatetime ( div_id, time_left_sec )
    {
            $(div_id).html('<span>Close automatically after ' + time_left_sec + ' seconds.</span>') ;

            wepsim_updatediv_timer = setTimeout(wepsim_updatetime, 1000, div_id, (time_left_sec - 1));
    }

    function wepsim_updatetime_start ( div_id, time_left_sec )
    {
            clearTimeout(wepsim_updatediv_timer) ;

            wepsim_updatetime(div_id, time_left_sec) ;
    }


    //  simulator: notify

    var wsweb_nfbox = null ;

    function wsweb_notifyuser_show ( title, message, duration )
    {
	    // check params
	    if (title.trim() === '') {
		title = '&lt;empty title&gt;' ;
	    }
	    if (message.trim() === '') {
		message = '&lt;empty message&gt;' ;
	    }

            // dialog
	    var dlg_obj = {
		             id:         'notifyuser1',
		             title:      function() { return title; },
		             body:       function() {
                                            return "<div class='p-2 m-0' style='word-wrap:break-word;'>" +
		                                   message +
		                                   "</div>" ;
                                         },
		             onshow:     function(e) {
	                                    wepsim_updatetime_start("#autoclose1", duration / 1000) ;
                                         },
		             buttons:    {
					    noclose: {
					        label: "<div id='autoclose1'>&nbsp;</div>",
					        className: 'float-start me-auto m-0',
					        callback: function() {
					   		     return false;
						          }
					    },
					    cancel: {
					        label: "<span data-langkey='Close'>Close</span>",
					        className: 'btn-danger m-0',
					        callback: function() {
					   		     clearTimeout(wepsim_updatediv_timer) ;
							     wsweb_record_play();
						          }
					    }
		                         },
		             size:       'large'
	             } ;
	    wsweb_nfbox = wsweb_dlg_open(dlg_obj) ;

            // return ok
            return true ;
    }

    function wsweb_notifyuser_hide ( )
    {
	    wsweb_nfbox.modal("hide") ;

            // return ok
            return true ;
    }

    function wsweb_notifyuser_add ( )
    {
	    // check if recording
            if (simcore_record_isRecording() === false) {
		return true ;
	    }

	    // stats about recordbar
	    simcore_ga('recordbar', 'recordbar.action', 'recordbar.action.add_notification') ;

	    // build the message box
            var wsi = get_cfg('ws_idiom') ;
            var bbbt = {} ;

            bbbt.cancel = {
		    label: i18n_get('gui',wsi,'Close'),
		    className: 'btn-danger col float-start me-auto',
	    };
            bbbt.end = {
		    label: i18n_get('gui',wsi,'Save'),
		    className: 'btn-success col float-end',
		    callback: function() {
                            /* eslint-disable no-control-regex */

			    // get values
			    var nf_title    = $("#frm_title1").val() ;
			    var nf_message  = $("#frm_message1").val() ;
			    var nf_duration = $("#frm_duration1").val() ;

			    // post-process
			    var w_title    = nf_title.replace(/<[^>]*>/g, '') ;
			    var s_title    = '<span class=\'inline-block text-truncate w-25\'>' + w_title   + '</span>' ;

			    var w_message  = nf_message.replace(/<[^>]*>/g, '') ;
			    var s_message  = '<span class=\'inline-block text-truncate w-25\'>' + w_message + '</span>' ;
			    var c_message = w_message.replace(new RegExp('\r?\n','g'), '</br>') ;

			    var w_duration = parseInt(nf_duration) ;
			    if (isNaN(w_duration))
			         w_duration = 5000 ;
			    else w_duration = 1000 * w_duration ;

			    // add if recording
			    simcore_record_setTimeBeforeNow(500) ;
			    simcore_record_append_new('Show message with title "'  + s_title + '" and body "' + s_message + '".',
						      'wsweb_notifyuser_show("'    + w_title + '", "'         + c_message + '", "' + w_duration + '");\n') ;
			    simcore_record_setTimeBeforeNow(w_duration) ;
			    simcore_record_append_new('Close message with title "' + s_title + '".',
				                      'wsweb_notifyuser_hide();\n') ;

                            /* eslint-enable no-control-regex */
		    }
	    };

	    var bbmsg = '<div class="container">' +
		        '<label for="frm_title1"><em>'    + i18n_get('dialogs',wsi,'Title') + ':</em></label>' +
			'<p><input aria-label="title" id="frm_title1" ' +
			'	  class="form-control btn-outline-secondary" placeholder="Title for the notification" style="min-width: 90%;"/></p>' +
		        '<label for="frm_message1"><em>'  + i18n_get('dialogs',wsi,'Message') + ':</em></label>' +
			'<p><textarea aria-label="message" id="frm_message1" rows="5" ' +
			'	      class="form-control btn-outline-secondary" placeholder="Message for the notification" style="min-width: 90%;"/></textarea></p>' +
		        '<label for="frm_duration1"><em>' + i18n_get('dialogs',wsi,'Duration') + ':</em></label>' +
			'<p><input aria-label="duration" id="frm_duration1" type="number" ' +
			'	  class="form-control btn-outline-secondary" placeholder="Duration for the notification in seconds" style="min-width: 90%;"/></p>' +
		        '</div>' ;

            // dialog
            var dlg_obj = {
			     id:       'notifuseradd1',
			     title:    function() { return 'Form to add a message during playback...' ; },
			     body:     function() { return bbmsg ; },
			     buttons:  bbbt,
			     onshow:   function() { },
			     size:     "large"
                          } ;
            wsweb_nfbox = wsweb_dlg_open(dlg_obj) ;

            // return ok
            return true ;
    }

    // scroll in Div

    var wsweb_scroll_timer = null;

    function wsweb_scroll_to ( div_id, div_pos )
    {
	    var div_obj = $(div_id) ;
	    div_obj.scrollTop(div_pos) ;
    }

    function wsweb_scroll_record ( container_id )
    {
	    var container_obj = $(container_id) ;
	    var add_scroll_to = function() {
				     var div_pos = container_obj.scrollTop() ;
				     simcore_record_append_new('Scroll content',
						               'wsweb_scroll_to("' + container_id + '", ' + div_pos + ');\n') ;
				};

            container_obj.scroll(function() {

				    if (wsweb_scroll_timer !== null) {
					clearTimeout(wsweb_scroll_timer) ;
				    }

				    wsweb_scroll_timer = setTimeout(add_scroll_to, 100);
				 });
    }

