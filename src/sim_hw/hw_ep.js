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


     import { board_base_register }       from "./hw_items/board_base.js";
     import { cpu_ep_register }           from "./hw_items/cpu_ep.js";
     import { mem_ep_register }           from "./hw_items/mem_ep.js";
     import { io_screen_base_register }   from "./hw_items/io_screen_base.js";
     import { io_keyboard_base_register } from "./hw_items/io_keyboard_base.js";
     import { io_clk_base_register }      from "./hw_items/io_clk_base.js";
     import { io_l3d_base_register }      from "./hw_items/io_l3d_base.js";
     import { io_ldm_base_register }      from "./hw_items/io_ldm_base.js";
     import { io_sound_base_register }    from "./hw_items/io_sound_base.js";
     import { simhw_add }                 from "./sim_hw_index.js";


        /*
         *  Elemental Processor
         */

        export var ep_def = {
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

            // registering elements
                  board_base_register ( ep_def ) ;
                      cpu_ep_register ( ep_def ) ;
                      mem_ep_register ( ep_def ) ;
              io_screen_base_register ( ep_def ) ;
            io_keyboard_base_register ( ep_def ) ;
                 io_clk_base_register ( ep_def ) ;
                 io_l3d_base_register ( ep_def ) ;
                 io_ldm_base_register ( ep_def ) ;
               io_sound_base_register ( ep_def ) ;

            simhw_add(ep_def) ;

