
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
                     title:       "Uso del simulador",
                     i_type:      "relative",
                     u_type:      "manual",
                     reference:   "#help_simulator_screens",
                     description: "Descripción de cómo funciona el simulador.<br>"
                  });

    help.es.push({
                     id:          "microcode",
                     title:       "Formato del microcódigo",
                     i_type:      "relative",
                     u_type:      "manual",
                     reference:   "#help_firmware_format",
                     description: "Sintáxis del microcódigo usado.<br>"
                  });

    help.es.push({
                     id:          "assembly",
                     title:       "Formato del ensamblador",
                     i_type:      "relative",
                     u_type:      "manual",
                     reference:   "#help_assembly_format",
                     description: "Sintáxis del ensamblador.<br>"
                  });

    help.es.push({
                     id:          "architecture",
                     title:       "Arquitectura del simulador",
                     i_type:      "relative",
                     u_type:      "manual",
                     reference:   "#help_simulator_arch",
                     description: "Descripción de la arquitectura del procesador elemental.<br>"
                  });

    help.es.push({
                     id:          "architecture",
                     title:       "Señales simuladas",
                     i_type:      "absolute",
                     u_type:      "manual",
                     reference:   "signals",
                     description: "Resumen de las señales principales del procesador elemental.<br>"
                  });

    help.es.push({
                     id:          "architecture",
                     title:       "Resumen del Hardware",
                     i_type:      "code",
                     u_type:      "manual",
                     reference:   "wepsim_open_help_content(\'<object id=svg_p2 data=\\'sim_hw/sim_hw_ep/cpu6.svg?time=20180108\\' type=image/svg+xml>Your browser does not support SVG</object>\');",
                     description: "Resumen del hardware del procesador elemental simulado.<br>"
                  });

    help.es.push({
                     id:          "simulator",
                     title:       "Dependencias entre señales",
                     i_type:      "code",
                     u_type:      "info",
                     reference:   "wepsim_open_help_content(\'<div id=depgraph1>...</div>\'); " +
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

