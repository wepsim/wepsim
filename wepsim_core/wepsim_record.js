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
     * Record: private API
     */

    var ws_is_recording = false ;
    var ws_is_playing   = false ;
    var ws_records      = [] ;

    function wepsim_record_push ( desc, elto )
    {
        var record = { 
		       timestamp:   Date.now(),
		       description: desc,
		       element:     elto
	             } ;

        ws_records.push(record) ;
    }

    function wepsim_record_play_at ( div_obj, index )
    {
	// 1.- stop playing...
        if (ws_is_playing === false) {
	    return ;
	}
	if (index >= ws_records.length) {
	    return ;
	}

	// 2.- execute current step 
	//     a) execute step 
	eval(ws_records[index].element) ;

	//     b) show message
	if (typeof div_obj.html !== "undefined")
	    div_obj.html(ws_records[index].description) ;

	// 3.- set next one
	var wait_time = 500 ;
	if (typeof ws_records[index + 1] !== "undefined") {
	    wait_time = ws_records[index + 1].timestamp - ws_records[index].timestamp ;
	}

        setTimeout(function() {
	               wepsim_record_play_at(index + 1) ;
                   }, wait_time);
    }

    function wepsim_record_set ( records )
    {
        ws_records = records ;
    }


    /*
     * Record: public API
     */

    // start, pause

    function wepsim_record_on ( )
    {
        ws_is_playing   = false ;
        ws_is_recording = true ;
    }

    function wepsim_record_off ( )
    {
        ws_is_playing   = false ;
        ws_is_recording = false ;
    }

    function wepsim_record_toggle ( )
    {
        ws_is_recording = !ws_is_recording ;
    }

    function wepsim_record_isRecording ( )
    {
        return ws_is_recording ;
    }

    // recording object

    function wepsim_record_get ( )
    {
        return ws_records ;
    }

    function wepsim_record_reset ( )
    {
        ws_records = [] ;
    }

    function wepsim_record_add_stringcode ( description, elto )
    {
        if (ws_is_recording === true) {
            wepsim_record_push(description, elto) ;
	}
    }

    function wepsim_record_add_function ( elto )
    {
        if (ws_is_recording === false) {
	    return ;
	}

	// base on code from https://stackoverflow.com/questions/1013239/can-i-get-the-name-of-the-currently-running-function-in-javascript
        var ownName = arguments.callee.toString() ;
            ownName = ownName.substr('function '.length) ;        // trim off "function "
            ownName = ownName.substr(0, ownName.indexOf('(')) ;   // trim off everything after the function name

        wepsim_record_push('', ownName) ;
    }

    function wepsim_record_play ( div_id )
    {
        ws_is_recording = false ;
        ws_is_playing   = true ;

        var div_obj = $('#' + div_id) ;
        wepsim_record_play_at(div_obj, 0) ;
    }

