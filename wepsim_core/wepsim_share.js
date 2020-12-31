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
     * Share
     */

    function share_information ( info_shared, share_title, share_text, share_url )
    {
	 if (typeof navigator.share === 'undefined')
	 {
	     var msg = 'Sorry, unable to share:<br>\n' +
		       'navigator.share is not available.<br>' +
		       '<br>' +
		       '<div id="qrcode1" class="mx-auto"></div>' +
		       '<br>' ;
	     wsweb_dlg_alert(msg) ;

             if (share_url !== "") {
                 var qrcode = new QRCode("qrcode1") ;
                     qrcode.makeCode(share_url) ;
             }

	     return false ;
	 }

	 // build data
	 var data = {} ;

	 data.title = share_title ;
	 data.text  = share_text ;
	 data.url   = share_url ;

	 // try to share data
	 try
	 {
	     navigator.share(data) ;
	 }
	 catch(err)
	 {
	     wsweb_dlg_alert('Sorry, unsuccessful share: ' + err.message) ;
	 }

	 // stats about sharing
	 ga('send', 'event', 'ui', 'ui.share', 'ui.share.' + info_shared);

	 return true ;
    }

