/*     
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  notifications
         */

        function simcoreui_do_notify ( ntf_title, ntf_message, ntf_type, ntf_delay )
        {
	    // alerts-container does not exist, create it
	    var ac = $("#alerts-container") ;
	    if (ac.length == 0) {
		ac = $('<div id="alerts-container" ' + 
                       '     class="col-xs-10 offset-xs-1  col-md-8 offset-md-2  col-lg-6 offset-lg-3" ' +
                       '     style="position:fixed; top:10%; z-index:256;">') ;
		$("body").append(ac) ;
	    }

	    // create the alert div
            var btn1   = $('<button type="button" class="close" data-dismiss="alert">') ;
	    var alert1 = $('<div class="alert alert-' + ntf_type + ' shadow">') ;
	    ac.prepend(alert1.append(btn1.append("&times;")).append(ntf_message)) ;

	    // if delay was passed, set up a timeout to close the alert
	    if (ntf_delay != 0) {
		window.setTimeout(function() { alert1.alert("close") }, ntf_delay);     
	    }
        }


        var simcoreui_notifications = [] ;

        function simcoreui_notifications_get ( )
        {
            return simcoreui_notifications ;
        }

        function simcoreui_notifications_reset ( )
        {
            simcoreui_notifications = [] ;
        }

        function simcoreui_notify ( ntf_title, ntf_message, ntf_type, ntf_delay )
        {
	    // notify
            simcoreui_do_notify(ntf_title, ntf_message, ntf_type, ntf_delay) ;

	    // add to notifications
	    simcoreui_notifications.push({ 
		                         // title:   ntf_title, 
		                         // message: ntf_message, 
		                            title:   $('<p>').html(ntf_title).text(),
		                            message: $('<p>').html(ntf_message).text(),
		                            type:    ntf_type,
		                            date:    new Date().getTime()
	                                 }) ;
        }

        function simcoreui_notify_close ( )
        {
            $(".alert").alert('close') ;
        }

        function simcoreui_notify_notifications ( )
        {
	    var acc = '' ;
            var   t = null ;

	    // setup content...
	    acc  += '<br>' + 
		    '<div class="card" style="max-height:80vh; overflow:auto; -webkit-overflow-scrolling: touch;">' + 
		    '<ul class="list-group list-group-flush">' ;
	    for (var i=simcoreui_notifications.length-1; i!=0; i--) 
	    {
		 t = new Date(simcoreui_notifications[i].date) ;

                 acc += '<li class="list-group-item list-group-item-' + simcoreui_notifications[i].type + '">' + 
			'<h5 class="m-0">' +
			'<span class="badge">[' + t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + ']</span>' + 
			'<span class="badge">(' + 
                            t.getHours()    + ':' + t.getMinutes()   + ':' + t.getSeconds() + '-' + t.getMilliseconds() +
			')</span>' + 
			'</h5>' +
			'<span class="text-monospace">' +
			    simcoreui_notifications[i].title + ':' + 
			'</span>' +
			    simcoreui_notifications[i].message + 
			'</li>' ;
	    }
	    acc += '</ul>' +
		   '</div>' ;

	    // display notifications...
            simcoreui_notify_close() ;
            simcoreui_do_notify('notifications', acc, 'light', 0) ;
        }

