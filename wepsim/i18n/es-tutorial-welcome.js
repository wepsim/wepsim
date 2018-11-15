
    tutorials.welcome.es = [] ;

    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "¡Bienvenidos al simulador WepSIM!",
                     message:     "<center><img alt='wepsim screenshot' src='help/simulator/simulator012.jpg' style='max-width:100%; max-height:40vh;'></center>" +
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
                     message:     "<center><img alt='wepsim screenshot' src='help/simulator/simulator012.jpg' style='max-width:100%; max-height:40vh;'></center>" +
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
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/example_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Haga click en el bot&oacute;n de 'examples' y haga click en el 't&iacute;tulo' del ejemplo que desea cargar." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "C&oacute;mo cargar algunos ejemplos.",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/simulation_xinstruction.gif' style='max-width:100%; max-height:60vh'></center>" +
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
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/config_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Haga click en el bot&oacute;n de configuraci&oacute;n para configurar diversos aspectos de WepSIM para su comididad." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "C&oacute;mo conseguir la ayuda b&aacute;sica.",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/help_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Haga click en el bot&oacute;n verde de ayuda 'help'.<br>" +
                                  "Puede obtener la ayuda en Spanish/English, ir al &iacute;ndice de la ayuda o cerrar la pantalla de ayuda." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "¡Bienvenido a WepSIM!",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/help_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "<br>" +
                                  "Por favor explorer las secciones de la ayuda para m&aacute;s informaci&oacute;n. <br>" + 
                                  "Si hace click en el bot&oacute;n 'end' del tutorial entonces WepSIM cargar&aacute; el primer ejemplo por usted. ¡Diviertase aprendiendo!" + 
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() {  },
                     code_post:   function() {
                                      load_from_example_firmware("ep:S1E1", true);
                                  },
                     wait_next:   100
                  });

