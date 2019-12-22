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


    // workspaces

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

    // active/restore UI

    function wepsim_restore_uicfg ( )
    {
	    var cfgValue = null ;

	    // view
	    cfgValue = get_cfg('ws_skin_user') ;
	    wepsim_restore_view(cfgValue) ;

	    // dark mode
	    cfgValue = get_cfg('ws_skin_dark_mode') ;
            wepsim_restore_darkmode(cfgValue) ;
    }

    function wepsim_activeview ( view, is_set )
    {
            // update current skin
	    var cur_skin_user = get_cfg('ws_skin_user').split(":") ;

	    if ('only_asm' === view)
	    {
	        cur_skin_user[0] = 'only_asm' ;
	        cur_skin_user[1] = (is_set) ? 'on' : 'of' ;
	    }
	    if ('only_frequent' === view)
	    {
	        cur_skin_user[2] = 'only_frequent' ;
	        cur_skin_user[3] = (is_set) ? 'on' : 'of' ;
	    }

            // update cfg
	    var new_skin_user = cur_skin_user.join(":") ;
	    update_cfg('ws_skin_user', new_skin_user) ;
	    $('#label14-' + new_skin_user.replace(/:/g,"__")).button('toggle');

            // update view
            wepsim_restore_view(new_skin_user) ;
    }

    function wepsim_restore_view ( view )
    {
            var new_classes = [] ;
	    var cur_skin_user = view.split(":") ;
	    if ('only_asm' === cur_skin_user[0])
	    {
              //$(".multi-collapse-2").collapse("show") ;
		inputfirm.setOption('readOnly', false) ;

	        if ('on' === cur_skin_user[1])
                {
		     $("#tab24").click() ;
		     inputfirm.setOption('readOnly', true) ;
		     new_classes.push('.user_microcode') ;
		}
	    }
	    if ('only_frequent' === cur_skin_user[2])
	    {
	        if ('on' === cur_skin_user[3])
		    new_classes.push('.user_archived') ;
	    }

	    var classes = '.user_archived, .user_microcode' ;
	    $(classes).removeClass('d-none') ;
            classes = new_classes.join(", ") ;
            $(classes).addClass('d-none') ;
    }

    function wepsim_restore_darkmode ( adm )
    {
	    var o = null ;

            // body
	    o = document.getElementsByTagName('body') ;
	    if (o.length > 0)
            {
	         if (adm === false)
	              o[0].removeAttribute('data-theme', 'dark') ;
	         else o[0].setAttribute('data-theme',    'dark') ;
            }

            // skipped elements
	    o = document.querySelectorAll('.no-dark-mode') ;
            for (var i=0; i<o.length; i++)
            {
	         if (adm === false)
	              o[i].removeAttribute('data-theme', 'nodark') ;
	         else o[i].setAttribute('data-theme',    'nodark') ;
            }

	    return true ;
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

    // wepsim_activehw: UI handlers

    var msg_default = '<div class="bg-warning"><b>Not available in this hardware</b></div>' ;

    var hash_detail2init = {

	    "REGISTER_FILE":  {
						  init: function() {
							     $('#states_ALL').html(msg_default) ;
							     wepsim_init_states('#states_ALL') ;

							     $('#states_BR').html(msg_default) ;
							     wepsim_init_rf('#states_BR') ;
							},
						 reset: function() {
							     wepsim_show_states() ;
							     wepsim_show_rf_values();
							     wepsim_show_rf_names();
							},
					   show_states: wepsim_show_states,
					show_rf_values: wepsim_show_rf_values,
					 show_rf_names: wepsim_show_rf_names
	                      },

	    "CPU_STATS":      {
						  init: function() {
						 	   $('#cpu_ALL').html(msg_default) ;
						 	   wepsim_init_cpu('#cpu_ALL') ;
						        },
						 reset: function() {
							   return true ;
						        }
	                      },
	
	    "CONTROL_MEMORY": {
						  init: function() {
							   return true ;
						        },
						 reset: function() {
							   show_control_memory(simhw_internalState('MC'),
									       simhw_internalState('MC_dashboard'),0,true);
						        },
					   update_draw: wepsim_svg_update_draw,
			         update_bus_visibility: wepsim_svg_update_bus_visibility
	                      },
	
	    "MEMORY":         {
		                                  init: function() {
							   return true ;
						        },
						 reset: function() {
							   show_main_memory(simhw_internalState('MP'), 0, true, false) ;
						        },
		                      show_main_memory: wepsim_show_main_memory,
		                        show_asmdbg_pc: wepsim_show_asmdbg_pc,
                                   show_control_memory: wepsim_show_control_memory,
		                          show_dbg_mpc: wepsim_show_dbg_mpc,
				           show_dbg_ir: wepsim_show_dbg_ir
	                      },

	    "MEMORY_CONFIG":  {
						  init: function() {
							   $('#config_MP').html(msg_default) ;
						 	   init_config_mp('#config_MP') ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "IO_STATS":       {
						  init: function() {
							   $('#io_ALL').html(msg_default) ;
						 	   wepsim_init_io('#io_ALL') ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "IO_CONFIG":      {
						  init: function() {
						 	   $('#config_IO').html(msg_default) ;
							   wepsim_init_config_io('#config_IO') ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "3DLED":         {
						  init: function() {
						 	   $('#config_L3D').html(msg_default) ;
							   wepsim_init_l3d('#config_L3D') ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "SCREEN":         {
		                                  init: function() {
						           return true ;
						         },
		                                 reset: function() {
			                                   wepsim_set_screen_content("") ;
	                                                },
		                    get_screen_content: wepsim_get_screen_content,
                                    set_screen_content: wepsim_set_screen_content
	                      },

	    "KEYBOARD":       {
		                                  init: function() {
						           return true ;
						         },
		                                 reset: function() {
						           return true ;
						        },
		                  get_keyboard_content: wepsim_get_keyboard_content,
                                  set_keyboard_content: wepsim_set_keyboard_content
	                      }
	} ;

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
		simcore_init_eventlistener("svg_p", hash_detail2action, hash_signal2action) ;
		refresh() ;
	    }, false);

	    var b = document.getElementById("svg_cu");
	    b.addEventListener("load",function() {
		simcore_init_eventlistener("svg_cu", hash_detail2action, hash_signal2action) ;
		refresh() ;
	    }, false);

	    // initialize hw UI
	    simcore_init_ui(hash_detail2init) ;
	    simcoreui_init_hw('#config_HW') ;

            // info + warning
	    wepsim_notify_warning('<strong>WARNING</strong>',
                                  'Please remember the current firmware and assembly might need to be reloaded, ' +
                                  'because previous working session of the simulated hardware are not kept.') ;
	    wepsim_notify_success('<strong>INFO</strong>',
                                  '"' + simhw_active().sim_name + '" has been activated.') ;

            // update UI: memory
            var SIMWARE = get_simware() ;
    	    update_memories(SIMWARE) ;
            simcore_reset() ;

            // update UI: asmdbg
            var asmdbg_content = default_asmdbg_content_horizontal() ;
	    for (var l in SIMWARE.assembly) // <===> if (SIMWARE.assembly != {})
	    {
                 asmdbg_content = assembly2html(SIMWARE.mp, SIMWARE.labels2, SIMWARE.seg, SIMWARE.assembly) ;
		 break ;
	    }

	    asmdbg_loadContent(asmdbg_content) ;

            // return ok
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

    //
    // Auxiliar function
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

    // confirm exit
    function wepsim_confirm_exit ( e )
    {
	    wepsim_checkpoint_addCurrentToCache() ;

	    var confirmationMessage = "\o/";
	    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
	    return confirmationMessage;                            // Webkit, Safari, Chrome
    }

    // confirm exit
    function wepsim_general_exception_handler ( err )
    {
          alert("Please try to cleanup the browser cache and try again.\n" +
                "WepSIM was improperly used and found an error, sorry :-(\n" +
		"\n" +
		"Diagnostic:\n" +
                " * Error message: " + err.message + "\n" +
		" * Runtime stack:\n" + err.stack +
		"\n" +
		"After close this alert, WepSIM will try to reload and by-pass the cache (just in case).\n") ;

	  location.reload(true) ;
    }

    function wepsim_init_helpDropdown ( )
    {
           var o = "" ;

           o = i18n_get_dropdown(['gui','cfg'], '') ;
           $("#config2_lang").html(o) ;

           o = i18n_get_dropdown(['gui','help'], "wepsim_help_refresh();") ;
           $("#help1_lang").html(o) ;

           o = i18n_get_dropdown(['gui','examples'], "") ;
           $("#example1_lang").html(o) ;

           o = i18n_get_dropdown(['gui','states'], "update_checker_loadhelp('#help3a','help_dumper');") ;
           $("#current_checkpoint1_lang").html(o) ;

           o = i18n_get_dropdown(['gui','states'], "update_checker_loadhelp('#help3b','help_dumper');") ;
           $("#current_state1_lang").html(o) ;
    }

    //
    // Quick Config
    //

    // popover quick-menu
    function wepsim_show_quick_menu ( quick_po )
    {
	var wsi = get_cfg('ws_idiom') ;

	var o = '<ul class="list-group list-group-flush">' ;

	   o += '<li class="list-group-item px-0"> ' +
		'  <a class="btn btn-sm btn-outline-dark col p-1 text-left float-right" href="#" ' +
		'     onclick="wsweb_about_show(); ' +
		'              wsweb_quickmenu_close(); ' +
		'              return false;">' +
		'<em class="fas fa-magic col-1 pl-1 float-left"></em>' +
		'<span class="col-11">' + i18n_get('dialogs',wsi,'About WepSIM') + '...</span></a>' +
		'</li>' ;

	   o += '<li class="list-group-item px-0"> ' +
		'  <a class="btn btn-sm btn-outline-dark col p-1 text-left float-right" href="#" ' +
		'     onclick="wepsim_newbie_tour(); ' +
		'              wsweb_quickmenu_close(); ' +
		'              return false;">' +
		'<em class="fas fa-book-reader col-1 pl-1 float-left"></em>' +
		'<span class="col-11">' + i18n_get('dialogs',wsi,'Initial intro') + '...</span></a>' +
		'</li>' ;

	   o += '<li class="list-group-item px-0"> ' +
		'  <span class="btn-group-toggle" data-toggle="buttons">' +
		'  <label class="btn btn-sm btn-outline-dark col p-1 text-left float-right" data-toggle="collapse" href=".multi-collapse-3">' +
		'  <input type="checkbox" checked="" autocomplete="off">' +
		'<em class="fas fa-wrench col-1 pl-1 float-left"></em>' +
		'<span class="col-11">' + i18n_get('dialogs',wsi,'Show/Hide QuickConfig') + '</span></label>' +
		'  </span>' +
		'</li>' ;

	   o += '<li class="list-group-item px-0"> ' +
		'  <span class="btn-group-toggle" data-toggle="buttons">' +
		'  <label class="btn btn-sm btn-outline-dark col p-1 text-left float-right" data-toggle="collapse" href=".multi-collapse-1">' +
		'  <input type="checkbox" checked="" autocomplete="off">' +
		'<em class="fas fa-bars col-1 pl-1 float-left"></em>' +
		'<span class="col-11">' + i18n_get('dialogs',wsi,'Show/Hide ActionBar') + '</span></label>' +
		'  </span>' +
		'</li>' ;

	   o += '<li class="list-group-item px-0"> ' +
		'  <span class="btn-group-toggle" data-toggle="buttons">' +
		'  <label class="btn btn-sm btn-outline-dark col p-1 text-left float-right" data-toggle="collapse" href=".multi-collapse-2">' +
		'  <input type="checkbox" checked="" autocomplete="off">' +
		'<em class="fas fa-sliders-h col-1 pl-1 float-left"></em>' +
		'<span class="col-11">' + i18n_get('dialogs',wsi,'Show/Hide Slider') + '</span></label>' +
		'  </span>' +
		'</li>' ;

	   o += '<button type="button" id="close" data-role="none" ' +
		'        class="btn btn-sm btn-danger w-100 p-0 mt-2" ' +
		'        onclick="wsweb_quickmenu_close(); ' +
		'                 return false;">' +
		i18n_get('dialogs',wsi,'Close') +
		'</button>' +
		'</ul>' ;

	return o ;
    }

    // popover quick-slidercfg
    function wepsim_show_slidercfg_menu ( quick_po )
    {
	var wsi = get_cfg('ws_idiom') ;

	var o = '<ul class="list-group list-group-flush">' ;

	   o += '<li class="list-group-item px-0"> ' +
                '     <div id="slider_cpucu" class="col-sm p-0 collapse show user_microcode">' +
                '           <form id="slider2f" class="full-width-slider row-auto mt-0 p-0 pt-0 pb-2">' +
                '                <label class="my-0" for="slider3b" style="min-width:95%"><span data-langkey="processor">processor</span>:</label>' +
                '                <input aria-label="Show CPU/CU" type="range" name="slider3b" id="slider3b"' +
                '                       min="0" max="12" value="7" step="1"' +
                '                       data-show-value="false"' +
                '                       class="custom-range slider col mx-0 px-0"' +
                '                       oninput="wsweb_set_cpucu_size(this.value) ;' +
                '                                return false;">' +
                '           </form>' +
                '     </div>' +
		'</li>' ;

	   o += '<li class="list-group-item px-0"> ' +
                '     <div class="col-sm p-0 ml-1 collapse show">' +
                '           <form id="slider2e" class="full-width-slider row-auto mt-0 p-0 pt-0 pb-2">' +
                '                <label class="my-0" for="slider3a" style="min-width:95%"><span data-langkey="details">details</span>:</label>' +
                '                <input aria-label="Show Main/Info" type="range" name="slider3a" id="slider3a"' +
                '                       min="0" max="12" value="7" step="1"' +
                '                       data-show-value="false"' +
                '                       class="custom-range slider col mx-0 px-0"' +
                '                       oninput="wsweb_set_c1c2_size(this.value) ;' +
                '                                return false;">' +
                '           </form>' +
                '     </div>' +
		'</li>' ;

	   o += '<li class="list-group-item px-0"> ' +
		'<label><span data-langkey="dark mode">dark mode</span>:</label>' +
                "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
		"        <label id='label18-true'" +
		"               class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
		"               aria-label='WepSIM dark mode: true' " +
		"               onclick=\"wepsim_restore_darkmode(true) ; " +
		"                         update_cfg('ws_skin_dark_mode', true);" +
		"                         return false;\">" +
		"            <input type='radio' name='options' id='radio18-true'  aria-label='Dark mode: true'  autocomplete='off' >On" +
		"        </label>" +
		"        <label id='label18-false'" +
		"               class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
		"               aria-label='WepSIM dark mode: true' " +
		"               onclick=\"wepsim_restore_darkmode(false) ; " +
		"                         update_cfg('ws_skin_dark_mode', false);" +
		"                         return false;\">" +
		"            <input type='radio' name='options' id='radio18-false' aria-label='Dark mode: false' autocomplete='off' >Off" +
		"        </label>" +
		"    </div>" +
		'</li>' ;

/*
	   o += '<li class="list-group-item px-0"> ' +
		'<label><span data-langkey="assembly only">assembly only</span>:</label>' +
                "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
		"        <label id='label16-true'" +
		"               class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
		"               aria-label='Assembly only: true' " +
		"               onclick=\"wepsim_activeview('only_asm', true) ; " +
		"                         return false;\">" +
		"            <input type='radio' name='options' id='radio16-true'  aria-label='Assembly only: true'  autocomplete='off' >On" +
		"        </label>" +
		"        <label id='label16-false'" +
		"               class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
		"               aria-label='Assembly only: true' " +
		"               onclick=\"wepsim_activeview('only_asm', false) ; " +
		"                         return false;\">" +
		"            <input type='radio' name='options' id='radio16-false' aria-label='Assembly only: false' autocomplete='off' >Off" +
		"        </label>" +
		"    </div>" +
		'</li>' ;
*/

	   o += '<li class="list-group-item px-0"> ' +
		'<label><span data-langkey="beginner view">beginner view</span>:</label>' +
                "<div class='btn-group btn-group-toggle d-flex' data-toggle='buttons' >" +
		"        <label id='label17-true'" +
		"               class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
		"               aria-label='Frequent only: true' " +
		"               onclick=\"wepsim_activeview('only_frequent', true) ; " +
		"                         return false;\">" +
		"            <input type='radio' name='options' id='radio17-true'  aria-label='Frequent only: true'  autocomplete='off' >On" +
		"        </label>" +
		"        <label id='label17-false'" +
		"               class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
		"               aria-label='Frequent only: true' " +
		"               onclick=\"wepsim_activeview('only_frequent', false) ; " +
		"                         return false;\">" +
		"            <input type='radio' name='options' id='radio17-false' aria-label='Frequent only: false' autocomplete='off' >Off" +
		"        </label>" +
		"    </div>" +
		'</li>' ;

	   o += '<button type="button" id="close" data-role="none" ' +
		'        class="btn btn-sm btn-danger w-100 p-0 mt-3" ' +
		'        onclick="wsweb_quickslider_close(); ' +
		'                 return false;">' +
		i18n_get('dialogs',wsi,'Close') +
		'</button>' +
		'</ul>' ;

	return o ;
    }

    // popover quick-slidercfg
    function wepsim_init_quickcfg ( quick_id, val_trigger, fun_content, fun_ownshown )
    {
	 return $(quick_id).popover({
		    trigger:     val_trigger,
		    html:        true,
		    placement:  'auto',
		    animation:   false,
		    container:  'body',
		    template:   '<div class="popover shadow border border-secondary" role="tooltip">' +
			        '<div class="arrow"></div><h3 class="popover-header"></h3>' +
                                '<div class="popover-body"></div>' +
			        '</div>',
		    content:    fun_content,
		    sanitizeFn: function (content) {
				    return content ; // DOMPurify.sanitize(content) ;
				}
	 }).on('shown.bs.popover',
		                function(shownEvent) {
                                    fun_ownshown(shownEvent);
                                    i18n_update_tags('dialogs') ;
                                    i18n_update_tags('gui') ;
                                    i18n_update_tags('cfg') ;
                                }) ;
    }

    //
    // Initialize UI
    //

    function wepsim_init_quickfixes ( )
    {
	// https://github.com/facebook/react-native/issues/18375
	/* eslint-disable no-extend-native */
	/* eslint-disable no-param-reassign */
	/* eslint-disable no-bitwise */
	if (!String.prototype.padStart)
        {
	  String.prototype.padStart = function padStart(targetLength, padString) {
	    targetLength >>= 0; // truncate if number, or convert non-number to 0;
	    padString = String(typeof padString !== 'undefined' ? padString : ' ');
	    if (this.length >= targetLength) {
	      return String(this);
	    }
	    targetLength -= this.length;
	    if (targetLength > padString.length) {
	      // append to original to ensure we are longer than needed
	      padString += padString.repeat(targetLength / padString.length);
	    }
	    return padString.slice(0, targetLength) + String(this);
	  };
	}
    }

    function wepsim_init_ui ( )
    {
            // fixed padString...
            wepsim_init_quickfixes() ;

	    // install protection for accidental close.
	    window.addEventListener("beforeunload", wepsim_confirm_exit) ;

	    // disable effects
	    if (typeof jQuery.fx != "undefined")
		jQuery.fx.off = true;
	    if (typeof ko != "undefined")
		ko.options.deferUpdates = true;

	    // carousel: touch swipe disabled
	    $('.carousel').carousel({ touch: false }) ;

	    // initialize dropify
	    $('.dropify').dropify();

	    // set wepsim version
	    $("div.wsversion").replaceWith(get_cfg('version'));

	    // init: state dialog
	    $('#end_state1').tokenfield({ inputType: 'textarea' }) ;
	       //A1/ var inputEls = document.getElementById(id_div_state1);
	       //A1/ if (null !== inputEls)
	       //A1/     setup_speech_input(inputEls) ;

	    $('#end_state2').tokenfield({ inputType: 'textarea' }) ;
	       //A1/ var inputEls = document.getElementById(id_div_state2);
	       //A1/ if (null !== inputEls)
	       //A1/     setup_speech_input(inputEls) ;

	    // tooltip: trigger by hover
	    $('[data-toggle="tooltip"]').tooltip({
		    trigger:   'hover',
		    sanitizeFn: function (content) {
				   return content ; // DOMPurify.sanitize(content) ;
				}
	    }) ;

	    // help popover...
	    $('a[data-toggle="popover1"]').popover({
		    placement: 'bottom',
		    animation: false,
		    trigger:   'focus, hover',
		    delay: { "show": 500, "hide": 100 },
		    sanitizeFn: function (content) {
				   return content ; // DOMPurify.sanitize(content) ;
				}
	    }) ;

	    // init: quick-menu
            wepsim_init_quickcfg("#po1",
                                 'manual',
		                 function() { return wepsim_show_quick_menu('po1') ; },
		                 function() { }) ;

            wepsim_init_quickcfg("#popover-slidercfg",
                                 'click',
                                 wepsim_show_slidercfg_menu,
		                 function(shownEvent) {
				    var optValue = false ;
				    $("#slider3a").val(get_cfg('C1C2_size')) ;
				    $("#slider3b").val(get_cfg('CPUCU_size')) ;
				    optValue = (get_cfg('ws_skin_user').split(":")[1] == 'on') ? true : false ;
                                    $('#label16-' + optValue).button('toggle') ;
				    optValue = (get_cfg('ws_skin_user').split(":")[3] == 'on') ? true : false ;
                                    $('#label17-' + optValue).button('toggle') ;
				    optValue = get_cfg('ws_skin_dark_mode') ;
                                    $('#label18-' + optValue).button('toggle') ;
                                 }) ;

            wepsim_init_quickcfg("[data-toggle=popover2]",
                                 'click',
		                 function(shownEvent) {
				    return wepsim_show_asm_columns_checked('popover2_asm') ;
		                 },
		                 function(shownEvent) {
				    showhideAsmHeader() ;
                                 }) ;

	    // asmdbg
	    showhideAsmElements() ;

	    var target = $("#asm_table");
	    $("#asm_debugger_container").scroll(function() {
	       target.prop("scrollTop", this.scrollTop).prop("scrollLeft", this.scrollLeft);
	    });

	    // initialize editors
	    inputfirm_cfg = {
			      value: "\n\n\n\n\n\n\n\n\n\n\n\n",
			      lineNumbers: true,
			      lineWrapping: true,
			      matchBrackets: true,
			      tabSize: 2,
			      foldGutter: {
				rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.brace, CodeMirror.fold.comment)
			      },
			      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
			      mode: "text/javascript"
			    } ;
	    inputfirm = sim_init_editor("inputFirmware", inputfirm_cfg) ;

	    inputasm_cfg = {
				value: "\n\n\n\n\n\n\n\n\n\n\n\n",
				lineNumbers: true,
				lineWrapping: true,
				matchBrackets: true,
				tabSize: 2,
				extraKeys: {
				  "Ctrl-Space": function(cm) {
				      CodeMirror.showHint(cm, function(cm, options) {
					      var simware = get_simware();
					      var cur = cm.getCursor();
					      var result = [];
					      for (var i=0; i<simware.firmware.length; i++) {
						   if (simware.firmware[i].name != "begin") {
							result.push(simware.firmware[i].signatureUser) ;
						   }
					      }
					      return { list: result, from: cur, to: cur } ;
				      });
				  }
				},
				mode: "gas"
			    } ;
	    inputasm = sim_init_editor("inputAssembly", inputasm_cfg) ;

	    // init: record
	    simcore_record_init('record_msg', 'record_pb') ;
            simcore_record_captureInit() ;

	    // init: help idiom selectors
            wepsim_init_helpDropdown() ;

	    // restore UI
	    setTimeout(function() {
		          wepsim_restore_uicfg() ;
		       }, 250) ;
    }

