#!/bin/sh
#set -x


#*
#*  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


# welcome
echo ""
echo "  WepSIM packer"
echo " ---------------"
echo ""


# arguments
while getopts 'vdh' opt; do
  case "$opt" in
    v)
      echo "  getopts: processing verbose..."
      echo ""
      set -x
      ;;

    d)
      echo "  Please install first:"
      echo "   sudo apt-get install jq"
      echo ""
      echo "   npm i terser jshint"
      echo "   npm i yargs clear inquirer fuzzy commander async"
      echo "   npm i inquirer-command-prompt inquirer-autocomplete-prompt"
      echo "   npm i rollup @rollup/plugin-node-resolve"
      echo ""
      echo "   npm i codemirror @codemirror/lang-javascript"
      echo "   npm i codemirror @codemirror/view";
      echo "   npm i codemirror @codemirror/state";
      echo "   npm i codemirror @codemirror/language";
      echo ""
      exit
      ;;

    ?|h)
      echo "  Usage: $(basename $0) [-v] [-d]"
      echo ""
      exit 1
      ;;
  esac
done
shift "$(($OPTIND -1))"


# install npm dependencies
echo "  Step for npm install/update:"
echo "  * terser jshint"
echo "  * yargs clear inquirer fuzzy commander async"
echo "  * inquirer-command-prompt inquirer-autocomplete-prompt"
echo "  * rollup @rollup/plugin-node-resolve"
npm install
echo "  Done."
echo ""


# pre-bundle
echo "  Step for rollup:"
echo "  * codemirror6"
node_modules/.bin/rollup -c external/codemirror6/rollup.config.mjs
terser -o external/codemirror6/min.codemirror.js external/codemirror6/codemirror.bundle.js
rm -fr external/codemirror6/codemirror.bundle.js
echo "  Done."
echo ""


# skeleton
echo "  Step for packing:"
echo "  * ws_dist"
                    mkdir -p ws_dist
                    touch    ws_dist/index.html
                    mkdir -p ws_dist/external
                    touch    ws_dist/external/index.html
cp external/jquery.min.js    ws_dist/external
                    mkdir -p ws_dist/help
                    touch    ws_dist/help/index.html

#  hardware model + software model + core (simulation ctrl + UI)
echo "  * ws_dist/min.sim_all.js"
cat sim_core/sim_cfg.js \
    sim_core/sim_core_ga.js \
    sim_core/sim_adt_core.js \
    sim_core/sim_core_record.js \
    sim_core/sim_core_ctrl.js \
    sim_core/sim_core_ui.js \
    sim_core/sim_api_core.js \
    sim_core/sim_api_native.js \
    sim_core/sim_api_stateshots.js \
    sim_core/sim_core_voice.js \
    sim_core/sim_core_rest.js \
    sim_core/sim_core_notify.js \
    sim_core/sim_core_values.js \
    sim_core/sim_core_decode.js \
    sim_core/sim_adt_ctrlmemory.js \
    sim_core/sim_adt_mainmemory.js \
    sim_core/sim_adt_cachememory.js \
    \
    sim_hw/sim_hw_index.js \
    sim_hw/sim_hw_values.js \
    sim_hw/sim_hw_behavior.js \
    sim_hw/sim_hw_eltos.js \
    \
    sim_hw/hw_items/board_base.js \
    sim_hw/hw_items/mem_ep.js \
    sim_hw/hw_items/mem_rv.js \
    sim_hw/hw_items/mem_poc.js \
    sim_hw/hw_items/cpu_ep.js \
    sim_hw/hw_items/cpu_poc.js \
    sim_hw/hw_items/cpu_rv.js \
    sim_hw/hw_items/cu_poc.js \
    sim_hw/hw_items/io_clk_base.js \
    sim_hw/hw_items/io_screen_base.js \
    sim_hw/hw_items/io_keyboard_base.js \
    sim_hw/hw_items/io_ldm_base.js \
    sim_hw/hw_items/io_l3d_base.js \
    \
    sim_hw/hw_ep.js \
    sim_hw/hw_poc.js \
    sim_hw/hw_rv.js \
    \
    sim_sw/firmware/lexical.js \
    sim_sw/firmware/firm_mcode.js \
    sim_sw/firmware/firm_metadata.js \
    sim_sw/firmware/firm_begin.js \
    sim_sw/firmware/firm_pseudoinstructions.js \
    sim_sw/firmware/firm_registers.js \
    sim_sw/firmware/firm_fields_v1.js \
    sim_sw/firmware/firm_fields_v2.js \
    sim_sw/firmware/firm_instruction.js \
    sim_sw/firmware.js \
    sim_sw/assembly/lexical.js \
    sim_sw/assembly/memory_segments.js \
    sim_sw/assembly/directives.js \
    sim_sw/assembly/datatypes.js \
    sim_sw/assembly/compiler1_prepare_wepsim.js \
    sim_sw/assembly/compiler2_asm_obj.js \
    sim_sw/assembly/compiler3_obj2mem_wepsim.js \
    sim_sw/assembly/compiler_options.js \
    sim_sw/assembly/assembler.js \
    sim_sw/assembly/asm_2023.js \
    sim_sw/assembly.js > ws_dist/sim_all.js
terser -o ws_dist/min.sim_all.js ws_dist/sim_all.js
rm -fr ws_dist/sim_all.js

#  WepSIM internalization (i18n)
echo "  * ws_dist/help/..."
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
    wepsim_i18n/$LANG/compiler.js \
    wepsim_i18n/$LANG/hw.js \
    wepsim_i18n/$LANG/dialogs.js  >> ws_dist/wepsim_i18n.js
cp  wepsim_i18n/$LANG/simulator.html ws_dist/help/simulator-"$LANG".html
cp  wepsim_i18n/$LANG/about.html     ws_dist/help/about-"$LANG".html
done
terser -o ws_dist/min.wepsim_i18n.js ws_dist/wepsim_i18n.js
rm -fr ws_dist/wepsim_i18n.js

#  WepSIM web
echo "  * ws_dist/min.wepsim_core.js"
cat wepsim_core/wepsim_url.js \
    wepsim_core/wepsim_clipboard.js \
    wepsim_core/wepsim_preload_commands.js \
    wepsim_core/wepsim_preload.js \
    wepsim_core/wepsim_checkpoint.js \
    wepsim_core/wepsim_signal.js \
    wepsim_core/wepsim_state.js \
    wepsim_core/wepsim_execute.js \
    wepsim_core/wepsim_notify.js \
    \
    wepsim_core/wepsim_mode.js \
    wepsim_core/wepsim_share.js \
    wepsim_core/wepsim_dialog.js \
    wepsim_core/wepsim_example.js \
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
    wepsim_core/wepsim_dbg_breakpointicons.js > ws_dist/wepsim_core.js
terser -o ws_dist/min.wepsim_core.js ws_dist/wepsim_core.js
rm -fr ws_dist/wepsim_core.js

#  WepSIM web engine
cat wepsim_web/wepsim_uielto.js \
    wepsim_web/wepsim_uielto_cpu.js \
    wepsim_web/wepsim_uielto_mem.js \
    wepsim_web/wepsim_uielto_mem_config.js \
    wepsim_web/wepsim_uielto_cache.js \
    wepsim_web/wepsim_uielto_cache_config.js \
    wepsim_web/wepsim_uielto_registers.js \
    wepsim_web/wepsim_uielto_console.js \
    wepsim_web/wepsim_uielto_hw.js \
    wepsim_web/wepsim_uielto_io_info.js \
    wepsim_web/wepsim_uielto_io_config.js \
    wepsim_web/wepsim_uielto_l3d.js \
    wepsim_web/wepsim_uielto_ldm.js \
    wepsim_web/wepsim_uielto_editmc.js \
    wepsim_web/wepsim_uielto_editas.js \
    wepsim_web/wepsim_uielto_dbg_mc.js \
    wepsim_web/wepsim_uielto_bin_mc.js \
    wepsim_web/wepsim_uielto_dbg_asm.js \
    wepsim_web/wepsim_uielto_bin_asm.js \
    wepsim_web/wepsim_uielto_flash_asm.js \
    wepsim_web/wepsim_uielto_cpusvg.js \
    wepsim_web/wepsim_uielto_about.js \
    wepsim_web/wepsim_uielto_segments.js \
    wepsim_web/wepsim_uielto_topbar.js \
    wepsim_web/wepsim_uielto_notifications.js \
    wepsim_web/wepsim_uielto_states.js \
    wepsim_web/wepsim_uielto_help_hweltos.js \
    wepsim_web/wepsim_uielto_help_swset.js \
    wepsim_web/wepsim_uielto_slider_cpucu.js \
    wepsim_web/wepsim_uielto_slider_details.js \
    \
    wepsim_web/wepsim_uipacker_ddown_sel.js \
    wepsim_web/wepsim_uipacker_ddown_info.js \
    wepsim_web/wepsim_uipacker_cpu_cu.js \
    wepsim_web/wepsim_uipacker_cto_asm.js \
    wepsim_web/wepsim_uipacker_sim_mic_asm.js \
    \
    wepsim_web/wepsim_web_ui_config.js \
    wepsim_web/wepsim_web_ui_config_commands.js \
    wepsim_web/wepsim_web_ui_popover.js \
    wepsim_web/wepsim_web_ui_tooltip.js \
    wepsim_web/wepsim_web_ui_dialogs.js \
    wepsim_web/wepsim_web_ui_quickcfg.js \
    \
    wepsim_web/wepsim_uielto_loadfile.js \
    wepsim_web/wepsim_uielto_savefile.js \
    wepsim_web/wepsim_uielto_sharelink.js \
    wepsim_web/wepsim_uielto_listcfg.js \
    wepsim_web/wepsim_uielto_listexample.js \
    wepsim_web/wepsim_uielto_listprocessor.js \
    wepsim_web/wepsim_uielto_index_help.js \
    wepsim_web/wepsim_uielto_index_examples.js \
    wepsim_web/wepsim_uielto_index_config.js \
    \
    wepsim_web/wepsim_uielto_recordbar.js \
    wepsim_web/wepsim_uielto_executionbar.js \
    wepsim_web/wepsim_uielto_compilationbar.js \
    wepsim_web/wepsim_uielto_toolbar.js \
    \
    wepsim_web/wepsim_uiscreen_classic.js \
    wepsim_web/wepsim_uiscreen_compact.js \
    wepsim_web/wepsim_uiscreen_main.js \
    \
    wepsim_web/wepsim_web_api.js \
    wepsim_web/wepsim_web_editor.js \
    wepsim_web/wepsim_web_simulator.js > ws_dist/wepsim_webui.js
terser -o ws_dist/min.wepsim_webui.js ws_dist/wepsim_webui.js
rm -fr ws_dist/wepsim_webui.js

cat ws_dist/min.sim_all.js \
    ws_dist/min.wepsim_i18n.js \
    ws_dist/min.wepsim_core.js \
    ws_dist/min.wepsim_webui.js > ws_dist/min.wepsim_web.js
rm -fr ws_dist/min.wepsim_webui.js

#  WepSIM nodejs engine
echo "  * ws_dist/min.wepsim_node.js"
cat wepsim_nodejs/wepsim_node_adapt.js \
    ws_dist/min.sim_all.js \
    ws_dist/min.wepsim_i18n.js \
    ws_dist/min.wepsim_web.js \
    \
    wepsim_nodejs/wepsim_node_core.js \
    wepsim_nodejs/wepsim_node_action.js > ws_dist/min.wepsim_node.js

#  external
echo "  * ws_dist/min.external.js"
cat external/vue/vue.min.js \
    external/vue/vuex.min.js \
    external/popper.min.js \
    external/bootstrap/bootstrap.min.js \
    external/bootbox/bootbox.all.min.js \
    external/timbre.min.js \
    external/codemirror/codemirror.js \
    external/codemirror/mode/javascript/javascript.js \
    external/codemirror/mode/gas/gas.js \
    external/codemirror/keymap/sublime.js \
    external/codemirror/keymap/emacs.js \
    external/codemirror/keymap/vim.js \
    external/codemirror/addon/edit/matchbrackets.js \
    external/codemirror/addon/fold/foldcode.js \
    external/codemirror/addon/fold/foldgutter.js \
    external/codemirror/addon/fold/brace-fold.js \
    external/codemirror/addon/fold/xml-fold.js \
    external/codemirror/addon/fold/comment-fold.js \
    external/codemirror/addon/fold/indent-fold.js \
    external/codemirror/addon/fold/markdown-fold.js \
    external/codemirror/addon/hint/show-hint.js \
    external/codemirror/addon/runmode/colorize.js \
    external/codemirror/addon/comment/comment.js \
    external/codemirror/addon/comment/continuecomment.js \
    external/codemirror/addon/search/jump-to-line.js \
    external/codemirror/addon/search/searchcursor.js \
    external/codemirror/addon/search/search.js \
    external/codemirror/addon/dialog/dialog.js \
    external/jquery.knob.min.js \
    external/vis/vis-network.min.js \
    external/async.min.js \
    external/compress/lz-string.min.js \
    external/qrcode/qrcode.min.js \
    external/bootstrap-tokenfield.js \
    external/introjs/introjs.min.js \
    external/speech-input.js \
    external/annyang.min.js \
    external/speechkitt/speechkitt.min.js \
    external/dropify/dropify.min.js | grep -v sourceMappingURL > ws_dist/external.js
terser -o ws_dist/min.external.js ws_dist/external.js
rm -fr ws_dist/external.js

echo "  * ws_dist/min.external.css"
cat external/bootstrap/bootstrap.min.css \
    external/codemirror/codemirror.css \
    external/codemirror/theme/blackboard.css \
    external/codemirror/theme/eclipse.css \
    external/codemirror/theme/cobalt.css \
    external/codemirror/theme/idea.css \
    external/codemirror/theme/the-matrix.css \
    external/codemirror/theme/neat.css \
    external/codemirror/theme/abbott.css \
    external/codemirror/theme/mdn-like.css \
    external/codemirror/theme/duotone-light.css \
    external/codemirror/theme/erlang-dark.css \
    external/codemirror/addon/fold/foldgutter.css \
    external/codemirror/addon/hint/show-hint.css \
    external/codemirror/addon/dialog/dialog.css \
    external/vis/vis-network.min.css \
    external/bootstrap-tokenfield.css \
    external/introjs/introjs.min.css \
    external/speech-input.css \
    external/dropify/dropify.min.css \
    external/css-tricks.css | grep -v sourceMappingURL > ws_dist/min.external.css

echo "  * ws_dist/external/..."
cp    -a external/fontawesome           ws_dist/external
                                  touch ws_dist/external/fontawesome/index.html
cp    -a external/dropify               ws_dist/external/
                                  touch ws_dist/external/dropify/index.html
cp    -a external/speechkitt            ws_dist/external/
                                  touch ws_dist/external/speechkitt/index.html
cp    -a external/cordova.js            ws_dist/external/cordova.js

### default available examples
# MIPS
DEFAULT_EXAMPLE_SET="repo/examples_set/mips/es_ep.json repo/examples_set/mips/es_poc.json repo/examples_set/mips/es_ep_native.json repo/examples_set/mips/es_poc_native.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/mips/default.json
# MIPS instructive
DEFAULT_EXAMPLE_SET="repo/examples_set/mips/es_ep_instructive.json repo/examples_set/mips/es_poc_instructive.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/mips/default_instructive.json
# RV32
DEFAULT_EXAMPLE_SET="repo/examples_set/rv32/es_ep.json repo/examples_set/rv32/es_poc.json repo/examples_set/rv32/es_ep_native.json repo/examples_set/rv32/es_poc_native.json repo/examples_set/rv32/es_rv.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/rv32/default.json
# RV32 instructive
DEFAULT_EXAMPLE_SET="repo/examples_set/rv32/es_ep_instructive.json repo/examples_set/rv32/es_poc_instructive.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/rv32/default_instructive.json
# ARM
DEFAULT_EXAMPLE_SET="repo/examples_set/arm/es_ep.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/arm/default.json
# Z80
DEFAULT_EXAMPLE_SET="repo/examples_set/z80/es_ep.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/z80/default.json
# OpenCourseWare
DEFAULT_EXAMPLE_SET="repo/examples_set/mips_ocw/es_ep.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/mips_ocw/default.json
# Aula Global (UC3M)
DEFAULT_EXAMPLE_SET="repo/examples_set/rv32_ag/es_ep.json repo/examples_set/rv32_ag/es_poc.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/rv32_ag/default.json

#  examples
echo "  * ws_dist/repo/..."
cp -a repo    ws_dist/

#  docs
echo "  * ws_dist/docs/..."
cp -a docs    ws_dist/

#  images
echo "  * ws_dist/images/..."
cp -a images  ws_dist/

#  user interface
echo "  * ws_dist/*.html"
cp   wepsim_web/wepsim_web_classic.html   ws_dist/index.html
cp   wepsim_web/wepsim_web_classic.html   ws_dist/wepsim-classic.html
cp   wepsim_web/wepsim_web_compact.html   ws_dist/wepsim-compact.html
cp   wepsim_web/wepsim_web_null.html      ws_dist/wepsim-null.html
cp   wepsim_web/wepsim_web_pwa.js         ws_dist/min.wepsim_web_pwa.js

echo "  * ws_dist/*.sh"
cp   docs/manifest.webapp         ws_dist/
cp wepsim_nodejs/wepsim.sh        ws_dist/
chmod a+x ws_dist/*.sh

#  json: update processors
./ws_dist/wepsim.sh -a export-hardware -m ep  > ws_dist/repo/hardware/ep/hw_def.json
./ws_dist/wepsim.sh -a export-hardware -m poc > ws_dist/repo/hardware/poc/hw_def.json

# the end
echo ""
echo "  WepSIM packed in ws_dist (if no error was shown)."

