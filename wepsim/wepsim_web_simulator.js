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
    }

    function wsweb_change_workspace_simulator ( )
    {
	    sim_change_workspace('#main1', 0) ;

	    setTimeout(function(){
			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.simulator');
	               }, 50) ;
    }

    function wsweb_change_workspace_microcode ( )
    {
	    sim_change_workspace('#main3', 1) ;

	    setTimeout(function(){
		            inputfirm.refresh() ; 

			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.microcode');
	               }, 50) ;
    }

    function wsweb_change_workspace_assembly ( )
    {
	    sim_change_workspace('#main4', 2) ;

	    setTimeout(function(){
		            inputasm.refresh() ; 

			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.assembly');
	               }, 50) ;
    }

    //  Workspace simulator: execution

    function wsweb_execution_reset ( )
    {
	    wepsim_execute_reset(true, true) ;
	    simcoreui_show_hw() ;
    }

    function wsweb_execution_microinstruction ( )
    {
	    wepsim_execute_microinstruction() ;
	    simcoreui_show_hw() ;
    }

    function wsweb_execution_instruction ( )
    {
	    wepsim_execute_instruction() ;
	    simcoreui_init_hw('#config_HW') ;
    }

    function wsweb_execution_run ( )
    {
            var mode = get_cfg('ws_mode') ;
	    if ('tutorial' == mode) {
		 wepsim_notify_success('<strong>INFO</strong>',
				       'Tutorial mode on. Use the configuration to change it.') ;
	    }

	    wepsim_execute_toggle_play('#qbp', (mode == 'tutorial')) ;
    }

    //  Workspace simulator: dialog-boxes

    function wsweb_dialogbox_open_examples ( )
    {
            wepsim_open_examples_index(); 
	    $('[data-toggle=tooltip]').tooltip('hide');
    }

    function wsweb_dialogbox_open_help ( )
    {
	    wepsim_open_help_index();
	    wepsim_help_refresh(); 
	    $('[data-toggle=tooltip]').tooltip('hide');
    }

    function wsweb_dialogbox_open_config ( )
    {
	    wepsim_open_config_index() ;
	    $('[data-toggle=tooltip]').tooltip('hide') ;
    }

    function wsweb_dialogbox_open_state ( )
    {
            wepsim_dialog_current_state() ;
	    $('[data-toggle=tooltip]').tooltip('hide') ;
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
    }

    //  Workspace simulator: Sliders

    function wsweb_set_cpucu_size ( new_value )
    {
	    $('#slider2b').val(new_value) ;
	    set_ab_size('#eltos_cpu_a', '#eltos_cpu_b', new_value) ;

	    set_cfg('CPUCU_size', new_value) ;
	    save_cfg() ;
    }

    function wsweb_set_c1c2_size ( new_value )
    {
	    $("#slider2a").val(new_value) ;
	    set_ab_size('#col1', '#col2', new_value);

	    set_cfg('C1C2_size', new_value);
	    save_cfg() ;
    }


    //
    // WepSIM private API
    //

    // Popovers

    function wepsim_show_quick_menu ( quick_po )
    {
        var wsi = get_cfg('ws_idiom') ;

        var o = '<ul class="list-group list-group-flush">' +
		'<li class="list-group-item px-0 pt-1"> ' +
		'  <em class="fas fa-flag"></em> &nbsp;' +
		'  <a class="btn btn-sm btn-outline-secondary col-auto p-1 text-left" href="#" ' +
                '     onclick="simcoreui_notify_notifications(); ' +
		'              $(\'#' + quick_po + '\').popover(\'hide\');' +
                '              i18n_update_tags(); ' +
		'              return false;">' +
		i18n_get('gui',wsi,'Show Notifications') + '...</a>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-bars"></em> &nbsp;' +
                '  <span class="btn-group-toggle" data-toggle="buttons">' +
		'  <label class="btn btn-sm btn-outline-secondary col-auto p-1 text-left" data-toggle="collapse" href=".multi-collapse-1">' +
		'  <input type="checkbox" checked="" autocomplete="off">' +
		i18n_get('gui',wsi,'Show/Hide ActionBar') + '</label>' +
		'  </span>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-sliders-h"></em> &nbsp;' +
                '  <span class="btn-group-toggle" data-toggle="buttons">' +
		'  <label class="btn btn-sm btn-outline-secondary col-10 p-1 text-left" data-toggle="collapse" href=".multi-collapse-2">' +
		'  <input type="checkbox" checked="" autocomplete="off">' +
		i18n_get('gui',wsi,'Show/Hide Slider') + '</label>' +
		'  </span>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-magic"></em> &nbsp;' +
		'  <a class="btn btn-sm btn-outline-secondary col-10 p-1 text-left" href="#" ' +
		'     onclick="$(\'#about2\').modal(\'show\'); ' +
		'              $(\'#' + quick_po + '\').popover(\'hide\');">' +
		i18n_get('gui',wsi,'About WepSIM') + '...</a>' +
		'</li>' +
		'<li class="list-group-item px-0"> ' +
		'  <em class="fas fa-book-reader"></em> &nbsp;' +
		'  <a class="btn btn-sm btn-outline-secondary col-10 pr-2 text-left" href="#" ' +
		'     onclick="wepsim_newbie_tour(); ' +
		'              $(\'#' + quick_po + '\').popover(\'hide\');">' +
		i18n_get('gui',wsi,'Initial intro') + '...</a>' +
		'</li>' +
	        '<button type="button" id="close" data-role="none" ' + 
		'        class="btn btn-sm btn-danger w-100 p-0 mt-2" ' +
		'        onclick="$(\'#' + quick_po + '\').popover(\'hide\');">' +
		i18n_get('gui',wsi,'Close') +
                '</button>' +
		'</ul>' ;

        return o ;
    }

    function wsweb_init_quick_menu ( )
    {
	    $("[data-toggle=popover0]").popover({
		    html:       true,
		    placement: 'auto',
		    animation:  false,
		    container: 'body',
		    template:  '<div class="popover shadow border border-secondary" role="tooltip">' +
			       '<div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div>' +
			       '</div>',
		    content:    function() {
				   return wepsim_show_quick_menu('po1') ;
				},
		    sanitizeFn: function (content) {
				   return content ; // DOMPurify.sanitize(content) ;
				}
	    });
    }

    // asmdbg

    function wsweb_init_asmdbg ( )
    {
            // asmdbg content
	    showhideAsmElements() ;

	    var target = $("#asm_table");
	    $("#asm_debugger_container").scroll(function() {
	       target.prop("scrollTop", this.scrollTop).prop("scrollLeft", this.scrollLeft);
	    });

            // asmdbg popover
	    $("[data-toggle=popover2]").popover({
		    html:       true,
		    placement: 'auto',
		    animation:  false,
		    container: 'body',
		    content:    function() {
				   return wepsim_show_asm_columns_checked('popover2_asm') ;
				},
		    sanitizeFn: function (content) {
				   return content ; // DOMPurify.sanitize(content) ;
				}
	    }).on('shown.bs.popover', function(shownEvent) {
		   showhideAsmHeader() ;
	    });
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

    // sliders

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

    // states

    function wsweb_init_state_dialog ( id_div_state1, id_div_state2 )
    {
	    $('#' + id_div_state1).tokenfield({ inputType: 'textarea' }) ;
	    //A1/ var inputEls = document.getElementById(id_div_state1);
	    //A1/ if (null != inputEls)
	    //A1/     setup_speech_input(inputEls) ;

	    $('#' + id_div_state2).tokenfield({ inputType: 'textarea' }) ;
	    //A1/ var inputEls = document.getElementById(id_div_state2);
	    //A1/ if (null != inputEls)
	    //A1/     setup_speech_input(inputEls) ;

    }

