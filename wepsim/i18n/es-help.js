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
                     reference:   "simulator#help_simulator_firmware",
                     description: "Descripción de cómo trabajar en el simulador con el microc&oacute;digo.<br>"
                  });

    help.es.push({
                     id:          "microcode",
                     title:       "Formato del microcódigo",
                     i_type:      "relative",
                     u_type:      "simulador",
                     reference:   "simulator#help_firmware_format",
                     description: "Sintáxis del microcódigo usado.<br>"
                  });

    help.es.push({
                     id:          "simulator",
                     title:       "Simulador: ensamblador",
                     i_type:      "relative",
                     u_type:      "simulador",
                     reference:   "simulator#help_simulator_assembly",
                     description: "Descripción de cómo trabajar en el simulador con el ensamblador.<br>"
                  });

    help.es.push({
                     id:          "assembly",
                     title:       "Formato del ensamblador",
                     i_type:      "relative",
                     u_type:      "simulador",
                     reference:   "simulator#help_assembly_format",
                     description: "Sintáxis del ensamblador.<br>"
                  });

    help.es.push({
                     id:          "simulator",
                     title:       "Simulador: ejecuci&oacute;n",
                     i_type:      "relative",
                     u_type:      "simulador",
                     reference:   "simulator#help_simulator_execution",
                     description: "Descripción de cómo ejecutar en el simulador el ensamblador y microc&oacute;digo.<br>"
                  });

    help.es.push({
                     id:          "architecture",
                     title:       "Arquitectura del simulador",
                     i_type:      "absolute",
                     u_type:      "procesador simulado",
                     reference:   "hardware",
                     description: "Descripción de la arquitectura del procesador simulado.<br>"
                  });

    help.es.push({
                     id:          "architecture",
                     title:       "Señales simuladas",
                     i_type:      "absolute",
                     u_type:      "procesador simulado",
                     reference:   "signals",
                     description: "Resumen de las señales principales del procesador elemental.<br>"
                  });

    help.es.push({
                     id:          "architecture",
                     title:       "Resumen del Hardware",
                     i_type:      "code",
                     u_type:      "procesador simulado",
                     reference:   "var ahw1 = simhw_active().sim_short_name ; " +
                                  "var img1 = 'examples/hardware/' + ahw1 + '/images/cpu.svg?time=20190102' ; " +
                                  "var txt1 = 'Your browser does not support SVG' ;" +
                                  "var lyt1 = '<object id=\\'svg_p2\\' data=\\'' + img1 + '\\' " +
                                  "                    type=\\'image/svg+xml\\'>' + txt1 +  '</object>'; " +
                                  "wepsim_open_help_content(lyt1) ;",
                     description: "Resumen del hardware del procesador elemental simulado.<br>"
                  });

    help.es.push({
                     id:          "about",
                     title:       "Licencia, plataformas, etc.",
                     i_type:      "relative",
                     u_type:      "info",
                     reference:   "about#help_about",
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

