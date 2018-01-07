
var tour_steps = {} ;

    tour_steps.onbeforechange = function () {
	                            if (this._currentStep === 1)
	                            {
			                $("#menu1a").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 3)
	                            {
			                $("#btn_example1").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 4)
	                            {
			                $("#S1E1").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 5)
	                            {
			                $("#nm1").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                            else if (this._currentStep === 6)
	                            {
			                $("#tab24").click(); 
			                $("#ni1").click(); 
					tour.refresh() ;
			                return true ;
			            }
	                        };

    tour_steps.en = [
			{
			   intro: "Welcome to WepSIM!"
			},
			{
			   element: '#menu1a',
                           intro: "The main main: On the top, it let you access to the microcode editor, the assembly editor, and the simulation screen. On the bottom, help, examples, and the configuration dialogs."
			},
			{
			   element: '#btn_example1',
                           intro: "Click in the menu button and then in the example button, then click in the example 'title' name.",
			   position: 'auto'
			},
			{
			   element: '#example1',
			   intro: 'Click in the example you wish to work with. For example, "Instructions"...',
			   position: 'auto'
			},
			{
			   element: '#nm1',
			   intro: 'Click on the next microinstruction to execute at microprogramming level...'
			},
			{
			   element: '#eltos_cpu',
			   intro: 'In the microprogramming space students can follow the microexecution...'
			},
			{
			   element: '#ni1',
			   intro: 'Click on the next instruction to execute at assembly level...'
			},
			{
			   element: '#asm_debugger',
			   intro: 'In the assembly space students are able to follow the execution...'
			},
			{
			   intro: 'Please, check the on-line help for more tutorials. Remember to disable the tutorial mode in the configuration after learning from tutorials'
			}
		    ] ;

