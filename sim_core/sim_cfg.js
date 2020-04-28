/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


        var WSCFG = {} ;


        /*
         *  Access: get_cfg/set_cfg/update_cfg
         */

        function get_cfg ( field )
        {
             return WSCFG[field].value ;
        }

        function set_cfg ( field, value )
        {
             WSCFG[field].value = value ;
        }

        // update_cfg = set_cfg + ga + save_cfg
        function update_cfg ( field, value )
        {
             WSCFG[field].value = value ;

             // add if recording
             simcore_record_append_new('Set configuration option ' + field + ' to ' + value,
                                       'update_cfg("' + field + '","' + value + '");\n') ;

             ga('send', 'event', 'config',
                'config.' + WSCFG.version.value,
                'config.' + WSCFG.version.value + '.' + field + '.' + value);

             save_cfg() ;
        }


        /*
         *  Persistence: save_cfg/restore_cfg
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
                console.log("WepSIM can not save the configuration in a persistent way on this web browser,\n" + 
                            "found following error: \n" + err.message) ;
	   }

           set_secondary_cfg() ;
        }

        function restore_cfg ( )
        {
           // set primary configuration with default values
           WSCFG = get_primary_cfg() ;
           set_secondary_cfg() ;

           if (localStorage === null) {
	       return ;
	   }

           // try to restore primary configuration values from local_storage
           var default_value = null ;
           var saved_value   = null ;

           for (var item in WSCFG)
           {
                if (item === 'version') {
                    continue;
                }

                default_value = get_cfg(item) ;

                set_cfg(item, localStorage.getItem('wepsim_' + item)) ;
                if (WSCFG[item].type != "string") 
		{
                    try { 
                      saved_value = JSON.parse(get_cfg(item)) ;
		      set_cfg(item, saved_value);
		    }
		    catch (e) {
                      saved_value = null ;
		    }
		}

                if (saved_value === null) {
                    set_cfg(item, default_value) ;
		}
           }

           // set secondary configuration values
           set_secondary_cfg() ;
        }


        /*
         *  Transitions: reset_cfg/upgrade_cfg
         */

        function reset_cfg ( )
        {
             WSCFG = get_primary_cfg() ;
             set_secondary_cfg() ;

             // save as updated configuration
             save_cfg() ;
        }

        function reset_cfg_values ( )
        {
             WSCFG = get_primary_cfg() ;
             set_secondary_cfg() ;
        }

        function upgrade_cfg ( )
        {
            // update new fields
            var wscfg = get_primary_cfg() ;
            for (var item in wscfg) 
            {
                 if (typeof WSCFG[item] === "undefined") {
                     WSCFG[item] = wscfg[item] ;
                 }
                 if ( (WSCFG[item].value === null) || (WSCFG[item].value === 'null') ) {
                       WSCFG[item].value = wscfg[item].value ;
                 }
            }

            // update secondary fields
            set_secondary_cfg() ;

            // save as updated configuration
            save_cfg() ;
        }


        /*
         *  Auxiliar functions
         */

        function is_mobile ( )
        {
             if (typeof navigator === "undefined") {
                 return false ;
	     }

             return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ;
        }

        function is_cordova ( )
        {
             // https://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser
             return document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        }

        function get_primary_cfg ( )
        {
               var wscfg = {} ;

               /* version */
               wscfg.version = { type:"string", value:"2.1.0" } ;
               wscfg.build   = { type:"string", value:"2.1.0.20200425A" } ;

	       /* simulation screen: SVG */
               wscfg.color_data_active    = { type:"string",    value:"#0066FF" } ; 
               wscfg.color_data_inactive  = { type:"string",    value:"rgb(0, 0, 0)" } ; // "black"

               wscfg.color_name_active    = { type:"string",    value:"red" } ;
               wscfg.color_name_inactive  = { type:"string",    value:"rgb(0, 0, 0)" } ; // "black"

	       wscfg.size_active          = { type:"float",     value:1.25 } ;
	       wscfg.size_inactive        = { type:"float",     value:0.02 } ;

               wscfg.is_byvalue           = { type:"boolean",   value:false } ;

	       /* simulation screen: Register File */
               wscfg.RF_display_format    = { type:"string",    value:'unsigned_16_fill' } ;
               wscfg.RF_display_name      = { type:"string",    value:'numerical' } ;

               wscfg.is_editable          = { type:"boolean",   value:true } ;

	       /* simulation screen: Execution */
               wscfg.DBG_delay            = { type:"int",       value:5 } ;
               wscfg.DBG_level            = { type:"string",    value:"microinstruction" } ;

               wscfg.DBG_limitins         = { type:"int",       value:10000 } ;
               wscfg.DBG_limitick         = { type:"int",       value:1000 } ;
               wscfg.ICON_theme           = { type:"string",    value:'classic' } ;

	       /* simulation screen: Notification, etc. */
               wscfg.NOTIF_delay          = { type:"int",       value:1000 } ;
               wscfg.CPUCU_size           = { type:"int",       value:7    } ;
               wscfg.C1C2_size            = { type:"int",       value:8    } ;

               wscfg.SHOWCODE_label       = { type:"boolean",   value:true } ;
               wscfg.SHOWCODE_addr        = { type:"boolean",   value:true } ;
               wscfg.SHOWCODE_hex         = { type:"boolean",   value:true } ;
               wscfg.SHOWCODE_ins         = { type:"boolean",   value:true } ;
               wscfg.SHOWCODE_pins        = { type:"boolean",   value:true } ;

               wscfg.ws_mode              = { type:"string",    value:'newbie' } ;
               wscfg.ws_action            = { type:"string",    value:'checkpoint' } ;
               wscfg.is_interactive       = { type:"boolean",   value:true } ;
               wscfg.is_quick_interactive = { type:"boolean",   value:false } ;
               wscfg.ws_idiom             = { type:"string",    value:'en' } ;
               wscfg.use_voice            = { type:"boolean",   value:false } ;
               wscfg.ws_skin_ui           = { type:"string",    value:'classic' } ;
               wscfg.ws_skin_user         = { type:"string",    value:'only_asm:of:only_frequent:of' } ;
               wscfg.ws_skin_dark_mode    = { type:"boolean",   value:false } ;

	       /* micro/assembly screen: editor */
               wscfg.editor_theme         = { type:"string",    value:'default' } ;
               wscfg.editor_mode          = { type:"string",    value:'default' } ;

	       /* misc. */
               wscfg.verbal_verbose       = { type:"string",    value:'math' } ;
               wscfg.base_url             = { type:"string",    value:'https://acaldero.github.io/wepsim/' } ;
               wscfg.example_url          = { type:"string",    value:'examples/apps.json' } ;

               // some mobile-tuning
               if (is_mobile())
               {
                   wscfg.NOTIF_delay.value = 2000 ;
                   wscfg.ICON_theme.value  = 'cat1' ;
                   wscfg.CPUCU_size.value  = 7 ;
                   wscfg.C1C2_size.value   = 12 ;
                   wscfg.ws_skin_ui.value  = 'compact' ;
               }

               return wscfg ;
        }

        function set_secondary_cfg ( )
        {
            var dbg_delay = get_cfg('DBG_delay') ;

            if (dbg_delay < 5)
            {
                cfg_show_rf_delay             = 350 ;
                cfg_show_eltos_delay          = 350 ;
                cfg_show_main_memory_delay    = 450 ;
                cfg_show_control_memory_delay = 360 ;
                cfg_show_dbg_ir_delay         = 300 ;
                cfg_show_rf_refresh_delay     = 120 ;
            }
            else
            {
                cfg_show_rf_delay             = 100 ;
                cfg_show_eltos_delay          = 100 ;
                cfg_show_main_memory_delay    = 150 ;
                cfg_show_control_memory_delay = 120 ;
                cfg_show_dbg_ir_delay         = 100 ;
                cfg_show_rf_refresh_delay     = 30 ;
            }

            cfg_show_asmdbg_pc_delay = 50 ;
            if (dbg_delay < 3)
                cfg_show_asmdbg_pc_delay = 150 ;
        }

