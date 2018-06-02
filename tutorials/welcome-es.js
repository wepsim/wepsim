
    tutorials.welcome.es = [] ;

    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "¡Bienvenidos al simulador WepSIM!",
                     message:     "<img src='help/simulator/simulator012.jpg' style='width:auto; max-height:50vh'>" +
                                  "<p>" +
                                  "<h5>" +
                                  "WepSIM permite a estudiantes y profesores definir un juego de instrucciones, " + 
                                  "y crear cualquier programa de ensamblador que use dicho juego de instrucciones. " + 
                                  "Dado que WepSIM es visual, e integra interrupciones, llamadas al sistema, etc." + 
                                  "nosotros realmente creemos que WepSIM es una herramienta revolucionaria. " + 
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "¡Bienvenidos al simulador WepSIM!",
                     message:     "<img src='help/simulator/simulator012.jpg' style='width:auto; max-height:50vh'>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Este breve tutorial le mostrar&aacute;:" +
                                  "<ol>" +
                                  "<li>Carga de un ejemplo.</li>" +
                                  "<li>Ejecución de ejemplo.</li>" +
                                  "<li>Configuraci&oacute;n del simulador.</li>" +
                                  "<li>Obtener ayuda.</li>" +
                                  "</ol>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "C&oacute;mo cargar algunos ejemplos.",
                     message:     "<img src='tutorials/welcome/example_usage.gif' style='width:auto; max-height:60vh'>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Haga click en el bot&oacute;n de men&uacute y a continuaci&oacute;n en el bot&oacute;n de ejemplo, finalmente haga click en el 't&iacute;tulo' del ejemplo." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "C&oacute;mo cargar algunos ejemplos.",
                     message:     "<img src='tutorials/welcome/simulation_xinstruction.gif' style='width:auto; max-height:60vh'>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Haga click en next instruction/microinstruction para ejecutar paso a paso. <br>" + 
		                  "Haga click en run para ejecutar hasta el primer punto de ruptura o el fin del programa en ensamblador." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "C&oacute;mo configurar WepSIM.",
                     message:     "<img src='tutorials/welcome/config_usage.gif' style='width:auto; max-height:60vh'>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Haga click en el men&uacute; de nuevo y a continuaci&oacute;n en el bot&oacute;n de configuraci&oacute;n." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "C&oacute;mo conseguir la ayuda b&aacute;sica.",
                     message:     "<img src='tutorials/welcome/help_usage.gif' style='width:auto; max-height:60vh'>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Haga click en el men&uacute; otra vez, y a continuaci&oacute;n en el bot&oacute;n verde de ayuda.<br>" +
                                  "Puede obtener la versi&oacute;n Spanish/English, ir al &iacute;ndice de la ayuda o cerrar la pantalla de ayuda." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "¡Bienvenido a WepSIM!",
                     message:     "<img src='tutorials/welcome/help_usage.gif' style='width:auto; max-height:60vh'>" +
                                  "<p>" +
                                  "<h5>" +
                                  "<br>" +
                                  "Por favor explorer las secciones de la ayuda para m&aacute;s informaci&oacute;n. <br>" + 
                                  "Si hace click en el bot&oacute;n 'end' del tutorial entonces WepSIM cargar&aacute; el primer ejemplo por usted. ¡Diviertase aprendiendo!" + 
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() {  },
                     code_post:   function() {
                                      load_from_example_firmware("S1E1", true);
                                  },
                     wait_next:   100
                  });

