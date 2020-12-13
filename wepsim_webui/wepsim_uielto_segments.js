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
         *  Segments
         */

        /* jshint esversion: 6 */
        class ws_segments extends HTMLElement
        {
              // constructor
	      constructor ()
	      {
		    // parent
		    super();
	      }

              // render
	      render ( elto )
	      {
                    // set an empty list by default
                    this.innerHTML = this.render_skel(elto) ;

                    // set current list
		    var o = this.render_populate(elto) ;
                    if (o != '') {
		        $("#memory_segments").html(o) ;
                    }
	      }

	      connectedCallback ()
	      {
		    this.render(this) ;
	      }


              // render (helper)
	      render_skel ( elto )
	      {
                    var o1  = '' ;

                    // build HTML
		    o1 += "<div class='container text-right'>" + "</div>" +
		          "<div id='memory_segments' style='height:58vh; width:inherit;'></div>" ;

                    return o1 ;
	      }

	      render_populate ( elto )
	      {
                    var o1  = '' ;

                    // check if exists any example...
                    var segments = simhw_internalState('segments') ;
                    if (typeof segments === "undefined") {
                        return o1 ;
                    }

                    // build HTML code
                    o1 = uielto_segments2html(segments) ;

                    return o1 ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-segments', ws_segments) ;
        }


        /*
         *  obj2html
         */

        function uielto_segments2html ( segments )
        {
	   var o1 = "<br>" ;

	   o1 += " <center>" +
                 " <table height='400px'>" +
	         " <tr>" +
	         " <td>" +
	         "<table style='border-style: solid' border='1' width='100%' height='100%'>" ;
	   for (var skey in segments)
	   {
	        if (segments[skey].name != ".stack")
	   	    o1 += "<tr><td valign='middle' align='center' height='60px' bgcolor='" + segments[skey].color + "'>" +
                          segments[skey].name +
                          "</td></tr>" +
	   	          "<tr><td valign='middle' align='center' height='25px'>...</td></tr>" ;
	   }
	   o1 += "<tr><td valign='middle' align='center' bgcolor='" + segments['.stack'].color + "'>" +
                 segments['.stack'].name +
                 "</td></tr>" +
	         "</table>" +
	         " </td>" +
	         " <td width='20px'>&nbsp;</td>" +
	         " <td>" +
	         " <table style='border-style: solid; border-width:0px; width:100%; height:100%'>" ;

           var sx = "" ;
           var sp = "" ;
	   for (skey in segments)
	   {
	       sx = "<tr>" +
	   	    "    <td valign='top' align='left' height='30px' style=''>" +
	   	    "    <div id='compile_begin_" + segments[skey].name + "'>" + segments[skey].begin + "</div>" +
	   	    "    </td>" +
	   	    " </tr>" +
	   	    " <tr>" +
	   	    "    <td valign='bottom' align='left' height='30px' style=''>" +
	   	    "    <div id='compile_end_"   + segments[skey].name + "'>" + segments[skey].end + "</div>" +
	   	    "    </td>" +
	   	    " </tr>" ;

	       if (segments[skey].name != ".stack")
	   	    o1 += sx + "<tr><td valign='middle' align='center' height='25px'>...</td></tr>" ;
               else sp  = sx ;
	   }
	   o1 += sp +
	         " </table>" +
	         " </td>" +
	         " </tr>" +
	         " </table>" +
	         " </center>" ;

	   return o1 ;
        }

