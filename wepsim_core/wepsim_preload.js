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


    //
    // Preload work
    //

    function wepsim_preload_fromHash ( hash )
    {
        var key = '' ;
        var act = function() {} ;

        // preload tasks in order
	var o = '' ;
        for (var i=0; i<ws_info.preload_tasks.length; i++)
        {
	    key = ws_info.preload_tasks[i].name ;
	    act = ws_info.preload_tasks[i].action ;

	    if (hash[key] !== '') {
	        o = o + act(hash) ;
            }
        }

	// return ok
	return o ;
    }

    function wepsim_preload_get2hash ( window_location, f_preload_fromHash )
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
            for (i=0; i<ws_info.preload_tasks.length; i++)
            {
                 hash_field = ws_info.preload_tasks[i].name ;
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
	           wepsim_url_json(uri_obj.pathname, f_preload_fromHash) ;
		}
		catch (e) {
		   ws_alert('unable to preload json from "' + uri_obj.pathname + '"') ;
                }
	    }

	    return hash ;
    }

