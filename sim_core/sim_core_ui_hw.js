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

        function simcoreui_init_hw_summary ( ahw )
        {
              // list of components
	      var c = '<span class="row justify-content-between">' ;
	      for (elto in ahw.components) 
              {
		   c = c + '<span class="col">' +
                           '<a href="#" class="hwtooltip" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + ahw.components[elto].name + ',<br> ' +
			   'version: '         + ahw.components[elto].version + ',<br> ' +
			   'abilities: '       + ahw.components[elto].abilities.join(" + ") + 
			   '">' + elto + '</a></span>' ;
	      }
	      c = c + '</span>' ;

              // card with signal list
              var o = '' ;
	      o += '<div class="card m-2">' +
		   '    <div class="card-body p-2">' +
                   '' +
		   '      <h5 class="card-title">' + 
		   '        <span class="row">' + 
		   '          <span class="col-6">' + ahw.sim_name + ' (' + ahw.sim_short_name + ')</span>' +
                   '          <a data-toggle="collapse" href="#th_processor" role="button"   class="col w-25" ' + 
                   'aria-expanded="false" aria-controls="th_processor">' + 
		   '<img src="' + ahw.sim_img_processor + '" class="img-thumbnail" alt="sim_img_processor"></a>' +
                   '          <a data-toggle="collapse" href="#th_controlunit" role="button" class="col w-25" ' + 
                   'aria-expanded="false" aria-controls="th_controlunit">' + 
		   '<img src="' + ahw.sim_img_controlunit + '" class="img-thumbnail" alt="sim_img_controlunit"></a>' +
		   '        </span>' +
                   '      </h5>' +
                   '' +
		   '      <p class="card-text">' + 
                   '      <span class="collapse multi-collapse" id="th_processor">' +
		   '<img src="' + ahw.sim_img_processor + '" class="img-thumbnail" alt="sim_img_processor"></a>' +
		   '      </span>' +
                   '      <span class="collapse multi-collapse" id="th_controlunit">' +
		   '<img src="' + ahw.sim_img_controlunit + '" class="img-thumbnail" alt="sim_img_controlunit"></a>' +
		   '      </span>' +
		          c + 
		   '      </p>' +
                   '' +
		   '    </div>' +
		   '</div>' ;

	      return o ;
        }

        function simcoreui_init_hw_signals ( ahw )
        {
              // list of signals
              var elto_n  = '' ;

	      var c = '<span class="row justify-content-between">' ;
	      for (elto in ahw.signals) 
              {
                   elto_n  = elto ;

	           if (ahw.signals[elto].value != 0) {
                       elto_n = '<strong>' + elto + '</strong>' ;
                   }

		   c = c + '<span class="col">' +
		           '<a href="#" class="hwtooltip" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + ahw.signals[elto].name + ',<br> ' +
			   'value: '           + ahw.signals[elto].value + ',<br> ' +
			   'default_value: '   + ahw.signals[elto].default_value + ',<br> ' +
			   'nbits: '           + ahw.signals[elto].nbits + ',<br> ' +
			   'type: '            + ahw.signals[elto].type + ',<br> ' +
			   'visible: '         + ahw.signals[elto].visible +
			   '">' + elto_n + '</a></span>' ;
	      }
	      c = c + '</span>' ;

              // card with signal list
	      var o = '  <div class="card m-2">' +
		      '    <div class="card-body p-2">' +
		      '      <h5 class="card-title">Signals</h5>' +
		      '      <p class="card-text">' + c + '</p>' +
		      '    </div>' +
		      '  </div>' ;

	      return o ;
        }

        function simcoreui_init_hw_states ( ahw )
        {
              // list of states
              var elto_n  = '' ;
              var elto_v  = '' ;
              var elto_dv = '' ;
              var elto_nb = '' ;
              var elto_vi = '' ;

	      var c = '<span class="row justify-content-between">' ;
	      for (elto in ahw.states) 
              {
	           // value
                   elto_v  = "-" ;
                   elto_dv = "-" ;
                   if (typeof ahw.states[elto].value != 'undefined') 
		   {
                       elto_v  = ahw.states[elto].value ;
                       elto_dv = ahw.states[elto].default_value ;

                       if (typeof elto_v == 'object') {
                           elto_v  = 'object' ;
                           elto_dv = 'object' ;
		       }
		   }

	           if (elto_v != 0)
                        elto_n = '<strong>' + elto + '</strong>' ;
		   else elto_n = elto ;

	           // nbits, and visible
                   if (typeof ahw.states[elto].nbits != 'undefined')
                        elto_nb = ahw.states[elto].nbits ;
		   else elto_nb = "-" ;

                   if (typeof ahw.states[elto].visible != 'undefined')
                        elto_vi = ahw.states[elto].visible ;
		   else elto_vi = "-" ;

	           // compound
		   c = c + '<span class="col">' +
		           '<a href="#" class="hwtooltip" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + elto + ',<br> ' +
			   'value: '           + elto_v + ',<br> ' +
			   'default_value: '   + elto_dv + ',<br> ' +
			   'nbits: '           + elto_nb + ',<br> ' +
			   'visible: '         + elto_vi + 
			   '">' + elto_n + '</a></span>' ;
	      }
	      c = c + '</span>' ;

              // card with state list
	      var o = '  <div class="card m-2">' +
		      '    <div class="card-body p-2">' +
		      '      <h5 class="card-title">States</h5>' +
		      '      <p class="card-text">' + c + '</p>' +
		      '    </div>' +
		      '  </div>' ;

	      return o ;
        }

        function simcoreui_init_hw_behaviors ( ahw )
        {
              // list of behaviors
	      var c = '<span class="row justify-content-between">' ;
	      for (elto in ahw.behaviors) 
              {
		   c = c + '<span class="col">' +
		           '<a href="#" class="hwtooltip" data-toggle="tooltip" data-html="true" title="" data-original-title="' + 
			   'name: '            + elto + ',<br> ' +
			   'nparameters: '     + ahw.behaviors[elto].nparameters + ',<br> ' +
			// 'operation: '       + ahw.behaviors[elto].operation.toString() + ',<br> ' +
			// 'verbal: '          + ahw.behaviors[elto].verbal.toString() + ',<br> ' +
			   '">' + elto + '</a></span>' ;
	      }
	      c = c + '</span>' ;

              // card with behaviors list
	      var o = '  <div class="card m-2">' +
		      '    <div class="card-body p-2">' +
		      '      <h5 class="card-title">Behaviors</h5>' +
		      '      <p class="card-text">' + c + '</p>' +
		      '    </div>' +
		      '  </div>' ;

	      return o ;
        }

        function simcoreui_init_hw ( div_hw )
        {
              var ahw = simhw_active() ;

	      // get make-up
              var o = '' ;
              o += simcoreui_init_hw_summary(ahw) ;
              o += simcoreui_init_hw_signals(ahw) ;
              o += simcoreui_init_hw_states(ahw) ;
              o += simcoreui_init_hw_behaviors(ahw) ;

	      // set and go
              $(div_hw).html(o) ;
              $('.hwtooltip').tooltip({ trigger: 'hover' }) ;

	      return true ;
        }

