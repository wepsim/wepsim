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
         *  wepsim_uielto
         */

        /* jshint esversion: 6 */
        class ws_uielto extends HTMLElement
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
	      render ( elto, div_id )
	      {
		    // set an empty list by default
		    this.innerHTML = this.render_skel() ;

		    // set current list
		    var o = this.render_populate() ;
		    if (o != '') {
			$(div_id).html(o) ;
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
	      render_skel ( )
	      {
                    return '' ;
	      }

	      render_populate ( )
	      {
                    return '' ;
	      }
        }


        function register_uielto ( tag_name, obj_ref )
        {
              if (typeof window !== "undefined") {
                  window.customElements.define(tag_name, obj_ref) ;
              }
        }

