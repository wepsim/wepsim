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
         *  Elemental Processor: Internal
         */

        /* Abstraction */
        var ep_components = {} ;
        var ep_states = {} ;
        var ep_events = {} ;
        var ep_signals = {} ;
        var ep_behaviors = {} ;

        /* Local support */
        var io_hash    = {} ;
        var fire_stack  = [] ;


        /*
         *  Elemental Processor: Public
         */

        var ep_def = {
                       sim_name:            "Elemental Processor",
                       sim_img_processor:   "sim_hw/sim_hw_ep/processor6.svg",
                       sim_img_controlunit: "sim_hw/sim_hw_ep/controlunit6.svg",
                       sim_img_cpu:         "sim_hw/sim_hw_ep/cpu6.svg",
                       components:          ep_components,
                       states:              ep_states,
                       signals:             ep_signals,
                       behaviors:           ep_behaviors,
                       events:              ep_events
	             } ;

