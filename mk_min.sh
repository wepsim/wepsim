#!/bin/sh
set -x

# 
#  EP hardware 
# 
cat sim_hw/sim_hw_index.js \
    sim_hw/sim_hw_ep/sim_ep.js \
    sim_hw/sim_hw_ep/sim_hw_board.js \
    sim_hw/sim_hw_ep/sim_hw_cpu.js \
    sim_hw/sim_hw_ep/sim_hw_mem.js \
    sim_hw/sim_hw_ep/sim_hw_io.js \
    sim_hw/sim_hw_ep/sim_hw_kbd.js \
    sim_hw/sim_hw_ep/sim_hw_scr.js > sim_hw.js
/usr/bin/yui-compressor -o min.sim_hw.js sim_hw.js
rm -fr sim_hw.js

# 
#  Simulator engine
# 
cat sim_engine/sim_cfg.js \
    sim_engine/sim_lang.js \
    sim_engine/sim_lang_firm.js \
    sim_engine/sim_lang_asm.js \
    sim_engine/sim_core_ctrl.js \
    sim_engine/sim_core_ui.js \
    sim_engine/sim_core.js > sim_engine.js
/usr/bin/yui-compressor -o min.sim_engine.js sim_engine.js
rm -fr sim_engine.js

# 
#  WepSIM: bootstrap + jquery-mobile
# 
cp  wepsim/wepsim_pwa.js min.wepsim_pwa.js
cat wepsim/wepsim_example.js \
    wepsim/wepsim_help.js \
    wepsim/wepsim_native.js \
    wepsim/wepsim_state.js \
    wepsim/wepsim_tutorial.js \
    wepsim/wepsim_url.js \
    wepsim/wepsim_voice.js \
    wepsim/wepsim_execute.js \
    wepsim/wepsim_misc.js \
    wepsim/tutorials/tutorials.js \
    wepsim/tutorials/welcome-en.js \
    wepsim/tutorials/welcome-es.js \
    wepsim/tutorials/simpleusage-en.js \
    wepsim/tutorials/simpleusage-es.js \
    wepsim/tutorials/tour-en.js \
    wepsim/tutorials/tour-es.js \
    wepsim/help-en.js \
    wepsim/help-es.js \
    wepsim/examples.js > wepsim_web.js
/usr/bin/yui-compressor -o min.wepsim_web.js wepsim_web.js
rm -fr wepsim_web.js

# 
#  WepSIM: nodejs
# 
cat min.sim_hw.js \
    min.sim_engine.js \
    min.wepsim_web.js \
    wepsim_node.js > min.wepsim_node.js


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
    external/dropify.min.js > min.external.js

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
    external/dropify.min.css > min.external.css

