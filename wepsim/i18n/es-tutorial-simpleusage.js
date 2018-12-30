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


    tutorials.simpleusage.es.push({
                     id:          "simpleusage",
                     title:       "WepSIM: microprogramar, ensamblar y simular",
                     message:     "<center><img alt='wepsim screenshot' src='help/simulator/simulator012.jpg' style='max-max-width:100%; max-height:40vh;'></center>" +
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

    tutorials.simpleusage.es.push({
                     id:        "simpleusage",
                     title:     "WepSIM: microprogramar, ensamblar y simular",
                     message:   "<center><img alt='wepsim screenshot' src='help/simulator/simulator011.jpg' style='max-width:100%; max-height:40vh;'></center>" +
                                "<p>" +
                                "<h5>" +
                                "Este breve tutorial le mostrar&aacute;:" +
                                "<ol>" +
                                "<li>La edici&oacute;n de microc&oacute;digo.</li>" +
                                "<li>La edici&oacute;n de c&oacute;digo ensamblador.</li>" +
                                "<li>Ejecución del anterior ensamblador definido anteriormente.</li>" +
                                "</ol>" +
                                "</h5>",
                     code_pre:  function() { },
                     code_post: function() { },
                     wait_next: 100
                  });

    tutorials.simpleusage.es.push({
                     id:        "simpleusage",
                     title:     "WepSIM: microprogramar, ensamblar y simular",
                     message:   "<center><img alt='wepsim screenshot' src='help/simulator/firmware001.jpg' style='max-width:100%; max-height:40vh;'></center>" +
                                "<p>" +
                                "<h5>" +
                                "El primer paso es microprogramar el firmware a ser usado. " +
                                "Por favor use el bot&oacute;n de 'Microcode' para ir a la pantalla de trabajo del microc&oacute;digo." +
                                "</h5>",
                     code_pre:  function() { },
                     code_post: function() { },
                     wait_next: 100
                  });

    tutorials.simpleusage.es.push({
                     id:        "simpleusage",
                     title:     "WepSIM: microprogramar, ensamblar y simular",
                     message:   "<center><img alt='wepsim screenshot' src='help/simulator/firmware002.jpg' style='max-width:100%; max-height:40vh;'></center>" +
                                "<p>" +
                                "<h5>" +
                                "La pantalla de microprogramación ofrece:" +
                                "<ul>" +
                                "<li>El editor de microcr&oacute;digo.</li>" +
                                "<li>El microcompilador.</li>" +
                                "<li>El resumen del hardware y la ayuda.</li>" +
                                "</ul>" +
                                "Una vez que el microc&oacute;digo est&eacute; listo (editado y compile sin errores) el siguiente paso el el c&oacute;digo ensamblador." +
                                "</h5>",
                     code_pre:  function() { },
                     code_post: function() { },
                     wait_next: 100
                  });

    tutorials.simpleusage.es.push({
                     id:        "simpleusage",
                     title:     "WepSIM: microprogramar, ensamblar y simular",
                     message:   "<center><img alt='wepsim screenshot' src='help/simulator/assembly002.jpg' style='max-width:100%; max-height:40vh;'></center>" +
                                "<p>" +
                                "<h5>" +
                                "El segundo paso es programar el ensamblador a ser ejecutado. " +
                                "Por favor use el bot&oacute;n de 'Assembly' para ir a la pantalla de ensamblador." +
                                "</h5>",
                     code_pre:  function() { },
                     code_post: function() { },
                     wait_next: 100
                  });

    tutorials.simpleusage.es.push({
                     id:        "simpleusage",
                     title:     "WepSIM: microprogramar, ensamblar y simular",
                     message:   "<center><img alt='wepsim screenshot' src='help/simulator/assembly003.jpg' style='max-width:100%; max-height:40vh;'></center>" +
                                "<p>" +
                                "<h5>" +
                                "La pantalla de programaci&oacute;n en ensamblador ofrece:" +
                                "<ul>" +
                                "<li>El editor para el c&oacute;digo ensamblador.</li>" +
                                "<li>El compilador de ensamblador.</li>" +
                                "<li>El visualizador de mapa de memoria y ayuda.</li>" +
                                "</ul>" +
                                "Asegure antes de ir a la pantalla del simulador que sud c&oacute;digo este listo (editado y compilado sin errores)." +
                                "</h5>",
                     code_pre:  function() { },
                     code_post: function() { },
                     wait_next: 100
                  });

    tutorials.simpleusage.es.push({
                     id:        "simpleusage",
                     title:     "WepSIM: microprogramar, ensamblar y simular",
                     message:   "<center><img alt='wepsim screenshot' src='help/simulator/simulator010.jpg' style='max-width:100%; max-height:40vh;'></center>" +
                                "<p>" +
                                "<h5>" +
                                "El tercer paso es ejecutar el c&oacute;digo ensamblador en el ensamblador." +
                                "La pantalla de simulación ofrece:" +
                                "<ul>" +
                                "<li>Las vista de ensamblador y hardware.</li>" +
                                "<li>Los detalles de registros, memoria de control, memoria principal, etc.</li>" +
                                "<li>Las acciones de reinicio, ejecución paso a paso o hasta punto de ruptura (o fin).</li>" +
                                "</ul>" +
                                "Este tutorial ha introducido el uso t&iacute;pico de WepSIM para estudiantes y profesores. ¡Disfrute con WepSIM!." +
                                "</h5>",
                     code_pre:  function() { },
                     code_post: function() { },
                     wait_next: 100
                  });

