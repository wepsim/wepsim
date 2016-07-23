/*      
 *  Copyright 2015-2016 Alejandro Calderon Mateos, Javier Prieto Cepeda, Felix Garcia Carballeira
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
        WSCFG['version'] = { value:"1.5.5", type:"string"} ;

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
		 *  SVG configuration
		 */
               WSCFG['color_data_active']   = { value:"#0066FF",          type:"string"} ;
               WSCFG['color_data_inactive'] = { value:"rgb(0, 0, 0)",     type:"string"} ; // "black"

               WSCFG['color_name_active']   = { value:"red",              type:"string"} ;
               WSCFG['color_name_inactive'] = { value:"rgb(0, 0, 0)",     type:"string"} ; // "black"

	       WSCFG['size_active']         = { value:1.22,               type:"float"} ;
	       WSCFG['size_inactive']       = { value:0.02,               type:"float"} ;

		/*
		 *  UI configuration
		 */
               WSCFG['DBG_delay']           = { value:10,                 type:"int"} ;
               WSCFG['DBG_level']           = { value:"instruction",      type:"string"} ;

               WSCFG['RF_display_format']   = { value:16,                 type:"int"} ;
               WSCFG['RF_display_name']     = { value:'numerical',        type:"string"} ;

               WSCFG['NOTIF_delay']         = { value:500,                type:"int"} ;

		/*
		 *  SIM working
		 */

               WSCFG['is_interactive']      = { value:true,         type:"boolean"};
               WSCFG['is_byvalue']          = { value:false,        type:"boolean"};
               WSCFG['is_editable']         = { value:false,        type:"boolean"};

               WSCFG['ws_idiom']            = { value:'es',         type:"string"};
        }


        /*
         *  Persistence
         */

        function save_cfg ( )
        {
	   try 
	   {
                for (var item in WSCFG) 
                     localStorage.setItem('wepsim_' + item, get_cfg(item));
	   }
           catch(err) {
                console.log("WepSIM can not save the configuration in a persistent way on this web browser, found error: \n" + err.message);
	   }
        }

        function restore_cfg ( )
        {
           reset_cfg() ;

           for (var item in WSCFG) 
           {
                if (item == 'version')
                    continue;

                try 
                {
                   set_cfg(item, localStorage.getItem('wepsim_' + item)) ;
                   if (WSCFG[item].type != "string")
                       set_cfg(item, JSON.parse(get_cfg(item)));
                   if (get_cfg(item) == null)
                       throw "null values discarted";
                }
                catch(err) {
                   console.log("WepSIM can not restore the configuration on this web browser, found error: \n" + err.message);
                   reset_cfg() ;
                   return;
                }
           }
        }

