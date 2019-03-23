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

	     if (btn_show !== false) {
                 $(btn_name).removeClass('btn-outline-secondary').addClass('btn-secondary') ;
             }
	}
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
	$(btn_name).removeClass('btn-outline-secondary').removeClass('btn-secondary') ;
        if (show_elto !== false)
	     $(btn_name).addClass('btn-secondary') ;
	else $(btn_name).addClass('btn-outline-secondary') ;
    }

    function wepsim_show_asm_columns_checked ( asm_po )
    {
        var o = '<span id="asm_label" aria-label="Show label" ' +
		'      onclick="wepsim_click_asm_columns(\'label\'); return false;" ' +
		'      class="btn btn-sm btn-block btn-outline-secondary mb-1">labels</span>' +
		'<span id="asm_hex" aria-label="Show content" ' +
		'      onclick="wepsim_click_asm_columns(\'hex\'); return false;" ' +
                '      class="btn btn-sm btn-block btn-outline-secondary mb-1">content</span>' +
		'<span id="asm_ins" aria-label="Show instruction" ' +
		'      onclick="wepsim_click_asm_columns(\'ins\'); return false;" ' +
                '      class="btn btn-sm btn-block btn-outline-secondary mb-1">assembly</span>' +
		'<span id="asm_pins" aria-label="Show pseudoinstruction" ' +
		'      onclick="wepsim_click_asm_columns(\'pins\'); return false;" ' +
                '      class="btn btn-sm btn-block btn-outline-secondary mb-1">pseudo<span class="d-none d-md-inline">-instructions</span></span>' +
                '<button type="button" id="close" data-role="none" ' +
                '        class="btn btn-sm btn-danger w-100 p-0 mt-1" ' +
                '        onclick="$(\'#' + asm_po + '\').popover(\'hide\');"' + 
	        '><span data-langkey="Close">Close</span></button>' ;

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
		'        onclick="$(\'#' + quick_po + '\').popover(\'hide\');"><span data-langkey="Close">Close</span></button>' +
		'</ul>' ;

        return o ;
    }

