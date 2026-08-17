
# Development support

## Table of contents

- Install
  - [Pre-requisites](#pre-requisites)
  - [Building WepSIM](#building-wepsim)

- Organization
  - [Distribution files](#distribution-files)
  - [Distribution components](#distribution-components)
  - [Devel directory](#devel-directory)


## Pre-requisites

First, install the basic development tools:

```bash
   sudo apt-get install  jq git npm
```


## Building WepSIM

First step, clone the GitHub repository:

```bash
   git clone https://github.com/acaldero/wepsim.git
```

Next step, install the NodeJS tools:

```bash
   cd wepsim
   npm install
```

This is equivalent to:

```bash
   npm i --save-dev typescript@6
   npm i --save-dev terser@latest
   npm i --save-dev eslint @eslint/js globals
   npm i --save-dev rollup @rollup/plugin-node-resolve
   npm i --save-dev minify

   npm i --save-dev webpack webpack-cli
   npm i --save-dev terser-webpack-plugin
   npm i --save-dev mini-css-extract-plugin
   npm i --save-dev ts-loader css-loader
   npm i --save-dev glob
   npm i --save-dev webpack-dev-server

   npm i --save-dev yargs clear inquirer@8.2.6 fuzzy commander async
   npm i --save-dev inquirer-command-prompt inquirer-autocomplete-prompt@1

   # codemirror 6 (for future update)
   npm i --save-dev codemirror
   npm i --save-dev @codemirror/state
   npm i --save-dev @codemirror/view
   npm i --save-dev @codemirror/language
   npm i --save-dev @codemirror/commands
   npm i --save-dev @codemirror/search
   npm i --save-dev @codemirror/lang-javascript
   npm i --save-dev @replit/codemirror-minimap
```


## Distribution files

* External libraries
  * ws_dist/min.external.css
  * ws_dist/min.external.js

* WepSIM web (included in min.wepsim_web.js)
  * ws_dist/min.sim_all.js
  * ws_dist/min.wepsim_i18n.js
  * ws_dist/min.wepsim_core.js
  * ws_dist/min.wepsim_webui.js

* WepSIM command-line UI (included in min.wepsim_node.js)
  * ws_dist/min.sim_all.js
  * ws_dist/min.wepsim_i18n.js
  * ws_dist/min.wepsim_core.js


## Distribution components

* hardware model + software model + core (simulation ctrl + UI)
  * min.sim_all.js

* WepSIM internalization (i18n)
  * min.wepsim_i18n.js

* WepSIM core
  * min.wepsim_core.js

* WepSIM Web-based UI
  * min.wepsim_webui.js


## Devel directory

* devel/mk_external.sh
  * Create the external directory and the associated dependencies
  * It uses the "devel/external_glue" directory

* devel/mk_dist.sh
  * Build the ws_dist/ directory and the distribution files
  * It uses the "devel/webpack_indexes" directory for the bundle description

* devel/test_wepsim.sh
  * Test the WepSIM from command line
  * It uses the "devel/test_pack"   directory for the test description. See "devel/test_pack/README.md" for more details.
  * It uses the "devel/test_output" directory for the expected test output

* devel/test_eslint.sh
  * Linter apply to the main WepSIM source code files

* Auxiliar scripts:
  * devel/mk_tests.sh
  * devel/install_prereq.sh
  * devel/mk_i18nlang.py
  * devel/mk_cordova.sh

