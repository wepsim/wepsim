/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


    /*
     * Example set management
     */

    ws_info.examples = [] ;
    ws_info.example_set    = [{ "name": "Empty", "url": "", "url_base_asm": "", "url_base_mc": "" }] ;
    ws_info.example_active = -1 ;

    function wepsim_example_reset ( )
    {
       ws_info.examples = [] ;
       ws_info.example_active = -1 ;

       webui_toolbar_updateExampleSet() ;
    }

    function wepsim_example_load ( e_name )
    {
       var jobj = null ;

       // try to load each one
       ws_info.examples = [] ;

       for (var i=0; i<ws_info.example_set.length; i++)
       {
            if (ws_info.example_set[i].aliases.includes(e_name) == false) {
                continue ;
            }
            if (typeof ws_info.example_set[i].url === "undefined") {
                continue ;
            }

            jobj = wepsim_url_getJSON(ws_info.example_set[i].url) ;
	    ws_info.examples = ws_info.examples.concat(jobj) ;
            ws_info.example_active = i ;

            set_cfg('ws_examples_set', e_name) ;
       }

       webui_toolbar_updateExampleSet() ;

       return ws_info.examples ;
    }

    function wepsim_example_loadSet ( url_example_set, set_name )
    {
       // try to load the set
       ws_info.example_set = wepsim_url_getJSON(url_example_set) ;

       return ws_info.example_set ;
    }

    function wepsim_example_getSet ( )
    {
       return ws_info.example_set ;
    }


    /*
     * Example UI management
     */

    function example_id2hash ( example_id )
    {
        var eltos = {
               sample_hw:  "",
               sample_mc:  "",
               sample_asm: ""
            } ;

	// example_id -> url
        var sid = example_id.split(":") ;

        if (sid.length > 0)
             eltos.sample_hw = sid[0] ;
        else console.log("warning: example without hardware id\n" +
                         " * example  id: " + example_id + "\n" +
                         " * expected id: *ep*:microcode_X:assembly_Y\n") ;

        if (sid.length > 1)
             eltos.sample_mc = sid[1] + ".mc" ;
        else console.log("warning: example without microcode id\n" +
                         " * example  id: " + example_id + "\n" +
                         " * expected id: ep:*microcode_X*:assembly_Y\n") ;

        if (sid.length > 2)
             eltos.sample_asm = sid[2] + ".asm" ;
        else console.log("warning: example without assembly id\n" +
                         " * example  id: " + example_id + "\n" +
                         " * expected id: ep:microcode_X:*assembly_Y*\n") ;

        return eltos ;
    }

    function load_from_example_assembly ( example_id, chain_next_step )
    {
        if (-1 == ws_info.example_active) {
            ws_alert("warning: no active example set") ;
            return ;
        }

	inputasm.setValue("Please wait...");
	inputasm.refresh();

	// example_id -> url
        var eltos = example_id2hash(example_id) ;
        var url   = ws_info.example_set[ws_info.example_active].url_base_asm + "/" + eltos.sample_asm ;

	// do next
        var do_next = function( mcode ) {
			    inputasm.setValue(mcode);
			    inputasm.refresh();

                            // compile it
                            var ok = false ;
                            var SIMWARE = get_simware() ;
	                    if (SIMWARE.firmware.length !== 0) {
                                ok = wepsim_compile_assembly(mcode) ;
			        inputasm.is_compiled = ok ;
			    }

                            // stop here if error is found
			    if (false === ok) {
			        wsweb_change_workspace_assembly() ;
                                return ;
			    }

                            // chain to next task
                            if (true === chain_next_step) {
				setTimeout(function() {
					      wsweb_change_workspace_simulator() ;
				           }, 50);
                             }

			     setTimeout(function() {
                                           show_memories_values();
				        }, 500);

                             wepsim_notify_success('<strong>INFO</strong>',
                                                   'Example ready to be used.') ;
                      };
        wepsim_load_from_url(url, do_next) ;

        // add if recording
        simcore_record_append_new('Load assembly from example ' + example_id,
                                  'load_from_example_assembly("' + example_id + '", ' + chain_next_step + ');\n') ;

	// stats about examples
        simcore_ga('example', 'example.assembly', 'example.assembly.' + eltos.sample_hw + "." + eltos.sample_asm) ;
    }

    function load_from_example_firmware ( example_id, chain_next_step )
    {
        if (-1 == ws_info.example_active) {
            ws_alert("warning: no active example set") ;
            return ;
        }

	inputfirm.setValue("Please wait...");
	inputfirm.refresh();
	inputfirm.setOption('readOnly', false);

	// example_id -> url
        var eltos = example_id2hash(example_id) ;
        var url   = ws_info.example_set[ws_info.example_active].url_base_mc + "/" + eltos.sample_mc ;

	// do next
        var do_next = function( mcode ) {
			   inputfirm.setValue(mcode);
			   inputfirm.refresh();

			   var ok = wepsim_compile_firmware(mcode);
			   inputfirm.is_compiled = ok ;

                            // stop here if error is found
			    if (false === ok) {
                                wsweb_change_workspace_microcode();
                                return ;
			    }

                           // update register view (just in case firmware is updated)
                           wepsim_show_rf_names() ;

                           // chain to next task
                           if (true === chain_next_step)
                           {
                               setTimeout(function() {
                                             load_from_example_assembly(example_id, chain_next_step);
                                          }, 50);
                           }
                           else {
                               setTimeout(function() {
                                             show_memories_values();
                                             asmdbg_update_assembly() ;
                                          }, 50);

                               wepsim_notify_success('<strong>INFO</strong>',
                                                     'Example ready to be used.') ;
                           }
                      };
        wepsim_load_from_url(url, do_next) ;

        // add if recording
        simcore_record_append_new('Load firmware from example ' + example_id,
                                  'load_from_example_firmware("' + example_id + '", false);\n') ;

	// stats about examples
        simcore_ga('example', 'example.firmware', 'example.firmware.' + eltos.sample_hw + "." + eltos.sample_mc) ;
    }

    function share_example ( m, base_url )
    {
	 // example information
	 var e_description = ws_info.examples[m].description ;
	     e_description = e_description.replace(/<[^>]+>/g,'') ;
	 var e_id          = ws_info.examples[m].id ;
	 var e_hw          = ws_info.examples[m].hardware ;
         var es_name       = ws_info.example_set[ws_info.example_active].name ;

	 // share information
	 var share_title = 'WepSIM example ' + e_id + '...' ;
	 var share_text  = 'This is a link to the WepSIM example ' + e_id + ' (' + e_description + '):\n' ;
	 var share_url   = '' + base_url + '?mode=' + e_hw +
                                           '&examples_set=' + es_name +
                                           '&example=' + m ;

	 return share_information('example_' + m,
	 	                  share_title,
		                  share_text,
		                  share_url) ;
    }

