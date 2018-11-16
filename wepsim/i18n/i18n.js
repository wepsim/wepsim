/*
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
     * Initialize...
     */

    // i18n
    var i18n = {} ;
	i18n.gui = {} ;
	i18n.gui.es = {} ;
	i18n.gui.en = {} ;
	i18n.cfg = {} ;
	i18n.cfg.es = {} ;
	i18n.cfg.en = {} ;

    // tutorials
    var tutorials             = {} ;
        tutorials.welcome     = {} ;
        tutorials.simpleusage = {} ;

    // examples
    var examples    = {};
        examples.en = [];
        examples.es = [];

    // help
    var help    = {} ;
        help.en = [] ;
        help.es = [] ;

    // tour
    var tour_steps = {} ;


    /*
     * Initialize...
     */

    // i18n_update_tags('gui',...
    function i18n_update_tags ( component, lang )
    {
        if (typeof i18n[component] == "undefined") {
	    return ;
	}

	var tags = document.querySelectorAll('span') ;

	Array.from(tags).forEach(function(value, index) {
                         	     var key = value.dataset.langkey ;
                         	     if (i18n[component][lang][key]) {
                                         value.innerHTML = i18n[component][lang][key] ;
				     }
                         	 }) ;
    }

