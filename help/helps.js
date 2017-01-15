
    var helps = new Array();

    helps.push({
                     id:          "simulator",
                     title:       "Simulator usage",
                     type:        "relative",
                     reference:   "#help_simulator_screens",
                     description: "Description of how the simulator works.<br>"
                  });

    helps.push({
                     id:          "microcode",
                     title:       "Microcode format",
                     type:        "relative",
                     reference:   "#help_firmware_format",
                     description: "Syntax of the microcode used.<br>"
                  });

    helps.push({
                     id:          "assembly",
                     title:       "Assembly format",
                     type:        "relative",
                     reference:   "#help_assembly_format",
                     description: "Syntax of the assembly elements.<br>"
                  });

    helps.push({
                     id:          "architecture",
                     title:       "Simulated architecture",
                     type:        "relative",
                     reference:   "#help_simulator_arch",
                     description: "Description of the elemental processor architecture.<br>"
                  });

    helps.push({
                     id:          "architecture",
                     title:       "Simulated signals",
                     type:        "absolute",
                     reference:   "signals",
                     description: "Signals summary of the simulated elemental processor.<br>"
                  });

    helps.push({
                     id:          "architecture",
                     title:       "Hardware summary",
                     type:        "code",
                     reference:   "wepsim_open_help_content(\'<object id=svg_p2 data=\\'images/cpu6.svg?time=20170108\\' type=image/svg+xml>Your browser does not support SVG</object>\');",
                     description: "Reference card for the simulated elemental processor hardware.<br>"
                  });

    helps.push({
                     id:          "simulator",
                     title:       "Signal dependencies",
                     type:        "code",
                     reference:   "wepsim_open_help_content(\'<div id=depgraph1>...</div>\'); " +
                                  "show_visgraph(jit_fire_dep, jit_fire_order);",
                     description: "Graph of the signal dependencies (it needs several seconds to be displayed).<br>"
                  });

    helps.push({
                     id:          "about",
                     title:       "License, platforms, technologies",
                     type:        "absolute",
                     reference:   "about",
                     description: "WepSIM license, supported platforms, technologies used.<br>"
                  });

