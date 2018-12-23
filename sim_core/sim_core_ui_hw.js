/*     
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  General Hardware
         */

        function simcoreui_init_hw ( div_hw )
        {
              var ahw = simhw_active() ;

              var o = '' ;
              var c = '' ;

	      // summary
	      o += '<div class="card m-2">' +
		   '    <div class="card-body p-2">' +
		   '      <h5 class="card-title">' + ahw.sim_name + ' (' + ahw.sim_short_name + ')' + '</h5>' +
		   '      <p class="card-text">' + 
		   '      <span class="container-fluid">' + 
		   '        <span class="row">' + 
		   '        <span class="col p-0 mr-1">' + 
		   '           <img src="' + ahw.sim_img_processor + '" class="p-0" alt="sim_img_processor">' +
		   '        </span>' +
		   '        <span class="col p-0">' + 
		   '           <img src="' + ahw.sim_img_controlunit + '" class="p-0" alt="sim_img_controlunit">' +
		   '        </span>' +
		   '        </span>' +
		   '      </span>' +
		   '      </p>' +
		   '    </div>' +
		   '</div>' ;

	      // components
	      c = '<span class="container-fluid"><span class="row justify-content-between">' ;
	      for (elto in ahw.components) 
              {
		   c = c + '<span class="col">' +
                           '<a href="#" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + ahw.components[elto].name + ',<br> ' +
			   'version: '         + ahw.components[elto].version + ',<br> ' +
			   'abilities: '       + ahw.components[elto].abilities.join(" + ") + 
			   '">' + elto + '</a></span>' ;
	      }
	      c = c + '</span></span>' ;

	      o += '  <div class="card m-2">' +
		   '    <div class="card-body p-2">' +
		   '      <h5 class="card-title">Components</h5>' +
		   '      <p class="card-text">' + c + '</p>' +
		   '    </div>' +
		   '  </div>' ;

	      // states
              var elto_n  = '' ;
              var elto_v  = '' ;
              var elto_dv = '' ;
              var elto_nb = '' ;
              var elto_vi = '' ;

	      c = '<span class="container-fluid"><span class="row justify-content-between">' ;
	      for (elto in ahw.states) 
              {
                   elto_n  = elto ;
                   elto_v  = "object" ;
                   elto_dv = "object" ;
                   elto_nb = "-" ;
                   elto_vi = "-" ;

                   if (typeof ahw.states[elto].value != 'undefined')
                       elto_v  = ahw.states[elto].value ;
                   if (typeof ahw.states[elto].default_value != 'undefined')
                       elto_dv = ahw.states[elto].default_value ;
                   if (typeof ahw.states[elto].nbits != 'undefined')
                       elto_nb = ahw.states[elto].nbits ;
                   if (typeof ahw.states[elto].visible != 'undefined')
                       elto_vi = ahw.states[elto].visible ;

	           if (ahw.states[elto].value != 0)
                       elto_n = '<strong>' + elto + '</strong>' ;

		   c = c + '<span class="col">' +
		           '<a href="#" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + elto + ',<br> ' +
			   'value: '           + elto_v + ',<br> ' +
			   'default_value: '   + elto_dv + ',<br> ' +
			   'nbits: '           + elto_nb + ',<br> ' +
			   'visible: '         + elto_vi + 
			   '">' + elto_n + '</a></span>' ;
	      }
	      c = c + '</span></span>' ;

	      o += '  <div class="card m-2">' +
		   '    <div class="card-body p-2">' +
		   '      <h5 class="card-title">States</h5>' +
		   '      <p class="card-text">' + c + '</p>' +
		   '    </div>' +
		   '  </div>' ;

	      // signals
	      c = '<span class="container-fluid"><span class="row justify-content-between">' ;
	      for (elto in ahw.signals) 
              {
                   elto_n  = elto ;

	           if (ahw.signals[elto].value != 0)
                       elto_n = '<strong>' + elto + '</strong>' ;

		   c = c + '<span class="col">' +
		           '<a href="#" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + ahw.signals[elto].name + ',<br> ' +
			   'value: '           + ahw.signals[elto].value + ',<br> ' +
			   'default_value: '   + ahw.signals[elto].default_value + ',<br> ' +
			   'nbits: '           + ahw.signals[elto].nbits + ',<br> ' +
			   'type: '            + ahw.signals[elto].type + ',<br> ' +
			   'visible: '         + ahw.signals[elto].visible +
			   '">' + elto_n + '</a></span>' ;
	      }
	      c = c + '</span></span>' ;

	      o += '  <div class="card m-2">' +
		   '    <div class="card-body p-2">' +
		   '      <h5 class="card-title">Signals</h5>' +
		   '      <p class="card-text">' + c + '</p>' +
		   '    </div>' +
		   '  </div>' ;

	      // behaviors
	      c = '<span class="container-fluid"><span class="row justify-content-between">' ;
	      for (elto in ahw.behaviors) 
              {
		   c = c + '<span class="col">' +
		           '<a href="#" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + elto + ',<br> ' +
			   'nparameters: '     + ahw.behaviors[elto].nparameters + ',<br> ' +
			// 'operation: '       + ahw.behaviors[elto].operation.toString() + ',<br> ' +
			// 'verbal: '          + ahw.behaviors[elto].verbal.toString() + ',<br> ' +
			   '">' + elto + '</a></span>' ;
	      }
	      c = c + '</span></span>' ;

	      o += '  <div class="card m-2">' +
		   '    <div class="card-body p-2">' +
		   '      <h5 class="card-title">Behaviors</h5>' +
		   '      <p class="card-text">' + c + '</p>' +
		   '    </div>' +
		   '  </div>' ;

	      // debug
              //o = '<pre>' + JSON.stringify(ahw, null, 2) + '</pre>' ;

	      // set and go
              $(div_hw).html(o) ;
              $('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' }) ;

	      return true ;
        }

