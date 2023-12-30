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
         *  Processors list
         */

        /* jshint esversion: 6 */
        class ws_list_processor extends ws_uielto
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
		    this.render_populate() ;
	      }

	      render_skel ( )
	      {
                    var o1  = '' ;

                    // build HTML
		    o1 += '<div class="card border-secondary h-100">' +
			  '<div class="card-header border-secondary text-white bg-secondary p-1 text-center">' +
			  '<h5 class="py-1 m-0">' +
			  '<em class="fas fa-microchip pe-2"></em>' +
                          '<span data-langkey="Processor">Processor</span>' +
                          '</h5>' +
			  '</div>' +
			  '<div class="card-body" id="list_processors_1"></div>' +
			  '</div>' ;

		    this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
                    var o1  = '' ;

                    // check if exists any processor...
                    var e_hws = simhw_hwset_getSet() ;
                    if (typeof e_hws === "undefined")
                    {
		        $('#list_processors_1').html(o1) ;
                        return ;
                    }

                    // build HTML code
		    o1 += ' <div class="btn-group-vertical w-100" role="group" aria-label="Processor">' ;
		    for (var e_hw in e_hws)
                    {
			 var ename = e_hw.toUpperCase() ;
			 o1 += '<button type="button" ' +
			       '    class="text-danger btn border-secondary m-1 btn-block" ' +
			       '    onclick="wepsim_reload_hw(\'' + e_hw + '\') ;' +
			       '	     wepsim_notify_success(\'<strong>INFO</strong>\', ' +
			       '			          \'' + e_hw +' processor loaded!.\') ;'+
			       '	     return false;">' +
			       '<span data-langkey="' + ename + '">' + ename + '</span>' +
			       '</button>' ;
		    }
		    o1 += '</div>' ;

		    $('#list_processors_1').html(o1) ;
	      }
        }

        register_uielto('ws-list-processor', ws_list_processor) ;

