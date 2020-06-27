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
         *  Load file
         */

        /* jshint esversion: 6 */
        class ws_load_file extends HTMLElement
        {
              static get observedAttributes() 
	      {
	            return [ 'fid', 'jload' ] ;
	      }

	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( elto )
	      {
                    var fid    = this.getAttribute('fid') ;
                    var jload  = this.getAttribute('jload') ;
                    var o1  = '' ;

                    // load html
		    o1 += "<div class='card border-secondary h-100'>" +
			  "<div class='card-header border-secondary text-white bg-secondary p-1'>" +
			  " <h5 class='m-0'>" +
			  " <span class='text-white bg-secondary' data-langkey='Input'>Input</span>" +
			  " <button class='btn btn-light mx-1 float-right py-0 col-auto' " +
                          "         onclick='" + jload + "'><span data-langkey='Load'>Load</span></button>" +
			  "  </h5>" +
			  "</div>" +
			  "<div class='card-body'>" +
			  "  <label for='" + fid + "' class='collapse7'><em><span data-langkey='Load from this File'>Load from this File</span>:</em></label>" +
	                  "  <p><input aria-label='file to load' data-max-height='20vh' " +
                          "            type='file' id='" + fid + "' class='dropify'/></p>" +
			  "</div>" +
			  "</div>" ;

                    this.innerHTML = o1 ;

                    // initialize sub-components
                    $('.dropify').dropify() ;
	      }

	      connectedCallback ()
	      {
		    this.render(this) ;
	      }

	      attributeChangedCallback (name, oldValue, newValue)
	      {
		    this.render(this) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-load-file', ws_load_file) ;
        }

