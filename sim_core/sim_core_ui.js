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
         *  Format
         */

        // numbers

	//
	// decimal2binary(number: integer, size_to_fit: integer ) ->
	//    [
	//       num_base2,
	//       number of bits extra of missing for num_base2,
	//       minimum number of bits to represent num_base2
	//    ]
	//

	function decimal2binary ( number, size )
	{
		var num_base2        = number.toString(2) ;
		var num_base2_length = num_base2.length ;

		if (num_base2_length > WORD_LENGTH) {
		    return [num_base2, size-num_base2_length, num_base2_length] ;
		}

		num_base2        = (number >>> 0).toString(2) ;
		num_base2_length = num_base2.length ;
		if (number >= 0) {
		    return [num_base2, size-num_base2_length, num_base2_length] ;
		}

		num_base2        = "1" + num_base2.replace(/^[1]+/g, "") ;
		num_base2_length = num_base2.length ;
		if (num_base2_length > size) {
		    return [num_base2, size-num_base2_length, num_base2_length] ;
		}

		num_base2 = "1".repeat(size - num_base2.length) + num_base2 ;
		return [num_base2, size-num_base2.length, num_base2_length] ;
	}

	function float2binary ( f, size )
	{
		var buf   = new ArrayBuffer(8) ;
		var float = new Float32Array(buf) ;
		var uint  = new Uint32Array(buf) ;

		float[0] = f ;
		return decimal2binary(uint[0], size) ;
	}

	function float2decimal ( f )
	{
		var buf   = new ArrayBuffer(8) ;
		var float = new Float32Array(buf) ;
		var uint  = new Uint32Array(buf) ;

		float[0] = f ;
                return uint[0] ;
	}

	function float2hex ( f )
	{
                return float2decimal(f).toString(16) ;
	}

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

        function uint_to_float32 ( value )
        {
              var buf = new ArrayBuffer(4) ;
              (new Uint32Array(buf))[0] = value ;
              return (new Float32Array(buf))[0] ;
        }

        function float32_to_uint ( value )
        {
              var buf = new ArrayBuffer(4) ;
              (new Float32Array(buf))[0] = value ;
              return (new Uint32Array(buf))[0];
        }

	/**
	 * IEEE 754 class of number
	 * @param a {Number} sign + exponent + mantissa
	 * @return {number} class as integer:
	 *      0 -> -infinite
	 *      1 -> -normalized number
	 *      2 -> -non-normalized number
	 *      3 -> -0
	 *      4 -> +0
	 *      5 -> +non-normalized number
	 *      6 -> +normalized number
	 *      7 -> +inf
	 *      8 -> -NaN (signaling)
	 *      9 -> +NaN (quiet)
	 */
	function float_class ( a )
	{
              var s = a & 0x80000000;
                  s = s >> 31 ;
              var e = a & 0x7F800000;
                  e = e >> 23 ;
              var m = a & 0x007FFFFF;

	      let rd = 0 ;

	      if (!m && !e) {
		  rd = s ? 3 : 4 ;
              }
	      else if (!e) {
		  rd = s ? 2 : 6 ;
              }
	      else if (!(e ^ 255)) {
		  if (m)
		      rd = s ? 8 : 9 ;
		  else
		      rd = s ? 0 : 7 ;
              }
	      else {
		  rd = s ? 1 : 5 ;
              }

	      return rd ;
	}

	function float_class_power2 ( a )
	{
              var s = a & 0x80000000;
                  s = s >> 31 ;
              var e = a & 0x7F800000;
                  e = e >> 23 ;
              var m = a & 0x007FFFFF;

	      let rd = 0 ;

	      if (!m && !e) {
		  rd = s ? 1<<3 : 1<<4 ;
              }
	      else if (!e) {
		  rd = s ? 1<<2 : 1<<6 ;
              }
	      else if (!(e ^ 255)) {
		  if (m)
		      rd = s ? 1<<8 : 1<<9 ;
		  else
		      rd = s ? 1<<0 : 1<<7 ;
              }
	      else {
		  rd = s ? 1<<1 : 1<<5 ;
              }

	      return rd ;
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

        function show_cache_memory ( memory )
        {
	    return simcore_action_ui("MEMORY", 0, "show_cache_memory")(memory) ;
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

	    // cache memory
	    show_cache_memory(simhw_internalState('CM')) ;
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
	    for (var key in simhw_sim_signals()) {
		 update_draw(simhw_sim_signals()[key], simhw_sim_signals()[key].value) ;
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

        // colors

        var colors_schemes = {
			        'color14' :  [ "#000000", "#FFFFFF", "#FF0000", "#FF8800", "#FFFF00",
                                               "#88FF00", "#00FF00", "#00FF88", "#00FFFF", "#0088FF",
                                               "#0000FF", "#8800FF", "#FF00FF", "#FF0088" ],

			        'color16' :  [ "#000000", "#FFFFFF", "#9D9D9D", "#BE2633",
                                               "#E06F8B", "#493C2B", "#A46422", "#EB8931",
                                               "#F7E26B", "#2F484E", "#44891A", "#A3CE27",
                                               "#1B2632", "#005784", "#31A2F2", "#B2DCEF" ],

			        'color256' : [ "#000000", "#800000", "#008000", "#808000",
                                               "#000080", "#800080", "#008080", "#c0c0c0",
                                               "#808080", "#ff0000", "#00ff00", "#ffff00",
                                               "#0000ff", "#ff00ff", "#00ffff", "#ffffff",
                                               "#000000", "#00005f", "#000087", "#0000af",
                                               "#0000d7", "#0000ff", "#005f00", "#005f5f",
                                               "#005f87", "#005faf", "#005fd7", "#005fff",
                                               "#008700", "#00875f", "#008787", "#0087af",
                                               "#0087d7", "#0087ff", "#00af00", "#00af5f",
                                               "#00af87", "#00afaf", "#00afd7", "#00afff",
                                               "#00d700", "#00d75f", "#00d787", "#00d7af",
                                               "#00d7d7", "#00d7ff", "#00ff00", "#00ff5f",
                                               "#00ff87", "#00ffaf", "#00ffd7", "#00ffff",
                                               "#5f0000", "#5f005f", "#5f0087", "#5f00af",
                                               "#5f00d7", "#5f00ff", "#5f5f00", "#5f5f5f",
                                               "#5f5f87", "#5f5faf", "#5f5fd7", "#5f5fff",
                                               "#5f8700", "#5f875f", "#5f8787", "#5f87af",
                                               "#5f87d7", "#5f87ff", "#5faf00", "#5faf5f",
                                               "#5faf87", "#5fafaf", "#5fafd7", "#5fafff",
                                               "#5fd700", "#5fd75f", "#5fd787", "#5fd7af",
                                               "#5fd7d7", "#5fd7ff", "#5fff00", "#5fff5f",
                                               "#5fff87", "#5fffaf", "#5fffd7", "#5fffff",
                                               "#870000", "#87005f", "#870087", "#8700af",
                                               "#8700d7", "#8700ff", "#875f00", "#875f5f",
                                               "#875f87", "#875faf", "#875fd7", "#875fff",
                                               "#878700", "#87875f", "#878787", "#8787af",
                                               "#8787d7", "#8787ff", "#87af00", "#87af5f",
                                               "#87af87", "#87afaf", "#87afd7", "#87afff",
                                               "#87d700", "#87d75f", "#87d787", "#87d7af",
                                               "#87d7d7", "#87d7ff", "#87ff00", "#87ff5f",
                                               "#87ff87", "#87ffaf", "#87ffd7", "#87ffff",
                                               "#af0000", "#af005f", "#af0087", "#af00af",
                                               "#af00d7", "#af00ff", "#af5f00", "#af5f5f",
                                               "#af5f87", "#af5faf", "#af5fd7", "#af5fff",
                                               "#af8700", "#af875f", "#af8787", "#af87af",
                                               "#af87d7", "#af87ff", "#afaf00", "#afaf5f",
                                               "#afaf87", "#afafaf", "#afafd7", "#afafff",
                                               "#afd700", "#afd75f", "#afd787", "#afd7af",
                                               "#afd7d7", "#afd7ff", "#afff00", "#afff5f",
                                               "#afff87", "#afffaf", "#afffd7", "#afffff",
                                               "#d70000", "#d7005f", "#d70087", "#d700af",
                                               "#d700d7", "#d700ff", "#d75f00", "#d75f5f",
                                               "#d75f87", "#d75faf", "#d75fd7", "#d75fff",
                                               "#d78700", "#d7875f", "#d78787", "#d787af",
                                               "#d787d7", "#d787ff", "#d7af00", "#d7af5f",
                                               "#d7af87", "#d7afaf", "#d7afd7", "#d7afff",
                                               "#d7d700", "#d7d75f", "#d7d787", "#d7d7af",
                                               "#d7d7d7", "#d7d7ff", "#d7ff00", "#d7ff5f",
                                               "#d7ff87", "#d7ffaf", "#d7ffd7", "#d7ffff",
                                               "#ff0000", "#ff005f", "#ff0087", "#ff00af",
                                               "#ff00d7", "#ff00ff", "#ff5f00", "#ff5f5f",
                                               "#ff5f87", "#ff5faf", "#ff5fd7", "#ff5fff",
                                               "#ff8700", "#ff875f", "#ff8787", "#ff87af",
                                               "#ff87d7", "#ff87ff", "#ffaf00", "#ffaf5f",
                                               "#ffaf87", "#ffafaf", "#ffafd7", "#ffafff",
                                               "#ffd700", "#ffd75f", "#ffd787", "#ffd7af",
                                               "#ffd7d7", "#ffd7ff", "#ffff00", "#ffff5f",
                                               "#ffff87", "#ffffaf", "#ffffd7", "#ffffff",
                                               "#080808", "#121212", "#1c1c1c", "#262626",
                                               "#303030", "#3a3a3a", "#444444", "#4e4e4e",
                                               "#585858", "#626262", "#6c6c6c", "#767676",
                                               "#808080", "#8a8a8a", "#949494", "#9e9e9e",
                                               "#a8a8a8", "#b2b2b2", "#bcbcbc", "#c6c6c6",
                                               "#d0d0d0", "#dadada", "#e4e4e4", "#eeeeee" ]
			     } ;

        function colors_clone ( cs )
        {
             var colors = colors_schemes[cs] ;

             if (typeof colors == "undefined") {
                 colors = colors_schemes['color16'] ;
             }

             return colors.map((x) => x) ;
        }

