/*    
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


	// TODO: add apirest_enpoint,user,pass to wepsim configuration
        // TODO: simcore_rest_add has to register object with apirest_endpoint (not only value)
        var apirest_name     = "L3D" ;
        var apirest_endpoint = "http://localhost:5000/led/api1/" ;
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
		    var curr_l3dstates = simhw_internalState('l3d_state') ;
		    if (typeof curr_l3dstates == "undefined") 
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

		    var o1  = "<div id='config_L3D' style='height:58vh; width:inherit; overflow-y:auto;'>" +
			      "<div class='container'>" +
			      "<div class='row'>" +
			      "<div class='col-12'>" ;
		    for (i=0; i<curr_l3dstates.length/9; i++)
		    {
			o1 += "<table class='table table-hover table-sm table-bordered pb-3'>" ;
			    for (var j=0; j<3; j++)
			    {
			o1 += "<tr>" ;
				    for (var k=0; k<3; k++)
				    {
			o1 += "<td align=center id='l3d" + (i*9+j*3+k) + "_context' " +
				      "    data-bind=\"style: { fontWeight: active() ? 'bold' : '' }, " +
				      "                event: { click: function(){ active(!active()); simcore_rest_call('L3D','GET','/set',{'id': " + (i*9+j*3+k) + "}); } }\">&Pi;</td>" ;
				    }
			o1 += "</tr>" ;
			    }
			o1 += "</table>" ;
		    }
			o1 += "</div>" +
			      "</div>" +
			      "<table class='table table-hover table-sm table-bordered m-0'>" +
			      "<tr><td>" +
			      "<input id='apirest_endpoint' type='text' data-bind='value: apirest_endpoint' class='form-control text-info p-0'>" +
			      "</td></tr>" +
			      "</table>" +
			      "</div>" +
			      "</div>" ;

		    this.innerHTML = o1 ;

		    // knockout binding
		    for (i=0; i<curr_l3dstates.length; i++)
		    {
			 if (typeof curr_l3dstates[i].active != "function")
			     curr_l3dstates[i].active = ko_observable(curr_l3dstates[i].active) ;
			 ko_context = document.getElementById('l3d' + i + '_context');
			 ko.cleanNode(ko_context);
			 ko.applyBindings(curr_l3dstates[i], ko_context);
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

        if (typeof window !== "undefined")
            window.customElements.define('ws-l3d', ws_l3d) ;

