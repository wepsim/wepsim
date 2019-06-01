/*     
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Register File: init_x & show_x
         */

        var callback_rf_show_values = function () { 
		                         return true; 
	                              } ;

        var callback_rf_show_names  = function () { 
		                         return true; 
	                              } ;


        function init_rf ( rf_show_values, rf_show_names )
        {
            if (rf_show_values !== null) {   
                callback_rf_show_values = rf_show_values ;
            }

            if (rf_show_names !== null) {   
                callback_rf_show_names  = rf_show_names ;
            }

	    return true ;
        }

        function show_rf_values ( )
        {
            return callback_rf_show_values() ;
        }

        function show_rf_names ( )
        {
            return callback_rf_show_names() ;
        }


        /*
         *  CPU Registers outside RF: init_x & show_x
         */

        var callback_states_show = function () { 
		                      return true; 
	                           } ;

        function init_states ( states_show )
        {
            if (states_show !== null) {   
                callback_states_show = states_show ;
            }

	    return true ;
        }

        function show_states ( )
        {
            return callback_states_show() ;
        }

