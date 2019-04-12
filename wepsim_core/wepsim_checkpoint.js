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

    function wepsim_checkpoint_save ( id_filename, id_tagname )
    {
	    // get & check params
            var obj_fileName = document.getElementById(id_filename) ;
	    var obj_tagName  = document.getElementById(id_tagname) ;

	    if ( (obj_fileName === null) || (obj_tagName === null) )
	    {
		return false ;
	    }

	    // build checkpoint as json
	    var ret       = wepsim_state_get_clk() ;
	    var state_obj = simcore_simstate_current2state() ;
	      ret.content = simcore_simstate_state2checklist(state_obj) ;

	    var checkpointObj = { 
		                  firmware: inputfirm.getValue(), 
				  assembly: inputasm.getValue(), 
				  state:    ret,
				  tag:      obj_tagName.value
	                        } ;
	    var checkpointStr = JSON.stringify(checkpointObj, null, 2) ;

	    // save checkpoint
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
				           var checkpointObj = JSON.parse(textLoaded) ;

				           // load into forms
				           inputfirm.setValue(checkpointObj.firmware) ;
				            inputasm.setValue(checkpointObj.assembly) ;

				           // restore saved checkpoint
				           obj_fileName.value = obj_fileToLoad.name ;
				           obj_tagName.value  = checkpointObj.tag ;

					   wepsim_state_history_reset() ;
					   state_history.push(checkpointObj.state) ;
					   wepsim_state_history_list() ;

					   // Future Works:
				           // + update internal state based on txt_checklist

				           // compile
					   if (checkpointObj.firmware.trim() !== "")
				               wepsim_compile_firmware(checkpointObj.firmware) ;
					   if (checkpointObj.assembly.trim() !== "")
				               wepsim_compile_assembly(checkpointObj.assembly) ;

				           // notify
				           simcoreui_notify('Restored Checkpoint', 
						            'Tag: ' + checkpointObj.tag, 
						            'info', 
						            0) ;
			                } ;

	    // load checkpoint
	    wepsim_load_from_file(obj_fileToLoad, function_after_loaded) ;
    }

