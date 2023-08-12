/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
        class ws_cpusvg extends ws_uielto
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

              // render
	      render ( event_name )
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

           // get initial stroke-width and backup if needed
           var w = o.getAttribute('stroke-width');
           if (w == null) {
               w = 0.70 ;
           }

           var wb = o.getAttribute('backup-stroke-width');
           if (wb == null) {
               wb = parseFloat(w);
               o.setAttribute('backup-stroke-width', wb);
           }

           if (active)
           {
               o.style.setProperty("stroke",       color_active,     "");
               o.style.setProperty("fill",         color_active,     "");
               o.style.setProperty("stroke-width", wb * size_active, "");
           }
           else
           {
               if (o.style.getPropertyValue("stroke") === color_inactive) return;

               o.style.setProperty("stroke",       color_inactive,     "");
               o.style.setProperty("fill",         color_inactive,     "");
               o.style.setProperty("stroke-width", wb * size_inactive, "");
           }
        }


        /*
         *  Drawing part
         */

        var DRAW_stop    = false ;
        var is_dark_mode = false ;

        var cfg_color_background    = 'white' ;
        var cfg_color_data_active   = '#0066FF' ;
        var cfg_color_name_active   = '#FF0000' ;
        var cfg_color_data_inactive = '#000000' ;
        var cfg_color_name_inactive = '#000000' ;
        var cfg_size_active         = 3.0 ;
        var cfg_size_inactive       = 1.0 ;

	function wepsim_svg_update_drawing ( )
        {
            // 1) from configuration
	    cfg_color_data_active   = get_cfg('color_data_active') ;
	    cfg_color_name_active   = get_cfg('color_name_active') ;
	    cfg_color_data_inactive = get_cfg('color_data_inactive') ;
	    cfg_color_name_inactive = get_cfg('color_name_inactive') ;
	    cfg_size_active         = get_cfg('size_active') ;
	    cfg_size_inactive       = get_cfg('size_inactive') ;

            // 2) modify because dark-mode
            is_dark_mode = get_cfg("ws_skin_dark_mode") ;

            if (false == is_dark_mode) {
                cfg_color_background    = 'white' ;
	        cfg_color_data_inactive = '#000000' ;
	        cfg_color_name_inactive = '#000000' ;
            }
            else {
                cfg_color_background    = 'black' ;
	        cfg_color_data_inactive = '#FFFFFF' ;
	        cfg_color_name_inactive = '#FFFFFF' ;
            }
        }

	function wepsim_svg_start_drawing ( )
        {
            DRAW_stop = false ;

	    wepsim_svg_update_drawing() ;
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
	    if (obj.draw_data.length > 1)
	    // (different draws)
	    {
	        // no active...
		for (i=0; i<obj.draw_data.length; i++)
	        {
                    if (i===value) continue;

		    for (j=0; j<obj.draw_data[i].length; j++) {
	                   wepsim_svg_obj_draw(obj.draw_data[i][j],
                                               false,
                                               cfg_color_data_active,
                                               cfg_color_data_inactive,
                                               cfg_size_active,
                                               cfg_size_inactive) ;
		    }
		}

	        // active one...
	        if (typeof obj.draw_data[value] != "undefined")
	        {
		    for (j=0; j<obj.draw_data[value].length; j++) {
	                   wepsim_svg_obj_draw(obj.draw_data[value][j],
                                               draw_it,
                                               cfg_color_data_active,
                                               cfg_color_data_inactive,
                                               cfg_size_active,
                                               cfg_size_inactive) ;
		    }
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
	        // no active...
		for (i=0; i<obj.draw_name.length; i++)
	        {
                    if (i===value) continue;

		    for (j=0; j<obj.draw_name[i].length; j++) {
	                   wepsim_svg_obj_draw(obj.draw_name[i][j],
                                               false,
                                               cfg_color_name_active,
                                               cfg_color_name_inactive,
                                               cfg_size_active,
                                               cfg_size_inactive) ;
		    }
		}

	        // active one...
	        if (typeof obj.draw_name[value] != "undefined")
	        {
		    for (j=0; j<obj.draw_name[value].length; j++) {
	                   wepsim_svg_obj_draw(obj.draw_name[value][j],
                                               draw_it,
                                               cfg_color_name_active,
                                               cfg_color_name_inactive,
                                               cfg_size_active,
                                               cfg_size_inactive) ;
		    }
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

	function wepsim_svg_apply_darkmode ( svg_id )
        {
	    var svg_o = document.getElementById(svg_id);
            if (null == svg_o) return ;

	    var svg   = svg_o.contentDocument;
            if (null == svg)   return ;

	    var svg2 = svg.querySelector('svg') ;
            if (null == svg2)  return ;

            // 1) background
	    svg2.setAttribute('style', 'background-color:' + cfg_color_background);

            // 2) path
            var def_color = null ;
	    var elements  = svg.querySelectorAll("path") ;
	    for (var i = 0; i < elements.length; i++)
            {
                 def_color = elements[i].getAttribute('wepsim:color') ;
                 if (def_color != null)
                 {
	             elements[i].style.fill   = def_color ;
	             elements[i].style.stroke = def_color ;
                  // elements[i].setAttribute('fill',   def_color) ;
                  // elements[i].setAttribute('stroke', def_color) ;

                     continue ;
                 }

	         elements[i].style.fill   = cfg_color_data_inactive ;
	         elements[i].style.stroke = cfg_color_data_inactive ;
             //  elements[i].setAttribute('fill',   cfg_color_data_inactive) ;
             //  elements[i].setAttribute('stroke', cfg_color_data_inactive) ;
	    }

            // 3) text
	    elements = svg.querySelectorAll("text") ;
	    for (var i = 0; i < elements.length; i++) {
	         elements[i].style.fill = cfg_color_data_inactive ;
	    }
        }

        function wepsim_svg_refresh ( id_arr )
        {
            var o = null ;

            // set darkmode
	    wepsim_svg_update_drawing() ;

            // refresh svg (just in case)
            for (var i in id_arr)
            {
                     o = document.getElementById(id_arr[i]) ;
                 if (o === null) continue ;

		 wepsim_svg_apply_darkmode(id_arr[i]) ;
            }
        }

		function eventhandler_load_svg_set_darkmode ( obj )
		{
			  var obj_target = obj.target ;
			  wepsim_svg_apply_darkmode(obj.currentTarget.id) ;

                          // trick because safari fires load event again if setProperty set display to block :-(
			  if (false == obj_target.img_first) {
			      return ;
			  }
			  obj_target.img_first = false ;

			  obj_target.style.setProperty("visibility", "visible") ;
			  obj_target.style.setProperty("display",    "none") ;
			  if ('' != obj_target.img_data) {
			      setTimeout(function(){ obj_target.style.setProperty("display", "block"); }, 25);
			  }
		}

        function wepsim_svg_reload ( id_arr, img_arr )
        {
            var o = null ;
            var d = "" ;

            // update default drawing
	    wepsim_svg_update_drawing() ;
            wsweb_set_cpucu_size(get_cfg('CPUCU_size')) ;

            // reload svg (just in case)
            for (var i in id_arr)
            {
                 // skip empty image
                 if (null == img_arr[i]) {
                      continue ;
                 }

                 // skip invalid id value
                 o = document.getElementById(id_arr[i]) ;
                 if (o === null) {
                     continue ;
                 }

                 // hide empty image
                 d = '' ;
		 if ('' != img_arr[i]) {
                     d = img_arr[i] + '?now=' + Date.now() ;
		 }
		 else {
		     // wsweb_set_cpucu_size(14) without remembering 14...
                     $('#slider2b').val(14) ;
                     set_ab_size('#eltos_cpu_a', '#eltos_cpu_b', 14) ;
		 }

                 // set dark-mode after load
		 o.style.setProperty("visibility", "hidden") ;
    		 o.style.setProperty("display",    "block") ;
                 o.img_data  = img_arr[i].trim() ;
                 o.img_first = true ;
	         o.addEventListener("load", eventhandler_load_svg_set_darkmode, false) ;

                 // load image
                 o.setAttribute('data', d) ;
            }
        }

