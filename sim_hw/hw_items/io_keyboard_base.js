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


/*
 *  KBD - simple keyboard
 */

var KBDR_ID = 0x0100 ;
var KBSR_ID = 0x0104 ;

function io_keyboard_base_register ( sim_p )
{
	/*
	 *  Components
	 */

        sim_p.components.KBD = {
		                  name: "KBD", 
		                  version: "1", 
		                  abilities:    [ "KEYBOARD" ], 

		                  // ui: details
		                  details_name: [ "KEYBOARD" ],
                                  details_fire: [ ['svg_p:text3829'] ],

		                  // state: write_state, read_state, get_state
		                  write_state: function ( vec ) {
						    return vec;
				               },
		                  read_state:  function ( o, check ) {
                                                    return false ;
				               },
		                  get_state:   function ( reg ) {
					            return null ;
				               },

		                  // native: get_value, set_value
                                  get_value:   function ( elto ) {
                                                    return sim_p.internal_states.keyboard_content ;
                                               },
                                  set_value:   function ( elto, value ) {
                                                    sim_p.internal_states.keyboard_content = value ;
						    return value ;
                                               }
                            	};


	/*
	 *  States - IO parameters
	 */

        sim_p.internal_states.io_hash[KBDR_ID] = "KBDR" ;
        sim_p.internal_states.io_hash[KBSR_ID] = "KBSR" ;


	/*
	 *  Internal States
	 */

        sim_p.internal_states.keyboard_content = "" ;


        /*
         *  States
         */

        sim_p.states.KBDR   = { name: "KBDR", verbal: "Keyboard Data Register",
                                 visible:false, nbits: "32", value: 0, default_value: 0,
                                 draw_data: [] };
        sim_p.states.KBSR   = { name: "KBSR", verbal: "Keyboard Status Register",
                                 visible:false, nbits: "32", value: 0, default_value: 0,
                                 draw_data: [] };


        /*
         *  Signals
         */

         sim_p.signals.KBD_IOR    = { name: "KBD_IOR", 
                                       visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                       behavior: ["NOP", "KBD_IOR BUS_AB BUS_DB KBDR KBSR CLK; FIRE DB_UPDATED"],
                                       fire_name: ['svg_p:tspan4057'], 
                                       draw_data: [[], ['svg_p:path3863', 'svg_p:path3847']], 
                                       draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        sim_p.behaviors.KBD_IOR   = { nparameters: 6,
                                        types: ["E", "E", "E", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                      var clk    = get_value(sim_p.states[s_expr[5]]) ;

                                                      if ( (bus_ab != KBDR_ID) && (bus_ab != KBSR_ID) ) {
                                                              return; 
                                                      }

						      if (typeof sim_p.events.keybd[clk] != "undefined")
                                                      {
						              if (bus_ab == KBDR_ID)
							          set_value(sim_p.states[s_expr[2]], sim_p.events.keybd[clk]);
							      if (bus_ab == KBSR_ID)
								  set_value(sim_p.states[s_expr[2]], 1);
                                                              return;
                                                      }

                                                      if (get_value(sim_p.states[s_expr[4]]) == 0) 
                                                      {
							      var keybuffer = get_keyboard_content() ;
							      if (keybuffer.length !== 0) 
							      {
								  var keybuffer_rest = keybuffer.substr(1, keybuffer.length-1);
								  set_keyboard_content(keybuffer_rest) ;

								  set_value(sim_p.states[s_expr[4]], 1);
								  set_value(sim_p.states[s_expr[3]], keybuffer[0].charCodeAt(0));
							      }
                                                      }
                                                      if (get_value(sim_p.states[s_expr[4]]) == 1) 
                                                      {
						              sim_p.events.keybd[clk] = get_value(sim_p.states[s_expr[3]]) ;
                                                      }

						      if (bus_ab == KBSR_ID) {
							      set_value(sim_p.states[s_expr[2]], get_value(sim_p.states[s_expr[4]]));
						      }
						      if (bus_ab == KBDR_ID) {
							      if (get_value(sim_p.states[s_expr[4]]) == 1) 
							          set_value(sim_p.states[s_expr[2]], get_value(sim_p.states[s_expr[3]]));
							      set_value(sim_p.states[s_expr[4]], 0);
						      }
                                                   },
                                           verbal: function (s_expr) 
                                                   {
					              var verbal = "" ;

                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                      var clk    = get_value(sim_p.states[s_expr[5]]) ;

						      if (bus_ab == KBDR_ID)
                                                          verbal = "Read the screen data: " + sim_p.states[s_expr[2]] + ". " ;
						      if (bus_ab == KBSR_ID)
                                                          verbal = "Read the screen state: " + sim_p.states[s_expr[2]] + ". " ;

					              return verbal ;
                                                   }
                                   } ;

        sim_p.behaviors.KBD_RESET   = { nparameters: 1,
                                       operation: function (s_expr) 
                                                  {
						     // reset events.keybd
                                                     sim_p.events.keybd = {} ;
                                                  },
                                          verbal: function (s_expr) 
                                                  {
                                                     return "Reset the keyboard content. " ;
                                                  }
                                   };


        /*
         *  Model
         * (Thanks to Juan Francisco Perez Carrasco for collaborating in the design of the following elements)
         */

        sim_p.elements.keyboard = {
			      name:              "Keyboard",
			      description:       "Keyboard",
			      type:              "subcomponent",
			      belongs:           "KBD",
			      states:            {
						   "addr":      {
								   ref:  "BUS_AB"
								},
						   "data":      {
								   ref:  "BUS_DB"
								}
						 },
			      signals:           {
						   "ior":       {
								   ref:  "KBD_IOR"
								}
						 },
			      states_inputs:     [ "addr", "data" ],
			      states_outputs:    [ "data" ],
			      signals_inputs:    [ "ior" ],
			      signals_output:    [ ]
		         } ;

        return sim_p ;
}

