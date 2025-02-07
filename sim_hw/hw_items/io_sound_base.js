/*
 *  Copyright 2015-2025 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
 *  SOUND
 */

var SDR1_ID = 0x4000 ;
var SDR2_ID = 0x4004 ;
var SDR3_ID = 0x4008 ;
var SSR_ID  = 0x400C ;

function io_sound_base_register ( sim_p )
{
        sim_p.components.SOUND = {
		                  name: "SOUND",
		                  version: "1",
		                  abilities:    [ "SOUND" ],

		                  // ui: details
                                  details_name: [ "SOUND" ],
                                  details_fire: [ ],

		                  // state: write_state, read_state, get_state
		                  write_state: function ( vec ) {
                                                  if (typeof vec.SOUND == "undefined") {
                                                      vec.SOUND = {} ;
				                  }

					          var sim_sound = sim_p.internal_states.sound_content ;
					          var sim_lines  = sim_sound.trim().split("\n") ;
					          for (var i=0; i<sim_lines.length; i++)
					          {
					               value = sim_lines[i] ;
           					       if (value != "") {
							   vec.SOUND[i] = {"type":  "sound",
								            "default_value": "",
								            "id":    i,
								            "op":    "==",
								            "value": value} ;
   						       }
					          }

						  return vec;
				              },
		                  read_state: function ( vec, check ) {
                                                  if (typeof vec.SOUND == "undefined") {
                                                      vec.SOUND = {} ;
                                                  }

					          if ("SOUND" == check.type.toUpperCase().trim())
                                                  {
						      vec.SOUND[check.id] = { "type":  "sound",
								               "default_value": "",
								               "id":    check.id,
								               "op":    check.condition,
								               "value": check.value } ;
                                                      return true ;
                                                  }

                                                  return false ;
				             },
		                  get_state: function ( line ) {
					          var sim_sound = sim_p.internal_states.sound_content ;
					          var sim_lines  = sim_sound.trim().split("\n") ;
						  var index = parseInt(line) ;
						  if (typeof sim_lines[index] != "undefined")
						      return sim_lines[index] ;

					          return null ;
				              },

		                  // native: get_value, set_value
                                  get_value:   function ( elto ) {
        				            return sim_p.internal_states.sound_content ;
                                               },
                                  set_value:   function ( elto, value ) {
        				            sim_p.internal_states.sound_content = value ;
						    return value ;
                                               }
                            	};


	/*
	 *  States - IO parameters
	 */

        sim_p.internal_states.io_hash[SDR1_ID] = "SDR1" ;
        sim_p.internal_states.io_hash[SDR2_ID] = "SDR2" ;
        sim_p.internal_states.io_hash[SDR3_ID] = "SDR3" ;
        sim_p.internal_states.io_hash[SSR_ID]  = "SSR" ;


	/*
	 *  Internal States
	 */

        sim_p.internal_states.sound_content = "" ;


        /*
         *  States
         */

        sim_p.states.SSR    = { name: "SSR", verbal: "Sound State Register",
                                visible:false, nbits: "32", value: 0, default_value: 0,
                                draw_data: [] };
        sim_p.states.SDR1   = { name: "SDR1", verbal: "Sound Data Register 1",
                                visible:false, nbits: "32", value: 0, default_value: 0,
                                draw_data: [] };
        sim_p.states.SDR2   = { name: "SDR2", verbal: "Sound Data Register 2",
                                visible:false, nbits: "32", value: 0, default_value: 0,
                                draw_data: [] };
        sim_p.states.SDR3   = { name: "SDR3", verbal: "Sound Data Register 3",
                                visible:false, nbits: "32", value: 0, default_value: 0,
                                draw_data: [] };


        /*
         *  Signals
         */

        sim_p.signals.SND_IOR  = { name: "SND_IOR",
                                   visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		                   behavior: ["NOP", "SND_IOR BUS_AB BUS_DB CLK SSR SDR1 SDR2 SDR3"],
                                   fire_name: [],
                                   draw_data: [[], []],
                                   draw_name: [[], []] };

        sim_p.signals.SND_IOW  = { name: "SND_IOW",
                                   visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		                   behavior: ["NOP", "SND_IOW BUS_AB BUS_DB CLK SSR SDR1 SDR2 SDR3"],
                                   fire_name: [],
                                   draw_data: [[], []],
                                   draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        sim_p.behaviors.SND_IOR   = { nparameters: 8,
                                      types: ["E", "E", "E", "E", "E", "E", "E"],
                                      operation: function (s_expr)
                                                 {
                                                    var bus_ab = get_value(sim_p.states[s_expr[1]]) ;

                                                    if (bus_ab == SSR_ID) {
                                                        var dsr = get_value(sim_p.states[s_expr[4]]) ;
                                                        set_value(sim_p.states[s_expr[2]], dsr) ;
						    }
                                                    if (bus_ab == SDR1_ID) {
                                                        var ddr = get_value(sim_p.states[s_expr[5]]) ;
                                                        set_value(sim_p.states[s_expr[2]], ddr) ;
						    }
                                                    if (bus_ab == SDR2_ID) {
                                                        var ddr = get_value(sim_p.states[s_expr[6]]) ;
                                                        set_value(sim_p.states[s_expr[2]], ddr) ;
						    }
                                                    if (bus_ab == SDR3_ID) {
                                                        var ddr = get_value(sim_p.states[s_expr[7]]) ;
                                                        set_value(sim_p.states[s_expr[2]], ddr) ;
						    }
                                                 },
                                         verbal: function (s_expr)
                                                 {
					            var verbal = "" ;
                                                    var bus_ab = get_value(sim_p.states[s_expr[1]]) ;

                                                    if (bus_ab == SDR1_ID) {
                                                        var dsr = get_value(sim_p.states[s_expr[4]]) ;
                                                        verbal = "Try to read into the sound the SSR value " + dsr + ". " ;
						    }
                                                    if (bus_ab == SDR1_ID) {
                                                        var ddr = get_value(sim_p.states[s_expr[5]]) ;
                                                        verbal = "Try to read from the sound the SDR1 value " + ddr + ". " ;
						    }
                                                    if (bus_ab == SDR2_ID) {
                                                        var ddr = get_value(sim_p.states[s_expr[6]]) ;
                                                        verbal = "Try to read from the sound the SDR2 value " + ddr + ". " ;
						    }
                                                    if (bus_ab == SDR3_ID) {
                                                        var ddr = get_value(sim_p.states[s_expr[7]]) ;
                                                        verbal = "Try to read from the sound the SDR3 value " + ddr + ". " ;
						    }

                                                    return verbal ;
                                                 }
                                };

        sim_p.behaviors.SND_IOW   = { nparameters: 8,
                                      types: ["E", "E", "E", "E", "E", "E", "E"],
                                      operation: function (s_expr)
                                                 {
                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
						      if ( (bus_ab != SDR1_ID) && (bus_ab != SDR2_ID) && (bus_ab != SDR3_ID) )
						      {
                                                          return;
                                                      }

                                                      var bus_db = get_value(sim_p.states[s_expr[2]]) ;
                                                      var clk    = get_value(sim_p.states[s_expr[3]]) ;
					              var ret_ok = 1 ;

                                                      if (bus_ab == SDR1_ID)
						      {
                                                          set_value(sim_p.states[s_expr[5]], bus_db) ;

                                                          if (typeof sim_p.events.sound[clk] == "undefined")
							  {
                                                              sim_p.events.sound[clk] = bus_db ;

							      if (2 == bus_db)
							      {
							          // note
							          var sdr2 = get_value(sim_p.states[s_expr[6]]) ;
							          var n1   = simcore_sound_ascii2note(sdr2, 4) ;

							          // time
							          var sdr3 = get_value(sim_p.states[s_expr[7]]) ;
                                                                  var t1 = sdr3 & 0x000000FF ;
								      t1 = t1 + 'n' ;

                                                                  var n1t1 = n1 + ',' + t1 + ';' ;
                                                                  sim_p.internal_states.sound_content += n1t1 ;

								  ret_ok = simcore_sound_playNote(n1, t1) ;
							      }
							      if (1 == bus_db) {
							          ret_ok = simcore_sound_start() ;
							      }
							      if (0 == bus_db) {
							          ret_ok = simcore_sound_stop() ;
							      }
                                                          }
						      }
                                                      if (bus_ab == SDR2_ID) {
                                                          set_value(sim_p.states[s_expr[6]], bus_db) ;
						      }
                                                      if (bus_ab == SDR3_ID) {
                                                          set_value(sim_p.states[s_expr[7]], bus_db) ;
						      }

                                                      set_value(sim_p.states[s_expr[4]], ret_ok) ;
                                                 },
                                         verbal: function (s_expr)
                                                 {
					              var verbal = "" ;

                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                      var bus_db = get_value(sim_p.states[s_expr[2]]) ;
                                                      var clk    = get_value(sim_p.states[s_expr[3]]) ;

                                                      if (bus_ab == SDR1_ID) {
                                                          verbal = "Try to write into the sound SDR1 the code " + bus_db + " at clock cycle " + clk + ". " ;
						      }
                                                      if (bus_ab == SDR2_ID) {
                                                          verbal = "Try to write into the sound SDR2 the code " + bus_db + " at clock cycle " + clk + ". " ;
						      }
                                                      if (bus_ab == SDR3_ID) {
                                                          verbal = "Try to write into the sound SDR3 the code " + bus_db + " at clock cycle " + clk + ". " ;
						      }

                                                      return verbal ;
                                                 }
                                };

        sim_p.behaviors.SOUND_RESET = { nparameters: 1,
                                      operation: function (s_expr)
                                                 {
						     // reset events.sound
                                                     sim_p.events.sound = {} ;
                                                 },
                                         verbal: function (s_expr)
                                                 {
                                                    return "Reset the sound content. " ;
                                                 }
                                  };


        /*
         *  Model
         *  (Thanks to Juan Francisco Perez Carrasco for collaborating in the design of the following elements)
         */

        sim_p.elements.sound = {
			      name:              "Sound",
			      description:       "Sound",
			      type:              "subcomponent",
			      belongs:           "SOUND",
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
								   ref:  "SND_IOR"
								},
						   "iow":       {
								   ref:  "SND_IOW"
								}
						 },
			      states_inputs:     [ "addr", "data" ],
			      states_outputs:    [ "data" ],
			      signals_inputs:    [ "ior", "iow" ],
			      signals_output:    [ ]
		         } ;

        return sim_p ;
}

