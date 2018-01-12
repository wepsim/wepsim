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
     * Play/stop
     */

    function wepsim_execute_reset ( reset_cpu, reset_memory )
    {
        wepsim_state_history_reset();

        if (true == reset_memory) 
        {
            var SIMWARE = get_simware() ;
	    if (SIMWARE.firmware.length != 0)
                update_memories(SIMWARE) ;
        }

        if (true == reset_cpu) 
        {
	    sim_core_reset() ;
        }
    }

    function wepsim_execute_instruction ( )
    {
	var ret = sim_core_check_if_can_execute() ;
	if (false == ret.ok) 
	{
	    alert(ret.msg) ;
	    return false ;
        }

        var clklimit = get_cfg('DBG_limitick') ;

	ret = sim_core_execute_microprogram(clklimit) ;
	if (false == ret.ok) 
	{
            wepsim_show_stopbyevent("Info", ret.msg) ;
    	    return false ;
        }

        return true ;
    }

    function wepsim_execute_microinstruction ( )
    {
	var ret = sim_core_check_if_can_execute() ;
	if (false == ret.ok) 
	{
	    alert(ret.msg) ;
	    return false ;
        }

	ret = sim_core_execute_microinstruction() ;
	if (false == ret.ok) {
            wepsim_show_stopbyevent("Info", ret.msg) ;
	    return false ;
        }

        return true ;
    }

    function wepsim_execute_set_breakpoint ( addr )
    {
        return asmdbg_set_breakpoint(addr) ;
    }

    var DBG_stop  = true ;
    var DBG_limit_instruction = 0 ;

    function wepsim_execute_stop ( btn1 )
    {
	$(btn1).html("<br>Run") ;
	$(btn1).removeClass("ui-icon-minus") ;
	$(btn1).addClass("ui-icon-carat-r") ;
	$(btn1).css("backgroundColor", "#CCCCCC") ;

	DBG_stop = true;
        DBG_limit_instruction = 0 ;
    }

    function wepsim_execute_play ( btn1, run_notifications )
    {
	var ret = sim_core_check_if_can_execute() ;
	if (false == ret.ok) 
	{
	    alert(ret.msg) ;
	    return false ;
        }

	$(btn1).css("backgroundColor", 'rgb(51, 136, 204)') ;
	$(btn1).html("<br>Stop") ;
	$(btn1).removeClass("ui-icon-carat-r") ;
	$(btn1).addClass("ui-icon-minus") ;

        DBG_stop = false ;
        DBG_limit_instruction = 0 ;

        if (false == run_notifications)
             wepsim_execute_chainplay(btn1) ;
        else wepsim_execute_chainnotify(btn1) ;
    }

    function wepsim_execute_toggle_play ( btn1, run_notifications )
    {
        if (DBG_stop == false) 
        {
            DBG_stop = true ; // will help to execute_play stop playing
        } 
        else 
        {
            wepsim_execute_play(btn1, run_notifications) ;
        }
    }


    /*
     * Breakpoints
     */

    function wepsim_check_stopbybreakpoint_firm ( )
    {
        var reg_maddr = get_value(sim_states.REG_MICROADDR) ;
        var curr_addr = "0x" + reg_maddr.toString(16) ;

        if (typeof MC_dashboard[reg_maddr] == "undefined") {
            return false ;
        }

        return (MC_dashboard[reg_maddr].breakpoint) ;
    }

    function wepsim_check_stopbybreakpoint_asm ( )
    {
	var reg_pc    = get_value(sim_states.REG_PC) ;
	var curr_addr = "0x" + reg_pc.toString(16) ;

	if (typeof FIRMWARE.assembly[curr_addr] == "undefined") {
            return false ;
        }

	return (FIRMWARE.assembly[curr_addr].breakpoint) ;
    }

    function wepsim_show_stopbyevent ( msg1, msg2 )
    {
        var reg_maddr  = get_value(sim_states.REG_MICROADDR) ;
	var curr_maddr = "0x" + reg_maddr.toString(16) ;
	var reg_pc     = get_value(sim_states.REG_PC) ;
	var curr_addr  = "0x" + reg_pc.toString(16) ;

	var dialog_title = msg1 + " @ pc=" + curr_addr + "+mpc=" + curr_maddr + ":<br>" + msg2 ;

        $("#dlg_title2").html(dialog_title) ;
        $('#current_state2').modal('show');

	return true ;
    }

    function wepsim_check_state_firm ( )
    {
        var reg_maddr = get_value(sim_states.REG_MICROADDR) ;
        if (false == MC_dashboard[reg_maddr].state)
            return false ;

        wepsim_state_history_add() ;
	return true ;
    }

    function wepsim_execute_chunk ( btn1, chunk )
    {
	var ret = false ;
        var i = 0 ;

	var playlevel = get_cfg('DBG_level') ;
	if (playlevel == "instruction")  
	{
            var clklimit  = get_cfg('DBG_limitick') ;
            for (i=0; i<chunk; i++)
            {
		    ret = sim_core_execute_microprogram(clklimit) ;
		    if (ret.ok === false) {
                        wepsim_show_stopbyevent("Info", ret.msg) ;
			wepsim_execute_stop(btn1) ;
			return false ;
		    }

		    ret = wepsim_check_stopbybreakpoint_asm() ;
		    if (true == ret) {
                        wepsim_show_stopbyevent("Breakpoint", "Instruction is going to be fetched.") ;
			wepsim_execute_stop(btn1) ;
			return false ;
		    }
            }
	}
	else
	{
	    var reg_maddr = 0 ;
            for (i=0; i<chunk; i++)
            {
		    wepsim_check_state_firm() ;

		    ret = sim_core_execute_microinstruction() ;
		    if (false == ret.ok) {
		        wepsim_show_stopbyevent("Info", ret.msg) ;
			wepsim_execute_stop(btn1) ;
			return false ;
		    }

                    ret = wepsim_check_stopbybreakpoint_firm() ;
		    if (true == ret)
		    {
		        wepsim_show_stopbyevent("Breakpoint", "Microinstruction is going to be issue.") ;
			wepsim_execute_stop(btn1) ;
			return false ;
		    }

		    reg_maddr = get_value(sim_states.REG_MICROADDR) ;
                    if (0 == reg_maddr) 
                    {
		        ret = wepsim_check_stopbybreakpoint_asm() ;
		        if (true == ret) {
                            wepsim_show_stopbyevent("Breakpoint", "Instruction is going to be fetched.") ;
		    	    wepsim_execute_stop(btn1) ;
			    return false ;
		        }
		    }
            }
	}

        return true ;
    }

    // instructions per chunck to be chained...
    var max_turbo = 5 ;

    function wepsim_reset_max_turbo ( )
    {
        max_turbo = 5 ;
    }

    function wepsim_execute_chainplay ( btn1 )
    {
	var t0 = 1.0 ;
	var t1 = 1.0 ;

	if (DBG_stop) {
	    wepsim_execute_stop(btn1) ;
	    return ;
	}

        var turbo = 1;
	if (get_cfg('DBG_delay') < 5)
            turbo = max_turbo ;
        if (max_turbo == 5) 
            t0 = performance.now() ;

        var ret = wepsim_execute_chunk(btn1, turbo) ;
        if (false == ret)
            return ;

        if (max_turbo == 5) 
            t1 = performance.now() ;
        if (max_turbo == 5) 
            max_turbo = 3000/(t1-t0) ;

	DBG_limit_instruction += turbo ;
        if (DBG_limit_instruction > get_cfg('DBG_limitins')) 
	{
            wepsim_show_stopbyevent("Limit", "Number of executed instructions limit reached.");
	    wepsim_execute_stop(btn1) ;
            return ;
	}

	setTimeout(wepsim_execute_chainplay, get_cfg('DBG_delay'), btn1) ;
    }

    function wepsim_execute_chainnotify ( btn1 )
    {
	if (DBG_stop) {
	    wepsim_execute_stop(btn1) ;
	    return ;
	}

	var ret = false ;
        for (var i=0; i<max_turbo; i++)
        {
		ret = sim_core_execute_microinstruction() ;
		if (false == ret.ok) {
		    wepsim_show_stopbyevent("Info", ret.msg) ;
		    wepsim_execute_stop(btn1) ;
		    return ;
		}

		var reg_maddr = get_value(sim_states.REG_MICROADDR) ;
		var notifications = MC_dashboard[reg_maddr].notify.length ;
		if (notifications > 1) 
                {
		    var dialog_title = "Notify @ " + reg_maddr + ": " + MC_dashboard[reg_maddr].notify[1] ;

		    var dialog_msg = "" ;
		    for (var k=1; k<notifications; k++) {
			 dialog_msg += MC_dashboard[reg_maddr].notify[k] + "\n<br>" ;
		    }

		    bootbox.confirm({
			title:    dialog_title,
			message:  dialog_msg,
			buttons:  {
				     cancel:  { label: 'Stop',     className: 'btn-danger' },
				     confirm: { label: 'Continue', className: 'btn-primary' }
				  },
			callback: function (result) {
				     if (result)
				          setTimeout(wepsim_execute_chainnotify, get_cfg('DBG_delay'), btn1) ;
				     else wepsim_execute_stop(btn1) ;
				  }
		    });

		    return ;
		}
        }

        setTimeout(wepsim_execute_chainnotify, get_cfg('DBG_delay'), btn1) ;
    }

