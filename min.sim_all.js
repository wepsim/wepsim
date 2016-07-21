/*      
 *  Copyright 2015-2016 Alejandro Calderon Mateos, Javier Prieto Cepeda, Felix Garcia Carballeira
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


        var WSCFG = new Object() ;
        WSCFG['version'] = { value:"1.5.3", type:"string"} ;

        function get_cfg ( field )
        {
               return WSCFG[field].value ;
        }

        function set_cfg ( field, value )
        {
               WSCFG[field].value = value ;
        }

        function reset_cfg ( )
        {
		/*
		 *  SVG configuration
		 */
               WSCFG['color_data_active']   = { value:"#0066FF",          type:"string"} ;
               WSCFG['color_data_inactive'] = { value:"rgb(0, 0, 0)",     type:"string"} ; // "black"

               WSCFG['color_name_active']   = { value:"red",              type:"string"} ;
               WSCFG['color_name_inactive'] = { value:"rgb(0, 0, 0)",     type:"string"} ; // "black"

	       WSCFG['size_active']         = { value:1.22,               type:"float"} ;
	       WSCFG['size_inactive']       = { value:0.02,               type:"float"} ;

		/*
		 *  UI configuration
		 */
               WSCFG['DBG_delay']           = { value:10,                 type:"int"} ;
               WSCFG['DBG_level']           = { value:"instruction",      type:"string"} ;

               WSCFG['RF_display_format']   = { value:16,                 type:"int"} ;
               WSCFG['RF_display_name']     = { value:'numerical',        type:"string"} ;

               WSCFG['NOTIF_delay']         = { value:500,                type:"int"} ;

		/*
		 *  SIM working
		 */

               WSCFG['is_interactive']      = { value:true,         type:"boolean"};
               WSCFG['is_byvalue']          = { value:false,        type:"boolean"};
               WSCFG['is_editable']         = { value:false,        type:"boolean"};

               WSCFG['ws_idiom']            = { value:'es',         type:"string"};
        }


        /*
         *  Persistence
         */

        function save_cfg ( )
        {
	   try 
	   {
                for (var item in WSCFG) 
                     localStorage.setItem('wepsim_' + item, get_cfg(item));
	   }
           catch(err) {
                console.log("WepSIM can not save the configuration in a persistent way on this web browser, found error: \n" + err.message);
	   }
        }

        function restore_cfg ( )
        {
           reset_cfg() ;

           for (var item in WSCFG) 
           {
                if (item == 'version')
                    continue;

                try 
                {
                   set_cfg(item, localStorage.getItem('wepsim_' + item)) ;
                   if (WSCFG[item].type != "string")
                       set_cfg(item, JSON.parse(get_cfg(item)));
                   if (get_cfg(item) == null)
                       throw "null values discarted";
                }
                catch(err) {
                   console.log("WepSIM can not restore the configuration on this web browser, found error: \n" + err.message);
                   reset_cfg() ;
                   return;
                }
           }
        }

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
         *  checking & updating
         */

        function check_ib ( fired )
        {
            // TD + R
            $("#databus_fire").hide();
            if ( (sim_signals["TD"].value != 0) && (sim_signals["R"].value != 0) )
            {
                $("#databus_fire").show();
                sim_states["BUS_DB"].value = 0xFFFFFFFF;
            }

            // Ti + Tj
            var tri_name = "";
            var tri_state_names = [ "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11" ] ;

            if (tri_state_names.indexOf(fired) == -1)
                return; 

            // 1.- counting the number of active tri-states 
            var tri_activated = 0;
	    var tri_activated_name = "";
            for (var i=0; i<tri_state_names.length; i++)
            {
                 tri_name = tri_state_names[i] ;
                 if (sim_signals[tri_name].value != 0)
		 {
                     tri_activated ++ ;
		     tri_activated_name=tri_name;
		 }
                 if (tri_activated > 1)
                     break ;
            }

            // 2.- paint the bus if any tri-state is active
            if (tri_activated > 0) 
                update_draw(sim_signals[tri_activated_name], 1) ;

            // 3.- check if more than one tri-state is active
            $("#internalbus_fire").hide();
            if (tri_activated > 1) {
                $("#internalbus_fire").show();
                sim_states["BUS_IB"].value = 0xFFFFFFFF;
            }       
        }

        function check_behavior ( )
        {
            for (var key in sim_signals)
            {
                for (var key2 in sim_signals[key].behavior)
                {
		    // 1.- Split several behaviors, example: "MV D1 O1; MV D2 O2"
                    var behaviors = sim_signals[key].behavior[key2].split(";") ;

		    // 2.- For every behavior...
		    for (var i=0; i<behaviors.length; i++)
                    {
			    var behavior_i = behaviors[i].trim();
			    var behavior_k = behavior_i.split(" ") ;

			    if ("" == behavior_i)  {
                                continue;
			    }

			    if (typeof (syntax_behavior[behavior_k[0]]) == "undefined")
			    {
				alert("ALERT: Unknown operation -> " + behavior_k[0] + " (" + behavior_i + ")");
				return;
			    }

			    if (behavior_k.length != syntax_behavior[behavior_k[0]].nparameters)
			    {
				alert("ALERT: Behavior has an incorrect number of elements --> " + behavior_i + "/" + syntax_behavior[behavior_k[0]].nparameters);
				return;
			    }

			    for (var j=1; j<behavior_k.length; j++) 
			    {
				if ("E" == syntax_behavior[behavior_k[0]].types[j-1])
				{
				     var s = behavior_k[j].split('/') ;

				     if (typeof (sim_states[s[0]]) == "undefined") 
				     {
					 alert("ALERT: Behavior has an undefined reference to a object state -> '" + behavior_i);
					 return;
				     }
				}
				else if ("S" == syntax_behavior[behavior_k[0]].types[j-1])
				{
				     var s = behavior_k[j].split('/') ;

				     if (typeof (sim_signals[s[0]]) == "undefined")
				     {
					 alert("ALERT: Behavior has an undefined reference to a signal -> '" + behavior_i);
					 return;
				     }
				}
			    }
                    }
                }
            }
        }

        function load_check()
        {
            // 1.- check if no signals are defined...
            if (0 == sim_signals.length) {
                alert("ALERT: empty signals!!!");
            }

            // 2.- check if no states are defined...
            if (0 == sim_states.length) {
                alert("ALERT: empty states!!!");
            }

            // 3.- check behavior syntax...
            check_behavior();
        }

        function compute_behavior (input_behavior)
        {
            // 1.- Split several behaviors, e.g.: "MV D1 O1; MV D2 O2"
            var s_exprs = input_behavior.split(";");

            // 2.- For every behavior...
            for (var i=0; i<s_exprs.length; i++)
            {
                    // 2.1.- ...to remove white spaces from both sides, e.g.: "  MV D1 O1  " (skip empty expression, i.e. "")
		    s_exprs[i] = s_exprs[i].trim() ;
                    if ("" == s_exprs[i]) continue ;

                    // 2.2.- ...to split into expression, e.g.: "MV D1 O1"
		    var s_expr = s_exprs[i].split(" ");

                    // 2.3.- ...to do the operation 
		    syntax_behavior[s_expr[0]].operation(s_expr);
            }
        }

        function update_state ( key )
        {
           var signal_value = 0;
           var input_behavior = "";

           switch(sim_signals[key].behavior.length)
           {
                case 0:
                     return; // Cuando behavior no tiene comportamiento, no hacemos nada en actualizacion de estado
                     break;

                case 1:
                     signal_value = sim_signals[key].value ;
                     input_behavior = sim_signals[key].behavior[0] ;
                     break;

                default:
                     signal_value = sim_signals[key].value ;
                     if (signal_value < sim_signals[key].behavior.length)
                          input_behavior = sim_signals[key].behavior[signal_value] ;
                     else alert('ALERT: there are more signals values than behaviors defined!!!!\n' +
                                'key: ' + key + ' and signal value: ' + signal_value);
                     break;
           }

           compute_behavior(input_behavior) ;
        }


        function get_value ( sim_obj )
        {
	   if (typeof sim_obj.value == "function")
	       return sim_obj.value() ;

	   else if (typeof sim_obj.default_value == "object")
	       return sim_obj.value ;

	   else
	       return sim_obj.value ;
        }

        function set_value ( sim_obj, value )
        {
	   if (typeof sim_obj.value == "function")
	       sim_obj.value(value) ;

	   else if (typeof sim_obj.default_value == "object")
	       sim_obj.value = value ;

	   else
	       sim_obj.value = value ;
        }

        function reset_value ( sim_obj )
        {
           if (typeof sim_obj.value == "function")
	        sim_obj.value(sim_obj.default_value) ;

	   else if (typeof sim_obj.default_value == "object")
	        sim_obj.value = Object.create(sim_obj.default_value) ;

	   else if (typeof sim_obj == "array")
	        for(var i=0; i<sim_obj.length; i++)
	  	    sim_obj[i].value(sim_obj[i].default_value) ;

	   else
	        sim_obj.value = sim_obj.default_value ;
        }


        function show_memories_values ( )
        {
            show_memories('MP',  MP,  get_value(sim_states['REG_PC'])) ;
            show_memories('MC',  MC,  get_value(sim_states['REG_MICROADDR'])) ;
	}

        function update_signal_firmware ( key )
        {
            var SIMWARE = get_simware() ;

	    var assoc_i = -1;
            for (var i=0; i<SIMWARE['firmware'].length; i++) {
		 if (parseInt(SIMWARE['firmware'][i]["mc-start"]) > get_value(sim_states["REG_MICROADDR"])) { break; }
		 assoc_i = i ;
            }

            if (-1 == assoc_i) 
            {
	        alert("A new 'unknown' instruction is inserted,\n" + 
                      "please edit it (co, nwords, etc.) in the firmware textarea.") ;

                var new_ins = new Object() ;
                new_ins["name"]            = "unknown" ;
                new_ins["signature"]       = "unknown" ;
                new_ins["signatureGlobal"] = "unknown" ;
                new_ins["co"]              = 0 ;
                new_ins["nwords"]          = 0 ;
                new_ins["mc-start"]        = 0 ;
                new_ins["fields"]          = new Array() ;
                new_ins["microcode"]       = new Array() ;

                SIMWARE['firmware'].push(new_ins) ;
                assoc_i = SIMWARE['firmware'].length - 1 ;
            }

	    var pos = get_value(sim_states["REG_MICROADDR"]) - parseInt(SIMWARE['firmware'][assoc_i]["mc-start"]) ;
	    if (typeof SIMWARE['firmware'][assoc_i]["microcode"][pos] == "undefined") {
		SIMWARE['firmware'][assoc_i]["microcode"][pos] = new Object() ;
	    }
	    SIMWARE['firmware'][assoc_i]["microcode"][pos][key] = sim_signals[key].value ;

            if (sim_signals[key].default_value == sim_signals[key].value)
	        delete SIMWARE['firmware'][assoc_i]["microcode"][pos][key] ;

	    // show memories...
	    var bits = get_value(sim_states['REG_IR']).toString(2) ;
	    bits = "00000000000000000000000000000000".substring(0, 32 - bits.length) + bits ;
	    //var op_code = parseInt(bits.substr(0, 6), 2) ; // op-code of 6 bits

            show_memories_values() ;
	}

        function update_signal_loadhelp ( helpdiv, key )
        {
	     $(helpdiv).collapse('toggle');
	     var help_base = 'help/signals-' + get_cfg('ws_idiom') + '.html #' + key;
	     $(helpdiv).load(help_base,
			      function(response, status, xhr) { 
				  if ( $(helpdiv).html() == "" ) 
				       $(helpdiv).html('<br>Sorry, No more details available for this signal.<p>\n'); 
				  $(helpdiv).trigger('create'); 
			      });
	}
 
        function update_signal (event)
        {
	    if (false === get_cfg('is_interactive'))
                return;

            for (var key in sim_signals)
            {
                for (var j=0; j<sim_signals[key].fire_name.length; j++)
                {
	            var r = sim_signals[key].fire_name[j].split(':') ;
                    if (r[1] == event.currentTarget.id)
                    {
                        var nextvalue = 0;
                        if (sim_signals[key].nbits == 1) 
                            nextvalue = ((sim_signals[key].value >>> 0) + 1) % 2;

                        var str_checked = "";
                        var input_help  = "";

                        var nvalues = Math.pow(2, sim_signals[key].nbits) ;
                        if (sim_signals[key].behavior.length == nvalues)
                        {
                            for (var k = 0; k < sim_signals[key].behavior.length; k++) 
                            {
                                 if (k == nextvalue)
                                      str_checked = ' checked="checked" ' ;
                                 else str_checked = ' ' ;

				 input_help += '<li><label>' + 
                                               '<input type="radio" name="ask_svalue" ' + ' value="' + k.toString(10) + '" ' + str_checked + ' />' + 
                                               '&nbsp;' + sim_signals[key].behavior[k].split(";")[0] + ', ...</label></li>' ;
                            }
                        }
                        else {
				 input_help += '<div><label>' + 
                                               '<input type="number" size=4 min=0 max=' + (nvalues - 1) + ' name="ask_svalue" ' + 
                                               '       value="' + sim_signals[key].value + '"/>' + '&nbsp;&nbsp;' + ' 0 - ' + (nvalues - 1) +
                                               '</label></div>\n' ;
                        }

			bootbox.dialog({
			       title:   'Decimal values for ' + key + ': ',
			       message: '<div class="panel panel-default">' +
                                        '  <div class="panel-heading"  ' + 
                                        '      style="background-color: #D4E017; -webkit-text-shadow: none; text-shadow: none; border-color: #D4E017; background-color: #D4E017; background-image: none;" ' +
                                        '      onclick=\'update_signal_loadhelp("#help2",$("#ask_skey").val());\'><b>Press here to search additional details or close details...</b>' + 
                                        '  </div>' +
                                        '  <div id=help2 class="panel-collapse collapse" style="max-height:60vh; width: inherit; overflow-x: auto">Loading...</div>' + 
                                        '</div>' +
                                        '<form class="form-horizontal">' + 
					'<input id="ask_skey"   name="ask_skey"   type="hidden" value="' + key + '" class="form-control input-md"> ' +
                                        '<ol start="0">' +
                                        input_help +
                                        '</ol>' +
					'</form>',
			       value:   sim_signals[key].value,
                               animate: false,
			       buttons: {
					    close: {
						label: "Close",
						className: "btn-danger",
						callback: function() { }
					    },
					    success: {
						label: "Save",
						className: "btn-success",
						callback: function () 
							  {
							     key        = $('#ask_skey').val();
							     user_input = $("input[name='ask_svalue']:checked").val();
                                                             if (typeof user_input == "undefined")
							         user_input = $("input[name='ask_svalue']").val();

							     sim_signals[key].value = user_input ;

	                                                     if (true === get_cfg('is_interactive'))
							     {
								 // update REG_MICROINS
								 sim_states["REG_MICROINS"].value[key] = sim_signals[key].value ;

								 // update MC[uADDR]
								 if (typeof MC[get_value(sim_states["REG_MICROADDR"])] == "undefined") {
								     MC[get_value(sim_states["REG_MICROADDR"])] = new Object() ;
								 }
								 MC[get_value(sim_states["REG_MICROADDR"])][key] = sim_signals[key].value ;

								 // update ROM[..]
								 update_signal_firmware(key) ;

								 // update save-as...
								 var SIMWARE = get_simware() ;
								 document.getElementById("inputFirmware").value = saveFirmware(SIMWARE) ;
							     }
							
							     // fire signal
							     compute_behavior('FIRE ' + key) ;
							  }
					    }
					}
			});

                    } // if (event.name == signals.firename.name)
                } // for all signals.firename...
            } // for all signals

	    show_states();
	    show_rf_values();
        }

        function update_memories ( preSIMWARE )
        {
	    // 1.- load the SIMWARE
            set_simware(preSIMWARE) ;
            var SIMWARE = get_simware() ;

	    // 2.- load the MC from ROM['firmware']
            MC = new Object() ;
            for (var i=0; i<SIMWARE['firmware'].length; i++)
	    {
	       var last = SIMWARE['firmware'][i]["microcode"].length ; // mc = microcode
               var mci  = SIMWARE['firmware'][i]["mc-start"] ;
	       for (var j=0; j<last; j++)
	       {
		   MC[mci] = SIMWARE['firmware'][i]["microcode"][j] ;
		   mci++;
	       }
	    }

	    // 3.- load the ROM (2/2)
            ROM = new Object() ;
            for (var i=0; i<SIMWARE['firmware'].length; i++)
	    {
               if ("begin" == SIMWARE['firmware'][i]['name']) {
                   continue ;
               }

	       var ma = SIMWARE['firmware'][i]["mc-start"] ;
	       var co = parseInt(SIMWARE['firmware'][i]["co"], 2) ;
               var cop = 0 ;
	       if (typeof SIMWARE['firmware'][i]["cop"] != "undefined")
	           cop = parseInt(SIMWARE['firmware'][i]["cop"], 2) ;

               var rom_addr = 64*co + cop ;
	       ROM[rom_addr] = ma ;
               SIMWARE['cihash'][rom_addr] = SIMWARE['firmware'][i]['signature'] ;
	    }

	    // 4.- load the MP from SIMWARE['mp']
            MP = new Object() ;
	    for (var key in SIMWARE['mp'])
	    {
	       var kx = parseInt(key)
	       var kv = parseInt(SIMWARE['mp'][key].replace(/ /g,''), 2) ;
	       MP[kx] = kv ;
	    }

	    // 5.- load the segments from SIMWARE['seg'] 
            segments = new Object() ;
	    for (var key in SIMWARE['seg'])
	    {
	       segments[key] = SIMWARE['seg'][key] ;
	    }

	    // 6.- show memories...
            show_memories('MP',  MP,  1) ;
            show_memories('MC',  MC,  1) ;
	}
 

        /*
         *  USER INTERFACE
         */

        /* 1) INIT */
        function init ()
        {
            // 1.- it checks if everything is ok 
            load_check() ;

            // 2.- display the information holders
            init_states("#states_ALL") ; 
            init_rf("#states_BR") ; 

            init_io("#io_ALL") ; 
            init_config("#config_ALL") ; 
        }

        function init_eventlistener ( context )
        {
            // 3.- for every signal, set the click event handler
            for (var key in sim_signals) 
            {
                for (var j=0; j<sim_signals[key].fire_name.length; j++)
                {
			   var r = sim_signals[key].fire_name[j].split(':') ;
			   if (r[0] != context) {
			       continue;
                           }

  			   var o = document.getElementById(r[0]).contentDocument ;
                           if (null == o)  {
                               console.log('warning: unreferenced graphic element context named "' + r[0] + '".');
                               continue;
                           }

  			   var u = o.getElementById(r[1]) ;
                           if (null == u)  {
                               console.log('warning: unreferenced graphic element named "' + r[0] + ':' + r[1] + '".');
                               continue;
                           }

  			   u.addEventListener('click', update_signal, false);
                }
            }
        }

        /* 2) EXECUTION */
        function reset()
        {
	    var SIMWARE = get_simware() ;
            compute_behavior("RESET") ;

            if ((typeof segments['.ktext'] != "undefined") && (SIMWARE.labels2["kmain"])){
                    set_value(sim_states["REG_PC"], parseInt(SIMWARE.labels2["kmain"])); 
                    show_asmdbg_pc() ;
	    }
            else if ((typeof segments['.text'] != "undefined") && (SIMWARE.labels2["main"])){
                    set_value(sim_states["REG_PC"], parseInt(SIMWARE.labels2["main"])); 
                    show_asmdbg_pc() ;
	    }

	    if (typeof segments['.stack'] != "undefined")
	    {
		set_value(sim_states["BR"][FIRMWARE.stackRegister], parseInt(segments['.stack'].begin));
	    }

            compute_behavior("CLOCK") ;

            show_dbg_ir(get_value(sim_states['REG_IR_DECO'])) ;
	    show_states() ;
            show_rf_values();
            show_rf_names();
	    show_memories('MP',  MP,  0) ;
	    show_memories('MC',  MC,  0) ;
        }

        function execute_microinstruction ()
        {
	        if (false === get_cfg('is_interactive'))
                {
			if ( (typeof segments['.ktext'] == "undefined") &&
			     (typeof segments['.text']  == "undefined") )
			{
			    alert('code segment .ktext/.text does not exist!');
			    return false;
			}

                        var reg_pc = parseInt(get_value(sim_states["REG_PC"]));
			if (  
                             (parseInt(get_value(sim_states["REG_MICROADDR"])) == 0) &&
                             ((reg_pc >= parseInt(segments['.ktext'].end)) || (reg_pc < parseInt(segments['.ktext'].begin))) &&
                             ((reg_pc >= parseInt(segments['.text'].end))  || (reg_pc < parseInt(segments['.text'].begin))) 
                           )
			{
			    alert('PC register points outside .ktext/.text code segments!');
			    return false;
			}
                }

                compute_behavior("CLOCK") ;

		show_states();
		show_rf_values();
                show_dbg_mpc();
        }

        function execute_microprogram ()
        {
                // 1.- while the microaddress register doesn't store the fetch address (0), execute micro-instructions
		do    
            	{
                	compute_behavior("CLOCK") ;
            	}
		while (
                         (0 != get_value(sim_states["REG_MICROADDR"])) && 
                         (typeof MC[get_value(sim_states["REG_MICROADDR"])] != "undefined") 
                      );

		show_states();
		show_rf_values();
                if (get_cfg('DBG_level') == "microinstruction")
                    show_dbg_mpc();
        }

        function execute_instruction ()
        {
	    var SIMWARE = get_simware();

               if ( 
                  (! ((typeof segments['.ktext'] != "undefined") && (SIMWARE.labels2["kmain"])) ) &&
                  (! ((typeof segments['.text'] != "undefined") && (SIMWARE.labels2["main"]))   )
                )
                {
		    alert("labels 'kmain' (in .ktext) or 'main' (in .text) do not exist!");
                    return false;
	        }


                if ( (typeof segments['.ktext'] == "undefined") &&
                     (typeof segments['.text']  == "undefined") )
                {
                    alert('code segment .ktext/.text does not exist!');
                    return false;
                }

                var reg_pc = parseInt(get_value(sim_states["REG_PC"]));
		if ( 
                      (parseInt(get_value(sim_states["REG_MICROADDR"])) == 0) &&
		     ((reg_pc >= parseInt(segments['.ktext'].end)) || (reg_pc < parseInt(segments['.ktext'].begin))) &&
		     ((reg_pc >= parseInt(segments['.text'].end))  || (reg_pc < parseInt(segments['.text'].begin))) 
                   )
                {
		    alert('PC register points outside .ktext/.text code segments!');
                    return false;
                }

                execute_microprogram() ;
                return true;
        }

        /* 3) LOAD/SAVE */
        function load_firmware ( textFromFileLoaded )
        {
                if ("" == textFromFileLoaded.trim())
                {
                    var preSIMWARE = new Object() ;
                    preSIMWARE.error = 'Empty Firmware' ;
                    return preSIMWARE;
                }

                try 
                {
			var preSIMWARE = JSON.parse(textFromFileLoaded);
			update_memories(preSIMWARE);
                        preSIMWARE.error = null;
                        return preSIMWARE;
                }
                catch (e) 
                {
			try 
			{
                            var preSIMWARE = loadFirmware(textFromFileLoaded);
                            if (preSIMWARE.error == null) 
                                update_memories(preSIMWARE);

                            return preSIMWARE;
			}
			catch (e) {
			    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError
                            var preSIMWARE = new Object() ;
                            preSIMWARE.error = 'ERROR: at line: ' + e.lineNumber + ' and column: ' + e.columnNumber ;
                            return preSIMWARE;
			}
                }
        }

/*      
 *  Copyright 2015-2016 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
 *  Token management
 */

function nextToken ( context )
{
          // skip whitespaces
          while ( ("# \t\n\r".indexOf(context.text[context.t]) != -1) && (context.t < context.text.length) )
          {
                 // # till end of line
                 if (context.text[context.t] == '#') {
		     while ( ("\n".indexOf(context.text[context.t]) == -1) && (context.t < context.text.length) ) {
		    	      context.t++;
		     }
                 }

                 if (context.text[context.t] == '\n') {
                     context.line++;
                     context.newlines.push(context.t) ;
                 }

		 context.t++;
	  }
	  
          // if {},()=: token, insert token
          if ( ("{},()=:".indexOf(context.text[context.t]) != -1) && (context.t < context.text.length) )
          {
               var tok = context.text[context.t] ;
               context.t++ ;
               context.tokens.push(tok) ;
               context.token_types.push("TOKEN") ;
               context.i = context.tokens.length - 1 ;
               return context ;
          }

          // read string "...." or token
          if ("\"" == context.text[context.t])
          {
		  // read until "
		  var first = context.t ;
                  context.t++ ;
		  while ( ("\"".indexOf(context.text[context.t]) == -1) && (context.t < context.text.length) ) {
			 context.t++;
		  }
		  context.t++ ;
		  var last = context.t ;

	          var token_type = "STRING" ;
          }
          else
          {
		  // read until whitespaces
		  var first = context.t ;
		  while ( ("{},()=:# \t\n\r".indexOf(context.text[context.t]) == -1) && (context.t < context.text.length) ) {
			 context.t++;
		  }
		  var last = context.t ;

	          var token_type = "TOKEN" ;
          }

          // try to explore if a ":" is near...
          var tmp_context = context.t ;
          while ( ("# \t\n\r".indexOf(context.text[tmp_context]) != -1) && (tmp_context < context.text.length) )
	  {
			 if (context.text[tmp_context] == '#') {
			     while ( ("\n".indexOf(context.text[tmp_context]) == -1) && (tmp_context < context.text.length) ) {
				      tmp_context++;
			     }
			 }
			 tmp_context++;
	  }
	  if (":" == context.text[tmp_context]) 
             {
		 token_type = "TAG" ;
                 context.t = tmp_context + 1 ;
             }

          // insert token
          var tok  = context.text.substring(first, last) ;
	  tok = tok.trim() ;
          if ("TAG" == token_type)
              tok = tok + ":" ;

          context.tokens.push(tok) ;
          context.token_types.push(token_type) ;
          context.i = context.tokens.length - 1 ;

          return context ;
}

function getToken ( context )
{
	 return context.tokens[context.i] ;
}

function getTokenType ( context )
{
	 return context.token_types[context.i] ;
}

function isToken ( context, text )
{
         return (getToken(context) == text.trim()) ;
}


/*
 *  Error handler
 */

function langError ( context, msgError )
{
        // detect lines
	var line2 = 0 ;
        if (context.newlines.length > 0)
            line2 = context.newlines[context.newlines.length - 1] + 1;

	var line1 = 0 ;
        if (context.newlines.length > 1)
            line1 = context.newlines[context.newlines.length - 2] + 1;

        var lowI = line1 ;

        var highI = Math.min(context.t - 1, line2+32);
        for (; (typeof context.text[highI+1] != "undefined") && (context.text[highI+1] != '\n'); highI++) ;
        var line3 = highI + 2 ;

        highI++;
        for (; (typeof context.text[highI+1] != "undefined") && (context.text[highI+1] != '\n'); highI++) ;
        highI++;

        // print lines
        context.error = "<pre style='background-color: inherit !important'>...\n" ;
        for (var i=lowI; i<highI; i++) 
        {
             if (i == line1) context.error += " " + (context.line-1) + "\t" ;
             if (i == line2) context.error += "*" +  context.line    + "\t" ;
             if (i == line3) context.error += " " + (context.line+1) + "\t" ;

             if (typeof context.text[i] != "undefined")
                  context.error += context.text[i];
             else context.error += "&lt;EOF&gt;";
        }
        context.error += "\n...\n</pre>" +
                         "(*) Problem around line " + context.line + ":<br>" + msgError + ".<br>" ;

        ga('send', 'event', 'compile', 'error', msgError);

        return context;
}

function getLabelContext ( context )
{
        return { t: context.t, line: context.line, newlines: context.newlines.slice() } ;
}

function setLabelContext ( context, labelContext )
{
        context.t = labelContext.t ;
        context.line = labelContext.line ;
        context.newlines = labelContext.newlines ;
}

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
 *  Load Firmware
 */

function read_microprg ( context )
{
	   // {
	   //           (TA, R, BW=11, C1=1),
	   //    etiq:  (T2, C0),
	   //           (A0, B=0, C=0)
	   // }

           var microprograma = new Array();

	   // match mandatory {
	   if (! isToken(context, "{") )
	         return langError(context, "Expected '{' not found") ;

           nextToken(context) ;
	   while (! isToken(context, "}") )
	   {
	       var microInstruccionAux = new Object();

	       // match optional etiq:
	       if (! isToken(context, "(") )
	       {
	           // match mandatory LABEL
		   var newLabelName = getToken(context) ;
                       newLabelName = newLabelName.substring(0, newLabelName.length-1) ; // remove the ending ':'

		   if ("TAG" != getTokenType(context))
		        return langError(context, 
                                            "Expected '<label>:' not found but '" + newLabelName + "'.");

	           // semantic check: existing LABEL
		   for (var contadorMCAux in context.etiquetas)
		   {
			if (context.etiquetas[contadorMCAux] == newLabelName)
			    return langError(context, "Label is repeated: " + getToken(context));
		   }
		   context.etiquetas[context.contadorMC] = newLabelName ; 

                   // semantic check: valid token
                   if (newLabelName.match("[a-zA-Z_0-9]*")[0] != newLabelName )
		       return langError(context, "Label format is not valid for '" + getToken(context)  + "'") ;

                   nextToken(context) ;
	       }

	       // match mandatory (
	       if (! isToken(context, "(") )
		     return langError(context, "Expected '(' not found") ;

               nextToken(context) ;
	       while (! isToken(context, ")") )
	       {
		   // match mandatory SIGNAL
		   var nombre_tok = getToken(context).toUpperCase();

		   if (nombre_tok == "MADDR")
		   {
                        nextToken(context) ;
			// match mandatory =
			if (! isToken(context, "=") )
			    return langError(context, "Expected '=' not found") ;

                        nextToken(context) ;
			// match mandatory VALUE
			var labelsNotFoundAux=new Object();
			labelsNotFoundAux["nombre"] = getToken(context) ;
			labelsNotFoundAux["cycle"]  = microprograma.length;
			labelsNotFoundAux["index"]  = context.i;
			labelsNotFoundAux["instruction"] = context.instrucciones.length;

			var etiquetaFounded = 0;
			for (var k in context.etiquetas)
			{
				if ( isToken(context, context.etiquetas[k]) )
				{
					microInstruccionAux[nombre_tok] = k.toString();
					etiquetaFounded = 1;
				}
			}

			if (etiquetaFounded == 0)
			{
				context.labelsNotFound.push(labelsNotFoundAux);
			}

                        nextToken(context) ;
			// match optional ,
			if ( isToken(context, ",") )
                            nextToken(context) ;

			continue ;
		   }

                   // semantic check: valid signal id
		   if (typeof sim_signals[nombre_tok] == "undefined")
		       return langError(context, "Signal does not exists: '" + nombre_tok + "'") ;

		   microInstruccionAux[nombre_tok] = 1; // signal is active so far...

                   nextToken(context) ;
		   // match optional =
		   if ( isToken(context, "=") )
		   {
                        nextToken(context) ;
			// match mandatory VALUE
			microInstruccionAux[nombre_tok] = parseInt(getToken(context) , 2);

                        // semantic check: valid value
                        if (getToken(context).match("[01]*")[0] != getToken(context))
			    return langError(context, "Incorrect binary format: " + getToken(context)) ;

                        // semantic check: value within range
		        if (microInstruccionAux[nombre_tok] >= Math.pow(2, sim_signals[nombre_tok].nbits))
		            return langError(context, "Value out of range: " + getToken(context)) ;

                        nextToken(context) ;
		   }

		   // match optional ,
		   if ( isToken(context, ",") )
                        nextToken(context) ;
	       }

	       microprograma.push(microInstruccionAux);
	       context.contadorMC++;

               nextToken(context) ;
	       if ( isToken(context, ",") )
                    nextToken(context) ;
	   }

	   // match mandatory }
           nextToken(context) ;

           return microprograma ;
}

function loadFirmware (text)
{
           var context = new Object() ;
	   context.line           	= 1 ;
	   context.error          	= null ;
	   context.i              	= 0 ;
	   context.contadorMC     	= 0 ;
	   context.etiquetas      	= new Object() ;
	   context.labelsNotFound 	= new Array() ;
	   context.instrucciones  	= new Array() ;
	   context.co_cop         	= new Object() ;
	   context.registers      	= new Array() ;
           context.text           	= text ;
	   context.tokens         	= new Array() ;
	   context.token_types         	= new Array() ;
	   context.t              	= 0 ;
	   context.newlines       	= new Array() ;
	   context.pseudoInstructions	= new Array();
	   context.stackRegister	= null ;

           nextToken(context) ;
           while (context.t < context.text.length)
           {

// *registers
// {
//    0=$zero,
//    30=$fp,
//    31=$ra
// }*

               if (isToken(context,"registers"))
               {
                       nextToken(context) ;
                       if (! isToken(context, "{")) 
                             return langError(context, "Expected '{' not found") ;

                       nextToken(context) ;
                       while (! isToken(context, "}"))
                       {
                           var nombre_reg = getToken(context) ;

                           nextToken(context) ;
                           if (! isToken(context, "=")) 
				 return langError(context, "Expected '=' not found") ;

                           nextToken(context) ;
                           context.registers[nombre_reg] = getToken(context) ;

                           nextToken(context) ;
			   if (isToken(context, "("))
			   {
				if (context.stackRegister != null)
				    return langError(context, "Duplicate definition of stack pointer");

				nextToken(context);
				if (! isToken(context, "stack_pointer"))
				    return langError(context, "Expected stack_pointer token not found");

				context.stackRegister = nombre_reg;

				nextToken(context);
				if (! isToken(context, ")"))
				    return langError(context, "Expected ')' not found");

				nextToken(context);
			   }
			
                           if (isToken(context,",")) 
                               nextToken(context);
                       }

                       nextToken(context);
                       continue ;
               }

//
// *pseudoinstructions 
// {
//    li reg num { lui reg high(num) ; ori reg reg low(num) }
// }*
//

	       if (isToken(context,"pseudoinstructions"))
	       {
			nextToken(context);
			if(! isToken(context, "{"))
			     return langError(context, "Expected '{' not found");

			nextToken(context);
			while (! isToken(context, "}"))
			{
				var pseudoInstructionAux = new Object();			
				var pseudoInitial	 = new Object();
				pseudoInitial.signature	 = "";
				pseudoInitial.name	 = "";
				pseudoInitial.fields	 = new Array();
				pseudoInitial.name	 = getToken(context);
				pseudoInitial.signature	 = pseudoInitial.signature + getToken(context) + "," ;
				nextToken(context);
				while (! isToken(context, "{"))
				{
					var pseudoFieldAux	  = new Object();
					pseudoFieldAux.name	  = getToken(context);
					pseudoInitial.fields.push(pseudoFieldAux);
					pseudoInitial.signature = pseudoInitial.signature + getToken(context) + ",";
					nextToken(context);
					if(isToken(context, ","))
						nextToken(context);
				}
			 	nextToken(context);
				pseudoInitial.signature = pseudoInitial.signature.substr(0, pseudoInitial.signature.length-1); 
				pseudoInstructionAux["initial"]=pseudoInitial;	
				var contPseudoFinish=0;

				var pseudoFinishAux = new Object();
				pseudoFinishAux.signature="";
				while (! isToken(context, "}"))
				{
					pseudoFinishAux.signature = pseudoFinishAux.signature + getToken(context) + " ";
					nextToken(context);
				}
				pseudoInstructionAux["finish"]=pseudoFinishAux;
				pseudoInstructionAux["finish"].signature=pseudoInstructionAux["finish"].signature.replace(';','\n');
				context.pseudoInstructions.push(pseudoInstructionAux);
				nextToken(context);
			}

			nextToken(context);
			continue ;
		}

// *begin {
//            (XX, Y, BW=11),
//     fetch: (X2, X0),
//            (A0, B=0, C=0)
// }*

               if (isToken(context,"begin"))
               {
                   var instruccionAux = new Object();
                   instruccionAux["name"]     = getToken(context) ;
                   instruccionAux["mc-start"] = context.contadorMC ;

	           nextToken(context);
                   var ret = read_microprg(context) ;
                   if (typeof ret.error != "undefined")
                       return ret ;

                   instruccionAux["signature"]       = "begin" ;
		   instruccionAux["signatureGlobal"] = "begin" ;
                   instruccionAux["microcode"]       = ret ;
		   context.instrucciones.push(instruccionAux);

                   context.contadorMC = context.contadorMC + 9; // padding between instrucctions
                   continue ;
               }

// *li reg val {*
//             co=000000,
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

               var instruccionAux = new Object();
	       instruccionAux["name"]     = getToken(context) ;
	       instruccionAux["mc-start"] = context.contadorMC ;

	       var firma = "";
	       var firmaGlobal= "";
	       var firmaUsuario= "";
	       var numeroCampos = 0;
	       var campos = new Array();

	       firma = firma + getToken(context)  + ',';
	       firmaUsuario = getToken(context) + " ";
	       nextToken(context);

               // match optional ,
	       while (isToken(context, ',')) 
	    	      nextToken(context);

	       while (! isToken(context,"{"))
	       {
                   // match optional ,
	           while (isToken(context, ',')) 
			  nextToken(context);

		   var plus_found = false;

                   // match optional FIELD
		   if ( !isToken(context, ",") && !isToken(context, "(") && !isToken(context, ")") )
                   {
		       var campoAux = new Object();
		       var auxValue = getToken(context);
		       
		       if(auxValue[auxValue.length-1] == "+"){
				auxValue = auxValue.substring(0,auxValue.length-1);
				plus_found = true;
		       }

		       campoAux["name"] = auxValue ;
		       campos.push(campoAux);
		       numeroCampos++;
		       firma = firma + auxValue ;
		       firmaUsuario = firmaUsuario + auxValue;
		       nextToken(context);

		       if (numeroCampos > 100)
			   return langError(context, "more than 100 fields in a single instruction.") ;
		       if (auxValue == "co")
			   return langError(context, "instruction field has 'co' as name.") ;
		       if (auxValue == "nwords")
			   return langError(context, "instruction field has 'nwords' as name.") ;
		   } 

                   // match optional "(" FIELD ")"
		   if (isToken(context, "(")) 
                   {
		           firma = firma + ',(';

			   if(plus_found) firmaUsuario = firmaUsuario + '(';
			   else	firmaUsuario = firmaUsuario + ' (';

		           nextToken(context);

			   if ( !isToken(context, ",") && !isToken(context, "(") && !isToken(context, ")") )
			   {
			       var campoAux = new Object();
			       campoAux["name"] = getToken(context) ;
			       campos.push(campoAux);
			       numeroCampos++;

			       firma = firma + getToken(context) ;
			       firmaUsuario = firmaUsuario + getToken(context);			       

			       nextToken(context);
			   }
			   else
		           {
			       return langError(context,
			    			    "'token' is missing after '(' on: " + 
                                                    context.co_cop[instruccionAux.co].signature) ;
		           }

			   if (isToken(context,")"))
			   {
				firma = firma + ')';
				firmaUsuario = firmaUsuario + ')';

  				nextToken(context);
			   }
			   else
		           {
			       return langError(context,
			    			    "')' is missing on: " + 
                                                    context.co_cop[instruccionAux.co].signature) ;
		           }
                   }

	           firma = firma + ',';
		   firmaUsuario = firmaUsuario + ' ';
	       }

	       firma = firma.substr(0, firma.length-1);
	       firmaUsuario = firmaUsuario.substr(0, firmaUsuario.length-1);
	       instruccionAux["signature"] = firma;
               instruccionAux["signatureGlobal"] = firma;
	       instruccionAux["signatureUser"] = firmaUsuario;

// li reg val {
//             *co=000000,*
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

	       nextToken(context);
	       // match mandatory co
	       if (! isToken(context,"co"))
		     return langError(context, "Expected keyword 'co' not found") ;

	       nextToken(context);
	       // match mandatory =
	       if (! isToken(context,"="))
	    	     return langError(context, "Expected '=' not found") ;

	       nextToken(context);
	       // match mandatory CO
	       instruccionAux["co"] = getToken(context) ;

	       // semantic check: valid value
	       if ( (getToken(context).match("[01]*")[0] != getToken(context)) || (getToken(context).length != 6) )
	             return langError(context, "Incorrect binary format on 'co': " + getToken(context)) ;

	       // semantic check: 'co' is not already used
	       if ( (typeof context.co_cop[instruccionAux["co"]] != "undefined") &&
	                   (context.co_cop[instruccionAux["co"]].cop == null) )
	       {
	   	   return langError(context,
				        "'co' is already been used by: " + context.co_cop[instruccionAux.co].signature) ;
	       }
	       context.co_cop[instruccionAux.co] = new Object() ;
	       context.co_cop[instruccionAux.co].signature = instruccionAux.signature ;
	       context.co_cop[instruccionAux.co].cop       = null ;

	       nextToken(context);
	       // match optional ,
	       if (isToken(context,","))
	           nextToken(context);

// li reg val {
//             co=000000,
//             *[cop=0000,]*
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

	       // match optional cop
	       if (isToken(context,"cop"))
               {
		       nextToken(context);
		       // match mandatory =
		       if (! isToken(context,"="))
			     return langError(context, "Expected '=' not found") ;

		       nextToken(context);
		       // match mandatory CO
		       instruccionAux["cop"] = getToken(context) ;

		       // semantic check: valid value
		       if ( (getToken(context).match("[01]*")[0] != getToken(context)) || (getToken(context).length != 4) )
			     return langError(context, "Incorrect binary format on 'cop': " + getToken(context)) ;

		       // semantic check: 'co+cop' is not already used
	               if (        (context.co_cop[instruccionAux.co].cop != null) &&
	                    (typeof context.co_cop[instruccionAux.co].cop[instruccionAux.cop] != "undefined") )
		       {
		   	   return langError(context,
			     "'co+cop' is already been used by: " + context.co_cop[instruccionAux.co].cop[instruccionAux.cop]);
		       }
	               if (context.co_cop[instruccionAux.co].cop == null)
	                   context.co_cop[instruccionAux.co].cop = new Object();
	                   context.co_cop[instruccionAux.co].cop[instruccionAux.cop] = instruccionAux.signature ;

		       nextToken(context);
		       // match optional ,
		       if (isToken(context,","))
			   nextToken(context);
               }

// li reg val {
//             co=000000,
//             *nwords=1,*
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

	       // match mandatory nwords
	       if (! isToken(context,"nwords")) 
		   return langError(context, "Expected keyword 'nwords' not found") ;

	       nextToken(context);
	       // match mandatory =
	       if (! isToken(context,"=")) 
		   return langError(context, "Expected '=' not found") ;

	       nextToken(context);
	       // match mandatory NWORDS
	       instruccionAux["nwords"] = getToken(context) ;

	       nextToken(context);
	       // match optional ,
	       if (isToken(context,",")) 
		   nextToken(context);

// li reg val {
//             co=000000,
//             nwords=1,
//             *reg=reg(25,21),
//              val=inm(15,0),*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

	       var camposInsertados = 0;
	       while (camposInsertados < numeroCampos)
	       {
	           // match mandatory FIELD
	           var tmp_name = getToken(context) ;
	           if (campos[camposInsertados]["name"] != tmp_name)
		       return langError(context, "Unexpected field found: '" + tmp_name + "'") ;

	           nextToken(context);
	           // match mandatory =
	           if (! isToken(context,"=")) 
		       return langError(context, "Expected '=' not found") ;

	           nextToken(context);
	           // match mandatory reg|inm|address
	           if ( !isToken(context, "reg") && !isToken(context, "inm") && !isToken(context, "address") )
		        return langError(context, "Incorrect type of field (reg, inm or address)") ;

	           campos[camposInsertados]["type"] = getToken(context) ;
	           firma = firma.replace("," + campos[camposInsertados]["name"], "," + campos[camposInsertados]["type"]);
	           firma = firma.replace("(" + campos[camposInsertados]["name"], "(" + campos[camposInsertados]["type"]);
	           firma = firma.replace(")" + campos[camposInsertados]["name"], ")" + campos[camposInsertados]["type"]); 
		   firmaUsuario = firmaUsuario.replace(campos[camposInsertados]["name"], campos[camposInsertados]["type"]);                  
 
	           instruccionAux["signature"] = firma;
		   instruccionAux["signatureUser"] = firmaUsuario;
	           firmaGlobal = firma.replace("address","num");
	           firmaGlobal = firmaGlobal.replace("inm" , "num");
	           instruccionAux["signatureGlobal"] = firmaGlobal;

	           nextToken(context);
	           // match mandatory (
	           if (! isToken(context,"(")) 
		       return langError(context, "Expected '(' not found") ;

	           nextToken(context);
	           // match mandatory START_BIT
	           campos[camposInsertados]["startbit"] = getToken(context) ;

                   // check startbit range
                   if (parseInt(campos[camposInsertados]["startbit"]) > 32*parseInt(instruccionAux["nwords"]))
		       return langError(context, "startbit out of range: " + getToken(context)) ;

	           nextToken(context);
	           // match mandatory ,
	           if (! isToken(context,","))
		       return langError(context, "Expected ',' not found") ;

	           nextToken(context);
	           // match mandatory STOP_BIT
	           campos[camposInsertados]["stopbit"] = getToken(context) ;

                   // check stopbit range
                   if (parseInt(campos[camposInsertados]["stopbit"]) > 32*parseInt(instruccionAux["nwords"]))
		       return langError(context, "stopbit out of range: " + getToken(context)) ;

	           nextToken(context);
	           // match mandatory )
	           if (! isToken(context,")"))
		       return langError(context, "Expected ')' not found") ;

	           nextToken(context);
	           if (campos[camposInsertados]["type"] == "address")
	           {
	               // match mandatory abs|rel
		       if (getToken(context) !="abs" && getToken(context) !="rel")
		    	   return langError(context, "Type of addressing incorrect (abs or rel)") ;

	               // match mandatory ADDRESS_TYPE
		       campos[camposInsertados]["address_type"] = getToken(context) ;
		       nextToken(context);
	           }

	           // match optional ,
	           if (isToken(context, ","))
		       nextToken(context);

	           camposInsertados++;
	       }

	       instruccionAux["fields"] = campos;

// li reg val {
//             co=000000,
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             *{
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }*
// }

               var ret = read_microprg(context) ;
               if (typeof ret.error != "undefined")
                   return ret ;

               instruccionAux["microcode"] = ret ;
	       context.instrucciones.push(instruccionAux);

               context.contadorMC = context.contadorMC + 9; // padding between instrucctions

// li reg val {
//             co=000000,
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// *}*

               if (! isToken(context,"}")) 
                   return langError(context, "Expected '}' not found") ;

               nextToken(context);
           }

           // CHECK: fetch exists + fetch label
           var found = false ;
           for (var i=0; i<context.instrucciones.length; i++)
           {
                if (context.instrucciones[i].name == "begin")
                {
                    for (var j=0; j<context.instrucciones[i].microcode.length; j++)
                    {
		         if ( (typeof context.etiquetas[j] != "undefined") && (context.etiquetas[j] == "fetch") ) {
                               found = true;
                         }
                    }
		    if (found === false)
		        return langError(context, "label 'fetch' not defined") ;
                }
           }
           if (found === false)
	       return langError(context, "'begin' not found") ;

           // TO RESOLVE labels
	   var labelsFounded=0;
	   if (context.labelsNotFound.length>0)
	   {
		for (var i=0; i<context.labelsNotFound.length; i++)
		{
			for (var j in context.etiquetas)
			{
				if (context.etiquetas[j] == context.labelsNotFound[i].nombre)
				{
				    context.instrucciones[context.labelsNotFound[i].instruction].microcode[context.labelsNotFound[i].cycle].MADDR = j;
				    labelsFounded++;		
				}	
			}

			if (labelsFounded == 0)
			{
                                // CHECK: label is defined
				return langError(context, "MADDR label not found : " + context.labelsNotFound[i].nombre) ;
			}
		}
	   }

           var ret = new Object();
           ret.error              = null;
           ret.firmware           = context.instrucciones ;
           ret.labels             = context.etiquetas;
           ret.mp                 = new Object();
           ret.seg                = new Object();
           ret.registers          = context.registers ;
           ret.pseudoInstructions = context.pseudoInstructions ;
	   ret.stackRegister	  = context.stackRegister;

           return ret ;
}

/*
 *  Save Firmware
 */

function saveFirmware ( SIMWARE )
{
	var file = "";
	for (var i=0; i<SIMWARE.firmware.length; i++)
	{
		file += SIMWARE.firmware[i].name;
		if (typeof SIMWARE.firmware[i].fields != "undefined")
		{
			if (SIMWARE.firmware[i].fields.length>0)
			{
				for (var j=0; j<SIMWARE.firmware[i].fields.length; j++)
				{
					file += " " + SIMWARE.firmware[i].fields[j].name;
				}
			}
		}

		file += " {" + '\n';
		if (typeof SIMWARE.firmware[i].co != "undefined")
		{
			file += '\t' +"co=" + SIMWARE.firmware[i].co + "," + '\n';
		}

		if (typeof SIMWARE.firmware[i].cop != "undefined")
		{
			file += '\t' +"cop=" + SIMWARE.firmware[i].cop + "," + '\n';
		}

		if (typeof SIMWARE.firmware[i].nwords != "undefined")
		{
			file += '\t' + "nwords=" + SIMWARE.firmware[i].nwords + "," + '\n'; 
		}

		if (typeof SIMWARE.firmware[i].fields != "undefined")
		{	
			if (SIMWARE.firmware[i].fields.length>0)
			{
				for (var j=0;j<SIMWARE.firmware[i].fields.length;j++)
				{
					file += '\t' + SIMWARE.firmware[i].fields[j].name + " = " + SIMWARE.firmware[i].fields[j].type;
					file += " (" + SIMWARE.firmware[i].fields[j].startbit + "," + SIMWARE.firmware[i].fields[j].stopbit + ")";					
					if (SIMWARE.firmware[i].fields[j].type == "address")
					{
						file += SIMWARE.firmware[i].fields[j].address_type;
					}
					file += "," + '\n'; 
				}
			}
		}

		if (typeof SIMWARE.firmware[i].microcode != "undefined")
		{
			var addr=SIMWARE.firmware[i]["mc-start"];
			if (SIMWARE.firmware[i].name!="begin")
			{
				file += '\t' + "{";
			}

			for (var j=0; j<SIMWARE.firmware[i].microcode.length; j++)
			{
				file += '\n' + '\t' + '\t';
				if (typeof SIMWARE.labels[addr] != "undefined")
				{
					file += SIMWARE.labels[addr] + " : "; 
				}

				file += "( ";
				var anySignal=0;
				for (var k in SIMWARE.firmware[i].microcode[j])
				{
					if (k!="MADDR")
					     file += k + "=" + SIMWARE.firmware[i].microcode[j][k].toString(2) + ", ";
                                        else file += k + "=" + SIMWARE.labels[SIMWARE.firmware[i].microcode[j][k]] + ", ";
					anySignal=1;
				}
				if (anySignal==1)
				{
					file = file.substr(0, file.length-1);
				}
				file += "),";
				addr++;
			}

			file = file.substr(0, file.length-1);
			if (SIMWARE.firmware[i].name!="begin")
			{
				file += '\n\t}';
			}
		}

		file += '\n}\n\n';
	}	

	if ( (typeof SIMWARE.registers != "undefined") && (SIMWARE.registers.length > 0) )
	{
		file += 'registers' + '\n{\n';
		for (var i = 0; i< SIMWARE.registers.length; i++)
		{
		     if (SIMWARE.stackRegister == i)
		     	  file += '\t' + "$" + i + "=" + SIMWARE.registers[i] + " (stack_pointer)," + '\n';
                     else file += '\t' + "$" + i + "=" + SIMWARE.registers[i] + "," + '\n';
		}
		file  = file.substr(0, file.length-2);
		file += '\n}\n';
	}

	return file;
}


/*
 *  Auxiliar firmware interface
 */

function decode_instruction ( binstruction )
{
    var co  = binstruction.substring(0,   6) ;
    var cop = binstruction.substring(28, 32) ;

    // try to find instruction in the loaded firmware
    var oinstruction = null ;
    for (var fi in FIRMWARE['firmware'])
    {
         if (FIRMWARE.firmware[fi].name == "begin") 
         {
             continue ;
         }

         if ( (FIRMWARE.firmware[fi].co == co) && (typeof FIRMWARE.firmware[fi].cop == "undefined") )
         {
             oinstruction = FIRMWARE.firmware[fi] ;
             break ;
         }

         if ( (FIRMWARE.firmware[fi].co == co) && (typeof FIRMWARE.firmware[fi].cop != "undefined") && (FIRMWARE.firmware[fi].cop == cop) )
         {
             oinstruction = FIRMWARE.firmware[fi] ;
             break ;
         }
    }

    return oinstruction ;
}

function decode_ram ( )
{
    var sram = "\n" ;
    for (var address in MP)
    {
        var binstruction = MP[address].toString(2) ;
            binstruction = "00000000000000000000000000000000".substring(0, 32 - binstruction.length) + binstruction ;
        sram += "0x" + parseInt(address).toString(16) + ":" + decode_instruction(binstruction) + "\n" ;
    }

    return sram ;
}

/*      
 *  Copyright 2015-2016 Saul Alonso Monsalve, Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos
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
 *   Constants
 */

	const BYTE_LENGTH = 8;

/*
 *   Directives 
 */

	directives = new Object() ;
	directives[".kdata"]   = { name:".kdata",  kindof:"segment",  size:0 };
	directives[".ktext"]   = { name:".ktext",  kindof:"segment",  size:0 };
	directives[".data"]    = { name:".data",   kindof:"segment",  size:0 };
	directives[".text"]    = { name:".text",   kindof:"segment",  size:0 };
	directives[".byte"]    = { name:".byte",   kindof:"datatype", size:1 };
	directives[".half"]    = { name:".half",   kindof:"datatype", size:2 };
	directives[".word"]    = { name:".word",   kindof:"datatype", size:4 };
	directives[".space"]   = { name:".space",  kindof:"datatype", size:1 };
	directives[".ascii"]   = { name:".ascii",  kindof:"datatype", size:1 };
	directives[".asciiz"]  = { name:".asciiz", kindof:"datatype", size:1 };
	directives[".align"]   = { name:".align",  kindof:"datatype", size:0 };


/*
 *   Auxiliary functions
 */

function get_datatype_size ( datatype )
{
	if (typeof directives[datatype] == "undefined") {
		console.log("data type: " + datatype + " is not defined!!!\n")
	    	return 0;
   	}

	return directives[datatype].size ;
}

function isTokenKindOf ( text, kindof )
{
        if (typeof directives[text] == "undefined") {
                //console.log("directive: " + text + " is not defined!!!\n")
                return false;
        }

        return (directives[text].kindof == kindof) ;
}

function is_directive ( text )
{
	return (typeof directives[text] != "undefined");
}

function is_directive_segment ( text )
{
        return isTokenKindOf(text,'segment') ;
}

function is_directive_datatype ( text )
{
        return isTokenKindOf(text,'datatype') ;
}

function isDecimal ( n )
{
	if(n.length > 1 && n[0] == "0") return false;
        
	if( !isNaN(parseFloat(n)) && isFinite(n) ){
		var res = parseInt(n);
		if(typeof n == "string" && n.includes(".")) 
			alert("Truncating conversion has occurred: " + n + " became " + res);
		return res;
	}
	return false;
}

function isOctal( n )
{
	if(n.substring(0,1) == "0"){
		var octal = n.substring(1).replace(/\b0+/g, '');
                var aux = parseInt(octal,8);
                return (aux.toString(8) === octal) ? aux : false;
        }
        return false;
}

function isHex( n )
{
        if(n.substring(0,2).toLowerCase() == "0x"){
		var hex = n.substring(2).toLowerCase().replace(/\b0+/g, '');
                if(hex == "") hex = "0";
		var aux = parseInt(hex,16);
                return (aux.toString(16) === hex) ? aux : false;
        }
        return false;
}

function isChar( n )
{
	if(n[0] == "'" && n[2] == "'")
		return n.charCodeAt(1);
	return false;
}

function decimal2binary(number, size)
{
	var num_bits = (number >>> 0).toString(2);

	if (number >= 0)
            return [num_bits, size-num_bits.length];

	num_bits = "1" + num_bits.replace(/^[1]+/g, "");
	if (num_bits.length>size)
	    return [num_bits, size-num_bits.length];
	num_bits = "1".repeat(size-num_bits.length) + num_bits;
	return [num_bits, size-num_bits.length];
}

function isValidTag(tag){
	if(isDecimal(tag[0]) === 0)
		return false;
	var myRegEx  = /[^a-z\d]/i;
	return !(myRegEx.test(tag));
}

function max( a, b )
{
	return a > b ? a : b;
}

function min( a, b )
{
	return a < b ? a : b;
}

function sum_array( a )
{
	return a.reduce(function(a, b) { return a + b; }, 0);
}

function get_candidate(advance, instruction){
	var candidate = false;
	var candidates = new Object();
	var signatures = new Object();
	for(i=0; i<advance.length; i++){
		if(advance[i]){
			candidates[i] = instruction[i].nwords;
			signatures[instruction[i].signature] = 0;
		}
	}
	if(Object.keys(signatures).length == 1){
		var min = false;
		for(i in candidates){
			if(min == false){
				min = candidates[i];
				candidate = i;
			}
			else if(min == candidates[i]) candidate = false;
			else if(min > candidates[i]){
				min = candidates[i];
				candidate = i;
			} 
		}	
	}
	return candidate ? parseInt(candidate) : candidate;
}

function reset_assembly(nwords){
	return "00000000000000000000000000000000".repeat(nwords);		
}

function assembly_replacement(machineCode, num_bits, startbit, stopbit, free_space){
	var machineCodeAux = machineCode.substring(0, machineCode.length-startbit+free_space);
	machineCode = machineCodeAux + num_bits + machineCode.substring(machineCode.length-stopbit);	
	return machineCode; 
}

function writememory_and_reset ( seg_ptr, nwords, machineCode, mp )
{
	mp["0x" + seg_ptr.toString(16)] = machineCode ;               			
	return [ seg_ptr + 4, 0, reset_assembly(nwords) ] ;
}


/*
 *   Load segments
 */

function read_data ( context, datosCU, ret )
{
           var seg_name = getToken(context) ;
           var seg_ptr  = ret.seg[seg_name].begin ;

	   // 
	   //  .data
	   //  *.text*
	   // 

           nextToken(context) ;

	   var byteWord = 0;
	   var machineCode = reset_assembly(1);

	   // Loop while token read is not a segment directive (.text/.data/...)
	   while (!is_directive_segment(getToken(context))) 
           {
		   // 
		   //  * etiq1: * 
		   //  * etiq2: *  .word 2, 4
		   // 
	
		   var possible_tag = "" ;
		   while (!is_directive_datatype(getToken(context))) 
		   {
                      // tagX
		      possible_tag = getToken(context) ;

                      // check tag
		      if ("TAG" != getTokenType(context))
			  return langError(context, "Expected tag or directive but found '" + possible_tag + "' instead" ) ;
		  
		      var tag = possible_tag.substring(0, possible_tag.length-1); 
   		      if(!isValidTag(tag))
			  return langError(context, "A tag must follow an alphanumeric format (starting with a letter) but found '" + tag + "' instead");
		      if(context.firmware[tag] || context.pseudoInstructions[tag])
			  return langError(context, "A tag can not have the same name as an instruction (" + tag + ")");
		      if(ret.labels2[tag])
			  return langError(context, "Repeated tag: '" + tag + "'");

		      // Store tag
		      ret.labels2[tag] = "0x" + (seg_ptr+byteWord).toString(16);

		      // .<datatype> | tagX+1
		      nextToken(context) ;
		   }


		   // 
		   //    etiq1:   
		   //    etiq2: *.word* 2, 4
		   // 

		   var possible_datatype = getToken(context) ;

		   //            .word *2, 4, 0x8F, 'a', 077*
		   if ( (".word" == possible_datatype) ||
		        (".half" == possible_datatype) ||
		        (".byte" == possible_datatype) )
                   {
                        // <value> | .<directive>
		        nextToken(context) ;
                        var possible_value = getToken(context) ;

			while (!is_directive(getToken(context)))
                        {
				var number;
				var label_found = false;
		
				if((number=isOctal(possible_value)) !== false); // Octal value 072
				else if((number=isHex(possible_value)) !== false); // Hex value 0xF12
				else if((number=isDecimal(possible_value)) !== false); // Decimal value 634
				else if((number=isChar(possible_value)) !== false); // Char value 'a'

				// Error	
				else{
					if(".word" == possible_datatype){
						if(!isValidTag(possible_value))
							return langError(context, "A tag must follow an alphanumeric format (starting with a letter) but found '" + possible_value + "' instead");
						if(context.firmware[possible_value] || context.pseudoInstructions[possible_value])
							return langError(context, "A tag can not have the same name as an instruction (" + possible_value + ")");
						number = 0;
						label_found = true;	
					}
					else return langError(context, "Expected value for numeric datatype but found '" + possible_value + "' instead");
				}

				// Get value size in bytes
				var size = get_datatype_size(possible_datatype);

				// Decimal --> binary	
			        var res = decimal2binary(number, size*BYTE_LENGTH);
				num_bits = res[0];
				num_bits_free_space = res[1];

				// Check size
				if(num_bits_free_space < 0)
					return langError(context, "Expected value that fits in a '" + possible_datatype + "' (" + size*BYTE_LENGTH + " bits), but inserted '" + possible_value + "' (" + num_bits.length + " bits) instead");

				// Word filled
				if(byteWord >= 4){
					ret.mp["0x" + seg_ptr.toString(16)] = machineCode ;
               				seg_ptr = seg_ptr + 4 ;
					byteWord = 0;
					machineCode = reset_assembly(1);	
				}

				// Align to size
				while(((seg_ptr+byteWord)%size) != 0){
					byteWord++;
					
					// Word filled
					if (byteWord >= 4)
                                            var [ seg_ptr, byteWord, machineCode ] = writememory_and_reset(seg_ptr,1,machineCode,ret.mp) ;
				}	
	
		                // Store tag
                                if ("" != possible_tag){
		                    ret.labels2[possible_tag.substring(0, possible_tag.length-1)] = "0x" + (seg_ptr+byteWord).toString(16);
				    possible_tag = "";
				}
				
				// Label as number (later translation)
				if(label_found)
					ret.labels["0x" + seg_ptr.toString(16)] = { name:possible_value, addr:seg_ptr, startbit:31, stopbit:0, rel:undefined, nwords:1 };
					
				// Store number in machine code
				machineCode = assembly_replacement(machineCode, num_bits, BYTE_LENGTH*(size+byteWord), BYTE_LENGTH*byteWord, num_bits_free_space); 
				
				byteWord+=size;

				// optional ','
				nextToken(context);
				if ("," == getToken(context))
				    nextToken(context);

			        if ( is_directive(getToken(context)) || ("TAG" == getTokenType(context)) || "." == getToken(context)[0] )
				    break ; // end loop, already read token (tag/directive)

                                // <value> | .<directive>
				possible_value = getToken(context);
                        }
                   }

		   //            .space *20*
		   else if (".space" == possible_datatype)
                   {
                        // <value> 
		        nextToken(context) ;
                        var possible_value = getToken(context) ;

			// Check
			if (!isDecimal(possible_value))
			     return langError(context, "Expected number of bytes to reserve in .space but found '" + possible_value + "' as number");
			if(possible_value < 0)
			     return langError(context, "Expected positive number but found '" + possible_value + "' as positive number");

			// Fill with spaces
			for (i=0; i<possible_value; i++){
			
				// Word filled
				if(byteWord >= 4)
                                        var [ seg_ptr, byteWord, machineCode ] = writememory_and_reset(seg_ptr,1,machineCode,ret.mp) ;

				byteWord++;
			}

			nextToken(context) ;
                   }

		   //            .align *2*
		   else if (".align" == possible_datatype)
                   {
                        // <value> 
		        nextToken(context) ;
                        var possible_value = getToken(context) ;

			// Check if number
			if (!isDecimal(possible_value) && possible_value >=0 )
			     return langError(context, "Expected the align parameter as positive number but found '" + possible_value + "'. Remember that number is the power of two for alignment, see MIPS documentation..");

			// Word filled
			if (byteWord >= 4)
                            var [ seg_ptr, byteWord, machineCode ] = writememory_and_reset(seg_ptr,1,machineCode,ret.mp) ;

			// Calculate offset
                        var align_offset = Math.pow(2,parseInt(possible_value)) ;
                   
			switch(align_offset){
				case 1:
					break;
				case 2:
					if(byteWord & 1 == 1)
						byteWord++;
					break;
				default:
					// Fill with spaces
					while(true){
		
						// Word filled
						if (byteWord >= 4)
                                                    var [ seg_ptr, byteWord, machineCode ] = writememory_and_reset(seg_ptr,1,machineCode,ret.mp) ;

						if(seg_ptr%align_offset == 0 && byteWord == 0)
							break;	

						byteWord++;
					}	
			}

			nextToken(context) ;
                   }

		   //  * .ascii  "hola", " mundo\n"
		   //  * .asciiz "hola mundo"
		   else if (".ascii" == possible_datatype || ".asciiz" == possible_datatype)
                   {
                        // <value> | .<directive>
		        nextToken(context) ;
                        var possible_value = getToken(context) ;

			while (!is_directive(getToken(context)))
                        {
				// Word filled
				if (byteWord >= 4)
                                    var [ seg_ptr, byteWord, machineCode ] = writememory_and_reset(seg_ptr,1,machineCode,ret.mp) ;

				// check string
				if("" == possible_value)
					return langError(context, "String is not closed (forgot to end it with quotation marks)")
		                if ("STRING" != getTokenType(context))
				    	return langError(context, "Expected string between quotation marks but found '" + possible_value + "' instead");

				// process characters of the string
				for(i=0; i<possible_value.length; i++){
					
					// Word filled
					if (byteWord >= 4)
                                            var [ seg_ptr, byteWord, machineCode ] = writememory_and_reset(seg_ptr,1,machineCode,ret.mp) ;

					if(possible_value[i] == "\"") continue;			
	
					switch(possible_value[i]){
						case "\\":
							switch(possible_value[i+1]){
							
								case "n":
									num_bits = "\n".charCodeAt(0).toString(2);
									i++;
									break;
								case "t":
									num_bits = "\t".charCodeAt(0).toString(2);
									i++;
									break;
								case "0":
									num_bits = "\0".charCodeAt(0).toString(2);
									i++;
									break;
								default:	
									num_bits = possible_value.charCodeAt(i).toString(2);
									break;
							}
						default:
							num_bits = possible_value.charCodeAt(i).toString(2);
					}	
	
					// Store character in machine code
					machineCode = assembly_replacement(machineCode, num_bits, BYTE_LENGTH*(1+byteWord), BYTE_LENGTH*byteWord, BYTE_LENGTH-num_bits.length); 	
					byteWord++;

				}

                                if (".asciiz" == possible_datatype){
                                	// Word filled
					if (byteWord >= 4)
                                            var [ seg_ptr, byteWord, machineCode ] = writememory_and_reset(seg_ptr,1,machineCode,ret.mp) ;
					
					num_bits = "\0".charCodeAt(0).toString(2);
			
					// Store field in machine code
					machineCode = assembly_replacement(machineCode, num_bits, BYTE_LENGTH*(1+byteWord), BYTE_LENGTH*byteWord, BYTE_LENGTH-num_bits.length); 	
					byteWord++;
				}

				// optional ','
				nextToken(context);
				if ("," == getToken(context))
				    nextToken(context);

			        if ( is_directive(getToken(context)) || ("TAG" == getTokenType(context)) || "." == getToken(context)[0] )
				     break ; // end loop, already read token (tag/directive)

                                // <value> | .<directive>
				possible_value = getToken(context);
                        }
		   }
		   else
		   {
		        return langError(context, "UnExpected datatype name '" + possible_datatype );
		   }
		   
		   if(context.t >= context.text.length) break;
           }

	   // Fill memory
	   if(byteWord > 0){
		ret.mp["0x" + seg_ptr.toString(16)] = machineCode ;
                seg_ptr = seg_ptr + 4 ;
                // var [ seg_ptr, byteWord, machineCode ] = writememory_and_reset(seg_ptr,1,machineCode,ret.mp) ;
	   }		

           ret.seg[seg_name].end = seg_ptr ;  // end of segment is just last pointer value...
}

function read_text ( context, datosCU, ret )
{
	   // 
	   //  .text
	   // 

           var seg_name = getToken(context) ;
           var seg_ptr  = ret.seg[seg_name].begin ;

	   // get firmware and pseudoinstructions
	   var firmware = context.firmware;
	   var pseudoInstructions = context.pseudoInstructions;  
 
	   // Fill register names
	   var registers = new Object() ;
	   for (i=0; i<datosCU.registers.length; i++)
	   {
		var aux = "$" + i;
		registers[aux] = i;
		registers[datosCU.registers[i]] = registers[aux];
	   }

           nextToken(context) ;

	   // Loop while token read is not a segment directive (.text/.data/...)
	   while (!is_directive_segment(getToken(context))) 
           {
		// check tag or error
		while (typeof firmware[getToken(context)] == "undefined" && typeof pseudoInstructions[getToken(context)] == "undefined") 
                {
			var possible_tag = getToken(context);
	
			// check tag		
		        if ("TAG" != getTokenType(context)) 
				return langError(context, "Expected tag or instruction but found '" + possible_tag + "' instead" ); 
	
		        var tag = possible_tag.substring(0, possible_tag.length-1); 
   		        if(!isValidTag(tag))
				return langError(context, "A tag must follow an alphanumeric format (starting with a letter) but found '" + tag + "' instead");
			if(firmware[tag] || pseudoInstructions[tag])
				return langError(context, "A tag can not have the same name as an instruction (" + tag + ")");
			if(ret.labels2[tag])
				return langError(context, "Repeated tag: '" + tag + "'");

			// store tag
			ret.labels2[tag] = "0x" + seg_ptr.toString(16);

			nextToken(context);

			if (context.t >= context.text.length) 
                            return langError(context, "Unexpected end of file");
		}

		var instruction = getToken(context);
		var isPseudo = false;	

		var signature_fields = [];		// e.g. [[reg,reg], [reg,inm], [reg,addr,inm]]
		var finish = [];
		var advance = [];			// array that indicates wheather each signature can be considered or not
		var max_length = 0;			// max number of parameters of the signatures

		// check if pseudoinstruction
		if(pseudoInstructions[instruction]){
			for(i=0; i<pseudoInstructions[instruction].length; i++){
				signature_fields[i] = pseudoInstructions[instruction][i].signature.split(",");	
				advance[i] = 1;
				isPseudo = true;
				max_length = max(max_length, signature_fields[i].length);
			}
			return langError(context, "Pseudoinstructions are not implemented");
		}
	
                //
                // *li, $1*, 1
                //

		var signature_user_fields = [];		// signature user fields
		var binaryAux = [];			// necessary parameters of the fields of each signature		

		// Fill parameters
		for(i=0; i<firmware[instruction].length; i++)
		{
			signature_fields[i] = firmware[instruction][i].signature.split(",");
			signature_user_fields[i] = firmware[instruction][i].signatureUser.split(" ");
			signature_fields[i].shift();
			signature_user_fields[i].shift();
			advance[i] = 1;
			binaryAux[i] = [];
			max_length = max(max_length, signature_fields[i].length);
		}

		// Iterate over fields
		var s = [];
                s[0] = instruction;
		for (i=0; i<max_length; i++)
                {
                        // optional ','
			nextToken(context);
			if ("," == getToken(context))
			    nextToken(context);

			var value = getToken(context);	
			var converted;

			if("TAG" != getTokenType(context) && !firmware[value]) s[i+1] = value ;
				
			// vertical search (different signatures)
			for(j=0; j<advance.length; j++){

				// check whether explore this alternative 
				if(advance[j] == 0)
					continue;
				if(i >= signature_fields[j].length){
					// if next token is not instruction or tag
					if("TAG" != getTokenType(context) && !firmware[value] && !pseudoInstructions[value])
						advance[j] = 0;
					continue;
				}

				// get field information
				var field = firmware[instruction][j].fields[i];		
				var size = field.startbit-field.stopbit+1;

				var label_found = false;

				// check field	
				switch(field.type)
                	        {	
					// 0xFFFFF,... | 23, 'b', ...
					case "address":
					case "inm":
						if((converted = isOctal(value)) !== false);
						else if((converted = isHex(value)) !== false);	
						else if((converted = isDecimal(value)) !== false);
						else if((converted = isChar(value)) !== false);
						else{
							if(!isValidTag(value)){
								var error = "A tag must follow an alphanumeric format (starting with a letter) but found '" + value + "' instead";
								advance[j] = 0;
								break;
							}
							if(firmware[value] || pseudoInstructions[value]){
								var error = "A tag can not have the same name as an instruction (" + value + ")";
								advance[j] = 0;
								break;
							}
							label_found = true;
						}

						if(!label_found){
							var res = decimal2binary(converted, size);
							if(field.type == "address" && "rel" == field.address_type)
								res = decimal2binary(converted - seg_ptr - 4, size);	
						}
						
						break;
					// $1...
					case "reg":
						var aux = false;
						if("(" == value){
							if("(reg)" != signature_fields[j][i]){
								var error = "Expected register but found register beween parenthesis";
								advance[j] = 0;
								break;
							}
							nextToken(context);
							value = getToken(context);
							aux = true;
						}
						else{
							if("(reg)" == signature_fields[j][i]){
								var error = "Expected register between parenthesis but found '" + value + "' instead";
								advance[j] = 0;
								break;
							}
						}
						if(typeof registers[value] == "undefined"){	
							var error = "Expected register ($1, ...) but found '" + value + "' instead";
							advance[j] = 0;
							break;
						}
						if(aux){
							s[i+1] = "(" + value + ")";
							nextToken(context);
							if(")" != getToken(context)){
								var error = "String without end parenthesis ')'";
								advance[j] = 0;
								break;
							}
						}
						var res = decimal2binary(isDecimal(registers[value]), size);
						break;
					default:
						return langError(context, "An unknown error ocurred (53)");	
				}

				// check if bits fit in the space
				if(advance[j] == 1 && !label_found){
					if(res[1] < 0){
						if(field.type == "address" && "rel" == field.address_type)
							error = "Relative value (" + (converted - seg_ptr - 4) + " in decimal) needs " + res[0].length + " bits but there is space for only " + size + " bits";
						else var error = "'" + value + "' needs " + res[0].length + " bits but there is space for only " + size + " bits";
						advance[j] = 0;						
					}
				}	

				// store field
				if(advance[j] == 1)	
					binaryAux[j][i] = {
                                                            num_bits:(label_found ? false : res[0]), 
                                                            num_bits_free_space:(label_found ? false : res[1]), 
                                                            startbit:field.startbit, 
                                                            stopbit:field.stopbit, 
                                                            rel:(label_found ? field.address_type : false), 
                                                            islabel:label_found, field_name: value 
                                                          };
			}
		
			if(sum_array(advance) == 0) break;

			if("TAG" == getTokenType(context) || firmware[value] || pseudoInstructions[value]) break;	
		}

		// get candidate
		var candidate;
		for(i=0; i<advance.length; i++)
			if(advance[i] == 1) candidate = i;

		// instruction format
		var format = "";
		for(i=0; i<firmware[instruction].length; i++){
			if(i>0 && i<firmware[instruction].length-1)
				format += ", ";
			if(i>0 && i==firmware[instruction].length-1)
				format += " or ";
			format += "'" + firmware[instruction][i].signatureUser + "'";
		} 

		// check solution
		var sum_res = sum_array(advance);	
		if(sum_res == 0){
			// No candidate
			if(advance.length == 1)
				return langError(context, error + ". Remember that the instruction format has been defined as: " + format);	
			return langError(context, "Instruction and fields don't match with microprogram. Remember that the instruction formats have been defined as: " + format + ". Please check the microcode. Probably you forgot to add a field, a number does not fit in its space, or you just used a wrong instruction");
		}
		if(sum_res > 1){
			// Multiple candidates
			candidate = get_candidate(advance, firmware[instruction]);
			if(candidate === false) return langError(context, "Instruction and fields match with more than one microprogram. Please check the microcode. Currently, the instruction format can be: " + format);
		}
	
		var machineCode = reset_assembly(firmware[instruction][candidate].nwords);

		// Generate code (co and cop)	
		if (firmware[instruction][candidate].co !== false)
                {
			machineCode = assembly_replacement(machineCode, firmware[instruction][candidate].co, 32, 26, 0); 	
			if (firmware[instruction][candidate].cop !== false)
			    machineCode = assembly_replacement(machineCode, firmware[instruction][candidate].cop, 4, 0, 0);
		}

		// Store candidate fields in machine code
		for(i=0; i<binaryAux[candidate].length; i++){
			// tag
			if(binaryAux[candidate][i].islabel){
				ret.labels["0x" + seg_ptr.toString(16)] = { name:binaryAux[candidate][i].field_name, addr:seg_ptr, startbit:binaryAux[candidate][i].startbit, stopbit:binaryAux[candidate][i].stopbit, rel:binaryAux[candidate][i].rel, nwords:firmware[instruction][candidate].nwords, labelContext:getLabelContext(context) };
			}

			// reg, addr, inm
			else{
				// check size
				var bstartbit = binaryAux[candidate][i].startbit;
				var bstopbit = binaryAux[candidate][i].stopbit;
				var bnum_bits = binaryAux[candidate][i].num_bits ; 
				var bnum_bits_free_space = binaryAux[candidate][i].num_bits_free_space;
			
				// store field in machine code
				var machineCodeAux = machineCode.substring(0, machineCode.length-1-bstartbit+bnum_bits_free_space);
				machineCode = machineCodeAux + bnum_bits + machineCode.substring(machineCode.length-bstopbit);	
			}
		}

		// fix instruction format
		s_def = s[0];
		for(i=0, j=1; i<signature_user_fields[candidate].length; i++, j++){
			switch(signature_user_fields[candidate][i]){
				case "address":
				case "inm":
				case "reg":
				case "(reg)":
					s_def = s_def + " " + s[j];
					break;
				default:
					s_def = s_def + " " + s[j] + s[j+1];
					j++;
			}		
		}

		// original instruction (important for pseudoinstructions)
		var s_ori = s_def;

		// process machine code with several words...
		for(i=firmware[instruction][candidate].nwords-1; i>=0; i--)
                {
			if(i<firmware[instruction][candidate].nwords-1) s_def="---";
			ret.assembly["0x" + seg_ptr.toString(16)] = { breakpoint:false, binary:machineCode.substring(i*32, (i+1)*32), source:s_def, source_original:s_ori } ; 
			ret.mp["0x" + seg_ptr.toString(16)] = machineCode.substring(i*32, (i+1)*32) ;
                	seg_ptr = seg_ptr + 4 ;
		}

		if (max_length == signature_fields[candidate].length)
			nextToken(context);

		if(context.t >= context.text.length) break;
           }

           ret.seg[seg_name].end = seg_ptr ;  // end of segment is just last pointer value...
}


/*
 *  Compile assembly
 */
function simlang_compile (text, datosCU)
{
           var context = new Object() ;
	   context.line           	= 1 ;
	   context.error          	= null ;
	   context.i              	= 0 ;
	   context.contadorMC     	= 0 ;
	   context.etiquetas      	= new Object() ;
	   context.labelsNotFound 	= new Array() ;
	   context.instrucciones  	= new Array() ;
	   context.co_cop         	= new Object() ;
	   context.registers      	= new Array() ;
           context.text           	= text ;
	   context.tokens         	= new Array() ;
	   context.token_types    	= new Array() ;
	   context.t              	= 0 ;
	   context.newlines       	= new Array() ;
	   context.pseudoInstructions	= new Array();
	   context.stackRegister	= null ;
	   context.firmware = new Object() ;
	   context.pseudoInstructions = new Object();
	   
	   // fill firmware
	   for (i=0; i<datosCU.firmware.length; i++)
           {
		var aux = datosCU.firmware[i];

	   	if (typeof context.firmware[aux.name] == "undefined")
	   	    context.firmware[aux.name] = new Array();

	   	context.firmware[aux.name].push({ name:aux.name,
							  nwords:parseInt(aux.nwords), 
							  co:(typeof aux.co != "undefined" ? aux.co : false),
							  cop:(typeof aux.cop != "undefined" ? aux.cop : false),
							  fields:(typeof aux.fields != "undefined" ? aux.fields : false),
							  signature:aux.signature,
							  signatureGlobal:aux.signatureGlobal,
							  signatureUser:(typeof aux.signatureUser != "undefined" ? aux.signatureUser : aux.name )  });
	   }
	
	   // fill pseudoinstructions
	   for (i=0; i<datosCU.pseudoInstructions.length; i++)
	   {
		var initial = datosCU.pseudoInstructions[i].initial;
		var finish = datosCU.pseudoInstructions[i].finish;	

		if (typeof context.pseudoInstructions[initial.name] == "undefined")
		    context.pseudoInstructions[initial.name] = new Array();

                context.pseudoInstructions[initial.name].push({ name:initial.name, 
								fields:(typeof initial.fields != "undefined" ? initial.fields : false),
								signature:initial.signature,
								finish:finish.signature });
	   }

           var ret = new Object(); 
           ret.seg = {
                       ".kdata": { name:".kdata",  begin:0x0000, end:0x00FF, color: "#FF99CC", kindof:"data" },
                       ".ktext": { name:".ktext",  begin:0x0100, end:0x0FFF, color: "#A9D0F5", kindof:"text" },
                       ".data":  { name:".data",   begin:0x1000, end:0x7FFF, color: "#FACC2E", kindof:"data" },
                       ".text":  { name:".text",   begin:0x8000, end:0xFF00, color: "#BEF781", kindof:"text" },
                       ".stack": { name:".stack",  begin:0xFFFF, end:0xFFFF, color: "#F1F2A3", kindof:"stack" }
                     };
          ret.mp           = new Object() ;
	  ret.labels	   = new Object() ; // [addr] = {name, addr, startbit, stopbit}
          ret.labels2      = new Object() ;
          ret.assembly     = new Object() ; // This is for the Assembly Debugger...

          // 
          // .segment
          // ...
          // 
          nextToken(context) ;
          while (context.t < context.text.length)
          {
	       var segname = getToken(context);

	       if(typeof ret.seg[segname] == "undefined")
			return langError(context, "Expected .data/.text/... segment but found '" + segname + "' as segment");

	       if("data" == ret.seg[segname].kindof)
			read_data(context, datosCU, ret);
	       if("text" == ret.seg[segname].kindof)
			read_text(context, datosCU, ret);

	       // Check errors
	       if(context.error != null){
	       	       ret.error = context.error;
		       return ret;
	       }
	 }

	 // Check that all used labels are defined in the text
         for (i in ret.labels)
         {
		// Get label value (address number)
		var value = ret.labels2[ret.labels[i].name];

		// Check if the label exists
		if(typeof value === "undefined"){
			setLabelContext(context, ret.labels[i].labelContext);
			return langError(context, "Label '" + ret.labels[i].name + "' used but not defined in the assembly code");
		}	

		// Get the words in memory (machine code) where the label is used
		var machineCode = "";
		var auxAddr = ret.labels[i].addr;		
		for(j=0; j<ret.labels[i].nwords; j++){
			machineCode = ret.mp["0x" + auxAddr.toString(16)] + machineCode;
			auxAddr += 4;
		}

		var size = ret.labels[i].startbit-ret.labels[i].stopbit+1;
		var converted;

		// Translate the address into bits	
		if((converted = isHex(value)) !== false){
			var res = decimal2binary(converted, size); // res[0] == num_bits | res[1] == num_bits_free_space
			var error = "'" + ret.labels[i].name + "' needs " + res[0].length + " bits but there is space for only " + size + " bits";
			if ("rel" == ret.labels[i].rel){
			    res = decimal2binary(converted - ret.labels[i].addr - 4, size);
			    error = "Relative value (" + (converted - ret.labels[i].addr - 4) + " in decimal) needs " + res[0].length + " bits but there is space for only " + size + " bits";
			}
		}	
 		else return langError(context, "Unexpected error (54)");

		// check size
		if (res[1] < 0) {
		    setLabelContext(context, ret.labels[i].labelContext);
                    return langError(context, error);
                }
			
		// Store field in machine code
		var machineCodeAux = machineCode.substring(0, machineCode.length-1-ret.labels[i].startbit+res[1]);
		machineCode = machineCodeAux + res[0] + machineCode.substring(machineCode.length-ret.labels[i].stopbit);

		// process machine code with several words...
		auxAddr = ret.labels[i].addr;
		for(j=ret.labels[i].nwords-1; j>=0; j--)
                {
			ret.mp["0x" + auxAddr.toString(16)] = machineCode.substring(j*32, (j+1)*32) ;
                	auxAddr += 4 ;
		}
	 }	 

	 if ( (typeof ret.labels2["main"] == "undefined" ) && (typeof ret.labels2["kmain"] == "undefined" ) )
		return langError(context, "Tags 'main' or 'kmain' are not defined in the assembly code");
	
	 return ret;
}
