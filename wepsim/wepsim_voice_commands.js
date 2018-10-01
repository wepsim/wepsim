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


    /*
     * Voice control
     */

    var wepsim_voice_commands = {

               'reset':                    function() { 
                                               wepsim_execute_reset(true, true); 
                                           },

               'next':                     function() { 
                                               wepsim_execute_instruction(); 
                                           },

               'next micro(instruction)':  function() { 
                                               wepsim_execute_microinstruction(); 
                                           },

               'play':                     function() { 
                                               wepsim_execute_play('#qbp', false); 
                                           },

               'stop':                     function() { 
                                               wepsim_execute_stop('#qbp'); 
                                           },

               'help':                     function() { 
                                               wepsim_open_help_index(); 
                                               wepsim_help_refresh(); 
                                           },

               'examples':                 function() { 
                                               wepsim_open_examples_index(); 
                                           },

               'configuration':            function() { 
                                               $('#config2').modal('show'); 
                                           },

               'close':                    function() { 
                                               wepsim_close_help(); 
		                               wepsim_close_examples(); 
		                               $('#config2').modal('hide'); 
                                           }
    } ;

