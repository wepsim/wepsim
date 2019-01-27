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
	 *  IO
	 */

        poc_components.IO = {
		                  name: "IO", 
		                  version: "1", 
		                  abilities: ["IO", "IO_CONFIG"], 
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

        poc_internal_states.io_int_factory = [] ;
        poc_internal_states.io_int_factory[0] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        poc_internal_states.io_int_factory[1] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        poc_internal_states.io_int_factory[2] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        poc_internal_states.io_int_factory[3] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        poc_internal_states.io_int_factory[4] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        poc_internal_states.io_int_factory[5] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        poc_internal_states.io_int_factory[6] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;
        poc_internal_states.io_int_factory[7] = { period: 0, probability: 0.5, accumulated: 0, active: false } ;

        var IOSR_ID   = 0x1100 ;
        var IOCR_ID   = 0x1104 ;
        var IODR_ID   = 0x1108 ;

        poc_internal_states.io_hash[IOSR_ID] = "IOSR" ;
        poc_internal_states.io_hash[IOCR_ID] = "IOCR" ;
        poc_internal_states.io_hash[IODR_ID] = "IODR" ;


        /*
         *  States
         */

        poc_states.IOSR = { name: "IOSR", verbal: "IO State Register",
                           visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
        poc_states.IOCR = { name: "IOCR", verbal: "IO Control Register",
                           visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
        poc_states.IODR = { name: "IODR", verbal: "IO Data Register",
                           visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };


        /*
         *  Signals
         */

         poc_signals.INT         = { name: "INT", 
                                    visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
                                    depends_on: ["CLK"],
                                    behavior: ["FIRE C", "FIRE C"],
                                    fire_name: ['svg_p:tspan4199'], 
                                    draw_data: [[], ['svg_p:path3809']], 
                                    draw_name: [[], []]};

         poc_signals.IORDY       = { name: "IORDY", 
                                    visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
                                    depends_on: ["CLK"],
		                    behavior: ["FIRE_IFCHANGED IORDY C", "FIRE_IFCHANGED IORDY C"],
                                    fire_name: ['svg_p:tspan4089','svg_p:path3793','svg_p:text3911'], 
                                    draw_data: [[], ['svg_p:path3897']], 
                                    draw_name: [[], []]};

         poc_signals.IO_IOR      = { name: "IO_IOR", 
                                    visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
                                    behavior: ["NOP", "IO_IOR BUS_AB BUS_DB IOSR IOCR IODR CLK; FIRE M1"],
                                    fire_name: ['svg_p:tspan4173'], 
                                    draw_data: [[], ['svg_p:path3795', 'svg_p:path3733']], 
                                    draw_name: [[], []]};

         poc_signals.IO_IOW      = { name: "IO_IOW", 
                                    visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
                                    behavior: ["NOP", "IO_IOW BUS_AB BUS_DB IOSR IOCR IODR CLK; FIRE M1"],
                                    fire_name: ['svg_p:text3785-0-6-0-5-5'], 
                                    draw_data: [[], ['svg_p:path3805', 'svg_p:path3733']], 
                                    draw_name: [[], []]};

         poc_signals.IO_IE       = { name: "IO_IE", 
                                    visible: true, type: "L", value: 1, default_value: 1, nbits: "1", 
                                    behavior: ["NOP", "IO_CHK_I CLK INT INTV; FIRE C"],
                                    fire_name: [], 
                                    draw_data: [[], []], 
                                    draw_name: [[], []] };

         poc_signals.INTA        = { name: "INTA", 
                                    visible: true, type: "L", value: 1, default_value: 0, nbits: "1", 
                                    behavior: ["NOP", "INTA CLK INT INTA BUS_DB INTV; FIRE M1; FIRE C"],
                                    fire_name: ['svg_p:text3785-0-6-0-5-5-1-1'], 
                                    draw_data: [[], ['svg_p:path3807', 'svg_p:path3737']], 
                                    draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        poc_behaviors.IO_IOR         = { nparameters: 7,
                                        types: ["E", "E", "E", "E", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var bus_ab = get_value(poc_states[s_expr[1]]) ;
                                                      var iosr   = get_value(poc_states[s_expr[3]]) ;
                                                      var iocr   = get_value(poc_states[s_expr[4]]) ;
                                                      var iodr   = get_value(poc_states[s_expr[5]]) ;

                                                      if (bus_ab == IOSR_ID) 
                                                          set_value(poc_states[s_expr[2]], iosr);
                                                      if (bus_ab == IOCR_ID) 
                                                          set_value(poc_states[s_expr[2]], iocr);
                                                      if (bus_ab == IODR_ID) 
                                                          set_value(poc_states[s_expr[2]], iodr);
                                                   },
                                           verbal: function (s_expr) 
                                                   {
                                                      var verbal = "" ;

                                                      var bus_ab = get_value(poc_states[s_expr[1]]) ;
                                                      var iosr   = get_value(poc_states[s_expr[3]]) ;
                                                      var iocr   = get_value(poc_states[s_expr[4]]) ;
                                                      var iodr   = get_value(poc_states[s_expr[5]]) ;

                                                      if (bus_ab == IOSR_ID) 
                                                          verbal = "I/O device read at IOSR of value " + iosr + ". " ;
                                                      if (bus_ab == IOCR_ID) 
                                                          verbal = "I/O device read at IOCR of value " + iocr + ". " ;
                                                      if (bus_ab == IODR_ID) 
                                                          verbal = "I/O device read at IODR of value " + iodr + ". " ;

                                                      return verbal ;
                                                   }
                                      };

        poc_behaviors.IO_IOW         = { nparameters: 7,
                                        types: ["E", "E", "E", "E", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var bus_ab = get_value(poc_states[s_expr[1]]) ;
                                                      var bus_db = get_value(poc_states[s_expr[2]]) ;

                                                      if ( (bus_ab != IOSR_ID) &&
                                                           (bus_ab != IOCR_ID) &&
                                                           (bus_ab != IODR_ID) )
                                                      {
                                                            return; 
                                                      }

                                                      if (bus_ab == IOSR_ID) 
                                                          set_value(poc_states[s_expr[3]], bus_db);
                                                      if (bus_ab == IOCR_ID) 
                                                          set_value(poc_states[s_expr[4]], bus_db);
                                                      if (bus_ab == IODR_ID) 
                                                          set_value(poc_states[s_expr[5]], bus_db);

                                                      // check & modify the timer
                                                      var iocr_id = get_value(poc_states[s_expr[4]]) ;
                                                      var iodr_id = get_value(poc_states[s_expr[5]]) ;

                                                      if ( (iocr_id < 0) || (iocr_id > 7) ) 
                                                            return; 

                                                      set_var(poc_internal_states.io_int_factory[iocr_id].period, iodr_id);
                                                      set_var(poc_internal_states.io_int_factory[iocr_id].probability, 1) ;
                                                      if (0 == iodr_id)
                                                          set_var(poc_internal_states.io_int_factory[iocr_id].probability, 0) ;
                                                   },
                                           verbal: function (s_expr) 
                                                   {
                                                      var verbal = "" ;
                                                      var bus_ab = get_value(poc_states[s_expr[1]]) ;
                                                      var bus_db = get_value(poc_states[s_expr[2]]) ;

                                                      if (bus_ab == IOSR_ID) 
                                                          verbal = "I/O device write at IOSR with value " + bus_db + ". " ;
                                                      if (bus_ab == IOCR_ID) 
                                                          verbal = "I/O device write at IOCR with value " + bus_db + ". " ;
                                                      if (bus_ab == IODR_ID) 
                                                          verbal = "I/O device write at IODR with value " + bus_db + ". " ;

                                                      return verbal ;
                                                   }
                                      };

        poc_behaviors.IO_CHK_I       = { nparameters: 4, 
                                        types: ["E", "S", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var clk = get_value(poc_states[s_expr[1]]) ;

						      for (var i=poc_internal_states.io_int_factory.length-1; i>=0; i--)
                                                      {
                                                           if (get_var(poc_internal_states.io_int_factory[i].period) == 0)
 							       continue;

                                                           if (get_var(poc_internal_states.io_int_factory[i].active) == true)
                                                           {
                                                               set_value(poc_signals[s_expr[2]], 1); // ['INT']=1
                                                               set_value( poc_states[s_expr[3]], i); // ['INTV']=i
                                                           }

                                                           if ((clk % get_var(poc_internal_states.io_int_factory[i].period)) == 0)
                                                           {
                                                              if (Math.random() > get_var(poc_internal_states.io_int_factory[i].probability))
                                                                  continue ;

                                                              set_var(poc_internal_states.io_int_factory[i].accumulated, get_var(poc_internal_states.io_int_factory[i].accumulated) + 1);
                                                              set_var(poc_internal_states.io_int_factory[i].active, true) ;

                                                              if (typeof poc_events.io[clk] == "undefined")
                                                                  poc_events.io[clk] = [] ;
                                                              poc_events.io[clk].push(i) ;

                                                              set_value(poc_signals[s_expr[2]], 1); // ['INT']=1
                                                              set_value( poc_states[s_expr[3]], i); // ['INTV']=i
                                                           }
                                                      }
                                                   },
                                           verbal: function (s_expr) 
                                                   {
                                                      return "Check I/O Interruption. " ;
                                                   }
                                      };

        poc_behaviors.INTA           = { nparameters: 6, 
                                        types: ["E", "S", "S", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var clk = get_value(poc_states[s_expr[1]]) ;

                                                      if (typeof poc_events.io[clk] != "undefined") 
                                                      {
                                                          set_value(poc_states[s_expr[4]], poc_events.io[clk][0]); // ['BUS_DB'] = i
  							  return ;
                                                      }

						      set_value(poc_signals[s_expr[2]], 0); // ['INT']  = 0
						      set_value(poc_states[s_expr[5]], 0); // ['INTV'] = 0

						      for (var i=0; i<poc_internal_states.io_int_factory.length; i++) 
                                                      {
                                                           if (get_var(poc_internal_states.io_int_factory[i].active))
                                                           {
                                                               set_value(poc_signals[s_expr[2]], 0) ; // ['INT']  = 1
                                                               set_value(poc_states[s_expr[5]], i) ; // ['INTV'] = i
							       set_value(poc_states[s_expr[4]], i) ; // ['BUS_DB'] = i

                                                               if (typeof poc_events.io[clk] == "undefined") 
                                                                   poc_events.io[clk] = [] ;
                                                               poc_events.io[clk].push(i) ;

							       set_var(poc_internal_states.io_int_factory[i].active, false);
                                                               break; // stop at first INT
                                                           }
                                                      }
                                                   },
                                           verbal: function (s_expr) 
                                                   {
                                                      return "Signal an interruption ACK. " ;
                                                   }
                                      };

        poc_behaviors.IO_RESET      = { nparameters: 1,
                                       operation: function (s_expr) 
                                                  {
						     // reset events.io
                                                     poc_events.io = {} ;

						     // reset the I/O factory
						     for (var i=0; i<poc_internal_states.io_int_factory.length; i++)
						     {
						      set_var(poc_internal_states.io_int_factory[i].accumulated, 0);
						      set_var(poc_internal_states.io_int_factory[i].active, false);
						     }
                                                  },
                                          verbal: function (s_expr) 
                                                  {
                                                     return "Reset the I/O device. " ;
                                                  }
                                     };

