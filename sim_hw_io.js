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


        var IO_INT_FACTORY = new Array() ;
        IO_INT_FACTORY[0] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        IO_INT_FACTORY[1] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        IO_INT_FACTORY[2] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        IO_INT_FACTORY[3] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        IO_INT_FACTORY[4] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        IO_INT_FACTORY[5] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        IO_INT_FACTORY[6] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        IO_INT_FACTORY[7] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;


        var IOSR_ID   = 0x1100 ;
        var IOCR_ID   = 0x1104 ;
        var IODR_ID   = 0x1108 ;


        /*
         *  States
         */

        sim_states["IOSR"]   = { name: "IOSR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
        sim_states["IOCR"]   = { name: "IOCR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
        sim_states["IODR"]   = { name: "IODR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };

        sim_states["INT"]    = { name: "INT",     visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
        sim_states["IORDY"]  = { name: "IORDY",   visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };


        /*
         *  Signals
         */

        sim_signals["IO_IOR"]  = { name: "IO_IOR", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
                                   behavior: ["NOP", "IO_IOR BUS_AB BUS_DB IOSR IOCR IODR CLK; FIRE SBWA"],
                                   fire_name: ['svg_p:tspan4173','svg_p:text3715'], 
                                   draw_data: [[], ['svg_p:path3795', 'svg_p:path3733']], 
                                   draw_name: [[], []]};

        sim_signals["IO_IOW"]  = { name: "IO_IOW", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
                                   behavior: ["NOP", "IO_IOW BUS_AB BUS_DB IOSR IOCR IODR CLK; FIRE SBWA"],
                                   fire_name: ['svg_p:text3785-0-6-0-5-5','svg_p:text3717'], 
                                   draw_data: [[], ['svg_p:path3805', 'svg_p:path3733']], 
                                   draw_name: [[], []]};

        sim_signals["IO_IE"]    = { name: "IO_IE",    visible: true, type: "L", value: 1, default_value: 1, nbits: "1", 
                                    behavior: ["NOP", "IO_CHK_I CLK INT INTA"],
                                    fire_name: [], 
                                    draw_data: [[], []], 
                                    draw_name: [[], []] };

        sim_signals["INTA"]     = { name: "INTA",    visible: true, type: "L", value: 1, default_value: 0, nbits: "1", 
                                    behavior: ["NOP", "INTA CLK INT INTA BUS_DB INTV"],
                                    fire_name: ['svg_p:text3785-0-6-0-5-5-1-1'], 
                                    draw_data: [[], ['svg_p:path3807', 'svg_p:path3737']], 
                                    draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        syntax_behavior["IO_IOR"]   = { nparameters: 7,
                                        types: ["E", "E", "E", "E", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var bus_ab = sim_states[s_expr[1]].value ;
                                                      var iosr   = sim_states[s_expr[3]].value ;
                                                      var iocr   = sim_states[s_expr[4]].value ;
                                                      var iodr   = sim_states[s_expr[5]].value ;

                                                      if (bus_ab == IOSR_ID) 
                                                          sim_states[s_expr[2]].value = iosr ;
                                                      if (bus_ab == IOCR_ID) 
                                                          sim_states[s_expr[2]].value = iocr ;
                                                      if (bus_ab == IODR_ID) 
                                                          sim_states[s_expr[2]].value = iodr ;
                                                   }
                                      };

        syntax_behavior["IO_IOW"]   = { nparameters: 7,
                                        types: ["E", "E", "E", "E", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var bus_ab = sim_states[s_expr[1]].value ;
                                                      var bus_db = sim_states[s_expr[2]].value ;

                                                      if ( (bus_ab != IOSR_ID) && 
                                                           (bus_ab != IOCR_ID) && 
                                                           (bus_ab != IODR_ID) ) 
                                                      {
                                                              return; 
                                                      }

                                                      if (bus_ab == IOSR_ID) 
                                                          sim_states[s_expr[3]].value = bus_db ;
                                                      if (bus_ab == IOCR_ID) 
                                                          sim_states[s_expr[4]].value = bus_db ;
                                                      if (bus_ab == IODR_ID) 
                                                          sim_states[s_expr[5]].value = bus_db ;
                                                   }
                                      };

        syntax_behavior["IO_CHK_I"] = { nparameters: 4, 
                                        types: ["E", "E", "S"],
                                        operation: function (s_expr) 
                                                   {
                                                      var clk = sim_states[s_expr[1]].value() ;

						      for (var i=0; i<IO_INT_FACTORY.length; i++)
                                                      {
                                                           if (IO_INT_FACTORY[i].period() == 0)
 							       continue;

                                                           if ((clk % IO_INT_FACTORY[i].period()) == 0)
                                                           {
                                                              if (Math.random() > IO_INT_FACTORY[i].probability())
                                                                  continue ;

                                                              IO_INT_FACTORY[i].accumulated(IO_INT_FACTORY[i].accumulated()+1);
                                                              IO_INT_FACTORY[i].active = true ;

                                                              if (typeof sim_events["io"][clk] == "undefined")
                                                                  sim_events["io"][clk] = new Array() ;
                                                              sim_events["io"][clk].push(i) ;

                                                              sim_states[s_expr[2]].value = 1 ; // ['INT']=1
                                                           }
                                                      }
                                                   }
                                      };

        syntax_behavior["INTA"]     = { nparameters: 6, 
                                        types: ["E", "E", "S", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var clk = sim_states[s_expr[1]].value() ;
                                                      if (typeof sim_events["io"][clk] != "undefined") 
						      {
                                                          sim_states[s_expr[4]].value = sim_states[s_expr[5]].value ;
  							  return ;
                                                      }

                                                      var found = false ;
						      for (var i=0; i<IO_INT_FACTORY.length; i++)
                                                      {
                                                           if (IO_INT_FACTORY[i].active)
                                                           {
                                                              if (!found)
                                                              {
                                                                  IO_INT_FACTORY[i].active = false ;
                                                                  sim_states[s_expr[2]].value = 0 ; // ['INT']    = 0
                                                                  sim_states[s_expr[4]].value = i ; // ['BUS_DB'] = i
                                                                  sim_states[s_expr[5]].value = i ; // ['INTV']   = i
                                                                  continue ;
                                                              }

                                                              if (typeof sim_events["io"][clk] == "undefined") {
                                                                  sim_events["io"][clk] = new Array() ;
                                                              }
                                                              sim_events["io"][clk].push(i) ;

                                                              sim_states[s_expr[2]].value = 0 ; // ['INT']=0
                                                           }
                                                      }
                                                   }
                                      };

