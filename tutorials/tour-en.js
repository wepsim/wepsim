
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
	                            else if (this._currentStep === 8)
	                            {
			                $("#menu1a").click(); 
			            }
	                        };

    tour_steps.en = [
			{
			   intro: "Welcome to WepSIM!<br> This initial very brief tour will introduce you to execute a example"
			},
			{
			   element: '#menu1a',
                           intro: "On the top-right, the menu lets you access to the microcode editor, the assembly editor, and the simulation screen.<br>On the bottom, help, examples, and the configuration dialogs."
			},
			{
			   element: '#btn_example1',
                           intro: "In order to load some example please click in the menu button, and then in the example button...",
			   position: 'auto'
			},
			{
			   element: '#example1',
			   intro: '... and finally click in the example "title" name you wish to work with. For example, "Instructions".',
			   position: 'auto'
			},
			{
			   element: '#nm1',
			   intro: 'Click on the next microinstruction to execute at microprogramming level...'
			},
			{
			   element: '#eltos_cpu',
			   intro: '... and in the circuit you can follow the how a assembly instruction is "microexecuted".'
			},
			{
			   element: '#ni1',
			   intro: 'Click on the next instruction to execute at assembly level...'
			},
			{
			   element: '#asm_debugger',
			   intro: '... and in the assembly space students can follow the execution of assembly instructions...'
			},
			{
			   element: '#btn_help1',
			   intro: 'Please, check the on-line help for more tutorials.<br>Remember to disable the tutorial mode in the configuration after learning from tutorials'
			}
		    ] ;

