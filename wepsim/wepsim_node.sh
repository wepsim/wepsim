#!/usr/bin/env node

   var ws  = require('./min.wepsim_node.js') ;
   var fs  = require('fs') ;

   //
   // Usage
   //

   if (process.argv.length < 3)
   {
       console.log('') ;
       console.log('WepSIM-cl v1.2') ;
       console.log('+ WepSIM simulator v2.0.6 for command line.') ;
       console.log('') ;
       console.log('Usage:') ;
       console.log('+ ./wepsim_node.sh <command> <hardware name> <microcode file> <assembly file> [<checklist file>] [options*]') ;
       console.log('+ ./wepsim_node.sh <command> <checkpoint>    <checkpoint file>                [<checklist file>] [options*]') ;
       console.log('') ;
       console.log('                   [options*] = verbal-<text|math> maxi-<max. instructions> maxc-<max. cycles>') ;
       console.log('') ;
       console.log('Examples:') ;
       console.log(' * Run some example and show the final state:') ;
       console.log('   ./wepsim_node.sh run                   ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
       console.log('   ./wepsim_node.sh run                   checkpoint ./examples/checkpoint/tutorial_1.txt') ;
       console.log('') ;
       console.log(' * Run some example and show the state on each assembly instruction executed:') ;
       console.log('   ./wepsim_node.sh stepbystep            ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
       console.log('   ./wepsim_node.sh stepbystep            checkpoint ./examples/checkpoint/tutorial_1.txt') ;
       console.log('') ;
       console.log(' * Run some example and show the state on each microinstruction executed:') ;
       console.log('   ./wepsim_node.sh microstepbymicrostep  ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
       console.log('   ./wepsim_node.sh microstepverbalized   checkpoint ./examples/checkpoint/tutorial_1.txt') ;
       console.log('') ;
       console.log(' * Check that some example actually works:') ;
       console.log('   ./wepsim_node.sh check                 ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e1.txt') ;
       console.log('   ./wepsim_node.sh check                 checkpoint ./examples/checkpoint/tutorial_1.txt                             ./examples/checklist/cl-ep_s1_e1.txt') ;
       console.log('') ;

       return true ;
   }


   //
   // default values
   //

   var data =    {
                    action:    process.argv[2].toUpperCase(),
                    mode:      process.argv[3],
		    firmware:  null,
		    assembly:  null,
		    result_ok: null,
		    record:    []
	         } ;

   var options = {
		    instruction_limit: 1000,
		    cycles_limit:      1024,
		    verbosity:         0,
		    verbalize:         'text'
	         } ;

   var arg_last = 3 ;


   //
   // get working values from arguments
   //
 
   try 
   {
       if ("EXPORT-HARDWARE" !== data.action)
       {
	       if ("CHECKPOINT" !== data.mode.toUpperCase())
	       {
		   data.firmware = fs.readFileSync(process.argv[4], 'utf8') ;
		   data.assembly = fs.readFileSync(process.argv[5], 'utf8') ;
		   arg_last      = 5 ;
	       }
	       else
	       {
		   var data_checkpoint = fs.readFileSync(process.argv[4], 'utf8') ;
		   var obj_checkpoint  = JSON.parse(data_checkpoint) ;

		   data.mode     = obj_checkpoint.mode ;
		   data.firmware = obj_checkpoint.firmware ;
		   data.assembly = obj_checkpoint.assembly ;
		   data.record   = obj_checkpoint.record ;
		   arg_last      = 4 ;
	       }
       }

       if ("CHECK" === data.action)
       {
	   arg_last++ ;
           data.result_ok = fs.readFileSync(process.argv[arg_last], 'utf8') ;
       }
   }
   catch (e)
   {
       console.log(e);
       return false ;
       // throw 'ERROR...' ;
   }

   var option = [] ;
   while (process.argv.length > (arg_last+1))
   {
	   arg_last++ ;
	   option = process.argv[arg_last].toUpperCase().split('-') ;

	   switch (option[0])
	   {
	      case "VERBAL": if (option.length !== 2)
	                         console.log('[ERROR] Option without value: ' + option[0]);
		             if ("MATH" === option[1])
				 options.verbalize = 'math' ;
		             break;
			     
	      case "MAXC":   options.cycles_limit      = parseInt(option[1]) ;
		             break;

	      case "MAXI":   options.instruction_limit = parseInt(option[1]) ;
		             break;

	      default:       console.log('[ERROR] Unknown option: ' + option[0]);
		             break;
	   }
   }


   //
   // data.action == check
   //

   if ("CHECK" == data.action)
   {
       ws.wepsim_nodejs_init(data.mode) ;
       var ret = ws.wepsim_nodejs_check(data, options) ;
       if (false == ret.ok) 
       {
           console.log(ret.msg);
           return false ;
           // throw 'ERROR...' ;
       }

       console.log("OK: Execution: no error reported\n");
       return true ;
   }


   //
   // data.action == run
   //

   if ("RUN" == data.action)
   {
       options.verbosity = 1 ;

       ws.wepsim_nodejs_init(data.mode) ;
       var ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
       // if (ret.ok == false) throw 'ERROR...' ;
   }


   //
   // data.action == stepbystep
   //

   if ("STEPBYSTEP" == data.action)
   {
       options.verbosity = 2 ;

       ws.wepsim_nodejs_init(data.mode) ;
       var ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
       // if (ret.ok == false) throw 'ERROR...' ;
   }


   //
   // data.action == microstepbymicrostep
   //

   if ("MICROSTEPBYMICROSTEP" == data.action)
   {
       options.verbosity = 3 ;

       ws.wepsim_nodejs_init(data.mode) ;
       var ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
       // if (ret.ok == false) throw 'ERROR...' ;
   }


   //
   // data.action == microstepverbalized
   //

   if ("MICROSTEPVERBALIZED" == data.action)
   {
       options.verbosity = 4 ;

       ws.wepsim_nodejs_init(data.mode) ;
       var ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
       // if (ret.ok == false) throw 'ERROR...' ;
   }


   //
   // data.action == export-hardware
   //

   if ("EXPORT-HARDWARE" == data.action)
   {
       var ret = ws.wepsim_nodejs_exportHW(data.mode) ;

       console.log(ret.msg);
       return ret.ok ;
       // if (ret.ok == false) throw 'ERROR...' ;
   }


   //
   // data.action == show-record
   //

   if ("SHOW-RECORD" == data.action)
   {
       options.verbosity = 5 ;

       ws.wepsim_nodejs_init(data.mode) ;
       var ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
       // if (ret.ok == false) throw 'ERROR...' ;
   }


   //
   // data.action == show-console
   //

   if ("SHOW-CONSOLE" == data.action)
   {
       options.verbosity = 6 ;

       ws.wepsim_nodejs_init(data.mode) ;
       var ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
       // if (ret.ok == false) throw 'ERROR...' ;
   }


   //
   // data.action == unknown
   //

   console.log('ERROR: wepsim_checker: unknown action ' + data.action) ;
   return false ;
   // throw 'ERROR...' ;

