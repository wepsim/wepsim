/*
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
     * Examples
     */

    function wepsim_open_examples_index ( )
    {
        $("#container-example1").html(table_examples_html(examples));
      //$('#example1').trigger('updatelayout') ;
	$('#example1').modal('show') ;
    }

    function wepsim_close_examples ( )
    {
	$('#example1').modal('hide') ;
    }


    /*
     * Example management
     */

    function load_from_example_assembly ( example_id, chain_next_step )
    {
	inputasm.setValue("Please wait...");
	inputasm.refresh();

        var sample_hw = "" ;
        var sample_id = "" ;
        var sid = example_id.split(":") ;
        if (2 == sid.length) {
            sample_hw = sid[0] ;
            sample_id = sid[1] ;
        }
        else {
            console.log("warning: example without hardware id") ;
        }

	var url     = "examples/" + sample_hw + "/exampleCode" + sample_id + ".txt" ;
        var do_next = function( mcode ) {
			    inputasm.setValue(mcode);
			    inputasm.refresh();

                            // compile it
                            var ok = false ;
                            var SIMWARE = get_simware() ;
	                    if (SIMWARE.firmware.length != 0) {
                                ok = wepsim_compile_assembly(mcode) ;
			    }

                            // stop here if error is found
			    if (false == ok) {
			        sim_change_workspace_assembly() ;
                                return ;
			    }

                            // chain to next task
                            if (true == chain_next_step) {
				setTimeout(function() {
					      sim_change_workspace_simulator() ;
                                              show_memories_values();
				           }, 50);
                             }

                             wepsim_notify_success('<strong>INFO</strong>', 
                                                   'Example ready to be used.') ;
                      };
        wepsim_load_from_url(url, do_next) ;

        ga('send', 'event', 'example', 'example.assembly', 'example.assembly.' + sample_hw + "." + sample_id);
    }

    function load_from_example_firmware ( example_id, chain_next_step )
    {
	inputfirm.setValue("Please wait...");
	inputfirm.refresh();

        var sample_hw = "" ;
        var sample_id = "" ;
        var sid = example_id.split(":") ;
        if (2 == sid.length) {
            sample_hw = sid[0] ;
            sample_id = sid[1] ;
        }
        else {
            console.log("warning: example without hardware id") ;
        }

	var url = "" ;
	var mode = get_cfg('ws_mode');
	if ('wepmips' == mode) {
	    url = "examples/" + sample_hw + "/exampleMicrocodeMIPS.txt" ;
	    inputfirm.setOption('readOnly', true);
        }
	else {
	    url = "examples/" + sample_hw + "/exampleMicrocode" + sample_id + ".txt" ;
	    inputfirm.setOption('readOnly', false);
	}

        var do_next = function( mcode ) {
			   inputfirm.setValue(mcode);
			   inputfirm.refresh();

			   var ok = wepsim_compile_firmware(mcode);

                            // stop here if error is found
			    if (false == ok) {
                                sim_change_workspace_microcode();
                                return ;
			    }

                           // chain to next task
                           if (true == chain_next_step) 
                           {
                               setTimeout(function() {
                                             load_from_example_assembly(example_id, chain_next_step);
                                          }, 50);
                           }
                           else {
                               show_memories_values();
                           }

                           wepsim_notify_success('<strong>INFO</strong>', 
                                                 'Example ready to be used.') ;
                      };
        wepsim_load_from_url(url, do_next) ;

        ga('send', 'event', 'example', 'example.firmware', 'example.firmware.' + sample_hw + "." + sample_id);
    }

    function table_examples_html ( examples )
    {
       var o = "" ;

       var fmt_toggle    = "" ;
       var fmt_header    = "" ;
       var e_title       = "" ;
       var e_level       = "" ;
       var e_hw          = "" ;
       var e_description = "" ;
       var e_id          = "" ;

       var lang = get_cfg('ws_idiom') ;
       var mode = get_cfg('ws_mode') ;

       o = o + '<div class="container grid-striped border border-light">' ;
       for (var m=0; m<examples[lang].length; m++)
       {
	       fmt_header = "" ;
	       if (e_level != examples[lang][m].level) {
                   fmt_header = "<div class='col-sm-12 border-bottom border-secondary text-right text-capitalize font-weight-bold bg-white sticky-top'>" + 
			        examples[lang][m].hardware.toUpperCase() + ": " + 
			        examples[lang][m].level + 
			        "</div>" ;
               }

	       e_title       = examples[lang][m].title ;
	       e_level       = examples[lang][m].level ;
	       e_hw          = examples[lang][m].hardware ;
	       e_description = examples[lang][m].description ;
	       e_id          = examples[lang][m].id ;

	        if (! e_hw.split(",").includes(mode)) 
	        {
                    e_level = "" ;
		    continue ;
	        }

	        if (fmt_toggle == "")
	            fmt_toggle = "bg-light" ;
	       else fmt_toggle = "" ;

	       o = o + fmt_header +
                        "<div class='row py-1 " + fmt_toggle + "'>" +
                        '<div class="col-sm-auto">' +
                        '    <span class="badge badge-pill badge-light">' + (m+1) + '</span>' +
                        '</div>' +
                        '<div class="col-sm-3">' +
		        '   <span style="cursor:pointer;" ' + 
		        '         onclick="$(\'#example1\').modal(\'hide\'); ' + 
                        '                  load_from_example_firmware(\'' + e_hw + ":" + e_id + '\',true);" ' + 
		        '         class="bg-info text-white p-0 mr-2">' + e_title + '</span>' +
                        '</div>' +
                        '<div class="col-sm collapse7 show">' +
                        '    <c>' + e_description + '</c>' +
                        '</div>' ;

	       o = o + '<div class="col-sm-auto collapse8 collapse">' +
		        '     <div class="btn-group btn-group-justified btn-group-md">' +
		        '         <a onclick="$(\'#example1\').modal(\'hide\'); ' + 
                        '                    load_from_example_assembly(\'' + e_hw + ":" + e_id + '\',false);"' + 
		        '            class="bg-dark text-white p-0 mr-2">' +
		        '            <c>Assembly</c></a>' +
		        '         <a onclick="$(\'#example1\').modal(\'hide\'); ' + 
                        '                    load_from_example_firmware(\'' + e_hw + ":" + e_id + '\',false);"' + 
		        '            class="bg-dark text-white p-0 mr-2">' +
		        '            <c>Firmware</c></a>' +
		        '     </div>' +
                        '</div>' ;
	      
	       o = o + '</div>' ;
       }
       o = o + '</div>' ;

       return o ;
    }

