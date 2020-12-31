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


    /*
     * API - one notification
     */

    function wepsim_notify_show_notify ( ntf_title, ntf_message, ntf_type, ntf_delay )
    {
	    // alerts-container does not exist, create it
	    var ac = $("#alerts-container") ;
	    if (ac.length === 0) {
		ac = $('<div id="alerts-container" ' +
                       '     class="col-10 offset-xs-1  col-md-8 offset-md-2  col-lg-6 offset-lg-3" ' +
                       '     style="position:fixed; top:10%; z-index:256;">') ;
		$("body").append(ac) ;
	    }

	    // create the alert div
            var btn1   = $('<button type="button" class="close" onclick="wepsim_notify_close(); return false;">') ;
	    var alert1 = $('<div class="alert alert-' + ntf_type + ' shadow border border-light">') ;
	    ac.prepend(alert1.append(btn1.append("&times;")).append(ntf_message)) ;

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


    /*
     * Notifications (summary)
     */

    function table_notifications_html ( notifications )
    {
	// setup content...
	var u = '' ;
        var t = null ;
	var m = '' ;
	for (var i=notifications.length-1; i!=-1; i--)
	{
		 t = new Date(notifications[i].date) ;
		 m = notifications[i].message.replace(/\n/g, '<br>\n') ;

                 u += '<li class="list-group-item list-group-item-' + notifications[i].type + ' rounded-lg mx-2 my-1 p-2 shadow-sm">' +
			'<h5 class="m-0 collapse7 show">' +
			'<span class="badge">(' +
                            t.getHours()    + ':' + t.getMinutes()   + ':' + t.getSeconds() + '.' + t.getMilliseconds() +
			')</span>' +
			'<span class="badge">[' + t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + ']</span>' +
			'</h5>' +
			'<span class="text-monospace">' + notifications[i].title + ':' + '</span>' + m +
			'</li>' ;
	}
	if (u.trim() === '') {
	    u = '<p class="m-3 text-center py-4"><b>&lt;Empty&gt;</b></p>' ;
	}

	// build html
	var o = '<div id="container-notifications3" class="card border-white" ' +
                '     style="max-height:50vh; overflow:auto; -webkit-overflow-scrolling: touch;">' +
	        '<ul class="list-group list-group-flush">' +
                u +
	        '</ul>' +
	        '</div>' ;

	return o ;
    }


