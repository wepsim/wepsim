/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

        sim.poc.components.MEMORY = {
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
					          for (var index in sim.poc.internal_states.MP)
						  {
                                                       value = main_memory_getvalue(sim.poc.internal_states.MP,
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
                                                  var value = main_memory_getvalue(sim.poc.internal_states.MP,
                                                                                   index) ;
						  if (typeof value === "undefined") {
					              return null ;
					          }

						  return "0x" + parseInt(value).toString(16) ;
				             },

		                  // native: get_value, set_value
		                  get_value: function ( elto ) {
                                                 var value = main_memory_getvalue(sim.poc.internal_states.MP,
                                                                                  elto) ;
				                 show_main_memory(sim.poc.internal_states.MP, elto, false,false) ;
                                                 return (value >>> 0) ;
				             },
		                  set_value: function ( elto, value ) {
						 // PC
						 var origin = '' ;
                                                 var r_value = main_memory_get_program_counter() ;
                                                 if (r_value != null) {
						     origin = 'PC=0x' + r_value.toString(16) ;
						 }

                                                 var valref = main_memory_set(sim.poc.internal_states.MP,
                                                                              elto, 
								              (value >>> 0), 
								              origin) ;
				                 show_main_memory(sim.poc.internal_states.MP, 
                                                                  elto, 
                                                                  (typeof valref === "undefined"),
                                                                  true) ;

						 return value ;
				             }
                            	};


	/*
	 *  Internal States
	 */

        sim.poc.internal_states.segments  = {} ;
        sim.poc.internal_states.MP        = {} ;
        sim.poc.internal_states.MP_wc     = 0 ;


        /*
         *  Signals
         */

        sim.poc.signals.MRDY     = { name: "MRDY",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
                                     depends_on: ["CLK"],
		                     behavior: ["FIRE_IFCHANGED MRDY C",
					        "FIRE_IFCHANGED MRDY C"],
                                     fire_name: ['svg_p:tspan3916'],
                                     draw_data: [[], ['svg_p:path3895','svg_p:path3541']],
                                     draw_name: [[], []]};

        sim.poc.signals.R        = { name: "R",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		                     behavior: ["NOP",
					        "MEM_READ BUS_AB BUS_DB BW MRDY CLK; FIRE M1; FIRE MRDY"],
                                     fire_name: ['svg_p:text3533-5-2'],
                                     draw_data: [[], ['svg_p:path3557','svg_p:path3571']],
                                     draw_name: [[], []]};

        sim.poc.signals.W        = { name: "W",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		                     behavior: ["NOP",
					        "MEM_WRITE BUS_AB BUS_DB BW MRDY CLK; FIRE M1; FIRE MRDY"],
                                     fire_name: ['svg_p:text3533-5-08'],
                                     draw_data: [[], ['svg_p:path3559','svg_p:path3575','svg_p:path3447-7']],
                                     draw_name: [[], []] };

        sim.poc.signals.BW       = { name: "BW",
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

        sim.poc.behaviors.MEM_READ  = { nparameters: 6,
                                        types: ["E", "E", "S", "S", "E"],
                                        operation: function (s_expr)
                                                   {
						      var address = sim.poc.states[s_expr[1]].value;
                                                      var dbvalue = sim.poc.states[s_expr[2]].value;
                                                      var bw      = sim.poc.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.poc.states[s_expr[5]].value) ;

                                                      sim.poc.signals[s_expr[4]].value = 0;
						      var remain = get_var(sim.poc.internal_states.MP_wc);
						      if (
                                                           (typeof sim.poc.events.mem[clk-1] != "undefined") &&
						           (sim.poc.events.mem[clk-1] > 0)
                                                         ) {
						              remain = sim.poc.events.mem[clk-1] - 1;
                                                           }
						      sim.poc.events.mem[clk] = remain;
                                                      if (remain > 0) {
                                                          return;
                                                      }

                                                      var wordress = address & 0xFFFFFFFC ;
                                                      var value = main_memory_getvalue(sim.poc.internal_states.MP,
                                                                                       wordress) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
               					      }

                                                      // bit-width
						      switch (bw)
					              {
					                 case 0: // byte
								 if ( 0 == (address & 0x00000003) )
									dbvalue = (value & 0x000000FF) ;
								 if ( 1 == (address & 0x00000003) )
									dbvalue = (value & 0x0000FF00) >> 8 ;
								 if ( 2 == (address & 0x00000003) )
									dbvalue = (value & 0x00FF0000) >> 16 ;
								 if ( 3 == (address & 0x00000003) )
									dbvalue = (value & 0xFF000000) >> 24 ;
								 break ;
					                 case 1: // half
								 if ( 0 == (address & 0x00000003) )
									dbvalue = (value & 0x0000FFFF) ;
								 if ( 1 == (address & 0x00000003) )
									dbvalue = (value & 0x0000FFFF) ;
								 if ( 2 == (address & 0x00000003) )
									dbvalue = (value & 0xFFFF0000) >> 16 ;
								 if ( 3 == (address & 0x00000003) )
									dbvalue = (value & 0xFFFF0000) >> 16 ;
								 break ;
					                 case 2: // 3-bytes (for 0, 1)
								 if ( 0 == (address & 0x00000003) )
									dbvalue = (value & 0x00FFFFFF) ;
								 if ( 1 == (address & 0x00000003) )
									dbvalue = (value & 0xFFFFFF00) ;
								 break ;
					                 case 3: // word
								 dbvalue = value ;
								 break ;
						      }

                                                      sim.poc.states[s_expr[2]].value = (dbvalue >>> 0);
                                                     sim.poc.signals[s_expr[4]].value = 1;
				                      show_main_memory(sim.poc.internal_states.MP, wordress, full_redraw, false) ;
                                                   },
                                           verbal: function (s_expr)
                                                   {
					              var verbal = "" ;

						      var address = sim.poc.states[s_expr[1]].value;
                                                      var dbvalue = sim.poc.states[s_expr[2]].value;
                                                      var bw      = sim.poc.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.poc.states[s_expr[5]].value) ;

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

                                                      var value = main_memory_getvalue(sim.poc.internal_states.MP,
                                                                                       address) ;
						      if (typeof value === "undefined") {
						   	  value = 0 ;
                                                      }

                                                      verbal = "Try to read a " + bw_type + " from memory " +
							       "at address 0x"  + address.toString(16) + " with value " + value.toString(16) + ". " ;

                                                      return verbal ;
                                                   }
                                      };

        sim.poc.behaviors.MEM_WRITE = { nparameters: 6,
                                        types: ["E", "E", "S", "S", "E"],
                                        operation: function (s_expr)
                                                   {
						      var address = sim.poc.states[s_expr[1]].value;
                                                      var dbvalue = sim.poc.states[s_expr[2]].value;
                                                      var bw      = sim.poc.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.poc.states[s_expr[5]].value) ;

                                                      sim.poc.signals[s_expr[4]].value = 0;
						      var remain = get_var(sim.poc.internal_states.MP_wc);
						      if (
                                                           (typeof sim.poc.events.mem[clk-1] != "undefined") &&
						           (sim.poc.events.mem[clk-1] > 0)
                                                         ) {
						              remain = sim.poc.events.mem[clk-1] - 1;
                                                           }
						      sim.poc.events.mem[clk] = remain;
                                                      if (remain > 0)
                                                          return;

                                                      var wordress = address & 0xFFFFFFFC ;
                                                      var value = main_memory_getvalue(sim.poc.internal_states.MP,
                                                                                       wordress) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
               					      }

                                                      // bit-width
						      switch (bw)
					              {
					                 case 0: // byte
								 if ( 0 == (address & 0x00000003) )
									value = (value & 0xFFFFFF00) |  (dbvalue & 0x000000FF)  ;
								 if ( 1 == (address & 0x00000003) )
									value = (value & 0xFFFF00FF) | ((dbvalue & 0x000000FF) << 8) ;
								 if ( 2 == (address & 0x00000003) )
									value = (value & 0xFF00FFFF) | ((dbvalue & 0x000000FF) << 16) ;
								 if ( 3 == (address & 0x00000003) )
									value = (value & 0x00FFFFFF) | ((dbvalue & 0x000000FF) << 24) ;
								 break ;
					                 case 1: // half
								 if ( 0 == (address & 0x00000003) )
									value = (value & 0xFFFF0000) |  (dbvalue & 0x0000FFFF) ;
								 if ( 1 == (address & 0x00000003) )
									value = (value & 0xFFFF0000) |  (dbvalue & 0x0000FFFF) ;
								 if ( 2 == (address & 0x00000003) )
									value = (value & 0x0000FFFF) | ((dbvalue & 0x0000FFFF) << 16) ;
								 if ( 3 == (address & 0x00000003) )
									value = (value & 0x0000FFFF) | ((dbvalue & 0x0000FFFF) << 16) ;
								 break ;
					                 case 2: // 3-bytes (for 0, 1)
								 if ( 0 == (address & 0x00000003) )
									value = (value & 0xFF000000) | (dbvalue & 0x00FFFFFF) ;
								 if ( 1 == (address & 0x00000003) )
									value = (value & 0x000000FF) | (dbvalue & 0xFFFFFF00) ;
								 break ;
					                 case 3: // word
								 value = dbvalue ;
								 break ;
						      }

						      // PC
                                                      var origin = '' ;
                                                      var r_value = main_memory_get_program_counter() ;
                                                      if (r_value != null) {
						          origin = 'PC=0x' + r_value.toString(16) ;
                                                      }

                                                      var elto = main_memory_set(sim.poc.internal_states.MP,
                                                                                 wordress,
                                                                                 (value >>> 0),
              							                 origin) ;
                                                      sim.poc.signals[s_expr[4]].value = 1 ;
				                      show_main_memory(sim.poc.internal_states.MP, wordress, full_redraw, true) ;
                                                   },
                                           verbal: function (s_expr)
                                                   {
					              var verbal = "" ;

						      var address = sim.poc.states[s_expr[1]].value;
                                                      var dbvalue = sim.poc.states[s_expr[2]].value;
                                                      var bw      = sim.poc.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim.poc.states[s_expr[5]].value) ;

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

                                                      var value = main_memory_getvalue(sim.poc.internal_states.MP,
                                                                                       address) ;
						      if (typeof value === "undefined") {
						   	  value = 0 ;
                                                      }

                                                      verbal = "Try to write a " + bw_type + " to memory " +
							       "at address 0x"  + address.toString(16) + " with value " + value.toString(16) + ". " ;

                                                      return verbal ;
                                                   }
                                    };

        sim.poc.behaviors.MEMORY_RESET = { nparameters: 1,
                                        operation: function (s_expr)
                                                   {
						      // reset events.mem
                                                      sim.poc.events.mem = {} ;
                                                   },
                                           verbal: function (s_expr)
                                                   {
                                                      return "Reset the memory (all values will be zeroes). " ;
                                                   }
                                   };

