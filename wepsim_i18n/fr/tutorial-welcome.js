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


    // Translated thanks to Google translate

    tutorials.welcome.fr.push({
                     id:          "welcome",
                     title:       "Bienvenue sur le simulateur WepSIM!",
                     message:     "<center><img alt='wepsim screenshot' src='help/simulator/simulator012.jpg' style='max-width:100%; max-height:40vh;'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Ce bref tutoriel va vous montrer comment:" +
                                  "<ol>" +
                                  "<li><a href='#' onclick='sim_tutorial_goframe(\"welcome\",0,1);'>Charger un exemple.</a></li>" +
                                  "<li><a href='#' onclick='sim_tutorial_goframe(\"welcome\",0,2);'>Exécuter un exemple.</a></li>" +
                                  "<li><a href='#' onclick='sim_tutorial_goframe(\"welcome\",0,3);'>Configurer la simulation.</a></li>" +
                                  "<li><a href='#' onclick='sim_tutorial_goframe(\"welcome\",0,4);'>Obtenir de l'aide.</a></li>" +
                                  "</ol>" +
                                  "</h5>",
                     code_pre:    simcore_do_nothing_handler,
                     code_post:   simcore_do_nothing_handler,
                     wait_next:   100
                  });

    tutorials.welcome.fr.push({
                     id:          "welcome",
                     title:       "Comment charger des exemples.",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/example_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Cliquez sur le bouton 'exemple', puis sur le nom de l'exemple 'titre'.<br>" +
                                  "Ensuite, l'exemple pour le microcode et l'assemblage est chargé, microcompilé et compilé.<br>" +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    simcore_do_nothing_handler,
                     code_post:   simcore_do_nothing_handler,
                     wait_next:   100
                  });

    tutorials.welcome.fr.push({
                     id:          "welcome",
                     title:       "Comment exécuter un exemple.",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/simulation_xinstruction.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Cliquez sur l'instruction suivante/la microinstruction pour exécuter étape par étape. <br>" +
                                  "Cliquez sur le bouton Exécuter pour exécuter jusqu'au premier point d'arrêt ou à la fin du programme d'assemblage." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    simcore_do_nothing_handler,
                     code_post:   simcore_do_nothing_handler,
                     wait_next:   100
                  });

    tutorials.welcome.fr.push({
                     id:          "welcome",
                     title:       "Comment configurer WepSIM.",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/config_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
	                          "Cliquez sur le bouton 'Configuration' pour permettre aux utilisateurs de personnaliser différentes parties de WepSIM." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    simcore_do_nothing_handler,
                     code_post:   simcore_do_nothing_handler,
                     wait_next:   100
                  });

    tutorials.welcome.fr.push({
                     id:          "welcome",
                     title:       "Comment obtenir l'aide de base.",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/help_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Cliquez sur le bouton vert 'aide' pour accéder à la boîte de dialogue d'aide.<br>" +
                                  "Vous pouvez changer d'idiome (Espagnol/Anglais), accéder à l'index de l'aide ou fermer la boîte de dialogue d'aide." +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    simcore_do_nothing_handler,
                     code_post:   simcore_do_nothing_handler,
                     wait_next:   100
                  });

    tutorials.welcome.fr.push({
                     id:          "welcome",
                     title:       "Bienvenue sur le simulateur WepSIM!",
                     message:     "<center><img alt='wepsim screenshot' src='help/welcome/help_usage.gif' style='max-width:100%; max-height:60vh'></center>" +
                                  "<p>" +
                                  "<h5>" +
                                  "Veuillez explorer les sections d'aide pour plus d'informations. <br>" +
                                  "Si vous cliquez sur le bouton de fin de ce tutoriel, WepSIM va charger le premier exemple pour vous. Profitez-en!" +
                                  "<br>" +
                                  "</h5>",
                     code_pre:    function() {  },
                     code_post:   function() {
                                      load_from_example_firmware("ep:S1E1", true);
                                  },
                     wait_next:   100
                  });

