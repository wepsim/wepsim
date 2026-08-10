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


     import { ws_info } from "../sim_core/sim_adt_core.js";
     import { get_cfg,
              set_cfg,
              save_cfg } from "../sim_core/sim_cfg.js";
     import { i18n_get,
              i18n,
              i18n_update_tags } from "../wepsim_i18n/i18n.js";
     import { wsweb_dialog_close,
              wsweb_select_main } from "../wepsim_web/wepsim_web_api.js";
     import { simcore_ga } from "../sim_core/sim_core_ga.js";


    //  tours collection
    ws_info.tours = {} ;

    //  tour
    export var ws_tour      = null ;
    export var ws_tour_name = "tour1" ;

    // tour API
    export function wepsim_newbie_tour ( tour_name )
    {
             // get newbie tour...
             var newbie_tour1 = ws_info.tours[tour_name] ;
             if (typeof newbie_tour1 === "undefined") {
	         return ;
             }

	     // setup lang
	     var ws_idiom = get_cfg('ws_idiom') ;
             wepsim_newbie_tour_setLang(tour_name, ws_idiom) ;

	     // setup tour
	     ws_tour = introJs.tour() ;

	     ws_tour.setOptions({
                                  steps:              newbie_tour1,
				  keyboardNavigation: true,
				  tooltipClass:       'tooltip-large',
				  showProgress:       true,
				  showStepNumbers:    true,
				  scrollToElement:    true,
                                  nextLabel:          i18n_get('gui', ws_idiom, 'Next'),
                                  prevLabel:          i18n_get('gui', ws_idiom, 'Prev.'),
	                          overlayOpacity:     '0.2'
                               }) ;

	     ws_tour.onbeforechange(function () {
                                        newbie_tour1[this.currentStep()].do_before() ;
	                         }) ;

	     ws_tour.onexit(function () {
			                $("#help1").modal('hide');
				        wsweb_dialog_close('examples');
				        wsweb_dialog_close('config');

					// ws_mode: intro, tutorial, ep, poc, ...
					if (get_cfg('ws_mode') != 'ep') {
					    wsweb_select_main('ep') ;
					}

			                return true ;
	                }) ;

             ws_tour_name = tour_name ;
	     ws_tour.start() ;

	     // stats about ui
             simcore_ga('ui', 'ui.tour', 'ui.tour.newbie') ;
    }

    export function wepsim_newbie_tour_setLang ( tour_name, lang )
    {
             // get newbie tour...
             var newbie_tour1 = ws_info.tours[tour_name] ;
             if (typeof newbie_tour1 === "undefined") {
	         return ;
             }

	     var step = '' ;
	     for (var i=0; i<newbie_tour1.length; i++)
	     {
		  step = newbie_tour1[i].step ;
                  if ("" !== step) {
		      newbie_tour1[i].intro = i18n.eltos.tour_intro[lang][step] ;
                  }
	     }
    }

    export function wepsim_newbie_tour_reload ( lang )
    {
	     // save idiom
             set_cfg('ws_idiom', lang) ;
	     save_cfg() ;

	     // update interface
	     i18n_update_tags('gui') ;

	     //wepsim_newbie_tour(ws_tour_name) ;
    }

