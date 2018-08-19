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
            var cf = simhw_internalState('FIRMWARE') ;

	    if (typeof cf['firmware'] == "undefined")            cf['firmware']           = new Array() ;
	    if (typeof cf['mp'] == "undefined")                  cf['mp']                 = new Object() ;
	    if (typeof cf['seg'] == "undefined")                 cf['seg']                = new Object() ;
	    if (typeof cf['assembly'] == "undefined")            cf['assembly']           = new Object() ;
	    if (typeof cf['labels'] == "undefined")              cf['labels']             = new Object() ;
	    if (typeof cf['labels2'] == "undefined")             cf['labels2']            = new Object() ;
	    if (typeof cf['labels_firm'] == "undefined")         cf['labels_firm']        = new Object() ;
	    if (typeof cf['registers'] == "undefined")           cf['registers']          = new Object() ;
	    if (typeof cf['pseudoInstructions'] == "undefined")  cf['pseudoInstructions'] = new Object() ;
	    if (typeof cf['stackRegister'] == "undefined")       cf['stackRegister']      = new Object() ;
	    if (typeof cf['cihash'] == "undefined")              cf['cihash']             = new Object() ;
	    if (typeof cf['cocop_hash'] == "undefined")          cf['cocop_hash']         = new Object() ;

            return cf ;
	}

        function set_simware ( preWARE )
        {
            var cf = simhw_internalState('FIRMWARE') ;

	    if (typeof preWARE['firmware'] != "undefined")           cf['firmware'] = preWARE['firmware'] ;
	    if (typeof preWARE['mp'] != "undefined")                 cf['mp'] = preWARE['mp'] ;
	    if (typeof preWARE['registers'] != "undefined")          cf['registers'] = preWARE['registers'] ;
	    if (typeof preWARE['assembly'] != "undefined")           cf['assembly'] = preWARE['assembly'] ;
	    if (typeof preWARE['pseudoInstructions'] != "undefined") cf['pseudoInstructions'] = preWARE['pseudoInstructions'] ;

	    if (typeof preWARE['seg'] != "undefined")                cf['seg'] = preWARE['seg'] ;
	    if (typeof preWARE['labels'] != "undefined")             cf['labels'] = preWARE['labels'] ;
	    if (typeof preWARE['labels2'] != "undefined")            cf['labels2'] = preWARE['labels2'] ;
	    if (typeof preWARE['labels_firm'] != "undefined")        cf['labels_firm'] = preWARE['labels_firm'] ;
	    if (typeof preWARE['stackRegister'] != "undefined")      cf['stackRegister'] = preWARE['stackRegister'] ;
	    if (typeof preWARE['cihash'] != "undefined")             cf['cihash'] = preWARE['cihash'] ;
	    if (typeof preWARE['cocop_hash'] != "undefined")         cf['cocop_hash'] = preWARE['cocop_hash'] ;
	}

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


        /*
         *  checking & updating
         */

        function check_buses ( fired )
        {
            var tri_state_names = simhw_internalState('tri_state_names') ;

            // TD + R
            if (simhw_internalState_get('fire_visible','databus') == true) 
            {
		var o = document.getElementById('svg_p');
		if (o != null) o = o.contentDocument;
		if (o != null) o = o.getElementById('databus_fire');
		if (o != null) o.setAttributeNS(null, "visibility", "hidden");

                simhw_internalState_set('fire_visible', 'databus', false) ;
            }
            if ( (simhw_sim_signal("TD").value != 0) && (simhw_sim_signal("R").value != 0) )
            {
		var o = document.getElementById('svg_p');
		if (o != null) o = o.contentDocument;
		if (o != null) o = o.getElementById('databus_fire');
		if (o != null) o.setAttributeNS(null, "visibility", "visible");

                simhw_internalState_set('fire_visible', 'databus', true) ;
                simhw_sim_state("BUS_DB").value = 0xFFFFFFFF;
            }

            // Ti + Tj
            if (tri_state_names.indexOf(fired) == -1) {
                return;
            }

            // 1.- counting the number of active tri-states
            var tri_name = "";
            var tri_activated = 0;
	    var tri_activated_name  = "";
	    var tri_activated_value = 0;
            for (var i=0; i<tri_state_names.length; i++)
            {
		 tri_activated_name  = tri_state_names[i] ;
                 tri_activated_value = parseInt(get_value(simhw_sim_signal(tri_activated_name))) ;
                 tri_activated      += tri_activated_value ;

		 if (tri_activated_value > 0)
		     tri_name = tri_activated_name ;
                 if (tri_activated > 1)
                     break ;
            }

            // 2.- paint the bus if any tri-state is active
            if (tri_activated > 0) {
                update_draw(simhw_sim_signal(tri_name), 1) ;
            }

            // 3.- check if more than one tri-state is active
            if (simhw_internalState_get('fire_visible','internalbus') == true)
            {
		var o = document.getElementById('svg_p');
		if (o != null) o = o.contentDocument;
		if (o != null) o = o.getElementById('internalbus_fire');
		if (o != null) o.setAttributeNS(null, "visibility", "hidden");

                simhw_internalState_set('fire_visible', 'internalbus', false) ;
            }
            if (tri_activated > 1) 
            {
		var o = document.getElementById('svg_p');
		if (o != null) o = o.contentDocument;
		if (o != null) o = o.getElementById('internalbus_fire');
		if (o != null) o.setAttributeNS(null, "visibility", "visible");

                simhw_internalState_set('fire_visible', 'internalbus', true) ;
                simhw_sim_state("BUS_IB").value = 0xFFFFFFFF;
            }
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
               show_main_memory(simhw_internalState('MP'),               
                                get_value(simhw_sim_state('REG_PC')),        true, true) ;
            show_control_memory(simhw_internalState('MC'),
                                simhw_internalState('MC_dashboard'), 
                                get_value(simhw_sim_state('REG_MICROADDR')), true, true) ;
		*/

            var f1 = new Promise(function(resolve, reject) {
                 show_main_memory(simhw_internalState('MP'), 
                                  get_value(simhw_sim_state('REG_PC')), true, true) ;
                 resolve(1);
            });
            var f2 = new Promise(function(resolve, reject) {
                 show_control_memory(simhw_internalState('MC'), 
                                     simhw_internalState('MC_dashboard'), 
                                     get_value(simhw_sim_state('REG_MICROADDR')), true) ;
                 resolve(1);
            });

            Promise.all([f1, f2]);
	}

        function update_signal_firmware ( key )
        {
            var SIMWARE = get_simware() ;

	    var assoc_i = -1;
            for (var i=0; i<SIMWARE['firmware'].length; i++) {
		 if (parseInt(SIMWARE['firmware'][i]["mc-start"]) > get_value(simhw_sim_state("REG_MICROADDR"))) { break; }
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

	    var pos = get_value(simhw_sim_state("REG_MICROADDR")) - parseInt(SIMWARE['firmware'][assoc_i]["mc-start"]) ;
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

        function update_signal (event)
        {
	    if (false === get_cfg('is_interactive'))
                return;

            for (var key in simhw_sim_signals())
            {
                for (var j=0; j<simhw_sim_signal(key).fire_name.length; j++)
                {
	            var r = simhw_sim_signal(key).fire_name[j].split(':') ;
                    if (r[1] == event.currentTarget.id)
                    {
                        var checkvalue  = (simhw_sim_signal(key).value >>> 0) ;
                        var str_bolded  = "";
                        var str_checked = "";
                        var input_help  = "";
                        var behav_str   = new Array();
                        var n = 0;

                        var nvalues = Math.pow(2, simhw_sim_signal(key).nbits) ;
                        if (simhw_sim_signal(key).behavior.length == nvalues)
                        {
                            for (var k = 0; k < simhw_sim_signal(key).behavior.length; k++)
                            {
                                 if (k == checkvalue)
                                      str_checked = ' checked="checked" ' ;
                                 else str_checked = ' ' ;

                                 behav_str = simhw_sim_signal(key).behavior[k].split(";") ;
                                 if (simhw_sim_signal(key).default_value != k)
                                      str_bolded =         behav_str[0] ;
                                 else str_bolded = '<b>' + behav_str[0] + '</b>' ;

                                 n = simhw_sim_signal(key).behavior[k].indexOf(";");
                                 if (-1 == n)
                                     n = simhw_sim_signal(key).behavior[k].length;
                                 str_bolded = '&nbsp;' + str_bolded +
                                              '<span style="color:#CCCCCC">' + simhw_sim_signal(key).behavior[k].substring(n) + '</span>' ;

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
                                               '       name="ask_svalue" value="' + simhw_sim_signal(key).value + '"/>' + '&nbsp;&nbsp;' + ' 0 - ' + (nvalues - 1) +
                                               '</center></label></div>\n' ;
                        }

                        var curr_hw = simhw_short_name() ;
                        if ("" == curr_hw) {
                            curr_hw = "ep" ;
	                }

			var bb = bootbox.dialog({
			       title:   '<center>' + key + ': ' +
                                        ' <div class="btn-group">' +
                                        '   <button onclick="$(\'#bot_signal\').carousel(0);" ' +
                                        '           type="button" class="btn btn-info">Value</button>' +
                                        '   <button onclick="$(\'#bot_signal\').carousel(1); update_signal_loadhelp(\'#help2\',$(\'#ask_shard\').val(),$(\'#ask_skey\').val());" ' +
                                        '           type="button" class="btn btn-success">Help</button>' +
                                        '   <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" ' +
                                        '           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                                        '     <span class="caret"></span>' +
                                        '     <span class="sr-only">Toggle Help Idiom</span>' +
                                        '   </button>' +
                                        '   <div class="dropdown-menu">' +
                                        '        <a href="#" class="dropdown-item" ' + 
				        '                    onclick="set_cfg(\'ws_idiom\',\'es\'); save_cfg(); $(\'#bot_signal\').carousel(1); ' +
                                        '                             update_signal_loadhelp(\'#help2\',$(\'#ask_shard\').val(),$(\'#ask_skey\').val());" ' + 
				        '        >ES<span class="d-none d-sm-inline-flex">&nbsp;(Spanish)</span></a>' +
                                        '        <a href="#" class="dropdown-item" ' + 
				        '                    onclick="set_cfg(\'ws_idiom\',\'en\'); save_cfg(); $(\'#bot_signal\').carousel(1); ' +
                                        '                             update_signal_loadhelp(\'#help2\',$(\'#ask_shard\').val(),$(\'#ask_skey\').val());" ' +
				        '        >EN<span class="d-none d-sm-inline-flex">&nbsp;(English)</span></a>' +
                                        '   </div>' +
                                        ' </div>' +
                                        '</center>',
                               message: '<div id="bot_signal" class="carousel slide" data-ride="carousel" data-interval="false">' +
                                        '  <div class="carousel-inner" role="listbox">' +
                                        '    <div class="carousel-item active">' +
                                        '         <div style="max-height:70vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;">' +
                                        '         <form class="form-horizontal" style="white-space:nowrap;">' +
                                        '         <input aria-label="value for ' + key     + '" id="ask_skey"  name="ask_skey"  type="hidden" value="' + key     + '" class="form-control input-md"> ' +
                                        '         <input aria-label="value for ' + curr_hw + '" id="ask_shard" name="ask_shard" type="hidden" value="' + curr_hw + '" class="form-control input-md"> ' +
                                        '         <ol start="0">' +
                                                  input_help +
                                        '         </ol>' +
                                        '         </form>' +
                                        '         </div>' +
                                        '    </div>' +
                                        '    <div class="carousel-item">' +
                                        '         <div id=help2 style="max-height:65vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;">Loading...</div>' +
                                        '    </div>' +
                                        '  </div>' +
                                        '</div>',
			       value:   simhw_sim_signal(key).value,
                               animate: false,
                               size:    'large',
			       buttons: {
					    success: {
						label: "Save",
						className: "btn-primary btn-sm col-xs-3 col-sm-2 float-right",
						callback: function ()
							  {
							     key        = $('#ask_skey').val();
							     user_input = $("input[name='ask_svalue']:checked").val();
                                                             if (typeof user_input == "undefined") {
							         user_input = $("input[name='ask_svalue']").val();
	                                                     }

							     simhw_sim_signal(key).value = user_input ;

	                                                     if (true === get_cfg('is_interactive'))
							     {
								 // update REG_MICROINS
                                                                 if (simhw_sim_signal(key).value != simhw_sim_signal(key).default_value)
								      simhw_sim_state("REG_MICROINS").value[key] = simhw_sim_signal(key).value ;
								 else delete(simhw_sim_state("REG_MICROINS").value[key]);

								 // update MC[uADDR]
								 var curr_maddr = get_value(simhw_sim_state("REG_MICROADDR")) ;
								 if (typeof simhw_internalState_get('MC', curr_maddr) == "undefined") {
								     simhw_internalState_set('MC', curr_maddr, new Object()) ;
								     simhw_internalState_set('MC_dashboard', curr_maddr, new Object()) ;
								 }
                                                                 simhw_internalState_get('MC', curr_maddr)[key] = simhw_sim_signal(key).value ;
								 simhw_internalState_get('MC_dashboard', curr_maddr)[key] = { comment: "", breakpoint: false, state: false, notify: new Array() };

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
						className: "btn-danger btn-sm col-xs-3 col-sm-2 float-right",
						callback: function() { }
					    }
					}
			});

			bb.find(".modal-title").addClass("mx-auto") ;
			bb.find(".bootbox-close-button").addClass("mx-1") ;

                        $(".dial").knob({ 'min':0, 'max':(nvalues-1) })
                                  .val(simhw_sim_signal(key).value)
                                  .trigger('change');

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
            simhw_internalState_reset('MC', {}) ;
            simhw_internalState_reset('MC_dashboard', {}) ;
            for (var i=0; i<SIMWARE['firmware'].length; i++)
	    {
               var elto_state  = false ;
               var elto_break  = false ;
               var elto_notify = new Array() ;

	       var last = SIMWARE['firmware'][i]["microcode"].length ; // mc = microcode
               var mci  = SIMWARE['firmware'][i]["mc-start"] ;
	       for (var j=0; j<last; j++)
	       {
		    var comment  = SIMWARE['firmware'][i]["microcomments"][j] ;
                    elto_state   = (comment.trim().split("state:").length > 1) ;
                    elto_break   = (comment.trim().split("break:").length > 1) ;
                    elto_notify  =  comment.trim().split("notify:") ;
		    for (var k=0; k<elto_notify.length; k++) {
		         elto_notify[k] = elto_notify[k].split('\n')[0] ;
                    }

		    simhw_internalState_set('MC',           mci, SIMWARE['firmware'][i]["microcode"][j]) ;
                    simhw_internalState_set('MC_dashboard', mci, { comment: comment, 
                                                                   state: elto_state, 
                                                                   breakpoint: elto_break, 
                                                                   notify: elto_notify }) ;
		    mci++;
	       }
	    }

	    // 3.- load the ROM (2/2)
            simhw_internalState_reset('ROM', {}) ;
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
	       simhw_internalState_set('ROM', rom_addr, ma) ;
               SIMWARE['cihash'][rom_addr] = SIMWARE['firmware'][i]['signature'] ;
	    }

	    // 4.- load the MP from SIMWARE['mp']
            simhw_internalState_reset('MP', {}) ;
	    for (var key in SIMWARE['mp'])
	    {
	       var kx = parseInt(key)
	       var kv = parseInt(SIMWARE['mp'][key].replace(/ /g,''), 2) ;
               simhw_internalState_set('MP', kx, kv) ;
	    }

            /// bugfix safari bug 10.1.2
            /*
	    for (var e in MP) {
	         if (isNaN(MP[e])) {
	    	     delete MP[e];
                 }
            }
            */
            /// end bugfix 

	    // 5.- load the segments from SIMWARE['seg']
            simhw_internalState_reset('segments', {}) ;
	    for (var key in SIMWARE['seg'])
	    {
	         simhw_internalState_set('segments', key, SIMWARE['seg'][key]) ;
	    }

	    // 6.- show memories...
            show_main_memory   (simhw_internalState('MP'), 0, true, true) ;
            show_control_memory(simhw_internalState('MC'), simhw_internalState('MC_dashboard'), 0, true) ;
	}

