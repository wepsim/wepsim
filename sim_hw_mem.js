/*      
 *  Copyright 2015-2016 Alejandro Calderon Mateos, Javier Prieto Cepeda, Felix Garcia Carballeira
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
        var MP_wc    = 1;


        /*
         *  States
         */

        sim_states["MRDY"]   = { name: "MRDY", visible:false, nbits: "1", value: 0, default_value: 0, draw_data: [] };


        /*
         *  Signals
         */

        sim_signals["R"]     = { name: "R", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                 behavior: ["NOP", "MEM_READ BUS_AB BUS_DB BWA MRDY CLK"],
                                 fire_name: ['svg_p:text3533-5-2','svg_p:text3713'], 
                                 draw_data: [[], ['svg_p:path3557', 'svg_p:path3571']], 
                                 draw_name: [[], []]};

        sim_signals["W"]     = { name: "W", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                 behavior: ["NOP", "MEM_WRITE BUS_AB BUS_DB BWA MRDY CLK"],
                                 fire_name: ['svg_p:text3533-5-08','svg_p:text3527','svg_p:text3431-7'], 
                                 draw_data: [[], ['svg_p:path3559', 'svg_p:path3575','svg_p:path3447-7']], 
                                 draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        syntax_behavior["MEM_READ"] = { nparameters: 6, 
                                        types: ["E", "E", "S", "E"],
                                        operation: function (s_expr) 
                                                   {
						      var address = sim_states[s_expr[1]].value;
                                                      var dbvalue = sim_states[s_expr[2]].value;
                                                      var bw      = sim_signals[s_expr[3]].value;
                                                      var clk     = sim_states[s_expr[5]].value() ;

                                                      sim_states[s_expr[4]].value = 0;
						      if (typeof sim_events["mem"][clk-1] != "undefined")
                                                      {
						          var remain = sim_events["mem"][clk-1];
                                                          if (remain > 0)
                                                          {
                                                              remain--;
						              sim_events["mem"][clk] = remain;
                                                              if (remain > 0)
                                                                  return;
                                                          }
                                                      }
						      if (typeof sim_events["mem"][clk] == "undefined")
                                                      {
						          var remain = MP_wc();
						          sim_events["mem"][clk] = remain; 
                                                          if (remain > 0)
                                                              return;
                                                      }

						      var value   = 0;
                                                      address = address & 0xFFFFFFFC;
						      if (typeof  MP[address] != "undefined")
						   	  value = MP[address];

                                                      // TABLES
                                                      if ( 0 == (bw & 0x0000000C) )
                                                      {  // byte
                                                           if ( 0 == (bw & 0x00000003) )
                                                                dbvalue = (dbvalue & 0xFFFFFF00) | (value & 0x000000FF);
                                                           if ( 1 == (bw & 0x00000003) )
                                                                dbvalue = (dbvalue & 0xFFFF00FF) | (value & 0x0000FF00);
                                                           if ( 2 == (bw & 0x00000003) )
                                                                dbvalue = (dbvalue & 0xFF00FFFF) | (value & 0x00FF0000);
                                                           if ( 3 == (bw & 0x00000003) )
                                                                dbvalue = (dbvalue & 0x00FFFFFF) | (value & 0xFF000000);
                                                      }
                                                      else if ( 1 == (bw & 0x0000000C) )
                                                      {  // half
                                                           if ( 0 == (bw & 0x00000002) )
                                                                dbvalue = (dbvalue & 0xFFFF0000) | (value & 0x0000FFFF);
                                                           if ( 1 == (bw & 0x00000002) )
                                                                dbvalue = (dbvalue & 0x0000FFFF) | (value & 0xFFFF0000);
                                                      }
                                                      else
                                                      {  // word
                                                           dbvalue = value;
                                                      }

                                                      sim_states[s_expr[2]].value = (dbvalue >>> 0);
                                                      sim_states[s_expr[4]].value = 1;
				                      show_memories('MP', MP, address) ;
                                                   }
                                   };

        syntax_behavior["MEM_WRITE"] = { nparameters: 6, 
                                         types: ["E", "E", "S", "E"],
                                         operation: function (s_expr) 
                                                    {
						      var address = sim_states[s_expr[1]].value;
                                                      var dbvalue = sim_states[s_expr[2]].value;
                                                      var bw      = sim_signals[s_expr[3]].value;
                                                      var clk     = sim_states[s_expr[5]].value() ;

                                                      sim_states[s_expr[4]].value = 0;
						      if (typeof sim_events["mem"][clk-1] != "undefined")
                                                      {
						          var remain = sim_events["mem"][clk-1];
                                                          if (remain > 0)
                                                          {
                                                              remain--;
						              sim_events["mem"][clk] = remain;
                                                              if (remain > 0)
                                                                  return;
                                                          }
                                                      }
						      if (typeof sim_events["mem"][clk] == "undefined")
                                                      {
						          var remain = MP_wc();
						          sim_events["mem"][clk] = remain; 
                                                          if (remain > 0)
                                                              return;
                                                      }

						      var value   = 0;
                                                      address = address & 0xFFFFFFFC;
						      if (typeof  MP[address] != "undefined")
						   	  value = MP[address];

                                                      // TABLES
                                                      if ( 0 == (bw & 0x0000000C) )
                                                      {  // byte
                                                           if ( 0 == (bw & 0x00000003) )
                                                                value = (value & 0xFFFFFF00) | (dbvalue & 0x000000FF);
                                                           if ( 1 == (bw & 0x00000003) )
                                                                value = (value & 0xFFFF00FF) | (dbvalue & 0x0000FF00);
                                                           if ( 2 == (bw & 0x00000003) )
                                                                value = (value & 0xFF00FFFF) | (dbvalue & 0x00FF0000);
                                                           if ( 3 == (bw & 0x00000003) )
                                                                value = (value & 0x00FFFFFF) | (dbvalue & 0xFF000000);
                                                      }
                                                      else if ( 1 == (bw & 0x0000000C) )
                                                      {  // half
                                                           if ( 0 == (bw & 0x00000002) )
                                                                value = (value & 0xFFFF0000) | (dbvalue & 0x0000FFFF);
                                                           if ( 1 == (bw & 0x00000002) )
                                                                value = (value & 0x0000FFFF) | (dbvalue & 0xFFFF0000);
                                                      }
                                                      else
                                                      {  // word
                                                           value = dbvalue;
                                                      }

						      MP[address] = (value >>> 0);
                                                      sim_states[s_expr[4]].value = 1;
				                      show_memories('MP', MP, address) ;
                                                    }
                                   };


