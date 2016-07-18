/*      
 *  Copyright 2015-2016 Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos
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


        var MP       = new Object();
        var segments = new Object();


        /*
         *  States
         */

        sim_states["MRDY"]           = { name: "MRDY",           visible:false, nbits: "1", value: 0, default_value: 0, draw_data: [] };


        /*
         *  Signals
         */

        sim_signals["R"]     = { name: "R", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                 behavior: ["NOP", "MEM_READ BUS_AB BUS_DB; MOVE_BITS RWBWA 5 1 R; FIRE RWBWA"],
                                 fire_name: ['svg_p:text3533-5-2','svg_p:text3713'], 
                                 draw_data: [[], ['svg_p:path3557', 'svg_p:path3571']], 
                                 draw_name: [[], []]};

        sim_signals["W"]     = { name: "W", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                 behavior: ["NOP", "MOVE_BITS RWBWA 4 1 W; FIRE RWBWA; MEM_WRITE BUS_AB BUS_DB"],
                                 fire_name: ['svg_p:text3533-5-08','svg_p:text3527','svg_p:text3431-7'], 
                                 draw_data: [[], ['svg_p:path3559', 'svg_p:path3575']], 
                                 draw_name: [[], []] };

        sim_signals["RWBWA"] = { name: "RWBWA", visible: false, type: "L", value: 0, default_value:0, nbits: "6", 
                                 behavior: ['NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'BSEL BUS_DB 0 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 8 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 24 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 8 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 24 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP'],
                                 fire_name: [], 
                                 draw_data: [[], []], 
                                 draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        syntax_behavior["MEM_READ"] = { nparameters: 3, 
                                        types: ["E", "E"],
                                        operation: function (s_expr) 
                                                   {
						      var value   = 0;
						      var address = sim_states[s_expr[1]].value ;
                                                          address = address & 0xFFFFFFFC;
						      if (typeof MP[address] != "undefined") {
						   	  value = MP[address];
						      }
                                                      sim_states[s_expr[2]].value = value ;
				                      show_memories('MP', MP, address) ;
                                                   }
                                   };

        syntax_behavior["MEM_WRITE"] = { nparameters: 3, 
                                         types: ["E", "E"],
                                         operation: function (s_expr) {
						      var value   = sim_states[s_expr[2]].value ;
						      var address = sim_states[s_expr[1]].value ;
                                                          address = address & 0xFFFFFFFC;
						      MP[address] = value ;
				                      show_memories('MP', MP, address) ;
                                                    }
                                   };


