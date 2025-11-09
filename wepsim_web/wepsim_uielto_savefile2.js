/*
 *  Copyright 2015-2025 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Save file
         */

        /* jshint esversion: 6 */
        class ws_save_file2 extends HTMLElement
        {
              static get observedAttributes()
	      {
	            return [ 'fid', 'jsave1', 'jsave2', 'jlabel1', 'jlabel2' ] ;
	      }

	      constructor ()
	      {
		    // parent
		    super();
	      }

	      update_internal_attributes ( )
	      {
                    // fid
                    var fid = this.getAttribute('fid') ;
                    if (fid === null) {
                        this.setAttribute('fid', 'id53') ;
                    }

                    // jload-1 and jlabel-1
                    var jload1 = this.getAttribute('jload1') ;
                    if (jload1 === null) {
                        this.setAttribute('jload1', '') ;
                    }

                    var jlabel = this.getAttribute('jlabel') ;
                    if (jlabel === null) {
                        this.setAttribute('jlabel', 'Save') ;
                    }

                    // jload-2 and jlabel-2
                    var jload2 = this.getAttribute('jload2') ;
                    if (jload2 === null) {
                        this.setAttribute('jload2', '') ;
                    }

                    var jlabel = this.getAttribute('jlabel') ;
                    if (jlabel === null) {
                        this.setAttribute('jlabel', 'Save') ;
                    }
	      }

	      render ( event_name )
	      {
                    // update attributes
                    this.update_internal_attributes() ;

                    // save html
                    var o1 = '' ;
		    o1 += "<div class='card border-secondary h-100'>" +
                          "<div class='card-header border-secondary text-white bg-secondary p-1'>" +
                          "  <h5 class='m-0'>" +
			  "  <span class='text-white bg-secondary' data-langkey='Output file'>Output file</span>" +
                          "<div class='btn-group float-end'>" +
			  "  <button class='btn bg-body-tertiary mx-1 float-end py-0 col-auto' " +
                          "          onclick='" + this.jsave1 + "'><span data-langkey='Save'>Save</span></button>" +
                          "  <button type='button' " +
                          "          class='btn bg-body-tertiary dropdown-toggle dropdown-toggle-split btn-sm' " +
                          "          data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                          "    <span class='visually-hidden sr-only'>Toggle Dropdown</span>" +
                          "  </button>" +
                          "  <div class='dropdown-menu'>" +
                          "    <h6 class='dropdown-header'>Default:</h6>" +
                          "    <a class='dropdown-item' href='#' " +
                          "       onclick='" + this.jsave1 + "'><span data-langkey='" + this.jlabel1 + "'>" +
                                  this.jlabel1 + "</span></a>" +
                          "<div class='dropdown-divider'></div>" +
                          "    <h6 class='dropdown-header'>Optional:</h6>" +
                          "    <a class='dropdown-item' href='#' " +
                          "       onclick='" + this.jsave2 + "'><span data-langkey='" + this.jlabel2 + "'>" +
                                  this.jlabel2 + "</span></a>" +
                          "  </div>" +
                          "</div>" +
                          "  </h5>" +
                          "</div>" +
                          "" +
                          " <div class='card-body'>" +
			  " <label for='" + this.fid + "' class='collapse7'>" +
                          "<em><span data-langkey='Please write the file name'>Please write the file name</span>:</em>" +
                          " </label>" +
	                  " <p><input aria-label='filename to save content' id='" + this.fid + "' " +
                          "           class='form-control btn-outline-secondary' " +
                          "           placeholder='File name where information will be saved' " +
                          "           style='min-width: 90%;'/></p>" +
                          " </div>" +
                          "</div>" ;

                    this.innerHTML = o1 ;
	      }

	      connectedCallback () {
		    this.render('connectedCallback') ;
	      }

	      attributeChangedCallback (name, oldValue, newValue) {
		    this.render('attributeChangedCallback') ;
	      }

              // file-id
	      get fid ( ) {
                   return this.getAttribute('fid') ;
	      }

	      set fid ( value ) {
                   this.setAttribute('fid', value) ;
	      }

              // jsave-1 and jlabel-1
	      get jsave1 ( ) {
                   return this.getAttribute('jsave1') ;
	      }

	      set jsave1 ( value ) {
                   this.setAttribute('jsave1', value) ;
	      }

	      get jlabel1 ( ) {
                   return this.getAttribute('jlabel1') ;
	      }

	      set jlabel1 ( value ) {
                   this.setAttribute('jlabel1', value) ;
	      }

              // jsave-1 and jlabel-1
	      get jsave2 ( ) {
                   return this.getAttribute('jsave2') ;
	      }

	      set jsave2 ( value ) {
                   this.setAttribute('jsave2', value) ;
	      }

	      get jlabel2 ( ) {
                   return this.getAttribute('jlabel2') ;
	      }

	      set jlabel2 ( value ) {
                   this.setAttribute('jlabel2', value) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-save-file2', ws_save_file2) ;
        }

