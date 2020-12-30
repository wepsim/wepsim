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
	     else if ( 4 == (filter & 0x0000000C) )
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

        function main_memory_extractvalues ( value, filter_size, filter_elto )
        {
             var dbvalue = 0 ;

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

        function main_memory_updatevalues ( value, dbvalue, filter_size, filter_elto )
        {
	     switch (filter_size)
	     {
		 case 0: // byte
			 if ( 0 == filter_elto )
				value = (value & 0xFFFFFF00) |  (dbvalue & 0x000000FF)  ;
			 if ( 1 == filter_elto )
				value = (value & 0xFFFF00FF) | ((dbvalue & 0x000000FF) << 8) ;
			 if ( 2 == filter_elto )
				value = (value & 0xFF00FFFF) | ((dbvalue & 0x000000FF) << 16) ;
			 if ( 3 == filter_elto )
				value = (value & 0x00FFFFFF) | ((dbvalue & 0x000000FF) << 24) ;
			 break ;
		 case 1: // half
			 if ( 0 == filter_elto )
				value = (value & 0xFFFF0000) |  (dbvalue & 0x0000FFFF) ;
			 if ( 1 == filter_elto )
				value = (value & 0xFFFF0000) |  (dbvalue & 0x0000FFFF) ;
			 if ( 2 == filter_elto )
				value = (value & 0x0000FFFF) | ((dbvalue & 0x0000FFFF) << 16) ;
			 if ( 3 == filter_elto )
				value = (value & 0x0000FFFF) | ((dbvalue & 0x0000FFFF) << 16) ;
			 break ;
		 case 2: // 3-bytes (for 0, 1)
			 if ( 0 == filter_elto )
				value = (value & 0xFF000000) | (dbvalue & 0x00FFFFFF) ;
			 if ( 1 == filter_elto )
				value = (value & 0x000000FF) | (dbvalue & 0xFFFFFF00) ;
			 break ;
		 case 3: // word
			 value = dbvalue ;
			 break ;
	     }

             return value ;
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

        function main_memory_get_baseaddr ( )
        {
	      var r_ref = simhw_sim_ctrlStates_get() ;
	      if (typeof r_ref === "undefined") {
		  return null ;
	      }

              var parts   = null ;
              var r_value = 0 ;
              var r_ref2  = null ;
              var all_baseaddr = {} ;
              for (var elto in r_ref)
              {
	          if (r_ref[elto].is_pointer == false) {
                      continue ;
                  }

	          parts = r_ref[elto].state.split(".") ;
	          if (parts[0] == 'BR') {
		      r_value = 0xFFFFFFFC ;
		      r_ref2 = simhw_sim_states().BR[parts[1]] ;
                  }
                  else
                  {
                      r_value = 0 ;
		      r_ref2 = simhw_sim_state(r_ref[elto].state) ;
                  }

		  if (typeof r_ref2 !== "undefined") {
                      r_value = get_value(r_ref2) ;
                  }

                  all_baseaddr[elto] = r_value ;
              }

              return all_baseaddr ;
        }

