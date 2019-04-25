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
     * Record: private
     */

    // Private data
    var ws_records      = [] ;
    var ws_last_played  = 0 ;
    var ws_last_time    = 0 ;

    var ws_is_recording = false ;
    var ws_is_playing   = false ;


    // Private API
    function wepsim_record_pushElto ( desc, elto )
    {
	// add a new record
        var record = { 
		       timestamp:   (Date.now() - ws_last_time),
		       description: desc,
		       element:     elto
	             } ;
        ws_records.push(record) ;

	// update timestamp
        ws_last_time = Date.now() ;
    }

    function wepsim_record_showMsg ( div_id, index, msg )
    {
        var div_obj = $('#' + div_id) ;

	if (typeof div_obj.html !== "undefined") {
	    div_obj.html('<em>' + index + '/' + ws_records.length + '</em>&nbsp;' + msg) ;
	}
    }

    function wepsim_record_playAt ( div_id, index )
    {
	// 1.- stop playing...
        if (ws_is_playing === false) 
	{
                wepsim_record_showMsg(div_id, ws_last_played, 'Stopped by user.') ;
	        return ;
	}
        ws_last_played = index ;
	if (index >= ws_records.length) 
	{
                wepsim_record_showMsg(div_id, ws_records.length, 'Done.') ;
	        return ;
	}

	// 2.- execute current step, show message, and set last played
	eval(ws_records[index].element) ;
        wepsim_record_showMsg(div_id, index+1, ws_records[index].description) ;

	// 3.- set next one
	var next_index = index + 1 ;
	var wait_time  = 500 ;
	if (next_index < ws_records.length) {
	    wait_time = ws_records[next_index].timestamp ;
	}
	wait_time = (wait_time < 500) ? 500 : wait_time ;

        setTimeout(function() {
	               wepsim_record_playAt(div_id, next_index) ;
                   }, wait_time);
    }


    /*
     * Record: public API
     */

    // recording (on, off, ...)

    function wepsim_record_on ( div_id )
    {
        ws_is_playing   = false ;
        ws_is_recording = true ;
        ws_last_played  = 0 ;
        ws_last_time    = Date.now() ;

        wepsim_record_showMsg(div_id, ws_last_played, 'Recording...') ;
    }

    function wepsim_record_off ( div_id )
    {
        ws_is_playing   = false ;
        ws_is_recording = false ;
        ws_last_played  = 0 ;

        wepsim_record_showMsg(div_id, ws_last_played, 'Stopped by user.') ;
    }

    function wepsim_record_isRecording ( )
    {
        return ws_is_recording ;
    }

    // playing (play, pause)

    function wepsim_record_play ( div_id )
    {
        ws_is_recording = false ;
        ws_is_playing   = true ;

        wepsim_record_playAt(div_id, ws_last_played) ;
    }

    function wepsim_record_pause ( div_id )
    {
        ws_is_recording = false ;
        ws_is_playing   = !ws_is_playing ;

        if (ws_is_playing === true) {
            wepsim_record_playAt(div_id, ws_last_played) ;
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

    function wepsim_record_set ( records, div_id )
    {
        ws_records = records ;

        wepsim_record_showMsg(div_id, 0, 'Record restored.') ;
    }

    function wepsim_record_reset ( div_id )
    {
        ws_records = [] ;

        wepsim_record_showMsg(div_id, 0, 'Empty record') ;
    }

    function wepsim_record_add ( div_id, description, elto )
    {
        if (ws_is_recording === true) 
	{
            wepsim_record_pushElto(description, elto) ;
            wepsim_record_showMsg(div_id, 0, 'Recording...') ;
	}
    }

