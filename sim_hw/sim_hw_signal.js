/*
 *  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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
         *  Model/signals (function simhw_signal_...(){})
         */

        var jit_fire_dep  = null ;
        var jit_fire_ndep = null ;
        var jit_fire_order   = null ;
        var jit_fire_order_E = null ;
        var jit_fire_order_L = null ;

     // to avoid loops such as M1->...->M1
        var fire_array_isfiring = [] ;
     // to avoid re-evaluations in the same clock cycle
        var fire_array_updated  = [] ;


        function firedep_to_fireorder ( jit_fire_dep )
        {
            var allfireto = false;

	    // build dependency graph
            jit_fire_order = [] ;
            jit_fire_ndep  = [] ;
            for (var sig in simhw_sim_signals())
            {
                if (typeof jit_fire_dep[sig] == "undefined") {
                    jit_fire_order.push(sig) ;
                    continue ;
                }

		ndep = 0 ;
                allfireto = false ;
                for (var sigorg in jit_fire_dep[sig])
                {
	             ndep++ ;
                     if (jit_fire_dep[sig][sigorg].fire == simhw_sim_signal(sigorg).behavior.length) {
                         allfireto = true ;
                     }
                }
		jit_fire_ndep[sig] = ndep;
                if (allfireto == false) {
                    jit_fire_order.push(sig) ;
		}
            }

	    // split Edge/Level signals
            jit_fire_order_E = [] ;
            jit_fire_order_L = [] ;
            for (var i=0; i<jit_fire_order.length; i++)
	    {
                if (simhw_sim_signal(jit_fire_order[i]).type == "E") {
                    jit_fire_order_E.push(jit_fire_order[i]) ;
                }
	   else if (simhw_sim_signal(jit_fire_order[i]).type == "L") {
                    jit_fire_order_L.push(jit_fire_order[i]) ;
                }
            }

	    // fire_array
            for (var signal_name in simhw_sim_signals()) {
		 fire_array_isfiring[signal_name] = false ;
		  fire_array_updated[signal_name] = false ;
            }
        }

        // TIP: update_state now is signal_apply_behaviour
        function signal_apply_behaviour ( signal_name )
        {
	    // skip empty behavior
	    var signal_obj = simhw_sim_signal(signal_name) ;
            if (0 == signal_obj.behavior.length) {
	        return ;
	    }

            var index_behavior = 0;
            if (signal_obj.behavior.length != 1)
            {
                // == 1 -> several signal values share the same behavior -> behavior[0]
	        // != 1 -> behaviour per index

                index_behavior = signal_obj.value ;
                if (signal_obj.behavior.length < index_behavior)
		{
                    ws_alert('ALERT: there are more signals values than behaviors defined!!!!\n' +
                             'key: ' + signal_name + ' and signal value: ' + index_behavior) ;
                    return ;
                }
	    }

	    // apply behaviour on states...
            compute_signal_behavior(signal_name, index_behavior) ;
        }

        function signal_fire ( signal_name )
        {
	    // 1. if is_firing -> return (avoid loops)
	    if (fire_array_isfiring[signal_name]) {
		return ;
	    }

	    // 2. is_firing = true
	    fire_array_isfiring[signal_name] = true ;
	     fire_array_updated[signal_name] = true ;

	    // 3. processing signal...
	    var signal_obj = simhw_sim_signal(signal_name) ;

	    update_draw(signal_obj, signal_obj.value) ;
	    if ("L" ==  signal_obj.type) {
		signal_apply_behaviour(signal_name) ;
	    }

	    // 4. is_firing = false
	    fire_array_isfiring[signal_name] = false ;
        }

        function signal_fireL ( )
        {
	    var signal_obj = null ;

	    // 1. not updated by default
	    for (const signal_name of jit_fire_order_L) {
	         fire_array_updated[signal_name] = false ;
	    }

	    // 2. try to fire once per clock cycle
	    for (const signal_name of jit_fire_order_L)
	    {
		 if (fire_array_updated[signal_name]) {
		     continue ;
		 }

                 // compact version of "signal_fire(signal_name);"
		 fire_array_updated[signal_name] = true ;
		 signal_obj = simhw_sim_signal(signal_name) ;
		 update_draw(signal_obj, signal_obj.value) ;
		 signal_apply_behaviour(signal_name) ;
	    }
	}


        /*
	 * CLOCK (parallel / sequential)
	 */

        // function update edge/level now
        function fn_updateE_now ( signal_name )
        {
	    var signal_obj = simhw_sim_signal(signal_name) ;

	    if ("E" == signal_obj.type) {
		signal_apply_behaviour(signal_name) ;
	    }
	}

        function fn_updateL_now ( signal_name )
        {
	    var signal_obj = simhw_sim_signal(signal_name) ;

	    update_draw(signal_obj, signal_obj.value) ;

	    if ("L" == signal_obj.type) {
		signal_apply_behaviour(signal_name) ;
	    }
	}

        // function update edge/level future
        function fn_updateE_future ( signal_name )
        {
            if (jit_fire_ndep[signal_name] < 1) // 1 -> 2
	         fn_updateE_now(signal_name);
	    else return new Promise( function(resolve, reject) { fn_updateE_now(signal_name); }) ;
	}

        function fn_updateL_future ( signal_name )
        {
            if (jit_fire_ndep[signal_name] < 1) // 1 -> 2
	         fn_updateL_now(signal_name);
	    else return new Promise( function(resolve, reject) { fn_updateL_now(signal_name); });
	}

        // functions for each clock cycle
        function signal_reset_and_apply ( sim_p_signals, mc_elto )
        {
	    // var signal_obj = null ;
	    var all_signals    = Object.entries(sim_p_signals) ;
	    var active_signals = Object.entries(get_value(mc_elto)) ;

	    // set all signals to default value
	    for (const [signal_name, signal_obj] of all_signals)
	    {
		 set_value(signal_obj, signal_obj.default_value);
	    }

	    // set active signals to current values
	    for (const [signal_name, value] of active_signals)
	    {
		 signal_obj = sim_p_signals[signal_name] ;
		 if (typeof signal_obj != "undefined") {
		     set_value(signal_obj, value) ;
		 }
	    }
	}

        function signal_apply_behaviour_allByEdge ( mc_elto )
        {
	    if ( (typeof mc_elto == "undefined") || (mc_elto.is_native) )
	    {     // skip signal activation if undefined OR is_native
		  return ;
	    }

	    for (const key of jit_fire_order_E)
	    {
		 signal_apply_behaviour(key);
	    }
	}

        function signal_apply_behaviour_allByLevel ( mc_elto )
        {
	    if (mc_elto.is_native)
	    {
                signal_fire("IOCHK") ; // compute_behavior("FIRE IOCHK") ;

		     if (typeof mc_elto.NATIVE_JIT != "undefined")
			 mc_elto.NATIVE_JIT() ;
		else if (typeof mc_elto.NATIVE != "undefined")
			 eval(mc_elto.NATIVE) ;
	    }
	    else
	    {
                signal_fireL() ;
	    }
	}

