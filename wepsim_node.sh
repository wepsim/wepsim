#!/usr/bin/env node

   var ws  = require('./min.wepsim_node.js') ;
   var fs  = require('fs') ;

   //
   // Usage
   //

   if (2 == process.argv.length)
   {
       console.log('') ;
       console.log('WepSIM-lite 0.5') ;
       console.log('+ Simplified version of the wepsim simulator for the command line.') ;
       console.log('') ;
       console.log('Usage:') ;
       console.log('+ ./wepsim_node.sh check <microcode file> <assembly file> <checklist file> [max. instructions] [max. cycles]') ;
       console.log('') ;
       console.log('Examples:') ;
       console.log('./wepsim_node.sh check ./examples/exampleMicrocodeS1E1.txt ./examples/exampleCodeS1E1.txt ./examples/exampleChecklistS1E1.txt') ;
       console.log('./wepsim_node.sh check ./examples/exampleMicrocodeS1E1.txt ./examples/exampleCodeS1E1.txt ./examples/exampleChecklistS1E2.txt') ;
       console.log('./wepsim_node.sh run   ./examples/exampleMicrocodeS1E1.txt ./examples/exampleCodeS1E1.txt') ;
       console.log('') ;

       return true ;
   }


   //
   // action == check
   //

   if ("CHECK" == process.argv[2].toUpperCase())
   {
       var data_microcode = fs.readFileSync(process.argv[3], 'utf8') ;
       var data_asmcode   = fs.readFileSync(process.argv[4], 'utf8') ;
       var data_okresult  = fs.readFileSync(process.argv[5], 'utf8') ;

       cfg_instruction_limit = 1000 ;
       if (process.argv.length > 6)
           cfg_instruction_limit = parseInt(process.argv[6]) ;

       cfg_cycles_limit = 1024 ;
       if (process.argv.length > 7)
           cfg_cycles_limit = parseInt(process.argv[7]) ;

       ws.wepsim_nodejs_init(false) ;
       var ret = ws.wepsim_nodejs_check(data_microcode, data_asmcode, data_okresult, 
                                        cfg_instruction_limit, cfg_cycles_limit) ;
       if (false == ret.ok) 
       {
           console.log(ret.msg);
           return false ;
           // throw 'ERROR...' ;
       }

       console.log("OK: Execution: no error reported");
       return true ;
   }


   //
   // action == run
   //

   if ("RUN" == process.argv[2].toUpperCase())
   {
       var data_microcode = fs.readFileSync(process.argv[3], 'utf8') ;
       var data_asmcode   = fs.readFileSync(process.argv[4], 'utf8') ;

       cfg_instruction_limit = 1000 ;
       if (process.argv.length > 5)
           cfg_instruction_limit = parseInt(process.argv[5]) ;

       cfg_cycles_limit = 1024 ;
       if (process.argv.length > 6)
           cfg_cycles_limit = parseInt(process.argv[6]) ;

       ws.wepsim_nodejs_init(false) ;
       var ret = ws.wepsim_nodejs_run(data_microcode, data_asmcode, cfg_instruction_limit, cfg_cycles_limit) ;

       console.log(ret.msg);
       return ret.ok ;
       // if (ret.ok == false) throw 'ERROR...' ;
   }


   //
   // action == unknown
   //

   console.log("ERROR: wepsim_checker: unknown action");
   return false ;
   // throw 'ERROR...' ;

