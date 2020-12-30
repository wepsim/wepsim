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
        class ws_mainmemory extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		    // parent
		    super();
	      }

              // render
	      render ( )
	      {
	            this.render_skel() ;
	            this.render_populate() ;
	      }

	      render_skel ( )
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
		    wepsim_init_quickcfg("[data-toggle=popover-mem]",
			                 "click",
			                 quick_config_mem,
					 function(shownEvent) {
                                             var optValue = get_cfg('MEM_show_segments') ;
                                             $('#label19-' + optValue).button('toggle') ;
                                                 optValue = get_cfg('MEM_show_source') ;
                                             $('#label20-' + optValue).button('toggle') ;
					 }) ;
	      }

	      render_populate ( )
	      {
		    // main memory
		    var pc_name = simhw_sim_ctrlStates_get().pc.state ;
		    var reg_pc  = get_value(simhw_sim_state(pc_name)) ;
		    var mp_ref  = simhw_internalState('MP') ;

                    if (Object.keys(mp_ref).length !== 0) {
		        show_main_memory(mp_ref, reg_pc, true, true) ;
                    }
	      }
        }

        register_uielto('ws-mainmemory', ws_mainmemory) ;


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
            // configuration
            var cfg = {} ;
                cfg.direction = get_cfg('MEM_display_direction') ;
                cfg.format    = get_cfg('MEM_display_format') ;
                cfg.format    = cfg.format.replace('_fill', '_nofill') ;
                cfg.showsegs  = get_cfg('MEM_show_segments') ;
                cfg.showsrc   = get_cfg('MEM_show_source') ;

            // labels (seg)
            var SIMWARE = get_simware() ;
            var seglabels = SIMWARE.revseg ;

            // memory
            var base_addrs = main_memory_get_baseaddr() ;
            var memory_cpy = Object.assign({}, memory) ;
            for (var elto in base_addrs)
            {
                 // skip pointers to zero
                 if (parseInt(base_addrs[elto]) == 0) {
                     continue ;
                 }

                 if (typeof main_memory_get(memory_cpy, base_addrs[elto]) == "undefined") {
                     main_memory_set(memory_cpy, base_addrs[elto], 0, '') ;
                 }
            }
            if (typeof main_memory_get(memory_cpy, index) == "undefined") {
                main_memory_set(memory_cpy, index, 0, '') ;
            }

            // temporal variables
	    var o1 = '' ;
	    var o2 = '' ;

	    var s1 = '' ;
	    var s2 = '' ;
            var seglabels_i = 0 ;

            var value   = [] ;
            var i_key   = 0 ;
            var i_index = parseInt(index) ;
            var keys = main_memory_getkeys(memory_cpy) ;
            for (var k=0; k<keys.length; k++)
            {
                i_key = parseInt(keys[k]) ;

                // [add segment]
                s1 = s2 = '' ;
		while ( (seglabels_i < seglabels.length) && (i_key >= seglabels[seglabels_i].begin) )
		{
                    s1 = main_memory_showseglst('seg_id' + seglabels_i, seglabels[seglabels_i].name) ;
                    s2 = main_memory_showsegrow('seg_id' + seglabels_i, seglabels[seglabels_i].name) ;

		    seglabels_i++ ;
		}
                if (s1 !== '') o1 += s1 ;
                if (s2 !== '') o2 += s2 ;

                // (add row)
                o2 += main_memory_showrow(cfg, memory_cpy, keys[k], (keys[k] == index), SIMWARE.revlabels2) ;
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

            var pos = element_scroll_get("#lst_ins1") ;
            $("#memory_MP").html(o1) ;

            // * Activation of html badges
            update_badges() ;

            // * Configure html options
            element_scroll_set("#lst_ins1", pos) ;

            if (cfg.showsegs)
                 $("#lst_seg1").collapse("show") ;
            else $("#lst_seg1").collapse("hide") ;

            if (cfg.showsrc)
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
                var ri = 0 ;
                var svalue  = main_memory_getword(memory, index) ;
		for (var i=0; i<4; i++)
		{
		     ri = 4 - i - 1 ;
		     $("#mpval" + (index + i)).html(svalue[ri]) ;
		}
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

        function main_memory_showseglst ( seg_id, seg_name )
        {
            return '<a class="list-group-item list-group-item-action py-0 border-secondary" ' +
                   '   onclick="scroll_memory_to_segment(\'' + seg_id + '\');">' +
                   seg_name +
                   '</a>' ;
        }

        function main_memory_showsegrow ( seg_id, seg_name )
        {
            return '<div id="' +  seg_id + '" class="row" data-toggle="collapse" href="#lst_seg1">' +
                   '<u>' + seg_name + '</u>' +
                   '</div>' ;
        }

        function main_memory_showrow ( cfg, memory, addr, is_current, revlabels )
        {
            var o  = "" ;
            var i  = 0 ;
            var ri = 0 ;

            // valkeys
            var valkeys = [] ;
            var idi     = [] ;
            for (i=0; i<4; i++)
            {
                 if (cfg.direction == 'h2l')
                      ri = 4 - i - 1 ;
                 else ri = i ;

                 var addri  = parseInt(addr) + ri ;
		 valkeys[i] = addri.toString(16) ;
                 idi[i]     = "mpval" + addri ;
            }

            // get value
            var value = main_memory_getword(memory, addr) ;
            var src   =  main_memory_getsrc(memory, addr) ;

            // format of the value
            for (i=0; i<4; i++)
            {
                 value[i] = value2string(cfg.format, parseInt(value[i], 16)) ;
                 value[i] = simcoreui_pack(value[i], 2) ;
            }

            // format of the source
            var src_html  = '' ;
            var src_parts = src.split(";") ;
            for (i=0; i<src_parts.length; i++)
            {
                 if (cfg.direction == 'h2l')
                      ri = src_parts.length - i - 1 ;
                 else ri = i ;

                 src_html += "<span class='bg-dark text-white px-1 mx-1 rounded'>" + src_parts[ri] + "</span>" ;
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
                 if (cfg.direction == 'h2l')
                      ri = i ;
                 else ri = 4 - i - 1 ;

                 valuei = '<span id="' + idi[i] + '">' + value[ri] + '</span>' ;
                 labeli = revlabels["0x" + valkeys[i]] ;
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
		"<div class='col-6 col-md-5 pr-2' align='right'>" +
                     '<small>0x</small>' + simcoreui_pack(valkeys[0], 5).toUpperCase() +
                     '<span> ... </span>' +
                     '<span class="d-none d-sm-inline-flex"><small>0x</small></span>' +
                     simcoreui_pack(valkeys[3], 5).toUpperCase() +
                "</div>" +
	        "<div class='col-5 col-md-6 px-3'  align='left'>" + value2 + "</div>" +
	        "<div class='col-7 col-md-6 w-100 mp_tooltip collapse hide' align='left'>&nbsp;</div>" +
	        "<div class='col-5 col-md-6 px-3  mp_tooltip collapse hide' align='left'>" + src_html + "</div>"+
                "</div>";

	    return o ;
        }

        function scroll_memory_to_segment ( seg_id )
        {
            return element_scroll_setRelative('#lst_ins1', '#'+seg_id, -150) ;
        }

        function scroll_memory_to_address ( addr )
        {
            return element_scroll_setRelative('#lst_ins1', '#addr'+addr, -150) ;
        }

        function scroll_memory_to_lastaddress ( )
        {
            return element_scroll_setRelative('#lst_ins1', '#addr'+old_main_addr, -150) ;
        }

        function update_badges ( )
        {
            var html = {} ;
	    var tobe_updated = {} ;
	    var tobe_updated_any = false ;
            var elto = null ;

            var base_addrs = main_memory_get_baseaddr() ;
            for (elto in base_addrs)
            {
                 html[elto] = '' ;
                 if (base_addrs[elto] != null) {
                     html[elto] = $("#bg" + base_addrs[elto]).html() ;
                 }

	         tobe_updated[elto] = (base_addrs[elto] != null) && (html[elto] == '') ;
	         tobe_updated_any = tobe_updated_any || tobe_updated[elto] ;
            }

            // if nothing change then skip updates
	    if (!tobe_updated_any) {
                return ;
            }

            // clear all old badges and update current active badges
            var old_html = '' ;
            $('.mp_row_badge').html('') ;
            for (elto in base_addrs)
            {
                 // skip pointers to zero
                 if (parseInt(base_addrs[elto]) == 0) {
                     continue ;
                 }

		 old_html  = $("#bg" + base_addrs[elto]).html() ;
                 old_html += '<div class="badge badge-primary mx-1">' + elto.toUpperCase() + '</div>' ;
		 $("#bg" + base_addrs[elto]).html(old_html) ;
            }
        }


        /*
         * Quick menu (display format)
         */

        function quick_config_mem ( )
        {
	      return "<div class='container mt-1'>" +
                     "<div class='row'>" +
                         quickcfg_html_header("Display format") +
                         quickcfg_html_btn("(*) 0x3B<sub>16</sub>",
				           "update_cfg(\"MEM_display_format\", \"unsigned_16_nofill\"); " +
					   "show_memories_values();",
                                           "col-6") +
                         quickcfg_html_btn("073<sub>8</sub>",
					   "update_cfg(\"MEM_display_format\", \"unsigned_8_nofill\"); " +
					   "show_memories_values();",
                                           "col-6") +
                         quickcfg_html_btn("59<sub>10</sub>",
					   "update_cfg(\"MEM_display_format\", \"unsigned_10_nofill\"); " +
					   "show_memories_values();",
                                           "col-6") +
                         quickcfg_html_btn(";<sub>ascii</sub>",
					   "update_cfg(\"MEM_display_format\", \"char_ascii_nofill\"); " +
					   "show_memories_values();",
                                           "col-6") +
                     quickcfg_html_br() +
                         quickcfg_html_header("Display direction") +
                         quickcfg_html_btn("(*) 04 -> 00",
					   "update_cfg(\"MEM_display_direction\", \"h2l\"); " +
					   "show_memories_values();",
                                           "col-6") +
                         quickcfg_html_btn("00 -> 04",
					   "update_cfg(\"MEM_display_direction\", \"l2h\"); " +
					   "show_memories_values();",
                                           "col-6") +
                     quickcfg_html_br() +
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
                     quickcfg_html_br() +
                       quickcfg_html_close('popover-mem') +
		     "</div>" +
		     "</div>" ;
        }

