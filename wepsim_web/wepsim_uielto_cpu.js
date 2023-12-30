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
         *  CPU device
         */

        /* jshint esversion: 6 */
        class ws_cpu extends ws_uielto
        {
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
                    // default content
                    this.innerHTML = '<div id="' + 'cpu_ALL_' + this.name_str + '" ' +
                                     'style="height:58vh; width:inherit; overflow-y:auto;"></div>' ;
              }

	      render_populate ( )
	      {
                    var o1 = '' ;
                    var div_hash = '#cpu_ALL_' + this.name_str ;

                    // if no active hardware -> empty
                    if (simhw_active() === null)
                    {
                        $(div_hash).html(o1) ;
			return ;
                    }

		    // html holder
                    if (this.layout == "card")
	                 o1 += this.render_populate_as_card() ;
		    else o1 += this.render_populate_as_table() ;
                    $(div_hash).html(o1) ;

                    // vue binding
                    var ref_obj = simhw_sim_state('CLK') ;
                    vue_rebind_state(ref_obj, '#clk_context') ;

                        ref_obj = simhw_sim_state('DECO_INS') ;
                    vue_rebind_state(ref_obj, '#ins_context') ;

                        ref_obj = simhw_sim_state('ACC_TIME') ;
                    vue_rebind_state(ref_obj, '#tms_context') ;

                        ref_obj = simhw_sim_state('ACC_PWR') ;
                    vue_rebind_state(ref_obj, '#pwr_context') ;
	      }

	      render_populate_as_table ( )
	      {
		   return "<div id='cpu_ALL' style='height:58vh; width: inherit; overflow-y: auto;' " +
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
			  "<td align='center' class='w-50'>Accumulated msec.</td>" +
			  "<td align='center' class='w-50'>" +
			  "<div id='tms_context'>{{ value }}</div>" +
			  "</td>" +
			  " <tr>" +
			  "<td align='center' class='w-50'>Accumulated energy</td>" +
			  "<td align='center' class='w-50'>" +
			  "<div id='pwr_context'>{{ value }}</div>" +
			  "</td>" +
			  " </tr>" +
			  "</table>" +
			  "</div>" +
			  "</div>" ;
	      }

	      render_populate_as_card ( )
	      {
		   return "<div class='container container-fluid'>" +
			  "<div class='row justify-content-center'>" +

		          "<div class='col-auto p-2'>" +
			  "<div class='card bg-body-tertiary'>" +
                          " <h5 class='card-header text-center p-2'>" +
                          "<span data-langkey='Instructions'>Instructions</span><br>" +
                          " </h5>" +
			  " <div class='card-body  text-center p-2'>" +
                          " <p class='card-text'><div id='ins_context'>{{ value }}</div></p>" +
			  " </div>" +
			  "</div>" +
			  "</div>" +

		          "<div class='col-auto p-2'>" +
			  "<div class='card bg-body-tertiary'>" +
                          " <h5 class='card-header text-center p-2'>" +
                          "<span data-langkey='CLK ticks'>CLK ticks</span><br>" +
                          " </h5>" +
			  " <div class='card-body  text-center p-2'>" +
                          " <p class='card-text'><div id='clk_context'>{{ value }}</div></p>" +
			  " </div>" +
			  "</div>" +
			  "</div>" +

		          "<div class='col-auto p-2'>" +
			  "<div class='card bg-body-tertiary'>" +
                          " <h5 class='card-header text-center p-2'>" +
                          "<span data-langkey='Accumulated msec.'>Accumulated msec.</span><br>" +
                          " </h5>" +
			  " <div class='card-body  text-center p-2'>" +
                          " <p class='card-text'><div id='tms_context' class='text-truncate'>{{ value }}</div></p>" +
			  " </div>" +
			  "</div>" +
			  "</div>" +

		          "<div class='col-auto p-2'>" +
			  "<div class='card bg-body-tertiary'>" +
                          " <h5 class='card-header text-center p-2'>" +
                          "<span data-langkey='Accumulated energy'>Accumulated energy</span><br>" +
                          " </h5>" +
			  " <div class='card-body  text-center p-2'>" +
                          " <p class='card-text'><div id='pwr_context' class='text-truncate'>{{ value }}</div></p>" +
			  " </div>" +
			  "</div>" +
			  "</div>" +

			  "</div>" +
			  "</div>" ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-cpu', ws_cpu) ;
        }

