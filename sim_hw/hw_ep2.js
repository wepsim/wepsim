/*      
 *  Copyright 2015-2026 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Elemental Processor
         */

        var ep2_def = {
                       sim_name:            "Elemental Processor 2",
                       sim_short_name:      "ep2",
                       sim_img_processor:   "repo/hardware/ep2/images/processor.svg",
                       sim_img_controlunit: "repo/hardware/ep2/images/controlunit.svg",
                       sim_img_cpu:         "repo/hardware/ep2/images/cpu.svg",

                       components:          {},
                       states:              {},
                       signals:             {},
                       behaviors:           {},
                       elements:            {},

                       internal_states:     {},
                       ctrl_states:         {},
                       events:              {}
	             } ;

            // registering elements
                  board_base_register ( ep2_def ) ;
                      cpu_ep2_register ( ep2_def ) ;
                      mem_ep2_register ( ep2_def ) ;
              io_screen_base_register ( ep2_def ) ;
            io_keyboard_base_register ( ep2_def ) ;
                 io_clk_base_register ( ep2_def ) ;
                 io_l3d_base_register ( ep2_def ) ;
                 io_ldm_base_register ( ep2_def ) ;
               io_sound_base_register ( ep2_def ) ;

            simhw_add(ep2_def) ;

