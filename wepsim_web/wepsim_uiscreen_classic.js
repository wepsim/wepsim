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
         *  Simulation: classic
         */

        /* jshint esversion: 6 */
        class ws_uiscreen_classic extends ws_uielto
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

                    // on events...
                    var offcvs1 = document.getElementById('offcvs1') ;
                    offcvs1.addEventListener('shown.bs.offcanvas',
                                             (event) => {
                                                 wepsim_offcanvas_helponhw('offcvs1', 'assembly_summary') ;
                                             }) ;

                    var offcvs2 = document.getElementById('offcvs2') ;
                    offcvs2.addEventListener('shown.bs.offcanvas',
                                             (event) => {
                                                 var content_name = event.target.getAttribute('data-ws-content') ;
                                                 wepsim_offcanvas_helponhw('offcvs2', content_name) ;
                                             }) ;
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
                 var o1 = '<div id="carousel-8" class="carousel carousel-fade" ' +
                          '     data-bs-interval="0" data-bs-touch="false" data-bs-animation="false">' +
		          '  <div class="carousel-inner">' +
		          '	  <div class="carousel-item active p-1" id="ws_simulator">' +
			  '' +
			  '         <h6 class="pt-3"><span data-langkey="Simulator">Simulator</span></h6>' +
			  '         <div class="row collapse show multi-collapse-1 p-1 m-0">' +
			              this.render_populate_classic_toolbars() +
			  '         </div>' +
			  '' +
			  '         <div class="row">' +
			  '            <div id="col1" class="pt-2 ps-3 pe-2">' +
			  '            <ws-ctoasm></ws-ctoasm>' +
			  '            </div>' +
			  '' +
			  '            <div id="col2" class="pt-2 ps-3">' +
			              this.render_populate_classic_details() +
			  '            </div>' +
			  '         </div>' +
			  '' +
                          '         <div class="offcanvas offcanvas-start"' +
                          '              data-bs-scroll="true" data-bs-backdrop="false"' +
                          '              tabindex="-1" id="offcvs3" aria-labelledby="offcvs3Label">' +
                          '         </div>' +
			  '' +
		          '	  </div>' +
		          '	  <div class="carousel-item p-1" id="ws_mcode">' +
	                            this.screen_mc() +
		          '	  </div>' +
		          '	  <div class="carousel-item p-1" id="ws_acode">' +
	                            this.screen_asm() +
		          '	  </div>' +
			  '  </div>' +
			  '</div>' ;

                   // load HTML
                   this.innerHTML = o1 ;
	      }

	      render_populate_classic_toolbars ( )
	      {
                   var o1  = '' ;
                   var ui1 = '' ;

		   ui1 += '[,btn_examples,btn_help,btndd_mode,]' ;

                   o1 += '<div class="col-sm-auto p-1 me-1 my-1">' +
			 '<ws-toolbar components="[,switch_microcode,switch_assembly,]"></ws-toolbar>' +
			 '</div>' +
			 '' +
			 '<div class="w-100 d-block d-sm-none"></div>' +
			 '' +
			 '<div id="slider_cpucu" ' +
                         '     class="col-sm p-0 collapse show multi-collapse-2 wsx_microcode">' +
			 '<ws-toolbar components="slider_cpucu"></ws-toolbar>' +
			 '</div>' +
			 '' +
			 '<div class="w-100 d-md-block d-lg-none"></div>' +
			 '' +
			 '<div class="col-sm-auto p-1 my-0">' +
			 '<ws-toolbar components="' + ui1 + '"></ws-toolbar>' +
                         '</div>' +
			 '' +
			 '<div class="col-sm p-0 ms-1 collapse show multi-collapse-2">' +
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
		   var ui1 = 'mp,con,all,mc,io,cpu,mpcfg,iocfg,iol3d,ioldm,ed_mc,ed_mp,cm,cmcfg' ;

		   var o1 = '    <div class="row ps-2 pe-3">' +
			    '	 <ws-executionbar name="exebar1" class="btn-toolbar btn-block"' +
			    '			  components="btn_reset,btn_emins,btn_eins,btn_rnf"' +
			    '			  icons="up" role="toolbar"></ws-executionbar>' +
			    '	 </div>' +
			    '' +
			    '	 <div class="row ps-2 pe-3 pt-1">' +
			    '	 <div class="btn-toolbar btn-block" role="toolbar">' +
			    '	      <button class="btn bg-body-tertiary shadow-sm col py-0 mx-1 border border-secondary"' +
			    '		      style="flex-grow:1;"' +
			    '		      data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true"' +
			    '		      title="This button opens the \'state management\' dialog: it shows the current state, saves the current state, and shows the differences between two states."' +
			    '		      onclick="wsweb_dialog_open(\'state\');' +
			    '			       return false;">' +
                            '<em class="fas fa-camera"></em>' + '&nbsp;' +
                            '<span data-langkey="States">States</span></button>' +
			    '	      <ws-ddown-sel class="col btn-group p-0 mx-1" style="flex-grow:2;"' +
			    '                       components="' + ui1 + '"></ws-ddown-sel>' +
			    '	 </div>' +
			    '	 </div>' +
			    '' +
			    '	 <ws-ddown-info components="' + ui1 + '"></ws-ddown-info>' +
			    '' ;

                   // return HTML
                   return o1 ;
	      }

	      screen_asm ( )
	      {
                   var o1 = '' ;

		   o1 += '    <h6 class="pt-3"><span data-langkey=\'Assembly\'>Assembly</span></h6>' +
			 '    <div class="row collapse show multi-collapse-1 p-1 m-0">' +
			 '' +
			 '	<div class="container col-12" role="none">' +
			 '	<div class="col-sm px-1"      role="toolbar" aria-label="Assembly Toolbar">' +
			 '' +
			 '	      <div class="btn-group me-2 my-1" role="group"   aria-label="Toolbar Microcode, and assembly buttons">' +
			 '		   <ws-toolbar components="switch_microcode,switch_simulator"></ws-toolbar>' +
			 '	      </div>' +
			 '' +
			 '	      <div class="btn-group me-2 my-1" role="group"   aria-label="Toolbar load and save buttons">' +
			 '		   <ws-compilationbar icons="left" components="btn_aloadsave"></ws-compilationbar>' +
			 '	      </div>' +
			 '' +
			 '	      <div class="btn-group me-2 my-1" role="group"   aria-label="Toolbar load and save buttons">' +
			 '		   <ws-compilationbar icons="left" components="btn_acompile,btn_ashowbin"></ws-compilationbar>' +
			 '	      </div>' +
			 '' +
			 '	      <div class="btn-group me-2" role="group"   aria-label="Toolbar load and save buttons">' +
                         '            <div class="dropdown">' +
                         '               <button class="btn dropdown-toggle shadow-sm col-auto border border-secondary bg-help"' +
                         '                 style="flex-grow:1;" '+
                         '                       type="button" id="ddownAsmHelp1" ' +
                         '                       data-bs-toggle="dropdown" aria-expanded="false">' +
                         '               <em class="fas fa-info-circle"></em>&nbsp;' +
                         '               <strong><span data-langkey="Help">Help</span></strong></button>' +
                         '                 <ul class="dropdown-menu bg-help" ' +
                         '                     aria-labelledby="ddownAsmHelp1">' +
                         '                   <li><button class="btn dropdown-item bg-help" ' +
                         '                               onclick="wsweb_dialog_open(\'help\');' +
                         '                                wepsim_help_set(\'relative\', ' +
                         '                                                \'simulator#help_assembly_format\');' +
                         '                                return false;"' +
                         '                   ><strong><span data-langkey="Assembly format">Assembly format</span></strong></button></li>' +
                         '                   <li><button class="btn dropdown-item bg-help" type="button" ' +
                         '                               data-bs-toggle="offcanvas" data-bs-target="#offcvs1" ' +
                         '                               aria-controls="offcvs1"' +
                         '                   ><strong><span data-langkey="Instruction summary">Instruction summary</span></strong></button></li>' +
                         '                   <li><button class="btn dropdown-item bg-help" ' +
                         '                               onclick="wsweb_dialog_open(\'help\');' +
                         '                                        return false;"' +
                         '                   ><strong><span data-langkey="Help index">Help index</span></strong></button></li>' +
                         '                 </ul>' +
                         '               </div>' +
			 '	      </div>' +
			 '' +
			 '	      <div class="btn-group me-2 my-1">' +
			 '		   <ws-toolbar components="[,btn_config,btndd_action,]"></ws-toolbar>' +
			 '	      </div>' +
			 '' +
			 '	</div>' +
			 '	</div>' +
			 '' +
			 '    </div>' +
			 '' +
                         '    <div id="offcvs1" class="offcanvas offcanvas-end"' +
                         '         data-bs-scroll="true" data-bs-backdrop="false"' +
			 '         style="min-width:35vw;" ' +
                         '         tabindex="-1" aria-labelledby="offcvs1Label">' +
                         '    </div>' +
			 '' +
			 '    <ws-edit-as layout="both"></ws-edit-as>' ;

                   // return HTML
                   return o1 ;
	      }

	      screen_mc ( )
	      {
                   var o1 = '' ;

                   o1 += '    <h6 class="pt-3"><span data-langkey="Microcode">Microcode</span></h6>' +
			 '    <div class="row collapse show multi-collapse-1 p-1 m-0">' +
			 '' +
			 '	<div class="container col-12" role="none">' +
			 '	<div class="col-sm px-1"      role="toolbar" aria-label="MicroCode Toolbar">' +
			 '' +
			 '	      <div class="btn-group me-2 my-1" role="group"' +
			 '		   aria-label="Toolbar Assembly, and Simulator buttons">' +
			 '		   <ws-toolbar components="switch_assembly,switch_simulator"></ws-toolbar>' +
			 '	      </div>' +
			 '' +
			 '	      <div class="btn-group me-2 my-1" role="group"   aria-label="Toolbar load and save buttons">' +
			 '		   <ws-compilationbar icons="left" components="btn_mloadsave"></ws-compilationbar>' +
			 '	      </div>' +
			 '' +
			 '	      <div class="btn-group me-2 my-1" role="group"   aria-label="Toolbar load and save buttons">' +
			 '		   <ws-compilationbar icons="left" components="btn_mcompile,btn_mshowbin"></ws-compilationbar>' +
			 '	      </div>' +
			 '' +
/*
			 '	      <div class="btn-group me-2 my-1" role="group"   aria-label="Toolbar load and save buttons">' +
			 '		    <button class="btn shadow-sm col-auto bg-help"' +
			 '			    onclick="wsweb_dialog_open(\'help\');' +
			 '				     wepsim_help_set(\'relative\', \'simulator#help_firmware_format\');' +
			 '				     return false;"' +
			 '			    ><em class="fas fa-info-circle"></em>&nbsp;<strong><span data-langkey="Help">Help</span></strong></button>' +
			 '	      </div>' +
			 '' +
*/
			 '	      <div class="btn-group me-2" role="group"   aria-label="Toolbar load and save buttons">' +
                         '            <div class="dropdown">' +
                         '               <button class="btn dropdown-toggle col-auto border border-secondary bg-help"' +
                         '                       style="flex-grow:1;" ' +
                         '                       type="button" id="ddownMicroHelp1" ' +
                         '                       data-bs-toggle="dropdown" aria-expanded="false">' +
                         '               <em class="fas fa-info-circle"></em>&nbsp;' +
                         '               <strong><span data-langkey="Help">Help</span></strong></button>' +
                         '                 <ul class="dropdown-menu bg-help" ' +
                         '                     aria-labelledby="ddownMicroHelp1">' +
                         '                   <li><button class="btn dropdown-item bg-help" ' +
                         '                               onclick="wsweb_dialog_open(\'help\');' +
                         '                                wepsim_help_set(\'relative\', ' +
                         '                                                \'simulator#help_firmware_format\');' +
                         '                                return false;"' +
                         '                   ><strong><span data-langkey="Firmware format">Firmware format</span></strong></button></li>' +
                         '                   <li><button class="btn dropdown-item bg-help" type="button" ' +
                         '                               data-bs-toggle="offcanvas" data-bs-target="#offcvs2" ' +
                         '                               aria-controls="offcvs2"' +
                         '                               onclick="var offobj = null; ' +
                         '                                        offobj = document.getElementById(\'offcvs2\');' +
                         '                                        offobj.setAttribute(\'data-ws-content\', ' +
                         '                                                            \'hardware_summary\');' +
                         '                                        wepsim_offcanvas_show(\'offcvs2\');' +
                         '                                        return false;"' +
                         '                   ><strong><span data-langkey="Hardware summary">Hardware summary</span></strong></button></li>' +
                         '                   <li><button class="btn dropdown-item bg-help" type="button" ' +
                         '                               data-bs-toggle="offcanvas" data-bs-target="#offcvs2" ' +
                         '                               aria-controls="offcvs2"' +
                         '                               onclick="var offobj = null; ' +
                         '                                        offobj = document.getElementById(\'offcvs2\');' +
                         '                                        offobj.setAttribute(\'data-ws-content\', ' +
                         '                                                            \'signals_summary\');' +
                         '                                        wepsim_offcanvas_show(\'offcvs2\');' +
                         '                                        return false;"' +
                         '                   ><strong><span data-langkey="Signals summary">Signals summary</span></strong></button></li>' +
                         '                   <li><button class="btn dropdown-item bg-help" ' +
                         '                               onclick="wsweb_dialog_open(\'help\');' +
                         '                                        return false;"' +
                         '                   ><strong><span data-langkey="Help index">Help index</span></strong></button></li>' +
                         '                 </ul>' +
                         '               </div>' +
			 '	      </div>' +
			 '' +
			 '	      <div class="btn-group me-2 my-1">' +
			 '		   <ws-toolbar components="[,btn_config,btndd_action,]"></ws-toolbar>' +
			 '	      </div>' +
			 '' +
			 '	</div>' +
			 '	</div>' +
			 '' +
			 '    </div>' +
			 '' +
                         '    <div class="offcanvas offcanvas-end"' +
                         '         data-bs-scroll="true" data-bs-backdrop="false"' +
			 '         style="min-width:35vw;" ' +
                         '         tabindex="-1" id="offcvs2" aria-labelledby="offcvs2Label">' +
                         '    </div>' +
			 '' +
			 '    <ws-edit-mc layout="both"></ws-edit-mc>' ;

                   // return HTML
                   return o1 ;
	      }
        }

        register_uielto('ws-screen-classic', ws_uiscreen_classic) ;


    //
    // General popover
    //

    function wepsim_offcanvas_set_content ( offcanvas_id, title, with_close_btn, content, footer )
    {
        var o = '' ;

        if (with_close_btn) {
            o = '<button type="button" class="btn-close text-reset"' +
	        '        data-bs-dismiss="offcanvas" aria-label="Close"></button>' ;
        }

        o = '  <div class="offcanvas-header bg-secondary bg-opacity-25 border p-2 mt-5">' +
            '    <h5 class="offcanvas-title lh-1" ' +
            '        onclick="wepsim_offcanvas_toggleHV(\'' + offcanvas_id + '\');"' +
            '        id="' + offcanvas_id + 'Label">' +
                  '<em class="fas fa-retweet me-2"></em>&nbsp;' +
                  title +
                  '</h5>' +
                  o +
            '  </div>' +
            '  <div class="offcanvas-body" id="' + offcanvas_id + 'help">' +
                content +
                '</div>' +
            '  <div class="offcanvas-footer bg-secondary bg-opacity-25">'  +
                footer  +
            '  </div>' ;

        // set content
        $('#' + offcanvas_id).html(o) ;
    }

    function wepsim_offcanvas_show ( offcanvas_id )
    {
        var jsObj = document.getElementById(offcanvas_id) ;
        var bsObj = bootstrap.Offcanvas.getOrCreateInstance(jsObj) ;

        bsObj.show() ;
    }

    function wepsim_offcanvas_hide ( offcanvas_id )
    {
        var jsObj = document.getElementById(offcanvas_id) ;
        var bsObj = bootstrap.Offcanvas.getOrCreateInstance(jsObj) ;

        bsObj.hide() ;
    }

    function wepsim_offcanvas_toggleHV ( offcanvas_id )
    {
        $('#' + offcanvas_id).toggleClass('offcanvas-bottom').toggleClass('offcanvas-start') ;
    }

    function wepsim_offcanvas_helponhw ( offcanvas_id, content_name )
    {
	 var c = '' ;

	 if ("signals_summary" == content_name)
	 {
	      c = 'Loading signals...' ;
	      wepsim_offcanvas_set_content(offcanvas_id, 'Hardware signals', true, c, '') ;

	      var seg_idiom = get_cfg('ws_idiom') ;
	      var ahw       = simhw_active() ;
	      var helpurl   = 'repo/hardware/' + ahw.sim_short_name + '/help/signals-' + seg_idiom + '.html' ;
	      resolve_html_url('#' + offcanvas_id + 'help', helpurl, '#', function(){}) ;
	 }
	 else if ("hardware_summary" == content_name)
	 {
	      c = '<ws-help-hweltos layout="offcanvas"></ws-help-hweltos>' ;
	      wepsim_offcanvas_set_content(offcanvas_id, 'Hardware summary', true, c, '') ;
	 }
	 else if ("assembly_summary" == content_name)
	 {
	      c = '<ws-help-swset layout="offcanvas"></ws-help-swset>' ;
	      wepsim_offcanvas_set_content(offcanvas_id, 'Assembly summary', true, c, '') ;
	 }
	 else
	 {
	      c = 'Unknown content name for ' + offcanvas_id ;
	      wepsim_offcanvas_set_content(offcanvas_id, 'Help', true, c, '') ;
	 }
    }

