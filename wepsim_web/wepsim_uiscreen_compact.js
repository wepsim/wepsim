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
         *  Simulation: compact
         */

        /* jshint esversion: 6 */
        class ws_uiscreen_compact extends ws_uielto
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
                    // initialize render elements...
	            super.render() ;

                    // render current element
		    this.render_skel() ;
		    this.render_populate() ;
	      }

	      render_skel ( )
	      {
                   // make HTML code
                   var o1 = '<h2>Loading...</h2>' ;

                   // load HTML
                   this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
	        var o1 = '<div id="carousel-8" class="carousel carousel-fade"' +
                         '     data-bs-interval="0" data-bs-touch="false" data-bs-animation="false">' +
			 ' <div class="carousel-inner">' +
			 ' <div class="carousel-item active p-1" id="ws_simulator">' +
			 '' +
			 '  <h6 class="pt-3"><span data-langkey="Simulator">Simulator</span></h6>' +
			 '  <div class="p-0 m-0 collapse show multi-collapse-1">' +
			 '  <div class="d-flex flex-wrap justify-content-center py-1 px-1" ' +
			 '       style="margin:1px">' +
			    this.render_populate_compact_toolbars() +
			 '  </div>' +
			 '  </div>' +
			 '' +
                         '  <div class="offcanvas offcanvas-start"' +
                         '       data-bs-scroll="true" data-bs-backdrop="false"' +
                         '       tabindex="-1" id="offcvs3" aria-labelledby="offcvs3Label">' +
                         '  </div>' +
			 '' +
			 ' <div class="row">' +
			 '   <div id="col1" class="pt-2 ps-3 pe-2">' +
			 '   <ws-ctoasm></ws-ctoasm>' +
			 '   </div>' +
			 '   <div id="col2" class="pt-2 ps-3">' +
			 '   <ws-simmicasm></ws-simmicasm>' +
			 '   </div>' +
			 ' </div>' +
			 '' +
			 ' </div>' +
			 ' </div>' +
			 '</div>' ;

                   // load HTML
                   this.innerHTML = o1 ;

		   // initialize loaded components
                   wepsim_quickcfg_init('slidercfg') ;
	      }

	      render_populate_compact_toolbars ( )
	      {
		  return  '	  <a id="popover-slidercfg" tabindex="0"' +
			  '	     class="btn my-1 col-auto border-0 multi-collapse-3 collapse show"' +
			  '	     data-bs-toggle="popover-slidercfg"><strong><strong class="fas fa-wrench text-secondary"></strong></strong></a>' +
			  '' +
			  '	  <div class="col-auto px-0 px-sm-2">' +
			  '	  <ws-toolbar components="[,btn_examples,btn_help,]"' +
			  '		      icons="left"></ws-toolbar>' +
			  '	  </div>' +
			  '' +
			  '	  <div class="w-100 d-xs-block d-sm-none"></div>' +
			  '' +
			  '	  <div class="col-auto px-0 px-sm-2">' +
			  '	  <ws-toolbar components="[,btn_notifications,btn_recordbar,btn_states,]"' +
			  '		      icons="left"></ws-toolbar>' +
			  '	  </div>' +
			  '' +
			  '	  <div class="w-100 d-xs-block d-sm-none"></div>' +
			  '' +
			  '	  <div class="col-auto px-0 px-sm-2">' +
			  '	  <ws-toolbar components="[,btndd_mode,btn_config,btn_checkpoint,]"' +
			  '		      icons="left"></ws-toolbar>' +
			  '	  </div>' +
			  '' +
			  '	  <div class="w-100 d-xs-block d-sm-none"></div>' +
			  '' +
			  '	  <div id="slider_cpucu" ' +
                          '            class="col-sm p-0 collapse multi-collapse-2 wsx_microcode">' +
			  '	  <ws-toolbar components="slider_cpucu"></ws-toolbar>' +
			  '	  </div>' +
			  '' +
			  '	  <div class="w-100 d-md-block d-lg-none"></div>' +
			  '' +
			  '	  <div class="col-sm p-0 ms-1 collapse multi-collapse-2 wsx_microcode">' +
			  '	  <ws-toolbar components="slider_c1c2"></ws-toolbar>' +
			  '	  </div>' ;
	      }
        }

        register_uielto('ws-screen-compact', ws_uiscreen_compact) ;

