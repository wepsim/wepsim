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
		    this.innerHTML = "<div id='"    + div_id    + "' " +
                                     "     style='" + style_dim + style_ovf + "'></div>" ;
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

            o += "<h5>stats</h5>\n" +
                 "<ul>" +
                 "<li> #access = #hits + #misses:</li>\n" +
                 "<table class='table table-bordered table-hover table-sm w-75'>" +
                 "<thead>" +
                 "<tr><th># access</th><th># hits</th><th># misses</th></tr>" +
                 "</thead>" +
                 "<tbody>" +
                 "<td>" + memory.stats.n_access + "</td>" +
                 "<td>" + memory.stats.n_hits   + "</td>" +
                 "<td>" + memory.stats.n_misses + "</td>" +
                 "</tbody>" +
                 "</table>" +
                 "<li>\n" +
                 "<span>hit-ratio  <span class='badge bg-success'>"+hit_ratio.toFixed(2)+"</span></span> & " +
                 "<span>miss-ratio <span class='badge bg-danger'>"+miss_ratio.toFixed(2)+"</span></span>\n" +
                 "</li>\n" +
                 "</ul>" +
                 "\n" ;

            return o ;
        }

        function wepsim_show_cache_cfg ( memory )
        {
            var o = "" ;
            var cm_type    = '' ;
            var field_type = '' ;

            // cache type...
            if (0 == memory.cfg.set_size) {
                cm_type    = "direct-mapped" ;
                field_type = 'index' ;
            }
            else {
                if (0 == memory.cfg.vps_size)
                     cm_type = "fully associative" ;
                else cm_type = "set-associative" ;
                field_type = 'set' ;
            }

	    // cfg
            o += "<h5>configuration</h5>\n" +
                 "<ul>" +
                 "<li> size of fields (in bits):</li>\n" +
                 "<table class='table table-bordered table-hover table-sm w-75'>" +
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
                 "</ul>" +
                 "\n" ;

            return o ;
        }

        function wepsim_show_cache_content ( memory )
        {
            var o = "" ;

	    // sets/tags
            o += "<h5>sets/tags</h5>\n" +
                 "<ul>" ;
            var ks = null ;
	    var kt = null ;
            var elto_set_bin = '' ;
            var elto_tag_bin = '' ;
            ks = Object.keys(memory.sets) ;
	    for (const elto_set of ks)
	    {
                 elto_set_bin = parseInt(elto_set).toString(2).padStart(memory.cfg.set_size,'0') + '<sub>2</sub>';
	         o += "<table class='table table-bordered table-striped table-hover table-sm w-auto pb-2'>" +
                      "<thead>" +
	              "<tr><th align='center' colspan=4>set: " + elto_set_bin + "</th></tr>" +
	              "<tr><th>tag</th><th>valid</th><th>dirty</th><th># access</th></tr>" +
                      "</thead><tbody>" ;
		 kt = Object.keys(memory.sets[elto_set].tags) ;
	         for (const elto_tag of kt)
		 {
                      elto_tag_bin = parseInt(elto_tag).toString(2).padStart(memory.cfg.tag_size,'0') + '<sub>2</sub>';
	              o += "<tr>" +
			   "<td>" + elto_tag_bin + "</td>" +
			   "<td>" + memory.sets[elto_set].tags[elto_tag].valid    + "</td>" +
			   "<td>" + memory.sets[elto_set].tags[elto_tag].dirty    + "</td>" +
			   "<td>" + memory.sets[elto_set].tags[elto_tag].n_access + "</td>" +
			   "</tr>" ;
	         }
	         o += "</tbody></table>" ;
	    }
            o += "</ul>\n" ;

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
                    cache_memory[0] = cache_memory_init(0, 6, 5, "first", null) ;
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
                   o1 += wepsim_show_cache_cfg(cache_memory[i]) ;
                   o1 += wepsim_show_cache_content(cache_memory[i]) ;
              }

              // load HTML
              $("#memory_CACHE").html(o1) ;
        }

