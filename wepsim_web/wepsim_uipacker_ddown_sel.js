/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Drowndown (select part)
         */

        /* jshint esversion: 6 */
        class ws_ddown_sel extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		   // parent
		   super() ;

                   // pre-render components
	           this.mk_items_hash() ;
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
                   var o1  = '' ;

                   o1 += '<button type="button" class="col-12 btn btn-light shadow-sm"' +
                         '	  data-toggle="tooltip" data-placement="bottom" data-html="true"' +
                         '	  title="This button refresh the details (and might move the scrollbar), <br>the dropdown on the right changes the element to show its details."' +
                         '	  style="border-color: #BBBBBB;"' +
                         '	  id="select5b"' +
                         '	  onclick="wsweb_select_refresh();' +
                         '		   return false;">Refresh</button>' +
                         '<button id="dd2" type="button" ' +
                         '        class="btn btn-light dropdown-toggle dropdown-toggle-split"' +
                         '	  style="border-color: #BBBBBB;"' +
                         '	  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                         '<span class="sr-only">Toggle Dropdown</span>' +
                         '</button>' +
                         '<div class="dropdown-menu border border-secondary" ' +
                         '     id="dd2_container" ' +
                         '     style="height:55vh; overflow-y:auto !important; z-index:10000; -webkit-overflow-scrolling:touch;">' +
                         '</div>' ;

                   // load HTML
		   this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
                   // render ddown elements
                   var o1 = '' ;
                   for (var i=0; i<this.devices.length; i++)
                   {
                        var device = this.devices[i] ;

                        if (i != 0) {
                            o1 += ' <div class="dropdown-divider m-1"></div>' ;
                        }
                        o1 += ' <h6 class="text-secondary mb-1">' + device + '</h6>' ;
                        for (var j=0; j<this.details[device].length; j++)
                        {
                             var device_detail = this.details[device][j] ;
                             if (this.components_arr.indexOf(device_detail) !== -1) {
                                 o1 += this.ni[device_detail] ;
                             }
                        }
                   }

                   // load HTML
                   $("#dd2_container").html(o1) ;

                   // reload configuration
                   uipacker_ddown_sel_set_select(11) ;
                   uipacker_ddown_info_set_select(11) ;
	      }


              //
              // Auxiliar to render()
              //

	      mk_items_hash ()
	      {
                   this.devices = [ 'CPU', 'Main Memory', 'Devices', 'Simulation' ] ;
                   this.details = {
                                     'CPU':         [ 'all', 'mc', 'cpu' ],
                                     'Main Memory': [ 'mp', 'mpcfg' ],
                                     'Devices':     [ 'con', 'io', 'iocfg', 'iol3d' ],
                                     'Simulation':  [ 'ed_hw', 'ed_mc', 'ed_mp' ]
                                  } ;
                   this.ni = {
				 all: ' <a class="dropdown-item" href="#" id="s5b_11" value="11"' +
				      '	 onclick="wsweb_set_details(\'REGISTER_FILE\');' +
				      '		  return false;"><span class="bg-dark text-white">CPU</span>&nbsp;<span data-langkey=\'Registers\'>Registers</span></a>',
				  mc: ' <a class="dropdown-item user_microcode" href="#" id="s5b_16" value="16"' +
				      '	 onclick="wsweb_set_details(\'CONTROL_MEMORY\');' +
				      '		  return false;"><span class="bg-dark text-white">CPU</span>&nbsp;<span data-langkey=\'Control Memory\'>Control Memory</span></a>',
				 cpu: ' <a class="dropdown-item" href="#" id="s5b_17" value="17"' +
				      '	 onclick="wsweb_set_details(\'CPU_STATS\');' +
				      '		  return false;"><span class="bg-dark text-white">CPU</span>&nbsp;<span data-langkey=\'Stats\'>Stats</span></a>',
				  mp: ' <a class="dropdown-item" href="#" id="s5b_14" value="14"' +
				      '	 onclick="wsweb_set_details(\'MEMORY\');' +
				      '		  return false;"><span class="bg-dark text-white">MM</span>&nbsp;<span data-langkey=\'Memory\'>Memory</span></a>',
			       mpcfg: '      <a class="dropdown-item" href="#" id="s5b_18" value="18"' +
				      '	 onclick="wsweb_set_details(\'MEMORY_CONFIG\');' +
				      '		  return false;"><span class="bg-dark text-white">MM</span>&nbsp;<span data-langkey=\'Configuration\'>Configuration</span></a>',
				 con: '      <a class="dropdown-item" href="#" id="s5b_12" value="12"' +
				      '	 onclick="wsweb_set_details(\'SCREEN\');' +
				      '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'Keyboard+Display\'>Keyboard+Display</span></a>',
				  io: '      <a class="dropdown-item" href="#" id="s5b_15" value="15"' +
				      '	 onclick="wsweb_set_details(\'IO_STATS\');' +
				      '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'I/O Stats\'>I/O Stats</span></a>',
			       iocfg: '      <a class="dropdown-item" href="#" id="s5b_19" value="19"' +
				      '	 onclick="wsweb_set_details(\'IO_CONFIG\');' +
				      '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'I/O Configuration\'>I/O Configuration</span></a>',
			       iol3d: '      <a class="dropdown-item user_archived" href="#" id="s5b_25" value="25"' +
				      '	 onclick="wsweb_set_details(\'3DLED\');' +
				      '		  return false;"><span class="bg-dark text-white">Dev</span>&nbsp;<span data-langkey=\'I/O 3D-Led\'>I/O 3D-Led</span></a>',
			       ed_hw: '      <a class="dropdown-item" href="#" id="s5b_22" value="22"' +
				      '	 onclick="wsweb_set_details(\'HARDWARE\');' +
				      '		  return false;"><em class="fas fa-microchip"></em>&nbsp;Hardware</a>',


			       ed_mc: '      <a class="dropdown-item user_microcode" href="#" id="s5b_20" value="20"' +
				      '	 onclick="wsweb_set_details(\'FRM_EDITOR\');' +
				      '		  return false;"><span class="bg-dark text-white">Sim</span>&nbsp;MicroCode</a>',
			       ed_mp: '      <a class="dropdown-item" href="#" id="s5b_21" value="21"' +
				      '	 onclick="wsweb_set_details(\'ASM_EDITOR\');' +
				      '		  return false;"><span class="bg-dark text-white">Sim</span>&nbsp;Assembly</a>'
                             } ;
	      }
        }

        register_uielto('ws-ddown-sel', ws_ddown_sel) ;


        //
        // set programmatically the selected option (sel part)
        //

        function uipacker_ddown_sel_set_select ( opt )
        {
            // set button label...
            var ed=$('#s5b_' + opt).html() ;
            $('#select5b').html(ed) ;
        }

