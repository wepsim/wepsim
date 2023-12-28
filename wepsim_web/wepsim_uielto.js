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
         *  wepsim_uielto
         */

        /* jshint esversion: 6 */
        class ws_uielto extends HTMLElement
        {
              // constructor
	      constructor ()
	      {
		    // parent
		    super();

                    // initialize is false
                    this.elto_initialized = 0 ;
	      }

              // render
	      render ( )
	      {
                    // get updated attributes
                    this.update_internal_attributes() ;

		    // set an empty "container" by default
		    //this.innerHTML = '' ;
	      }

	      connectedCallback ()
	      {
                    if (0 == this.elto_initialized)
                    {
		        this.render('connectedCallback') ;
                        this.elto_initialized = 1 ;
                    }
	      }

              attributeChangedCallback (name, oldValue, newValue)
              {
                    if (oldValue != newValue)
                        this.render('attributeChangedCallback') ;
              }

              // attributes
              static get observedAttributes()
	      {
	            return [ 'name', 'layout', 'components', 'icons' ] ;
	      }

              update_internal_attributes ( )
              {
                    // components
                    this.components_str = this.getAttribute('components') ;
                    if (this.components_str === null)
                        this.components_str = '' ;
                    this.components_arr = this.components_str.split(',') ;

                    // icons
                    this.icons_str = this.getAttribute('icons') ;
                    if (this.icons_str === null)
                        this.icons_str = 'no' ;
                    this.icons_str = this.icons_str.toLowerCase() ;

                    // name: based on https://gist.github.com/gordonbrander/2230317
                    this.name_str = this.getAttribute('name') ;
                    if (this.name_str === null)
                        this.name_str = 'id_' + Math.random().toString(36).substr(2, 9);
              }

	      get layout ( )
	      {
                   return this.getAttribute('layout') ;
	      }

	      set layout ( value )
	      {
                   this.setAttribute('layout', value) ;
	      }

	      get components ( )
	      {
                   return this.getAttribute('components') ;
	      }

	      set components ( value )
	      {
                   this.setAttribute('components', value) ;
	      }

	      get name ( )
	      {
                   return this.getAttribute('name') ;
	      }

	      set name ( value )
	      {
                   this.setAttribute('name', value) ;
	      }

	      get icons ( )
	      {
                   return this.getAttribute('icons') ;
	      }

	      set icons ( value )
	      {
                   this.setAttribute('icons', value) ;
	      }
        }


        function register_uielto ( tag_name, obj_ref )
        {
              if (typeof window !== "undefined") {
                  window.customElements.define(tag_name, obj_ref) ;
              }
        }

