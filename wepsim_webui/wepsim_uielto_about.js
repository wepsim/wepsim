/*    
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  About
         */

        /* jshint esversion: 6 */
        class ws_about extends ws_uielto
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
                    // initialize render elements...
	            super.render() ;

                    // render current element
		    this.render_skel() ;
		    this.render_populate() ;
	      }

	      render_skel ( )
	      {
                    // build HTML
                    var o1  = "<form>" +
			      "	<div class='form-group m-0'>" +
			      "	   <label for='about_license' class='text-secondary'>License:</label>" +
			      "	   <span class='text-primary'" +
			      "                 onclick='wepsim_help_set_relative('about#');" +
			      "                          wepsim_help_refresh();" +
			      "		          wsweb_dialog_close('about');" +
			      "			  return false;'>GNU Lesser General Public 3</span>" +
			      "	</div>" +
			      "	<div class='form-group'>" +
			      "	   <label for='about_authors' class='text-secondary'>Authors:</label>" +
			      "	   <div id='about_" + this.name_str + "'>" +
			      "	     <ul>" +
                              "      <li>Felix Garcia Carballeira</li>" +
                              "      <li>Javier Prieto Cepeda</li>" +
                              "      <li>Saul Alonso Monsalve</li>" +
                              "      <li>Alejandro Calderon Mateos</li>" +
			      "	     </ul>" +
			      "	   </div>" +
			      "	</div>" +
			      "</form>" ;

		    this.innerHTML = o1 ;
	      }

	      render_populate ( )
	      {
                    // check if exists any author list...
                    if ( (typeof ws_info === "undefined") || (typeof ws_info.authors === "undefined") )
                    {
                          return ;
                    }

		    // html holder
		    var o1 = '<div id="authors_' + this.name_str + '" ' +
                             '     class="card-desk row mx-auto" style="max-width:512px;">' +
			     '<div v-for="author in authors" class="card bg-white text-center col-3 p-0">' +
			     '  <img class="card-img-top img-fluid shadow no-dark-mode" ' +
                             '       v-bind:id="authors.c_id"' +
                             '       v-bind:src="author.i_src" v-bind:alt="author.i_alt" />' +
			     '  <div class="card-body p-3">' +
                             '       <a class="btn p-0 text-primary d-md-none text-vertical-lr "' +
                             '          v-bind:id="author.a_id">{{ author.i_alt }}</a>' +
                             '       <a class="btn p-0 text-primary d-none d-md-block"' +
                             '          v-bind:id="author.a_id">{{ author.i_alt }}</a>' +
                             '  </div>' +
			     '  <div class="card-footer p-1 collapse collapse7 show bg-white text-left">' +
			     '	  <div class="list-group list-group-flush">' +
		             '<component v-for="social in author.socials" ' +
                             '           :is="social.href?\'a\':\'span\'" v-bind:href="social.href || \'\'" ' +
                             '           target="_blank" ' +
                             '           class="card-link list-group-item p-1 ml-2">' +
                             '<em v-bind:class="social.faclass"></em><span class="m-1">{{ social.name }}</span>' +
                             '</component>' +
                             '    </div>' +
                             '  </div>' +
			     '</div>' +
			     '</div>' ;

		    $('#about_' + this.name_str).html(o1) ;

		    this.vueobj = new Vue({ 
					     el: '#authors_' + this.name_str, 
					     data: { authors: ws_info.authors }
					  }) ;
	      }
        }

        register_uielto('ws-about', ws_about) ;

