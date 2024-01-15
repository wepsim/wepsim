/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
     * Check state
     */

    function wepsim_state_get_clk ( )
    {
         var reg_maddr = get_value(simhw_sim_state('REG_MICROADDR')) ;
         var reg_clk   = get_value(simhw_sim_state('CLK')) ;
         var timestamp = new Date().getTime() ;

         return {
		   time:        timestamp,
                   title:       'clock ' + reg_clk + ' @ &#181;address ' + reg_maddr,
                   title_short: 'clock ' + reg_clk + ',<br>&#181;add '   + reg_maddr
	        } ;
    }

    ws_info.state_history = [] ;

    function wepsim_state_history_get ( )
    {
         return ws_info.state_history ;
    }

    function wepsim_state_history_reset ( )
    {
         ws_info.state_history = [] ;
    }

    function wepsim_state_history_add ( )
    {
         var ret       = wepsim_state_get_clk() ;
         var state_obj = simcore_simstate_current2state() ;

         ret.content = simcore_simstate_state2checklist(state_obj, '') ;
         ws_info.state_history.push(ret) ;
    }

