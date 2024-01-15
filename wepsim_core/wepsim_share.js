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
     * Share
     */

    function share_information ( info_shared, share_title, share_text, share_url )
    {
	 if (typeof navigator.share !== 'undefined')
	 {
             return share_uri(info_shared, share_title, share_text, share_url) ;
	 }

         // new dialog
	 var msg = '<div id="qrcode1" class="mx-auto"></div>' +
		   '<br>' +
		   'You can use the following link:<br>' +
	           '<textarea id="qrcode2" class="form-control" row="5" ' +
                   '          style="width: 100%; height:100%"' +
                   '          onclick="navigator.clipboard.writeText(this.value);">' +
                   share_url +
                   '</textarea>' +
                   '<span class="btn btn-sm btn-success" ' +
                   '      onclick="var c = document.getElementById(\'qrcode2\').value;' +
                   '               navigator.clipboard.writeText(c);">Copy to clipboard</span>' +
	           '<br>' ;

	 wsweb_dlg_alert(msg) ;

         // get URL and QR
         try
         {
            $("#qrcode1").html('You can use the following QR-code:<br>') ;
            var qrcode = new QRCode("qrcode1") ;
            qrcode.clear() ;
            qrcode.makeCode(share_url) ;
         }
         catch (e) {
         // $("#qrcode1").html('You can use the following <a href="' + share_url + '">link</a><br>') ;
            $("#qrcode1").html('') ;
         }

         // return ok
	 return true ;
    }

    function share_as_uri ( share_eltos )
    {
         var url_to_share = '' ;
         var txt_enc      = '' ;

         // build the associate URI
         try
         {
            url_to_share = get_cfg('base_url') + '?mode=' + get_cfg('ws_mode') ;

            // * Thanks to Santiago and Diego for the LZString link

            if (share_eltos.includes('mc'))
            {
                txt_enc  = LZString.compressToEncodedURIComponent(  inputfirm.getValue() ) ;
                url_to_share = url_to_share + '&mc=' + txt_enc ;
            }
            if (share_eltos.includes('asm'))
            {
                txt_enc = LZString.compressToEncodedURIComponent(  inputasm.getValue() ) ;
                url_to_share = url_to_share + '&asm=' + txt_enc ;
            }
         }
         catch (e) {
            url_to_share = '' ;
         // console.log("ERROR on share_as_uri: url_to_share cannot be build\n") ;
         }

         // return link
	 return url_to_share ;
    }

    function share_uri ( info_shared, share_title, share_text, share_url )
    {
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

