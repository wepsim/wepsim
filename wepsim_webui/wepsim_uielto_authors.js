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
		 var o1 = '<div id="authors1" class="card-desk row mx-auto" style="max-width:512px;">' +

			  '<div v-for="author in authors" class="card bg-white text-center col-3 p-0">' +
			  '  <img class="card-img-top img-fluid shadow no-dark-mode" v-bind:id="authors.c_id"' +
                          '       v-bind:src="author.i_src" v-bind:alt="author.i_alt" />' +
			  '  <div class="card-body p-3">' +
                          '       <a class="btn p-0 text-primary d-md-none text-vertical-lr "' +
                          '          v-bind:id="author.a_id">{{ author.i_alt }}</a>' +
                          '       <a class="btn p-0 text-primary d-none d-md-block"' +
                          '          v-bind:id="author.a_id">{{ author.i_alt }}</a>' +
                          '  </div>' +
			  '  <div class="card-footer p-1 collapse collapse7 show bg-white text-left">' +
			  '	  <div v-for="social in author.socials" class="list-group list-group-flush">' +
		          '<a class="card-link list-group-item p-1" v-bind:href="social.href">' +
                          '<em v-bind:class="social.faclass"></em><span class="m-1">{{ social.name }}</span>' +
                          '</a>' +
                          '       </div>' +
                          '  </div>' +
			  '</div>' +

			  '</div>' ;

		    this.innerHTML = o1 ;

		    this.vueobj = new Vue({ 
					     el: '#authors1', 
					     data: { authors: ws_info_authors }
					  }) ;
	      }

	      connectedCallback ()
	      {
		    this.render('') ;
	      }
        }

        if (typeof window !== "undefined") {
            window.customElements.define('ws-authors', ws_authors) ;
        }


        // global variable
	var ws_info_authors = [
	          {
                    c_id:    "collapse-author-1",
                    i_src:   "images/author_fgarcia.png",
                    i_alt:   "Félix García Carballeira",
                    a_id:    "fgarcia",
                    a_name:  "F&eacute;lix Garc&iacute;a Carballeira",
                    socials: {
			        lkin:    { name:"linkedin", faclass:"fab fa-linkedin",
                                           href:"" },
			        rgate:   { name:"r-gate", faclass:"fab fa-researchgate",
                                           href:"https://www.researchgate.net/profile/Felix_Garcia-Carballeira" },
			        github:  { name:"github", faclass:"fab fa-github",
                                           href:"" }
	                     }
	          },
	          {
                    c_id:    "collapse-author-2",
                    i_src:   "images/author_acaldero.png",
                    i_alt:   "Alejandro Calderón Mateos",
                    a_id:    "acaldero",
                    a_name:  "Alejandro Calder&oacute;n Mateos",
                    socials: {
			        lkin:    { name: "linkedin", faclass: "fab fa-linkedin",
                                           href:"https://www.linkedin.com/in/alejandro-calderon-mateos/" },
			        rgate:   { name: "r-gate", faclass: "fab fa-researchgate",
                                           href:"https://www.researchgate.net/profile/Alejandro_Calderon2" },
			        github:  { name: "github", faclass: "fab fa-github",
                                           href:"https://github.com/acaldero/" }
	                     }
	          },
	          {
                    c_id:    "collapse-author-3",
                    i_src:   "images/author_jprieto.png",
                    i_alt:   "Javier Prieto Cepeda",
                    a_id:    "jprieto",
                    a_name:  "Javier Prieto Cepeda",
                    socials: {
			        lkin:    { name: "linkedin", faclass: "fab fa-linkedin",
                                           href:"https://www.linkedin.com/in/javier-prieto-cepeda" },
			        rgate:   { name: "r-gate", faclass: "fab fa-researchgate",
                                           href:"" },
			        github:  { name: "github", faclass: "fab fa-github",
                                           href:"" }
	                     }
	          },
	          {
                    c_id:    "collapse-author-4",
                    i_src:   "images/author_salonso.png",
                    i_alt:   "Saúl Alonso Monsalve",
                    a_id:    "salonso",
                    a_name:  "Sa&uacute;l Alonso Monsalve",
                    socials: {
			        lkin:    { name: "linkedin", faclass: "fab fa-linkedin",
                                           href:"https://www.linkedin.com/in/salonsom/" },
			        rgate:   { name: "r-gate", faclass: "fab fa-researchgate",
                                           href:"https://www.researchgate.net/profile/Saul_Alonso_Monsalve" },
			        github:  { name: "github", faclass: "fab fa-github",
                                           href:"https://github.com/saulam/" }
	                     }
	          }
	] ;

