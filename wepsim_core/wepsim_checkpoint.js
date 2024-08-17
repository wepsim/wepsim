/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
     * Checkpointing: get/set
     */

    function wepsim_checkpoint_get ( tagName )
    {
	    // get mode and history
	    var ws_mode     = get_cfg('ws_mode') ;
            var history_obj = wepsim_state_history_get() ;

	    // get current state
	    var state_current     = wepsim_state_get_clk() ;
	    var state_obj         = simcore_simstate_current2state() ;
	    state_current.content = simcore_simstate_state2checklist(state_obj, '') ;

	    // pack elements
	    var elements = {
		              "mode":          ws_mode,
		              "firmware":      inputfirm.getValue(),
			      "assembly":      inputasm.getValue(),
			      "state_current": state_current,
			      "state_history": history_obj,
			      "record":        simcore_record_get(),
			      "tag":           tagName,
			      "notify":        true
	                   } ;

	    // return object
	    return elements ;
    }

    function wepsim_checkpoint_loadFromObj ( checkpointObj, obj_fileToLoad )
    {
	   var o = '' ;
	   var u = '' ;

	   // 1.- check params
	   if (checkpointObj === null) {
	       return 'null checkpoint' ;
	   }

	   if (typeof checkpointObj.mode     === 'undefined')
	       checkpointObj.mode = 'ep' ;
	   if (typeof checkpointObj.firmware === 'undefined')
	       checkpointObj.firmware = '' ;
	   if (typeof checkpointObj.assembly === 'undefined')
	       checkpointObj.assembly = '' ;
	   if (typeof checkpointObj.state_history === 'undefined')
	       checkpointObj.state_history = [] ;
	   if (typeof checkpointObj.record === 'undefined')
	       checkpointObj.record = [] ;

	   // 2.- restore state(s)

		// all saved states are loaded into state history
	        wepsim_state_history_reset() ;
	        for (var i=0; i<checkpointObj.state_history.length; i++) {
	             ws_info.state_history.push(checkpointObj.state_history[i]) ;
	        }
	        wepsim_state_history_list() ;

	        o += '<li>State: restored into the state history.</li>' ;

	   // 3.- restore firmware + assembly

		// set associated mode
	        wsweb_select_main(checkpointObj.mode) ;

		// firmware + assembly: load into editor
		inputfirm.setValue(checkpointObj.firmware) ;
		 inputasm.setValue(checkpointObj.assembly) ;

		o += '<li>Firmware and Assembly: Loaded' ;

		// firmware + assembly: compile
		u = '' ;
		if (checkpointObj.firmware.trim() !== "") {
		    wepsim_compile_firmware(checkpointObj.firmware) ;
		    u += 'Firmware' ;
		}
		if (checkpointObj.assembly.trim() !== "") {
		    wepsim_compile_assembly(checkpointObj.assembly) ;
		    u += ' + Assembly' ;
		}

		if (u !== '') {
		    o += ' + Compiled' ;
		}
		o += '.</li>' ;

	   // 4.- restore record

		// set the saved record
                simcore_record_set(checkpointObj.record) ;

	   // 5.- notify
	   if (o !== '') {
	       o = 'WepSIM has been instructed to restore a checkpoint:<br>' +
		   '<ul>' +
		   o +
		   '</ul>' +
		   'To close this notification please press in the ' +
		   '<span class="btn btn-sm btn-info py-0" data-bs-dismiss="alert">X</span> mark. <br>' ;
	   }

	   if (checkpointObj.notify === true) {
	       wepsim_notify_do_notify('Restored Checkpoint', o, 'info', get_cfg('NOTIF_delay')) ;
	   }

	   // return
	   return o ;
    }


    /*
     * Checkpointing: save + load
     */

    function wepsim_checkpoint_NB_concat_ws_cells ( cells )
    {
         cells.push({
	   	      "cell_type": "markdown",
		      "source": "## wepsim_runner",
		      "metadata": {}
		    }) ;

         cells.push({
		      "cell_type": "code",
		      "source": [
			"from google.colab import _message\n",
			"nb = _message.blocking_request('get_ipynb')\n",
			"\n",
			"type = ''\n",
			"ws = {'firmware': '', 'assembly': ''}\n",
			"for cell in nb['ipynb']['cells']:\n",
			"  if '## firmware' in cell['source']:\n",
			"     type = 'firmware'\n",
			"     continue\n",
			"  if '## assembly' in cell['source']:\n",
			"     type = 'assembly'\n",
			"     continue\n",
			"  if type == 'firmware':\n",
			"     ws['firmware'] = ' '.join(cell['source']) ;\n",
			"     type = ''\n",
			"     continue\n",
			"  if type == 'assembly':\n",
			"     ws['assembly'] = ' '.join(cell['source']) ;\n",
			"     type = ''\n",
			"     continue\n",
			"\n",
			"if ws['assembly'] != '' and ws['firmware'] != '':\n",
			"   with open('/base.mc', 'w') as f:\n",
			"       f.write(ws['firmware'])\n",
			"   with open('/base.asm', 'w') as f:\n",
			"       f.write(ws['assembly'])\n",
			"\n",
			"if ws['assembly'] != '' and ws['firmware'] != '':\n",
			"   !npm install  terser jq jshint yargs clear inquirer >& /dev/null\n",
			"   !wget https://github.com/acaldero/wepsim/releases/download/v2.3.2/wepsim-2.3.2.zip >& /dev/null\n",
			"   !unzip -o wepsim-2.3.2.zip  >& /dev/null\n",
			"   !rm -fr   wepsim-2.3.2.zip\n",
			"   !./wepsim-2.3.2/wepsim.sh -a stepbystep -m ep -f /base.mc -s /base.asm > ./result.csv\n",
			"\n",
			"df = None\n",
			"if ws['assembly'] != '' and ws['firmware'] != '':\n",
			"   import pandas as pd\n",
			"   import io\n",
			"   df1 = pd.read_csv('./result.csv')\n",
			"   df1.columns = df1.columns.str.strip()\n",
			"   for item in df1.columns[:]:\n",
			"       df1[item].replace(\"\\t\",\"\",     inplace=True, regex=True)\n",
			"       df1[item].replace(\"&nbsp;\",\"\", inplace=True, regex=True)\n",
			"\n",
			"%load_ext google.colab.data_table\n",
			"df1\n"
		      ],
		      "metadata": {
			"name": "wepsim",
			"type": "code",
		        "collapsed": true,
		        "deletable": false,
		        "editable":  true
		      }
		    }) ;

         return cells ;
    }

    function wepsim_checkpoint_Obj2NB ( elements )
    {
         var val = "" ;
         var typ = "" ;

         // fill cells
         var cells = [] ;
         for (var key in elements)
         {
              val = elements[key] ;
              typ = typeof val ;
              if (typ !== "string") {
                  val = JSON.stringify(val, null, 2) ;
              }

	      cells.push({
			    "cell_type": "markdown",
			    "source": "## " + key,
		            "metadata": {
		              "collapsed": false,
		              "deletable": false,
		              "editable":  false
		            }
			 }) ;

	      cells.push({
			    "cell_type": "code",
			    "source": val,
			    "outputs": [],
			    "execution_count": 1,
			    "metadata": {
			        "name": key,
			        "type": typ,
			        "collapsed": false,
			        "deletable": false,
			        "editable":  true
			    }
			 }) ;
         }
         cells = wepsim_checkpoint_NB_concat_ws_cells(cells) ;

         // fill nb
	 var nbObj = {
			  "metadata": {
			    "kernelspec": {
			        "name": "node_nteract",
			        "language": "javascript",
			        "display_name": "Node.js (nteract)"
			    },
			    "kernel_info": {
			        "name": "node_nteract"
			    },
			    "language_info": {
			        "name": "javascript",
			        "version": "8.2.1",
			        "mimetype": "application/javascript",
			        "file_extension": ".js"
			    },
			    "title": "WepSIM ", // + get_cfg("version"),
			    "nteract": {
			        "version": "nteract-on-jupyter@2.0.0"
			    }
			  },
			  "nbformat": 4,
			  "nbformat_minor": 0,
			  "cells": cells
	             } ;

         return nbObj ;
    }

    function wepsim_checkpoint_NB2Obj ( nbObj )
    {
	 var elements = {} ;

         // check params
         if (typeof nbObj.cells === "undefined")
             return elements ;
         if (typeof nbObj.cells.length === "undefined")
             return elements ;

         // convert NB -> Obj
	 var key   = "" ;
	 var type  = "" ;
	 var value = "" ;
         for (var i=0; i<nbObj.cells.length; i++)
         {
	      if (nbObj.cells[i].cell_type !== "code") {
                  continue ;
              }

              key   = nbObj.cells[i].metadata.name ;
              type  = nbObj.cells[i].metadata.type ;
              value = nbObj.cells[i].source ;

              if (type !== "string") {
                  value = JSON.parse(value) ;
              }

	      elements[key] = value ;
         }

         return elements ;
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
	    var checkpointNB  = wepsim_checkpoint_Obj2NB(checkpointObj) ;
	    var checkpointStr = JSON.stringify(checkpointNB, null, 2) ;
	    wepsim_save_to_file(checkpointStr, obj_fileName.value) ;

	    return true ;
    }

	    function wepsim_checkpoint_afterLoad ( textLoaded, obj_fileToLoad )
	    {
		    try
		    {
			   var current_checkpoint = null ;

                           if (textLoaded !== '') {
			       current_checkpoint = JSON.parse(textLoaded) ;
			       current_checkpoint = wepsim_checkpoint_NB2Obj(current_checkpoint) ;
                           }

			   wepsim_checkpoint_loadFromObj(current_checkpoint, obj_fileToLoad) ;
		    }
		    catch (e)
		    {
			   ws_alert('Error on checkpoint file: ' + e) ;
		    }
	    }

    function wepsim_checkpoint_load ( id_file_to_load )
    {
	    // get & check params
	    var obj_fileToLoad = document.getElementById(id_file_to_load).files[0] ;

	    if ( (obj_fileToLoad === null) || (typeof obj_fileToLoad === 'undefined'))
	    {
		return false ;
	    }

	    // lambda (auxiliar) function
	    var function_after_loaded = function (textLoaded) {
					   wepsim_checkpoint_afterLoad(textLoaded, obj_fileToLoad);
			                } ;

	    // load checkpoint
	    wepsim_file_loadFrom(obj_fileToLoad, function_after_loaded) ;
	    return true ;
    }

    function wepsim_checkpoint_loadURI ( obj_uri )
    {
	    // check params
	    if ( (typeof obj_uri === "undefined") || (obj_uri === null) ) {
		  return false ;
	    }

	    // load checkpoint
	    try
	    {
                var filename = obj_uri.href.substring(obj_uri.href.lastIndexOf('/') + 1) ;

	        wepsim_url_json(obj_uri.href,
			        function(data) {
	                            var obj_refName        = { name: filename } ;
                                    var current_checkpoint = wepsim_checkpoint_NB2Obj(data) ;
				    wepsim_checkpoint_loadFromObj(current_checkpoint, obj_refName) ;
			        }) ;
	        return true ;
	    }
	    catch (e) {
		return false ;
	    }
    }

    function wepsim_checkpoint_loadExample ( tutorial_name )
    {
	    var file_uri = 'repo/checkpoint/' + tutorial_name ;

	    // lambda (auxiliar) function
	    var function_after_loaded = function (data_text)
	                                {
					   var obj_refName = { name: file_uri } ;

					   wepsim_checkpoint_afterLoad(data_text, obj_refName) ;
			                } ;

	    // load checkpoint from url
            wepsim_load_from_url(file_uri, function_after_loaded) ;
    }

    function wepsim_checkpoint_share ( id_filename, id_tagname, checkpointObj )
    {
	    // get & check params
            var obj_fileName = document.getElementById(id_filename) ;
	    var obj_tagName  = document.getElementById(id_tagname) ;

	    if ( (obj_fileName === null) || (obj_tagName === null) )
	    {
		return false ;
	    }

	    // get checkpoint
	    var checkpointNB  = wepsim_checkpoint_Obj2NB(checkpointObj) ;
	    var checkpointStr = JSON.stringify(checkpointNB, null, 2) ;

	    // share checkpoint
            var share_title = 'WepSIM checkpoint backup' ;
            var share_text  = checkpointStr ;
            var share_url   = '' ; // get_cfg('base_url') + '?mode=' + get_cfg('ws_mode') ;

	    if (obj_tagName.value.toString().trim() !== '')
	         share_title += ' (' + obj_tagName.value + ')...' ;
	    else share_title += '...' ;

            // sharing share_text (json) instead of share_url
            return share_information('checkpoint', share_title, share_text, share_text) ;
    }


    //
    // localStorage for backup
    //

    // auxiliar

    function wepsim_checkpoint_backup_load ( )
    {
	    // load current backup list
	    var obj_wsbackup = [] ;
	    try {
	       var json_wsbackup = localStorage.getItem('wepsim_backup') ;
	       obj_wsbackup = JSON.parse(json_wsbackup) ;
	    }
	    catch (e) {
	       obj_wsbackup = null ;
	    }

	    if (obj_wsbackup == null) {
	        obj_wsbackup = [] ;
	    }

	    return obj_wsbackup ;
    }

    function wepsim_checkpoint_backup_save ( obj_wsbackup )
    {
	    // save new backup list
	    var json_wsbackup = JSON.stringify(obj_wsbackup) ;
	    localStorage.setItem('wepsim_backup', json_wsbackup) ;

	    return obj_wsbackup ;
    }

    // visible

    function wepsim_checkpoint_listCache ( id_listdiv )
    {
            var o = '<span class="bg-warning text-dark bg-opacity-75">' +
                    '&lt;<span data-langkey="Empty">Empty</span>&gt;' +
                    '</span>' ;

            var obj_wsbackup = wepsim_checkpoint_backup_load() ;
	    if (obj_wsbackup.length == 0) {
	        $('#' + id_listdiv + '').html(o);
		return true ;
	    }

	    // build backup list
            o = '<div class="btn-group btn-group-toggle list-group m-1" data-bs-toggle="buttons">' ;
	    obj_wsbackup = obj_wsbackup.reverse() ;
	    for (i=0; i<obj_wsbackup.length; i++)
	    {
		 o += '<label data-bs-toggle="list" ' +
                      '       class="list-group-item btn btn-white border-dark text-truncate rounded-1">' +
		      '   <input type="radio" name="browserCacheElto" ' +
                      '          id="' + i + '" autocomplete="off" class="btn-check" ' +
                      '>' + obj_wsbackup[i].tag + '</label>' ;
	    }
            o += '</div>' ;

	    // return
	    $('#' + id_listdiv + '').html(o);
	    return true ;
    }

    function wepsim_checkpoint_loadFromCache ( id_backupname )
    {
	    var ret = {
		         error: true,
		         msg:   ''
	              } ;

	    // get & check params
	    var browserCacheElto = $('input[name=' + id_backupname + ']:checked');
	    if (typeof browserCacheElto[0] === 'undefined')
	    {
		ret.msg = "Invalid arguments" ;
		return ret ;
	    }
	    var id_backupcache = browserCacheElto[0].id ;

	    // try to load backup id
            var obj_wsbackup = wepsim_checkpoint_backup_load() ;
	        obj_wsbackup = obj_wsbackup.reverse() ;

	    var current_checkpoint = obj_wsbackup[id_backupcache] ;
	    if (typeof current_checkpoint === "undefined") {
		ret.msg = "Backup id is not valid" ;
		return ret ;
	    }

	    var obj_fileToLoad = { name: '' } ;
	    wepsim_checkpoint_loadFromObj(current_checkpoint, obj_fileToLoad) ;

	    ret.error = false ;
	    ret.msg   = "Processing load request..." ;
	    return ret ;
    }

    function wepsim_checkpoint_addCurrentToCache ( )
    {
	    // load current backup list
            var obj_wsbackup = wepsim_checkpoint_backup_load() ;

	    // add new backup
	    var current_date = Date().toString() ;
	    var current_checkpoint = wepsim_checkpoint_get(current_date) ;
	    if ( (current_checkpoint.firmware.trim() !== '') &&
	         (current_checkpoint.assembly.trim() !== '') ) {
	          obj_wsbackup.push(current_checkpoint) ;
	    }

	    // save new backup list
            wepsim_checkpoint_backup_save(obj_wsbackup) ;
	    return true ;
    }

    function wepsim_checkpoint_clearCache ( )
    {
	    // save new backup list
            var obj_wsbackup = [] ;
            wepsim_checkpoint_backup_save(obj_wsbackup) ;
	    return true ;
    }

