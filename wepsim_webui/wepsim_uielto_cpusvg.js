/*    
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  CPU device
         */

        /* jshint esversion: 6 */
        class ws_cpusvg extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
		    // html holder
		    var o1 = "<div class='container-fluid m-0 p-2'>" +
                             "<div class='row'>" +
                             "   <div class='col' id='eltos_cpu_a' style='padding:0 5 0 0;'>" +
                             "       <object id='svg_p'" +
                             "               title='processor'" +
                             "               data=''" +
                             "               type='image/svg+xml'" +
                             "               style='transform:translate3d(0,0,0);'>" +
                             "           Your browser doesn't support SVG" +
                             "       </object>" +
                             "   </div>" +
                             "   <div class='col' id='eltos_cpu_b' style='padding:0 5 0 5;'>" +
                             "       <object id='svg_cu'" +
                             "               title='control unit'" +
                             "               data=''" +
                             "               type='image/svg+xml'" +
                             "               style='transform:translate3d(0,0,0);'>" +
                             "           Your browser doesn't support SVG" +
                             "       </object>" +
                             "   </div>" +
                             "</div>" +
                             "</div>" ;

		    this.innerHTML = o1 ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-cpusvg', ws_cpusvg) ;
        }


        /*
         *  draw
         */

	function wepsim_svg_obj_draw ( obj_name, active, color_active, color_inactive, size_active, size_inactive )
        {
	   var r = obj_name.split(':') ;

	   var o = document.getElementById(r[0]) ;
           if (o === null) return;

	   o = o.contentDocument;
           if (o === null) return;

	   o = o.getElementById(r[1]);
           if (o === null) return;

           if (active)
           {
               o.style.setProperty("stroke",       color_active, "");
               o.style.setProperty("fill",         color_active, "");
               o.style.setProperty("stroke-width", size_active,  "");
           }
           else
           {
               if (o.style.getPropertyValue("stroke") === color_inactive)
                   return;

               o.style.setProperty("stroke",       color_inactive, "");
               o.style.setProperty("fill",         color_inactive, "");
               o.style.setProperty("stroke-width", size_inactive,  "");
           }
        }

        /*
         *  Drawing part
         */
        var DRAW_stop = false ;

	function wepsim_svg_start_drawing ( )
        {
            DRAW_stop = false ;
        }

	function wepsim_svg_stop_drawing ( )
        {
            DRAW_stop = true ;
        }

	function wepsim_svg_is_drawing ( )
        {
            return DRAW_stop ;
        }

	function wepsim_svg_update_draw ( obj, value )
        {
            if (true === DRAW_stop) {
                return ;
	    }

	    var i = 0 ;
	    var j = 0 ;
	    var k = 0 ;

	    var draw_it = get_cfg('is_byvalue'); // 'is_byvalue' belongs to the sim_cfg.js

            /* 1) Check if draw it */
	    if (typeof simhw_sim_state("REG_MICROINS").value[obj.name] != "undefined") {
		draw_it = true;
	    }

	    if ( (false === draw_it) && (typeof obj.depends_on != "undefined") )
	    {
		for (k=0; k<obj.depends_on.length; k++)
		{
		     var sname = obj.depends_on[k] ;
		     if (typeof simhw_sim_state("REG_MICROINS").value[sname] != "undefined") {
			     draw_it = true;
			     break;
		     }
		     else if ("CLK" === sname) {
                             // MRdy/IORdy/etc. (related hw. activated signals) relay on this trick.
                             // Otherwise are not shown because they are not user-set in the microinstruction,
                             // but they are set dynamically by hardware
			     draw_it = true;
			     break;
		     }
		}
	    }

            /* 2) Draw data segments... */
	    var cfg_color_data_active   = get_cfg('color_data_active') ;
	    var cfg_color_data_inactive = get_cfg('color_data_inactive') ;
	    var cfg_color_name_active   = get_cfg('color_name_active') ;
	    var cfg_color_name_inactive = get_cfg('color_name_inactive') ;
	    var cfg_size_active         = get_cfg('size_active') ;
	    var cfg_size_inactive       = get_cfg('size_inactive') ;

	    if (obj.draw_data.length > 1)
	    // (different draws)
	    {
		    for (i=0; i<obj.draw_data.length; i++)
		    for (j=0; j<obj.draw_data[i].length; j++) {
	                   wepsim_svg_obj_draw(obj.draw_data[i][j],
                                               (i===value) && draw_it,
                                               cfg_color_data_active,
                                               cfg_color_data_inactive,
                                               cfg_size_active,
                                               cfg_size_inactive) ;
		    }
	    }
	    else if (obj.nbits === 1)
	    // (same draw) && (nbits === 1)
	    {
		    for (j=0; j<obj.draw_data[0].length; j++) {
	                   wepsim_svg_obj_draw(obj.draw_data[0][j],
                                               (0!=value) && draw_it,
                                               cfg_color_data_active,
                                               cfg_color_data_inactive,
                                               cfg_size_active,
                                               cfg_size_inactive) ;
		    }
	    }
	    else if (obj.draw_data.length === 1)
	    // (same draw) && (nbits > 1)
	    {
		    for (j=0; j<obj.draw_data[0].length; j++) {
	                   wepsim_svg_obj_draw(obj.draw_data[0][j],
                                               draw_it,
                                               cfg_color_data_active,
                                               cfg_color_data_inactive,
                                               cfg_size_active,
                                               cfg_size_inactive) ;
		    }
	    }

            /* 3) Draw name segments... */
	    if (obj.draw_name.length > 1)
	    // (different draws)
	    {
		    for (i=0; i<obj.draw_name.length; i++)
		    for (j=0; j<obj.draw_name[i].length; j++) {
	                   wepsim_svg_obj_draw(obj.draw_name[i][j],
                                               (i===value) && draw_it,
                                               cfg_color_name_active,
                                               cfg_color_name_inactive,
                                               cfg_size_active,
                                               cfg_size_inactive) ;
		    }
	    }
	    else if (obj.nbits === 1)
	    // (same draw) && (nbits === 1)
	    {
		    for (j=0; j<obj.draw_name[0].length; j++) {
	                   wepsim_svg_obj_draw(obj.draw_name[0][j],
                                               (0!=value) && draw_it,
                                               cfg_color_name_active,
                                               cfg_color_name_inactive,
                                               cfg_size_active,
                                               cfg_size_inactive) ;
		    }
	    }
	    else if (obj.draw_name.length === 1)
	    // (same draw) && (nbits > 1)
	    {
		    for (j=0; j<obj.draw_name[0].length; j++) {
	                   wepsim_svg_obj_draw(obj.draw_name[0][j],
                                               draw_it,
                                               cfg_color_name_active,
                                               cfg_color_name_inactive,
                                               cfg_size_active,
                                               cfg_size_inactive) ;
		    }
	    }
	}

        function wepsim_svg_update_bus_visibility ( bus_name, value )
        {
            if (true === DRAW_stop) {
                return ;
	    }

	    var o = document.getElementById('svg_p') ;
	    if (o === null) return ;

	    o = o.contentDocument ;
	    if (o === null) return ;

	    o = o.getElementById(bus_name) ;
	    if (o === null) return ;

	    o.setAttributeNS(null, "visibility", value) ;
            o.style.visibility = value ;
        }

