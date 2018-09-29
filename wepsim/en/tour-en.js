
var tour_steps = {} ;

    tour_steps.onbeforechange = function () {
	                            if (this._currentStep === 1)
	                            {
			                $("#select4").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 2)
	                            {
			                $("#select4").click(); 
			                $("#btn_cfg1").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 3)
	                            {
			                $("#config2").modal('hide'); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 4)
	                            {
			                $("#btn_help1").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 5)
	                            {
			                $("#help1").modal('hide'); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 6)
	                            {
			                $("#btn_example1").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 7)
	                            {
			                $("#example1").modal('hide'); 
					tour.refresh() ;
			                return true ;
			            }
	                        };

    tour_steps.en = [
                        // 0
			{
			   intro: "Welcome to WepSIM!<br>" + 
                                  "This initial very brief tour introduces you to the basic UI."
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
			   element: '#config2',
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
			   element: '#help1',
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
			   element: '#example1',
                           intro: "... The example dialog list several examples ordered by difficulty." + 
                                  "There are many examples that can be used to learn incrementally.",
			   position: 'auto'
			}
		    ] ;

