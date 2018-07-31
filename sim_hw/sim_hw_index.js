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

        // MC

        function simhw_MC ( )
        {
            return sim.active.MC ;
        }

        function simhw_MC_get ( id )
        {
            return sim.active.MC[id] ;
        }

        function simhw_MC_set ( id, val )
        {
            return sim.active.MC[id] = val ;
        }

        function simhw_MC_reset ( )
        {
            ep_MC = new Object() ;
            return sim.active.MC = ep_MC ;
        }

        // MC_dashboard

        function simhw_MC_dashboard ( )
        {
            return sim.active.MC_dashboard ;
        }

        function simhw_MC_dashboard_get ( id )
        {
            return sim.active.MC_dashboard[id] ;
        }

        function simhw_MC_dashboard_set ( id, val )
        {
            return sim.active.MC_dashboard[id] = val ;
        }

        function simhw_MC_dashboard_reset ( )
        {
            ep_MC_dashboard = new Object() ;
            return sim.active.MC_dashboard = ep_MC_dashboard ;
        }

        // ROM

        function simhw_ROM ( )
        {
            return sim.active.ROM ;
        }

        function simhw_ROM_get ( id )
        {
            return sim.active.ROM[id] ;
        }

        function simhw_ROM_set ( id, val )
        {
            return sim.active.ROM[id] = val ;
        }

        function simhw_ROM_reset ( )
        {
            ep_ROM = new Object() ;
            return sim.active.ROM = ep_ROM ;
        }

        // FIRMWARE

        function simhw_FIRMWARE ( )
        {
            return sim.active.FIRMWARE ;
        }

        function simhw_FIRMWARE_get ( id )
        {
            return sim.active.FIRMWARE[id] ;
        }

        function simhw_FIRMWARE_set ( id, val )
        {
            return sim.active.FIRMWARE[id] = val ;
        }

        function simhw_FIRMWARE_reset ( )
        {
            ep_FIRMWARE = new Object() ;
            return sim.active.FIRMWARE = ep_FIRMWARE ;
        }

