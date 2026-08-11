#!/bin/bash
set -x


#*
#*  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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
     eslint ./src/sim_core/sim_cfg.js

     eslint ./src/sim_core/sim_core_voice.js \
            ./src/sim_core/sim_core_notify.js \
            ./src/sim_core/sim_core_rest.js \
            ./src/sim_core/sim_core_ui.js \
            ./src/sim_core/sim_core_record.js \
            ./src/sim_core/sim_core_ctrl.js

     eslint ./src/sim_core/sim_api_stateshots.js \
            ./src/sim_core/sim_api_native.js \
            ./src/sim_core/sim_api_core.js

echo "checking sim_sw..."
     eslint ./src/sim_sw/firmware/lexical.js \
            ./src/sim_sw/firmware/firm_mcode.js \
            ./src/sim_sw/firmware/firm_begin.js \
            ./src/sim_sw/firmware/firm_registers.js \
            ./src/sim_sw/firmware/firm_pseudoinstructions.js \
            ./src/sim_sw/firmware/firm_metadata.js \
            ./src/sim_sw/firmware/firm_fields_v1.js \
            ./src/sim_sw/firmware/firm_fields_v2.js \
            ./src/sim_sw/firmware/firm_instruction.js \
            ./src/sim_sw/firmware.js

     eslint ./src/sim_sw/assembly/lexical.js \
            ./src/sim_sw/assembly/memory_segments.js \
            ./src/sim_sw/assembly.js

echo "checking sim_hw..."
     eslint ./src/sim_hw/sim_hw_index.js \
            ./src/sim_hw/sim_hw_values.js \
            ./src/sim_hw/sim_hw_eltos.js \
            ./src/sim_hw/sim_hw_behavior.js \
            ./src/sim_hw/sim_hw_signal.js

     eslint ./src/sim_hw/hw_items/board_base.js \
            ./src/sim_hw/hw_items/cpu_ep.js \
            ./src/sim_hw/hw_items/mem_ep.js

     eslint ./src/sim_hw/hw_items/cpu_rv.js \
            ./src/sim_hw/hw_items/mem_rv.js

     eslint ./src/sim_hw/hw_items/cpu_poc.js \
            ./src/sim_hw/hw_items/cu_poc.js \
            ./src/sim_hw/hw_items/mem_poc.js

     eslint ./src/sim_hw/hw_items/io_screen_base.js \
            ./src/sim_hw/hw_items/io_keyboard_base.js \
            ./src/sim_hw/hw_items/io_clk_base.js \
            ./src/sim_hw/hw_items/io_l3d_base.js \
            ./src/sim_hw/hw_items/io_ldm_base.js

     eslint ./src/sim_hw/hw_ep.js \
            ./src/sim_hw/hw_poc.js \
            ./src/sim_hw/hw_rv.js

echo "checking wepsim_core..."
     eslint ./src/wepsim_core/wepsim_help_commands.js \
            ./src/wepsim_core/wepsim_tutorial.js \
            ./src/wepsim_core/wepsim_tour.js \
            ./src/wepsim_core/wepsim_preload.js \
            ./src/wepsim_core/wepsim_share.js \
            ./src/wepsim_core/wepsim_voice.js \
            ./src/wepsim_core/wepsim_dbg_breakpointicons.js \
            ./src/wepsim_core/wepsim_tour_commands.js \
            ./src/wepsim_core/wepsim_mode.js \
            ./src/wepsim_core/wepsim_help.js \
            ./src/wepsim_core/wepsim_dialog.js \
            ./src/wepsim_core/wepsim_state.js \
            ./src/wepsim_core/wepsim_tutorial_simpleusage.js \
            ./src/wepsim_core/wepsim_tutorial_welcome.js \
            ./src/wepsim_core/wepsim_notify.js \
            ./src/wepsim_core/wepsim_example.js \
            ./src/wepsim_core/wepsim_checkpoint.js \
            ./src/wepsim_core/wepsim_signal.js \
            ./src/wepsim_core/wepsim_url.js \
            ./src/wepsim_core/wepsim_execute.js \
            ./src/wepsim_core/wepsim_clipboard.js \
            ./src/wepsim_core/wepsim_voice_commands.js

echo "checking wepsim_web..."
     eslint ./src/wepsim_web/wepsim_uielto.js

     eslint ./src/wepsim_web/wepsim_uielto_compilationbar.js \
            ./src/wepsim_web/wepsim_uielto_executionbar.js

     eslint ./src/wepsim_web/wepsim_uipacker_cpu_cu.js \
            ./src/wepsim_web/wepsim_uipacker_cto_asm.js \
            ./src/wepsim_web/wepsim_uipacker_sim_mic_asm.js \
            ./src/wepsim_web/wepsim_uipacker_ddown_info.js \
            ./src/wepsim_web/wepsim_uipacker_ddown_sel.js

     eslint ./src/wepsim_web/wepsim_uiscreen_classic.js \
            ./src/wepsim_web/wepsim_uiscreen_compact.js \
            ./src/wepsim_web/wepsim_uiscreen_main.js

     eslint ./src/wepsim_web/wepsim_uielto_index_config.js \
            ./src/wepsim_web/wepsim_uielto_index_examples.js \
            ./src/wepsim_web/wepsim_uielto_index_help.js

     eslint ./src/wepsim_web/wepsim_uielto_slider_cpucu.js \
            ./src/wepsim_web/wepsim_uielto_slider_details.js

     eslint ./src/wepsim_web/wepsim_uielto_editas.js \
            ./src/wepsim_web/wepsim_uielto_editmc.js

     eslint ./src/wepsim_web/wepsim_web_ui_config.js \
            ./src/wepsim_web/wepsim_web_ui_config_commands.js \
            ./src/wepsim_web/wepsim_web_ui_dialogs.js \
            ./src/wepsim_web/wepsim_web_ui_quickcfg.js

     eslint ./src/wepsim_web/wepsim_uielto_hw.js \
            ./src/wepsim_web/wepsim_uielto_mem.js \
            ./src/wepsim_web/wepsim_uielto_mem_config.js \
            ./src/wepsim_web/wepsim_uielto_console.js \
            ./src/wepsim_web/wepsim_uielto_timer_config.js \
            ./src/wepsim_web/wepsim_uielto_timer_info.js \
            ./src/wepsim_web/wepsim_uielto_l3d.js \
            ./src/wepsim_web/wepsim_uielto_ldm.js \
            ./src/wepsim_web/wepsim_uielto_sound.js

     eslint ./src/wepsim_web/wepsim_uielto_bin_asm.js \
            ./src/wepsim_web/wepsim_uielto_bin_mc.js

     eslint ./src/wepsim_web/wepsim_uielto_listcfg.js \
            ./src/wepsim_web/wepsim_uielto_listexample.js \
            ./src/wepsim_web/wepsim_uielto_listprocessor.js

     eslint ./src/wepsim_web/wepsim_uielto_loadfile.js \
            ./src/wepsim_web/wepsim_uielto_savefile.js \
            ./src/wepsim_web/wepsim_uielto_savefiles.js

     eslint ./src/wepsim_web/wepsim_uielto_dbg_asm.js \
            ./src/wepsim_web/wepsim_uielto_dbg_mc.js

     eslint ./src/wepsim_web/wepsim_uielto_about.js
     eslint ./src/wepsim_web/wepsim_uielto_cpu.js
     eslint ./src/wepsim_web/wepsim_uielto_cpusvg.js
     eslint ./src/wepsim_web/wepsim_uielto_registers.js
     eslint ./src/wepsim_web/wepsim_uielto_segments.js
     eslint ./src/wepsim_web/wepsim_uielto_notifications.js
     eslint ./src/wepsim_web/wepsim_uielto_recordbar.js
     eslint ./src/wepsim_web/wepsim_uielto_states.js
     eslint ./src/wepsim_web/wepsim_uielto_toolbar.js
     eslint ./src/wepsim_web/wepsim_uielto_topbar.js

     eslint ./src/wepsim_web/wepsim_web_api.js
     eslint ./src/wepsim_web/wepsim_web_editor.js
     eslint ./src/wepsim_web/wepsim_web_simulator.js
     eslint ./src/wepsim_web/wepsim_web_pwa.js

echo "checking wepsim_nodejs..."
     eslint ./src/wepsim_nodejs/wepsim_node_action.js
     eslint ./src/wepsim_nodejs/wepsim_node_core.js

echo "checking wepsim_i18n..."
     eslint ./src/wepsim_i18n/i18n.js
for LANG in es en fr kr ja it pt hi zh_cn ru sv de; do
     eslint ./src/wepsim_i18n/$LANG/gui.js \
            ./src/wepsim_i18n/$LANG/tutorial-welcome.js \
            ./src/wepsim_i18n/$LANG/tutorial-simpleusage.js \
            ./src/wepsim_i18n/$LANG/tour-intro.js \
            ./src/wepsim_i18n/$LANG/cfg.js \
            ./src/wepsim_i18n/$LANG/help.js \
            ./src/wepsim_i18n/$LANG/states.js \
            ./src/wepsim_i18n/$LANG/examples.js \
            ./src/wepsim_i18n/$LANG/compiler.js \
            ./src/wepsim_i18n/$LANG/hw.js \
            ./src/wepsim_i18n/$LANG/dialogs.js
done

