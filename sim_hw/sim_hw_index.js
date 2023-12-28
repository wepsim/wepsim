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
         *  Simulated Hardware: add & active
         */

        var sim = {
		    systems: [],
		    active:  null,
		    index:   0,
	          } ;


        function simhw_add ( newElto )
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

        function simhw_getActive ( )
        {
            return sim.index ;
        }

        function simhw_setActive ( newActive )
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

        function simhw_getIdByName ( short_name )
        {
            for (var m=0; m<sim.systems.length; m++)
            {
                 if (sim.systems[m].sim_short_name == short_name) {
                     return m ;
                 }
            }

            return -1 ;
        }

        function simhw_getObjByName ( short_name )
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

        function simhw_active ( )
        {
            return sim.active ;
        }

        // name

        function simhw_short_name ( )
        {
            return sim.active.sim_short_name ;
        }

        // sim_signals

        function simhw_sim_signals ( )
        {
            return sim.active.signals ;
        }

        function simhw_sim_signal ( id )
        {
            return sim.active.signals[id] ;
        }

        // sim_states

        function simhw_sim_states ( )
        {
            return sim.active.states ;
        }

        function simhw_sim_state ( id )
        {
            return sim.active.states[id] ;
        }

        // syntax_behaviours

        function simhw_syntax_behaviors ( )
        {
            return sim.active.behaviors ;
        }

        function simhw_syntax_behavior ( id )
        {
            return sim.active.behaviors[id] ;
        }

        // sim_components

        function simhw_sim_components ( )
        {
            return sim.active.components ;
        }

        function simhw_sim_component ( id )
        {
            return sim.active.components[id] ;
        }

        // InternalState

        function simhw_internalState ( name )
        {
            return sim.active.internal_states[name] ;
        }

        function simhw_internalState_get ( name, id )
        {
            return sim.active.internal_states[name][id] ;
        }

        function simhw_internalState_set ( name, id, val )
        {
            sim.active.internal_states[name][id] = val ;
        }

        function simhw_internalState_reset ( name, val )
        {
            sim.active.internal_states[name] = val ;
        }

        // ctrl_states

        function simhw_sim_ctrlStates_get ( )
        {
            return sim.active.ctrl_states ;
        }


    /*
     *  Simulated Hardware: available set
     */

    var ws_hw_hash = {} ;
    var ws_hw_set  = [] ;

    function simhw_hwset_init ( )
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

    function simhw_hwset_getSet ( )
    {
         return ws_hw_hash ;
    }

    function simhw_hwset_loadAll ( )
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

    function simhw_hwset_load ( p_name )
    {
         if (typeof ws_hw_hash[p_name] === "undefined") {
             return false ;
         }

         // try to load the requested one
	 var jobj = $.getJSON({'url': ws_hw_hash[p_name], 'async': false}) ;
	 simcore_hardware_import(jobj.responseText) ;

         return true ;
    }

