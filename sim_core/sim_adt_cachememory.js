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
         *  cache_memory => {
         *               "stats": {
         *                           n_access: 0,
         *                           n_hits:   0,
         *                           n_misses: 0
         *                        },
         *               "cfg":   {
         *                           tag_size: 1,
         *                           set_size: 1,
         *                           off_size: 1,
         *                           replace_pol: "first"
         *                        },
         *               "sets":  {
         *                           0: {
         *                                 tags: {
         *                                          0: { n_access:0, valid:0, dirty:0 }
         *                                       }
         *                              }
         *                        }
         *               ...
         *            }
         */


        //
        // Auxiliar
        //

        function cache_memory_split ( memory_cfg, address )
        {
            var parts = {
                           set: 0,
                           tag: 0,
                           offset: 0
                        } ;

            parts.tag    = (address & memory_cfg.mask_tag) >> (32 - memory_cfg.tag_size) ;
            parts.set    = (address & memory_cfg.mask_set) >> (memory_cfg.offset_size) ;
            parts.offset = (address & memory_cfg.mask_off) ;

            return parts ;
        }

        function cache_memory_update_stats ( memory, set, tag, r_w, m_h )
        {
            // global stats
            (memory.stats.n_access)++ ;

            if (m_h == "miss") {
                (memory.stats.n_misses)++ ;
            } else {
                (memory.stats.n_hits)++ ;
	    }

            // block stats
            (memory.sets[set].tags[tag].n_access)++ ;

            if (r_w == "write") {
                memory.sets[set].tags[tag].dirty = 1 ;
            }
        }

        function cache_memory_select_victim ( memory, set )
        {
            var keys = Object.keys(memory.sets[set].tags) ;
            var tag_victim  = 0 ;
            var tag_naccess = 0 ;

            if (memory.cfg.replace_pol == "lfu")
            {
		tag_victim  = keys[0] ;
                tag_naccess = memory.sets[parts.set].tags[tag_victim].n_access ;
		for (var i=1; i<keys.length; i++) {
                     if (tag_naccess > memory.sets[parts.set].tags[keys[i]].n_access) {
		         tag_victim = keys[i] ;
                         tag_naccess = memory.sets[parts.set].tags[tag_victim].n_access ;
                     }
                }
            }

            if (memory.cfg.replace_pol == "first") {
                tag_victim = keys[0] ;
            }

            return tag_victim ;
        }


        //
        // API
        //

        // Example: var cm = cache_memory_init(5, 7, 20, "first", null) ;
        //                   * tag_size:         5 bits,
        //                   * set_size:         7 bits,
        //                   * offset_size:     20 bits,
        //                   * replace_policy:  "first" | "lfu",
        //                   * next_cache_level: null (none)
        function cache_memory_init ( tag_size, set_size, off_size, replace_pol, next_cache )
        {
            var c = {
                       "stats": {
                                   n_access: 0,
                                   n_hits:   0,
                                   n_misses: 0
                                },
                       "cfg":   {
                                   tag_size:    tag_size,
                                   set_size:    set_size,
                                   off_size:    off_size,
                                   replace_pol: replace_pol,
			           mask_tag:    0,
			           mask_set:    0,
			           mask_off:    0,
			           next_cache:  next_cache
                                },
                       "sets":  { }
                   } ;

            c.cfg.mask_tag = (Math.pow(2, tag_size) - 1) ;
            c.cfg.mask_tag = (c.cfg.mask_tag << (32 - tag_size)) >>> 0 ;
            c.cfg.mask_set = (Math.pow(2, set_size) - 1) ;
            c.cfg.mask_set = (c.cfg.mask_set << (off_size)) >>> 0 ;
            c.cfg.mask_off = (Math.pow(2, off_size) - 1) >>> 0 ;

            return c ;
        }

        // Example: var cm = cache_memory_init2(cfg, null) ;
        function cache_memory_init2 ( cfg, next_cache )
        {
            return cache_memory_init(cfg.tag_size, cfg.set_size, cfg.off_size,
                                     cfg.replace_pol,
                                     next_cache) ;
        }

        // Example: var h_or_m = cache_memory_access(cm, 0x12345678, "read")
        //                       * memory:  cm
        //                       * address: 0x12345678
        //                       * r_w:     "read" | "write"
        function cache_memory_access ( memory, address, r_w )
        {
            // divide address into set:tag:offset
            var parts = cache_memory_split(memory.cfg, address) ;

            // initialize set (if not done before)
            if (typeof memory.sets[parts.set] == "undefined")
            {
                memory.sets[parts.set] = { tags:{}, number_tags:0 } ;
            }

            // if tag is loaded in any entry of the set -> update stats and return hit (true)
            if ( (typeof memory.sets[parts.set].tags[parts.tag] != "undefined") &&
                        (memory.sets[parts.set].tags[parts.tag].valid == 1) )
            {
                cache_memory_update_stats(memory, parts.set, parts.tag, r_w, "hit") ;
                return true ;
            }

            // tag is not loaded in set... make room first?
            if (typeof memory.sets[parts.set].number_tags > 3)
            {
                var tag_victim = cache_memory_select_victim(memory, parts.set) ;

                memory.sets[parts.set].tags[tag_victim].valid = 0 ;
                memory.sets[parts.set].number_tags-- ;
            }

            // load tag in set, update stats and return miss (false)
            memory.sets[parts.set].tags[parts.tag] = { n_access:0, valid:1, dirty:0 } ;
            memory.sets[parts.set].number_tags++ ;

            cache_memory_update_stats(memory, parts.set, parts.tag, r_w, "miss") ;
            return false ;
        }

        // Example: cache_memory_show_stats(cm)
        //          * memory:  cm
        function cache_memory_show_stats ( memory )
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

