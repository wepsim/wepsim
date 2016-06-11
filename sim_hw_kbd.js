/*      
 *  Copyright 2015-2016 Alejandro Calderon Mateos, Felix Garcia Carballeira, Javier Prieto Cepeda
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


        var KBDR_ID   = 0x0100 ;
        var KBSR_ID   = 0x0104 ;


        /*
         *  States
         */

        sim_states["KBDR"]   = { name: "KBDR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
        sim_states["KBSR"]   = { name: "KBSR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };


        /*
         *  Signals
         */

        sim_signals["KBD_IOR"] = { name: "IOR", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                   behavior: ["NOP", "KBD_IOR BUS_AB BUS_DB KBDR KBSR CLK; FIRE SBWA"],
                                   fire_name: ['svg_p:tspan4057'], 
                                   draw_data: [[], ['svg_p:path3863', 'svg_p:path3847']], 
                                   draw_name: [[], []]};


        /*
         *  Syntax of behaviors
         */

        syntax_behavior["KBD_IOR"] = { nparameters: 6,
                                        types: ["E", "E", "E", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var bus_ab = sim_states[s_expr[1]].value ;
                                                      var clk    = sim_states[s_expr[5]].value() ;

                                                      if ( (bus_ab != KBDR_ID) && (bus_ab != KBSR_ID) ) {
                                                              return; 
                                                      }

						      if (typeof sim_events["keybd"][clk] != "undefined")
                                                      {
						              if (bus_ab == KBDR_ID)
							          sim_states[s_expr[2]].value = sim_events["keybd"][clk];
							      if (bus_ab == KBSR_ID)
								  sim_states[s_expr[2]].value = 1;
                                                              return;
                                                      }

                                                      if (sim_states[s_expr[4]].value == 0) 
                                                      {
							      var keybuffer = document.getElementById("kdb_key").value;
							      if (keybuffer.length != 0) 
                                                              {
							          var keybuffer_rest = keybuffer.substr(1, keybuffer.length-1);
							          document.getElementById("kdb_key").value = keybuffer_rest;

							          sim_states[s_expr[4]].value = 1;
							          sim_states[s_expr[3]].value = keybuffer[0].charCodeAt(0);
							      }
                                                      }
                                                      if (sim_states[s_expr[4]].value == 1) 
                                                      {
						              sim_events["keybd"][clk] = sim_states[s_expr[3]].value;
                                                      }

						      if (bus_ab == KBSR_ID) {
							      sim_states[s_expr[2]].value = sim_states[s_expr[4]].value;
						      }
						      if (bus_ab == KBDR_ID) {
							      if (sim_states[s_expr[4]].value == 1) 
							          sim_states[s_expr[2]].value = sim_states[s_expr[3]].value;
							      sim_states[s_expr[4]].value = 0;
						      }
                                                   }
                                   };

