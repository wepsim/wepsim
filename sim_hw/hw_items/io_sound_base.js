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

var SDR_ID = 0x4000 ;
var SSR_ID = 0x4004 ;

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

        sim_p.internal_states.io_hash[SDR_ID] = "SDR" ;
        sim_p.internal_states.io_hash[SSR_ID] = "SSR" ;


	/*
	 *  Internal States
	 */

        sim_p.internal_states.sound_content = "" ;


        /*
         *  States
         */

        sim_p.states.SDR    = { name: "SDR", verbal: "Sound Data Register",
                                visible:false, nbits: "32", value: 0, default_value: 0,
                                draw_data: [] };
        sim_p.states.SSR    = { name: "SSR", verbal: "Sound State Register",
                                visible:false, nbits: "32", value: 0, default_value: 0,
                                draw_data: [] };


        /*
         *  Signals
         */

        sim_p.signals.SND_IOR  = { name: "SND_IOR",
                                   visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		                   behavior: ["NOP", "SND_IOR BUS_AB BUS_DB SDR SSR CLK"],
                                   fire_name: [],
                                   draw_data: [[], []],
                                   draw_name: [[], []] };

        sim_p.signals.SND_IOW  = { name: "SND_IOW",
                                   visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		                   behavior: ["NOP", "SND_IOW BUS_AB BUS_DB SDR SSR CLK"],
                                   fire_name: [],
                                   draw_data: [[], []],
                                   draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        sim_p.behaviors.SND_IOR   = { nparameters: 6,
                                      types: ["E", "E", "E", "E", "E"],
                                      operation: function (s_expr)
                                                 {
                                                    var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                    var ddr    = get_value(sim_p.states[s_expr[3]]) ;
                                                    var dsr    = get_value(sim_p.states[s_expr[4]]) ;

                                                    if (bus_ab == SDR_ID)
                                                        set_value(sim_p.states[s_expr[2]], ddr) ;
                                                    if (bus_ab == SSR_ID)
                                                        set_value(sim_p.states[s_expr[2]], dsr) ;
                                                 },
                                         verbal: function (s_expr)
                                                 {
					            var verbal = "" ;

                                                    var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                    var ddr    = get_value(sim_p.states[s_expr[3]]) ;
                                                    var dsr    = get_value(sim_p.states[s_expr[4]]) ;

                                                    if (bus_ab == SDR_ID)
                                                        verbal = "Try to read from the sound the SDR value " + ddr + ". " ;
                                                    if (bus_ab == SDR_ID)
                                                        verbal = "Try to read into the sound the SSR value " + dsr + ". " ;

                                                    return verbal ;
                                                 }
                                };

        sim_p.behaviors.SND_IOW   = { nparameters: 6,
                                      types: ["E", "E", "E", "E", "E"],
                                      operation: function (s_expr)
                                                 {
                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                      var bus_db = get_value(sim_p.states[s_expr[2]]) ;
                                                      var clk    = get_value(sim_p.states[s_expr[5]]) ;

                                                      if (bus_ab != SDR_ID) {
                                                          return;
                                                      }

                                                      var ch1 = ((bus_db & 0x00FF0000) >> 16) + 'A'.charCodeAt(0) ;
                                                          ch1 = String.fromCharCode(ch1) ;
                                                      var ch2 =  (bus_db & 0x0000FF00) >> 8 ;
                                                      var ch3 =  (bus_db & 0x000000FF)  ;
                                                      var n = ch1 + ch2 + '+' + ch3 + 'n;' ;
                                                      if (typeof sim_p.events.sound[clk] == "undefined") {
                                                          sim_p.internal_states.sound_content += n ;
                                                      }

                                                      set_value(sim_p.states[s_expr[3]], bus_db) ;
                                                      set_value(sim_p.states[s_expr[4]], 1) ;
                                                      sim_p.events.sound[clk] = bus_db ;

                                                      simcore_sound_playNote(ch1+ch2, ch3+"n") ;
                                                 },
                                         verbal: function (s_expr)
                                                 {
					              var verbal = "" ;

                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                      var bus_db = get_value(sim_p.states[s_expr[2]]) ;
                                                      var clk    = get_value(sim_p.states[s_expr[5]]) ;
                                                      var ch     = String.fromCharCode(bus_db);

                                                      if (bus_ab == SDR_ID)
                                                          verbal = "Try to write into the sound the code " + ch + " at clock cycle " + clk + ". " ;

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
         * (Thanks to Juan Francisco Perez Carrasco for collaborating in the design of the following elements)
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

