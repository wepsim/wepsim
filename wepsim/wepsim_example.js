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
        $("#container-example1").enhanceWithin();
	$('#example1').trigger('updatelayout') ;
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
	$.mobile.pageContainer.pagecontainer('change', '#main4');
	inputasm.setValue("Please wait...");
	inputasm.refresh();

	var url     = "examples/exampleCode" + example_id + ".txt" ;
        var do_next = function( mcode ) {
			    inputasm.setValue(mcode);
			    inputasm.refresh();

                            var ok = false ;
                            var SIMWARE = get_simware() ;
	                    if (SIMWARE.firmware.length != 0)
                                ok = wepsim_compile_assembly(mcode);

			    if (true == ok)
			    {
                                if (true == chain_next_step)
				    setTimeout(function(){
					          $.mobile.pageContainer.pagecontainer('change', '#main1');
                                                  show_memories_values();
				               }, 50);
			    }

                            wepsim_notify_success('<strong>INFO</strong>', 
                                                  'Example ready to be used.') ;
                      };
        wepsim_load_from_url(url, do_next) ;

        ga('send', 'event', 'example', 'example.assembly', 'example.assembly.' + example_id);
    }

    function load_from_example_firmware ( example_id, chain_next_step )
    {
	$.mobile.pageContainer.pagecontainer('change', '#main3');
	inputfirm.setValue("Please wait...");
	inputfirm.refresh();

	var url = "" ;
	var mode = get_cfg('ws_mode');
	if ('wepmips' == mode) {
	    url = "examples/exampleMicrocodeMIPS.txt" ;
	    inputfirm.setOption('readOnly', true);
        }
	else {
	    url = "examples/exampleMicrocode" + example_id + ".txt" ;
	    inputfirm.setOption('readOnly', false);
	}

        var do_next = function( mcode ) {
			   inputfirm.setValue(mcode);
			   inputfirm.refresh();

			   var ok = wepsim_compile_firmware(mcode);
                           if (true == ok)
                           {
                                  if (true == chain_next_step)
                                       setTimeout(function() {
                                                     load_from_example_assembly(example_id, chain_next_step);
                                                  }, 50);
                                  else show_memories_values();
                           }

                           wepsim_notify_success('<strong>INFO</strong>', 
                                                 'Example ready to be used.') ;
                      };
        wepsim_load_from_url(url, do_next) ;

        ga('send', 'event', 'example', 'example.firmware', 'example.firmware.' + example_id);
    }

    function table_examples_html ( examples )
    {
       var o = "" ;

       var fmt_toggle    = "" ;
       var fmt_header    = "" ;
       var e_title       = "" ;
       var e_level       = "" ;
       var e_description = "" ;
       var e_id          = "" ;

       var lang = get_cfg('ws_idiom') ;

       o = o + '<div class="container grid-striped">' ;
       for (var m=0; m<examples[lang].length; m++)
       {
	       fmt_header = "" ;
	       if (e_level != examples[lang][m].level)
                   fmt_header = "<div class='row'>" + 
			        "<div class='col-sm-12 text-right text-capitalize font-weight-bold'>" + examples[lang][m].level + "</div>" + 
			        "</div>" ;

	       e_title       = examples[lang][m].title ;
	       e_level       = examples[lang][m].level ;
	       e_description = examples[lang][m].description ;
	       e_id          = examples[lang][m].id ;

                if (fmt_toggle == "")
                    fmt_toggle = "bg-light" ;
               else fmt_toggle = "" ;

	       o = o + fmt_header +
                        "<div class='row py-1 " + fmt_toggle + "' id='" + e_level + "'>" +
                        '<div class="col-sm-auto">' +
                        '    <span class="badge badge-pill badge-light">' + (m+1) + '</span>' +
                        '</div>' +
                        '<div class="col-sm-3">' +
		        '   <span onclick="$(\'#example1\').modal(\'hide\'); load_from_example_firmware(\'' + e_id + '\',true);"  style="padding:0 0 0 0; margin:0 8 0 0;"' +
		        '         class="bg-primary text-white">' + e_title + '</span>' +
                        '</div>' +
                        '<div class="col-sm-6">' +
                        '    <c>' + e_description + '</c>' +
                        '</div>' +
                        '<div class="col-sm">' +
		        '     <div class="btn-group btn-group-justified btn-group-md">' +
		        '         <a href="#" onclick="$(\'#example1\').modal(\'hide\'); load_from_example_assembly(\'' + e_id + '\',false);"  style="padding:0 0 0 0; margin:0 8 0 0;"' +
		        '            class="ui-btn btn btn-group ui-btn-inline btn-secondary">' +
		        '            <c>Assembly</c></a>' +
		        '         <a href="#" onclick="$(\'#example1\').modal(\'hide\'); load_from_example_firmware(\'' + e_id + '\',false);" style="padding:0 0 0 0; margin:0 7 0 0;"' +
		        '            class="ui-btn btn btn-group ui-btn-inline btn-secondary">' +
		        '            <c>Firmware</c></a>' +
		        '     </div>' +
                        '</div>' +
                        '</div>' ;
       }
       o = o + '</div>' ;

       return o ;
    }

    function table_examples_htmltable ( examples )
    {
       var lang = get_cfg('ws_idiom') ;

       var o = '<div class="table-responsive" style="min-width:720px;">' +
               '<table class="table table-striped table-hover table-sm">' +
               '<thead>' +
               '<tr>' +
               '  <th>#</th>' +
               '  <th onclick="$(\'.collapse1\').collapse(\'toggle\');">level</th>' +
               '  <th>load...</th>' +
               '  <th onclick="$(\'.collapse3\').collapse(\'toggle\');">description</th>' +
               '  <th onclick="$(\'.collapse4\').collapse(\'toggle\');">load only...</th>' +
               '</tr>' +
               '</thead>' +
               '<tbody>';
       for (var m=0; m<examples[lang].length; m++)
       {
	       var e_title       = examples[lang][m].title ;
	       var e_level       = examples[lang][m].level ;
	       var e_description = examples[lang][m].description ;
	       var e_id          = examples[lang][m].id ;

	       o = o + ' <tr>' +
		       ' <td>' + '<b>' + (m+1)   + '</b>' + '</td>' +
		       ' <td>' + '<b    class="collapse1 collapse show">' + e_level + '</b>' + '</td>' +
		       ' <td>' + 
		       '   <a href="#" onclick="$(\'#example1\').modal(\'hide\'); load_from_example_firmware(\'' + e_id + '\',true);"  style="padding:0 0 0 0; margin:0 8 0 0;"' +
		       '      class="ui-btn btn btn-group ui-btn-inline btn-primary">' + 
                       '   <b class="collapse2 collapse show">' + e_title + '</b></a>' +
                       ' </td>' +
		       ' <td>' + '<span class="collapse3 collapse show">' + e_description + '</span>' + '</td>' +
		       ' <td class="collapse4 collapse show" style="min-width:150px; max-width:200px">' +
		       '     <div class="btn-group btn-group-justified btn-group-md">' +
		       '         <a href="#" onclick="$(\'#example1\').modal(\'hide\'); load_from_example_assembly(\'' + e_id + '\',false);"  style="padding:0 0 0 0; margin:0 8 0 0;"' +
		       '            class="ui-btn btn btn-group ui-btn-inline btn-secondary">' +
		       '            <c>Assembly</c></a>' +
		       '         <a href="#" onclick="$(\'#example1\').modal(\'hide\'); load_from_example_firmware(\'' + e_id + '\',false);" style="padding:0 0 0 0; margin:0 7 0 0;"' +
		       '            class="ui-btn btn btn-group ui-btn-inline btn-secondary">' +
		       '            <c>Firmware</c></a>' +
		       '     </div>' +
		       ' </td>' +
		       ' </tr>' ;
       }
       o = o + '</tbody>' +
               '</table>' +
               '</div>' ;

       return o ;
    }

