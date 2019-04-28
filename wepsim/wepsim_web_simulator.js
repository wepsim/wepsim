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

    // dialogbox

    function wepsim_dialogbox_close_all ( )
    {
	    // Close all dialogbox
	          $('#example1').modal('hide') ;
	             $('#help1').modal('hide') ;
	           $('#config2').modal('hide') ;
	    $('#current_state1').modal('hide');
	              $('#bin2').modal('hide');
    }



    //
    // Auxiliar function
    //

    // confirm exit
    function wepsim_confirm_exit ( e )
    {
	    var confirmationMessage = "\o/";
	    (e || window.event).returnValue = confirmationMessage; // Gecko + IE
	    return confirmationMessage;                            // Webkit, Safari, Chrome
    }

    // popover quick-menu
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
		'</li>' ;

       if (get_cfg('enable_beta') === true)
	   o += '<li class="list-group-item px-0 enabled_beta"> ' +
		'  <em class="fas fa-clipboard"></em> &nbsp;' +
		'  <button class="navbar-toggle btn btn-sm btn-outline-secondary col-10 p-1 text-left" type="button" ' +
		'          onclick="$(\'#record_div\').collapse(\'toggle\');' +
		'                   return false;">' +
		i18n_get('gui',wsi,'Show/Hide Record') +
		'  </button>' +
		'</li>' ;

	   o += '<li class="list-group-item px-0"> ' +
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
           $("#current_state1_lang").html(o) ;
    }


    //
    // Initialize UI
    //

    function wsweb_init_ui ( )
    {
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

	    // initialize mode-menu
	    var val = get_cfg('enable_beta') ;
	    if (val === false) {
		$('.enabled_beta').addClass('d-none');
	    }

	    // init: state dialog 
	    $('#end_state1').tokenfield({ inputType: 'textarea' }) ;
	       //A1/ var inputEls = document.getElementById(id_div_state1);
	       //A1/ if (null != inputEls)
	       //A1/     setup_speech_input(inputEls) ;

	    $('#end_state2').tokenfield({ inputType: 'textarea' }) ;
	       //A1/ var inputEls = document.getElementById(id_div_state2);
	       //A1/ if (null != inputEls)
	       //A1/     setup_speech_input(inputEls) ;

	    // init: quick-menu 
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

	    // tooltip: trigger by hover
	    $('[data-toggle="tooltip"]').tooltip({
		    trigger:   'hover',
		    sanitizeFn: function (content) {
				   return content ; // DOMPurify.sanitize(content) ;
				}
	    }) ;

	    // popover...
	    $('a[data-toggle="popover1"]').popover({
		    placement: 'bottom',
		    animation: false,
		    trigger:   'focus, hover',
		    delay: { "show": 500, "hide": 100 },
		    sanitizeFn: function (content) {
				   return content ; // DOMPurify.sanitize(content) ;
				}
	    }) ;

	    // asmdbg
	    showhideAsmElements() ;

	    var target = $("#asm_table");
	    $("#asm_debugger_container").scroll(function() {
	       target.prop("scrollTop", this.scrollTop).prop("scrollLeft", this.scrollLeft);
	    });

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
	    wsweb_record_init() ;

	    // init: help idiom selectors 
            wepsim_init_helpDropdown() ;
    }

