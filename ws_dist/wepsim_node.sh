#!/usr/bin/env node

   var ws  = require('./min.wepsim_node.js') ;
   var fs  = require('fs') ;

   ws_cl_ver = 'WepSIM-cl v1.5.1' ;

   //
   // Usage
   //

   if (process.argv.length < 3)
   {
       console.log('') ;
       console.log(ws_cl_ver) ;
       console.log('> WepSIM simulator interface for command line.') ;
       console.log('') ;
       console.log('For more details please use:') ;
       console.log(' ./wepsim_node.sh help') ;
       console.log('') ;

       return true ;
   }

   if ( (process.argv.length < 4) && (process.argv[2].toUpperCase() === "HELP") )
   {
       console.log('') ;
       console.log(ws_cl_ver) ;
       console.log('> WepSIM simulator interface for command line.') ;
       console.log('') ;
       console.log('Usage:') ;
       console.log(' * ./wepsim_node.sh <command> <hardware name> <microcode file> <assembly file> [<checklist file>] [options*]') ;
       console.log(' * ./wepsim_node.sh <command> checkpoint      <checkpoint file>                [<checklist file>] [options*]') ;
       console.log('') ;
       console.log('    <command>         = run | stepbystep | microstepbymicrostep | check | microstepverbalized | show-console | show-record') ;
       console.log('    <hardware name>   = ep | poc') ;
       console.log('') ;
       console.log('    <checkpoint file> = "path to the checkpoint file" ') ;
       console.log('    <microcode file>  = "path to the microcode file" ') ;
       console.log('    <assembly file>   = "path to the assembly file" ') ;
       console.log('    <checklist file>  = "path to the checklist file" ') ;
       console.log('') ;
       console.log('    [options*]        = verbal-<level> maxi-<#> maxc-<#>') ;
       console.log('       verbal-<level> = verbal-text | verbal-math') ;
       console.log('       maxi-<#>       = maxi-<maximum number of instructions>') ;
       console.log('       maxc-<#>       = maxc-<maximum number of cycles>') ;
       console.log('') ;
       console.log('Examples:') ;
       console.log(' * Run some example and show the final state:') ;
       console.log('   ./wepsim_node.sh run                   ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
       console.log('   ./wepsim_node.sh run                   checkpoint ./examples/checkpoint/tutorial_1.txt') ;
       console.log('') ;
       console.log(' * Run some example and show the state on each assembly instruction executed:') ;
       console.log('   ./wepsim_node.sh stepbystep            ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
       console.log('   ./wepsim_node.sh stepbystep            checkpoint ./examples/checkpoint/tutorial_1.txt                                     maxi-2048') ;
       console.log('') ;
       console.log(' * Run some example and show the state on each microinstruction executed:') ;
       console.log('   ./wepsim_node.sh microstepbymicrostep  ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt') ;
       console.log('   ./wepsim_node.sh microstepbymicrostep  checkpoint ./examples/checkpoint/tutorial_1.txt                                     maxc-10000') ;
       console.log('') ;
       console.log(' * Check that some example meets the expected final state (so it works):') ;
       console.log('   ./wepsim_node.sh check                 ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e1.txt') ;
       console.log('') ;
       console.log(' * Run some example and show a description for each microinstruction executed:') ;
       console.log('   ./wepsim_node.sh microstepverbalized   ep         ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt verbal-text') ;
       console.log('   ./wepsim_node.sh microstepverbalized   checkpoint ./examples/checkpoint/tutorial_1.txt                                     verbal-math') ;
       console.log('') ;
       console.log(' * Show console output after execution:') ;
       console.log('   ./wepsim_node.sh show-console          ep         ./examples/microcode/mc-ep_os.txt ./examples/assembly/asm-ep_s4_e1.txt') ;
       console.log('') ;

       return true ;
   }

   if ( (process.argv.length < 4) && (process.argv[2].toUpperCase() === "HELP2") )
   {
       console.log('') ;
       console.log(ws_cl_ver) ;
       console.log('> WepSIM simulator interface for command line.') ;
       console.log('') ;
       console.log('Additional examples:') ;
       console.log(' * For testing Creator, build microcode:') ;
       console.log('   ./wepsim_node.sh import-creator checkpoint MIPS-32-like.json > microcode.txt') ;
       console.log('') ;
       console.log(' * For testing WepSIM, export hardware definition as JSON:') ;
       console.log('   ./wepsim_node.sh export-hardware ep > examples/hardware/ep/hw_def.json') ;
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
		    verbalize:         'text'
	         } ;

   var arg_last = 3 ;


   //
   // get working values from arguments
   //
 
   try 
   {
       if (("EXPORT-HARDWARE" !== data.action) && ("HELP" !== data.action))
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

       if ("HELP" === data.action)
       {
	   data.firmware = process.argv[4] ;
	   arg_last      = 4 ;
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
       var ret = null ;

       // check...
       ws.wepsim_nodejs_init(data.mode) ;
       ret = ws.wepsim_nodejs_check(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
   }


   //
   // data.action == run
   //

   if ("RUN" == data.action)
   {
       var ret = null ;

       // set verbosity handlers
       options.before_instruction = ws.wepsim_nodejs_do_nothing_handler ;
       options.after_instruction  = ws.wepsim_nodejs_do_nothing_handler ;

       // run...
       ws.wepsim_nodejs_init(data.mode) ;
       ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
   }


   //
   // data.action == stepbystep
   //

   if ("STEPBYSTEP" == data.action)
   {
       var ret = null ;

       // set verbosity handlers
       options.before_instruction = ws.wepsim_nodejs_before_instruction2 ;
       options.after_instruction  = ws.wepsim_nodejs_after_instruction2 ;

       // run...
       ws.wepsim_nodejs_init(data.mode) ;
       ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
   }


   //
   // data.action == microstepbymicrostep
   //

   if ("MICROSTEPBYMICROSTEP" == data.action)
   {
       var ret = null ;

       // set verbosity handlers
       options.before_microinstruction = ws.wepsim_nodejs_before_microinstruction3 ;
       options.after_microinstruction  = ws.wepsim_nodejs_after_microinstruction3 ;

       // run...
       ws.wepsim_nodejs_init(data.mode) ;
       ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
   }


   //
   // data.action == microstepverbalized
   //

   if ("MICROSTEPVERBALIZED" == data.action)
   {
       var ret = null ;

       // set verbosity handlers
       options.before_microinstruction = ws.wepsim_nodejs_before_microinstruction4 ;
       options.after_microinstruction  = ws.wepsim_nodejs_do_nothing_handler ;

       // run...
       ws.wepsim_nodejs_init(data.mode) ;
       ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
   }


   //
   // data.action == export-hardware
   //

   if ("EXPORT-HARDWARE" == data.action)
   {
       var ret = ws.wepsim_nodejs_exportHW(data.mode) ;

       console.log(ret.msg);
       return ret.ok ;
   }


   //
   // data.action == show-record
   //

   if ("SHOW-RECORD" == data.action)
   {
       var ret = null ;

       ws.wepsim_nodejs_init(data.mode) ;
       ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
   }


   //
   // data.action == show-console
   //

   if ("SHOW-CONSOLE" == data.action)
   {
       var ret = null ;

       ws.wepsim_nodejs_init(data.mode) ;
       ret = ws.wepsim_nodejs_run(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
   }


   //
   // data.action == help
   //

   // wepsim_node.sh help ep cop
   if ("HELP" == data.action)
   {
       var ret = null ;

       ws.wepsim_nodejs_init(data.mode) ;
       ret = ws.wepsim_nodejs_help_signal(data, options) ;

       console.log(ret.msg);
       return ret.ok ;
   }


   //
   // data.action == import
   //

   // wepsim_node.sh import-creator checkpoint instructions.json > microcode.txt
   if ("IMPORT-CREATOR" == data.action)
   {
       var ret = null ;

       ret = ws.simlang_firm_is2native(obj_checkpoint) ;

       console.log(ret);
       return true ;
   }


   //
   // data.action == unknown
   //

   console.log('ERROR: wepsim_checker: unknown action ' + data.action) ;
   return false ;
   // throw 'ERROR...' ;

