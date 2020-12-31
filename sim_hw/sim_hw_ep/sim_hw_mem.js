/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

        sim.ep.components.MEMORY = {
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
					          for (var index in sim.ep.internal_states.MP)
						  {
                                                       value = main_memory_getvalue(sim.ep.internal_states.MP,
                                                                                    index) ;
                                                       value = parseInt(value) ;
						       if (value != 0)
						       {
					                   key = parseInt(index).toString(16) ;
							   vec.MEMORY["0x" + key] = {"type":  "memory",
								                     "default_value": 0x0,
								                     "id":    "0x" + key,
								                     "op":    "=",
								                     "value": "0x" + value.toString(16)} ;
						       }
						  }

						  return vec;
				              },
		                  read_state: function ( vec, check ) {
                                                  if (typeof vec.MEMORY == "undefined")
                                                      vec.MEMORY = {} ;

					          var key = parseInt(check.id).toString(16) ;
					          var val = parseInt(check.value).toString(16) ;
					          if ("MEMORY" == check.type.toUpperCase().trim())
                                                  {
						      vec.MEMORY["0x" + key] = {"type":  "memory",
							  	                "default_value": 0x0,
								                "id":    "0x" + key,
								                "op":    check.condition,
								                "value": "0x" + val} ;
                                                      return true ;
                                                  }

                                                  return false ;
				             },
		                  get_state: function ( pos ) {
						  var index = parseInt(pos) ;
                                                  var value = main_memory_getvalue(sim.ep.internal_states.MP,
                                                                                   elto) ;
                                                  if (typeof value === "undefined") {
					              return null ;
					          }
                                                  return "0x" + parseInt(value).toString(16) ;
				             },

		                  // native: get_value, set_value
		                  get_value: function ( elto ) {
                                                 var value = main_memory_getvalue(sim.ep.internal_states.MP,
                                                                                  elto) ;
				                 show_main_memory(sim.ep.internal_states.MP, elto, false,false) ;
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
                                                 var valref = main_memory_set(sim.ep.internal_states.MP,
                                                                              elto, 
									      melto) ;

				                 show_main_memory(sim.ep.internal_states.MP, 
                                                                  elto, 
                                                                  (typeof valref === "undefined"),
                                                                  true) ;

						 return value ;
				             }
                            	};


	/*
	 *  Internal States
	 */

        sim.ep.internal_states.segments  = {} ;
        sim.ep.internal_states.MP        = {} ;
        sim.ep.internal_states.MP_wc     = 0 ;


        /*
         *  Signals
         */

        sim.ep.signals.MRDY      = { name: "MRDY",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
                                     depends_on: ["CLK"],
	    	                     behavior: ["FIRE_IFCHANGED MRDY C", "FIRE_IFCHANGED MRDY C"],
                                     fire_name: ['svg_p:tspan3916','svg_p:text3909'],
                                     draw_data: [[], ['svg_p:path3895','svg_p:path3541']],
                                     draw_name: [[], []]};

        sim.ep.signals.R         = { name: "R",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		                     behavior: ["NOP", "MEM_READ BUS_AB BUS_DB BWA MRDY CLK; FIRE MRDY"],
                                     fire_name: ['svg_p:text3533-5-2','svg_p:text3713'],
                                     draw_data: [[], ['svg_p:path3557','svg_p:path3571']],
                                     draw_name: [[], []]};

        sim.ep.signals.W         = { name: "W",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		                     behavior: ["NOP", "MEM_WRITE BUS_AB BUS_DB BWA MRDY CLK; FIRE MRDY"],
                                     fire_name: ['svg_p:text3533-5-08','svg_p:text3527','svg_p:text3431-7'],
                                     draw_data: [[], ['svg_p:path3559','svg_p:path3575','svg_p:path3447-7']],
                                     draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        sim.ep.behaviors.MEM_READ   = { nparameters: 6,
                                        types: ["E", "E", "S", "S", "E"],
                                        operation: function (s_expr)
                                                   {
						      var address = sim.ep.states[s_expr[1]].value;
                                                      var dbvalue = sim.ep.states[s_expr[2]].value;
                                                      var bw      = sim.ep.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.ep.states[s_expr[5]].value) ;

                                                      sim.ep.signals[s_expr[4]].value = 0;
						      var remain = get_var(sim.ep.internal_states.MP_wc);
						      if (
                                                           (typeof sim.ep.events.mem[clk-1] != "undefined") &&
						           (sim.ep.events.mem[clk-1] > 0)
                                                         ) {
						              remain = sim.ep.events.mem[clk-1] - 1;
                                                           }
						      sim.ep.events.mem[clk] = remain;
                                                      if (remain > 0) {
                                                          return;
                                                      }

                                                      address = address & 0xFFFFFFFC;
                                                      var value = main_memory_getvalue(sim.ep.internal_states.MP,
                                                                                       address) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
               					      }

                                                      // BW -> See Tables in Help
                                                      dbvalue = main_memory_fusionvalues(dbvalue, value, bw) ;

                                                      sim.ep.states[s_expr[2]].value = (dbvalue >>> 0);
                                                     sim.ep.signals[s_expr[4]].value = 1;
				                      show_main_memory(sim.ep.internal_states.MP, address, full_redraw, false) ;
                                                   },
                                           verbal: function (s_expr)
                                                   {
					              var verbal = "" ;

						      var address = sim.ep.states[s_expr[1]].value;
                                                      var dbvalue = sim.ep.states[s_expr[2]].value;
                                                      var bw      = sim.ep.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.ep.states[s_expr[5]].value) ;

					              var bw_type = "word" ;
                                                           if ( 0 == (bw & 0x0000000C) )
							  bw_type = "byte" ;
                                                      else if ( 1 == (bw & 0x0000000C) )
							  bw_type = "half" ;

                                                      var value = main_memory_getvalue(sim.ep.internal_states.MP,
                                                                                       address) ;
                                                      if (typeof value === "undefined")
                                                          value = 0 ;

                                                      var verbose = get_cfg('verbal_verbose') ;
                                                      if (verbose !== 'math') {
                                                          verbal = "Try to read a " + bw_type + " from memory " +
							           "at address 0x"  + address.toString(16) + " with value 0x" + value.toString(16) + ". " ;
                                                      }

                                                      verbal = "Memory output = 0x" + value.toString(16) +
                                                               " (Read a " + bw_type +
							       " from 0x" + address.toString(16)  + "). " ;

                                                      return verbal ;
                                                   }
                                      };

        sim.ep.behaviors.MEM_WRITE  = { nparameters: 6,
                                        types: ["E", "E", "S", "S", "E"],
                                        operation: function (s_expr)
                                                   {
						      var address = sim.ep.states[s_expr[1]].value;
                                                      var dbvalue = sim.ep.states[s_expr[2]].value;
                                                      var bw      = sim.ep.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.ep.states[s_expr[5]].value) ;

                                                      sim.ep.signals[s_expr[4]].value = 0;
						      var remain = get_var(sim.ep.internal_states.MP_wc);
						      if (
                                                           (typeof sim.ep.events.mem[clk-1] != "undefined") &&
						           (sim.ep.events.mem[clk-1] > 0)
                                                         ) {
						              remain = sim.ep.events.mem[clk-1] - 1;
                                                           }
						      sim.ep.events.mem[clk] = remain;
                                                      if (remain > 0) {
                                                          return;
                                                      }

                                                      address = address & 0xFFFFFFFC;
                                                      var value = main_memory_getvalue(sim.ep.internal_states.MP,
                                                                                       address) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
                 				      }

                                                      // BW -> See Tables in Help
                                                      value = main_memory_fusionvalues(value, dbvalue, bw) ;

						      // PC
						      var origin = '' ;
                                                      var r_value = main_memory_get_program_counter() ;
                                                      if (r_value != null) {
						          origin = 'PC=0x' + r_value.toString(16) ;
						      }

						      // set memory value+source
						      var melto = {
								     "value":           (value >>> 0),
								     "source_tracking": [ origin ],
								     "comments":        null
							          } ;
						      var valref = main_memory_set(sim.ep.internal_states.MP, 
										   address,
									           melto) ;

                                                      sim.ep.signals[s_expr[4]].value = 1;
				                      show_main_memory(sim.ep.internal_states.MP, address, full_redraw, true) ;
                                                   },
                                           verbal: function (s_expr)
                                                   {
					              var verbal = "" ;

						      var address = sim.ep.states[s_expr[1]].value;
                                                      var dbvalue = sim.ep.states[s_expr[2]].value;
                                                      var bw      = sim.ep.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.ep.states[s_expr[5]].value) ;

					              var bw_type = "word" ;
                                                           if ( 0 == (bw & 0x0000000C) )
							  bw_type = "byte" ;
                                                      else if ( 1 == (bw & 0x0000000C) )
							  bw_type = "half" ;

                                                      var value = main_memory_getvalue(sim.ep.internal_states.MP,
                                                                                       address) ;
                                                      if (typeof value === "undefined")
                                                          value = 0 ;

                                                      var verbose = get_cfg('verbal_verbose') ;
                                                      if (verbose !== 'math') {
                                                          verbal = "Try to write a " + bw_type + " to memory " +
							           "at address 0x"  + address.toString(16) +
                                                                   " with value " + value.toString(16) + ". " ;
                                                      }

                                                      verbal = "Memory[0x" + address.toString(16) + "] = " +
							       "0x" + value.toString(16) +
                                                               " (Write a " + bw_type +
							       " to 0x" + address.toString(16)  + "). " ;

                                                      return verbal ;
                                                   }
                                    };

        sim.ep.behaviors.MEMORY_RESET = { nparameters: 1,
                                        operation: function (s_expr)
                                                   {
						       // reset events.mem
                                                       sim.ep.events.mem = {} ;
                                                   },
                                           verbal: function (s_expr)
                                                   {
                                                       return "Reset main memory (all values will be zeroes). " ;
                                                   }
                                   };

