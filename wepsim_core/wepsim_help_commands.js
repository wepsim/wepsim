/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    ws_info.help = [
                       {
                          id:          "simulator",
                          title:       "Execute example",
                          u_type:      "tutorial",
                          u_class:     "",
                          reference:   "wsweb_dialog_close('help'); " +
     				       "wsweb_recordbar_show(); " +
     			               "wepsim_checkpoint_loadExample('tutorial_2.txt') ; " +
     			               "setTimeout(wsweb_record_play, 1000);",
                          description: "<span data-langkey='help_01_03'>Play the execute example tutorial</span>.<br>"
                       },
                       {
                          id:          "simulator",
                          title:       "Welcome tutorial",
                          u_type:      "tutorial",
                          u_class:     "",
                          reference:   "wsweb_dialog_close('help'); " +
                                       "sim_tutorial_showframe('welcome', 0);",
                          description: "<span data-langkey='help_01_01'>Open the welcome tutorial</span>.<br>"
                       },
                       {
                          id:          "simulator",
                          title:       "Simple usage tutorial",
                          u_type:      "tutorial",
                          u_class:     "",
                          reference:   "wsweb_dialog_close('help'); " +
                                       "sim_tutorial_showframe('simpleusage', 0);",
                          description: "<span data-langkey='help_01_02'>Open the simple usage tutorial, for microprogramming and assembly programming</span>.<br>"
                       },
                       {
                          id:          "simulator",
                          title:       "Simulator: firmware",
                          u_type:      "simulator",
                          u_class:     "wsx_microcode",
                          reference:   "wepsim_help_set('relative', 'simulator#help_simulator_firmware');",
                          description: "<span data-langkey='help_02_01'>How to work with the firmware to be loaded into the control memory</span>.<br>"
                       },
                       {
                          id:          "microcode",
                          title:       "Microcode format",
                          u_type:      "simulator",
                          u_class:     "wsx_microcode",
                          reference:   "wepsim_help_set('relative', 'simulator#help_firmware_format');",
                          description: "<span data-langkey='help_02_02'>Syntax of the microcode used</span>.<br>"
                       },
                       {
                          id:          "simulator",
                          title:       "Simulator: assembly",
                          u_type:      "simulator",
                          u_class:     "",
                          reference:   "wepsim_help_set('relative', 'simulator#help_simulator_assembly');",
                          description: "<span data-langkey='help_02_03'>How to work with the assembly that use the aforementioned firmware</span>.<br>"
                       },
                       {
                          id:          "assembly",
                          title:       "Assembly format",
                          u_type:      "simulator",
                          u_class:     "",
                          reference:   "wepsim_help_set('relative', 'simulator#help_assembly_format');",
                          description: "<span data-langkey='help_02_04'>Syntax of the assembly elements</span>.<br>"
                       },
                       {
                          id:          "simulator",
                          title:       "Simulator: execution",
                          u_type:      "simulator",
                          u_class:     "",
                          reference:   "wepsim_help_set('relative', 'simulator#help_simulator_execution');",
                          description: "<span data-langkey='help_02_05'>How the simulator can execute the assembly and firmware</span>.<br>"
                       },
                       {
                          id:          "simulator",
                          title:       "Simulator: states",
                          u_type:      "simulator",
                          u_class:     "",
                          reference:   "wepsim_help_set('relative', 'simulator#help_dumper');",
                          description: "<span data-langkey='help_02_06'>How the simulator can show the current state, and the difference between two states</span>.<br>"
                       },
                       {
                          id:          "architecture",
                          title:       "Simulated architecture",
                          u_type:      "simulated processor",
                          u_class:     "",
                          reference:   "wepsim_help_set('absolute', 'hardware');",
                          description: "<span data-langkey='help_03_01'>Description of the simulated processor architecture</span>.<br>"
                       },
                       {
                          id:          "architecture",
                          title:       "Simulated signals",
                          u_type:      "simulated processor",
                          u_class:     "wsx_microcode",
                          reference:   "wepsim_help_set('absolute', 'signals');",
                          description: "<span data-langkey='help_03_02'>Main signals summary of the simulated elemental processor</span>.<br>"
                       },
                       {
                          id:          "architecture",
                          title:       "Hardware summary",
                          u_type:      "simulated processor",
                          u_class:     "wsx_microcode",
                          reference:   "wepsim_help_set('code', 'hardware_summary');",
                          description: "<span data-langkey='help_03_03'>Reference card for the simulated elemental processor hardware</span>.<br>"
                       },
                       {
                          id:          "architecture",
                          title:       "Assembly summary",
                          u_type:      "simulated processor",
                          u_class:     "",
                          reference:   "wepsim_help_set('code', 'assembly_summary');",
                          description: "<span data-langkey='help_03_04'>Reference card for the simulated elemental processor instruction set</span>.<br>"
                       },
                       {
                          id:          "about",
                          title:       "License, platforms, etc.",
                          u_type:      "info",
                          u_class:     "",
                          reference:   "wepsim_help_set('relative', 'about#help_about');",
                          description: "<span data-langkey='help_04_01'>WepSIM license, supported platforms, technologies used</span>.<br>"
                       },
                       {
                          id:          "authors",
                          title:       "Authors",
                          u_type:      "info",
                          u_class:     "",
                          reference:   "wsweb_dialog_close('help'); " +
     	                               "wsweb_dialog_open('about');",
                          description: "<span data-langkey='help_04_02'>Authors of WepSIM</span>.<br>"
                       }
                   ] ;

