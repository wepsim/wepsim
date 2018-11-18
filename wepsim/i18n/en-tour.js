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


    tour_steps.onbeforechange = function () 
                                {
	                            if (this._currentStep === 1)
	                            {
			                $("#select4").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 2)
	                            {
			                $("#select4").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 3)
	                            {
			                $("#btn_cfg1").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 4)
	                            {
			                $("#config2").modal('hide'); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 5)
	                            {
			                $("#btn_help1").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 6)
	                            {
			                $("#help1").modal('hide'); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 7)
	                            {
			                $("#btn_example1").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 8)
	                            {
			                $("#example1").modal('hide'); 
					tour.refresh() ;
			                return true ;
			            }
	                        };

    tour_steps.onexit = function () {
			                $("#config2").modal('hide'); 
			                $("#help1").modal('hide'); 
			                $("#example1").modal('hide'); 

	                                /*
					if (get_cfg('ws_mode') != 'intro') 
	                                {
					    set_cfg('ws_mode', 'intro') ;
                                            save_cfg() ;
                                            wepsim_change_mode('intro', '#select4') ;
					}
					*/
			                return true ;
	                        };

    tour_steps.en = [
                        // 0
			{
			   intro: "It seems this is the first time on WepSIM, Welcome!<br>" +
                                  "This brief tour introduces the interface for getting help, modifiying the configuration, and using examples."
			},
                        // 1
			{
			   element: '#select4',
                           intro: "On the top-right, the 'execution mode' lets you select the tutorial mode " + 
                                  "(recommended at the beginning) or the hardware to work with."
			},
                        // 2
			{
			   element: '#btn_cfg1',
                           intro: "On the top-left, the 'configuration' button opens the configuration dialog...",
			   position: 'auto'
			},
                        // 3
			{
                           intro: "... The configuration let users to adapt several aspects of the execution, user interface, preferences, etc.",
			   position: 'auto'
			},
                        // 4
			{
			   element: '#btn_help1',
                           intro: "On the top-right, the 'help' button opens the associated dialog...",
			   position: 'auto'
			},
                        // 5
			{
                           intro: "... The help dialog summary the tutorials, descriptions, information, etc.",
			   position: 'auto'
			},
                        // 6
			{
			   element: '#btn_example1',
                           intro: "And on the left, the 'examples' button open the example dialog...",
			   position: 'auto'
			},
                        // 7
			{
                           intro: "... The example dialog list several examples ordered by difficulty.<br>" + 
                                  "There are many examples that can be used to learn incrementally.",
			   position: 'auto'
			},
                        // 8
			{
                           intro: "WepSIM let users to better understand how a computer works.<br>" + 
				  "From the 'Help' dialog you can access the 'Welcome tutorial' whenever you need it, welcome!",
			   position: 'auto'
			}
		    ] ;

