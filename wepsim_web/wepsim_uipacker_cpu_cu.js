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
         *  Navbar: navtab circuits as graph/table
         */

        /* jshint esversion: 6 */
        class ws_cpucu_got extends ws_uielto
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( event_name )
	      {
		    // html holder
		    var o1 = '' ;

                    // row with quick config:
                    o1 +=    "<div class='container text-end col-12 px-3 pt-1 multi-collapse-3 collapse show'>" +
                             "<span class='my-0' for='popover-cpuview' style='min-width:95%'>" +
                             "<span data-langkey='quick config'>quick config</span>: " +
                             "<a id='popover-cpuview' tabindex='0' " +
                             "   class='show multi-collapse-3 btn my-1 col-auto border-0' " +
                             "   data-bs-toggle='popover-cpuview'>" +
                             "<strong><strong class='fas fa-wrench text-secondary'></strong></strong></a>" +
                             "</span>" +
                             "</div>" ;

                    // row with pill-buttons:
                    o1 +=    '<div class="row d-none">' +
                             '  <div class="col">' +
                             '    <div class="nav nav-pills nav-fill" ' +
                             '         id="nav-tab1" role="tablist" aria-orientation="horizontal">' +
                             '      <a class="nav-link m-2 bg-body-tertiary text-primary active" ' +
                             '         data-bs-toggle="pill" role="tab" ' +
                             '         id="cpu_view_graph1" href="#cpu_graph1" ' +
                             '         aria-controls="cpu_graph1" aria-selected="true">' +
                             '<span data-langkey="Graph">Graph</span></a>' +
                             '      <a class="nav-link m-2 bg-body-tertiary text-primary" ' +
                             '         data-bs-toggle="pill" role="tab" ' +
                             '         id="cpu_view_table1" href="#cpu_table1" ' +
                             '         aria-controls="cpu_table1" aria-selected="false">' +
                             '<span data-langkey="Text">Text</span></a>' +
                             '    </div>' +
                             '  </div>' +
                             '</div>' ;

                    // row with panels:
                    o1 +=    '<div class="row">' +
                             '  <div class="col">' +
                             '    <div class="tab-content" id="nav-tab1-content">' +
                             '      <div role="tabpanel" class="tab-pane " ' +
                             '           id="cpu_table1" aria-labelledby="cpu_view_table1">' +
                             '      <ws-hw id="infohw1" components="elements"></ws-hw>' +
                             '      </div>' +
                             '      <div role="tabpanel" class="tab-pane show active" ' +
                             '           id="cpu_graph1" aria-labelledby="cpu_view_graph1">' +
                             '	    <ws-cpusvg></ws-cpusvg>' +
                             '      </div>' +
                             '    </div>' +
                             '  </div>' +
                             '</div>' ;

		    this.innerHTML = o1 ;

                    // initialize loaded components
                    wepsim_quickcfg_init('pocpucu1') ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-cpucu_got', ws_cpucu_got) ;
        }


        /*
         *  Auxiliar to init_x & show_x
         */

        function show_cpuview_view ( )
        {
            var show_as_graph = get_cfg('CPUCU_show_graph') ;

            // (1/2) show as graph
            if (show_as_graph)
            {
                $('#cpu_view_graph1').tab("show") ;
                return ;
            }

            // (2/2) show as table
            $('#cpu_view_table1').tab("show") ;
	    setTimeout(function() {
                          cpucu_show_table('elements') ;
                       }, 100);
        }

		function eventhandler_load_svg_p_initlisteners ( )
		{
		    simcore_init_eventlistener("svg_p", hash_detail2action, hash_signal2action) ;
		    refresh() ;
		}

		function eventhandler_load_svg_cu_initlisteners ( )
		{
	    	    simcore_init_eventlistener("svg_cu", hash_detail2action, hash_signal2action) ;
		    refresh() ;
		}

        function cpucu_show_graph ( )
        {
            var ahw = simhw_active() ;
            if ( (typeof ahw == "undefined") || (ahw == null) )
            {
                 return ;
            }

            var svg_arr = [ 'svg_p',               'svg_cu',               'svg_p2' ] ;
            var img_arr = [ ahw.sim_img_processor, ahw.sim_img_controlunit, ahw.sim_img_cpu ] ;

            // reload svg
            wepsim_svg_reload(svg_arr, img_arr) ;

            // reload images event-handlers
	    var a = document.getElementById("svg_p");
            if (a != null) {
	        a.addEventListener("load", eventhandler_load_svg_p_initlisteners, false);
            }

	    var b = document.getElementById("svg_cu");
            if (b != null) {
	        b.addEventListener("load", eventhandler_load_svg_cu_initlisteners, false);
            }
        }

        function cpucu_show_table ( eltos_to_show )
        {
	    $("#infohw1").attr('components', '') ;
	    $("#infohw1").attr('components', eltos_to_show) ;

            var ws_idiom = get_cfg('ws_idiom') ;
            i18n_update_tags('hw', ws_idiom) ;
        }

