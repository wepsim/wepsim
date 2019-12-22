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

        function wepsim_init_l3d ( jqdiv )
        {
	    var i = 0 ;

            var curr_l3dstates = simhw_internalState('l3d_state') ;
	    if (typeof curr_l3dstates == "undefined") {
                return ;
	    }

	    // without ui...
            if (jqdiv == "")
            {
		    for (i=0; i<curr_l3dstates.length; i++) 
		    {
		         curr_l3dstates[i].active = ko_observable(curr_l3dstates[i].active) ;
                    }

                    return ;
            }

            // stats holder
            var o1 = "<div class='col-12'>" +
                     "<table class='table table-hover table-sm table-bordered'>" ;
            for (i=0; i<curr_l3dstates.length; i++)
            {
               o1 += "<tr id='l3d" + i + "_context'>" +
                     "<td align=center width=50%>" +
                     "<span data-bind=\"style: {fontWeight: active() ? 'bold' : ''}\">" + "Interrupt " + i + "</span>" +
                     "<input type='number' data-bind='value: active' min='0' max='1'>" +
                     "</td>" +
                     "</tr>" ;
            }
            o1 += "</table>" +
                  "</div>" ;
            $(jqdiv).html("<div class='row'>" + o1 + "</div>");

            // knockout binding
            for (i=0; i<curr_l3dstates.length; i++)
            {
                 if (typeof curr_l3dstates[i].active != "function")
                     curr_l3dstates[i].active = ko_observable(curr_l3dstates[i].active) ;
                 var ko_context = document.getElementById('l3d' + i + '_context');
                 ko.cleanNode(ko_context);
                 ko.applyBindings(curr_l3dstates[i], ko_context);
            }
        }

