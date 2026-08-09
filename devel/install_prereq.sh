#!/bin/bash
set -x

sudo apt install jq
npm i --save-dev typescript@6
npm i --save-dev jshint eslint
npm i --save-dev terser@latest

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

