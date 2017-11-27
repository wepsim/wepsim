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
	 *  SCREEN
	 */

        sim_components["SCREEN"] = {
		                  name: "SCREEN", 
		                  version: "1", 
		                  write_state: function ( vec ) {
                                                  if (typeof vec.SCREEN == "undefined")
                                                      vec.SCREEN = new Object() ;

					          var sim_screen = get_screen_content() ;
					          var sim_lines  = sim_screen.trim().split("\n") ;
					          for (var i=0; i<sim_lines.length; i++)
					          {
					               value = sim_lines[i] ;
           					       if (value != "") {
							   vec.SCREEN[i] = {"type":  "screen", 
								            "default_value": "",
								            "id":    i,
								            "op":    "==", 
								            "value": value} ;
   						       }
					          }

						  return vec;
				              }, 
		                  read_state: function ( vec, check ) {
                                                  if (typeof vec.SCREEN == "undefined")
                                                      vec.SCREEN = new Object() ;

					          if ("SCREEN" == check["type"].toUpperCase().trim())
                                                  {
						      vec.SCREEN[check["id"]] = {"type":  "screen", 
								                 "default_value": "",
								                 "id":    check["id"],
								                 "op":    check["condition"], 
								                 "value": check["value"]} ;
                                                      return true ;
                                                  }

                                                  return false ;
				             },
		                  get_state: function ( line ) {
					          var sim_screen = get_screen_content() ;
					          var sim_lines  = sim_screen.trim().split("\n") ;
						  var index = parseInt(line) ;
						  if (typeof sim_lines[index] != "undefined")
						      return sim_lines[index] ;

					          return null ;
				              } 
                            	};


	/*
	 *  States - IO parameters
	 */

        var DDR_ID   = 0x1000 ;
        var DSR_ID   = 0x1004 ;

        io_hash[DDR_ID] = "DDR" ;
        io_hash[DSR_ID] = "DSR" ;


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
                                   fire_name: ['svg_p:tspan4006'], 
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
                                                      var clk    = sim_states[s_expr[5]].value();
                                                      var ch     = String.fromCharCode(bus_db);

                                                      if (bus_ab != DDR_ID) {
                                                          return;
                                                      }

                                                      if (ch == String.fromCharCode(0x0007)) // '\a'
                                                      {
                                                         // (a) audible
                                                         timbre.reset();
                                                         var s1 = T("sin", {freq:440, mul:0.5});
                                                         var s2 = T("sin", {freq:660, mul:0.5});
                                                         T("perc", {r:500}, s1, s2).on("ended", 
										        function() {
										           this.pause(); 
										        }).bang().play();
                                                      }
                                                      else
                                                      {
                                                         // (b) visible
                                                         var screen = get_screen_content() ;
                                                         if (typeof sim_events["screen"][clk] != "undefined") 
                                                             screen = screen.substr(0, screen.length-1);
                                                         set_screen_content(screen + String.fromCharCode(bus_db));
                                                      }

                                                      sim_states[s_expr[3]].value = bus_db ;
                                                      sim_states[s_expr[4]].value = 1 ;
                                                      sim_events["screen"][clk]   = bus_db ;
                                                   }
                                   };

