/*
 *  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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

function mem_ep2_register ( sim_p )
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

	sim_p.states["MAR_MEM_R"] = { name:"MAR_MEM_R", verbal: "Internal memory address register for reading",
                                      visible:false, nbits:"32", value:0,  default_value:0,
                                      draw_data: [] };


        /*
         *  Signals
         */

        sim_p.signals.MMR        = { name: "MMR",
                                     visible: false, type: "E", value: 0, default_value:0, nbits: "1",
                                     depends_on: ["CLK"],
                                     behavior:  ["MV MAR_MEM_R BUS_AB", "MV MAR_MEM_R BUS_AB"],
                                     fire_name: [],
                                     draw_data: [[], []],
                                     draw_name: [[], []] };
        sim_p.signals.MRDY      = { name: "MRDY",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
                                     depends_on: ["CLK"],
                                     behavior:  ["FIRE_IFCHANGED MRDY C", "FIRE_IFCHANGED MRDY C"],
                                     fire_name: ['svg_p:tspan3916','svg_p:text3909'],
                                     draw_data: [[], ['svg_p:path3895','svg_p:path3541']],
                                     draw_name: [[], []] };
        sim_p.signals.R         = { name: "R",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
                                     behavior: ["NOP; CHECK_RTD",
                                                "MEM_READ MAR_MEM_R BUS_DB BWA MRDY CLK; FIRE MRDY; CHECK_RTD"],
                                     fire_name: ['svg_p:text3533-5-2','svg_p:text3713'],
                                     draw_data: [[], ['svg_p:path3557','svg_p:path3571']],
                                     draw_name: [[], []] };
        sim_p.signals.W         = { name: "W",
                                     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
                                     behavior: ["NOP",
                                                "MEM_WRITE BUS_AB BUS_DB BWA MRDY CLK; FIRE MRDY"],
                                     fire_name: ['svg_p:text3533-5-08','svg_p:text3527'],
                                     draw_data: [[], ['svg_p:path3559','svg_p:path3575']],
                                     draw_name: [[], []] };

	/* W-Byte & R-Byte Selector */
	 sim_p.signals["BW"]     =  { name: "BW",
		                      verbal: ['Select one byte (based on A1A0) from Word. ',
                                               'Select two bytes (one Half Word based on A1A0) from Word. ',
                                               '',
                                               'Select the full Word. '],
                                      visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
		                      behavior: ['MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW',
				                 'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW',
				                 'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW',
				                 'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW'],
				       fire_name: ['svg_p:text3533-5'],
				       draw_data: [['svg_p:path3061-2-6','svg_p:path3101-8','svg_p:path3535-8']],
				       draw_name: [[],[]] };
	 sim_p.signals["A1A0"]     = { name: "A1A0", visible: false, type: "L", value: 0, default_value: 0, nbits: "2",
				       behavior: ['MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					          'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					          'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					          'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA'],
				       fire_name: [],
				       draw_data: [[],[]],
				       draw_name: [[],[]] };

	 sim_p.signals["DB_UPDATED"] = { name: "DB_UPDATED", visible: false, type: "L", value: 0, default_value:0, nbits: "1",
			              behavior: ['FIRE BW',
					         'FIRE SBWA'],
			              fire_name: [],
			              draw_data: [[]],
			              draw_name: [[]] };

	 sim_p.signals["BWA"]    = { name: "BWA", visible: false, type: "L", value: 0, default_value: 0, nbits: "4",
				    behavior: ['BSEL BS_TD 0 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'BSEL BS_TD 8 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'BSEL BS_TD 16 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'BSEL BS_TD 24 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					       'MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W',
					       'MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W',
					       'MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W',
					       'MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W'],
				     fire_name: [],
				     draw_data: [[],[]],
				     draw_name: [[],[]] };
	 sim_p.signals["SBWA"] = { name: "SBWA", visible: false, type: "L", value: 0, default_value: 0, nbits: "5",
				    behavior: ['BSEL BS_M1 0 8 BUS_DB 0; FIRE M1',
					       'BSEL BS_M1 0 8 BUS_DB 8; FIRE M1',
					       'BSEL BS_M1 0 8 BUS_DB 16; FIRE M1',
					       'BSEL BS_M1 0 8 BUS_DB 24; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 0; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 0; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 0; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 0; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 16; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 16; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 16; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 16; FIRE M1',
					       'MV BS_M1 BUS_DB; FIRE M1',
					       'MV BS_M1 BUS_DB; FIRE M1',
					       'MV BS_M1 BUS_DB; FIRE M1',
					       'MV BS_M1 BUS_DB; FIRE M1',
					       'BSEL BS_M1 0 8 BUS_DB 0; EXT_SIG BS_M1 7; FIRE M1',
					       'BSEL BS_M1 0 8 BUS_DB 8; EXT_SIG BS_M1 7; FIRE M1',
					       'BSEL BS_M1 0 8 BUS_DB 16; EXT_SIG BS_M1 7; FIRE M1',
					       'BSEL BS_M1 0 8 BUS_DB 24; EXT_SIG BS_M1 7; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1',
					       'BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1',
					       'MV BS_M1 BUS_DB; FIRE M1',
					       'MV BS_M1 BUS_DB; FIRE M1',
					       'MV BS_M1 BUS_DB; FIRE M1',
					       'MV BS_M1 BUS_DB; FIRE M1'],
				    fire_name: [],
				    draw_data: [[],[]],
				    draw_name: [[],[]] };


        /*
         *  Syntax of behaviors
         */

        sim_p.behaviors.MEM_READ   = { nparameters: 6,
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

                                                      address = address & 0xFFFFFFFC;
                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
                                                                                       address) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
                                                      }

                                                      // BW -> See Tables in Help
                                                      dbvalue = main_memory_fusionvalues(dbvalue, value, bw) ;

                                                      sim_p.states[s_expr[2]].value = (dbvalue >>> 0);
                                                     sim_p.signals[s_expr[4]].value = 1;
                                                      show_main_memory(sim_p.internal_states.MP, address, full_redraw, false) ;

                                                      // cache
                                                      if (first_time)
					              {
							  for (var i=0; i<sim_p.internal_states.CM.length; i++)
							  {
							       if (1 == sim_p.internal_states.CM[i].cfg.level) {
                                                                   cache_memory_access(sim_p.internal_states.CM[i], address, "read", clk) ;
							       }
							  }
                                                      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
                                                      var verbal = "" ;

                                                      var address = sim_p.states[s_expr[1]].value;
                                                      var dbvalue = sim_p.states[s_expr[2]].value;
                                                      var bw      = sim_p.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim_p.states[s_expr[5]]) ;

                                                      var bw_type = "word" ;
                                                           if ( 0 == (bw & 0x0000000C) )
                                                          bw_type = "byte" ;
                                                      else if ( 1 == (bw & 0x0000000C) )
                                                          bw_type = "half" ;

                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
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

        sim_p.behaviors.MEM_WRITE  = { nparameters: 6,
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

                                                      address = address & 0xFFFFFFFC;
                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
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
                                                      var valref = main_memory_set(sim_p.internal_states.MP, 
                                                                                   address,
                                                                                   melto) ;

                                                      sim_p.signals[s_expr[4]].value = 1;
                                                      show_main_memory(sim_p.internal_states.MP, address, full_redraw, true) ;

                                                      // cache
                                                      if (first_time)
					              {
							  for (var i=0; i<sim_p.internal_states.CM.length; i++)
							  {
							       if (1 == sim_p.internal_states.CM[i].cfg.level) {
                                                                   cache_memory_access(sim_p.internal_states.CM[i], address, "write", clk) ;
							       }
							  }
                                                      }
                                                   },
                                           verbal: function (s_expr)
                                                   {
                                                      var verbal = "" ;

                                                      var address = sim_p.states[s_expr[1]].value;
                                                      var dbvalue = sim_p.states[s_expr[2]].value;
                                                      var bw      = sim_p.signals[s_expr[3]].value;
                                                      var clk     = get_value(sim_p.states[s_expr[5]]) ;

                                                      var bw_type = "word" ;
                                                           if ( 0 == (bw & 0x0000000C) )
                                                          bw_type = "byte" ;
                                                      else if ( 1 == (bw & 0x0000000C) )
                                                          bw_type = "half" ;

                                                      var value = main_memory_getvalue(sim_p.internal_states.MP,
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
         *  Model (see docs/WEPSIM-TEAM.md)
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
                                                   "be":        {
                                                                   ref:  "BWA"
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
                              signals_inputs:    [ "be", "r", "w" ],
			      signals_output:    [ ],
			      states_mapping:    [ ]
                       } ;

        return sim_p ;
}

