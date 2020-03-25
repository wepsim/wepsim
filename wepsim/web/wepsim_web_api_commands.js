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

         save_assembly: {
            id:        "lssave2",
	    title:     function() {
                         return wsweb_dialog_title('Save Assembly') ;
		       },
            body:      function() {
		       return "<label for='inputFileNameToSaveAs2'>" +
			      "<em><span data-langkey='Please write the file name'>Please write the file name</span>:</em>" +
			      "</label>" +
	                      "<p><input aria-label='filename to save content' id='inputFileNameToSaveAs2' " +
                              "          class='form-control btn-outline-dark' placeholder='File name where assembly will be saved' style='min-width: 90%;'/></p>" ;
	              },
	    buttons:  {
			 save: {
				label:     "<span data-langkey='Save to File'>Save to File</span>",
				className: 'btn btn-dark',
				callback:  function() {
					       var fileNameToSaveAs = document.getElementById('inputFileNameToSaveAs2').value;
					       var textToWrite      = inputasm.getValue();
					       wepsim_save_to_file(textToWrite, fileNameToSaveAs);
					   }
			 },
			 close: {
				label:     "<span data-langkey='Close'>Close</span>",
				className: 'btn btn-danger',
				callback:  function() {
    					       wsweb_dialog_close('save_assembly') ;
					   }
			 }
	              },
            onshow:   function() {
			 var o = $("#lssave2") ;
		         o.find('.modal-header').attr("style", "background-color: black !important") ;
			 o.find('.modal-title').addClass("ml-auto") ;
		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('dialogs', ws_idiom) ;
		      }
         },

         load_assembly: {
            id:       "lsload2",
	    title:    function() {
                         return wsweb_dialog_title('Load Assembly') ;
		      },
            body:     function() {
		         return "<label for='fileToLoad2'><em><span data-langkey='Load from this File'>Load from this File</span>:</em></label>" +
	                        "<p><input aria-label='file to load' type='file' id='fileToLoad2' class='dropify'/></p>" ;
	              },
	    buttons:  {
			 save: {
				label:     "<span data-langkey='Load'>Load</span>",
				className: 'btn btn-dark',
				callback:  function() {
		                               var fileToLoad = document.getElementById('fileToLoad2').files[0];
		                               wepsim_file_loadFrom(fileToLoad,
                                                                     function(txt){ inputasm.setValue(txt); });
					   }
			 },
			 close: {
				label:     "<span data-langkey='Close'>Close</span>",
				className: 'btn btn-danger',
				callback:  function() {
    					       wsweb_dialog_close('load_assembly') ;
					   }
			 }
	              },
            onshow:   function() {
			 $('.dropify').dropify() ;

			 var o = $("#lsload2") ;
		         o.find('.modal-header').attr("style", "background-color: black !important") ;
			 o.find('.modal-title').addClass("ml-auto") ;
		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('dialogs', ws_idiom) ;
		      }
         },

         save_firmware: {
	    id:       "lssave",
	    title:    function() {
                         return wsweb_dialog_title('Save Firmware') ;
		      },
            body:     function() {
		         return "<label for='inputFileNameToSaveAs'><em><span data-langkey='Please write the file name'>Please write the file name</span>:</em></label>" +
	                        "<p><input aria-label='filename to save content' id='inputFileNameToSaveAs'" +
                                "          class='form-control btn-outline-dark' placeholder='File name where microcode will be saved' style='min-width: 90%;'/></p>" ;
		      },
	    buttons:  {
			 save1: {
				label:     "<span data-langkey='Save Editor content to File'>Save Editor content to File</span>",
				className: 'btn btn-dark',
				callback:  function() {
		                               var fileNameToSaveAs = document.getElementById('inputFileNameToSaveAs').value;
                                               var textToWrite      = inputfirm.getValue();
                                               wepsim_save_to_file(textToWrite, fileNameToSaveAs);
					   }
			 },
			 save2: {
				label:     "<span data-langkey='Save control memory to File'>Save control memory to File</span>",
				className: 'btn btn-dark my-1',
				callback:  function() {
		                               wsweb_save_controlmemory_to_file() ;
					   }
			 },
			 close: {
				label:     "<span data-langkey='Close'>Close</span>",
				className: 'btn btn-danger',
				callback:  function() {
    					       wsweb_dialog_close('save_firmware') ;
					   }
			 }
	              },
            onshow:   function() {
			 var o = $("#lssave") ;
		         o.find('.modal-header').attr("style", "background-color: black !important") ;
			 o.find('.modal-title').addClass("ml-auto") ;
		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
                         i18n_update_tags('dialogs', ws_idiom) ;
		      }
         },

         load_firmware: {
	    id:      "lsload",
	    title:   function() {
                         return wsweb_dialog_title('Load Microcode') ;
		     },
            body:    function() {
		        return "<label for='fileToLoad'><em><span data-langkey='Load from this File'>Load from this File</span>:</em></label>" +
	                       "<p><input aria-label='file to load' type='file' id='fileToLoad' class='dropify'/></p>" ;
		     },
	    buttons: {
			 save: {
				label:     "<span data-langkey='Load'>Load</span>",
				className: 'btn btn-dark',
				callback:  function() {
		                               var fileToLoad = document.getElementById('fileToLoad').files[0];
		                               wepsim_file_loadFrom(fileToLoad,
                                                                     function(txt){ inputfirm.setValue(txt); });
					   }
			 },
			 close: {
				label:     "<span data-langkey='Close'>Close</span>",
				className: 'btn btn-danger',
				callback:  function() {
    					       wsweb_dialog_close('load_firmware') ;
					   }
			 }
	              },
            onshow:   function() {
			 var o = $("#lsload") ;
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
                         return wsweb_dialog_title('Binary') ;
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
			   className: 'btn btn-primary btn-sm col col-sm-3 float-right shadow-none',
			   callback: function() {
    					 wsweb_dialog_close('binary') ;
				     }
			}
	             },
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
                         return wsweb_dialog_title("WepSIM's authors") ;
		      },
            body:    function() {
		        return "<div id='container-about1' class='container-fluid'" +
			       "     style='max-height:80vh; '>" +
			       "	<div class='row pb-2'>" +
			       "	  <div class='col-sm-12 p-0'>" +
			       "	       <span class='float-left mr-auto text-primary'" +
			       "                    onclick='wepsim_help_set_relative('about#');" +
			       "                             wepsim_help_refresh();" +
			       "		              wsweb_about_close();" +
			       "			      return false;'>GNU Lesser General Public 3</span>" +
			       "	  </div>" +
			       "	</div>" +
			       "	<ws-authors></ws-authors>" +
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
                         return "<div class='dropdown'>" +
                                "<button type='button' " +
                                "        class='btn btn-secondary px-3 py-1 dropdown-toggle' " +
                                "        data-toggle='dropdown' id='dropup-authors' " +
                                "        aria-expanded='false' aria-haspopup='true'>" +
                                "<span data-langkey='Notifications'>Notifications</span>" +
                                "</button>" +
                                "<div class='dropdown-menu' " +
                                "     style='overflow-y:auto; max-height:55vh;' " + 
                                "     aria-labelledby='dropup-authors'>" +
			        " <div class='p-2 m-0'>"+
                                " <button class='dropdown-item py-1' type='button' " +
                                "         onclick='$(\".collapse7\").collapse(\"toggle\");'>" +
                                " <span>&plusmn; Description</span>" +
                                " </button>" +
			        " </div>"+
                                "<div class='dropdown-divider m-1'></div>" +
			        " <div class='px-2 m-0'>"+
                                " <button class='dropdown-item py-1 text-danger' type='button' " +
                                "         onclick='wsweb_dialogs.notifications.ttl_acts.reset();'>" +
                                " <span data-langkey='Reset'>Reset</span>" +
                                " </button>" +
			        " </div>"+
                                "<div class='dropdown-divider m-1'></div>" +
			        " <form class='py-1 px-2 m-0'>"+
			        " <div class='form-group m-0'>" + i18n_get_select() + "</div>" +
			        " </form>"+
                                "  </div>" +
                                "</div>" ;
		      },
	    ttl_acts: {
	                 description: function() {
                                         $(".collapse7").collapse("toggle") ;
				         return false ;
	                              },
	                 reset:       function() {
				         var wsi = get_cfg('ws_idiom') ;
				         var   q = i18n_get('dialogs',wsi,'Are you sure?') ;
				         if (confirm(q))
				         {
					     // reajust content
					     simcore_notifications_reset() ;
					     var notifications      = simcore_notifications_get() ;
					     var notifications_html = table_notifications_html(notifications) ;
					     $("#container-notifications3").html(notifications_html) ;
					     // reajust ui
					     wepsim_restore_uicfg() ;
					     wsweb_scroll_record('#container-notifications3') ;
					     simcore_record_captureInit() ;
					     return false ;
				         }
				         return false;
	                              }
                      },
            body:     function() {
		         var notifications      = simcore_notifications_get() ;
		         var notifications_html = table_notifications_html(notifications) ;
		         return "<div id='container-notifications3' class='container-fluid'>" + notifications_html + "</div>" ;
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
            onshow:  function() {
			 $("#container-notifications3").scrollTop(0) ;
		         // ui lang
                         var ws_idiom = get_cfg('ws_idiom') ;
			 i18n_update_tags('cfg') ;
		     }
         }

    } ;


