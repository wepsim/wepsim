/*    
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
        class ws_ddown_info extends HTMLElement
        {
              static get observedAttributes() 
	      {
	           return [ 'name', 'components' ] ;
	      }

	      constructor ()
	      {
		   // parent
		   super();

                   // pre-render components
                   this.ni = this.mk_nav_item_hash() ;
                   this.np = this.mk_nav_pane_hash() ;
	      }

              update_internal_attributes ( )
              {
                    // components
                    this.components_str = this.getAttribute('components') ;
                    if (this.components_str === null)
                        this.components_str = '' ;
                    this.components_arr = this.components_str.split(',') ;
              }

	      render ( )
	      {
                   // get updated attributes
                   this.update_internal_attributes() ;

                   // render ddown elements
                   var o1 = '' ;
                   var o2 = '' ;

                   // (1/2) <nav list part>
                   o1 += '<ul class="nav nav-tabs" id="tabs1" role="tablist" style="display:none;">' ;
                   o2 += '<div class="tab-content mt-3">' ;

                   for (var i=0; i<this.components_arr.length; i++)
                   {
                        var nav_name = this.components_arr[i] ;

                        var nav_item = this.ni[nav_name] ;
                        if (typeof nav_item !== "undefined") {
                            o1 += nav_item ;
                        }

                        var nav_item = this.np[nav_name] ;
                        if (typeof nav_item !== "undefined") {
                            o2 += nav_item ;
                        }
                   }

                   if (this.components_arr.indexOf('ed_mc') == -1)
                       o2 += this.mk_nav_tabpane_item('ed_mc', '',       '') ;
                   if (this.components_arr.indexOf('ed_mp') == -1)
                       o2 += this.mk_nav_tabpane_item('ed_mp', '',       '') ;

                   o1 += '</ul>' ;
                   o2 += '</div>' ;

                   // load HTML
                   this.innerHTML = o1 + o2 ;
	      }

	      connectedCallback ()
	      {
		   this.render() ;
	      }

	      attributeChangedCallback ( name, oldValue, newValue )
	      {
		   this.render() ;
	      }

	      get components ( )
	      {
                   return this.getAttribute('components') ;
	      }

	      set components ( value )
	      {
                   this.setAttribute('components', value) ;
	      }

	      get name ( )
	      {
                   return this.getAttribute('name') ;
	      }

	      set name ( value )
	      {
                   this.setAttribute('name', value) ;
	      }


              //
              // Auxiliar to render()
              //

	      mk_nav_item ( n_id, n_href, n_label, n_aclass, n_liclass )
	      {
                   return '<li class="nav-item ' + n_liclass + '">' +
                          '<a class="nav-link '  + n_aclass  + '" role="tab" ' + 
                          '   aria-controls="home" aria-selected="true"' +
                          '   data-toggle="tab" id="' + n_id + '" href="' + n_href + '">' + 
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
                   ni.ed_hw = this.mk_nav_item('tab22', '#ed_hw', 'Hardware',             '', '') ;
                   ni.iol3d = this.mk_nav_item('tab25', '#iol3d', '3D Led',               '', 'user_archived') ;
                   ni.ed_mc = this.mk_nav_item('tab20', '#ed_mc',  'MicroCode',           '', '') ;
                   ni.ed_mp = this.mk_nav_item('tab21', '#ed_mp',  'Assembly',            '', 'user_microcode') ;

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
	           np.mp    = this.mk_nav_tabpane_item('mp',    '',       '<ws-mainmemory></ws-mainmemory>') ;
	           np.mc    = this.mk_nav_tabpane_item('mc',    '',       '<ws-dbg-mc></ws-dbg-mc>') ;
	           np.con   = this.mk_nav_tabpane_item('con',   '',       '<ws-console></ws-console>') ;
	           np.io    = this.mk_nav_tabpane_item('io',    '',       '<ws-io-info id="ioinfo1"></ws-io-info>') ;
	           np.cpu   = this.mk_nav_tabpane_item('cpu',   '',       '<ws-cpu id="cpu1"></ws-cpu>') ;
	           np.mpcfg = this.mk_nav_tabpane_item('mpcfg', '',       '<ws-mem-config id="memcfg1"></ws-mem-config>') ;
	           np.iocfg = this.mk_nav_tabpane_item('iocfg', '',       '<ws-io-config id="iocfg1"></ws-io-config>') ;
	           np.iol3d = this.mk_nav_tabpane_item('iol3d', '',       '<ws-l3d id="l3d1"></ws-l3d>') ;
	           np.ed_hw = this.mk_nav_tabpane_item('ed_hw', '',       '<ws-hw id="infohw1"></ws-hw>') ;
                   np.ed_mc = this.mk_nav_tabpane_item('ed_mc', '',       this.mk_nav_tabpane_editmc()) ;
                   np.ed_mp = this.mk_nav_tabpane_item('ed_mp', '',       this.mk_nav_tabpane_editmp()) ;

                   return np ;
	      }

	      mk_nav_tabpane_editmc ( )
	      {
                  return '<div id="edit_MC" style="width: inherit; overflow-y: auto; overflow-x:hidden;">' +
                         '' +
                         '	    <div class="row p-0">' +
                         '		<div class="container col-12 pr-0" role="none">' +
                         '		<div class="col-sm px-1" role="toolbar" ' + 
                         '                   aria-label="MicroCode Toolbar">' +
                         '                 <ws-compilationbar' +
                         '                     icons="up"' +
                         '                     components="btn_mloadsave,btn_mcompile,btn_mshowbin"' +
                         '                     class="btn-group m-1 d-flex flex-wrap"' +
                         '                     aria-label="MicroCode Toolbar buttons"></ws-compilationbar>' +
                         '		</div>' +
                         '		</div>' +
                         '	    </div>' +
                         '' +
                         '	    <div id="t3_firm_placeholder2" ' + 
                         '               class="ui-body-d ui-content px-2 py-0" ' + 
                         '               style="height:55vh; overflow-y:auto; -webkit-overflow-scrolling:touch;">' +
                         '	    </div>' +
                         '' +
                         '</div>' ;
	      }

	      mk_nav_tabpane_editmp ( )
	      {
                  return '<div id="edit_MP" style="width: inherit; overflow-y: auto; overflow-x:hidden;">' +
                         '' +
                         '	    <div class="row py-0 px-1">' +
                         '		<div class="container col-12 pr-0" role="none">' +
                         '		<div class="col-sm px-1" role="toolbar" aria-label="Assembly Toolbar">' +
                         '                   <ws-compilationbar' +
                         '                       icons="up"' +
                         '                       components="btn_aloadsave,btn_acompile,btn_ashowbin"' +
                         '                       class="btn-group m-1 d-flex flex-wrap"' +
                         '                       aria-label="Assembly Toolbar buttons"></ws-compilationbar>' +
                         '		</div>' +
                         '		</div>' +
                         '	    </div>' +
                         '' +
                         '	    <div id="t4_asm_placeholder2" class="ui-body-d ui-content px-2 py-0" style="height:55vh; overflow-y:auto; -webkit-overflow-scrolling:touch;">' +
                         '	    </div>' +
                         '' +
                         '</div>' ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-ddown-info', ws_ddown_info) ;
        }

