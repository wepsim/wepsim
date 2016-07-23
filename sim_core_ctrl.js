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

        var tri_state_names = [ "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11" ] ;

        function check_ib ( fired )
        {
            // TD + R
            if ($("#databus_fire").is(":visible")) {
                $("#databus_fire").hide();
            }
            if ( (sim_signals["TD"].value != 0) && (sim_signals["R"].value != 0) )
            {
                $("#databus_fire").show();
                sim_states["BUS_DB"].value = 0xFFFFFFFF;
            }

            // Ti + Tj
            if (tri_state_names.indexOf(fired) == -1)
                return; 

            // 1.- counting the number of active tri-states 
            var tri_name = "";
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
            if ($("#internalbus_fire").is(":visible")) {
                $("#internalbus_fire").hide();
            }
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

