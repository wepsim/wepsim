/*      
 *  Copyright 2015 Alejandro Calderon Mateos, Felix Garcia Carballeira, Javier Prieto Cepeda
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
         *  States
         */

        sim_states["INT"]    = { name: "INT",     visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
        sim_states["IORDY"]  = { name: "IORDY",   visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };


        /*
         *  Signals
         */


        /*
         *  Syntax of behaviors
         */

