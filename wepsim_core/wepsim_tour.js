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


    //  tour

    function wepsim_newbie_tour ( )
    {
         var ti = get_cfg('ws_idiom') ;
	     tour = introJs() ;

	     tour.setOptions({ 
                                steps: tour_steps[ti],
				keyboardNavigation: true,
				showProgress: true,
	                        overlayOpacity: "0.1"
                             }) ;

	     tour.onbeforechange(function () {
                                        tour_steps.en[this._currentStep].do_before() ;
	                         }) ;

	     tour.onexit(function () {
			                $("#config2").modal('hide'); 
			                $("#help1").modal('hide'); 
			                $("#example1").modal('hide'); 

					// ws_mode: intro, tutorial, ep, poc, ...
					if (get_cfg('ws_mode') != 'ep') { 
					    simui_select_main('ep') ;
					}

			                return true ;
	                }) ;

	     tour.start() ;

	     // stats about ui
             ga('send', 'event', 'ui', 'ui.tour', 'ui.tour.newbie');
    }

