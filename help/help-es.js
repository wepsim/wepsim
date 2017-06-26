
        help['es'] = new Array();

    help['es'].push({
                     id:          "simulator",
                     title:       "Uso del simulador",
                     type:        "relative",
                     reference:   "#help_simulator_screens",
                     description: "Descripción de cómo funciona el simulador.<br>"
                  });

    help['es'].push({
                     id:          "microcode",
                     title:       "Formato del microcódigo",
                     type:        "relative",
                     reference:   "#help_firmware_format",
                     description: "Sintáxis del microcódigo usado.<br>"
                  });

    help['es'].push({
                     id:          "assembly",
                     title:       "Formato del ensamblador",
                     type:        "relative",
                     reference:   "#help_assembly_format",
                     description: "Sintáxis del ensamblador.<br>"
                  });

    help['es'].push({
                     id:          "architecture",
                     title:       "Arquitectura del simulador",
                     type:        "relative",
                     reference:   "#help_simulator_arch",
                     description: "Descripción de la arquitectura del procesador elemental.<br>"
                  });

    help['es'].push({
                     id:          "architecture",
                     title:       "Señales simuladas",
                     type:        "absolute",
                     reference:   "signals",
                     description: "Resumen de las señales principales del procesador elemental.<br>"
                  });

    help['es'].push({
                     id:          "architecture",
                     title:       "Resumen del Hardware",
                     type:        "code",
                     reference:   "wepsim_open_help_content(\'<object id=svg_p2 data=\\'images/cpu6.svg?time=20170108\\' type=image/svg+xml>Your browser does not support SVG</object>\');",
                     description: "Resumen del hardware del procesador elemental simulado.<br>"
                  });

    help['es'].push({
                     id:          "simulator",
                     title:       "Dependencias de las señales",
                     type:        "code",
                     reference:   "wepsim_open_help_content(\'<div id=depgraph1>...</div>\'); " +
                                  "show_visgraph(jit_fire_dep, jit_fire_order);",
                     description: "Gráfico de las dependencias entre señales (puede necesitar varios segundos para generarse).<br>"
                  });

    help['es'].push({
                     id:          "about",
                     title:       "Licencia, plataformas, etc.",
                     type:        "absolute",
                     reference:   "about",
                     description: "Licencia de WepSIM, plataformas disponibles, tecnologías usadas.<br>"
                  });

