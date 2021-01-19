#!/usr/bin/env node


   //
   // Help
   //

   var ws_cl_ver = 'WepSIM-cl v1.8.8' ;

   function ws_help_usage ()
   {
       var o = '\n' +
               ws_cl_ver + '\n' +
	       '> WepSIM simulator interface for command line.\n' +
	       '\n' +
	       'For more details please use:\n' +
	       ' ./wepsim.sh -h\n' +
	       '\n' +
	       'For common examples please use:\n' +
	       ' ./wepsim.sh --examples basic\n' +
	       ' ./wepsim.sh --examples checker\n' +
	       ' ./wepsim.sh --examples checkpoint\n' +
	       ' ./wepsim.sh --examples more' ;

        return o ;
   }

   function ws_help_examples_basic ()
   {
       var o = '\n' +
               ws_cl_ver + '\n' +
               '> WepSIM simulator interface for command line.\n' +
               '\n' +
               'Examples for running some work and show the...:\n' +
               ' * ...final state:\n' +
               '   ./wepsim.sh -a run -m ep -f ./examples/microcode/mc-ep_mips_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
               ' * ...modified state on each assembly instruction executed:\n' +
               '   ./wepsim.sh -a stepbystep -m ep -f ./examples/microcode/mc-ep_mips_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
               ' * ...modified state on each microinstruction executed:\n' +
               '   ./wepsim.sh -a microstepbymicrostep -m ep -f ./examples/microcode/mc-ep_mips_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
               '\n' +
               'In previous examples you can use the "-m ep -f <firmware> -s <assembly>" or some equivalent checkpoint:\n' +
               '   ./wepsim.sh -a run        --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               '   ./wepsim.sh -a stepbystep --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               '\n' +
               'Example for running in an interactive mode...:\n' +
               '   ./wepsim.sh -a interactive --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               '' ;

        return o ;
   }

   function ws_help_examples_check ()
   {
       var o = '\n' +
               ws_cl_ver + '\n' +
               '> WepSIM simulator interface for command line.\n' +
               '\n' +
               'Examples to show the state at the end of some work:\n' +
               ' * Filter final state of execution:\n' +
               '   ./ws_dist/wepsim.sh -a run --checkpoint ./examples/checkpoint/tutorial_1.txt --purify "R0-R5;0x100-0x8000"\n' +
               ' * Show console output after execution:\n' +
               '   ./wepsim.sh -a show-console -m ep -f ./examples/microcode/mc-ep_mips_os.txt -s ./examples/assembly/asm-ep_s4_e1.txt\n' +
               '\n' +
               'Examples for checks at the end of some work:\n' +
               ' * Check that your work meets the expected final state (so it works):\n' +
               '   ./wepsim.sh -a check -m ep -f ./examples/microcode/mc-ep_mips_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt -r ./examples/checklist/cl-ep_s1_e1.txt\n' +
               '\n' +
               'More examples of custom execution:\n' +
               ' * Run some example and limit the "instructions":\n' +
               '   ./wepsim.sh -a stepbystep --checkpoint ./examples/checkpoint/tutorial_1.txt --maxi 2048\n' +
               ' * Run some example and limit the "clock cycles":\n' +
               '   ./wepsim.sh -a stepbystep --checkpoint ./examples/checkpoint/tutorial_1.txt --maxc 10000\n' +
               '\n' +
               'In previous examples you can combine flags, for example: -a check with --purify R0-R31\n' +
               '' ;

        return o ;
   }

   function ws_help_examples_checkpoint ()
   {
       var o = '\n' +
               ws_cl_ver + '\n' +
               '> WepSIM simulator interface for command line.\n' +
               '\n' +
               'Examples for building a checkpoint file:\n' +
               ' * From assembly and microcode, and print it to standard output:\n' +
               '   ./wepsim.sh -a build-checkpoint -m ep -f ./examples/microcode/mc-ep_mips_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
               '\n' +
               'Examples for disassembling a checkpoint files:\n' +
               ' * Show assembly within checkpoint:\n' +
               '   ./wepsim.sh -a show-assembly  --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               ' * Show microcode within checkpoint:\n' +
               '   ./wepsim.sh -a show-microcode --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               '\n' +
               ' * Show mode used in the checkpoint:\n' +
               '   ./wepsim.sh -a show-mode      --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               ' * Show recorded session:\n' +
               '   ./wepsim.sh -a show-record    --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               '' ;

        return o ;
   }

   function ws_help_examples_more ()
   {
       var o = '\n' +
               ws_cl_ver + '\n' +
               '> WepSIM simulator interface for command line.\n' +
               '\n' +
               'Additional help:\n' +
               ' * Help about the cop signal:\n' +
               '   ./wepsim.sh -a help -m ep -s cop\n' +
               ' * Help about instructions:\n' +
               '   ./wepsim.sh -a help -m ep -f ./examples/microcode/mc-ep_mips.txt\n' +
               '\n' +
               'More examples of custom execution:\n' +
               ' * Run some example and limit the "instructions":\n' +
               '   ./wepsim.sh -a stepbystep --checkpoint ./examples/checkpoint/tutorial_1.txt --maxi 2048\n' +
               ' * Run some example and limit the "clock cycles":\n' +
               '   ./wepsim.sh -a stepbystep --checkpoint ./examples/checkpoint/tutorial_1.txt --maxc 10000\n' +
               '\n' +
               ' * Run some example and show a description for each microinstruction executed:\n' +
               '   ./wepsim.sh -a microstepverbalized -m ep -f ./examples/microcode/mc-ep_mips_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt --verbal text\n' +
               '\n' +
               'Example for developers:\n' +
               ' * Export hardware definition as JSON:\n' +
               '   ./wepsim.sh -a export-hardware -m ep > examples/hardware/ep/hw_def.json\n' +
               ' * Run in an interactive REPL interface (beta):\n' +
               '   ./wepsim.sh -a interactive --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               '' ;

        return o ;
   }


   //
   // Import
   //

   // filesystem
   var fs = require('fs') ;

   // websim
   var ws = require('./min.wepsim_node.js') ;

   // performance
   performance = require('perf_hooks').performance ;

   // arguments
   var argv = require('yargs')
              .usage(ws_help_usage())
              .option('examples', {
                  alias:    'e',
                  type:     'string',
                  describe: 'basic | more',
                  nargs:    1,
                  demand:   false,
                  default:  ''
               })
              .option('action', {
                  alias:    'a',
                  type:     'string',
                  describe: 'run | stepbystep | microstepbymicrostep | check |' +
                            ' show-console | microstepverbalized |' +
                            ' show-record | show-microcode | show-assembly | build-checkpoint',
                  nargs:    1,
                  default:  'usage'
               })
              .option('mode', {
                  alias:    'm',
                  type:     'string',
                  describe: 'ep | poc',
                  nargs:    1,
                  demand:   false,
                  default:  'ep'
               })
              .option('firmware', {
                  alias:    'f',
                  type:     'string',
                  describe: 'Firmware file',
                  nargs:    1,
                  demand:   false,
                  default:  ''
               })
              .option('assembly', {
                  alias:    's',
                  type:     'string',
                  describe: 'Assembly file',
                  nargs:    1,
                  demand:   false,
                  default:  ''
               })
              .option('checkpoint', {
                  alias:    'c',
                  type:     'string',
                  describe: 'Checkpoint file',
                  nargs:    1,
                  demand:   false,
                  default:  ''
               })
              .option('resultok', {
                  alias:    'r',
                  type:     'string',
                  describe: 'OK result file',
                  nargs:    1,
                  demand:   false,
                  default:  ''
               })
              .option('maxi', {
                  type:     'string',
                  describe: 'Maximum number of instructions to be executed',
                  nargs:    1,
                  demand:   false,
                  default:  '1000'
               })
              .option('maxc', {
                  type:     'string',
                  describe: 'Maximum number of clock cycles to be executed',
                  nargs:    1,
                  demand:   false,
                  default:  '1024'
               })
              .option('verbal', {
                  type:     'string',
                  describe: 'text | math',
                  nargs:    1,
                  demand:   false,
                  default:  'text'
               })
              .option('idiom', {
                  type:     'string',
                  describe: 'en | es | it | pt | zh_cn | fr | hi | ja | kr | ru | sv | de',
                  nargs:    1,
                  demand:   false,
                  default:  'en'
               })
              .option('purify', {
                  alias:    'p',
                  type:     'string',
                  describe: 'Filter output',
                  nargs:    1,
                  demand:   false,
                  default:  ''
               })
              .help('h')
              .demandOption(['action'])
              .argv ;

   // interface
   var clear = require('clear') ;


   //
   // Main: help
   //

   if ( (argv.examples !== "") || (argv.action === "usage") )
   {
       var o = ws_help_usage() + '\n' ;

       if ("basic" == argv.examples) {
           o = ws_help_examples_basic() ;
       }
       else if ("checker" == argv.examples) {
           o = ws_help_examples_check() ;
       }
       else if ("checkpoint" == argv.examples) {
           o = ws_help_examples_checkpoint() ;
       }
       else if ("more" == argv.examples) {
           o = ws_help_examples_more() ;
       }

       clear() ;
       console.log(o) ;
       return true ;
   }


   //
   // Main
   //

   try
   {
	// 1) options
	var options = {} ;

	options.instruction_limit = parseInt(argv.maxi) ;
	options.cycles_limit      = parseInt(argv.maxc) ;
	options.verbalize         = (argv.verbal.toUpperCase() == "MATH") ? 'math' : 'text' ;
	options.purify            =  argv.purify ;


	// 2) workset
	var data = {} ;

	data.mode      = argv.mode ;
	data.action    = argv.action.toUpperCase() ;
	data.firmware  = '' ;
	data.assembly  = '' ;
	data.record    = '' ;
 	data.result_ok = '' ;
 	data.idiom     = argv.idiom ;

        if (argv.checkpoint !== "")
        {
	    var data_checkpoint = fs.readFileSync(argv.checkpoint, 'utf8') ;
	    var obj_checkpoint  = ws.wepsim_nodejs_loadCheckpoint(data_checkpoint) ;

	    data.mode     = obj_checkpoint.mode ;
	    data.firmware = obj_checkpoint.firmware ;
	    data.assembly = obj_checkpoint.assembly ;
	    data.record   = obj_checkpoint.record ;
	    data.obj_chk  = obj_checkpoint ;
	    data.str_chk  = data_checkpoint ;
        }

        if (argv.firmware !== "")
        {
 	    data.firmware = fs.readFileSync(argv.firmware, 'utf8') ;
        }

        if (argv.assembly !== "") {
            if (argv.action === "help")
 	         data.assembly = argv.assembly ; // -a help -m ep -s **cop**
            else data.assembly = fs.readFileSync(argv.assembly, 'utf8') ;
        }

        if (argv.resultok !== "") {
 	    data.result_ok = fs.readFileSync(argv.resultok, 'utf8') ;
        }

	// 3) action
        return ws.wepsim_nodejs_doAction(data, options) ;
   }
   catch (e)
   {
        console.log(ws_help_usage() + '\n\n' +
                    e.stack + '\n') ;
        return false ;
   }

