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
         *  Authors
         */

        /* jshint esversion: 6 */
        class ws_authors extends HTMLElement
        {
	      constructor ()
	      {
		    // parent
		    super();
	      }

	      render ( msg_default )
	      {
		    // html holder
		 var o1 = '<div class="card-desk row"' +
                          '     style="max-width:512px;">' +
			  '      <div class="card bg-white text-center col-3 p-0">' +
			  '        <img class="card-img-top img-fluid shadow no-dark-mode" id="collapse-author-1"' +
                          '             src="images/author_fgarcia.png" alt="Felix Garcia Carballeira" />' +
			  '        <div class="card-body p-3">' +
                          '          <a class="btn text-vertical-lr p-0 text-primary"' +
                          '             id="fgarcia">F&eacute;lix Garc&iacute;a Carballeira</a>' +
                          '        </div>' +
			  '        <div id="cf-fgarcia" class="card-footer p-1 collapse cf-all bg-white text-left">' +
			  '	  <div class="list-group list-group-flush">' +
		          '          <a class="card-link list-group-item p-1"' +
                          '             ><span class="fab fa-linkedin"></span> linkedin</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             href="https://www.researchgate.net/profile/Felix_Garcia-Carballeira"><span class="fab fa-researchgate"></span> r-gate</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             ><span class="fab fa-github"></span> github</a>' +
                          '          </div>' +
                          '        </div>' +
			  '      </div>' +
                          '' +
			  '      <div class="card bg-white text-center col-3 p-0">' +
			  '        <img class="card-img-top img-fluid shadow no-dark-mode" id="collapse-author-2"' +
                          '             src="images/author_acaldero.png" alt="Alejandro Calder&oacute;n Mateos" />' +
			  '        <div class="card-body p-3">' +
                          '          <a class="btn text-vertical-lr p-0 text-primary"' +
                          '             id="acaldero">Alejandro Calder&oacute;n Mateos</a>' +
                          '        </div>' +
			  '        <div id="cf-acaldero" class="card-footer p-1 collapse cf-all bg-white text-left">' +
			  '	  <div class="list-group list-group-flush">' +
		          '          <a class="card-link list-group-item p-1"' +
                          '             href="https://www.linkedin.com/in/alejandro-calderon-mateos/"><span class="fab fa-linkedin"></span> linkedin</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             href="https://www.researchgate.net/profile/Alejandro_Calderon2"><span class="fab fa-researchgate"></span> r-gate</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             href="https://github.com/acaldero/"><span class="fab fa-github"></span> github</a>' +
                          '          </div>' +
                          '        </div>' +
			  '      </div>' +
                          '' +
			  '      <div class="card bg-white text-center col-3 p-0">' +
			  '        <img class="card-img-top img-fluid shadow no-dark-mode" id="collapse-author-3"' +
                          '             src="images/author_jprieto.png" alt="Javier Prieto Cepeda" />' +
			  '        <div class="card-body p-3">' +
                          '          <a class="btn text-vertical-lr p-0 text-primary"' +
                          '             id="jprieto">Javier Prieto Cepeda</a>' +
                          '        </div>' +
			  '        <div id="cf-jprieto" class="card-footer p-1 collapse cf-all bg-white text-left">' +
			  '	  <div class="list-group list-group-flush">' +
		          '          <a class="card-link list-group-item p-1"' +
                          '             href="https://www.linkedin.com/in/javier-prieto-cepeda"><span class="fab fa-linkedin"></span> linkedin</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             ><span class="fab fa-researchgate"></span> r-gate</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             ><span class="fab fa-github"></span> github</a>' +
                          '          </div>' +
                          '        </div>' +
			  '      </div>' +
                          '' +
			  '      <div class="card bg-white text-center col-3 p-0">' +
			  '        <img class="card-img-top img-fluid shadow no-dark-mode" id="collapse-author-4"' +
                          '             src="images/author_salonso.png" alt="Sa&uacute;l Alonso Monsalve" />' +
			  '        <div class="card-body p-3">' +
                          '          <a class="btn text-vertical-lr p-0 text-primary"' +
                          '             id="salonso">Sa&uacute;l Alonso Monsalve</a>' +
                          '        </div>' +
			  '        <div id="cf-salonso" class="card-footer p-1 collapse cf-all bg-white text-left">' +
			  '	  <div class="list-group list-group-flush">' +
		          '          <a class="card-link list-group-item p-1"' +
                          '             href="https://www.linkedin.com/in/salonsom/"><span class="fab fa-linkedin"></span> linkedin</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             href="https://www.researchgate.net/profile/Saul_Alonso_Monsalve"><span class="fab fa-researchgate"></span> r-gate</a>' +
		          '          <a class="card-link list-group-item p-1 m-0"' +
                          '             href="https://github.com/saulam/"><span class="fab fa-github"></span> github</a>' +
                          '          </div>' +
                          '        </div>' +
			  '      </div>' +
			  '</div>' ;

		    this.innerHTML = o1 ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        window.customElements.define('ws-authors', ws_authors) ;

