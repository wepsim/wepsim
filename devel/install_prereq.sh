#!/bin/bash
set -x

sudo apt install jq

npm i --save-dev terser jshint eslint
npm i --save-dev rollup @rollup/plugin-node-resolve

npm i --save-dev yargs clear inquirer@8.2.6 fuzzy commander async
npm i --save-dev inquirer-command-prompt inquirer-autocomplete-prompt@1

npm i --save-dev codemirror
npm i --save-dev @codemirror/lang-javascript
npm i --save-dev @codemirror/view
npm i --save-dev @codemirror/state
npm i --save-dev @codemirror/language

