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
		    // html holder
		    var o1 = "<div id='memory_CACHE' " +
                             "     style='height:58vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;'></div>" ;

		    this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
                    var o1 = '' ;

                    // cache memory
                    var cm_ref = simhw_internalState('CM') ;
                    if ( (typeof cm_ref != "undefined") &&
                         (Object.keys(cm_ref).length !== 0) )
                    {
                          o1 = wepsim_show_cache_as_text(cm_ref) ;
                    }

                    $("#memory_CACHE").html(o1) ;
	      }
        }

        register_uielto('ws-cachememory', ws_cachememory) ;


        /*
         *  Cache Memory UI
         */

        function wepsim_show_cache_memory ( memory )
        {
              var o1 = wepsim_show_cache_as_html(memory) ;

              $("#memory_CACHE").html(o1) ;
        }

        function wepsim_show_cache_as_html ( memory )
        {
            var o = "" ;

	    // stats
            var hit_ratio  = (memory.stats.n_hits   / memory.stats.n_access) ;
            var miss_ratio = (memory.stats.n_misses / memory.stats.n_access) ;

            o += "<h5>stats</h5>\n" +
                 "<ul>" +
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
                 "<span>hit-ratio  <span class='badge bg-success'>"+hit_ratio.toFixed(2)+"</span></span>\n" +
                 "<span>miss-ratio <span class='badge bg-danger'>"+miss_ratio.toFixed(2)+"</span></span>\n" +
                 "</ul>" +
                 "\n" ;

	    // cfg
            o += "<h5>configuration</h5>\n" +
                 "<ul>" +
                 "<li> size of fields (in bits):</li>\n" +
                 "<table class='table table-bordered table-hover table-sm w-75'>" +
                 "<thead>" +
                 "<tr><th>tag</th><th>set</th><th>offset</th></tr>" +
                 "</thead>" +
                 "<tbody>" +
                 "<td>" + memory.cfg.tag_size + "</td>" +
                 "<td>" + memory.cfg.set_size + "</td>" +
                 "<td>" + memory.cfg.off_size + "</td>" +
                 "</tbody>" +
                 "</table>" +
                 "<li> replace policy: " + memory.cfg.replace_pol + "</li>\n" +
                 "</ul>" +
                 "\n" ;

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
                 elto_set_bin = parseInt(elto_set).toString(2) + '<sub>2</sub>' ;
	         o += "<table class='table table-bordered table-striped table-hover table-sm w-75 pb-2'>" +
                      "<thead>" +
	              "<tr><th align='center' colspan=4>set: " + elto_set_bin + "</th></tr>" +
	              "<tr><th>tag</th><th>valid</th><th>dirty</th><th># access</th></tr>" +
                      "</thead><tbody>" ;
		 kt = Object.keys(memory.sets[elto_set].tags) ;
	         for (const elto_tag of kt)
		 {
                      elto_tag_bin = parseInt(elto_tag).toString(2) + '<sub>2</sub>' ;
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

        function wepsim_show_cache_as_text ( memory )
        {
            var o = "" ;

	    // cfg
            o += "cfg\n" +
                 "---\n" +
                 "* tag_size:    " + memory.cfg.tag_size + "\n" +
                 "* set_size:    " + memory.cfg.set_size + "\n" +
                 "* offset_size: " + memory.cfg.off_size + "\n" +
                 "* replace_pol: " + memory.cfg.replace_pol + "\n" +
                 "\n" ;

	    // stats
            o += "stats\n" +
                 "-----\n" +
                 "* access: " + memory.stats.n_access + "\n" +
                 "* hits:   " + memory.stats.n_hits   + "\n" +
                 "* misses: " + memory.stats.n_misses + "\n" +
                 "* hit  ratio: " + (memory.stats.n_hits   / memory.stats.n_access) + "\n" +
                 "* miss ratio: " + (memory.stats.n_misses / memory.stats.n_access) + "\n" +
                 "\n" ;

	    // sets/tags
            o += "" +
                 "sets/tags\n" +
                 "---------\n" ;
            var ks = null ;
	    var kt = null ;
            ks = Object.keys(memory.sets) ;
	    for (const elto_set of ks)
	    {
	         o += " * " + (elto_set >>> 0) + ":\n" ;
		 kt = Object.keys(memory.sets[elto_set].tags) ;
	         for (const elto_tag of kt)
		 {
	              o += "     * " + (elto_tag >>> 0) + ": " +
			   "{ " +
			   " n_access: " + memory.sets[elto_set].tags[elto_tag].n_access + ", " +
			   " valid: "    + memory.sets[elto_set].tags[elto_tag].valid + ", " +
			   " dirty: "    + memory.sets[elto_set].tags[elto_tag].dirty + " " +
			   "}\n" ;
	         }
	    }

            return o ;
        }

