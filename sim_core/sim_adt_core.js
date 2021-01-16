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
         *  FIRMWARE
         */

        function get_simware ( )
        {
            return simhw_internalState('FIRMWARE') ;
	}

        function set_simware ( preWARE )
        {
            var cf = simhw_internalState('FIRMWARE') ;

            for (var item in preWARE)
            {
	         if (typeof preWARE[item] !== "undefined") {
                     cf[item] = preWARE[item] ;
                 }
            }
	}

        // empty firmware

        ws_empty_firmware = {
                                 // datatypes
				 firmware:            [],
				 mp:                  {},
				 seg:                 {},
				 labels:              {},
				 labels2:             {},
				 labels_firm:         {},
				 registers:           {},
				 pseudoInstructions:  [],
				 stackRegister:       null,

                                 // auxiliar datatypes
				 cihash:              {},
				 cocop_hash:          {},
				 revlabels:           {},
				 revlabels2:          {},
				 revseg:              []
                            } ;


        /*
         *  Registry
         */

	var ws_info = { } ;

        function get_wsinfo ( key )
        {
            return ws_info[key] ;
	}

        function set_wsinfo ( key, value )
        {
            return ws_info[key] = value ;
	}

        // authors

	var wsauthors = [
			  {
			    c_id:    "collapse-author-1",
			    i_src:   "images/author_fgarcia.png",
			    i_alt:   "Félix García Carballeira",
			    a_id:    "fgarcia",
			    a_name:  "F&eacute;lix Garc&iacute;a Carballeira",
			    socials: {
					lkin:    { name:"linkedin", faclass:"fab fa-linkedin", href:"" },
					rgate:   { name:"r-gate", faclass:"fab fa-researchgate",
						   href:"https://www.researchgate.net/profile/Felix_Garcia-Carballeira" },
					github:  { name:"github", faclass:"fab fa-github", href:"" }
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
					rgate:   { name: "r-gate", faclass: "fab fa-researchgate", href:"" },
					github:  { name: "github", faclass: "fab fa-github", href:"" }
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

        set_wsinfo('authors', wsauthors) ;

