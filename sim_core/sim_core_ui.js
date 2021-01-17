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
         *  Format
         */

        // numbers

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

        function simcoreui_pack ( val, pack_size )
        {
            var base_str = "0".repeat(pack_size) ;

            return base_str.substring(0, pack_size - val.length) + val ;
        }

        function hex2bin   ( hexvalue )
        {
                var valuebin = hexvalue.toString(2) ;

                valuebin = simcoreui_pack(valuebin, 32) ;
                valuebin = valuebin.substring(0,4)   + " " + valuebin.substring(4,8)   + " " +
                           valuebin.substring(8,12)  + " " + valuebin.substring(12,16) + "<br>" +
                           valuebin.substring(16,20) + " " + valuebin.substring(20,24) + " " +
                           valuebin.substring(24,28) + " " + valuebin.substring(28,32) ;

                return valuebin ;
        }

        function value2string ( format, value )
        {
                var fmt_value = "" ;

		// formating value
		var fmt = format.split("_") ;

		switch (fmt[0])
		{
		   case "unsigned": fmt_value = value.toString(fmt[1]).toUpperCase() ;
				    break ;
		   case "float":    fmt_value = hex2float(value) ;
				    break ;
		   case "char":     fmt_value = "'" + String.fromCharCode(value) + "'" ;  // fmt[1] = ascii
				    break ;
		   default:         fmt_value = value.toString() ;
		}

		if (fmt[2] === "fill") {
                    fmt_value = simcoreui_pack(fmt_value, 8) ;
		}

		// return formated value
		return fmt_value ;
        }


        /*
         *  Details
         */

        // Register File

        function show_rf_names ( )
        {
            return simcore_action_ui("CPU", 0, "show_rf_names")() ;
        }

        // Console (Screen + Keyboard)
	function get_screen_content ( )
	{
	      return simcore_action_ui("SCREEN", 0, "get_screen_content")() ;
	}

	function set_screen_content ( screen )
	{
	      simcore_action_ui("SCREEN", 0, "set_screen_content")(screen) ;
	}

	function get_keyboard_content ( )
	{
	      return simcore_action_ui("KBD", 0, "get_keyboard_content")() ;
	}

	function set_keyboard_content ( keystrokes )
	{
	      simcore_action_ui("KBD", 0, "set_keyboard_content")(keystrokes) ;
	}

        // Memory

        function show_main_memory ( memory, index, redraw, updates )
        {
	    return simcore_action_ui("MEMORY", 0, "show_main_memory")(memory, index, redraw, updates) ;
        }

        function show_control_memory ( memory, index, redraw )
        {
	    return simcore_action_ui("MEMORY", 0, "show_control_memory")(memory, index, redraw) ;
        }

        function show_memories_values ( )
        {
	    // main memory
	    var pc_name = simhw_sim_ctrlStates_get().pc.state ;
	    var reg_pc  = get_value(simhw_sim_state(pc_name)) ;

	    show_main_memory(simhw_internalState('MP'), reg_pc, true, true) ;

	    // control memory
	    var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	    var reg_maddr  = get_value(simhw_sim_state(maddr_name)) ;

	    show_control_memory(simhw_internalState('MC'), reg_maddr, true) ;
	}

        // CPU svg: update_draw

        function update_draw ( obj, value )
        {
            return simcore_action_ui("CPU", 1, "update_draw")(obj, value) ;
        }

        function update_bus_visibility ( bus_name, value )
        {
            return simcore_action_ui("CPU", 1, "update_bus_visibility")(bus_name, value) ;
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
         *  Debug: mPC, PC and IR
         */

        function show_dbg_ir ( value )
        {
            return simcore_action_ui("MEMORY", 0, "show_dbg_ir")(value) ;
        }

        function show_dbg_mpc ( )
        {
            return simcore_action_ui("MEMORY", 0, "show_dbg_mpc")() ;
        }

        function show_asmdbg_pc ( )
        {
            return simcore_action_ui("MEMORY", 0, "show_asmdbg_pc")() ;
        }

        // portable alert

        function ws_alert ( msg )
        {
	    if (typeof document === "undefined") {
	        console.log(msg) ;
		return true ;
	    }

            alert(msg) ;
	    return true ;
        }

        function element_scroll_get ( list_id )
        {
            var offset = 0 ;

            var obj_byid = $(list_id) ;
            if (obj_byid.length > 0) {
                offset = obj_byid[0].scrollTop ;
            }

            return offset ;
        }

        function element_scroll_set ( list_id, offset )
        {
            var obj_byid = $(list_id) ;
            if (obj_byid.length > 0) {
                obj_byid[0].scrollTop = offset ;
            }
        }

        function element_scroll_setRelative ( list_id, obj_id, offset )
        {
            var obj_byid = $(obj_id) ;
            if (obj_byid.length > 0)
            {
                var topPos = obj_byid[0].offsetTop ;
                element_scroll_set(list_id, topPos + offset) ;
            }
        }

