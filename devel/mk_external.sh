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
mkdir -p  ./external
touch     ./external/index.html

echo " * jquery.min.js"
wget  --backups=0  -q  -O ./external/jquery.min.js                  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js
echo " * popper.min.js"
wget  --backups=0  -q  -O ./external/popper.min.js                  https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.8/umd/popper.min.js
echo " * async.min.js"
wget  --backups=0  -q  -O ./external/async.min.js                   https://cdnjs.cloudflare.com/ajax/libs/async/3.2.6/async.min.js

echo " * jquery.knob.min.js"
wget  --backups=0  -q  -O ./external/jquery.knob.min.js             https://cdnjs.cloudflare.com/ajax/libs/jQuery-Knob/1.2.13/jquery.knob.min.js
echo " * bootstrap-tokenfield..."
wget  --backups=0  -q  -O ./external/bootstrap-tokenfield.css       https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tokenfield/0.12.0/css/bootstrap-tokenfield.css
wget  --backups=0  -q  -O ./external/bootstrap-tokenfield.js        https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tokenfield/0.12.0/bootstrap-tokenfield.min.js
echo " * annyang.min.js"
wget  --backups=0  -q  -O ./external/annyang.min.js                 https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js
echo " * tone.min.js"
wget  --backups=0  -q  -O ./external/tone.min.js                    https://cdnjs.cloudflare.com/ajax/libs/tone/15.3.5/Tone.min.js

echo " * speech-input.js"
wget  --backups=0  -q  -O ./external/speech-input.js                https://raw.githubusercontent.com/luchovelez/SpeechRecognition/refs/heads/master/speech-input.js
wget  --backups=0  -q  -O ./external/speech-input.css               https://raw.githubusercontent.com/luchovelez/SpeechRecognition/refs/heads/master/speech-input.css


# external (2/12)...
mkdir -p  ./external/bootbox
touch     ./external/bootbox/index.html

echo " * bootbox.*"
echo ""                 > ./external/bootbox/bootbox.all.min.js-1
wget  --backups=0  -q  -O ./external/bootbox/bootbox.all.min.js-2         https://github.com/bootboxjs/bootbox/releases/download/v6.0.4/bootbox.all.min.js
cat    ./external/bootbox/bootbox.all.min.js-1 ./external/bootbox/bootbox.all.min.js-2 > ./external/bootbox/bootbox.all.min.js
rm -fr ./external/bootbox/bootbox.all.min.js-1 ./external/bootbox/bootbox.all.min.js-2

echo ""                 > ./external/bootbox/bootbox.locales.min.js-1
wget  --backups=0  -q  -O ./external/bootbox/bootbox.locales.min.js-2     https://github.com/bootboxjs/bootbox/releases/download/v6.0.4/bootbox.locales.min.js
cat    ./external/bootbox/bootbox.locales.min.js-1 ./external/bootbox/bootbox.locales.min.js-2 > ./external/bootbox/bootbox.locales.min.js
rm -fr ./external/bootbox/bootbox.locales.min.js-1 ./external/bootbox/bootbox.locales.min.js-2

echo ""                 > ./external/bootbox/bootbox.min.js-1
wget  --backups=0  -q  -O ./external/bootbox/bootbox.min.js-2             https://github.com/bootboxjs/bootbox/releases/download/v6.0.4/bootbox.min.js
cat    ./external/bootbox/bootbox.min.js-1 ./external/bootbox/bootbox.min.js-2 > ./external/bootbox/bootbox.min.js
rm -fr ./external/bootbox/bootbox.min.js-1 ./external/bootbox/bootbox.min.js-2


# external (3/12)...
mkdir -p  ./external/bootstrap
touch     ./external/bootstrap/index.html

echo " * bootstrap.min.*"
wget  --backups=0  -q  -O ./external/bootstrap/bootstrap.min.css            https://raw.githubusercontent.com/twbs/bootstrap/refs/heads/main/dist/css/bootstrap.min.css
wget  --backups=0  -q  -O ./external/bootstrap/bootstrap.min.css.map        https://raw.githubusercontent.com/twbs/bootstrap/refs/heads/main/dist/css/bootstrap.min.css.map
wget  --backups=0  -q  -O ./external/bootstrap/bootstrap.min.js             https://raw.githubusercontent.com/twbs/bootstrap/refs/heads/main/dist/js/bootstrap.min.js
wget  --backups=0  -q  -O ./external/bootstrap/bootstrap.min.js.map         https://raw.githubusercontent.com/twbs/bootstrap/refs/heads/main/dist/js/bootstrap.min.js.map


# external (4/12)...
mkdir -p  ./external/codemirror6
touch     ./external/codemirror6/index.html

echo " * codemirror6..."
cp devel/external_glue/codemirror.mjs     ./external/codemirror6/codemirror.mjs 
cp devel/external_glue/rollup.config.mjs  ./external/codemirror6/rollup.config.mjs

node_modules/.bin/rollup -c ./external/codemirror6/rollup.config.mjs
terser -o ./external/codemirror6/min.codemirror.js ./external/codemirror6/codemirror.bundle.js
rm -fr                                             ./external/codemirror6/codemirror.bundle.js


echo " * codemirror5...*"
mkdir -p  ./external/codemirror
touch     ./external/codemirror/index.html

## wget  --backups=0  -q  -O /tmp/codemirror.zip       https://github.com/codemirror/codemirror5/archive/refs/tags/5.65.18.zip
## unzip  -d /tmp/    -qao   /tmp/codemirror.zip
## 
## mv /tmp/codemirror5-5.65.18/src/codemirror.js      ./external/codemirror/codemirror.js
## mv /tmp/codemirror5-5.65.18/lib/codemirror.css     ./external/codemirror/codemirror.css
## 
## mv /tmp/codemirror5-5.65.18/theme/                 ./external/codemirror/theme/
## sed "s/59554f/36312e/g" ./external/codemirror/theme/bespin.css         > /tmp/xch.txt
## mv /tmp/xch.txt         ./external/codemirror/theme/bespin.css
## sed "s/a7a5b2/6c6783/g" ./external/codemirror/theme/duotone-dark.css   > /tmp/xch.txt
## mv /tmp/xch.txt         ./external/codemirror/theme/duotone-dark.css
## sed "s/6f6e6a/b6ad9a/g" ./external/codemirror/theme/duotone-light.css  > /tmp/xch.txt
## mv /tmp/xch.txt         ./external/codemirror/theme/duotone-light.css
## 
## touch  ./external/codemirror/theme/index.html
## 
## mkdir -p ./external/codemirror/addon/
## touch    ./external/codemirror/addon/index.html
## mv /tmp/codemirror5-5.65.18/addon/comment          ./external/codemirror/addon/
## mv /tmp/codemirror5-5.65.18/addon/dialog           ./external/codemirror/addon/
## mv /tmp/codemirror5-5.65.18/addon/edit             ./external/codemirror/addon/
## mv /tmp/codemirror5-5.65.18/addon/fold             ./external/codemirror/addon/
## mv /tmp/codemirror5-5.65.18/addon/hint             ./external/codemirror/addon/
## mv /tmp/codemirror5-5.65.18/addon/runmode          ./external/codemirror/addon/
## mv /tmp/codemirror5-5.65.18/src/addon/runmode/*    ./external/codemirror/addon/runmode/
## mv /tmp/codemirror5-5.65.18/addon/search           ./external/codemirror/addon/
## 
## touch ./external/codemirror/addon/comment/index.html
## touch ./external/codemirror/addon/dialog/index.html
## touch ./external/codemirror/addon/edit/index.html
## touch ./external/codemirror/addon/fold/index.html
## touch ./external/codemirror/addon/hint/index.html
## touch ./external/codemirror/addon/runmode/index.html
## touch ./external/codemirror/addon/search/index.html
## 
## mkdir -p ./external/codemirror/keymap/
## touch    ./external/codemirror/keymap/index.html
## mv /tmp/codemirror5-5.65.18/keymap/emacs.js        ./external/codemirror/keymap/
## mv /tmp/codemirror5-5.65.18/keymap/sublime.js      ./external/codemirror/keymap/
## wget --backups=0  -q  -O                           ./external/codemirror/keymap/vim.js    https://raw.githubusercontent.com/replit/codemirror-vim/refs/heads/master/src/vim.js
## 
## mkdir -p ./external/codemirror/mode/
## touch    ./external/codemirror/mode/index.html
## mv /tmp/codemirror5-5.65.18/mode/gas               ./external/codemirror/mode/
## mv /tmp/codemirror5-5.65.18/mode/javascript        ./external/codemirror/mode/
## 
## rm -fr /tmp/codemirror.zip


# external (5/12)...
mkdir -p  ./external/compress
touch     ./external/compress/index.html

echo " * lz-string.min.js"
wget  --backups=0  -q  -O ./external/compress/lz-string.min.js              https://cdnjs.cloudflare.com/ajax/libs/lz-string/1.5.0/lz-string.min.js


# external (6/12)...
mkdir -p  ./external/dropify
touch     ./external/dropify/index.html

echo " * dropify.*"
wget  --backups=0  -q  -O ./external/dropify/dropify.min.js                 https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/js/dropify.min.js
wget  --backups=0  -q  -O ./external/dropify/dropify.min.css                https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/css/dropify.min.css
wget  --backups=0  -q  -O ./external/dropify/dropify.eot                    https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/fonts/dropify.eot
wget  --backups=0  -q  -O ./external/dropify/dropify.svg                    https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/fonts/dropify.svg
wget  --backups=0  -q  -O ./external/dropify/dropify.ttf                    https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/fonts/dropify.ttf
wget  --backups=0  -q  -O ./external/dropify/dropify.woff                   https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/fonts/dropify.woff

sed "s/\.\.\/fonts/\.\/external\/dropify/g" external/dropify/dropify.min.css > /tmp/$$.css
mv /tmp/$$.css external/dropify/dropify.min.css


# external (7/12)...
wget  --backups=0  -q  -O /tmp/fontawesome.zip        https://github.com/FortAwesome/Font-Awesome/releases/download/7.2.0/fontawesome-free-7.2.0-web.zip
unzip  -d /tmp/    -qao   /tmp/fontawesome.zip

echo " * fontawesome..."
mkdir -p  ./external/fontawesome
touch     ./external/fontawesome/index.html
mv /tmp/fontawesome-free-7.2.0-web/LICENSE.txt        ./external/fontawesome/LICENSE.txt

mkdir -p  ./external/fontawesome/css
touch     ./external/fontawesome/css/index.html

mv /tmp/fontawesome-free-7.2.0-web/css/fontawesome.min.css            ./external/fontawesome/css/fontawesome.min.css
mv /tmp/fontawesome-free-7.2.0-web/css/all.min.css                    ./external/fontawesome/css/all.min.css
mv /tmp/fontawesome-free-7.2.0-web/css/regular.min.css                ./external/fontawesome/css/regular.min.css
mv /tmp/fontawesome-free-7.2.0-web/css/solid.min.css                  ./external/fontawesome/css/solid.min.css
mv /tmp/fontawesome-free-7.2.0-web/css/brands.min.css                 ./external/fontawesome/css/brands.min.css
mv /tmp/fontawesome-free-7.2.0-web/css/svg-with-js.min.css            ./external/fontawesome/css/svg-with-js.min.css

mkdir -p  ./external/fontawesome/webfonts
touch     ./external/fontawesome/webfonts/index.html

mv /tmp/fontawesome-free-7.2.0-web/webfonts/fa-regular-400.woff2      ./external/fontawesome/webfonts/fa-regular-400.woff2
mv /tmp/fontawesome-free-7.2.0-web/webfonts/fa-brands-400.woff2       ./external/fontawesome/webfonts/fa-brands-400.woff2
mv /tmp/fontawesome-free-7.2.0-web/webfonts/fa-solid-900.woff2        ./external/fontawesome/webfonts/fa-solid-900.woff2

mkdir -p  ./external/fontawesome/js
touch     ./external/fontawesome/js/index.html

mv /tmp/fontawesome-free-7.2.0-web/js/all.min.js                      ./external/fontawesome/js/all.min.js
mv /tmp/fontawesome-free-7.2.0-web/js/solid.min.js                    ./external/fontawesome/js/solid.min.js
mv /tmp/fontawesome-free-7.2.0-web/js/regular.min.js                  ./external/fontawesome/js/regular.min.js
mv /tmp/fontawesome-free-7.2.0-web/js/brands.min.js                   ./external/fontawesome/js/brands.min.js
mv /tmp/fontawesome-free-7.2.0-web/js/conflict-detection.min.js       ./external/fontawesome/js/conflict-detection.min.js
mv /tmp/fontawesome-free-7.2.0-web/js/fontawesome.min.js              ./external/fontawesome/js/fontawesome.min.js

rm -fr /tmp/fontawesome-free-7.2.0-web


# external (8/12)...
mkdir -p  ./external/introjs
touch     ./external/introjs/index.html

echo " * introjs.min.*"
wget  --backups=0  -q  -O ./external/introjs/introjs.min.css                https://cdnjs.cloudflare.com/ajax/libs/intro.js/8.3.2/introjs.min.css
wget  --backups=0  -q  -O ./external/introjs/introjs.min.css.map            https://cdnjs.cloudflare.com/ajax/libs/intro.js/8.3.2/introjs.min.css.map
wget  --backups=0  -q  -O ./external/introjs/introjs.min.js                 https://cdnjs.cloudflare.com/ajax/libs/intro.js/8.3.2/intro.min.js
wget  --backups=0  -q  -O ./external/introjs/introjs.min.js.map             https://cdnjs.cloudflare.com/ajax/libs/intro.js/8.3.2/intro.min.js.map


# external (9/12)...
mkdir -p  ./external/qrcode
touch     ./external/qrcode/index.html

echo " * qrcode.min.js"
wget  --backups=0  -q  -O ./external/qrcode/qrcode.min.js                   https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js


# external (10/12)...
mkdir -p  ./external/speechkitt
touch     ./external/speechkitt/index.html
mkdir -p  ./external/speechkitt/themes
touch     ./external/speechkitt/themes/index.html

echo " * speechkitt.*"
wget  --backups=0  -q  -O ./external/speechkitt/speechkitt.flat.css         https://raw.githubusercontent.com/TalAter/SpeechKITT/refs/heads/master/dist/themes/flat.css
wget  --backups=0  -q  -O ./external/speechkitt/speechkitt.min.js           https://raw.githubusercontent.com/TalAter/SpeechKITT/refs/heads/master/dist/speechkitt.min.js
wget  --backups=0  -q  -O ./external/speechkitt/themes/flat.css             https://raw.githubusercontent.com/TalAter/SpeechKITT/refs/heads/master/dist/themes/flat.css
wget  --backups=0  -q  -O ./external/speechkitt/themes/flat.css.map         https://raw.githubusercontent.com/TalAter/SpeechKITT/refs/heads/master/dist/themes/flat.css.map

cp ./devel/external_glue/flat.fixed.css     ./external/speechkitt/themes/flat.fixed.css
cp ./devel/external_glue/flat.original.css  ./external/speechkitt/themes/flat.original.css


# external (11/12)...
mkdir -p  ./external/vis
touch     ./external/vis/index.html

echo " * vis-network.min.*"
wget  --backups=0  -q  -O ./external/vis/vis-network.min.css                https://cdnjs.cloudflare.com/ajax/libs/vis-network/10.0.2/dist/dist/vis-network.min.css
wget  --backups=0  -q  -O ./external/vis/vis-network.min.js                 https://cdnjs.cloudflare.com/ajax/libs/vis-network/10.0.2/dist/vis-network.min.js


# external (12/12)...
mkdir -p  ./external/vue
touch     ./external/vue/index.html

echo " * vue*.min.js"
wget  --backups=0  -q  -O ./external/vue/vue.min.js                         https://cdnjs.cloudflare.com/ajax/libs/vue/2.7.16/vue.min.js
wget  --backups=0  -q  -O ./external/vue/vuex.min.js                        https://cdnjs.cloudflare.com/ajax/libs/vuex/3.6.2/vuex.min.js

# external
cp devel/external_glue/cordova.js      external/
cp devel/external_glue/css-tricks.css  external/


# farewell
echo ""
echo "  Done."

