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


    //  tour

    function wepsim_newbie_tour ( )
    {
	     // setup lang
	     var ws_idiom = get_cfg('ws_idiom') ;
             wepsim_newbie_tour_setLang(ws_idiom) ;

	     // setup tour
	     tour = introJs() ;

	     tour.setOptions({
                                steps: ws_tour,
				keyboardNavigation: true,
				tooltipClass: "tooltip-large",
				showProgress: true,
	                        overlayOpacity: "0.1"
                             }) ;

	     tour.onbeforechange(function () {
                                        ws_tour[this._currentStep].do_before() ;
	                         }) ;

	     tour.onexit(function () {
			                $("#config2").modal('hide');
			                $("#help1").modal('hide');
				        wsweb_dialog_close('examples');

					// ws_mode: intro, tutorial, ep, poc, ...
					if (get_cfg('ws_mode') != 'ep') {
					    wsweb_select_main('ep') ;
					}

			                return true ;
	                }) ;

	     tour.start() ;

	     // stats about ui
             ga('send', 'event', 'ui', 'ui.tour', 'ui.tour.newbie');
    }

    function wepsim_newbie_tour_setLang ( lang )
    {
	     var step = '' ;
	     for (var i=0; i<ws_tour.length; i++) 
	     {
		  step = ws_tour[i].step ;
                  if ("" !== step) {
		      ws_tour[i].intro = i18n.eltos.tour_intro[lang][step] ;
                  }
	     }
    }

    function wepsim_newbie_tour_reload ( lang )
    {
	     // save idiom
             set_cfg('ws_idiom', lang) ;
	     save_cfg() ;

	     // update interface
	     i18n_update_tags('gui') ;

	     tour.exit() ;
	     wepsim_newbie_tour() ;
    }

