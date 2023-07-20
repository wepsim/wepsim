/*      
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

        var ep_def = {
                       sim_name:            "Elemental Processor",
                       sim_short_name:      "ep",
                       sim_img_processor:   "repo/hardware/ep/images/processor.svg",
                       sim_img_controlunit: "repo/hardware/ep/images/controlunit.svg",
                       sim_img_cpu:         "repo/hardware/ep/images/cpu.svg",

                       components:          {},
                       states:              {},
                       signals:             {},
                       behaviors:           {},
                       elements:            {},

                       internal_states:     {},
                       ctrl_states:         {},
                       events:              {}
	             } ;

            simhw_add(ep_def) ;

