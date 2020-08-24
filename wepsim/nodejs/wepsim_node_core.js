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


    /* jshint esversion: 8 */

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
        var curr_pc = '0x' + reg_pc.toString(16) ;
        if (typeof SIMWARE.assembly[curr_pc] === 'undefined') {
	    return ;
	}
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

    // interactive
    function wepsim_nodejs_asmBreakpoint ( hexaddr )
    {
	var curr_firm = simhw_internalState('FIRMWARE') ;
	var bp_state  = curr_firm.assembly[hexaddr] ;
	if (typeof bp_state === 'undefined') {
            return false ;
	}

	bp_state = bp_state.breakpoint ;
	bp_state = ! bp_state ;
	var ret = wepsim_execute_set_breakpoint(hexaddr, bp_state) ;
	return bp_state ;
    }

    function wepsim_nodejs_microBreakpoint ( hexaddr )
    {
	var bp_state = simhw_internalState_get('MC_dashboard', hexaddr) ;
	if (typeof bp_state === 'undefined') {
            return false ;
	}

	bp_state = bp_state.breakpoint ;
	bp_state = ! bp_state ;
	simhw_internalState_get('MC_dashboard', hexaddr).breakpoint = bp_state ;
	return bp_state ;
    }

    function wepsim_nodejs_run2 ( answers, data, options )
    {
	var options    = {
			     verbosity:         0,
			     cycles_limit:      options.cycles_limit,
			     instruction_limit: options.instruction_limit
	                 } ;

        var curr_firm  = simhw_internalState('FIRMWARE') ;
	var pc_name    = simhw_sim_ctrlStates_get().pc.state ;
	var ref_pc     = simhw_sim_state(pc_name) ;
	var reg_pc     = get_value(ref_pc) ;
	var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	var ref_maddr  = simhw_sim_state(maddr_name) ;
	var reg_maddr  = get_value(ref_maddr) ;

	var ret    = false ;
        var i_clks = 0 ;

	var i = 0 ;
        while (i < options.instruction_limit)
        {
	    ret = simcore_execute_microinstruction2(reg_maddr, reg_pc) ;
	    if (false === ret.ok) {
		console.log("ERROR: " + ret.msg) ;
		return false ;
	    }

	    i_clks++;
	    if ( (options.cycles_limit > 0) && (i_clks >= options.cycles_limit) )
	    {
		console.log('WARNING: clock cycles limit reached in a single instruction.') ;
		return false ;
	    }

	    reg_maddr = get_value(ref_maddr) ;
	    reg_pc    = get_value(ref_pc) ;

	    ret = wepsim_check_mcdashboard(reg_maddr) ;
	    if (false === ret) {
		return false ;
	    }

	    ret = wepsim_check_stopbybreakpoint_firm(reg_maddr) ;
	    if (true === ret)
	    {
		console.log("INFO: Microinstruction is going to be issue.") ;
		return false ;
	    }

	    if (0 === reg_maddr)
	    {
		ret = wepsim_check_stopbybreakpoint_asm(curr_firm, reg_pc) ;
		if (true === ret) {
		    console.log("INFO: Instruction is going to be fetched.") ;
		    return false ;
		}

		i++ ;
		i_clks = 0 ;
	    }
        }

        console.log("INFO: number of instruction executed: " + i + 
                    " (limited to " + options.instruction_limit + ")") ;
        return true ;
    }

    function wepsim_nodejs_runInteractiveCmd ( answers, data, options )
    {
        var SIMWARE = get_simware() ;
        var pc_name = simhw_sim_ctrlStates_get().pc.state ;
        var reg_pc = 0 ;

        var on_exit = false ;
	switch(answers.cmd)
	{
	       case 'help':
		    console.log('help answer begins.') ;

		    // show help
		    console.log('' +
				'Available commands:\n' +
				' * help:         this command.\n' +
				' * exit:         exit from command line.\n' +
				'\n' +
				' * reset:        reset processor.\n' +
				' * run:          run all the instructions.\n' +
				' * next:         execute instruction at assembly level.\n' +
				' * step:         execute instruction at microinstruction level.\n' +
				' * break <addr>: breakpoint at given hexadecimal address.\n' +
				'\n' +
				' * dump:         show the current state.\n' +
				'') ;

		    console.log('help answer ends.') ;
		    break ;

	       case 'quit':
	       case 'exit':
		    console.log('exit answer begins.') ;

		    // exit without asking 'are your sure?'
		    console.log('bYe!') ;

		    console.log('exit answer ends.') ;
                    on_exit = true ;
		    break ;

	       case 'cont':
	       case 'run':
		    console.log('run answer begins.') ;

		    // execute program
		    wepsim_nodejs_verbose_none(options) ;

                    ret = wepsim_nodejs_run2(answers, data, options) ;
		    if (false === ret) {
			console.log("INFO: Execution stopped.") ;
		    }

		    console.log('run answer ends.') ;
		    break ;

	       case 'next':
		    console.log('next answer begins.') ;

		    // execute instruction
		    wepsim_nodejs_verbose_instructionlevel(options) ;
		    reg_pc = parseInt(get_value(simhw_sim_state(pc_name)));
		    wepsim_nodejs_before_instruction2(SIMWARE, reg_pc) ;

		    ret = simcore_execute_microprogram(options) ;
		    if (false === ret.ok) {
			console.log("ERROR: Execution: " + ret.msg + ".\n") ;
		    }

		    reg_pc = parseInt(get_value(simhw_sim_state(pc_name)));
		    wepsim_nodejs_after_instruction2(SIMWARE, reg_pc) ;

		    console.log('next answer ends.') ;
		    break ;

	       case 'step':
		    console.log('step answer begins.') ;

		    // execute microinstruction
		    wepsim_nodejs_verbose_microinstructionlevel(options) ;
		    reg_pc = parseInt(get_value(simhw_sim_state(pc_name)));
		    wepsim_nodejs_before_instruction2(SIMWARE, reg_pc) ;

		    ret = simcore_execute_microprogram(options) ;
		    if (false === ret.ok) {
			console.log("ERROR: Execution: " + ret.msg + ".\n") ;
		    }

	            wepsim_nodejs_header2() ;
		    reg_pc = parseInt(get_value(simhw_sim_state(pc_name)));
		    wepsim_nodejs_after_instruction2(SIMWARE, reg_pc) ;

		    console.log('step answer ends.') ;
		    break ;

	       case 'reset':
		    console.log('reset answer begins.') ;

		    // reset
		    wepsim_nodejs_verbose_none(options) ;
	            before_state = null ;
	            after_state  = null ;

		    ret = simcore_reset() ;
		    if (false === ret.ok) {
			console.log("ERROR: Execution: " + ret.msg + ".\n") ;
		    }

		    console.log('reset answer ends.') ;
		    break ;

	       case 'dump':
		    console.log('dump answer begins.') ;

		    ret = wepsim_nodejs_show_currentstate() ;
		    console.log(ret.msg) ;

		    console.log('dump answer ends.') ;
		    break ;

	       default:
                    var addr    = 0 ;
	            var hexaddr = 0 ;
                    var parts   = answers.cmd.split(' ');

                    if ( (parts[0] == 'break') && (typeof parts[1] !== 'undefined') )
		    {
		        console.log('break answer begins.') ;

                        addr    = parseInt(parts[1]) ;
	                hexaddr = "0x" + addr.toString(16) ;
                        var ret = wepsim_nodejs_asmBreakpoint(hexaddr) ;
		        console.log('break on ' + hexaddr + ' ' + ret) ;

		        console.log('break answer ends.') ;
                    }
                    else if ( (parts[0] == 'mbreak') && (typeof parts[1] !== 'undefined') )
		    {
		        console.log('mbreak answer begins.') ;

                        addr    = parseInt(parts[1]) ;
	                hexaddr = "0x" + addr.toString(16) ;
                        var ret = wepsim_nodejs_microBreakpoint(hexaddr) ;
		        console.log('mbreak on ' + hexaddr + ' ' + ret) ;

		        console.log('mbreak answer ends.') ;
                    }
                    else
                    {
		        console.log('Unknown ' + answers.cmd + ' command.\n') ;
                    }

		    break ;
	}

        // on_exit -> end REPL loop ;
        return on_exit ;
    }


    /**
     * WepSIM nodejs API
     */

    function wepsim_nodejs_init ( data )
    {
        var ret = simcore_init(false) ;
	if (false === ret.ok) {
            return wepsim_nodejs_retfill(false, "ERROR: initialize: " + ret.msg + ".\n") ;
	}

        set_cfg('ws_idiom', data.idiom) ;

        ret = simcore_init_hw(data.mode) ;
	if (false === ret.ok) {
            return wepsim_nodejs_retfill(false, "ERROR: initialize: " + ret.msg + ".\n") ;
	}

        // wepsim_nodejs_load_examples() ;
        simcore_init_ui(hash_detail_ui) ;

	return wepsim_nodejs_retfill(true, "") ;
    }

    function wepsim_nodejs_prepareCode ( data, options )
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

	return wepsim_nodejs_retfill(true, ret.msg) ;
    }

    // execution
    function wepsim_nodejs_runApp ( data, options )
    {
	// 1) initialization
        var ret = wepsim_nodejs_init(data) ;
	if (false === ret.ok) {
	    return wepsim_nodejs_retfill(false, "ERROR: Assembly: " + ret.msg + ".\n") ;
	}

	// 2) prepare firmware-assembly
        ret = wepsim_nodejs_prepareCode(data, options) ;
	if (false === ret.ok) {
	    return wepsim_nodejs_retfill(false, "ERROR: Assembly: " + ret.msg + ".\n") ;
	}

	// 3) run code
	ret = simcore_execute_program(options) ;
	if (false === ret.ok) {
	    return wepsim_nodejs_retfill(false, "ERROR: Execution: " + ret.msg + ".\n") ;
	}

	// 4) return result
        return ret ;
    }

    function wepsim_nodejs_check ( data, options )
    {
	// 1) compare with expected results
        ret = wepsim_nodejs_show_checkresults(data.result_ok, false) ;
	if (false === ret.ok) {
	    return wepsim_nodejs_retfill(false, "ERROR: Execution: different results: " + ret.msg + "\n") ;
        }

        ret.msg = "OK: Execution: no error reported\n" ;
	return wepsim_nodejs_retfill(true, ret.msg) ;
    }

    async function wepsim_nodejs_runAppInteractive ( data, options )
    {
	// 1) initialization
        var ret = wepsim_nodejs_init(data) ;
	if (false === ret.ok) {
	    return wepsim_nodejs_retfill(false, "ERROR: Assembly: " + ret.msg + ".\n") ;
	}

	// 2) prepare firmware-assembly
        ret = wepsim_nodejs_prepareCode(data, options) ;
	if (false === ret.ok) {
	    return wepsim_nodejs_retfill(false, "ERROR: Assembly: " + ret.msg + ".\n") ;
	}

	// 3) run code
        var fuzzy = require('fuzzy') ;
        var inq = require('inquirer');
            inq.registerPrompt('command',      require('inquirer-command-prompt')) ;
            inq.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt')) ;

	var icommands = [ 'help', 'exit', 'run', 'next', 'step', 'reset', 'dump' ] ;
        var last_cmd  = 'help' ;
        var do_exit   = false ;
        do {
	      await inq.prompt([{
                 // > autocomplete

                 // type:        'autocomplete',
		 // suggestOnly: true,
		 // source:      function(answers, input) {
		 //		     input = input || '' ;
		 //		     return new Promise(function(resolve) {
		 //	    		     setTimeout(function() {
		 //	      			var fuzzyResult = fuzzy.filter(input, icommands) ;
		 //	      			resolve(fuzzyResult.map(function(el) { return el.original; })) ;
		 //	    		     }, 100) ;
		 //			    }) ;
		 // 		},

                 // > command
		    type:    'command',
		    name:    'cmd',
		    message: 'ws> ',
		    validate: (val) => {
		       return val ? true : 'If you don\'t know the available commands, type help for help';
		    },
		    autoCompletion: icommands,
		    default:        last_cmd,
		    context:        0,
		    short:          true
		}]).then((answers) => {
                    do_exit = wepsim_nodejs_runInteractiveCmd(answers, data, options) ;
                    last_cmd = answers.cmd ;
		}).catch((err) => {
		    console.error(err.stack) ;
		}) ;
        } while (do_exit == false) ;

	// 4) return result
        return ret ;
    }

    // verbose mode
    function wepsim_nodejs_verbose_none ( options )
    {
	//before_state = null ;
	//after_state  = null ;
	options.before_instruction      = simcore_do_nothing_handler ;
	options.after_instruction       = simcore_do_nothing_handler ;
	options.before_microinstruction = simcore_do_nothing_handler ;
	options.after_microinstruction  = simcore_do_nothing_handler ;
    }

    function wepsim_nodejs_verbose_instructionlevel ( options )
    {
	wepsim_nodejs_header2() ;

	//before_state = null ;
	//after_state  = null ;
	options.before_instruction      = wepsim_nodejs_before_instruction2 ;
	options.after_instruction       = wepsim_nodejs_after_instruction2 ;
	options.before_microinstruction = simcore_do_nothing_handler ;
	options.after_microinstruction  = simcore_do_nothing_handler ;
    }

    function wepsim_nodejs_verbose_microinstructionlevel ( options )
    {
	wepsim_nodejs_header3() ;

	//before_state = null ;
	//after_state  = null ;
	options.before_instruction      = simcore_do_nothing_handler ;
	options.after_instruction       = simcore_do_nothing_handler ;
	options.before_microinstruction = wepsim_nodejs_before_microinstruction3 ;
	options.after_microinstruction  = wepsim_nodejs_after_microinstruction3 ;
    }

    function wepsim_nodejs_verbose_verbalized ( options )
    {
	//before_state = null ;
	//after_state  = null ;
	options.before_instruction      = simcore_do_nothing_handler ;
	options.after_instruction       = simcore_do_nothing_handler ;
        options.before_microinstruction = wepsim_nodejs_before_microinstruction4 ;
        options.after_microinstruction  = simcore_do_nothing_handler ;
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

