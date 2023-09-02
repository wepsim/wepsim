/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
             if (WSCFG[field].value != value)
             {
                 simcore_ga('config',
                            'config.' + WSCFG.version.value,
                            'config.' + WSCFG.version.value + '.' + field + '.' + value) ;
             }

             WSCFG[field].value = value ;

             // add if recording
             simcore_record_append_new('Set configuration option ' + field + ' to ' + value,
                                       'update_cfg("' + field + '","' + value + '");\n') ;

             save_cfg() ;
        }

        function is_cfg_empty ( )
        {
             return (Object.keys(WSCFG).length === 0) ;
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
            var wscfg = get_primary_cfg() ;
            var item  = null ;

            // repair old broken fields
            for (item in wscfg)
            {
                 if (typeof WSCFG[item] === "undefined") {
                     WSCFG[item] = wscfg[item] ;
                 }
                 if ( (WSCFG[item].value === null) || (WSCFG[item].value === 'null') ) {
                       WSCFG[item].value = wscfg[item].value ;
                 }
            }

            // update new fields
            if (wscfg.build.value != WSCFG.build.value)
            {
                for (item in wscfg)
                {
                     if (wscfg[item].upgrade) {
                         WSCFG[item] = wscfg[item] ;
                     }
                }
            }

            // quick fix to force to upgrade to 2.3.x options for ws_skin_users...
            if (WSCFG["ws_skin_user"].value.startsWith("only_asm:")) {
                WSCFG["ws_skin_user"] = { upgrade:false,  type:"string", value:'extra_mcode:extra_morecfg:extra_share' } ;
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
          // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ;

             if (typeof navigator === "undefined") {
                 return false ;
	     }

             if (typeof navigator.userAgentData == "undefined") {
                 return false ;
	     }

             return navigator.userAgentData.mobile ;
        }

        function is_cordova ( )
        {
             // https://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser
             return document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        }

        function get_primary_cfg ( )
        {
             var wscfg = {
                   /* version */
                   "version":               { upgrade:false, type:"string",    value:"2.3.0" },
                   "build":                 { upgrade:true,  type:"string",    value:"2.3.0.20230901A" },

	           /* simulation screen: SVG */
                   "color_data_active":     { upgrade:false, type:"string",    value:"#0066FF" },
                   "color_data_inactive":   { upgrade:false, type:"string",    value:"#000000" },
                   "color_name_active":     { upgrade:false, type:"string",    value:"#FF0000" },
                   "color_name_inactive":   { upgrade:false, type:"string",    value:"#000000" }, // "black"
	           "size_active":           { upgrade:false, type:"float",     value:3.00 },
	           "size_inactive":         { upgrade:false, type:"float",     value:1.00 },
                   "is_byvalue":            { upgrade:false, type:"boolean",   value:false },
                   "CPUCU_show_graph":      { upgrade:false, type:"boolean",   value:true },

	           /* simulation screen: Register File */
                   "RF_display_format":     { upgrade:false, type:"string",    value:'unsigned_16_fill' },
                   "RF_display_name":       { upgrade:false, type:"string",    value:'numerical' },
                   "MEM_display_format":    { upgrade:false, type:"string",    value:'unsigned_16_nofill' },
                   "MEM_show_segments":     { upgrade:false, type:"boolean",   value:false },
                   "MEM_show_source":       { upgrade:false, type:"boolean",   value:false },
                   "MEM_display_direction": { upgrade:false, type:"string",    value:'h2l' },
                   "is_editable":           { upgrade:false, type:"boolean",   value:true },

	           /* simulation screen: Execution */
                   "DBG_delay":             { upgrade:false, type:"int",       value:5 },
                   "DBG_level":             { upgrade:false, type:"string",    value:"microinstruction" },
                   "DBG_limitins":          { upgrade:false, type:"int",       value:10000 },
                   "DBG_limitick":          { upgrade:false, type:"int",       value:1000 },
                   "DBG_skip_notifycolon":  { upgrade:false, type:"boolean",   value:false },
                   "ICON_theme":            { upgrade:false, type:"string",    value:'classic' },
                   "AS_enable":             { upgrade:false, type:"boolean",   value:true },
                   "AS_delay":              { upgrade:false, type:"int",       value:500 },

	           /* simulation screen: Notification, etc. */
                   "NOTIF_delay":           { upgrade:false, type:"int",       value:1000 },
                   "CPUCU_size":            { upgrade:false, type:"int",       value:7    },
                   "C1C2_size":             { upgrade:false, type:"int",       value:8    },
                   "SHOWCODE_label":        { upgrade:false, type:"boolean",   value:true },
                   "SHOWCODE_addr":         { upgrade:false, type:"boolean",   value:true },
                   "SHOWCODE_hex":          { upgrade:false, type:"boolean",   value:true },
                   "SHOWCODE_ins":          { upgrade:false, type:"boolean",   value:true },
                   "SHOWCODE_pins":         { upgrade:false, type:"boolean",   value:true },
                   "ws_mode":               { upgrade:false, type:"string",    value:'newbie' },
                   "ws_action":             { upgrade:false, type:"string",    value:'checkpoint' },
                   "is_interactive":        { upgrade:false, type:"boolean",   value:true },
                   "is_quick_interactive":  { upgrade:false, type:"boolean",   value:false },
                   "ws_idiom":              { upgrade:false, type:"string",    value:'en' },
                   "use_voice":             { upgrade:false, type:"boolean",   value:false },
                   "ws_skin_ui":            { upgrade:false, type:"string",    value:'classic' },
                   "ws_skin_user":          { upgrade:true,  type:"string",    value:'extra_mcode:extra_morecfg:extra_share' },
                   "ws_skin_dark_mode":     { upgrade:false, type:"boolean",   value:false },

	           /* micro/assembly screen: editor */
                   "editor_theme":          { upgrade:false, type:"string",    value:'default' },
                   "editor_mode":           { upgrade:false, type:"string",    value:'default' },

	           /* set of urls */
                   "base_url":              { upgrade:true,  type:"string",    value:'https://acaldero.github.io/wepsim/ws_dist/' },
                   "cfg_url":               { upgrade:true,  type:"string",    value:'repo/configuration/default.json' },
                   "example_url":           { upgrade:true,  type:"string",    value:'repo/examples_set/default.json' },
                   "hw_url":                { upgrade:true,  type:"string",    value:'repo/hardware/hw.json' },

	           /* misc. */
                   "max_json_size":         { upgrade:true,  type:"int",       value:1*1024*1024 },
                   "verbal_verbose":        { upgrade:false, type:"string",    value:'math' },
                   "extended_ui":           { upgrade:false, type:"boolean",   value:false },
                   "use_ga":                { upgrade:false, type:"boolean",   value:true }
             } ;

             // some mobile-tuning
             if (is_mobile())
             {
                 wscfg.NOTIF_delay.value = 2000 ;
                 wscfg.ICON_theme.value  = 'cat1' ;
                 wscfg.CPUCU_size.value  = 7 ;
                 wscfg.C1C2_size.value   = 14 ;
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


    /*
     *  Configurations: available set
     */

    var ws_cfg_hash = {} ;
    var ws_cfg_set  = [] ;

    function cfgset_init ( )
    {
         var url_list = get_cfg('cfg_url') ;

         // try to load the index
         ws_cfg_set = wepsim_url_getJSON(url_list) ;

         // build reference hash
         for (var i=0; i<ws_cfg_set.length; i++) {
              ws_cfg_hash[ws_cfg_set[i].name] = ws_cfg_set[i].url ;
         }

         return ws_cfg_hash ;
    }

    function cfgset_getSet ( )
    {
         return ws_cfg_hash ;
    }

    function cfgset_load ( cfg_name )
    {
         var ret  = null ;
         var jobj = null ;

         if (typeof ws_cfg_hash[cfg_name] === "undefined") {
             return ret ;
         }

         // try to import the requested one
	 try {
	     jobj = $.getJSON({'url': ws_cfg_hash[cfg_name], 'async': false}) ;
	     jobj = JSON.parse(jobj.responseText) ;
	     ret  = cfgset_import(jobj) ;
	 }
	 catch (e) {
             ws_alert("WepSIM can not import the configuration from URL: \n'" +
                       ws_cfg_hash[cfg_name]  + "'.\n" +
                      "Found following error: \n" +
                       err.message) ;
	 }

	 return ret ;
    }

    function cfgset_import ( wscfg )
    {
         // import primary fields
	 for (var item in wscfg)
	 {
             if (typeof WSCFG[item] === "undefined") {
                 continue ;
             }
             if (WSCFG[item].type !== wscfg[item].type) {
                 continue ;
             }

             WSCFG[item] = wscfg[item] ;
	 }

         // update secondary fields
         set_secondary_cfg() ;

         return true ;
    }

