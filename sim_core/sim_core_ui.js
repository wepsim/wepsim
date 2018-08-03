/*     
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
           if (o == null) return;

	   o = o.contentDocument;
           if (o == null) return;

	   o = o.getElementById(r[1]);
           if (o == null) return;

           if (active)
           {
               o.style.setProperty("stroke",       color_active, "");
               o.style.setProperty("fill",         color_active, "");
               o.style.setProperty("stroke-width", size_active,  "");
           }
           else
           {
               if (o.style.getPropertyValue("stroke") == color_inactive)
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
            if (true == DRAW_stop) {
                return ;
	    }

	    var draw_it = get_cfg('is_byvalue'); // 'is_byvalue' belongs to the sim_cfg.js

            /* 1) Check if draw it */
	    if (typeof simhw_sim_state("REG_MICROINS").value[obj.name] != "undefined") {
		draw_it = true;
	    }

	    if ( (false == draw_it) && (typeof obj.depends_on != "undefined") )
	    {
		for (var k=0; k<obj.depends_on.length; k++)
		{
		     var sname = obj.depends_on[k] ;
		     if (typeof simhw_sim_state("REG_MICROINS").value[sname] != "undefined") {
			     draw_it = true;
			     break;
		     }
		     else if ("CLK" == sname) {
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
		    for (var i=0; i<obj.draw_data.length; i++)
		    for (var j=0; j<obj.draw_data[i].length; j++) {
	                   obj_draw(obj.draw_data[i][j],
                                    (i==value) && draw_it,
                                    get_cfg('color_data_active'),
                                    get_cfg('color_data_inactive'),
                                    get_cfg('size_active'),
                                    get_cfg('size_inactive'));
		    }
	    }
	    else if (obj.nbits == 1)
	    // (same draw) && (nbits == 1)
	    {
		    for (var j=0; j<obj.draw_data[0].length; j++) {
	                   obj_draw(obj.draw_data[0][j],
                                    (0!=value) && draw_it,
                                    get_cfg('color_data_active'),
                                    get_cfg('color_data_inactive'),
                                    get_cfg('size_active'),
                                    get_cfg('size_inactive'));
		    }
	    }
	    else if (obj.draw_data.length == 1)
	    // (same draw) && (nbits > 1)
	    {
		    for (var j=0; j<obj.draw_data[0].length; j++) {
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
		    for (var i=0; i<obj.draw_name.length; i++)
		    for (var j=0; j<obj.draw_name[i].length; j++) {
	                   obj_draw(obj.draw_name[i][j],
                                    (i==value) && draw_it,
                                    get_cfg('color_name_active'),
                                    get_cfg('color_name_inactive'),
                                    get_cfg('size_active'),
                                    get_cfg('size_inactive'));
		    }
	    }
	    else if (obj.nbits == 1)
	    // (same draw) && (nbits == 1)
	    {
		    for (var j=0; j<obj.draw_name[0].length; j++) {
	                   obj_draw(obj.draw_name[0][j],
                                    (0!=value) && draw_it,
                                    get_cfg('color_name_active'),
                                    get_cfg('color_name_inactive'),
                                    get_cfg('size_active'),
                                    get_cfg('size_inactive'));
		    }
	    }
	    else if (obj.draw_name.length == 1)
	    // (same draw) && (nbits > 1)
	    {
		    for (var j=0; j<obj.draw_name[0].length; j++) {
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
         *  init_x & show_x
         */

        function simcoreui_notify ( ntf_title, ntf_message, ntf_type, ntf_delay )
        {
	    // alerts-container does not exist, create it
	    var ac = $("#alerts-container") ;
	    if (ac.length == 0) {
		ac = $('<div id="alerts-container" ' + 
                       '     style="position: fixed; width: 50%; left: 25%; top: 10%; z-index:256;">') ;
		$("body").append(ac) ;
	    }

	    // create the alert div
            var btn1   = $('<button type="button" class="close" data-dismiss="alert">') ;
	    var alert1 = $('<div class="alert alert-' + ntf_type + '">') ;
	    ac.prepend(alert1.append(btn1.append("&times;")).append(ntf_message)) ;

	    // if delay was passed, set up a timeout to close the alert
	    if (ntf_delay != 0) {
		window.setTimeout(function() { alert1.alert("close") }, ntf_delay);     
	    }
        }

        function simcoreui_notify_close ( )
        {
            //$("#alerts-container").close() ;
              $(".alert").alert('close') ;
        }


        function hex2float ( hexvalue )
        {
		var sign     = (hexvalue & 0x80000000) ? -1 : 1;
		var exponent = ((hexvalue >> 23) & 0xff) - 127;
		var mantissa = 1 + ((hexvalue & 0x7fffff) / 0x800000);

		var valuef = sign * mantissa * Math.pow(2, exponent);
		if (-127 == exponent)
		    if (1 == mantissa)
			 valuef = (sign == 1) ? "+0" : "-0" ;
		    else valuef = sign * ((hexvalue & 0x7fffff) / 0x7fffff) * Math.pow(2, -126) ;
		if (128 == exponent)
		    if (1 == mantissa)
			 valuef = (sign == 1) ? "+Inf" : "-Inf" ;
		    else valuef = "NaN" ;

		return valuef ;
        }

        function hex2char8 ( hexvalue )
        {
                var valuec = new Array();

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
                           valuebin.substring(8,12)  + " " + valuebin.substring(12,16) + " " +
                           valuebin.substring(16,20) + " " + valuebin.substring(20,24) + " " +
                           valuebin.substring(24,28) + " " + valuebin.substring(28,32) ;

                return valuebin ;
        }

        function hex2values_update ( index )
        {
	      var new_value = parseInt($("#popover1")[0].value) ;

              if (typeof simhw_sim_states()["BR"][index] != "undefined")
              {
	          set_value(simhw_sim_states()["BR"][index], new_value) ;
	          fullshow_rf_values() ;
                  $("#rf" + index).click() ;
                  $("#rf" + index).click() ;
              }

              if (typeof simhw_sim_states()[index] != "undefined")
              {
                  if (1 == simhw_sim_states()[index].nbits)
                      new_value = new_value % 2;

	          set_value(simhw_sim_states()[index], new_value) ;
                  fullshow_eltos(simhw_sim_states(), filter_states);
                  $("#rp" + index).click() ;
                  $("#rp" + index).click() ;
              }
        }

        function hex2values ( hexvalue, index )
        {
                var rhex = /[0-9A-F]{1,8}/gi;
                if (!rhex.test(hexvalue))
                    hexvalue = 0 ;

		var valuei   = hexvalue  >> 0;
		var valueui  = hexvalue >>> 0;
		var valuec8  = hex2char8(valueui);
		var valuef   = hex2float(valueui);
                var valuebin = hex2bin(valueui);
                var valuehex = valueui.toString(16).toUpperCase() ;
                    valuehex = "0x" + pack8(valuehex) ;

		var valuedt = "" ;
		if (get_cfg('is_editable') == true) {
		    valuedt = "<tr><td colspan=5 align=center><input type=text id='popover1' value='" + valueui + "' data-mini='true' style='width:65%'>&nbsp;" +
                              "<span class='badge badge-secondary' " +
                              "      onclick='hex2values_update(\"" + index + "\");'>update</span></td></tr>";
                }

		var vtable = "<table width='100%' class='table table-bordered table-sm'>" +
			     "<tr><td><small><b>hex.</b></small></td>" +
                             "    <td colspan=4><small>" + valuehex + "</small></td></tr>" +
			     "<tr><td><small><b>bin.</b></small></td>" +
                             "    <td colspan=4><small><font face='monospace'><b>" + valuebin + "</b></font></smallspan></td></tr>" +
			     "<tr><td><small><b>signed</b></small></td>" +
                             "    <td colspan=4><small>" + valuei   + "</small></td></tr>" +
			     "<tr><td><small><b>unsig.</b></small></td>" +
                             "    <td colspan=4><small>" + valueui  + "</small></td></tr>" +
			     "<tr><td width=30%><small><b>char</b></small></td>" +
                             "    <td width=15% align=center><small>" + valuec8[0] + "</small></td>" +
                             "    <td width=15% align=center><small>" + valuec8[1] + "</small></td>" +
                             "    <td width=15% align=center><small>" + valuec8[2] + "</small></td>" +
                             "    <td width=15% align=center><small>" + valuec8[3] + "</small></td></tr>" +
		             "<tr><td><small><b>float</b></small></td>" +
                             "    <td colspan=4><small><font face='monospace'><b>" + valuef + "</b></font></small></td></tr>" +
			     valuedt +
			     "</table>" ;

		return vtable;
        }

        function init_rf ( jqdiv )
        {
            if (jqdiv == "")
            {   // without ui
                return ;
            }

            var o1_rf = "" ;
            var o1_rn = "" ;
	    for (var index=0; index < simhw_sim_states()['BR'].length; index++)
            {
		 o1_rn = "R"  + index ;
                 if (index < 10)
                     o1_rn = o1_rn + '<span style="opacity: 0.0;">_</span>' ;

		 o1_rf += "<div class='col pb-1 px-1'>" +
                          "<button type='button' class='btn py-0 px-0 ml-0' " + 
			  "        style='width:inherit; border-color:#cecece; background-color:#f5f5f5' data-role='none' " +
                          "        data-toggle='popover-up' data-popover-content='" + index + "' data-container='body' " +
                          "        id='rf" + index + "'>" +
                          "  <span id='name_RF" + index + "' style='float:center; padding:0 0 0 0; color:black;'>" + o1_rn + "</span>" +
                          "  <span class='badge badge-secondary' style='background-color:#CEECF5; color:black;' id='tbl_RF"  + index + "'>" +
                          (get_value(simhw_sim_states()['BR'][index]) >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() +
                          "  </span>" +
                          "</button>" +
                          "</div>" ;
	    }

            $(jqdiv).html("<div class='row justify-content-center'>" + o1_rf + "</div>");

	    $("[data-toggle=popover-up]").popover({
	    	    html:      true,
                    placement: 'auto',
                    animation: false,
		    content: function() {
		        var index = $(this).attr("data-popover-content");
                        var hexvalue = get_value(simhw_sim_states()['BR'][index]);
                        return hex2values(hexvalue, index) ;
		    },
		    title: function() {
		        var index = $(this).attr("data-popover-content");
                        var id_button = "&quot;#rf" + index + "&quot;" ;
		        return '<span class="text-info"><strong>R' + index + '</strong></span>' +
                               '<button type="button" id="close" class="close" ' +
                               '        onclick="$(' + id_button + ').click();">&times;</button>';
		    }
	    });
        }

        function fullshow_rf_values ( )
        {
	    if (typeof document == "undefined")
	        return ;

            var SIMWARE = get_simware() ;

	    for (var index=0; index < simhw_sim_states()['BR'].length; index++)
            {
                 var br_value = (get_value(simhw_sim_states()['BR'][index]) >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() ;
                 if (16 == get_cfg('RF_display_format'))
                     br_value = pack8(br_value) ;

                 $("#tbl_RF" + index).html(br_value);
	    }
        }

        var show_rf_values_deferred = null;

        function innershow_rf_values ( )
        {
	    fullshow_rf_values();
	    show_rf_values_deferred = null;
        }

        function show_rf_values ( )
        {
            if (null != show_rf_values_deferred)
                return;

            show_rf_values_deferred = setTimeout(innershow_rf_values, cfg_show_rf_delay);
        }

        function show_rf_names ( )
        {
	    if (typeof document == "undefined")
	        return ;

            var SIMWARE = get_simware() ;

            var br_value = "" ;
	    for (var index=0; index < simhw_sim_states()['BR'].length; index++)
            {
		 br_value = "R"  + index ;
                 if (index < 10)
                     br_value = br_value + '<span style="opacity: 0.0;">_</span>' ;

	         if ('logical' == get_cfg('RF_display_name'))
		     if (typeof SIMWARE['registers'][index] != "undefined")
		         br_value = SIMWARE['registers'][index] ;

		 var obj = document.getElementById("name_RF" + index);
		 if (obj != null)
		     obj.innerHTML = br_value ;
	    }
        }


        function init_eltos ( jqdiv, sim_eltos, filter, divclasses )
        {
            if (jqdiv == "")
            {   // without ui
                return ;
            }

            var o1 = "" ;
            var part1 = "" ;
            var part2 = "" ;
            for (var i=0; i<filter.length; i++)
            {
                var s = filter[i].split(",")[0] ;

                var showkey = sim_eltos[s].name;
                if (sim_eltos[s].nbits > 1) 
	        {
                    part1 = showkey.substring(0, 3) ;
                    part2 = showkey.substring(3, showkey.length) ;
		    if (part2.length > 0)
                        showkey = part1 + '<span class="d-none d-sm-inline-flex">' + part2 + '</span>' ;

		    if (showkey.length < 3)
			showkey = showkey + '<span style="opacity: 0.0;">_</span>' ;
	        }

                var b = filter[i].split(",")[1] ;
                var divclass = divclasses[b] ;

                o1 += "<div class='" + divclass + " pb-1 px-1'>" +
                      "<button type='button' class='btn py-0 px-0 ml-1' " + 
		      "        style='width:inherit; border-color:#cecece; background-color:#f5f5f5' data-role='none' " +
                      "        data-toggle='popover-bottom' data-popover-content='" + s + "' data-container='body' " +
                      "        id='rp" + s + "'>" +
                      showkey +
                      "<span class='badge badge-secondary' style='background-color:#CEECF5; color:black;' id='tbl_"  + s + "'>" +
                      sim_eltos[s].value.toString(get_cfg('RF_display_format')) +
                      "</span>" +
                      "</button>" +
                      "</div>" ;
            }

            $(jqdiv).html("<div class='row justify-content-center'>" + o1 + "</div>");

	    $("[data-toggle=popover-bottom]").popover({
	    	    html:      true,
                    placement: 'bottom',
                    animation: false,
		    content: function() {
		        var index = $(this).attr("data-popover-content");
                        var hexvalue = get_value(simhw_sim_states()[index]);
                        return hex2values(hexvalue, index) ;
		    },
		    title: function() {
		        var index = $(this).attr("data-popover-content");
                        var id_button = "&quot;#rp" + index + "&quot;" ;
		        return '<span class="text-info"><strong>' + simhw_sim_states()[index].name + '</strong></span>' +
                               '<button type="button" id="close" class="close" ' +
                               '        onclick="$(' + id_button + ').click();">&times;</button>';
		    }
	    });
        }

        function fullshow_eltos ( sim_eltos, filter )
        {
	    if (typeof document == "undefined")
	        return ;

            for (var i=0; i<filter.length; i++)
            {
                var r = filter[i].split(",") ;
                var key = r[0] ;
                var value = sim_eltos[key].value.toString(get_cfg('RF_display_format')) ;

                if (sim_eltos[key].nbits > 1) 
		{
                    value = (simhw_sim_state(key).value >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() ;
                    if (16 == get_cfg('RF_display_format'))
                        value = pack8(value) ;
                }

		var obj = document.getElementById("tbl_" + key);
		if (obj != null)
                    obj.innerHTML = value ;
            }
        }

        var show_eltos_deferred = null;

        function show_eltos ( sim_eltos, filter )
        {
            if (null != show_eltos_deferred)
                return;

            show_eltos_deferred = setTimeout(function() {
                                                   fullshow_eltos(sim_eltos, filter);
                                                   show_eltos_deferred = null;
                                             }, cfg_show_eltos_delay);
        }


        var filter_states = [ "REG_IR_DECO,0",
                              "REG_IR,1",  "REG_PC,1",  "REG_SR,1",
                              "REG_RT1,1", "REG_RT2,1", "REG_RT3,1",
                              "REG_MAR,1", "REG_MBR,1", "REG_MICROADDR,1" ] ;

        var divclasses = [ "col-11", 
                           "col" ] ;

        function init_states ( jqdiv )
        {
            return init_eltos(jqdiv, simhw_sim_states(), filter_states, divclasses ) ;
        }

        function show_states ( )
        {
            return show_eltos(simhw_sim_states(), filter_states) ;
        }

        function ko_observable ( initial_value )
        {
	    if (typeof ko != "undefined") 
                 return ko.observable(initial_value).extend({rateLimit: cfg_show_rf_refresh_delay}) ;
	    else return initial_value ;
        }

        function ko_rebind_state ( state, id_elto )
        {
	    if (typeof ko == "undefined") {
                return ;
            }

            var state_obj = simhw_sim_state(state) ;
            if (typeof state_obj.value != "function")
                state_obj.value = ko.observable(state_obj.value).extend({rateLimit: cfg_show_rf_refresh_delay}) ;
            var ko_context = document.getElementById(id_elto);
            ko.cleanNode(ko_context);
            ko.applyBindings(simhw_sim_state(state), ko_context);
        }

        function init_io ( jqdiv )
        {
            var curr_iointfactory = simhw_internalState('io_int_factory') ;

	    // without ui...
            if (jqdiv == "")
            {
		    for (var i=0; i<curr_iointfactory.length; i++) 
		    {
		         curr_iointfactory[i].accumulated = ko_observable(curr_iointfactory[i].accumulated) ;
		         curr_iointfactory[i].active      = ko_observable(curr_iointfactory[i].active) ;
                    }

                    return ;
            }

            // stats holder
            var o1 = "<div class='col-12'>" +
                     "<table class='table table-hover table-sm table-bordered'>" ;
            for (var i=0; i<curr_iointfactory.length; i++)
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
                  "</div>" ;
            $(jqdiv).html("<div class='row'>" + o1 + "</div>");

            // knockout binding
            for (var i=0; i<curr_iointfactory.length; i++)
            {
                 if (typeof curr_iointfactory[i].accumulated != "function")
                     curr_iointfactory[i].accumulated = ko_observable(curr_iointfactory[i].accumulated) ;
                 if (typeof curr_iointfactory[i].active != "function")
                     curr_iointfactory[i].active      = ko_observable(curr_iointfactory[i].active) ;
                 var ko_context = document.getElementById('int' + i + '_context');
                 ko.cleanNode(ko_context);
                 ko.applyBindings(curr_iointfactory[i], ko_context);
            }
        }

        function init_cpu ( jqdiv )
        {
	    // without ui
            if (jqdiv == "")
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
            if (jqdiv == "")
            {
                    simhw_internalState_reset('MP_wc', ko_observable(0)) ;
                    return ;
            }

            // html holder
            var o1 = "<div class='container-fluid'>" +
                     "<div class='row'>" ;

            o1 += "<div class='col-12' style='padding:0 0 10 0;'>" +
                  "<div class='card bg-light'>" +
                  "<div class='card-body' id='mempanel' style='padding:0 0 0 0;'>" +
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

        function init_config_io ( jqdiv )
        {
            var curr_iointfactory = simhw_internalState('io_int_factory') ;

            // without ui
            if (jqdiv == "")
            {
		    for (var i=0; i<curr_iointfactory.length; i++) 
		    {
		        curr_iointfactory[i].period      = ko_observable(curr_iointfactory[i].period);
		        curr_iointfactory[i].probability = ko_observable(curr_iointfactory[i].probability);
		    }
                    return ;
            }

            // html holder
            var o1 = "<div class='container-fluid'>" +
                     "<div class='row'>" ;

               o1 += "<div class='col-12' style='padding:0 0 0 0;'>" +
                     "<div class='card bg-light' style='margin:0 0 0 0;'>" +
                     "<div class='card-body' id='iopanel' style='padding: 0 0 0 0'>" ;
               o1 += "<center>" +
                     "<table class='table table-hover table-sm table-bordered' " +
                     "       style='margin:0'>" +
                     "<tbody class='no-ui-mini'>" +
                     "<tr>" +
                     "<td align=center width='33%'>" +
                     "  <span class='d-none d-sm-inline-flex'>Interrupt identificator</span>" +
                     "  <span class='d-sm-none'>Int. Id.<br>(0 - 7)</span>" +
                     "</td>" +
                     "<td align=center width='33%'>" +
                     "  <span class='d-none d-sm-inline-flex'>CLK period (<b>0</b> - &infin;)</span>" +
                     "  <span class='d-sm-none'>CLK ticks <br>(<b>0</b> - &infin;)</span>" +
                     "</td>" +
                     "<td align=center width='33%'>" +
                     "  <span class='d-none d-sm-inline-flex'>Probability (0 - 1)</span>" +
                     "  <span class='d-sm-none'>Probability <br>(0 - 1)</span>" +
                     "</td>" +
                     "</tr>" ;
            for (var i=0; i<8; i++)
            {
               o1 += "<tr>" +
                     "<td align=center style='padding:0 0 0 0; vertical-align: middle !important'>" +
                     "<span style='padding:0 0 0 0; margin:0 0 0 0'>" + i + "</span>" + 
                     "</td>" +
                     "<td align=center style='padding:0 0 0 0'>" +
                     "<div id='int" + i + "_per' style='margin:0 3 0 3'>" +
                     "<input type=number data-bind='value: period' min='0' max='99999999'>" +
                     "</div>" +
                     "</td>" +
                     "<td align=center style='padding:0 0 0 0'>" +
                     "<div id='int" + i + "_pro' style='margin:0 3 0 3'>" +
                     "<input type=number data-bind='value: probability' min='0' max='1' step='.05'>" +
                     "</div>" +
                     "</td>" +
                     "</tr>" ;
            }
               o1 += "</tbody>" +
                     "</table>" +
                     "</center>" ;
               o1 += "</div>" +
                     "</div>" +
                     "</div>" ;

            $(jqdiv).html(o1);

            // knockout binding
            for (var i=0; i<curr_iointfactory.length; i++)
            {
                 if (typeof curr_iointfactory[i].period != "function")
                     curr_iointfactory[i].period = ko_observable(curr_iointfactory[i].period) ;
                 var ko_context = document.getElementById('int' + i + '_per');
                 ko.cleanNode(ko_context);
                 ko.applyBindings(curr_iointfactory[i], ko_context);
 
                 if (typeof curr_iointfactory[i].probability != "function")
                     curr_iointfactory[i].probability = ko_observable(curr_iointfactory[i].probability) ;
                 var ko_context = document.getElementById('int' + i + '_pro');
                 ko.cleanNode(ko_context);
                 ko.applyBindings(curr_iointfactory[i], ko_context);
            }
        }


        // debug

	function get_deco_from_pc ( pc )
	{
	        var hexstrpc  = "0x" + pc.toString(16) ;
                var curr_firm = simhw_internalState('FIRMWARE') ;

	        if ( (typeof curr_firm.assembly                  == "undefined") ||
	             (typeof curr_firm.assembly[hexstrpc]        == "undefined") ||
	             (typeof curr_firm.assembly[hexstrpc].source == "undefined") )
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
            var tmp_hash  = new Object();
            var tmp_nodes = new Array();
            var tmp_id    = 0;
            for (var sig in simhw_sim_signals())
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

            var tmp_edges = new Array();
            for (var sig in simhw_sim_signals()) {
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
                                    nodes: { borderWidth: 2, shadow:true },
                                    edges: { width: 2, shadow:true } } ;
	    jit_dep_network = new vis.Network(jit_dep_container, jit_dep_data, jit_dep_options) ;
        }

