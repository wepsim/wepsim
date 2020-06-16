/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    //
    // Preload work
    //

    function wepsim_preload_fromHash ( hash )
    {
        var key = '' ;
        var act = function() {} ;

        // preload tasks in order
	var o = '' ;
        for (var i=0; i<ws_preload_tasks.length; i++)
        {
	    key = ws_preload_tasks[i].name ;
	    act = ws_preload_tasks[i].action ;

	    if (hash[key] !== '') {
	        o = o + act(hash) ;
            }
        }

	// notification: to notify of the preloaded work to the user
	if (o !== '')
	{
	    o = 'WepSIM has been instructed to preload some work for you:<br>' +
	        '<ul>' + o + '</ul>' +
	        'To close this notification please press in the ' +
	        '<span class="btn btn-sm btn-info py-0" data-dismiss="alert">X</span> mark. <br>' +
	        'In order to execute an example please press the ' +
	        '<span class="btn btn-sm btn-info py-0" ' + 
                '      onclick="wepsim_execute_toggle_play(\'#btn_run_stop\');">Run</span> button.<br>' ;

	    if (hash.notify.toLowerCase() !== 'false') {
	        wepsim_notify_do_notify('WepSIM preloads some work', o, 'info', 0) ;
	    }
	}

	// return ok
	return 0 ;
    }

    function wepsim_preload_get2hash ( window_location )
    {
	    var hash       = {} ;
            var hash_field = '' ;
	    var uri_obj    = null ;

	    // 1.- check params
	    if (typeof window_location === "undefined") {
		return hash ;
	    }

	    // 2.- get parameters
            var parameters = new URL(window_location).searchParams ;
            for (i=0; i<ws_preload_tasks.length; i++) 
            {
                 hash_field = ws_preload_tasks[i].name ;
                 hash[hash_field] = parameters.get(hash_field) ;

	         // overwrite null with default values
                 if (hash[hash_field] === null) {
                     hash[hash_field] = '' ;
                 }
            }
	
	    // 3.- get parameters from json
	    if (hash.preload !== '')
	    {
		try {
	           uri_obj = new URL(hash.preload) ;
	           wepsim_url_json(uri_obj.pathname, wepsim_preload_fromHash) ;
		}
		catch (e) { 
		   ws_alert('unable to preload json from "' + uri_obj.pathname + '"') ;
                }
	    }

	    return hash ;
    }

