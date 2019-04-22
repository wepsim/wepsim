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

    var ws_records      = [] ;
    var ws_is_recording = false ;
    var ws_is_playing   = false ;
    var ws_last_played  = 0 ;

    function wepsim_record_pushElto ( desc, elto )
    {
        var record = { 
		       timestamp:   Date.now(),
		       description: desc,
		       element:     elto
	             } ;

        ws_records.push(record) ;
    }

    function wepsim_record_playAt ( div_obj, index )
    {
	// 1.- stop playing...
        if (ws_is_playing === false) 
	{
		if (typeof div_obj.html !== "undefined")
		    div_obj.html('<em>' + index + '/' + ws_records.length + '</em>&nbsp;Stopped by user.') ;

	        return ;
	}
	if (index >= ws_records.length) 
	{
		if (typeof div_obj.html !== "undefined")
		    div_obj.html('<em>' + ws_records.length + '/' + ws_records.length + '</em>&nbsp;Done.') ;

	        return ;
	}

	// 2.- execute current step 
	//     a) execute step 
	eval(ws_records[index].element) ;

	//     b) show message
	if (typeof div_obj.html !== "undefined") {
	    div_obj.html('<em>' + (index+1) + '/' + ws_records.length + '</em>&nbsp;' + ws_records[index].description) ;
	}

	//     c) set last played
        ws_last_played = index ;

	// 3.- set next one
	var wait_time = 500 ;
	if (typeof ws_records[index + 1] !== "undefined") {
	    wait_time = ws_records[index + 1].timestamp - ws_records[index].timestamp ;
	}
	wait_time = (wait_time < 500) ? 500 : wait_time ;

        setTimeout(function() {
	               wepsim_record_playAt(div_obj, index + 1) ;
                   }, wait_time);
    }


    /*
     * Record: public API
     */

    // recording (on, off, ...)

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

    function wepsim_record_isRecording ( )
    {
        return ws_is_recording ;
    }

    // playing (play, pause)

    function wepsim_record_play ( div_id )
    {
        var div_obj = $('#' + div_id) ;

        ws_is_recording = false ;
        ws_is_playing   = true ;
        ws_last_played  = 0 ;

        wepsim_record_playAt(div_obj, ws_last_played) ;
    }

    function wepsim_record_pause ( div_id )
    {
        ws_is_playing = !ws_is_playing ;

        if (ws_is_playing === true) 
	{
            var div_obj = $('#' + div_id) ;
            wepsim_record_playAt(div_obj, ws_last_played) ;
	}
    }

    function wepsim_record_isPlaying ( )
    {
        return ws_is_playing ;
    }

    // recording object

    function wepsim_record_get ( )
    {
        return ws_records ;
    }

    function wepsim_record_set ( records )
    {
        ws_records = records ;
    }

    function wepsim_record_reset ( )
    {
        ws_records = [] ;
    }

    function wepsim_record_add_stringcode ( description, elto )
    {
        if (ws_is_recording === true) {
            wepsim_record_pushElto(description, elto) ;
	}
    }

