#!/bin/bash
set -x


#*
#*  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
 jshint ./sim_core/sim_api_stateshots.js
 jshint ./sim_core/sim_api_native.js
#jshint ./sim_core/sim_api_core.js
 jshint ./sim_core/sim_cfg.js
 jshint ./sim_core/sim_core_ui.js
 jshint ./sim_core/sim_core_voice.js
#jshint ./sim_core/sim_core_ctrl.js
#jshint ./sim_core/sim_core_record.js

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

 jshint ./wepsim_core/wepsim_dbg_asm.js
 jshint ./wepsim_core/wepsim_dbg_mc.js
 jshint ./wepsim_core/wepsim_dbg_breakpointicons.js
 jshint ./wepsim_core/wepsim_checkpoint.js
#jshint ./wepsim_core/wepsim_clipboard.js
 jshint ./wepsim_core/wepsim_config_commands.js
 jshint ./wepsim_core/wepsim_config.js
 jshint ./wepsim_core/wepsim_example_commands.js
 jshint ./wepsim_core/wepsim_example.js
#jshint ./wepsim_core/wepsim_execute.js
 jshint ./wepsim_core/wepsim_help_commands.js
 jshint ./wepsim_core/wepsim_help.js
 jshint ./wepsim_core/wepsim_notify.js
#jshint ./wepsim_core/wepsim_preload.js
 jshint ./wepsim_core/wepsim_state.js
 jshint ./wepsim_core/wepsim_tour.js
 jshint ./wepsim_core/wepsim_tour_commands.js
 jshint ./wepsim_core/wepsim_tutorial.js
 jshint ./wepsim_core/wepsim_url.js
#jshint ./wepsim_core/wepsim_voice_commands.js
 jshint ./wepsim_core/wepsim_voice.js
 jshint ./wepsim_core/wepsim_signal.js
#jshint ./wepsim_core/wepsim_ui_registers.js
 jshint ./wepsim_core/wepsim_ui_cpu.js
 jshint ./wepsim_core/wepsim_ui_io.js
 jshint ./wepsim_core/wepsim_ui_hw.js

 jshint ./wepsim/wepsim_web_editor.js
 jshint ./wepsim/wepsim_web_simulator.js
 jshint ./wepsim/wepsim_web_api.js
#jshint ./wepsim/wepsim_web_pwa.js
 jshint ./wepsim/wepsim_node_core.js
#jshint ./wepsim/wepsim_node_action.js

 jshint ./wepsim_i18n/i18n.js
 jshint ./wepsim_i18n/en/cfg.js
 jshint ./wepsim_i18n/en/examples.js
 jshint ./wepsim_i18n/en/gui.js
 jshint ./wepsim_i18n/en/help.js
 jshint ./wepsim_i18n/en/dialogs.js
 jshint ./wepsim_i18n/en/states.js
 jshint ./wepsim_i18n/en/tour-intro.js
 jshint ./wepsim_i18n/en/tutorial-simpleusage.js
 jshint ./wepsim_i18n/en/tutorial-welcome.js

 jshint ./wepsim_i18n/es/cfg.js
 jshint ./wepsim_i18n/es/examples.js
 jshint ./wepsim_i18n/es/gui.js
 jshint ./wepsim_i18n/es/help.js
 jshint ./wepsim_i18n/es/dialogs.js
 jshint ./wepsim_i18n/es/states.js
 jshint ./wepsim_i18n/es/tour-intro.js
 jshint ./wepsim_i18n/es/tutorial-simpleusage.js
 jshint ./wepsim_i18n/es/tutorial-welcome.js

 jshint ./wepsim_i18n/fr/states.js
 jshint ./wepsim_i18n/fr/gui.js
 jshint ./wepsim_i18n/fr/cfg.js
 jshint ./wepsim_i18n/fr/examples.js
 jshint ./wepsim_i18n/fr/help.js
 jshint ./wepsim_i18n/fr/dialogs.js
 jshint ./wepsim_i18n/fr/tour-intro.js
 jshint ./wepsim_i18n/fr/tutorial-welcome.js
 jshint ./wepsim_i18n/fr/tutorial-simpleusage.js

 jshint ./wepsim_i18n/kr/states.js
 jshint ./wepsim_i18n/kr/gui.js
 jshint ./wepsim_i18n/kr/cfg.js
 jshint ./wepsim_i18n/kr/examples.js
 jshint ./wepsim_i18n/kr/help.js
 jshint ./wepsim_i18n/kr/dialogs.js
 jshint ./wepsim_i18n/kr/tour-intro.js
 jshint ./wepsim_i18n/kr/tutorial-welcome.js
 jshint ./wepsim_i18n/kr/tutorial-simpleusage.js

