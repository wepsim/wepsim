
import {nodeResolve} from "@rollup/plugin-node-resolve"
export default {
  input: "external/codemirror6/codemirror.mjs",
  output: {
    file: "external/codemirror6/codemirror.bundle.js",
    format: "iife"
  },
  plugins: [nodeResolve()]
}


