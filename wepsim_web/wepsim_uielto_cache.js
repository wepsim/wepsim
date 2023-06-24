/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
                    wepsim_show_cache_memory_all(cm_ref) ;
	      }
        }

        register_uielto('ws-cachememory', ws_cachememory) ;


        /*
         *  Cache Memory UI
         */

        function wepsim_show_table_info ( memory, t_num, s_num, o_num )
        {
            var o = '' ;

            if (0 == memory.cfg.set_size) {
		// full-associative
                o = "<table class='table table-bordered table-hover table-sm w-auto'>" +
                    "<thead><tr><th>tag</th><th>offset</th></tr></thead>" +
                    "<tbody><tr><td>"+t_num+"</td>"+"<td>"+o_num+"</td></tr></tbody>" +
                    "</table>" ;
            }
	    else if (memory.cfg.via_size == memory.cfg.set_size) {
		// direct-mapped
                o = "<table class='table table-bordered table-hover table-sm w-auto'>" +
                    "<thead><tr><th>tag</th><th>index</th><th>offset</th></tr></thead>" +
                    "<tbody><tr><td>"+t_num+"</td>"+"<td>"+s_num+"</td>"+"<td>"+o_num+"</td></tr></tbody>" +
                    "</table>" ;
            }
	    else {
		// set associative
                o = "<table class='table table-bordered table-hover table-sm w-auto'>" +
                    "<thead><tr><th>tag</th><th>set</th><th>offset</th></tr></thead>" +
                    "<tbody><tr><td>"+t_num+"</td>"+"<td>"+s_num+"</td>"+"<td>"+o_num+"</td></tr></tbody>" +
                    "</table>" ;
            }

            return o ;
        }

        function wepsim_show_cache_stats ( level, memory )
        {
	    // hit/miss
            var hit_ratio  = 0.0 ;
            var miss_ratio = 0.0 ;
            if (memory.stats.n_access != 0) {
                hit_ratio  = (memory.stats.n_hits   / memory.stats.n_access) ;
                miss_ratio = (memory.stats.n_misses / memory.stats.n_access) ;
            }

            // last access
            var tag_bin =    parseInt(memory.stats.last_parts.tag).toString(2).padStart(memory.cfg.tag_size, '0') ;
            var set_bin =    parseInt(memory.stats.last_parts.set).toString(2).padStart(memory.cfg.set_size, '0') ;
            var off_bin = parseInt(memory.stats.last_parts.offset).toString(2).padStart(memory.cfg.off_size, '0') ;

            var o1 = '' ;
            if (memory.stats.last_h_m != '') {
                o1 = ' is a ' + "<span class='badge bg-secondary'>" + memory.stats.last_h_m + "</span>" ;
            }

            o1 = "  <ul class='mb-1 ps-3'>" +
                 "  <li> " +
                 "#access <span class='badge bg-info'>" + memory.stats.n_access + "</span> = " +
                 "#hits   <span class='badge bg-info'>" + memory.stats.n_hits   + "</span> + " +
                 "#misses <span class='badge bg-info'>" + memory.stats.n_misses + "</span>   " +
                 "  </li>\n" +
                 "  <li>\n" +
                 "<span>hit-ratio  <span class='badge bg-success'>"+hit_ratio.toFixed(2)+"</span></span> & " +
                 "<span>miss-ratio <span class='badge bg-danger'>"+miss_ratio.toFixed(2)+"</span></span>\n" +
                 "  </li>\n" +
                 "  <li class='mb-2'>Last access: " +
                 "<span class='badge bg-secondary'>" + memory.stats.last_r_w + "</span>" +
                 " address " +
                 "<span class='badge bg-secondary'>0x" + memory.stats.last_addr.toString(16) + "</span>" +
                 o1 +
                 "  </li>\n" +
                    wepsim_show_table_info(memory, tag_bin, set_bin, off_bin) +
                 "  </ul>" ;

            // return stats
            return o1 ;
        }

        function wepsim_show_cache_cfg ( level, memory )
        {
            var o1 = "" ;

            // cache type...
            var cm_type = '' ;
            if (0 == memory.cfg.set_size) {
                cm_type = "fully associative" ;
            }
            else if (0 == memory.cfg.vps_size) {
                cm_type = "direct-mapped" ;
            }
            else {
                cm_type = 'set-associative' ;
            }

            o1 = "<ul class='mb-1 ps-3'>\n" +
                 "<li> size of fields (in bits):</li>\n" +
                 wepsim_show_table_info(memory, memory.cfg.tag_size, memory.cfg.set_size, memory.cfg.off_size) +
                 "<li> type:           <span class='badge bg-secondary'>" + cm_type + "</span></li>\n" +
                 "<li> replace policy: <span class='badge bg-secondary'>" + memory.cfg.replace_pol + "</span></li>\n" +
                 "<li> split/unified:  <span class='badge bg-secondary'>" + memory.cfg.su_pol + "</span></li>\n" +
                 "</ul>" ;

	    // return cfg
            return o1 ;
        }

        function wepsim_show_cache_content ( level, memory )
        {
            var o1 = "" ;

	    // sets/tags
            var ks = null ;
	    var kt = null ;
            var elto_set_bin = '' ;
            var elto_tag_bin = '' ;
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
			    "<td>" + memory.sets[elto_set].tags[elto_tag].valid    + "</td>" +
			    "<td>" + memory.sets[elto_set].tags[elto_tag].dirty    + "</td>" +
			    "<td>" + memory.sets[elto_set].tags[elto_tag].n_access + "</td>" +
			    "</tr>" ;
	         }
	         o1 += "</tbody></table>" ;
	    }
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
                    "         " + // wepsim_show_cache_stats((i+1), cache_memory[i]) +
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
		    "         " + // wepsim_show_cache_cfg((i+1), cache_memory[i]) +
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
	            "         " + // wepsim_show_cache_content((i+1), cache_memory[i]) +
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

        function wepsim_show_cache_memory_all ( cache_memory )
        {
              if (typeof cache_memory == "undefined") {
                  return ;
              }
              if (Object.keys(cache_memory).length == 0) {
                  return ;
              }

	      // cache_memory in HTML
              var o1 = "" ;
              for (var i=0; i<cache_memory.length; i++)
              {
		   // (1/3) update stats
		   o1 = wepsim_show_cache_stats(i+1, cache_memory[i]) ;
		   $("#cm-info-stat-ph-" + (i+1)).html(o1) ;

		   // (2/3) update configuration
		   o1 = wepsim_show_cache_cfg(i+1, cache_memory[i]) ;
		   $("#cm-info-cfg-ph-" + (i+1)).html(o1) ;

		   // (3/3) update content
		   o1 = wepsim_show_cache_content(i+1, cache_memory[i]) ;
		   $("#cm-info-cnt-ph-" + (i+1)).html(o1) ;
              }
        }

        function wepsim_show_cache_memory ( cache_memory )
        {
              var o1 = wepsim_show_cache_memory_skel(cache_memory) ;
              $("#memory_CACHE").html(o1) ;
              wepsim_show_cache_memory_all(cache_memory) ;
        }

