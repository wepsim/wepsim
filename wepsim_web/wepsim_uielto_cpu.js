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
         *  CPU device
         */

        /* jshint esversion: 6 */
        class ws_cpu extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
                    // if no active hardware -> empty 
                    if (simhw_active() === null) {
                        return "<div id='cpu_ALL'></div>" ;
                    }

		    // html holder
		    var o1 = "<div id='cpu_ALL' style='height:58vh; width: inherit; overflow-y: auto;' " +
			     "     class='container container-fluid'>" +
		             "<div class='col-12'>" +
			     "<table class='table table-hover table-sm table-bordered'>" +
			     " <tr>" +
			     "<td align='center' class='w-50'>Instructions</td>" +
			     "<td align='center' class='w-50'>" +
			     "<div id='ins_context'>{{ value }}</div>" +
			     "</td>" +
			     " </tr>" +
			     " <tr>" +
			     "<td align='center' class='w-50'>CLK ticks</td>" +
			     "<td align='center' class='w-50'>" +
			     "<div id='clk_context'>{{ value }}</div>" +
			     "</td>" +
			     " </tr>" +
			     " <tr>" +
			     "<td align='center' class='w-50'>Acc. msec.</td>" +
			     "<td align='center' class='w-50'>" +
			     "<div id='tms_context'>{{ value }}</div>" +
			     "</td>" +
			     " </tr>" +
			     "</table>" +
			     "</div>" +
			     "</div>" ;

		    this.innerHTML = o1 ;

                    // vue binding
                    var ref_obj = simhw_sim_state('CLK') ;
                    vue_rebind_state(ref_obj, '#clk_context') ;

                        ref_obj = simhw_sim_state('DECO_INS') ;
                    vue_rebind_state(ref_obj, '#ins_context') ;

                        ref_obj = simhw_sim_state('ACC_TIME') ;
                    vue_rebind_state(ref_obj, '#tms_context') ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-cpu', ws_cpu) ;
        }

