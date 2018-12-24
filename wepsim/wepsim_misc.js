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

    /*
     * Update selects
     */

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
                                                     simui_select_details(11) ;
                                                  }, false);
	            o  = ref_p.getElementById('text3029');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     simui_select_details(11) ;
                                                  }, false);
	            o  = ref_p.getElementById('text3031');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     simui_select_details(11) ;
                                                  }, false);
	            o  = ref_p.getElementById('text3001');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     simui_select_details(14) ;
                                                  }, false);
	            o  = ref_p.getElementById('text3775');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     simui_select_details(15) ;
                                                  }, false);
	            o  = ref_p.getElementById('text3829');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     simui_select_details(12) ;
                                                  }, false);
	            o  = ref_p.getElementById('text3845');
	        if (o != null) o.addEventListener('click',
                                                  function() {
                                                     simui_select_details(12) ;
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
                                                     simui_select_details(16) ;
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


    /*
     *  Editor
     */

    function sim_cfg_editor_theme ( editor )
    {
	    var theme = get_cfg('editor_theme') ;

	    editor.getWrapperElement().style['text-shadow'] = '0.0em 0.0em';
	    editor.getWrapperElement().style['font-weight'] = 'bold';

	    if (theme == 'blackboard') {
		editor.getWrapperElement().style['font-weight'] = 'normal';
	    }

	    editor.setOption('theme', theme);
    }

    function sim_cfg_editor_mode ( editor )
    {
	    var edt_mode = get_cfg('editor_mode');

	    if (edt_mode == 'vim')
		editor.setOption('keyMap','vim');
	    if (edt_mode == 'emacs')
		editor.setOption('keyMap','emacs');
	    if (edt_mode == 'sublime')
		editor.setOption('keyMap','sublime');
    }

    function sim_prepare_editor ( editor )
    {
	    editor.setValue("\n\n\n\n\n\n\n\n\n\n");

            sim_cfg_editor_theme(editor) ;
            sim_cfg_editor_mode(editor) ;

            editor.setSize("auto","auto");
            editor.refresh();
    }


    /*
     *  Workspaces
     */

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
    }

    function sim_change_workspace_microcode ( )
    {
	    sim_change_workspace('#main3', 1) ;

	    setTimeout(function(){
		          inputfirm.refresh() ; 
	               }, 50) ;
    }

    function sim_change_workspace_assembly ( )
    {
	    sim_change_workspace('#main4', 2) ;

	    setTimeout(function(){
		          inputasm.refresh() ; 
	               }, 50) ;
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
        $("#asm_debugger").html(assembly2html(SIMWAREaddon.mp, SIMWAREaddon.labels2,
                                              SIMWAREaddon.seg, SIMWAREaddon.assembly));
        showhideAsmElements();

	simcore_reset();
        return true;
    }

    function wepsim_compile_firmware ( textToMCompile )
    {
	var ret = simcore_compile_firmware(textToMCompile) ;
	if (false == ret.ok)
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

    function wepsim_notify_warning ( ntf_title, ntf_message )
    {
         return simcoreui_notify(ntf_title, ntf_message, 'warning', get_cfg('NOTIF_delay')) ;
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

		      //$(popup_id).trigger('updatelayout');
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
		sim_prepare_svg_p();
		simcore_init_eventlistener("svg_p");
		refresh();
	    }, false);

	    var b = document.getElementById("svg_cu");
	    b.addEventListener("load",function() {
		sim_prepare_svg_cu();
		simcore_init_eventlistener("svg_cu");
		refresh();
	    }, false);

            // info + warning
	    wepsim_notify_warning('<strong>WARNING</strong>',
                                 'Please remember the current firmware and assembly could need to be reloaded.') ;
	    wepsim_notify_warning('<strong>WARNING</strong>',
                                 'Pass working session with the simulated hardware are not kept.') ;
	    wepsim_notify_success('<strong>INFO</strong>',
                                  '"' + simhw_active().sim_name + '" has been activated.') ;

            // update UI
            var SIMWARE = get_simware() ;
    	    update_memories(SIMWARE) ;
            simcore_reset() ;

            var asmdbg_content = "<br/>" +
                                 "<ol>" +
                                 "<li>Load the microcode to be used.</li>" +
                                 "    <ul>" +
                                 "    <li>You can use an example of microcode, load it from a file or you can edit one.</li>" +
                                 "    </ul>" +
                                 "<br/>" +
                                 "<li>Load the assembly to be used.</li>" +
                                 "    <ul>" +
                                 "    <li>You can use an assembly example, load it from a file or you can edit one.</li>" +
                                 "   </ul>" +
                                 "<br/>" +
                                 "<li>Come back to the simulator in order to execute the microcode+assembly loaded before.</li>" +
                                 "    <ul>" +
                                 "    <li>Each step could be executed at microinstruction or instruction level.</li>" +
                                 "    </ul>" +
                                 "</ol>" ;
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
    }

    function wepsim_hide_wepmips ( )
    {
        $(".multi-collapse-2").collapse("show") ;
	$("#slider_cpucu").show() ;

	$("#tab26").show() ;
	$("#tab21").show() ;
    }

    function wepsim_newbie_tour ( )
    {
         var ti = get_cfg('ws_idiom') ;
	     tour = introJs() ;

	     tour.setOptions({ steps: tour_steps[ti] }) ;
	     tour.setOption("overlayOpacity", "0.1") ;

	     tour.onbeforechange(function () {
                                        tour_steps.en[this._currentStep].do_before() ;
	                         }) ;

	     tour.onexit(function () {
			                $("#config2").modal('hide'); 
			                $("#help1").modal('hide'); 
			                $("#example1").modal('hide'); 

					// ws_mode: intro, tutorial, ep, poc, ...
					if (get_cfg('ws_mode') != 'ep') { 
					    simui_select_main('ep') ;
					}

			                return true ;
	                }) ;

	     tour.start() ;
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
                               hwid = simhw_getActiveByName('ep') ;
                               wepsim_activehw(hwid) ;
                               break;
	      default:
	                       hwid = simhw_getActiveByName(optValue) ;
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


    /*
     *  Popovers
     */

    function wepsim_show_asm_columns_checked ( asm_po )
    {
        var o = '<ul class="list-group">' +
                '<li class="list-group-item py-0"><label class="m-1">' +
		'<input aria-label="Show breakpoint" type="checkbox" value="1" id="asm_break" ' +
                '    checked="checked" data-toggle="collapse" data-target=".asm_break">' +
                '&nbsp;<span>breakpoints</span>' +
		'</label></li>' +
		'<li class="list-group-item py-0"><label class="m-1">' +
		'<input aria-label="Show address"    type="checkbox" value="1" id="asm_addr"    ' +
		'    checked="checked" data-toggle="collapse" data-target=".asm_addr">' +
                '&nbsp;<span>address</span>' +
		'</label></li>' +
		'<li class="list-group-item py-0"><label class="m-1">' +
		'<input aria-label="Show label"      type="checkbox" value="1" id="asm_label2"  ' +
		'    checked="checked" data-toggle="collapse" data-target=".asm_label2">' +
                '&nbsp;<span>labels</span>' +
		'</label></li>' +
                '<li class="list-group-item py-0"><label class="m-1">' +
		'<input aria-label="Show pseudo-instruction" type="checkbox" value="1" id="asm_pins" ' +
		'    checked="checked" data-toggle="collapse" data-target=".asm_pins">' +
                '&nbsp;<span>pseudo</span><span class="d-none d-md-inline">-instructions</span>' +
		'</label></li>' +
		'<li class="list-group-item py-0"><label class="m-1">' +
		'<input aria-label="Show label"              type="checkbox" value="1" id="asm_label1"  ' +
		' checked="checked" data-toggle="collapse" data-target=".asm_label1">' +
                '&nbsp;<span>labels</span>' +
		'</label></li>' +
		'<li class="list-group-item py-0"><label class="m-1">' +
		'<input aria-label="Show instruction"        type="checkbox" value="1" id="asm_ins"     ' +
		' checked="checked" data-toggle="collapse" data-target=".asm_ins">' +
                '&nbsp;<span>assembly</span>' +
		'</label></li>' +
		'</ul>' +
                '<button type="button" id="close" data-role="none" ' +
                '        class="btn btn-sm btn-danger w-100 p-0 mt-2" ' +
                '        onclick="$(\'#' + asm_po + '\').popover(\'hide\');">Close</button>' ;

        return o ;
    }

    function wepsim_show_quick_menu ( quick_po )
    {
        var o = '<ul class="list-group list-group-flush">' +
		'<li class="list-group-item px-0 pt-1"> ' +
		'  <em class="fas fa-flag"></em> &nbsp;' +
		'  <a class="btn btn-sm btn-outline-secondary col-auto p-1 text-left" href="#" ' +
                '     onclick="simcoreui_notify_notifications(); ' +
		'              $(\'#' + quick_po + '\').popover(\'hide\');">Show Notifications...</a>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-bars"></em> &nbsp;' +
                '  <span class="btn-group-toggle" data-toggle="buttons">' +
		'  <label class="btn btn-sm btn-outline-secondary col-auto p-1 text-left" data-toggle="collapse" href=".multi-collapse-1">' +
		'  <input type="checkbox" checked="" autocomplete="off"> Show/Hide ActionBar</label>' +
		'  </span>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-sliders-h"></em> &nbsp;' +
                '  <span class="btn-group-toggle" data-toggle="buttons">' +
		'  <label class="btn btn-sm btn-outline-secondary col-10 p-1 text-left" data-toggle="collapse" href=".multi-collapse-2">' +
		'  <input type="checkbox" checked="" autocomplete="off"> Show/Hide Sliders</label>' +
		'  </span>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-magic"></em> &nbsp;' +
		'  <a class="btn btn-sm btn-outline-secondary col-10 p-1 text-left" href="#" ' +
		'     onclick="$(\'#about2\').modal(\'show\'); ' +
		'              $(\'#' + quick_po + '\').popover(\'hide\');">About WepSIM...</a>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-book-reader"></em> &nbsp;' +
		'  <a class="btn btn-sm btn-outline-secondary col-10 p-1 text-left" href="#" ' +
		'     onclick="wepsim_newbie_tour(); ' +
		'              $(\'#' + quick_po + '\').popover(\'hide\');">Initial intro...</a>' +
		'</li>' +
	        '<button type="button" id="close" data-role="none" ' + 
		'        class="btn btn-sm btn-danger w-100 p-0 mt-2" ' +
		'        onclick="$(\'#' + quick_po + '\').popover(\'hide\');">Close</button>' +
		'</ul>' ;

        return o ;
    }

