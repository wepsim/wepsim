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


        function main_memory_isundefined ( memory, key )
        {
	    return (typeof memory[key] == "undefined") ;
        }

        function main_memory_getword ( memory, key )
        {
            // get value...
            var value = "0" ;
            if (typeof memory[key] !== "undefined") {
                value = get_value(memory[key]).toString(16) ;
            }
	    value = simcoreui_pack(value, 8) ;

            // pack value...
	    var value4 = [] ;
            for (var i=0; i<4; i++) {
                 value4[i] = value[2*i].toUpperCase() + value[2*i+1].toUpperCase() ;
            }

	    return value4 ;
        }

        function main_memory_getsrc ( memory, key )
        {
            // get value...
            var src = "" ;
            if (typeof memory[key] !== "undefined")
            {
                if (typeof memory[key].source !== "undefined")
                    src = memory[key].source ;
            }

            // escape html end attribute char
            src = src.replace(/'/g, '') ;
            src = src.replace(/"/g, '') ;

	    return src ;
        }

        function main_memory_getkeys ( memory )
        {
            return Object.keys(memory) ;
        }

