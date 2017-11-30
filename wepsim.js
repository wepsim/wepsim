/*
 *  Copyright 2015-2017 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
     * File/URL
     */

    function wepsim_load_from_file ( fileToLoad, inputEditor )
    {
        var fileReader = new FileReader();
        fileReader.onload  = function (fileLoadedEvent) {
                                            var textFromFileLoaded = fileLoadedEvent.target.result;
                                            if (null != inputEditor)
					        inputEditor.setValue(textFromFileLoaded);
                             };
	fileReader.onerror = function(e) {
			        console.error("File could not be read! Code " + e.target.error.code);
			     };
        fileReader.readAsText(fileToLoad, "UTF-8");
    }

    function wepsim_save_to_file ( inputEditor, fileNameToSaveAs )
    {
            var textToWrite = inputEditor.getValue();
            var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });

            var downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            if (window.webkitURL != null) {
                // Chrome allows the link to be clicked
                // without actually adding it to the DOM.
                downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            }
            else {
                // Firefox requires the link to be added to the DOM
                // before it can be clicked.
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = function ( event ) {
                                            document.body.removeChild(event.target);
                                       };
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
            }

            downloadLink.click();
    }

    function wepsim_load_from_url ( url, do_next )
    {
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange=function() {
	     // if ((xmlhttp.readyState == 4) &&  (xmlhttp.status == 200))
		if ((xmlhttp.readyState == 4) && ((xmlhttp.status == 200) || (xmlhttp.status == 0)))
		{
		    var textFromFileLoaded = xmlhttp.responseText ;
                    if (null != do_next)
                        do_next(textFromFileLoaded);
		}
	}

	xmlhttp.open("GET", url, true);
	xmlhttp.send();
    }

    /*
     * Microcompile and compile
     */

    function wepsim_compile_assembly ( textToCompile, with_ui )
    {
        // get SIMWARE.firmware
        var SIMWARE = get_simware() ;
	if (SIMWARE.firmware.length == 0)
        {
            if (with_ui) {
                alert('WARNING: please load the microcode first.');
                $.mobile.pageContainer.pagecontainer('change','#main3');
            }
            return false;
	}

        // compile Assembly and show message
        var SIMWAREaddon = simlang_compile(textToCompile, SIMWARE);
        if (SIMWAREaddon.error != null)
        {
            if (with_ui)
                showError(SIMWAREaddon.error, "inputasm") ;

            return false;
        }

        if (with_ui) {
            wepsim_notify_success('<strong>INFO</strong>', 'Assembly was compiled and loaded.') ;
	}

        // update memory and segments
        set_simware(SIMWAREaddon) ;
	update_memories(SIMWARE);

        // update UI
        if (with_ui) {
            $("#asm_debugger").html(assembly2html(SIMWAREaddon.mp,
                                                  SIMWAREaddon.labels2,
                                                  SIMWAREaddon.seg,
                                                  SIMWAREaddon.assembly));
            showhideAsmElements();
        }

	reset();

        return true;
    }

    function wepsim_compile_firmware ( textToMCompile, with_ui )
    {
	var preSM = load_firmware(textToMCompile) ;
	if (preSM.error != null)
        {
            if (with_ui)
                showError(preSM.error, "inputfirm") ;
            return false;
        }

        if (with_ui) {
            wepsim_notify_success('<strong>INFO</strong>', 'Microcode was compiled and loaded.') ;
        }

        // update UI
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
	$(popup_id).popup('open');

	setTimeout(function(){
			var SIMWARE = get_simware() ;

			$(popup_content_id).html(mp2html(SIMWARE.mp, SIMWARE.labels2, SIMWARE.seg));
			$(popup_id).popup("reposition", {positionTo: 'window'});

			for (skey in SIMWARE.seg) {
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
	$(popup_id).popup('open');

	setTimeout(function() {
			var SIMWARE = get_simware() ;
			$(popup_content_id).html(firmware2html(SIMWARE.firmware, true));
			$(popup_content_id).css({width:"inherit !important", height:"inherit !important"});

			$(popup_id).enhanceWithin();
			$(popup_id).trigger('updatelayout');
			$(popup_id).popup("reposition", {positionTo: 'window'});
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
	if (check_if_can_execute(true) == false)
	    return false;

        var clklimit = get_cfg('DBG_limitick') ;

	return execute_microprogram(clklimit) ;
    }

    function wepsim_execute_microinstruction ( )
    {
	if (check_if_can_execute(true) == false)
	    return false;

	return execute_microinstruction() ;
    }

    function wepsim_execute_set_breakpoint ( addr )
    {
        return asmdbg_set_breakpoint(addr) ;
    }

    var DBG_stop  = true ;

    function wepsim_execute_stop ( btn1 )
    {
	$(btn1).html("<br>Run") ;
	$(btn1).removeClass("ui-icon-minus") ;
	$(btn1).addClass("ui-icon-carat-r") ;
	$(btn1).css("backgroundColor", "#CCCCCC") ;

	DBG_stop = true;
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
            wepsim_execute_play(btn1,run_notifications) ;
        }
    }


    /*
     * Help
     */

    function wepsim_help_refresh ( )
    {
        var rel = $('#help1_ref').data('relative') ;
        if ( (typeof rel != "undefined") && (rel != "") )
        {
            $('#iframe_help1').load('help/simulator-' + get_cfg('ws_idiom') + '.html ' + rel,
	    		            function() {
                                        $('#help1').trigger('updatelayout');
                                        $('#help1').modal('show');
                                    });

            ga('send', 'event', 'help', 'help.simulator', 'help.simulator.' + rel);
            return ;
        }

        var ab1 = $('#help1_ref').data('absolute') ;
        if ( (typeof ab1 != "undefined") && (ab1 != "") )
        {
            $('#iframe_help1').load('help/' + ab1 + '-' + get_cfg('ws_idiom') + '.html',
	    		            function() {
                                        $('#help1').trigger('updatelayout');
                                        $('#help1').modal('show');
                                    });

            ga('send', 'event', 'help', 'help.' + ab1, 'help.' + ab1 + '.*');
            return ;
        }

        var cod1 = $('#help1_ref').data('code') ;
        if ( (typeof cod1 != "undefined") && (cod1 == "true") )
        {
            ga('send', 'event', 'help', 'help.code', 'help.code.*');
            return ;
        }

        wepsim_open_help_index() ;
    }

    function wepsim_open_help_index ( )
    {
        var help_xx = help[get_cfg('ws_idiom')] ;

	$('#iframe_help1').html(table_helps_html(help_xx)) ;
	$('#iframe_help1').enhanceWithin() ;

	$('#help1_ref').data('relative','') ;
	$('#help1_ref').data('absolute','') ;
	$('#help1_ref').data('code','false') ;

	$('#help1').trigger('updatelayout') ;
	$('#help1').modal('show') ;
    }

    function wepsim_open_help_content ( content )
    {
        $('#iframe_help1').html(content) ;
        $('#iframe_help1').enhanceWithin() ;

        $('#help1_ref').data('relative', '') ;
	$('#help1_ref').data('absolute', '') ;
	$('#help1_ref').data('code','true') ;

        $('#help1').trigger('updatelayout') ;
        $('#help1').modal('show') ;
    }

    function wepsim_close_help ( )
    {
	$('#help1').modal('hide') ;
    }

    function wepsim_help_set_relative ( rel )
    {
        $('#help1_ref').data('relative', rel) ;
	$('#help1_ref').data('absolute','') ;
	$('#help1_ref').data('code','false') ;
    }

    function wepsim_help_set_absolute ( ab1 )
    {
        $('#help1_ref').data('relative','') ;
        $('#help1_ref').data('absolute', ab1) ;
	$('#help1_ref').data('code','false') ;
    }


    /*
     * Examples
     */

    function wepsim_open_examples_index ( )
    {
        $("#container-example1").html(table_examples_html(examples));
        $("#container-example1").enhanceWithin();
	$('#example1').trigger('updatelayout') ;
	$('#example1').modal('show') ;
    }

    function wepsim_close_examples ( )
    {
	$('#example1').modal('hide') ;
    }


    //
    // Auxiliar functions
    //

    function wepsim_notify_success ( ntf_title, ntf_message )
    {
	 return $.notify({ title: ntf_title, message: ntf_message },
	  	         { type: 'success',
                           z_index: 2000,
                           newest_on_top: true,
                           delay: get_cfg('NOTIF_delay'),
                           timer: 100,
                           placement: { from: 'top', align: 'center' } });
    }


    /*
     * Play/stop
     */

    function wepsim_check_stopbybreakpoint_firm ( )
    {
        var reg_maddr = get_value(sim_states["REG_MICROADDR"]) ;
        if (false == MC_dashboard[reg_maddr].breakpoint)
            return false ;

	var curr_addr = "0x" + reg_maddr.toString(16) ;

	var dialog_title = "Breakpoint @ " + curr_addr + ":<br>" +
	                   "Microinstruction is going to be issue." ;
        $("#dlg_title2").html(dialog_title) ;
        $('#current_state2').modal('show');

	return true ;
    }

    function wepsim_check_stopbybreakpoint_asm ( )
    {
	var reg_pc    = get_value(sim_states["REG_PC"]) ;
	var curr_addr = "0x" + reg_pc.toString(16) ;

	if (typeof FIRMWARE.assembly[curr_addr] == "undefined")
            return false ;

	if (false == FIRMWARE.assembly[curr_addr].breakpoint)
            return false ;

	var dialog_title = "Breakpoint @ " + curr_addr + ":<br>" +
	                   "Instruction is going to be fetched." ;
        $("#dlg_title2").html(dialog_title) ;
        $('#current_state2').modal('show');

	return true ;
    }

    function wepsim_check_state_firm ( )
    {
        var reg_maddr = get_value(sim_states["REG_MICROADDR"]) ;
        if (false == MC_dashboard[reg_maddr].state)
            return false ;

        wepsim_state_history_add() ;
	return true ;
    }

    function wepsim_execute_chunk ( btn1, chunk )
    {
	var ret = false ;

	var playlevel = get_cfg('DBG_level') ;
	if (playlevel == "instruction")  
	{
            var clklimit  = get_cfg('DBG_limitick') ;
            for (var i=0; i<chunk; i++)
            {
		    ret = execute_microprogram(clklimit) ;
		    if (ret === false) {
			wepsim_execute_stop(btn1) ;
			return false ;
		    }

		    ret = wepsim_check_stopbybreakpoint_asm() ;
		    if (true == ret) {
			wepsim_execute_stop(btn1) ;
			return false ;
		    }
            }
	}
	else
	{
            for (var i=0; i<chunk; i++)
            {
		    wepsim_check_state_firm() ;

		    ret = execute_microinstruction() ;
		    if (ret === false) {
			wepsim_execute_stop(btn1) ;
			return false ;
		    }

		    ret = wepsim_check_stopbybreakpoint_firm() ;
		    if (true == ret) {
			wepsim_execute_stop(btn1) ;
			return false ;
		    }

                    var reg_maddr = get_value(sim_states["REG_MICROADDR"]) ;
                    if (0 == reg_maddr) 
                    {
		        ret = wepsim_check_stopbybreakpoint_asm() ;
		        if (true == ret) {
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
	if (DBG_stop) {
	    wepsim_execute_stop(btn1) ;
	    return ;
	}

        var turbo = 1;
	if (get_cfg('DBG_delay') < 5)
            turbo = max_turbo ;
        if (max_turbo == 5) 
            var t0 = performance.now() ;

        var ret = wepsim_execute_chunk(btn1, turbo) ;
        if (false == ret)
            return ;

        if (max_turbo == 5) 
            var t1 = performance.now() ;
        if (max_turbo == 5) 
            max_turbo = 3000/(t1-t0) ;

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
		if (ret === false) 
                {
		    wepsim_execute_stop(btn1) ;
		    return ;
		}

		var reg_maddr = get_value(sim_states["REG_MICROADDR"]) ;
		var notifications = MC_dashboard[reg_maddr].notify.length ;
		if (notifications > 1) 
                {
		    var dialog_title = "Notify @ " + reg_maddr + ": " + MC_dashboard[reg_maddr].notify[1] ;

		    var dialog_msg = "" ;
		    for (var i=1; i<notifications; i++) {
			 dialog_msg += MC_dashboard[reg_maddr].notify[i] + "\n<br>" ;
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
                           '        onclick="$.notifyClose();' +
                           '                      var marked = ' + editor + '.addLineClass(' + (pos-1) + ', \'background\', \'CodeMirror-selected\');' +
                           '                 setTimeout(function() { ' + editor + '.removeLineClass(marked, \'background\', \'CodeMirror-selected\'); }, 3000);' +
		           '		     var t = ' + editor + '.charCoords({line: ' + pos + ', ch: 0}, \'local\').top;' +
		           '		     var middleHeight = ' + editor + '.getScrollerElement().offsetHeight / 2;' +
		           '		     ' + editor + '.scrollTo(null, t - middleHeight - 5);">Go line ' + pos + '</button>&nbsp;' ;
            }

	    $.notify({ title: '<strong>ERROR</strong>',
                       message: errorMsg + '<br>' +
                                '<center>' +
                                lineMsg +
                                '<button type="button" class="btn btn-danger" onclick="$.notifyClose();">Close</button>' +
                                '</center>' },
		     { type: 'danger',
                       z_index: 2000,
                       newest_on_top: true,
                       delay: 0,
                       placement: { from: 'top', align: 'center' }
                     });
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


    /*
     * Copy to clipboard
     */

    var clipboard_copy = '' ;

    function get_clipboard_copy ( ) 
    {
        return clipboard_copy ;
    }

    // credit for the SelectText function: 
    // https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
    function SelectText (element) 
    {
        var doc = document
            , text = doc.getElementById(element)
            , range, selection
        ;    
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();        
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    function CopyFromDiv ( element_name )
    {
	    var msg = 'successful' ;

	    try {
                 SelectText(element_name) ;
                 document.execCommand('copy') ;
		 clipboard_copy = $('#' + element_name).text() ;
	    } 
            catch (err) {
		 msg = 'unsuccessful' ;
	    }

	    wepsim_notify_success('<strong>INFO</strong>', 'Copied ' + msg + '!.') ;
    }

    function CopyFromTextarea ( element_name )
    {
	    var msg = 'successful' ;

	    try {
		 var copyTextarea = document.getElementById(element_name);
		 copyTextarea.select();
                 document.execCommand('copy') ;
		 clipboard_copy = $('#' + element_name).val() ;
	    } 
            catch (err) {
		 msg = 'unsuccessful' ;
	    }

	    wepsim_notify_success('<strong>INFO</strong>', 'Copied ' + msg + '!.') ;
    }


    /*
     * Check state
     */

    var state_history = new Array() ;

    function wepsim_state_history_reset ( )
    {
        state_history = new Array() ;
    }

    function wepsim_state_history_add ( )
    {
        var reg_maddr = get_value(sim_states["REG_MICROADDR"]) ;
        var reg_clk   = get_value(sim_states["CLK"]) ;
        var state_obj = wepsim_current2state() ;
        var state_str = wepsim_state2checklist(state_obj) ;
        var timestamp = new Date().getTime() ;

        state_history.push({ time: timestamp,
                             title: 'clock ' + reg_clk + ' @ micro-address ' + reg_maddr,
                             content: state_str }) ;
    }

    function wepsim_state_history_list ( )
    {
         if (0 == state_history.length) 
         {
             $('#history1').html('&emsp;<span style="background-color:#FCFC00">Empty.</span>') ;
	     $('#check_results1').html('');
             return ;
         }

         var t = 0 ;
         var o = '<div class="panel-group" id="accordion1">' ;
         for (var i=state_history.length-1; i>=0; i--) 
         {
              t = new Date(state_history[i].time) ;

              o += '<div class="panel panel-default">' +
                   '  <div class="panel-heading" data-toggle="collapse" data-target="#collapse_'+i+'" data-parent="#accordion1">' +
                   '    <h4 class="panel-title">' +
                   '      <span>[' +
                            t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + '_' +
                            t.getHours()    + '-' + t.getMinutes()   + '-' + t.getSeconds() + '_' + 
                            t.getMilliseconds() + '] ' + state_history[i].title +
                   '      </span>' +
                   '    </h4>' +
                   '  </div>' +
                   '  <div id="collapse_' + i + '" class="panel-collapse collapse">' +
                   '    <div class="panel-body">' + 
                   '      <div class="container-fluid">' + 
                   '      <div class="row">' + 
                   '      <button class="btn btn-default btn-sm col-xs-4 col-sm-3 pull-right"' + 
                   '              onclick="CopyFromTextarea(\'ta_state_' + i + '\');" ' + 
                   '              type="button">Copy <span class="hidden-xs">to clipboard</span></button>' +
                   '      <button class="btn btn-default btn-sm col-xs-4 col-sm-3 pull-right"' + 
                   '              onclick="var txt_chklst1 = get_clipboard_copy();' +
                   '                       var obj_exp1    = wepsim_checklist2state(txt_chklst1);' +
                   '                       var txt_chklst2 = $(\'#ta_state_'+i+'\').val();' +
                   '                       var obj_exp2    = wepsim_checklist2state(txt_chklst2);' +
                   '                       wepsim_dialog_check_state(\'check_results1\', obj_exp1, obj_exp2);"' +
                   '           type="button">Check <span class="hidden-xs">differences with clipboard state</span></button>' +
                   '      </div>' + 
                   '      </div>' + 
                   '      <div class="panel-body" ' + 
                   '           style="padding:5 5 5 5;" ' + 
                   '           id="state_' + i + '">' + state_history[i].content + '</div>' +
                   '      <textarea aria-label="hidden-state"  style="display:none"' +
                   '                id="ta_state_'+i+'" readonly>' + state_history[i].content + '</textarea>' +
                   '    </div>' +
                   '  </div>' +
                   '</div>' ;
         }
         o += '</div>' ;

         $('#history1').html(o) ;
	 $('#check_results1').html('');
    }

    function wepsim_dialog_current_state ( )
    {
         // show dialog
         wepsim_notify_success('<strong>INFO</strong>', 'Loading, please wait...') ;
         $('#current_state1').modal('show');

	 setTimeout(function() {

	      // tab1
	      //wepsim_state_history_list() ; // called on: reset+add but not on show...

	      // tab2
	      var state_obj     = wepsim_current2state() ;
	      var txt_checklist = wepsim_state2checklist(state_obj) ;
	      $('#end_state1').tokenfield('setTokens', txt_checklist);

              $.notifyClose() ;
              wepsim_notify_success('<strong>INFO</strong>', 'Current state loaded !') ;

              // ga
	      var neltos  = 0 ;
	      var nceltos = 0 ;
	      var ga_str  = "" ;
              for (var component in state_obj) 
	      {
	           nceltos = 0 ;
	           for (var eltos in state_obj[component]) {
	                nceltos++ ;
	           }
	           ga_str = ga_str + "," + component + "=" + nceltos ;
                   neltos = neltos + nceltos ;
	      }
              ga('send', 'event', 'state', 
	         'state.dump', 
	         'state.dump' + '.ci=' + get_value(sim_states['REG_IR_DECO']) +
		                ',neltos=' + neltos + 
		                ga_str);

         }, 80) ;
    }

    function wepsim_dialog_check_state ( id_result, obj_chklst_expected, obj_chklst_current )
    {
        var obj_result = wepsim_diff_results(obj_chklst_expected, obj_chklst_current) ;

        // dialog
        if (0 == obj_result.errors)
    	     var msg = "&emsp;<span style='background-color:#7CFC00'>" + 
                       "Meets the specified requirements" + 
                       "</span><br>" ;
        else var msg = wepsim_checkreport2html(obj_result.result, true) ;

        $('#' + id_result).html(msg);

        // ga
        ga('send', 'event', 'state', 
	   'state.check', 
	   'state.check' + ',ci=' + get_value(sim_states['REG_IR_DECO']) +
		           '.a='  + obj_result.neltos_expected +
		           ',b='  + obj_result.neltos_obtained +
		           ',sd=' + obj_result.errors);

	return true ;
    }

    function wepsim_dialog_check_reset ( id_result, id_input )
    {
        $('#' + id_input).tokenfield('setTokens', []);
	$('#' + id_input).val('');
	$('#' + id_result).html('');

	return true ;
    }


    /*
     * Example management
     */

    function getURLTimeStamp ( )
    {
        var dateObj = new Date();
        var year    = dateObj.getUTCFullYear();
        var month   = dateObj.getUTCMonth() + 1;
        var day     = dateObj.getUTCDate();
        var hour    = dateObj.getUTCHours();
        var minutes = dateObj.getUTCMinutes();

        return year + month + day + hour + minutes ;
    }

    function load_from_example_assembly ( example_id, chain_next_step )
    {
	$.mobile.pageContainer.pagecontainer('change', '#main4');
	inputasm.setValue("Please wait...");
	inputasm.refresh();

	var url     = "examples/exampleCode" + example_id + ".txt?time=" + getURLTimeStamp() ;
        var do_next = function( mcode ) {
			    inputasm.setValue(mcode);
			    inputasm.refresh();

                            var ok = false ;
                            var SIMWARE = get_simware() ;
	                    if (SIMWARE.firmware.length != 0)
                                ok = wepsim_compile_assembly(mcode, true);

			    if (true == ok)
			    {
                                if (true == chain_next_step)
				    setTimeout(function(){
					          $.mobile.pageContainer.pagecontainer('change', '#main1');
                                                  show_memories_values();
				               }, 50);
			    }

                            wepsim_notify_success('<strong>INFO</strong>', 'Example ready to be used.') ;
                      };
        wepsim_load_from_url(url, do_next) ;

        ga('send', 'event', 'example', 'example.assembly', 'example.assembly.' + example_id);
    }

    function load_from_example_firmware ( example_id, chain_next_step )
    {
	$.mobile.pageContainer.pagecontainer('change', '#main3');
	inputfirm.setValue("Please wait...");
	inputfirm.refresh();

	var mode = get_cfg('ws_mode');
	if ('webmips' == mode) {
	    var url = "examples/exampleMicrocodeMIPS.txt?time=" + getURLTimeStamp() ;
	    inputfirm.setOption('readOnly', true);
        }
	else {
	    var url = "examples/exampleMicrocode" + example_id + ".txt?time=" + getURLTimeStamp() ;
	    inputfirm.setOption('readOnly', false);
	}

        var do_next = function( mcode ) {
			   inputfirm.setValue(mcode);
			   inputfirm.refresh();

			   var ok = wepsim_compile_firmware(mcode, true);
                           if (true == ok)
                           {
                                  if (true == chain_next_step)
                                       setTimeout(function() {
                                                     load_from_example_assembly(example_id, chain_next_step);
                                                  }, 50);
                                  else show_memories_values();
                           }

                           wepsim_notify_success('<strong>INFO</strong>', 'Example ready to be used.') ;
                      };
        wepsim_load_from_url(url, do_next) ;

        ga('send', 'event', 'example', 'example.firmware', 'example.firmware.' + example_id);
    }

    function table_examples_html ( examples )
    {
       var o = '<div class="table-responsive">' +
               '<table width=100% class="table table-striped table-hover table-condensed">' +
               '<thead>' +
               '<tr>' +
               '  <th>#</th>' +
               '  <th onclick="$(\'.collapse1\').collapse(\'toggle\');">level</th>' +
               '  <th>load...</th>' +
               '  <th onclick="$(\'.collapse3\').collapse(\'toggle\');">description</th>' +
               '  <th onclick="$(\'.collapse4\').collapse(\'toggle\');">load only...</th>' +
               '</tr>' +
               '</thead>' +
               '<tbody>';
       for (var m=0; m<examples.length; m++)
       {
	       var e_title       = examples[m]['title'] ;
	       var e_level       = examples[m]['level'] ;
	       var e_description = examples[m]['description'] ;
	       var e_id          = examples[m]['id'] ;

	       o = o + ' <tr>' +
		       ' <td>' + '<b>' + (m+1)   + '</b>' + '</td>' +
		       ' <td>' + '<b    class="collapse1 collapse in">' + e_level + '</b>' + '</td>' +
		       ' <td>' + 
		       '   <a href="#" onclick="$(\'#example1\').modal(\'hide\'); load_from_example_firmware(\'' + e_id + '\',true);"  style="padding:0 0 0 0;"' +
		       '      class="ui-btn btn btn-group ui-btn-inline btn-primary">' + 
                       '   <b class="collapse2 collapse in">' + e_title + '</b></a>' +
                       ' </td>' +
		       ' <td>' + '<span class="collapse3 collapse in">' + e_description + '</span>' + '</td>' +
		       ' <td class="collapse4 collapse in" style="min-width:150px; max-width:200px">' +
		       '     <div class="btn-group btn-group-justified btn-group-md">' +
		       '         <a href="#" onclick="$(\'#example1\').modal(\'hide\'); load_from_example_assembly(\'' + e_id + '\',false);"  style="padding:0 0 0 0;"' +
		       '            class="ui-btn btn btn-group ui-btn-inline btn-default">' +
		       '            <b>Assembly</b></a>' +
		       '         <a href="#" onclick="$(\'#example1\').modal(\'hide\'); load_from_example_firmware(\'' + e_id + '\',false);" style="padding:0 0 0 0;"' +
		       '            class="ui-btn btn btn-group ui-btn-inline btn-default">' +
		       '            <b>Firmware</b></a>' +
		       '     </div>' +
		       ' </td>' +
		       ' </tr>' ;
       }
       o = o + '</tbody>' +
               '</table>' +
               '</div>' ;

       return o ;
    }

    /*
     * Help management
     */

    function table_helps_html ( helps )
    {
       var o = '<div class="table-responsive">' +
               '<table width=100% class="table table-striped table-hover table-condensed">' +
               '<thead>' +
               '<tr>' +
               '  <th>#</th>' +
               '  <th>title</th>' +
               '  <th onclick="$(\'.collapse2\').collapse(\'toggle\');">description</th>' +
               '</tr>' +
               '</thead>' +
               '<tbody>';
       for (var m=0; m<helps.length; m++)
       {
	       var e_title       = helps[m]['title'] ;
	       var e_type        = helps[m]['type'] ;
	       var e_reference   = helps[m]['reference'] ;
	       var e_description = helps[m]['description'] ;
	       var e_id          = helps[m]['id'] ;

               var onclick_code = "" ;
               if ("relative" == e_type) 
                   onclick_code = 'wepsim_help_set_relative(\'' + e_reference + '\');' + 
                                  'wepsim_help_refresh();' ;
               if ("absolute" == e_type) 
                   onclick_code = 'wepsim_help_set_absolute(\'' + e_reference + '\');' + 
                                  'wepsim_help_refresh();' ;
               if ("code" == e_type) 
                   onclick_code = e_reference ;

	       o = o + '<tr>' +
		       '<td>' + '<b>' + (m+1) + '</b>' + '</td>' +
		       ' <td>' + 
                       '  <a href="#" ' +
                       '     class="ui-btn btn btn-group ui-btn-inline" ' +
                       '     style="background-color: #D4DB17; padding:0 0 0 0;" ' +
		       '     onclick="' + onclick_code + '"><b>' + e_title + '</b></a>' +
                       ' </td>' +
		       ' <td class="collapse2 collapse in">' +
		       '   <c>' + e_description + '</c>' + 
                       ' </td>' +
		       '</tr>' ;
       }
       o = o + '</tbody>' +
               '</table>' +
               '</div>' ;

       return o ;
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
	        var o  = ref_p.getElementById('text3029');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab11').trigger('click');
						     $('#select5a').selectpicker('val', 11);
                                                  }, false);
	        var o  = ref_p.getElementById('text3031');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab11').trigger('click');
						     $('#select5a').selectpicker('val', 11);
                                                  }, false);
	        var o  = ref_p.getElementById('text3001');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab14').trigger('click');
						     $('#select5a').selectpicker('val', 14);
                                                  }, false);
	        var o  = ref_p.getElementById('text3775');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab15').trigger('click');
						     $('#select5a').selectpicker('val', 15);
                                                  }, false);
	        var o  = ref_p.getElementById('text3829');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab12').trigger('click');
						     $('#select5a').selectpicker('val', 12);
                                                  }, false);
	        var o  = ref_p.getElementById('text3845');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     $('#tab12').trigger('click');
						     $('#select5a').selectpicker('val', 12);
                                                  }, false);
                var o  = ref_p.getElementById('text3459-7');
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
                var o  = ref_cu.getElementById('text4138');
                if (o != null) o.addEventListener('click',
                                                  function() {
                                                     wepsim_execute_microinstruction();
                                                  }, false);
                var o  = ref_cu.getElementById('text4138-7');
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

    //
    // Tutorials
    //

    function sim_tutorial_showframe ( tutorial_name, step )
    {
        // 0.- get reference
        if (typeof tutorials[tutorial_name] == "undefined")
            return ;
        var tutorial = tutorials[tutorial_name][get_cfg('ws_idiom')] ;
        if (typeof tutorial == "undefined")
            return ;

        // 1.- check if
	if (step == tutorial.length)
	    return ;
	if (step < 0) 
	    return ;

        ga('send', 'event', 'help', 'help.tutorial', 'help.tutorial.name=' + tutorial_name + ',step=' + step);

        // 2.- code_pre
        tutorial[step].code_pre();
        if (wepsim_voice_canSpeak())
        {
	    tut_msg1 = new SpeechSynthesisUtterance(tutorial[step].title.replace(/<[^>]*>/g, '') + ". " + 
		                                    tutorial[step].message.replace(/<[^>]*>/g, ''));
	    tut_msg1.lang = 'en-US';
        }

        // 3.- dialog +
        //     code_post (next button) | cancel tutorials
        var bbbt = new Object() ;

	if (step != (tutorial.length - 1))
            bbbt["next"] = {
		    label: 'Next',
		    className: 'btn-success col-xs-3 col-sm-2 pull-right',
		    callback: function() {
			tutorial[step].code_post() ;
			setTimeout(function(){ 
					sim_tutorial_showframe(tutorial_name, step + 1) ;
				   }, tutorial[step].wait_next);
                        if (wepsim_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		};
	else
            bbbt["end"] = {
		    label: 'End',
		    className: 'btn-success col-xs-3 col-sm-2 pull-right',
		    callback: function() {
			tutorial[step].code_post() ;
			setTimeout(function(){ 
					sim_tutorial_showframe(tutorial_name, step + 1) ;
				   }, tutorial[step].wait_next);
                        if (wepsim_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		};

        if (step != 0)
            bbbt["prev"] = {
		    label: 'Prev',
		    className: 'btn-success col-xs-3 col-sm-2 pull-right',
		    callback: function() {
			tutorial[step].code_post() ;
			setTimeout(function(){ 
					sim_tutorial_showframe(tutorial_name, step - 1) ;
				   }, tutorial[step].wait_next);
                        if (wepsim_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		};

        bbbt["cancel"] = {
		    label: 'Disable this tutorial',
		    className: 'btn-danger col-xs-4 col-sm-3 pull-right',
		    callback: function() {
			set_cfg('ws_mode', 'wepsim') ;
                        save_cfg();
			$("#select4").val('wepsim').selectmenu("refresh");
                        tutbox.modal("hide") ;
                        if (wepsim_voice_canSpeak())
			    window.speechSynthesis.cancel() ;
		    }
		} ;

	tutbox = bootbox.dialog({
	    title:   tutorial[step].title,
	    message: tutorial[step].message,
	    buttons: bbbt,
            animate: false
	});

        if (wepsim_voice_canSpeak())
	    window.speechSynthesis.speak(tut_msg1);
    }


    //
    //  WepSIM check API
    //

    function wepsim_checklist2state ( checklist )
    {
        var o = new Object() ;
	var ret = false ;

	// white-spaces...
	checklist = checklist.replace(/;|==|!=|>=|<=|=|>|</gi, 
                                      function (x){return ' ' + x + ' ';});  
        checklist = checklist.replace(/  /g,' ') ;

	// lines...
        var lines = checklist.split(";") ;
        for (var i=0; i<lines.length; i++)
        {
             var line = lines[i].trim() ;
	     if ("" == line)
		 continue ;

             var parts = line.split(" ") ;
	     if (parts.length < 4)
		 continue ;

	     var check = { "type": parts[0], 
                           "id": parts[1], 
                           "condition": parts[2], 
                           "value": decodeURI(parts[3]) } ;
             for (var index in sim_components) 
             {
	          ret = sim_components[index].read_state(o, check) ;
                  if (true == ret) break ;
             }

             if (false == ret)
                 console.log("ERROR in checklist at component " + check.type + ": " + line) ;
        }

        return o ;
    }   

    function wepsim_current2state ( )
    {
	var o = new Object() ;
	for (var index in sim_components) {
	     sim_components[index].write_state(o) ;
	}

        return o ;
    }

    function wepsim_state2checklist ( s_obj )
    {
	var ret = "" ;
        for (var component in s_obj) 
	{
	     for (var eltos in s_obj[component]) {
		  var elto = s_obj[component][eltos] ;
	          ret = ret + elto.type + " " + elto.id + " " + elto.op + " " + encodeURI(elto.value) + "; " ;
	     }
	}

        return ret ;
    }

    function wepsim_diff_results ( expected_result, obtained_result )
    {
        var d = new Object() ;
        d.result = new Array() ;
        d.errors = 0 ;
        d.neltos_expected = 0 ;
        d.neltos_obtained = 0 ;

        var obtained_value = 0 ;
	for (var compo in sim_components)
	{
	    // if there are different values -> diff
            if (typeof expected_result[compo] != "undefined") 
	    {
		    for (var elto in expected_result[compo])
		    {
                         d.neltos_expected++ ;

                         obtained_value = expected_result[compo][elto].default_value ;
			 if ( (typeof obtained_result[compo]       != "undefined") &&
			      (typeof obtained_result[compo][elto] != "undefined") ) {
                               obtained_value = obtained_result[compo][elto].value ;
                         }

			 var diff = new Object() ;
			 diff.expected  = expected_result[compo][elto].value ;
			 diff.obtained  = obtained_value ;
			 diff.elto_type = compo.toLowerCase() ;
			 diff.elto_id   = expected_result[compo][elto].id ;
			 diff.elto_op   = expected_result[compo][elto].op ;

		         diff.fulfill   = false ;
			      if ("=" == expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained) == parseInt(diff.expected)) ;
			 else if (">" == expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained)  > parseInt(diff.expected)) ;
			 else if ("<" == expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained)  < parseInt(diff.expected)) ;
			 else if (">=" == expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained) >= parseInt(diff.expected)) ;
			 else if ("<=" == expected_result[compo][elto].op)
			          diff.fulfill = (parseInt(diff.obtained) <= parseInt(diff.expected)) ;
			 else if ("==" == expected_result[compo][elto].op)
			          diff.fulfill = (diff.expected == diff.obtained) ;
			 else if ("!=" == expected_result[compo][elto].op)
			          diff.fulfill = (diff.expected != diff.obtained) ;

			 d.result.push(diff) ;

			 if (diff.fulfill === false)
			     d.errors++ ;
		    }
            }

	    // if there are new elements -> diff
	    if (typeof obtained_result[compo] != "undefined")
	    {
		    for (var elto in obtained_result[compo]) 
		    {
                         d.neltos_obtained++ ;

			 if ( (typeof expected_result[compo]       != "undefined") && 
			      (typeof expected_result[compo][elto] != "undefined") ) {
			       continue ;
		         }

			 var diff = new Object() ;
			 diff.expected  = obtained_result[compo][elto].default_value ;
			 diff.obtained  = obtained_result[compo][elto].value ;
			 diff.fulfill   = (diff.expected == diff.obtained) ;
			 diff.elto_type = compo.toLowerCase() ;
			 diff.elto_id   = obtained_result[compo][elto].id ;
			 diff.elto_op   = "=" ;
			 d.result.push(diff) ;

			 if (diff.fulfill === false)
			     d.errors++ ;
		    }
	    }
        }

        return d ;
    }

    function wepsim_checkreport2txt ( checklist )
    {
        var o = "";

        for (var i=0; i<checklist.length; i++)
        {
             if (checklist[i].fulfill === false) {
                 o += checklist[i].elto_type + "[" + checklist[i].elto_id + "]='" +
                      checklist[i].obtained + "' (expected '" + checklist[i].expected  + "'), ";
             }
        }

        return o;
    }

    function wepsim_checkreport2html ( checklist, only_errors )
    {
        var o = "" ;
        var color = "green" ;

        if (typeof only_errors === 'undefined') 
            only_errors = false ;

        o += "<table style='margin:0 0 0 0;' " + 
             "       class='table table-hover table-bordered table-condensed'>" +
             "<thead>" +
             "<tr>" +
             "<th>Type</th>" +
             "<th><span class='hidden-xs'>Identification</span><span class='visible-xs'>Id.</span></th>" +
             "<th><span class='hidden-xs'>Values in the </span>clipboard<span class='hidden-xs'> state</th>" +
             "<th><span class='hidden-xs'>Values in the </span>selected<span class='hidden-xs'> state</th>" +
             "</tr>" +
             "</thead>" +
             "<tbody>" ;
        for (var i=0; i<checklist.length; i++)
        {
             if (checklist[i].fulfill === false)
                  color = "danger" ;
             else color = "success" ;

             if (only_errors && checklist[i].fulfill)
                 continue ;

             o += "<tr class=" + color + ">" +
                  "<td>" + checklist[i].elto_type + "</td>" +
                  "<td>" + checklist[i].elto_id   + "</td>" +
                  "<td>" + checklist[i].elto_op + "&nbsp;" + checklist[i].expected  + "</td>" +
                  "<td>" + checklist[i].obtained  + "</td>" +
                  "</tr>" ;
        }
        o += "</tbody>" + 
             "</table>" ;

        return o ;
    }


    /*
     * Voice control
     */

    function wepsim_voice_init ( )
    {
	 // check if voice is available...
         if (!annyang) 
	     return false ;

	 // setup annyang + speechkitt...
         var commands = {
               'reset':                    function() { wepsim_execute_reset(true, true); },
               'next instruction':         wepsim_execute_instruction,
               'next micro(instruction)':  wepsim_execute_microinstruction,
               'play':                     function() { wepsim_execute_play('#qbp', false); },
               'stop':                     function() { wepsim_execute_stop('#qbp'); },

               'help':                     wepsim_open_help_index,
               'examples':                 wepsim_open_examples_index,
               'configuration':            function() { $('#config1').popup('open'); },
               'close':                    function() { wepsim_close_help(); 
		                                        wepsim_close_examples(); 
		                                        $('#config1').popup('close'); }
         };
         annyang.addCommands(commands);
         annyang.addCallback('errorNetwork', 
                             function () {
	                         annyang.abort() ;
                                 alert('Sorry but some network connection is needed in order to use the voice recognition engine.');
                             });

         SpeechKITT.annyang();
         SpeechKITT.setStylesheet('external/speechkitt.css');
         SpeechKITT.vroom();

	 return true ;
    }

    function wepsim_voice_start ( )
    {
	 // check if voice is available...
         if (!annyang) 
	     return false ;

	 //annyang.resume() ;
         SpeechKITT.show();
	 return true ;
    }

    function wepsim_voice_stop ( )
    {
	 // check if voice is available...
         if (!annyang) 
	     return false ;

         SpeechKITT.hide();
	 //annyang.pause() ;
	 return true ;
    }

    function wepsim_voice_canSpeak ( )
    {
	if (typeof window.speechSynthesis == "undefined")
            return false ;

        if (false == get_cfg('use_voice'))
            return false ;

        return true ;
    }

    /*
     * Native microcode support
     */

    function wepsim_show_webmips ( )
    {
	$("#tab26").hide() ;
	$("#tab21").hide() ;
	$("#tab24").click()
    }

    function wepsim_hide_webmips ( )
    {
	$("#tab26").show() ;
	$("#tab21").show() ;
    }

    function wepsim_native_get_value ( component, elto )
    {
        if ( ("CPU" == component) || ("BR" == component) )
        {
            if (Number.isInteger(elto))
                 var index = elto ;
            else var index = parseInt(elto) ;

            if (isNaN(index))
                return (get_value(sim_states[elto]) >>> 0) ;

            return (get_value(sim_states['BR'][index]) >>> 0) ;
        }

        if ("MEMORY" == component)
        {
            return ((MP[elto]) >>> 0) ;
        }

        if ("DEVICE" == component)
        {
            var associated_state = io_hash[elto] ;
            var value = (get_value(sim_states[associated_state]) >>> 0) ;

            set_value(sim_states['BUS_AB'], elto) ;
            set_value(sim_signals['IOR'], 1) ;
            compute_behavior("FIRE IOR") ;
            value = get_value(sim_states['BUS_DB']) ;

            return value ;
        }

        if ("SCREEN" == component)
        {
            set_screen_content(value) ;
            return value ;
        }

        return false ;
    }

    function wepsim_native_set_value ( component, elto, value )
    {
        if ( ("CPU" == component) || ("BR" == component) )
        {
            if (Number.isInteger(elto))
                 var index = elto ;
            else var index = parseInt(elto) ;

            if (isNaN(index)) 
            {
                set_value(sim_states[elto], value) ;
                if ("REG_PC" == elto)
                    show_asmdbg_pc() ;
                return value ;
            }

            return set_value(sim_states['BR'][index], value) ;
        }

        if ("MEMORY" == component)
        {
            MP[elto] = value ;
            return value ;
        }

        if ("DEVICE" == component)
        {
            var associated_state = io_hash[elto] ;
            set_value(sim_states[associated_state], value) ;

            set_value(sim_states['BUS_AB'], elto) ;
            set_value(sim_states['BUS_DB'], value) ;
            set_value(sim_signals['IOW'], 1) ;
            compute_behavior("FIRE IOW") ;

            return value ;
        }

        if ("SCREEN" == component)
        {
            var screen = get_screen_content() ;
            return screen ;
        }

        return false ;
    }

    function wepsim_native_get_fields ( signature_raw )
    {
        var SIMWARE = get_simware() ;

        for (var key in SIMWARE.firmware) {
             if (SIMWARE.firmware[key]["signatureRaw"] == signature_raw) {
                 return SIMWARE.firmware[key]["fields"] ;
             }
        }
    }

    function wepsim_native_get_field_from_ir ( fields, index )
    {
        if (typeof fields[index] == "undefined")
            return false ;

        var value = get_value(sim_states["REG_IR"]) ;
        var left_shift  = (31 - parseInt(fields[index].startbit)) ;
        var right_shift =       parseInt(fields[index].stopbit) ;

        value = value <<  left_shift ;
        value = value >>> left_shift ;
        value = value >>> right_shift ;

        return value ;
    }

    function wepsim_native_deco ( )
    {
        compute_behavior('DECO') ;
    }

    function wepsim_native_go_maddr ( maddr )
    {
        set_value(sim_states["MUXA_MICROADDR"], maddr) ;
    }

    function wepsim_native_go_opcode ( )
    {
	var maddr = get_value(sim_states['ROM_MUXA']) ;
        set_value(sim_states["MUXA_MICROADDR"], maddr) ;
    }

    function wepsim_native_go_instruction ( signature_raw )
    {
        var SIMWARE = get_simware() ;

        for (var key in SIMWARE.firmware) 
        {
             if (SIMWARE.firmware[key]["signatureRaw"] == signature_raw) 
             {
                 var maddr = SIMWARE.firmware[key]["mc-start"] ;
                 set_value(sim_states["MUXA_MICROADDR"], maddr) ;
                 return ;
             }
        }
    }

