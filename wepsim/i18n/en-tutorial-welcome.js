/*
 *  Copyright 2015-2018 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "Welcome to the WepSIM simulator!",
                     message:     "<center><img alt='wepsim screenshot' src='help/simulator/simulator012.jpg' style='max-width:100%; max-height:40vh;'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "WepSIM allows students and teacher to define the instruction set, " + 
                                  "and create any assembly program using the defined instruction set. " + 
                                  "Because WepSIM is visual, and integrates interruptions, system call, " + 
                                  "and exceptions, we really believe WepSIM is a revolutionary teaching tool. " + 
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "Welcome to the WepSIM simulator!",
                     message:     "<center><img alt='wepsim screenshot' src='help/simulator/simulator012.jpg' style='max-width:100%; max-height:40vh;'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "This brief tutorial is going to show you how to:" +
                                  "<ol>" +
                                  "<li>Load an example.</li>" +
                                  "<li>Execute an example.</li>" +
                                  "<li>Configure the simulation.</li>" +
                                  "<li>Get help.</li>" +
                                  "</ol>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "How to load some example.",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/example_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Click in the 'example' button, then click in the example 'title' name.<br>" +
                                  "Then the example for microcode and assembly is loaded and microcompiled and compiled.<br>" +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "How to execute an example.",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/simulation_xinstruction.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Click on next instruction/microinstruction to execute step by step. <br>" + 
		                  "Click on run button to execute until the first breakpoint or the end of the assembly program." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "How to configure WepSIM.",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/config_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Click in the 'configuration' button and users are able to customize different parts of WepSIM." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "How to get the basic help.",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/help_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Please click in the green 'help' button to reach the help dialog.<br>" +
                                  "You are able to switch idiom (Spanish/English), go to the help index, or close the help dialog." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "Welcome to WepSIM!",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/help_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "<br>" +
                                  "Please explorer the help sections for more information. <br>" + 
                                  "If you click on the end button of this tutorial, WepSIM is going to load the first example for you. Enjoy!" + 
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() {  },
                     code_post:   function() {
                                      load_from_example_firmware("ep:S1E1", true);
                                  },
                     wait_next:   100
                  });

