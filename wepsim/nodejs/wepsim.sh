#!/usr/bin/env node


   //
   // Help
   //

   var ws_cl_ver = 'WepSIM-cl v1.8.1' ;

   function ws_help_usage ()
   {
       var o = '\n' +
               ws_cl_ver + '\n' +
	       '> WepSIM simulator interface for command line.\n' +
	       '\n' +
	       'For more details please use:\n' +
	       ' ./wepsim.sh -h\n' +
	       ' ./wepsim.sh --examples basic\n' +
	       ' ./wepsim.sh --examples more' ;

        return o ;
   }

   function ws_help_examples_basic ()
   {
       var o = '\n' +
               ws_cl_ver + '\n' +
               '> WepSIM simulator interface for command line.\n' +
               '\n' +
               'Examples:\n' +
               ' * Run some example and show the final state:\n' +
               '   ./wepsim.sh -a run -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
               '   ./wepsim.sh -a run --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               '\n' +
               ' * Run some example and show the state on each assembly instruction executed:\n' +
               '   ./wepsim.sh -a stepbystep -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
               '   ./wepsim.sh -a stepbystep --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               '\n' +
               ' * Run some example and show the state on each microinstruction executed:\n' +
               '   ./wepsim.sh -a microstepbymicrostep -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
               '   ./wepsim.sh -a microstepbymicrostep --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               '\n' +
               ' * Check that some example meets the expected final state (so it works):\n' +
               '   ./wepsim.sh -a check -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt -r ./examples/checklist/cl-ep_s1_e1.txt\n' +
               '\n' +
               ' * Run some example and show a description for each microinstruction executed:\n' +
               '   ./wepsim.sh -a microstepverbalized -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt --verbal text\n' +
               '   ./wepsim.sh -a microstepverbalized --checkpoint ./examples/checkpoint/tutorial_1.txt --verbal math\n' +
               '\n' +
               ' * Show console output after execution:\n' +
               '   ./wepsim.sh -a show-console -m ep -f ./examples/microcode/mc-ep_os.txt -s ./examples/assembly/asm-ep_s4_e1.txt\n' +
               '' ;

        return o ;
   }

   function ws_help_examples_more ()
   {
       var o = '\n' +
               ws_cl_ver + '\n' +
               '> WepSIM simulator interface for command line.\n' +
               '\n' +
               'Additional examples:\n' +
               ' * Help on signal:\n' +
               '   ./wepsim.sh -a help -m ep -f cop\n' +
               '\n' +
               ' * Run some example and limit the "clock cycles"/"instructions":\n' +
               '   ./wepsim.sh -a stepbystep --checkpoint ./examples/checkpoint/tutorial_1.txt --maxc 10000\n' +
               '   ./wepsim.sh -a stepbystep --checkpoint ./examples/checkpoint/tutorial_1.txt --maxi 2048\n' +
               '\n' +
               ' * Show recorded session:\n' +
               '   ./wepsim.sh -a show-record --checkpoint ./examples/checkpoint/tutorial_1.txt\n' +
               '\n' +
               ' * Build checkpoint from assembly and microcode, and print it to standard output:\n' +
               '   ./wepsim.sh -a build-checkpoint -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt\n' +
               '\n' +
               ' * Export hardware definition as JSON:\n' +
               '   ./wepsim.sh -a export-hardware -m ep > examples/hardware/ep/hw_def.json\n' +
               '\n' +
               ' * Build MIPS32-like microcode for testing in command-line:\n' +
               '   ./wepsim.sh -a import-creator --checkpoint ./MIPS-32-like.json > microcode.txt\n' +
               '   ./wepsim.sh -a run -m ep -f ./microcode.txt -s examples/assembly/asm-ep_s6_e3.txt\n' +
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
              .help('h')
              .demandOption(['action'])
              .argv ;


   //
   // Main: help
   //

   if ( (argv.examples !== "") || (argv.action === "usage") )
   {
       var o = ws_help_usage() + '\n' ;

       if ("basic" == argv.examples) {
           o = ws_help_examples_basic() ;
       }

       if ("more" == argv.examples) {
           o = ws_help_examples_more() ;
       }

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


	// 2) workset
	var data = {} ;

	data.mode      = argv.mode ;
	data.action    = argv.action.toUpperCase() ;
	data.firmware  = '' ;
	data.assembly  = '' ;
	data.record    = '' ;
 	data.result_ok = '' ;

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
            if (argv.action === "help")
 	         data.firmware = argv.firmware ; // -a help -m ep -f **cop**
            else data.firmware = fs.readFileSync(argv.firmware, 'utf8') ;
        }

        if (argv.assembly !== "") {
 	    data.assembly = fs.readFileSync(argv.assembly, 'utf8') ;
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

