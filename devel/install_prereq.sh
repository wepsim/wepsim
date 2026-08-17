#!/bin/bash
set -x

sudo apt-get install  jq git npm

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

