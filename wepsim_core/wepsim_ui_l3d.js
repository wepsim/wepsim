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
            var o1 = "<div class='col-12'>" ;
            for (i=0; i<curr_l3dstates.length/9; i++)
            {
		o1 += "<table class='table table-hover table-sm table-bordered'>" ;
		    for (j=0; j<3; j++)
		    {
		o1 += "<tr>" ;
			    for (k=0; k<3; k++)
			    {
		o1 += "<td align=center id='l3d" + (i*9+j*3+k) + "_context' " +
			      "    data-bind=\"style: { fontWeight: active() ? 'bold' : '' }, " + 
			      "                event: { click: function(){active(!active())} }\">X</td>" ;
			    }
		o1 += "</tr>" ;
		    }
		o1 += "</table>" ;
            }
                o1 += "</div>" ;

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

