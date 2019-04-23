#!/bin/bash
set -x

jshint ./sim_core/sim_core_ui.js
jshint ./sim_core/sim_api_stateshots.js
jshint ./sim_core/sim_api_native.js
#jshint ./sim_core/sim_api_core.js
jshint ./sim_core/sim_core_ui_console.js
jshint ./sim_core/sim_core_ui_io.js
jshint ./sim_core/sim_cfg.js
jshint ./sim_core/sim_core_ui_notify.js
jshint ./sim_core/sim_core_ui_help.js
jshint ./sim_core/sim_core_ui_voice.js
jshint ./sim_core/sim_core_ui_hw.js

jshint ./sim_sw/sim_lang.js

jshint ./sim_hw/sim_hw_index.js
jshint ./sim_hw/sim_hw_values.js
#jshint ./sim_hw/sim_hw_behavior.js
jshint ./sim_hw/sim_hw_poc/sim_poc.js
jshint ./sim_hw/sim_hw_poc/sim_hw_mem.js
jshint ./sim_hw/sim_hw_poc/sim_hw_board.js
jshint ./sim_hw/sim_hw_poc/sim_hw_kbd.js
jshint ./sim_hw/sim_hw_poc/sim_hw_scr.js
jshint ./sim_hw/sim_hw_ep/sim_hw_mem.js
jshint ./sim_hw/sim_hw_ep/sim_ep.js
jshint ./sim_hw/sim_hw_ep/sim_hw_io.js
jshint ./sim_hw/sim_hw_ep/sim_hw_board.js
jshint ./sim_hw/sim_hw_ep/sim_hw_kbd.js
jshint ./sim_hw/sim_hw_ep/sim_hw_scr.js

jshint ./wepsim_core/wepsim_asmdbg.js
jshint ./wepsim_core/wepsim_breakpointicons.js
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
#jshint ./wepsim_core/wepsim_record.js
jshint ./wepsim_core/wepsim_state.js
jshint ./wepsim_core/wepsim_tour.js
jshint ./wepsim_core/wepsim_tutorial.js
jshint ./wepsim_core/wepsim_url.js
#jshint ./wepsim_core/wepsim_voice_commands.js
jshint ./wepsim_core/wepsim_voice.js

jshint ./wepsim/wepsim_web_editor.js
#jshint ./wepsim/wepsim_web_simulator.js
jshint ./wepsim/wepsim_web_api.js
#jshint ./wepsim/wepsim_web_pwa.js
jshint ./wepsim/wepsim_node.js

jshint ./wepsim_i18n/i18n.js
jshint ./wepsim_i18n/en-cfg.js
jshint ./wepsim_i18n/en-examples.js
jshint ./wepsim_i18n/en-gui.js
jshint ./wepsim_i18n/en-help.js
jshint ./wepsim_i18n/en-tour-intro.js
jshint ./wepsim_i18n/en-tutorial-simpleusage.js
jshint ./wepsim_i18n/en-tutorial-welcome.js

jshint ./wepsim_i18n/es-cfg.js
jshint ./wepsim_i18n/es-examples.js
jshint ./wepsim_i18n/es-gui.js
jshint ./wepsim_i18n/es-help.js
jshint ./wepsim_i18n/es-tour-intro.js
jshint ./wepsim_i18n/es-tutorial-simpleusage.js
jshint ./wepsim_i18n/es-tutorial-welcome.js

