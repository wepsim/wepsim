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


        /*
         *  Main Memory
         */

        /* jshint esversion: 6 */
        class ws_mainmemory extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
		    // html holder
		    var o1 = "<div class='container text-right'>" +
                             "<a data-toggle='popover-mem' id='popover-mem' " +
			     "   tabindex='0' class='m-auto show multi-collapse-3'>" +
                             "<strong><strong class='fas fa-wrench text-secondary'></strong></strong>" +
                             "</a>" +
                             "</div>" +
		             "<div id='memory_MP' style='height:58vh; width:inherit;'></div>" ;

		    this.innerHTML = o1 ;

                    // initialize loaded components
		    $("[data-toggle=popover-mem]").popover({
			    html:      true,
			    placement: 'auto',
			    animation: false,
			    trigger:   'click',
			    template:  '<div class="popover shadow" role="tooltip">' +
				       '<div class="arrow"></div>' +
				       '<h3  class="popover-header"></h3>' +
				       '<div class="popover-body"></div>' +
				       '</div>',
			    container: 'body',
			    content:    quick_config_mem,
			    sanitizeFn: function (content) {
					    return content ; // DOMPurify.sanitize(content) ;
					}
		    }).on('shown.bs.popover',
					function(shownEvent) {
					    i18n_update_tags('cfg') ;
					}) ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-mainmemory', ws_mainmemory) ;
        }


        /*
         *  Main Memory UI
         */

        var show_main_memory_deferred = null;
        var show_main_memory_redraw   = false;

        function wepsim_show_main_memory ( memory, index, redraw, updates )
        {
            if (get_cfg('DBG_delay') > 3) {
                show_main_memory_redraw  = redraw || show_main_memory_redraw ;
	    }

            if (null !== show_main_memory_deferred) {
                return ;
	    }

            show_main_memory_redraw = redraw ;
            show_main_memory_deferred = setTimeout(function ()
                                                   {
						        if (show_main_memory_redraw == false)
						    	    light_refresh_main_memory(memory, index, updates);
                                                        else hard_refresh_main_memory(memory, index, updates) ;

                                                        show_main_memory_deferred = null;
                                                        show_main_memory_updates  = false;

                                                   }, cfg_show_main_memory_delay);
        }

        function hard_refresh_main_memory ( memory, index, redraw )
        {
            var SIMWARE = get_simware() ;
            var seglabels = SIMWARE.revseg ;

	    var o1 = '' ;
	    var o2 = '' ;

	    var s1 = '' ;
	    var s2 = '' ;
            var seglabels_i = 0 ;
            var seg_id   = '' ;
            var seg_name = '' ;

            var value = [] ;
            for (var key in memory)
            {
                // [add segment]
                s1 = '' ;
                s2 = '' ;
		while ( (seglabels_i < seglabels.length) && (parseInt(key) >= seglabels[seglabels_i].begin) )
		{
                    seg_id   = 'seg_id' + seglabels_i ;
                    seg_name = seglabels[seglabels_i].name ;

                    s1 = '<a class="list-group-item list-group-item-action py-0 border-secondary" ' +
                         '   onclick="scroll_memory(\'' + seg_id + '\');">' + seg_name + '</a>' ;
                    s2 = '<div id="' +  seg_id + '" class="row" data-toggle="collapse" href="#lst_seg1">' + 
                         '<c>' + seg_name + '</c>' + 
                         '</div>' ;

		    seglabels_i++ ;
		}
                if (s1 !== '') o1 += s1 ;
                if (s2 !== '') o2 += s2 ;

                // add row
                value = main_memory_getword(memory, key) ;
                o2   += main_memory_showrow(key, value, (key == index), SIMWARE.revlabels2) ;
            }

	    if (typeof memory[index] == "undefined")
            {
                value = main_memory_getword(memory, index) ;
                o2   += main_memory_showrow(index, value, true, SIMWARE.revlabels2) ;
	    }

            // pack and load html
	    o1 = '<div class="container-fluid">' +
	         '<div class="row">' +
                 '<div class="list-group sticky-top col-auto collapse show" ' +
                 '     id="lst_seg1">' + o1 + '</div>' +
                 '<div data-spy="scroll" data-target="#lst_seg1" data-offset="0" ' +
                 '     style="overflow-y:scroll; -webkit-overflow-scrolling:touch; height:50vh; width:inherit;"' +
                 '     class="col" id="lst_ins1">' + o2 + '</div>' +
                 '</div>' +
                 '</div>' ;

            $("#memory_MP").html(o1) ;

            // scroll up/down to index element...
	    if (redraw) {
                scroll_memory('addr' + index) ;
            }

            // update old_main_add for light_update
            old_main_addr = index ;
        }

        var old_main_addr = 0;

        function light_refresh_main_memory ( memory, index, redraw )
        {
            if (redraw)
            {
                var svalue  = main_memory_getword(memory, index) ;

                $("#mpval" + (index + 0)).html(svalue[0]) ;
                $("#mpval" + (index + 1)).html(svalue[1]) ;
                $("#mpval" + (index + 2)).html(svalue[2]) ;
                $("#mpval" + (index + 3)).html(svalue[3]) ;
            }

            o1 = $("#addr" + old_main_addr) ;
            o1.css('color', 'black') ;
            o1.css('font-weight', 'normal') ;

            old_main_addr = index ;

            o1 = $("#addr" + old_main_addr) ;
            o1.css('color', 'blue') ;
            o1.css('font-weight', 'bold') ;
        }

        function scroll_memory ( obj_id )
        {
	    var obj_byid = $('#' + obj_id) ;
	    if (obj_byid.length > 0)
            {
	        var topPos = obj_byid[0].offsetTop ;
	            obj_byid = $('#lst_ins1') ;
	        if (obj_byid.length > 0)
	            obj_byid[0].scrollTop = topPos - 150 ;
            }
        }

        function main_memory_showrow ( addr, value, is_current, revlabels )
        {
            var o = "" ;
            var i = 0 ;

            // wcolor
            var wcolor = "color:black; font-weight:normal; " ;
	    if (is_current) {
                wcolor = "color:blue;  font-weight:bold; " ;
            }

            // valkeys
            var valkeys = [] ;
            var idi     = [] ;
            for (i=0; i<4; i++)
            {
                 var addri  = parseInt(addr) + i ;
		 valkeys[i] = addri.toString(16) ;
                 idi[i]     = "mpval" + addri ;
            }

            // format of the value
            var rf_format = get_cfg('MEM_display_format') ;
            rf_format = rf_format.replace('_fill', '_nofill') ;
            for (i=0; i<4; i++) {
                 value[i] = value2string(rf_format, parseInt(value[i], 16)) ;
                 value[i] = simcoreui_pack(value[i], 2) ;
            }

            // value2
            var labeli = '' ;
            var valuei = '' ;

            var value2 = '' ;
            for (i=0; i<4; i++)
            {
                valuei = '<span id="' + idi[i] + '">' + value[i] + '</span>' ;
                labeli = revlabels["0x" + valkeys[3-i]] ;
                if (typeof labeli !== "undefined")
                {
                     valuei = '<span>' +
                              '<span style="border:1px solid gray;">' + valuei + '</span>' +
                              '<span class="badge badge-pill badge-info" ' +
                              '      style="position:relative;top:-8px;z-index:2">' + labeli + '</span>' +
                              '</span>' ;
                }

                value2 += '<span class="mr-1">' + valuei + '</span>' ;
            }

            // build HTML
	    o = "<div class='row' id='addr" + addr + "'" +
                "     style='" + wcolor + " font-size:small; border-bottom: 1px solid lightgray !important'>" +
		"<div class='col-6 pr-2' align='right'>" +
                     '<small>0x</small>' + simcoreui_pack(valkeys[3], 5).toUpperCase() +
                     '<span> ... </span>' +
                     '<span class="d-none d-sm-inline-flex"><small>0x</small></span>' +
                     simcoreui_pack(valkeys[0], 5).toUpperCase() +
                "</div>" +
	        "<div class='col-6 px-3' align='left'>" + value2 + "</div>"+
                "</div>";

	    return o ;
        }

        function main_memory_getword ( memory, key )
        {
            // get value...
            var value = "0" ;
            if (typeof memory[key] !== "undefined") {
                value = get_value(memory[key]).toString(16) ;
            }
	    value = simcoreui_pack(value, 8) ;

            // pack value...
	    var value4 = [] ;
            for (var i=0; i<4; i++) {
                 value4[i] = value[2*i].toUpperCase() + value[2*i+1].toUpperCase() ;
            }

	    return value4 ;
        }


        /*
         * Quick menu (display format)
         */

        function quick_config_mem_htmlformat ( label2, format2 )
        {
	      return "<div class='col-6 p-1'>" +
		     "<buttom class='btn btn-sm btn-outline-secondary col p-1 text-right float-right' " +
		     "        onclick='update_cfg(\"MEM_display_format\", \"" + format2 + "\"); " +
                     "                 show_memories_values();" +
                     "                 return true; '>" +
		     "<span class='mx-auto px-1 font-weight-bold rounded text-dark' style='background-color:#CEECF5; '>" + label2 + "</span></buttom>" +
		     "</div>" ;
        }

        function quick_config_mem ( )
        {
	      return "<div class='container mt-1'>" +
                     "<div class='row'>" +
	               "<div class='col-12 p-0'>" +
                       "<span data-langkey='Display format'>Display format</span>" +
                       "</div>" +
                         quick_config_mem_htmlformat("0x3B<sub>16</sub>", "unsigned_16_nofill") +
                         quick_config_mem_htmlformat("073<sub>8</sub>",   "unsigned_8_nofill") +
                         quick_config_mem_htmlformat("59<sub>10</sub>",   "unsigned_10_nofill") +
                         quick_config_mem_htmlformat(";<sub>ascii</sub>", "char_ascii_nofill") +
	             "<div class='w-100 border border-light'></div>" +
		       "<div class='col p-1'>" +
		       "<button type='button' id='close' data-role='none' " +
		       "        class='btn btn-sm btn-danger w-100 p-0 mt-1' " +
		       "        onclick='$(\"#popover-mem\").popover(\"hide\");'>" +
                       "<span data-langkey='Close'>Close</span>" +
                       "</button>" +
		       "</div>" +
		     "</div>" +
		     "</div>" ;
        }


        /*
         *  obj2html
         */

        function segments2html ( segments )
        {
	   var o1 = "<br>" ;

	   o1 += " <center>" +
                 " <table height='400px'>" +
	         " <tr>" +
	         " <td>" +
	         "<table style='border-style: solid' border='1' width='100%' height='100%'>" ;
	   for (var skey in segments)
	   {
	        if (segments[skey].name != ".stack")
	   	    o1 += "<tr><td valign='middle' align='center' height='60px' bgcolor='" + segments[skey].color + "'>" +
                          segments[skey].name +
                          "</td></tr>" +
	   	          "<tr><td valign='middle' align='center' height='25px'>...</td></tr>" ;
	   }
	   o1 += "<tr><td valign='middle' align='center' bgcolor='" + segments['.stack'].color + "'>" +
                 segments['.stack'].name +
                 "</td></tr>" +
	         "</table>" +
	         " </td>" +
	         " <td width='20px'>&nbsp;</td>" +
	         " <td>" +
	         " <table style='border-style: solid; border-width:0px; width:100%; height:100%'>" ;

           var sx = "" ;
           var sp = "" ;
	   for (skey in segments)
	   {
	       sx = "<tr>" +
	   	    "    <td valign='top' align='left' height='30px' style=''>" +
	   	    "    <div id='compile_begin_" + segments[skey].name + "'>" + segments[skey].begin + "</div>" +
	   	    "    </td>" +
	   	    " </tr>" +
	   	    " <tr>" +
	   	    "    <td valign='bottom' align='left' height='30px' style=''>" +
	   	    "    <div id='compile_end_"   + segments[skey].name + "'>" + segments[skey].end + "</div>" +
	   	    "    </td>" +
	   	    " </tr>" ;

	       if (segments[skey].name != ".stack")
	   	    o1 += sx + "<tr><td valign='middle' align='center' height='25px'>...</td></tr>" ;
               else sp  = sx ;
	   }
	   o1 += sp +
	         " </table>" +
	         " </td>" +
	         " </tr>" +
	         " </table>" +
	         " </center>" ;

	   return o1 ;
        }

	function assembly2html ( mp, labels, seg, asm )
	{
                var  s_label = "" ;
                var s1_instr = "" ;
                var s2_instr = "" ;
                var s3_bin   = "" ;
                var s4_hex   = "" ;
                var bgc = "#F0F0F0" ;
                var o = "" ;
		var l = "" ;

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

                o += "<center>" +
                     "<table data-role='table' class='table table-sm'>" +
                     "<tbody>" ;
                for (l in asm)
                {
                     if  (bgc === "#F0F0F0")
                          bgc = "#F8F8F8" ;
                     else bgc = "#F0F0F0" ;

                     asm[l].bgcolor = bgc ;

                     // instruction
                     s3_bin = get_value(mp[l]) ;
		     if (typeof s3_bin === 'undefined') {
		         s3_bin = 0 ;
                     }
                     s1_instr = asm[l].source ;
                     s2_instr = asm[l].source_original ;
                     s4_hex   = parseInt(s3_bin, 2).toString(16) ;
                     s4_hex   = "0x" + s4_hex.padStart(1*8, "0") ;
                             // "0x" + "00000000".substring(0, 1*8 - s4_hex.length) + s4_hex ;

                     // labels
                     s_label = "" ;
                     if (typeof a2l[l] != "undefined")
		     {
                         for (var i=0; i<a2l[l].length; i++) {
                              s_label = s_label + "<span class='badge badge-info'>" + a2l[l][i] + "</span>" ;
                         }
                     }

		     // mark pseudo + n-words
		     if (s1_instr === '') {
			 s2_instr = '<span class="text-secondary">' + s2_instr + '</span>' ;
		     }
		else if (s1_instr != s2_instr) {
			 s1_instr = '<span class="text-primary">' + s1_instr + '</span>' ;
			 s2_instr = '<span class="text-primary">' + s2_instr + '</span>' ;
		     }

                     // join the pieces...
                     if (typeof a2s[l] !== "undefined")
		     {
                         o += "<tr bgcolor='#FEFEFE'>" +
                              "<td colspan='7' style='line-height:0.3;' align='left'><small><font color='gray'>" + a2s[l] + "</font></small></td>" +
                              "</tr>" ;
		     }

                     o +=  "<tr id='asmdbg" + l + "' bgcolor='" + asm[l].bgcolor + "'>" +
                           "<td class='asm_label  text-monospace col-auto collapse pb-0' " +
                           "    style='line-height:0.9;' align=right" +
                           "    onclick='asmdbg_set_breakpoint(" + l + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" + s_label + "</td>" +
                           "<td class='asm_addr   text-monospace col-auto collapse' " +
                           "    style='line-height:0.9;'" +
                           "    onclick='asmdbg_set_breakpoint(" + l + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" + l + "</td>" +
                           "<td class='asm_break  text-monospace col-auto show py-0 px-0' " +
                           "    style='line-height:0.9;' id='bp" + l + "' width='1%'" +
                           "    onclick='asmdbg_set_breakpoint(" + l + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" +
			   "    <span data-toggle='tooltip' rel='tooltip1' title='click to toggle breakpoint'>.</span>" +
			   "</td>" +
                           "<td class='asm_hex    text-monospace col-auto collapse' " +
                           "    style='line-height:0.9;' align=left>" +
			   "    <span data-toggle='tooltip' rel='tooltip2' data-placement='right' data-html='true' data-l='" + l + "'>" +
			   "    <span data-toggle='tooltip' rel='tooltip1' data-placement='right' title='click to show instruction format details'>" +
				s4_hex +
			   "    </span>" +
			   "    </span>" +
		           "</td>" +
                           "<td class='asm_ins    text-monospace col-auto collapse' " +
                           "    style='line-height:0.9;'" +
                           "    onclick='asmdbg_set_breakpoint(" + l + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" + s1_instr + "</td>" +
                           "<td class='asm_pins   text-monospace col-auto collapse' " +
                           "    style='line-height:0.9;' align=left" +
                           "    onclick='asmdbg_set_breakpoint(" + l + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" + s2_instr + "</td>" +
                           "</tr>" ;
                }
                o += "</tbody>" +
                     "</table>" +
                     "</center>" ;

                return o ;
	}

