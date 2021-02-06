/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    ws_info.preload_tasks = [

	 // parameter: mode
	 {
	    'name':   'mode',
	    'action': function( hash )
		      {
                         var ws_mode = get_cfg('ws_mode');
                         if (hash.mode !== ws_mode)
			     wsweb_select_main(hash.mode) ;

			 return '<li>Mode set to <strong>' + hash.mode + '</strong>.</li> ' ;
		      }
	 },

	 // parameter: config_set
	 {
	    'name':   'config_set',
	    'action': function( hash )
		      {
                          cfgset_load(hash.config_set) ;
	                  wepsim_uicfg_restore() ;
			  return '<li>Configuration set titled <strong>' + hash.config_set + '</strong> loaded.</li>';
		      }
	 },

	 // parameter: examples_set
	 {
	    'name':   'examples_set',
	    'action': function( hash )
		      {
			 var url_examples_set = get_cfg('example_url') ;
			 var ret = wepsim_example_loadSet(url_examples_set) ;
			 wepsim_example_reset() ;
			 wepsim_example_load(hash.examples_set) ;

			 var result_txt = ' has been loaded' ;
			 if (null == ret) {
			     result_txt = ' could not be loaded' ;
			 }

			 return '<li>Examples set titled <strong>' + hash.examples_set + '</strong>' + result_txt + '.</li>';
		      }
	 },

	 // parameter: example
	 {
	    'name':   'example',
	    'action': function( hash )
		      {
			  var example_obj = null ;

                          // try as array index...
			  var example_index = parseInt(hash.example) ;
                          if (isNaN(example_index) == false) {
			      example_obj = ws_info.examples[example_index] ;
                          }
                          // try as example id...
                          else {
                              for (var i=0; i<ws_info.examples.length; i++) {
                                   if (ws_info.examples[i].id == hash.example)
			               example_obj = ws_info.examples[i] ;
                              }
                          }

			  if (typeof example_obj === "undefined") {
			      return '' ;
			  }

			  var example_uri = example_obj.hardware + ":" + example_obj.microcode + ":" + example_obj.assembly ;
			  load_from_example_firmware(example_uri, true) ;
			  return '<li>Example titled <strong>' + example_obj.title + '</strong> has been loaded.</li> ' ;
		      }
	 },

	 // parameter: simulator UI
	 {
	    'name':   'simulator',
	    'action': function( hash )
		      {
			  var panels = hash.simulator.split(":") ;

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

			  return '<li>User interface has been adapted.</li> ' ;
		      }
	 },

	 // parameter: checkpoint
	 {
	    'name':   'checkpoint',
	    'action': function( hash )
		      {
			  uri_obj = new URL(hash.checkpoint) ;
			  wepsim_checkpoint_loadURI(uri_obj) ;
		      }
	 },

	 // dummy parameter: notify
	 // in wepsim_preload_fromHash
	 {
	    'name':   'notify',
	    'action': function( hash )
		      {
			 return '' ;
		      }
	 },

	 // dummy parameter: preload
	 // in wepsim_preload_get2hash
	 {
	    'name':   'preload',
	    'action': function( hash )
		      {
			 return '' ;
		      }
	 }

     ] ;

