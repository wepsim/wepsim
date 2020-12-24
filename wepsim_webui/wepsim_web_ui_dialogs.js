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
                               "<div class='col-12 col-sm-6 p-2'>" +
                                "<ws-save-file " +
                                "    fid='inputFileNameToSaveAs2' " +
                                "    jsave='var ifntsa2 = document.getElementById(\"inputFileNameToSaveAs2\");" +
				"	     var fileNameToSaveAs = ifntsa2.value;" +
				"	     var textToWrite      = inputasm.getValue();" +
				"	     wepsim_save_to_file(textToWrite, fileNameToSaveAs);" +
		                "            inputasm.is_modified = false;" +
                                "            return false;'" +
                                "    jshare='var sorg   = \"assembly\"; " +
                                "            var stitle = \"Assembly code...\"; " +
                                "            var stext  = inputasm.getValue(); " +
                                "            var surl   = \"\"; " +
                                "            share_information(sorg, stitle, stext, surl); " +
                                "            return false;'" +
                                "></ws-save-file>" +
                               "</div>" +
                               "<div class='col-12 col-sm-6 p-2'>" +
                                "<ws-load-file " +
                                "    fid='fileToLoad2' " +
                                "    jload='var ftl = document.getElementById(\"fileToLoad2\").files[0];" +
                                "           wepsim_file_loadFrom(ftl, " +
                                "		                 function(txt){ inputasm.setValue(txt); });" +
                                "           return false;'></ws-load-file>" +
                               "</div>" +
                               "</div>" +
			   	"</div>" ;
	              },
	    buttons:  {
			 close: {
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
				callback:  function() {
    					       wsweb_dialog_close('load_save_assembly') ;
					   }
			 }
	              },
            size:     'large',
            onshow:   function() {
			 var o = $("#lssvasm") ;
		         o.find('.modal-header').attr("style", "background-color: black !important") ;
			 o.find('.modal-title').addClass("ml-auto") ;

			 // uicfg and events
			 $('[data-toggle=tooltip]').tooltip('hide');
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
                               "<div class='col-12 col-sm-6 p-2'>" +
		                "<div class='card border-secondary h-100'>" +
			        "<div class='card-header border-secondary text-white bg-secondary p-1'>" +
		                "  <h5 class='m-0'>" +
				"  <span class='text-white bg-secondary' data-langkey='Output'>Output</span>" +
                                //
                                "<div class='btn-group float-right'>" +
				"  <button class='btn btn-light mx-1 py-0 col-auto' " +
                                "          onclick='var fileNameToSaveAs  = document.getElementById(\"inputFileNameToSaveAs\").value;" +
		                "                   var textToWrite       = inputfirm.getValue();" +
		                "                   wepsim_save_to_file(textToWrite, fileNameToSaveAs);" +
		                "                   inputfirm.is_modified = false;" +
				"		    return false;'" +
                                "><span data-langkey='Save'>Save</span></button>" +
                                "  <button type='button' class='btn btn-light dropdown-toggle dropdown-toggle-split' " +
                                "          data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                                "    <span class='sr-only'>Toggle Dropdown</span>" +
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
                                "          class='form-control btn-outline-dark' placeholder='File name where microcode will be saved' style='min-width: 90%;'/></p>" +
			     	" </div>" +
			   	"</div>" +
                               "</div>" +
                               "<div class='col-12 col-sm-6 p-2'>" +
                                "<ws-load-file " +
                                "    fid='fileToLoad' " +
                                "    jload='var ftl = document.getElementById(\"fileToLoad\").files[0];" +
                                "           wepsim_file_loadFrom(ftl, " +
                                "		                 function(txt){ inputfirm.setValue(txt); });" +
                                "           return false;'></ws-load-file>" +
                               "</div>" +
                               "</div>" +
			   	"</div>" ;
		      },
	    buttons:  {
			 close: {
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
				callback:  function() {
    					       wsweb_dialog_close('load_save_firmware') ;
					   }
			 }
	              },
            size:     'large',
            onshow:   function() {
			 var o = $("#lssvfir") ;
		         o.find('.modal-header').attr("style", "background-color: black !important") ;
			 o.find('.modal-title').addClass("ml-auto") ;

		         // dropify
			 $('.dropify').dropify() ;

			 // uicfg and events
			 $('[data-toggle=tooltip]').tooltip('hide');
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#scroller-lssvfir') ;
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
		        return "<div id='scroller-bin2a' class='container-fluid p-1' " +
           		       "     style='max-height:70vh; max-width:100%; overflow:auto; -webkit-overflow-scrolling:touch;'> " +
	           	       "     <ws-bin_asm></ws-bin_asm>" +
		               "</div>" ;
		     },
	    buttons: {
			OK: {
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
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
                             setTimeout(function() { wsweb_dialog_close('binary_asm'); }, 50) ;
			     return ;
			 }

			 // uicfg and events
			 $('[data-toggle=tooltip]').tooltip('hide') ;
			 wepsim_uicfg_apply() ;

                         // show binary
                         setTimeout(function(){
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
		        return "<div id='scroller-bin2b' class='container-fluid p-1' " +
           		       "     style='max-height:70vh; max-width:100%; overflow:auto; -webkit-overflow-scrolling:touch;'> " +
	           	       "     <ws-bin_mc></ws-bin_mc>" +
		               "</div>" ;
		     },
	    buttons: {
			OK: {
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
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
                             setTimeout(function() { wsweb_dialog_close('binary_fir'); }, 50) ;
			     return ;
			 }

			 // uicfg and events
			 $('[data-toggle=tooltip]').tooltip('hide') ;
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
		        return "<div id='scroller-about1' class='container-fluid p-1'" +
			       "     style='max-height:80vh; '>" +
			       "     <form>" +
			       "	<div class='form-group m-0'>" +
			       "	   <label for='about_license' class='text-secondary'>License:</label>" +
			       "	   <span class='text-primary'" +
			       "                 onclick='wepsim_help_set_relative('about#');" +
			       "                          wepsim_help_refresh();" +
			       "		          wsweb_dialog_close('about');" +
			       "			  return false;'>GNU Lesser General Public 3</span>" +
			       "	</div>" +
			       "	<div class='form-group'>" +
			       "	   <label for='about_authors' class='text-secondary'>Authors:</label>" +
			       "	   <ws-authors></ws-authors>" +
			       "	</div>" +
			       "     </form>" +
			       "</div>" ;
		     },
	    buttons: {
			OK: {
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('about') ;
				           }
			     }
	             },
            size:    '',
            onshow:  function() {
			 $('div.wsversion').replaceWith(get_cfg('version')) ;

			 // uicfg and events
			 $('[data-toggle=tooltip]').tooltip('hide');
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
		         var notifications      = simcore_notifications_get() ;
		         var notifications_html = table_notifications_html(notifications) ;

		         return "<div class='card border-secondary h-100'>" +
			        "<div class='card-header border-light text-secondary bg-light p-1'>" +
		                "  + <span data-langkey='Recent'>Recent</span>" +
                                "  <div class='dropdown float-right'>" +
                                "   <button class='btn btn-sm btn-outline-secondary text-danger py-1 dropdown-toggle' " +
                                "            type='button' id='resetyn' data-toggle='dropdown' " +
                                "            aria-haspopup='true' aria-expanded='false' " +
				"            ><span data-langkey='Reset'>Reset</span></button>" +
                                "   </button>" +
                                "    <div class='dropdown-menu' aria-labelledby='resetyn'>" +
                                "     <a class='dropdown-item py-2 bg-white text-danger' type='button' " +
                                "        onclick='simcore_notifications_reset(); " +
				"		  var notifications = simcore_notifications_get(); " +
				"	          var ntf_html = table_notifications_html(notifications); " +
				"		  $(\"#scroller-notifications3\").html(ntf_html); " +
				"		  // reajust ui " +
				"		  wepsim_uicfg_apply(); " +
				"		  wsweb_scroll_record(\"#scroller-notifications3\"); " +
				"		  simcore_record_captureInit(); " +
				"		  return false;'" +
                                "         ><span data-langkey='Yes'>Yes</span></a>" +
				"      <div class='dropdown-divider'></div>" +
                                "      <a class='dropdown-item py-2 bg-white text-info' type='button' " +
                                "         ><span data-langkey='No'>No</span></a>" +
                                "    </div>" +
                                "  </div>" +
			      	"</div>" +
			      	"<div class='card-body p-1'>" +
		                " <div id='scroller-notifications3' class='container-fluid p-0' " +
	           	        "      style='overflow:auto; -webkit-overflow-scrolling:touch;'> " +
                                notifications_html +
                                " </div>" +
			     	"</div>" +
			        "<div class='card-footer border-light text-secondary bg-light p-1'>" +
		                "  - <span data-langkey='Recent'>Recent</span>" +
			     	" </div>" +
			   	"</div>" ;
		      },
	    buttons:  {
			Close: {
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
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
			 $('[data-toggle=tooltip]').tooltip('hide');
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
                                                            "info",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('examples', ws_idiom);") ;
		      },
            body:    function() {
                        return "<div id='scroller-example1' class='container-fluid p-0' " +
                               "     style='max-height:70vh; overflow:auto; -webkit-overflow-scrolling:touch;'>" +
                               table_examples_html(ws_examples) +
                               "</div>" ;
		     },
	    buttons: {
			OK: {
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('examples') ;
				           }
			     }
	             },
            size:    'large',
            onshow:  function() {
		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('examples', ws_idiom) ;

			 // uicfg and events
			 $('[data-toggle=tooltip]').tooltip('hide');
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
                        return "<div id='scroller-config2' class='container-fluid p-0' " +
                               "     style='max-height:70vh; overflow:auto; -webkit-overflow-scrolling:touch;'>" +
			       table_config_html(ws_config) +
                               "</div>" ;
		     },
	    buttons: {
			Reset: {
			   label:     "<span data-langkey='Reset'>Reset</span>",
			   className: "btn btn-outline-info btn-sm col col-sm-3 float-left shadow-none mr-auto",
			   callback:  function() {
		         		 // confirm reset
    					 wsweb_dialog_close('config') ;
    					 wsweb_dialog_open('cfg_confirm_reset') ;

					 return false ;
				      }
			},
			OK: {
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('config') ;
				           }
			     }
	             },
            size:    'large',
            onshow:  function() {
		         // ui elements
			 try
                         {
			     for (m=0; m<ws_config.length; m++) {
			          ws_config[m].code_init() ;
                             }
			 }
			 catch (e) {
			     reset_cfg() ;
			     for (m=0; m<ws_config.length; m++) {
			          ws_config[m].code_init() ;
                             }
                         }

			 $('a[data-toggle="popover1"]').popover({
				  placement:  'bottom',
				  trigger:    'focus, hover',
				  animation:  false,
				  delay:      { "show": 500, "hide": 100 },
				  sanitizeFn: function (content) {
						  return content ; // DOMPurify.sanitize(content) ;
					      }
			 }) ;
                         setTimeout(function() { $("#scroller-config2").scrollTop(0); }, 50);

		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('cfg', ws_idiom) ;

			 // uicfg and events
			 $('[data-toggle=tooltip]').tooltip('hide');
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#scroller-config2') ;
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
				   className: 'btn-danger col float-left',
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
				   label:     '<i class="fa fa-times mr-2"></i>' +
					      '<span data-langkey="Close">Close</span>',
				   className: 'btn-dark col float-right'
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
							    "wepsim_help_refresh();" +	
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('help', ws_idiom);") ;
		      },
            body:    function() {
                        return "<div id='help1_ref' style='display:none;'></div>" +
                               "<div class='ui-body-d ui-content p-0' id='scroller-help1' " +
                               "     style='min-height:50vh; max-height:70vh; overflow-y:auto; -webkit-overflow-scrolling:touch;'>" +
			       table_helps_html(ws_help) +
                               "</div>" ;
	             },
	    buttons: {
			Index: {
			   label:     '<i class="fas fa-list"></i> ' +
                                      '<span data-langkey="Help Index">Help Index</span>',
			   className: 'btn btn-success btn-sm col col-sm-3 float-right shadow-none',
			   callback:  function() {
		         		 // ui elements
    				         wepsim_help_set_relative('') ;
					 wepsim_help_refresh();

			 		 // uicfg and events
                                         wepsim_uicfg_apply() ;
	    	 	                 simcore_record_captureInit() ;

					 return false ;
				      }
			},
			OK: {
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
			        callback:  function() {
		                              simcore_record_append_pending() ;
    					      wsweb_dialog_close('help') ;
				           }
			}
	             },
            size:    'large',
            onshow:  function() {
		         // ui elements
    			 wepsim_help_set_relative('') ;
	    		 wepsim_help_refresh();

		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('help', ws_idiom) ;

			 // uicfg and events
			 $('[data-toggle=tooltip]').tooltip('hide') ;
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
				   className: 'btn-danger col float-left',
				   callback: function() {
						wsweb_record_reset();
						return true;
					     },
				},
				close: {
				   label:     '<i class="fa fa-times mr-2"></i>' +
					      '<span data-langkey="Close">Close</span>',
				   className: 'btn-dark col float-right'
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
                        return "<div class='card mb-1'>" +
                               "  <div class='card-header text-white bg-dark p-1' id='state_header_1'>" +
                               "    <h5 class='m-0'>" +
                               "	    <a data-toggle='collapse' href='#states3'><span class='text-white bg-dark' data-langkey='Current State'>Current State</span></a>:&nbsp;" +
                               "	    <span class='btn btn-light btn-sm float-right py-0'" +
                               "		  onclick='wepsim_state_history_add();" +
                               "			   wepsim_notify_success(\"<strong>INFO</strong>\", \"Added !.\");" +
                               "			   wepsim_state_history_list();" +
                               "			   wepsim_dialog_current_state();" +
                               "			   $(\"#states3\").collapse(\"show\");" +
                               "			   return false;'" +
                               "		  data-inline='true'><span data-langkey='Add'>Add</span> <span class='d-none d-sm-inline-flex'><span data-langkey=\"'Current State' to History\">'Current State' to History</span></span></span>" +
                               "    </h5>" +
                               "  </div>" +
                               "  <div id='states3b' class='collapse show' aria-labelledby='state_header_1'>" +
                               "    <div class='card-body p-1'>" +
                               "	<div class='container-fluid ml-1 pb-0 collapse show' id='states3'" +
                               "	     style='max-height:50vh; width:inherit;'>" +
                               "" +
                               "	     <div class='row mt-2'>" +
                               "	     <div class='col-auto text-center pr-0'>" +
                               "			<strong class='m-2'>" +
                               "			    <span class='badge badge-pill border-secondary border shadow'>" +
                               "				    <a class='col-auto p-0 text-decoration-none text-reset'" +
                               "				       data-toggle='collapse' data-target='#collapse_X'" +
                               "				       target='_blank' href='#' id='curr_clk_maddr'>now</a>" +
                               "			    </span>" +
                               "			</strong>" +
                               "	     </div>" +
                               "	     <div class='col-auto text-center pr-0 ml-2'>" +
                               "			<div class='btn-group float-left' role='group' aria-label='State information for now'>" +
                               "				  <button class='btn btn-outline-dark btn-sm col-auto float-right'" +
                               "					  onclick='wepsim_clipboard_CopyFromTextarea(\"end_state1\");" +
                               "						   wepsim_state_results_empty();" +
                               "						   var curr_tag = $(\"#curr_clk_maddr\").html();" +
                               "						   $(\"#s_clip\").html(curr_tag);" +
                               "						   return false;'" +
                               "					  data-inline='true'><span data-langkey='Copy'>Copy</span><span class='d-none d-sm-inline-flex'>&nbsp;<span data-langkey='to clipboard'>to clipboard</span></span></button>" +
                               "				  <button class='btn btn-outline-dark btn-sm col-auto float-right'" +
                               "					  onclick='var txt_chklst1 = get_clipboard_copy();" +
                               "						   var obj_exp1    = simcore_simstate_checklist2state(txt_chklst1);" +
                               "						   var txt_chklst2 = $(\"#end_state1\").val();" +
                               "						   var obj_exp2    = simcore_simstate_checklist2state(txt_chklst2);" +
                               "						   var ref_tag     = $(\"#curr_clk_maddr\").html();" +
                               "						   $(\"#s_ref\").html(ref_tag);" +
                               "						   wepsim_dialog_check_state(obj_exp1, obj_exp2);" +
                               "						   $(\"#check_results_scroll1\").collapse(\"show\");'" +
                               "					  type='button'><span data-langkey='Check'>Check</span> <span class='d-none d-md-inline-flex'><span data-langkey='differences with clipboard state'>differences with clipboard state</span></span></button>" +
                               "				  <button class='btn btn-outline-dark btn-sm col-auto float-right'" +
                               "					  data-toggle='collapse' data-target='#collapse_X'>&plusmn; <span data-langkey='Show'>Show</span></button>" +
                               "			</div>" +
                               "	     </div>" +
                               "	     </div>" +
                               "" +
                               "	     <div class='row'" +
                               "		  style='max-height:40vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;'>" +
                               "	     <div class='col p-1'>" +
                               "		<div id='collapse_X' class='mt-2 collapse show'>" +
                               "			<form id='end_state_form1'" +
                               "			      class='form-horizontal mb-2'" +
                               "			      style='white-space:wrap; overflow-y:auto; -webkit-overflow-scrolling:touch; width:100%;'>" +
                               "			   <label class='my-0' for='end_state1'>state:</label>" +
                               "			   <textarea aria-label='current_state'" +
                               "				     placeholder='Default...'" +
                               "				     id='end_state1'" +
                               "				     name='end_state1'" +
                               "				     data-allowediting='true'" +
                               "				     data-allowpasting='false'" +
                               "				     data-limit='0'" +
                               "				     data-createtokensonblur='false'" +
                               "				     data-delimiter=';'" +
                               "				     data-beautify='true'" +
                               "				     class='form-control input-xs'" +
                               "				     rows='5'></textarea>" +
                               "			</form>" +
                               "		</div>" +
                               "	     </div>" +
                               "	     </div>" +
                               "" +
                               "	</div>" +
                               "    </div>" +
                               "  </div>" +
                               "</div>" +
                               "" +
                               "<div class='card mb-1'>" +
                               "  <div class='card-header text-white bg-dark p-1' id='state_header_2'>" +
                               "    <h5 class='m-0'>" +
                               "	  <a data-toggle='collapse' href='#history3'><span class='text-white bg-dark' data-langkey='History'>History</span></a>:&nbsp;" +
                               "" +
                               "	  <div class='dropdown float-right'>" +
                               "	    <button class='btn btn-sm btn-light text-danger py-0 mx-1 float-right col-auto dropdown-toggle' " +
                               "		    type='button' id='resetyn2' data-toggle='dropdown' " +
                               "		    aria-haspopup='true' aria-expanded='false' " +
                               "		    ><span data-langkey='Reset'>Reset</span><span class='d-none d-sm-inline-flex'>&nbsp;<span data-langkey='history'>history</span></span></button>" +
                               "	    </button>" +
                               "	    <div class='dropdown-menu' aria-labelledby='resetyn2'>" +
                               "	     <a class='dropdown-item py-2 bg-white text-danger' type='button' " +
                               "	        onclick='wepsim_state_history_reset();" +
                               "		         wepsim_notify_success(\"<strong>INFO</strong>\", \"Removed all !.\");" +
                               "		         wepsim_state_history_list() ;" +
                               "		         return false;'" +
                               "		 ><span data-langkey='Yes'>Yes</span></a>" +
                               "	      <div class='dropdown-divider'></div>" +
                               "	      <a class='dropdown-item py-2 bg-white text-info' type='button' " +
                               "		 ><span data-langkey='No'>No</span></a>" +
                               "	    </div>" +
                               "	  </div>" +
                               "" +
                               "    </h5>" +
                               "  </div>" +
                               "  <div id='history3b' class='collapse show' aria-labelledby='state_header_2'>" +
                               "    <div class='card-body p-1'>" +
                               "	<div class='container-fluid ml-1 pb-2 collapse show' id='history3'" +
                               "	     style='max-height:40vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;'>" +
                               "	     <div id='history1'>" +
                               "		  <div class='pt-2'></div>" +
                               "		  <span style='background-color:#FCFC00'>&lt;<span data-langkey='Empty history'>Empty history</span>&gt;</span>" +
                               "	     </div>" +
                               "	</div>" +
                               "    </div>" +
                               "  </div>" +
                               "</div>" +
                               "" +
                               "<div class='card mb-1'>" +
                               "  <div class='card-header text-white bg-dark p-1' id='state_header_3'>" +
                               "    <h5 class='m-0'>" +
                               "	    <a data-toggle='collapse' href='#check_results_scroll1'><span class='text-white bg-dark' data-langkey='Differences'>Differences</span></a>:" +
                               "	    <span class='btn btn-light btn-sm float-right py-0'" +
                               "		  onclick='wepsim_clipboard_CopyFromDiv(\"check_results_scroll1\");" +
                               "			   return false;'" +
                               "		  data-inline='true'>" +
                               "		  <span data-langkey='Copy'>Copy</span>" +
                               "		  <span class='d-none d-sm-inline-flex'>&nbsp;<span data-langkey='to clipboard'>to clipboard</span></span>" +
                               "	    </span>" +
                               "    </h5>" +
                               "  </div>" +
                               "  <div id='check_results_scroll1b' class='collapse show' aria-labelledby='state_header_3'>" +
                               "    <div class='card-body p-1'>" +
                               "	<div class='container-fluid ml-1 pb-2 collapse show' id='check_results_scroll1'" +
                               "	     style='max-height:40vh; width:inherit; overflow-y:auto; -webkit-overflow-scrolling:touch;' >" +
                               "	     <div class='row align-items-center'>" +
                               "	     <div class='col-auto text-center flex-column d-flex pr-0'>" +
                               "		  <span id='s_clip' class='badge badge-pill border-secondary border m-2 shadow'>clipboard</span>" +
                               "		  <div class='row' style='max-height:16vh'><div class='col border-right border-dark'>&nbsp;</div><div class='col'>&nbsp;</div></div>" +
                               "		  <span id='s_ref'  class='badge badge-pill border-secondary border m-2 shadow'>reference</span>" +
                               "	     </div>" +
                               "	     <div class='col py-2 pl-2'>" +
                               "		  <div id='check_results1'>" +
                               "		       <span style='background-color:#FCFC00'>&lt;<span data-langkey='Empty (only modified values are shown)'>Empty (only modified values are shown)</span>&gt;</span>" +
                               "		  </div>" +
                               "	     </div>" +
                               "	     </div>" +
                               "	</div>" +
                               "    </div>" +
                               "  </div>" +
                               "</div>" ;
	             },
	    buttons: {
			OK: {
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('state') ;
				           }
			}
	             },
            size:    'large',
            onshow:  function() {
                         if (simhw_active() !== null)
                         {
		             // update state
		             $('#end_state1').tokenfield({ inputType: 'textarea' }) ;
		                //A1/ var inputEls = document.getElementById('end_state1');
		                //A1/ if (null !== inputEls)
		                //A1/     setup_speech_input(inputEls) ;

                             wepsim_state_history_list() ;
                             wepsim_dialog_current_state() ;
                         }

		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('states', ws_idiom) ;

			 // uicfg and events
			 $('[data-toggle=tooltip]').tooltip('hide') ;
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
                                    "          class='form-control btn-outline-dark' " +
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
                                    "	    <button class='btn btn-light mx-1 float-right py-0 col-auto'" +
                                    "		    onclick='var ret = wepsim_checkpoint_loadFromCache(\"browserCacheElto\");" +
                                    "			     wsweb_dialog_close(\"current_checkpoint\");" +
                                    "			     if (ret.error)" +
                                    "				  wepsim_notify_success(\"<strong>INFO</strong>\", ret.msg);" +
                                    "			     else wepsim_notify_success(\"<strong>INFO</strong>\", \"Processing load request...\");" +
                                    "			     return false;'><span data-langkey='Load'>Load</span></button>" +
                                    "		  <div class='dropdown float-right'>" +
                                    "		    <button class='btn btn-light text-danger py-0 mx-1 float-right col-auto dropdown-toggle' " +
                                    "			    type='button' id='resetyn2' data-toggle='dropdown' " +
                                    "			    aria-haspopup='true' aria-expanded='false' " +
                                    "			    ><span data-langkey='Reset'>Reset</span></button>" +
                                    "		    </button>" +
                                    "		    <div class='dropdown-menu' aria-labelledby='resetyn2'>" +
                                    "		     <a class='dropdown-item py-2 bg-white text-danger' type='button' " +
                                    "			onclick='wepsim_checkpoint_clearCache();" +
                                    "				 wepsim_checkpoint_listCache(\"browserCacheList1\");" +
                                    "				 return false;'" +
                                    "			 ><span data-langkey='Yes'>Yes</span></a>" +
                                    "		      <div class='dropdown-divider'></div>" +
                                    "		      <a class='dropdown-item py-2 bg-white text-info' type='button' " +
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
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
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
				 $('[data-toggle=tooltip]').tooltip('hide') ;
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
				label:     '<i class="fa fa-times mr-2"></i>' +
					   '<span data-langkey="Close">Close</span>',
			        className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
			        callback:  function() {
    					      wsweb_dialog_close('reload') ;
				           }
			     }
	             },
            size:    'large',
            onshow:  function() {
			 // uicfg and events
			 $('[data-toggle=tooltip]').tooltip('hide');
			 wepsim_uicfg_apply() ;

			 wsweb_scroll_record('#scroller-reload1') ;
			 simcore_record_captureInit() ;
		     }
         }

    } ;

