#!/bin/sh
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


# skeleton
echo "ws_dist"
                    mkdir -p ws_dist
                    touch    ws_dist/index.html
                    mkdir -p ws_dist/external
                    touch    ws_dist/external/index.html
cp external/jquery.min.js    ws_dist/external
                    mkdir -p ws_dist/help
                    touch    ws_dist/help/index.html

#  hardware model + software model + core (simulation ctrl + UI)
echo "ws_dist/min.sim_all.js"
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
    sim_hw/sim_hw_poc/sim_hw_io.js \
    sim_hw/sim_hw_poc/sim_hw_kbd.js \
    sim_hw/sim_hw_poc/sim_hw_scr.js \
    \
    sim_sw/sim_lang.js \
    sim_sw/sim_lang_firm.js \
    sim_sw/sim_lang_asm.js \
    sim_sw/sim_lang_cis2native.js \
    \
    sim_core/sim_cfg.js \
    sim_core/sim_core_record.js \
    sim_core/sim_core_ctrl.js \
    sim_core/sim_core_ui.js \
    sim_core/sim_api_core.js \
    sim_core/sim_api_native.js \
    sim_core/sim_api_stateshots.js \
    sim_core/sim_core_voice.js \
    sim_core/sim_core_notify.js > ws_dist/sim_all.js
/usr/bin/yui-compressor -o ws_dist/min.sim_all.js ws_dist/sim_all.js
rm -fr ws_dist/sim_all.js

#  WepSIM internalization (i18n)
echo "ws_dist/help/..."
cat wepsim_i18n/i18n.js > ws_dist/wepsim_i18n.js
for LANG in es en fr kr ja it pt hi zh_cn ru sv de; do
cat wepsim_i18n/$LANG/gui.js \
    wepsim_i18n/$LANG/tutorial-welcome.js \
    wepsim_i18n/$LANG/tutorial-simpleusage.js \
    wepsim_i18n/$LANG/tour-intro.js \
    wepsim_i18n/$LANG/cfg.js \
    wepsim_i18n/$LANG/help.js \
    wepsim_i18n/$LANG/states.js \
    wepsim_i18n/$LANG/examples.js \
    wepsim_i18n/$LANG/dialogs.js  >> ws_dist/wepsim_i18n.js
cp  wepsim_i18n/$LANG/simulator.html ws_dist/help/simulator-"$LANG".html
cp  wepsim_i18n/$LANG/about.html     ws_dist/help/about-"$LANG".html
done
/usr/bin/yui-compressor -o ws_dist/min.wepsim_i18n.js ws_dist/wepsim_i18n.js
rm -fr ws_dist/wepsim_i18n.js

#  WepSIM web
echo "ws_dist/min.wepsim_web.js"
cat wepsim_core/wepsim_url.js \
    wepsim_core/wepsim_clipboard.js \
    wepsim_core/wepsim_preload.js \
    wepsim_core/wepsim_checkpoint.js \
    wepsim_core/wepsim_signal.js \
    wepsim_core/wepsim_state.js \
    wepsim_core/wepsim_execute.js \
    wepsim_core/wepsim_notify.js \
    \
    wepsim_core/wepsim_ui_cpu.js \
    wepsim_core/wepsim_ui_cpu_svg.js \
    wepsim_core/wepsim_ui_registers.js \
    wepsim_core/wepsim_ui_console.js \
    wepsim_core/wepsim_ui_control_memory.js \
    wepsim_core/wepsim_ui_main_memory.js \
    wepsim_core/wepsim_ui_io.js \
    wepsim_core/wepsim_ui_hw.js \
    \
    wepsim_core/wepsim_dbg_asm.js \
    wepsim_core/wepsim_dbg_mc.js \
    wepsim_core/wepsim_dbg_breakpointicons.js \
    \
    wepsim_core/wepsim_config.js \
    wepsim_core/wepsim_config_commands.js \
    wepsim_core/wepsim_example.js \
    wepsim_core/wepsim_example_commands.js \
    wepsim_core/wepsim_help.js \
    wepsim_core/wepsim_help_commands.js \
    wepsim_core/wepsim_tutorial.js \
    wepsim_core/wepsim_tutorial_welcome.js \
    wepsim_core/wepsim_tutorial_simpleusage.js \
    wepsim_core/wepsim_tour.js \
    wepsim_core/wepsim_tour_commands.js \
    wepsim_core/wepsim_voice.js \
    wepsim_core/wepsim_voice_commands.js \
    \
    wepsim/wepsim_web_simulator.js \
    wepsim/wepsim_web_editor.js \
    wepsim/wepsim_web_api.js > ws_dist/wepsim_web.js
/usr/bin/yui-compressor -o ws_dist/min.wepsim_web.js ws_dist/wepsim_web.js
rm -fr ws_dist/wepsim_web.js

#  WepSIM web engine
echo "ws_dist/min.wepsim_web.js"
cat ws_dist/min.wepsim_i18n.js \
    ws_dist/min.wepsim_web.js > ws_dist/transient.js
mv ws_dist/transient.js ws_dist/min.wepsim_web.js

#  WepSIM nodejs engine
echo "ws_dist/min.wepsim_node.js"
cat ws_dist/min.sim_all.js \
    ws_dist/min.wepsim_web.js \
    wepsim/wepsim_node_core.js \
    wepsim/wepsim_node_action.js > ws_dist/min.wepsim_node.js

#  external
echo "ws_dist/min.external.js"
cat external/popper.min.js \
    external/bootstrap.min.js \
    external/knockout-3.5.0.js \
    external/jquery.knob.min.js \
    external/bootbox.min.js \
    external/spectrum.min.js \
    external/timbre.min.js \
    external/codemirror/codemirror.js \
    external/codemirror/codemirror.javascript.js \
    external/codemirror/codemirror.gas.js \
    external/codemirror/codemirror.keymap/sublime.js \
    external/codemirror/codemirror.keymap/emacs.js \
    external/codemirror/codemirror.keymap/vim.js \
    external/codemirror/codemirror.edit/matchbrackets.js \
    external/codemirror/codemirror.fold/foldcode.js \
    external/codemirror/codemirror.fold/foldgutter.js \
    external/codemirror/codemirror.fold/brace-fold.js \
    external/codemirror/codemirror.fold/xml-fold.js \
    external/codemirror/codemirror.fold/comment-fold.js \
    external/codemirror/codemirror.fold/indent-fold.js \
    external/codemirror/codemirror.fold/markdown-fold.js \
    external/codemirror/codemirror.show-hint/codemirror.show-hint.js \
    external/codemirror/codemirror.runmode/colorize.js \
    external/vis/vis.min.js \
    external/vis/vis-network.min.js \
    external/async.js \
    external/bootstrap-tokenfield.js \
    external/introjs/introjs.min.js \
    external/speech-input.js \
    external/annyang.min.js \
    external/speechkitt/speechkitt.min.js \
    external/dropify/dropify.min.js \
    external/masonry.pkgd.min.js \
    external/fontawesome/brands.min.js \
    external/fontawesome/solid.min.js > ws_dist/min.external.js

echo "ws_dist/min.external.css"
cat external/bootstrap.min.css \
    external/bootstrap-theme.min.css \
    external/spectrum.min.css \
    external/codemirror/codemirror.css \
    external/codemirror/codemirror.theme/blackboard.css \
    external/codemirror/codemirror.fold/foldgutter.css \
    external/codemirror/codemirror.show-hint/codemirror.show-hint.css \
    external/vis/vis.min.css \
    external/vis/vis-network.min.css \
    external/bootstrap-tokenfield.css \
    external/introjs/introjs.min.css \
    external/speech-input.css \
    external/dropify/dropify.min.css \
    external/fontawesome/all.css > ws_dist/min.external.css

echo "ws_dist/external/..."
mkdir -p ws_dist/external/fontawesome/
   touch ws_dist/external/fontawesome/index.html
cp    -a external/fontawesome/webfonts  ws_dist/external/fontawesome
                                  touch ws_dist/external/fontawesome/webfonts/index.html
cp    -a external/dropify               ws_dist/external/
                                  touch ws_dist/external/dropify/index.html
cp    -a external/speechkitt            ws_dist/external/
                                  touch ws_dist/external/speechkitt/index.html
cp    -a external/cordova.js            ws_dist/external/cordova.js

#  examples, docs, etc.
echo "ws_dist/examples/..."
cp -a examples  ws_dist/
echo "ws_dist/docs/..."
cp -a docs      ws_dist/
echo "ws_dist/images/..."
cp -a images    ws_dist/

#  user interface
echo "ws_dist/*.html"
cp   wepsim/wepsim_web_classic.html   ws_dist/index.html
cp   wepsim/wepsim_web_classic.html   ws_dist/wepsim-classic.html
cp   wepsim/wepsim_web_compact.html   ws_dist/wepsim-compact.html
cp   wepsim/wepsim_web_pwa.js         ws_dist/min.wepsim_web_pwa.js

echo "ws_dist/*.sh"
cp   docs/manifest.webapp  ws_dist/
cp wepsim/wepsim_node.sh   ws_dist/
chmod a+x ws_dist/*.sh

