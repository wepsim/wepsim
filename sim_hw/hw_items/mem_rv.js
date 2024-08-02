/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve, Juan Banga Pardo
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

function mem_rv_register ( sim_p )
{
        sim_p.components.MEMORY = {
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
					          for (var index in sim_p.internal_states.MP)
						  {
                                                       value = main_memory_getvalue(sim_p.internal_states.MP,
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
                                                  var value = main_memory_getvalue(sim_p.internal_states.MP,
                                                                                   elto) ;
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
        sim_p.internal_states.MP_wc     = 0 ;
        sim_p.internal_states.MP        = {} ;

        sim_p.internal_states.CM_cfg    = [] ;
        sim_p.internal_states.CM        = [] ;


	/*
	 *  States
	 */

	/* INSTRUCTION (RELATED) STATES */
	sim_p.states["RDATA"]  = { name:"RDATA", verbal: "Read data form Instruction Memory (Input Instruction Register)",
                                   visible:false, nbits:"32", value:0,  default_value:0,
                                   draw_data: [] };

	/* DATA (RELATED) STATES */
	sim_p.states["RDATAM"] = { name:"RDATAM", verbal: "Read data form Data Memory (Input OUT Register)",
                                   visible:false, nbits:"32", value:0,  default_value:0,
                                   draw_data: [] };


	/*
	 *  Signals
	 */

	/* DATA MEMORY SIGNALS */
	sim_p.signals.DMR   = { name: "DMR", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
				behavior: [ "NOP",
					    "MEM_READ ALU_WOUT RDATAM WBE CLK; FIRE M5" ],
				fire_name: ['svg_p:text7589','svg_p:text7507'],
				draw_data: [ [],
                                             ['svg_p:path6837-6', 'svg_p:path7073',
                                              'svg_p:path7619', 'svg_p:path7571', 'svg_p:path7573']],
				draw_name: [['svg_p:path7525']] };
	sim_p.signals.DMW   = { name: "DMW", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
				behavior: [ "NOP",
					    "MEM_WRITE ALU_WOUT REG_OUT WBE CLK"],
				fire_name: ['svg_p:text7597','svg_p:text7515'],
				draw_data: [ [],
                                             ['svg_p:path6837-6', 'svg_p:path7073', 'svg_p:path7619',
                                              'svg_p:path7571', 'svg_p:path7573']],
				draw_name: [['svg_p:path7527']] };

	/* INSTRUCTION MEMORY */
	sim_p.signals["IMR"]   = { name: "IMR", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
				   behavior: ["NOP", "READ_IM"],
				   fire_name: ['svg_p:text7213'],
				   draw_data: [['svg_p:path6691', 'svg_p:path6693', 'svg_p:path6691-3-3',
                                                'svg_p:path6711']],
				   draw_name: [['svg_p:path7205']] };


        /*
         *  Syntax of behaviors
         */

        sim_p.behaviors.MEM_READ   = { nparameters: 5,
                                        types: ["E", "E", "S", "E"],
                                        operation: function (s_expr)
                                                   {
						      var address = "0x" + get_value(sim_p.states[s_expr[1]]).toString(16);
                                                      var dbvalue = get_value(sim_p.states[s_expr[2]]);
                                                      var bw      = sim_p.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim_p.states[s_expr[4]]) ;

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

                                                      address = address & 0xFFFFFFFC;
                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
                                                                                       address) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
               					      }

                                                      // BW -> See Tables in Help
                                                      dbvalue = value;

                                                   /* TODO: review BW Tables :-)
                                                      if (bw == 1) {
                                                          var byte_s = 0x0000;
                                                          dbvalue = main_memory_fusionvalues(dbvalue, value, byte_s) ;
                                                      } else if (bw == 2) {
                                                          var byte_s = 0x0004;
                                                          dbvalue = main_memory_fusionvalues(dbvalue, value, byte_s) ;
                                                      }
                                                   */

                                                      set_value(sim_p.states[s_expr[2]], dbvalue >>> 0);
				                      show_main_memory(sim_p.internal_states.MP, address, full_redraw, false) ;

                                                      // cache
						      if (first_time && (sim_p.internal_states.CM.length > 0)) {
                                                          cache_memory_access(sim_p.internal_states.CM[0], address, "read", clk) ;
                                                      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
					              var verbal = "" ;

						      var address = "0x" + get_value(sim_p.states[s_expr[1]]).toString(16);
                                                      var dbvalue = get_value(sim_p.states[s_expr[2]]);
                                                      var bw      = sim_p.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim_p.states[s_expr[4]]) ;

					              var bw_type = "word" ;
                                                      if (bw == 1)
							   bw_type = "byte" ;
                                                      else if (bw == 2)
							   bw_type = "half" ;

                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
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

        sim_p.behaviors.MEM_WRITE  = { nparameters: 5,
                                        types: ["E", "E", "S", "E"],
                                        operation: function (s_expr)
                                                   {
						      var address = "0x" + get_value(sim_p.states[s_expr[1]]).toString(16);
                                                      var dbvalue = get_value(sim_p.states[s_expr[2]]);
                                                      var bw      = sim_p.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim_p.states[s_expr[4]]) ;

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

                                                      address = address & 0xFFFFFFFC;
                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
                                                                                       address) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
                 				      }

                                                      // BW -> See Tables in Help
                                                      if (bw == 1) {
                                                          var byte_s = 0x0000;
                                                          value = main_memory_fusionvalues(value, dbvalue, byte_s) ;
                                                      } else if (bw == 2) {
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
						      var valref = main_memory_set(sim_p.internal_states.MP,
										   address,
									           melto) ;

				                      show_main_memory(sim_p.internal_states.MP, address, full_redraw, true) ;

                                                      // cache
						      if (first_time && (sim_p.internal_states.CM.length > 0)) {
                                                          cache_memory_access(sim_p.internal_states.CM[0], address, "write", clk) ;
                                                      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
					              var verbal = "" ;

						      var address = "0x" + get_value(sim_p.states[s_expr[1]]).toString(16);
                                                      var dbvalue = get_value(sim_p.states[s_expr[2]]);
                                                      var bw      = sim_p.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim_p.states[s_expr[4]]) ;

					              var bw_type = "word" ;
                                                      if (bw == 1)
							  bw_type = "byte" ;
                                                      else if (bw == 2)
							  bw_type = "half" ;

                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
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

        sim_p.behaviors.MEMORY_RESET = { nparameters: 1,
                                        operation: function (s_expr)
                                                   {
						       // reset events.mem
                                                       sim_p.events.mem = {} ;
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

        sim_p.elements.memory = {
			      name:              "Main memory",
			      description:       "Main memory subsystem",
			      type:              "subcomponent",
			      belongs:           "MEMORY",
			      states:            {
						   "addr":      {
								   ref:  "M3_ALU"
								},
						   "wdata":     {
								   ref:  "REG_OUT"
								},
                           "rdata":      {
								   ref:  "RDATAM"
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

        return sim_p ;
}

