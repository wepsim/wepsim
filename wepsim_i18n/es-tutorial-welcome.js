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


    tutorials.welcome.es.push({
                     id:          "welcome",
                     title:       "¡Bienvenidos al simulador WepSIM!",
                     message:     "<center><img alt='wepsim screenshot' src='help/simulator/simulator012.jpg' style='max-width:100%; max-height:40vh;'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Este breve tutorial le mostrar&aacute;:" +
                                  "<ol>" +
                                  "<li><a href='#' onclick='sim_tutorial_goframe(\"welcome\",0,1);'>Carga de un ejemplo.</a></li>" +
                                  "<li><a href='#' onclick='sim_tutorial_goframe(\"welcome\",0,2);'>Ejecución de ejemplo.</a></li>" +
                                  "<li><a href='#' onclick='sim_tutorial_goframe(\"welcome\",0,3);'>Configuraci&oacute;n del simulador.</a></li>" +
                                  "<li><a href='#' onclick='sim_tutorial_goframe(\"welcome\",0,4);'>Obtener ayuda.</a></li>" +
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

