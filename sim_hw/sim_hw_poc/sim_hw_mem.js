/*      
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

        poc_components.MEMORY = {
		                  name: "MEMORY", 
		                  version: "1", 
		                  abilities:    [ "MEMORY" ],
				  details_name: [ "MEMORY", "MEMORY_CONFIG" ],
				  details_fire: [ ['svg_p:text3001'], [] ],
		                  write_state: function ( vec ) {
                                                  if (typeof vec.MEMORY == "undefined")
                                                      vec.MEMORY = {} ;

						  var key = 0 ;
						  var value = 0 ;
					          for (var index in poc_internal_states.MP)
						  {
						       value = parseInt(poc_internal_states.MP[index]) ;
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
						  if (typeof poc_internal_states.MP[index] != "undefined") {
						      return "0x" + parseInt(poc_internal_states.MP[index]).toString(16) ;
					          }

					          return null ;
				             }
                            	};


	/*
	 *  Internal States
	 */

        poc_internal_states.segments  = {} ;
        poc_internal_states.MP        = {} ;
        poc_internal_states.MP_wc     = 0 ;


        /*
         *  Signals
         */

        poc_signals.MRDY     = { name: "MRDY", 
                                 visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
                                 depends_on: ["CLK"],
		                 behavior: ["FIRE_IFCHANGED MRDY C", 
					    "FIRE_IFCHANGED MRDY C"],
                                 fire_name: ['svg_p:tspan3916'], 
                                 draw_data: [[], ['svg_p:path3895','svg_p:path3541']], 
                                 draw_name: [[], []]};

        poc_signals.R        = { name: "R", 
                                 visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                 behavior: ["NOP", 
					    "MEM_READ BUS_AB BUS_DB BW MRDY CLK; FIRE M1; FIRE MRDY"],
                                 fire_name: ['svg_p:text3533-5-2'], 
                                 draw_data: [[], ['svg_p:path3557','svg_p:path3571']], 
                                 draw_name: [[], []]};

        poc_signals.W        = { name: "W", 
                                 visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                 behavior: ["NOP", 
					    "MEM_WRITE BUS_AB BUS_DB BW MRDY CLK; FIRE M1; FIRE MRDY"],
                                 fire_name: ['svg_p:text3533-5-08'], 
                                 draw_data: [[], ['svg_p:path3559','svg_p:path3575','svg_p:path3447-7']], 
                                 draw_name: [[], []] };

        poc_signals.BW       = { name: "BW", 
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

        poc_behaviors.MEM_READ      = { nparameters: 6, 
                                        types: ["E", "E", "S", "S", "E"],
                                        operation: function (s_expr) 
                                                   {
						      var address = poc_states[s_expr[1]].value;
                                                      var dbvalue = poc_states[s_expr[2]].value;
                                                      var bw      = poc_signals[s_expr[3]].value;
                                                      var clk     = get_value(poc_states[s_expr[5]].value) ;

                                                      poc_signals[s_expr[4]].value = 0;
						      var remain = get_var(poc_internal_states.MP_wc);
						      if ( 
                                                           (typeof poc_events.mem[clk-1] != "undefined") &&
						           (poc_events.mem[clk-1] > 0) 
                                                         ) {
						              remain = poc_events.mem[clk-1] - 1;
                                                           }
						      poc_events.mem[clk] = remain;
                                                      if (remain > 0) {
                                                          return;
                                                      }

						      var value = 0;
                                                      var wordress = address & 0xFFFFFFFC;
						      if (typeof  poc_internal_states.MP[wordress] != "undefined")
						   	  value = poc_internal_states.MP[wordress];

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

                                                      poc_states[s_expr[2]].value = (dbvalue >>> 0);
                                                     poc_signals[s_expr[4]].value = 1;
				                      show_main_memory(poc_internal_states.MP, wordress, false, false) ;
                                                   },
                                           verbal: function (s_expr) 
                                                   {
					              var verbal = "" ;

						      var address = poc_states[s_expr[1]].value;
                                                      var dbvalue = poc_states[s_expr[2]].value;
                                                      var bw      = poc_signals[s_expr[3]].value;
                                                      var clk     = get_value(poc_states[s_expr[5]].value) ;

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

						      var value = 0 ;
					              if (typeof poc_internal_states.MP[address] != "undefined")
							  value = poc_internal_states.MP[address] ;

                                                      verbal = "Try to read a " + bw_type + " from memory " + 
							       "at address 0x"  + address.toString(16) + " with value " + value.toString(16) + ". " ;

                                                      return verbal ;
                                                   }
                                      };

        poc_behaviors.MEM_WRITE     = { nparameters: 6, 
                                        types: ["E", "E", "S", "S", "E"],
                                        operation: function (s_expr) 
                                                   {
						      var address = poc_states[s_expr[1]].value;
                                                      var dbvalue = poc_states[s_expr[2]].value;
                                                      var bw      = poc_signals[s_expr[3]].value;
                                                      var clk     = get_value(poc_states[s_expr[5]].value) ;

                                                      poc_signals[s_expr[4]].value = 0;
						      var remain = get_var(poc_internal_states.MP_wc);
						      if ( 
                                                           (typeof poc_events.mem[clk-1] != "undefined") &&
						           (poc_events.mem[clk-1] > 0) 
                                                         ) {
						              remain = poc_events.mem[clk-1] - 1;
                                                           }
						      poc_events.mem[clk] = remain;
                                                      if (remain > 0)
                                                          return;

						      var value    = 0;
                                                      var wordress = address & 0xFFFFFFFC;
						      if (typeof  poc_internal_states.MP[wordress] != "undefined")
						   	  value = poc_internal_states.MP[wordress];

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

						      poc_internal_states.MP[wordress] = (value >>> 0) ;
                                                         poc_signals[s_expr[4]].value = 1 ;
				                      show_main_memory(poc_internal_states.MP, wordress, true, true) ;
                                                   },
                                           verbal: function (s_expr) 
                                                   {
					              var verbal = "" ;

						      var address = poc_states[s_expr[1]].value;
                                                      var dbvalue = poc_states[s_expr[2]].value;
                                                      var bw      = poc_signals[s_expr[3]].value;
                                                      var clk     = get_value(poc_states[s_expr[5]].value) ;

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

						      var value = 0 ;
					              if (typeof poc_internal_states.MP[address] != "undefined")
							  value = poc_internal_states.MP[address] ;

                                                      verbal = "Try to write a " + bw_type + " to memory " + 
							       "at address 0x"  + address.toString(16) + " with value " + value.toString(16) + ". " ;

                                                      return verbal ;
                                                   }
                                    };

        poc_behaviors.MEMORY_RESET  = { nparameters: 1,
                                        operation: function (s_expr) 
                                                   {
						      // reset events.mem
                                                      poc_events.mem = {} ;
                                                   },
                                           verbal: function (s_expr) 
                                                   {
                                                      return "Reset the memory (all values will be zeroes). " ;
                                                   }
                                   };

