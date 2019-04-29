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
			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.simulator');
	               }, 50) ;

            // add if recording
            simcore_record_add('Change to workspace simulator',
		               'wsweb_change_workspace_simulator();\n') ;

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

            // add if recording
            simcore_record_add('Change to workspace microcode',
		               'wsweb_change_workspace_microcode();\n') ;

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

            // add if recording
            simcore_record_add('Change to workspace assembly',
		               'wsweb_change_workspace_assembly();\n') ;

            // return ok
            return true ;
    }

    function wsweb_change_show_processor ( )
    {
            // btn 'glows'
            wepsim_btn_glowing('#tab26') ;

            // do action
	    $("#tab26").tab('show') ;
	    start_drawing() ;
	    refresh() ;

            // add if recording
            simcore_record_add('Show processor details',
		               'wsweb_change_show_processor();\n') ;

            // return ok
            return true ;
    }

    function wsweb_change_show_asmdbg ( )
    {
            // btn 'glows'
            wepsim_btn_glowing('#tab24') ;

            // do action
            stop_drawing() ;
	    $("#tab24").tab('show') ;

            // add if recording
            simcore_record_add('Show assembly debugger',
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
            // btn 'glows'
            wepsim_btn_glowing('#rs1') ;

	    // do action
	    wepsim_execute_reset(true, true) ;
	    simcoreui_show_hw() ;

            // add if recording
            simcore_record_add('Reset',
		               'wsweb_execution_reset();\n') ;

            // return ok
            return true ;
    }

    function wsweb_execution_microinstruction ( )
    {
            // btn 'glows'
            wepsim_btn_glowing('#nm1') ;

	    // do action
	    wepsim_execute_microinstruction() ;
	    simcoreui_show_hw() ;

            // add if recording
            simcore_record_add('Execute microinstruction',
		               'wsweb_execution_microinstruction();\n') ;

            // return ok
            return true ;
    }

    function wsweb_execution_instruction ( )
    {
            // btn 'glows'
            wepsim_btn_glowing('#ni1') ;

	    // do action
	    wepsim_execute_instruction() ;
	    simcoreui_init_hw('#config_HW') ;

            // add if recording
            simcore_record_add('Execute instruction',
		               'wsweb_execution_instruction();\n') ;

            // return ok
            return true ;
    }

    function wsweb_execution_run ( )
    {
            // btn 'glows'
            wepsim_btn_glowing('#qbp') ;

	    // do action
            var mode = get_cfg('ws_mode') ;
	    if ('tutorial' == mode) {
		 wepsim_notify_success('<strong>INFO</strong>',
				       'Tutorial mode on. Use the configuration to change it.') ;
	    }

	    wepsim_execute_toggle_play('#qbp', (mode == 'tutorial')) ;

            // add if recording
            simcore_record_add('Run',
		               'wsweb_execution_run();\n') ;

            // intercept events...
	    $("#current_state2").on("hidden.bs.modal",
		                     function () {
					 simcore_record_add('Close execution summary',
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

            // add if recording
            simcore_record_add('Open examples',
		               'wsweb_dialogbox_open_examples();\n') ;

            // intercept events...
	    $("#example1").on("hidden.bs.modal",
		               function () {
				   simcore_record_add('Close examples',
					              'wsweb_dialogbox_close_all();\n');
			       });
            wsweb_scroll_record('#container-example1') ;

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_help ( )
    {
	    wepsim_open_help_index();
	    wepsim_help_refresh();
	    $('[data-toggle=tooltip]').tooltip('hide');

            // add if recording
            simcore_record_add('Open help',
		               'wsweb_dialogbox_open_help();\n') ;

            // intercept events...
	    $("#help1").on("hidden.bs.modal",
		            function () {
				simcore_record_add('Close help',
					           'wsweb_dialogbox_close_all();\n');
			    });

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_config ( )
    {
            // btn 'glows'
            wepsim_btn_glowing('#btn_cfg1') ;

	    wepsim_open_config_index() ;
	    $('[data-toggle=tooltip]').tooltip('hide') ;

            // add if recording
            simcore_record_add('Open configuration',
		               'wsweb_dialogbox_open_config();\n') ;

            // intercept events...
	    $("#config2").on("hidden.bs.modal",
		              function () {
				  simcore_record_add('Close configuration',
					             'wsweb_dialogbox_close_all();\n');
			      });
            wsweb_scroll_record('#container-config2') ;

            // return ok
            return true ;
    }

    function wsweb_dialogbox_open_state ( )
    {
            wepsim_dialog_current_state() ;
	    $('[data-toggle=tooltip]').tooltip('hide') ;

            // add if recording
            simcore_record_add('Open state',
		               'wsweb_dialogbox_open_state();\n') ;

            // intercept events...
	    $("#current_state1").on("hidden.bs.modal",
		                     function () {
					 simcore_record_add('Close state',
						            'wsweb_dialogbox_close_all();\n');
				     });

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
            simcore_record_add('Open binary assembly',
		               'wsweb_dialogbox_open_binary_assembly();\n') ;

            // intercept events...
	    $("#bin2").on("hidden.bs.modal",
		           function () {
			       simcore_record_add('Close binary assembly',
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
            simcore_record_add('Open binary firmware',
		               'wsweb_dialogbox_open_binary_firmware();\n') ;

            // intercept events...
	    $("#bin2").on("hidden.bs.modal",
		           function () {
			       simcore_record_add('Close binary firmware',
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
            simcore_record_add('Open hardware summary',
		               'wsweb_dialogbox_open_hardware_summary();\n') ;

            // intercept events...
	    $("#help1").on("hidden.bs.modal",
		            function () {
				simcore_record_add('Open hardware summary',
					           'wsweb_dialogbox_close_all();\n');
			    });

            // return ok
            return true ;
    }

    function wsweb_dialogbox_close_state ( )
    {
	    $('#current_state1').modal('hide') ;

            // add if recording
            simcore_record_add('Close states dialogbox',
		               'wsweb_dialogbox_close_state();\n') ;

            // return ok
            return true ;
    }

    function wsweb_dialogbox_close_all ( )
    {
	    // Close all dialogbox before open this one
	          $('#example1').modal('hide') ;
	             $('#help1').modal('hide') ;
	           $('#config2').modal('hide') ;
	    $('#current_state1').modal('hide');
	    $('#current_state2').modal('hide');
	              $('#bin2').modal('hide');

            // add if recording
            simcore_record_add('Close all dialogboxes',
		               'wsweb_dialogbox_close_all();\n') ;

            // return ok
            return true ;
    }

    //  Workspace simulator: Selects

    function wsweb_set_details_select ( opt )
    {
            // btn 'glows'
            wepsim_btn_glowing('#dd2') ;

	    // update interface
	    $('#tab'  + opt).trigger('click') ;
	    $('#select5a').val(opt) ;

	    // set button label...
	    var ed=$('#s5b_' + opt).html() ;
	    $('#select5b').html(ed) ;

            // add if recording
            simcore_record_add('Change select details to ' + opt,
		               'wsweb_set_details_select(' + opt + ');\n') ;

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

            // add if recording
            simcore_record_add('Set details to ' + opt,
		               'wsweb_set_details(\'' + opt + '\');\n') ;

            // return ok
            return true ;
    }


    //  Workspace simulator: Mode

    function wsweb_select_main ( opt )
    {
            // btn 'glows'
            wepsim_btn_glowing('#dd1') ;

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

            // add if recording
            simcore_record_add('Set main work mode to ' + opt,
		               'wsweb_select_main("' + opt + '");\n') ;

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

            // add if recording
            simcore_record_add('Update work mode to ' + new_mode,
		               'wsweb_mode_update("' + new_mode + '");\n') ;

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
            simcore_record_add('Set cpu-cu size to ' + new_value,
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
            simcore_record_add('Set c1-c2 size to ' + new_value,
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
            simcore_record_add('Compile assembly',
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
            simcore_record_add('Compile firmware',
		               'wsweb_firmware_compile();\n') ;

            // return ok
            return true ;
    }

    //  Workspace simulator: Files

    function wsweb_save_controlmemory_to_file ( )
    {
            var q = 'Do you want me to save the current Control Memory contents ' +
                    ' rather than the editor contents?.\n\n' ;
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
            simcore_record_add('Save control memory to file',
		               'wsweb_save_controlmemory_to_file();\n') ;

            // return ok
            return true ;
    }

    //  simulator: notify

    var wsweb_nfbox = null ;

    function wsweb_notifyuser_show ( title, message )
    {
	    // check params
	    if (title.trim() === '') {
		title = '&lt;empty title&gt;' ;
	    }
	    if (message.trim() === '') {
		message = '&lt;empty message&gt;' ;
	    }

	    // show dialogbox
                var wsi = get_cfg('ws_idiom') ;
            wsweb_nfbox = bootbox.dialog({
			     title:   title,
			     message: message,
			     buttons: {
		              cancel: {
				 label: i18n_get('gui',wsi,'Cancel'),
				 className: 'btn-danger col-auto float-right'
			      }
			     },
			     size:    "large",
			     animate: false
			  });

            // return ok
            return true ;
    }

    function wsweb_notifyuser_hide ( wait_before_hide_seconds )
    {
	    window.setTimeout(function() {
		                  wsweb_nfbox.modal("hide") ;
	                      },
		              wait_before_hide_seconds) ;

            // return ok
            return true ;
    }

    function wsweb_notifyuser_add ( )
    {
            var wsi = get_cfg('ws_idiom') ;

            var bbbt = {} ;
            bbbt.cancel = {
		    label: i18n_get('gui',wsi,'Close'),
		    className: 'btn-danger col-auto float-left mr-auto',
	    };
            bbbt.end = {
		    label: i18n_get('gui',wsi,'Save'),
		    className: 'btn-success col-auto float-right',
		    callback: function() {
			    // get values
			    var nf_title    = $("#frm_title1").val() ;
			    var nf_message  = $("#frm_message1").val() ;
			    var nf_duration = $("#frm_duration1").val() ;

			    // post-process
			    nf_title    =   nf_title.replace(/<[^>]*>/g, '') ;
			    nf_message  = nf_message.replace(/<[^>]*>/g, '') ;
			    nf_duration = parseInt(nf_duration) ;

			    if (isNaN(nf_duration))
			         nf_duration = 5000 ;
			    else nf_duration = 1000 * nf_duration ;

			    // add if recording
			    simcore_record_addAlways('Message with title "'      + nf_title + '" and message "' + nf_message + '".',
					             'wsweb_notifyuser_show("'   + nf_title + '", "'            + nf_message + '");\n') ;
			    simcore_record_addAlways('Close message with title ' + nf_title,
				                     'wsweb_notifyuser_hide('    + nf_duration + ');\n') ;
		    }
	    };

	    var bbmsg = '<div class="container">' +
		        '<label for="frm_title1"><em>'    + i18n_get('gui',wsi,'Title') + ':</em></label>' +
			'<p><input aria-label="title" id="frm_title1" ' +
			'	  class="form-control btn-outline-dark" placeholder="Title for the notification" style="min-width: 90%;"/></p>' +
		        '<label for="frm_message1"><em>'  + i18n_get('gui',wsi,'Message') + ':</em></label>' +
			'<p><textarea aria-label="message" id="frm_message1" ' +
			'	      class="form-control btn-outline-dark" placeholder="Message for the notification" style="min-width: 90%;"/></p>' +
		        '<label for="frm_duration1"><em>' + i18n_get('gui',wsi,'Duration') + ':</em></label>' +
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

    function wsweb_record_init ( )
    {
	    simcore_record_init('record_msg') ;

            // return ok
            return true ;
    }

    function wsweb_record_on ( )
    {
	    simcore_record_on() ;

            // return ok
            return true ;
    }

    function wsweb_record_off ( )
    {
	    simcore_record_off() ;

            // return ok
            return true ;
    }

    function wsweb_record_reset ( )
    {
	    simcore_record_reset() ;

            // return ok
            return true ;
    }

    function wsweb_record_play ( )
    {
	    simcore_record_play() ;

            // return ok
            return true ;
    }

    function wsweb_record_pause ( )
    {
	    simcore_record_pause() ;

            // return ok
            return true ;
    }

    //  All workspaces: popovers and modals from quick-menu...

    // about
    function wsweb_about_show ( )
    {
	    $('#about2').modal('show') ;

            // add if recording
            simcore_record_add('Open the "about" dialogbox',
		               'wsweb_about_show();\n') ;

            // return ok
            return true ;
    }

    function wsweb_about_close ( )
    {
	    $('#about2').modal('hide') ;

            // add if recording
            simcore_record_add('Close the "about" dialogbox',
		               'wsweb_about_close();\n') ;

            // return ok
            return true ;
    }

    // quick menu
    function wsweb_quickmenu_show ( )
    {
	    $('#po1').popover('show') ;

            // add if recording
            simcore_record_add('Open the "quick menu"',
		               'wsweb_quickmenu_show();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickmenu_close ( )
    {
	    $('#po1').popover('hide') ;

            // add if recording
            simcore_record_add('Close the "quick menu"',
		               'wsweb_quickmenu_close();\n') ;

            // return ok
            return true ;
    }

    function wsweb_quickmenu_toggle ( )
    {
	    $('#po1').popover('toggle') ;

            // add if recording
            simcore_record_add('Toggle the "quick menu"',
		               'wsweb_quickmenu_toggle();\n') ;

            // return ok
            return true ;
    }

    // recordbar
    function wsweb_recordbar_toggle ( )
    {
	    $('#record_div').collapse('toggle') ;

            // add if recording
            simcore_record_add('Toggle the "record toolbar"',
		               'wsweb_recordbar_toggle();\n') ;

            // return ok
            return true ;
    }

    function wsweb_recordbar_close ( )
    {
	    $('#record_div').collapse('hide') ;

            // add if recording
            simcore_record_add('Close the "record toolbar"',
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
				     simcore_record_add('Scroll content',
						        'wsweb_scroll_to("' + container_id + '", ' + div_pos + ');\n') ;
				};

            container_obj.scroll(function() {

				    if (wsweb_scroll_timer !== null) {
					clearTimeout(wsweb_scroll_timer) ;
				    }

				    wsweb_scroll_timer = setTimeout(add_scroll_to, 150);
				 });
    }

