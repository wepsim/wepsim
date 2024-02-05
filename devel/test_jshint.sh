#!/bin/bash
set -x


#*
#*  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


echo "checking sim_core..."
#jshint ./sim_core/sim_core_ui.js
 jshint ./sim_core/sim_core_voice.js
 jshint ./sim_core/sim_api_stateshots.js
 jshint ./sim_core/sim_api_native.js
#jshint ./sim_core/sim_api_core.js
 jshint ./sim_core/sim_core_notify.js
 jshint ./sim_core/sim_cfg.js
#jshint ./sim_core/sim_core_record.js
#jshint ./sim_core/sim_core_ctrl.js
 jshint ./sim_core/sim_core_rest.js

echo "checking sim_sw..."
 jshint ./sim_sw/firmware/lexical.js
 jshint ./sim_sw/firmware/firm_mcode.js
 jshint ./sim_sw/firmware/firm_begin.js
 jshint ./sim_sw/firmware/firm_registers.js
 jshint ./sim_sw/firmware/firm_pseudoinstructions.js
#jshint ./sim_sw/firmware/firm_instruction_v1.js
#jshint ./sim_sw/firmware/firm_fields_v1.js
#jshint ./sim_sw/firmware/firm_fields_v2.js
#jshint ./sim_sw/firmware/firm_instruction.js
#jshint ./sim_sw/firmware.js
 jshint ./sim_sw/firmware/creator2native.js
 jshint ./sim_sw/assembly/lexical.js
#jshint ./sim_sw/assembly/memory_segments.js
 jshint ./sim_sw/assembly/lexical.js
#jshint ./sim_sw/assembly.js

echo "checking sim_hw..."
 jshint ./sim_hw/sim_hw_index.js
 jshint ./sim_hw/sim_hw_values.js
#jshint ./sim_hw/sim_hw_behavior.js
 jshint ./sim_hw/sim_hw_eltos.js

 jshint ./sim_hw/hw_items/board_base.js
#jshint ./sim_hw/hw_items/cpu_ep.js
#jshint ./sim_hw/hw_items/cpu_rv.js
#jshint ./sim_hw/hw_items/cpu_poc.js
#jshint ./sim_hw/hw_items/cu_poc.js
 jshint ./sim_hw/hw_items/mem_ep.js
#jshint ./sim_hw/hw_items/mem_rv.js
#jshint ./sim_hw/hw_items/mem_poc.js
 jshint ./sim_hw/hw_items/io_screen_base.js
 jshint ./sim_hw/hw_items/io_keyboard_base.js
 jshint ./sim_hw/hw_items/io_clk_base.js
#jshint ./sim_hw/hw_items/io_l3d_ep.js
#jshint ./sim_hw/hw_items/io_ldm_ep.js

 jshint ./sim_hw/hw_ep.js
 jshint ./sim_hw/hw_poc.js
#jshint ./sim_hw/hw_rv.js

echo "checking wepsim_core..."
 jshint ./wepsim_core/wepsim_help_commands.js
 jshint ./wepsim_core/wepsim_tutorial.js
 jshint ./wepsim_core/wepsim_tour.js
 jshint ./wepsim_core/wepsim_preload.js
 jshint ./wepsim_core/wepsim_share.js
 jshint ./wepsim_core/wepsim_voice.js
#jshint ./wepsim_core/wepsim_execute.js
 jshint ./wepsim_core/wepsim_dbg_breakpointicons.js
 jshint ./wepsim_core/wepsim_tour_commands.js
 jshint ./wepsim_core/wepsim_mode.js
 jshint ./wepsim_core/wepsim_help.js
 jshint ./wepsim_core/wepsim_dialog.js
 jshint ./wepsim_core/wepsim_state.js
 jshint ./wepsim_core/wepsim_tutorial_simpleusage.js
#jshint ./wepsim_core/wepsim_clipboard.js
 jshint ./wepsim_core/wepsim_tutorial_welcome.js
 jshint ./wepsim_core/wepsim_notify.js
 jshint ./wepsim_core/wepsim_example.js
 jshint ./wepsim_core/wepsim_checkpoint.js
 jshint ./wepsim_core/wepsim_signal.js
 jshint ./wepsim_core/wepsim_url.js
#jshint ./wepsim_core/wepsim_voice_commands.js

echo "checking wepsim_web..."
 jshint ./wepsim_web/wepsim_uielto.js
 jshint ./wepsim_web/wepsim_uielto_about.js
 jshint ./wepsim_web/wepsim_uielto_bin_asm.js
 jshint ./wepsim_web/wepsim_uielto_bin_mc.js
 jshint ./wepsim_web/wepsim_uielto_compilationbar.js
 jshint ./wepsim_web/wepsim_uielto_console.js
 jshint ./wepsim_web/wepsim_uielto_cpu.js
#jshint ./wepsim_web/wepsim_uielto_cpusvg.js
#jshint ./wepsim_web/wepsim_uielto_dbg_asm.js
 jshint ./wepsim_web/wepsim_uielto_dbg_mc.js
 jshint ./wepsim_web/wepsim_uielto_editas.js
 jshint ./wepsim_web/wepsim_uielto_editmc.js
 jshint ./wepsim_web/wepsim_uielto_executionbar.js
 jshint ./wepsim_web/wepsim_uielto_hw.js
 jshint ./wepsim_web/wepsim_uielto_index_config.js
 jshint ./wepsim_web/wepsim_uielto_index_examples.js
 jshint ./wepsim_web/wepsim_uielto_index_help.js
 jshint ./wepsim_web/wepsim_uielto_io_config.js
 jshint ./wepsim_web/wepsim_uielto_io_info.js
 jshint ./wepsim_web/wepsim_uielto_l3d.js
 jshint ./wepsim_web/wepsim_uielto_ldm.js
 jshint ./wepsim_web/wepsim_uielto_listcfg.js
 jshint ./wepsim_web/wepsim_uielto_listexample.js
 jshint ./wepsim_web/wepsim_uielto_listprocessor.js
 jshint ./wepsim_web/wepsim_uielto_loadfile.js
 jshint ./wepsim_web/wepsim_uielto_mem.js
 jshint ./wepsim_web/wepsim_uielto_mem_config.js
 jshint ./wepsim_web/wepsim_uielto_notifications.js
 jshint ./wepsim_web/wepsim_uielto_recordbar.js
#jshint ./wepsim_web/wepsim_uielto_registers.js
 jshint ./wepsim_web/wepsim_uielto_savefile.js
 jshint ./wepsim_web/wepsim_uielto_segments.js
 jshint ./wepsim_web/wepsim_uielto_states.js
 jshint ./wepsim_web/wepsim_uielto_toolbar.js
 jshint ./wepsim_web/wepsim_uielto_topbar.js
 jshint ./wepsim_web/wepsim_uielto_slider_cpucu.js
 jshint ./wepsim_web/wepsim_uielto_slider_details.js
 jshint ./wepsim_web/wepsim_uipacker_cpu_cu.js
 jshint ./wepsim_web/wepsim_uipacker_cto_asm.js
 jshint ./wepsim_web/wepsim_uipacker_sim_mic_asm.js
 jshint ./wepsim_web/wepsim_uipacker_ddown_info.js
 jshint ./wepsim_web/wepsim_uipacker_ddown_sel.js
 jshint ./wepsim_web/wepsim_uiscreen_classic.js
 jshint ./wepsim_web/wepsim_uiscreen_compact.js
 jshint ./wepsim_web/wepsim_uiscreen_main.js
#jshint ./wepsim_web/wepsim_web_api.js
 jshint ./wepsim_web/wepsim_web_editor.js
#jshint ./wepsim_web/wepsim_web_pwa.js
 jshint ./wepsim_web/wepsim_web_simulator.js
 jshint ./wepsim_web/wepsim_web_ui_config.js
 jshint ./wepsim_web/wepsim_web_ui_config_commands.js
 jshint ./wepsim_web/wepsim_web_ui_dialogs.js
 jshint ./wepsim_web/wepsim_web_ui_quickcfg.js

echo "checking wepsim_nodejs..."
 jshint ./wepsim_nodejs/wepsim_node_action.js
#jshint ./wepsim_nodejs/wepsim_node_core.js

echo "checking wepsim_i18n..."
 jshint ./wepsim_i18n/i18n.js
for LANG in es en fr kr ja it pt hi zh_cn ru sv de; do
 jshint ./wepsim_i18n/$LANG/gui.js
 jshint ./wepsim_i18n/$LANG/tutorial-welcome.js
 jshint ./wepsim_i18n/$LANG/tutorial-simpleusage.js
 jshint ./wepsim_i18n/$LANG/tour-intro.js
 jshint ./wepsim_i18n/$LANG/cfg.js
 jshint ./wepsim_i18n/$LANG/help.js
 jshint ./wepsim_i18n/$LANG/states.js
 jshint ./wepsim_i18n/$LANG/examples.js
 jshint ./wepsim_i18n/$LANG/compiler.js
 jshint ./wepsim_i18n/$LANG/hw.js
 jshint ./wepsim_i18n/$LANG/dialogs.js
done

