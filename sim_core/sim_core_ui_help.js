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


     function update_signal_loadhelp ( helpdiv, simhw, key )
     {
	     var curr_idiom = get_cfg('ws_idiom') ;
	     var help_base = 'help/' + simhw + '/signals-' + curr_idiom + '.html #' + key;

	     $(helpdiv).load(help_base,
			     function(response, status, xhr) {
				if ( $(helpdiv).html() == "" ) {
				     $(helpdiv).html('<br>Sorry, No more details available for this signal.<p>\n');
                                }

				$(helpdiv).trigger('create');
			     });

             ga('send', 'event', 'help', 'help.signal', 'help.signal.' + key);
     }

     function update_checker_loadhelp ( helpdiv, key )
     {
          var curr_idiom = get_cfg('ws_idiom') ;
  	  var help_base = 'help/simulator-' + curr_idiom + '.html #' + key;

	  $(helpdiv).load(help_base,
			  function(response, status, xhr) {
				if ( $(helpdiv).html() == "" ) {
				     $(helpdiv).html('<br>Sorry, there is no more details.<p>\n');
                                }

				$(helpdiv).trigger('create');
			  });

          ga('send', 'event', 'help', 'help.checker', 'help.checker.' + key);
     }

