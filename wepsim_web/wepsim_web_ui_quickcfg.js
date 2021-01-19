/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
    // WepSIM quickcfg
    //

    wsweb_quickcfg = {

         pop1: {
            quick_id:     '#po1',
	    val_trigger:  'manual',
	    fun_content:  function() {
				var wsi = get_cfg('ws_idiom') ;

				var o = '<ul class="list-group list-group-flush">' ;

				   o += '<li class="list-group-item px-0"> ' +
					'  <a class="btn btn-sm btn-outline-dark col p-1 text-left float-right" href="#" ' +
					'     onclick="wsweb_dialog_open(\'about\'); ' +
					'              wsweb_quickmenu_close(); ' +
					'              return true;">' +
					'<em class="fas fa-magic col-1 pl-1 float-left"></em>' +
					'<span class="col-11">' + i18n_get('dialogs',wsi,'About WepSIM') + '...</span></a>' +
					'</li>' ;

/*
				   o += '<li class="list-group-item px-0"> ' +
					'  <a class="btn btn-sm btn-outline-dark col p-1 text-left float-right" href="#" ' +
					'     onclick="wepsim_newbie_tour(); ' +
					'              wsweb_quickmenu_close(); ' +
					'              return true;">' +
					'<em class="fas fa-book-reader col-1 pl-1 float-left"></em>' +
					'<span class="col-11">' + i18n_get('dialogs',wsi,'Initial intro') + '...</span></a>' +
					'</li>' ;
*/

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
                          },
	    fun_ownshown: function() { }
         },

         slidercfg: {
            quick_id:     '#popover-slidercfg',
	    val_trigger:  'click',
	    fun_content:  function() {
		var wsi = get_cfg('ws_idiom') ;

		var o = '<ul class="list-group list-group-flush">' ;

		   o += '<li class="list-group-item px-0"> ' +
			'     <div id="slider_cpucu" class="col-sm p-0 collapse show user_microcode">' +
			'           <form id="slider2f" class="full-width-slider row-auto mt-0 p-0 pt-0 pb-2">' +
			'                <label class="my-0" for="slider3b" style="min-width:95%"><span data-langkey="processor">processor</span>:</label>' +
			'                <input aria-label="Show CPU/CU" type="range" name="slider3b" id="slider3b"' +
			'                       min="0" max="14" value="7" step="1"' +
			'                       data-show-value="false"' +
			'                       class="custom-range slider col mx-0 px-0"' +
			'                       oninput="wsweb_set_cpucu_size(this.value) ;' +
			'                                return true;">' +
			'           </form>' +
			'     </div>' +
			'</li>' ;

		   o += '<li class="list-group-item px-0"> ' +
			'     <div class="col-sm p-0 ml-1 collapse show">' +
			'           <form id="slider2e" class="full-width-slider row-auto mt-0 p-0 pt-0 pb-2">' +
			'                <label class="my-0" for="slider3a" style="min-width:95%"><span data-langkey="details">details</span>:</label>' +
			'                <input aria-label="Show Main/Info" type="range" name="slider3a" id="slider3a"' +
			'                       min="0" max="14" value="7" step="1"' +
			'                       data-show-value="false"' +
			'                       class="custom-range slider col mx-0 px-0"' +
			'                       oninput="wsweb_set_c1c2_size(this.value) ;' +
			'                                return true;">' +
			'           </form>' +
			'     </div>' +
			'</li>' ;

		   o += '<li class="list-group-item px-0"> ' +
			'<label><span data-langkey="dark mode">dark mode</span>:</label>' +
                        quickcfg_html_onoff('18',
                                            'WepSIM dark mode',
                                            "  wepsim_restore_darkmode(false);" +
                                            "  update_cfg('ws_skin_dark_mode', false);",
                                            "  wepsim_restore_darkmode(true);" +
                                            "  update_cfg('ws_skin_dark_mode', true);") +
			'</li>' ;

		   o += '<li class="list-group-item px-0"> ' +
			'<label class="w-100"><span data-langkey="Reload">Reload</span>...:</label>' +
			"   <div class='btn btn-sm btn-light btn-outline-dark p-1 col-8 mx-auto' " +
			"        aria-label='open the reload dialog box' " +
			"        onclick=\"wsweb_quickslider_close(); " +
			"                  wsweb_dialog_open('reload'); " +
			"                  return true;\">" +
                        "<i class='fas fa-redo'></i>&nbsp;<span data-langkey='Reload'>Reload</span></div>" +
			'</li>' ;

/*
		   o += '<li class="list-group-item px-0"> ' +
			'<label><span data-langkey="beginner view">beginner view</span>:</label>' +
                        quickcfg_html_onoff('17',
                                            'Frequent only',
                                            "  wepsim_activeview('only_frequent', false);",
                                            "  wepsim_activeview('only_frequent', true);") +
			'</li>' ;
*/

		   o += '<button type="button" id="close" data-role="none" ' +
			'        class="btn btn-sm btn-danger w-100 p-0 mt-3" ' +
			'        onclick="wsweb_quickslider_close(); ' +
			'                 return false;">' +
			i18n_get('dialogs',wsi,'Close') +
			'</button>' +
			'</ul>' ;

		return o ;
                          },
	    fun_ownshown: function(shownEvent) {
				    var optValue = false ;
				    $("#slider3a").val(get_cfg('C1C2_size')) ;
				    $("#slider3b").val(get_cfg('CPUCU_size')) ;
				    optValue = (get_cfg('ws_skin_user').split(":")[1] == 'on') ? true : false ;
                                    $('#label16-' + optValue).button('toggle') ;
				    optValue = (get_cfg('ws_skin_user').split(":")[3] == 'on') ? true : false ;
                                    $('#label17-' + optValue).button('toggle') ;
				    optValue = get_cfg('ws_skin_dark_mode') ;
                                    $('#label18-' + optValue).button('toggle') ;
                          }
         },

         popover2: {
            quick_id:     '[data-toggle=popover2]',
	    val_trigger:  'click',
	    fun_content:  function(shownEvent) {
			      return wepsim_show_asm_columns_checked('popover2_asm') ;
		          },
	    fun_ownshown: function(shownEvent) {
			      showhideAsmHeader() ;
                          }
         }

    } ;


    //
    // Quick Config
    //

    function wepsim_init_quickcfg ( quick_id, val_trigger, fun_content, fun_ownshown )
    {
	 return $(quick_id).popover({
		    trigger:     val_trigger,
		    html:        true,
		    placement:  'auto',
		    animation:   false,
		    container:  'body',
		    template:   '<div class="popover shadow border border-secondary" role="tooltip">' +
			        '<div class="arrow"></div>' +
                                '<h3 class="popover-header"></h3>' +
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
    // Get HTML code for quick-config elements
    //

    function quickcfg_html_br ( )
    {
	 return "<div class='w-100 border border-light'></div>" ;
    }

    function quickcfg_html_header ( label2 )
    {
         return "<div class='col-12 p-0 mt-2'>" +
                "<span data-langkey='" + label2 + "'>" + label2 + "</span>" +
                "</div>" ;
    }

    function quickcfg_html_btn ( label2, code2, colwidth2 )
    {
	 return "<div class='" + colwidth2 + " p-1'>" +
		"<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
		"        onclick='" + code2 + "; return true;'>" +
		"<span class='mx-auto px-1 font-weight-bold rounded text-dark' " +
                "      style='background-color:#CEECF5; '>" + label2 + "</span></buttom>" +
		"</div>" ;
    }

    function quickcfg_html_btnreg ( label2, code2, colwidth2 )
    {
         return "<div class='" + colwidth2 + " p-1'>" +
	        "<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
	        "        onclick='" + code2 + "; return true;'>" +
	        "<span class='font-weight-bold text-monospace'>" + label2 + "</span>" + "&nbsp;" +
	        "<span class='mx-auto px-1 rounded' style='background-color:#CEECF5;'>0</span></buttom>" +
	        "</div>" ;
    }

    function quickcfg_html_onoff ( id2, arial2, code_off2, code_on2 )
    {
         return "<div class='col-12 p-0 btn-group btn-group-toggle d-flex' data-toggle='buttons'>" +
                "    <label id='label" + id2 + "-false' " +
                "           class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
                "           aria-label='" + arial2 + ": false' " +
		"           onclick=\"" + code_off2 + "; return true;\">" +
                "    <input type='radio' name='options' id='radio" + id2 + "-false' " +
                "           aria-label='" + arial2 + ": false' autocomplete='off'>Off</label>" +
                "    <label id='label" + id2 + "-true' " +
                "           class='btn btn-sm btn-light w-50 btn-outline-secondary p-1' " +
                "           aria-label='" + arial2 + ": true' " +
		"           onclick=\"" + code_on2 + "; return true;\">" +
                "    <input type='radio' name='options' id='radio" + id2 + "-true' " +
                "           aria-label='" + arial2 + ": true' autocomplete='on'>On</label>" +
                "</div>" ;
    }

    function quickcfg_html_close ( btn2_id )
    {
	 return "<div class='col p-1 mt-2'>" +
		"<button type='button' id='close' data-role='none' " +
		"        class='btn btn-sm btn-danger w-100 p-0 mt-1' " +
		"        onclick='$(\"#" + btn2_id + "\").popover(\"hide\");'>" +
                "<span data-langkey='Close'>Close</span>" +
                "</button>" +
		"</div>" ;
    }

