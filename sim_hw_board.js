/*      
 *  Copyright 2015-2017 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
         *  Components
         */

        var sim_components = new Object() ;


        /*
         *  States
         */

        var sim_states = new Object() ;
        var sim_events = new Object() ;

        var io_hash    = new Object();


        /*
         *  Signals
         */

        var sim_signals = new Object();
        var fire_stack  = new Array() ;


        /*
         *  Syntax of behaviors
         */

        var syntax_behavior = new Object();

        // Print Signal
        syntax_behavior["PRINT_S"] = { nparameters: 2,
                                       types: ["S"],
                                       operation: function(s_expr)
                                                  {
                                                      console.log(s_expr[1] + ': 0x' + sim_signals[s_expr[1]].value.toString(16));
                                                  }
                                     };

        // Print State
        syntax_behavior["PRINT_E"] = { nparameters: 2,
                                       types: ["E"],
                                       operation: function(s_expr)
                                                  {
                                                      console.log(s_expr[1] + ': 0x' + sim_states[s_expr[1]].value.toString(16));
                                                  }
                                     };

