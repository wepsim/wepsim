/*
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
 *
 *  This file is part of WepSIM tester.
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

    function wepsim_nodejs_init ( )
    {
         sim_core_init(false) ;
	 sim_core_init_panel('', '', '', '', '') ;
    }

    function wepsim_nodejs_show_checkresults ( checklist_ok, newones_too )
    {
	var ret = {} ;
	    ret.msg = "" ;
	    ret.ok  = true ;

	var data3_bin   = simstate_checklist2state(checklist_ok) ;
	var obj_current = simstate_current2state();
	var obj_result  = simstate_check_results(data3_bin, obj_current, newones_too ) ;

        ret.msg  = simstate_checkreport2txt(obj_result.result) ;
        ret.html = simstate_checkreport2html(obj_result.result, true) ;
        ret.ok   = (0 == obj_result.errors) ;
        return ret ;
    }

    function wepsim_nodejs_show_currentstate ( )
    {
	var ret = {} ;
	    ret.msg = "" ;
	    ret.ok  = true ;

        var state_obj = simstate_current2state() ;
              ret.msg = simstate_state2checklist(state_obj) ;

        return ret ;
    }


    /**
     * WepSIM nodejs API
     */

    function wepsim_nodejs_check ( str_firmware, str_assembly, str_resultok, 
                                   max_instructions, max_cycles )
    {
        var ret1 = {} ;
            ret1.ok = true ;
            ret1.msg = "" ;

	// 1) initialize ws
        sim_core_reset() ;

	// 2) load firmware
        var ret = sim_core_compile_firmware(str_firmware) ;
	if (false == ret.ok) 
	{
            ret1.msg = "ERROR: Firmware: " + ret.msg + ".\n" ;
            ret1.ok = false ;
	    return ret1 ;
	}

	// 3) load assembly
        ret = sim_core_compile_assembly(str_assembly) ;
	if (false == ret.ok) 
        {
            ret1.msg = "ERROR: Assembly: " + ret.msg + ".\n" ;
            ret1.ok = false ;
	    return ret1 ;
	}

	// 4) execute firmware-assembly
	ret = sim_core_execute_program(0, max_instructions, max_cycles) ;
	if (false == ret.ok) 
	{
            ret1.msg = "ERROR: Execution: " + ret.msg + ".\n" ;
            ret1.ok = false ;
	    return ret1 ;
	}

	// 5) compare with expected results
        ret = wepsim_nodejs_show_checkresults(str_resultok, false) ;
	if (false == ret.ok)
	{
            ret1.msg = "ERROR: Execution: different results: " + ret.msg + "\n" ;
            ret1.ok = false ;
	    return ret1 ;
        }

	return ret1 ;
    }

    function wepsim_nodejs_run ( verbosity, str_firmware, str_assembly, max_instructions, max_cycles )
    {
        var ret1 = {} ;
            ret1.ok = true ;
            ret1.msg = "" ;

	// 1) initialize ws
        sim_core_reset() ;

	// 2) load firmware
        var ret = sim_core_compile_firmware(str_firmware) ;
	if (false == ret.ok) 
	{
            ret1.msg = "ERROR: Firmware: " + ret.msg + ".\n" ;
            ret1.ok = false ;
	    return ret1 ;
	}

	// 3) load assembly
        ret = sim_core_compile_assembly(str_assembly) ;
	if (false == ret.ok) 
        {
            ret1.msg = "ERROR: Assembly: " + ret.msg + ".\n" ;
            ret1.ok = false ;
	    return ret1 ;
	}

	// 4) execute firmware-assembly
	ret = sim_core_execute_program(verbosity, max_instructions, max_cycles) ;
	if (false == ret.ok) 
	{
            ret1.msg = "ERROR: Execution: " + ret.msg + ".\n" ;
            ret1.ok = false ;
	    return ret1 ;
	}

	// 5) show a final report
	switch (verbosity) 
	{
           case 0:
                ret1.msg = "OK: Firmware + Assembly + Execution." ;
                break ;
           case 1:
                ret = wepsim_nodejs_show_currentstate() ;
                ret1.msg = ret.msg ;
                break ;
           case 2:
           case 3:
                ret1.msg = ret.msg ;
                break ;
           default:
                ret1.msg = "Unknow verbosity value: " +  verbosity ;
        }
        ret1.ok = true ;
	return ret1 ;
    }


    /**
     * Export API
     */

    module.exports.wepsim_nodejs_init                    = wepsim_nodejs_init ;
    module.exports.wepsim_nodejs_check                   = wepsim_nodejs_check ;
    module.exports.wepsim_nodejs_run                     = wepsim_nodejs_run ;

