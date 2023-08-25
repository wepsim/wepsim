/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
    // WepSIM Dialog
    //

    wsweb_dialogs = {

         load_save_assembly: {
            id:        "lssvasm",
	    title:     function() {
                          return wepsim_config_dialog_title("Load/Save Assembly",
                                                            "secondary",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('dialogs', ws_idiom);") ;
		       },
            body:      function() {
		         return "<div id='scroller-lssvasm' class='container-fluid p-0' " +
	           	        "     style='overflow:auto; -webkit-overflow-scrolling:touch;'> " +
                               "<div class='row m-0'>" +
                               "<div class='col-12 col-sm-4 p-2'>" +
                                "<ws-share-link " +
                                "    fid='inputToShareAs2' " +
                                "    jshare='asm' " +
                                "></ws-share-link>" +
                               "</div>" +
                               "<div class='col-12 col-sm-4 p-2'>" +
                                "<ws-save-file " +
                                "    fid='inputFileNameToSaveAs2' " +
                                "    jsave='var ifntsa2 = document.getElementById(\"inputFileNameToSaveAs2\");" +
				"	     var fileNameToSaveAs = ifntsa2.value;" +
				"	     var textToWrite      = inputasm.getValue();" +
				"	     wepsim_save_to_file(textToWrite, fileNameToSaveAs);" +
		                "            inputasm.is_modified = false;" +
                                "            return false;'" +
                                "></ws-save-file>" +
                               "</div>" +
                               "<div class='col-12 col-sm-4 p-2'>" +
                                "<ws-load-file " +
                                "    fid='fileToLoad2' " +
                                "    jload='var ftl = document.getElementById(\"fileToLoad2\").files[0];" +
                                "           wepsim_file_loadFrom(ftl, " +
                                "		                 function(txt){ " +
                                "		             inputasm.setValue(txt);" +
    				"                            wsweb_dialog_close(\"load_save_assembly\");" +
			        "		             wepsim_notify_success(\"<strong>INFO</strong>\", \"Loaded!.\") ; " +
                                "		                              });" +
                                "           return false;'></ws-load-file>" +
                               "</div>" +
                               "</div>" +
			       "</div>" ;
	              },
	    buttons:  {
			 close: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
				callback:  function() {
    					       wsweb_dialog_close('load_save_assembly') ;
					   }
			 }
	              },
            size:     'large',
            onshow:   function() {
			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#scroller-lssvasm') ;
			 simcore_record_captureInit() ;
		      }
         },

         load_save_firmware: {
	    id:       "lssvfir",
	    title:    function() {
                          return wepsim_config_dialog_title("Load/Save Firmware",
                                                            "secondary",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('dialogs', ws_idiom);") ;
		      },
            body:     function() {
		         return "<div id='scroller-lssvfir' class='container-fluid p-0' " +
	           	        "     style='overflow:auto; -webkit-overflow-scrolling:touch;'> " +
                               "<div class='row m-0'>" +
                               "<div class='col-12 col-sm-4 p-2'>" +
                                "<ws-share-link " +
                                "    fid='inputToShareAs2' " +
                                "    jshare='mc' " +
                                "></ws-share-link>" +
                               "</div>" +
                               "<div class='col-12 col-sm-4 p-2'>" +
		                "<div class='card border-secondary h-100'>" +
			        "<div class='card-header border-secondary text-white bg-secondary p-1'>" +
		                "  <h5 class='m-0'>" +
				"  <span class='text-white bg-secondary' data-langkey='Output'>Output</span>" +
                                "<div class='btn-group float-end'>" +
				"  <button class='btn bg-body-tertiary mx-1 py-0 col-auto' " +
                                "          onclick='var fileNameToSaveAs  = document.getElementById(\"inputFileNameToSaveAs\").value;" +
		                "                   var textToWrite       = inputfirm.getValue();" +
		                "                   wepsim_save_to_file(textToWrite, fileNameToSaveAs);" +
		                "                   inputfirm.is_modified = false;" +
				"		    return false;'" +
                                "><span data-langkey='Save'>Save</span></button>" +
                                "  <button type='button' class='btn bg-body-tertiary dropdown-toggle dropdown-toggle-split' " +
                                "          data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                                "    <span class='visually-hidden sr-only'>Toggle Dropdown</span>" +
                                "  </button>" +
                                "  <div class='dropdown-menu'>" +
                                "    <h6 class='dropdown-header'>Default:</h6>" +
				"    <a class='dropdown-item' href='#' " +
				"       onclick='var fileNameToSaveAs = document.getElementById(\"inputFileNameToSaveAs\").value;" +
		                "                var textToWrite      = inputfirm.getValue();" +
		                "                wepsim_save_to_file(textToWrite, fileNameToSaveAs);" +
				"	         return false;'" +
                                "     ><span data-langkey='Save editor content'>Save editor content</span></a>" +
				"<div class='dropdown-divider'></div>" +
                                "    <h6 class='dropdown-header'>Optional:</h6>" +
				"    <a class='dropdown-item' href='#' " +
				"       onclick='wsweb_save_controlmemory_to_file();" +
				"	         return false;'" +
				"     ><span data-langkey='Save control memory'>Save control memory</span></a>" +
                                "  </div>" +
                                "</div>" +
                                //
		               	"  </h5>" +
			      	"</div>" +
			      	" <div class='card-body'>" +
		                "<label for='inputFileNameToSaveAs'><em><span data-langkey='Please write the file name'>Please write the file name</span>:</em></label>" +
	                        "<p><input aria-label='filename to save content' id='inputFileNameToSaveAs'" +
                                "          class='form-control btn-outline-secondary' placeholder='File name where microcode will be saved' style='min-width: 90%;'/></p>" +
			     	" </div>" +
			   	"</div>" +
                               "</div>" +
                               "<div class='col-12 col-sm-4 p-2'>" +
                                "<ws-load-file " +
                                "    fid='fileToLoad' " +
                                "    jload='var ftl = document.getElementById(\"fileToLoad\").files[0];" +
                                "           wepsim_file_loadFrom(ftl, " +
                                "		                 function(txt){ " +
                                "		             inputfirm.setValue(\"Please wait...\");" +
    				"                            wsweb_dialog_close(\"load_save_firmware\");" +
                                "		             inputfirm.setValue(txt);" +
			        "		             wepsim_notify_success(\"<strong>INFO</strong>\", \"Loaded!.\") ; " +
                                "		                              });" +
                                "           return false;'></ws-load-file>" +
                               "</div>" +
                               "</div>" +
			   	"</div>" ;
		      },
	    buttons:  {
			 close: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
				callback:  function() {
    					       wsweb_dialog_close('load_save_firmware') ;
					   }
			 }
	              },
            size:     'large',
            onshow:   function() {
		         // dropify
			 $('.dropify').dropify() ;

			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#scroller-lssvfir') ;
			 simcore_record_captureInit() ;
		      }
         },

         flash_assembly: {
            id:        "flashasm",
	    title:     function() {
                          return wepsim_config_dialog_title("Flash Assembly",
                                                            "secondary",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('dialogs', ws_idiom);") ;
		       },
            body:      function() {
		         return "<div id='scroller-flashasm' class='container-fluid p-0' " +
	           	        "     style='overflow:auto; -webkit-overflow-scrolling:touch;'> " +
                               "<div class='row m-0'>" +
                               "<div class='col-12 p-2'>" +
                                '<ws-flash_asm>' +
                                '</ws-flash_asm>' +
                               "</div>" +
                               "</div>" +
			   	"</div>" ;
	              },
	    buttons:  {
			 close: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
				callback:  function() {
    					       wsweb_dialog_close('flash_assembly') ;
					   }
			 }
	              },
            size:     'large',
            onshow:   function() {
			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#scroller-flashasm') ;
			 simcore_record_captureInit() ;
		      }
         },

	 // binary_asm
         binary_asm: {
            id:      "bin_asm",
	    title:   function() {
                          return wepsim_config_dialog_title("Binary",
                                                            "secondary",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('dialogs', ws_idiom);") ;
		     },
            body:    function() {
		        return "<div id='scroller-bin2a' class='container-fluid p-1'>" +
	           	       "<ws-bin_asm></ws-bin_asm>" +
		               "</div>" ;
		     },
	    buttons: {
			OK: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('binary_asm') ;
				           }
			     }
	             },
            size:    'large',
            onshow:  function() {
                         // get binary
			 var simware = wepsim_get_binary_code() ;
			 if (null == simware) {
                             setTimeout(function() {
                                wsweb_dialog_close('binary_asm') ;
                             }, 50) ;
			     return ;
			 }

			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

                         // show binary
                         setTimeout(function() {
                            $('#bin_asm').modal('handleUpdate') ;
			    wsweb_scroll_record('#scroller-bin2a') ;
			    simcore_record_captureInit() ;
                         }, 10);
		     }
         },

	 // binary_fir
         binary_fir: {
            id:      "bin_fir",
	    title:   function() {
                          return wepsim_config_dialog_title("Binary",
                                                            "secondary",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('dialogs', ws_idiom);") ;
		     },
            body:    function() {
		        return "<div id='scroller-bin2b' class='container-fluid p-1'>" +
	           	       "<ws-bin_mc></ws-bin_mc>" +
		               "</div>" ;
		     },
	    buttons: {
			OK: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('binary_fir') ;
				           }
			     }
	             },
            size:    'extra-large',
            onshow:  function() {
                         // get binary
			 var simware = wepsim_get_binary_microcode() ;
			 if (null == simware) {
                             setTimeout(function() {
                                           wsweb_dialog_close('binary_fir');
                             }, 50) ;
			     return ;
			 }

			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

                         // show binary
                         setTimeout(function() {
                                       // binmc_load_mc2html(simware) ;
                                       $('#bin_fir').modal('handleUpdate') ;
			               wsweb_scroll_record('#scroller-bin2b') ;
			               simcore_record_captureInit() ;
                         }, 50) ;
		     }
         },

	 // authors
         about: {
            id:      "about1",
	    title:    function() {
                          return wepsim_config_dialog_title("About WepSIM",
                                                            "secondary",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('dialogs', ws_idiom);") ;
		      },
            body:    function() {
		        return "<div id='scroller-about1' " +
                               "     class='container-fluid p-1' style='max-height:80vh; '>" +
			       "<ws-about name='about1'></ws-about>" +
			       "</div>" ;
		     },
	    buttons: {
			OK: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('about') ;
				           }
			     }
	             },
            size:    'large',
            onshow:  function() {
			 $('div.wsversion').replaceWith(get_cfg('version')) ;

			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#scroller-about1') ;
			 simcore_record_captureInit() ;
		     }
         },

	 // notifications
         notifications: {
            id:       "notifications3",
	    title:    function() {
                          return wepsim_config_dialog_title("Notifications",
                                                            "secondary",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('cfg');") ;
		      },
            body:     function() {
		         return "<ws-notifications></ws-notifications>" ;
		      },
	    buttons:  {
			Close: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
			        callback:  function() {
    					       wsweb_dialog_close('notifications') ;
				           }
			       }
	             },
            size:    'large',
            onshow:  function() {
			 $("#scroller-notifications3").scrollTop(0) ;

		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
			 i18n_update_tags('cfg') ;

			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#scroller-notifications3') ;
			 simcore_record_captureInit() ;
		     }
         },

	 // examples
         examples: {
            id:      "example1",
	    title:    function() {
                          return wepsim_config_dialog_title("Examples",
                                                            "primary",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('examples', ws_idiom);") ;
		      },
            body:    function() {
                        return "<ws-examples id='examples1'></ws-examples>" ;
		     },
	    buttons: {
			Index: {
			   label:     '<i class="fas fa-list"></i> ' +
                                      '<span data-langkey="Example sets">Example sets</span>',
			   className: 'btn btn-info text-white btn-sm col col-sm-4 float-end shadow-none',
			   callback:  function() {
				         // ui elements
                                         table_examplesets_html('#examples1-scroller', ws_info.example_set) ;

			 		 // uicfg and events
                                         wepsim_uicfg_apply() ;
	    	 	                 simcore_record_captureInit() ;

					 return false ;
				      }
			},
			OK: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('examples') ;
				           }
			     }
	             },
            size:    'extra-large',
            onshow:  function() {
		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('examples', ws_idiom) ;

			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#scroller-example1') ;
			 simcore_record_captureInit() ;
		     }
         },

	 // config
         config: {
            id:      "config2",
	    title:    function() {
                          return wepsim_config_dialog_title("Configuration",
                                                            "primary",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('cfg', ws_idiom);") ;
		      },
            body:    function() {
                        return "<ws-config id='config2'></ws-config>" ;
		     },
	    buttons: {
			Reset: {
			   label:     "<span data-langkey='Reset'>Reset</span>",
			   className: "btn btn-outline-info btn-sm col col-sm-3 float-start shadow-none me-auto",
			   callback:  function() {
		         		 // confirm reset
    					 wsweb_dialog_close('config') ;
    					 wsweb_dialog_open('cfg_confirm_reset') ;

					 return false ;
				      }
			},
			OK: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('config') ;
				           }
			     }
	             },
            size:    'large',
            onshow:  function() {
                         setTimeout(function() {
                                       $("#config2-scroller").scrollTop(0);
                         }, 50);

		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('cfg', ws_idiom) ;

			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#config2-scroller') ;
			 simcore_record_captureInit() ;
		     }
         },

	 cfg_confirm_reset: {
		id:      'config_confirm_reset',
		title:   function() {
			     var wsi = get_cfg('ws_idiom') ;
			     return i18n_get('dialogs', wsi, 'Confirm reset configuration...') ;
			 },
		body:    function() {
			     var wsi = get_cfg('ws_idiom') ;

			     return '<div class="container">' +
			            '<div class="row py-2">' +
			            '<div class="col-auto p-2">' +
                                    '<i class="fas fa-trash-restore-alt mx-auto" style="font-size:10vw;"></i>' +
				    '</div>' +
			            '<h4 class="col p-3 align-self-center">' +
			            i18n_get('dialogs', wsi, 'Close or Reset...') +
				    '</h4>' +
				    '</div>' +
				    '</div>' ;
			 },
		buttons: {
				reset: {
				   label:     "<span data-langkey='Reset'>Reset</span>",
				   className: 'btn-danger col float-start',
				   callback: function() {
						// reset
						reset_cfg() ;
						wepsim_notify_success('<strong>INFO</strong>',
								      'Configuration reset done!.') ;
						// ui elements
						wsweb_dialog_open('config') ;

						return true;
					     },
				},
				close: {
				   label:     '<i class="fa fa-times me-2"></i>' +
					      '<span data-langkey="Close">Close</span>',
				   className: 'btn-dark col float-end'
				}
			 },
		size:    '',
		onshow:  function() {
			    // ui lang
			    var ws_idiom = get_cfg('ws_idiom') ;
			    i18n_update_tags('dialogs', ws_idiom) ;

			    simcore_record_captureInit() ;
			 }
         },

	 // help
         help: {
            id:      "help1",
	    title:    function() {
                          return wepsim_config_dialog_title("Help",
                                                            "success",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('help', ws_idiom);") ;
		      },
            body:    function() {
                        return "<ws-help id='help1_ref'></ws-help>" ;
	             },
	    buttons: {
			Index: {
			   label:     '<i class="fas fa-list"></i> ' +
                                      '<span data-langkey="Help Index">Help Index</span>',
			   className: 'btn btn-success btn-sm col col-sm-3 float-end shadow-none',
			   callback:  function() {
				         // ui elements
				         wepsim_help_set('code', 'index') ;

			 		 // uicfg and events
                                         wepsim_uicfg_apply() ;
	    	 	                 simcore_record_captureInit() ;

					 return false ;
				      }
			},
			OK: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
			        callback:  function() {
		                              simcore_record_append_pending() ;
    					      wsweb_dialog_close('help') ;
				           }
			}
	             },
            size:    'extra-large',
            onshow:  function() {
		         // ui elements
    			 wepsim_help_set('code', 'index') ;

		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('help', ws_idiom) ;

			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#scroller-help1') ;
			 simcore_record_captureInit() ;
		     }
         },

	 rec_confirm_reset: {
		id:      'record_confirm_reset',
		title:   function() {
			     var wsi = get_cfg('ws_idiom') ;
			     return i18n_get('dialogs', wsi, 'Confirm remove record...') ;
			 },
		body:    function() {
			     var wsi = get_cfg('ws_idiom') ;
			     return i18n_get('dialogs', wsi, 'Close or Reset...') ;
			 },
		buttons: {
				reset: {
				   label:     "<span data-langkey='Reset'>Reset</span>",
				   className: 'btn-danger col float-start',
				   callback: function() {
						wsweb_record_reset();
						return true;
					     },
				},
				close: {
				   label:     '<i class="fa fa-times me-2"></i>' +
					      '<span data-langkey="Close">Close</span>',
				   className: 'btn-dark col float-end'
				}
			 },
		size:    '',
		onshow:  function() {
			    // ui lang
			    var ws_idiom = get_cfg('ws_idiom') ;
			    i18n_update_tags('dialogs', ws_idiom) ;

			    simcore_record_captureInit() ;
			 }
         },

	 // state
         state: {
            id:      "current_state1",
	    title:    function() {
                          return wepsim_config_dialog_title("State",
                                                            "dark",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('dialog', ws_idiom);") ;
		      },
            body:    function() {
                        return "<ws-states></ws-states>" ;
	             },
	    buttons: {
			OK: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('state') ;
				           }
			}
	             },
            size:    'large',
            onshow:  function() {
		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('states', ws_idiom) ;

			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

	    	 	 simcore_record_captureInit() ;
		     }
         },

	 current_checkpoint: {
		id:      'current_checkpoint1',
		title:   function() {
                             return wepsim_config_dialog_title("Checkpoint",
                                                               "secondary",
							       "var ws_idiom = get_cfg('ws_idiom');" +
							       "i18n_update_tags('dialog', ws_idiom);") ;
			 },
		body:    function() {
                             var now = new Date().toLocaleString() ;

                             return "<div class='row m-0'>" +
                                    "   <div class='col-12 col-sm-4 p-2'>" +
                                    "   <ws-save-file " +
                                    "     fid='FileNameToSaveAs1' " +
                                    "	  jsave='wepsim_notify_success(\"<strong>INFO</strong>\", " +
                                    "                                 \"Processing save request...\");" +
                                    "		  var obj_tagName   = document.getElementById(\"tagToSave1\") ;" +
                                    "		  var checkpointObj = wepsim_checkpoint_get(obj_tagName.value);" +
                                    "		  wepsim_checkpoint_save(\"FileNameToSaveAs1\", " +
                                    "                                    \"tagToSave1\", checkpointObj);" +
                                    "             return false;'" +
                                    "	  jshare='wepsim_notify_success(\"<strong>INFO</strong>\", " +
                                    "                                   \"Processing share request...\");" +
                                    "		  var obj_tagName   = document.getElementById(\"tagToSave1\") ;" +
                                    "		  var checkpointObj = wepsim_checkpoint_get(obj_tagName.value);" +
                                    "		  wepsim_checkpoint_share(\"FileNameToSaveAs1\", " +
                                    "                                     \"tagToSave1\", checkpointObj);" +
                                    "             return false;'" +
                                    "   ></ws-save-file>" +
                                    "   <input aria-label='associated tag to be saved' id='tagToSave1'" +
                                    "          class='form-control btn-outline-secondary' " +
                                    "          type='hidden' " +
                                    "          value='" + now + "' " +
                                    "          placeholder='Associated tag to be saved (if any)' " +
                                    "          style='min-width: 90%;'/>" +
                                    "   </div>" +
                                    "   <div class='col-12 col-sm-4 p-2'>" +
                                    "    <ws-load-file " +
                                    "        fid='fileToLoad31' " +
                                    "	     jload='var ret = wepsim_checkpoint_load(\"fileToLoad31\") ;" +
                                    "		    if (ret) {" +
                                    "		        wsweb_dialog_close(\"current_checkpoint\") ;" +
                                    "		        wepsim_notify_success(\"<strong>INFO</strong>\", " +
                                    "                                         \"Processing load request...\") ;" +
                                    "		    }" +
                                    "		    return false;'></ws-load-file>" +
                                    "   </div>" +
                                    "   <div class='col-12 col-sm-4 p-2'>" +
                                    "   <div class='card border-secondary h-100'>" +
                                    "      <div class='card-header border-secondary text-white bg-secondary p-1'>" +
                                    "	  <h5 class='m-0'>" +
                                    "	    <span class='text-white bg-secondary' data-langkey='Browser cache'>Browser cache</span>" +
                                    "	    <button class='btn bg-body-tertiary mx-1 float-end py-0 col-auto'" +
                                    "		    onclick='var ret = wepsim_checkpoint_loadFromCache(\"browserCacheElto\");" +
                                    "			     wsweb_dialog_close(\"current_checkpoint\");" +
                                    "			     if (ret.error)" +
                                    "				  wepsim_notify_success(\"<strong>INFO</strong>\", ret.msg);" +
                                    "			     else wepsim_notify_success(\"<strong>INFO</strong>\", \"Processing load request...\");" +
                                    "			     return false;'><span data-langkey='Load'>Load</span></button>" +
                                    "		  <div class='dropdown float-end'>" +
                                    "		    <button class='btn bg-body-tertiary text-danger py-0 mx-1 float-end col-auto dropdown-toggle' " +
                                    "			    type='button' id='resetyn2' data-bs-toggle='dropdown' " +
                                    "			    aria-haspopup='true' aria-expanded='false' " +
                                    "			    ><span data-langkey='Reset'>Reset</span></button>" +
                                    "		    </button>" +
                                    "		    <div class='dropdown-menu' aria-labelledby='resetyn2'>" +
                                    "		     <a class='dropdown-item py-2 bg-body text-danger' type='button' " +
                                    "			onclick='wepsim_checkpoint_clearCache();" +
                                    "				 wepsim_checkpoint_listCache(\"browserCacheList1\");" +
                                    "				 return false;'" +
                                    "			 ><span data-langkey='Yes'>Yes</span></a>" +
                                    "		      <div class='dropdown-divider'></div>" +
                                    "		      <a class='dropdown-item py-2 bg-body text-info' type='button' " +
                                    "			 ><span data-langkey='No'>No</span></a>" +
                                    "		    </div>" +
                                    "		  </div>" +
                                    "	  </h5>" +
                                    "      </div>" +
                                    "      <div class='card-body'>" +
                                    "		<label for='browserCacheList1' class='collapse7'><em><span data-langkey='Session to be restore'>Session to be restore</span>:</em><br></label>" +
                                    "		<div id='browserCacheList1'" +
                                    "		     style='max-height:40vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;'>&lt;Empty&gt;</div>" +
                                    "      </div>" +
                                    "   </div>" +
                                    "   </div>" +
                                    "</div>" ;

			 },
		buttons: {
			     close: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('current_checkpoint') ;
				           }
			     }
			 },
		size:    'extra-large',
		onshow:  function() {
                                 // update content
	                         wepsim_checkpoint_listCache('browserCacheList1');
			         $('.dropify').dropify() ;
				 $('#current_checkpoint1').modal('handleUpdate') ;

				 // ui lang
				 var ws_idiom = get_cfg('ws_idiom') ;
				 i18n_update_tags('dialog', ws_idiom) ;

				 // uicfg and events
                                 wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
				 wepsim_uicfg_apply() ;

				 simcore_record_captureInit() ;
			 }
         },

	 // reload
         reload: {
            id:      "reload1",
	    title:    function() {
                          return wepsim_config_dialog_title("Reload",
                                                            "danger",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('dialogs', ws_idiom);") ;
		      },
            body:    function() {
		        var o = '<div id="scroller-reload1" class="row m-0">' +
                                '<ws-list-cfg       class="col-12 col-sm-4 p-2"></ws-list-cfg>' +
                                '<ws-list-example   class="col-12 col-sm-4 p-2"></ws-list-example>' +
                                '<ws-list-processor class="col-12 col-sm-4 p-2"></ws-list-processor>' +
                                '</div>' ;

		        return o ;
		     },
	    buttons: {
			OK: {
				label:     '<i class="fa fa-times me-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-end shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('reload') ;
				           }
			     }
	             },
            size:    'large',
            onshow:  function() {
			 // uicfg and events
                         wepsim_tooltips_hide('[data-bs-toggle=tooltip]') ;
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#scroller-reload1') ;
			 simcore_record_captureInit() ;
		     }
         }

    } ;

