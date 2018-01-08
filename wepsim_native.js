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
     * Native microcode support
     */

    function wepsim_show_webmips ( )
    {
	$("#tab26").hide() ;
	$("#tab21").hide() ;
	$("#tab24").click() ;
    }

    function wepsim_hide_webmips ( )
    {
	$("#tab26").show() ;
	$("#tab21").show() ;
    }

    function wepsim_native_get_signal ( elto )
    {
        return (get_value(sim_signals[elto]) >>> 0) ;
    }

    function wepsim_native_set_signal ( elto, value )
    {
        set_value(sim_signals[elto], value) ;
	compute_behavior("FIRE " + elto) ;
	return value ;
    }

    function wepsim_native_get_value ( component, elto )
    {
        var index = 0 ;

        if ( ("CPU" == component) || ("BR" == component) )
        {
            if (Number.isInteger(elto))
                 index = elto ;
            else index = parseInt(elto) ;

            if (isNaN(index))
                return (get_value(sim_states[elto]) >>> 0) ;

            return (get_value(sim_states.BR[index]) >>> 0) ;
        }

        if ("MEMORY" == component)
        {
            return ((MP[elto]) >>> 0) ;
        }

        if ("DEVICE" == component)
        {
            var associated_state = io_hash[elto] ;
            var value = (get_value(sim_states[associated_state]) >>> 0) ;

            set_value(sim_states.BUS_AB, elto) ;
            set_value(sim_signals.IOR, 1) ;
            compute_behavior("FIRE IOR") ;
            value = get_value(sim_states.BUS_DB) ;

            return value ;
        }

        if ("SCREEN" == component)
        {
            var screen = get_screen_content() ;
            return screen ;
        }

        return false ;
    }

    function wepsim_native_set_value ( component, elto, value )
    {
        var index = 0 ;

        if ( ("CPU" == component) || ("BR" == component) )
        {
            if (Number.isInteger(elto))
                 index = elto ;
            else index = parseInt(elto) ;

            if (isNaN(index)) 
            {
                set_value(sim_states[elto], value) ;
                if ("REG_PC" == elto) {
                    show_asmdbg_pc() ;
		}

                return value ;
            }

            return set_value(sim_states.BR[index], value) ;
        }

        if ("MEMORY" == component)
        {
            MP[elto] = value ;
            return value ;
        }

        if ("DEVICE" == component)
        {
            var associated_state = io_hash[elto] ;
            set_value(sim_states[associated_state], value) ;

            set_value(sim_states.BUS_AB, elto) ;
            set_value(sim_states.BUS_DB, value) ;
            set_value(sim_signals.IOW, 1) ;
            compute_behavior("FIRE IOW") ;

            return value ;
        }

        if ("SCREEN" == component)
        {
            set_screen_content(value) ;
            return value ;
        }

        return false ;
    }

    function wepsim_native_get_fields ( signature_raw )
    {
        var SIMWARE = get_simware() ;

        for (var key in SIMWARE.firmware) {
             if (SIMWARE.firmware[key].signatureRaw == signature_raw) {
                 return SIMWARE.firmware[key].fields ;
             }
        }
    }

    function wepsim_native_get_field_from_ir ( fields, index )
    {
        if (typeof fields[index] == "undefined")
            return false ;

        var value = get_value(sim_states.REG_IR) ;
        var left_shift  = (31 - parseInt(fields[index].startbit)) ;
        var right_shift =       parseInt(fields[index].stopbit) ;

        value = value <<  left_shift ;
        value = value >>> left_shift ;
        value = value >>> right_shift ;

        return value ;
    }

    function wepsim_native_deco ( )
    {
        compute_behavior('DECO') ;
    }

    function wepsim_native_go_maddr ( maddr )
    {
        set_value(sim_states.MUXA_MICROADDR, maddr) ;
    }

    function wepsim_native_go_opcode ( )
    {
	var maddr = get_value(sim_states.ROM_MUXA) ;
        set_value(sim_states.MUXA_MICROADDR, maddr) ;
    }

    function wepsim_native_go_instruction ( signature_raw )
    {
        var SIMWARE = get_simware() ;

        for (var key in SIMWARE.firmware) 
        {
             if (SIMWARE.firmware[key].signatureRaw == signature_raw) 
             {
                 var maddr = SIMWARE.firmware[key]["mc-start"] ;
                 set_value(sim_states.MUXA_MICROADDR, maddr) ;
                 return ;
             }
        }
    }

