#!/bin/sh
set -x

# 
#  EP hardware 
# 
cat sim_hw_index.js \
    sim_hw_ep/sim_ep.js \
    sim_hw_ep/sim_hw_board.js \
    sim_hw_ep/sim_hw_cpu.js \
    sim_hw_ep/sim_hw_mem.js \
    sim_hw_ep/sim_hw_io.js \
    sim_hw_ep/sim_hw_kbd.js \
    sim_hw_ep/sim_hw_scr.js > sim_hw.js
/usr/bin/yui-compressor -o min.sim_hw.js sim_hw.js
rm -fr sim_hw.js

# 
#  Simulator engine
# 
cat sim_cfg.js \
    sim_lang.js \
    sim_lang_firm.js \
    sim_lang_asm.js \
    sim_core_ctrl.js \
    sim_core_ui.js \
    sim_core.js > sim_all.js
/usr/bin/yui-compressor -o min.sim_all.js sim_all.js
rm -fr sim_all.js

# 
#  WepSIM: bootstrap + jquery-mobile
# 
cat wepsim_example.js \
    wepsim_help.js \
    wepsim_native.js \
    wepsim_state.js \
    wepsim_tutorial.js \
    wepsim_url.js \
    wepsim_voice.js \
    wepsim_execute.js \
    wepsim_misc.js \
    tutorials/tutorials.js \
    tutorials/welcome-en.js \
    tutorials/welcome-es.js \
    tutorials/simpleusage-en.js \
    tutorials/simpleusage-es.js \
    tutorials/tour-en.js \
    tutorials/tour-es.js \
    help/help-en.js \
    help/help-es.js \
    examples/examples.js > wepsim_all.js
/usr/bin/yui-compressor -o min.wepsim_all.js wepsim_all.js
rm -fr wepsim_all.js

# 
#  WepSIM: nodejs
# 
cat min.sim_hw.js \
    min.sim_all.js \
    min.wepsim_all.js \
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
    external/dropify.min.js > external/external.min.js

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
    external/dropify.min.css > external/external.min.css

