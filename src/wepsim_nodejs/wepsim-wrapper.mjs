
// wepsim-wrapper.mjs
import { createRequire } from "module" ;
const require = createRequire(import.meta.url) ;

// CJS/UMD bundle
const ws = require("./min.wepsim_node.js") ;

// exporta el objeto completo (y tambien con alias opcional)
export default ws ;
export const wepsim = ws ;

