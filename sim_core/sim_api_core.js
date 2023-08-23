/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         * @param {boolean} with_ui - initialize with UI support
         */
        function simcore_init ( with_ui )
        {
	    var ret = {} ;
	        ret.msg = "" ;
	        ret.ok  = true ;

            // cfg
            if ( with_ui ) {
		 restore_cfg() ;
	    }
	    else {
                 reset_cfg_values() ;
	    }

            return ret ;
        }

        /**
         * Initialize simulator Hardware.
         * @param {string} simhw_name - hardware name
         */
        function simcore_init_hw ( simhw_name )
        {
	    var ret = {} ;
	        ret.msg = "" ;
	        ret.ok  = true ;

            // hardware
	    var hwid = simhw_getIdByName(simhw_name) ;
	    if (hwid < 0)
	    {
	        ret.msg = "ERROR: unknown hardware: " + simhw_name + ".<br>\n" ;
	        ret.ok  = false ;
	        return ret ;
	    }
	    simhw_setActive(hwid) ;

            // ui
	    var ret1 = simcore_init_ui({}) ;
	    if (false === ret1.ok)
	    {
                ret.msg = ret.msg ;
                ret.ok  = false ;
	        return ret ;
	    }

            return ret ;
        }

        /**
         * Show welcome message.
         * http://patorjk.com/software/taag/#p=testall&h=0&v=0&f=Delta%20Corps%20Priest%201&t=WepSIM
         */
        function simcore_welcome ( )
        {
	    var ret = {} ;
	        ret.msg = "" ;
	        ret.ok  = true ;

            console.log('') ;
            console.log('██╗    ██╗███████╗██████╗ ███████╗██╗███╗   ███╗') ;
            console.log('██║    ██║██╔════╝██╔══██╗██╔════╝██║████╗ ████║') ;
            console.log('██║ █╗ ██║█████╗  ██████╔╝███████╗██║██╔████╔██║') ;
            console.log('██║███╗██║██╔══╝  ██╔═══╝ ╚════██║██║██║╚██╔╝██║') ;
            console.log('╚███╔███╔╝███████╗██║     ███████║██║██║ ╚═╝ ██║') ;
            console.log(' ╚══╝╚══╝ ╚══════╝╚═╝     ╚══════╝╚═╝╚═╝     ╚═╝') ;
            console.log('') ;
            console.log('Stable: https://github.com/wepsim/wepsim') ;
            console.log('Beta:   https://github.com/acaldero/wepsim') ;
            console.log('') ;

            return ret ;
        }


        /* 2) UI panels */

        /**
         * Initialize simulator core and UI.
         * @param {hash} hash_detail2init - actions to hook for initialize UI
         */
        function simcore_init_ui ( hash_detail2init )
        {
	    var ret = {} ;
	        ret.msg = "" ;
	        ret.ok  = true ;

            // display the information holders
	    var detail_id = 0 ;
            var sim_components = simhw_sim_components() ;
            for (var elto in sim_components)
            {
	         sim_components[elto].details_ui = [] ;

		 for (var index in sim_components[elto].details_name)
		 {
	              sim_components[elto].details_ui[index] = {} ;

	              detail_id = sim_components[elto].details_name[index] ;
	              if (typeof hash_detail2init[detail_id] !== "undefined")
		      {
	                  sim_components[elto].details_ui[index] = hash_detail2init[detail_id] ;
	                  sim_components[elto].details_ui[index].init() ;
		      }
		 }
            }

            return ret ;
        }

        /**
         * Update UI with some action
         * @param  {string}  component_name - component name
         * @param  {integer} detail_id      - detail id
         * @param  {string}  action_name    - UI action name
         * @return {function} - action associated
         */

        function simcore_action_ui ( component_name, detail_id, action_name )
        {
            var sim_components = simhw_sim_components() ;

            if (typeof sim_components[component_name].details_ui === "undefined") {
                return simcore_do_nothing_handler ;
            }
            if (typeof sim_components[component_name].details_ui[detail_id][action_name] === "undefined") {
                return simcore_do_nothing_handler ;
            }

            return sim_components[component_name].details_ui[detail_id][action_name] ;
        }

        /**
         * Initialize simulator event handler.
         * @param {string} context - associated context
         * @param {hash} hash_detail2action - actions to hook for details
         * @param {hash} hash_signal2action - actions to hook for signals
         */

        function simcore_init_eventlistener ( context, hash_detail2action, hash_signal2action )
        {
	    var context_obj = null ;
	    var r = [] ;
	    var o = null ;

	    // 1.- check parameters...
	    context_obj = document.getElementById(context).contentDocument ;
	    if (null == context_obj)
            {
	        console.log('warning: unreferenced graphic element context named "' + r[0] + '".') ;
	        return ;
	    }

            // 2.- for every signal, set the click event handler
            var sim_signals = simhw_sim_signals() ;
            for (var key in sim_signals)
            {
		if (typeof hash_signal2action[key + "click"] === "undefined")
		{
		    hash_signal2action[key + "click"] = function(key_value) {
			                                   return function() { hash_signal2action["<all>"](key_value,    "click"); };
		                                        }(key) ;
		}
		if (typeof hash_signal2action[key + "dblclick"] === "undefined")
		{
		    hash_signal2action[key + "dblclick"] = function(key_value) {
			                                     return function() { hash_signal2action["<all>"](key_value, "dblclick"); };
		                                           }(key) ;
		}

                for (var j=0; j<simhw_sim_signal(key).fire_name.length; j++)
                {
			   r = simhw_sim_signal(key).fire_name[j].split(':') ;
			   if (r[0] !== context) {
			       continue ;
                           }

  			   o = context_obj.getElementById(r[1]) ;
                           if (null === o)  {
                               console.log('warning: unreferenced graphic element named "' + r[0] + ':' + r[1] + '".') ;
                               continue ;
                           }

                           o.addEventListener('click',    hash_signal2action[key +    "click"], false) ;
                           o.addEventListener('dblclick', hash_signal2action[key + "dblclick"], false) ;
                }
            }

            // 3.- for every 'hardware detail' component, set the click event handler to show the associated detail panel
	    var sim_components = simhw_sim_components() ;
	    for (var elto in sim_components)
	    {
		 for (var index in sim_components[elto].details_name)
		 {
		      var firename = sim_components[elto].details_name[index] ;
		      if (typeof hash_detail2action[firename] === "undefined") {
		          continue ;
		      }

		      for (var fireindex in sim_components[elto].details_fire[index])
		      {
			   r = sim_components[elto].details_fire[index][fireindex].split(':') ;
			   if (r[0] !== context) {
			       continue;
                           }

			   o = context_obj.getElementById(r[1]) ;
                           if (null === o)  {
                               console.log('warning: unreferenced graphic element named "' + r[0] + ':' + r[1] + '".');
                               continue;
                           }

			   o.addEventListener('click', hash_detail2action[firename], false) ;
		      }
		 }
	    }
        }


        /* 3) Check if can... */

        /**
         * Check if simulation can be executed
         * @param {boolean} with_ui - if there is UI available
         */
        function simcore_check_if_can_execute ( )
        {
	        var ret = {} ;
	            ret.msg = "" ;
	            ret.ok  = true ;

                var curr_segments = simhw_internalState('segments') ;

		if ( (typeof curr_segments['.ktext'] == "undefined") &&
		     (typeof curr_segments['.text']  == "undefined") )
		{
		    ret.msg = 'code segment .ktext/.text does not exist!<br>\n' +
                              'Please load some assembly code.<br>' ;
	            ret.ok = false ;
		    return ret ;
		}

	        var SIMWARE = get_simware();

                if (
                     (! ((typeof curr_segments['.ktext'] != "undefined") && (SIMWARE.labels_asm.kmain)) ) &&
                     (! ((typeof curr_segments['.text']  != "undefined") && (SIMWARE.labels_asm.main))   )
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
        function simcore_packerror_at ( reg_maddr, msg )
        {
                var ret = {} ;

                var hex_maddr = "0x" + parseInt(reg_maddr).toString(16) ;
                ret.ok  = false ;
                ret.msg = msg + " at maddr=" + hex_maddr + "." ;

                return ret ;
        }

        function simcore_check_if_can_continue2 ( reg_maddr, reg_pc )
        {
                var ret = {} ;
                    ret.ok  = true ;
                    ret.msg = "" ;

                // if (MC[reg_maddr] == undefined) -> cannot continue
                var curr_MC = simhw_internalState('MC') ;
                var mcelto  = control_memory_get(curr_MC, reg_maddr) ;
                if (typeof mcelto === "undefined") {
                    return simcore_packerror_at(reg_maddr, 'Error: undefined microinstruction') ;
                }

                // if (two or more tri-states are active) -> cannot continue
                if ( (simhw_internalState_get('fire_visible', 'databus') == true) ||
                     (simhw_internalState_get('fire_visible', 'internalbus') == true) ) {
                     return simcore_packerror_at(reg_maddr, 'Error: two or more tri-states are active') ;
                }

                // if (inside *text) -> can continue
                var curr_segments = simhw_internalState('segments') ;
                if ( (reg_pc < curr_segments['.ktext'].end) && (reg_pc >= curr_segments['.ktext'].begin)) {
                      return ret;
                }
                if ( (reg_pc <  curr_segments['.text'].end) && (reg_pc >=  curr_segments['.text'].begin)) {
                      return ret;
                }

                // if (border *text) && (native code) && (reg_maddr === 0) -> can continue
                if ( (mcelto.is_native) && (0 === reg_maddr) ) {
                    if ( (reg_pc == curr_segments['.ktext'].end) || (reg_pc == curr_segments['.text'].end) ) {
                          return ret;
		    }
                }

                // if (border *text) && (reg_maddr !== 0) -> can continue
                if ( (false == mcelto.is_native) && (0 !== reg_maddr) ) {  // TEST
             // if (0 !== reg_maddr) {
                    if ( (reg_pc == curr_segments['.ktext'].end) || (reg_pc == curr_segments['.text'].end) ) {
                          return ret;
		    }
		}

		// e.o.c. -> cannot continue
                ret.ok  = false ;
                ret.msg = 'The program has finished because the PC register points outside .ktext/.text code segments' ;
                return ret ;
        }

        function simcore_check_if_can_continue ( )
        {
                var pc_name     = simhw_sim_ctrlStates_get().pc.state ;
                var reg_pc      = parseInt(get_value(simhw_sim_state(pc_name)));
                var maddr_name  = simhw_sim_ctrlStates_get().mpc.state ;
                var reg_maddr   = get_value(simhw_sim_state(maddr_name)) ;

                return simcore_check_if_can_continue2(reg_maddr, reg_pc) ;
        }


        /* 4) Execution */

        /**
         * Reset the WepSIM simulation.
         */
        function simcore_reset ( )
        {
    	    var ret = {} ;
    	        ret.msg = "" ;
    	        ret.ok  = true ;

            // current elements
	    var SIMWARE        = get_simware() ;
            var curr_firm      = simhw_internalState('FIRMWARE') ;
            var curr_segments  = simhw_internalState('segments') ;
            var curr_MC        = simhw_internalState('MC') ;
            var sim_components = simhw_sim_components() ;
            var ctrl_states    = simhw_sim_ctrlStates_get() ;

            // get PC and SP
            var pc_name  = ctrl_states.pc.state ;
	    var pc_state = simhw_sim_state(pc_name) ;

            var sp_name  = ctrl_states.sp.state ;
            var sp_state = simhw_sim_state(sp_name) ;
            if (curr_firm.stackRegister != null)
            {
                sp_name  = curr_firm.stackRegister ;
                sp_state = simhw_sim_states().BR[sp_name] ;
                ctrl_states.sp.state = 'BR.' + curr_firm.stackRegister ;
            }

            // Hardware (reset)
            for (var elto in sim_components)
            {
		 var reset_signal_name = sim_components[elto].name + "_RESET" ;
		 compute_general_behavior(reset_signal_name) ;
            }

	    // CPU registers initial values
	    if ((typeof curr_segments['.ktext'] !== "undefined") && (SIMWARE.labels_asm.kmain))
	    {
	         set_value(pc_state, parseInt(SIMWARE.labels_asm.kmain)) ;
	         show_asmdbg_pc() ;
	    }
	    else if ((typeof curr_segments['.text'] !== "undefined") && (SIMWARE.labels_asm.main))
	    {
	         set_value(pc_state, parseInt(SIMWARE.labels_asm.main)) ;
	         show_asmdbg_pc() ;
	    }

	    if ( (typeof curr_segments['.stack'] !== "undefined") && (typeof sp_state !== "undefined") )
	    {
	         set_value(sp_state, parseInt(curr_segments['.stack'].end) & 0xFFFFFFFC) ;
	    }

            // If not NATIVE code, fire one clock signal to initialize at first microinstruction
	    var new_maddr = get_value(simhw_sim_state('MUXA_MICROADDR')) ;
            var mcelto    = control_memory_get(curr_MC, new_maddr) ;
	    if (typeof mcelto === "undefined")
            {
                mcelto = {
                            value:     simhw_sim_state('REG_MICROINS').default_value,
                            is_native: false
                         } ;
            }
	    var new_mins = get_value(mcelto) ;

	    if (false == mcelto.is_native) {
                compute_general_behavior("CLOCK") ;
	    }

            // User Interface Reset
	    show_dbg_ir(get_value(simhw_sim_state('REG_IR_DECO'))) ;

            for (elto in sim_components)
            {
		 for (var index in sim_components[elto].details_name)
		 {
	              if (typeof sim_components[elto].details_ui[index].reset !== "undefined") {
	                  sim_components[elto].details_ui[index].reset() ;
		      }
		 }
            }

            // return
            return ret ;
        }

        /**
         * Execute the next microinstruction.
         */
        function simcore_execute_microinstruction ( )
        {
	    var ret = simcore_check_if_can_continue() ;
	    if (false === ret.ok) {
		return ret ;
	    }

            // CPU - Hardware
            compute_general_behavior("CLOCK") ;

            // CPU - User Interface
            show_dbg_mpc();

            return ret ;
        }

        function simcore_execute_microinstruction2 ( reg_maddr, reg_pc )
        {
	    var ret = simcore_check_if_can_continue2(reg_maddr, reg_pc) ;
	    if (false === ret.ok) {
		return ret ;
	    }

            // CPU - Hardware
            compute_general_behavior("CLOCK") ;

            // CPU - User Interface
            show_dbg_mpc();

            return ret ;
        }

        /**
         * Execute the next instruction.
         */
        function simcore_execute_microprogram ( options )
        {
	        var ret = simcore_check_if_can_continue() ;
	        if (false === ret.ok) {
		    return ret ;
	        }

                // 1.- do-while the microaddress register doesn't store the fetch address (0):
                //              execute micro-instructions
		//
	        var before_state = null ;
	        var  after_state = null ;
	        var  curr_mpc    = "" ;
                var  curr_MC     = simhw_internalState('MC') ;
                var  maddr_name  = simhw_sim_ctrlStates_get().mpc.state ;
                var  maddr_state = simhw_sim_state(maddr_name) ;

                if (typeof options.before_microinstruction === "undefined") {
		    options.before_microinstruction = simcore_do_nothing_handler ;
		}
                if (typeof options.after_microinstruction  === "undefined") {
		    options.after_microinstruction  = simcore_do_nothing_handler ;
		}

                var i_clks    = 0 ;
                var limitless = (options.cycles_limit < 0) ;
                var cur_addr  = 0 ;
                var mcelto    = null ;
                var oolimits  = false ;

		do
            	{
		    // verbosity before
		    options.before_microinstruction(curr_MC, cur_addr) ;

                    compute_general_behavior("CLOCK") ;
                    i_clks++;

		    // verbosity after
		    options.after_microinstruction(curr_MC, cur_addr) ;

		    // checks
                    if ( (limitless === false) && (i_clks >= options.cycles_limit) )
		    {
		        ret.msg = 'Warning: clock cycles limit reached in a single instruction.' ;
		        ret.ok  = false ;
			break ;
	            }

                    cur_addr = get_value(maddr_state) ;
                    mcelto   = control_memory_get(curr_MC, cur_addr) ;
                    if (typeof mcelto === "undefined")
		    {
		        ret.msg = "Error: undefined microinstruction at " + cur_addr + "." ;
		        ret.ok  = false ;
			break ;
	            }

                    if ((i_clks >= options.cycles_limit) && (-1 != options.cycles_limit)) {
                        oolimits = true ;
                    }
            	}
		while ( (false == oolimits) && (0 != cur_addr) );

		// no_error && native -> perform a second clock-tick...
		if ( (true == ret.ok) && (mcelto.is_native) )
		{
                    compute_general_behavior("CLOCK") ; // ...instruction
                }

                // 2.- to show states
                if (get_cfg('DBG_level') == "microinstruction") {
                    show_dbg_mpc();
                }

		return ret ;
        }

        /**
         * Execute the assembly previously compiled and loaded.
         * @param {integer} options.instruction_limit - Set the limit of instructions to be executed
         * @param {integer} options.cycles_limit      - The limit of clock cycles per instruction
         * @param {string}  options.verbalize         - Textual or mathematical type of description for each signal [text|math]
         */

        function simcore_execute_program ( options )
        {
    	    var ret = {} ;
    	        ret.ok  = true ;
    	        ret.msg = "" ;

            // execute firmware-assembly
            var curr_segments = simhw_internalState('segments') ;
            var pc_name   = simhw_sim_ctrlStates_get().pc.state ;
	    var pc_state  = simhw_sim_state(pc_name) ;

    	    var reg_pc        = get_value(pc_state) ;
    	    var reg_pc_before = get_value(pc_state) - 4 ;

    	    var code_begin  = 0 ;
    	    if ( (typeof curr_segments['.text'] != "undefined") && (typeof curr_segments['.text'].begin != "undefined") )
    	          code_begin = parseInt(curr_segments['.text'].begin) ;
    	    var code_end    = 0 ;
    	    if ( (typeof curr_segments['.text'] != "undefined") && (typeof curr_segments['.text'].end   != "undefined") )
    	          code_end = parseInt(curr_segments['.text'].end) ;

    	    var kcode_begin = 0 ;
    	    if ( (typeof curr_segments['.ktext'] != "undefined") && (typeof curr_segments['.ktext'].begin != "undefined") )
    	          kcode_begin = parseInt(curr_segments['.ktext'].begin) ;
    	    var kcode_end   = 0 ;
    	    if ( (typeof curr_segments['.ktext'] != "undefined") && (typeof curr_segments['.ktext'].end   != "undefined") )
    	          kcode_end = parseInt(curr_segments['.ktext'].end) ;

	    var ret1         = null ;
	    var before_state = null ;
	    var  after_state = null ;
	    var curr_pc      = "" ;
	    var SIMWARE      = get_simware() ;

                if (typeof options.verbalize !== "undefined") {
		    set_cfg('verbal_verbose', options.verbalize) ;
		}

                if (typeof options.before_instruction === "undefined") {
		    options.before_instruction = simcore_do_nothing_handler ;
		}
                if (typeof options.after_instruction  === "undefined") {
		    options.after_instruction  = simcore_do_nothing_handler ;
		}

    	    var ins_executed = 0 ;
    	    while (
                     ((reg_pc <  code_end) && (reg_pc >=  code_begin)) ||
                     ((reg_pc < kcode_end) && (reg_pc >= kcode_begin))
                  )
    	    {
		   // verbosity before
		   options.before_instruction(SIMWARE, reg_pc) ;

		   // execute instruction...
    	           ret1 = simcore_execute_microprogram(options) ;
                   if (false === ret1.ok) {
    		       return ret1 ;
    	           }

		   // verbosity after
		   options.after_instruction(SIMWARE, reg_pc) ;

		   // next instruction...
    	           ins_executed++ ;
                   if ( (ins_executed > options.instruction_limit) && (-1 != options.instruction_limit))
    	           {
    	               ret.ok  = false ;
    	               ret.msg = "more than " + options.instruction_limit + " instructions executed before application ends.";
    		       return ret ;
    	           }

    	           reg_pc_before = reg_pc ;
    	           reg_pc = get_value(pc_state) ;
    	    }

            return ret ;
        }

        /**
         * Do nothing function (used as default event handler).
         */

        function simcore_do_nothing_handler ( )
        {
	    return null ;
        }


        /* 5) Compile */

        /**
         * Compile Firmware.
         * @param {string} textToMCompile - The firmware to be compile and loaded into memory
         */
        function simcore_compile_firmware ( textToMCompile )
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
    	    simcore_reset() ;
            return ret ;
        }

        /**
         * Compile Assembly.
         * @param {string} textToCompile - The assembly to be compile and loaded into memory
         */
        function simcore_compile_assembly ( textToCompile )
        {
    	    var ret = {} ;
    	        ret.msg = "" ;
    	        ret.ok  = true ;

            // get SIMWARE.firmware
            var SIMWARE = get_simware() ;
    	    if (SIMWARE.firmware.length === 0)
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
    	    simcore_reset() ;

            return ret ;
        }


        /* 6) Hardware */

        /**
         * Export Hardware to JSON string
         * @param {string} hw_name - The name of the Hardware (e.g. 'ep')
         */

        function simcore_hardware_export ( hw_name )
        {
	    var ret = {} ;
	        ret.msg = "{}" ;
	        ret.ok  = false ;

            var hw_obj = simhw_getObjByName(hw_name) ;
            if (null === hw_obj) {
		return ret ;
            }

            // export to json
            // based on: https://stackoverflow.com/questions/36517173/how-to-store-a-javascript-function-in-json
	    ret.ok  = true ;
	    ret.msg = JSON.stringify(hw_obj,
                                     function(key, value) {
					  if (typeof value === "function") {
					      return "/Function(" + value.toString() + ")/" ;
					  }
					  return value ;
                                     }) ;

            return ret ;
        }

        /**
         * Import Hardware from JSON string
         * @param {string} hw_json - The JSON string with the Hardware description
         */

        function simcore_hardware_import ( hw_json )
        {
	    var ret = {} ;
	        ret.msg = "" ;
	        ret.ok  = true ;

            // import json
            // based on: https://stackoverflow.com/questions/36517173/how-to-store-a-javascript-function-in-json
	    hw_obj = JSON.parse( hw_json,
				 function(key, value) {
					  if (typeof value === "string" &&
					      value.startsWith("/Function(") &&
					      value.endsWith(")/"))
                                          {
					     value = value.substring(10, value.length - 2) ;
					     return eval("(" + value + ")") ;
					  }
					  return value ;
				 }) ;
	    simhw_add(hw_obj) ;

            return ret ;
        }

