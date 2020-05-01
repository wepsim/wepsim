/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    /**
     * WepSIM nodejs aux.
     */

    function wepsim_nodejs_retfill ( ok, msg )
    {
        var ret = { ok: true, html: "", msg: "" } ;

        ret.ok   = ok ;
        ret.html = msg ;
        ret.msg  = msg.replace(/<[^>]*>/g, '') ;

        return ret ;
    }

    var hash_detail_ui = {

	    "SCREEN":         {
		                                  init: simcore_do_nothing_handler,
		                    get_screen_content: function() {
					                   return simcore_native_get_value("SCREEN", "content") ;
				                        },
                                    set_screen_content: function ( screen_content ) {
                                                           simcore_native_set_value("SCREEN", "content", screen_content) ;
							   return screen_content ;
					                }
	                      },

	    "KEYBOARD":       {
		                                  init: simcore_do_nothing_handler,
		                  get_keyboard_content: function () {
							   var readlineSync = require('readline-sync');
							   var keys = readlineSync.question('keyboard> ');
							   keystrokes = keys.toString() ;

                                                           simcore_native_set_value("KBD", "keystrokes", keystrokes) ;
							   return keystrokes ;
						        },
                                  set_keyboard_content: function( keystrokes ) {
                                                           simcore_native_set_value("KBD", "keystrokes", keystrokes) ;
					                   return keystrokes ;
				                        }
	                      }
	} ;

    function wepsim_nodejs_load_jsonfile ( url_json )
    {
       var jstr   = "" ;
       var jobj   = [] ;

       try {
           jstr = fs.readFileSync(url_json, 'utf8') ;
           jobj = JSON.parse(jstr) ;
       }
       catch (e) {
           console.log("Unable to load '" + url_json + "': " + e + ".\n") ;
           jobj = [] ;
       }

       return jobj ;
    }

    function wepsim_nodejs_load_examples ( )
    {
       var jindex = [] ;
       var jobj   = [] ;

       // try to load the index
       var url_example_list = get_cfg('example_url') ;
       jindex = wepsim_nodejs_load_jsonfile(url_example_list) ;

       // try to load each one
       for (var i=0; i<jindex.length; i++)
       {
            jobj = wepsim_nodejs_load_jsonfile(jindex[i].url) ;
            ws_examples = ws_examples.concat(jobj) ;
       }

       return ws_examples ;
    }

    function wepsim_nodejs_init ( simhw_name )
    {
        var ret = simcore_init(false) ;
	if (false === ret.ok)
	{
	    return wepsim_nodejs_retfill(false, "ERROR: initialize: " + ret.msg + ".\n") ;
	}

        ret = simcore_init_hw(simhw_name) ;
	if (false === ret.ok)
	{
	    return wepsim_nodejs_retfill(false, "ERROR: initialize: " + ret.msg + ".\n") ;
	}

        // wepsim_nodejs_load_examples() ;
        simcore_init_ui(hash_detail_ui) ;

	return wepsim_nodejs_retfill(true, "") ;
    }

    function wepsim_nodejs_show_currentstate ( )
    {
        var state_obj = simcore_simstate_current2state() ;
        var   ret_msg = simcore_simstate_state2checklist(state_obj) ;

	return wepsim_nodejs_retfill(true, ret_msg) ;
    }

    function wepsim_nodejs_show_record ( records )
    {
	var ret_msg = '' ;
	for (var i=0; i<records.length; i++)
	{
	     ret_msg += '[' + i + '] ' + records[i].description + '\n' ;
	}

	return ret_msg ;
    }

    function wepsim_nodejs_show_checkresults ( checklist_ok, newones_too )
    {
	var data3_bin   = simcore_simstate_checklist2state(checklist_ok) ;
	var obj_current = simcore_simstate_current2state();
	var obj_result  = simcore_simstate_check_results(data3_bin, obj_current, newones_too ) ;

	var ret_ok  = (0 == obj_result.errors) ;
        var ret_msg = simcore_simstate_checkreport2txt(obj_result.result) ;
	return wepsim_nodejs_retfill(ret_ok, ret_msg) ;
    }


    /**
     * WepSIM nodejs API
     */

    // execution
    function wepsim_nodejs_check ( data, options )
    {
	// 1) initialize ws
        simcore_reset() ;

	// 2) load firmware
        var ret = simcore_compile_firmware(data.firmware) ;
	if (false === ret.ok)
	{
	    return wepsim_nodejs_retfill(false, "ERROR: Firmware: " + ret.msg + ".\n") ;
	}

	// 3) load assembly
        ret = simcore_compile_assembly(data.assembly) ;
	if (false === ret.ok)
        {
	    return wepsim_nodejs_retfill(false, "ERROR: Assembly: " + ret.msg + ".\n") ;
	}

	// 4) execute firmware-assembly
        options.verbosity_before = simcore_do_nothing_handler ;
        options.verbosity_after  = simcore_do_nothing_handler ;

	ret = simcore_execute_program(options) ;
	if (false === ret.ok)
	{
	    return wepsim_nodejs_retfill(false, "ERROR: Execution: " + ret.msg + ".\n") ;
	}

	// 5) compare with expected results
        ret = wepsim_nodejs_show_checkresults(data.result_ok, false) ;
	if (false === ret.ok)
	{
	    return wepsim_nodejs_retfill(false, "ERROR: Execution: different results: " + ret.msg + "\n") ;
        }

        ret.msg = "OK: Execution: no error reported\n" ;
	return wepsim_nodejs_retfill(true, ret.msg) ;
    }

    function wepsim_nodejs_runCode ( data, options )
    {
	// 1) initialize ws
        simcore_reset() ;

	// 2) load firmware
        var ret = simcore_compile_firmware(data.firmware) ;
	if (false === ret.ok)
	{
	    return wepsim_nodejs_retfill(false, "ERROR: Firmware: " + ret.msg + ".\n") ;
	}

	// 3) load assembly
        ret = simcore_compile_assembly(data.assembly) ;
	if (false === ret.ok)
        {
	    return wepsim_nodejs_retfill(false, "ERROR: Assembly: " + ret.msg + ".\n") ;
	}

	// 4) execute firmware-assembly
	ret = simcore_execute_program(options) ;
	if (false === ret.ok)
	{
	    return wepsim_nodejs_retfill(false, "ERROR: Execution: " + ret.msg + ".\n") ;
	}

	return wepsim_nodejs_retfill(true, ret.msg) ;
    }

    function wepsim_nodejs_runApp ( data, options )
    {
	// 1) initialization
        wepsim_nodejs_init(data.mode) ;

	// 2) run code
        var ret = wepsim_nodejs_runCode(data, options) ;
	if (false === ret.ok) 
        {
            console.log(ret.msg);
	    return ret ;
	}

	// 3) return result
        return ret ;
    }


    // show execution progress
    var before_state = null ;
    var  after_state = null ;

    function wepsim_nodejs_header2 ( )
    {
        console.log('pc'          + ','.padEnd(3, '\t') + 
                    'instruction' + ','.padEnd(4, '\t') + 
                    'changes_from_zero_or_current_value') ;
    }

    function wepsim_nodejs_before_instruction2 ( SIMWARE, reg_pc )
    {
        if (before_state === null)
             before_state = simcore_simstate_current2state() ;
	else before_state = after_state ;
    }

    function wepsim_nodejs_after_instruction2  ( SIMWARE, reg_pc, ret )
    {
        var curr_pc     = '0x' + reg_pc.toString(16) ;
        var source_line = SIMWARE.assembly[curr_pc].source_original ;

            after_state = simcore_simstate_current2state() ;
        var diff_states = simcore_simstate_diff_states(before_state, after_state) ;

	// padding
	var padding1 = 2 ;
	var padding2 = 5 - (source_line.length / 7) ;
	source_line  = source_line.replace(/,/g,"") ;

        console.log('pc = ' + curr_pc + ','.padEnd(padding1, '\t') + 
		          source_line + ','.padEnd(padding2, '\t') + 
		    diff_states) ;
    }

    function wepsim_nodejs_header3 ( )
    {
        console.log('micropc'     + ','.padEnd(3, '\t') + 
                    'microcode'   + ','.padEnd(5, '\t') + 
                    'changes_from_zero_or_current_value') ;
    }

    function wepsim_nodejs_before_microinstruction3 ( curr_MC, cur_addr )
    {
        if (before_state === null)
             before_state = simcore_simstate_current2state() ;
	else before_state = after_state ;
    }

    function wepsim_nodejs_after_microinstruction3  ( curr_MC, cur_addr )
    {
	    after_state = simcore_simstate_current2state() ;
	var curr_mpc    = '0x' + cur_addr.toString(16) ;
        var source_line = controlmemory_lineToString(curr_MC, cur_addr).trim() ;

	// padding
	var padding1 = 4 - (curr_mpc.length    / 4) ;
	var padding2 = 7 - (source_line.length / 8) ;
	source_line  = source_line.replace(/,/g,"") ;

	console.log('micropc = ' + curr_mpc + ','.padEnd(padding1, '\t') +
		                source_line + ','.padEnd(padding2, '\t') +
		     simcore_simstate_diff_states(before_state, after_state)) ;
    }

    function wepsim_nodejs_before_microinstruction4 ( curr_MC, cur_addr )
    {
	var curr_mpc = '0x' + cur_addr.toString(16) ;

	console.log('Micropc at ' + curr_mpc + '.\t' + get_verbal_from_current_mpc()) ;
    }

    // help
    function wepsim_nodejs_help_signal ( data, options )
    {
	var key    = data.firmware.toUpperCase() ;
	var signal = simhw_sim_signal(key) ;
	if (typeof signal === "undefined")
        {
	    return wepsim_nodejs_retfill(false, "ERROR: Unknown signal " + key + ".\n") ;
	}

	var input_help = '' ;
	var nvalues    = Math.pow(2, simhw_sim_signal(key).nbits) ;
	if (simhw_sim_signal(key).behavior.length == nvalues)
	{
	    input_help += 'Signal ' + key + ' has ' + nvalues + ' possible value:\n' ;

	    for (var k = 0; k < simhw_sim_signal(key).behavior.length; k++)
	    {
		 str_bolded = '' ;
		 if (k == simhw_sim_signal(key).default_value) {
		     str_bolded = '(default value) ' ;
		 }

		 behav_str = compute_signal_verbals(key, k) ;
		 if ('' == behav_str.trim()) {
		     behav_str = '<without main effect>' ;
		 }

		 n = k.toString(10) ;
		 input_help += ' * ' + n + ' ' + str_bolded + 'for ' + behav_str + '\n' ;
	    }
	}
	else
	{
	    input_help += 'Signal ' + key + ' has a value from 0 up to ' + (nvalues - 1) ;
	}

	return wepsim_nodejs_retfill(true, input_help) ;
    }

