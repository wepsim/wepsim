/*
 *  Copyright 2015-2022 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve, Javier Lopez Gomez
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
	 *  LEDM
	 */

        /* jshint esversion: 6 */
        sim.poc.components.LEDM = {
		                  name: "LEDM",
		                  version: "1",
		                  abilities:    [ "LEDMATRIX" ],

		                  // ui: details
		                  details_name: [ "LEDMATRIX" ],
                                  details_fire: [ [] ],

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
						    var associated_state = simhw_internalState_get('io_hash',elto) ;
						    var value = (get_value(simhw_sim_state(associated_state)) >>> 0) ;

						    set_value(simhw_sim_state('BUS_AB'), elto) ;
						    set_value(simhw_sim_signal('LEDMR'), 1) ;
						    compute_behavior("FIRE LEDMR") ;
						    value = get_value(simhw_sim_state('BUS_DB')) ;

						    return value ;
                                               },
                                  set_value:   function ( elto, value ) {
						    var associated_state = simhw_internalState_get('io_hash',elto) ;
						    set_value(simhw_sim_state(associated_state), value) ;

						    set_value(simhw_sim_state('BUS_AB'), elto) ;
						    set_value(simhw_sim_state('BUS_DB'), value) ;
						    set_value(simhw_sim_signal('LEDMW'), 1) ;
						    compute_behavior("FIRE LEDMW") ;

						    return value ;
                                               }
                            	};


	/*
	 *  States - LEDM parameters
	 */

        sim.poc.internal_states.ledm_dim    = 24 ;
        sim.poc.internal_states.ledm_neltos = Math.pow(sim.poc.internal_states.ledm_dim, 2) ;
        sim.poc.internal_states.ledm_state  = Array.from({length:sim.poc.internal_states.ledm_neltos}, 
							() => ({color:0})) ;
        sim.poc.internal_states.ledm_frame  = '0'.repeat(sim.poc.internal_states.ledm_neltos) ;

        var LEDMSR_ID   = 0x3100 ;
        var LEDMCR_ID   = 0x3104 ;
        var LEDMDR_ID   = 0x3108 ;

        sim.poc.internal_states.io_hash[LEDMSR_ID] = "LEDMSR" ;
        sim.poc.internal_states.io_hash[LEDMCR_ID] = "LEDMCR" ;
        sim.poc.internal_states.io_hash[LEDMDR_ID] = "LEDMDR" ;


        /*
         *  States
         */

        sim.poc.states.LEDMSR  = { name: "LEDMSR", verbal: "LEDM State Register",
                                   visible:false, nbits: "32", value: 0, default_value: 0,
                                   draw_data: [] };
        sim.poc.states.LEDMCR  = { name: "LEDMCR", verbal: "LEDM Control Register",
                                   visible:false, nbits: "32", value: 0, default_value: 0,
                                   draw_data: [] };
        sim.poc.states.LEDMDR  = { name: "LEDMDR", verbal: "LEDM Data Register",
                                   visible:false, nbits: "32", value: 0, default_value: 0,
                                   draw_data: [] };


        /*
         *  Signals
         */

         sim.poc.signals.LEDM_IOR = { name: "LEDM_IOR",
                                      visible: true, type: "L", value: 0, default_value:0, nbits: "1",
                                      behavior: ["NOP", "LEDM_IOR BUS_AB BUS_DB LEDMSR LEDMCR LEDMDR CLK; FIRE M1"],
                                      fire_name: ['svg_p:tspan4173'],
                                      draw_data: [[], ['svg_p:path3795', 'svg_p:path3733']],
                                      draw_name: [[], []] };

         sim.poc.signals.LEDM_IOW = { name: "LEDM_IOW",
                                      visible: true, type: "L", value: 0, default_value:0, nbits: "1",
                                      behavior: ["NOP", "LEDM_IOW BUS_AB BUS_DB LEDMSR LEDMCR LEDMDR CLK; FIRE M1; LEDM_SYNC"],
                                      fire_name: ['svg_p:text3785-0-6-0-5-5'],
                                      draw_data: [[], ['svg_p:path3805', 'svg_p:path3733']],
                                      draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        sim.poc.behaviors.LEDM_IOR  = { nparameters: 7,
                                        types: ["E", "E", "E", "E", "E", "E"],
                                        operation: function (s_expr)
                                                   {
                                                      var bus_ab = get_value(sim.poc.states[s_expr[1]]) ;
                                                      var iosr   = get_value(sim.poc.states[s_expr[3]]) ;
                                                      var iocr   = get_value(sim.poc.states[s_expr[4]]) ;
                                                      var iodr   = get_value(sim.poc.states[s_expr[5]]) ;

                                                      // get
                                                      if (bus_ab == LEDMCR_ID) {
                                                          set_value(sim.poc.states[s_expr[2]], iocr);
						      }
                                                      if (bus_ab == LEDMDR_ID) {
                                                          set_value(sim.poc.states[s_expr[2]], iodr);
						      }
                                                      if (bus_ab == LEDMCR_ID) {
                                                          var x = (iodr & 0xFF000000) >> 24 ;
                                                          var y = (iodr & 0x00FF0000) >> 16 ;

                                                          var p = y*sim.poc.internal_states.ledm_dim + x ;
							  var s = get_var(sim.poc.internal_states.ledm_state[p].color) ;
                                                          set_value(sim.poc.states[s_expr[2]], s) ;
						      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
                                                      var verbal = "" ;

                                                      var bus_ab = get_value(sim.poc.states[s_expr[1]]) ;
                                                      var iosr   = get_value(sim.poc.states[s_expr[3]]) ;
                                                      var iocr   = get_value(sim.poc.states[s_expr[4]]) ;
                                                      var iodr   = get_value(sim.poc.states[s_expr[5]]) ;

                                                      if (bus_ab == LEDMSR_ID)
                                                          verbal = "I/O device read at LEDMSR of value " + iosr + ". " ;
                                                      if (bus_ab == LEDMCR_ID)
                                                          verbal = "I/O device read at LEDMCR of value " + iocr + ". " ;
                                                      if (bus_ab == LEDMDR_ID)
                                                          verbal = "I/O device read at LEDMDR of value " + iodr + ". " ;

                                                      return verbal ;
                                                   }
                                      };

        sim.poc.behaviors.LEDM_IOW  = { nparameters: 7,
                                        types: ["E", "E", "E", "E", "E", "E"],
                                        operation: function (s_expr)
                                                   {
                                                      var bus_ab = get_value(sim.poc.states[s_expr[1]]) ;
                                                      var bus_db = get_value(sim.poc.states[s_expr[2]]) ;

                                                      if ( (bus_ab != LEDMSR_ID) &&
                                                           (bus_ab != LEDMCR_ID) &&
                                                           (bus_ab != LEDMDR_ID) )
                                                      {
                                                            return;
                                                      }

                                                      // set
                                                      if (bus_ab == LEDMSR_ID) {
                                                          set_value(sim.poc.states[s_expr[3]], bus_db);
						      }
                                                      if (bus_ab == LEDMDR_ID) {
                                                          set_value(sim.poc.states[s_expr[5]], bus_db);
						      }
                                                      if (bus_ab == LEDMCR_ID) 
					              {
                                                          // update control register
                                                          set_value(sim.poc.states[s_expr[4]], bus_db);

                                                          // update internal state
                                                          var x = (bus_db & 0xFF000000) >> 24 ;
                                                          var y = (bus_db & 0x00FF0000) >> 16 ;

                                                          var p = y*sim.poc.internal_states.ledm_dim + x ;
                                                          var s = (bus_db & 0x000000FF) ;

						          var ledmstates = sim.poc.internal_states.ledm_state ;
						          set_var(ledmstates[p].color, s);
						      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
                                                      var verbal = "" ;
                                                      var bus_ab = get_value(sim.poc.states[s_expr[1]]) ;
                                                      var bus_db = get_value(sim.poc.states[s_expr[2]]) ;

						      switch (bus_ab)
						      {
						        case LEDMSR_ID:
                                                             verbal = "I/O device write at LEDMSR with value " + bus_db + ". " ;
						             break;
						        case LEDMDR_ID:
                                                             verbal = "I/O device write at LEDMCR with value " + bus_db + ". " ;
						             break;
						        case LEDMCR_ID:
                                                             var dr = get_value(sim.ep.states[s_expr[5]]) ;
						             if (0x10 & bus_db)
							     {
                                                                 var x = (dr & 0xFF000000) >> 24 ;
                                                                 var y = (dr & 0x00FF0000) >> 16 ;
                                                                 var s = (dr & 0x000000FF) ;
                                                                 verbal = "I/O device write at LEDMCR with value " + bus_db + " (set pixel x:" + x + ", y:" + y + ", with color:" + s + "). " ;

						             }
						             break;
						        default:
						             break;
						      }

                                                      return verbal ;
                                                   }
                                      };

        sim.poc.behaviors.LEDM_RESET = { nparameters: 1,
                                       operation: function (s_expr)
                                                  {
						        // reset events.ledm
                                                        sim.poc.events.ledm = {} ;

						        // reset the I/O factory
						        for (var i=0; i<sim.poc.internal_states.ledm_state.length; i++)
						        {
						             set_var(sim.poc.internal_states.ledm_state[i].color, false);
						        }

						        // REST
						        var o = '0'.repeat(64) ;
                                                        sim.poc.internal_states.ledm_frame = o ;
						        simcore_rest_call('LEDM', 'POST', '/', {'frame': o}) ;
							    // 201 (Created) -> ok
							    // 400 (Bad request) -> ko
                                                  },
                                          verbal: function (s_expr)
                                                  {
                                                     return "Reset the I/O device. " ;
                                                  }
                                     };

        sim.poc.behaviors.LEDM_SYNC = { nparameters: 1,
                                       operation: function (s_expr)
                                                  {
						        // internal state -> frame in REST
						        var ledmstates = sim.poc.internal_states.ledm_state ;
						        var o = '' ;
						        var p = 0 ;
						    	for (var j=0; j<sim.ep.internal_states.ledm_dim; j++)
							{
							     for (var k=0; k<sim.ep.internal_states.ledm_dim; k++)
							     {
                                                                  p = j*sim.poc.internal_states.ledm_dim + k ;
								  o = o + get_var(ledmstates[p].color).toString(16) ;
							     }
							}

						        // REST
						        if (sim.poc.internal_states.ledm_frame != o) 
   						        {
                                                            sim.poc.internal_states.ledm_frame = o ;

						            simcore_rest_call('LEDM', 'POST', '/', {'frame': o}) ;
							        // 201 (Created) -> ok
							        // 400 (Bad request) -> ko
						        }
                                                   },
                                          verbal: function (s_expr)
                                                  {
                                                        return "Sync State with Device. " ;
                                                  }
                                        };


        /*
         *  Model
         * (Thanks to Juan Francisco Perez Carrasco for collaborating in the design of the following elements)
         */

        sim.poc.elements.ledm = {
			      name:              "LEDM",
			      description:       "3D Led Cube",
			      type:              "subcomponent",
			      belongs:           "LEDM",
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
								   ref:  "LEDM_IOR"
								},
						   "iow":       {
								   ref:  "LEDM_IOW"
								}
						 },
			      states_inputs:     [ "addr", "data" ],
			      states_outputs:    [ "data" ],
			      signals_inputs:    [ "ior", "iow" ],
			      signals_output:    [ ]
		         } ;

