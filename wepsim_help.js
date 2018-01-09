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
     * Help management
     */

    function table_helps_html ( helps )
    {
       var o = '<div class="table-responsive">' +
               '<table width=100% class="table table-striped table-hover table-condensed">' +
               '<thead>' +
               '<tr>' +
               '  <th>#</th>' +
               '  <th>title</th>' +
               '  <th onclick="$(\'.collapse2\').collapse(\'toggle\');">description</th>' +
               '</tr>' +
               '</thead>' +
               '<tbody>';
       for (var m=0; m<helps.length; m++)
       {
	       var e_title       = helps[m].title ;
	       var e_type        = helps[m].type ;
	       var e_reference   = helps[m].reference ;
	       var e_description = helps[m].description ;
	       var e_id          = helps[m].id ;

               var onclick_code = "" ;
               if ("relative" == e_type) 
                   onclick_code = 'wepsim_help_set_relative(\'' + e_reference + '\');' + 
                                  'wepsim_help_refresh();' ;
               if ("absolute" == e_type) 
                   onclick_code = 'wepsim_help_set_absolute(\'' + e_reference + '\');' + 
                                  'wepsim_help_refresh();' ;
               if ("code" == e_type) 
                   onclick_code = e_reference ;

	       o = o + '<tr>' +
		       '<td>' + '<b>' + (m+1) + '</b>' + '</td>' +
		       ' <td>' + 
                       '  <a href="#" ' +
                       '     class="ui-btn btn btn-group ui-btn-inline" ' +
                       '     style="background-color: #D4DB17; padding:0 0 0 0;" ' +
		       '     onclick="' + onclick_code + '"><b>' + e_title + '</b></a>' +
                       ' </td>' +
		       ' <td class="collapse2 collapse in">' +
		       '   <c>' + e_description + '</c>' + 
                       ' </td>' +
		       '</tr>' ;
       }
       o = o + '</tbody>' +
               '</table>' +
               '</div>' ;

       return o ;
    }


    /*
     * Help
     */

    function wepsim_help_refresh ( )
    {
        var rel = $('#help1_ref').data('relative') ;
        if ( (typeof rel != "undefined") && (rel != "") )
        {
            $('#iframe_help1').load('help/simulator-' + get_cfg('ws_idiom') + '.html ' + rel,
	    		            function() {
                                        $('#help1').trigger('updatelayout');
                                        $('#help1').modal('show');
                                    });

            ga('send', 'event', 'help', 'help.simulator', 'help.simulator.' + rel);
            return ;
        }

        var ab1 = $('#help1_ref').data('absolute') ;
        if ( (typeof ab1 != "undefined") && (ab1 != "") )
        {
            $('#iframe_help1').load('help/' + ab1 + '-' + get_cfg('ws_idiom') + '.html',
	    		            function() {
                                        $('#help1').trigger('updatelayout');
                                        $('#help1').modal('show');
                                    });

            ga('send', 'event', 'help', 'help.' + ab1, 'help.' + ab1 + '.*');
            return ;
        }

        var cod1 = $('#help1_ref').data('code') ;
        if ( (typeof cod1 != "undefined") && (cod1 == "true") )
        {
            ga('send', 'event', 'help', 'help.code', 'help.code.*');
            return ;
        }

        wepsim_open_help_index() ;
    }

    function wepsim_open_help_index ( )
    {
        var help_xx = help[get_cfg('ws_idiom')] ;

	$('#iframe_help1').html(table_helps_html(help_xx)) ;
	$('#iframe_help1').enhanceWithin() ;

	$('#help1_ref').data('relative','') ;
	$('#help1_ref').data('absolute','') ;
	$('#help1_ref').data('code','false') ;

	$('#help1').trigger('updatelayout') ;
	$('#help1').modal('show') ;
    }

    function wepsim_open_help_content ( content )
    {
        $('#iframe_help1').html(content) ;
        $('#iframe_help1').enhanceWithin() ;

        $('#help1_ref').data('relative', '') ;
	$('#help1_ref').data('absolute', '') ;
	$('#help1_ref').data('code','true') ;

        $('#help1').trigger('updatelayout') ;
        $('#help1').modal('show') ;
    }

    function wepsim_close_help ( )
    {
	$('#help1').modal('hide') ;
    }

    function wepsim_help_set_relative ( rel )
    {
        $('#help1_ref').data('relative', rel) ;
	$('#help1_ref').data('absolute','') ;
	$('#help1_ref').data('code','false') ;
    }

    function wepsim_help_set_absolute ( ab1 )
    {
        $('#help1_ref').data('relative','') ;
        $('#help1_ref').data('absolute', ab1) ;
	$('#help1_ref').data('code','false') ;
    }

    function update_checker_loadhelp ( helpdiv, key )
    {
	var help_base = 'help/simulator-' + get_cfg('ws_idiom') + '.html #' + key;
	$(helpdiv).load(help_base,
			      function(response, status, xhr) {
				  if ( $(helpdiv).html() == "" )
				       $(helpdiv).html('<br>Sorry, there is no more details.<p>\n');

				  $(helpdiv).trigger('create');
			      });

        ga('send', 'event', 'help', 'help.checker', 'help.checker.' + key);
    }

