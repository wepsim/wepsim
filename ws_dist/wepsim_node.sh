#!/usr/bin/env node

   var ws  = require('./min.wepsim_node.js') ;
   var fs  = require('fs') ;

   //
   // Usage
   //

   if (2 == process.argv.length)
   {
       console.log('') ;
       console.log('WepSIM-lite 1.0') ;
       console.log('+ Simplified version of the wepsim simulator for the command line.') ;
       console.log('') ;
       console.log('Usage:') ;
       console.log('+ ./wepsim_node.sh <command> <hardware name> <microcode file> <assembly file> <checklist file> [max. instructions] [max. cycles]') ;
       console.log('') ;
       console.log('Examples:') ;
       console.log(' * Run some example and show the final state:') ;
       console.log('   ./wepsim_node.sh run                   ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
       console.log('') ;
       console.log(' * Run some example and show the state on each assembly instruction executed:') ;
       console.log('   ./wepsim_node.sh stepbystep            ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
       console.log('') ;
       console.log(' * Run some example and show the state on each microinstruction executed:') ;
       console.log('   ./wepsim_node.sh microstepbymicrostep  ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
       console.log('') ;
       console.log(' * Check that some example actually works:') ;
       console.log('   ./wepsim_node.sh check                 ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e1.txt') ;
       console.log('') ;
       console.log(' * Check that some example actually does not works:') ;
       console.log('   ./wepsim_node.sh check                 ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e2.txt') ;
       console.log('') ;
       console.log('Additional Example:') ;
       console.log(' * Run some example and describe on each microinstruction the actions performed:') ;
       console.log('   ./wepsim_node.sh microstepverbalized   ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
       console.log('') ;

       return true ;
   }


   //
   // action == check
   //

   if ("CHECK" == process.argv[2].toUpperCase())
   {
       try 
       {
          var simhw_name     = process.argv[3] ;
          var data_microcode = fs.readFileSync(process.argv[4], 'utf8') ;
          var data_asmcode   = fs.readFileSync(process.argv[5], 'utf8') ;
          var data_okresult  = fs.readFileSync(process.argv[6], 'utf8') ;
       }
       catch (e)
       {
           console.log(e);
           return false ;
           // throw 'ERROR...' ;
       }

       cfg_instruction_limit = 1000 ;
       if (process.argv.length > 7)
           cfg_instruction_limit = parseInt(process.argv[7]) ;

       cfg_cycles_limit = 1024 ;
       if (process.argv.length > 8)
           cfg_cycles_limit = parseInt(process.argv[8]) ;

       ws.wepsim_nodejs_init(simhw_name) ;
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
       var simhw_name     = process.argv[3] ;
       var data_microcode = fs.readFileSync(process.argv[4], 'utf8') ;
       var data_asmcode   = fs.readFileSync(process.argv[5], 'utf8') ;

       cfg_instruction_limit = 1000 ;
       if (process.argv.length > 6)
           cfg_instruction_limit = parseInt(process.argv[6]) ;

       cfg_cycles_limit = 1024 ;
       if (process.argv.length > 7)
           cfg_cycles_limit = parseInt(process.argv[7]) ;

       ws.wepsim_nodejs_init(simhw_name) ;
       var ret = ws.wepsim_nodejs_run(1, data_microcode, data_asmcode, cfg_instruction_limit, cfg_cycles_limit) ;

       console.log(ret.msg);
       return ret.ok ;
       // if (ret.ok == false) throw 'ERROR...' ;
   }


   //
   // action == stepbystep
   //

   if ("STEPBYSTEP" == process.argv[2].toUpperCase())
   {
       var simhw_name     = process.argv[3] ;
       var data_microcode = fs.readFileSync(process.argv[4], 'utf8') ;
       var data_asmcode   = fs.readFileSync(process.argv[5], 'utf8') ;

       cfg_instruction_limit = 1000 ;
       if (process.argv.length > 6)
           cfg_instruction_limit = parseInt(process.argv[6]) ;

       cfg_cycles_limit = 1024 ;
       if (process.argv.length > 7)
           cfg_cycles_limit = parseInt(process.argv[7]) ;

       ws.wepsim_nodejs_init(simhw_name) ;
       var ret = ws.wepsim_nodejs_run(2, data_microcode, data_asmcode, cfg_instruction_limit, cfg_cycles_limit) ;

       console.log(ret.msg);
       return ret.ok ;
       // if (ret.ok == false) throw 'ERROR...' ;
   }


   //
   // action == microstepbymicrostep
   //

   if ("MICROSTEPBYMICROSTEP" == process.argv[2].toUpperCase())
   {
       var simhw_name     = process.argv[3] ;
       var data_microcode = fs.readFileSync(process.argv[4], 'utf8') ;
       var data_asmcode   = fs.readFileSync(process.argv[5], 'utf8') ;

       cfg_instruction_limit = 1000 ;
       if (process.argv.length > 6)
           cfg_instruction_limit = parseInt(process.argv[6]) ;

       cfg_cycles_limit = 1024 ;
       if (process.argv.length > 7)
           cfg_cycles_limit = parseInt(process.argv[7]) ;

       ws.wepsim_nodejs_init(simhw_name) ;
       var ret = ws.wepsim_nodejs_run(3, data_microcode, data_asmcode, cfg_instruction_limit, cfg_cycles_limit) ;

       console.log(ret.msg);
       return ret.ok ;
       // if (ret.ok == false) throw 'ERROR...' ;
   }


   //
   // action == microstepverbalized
   //

   if ("MICROSTEPVERBALIZED" == process.argv[2].toUpperCase())
   {
       var simhw_name     = process.argv[3] ;
       var data_microcode = fs.readFileSync(process.argv[4], 'utf8') ;
       var data_asmcode   = fs.readFileSync(process.argv[5], 'utf8') ;

       cfg_instruction_limit = 1000 ;
       if (process.argv.length > 6)
           cfg_instruction_limit = parseInt(process.argv[6]) ;

       cfg_cycles_limit = 1024 ;
       if (process.argv.length > 7)
           cfg_cycles_limit = parseInt(process.argv[7]) ;

       ws.wepsim_nodejs_init(simhw_name) ;
       var ret = ws.wepsim_nodejs_run(4, data_microcode, data_asmcode, cfg_instruction_limit, cfg_cycles_limit) ;

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

