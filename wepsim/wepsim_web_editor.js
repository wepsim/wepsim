/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
     *  Editor
     */

    function sim_cfg_editor_theme ( editor )
    {
	    var theme = get_cfg('editor_theme') ;

	    editor.getWrapperElement().style['text-shadow'] = '0.0em 0.0em';
	    editor.getWrapperElement().style['font-weight'] = 'bold';

	    if (theme === 'blackboard') {
		editor.getWrapperElement().style['font-weight'] = 'normal';
	    }

	    editor.setOption('theme', theme);
    }

    function sim_cfg_editor_mode ( editor )
    {
	    var edt_mode = get_cfg('editor_mode');

	    if (edt_mode === 'vim')
		editor.setOption('keyMap','vim');
	    if (edt_mode === 'emacs')
		editor.setOption('keyMap','emacs');
	    if (edt_mode === 'sublime')
		editor.setOption('keyMap','sublime');
    }

    function sim_init_editor ( editor_id, editor_cfg )
    {
	    var editor_obj = CodeMirror.fromTextArea(document.getElementById(editor_id), editor_cfg) ;

	    editor_obj.setValue("\n\n\n\n\n\n\n\n\n\n");

            sim_cfg_editor_theme(editor_obj) ;
            sim_cfg_editor_mode(editor_obj) ;

            editor_obj.setSize("auto","auto");
            editor_obj.refresh();

	    return editor_obj ;
    }


    /*
     *  Dialogs
     */

    // Error dialog

    function goError ( editor, pos )
    {
         editor.setCursor({ line: pos-1, ch: 0 }) ;
         var marked = editor.addLineClass(pos-1, 'background', 'CodeMirror-selected') ;
         setTimeout(function(){ editor.removeLineClass(marked, 'background', 'CodeMirror-selected'); }, 3000) ;

   	 var t = editor.charCoords({line: pos, ch: 0}, 'local').top ;
   	 var middleHeight = editor.getScrollerElement().offsetHeight / 2 ;
   	 editor.scrollTo(null, t - middleHeight - 5) ;
    }

    function showError ( Msg, editor )
    {
            var errorMsg = Msg.replace(/\t/g,' ').replace(/   /g,' ');

            var pos = errorMsg.match(/Problem around line \d+/);
            var lineMsg = '' ;
            if (null !== pos) {
                pos = parseInt(pos[0].match(/\d+/)[0]);
                lineMsg += '<button type="button" class="btn btn-danger" ' +
                           '        onclick="wepsim_notify_close(); ' + 
                           '                 goError(' + editor + ', ' + pos + ');">' + 
                           ' Go line ' + pos + 
                           '</button>&nbsp;' ;
            }

            wepsim_notify_error('<strong>ERROR</strong>',
                                errorMsg + '<br>' + '<center>' + lineMsg +
                                '<button type="button" class="btn btn-danger" ' +
                                '        onclick="wepsim_notify_close();"><span data-langkey="Close">Close</span></button>' +
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

		      //$(popup_id).trigger('updatelayout');
			$(popup_id).trigger('refresh');
                   }, 300);
    }


    /*
     * Microcompile and compile
     */

    function wepsim_compile_assembly ( textToCompile )
    {
        // get SIMWARE.firmware
        var SIMWARE = get_simware() ;
	if (SIMWARE.firmware.length === 0)
        {
            alert('WARNING: please load the microcode first.');
            sim_change_workspace('#main3') ;
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
        var asmdbg_content = assembly2html(SIMWAREaddon.mp,  SIMWAREaddon.labels2,
                                           SIMWAREaddon.seg, SIMWAREaddon.assembly) ;
	asmdbg_loadContent(asmdbg_content) ;

	simcore_reset();
        return true;
    }

    function wepsim_compile_firmware ( textToMCompile )
    {
	var ret = simcore_compile_firmware(textToMCompile) ;
	if (false === ret.ok)
        {
            showError(ret.msg, "inputfirm") ;
            return false;
        }

        // update UI
        wepsim_notify_success('<strong>INFO</strong>',
                              'Microcode was compiled and loaded.') ;

	simcore_reset() ;
        return true;
    }

