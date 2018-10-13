

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
					set_cfg('ws_mode', 'intro') ;
                                        save_cfg() ;
                                        wepsim_change_mode('intro', '#select4') ;

			                $("#example1").modal('hide'); 
					tour.refresh() ;
			                return true ;
			            }
	                        };

    tour_steps.onexit = function () {
					set_cfg('ws_mode', 'intro') ;
                                        save_cfg() ;
                                        wepsim_change_mode('intro', '#select4') ;
	                        };

    tour_steps.es = [
                        // 0
			{
			   intro: "Parece que es la primera vez en WepSIM, ¡Bienvenido+a!<br>" + 
                                  "Este breve tour le muestra d&oacute;nde pedir ayuda, modificar la configuraci&oacute;n o usar ejemplos."
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
                           intro: "... El cuadro de di&aacute;logo lista ejemplos ordenados por dificultad.<br>" +
                                  "Hay muchos ejemplos muy &uacute;tiles para el aprendizaje incremental.",
			   position: 'auto'
			},
                        // 8
			{
                           intro: "WepSIM le ayudar&aacute; a entender mejor c&oacute;mo funciona un computador.<br>" + 
				  "Desde el panel de 'Ayuda' simpre puede acceder al 'Tutorial de bienvenida', ¡Bienvenida+o!",
			   position: 'auto'
			}
		    ] ;

