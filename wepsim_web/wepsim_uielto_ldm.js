/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve, Javier Lopez Gomez
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


        var ledm_apirest_name     = "LEDM" ;
        var ledm_apirest_endpoint = { value: "" } ;
        var ledm_apirest_user     = "" ;
        var ledm_apirest_pass     = "" ;


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
		    simcore_rest_add(ledm_apirest_name,
				     { 'endpoint': ledm_apirest_endpoint,
				       'user':     ledm_apirest_user,
				       'pass':     ledm_apirest_pass }) ;

		    // html holder
		    o1  += "<div class='container text-end'>" +
                           "" +
                           '<span class="my-0" for="popover-ledmcfg" style="min-width:95%">' +
                           '<span data-langkey="quick config">quick config</span>: ' +
                           "<a data-bs-toggle='collapse' href='#collapse-ledmcfg' aria-expanded='false' " +
                           "   tabindex='0' class='m-auto' role='button' id='popover-ledmcfg'>" +
                           "<strong><strong class='fas fa-wrench text-secondary'></strong></strong></a>" +
                           "</span>" +
                           "" +
			   "<table id='collapse-ledmcfg' " +
                           "       class='table table-hover table-sm table-bordered m-0 collapse'>" +
			   "<tr><td>" +
                           "<label class='my-0 text-wrap' for='ledm_apirest_endpoint'>REST URL (e.g.: http://localhost:5000/matrix)</label>" +
			   "<input id='ledm_apirest_endpoint' type='text' v-model.lazy='value' class='form-control text-info p-0'>" +
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
                              "<span class='visually-hidden'>background-color {{value}}</span>" +
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

		    if (false == (ledm_apirest_endpoint.value instanceof Vuex.Store)) {
		        ledm_apirest_endpoint.value = vue_observable(ledm_apirest_endpoint.value) ;
		    }
		    vue_appyBinding(ledm_apirest_endpoint.value, '#ledm_apirest_endpoint', f_computed_value) ;
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

        function webui_ledm_value2color ( value )
        {
             var len   = 1 ;
             var color = "0x000000" ;

             var colors = simhw_internalState('ledm_colors') ;
             if (typeof colors != "undefined")
             {
                 len   = colors.length ;
                 color = colors[value % len] ;
             }

             return color ;
        }

