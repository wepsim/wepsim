/*      
 *  Copyright 2015-2017 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
        WSCFG['version'] = { value:"1.8.2", type:"string"} ;

        function get_cfg ( field )
        {
               return WSCFG[field].value ;
        }

        function set_cfg ( field, value )
        {
               WSCFG[field].value = value ;
        }

        function reset_cfg ( )
        {
		/*
		 *  simulation screen: SVG
		 */
               WSCFG['color_data_active']   = { value:"#0066FF",          type:"string"} ;
               WSCFG['color_data_inactive'] = { value:"rgb(0, 0, 0)",     type:"string"} ; // "black"

               WSCFG['color_name_active']   = { value:"red",              type:"string"} ;
               WSCFG['color_name_inactive'] = { value:"rgb(0, 0, 0)",     type:"string"} ; // "black"

	       WSCFG['size_active']         = { value:1.22,               type:"float"} ;
	       WSCFG['size_inactive']       = { value:0.02,               type:"float"} ;

               WSCFG['is_byvalue']          = { value:false,              type:"boolean"};

		/*
		 *  simulation screen: Register File
		 */
               WSCFG['RF_display_format']   = { value:16,                 type:"int"} ;
               WSCFG['RF_display_name']     = { value:'numerical',        type:"string"} ;

               WSCFG['is_editable']         = { value:false,              type:"boolean"};

		/*
		 *  simulation screen: Execution
		 */
               WSCFG['DBG_delay']           = { value:10,                 type:"int"} ;
               WSCFG['DBG_level']           = { value:"instruction",      type:"string"} ;

               WSCFG['DBG_limitick']        = { value:-1,                 type:"int"} ;
               WSCFG['ICON_theme']          = { value:'classic',          type:"string"} ;

		/*
		 *  simulation screen: Notification, etc.
		 */
               WSCFG['NOTIF_delay']         = { value:500,                type:"int"} ;
               WSCFG['CPUCU_size']          = { value:55,                 type:"int"} ;

               WSCFG['is_interactive']      = { value:true,               type:"boolean"};
               WSCFG['ws_idiom']            = { value:'es',               type:"string"};
               WSCFG['show_tutorials']      = { value:true,               type:"boolean"};
               WSCFG['use_voice']           = { value:false,              type:"boolean"};

		/*
		 *  micro/assembly screen: editor
		 */
               WSCFG['editor_theme']        = { value:'default',          type:"string"};
               WSCFG['editor_mode']         = { value:'default',          type:"string"};

               set_secondary_cfg() ;
        }

        function set_secondary_cfg ( )
        {
            cfg_show_eltos_delay = 130;
            if (get_cfg('DBG_delay') < 5)
                cfg_show_eltos_delay = 390;

            cfg_show_rf_delay = 125;
            if (get_cfg('DBG_delay') < 5)
                cfg_show_rf_delay = 375;

            cfg_show_main_memory_delay = 150;
            if (get_cfg('DBG_delay') < 5)
                cfg_show_main_memory_delay = 450;

            cfg_show_control_memory_delay = 120;
            if (get_cfg('DBG_delay') < 5)
                cfg_show_control_memory_delay = 360;

            cfg_show_asmdbg_pc_delay = 50;
            if (get_cfg('DBG_delay') < 3)
                cfg_show_asmdbg_pc_delay = 200;

            cfg_show_dbg_ir_delay = 100;
            if (get_cfg('DBG_delay') < 5)
                cfg_show_dbg_ir_delay = 300;
        }


        /*
         *  Persistence
         */

        function save_cfg ( )
        {
	   try 
	   {
                for (var item in WSCFG) {
                     localStorage.setItem('wepsim_' + item, get_cfg(item));
                }
	   }
           catch(err) 
           {
                console.log("WepSIM can not save the configuration in a persistent way on this web browser, found error: \n" + err.message);
	   }

           set_secondary_cfg() ;
        }

        function restore_cfg ( )
        {
           reset_cfg() ;

           for (var item in WSCFG) 
           {
                if (item == 'version') {
                    continue;
                }

                try 
                {
                   set_cfg(item, localStorage.getItem('wepsim_' + item)) ;
                   if (WSCFG[item].type != "string")
                       set_cfg(item, JSON.parse(get_cfg(item)));
                   if (get_cfg(item) == null)
                       throw "null values discarted";
                }
                catch(err) 
                {
                   console.log("WepSIM can not restore the configuration on this web browser, found error: \n" + err.message);
                   reset_cfg() ;
                   return;
                }
           }

           set_secondary_cfg() ;
        }

