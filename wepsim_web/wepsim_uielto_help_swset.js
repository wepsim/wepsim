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
         *  Help on hardware elements
         */

        /* jshint esversion: 6 */
        class ws_help_swset extends ws_uielto
        {
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
		    this.render_populate() ;
	      }

	      render_skel ( )
	      {
                    var o1 = '' ;
                    var id_search = this.name_str + '_sws_input1' ;
                    var id_list   = this.name_str + '_sws_list1' ;

                    // build HTML
		    o1 += '<div class="container">' +
			  '<div class="row justify-content-center w-100 my-2 mx-0 sticky-top bg-body">' +
			  '<input id="' + id_search + '" ' +
			  '       onkeyup="var value=$(this).val().toLowerCase();' +
			  '	             $(\'.table2 tr\').filter(function() {' +
			  '	               $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)' +
			  '	             });"' +
			  '       class="form-control my-2" type="text" placeholder="Search...">' +
			  '</div>' +
			  '<div class="row justify-content-center" id="' + id_list + '"></div>' +
			  '</div>' ;

		    this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
		    var o1 = '' ;
                    var id_search = this.name_str + '_sws_input1' ;
                    var id_list   = this.name_str + '_sws_list1' ;

		    // check firmware
                    var ws_firmware = get_simware() ;
                    if ( (typeof ws_firmware === "undefined") ||
                         (typeof ws_firmware.firmware === "undefined") )
                    {
	                  o1 = '<br>Sorry, No details available for this firmware.<p>\n' +
	                       '<br>Did you load some firmware with instruction help?<p>\n' ;
                          $('#' + id_list).html(o1) ;
                          return ;
                    }

                    ws_firmware = ws_firmware.firmware ;
		    if (ws_firmware.length == 0)
                    {
	                  o1 = '<br>Sorry, firmware without help for its instructions.<p>\n' +
	                       '<br>Did you load some firmware with instruction help?<p>\n' ;
                          $('#' + id_list).html(o1) ;
                          return ;
		    }

		    // tables by first letter...
		    var t = {} ;
		    var ins_name = '' ;
		    var ins_help = '' ;
		    var first_l = '' ;
                    var grid = 'col-md-12 col-lg-6 col-xxl-4' ;
                    if (this.layout == "offcanvas") {
                        grid = 'col-xs-12 w-100' ;
                    }

		    for (var k = 0; k < ws_firmware.length; k++)
		    {
			ins_name = ws_firmware[k].signatureRaw.trim() ;
			if (ins_name == "begin") {
			    continue ;
			}

			ins_help = ws_firmware[k].help ;
			if (typeof ins_help === "undefined") {
			    ins_help = '' ;
			}
			ins_help = ins_help.replace(/^'|'$/g,'') ;

			first_l = ins_name[0] ;
			if (typeof t[first_l] === "undefined") {
			    t[first_l] = '' ;
			}
			t[first_l] += '<tr><td col="col-6">' + ins_name + '</td><td>' + ins_help + '</td></tr>' ;
		    }

		    // html holder
		    for (var i=0; i<26; i++)
		    {
			k = String.fromCharCode(97 + i) ;
			if (typeof t[k] === "undefined") {
			    continue ;
			}

			o1 += '<div class="' + grid + ' d-flex justify-content-center my-2 table-responsive">' +
			      '<h4><span class="badge rounded-pill text-bg-info font-monospace" ' +
			      '          style="position:relative;top:16px;left:-4px;">' + k + '</span></h4>' +
			      '<table class="table table-striped table-bordered table-hover table-sm table2">' +
			      '<thead class="thead-dark"><tr><th>Instruction</th><th>Help</th></tr></thead>' +
			      '<tbody>' + t[k] + '</tbody>' +
			      '</table>' +
			      '</div>' ;
		    }

                    // load HTML
                    $('#' + id_list).html(o1) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-help-swset', ws_help_swset) ;
        }

