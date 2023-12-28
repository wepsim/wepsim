/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

    function wepsim_uicfg_apply ( )
    {
	    var cfgValue = null ;

	    // view
	    cfgValue = get_cfg('ws_skin_user') ;
	    wepsim_restore_view(cfgValue) ;

	    // dark mode
	    cfgValue = get_cfg('ws_skin_dark_mode') ;
            wepsim_restore_darkmode(cfgValue) ;
    }

    function wepsim_uicfg_restore ( )
    {
	    // Reload UIcfg
	    wepsim_uicfg_apply() ;

	    // Reload view
	    wsweb_change_workspace_simulator() ;
	    wsweb_change_show_processor() ;
	    wsweb_set_details('REGISTER_FILE') ;
            show_cpuview_view() ;

	    wsweb_set_cpucu_size(get_cfg('CPUCU_size')) ;
	    wsweb_set_c1c2_size(get_cfg('C1C2_size')) ;
    }

    function wepsim_activeview ( view, is_set )
    {
            // update current skin
	    var cur_skin_user = get_cfg('ws_skin_user').split(":") ;

            var index = cur_skin_user.indexOf(view) ;
            if (index > -1) {
                cur_skin_user.splice(index, 1) ;
            }
            if (is_set) {
	        cur_skin_user.push(view) ;
            }

            // update cfg
	    var new_skin_user = cur_skin_user.join(":") ;
	    update_cfg('ws_skin_user', new_skin_user) ;

            // update cfg dialog (just in case)
            wepsim_config_button_pretoggle_val2('ws_skin_user', view, '14') ;

            // update view
            wepsim_restore_view(new_skin_user) ;
    }


    var hash_opt_wsx = {
			  'extra_mcode':   '.wsx_microcode',
			  'extra_morecfg': '.wsx_morecfg',
			  'extra_share':   '.wsx_share',
			  'beta_poc':      '.wsx_poc',
			  'beta_cache':    '.wsx_cache',
			  'beta_ngc':      '.wsx_ngc'
		       } ;

    function wepsim_restore_view ( view )
    {
	    var classes = '' ;
            var all_classes = [] ;
            var new_classes = [] ;
	    var cur_skin_user = view.split(":") ;

            // get associated classes for base, extra, beta, etc.
            var keys = Object.keys(hash_opt_wsx) ;
            for (var i=0; i<keys.length; i++)
            {
		 all_classes.push(hash_opt_wsx[keys[i]]) ;
                 if (cur_skin_user.includes(keys[i]) == false) {
		     new_classes.push(hash_opt_wsx[keys[i]]) ;
	         }
            }

            // show/hide elements...
	    classes = all_classes.join(", ") ;
	    $(classes).removeClass('d-none') ;
            classes = new_classes.join(", ") ;
            $(classes).addClass('d-none') ;

            if (cur_skin_user.includes('extra_mcode') == false)
	    {
		$("#tab24").tab("show") ;
		inputfirm.setOption('readOnly', true) ;
	    }
	    else
	    {
              //$(".multi-collapse-2").collapse("show") ;
		inputfirm.setOption('readOnly', false) ;
	    }
    }

    function wepsim_appy_darkmode ( adm )
    {
	    var o = null ;
            var id_arr = [ "svg_p", "svg_cu" ] ;

            // refresh svg
            wepsim_svg_refresh(id_arr) ;

            // updating editors
            var edt_theme = get_cfg('editor_theme') ;
            if (('default' == edt_theme) && (adm)) {
                 edt_theme = 'blackboard' ;
            }
            if (('blackboard' == edt_theme) && (false == adm)) {
                 edt_theme = 'default' ;
            }

            wepsim_config_select_toggle('editor_theme', edt_theme, '5') ;

	    sim_cfg_editor_theme(inputfirm) ;
	    sim_cfg_editor_theme(inputasm) ;

	    return true ;
    }

    function wepsim_restore_darkmode ( adm )
    {
	    var o = null ;

            // document
	    if (adm === false)
                 document.documentElement.setAttribute('data-bs-theme', 'light') ;
            else document.documentElement.setAttribute('data-bs-theme', 'dark') ;

            // set visual updates for dark/light mode
            wepsim_appy_darkmode(adm) ;

	    return true ;
    }

    var observer_darkmode = null ;

    function wepsim_keepsync_darkmode ( )
    {
            // event handler for onChange (only once)
            if (observer_darkmode == null)
            {
                observer = new MutationObserver(function ( mutations ) {
						    var is_black_mode = get_cfg("ws_skin_dark_mode") ;
						    wepsim_appy_darkmode(is_black_mode) ;
			                        }) ;

                observer.observe(document.documentElement, {
                                    attributes: true,
                                    attributeFilter: [ "data-bs-theme" ]
                                 });
            }

	    return true ;
    }


    // hardware reload

    function wepsim_reload_hw ( p_name )
    {
         // try to load
         var ret = simhw_hwset_load(p_name) ;
         if (false === ret) {
             return false ;
         }

         // select the loaded one
	 wsweb_select_main(p_name) ;
         return true ;
    }

    // wepsim_activehw: UI handlers

    var msg_default = '<div class="bg-warning"><b>Not available in this hardware</b></div>' ;

    var hash_detail2init = {

	    "REGISTER_FILE":  {
						  init: function() {
							     wepsim_init_states() ;
							     wepsim_init_rf() ;
							},
						 reset: function() {
							     // wepsim_show_rf_names() ;
							},
					 show_rf_names: function() {
							     wepsim_show_rf_names() ;
							},
	                      },

	    "CPU_STATS":      {
						  init: function() {
							   var o = document.getElementById("cpu1") ;
							   if (typeof o !== "undefined") o.render(msg_default) ;
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
							   show_control_memory(simhw_internalState('MC'),0,true);
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
		                     show_cache_memory: wepsim_show_cache_memory,
		                          show_dbg_mpc: wepsim_show_dbg_mpc,
				           show_dbg_ir: wepsim_show_dbg_ir
	                      },

	    "MEMORY_CONFIG":  {
						  init: function() {
							   var o = document.getElementById("memcfg1") ;
							   if (typeof o !== "undefined") o.render(msg_default) ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "IO_STATS":       {
						  init: function() {
							   var o = document.getElementById("ioinfo1") ;
							   if (typeof o !== "undefined") o.render(msg_default) ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "IO_CONFIG":      {
						  init: function() {
							   var o = document.getElementById("iocfg1") ;
							   if (typeof o !== "undefined") o.render(msg_default) ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "3DLED":         {
						  init: function() {
							   var o = document.getElementById("l3d1") ;
							   if (typeof o !== "undefined") o.render(msg_default) ;
						        },
						 reset: function() {
						           return true ;
						        }
	                      },

	    "LEDMATRIX":      {
						  init: function() {
							   var o = document.getElementById("ldm1") ;
							   if (typeof o !== "undefined") o.render(msg_default) ;
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
            var ahw = null ;
            var o   = null ;

            // activate the associated hardware
	    simhw_setActive(mode) ;

            // check hardware is active
            ahw = simhw_active() ;
            if (typeof ahw == "undefined") return false ;
            if (       ahw == null)        return false ;

            // reload images and associated textual representation
            cpucu_show_graph() ;
            cpucu_show_table('elements') ;

	    // initialize hw UI
	    simcore_init_ui(hash_detail2init) ;

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
	    asmdbg_update_assembly() ;

            // return ok
            return true ;
    }

    // sliders

    function set_ab_size ( diva, divb, new_value )
    {
        // reset
	var colclass = "col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 " +
                       "order-1 order-2 d-none" ;
	$(diva).removeClass(colclass) ;
	$(divb).removeClass(colclass) ;

        // set
        switch (new_value)
        {
           case 0:    $(diva).addClass('col-12 order-1') ;
                      $(divb).addClass('col-12') ;
                      break ;

           case 1:    $(diva).addClass('d-none') ;
                      $(divb).addClass('col-12 order-2') ;
                      break ;

           case 13:   $(diva).addClass('col-12 order-1') ;
                      $(divb).addClass('d-none') ;
                      break ;

           case 14:   $(diva).addClass('col-12') ;
                      $(divb).addClass('col-12 order-2') ;
                      break ;

           default:   $(diva).addClass('col-' + (new_value-1)) ;   //  1,  2, 3, ...
                      $(divb).addClass('col-' + (13-new_value)) ;  // 11, 10, 9, ...
                      break ;
        }
    }

    //
    // Auxiliar function
    //

    // confirm exit
    function wepsim_confirm_exit ( e )
    {
	    wepsim_checkpoint_addCurrentToCache() ;

	    var confirmationMessage = "\o/";
	    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
	    return confirmationMessage;                            // Webkit, Safari, Chrome
    }

    // alert reload
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

	    // set wepsim version
	    $("div.wsversion").replaceWith(get_cfg('version'));

	    // tooltip: trigger by hover
	    $('[data-bs-toggle="tooltip"]').tooltip({
		    trigger:   'hover',
		    sanitizeFn: function (content) {
				   return content ; // DOMPurify.sanitize(content) ;
				}
	    }) ;

	    // help popover...
	    var popover_cfg = {
		   placement: 'bottom',
		   animation: false,
		   trigger:   'focus, hover',
		   delay: { "show": 500, "hide": 100 },
		   sanitizeFn: function (content) {
				   return content ; // DOMPurify.sanitize(content) ;
			       }
	        } ;
            wepsim_popovers_init('a[data-bs-toggle="popover1"]', popover_cfg, null) ;

	    // init: quick-menus
            wepsim_quickcfg_init('pop1') ;

	    // init: dbg_asm
            showhideAsmElements() ;

	    // initialize editors
	    inputfirm_cfg = sim_cm_get_firmcfg() ;
	    inputfirm     = sim_init_editor("inputFirmware", inputfirm_cfg) ;

	    inputasm_cfg  = sim_cm_get_asmcfg() ;
	    inputasm      = sim_init_editor("inputAssembly", inputasm_cfg) ;

	    // init: voice
	    wepsim_voice_init() ;
	    if (false == get_cfg('use_voice')) {
		wepsim_voice_stop() ;
	    }
    }

       function wepsim_init_default_preloadFromHash ( url_hash )
       {
            // Preload from hash...
            var o = wepsim_preload_fromHash(url_hash) ;

            // ...And to notify of the preloaded work to the user
            if (o !== '')
            {
                o = 'WepSIM has been instructed to preload some work for you:<br>' +
                    '<ul>' + o + '</ul>' +
                    'To close this notification please press in the ' +
                    '<span class="btn btn-sm btn-info py-0" data-bs-dismiss="alert">X</span> mark. <br>' +
                    'In order to execute an example please press the ' +
                    '<span class="btn btn-sm btn-info py-0" ' +
                    '      onclick="webui_executionbar_toggle_play(\'exebar1\');">Run</span> ' +
                    'button.<br>' ;

                if (url_hash.notify.toLowerCase() !== 'false') {
                    wepsim_notify_close() ;
                    wepsim_notify_do_notify('WepSIM preloads some work', o, 'info', 0) ;
                }
            }
       }

    function wepsim_init_default ( )
    {
	    // Get URL params
            var url_hash = wepsim_preload_get2hash(window.location,
                                                   wepsim_init_default_preloadFromHash) ;

	    // 1.- Pre-load defaults

	       // 1.A.- Pre-load hardware...
	       simhw_hwset_init() ;
	       simcore_init_hw('ep') ;

	       // 1.B.- Pre-load examples
               var ws_examples_index_url = get_cfg('example_url') ;
               wepsim_example_loadSet(ws_examples_index_url) ;

	       // 1.C.- Pre-load UI configuration
               cfgset_init() ;

	    // 2.- Restore configuration

	       // 2.A.- Restore UI
               wepsim_uicfg_restore() ;

	       // 2.B.- Set mode
	       var ws_mode = get_cfg('ws_mode');
	       wsweb_select_main(ws_mode) ;
	       if (simhw_active() !== null) {
	      	   simcore_reset();
	       }

	       // 2.C.- Init recording
	       simcore_record_init('record_msg', 'record_pb') ;
               simcore_record_captureInit() ;

	    // Load/Configuration following URL params
            wepsim_init_default_preloadFromHash(url_hash) ;
    }

    function wepsim_init_PWA ( )
    {
            // progressive web application
	    if ( (false == is_mobile()) && ('serviceWorker' in navigator) )
            {
		navigator.serviceWorker.register('min.wepsim_web_pwa.js').catch(function()
                {
		    wepsim_notify_warning("<h4>Warning:" +
		  		          "<br/>WepSIM was used over a HTTP connection.</h4>",
		                          "Progressive Web Applications requires a HTTPS connection " +
		                          "with a valid certificate, so PWA is disabled.<br/>" +
		                          "Please use the 'x' to close this notification.") ;
		}) ;
	    }
    }

    function wepsim_init_firefoxOS ( )
    {
            // Firefox OS
	    if ('mozApps' in navigator)
	    {
		    var manifest_url = location.href + 'manifest.webapp';
		    var installCheck = navigator.mozApps.checkInstalled(manifest_url);
		    installCheck.onsuccess = function()
		    {
		        if (!installCheck.result)
		        {
			      var installLocFind = navigator.mozApps.install(manifest_url);
			      installLocFind.onsuccess = function(data) {
				  wepsim_notify_success('<h4>Info:<br/></h4>',
					                'WepSIM was installed.');
			      } ;
			      installLocFind.onerror = function() {
				  wepsim_notify_error('<h4>Warning:<br/>' + installLocFind.error.name + '</h4>',
						      'FirefoxOS/KaiOS installation was cancelled.') ;
			      } ;
		        }
		    } ;
            }
    }

