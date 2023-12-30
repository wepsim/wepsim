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


    ws_info.tours.tour1 = [
			     {
				 title:     'WepSIM',
				 intro:     i18n_get_welcome(),
				 step:      '',
				 position:  'auto',
				 do_before: function () {
						  return true ;
					    }
			     },
			     {
				 title:     'WepSIM',
				 intro:     "<span data-langkey='step1'>Step 1</span>",
				 step:      'step1',
				 position:  'auto',
				 do_before: function () {
						  ws_tour.refresh() ;
						  return true ;
					    }
			     },
			     {
				 title:     'WepSIM',
				 element:   '#select4',
				 intro:     "<span data-langkey='step2'>Step 2</span>",
				 step:      'step2',
				 position:  'auto',
				 do_before: function ()
					      {
						  wsweb_select_main('ep') ;
						  ws_tour.refresh() ;
						  return true ;
					      }
			     },
			     {
				 title:     'WepSIM',
				 element:   '#btn_help1',
				 intro:     "<span data-langkey='step3'>Step 3</span>",
				 step:      'step3',
				 position:  'auto',
				 do_before: function ()
					      {
						  ws_tour.refresh() ;
						  return true ;
					      }
			     },
			     {
				 title:     'WepSIM',
				 element:   '#btn_example1',
				 intro:     "<span data-langkey='step4'>Step 4</span>",
				 step:      'step4',
				 position:  'auto',
				 do_before: function ()
					      {
						  ws_tour.refresh() ;
						  return true ;
					      }
			     },
			     {
				 title:     'WepSIM',
				 element:   '#btn_cfg1',
				 intro:     "<span data-langkey='step5'>Step 5</span>",
				 step:      'step5',
				 position:  'auto',
				 do_before: function ()
					      {
						  ws_tour.refresh() ;
						  return true ;
					      }
			     },
			     {
				 title:     'WepSIM',
				 intro:     "<span data-langkey='step6'>Step 6</span>",
				 step:      'step6',
				 position:  'auto',
				 do_before: function ()
					      {
						  ws_tour.refresh() ;
						  return true ;
					      }
			     }
                          ] ;

    ws_info.tours.tour2 = [
			     {
				 title:     'WepSIM',
				 intro:     i18n_get_welcome(),
				 step:      '',
				 position:  'auto',
				 do_before: function () {
						  wsweb_select_main('ep') ;
						  ws_tour.refresh() ;
						  return true ;
					    }
			     },
			     {
				 title:     'WepSIM',
				 element:   '#btn_help1',
				 intro:     "<span data-langkey='step3'>Step 3</span>",
				 step:      'step3',
				 position:  'auto',
				 do_before: function ()
					      {
						  ws_tour.refresh() ;
						  return true ;
					      }
			     },
			     {
				 title:     'WepSIM',
				 element:   '#btn_cfg1',
				 intro:     "<span data-langkey='step5'>Step 5</span>",
				 step:      'step5',
				 position:  'auto',
				 do_before: function ()
					      {
						  ws_tour.refresh() ;
						  return true ;
					      }
			     },
			     {
				 title:     'WepSIM',
				 intro:     "<span data-langkey='step6'>Step 6</span>",
				 step:      'step6',
				 position:  'auto',
				 do_before: function ()
					      {
						  ws_tour.refresh() ;
						  return true ;
					      }
			     }
                          ] ;

