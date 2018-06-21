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
         *  Get/Set
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

        function get_value ( sim_obj )
        {
	   if (typeof sim_obj.value == "function")
	   {
	       return sim_obj.value() ;
	   }
	   else if (typeof sim_obj.default_value == "object")
	   {
	       return sim_obj.value ;
	   }
	   else
	   {
	       return sim_obj.value ;
	   }
        }

        function set_value ( sim_obj, value )
        {
	   if (typeof sim_obj.value == "function") 
	   {
	       if (sim_obj.value() != value)
	           sim_obj.changed = true ;

	       sim_obj.value(value) ;
           }
	   else if (typeof sim_obj.default_value == "object")
	   {
	       if (sim_obj.value != value)
	           sim_obj.changed = true ;

	       sim_obj.value = value ;
           }
	   else
	   {
	       if (sim_obj.value != value)
	           sim_obj.changed = true ;

	       sim_obj.value = value ;
           }
        }

        function reset_value ( sim_obj )
        {
           if (typeof sim_obj.value == "function")
	   {
	        if (sim_obj.value() != sim_obj.default_value)
	            sim_obj.changed = true ;

	        set_value(sim_obj, sim_obj.default_value) ;
           }
	   else if (typeof sim_obj.default_value == "object")
	   {
	        sim_obj.changed = true ;
	        sim_obj.value = Object.create(sim_obj.default_value) ;
           }
	   else if (sim_obj instanceof Array)
	   {
	        sim_obj.changed = true ;
	        for (var i=0; i<sim_obj.length; i++)
	  	     set_value(sim_obj[i], sim_obj[i].default_value) ;
           }
	   else
	   {
	        if (sim_obj.value != sim_obj.default_value)
	            sim_obj.changed = true ;

	        set_value(sim_obj, sim_obj.default_value) ;
           }
        }

        var sim_references = new Object() ;

        function compute_references ( )
        {
            for (var key in sim_signals) {
		 sim_references[key] = sim_signals[key] ;
		    sim_signals[key].changed = false ;
	    }

            for (var key in sim_states) {
		 sim_references[key] = sim_states[key] ;
		     sim_states[key].changed = false ;
	    }
        }

        function get_reference ( sim_name )
        {
	    return sim_references[sim_name] ;
        }


        /*
         *  checking & updating
         */

        var tri_state_names = [ "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11" ] ;

        var databus_fire_visible = false ;
        var internalbus_fire_visible = false ;

        function check_buses ( fired )
        {
            // TD + R
            if (databus_fire_visible) {
                //$("#databus_fire").hide();
		     var o = document.getElementById('svg_p');
		     if (o != null) o = o.contentDocument;
		     if (o != null) o = o.getElementById('databus_fire');
		     if (o != null) o.setAttributeNS(null, "visibility", "hidden");
                databus_fire_visible = false ;
            }
            if ( (sim_signals["TD"].value != 0) && (sim_signals["R"].value != 0) )
            {
                //$("#databus_fire").show();
		     var o = document.getElementById('svg_p');
		     if (o != null) o = o.contentDocument;
		     if (o != null) o = o.getElementById('databus_fire');
		     if (o != null) o.setAttributeNS(null, "visibility", "visible");
                databus_fire_visible = true ;
                sim_states["BUS_DB"].value = 0xFFFFFFFF;
            }

            // Ti + Tj
            if (tri_state_names.indexOf(fired) == -1)
                return;

            // 1.- counting the number of active tri-states
            var tri_name = "";
            var tri_activated = 0;
	    var tri_activated_name  = "";
	    var tri_activated_value = 0;
            for (var i=0; i<tri_state_names.length; i++)
            {
		 tri_activated_name  = tri_state_names[i] ;
                 tri_activated_value = parseInt(get_value(sim_signals[tri_activated_name])) ;
                 tri_activated      += tri_activated_value ;

		 if (tri_activated_value > 0)
		     tri_name = tri_activated_name ;
                 if (tri_activated > 1)
                     break ;
            }

            // 2.- paint the bus if any tri-state is active
            if (tri_activated > 0) {
                update_draw(sim_signals[tri_name], 1) ;
            }

            // 3.- check if more than one tri-state is active
            if (internalbus_fire_visible) {
                //$("#internalbus_fire").hide();
		     var o = document.getElementById('svg_p');
		     if (o != null) o = o.contentDocument;
		     if (o != null) o = o.getElementById('internalbus_fire');
		     if (o != null) o.setAttributeNS(null, "visibility", "hidden");
                internalbus_fire_visible = false ;
            }
            if (tri_activated > 1) {
                //$("#internalbus_fire").show();
		     var o = document.getElementById('svg_p');
		     if (o != null) o = o.contentDocument;
		     if (o != null) o = o.getElementById('internalbus_fire');
		     if (o != null) o.setAttributeNS(null, "visibility", "visible");
                internalbus_fire_visible = true ;
                sim_states["BUS_IB"].value = 0xFFFFFFFF;
            }
        }

        function check_behavior ( )
        {
            // 1.- check if no signals are defined...
            if (0 == sim_signals.length)
                alert("ALERT: empty signals!!!");

            // 2.- check if no states are defined...
            if (0 == sim_states.length)
                alert("ALERT: empty states!!!");

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
				var s = behavior_k[j].split('/') ;
				var t = syntax_behavior[behavior_k[0]].types[j-1] ;

				     if ( ("E" == t) && (typeof sim_states[s[0]] == "undefined") )
				     {
					  alert("ALERT: Behavior has an undefined reference to a object state -> '" + behavior_i);
					  return;
				     }
				else if ( ("S" == t) && (typeof sim_signals[s[0]] == "undefined") )
				     {
					 alert("ALERT: Behavior has an undefined reference to a signal -> '" + behavior_i);
					 return;
				     }
				else if ( ("X" == t) && (typeof sim_states[s[0]] == "undefined") && (typeof sim_signals[s[0]] == "undefined") )
				     {
					 alert("ALERT: Behavior has an undefined reference to a object state OR signal -> '" + behavior_i);
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
        var jit_fire_dep    = null ;
        var jit_fire_order  = null ;
	var jit_dep_network = null ;
        var jit_fire_ndep   = null ;

        function firedep_to_fireorder ( jit_fire_dep )
        {
            var allfireto = false;
            jit_fire_order = new Array();
            jit_fire_ndep  = new Array();
            for (var sig in sim_signals)
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
                     if (jit_fire_dep[sig][sigorg] == sim_signals[sigorg].behavior.length) {
                         allfireto = true;
                     }
                }
		jit_fire_ndep[sig] = ndep;
                if (allfireto == false)
                    jit_fire_order.push(sig);
            }
        }

        function compile_behaviors ()
        {
            var jit_bes = "";
            jit_fire_dep = new Object();

            for (var sig in sim_signals)
            {
		 jit_bes += "sim_signals['" + sig + "'].behavior_fn = new Array();\n" ;

                 for (var val in sim_signals[sig].behavior)
                 {
                      var input_behavior = sim_signals[sig].behavior[val] ;
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
			        jit_be += "syntax_behavior['" + s_expr[0] + "'].operation(" + JSON.stringify(s_expr) + ");\t" ;

                            // 2.3b.- ...build the fire graph
                            if ( ("FIRE" == s_expr[0]) &&
                                 (sim_signals[sig].type == sim_signals[s_expr[1]].type) )
                            {
                                if (typeof jit_fire_dep[s_expr[1]] == "undefined")
                                    jit_fire_dep[s_expr[1]] = new Object();

                                if (typeof jit_fire_dep[s_expr[1]][sig] == "undefined")
                                    jit_fire_dep[s_expr[1]][sig] = 0;

                                jit_fire_dep[s_expr[1]][sig]++;
                            }
		      }

		      jit_bes += "sim_signals['" + sig + "'].behavior_fn[" + val + "] = \t function() {" + jit_be + "};\n" ;
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
		    syntax_behavior[s_expr[0]].operation(s_expr);
            }
        }

        function compute_general_behavior ( name )
        {
            if (jit_behaviors)
                 syntax_behavior[name].operation();
            else compute_behavior(name) ;
        }

        function compute_signal_behavior ( signal_name, signal_value )
        {
            if (jit_behaviors)
                 sim_signals[signal_name].behavior_fn[signal_value]();
            else compute_behavior(sim_signals[signal_name].behavior[signal_value]) ;
        }


        /*
	 * CLOCK (parallel / sequential)
	 */

        function fn_updateE_now ( key )
        {
	    if ("E" == sim_signals[key].type) {
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
	    update_draw(sim_signals[key], sim_signals[key].value) ;
	    if ("L" == sim_signals[key].type) {
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

           switch (sim_signals[key].behavior.length)
           {
                case 0: // skip empty behavior
                     return;
                     break;

                case 1: // several signal values share the same behavior -> behavior[0]
                     index_behavior = 0;
                     break;

                default:
                     index_behavior = sim_signals[key].value ;
                     if (sim_signals[key].behavior.length < index_behavior) {
                         alert('ALERT: there are more signals values than behaviors defined!!!!\n' +
                               'key: ' + key + ' and signal value: ' + index_behavior);
                         return;
                     }
                     break;
           }

           compute_signal_behavior(key,index_behavior) ;
        }


        function show_memories_values ( )
        {
		/*
               show_main_memory(MP,               get_value(sim_states['REG_PC']),        true, true) ;
            show_control_memory(MC, MC_dashboard, get_value(sim_states['REG_MICROADDR']), true, true) ;
		*/

            var f1 = new Promise(function(resolve, reject) {
                 show_main_memory(MP, get_value(sim_states['REG_PC']), true, true) ;
                 resolve(1);
            });
            var f2 = new Promise(function(resolve, reject) {
                 show_control_memory(MC, MC_dashboard, get_value(sim_states['REG_MICROADDR']), true) ;
                 resolve(1);
            });

            Promise.all([f1, f2]);
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
                new_ins["microcomments"]   = new Array() ;

                SIMWARE['firmware'].push(new_ins) ;
                assoc_i = SIMWARE['firmware'].length - 1 ;
            }

	    var pos = get_value(sim_states["REG_MICROADDR"]) - parseInt(SIMWARE['firmware'][assoc_i]["mc-start"]) ;
	    if (typeof SIMWARE['firmware'][assoc_i]["microcode"][pos] == "undefined") {
		SIMWARE['firmware'][assoc_i]["microcode"][pos]     = new Object() ;
		SIMWARE['firmware'][assoc_i]["microcomments"][pos] = "" ;
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
	     var help_base = 'help/signals-' + get_cfg('ws_idiom') + '.html #' + key;
	     $(helpdiv).load(help_base,
			      function(response, status, xhr) {
				  if ( $(helpdiv).html() == "" )
				       $(helpdiv).html('<br>Sorry, No more details available for this signal.<p>\n');
				  $(helpdiv).trigger('create');
			      });
             ga('send', 'event', 'help', 'help.signal', 'help.signal.' + key);
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
                        var checkvalue  = (sim_signals[key].value >>> 0) ;
                        var str_bolded  = "";
                        var str_checked = "";
                        var input_help  = "";
                        var behav_str   = new Array();
                        var n = 0;

                        var nvalues = Math.pow(2, sim_signals[key].nbits) ;
                        if (sim_signals[key].behavior.length == nvalues)
                        {
                            for (var k = 0; k < sim_signals[key].behavior.length; k++)
                            {
                                 if (k == checkvalue)
                                      str_checked = ' checked="checked" ' ;
                                 else str_checked = ' ' ;

                                 behav_str = sim_signals[key].behavior[k].split(";") ;
                                 if (sim_signals[key].default_value != k)
                                      str_bolded =         behav_str[0] ;
                                 else str_bolded = '<b>' + behav_str[0] + '</b>' ;

                                 n = sim_signals[key].behavior[k].indexOf(";");
                                 if (-1 == n)
                                     n = sim_signals[key].behavior[k].length;
                                 str_bolded = '&nbsp;' + str_bolded +
                                              '<span style="color:#CCCCCC">' + sim_signals[key].behavior[k].substring(n) + '</span>' ;

                                 n = k.toString(10) ;
				 input_help += '<li><label>' +
                                               '<input aria-label="value ' + n + '" type="radio" name="ask_svalue" ' +
                                               '       value="' + n + '" ' + str_checked + ' />' + str_bolded +
                                               '</label></li>' ;
                            }
                        }
                        else {
				 input_help += '<div><center><label>' +
                                               '<input aria-label="value for ' + key + '" type="number" size=4 min=0 max=' + (nvalues - 1) + ' class=dial ' +
                                               '       name="ask_svalue" value="' + sim_signals[key].value + '"/>' + '&nbsp;&nbsp;' + ' 0 - ' + (nvalues - 1) +
                                               '</center></label></div>\n' ;
                        }

			bootbox.dialog({
			       title:   '<center>' + key + ': ' +
                                        ' <div class="btn-group">' +
                                        '   <button onclick="$(\'#bot_signal\').carousel(0);" ' +
                                        '           type="button" class="btn btn-info" ' + 
                                        '           style="height:34px !important;">Value</button>' +
                                        '   <button onclick="$(\'#bot_signal\').carousel(1); update_signal_loadhelp(\'#help2\',$(\'#ask_skey\').val());" ' +
                                        '           type="button" class="btn btn-success" ' + 
                                        '           style="height:34px !important;">Help</button>' +
                                        '   <button type="button" class="btn btn-success dropdown-toggle" ' +
                                        '           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="height:34px !important;">' +
                                        '     <span class="caret"></span>' +
                                        '     <span class="sr-only">Toggle Help Idiom</span>' +
                                        '   </button>' +
                                        '   <ul class="dropdown-menu">' +
                                        '    <li><a href="#" onclick="set_cfg(\'ws_idiom\',\'es\'); save_cfg(); $(\'#bot_signal\').carousel(1); ' +
                                        '                             update_signal_loadhelp(\'#help2\',$(\'#ask_skey\').val());">ES</a></li>' +
                                        '    <li><a href="#" onclick="set_cfg(\'ws_idiom\',\'en\'); save_cfg(); $(\'#bot_signal\').carousel(1); ' +
                                        '                             update_signal_loadhelp(\'#help2\',$(\'#ask_skey\').val());">EN</a></li>' +
                                        '   </ul>' +
                                        ' </div>' +
                                        '</center>',
                               message: '<div id="bot_signal" class="carousel slide" data-ride="carousel" data-interval="false">' +
                                        '  <div class="carousel-inner" role="listbox">' +
                                        '    <div class="item active">' +
                                        '         <div style="max-height:70vh; width:inherit; overflow:auto;">' +
                                        '         <form class="form-horizontal" style="white-space:nowrap;">' +
                                        '         <input aria-label="value for ' + key + '" id="ask_skey" name="ask_skey" type="hidden" value="' + key + '" class="form-control input-md"> ' +
                                        '         <ol start="0">' +
                                                  input_help +
                                        '         </ol>' +
                                        '         </form>' +
                                        '         </div>' +
                                        '    </div>' +
                                        '    <div class="item">' +
                                        '         <div id=help2 style="max-height:70vh; width:inherit; overflow:auto;">Loading...</div>' +
                                        '    </div>' +
                                        '  </div>' +
                                        '</div>',
			       value:   sim_signals[key].value,
                               animate: false,
			       buttons: {
					    success: {
						label: "Save",
						className: "btn-primary col-xs-3 col-sm-2 pull-right",
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
                                                                 if (sim_signals[key].value != sim_signals[key].default_value)
								      sim_states["REG_MICROINS"].value[key] = sim_signals[key].value ;
								 else delete(sim_states["REG_MICROINS"].value[key]);

								 // update MC[uADDR]
								 if (typeof MC[get_value(sim_states["REG_MICROADDR"])] == "undefined") {
								     MC[get_value(sim_states["REG_MICROADDR"])] = new Object() ;
								     MC_dashboard[get_value(sim_states["REG_MICROADDR"])] = new Object() ;
								 }
								 MC[get_value(sim_states["REG_MICROADDR"])][key] = sim_signals[key].value ;
								 MC_dashboard[get_value(sim_states["REG_MICROADDR"])][key] = { comment: "", breakpoint: false, state: false, notify: new Array() };

								 // update ROM[..]
								 update_signal_firmware(key) ;

								 // update save-as...
								 var SIMWARE = get_simware() ;
								 document.getElementById("inputFirmware").value = saveFirmware(SIMWARE) ;
							     }
							
							     // fire signal
							     compute_behavior('FIRE ' + key) ;
							  }
					    },
					    close: {
						label: "Close",
						className: "btn-danger col-xs-3 col-sm-2 pull-right",
						callback: function() { }
					    }
					}
			});

                        $(".dial").knob({ 'min':0, 'max':(nvalues-1) })
                                  .val(sim_signals[key].value)
                                  .trigger('change');

                    } // if (event.name == signals.firename.name)
                } // for all signals.firename...
            } // for all signals

	    show_states();
	    show_rf_values();
        }

        // update ALU flags: test_n, test_z, test_v, test_c
        function update_nzvc ( flag_n, flag_z, flag_v, flag_c )
        {
	   set_value(sim_states["FLAG_N"], flag_n) ;
	   set_value(sim_states["FLAG_Z"], flag_z) ;
	   set_value(sim_states["FLAG_V"], flag_v) ;
	   set_value(sim_states["FLAG_C"], flag_c) ;

	   set_value(sim_signals["TEST_N"], flag_n) ;
	   set_value(sim_signals["TEST_Z"], flag_z) ;
	   set_value(sim_signals["TEST_V"], flag_v) ;
	   set_value(sim_signals["TEST_C"], flag_c) ;
        }

        function update_memories ( preSIMWARE )
        {
	    // 1.- load the SIMWARE
            set_simware(preSIMWARE) ;
            var SIMWARE = get_simware() ;

	    // 2.- load the MC from ROM['firmware']
            MC           = new Object() ;
            MC_dashboard = new Object() ;
            for (var i=0; i<SIMWARE['firmware'].length; i++)
	    {
               var elto_state  = false ;
               var elto_break  = false ;
               var elto_notify = new Array() ;

	       var last = SIMWARE['firmware'][i]["microcode"].length ; // mc = microcode
               var mci  = SIMWARE['firmware'][i]["mc-start"] ;
	       for (var j=0; j<last; j++)
	       {
		    var comment = SIMWARE['firmware'][i]["microcomments"][j] ;
		    MC[mci]     = SIMWARE['firmware'][i]["microcode"][j] ;

                    elto_state  = (comment.trim().split("state:").length > 1) ;
                    elto_break  = (comment.trim().split("break:").length > 1) ;
                    elto_notify =  comment.trim().split("notify:") ;
		    for (var k=0; k<elto_notify.length; k++) {
		         elto_notify[k] = elto_notify[k].split('\n')[0] ;
                    }

		    MC_dashboard[mci] = { comment: comment, 
                                          state: elto_state, 
                                          breakpoint: elto_break, 
                                          notify: elto_notify } ;
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

            /// bugfix safari bug 10.1.2
	    for (var e in MP) {
	         if (isNaN(MP[e])) {
	    	     delete MP[e];
                 }
            }
            /// end bugfix 

	    // 5.- load the segments from SIMWARE['seg']
            segments = new Object() ;
	    for (var key in SIMWARE['seg'])
	    {
	       segments[key] = SIMWARE['seg'][key] ;
	    }

	    // 6.- show memories...
            show_main_memory   (MP,                0, true, true) ;
            show_control_memory(MC,  MC_dashboard, 0, true) ;
	}

