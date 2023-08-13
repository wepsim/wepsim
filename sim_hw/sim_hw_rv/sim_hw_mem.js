/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve, Juan Banga Pardo
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

        sim.rv.components.MEMORY = {
		                  name: "MEMORY",
		                  version: "1",
		                  abilities:    [ "MEMORY" ],

		                  // ui: details
                                  details_name: [ "MEMORY", "MEMORY_CONFIG" ],
                                  details_fire: [ ['svg_p:text7483'], [] ],

		                  // state: write_state, read_state, get_state
		                  write_state: function ( vec ) {
                                                  if (typeof vec.MEMORY == "undefined")
                                                      vec.MEMORY = {} ;

						  var key = 0 ;
						  var value = 0 ;
					          for (var index in sim.rv.internal_states.MP)
						  {
                                                       value = main_memory_getvalue(sim.rv.internal_states.MP,
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
                                                  var value = main_memory_getvalue(sim.rv.internal_states.MP,
                                                                                   elto) ;
                                                  if (typeof value === "undefined") {
					              return null ;
					          }
                                                  return "0x" + parseInt(value).toString(16) ;
				             },

		                  // native: get_value, set_value
		                  get_value: function ( elto ) {
                                                 var value = main_memory_getvalue(sim.rv.internal_states.MP,
                                                                                  elto) ;
				                 show_main_memory(sim.rv.internal_states.MP, elto, false,false) ;
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
                                                 var valref = main_memory_set(sim.rv.internal_states.MP,
                                                                              elto, 
									      melto) ;

				                 show_main_memory(sim.rv.internal_states.MP,
                                                                  elto, 
                                                                  (typeof valref === "undefined"),
                                                                  true) ;

						 return value ;
				             }
                            	};


	/*
	 *  Internal States
	 */

        sim.rv.internal_states.segments  = {} ;
        sim.rv.internal_states.MP_wc     = 0 ;
        sim.rv.internal_states.MP        = {} ;

        sim.rv.internal_states.CM_cfg    = [] ;
        sim.rv.internal_states.CM        = [] ;

        /*
         *  Syntax of behaviors
         */

        sim.rv.behaviors.MEM_READ   = { nparameters: 5,
                                        types: ["E", "E", "S", "E"],
                                        operation: function (s_expr)
                                                   {
						      var address = "0x" + get_value(sim.rv.states[s_expr[1]]).toString(16);
                                                      var dbvalue = get_value(sim.rv.states[s_expr[2]]);
                                                      var bw      = sim.rv.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.rv.states[s_expr[4]]) ;

						      var remain = get_value(sim.rv.internal_states.MP_wc);
						      if (
                                                           (typeof sim.rv.events.mem[clk-1] != "undefined") &&
						           (sim.rv.events.mem[clk-1] > 0)
                                                         ) {
						              remain = sim.rv.events.mem[clk-1] - 1;
                                                           }
						      var first_time = typeof sim.rv.events.mem[clk] == "undefined" ;
						      sim.rv.events.mem[clk] = remain;
                                                      if (remain > 0) {
                                                          return;
                                                      }

                                                      address = address & 0xFFFFFFFC;
                                                      var value = main_memory_getvalue(sim.rv.internal_states.MP,
                                                                                       address) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
               					      }

                                                      // BW -> See Tables in Help
                                                      if ( bw == 1 ) {
                                                        var byte_s = 0x0000;
                                                        dbvalue = main_memory_fusionvalues(dbvalue, value, byte_s) ;
                                                      } else if ( bw == 2 ) {
                                                        var byte_s = 0x0004;
                                                        dbvalue = main_memory_fusionvalues(dbvalue, value, byte_s) ;
                                                      } else {
                                                        dbvalue = value;
                                                      }

                                                      set_value(sim.rv.states[s_expr[2]], dbvalue >>> 0);
				                      show_main_memory(sim.rv.internal_states.MP, address, full_redraw, false) ;

                                                      // cache
						      if (first_time && (sim.rv.internal_states.CM.length > 0)) {
                                                          cache_memory_access(sim.rv.internal_states.CM[0], address, "read", clk) ;
                                                      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
					              var verbal = "" ;

						      var address = "0x" + get_value(sim.rv.states[s_expr[1]]).toString(16);
                                                      var dbvalue = get_value(sim.rv.states[s_expr[2]]);
                                                      var bw      = sim.rv.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.rv.states[s_expr[4]]) ;

					              var bw_type = "word" ;
                                                           if ( bw == 1 )
							  bw_type = "byte" ;
                                                       else if ( bw == 2 )
							  bw_type = "half" ;

                                                      var value = main_memory_getvalue(sim.rv.internal_states.MP,
                                                                                       address) ;
                                                      if (typeof value === "undefined")
                                                          value = 0 ;

                                                      var verbose = get_cfg('verbal_verbose') ;
                                                      if (verbose !== 'math') {
                                                          verbal = "Try to read a " + bw_type + " from memory " +
							           "at address "  + address + " with value 0x" + value.toString(16) + ". " ;
                                                      }

                                                      verbal = "Memory output = 0x" + value.toString(16) +
                                                               " (Read a " + bw_type + " from " + address + "). " ;

                                                      return verbal ;
                                                   }
                                      };

        sim.rv.behaviors.MEM_WRITE  = { nparameters: 5,
                                        types: ["E", "E", "S", "E"],
                                        operation: function (s_expr)
                                                   {
						      var address = "0x" + get_value(sim.rv.states[s_expr[1]]).toString(16);
                                                      var dbvalue = get_value(sim.rv.states[s_expr[2]]);
                                                      var bw      = sim.rv.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.rv.states[s_expr[4]]) ;

						      var remain = get_value(sim.rv.internal_states.MP_wc);
						      if (
                                                           (typeof sim.rv.events.mem[clk-1] != "undefined") &&
						           (sim.rv.events.mem[clk-1] > 0)
                                                         ) {
						              remain = sim.rv.events.mem[clk-1] - 1;
                                                           }
						      var first_time = typeof sim.rv.events.mem[clk] == "undefined" ;
						      sim.rv.events.mem[clk] = remain;
                                                      if (remain > 0) {
                                                          return;
                                                      }

                                                      address = address & 0xFFFFFFFC;
                                                      var value = main_memory_getvalue(sim.rv.internal_states.MP,
                                                                                       address) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
                 				      }

                                                      // BW -> See Tables in Help
                                                      if ( bw == 1 ) {
                                                        var byte_s = 0x0000;
                                                        value = main_memory_fusionvalues(value, dbvalue, byte_s) ;
                                                      } else if ( bw == 2 ) {
                                                        var byte_s = 0x0004;
                                                        value = main_memory_fusionvalues(value, dbvalue, byte_s) ;
                                                      } else {
                                                        var byte_s = 0x000C;
                                                        value = main_memory_fusionvalues(value, dbvalue, byte_s) ;
                                                      }

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
						      var valref = main_memory_set(sim.rv.internal_states.MP,
										   address,
									           melto) ;

				                      show_main_memory(sim.rv.internal_states.MP, address, full_redraw, true) ;

                                                      // cache
						      if (first_time && (sim.rv.internal_states.CM.length > 0)) {
                                                          cache_memory_access(sim.rv.internal_states.CM[0], address, "write", clk) ;
                                                      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
					              var verbal = "" ;

						      var address = "0x" + get_value(sim.rv.states[s_expr[1]]).toString(16);
                                                      var dbvalue = get_value(sim.rv.states[s_expr[2]]);
                                                      var bw      = sim.rv.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.rv.states[s_expr[4]]) ;

					              var bw_type = "word" ;
                                                           if ( bw == 1 )
							  bw_type = "byte" ;
                                                       else if ( bw == 2 )
							  bw_type = "half" ;

                                                      var value = main_memory_getvalue(sim.rv.internal_states.MP,
                                                                                       address) ;
                                                      if (typeof value === "undefined")
                                                          value = 0 ;

                                                      var verbose = get_cfg('verbal_verbose') ;
                                                      if (verbose !== 'math') {
                                                          verbal = "Try to write a " + bw_type + " to memory " +
							           "at address "  + address + " with value " + value.toString(16) + ". " ;
                                                      }

                                                      verbal = "Memory[" + address + "] = " + "0x" + value.toString(16) +
                                                               " (Write a " + bw_type + " to " + address + "). " ;

                                                      return verbal ;
                                                   }
                                    };

        sim.rv.behaviors.MEMORY_RESET = { nparameters: 1,
                                        operation: function (s_expr)
                                                   {
						       // reset events.mem
                                                       sim.rv.events.mem = {} ;
                                                   },
                                           verbal: function (s_expr)
                                                   {
                                                       return "Reset main memory (all values will be zeroes). " ;
                                                   }
                                   };


        /*
         *  Model
	 * (Thanks to Juan Francisco Perez Carrasco for collaborating in the design of the following elements)
	 */

        sim.rv.elements.memory = {
			      name:              "Main memory",
			      description:       "Main memory subsystem",
			      type:              "subcomponent",
			      belongs:           "MEMORY",
			      states:            {
						   "addr":      {
								   ref:  "M3_ALU"
								},
						   "wdata":      {
								   ref:  "REG_OUT"
								},
                           "rdata":      {
								   ref:  "DM_BS"
								}
						 },
			      signals:           {
						   "wbe":        {
								   ref:  "WBE"
								},
						   "dmr":         {
								   ref:  "DMR"
								},
						   "dmw":         {
								   ref:  "DMW"
								}
						 },
			      states_inputs:     [ "addr", "wdata" ],
			      states_outputs:    [ "rdata" ],
			      signals_inputs:    [ "wbe", "dmr", "dmw" ],
			      signals_output:    [ ]
		       } ;

