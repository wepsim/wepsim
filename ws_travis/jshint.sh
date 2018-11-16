#!/bin/bash
set -x

jshint ./sim_core/sim_core_ui_help.js
jshint ./sim_core/sim_cfg.js
jshint ./sim_core/sim_core.js
jshint ./sim_core/sim_core_ui_console.js
jshint ./sim_core/sim_stateshots.js

jshint ./sim_hw/sim_hw_poc/sim_hw_board.js
jshint ./sim_hw/sim_hw_poc/sim_hw_kbd.js
jshint ./sim_hw/sim_hw_poc/sim_hw_scr.js
jshint ./sim_hw/sim_hw_poc/sim_poc.js
jshint ./sim_hw/sim_hw_poc/sim_hw_mem.js
jshint ./sim_hw/sim_hw_index.js
jshint ./sim_hw/sim_hw_ep/sim_hw_io.js
jshint ./sim_hw/sim_hw_ep/sim_hw_board.js
jshint ./sim_hw/sim_hw_ep/sim_hw_kbd.js
jshint ./sim_hw/sim_hw_ep/sim_hw_scr.js
jshint ./sim_hw/sim_hw_ep/sim_hw_mem.js
jshint ./sim_hw/sim_hw_ep/sim_ep.js
jshint ./sim_hw/sim_hw_values.js

jshint ./sim_sw/sim_lang.js

jshint ./wepsim/wepsim_url.js
jshint ./wepsim/wepsim_native.js
jshint ./wepsim/wepsim_tutorial.js
jshint ./wepsim/wepsim_voice.js
jshint ./wepsim/wepsim_node.js
jshint ./wepsim/wepsim_config.js
jshint ./wepsim/wepsim_help.js
jshint ./wepsim/wepsim_example.js
jshint ./wepsim/wepsim_misc.js

jshint ./wepsim/i18n/i18n.js
jshint ./wepsim/i18n/es-gui.js
jshint ./wepsim/i18n/es-misc.js
jshint ./wepsim/i18n/es-examples.js
jshint ./wepsim/i18n/es-config.js
jshint ./wepsim/i18n/es-help.js
jshint ./wepsim/i18n/es-tutorial-welcome.js
jshint ./wepsim/i18n/es-tutorial-simpleusage.js
jshint ./wepsim/i18n/es-tour.js

jshint ./wepsim/i18n/en-gui.js
jshint ./wepsim/i18n/en-misc.js
jshint ./wepsim/i18n/en-examples.js
jshint ./wepsim/i18n/en-config.js
jshint ./wepsim/i18n/en-help.js
jshint ./wepsim/i18n/en-tutorial-welcome.js
jshint ./wepsim/i18n/en-tutorial-simpleusage.js
jshint ./wepsim/i18n/en-tour.js

