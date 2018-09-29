#!/bin/sh
set -x

# skeleton
                    mkdir -p ws_dist
                    touch    ws_dist/index.html
                    mkdir -p ws_dist/external
                    touch    ws_dist/external/index.html
cp external/jquery.min.js    ws_dist/external

#  hardware model + software model + core (simulation ctrl + UI)
cat sim_hw/sim_hw_index.js \
    sim_hw/sim_hw_values.js \
    sim_hw/sim_hw_behavior.js \
    sim_hw/sim_hw_ep/sim_ep.js \
    sim_hw/sim_hw_ep/sim_hw_board.js \
    sim_hw/sim_hw_ep/sim_hw_cpu.js \
    sim_hw/sim_hw_ep/sim_hw_mem.js \
    sim_hw/sim_hw_ep/sim_hw_io.js \
    sim_hw/sim_hw_ep/sim_hw_kbd.js \
    sim_hw/sim_hw_ep/sim_hw_scr.js \
    sim_hw/sim_hw_poc/sim_poc.js \
    sim_hw/sim_hw_poc/sim_hw_board.js \
    sim_hw/sim_hw_poc/sim_hw_cpu.js \
    sim_hw/sim_hw_poc/sim_hw_mem.js \
    sim_hw/sim_hw_poc/sim_hw_kbd.js \
    sim_hw/sim_hw_poc/sim_hw_scr.js \
    sim_sw/sim_lang.js \
    sim_sw/sim_lang_firm.js \
    sim_sw/sim_lang_asm.js \
    sim_core/sim_cfg.js \
    sim_core/sim_core_ctrl.js \
    sim_core/sim_stateshots.js \
    sim_core/sim_core_ui.js \
    sim_core/sim_core_ui_console.js \
    sim_core/sim_core_ui_memory.js \
    sim_core/sim_core_ui_help.js \
    sim_core/sim_core.js > ws_dist/sim_all.js
/usr/bin/yui-compressor -o ws_dist/min.sim_all.js ws_dist/sim_all.js
rm -fr ws_dist/sim_all.js

#  WepSIM web engine
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
    wepsim/breakpointicons.js > ws_dist/wepsim_web.js
/usr/bin/yui-compressor -o ws_dist/min.wepsim_web.js ws_dist/wepsim_web.js
rm -fr ws_dist/wepsim_web.js

#  WepSIM nodejs engine
cat ws_dist/min.sim_all.js \
    ws_dist/min.wepsim_web.js \
    wepsim/wepsim_node.js > ws_dist/min.wepsim_node.js

#  external
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
    external/introjs/introjs.min.js \
    external/speech-input.js \
    external/annyang.min.js \
    external/speechkit/speechkitt.min.js \
    external/dropify/dropify.min.js \
    external/fontawesome5/all.js > ws_dist/min.external.js

cat external/bootstrap.min.css \
    external/bootstrap-theme.min.css \
    external/spectrum.min.css \
    external/codemirror.css \
    external/codemirror.theme/blackboard.css \
    external/codemirror.fold/foldgutter.css \
    external/codemirror.show-hint/codemirror.show-hint.css \
    external/vis-network.min.css \
    external/bootstrap-tokenfield.css \
    external/introjs/introjs.min.css \
    external/speech-input.css \
    external/dropify/dropify.min.css \
    external/fontawesome5/all.css > ws_dist/min.external.css

cp -a external/dropify     ws_dist/external/
cp -a external/speechkitt  ws_dist/external/

#  examples, docs, etc.
cp -a examples  ws_dist/
          touch ws_dist/examples/index.html
cp -a docs      ws_dist/
          touch ws_dist/docs/index.html
cp -a images    ws_dist/
          touch ws_dist/images/index.html
cp -a help      ws_dist/
          touch ws_dist/help/index.html

#  user interface
sed "s/WEPSIM_ROOT/ws_dist/g" wepsim/wepsim.html    > index.html
sed "s/WEPSIM_ROOT/\./g"      wepsim/wepsim.html    > ws_dist/index.html
sed "s/WEPSIM_ROOT/\./g"      wepsim/wepsim_pwa.js  > ws_dist/min.wepsim_pwa.js

cp manifest.webapp        ws_dist/
cp wepsim/wepsim_node.sh  ws_dist/
chmod a+x ws_dist/*.sh

