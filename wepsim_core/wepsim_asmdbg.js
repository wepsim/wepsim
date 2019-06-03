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
    	 var wsi = get_cfg('ws_idiom') ;
    
             var o = '<button type="button" id="asm_label" aria-label="Show label" ' +
    		 '        onclick="wepsim_click_asm_columns(\'label\'); return false;" ' +
    		 '        class="btn btn-sm btn-block btn-outline-secondary mb-1">' + 
    		 '<span class="float-left">' + i18n_get('dialogs',wsi,'Show/Hide labels') + '</span>' +
    		 '</button>' +
    		 '<button type="button" id="asm_hex" aria-label="Show content" ' +
    		 '        onclick="wepsim_click_asm_columns(\'hex\'); return false;" ' +
                     '        class="btn btn-sm btn-block btn-outline-secondary mb-1">' + 
    		 '<span class="float-left">' + i18n_get('dialogs',wsi,'Show/Hide content') + '</span>' +
    		 '</button>' +
    		 '<button type="button" id="asm_ins" aria-label="Show instruction" ' +
    		 '        onclick="wepsim_click_asm_columns(\'ins\'); return false;" ' +
                     '        class="btn btn-sm btn-block btn-outline-secondary mb-1">' + 
    		 '<span class="float-left">' + i18n_get('dialogs',wsi,'Show/Hide assembly') + '</span>' +
    		 '</button>' +
    		 '<button type="button" id="asm_pins" aria-label="Show pseudoinstruction" ' +
    		 '        onclick="wepsim_click_asm_columns(\'pins\'); return false;" ' +
                     '        class="btn btn-sm btn-block btn-outline-secondary mb-1">' + 
    		 '<span class="float-left">' + i18n_get('dialogs',wsi,'Show/Hide pseudo-instructions') + '</span>' +
    		 '</button>' +
                     '<button type="button" id="close" data-role="none" ' +
                     '        class="btn btn-sm btn-danger w-100 p-0 mt-1" ' +
                     '        onclick="$(\'#' + asm_po + '\').popover(\'hide\');">' + 
    		          i18n_get('dialogs',wsi,'Close') +
    		 '</button>' ;
    
             return o ;
        }

        // execution bar

        var show_asmdbg_pc_deferred = null;

	function innershow_asmdbg_pc ( )
	{
	    fullshow_asmdbg_pc();
	    show_asmdbg_pc_deferred = null;
	}

	function show_asmdbg_pc ( )
	{
            if (get_cfg('DBG_delay') > 5)
	        return fullshow_asmdbg_pc();

            if (null == show_asmdbg_pc_deferred)
                show_asmdbg_pc_deferred = setTimeout(innershow_asmdbg_pc, cfg_show_asmdbg_pc_delay);
	}

        var old_addr = 0;

	function fullshow_asmdbg_pc ( )
	{
		if (typeof document == "undefined") {
		    return ;
		}

                var o1 = null ;

	        var pc_name = simhw_sim_ctrlStates_get().pc.state ;
	        var reg_pc  = get_value(simhw_sim_state(pc_name)) ;
                var curr_addr = "0x" + reg_pc.toString(16) ;
                var curr_firm = simhw_internalState('FIRMWARE') ;

                if (typeof curr_firm.assembly[old_addr] != "undefined")
                {
                     o1 = $("#asmdbg" + old_addr) ;
                     o1.css('background-color', curr_firm.assembly[old_addr].bgcolor) ;
                }
                else
                {
                     for (var l in curr_firm.assembly)
                     {
                          o1 = $("#asmdbg" + l) ;
                          o1.css('background-color', curr_firm.assembly[l].bgcolor) ;
                     }
                }
                old_addr = curr_addr ;

                o1 = $("#asmdbg" + curr_addr) ;
                o1.css('background-color', '#00EE88') ;

                return o1 ;
	}

        // breakpoints

        function asmdbg_set_breakpoint ( addr )
        {
                var icon_theme = get_cfg('ICON_theme') ;
                var hexaddr    = "0x" + addr.toString(16) ;
                var curr_firm  = simhw_internalState('FIRMWARE') ;

                var o1 = document.getElementById("bp"+hexaddr) ;
                var bp_state = curr_firm.assembly[hexaddr].breakpoint ;

                if (bp_state === true) {
                    bp_state = false ;
                    o1.innerHTML = "&nbsp;" ;
                } else {
                    bp_state = true ;
                    o1.innerHTML = sim_core_breakpointicon_get(icon_theme) ;
                }

                curr_firm.assembly[hexaddr].breakpoint = bp_state ;

		// add if recording
                simcore_record_append_new('Set assembly breakpoint at ' + addr,
                                          'asmdbg_set_breakpoint(' + addr + ');\n') ;

        }

        // current instruction in draw

        var show_dbg_ir_deferred = null;

	function show_dbg_ir ( decins )
	{
            if (null != show_dbg_ir_deferred) {
                return ;
            }

            show_dbg_ir_deferred = setTimeout(function() {
                                                   fullshow_dbg_ir(decins);
                                                   show_dbg_ir_deferred = null;
                                              }, cfg_show_dbg_ir_delay);
	}

	function fullshow_dbg_ir ( decins )
	{
	     if (typeof document == "undefined") {
	         return ;
             }

	     var o = document.getElementById('svg_p');
	     if (o != null) o = o.contentDocument;
	     if (o != null) o = o.getElementById('tspan3899');
	     if (o != null) o.innerHTML = decins ;

	         o = document.getElementById('svg_cu');
	     if (o != null) o = o.contentDocument;
	     if (o != null) o = o.getElementById('text3611');
	     if (o != null) o.innerHTML = decins ;
	}

