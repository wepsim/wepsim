/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
	   if (typeof sim_obj.value == "function") {
	       return sim_obj.value() ;
           }

	   return sim_obj.value ;
        }

        function set_value ( sim_obj, value )
        {
	   if (typeof sim_obj.value == "function")
	   {
	       if (sim_obj.value() != value)
	           sim_obj.changed = true ;

	       sim_obj.value(value) ;
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

        function get_var ( sim_var )
        {
	   if (typeof sim_var == "function")
	   {
	       return sim_var() ;
	   }
	   else
	   {
	       return sim_var ;
	   }
        }

        function set_var ( sim_var, value )
        {
	   if (typeof sim_var == "function")
	   {
	       sim_var(value) ;
           }
	   else
	   {
	       sim_var = value ;
           }
        }

