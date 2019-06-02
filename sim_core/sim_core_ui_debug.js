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


        /*
         *  Debug
         */

        var show_asmdbg_pc_deferred = null;

	function innershow_asmdbg_pc ( )
	{
	    fullshow_asmdbg_pc();
	    show_asmdbg_pc_deferred = null;
	}

	function show_asmdbg_pc ( )
	{
            if (get_cfg('DBG_delay') > 5)
	        return fullshow_asmdbg_pc();

            if (null == show_asmdbg_pc_deferred)
                show_asmdbg_pc_deferred = setTimeout(innershow_asmdbg_pc, cfg_show_asmdbg_pc_delay);
	}

        var old_addr = 0;

	function fullshow_asmdbg_pc ( )
	{
		if (typeof document == "undefined") {
		    return ;
		}

                var o1 = null ;

	        var pc_name = simhw_sim_ctrlStates_get().pc.state ;
	        var reg_pc  = get_value(simhw_sim_state(pc_name)) ;
                var curr_addr = "0x" + reg_pc.toString(16) ;
                var curr_firm = simhw_internalState('FIRMWARE') ;

                if (typeof curr_firm.assembly[old_addr] != "undefined")
                {
                     o1 = $("#asmdbg" + old_addr) ;
                     o1.css('background-color', curr_firm.assembly[old_addr].bgcolor) ;
                }
                else
                {
                     for (var l in curr_firm.assembly)
                     {
                          o1 = $("#asmdbg" + l) ;
                          o1.css('background-color', curr_firm.assembly[l].bgcolor) ;
                     }
                }
                old_addr = curr_addr ;

                o1 = $("#asmdbg" + curr_addr) ;
                o1.css('background-color', '#00EE88') ;

                return o1 ;
	}

        function asmdbg_set_breakpoint ( addr )
        {
                var icon_theme = get_cfg('ICON_theme') ;
                var hexaddr    = "0x" + addr.toString(16) ;
                var curr_firm  = simhw_internalState('FIRMWARE') ;

                var o1 = document.getElementById("bp"+hexaddr) ;
                var bp_state = curr_firm.assembly[hexaddr].breakpoint ;

                if (bp_state === true) {
                    bp_state = false ;
                    o1.innerHTML = "&nbsp;" ;
                } else {
                    bp_state = true ;
                    o1.innerHTML = sim_core_breakpointicon_get(icon_theme) ;
                }

                curr_firm.assembly[hexaddr].breakpoint = bp_state ;

		// add if recording
                simcore_record_append_new('Set assembly breakpoint at ' + addr,
                                          'asmdbg_set_breakpoint(' + addr + ');\n') ;

        }

        function dbg_set_breakpoint ( addr )
        {
                var icon_theme = get_cfg('ICON_theme') ;
                var dbg_level  = get_cfg('DBG_level') ;

                var o1       = document.getElementById("mcpin" + addr) ;
                var bp_state = simhw_internalState_get('MC_dashboard', addr).breakpoint ;

                if (bp_state === true) {
                    bp_state = false ;
                    o1.innerHTML = "&nbsp;" ;
                } else {
                    bp_state = true ;
                    o1.innerHTML = sim_core_breakpointicon_get(icon_theme) ;
                }

                simhw_internalState_get('MC_dashboard', addr).breakpoint = bp_state ;

                if ( bp_state && ('instruction' === dbg_level) )
                {
                     simcoreui_notify('<strong>INFO</strong>',
                                      'Please remember to change configuration to execute at microinstruction level.',
		                      'success', 
			              get_cfg('NOTIF_delay')) ;
                }

		// add if recording
                simcore_record_append_new('Set firmware breakpoint at ' + addr,
                                          'dbg_set_breakpoint(' + addr + ');\n') ;
        }

	function show_dbg_mpc ( )
	{
	        var maddr_name = simhw_sim_ctrlStates_get().mpc.state ;
	        var reg_maddr  = get_value(simhw_sim_state(maddr_name)) ;

                show_control_memory(simhw_internalState('MC'),
                                    simhw_internalState('MC_dashboard'),
			            reg_maddr,
                                    false) ;
	}

        var show_dbg_ir_deferred = null;

	function show_dbg_ir ( decins )
	{
            if (null != show_dbg_ir_deferred) {
                return ;
            }

            show_dbg_ir_deferred = setTimeout(function() {
                                                   fullshow_dbg_ir(decins);
                                                   show_dbg_ir_deferred = null;
                                              }, cfg_show_dbg_ir_delay);
	}

	function fullshow_dbg_ir ( decins )
	{
	     if (typeof document == "undefined") {
	         return ;
             }

	     var o = document.getElementById('svg_p');
	     if (o != null) o = o.contentDocument;
	     if (o != null) o = o.getElementById('tspan3899');
	     if (o != null) o.innerHTML = decins ;

	         o = document.getElementById('svg_cu');
	     if (o != null) o = o.contentDocument;
	     if (o != null) o = o.getElementById('text3611');
	     if (o != null) o.innerHTML = decins ;
	}

