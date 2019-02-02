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


    //
    // WepSIM API
    //


    //  Workspaces

    function sim_change_workspace ( page_id, carousel_id )
    {
            if ( (typeof $.mobile                             != "undefined") &&
                 (typeof $.mobile.pageContainer               != "undefined") &&
                 (typeof $.mobile.pageContainer.pagecontainer != "undefined") )
            {
                  $.mobile.pageContainer.pagecontainer('change', page_id);
            }
            else
            {
                  $('#carousel-8').carousel(carousel_id) ;
            }
    }

    function sim_change_workspace_simulator ( )
    {
	    sim_change_workspace('#main1', 0) ;

	    setTimeout(function(){
			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.simulator');
	               }, 50) ;
    }

    function sim_change_workspace_microcode ( )
    {
	    sim_change_workspace('#main3', 1) ;

	    setTimeout(function(){
		            inputfirm.refresh() ; 

			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.microcode');
	               }, 50) ;
    }

    function sim_change_workspace_assembly ( )
    {
	    sim_change_workspace('#main4', 2) ;

	    setTimeout(function(){
		            inputasm.refresh() ; 

			    // stats about ui
			    ga('send', 'event', 'ui', 'ui.workspace', 'ui.workspace.assembly');
	               }, 50) ;
    }


    // Notifications

    function wepsim_notify_success ( ntf_title, ntf_message )
    {
         return simcoreui_notify(ntf_title, ntf_message, 'success', get_cfg('NOTIF_delay')) ;
    }

    function wepsim_notify_error ( ntf_title, ntf_message )
    {
         return simcoreui_notify(ntf_title, ntf_message, 'danger', 0) ;
    }

    function wepsim_notify_warning ( ntf_title, ntf_message )
    {
         return simcoreui_notify(ntf_title, ntf_message, 'warning', get_cfg('NOTIF_delay')) ;
    }

    function wepsim_notify_close ( )
    {
         return simcoreui_notify_close() ;
    }



    function wepsim_newbie_tour ( )
    {
         var ti = get_cfg('ws_idiom') ;
	     tour = introJs() ;

	     tour.setOptions({ steps: tour_steps[ti] }) ;
	     tour.setOption("overlayOpacity", "0.1") ;

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

    function wepsim_change_mode ( optValue )
    {
          var hwid = -1 ;

	  // switch active hardware by name...
          switch (optValue)
          {
	      case 'newbie':
	      case 'intro':
	      case 'wepmips':
	      case 'tutorial':
                               hwid = simhw_getIdByName('ep') ;
                               wepsim_activehw(hwid) ;
                               break;
	      default:
	                       hwid = simhw_getIdByName(optValue) ;
                               wepsim_activehw(hwid) ;
                               break;
          }

	  // show/hide wepmips...
	  if ('wepmips' == optValue)
	       wepsim_show_wepmips() ;
	  else wepsim_hide_wepmips() ;

	  // intro mode...
	  if ('intro' == optValue)
	  {
	      sim_tutorial_showframe('welcome', 0);
              return ;
	  }

	  // newbie mode...
          if ('newbie' == optValue)
          {
              wepsim_newbie_tour() ;
              return ;
          }
    }

