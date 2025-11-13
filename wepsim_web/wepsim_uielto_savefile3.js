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
        class ws_save_file3 extends HTMLElement
        {
              static get observedAttributes()
	      {
	            return [ 'fid', 'jsave1', 'jsave2', 'jlabel1', 'jlabel2', 'jsave3', 'jlabel3' ] ;
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

                    var jlabel1 = this.getAttribute('jlabel1') ;
                    if (jlabel1 === null) {
                        this.setAttribute('jlabel1', 'Save') ;
                    }

                    // jload-2 and jlabel-2
                    var jload2 = this.getAttribute('jload2') ;
                    if (jload2 === null) {
                        this.setAttribute('jload2', '') ;
                    }

                    var jlabel2 = this.getAttribute('jlabel2') ;
                    if (jlabel2 === null) {
                        this.setAttribute('jlabel2', 'Save') ;
                    }

                    // jload-3 and jlabel-3
                    var jload3 = this.getAttribute('jload3') ;
                    if (jload3 === null) {
                        this.setAttribute('jload3', '') ;
                    }

                    var jlabel3 = this.getAttribute('jlabel3') ;
                    if (jlabel3 === null) {
                        this.setAttribute('jlabel3', 'Save') ;
                    }
	      }

	      render ( event_name )
	      {
                    // update attributes
                    this.update_internal_attributes() ;

                    // get html for options...
                    var jsave_array  = [ this.jsave1,  this.jsave2,  this.jsave3  ] ;
                    var jlabel_array = [ this.jlabel1, this.jlabel2, this.jlabel3 ] ;

                    var o1_list   = "" ;
                    var opt_label = "" ;
                    for (var i=0; i<jsave_array.length; i++)
                    {
                       // skip empty javascript-save code
                       if (null == jsave_array[i]) continue ;
                       if (""   == jsave_array[i]) continue ;

                       // add divider in all but last
                       if (o1_list != "")
	               o1_list += "    <div class='dropdown-divider'></div>" ;

                       // add new option element
                       if (0 == i) opt_label = "Default" ;
                       else        opt_label = "Optional " + i ;

		       o1_list += "    <h6 class='dropdown-header'>" + opt_label + ":</h6>" +
                                  "    <a class='dropdown-item' href='#' " +
                                  "       onclick='" + jsave_array[i] + "'><span data-langkey='" + jlabel_array[i] + "'>" +
                                          jlabel_array[i] + "</span></a>" ;
                    }

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
                             o1_list +
		          "  </div>" +
                          "</div>" +
                          "  </h5>" +
                          "</div>" +
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

              // jsave-2 and jlabel-2
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

              // jsave-3 and jlabel-3
	      get jsave3 ( ) {
                   return this.getAttribute('jsave3') ;
	      }

	      set jsave3 ( value ) {
                   this.setAttribute('jsave3', value) ;
	      }

	      get jlabel3 ( ) {
                   return this.getAttribute('jlabel3') ;
	      }

	      set jlabel3 ( value ) {
                   this.setAttribute('jlabel3', value) ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-save-file3', ws_save_file3) ;
        }

