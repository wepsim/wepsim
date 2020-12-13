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
         *  Processors list
         */

        /* jshint esversion: 6 */
        class ws_list_processor extends HTMLElement
        {
              // attributes
              static get observedAttributes() 
	      {
	            return [ 'layout' ] ;
	      }

	      get layout ( )
	      {
                   return this.getAttribute('layout') ;
	      }

	      set layout ( value )
	      {
                   this.setAttribute('layout', value) ;
	      }

              // constructor
	      constructor ()
	      {
		    // parent
		    super();
	      }

              // render
	      render ( elto )
	      {
		    // set an empty list by default
		    this.innerHTML = this.render_skel(elto) ;

		    // set current list
		    var o = this.render_populate(elto) ;
		    if (o != '') {
			$("#list_processors_1").html(o) ;
		    }
	      }

	      connectedCallback ()
	      {
		    this.render(this) ;
	      }

	      attributeChangedCallback (name, oldValue, newValue)
	      {
		    this.render(this) ;
	      }


              // render (helper)
	      render_skel ( elto )
	      {
                    var o1  = '' ;

                    // build HTML
		    o1 += '<div class="card border-secondary h-100">' +
			  '<div class="card-header border-secondary text-white bg-secondary p-1 text-center">' +
			  '<h5 class="py-1 m-0">' +
			  '<em class="fas fa-microchip pr-2"></em>' +
                          '<span data-langkey="Processor">Processor</span>' +
                          '</h5>' +
			  '</div>' +
			  '<div class="card-body" id="list_processors_1"></div>' +
			  '</div>' ;

                    return o1 ;
	      }

	      render_populate ( elto )
	      {
                    var o1  = '' ;

                    // check if exists any processor...
                    var e_hws = simhw_hwset_getSet() ;
                    if (typeof e_hws === "undefined") {
                        return o1 ;
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

                    return o1 ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-list-processor', ws_list_processor) ;
        }

