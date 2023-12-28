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
     * API - one notification
     */

    function wepsim_notify_show_notify ( ntf_title, ntf_message, ntf_type, ntf_delay )
    {
	    // alerts-container does not exist, create it
	    var ac = $("#alerts-container") ;
	    if (ac.length === 0)
            {
		ac = $('<div id="alerts-container" ' +
                       '     class="col-10 offset-1  col-md-8 offset-md-2  col-lg-6 offset-lg-3" ' +
                       '     style="position:fixed; top:10%; z-index:1024;">') ;
		$("body").append(ac) ;
	    }
 
	    // div configuration...
            var btn1_close_class = "btn-close border border-secondary float-end alert-dismissible" ;
            var ale1_div_class   = "alert alert-" + ntf_type + " shadow border border-tertiary" ;

	    // create the alert div
            var btn1   = $('<button type="button" class="' + btn1_close_class + '" onclick="wepsim_notify_close(); return false;">') ;
	    var alert1 = $('<div class="' + ale1_div_class + '">') ;
	    ac.prepend(alert1.append(btn1.append("")).append(ntf_message)) ;

	    // if delay was passed, set up a timeout to close the alert
	    if (ntf_delay != 0) {
		window.setTimeout(function() { alert1.alert("close"); }, ntf_delay) ;
	    }

	    // audio
            var msg = "Notification type " + ntf_type + " and title " + ntf_title + ":" + ntf_message + ". " ;
            msg = $("</p>").html(msg).text() ;
            simcore_voice_speak(msg) ;
    }


    function wepsim_notify_do_notify ( ntf_title, ntf_message, ntf_type, ntf_delay )
    {
	    // add to notifications
	    simcore_notifications_add(ntf_title, ntf_message, ntf_type, ntf_delay) ;

	    // show up notifications
            wepsim_notify_show_notify(ntf_title, ntf_message, ntf_type, ntf_delay) ;
    }

	    function wepsim_notify_success ( ntf_title, ntf_message )
	    {
		 return wepsim_notify_do_notify(ntf_title, ntf_message, 'success', get_cfg('NOTIF_delay')) ;
	    }

	    function wepsim_notify_error ( ntf_title, ntf_message )
	    {
		 return wepsim_notify_do_notify(ntf_title, ntf_message, 'danger', 0) ;
	    }

	    function wepsim_notify_warning ( ntf_title, ntf_message )
	    {
		 return wepsim_notify_do_notify(ntf_title, ntf_message, 'warning', get_cfg('NOTIF_delay')) ;
	    }

    function wepsim_notify_close ( )
    {
            $(".alert").alert('close') ;

            // add if recording
            simcore_record_append_new('Close all notifications',
                                      'wepsim_notify_close();\n') ;
    }

