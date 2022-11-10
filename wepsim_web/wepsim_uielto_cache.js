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
		    var o1 = "<pre id='memory_CACHE' style='height:58vh; width:inherit;'></pre>" ;

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
                          o1 = cache_memory_show_stats(cm_ref) ;
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
              var o1 = cache_memory_show_stats(memory) ;
              $("#memory_CACHE").html(o1) ;
        }

