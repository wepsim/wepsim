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


    // show/hide Assembly elements/header

    function showhideAsmElements ( )
    {
	var tlabel = [ "label", "addr", "hex", "ins", "pins" ] ;

	for (var tli=0; tli<tlabel.length; tli++)
	{
             var label_name  = "SHOWCODE_"   + tlabel[tli] ;
             var column_name = "table .asm_" + tlabel[tli] ;
             var column_show = get_cfg(label_name) ;

	     if (column_show !== false)
	          $(column_name).show() ;
	     else $(column_name).hide() ;
	}
    }

    function showhideAsmHeader ( )
    {
	var tlabel = [ "label", "addr", "hex", "ins", "pins" ] ;

	for (var tli=0; tli<tlabel.length; tli++)
	{
             var label_name = "SHOWCODE_"   + tlabel[tli] ;
             var btn_show   = get_cfg(label_name) ;
             var btn_name   = "#asm_" + tlabel[tli] ;

             $(btn_name).removeClass('btn-outline-secondary').removeClass('btn-dark') ;
	     if (btn_show !== false) 
                  $(btn_name).addClass('btn-dark') ;
	     else $(btn_name).addClass('btn-outline-secondary') ;
	}
    }

    function default_asmdbg_content_horizontal ( )
    {
	 var wsi = get_cfg('ws_idiom') ;

	 var o = "<br>" +
	         "<div class='card m-3'>" +
		 "  <div class='row no-gutters'>" +
		// "  <div class='col-md-4'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/simulator/firmware002.jpg'>" +
		// "  </div>" +
		// "  <div class='col-md-8'>" + // +
		 "  <div class='col-md-12'>" + // -
		 "  <div class='card-body py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>1</div>" +
		 "    <span data-langkey='simulator intro 1'>" + 
	         i18n_get('gui',wsi,'simulator intro 1') +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "  </div>" +
		 "  </div>" +
		 "</div>" +
		 "<div class='card m-3'>" +
		 "  <div class='row no-gutters'>" +
		// "  <div class='col-md-4'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/simulator/firmware002.jpg'>" +
		// "  </div>" +
		// "  <div class='col-md-8'>" + // +
		 "  <div class='col-md-12'>" + // -
		 "  <div class='card-body py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>2</div>" +
		 "    <span data-langkey='simulator intro 2'>" + 
	         i18n_get('gui',wsi,'simulator intro 2') +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "  </div>" +
		 "  </div>" +
		 "</div>" +
		 "<div class='card m-3'>" +
		 "  <div class='row no-gutters'>" +
		// "  <div class='col-md-4'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/welcome/simulation_xinstruction.gif'>" +
		// "  </div>" +
		// "  <div class='col-md-8'>" + // +
		 "  <div class='col-md-12'>" + // -
		 "  <div class='card-body py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>3</div>" +
		 "    <span data-langkey='simulator intro 3'>" + 
	         i18n_get('gui',wsi,'simulator intro 3') +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "  </div>" +
		 "  </div>" +
		 "</div>" ;

	 return o ;
    }

    function default_asmdbg_content_vertical ( )
    {
	 var o = "<br>" +
		 "<div class='container-fluid'>" +
		 "<div class='card-column row'>" +
		 "<div class='card m-2 col-sm'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/simulator/firmware002.jpg'>" +
		 "  <div class='card-body h-50 py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>1</div>" +
		 "    <span data-langkey='simulator intro 1'>" + 
	         i18n_get('gui',wsi,'simulator intro 1') +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "</div>" +
		 "<div class='card m-2 col-sm'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/simulator/firmware002.jpg'>" +
		 "  <div class='card-body h-50 py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>2</div>" +
		 "    <span data-langkey='simulator intro 2'>" + 
	         i18n_get('gui',wsi,'simulator intro 2') +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "</div>" +
		 "<div class='card m-2 col-sm'>" +
		// "  <img class='card-img-top' alt='microcode work area' src='help/welcome/simulation_xinstruction.gif'>" +
		 "  <div class='card-body h-50 py-0'>" +
		 "    <p class='card-text'>" + 
		 "    <div class='badge badge-primary'>3</div>" +
		 "    <span data-langkey='simulator intro 3'>" + 
	         i18n_get('gui',wsi,'simulator intro 3') +
		 "    </span>" +
		 "    </p>" +
		 "  </div>" +
		 "</div>" +
		 "</div>" +
		 "</div>" ;

	 return o ;
    }

    // Popovers

    function wepsim_click_asm_columns ( name )
    {
        var label_name = "SHOWCODE_" + name ;
        var show_elto  = get_cfg(label_name) ;

	show_elto = !show_elto ;

        var column_name = "table .asm_" + name ;
        if (show_elto !== false)
   	     $(column_name).show() ;
        else $(column_name).hide() ;

	set_cfg(label_name, show_elto) ;
	save_cfg() ;

        var btn_name = "#asm_" + name ;
	$(btn_name).removeClass('btn-outline-secondary').removeClass('btn-dark') ;
        if (show_elto !== false)
	     $(btn_name).addClass('btn-dark') ;
	else $(btn_name).addClass('btn-outline-secondary') ;
    }

    function wepsim_show_asm_columns_checked ( asm_po )
    {
        var o = '<button type="button" id="asm_label" aria-label="Show label" ' +
		'        onclick="wepsim_click_asm_columns(\'label\'); return false;" ' +
		'        class="btn btn-sm btn-block btn-outline-secondary mb-1">labels</button>' +
		'<button type="button" id="asm_hex" aria-label="Show content" ' +
		'        onclick="wepsim_click_asm_columns(\'hex\'); return false;" ' +
                '        class="btn btn-sm btn-block btn-outline-secondary mb-1">content</button>' +
		'<button type="button" id="asm_ins" aria-label="Show instruction" ' +
		'        onclick="wepsim_click_asm_columns(\'ins\'); return false;" ' +
                '        class="btn btn-sm btn-block btn-outline-secondary mb-1">assembly</button>' +
		'<button type="button" id="asm_pins" aria-label="Show pseudoinstruction" ' +
		'        onclick="wepsim_click_asm_columns(\'pins\'); return false;" ' +
                '        class="btn btn-sm btn-block btn-outline-secondary mb-1">pseudo<span class="d-none d-md-inline">-instructions</span></button>' +
                '<button type="button" id="close" data-role="none" ' +
                '        class="btn btn-sm btn-danger w-100 p-0 mt-1" ' +
                '        onclick="$(\'#' + asm_po + '\').popover(\'hide\');"' + 
	        '><span data-langkey="Close">Close</span></button>' ;

        return o ;
    }

