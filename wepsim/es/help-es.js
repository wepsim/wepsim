
        help.es = [] ;

    help.es.push({
                     id:          "simulator",
                     title:       "Tutorial de bienvenida",
                     i_type:      "code",
                     u_type:      "tutorial",
                     reference:   "wepsim_close_help(); " + 
                                  "sim_tutorial_showframe('welcome', 0);",
                     description: "Tutorial de bienvenida.<br>"
                  });

    help.es.push({
                     id:          "simulator",
                     title:       "Tutorial simple de uso",
                     i_type:      "code",
                     u_type:      "tutorial",
                     reference:   "wepsim_close_help(); " + 
                                  "sim_tutorial_showframe('simpleusage', 0);",
                     description: "Tutorial de uso simple, ejemplo básico para microprogramar y programar en ensamblador.<br>"
                  });

    help.es.push({
                     id:          "simulator",
                     title:       "Simulador: microc&oacute;digo",
                     i_type:      "relative",
                     u_type:      "simulador",
                     reference:   "#help_simulator_firmware",
                     description: "Descripción de cómo trabajar en el simulador con el microc&oacute;digo.<br>"
                  });

    help.es.push({
                     id:          "microcode",
                     title:       "Formato del microcódigo",
                     i_type:      "relative",
                     u_type:      "simulador",
                     reference:   "#help_firmware_format",
                     description: "Sintáxis del microcódigo usado.<br>"
                  });

    help.es.push({
                     id:          "simulator",
                     title:       "Simulador: ensamblador",
                     i_type:      "relative",
                     u_type:      "simulador",
                     reference:   "#help_simulator_assembly",
                     description: "Descripción de cómo trabajar en el simulador con el ensamblador.<br>"
                  });

    help.es.push({
                     id:          "assembly",
                     title:       "Formato del ensamblador",
                     i_type:      "relative",
                     u_type:      "simulador",
                     reference:   "#help_assembly_format",
                     description: "Sintáxis del ensamblador.<br>"
                  });

    help.es.push({
                     id:          "simulator",
                     title:       "Simulador: ejecuci&oacute;n",
                     i_type:      "relative",
                     u_type:      "simulador",
                     reference:   "#help_simulator_execution",
                     description: "Descripción de cómo ejecutar en el simulador el ensamblador y microc&oacute;digo.<br>"
                  });

    help.es.push({
                     id:          "architecture",
                     title:       "Arquitectura del simulador",
                     i_type:      "absolute",
                     u_type:      "procesador elemental",
                     reference:   "ep/ep",
                     description: "Descripción de la arquitectura del procesador elemental.<br>"
                  });

    help.es.push({
                     id:          "architecture",
                     title:       "Señales simuladas",
                     i_type:      "absolute",
                     u_type:      "procesador elemental",
                     reference:   "ep/signals",
                     description: "Resumen de las señales principales del procesador elemental.<br>"
                  });

    help.es.push({
                     id:          "architecture",
                     title:       "Resumen del Hardware",
                     i_type:      "code",
                     u_type:      "procesador elemental",
                     reference:   "wepsim_open_help_content(\'<object id=svg_p2 data=\\'./images/ep/cpu6.svg?time=20180108\\' type=image/svg+xml>Your browser does not support SVG</object>\');",
                     description: "Resumen del hardware del procesador elemental simulado.<br>"
                  });

    help.es.push({
                     id:          "simulator",
                     title:       "Dependencias entre señales",
                     i_type:      "code",
                     u_type:      "info",
                     reference:   "wepsim_open_help_content('<div id=\\'depgraph1\\' style=\\'height:70vh;\\'>Cargando...</div>'); " +
                                  "show_visgraph(jit_fire_dep, jit_fire_order);",
                     description: "Gráfico de las dependencias entre señales (puede necesitar varios segundos para generarse).<br>"
                  });

    help.es.push({
                     id:          "about",
                     title:       "Licencia, plataformas, etc.",
                     i_type:      "absolute",
                     u_type:      "info",
                     reference:   "about",
                     description: "Licencia de WepSIM, plataformas disponibles, tecnologías usadas.<br>"
                  });

    help.es.push({
                     id:          "authors",
                     title:       "Authors",
                     i_type:      "code",
                     u_type:      "info",
                     reference:   "wepsim_close_help(); $('#about2').modal(open);",
                     description: "Autores de WepSIM.<br>"
                  });

