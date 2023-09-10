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
			'<nav>' +
			'  <div class="nav nav-tabs" id="nav-tab" role="tablist">' +
			'    <button class="nav-link"' +
			'            id="nav-help-tab" data-bs-target="#nav-help" aria-controls="nav-help" ' +
			'            data-bs-toggle="tab" type="button" role="tab" aria-selected="true">Help</button>' +
			'    <button class="nav-link active" ' +
			'            id="nav-flash-tab" data-bs-target="#nav-flash" aria-controls="nav-flash" ' +
			'            data-bs-toggle="tab" type="button" role="tab" aria-selected="false">Flash</button>' +
			'  </div>' +
			'</nav>' +
			'<div class="tab-content" id="nav-tabContent">' +
			'  <div class="tab-pane fade" id="nav-help" ' +
                        '       role="tabpanel" aria-labelledby="nav-help-tab" tabindex="0">' +
                        '' +
                        '<br><ul>' +
			'<li><b>[1] Install required software for your board</b></li>' +
			'For example, follow the "Get started" from espressif: ' +
			'<a href="https://docs.espressif.com/projects/esp-idf/en/v4.3.5/esp32/get-started/linux-setup.html">Linux</a>, ' +
			'<a href="https://docs.espressif.com/projects/esp-idf/en/v4.3.5/esp32/get-started/windows-setup.html">Windows</a>, ' +
			'<a href="https://docs.espressif.com/projects/esp-idf/en/v4.3.5/esp32/get-started/macos-setup.html">MacOS</a>' +
			'<p></p>' +
			'<li><b>[2] Get the gateway associated with your board</b></li>' +
			'For example, for the ESP32-C3 board:' +
			'<pre>' +
			'wget https://acaldero.github.io/wepsim/ws_dist/gateway/esp32c3.zip\n' +
			'unzip -a esp32c3.zip' +
			'</pre>' +
			'<p></p>' +
			'<li><b>(3) Execute the gateway.py</b></li>' +
			'For example, for esp32c3:' +
			'<pre>' +
			'. $HOME/esp/esp-idf/export.sh\n' +
			'cd esp32c3; ' +
			'python3 gateway.py' +
			'</pre>' +
			'<p></p>' +
			'<li><b>(4) Use the Web page form to flash</b></li>' +
			'Please open your web browser on the displayed URL while executing gateway.py. For example:' +
			'<pre>' +
			'firefox https://127.0.0.1:8080 &' +
			'</pre>' +
                        '</ul>' +
                        '' +
			'  </div>' +
			'  <div class="tab-pane fade show active" id="nav-flash"' +
                        '       role="tabpanel" aria-labelledby="nav-flash-tab" tabindex="0">' +
                        '' +
                               "<div class='row m-0'>" +
                               "<div class='col-xs-12 col-md-6 p-2'>" +
                                '' +
				'<div class="py-2">' +
				'<label for="div_url">(1) Set the URL where gateway.py is listening on:</label><br>' +
				'<input type="text" class="w-100 border border-black"' +
				'       id="div_url" name="div_url"' +
				'       value="http://localhost:8080">' +
				'</div>' +
                                '' +
				'<div class="py-2">' +
				'<label for="div_target">(2) Set model of your board:</label><br>' +
				'<input class="form-control w-100 border border-body" list="dlo_target"' +
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
				'<label for="div_dev" class="form-label">(3) Set port where is connected:</label>' +
				'<input class="form-control w-100 border border-body" list="dlo_dev"' +
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
				'<label for="btn_flash">(4) Check values and press the button to flash:</label><br>' +
                                '<div class="btn-group w-100" role="group" aria-label="flash_and_cancel">' +
				'<button type="button" class="btn btn-outline-success"' +
				'        id="btn_flash"' +
				'        onclick="gateway_do_flash(\'div_url\', \'div_dev\', \'div_target\', \'div_info\');"' +
                                '>Flash</button>' +
		  		'<button type="button" class="btn btn-outline-danger"' +
		  		'        id="btn_cancel"' +
		  		'        onclick="gateway_do_stop(\'div_url\', \'div_info\');"' +
                                '>Cancel</button>' +
                                '</div>' +
				'</div>' +
                                '' +
                               "</div>" +
                               "<div class='col-xs-12 col-md-6 p-2'>" +
                                '' +
				'<label for="div_info">(5) Output:</label><br>' +
				'<textarea class="form-control border border-secondary"' +
				'	  id="div_info" name="div_info"' +
				'	  rows="10" cols="50">' +
				'</textarea>' +
                                '' +
                               "</div>" +
                               "</div>" +
			   	"</div>" +
                        '' +
			'  </div>' +
			'</div>' ;

		    this.innerHTML = o1 ;
	      }
        }

        register_uielto('ws-flash_asm', ws_flash_asm) ;


        /*
         *  Flashing
         */

	async function gateway_do_request ( flash_url, flash_args, div_info )
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
                var res  = await fetch(flash_url, fetch_args) ;
                var jres = await res.json() ;
             }
             catch (e)
             {
                    div_info.value  = 'Error found:\n' + e.toString() + '\n\n' ;
		if (e.toString() == "TypeError: Failed to fetch")
                    div_info.value += 'TIP:\n'         + 'Please check you execute "python3 gateway.py" properly.\n' ;
             }

             return jres ;
	}

	function gateway_request_status ( status_url, info_div )
	{
	     var s = new EventSource(status_url) ;

	     s.onmessage = function(event) {
                              if ('END_OF_SSE' == event.data) {
                                  s.close() ;
                                  return ;
                              }

			      info_div.value += event.data + '\n' ;
			      info_div.scrollTop = info_div.scrollHeight;
			   };
	}

	function gateway_do_flash ( div_url_name, div_dev_name, div_target_name, div_info_name )
	{
             // name to objects...
             var ddev = document.getElementById(div_dev_name) ;
             var ddet = document.getElementById(div_target_name) ;
	     var udiv = document.getElementById(div_url_name) ;
	     var idiv = document.getElementById(div_info_name) ;

             // do remote flash...
             idiv.value = 'Flashing...\n' ;
             var fasm = inputasm.getValue() ;
	     var farg = {
			   target_board: ddet.value,
			   target_port:  ddev.value,
			   assembly:     fasm
			} ;
             var furl = udiv.value ;
	     var ret = gateway_do_request(furl + "/flash", farg, idiv);

	     // working with the async result...
             ret.then((result) => {
		         if (typeof result == "undefined") {
			    return ;
		         }

                         idiv.value = result.status + '\n' ;

                         if (result.error == 0) {
	                     gateway_request_status(furl + "/status", idiv) ;
                         }
                     }) ;
	}

	function gateway_do_stop ( div_url_name, div_info_name )
	{
             // name to objects...
	     var udiv = document.getElementById(div_url_name) ;
	     var idiv = document.getElementById(div_info_name) ;

             // do remote flash...
             idiv.value = 'Cancel...\n' ;
             var furl = udiv.value ;
	     var ret = gateway_do_request(furl + "/stop", {}, idiv);

	     // working with the async result...
             ret.then(result => {
		         if (typeof result != "undefined") {
                            idiv.value = result.status + '\n' ;
		         }
                     }) ;
	}

