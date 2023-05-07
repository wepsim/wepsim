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
         *  Flash assembly
         */

        /* jshint esversion: 6 */
        class ws_flash_asm extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		    // parent
		    super();
	      }

              // render
              render ( event_name )
              {
                    // initialize render elements...
                    super.render() ;

                    // render current element
                    this.render_skel() ;
              }

              // render
	      render_skel ( )
	      {
		    // html holder
		    var o1 = "<div id='scroller-flashasm' class='container-fluid p-0' " +
	           	        "     style='overflow:auto; -webkit-overflow-scrolling:touch;'> " +
                               "<div class='row m-0'>" +
                               "<div class='col-12 p-2'>" +
                                '' +
				'<div class="py-2">' +
				'<label for="div_url">(1) Set the URL where gateway.py is listening:</label><br>' +
				'<input type="text" class="w-100 border border-black"' +
				'       id="div_url" name="div_url"' +
				'       value="http://localhost:8080">' +
				'</div>' +
                                '' +
				'<div class="py-2">' +
				'<label for="div_dev" class="form-label">(2) Set Port:</label>' +
				'<input class="form-control w-100 border border-black" list="dlo_dev"' +
				'       id="div_dev" name="div_dev"' +
				'       type="text" ' +
				'       value="/dev/ttyUSB0"' +
				'       placeholder="/dev/... (type to search)">' +
				'<datalist id="dlo_dev">' +
				'  <option value="/dev/ttyUSB0">' +
				'  <option value="/dev/cu.usbserial-210">' +
				'</datalist>' +
				'</div>' +
                                '' +
				'<div class="py-2">' +
				'<label for="div_target">(3) Set target:</label><br>' +
				'<input class="form-control w-100 border border-black" list="dlo_target"' +
				'       id="div_target" name="div_target"' +
				'       type="text" ' +
				'       value="esp32c3"' +
				'       placeholder="esp32... (type to search)">' +
				'<datalist id="dlo_target">' +
				'  <option value="esp32c3">' +
				'  <option value="esp32c6">' +
				'  <option value="esp32s2">' +
				'  <option value="esp32s3">' +
				'</datalist>' +
				'</div>' +
                                '' +
				'<div class="py-2">' +
				'<button type="button" class="btn btn-success w-100"' +
				'        id="btn_flash"' +
				'        onclick="gateway_do_flash(\'div_url\', \'div_dev\', \'div_target\', \'div_info\');"' +
                                '>Check values and press the button to flash</button>' +
				'</div>' +
                                '' +
				'<label for="div_info">Output:</label><br>' +
				'<textarea class="form-control border border-black"' +
				'	  id="div_info" name="div_info"' +
				'	  rows="5" cols="50">' +
				'</textarea>' +
                                '' +
                               "</div>" +
                               "</div>" +
			   	"</div>" ;

		    this.innerHTML = o1 ;
	      }
        }

        register_uielto('ws-flash_asm', ws_flash_asm) ;


        /*
         *  Flashing
         */

	async function gateway_request_flash ( flash_url, flash_args, div_info )
	{
             var fetch_args = {
			        method:  'POST',
			        headers: {
				            'Content-type': 'application/json',
				            'Accept':       'application/json'
				         },
			        body:    JSON.stringify(flash_args)
	 	              } ;

             try
             {
                div_info.value = 'Flashing...\n' ;
                var res  = await fetch(flash_url, fetch_args) ;
                var jres = await res.json() ;
             }
             catch (e)
             {
                div_info.value = e + '\n' ;
             }

             return jres ;
	}

	function gateway_request_status ( status_url, info_div )
	{
	     var s = new EventSource(status_url) ;

	     s.onmessage = (e) => {
				     info_div.value += e.data + '\n' ;
				  };

	     s.addEventListener("end",
                                (event) => {
					      s.close();
				           }) ;
	}

	function gateway_do_flash ( div_url_name, div_dev_name, div_target_name, div_info_name )
	{
             // name to objects...
             var ddev = document.getElementById(div_dev_name) ;
             var ddet = document.getElementById(div_target_name) ;
	     var udiv = document.getElementById(div_url_name) ;
	     var idiv = document.getElementById(div_info_name) ;

             // do remote flash...
             var fasm = inputasm.getValue() ;
	     var farg = {
			   target_board: ddet.value,
			   target_port:  ddev.value,
			   assembly:     fasm
			} ;
             var furl = udiv.value ;
	     var ret = gateway_request_flash(furl + "/flash", farg, idiv);

	     // working with the async result...
             ret.then(result => {
		         if (typeof result == "undefined") {
			    return ;
		         }

                         idiv.value = result.status + '\n' ;

                         if (result.error == 'false') {
	                     gateway_request_status(furl + "/status", idiv) ;
                         }
                     }) ;
	}


