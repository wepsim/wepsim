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


    //
    // Preload work
    //

    function wepsim_preload_fromHash ( hash )
    {
	    var o = '' ;

	    // parameter: mode
	    if (hash.mode !== '')
	    {
                wsweb_select_main(hash.mode) ;
	        o += '<li>Mode set to <strong>' + hash.mode + '</strong>.</li> ' ;
	    }

	    // parameter: example set
	    if (hash.examples_set !== '')
	    {
                var url_examples_set = get_cfg('example_url') ;
                var ret = wepsim_example_loadSet(url_examples_set) ;
                wepsim_example_reset() ;
                wepsim_example_load(hash.examples_set) ;

	        var result_txt = ' has been loaded' ;
                if (null == ret) {
	            result_txt = ' could not be loaded' ;
		}

	        o += '<li>Examples set titled <strong>' + hash.examples_set + '</strong>' + result_txt + '.</li>';
	    }

	    // parameter: example
	    if (hash.example !== '')
	    {
		var example_index = parseInt(hash.example) ;
		var example_obj   = ws_examples[example_index] ;
	        if (typeof example_obj !== "undefined")
		{
		    var example_uri = example_obj.hardware + ":" + example_obj.microcode + ":" + example_obj.assembly ;
	            load_from_example_firmware(example_uri, true) ;
	            o += '<li>Example titled <strong>' + example_obj.title + '</strong> has been loaded.</li> ' ;
		}
	    }

	    // parameter: simulator UI
	    var panels = [] ;
	    if (hash.simulator !== '') {
	        panels = hash.simulator.split(":") ;
	        o += '<li>User interface has been adapted.</li> ' ;
            }

	    if (typeof panels[0] !== "undefined")
	    {
		if (panels[0] === "microcode") {
		    wsweb_change_show_processor() ;
                }
		if (panels[0] === "assembly") {
                    wsweb_change_show_asmdbg() ;
                }
	    }
	    if (typeof panels[1] !== "undefined")
	    {
                wsweb_set_details(panels[1].toUpperCase()) ;
	    }
	    if (typeof panels[2] !== "undefined")
	    {
                wsweb_do_action(panels[2].toLowerCase()) ;
	    }

	    // parameter: checkpoint
	    if (hash.checkpoint !== '')
	    {
		uri_obj = new URL(hash.checkpoint) ;
                wepsim_checkpoint_loadURI(uri_obj) ;
	    }

	    // notification: to notify of the preloaded work to the user
	    if (o !== '')
	    {
		o = 'WepSIM has been instructed to preload some work for you:<br>' +
		    '<ul>' + o + '</ul>' +
		    'To close this notification please press in the ' +
                    '<span class="btn btn-sm btn-info py-0" data-dismiss="alert">X</span> mark. <br>' +
	            'In order to execute an example please press the ' +
		    '<span class="btn btn-sm btn-info py-0" onclick="wepsim_execute_toggle_play(\'#btn_run_stop\');">Run</span> button.<br>' ;

	        if (hash.notify !== 'false') {
	            wepsim_notify_do_notify('WepSIM preloads some work', o, 'info', 0) ;
		}
	    }

	    // return ok
	    return 0 ;
    }

    function wepsim_preload_get2hash ( window_location )
    {
	    var hash = {} ;
	    var uri_obj = null ;
            var hash_fields = [ 'preload', 'mode', 'examples_set', 'example', 
                                'simulator', 'notify', 'checkpoint' ] ;

	    // 1.- check params
	    if (typeof window_location === "undefined") {
		return hash ;
	    }

	    // 2.- get parameters
            var parameters = new URL(window_location).searchParams ;
            for (i=0; i<hash_fields.length; i++) 
            {
                 hash[hash_fields[i]] = parameters.get(hash_fields[i]) ;

	         // overwrite null with default values
                 if (hash[hash_fields[i]] === null) {
                     hash[hash_fields[i]] = '' ;
                 }
            }
	
	    // 3.- get parameters from json
	    if (hash.preload !== '')
	    {
		try {
	           uri_obj = new URL(hash.preload) ;
	           wepsim_url_json(uri_obj.pathname, wepsim_preload_fromHash) ;
		}
		catch (e) { 
		   ws_alert('unable to preload json from "' + uri_obj.pathname + '"') ;
                }
	    }

	    return hash ;
    }

