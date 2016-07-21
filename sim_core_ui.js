/*      
 *  Copyright 2015-2016 Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos
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

	function update_draw ( obj, value )
        {
            if (true == DRAW_stop)
                return ;

	    var draw_it = get_cfg('is_byvalue'); // 'is_byvalue' belongs to the sim_cfg.js
	    if (typeof sim_states["REG_MICROINS"].value[obj.name] != "undefined") {
		draw_it = true;
	    }
	    if ( (false == draw_it) && (typeof obj.depends_on != "undefined") )
	    {
		for (var k=0; k<obj.depends_on.length; k++) 
		{
		     if (typeof sim_states["REG_MICROINS"].value[obj.depends_on[k]] != "undefined") {
			     draw_it = true;
			     break;
		     }
		}
	    }

	    if (obj.draw_data.length > 1)
	    // (different draws)
	    {
		    for (var i=0; i<obj.draw_data.length; i++)
		    for (var j=0; j<obj.draw_data[i].length; j++) {
	                   obj_draw(obj.draw_data[i][j], (i==value) && draw_it, get_cfg('color_data_active'), get_cfg('color_data_inactive'), get_cfg('size_active'), get_cfg('size_inactive'));
		    }

		    for (var i=0; i<obj.draw_name.length; i++)
		    for (var j=0; j<obj.draw_name[i].length; j++) {
	                   obj_draw(obj.draw_name[i][j], (i==value) && draw_it, get_cfg('color_name_active'), get_cfg('color_name_inactive'), get_cfg('size_active'), get_cfg('size_inactive'));
		    }
	    }
	    else if (obj.nbits == 1)
	    // (same draw) && (nbits == 1)
	    {
		    for (var j=0; j<obj.draw_data[0].length; j++) {
	                   obj_draw(obj.draw_data[0][j], (0!=value) && draw_it, get_cfg('color_data_active'), get_cfg('color_data_inactive'), get_cfg('size_active'), get_cfg('size_inactive'));
		    }

		    for (var j=0; j<obj.draw_name[0].length; j++) {
	                   obj_draw(obj.draw_name[0][j], (0!=value) && draw_it, get_cfg('color_name_active'), get_cfg('color_name_inactive'), get_cfg('size_active'), get_cfg('size_inactive'));
		    }
	    }
	    else if (obj.draw_data.length == 1)
	    // (same draw) && (nbits > 1)
	    {
		    for (var j=0; j<obj.draw_data[0].length; j++) {
	                   obj_draw(obj.draw_data[0][j], draw_it, get_cfg('color_data_active'), get_cfg('color_data_inactive'), get_cfg('size_active'), get_cfg('size_inactive'));
		    }

		    for (var j=0; j<obj.draw_name[0].length; j++) {
	                   obj_draw(obj.draw_name[0][j], draw_it, get_cfg('color_name_active'), get_cfg('color_name_inactive'), get_cfg('size_active'), get_cfg('size_inactive'));
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

        function init_rf ( jqdiv )
        {
            if (jqdiv == "")
            {   // without ui
                return ;
            }

            if (get_cfg('is_editable') == true)
	    for (var index=0; index < sim_states['BR'].length; index++)
                 sim_states['BR'][index].value = ko.observable(sim_states['BR'][index].default_value);

            var o1_rf = "" ;
	    for (var index=0; index < sim_states['BR'].length; index++) 
            {
                 if (get_cfg('is_editable') == true)
		 o1_rf += "<div class='col-xs-2 col-sm-1 col-md-2 col-lg-1' id='name_RF" + index + "' style='padding: 0 15 0 5;'>" +
                          "R" + index + "</div>" + 
                          "<div class='col-xs-4 col-sm-2 col-md-4 col-lg-3' id='tbl_RF"  + index + "' style='padding: 0 5 0 35;'>" +
                          "<input size=10 data-role=none data-bind='value:value'>" +
                          "</div>" ;
                 else
		 o1_rf += "<div class='col-xs-2 col-sm-1 col-md-2 col-lg-1' id='name_RF" + index + "' style='padding: 0 15 0 5;'>" +
                          "R" + index + "</div>" + 
                          "<div class='col-xs-4 col-sm-2 col-md-4 col-lg-3' id='tbl_RF"  + index + "' style='padding: 0 5 0 35;'>" +
                          (get_value(sim_states['BR'][index]) >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() + "</div>" ; 
	    }

            $(jqdiv).html("<div class='row-fluid'>" + o1_rf + "</div>");

            // knockout binding
            if (get_cfg('is_editable') == true)
            for (var index=0; index < sim_states['BR'].length; index++)
            {
                 var ko_context = document.getElementById('tbl_RF' + index);
                 ko.applyBindings(sim_states['BR'][index], ko_context);
                 // sim_states['BR'][index].value.subscribe(function(newValue) {
                 //                                              this.ia("0x" + parseInt(newValue).toString(RF_display_format).toUpperCase());
                 //                                         });
            }
        }

        function show_rf_values ( ) 
        {
            if (get_cfg('is_editable') == true)
                return;

            var SIMWARE = get_simware() ;

	    for (var index=0; index < sim_states['BR'].length; index++) 
            {
                 var br_value = (get_value(sim_states['BR'][index]) >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() ;
                 if (16 == get_cfg('RF_display_format'))
                     br_value = "00000000".substring(0, 8 - br_value.length) + br_value ;

                 var obj = document.getElementById("tbl_RF" + index);
                 if (obj != null)
                     obj.innerHTML = br_value ;
	    }
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

            if (get_cfg('is_editable') == true)
            for (var i=0; i<filter.length; i++)
            {
                 var s = filter[i].split(",")[0] ;
                 sim_eltos[s].value = ko.observable(sim_eltos[s].default_value) ;
            }

            var o1 = "" ;
            for (var i=0; i<filter.length; i++)
            {
                var s = filter[i].split(",")[0] ;

                var showkey = sim_eltos[s].name;
                if (showkey.length > 7)
                    showkey = showkey.substring(0,7) + "..." ;

                var b = filter[i].split(",")[1] ;
                var divclass = divclasses[b] ;

                if (get_cfg('is_editable') == true)
                o1 += "<div class='" + divclass + "' style='padding: 0 5 0 5;'>" + showkey + "</div>" +
                      "<div class='" + divclass + "' id='tbl_" + s + "' style='padding: 0 5 0 0;'>" +
                      "<input size=10 data-role=none data-bind='value:value'>" +
                      "</div>" ;
                else
                o1 += "<div class='" + divclass + "' style='padding: 0 5 0 5;'>" + showkey + "</div>" +
                      "<div class='" + divclass + "' id='tbl_" + s + "' style='padding: 0 5 0 0;'>" +
                      sim_eltos[s].value.toString(get_cfg('RF_display_format')) +
                      "</div>" ;
            }

            $(jqdiv).html("<div class='row-fluid'>" + o1 + "</div>");

            // knockout binding
            if (get_cfg('is_editable') == true)
            for (var i=0; i<filter.length; i++)
            {
                 var s = filter[i].split(",")[0] ;
                 var ko_context = document.getElementById('tbl_' + s);
                 ko.applyBindings(sim_eltos[s], ko_context);
                 // sim_eltos[s].value.subscribe(function(newValue) {
                 //                                             this.ia("0x" + parseInt(newValue).toString(RF_display_format).toUpperCase());
                 //                                        });
            }
        }

        function show_eltos ( sim_eltos, filter ) 
        {
            if (get_cfg('is_editable') == true)
                return;

            for (var i=0; i<filter.length; i++)
            {
                var r = filter[i].split(",") ;
                var key = r[0] ;
                var value = sim_eltos[key].value.toString(get_cfg('RF_display_format')) ;

                if (sim_eltos[key].nbits > 1) {
                        value = (sim_states[key].value >>> 0).toString(get_cfg('RF_display_format')).toUpperCase() ;
                    if (16 == get_cfg('RF_display_format'))
                        value = "<font color=gray>" + "00000000".substring(0, 8 - value.length) + "</font>" + value ;
                }

		var obj = document.getElementById("tbl_" + key);
		if (obj != null)
                    obj.innerHTML = value ;
            }
        }


        var filter_states = [ "REG_IR_DECO,1",   
                              "REG_IR,0",  "REG_PC,0",  "REG_SR,0", 
                              "REG_RT1,0", "REG_RT2,0", "REG_RT3,0",    
                              "REG_MAR,0", "REG_MBR,0", "REG_MICROADDR,0",
                              "FLAG_C,0",  "FLAG_V,0",  "FLAG_N,0",  "FLAG_Z,0",     
                              "FLAG_I,0",  "FLAG_U,0" ] ;

        var divclasses = [ "col-xs-3 col-sm-3 col-md-3 col-lg-2",
                           "col-xs-6 col-sm-6 col-md-6 col-lg-6" ] ;

        function init_states ( jqdiv ) 
        {
            return init_eltos(jqdiv, sim_states, filter_states, divclasses ) ;
        }

        function show_states ( ) 
        {
            return show_eltos(sim_states, filter_states) ;
        }

        function init_io ( jqdiv )
        {
            if (jqdiv == "")
            {       // without ui
		    sim_states['CLK'].value = ko.observable(sim_states['CLK'].value);
		    sim_states['DECO_INS'].value = ko.observable(sim_states['DECO_INS'].value);
		    for (var i=0; i<IO_INT_FACTORY.length; i++)
			 IO_INT_FACTORY[i].accumulated = ko.observable(IO_INT_FACTORY[i].accumulated) ;
                    return ;
            }

            // stats holder
            var o1 = "<center>" ;
            o1 += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'>Instructions</div>" +
                  "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' id='ins_context'>" +
                  "<span data-bind='text: value'>&nbsp;</span>" + 
                  "</div>" ;
            o1 += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'>CLK ticks</div>" +
                  "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' id='clk_context'>" +
                  "<span data-bind='text: value'>&nbsp;</span>" + 
                  "</div>" ;
            o1 += "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>&nbsp;</div>" ;
            for (var i=0; i<IO_INT_FACTORY.length; i++)
            {
               o1 += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'>Interrupt " + i + "</div>" +
                     "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' id='int" + i + "_context'>" +
                     "<span data-bind='text: accumulated'>&nbsp;</span>" + 
                     "</div>" ;
            }
            o1 += "</center>" ;
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
			 IO_INT_FACTORY[i].period = ko.observable(IO_INT_FACTORY[i].period) ;
			 IO_INT_FACTORY[i].probability = ko.observable(IO_INT_FACTORY[i].probability) ;
		    }

		    MP_wc = ko.observable(MP_wc) ;
                    return ;
            }

            // html holder
            var o1 = "<div class='panel panel-default'>" + 
                     "<div class='panel-heading'>" +
                     "  <h3 class='panel-title'>I/O</h3>" +
                     "</div>" +
                     "<div class='panel-body'>" +
                     "  <div class='row-fluid'>" +
                     "  <center>" ;
            for (var i=0; i<8; i++)
            {
               if (0==i)
               o1 += "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>Interrupt Id.</div>" +
                     "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>CLK tick period</div>" +
                     "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>Probability (0.0-1.0)</div>" ;

               o1 += "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4' style='padding: 15 5 0 10;'>" + 
                     i + 
                     "</div>" +
                     "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4' style='padding: 0 5 0 10;' id='int" + i + "_per'>" +
                     "<input type=number data-bind='value: period' min='0'>" + 
                     "</div>" +
                     "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4' style='padding: 0 5 0 10;' id='int" + i + "_pro'>" +
                     "<input type=number data-bind='value: probability' min='0' max='1' step='.1'>" + 
                     "</div>" ;
            }
            o1 += "  </center>" +
                  "  </div>" +
                  "</div>" +
                  "</div>" ;

            o1 += "<div class='panel panel-default'>" + 
                  "<div class='panel-heading'>" +
                  "  <h3 class='panel-title'>Memory</h3>" +
                  "</div>" +
                  "<div class='panel-body'>" +
                  "  <div class='row-fluid'>" +
                  "  <center>" +
                  "  <div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' style='padding: 15 5 0 10;'>Memory wait cycles</div>" +
                  "  <div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' id='mp_wc'><input type=number data-bind='value: MP_wc' min=1></div>" +
                  "  </center>" + 
                  "  </div>" +
                  "</div>" +
                  "</div>" ;
          
            $(jqdiv).html(o1);

            // knockout binding
            for (var i=0; i<IO_INT_FACTORY.length; i++)
            {
                 IO_INT_FACTORY[i].period = ko.observable(IO_INT_FACTORY[i].period) ;
                 var ko_context = document.getElementById('int' + i + '_per');
                 ko.applyBindings(IO_INT_FACTORY[i], ko_context);

                 IO_INT_FACTORY[i].probability = ko.observable(IO_INT_FACTORY[i].probability) ;
                 var ko_context = document.getElementById('int' + i + '_pro');
                 ko.applyBindings(IO_INT_FACTORY[i], ko_context);
            }

	    MP_wc = ko.observable(MP_wc) ;
            var ko_context = document.getElementById('mp_wc');
            ko.applyBindings(MP_wc, ko_context);
        }


        /*
         *  show_memories
         */

        function show_memories ( name, memory, index ) 
        {
	    var o1 = "" ;
            var value = "" ;

            for (var key in memory)
            {
                 if (typeof memory[key] == "object") 
                 {
                        value = "" ;
                        for (var ks in memory[key])
                        {
                             if (1 == memory[key][ks]) {
                                 value += ks + " ";
                                 continue;
                             }

                             value += ks + "=" + parseInt(memory[key][ks]).toString(2) + " ";

                             /* // Future feature: control memory is shown as configured the display format.
                             var m_key_ks_value = parseInt(memory[key][ks]).toString(get_cfg('RF_display_format')) ;
                             if (16 == get_cfg('RF_display_format'))
                                  value += ks + "=0x" + m_key_ks_value + " ";
                             else 
                             if ( (8 == get_cfg('RF_display_format')) && (memory[key][ks] != 0) )
                                  value += ks + "=0"  + m_key_ks_value + " ";
                             else value += ks + "="   + m_key_ks_value + " ";
                             */
                        }

			if (key == index)
			     o1 += "<tr>" + 
                                   "<td width=15%>" + "0x" + parseInt(key).toString(16) + "</td>" + 
                                   "<td><b><div style='color: blue'>" + value + "</div></b></td></tr>";
			else o1 += "<tr>" + 
                                   "<td width=15%><small>" + "0x" + parseInt(key).toString(16) + "</small></td>" + 
                                   "<td          ><div><small>" + value + "</small></div></td></tr>";
		 }
                 else 
                 {
                        value  = memory[key].toString(16) ;
                        value  = "00000000".substring(0, 8 - value.length) + value ;
                        value2 = value[0] + value[1] + ' ' +
                                 value[2] + value[3] + ' ' +
                                 value[4] + value[5] + ' ' +
                                 value[6] + value[7] ;

                        key2 = parseInt(key).toString(16) ;
                      //key2 = "00000000".substring(0, 8 - key2.length) + key2 ;

                        key3 = (parseInt(key) + 3).toString(16) ;
                      //key3 = "00000000".substring(0, 8 - key3.length) + key3 ;

                        for (skey in segments) {
                             if (parseInt(segments[skey].begin) == parseInt(key))
			         o1 += "</tbody>" + "<tbody id=begin_" + skey + ">";
                        }

			if (key == index)
			     o1 += "<tr>" +
                                   "<td width=50%><font color=blue><b>" + "0x" + key3 + "-" + key2 + "</b></font></td>" +
                                   "<td          ><font color=blue><b>" +                   value2 + "</b></font></td></tr>" ;
			else o1 += "<tr>" +
                                   "<td width=50%><small>"              + "0x" + key3 + "-" + key2 + "</small></td>" +
                                   "<td          ><small>"              + value2                   + "</small></td></tr>" ;
		 }
            }

	    if (typeof memory[index] == "undefined")
		o1 += "<tr>" + 
		      "<td width=15%><font color=blue>0x" + parseInt(index).toString(16) + "</font></td>" + 
		      "<td><font color=blue><b>&nbsp;</b></font></td></tr>";

            $("#memory_" + name).html("<center><table class='table table-hover table-condensed table-responsive'>" + 
                                      "<tbody id=none>" + o1 + "</tbody>" +
                                      "</table></center>");
        }

	function get_deco_from_pc ( pc )
	{
                var decoded = "" ;
	        var hexstrpc = "0x" + pc.toString(16) ;
	        if (typeof FIRMWARE.assembly[hexstrpc].source != "undefined") 
	            decoded = FIRMWARE.assembly[hexstrpc].source ;

                return decoded ;
        }

	function show_asmdbg_pc ( )
	{
                var SIMWARE  = get_simware() ;
                var o1 = null ;

                for (l in SIMWARE.assembly)
                {
                     o1 = $("#asmdbg" + l) ;
                     o1.css('background-color', SIMWARE.assembly[l].bgcolor);
                }

                var reg_pc     = get_value(sim_states["REG_PC"]) ;
                var curr_addr  = "0x" + reg_pc.toString(16) ;

                o1 = $("#asmdbg" + curr_addr) ;
                o1.css('background-color', '#00EE88');
	}

	function show_dbg_mpc ( )
	{
                show_memories('MC', MC, get_value(sim_states['REG_MICROADDR'])) ;
	}

	function show_dbg_ir ( decins )
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
                                "I,0",    "U,0"  ] ;

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

	     wadd = "0x" + (parseInt(c)+3).toString(16);
	     if (typeof slebal[wadd] != "undefined") 
		  clabel = clabel + "<span class='badge'>" + slebal[wadd] + "</span>" ;
	     else clabel = clabel + "&nbsp;" ;
	     wadd = "0x" + (parseInt(c)+2).toString(16);
	     if (typeof slebal[wadd] != "undefined") 
		  clabel = clabel + "<span class='badge'>" + slebal[wadd] + "</span>" ;
	     else clabel = clabel + "&nbsp;" ;
	     wadd = "0x" + (parseInt(c)+1).toString(16);
	     if (typeof slebal[wadd] != "undefined") 
		  clabel = clabel + "<span class='badge'>" + slebal[wadd] + "</span>" ;
	     else clabel = clabel + "&nbsp;" ;
	     wadd = "0x" + (parseInt(c)+0).toString(16);
	     if (typeof slebal[wadd] != "undefined") 
		  clabel = clabel + "<span class='badge'>" + slebal[wadd] + "</span>" ;
	     else clabel = clabel + "&nbsp;" ;

	     return clabel ;
	}

	function mp2html ( mp, labels, seg )
	{
                var slebal = new Object();
                for (l in labels)
                     slebal[labels[l]] = l;

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
			         o += "<tr style='font-family:\'Consolas\'; font-size:11pt;'>" +
				      "<td align=right  style='border-style: solid; border-width:0px;'>" + labels2html_aux(slebal,c) + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + c.toUpperCase() + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + 
                                       mp[c].substr(0,8)  + "&nbsp;" + mp[c].substr(8,8)  + "&nbsp;" + mp[c].substr(16,8) + "&nbsp;" + mp[c].substr(24,8) + "</td>" +
				      "<td rowspan=" ;
                             } else {
			         x += "<tr style='font-family:\'Consolas\'; font-size:11pt;'>" +
				      "<td align=right  style='border-style: solid; border-width:0px;'>" + labels2html_aux(slebal,c) + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + c.toUpperCase() + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + 
                                      mp[c].substr(0,8)  + "&nbsp;" + mp[c].substr(8,8)  + "&nbsp;" + mp[c].substr(16,8) + "&nbsp;" + mp[c].substr(24,8) + "</td>" +
				      "</tr>" ;
                             }

                             rows++;
	             }

		     if (0 == rows) {
			 o += "<tr style='font-family:\'Consolas\'; font-size:12pt;'>" +
			      "<td>&nbsp;</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">0x" + parseInt(seg[skey].begin).toString(16).toUpperCase() + "</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">&nbsp;</td>" +
			      "<td rowspan=" ;
			 x += "<tr style='font-family:\'Consolas\'; font-size:12pt;'>" +
			      "<td>&nbsp;</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">0x" + parseInt(seg[skey].end).toString(16).toUpperCase() + "</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">&nbsp;</td>" +
			      "<td>&nbsp;</td>" +
			      "</tr>" ;
                        rows = 2 ;
		     } 

                     o += rows + " align=right>" + seg[skey].name + "&nbsp;</td></tr>" + x ;

	             if (seg[skey].name != "stack") {
		         o += "<tr style='font-family:\'Consolas\'; font-size:12pt;'>" + 
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
	        if (segments[skey].name != "stack")
	   	    o1 += "<tr><td valign=middle align=center bgcolor=" + segments[skey].color + ">" + 
                                segments[skey].name + "</td></tr>" +
	   	          "<tr><td valign=middle align=center height=25px>...</td></tr>" ;
	   }
	   o1 += "<tr><td valign=middle align=center bgcolor=" + segments['stack'].color + 
	         ">" + segments['stack'].name + "</td></tr>" +
	         "</table>" +
	         " </td>" +
	         " <td width=20px>&nbsp;</td>" +
	         " <td>" +
	         " <table style='border-style: solid; border-width:0px; width:100%; height:100%'>" ;

           var offset = 0 ;
	   for (skey in segments) 
	   {
               offset += 1 ;
	       if (segments[skey].name != "stack")
	   	 o1 += "<tr>" +
	   	       "    <td valign=middle align=center style='display: block; position: absolute;'>" +
	   	       "    <div id='compile_begin_" + segments[skey].name + "' " + 
                       "         style='position:relative; bottom:" + (3*offset) + "px;'>" + segments[skey].begin + "</div>" +
	   	       "    </td>" +
	   	       " </tr>" +
	   	       " <tr>" +
	   	       "    <td valign=middle align=center style='display: block; position: absolute;'>" +
	   	       "    <div id='compile_end_"   + segments[skey].name + "' " + 
                       "         style='position:relative; bottom:" + (2*offset) + "px;'>" + segments[skey].end + "</div>" +
	   	       "    </td>" +
	   	       " </tr>" ;
	   }
	   o1 += "  <tr>" +
	         "  <td valign=middle align=center style='display: block; position: absolute;'>" +
	         "<div id='compile_end_"  + segments['stack'].name + "' style='position:relative;bottom:25px;'>[SP_n]</div>"+
	         "<div id='compile_begin_" + segments['stack'].name + "' style='position:relative;bottom:-20px;'>[SP_0]</div>"+
	         "  </td>" +
	         "  </tr>" +
	         " </table>" +
	         " </td>" +
	         " </tr>" +
	         " </table>" +
	         " </center>" ;

	   return o1 ;
        }

	function assembly2html ( mp, labels, seg, asm )
	{
                var s1_label = "" ;
                var s1_instr = "" ;
                var s2_label = "" ;
                var s2_instr = "" ;
                var bgc = "#F0F0F0" ;
                var o = "" ;

                o += "<center><table data-role=table class='table ui-responsive'><tbody>" ;
                for (l in asm)
                {
                     if  (bgc == "#F0F0F0")
                          bgc = "#F8F8F8" ;
                     else bgc = "#F0F0F0" ;

                     asm[l].bgcolor = bgc ;

                     // without pseudo
                     r = asm[l].source.split(":") ;
                     if (r.length > 1) 
                     {
                         s1_label = r[0] + ":" ;
                         s1_instr = r[1] ;
                     }
                     else
                     {
                         s1_label = "&nbsp;" ;
                         s1_instr = r[0] ;
                     }

                     // with pseudo
                     r = asm[l].source_original.split(":") ;
                     if (r.length > 1) 
                     {
                         s2_label = r[0] + ":" ;
                         s2_instr = r[1] ;
                     }
                     else
                     {
                         s2_label = "&nbsp;" ;
                         s2_instr = r[0] ;
                     }

                     // join the pieces...
                     o +=  "<tr id='asmdbg" + l + "' bgcolor='" + asm[l].bgcolor + "'>" +
                           "<td                   style='line-height:0.9;' width='10%' id='bp" + l + "' " + 
                           "                      onclick='asmdbg_set_breakpoint(" + l + "); if(event.stopPropagation) event.stopPropagation();'>&nbsp;</td>" +
                           "<td                   style='line-height:0.9;' width='15%'>" + l + "</td>" +
                           "<td                   style='line-height:0.9;' width='10%' align=right>" + s1_label               + "</td>" +
                           "<td                   style='line-height:0.9;' width='29%' align=left>"  + s1_instr               + "</td>" +
                           "<td class='hidden-xs' style='line-height:0.9;' width='10%' align=right>" + s2_label               + "</td>" +
                           "<td class='hidden-xs' style='line-height:0.9;' width='25%' align=left>"  + s2_instr               + "</td>" +
                           "</tr>" ;
                }
                o += "</tbody></table></center>" ;

                return o ;
	}


        /*
         *  play/stop
         */

        var DBG_stop  = true ;

	function asmdbg_set_breakpoint ( addr )
	{
                var SIMWARE  = get_simware() ;
                var hexaddr  = "0x" + addr.toString(16) ;

                var o1       = document.getElementById("bp"+hexaddr) ;
                var bp_state = SIMWARE.assembly[hexaddr].breakpoint ;

                if (bp_state === true) {
		    bp_state = false ;
                    o1.innerHTML = '&nbsp;' ;
	        } else {
	 	    bp_state = true ;
                    o1.innerHTML = '<img height=22 src="images/stop.png">' ;
	        }

                SIMWARE.assembly[hexaddr].breakpoint = bp_state ;
	}

	function asmdbg_stop ( btn1 )
	{
                $(btn1).html("Run") ;
                $(btn1).removeClass("ui-icon-minus") ;
                $(btn1).addClass("ui-icon-carat-r") ;
                $(btn1).css("backgroundColor", "#CCCCCC") ;

                DBG_stop = true;
	}

	function asmdbg_play ( btn1 )
	{
                $(btn1).css("backgroundColor", 'rgb(51, 136, 204)') ;
                $(btn1).html("Stop") ;
                $(btn1).removeClass("ui-icon-carat-r") ;
                $(btn1).addClass("ui-icon-minus") ;

                if (DBG_stop) 
                {
	            asmdbg_stop(btn1) ;
                    return ;
                }

                var ret = false ;
	        if (get_cfg('DBG_level') == "instruction")
                     ret = execute_instruction() ;
                else ret = execute_microinstruction() ;

                if (ret === false) 
                {
	            asmdbg_stop(btn1) ;
                    return ;
                }

                var SIMWARE = get_simware() ;
                reg_pc      = get_value(sim_states["REG_PC"]) ;
                curr_addr   = "0x" + reg_pc.toString(16) ;

                if ( (typeof SIMWARE.assembly[curr_addr] != "undefined") && (SIMWARE.assembly[curr_addr].breakpoint) ) 
                {
	            asmdbg_stop(btn1) ;
                    alert("Breakpoint @ " + curr_addr + ":\n" + 
                          "Instruction at " + curr_addr + " is going to be fetched.") ;
                    return ;
                }

                setTimeout(asmdbg_play, get_cfg('DBG_delay'), btn1) ;
	}

