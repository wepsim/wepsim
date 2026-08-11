
## Development support


## Pre-requisites

```bash
   sudo apt install jq
   npm i --save-dev typescript@6
   npm i --save-dev terser@latest
   npm i --save-dev jshint
   npm i --save-dev eslint@10.8.0 @eslint/js globals

   npm i --save-dev webpack webpack-cli
   npm i --save-dev terser-webpack-plugin
   npm i --save-dev ts-loader
   npm i --save-dev glob
   npm i --save-dev webpack-dev-server

   npm i --save-dev yargs clear inquirer@8.2.6 fuzzy commander async
   npm i --save-dev inquirer-command-prompt inquirer-autocomplete-prompt@1

   npm i --save-dev codemirror
   npm i --save-dev @codemirror/lang-javascript
   npm i --save-dev @codemirror/view
   npm i --save-dev @codemirror/state
   npm i --save-dev @codemirror/language
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


