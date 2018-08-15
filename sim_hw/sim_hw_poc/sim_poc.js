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
        var poc_components      = {} ;
        var poc_states          = {} ;
        var poc_events          = {} ;
        var poc_signals         = {} ;
        var poc_behaviors       = {} ;
        var poc_internal_states = {} ;
        var poc_ir              = {} ;


        /*
         *  Proof-Of-Concept: Public
         */

        var poc_def = {
                       sim_name:            "Proof-Of-Concept Processor",
                       sim_short_name:      "poc",
                       sim_img_processor:   "sim_hw/sim_hw_poc/processor2.svg",
                       sim_img_controlunit: "sim_hw/sim_hw_poc/controlunit2.svg",
                       sim_img_cpu:         "sim_hw/sim_hw_poc/cpu2.svg",

                       components:          poc_components,
                       states:              poc_states,
                       signals:             poc_signals,
                       behaviors:           poc_behaviors,
                       events:              poc_events,

                       internal_states:     poc_internal_states,
                       ir_info:             poc_ir
	             } ;

        simhw_add(poc_def) ;


        /*
         *  Elemental Processor: Private
         */

        // update ALU flags: test_n, test_z, test_v, test_c
        function poc_update_nzvc ( flag_n, flag_z, flag_v, flag_c )
        {
	   set_value(simhw_sim_state("FLAG_N"), flag_n) ;
	   set_value(simhw_sim_state("FLAG_Z"), flag_z) ;
	   set_value(simhw_sim_state("FLAG_V"), flag_v) ;
	   set_value(simhw_sim_state("FLAG_C"), flag_c) ;

	   set_value(simhw_sim_signal("TEST_N"), flag_n) ;
	   set_value(simhw_sim_signal("TEST_Z"), flag_z) ;
	   set_value(simhw_sim_signal("TEST_V"), flag_v) ;
	   set_value(simhw_sim_signal("TEST_C"), flag_c) ;
        }

