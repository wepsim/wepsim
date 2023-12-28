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
         *  Notifications: public API
         */

        var simcore_notifications = [] ;


        function simcore_notifications_get ( )
        {
            return simcore_notifications ;
        }

        function simcore_notifications_reset ( )
        {
            simcore_notifications = [] ;
        }

        function simcore_notifications_add2 ( ntf )
        {
	    simcore_notifications.push({
		                            title:   ntf.title,
		                            message: ntf.message,
		                            type:    ntf.type,
		                            date:    ntf.date
	                                 }) ;
        }

        function simcore_notifications_add ( ntf_title, ntf_message, ntf_type, ntf_delay )
        {
	    simcore_notifications.push({
		                            title:   $('<p>').html(ntf_title).text(),
		                            message: $('<p>').html(ntf_message).text(),
		                            type:    ntf_type,
		                            date:    new Date().getTime()
	                                 }) ;
        }

