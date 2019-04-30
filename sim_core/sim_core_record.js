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

    var ws_record_div_name = '' ;
    var ws_record_div_obj  = null ;


    // Private API
    function simcore_record_pushElto ( desc, elto )
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

    function simcore_record_showMsg ( index, msg )
    {
	if (ws_record_div_obj !== null) {
	    ws_record_div_obj.html('<em>' + index + '/' + ws_records.length + '</em>&nbsp;' + msg) ;
	}
    }

    function simcore_record_playAt ( index )
    {
	// 1.- stop playing...
        if (ws_is_playing === false)
	{
                simcore_record_showMsg(ws_last_played, 'Stopped by user.') ;
	        return ;
	}
        ws_last_played = index ;
	if (index >= ws_records.length)
	{
                simcore_record_showMsg(ws_records.length, 'Done.') ;
	        return ;
	}

	// 2.- execute current step, show message, and set last played
	eval(ws_records[index].element) ;
        simcore_record_showMsg(index+1, ws_records[index].description) ;

	// 3.- set next one
	var next_index = index + 1 ;
	var wait_time  = 500 ;
	if (next_index < ws_records.length) {
	    wait_time = ws_records[next_index].timestamp ;
	}
	wait_time = (wait_time < 500) ? 500 : wait_time ;

        setTimeout(function() {
	               simcore_record_playAt(next_index) ;
                   }, wait_time);
    }

    function simcore_record_glowing ( ui_id )
    {
         // check params
	 var ui_obj = $(ui_id) ;
	 if (ui_obj === null) {
	     return ;
	 }

         // add class and...
         ui_obj.addClass('btn-warning') ;

         // ...remove it after 250 ms.
         setTimeout(function() {
		       ui_obj.removeClass('btn-warning') ;
	            }, 250) ;
    }

    function simcore_record_glowAdd ( )
    {
	 var ui_obj = $(this) ;
	 var ui_id  = ui_obj.attr('id') ;

	 if (typeof ui_id !== 'undefined') {
             simcore_record_add('Click',
		                'simcore_record_glowing("#' + ui_id + '");\n') ;
	 }
    }

    function simcore_record_glow ( is_on )
    {
	if (is_on)
	{
	         $(".btn").on("click", simcore_record_glowAdd) ;
	    $(".nav-link").on("click", simcore_record_glowAdd) ;
	}
	else
	{
                 $(".btn").off("click", simcore_record_glowAdd) ;
	    $(".nav-link").off("click", simcore_record_glowAdd) ;
	}
    }


    /*
     * Record: public API
     */

    // init

    function simcore_record_init ( div_id )
    {
	ws_records = [] ;

	ws_last_played  = 0 ;
	ws_last_time    = 0 ;

	ws_is_playing   = false ;
	ws_is_recording = false ;
        simcore_record_glow(false) ;

	ws_record_div_name = div_id ;

        ws_record_div_obj  = $('#' + div_id) ;
	if (typeof ws_record_div_obj.html === "undefined") {
            ws_record_div_obj = null ;
	}
    }

    function simcore_record_reinit ( )
    {
	ws_records = [] ;

	ws_last_played  = 0 ;
	ws_last_time    = 0 ;

	ws_is_playing   = false ;
	ws_is_recording = false ;
        simcore_record_glow(false) ;
    }


    // recording (on, off, ...)

    function simcore_record_on ( )
    {
        ws_is_playing   = false ;
        ws_is_recording = true ;
        simcore_record_glow(true) ;

        ws_last_played  = 0 ;
        ws_last_time    = Date.now() ;

        simcore_record_showMsg(ws_last_played, 'Recording...') ;
    }

    function simcore_record_off ( )
    {
        ws_is_playing   = false ;
        ws_is_recording = false ;
        simcore_record_glow(false) ;

        ws_last_played  = 0 ;

        simcore_record_showMsg(ws_last_played, 'Stopped by user.') ;
    }

    function simcore_record_isRecording ( )
    {
        return ws_is_recording ;
    }

    // playing (play, pause)

    function simcore_record_play ( )
    {
        if (ws_is_playing === true) {
	    return ;
	}

        ws_is_playing   = true ;
        ws_is_recording = false ;
        simcore_record_glow(false) ;

        simcore_record_playAt(ws_last_played) ;
    }

    function simcore_record_pause ( )
    {
        ws_is_playing   = !ws_is_playing ;
        ws_is_recording = false ;
        simcore_record_glow(false) ;

        if (ws_is_playing === true)
	{
            simcore_record_playAt(ws_last_played) ;
	}
    }

    function simcore_record_isPlaying ( )
    {
        return ws_is_playing ;
    }

    // recording object

    function simcore_record_get ( )
    {
        return ws_records ;
    }

    function simcore_record_set ( records )
    {
        simcore_record_reinit() ;

        ws_records = records ;
        simcore_record_showMsg(0, 'Record restored.') ;
    }

    function simcore_record_reset ( )
    {
        simcore_record_reinit() ;

        ws_records = [] ;
        simcore_record_showMsg(0, 'Empty record') ;
    }

    function simcore_record_add ( description, elto )
    {
        if (ws_is_recording === true)
	{
            simcore_record_pushElto(description, elto) ;
            simcore_record_showMsg(0, 'Recording...') ;
	}
    }

    function simcore_record_addAlways ( description, elto )
    {
        simcore_record_pushElto(description, elto) ;
        simcore_record_showMsg(0, 'Recorded') ;
    }

