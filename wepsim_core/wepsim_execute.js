/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
     * Run/Stop
     */

    function wepsim_execute_reset ( reset_cpu, reset_memory )
    {
        wepsim_state_history_reset();

        if (true === reset_memory)
        {
            var SIMWARE = get_simware() ;
	    if (SIMWARE.firmware.length !== 0) {
                update_memories(SIMWARE) ;
            }
        }

        if (true === reset_cpu)
        {
	    simcore_reset() ;
        }
    }

    function wepsim_execute_instruction ( )
    {
	var ret = simcore_check_if_can_execute() ;
	if (false === ret.ok)
	{
	    wsweb_dlg_alert(ret.msg) ;
	    return false ;
        }

	var options = {
			 verbosity:    0,
			 cycles_limit: get_cfg('DBG_limitick')
	              } ;

	ret = simcore_execute_microprogram(options) ;
	if (false === ret.ok)
	{
            wepsim_show_stopbyevent("Info", ret.msg) ;
    	    return false ;
        }

        return true ;
    }

    function wepsim_execute_microinstruction ( )
    {
	var ret = simcore_check_if_can_execute() ;
	if (false === ret.ok)
	{
	    wsweb_dlg_alert(ret.msg) ;
	    return false ;
        }

	ret = simcore_execute_microinstruction() ;
	if (false === ret.ok) {
            wepsim_show_stopbyevent("Info", ret.msg) ;
	    return false ;
        }

        return true ;
    }

    function wepsim_execute_set_breakpoint ( hexaddr, is_set )
    {
        var SIMWARE   = get_simware() ;
        var curr_mp   = simhw_internalState('MP') ;
        var curr_addr = parseInt(hexaddr, 16) ;

        if (typeof curr_mp[curr_addr] !== "undefined") {
            curr_mp[curr_addr].breakpoint = is_set ;
        }

        if (typeof SIMWARE.mp[hexaddr] !== "undefined") {
            SIMWARE.mp[hexaddr].breakpoint = is_set ;
        }

        return true ;
    }

    function wepsim_execute_toggle_breakpoint ( hexaddr )
    {
        var SIMWARE   = get_simware() ;
        var curr_mp   = simhw_internalState('MP') ;
        var curr_addr = parseInt(hexaddr, 16) ;
        var is_set    = false ;

        if (typeof curr_mp[curr_addr] !== "undefined")
        {
            is_set = curr_mp[curr_addr].breakpoint ;
            curr_mp[curr_addr].breakpoint = ! is_set ;
        }

        if (typeof SIMWARE.mp[hexaddr] !== "undefined")
        {
            is_set = SIMWARE.mp[hexaddr].breakpoint ;
            SIMWARE.mp[hexaddr].breakpoint = ! is_set ;
        }

        return is_set ;
    }

    function wepsim_execute_toggle_microbreakpoint ( hexaddr )
    {
        var curr_mc   = simhw_internalState('MC') ;
        var curr_addr = parseInt(hexaddr, 16) ;
        var is_set    = false ;

        if (typeof curr_mc[curr_addr] !== "undefined")
        {
            is_set = curr_mc[curr_addr].breakpoint ;
            curr_mc[curr_addr].breakpoint = ! is_set ;
        }

        return is_set ;
    }


    var DBG_stop  = true ;
    var DBG_limit_instruction = 0 ;

    function wepsim_execute_stop ( )
    {
	DBG_stop = true;
        DBG_limit_instruction = 0 ;
        webui_button_set_stop('exebar1') ;

        // stats (how fast execution was)
        var o = 'CLK-'      + Math.trunc(get_value(simhw_sim_state('CLK')))      + '+' +
                'DECO_INS-' + Math.trunc(get_value(simhw_sim_state('DECO_INS'))) + '+' +
                'ACC_TIME-' + Math.trunc(get_value(simhw_sim_state('ACC_TIME'))) ;
        ga('send', 'event', 'execution', 'execution.' + 'cpu', 'execution.' + 'cpu' + '.' + o) ;

	return true ;
    }

    function wepsim_execute_play ( wepsim_execute_stop )
    {
	var ret = simcore_check_if_can_execute() ;
	if (false === ret.ok)
	{
	    wsweb_dlg_alert(ret.msg) ;
	    return false ;
        }

        DBG_stop = false ;
        DBG_limit_instruction = 0 ;
        webui_button_set_start('exebar1') ;

        wepsim_execute_chainplay(wepsim_execute_stop) ;
	return true ;
    }

    function wepsim_execute_toggle_play ( wepsim_execute_stop )
    {
        if (DBG_stop === false)
        {
            DBG_stop = true ; // will help to execute_play stop playing
        }
        else
        {
            wepsim_execute_play(wepsim_execute_stop) ;
        }

        return DBG_stop ;
    }


    /*
     * Breakpoints
     */

    function wepsim_check_stopbybreakpoint ( dash_memaddr )
    {
        if (typeof dash_memaddr === "undefined") {
            return false ;
        }

        return (dash_memaddr.breakpoint) ;
    }

    function wepsim_show_stopbyevent ( msg1, msg2 )
    {
	var dlg_obj = {
			id:      'current_state2',
			title:   function() {
				    var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
				    var reg_maddr  = get_value(simhw_sim_state(maddr_name)) ;
				    var curr_maddr = "0x" + reg_maddr.toString(16) ;
				    var pc_name    = simhw_sim_ctrlStates_get().pc.state ;
				    var reg_pc     = get_value(simhw_sim_state(pc_name)) ;
				    var curr_addr  = "0x" + reg_pc.toString(16) ;
				    var dialog_title = msg1 + " @ pc=" + curr_addr + "+mpc=" + curr_maddr ;
                                    return '<span id="dlg_title2">' + dialog_title + '</span>' ;
                                 },
			body:    function() {
				    return '<div class="card card-info border-light m-2">' +
					   '<div class="card-body">' +
					   '     <div class="row"> ' +
					   '	  <div class="col-auto">' +
					   '	       <em class="fas fa-comment-alt"></em>' +
					   '	  </div>' +
					   '	  <div class="col">' +
					   '	       <h5><span id="dlg_body2">' + msg2 + '</span></h5>' +
					   '	  </div>' +
					   '     </div>' +
					   '</div>' +
					   '</div>' ;
                                 },
			buttons: {
					states: {
					   label:     "<span data-langkey='States'>States</span>",
					   className: 'btn btn-secondary col float-left shadow-none mr-auto',
					   callback: function() {
							wsweb_dlg_close(dlg_obj) ;
							wsweb_dialog_open('state') ;
							return true;
						     },
					},
					close: {
					   label:     "<span data-langkey='Close'>Close</span>",
					   className: 'btn-primary col float-right shadow-none'
					}
				 },
			size:    '',
			onshow:  function() {}
		      } ;

	wsweb_dlg_open(dlg_obj) ;

	return true ;
    }

    function wepsim_check_memdashboard ( ref_mdash, notif_origin )
    {
        if (typeof ref_mdash === "undefined") {
	    return true ;
	}

        // microcode with state:
        if (ref_mdash.state) {
            wepsim_state_history_add() ;
	    wepsim_state_history_list() ;
	}

	// microcode with notify:
	var notifications = ref_mdash.notify.length ;
	if (notifications > 1)
           {
		var dialog_title = "Notify @ 0x" + parseInt(notif_origin).toString(16) + ": " + ref_mdash.notify[1] ;

		var dialog_msg = '<div style="max-height:70vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;">' ;
		for (var k=1; k<notifications; k++) {
		     dialog_msg += ref_mdash.notify[k] + "\n<br>" ;
		}
                dialog_msg += '</div>' ;

		bootbox.confirm({
			title:    dialog_title,
			message:  dialog_msg,
			buttons:  {
				     cancel:  { label: 'Stop',     className: 'btn-danger  btn-sm' },
				     confirm: { label: 'Continue', className: 'btn-primary btn-sm' }
				  },
			callback: function (result) {
				     if (result)
				          setTimeout(wepsim_execute_chainplay, get_cfg('DBG_delay'), wepsim_execute_stop) ;
				     else wepsim_execute_stop() ;
				  }
		});

		return false ;
	   }

        // return 'continue to next one'
	return true ;
    }

    // execute_chunk
    function pack_ret2 ( p_ok, p_level, p_msg )
    {
        var ret2 = {
	              ok:        p_ok,
                      msg_level: p_level,
                      msg:       p_msg
                   } ;

        return ret2 ;
    }

    function wepsim_execute_chunk ( options, chunk )
    {
	var ret  = false ;
        var ret2 = {} ;

	var curr_mp    = simhw_internalState('MP') ;
        var curr_firm  = simhw_internalState('FIRMWARE') ;
	var pc_name    = simhw_sim_ctrlStates_get().pc.state ;
	var ref_pc     = simhw_sim_state(pc_name) ;
	var reg_pc     = get_value(ref_pc) ;
	var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	var ref_maddr  = simhw_sim_state(maddr_name) ;
	var reg_maddr  = get_value(ref_maddr) ;
        var ref_mdash  = null ;

        var i_clks = 0 ;
	var i = 0 ;
        while (i < chunk)
        {
            // one clock cycle...
	    ret2 = simcore_execute_microinstruction2(reg_maddr, reg_pc) ;
	    if (false === ret2.ok) {
                return pack_ret2(false, "Info", ret2.msg) ;
	    }

            // checks
	    i_clks++;
	    if ( (options.cycles_limit > 0) && (i_clks >= options.cycles_limit) ) {
                return pack_ret2(false, "Info", 'WARNING: clock cycles limit reached in a single instruction.') ;
	    }

	    reg_maddr = get_value(ref_maddr) ;
	    reg_pc    = get_value(ref_pc) ;

            ref_mdash = simhw_internalState_get('MC', reg_maddr) ;
	    ret = wepsim_check_memdashboard(ref_mdash, reg_maddr) ;
            if (false === ret) {
                return pack_ret2(false, '', '') ;
            }
	    ret = wepsim_check_stopbybreakpoint(ref_mdash) ;
	    if (true === ret) {
                return pack_ret2(false, "Breakpoint", 'INFO: Microinstruction is going to be issue.') ;
	    }

	    if ( ((0 == reg_maddr) && (false == ref_mdash.is_native)) ||
	         ((0 != reg_maddr) && (true  == ref_mdash.is_native)) )
	    {
                ref_mdash = simhw_internalState_get('MP', reg_pc) ;
	        ret = wepsim_check_memdashboard(ref_mdash, reg_pc) ;
	        if (false === ret) {
                    return pack_ret2(false, '', '') ;
	        }
		ret = wepsim_check_stopbybreakpoint(ref_mdash) ;
		if (true === ret) {
                    return pack_ret2(false, "Breakpoint", 'INFO: Instruction is going to be fetched.') ;
		}

		i++ ;
		i_clks = 0 ;
	    }
        }

        return pack_ret2(true, '', "INFO: number of instruction executed: " + i +
                                   " (limited to " + options.instruction_limit + ")") ;
    }

    function wepsim_execute_chunk_atlevel ( chunk, wepsim_execute_stop )
    {
        var options = {} ;
	var ret = false ;

	var playlevel = get_cfg('DBG_level') ;
	if (playlevel !== "instruction")
        {
	    options = {
			 verbosity:    0,
			 cycles_limit: get_cfg('DBG_limitick')
		      } ;
	    ret = wepsim_execute_chunk(options, chunk) ;
	    if ( (ret.ok == false) && (ret.msg.trim() != '') )
            {
	        wepsim_show_stopbyevent(ret.msg_level, ret.msg) ;
                wepsim_execute_stop() ;
	    }

            return ret.ok ;
	}

        var curr_firm  = simhw_internalState('FIRMWARE') ;
	var pc_name    = simhw_sim_ctrlStates_get().pc.state ;
	var ref_pc     = simhw_sim_state(pc_name) ;
	var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	var ref_maddr  = simhw_sim_state(maddr_name) ;
	var ref_mdash  = 0 ;
	options        = {
			    verbosity:    0,
			    cycles_limit: get_cfg('DBG_limitick')
	                 } ;

	ret = false ;
	var reg_pc  = 0 ;

        for (var i=0; i<chunk; i++)
        {
	    ret = simcore_execute_microprogram(options) ;
	    if (ret.ok === false) {
		wepsim_show_stopbyevent("Info", ret.msg) ;
		wepsim_execute_stop() ;
		return false ;
	    }

	    reg_pc    = get_value(ref_pc) ;
            ref_mdash = simhw_internalState_get('MP', reg_pc) ;

	    ret = wepsim_check_stopbybreakpoint(ref_mdash) ;
	    if (true === ret) {
		wepsim_show_stopbyevent("Breakpoint", "Instruction is going to be fetched.") ;
		wepsim_execute_stop() ;
		return false ;
	    }
        }

        return true ;
    }

    // instructions per chunck to be chained...
    var max_turbo = 5.0 ;

    function wepsim_reset_max_turbo ( )
    {
        max_turbo = 5.0 ;
    }

    function wepsim_execute_chainplay ( wepsim_execute_stop )
    {
	var t0 = 1.0 ;
	var t1 = 1.0 ;

	if (DBG_stop) {
	    wepsim_execute_stop() ;
	    return ;
	}

        var turbo = 1;
	if (get_cfg('DBG_delay') < 5) {
            turbo = Math.trunc(max_turbo) ;
        }
        if (max_turbo === 5) {
            t0 = performance.now() ;
        }

	var options = {
			 verbosity:    0,
			 cycles_limit: get_cfg('DBG_limitick')
		      } ;
	var ret = wepsim_execute_chunk(options, turbo) ;
	if (ret.ok == false)
        {
	    if (ret.msg.trim() != '') {
	        wepsim_show_stopbyevent(ret.msg_level, ret.msg) ;
                wepsim_execute_stop() ;
            }
            return ;
	}

        if (max_turbo === 5) {
            t1 = performance.now() ;
        }
        if (max_turbo === 5) {
            max_turbo = (5000/(t1-t0)) + 1 ;
        }

	DBG_limit_instruction += turbo ;
        if (DBG_limit_instruction > get_cfg('DBG_limitins'))
	{
            wepsim_show_stopbyevent("Limit",
                                    "Number of executed instructions limit reached.<br>" +
                                    "<br>" +
                                    "See related configuration options about limits:<br>" +
                                    "<img height='100vw' src='./images/simulator/simulator018.jpg'>" );
	    wepsim_execute_stop() ;

            return ;
	}

	setTimeout(wepsim_execute_chainplay, get_cfg('DBG_delay'), wepsim_execute_stop) ;
    }

