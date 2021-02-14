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


        /*
         *  DBG-MP
         */

        /* jshint esversion: 6 */
        class ws_dbg_mp extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
		    // html holder
		    var o1 = "<center>" +
		             "<div id='asm_table' style='overflow-x:auto; -webkit-overflow-scrolling:touch;'>" +
		   	     "<table class='table ui-responsive ui-table' style='margin-bottom:0px; min-width:700px;'>" +
		   	     "<thead>" +
			     "<tr style='border-top:2pt solid white;'>" +
			     "<th width='1%'>" +
			     "<a tabindex='0' href='#' class='show multi-collapse-3' data-toggle='popover2' id='popover2_asm'><strong class='fas fa-wrench text-secondary'></strong></a>" +
			     "</th>" +
                             "<th width='10%' class='asm_label collapse' align='right'><span data-langkey='labels'>labels</span></th>" +
			     "<th width='15%' class='asm_addr  collapse'              ><span><span data-langkey='addr'>addr</span></span><span class='d-none d-sm-inline-flex'><span data-langkey='ess'>ess</span></span></th>" +
                             "<th width='1%'  class='asm_addr  collapse' align='right'><span data-langkey='breakpoint'>breakpoint</span></th>" +
                             "<th width='14%' class='asm_hex   collapse' align='right'><span data-langkey='content'>content</span></th>" +
                             "<th width='30%' class='asm_ins   collapse' align='left' ><span data-langkey='assembly'>assembly</span></th>" +
			     "<th width='30%' class='asm_pins  collapse' align='left' ><span>pseudo</span><span class='d-none d-md-inline'><small><span data-langkey='instructions'>instructions</span></small></span></th>" +
			     "</tr>" +
			     "</thead>" +
			     "</table>" +
		   	     "</div>" +
			     "</center>" +
                             "" +
		             "<div id='asm_debugger_container'" +
                             "     style='overflow-y:auto; overflow-x:auto; max-height:60vh !important; -webkit-overflow-scrolling:touch;'>" +
                             "     <div id='asm_debugger' style='min-width:700px;'>" +
                             "     </div>" +
		             "</div>" ;

		    this.innerHTML = o1 ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-dbg-mp', ws_dbg_mp) ;
        }


        //
        // show/hide Assembly elements/header
        //

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

        // Content

        function default_asmdbg_content_horizontal_card ( index, datalangkey, content )
        {
    	    return "<div class='card m-3'>" +
    		   "  <div class='row no-gutters'>" +
    		   "  <div class='col-md-12'>" + // -
    		   "  <div class='card-body py-0'>" +
    		   "    <p class='card-text'>" +
    		   "    <div class='badge badge-primary'>" + index + "</div>" +
    		   "    <span data-langkey='" + datalangkey + "'>" + content + "</span>" +
    		   "    </p>" +
    		   "  </div>" +
    		   "  </div>" +
    		   "  </div>" +
    		   "</div>" ;
        }

        function default_asmdbg_content_horizontal ( )
        {
    	    var wsi = get_cfg('ws_idiom') ;

    	    var o = "<br>" +
                    default_asmdbg_content_horizontal_card("1",
					                   "simulator intro 1",
    	         					   i18n_get('gui', wsi, 'simulator intro 1') ) +
                    default_asmdbg_content_horizontal_card("2",
					                   "simulator intro 2",
    	         					   i18n_get('gui', wsi, 'simulator intro 2') ) +
                    default_asmdbg_content_horizontal_card("3",
					                   "simulator intro 3",
    	         					   i18n_get('gui', wsi, 'simulator intro 3') ) ;

    	    return o ;
        }

        function default_asmdbg_content_vertical_card ( index, datalangkey, content )
        {
    	  return "<div class='card m-2 col-sm'>" +
    		 "  <div class='card-body h-50 py-0'>" +
    		 "    <p class='card-text'>" +
    		 "    <div class='badge badge-primary'>" + index + "</div>" +
    		 "    <span data-langkey='" + datalangkey + "'>" + content + "</span>" +
    		 "    </p>" +
    		 "  </div>" +
    		 "</div>" ;
        }

        function default_asmdbg_content_vertical ( )
        {
    	    var wsi = get_cfg('ws_idiom') ;

    	    var o = "<br>" +
    		    "<div class='container-fluid'>" +
    		    "<div class='card-column row'>" +
                    default_asmdbg_content_vertical_card("1",
						         "simulator intro 1",
    	         				         i18n_get('gui', wsi, 'simulator intro 1')) +
                    default_asmdbg_content_vertical_card("2",
						         "simulator intro 2",
    	         				         i18n_get('gui', wsi, 'simulator intro 2')) +
                    default_asmdbg_content_vertical_card("3",
						         "simulator intro 3",
    	         				         i18n_get('gui', wsi,'simulator intro 3')) +
    		    "</div>" +
    		    "</div>" ;

    	    return o ;
        }

	function assembly2html ( mp, labels, seg )
	{
		var l = "" ;

                // prepare hashtable...
                var a2l = {} ;
                for (l in labels)
		{
                     if (typeof a2l[labels[l]] == "undefined") {
                         a2l[labels[l]] = [] ;
		     }
                     a2l[labels[l]].push(l);
                }

                var a2s = {} ;
                for (l in seg)
		{
                     laddr = "0x" + seg[l].begin.toString(16) ;
                     a2s[laddr] = l;
                }

                // prepare output...
	        var a          = "" ;
	        var p          = "" ;
                var s3_val     = "" ;
		var old_s3_val = '' ;
		var o_tde = '' ;
		var o_tdf = '' ;
                var n_ellipsis = 0 ;
		var s_label = "" ;

                var o = "<center>" +
                        "<table data-role='table' class='table table-sm'>" +
                        "<tbody>" ;
                for (l in mp)
                {
                     // get address and instruction/value
	             a = parseInt(l) ;
	             p = "0x" + a.toString(16) ;
		     s3_val = get_value(mp[l]) ;

                     // set cell bgcolor
	             if  (a % 8 === 0)
		          mp[l].bgcolor = "#F8F8F8" ;
	             else mp[l].bgcolor = "#F0F0F0" ;

                     // <skip data segments>
                  // if (false == mp[l].is_assembly) {
		  //     continue ;
                  // }
                     // </skip data segments>

                     // several data values repeated -> '...'
                     if (
                          (old_s3_val == s3_val) && 
                          (false == mp[l].is_assembly) &&
                          (typeof a2l[p] == 'undefined')
                     )
                     {
                         n_ellipsis++ ;
		         continue ;
                     }

                     if (n_ellipsis > 0)
                     {
                         o_tde = "<td class='text-monospace col-auto pb-0' " +
                                 "    style='line-height:0.9;' align='left'></td>" ;
                         o_tdf = "<td class='text-monospace col-auto pb-0' " +
                                 "    style='line-height:0.9;' align='left'>" +
                                 "&vellip;&vellip; &times;" + n_ellipsis + "</td>" ;
                         o += "<tr>" + o_tde + o_tdf + o_tde + o_tdf + o_tde + o_tde + o_tdf + "</tr>" ;
                         n_ellipsis = 0 ;
                     }
		     old_s3_val = s3_val ;

		     // labels
		     s_label = "" ;
		     if (typeof a2l[p] != "undefined")
		     {
			 for (var i=0; i<a2l[p].length; i++) {
			      s_label = s_label + "<span class='badge badge-info'>" + a2l[p][i] + "</span>" ;
			 }
		     }

		     // join the pieces...
		     if (typeof a2s[p] !== "undefined")
		     {
			 o += "<tr bgcolor='#FEFEFE'>" +
			      "<td colspan='7' style='line-height:0.3;' align='left'><small><font color='gray'>" + a2s[p] + "</font></small></td>" +
			      "</tr>" ;
		     }

                     // get row HTML code
                     if (mp[l].is_assembly)
	                  o += assembly2html_code_row(mp, l, s_label) ;
                     else o += assembly2html_data_row(mp, l, s_label) ;
                }
                o += "</tbody>" +
                     "</table>" +
                     "</center>" ;

                return o ;
	}

	function assembly2html_data_row ( mp, l, s_label )
	{
	     // data value
	     var s2_instr = main_memory_getsrc(mp, l) ;
	     var s3_val   = get_value(mp[l]) ;
	     var s4_hex   = parseInt(s3_val).toString(16) ;
	         s4_hex   = "0x" + s4_hex.padStart(1*8, "0") ;
	     var p        = "0x" + parseInt(l).toString(16) ;

	     // join the pieces...
	     var o = "<tr id='asmdbg" + p + "' bgcolor='" + mp[l].bgcolor + "'>" +
		     "<td class='asm_label  text-monospace col-auto collapse pb-0' " +
		     "    style='line-height:0.9;' align='right'>" + s_label +
		     "</td>" +
		     "<td class='asm_addr   text-monospace col-auto collapse' " +
		     "    style='line-height:0.9;'>" + p +
		     "</td>" +
		     "<td class='asm_break  text-monospace col-auto show p-0' " +
		     "    style='line-height:0.9;' id='bp" + p + "' width='1%'>" +
		     "</td>" +
		     "<td class='asm_hex    text-monospace col-auto collapse text-secondary' " +
		     "    style='line-height:0.9; width:13%' align='center'>" + s4_hex +
		     "</td>" +
		     "<td class='asm_dets   text-monospace col-auto show p-0' " +
		     "    style='line-height:0.9;' width='1%' align='left'>" +
		     "</td>" +
		     "<td class='asm_ins    text-monospace col-auto collapse text-secondary' " +
		     "    style='line-height:0.9;'>" + s2_instr +
		     "</td>" +
		     "<td class='asm_pins   text-monospace col-auto collapse text-secondary' " +
		     "    style='line-height:0.9;' align='left'>" + s2_instr + 
		     "</td>" +
		     "</tr>" ;

             return o ;
	}

	function assembly2html_code_row ( mp, l, s_label )
	{
	     // instruction
	     var s1_instr = mp[l].source ;
	     var s2_instr = main_memory_getsrc(mp, l) ;
	     var s3_val   = get_value(mp[l]) ;
	     var s4_hex   = parseInt(s3_val).toString(16) ;
	         s4_hex   = "0x" + s4_hex.padStart(1*8, "0") ;
	     var p        = "0x" + parseInt(l).toString(16) ;

	     // mark pseudo + n-words
	     if (s1_instr === '') {
		 s2_instr = '<span class="text-secondary">' + s2_instr + '</span>' ;
	     }
	else if (s1_instr != s2_instr) {
		 s1_instr = '<span class="text-primary">' + s1_instr + '</span>' ;
		 s2_instr = '<span class="text-primary">' + s2_instr + '</span>' ;
	     }

	     var oclk = "    onclick='asmdbg_set_breakpoint(" + p + "); " +
		        "             if (event.stopPropagation) event.stopPropagation();'" ;

	     // join the pieces...
             var o = '' ;
	     o +=  "<tr id='asmdbg" + p + "' bgcolor='" + mp[l].bgcolor + "'>" +
		   "<td class='asm_label  text-monospace col-auto collapse pb-0' " +
		   "    style='line-height:0.9;' align='right' " + oclk + ">" + s_label +
		   "</td>" +
		   "<td class='asm_addr   text-monospace col-auto collapse' " +
		   "    style='line-height:0.9;' " + oclk + ">" + p +
		   "</td>" +
		   "<td class='asm_break  text-monospace col-auto show p-0' " +
		   "    style='line-height:0.9;' id='bp" + p + "' width='1%' " + oclk + ">" +
	           "<span data-toggle='tooltip' rel='tooltip1' title='click to toggle breakpoint'>.</span>" +
		   "</td>" +
		   "<td class='asm_hex    text-monospace col-auto collapse' " +
		   "    style='line-height:0.9; width:13%' align='center' " + oclk + ">" + s4_hex +
		   "</td>" +
		   "<td class='asm_dets   text-monospace col-auto show p-0' " +
		   "    style='line-height:0.9;' width='1%' align='left'>" +
	           "<span data-toggle='tooltip' rel='tooltip2' data-placement='right' " +
		   "      data-html='true' data-l='" + l + "'>" +
		   "<span data-toggle='tooltip' rel='tooltip1' data-placement='right' " +
		   "      title='click to show instruction format details'>&nbsp;.&nbsp;</span>" +
		   "</span>" +
		   "</td>" +
		   "<td class='asm_ins    text-monospace col-auto collapse' " +
		   "    style='line-height:0.9;' " + oclk + ">" + s1_instr +
		   "</td>" +
		   "<td class='asm_pins   text-monospace col-auto collapse' " +
		   "    style='line-height:0.9;' align='left' " + oclk + ">" + s2_instr +
		   "</td>" +
		   "</tr>" ;

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
    		 '<span class="float-left">' + i18n_get('dialogs', wsi, 'Show/Hide labels') + '</span>' +
    		 '</button>' +
    		 '<button type="button" id="asm_hex" aria-label="Show content" ' +
    		 '        onclick="wepsim_click_asm_columns(\'hex\'); return false;" ' +
                     '        class="btn btn-sm btn-block btn-outline-secondary mb-1">' +
    		 '<span class="float-left">' + i18n_get('dialogs', wsi, 'Show/Hide content') + '</span>' +
    		 '</button>' +
    		 '<button type="button" id="asm_ins" aria-label="Show instruction" ' +
    		 '        onclick="wepsim_click_asm_columns(\'ins\'); return false;" ' +
                     '        class="btn btn-sm btn-block btn-outline-secondary mb-1">' +
    		 '<span class="float-left">' + i18n_get('dialogs', wsi, 'Show/Hide assembly') + '</span>' +
    		 '</button>' +
    		 '<button type="button" id="asm_pins" aria-label="Show pseudoinstruction" ' +
    		 '        onclick="wepsim_click_asm_columns(\'pins\'); return false;" ' +
                     '        class="btn btn-sm btn-block btn-outline-secondary mb-1">' +
    		 '<span class="float-left">' + i18n_get('dialogs', wsi, 'Show/Hide pseudo-instructions') + '</span>' +
    		 '</button>' +
                     '<button type="button" id="close" data-role="none" ' +
                     '        class="btn btn-sm btn-danger w-100 p-0 mt-2" ' +
                     '        onclick="$(\'#' + asm_po + '\').popover(\'hide\');">' +
    		          i18n_get('dialogs', wsi, 'Close') +
    		 '</button>' ;

             return o ;
        }

	function instruction2tooltip ( mp, l )
	{
    	   var wsi = get_cfg('ws_idiom') ;

           // prepare data: ins_quoted + firmware_reference
	   var ins_quoted     = main_memory_getsrc(mp, l) ;
	       ins_quoted     = ins_quoted.replace(/"/g, '&quot;').replace(/'/g, '&apos;') ;
	   var firm_reference = mp[l].firm_reference ;
	   var nwords         = parseInt(mp[l].firm_reference.nwords) ;

           // prepare data: ins_bin
	   var next = 0 ;
           var ins_bin = mp[l].binary ;
	   for (var iw=1; iw<nwords; iw++)
	   {
		  next = parseInt(l, 16) + iw*4 ; // 4 -> 32 bits
                  if (typeof mp[next] !== "undefined") {
                      ins_bin += get_value(mp[next]) ;
                  }
	   }

	   // instruction & bin
	   var o  = '<div class=\"text-center p-1 m-1 border border-secondary rounded\">\n' +
		    ins_quoted  + '<br>\n' +
		    '</div>' +
	       	    '<div class=\"text-left p-1 m-1\">\n' +
		    '<b>' + ins_bin + '</b>\n' +
		    '</div>' ;

	   // details: co, cop & fields
	   var u = '' ;
	   if (typeof    firm_reference.cop !== 'undefined') {
	       u = '+' + firm_reference.cop ;
	   }

	   o +=	'<div class=\"text-left px-2 my-1\">\n' +
	       	'<span class=\"square\">Format:</span>\n' +
	        '<ul class=\"mb-0\">\n' +
		' <li>' + firm_reference.name + ': <b>' + firm_reference.co + u + '</b></li>\n' ;
	   var fields = firm_reference.fields ;
	   for (var f=0; f<fields.length; f++) {
	        o += ' <li>' + fields[f].name + ': bits <b>' + fields[f].stopbit + '</b> to <b>' + fields[f].startbit + '</b></li>\n' ;
	   }
	   o += '</ul>\n' ;

	   // details: microcode
	   o += '<span class=\"user_microcode\">' + '<span class=\"square\">Microcode:</span>\n' +
	        '<ul class=\"mb-0\">\n' +
	  	' <li> starts: <b>0x'     + firm_reference['mc-start'].toString(16) + '</b></li>\n' +
		' <li> clock cycles: <b>' + firm_reference.microcode.length + '</b></li>\n' +
	        '</ul>\n' +
                '</span>' + '</span>' ;

	   // details: help
           if ('' != firm_reference.help.trim())
           {
	       o += '<span class=\"square\">Help:</span>\n' +
	            '<div class=\"ml-3\">\n' +
		    firm_reference.help + '\n' +
	            '</div>\n' +
                    '</span>' ;
           }

	   // close
	   o += '</div>' ;
           o += '<button type=\"button\" id=\"close\" data-role=\"none\" ' +
                '        class=\"btn btn-sm btn-danger w-100 p-0 mt-2\" ' +
                '        onclick=$(\".tooltip\").tooltip("hide");>' +
    		         i18n_get('dialogs', wsi, 'Close') +
    		'</button>' ;

	   return o ;
        }

        // execution bar

        var show_asmdbg_pc_deferred = null;

	function innershow_asmdbg_pc ( )
	{
	    fullshow_asmdbg_pc();
	    show_asmdbg_pc_deferred = null;

            return null ;
	}

	function wepsim_show_asmdbg_pc ( )
	{
            if (get_cfg('DBG_delay') > 5) {
	        return fullshow_asmdbg_pc();
	    }

            if (null == show_asmdbg_pc_deferred) {
                show_asmdbg_pc_deferred = setTimeout(innershow_asmdbg_pc, cfg_show_asmdbg_pc_delay);
	    }

            return null ;
	}

        var old_addr = 0;

	function fullshow_asmdbg_pc ( )
	{
                var o1 = null ;

                // check if Web interface enabled
		if (typeof document === "undefined") {
		    return o1 ;
		}

                var curr_mp       = simhw_internalState('MP') ;
	        var pc_name       = simhw_sim_ctrlStates_get().pc.state ;
	        var reg_pc        = get_value(simhw_sim_state(pc_name)) ;
                var curr_addr_hex = "0x" + reg_pc.toString(16) ;
                var old_addr_hex  = "0x" + old_addr.toString(16) ;

                // check if assembly is loaded
                if (typeof curr_mp === "undefined") {
		    return o1 ;
                }

                // set default for old asmdbg_pc
                var p = null ;
                if (typeof curr_mp[old_addr] !== "undefined")
                {
                     o1 = $("#asmdbg" + old_addr_hex) ;
                     o1.css('background-color', curr_mp[old_addr].bgcolor) ;
                }
                else
                {
                     for (var l in curr_mp)
                     {
                          p  = "0x" + l.toString(16) ;
                          o1 = $("#asmdbg" + p) ;
                          o1.css('background-color', curr_mp[l].bgcolor) ;
                     }
                }
                old_addr = reg_pc ;

                // try to set the current asmdbg_pc
                o1 = $("#asmdbg" + curr_addr_hex) ;
                o1.css('background-color', '#00EE88') ;

                // check if current asmdbg_pc is available
                if (typeof o1 === "undefined") {
		    return null ;
                }

                // if AutoScroll is enabled...
                if (get_cfg('AS_enable'))
                {
                    var obj_byid  = $('#asm_debugger_container') ;
                    var ani_delay = get_cfg('AS_delay') ;

                    if ( (typeof obj_byid !== 'undefined') &&
                         (typeof o1[0]    !== 'undefined') )
                    {
                          var h = obj_byid.height() ;
                          var d = o1[0].offsetTop - obj_byid.scrollTop() ;

                          if ( (d < 0) || (d > h) ) {
                              p = (o1[0].offsetTop < h) ? 0 : (o1[0].offsetTop - h/2) ;
                              obj_byid.animate({ scrollTop: p }, { duration: ani_delay }) ;
                          }
                    }
                }

                return o1 ;
	}

        // breakpoints

        function asmdbg_set_breakpoint ( addr )
        {
                // skip if no instruction
                var curr_mp = simhw_internalState('MP') ;
                if (false == curr_mp[addr].is_assembly) {
                    return ;
                }

		// toggle
                var hexaddr  = "0x" + addr.toString(16) ;
                var bp_state = wepsim_execute_toggle_breakpoint(hexaddr) ;

		// update ui
		var inner_elto = "." ;
                if (bp_state !== true) {
                    var icon_theme = get_cfg('ICON_theme') ;
                    inner_elto = sim_core_breakpointicon_get(icon_theme) ;
                }

		// update content
                $("span[rel='tooltip1']").tooltip('hide') ;

                var o1       = document.getElementById("bp" + hexaddr) ;
                o1.innerHTML = "<span data-toggle='tooltip' rel='tooltip1' title='click to toggle breakpoint'>" +
			       inner_elto +
			       "</span>" ;

		// refresh style+events
		wepsim_uicfg_apply() ;

                $("span[rel='tooltip1']").tooltip({
                        trigger:   'hover',
                        html:       true,
                        sanitizeFn: function (content) {
                                       return content ; // DOMPurify.sanitize(content) ;
                                    }
		}) ;

		// add if recording
                simcore_record_append_new('Set assembly breakpoint at ' + addr,
                                          'asmdbg_set_breakpoint(' + addr + ');\n') ;

        }

        // current instruction in draw

        var show_dbg_ir_deferred = null;

	function wepsim_show_dbg_ir ( decins )
	{
            if (null !== show_dbg_ir_deferred) {
                return ;
            }

            show_dbg_ir_deferred = setTimeout(function() {
                                                   fullshow_dbg_ir(decins);
                                                   show_dbg_ir_deferred = null;
                                              }, cfg_show_dbg_ir_delay);
	}

	function fullshow_dbg_ir ( decins )
	{
	     if (typeof document === "undefined") {
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

        // load assembly in the debugger

	function asmdbg_loadContent ( asmdbg_content )
	{
            $("#asm_debugger").html(asmdbg_content);

            setTimeout(function() {
                    $("span[rel='tooltip1']").tooltip({
                            trigger:   'hover',
                            html:       true,
                            sanitizeFn: function (content) {
                                           return content ; // DOMPurify.sanitize(content) ;
                                        }
		    }) ;

                    $("span[rel='tooltip2']").tooltip({
                            trigger:   'click',
                            html:       true,
                            title:      function() {
                                           $("span[rel='tooltip1']").tooltip('hide') ;
				           var l = this.getAttribute('data-l') ;
                                           var curr_mp = simhw_internalState('MP') ;
                                           return instruction2tooltip(curr_mp, l) ;
                                        },
                            sanitizeFn: function (content) {
                                           return content ; // DOMPurify.sanitize(content) ;
                                        }
		    }).on('shown.bs.tooltip', function(shownEvent) {
			   wepsim_uicfg_apply() ;
		    });

            }, 500) ;

            showhideAsmElements();
	}

	function asmdbg_update_assembly ( )
	{
            var SIMWARE = get_simware() ;
            var curr_mp = simhw_internalState('MP') ;

            var asmdbg_content = default_asmdbg_content_horizontal() ;
	    if (Object.keys(curr_mp).length !== 0) {
		 asmdbg_content = assembly2html(curr_mp, SIMWARE.labels2, SIMWARE.seg) ;
	    }

	    asmdbg_loadContent(asmdbg_content) ;
	}

