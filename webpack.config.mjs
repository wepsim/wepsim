
// 10. imports
import path from 'path';
import { fileURLToPath } from 'url';


// 20. base variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 30. Configuration (1/2)
const webConfig = {
    // 1. Compilation mode: development | production
    mode: 'production',

    // 2. Target Web
    target: ['web', 'es2022'],

    // 3. Bundles section
    entry: {
       'wepsim_web': './devel/webpack_indexes/min.wepsim_web.js'
    },

    externals: {
        'bootstrap': 'bootstrap'
    },

    output: {
       filename: 'min.[name].js',
       path: path.resolve(__dirname, 'ws_dist'),
       clean: false,

       library: {
          name: 'ws',
          type: 'assign-properties'
       },

       globalObject: 'typeof self !== "undefined" ? self : this'
    },

    optimization: {
       usedExports: false,
       providedExports: true,
       sideEffects: false
    },

    performance: {
        hints: false
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                parser: { javascript: { strictMode: false } }
            }
        ]
    },

    resolve: {
       extensions: ['.js', '.json'],
       fallback: {
         "fs":     false, "path":   false,
         "os":     false, "util":   false,
         "stream": false, "tty":    false,
         "assert": false, "buffer": false,
         "child_process": false,
         "crypto": false
       }
    }
};


// 40. Configuration (2/2)
const nodeConfig = {
    // 1. Compilation mode: development | production
    mode: 'production',

    // 2. Target node
    target: 'node',

    // 3. Bundles section
    entry: {
       'wepsim_node': './devel/webpack_indexes/min.wepsim_node.js'
    },

    output: {
       filename: 'min.[name].js',
       path: path.resolve(__dirname, 'ws_dist'),
       clean: false,
       strictModuleExceptionHandling: true,

       library: {
          type: 'commonjs'
       }
    },

    resolve: {
       extensions: ['.js', '.json']
    },

    optimization: { usedExports: false },

    performance: {
        hints: false
    }
};


// 50. export default
export default [webConfig, nodeConfig];

