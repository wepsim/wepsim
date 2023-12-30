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
         *  Behavior
         */

        function check_behavior ( )
        {
            // 1.- check if no signals are defined...
            if (0 == simhw_sim_signals().length) {
                ws_alert("ALERT: empty signals!!!");
            }

            // 2.- check if no states are defined...
            if (0 == simhw_sim_states().length) {
                ws_alert("ALERT: empty states!!!");
            }

            for (var key in simhw_sim_signals())
            {
                for (var key2 in simhw_sim_signal(key).behavior)
                {
		    // 1.- Split several behaviors, example: "MV D1 O1; MV D2 O2"
                    var behaviors = simhw_sim_signal(key).behavior[key2].split(";") ;

		    // 2.- For every behavior...
		    for (var i=0; i<behaviors.length; i++)
                    {
			    var behavior_i = behaviors[i].trim();
			    var behavior_k = behavior_i.split(" ") ;

			    if ("" == behavior_i)  {
                                continue;
			    }

			    if (typeof (simhw_syntax_behavior(behavior_k[0])) == "undefined")
			    {
				ws_alert("ALERT: Unknown operation -> " + behavior_k[0] + " (" + behavior_i + ")");
				return;
			    }

			    if (behavior_k.length != simhw_syntax_behavior(behavior_k[0]).nparameters)
			    {
				ws_alert("ALERT: Behavior has an incorrect number of elements --> " + behavior_i + "/" + simhw_syntax_behavior(behavior_k[0]).nparameters);
				return;
			    }

			    for (var j=1; j<behavior_k.length; j++)
			    {
				var s = behavior_k[j].split('/') ;
				var t = simhw_syntax_behavior(behavior_k[0]).types[j-1] ;

				     if ( ("E" == t) && (typeof simhw_sim_state(s[0]) == "undefined") )
				     {
					  ws_alert("ALERT: Behavior has an undefined reference to a object state -> '" + behavior_i);
					  return;
				     }
				else if ( ("S" == t) && (typeof simhw_sim_signal(s[0]) == "undefined") )
				     {
					 ws_alert("ALERT: Behavior has an undefined reference to a signal -> '" + behavior_i);
					 return;
				     }
				else if ( ("X" == t) && (typeof simhw_sim_state(s[0]) == "undefined") && (typeof simhw_sim_signal(s[0]) == "undefined") )
				     {
					 ws_alert("ALERT: Behavior has an undefined reference to a object state OR signal -> '" + behavior_i);
					 return;
				     }
			    }
                    }
                }
            }
        }


        /*
         *  work with behaviors
         */

        var jit_behaviors   = false ;
        var jit_verbals     = false ;
        var jit_fire_dep    = null ;
        var jit_fire_order  = null ;
	var jit_dep_network = null ;
        var jit_fire_ndep   = null ;

        function firedep_to_fireorder ( jit_fire_dep )
        {
            var allfireto = false;
            jit_fire_order = [];
            jit_fire_ndep  = [];
            for (var sig in simhw_sim_signals())
            {
                if (typeof jit_fire_dep[sig] == "undefined") {
                    jit_fire_order.push(sig);
                    continue;
                }

		ndep = 0;
                allfireto = false;
                for (var sigorg in jit_fire_dep[sig])
                {
	             ndep++;
                     if (jit_fire_dep[sig][sigorg] == simhw_sim_signal(sigorg).behavior.length) {
                         allfireto = true;
                     }
                }
		jit_fire_ndep[sig] = ndep;
                if (allfireto == false)
                    jit_fire_order.push(sig);
            }
        }

        // behaviors
        function compile_behaviors ()
        {
            var jit_bes = "";
            jit_fire_dep = {};

	    var  sig_obj = null ;
	    var expr_obj = null ;

            for (var sig in simhw_sim_signals())
            {
		 jit_bes += "simhw_sim_signal('" + sig + "').behavior_fn = new Array();\n" ;

                 for (var val in simhw_sim_signal(sig).behavior)
                 {
                      var input_behavior = simhw_sim_signal(sig).behavior[val] ;
                      var jit_be = "";

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

			    // 2.3a.- ...to do the operation
                            if (s_expr[0] != "NOP") // warning: optimizated just because nop.operation is empty right now...
			        jit_be += "simhw_syntax_behavior('" + s_expr[0] + "').operation(" + JSON.stringify(s_expr) + ");\t" ;

                            // 2.3b.- ...build the fire graph
                            if ("FIRE" == s_expr[0])
                            {
                                 sig_obj = simhw_sim_signal(sig) ;
                                expr_obj = simhw_sim_signal(s_expr[1]) ;

                                if (typeof expr_obj == "undefined")
                                {
                                    ws_alert("ERROR: for signal '" + sig + "', unknow behavior '" + s_exprs[i] + "'");
                                }
                                else if (sig_obj.type == expr_obj.type)
                                {
                                    if (typeof jit_fire_dep[s_expr[1]] == "undefined")
                                        jit_fire_dep[s_expr[1]] = {};

                                    if (typeof jit_fire_dep[s_expr[1]][sig] == "undefined")
                                        jit_fire_dep[s_expr[1]][sig] = 0;

                                    jit_fire_dep[s_expr[1]][sig]++;
                                }
                            }
		      }

		      jit_bes += "simhw_sim_signal('" + sig + "').behavior_fn[" + val + "] = \t function() {" + jit_be + "};\n" ;
                 }
            }

	    eval(jit_bes) ;
            jit_behaviors = true ;
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
		    simhw_syntax_behavior(s_expr[0]).operation(s_expr);
            }
        }

        function compute_general_behavior ( name )
        {
            if (jit_behaviors)
                 simhw_syntax_behavior(name).operation();
            else compute_behavior(name) ;
        }

        function compute_signal_behavior ( signal_name, signal_value )
        {
            if (jit_behaviors)
                 simhw_sim_signal(signal_name).behavior_fn[signal_value]();
            else compute_behavior(simhw_sim_signal(signal_name).behavior[signal_value]) ;
        }

        // verbals
        function compile_verbals ()
        {
            var jit_vbl = "";

            for (var sig in simhw_sim_signals())
            {
		 jit_vbl += "simhw_sim_signal('" + sig + "').verbal_fn = new Array();\n" ;

                 for (var val in simhw_sim_signal(sig).behavior)
                 {
                      var input_behavior = simhw_sim_signal(sig).behavior[val] ;
                      var jit_be = " var r = \"\"; ";

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

			    // 2.3a.- ...to do the operation
			    jit_be += " r = r + simhw_syntax_behavior('" + s_expr[0] + "').verbal(" + JSON.stringify(s_expr) + ");\t" ;
		      }

		      jit_vbl += "simhw_sim_signal('" + sig + "').verbal_fn[" + val + "] = \t function() {" + jit_be + " return r; };\n" ;
                 }
            }

	    eval(jit_vbl) ;
            jit_verbals = true ;
        }

        function compute_verbal ( input_behavior )
        {
	    var verbal = "" ;

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
		    verbal = verbal + simhw_syntax_behavior(s_expr[0]).verbal(s_expr);
            }

            return verbal ;
        }

        function compute_signal_verbals ( signal_name, signal_value )
        {
            var verbal  = "" ;
            var sig_ref = null ;

            // check params...
            sig_ref = simhw_sim_signal(signal_name) ;
            if (typeof sig_ref.behavior == "undefined") {
		return verbal ;
	    }

            // common signals...
            var index = sig_ref.behavior.length - 1 ;
	    if (signal_value < index) {
		index = signal_value ;
	    }

            // if already exits...
            if ( (typeof sig_ref.verbal        != "undefined") &&
                 (typeof sig_ref.verbal[index] != "undefined") )
            {
		  return sig_ref.verbal[index] ;
	    }

            // otherwise, compute verbal from behaviors...
            if (jit_behaviors)
                 verbal = sig_ref.verbal_fn[index]();
            else verbal = compute_verbal(sig_ref.behavior[index]) ;

	    return verbal ;
        }

