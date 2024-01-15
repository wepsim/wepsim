/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

    function simcore_native_get_signal ( elto )
    {
        return (get_value(simhw_sim_signal(elto)) >>> 0) ;
    }

    function simcore_native_set_signal ( elto, value )
    {
        set_value(simhw_sim_signal(elto), value) ;
	compute_behavior("FIRE " + elto) ;
	return value ;
    }

    function simcore_native_get_value ( component, elto )
    {
        var index = 0 ;

        var sim_components = simhw_sim_components() ;
	var compo_index = component ;

        if ("BR" === component)
	    compo_index = "CPU" ;
        if ("DEVICE" === component)
	    compo_index = "IO" ;

        if (typeof sim_components[compo_index].get_value !== "undefined") {
            return sim_components[compo_index].get_value(elto) ;
        }

        return false ;
    }

    function simcore_native_set_value ( component, elto, value )
    {
        var index = 0 ;

        var sim_components = simhw_sim_components() ;
	var compo_index = component ;

        if ("BR" === component)
	    compo_index = "CPU" ;
        if ("DEVICE" === component)
	    compo_index = "IO" ;

        if (typeof sim_components[compo_index].set_value !== "undefined") {
            return sim_components[compo_index].set_value(elto, value) ;
        }

        return false ;
    }

    function simcore_native_get_fields ( signature_raw )
    {
        var SIMWARE = get_simware() ;

        for (var key in SIMWARE.firmware) {
             if (SIMWARE.firmware[key].signatureRaw === signature_raw) {
                 return SIMWARE.firmware[key].fields ;
             }
        }
    }

    function simcore_native_get_field_from_ir ( fields, index )
    {
        if (typeof fields[index] === "undefined") {
            ws_alert('simcore_native_get_field_from_ir: index (' + index + ') out of range.') ;
            return false ;
        }

        var value = get_value(simhw_sim_state('REG_IR')) ;
        var left_shift  = (31 - parseInt(fields[index].startbit)) ;
        var right_shift =       parseInt(fields[index].stopbit) ;

        value = value <<  left_shift ;
        value = value >>> left_shift ;
        value = value >>> right_shift ;

        return value ;
    }

    function simcore_native_deco ( )
    {
        compute_behavior('DECO') ;
    }

    function simcore_native_go_maddr ( maddr )
    {
        set_value(simhw_sim_state('MUXA_MICROADDR'), maddr) ;
    }

    function simcore_native_go_opcode ( )
    {
	var maddr = get_value(simhw_sim_state('ROM_MUXA')) ;
        set_value(simhw_sim_state('MUXA_MICROADDR'), maddr) ;
    }

    function simcore_native_go_instruction ( signature_raw )
    {
        var SIMWARE = get_simware() ;

        for (var key in SIMWARE.firmware)
        {
             if (SIMWARE.firmware[key].signatureRaw === signature_raw)
             {
                 var maddr = SIMWARE.firmware[key]["mc-start"] ;
                 set_value(simhw_sim_state('MUXA_MICROADDR'), maddr) ;
                 return ;
             }
        }
    }

