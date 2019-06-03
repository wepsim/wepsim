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
         *  Show mPC, PC and IR
         */

        var callback_show_dbg_ir    = function () { 
		                         return true; 
	                              } ;

        var callback_show_dbg_mpc   = function () { 
		                         return true; 
	                              } ;

        var callback_show_asmdbg_pc = function () { 
		                         return true; 
	                              } ;


        function init_debug ( cb_show_dbg_ir, cb_show_dbg_mpc, cb_show_asmdbg_pc )
        {
            if (cb_show_dbg_ir !== null) {   
                callback_show_dbg_ir    = cb_show_dbg_ir ;
            }

            if (cb_show_dbg_mpc !== null) {   
                callback_show_dbg_mpc   = cb_show_dbg_mpc ;
            }

            if (cb_show_asmdbg_pc !== null) {   
                callback_show_asmdbg_pc = cb_show_asmdbg_pc ;
            }

	    return true ;
        }

        function show_dbg_ir ( )
        {
            return callback_show_dbg_ir() ;
        }

        function show_dbg_mpc ( )
        {
            return callback_show_dbg_mpc() ;
        }

        function show_asmdbg_pc ( )
        {
            return callback_show_asmdbg_pc() ;
        }

