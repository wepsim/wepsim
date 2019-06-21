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

    var i18n = {
	          lang:  {
			    en: "English",
			    es: "Espa&ntilde;ol", 
			    kr: "한국어 - Google-translate",
			    hi: "हिन्दी - Google-translate",
			    fr: "Fran&ccedil;ais - Google-translate",
			    pt: "Portugu&ecirc;s - Google-translate",
			    ja: "日本語 - Google-translate",
			    it: "L'italiano - Google-translate",
			 zh_cn: "汉语 - Google-translate",
			    de: "Deutsch - Google-translate"
		         },
	          eltos: { 
                            // main-screen user interface
			    gui: {}, 
			    // configuration dialog
			    cfg: {}, 
			    // examples dialog
			    examples: {}, 
			    // states dialog
			    states: {},
			    // help dialog
			    help: {},
                            // other dialogs-popovers-tooltips
			    dialogs: {},
			    // tutorials
			    tutorial_welcome: {},
			    tutorial_simpleusage: {},
                            // welcome tour
			    tour_intro: {}
		         }
               } ;


    /*
     *  i18n Private Interface
     */

    function i18n_init ( )
    {
	for (var l in i18n.lang) 
	{
	     for (var e in i18n.eltos) 
             {
	          i18n.eltos[e][l] = {} ;
	     }
	}

	return true ;
    }

    i18n_init() ;


    /*
     *  i18n Public Interface
     */

    function i18n_update_tags ( component )
    {
        var ws_idiom = get_cfg('ws_idiom') ;

        i18n_update_tagsFor(component, ws_idiom) ;
    }

    function i18n_update_tagsFor ( component, lang )
    {
        if (typeof i18n.eltos[component] == "undefined") {
	    return ;
	}

	var tags = document.querySelectorAll('span') ;

	Array.from(tags).forEach(function(value, index) {
                         	     var key = value.dataset.langkey ;
                         	     if (i18n.eltos[component][lang][key]) {
                                         value.innerHTML = i18n.eltos[component][lang][key] ;
				     }
                         	 }) ;
    }

    function i18n_get ( component, lang, key )
    {
	if (typeof i18n.eltos[component] === "undefined") {
	    return key ;
	}

	var translation = i18n.eltos[component][lang][key] ;

	if (typeof translation === "undefined") {
	    return key ;
	}

	return translation ;
    }


    function i18n_get_TagFor ( component, key )
    {
        var ws_idiom ;
	try {
           ws_idiom = get_cfg('ws_idiom') ;
	}
	catch (e) {
           ws_idiom = 'en' ;
	}

	var translation = key ;
	if (typeof i18n.eltos[component][ws_idiom][key] !== "undefined") {
	    translation = i18n.eltos[component][ws_idiom][key] ;
	}

	return translation ;
    }

    function i18n_get_dropdown ( components, post_code )
    {
        var o = '' ;

	for (var l in i18n.lang)
	{
           o += ' <a class="dropdown-item" href="#"' +
                '    onclick="set_cfg(\'ws_idiom\',\'' + l + '\'); save_cfg();' ;
	   for (var i=0; i<components.length; i++)
	   {
           o += '             i18n_update_tags(\'' + components[i] + '\', \'' + l + '\') ;' ;
	   }
	   o += post_code ;
           o += '             return false;">' + l.toUpperCase() + '<span class="d-none d-sm-inline-flex">&nbsp;(' + i18n.lang[l] + ')</span>' + 
	        '</a>' ;
	}

	return o ;
    }

    function i18n_get_select ( )
    {
        var o  = " <select name='select7' id='select7' class='form-control form-control-sm custom-select'" +
	         "	     aria-label='idiom for examples and help' " +
	         "	     onchange=\"var opt = $(this).find('option:selected');" +
	         "	 	        var optValue = opt.val();" +
	         "		        update_cfg('ws_idiom', optValue);" +
	         "                    i18n_update_tagsFor('gui', optValue);" +
	         "		        wepsim_open_config_index();\"" +
	         "	     data-native-menu='false'>" ;
	for (var l in i18n.lang)
	{
            o += "	<option value='" + l + "'>" + i18n.lang[l] + "</option>" ;
	}
	o += " </select>" ;

	return o ;
    }

