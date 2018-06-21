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
     * Initialize
     */

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

	sim_core_reset();
        return true;
    }

    function wepsim_compile_firmware ( textToMCompile )
    {
	var ret = sim_core_compile_firmware(textToMCompile) ;
	if (false == ret.ok)
        {
            showError(ret.msg, "inputfirm") ;
            return false;
        }

        // update UI
        wepsim_notify_success('<strong>INFO</strong>', 
                              'Microcode was compiled and loaded.') ;

	sim_core_reset() ;
        return true;
    }


    /*
     * UI elements
     */

    // Notifications

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

    // Error dialog

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


    // Show binaries

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

    // Misc.

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

