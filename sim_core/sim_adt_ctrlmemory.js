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
         *  memory => {
         *               "0x...": { value: "SIGNAL=1011", ... },
         *               ...
         *            }
         */

        function control_memory_getkeys ( memory )
        {
            return Object.keys(memory) ;
        }

        function control_memory_get ( memory, elto )
        {
            return memory[elto] ;
        }

        function control_memory_set ( memory, elto, melto )
        {
            // default computed attributes
            if (typeof melto.changed     === "undefined")  melto.changed     = false ;
            if (typeof melto.state       === "undefined")  melto.state       = false ;
            if (typeof melto.breakpoint  === "undefined")  melto.breakpoint  = false ;
            if (typeof melto.notify      === "undefined")  melto.notify      = [] ;
            if (typeof melto.is_native   === "undefined")  melto.is_native   = false ;

            // modify computed attributes by comments "operators"
            var comments_str = '' ;
            if (null != melto.comments)
            {
                comments_str = melto.comments ;
                if (melto.comments instanceof Array)
                    comments_str = melto.comments.join("\n") ;

	        melto.state      = melto.state      || (comments_str.trim().split("state:").length > 1) ;
	        melto.breakpoint = melto.breakpoint || (comments_str.trim().split("break:").length > 1) ;
	        melto.notify     =                      comments_str.trim().split("notify:") ;
	        for (var k=0; k<melto.notify.length; k++) {
	             melto.notify[k] = melto.notify[k].split('\n')[0] ;
	        }
            }

            // get existing element (or undefined)
            var valobj = memory[elto] ;

            // if element exits -> update it and return it
            if (typeof valobj !== "undefined")
            {
                set_value(valobj, melto.value) ;
                valobj.changed = melto.changed ;

                if (null != melto.comments) {
                    valobj.comments   = melto.comments ;
		    valobj.state      = melto.state ;
		    valobj.breakpoint = melto.breakpoint ;
		    valobj.notify     = melto.notify ;
                }

                return valobj ;
            }

            // new element to be added and return "undefined" to inform the callee
            memory[elto] = melto ;

            return valobj ;
        }


        //
        // Auxiliar functions
        //

        function control_memory_lineToString ( memory, key )
        {
                var mcelto = control_memory_get(memory, key) ;

                // if empty element -> ""
	        if (typeof mcelto === "undefined") {
	   	    return "" ;
	        }

                // if native -> ""
	        if (mcelto.is_native)
                {
	            if (typeof mcelto.NATIVE_JIT === "function")
		         return "&lt;built-in&gt; " ;
	   	    else return "&lt;native&gt; " ;
	        }

                // if signals -> "S=V, ..."
		var value = "" ;
                var mc_val = get_value(mcelto) ;
		for (var ks in mc_val)
		{
		     if (1 == mc_val[ks])
			  value += ks + " ";
                     else value += ks + "=" + parseInt(mc_val[ks]).toString(2) + " ";
		}

		return value ;
        }


        //
        // verbal description
        //

	function get_verbal_from_current_mpc ( )
	{
	     var active_signals = "" ;
	     var active_verbal  = "" ;

	     var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	     var curr_maddr = get_value(simhw_sim_state(maddr_name)) ;

             var mcelto = simhw_internalState_get('MC', curr_maddr) ;
             var mins   = get_value(mcelto) ;
	     for (var key in mins)
	     {
		  if ("MADDR" === key) {
	   	      active_verbal  = active_verbal  + "MADDR is " + mins[key] + ". " ;
                      continue ;
		  }

		  active_signals = active_signals + key + " ";
	   	  active_verbal  = active_verbal  + compute_signal_verbals(key, mins[key]) ;
	     }

             // set default for empty
             active_signals = active_signals.trim() ;
             if (active_signals === "")
                 active_signals = "<no active signal>" ;
             if (active_verbal.trim() === "")
                 active_verbal = "<no actions>" ;

             // return
             return "Activated signals are: " + active_signals + ". Associated actions are: " + active_verbal ;
        }

