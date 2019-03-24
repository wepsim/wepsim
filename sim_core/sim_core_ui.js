/*     
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  draw
         */

	function obj_draw ( obj_name, active, color_active, color_inactive, size_active, size_inactive )
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

	function start_drawing ( )
        {
            DRAW_stop = false ;
        }

	function stop_drawing ( )
        {
            DRAW_stop = true ;
        }

	function is_drawing ( )
        {
            return DRAW_stop ;
        }

	function update_draw ( obj, value )
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
		    for (i=0; i<obj.draw_data.length; i++)
		    for (j=0; j<obj.draw_data[i].length; j++) {
	                   obj_draw(obj.draw_data[i][j],
                                    (i===value) && draw_it,
                                    get_cfg('color_data_active'),
                                    get_cfg('color_data_inactive'),
                                    get_cfg('size_active'),
                                    get_cfg('size_inactive'));
		    }
	    }
	    else if (obj.nbits === 1)
	    // (same draw) && (nbits === 1)
	    {
		    for (j=0; j<obj.draw_data[0].length; j++) {
	                   obj_draw(obj.draw_data[0][j],
                                    (0!=value) && draw_it,
                                    get_cfg('color_data_active'),
                                    get_cfg('color_data_inactive'),
                                    get_cfg('size_active'),
                                    get_cfg('size_inactive'));
		    }
	    }
	    else if (obj.draw_data.length === 1)
	    // (same draw) && (nbits > 1)
	    {
		    for (j=0; j<obj.draw_data[0].length; j++) {
	                   obj_draw(obj.draw_data[0][j],
                                    draw_it,
                                    get_cfg('color_data_active'),
                                    get_cfg('color_data_inactive'),
                                    get_cfg('size_active'),
                                    get_cfg('size_inactive'));
		    }
	    }

            /* 3) Draw name segments... */
	    if (obj.draw_name.length > 1)
	    // (different draws)
	    {
		    for (i=0; i<obj.draw_name.length; i++)
		    for (j=0; j<obj.draw_name[i].length; j++) {
	                   obj_draw(obj.draw_name[i][j],
                                    (i===value) && draw_it,
                                    get_cfg('color_name_active'),
                                    get_cfg('color_name_inactive'),
                                    get_cfg('size_active'),
                                    get_cfg('size_inactive'));
		    }
	    }
	    else if (obj.nbits === 1)
	    // (same draw) && (nbits === 1)
	    {
		    for (j=0; j<obj.draw_name[0].length; j++) {
	                   obj_draw(obj.draw_name[0][j],
                                    (0!=value) && draw_it,
                                    get_cfg('color_name_active'),
                                    get_cfg('color_name_inactive'),
                                    get_cfg('size_active'),
                                    get_cfg('size_inactive'));
		    }
	    }
	    else if (obj.draw_name.length === 1)
	    // (same draw) && (nbits > 1)
	    {
		    for (j=0; j<obj.draw_name[0].length; j++) {
	                   obj_draw(obj.draw_name[0][j],
                                    draw_it,
                                    get_cfg('color_name_active'),
                                    get_cfg('color_name_inactive'),
                                    get_cfg('size_active'),
                                    get_cfg('size_inactive'));
		    }
	    }
	}

        function refresh()
        {
	    for (var key in simhw_sim_signals()) 
	    {
		 update_draw(simhw_sim_signals()[key], simhw_sim_signals()[key].value) ;
                 check_buses(key);
	    }

	    show_dbg_ir(get_value(simhw_sim_state('REG_IR_DECO'))) ;
        }


        /*
         *
         */

        function hex2float ( hexvalue )
        {
		var sign     = (hexvalue & 0x80000000) ? -1 : 1;
		var exponent = ((hexvalue >> 23) & 0xff) - 127;
		var mantissa = 1 + ((hexvalue & 0x7fffff) / 0x800000);

		var valuef = sign * mantissa * Math.pow(2, exponent);
		if (-127 === exponent)
		    if (1 === mantissa)
			 valuef = (sign === 1) ? "+0" : "-0" ;
		    else valuef = sign * ((hexvalue & 0x7fffff) / 0x7fffff) * Math.pow(2, -126) ;
		if (128 === exponent)
		    if (1 === mantissa)
			 valuef = (sign === 1) ? "+Inf" : "-Inf" ;
		    else valuef = "NaN" ;

		return valuef ;
        }

        function hex2char8 ( hexvalue )
        {
                var valuec = [] ;

		valuec[0] = String.fromCharCode((hexvalue & 0xFF000000) >> 24) ;
		valuec[1] = String.fromCharCode((hexvalue & 0x00FF0000) >> 16) ;
		valuec[2] = String.fromCharCode((hexvalue & 0x0000FF00) >>  8) ;
		valuec[3] = String.fromCharCode((hexvalue & 0x000000FF) >>  0) ;

                return valuec ;
        }

        function pack5 ( val )
        {
            return "00000".substring(0, 5 - val.length) + val ;
        }

        function pack8 ( val )
        {
            return "00000000".substring(0, 8 - val.length) + val ;
        }

        function pack32 ( val )
        {
            return "00000000000000000000000000000000".substring(0, 32 - val.length) + val;
        }

        function hex2bin   ( hexvalue )
        {
                var valuebin = hexvalue.toString(2) ;

                valuebin = pack32(valuebin) ;
                valuebin = valuebin.substring(0,4)   + " " + valuebin.substring(4,8)   + " " +
                           valuebin.substring(8,12)  + " " + valuebin.substring(12,16) + "<br>" +
                           valuebin.substring(16,20) + " " + valuebin.substring(20,24) + " " +
                           valuebin.substring(24,28) + " " + valuebin.substring(28,32) ;

                return valuebin ;
        }


        /*
         *
         */

        function init_cpu ( jqdiv )
        {
	    // without ui
            if (jqdiv === "")
            {       
		simhw_sim_state('CLK').value      = ko_observable(simhw_sim_state('CLK').value);
		simhw_sim_state('DECO_INS').value = ko_observable(simhw_sim_state('DECO_INS').value);

                return ;
            }

            // stats holder
            var o1 = "<div class='col-12'>" +
                     "<table class='table table-hover table-sm table-bordered'>" +
                     "<tr>" +
                     "<td align=center width=50%>Instructions</td>" +
                     "<td align=center width=50%>" +
                     "<div id='ins_context'>" + "<span data-bind='text: value'>&nbsp;</span>" + "</div>" +
                     "</td>" +
                     "</tr>" +
                     "<tr>" +
                     "<td align=center width=50%>CLK ticks</td>" +
                     "<td align=center width=50%>" +
                     "<div id='clk_context'>" + "<span data-bind='text: value'>&nbsp;</span>" + "</div>" +
                     "</td>" +
                     "</tr>" +
                     "</table>" +
                     "</div>" ;
            $(jqdiv).html("<div class='row'>" + o1 + "</div>");

            // knockout binding
            ko_rebind_state('CLK',      'clk_context') ;
            ko_rebind_state('DECO_INS', 'ins_context') ;
        }

        function init_config_mp ( jqdiv )
        {
            // without ui
            if (jqdiv === "")
            {
                    simhw_internalState_reset('MP_wc', ko_observable(0)) ;
                    return ;
            }

            // html holder
            var o1 = "<div class='container-fluid'>" +
                     "<div class='row'>" ;

            o1 += "<div class='col-12' style='padding:0 0 10 0;'>" +
                  "<div class='card bg-light'>" +
                  "<div class='card-body p-0' id='mempanel'>" +
                  "<table class='table table-hover table-sm table-bordered' " +
                  "       style='margin:0'>" +
                  "<tbody class='no-ui-mini'>" +
                  "<tr><td align=center'>Wait cycles (<b>0</b> - &infin;)</td>" +
                  "    <td align=center'>" + 
                  "<div id='mp_wc'>" + 
                  "<input type=number data-bind='value: simhw_internalState(\"MP_wc\")' min='0' max='99999999'>" +
                  "</div>" + 
                  "    </td></tr>" +
                  "</tbody>" +
                  "</table>" +
                  "</div>" +
                  "</div>" +
                  "</div>" ;
         
            $(jqdiv).html(o1);

            // knockout binding
            simhw_internalState_reset('MP_wc', ko_observable(0)) ;
            var ko_context = document.getElementById('mp_wc');
            ko.applyBindings(simhw_internalState('MP_wc'), ko_context);
        }



        // debug

	function get_deco_from_pc ( pc )
	{
	        var hexstrpc  = "0x" + pc.toString(16) ;
                var curr_firm = simhw_internalState('FIRMWARE') ;

	        if ( (typeof curr_firm.assembly                  === "undefined") ||
	             (typeof curr_firm.assembly[hexstrpc]        === "undefined") ||
	             (typeof curr_firm.assembly[hexstrpc].source === "undefined") )
                {
                      return "";
                }

                return curr_firm.assembly[hexstrpc].source ;
        }


        /* 
         * Show signal dependencies
         */
        function show_visgraph ( jit_fire_dep, jit_fire_order )
        {
	    var sig = {} ;
            var tmp_hash  = {} ;
            var tmp_nodes = [] ;
            var tmp_id    = 0;

            for (sig in simhw_sim_signals())
            {
                 tmp_hash[sig] = tmp_id ;
                 tmp_nodes.push({id: tmp_id, 
                                 label: sig, 
                                 title: sig}) ;
                 tmp_id++ ;
            }
            for (var i=0; i<jit_fire_order.length; i++) {
                 tmp_nodes[tmp_hash[jit_fire_order[i]]].color = '#7BE141' ;
            }
	    var jit_dep_nodes = new vis.DataSet(tmp_nodes) ;

            var tmp_edges = [] ;
            for (sig in simhw_sim_signals()) {
                 for (var sigorg in jit_fire_dep[sig]) {
                      tmp_edges.push({from: tmp_hash[sigorg], 
                                      to: tmp_hash[sig], 
                                      arrows: 'to'}) ;
                }
            }
	    var jit_dep_edges = new vis.DataSet(tmp_edges) ;

	    var jit_dep_container = document.getElementById('depgraph1') ;
	    var jit_dep_data    = { nodes: jit_dep_nodes, 
                                    edges: jit_dep_edges } ;
	    var jit_dep_options = { interaction: {hover:true},
                                    height: '255px',
                                    nodes: { borderWidth: 2, shadow:true },
                                    edges: { width: 2, shadow:true } } ;
	    jit_dep_network = new vis.Network(jit_dep_container, jit_dep_data, jit_dep_options) ;
        }

