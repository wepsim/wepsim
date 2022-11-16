/*
 *  Copyright 2015-2022 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

	    // stats
            var hit_ratio  = (memory.stats.n_hits   / memory.stats.n_access) ;
            var miss_ratio = (memory.stats.n_misses / memory.stats.n_access) ;

            o += "<h5 class='pt-2 mb-0'>Stats</h5>\n" +
                 "<hr class='mt-0'>" +
                 "<ul>" +
                 "<li> " +
                 "#access <span class='badge bg-info'>" + memory.stats.n_access + "</span> = " +
                 "#hits   <span class='badge bg-info'>" + memory.stats.n_hits   + "</span> + " +
                 "#misses <span class='badge bg-info'>" + memory.stats.n_misses + "</span>   " +
                 "</li>\n" +
                 "<li>\n" +
                 "<span>hit-ratio  <span class='badge bg-success'>"+hit_ratio.toFixed(2)+"</span></span> & " +
                 "<span>miss-ratio <span class='badge bg-danger'>"+miss_ratio.toFixed(2)+"</span></span>\n" +
                 "</li>\n" +
                 "</ul>" +
                 "\n" ;

            return o ;
        }

        function wepsim_show_cache_last ( memory )
        {
            var o = "" ;

            var o1 = '' ;
            if (memory.stats.last_h_m !='') {
                o1 = ' is a ' + memory.stats.last_h_m ;
            }

	    // last address
            o += "<a class='text-decoration-none text-dark' data-bs-toggle='collapse' href='#collapse_cm_last' " +
                 "   aria-expanded='false' aria-controls='collapse_cm_last'>\n" +
                 "<h5 class='pt-2 mb-0'>Last access</h5>\n" +
                 "</a>\n" +
                 "<hr class='mt-0'>\n" +
		 " <div class='collapse show' id='collapse_cm_last'>\n" +
                 "<ul>\n" +
                 "<li> " + memory.stats.last_r_w + " address 0x" + memory.stats.last_addr.toString(16) + o1 +
                 "</li>\n" +
                 "<table class='table table-bordered table-hover table-sm'>" +
                 "<thead>" +
                 "<tr><th>tag</th><th>set/index</th><th>offset</th></tr>" +
                 "</thead>" +
                 "<tbody>" +
                 "<td>" + memory.stats.last_parts.tag    + "</td>" +
                 "<td>" + memory.stats.last_parts.set    + "</td>" +
                 "<td>" + memory.stats.last_parts.offset + "</td>" +
                 "</tbody>" +
                 "</table>" +
                 "</ul>" +
		 " </div>" +
                 "\n" ;

            return o ;
        }

        function wepsim_show_cache_cfg ( memory )
        {
            var o = "" ;
            var cm_type    = 'set-associative' ;
            var field_type = 'set' ;

            // cache type...
            if (0 == memory.cfg.set_size) {
                cm_type    = "fully associative" ;
            }
            else {
                if (0 == memory.cfg.vps_size) {
                    cm_type = "direct-mapped" ;
                    field_type = 'index' ;
                }
            }

	    // cfg
            o += "<a class='text-decoration-none text-dark' data-bs-toggle='collapse' href='#collapse_cm_cfg' " +
                 "   aria-expanded='false' aria-controls='collapse_cm_cfg'>\n" +
                 "<h5 class='pt-2 mb-0'>Configuration</h5>\n" +
                 "</a>\n" +
                 "<hr class='mt-0'>\n" +
		 " <div class='collapse' id='collapse_cm_cfg'>\n" +
                 "<ul>\n" +
                 "<li> size of fields (in bits):</li>\n" +
                 "<table class='table table-bordered table-hover table-sm'>" +
                 "<thead>" +
                 "<tr><th>tag</th><th>" + field_type + "</th><th>offset</th></tr>" +
                 "</thead>" +
                 "<tbody>" +
                 "<td>" + memory.cfg.tag_size + "</td>" +
                 "<td>" + memory.cfg.set_size + "</td>" +
                 "<td>" + memory.cfg.off_size + "</td>" +
                 "</tbody>" +
                 "</table>" +
                 "<li> type: <span class='badge bg-secondary'>" + cm_type + "</span></li>\n" +
                 "<li> replace policy: <span class='badge bg-secondary'>" + memory.cfg.replace_pol + "</span></li>\n" +
                 "<li> split/unified: <span class='badge bg-secondary'>" + memory.cfg.su_pol + "</span></li>\n" +
                 "</ul>" +
		 " </div>" +
                 "\n" ;

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

            o += "<a class='text-decoration-none text-dark' data-bs-toggle='collapse' href='#collapse_cm_cnt' " +
                 "   aria-expanded='false' aria-controls='collapse_cm_cnt'>\n" +
                 "<h5 class='pt-2 mb-0'>Sets & Tags</h5>\n" +
                 "</a>\n" +
                 "<hr class='mt-0'>\n" +
		 " <div class='collapse' id='collapse_cm_cnt'>\n" + o1 + "</div>\n" ;

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
                   o1 += wepsim_show_cache_stats(cache_memory[i]) ;
                   o1 += wepsim_show_cache_last(cache_memory[i]) ;
                   o1 += wepsim_show_cache_cfg(cache_memory[i]) ;
                   o1 += wepsim_show_cache_content(cache_memory[i]) ;
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
                  curr_cfg[0] = { vps_size:0, set_size:6, off_size:5, replace_pol:"first", su_pol:"unified" } ;
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

