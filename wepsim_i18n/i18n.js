/*
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

    var i18n = {} ;

    // main-screen user interface
	i18n.gui = {} ;
	i18n.gui.es = {} ;
	i18n.gui.en = {} ;

    // configuration dialog
	i18n.cfg = {} ;
	i18n.cfg.es = {} ;
	i18n.cfg.en = {} ;

    // examples dialog
        i18n.examples = {} ;
        i18n.examples.en = {} ;
        i18n.examples.es = {} ;

    // states dialog
	i18n.states = {} ;
	i18n.states.es = {} ;
	i18n.states.en = {} ;

    // help dialog
    var help    = {} ;
        help.en = [] ;
        help.es = [] ;

    // tutorials
    var tutorials = {} ;
        tutorials.welcome = {} ;
        tutorials.welcome.en = [] ;
        tutorials.welcome.es = [] ;
        tutorials.simpleusage = {} ;
        tutorials.simpleusage.en = [] ;
        tutorials.simpleusage.es = [] ;

    // tour
    var tour_steps = {} ;


    /*
     *  i18n Interface
     */

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

    function i18n_get ( component, lang, key )
    {
	return i18n[component][lang][key] ;
    }

