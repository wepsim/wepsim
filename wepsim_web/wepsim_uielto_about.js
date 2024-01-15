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
                    // build HTML
                    var o1  = "<form>" +
			      "" +
			      "	<div class='form-group m-0'>" +
			      "	   <label for='about_license' class='text-secondary'>License:</label>" +
			      "	   <span class='text-primary'" +
			      "                 onclick='wepsim_help_set('relative', 'about#');" +
			      "		                 wsweb_dialog_close('about');" +
			      "			         return false;'>GNU Lesser General Public 3</span>" +
			      "	</div>" +
			      "" +
			      "	<div class='form-group'>" +
			      "	   <label for='about_authors' class='text-secondary'>Authors:</label>" +
			      "	   <div id='about_" + this.name_str + "' " +
                              "         style='overflow:auto; -webkit-overflow-scrolling:touch;' >"+
			      "	     <ul>" +
                              "      <li>Felix Garcia Carballeira</li>" +
                              "      <li>Javier Prieto Cepeda</li>" +
                              "      <li>Saul Alonso Monsalve</li>" +
                              "      <li>Juan Banga Pardo</li>" +
                              "      <li>Alejandro Calderon Mateos</li>" +
			      "	     </ul>" +
			      "	   </div>" +
			      "	</div>" +
			      "" +
			      '    <div class="mx-auto mt-3 bg-white rounded">' +
			      '       <div class="row mx-auto">' +
			      '          <span class="col me-auto" style="max-height:8vh">' +
                              '<img alt="ARCOS group logo" ' +
                              '     src="images/arcos.svg" class="img-fluid rounded   m-0 p-1 h-100" /></span>' +
			      '          <span class="col me-auto" style="max-height:8vh">' +
                              '<img alt="Computer Science and Engineering Departament logo" ' +
                              '     src="images/dptoinf.png" class="img-fluid rounded m-0 p-0 h-100" /></span>' +
			      '       </div>' +
			      '    </div>' +
			      "" +
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
                             '     class="card-desk row mx-auto">' +
			     '<div v-for="author in authors" class="card bg-tertiary text-center col p-0">' +
			     '  <img class="card-img-top img-fluid shadow no-dark-mode" ' +
                             '       v-bind:id="authors.c_id"' +
                             '       v-bind:src="author.i_src" v-bind:alt="author.i_alt" />' +
			     '  <div class="card-body pt-2 pb-1 px-0">' +
                             '       <a class="btn p-0 text-primary d-md-none text-vertical-lr "' +
                             '          v-bind:id="author.a_id">{{ author.i_alt }}</a>' +
                             '       <a class="btn p-0 text-primary d-none d-md-block"' +
                             '          v-bind:id="author.a_id">{{ author.i_alt }}</a>' +
                             '  </div>' +
			     '  <div class="card-footer p-0 collapse collapse7 show bg-secundary text-start">' +
			     '	  <div class="list-group list-group-flush">' +
		             '<component v-for="social in author.socials" ' +
                             '           :is="social.href?\'a\':\'span\'" v-bind:href="social.href || \'\'" ' +
                             '           target="_blank" ' +
                             '           class="list-group-item p-2 mx-auto w-100">' +
                             '<em   v-bind:class="social.faclass"></em>' +
                             '<span class="m-1 d-none d-sm-inline">{{ social.name }}</span>' +
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

