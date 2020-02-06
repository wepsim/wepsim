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
         *  I/O device
         */

        class ws_io_info extends HTMLElement 
        {
	      constructor () 
	      {
		    // parent
		    super();

		    // object "io_ALL"
		    var msg_default = '<div class="bg-warning"><b>Not available in this hardware</b></div>' ;
		    this.innerHTML = msg_default ;
	      }

	      connectedCallback () 
	      {
		    var i = 0 ;

		    var curr_iointfactory = simhw_internalState('io_int_factory') ;
		    if (typeof curr_iointfactory == "undefined") {
			return ;
		    }

		    // stats holder
		    var o1 = "<div class='container'>" +
			     "<div class='row'>" +
			     "<div class='col-12'>" +
			     "<table class='table table-hover table-sm table-bordered'>" ;
		    for (i=0; i<curr_iointfactory.length; i++)
		    {
		       o1 += "<tr id='int" + i + "_context'>" +
			     "<td align=center width=50%>" +
			     "<span data-bind=\"style: {fontWeight: active() ? 'bold' : ''}\">" + "Interrupt " + i + "</span>" +
			     "</td>" +
			     "<td align=center width=50%>" +
			     "<span data-bind='text: accumulated'>&nbsp;</span>" +
			     "</td>" +
			     "</tr>" ;
		    }
		    o1 += "</table>" +
			  "</div>" +
			  "</div>" +
			  "</div>" ;

		    this.innerHTML = o1 ;

		    // knockout binding
		    for (i=0; i<curr_iointfactory.length; i++)
		    {
			 if (typeof curr_iointfactory[i].accumulated != "function")
			     curr_iointfactory[i].accumulated = ko.observable(curr_iointfactory[i].accumulated) ;
			 if (typeof curr_iointfactory[i].active != "function")
			     curr_iointfactory[i].active      = ko.observable(curr_iointfactory[i].active) ;
			 var ko_context = document.getElementById('int' + i + '_context');
			 ko.cleanNode(ko_context);
			 ko.applyBindings(curr_iointfactory[i], ko_context);
		    }
	      }
        }

        window.customElements.define('ws-io-info', ws_io_info);

