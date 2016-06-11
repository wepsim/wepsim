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


        /*
         *  SVG configuration
         */

        var color_data_active   = "#0066FF" ;
        var color_data_inactive = "rgb(0, 0, 0)" ; // "black"

        var color_name_active   = "red" ;
        var color_name_inactive = "rgb(0, 0, 0)" ; // "black"

	var size_active         = 1.22;
	var size_inactive       = 0.02;


        /*
         *  UI configuration
         */

        var DBG_delay         = 10 ;
        var DBG_level         = "instruction" ;

        var RF_display_format = 16 ;
        var RF_display_name   = 'numerical' ;

        var NOTIF_delay = 1000 ;


        /*
         *  SIM working
         */

        var is_interactive = true;

        var ws_idiom       = 'es';


        /*
         *  Persistence
         */

        function reset_cfg ( )
        {
               color_data_active   = "#0066FF" ;
               color_data_inactive = "rgb(0, 0, 0)" ; // "black"
               color_name_active   = "red" ;
               color_name_inactive = "rgb(0, 0, 0)" ; // "black"
	       size_active         = 1.22;
	       size_inactive       = 0.02;

               DBG_delay           = 10 ;
               DBG_level           = "instruction" ;
               RF_display_format   = 16 ;
               RF_display_name     = 'numerical' ;

               is_interactive      = true;

               ws_idiom            = 'es';
        }

        function save_cfg ( )
        {
           if (typeof localStorage != "undefined")
           {
               localStorage.setItem('wepsim_version', '1.3.0');

               localStorage.setItem('wepsim_color_data_active',		color_data_active);
               localStorage.setItem('wepsim_color_data_inactive',	color_data_inactive);
               localStorage.setItem('wepsim_color_name_active',		color_name_active);
               localStorage.setItem('wepsim_color_name_inactive',	color_name_inactive);
               localStorage.setItem('wepsim_size_active',		size_active);
               localStorage.setItem('wepsim_size_inactive',		size_inactive);

               localStorage.setItem('wepsim_DBG_delay',			DBG_delay);
               localStorage.setItem('wepsim_DBG_level',			DBG_level);
               localStorage.setItem('wepsim_RF_display_format',		RF_display_format);
               localStorage.setItem('wepsim_RF_display_name',		RF_display_name);

               localStorage.setItem('wepsim_is_interactive',		is_interactive);

               localStorage.setItem('wepsim_ws_idiom',		        ws_idiom);
           }
        }

        function restore_cfg ( )
        {
           if (typeof localStorage != "undefined")
           {
                if (localStorage.getItem('wepsim_color_data_active') != null)
                    color_data_active   = localStorage.getItem('wepsim_color_data_active');
                if (localStorage.getItem('wepsim_color_data_inactive') != null)
                    color_data_inactive = localStorage.getItem('wepsim_color_data_inactive');
                if (localStorage.getItem('wepsim_color_name_active') != null)
                    color_name_active   = localStorage.getItem('wepsim_color_name_active');
                if (localStorage.getItem('wepsim_color_name_inactive') != null)
                    color_name_inactive = localStorage.getItem('wepsim_color_name_inactive');
                if (localStorage.getItem('wepsim_size_active') != null)
                    size_active         = localStorage.getItem('wepsim_size_active');
                if (localStorage.getItem('wepsim_size_inactive') != null)
                    size_inactive       = localStorage.getItem('wepsim_size_inactive');

                if (localStorage.getItem('wepsim_DBG_delay') != null)
                    DBG_delay           = JSON.parse(localStorage.getItem('wepsim_DBG_delay'));
                if (localStorage.getItem('wepsim_DBG_level') != null)
                    DBG_level           = localStorage.getItem('wepsim_DBG_level');
                if (localStorage.getItem('wepsim_RF_display_format') != null)
                    RF_display_format   = JSON.parse(localStorage.getItem('wepsim_RF_display_format'));
                if (localStorage.getItem('wepsim_RF_display_name') != null)
                    RF_display_name     = localStorage.getItem('wepsim_RF_display_name');

                if (localStorage.getItem('wepsim_is_interactive') != null)
                    is_interactive      = JSON.parse(localStorage.getItem('wepsim_is_interactive'));

                if (localStorage.getItem('wepsim_ws_idiom') != null)
                    ws_idiom            = localStorage.getItem('wepsim_ws_idiom');
           }
        }

