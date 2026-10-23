/*
 *  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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


        import { wsHTMLElement }   from "../wepsim_nodejs/wepsim_node_adapt.js";
        import { ws_uielto,
                 register_uielto } from "./wepsim_uielto.js";


        /*
         *  Save file
         */

        export class ws_save_fileas_option extends wsHTMLElement
        {
              static get observedAttributes()
	      {
	            return [ 'fid', 'jsrc', 'label' ] ;
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
                        this.setAttribute('fid', 'id58') ;
                    }

                    // jsrc and label
                    var jsrc = this.getAttribute('jsrc') ;
                    if (jsrc === null) {
                        this.setAttribute('jsrc', '') ;
                    }

                    var label = this.getAttribute('label') ;
                    if (label === null) {
                        this.setAttribute('label', 'Save') ;
                    }
	      }

	      render ( event_name )
	      {
                    // update attributes
                    this.update_internal_attributes() ;

                    // get html for options...
                    var o1 = "  <a class='dropdown-item' href='#' " +
                             "     onclick='" + this.jsrc + "'><span data-langkey='" + this.label + "'>" +
                                   this.label + "</span></a>" ;

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

              // jsave and label
	      get jsave ( ) {
                   return this.getAttribute('jsave') ;
	      }

	      set jsave ( value ) {
                   this.setAttribute('jsave', value) ;
	      }

	      get label ( ) {
                   return this.getAttribute('label') ;
	      }

	      set label ( value ) {
                   this.setAttribute('label', value) ;
	      }
        }

        register_uielto('ws-save-fileas-option', ws_save_fileas_option) ;


        //
        // ws_save_fileas::ws_save_fileas_option
        //

        export class ws_save_fileas extends HTMLElement
        {
              static get observedAttributes()
	      {
	            return [ 'fid' ] ;
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
	      }

	      render ( event_name )
	      {
                    // update attributes
                    this.update_internal_attributes() ;

                    // get html for options...
                    var eltos = this.querySelectorAll("ws-save-fileas-option") ;

                    var o1_list   = "" ;
                    var opt_label = "" ;
                    var elto_src   = [] ;
                    var elto_label = [] ;
                    for (var i=0; i<eltos.length; i++)
                    {
                       elto_src.push(  eltos[i].getAttribute("jsrc") ) ;
                       elto_label.push(eltos[i].getAttribute("label")) ;

                       // skip empty javascript-save code
                       if (null == elto_src[i]) continue ;
                       if (""   == elto_src[i]) continue ;

                       // add divider in all but last
                       if (o1_list != "")
	                   o1_list += "  <div class='dropdown-divider'></div>" ;

                       // add new option element
                       if (0 == i) opt_label = "<h6 class='dropdown-header'>Default:</h6>" ;
                       else        opt_label = "" ;

		       o1_list += opt_label +
                                  "  <a class='dropdown-item' href='#' " +
                                  "     onclick='" + elto_src[i] + "'><span data-langkey='" + elto_label[i] + "'>" +
                                        elto_label[i] + "</span></a>" ;
                    }

                    // save html
                    var o1 = '' ;
		    o1 += "<div class='card border-secondary h-100'>" +
                          "<div class='card-header border-secondary text-white bg-secondary p-1'>" +
                          "  <h5 class='m-0'>" +
			  "  <span class='text-white bg-secondary' data-langkey='Output file'>Output file</span>" +
                          "  </h5>" +
                          "</div>" +
                          //
		          " <div class='card-body'>" +
			  " <label for='" + this.fid + "' class='collapse7 w-100'>" +
                          "<em>1. <span data-langkey='Please write the file name'>Please write the file name</span>:</em>" +
                          " </label>" +
	                  " <p><input aria-label='filename to save content' id='" + this.fid + "' " +
                          "           class='form-control btn-outline-secondary' " +
                          "           placeholder='File name where information will be saved' " +
                          "           style='min-width: 90%;'/></p>" +
                          "" +
			  " <label for='save_btn' class='collapse7 w-100'>" +
                          "<em>2. <span data-langkey='Please save as file'>Please save as file</span>:</em>" +
                          " </label>" +
                          "<div id='save_btn' class='btn-group float-none dropup w-50'>" +
			  "  <button class='btn bg-body-tertiary border mx-1 float-end w-75' " +
                          "          onclick='" + elto_src[0] + "'><span data-langkey='Save'>Save</span></button>" +
                          "  <button type='button' " +
                          "          class='btn bg-body-tertiary border dropdown-toggle dropdown-toggle-split' " +
                          "          data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                          "    <span class='visually-hidden sr-only'>Toggle Dropdown</span>" +
                          "  </button>" +
                          "  <div class='dropdown-menu'>" +
                             o1_list +
		          "  </div>" +
                          "</div>" +
                          //
                          " </div>" +
                          "</div>" ;

                    this.innerHTML = o1 ;
	      }

	      connectedCallback () {
		    // this.render('connectedCallback') ;
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
        }

        register_uielto('ws-save-fileas', ws_save_fileas) ;

