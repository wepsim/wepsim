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
        var apirest_endpoint = "" ;
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
		    var ko_context = null ;
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
			      "<input id='apirest_endpoint' type='text' data-bind='value: apirest_endpoint' class='form-control text-info p-0'>" +
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
			      " data-bind=\"event: { click: function(){active(!active());webui_l3d_set();}}\">" +
			      "<i class='fa-lightbulb' data-bind=\"css: active() ? 'fas' : 'far'\"></i>" +
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

		    // knockout binding
		    for (i=0; i<l3d_states.length; i++)
		    {
			 if (typeof l3d_states[i].active != "function")
			     l3d_states[i].active = ko_observable(l3d_states[i].active) ;
			 ko_context = document.getElementById('l3d' + i + '_context');
			 ko.cleanNode(ko_context);
			 ko.applyBindings(l3d_states[i], ko_context);
		    }

		    if (typeof apirest_endpoint != "function")
			apirest_endpoint = ko_observable(apirest_endpoint) ;
		    ko_context = document.getElementById('apirest_endpoint');
		    ko.cleanNode(ko_context);
		    ko.applyBindings(apirest_endpoint, ko_context);
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

