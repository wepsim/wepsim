#!/usr/bin/env node

   var ws  = require('./min.wepsim_node.js') ;
   var fs  = require('fs') ;


   //
   // (1) default values
   //

   var data =    {
                    action:    'USAGE',
                    mode:      '',
		    firmware:  '',
		    assembly:  '',
		    result_ok: '',
		    record:    []
	         } ;

   var options = {
		    instruction_limit: 1000,
		    cycles_limit:      1024,
		    verbalize:         'text'
	         } ;

   var arg_last = 3 ;


   //
   // (2) Usage
   //

   if (process.argv.length < 3)
   {
       return ws.wepsim_nodejs_doAction(data, options) ;
   }

   data.action = process.argv[2].toUpperCase() ;
   data.mode   = process.argv[3] ;

   if (data.action.startsWith("HELP-"))
   {
       return ws.wepsim_nodejs_doAction(data, options) ;
   }

   if (typeof data.mode === "undefined")
   {
       return ws.wepsim_nodejs_doActionError(data.action) ;
   }


   //
   // (3) Get arguments
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
		   data.obj_chk  = obj_checkpoint ;
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
   // (4) Issue action
   // 

   return ws.wepsim_nodejs_doAction(data, options) ;

