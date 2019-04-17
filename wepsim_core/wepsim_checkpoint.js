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
     * Checkpointing
     */

    function wepsim_checkpoint_getCurrent ( id_tagname )
    {
	    // get & check params
	    var obj_tagName = document.getElementById(id_tagname) ;
	    if (obj_tagName === null) {
		return false ;
	    }

	    // insert current in the checkpoint array
	    var ws_mode   = get_cfg('ws_mode') ;
	    var ret       = wepsim_state_get_clk() ;
	    var state_obj = simcore_simstate_current2state() ;
	      ret.content = simcore_simstate_state2checklist(state_obj) ;

	    var checkpointObj = [] ;
	    checkpointObj.push({
		                  mode:     ws_mode,
		                  firmware: inputfirm.getValue(), 
				  assembly: inputasm.getValue(), 
				  state:    ret,
				  tag:      obj_tagName.value,
				  notify:   true
	                       }) ;

	    // return object
	    return checkpointObj ;
    }

    function wepsim_checkpoint_getHistory ( id_tagname )
    {
	    // get & check params
	    var obj_tagName = document.getElementById(id_tagname) ;
	    if (obj_tagName === null) {
		return false ;
	    }

	    // insert history in the checkpoint array
	    var ws_mode   = get_cfg('ws_mode') ;
	    var firmwareValue = inputfirm.getValue() ;
	    var assemblyValue = inputasm.getValue() ;
	    var s_h = wepsim_state_history_get() ;

	    var checkpointObj = [] ;
	    for (var i=0; i<s_h.length; i++) 
	    {
		 checkpointObj.push({
		                        mode:     ws_mode,
					firmware: firmwareValue,
					assembly: assemblyValue,
					state:    s_h[i],
				        tag:      obj_tagName.value + ' (Step ' + (i+1) + ')',
					notify:   false
				    }) ;
	    }

	    // return object
	    return checkpointObj ;
    }

    function wepsim_checkpoint_save ( id_filename, id_tagname, checkpointObj )
    {
	    // get & check params
            var obj_fileName = document.getElementById(id_filename) ;
	    var obj_tagName  = document.getElementById(id_tagname) ;

	    if ( (obj_fileName === null) || (obj_tagName === null) )
	    {
		return false ;
	    }

	    // save checkpoint
	    var checkpointStr = JSON.stringify(checkpointObj, null, 2) ;
	    wepsim_save_to_file(checkpointStr, obj_fileName.value) ;

	    return true ;
    }

    function wepsim_checkpoint_load ( id_filename, id_tagname, id_file_to_load )
    {
	    // get & check params
            var obj_fileName   = document.getElementById(id_filename) ;
	    var obj_tagName    = document.getElementById(id_tagname) ;
	    var obj_fileToLoad = document.getElementById(id_file_to_load).files[0] ;

	    if ( (obj_fileName === null) || (obj_tagName === null) || (obj_fileToLoad === null) )
	    {
		return false ;
	    }

	    // lambda (auxiliar) function
	    var function_after_loaded = function (textLoaded)
	                                {
				           var current_checkpoint = JSON.parse(textLoaded) ;
                                           wepsim_checkpoint_loadFromObj(current_checkpoint, 
						                         obj_fileName, obj_tagName, obj_fileToLoad) ;
			                } ;

	    // load checkpoint
	    wepsim_load_from_file(obj_fileToLoad, function_after_loaded) ;
    }

    function wepsim_checkpoint_loadFromObj ( checkpointObj, obj_fileName, obj_tagName, obj_fileToLoad )
    {
	   var o = '' ;
	   var u = '' ;

	   // 1.- check params
	   if (checkpointObj === null) {
	       return 'null checkpoint' ;
	   }
	   if (checkpointObj.length === 0) {
	       return 'zero-length checkpoint' ;
	   }

	   if (typeof checkpointObj[0].mode     === 'undefined')
	       checkpointObj[0].mode = 'ep' ;
	   if (typeof checkpointObj[0].firmware === 'undefined')
	       checkpointObj[0].firmware = '' ;
	   if (typeof checkpointObj[0].assembly === 'undefined')
	       checkpointObj[0].assembly = '' ;

	   // 2.- restore state(s)

		// all saved states are loaded into state history
	        wepsim_state_history_reset() ;
	        for (var i=0; i<checkpointObj.length; i++) {
	             state_history.push(checkpointObj[i].state) ;
	        }
	        wepsim_state_history_list() ;

	        o += '<li>State: restored into the state history.</li>' ;

	   // 3.- restore firmware + assembly

		// set associated mode
	        simui_select_main(checkpointObj[0].mode) ;

		// firmware + assembly: load into editor
		inputfirm.setValue(checkpointObj[0].firmware) ;
		 inputasm.setValue(checkpointObj[0].assembly) ;

		o += '<li>Firmware and Assembly: Loaded' ;

		// firmware + assembly: compile
		u = '' ;
		if (checkpointObj[0].firmware.trim() !== "") {
		    wepsim_compile_firmware(checkpointObj[0].firmware) ;
		    u += 'Firmware' ;
		}
		if (checkpointObj[0].assembly.trim() !== "") {
		    wepsim_compile_assembly(checkpointObj[0].assembly) ;
		    u += ' + Assembly' ;
		}

		if (u !== '') {
		    o += ' + Compiled' ;
		}
		o += '.</li>' ;

	   // 4.- restore user interface elements

		// load tag
	        if ((typeof obj_fileName !== "undefined") && (obj_fileName !== null)) {
		     obj_fileName.value = obj_fileToLoad.name ;
		}
	        if ((typeof obj_fileName !== "undefined") && (obj_tagName !== null)) {
		     obj_tagName.value  = checkpointObj[0].tag ;
		}

		o += '<li>Tag: <strong>' + checkpointObj.tag + '</strong></li>' ;

		// Future Works:
		// + update internal state based on txt_checklist

	   // 5.- notify
	   if (o !== '') {
	       o = 'WepSIM has been instructed to restore a checkpoint:<br>' +
		   '<ul>' + 
		   o + 
		   '</ul>' +
		   'To close this notification please press in the ' +
		   '<span class="btn btn-sm btn-info py-0" data-dismiss="alert">X</span> mark. <br>' +
		   'In order to execute please press the ' +
		   '<span class="btn btn-sm btn-info py-0" onclick="wepsim_execute_toggle_play(\'#qbp\',false);">Run</span> button.<br>' ;
	   }

	   if (checkpointObj[0].notify === true) {
	       simcoreui_notify('Restored Checkpoint', o, 'info', 0) ;
	   }

	   // return
	   return o ;
    }

