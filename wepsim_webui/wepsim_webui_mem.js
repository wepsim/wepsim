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
                                            var optValue = get_cfg('MEM_show_segments') ;
                                            $('#label19-' + optValue).button('toggle') ;

                                            var optValue = get_cfg('MEM_show_source') ;
                                            $('#label20-' + optValue).button('toggle') ;

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
            // (redraw==false && updates==true) -> update existing memory element
	    if ( (false == redraw) && (true == updates) )
            {
	        light_refresh_main_memory(memory, index, updates) ;
                return ;
	    }

            // -> read      existing memory element
            // -> write non-existing memory element
            // -> read  non-existing memory element
            show_main_memory_redraw = redraw || show_main_memory_redraw ;

            if (null !== show_main_memory_deferred) {
                return ;
	    }

            show_main_memory_deferred = setTimeout(function ()
                                                   {
						        if (show_main_memory_redraw == false)
						    	    light_refresh_main_memory(memory, index, updates) ;
                                                        else hard_refresh_main_memory(memory, index, updates) ;

                                                        show_main_memory_updates  = false ;
                                                        show_main_memory_redraw   = false ;
                                                        show_main_memory_deferred = null ;

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

            var value = [] ;
            for (var key in memory)
            {
                // [add segment]
                s1 = '' ;
                s2 = '' ;
		while ( (seglabels_i < seglabels.length) && (parseInt(key) >= seglabels[seglabels_i].begin) )
		{
                    seg_id = 'seg_id' + seglabels_i ;

                    s1 = '<a class="list-group-item list-group-item-action py-0 border-secondary" ' +
                         '   onclick="scroll_memory_to_segment(\'' + seg_id + '\');">' +
                         seglabels[seglabels_i].name +
                         '</a>' ;
                    s2 = '<div id="' +  seg_id + '" class="row" ' +
                         '     data-toggle="collapse" href="#lst_seg1">' +
                         '<u>' + seglabels[seglabels_i].name + '</u>' +
                         '</div>' ;

		    seglabels_i++ ;
		}
                if (s1 !== '') o1 += s1 ;
                if (s2 !== '') o2 += s2 ;

                // add row
                o2 += main_memory_showrow(memory, key, (key == index), SIMWARE.revlabels2) ;
            }

	    if (typeof memory[index] == "undefined") {
                o2 += main_memory_showrow(memory, index, true, SIMWARE.revlabels2) ;
	    }

            // pack and load html
	    o1 = '<div class="container-fluid">' +
	         '<div class="row">' +
                 '<div class="list-group sticky-top col-auto collapse" ' +
                 '     id="lst_seg1">' + o1 + '</div>' +
                 '<div data-spy="scroll" data-target="#lst_seg1" data-offset="0" ' +
                 '     style="overflow-y:scroll; -webkit-overflow-scrolling:touch; height:50vh; width:inherit;"' +
                 '     class="col" id="lst_ins1">' + o2 + '</div>' +
                 '</div>' +
                 '</div>' ;

            $("#memory_MP").html(o1) ;

            // * Mandatory activation of html elements
            update_badges() ;

            // * Configure html options
            scroll_memory_to_address(index) ;

            if (get_cfg('MEM_show_segments'))
                 $("#lst_seg1").collapse("show") ;
            else $("#lst_seg1").collapse("hide") ;

            if (get_cfg('MEM_show_source'))
                 $(".mp_tooltip").collapse("show") ;
            else $(".mp_tooltip").collapse("hide") ;

            // * Update old_main_add for light_update
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

            // blue for last memory access
            o1 = $("#addr" + old_main_addr) ;
            o1.css('color', 'black') ;
            o1.css('font-weight', 'normal') ;

            old_main_addr = index ;

            o1 = $("#addr" + old_main_addr) ;
            o1.css('color', 'blue') ;
            o1.css('font-weight', 'bold') ;

            // show badges
            update_badges() ;
        }

        function main_memory_showrow ( memory, addr, is_current, revlabels )
        {
            var o = "" ;
            var i = 0 ;

            // valkeys
            var valkeys = [] ;
            var idi     = [] ;
            for (i=0; i<4; i++)
            {
                 var addri  = parseInt(addr) + i ;
		 valkeys[i] = addri.toString(16) ;
                 idi[i]     = "mpval" + addri ;
            }

            // get value
            var value = main_memory_getword(memory, addr) ;
            var src   =  main_memory_getsrc(memory, addr) ;

            // format of the value
            var rf_format = get_cfg('MEM_display_format') ;
            rf_format = rf_format.replace('_fill', '_nofill') ;
            for (i=0; i<4; i++) {
                 value[i] = value2string(rf_format, parseInt(value[i], 16)) ;
                 value[i] = simcoreui_pack(value[i], 2) ;
            }

            // wcolor
            var wcolor = "color:black; font-weight:normal; " ;
	    if (is_current) {
                wcolor = "color:blue;  font-weight:bold; " ;
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
	        "<div class='col-1 px-0' align='center'>" +
                     '<span id="bg' + addr + '" class="mp_row_badge"></span>' +
                "</div>"+
		"<div class='col-5 pr-2' align='right'>" +
                     '<small>0x</small>' + simcoreui_pack(valkeys[3], 5).toUpperCase() +
                     '<span> ... </span>' +
                     '<span class="d-none d-sm-inline-flex"><small>0x</small></span>' +
                     simcoreui_pack(valkeys[0], 5).toUpperCase() +
                "</div>" +
	        "<div class='col-6 px-3'  align='left'>" + value2 + "</div>" +
	        "<div class='col-6 w-100 mp_tooltip collapse hide' align='left'>&nbsp;</div>" +
	        "<div class='col-6 px-3  mp_tooltip collapse hide' align='left'>" +
                "<span class='bg-dark text-white px-2 rounded'>" + src + "</span>" +
                "</div>"+
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

        function main_memory_getsrc ( memory, key )
        {
            // get value...
            var src = "" ;
            if (typeof memory[key] !== "undefined")
            {
                if (typeof memory[key].source !== "undefined")
                    src = memory[key].source ;
            }

            // escape html end attribute char
            src = src.replace(/'/g, '') ;
            src = src.replace(/"/g, '') ;

	    return src ;
        }

        function scroll_memory_to_segment ( seg_id )
        {
            return scroll_element('#lst_ins1', '#'+seg_id, -150) ;
        }

        function scroll_memory_to_address ( addr )
        {
            return scroll_element('#lst_ins1', '#addr'+addr, -150) ;
        }

        function scroll_memory_to_lastaddress ( )
        {
            return scroll_element('#lst_ins1', '#addr'+old_main_addr, -150) ;
        }

        function update_badges ( )
        {
            var r_ref   = null ;
            var r_value = 0 ;

            // clear all old badges
            $('.mp_row_badge').html('') ;

            // PC
            r_ref = simhw_sim_ctrlStates_get().pc ;
            if (typeof r_ref !== "undefined")
                r_ref = simhw_sim_state(r_ref.state) ;
            if (typeof r_ref !== "undefined")
                r_value = get_value(r_ref) ;
            if (typeof r_ref !== "undefined")
                $("#bg" + r_value).html('<div class="badge badge-primary">PC</div>') ;

            // SP
            var curr_firm = simhw_internalState('FIRMWARE') ;
            var sp_name = curr_firm.stackRegister ;
            if (sp_name != null)
                r_value = get_value(simhw_sim_states().BR[sp_name]) - 3 ;
            if (sp_name != null)
                $("#bg" + r_value).html('<div class="badge badge-primary">SP</div>') ;
        }


        /*
         * Quick menu (display format)
         */

        function quick_config_mem ( )
        {
	      return "<div class='container mt-1'>" +
                     "<div class='row'>" +
                         quickcfg_html_header("Display format") +
                         quickcfg_html_btn("0x3B<sub>16</sub>",
				           "update_cfg(\"MEM_display_format\", \"unsigned_16_nofill\"); " +
					   "show_memories_values();") +
                         quickcfg_html_btn("073<sub>8</sub>",
					   "update_cfg(\"MEM_display_format\", \"unsigned_8_nofill\"); " +
					   "show_memories_values();") +
                         quickcfg_html_btn("59<sub>10</sub>",
					   "update_cfg(\"MEM_display_format\", \"unsigned_10_nofill\"); " +
					   "show_memories_values();") +
                         quickcfg_html_btn(";<sub>ascii</sub>",
					   "update_cfg(\"MEM_display_format\", \"char_ascii_nofill\"); " +
					   "show_memories_values();") +
                     "<div class='w-100 border border-light'></div>" +
                         quickcfg_html_header("Display segments") +
			 quickcfg_html_onoff('19',
					     'show segments',
					     "  $('#lst_seg1').collapse('hide');" +
					     "  update_cfg('MEM_show_segments', false);",
					     "  $('#lst_seg1').collapse('show');" +
					     "  update_cfg('MEM_show_segments', true);") +
                         quickcfg_html_header("Display origin") +
			 quickcfg_html_onoff('20',
					     'show origin',
					     "  $('.mp_tooltip').collapse('hide');" +
					     "  update_cfg('MEM_show_source', false);",
					     "  $('.mp_tooltip').collapse('show');" +
					     "  update_cfg('MEM_show_source', true);") +
	             "<div class='w-100 border border-light'></div>" +
		       "<div class='col p-1 mt-3'>" +
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

