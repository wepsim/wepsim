
## Development support


## Pre-requisites

```bash
   sudo apt install jq
   npm i --save-dev terser jshint eslint

   npm i --save-dev typescript@6
   npm i --save-dev webpack webpack-cli terser-webpack-plugin
   npm i --save-dev ts-loader
   npm i --save-dev glob
   npm i --save-dev webpack-dev-server

   npm i yargs clear inquirer@8.2.6 fuzzy commander async
   npm i inquirer-command-prompt inquirer-autocomplete-prompt@1

   npm i codemirror
   npm i @codemirror/lang-javascript
   npm i @codemirror/view
   npm i @codemirror/state
   npm i @codemirror/language
```


## Distribution files

* External libraries
  * ws_dist/min.external.css
  * ws_dist/min.external.js

* hardware model + software model + core (simulation ctrl + UI)
  * ws_dist/min.sim_all.js

* WepSIM internalization (i18n)
  * ws_dist/min.wepsim_i18n.js

* WepSIM core
  * ws_dist/min.wepsim_core.js

* WepSIM Web-based UI
  * ws_dist/min.wepsim_webui.js

* WepSIM web (included in min.wepsim_web.js)
  * ws_dist/min.sim_all.js
  * ws_dist/min.wepsim_i18n.js
  * ws_dist/min.wepsim_core.js
  * ws_dist/min.wepsim_webui.js

* WepSIM command-line UI
  * ws_dist/min.wepsim_node.js


