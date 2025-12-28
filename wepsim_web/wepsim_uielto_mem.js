/*
 *  Copyright 2015-2026 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
	      render ( event_name )
	      {
	            this.render_skel() ;
	            this.render_populate() ;
	      }

	      render_skel ( )
	      {
		    // html holder
		    var o1 = "<div class='container text-end multi-collapse-3 collapse show'>" +
                             '<span class="my-0" for="popover-mem" style="min-width:95%">' +
                             '<span data-langkey="quick config">quick config</span>: ' +
                             "<a data-bs-toggle='popover-mem' id='popover-mem' " +
			     "   tabindex='0' class='m-auto border-0'>" +
                             "<strong><strong class='fas fa-wrench text-secondary'></strong></strong>" +
                             "</a></span>" +
                             "</div>" +
		             "<div id='memory_MP' style='height:58vh; width:inherit;'></div>" ;

		    this.innerHTML = o1 ;

                    // initialize loaded components
                    wepsim_quickcfg_init('pomem1') ;
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
                cfg.nwords    = get_cfg('MEM_show_nwords') ;

            // labels (seg)
            var SIMWARE = get_simware() ;
            var seglabels = SIMWARE.hash_seg_rev ;

            // memory
            var base_addrs = main_memory_get_baseaddr() ;
            var memory_cpy = Object.assign({}, memory) ;
	    var melto      = null ;
            for (var elto in base_addrs)
            {
                 // skip pointers to zero
                 if (parseInt(base_addrs[elto]) == 0) {
                     continue ;
                 }

                 if (typeof main_memory_get(memory_cpy, base_addrs[elto]) == "undefined")
                 {
		     melto = {
				"value":           0,
				"source_tracking": null,
				"comments":        null
			     } ;

                     main_memory_set(memory_cpy, base_addrs[elto], melto) ;
                 }
            }
            if (typeof main_memory_get(memory_cpy, index) == "undefined")
            {
		melto = {
			   "value":           0,
			   "source_tracking": null,
			   "comments":        null
			} ;

                main_memory_set(memory_cpy, index, melto) ;
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
            var n_key   = 0 ;

            var keys = main_memory_getkeys(memory_cpy) ;
            var k = 0 ;
            while (k < keys.length)
            {
                i_key = parseInt(keys[k]) ;
                n_key = parseInt(keys[k+1]) ;

                // [add segment if needed]
                s1 = s2 = '' ;
		while ( (seglabels_i < seglabels.length) && (i_key >= seglabels[seglabels_i].begin) )
		{
                    if (".binary" != seglabels[seglabels_i].name)
                    {
                        // ".binary" is an assembly section but not a physical segment
                        s1 = main_memory_showseglst('seg_id' + seglabels_i, seglabels[seglabels_i].name) ;
                        s2 = main_memory_showsegrow('seg_id' + seglabels_i, seglabels[seglabels_i].name) ;
                    }

		    seglabels_i++ ;
		}
                if (s1 !== '') o1 += s1 ;
                if (s2 !== '') o2 += s2 ;

                // (add row)
                o2 += main_memory_showrow(cfg, memory_cpy, keys[k], SIMWARE.hash_labels_asm_rev, (keys[k] >= index) && (keys[k+cfg.nwords] <= index)) ;

		// are-consecutive ? k=k+cfg.nwords : k++
		if (Math.abs(n_key - i_key) == 4)
	             k = k + cfg.nwords ;
		else k = k + 1 ;
            }

            // pack and load html
	    o1 = '<div class="container-fluid">' +
	         '<div class="row">' +
                 '<div class="list-group sticky-top col-auto collapse hide" ' +
                 '     id="lst_seg1">' + o1 + '</div>' +
                 '<div data-spy="scroll" data-bs-target="#lst_seg1" data-offset="0" ' +
                 '     style="overflow-y:scroll; -webkit-overflow-scrolling:touch; height:50vh; width:inherit;"' +
                 '     class="col" id="lst_ins1">' + o2 + '</div>' +
                 '</div>' +
                 '</div>' ;

            var pos = element_scroll_get("#lst_ins1") ;
            $("#memory_MP").html(o1) ;

            // * Activation of html badges
            update_badges(cfg.nwords) ;

            // * Configure html options
            element_scroll_set("#lst_ins1", pos) ;

            if (cfg.showsegs) {
                $("#lst_seg1").collapse("show") ;
            }

            if (cfg.showsrc) {
                $(".mp_tooltip").collapse("show") ;
            }

            // * Update old_main_add for light_update
            old_main_addr = index ;
        }

        var old_main_addr = 0;

        function light_refresh_main_memory ( memory, index, redraw )
        {
	    var cfg_nwords = get_cfg('MEM_show_nwords') ;

            if (redraw)
            {
                var ri = 0 ;
                var svalue = '' ;
                var addrplusn = index + 4*n ;
		for (var n=0; n<cfg_nwords; n++)
		{
                     addrplusn = index + 4*n ;
                     svalue = main_memory_getword(memory, addrplusn) ;
		     for (var i=0; i<4; i++)
		     {
		          ri = 4 - i - 1 ;
		          $("#mpval" + (addrplusn + i)).html(svalue[ri]) ;
		     }
		}
            }

            // blue for last memory access
            o1 = $("#addr" + old_main_addr) ;
            if (o1.is(':visible'))
            {
		//o1.css('color', 'black') ;
		  o1.removeClass('text-primary').addClass('text-body-emphasis') ;
		//o1.css('font-weight', 'normal') ;
		  o1.removeClass('fw-bold').addClass('fw-normal') ;
            }

            old_main_addr = index - (index % (4*cfg_nwords)) ;

            o1 = $("#addr" + old_main_addr) ;
            if (o1.is(':visible'))
            {
		//o1.css('color', 'blue') ;
		  o1.removeClass('text-body-emphasis').addClass('text-primary') ;
		//o1.css('font-weight', 'bold') ;
		  o1.removeClass('fw-normal').addClass('fw-bold') ;
            }

            // show badges
            update_badges(cfg_nwords) ;
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
            return '<div id="' +  seg_id + '" class="row" data-bs-toggle="collapse" href="#lst_seg1">' +
                   '<u>' + seg_name + '</u>' +
                   '</div>' ;
        }

        function main_memory_showrow ( cfg, memory, addr, revlabels, is_current )
        {
            var i  = 0 ;
            var ri = 0 ;
            var addrplusn = 0 ;

            // valkeys
            var valkeys = [] ;
            var idi     = [] ;
            var addri   = 0 ;

	    // html
            var o = "" ;
            var value2 = '' ;
            var labeli = '' ;
            var valuei = '' ;
            var src_html = '' ;
            var row_html = '' ;

	    for (var n=0; n<cfg.nwords; n++)
	    {
                 var addrplusn = parseInt(addr) + 4*n ;

                 // valkeys
                 for (i=0; i<4; i++)
                 {
                      if (cfg.direction == 'h2l')
                           ri = 4 - i - 1 ;
                      else ri = i ;

                      addri      = addrplusn + ri ;
		      valkeys[i] = addri.toString(16) ;
                      idi[i]     = "mpval" + addri ;
                 }

                 // get value
                 var value = main_memory_getword(memory, addrplusn) ;
                 var src   =  main_memory_getsrc(memory, addrplusn) ;

                 // format of the value
                 for (i=0; i<4; i++)
                 {
                      value[i] = value2string(cfg.format, parseInt(value[i], 16)) ;
                      value[i] = simcoreui_pack(value[i], 2) ;
                 }

                 // format of the source
                 var src_parts = src.split(";") ;
                 for (i=0; i<src_parts.length; i++)
                 {
                      if (cfg.direction == 'h2l')
                           ri = src_parts.length - i - 1 ;
                      else ri = i ;

                      src_html = "<span class='bg-dark text-white py-0 px-1 rounded border border-secondary font-monospace'>" +
                                 src_parts[ri].padStart(8, ' ').replace(/ /g, '&nbsp;') +
                                 "</span>" ;
                 }

                 // wcolor
                 var wcolor = "text-body-emphasis fw-normal " ;
	         if (is_current) {
                     wcolor = "text-primary       fw-bold " ;
                 }

                 // value2
		 value2 = '' ;
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
                                   '<span class="badge rounded-pill text-bg-info" ' +
                                   '      style="position:relative;top:-8px;z-index:2">' + labeli + '</span>' +
                                   '</span>' ;
                      }

                      value2 += '<span class="me-1">' + valuei + '</span>' ;
                 }

		 row_html += '<span class="container col">' +
                             '<span class="row">' +
                             '<span class="col">' + value2   + '</span></span>' +
                             '<span class="row mp_tooltip collapse hide mb-2">' +
                             '<span class="col">' + src_html + '</span></span>' +
                             '</span>' ;
	    }

            // build HTML
	    var start_addr = parseInt(addr).toString(16) ;
	    var stop_addr  = valkeys[0] ;
            if (cfg.direction != 'h2l') {
	        stop_addr  = valkeys[3] ;
	    }
	    start_addr = simcoreui_pack(start_addr, 5).toUpperCase() ;
	    stop_addr  = simcoreui_pack(stop_addr,  5).toUpperCase() ;

	    o = "<div class='row " + wcolor + "' id='addr" + addr + "'" +
                "     style='font-size:small; border-bottom: 1px solid lightgray !important'>" +
	        "<div class='col-1 px-0' align='center'>" +
                     '<span id="bg' + addr + '" class="mp_row_badge"></span>' +
                "</div>"+
		"<div class='col-auto pe-1' align='right'>" +
                     '<span><small>0x</small>' + start_addr + '</span>' +
                     '<span> ... </span>' +
//                   '<span><span class="d-none d-sm-inline-flex"><small>0x</small></span>' + stop_addr + '</span>' +
                "</div>" +
	        "<div class='col px-3 ms-auto'><span class='row'>" + row_html + "</span></div>" +
                "</div>";

	    return o ;
        }

        function scroll_memory_to_segment ( seg_id )
        {
            return element_scroll_setRelative('#lst_ins1', '#'+seg_id, -250) ;
        }

        function scroll_memory_to_address ( addr )
        {
            return element_scroll_setRelative('#lst_ins1', '#addr'+addr, -250) ;
        }

        function scroll_memory_to_lastaddress ( )
        {
            return element_scroll_setRelative('#lst_ins1', '#addr'+old_main_addr, -250) ;
        }

        function update_badges ( cfg_nwords )
        {
            var html = {} ;
	    var tobe_updated = {} ;
	    var tobe_updated_any = false ;
            var elto = null ;
	    var eaddr = 0 ;

            var base_addrs = main_memory_get_baseaddr() ;
            for (elto in base_addrs)
            {
                 html[elto] = '' ;
                 if (base_addrs[elto] != null)
		 {
		     eaddr = base_addrs[elto] ;
		     eaddr = eaddr - (eaddr % (4*cfg_nwords)) ;
                     html[elto] = $("#bg" + eaddr).html() ;
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

		 eaddr = base_addrs[elto] ;
		 eaddr = eaddr - (eaddr % (4*cfg_nwords)) ;

		 old_html  = $("#bg" + eaddr).html() ;
                 old_html += '<div class="badge bg-primary mx-1">' +
                             elto.toUpperCase() +
                             '</div>' +
                          // '<i class="mx-auto text-secondary fas fa-arrow-right"></i>' ;
                             '' ;
		 $("#bg" + eaddr).html(old_html) ;
            }
        }

