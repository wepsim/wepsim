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
		                "<div class='card border-secondary h-100'>" +
			        "<div class='card-header border-secondary text-white bg-secondary p-1'>" +
		                "  <h5 class='m-0'>" +
				"  <span class='text-white bg-secondary' data-langkey='Output'>Output</span>" +
				"  <button class='btn btn-light mx-1 float-right py-0 col-auto' " +
                                "          onclick='var ifntsa2 = document.getElementById(\"inputFileNameToSaveAs2\");" +
				"	            var fileNameToSaveAs = ifntsa2.value;" +
				"	            var textToWrite      = inputasm.getValue();" +
				"	            wepsim_save_to_file(textToWrite, fileNameToSaveAs);" +
				"		    return false;'" +
                                "><span data-langkey='Save'>Save</span></button>" +
		               	"  </h5>" +
			      	"</div>" +
			      	" <div class='card-body'>" +
		                "<label for='inputFileNameToSaveAs2'>" +
			        "<em><span data-langkey='Please write the file name'>Please write the file name</span>:</em>" +
			        "</label>" +
	                        "<p><input aria-label='filename to save content' id='inputFileNameToSaveAs2' " +
                                "          class='form-control btn-outline-dark' placeholder='File name where assembly will be saved' style='min-width: 90%;'/></p>" +
			     	" </div>" +
			   	"</div>" +
                               "</div>" +
                               "<div class='col-12 col-sm-6 p-2'>" +
		                "<div class='card border-secondary h-100'>" +
			        "<div class='card-header border-secondary text-white bg-secondary p-1'>" +
		                "  <h5 class='m-0'>" +
				"  <span class='text-white bg-secondary' data-langkey='Input'>Input</span>" +
				"  <button class='btn btn-light mx-1 float-right py-0 col-auto' " +
                                "          onclick='var ftl2 = document.getElementById(\"fileToLoad2\"); " +
                                "                   var fileToLoad = ftl2.files[0]; " +
		                "                   wepsim_file_loadFrom(fileToLoad," +
                                "                                   function(txt){ inputasm.setValue(txt); });" +
				"		    return false;'" +
                                "><span data-langkey='Load'>Load</span></button>" +
		               	"  </h5>" +
			      	"</div>" +
			      	"<div class='card-body'>" +
		                "<label for='fileToLoad2'><em><span data-langkey='Load from this File'>Load from this File</span>:</em></label>" +
	                        "<p><input aria-label='file to load' " +
                                "          type='file' id='fileToLoad2' class='dropify'/></p>" +
			     	"</div>" +
			     	"</div>" +
                               "</div>" +
                               "</div>" +
			   	"</div>" ;
	              },
	    buttons:  {
			 close: {
				label:     "<span data-langkey='Close'>Close</span>",
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

			 $('.dropify').dropify() ;

		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('dialogs', ws_idiom) ;
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
                                "          onclick='var fileNameToSaveAs = document.getElementById(\"inputFileNameToSaveAs\").value;" +
		                "                   var textToWrite      = inputfirm.getValue();" +
		                "                   wepsim_save_to_file(textToWrite, fileNameToSaveAs);" +
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
		                "<div class='card border-secondary h-100'>" +
			        "<div class='card-header border-secondary text-white bg-secondary p-1'>" +
		                " <h5 class='m-0'>" +
				" <span class='text-white bg-secondary' data-langkey='Input'>Input</span>" +

				" <button class='btn btn-light mx-1 float-right py-0 col-auto' " +
                                "         onclick='var ftl = document.getElementById(\"fileToLoad\").files[0];" +
		                "                  wepsim_file_loadFrom(ftl," +
			        "                 		 function(txt){ inputfirm.setValue(txt); });" +
				"		   return false;'" +
                                "><span data-langkey='Load'>Load</span></button>" +
		               	"  </h5>" +
			      	"</div>" +
			      	"<div class='card-body'>" +
		                "<label for='fileToLoad'><em><span data-langkey='Load from this File'>Load from this File</span>:</em></label>" +
	                        "<p><input aria-label='file to load' type='file' id='fileToLoad' class='dropify'/></p>" +
			     	"</div>" +
			     	"</div>" +
                               "</div>" +
                               "</div>" +
			   	"</div>" ;
		      },
	    buttons:  {
			 close: {
				label:     "<span data-langkey='Close'>Close</span>",
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

		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('dialogs', ws_idiom) ;
		      }
         },

	 // binary
         binary: {
            id:      "bin2",
	    title:   function() {
                          return wepsim_config_dialog_title("Binary",
                                                            "secondary",
							    "var ws_idiom = get_cfg('ws_idiom');" +
							    "i18n_update_tags('dialogs', ws_idiom);") ;
		     },
            body:    function() {
		        return "<div id='bin2-container' class='container-fluid' " +
	           	       "     style='padding:0 0 0 0; overflow:auto; -webkit-overflow-scrolling:touch;'> " +
		               " <div class='ui-body-d ui-content' style='padding: 2px 2px 2px 2px;'> " +
           		       " <div id='iframe_bin2' style='max-height:70vh; max-width:100%; overflow:auto; -webkit-overflow-scrolling:touch;'> " +
	           	       "   <div id='compile_results' style='padding: 16px 16px 16px 16px;'> " +
		               "	<br/> " +
			       "	<center> " +
			       "	Loading binary, please wait... <br/> " +
			       "	WARNING: loading binary might take time on slow mobile devices. " +
			       "	</center> " +
		               "	   </div> " +
		               "	 </div> " +
		               "      </div> " +
		               "</div>" ;
		     },
	    buttons: {
			OK: {
			   label: "OK",
			   className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
			   callback: function() {
    					 wsweb_dialog_close('binary') ;
				     }
			}
	             },
            size:    'large',
            onshow:  function() {
			 $('div.wsversion').replaceWith(get_cfg('version')) ;

		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('dialogs', ws_idiom) ;
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
		        return "<div id='container-about1' class='container-fluid'" +
			       "     style='max-height:80vh; '>" +
			       "     <form>" +
			       "	<div class='form-group m-0'>" +
			       "	   <label for='about_license' class='text-secondary'>License:</label>" +
			       "	   <span class='text-primary'" +
			       "                 onclick='wepsim_help_set_relative('about#');" +
			       "                          wepsim_help_refresh();" +
			       "		          wsweb_about_close();" +
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
			   label:     "OK",
			   className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
			   callback:  function() {
    					 wsweb_dialog_close('about') ;
				      }
			}
	             },
            size:    '',
            onshow:  function() {
			 $('div.wsversion').replaceWith(get_cfg('version')) ;

		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('dialogs', ws_idiom) ;
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
			        "<div class='card-header border-secondary text-white bg-secondary p-1'>" +
		                "  <h5 class='m-0'>" +
                                "  <div class='dropdown float-right'>" +
                                "    <button class='btn btn-light text-danger py-1 dropdown-toggle' " +
                                "            type='button' id='resetyn' data-toggle='dropdown' " +
                                "            aria-haspopup='true' aria-expanded='false' " +
				"            ><span data-langkey='Reset'>Reset</span></button>" +
                                "    </button>" +
                                "    <div class='dropdown-menu' aria-labelledby='resetyn'>" +
                                "     <a class='dropdown-item py-2 bg-light text-danger' type='button' " +
                                "        onclick='simcore_notifications_reset(); " +
				"		  var notifications = simcore_notifications_get(); " +
				"	          var ntf_html = table_notifications_html(notifications); " +
				"		  $(\"#scroller-notifications3\").html(ntf_html); " +
				"		  // reajust ui " +
				"		  wepsim_restore_uicfg(); " +
				"		  wsweb_scroll_record(\"#scroller-notifications3\"); " +
				"		  simcore_record_captureInit(); " +
				"		  return false;'" +
                                "         ><span data-langkey='Yes'>Yes</span></a>" +
                                "      <a class='dropdown-item py-2 bg-light text-info' type='button' " +
                                "         ><span data-langkey='No'>No</span></a>" +
                                "    </div>" +
                                "  </div>" +
		               	"  </h5>" +
			      	"</div>" +
			      	" <div class='card-body p-1'>" +
		                "<div id='scroller-notifications3' class='container-fluid' " +
	           	        "     style='overflow:auto; -webkit-overflow-scrolling:touch;'> " +
                                notifications_html +
                                "</div>" +
			     	" </div>" +
			   	"</div>" ;
		      },
	    buttons:  {
			Close: {
			   label:     "Close",
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
                               "     style='max-height:75vh; overflow:auto; -webkit-overflow-scrolling:touch;'>" +
                               table_examples_html(ws_examples) +
                               "</div>" ;
		     },
	    buttons: {
			OK: {
			   label:     "OK",
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
			OK: {
			   label:     "OK",
			   className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
			   callback:  function() {
    					 wsweb_dialog_close('config') ;
				      }
			}
	             },
            size:    'large',
            onshow:  function() {
		         // ui elements
			 for (m=0; m<ws_config.length; m++) {
			      ws_config[m].code_init() ;
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
                               "<div class='ui-body-d ui-content p-0' id='scroller-help1-container' " +
                               "     style='min-height:50vh; max-height:70vh; overflow-y:auto; -webkit-overflow-scrolling:touch;'>" +
                               "     <div id='scroller-help1' style='min-height:50vh;'>" +
			       table_helps_html(ws_help) +
                               "</div>" +
                               "</div>" ;
	             },
	    buttons: {
			Index: {
			   label:     "<span data-langkey='Help Index'>Help Index</span>",
			   className: "btn btn-success btn-sm col col-sm-3 float-left shadow-none mr-auto",
			   callback:  function() {
                                         wsweb_dialog_open_list('help') ;
                                         wepsim_help_refresh() ;
                                         wepsim_restore_uicfg() ;
				      }
			},
			OK: {
			   label:     "OK",
			   className: "btn btn-primary btn-sm col col-sm-3 float-right shadow-none",
			   callback:  function() {
    					 wsweb_dialog_close('help') ;
				      }
			}
	             },
            size:    'large',
            onshow:  function() {
		         // ui elements
			 $('#help1_ref').data('relative','') ;
			 $('#help1_ref').data('absolute','') ;
			 $('#help1_ref').data('code','false') ;

		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('help', ws_idiom) ;
		     }
         }

    } ;

