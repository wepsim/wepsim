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
         *  Components
         */

        var sim_components = {} ;


        /*
         *  States
         */

        var sim_states = {} ;
        var sim_events = {} ;

        var io_hash    = {} ;


        /*
         *  Signals
         */

        var sim_signals = {} ;
        var fire_stack  = [] ;


        /*
         *  Syntax of behaviors
         */

        var syntax_behavior = {} ;


        /*
         *  Elemental Processor
         */

        simhw_add({
                      _name:            "Elemental Processor",
                      _img_processor:   "sim_ep/processor6.svg",
                      _img_controlunit: "sim_ep/controlunit6.svg",
                      components:       sim_components,
                      states:           sim_states,
                      events:           sim_events,
                      signals:          sim_signals,
                      behaviors:        syntax_behavior,
                      _io_hash:         io_hash,
                      _fire_stack:      fire_stack
	          }) ;

