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
         *  API REST: public API
         */

        var simcore_rest = {} ;


        // reset
        function simcore_rest_reset ( )
        {
            simcore_rest = {} ;
        }

        // add
        function simcore_rest_add ( name, description )
        {
	    simcore_rest[name] = {
		                    endpoint:     description.endpoint,
		                    user:         description.user,
		                    pass:         description.pass,
		                    last_request: null
	                         } ;
        }

        // list
        function simcore_rest_list ( )
        {
            return simcore_rest ;
        }

        // get
        function simcore_rest_get ( name )
        {
            return simcore_rest[name] ;
        }

        // invoke
        function simcore_rest_call ( name, method, uri, data )
        {
	    // check API rest
            var rest_info = simcore_rest[name] ;
	    if (typeof rest_info === "undefined") {
		return false ;
	    }

	    // check endpoint
	    var api_endpoint = rest_info.endpoint ;
            if (api_endpoint.value instanceof Vuex.Store) {
	        api_endpoint = get_value(api_endpoint) ;
            }

	    if (api_endpoint.trim() === "") {
		return false ;
	    }

	    // build request
            var basic_auth = "Basic " + btoa(rest_info.user + ":" + rest_info.pass) ;
            var enc_data   = JSON.stringify(data) ;

            var request = {
                url:         api_endpoint + uri,
                type:        method,
                contentType: "application/json",
                accepts:     "application/json",
                cache:       false,
                dataType:    'json',
                data:        enc_data,
                beforeSend:  function (xhr) {
		    if (rest_info.user.trim() !== "") {
                        xhr.setRequestHeader("Authorization", basic_auth) ;
		    }
                },
                error: function(jqXHR) {
                    console.log("ajax error " + jqXHR.status);
                }
            };

	    // do request
            rest_info.last_request = $.ajax(request) ;
	    return true ;
        }

