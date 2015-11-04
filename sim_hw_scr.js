/*      
 *  Copyright 2015 Alejandro Calderon Mateos, Felix Garcia Carballeira, Javier Prieto Cepeda
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


        var DDR_ID   = 0x1000 ;
        var DSR_ID   = 0x1004 ;


        /*
         *  States
         */

        sim_states["DDR"]   = { name: "DDR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
        sim_states["DSR"]   = { name: "DSR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };


        /*
         *  Signals
         */

        sim_signals["SCR_IOR"] = { name: "IOR", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                   behavior: ["NOP", "SCR_IOR BUS_AB BUS_DB DDR DSR CLK"],
                                   fire_name: ['svg_p:tspan4004'], 
                                   draw_data: [[], ['svg_p:path3871', 'svg_p:path3857']], 
                                   draw_name: [[], []]};

        sim_signals["SCR_IOW"] = { name: "IOW", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                   behavior: ["NOP", "SCR_IOW BUS_AB BUS_DB DDR DSR CLK"],
                                   fire_name: ['svg_p:tspan4004'], 
                                   draw_data: [[], ['svg_p:path3873', 'svg_p:path3857']], 
                                   draw_name: [[], []]};


        /*
         *  Syntax of behaviors
         */

        syntax_behavior["SCR_IOR"] = { nparameters: 6,
                                        types: ["E", "E", "E", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var bus_ab = sim_states[s_expr[1]].value ;
                                                      var ddr    = sim_states[s_expr[3]].value ;
                                                      var dsr    = sim_states[s_expr[4]].value ;

                                                      if (bus_ab == DDR_ID)
                                                          sim_states[s_expr[2]].value = ddr ;
                                                      if (bus_ab == DSR_ID)
                                                          sim_states[s_expr[2]].value = dsr ;
                                                   }
                                   };

        syntax_behavior["SCR_IOW"] = { nparameters: 6,
                                        types: ["E", "E", "E", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var bus_ab = sim_states[s_expr[1]].value ;
                                                      var bus_db = sim_states[s_expr[2]].value ;
                                                      var clk    = sim_states[s_expr[5]].value() ;

                                                      if (bus_ab != DDR_ID) {
                                                          return;
                                                      }

                                                      var screen = document.getElementById("kdb_con").value;
                                                      if (typeof sim_events["screen"][clk] != "undefined") 
                                                          screen = screen.substr(0, screen.length-1);
                                                      screen = screen + String.fromCharCode(bus_db);
                                                      document.getElementById("kdb_con").value = screen;

                                                      sim_states[s_expr[3]].value = bus_db ;
                                                      sim_states[s_expr[4]].value = 1 ;
                                                      sim_events["screen"][clk]   = bus_db ;
                                                   }
                                   };

