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

    var hash_action = {} ;
 

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
                    'WepSIM-cl\n' +
                    '> WepSIM simulator interface for command line.\n' +
                    '\n' +
                    'For help details please use:\n' +
                    ' ./wepsim.sh -h\n' +
                    '\n' +
                    ' Please check the command-line syntax used.\n' +
                    ' Action ERROR: ' + err_action + '?\n' +
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

