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
         *  Simulation Screen
         */

        /* jshint esversion: 6 */
        class ws_uiscreen_sim extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		   // parent
		   super();
	      }

              // render
	      render ( )
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
                   // get layout value
                   var ly = 'classic' ;
                   if (this.layout != null) {
                       ly = this.layout.trim() ;
                   }

                   // make HTML code
                   var o1 = '' ;
                   if ('classic' == ly)
                   {
                    o1 += ' <h6 class="pt-3"><span data-langkey="Simulator">Simulator</span></h6>' +
			  ' <div class="row collapse show multi-collapse-1 p-1 m-0">' +
	                      this.render_populate_classic_toolbars() +
			  ' </div>' +
			  '' +
			  ' <div class="row">' +
			  '    <div id="col1" class="pt-2 pl-3 pr-2">' +
			  '    <ws-ctoasm></ws-ctoasm>' +
			  '    </div>' +
			  '' +
			  '    <div id="col2" class="pt-2 pl-3">' +
	                      this.render_populate_classic_details() +
			  '    </div>' +
			  ' </div>' ;
                   }
                   else
                   {
                    o1 += '  <h6 class="pt-3"><span data-langkey="Simulator">Simulator</span></h6>' +
			  '  <div class="p-0 m-0 collapse show multi-collapse-1">' +
			  '  <div class="d-flex flex-wrap justify-content-center py-1 px-1" ' +
                          '       style="margin:1px">' +
	                     this.render_populate_compact_toolbars() +
			  '  </div>' +
			  '  </div>' +
			  '' +
			  ' <div class="row">' +
			  '   <div id="col1" class="pt-2 pl-3 pr-2">' +
			  '   <ws-ctoasm></ws-ctoasm>' +
			  '   </div>' +
			  '   <div id="col2" class="pt-2 pl-3">' +
			  '   <ws-simmicasm></ws-simmicasm>' +
			  '   </div>' +
			  ' </div>' ;
                   }

                   // load HTML
                   this.innerHTML = o1 ;
	      }

              // Auxiliar functions
	      render_populate_classic_toolbars ( )
	      {
                   var o1 = '<div class="col-sm-auto p-1 mr-1 my-1">' +
			    '<ws-toolbar components="[,switch_microcode,switch_assembly,]"></ws-toolbar>' +
			    '</div>' +
			    '' +
			    '<div class="w-100 d-block d-sm-none"></div>' +
			    '' +
			    '<div id="slider_cpucu" ' +
                            '     class="col-sm p-0 collapse show multi-collapse-2 user_microcode">' +
			    '<ws-toolbar components="slider_cpucu"></ws-toolbar>' +
			    '</div>' +
			    '' +
			    '<div class="w-100 d-md-block d-lg-none"></div>' +
			    '' +
			    '<div class="col-sm-auto p-1 my-0">' +
			    '<ws-toolbar components="[,btn_examples,btn_help,btndd_mode,]"></ws-toolbar>' +
			    '</div>' +
			    '' +
			    '<div class="col-sm p-0 ml-1 collapse show multi-collapse-2">' +
			    '<ws-toolbar components="slider_c1c2"></ws-toolbar>' +
			    '</div>' +
			    '' +
			    '<div class="w-100 d-sm-block d-md-none"></div>' +
			    '' +
			    '<div class="col-sm-auto p-1 my-0">' +
			    '<ws-toolbar components="[,btn_config,btndd_action,]"></ws-toolbar>' +
			    '</div>' ;

                   // return HTML
                   return o1 ;
	      }

	      render_populate_classic_details ( )
	      {
		   var o1 = '    <div class="row pl-2 pr-3">' +
			    '	 <ws-executionbar name="exebar1" class="btn-toolbar btn-block"' +
			    '			  components="btn_reset,btn_emins,btn_eins,btn_run"' +
			    '			  icons="up" role="toolbar"></ws-executionbar>' +
			    '	 </div>' +
			    '' +
			    '	 <div class="row pl-2 pr-3 pt-1">' +
			    '	 <div class="btn-toolbar btn-block" role="toolbar">' +
			    '	      <button class="btn btn-light shadow-sm col py-0 mx-1"' +
			    '		      style="border-color: #BBBBBB; flex-grow:1;"' +
			    '		      data-toggle="tooltip" data-placement="bottom" data-html="true"' +
			    '		      title="This button opens the \'state management\' dialog: it shows the current state, saves the current state, and shows the differences between two states."' +
			    '		      onclick="wsweb_dialog_open(\'state\');' +
			    '			       return false;">' +
                            '<em class="fas fa-camera"></em>' + '&nbsp;' + 
                            '<span data-langkey="States">States</span></button>' +
			    '	      <ws-ddown-sel class="col btn-group p-0 mx-1" style="flex-grow:2;"' +
			    '                       components="mp,con,all,mc,io,cpu,mpcfg,iocfg,iol3d,ioldm,ed_mc,ed_mp"></ws-ddown-sel>' +
			    '	 </div>' +
			    '	 </div>' +
			    '' +
			    '	 <ws-ddown-info components="mp,con,all,mc,io,cpu,mpcfg,iocfg,iol3d,ioldm,ed_mc,ed_mp"></ws-ddown-info>' +
			    '' ;

                   // return HTML
                   return o1 ;
	      }

	      render_populate_compact_toolbars ( )
	      {
		  return  '	  <a id="popover-slidercfg" tabindex="0"' +
			  '	     class="show multi-collapse-3 btn my-1 col-auto"' +
			  '	     data-toggle="popover-slidercfg"><strong><strong class="fas fa-wrench text-secondary"></strong></strong></a>' +
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
                          '            class="col-sm p-0 collapse multi-collapse-2 user_microcode">' +
			  '	  <ws-toolbar components="slider_cpucu"></ws-toolbar>' +
			  '	  </div>' +
			  '' +
			  '	  <div class="w-100 d-md-block d-lg-none"></div>' +
			  '' +
			  '	  <div class="col-sm p-0 ml-1 collapse multi-collapse-2 user_microcode">' +
			  '	  <ws-toolbar components="slider_c1c2"></ws-toolbar>' +
			  '	  </div>' ;
	      }
        }

        register_uielto('ws-screen-sim', ws_uiscreen_sim) ;
