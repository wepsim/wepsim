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


    // Notifications

    function wepsim_notify_success ( ntf_title, ntf_message )
    {
         return simcoreui_notify(ntf_title, ntf_message, 'success', get_cfg('NOTIF_delay')) ;
    }

    function wepsim_notify_error ( ntf_title, ntf_message )
    {
         return simcoreui_notify(ntf_title, ntf_message, 'danger', 0) ;
    }

    function wepsim_notify_warning ( ntf_title, ntf_message )
    {
         return simcoreui_notify(ntf_title, ntf_message, 'warning', get_cfg('NOTIF_delay')) ;
    }

    function wepsim_notify_close ( )
    {
         return simcoreui_notify_close() ;
    }

