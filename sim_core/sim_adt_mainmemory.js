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
         *  memory => { "0x...": { value: 0, source: "origin" }, ... }
         */

        function main_memory_getkeys ( memory )
        {
            return Object.keys(memory) ;
        }

        function main_memory_get ( memory, elto )
        {
            return memory[elto] ;
        }

        function main_memory_set ( memory, elto, value, source )
        {
            var valobj = memory[elto] ;

            // element exits -> update it and return it
            if (typeof valobj !== "undefined") 
            {
                set_value(valobj, value) ;
                if (null != source) {
                    valobj.source = source ;
                }

                return valobj ;
            }

            // new element to be added and return "undefined" to inform the callee
            memory[elto] = {
                             "value":   value,
                             "changed": true,
                             "source":  source
                           } ;

            return valobj ;
        }


        //
        // Get fields
        //

        function main_memory_getvalue ( memory, elto )
        {
            var valobj = memory[elto] ;

            if (typeof valobj === "undefined") {
                return valobj ;
            }

            return get_value(valobj) ;
        }

        function main_memory_getsrc ( memory, elto )
        {
            var src = "" ;

            var valobj = memory[elto] ;
            if (typeof valobj === "undefined") {
                return src ;
            }

            // get_source
            if (typeof valobj.source !== "undefined") {
                src = valobj.source ;
            }
            if (Array.isArray(src)) {
                src = src.join(";") ;
            }

            // escape html end attribute char
            if (typeof src == "string") {
                src = src.replace(/'/g, '')
                         .replace(/"/g, '') ;
            }

	    return src ;
        }


        //
        //  Get value as word (32 bits)
        //

        function main_memory_getword ( memory, elto )
        {
            // get value...
            var value = "0" ;
            if (typeof memory[elto] !== "undefined") {
                value = get_value(memory[elto]).toString(16) ;
            }
	    value = simcoreui_pack(value, 8) ;

            // pack value...
	    var value4 = [] ;
            for (var i=0; i<4; i++) {
                 value4[i] = value[2*i].toUpperCase() + value[2*i+1].toUpperCase() ;
            }

	    return value4 ;
        }

        // function main_memory_fusionvalues
        //    dest:   dbvalue
        //    origin: value, dbvalue
        //    filter: part dbvalue to be updated with value = 10xx/11xx (word), 01hx (half), 00bb (byte)
        function main_memory_fusionvalues ( dbvalue, value, filter )
        {
	    if ( 0 == (filter & 0x0000000C) )
	    {  // byte
		   if ( 0 == (filter & 0x00000003) )
			dbvalue = (dbvalue & 0xFFFFFF00) | (value & 0x000000FF);
		   if ( 1 == (filter & 0x00000003) )
			dbvalue = (dbvalue & 0xFFFF00FF) | (value & 0x0000FF00);
		   if ( 2 == (filter & 0x00000003) )
			dbvalue = (dbvalue & 0xFF00FFFF) | (value & 0x00FF0000);
		   if ( 3 == (filter & 0x00000003) )
			dbvalue = (dbvalue & 0x00FFFFFF) | (value & 0xFF000000);
	     }
	     else if ( 1 == (filter & 0x0000000C) )
	     {  // half
		   if ( 0 == (filter & 0x00000002) )
			dbvalue = (dbvalue & 0xFFFF0000) | (value & 0x0000FFFF);
		   if ( 1 == (filter & 0x00000002) )
			dbvalue = (dbvalue & 0x0000FFFF) | (value & 0xFFFF0000);
	     }
	     else
	     {  // word
		   dbvalue = value;
	     }

             return dbvalue ;
        }

        function main_memory_updatevalues ( dbvalue, value, filter_size, filter_elto )
        {
	     switch (filter_size)
	     {
		 case 0: // byte
			 if ( 0 == filter_elto )
				dbvalue = (value & 0x000000FF) ;
			 if ( 1 == filter_elto )
				dbvalue = (value & 0x0000FF00) >> 8 ;
			 if ( 2 == filter_elto )
				dbvalue = (value & 0x00FF0000) >> 16 ;
			 if ( 3 == filter_elto )
				dbvalue = (value & 0xFF000000) >> 24 ;
			 break ;
		 case 1: // half
			 if ( 0 == filter_elto )
				dbvalue = (value & 0x0000FFFF) ;
			 if ( 1 == filter_elto )
				dbvalue = (value & 0x0000FFFF) ;
			 if ( 2 == filter_elto )
				dbvalue = (value & 0xFFFF0000) >> 16 ;
			 if ( 3 == filter_elto )
				dbvalue = (value & 0xFFFF0000) >> 16 ;
			 break ;
		 case 2: // 3-bytes (for 0, 1)
			 if ( 0 == filter_elto )
				dbvalue = (value & 0x00FFFFFF) ;
			 if ( 1 == filter_elto )
				dbvalue = (value & 0xFFFFFF00) ;
			 break ;
		 case 3: // word
			 dbvalue = value ;
			 break ;
	     }

             return dbvalue ;
        }


        //
        //  Get PC/SP/... memory value (or null)
        //

        function main_memory_get_program_counter ( )
        {
	      var r_ref   = simhw_sim_ctrlStates_get().pc ;
	      var r_value = null ;

	      if (typeof r_ref !== "undefined") {
		  r_ref = simhw_sim_state(r_ref.state) ;
	      }

	      if (typeof r_ref !== "undefined") {
		  r_value = get_value(r_ref) ;
	      }

	      return r_value ;
        }

        function main_memory_get_stack_baseaddr ( )
        {
            var r_value   = null ;
            var curr_firm = simhw_internalState('FIRMWARE') ;
            var sp_name   = curr_firm.stackRegister ;
            if (sp_name != null) {
                r_value = get_value(simhw_sim_states().BR[sp_name]) & 0xFFFFFFFC ;
	    }

	    return r_value ;
        }

