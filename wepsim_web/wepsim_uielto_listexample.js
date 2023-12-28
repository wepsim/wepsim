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
			  '<em class="fas fa-stream pe-2"></em>' +
                          '<span data-langkey="Examples">Examples</span>' +
                          '</h5>' +
			  '</div>' +
			  '<div class="card-body" id="list_examples_' + this.name_str + '">' +
			  '<span>&lt;Empty list&gt;</span>' +
                          '</div>' +
			  '</div>' ;

		    this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
                    var o1  = '' ;

                    // check if exists any example...
                    var e_exs = wepsim_example_getSet() ;
                    if (typeof e_exs === "undefined") {
                        return ;
                    }

                    // build HTML code
		    o1 += '<div class="btn-group-vertical w-100" role="group" aria-label="Examples">' +
			  '<button type="button" ' +
			  '        v-for="ex in examples" ' +
			  '        v-bind:data-name="ex.name" ' +
			  '        class="text-danger btn border-secondary m-1 btn-block" ' +
			  '        onclick="wepsim_example_reset() ;' +
                          '                 var ex_name = this.getAttribute(\'data-name\') ;' +
			  '	            wepsim_example_load(ex_name) ;' +
			  '	            wepsim_notify_success(\'<strong>INFO</strong>\',' +
			  '		    	                  \'Examples list loaded!.\') ;' +
			  '	            return false;">' +
			  '<span :data-langkey="ex.name">{{ ex.name }}</span>' +
			  '</button>' +
		          '</div>' ;

		    $('#list_examples_' + this.name_str).html(o1) ;

		    this.vueobj = new Vue({
					     el: '#list_examples_' + this.name_str,
					     data: { examples: e_exs }
					  }) ;
	      }
        }

        register_uielto('ws-list-example', ws_list_example) ;

