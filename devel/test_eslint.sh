#!/bin/bash
set -x


#*
#*  Copyright 2015-2026 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
     eslint ./sim_core/sim_cfg.js

     eslint ./sim_core/sim_core_voice.js \
            ./sim_core/sim_core_notify.js \
            ./sim_core/sim_core_rest.js \
            ./sim_core/sim_core_ui.js \
            ./sim_core/sim_core_record.js \
            ./sim_core/sim_core_ctrl.js

     eslint ./sim_core/sim_api_stateshots.js \
            ./sim_core/sim_api_native.js \
            ./sim_core/sim_api_core.js

echo "checking sim_sw..."
     eslint ./sim_sw/firmware/lexical.js \
            ./sim_sw/firmware/firm_mcode.js \
            ./sim_sw/firmware/firm_begin.js \
            ./sim_sw/firmware/firm_registers.js \
            ./sim_sw/firmware/firm_pseudoinstructions.js \
            ./sim_sw/firmware/firm_metadata.js \
            ./sim_sw/firmware/firm_fields_v1.js \
            ./sim_sw/firmware/firm_fields_v2.js \
            ./sim_sw/firmware/firm_instruction.js \
            ./sim_sw/firmware.js

     eslint ./sim_sw/assembly/lexical.js \
            ./sim_sw/assembly/memory_segments.js \
            ./sim_sw/assembly.js

echo "checking sim_hw..."
     eslint ./sim_hw/sim_hw_index.js \
            ./sim_hw/sim_hw_values.js \
            ./sim_hw/sim_hw_eltos.js \
            ./sim_hw/sim_hw_behavior.js

     eslint ./sim_hw/hw_items/board_base.js \
            ./sim_hw/hw_items/cpu_ep.js \
            ./sim_hw/hw_items/mem_ep.js

     eslint ./sim_hw/hw_items/cpu_rv.js \
            ./sim_hw/hw_items/mem_rv.js

     eslint ./sim_hw/hw_items/cpu_poc.js \
            ./sim_hw/hw_items/cu_poc.js \
            ./sim_hw/hw_items/mem_poc.js

     eslint ./sim_hw/hw_items/io_screen_base.js \
            ./sim_hw/hw_items/io_keyboard_base.js \
            ./sim_hw/hw_items/io_clk_base.js \
            ./sim_hw/hw_items/io_l3d_base.js \
            ./sim_hw/hw_items/io_ldm_base.js

     eslint ./sim_hw/hw_ep.js \
            ./sim_hw/hw_poc.js \
            ./sim_hw/hw_rv.js

echo "checking wepsim_core..."
     eslint ./wepsim_core/wepsim_help_commands.js \
            ./wepsim_core/wepsim_tutorial.js \
            ./wepsim_core/wepsim_tour.js \
            ./wepsim_core/wepsim_preload.js \
            ./wepsim_core/wepsim_share.js \
            ./wepsim_core/wepsim_voice.js \
            ./wepsim_core/wepsim_dbg_breakpointicons.js \
            ./wepsim_core/wepsim_tour_commands.js \
            ./wepsim_core/wepsim_mode.js \
            ./wepsim_core/wepsim_help.js \
            ./wepsim_core/wepsim_dialog.js \
            ./wepsim_core/wepsim_state.js \
            ./wepsim_core/wepsim_tutorial_simpleusage.js \
            ./wepsim_core/wepsim_tutorial_welcome.js \
            ./wepsim_core/wepsim_notify.js \
            ./wepsim_core/wepsim_example.js \
            ./wepsim_core/wepsim_checkpoint.js \
            ./wepsim_core/wepsim_signal.js \
            ./wepsim_core/wepsim_url.js \
            ./wepsim_core/wepsim_execute.js \
            ./wepsim_core/wepsim_clipboard.js \
            ./wepsim_core/wepsim_voice_commands.js

echo "checking wepsim_web..."
     eslint ./wepsim_web/wepsim_uielto.js

     eslint ./wepsim_web/wepsim_uielto_compilationbar.js \
            ./wepsim_web/wepsim_uielto_executionbar.js

     eslint ./wepsim_web/wepsim_uipacker_cpu_cu.js \
            ./wepsim_web/wepsim_uipacker_cto_asm.js \
            ./wepsim_web/wepsim_uipacker_sim_mic_asm.js \
            ./wepsim_web/wepsim_uipacker_ddown_info.js \
            ./wepsim_web/wepsim_uipacker_ddown_sel.js

     eslint ./wepsim_web/wepsim_uiscreen_classic.js \
            ./wepsim_web/wepsim_uiscreen_compact.js \
            ./wepsim_web/wepsim_uiscreen_main.js

     eslint ./wepsim_web/wepsim_uielto_index_config.js \
            ./wepsim_web/wepsim_uielto_index_examples.js \
            ./wepsim_web/wepsim_uielto_index_help.js

     eslint ./wepsim_web/wepsim_uielto_slider_cpucu.js \
            ./wepsim_web/wepsim_uielto_slider_details.js

     eslint ./wepsim_web/wepsim_uielto_editas.js \
            ./wepsim_web/wepsim_uielto_editmc.js

     eslint ./wepsim_web/wepsim_web_ui_config.js \
            ./wepsim_web/wepsim_web_ui_config_commands.js \
            ./wepsim_web/wepsim_web_ui_dialogs.js \
            ./wepsim_web/wepsim_web_ui_quickcfg.js

     eslint ./wepsim_web/wepsim_uielto_hw.js \
            ./wepsim_web/wepsim_uielto_mem.js \
            ./wepsim_web/wepsim_uielto_mem_config.js \
            ./wepsim_web/wepsim_uielto_console.js \
            ./wepsim_web/wepsim_uielto_timer_config.js \
            ./wepsim_web/wepsim_uielto_timer_info.js \
            ./wepsim_web/wepsim_uielto_l3d.js \
            ./wepsim_web/wepsim_uielto_ldm.js \
            ./wepsim_web/wepsim_uielto_sound.js

     eslint ./wepsim_web/wepsim_uielto_bin_asm.js \
            ./wepsim_web/wepsim_uielto_bin_mc.js

     eslint ./wepsim_web/wepsim_uielto_listcfg.js \
            ./wepsim_web/wepsim_uielto_listexample.js \
            ./wepsim_web/wepsim_uielto_listprocessor.js

     eslint ./wepsim_web/wepsim_uielto_loadfile.js \
            ./wepsim_web/wepsim_uielto_savefile.js \
            ./wepsim_web/wepsim_uielto_savefiles.js

     eslint ./wepsim_web/wepsim_uielto_dbg_asm.js \
            ./wepsim_web/wepsim_uielto_dbg_mc.js

     eslint ./wepsim_web/wepsim_uielto_about.js
     eslint ./wepsim_web/wepsim_uielto_cpu.js
     eslint ./wepsim_web/wepsim_uielto_cpusvg.js
     eslint ./wepsim_web/wepsim_uielto_registers.js
     eslint ./wepsim_web/wepsim_uielto_segments.js
     eslint ./wepsim_web/wepsim_uielto_notifications.js
     eslint ./wepsim_web/wepsim_uielto_recordbar.js
     eslint ./wepsim_web/wepsim_uielto_states.js
     eslint ./wepsim_web/wepsim_uielto_toolbar.js
     eslint ./wepsim_web/wepsim_uielto_topbar.js

     eslint ./wepsim_web/wepsim_web_api.js
     eslint ./wepsim_web/wepsim_web_editor.js
     eslint ./wepsim_web/wepsim_web_simulator.js
    #eslint ./wepsim_web/wepsim_web_pwa.js

echo "checking wepsim_nodejs..."
     eslint ./wepsim_nodejs/wepsim_node_action.js
   # eslint ./wepsim_nodejs/wepsim_node_core.js

echo "checking wepsim_i18n..."
     eslint ./wepsim_i18n/i18n.js
for LANG in es en fr kr ja it pt hi zh_cn ru sv de; do
     eslint ./wepsim_i18n/$LANG/gui.js \
            ./wepsim_i18n/$LANG/tutorial-welcome.js \
            ./wepsim_i18n/$LANG/tutorial-simpleusage.js \
            ./wepsim_i18n/$LANG/tour-intro.js \
            ./wepsim_i18n/$LANG/cfg.js \
            ./wepsim_i18n/$LANG/help.js \
            ./wepsim_i18n/$LANG/states.js \
            ./wepsim_i18n/$LANG/examples.js \
            ./wepsim_i18n/$LANG/compiler.js \
            ./wepsim_i18n/$LANG/hw.js \
            ./wepsim_i18n/$LANG/dialogs.js
done

