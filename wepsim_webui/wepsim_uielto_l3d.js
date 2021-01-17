/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve, Javier Lopez Gomez
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
         *  L3D device
         */

        /* jshint esversion: 6 */


        var apirest_name     = "L3D" ;
        var apirest_endpoint = { value: "" } ;
        var apirest_user     = "" ;
        var apirest_pass     = "" ;


        class ws_l3d extends HTMLElement
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
                        return "<div id='config_L3D'></div>" ;
                    }

		    // default content
		    var l3d_states = simhw_internalState('l3d_state') ;
	            var l3d_dim    = simhw_internalState('l3d_dim') ;
		    if ( (typeof l3d_states == "undefined") || (typeof l3d_dim == "undefined") )
                    {
		        this.innerHTML = msg_default ;
			return ;
		    }

		    // API REST
		    simcore_rest_add(apirest_name,
				     { 'endpoint': apirest_endpoint,
				       'user':     apirest_user,
				       'pass':     apirest_pass }) ;

		    // html holder
		    var i = 0 ;
		    var offset = 0 ;

		    var o1  = "<div id='config_L3D' style='height:58vh; width:inherit; overflow-y:auto;'>" +
			      "<div class='container text-right'>" +
                              "" +
                              "<a data-toggle='collapse' href='#collapse-l3dcfg' aria-expanded='false' " +
                              "   tabindex='0' class='m-auto' role='button'>" +
                              "<strong><strong class='fas fa-wrench text-secondary'></strong></strong></a>" +
                              "" +
			      "<table id='collapse-l3dcfg' " +
                              " class='table table-hover table-sm table-bordered m-0 collapse'>" +
			      "<tr><td>" +
                              "<label class='my-0 text-wrap' for='apirest_endpoint'>REST URL (e.g.: http://localhost:5000/matrix)</label>" +
			      "<input id='apirest_endpoint' type='text' v-model.lazy='value' class='form-control text-info p-0'>" +
			      "</td></tr>" +
			      "</table>" +
                              "" +
			      "<div class='row mt-3'>" +
			      "<div class='col-12' style='perspective:1000px; perspective-origin: 50% 50%;'>" ;
		    for (i=0; i<l3d_states.length/(l3d_dim*l3d_dim); i++)
		    {
			o1 += "<table class='table table-hover table-sm table-bordered pb-3' style='transform: rotateX(20deg);'>" ;
			    for (var j=0; j<l3d_dim; j++)
			    {
			o1 += "<tr>" ;
				    for (var k=0; k<l3d_dim; k++)
				    {
			                 offset = i*Math.pow(l3d_dim, 2) + j*l3d_dim + k ;
			o1 += "<td align='center' id='l3d" + offset + "_context' class='py-0' " +
                              "    v-on:click='value = !value'>" +
			      "<i v-bind:class='[ value ? \"fas\" : \"far\", \"fa-lightbulb\" ]'></i>" +
			      "</td>" ;
				    }
			o1 += "</tr>" ;
			    }
			o1 += "</table>" ;
		    }
			o1 += "</div>" +
			      "</div>" +
			      "</div>" +
			      "</div>" ;

		    this.innerHTML = o1 ;

		    // vue binding
                    var f_computed_value = function(value) { 
                                               webui_l3d_set() ;
                                               return value ;
                                           } ;

		    for (i=0; i<l3d_states.length; i++)
		    {
			 if (false == (l3d_states[i].active instanceof Vuex.Store)) {
			     l3d_states[i].active = vue_observable(l3d_states[i].active) ;
			 }
                         vue_appyBinding(l3d_states[i].active, '#l3d'+i+'_context', f_computed_value) ;
		    }

		    if (false == (apirest_endpoint.value instanceof Vuex.Store)) {
		        apirest_endpoint.value = vue_observable(apirest_endpoint.value) ;
		    }
		    vue_appyBinding(apirest_endpoint.value, '#apirest_endpoint', f_computed_value) ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-l3d', ws_l3d) ;
        }


	function webui_l3d_set ( )
        {
            // get internal state
	    var l3d_states = simhw_internalState('l3d_state') ;
	    if (typeof l3d_states == "undefined") {
		return false ;
	    }

            compute_general_behavior('L3D_SYNC') ;
            return true ;
        }

