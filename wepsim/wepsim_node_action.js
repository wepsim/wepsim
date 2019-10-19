/*
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

    var ws_cl_ver   = 'WepSIM-cl v1.5.5' ;
    var hash_action = {} ;
 
    //
    // USAGE
    //
 
    hash_action["USAGE"] = function(data, options)
    {
        console.log('\n' +
                    ws_cl_ver + '\n' +
                    '> WepSIM simulator interface for command line.\n' +
                    '\n' +
                    'For more details please use:\n' +
                    ' ./wepsim_node.sh help-syntax\n' +
                    ' ./wepsim_node.sh help-examples\n' +
                    '') ;
 
        return true ;
    } ;
 
    hash_action["HELP-SYNTAX"] = function(data, options)
    {
        var o = '\n' +
                ws_cl_ver + '\n' +
                '> WepSIM simulator interface for command line.\n' +
                '\n' +
                'Usage:\n' +
                ' * ./wepsim_node.sh <command> <hardware name> <microcode file> <assembly file> [<checklist file>] [options*]\n' +
                ' * ./wepsim_node.sh <command> checkpoint      <checkpoint file>                [<checklist file>] [options*]\n' +
                '\n' +
                '    <command>         = run | stepbystep | microstepbymicrostep | check | microstepverbalized | show-console | show-record | build-checkpoint\n' +
                '    <hardware name>   = ep | poc\n' +
                '\n' +
                '    <checkpoint file> = "path to the checkpoint file" \n' +
                '    <microcode file>  = "path to the microcode file" \n' +
                '    <assembly file>   = "path to the assembly file" \n' +
                '    <checklist file>  = "path to the checklist file" \n' +
                '\n' +
                '    [options*]        = verbal-<level> maxi-<#> maxc-<#>\n' +
                '       verbal-<level> = verbal-text | verbal-math\n' +
                '       maxi-<#>       = maxi-<maximum number of instructions>\n' +
                '       maxc-<#>       = maxc-<maximum number of cycles>\n' +
                '' ;
 
        console.log(o) ;
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
                '   ./wepsim_node.sh run                   ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt\n' +
                '   ./wepsim_node.sh run                   checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
                '\n' +
                ' * Run some example and show the state on each assembly instruction executed:\n' +
                '   ./wepsim_node.sh stepbystep            ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt\n' +
                '   ./wepsim_node.sh stepbystep            checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
                '\n' +
                ' * Run some example and show the state on each microinstruction executed:\n' +
                '   ./wepsim_node.sh microstepbymicrostep  ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt\n' +
                '   ./wepsim_node.sh microstepbymicrostep  checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
                '\n' +
                ' * Check that some example meets the expected final state (so it works):\n' +
                '   ./wepsim_node.sh check                 ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e1.txt\n' +
                '\n' +
                ' * Run some example and show a description for each microinstruction executed:\n' +
                '   ./wepsim_node.sh microstepverbalized   ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt verbal-text\n' +
                '   ./wepsim_node.sh microstepverbalized   checkpoint ./examples/checkpoint/tutorial_1.txt                                     verbal-math\n' +
                '\n' +
                ' * Show console output after execution:\n' +
                '   ./wepsim_node.sh show-console          ep         ./examples/microcode/mc-ep_os.txt ./examples/assembly/asm-ep_s4_e1.txt\n' +
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
                '   ./wepsim_node.sh help ep cop\n' +
                '\n' +
                ' * Run some example and limit the "clock cycles"/"instructions":\n' +
                '   ./wepsim_node.sh stepbystep checkpoint ./examples/checkpoint/tutorial_1.txt maxc-10000\n' +
                '   ./wepsim_node.sh stepbystep checkpoint ./examples/checkpoint/tutorial_1.txt maxi-2048\n' +
                '\n' +
                ' * Show recorded session:\n' +
                '   ./wepsim_node.sh show-record checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
                '\n' +
                ' * Build checkpoint from assembly and microcode, and print it to standard output:\n' +
                '   ./wepsim_node.sh build-checkpoint ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt\n' +
                '\n' +
                ' * Export hardware definition as JSON:\n' +
                '   ./wepsim_node.sh export-hardware ep > examples/hardware/ep/hw_def.json\n' +
                '\n' +
                ' * Build MIPS32-like microcode for testing in command-line:\n' +
                '   ./wepsim_node.sh import-creator checkpoint ./MIPS-32-like.json > microcode.txt\n' +
                '   ./wepsim_node.sh run ep ./microcode.txt examples/assembly/asm-ep_s6_e3.txt\n' +
                '' ;
 
        console.log(o) ;
        return true ;
    } ;
 
    //
    // CHECK
    //
 
    hash_action["CHECK"] = wepsim_nodejs_runApp ;
 
    //
    // RUN
    //
 
    hash_action["RUN"] = function(data, options)
    {
        // set verbosity handlers
        options.before_instruction = simcore_do_nothing_handler ;
        options.after_instruction  = simcore_do_nothing_handler ;
 
        // run...
        return wepsim_nodejs_runApp(data, options) ;
    } ;
 
    //
    // STEPBYSTEP
    //
 
    hash_action["STEPBYSTEP"] = function(data, options)
    {
        // set verbosity handlers
        options.before_instruction = wepsim_nodejs_before_instruction2 ;
        options.after_instruction  = wepsim_nodejs_after_instruction2 ;
 
        // run...
        return wepsim_nodejs_runApp(data, options) ;
    } ;
 
    //
    // MICROSTEPBYMICROSTEP
    //
 
    hash_action["MICROSTEPBYMICROSTEP"] = function(data, options)
    {
        // set verbosity handlers
        options.before_microinstruction = wepsim_nodejs_before_microinstruction3 ;
        options.after_microinstruction  = wepsim_nodejs_after_microinstruction3 ;
 
        // run...
        return wepsim_nodejs_runApp(data, options) ;
    } ;
 
    //
    // MICROSTEPVERBALIZED
    //
 
    hash_action["MICROSTEPVERBALIZED"] = function(data, options)
    {
        // set verbosity handlers
        options.before_microinstruction = wepsim_nodejs_before_microinstruction4 ;
        options.after_microinstruction  = simcore_do_nothing_handler ;
 
        // run...
        return wepsim_nodejs_runApp(data, options) ;
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
 
    hash_action["SHOW-RECORD"] = wepsim_nodejs_runApp ;
 
    //
    // SHOW-CONSOLE
    //
 
    hash_action["SHOW-CONSOLE"] = wepsim_nodejs_runApp ;
 
    //
    // HELP (signal)
    //
 
    hash_action["HELP"] = function(data, options)
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
                    'For more details please use:\n' +
                    ' ./wepsim_node.sh help-syntax\n' +
                    ' ./wepsim_node.sh help-examples\n' +
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

