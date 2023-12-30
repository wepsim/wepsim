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
         *  I/O device (config)
         */

        /* jshint esversion: 6 */
        class ws_io_config extends ws_uielto
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
                    this.innerHTML = '<div id="' + 'config_IO_' + this.name_str + '" ' +
                                     'style="height:58vh; width:inherit; overflow-y:auto;"></div>' ;
              }

	      render_populate ( )
	      {
		    var  i = 0 ;
                    var o1 = '' ;
                    var div_hash = '#config_IO_' + this.name_str ;

                    // if no active hardware -> empty
                    if (simhw_active() === null) {
                        $(div_hash).html(o1) ;
			return ;
                    }

		    // default content
		    var curr_iointfactory = simhw_internalState('io_int_factory') ;
		    if (typeof curr_iointfactory == "undefined") {
                        $(div_hash).html(o1) ;
			return ;
		    }

		    // html holder
		    o1 += "<div class='container-fluid'>" +
			  "<div class='row'>" +
		          "<div class='col-12 p-0'>" +
			  "<div class='card bg-body-tertiary m-0'>" +
			  "<div class='card-body p-0' id='iopanel'>" +
		          "<center>" +
			  "<table class='table table-hover table-sm table-bordered m-0'>" +
			  "<thead class='thead-light'>" +
			  "<tr>" +
			  "<th style='width:33%' class='text-center'>" +
			    "<span class='d-none d-sm-inline-flex text-wrap'>" +
                            "<span data-langkey='Interrupt identificator'>Interrupt identificator</span>" +
                            "</span>" +
			    "<span class='d-sm-none text-wrap'>Int. Id.<br>(0 - 7)</span>" +
			  "</th>" +
			  "<th style='width:33%' class='text-center'>" +
			    "<span class='d-none d-sm-inline-flex text-wrap'>" +
                            "<span data-langkey='CLK period'>CLK period</span>" + " (0 - &infin;)" +
                            "</span>" +
			    "<span class='d-sm-none text-wrap'>CLK ticks <br>(0 - &infin;)</span>" +
			  "</th>" +
			  "<th style='width:33%' class='text-center'>" +
			    "<span class='d-none d-sm-inline-flex text-wrap'>" +
                            "<span data-langkey='Probability'>Probability</span>" + " (0 - 1)" +
                            "</span>" +
			    "<span class='d-sm-none text-wrap'>Probability <br>(0 - 1)</span>" +
			  "</th>" +
			  "</tr>" +
			  "</thead>" +
			  "<tbody>" ;
		    for (i=0; i<curr_iointfactory.length; i++)
		    {
		    o1 += "<tr>" +
			  "<td align='center' class='p-0' style='vertical-align: middle !important'>" +
			  "<span class='p-0 m-0'>" + i + "</span>" +
			  "</td>" +
			  "<td align='center' class='p-0'>" +
			  "<div id='int" + i + "_per' class='m-0'>" +
			  "<input type='number' v-model.lazy='value' " +
                          "       name='input_io_per_" + i + "' " +
                          "       min='0' max='99999999' class='form-control p-0 m-0'>" +
			  "</div>" +
			  "</td>" +
			  "<td align='center' class='p-0'>" +
			  "<div id='int" + i + "_pro' class='m-0'>" +
			  "<input type='number' v-model.lazy='value' " +
                          "       name='input_io_pro_" + i + "' " +
                          "       min='0' max='1' step='.05' class='form-control p-0 m-0'>" +
			  "</div>" +
			  "</td>" +
			  "</tr>" ;
		    }
		    o1 += "</tbody>" +
			  "</table>" +
			  "</center>" +
		          "</div>" +
			  "</div>" +
			  "</div>" ;

                    $(div_hash).html(o1) ;

		    // vue binding
		    for (i=0; i<curr_iointfactory.length; i++)
		    {
                         // period
			 if (false == (curr_iointfactory[i].period instanceof Vuex.Store)) {
			     curr_iointfactory[i].period = vue_observable(curr_iointfactory[i].period) ;
			 }
                         vue_appyBinding(curr_iointfactory[i].period,
                                         '#int'+i+'_per',
                                         function(value){ return value; }) ;
	
                         // probability
			 if (false == (curr_iointfactory[i].probability instanceof Vuex.Store)) {
			     curr_iointfactory[i].probability = vue_observable(curr_iointfactory[i].probability) ;
			 }
                         vue_appyBinding(curr_iointfactory[i].probability,
                                         '#int'+i+'_pro',
                                         function(value){ return value; }) ;
		    }
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-io-config', ws_io_config) ;
        }

