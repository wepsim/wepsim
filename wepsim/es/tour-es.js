
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
			   intro: "¡Bienvenidos y Bienvenidas a WepSIM!<br>" + 
                                  "Este breve tour introduce los elementos b&acute;sicos de la interfaz."
			},
                        // 1
			{
			   element: '#select4',
                           intro: "En la esquina superior derecha est&aacute; el selector de " + 
                                  "'modo de ejecuci&oacute;n' que permite seleccionar el modo tutorial " + 
                                  " (recomendado para principiantes) o el hardware con el que trabajar."
			},
                        // 2
			{
			   element: '#btn_cfg1',
                           intro: "En la esquina superior izquierda est&aacute; el bot&oacute;n de configuracion que abre el cuadro de di&aacute;logo de la configuraci&oacute;n...",
			   position: 'auto'
			},
                        // 3
			{
			   element: '#config2',
                           intro: "... Con la configuraci&oacute;ón se puede adaptar distintos aspectos de ejecuci&oacute;n, interfaz de usuario/a, preferencias, etc.",
			   position: 'auto'
			},
                        // 4
			{
			   element: '#btn_help1',
                           intro: "En la esquina superior derecha el bot&oacute;n de ayuda abre el panel de ayuda asociado...",
			   position: 'auto'
			},
                        // 5
			{
			   element: '#help1',
                           intro: "... El cuadro de di&aacute;logo permite el acceso a tutoriales, informaci&oacute;n, etc.",
			   position: 'auto'
			},
                        // 6
			{
			   element: '#btn_example1',
                           intro: "Y a la izquierda, el bot&oacute;n de 'ejemplos' abre el panel asociado...",
			   position: 'auto'
			},
                        // 7
			{
			   element: '#example1',
                           intro: "... El cuadro de di&aacute;logo lista ejemplos ordenados por dificultad." +
                                  "Hay muchos ejemplos muy &uacute;tiles para el aprendizaje incremental.",
			   position: 'auto'
			}
		    ] ;

