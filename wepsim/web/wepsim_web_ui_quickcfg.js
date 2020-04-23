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
			'                                return false;">' +
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

