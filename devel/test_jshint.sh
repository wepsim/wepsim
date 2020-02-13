#!/bin/bash
set -x


#*
#*  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
#*
#*  This file is part of WepSIM.
#*
#*  WepSIM is free software: you can redistribute it and/or modify
#*  it under the terms of the GNU Lesser General Public License as published by
#*  the Free Software Foundation, either version 3 of the License, or
#*  (at your option) any later version.
#*
#*  WepSIM is distributed in the hope that it will be useful,
#*  but WITHOUT ANY WARRANTY; without even the implied warranty of
#*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#*  GNU Lesser General Public License for more details.
#*
#*  You should have received a copy of the GNU Lesser General Public License
#*  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
#*


 jshint ./sim_core/sim_core_ui.js
 jshint ./sim_core/sim_core_voice.js
 jshint ./sim_core/sim_api_stateshots.js
 jshint ./sim_core/sim_api_native.js
#jshint ./sim_core/sim_api_core.js
 jshint ./sim_core/sim_core_notify.js
 jshint ./sim_core/sim_cfg.js
#jshint ./sim_core/sim_core_record.js
#jshint ./sim_core/sim_core_ctrl.js
 jshint ./sim_core/sim_core_rest.js

 jshint ./sim_sw/sim_lang.js
#jshint ./sim_sw/sim_lang_firm.js
#jshint ./sim_sw/sim_lang_asm.js
 jshint ./sim_sw/sim_lang_cis2native.js

 jshint ./sim_hw/sim_hw_index.js
 jshint ./sim_hw/sim_hw_values.js
#jshint ./sim_hw/sim_hw_behavior.js
 jshint ./sim_hw/sim_hw_poc/sim_poc.js
 jshint ./sim_hw/sim_hw_poc/sim_hw_mem.js
 jshint ./sim_hw/sim_hw_poc/sim_hw_board.js
 jshint ./sim_hw/sim_hw_poc/sim_hw_kbd.js
 jshint ./sim_hw/sim_hw_poc/sim_hw_scr.js
 jshint ./sim_hw/sim_hw_poc/sim_hw_io.js
#jshint ./sim_hw/sim_hw_poc/sim_hw_cpu.js
 jshint ./sim_hw/sim_hw_ep/sim_hw_mem.js
 jshint ./sim_hw/sim_hw_ep/sim_ep.js
 jshint ./sim_hw/sim_hw_ep/sim_hw_io.js
 jshint ./sim_hw/sim_hw_ep/sim_hw_board.js
 jshint ./sim_hw/sim_hw_ep/sim_hw_kbd.js
 jshint ./sim_hw/sim_hw_ep/sim_hw_scr.js
#jshint ./sim_hw/sim_hw_ep/sim_hw_cpu.js

 jshint ./wepsim_core/wepsim_help_commands.js
 jshint ./wepsim_core/wepsim_tutorial.js
 jshint ./wepsim_core/wepsim_tour.js
 jshint ./wepsim_core/wepsim_preload.js
 jshint ./wepsim_core/wepsim_share.js
 jshint ./wepsim_core/wepsim_voice.js
 jshint ./wepsim_core/wepsim_execute.js
 jshint ./wepsim_core/wepsim_dbg_breakpointicons.js
 jshint ./wepsim_core/wepsim_tour_commands.js
 jshint ./wepsim_core/wepsim_mode.js
 jshint ./wepsim_core/wepsim_help.js
 jshint ./wepsim_core/wepsim_example_commands-ep_mips.js
 jshint ./wepsim_core/wepsim_state.js
 jshint ./wepsim_core/wepsim_tutorial_simpleusage.js
 jshint ./wepsim_core/wepsim_config.js
#jshint ./wepsim_core/wepsim_clipboard.js
 jshint ./wepsim_core/wepsim_config_commands.js
 jshint ./wepsim_core/wepsim_example_commands-poc_mips.js
 jshint ./wepsim_core/wepsim_tutorial_welcome.js
 jshint ./wepsim_core/wepsim_example_commands.js
 jshint ./wepsim_core/wepsim_notify.js
 jshint ./wepsim_core/wepsim_example_commands-ep_rv32.js
 jshint ./wepsim_core/wepsim_example.js
 jshint ./wepsim_core/wepsim_checkpoint.js
 jshint ./wepsim_core/wepsim_example_commands-ep_z80.js
 jshint ./wepsim_core/wepsim_signal.js
 jshint ./wepsim_core/wepsim_url.js
#jshint ./wepsim_core/wepsim_voice_commands.js
 jshint ./wepsim_core/wepsim_ui_hw.js
 jshint ./wepsim_core/wepsim_ui_registers.js
 jshint ./wepsim_core/wepsim_webui_cpu.js
 jshint ./wepsim_core/wepsim_webui_mem.js
 jshint ./wepsim_core/wepsim_webui_mem_config.js
 jshint ./wepsim_core/wepsim_webui_console.js
 jshint ./wepsim_core/wepsim_webui_io_info.js
 jshint ./wepsim_core/wepsim_webui_io_config.js
 jshint ./wepsim_core/wepsim_webui_l3d.js
 jshint ./wepsim_core/wepsim_webui_authors.js
 jshint ./wepsim_core/wepsim_webui_dbg_mc.js
 jshint ./wepsim_core/wepsim_webui_dbg_asm.js
 jshint ./wepsim_core/wepsim_webui_cpusvg.js

 jshint ./wepsim/web/wepsim_web_api.js
#jshint ./wepsim/web/wepsim_web_pwa.js
 jshint ./wepsim/web/wepsim_web_simulator.js
 jshint ./wepsim/web/wepsim_web_editor.js
 jshint ./wepsim/nodejs/wepsim_node_action.js
 jshint ./wepsim/nodejs/wepsim_node_core.js

 jshint ./wepsim_i18n/i18n.js
for LANG in es en fr kr ja it pt hi zh_cn ru sv de; do
 jshint ./wepsim_i18n/$LANG/states.js
 jshint ./wepsim_i18n/$LANG/gui.js
 jshint ./wepsim_i18n/$LANG/cfg.js
 jshint ./wepsim_i18n/$LANG/examples.js
 jshint ./wepsim_i18n/$LANG/help.js
 jshint ./wepsim_i18n/$LANG/dialogs.js
 jshint ./wepsim_i18n/$LANG/tour-intro.js
 jshint ./wepsim_i18n/$LANG/tutorial-welcome.js
 jshint ./wepsim_i18n/$LANG/tutorial-simpleusage.js
done

