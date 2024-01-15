/*      
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

var DDR_ID = 0x1000 ;
var DSR_ID = 0x1004 ;

function io_screen_base_register ( sim_p )
{
        sim_p.components.SCREEN = {
		                  name: "SCREEN", 
		                  version: "1", 
		                  abilities:    [ "SCREEN" ],

		                  // ui: details
                                  details_name: [ "SCREEN" ],
                                  details_fire: [ ['svg_p:text3845'] ],

		                  // state: write_state, read_state, get_state
		                  write_state: function ( vec ) {
                                                  if (typeof vec.SCREEN == "undefined") {
                                                      vec.SCREEN = {} ;
				                  }

					          var sim_screen = sim_p.internal_states.screen_content ;
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
                                                  if (typeof vec.SCREEN == "undefined") {
                                                      vec.SCREEN = {} ;
                                                  }

					          if ("SCREEN" == check.type.toUpperCase().trim())
                                                  {
						      vec.SCREEN[check.id] = { "type":  "screen", 
								               "default_value": "",
								               "id":    check.id,
								               "op":    check.condition, 
								               "value": check.value } ;
                                                      return true ;
                                                  }

                                                  return false ;
				             },
		                  get_state: function ( line ) {
					          var sim_screen = sim_p.internal_states.screen_content ;
					          var sim_lines  = sim_screen.trim().split("\n") ;
						  var index = parseInt(line) ;
						  if (typeof sim_lines[index] != "undefined")
						      return sim_lines[index] ;

					          return null ;
				              },

		                  // native: get_value, set_value
                                  get_value:   function ( elto ) {
        				            return sim_p.internal_states.screen_content ;
                                               },
                                  set_value:   function ( elto, value ) {
        				            sim_p.internal_states.screen_content = value ;
						    return value ;
                                               }
                            	};


	/*
	 *  States - IO parameters
	 */

        sim_p.internal_states.io_hash[DDR_ID] = "DDR" ;
        sim_p.internal_states.io_hash[DSR_ID] = "DSR" ;


	/*
	 *  Internal States
	 */

        sim_p.internal_states.screen_content = "" ;


        /*
         *  States
         */

        sim_p.states.DDR   = { name: "DDR", verbal: "Display Data Register", 
                                visible:false, nbits: "32", value: 0, default_value: 0,
                                draw_data: [] };
        sim_p.states.DSR   = { name: "DSR", verbal: "Display State Register", 
                                visible:false, nbits: "32", value: 0, default_value: 0,
                                draw_data: [] };


        /*
         *  Signals
         */

        sim_p.signals.SCR_IOR = { name: "SCR_IOR", 
                                   visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                   behavior: ["NOP", "SCR_IOR BUS_AB BUS_DB DDR DSR CLK"],
                                   fire_name: ['svg_p:tspan4004'], 
                                   draw_data: [[], ['svg_p:path3871', 'svg_p:path3857']], 
                                   draw_name: [[], []] };

        sim_p.signals.SCR_IOW = { name: "SCR_IOW", 
                                   visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                   behavior: ["NOP", "SCR_IOW BUS_AB BUS_DB DDR DSR CLK"],
                                   fire_name: ['svg_p:tspan4006'], 
                                   draw_data: [[], ['svg_p:path3873', 'svg_p:path3857']], 
                                   draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        sim_p.behaviors.SCR_IOR      = { nparameters: 6,
                                      types: ["E", "E", "E", "E", "E"],
                                      operation: function (s_expr) 
                                                 {
                                                    var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                    var ddr    = get_value(sim_p.states[s_expr[3]]) ;
                                                    var dsr    = get_value(sim_p.states[s_expr[4]]) ;

                                                    if (bus_ab == DDR_ID)
                                                        set_value(sim_p.states[s_expr[2]], ddr) ;
                                                    if (bus_ab == DSR_ID)
                                                        set_value(sim_p.states[s_expr[2]], dsr) ;
                                                 },
                                         verbal: function (s_expr) 
                                                 {
					            var verbal = "" ;

                                                    var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                    var ddr    = get_value(sim_p.states[s_expr[3]]) ;
                                                    var dsr    = get_value(sim_p.states[s_expr[4]]) ;

                                                    if (bus_ab == DDR_ID)
                                                        verbal = "Try to read from the screen the DDR value " + ddr + ". " ;
                                                    if (bus_ab == DDR_ID)
                                                        verbal = "Try to read into the screen the DSR value " + dsr + ". " ;

                                                    return verbal ;
                                                 }
                                };

        sim_p.behaviors.SCR_IOW      = { nparameters: 6,
                                      types: ["E", "E", "E", "E", "E"],
                                      operation: function (s_expr) 
                                                 {
                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                      var bus_db = get_value(sim_p.states[s_expr[2]]) ;
                                                      var clk    = get_value(sim_p.states[s_expr[5]]) ;
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
                                                         if (typeof sim_p.events.screen[clk] != "undefined") 
                                                             screen = screen.substr(0, screen.length-1);
                                                         set_screen_content(screen + String.fromCharCode(bus_db));
                                                      }

                                                      set_value(sim_p.states[s_expr[3]], bus_db) ;
                                                      set_value(sim_p.states[s_expr[4]], 1) ;
                                                      sim_p.events.screen[clk] = bus_db ;
                                                 },
                                         verbal: function (s_expr) 
                                                 {
					              var verbal = "" ;

                                                      var bus_ab = get_value(sim_p.states[s_expr[1]]) ;
                                                      var bus_db = get_value(sim_p.states[s_expr[2]]) ;
                                                      var clk    = get_value(sim_p.states[s_expr[5]]) ;
                                                      var ch     = String.fromCharCode(bus_db);

                                                      if (bus_ab == DDR_ID)
                                                          verbal = "Try to write into the screen the code " + ch + " at clock cycle " + clk + ". " ;

                                                      return verbal ;
                                                 }
                                };

        sim_p.behaviors.SCREEN_RESET = { nparameters: 1,
                                      operation: function (s_expr) 
                                                 {
						     // reset events.screen
                                                     sim_p.events.screen = {} ;
                                                 },
                                         verbal: function (s_expr) 
                                                 {
                                                    return "Reset the screen content. " ;
                                                 }
                                  };


        /*
         *  Model
         * (Thanks to Juan Francisco Perez Carrasco for collaborating in the design of the following elements)
         */

        sim_p.elements.display = {
			      name:              "Display",
			      description:       "Display",
			      type:              "subcomponent",
			      belongs:           "SCREEN",
			      states:            {
						   "addr":      {
								   ref:  "BUS_AB"
								},
						   "data":      {
								   ref:  "BUS_DB"
								}
						 },
			      signals:           {
						   "ior":       {
								   ref:  "SCR_IOR"
								},
						   "iow":       {
								   ref:  "SCR_IOW"
								}
						 },
			      states_inputs:     [ "addr", "data" ],
			      states_outputs:    [ "data" ],
			      signals_inputs:    [ "ior", "iow" ],
			      signals_output:    [ ]
		         } ;

        return sim_p ;
}

