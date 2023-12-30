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
         * Memory (configuration)
         */

        /* jshint esversion: 6 */
        class ws_mem_config extends ws_uielto
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
                    this.innerHTML = '<div id="' + 'config_MP_' + this.name_str + '" ' +
                                     'style="height:58vh; width:inherit; overflow-y:auto;"></div>' ;
              }

	      render_populate ( )
	      {
                    var o1 = '' ;
                    var div_hash  = '#config_MP_' + this.name_str ;
                    var input_div =      'mp_wc_' + this.name_str ;

		    // if no active hardware -> empty
		    if (simhw_active() === null) {
                        $(div_hash).html(o1) ;
			return ;
		    }

		    // html holder
                    if (this.layout == "card")
	                 o1 += this.render_populate_as_card(input_div) ;
		    else o1 += this.render_populate_as_table(input_div) ;

                    $(div_hash).html(o1) ;

		    // vue binding
		    var curr_mp_wc = { value: vue_observable(0) } ;
		    simhw_internalState_reset('MP_wc', curr_mp_wc) ;
		    vue_appyBinding(curr_mp_wc.value,
				    '#' + input_div,
				    function(value){ return value; }) ;
	      }

	      render_populate_as_table ( input_div )
	      {
		   return "<div class='container container-fluid'>" +
			  "<div class='row'>" +
		          "<div class='col p-2'>" +
			  "<table class='table table-hover table-sm table-bordered m-0'>" +
			  "<tbody>" +
			  "<tr><td align=center'>Wait cycles (<u>0</u> - &infin;)</td>" +
			  "    <td align=center'>" +
			  "<div id='" + input_div + "'>" +
			  "<input type=number v-model.lazy='value' " +
                          "       name='input_mem_wait' " +
                          "       min='0' max='99999999'>" +
			  "</div>" +
			  "    </td></tr>" +
			  "</tbody>" +
			  "</table>" +
			  "</div>" +
			  "</div>" +
			  "</div>" ;
              }

	      render_populate_as_card ( input_div )
	      {
		   return "<div class='container container-fluid'>" +
			  "<div class='row justify-content-center'>" +
		          "<div class='col-auto p-2 m-2'>" +
			  "<div class='card bg-body-tertiary'>" +
                          " <h5 class='card-header text-center'>" +
                          "<span data-langkey='Wait cycles'>Wait cycles</span><br>" +
                          " </h5>" +
			  " <div class='card-body'>" +
                          " <p class='card-text'>" +
			  "<div id='" + input_div + "'>" +
			  "<input type=number v-model.lazy='value' min='0' max='99999999'>" +
			  " </div>" +
                          " </p>" +
			  " </div>" +
			  " <div class='card-footer text-center m-2 p-0'>[<u>0</u> - &infin;)</div>" +
			  "</div>" +
			  "</div>" +
			  "</div>" +
			  "</div>" ;
              }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-mem-config', ws_mem_config) ;
        }

