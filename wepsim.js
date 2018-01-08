/*
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

    /*
     * Microcompile and compile
     */

    function wepsim_compile_assembly ( textToCompile )
    {
        // get SIMWARE.firmware
        var SIMWARE = get_simware() ;
	if (SIMWARE.firmware.length == 0)
        {
            alert('WARNING: please load the microcode first.');
            $.mobile.pageContainer.pagecontainer('change','#main3');
            return false;
	}

        // compile Assembly and show message
        var SIMWAREaddon = simlang_compile(textToCompile, SIMWARE);
        if (SIMWAREaddon.error != null)
        {
            showError(SIMWAREaddon.error, "inputasm") ;
            return false;
        }

        wepsim_notify_success('<strong>INFO</strong>', 
                              'Assembly was compiled and loaded.') ;

        // update memory and segments
        set_simware(SIMWAREaddon) ;
	update_memories(SIMWARE);

        // update UI
        $("#asm_debugger").html(assembly2html(SIMWAREaddon.mp, SIMWAREaddon.labels2,
                                              SIMWAREaddon.seg, SIMWAREaddon.assembly));
        showhideAsmElements();

	reset();
        return true;
    }

    function wepsim_compile_firmware ( textToMCompile )
    {
	var preSM = load_firmware(textToMCompile) ;
	if (preSM.error != null)
        {
            showError(preSM.error, "inputfirm") ;
            return false;
        }

        // update UI
        wepsim_notify_success('<strong>INFO</strong>', 
                              'Microcode was compiled and loaded.') ;

	reset() ;
        return true;
    }

    /*
     * Show binaries
     */

    function wepsim_show_binary_code ( popup_id, popup_content_id )
    {
        $(popup_content_id).html("<center>" +
                                 "<br>Loading binary, please wait..." +
                                 "<br>" +
                                 "<br>WARNING: loading binary might take time on slow mobile devices." +
                                 "</center>");
        $(popup_content_id).css({width:"100%",height:"inherit !important"});
	$(popup_id).modal('show');

	setTimeout(function(){
			var SIMWARE = get_simware() ;

			$(popup_content_id).html(mp2html(SIMWARE.mp, SIMWARE.labels2, SIMWARE.seg));

			for (var skey in SIMWARE.seg) {
			     $("#compile_begin_" + skey).html("0x" + SIMWARE.seg[skey].begin.toString(16));
			     $("#compile_end_"   + skey).html("0x" + SIMWARE.seg[skey].end.toString(16));
			}
                   }, 300);
    }

    function wepsim_show_binary_microcode ( popup_id, popup_content_id )
    {
        $(popup_content_id).html("<center>" +
                                 "<br>Loading binary, please wait..." +
                                 "<br>" +
                                 "<br>WARNING: loading binary might take time on slow mobile devices." +
                                 "</center>");
        $(popup_content_id).css({width:"100%",height:"inherit !important"});
	$(popup_id).modal('show');

	setTimeout(function() {
			var SIMWARE = get_simware() ;
			$(popup_content_id).html(firmware2html(SIMWARE.firmware, true));
			$(popup_content_id).css({width:"inherit !important", height:"inherit !important"});

			$(popup_id).enhanceWithin();
			$(popup_id).trigger('updatelayout');
			$(popup_id).trigger('refresh');
                   }, 300);
    }

    /*
     * Play/stop
     */

    function wepsim_execute_reset ( reset_cpu, reset_memory )
    {
        wepsim_state_history_reset();

        if (true == reset_memory) 
        {
            var SIMWARE = get_simware() ;
	    if (SIMWARE.firmware.length != 0)
                update_memories(SIMWARE) ;
        }

        if (true == reset_cpu) 
        {
	    reset() ;
        }
    }

    function wepsim_execute_instruction ( )
    {
	if (check_if_can_execute(true) == false) {
	    return false ;
        }

        var clklimit = get_cfg('DBG_limitick') ;

	var ret = execute_microprogram(clklimit) ;
	if (false == ret.ok) {
            wepsim_show_stopbyevent("Info", ret.msg) ;
    	    return false ;
        }

        return true ;
    }

    function wepsim_execute_microinstruction ( )
    {
	if (check_if_can_execute(true) == false) {
	    return false ;
        }

	var ret = execute_microinstruction() ;
	if (false == ret.ok) {
            wepsim_show_stopbyevent("Info", ret.msg) ;
	    return false ;
        }

        return true ;
    }

    function wepsim_execute_set_breakpoint ( addr )
    {
        return asmdbg_set_breakpoint(addr) ;
    }

    var DBG_stop  = true ;
    var DBG_limit_instruction = 0 ;

    function wepsim_execute_stop ( btn1 )
    {
	$(btn1).html("<br>Run") ;
	$(btn1).removeClass("ui-icon-minus") ;
	$(btn1).addClass("ui-icon-carat-r") ;
	$(btn1).css("backgroundColor", "#CCCCCC") ;

	DBG_stop = true;
        DBG_limit_instruction = 0 ;
    }

    function wepsim_execute_play ( btn1, run_notifications )
    {
	if (check_if_can_execute(true) == false)
	    return false;

	$(btn1).css("backgroundColor", 'rgb(51, 136, 204)') ;
	$(btn1).html("<br>Stop") ;
	$(btn1).removeClass("ui-icon-carat-r") ;
	$(btn1).addClass("ui-icon-minus") ;

        DBG_stop = false ;
        DBG_limit_instruction = 0 ;

        if (false == run_notifications)
             wepsim_execute_chainplay(btn1) ;
        else wepsim_execute_chainnotify(btn1) ;
    }

    function wepsim_execute_toggle_play ( btn1, run_notifications )
    {
        if (DBG_stop == false) 
        {
            DBG_stop = true ; // will help to execute_play stop playing
        } 
        else 
        {
            wepsim_execute_play(btn1, run_notifications) ;
        }
    }


    //
    // Auxiliar functions
    //

    function wepsim_notify_success ( ntf_title, ntf_message )
    {
         return simcoreui_notify(ntf_title, ntf_message, 'success', get_cfg('NOTIF_delay')) ;
    }

    function wepsim_notify_error ( ntf_title, ntf_message )
    {
         return simcoreui_notify(ntf_title, ntf_message, 'danger', 0) ;
    }

    function wepsim_notify_close ( )
    {
         return simcoreui_notify_close() ;
    }


    /*
     * Play/stop
     */

    function wepsim_check_stopbybreakpoint_firm ( )
    {
        var reg_maddr = get_value(sim_states.REG_MICROADDR) ;
        var curr_addr = "0x" + reg_maddr.toString(16) ;

        if (typeof MC_dashboard[reg_maddr] == "undefined") {
            return false ;
        }

        return (MC_dashboard[reg_maddr].breakpoint) ;
    }

    function wepsim_check_stopbybreakpoint_asm ( )
    {
	var reg_pc    = get_value(sim_states.REG_PC) ;
	var curr_addr = "0x" + reg_pc.toString(16) ;

	if (typeof FIRMWARE.assembly[curr_addr] == "undefined") {
            return false ;
        }

	return (FIRMWARE.assembly[curr_addr].breakpoint) ;
    }

    function wepsim_show_stopbyevent ( msg1, msg2 )
    {
        var reg_maddr  = get_value(sim_states.REG_MICROADDR) ;
	var curr_maddr = "0x" + reg_maddr.toString(16) ;
	var reg_pc     = get_value(sim_states.REG_PC) ;
	var curr_addr  = "0x" + reg_pc.toString(16) ;

	var dialog_title = msg1 + " @ pc=" + curr_addr + "+mpc=" + curr_maddr + ":<br>" + msg2 ;

        $("#dlg_title2").html(dialog_title) ;
        $('#current_state2').modal('show');

	return true ;
    }

    function wepsim_check_state_firm ( )
    {
        var reg_maddr = get_value(sim_states.REG_MICROADDR) ;
        if (false == MC_dashboard[reg_maddr].state)
            return false ;

        wepsim_state_history_add() ;
	return true ;
    }

    function wepsim_execute_chunk ( btn1, chunk )
    {
	var ret = false ;
        var i = 0 ;

	var playlevel = get_cfg('DBG_level') ;
	if (playlevel == "instruction")  
	{
            var clklimit  = get_cfg('DBG_limitick') ;
            for (i=0; i<chunk; i++)
            {
		    ret = execute_microprogram(clklimit) ;
		    if (ret.ok === false) {
                        wepsim_show_stopbyevent("Info", ret.msg) ;
			wepsim_execute_stop(btn1) ;
			return false ;
		    }

		    ret = wepsim_check_stopbybreakpoint_asm() ;
		    if (true == ret) {
                        wepsim_show_stopbyevent("Breakpoint", "Instruction is going to be fetched.") ;
			wepsim_execute_stop(btn1) ;
			return false ;
		    }
            }
	}
	else
	{
	    var reg_maddr = 0 ;
            for (i=0; i<chunk; i++)
            {
		    wepsim_check_state_firm() ;

		    ret = execute_microinstruction() ;
		    if (false == ret.ok) {
		        wepsim_show_stopbyevent("Info", ret.msg) ;
			wepsim_execute_stop(btn1) ;
			return false ;
		    }

                    ret = wepsim_check_stopbybreakpoint_firm() ;
		    if (true == ret)
		    {
		        wepsim_show_stopbyevent("Breakpoint", "Microinstruction is going to be issue.") ;
			wepsim_execute_stop(btn1) ;
			return false ;
		    }

		    reg_maddr = get_value(sim_states.REG_MICROADDR) ;
                    if (0 == reg_maddr) 
                    {
		        ret = wepsim_check_stopbybreakpoint_asm() ;
		        if (true == ret) {
                            wepsim_show_stopbyevent("Breakpoint", "Instruction is going to be fetched.") ;
		    	    wepsim_execute_stop(btn1) ;
			    return false ;
		        }
		    }
            }
	}

        return true ;
    }

    // instructions per chunck to be chained...
    var max_turbo = 5 ;

    function wepsim_reset_max_turbo ( )
    {
        max_turbo = 5 ;
    }

    function wepsim_execute_chainplay ( btn1 )
    {
	var t0 = 1.0 ;
	var t1 = 1.0 ;

	if (DBG_stop) {
	    wepsim_execute_stop(btn1) ;
	    return ;
	}

        var turbo = 1;
	if (get_cfg('DBG_delay') < 5)
            turbo = max_turbo ;
        if (max_turbo == 5) 
            t0 = performance.now() ;

        var ret = wepsim_execute_chunk(btn1, turbo) ;
        if (false == ret)
            return ;

        if (max_turbo == 5) 
            t1 = performance.now() ;
        if (max_turbo == 5) 
            max_turbo = 3000/(t1-t0) ;

	DBG_limit_instruction += turbo ;
        if (DBG_limit_instruction > get_cfg('DBG_limitins')) 
	{
            wepsim_show_stopbyevent("Limit", "Number of executed instructions limit reached.");
	    wepsim_execute_stop(btn1) ;
            return ;
	}

	setTimeout(wepsim_execute_chainplay, get_cfg('DBG_delay'), btn1) ;
    }

    function wepsim_execute_chainnotify ( btn1 )
    {
	if (DBG_stop) {
	    wepsim_execute_stop(btn1) ;
	    return ;
	}

	var ret = false ;
        for (var i=0; i<max_turbo; i++)
        {
		ret = execute_microinstruction() ;
		if (false == ret.ok) {
		    wepsim_show_stopbyevent("Info", ret.msg) ;
		    wepsim_execute_stop(btn1) ;
		    return ;
		}

		var reg_maddr = get_value(sim_states.REG_MICROADDR) ;
		var notifications = MC_dashboard[reg_maddr].notify.length ;
		if (notifications > 1) 
                {
		    var dialog_title = "Notify @ " + reg_maddr + ": " + MC_dashboard[reg_maddr].notify[1] ;

		    var dialog_msg = "" ;
		    for (var k=1; k<notifications; k++) {
			 dialog_msg += MC_dashboard[reg_maddr].notify[k] + "\n<br>" ;
		    }

		    bootbox.confirm({
			title:    dialog_title,
			message:  dialog_msg,
			buttons:  {
				     cancel:  { label: 'Stop',     className: 'btn-danger' },
				     confirm: { label: 'Continue', className: 'btn-primary' }
				  },
			callback: function (result) {
				     if (result)
				          setTimeout(wepsim_execute_chainnotify, get_cfg('DBG_delay'), btn1) ;
				     else wepsim_execute_stop(btn1) ;
				  }
		    });

		    return ;
		}
        }

        setTimeout(wepsim_execute_chainnotify, get_cfg('DBG_delay'), btn1) ;
    }


    /*
     * UI elements
     */

    function showError ( Msg, editor )
    {
            var errorMsg = Msg.replace(/\t/g,' ').replace(/   /g,' ');

            var pos = errorMsg.match(/Problem around line \d+/);
            var lineMsg = '' ;
            if (null != pos) {
                pos = parseInt(pos[0].match(/\d+/)[0]);
                lineMsg += '<button type="button" class="btn btn-danger" ' +
                           '        onclick="wepsim_notify_close();' +
                           '                      var marked = ' + editor + '.addLineClass(' + (pos-1) + ', \'background\', \'CodeMirror-selected\');' +
                           '                 setTimeout(function() { ' + editor + '.removeLineClass(marked, \'background\', \'CodeMirror-selected\'); }, 3000);' +
		           '		     var t = ' + editor + '.charCoords({line: ' + pos + ', ch: 0}, \'local\').top;' +
		           '		     var middleHeight = ' + editor + '.getScrollerElement().offsetHeight / 2;' +
		           '		     ' + editor + '.scrollTo(null, t - middleHeight - 5);">Go line ' + pos + '</button>&nbsp;' ;
            }

            wepsim_notify_error('<strong>ERROR</strong>',
                                errorMsg + '<br>' + '<center>' + lineMsg +
                                '<button type="button" class="btn btn-danger" ' + 
                                '        onclick="wepsim_notify_close();">Close</button>' +
                                '</center>') ;
    }

    function showhideAsmElements ( )
    {
	$("input:checkbox:checked").each(function() {
		var column = "table ." + $(this).attr("name");
		$(column).show();
	});

	$("input:checkbox:not(:checked)").each(function() {
		var column = "table ." + $(this).attr("name");
		$(column).hide();
	});
    }

    function set_cpu_cu_size ( diva, divb, new_value )
    {
	var a = new_value;
	var b = 100 - a;
	$('#eltos_cpu_a').css({width: a+'%'});
	$('#eltos_cpu_b').css({width: b+'%'});
    }


    //
    // Initialize
    //

    function sim_prepare_svg_p ( )
    {
	    var ref_p = document.getElementById('svg_p').contentDocument ;
	    if (ref_p != null)
            {
                var o  = ref_p.getElementById('text3495');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab11').trigger('click');
						     $('#select5a').selectpicker('val', 11);
                                                  }, false);
	            o  = ref_p.getElementById('text3029');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab11').trigger('click');
						     $('#select5a').selectpicker('val', 11);
                                                  }, false);
	            o  = ref_p.getElementById('text3031');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab11').trigger('click');
						     $('#select5a').selectpicker('val', 11);
                                                  }, false);
	            o  = ref_p.getElementById('text3001');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab14').trigger('click');
						     $('#select5a').selectpicker('val', 14);
                                                  }, false);
	            o  = ref_p.getElementById('text3775');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab15').trigger('click');
						     $('#select5a').selectpicker('val', 15);
                                                  }, false);
	            o  = ref_p.getElementById('text3829');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab12').trigger('click');
						     $('#select5a').selectpicker('val', 12);
                                                  }, false);
	            o  = ref_p.getElementById('text3845');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab12').trigger('click');
						     $('#select5a').selectpicker('val', 12);
                                                  }, false);
                    o  = ref_p.getElementById('text3459-7');
                if (o != null) o.addEventListener('click',
                                                  function() {
                                                     wepsim_execute_microinstruction();
                                                  }, false);
            }
    }

    function sim_prepare_svg_cu ( )
    {
	    var ref_cu = document.getElementById('svg_cu').contentDocument ;
	    if (ref_cu != null)
            {
	        var o  = ref_cu.getElementById('text3010');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab16').trigger('click');
						     $('#select5a').selectpicker('val', 16);
                                                  }, false);
                    o  = ref_cu.getElementById('text4138');
                if (o != null) o.addEventListener('click',
                                                  function() {
                                                     wepsim_execute_microinstruction();
                                                  }, false);
                    o  = ref_cu.getElementById('text4138-7');
                if (o != null) o.addEventListener('click',
                                                  function() {
                                                     wepsim_execute_microinstruction();
                                                  }, false);
            }
    }

    function sim_prepare_editor ( editor )
    {
	    editor.setValue("\n\n\n\n\n\n\n\n\n\n");
	    editor.getWrapperElement().style['text-shadow'] = '0.0em 0.0em';

	    if (get_cfg('editor_theme') == 'blackboard') {
		editor.getWrapperElement().style['font-weight'] = 'normal';
		editor.setOption('theme','blackboard');
	    }

	    var edt_mode = get_cfg('editor_mode');
	    if (edt_mode == 'vim')
		editor.setOption('keyMap','vim');
	    if (edt_mode == 'emacs')
		editor.setOption('keyMap','emacs');
	    if (edt_mode == 'sublime')
		editor.setOption('keyMap','sublime');

	    setTimeout(function(){editor.refresh();}, 100);
    }

