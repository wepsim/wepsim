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
		   '      <span class="row">' + 
		   '      <img src="' + ahw.sim_img_processor +   '" class="col p-0 mr-1" alt="sim_img_processor">' +
		   '      <img src="' + ahw.sim_img_controlunit + '" class="col p-0"      alt="sim_img_controlunit">' +
		   '      </span>' +
		   '      </p>' +
		   '    </div>' +
		   '</div>' ;

	      // components
	      c = '' ;
	      for (elto in ahw.components) {
		   c = c + '<a href="#" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + ahw.components[elto].name + ',<br> ' +
			   'version: '         + ahw.components[elto].version + ',<br> ' +
			   'abilities: '       + ahw.components[elto].abilities.join(" ") + 
			   '">' + elto + '</a>&nbsp;' ;
	      }

	      o += '  <div class="card m-2">' +
		   '    <div class="card-body p-2">' +
		   '      <h5 class="card-title">Components</h5>' +
		   '      <p class="card-text">' + c + '</p>' +
		   '    </div>' +
		   '  </div>' ;

	      // states
	      c = '' ;
	      for (elto in ahw.states) {
		   c = c + '<a href="#" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + ahw.states[elto].name + ',<br> ' +
			   'visible: '         + ahw.states[elto].visible + ',<br> ' +
			   'default_value: '   + ahw.states[elto].default_value + ',<br> ' +
			   'nbits: '           + ahw.states[elto].nbits +
			   '">' + elto + '</a>&nbsp;' ;
	      }

	      o += '  <div class="card m-2">' +
		   '    <div class="card-body p-2">' +
		   '      <h5 class="card-title">States</h5>' +
		   '      <p class="card-text">' + c + '</p>' +
		   '    </div>' +
		   '  </div>' ;

	      // signals
	      c = '' ;
	      for (elto in ahw.signals) {
		   c = c + '<a href="#" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + ahw.signals[elto].name + ',<br> ' +
			   'visible: '         + ahw.signals[elto].visible + ',<br> ' +
			   'type: '            + ahw.signals[elto].type + ',<br> ' +
			   'default_value: '   + ahw.signals[elto].default_value + ',<br> ' +
			   'nbits: '           + ahw.signals[elto].nbits +
			   '">' + elto + '</a>&nbsp;' ;
	      }

	      o += '  <div class="card m-2">' +
		   '    <div class="card-body p-2">' +
		   '      <h5 class="card-title">Signals</h5>' +
		   '      <p class="card-text">' + c + '</p>' +
		   '    </div>' +
		   '  </div>' ;

	      // behaviors
	      c = '' ;
	      for (elto in ahw.behaviors) {
		   c = c + '<a href="#" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + elto + ',<br> ' +
			   'nparameters: '     + ahw.behaviors[elto].nparameters + ',<br> ' +
			   '">' + elto + '</a>&nbsp;' ;
	      }

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

