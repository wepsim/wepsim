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
     * WepSIM actions
     */

    var ws_cl_ver   = 'WepSIM-cl v1.5.8' ;
    var hash_action = {} ;
 
    //
    // USAGE
    //
 
    hash_action.USAGE = function(data, options)
    {
        console.log('\n' +
                    ws_cl_ver + '\n' +
                    '> WepSIM simulator interface for command line.\n' +
                    '\n' +
                    'For help details please use:\n' +
                    ' ./wepsim.sh -h\n' +
                    ' ./wepsim.sh -a help-examples\n' +
                    '') ;
 
        return true ;
    } ;
 
    hash_action["HELP-EXAMPLES"] = function(data, options)
    {
        var o = '\n' +
                ws_cl_ver + '\n' +
                '> WepSIM simulator interface for command line.\n' +
                '\n' +
                'Examples:\n' +
                ' * Run some example and show the final state:\n' +
                '   ./wepsim.sh -a run -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
                '   ./wepsim.sh -a run --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
                '\n' +
                ' * Run some example and show the state on each assembly instruction executed:\n' +
                '   ./wepsim.sh -a stepbystep -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
                '   ./wepsim.sh -a stepbystep --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
                '\n' +
                ' * Run some example and show the state on each microinstruction executed:\n' +
                '   ./wepsim.sh -a microstepbymicrostep -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
                '   ./wepsim.sh -a microstepbymicrostep --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
                '\n' +
                ' * Check that some example meets the expected final state (so it works):\n' +
                '   ./wepsim.sh -a check -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt -ok ./examples/checklist/cl-ep_s1_e1.txt\n' +
                '\n' +
                ' * Run some example and show a description for each microinstruction executed:\n' +
                '   ./wepsim.sh -a microstepverbalized -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt --verbal text\n' +
                '   ./wepsim.sh -a microstepverbalized --checkpoint ./examples/checkpoint/tutorial_1.txt                                     --verbal math\n' +
                '\n' +
                ' * Show console output after execution:\n' +
                '   ./wepsim.sh -a show-console -m ep -f ./examples/microcode/mc-ep_os.txt -s ./examples/assembly/asm-ep_s4_e1.txt\n' +
                '' ;
 
        console.log(o) ;
        return true ;
    } ;
 
    hash_action["HELP-EXAMPLES2"] = function(data, options)
    {
        var o = '\n' +
                ws_cl_ver + '\n' +
                '> WepSIM simulator interface for command line.\n' +
                '\n' +
                'Additional examples:\n' +
                ' * Help on signal:\n' +
                '   ./wepsim.sh -a help ep cop\n' +
                '\n' +
                ' * Run some example and limit the "clock cycles"/"instructions":\n' +
                '   ./wepsim.sh -a stepbystep --checkpoint ./examples/checkpoint/tutorial_1.txt --maxc 10000\n' +
                '   ./wepsim.sh -a stepbystep --checkpoint ./examples/checkpoint/tutorial_1.txt --maxi 2048\n' +
                '\n' +
                ' * Show recorded session:\n' +
                '   ./wepsim.sh -a show-record --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
                '\n' +
                ' * Build checkpoint from assembly and microcode, and print it to standard output:\n' +
                '   ./wepsim.sh -a build-checkpoint -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
                '\n' +
                ' * Export hardware definition as JSON:\n' +
                '   ./wepsim.sh -a export-hardware -m ep > examples/hardware/ep/hw_def.json\n' +
                '\n' +
                ' * Build MIPS32-like microcode for testing in command-line:\n' +
                '   ./wepsim.sh -a import-creator --checkpoint ./MIPS-32-like.json > microcode.txt\n' +
                '   ./wepsim.sh -a run -m ep -f ./microcode.txt -s examples/assembly/asm-ep_s6_e3.txt\n' +
                '' ;
 
        console.log(o) ;
        return true ;
    } ;
 
    //
    // CHECK
    //
 
    hash_action.CHECK = function(data, options)
    {
        // run...
        var ret = wepsim_nodejs_runApp(data, options) ;
	if (ret.ok === false) {
            console.log(ret.msg);
            return false ;
	}

        // show check result
        ret = wepsim_nodejs_check(data, options) ;
        console.log(ret.msg);
        return ret.ok ;
    } ;
 
    //
    // RUN
    //
 
    hash_action.RUN = function(data, options)
    {
        // set verbosity handlers
        options.before_instruction = simcore_do_nothing_handler ;
        options.after_instruction  = simcore_do_nothing_handler ;
 
        // run...
        var ret = wepsim_nodejs_runApp(data, options) ;
	if (ret.ok === false) {
            console.log(ret.msg);
            return false ;
	}

        // show state at the end
        ret = wepsim_nodejs_show_currentstate() ;
        console.log(ret.msg);
        return true ;
    } ;
 
    //
    // STEPBYSTEP
    //
 
    hash_action.STEPBYSTEP = function(data, options)
    {
        // set verbosity handlers
        options.before_instruction = wepsim_nodejs_before_instruction2 ;
        options.after_instruction  = wepsim_nodejs_after_instruction2 ;
        wepsim_nodejs_header2() ;
 
        // run...
        var ret = wepsim_nodejs_runApp(data, options) ;
	if (ret.ok === false) {
            console.log(ret.msg);
	}

        return ret.ok ;
    } ;
 
    //
    // MICROSTEPBYMICROSTEP
    //
 
    hash_action.MICROSTEPBYMICROSTEP = function(data, options)
    {
        // set verbosity handlers
        options.before_microinstruction = wepsim_nodejs_before_microinstruction3 ;
        options.after_microinstruction  = wepsim_nodejs_after_microinstruction3 ;
        wepsim_nodejs_header3() ;
 
        // run...
        var ret = wepsim_nodejs_runApp(data, options) ;
	if (ret.ok === false) {
            console.log(ret.msg);
	}

        return ret.ok ;
    } ;
 
    //
    // MICROSTEPVERBALIZED
    //
 
    hash_action.MICROSTEPVERBALIZED = function(data, options)
    {
        // set verbosity handlers
        options.before_microinstruction = wepsim_nodejs_before_microinstruction4 ;
        options.after_microinstruction  = simcore_do_nothing_handler ;
 
        // run...
        var ret = wepsim_nodejs_runApp(data, options) ;
	if (ret.ok === false) {
            console.log(ret.msg);
	}

        return ret.ok ;
    } ;
 
    //
    // EXPORT-HARDWARE
    //
 
    hash_action["EXPORT-HARDWARE"] = function(data, options)
    {
        var ret = simcore_hardware_export(data.mode) ;
 
        console.log(ret.msg);
        return ret.ok ;
    } ;
 
    //
    // SHOW-RECORD
    //
 
    hash_action["SHOW-RECORD"] = function(data, options)
    {
        var ret = wepsim_nodejs_show_record(data.record) ;

        console.log(ret) ;
        return true ;
    } ;
 
    //
    // SHOW-MICROCODE
    //
 
    hash_action["SHOW-MICROCODE"] = function(data, options)
    {
        console.log(data.firmware) ;
        return true ;
    } ;
 
    //
    // SHOW-ASSEMBLY
    //
 
    hash_action["SHOW-ASSEMBLY"] = function(data, options)
    {
        console.log(data.assembly) ;
        return true ;
    } ;
 
    //
    // SHOW-CONSOLE
    //
 
    hash_action["SHOW-CONSOLE"] = function(data, options)
    {
        // run...
        var ret = wepsim_nodejs_runApp(data, options) ;
	if (ret.ok === false) {
            console.log(ret.msg);
            return false ;
	}

	// show screen at the end
        ret.msg = get_screen_content() ;
        console.log(ret.msg);
        return true ;
    } ;
 
    //
    // HELP (signal)
    //
 
    hash_action.HELP = function(data, options)
    {
        wepsim_nodejs_init(data.mode) ;
        var ret = wepsim_nodejs_help_signal(data, options) ;
 
        console.log(ret.msg);
        return ret.ok ;
    } ;
 
    //
    // IMPORT-CREATOR
    //
 
    hash_action["IMPORT-CREATOR"] = function(data, options)
    {
        var obj_def = JSON.parse(data.str_chk) ;
        var ret = simlang_firm_is2native(obj_def) ;
 
        console.log(ret);
        return true ;
    } ;

    //
    // BUILD-CHECKPOINT
    //
 
    hash_action["BUILD-CHECKPOINT"] = function(data, options)
    {
        // pack elements
        var checkpointObj = {
                              "mode":          data.mode,
                              "firmware":      data.firmware,
                              "assembly":      data.assembly,
                              "state_current": {
                                                  time:        Date().toString(),
                                                  title:       '',
                                                  title_short: '',
				                  content:     ''
				               },
                              "state_history": [],
                              "record":        '',
                              "tag":           Date().toString(),
                              "notify":        true
                           } ;

        var checkpointNB  = wepsim_checkpoint_Obj2NB(checkpointObj) ;
        var checkpointStr = JSON.stringify(checkpointNB, null, 2) ;
        console.log(checkpointStr);

        // return ok
        return true ;
    } ;

    /**
     * WepSIM actions
     */

    function wepsim_nodejs_doActionError ( err_action )
    {
        console.log('\n' +
                    ws_cl_ver + '\n' +
                    '> WepSIM simulator interface for command line.\n' +
                    '\n' +
                    'For help details please use:\n' +
                    ' ./wepsim.sh -h\n' +
                    ' ./wepsim.sh -a help-examples\n' +
                    '\n' +
                    ' Action ERROR: ' + err_action + '? on what?\n' +
                    '') ;
 
        return false ;
    }

    function wepsim_nodejs_doAction ( data, options )
    {
        var action_f = hash_action[data.action] ;
        if (typeof action_f !== "undefined") {
            return action_f(data, options) ;
        }

        return wepsim_nodejs_doActionError(data.action) ;
    }

    function wepsim_nodejs_loadCheckpoint ( data_checkpoint )
    {
	var obj_checkpoint  = JSON.parse(data_checkpoint) ;
            obj_checkpoint  = wepsim_checkpoint_NB2Obj(obj_checkpoint) ;

        return obj_checkpoint ;
    }


    /**
     * Export API
     */

    module.exports.wepsim_nodejs_doActionError  = wepsim_nodejs_doActionError ;
    module.exports.wepsim_nodejs_doAction       = wepsim_nodejs_doAction ;
    module.exports.wepsim_nodejs_loadCheckpoint = wepsim_nodejs_loadCheckpoint ;

