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
         *  Proof-Of-Concept: Public
         */

        var poc_def = {
                       sim_name:            "Proof-Of-Concept Processor",
                       sim_short_name:      "poc",
                       sim_img_processor:   "sim_hw/sim_hw_ep/cpu6.svg",
                       sim_img_controlunit: "sim_hw/sim_hw_ep/controlunit6.svg",
                       sim_img_cpu:         "sim_hw/sim_hw_ep/cpu6.svg",

                       components:          ep_components,
                       states:              ep_states,
                       signals:             ep_signals,
                       behaviors:           ep_behaviors,
                       events:              ep_events,
                       internal_states:     ep_internal_states
	             } ;

        simhw_add(poc_def) ;

