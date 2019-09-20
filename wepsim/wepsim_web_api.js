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

    function wsweb_change_workspace_simulator ( )
    {
	    sim_change_workspace('#main1', 0) ;

	    setTimeout(function(){
			    $("#t3_firm").appendTo("#t3_firm_placeholder2") ;
			     $("#t4_asm").appendTo("#t4_asm_placeholder2") ;
			    inputfirm.refresh() ;
			    inputasm.refresh() ;

			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.simulator');
	               }, 50) ;

            // add if recording
            simcore_record_append_new('Change to workspace simulator',
		                      'wsweb_change_workspace_simulator();\n') ;

            // return ok
            return true ;
    }

    function wsweb_change_workspace_microcode ( )
    {
	    sim_change_workspace('#main3', 1) ;

	    setTimeout(function(){
	                    $("#t3_firm").appendTo("#t3_firm_placeholder1") ;
		            inputfirm.refresh() ;

			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.microcode');
	               }, 50) ;

            // add if recording
            simcore_record_append_new('Change to workspace microcode',
		                      'wsweb_change_workspace_microcode();\n') ;

            // return ok
            return true ;
    }

    function wsweb_change_workspace_assembly ( )
    {
	    sim_change_workspace('#main4', 2) ;

	    setTimeout(function(){
	                    $("#t4_asm").appendTo("#t4_asm_placeholder1") ;
		            inputasm.refresh() ;

			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.assembly');
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
	    refresh() ;

            // add if recording
            simcore_record_append_new('Show processor details',
		                      'wsweb_change_show_processor();\n') ;

            // return ok
            return true ;
    }

    function wsweb_change_show_asmdbg ( )
    {
            wepsim_svg_stop_drawing() ;
	    $("#tab24").tab('show') ;

            // add if recording
            simcore_record_append_new('Show assembly debugger',
		                      'wsweb_change_show_asmdbg();\n') ;

            // if code then move scroll
	    var o1 = fullshow_asmdbg_pc() ;
	    if (typeof o1[0] == 'undefined') {
	        return true ;
            }

	    var obj_byid = $('#asm_debugger_container') ;
	    obj_byid[0].scrollTop = o1[0].offsetTop ;

            // return ok
            return true ;
    }

    //  Workspace simulator: execution

    function wsweb_execution_reset ( )
    {
	    wepsim_execute_reset(true, true) ;
	    simcoreui_show_hw() ;

            // add if recording
            simcore_record_append_new('Reset',
		                      'wsweb_execution_reset();\n') ;

            // return ok
            return true ;
    }

    function wsweb_execution_microinstruction ( )
    {
	    wepsim_execute_microinstruction() ;
	    simcoreui_show_hw() ;

            // add if recording
            simcore_record_append_new('Execute microinstruction',
		                      'wsweb_execution_microinstruction();\n') ;

            // return ok
            return true ;
    }

    function wsweb_execution_instruction ( )
    {
	    wepsim_execute_instruction() ;
	    simcoreui_init_hw('#config_HW') ;

            // add if recording
            simcore_record_append_new('Execute instruction',
		                      'wsweb_execution_instruction();\n') ;

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

	    wepsim_execute_toggle_play('#btn_run_stop', (mode == 'tutorial')) ;

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

    function wsweb_dialogbox_open_examples ( )
    {
            wepsim_open_examples_index();
	    $('[data-toggle=tooltip]').tooltip('hide');
            wepsim_restoreview(get_cfg('ws_skin_user')) ;

            // add if recording
            simcore_record_append_new('Open examples',
		                      'wsweb_dialogbox_open_examples();\n') ;

            // intercept events...
	    $("#example1").one("hidden.bs.modal",
		               function () {
				   simcore_record_append_new('Close examples',
				       	                     'wsweb_dialogbox_close_all();\n');
			       });
            wsweb_scroll_record('#container-example1') ;
	    simcore_record_captureInit() ;

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_help ( )
    {
	    wepsim_open_help_index();
	    wepsim_help_refresh();
	    $('[data-toggle=tooltip]').tooltip('hide');
            wepsim_restoreview(get_cfg('ws_skin_user')) ;

            // add if recording
            simcore_record_append_new('Open help',
		                      'wsweb_dialogbox_open_help();\n') ;

            // intercept events...
	    $("#help1").one("hidden.bs.modal",
		            function () {
				simcore_record_append_new('Close help',
					                  'wsweb_dialogbox_close_all();\n');
			    });
	    simcore_record_captureInit() ;

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_config ( )
    {
	    wepsim_open_config_index() ;
	    $('[data-toggle=tooltip]').tooltip('hide') ;
            wepsim_restoreview(get_cfg('ws_skin_user')) ;

            // add if recording
            simcore_record_append_new('Open configuration',
	       	                      'wsweb_dialogbox_open_config();\n') ;

            // intercept events...
	    $("#config2").one("hidden.bs.modal",
		              function () {
				  simcore_record_append_new('Close configuration',
					                    'wsweb_dialogbox_close_all();\n');
			      });
            wsweb_scroll_record('#container-config2') ;
	    simcore_record_captureInit() ;

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_state ( )
    {
            wepsim_dialog_current_state() ;
	    $('[data-toggle=tooltip]').tooltip('hide') ;
            wepsim_restoreview(get_cfg('ws_skin_user')) ;

            // add if recording
            simcore_record_append_new('Open state',
		                      'wsweb_dialogbox_open_state();\n') ;

            // intercept events...
	    $("#current_state1").one("hidden.bs.modal",
		                     function () {
					 simcore_record_append_new('Close state',
						                   'wsweb_dialogbox_close_all();\n');
				     });
	    simcore_record_captureInit() ;

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

            // add if recording
            simcore_record_append_new('Open binary assembly',
		                      'wsweb_dialogbox_open_binary_assembly();\n') ;

            // intercept events...
	    $("#bin2").one("hidden.bs.modal",
		           function () {
			       simcore_record_append_new('Close binary assembly',
				                         'wsweb_dialogbox_close_all();\n');
			   });

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

            // add if recording
            simcore_record_append_new('Open binary firmware',
		                      'wsweb_dialogbox_open_binary_firmware();\n') ;

            // intercept events...
	    $("#bin2").one("hidden.bs.modal",
		           function () {
			       simcore_record_append_new('Close binary firmware',
				                         'wsweb_dialogbox_close_all();\n');
			   });

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_hardware_summary ( )
    {
            var ahw2 = simhw_active().sim_short_name ;
	    var img2 = 'examples/hardware/' + ahw2 + '/images/cpu.svg?time=20190102' ;
	    var lyr2 =  '<object id=svg_p2 ' +
			'        data=\'' + img2 + '\' ' +
			'        type=\'image/svg+xml\'>' +
			'Your browser does not support SVG' +
			'</object>' ;
	    wepsim_open_help_content(lyr2) ;

            // add if recording
            simcore_record_append_new('Open hardware summary',
		                      'wsweb_dialogbox_open_hardware_summary();\n') ;

            // intercept events...
	    $("#help1").one("hidden.bs.modal",
		            function () {
				simcore_record_append_new('Open hardware summary',
					                  'wsweb_dialogbox_close_all();\n');
			    });

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_notifications ( )
    {
            wepsim_notifications_open() ;
	    $('[data-toggle=tooltip]').tooltip('hide') ;
            wepsim_restoreview(get_cfg('ws_skin_user')) ;

            // add if recording
            simcore_record_append_new('Open notification summary',
	       	                      'wsweb_dialogbox_open_notifications();\n') ;

            // intercept events...
	    $("#notifications2").one("hidden.bs.modal",
		                     function () {
				         simcore_record_append_new('Close notifications summary',
					                           'wsweb_dialogbox_close_all();\n');
			             });
            wsweb_scroll_record('#container-notifications2') ;
	    simcore_record_captureInit() ;

            // return ok
            return true ;
    }

    function wsweb_dialogbox_reset_notifications ( )
    {
	    simcore_notifications_reset() ;
	    $('#notifications2').modal('hide') ;
            wepsim_notifications_open() ;
            wepsim_restoreview(get_cfg('ws_skin_user')) ;

            // add if recording
            simcore_record_append_new('Reset notifications',
	       	                      'wsweb_dialogbox_reset_notifications();\n') ;

            // intercept events...
	    $("#notifications2").one("hidden.bs.modal",
		                     function () {
				         simcore_record_append_new('Close notifications summary',
					                           'wsweb_dialogbox_close_all();\n');
			             });
            wsweb_scroll_record('#container-notifications2') ;
	    simcore_record_captureInit() ;

            // return ok
            return true ;
    }

    function wsweb_dialogbox_close_state ( )
    {
	    $('#current_state1').modal('hide') ;

            // add if recording
            simcore_record_append_new('Close states dialogbox',
		                      'wsweb_dialogbox_close_state();\n') ;

            // return ok
            return true ;
    }

    function wsweb_dialogbox_close_all ( )
    {
	    // Close all dialogbox
	          $('#example1').modal('hide') ;
	             $('#help1').modal('hide') ;
	           $('#config2').modal('hide') ;
	    $('#current_state1').modal('hide');
	    $('#current_state2').modal('hide');
	              $('#bin2').modal('hide');
            $('#notifications2').modal('hide') ;

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
                return;
            }

	    if ( (true === get_cfg('is_quick_interactive')) && (event_type = 'click') )
	          wepsim_update_signal_quick(key) ;
	    else wepsim_update_signal_dialog(key) ;

	    show_states();
            wepsim_show_rf_values();

            // add if recording
            simcore_record_append_new('Open update signal dialogbox ' + key,
		                      'wsweb_dialogbox_open_updatesignal(\'' + key + '\',\'' + event_type + '\');\n') ;

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
	    $('#tab'  + opt).trigger('click') ;
	    $('#select5a').val(opt) ;

	    // set button label...
	    var ed=$('#s5b_' + opt).html() ;
	    $('#select5b').html(ed) ;

            // add if recording
            simcore_record_append_new('Change select details to ' + opt,
		                      'wsweb_set_details_select(' + opt + ');\n') ;

            // return ok
            return true ;
    }

    var hash_detail2action = {
	    "CLOCK":          function(){ wepsim_execute_microinstruction(); },
	    "REGISTER_FILE":  function(){ wsweb_set_details_select(11); wepsim_show_rf_values(); },
	    "CONTROL_MEMORY": function(){ wsweb_set_details_select(16); show_memories_values(); },
	    "CPU_STATS":      function(){ wsweb_set_details_select(17); show_memories_values(); },
	    "MEMORY":         function(){ wsweb_set_details_select(14); show_memories_values(); },
	    "MEMORY_CONFIG":  function(){ wsweb_set_details_select(18); show_memories_values(); },
	    "KEYBOARD":       function(){ wsweb_set_details_select(12); show_memories_values(); },
	    "SCREEN":         function(){ wsweb_set_details_select(12); show_memories_values(); },
	    "IO_STATS":       function(){ wsweb_set_details_select(15); show_memories_values(); },
	    "IO_CONFIG":      function(){ wsweb_set_details_select(19); show_memories_values(); },

	    "FRM_EDITOR":     function(){ wsweb_set_details_select(20); $("#t3_firm").appendTo("#t3_firm_placeholder2"); inputfirm.refresh(); },
	    "ASM_EDITOR":     function(){ wsweb_set_details_select(21);  $("#t4_asm").appendTo("#t4_asm_placeholder2");   inputasm.refresh(); },
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

            // add if recording
            simcore_record_append_new('Set details to ' + opt,
		                      'wsweb_set_details(\'' + opt + '\');\n') ;

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

	    // tutorial mode -> set green background...
	    $('#select4').css('background-color', '#F6F6F6') ;
	    if ('tutorial' == opt) {
	        $('#select4').css('background-color', '#D4DB17') ;
	    }

	    // set button label...
	    var ed = $('#s4_' + opt).html() ;
	    $('#select4').html(ed) ;

	    // adapt to idiom
	    var ws_idiom = get_cfg('ws_idiom') ;
	    i18n_update_tags('gui', ws_idiom) ;

            // add if recording
            simcore_record_append_new('Set main work mode to ' + opt,
		                      'wsweb_select_main("' + opt + '");\n') ;

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

            // add if recording
            simcore_record_append_new('Set cpu-cu size to ' + new_value,
		                      'wsweb_set_cpucu_size(' + new_value + ');\n') ;

            // return ok
            return true ;
    }

    function wsweb_set_c1c2_size ( new_value )
    {
	    $("#slider2a").val(new_value) ;
	    set_ab_size('#col1', '#col2', new_value);

	    set_cfg('C1C2_size', new_value);
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
            var textToCompile = inputasm.getValue() ;
	    var ok = wepsim_compile_assembly(textToCompile) ;

            // add if recording
            simcore_record_append_new('Compile assembly',
		                      'wsweb_assembly_compile();\n') ;

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
		    alert('The Microcode loaded in memory is empty!\n' +
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

	    // set content
	    $("#notifyuser1_title"  ).html(title) ;
	    $("#notifyuser1_message").html(message) ;
            wepsim_updatetime_start("#notifyuser1_footer", duration / 1000) ;

	    // show dialogbox
	    wsweb_nfbox = $("#notifyuser1") ;
	    wsweb_nfbox.modal('show') ;

            // return ok
            return true ;
    }

    function wsweb_notifyuser_hide ( )
    {
	    wsweb_nfbox = $("#notifyuser1") ;
	    wsweb_nfbox.modal("hide") ;

            // return ok
            return true ;
    }

    function wsweb_notifyuser_add ( )
    {
	    // check if recording
            if (simcore_record_isRecording() === false) {
		return ;
	    }

	    // stats about recordbar
	    ga('send', 'event', 'recordbar', 'recordbar.action', 'recordbar.action.add_notification');

	    // build the message box
            var wsi = get_cfg('ws_idiom') ;
            var bbbt = {} ;

            bbbt.cancel = {
		    label: i18n_get('gui',wsi,'Close'),
		    className: 'btn-danger col float-left mr-auto',
	    };
            bbbt.end = {
		    label: i18n_get('gui',wsi,'Save'),
		    className: 'btn-success col float-right',
		    callback: function() {
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
		    }
	    };

	    var bbmsg = '<div class="container">' +
		        '<label for="frm_title1"><em>'    + i18n_get('dialogs',wsi,'Title') + ':</em></label>' +
			'<p><input aria-label="title" id="frm_title1" ' +
			'	  class="form-control btn-outline-dark" placeholder="Title for the notification" style="min-width: 90%;"/></p>' +
		        '<label for="frm_message1"><em>'  + i18n_get('dialogs',wsi,'Message') + ':</em></label>' +
			'<p><textarea aria-label="message" id="frm_message1" rows="5" ' +
			'	      class="form-control btn-outline-dark" placeholder="Message for the notification" style="min-width: 90%;"/></p>' +
		        '<label for="frm_duration1"><em>' + i18n_get('dialogs',wsi,'Duration') + ':</em></label>' +
			'<p><input aria-label="duration" id="frm_duration1" type="number" ' +
			'	  class="form-control btn-outline-dark" placeholder="Duration for the notification in seconds" style="min-width: 90%;"/></p>' +
		        '</div>' ;

            wsweb_nfbox = bootbox.dialog({
			     title:   'Form to add a message during playback...',
			     message: bbmsg,
			     buttons: bbbt,
			     size:    "large",
			     animate: false
			  });

            // return ok
            return true ;
    }

    //  Workspace simulator: record

    function wsweb_record_on ( )
    {
	    simcore_record_start() ;

	    // stats about recordbar
	    ga('send', 'event', 'recordbar', 'recordbar.action', 'recordbar.action.record');

            // return ok
            return true ;
    }

    function wsweb_record_off ( )
    {
	    simcore_record_stop() ;

	    // stats about recordbar
	    ga('send', 'event', 'recordbar', 'recordbar.action', 'recordbar.action.stop');

            // return ok
            return true ;
    }

    function wsweb_record_reset ( )
    {
	    simcore_record_reset() ;

	    // stats about recordbar
	    ga('send', 'event', 'recordbar', 'recordbar.action', 'recordbar.action.reset');

            // return ok
            return true ;
    }

    function wsweb_record_play ( )
    {
	    simcore_record_play() ;

	    // stats about recordbar
	    ga('send', 'event', 'recordbar', 'recordbar.action', 'recordbar.action.play');

            // return ok
            return true ;
    }

    function wsweb_record_pause ( )
    {
	    simcore_record_pause() ;

	    // stats about recordbar
	    ga('send', 'event', 'recordbar', 'recordbar.action', 'recordbar.action.pause');

            // return ok
            return true ;
    }

    function wsweb_record_playInterval ( from, to )
    {
	    simcore_record_playInterval(from, to) ;

	    // stats about recordbar
	    ga('send', 'event', 'recordbar', 'recordbar.action', 'recordbar.action.play-' + from + '-' + to);

            // return ok
            return true ;
    }

    function wsweb_record_confirmReset ( )
    {
	    // show dialogbox
                var wsi = get_cfg('ws_idiom') ;
            wsweb_nfbox = bootbox.dialog({
			     title:   i18n_get('dialogs',wsi,'Confirm remove record...'),
			     message: i18n_get('dialogs',wsi,'Close or Reset...'),
			     buttons: {
		                reset: {
				   label: i18n_get('gui',wsi,'Reset'),
		                   className: 'btn-dark col float-left',
		                   callback: function() {
				                wsweb_record_reset();
				                return true;
			                     },
			        },
		                close: {
			  	   label: i18n_get('gui',wsi,'Close'),
				   className: 'btn-danger col float-right'
			        }
			     },
			     keyboard: true,
			     animate:  false
			  });

            // return ok
            return true ;
    }

    //  All workspaces: popovers and modals from quick-menu...

    // about
    function wsweb_about_show ( )
    {
	    $('#about2').modal('show') ;

            // add if recording
            simcore_record_append_new('Open the "about" dialogbox',
		                      'wsweb_about_show();\n') ;

            // return ok
            return true ;
    }

    function wsweb_about_close ( )
    {
	    $('#about2').modal('hide') ;

            // add if recording
            simcore_record_append_new('Close the "about" dialogbox',
		                      'wsweb_about_close();\n') ;

            // return ok
            return true ;
    }

    // quick menu
    function wsweb_quickmenu_show ( )
    {
	    $('#po1').popover('show') ;

            // add if recording
            simcore_record_append_new('Open the "quick menu"',
		                      'wsweb_quickmenu_show();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickmenu_close ( )
    {
	    $('#po1').popover('hide') ;

            // add if recording
            simcore_record_append_new('Close the "quick menu"',
		                      'wsweb_quickmenu_close();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickmenu_toggle ( )
    {
	    $('#po1').popover('toggle') ;

            // add if recording
            simcore_record_append_new('Toggle the "quick menu"',
		                      'wsweb_quickmenu_toggle();\n') ;

            // return ok
            return true ;
    }

    // quick slider(s)
    function wsweb_quickslider_show ( )
    {
	    $('#popover-slidercfg').popover('show') ;

            // add if recording
            simcore_record_append_new('Open the "quick slider"',
		                      'wsweb_quickslider_show();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickslider_close ( )
    {
	    $('#popover-slidercfg').popover('hide') ;

            // add if recording
            simcore_record_append_new('Close the "quick slider"',
		                      'wsweb_quickslider_close();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickslider_toggle ( )
    {
	    $('#popover-slidercfg').popover('toggle') ;

            // add if recording
            simcore_record_append_new('Toggle the "quick slider"',
		                      'wsweb_quickslider_toggle();\n') ;

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
	    $('#record_div').collapse('hide') ;

            // add if recording
            simcore_record_append_new('Close the "record toolbar"',
		                      'wsweb_recordbar_close();\n') ;

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

				    wsweb_scroll_timer = setTimeout(add_scroll_to, 150);
				 });
    }

