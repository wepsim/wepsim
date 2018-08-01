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
         *  Get/Set
         */

        function get_value ( sim_obj )
        {
	   if (typeof sim_obj.value == "function")
	   {
	       return sim_obj.value() ;
	   }
	   else if (typeof sim_obj.default_value == "object")
	   {
	       return sim_obj.value ;
	   }
	   else
	   {
	       return sim_obj.value ;
	   }
        }

        function set_value ( sim_obj, value )
        {
	   if (typeof sim_obj.value == "function") 
	   {
	       if (sim_obj.value() != value)
	           sim_obj.changed = true ;

	       sim_obj.value(value) ;
           }
	   else if (typeof sim_obj.default_value == "object")
	   {
	       if (sim_obj.value != value)
	           sim_obj.changed = true ;

	       sim_obj.value = value ;
           }
	   else
	   {
	       if (sim_obj.value != value)
	           sim_obj.changed = true ;

	       sim_obj.value = value ;
           }
        }

        function reset_value ( sim_obj )
        {
           if (typeof sim_obj.value == "function")
	   {
	        if (sim_obj.value() != sim_obj.default_value)
	            sim_obj.changed = true ;

	        set_value(sim_obj, sim_obj.default_value) ;
           }
	   else if (typeof sim_obj.default_value == "object")
	   {
	        sim_obj.changed = true ;
	        sim_obj.value = Object.create(sim_obj.default_value) ;
           }
	   else if (sim_obj instanceof Array)
	   {
	        sim_obj.changed = true ;
	        for (var i=0; i<sim_obj.length; i++)
	  	     set_value(sim_obj[i], sim_obj[i].default_value) ;
           }
	   else
	   {
	        if (sim_obj.value != sim_obj.default_value)
	            sim_obj.changed = true ;

	        set_value(sim_obj, sim_obj.default_value) ;
           }
        }


        /*
         *  References
         */

        var sim_references = new Object() ;

        function compute_references ( )
        {
            for (var key in simhw_sim_signals()) {
		 sim_references[key] = simhw_sim_signal(key) ;
		 simhw_sim_signal(key).changed = false ;
	    }

            for (var key in simhw_sim_states()) {
		 sim_references[key] = simhw_sim_state(key) ;
		 simhw_sim_state(key).changed = false ;
	    }
        }

        function get_reference ( sim_name )
        {
	    return sim_references[sim_name] ;
        }

