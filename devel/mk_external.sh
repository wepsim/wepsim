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


# welcome
echo ""
echo "  WepSIM (external) "
echo " -------------------"
echo ""
if [ $# -gt 0 ]; then
     set -x
fi

# external (1/12)...
mkdir -p  ./external2
touch     ./external2/index.html

echo " * jquery.min.js"
wget  --backups=0  -q  -O ./external2/jquery.min.js                  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js
echo " * popper.min.js"
wget  --backups=0  -q  -O ./external2/popper.min.js                  https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.8/umd/popper.min.js
echo " * async.min.js"
wget  --backups=0  -q  -O ./external2/async.min.js                   https://cdnjs.cloudflare.com/ajax/libs/async/3.2.6/async.min.js

echo " * jquery.knob.min.js"
wget  --backups=0  -q  -O ./external2/jquery.knob.min.js             https://cdnjs.cloudflare.com/ajax/libs/jQuery-Knob/1.2.13/jquery.knob.min.js
echo " * bootstrap-tokenfield..."
wget  --backups=0  -q  -O ./external2/bootstrap-tokenfield.css       https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tokenfield/0.12.0/css/bootstrap-tokenfield.css
wget  --backups=0  -q  -O ./external2/bootstrap-tokenfield.js        https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tokenfield/0.12.0/bootstrap-tokenfield.min.js
echo " * annyang.min.js"
wget  --backups=0  -q  -O ./external2/annyang.min.js                 https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js
echo " * tone.min.js"
wget  --backups=0  -q  -O ./external2/tone.min.js                    https://cdnjs.cloudflare.com/ajax/libs/tone/15.3.5/Tone.min.js

echo " * speech-input.js"
wget  --backups=0  -q  -O ./external2/speech-input.js                https://raw.githubusercontent.com/luchovelez/SpeechRecognition/refs/heads/master/speech-input.js
wget  --backups=0  -q  -O ./external2/speech-input.css               https://raw.githubusercontent.com/luchovelez/SpeechRecognition/refs/heads/master/speech-input.css


# external (2/12)...
mkdir -p  ./external2/bootbox
touch     ./external2/bootbox/index.html

echo " * bootbox.*"
wget  --backups=0  -q  -O ./external2/bootbox/bootbox.all.min.js             https://github.com/bootboxjs/bootbox/releases/download/v6.0.4/bootbox.all.min.js
wget  --backups=0  -q  -O ./external2/bootbox/bootbox.locales.min.js         https://github.com/bootboxjs/bootbox/releases/download/v6.0.4/bootbox.locales.min.js
wget  --backups=0  -q  -O ./external2/bootbox/bootbox.min.js                 https://github.com/bootboxjs/bootbox/releases/download/v6.0.4/bootbox.min.js


# external (3/12)...
mkdir -p  ./external2/bootstrap
touch     ./external2/bootstrap/index.html

echo " * bootstrap.min.*"
wget  --backups=0  -q  -O ./external2/bootstrap/bootstrap.min.css            https://raw.githubusercontent.com/twbs/bootstrap/refs/heads/main/dist/css/bootstrap.min.css
wget  --backups=0  -q  -O ./external2/bootstrap/bootstrap.min.css.map        https://raw.githubusercontent.com/twbs/bootstrap/refs/heads/main/dist/css/bootstrap.min.css.map
wget  --backups=0  -q  -O ./external2/bootstrap/bootstrap.min.js             https://raw.githubusercontent.com/twbs/bootstrap/refs/heads/main/dist/js/bootstrap.min.js
wget  --backups=0  -q  -O ./external2/bootstrap/bootstrap.min.js.map         https://raw.githubusercontent.com/twbs/bootstrap/refs/heads/main/dist/js/bootstrap.min.js.map


# external (4/12)...
mkdir -p  ./external2/codemirror6
touch     ./external2/codemirror6/index.html

echo " * codemirror6..."
cat > ./external2/codemirror6/codemirror.mjs << EOF

   import { basicSetup, EditorView }                    from "codemirror"
// import { languages }                                 from "@codemirror/language-data"
   import { javascript }                                from "@codemirror/lang-javascript"
   import { keymap }                                    from "@codemirror/view"
   import { defaultKeymap, history, historyKeymap }     from "@codemirror/commands"
// import { syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language"
   import { autocompletion }                            from "@codemirror/autocomplete"


   var view = new EditorView({
                      doc: "\n\n\n\n\n\n\n\n\n\n",
                      extensions: [
                         basicSetup,
                         history(),
                         keymap.of([...defaultKeymap, ...historyKeymap]),
                         javascript(),
                         syntaxHighlighting(defaultHighlightStyle),
                      ],
                      parent: document.body
              }) ;
EOF

cat > ./external2/codemirror6/rollup.config.mjs << EOF
import {nodeResolve} from "@rollup/plugin-node-resolve"
export default {
  input: "external2/codemirror6/codemirror.mjs",
  output: {
    file: "external2/codemirror6/codemirror.bundle.js",
    format: "iife"
  },
  plugins: [nodeResolve()]
}
EOF

node_modules/.bin/rollup -c ./external2/codemirror6/rollup.config.mjs
terser -o ./external2/codemirror6/min.codemirror.js     ./external2/codemirror6/codemirror.bundle.js
rm    -fr ./external2/codemirror6/codemirror.bundle.js


echo " * codemirror5...*"
mkdir -p  ./external2/codemirror
touch     ./external2/codemirror/index.html

wget  --backups=0  -q  -O /tmp/codemirror.zip       https://github.com/codemirror/codemirror5/archive/refs/tags/5.65.18.zip
unzip  -d /tmp/    -qao   /tmp/codemirror.zip

mv /tmp/codemirror5-5.65.18/src/codemirror.js      ./external2/codemirror/codemirror.js
mv /tmp/codemirror5-5.65.18/lib/codemirror.css     ./external2/codemirror/codemirror.css

mv /tmp/codemirror5-5.65.18/theme/                 ./external2/codemirror/theme/
sed "s/59554f/36312e/g" ./external2/codemirror/theme/bespin.css         > /tmp/xch.txt
mv /tmp/xch.txt         ./external2/codemirror/theme/bespin.css
sed "s/a7a5b2/6c6783/g" ./external2/codemirror/theme/duotone-dark.css   > /tmp/xch.txt
mv /tmp/xch.txt         ./external2/codemirror/theme/duotone-dark.css
sed "s/6f6e6a/b6ad9a/g" ./external2/codemirror/theme/duotone-light.css  > /tmp/xch.txt
mv /tmp/xch.txt         ./external2/codemirror/theme/duotone-light.css

mkdir -p ./external2/codemirror/addon/
touch    ./external2/codemirror/addon/index.html
mv /tmp/codemirror5-5.65.18/addon/comment          ./external2/codemirror/addon/
mv /tmp/codemirror5-5.65.18/addon/dialog           ./external2/codemirror/addon/
mv /tmp/codemirror5-5.65.18/addon/edit             ./external2/codemirror/addon/
mv /tmp/codemirror5-5.65.18/addon/fold             ./external2/codemirror/addon/
mv /tmp/codemirror5-5.65.18/addon/hint             ./external2/codemirror/addon/
mv /tmp/codemirror5-5.65.18/addon/runmode          ./external2/codemirror/addon/
mv /tmp/codemirror5-5.65.18/addon/search           ./external2/codemirror/addon/

mkdir -p ./external2/codemirror/keymap/
touch    ./external2/codemirror/keymap/index.html
mv /tmp/codemirror5-5.65.18/keymap/emacs.js        ./external2/codemirror/keymap/
mv /tmp/codemirror5-5.65.18/keymap/sublime.js      ./external2/codemirror/keymap/
wget --backups=0  -q  -O                           ./external2/codemirror/keymap/vim.js    https://raw.githubusercontent.com/replit/codemirror-vim/refs/heads/master/src/vim.js

mkdir -p ./external2/codemirror/mode/
touch    ./external2/codemirror/mode/index.html
mv /tmp/codemirror5-5.65.18/mode/gas               ./external2/codemirror/mode/
mv /tmp/codemirror5-5.65.18/mode/javascript        ./external2/codemirror/mode/

rm -fr /tmp/codemirror.zip


# external (5/12)...
mkdir -p  ./external2/compress
touch     ./external2/compress/index.html

echo " * lz-string.min.js"
wget  --backups=0  -q  -O ./external2/compress/lz-string.min.js              https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js


# external (6/12)...
mkdir -p  ./external2/dropify
touch     ./external2/dropify/index.html

echo " * dropify.*"
wget  --backups=0  -q  -O ./external2/dropify/dropify.min.js                 https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/js/dropify.min.js
wget  --backups=0  -q  -O ./external2/dropify/dropify.min.css                https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/css/dropify.min.css
wget  --backups=0  -q  -O ./external2/dropify/dropify.eot                    https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/fonts/dropify.eot
wget  --backups=0  -q  -O ./external2/dropify/dropify.svg                    https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/fonts/dropify.svg
wget  --backups=0  -q  -O ./external2/dropify/dropify.ttf                    https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/fonts/dropify.ttf
wget  --backups=0  -q  -O ./external2/dropify/dropify.woff                   https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/fonts/dropify.woff


# external (7/12)...
wget  --backups=0  -q  -O /tmp/fontawesome.zip        https://github.com/FortAwesome/Font-Awesome/releases/download/6.6.0/fontawesome-free-6.6.0-web.zip
unzip  -d /tmp/    -qao   /tmp/fontawesome.zip

echo " * fontawesome..."
mkdir -p  ./external2/fontawesome
touch     ./external2/fontawesome/index.html
mv /tmp/fontawesome-free-6.6.0-web/LICENSE.txt        ./external2/fontawesome/LICENSE.txt

mkdir -p  ./external2/fontawesome/css
touch     ./external2/fontawesome/css/index.html

mv /tmp/fontawesome-free-6.6.0-web/css/fontawesome.min.css            ./external2/fontawesome/css/fontawesome.min.css
mv /tmp/fontawesome-free-6.6.0-web/css/all.min.css                    ./external2/fontawesome/css/all.min.css
mv /tmp/fontawesome-free-6.6.0-web/css/regular.min.css                ./external2/fontawesome/css/regular.min.css
mv /tmp/fontawesome-free-6.6.0-web/css/solid.min.css                  ./external2/fontawesome/css/solid.min.css
mv /tmp/fontawesome-free-6.6.0-web/css/brands.min.css                 ./external2/fontawesome/css/brands.min.css
mv /tmp/fontawesome-free-6.6.0-web/css/svg-with-js.min.css            ./external2/fontawesome/css/svg-with-js.min.css

mkdir -p  ./external2/fontawesome/webfonts
touch     ./external2/fontawesome/webfonts/index.html

mv /tmp/fontawesome-free-6.6.0-web/webfonts/fa-regular-400.woff2      ./external2/fontawesome/webfonts/fa-regular-400.woff2
mv /tmp/fontawesome-free-6.6.0-web/webfonts/fa-brands-400.woff2       ./external2/fontawesome/webfonts/fa-brands-400.woff2
mv /tmp/fontawesome-free-6.6.0-web/webfonts/fa-solid-900.ttf          ./external2/fontawesome/webfonts/fa-solid-900.ttf
mv /tmp/fontawesome-free-6.6.0-web/webfonts/fa-regular-400.ttf        ./external2/fontawesome/webfonts/fa-regular-400.ttf
mv /tmp/fontawesome-free-6.6.0-web/webfonts/fa-solid-900.woff2        ./external2/fontawesome/webfonts/fa-solid-900.woff2
mv /tmp/fontawesome-free-6.6.0-web/webfonts/fa-brands-400.ttf         ./external2/fontawesome/webfonts/fa-brands-400.ttf

mkdir -p  ./external2/fontawesome/js
touch     ./external2/fontawesome/js/index.html

mv /tmp/fontawesome-free-6.6.0-web/js/all.min.js                      ./external2/fontawesome/js/all.min.js
mv /tmp/fontawesome-free-6.6.0-web/js/solid.min.js                    ./external2/fontawesome/js/solid.min.js
mv /tmp/fontawesome-free-6.6.0-web/js/regular.min.js                  ./external2/fontawesome/js/regular.min.js
mv /tmp/fontawesome-free-6.6.0-web/js/brands.min.js                   ./external2/fontawesome/js/brands.min.js
mv /tmp/fontawesome-free-6.6.0-web/js/conflict-detection.min.js       ./external2/fontawesome/js/conflict-detection.min.js
mv /tmp/fontawesome-free-6.6.0-web/js/fontawesome.min.js              ./external2/fontawesome/js/fontawesome.min.js

rm -fr /tmp/fontawesome-free-6.6.0-web


# external (8/12)...
mkdir -p  ./external2/introjs
touch     ./external2/introjs/index.html

echo " * introjs.min.*"
wget  --backups=0  -q  -O ./external2/introjs/introjs.min.css                https://cdnjs.cloudflare.com/ajax/libs/intro.js/8.3.2/introjs.min.css
wget  --backups=0  -q  -O ./external2/introjs/introjs.min.css.map            https://cdnjs.cloudflare.com/ajax/libs/intro.js/8.3.2/introjs.min.css.map
wget  --backups=0  -q  -O ./external2/introjs/introjs.min.js                 https://cdnjs.cloudflare.com/ajax/libs/intro.js/8.3.2/intro.min.js
wget  --backups=0  -q  -O ./external2/introjs/introjs.min.js.map             https://cdnjs.cloudflare.com/ajax/libs/intro.js/8.3.2/intro.min.js.map


# external (9/12)...
mkdir -p  ./external2/qrcode
touch     ./external2/qrcode/index.html

echo " * qrcode.min.js"
wget  --backups=0  -q  -O ./external2/qrcode/qrcode.min.js                   https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js


# external (10/12)...
mkdir -p  ./external2/speechkitt
touch     ./external2/speechkitt/index.html
mkdir -p  ./external2/speechkitt/themes
touch     ./external2/speechkitt/themes/index.html

echo " * speechkitt.*"
wget  --backups=0  -q  -O ./external2/speechkitt/speechkitt.flat.css         https://raw.githubusercontent.com/TalAter/SpeechKITT/refs/heads/master/dist/themes/flat.css
wget  --backups=0  -q  -O ./external2/speechkitt/speechkitt.min.js           https://raw.githubusercontent.com/TalAter/SpeechKITT/refs/heads/master/dist/speechkitt.min.js
wget  --backups=0  -q  -O ./external2/speechkitt/themes/flat.css             https://raw.githubusercontent.com/TalAter/SpeechKITT/refs/heads/master/dist/themes/flat.css
wget  --backups=0  -q  -O ./external2/speechkitt/themes/flat.css.map         https://raw.githubusercontent.com/TalAter/SpeechKITT/refs/heads/master/dist/themes/flat.css.map


# external (11/12)...
mkdir -p  ./external2/vis
touch     ./external2/vis/index.html

echo " * vis-network.min.*"
wget  --backups=0  -q  -O ./external2/vis/vis-network.min.css                https://cdnjs.cloudflare.com/ajax/libs/vis-network/10.0.2/dist/dist/vis-network.min.css
wget  --backups=0  -q  -O ./external2/vis/vis-network.min.js                 https://cdnjs.cloudflare.com/ajax/libs/vis-network/10.0.2/dist/vis-network.min.js


# external (12/12)...
mkdir -p  ./external2/vue
touch     ./external2/vue/index.html

echo " * vue*.min.js"
wget  --backups=0  -q  -O ./external2/vue/vue.min.js                         https://cdnjs.cloudflare.com/ajax/libs/vue/2.7.16/vue.min.js
wget  --backups=0  -q  -O ./external2/vue/vuex.min.js                        https://cdnjs.cloudflare.com/ajax/libs/vuex/3.6.2/vuex.min.js


# farewell
echo ""
echo "  Done."

