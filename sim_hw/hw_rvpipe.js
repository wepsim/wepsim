"use strict";
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
/*
 *  RISC-V Processor with Pipeline
 */
var rvpipe_def = {
    sim_name: "RISC-V Processor with Pipeline",
    sim_short_name: "rvpipe",
    sim_img_processor: "repo/hardware/rvpipe/images/processor.svg",
    sim_img_controlunit: "repo/hardware/rvpipe/images/controlunit.svg",
    sim_img_cpu: "repo/hardware/rvpipe/images/cpu.svg",
    components: {},
    states: { BR: [] },
    signals: {},
    behaviors: {},
    elements: {},
    internal_states: {},
    ctrl_states: {},
    events: {}
};
// registering elements
board_base_register(rvpipe_def);
cpu_rvpipe_register(rvpipe_def);
mem_rvpipe_register(rvpipe_def);
io_screen_rvpipe_register(rvpipe_def);
io_keyboard_rvpipe_register(rvpipe_def);
io_clk_rvpipe_register(rvpipe_def);
// io_l3d_base_register(rvpipe_def);
// io_ldm_base_register(rvpipe_def);
// io_sound_base_register(rvpipe_def);
simhw_add(rvpipe_def);
