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
         *  Share link
         */

        /* jshint esversion: 6 */
        class ws_share_link extends HTMLElement
        {
              static get observedAttributes()
	      {
	            return [ 'fid', 'jshare' ] ;
	      }

	      constructor ()
	      {
		    // parent
		    super();
	      }

	      update_internal_attributes ( )
	      {
                    // fid
                    var fid = this.getAttribute('fid') ;
                    if (fid === null)
                        this.setAttribute('fid', 'id52') ;

                    // jshare
                    var jshare = this.getAttribute('jshare') ;
                    if (jshare === null)
                        this.setAttribute('jshare', '') ;
	      }

	      render ( event_name )
	      {
                    // update attributes
                    this.update_internal_attributes() ;

                    // save html
                    var o1 = '' ;
		    o1 += "<div class='card border-secondary h-100'>" +
			  "<div class='card-header border-secondary text-white bg-secondary p-1'>" +
			  " <h5 class='m-0'>" +
			  " <span class='text-white bg-secondary' data-langkey='Link'>Link</span>" +
			  " <button class='btn bg-body-tertiary mx-1 float-end py-0 col-auto' " +
                          '         onclick="var c = document.getElementById(\'qrcode2\').value;' +
                          '                  share_information(\'share\', \'title\', \'text\', c);" ' +
                          "><span data-langkey='Share'>Share</span></button>" +
			  " <button class='btn bg-body-tertiary mx-1 float-end py-0 col-auto' " +
                          '         onclick="var c = document.getElementById(\'qrcode2\').value;' +
                          '                  navigator.clipboard.writeText(c); ' +
                          '                  wepsim_notify_success(\'<strong>INFO</strong>\', ' +
                          '                                        \'Copied to clipboard!\');" ' +
                          "><span data-langkey='Copy'>Copy</span></button>" +
			  " </h5>" +
			  "</div>" +
			  "<div class='card-body'>" +
		          'You can use the following link:<br>' +
	                  '<textarea id="qrcode2" class="form-control" ' +
	                  '          row="5" style="height:70%" ' +
                          '          onclick="navigator.clipboard.writeText(this.value);" ' +
                          '>Loading...</textarea>' +
	                  '<br>' +
	               // '<div id="qrcode1" class="mx-auto"></div>' +
		       // '<br>' +
			  "</div>" +
			  "</div>" ;

                    this.innerHTML = o1 ;

                    // get URL and QR
	            var this_jshare = this.jshare ;
                    setTimeout(function() {
				    try
				    {
				       var share_text = share_as_uri(this_jshare) ;
				       $("#qrcode2").html(share_text) ;

				    // $("#qrcode1").html('You can use the following QR-code:<br>') ;
				    // var qrcode = new QRCode("qrcode1") ;
				    // qrcode.makeCode(share_text) ;
				    }
				    catch (e) {
				    // $("#qrcode1").html(e) ;
				       $("#qrcode1").html('') ;
				    }
                               }, 200) ;
	      }

	      connectedCallback ()
	      {
		    this.render('connectedCallback') ;
	      }

	      attributeChangedCallback (name, oldValue, newValue)
	      {
		    this.render('attributeChangedCallback') ;
	      }

	      get fid ( )
	      {
                   return this.getAttribute('fid') ;
	      }

	      set fid ( value )
	      {
                   this.setAttribute('fid', value) ;
	      }

	      get jshare ( )
	      {
                   return this.getAttribute('jshare') ;
	      }

	      set jshare ( value )
	      {
                   this.setAttribute('jshare', value) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-share-link', ws_share_link) ;
        }

