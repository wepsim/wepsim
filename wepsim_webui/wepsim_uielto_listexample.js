/*    
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Example list
         */

        /* jshint esversion: 6 */
        class ws_list_example extends ws_uielto
        {
              // constructor
	      constructor ()
	      {
		    // parent
		    super();
	      }

              // render
	      render ( )
	      {
		    super.render(this, '#list_examples_1') ;
	      }

	      render_skel ( )
	      {
                    var o1  = '' ;

                    // build HTML
		    o1 += '<div class="card border-secondary h-100">' +
			  '<div class="card-header border-secondary text-white bg-secondary p-1 text-center">' +
			  '<h5 class="py-1 m-0">' +
			  '<em class="fas fa-stream pr-2"></em>' +
                          '<span data-langkey="Examples">Examples</span>' +
                          '</h5>' +
			  '</div>' +
			  '<div class="card-body" id="list_examples_1"></div>' +
			  '</div>' ;

                    return o1 ;
	      }

	      render_populate ( )
	      {
                    var o1  = '' ;

                    // check if exists any example...
                    var e_exs = wepsim_example_getSet() ;
                    if (typeof e_exs === "undefined") {
                        return o1 ;
                    }

                    // build HTML code
		    o1 += ' <div class="btn-group-vertical w-100" role="group" aria-label="Examples">' ;
		    for (var i in e_exs) 
                    {
			 var ename = e_exs[i].name ;

			 o1 += '<button type="button" ' +
			       '    class="text-danger btn border-secondary m-1 btn-block" ' +
			       '    onclick="wepsim_example_reset() ;' +
			       '	     wepsim_example_load(\'' + e_exs[i].name + '\') ;' +
			       '	     wepsim_notify_success(\'<strong>INFO</strong>\',' +
			       '			           \'Examples list loaded!.\') ;' +
			       '	     return false;">' +
			       '<span data-langkey="' + ename + '">' + ename + '</span>' +
			       '</button>' ;
		    }
		    o1 += '</div>' ;

                    return o1 ;
	      }
        }

        register_uielto('ws-list-example', ws_list_example) ;

