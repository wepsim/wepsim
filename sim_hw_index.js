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
         *  Simulated Hardware
         */

        var sim = {
		    systems: [],
		    active:  null,
		    index:   0
	          } ;

        function simhw_add ( newElto )
        {
            sim.systems.push(newElto) ;
            sim.active = newElto ;
            sim.index  = sim.systems.length - 1 ;
        }

        function simhw_getActive ( )
        {
            return sim.index ;
        }

        function simhw_setActive ( newActive )
        {
	    if (systems.length <= newActive) 
	    {
                sim.active = sim.systems[newActive] ;
                sim.index  = newActive ;
	    }
        }

        function sim_hw ( )
        {
            return sim.active ;
        }

