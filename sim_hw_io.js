/*      
 *  Copyright 2015-2017 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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
	 *  IO
	 */

        sim_components["IO"] = {
		                  name: "IO", 
		                  version: "1", 
		                  write_state: function ( vec ) {
						  return vec;
				               },
		                  read_state:  function ( o, check ) {
                                                  return false ;
				               },
		                  get_state:   function ( reg ) {
					          return null ;
				               } 
                            	};


	/*
	 *  States - IO parameters
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

        io_hash[IOSR_ID] = "IOSR" ;
        io_hash[IOCR_ID] = "IOCR" ;
        io_hash[IODR_ID] = "IODR" ;


        /*
         *  States
         */

        sim_states["IOSR"]   = { name: "IOSR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
        sim_states["IOCR"]   = { name: "IOCR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
        sim_states["IODR"]   = { name: "IODR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };


        /*
         *  Signals
         */

        sim_signals["INT"]     = { name: "INT",    visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
                                   depends_on: ["CLK"],
                                   behavior: ["FIRE C", "FIRE C"],
                                   fire_name: ['svg_p:tspan4199'], 
                                   draw_data: [[], ['svg_p:path3809']], 
                                   draw_name: [[], []]};

        sim_signals["IORDY"]   = { name: "IORDY",  visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
                                   depends_on: ["CLK"],
		                   behavior: ["FIRE_IFCHANGED IORDY C", "FIRE_IFCHANGED IORDY C"],
                                   fire_name: ['svg_p:tspan4089','svg_p:path3793'], 
                                   draw_data: [[], ['svg_p:path3897']], 
                                   draw_name: [[], []]};

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

        sim_signals["IO_IE"]    = { name: "IO_IE", visible: true, type: "L", value: 1, default_value: 1, nbits: "1", 
                                    behavior: ["NOP", "IO_CHK_I CLK INT INTV; FIRE C"],
                                    fire_name: [], 
                                    draw_data: [[], []], 
                                    draw_name: [[], []] };

        sim_signals["INTA"]     = { name: "INTA",  visible: true, type: "L", value: 1, default_value: 0, nbits: "1", 
                                    behavior: ["NOP", "INTA CLK INT INTA BUS_DB INTV; FIRE BW; FIRE C"],
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
                                                          set_value(sim_states[s_expr[2]], iosr);
                                                      if (bus_ab == IOCR_ID) 
                                                          set_value(sim_states[s_expr[2]], iocr);
                                                      if (bus_ab == IODR_ID) 
                                                          set_value(sim_states[s_expr[2]], iodr);
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
                                                          set_value(sim_states[s_expr[3]], bus_db);
                                                      if (bus_ab == IOCR_ID) 
                                                          set_value(sim_states[s_expr[4]], bus_db);
                                                      if (bus_ab == IODR_ID) 
                                                          set_value(sim_states[s_expr[5]], bus_db);

                                                      // check & modify the timer
                                                      var iocr_id = sim_states[s_expr[4]].value ;
                                                      var iodr_id = sim_states[s_expr[5]].value ;

                                                      if ( (iocr_id < 0) || (iocr_id > 7) ) 
                                                            return; 

                                                      IO_INT_FACTORY[iocr_id].period(iodr_id) ;
                                                      IO_INT_FACTORY[iocr_id].probability(1) ;
                                                      if (0 == iodr_id)
                                                          IO_INT_FACTORY[iocr_id].probability(0) ;
                                                   }
                                      };

        syntax_behavior["IO_CHK_I"] = { nparameters: 4, 
                                        types: ["E", "S", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var clk = get_value(sim_states[s_expr[1]]) ;

						      for (var i=IO_INT_FACTORY.length-1; i>=0; i--)
                                                      {
                                                           if (IO_INT_FACTORY[i].period() == 0)
 							       continue;

                                                           if (IO_INT_FACTORY[i].active() == true)
                                                           {
                                                               set_value(sim_signals[s_expr[2]], 1); // ['INT']=1
                                                               set_value( sim_states[s_expr[3]], i); // ['INTV']=i
                                                           }

                                                           if ((clk % IO_INT_FACTORY[i].period()) == 0)
                                                           {
                                                              if (Math.random() > IO_INT_FACTORY[i].probability())
                                                                  continue ;

                                                              IO_INT_FACTORY[i].accumulated(IO_INT_FACTORY[i].accumulated()+1);
                                                              IO_INT_FACTORY[i].active(true) ;

                                                              if (typeof sim_events["io"][clk] == "undefined")
                                                                  sim_events["io"][clk] = new Array() ;
                                                              sim_events["io"][clk].push(i) ;

                                                              set_value(sim_signals[s_expr[2]], 1); // ['INT']=1
                                                              set_value( sim_states[s_expr[3]], i); // ['INTV']=i
                                                           }
                                                      }
                                                   }
                                      };

        syntax_behavior["INTA"]     = { nparameters: 6, 
                                        types: ["E", "S", "S", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var clk = get_value(sim_states[s_expr[1]]) ;

                                                      if (typeof sim_events["io"][clk] != "undefined") 
                                                      {
                                                          set_value(sim_states[s_expr[4]], sim_events["io"][clk][0]); // ['BUS_DB'] = i
  							  return ;
                                                      }

						      set_value(sim_signals[s_expr[2]], 0); // ['INT']  = 0
						      set_value( sim_states[s_expr[5]], 0); // ['INTV'] = 0

						      for (var i=0; i<IO_INT_FACTORY.length; i++) 
                                                      {
                                                           if (IO_INT_FACTORY[i].active())
                                                           {
                                                               set_value(sim_signals[s_expr[2]], 0) ; // ['INT']  = 1
                                                               set_value( sim_states[s_expr[5]], i) ; // ['INTV'] = i
							       set_value( sim_states[s_expr[4]], i) ; // ['BUS_DB'] = i

                                                               if (typeof sim_events["io"][clk] == "undefined") 
                                                                   sim_events["io"][clk] = new Array() ;
                                                               sim_events["io"][clk].push(i) ;

							       IO_INT_FACTORY[i].active(false);
                                                               break; // stop at first INT
                                                           }
                                                      }
                                                   }
                                      };

