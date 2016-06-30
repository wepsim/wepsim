/*      
 *  Copyright 2015-2016 Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos
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


        var WSCFG = new Object() ;
        WSCFG['version'] = "1.3.5" ;

        function reset_cfg ( )
        {
		/*
		 *  SVG configuration
		 */

               WSCFG['color_data_active']   = "#0066FF" ;
               WSCFG['color_data_inactive'] = "rgb(0, 0, 0)" ; // "black"

               WSCFG['color_name_active']   = "red" ;
               WSCFG['color_name_inactive'] = "rgb(0, 0, 0)" ; // "black"

	       WSCFG['size_active']         = 1.22;
	       WSCFG['size_inactive']       = 0.02;

		/*
		 *  UI configuration
		 */
               WSCFG['DBG_delay']           = 10 ;
               WSCFG['DBG_level']           = "instruction" ;

               WSCFG['RF_display_format']   = 16 ;
               WSCFG['RF_display_name']     = 'numerical' ;

               WSCFG['NOTIF_delay']         = 500 ;

		/*
		 *  SIM working
		 */

               WSCFG['is_interactive']      = true;
               WSCFG['is_byvalue']          = false;
               WSCFG['is_editable']         = false;

               WSCFG['ws_idiom']            = 'es';
        }


        /*
         *  Persistence
         */

        function save_cfg ( )
        {
           if (typeof localStorage == "undefined")
               return ;

           for (var item in WSCFG) 
                localStorage.setItem('wepsim_' + item, WSCFG[item]);
        }

        function restore_cfg ( )
        {
           reset_cfg() ;

           if (typeof localStorage == "undefined")
               return ;

           for (var item in WSCFG) 
           {
                if (item == 'version')
                    continue;

                if (localStorage.getItem('wepsim_' + item) != null)
                    WSCFG[item] = localStorage.getItem('wepsim_' + item);
           }

           var cfg_tobetransformed = [ "DBG_delay", "RF_display_format", "is_interactive", "is_byvalue", "is_editable" ] ;

           for (var index in cfg_tobetransformed) 
           {
                item = cfg_tobetransformed[index] ;
                if (typeof WSCFG[item] == "string") {
                    WSCFG[item] = JSON.parse(WSCFG[item]);
                }
           }
        }

