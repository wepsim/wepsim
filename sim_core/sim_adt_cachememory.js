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
         *               "cfg":   {
         *                           tag_size: 1,
         *                           set_size: 1,
         *                           off_size: 1
         *                        },
         *               "sets":  {
         *                           0: {
         *                                 tags: {
         *                                          0: {
         *                                                0:{a:0, c:0},
         *                                                1:{a:0, c:0},
         *                                                2:{a:0, c:0},
         *                                                3:{a:0, c:0}
         *                                             }
         *                                       }
         *                              }
         *                        }
         *               ...
         *            }
         */

        function cache_memory_update_cfg ( memory_cfg, tag_size, set_size, off_size )
        {
            memory_cfg.tag_size    = tag_size ;
            memory_cfg.set_size    = set_size ;
            memory_cfg.offset_size = off_size ;

            memory_cfg.mask_tag = (Math.pow(2, tag_size) - 1) ;
            memory_cfg.mask_tag = (memory_cfg.mask_tag << (32 - tag_size)) >>> 0 ;
            memory_cfg.mask_set = (Math.pow(2, set_size) - 1) ;
            memory_cfg.mask_set = (memory_cfg.mask_set << (off_size)) >>> 0 ;
            memory_cfg.mask_off = (Math.pow(2, off_size) - 1) >>> 0 ;
        }

        function cache_memory_split ( memory_cfg, address )
        {
            var parts = {
                           set: 0,
                           tag: 0,
                           offset: 0
                        } ;

            parts.tag = address & memory_cfg.mask_tag >> (32 - tag_size) ;
            parts.set = address & memory_cfg.mask_set >> (off_size) ;
            parts.off = address & memory_cfg.mask_off ;

            return parts ;
        }

        function cache_memory_access ( memory, address )
        {
            // divide address into set:tag:offset
            var parts = cache_memory_split(memory.cfg, address) ;

            // initialize set (if not done before)
            if (typeof memory.sets[parts.set] == "undefined")
            {
                memory.sets[parts.set] = {
                                            tags:{},
                                            number_tags:0
                                         } ;
            }

            // if tag is loaded in any entry of the set -> increase number access and return hit
            if (typeof memory.sets[parts.set].tags[parts.tag] != "undefined")
            {
                var n = memory.sets[parts.set].tags[parts.tag][parts.offset].a ;
                memory.sets[parts.set].tags[parts.tag][parts.offset].a = n + 1 ;
                return true ;
            }

            // tag is not loaded in set... make room first?
            if (typeof memory.sets[parts.set].number_tags > 3)
            {
                var keys = Object.keys(memory.sets[parts.set].tags) ;

                // <TODO>
                // * select key to kick-out... index in keys
                var i = 0 ;
                // </TODO>

                delete memory.sets[parts.set].tags[keys[i]] ;
                memory.sets[parts.set].number_tags-- ;
            }

            // load tag in set and return miss
            memory.sets[parts.set].tags[parts.tag] = {
                                                         0:{a:0, c:0},
                                                         1:{a:0, c:0},
                                                         2:{a:0, c:0},
                                                         3:{a:0, c:0}
                                                     } ;
            memory.sets[parts.set].number_tags++ ;
            return false ;
        }

