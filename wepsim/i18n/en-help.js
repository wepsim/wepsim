/*
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


    help.en.push({
                     id:          "simulator",
                     title:       "Welcome tutorial",
                     i_type:      "code",
                     u_type:      "tutorial",
                     reference:   "wepsim_close_help(); " + 
                                  "sim_tutorial_showframe('welcome', 0);",
                     description: "Open the welcome tutorial.<br>"
                  });

    help.en.push({
                     id:          "simulator",
                     title:       "Simple usage tutorial",
                     i_type:      "code",
                     u_type:      "tutorial",
                     reference:   "wepsim_close_help(); " + 
                                  "sim_tutorial_showframe('simpleusage', 0);",
                     description: "Open the simple usage tutorial, for microprogramming and assembly programming.<br>"
                  });

    help.en.push({
                     id:          "simulator",
                     title:       "Simulator: firmware",
                     i_type:      "relative",
                     u_type:      "simulator",
                     reference:   "#help_simulator_firmware",
                     description: "How to work with the firmware to be loaded into the control memory.<br>"
                  });

    help.en.push({
                     id:          "microcode",
                     title:       "Microcode format",
                     i_type:      "relative",
                     u_type:      "simulator",
                     reference:   "#help_firmware_format",
                     description: "Syntax of the microcode used.<br>"
                  });

    help.en.push({
                     id:          "simulator",
                     title:       "Simulator: assembly",
                     i_type:      "relative",
                     u_type:      "simulator",
                     reference:   "#help_simulator_assembly",
                     description: "How to work with the assembly that use the aforementioned firmware.<br>"
                  });

    help.en.push({
                     id:          "assembly",
                     title:       "Assembly format",
                     i_type:      "relative",
                     u_type:      "simulator",
                     reference:   "#help_assembly_format",
                     description: "Syntax of the assembly elements.<br>"
                  });

    help.en.push({
                     id:          "simulator",
                     title:       "Simulator: execution",
                     i_type:      "relative",
                     u_type:      "simulator",
                     reference:   "#help_simulator_execution",
                     description: "How the simulator can execute the assembly and firmware.<br>"
                  });

    help.en.push({
                     id:          "architecture",
                     title:       "Simulated architecture",
                     i_type:      "absolute",
                     u_type:      "elemental processor",
                     reference:   "ep/ep",
                     description: "Description of the elemental processor architecture.<br>"
                  });

    help.en.push({
                     id:          "architecture",
                     title:       "Simulated signals",
                     i_type:      "absolute",
                     u_type:      "elemental processor",
                     reference:   "ep/signals",
                     description: "Main signals summary of the simulated elemental processor.<br>"
                  });

    help.en.push({
                     id:          "architecture",
                     title:       "Hardware summary",
                     i_type:      "code",
                     u_type:      "elemental processor",
                     reference:   "wepsim_open_help_content(\'<object id=svg_p2 data=\\'./images/ep/cpu6.svg?time=20180108\\' type=image/svg+xml>Your browser does not support SVG</object>\');",
                     description: "Reference card for the simulated elemental processor hardware.<br>"
                  });

/*
    help.en.push({
                     id:          "simulator",
                     title:       "Signal dependencies",
                     i_type:      "code",
                     u_type:      "info",
                     reference:   "wepsim_open_help_content('<div id=\\'depgraph1\\' style=\\'height:70vh;\\'>Loading...</div>'); " +
                                  "show_visgraph(jit_fire_dep, jit_fire_order);",
                     description: "Graph of the signal dependencies (it needs several seconds to be displayed).<br>"
                  });
*/

    help.en.push({
                     id:          "about",
                     title:       "License, platforms, etc.",
                     i_type:      "absolute",
                     u_type:      "info",
                     reference:   "about",
                     description: "WepSIM license, supported platforms, technologies used.<br>"
                  });

    help.en.push({
                     id:          "authors",
                     title:       "Authors",
                     i_type:      "code",
                     u_type:      "info",
                     reference:   "wepsim_close_help(); $('#about2').modal(open);",
                     description: "Authors of WepSIM.<br>"
                  });

