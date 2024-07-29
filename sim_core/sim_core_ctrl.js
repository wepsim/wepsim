/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  base
         */

        function array_includes ( arr, val )
        {
	    if (typeof arr.includes != "undefined") {
	        return arr.includes(val) ;
            }

            for (var i=0; i<arr.length; i++)
            {
                 if (arr[i] == val) {
                     return true ;
                 }
            }
            return false ;
	}

	// Next two functions taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
	function base_escapeRegExp ( string )
	{
	    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}

	function base_replaceAll ( base_str, match, replacement )
	{
	    // ES12+
	    if (typeof base_str.replaceAll != "undefined") {
	        return base_str.replaceAll(match, replacement) ;
	    }

	    // older javascript engines
	    return base_str.replace(new RegExp(base_escapeRegExp(match), 'g'), ()=>replacement);
	}


        /*
         *  checking & updating
         */

        function update_cpu_bus_fire ( tri_mask, tri_index )
        {
	     // 1.- number of active tri-state
	     var n = 0 ;
	     var a = 0 ;
	     var e = -1 ;
	     for (var i=0; i<32; i++)
             {
		  a = tri_mask & Math.pow(2, i) ;
                  if (a > 0) {
	              e = i ;
		      n = n + 1 ;
	          }
	     }

	     // 2.- paint the bus if any tri-state is active
	     if (n > 0) {
	         var tri_state_names = simhw_internalState('tri_state_names') ;
	         var tri_name = tri_state_names[e] ;
	         update_draw(simhw_sim_signal(tri_name), 1) ;
	     }

	     // 3.- check if more than one tri-state is active
	     if (n > 1)
             {
	         update_bus_visibility('internalbus_fire', 'visible') ;
	         simhw_internalState_set('fire_visible', 'internalbus', true) ;

	         simhw_sim_state("BUS_IB").value = 0xFFFFFFFF;
	     }
	     else {
	         update_bus_visibility('internalbus_fire', 'hidden') ;
	         simhw_internalState_set('fire_visible', 'internalbus', false) ;
	     }

             // return the number of activated tri-states
             return n ;
        }

        function update_system_bus_fire ( number_active_tri )
        {
	     if (simhw_internalState_get('fire_visible', 'databus') == true)
	     {
		 update_bus_visibility('databus_fire', 'hidden') ;
		 simhw_internalState_set('fire_visible', 'databus', false) ;
	     }
	     if (number_active_tri > 1)
	     {
		 update_bus_visibility('databus_fire', 'visible') ;
		 simhw_internalState_set('fire_visible', 'databus', true) ;

		 simhw_sim_state("BUS_DB").value = 0xFFFFFFFF;
	     }

             // return the number of activated tri-states
             return number_active_tri ;
        }


        /*
	 * CLOCK (parallel / sequential)
	 */

        function fn_updateE_now ( key )
        {
	    if ("E" == simhw_sim_signal(key).type) {
		update_state(key) ;
	    }
	}

        function fn_updateE_future ( key )
        {
            if (jit_fire_ndep[key] < 1) // 1 -> 2
	        fn_updateE_now(key);
	    else
	        return new Promise( function(resolve, reject) { fn_updateE_now(key); }) ;
	}

        function fn_updateL_now ( key )
        {
	    update_draw(simhw_sim_signal(key), simhw_sim_signal(key).value) ;
	    if ("L" == simhw_sim_signal(key).type) {
		update_state(key) ;
	    }
	}

        function fn_updateL_future ( key )
        {
            if (jit_fire_ndep[key] < 1) // 1 -> 2
	        fn_updateL_now(key);
	    else
	        return new Promise( function(resolve, reject) { fn_updateL_now(key); });
	}


        /*
         *  Show/Update the global state
         */

        function update_state ( key )
        {
           var index_behavior = 0;

           switch (simhw_sim_signal(key).behavior.length)
           {
                case 0: // skip empty behavior
                     return;
                     break;

                case 1: // several signal values share the same behavior -> behavior[0]
                     index_behavior = 0;
                     break;

                default:
                     index_behavior = simhw_sim_signal(key).value ;
                     if (simhw_sim_signal(key).behavior.length < index_behavior) {
                         ws_alert('ALERT: there are more signals values than behaviors defined!!!!\n' +
                                  'key: ' + key + ' and signal value: ' + index_behavior);
                         return;
                     }
                     break;
           }

           compute_signal_behavior(key, index_behavior) ;
        }

        function update_signal_firmware ( key )
        {
            var SIMWARE = get_simware() ;
	    var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	    var reg_maddr  = get_value(simhw_sim_state(maddr_name)) ;

	    var assoc_i = -1;
            for (var i=0; i<SIMWARE['firmware'].length; i++) {
		 if (parseInt(SIMWARE['firmware'][i]["mc-start"]) > reg_maddr) { break; }
		 assoc_i = i ;
            }

            if (-1 == assoc_i)
            {
	        ws_alert("A new 'unknown' instruction is inserted,\n" +
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
                new_ins["microcomments"]   = new Array() ;

                SIMWARE['firmware'].push(new_ins) ;
                assoc_i = SIMWARE['firmware'].length - 1 ;
            }

	    var pos = reg_maddr - parseInt(SIMWARE['firmware'][assoc_i]["mc-start"]) ;
	    if (typeof SIMWARE['firmware'][assoc_i]["microcode"][pos] == "undefined") {
		SIMWARE['firmware'][assoc_i]["microcode"][pos]     = new Object() ;
		SIMWARE['firmware'][assoc_i]["microcomments"][pos] = "" ;
	    }
	    SIMWARE['firmware'][assoc_i]["microcode"][pos][key] = simhw_sim_signal(key).value ;

            if (simhw_sim_signal(key).default_value == simhw_sim_signal(key).value) {
	        delete SIMWARE['firmware'][assoc_i]["microcode"][pos][key] ;
	    }

	    // show memories...
	    var bits = get_value(simhw_sim_state('REG_IR')).toString(2) ;
	    bits = "00000000000000000000000000000000".substring(0, 32 - bits.length) + bits ;
	    //var op_code = parseInt(bits.substr(0, 6), 2) ; // op-code of 6 bits

            show_memories_values() ;
	}

        function propage_signal_update ( key )
        {
	    if (true === get_cfg('is_interactive'))
	    {
		 // update REG_MICROINS
		 if (simhw_sim_signal(key).value != simhw_sim_signal(key).default_value)
		      simhw_sim_state("REG_MICROINS").value[key] = simhw_sim_signal(key).value ;
		 else delete(simhw_sim_state("REG_MICROINS").value[key]);

		 // update MC[uADDR]
	         var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
		 var curr_maddr = get_value(simhw_sim_state(maddr_name)) ;

                 var mc_obj = simhw_internalState('MC') ;
                 var mcelto = control_memory_get(mc_obj, curr_maddr) ;
                 if (typeof mcelto === "undefined") {
                     // mcelto = {} ;
                        mcelto = { value: {}, comments: null } ;
                 }

                 mcelto.value[key] = simhw_sim_signal(key).value ;
                 mcelto.comments   = [] ;
                 control_memory_set(mc_obj, curr_maddr, mcelto) ;

		 // update ROM[..]
		 update_signal_firmware(key) ;

		 // update save-as...
		 var SIMWARE = get_simware() ;
		 document.getElementById("inputFirmware").value = saveFirmware(SIMWARE) ;
	    }

	    // fire signal
	    compute_behavior('FIRE ' + key) ;
        }

        function update_memories ( preSIMWARE )
        {
            var i=0;

	    // 1.- load the SIMWARE
            set_simware(preSIMWARE) ;
            var SIMWARE = get_simware() ;

	    // 2.- load the MC from ROM['firmware']
            simhw_internalState_reset('MC', {}) ;
            var mc_obj = simhw_internalState('MC') ;
            var mcelto = null ;
            for (i=0; i<SIMWARE['firmware'].length; i++)
	    {
	       var last = SIMWARE['firmware'][i]["microcode"].length ; // mc = microcode
               var mci  = SIMWARE['firmware'][i]["mc-start"] ;
	       for (var j=0; j<last; j++)
	       {
                    var mcelto = {
		                    value:        SIMWARE['firmware'][i]["microcode"][j],
                                    comments:     SIMWARE['firmware'][i]["microcomments"][j],
                                    is_native:    SIMWARE['firmware'][i].is_native,
                                    NATIVE:       SIMWARE['firmware'][i].NATIVE,
                                    NATIVE_JIT:   SIMWARE['firmware'][i].NATIVE_JIT
                                 } ;
                    control_memory_set(mc_obj, mci, mcelto) ;

		    mci++;
	       }
	    }

	    // 3.- load the ROM (2/2)
            simhw_internalState_reset('ROM', {}) ;
            for (i=0; i<SIMWARE['firmware'].length; i++)
	    {
               if ("begin" == SIMWARE['firmware'][i]['name']) {
                   continue ;
               }

	       var ma = SIMWARE['firmware'][i]["mc-start"] ;

           if (SIMWARE.metadata.version == 2) {
               var oc = parseInt(SIMWARE['firmware'][i]["oc"], 2) ;
                var eoc = 0 ;
                if (typeof SIMWARE['firmware'][i]["eoc"] != "undefined") {
                    eoc = parseInt(SIMWARE['firmware'][i]["eoc"], 2) ;
                    }

                var rom_addr = 64*oc + eoc ;
            } else {
                var co = parseInt(SIMWARE['firmware'][i]["co"], 2) ;
                var cop = 0 ;
                if (typeof SIMWARE['firmware'][i]["cop"] != "undefined") {
                    cop = parseInt(SIMWARE['firmware'][i]["cop"], 2) ;
                    }

                var rom_addr = 64*co + cop ;
            }

	       simhw_internalState_set('ROM', rom_addr, ma) ;
               SIMWARE['hash_ci'][rom_addr] = SIMWARE['firmware'][i]['signature'] ;
	    }

	    // 4.- load the MP from SIMWARE['mp']
            simhw_internalState_reset('MP', {}) ;
            var mp_obj = simhw_internalState('MP') ;
            var melto  = null ;
	    for (var key in SIMWARE['mp'])
	    {
                 melto = Object.assign({}, SIMWARE['mp'][key]) ;
                 melto.value = parseInt(SIMWARE['mp'][key].value.replace(/ /g,''), 2) ;

                 main_memory_set(mp_obj, parseInt(key), melto) ;
	    }

	    // 5.- load the segments from SIMWARE['seg']
            simhw_internalState_reset('segments', {}) ;
	    for (var key in SIMWARE['seg'])
	    {
	         simhw_internalState_set('segments', key, SIMWARE['seg'][key]) ;
	    }

	    // 6.- load the CM with default values...
            var curr_cfg = simhw_internalState('CM_cfg') ;
            var curr_cm  = cache_memory_init3(curr_cfg) ;
            simhw_internalState_reset('CM_cfg', curr_cfg) ;
            simhw_internalState_reset('CM',     curr_cm) ;

	    // 7.- show memories...
            show_main_memory   (mp_obj, 0, true, true) ;
            show_control_memory(mc_obj, 0, true) ;
	}

