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


        /* 1) Init */

        /**
         * Initialize simulator core and UI.
         * @param {string} stateall_id - associated div
         * @param {string} statebr_id - associated div
         * @param {string} ioall_id - associated div
         * @param {string} cpuall_id - associated div
         * @param {string} configall_id - associated div
         */

        var sim_core_with_ui = false ;

        function sim_core_init ( with_ui )
        {
	    var ret = {} ;
	        ret.msg     = "" ;
	        ret.ok      = true ;

            sim_core_with_ui = with_ui ;

            if ( with_ui ) {
		restore_cfg() ;
	    }
	    else {
                reset_cfg() ;
                stop_drawing() ;
	    }

            // 1.- it checks if everything is ok
            check_behavior();

            // 2.- pre-compile behaviors & references
            compile_behaviors() ;
            firedep_to_fireorder(jit_fire_dep) ;
            compute_references() ;

            return ret ;
        }


        /* 2) UI panels */

        /**
         * Initialize simulator core and UI.
         * @param {string} stateall_id - associated div
         * @param {string} statebr_id - associated div
         * @param {string} ioall_id - associated div
         * @param {string} cpuall_id - associated div
         * @param {string} configall_id - associated div
         */
        function sim_core_init_panel ( stateall_id, statebr_id, ioall_id, cpuall_id, configall_id )
        {
	    var ret = {} ;
	        ret.msg     = "" ;
	        ret.ok      = true ;

            // display the information holders
            init_states(stateall_id) ;
            init_rf(statebr_id) ;

            init_io(ioall_id) ;
            init_cpu(cpuall_id) ;
            init_config(configall_id) ;

            return ret ;
        }

        /**
         * Initialize simulator event handler.
         * @param {string} context - associated context
         */
        function sim_core_init_eventlistener ( context )
        {
            // 3.- for every signal, set the click event handler
            for (var key in sim_signals)
            {
                for (var j=0; j<sim_signals[key].fire_name.length; j++)
                {
			   var r = sim_signals[key].fire_name[j].split(':') ;
			   if (r[0] != context) {
			       continue;
                           }

  			   var o = document.getElementById(r[0]).contentDocument ;
                           if (null == o)  {
                               console.log('warning: unreferenced graphic element context named "' + r[0] + '".');
                               continue;
                           }

  			   var u = o.getElementById(r[1]) ;
                           if (null == u)  {
                               console.log('warning: unreferenced graphic element named "' + r[0] + ':' + r[1] + '".');
                               continue;
                           }

  			   u.addEventListener('click', update_signal, false);
                }
            }
        }


        /* 3) Check if can... */

        /**
         * Check if simulation can be executed
         * @param {boolean} with_ui - if there is UI available
         */
        function sim_core_check_if_can_execute ( )
        {
	        var ret = {} ;
	            ret.msg = "" ;
	            ret.ok  = true ;

		if ( (typeof segments['.ktext'] == "undefined") &&
		     (typeof segments['.text']  == "undefined") )
		{
		    ret.msg = 'code segment .ktext/.text does not exist!' ;
	            ret.ok = false ;
		    return ret ;
		}

	        var SIMWARE = get_simware();

                if (
                     (! ((typeof segments['.ktext'] != "undefined") && (SIMWARE.labels2.kmain)) ) &&
                     (! ((typeof segments['.text']  != "undefined") && (SIMWARE.labels2.main))   )
                )
                {
		     ret.msg = "labels 'kmain' (in .ktext) or 'main' (in .text) do not exist!" ;
	             ret.ok = false ;
		     return ret ;
	        }

                return ret ;
        }

        /**
         * Check if simulation can continue its execution
         */
        function sim_core_check_if_can_continue ( )
        {
		var ret = {} ;
		    ret.ok  = true ;
		    ret.msg = "" ;

		var reg_maddr = get_value(sim_states.REG_MICROADDR) ;
                if (typeof MC[reg_maddr] == "undefined") {
		    ret.ok  = false ;
		    ret.msg = "Error: undefined microinstruction at " + reg_maddr + "." ;
                    return ret ;
		}

		// when do reset/fetch, check text segment bounds
	        var mode = get_cfg('ws_mode');
	        if ( ('webmips' != mode) && (reg_maddr != 0) ) {
                       return ret;
		}

		var reg_pc = parseInt(get_value(sim_states.REG_PC));
		if ( (reg_pc < segments['.ktext'].end) && (reg_pc >= segments['.ktext'].begin)) {
                    return ret;
		}
		if ( (reg_pc <  segments['.text'].end) && (reg_pc >=  segments['.text'].begin)) {
                    return ret;
		}

                // if (reg_maddr == 0) && (outside *text) -> cannot continue
		ret.ok  = false ;
		ret.msg = 'The program has finished because the PC register points outside .ktext/.text code segments' ;
                return ret ;
        }

    
        /* 4) Execution */

        /**
         * Reset the WepSIM simulation.
         */
        function sim_core_reset ( )
        {
    	    var ret = {} ;
    	        ret.msg     = "" ;
    	        ret.ok      = true ;
    
            // Hardware
	    var SIMWARE = get_simware() ;
            compute_general_behavior("RESET") ;

            if ((typeof segments['.ktext'] != "undefined") && (SIMWARE.labels2.kmain))
	    {
                    set_value(sim_states.REG_PC, parseInt(SIMWARE.labels2.kmain));
		    if (sim_core_with_ui) {
                        show_asmdbg_pc() ;
		    }
    	    }
            else if ((typeof segments['.text'] != "undefined") && (SIMWARE.labels2.main))
	    {
                    set_value(sim_states.REG_PC, parseInt(SIMWARE.labels2.main));
		    if (sim_core_with_ui) {
                        show_asmdbg_pc() ;
		    }
    	    }
    
    	    if ( (typeof segments['.stack'] != "undefined") &&
                 (typeof sim_states.BR[FIRMWARE.stackRegister] != "undefined") )
    	    {
    		set_value(sim_states.BR[FIRMWARE.stackRegister], parseInt(segments['.stack'].begin));
    	    }

	    var mode = get_cfg('ws_mode');
	    if ('webmips' != mode) {
                compute_general_behavior("CLOCK") ;
	    }

            // User Interface
	    if (sim_core_with_ui)
	    {
	        show_states() ;
                show_rf_values();
                show_rf_names();
                show_dbg_ir(get_value(sim_states.REG_IR_DECO)) ;

                show_main_memory   (MP,                0, true, false) ;
                show_control_memory(MC,  MC_dashboard, 0, true) ;
	    }

            set_screen_content("") ;

            return ret ;
        }

        /**
         * Execute the next microinstruction.
         */
        function sim_core_execute_microinstruction ( )
        {
	        var ret = sim_core_check_if_can_continue() ;
	        if (false == ret.ok) {
		    return ret ;
	        }

                compute_general_behavior("CLOCK") ;

		show_states();
		show_rf_values();
                show_dbg_mpc();

                return ret ;
        }

        /**
         * Execute the next instruction.
         */
        function sim_core_execute_microprogram ( limit_clks )
        {
	        var ret = sim_core_check_if_can_continue() ;
	        if (false == ret.ok) {
		    return ret ;
	        }

                var mode = get_cfg('ws_mode');
                if ('webmips' == mode) 
                {
                    compute_general_behavior("CLOCK") ; // fetch...
                    compute_general_behavior("CLOCK") ; // ...instruction
		    show_states();
		    show_rf_values();
                    return ret ;
                }

                var limitless = false;
                if (limit_clks < 0)
                    limitless = true;

                // 1.- do-while the microaddress register doesn't store the fetch address (0): 
                //              execute micro-instructions
                var i_clks = 0 ;
                var cur_addr = 0 ;
		do
            	{
                    compute_general_behavior("CLOCK") ;

                    i_clks++;
                    if (limitless) 
		    {
                        limit_clks = i_clks + 1;
		    }
                    if (i_clks >= limit_clks) 
		    {
		        ret.msg = 'Warning: clock cycles limit reached in a single instruction.' ;
		        ret.ok  = false ;
			break ;
	            }

                    cur_addr = get_value(sim_states.REG_MICROADDR) ;
                    if (typeof MC[cur_addr] == "undefined")
		    {
		        ret.msg = "Error: undefined microinstruction at " + cur_addr + "." ;
		        ret.ok  = false ;
			break ;
	            }
            	}
		while ( (i_clks < limit_clks) && (0 != cur_addr) );

                // 2.- to show states
		show_states();
		show_rf_values();

                if (get_cfg('DBG_level') == "microinstruction") {
                    show_dbg_mpc();
                }

		return ret ;
        }

        /**
         * Execute the assembly previously compiled and loaded.
         * @param {integer} ins_limit - The limit of instructions to be executed
         * @param {integer} clk_limit - The limit of clock cycles per instruction
         */
        function sim_core_execute_program ( ins_limit, clk_limit )
        {
    	    var ret = {} ;
    	        ret.ok  = true ;
    	        ret.msg = "" ;
    
            // execute firmware-assembly
    	    var reg_pc        = get_value(sim_states.REG_PC) ;
    	    var reg_pc_before = get_value(sim_states.REG_PC) - 4 ;
    
    	    var code_begin  = 0 ;
    	    if ( (typeof segments['.text'] != "undefined") && (typeof segments['.text'].begin != "undefined") )
    	          code_begin = parseInt(segments['.text'].begin) ;
    	    var code_end    = 0 ;
    	    if ( (typeof segments['.text'] != "undefined") && (typeof segments['.text'].end   != "undefined") )
    	          code_end = parseInt(segments['.text'].end) ;
    
    	    var kcode_begin = 0 ;
    	    if ( (typeof segments['.ktext'] != "undefined") && (typeof segments['.ktext'].begin != "undefined") )
    	          kcode_begin = parseInt(segments['.ktext'].begin) ;
    	    var kcode_end   = 0 ;
    	    if ( (typeof segments['.ktext'] != "undefined") && (typeof segments['.ktext'].end   != "undefined") )
    	          kcode_end = parseInt(segments['.ktext'].end) ;
    
    	    var ins_executed = 0 ; 
    	    while (
                         (reg_pc != reg_pc_before)  &&
                      ( ((reg_pc <  code_end) && (reg_pc >=  code_begin)) ||
                        ((reg_pc < kcode_end) && (reg_pc >= kcode_begin)) )
                  )
    	    {
    	           ret = sim_core_execute_microprogram(clk_limit) ;
                   if (false == ret.ok) {
    		       return ret ;
    	           }
    
    	           ins_executed++ ; 
                   if (ins_executed > ins_limit) 
    	           {
    	               ret.ok  = false ;
    	               ret.msg = "more than " + ins_limit + " instructions executed before application ends.";
    		       return ret ;
    	           }
    
    	           reg_pc_before = reg_pc ;
    	           reg_pc = get_value(sim_states.REG_PC) ;
    	    }
    
            return ret ;
        }


        /* 5) Compile */
    
        /**
         * Compile Firmware.
         * @param {string} textToMCompile - The firmware to be compile and loaded into memory
         */
        function sim_core_compile_firmware ( textToMCompile )
        {
    	    var ret = {} ;
    	        ret.msg = "" ;
    	        ret.ok  = true ;
    
            // check empty
    	    if ("" == textToMCompile)
            {
                ret.msg = 'Empty Firmware' ;
                ret.ok  = false ;
                return ret ;
            }

            // try to load...
    	    var preSM = null ;
	    try
	    {
    	        preSM = loadFirmware(textToMCompile) ;
    	        ret.simware = preSM ;
	    }
	    catch (e) 
	    {
	        // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError
	        ret.msg = 'ERROR: at line: ' + e.lineNumber + ' and column: ' + e.columnNumber ;
                ret.ok  = false ;
	        return ret;
	    }

            // check load result...
    	    if (preSM.error != null)
            {
                ret.msg = preSM.error ;
                ret.ok  = false ;
                return ret ;
            }
    
            // update with loaded microcode
            update_memories(preSM);
    	    sim_core_reset() ;
            return ret ;
        }
    
        /**
         * Compile Assembly.
         * @param {string} textToCompile - The assembly to be compile and loaded into memory
         */
        function sim_core_compile_assembly ( textToCompile )
        {
    	    var ret = {} ;
    	        ret.msg = "" ;
    	        ret.ok  = true ;
    
            // get SIMWARE.firmware
            var SIMWARE = get_simware() ;
    	    if (SIMWARE.firmware.length == 0)
            {
                ret.msg = 'Empty microcode, please load the microcode first.' ;
                ret.ok  = false;
                return ret;
    	    }
    
            // compile Assembly and show message
            var SIMWAREaddon = simlang_compile(textToCompile, SIMWARE);
    	    ret.simware = SIMWAREaddon ;
            if (SIMWAREaddon.error != null)
            {
                ret.msg = SIMWAREaddon.error ;
                ret.ok  = false;
                return ret;
            }
    
            // update memory and segments
            set_simware(SIMWAREaddon) ;
    	    update_memories(SIMWARE) ;
    	    sim_core_reset() ;
    
            return ret ;
        }
    
