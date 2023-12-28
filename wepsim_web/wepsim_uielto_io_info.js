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
         *  I/O device (information)
         */

        /* jshint esversion: 6 */
        class ws_io_info extends ws_uielto
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
                    this.innerHTML = '<div id="' + 'stats_IO_' + this.name_str + '" ' +
                                     'style="height:58vh; width:inherit; overflow-y:auto;"></div>' ;
              }

	      render_populate ( )
	      {
		    var  i = 0 ;
                    var o1 = '' ;
                    var div_hash = '#stats_IO_' + this.name_str ;

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

		    // stats holder
		    o1 += "<div class='container container-fluid'>" +
			  "<div class='row'>" +
			  "<div class='col-12'>" +
			  "<table class='table table-hover table-sm table-bordered'>" +
			  "<thead class='thead-light'>" +
			  "<tr>" +
			  "<th class='w-50 text-center'>" +
			    "<span class='d-none d-sm-inline-flex text-wrap'>" +
                            "<span data-langkey='Interrupt identificator'>Interrupt identificator</span>" +
                            "</span>" +
			    "<span class='d-sm-none text-wrap'>Int. Id.<br>(0 - 7)</span>" +
			  "</th>" +
			  "<th class='w-50 text-center'>" +
			    "<span class='d-none d-sm-inline-flex text-wrap'>" +
                            "<span data-langkey='Number of interruptions'>Number of interruptions</span>" +
                            "</span>" +
			    "<span class='d-sm-none text-wrap'># Int.<br>(0 - &infin;)</span>" +
			  "</th>" +
			  "</tr>" +
			  "</thead>" +
			  "<tbody>" ;
		    for (i=0; i<curr_iointfactory.length; i++)
		    {
		    o1 += "<tr>" +
			  "<td id='int" + i + "_act' align=center width=50%>" +
			  "<span v-bind:class='[ value ? \"fw-bold\" : \"\" ]'>" + i + "</span>" +
			  "</td>" +
			  "<td id='int" + i + "_acc' align=center width=50%>" + "<span>{{ value }}</span>" +
			  "</td>" +
			  "</tr>" ;
		    }
		    o1 += "</tbody>" +
			  "</table>" +
			  "</div>" +
			  "</div>" +
			  "</div>" ;

                    $(div_hash).html(o1) ;

		    // vue binding
		    for (i=0; i<curr_iointfactory.length; i++)
		    {
			 if (false == (curr_iointfactory[i].accumulated instanceof Vuex.Store)) {
			     curr_iointfactory[i].accumulated = vue_observable(curr_iointfactory[i].accumulated) ;
			 }
                         vue_appyBinding(curr_iointfactory[i].accumulated,
                                         '#int'+i+'_acc',
                                         function(value){ return value; }) ;

			 if (false == (curr_iointfactory[i].active instanceof Vuex.Store)) {
			     curr_iointfactory[i].active = vue_observable(curr_iointfactory[i].active) ;
			 }
                         vue_appyBinding(curr_iointfactory[i].active,
                                         '#int'+i+'_act',
                                         function(value){ return value; }) ;
		    }
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-io-info', ws_io_info) ;
        }

