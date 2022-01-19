/*
 *  Copyright 2015-2022 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve, Javier Lopez Gomez
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
         *  LEDM device
         */

        /* jshint esversion: 6 */


        var apirest_name     = "LEDM" ;
        var apirest_endpoint = { value: "" } ;
        var apirest_user     = "" ;
        var apirest_pass     = "" ;


        class ws_ledm extends ws_uielto
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
                    this.innerHTML = '<div id="' + 'config_LEDM_' + this.name_str + '" ' +
                                     'style="height:58vh; width:inherit; overflow-y:auto;"></div>' ;
              }

	      render_populate ( )
	      {
                    var o1 = '' ;
                    var div_hash = '#config_LEDM_' + this.name_str ;
		    var offset = 0 ;
		    var i = 0 ;

                    // if no active hardware -> empty
                    if (simhw_active() === null) {
                        $(div_hash).html(o1) ;
                        return ;
                    }

		    // default content
		    var ledm_states = simhw_internalState('ledm_state') ;
	            var ledm_dim    = simhw_internalState('ledm_dim') ;
		    if ( (typeof ledm_states == "undefined") || (typeof ledm_dim == "undefined") )
                    {
                        $(div_hash).html(o1) ;
			return ;
		    }

		    // API REST
		    simcore_rest_add(apirest_name,
				     { 'endpoint': apirest_endpoint,
				       'user':     apirest_user,
				       'pass':     apirest_pass }) ;

		    // html holder
		    o1  += "<div class='container text-right'>" +
                           "" +
                           '<label class="my-0" for="popover-ledmcfg" style="min-width:95%">' +
                           '<span data-langkey="quick config">quick config</span>: ' +
                           "<a data-toggle='collapse' href='#collapse-ledmcfg' aria-expanded='false' " +
                           "   tabindex='0' class='m-auto' role='button' id='popover-ledmcfg'>" +
                           "<strong><strong class='fas fa-wrench text-secondary'></strong></strong></a>" +
                           "</label>" +
                           "" +
			   "<table id='collapse-ledmcfg' " +
                           "       class='table table-hover table-sm table-bordered m-0 collapse'>" +
			   "<tr><td>" +
                           "<label class='my-0 text-wrap' for='apirest_endpoint'>REST URL (e.g.: http://localhost:5000/matrix)</label>" +
			   "<input id='apirest_endpoint' type='text' v-model.lazy='value' class='form-control text-info p-0'>" +
			   "</td></tr>" +
			   "</table>" +
                           "" +
			   "<div class='row mt-3 justify-content-center'>" +
			   "<div class='col-auto' style=''>" ;

			o1 += "<table class='table table-hover table-sm table-bordered pb-3'>" ;
			    for (var j=0; j<ledm_dim; j++)
			    {
			o1 += "<tr>" ;
				    for (var k=0; k<ledm_dim; k++)
				    {
			o1 += "<td align='center' class='m-0' " +
                              "    id='ledm" + (j*ledm_dim + k) + "_context' " +
                              "    v-bind:style='{ \"background-color\": webui_ledm_value2color(value), height: \"15px\", width: \"15px\"}' " +
                              "    v-on:click='value = (value + 1) % 256'>" +
                              "<span class='sr-only'>background-color {{value}}</span>" +
                              "</td>" ;
				    }
			o1 += "</tr>" ;
			    }
			o1 += "</table>" ;

		     o1 += "</div>" +
			   "</div>" +
			   "</div>" ;

                    $(div_hash).html(o1) ;

		    // vue binding
                    var f_computed_value = function(value) {
                                               webui_ledm_set() ;
                                               return value ;
                                           } ;

		    for (i=0; i<ledm_states.length; i++)
		    {
			 if (false == (ledm_states[i].color instanceof Vuex.Store)) {
			     ledm_states[i].color = vue_observable(ledm_states[i].color) ;
			 }
                         vue_appyBinding(ledm_states[i].color, '#ledm'+i+'_context', f_computed_value) ;
		    }

		    if (false == (apirest_endpoint.value instanceof Vuex.Store)) {
		        apirest_endpoint.value = vue_observable(apirest_endpoint.value) ;
		    }
		    vue_appyBinding(apirest_endpoint.value, '#apirest_endpoint', f_computed_value) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-ledm', ws_ledm) ;
        }


	function webui_ledm_set ( )
        {
            // get internal state
	    var ledm_states = simhw_internalState('ledm_state') ;
	    if (typeof ledm_states == "undefined") {
		return false ;
	    }

            compute_general_behavior('LEDM_SYNC') ;
            return true ;
        }

        color16 = [ "black",  "white",  "red",    "lime",
                    "blue",   "yellow", "cyan",   "magneta",
                    "silver", "gray",   "maroon", "olive",
                    "green",  "purple", "teal",   "navy" ] ;

        function webui_ledm_value2color ( value )
        {
             return color16[value % 16] ;
        }

/*
        function webui_ledm_value2color ( value )
        {
             return color16[value % 16] ;
             var h1 = ((value >> 5) & 0x7) * (256/8) ;
             var h2 = ((value >> 2) & 0x7) * (256/8) ;
             var h3 = ((value >> 0) & 0x3) * (256/4) ;

             return 'rgb(' + h1 + "," + h2 + "," + h3 + ")" ;
        }
*/


