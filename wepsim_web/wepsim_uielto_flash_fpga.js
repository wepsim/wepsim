/*
 *  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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
         *  Flash FPGA
         */

        /* jshint esversion: 6 */
        class ws_flash_fpga extends ws_uielto
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
		    var o1 = "<div id='scroller-flashfpga' class='container-fluid p-0' " +
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
			'<li><b>[1] Install required software</b></li>' +
			'For example, follow the "Get started": ' +
			'<a href="https://github.com/ALVAROPING1">Linux</a>, ' +
			'<p></p>' +
			'<li><b>(2) Execute the gateway.py</b></li>' +
			'For example:' +
			'<pre>' +
			'cd gateway; ' +
			'python3 gateway.py' +
			'</pre>' +
			'<p></p>' +
			'<li><b>(3) Use the Web page form to flash</b></li>' +
			'Please open your web browser and use the Flash option.' +
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
				'<label for="div_url">(1) Set the server URL:</label><br>' +
				'<input type="text" class="w-100 border border-black"' +
				'       id="div_url" name="div_url"' +
				'       value="http://localhost:8080">' +
				'</div>' +
                                '' +
				'<div class="py-2">' +
				'<label for="div_dev" class="form-label">(2) Set the device port:</label>' +
				'<input class="form-control w-100 border border-body" list="dlo_dev"' +
				'       id="div_dev" name="div_dev"' +
				'       type="text" ' +
				'       value="/dev/ttyUSB1"' +
				'       placeholder="/dev/... (type to search)">' +
				'<datalist id="dlo_dev">' +
				'  <option value="/dev/ttyUSB0">' +
				'  <option value="/dev/cu.usbserial-210">' +
				'</datalist>' +
				'</div>' +
                                '' +
				'<div class="pt-3 pb-2">' +
                                '<div class="btn-group w-100" role="group" aria-label="compile_flash_and_cancel">' +
				'<button type="button" class="btn btn-outline-info mx-1"' +
				'        id="btn_ccmc"' +
				'        onclick="gateway_do_ccmc(\'div_url\', \'div_dev\', \'div_info\');"' +
                                '>Compile microcode</button>' +
				'<button type="button" class="btn btn-outline-success mx-1"' +
				'        id="btn_flash"' +
				'        onclick="gateway_do_flash(\'div_url\', \'div_dev\', \'div_info\');"' +
                                '>Flash program</button>' +
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

        register_uielto('ws-flash_fpga', ws_flash_fpga) ;


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

	function gateway_do_ccmc ( div_url_name, div_dev_name, div_info_name )
	{
// TODO: move to the proper REST interface

             // name to objects...
             var ddev = document.getElementById(div_dev_name) ;
	     var udiv = document.getElementById(div_url_name) ;
	     var idiv = document.getElementById(div_info_name) ;

             // prepare assembly code...
             var SIMWARE = get_simware() ;
             var fasm = inputasm.getValue() ;
             var ret  = wsasm_src2src(SIMWARE, fasm, { instruction_comma: true }) ;
             if (ret.error != null) { 
                 return ret;
             }

             fasm = ret.src_alt ; // normalized syntax

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

	function gateway_do_flash ( div_url_name, div_dev_name, div_info_name )
	{
             // name to objects...
             var ddev = document.getElementById(div_dev_name) ;
	     var udiv = document.getElementById(div_url_name) ;
	     var idiv = document.getElementById(div_info_name) ;

             // prepare assembly code...
             var SIMWARE = get_simware() ;
             var fasm = inputasm.getValue() ;
             var ret  = wsasm_src2src(SIMWARE, fasm, { instruction_comma: true }) ;
             if (ret.error != null) { 
                 return ret;
             }

             fasm = ret.src_alt ; // normalized syntax

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

