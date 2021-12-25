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
         *  Navbar: navtab circuits/assembly
         */

        /* jshint esversion: 6 */
        class ws_ctoasm extends ws_uielto
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( )
	      {
		    // html holder
		    var o1 = '<!-- Nav tabs -->' +
		             '<ul class="nav nav-tabs nav-justified nav-tabs">' +
		             '    <li class="nav-item user_microcode">' +
                             '        <a id="tab26" href="#eltos_cpu"' +
                             '           class="nav-link active" data-toggle="tab" role="tab"' +
                             '     style="border-top-width:3px; border-right-width:3px; border-left-width:3px;"' +
		             '		 aria-label="processor"' +
                             '           onclick="wsweb_change_show_processor();' +
                             '                    return false;">' + 
                   '<em class="fas fa-microchip"></em>&nbsp;<span data-langkey="Processor">Processor</span></a>' +
                             '    </li>' +
		             '    <li class="nav-item">' +
                             '        <a id="tab24" href="#eltos_dbg"' +
                             '           class="nav-link" data-toggle="tab" role="tab"' +
                             '     style="border-top-width:3px; border-right-width:3px; border-left-width:3px;"' +
		             '		 aria-label="assembly debugger"' +
                             '           onclick="wsweb_change_show_asmdbg();' +
                             '                    return false;"><em class="fas fa-bug"></em>&nbsp;<span class="d-sm-none" data-langkey="Assembly">Assembly</span><span class="d-none d-sm-inline-flex" data-langkey="Assembly Debugger">Assembly Debugger</span></a>' +
                             '          </li>' +
		             '      </ul>' +
		             '\n' +
                             '<!-- Tab panes -->' +
                             '<div class="tab-content">' +
                             '  <div id="eltos_cpu" class="tab-pane active" role="tabpanel">' +

                             // row with quick config:
                             "<div class='container text-right'>" +
                             "<label class='my-0' for='popover-rfcfg' style='min-width:95%'>" +
                             "<span data-langkey='quick config'>quick config</span>: " +
                             "<a id='popover-cpuview' tabindex='0' " +
                             "   class='show multi-collapse-3 btn my-1 col-auto' " +
                             "   data-toggle='popover-cpuview'>" +
                             "<strong><strong class='fas fa-wrench text-secondary'></strong></strong></a>" +
                             "</label>" +
                             "</div>" +

                             // row with pill-buttons:
                             '<div class="row d-none">' +
                             '  <div class="col">' +
                             '    <div class="nav nav-pills nav-fill" ' +
                             '         id="nav-tab1" role="tablist" aria-orientation="horizontal">' +
                             '      <a class="nav-link m-2 bg-light text-primary active" ' +
                             '         data-toggle="pill" role="tab" ' +
                             '         id="cpu_view_graph1" href="#cpu_graph1" ' +
                             '         aria-controls="cpu_graph1" aria-selected="true">' + 
                             '<span data-langkey="Graph">Graph</span></a>' +
                             '      <a class="nav-link m-2 bg-light text-primary" ' +
                             '         data-toggle="pill" role="tab" ' +
                             '         id="cpu_view_table1" href="#cpu_table1" ' +
                             '         aria-controls="cpu_table1" aria-selected="false">' + 
                             '<span data-langkey="Text">Text</span></a>' +
                             '    </div>' +
                             '  </div>' +
                             '</div>' +

                             // row with panels:
                             '<div class="row">' +
                             '  <div class="col">' +
                             '    <div class="tab-content" id="nav-tab1-content">' +
                             '      <div role="tabpanel" class="tab-pane fade" ' +
                             '           id="cpu_table1" aria-labelledby="cpu_view_table1">' +
                             '      <ws-hw id="infohw1" components="elements"></ws-hw>' +
                             '      </div>' +
                             '      <div role="tabpanel" class="tab-pane fade show active" ' +
                             '           id="cpu_graph1" aria-labelledby="cpu_view_graph1">' +
                             '	    <ws-cpusvg></ws-cpusvg>' +
                             '      </div>' +
                             '    </div>' +
                             '  </div>' +
                             '</div>' +


		             '  </div>' +
		             '\n' +
		             '  <div id="eltos_dbg" class="tab-pane" role="tabpanel">' +
		             '	   <ws-dbg-mp></ws-dbg-mp>' +
		             '  </div>' +
	    	             '</div>' ;

		    this.innerHTML = o1 ;

                    // initialize loaded components
		    wepsim_init_quickcfg("[data-toggle=popover-cpuview]",
			                 "click",
			                 quick_config_cpuview,
					 function(shownEvent) {
					     i18n_update_tags('cfg') ;
					     i18n_update_tags('dialogs') ;
					 }) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-ctoasm', ws_ctoasm) ;
        }


        /*
         *  Auxiliar to init_x & show_x
         */

        function quick_config_cpuview ( )
        {
	    var o = "<div class='container mt-1'>" +
                    "<div class='row'>" +
                       quickcfg_html_header('Display format') +
	               quickcfg_html_btn('(*) Graph',
	 			         "" +
				         "$(\"#cpu_view_graph1\").tab(\"show\");",
				         'col-6') +
	               quickcfg_html_btn('Text',
	 			         "" +
				         "$(\"#cpu_view_table1\").tab(\"show\");",
				         'col-6') +
                       quickcfg_html_br() +
                       quickcfg_html_close('popover-cpuview') +
		    "</div>" +
		    "</div>" ;

	    return o ;
        }

