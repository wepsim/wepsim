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
         *  Simulated Hardware: add & active
         */

        var sim = {
		    systems: [],
		    active:  null,
		    index:   0
	          } ;

        function simhw_add ( newElto )
        {
            sim.systems.push(newElto) ;
            sim.active = newElto ;
            sim.index  = sim.systems.length - 1 ;
        }

        function simhw_getActive ( )
        {
            return sim.index ;
        }

        function simhw_setActive ( newActive )
        {
	    if (sim.systems.length >= newActive) 
	    {
                sim.active = sim.systems[newActive] ;
                sim.index  = newActive ;
	    }
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

        // getInternalState

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
            return sim.active.internal_states[name][id] = val ;
        }

        function simhw_internalState_koReset ( name, val )
        {
            ep_internal_states[name] = ko_observable(val) ;
            return sim.active.internal_states[name] = ep_internal_states[name] ;
        }

        function simhw_internalState_reset ( name )
        {
            ep_internal_states[name] = new Object() ;
            return sim.active.internal_states[name] = ep_internal_states[name] ;
        }

