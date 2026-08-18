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


     import { get_value,
              set_value }               from "../sim_core/sim_core_values.js";
     import { ws_alert }                from "../sim_core/sim_core_ui.js";


        /*
         * API
         */

        export function hw_states_save ( snapshot, sim_states )
        {
	     if (typeof snapshot.states == "undefined") {
                 snapshot.states = {} ;
	     }

             for (var key in sim_states)
             {
                  if (Array.isArray(sim_states[key]))
                  {
                      snapshot.states[key] = {} ;
                      for (var key2 in sim_states[key]) {
                           snapshot.states[key][key2] = get_value(sim_states[key][key2]);
                      }
                  }

                  snapshot.states[key] = get_value(sim_states[key]);
             }

             return true ;
        }

        export function hw_states_load ( snapshot, sim_states )
        {
	     if ( (typeof snapshot        == "undefined") ||
	          (typeof snapshot.states == "undefined") )
             {
                 return false ;
	     }

             for (var key in snapshot.states)
             {
                  if (Array.isArray(snapshot.states[key]))
                  {
                      for (var key2 in sim_states[key]) {
                           set_value(sim_states[key][key2], snapshot.states[key][key2]) ;
                      }
                  }

                  set_value(sim_states[key], snapshot.states[key]) ;
             }

             return true ;
        }

