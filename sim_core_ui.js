/*     
 *  Copyright 2015-2017 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  get/set simware
         */

        function get_simware ( )
        {
	    if (typeof FIRMWARE['firmware'] == "undefined")
            {
                FIRMWARE['firmware']           = new Array() ;
                FIRMWARE['mp']                 = new Object() ;
                FIRMWARE['seg']                = new Object() ;
                FIRMWARE['assembly']           = new Object() ;
                FIRMWARE['labels']             = new Object() ;
                FIRMWARE['labels2']            = new Object() ;
                FIRMWARE['labels_firm']        = new Object() ;
                FIRMWARE['registers']          = new Object() ;
                FIRMWARE['cihash']             = new Object() ;
                FIRMWARE['pseudoInstructions'] = new Object() ;
		FIRMWARE['stackRegister']      = new Object() ;
            }

            return FIRMWARE ;
	}

        function set_simware ( preSIMWARE )
        {
	    if (typeof preSIMWARE['firmware'] != "undefined")
                FIRMWARE['firmware'] = preSIMWARE['firmware'] ;
	    if (typeof preSIMWARE['mp'] != "undefined")
                FIRMWARE['mp'] = preSIMWARE['mp'] ;
	    if (typeof preSIMWARE['registers'] != "undefined")
                FIRMWARE['registers'] = preSIMWARE['registers'] ;
	    if (typeof preSIMWARE['cihash'] != "undefined")
                FIRMWARE['cihash'] = preSIMWARE['cihash'] ;
	    if (typeof preSIMWARE['assembly'] != "undefined")
                FIRMWARE['assembly'] = preSIMWARE['assembly'] ;
	    if (typeof preSIMWARE['pseudoInstructions'] != "undefined")
                FIRMWARE['pseudoInstructions'] = preSIMWARE['pseudoInstructions'] ;

	    if (typeof preSIMWARE['seg'] != "undefined")
                FIRMWARE['seg'] = preSIMWARE['seg'] ;
	    if (typeof preSIMWARE['labels'] != "undefined")
                FIRMWARE['labels'] = preSIMWARE['labels'] ;
	    if (typeof preSIMWARE['labels2'] != "undefined")
                FIRMWARE['labels2'] = preSIMWARE['labels2'] ;
	    if (typeof preSIMWARE['labels_firm'] != "undefined")
                FIRMWARE['labels_firm'] = preSIMWARE['labels_firm'] ;
	    if (typeof preSIMWARE['stackRegister'] != "undefined")
		FIRMWARE['stackRegister'] = preSIMWARE['stackRegister'] ;
	}


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
            if (true == DRAW_stop)
                return ;

            /* 1) Check if draw it */
	    var draw_it = get_cfg('is_byvalue'); // 'is_byvalue' belongs to the sim_cfg.js
	    if (typeof sim_states["REG_MICROINS"].value[obj.name] != "undefined") {
		draw_it = true;
	    }
	    if ( (false == draw_it) && (typeof obj.depends_on != "undefined") )
	    {
		for (var k=0; k<obj.depends_on.length; k++)
		{
		     var sname = obj.depends_on[k] ;
		     if (typeof sim_states["REG_MICROINS"].value[sname] != "undefined") {
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
	    for (var key in sim_signals)
	    {
		 update_draw(sim_signals[key], sim_signals[key].value) ;
	    }

	    show_dbg_ir(get_value(sim_states['REG_IR_DECO'])) ;
        }


        /*
         *  init_x & show_x
         */

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

              if (typeof sim_states["BR"][index] != "undefined")
              {
	          set_value(sim_states["BR"][index], new_value) ;
	          fullshow_rf_values() ;
                  $("#rf" + index).click() ;
                  $("#rf" + index).click() ;
              }

              if (typeof sim_states[index] != "undefined")
              {
                  if (1 == sim_states[index].nbits)
                      new_value = new_value % 2;

	          set_value(sim_states[index], new_value) ;
                  fullshow_eltos(sim_states, filter_states);
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
                              "<span class='badge' " +
                              "      onclick='hex2values_update(\"" + index + "\");'>update</span></td></tr>";
                }

		var vtable = "<table width='100%' class='table table-bordered table-condensed'>" +
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

            var o1_rf = "<div class='hidden' id='popover_rf'>" +
                        "  <div class='popover-heading'></div>" +
                        "  <div class='popover-body'></div>" +
                        "</div>" ;
	    for (var index=0; index < sim_states['BR'].length; index++)
            {
		 o1_rf += "<div class='col-xs-6 col-sm-4 col-md-4 col-lg-3' style='padding:0 5 0 5;'>" +
                          "<button type='button' class='btn btn-outline-primary' style='padding:0 0 0 0; outline:none; box-shadow:none; transform:translate3d(0,0,0);' " +
                          "        data-toggle='popover-up' data-popover-content='" + index + "' data-container='body' " +
                          "        id='rf" + index + "'>" +
                          "  <span id='name_RF" + index + "' style='float:center; padding:0 0 0 0'>R" + index + "</span>" +
                          "  <span class='badge' style='background-color:#CEECF5; color:black;' id='tbl_RF"  + index + "'>" +
                          (get_value(sim_states['BR'][index]) >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() +
                          "  </span>" +
                          "</button>" +
                          "</div>" ;
	    }

            $(jqdiv).html("<div class='row-fluid'>" + o1_rf + "</div>");

	    $("[data-toggle=popover-up]").popover({
	    	    html:      true,
                    placement: 'top',
                    animation: false,
		    content: function() {
		        var index = $(this).attr("data-popover-content");
                        var hexvalue = get_value(sim_states['BR'][index]);
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
            // if ($("#states_BR").is(":visible") == false)
            //     return ;

            var SIMWARE = get_simware() ;

	    for (var index=0; index < sim_states['BR'].length; index++)
            {
                 var br_value = (get_value(sim_states['BR'][index]) >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() ;
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
            var SIMWARE = get_simware() ;

	    for (var index=0; index < sim_states['BR'].length; index++)
            {
                 var br_value = "R" + index;
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
            for (var i=0; i<filter.length; i++)
            {
                var s = filter[i].split(",")[0] ;

                var showkey = sim_eltos[s].name;
                if (sim_eltos[s].nbits > 1)
                    showkey = showkey.substring(0,2) + '<span class="hidden-xs">' + showkey.substring(2,showkey.length) + '</span>' ;

                var b = filter[i].split(",")[1] ;
                var divclass = divclasses[b] ;

                o1 += "<div class='" + divclass + "' style='padding: 0 5 0 5;'>" +
                      "<button type='button' class='btn btn-outline-primary' style='padding:0 0 0 0; outline:none; box-shadow:none; will-change:transform; transform:translate3d(0,0,0);' " +
                      "        data-toggle='popover-bottom' data-popover-content='" + s + "' data-container='body' " +
                      "        id='rp" + s + "'>" +
                      showkey +
                      "<span class='badge' style='background-color:#CEECF5; color:black;' id='tbl_"  + s + "'>" +
                      sim_eltos[s].value.toString(get_cfg('RF_display_format')) +
                      "</span>" +
                      "</button>" +
                      "</div>" ;
            }

            $(jqdiv).html("<div class='row-fluid'>" + o1 + "</div>");

	    $("[data-toggle=popover-bottom]").popover({
	    	    html:      true,
                    placement: 'bottom',
                    animation: false,
		    content: function() {
		        var index = $(this).attr("data-popover-content");
                        var hexvalue = get_value(sim_states[index]);
                        return hex2values(hexvalue, index) ;
		    },
		    title: function() {
		        var index = $(this).attr("data-popover-content");
                        var id_button = "&quot;#rp" + index + "&quot;" ;
		        return '<span class="text-info"><strong>' + sim_states[index].name + '</strong></span>' +
                               '<button type="button" id="close" class="close" ' +
                               '        onclick="$(' + id_button + ').click();">&times;</button>';
		    }
	    });
        }

        function fullshow_eltos ( sim_eltos, filter )
        {
            for (var i=0; i<filter.length; i++)
            {
                var r = filter[i].split(",") ;
                var key = r[0] ;
                var value = sim_eltos[key].value.toString(get_cfg('RF_display_format')) ;

                if (sim_eltos[key].nbits > 1) {
                        value = (sim_states[key].value >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() ;
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

        var divclasses = [ "col-xs-12 col-sm-12 col-md-12 col-lg-12",
                           "col-xs-4 col-sm-4 col-md-4 col-lg-4" ] ;

        function init_states ( jqdiv )
        {
            return init_eltos(jqdiv, sim_states, filter_states, divclasses ) ;
        }

        function show_states ( )
        {
            return show_eltos(sim_states, filter_states) ;
        }

        function ko_observable ( initial_value )
        {
            var rli = 30 ;
            if (get_cfg('DBG_delay') > 5) 
                rli = 120 ;

            return ko.observable(initial_value).extend({ rateLimit: rli });
        }

        function init_io ( jqdiv )
        {
            if (jqdiv == "")
            {       // without ui
		    sim_states['CLK'].value = ko.observable(sim_states['CLK'].value);
		    sim_states['DECO_INS'].value = ko.observable(sim_states['DECO_INS'].value);
		    for (var i=0; i<IO_INT_FACTORY.length; i++) {
			 IO_INT_FACTORY[i].accumulated = ko.observable(IO_INT_FACTORY[i].accumulated) ;
			 IO_INT_FACTORY[i].active      = ko.observable(IO_INT_FACTORY[i].active) ;
                    }
                    return ;
            }

            // stats holder
            var o1 = "<center>" +
                     "<table class='table table-hover table-condensed table-bordered table-responsive'>" +
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
                     "</tr>" ;
               o1 += "<tr><td colspan=2>&nbsp;</td></tr>" ;
            for (var i=0; i<IO_INT_FACTORY.length; i++)
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
                  "</center>" ;
            $(jqdiv).html("<div class='row-fluid'>" + o1 + "</div>");

            // knockout binding
            sim_states['CLK'].value = ko.observable(sim_states['CLK'].value);
            var ko_context = document.getElementById('clk_context');
            ko.applyBindings(sim_states['CLK'], ko_context);

            sim_states['DECO_INS'].value = ko.observable(sim_states['DECO_INS'].value);
            var ko_context = document.getElementById('ins_context');
            ko.applyBindings(sim_states['DECO_INS'], ko_context);

            for (var i=0; i<IO_INT_FACTORY.length; i++)
            {
                 IO_INT_FACTORY[i].accumulated = ko.observable(IO_INT_FACTORY[i].accumulated) ;
                 IO_INT_FACTORY[i].active      = ko.observable(IO_INT_FACTORY[i].active) ;
                 var ko_context = document.getElementById('int' + i + '_context');
                 ko.applyBindings(IO_INT_FACTORY[i], ko_context);
            }
        }

        function init_config ( jqdiv )
        {
            // without ui
            if (jqdiv == "")
            {
		    for (var i=0; i<IO_INT_FACTORY.length; i++) {
			 IO_INT_FACTORY[i].period = ko_observable(IO_INT_FACTORY[i].period) ;
			 IO_INT_FACTORY[i].probability = ko_observable(IO_INT_FACTORY[i].probability) ;
		    }

		    MP_wc = ko_observable(MP_wc) ;
                    return ;
            }

            // html holder
            var o1 = "<div class='container-fluid' style='padding:0 0 0 0; overflow-x:auto'>" +
                     "<div class='row-fluid'>" ;

               o1 += "<div class='col-xs-12 col-md-12' style='padding:0 0 0 0;'>" +
                     "<div class='panel panel-default'>" +
                     "<div class='panel-heading'>" +
                     " <h3 class='panel-title'>Memory</h3>" +
                     "</div>" +
                     "<div class='panel-body' id='mempanel' style='padding:0 0 0 0;'>" +
                     "<table class='table table-hover table-condensed table-bordered table-responsive' " +
                     "       style='margin:0'>" +
                     "<tbody class='no-ui-mini'>" +
                     "<tr><td align=center'>Wait cycles (<b>0</b> - &infin;)</td></tr>" +
                     "<tr><td align=center'>" + 
                     "    <div id='mp_wc'><input type=number data-bind='value: MP_wc' min=0></div>" + 
                     "</td></tr>" +
                     "</tbody>" +
                     "</table>" +
                     "</div>" +
                     "</div>" +
                     "</div>" +
                     "</div>" +
                     "</div>" ;
         
               o1 += "<div class='col-xs-12 col-md-12' style='padding:0 0 0 0;'>" +
                     "<div class='panel panel-default' style='margin:0 0 0 0;'>" +
                     "<div class='panel-heading'>" +
                     " <h3 class='panel-title'>I/O</h3>" +
                     "</div>" +
                     "<div class='panel-body' id='iopanel' style='padding: 0 0 0 0'>" ;
               o1 += "<center>" +
                     "<table class='table table-hover table-condensed table-bordered table-responsive' " +
                     "       style='margin:0'>" +
                     "<tbody class='no-ui-mini'>" +
                     "<tr>" +
                     "<td align=center width='33%'>" +
                     "  <span class='hidden-xs'>Interruption identificator</span>" +
                     "  <span class='visible-xs'>Int. Id.<br>(0 - 7)</span>" +
                     "</td>" +
                     "<td align=center width='33%'>" +
                     "  <span class='hidden-xs'>CLK period (<b>0</b> - &infin;)</span>" +
                     "  <span class='visible-xs'>CLK ticks <br>(<b>0</b> - &infin;)</span>" +
                     "</td>" +
                     "<td align=center width='33%'>" +
                     "  <span class='hidden-xs'>Probability (0 - 1)</span>" +
                     "  <span class='visible-xs'>Probability <br>(0 - 1)</span>" +
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
                     "<input type=number data-bind='value: period' min='0' " +
                     "       style='margin:0 0 0 3; padding:0 0 0 5'>" +
                     "</div>" +
                     "</td>" +
                     "<td align=center style='padding:0 0 0 0'>" +
                     "<div id='int" + i + "_pro' style='margin:0 3 0 3'>" +
                     "<input type=number data-bind='value: probability' min='0' max='1' step='.05' " +
                     "       style='margin:0 0 0 3; padding:0 0 0 5'>" +
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
            for (var i=0; i<IO_INT_FACTORY.length; i++)
            {
                 IO_INT_FACTORY[i].period = ko_observable(IO_INT_FACTORY[i].period) ;
                 var ko_context = document.getElementById('int' + i + '_per');
                 ko.applyBindings(IO_INT_FACTORY[i], ko_context);

                 IO_INT_FACTORY[i].probability = ko_observable(IO_INT_FACTORY[i].probability) ;
                 var ko_context = document.getElementById('int' + i + '_pro');
                 ko.applyBindings(IO_INT_FACTORY[i], ko_context);
            }

	    MP_wc = ko_observable(MP_wc) ;
            var ko_context = document.getElementById('mp_wc');
            ko.applyBindings(MP_wc, ko_context);
        }


        /*
         *  show_memories
         */

        var show_main_memory_deferred = null;
        var show_main_memory_redraw   = false;

        function show_main_memory ( memory, index, redraw, updates )
        {
            // if ($("#memory_MP").is(":visible") == false)
            //     return ;

            if (get_cfg('DBG_delay') > 5) 
                show_main_memory_redraw  = redraw || show_main_memory_redraw ;

            if (null != show_main_memory_deferred)
                return;

            show_main_memory_redraw = redraw ;
            show_main_memory_deferred = setTimeout(function () 
                                                   {
						        if (show_main_memory_redraw == false)
						    	    light_refresh_main_memory(memory, index, updates);
                                                        else hard_refresh_main_memory(memory, index, updates) ;

                                                        show_main_memory_deferred = null;
                                                        show_main_memory_updates  = false;

                                                   }, cfg_show_main_memory_delay);
        }

        function hard_refresh_main_memory ( memory, index, redraw )
        {
	    var o1 = "" ;
            var value = "" ;
            var sname = "" ;
            var taddr = "" ;

            var valkeys = new Array();

            // todo: move next block to the end of the assembler parser
            var SIMWARE = get_simware() ;

            var revlabels = new Object() ;
            for (var key in SIMWARE.labels2)
                 revlabels[SIMWARE.labels2[key]] = key ;

            var seglabels = new Object() ;
	    for (skey in segments)
                 seglabels[parseInt(segments[skey].begin)] = skey ;

            for (var key in memory)
            {
                value = main_memory_getword(revlabels, valkeys, memory, key) ;
                sname = seglabels[parseInt(key)] ;

                if (typeof sname != "undefined")
                    o1 += '<div style="position:sticky;top:0px;z-index:1;width:80%;background:#FFFFFF;"><b><small>' + sname + '</small></b></div>' ;

                taddr = '<small>0x</small>' + pack5(valkeys[3]) + '<span class="hidden-xs"> </span>-' + 
                        '<span class="hidden-xs"><small> 0x</small></span>' + pack5(valkeys[0]) ;
		if (key == index)
		     o1 += "<div class='row' id='addr" + key + "'" +
                           "     style='color:blue; font-size:small; font-weight:bold;    border-bottom: 1px solid lightgray !important'>" +
			   "<div class='col-xs-5 col-sm-5 col-md-5 col-lg-5' align='right'  style='padding:5'>" + taddr + "</div>" + 
			   "<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1' align='center' style='padding:0'></div>" + 
                           "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' align='left'   style='padding:5' id='mpval" + key + "'>" + value + "</div>" + 
                           "</div>" ;
		else o1 += "<div class='row' id='addr" + key + "'" +
                           "     style='color:black; font-size:small; font-weight:normal; border-bottom: 1px solid lightgray !important'>" +
			   "<div class='col-xs-5 col-sm-5 col-md-5 col-lg-5' align='right'  style='padding:5'>" + taddr + "</div>" + 
			   "<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1' align='center' style='padding:0'></div>" + 
                           "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' align='left'   style='padding:5' id='mpval" + key + "'>" + value + "</div>" + 
                           "</div>" ;
            }

	    if (typeof memory[index] == "undefined")
		o1 += "<div class='row'>" +
		      "<div class='col-xs-5 col-sm-5 col-md-5 col-lg-5' align='right'  style='padding:5'>" + 
                      "<font style='color:blue;font-size:small;font-weight:bold'>0x" + 
                      parseInt(index).toString(16) + 
                      "</font></div>" +
		      "<div class='col-xs-1 col-sm-1 col-md-1 col-lg-1' align='center' style='padding:5'></div>" + 
		      "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' align='left'   style='padding:5'>" +
                      "<font style='color:blue;font-size:small;font-weight:bold'><b>00 00 00 00</b></font></div>"+ 
                      "</div>";

            $("#memory_MP").html("<div class='container-fluid'>" + o1 + "</div>");

            // scroll up/down to index element...
	    var obj_byid = $('#addr' + index) ;
	    if ( (redraw) && (obj_byid.length > 0) )
            {
	        var topPos = obj_byid[0].offsetTop ;
	        var obj_byid = $('#memory_MP') ;
	        if (obj_byid.length > 0)
	            obj_byid[0].scrollTop = topPos - 100;
            }
        }

        function main_memory_getword ( revlabels, valkeys, memory, key )
        {
                if (typeof memory[key] == "undefined")
                    return "00 00 00 00" ;

		var value  = memory[key].toString(16) ;
		    value  = pack8(value) ;

                var i = 0;
                for (i=0; i<4; i++) {
		     valkeys[i] = (parseInt(key) + i).toString(16) ;
                }

                value2 = '' ;
                for (i=0; i<4; i++) 
                {
                     labeli = revlabels["0x" + valkeys[3-i]] ;
                     valuei = value[i*2] + value[i*2+1] ;

                     if (typeof labeli != "undefined")
                          value2 += '<span style="border:1px solid gray;">' + valuei + '</span>' +
                                    '<span class="label label-primary" style="position:relative;top:12px;right:8px;">' + labeli + '</span>' ;
                     else value2 += valuei + ' ' ;
                }

                return value2 ;
        }

        var old_main_addr = 0;

        function light_refresh_main_memory ( memory, index, redraw )
        {
            if (redraw)
            {
                var valkeys   = new Array() ;
                var SIMWARE   = get_simware() ;
                var revlabels = new Object() ;
                for (var key in SIMWARE.labels2)
                     revlabels[SIMWARE.labels2[key]] = key ;
                var svalue = main_memory_getword(revlabels, valkeys, memory, index) ;

                o1 = $("#mpval" + index) ;
                o1.html(svalue);
            }

            o1 = $("#addr" + old_main_addr) ;
            o1.css('color', 'black') ;
            o1.css('font-weight', 'normal') ;

            old_main_addr = index ;

            o1 = $("#addr" + old_main_addr) ;
            o1.css('color', 'blue') ;
            o1.css('font-weight', 'bold') ;
        }

        var show_control_memory_deferred = null;

        function show_control_memory ( memory, memory_dashboard, index, redraw )
        {
            if (null != show_control_memory_deferred)
                return;

            show_control_memory_deferred = setTimeout(function () {
						         if (false == redraw)
							      light_refresh_control_memory(memory, memory_dashboard, index);
                                                         else  hard_refresh_control_memory(memory, memory_dashboard, index, redraw);
                                                         show_control_memory_deferred = null;
                                                      }, cfg_show_control_memory_delay);
        }

        function hard_refresh_control_memory ( memory, memory_dashboard, index, redraw )
        {
	    var o1 = "" ;
            var value = "" ;
            var icon_theme = get_cfg('ICON_theme') ;

            var SIMWARE = get_simware() ;
            var revlabels = new Object() ;
            for (var key in SIMWARE.firmware)
                 revlabels[SIMWARE.firmware[key]["mc-start"]] = SIMWARE.firmware[key]["name"] ;

            var maddr = "" ;
            var trpin = "" ;
            for (var key in memory)
            {
		value = "" ;
		for (var ks in memory[key])
		{
		     if (1 == memory[key][ks]) {
			 value += ks + " ";
			 continue;
		     }

		     value += ks + "=" + parseInt(memory[key][ks]).toString(2) + " ";
		}

                maddr = "0x" + parseInt(key).toString(16) ;
                if (typeof revlabels[key] != "undefined")
                    maddr = '<span class="label label-primary" ' + 
                            '      style="position:relative;top:-10px;right:0px;">' + revlabels[key] + '</span>' +
                            '<span style="border:1px solid gray;">' + maddr + '</span>' ;

		trpin = "&nbsp;" ;
		if (true == memory_dashboard[key].breakpoint)
		    trpin = "<img alt='stop icon' height=22 src='images/stop_" + icon_theme + ".gif'>" ;

		if (key == index)
		     o1 += "<tr id='maddr" + key + "' " +
                           "    style='color:blue; font-size:small; font-weight:bold' " +
			   "    onclick='dbg_set_breakpoint(" + key + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" +
			   "<td width=12% align=right>" + maddr + "</td>" +
			   "<td width=1% id='mcpin" + key + "' style='padding:5 0 0 0;'>" + trpin + "</td>" +
			   "<td>" + value + "</td></tr>";
		else o1 += "<tr id='maddr" + key + "' " +
                           "    style='color:black; font-size:small; font-weight:normal' " +
			   "    onclick='dbg_set_breakpoint(" + key + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" +
			   "<td width=12% align=right>" + maddr + "</td>" +
			   "<td width=1% id='mcpin" + key + "' style='padding:5 0 0 0;'>" + trpin + "</td>" +
			   "<td>" + value + "</td></tr>";
            }

	    if (typeof memory[index] == "undefined") {
		o1 += "<tr>" +
		      "<td width=15%><font style='color:blue; font-size:small; font-weight:bold'>0x" + 
                      parseInt(index).toString(16) + 
                      "</font></td>" +
		      "<td><font style='color:blue; font-size:small; font-weight:bold'><b>&nbsp;</b></font></td></tr>";
            }

            $("#memory_MC").html("<center><table class='table table-hover table-condensed table-responsive'>" +
                                 "<tbody id=none>" + o1 + "</tbody>" +
                                 "</table></center>");

            // scroll up/down to index element...
	    var obj_byid = $('#maddr' + index) ;
	    if ( (redraw) && (obj_byid.length > 0) )
            {
	        var topPos = obj_byid[0].offsetTop ;
	        var obj_byid = $('#memory_MC') ;
	        if (obj_byid.length > 0)
	            obj_byid[0].scrollTop = topPos;
            }
        }

        var old_mc_addr = 0;

        function light_refresh_control_memory ( memory, memory_dashboard, index )
        {
            // if ($("#memory_MC").is(":visible") == false)
            //     return ;

            o1 = $("#maddr" + old_mc_addr) ;
            o1.css('color', 'black') ;
            o1.css('font-weight', 'normal') ;

            old_mc_addr = index ;

            o1 = $("#maddr" + old_mc_addr) ;
            o1.css('color', 'blue') ;
            o1.css('font-weight', 'bold') ;
        }

	function get_deco_from_pc ( pc )
	{
	        var hexstrpc = "0x" + pc.toString(16) ;

	        if ( (typeof FIRMWARE.assembly                  == "undefined") ||
	             (typeof FIRMWARE.assembly[hexstrpc]        == "undefined") ||
	             (typeof FIRMWARE.assembly[hexstrpc].source == "undefined") )
                {
                      return "";
                }

                return FIRMWARE.assembly[hexstrpc].source ;
        }


        var show_asmdbg_pc_deferred = null;

	function innershow_asmdbg_pc ( )
	{
	    fullshow_asmdbg_pc();
	    show_asmdbg_pc_deferred = null;
	}

	function show_asmdbg_pc ( )
	{
            if (get_cfg('DBG_delay') > 5)
	        return fullshow_asmdbg_pc();

            if (null == show_asmdbg_pc_deferred)
                show_asmdbg_pc_deferred = setTimeout(innershow_asmdbg_pc, cfg_show_asmdbg_pc_delay);
	}

        var old_addr = 0;

	function fullshow_asmdbg_pc ( )
	{
                var o1 = null ;
                var reg_pc    = get_value(sim_states["REG_PC"]) ;
                var curr_addr = "0x" + reg_pc.toString(16) ;

                if (typeof FIRMWARE.assembly[old_addr] != "undefined")
                {
                     o1 = $("#asmdbg" + old_addr) ;
                     o1.css('background-color', FIRMWARE.assembly[old_addr].bgcolor) ;
                }
                else
                {
                     for (l in FIRMWARE.assembly)
                     {
                          o1 = $("#asmdbg" + l) ;
                          o1.css('background-color', FIRMWARE.assembly[l].bgcolor) ;
                     }
                }
                old_addr = curr_addr ;

                o1 = $("#asmdbg" + curr_addr) ;
                o1.css('background-color', '#00EE88') ;

                return o1 ;
	}

        function asmdbg_set_breakpoint ( addr )
        {
                var icon_theme = get_cfg('ICON_theme') ;

                var hexaddr  = "0x" + addr.toString(16) ;
                var o1       = document.getElementById("bp"+hexaddr) ;
                var bp_state = FIRMWARE.assembly[hexaddr].breakpoint ;

                if (bp_state === true) {
                    bp_state = false ;
                    o1.innerHTML = "&nbsp;" ;
                } else {
                    bp_state = true ;
                    o1.innerHTML = "<img alt='stop icon' height=22 src='images/stop_" + icon_theme + ".gif'>" ;
                }

                FIRMWARE.assembly[hexaddr].breakpoint = bp_state ;
        }

        function dbg_set_breakpoint ( addr )
        {
                var icon_theme = get_cfg('ICON_theme') ;

                var o1       = document.getElementById("mcpin" + addr) ;
                var bp_state = MC_dashboard[addr].breakpoint ;

                if (bp_state === true) {
                    bp_state = false ;
                    o1.innerHTML = "&nbsp;" ;
                } else {
                    bp_state = true ;
                    o1.innerHTML = "<img alt='stop icon' height='22' src='images/stop_" + icon_theme + ".gif'>" ;
                }

                MC_dashboard[addr].breakpoint = bp_state ;

                if ( bp_state && ('instruction' == get_cfg('DBG_level')) )
                     $.notify({ title: '<strong>INFO</strong>', message: 'Please remember to change configuration to execute at microinstruction level.'},
                              { type: 'success',
                                newest_on_top: true,
                                delay: get_cfg('NOTIF_delay'),
                                placement: { from: 'top', align: 'center' } });
        }

	function show_dbg_mpc ( )
	{
                show_control_memory(MC,
                                    MC_dashboard,
                                    get_value(sim_states['REG_MICROADDR']),
                                    false) ;
	}

        var show_dbg_ir_deferred = null;

	function show_dbg_ir ( decins )
	{
            if (null != show_dbg_ir_deferred)
                return;

            show_dbg_ir_deferred = setTimeout(function() {
                                                   fullshow_dbg_ir(decins);
                                                   show_dbg_ir_deferred = null;
                                              }, cfg_show_dbg_ir_delay);
	}

	function fullshow_dbg_ir ( decins )
	{
	     var o = document.getElementById('svg_p');
	     if (o != null) o = o.contentDocument;
	     if (o != null) o = o.getElementById('tspan3899');
	     if (o != null) o.innerHTML = decins ;

	     var o = document.getElementById('svg_cu');
	     if (o != null) o = o.contentDocument;
	     if (o != null) o = o.getElementById('text3611');
	     if (o != null) o.innerHTML = decins ;
	}

        // Console (Screen + Keyboard)
        var screen_content = "" ;

	function get_screen_content ( )
	{
		 var scrobj = document.getElementById("kdb_con") ;
                 if (scrobj != null)
		     screen_content = scrobj.value ;

		 return screen_content ;
	}

	function set_screen_content ( screen )
	{
		 var scrobj = document.getElementById("kdb_con") ;
                 if (scrobj != null)
		     scrobj.value = screen ;

		 screen_content = screen ;
	}


        /*
         *  obj2html
         */

	function firmware2html ( fir, showBinary )
	{
		var filter =  [ "A0,0",   "B,0",    "C,0",   "SELA,5", "SELB,5", "SELC,2", "SELCOP,0",  "MR,0",  "MC,0",
				"C0,0",   "C1,0",   "C2,0",  "C3,0",   "C4,0",   "C5,0",   "C6,0",      "C7,0",
				"T1,0",   "T2,0",   "T3,0",  "T4,0",   "T5,0",   "T6,0",   "T7,0",      "T8,0",  "T9,0",  "T10,0", "T11,0",
				"M1,0",   "M2,0",   "M7,0",  "MA,0",   "MB,0", 
                                "SELP,0", "LC,0",   "SE,0",  "SIZE,0", "OFFSET,0",
                                "BW,0",   "R,0",    "W,0",   "TA,0",   "TD,0",   "IOR,0",  "IOW,0", 
                                "TEST_I,0",    "TEST_U,0"  ] ;

		var h = "<tr bgcolor=#FF9900>" +
                        "<td bgcolor=white     style='border-style: solid; border-width:0px; border-color:lightgray;'></td>" +
                        "<td bgcolor=lightblue style='border-style: solid; border-width:1px; border-color:lightgray;'>co</td>" +
                        "<td bgcolor=#FFCC00   style='border-style: solid; border-width:1px; border-color:lightgray;' align=center><small><b>&#181;dir</b></small></td>" +
                        "<td bgcolor=white     style='border-style: solid; border-width:0px; border-color:lightgray;'>&nbsp;&nbsp;</td>" ;
		var contSignals=1;
		for (var i=0; i<filter.length; i++) {
                     var s = filter[i].split(",")[0] ;
		     h += "<td align=center style='border-style: solid; border-width:1px;'><small><b>" + sim_signals[s].name + "</b></small></td>";
		     contSignals++;
		}
		h += "</tr>" ;
		
		var o  = "<center>";
		    o += "<table style='table-layout:auto; border-style: solid: border-width:0px; border-collapse:collapse;'>";

                var l = 0;
                var line = "";
		var ico  = "";
		var madd = "";
		for (var i=0; i<fir.length; i++)
		{
		    var mstart = fir[i]["mc-start"];
		    var mcode  = fir[i].microcode;
		    for (j=0; j<mcode.length; j++)
		    {
                         if (++l % 10 == 1)
		             o = o + h ;

			 ico = "";
			 if (typeof fir[i].co != "undefined")
			     ico = parseInt(fir[i].co, 2) ;
                         var isignature = fir[i].signature.split(',')[0] ;

                         line = "";
                         if (j==0)
                              line += "<td style='border-style: solid; border-width:0px; border-color:lightgray;'><span class='badge'>" + isignature + "</span>&nbsp;</td>" +
                                      "<td style='border-style: solid; border-width:1px; border-color:lightgray;'>" + ico + "</td>" ;
                         else line += "<td style='border-style: solid; border-width:0px; border-color:lightgray;'>&nbsp;</td>" +
                                      "<td style='border-style: solid; border-width:1px; border-color:lightgray;'>&nbsp;</td>" ;

                         if (showBinary)
                              madd = "0x" + (mstart + j).toString(16) ;
                         else madd = mstart + j ;

			 line += "<td align=center  style='border-style: solid; border-width:1px; border-color:lightgray;' bgcolor=white>" + madd + "</td>" +
                                 "<td bgcolor=white style='border-style: solid; border-width:0px; border-color:lightgray;'>&nbsp;</td>" ;
			 var mins = mcode[j] ;
		         for (var k=0; k<filter.length; k++)
			 {
                              var s = filter[k].split(",")[0] ;

			      var svalue = parseInt(sim_signals[s].default_value);
                              var newval = false;
			      if ( (typeof mins[s] != "undefined") && (!isNaN(parseInt(mins[s]))) )
                              {
				   svalue = parseInt(mins[s]);
                                   newval = true;
                              }

			      if ( (s == "SELA" || s == "SELB" || s == "SELC") &&
                                   (typeof mins["MADDR"] != "undefined") && (!isNaN(parseInt(mins["MADDR"]))) )
                              {
				   var fragment = parseInt(mins["MADDR"]).toString(2) ;
                                   fragment = "000000000000".substring(0, 12 - fragment.length) + fragment + "000" ;
                                   if (s == "SELA") {
                                       svalue = parseInt(fragment.substring(0,   5), 2);
                                       newval = true;
                                   }
                                   if (s == "SELB") {
                                       svalue = parseInt(fragment.substring(5,  10), 2);
                                       newval = true;
                                   }
                                   if (s == "SELC") {
                                       svalue = parseInt(fragment.substring(10, 15), 2);
                                       newval = true;
                                   }
                              }

                              if (showBinary)
                              {
			          var fragment = svalue.toString(2) ;
			          var nbits    = parseInt(sim_signals[s].nbits);
			          svalue = "00000000000000000000000000000000".substring(0, nbits - fragment.length) + fragment;

                                  var ngreen = filter[k].split(",")[1] ;
                                  var part1  = svalue.substring(0, ngreen);
                                  var part2  = svalue.substring(ngreen);
                                  svalue     = "<font color=green>" + part1 + "</font>" + part2 ;
                              }

			      if (newval)
			           line += "<td align=center style='border-style: solid; border-width:1px;'><b>" + svalue + "</b></td>";
			      else line += "<td align=center style='border-style: solid; border-width:1px;'><font color='grey'>" + svalue + "</font></td>";
			 }

			 o += "<tr>" + line + "</tr>" ;
		    }
		}

		o += "</table></center>";
		return o;
	}

	function labels2html_aux ( slebal, c )
	{
	     var clabel = "" ;
	     var wadd   = "" ;

             for (var j=3; j>=0; j--)
             {
	          wadd = "0x" + (parseInt(c)+j).toString(16);
	          if (typeof slebal[wadd] != "undefined")
                       for (var i=0; i<slebal[wadd].length; i++)
		            clabel = clabel + "<span class='badge'>" + slebal[wadd][i] + "</span>" ;
	          else clabel = clabel + "&nbsp;" ;
             }

	     return clabel ;
	}

	function mp2html ( mp, labels, seg )
	{
                var slebal = new Object();
                for (l in labels)
                {
                     if (typeof slebal[labels[l]] == "undefined")
                         slebal[labels[l]] = new Array();
                     slebal[labels[l]].push(l);
                }

		var o  = "";
		    o += "<center>" +
		 	 "<table style='table-layout:auto; border-style: solid; border-width:0px;'>" +
			 "<tr>" +
			 "<th style='border-style: solid; border-width:0px;'>labels</th>" +
			 "<th style='border-style: solid; border-width:1px;'>address</th>" +
			 "<th style='border-style: solid; border-width:1px;'>" +
                         "<table border=0 width=100%>" +
                       //"<tr><td colspan=8 align=center>content </td></tr>" +
                         "<tr align=center>" +
                         "  <td width=25% align=center><small><b>byte 3</b></small></td>" +
                         "  <td width=25% align=center><small><b>byte 2</b></small></td>" +
                         "  <td width=25% align=center><small><b>byte 1</b></small></td>" +
                         "  <td width=25% align=center><small><b>byte 0</b></small></td>" +
                         "</tr>" +
                         "<tr>" +
                         "  <td width=12% align=center >&nbsp;<sup>31&nbsp;&nbsp;......&nbsp;&nbsp;24</sup>&nbsp;</td>" +
                         "  <td width=12% align=center >&nbsp;<sup>23&nbsp;&nbsp;......&nbsp;&nbsp;16</sup>&nbsp;</td>" +
                         "  <td width=12% align=center >&nbsp;<sup>15&nbsp;&nbsp;......&nbsp;&nbsp;8</sup>&nbsp;</td>" +
                         "  <td width=12% align=center >&nbsp;<sup>7&nbsp;&nbsp;......&nbsp;&nbsp;0</sup>&nbsp;</td>" +
                         "</tr>" +
                         "</table>" +
			 "<th style='border-style: solid; border-width:0px;' align=right>&nbsp;&nbsp;segment</th>" +
			 "</tr>" ;

	   	var color="white";
	        for (skey in seg)
	        {
                     c_begin =  parseInt(seg[skey].begin) ;
                     c_end   =  parseInt(seg[skey].end) ;
		     color   =  seg[skey].color;
                     rows    =  0 ;
                     var x   =  "" ;

		     for (var i = c_begin; i<c_end; i++)
		     {
                             c = "0x" + i.toString(16) ;
                             if (typeof mp[c] == "undefined") {
                                 continue;
                             }

                             if (0 == rows) {
			         o += "<tr style=\"font-family:'Consolas'; font-size:11pt;\">" +
				      "<td align=right  style='border-style: solid; border-width:0px;'>" + labels2html_aux(slebal,c) + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + c.toUpperCase() + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" +
                                       mp[c].substr(0,8)  + "&nbsp;" + mp[c].substr(8,8)  + "&nbsp;" + mp[c].substr(16,8) + "&nbsp;" + mp[c].substr(24,8) + "</td>" +
				      "<td rowspan=" ;
                             } else {
			         x += "<tr style=\"font-family:'Consolas'; font-size:11pt;\">" +
				      "<td align=right  style='border-style: solid; border-width:0px;'>" + labels2html_aux(slebal,c) + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + c.toUpperCase() + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" +
                                      mp[c].substr(0,8)  + "&nbsp;" + mp[c].substr(8,8)  + "&nbsp;" + mp[c].substr(16,8) + "&nbsp;" + mp[c].substr(24,8) + "</td>" +
				      "</tr>" ;
                             }

                             rows++;
	             }

		     if (0 == rows) {
			 o += "<tr style=\"font-family:'Consolas'; font-size:12pt;\">" +
			      "<td>&nbsp;</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">0x" + parseInt(seg[skey].begin).toString(16).toUpperCase() + "</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">&nbsp;</td>" +
			      "<td rowspan=" ;
			 x += "<tr style=\"font-family:'Consolas'; font-size:12pt;\">" +
			      "<td>&nbsp;</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">0x" + parseInt(seg[skey].end).toString(16).toUpperCase() + "</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">&nbsp;</td>" +
			      "<td>&nbsp;</td>" +
			      "</tr>" ;
                        rows = 2 ;
		     }

                     o += rows + " align=right>" + seg[skey].name + "&nbsp;</td></tr>" + x ;

	             if (seg[skey].name != ".stack") {
		         o += "<tr style=\"font-family:'Consolas'; font-size:12pt;\">" +
                              "<td>&nbsp;</td>" +
                              "<td valign=middle align=center height=25px>...</td>" +
                              "<td valign=middle align=center height=25px>...</td>" +
                              "<td>&nbsp;</td>" +
                              "</tr>" ;
	             }
	        }

		o += "</table>" +
		     "</center><br>" ;

		return o;
	}

        function segments2html ( segments )
        {
	   var o1 = "<br>" ;

	   o1 += " <center>" +
                 " <table height=400px>" +
	         " <tr>" +
	         " <td>" +
	         "<table style='border-style: solid' border=1 width=100% height=100%>" ;
	   for (skey in segments)
	   {
	        if (segments[skey].name != ".stack")
	   	    o1 += "<tr><td valign=middle align=center height=60px bgcolor=" + segments[skey].color + ">" +
                          segments[skey].name +
                          "</td></tr>" +
	   	          "<tr><td valign=middle align=center height=25px>...</td></tr>" ;
	   }
	   o1 += "<tr><td valign=middle align=center bgcolor=" + segments['.stack'].color + ">" +
                 segments['.stack'].name +
                 "</td></tr>" +
	         "</table>" +
	         " </td>" +
	         " <td width=20px>&nbsp;</td>" +
	         " <td>" +
	         " <table style='border-style: solid; border-width:0px; width:100%; height:100%'>" ;

           var sx = "" ;
           var sp = "" ;
	   for (skey in segments)
	   {
	       sx = "<tr>" +
	   	    "    <td valign=top align=left height=30px style=''>" +
	   	    "    <div id='compile_begin_" + segments[skey].name + "'>" + segments[skey].begin + "</div>" +
	   	    "    </td>" +
	   	    " </tr>" +
	   	    " <tr>" +
	   	    "    <td valign=bottom align=left height=30px style=''>" +
	   	    "    <div id='compile_end_"   + segments[skey].name + "'>" + segments[skey].end + "</div>" +
	   	    "    </td>" +
	   	    " </tr>" ;

	       if (segments[skey].name != ".stack")
	   	    o1 += sx + "<tr><td valign=middle align=center height=25px>...</td></tr>" ;
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

	function assembly2html ( mp, labels, seg, asm )
	{
                var  s_label = "" ;
                var s1_instr = "" ;
                var s2_instr = "" ;
                var bgc = "#F0F0F0" ;
                var o = "" ;

                var a2l = new Object();
                for (l in labels) {
                     if (typeof a2l[labels[l]] == "undefined")
                         a2l[labels[l]] = new Array();
                     a2l[labels[l]].push(l);
                }

                var a2s = new Object();
                for (l in seg) {
                     laddr = "0x" + seg[l].begin.toString(16) ;
                     a2s[laddr] = l;
                }

                o += "<center><table data-role=table class='table ui-responsive'><tbody>" ;
                for (l in asm)
                {
                     if  (bgc == "#F0F0F0")
                          bgc = "#F8F8F8" ;
                     else bgc = "#F0F0F0" ;

                     asm[l].bgcolor = bgc ;

                     // instruction
                     s1_instr = asm[l].source ;
                     s2_instr = asm[l].source_original ;

                     // labels
                     s_label = "&nbsp;" ;
                     if (typeof a2l[l] != "undefined") {
                         for (var i=0; i<a2l[l].length; i++) {
                              s_label = s_label + "<span class='label label-primary'>" + a2l[l][i] + "</span>" ;
                         }
                     }

                     // join the pieces...
                     if (typeof a2s[l] != "undefined")
                         o += "<tr bgcolor='#FEFEFE'>" +
                              "<td colspan='7' style='line-height:0.3;' align=left><small><font color=gray>" + a2s[l] + "</font></small></td>"
                              "</tr>" ;

                     o +=  "<tr id='asmdbg" + l + "' bgcolor='" + asm[l].bgcolor + "'" +
                           "    onclick='asmdbg_set_breakpoint(" + l + "); " +
                           "             if (event.stopPropagation) event.stopPropagation();'>" +
                           "<td                                             width='2%'></td>" +
                           "<td class='asm_break'  style='line-height:0.9; padding:5 0 0 0;' width='10%' align='center' id='bp" + l + "'>&nbsp;</td>" +
                           "<td class='asm_addr'   style='line-height:0.9;' width='15%'>" + l + "</td>" +
                           "<td class='asm_label2' style='line-height:0.9;' width='10%' align=right>" + s_label + "</td>" +
                           "<td class='asm_pins'   style='line-height:0.9;' width='20%' align=left>"  + s2_instr + "</td>" +
                           "<td class='asm_label1' style='line-height:0.9;' width='10%' align=right>" + s_label + "</td>" +
                           "<td class='asm_ins'    style='line-height:0.9;' width='25%' align=left>"  + s1_instr + "</td>" +
                           "</tr>" ;
                }
                o += "</tbody></table></center>" ;

                return o ;
	}


        /* 
         * Show signal dependencies
         */
        function show_visgraph ( jit_fire_dep, jit_fire_order )
        {
            var tmp_hash  = new Object();
            var tmp_nodes = new Array();
            var tmp_id    = 0;
            for (var sig in sim_signals)
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
            for (var sig in sim_signals) {
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

