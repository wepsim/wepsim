#!/usr/bin/env node

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
              .usage('\n' +
		     'WepSIM\n' +
		     '> WepSIM simulator interface for command line.\n' +
		     '\n' +
		     'For more details please use:\n' +
		     ' ./wepsim.sh help-syntax\n' +
		     ' ./wepsim.sh help-examples')
              .option('action', {
                  alias:    'a',
                  type:     'string',
                  describe: 'run | stepbystep | microstepbymicrostep | check |' +
                            'show-console | microstepverbalized |' +
                            'show-record | show-microcode | show-assembly | build-checkpoint',
                  nargs:    1,
                  demand:   true,
                  demand:   'action required',
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
              .alias('h', 'help')
              .demandOption(['action'])
              .argv ;


   //
   // Main
   //

   // wepsim: options
   var options = {} ;

   options.instruction_limit = parseInt(argv.maxi) ;
   options.cycles_limit      = parseInt(argv.maxc) ;
   options.verbalize         = (argv.verbal.toUpperCase() == "MATH") ? 'math' : 'text' ;

   // wepsim: workset
   var data = {} ;

   data.mode   = argv.mode ;
   data.action = argv.action.toUpperCase() ;

   try
   {
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
        if (argv.firmware !== "") {
 	    data.firmware = fs.readFileSync(argv.firmware, 'utf8') ;
        }
        if (argv.assembly !== "") {
 	    data.assembly = fs.readFileSync(argv.assembly, 'utf8') ;
        }
        if (argv.resultok !== "") {
 	    data.result_ok = fs.readFileSync(argv.resultok, 'utf8') ;
        }
   }
   catch (e)
   {
        console.log(e) ;
        return false ;
   }

   // wepsim: action
   try
   {
        return ws.wepsim_nodejs_doAction(data, options) ;
   }
   catch (e)
   {
        console.log(e);
        return false ;
   }

