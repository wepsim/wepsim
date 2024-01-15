/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *                           n_access:     0,
         *                           n_hits:       0,
         *                           n_misses:     0,
         *                           last_address: 0,
         *                           last_request: "read"
         *                        },
         *               "cfg":   {
         *                           name:        "L1",
         *                           via_size:    1,
         *                           off_size:    1,
         *                           set_size:    1,
         *                           vps_size:    1,
         *                           tag_size:    1,
         *                           replace_pol: "first",
         *                           su_pol:      "unified",
         *                           next_cache:  -1
         *                        },
         *               "sets":  {
         *                           0: {
         *                                 tags: {
         *                                          0: { n_access:0, valid:0, dirty:0, timestamp:0 }
         *                                       }
         *                              }
         *                        }
         *               ...
         *            }
         */


        //
        // Auxiliar functions
        //

        function cache_memory_update_stats ( memory, address, parts, r_w, m_h, clock_timestamp )
        {
            // global stats
            (memory.stats.n_access)++ ;
             memory.stats.last_addr  = address ;
             memory.stats.last_parts = parts ;
             memory.stats.last_r_w   = r_w ;
             memory.stats.last_h_m   = m_h ;

            if (m_h == "miss") {
                (memory.stats.n_misses)++ ;
            } else {
                (memory.stats.n_hits)++ ;
	    }

            // block stats
            (memory.sets[parts.set].tags[parts.tag].n_access)++ ;

            if (r_w == "write") {
                memory.sets[parts.set].tags[parts.tag].dirty = 1 ;
            }

            memory.sets[parts.set].tags[parts.tag].timestamp = clock_timestamp ;
        }

        function cache_memory_select_victim ( memory, set )
        {
            var keys = Object.keys(memory.sets[set].tags) ;
            var tag_victim  = 0 ;

            if (memory.cfg.replace_pol == "lfu")
            {
		tag_victim  = keys[0] ;
                var tag_naccess = memory.sets[parts.set].tags[tag_victim].n_access ;
		for (var i=1; i<keys.length; i++) {
                     if (tag_naccess > memory.sets[parts.set].tags[keys[i]].n_access) {
		         tag_victim = keys[i] ;
                         tag_naccess = memory.sets[parts.set].tags[tag_victim].n_access ;
                     }
                }
            }

       else if (memory.cfg.replace_pol == "fifo")
            {
		tag_victim  = keys[0] ;
                var tag_stamp = memory.sets[parts.set].tags[tag_victim].timestamp ;
		for (var i=1; i<keys.length; i++) {
                     if (tag_stamp > memory.sets[parts.set].tags[keys[i]].timestamp) {
		         tag_victim = keys[i] ;
                         tag_stamp = memory.sets[parts.set].tags[tag_victim].timestamp ;
                     }
                }
            }

       else if (memory.cfg.replace_pol == "first") {
                tag_victim = keys[0] ;
            }

            return tag_victim ;
        }


        //
        // API
        //

        // Example: var cm = cache_memory_init(12, 5, 6, "first", "unified", null) ;
        //                   * name:                    "L1"
        //                   * bits for via    in line: 12 bits,
        //                   * bits for offset in line:  5 bits,
        //                   * bits for set_per_cache:   6 bits,
        //                   * replace_policy:          "first" | "lfu",
        //                   * su_policy:               "unified" | "split_i" | "split_d",
        //                   * next_cache_level:         -1 (none)
        function cache_memory_init ( name, via_size, off_size, set_size, replace_pol, su_pol, next_cache )
        {
            var c = { "stats":{}, "cfg":{}, "sets":{} } ;

	    c.cfg.name     = name ;
	    c.cfg.via_size = via_size ;
	    c.cfg.off_size = off_size ;
	    c.cfg.set_size = set_size ;
	    c.cfg.vps_size = via_size - set_size ;
	    c.cfg.tag_size = 32 - set_size - off_size ;

            c.cfg.mask_tag = (Math.pow(2, c.cfg.tag_size) - 1) >>> 0 ;
            c.cfg.mask_set = (Math.pow(2, c.cfg.set_size) - 1) >>> 0 ;
            c.cfg.mask_off = (Math.pow(2, c.cfg.off_size) - 1) >>> 0 ;
            c.cfg.mask_tag = (c.cfg.mask_tag << (32 - c.cfg.tag_size)) >>> 0 ;
            c.cfg.mask_set = (c.cfg.mask_set <<      (c.cfg.off_size)) >>> 0 ;

	    c.cfg.replace_pol = replace_pol ;
	    c.cfg.su_pol      = su_pol ;
	    c.cfg.next_cache  = next_cache ;

	    c.stats.n_access = 0 ;
	    c.stats.n_hits   = 0 ;
	    c.stats.n_misses = 0 ;
            c.stats.last_addr  = 0x0 ;
            c.stats.last_parts = cache_memory_split(c, 0x0) ;
            c.stats.last_r_w   = "" ;
            c.stats.last_h_m   = "" ;

            return c ;
        }

        // Example: var cm = cache_memory_init2(cfg) ;
        function cache_memory_init2 ( cfg )
        {
            return cache_memory_init(cfg.name,
                                     cfg.via_size, cfg.off_size, cfg.set_size,
                                     cfg.replace_pol, cfg.su_pol,
                                     cfg.next_cache) ;
        }

        // Example: var array_cm = cache_memory_init3(array_cm_cfg) ;
        function cache_memory_init3 ( array_cm_cfg )
        {
            var array_cm = [] ;
            for (var i=0; i<array_cm_cfg.length; i++) {
                 array_cm[i] = cache_memory_init2(array_cm_cfg[i].cfg) ;
            }

            var next_cache_id = null ;
            for (var i=0; i<array_cm_cfg.length; i++)
            {
                 next_cache_id = array_cm_cfg[i].cfg.next_cache ;
                 if (next_cache_id != -1)
                      array_cm[i].cfg.next_cache = array_cm[next_cache_id] ;
                 else array_cm[i].cfg.next_cache = null ;
            }

            return array_cm ;
        }


        // Example: var parts = cache_memory_split(cm, 0x12345678)
        //          console.log("set: " + parts.set + ", tag: " + parts.tag + ", off: " + parts.offset) ;
        function cache_memory_split ( memory, address )
        {
            var parts = {
                           set:    0,
                           tag:    0,
                           offset: 0
                        } ;

            address      = (address >>> 0) ;
            parts.tag    = (address & memory.cfg.mask_tag) >>> (32 - memory.cfg.tag_size) ;
            parts.set    = (address & memory.cfg.mask_set) >>> (     memory.cfg.off_size) ;
            parts.offset = (address & memory.cfg.mask_off) ;

            return parts ;
        }

        // Example: var h_or_m = cache_memory_access(cm, 0x12345678, "read", clock_timestamp)
        //                       * memory:    cm
        //                       * address:   0x12345678
        //                       * r_w:       "read" | "write"
        //                       * clk_stamp: 100
        function cache_memory_access ( memory, address, r_w, clock_timestamp )
        {
            if (memory.cfg.su_pol != 'unified')
            {
                if (('split_i' == memory.cfg.su_pol) && (segments_addr_within_text(address) == false)) {
                      return false ;
                }
                if (('split_d' == memory.cfg.su_pol) && (segments_addr_within_data(address) == false)) {
                      return false ;
                }
            }

            // divide address into set:tag:offset
            var parts = cache_memory_split(memory, address) ;

            // initialize set (if not done before)
            if (typeof memory.sets[parts.set] == "undefined") {
                memory.sets[parts.set] = { tags:{}, number_tags:0 } ;
            }

            // if tag is loaded in any entry of the set -> update stats and return hit (true)
            if ( (typeof memory.sets[parts.set].tags[parts.tag] != "undefined") &&
                        (memory.sets[parts.set].tags[parts.tag].valid == 1) )
            {
                cache_memory_update_stats(memory, address, parts, r_w, "hit", clock_timestamp) ;
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
            cache_memory_update_stats(memory, address, parts, r_w, "miss", clock_timestamp) ;

            // chain request to the next cache level... if any
            if (memory.cfg.next_cache != null) {
                cache_memory_access(memory.cfg.next_cache, address, r_w) ;
            }

            // return miss (false) for this cache
            return false ;
        }

