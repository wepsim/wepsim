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


    /*
     * Run/Stop
     */

    function wepsim_execute_reset ( reset_cpu, reset_memory )
    {
        wepsim_state_history_reset();

        if (true === reset_memory)
        {
            var SIMWARE = get_simware() ;
	    if (SIMWARE.firmware.length !== 0)
                update_memories(SIMWARE) ;
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

    function wepsim_execute_set_breakpoint ( addr )
    {
        return asmdbg_set_breakpoint(addr) ;
    }

    var DBG_stop  = true ;
    var DBG_limit_instruction = 0 ;

    function wepsim_execute_stop ( btn1 )
    {
	var wsi     = get_cfg('ws_idiom') ;
        var run_tag = i18n_get('gui',wsi,'Run') ;

	$(btn1).html("<i class='fa fa-play'></i><br><b>" + run_tag + "</b>") ;
	$(btn1).css("backgroundColor", "#CCCCCC") ;

	DBG_stop = true;
        DBG_limit_instruction = 0 ;
    }

    function wepsim_execute_play ( btn1 )
    {
	var wsi      = get_cfg('ws_idiom') ;
        var stop_tag = i18n_get('gui',wsi,'Stop') ;

	var ret = simcore_check_if_can_execute() ;
	if (false === ret.ok)
	{
	    wsweb_dlg_alert(ret.msg) ;
	    return false ;
        }

	$(btn1).css("backgroundColor", 'rgb(51, 136, 204)') ;
	$(btn1).html("<i class='fa fa-stop'></i><br><b>" + stop_tag + "</b>") ;

        DBG_stop = false ;
        DBG_limit_instruction = 0 ;

        wepsim_execute_chainplay(btn1) ;
    }

    function wepsim_execute_toggle_play ( btn1 )
    {
        if (DBG_stop === false)
        {
            DBG_stop = true ; // will help to execute_play stop playing
        }
        else
        {
            wepsim_execute_play(btn1) ;
        }
    }


    /*
     * Breakpoints
     */

    function wepsim_check_stopbybreakpoint_firm ( reg_maddr )
    {
        var dash_maddr = simhw_internalState_get('MC_dashboard', reg_maddr) ;

        if (typeof dash_maddr === "undefined") {
            return false ;
        }

        return (dash_maddr.breakpoint) ;
    }

    function wepsim_check_stopbybreakpoint_asm ( curr_firm, reg_pc )
    {
	var curr_addr  = "0x" + reg_pc.toString(16) ;

	if (typeof curr_firm.assembly[curr_addr] === "undefined") {
            return false ;
        }

	return (curr_firm.assembly[curr_addr].breakpoint) ;
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

    function wepsim_check_mcdashboard ( btn1, reg_maddr )
    {
        var ref_mcdash = simhw_internalState_get('MC_dashboard', reg_maddr) ;
        if (typeof ref_mcdash === "undefined") {
	    return true ;
	}

        // microcode with state:
        if (ref_mcdash.state) {
            wepsim_state_history_add() ;
	    wepsim_state_history_list() ;
	}

	// microcode with notify:
	var notifications = ref_mcdash.notify.length ;
	if (notifications > 1)
           {
		var dialog_title = "Notify @ " + reg_maddr + ": " + ref_mcdash.notify[1] ;

		var dialog_msg = '<div style="max-height:70vh; width:inherit; overflow:auto; -webkit-overflow-scrolling:touch;">' ;
		for (var k=1; k<notifications; k++) {
		     dialog_msg += ref_mcdash.notify[k] + "\n<br>" ;
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
				          setTimeout(wepsim_execute_chainplay, get_cfg('DBG_delay'), btn1) ;
				     else wepsim_execute_stop(btn1) ;
				  }
		});

		return false ;
	   }

        // return 'continue to next one'
	return true ;
    }

    function wepsim_execute_chunk ( btn1, chunk )
    {
	var options    = {
			     verbosity:    0,
			     cycles_limit: get_cfg('DBG_limitick')
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
        while (i < chunk)
        {
	    ret = simcore_execute_microinstruction2(reg_maddr, reg_pc) ;
	    if (false === ret.ok) {
		wepsim_show_stopbyevent("Info", ret.msg) ;
		wepsim_execute_stop(btn1) ;
		return false ;
	    }

	    i_clks++;
	    if ( (options.cycles_limit > 0) && (i_clks >= options.cycles_limit) )
	    {
		wepsim_show_stopbyevent("Info", 'Warning: clock cycles limit reached in a single instruction.') ;
		wepsim_execute_stop(btn1) ;
		return false ;
	    }

	    reg_maddr = get_value(ref_maddr) ;
	    reg_pc    = get_value(ref_pc) ;

	    ret = wepsim_check_mcdashboard(btn1, reg_maddr) ;
	    if (false === ret) {
		return false ;
	    }

	    ret = wepsim_check_stopbybreakpoint_firm(reg_maddr) ;
	    if (true === ret)
	    {
		wepsim_show_stopbyevent("Breakpoint", "Microinstruction is going to be issue.") ;
		wepsim_execute_stop(btn1) ;
		return false ;
	    }

	    if (0 === reg_maddr)
	    {
		ret = wepsim_check_stopbybreakpoint_asm(curr_firm, reg_pc) ;
		if (true === ret) {
		    wepsim_show_stopbyevent("Breakpoint", "Instruction is going to be fetched.") ;
		    wepsim_execute_stop(btn1) ;
		    return false ;
		}

		i++ ;
		i_clks = 0 ;
	    }
        }

        return true ;
    }

    function wepsim_execute_chunk_atlevel ( btn1, chunk )
    {
	var playlevel = get_cfg('DBG_level') ;
	if (playlevel !== "instruction") {
            return wepsim_execute_chunk(btn1, chunk) ;
	}

        var curr_firm  = simhw_internalState('FIRMWARE') ;
	var pc_name    = simhw_sim_ctrlStates_get().pc.state ;
	var ref_pc     = simhw_sim_state(pc_name) ;
	var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	var ref_maddr  = simhw_sim_state(maddr_name) ;
	var options    = {
			     verbosity:    0,
			     cycles_limit: get_cfg('DBG_limitick')
	                 } ;

	var ret = false ;
	var reg_pc  = 0 ;

        for (var i=0; i<chunk; i++)
        {
	    ret = simcore_execute_microprogram(options) ;
	    if (ret.ok === false) {
		wepsim_show_stopbyevent("Info", ret.msg) ;
		wepsim_execute_stop(btn1) ;
		return false ;
	    }

	    reg_pc = get_value(ref_pc) ;

	    ret = wepsim_check_stopbybreakpoint_asm(curr_firm, reg_pc) ;
	    if (true === ret) {
		wepsim_show_stopbyevent("Breakpoint", "Instruction is going to be fetched.") ;
		wepsim_execute_stop(btn1) ;
		return false ;
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
        if (max_turbo === 5)
            t0 = performance.now() ;

        var ret = wepsim_execute_chunk(btn1, turbo) ;
        if (false === ret) {
            return ;
        }

        if (max_turbo === 5) {
            t1 = performance.now() ;
        }
        if (max_turbo === 5) {
            max_turbo = 3000/(t1-t0) ;
        }

	DBG_limit_instruction += turbo ;
        if (DBG_limit_instruction > get_cfg('DBG_limitins'))
	{
            wepsim_show_stopbyevent("Limit",
                                    "Number of executed instructions limit reached.<br>" +
                                    "<br>" +
                                    "See related configuration options about limits:<br>" +
                                    "<img height='100vw' src='./images/simulator/simulator018.jpg'>" );
	    wepsim_execute_stop(btn1) ;

            return ;
	}

	setTimeout(wepsim_execute_chainplay, get_cfg('DBG_delay'), btn1) ;
    }

