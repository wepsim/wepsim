#!/bin/sh
set -x

# 
#  hardware model + software model + core (simulation ctrl + UI)
# 
cat sim_hw/sim_hw_index.js \
    sim_hw/sim_hw_ep/sim_ep.js \
    sim_hw/sim_hw_ep/sim_hw_board.js \
    sim_hw/sim_hw_ep/sim_hw_cpu.js \
    sim_hw/sim_hw_ep/sim_hw_mem.js \
    sim_hw/sim_hw_ep/sim_hw_io.js \
    sim_hw/sim_hw_ep/sim_hw_kbd.js \
    sim_hw/sim_hw_ep/sim_hw_scr.js \
    sim_sw/sim_lang.js \
    sim_sw/sim_lang_firm.js \
    sim_sw/sim_lang_asm.js \
    sim_core/sim_cfg.js \
    sim_core/sim_core_ctrl.js \
    sim_core/sim_core_ui.js \
    sim_core/sim_core_ui_console.js \
    sim_core/sim_core_ui_memory.js \
    sim_core/sim_stateshots.js \
    sim_core/sim_core.js > sim_all.js
/usr/bin/yui-compressor -o min.sim_all.js sim_all.js
rm -fr sim_all.js

# 
#  WepSIM web engine
# 
cat wepsim/wepsim_example.js \
    wepsim/wepsim_help.js \
    wepsim/wepsim_config.js \
    wepsim/wepsim_native.js \
    wepsim/wepsim_state.js \
    wepsim/wepsim_tutorial.js \
    wepsim/wepsim_url.js \
    wepsim/wepsim_voice.js \
    wepsim/wepsim_execute.js \
    wepsim/wepsim_misc.js \
    wepsim/tutorials.js \
    wepsim/en/welcome-en.js \
    wepsim/en/simpleusage-en.js \
    wepsim/en/tour-en.js \
    wepsim/en/help-en.js \
    wepsim/en/config-en.js \
    wepsim/en/examples-en.js \
    wepsim/es/welcome-es.js \
    wepsim/es/simpleusage-es.js \
    wepsim/es/tour-es.js \
    wepsim/es/help-es.js \
    wepsim/es/config-es.js \
    wepsim/es/examples-es.js \
    wepsim/breakpointicons.js > wepsim_web.js
/usr/bin/yui-compressor -o min.wepsim_web.js wepsim_web.js
rm -fr wepsim_web.js
cp  wepsim/wepsim_pwa.js min.wepsim_pwa.js

# 
#  WepSIM nodejs engine
# 
cat min.sim_all.js \
    min.wepsim_web.js \
    wepsim/wepsim_node.js > min.wepsim_node.js


# 
#  external
# 
cat external/popper.min.js \
    external/bootstrap.min.js \
    external/knockout-3.4.2.js \
    external/jquery.knob.min.js \
    external/bootbox.min.js \
    external/spectrum.min.js \
    external/timbre.min.js \
    external/codemirror.js \
    external/codemirror.javascript.js \
    external/codemirror.gas.js \
    external/codemirror.keymap/sublime.js \
    external/codemirror.keymap/emacs.js \
    external/codemirror.keymap/vim.js \
    external/codemirror.edit/matchbrackets.js \
    external/codemirror.fold/foldcode.js \
    external/codemirror.fold/foldgutter.js \
    external/codemirror.fold/brace-fold.js \
    external/codemirror.fold/xml-fold.js \
    external/codemirror.fold/comment-fold.js \
    external/codemirror.fold/indent-fold.js \
    external/codemirror.fold/markdown-fold.js \
    external/codemirror.show-hint/codemirror.show-hint.js \
    external/codemirror.runmode/colorize.js \
    external/vis.min.js \
    external/async.js \
    external/bootstrap-tokenfield.js \
    external/introjs.min.js \
    external/speech-input.js \
    external/annyang.min.js \
    external/speechkitt.min.js \
    external/dropify.min.js \
    external/fontawesome5/all.js > min.external.js

cat external/bootstrap.min.css \
    external/bootstrap-theme.min.css \
    external/spectrum.min.css \
    external/codemirror.css \
    external/codemirror.theme/blackboard.css \
    external/codemirror.fold/foldgutter.css \
    external/codemirror.show-hint/codemirror.show-hint.css \
    external/vis-network.min.css \
    external/bootstrap-tokenfield.css \
    external/introjs.min.css \
    external/speech-input.css \
    external/speechkitt.css \
    external/dropify.min.css \
    external/fontawesome5/all.css > min.external.css

