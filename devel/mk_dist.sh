#!/bin/sh
#set -x


#*
#*  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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


### Welcome
echo ""
echo "  WepSIM packer"
echo " ---------------"
echo ""


### Arguments
while getopts 'vdh' opt; do
  case "$opt" in
    v)
      echo "  getopts: processing verbose..."
      echo ""
      set -x
      ;;

    d)
      echo "  Please install first:"
      echo ""
      cat "$(dirname $0)"/install_prereq.sh | sed "s/^/     /g" | grep -v "set -x" | grep -v "/bin/bash"
      echo ""
      exit
      ;;

    ?|h)
      echo "  Usage: "$(basename $0)" [-v] [-d]"
      echo ""
      exit 1
      ;;
  esac
done
shift "$(($OPTIND -1))"


### Install npm dependencies
echo "  Step for npm dependencies to install/update:"
echo "  npm install"
npm install
echo "  Done."
echo ""


### Make skeleton
echo "  Step for inital directory tree:"
echo "  * ws_dist/..."
     mkdir -p ws_dist
     touch    ws_dist/index.html
     mkdir -p ws_dist/help
     touch    ws_dist/help/index.html

echo "  * ws_dist/external/..."
     mkdir -p ws_dist/external
                                       touch ws_dist/external/index.html
     cp    -a external/fontawesome           ws_dist/external
                                       touch ws_dist/external/fontawesome/index.html
     cp    -a external/dropify               ws_dist/external/
                                       touch ws_dist/external/dropify/index.html
     cp    -a external/speechkitt            ws_dist/external/
                                       touch ws_dist/external/speechkitt/index.html
     cp    -a external/cordova.js            ws_dist/external/cordova.js
     cp    -a external/jquery.min.js         ws_dist/external/jquery.min.js

echo "  * ws_dist/docs/..."
     cp -a docs    ws_dist/

echo "  * ws_dist/images/..."
     cp -a images  ws_dist/

echo "  * ws_dist/*.sh"
     cp  docs/manifest.webapp          ws_dist/
     cp  src/wepsim_nodejs/wepsim.sh   ws_dist/
     chmod a+x                         ws_dist/*.sh

echo "  * ws_dist/*.html"
     cp   src/wepsim_web/wepsim_web_classic.html   ws_dist/index.html
     cp   src/wepsim_web/wepsim_web_classic.html   ws_dist/wepsim-classic.html
     cp   src/wepsim_web/wepsim_web_compact.html   ws_dist/wepsim-compact.html
     cp   src/wepsim_web/wepsim_web_null.html      ws_dist/wepsim-null.html
     cp   src/wepsim_web/wepsim_web_pwa.js         ws_dist/min.wepsim_web_pwa.js

echo "  * ws_dist/help/..."
for LANG in es en fr kr ja it pt hi zh_cn ru sv de; do
     cp  src/wepsim_i18n/$LANG/simulator.html      ws_dist/help/simulator-"$LANG".html
     cp  src/wepsim_i18n/$LANG/about.html          ws_dist/help/about-"$LANG".html
done

echo "  Done."
echo ""


### Packing
echo "  Step for packing min.*:"

BASE_DIR=$(dirname $0)/webpack_indexes/

# building cat_indexes/min.wepsim_i18n.js
    echo "export * from '../../src/wepsim_i18n/i18n.js';"                         > "${BASE_DIR}"/min.wepsim_i18n.js
    echo ""                                                                      >> "${BASE_DIR}"/min.wepsim_i18n.js
for LANG in es en fr kr ja it pt hi zh_cn ru sv de; do
    echo "export * from '../../src/wepsim_i18n/$LANG/gui.js';"                   >> "${BASE_DIR}"/min.wepsim_i18n.js
    echo "export * from '../../src/wepsim_i18n/$LANG/tutorial-welcome.js';"      >> "${BASE_DIR}"/min.wepsim_i18n.js
    echo "export * from '../../src/wepsim_i18n/$LANG/tutorial-simpleusage.js';"  >> "${BASE_DIR}"/min.wepsim_i18n.js
    echo "export * from '../../src/wepsim_i18n/$LANG/tour-intro.js';"            >> "${BASE_DIR}"/min.wepsim_i18n.js
    echo "export * from '../../src/wepsim_i18n/$LANG/cfg.js';"                   >> "${BASE_DIR}"/min.wepsim_i18n.js
    echo "export * from '../../src/wepsim_i18n/$LANG/help.js';"                  >> "${BASE_DIR}"/min.wepsim_i18n.js
    echo "export * from '../../src/wepsim_i18n/$LANG/states.js';"                >> "${BASE_DIR}"/min.wepsim_i18n.js
    echo "export * from '../../src/wepsim_i18n/$LANG/examples.js';"              >> "${BASE_DIR}"/min.wepsim_i18n.js
    echo "export * from '../../src/wepsim_i18n/$LANG/compiler.js';"              >> "${BASE_DIR}"/min.wepsim_i18n.js
    echo "export * from '../../src/wepsim_i18n/$LANG/hw.js';"                    >> "${BASE_DIR}"/min.wepsim_i18n.js
    echo "export * from '../../src/wepsim_i18n/$LANG/dialogs.js';"               >> "${BASE_DIR}"/min.wepsim_i18n.js
    echo ""                                                                      >> "${BASE_DIR}"/min.wepsim_i18n.js
done

# building cat_indexes/min.wepsim_web.js
echo ""                                        > "${BASE_DIR}"/min.wepsim_web.js
cat "${BASE_DIR}"/min.sim_all.js              >> "${BASE_DIR}"/min.wepsim_web.js
cat "${BASE_DIR}"/min.wepsim_i18n.js          >> "${BASE_DIR}"/min.wepsim_web.js
cat "${BASE_DIR}"/min.wepsim_core.js          >> "${BASE_DIR}"/min.wepsim_web.js
cat "${BASE_DIR}"/min.wepsim_webui.js         >> "${BASE_DIR}"/min.wepsim_web.js

# building cat_indexes/min.wepsim_node.js
echo ""                                        > "${BASE_DIR}"/min.wepsim_node.js
cat "${BASE_DIR}"/min.wepsim_node-begin.js    >> "${BASE_DIR}"/min.wepsim_node.js
cat "${BASE_DIR}"/min.sim_all.js              >> "${BASE_DIR}"/min.wepsim_node.js
cat "${BASE_DIR}"/min.wepsim_i18n.js          >> "${BASE_DIR}"/min.wepsim_node.js
cat "${BASE_DIR}"/min.wepsim_core.js          >> "${BASE_DIR}"/min.wepsim_node.js
cat "${BASE_DIR}"/min.wepsim_node-end.js      >> "${BASE_DIR}"/min.wepsim_node.js

# building ws_dist/min.*.js
npm run pack

#  external - codemirror6
cp devel/external_glue/codemirror.mjs                ./external/codemirror6/codemirror.mjs
cp devel/external_glue/codemirror.rollup.config.mjs  ./external/codemirror6/rollup.config.mjs
                         node_modules/.bin/rollup -c ./external/codemirror6/rollup.config.mjs
terser -o ./external/codemirror6/min.codemirror.js   ./external/codemirror6/codemirror.bundle.js
rm -fr                                               ./external/codemirror6/codemirror.bundle.js

#  building ws_dist/min.external.js
echo "  * ws_dist/min.external.js"
cat external/vue/vue.min.js \
    external/vue/vuex.min.js \
    external/popper.min.js \
    external/bootstrap/bootstrap.min.js \
    external/bootbox/bootbox.all.min.js \
    external/tone.min.js \
    external/codemirror6/min.codemirror.js \
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
terser --comments -o ws_dist/min.external.js ws_dist/external.js
rm -fr ws_dist/external.js

# building ws_dist/min.external.css
echo "  * ws_dist/min.external.css"
cat external/bootstrap/bootstrap.min.css \
    external/vis/vis-network.min.css \
    external/bootstrap-tokenfield.css \
    external/introjs/introjs.min.css \
    external/speech-input.css \
    external/dropify/dropify.min.css \
    external/css-tricks.css | grep -v sourceMappingURL > ws_dist/min.external.css

echo "  Done."
echo ""


### Default available examples
echo "  Step for packing repo/:"

# MIPS
DEFAULT_EXAMPLE_SET_P1="repo/examples_set/mips/es_ep.json  repo/examples_set/mips/es_ep_native.json"
DEFAULT_EXAMPLE_SET_P2="repo/examples_set/mips/es_ep2.json repo/examples_set/mips/es_ep2_native.json"
DEFAULT_EXAMPLE_SET_P3="repo/examples_set/mips/es_poc.json repo/examples_set/mips/es_poc_native.json"
DEFAULT_EXAMPLE_SET="$DEFAULT_EXAMPLE_SET_P1 $DEFAULT_EXAMPLE_SET_P2 $DEFAULT_EXAMPLE_SET_P3"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/mips/default.json

# MIPS instructive
DEFAULT_EXAMPLE_SET="repo/examples_set/mips/es_ep_instructive.json repo/examples_set/mips/es_poc_instructive.json     repo/examples_set/mips/es_ep2_instructive.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/mips/default_instructive.json

# RV32
DEFAULT_EXAMPLE_SET_P1="repo/examples_set/rv32/es_ep.json  repo/examples_set/rv32/es_ep_native.json"
DEFAULT_EXAMPLE_SET_P2="repo/examples_set/rv32/es_ep2.json repo/examples_set/rv32/es_ep2_native.json"
DEFAULT_EXAMPLE_SET_P3="repo/examples_set/rv32/es_poc.json repo/examples_set/rv32/es_poc_native.json"
DEFAULT_EXAMPLE_SET_P4="repo/examples_set/rv32/es_rv.json"
DEFAULT_EXAMPLE_SET="$DEFAULT_EXAMPLE_SET_P1 $DEFAULT_EXAMPLE_SET_P2 $DEFAULT_EXAMPLE_SET_P3 $DEFAULT_EXAMPLE_SET_P4"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/rv32/default.json

# RV32 instructive
DEFAULT_EXAMPLE_SET="repo/examples_set/rv32/es_ep_instructive.json repo/examples_set/rv32/es_poc_instructive.json     repo/examples_set/rv32/es_ep2_instructive.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/rv32/default_instructive.json

# ARM
DEFAULT_EXAMPLE_SET="repo/examples_set/arm/es_ep.json          repo/examples_set/arm/es_ep2.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/arm/default.json

# Z80
DEFAULT_EXAMPLE_SET="repo/examples_set/z80/es_ep.json          repo/examples_set/z80/es_ep2.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/z80/default.json

# OpenCourseWare
DEFAULT_EXAMPLE_SET="repo/examples_set/mips_ocw/es_ep.json     repo/examples_set/mips_ocw/es_ep2.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/mips_ocw/default.json

# Aula Global (UC3M)
DEFAULT_EXAMPLE_SET="repo/examples_set/rv32_ag/es_ep.json repo/examples_set/rv32_ag/es_poc.json       repo/examples_set/rv32_ag/es_ep2.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > repo/examples_set/rv32_ag/default.json

echo "  * ws_dist/repo/..."
cp -a repo    ws_dist/

echo "  Done."
echo ""

#  json: update processors
./ws_dist/wepsim.sh -a export-hardware -m ep  > ws_dist/repo/hardware/ep/hw_def.json
./ws_dist/wepsim.sh -a export-hardware -m ep2 > ws_dist/repo/hardware/ep2/hw_def.json
./ws_dist/wepsim.sh -a export-hardware -m poc > ws_dist/repo/hardware/poc/hw_def.json
./ws_dist/wepsim.sh -a export-hardware -m rv  > ws_dist/repo/hardware/rv/hw_def.json

# the end
echo "  WepSIM packed in ws_dist (if no error was shown)."
echo ""

