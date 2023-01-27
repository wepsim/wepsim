/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
	     var msg = '' ;
             var url_to_share = '' ;

             // new dialog
	     msg = 'Sorry, unable to share:<br>\n' +
		   'navigator.share is not available.<br>' +
		   '<br>' +
		   '<div      id="qrcode1" class="mx-auto mb-3"></div>' +
		   '<textarea id="qrcode2" class="form-control"' +
                   '          row="5" style="width: 100%; height:100%"' +
                   '>Loading qr...</textarea>' +
		   '<br>' ;
	     wsweb_dlg_alert(msg) ;

             // new URL
             url_to_share =            get_cfg('base_url') +
                            '?mode=' + get_cfg('ws_mode') +
                         // '&examples_set=RISCV' +
                            '&asm=' + encodeURIComponent(share_text) ;

             // new QR
             try {
                $("#qrcode2").html(url_to_share) ;
                $("#qrcode1").html('But you can use the following QR-code:<br>') ;
                var qrcode = new QRCode("qrcode1") ;
                qrcode.makeCode(url_to_share) ;
             }
             catch (e) {
                $("#qrcode1").html('') ;
                if (typeof navigator.clipboard != "undefined")
                    navigator.clipboard.writeText(url_to_share);
             }

             // return ok
	     return true ;
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
	 simcore_ga('ui', 'ui.share', 'ui.share.' + info_shared) ;

	 return true ;
    }

