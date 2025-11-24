/*
 *  Copyright 2015-2025 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Cache Memory
         */

        /* jshint esversion: 6 */
        class ws_cachememory extends ws_uielto
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
                    var div_id    = 'memory_CACHE' ;
                    var style_dim = "height:58vh; width:inherit; " ;
                    var style_ovf = "overflow:auto; -webkit-overflow-scrolling:touch; " ;

		    // html holder
		    this.innerHTML = "<div class='container container-fluid ' " +
                                     "     id='" + div_id + "' style='" + style_dim + style_ovf + "'>" +
                                     "</div>" ;
	      }

	      render_populate ( )
	      {
                    var div_hash = '#memory_CACHE' ;

		    // if no active hardware -> empty
		    if (simhw_active() === null) {
                        $(div_hash).html('') ;
			return ;
		    }

                    // cache memory
                    var cm_ref = simhw_internalState('CM') ;

                    // information associated as HTML
                    var o1 = wepsim_show_cache_memory_skel(cm_ref) ;
                    $(div_hash).html(o1) ;

		    // vue binding
		    for (var i=0; i<cm_ref.length; i++) {
		         wepsim_show_cache_vueinit(i+1, cm_ref[i]) ;
		    }
	      }
        }

        register_uielto('ws-cachememory', ws_cachememory) ;


        /*
         *  Auxiliar function for Cache Memory UI
         */

        function wepsim_show_cache_stats ( level, memory )
        {
           var o1 = "" ;
           var p1 = "cache_l" + level + "_stats_" ;

          o1 += "  <ul class='mb-1 ps-3'>" +
                "  <li> " +
                "#access <span class='badge bg-info' id='" + p1 + "n_access'>{{ value }}</span> = " +
                "#hits   <span class='badge bg-info' id='" + p1 + "n_hits'  >{{ value }}</span> + " +
                "#misses <span class='badge bg-info' id='" + p1 + "n_misses'>{{ value }}</span>   " +
                "  </li>\n" +
                "  <li>\n" +
                "<span>hit-ratio  <span class='badge bg-success' id='" + p1 + "hitratio' >{{ computed_value }}</span></span> & " +
                "<span>miss-ratio <span class='badge bg-danger'  id='" + p1 + "missratio'>{{ computed_value }}</span></span>\n" +
                "  </li>\n" +
                "  <li class='mb-2'>Last access: " +
                "<span class='badge bg-secondary' id='" + p1 + "last_r_w' >{{ computed_value }}</span>" +
                " address " +
                "<span class='badge bg-secondary' id='" + p1 + "last_addr'>{{ computed_value }}</span>" +
                "<span                            id='" + p1 + "lhm_1' >{{ computed_value }}</span>" + // " is a " + 
                "<span class='badge bg-secondary' id='" + p1 + "lhm_2' >{{ computed_value }}</span>" + // <hit/miss>
                "  </li>\n" +
                "<table class='table table-bordered table-hover table-sm w-auto'>" ;

            if (0 == memory.cfg.set_size) {
		// full-associative
                o1 += "<thead><tr><th>tag</th><th>offset</th></tr></thead>" +
                      "<tbody><tr><td><span id='" + p1 + "lp_tag'>{{ computed_value }}</span></td>"+
                                 "<td><span id='" + p1 + "lp_off'>{{ computed_value }}</span></td></tr></tbody>" ;
            }
	    else if (memory.cfg.via_size == memory.cfg.set_size) {
		// direct-mapped
                o1 += "<thead><tr><th>tag</th><th>index</th><th>offset</th></tr></thead>" +
                      "<tbody><tr><td><span id='" + p1 + "lp_tag'>{{ computed_value }}</span></td>"+
                                 "<td><span id='" + p1 + "lp_set'>{{ computed_value }}</span></td>"+
                                 "<td><span id='" + p1 + "lp_off'>{{ computed_value }}</span></td></tr></tbody>" ;
            }
	    else {
		// set associative
                o1 += "<thead><tr><th>tag</th><th>set</th><th>offset</th></tr></thead>" +
                      "<tbody><tr><td><span id='" + p1 + "lp_tag'>{{ computed_value }}</span></td>"+
                                 "<td><span id='" + p1 + "lp_set'>{{ computed_value }}</span></td>"+
                                 "<td><span id='" + p1 + "lp_off'>{{ computed_value }}</span></td></tr></tbody>" ;
            }

            o1 += "</table>" +
                  "  </ul>" ;

            return o1 ;
        }

        function wepsim_show_cache_cfg ( level, memory )
        {
            var o1 = "" ;

            // cache configuration...
            var t_sz = get_var(memory.cfg.tag_size) ;
            var s_sz = get_var(memory.cfg.set_size) ;
            var o_sz = get_var(memory.cfg.off_size) ;
            var v_sz = get_var(memory.cfg.via_size) ;
            var replace_pol = get_var(memory.cfg.replace_pol) ;
            var      su_pol = get_var(memory.cfg.su_pol) ;
            var cm_type = '' ;

            // html
            o1  = "<ul class='mb-1 ps-3'>\n" +
                  "<li> Size of fields (in bits):</li>\n" +
                  "<table class='table table-bordered table-hover table-sm w-auto'>" ;

            if (0 == s_sz) {
                cm_type = "fully associative" ;
                o1 += "<thead><tr><th>tag</th><th>offset</th></tr></thead>" +
                      "<tbody><tr align='center'><td>"+t_sz+"</td>"+"<td>"+o_sz+"</td></tr></tbody>" ;
            }
	    else if (v_sz == s_sz) {
                cm_type = "direct-mapped" ;
                o1 += "<thead><tr><th>tag</th><th>index</th><th>offset</th></tr></thead>" +
                      "<tbody><tr align='center'><td>"+t_sz+"</td>"+"<td>"+s_sz+"</td>"+"<td>"+o_sz+"</td></tr></tbody>" ;
            }
	    else {
                cm_type = 'set-associative' ;
                o1 += "<thead><tr><th>tag</th><th>set</th><th>offset</th></tr></thead>" +
                      "<tbody><tr align='center'><td>"+t_sz+"</td>"+"<td>"+s_sz+"</td>"+"<td>"+o_sz+"</td></tr></tbody>" ;
            }

            o1 += "</table>" +
                  "<li> Type:           <span class='badge bg-secondary'>" + cm_type     + "</span></li>\n" +
                  "<li> Replace policy: <span class='badge bg-secondary'>" + replace_pol + "</span></li>\n" +
                  "<li> Split/unified:  <span class='badge bg-secondary'>" + su_pol      + "</span></li>\n" +
                  "</ul>" ;

	    // return cfg
            return o1 ;
        }

        function wepsim_show_cache_content ( level, memory )
        {
            var o1 = "" ;
            var elto_set_bin = '' ;
            var elto_tag_bin = '' ;

	    // sets/tags
            var ks = null ;
	    var kt = null ;

            ks = Object.keys(memory.sets) ;
	    for (const elto_set of ks)
	    {
                 elto_set_bin = parseInt(elto_set).toString(2).padStart(memory.cfg.set_size,'0') + '<sub>2</sub>';

	         o1 += "<table class='table table-bordered table-striped table-hover table-sm w-auto pb-2'>" +
                       "<thead>" +
	               "<tr><th align='center' colspan=4>set: " + elto_set_bin + "</th></tr>" +
	               "<tr><th>tag</th><th>valid</th><th>dirty</th><th># access</th></tr>" +
                       "</thead><tbody>" ;

		 kt = Object.keys(memory.sets[elto_set].tags) ;
	         for (const elto_tag of kt)
		 {
                      elto_tag_bin = parseInt(elto_tag).toString(2).padStart(memory.cfg.tag_size,'0') + '<sub>2</sub>';

	              o1 += "<tr>" +
		 	    "<td>" + elto_tag_bin + "</td>" +
			    "<td>" + get_var(memory.sets[elto_set].tags[elto_tag].valid)    + "</td>" +
			    "<td>" + get_var(memory.sets[elto_set].tags[elto_tag].dirty)    + "</td>" +
			    "<td>" + get_var(memory.sets[elto_set].tags[elto_tag].n_access) + "</td>" +
			    "</tr>" ;
	         }
	         o1 += "</tbody></table>" ;
	    }

	    // if empty then said "Empty"
            if ("" == o1) {
                o1 = "&lt;Empty&gt;" ;
            }

	    // return content
            return o1 ;
        }

        function wepsim_show_cache_memory_i ( level )
        {
              // check arguments
              var cm_ref = simhw_internalState('CM') ;
              if (typeof cm_ref == "undefined") return ;

              var cm_i   = cm_ref[level-1] ;
              if (typeof cm_i == "undefined") return ;

              // (1/3) update stats
              o1 = wepsim_show_cache_stats(level, cm_i) ;
              $("#cm-info-stat-ph-" + level).html(o1) ;

              // (2/3) update configuration
              o1 = wepsim_show_cache_cfg(level, cm_i) ;
              $("#cm-info-cfg-ph-" + level).html(o1) ;

              // (3/3) update content
              o1 = wepsim_show_cache_content(level, cm_i) ;
              $("#cm-info-cnt-ph-" + level).html(o1) ;

              // binding for vue...
              wepsim_show_cache_vueinit(level, cm_i) ;
        }


        function wepsim_show_cache_memory_skel ( cache_memory )
        {
              var o1 = "" ;

              if ( (typeof cache_memory == "undefined") || (Object.keys(cache_memory).length == 0) )
              {
                    o1 = "<h5><span data-langkey='Processor'>Processor</span></h5>" +
                         "<div class='vr' style='width:3px'></div>" +
                         "<br>" +
                         "No cache memory was already defined.<br>" +
                         "Please use the " +
		         "<span class='btn btn-sm btn-info text-white py-0' " +
                         "      onclick='wsweb_set_details_select(29);'>cache configuration</span> first." +
                         "<br>" +
                         "<div class='vr' style='width:3px'></div>" +
                         "<h5><span data-langkey='Memory'>Memory</span></h5>" ;

                    return o1 ;
              }

              o1 = "<h5><span data-langkey='Processor'>Processor</span></h5>" +
                   "<div class='vr' style='width:3px'></div>" ;

	      // cache_memory in HTML
              for (var i=0; i<cache_memory.length; i++)
              {
	      o1 += "<div class='row p-2'>" +
		    "<div class='col-auto'>" +
		    "<h5>Cache-" + (i+1) + "</h5>" +
		    "</div>" +
		    "<div class='col'>" +
		    "<span class='btn btn-sm btn-info text-white py-0' " +
		    "      onclick='wepsim_show_cache_memory_i(" + (i+1) + ");'" +
		    ">Refresh</span>" +
		    "</div>" +
		    "</div>" +
                    "" +
		    "<div class='accordion ms-3 mb-3 accordion-flush' id='cm-info-" + (i+1) + "'>" +
                    "" +
                    "  <div class='accordion-item'>" +
                    "    <h2 class='accordion-header' id='cm-stats'>" +
                    "      <button class='accordion-button p-1 fs-5' type='button' " +
                    "              data-bs-toggle='collapse' data-bs-target='#cm-stats-collapse-" + (i+1) + "' " +
                    "              aria-expanded='true' aria-controls='cm-stats-collapse'>Stats</button>" +
                    "    </h2>" +
                    "    <div id='cm-stats-collapse-" + (i+1) + "' class='accordion-collapse collapse show' " +
                    "         aria-labelledby='cm-stats'>" +
		    "         <div id='cm-info-stat-ph-" + (i+1) + "' class='accordion-body px-2 py-3'>" +
                    "         " + wepsim_show_cache_stats((i+1), cache_memory[i]) +
                    "         </div>" +
                    "    </div>" +
                    "  </div>" +
                    "" +
                    "  <div class='accordion-item'>" +
                    "    <h2 class='accordion-header' id='cm-cfg'>" +
                    "      <button class='accordion-button p-1 fs-5 collapsed bg-body-tertiary' type='button' " +
                    "              data-bs-toggle='collapse' data-bs-target='#cm-cfg-collapse-" + (i+1) + "' " +
                    "              aria-expanded='false' " +
                    "              aria-controls='cm-cfg-collapse'>Configuration</button>" +
                    "    </h2>" +
                    "    <div id='cm-cfg-collapse-" + (i+1) + "' class='accordion-collapse collapse' " +
                    "         aria-labelledby='cm-cfg'>" +
		    "         <div id='cm-info-cfg-ph-" + (i+1) + "' class='accordion-body px-2 py-3'>" +
		    "         " + wepsim_show_cache_cfg((i+1), cache_memory[i]) +
                    "         </div>" +
                    "    </div>" +
                    "  </div>" +
                    "" +
	            "  <div class='accordion-item'>" +
		    "    <h2 class='accordion-header' id='cm-cnt-" + (i+1) + "'>" +
		    "      <button class='accordion-button p-1 fs-5 collapsed bg-body-tertiary' type='button' " +
		    "              data-bs-toggle='collapse' data-bs-target='#cm-cnt-collapse-" + (i+1) + "' " +
		    "              aria-expanded='false' aria-controls='cm-cnt-collapse'>Sets & Tags</button>" +
		    "    </h2>" +
		    "    <div id='cm-cnt-collapse-" + (i+1) + "' class='accordion-collapse collapse' " +
		    "         aria-labelledby='cm-cnt-" + (i+1) + "'>" +
		    "         <div id='cm-info-cnt-ph-" + (i+1) + "' class='accordion-body px-2 py-3'>" +
	            "         " + wepsim_show_cache_content((i+1), cache_memory[i]) +
                    "         </div>" +
		    "    </div>" +
		    "  </div>" +
                    "" +
		    "</div>" ;
              }

              o1 += "<div class='vr' style='width:3px'></div>" +
                    "<h5><span data-langkey='Memory'>Memory</span></h5>" ;

              return o1 ;
        }

        function wepsim_show_cache_vueinit ( level, memory )
        {
           var p1 = "#cache_l" + level + "_stats_" ;

           /******* STATS *******/

           /*
            * o1 += "  <li> " +
            *       "#access <span class='badge bg-info' id='" + p1 + "n_access'>{{ value }}</span> = " +
            *       "#hits   <span class='badge bg-info' id='" + p1 + "n_hits'  >{{ value }}</span> + " +
            *       "#misses <span class='badge bg-info' id='" + p1 + "n_misses'>{{ value }}</span>   " +
            *       "  </li>\n" ;
            */

            memory.stats.n_access = vue_observable_ifnotjetdone(memory.stats.n_access) ;
	    vue_appyBinding(memory.stats.n_access, p1 + 'n_access', function(value){ return value; }) ;

	    memory.stats.n_hits   = vue_observable_ifnotjetdone(memory.stats.n_hits) ;
	    vue_appyBinding(memory.stats.n_hits,   p1 + 'n_hits', function(value){ return value; }) ;

	    memory.stats.n_misses = vue_observable_ifnotjetdone(memory.stats.n_misses) ;
	    vue_appyBinding(memory.stats.n_misses, p1 + 'n_misses', function(value){ return value; }) ;


           /*
            * o1 += "  <li>\n" +
            *       "<span>hit-ratio  <span class='badge bg-success' id='" + p1 + "hitratio' >{{ .._value }}</span></span> & " +
            *       "<span>miss-ratio <span class='badge bg-danger'  id='" + p1 + "missratio'>{{ .._value }}</span></span>\n" +
            *       "  </li>\n" ;
            */

	    vue_appyBinding(memory.stats.n_access,
                            p1 + 'hitratio',
                            function(value){
                                var hit_ratio = 0.0;
                                var n_hits = get_var(memory.stats.n_hits) ;
                                if (value != 0) {
                                    hit_ratio  = (n_hits / value) ;
                                }
                                return hit_ratio.toFixed(2) ;
                            }) ;
	    vue_appyBinding(memory.stats.n_access,
                            p1 + 'missratio',
                            function(value){
                                var miss_ratio = 0.0;
                                var n_misses   = get_var(memory.stats.n_misses) ;
                                if (value != 0) {
                                    miss_ratio  = (n_misses / value) ;
                                }
                                return miss_ratio.toFixed(2) ;
                            }) ;


           /*
            * o1 += "  <li class='mb-2'>Last access: " +
            *       "<span class='badge bg-secondary' id='cache_stats_last_r_w' >{{ value }}</span>" +
            *       " address " +
            *       "<span class='badge bg-secondary' id='cache_stats_last_addr'>{{ computed_value }}</span>" +
            *       "<span                            id='cache_stats_lhm_1' >{{ computed_value }}</span>" + // " is a " + 
            *       "<span class='badge bg-secondary' id='cache_stats_lhm_2' >{{ computed_value }}</span>" + // <hit/miss>
            *       "  </li>\n" ;
            */

	    memory.stats.last_r_w = vue_observable_ifnotjetdone(memory.stats.last_r_w) ;
	    vue_appyBinding(memory.stats.last_r_w,
                            p1 + 'last_r_w',
                            function(value){ return value; }) ;

	    memory.stats.last_addr = vue_observable_ifnotjetdone(memory.stats.last_addr) ;
	    vue_appyBinding(memory.stats.last_addr,
                            p1 + 'last_addr',
                            function(value){ return '0x' + value.toString(16); }) ;

	    memory.stats.last_h_m = vue_observable_ifnotjetdone(memory.stats.last_h_m) ;
	    vue_appyBinding(memory.stats.last_h_m,
                            p1 + 'lhm_1',
                            function(value){
			       if (value != '')
			            return " is a " ;
			       else return "" ;
                            }) ;
	    vue_appyBinding(memory.stats.last_h_m,
                            p1 + 'lhm_2',
                            function(value){
                               return value ;
                            }) ;

           /*
	    *	// full-associative
            *   o1 += "<table class='table table-bordered table-hover table-sm w-auto'>" +
            *         "<thead><tr><th>tag</th><th>offset</th></tr></thead>" +
            *         "<tbody><tr><td><span id='cache_stats_lp_tag'>{{ ...value }}</span></td>"+
            *                    "<td><span id='cache_stats_lp_off'>{{ ...value }}</span></td></tr></tbody>" +
            *         "</table>" ;
	    *   // direct-mapped
            *   o1 += "<table class='table table-bordered table-hover table-sm w-auto'>" +
            *         "<thead><tr><th>tag</th><th>index</th><th>offset</th></tr></thead>" +
            *         "<tbody><tr><td><span id='cache_stats_lp_tag'>{{ ...value }}</span></td>"+
            *                    "<td><span id='cache_stats_lp_set'>{{ ...value }}</span></td>"+
            *                    "<td><span id='cache_stats_lp_off'>{{ ...value }}</span></td></tr></tbody>" +
            *         "</table>" ;
	    *   // set associative
            *   o1 += "<table class='table table-bordered table-hover table-sm w-auto'>" +
            *         "<thead><tr><th>tag</th><th>set</th><th>offset</th></tr></thead>" +
            *         "<tbody><tr><td><span id='cache_stats_lp_tag'>{{ ...value }}</span></td>"+
            *                    "<td><span id='cache_stats_lp_set'>{{ ...value }}</span></td>"+
            *                    "<td><span id='cache_stats_lp_off'>{{ ...value }}</span></td></tr></tbody>" +
            *         "</table>" ;
            */

	    memory.stats.last_parts.tag = vue_observable_ifnotjetdone(memory.stats.last_parts.tag) ;
	    vue_appyBinding(memory.stats.last_parts.tag,
                            p1 + 'lp_tag',
                            function(value) {
                               var tag_size = get_var(memory.cfg.tag_size) ;
                               return parseInt(value).toString(2).padStart(tag_size, '0') ;
                            }) ;

	    memory.stats.last_parts.set = vue_observable_ifnotjetdone(memory.stats.last_parts.set) ;
	    vue_appyBinding(memory.stats.last_parts.set,
                            p1 + 'lp_set',
                            function(value) {
                               var set_size = get_var(memory.cfg.set_size) ;
                               return parseInt(value).toString(2).padStart(set_size, '0') ;
                            }) ;

	    memory.stats.last_parts.offset = vue_observable_ifnotjetdone(memory.stats.last_parts.offset) ;
	    vue_appyBinding(memory.stats.last_parts.offset,
                            p1 + 'lp_off',
                            function(value) {
                               var off_size = get_var(memory.cfg.off_size) ;
                               return parseInt(value).toString(2).padStart(off_size, '0') ;
                            }) ;

            return true ;
        }


        /*
         *  Cache Memory UI
         */

        function wepsim_show_cache_memory ( cache_memory )
        {
              var o1 = wepsim_show_cache_memory_skel(cache_memory) ;
              $("#memory_CACHE").html(o1) ;

              // vue binding
              for (var i=0; i<cache_memory.length; i++) {
                   wepsim_show_cache_vueinit(i+1, cache_memory[i]) ;
              }
        }

