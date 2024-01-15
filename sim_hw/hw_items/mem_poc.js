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
 *  Memory
 */

function mem_poc_register ( sim_p )
{
        sim_p.components.MEMORY = {
		                  name: "MEMORY",
		                  version: "1",
		                  abilities:    [ "MEMORY" ],

		                  // ui: details
				  details_name: [ "MEMORY", "MEMORY_CONFIG" ],
				  details_fire: [ ['svg_p:text3001'], [] ],

		                  // state: write_state, read_state, get_state
		                  write_state: function ( vec ) {
                                                  if (typeof vec.MEMORY == "undefined")
                                                      vec.MEMORY = {} ;

						  var key = 0 ;
						  var value = 0 ;
					          for (var index in sim_p.internal_states.MP)
						  {
                                                       value = main_memory_getvalue(sim_p.internal_states.MP,
                                                                                    index) ;
                                                       value = parseInt(value) ;
						       if (value != 0)
						       {
					                   key = parseInt(index).toString(16) ;
							   vec.MEMORY["0x" + key] = { "type":  "memory",
								                      "default_value": 0x0,
								                      "id":    "0x" + key,
								                      "op":    "=",
								                      "value": "0x" + value.toString(16) } ;
						       }
						  }

						  return vec;
				              },
		                  read_state: function ( vec, check ) {
                                                  if (typeof vec.MEMORY == "undefined") {
                                                      vec.MEMORY = {} ;
                                                  }

					          var key = parseInt(check.id).toString(16) ;
					          var val = parseInt(check.value).toString(16) ;
					          if ("MEMORY" == check.type.toUpperCase().trim())
                                                  {
						      vec.MEMORY["0x" + key] = { "type":  "memory",
							  	                 "default_value": 0x0,
								                 "id":    "0x" + key,
								                 "op":    check.condition,
								                 "value": "0x" + val } ;
                                                      return true ;
                                                  }

                                                  return false ;
				             },
		                  get_state: function ( pos ) {
						  var index = parseInt(pos) ;
                                                  var value = main_memory_getvalue(sim_p.internal_states.MP,
                                                                                   index) ;
						  if (typeof value === "undefined") {
					              return null ;
					          }

						  return "0x" + parseInt(value).toString(16) ;
				             },

		                  // native: get_value, set_value
		                  get_value: function ( elto ) {
                                                 var value = main_memory_getvalue(sim_p.internal_states.MP,
                                                                                  elto) ;
				                 show_main_memory(sim_p.internal_states.MP, elto, false,false) ;
                                                 return (value >>> 0) ;
				             },
		                  set_value: function ( elto, value ) {
						 // PC
						 var origin = '' ;
                                                 var r_value = main_memory_get_program_counter() ;
                                                 if (r_value != null) {
						     origin = 'PC=0x' + r_value.toString(16) ;
						 }

						 var melto = {
								"value":           (value >>> 0),
								"source_tracking": [ origin ],
								"comments":        null
							     } ;
                                                 var valref = main_memory_set(sim_p.internal_states.MP,
                                                                              elto, 
									      melto) ;

				                 show_main_memory(sim_p.internal_states.MP, 
                                                                  elto, 
                                                                  (typeof valref === "undefined"),
                                                                  true) ;

						 return value ;
				             }
                            	};


	/*
	 *  Internal States
	 */

        sim_p.internal_states.segments  = {} ;
        sim_p.internal_states.MP        = {} ;
        sim_p.internal_states.MP_wc     = 0 ;

        sim_p.internal_states.CM_cfg    = [] ;
        sim_p.internal_states.CM        = [] ;


        /*
         *  Signals
         */

        sim_p.signals.MRDY     = { name: "MRDY",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
                                     depends_on: ["CLK"],
		                     behavior: ["FIRE_IFCHANGED MRDY C",
					        "FIRE_IFCHANGED MRDY C"],
                                     fire_name: ['svg_p:tspan3916'],
                                     draw_data: [[], ['svg_p:path3895','svg_p:path3541']],
                                     draw_name: [[], []] };

        sim_p.signals.R        = { name: "R",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		                     behavior: ["NOP; CHECK_RTD",
					        "MEM_READ BUS_AB BUS_DB BW MRDY CLK; FIRE M1; FIRE MRDY; CHECK_RTD"],
                                     fire_name: ['svg_p:text3533-5-2'],
                                     draw_data: [[], ['svg_p:path3557','svg_p:path3571']],
                                     draw_name: [[], []] };

        sim_p.signals.W        = { name: "W",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		                     behavior: ["NOP",
					        "MEM_WRITE BUS_AB BUS_DB BW MRDY CLK; FIRE M1; FIRE MRDY"],
                                     fire_name: ['svg_p:text3533-5-08'],
                                     draw_data: [[], ['svg_p:path3559','svg_p:path3575','svg_p:path3447-7']],
                                     draw_name: [[], []] };

        sim_p.signals.BW       = { name: "BW",
                                     verbal: ['Access to one byte from memory. ',
                                              'Access to two bytes from memory. ',
                                              'Access to three bytes from memory. ',
                                              'Access to a word from memory. '],
                                     visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
                                     behavior: ['FIRE R; FIRE W',
				    	        'FIRE R; FIRE W',
					        'FIRE R; FIRE W',
					        'FIRE R; FIRE W'],
                                     fire_name: ['svg_p:text3533-5-2-8'],
                                     draw_data: [['svg_p:path3557-0']],
                                     draw_name: [[],[]] };


        /*
         *  Syntax of behaviors
         */

        sim_p.behaviors.MEM_READ  = { nparameters: 6,
                                        types: ["E", "E", "S", "S", "E"],
                                        operation: function (s_expr)
                                                   {
						      var address = sim_p.states[s_expr[1]].value;
                                                      var dbvalue = sim_p.states[s_expr[2]].value;
                                                      var bw      = sim_p.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim_p.states[s_expr[5]]) ;

                                                      sim_p.signals[s_expr[4]].value = 0;
						      var remain = get_value(sim_p.internal_states.MP_wc);
						      if (
                                                           (typeof sim_p.events.mem[clk-1] != "undefined") &&
						           (sim_p.events.mem[clk-1] > 0)
                                                         ) {
						              remain = sim_p.events.mem[clk-1] - 1;
                                                           }
						      var first_time = typeof sim_p.events.mem[clk] == "undefined" ;
						      sim_p.events.mem[clk] = remain;
                                                      if (remain > 0) {
                                                          return;
                                                      }

                                                      var wordress = address & 0xFFFFFFFC ;
                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
                                                                                       wordress) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
               					      }

                                                      // bit-width
						      dbvalue = main_memory_extractvalues(value,
											 bw,
											 (address & 0x00000003)) ;

                                                      sim_p.states[s_expr[2]].value = (dbvalue >>> 0);
                                                     sim_p.signals[s_expr[4]].value = 1;
				                      show_main_memory(sim_p.internal_states.MP, wordress, full_redraw, false) ;

                                                      // cache
						      if (first_time && (sim_p.internal_states.CM.length > 0)) {
                                                          cache_memory_access(sim_p.internal_states.CM[0], address, "read", clk) ;
                                                      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
					              var verbal = "" ;

						      var address = sim_p.states[s_expr[1]].value;
                                                      var dbvalue = sim_p.states[s_expr[2]].value;
                                                      var bw      = sim_p.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim_p.states[s_expr[5]]) ;

                                                      // bit-width
						      switch (bw)
					              {
					                 case 0: bw_type = "byte" ;
								 break ;
					                 case 1: bw_type = "half" ;
								 break ;
					                 case 2: bw_type = "three bytes" ;
								 break ;
					                 case 3: bw_type = "word" ;
								 break ;
						      }

                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
                                                                                       address) ;
						      if (typeof value === "undefined") {
						   	  value = 0 ;
                                                      }

                                                      verbal = "Try to read a " + bw_type + " from memory " +
							       "at address 0x"  + address.toString(16) + " with value " + value.toString(16) + ". " ;

                                                      return verbal ;
                                                   }
                                      };

        sim_p.behaviors.MEM_WRITE = { nparameters: 6,
                                        types: ["E", "E", "S", "S", "E"],
                                        operation: function (s_expr)
                                                   {
						      var address = sim_p.states[s_expr[1]].value;
                                                      var dbvalue = sim_p.states[s_expr[2]].value;
                                                      var bw      = sim_p.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim_p.states[s_expr[5]]) ;

                                                      sim_p.signals[s_expr[4]].value = 0;
						      var remain = get_value(sim_p.internal_states.MP_wc);
						      if (
                                                           (typeof sim_p.events.mem[clk-1] != "undefined") &&
						           (sim_p.events.mem[clk-1] > 0)
                                                         ) {
						              remain = sim_p.events.mem[clk-1] - 1;
                                                           }
						      var first_time = typeof sim_p.events.mem[clk] == "undefined" ;
						      sim_p.events.mem[clk] = remain;
                                                      if (remain > 0) {
                                                          return;
                                                      }

                                                      var wordress = address & 0xFFFFFFFC ;
                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
                                                                                       wordress) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
               					      }

                                                      // bit-width
						      value = main_memory_updatevalues(value,
									               dbvalue,
									               bw,
									               (address & 0x00000003)) ;

						      // PC
                                                      var origin = '' ;
                                                      var r_value = main_memory_get_program_counter() ;
                                                      if (r_value != null) {
						          origin = 'PC=0x' + r_value.toString(16) ;
                                                      }

						      var melto = {
								     "value":           (value >>> 0),
								     "source_tracking": [ origin ],
								     "comments":        null
							          } ;
                                                      var elto = main_memory_set(sim_p.internal_states.MP,
                                                                                 wordress, 
										 melto) ;

                                                      sim_p.signals[s_expr[4]].value = 1 ;
				                      show_main_memory(sim_p.internal_states.MP, wordress, full_redraw, true) ;

                                                      // cache
						      if (first_time && (sim_p.internal_states.CM.length > 0)) {
                                                          cache_memory_access(sim_p.internal_states.CM[0], address, "write", clk) ;
                                                      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
					              var verbal = "" ;

						      var address = sim_p.states[s_expr[1]].value;
                                                      var dbvalue = sim_p.states[s_expr[2]].value;
                                                      var bw      = sim_p.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim_p.states[s_expr[5]]) ;

                                                      // bit-width
						      switch (bw)
					              {
					                 case 0: bw_type = "byte" ;
								 break ;
					                 case 1: bw_type = "half" ;
								 break ;
					                 case 2: bw_type = "three bytes" ;
								 break ;
					                 case 3: bw_type = "word" ;
								 break ;
						      }

                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
                                                                                       address) ;
						      if (typeof value === "undefined") {
						   	  value = 0 ;
                                                      }

                                                      verbal = "Try to write a " + bw_type + " to memory " +
							       "at address 0x"  + address.toString(16) + " with value " + value.toString(16) + ". " ;

                                                      return verbal ;
                                                   }
                                    };

        sim_p.behaviors.MEMORY_RESET = { nparameters: 1,
                                        operation: function (s_expr)
                                                   {
						      // reset events.mem
                                                      sim_p.events.mem = {} ;
                                                   },
                                           verbal: function (s_expr)
                                                   {
                                                      return "Reset the memory (all values will be zeroes). " ;
                                                   }
                                   };


        /*
         *  Model
	 * (Thanks to Juan Francisco Perez Carrasco for collaborating in the design of the following elements)
	 */

        sim_p.elements.memory = {
			      name:              "Main memory",
			      description:       "Main memory subsystem",
			      type:              "subcomponent",
			      belongs:           "MEMORY",
			      states:            {
						   "addr":      {
								   ref:  "BUS_AB"
								},
						   "data":      {
								   ref:  "BUS_DB"
								},
						   "mrdy":      {
								   ref:  "MRDY"
								}
						 },
			      signals:           {
						   "bw":        {
								   ref:  "BW"
								},
						   "r":         {
								   ref:  "R"
								},
						   "w":         {
								   ref:  "W"
								}
						 },
			      states_inputs:     [ "addr", "data" ],
			      states_outputs:    [ "mrdy", "data" ],
			      signals_inputs:    [ "bw", "r", "w" ],
			      signals_output:    [ ]
		       } ;

        return sim_p ;
}

