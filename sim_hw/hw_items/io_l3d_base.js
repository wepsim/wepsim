/*     
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve, Javier Lopez Gomez
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
 *  L3D
 */

var L3DSR_ID   = 0x2100 ;
var L3DCR_ID   = 0x2104 ;
var L3DDR_ID   = 0x2108 ;

function io_l3d_base_register ( sim_p )
{
        /* jshint esversion: 6 */
        sim_p.components.L3D = {
		                  name: "L3D",
		                  version: "1",
		                  abilities:    [ "3DLED" ],

		                  // ui: details
		                  details_name: [ "3DLED" ],
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
						    set_value(simhw_sim_signal('IOR'), 1) ;
						    compute_behavior("FIRE IOR") ;
						    value = get_value(simhw_sim_state('BUS_DB')) ;

						    return value ;
                                               },
                                  set_value:   function ( elto, value ) {
						    var associated_state = simhw_internalState_get('io_hash',elto) ;
						    set_value(simhw_sim_state(associated_state), value) ;

						    set_value(simhw_sim_state('BUS_AB'), elto) ;
						    set_value(simhw_sim_state('BUS_DB'), value) ;
						    set_value(simhw_sim_signal('IOW'), 1) ;
						    compute_behavior("FIRE IOW") ;

						    return value ;
                                               }
                            	};


	/*
	 *  States - L3D parameters
	 */

        sim_p.internal_states.l3d_dim    = 4 ;
        sim_p.internal_states.l3d_neltos = Math.pow(sim_p.internal_states.l3d_dim, 3) ;
        sim_p.internal_states.l3d_state  = Array.from({length:sim_p.internal_states.l3d_neltos},
						       () => ({active:false})) ;
        sim_p.internal_states.l3d_frame  = '0'.repeat(sim_p.internal_states.l3d_neltos) ;

        sim_p.internal_states.io_hash[L3DSR_ID] = "L3DSR" ;
        sim_p.internal_states.io_hash[L3DCR_ID] = "L3DCR" ;
        sim_p.internal_states.io_hash[L3DDR_ID] = "L3DDR" ;


        /*
         *  States
         */

        sim_p.states.L3DSR = { name: "L3DSR", verbal: "L3D State Register",
                                visible:false, nbits: "32", value: 0, default_value: 0,
                                draw_data: [] };
        sim_p.states.L3DCR = { name: "L3DCR", verbal: "L3D Control Register",
                                visible:false, nbits: "32", value: 0, default_value: 0,
                                draw_data: [] };
        sim_p.states.L3DDR = { name: "L3DDR", verbal: "L3D Data Register",
                                visible:false, nbits: "32", value: 0, default_value: 0,
                                draw_data: [] };


        /*
         *  Signals
         */

         sim_p.signals.L3D_IOR = { name: "L3D_IOR",
                                    visible: true, type: "L", value: 0, default_value:0, nbits: "1",
                                    behavior: ["NOP", "L3D_IOR BUS_AB BUS_DB L3DSR L3DCR L3DDR CLK; FIRE DB_UPDATED"],
                                    fire_name: ['svg_p:tspan4173'],
                                    draw_data: [[], ['svg_p:path3795', 'svg_p:path3733']],
                                    draw_name: [[], []] };

         sim_p.signals.L3D_IOW = { name: "L3D_IOW",
                                    visible: true, type: "L", value: 0, default_value:0, nbits: "1",
                                    behavior: ["NOP", "L3D_IOW BUS_AB BUS_DB L3DSR L3DCR L3DDR CLK; FIRE DB_UPDATED; L3D_SYNC"],
                                    fire_name: ['svg_p:text3785-0-6-0-5-5'],
                                    draw_data: [[], ['svg_p:path3805', 'svg_p:path3733']],
                                    draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        sim_p.behaviors.L3D_IOR   = { nparameters: 7,
                                        types: ["E", "E", "E", "E", "E", "E"],
                                        operation: function (s_expr)
                                                   {
                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                      var iosr   = get_value(sim_p.states[s_expr[3]]) ;
                                                      var iocr   = get_value(sim_p.states[s_expr[4]]) ;
                                                      var iodr   = get_value(sim_p.states[s_expr[5]]) ;

                                                      // get
                                                      if (bus_ab == L3DCR_ID) {
                                                          set_value(sim_p.states[s_expr[2]], iocr);
						      }
                                                      if (bus_ab == L3DDR_ID) {
                                                          set_value(sim_p.states[s_expr[2]], iodr);
						      }
                                                      if (bus_ab == L3DSR_ID) {
                                                          var x = (iodr & 0xFF000000) >>> 24 ;
                                                          var y = (iodr & 0x00FF0000) >>> 16 ;
                                                          var z = (iodr & 0x0000FF00) >>>  8 ;

                                                          var p = z*Math.pow(sim_p.internal_states.l3d_dim, 2) +
							          y*sim_p.internal_states.l3d_dim +
								  x ;
							  var s = get_var(sim_p.internal_states.l3d_state[p].active) ;
                                                          set_value(sim_p.states[s_expr[2]], s) ;
						      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
                                                      var verbal = "" ;

                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                      var iosr   = get_value(sim_p.states[s_expr[3]]) ;
                                                      var iocr   = get_value(sim_p.states[s_expr[4]]) ;
                                                      var iodr   = get_value(sim_p.states[s_expr[5]]) ;

                                                      if (bus_ab == L3DSR_ID)
                                                          verbal = "I/O device read at L3DSR of value " + iosr + ". " ;
                                                      if (bus_ab == L3DCR_ID)
                                                          verbal = "I/O device read at L3DCR of value " + iocr + ". " ;
                                                      if (bus_ab == L3DDR_ID)
                                                          verbal = "I/O device read at L3DDR of value " + iodr + ". " ;

                                                      return verbal ;
                                                   }
                                      };

        sim_p.behaviors.L3D_IOW   = { nparameters: 7,
                                        types: ["E", "E", "E", "E", "E", "E"],
                                        operation: function (s_expr)
                                                   {
                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                      var bus_db = get_value(sim_p.states[s_expr[2]]) ;

                                                      if ( (bus_ab != L3DSR_ID) &&
                                                           (bus_ab != L3DCR_ID) &&
                                                           (bus_ab != L3DDR_ID) )
                                                      {
                                                            return ;
                                                      }

                                                      // set
                                                      if (bus_ab == L3DSR_ID) {
                                                          set_value(sim_p.states[s_expr[3]], bus_db) ;
						      }
                                                      if (bus_ab == L3DDR_ID) {
                                                          set_value(sim_p.states[s_expr[5]], bus_db) ;
						      }
                                                      if (bus_ab == L3DCR_ID)
                                                      {
                                                          // update control register
                                                          set_value(sim_p.states[s_expr[4]], bus_db) ;

                                                          // update internal state
                                                          var x = (bus_db & 0xFF000000) >>> 24 ;
                                                          var y = (bus_db & 0x00FF0000) >>> 16 ;
                                                          var z = (bus_db & 0x0000FF00) >>>  8 ;

                                                          var p = z*Math.pow(sim_p.internal_states.l3d_dim, 2) +
							          y*sim_p.internal_states.l3d_dim +
								  x ;
                                                          var s = (bus_db & 0x000000FF) != 0 ;

						          set_var(sim_p.internal_states.l3d_state[p].active, s);
						      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
                                                      var verbal = "" ;
                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                      var bus_db = get_value(sim_p.states[s_expr[2]]) ;

                                                      if (bus_ab == L3DSR_ID)
                                                          verbal = "I/O device write at L3DSR with value " + bus_db + ". " ;
                                                      if (bus_ab == L3DCR_ID)
                                                          verbal = "I/O device write at L3DCR with value " + bus_db + ". " ;
                                                      if (bus_ab == L3DDR_ID)
                                                          verbal = "I/O device write at L3DDR with value " + bus_db + ". " ;

                                                      return verbal ;
                                                   }
                                      };

        sim_p.behaviors.L3D_RESET = { nparameters: 1,
                                       operation: function (s_expr)
                                                  {
						        // reset events.l3d
                                                        sim_p.events.l3d = {} ;

						        // reset the I/O factory
						        var n = sim_p.internal_states.l3d_state.length ;
						        for (var i=0; i<n; i++) {
						             set_var(sim_p.internal_states.l3d_state[i].active, false) ;
						        }

						        // REST
						            n = Math.pow(sim_p.internal_states.l3d_dim, 3) ;
						        var o = '0'.repeat(n) ;
                                                        sim_p.internal_states.l3d_frame = o ;
						        simcore_rest_call('L3D', 'POST', '/', {'frame': o}) ;
							    // 201 (Created) -> ok
							    // 400 (Bad request) -> ko
                                                  },
                                          verbal: function (s_expr)
                                                  {
                                                     return "Reset the I/O device. " ;
                                                  }
                                     };

        sim_p.behaviors.L3D_SYNC  = { nparameters: 1,
                                       operation: function (s_expr)
                                                  {
						        // internal state -> frame in REST
						        var l3dstates = sim_p.internal_states.l3d_state ;
						        var o = '' ;
						        var p = 0 ;
                                                        var n = sim_p.internal_states.l3d_dim ;
						        for (var i=0; i<n; i++)
						        {
						    	     for (var j=0; j<n; j++)
							     {
							          for (var k=0; k<n; k++)
							          {
                                                                       p = k*Math.pow(sim_p.internal_states.l3d_dim, 2) +
							                   j*sim_p.internal_states.l3d_dim +
								           i ;
								       if (get_var(l3dstates[p].active))
									     o = o + '1' ;
								       else  o = o + '0' ;
							          }
							     }
						        }

						        // REST
						        if (sim_p.internal_states.l3d_frame != o)
   						        {
                                                            sim_p.internal_states.l3d_frame = o ;

						            simcore_rest_call('L3D', 'POST', '/', {'frame': o}) ;
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

        sim_p.elements.l3d = {
			      name:              "L3D",
			      description:       "3D Led Cube",
			      type:              "subcomponent",
			      belongs:           "L3D",
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
								   ref:  "L3D_IOR"
								},
						   "iow":       {
								   ref:  "L3D_IOW"
								}
						 },
			      states_inputs:     [ "addr", "data" ],
			      states_outputs:    [ "data" ],
			      signals_inputs:    [ "ior", "iow" ],
			      signals_output:    [ ]
		         } ;

        return sim_p ;
}

