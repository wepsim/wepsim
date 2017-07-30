
    tutorials['welcome']['es'] = new Array() ;

    tutorials['welcome']['es'].push({
                     id:          "welcome",
                     title:       "¡Bienvenidos al simulador WepSIM!",
                     message:     "<img src='help/simulator/simulator012.jpg' style='width:100%; max-height:50vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "Este breve tutorial le mostrar&aacute;:" +
                                  "<ol>" +
                                  "<li>Carga de un ejemplo.</li>" +
                                  "<li>Ejecución de ejemplo.</li>" +
                                  "<li>Configuraci&oacute;n del simulador.</li>" +
                                  "<li>Obtener ayuda.</li>" +
                                  "</ol>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials['welcome']['es'].push({
                     id:          "welcome",
                     title:       "El bot&oacute;n de men&uacute;",
                     message:     "<img src='tutorials/welcome/menu_open.gif' style='max-height:50vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "En la parte superior, le permite acceder a las pantallas de trabajo de microc&oacute;digo, ensamblador, y el simulador. " + 
                                  "En la parte inferior, permite acceder a la ayuda, ejemplos y configuraci&oacute;n." +
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials['welcome']['es'].push({
                     id:          "welcome",
                     title:       "C&oacute;mo cargar algunos ejemplos.",
                     message:     "<img src='tutorials/welcome/example_usage.gif' style='width:100%; max-height:60vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "Haga click en el bot&oacute;n de men&uacute y a continuaci&oacute;n en el bot&oacute;n de ejemplo, finalmente haga click en el 't&iacute;tulo' del ejemplo." +
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials['welcome']['es'].push({
                     id:          "welcome",
                     title:       "C&oacute;mo cargar algunos ejemplos.",
                     message:     "<img src='tutorials/welcome/simulation_xinstruction.gif' style='width:100%; max-height:60vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "Haga click en next instruction/microinstruction para ejecutar paso a paso. <br>" + 
		                  "Haga click en run para ejecutar hasta el primer punto de ruptura o el fin del programa en ensamblador." +
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials['welcome']['es'].push({
                     id:          "welcome",
                     title:       "C&oacute;mo configurar WepSIM.",
                     message:     "<img src='tutorials/welcome/config_usage.gif' style='width:100%; max-height:60vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "Haga click en el men&uacute; de nuevo y a continuaci&oacute;n en el bot&oacute;n de configuraci&oacute;n." +
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials['welcome']['es'].push({
                     id:          "welcome",
                     title:       "C&oacute;mo conseguir la ayuda b&aacute;sica.",
                     message:     "<img src='tutorials/welcome/help_usage.gif' style='width:100%; max-height:60vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "Haga click en el men&uacute; otra vez, y a continuaci&oacute;n en el bot&oacute;n verde de ayuda.<br>" +
                                  "Puede obtener la versi&oacute;n Spanish/English, ir al &iacute;ndice de la ayuda o cerrar la pantalla de ayuda." +
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials['welcome']['es'].push({
                     id:          "welcome",
                     title:       "¡Bienvenido a WepSIM!",
                     message:     "<img src='tutorials/welcome/help_usage.gif' style='width:100%; max-height:60vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "<br>" +
                                  "Por favor explorer las secciones de la ayuda para m&aacute;s informaci&oacute;n. <br>" + 
                                  "Si hace click en el bot&oacute;n 'end' del tutorial entonces WepSIM cargar&aacute; el primer ejemplo por usted. ¡Diviertase aprendiendo!" + 
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() {  },
                     code_post:   function() {
                                      load_from_example_firmware("S1E1", true);
                                  },
                     wait_next:   100
                  });

