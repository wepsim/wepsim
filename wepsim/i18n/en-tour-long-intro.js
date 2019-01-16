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


    tour_steps.en = [
                        // 0
			{
			   intro: "Welcome to WepSIM!<br>" +
                                  "WepSIM let users to better understand how a computer works.<br>" +
                                  "This brief tour introduces the interface for the key elements.",
			   do_before: function () {
			                  return true ;
			              }
			},
                        // 1
			{
			   element: '#select4',
                           intro: "This button on the top-right let users choose the 'execution mode'.<br>" +
                                  "Usually it is the hardware to work with (the elemental processor or EP)." +
                                  "But the tutorial mode is recommended at the beginning.",
			   do_before: function ()
	                              {
                                          simui_select_main('ep') ;
					  tour.refresh() ;
			                  return true ;
			              }
			},
                        // 2
			{
			   element: '#btn_cfg1',
                           intro: "On the top-left, the 'configuration' button opens the configuration dialog...",
			   position: 'auto',
			   do_before: function ()
	                              {
					  tour.refresh() ;
			                  return true ;
			              }
			},
                        // 3
			{
                           intro: "... The configuration let users to adapt several aspects of the execution, user interface, preferences, etc.",
			   position: 'auto',
			   do_before: function ()
	                              {
			                $("#btn_cfg1").click();
					tour.refresh() ;
			                return true ;
			              }
			},
                        // 4
			{
			   element: '#btn_help1',
                           intro: "On the top-right, the 'help' button opens the associated dialog...",
			   position: 'auto',
			   do_before: function ()
	                              {
			                $("#config2").modal('hide');
					tour.refresh() ;
			                return true ;
			              }
			},
                        // 5
			{
                           intro: "... The help dialog summary the tutorials, descriptions, information, etc.",
			   position: 'auto',
			   do_before: function ()
	                              {
			                $("#btn_help1").click();
					tour.refresh() ;
			                return true ;
			              }
			},
                        // 6
			{
			   element: '#btn_example1',
                           intro: "And on the left, the 'examples' button open the example dialog...",
			   position: 'auto',
			   do_before: function ()
	                              {
			                $("#help1").modal('hide');
					tour.refresh() ;
			                return true ;
			              }
			},
                        // 7
			{
                           intro: "... The example dialog list several examples ordered by difficulty.<br>" +
                                  "There are many examples that can be used to learn incrementally.",
			   position: 'auto',
			   do_before: function ()
	                              {
			                $("#btn_example1").click();
					tour.refresh() ;
			                return true ;
			              }
			},
                        // 8
			{
			   element: '#example_0',
                           intro: "Please click in the title of the example in order to load its associated microcode and assembly.<br>" +
                                  "You can initially use the example as it, but you can also modify in different ways.",
			   position: 'auto',
			   do_before: function ()
	                              {
					tour.refresh() ;
			                return true ;
			              }
			},
                        // 9
			{
                           intro: "From the 'Help' dialog you can access the 'Welcome tutorial' whenever you need it, welcome!",
			   position: 'auto',
			   do_before: function ()
	                              {
			                $("#example_0").click();
			                $("#example1").modal('hide');
					tour.refresh() ;
			                return true ;
			              }
			}
		    ] ;

