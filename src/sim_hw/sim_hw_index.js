/*
 *  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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


     import { get_cfg }                 from "../sim_core/sim_cfg.js";
     import { compute_references }      from "./sim_hw_values.js";
     import { firedep_to_fireorder,
              jit_fire_dep }            from "./sim_hw_signal.js";
     import { check_behavior,
              compile_behaviors,
              compile_verbals }         from "./sim_hw_behavior.js";
     import { wepsim_url_getJSON }      from "../wepsim_core/wepsim_url.js";
     import { simcore_hardware_import } from "../sim_core/sim_api_core.js";


        /*
         *  Simulated Hardware: add & active
         */

        export var sim = {
		     systems: [],
		     active:  null,
		     index:   0,
	          } ;


        export function simhw_add ( newElto )
        {
            // 1.- add a new element
            var found = -1 ;
            for (var m=0; m<sim.systems.length; m++)
            {
                 if (sim.systems[m].sim_short_name == newElto.sim_short_name) {
                     sim.systems[m] = newElto ;
                     sim.index = m ;
                     found = m ;
                 }
            }

            if (-1 == found) {
                sim.systems.push(newElto) ;
                sim.index = sim.systems.length - 1 ;
            }

            // 2.- add a new element
            sim.active = newElto ;
            sim[newElto.sim_short_name] = newElto ;

            // 3.- check if default behaviors are ok
            check_behavior();

            // 4.- pre-compile
            compile_behaviors() ;
            firedep_to_fireorder(jit_fire_dep) ;
            compute_references() ;
            compile_verbals() ;
        }

        export function simhw_getActive ( )
        {
            return sim.index ;
        }

        export function simhw_setActive ( newActive )
        {
	    if ( (newActive >= 0) &&
                 (sim.systems.length >= newActive) )
	    {
                sim.active = sim.systems[newActive] ;
                sim.index  = newActive ;
	    }

            // pre-compile behaviors & references
            compile_behaviors() ;
            firedep_to_fireorder(jit_fire_dep) ;
            compute_references() ;
            compile_verbals() ;
        }

        export function simhw_getIdByName ( short_name )
        {
            for (var m=0; m<sim.systems.length; m++)
            {
                 if (sim.systems[m].sim_short_name == short_name) {
                     return m ;
                 }
            }

            return -1 ;
        }

        export function simhw_getObjByName ( short_name )
        {
            for (var m=0; m<sim.systems.length; m++)
            {
                 if (sim.systems[m].sim_short_name == short_name) {
                     return sim.systems[m] ;
                 }
            }

            return null ;
        }


        /*
         *  Simulated Hardware: getter/setter
         */

        export function simhw_active ( )
        {
            return sim.active ;
        }

        // name

        export function simhw_short_name ( )
        {
            return sim.active.sim_short_name ;
        }

        // properties

        function simhw_properties ( )
        {
            return sim.active.sim_properties ;
        }

        // sim_signals

        export function simhw_sim_signals ( )
        {
            return sim.active.signals ;
        }

        export function simhw_sim_signal ( id )
        {
            return sim.active.signals[id] ;
        }

        // sim_states

        export function simhw_sim_states ( )
        {
            return sim.active.states ;
        }

        export function simhw_sim_state ( id )
        {
            return sim.active.states[id] ;
        }

        export function simhw_sim_state_getref ( id )
        {
            var parts = id.split(".") ;
            var s_ref = null ;

            if (parts[0] != 'BR') {
                return simhw_sim_state(id) ;
            }

            if (parts.length > 2)
                 s_ref = simhw_sim_states().BR[parts[1]][parts[2]] ;
            else s_ref = simhw_sim_states().BR[parts[1]] ;

            return s_ref ;
        }

        // syntax_behaviours

        export function simhw_syntax_behaviors ( )
        {
            return sim.active.behaviors ;
        }

        export function simhw_syntax_behavior ( id )
        {
            return sim.active.behaviors[id] ;
        }

        // sim_components

        export function simhw_sim_components ( )
        {
            return sim.active.components ;
        }

        export function simhw_sim_component ( id )
        {
            return sim.active.components[id] ;
        }

        // InternalState

        export function simhw_internalState ( name )
        {
            return sim.active.internal_states[name] ;
        }

        export function simhw_internalState_get ( name, id )
        {
            return sim.active.internal_states[name][id] ;
        }

        export function simhw_internalState_set ( name, id, val )
        {
            sim.active.internal_states[name][id] = val ;
        }

        export function simhw_internalState_reset ( name, val )
        {
            sim.active.internal_states[name] = val ;
        }

        // ctrl_states

        export function simhw_sim_ctrlStates_get ( )
        {
            return sim.active.ctrl_states ;
        }


    /*
     *  Simulated Hardware: available set
     */

    export var ws_hw_hash = {} ;
    export var ws_hw_set  = [] ;

    export function simhw_hwset_init ( )
    {
         var url_list = get_cfg('hw_url') ;

         // try to load the index
         ws_hw_set = wepsim_url_getJSON(url_list) ;

         // build reference hash
         for (var i=0; i<ws_hw_set.length; i++) {
              ws_hw_hash[ws_hw_set[i].name] = ws_hw_set[i].url ;
         }

         return ws_hw_hash ;
    }

    export function simhw_hwset_getSet ( )
    {
         return ws_hw_hash ;
    }

    export function simhw_hwset_loadAll ( )
    {
         var jobj = {} ;

         // try to load each one
         for (var i=0; i<ws_hw_set.length; i++)
         {
	      jobj = $.getJSON({'url': ws_hw_set[i].url, 'async': false}) ;
              simcore_hardware_import(jobj.responseText) ;
         }

         return true ;
    }

    export function simhw_hwset_load ( p_name )
    {
         if (typeof ws_hw_hash[p_name] === "undefined") {
             return false ;
         }

         // try to load the requested one
	 var jobj = $.getJSON({'url': ws_hw_hash[p_name], 'async': false}) ;
	 simcore_hardware_import(jobj.responseText) ;

         return true ;
    }

