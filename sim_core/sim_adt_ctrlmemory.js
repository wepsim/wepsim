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


        /*
         *  memory => {
         *               "0x...": { value: "SIGNAL=1011", ... },
         *               ...
         *            }
         */

        function control_memory_getkeys ( memory )
        {
            return Object.keys(memory) ;
        }

        function control_memory_get ( memory, elto )
        {
            return memory[elto] ;
        }

        function control_memory_set ( memory, elto, melto )
        {
            // default computed attributes
            if (typeof melto.changed     === "undefined")  melto.changed     = false ;
            if (typeof melto.state       === "undefined")  melto.state       = false ;
            if (typeof melto.breakpoint  === "undefined")  melto.breakpoint  = false ;
            if (typeof melto.notify      === "undefined")  melto.notify      = [] ;
            if (typeof melto.bgcolor     === "undefined")  melto.bgcolor     = '' ;

            // modify computed attributes by comments "operators"
            var comments_str = '' ;
            if (null != melto.comments)
            {
                comments_str = melto.comments.join("\n") ;

	        melto.state      = melto.state      || (comments_str.trim().split("state:").length > 1) ;
	        melto.breakpoint = melto.breakpoint || (comments_str.trim().split("break:").length > 1) ;
	        melto.notify     =                      comments_str.trim().split("notify:") ;
	        for (var k=0; k<melto.notify.length; k++) {
	             melto.notify[k] = melto.notify[k].split('\n')[0] ;
	        }
            }

            // get existing element (or undefined)
            var valobj = memory[elto] ;

            // if element exits -> update it and return it
            if (typeof valobj !== "undefined")
            {
                set_value(valobj, melto.value) ;
                valobj.changed = melto.changed ;

                if (null != melto.comments) {
                    valobj.comments   = melto.comments ;
		    valobj.state      = melto.state ;
		    valobj.breakpoint = melto.breakpoint ;
		    valobj.notify     = melto.notify ;
                }

                return valobj ;
            }

            // new element to be added and return "undefined" to inform the callee
            memory[elto] = melto ;

            return valobj ;
        }


        //
        // Get fields
        //

        function control_memory_getvalue ( memory, elto )
        {
            var valobj = memory[elto] ;

            if (typeof valobj === "undefined") {
                return valobj ;
            }

            return get_value(valobj) ;
        }

