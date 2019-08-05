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

    var ws_cl_ver   = 'WepSIM-cl v1.5.2' ;
    var hash_action = {} ;
 
    //
    // USAGE
    //
 
    hash_action["USAGE"] = function(data, options)
    {
        console.log('') ;
        console.log(ws_cl_ver) ;
        console.log('> WepSIM simulator interface for command line.') ;
        console.log('') ;
        console.log('For more details please use:') ;
        console.log(' ./wepsim_node.sh help-syntax') ;
        console.log(' ./wepsim_node.sh help-examples') ;
        console.log('') ;
 
        return true ;
    } ;
 
    hash_action["HELP-SYNTAX"] = function(data, options)
    {
        console.log('') ;
        console.log(ws_cl_ver) ;
        console.log('> WepSIM simulator interface for command line.') ;
        console.log('') ;
        console.log('Usage:') ;
        console.log(' * ./wepsim_node.sh <command> <hardware name> <microcode file> <assembly file> [<checklist file>] [options*]') ;
        console.log(' * ./wepsim_node.sh <command> checkpoint      <checkpoint file>                [<checklist file>] [options*]') ;
        console.log('') ;
        console.log('    <command>         = run | stepbystep | microstepbymicrostep | check | microstepverbalized | show-console | show-record') ;
        console.log('    <hardware name>   = ep | poc') ;
        console.log('') ;
        console.log('    <checkpoint file> = "path to the checkpoint file" ') ;
        console.log('    <microcode file>  = "path to the microcode file" ') ;
        console.log('    <assembly file>   = "path to the assembly file" ') ;
        console.log('    <checklist file>  = "path to the checklist file" ') ;
        console.log('') ;
        console.log('    [options*]        = verbal-<level> maxi-<#> maxc-<#>') ;
        console.log('       verbal-<level> = verbal-text | verbal-math') ;
        console.log('       maxi-<#>       = maxi-<maximum number of instructions>') ;
        console.log('       maxc-<#>       = maxc-<maximum number of cycles>') ;
        console.log('') ;
 
        return true ;
    } ;
 
    hash_action["HELP-EXAMPLES"] = function(data, options)
    {
        console.log('') ;
        console.log(ws_cl_ver) ;
        console.log('> WepSIM simulator interface for command line.') ;
        console.log('') ;
        console.log('Examples:') ;
        console.log(' * Run some example and show the final state:') ;
        console.log('   ./wepsim_node.sh run                   ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
        console.log('   ./wepsim_node.sh run                   checkpoint ./examples/checkpoint/tutorial_1.txt') ;
        console.log('') ;
        console.log(' * Run some example and show the state on each assembly instruction executed:') ;
        console.log('   ./wepsim_node.sh stepbystep            ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
        console.log('   ./wepsim_node.sh stepbystep            checkpoint ./examples/checkpoint/tutorial_1.txt') ;
        console.log('') ;
        console.log(' * Run some example and show the state on each microinstruction executed:') ;
        console.log('   ./wepsim_node.sh microstepbymicrostep  ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
        console.log('   ./wepsim_node.sh microstepbymicrostep  checkpoint ./examples/checkpoint/tutorial_1.txt') ;
        console.log('') ;
        console.log(' * Check that some example meets the expected final state (so it works):') ;
        console.log('   ./wepsim_node.sh check                 ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e1.txt') ;
        console.log('') ;
        console.log(' * Run some example and show a description for each microinstruction executed:') ;
        console.log('   ./wepsim_node.sh microstepverbalized   ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt verbal-text') ;
        console.log('   ./wepsim_node.sh microstepverbalized   checkpoint ./examples/checkpoint/tutorial_1.txt                                     verbal-math') ;
        console.log('') ;
        console.log(' * Show console output after execution:') ;
        console.log('   ./wepsim_node.sh show-console          ep         ./examples/microcode/mc-ep_os.txt ./examples/assembly/asm-ep_s4_e1.txt') ;
        console.log('') ;
 
        return true ;
    } ;
 
    hash_action["HELP-EXAMPLES2"] = function(data, options)
    {
        console.log('') ;
        console.log(ws_cl_ver) ;
        console.log('> WepSIM simulator interface for command line.') ;
        console.log('') ;
        console.log('Additional examples:') ;
        console.log(' * Run some example and limit the "clock cycles"/"instructions":') ;
        console.log('   ./wepsim_node.sh stepbystep checkpoint ./examples/checkpoint/tutorial_1.txt maxc-10000') ;
        console.log('   ./wepsim_node.sh stepbystep checkpoint ./examples/checkpoint/tutorial_1.txt maxi-2048') ;
        console.log('') ;
        console.log(' * Show recorded session:') ;
        console.log('   ./wepsim_node.sh show-record checkpoint ./examples/checkpoint/tutorial_1.txt') ;
        console.log('') ;
        console.log(' * Export hardware definition as JSON:') ;
        console.log('   ./wepsim_node.sh export-hardware ep > examples/hardware/ep/hw_def.json') ;
        console.log('') ;
        console.log(' * Build MIPS32-like microcode for testing:') ;
        console.log('   ./wepsim_node.sh import-creator checkpoint ./MIPS-32-like.json > microcode.txt') ;
        console.log('   ./wepsim_node.sh run ep ./microcode.txt examples/assembly/asm-ep_s6_e3.txt') ;
        console.log('') ;
        console.log(' * Help on signal:') ;
        console.log('   ./wepsim_node.sh help ep cop') ;
        console.log('') ;
 
        return true ;
    } ;
 
    //
    // CHECK
    //
 
    hash_action["CHECK"] = function(data, options)
    {
        var ret = null ;
 
        // check...
        wepsim_nodejs_init(data.mode) ;
        ret = wepsim_nodejs_check(data, options) ;
 
        console.log(ret.msg);
        return ret.ok ;
    } ;
 
    //
    // RUN
    //
 
    hash_action["RUN"] = function(data, options)
    {
        var ret = null ;
 
        // set verbosity handlers
        options.before_instruction = simcore_do_nothing_handler ;
        options.after_instruction  = simcore_do_nothing_handler ;
 
        // run...
        wepsim_nodejs_init(data.mode) ;
        ret = wepsim_nodejs_run(data, options) ;
 
        console.log(ret.msg);
        return ret.ok ;
    } ;
 
    //
    // STEPBYSTEP
    //
 
    hash_action["STEPBYSTEP"] = function(data, options)
    {
        var ret = null ;
 
        // set verbosity handlers
        options.before_instruction = wepsim_nodejs_before_instruction2 ;
        options.after_instruction  = wepsim_nodejs_after_instruction2 ;
 
        // run...
        wepsim_nodejs_init(data.mode) ;
        ret = wepsim_nodejs_run(data, options) ;
 
        console.log(ret.msg);
        return ret.ok ;
    } ;
 
    //
    // MICROSTEPBYMICROSTEP
    //
 
    hash_action["MICROSTEPBYMICROSTEP"] = function(data, options)
    {
        var ret = null ;
 
        // set verbosity handlers
        options.before_microinstruction = wepsim_nodejs_before_microinstruction3 ;
        options.after_microinstruction  = wepsim_nodejs_after_microinstruction3 ;
 
        // run...
        wepsim_nodejs_init(data.mode) ;
        ret = wepsim_nodejs_run(data, options) ;
 
        console.log(ret.msg);
        return ret.ok ;
    } ;
 
    //
    // MICROSTEPVERBALIZED
    //
 
    hash_action["MICROSTEPVERBALIZED"] = function(data, options)
    {
        var ret = null ;
 
        // set verbosity handlers
        options.before_microinstruction = wepsim_nodejs_before_microinstruction4 ;
        options.after_microinstruction  = simcore_do_nothing_handler ;
 
        // run...
        wepsim_nodejs_init(data.mode) ;
        ret = wepsim_nodejs_run(data, options) ;
 
        console.log(ret.msg);
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
        var ret = null ;
 
        wepsim_nodejs_init(data.mode) ;
        ret = wepsim_nodejs_run(data, options) ;
 
        console.log(ret.msg);
        return ret.ok ;
    } ;
 
    //
    // SHOW-CONSOLE
    //
 
    hash_action["SHOW-CONSOLE"] = function(data, options)
    {
        var ret = null ;
 
        wepsim_nodejs_init(data.mode) ;
        ret = wepsim_nodejs_run(data, options) ;
 
        console.log(ret.msg);
        return ret.ok ;
    } ;
 
    //
    // HELP (signal)
    //
 
    hash_action["HELP"] = function(data, options)
    {
        var ret = null ;
 
        wepsim_nodejs_init(data.mode) ;
        ret = wepsim_nodejs_help_signal(data, options) ;
 
        console.log(ret.msg);
        return ret.ok ;
    } ;
 
    //
    // IMPORT-CREATOR
    //
 
    hash_action["IMPORT-CREATOR"] = function(data, options)
    {
        var ret = null ;
 
        ret = simlang_firm_is2native(data.obj_chk) ;
 
        console.log(ret);
        return true ;
    } ;


    /**
     * WepSIM actions
     */

    function wepsim_nodejs_doActionError ( err_action )
    {
        console.log('') ;
        console.log(ws_cl_ver) ;
        console.log('> WepSIM simulator interface for command line.') ;
        console.log('') ;
        console.log('For more details please use:') ;
        console.log(' ./wepsim_node.sh help-syntax') ;
        console.log(' ./wepsim_node.sh help-examples') ;
        console.log('') ;
        console.log(' Action ERROR: ' + err_action + '? on what?') ;
        console.log('') ;
 
        return false ;
        // throw 'ERROR...' ;
    }

    function wepsim_nodejs_doAction ( data, options )
    {
        var action_f = hash_action[data.action] ;
        if (typeof action_f !== "undefined") {
            return action_f(data, options) ;
        }

        return wepsim_nodejs_doActionError(data.action) ;
    }


    /**
     * Export API
     */

    module.exports.wepsim_nodejs_doActionError = wepsim_nodejs_doActionError ;
    module.exports.wepsim_nodejs_doAction      = wepsim_nodejs_doAction ;

