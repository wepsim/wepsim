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
         *  Dropdown (information part)
         */

        /* jshint esversion: 6 */
        class ws_ddown_info extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		   // parent
		   super();

                   // pre-render components
                   this.ni = this.mk_nav_item_hash() ;
                   this.np = this.mk_nav_pane_hash() ;
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
                   // render ddown elements
                   var o1 = '' ;

                   // <nav list part>
                   o1 += '<ul class="nav nav-tabs" id="tabs1" role="tablist" style="display:none;">' +
                         '</ul>' +
                         '<div class="tab-content mt-3" id="tabs1b" style="min-height: 55vh">' +
                         '</div>' ;

                   // load HTML
                   this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
                   var o1 = '' ;
                   var o2 = '' ;

                   for (var i=0; i<this.components_arr.length; i++)
                   {
                        var nav_name = this.components_arr[i] ;

                        var nav_item = this.ni[nav_name] ;
                        if (typeof nav_item !== "undefined") {
                            o1 += nav_item ;
                        }

                            nav_item = this.np[nav_name] ;
                        if (typeof nav_item !== "undefined") {
                            o2 += nav_item ;
                        }
                   }

                   if (this.components_arr.indexOf('ed_mc') == -1)
                       o2 += this.mk_nav_tabpane_item('ed_mc', '',       '') ;
                   if (this.components_arr.indexOf('ed_mp') == -1)
                       o2 += this.mk_nav_tabpane_item('ed_mp', '',       '') ;

                    $("#tabs1").html(o1) ;
                   $("#tabs1b").html(o2) ;
	      }


              //
              // Auxiliar to render()
              //

	      mk_nav_item ( n_id, n_href, n_label, n_aclass, n_liclass )
	      {
                   return '<li class="nav-item ' + n_liclass + '">' +
                          '<a class="nav-link '  + n_aclass  + '" role="tab" ' +
                          '   aria-controls="home" aria-selected="true"' +
                          '   data-bs-toggle="tab" id="' + n_id + '" href="' + n_href + '">' +
                          n_label +
                          '</a>' +
                          '</li>' ;
	      }

	      mk_nav_item_hash ()
	      {
                   var ni = {} ;

                   ni.mp    = this.mk_nav_item('tab14', '#mp',    'Memory',               'active', '') ;
                   ni.con   = this.mk_nav_item('tab12', '#con',   'Console',              '', '') ;
                   ni.all   = this.mk_nav_item('tab11', '#all',   'Registers',            '', '') ;
                   ni.mc    = this.mk_nav_item('tab16', '#mc',    'Control Memory',       '', '') ;
                   ni.io    = this.mk_nav_item('tab15', '#io',    'IO stats',             '', '') ;
                   ni.cpu   = this.mk_nav_item('tab17', '#cpu',   'CPU stats',            '', '') ;
                   ni.mpcfg = this.mk_nav_item('tab18', '#mpcfg', 'Memory configuration', '', '') ;
                   ni.iocfg = this.mk_nav_item('tab19', '#iocfg', 'I/O configuration',    '', '') ;
               //  ni.ed_hw = this.mk_nav_item('tab22', '#ed_hw', 'Hardware',             '', '') ;
                   ni.iol3d = this.mk_nav_item('tab25', '#iol3d', '3D Led',               '', '') ;
                   ni.ioldm = this.mk_nav_item('tab27', '#ioldm', 'Led Matrix',           '', '') ;
                   ni.ed_mc = this.mk_nav_item('tab20', '#ed_mc', 'MicroCode',            '', '') ;
                   ni.ed_mp = this.mk_nav_item('tab21', '#ed_mp', 'Assembly',             '', 'wsx_microcode') ;
                   ni.cm    = this.mk_nav_item('tab28', '#cm',    'Cache',                '', '') ;
                   ni.cmcfg = this.mk_nav_item('tab29', '#cmcfg', 'Cache configuration',  '', '') ;

                   return ni ;
	      }

	      mk_nav_tabpane_item ( n_id, n_dclass, n_content )
	      {
                   return '<div class="tab-pane mx-0 my-2 ' + n_dclass + '" role="tabpanel" id="' + n_id + '">' +
                          n_content +
                          '</div>' ;
	      }

	      mk_nav_pane_hash ()
	      {
                   var np = {} ;

	           np.all   = this.mk_nav_tabpane_item('all',   'active', '<ws-registers id="regs1"></ws-registers>') ;
	           np.mp    = this.mk_nav_tabpane_item('mp',    '',  '<ws-mainmemory></ws-mainmemory>') ;
	           np.mc    = this.mk_nav_tabpane_item('mc',    '',  '<ws-dbg-mc></ws-dbg-mc>') ;
	           np.con   = this.mk_nav_tabpane_item('con',   '',  '<ws-console></ws-console>') ;
	           np.io    = this.mk_nav_tabpane_item('io',    '',  '<ws-io-info id="ioinfo1"></ws-io-info>') ;
	           np.cpu   = this.mk_nav_tabpane_item('cpu',   '',  '<ws-cpu id="cpu1"></ws-cpu>') ;
	           np.mpcfg = this.mk_nav_tabpane_item('mpcfg', '',  '<ws-mem-config id="memcfg1"></ws-mem-config>') ;
	           np.iocfg = this.mk_nav_tabpane_item('iocfg', '',  '<ws-io-config id="iocfg1"></ws-io-config>') ;
	           np.iol3d = this.mk_nav_tabpane_item('iol3d', '',  '<ws-l3d  id="l3d1"></ws-l3d>') ;
	           np.ioldm = this.mk_nav_tabpane_item('ioldm', '',  '<ws-ledm id="ldm1"></ws-ledm>') ;
	       //  np.ed_hw = this.mk_nav_tabpane_item('ed_hw', '',  '<ws-hw  id="infohw1" components="summary,elements,states,signals,behaviors"></ws-hw>') ;

                   np.ed_mc = this.mk_nav_tabpane_item('ed_mc', '',  '<ws-edit-mc layout="compilebar,placeholder"></ws_edit_mc>') ;
                   np.ed_mp = this.mk_nav_tabpane_item('ed_mp', '',  '<ws-edit-as layout="compilebar,placeholder"></ws_edit_as>') ;
	           np.cm    = this.mk_nav_tabpane_item('cm',    '',  '<ws-cachememory></ws-cachememory>') ;
	           np.cmcfg = this.mk_nav_tabpane_item('cmcfg', '',  '<ws-cache-config id="cmcfg1"></ws-cache-config>') ;

                   return np ;
	      }
        }

        register_uielto('ws-ddown-info', ws_ddown_info) ;


        //
        // set programmatically the selected option (info part)
        //

        function uipacker_ddown_info_set_select ( opt )
        {
            var atab = document.querySelector('#tab' + opt) ;
            if (null == atab) {
                return;
            }

            // show info panel
            bootstrap.Tab.getOrCreateInstance('#tab' + opt).show() ; //bs4:$('#tab' + opt).trigger('click');

            // update interface
            $('#select5a').val(opt) ;
        }

