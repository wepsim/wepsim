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


    var ws_help = [] ;

    ws_help.push({
                     id:          "simulator",
                     title:       "<span data-langkey='Welcome tutorial'>Welcome tutorial</span>",
                     i_type:      "code",
                     u_type:      "tutorial",
                     reference:   "wepsim_close_help(); " + 
                                  "sim_tutorial_showframe('welcome', 0);",
                     description: "<span data-langkey='help_01_01'>Open the welcome tutorial</span>.<br>"
                  });

    ws_help.push({
                     id:          "simulator",
                     title:       "<span data-langkey='Simple usage tutorial'>Simple usage tutorial</span>",
                     i_type:      "code",
                     u_type:      "tutorial",
                     reference:   "wepsim_close_help(); " + 
                                  "sim_tutorial_showframe('simpleusage', 0);",
                     description: "<span data-langkey='help_01_02'>Open the simple usage tutorial, for microprogramming and assembly programming</span>.<br>"
                  });

    ws_help.push({
                     id:          "simulator",
                     title:       "<span data-langkey='Simulation in WepSIM'>Simulation in WepSIM</span>",
                     i_type:      "code",
                     u_type:      "tutorial",
                     reference:   "wepsim_close_help(); " + 
	                          "wsweb_recordbar_show();" +
	                          "var obj_uri = { name: '/wepsim/examples/checkpoint/tutorial_2.txt' }; " +
	                          "wepsim_load_from_url(obj_uri.name, " +
                                  "                     function(data_text) { " +
                                  "                         var data_obj = JSON.parse(data_text); " +
                                  "                         wepsim_checkpoint_loadFromObj(data_obj, 'FileNameToSaveAs1', 'tagToSave1', obj_uri); " +
                                  "                     });",
                     description: "<span data-langkey='help_01_03'>Simple tutorial, executing microcode and assembly code</span>.<br>"
                  });

    ws_help.push({
                     id:          "simulator",
                     title:       "<span data-langkey='Simulator: firmware'>Simulator: firmware</span>",
                     i_type:      "relative",
                     u_type:      "simulator",
                     reference:   "simulator#help_simulator_firmware",
                     description: "<span data-langkey='help_02_01'>How to work with the firmware to be loaded into the control memory</span>.<br>"
                  });

    ws_help.push({
                     id:          "microcode",
                     title:       "<span data-langkey='Microcode format'>Microcode format</span>",
                     i_type:      "relative",
                     u_type:      "simulator",
                     reference:   "simulator#help_firmware_format",
                     description: "<span data-langkey='help_02_02'>Syntax of the microcode used</span>.<br>"
                  });

    ws_help.push({
                     id:          "simulator",
                     title:       "<span data-langkey='Simulator: assembly'>Simulator: assembly</span>",
                     i_type:      "relative",
                     u_type:      "simulator",
                     reference:   "simulator#help_simulator_assembly",
                     description: "<span data-langkey='help_02_03'>How to work with the assembly that use the aforementioned firmware</span>.<br>"
                  });

    ws_help.push({
                     id:          "assembly",
                     title:       "<span data-langkey='Assembly format'>Assembly format</span>",
                     i_type:      "relative",
                     u_type:      "simulator",
                     reference:   "simulator#help_assembly_format",
                     description: "<span data-langkey='help_02_04'>Syntax of the assembly elements</span>.<br>"
                  });

    ws_help.push({
                     id:          "simulator",
                     title:       "<span data-langkey='Simulator: execution'>Simulator: execution</span>",
                     i_type:      "relative",
                     u_type:      "simulator",
                     reference:   "simulator#help_simulator_execution",
                     description: "<span data-langkey='help_02_05'>How the simulator can execute the assembly and firmware</span>.<br>"
                  });

    ws_help.push({
                     id:          "architecture",
                     title:       "<span data-langkey='Simulated architecture'>Simulated architecture</span>",
                     i_type:      "absolute",
                     u_type:      "simulated processor",
                     reference:   "hardware",
                     description: "<span data-langkey='help_03_01'>Description of the simulated processor architecture</span>.<br>"
                  });

    ws_help.push({
                     id:          "architecture",
                     title:       "<span data-langkey='Simulated signals'>Simulated signals</span>",
                     i_type:      "absolute",
                     u_type:      "simulated processor",
                     reference:   "signals",
                     description: "<span data-langkey='help_03_02'>Main signals summary of the simulated elemental processor</span>.<br>"
                  });

    ws_help.push({
                     id:          "architecture",
                     title:       "<span data-langkey='Hardware summary'>Hardware summary</span>",
                     i_type:      "code",
                     u_type:      "simulated processor",
                     reference:   "var ahw1 = simhw_active().sim_short_name ; " +
                                  "var img1 = 'examples/hardware/' + ahw1 + '/images/cpu.svg?time=20190102' ; " +
                                  "var txt1 = 'Your browser does not support SVG' ;" +
                                  "var lyt1 = '<object id=\\'svg_p2\\' data=\\'' + img1 + '\\' " +
                                  "                    type=\\'image/svg+xml\\'>' + txt1 +  '</object>'; " +
                                  "wepsim_open_help_content(lyt1) ;",
                     description: "<span data-langkey='help_03_03'>Reference card for the simulated elemental processor hardware</span>.<br>"
                  });

    ws_help.push({
                     id:          "about",
                     title:       "<span data-langkey='License, platforms, etc.'>License, platforms, etc.</span>",
                     i_type:      "relative",
                     u_type:      "info",
                     reference:   "about#help_about",
                     description: "<span data-langkey='help_04_01'>WepSIM license, supported platforms, technologies used</span>.<br>"
                  });

    ws_help.push({
                     id:          "authors",
                     title:       "<span data-langkey='Authors'>Authors</span>",
                     i_type:      "code",
                     u_type:      "info",
                     reference:   "wepsim_close_help();" + 
	                          "$('#about2').modal('show');",
                     description: "<span data-langkey='help_04_02'>Authors of WepSIM</span>.<br>"
                  });

