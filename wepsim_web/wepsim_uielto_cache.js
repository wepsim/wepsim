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
		    this.innerHTML = "<div class='container container-fluid d-flex justify-content-center'>" +
		                     "<div class='row row-cols-auto'>" +
		                     "<div class='col p-2'>Cache memory</div>" +
		                     "<div class='col p-2'>" +
                                     "    <div class='form-check form-switch px-0'>" +
                                     "        <label class='form-check-label' for='cm_switch'>enable</label>" +
                                     "        <input class='form-check-input mx-2' id='cm_switch' " +
                                     "               type='checkbox' role='switch' onclick='wepsim_cm_toggle(); wsweb_select_refresh();'>" +
                                     "    </div>" +
		                     "</div>" +
		                     "<div class='col p-2'>" +
		                     "    <span class='btn btn-sm btn-info text-white py-0' onclick='wsweb_select_refresh();'>Refresh</span>" +
		                     "</div>" +
		                     "</div>" +
		                     "</div>" +
		                     "<div id='" + div_id + "' style='" + style_dim + style_ovf + "'></div>" ;
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
                    var o1 = wepsim_show_cache_memory(cm_ref) ;
                    $(div_hash).html(o1) ;
	      }
        }

        register_uielto('ws-cachememory', ws_cachememory) ;


        /*
         *  Cache Memory UI
         */

        function wepsim_show_cache_stats ( memory )
        {
            var o = "" ;
            var hit_ratio  = 0.0 ;
            var miss_ratio = 0.0 ;

	    // stats
            if (memory.stats.n_access != 0) {
                hit_ratio  = (memory.stats.n_hits   / memory.stats.n_access) ;
                miss_ratio = (memory.stats.n_misses / memory.stats.n_access) ;
            }

            o += "<div class='accordion-item'>" +
                 "  <h2 class='accordion-header' id='cm-stats'>" +
                 "    <button class='accordion-button p-1 fs-5' type='button' " +
                 "            data-bs-toggle='collapse' data-bs-target='#cm-stats-collapse' " +
                 "            aria-expanded='true' aria-controls='cm-stats-collapse'>Stats</button>" +
                 "  </h2>" +
                 "  <div id='cm-stats-collapse' class='accordion-collapse collapse show' " +
                 "       aria-labelledby='cm-stats'>" +
                 "  <div class='accordion-body px-2 py-3'>" +
                 "  <ul>" +
                 "  <li> " +
                 "#access <span class='badge bg-info'>" + memory.stats.n_access + "</span> = " +
                 "#hits   <span class='badge bg-info'>" + memory.stats.n_hits   + "</span> + " +
                 "#misses <span class='badge bg-info'>" + memory.stats.n_misses + "</span>   " +
                 "  </li>\n" +
                 "  <li>\n" +
                 "<span>hit-ratio  <span class='badge bg-success'>"+hit_ratio.toFixed(2)+"</span></span> & " +
                 "<span>miss-ratio <span class='badge bg-danger'>"+miss_ratio.toFixed(2)+"</span></span>\n" +
                 "  </li>\n" +
                 "  </ul>" +
                 "  </div>" +
                 "  </div>" +
                 "</div>" ;

            return o ;
        }

        function wepsim_show_table_info ( memory, t_num, s_num, o_num )
        {
            var o = '' ;

            if (0 == memory.cfg.set_size) {
		// full-associative
                o = "<table class='table table-bordered table-hover table-sm'>" +
                    "<thead><tr><th>tag</th><th>offset</th></tr></thead>" +
                    "<tbody><tr><td>"+t_num+"</td>"+"<td>"+o_num+"</td></tr></tbody>" +
                    "</table>" ;
            }
	    else if (memory.cfg.via_size == memory.cfg.set_size) {
		// direct-mapped
                o = "<table class='table table-bordered table-hover table-sm'>" +
                    "<thead><tr><th>tag</th><th>index</th><th>offset</th></tr></thead>" +
                    "<tbody><tr><td>"+t_num+"</td>"+"<td>"+s_num+"</td>"+"<td>"+o_num+"</td></tr></tbody>" +
                    "</table>" ;
            }
	    else {
		// set associative
                o = "<table class='table table-bordered table-hover table-sm'>" +
                    "<thead><tr><th>tag</th><th>set</th><th>offset</th></tr></thead>" +
                    "<tbody><tr><td>"+t_num+"</td>"+"<td>"+s_num+"</td>"+"<td>"+o_num+"</td></tr></tbody>" +
                    "</table>" ;
            }

            return o ;
        }

        function wepsim_show_cache_last ( memory )
        {
            var o = "" ;

            var tag_bin =    parseInt(memory.stats.last_parts.tag).toString(2).padStart(memory.cfg.tag_size, '0') ;
            var set_bin =    parseInt(memory.stats.last_parts.set).toString(2).padStart(memory.cfg.set_size, '0') ;
            var off_bin = parseInt(memory.stats.last_parts.offset).toString(2).padStart(memory.cfg.off_size, '0') ;

            var o1 = '' ;
            if (memory.stats.last_h_m != '') {
                o1 = ' is a ' + memory.stats.last_h_m ;
            }

	    // last address
            o = "<div class='accordion-item'>" +
                "  <h2 class='accordion-header' id='cm-la'>" +
                "    <button class='accordion-button p-1 fs-5' type='button' " +
                "            data-bs-toggle='collapse' data-bs-target='#cm-la-collapse' " +
                "            aria-expanded='true' aria-controls='cm-la-collapse'>Last access</button>" +
                "  </h2>" +
                "  <div id='cm-la-collapse' class='accordion-collapse collapse show' " +
                "       aria-labelledby='cm-la'>" +
                "  <div class='accordion-body px-2 py-3'>" +
                "  <ul>\n" +
                "  <li>\n" + memory.stats.last_r_w + " address 0x" +
                             memory.stats.last_addr.toString(16) + o1 + "</li>\n" +
                   wepsim_show_table_info(memory, tag_bin, set_bin, off_bin) +
                "  </ul>" +
                " </div>" +
                " </div>" +
                "</div>" ;

            return o ;
        }

        function wepsim_show_cache_cfg ( memory )
        {
            var o = "" ;

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

	    // cfg
            o = "<div class='accordion-item'>" +
                "  <h2 class='accordion-header' id='cm-cfg'>" +
                "    <button class='accordion-button p-1 fs-5 collapsed' type='button' " +
                "            data-bs-toggle='collapse' data-bs-target='#cm-cfg-collapse' " +
                "            aria-expanded='false' " +
                "            aria-controls='cm-cfg-collapse'>Configuration</button>" +
                "  </h2>" +
                "  <div id='cm-cfg-collapse' class='accordion-collapse collapse' " +
                "       aria-labelledby='cm-cfg'>" +
                "  <div class='accordion-body px-2 py-3'>" +
                "<ul>\n" +
                "<li> size of fields (in bits):</li>\n" +
                wepsim_show_table_info(memory, memory.cfg.tag_size, memory.cfg.set_size, memory.cfg.off_size) +
                "<li> type: <span class='badge bg-secondary'>" + cm_type + "</span></li>\n" +
                "<li> replace policy: <span class='badge bg-secondary'>" + memory.cfg.replace_pol + "</span></li>\n" +
                "<li> split/unified: <span class='badge bg-secondary'>" + memory.cfg.su_pol + "</span></li>\n" +
                "</ul>" +
                "  </div>" +
                "  </div>" +
                "</div>" ;

            return o ;
        }

        function wepsim_show_cache_content ( memory )
        {
            var o  = "" ;
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

	    // content
            o = "<div class='accordion-item'>" +
                "  <h2 class='accordion-header' id='cm-cnt'>" +
                "    <button class='accordion-button p-1 fs-5 collapsed' type='button' " +
                "            data-bs-toggle='collapse' data-bs-target='#cm-cnt-collapse' " +
                "            aria-expanded='false' aria-controls='cm-cnt-collapse'>Sets & Tags</button>" +
                "  </h2>" +
                "  <div id='cm-cnt-collapse' class='accordion-collapse collapse' " +
                "       aria-labelledby='cm-cnt'>" +
                "  <div class='accordion-body px-2 py-3'>" + o1 + "</div>" +
                "  </div>" +
                "</div>" ;

            return o ;
        }

        function wepsim_show_cache_memory ( memory )
        {
              var o1 = '' ;
              var div_id = 'memory_CACHE' ;
              var cache_memory = [] ;

              // default working values...
              if ( (typeof memory == "undefined") || (Object.keys(memory).length == 0) )
              {
                    document.getElementById(div_id).style.opacity = "0.5" ;
                    cache_memory[0] = cache_memory_init(12, 3, 5, "first", "unified", null) ;
              }
              else
              {
                    document.getElementById(div_id).style.opacity = "1.0" ;
                    cache_memory = memory ;
              }

              // cache_memory in HTML
              for (var i=0; i<cache_memory.length; i++)
              {
		   o1 += "<h5>Cache-" + (i+1) + "</h5>" +
                         "<div class='accordion ms-4 accordion-flush' " +
                         "     id='accordionPanelsStayOpenExample'>" +
                         wepsim_show_cache_stats(cache_memory[i]) +
                         wepsim_show_cache_last(cache_memory[i]) +
                         wepsim_show_cache_cfg(cache_memory[i]) +
                         wepsim_show_cache_content(cache_memory[i]) +
		         "</div>" ;
              }

              // load HTML
              $("#memory_CACHE").html(o1) ;
        }


        /*
         *  Cache Memory Enable/Disable
         */

        function wepsim_cm_enable ( )
        {
              var curr_cm  = [] ;
              var curr_cfg = simhw_internalState('CM_cfg') ;

              if (0 == curr_cfg.length) {
                  var memory_cfg_zero = cache_memory_init(12, 5, 6, "fifo", "unified", null) ;
                  curr_cfg[0] = memory_cfg_zero.cfg ;
              }

              for (var i=0; i<curr_cfg.length; i++) {
                   curr_cm[i] = cache_memory_init2(curr_cfg[i], null) ;
              }

              simhw_internalState_reset('CM_cfg', curr_cfg) ;
              simhw_internalState_reset('CM',     curr_cm) ;
        }

        function wepsim_cm_disable ( )
        {
              simhw_internalState_reset('CM', []);
        }

        function wepsim_cm_toggle ( )
        {
              var curr_cm  = simhw_internalState('CM') ;

              if (curr_cm.length != 0)
                   wepsim_cm_disable() ;
              else wepsim_cm_enable() ;
        }

