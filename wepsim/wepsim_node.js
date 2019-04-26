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

    function wepsim_nodejs_init ( simhw_name )
    {
        var ret = simcore_init(false) ;
	if (false == ret.ok) 
	{
	    return wepsim_nodejs_retfill(false, "ERROR: initialize: " + ret.msg + ".\n") ;
	}

        ret = simcore_init_hw(simhw_name) ;
	if (false == ret.ok) 
	{
	    return wepsim_nodejs_retfill(false, "ERROR: initialize: " + ret.msg + ".\n") ;
	}

	return wepsim_nodejs_retfill(true, "") ;
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

    function wepsim_nodejs_show_currentstate ( )
    {
        var state_obj = simcore_simstate_current2state() ;
        var   ret_msg = simcore_simstate_state2checklist(state_obj) ;

	return wepsim_nodejs_retfill(true, ret_msg) ;
    }

    function wepsim_nodejs_show_record ( records )
    {
	var ret_msg = '' ;
	for (var i=0; i<records.lenght; i++)
	{
	     ret_msg += records[i].description ;
	}

	return wepsim_nodejs_retfill(true, ret_msg) ;
    }


    /**
     * WepSIM nodejs API
     */

    function wepsim_nodejs_check ( data, options )
    {
	// 1) initialize ws
        simcore_reset() ;

	// 2) load firmware
        var ret = simcore_compile_firmware(data.firmware) ;
	if (false == ret.ok) 
	{
	    return wepsim_nodejs_retfill(false, "ERROR: Firmware: " + ret.msg + ".\n") ;
	}

	// 3) load assembly
        ret = simcore_compile_assembly(data.assembly) ;
	if (false == ret.ok) 
        {
	    return wepsim_nodejs_retfill(false, "ERROR: Assembly: " + ret.msg + ".\n") ;
	}

	// 4) execute firmware-assembly
	options.verbosity = 0 ;
	ret = simcore_execute_program(options) ;
	if (false == ret.ok) 
	{
	    return wepsim_nodejs_retfill(false, "ERROR: Execution: " + ret.msg + ".\n") ;
	}

	// 5) compare with expected results
        ret = wepsim_nodejs_show_checkresults(data.result_ok, false) ;
	if (false == ret.ok)
	{
	    return wepsim_nodejs_retfill(false, "ERROR: Execution: different results: " + ret.msg + "\n") ;
        }

	return wepsim_nodejs_retfill(true, "") ;
    }

    function wepsim_nodejs_run ( data, options )
    {
	// 1) initialize ws
        simcore_reset() ;

	// 2) load firmware
        var ret = simcore_compile_firmware(data.firmware) ;
	if (false == ret.ok) 
	{
	    return wepsim_nodejs_retfill(false, "ERROR: Firmware: " + ret.msg + ".\n") ;
	}

	// 3) load assembly
        ret = simcore_compile_assembly(data.assembly) ;
	if (false == ret.ok) 
        {
	    return wepsim_nodejs_retfill(false, "ERROR: Assembly: " + ret.msg + ".\n") ;
	}

	// 4) execute firmware-assembly
	ret = simcore_execute_program(options) ;
	if (false == ret.ok) 
	{
	    return wepsim_nodejs_retfill(false, "ERROR: Execution: " + ret.msg + ".\n") ;
	}

	// 5) show a final report
        var ret_msg = "" ;
	switch (options.verbosity)
	{
           case 0:
                ret_msg = "OK: Firmware + Assembly + Execution." ;
                break ;
           case 1:
                ret = wepsim_nodejs_show_currentstate() ;
                ret_msg = ret.msg ;
                break ;
           case 2:
           case 3:
           case 4:
                ret_msg = ret.msg ;
                break ;
           case 5:
                ret_msg = ret.msg + 
		          wepsim_nodejs_show_record(data.record) ;
                break ;
           default:
                ret_msg = "Unknow verbosity value: " +  options.verbosity ;
        }

	return wepsim_nodejs_retfill(true, ret_msg) ;
    }


    /**
     * Export API
     */

    module.exports.wepsim_nodejs_init                    = wepsim_nodejs_init ;
    module.exports.wepsim_nodejs_check                   = wepsim_nodejs_check ;
    module.exports.wepsim_nodejs_run                     = wepsim_nodejs_run ;

    module.exports.wepsim_nodejs_exportHW                = simcore_hardware_export ;

