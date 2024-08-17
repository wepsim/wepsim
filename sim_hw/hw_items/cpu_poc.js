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
 *  CPU
 */

function cpu_poc_register ( sim_p )
{
        sim_p.components["CPU"] = {
		                  name: "CPU",
		                  version: "1",
		                  abilities:    [ "CPU" ],

		                  // ui: details
		                  details_name: [ "REGISTER_FILE", "CONTROL_MEMORY", "CLOCK", "CPU_STATS" ],
				  details_fire: [ ['svg_p:text3495', 'svg_p:text3029', 'svg_p:text3031'], ['svg_cu:text3010'],
					          ['svg_p:text3459-7', 'svg_cu:text4138', 'svg_cu:text4138-7', 'svg_cu:tspan4140-2'], ['svg_p:text3495'] ],

		                  // state: write_state, read_state, get_state
		                  write_state:  function ( vec ) {
                                                  if (typeof vec.CPU == "undefined") {
                                                      vec.CPU = {} ;
					          }

					          // var internal_reg = ["PC", "MAR", "MBR", "IR", "RT1", "RT1", "RT2", "SR"] ;
					          var internal_reg = ["PC", "SR"] ;

						  var value = 0 ;
					          for (var i=0; i<sim_p.states.BR.length; i++)
						  {
						      value = parseInt(get_value(sim_p.states.BR[i])) >>> 0;
						      if (value != 0) {
							  vec.CPU["R" + i] = {"type":  "register",
								              "default_value": 0x0,
								              "id":    "R" + i,
								              "op":    "=",
								              "value": "0x" + value.toString(16)} ;
						      }
						  }

					          for (var i=0; i<internal_reg.length; i++)
						  {
						      value = parseInt(sim_p.states['REG_' + internal_reg[i]].value) >>> 0;
						      if (value != 0) {
							  vec.CPU[internal_reg[i]] = {"type":  "register",
								                      "default_value": 0x0,
								                      "id":    internal_reg[i],
								                      "op":    "=",
								                      "value": "0x" + value.toString(16)} ;
						      }
						  }

						  return vec;
				               },
		                  read_state:  function ( vec, check ) {
                                                  if (typeof vec.CPU == "undefined")
                                                      vec.CPU = {} ;

					          var key = check["id"].toUpperCase().trim() ;
					          var val = parseInt(check["value"]).toString(16) ;
					          if ("REGISTER" == check["type"].toUpperCase().trim())
                                                  {
						      vec.CPU[key] = {"type":  "register",
								      "default_value": 0,
								      "id":    key,
								      "op":    check["condition"],
								      "value": "0x" + val} ;
                                                      return true ;
                                                  }

                                                  return false ;
				              },
		                  get_state:  function ( reg ) {
					          var r_reg = reg.toUpperCase().trim() ;
					          if (typeof sim_p.states['REG_' + r_reg] != "undefined") {
					              var value = get_value(sim_p.states['REG_' + r_reg]) >>> 0;
					              return "0x" + value.toString(16) ;
					          }

					              r_reg = r_reg.replace('R','') ;
					          var index = parseInt(r_reg) ;
					          if (typeof sim_p.states.BR[index] != "undefined") {
					              var value = get_value(sim_p.states.BR[index]) >>> 0;
					              return "0x" + value.toString(16) ;
					          }

					          return null ;
				              },

		                  // native: get_value, set_value
                                  get_value:  function ( elto ) {
						    if (Number.isInteger(elto))
							 index = elto ;
						    else index = parseInt(elto) ;

						    if (isNaN(index))
							return (get_value(simhw_sim_state(elto)) >>> 0) ;

						    return (get_value(simhw_sim_states().BR[index]) >>> 0) ;
				              },
                                  set_value:  function ( elto, value ) {
						    var pc_name = simhw_sim_ctrlStates_get().pc.state ;

						    if (Number.isInteger(elto))
							 index = elto ;
						    else index = parseInt(elto) ;

						    if (isNaN(index))
						    {
							set_value(simhw_sim_state(elto), value) ;

							if (pc_name === elto) {
							    show_asmdbg_pc() ;
							}

							return value ;
						    }

						    return set_value(simhw_sim_states().BR[index], value) ;
				              }
                            	};


	/*
	 *  Control States, and Default elements at the Instruction Register (IR)
	 */

        sim_p.ctrl_states.pc  = {
		                     name:  "PC",
		                     state: "REG_PC",
		                     is_pointer: true
	                          } ;
        sim_p.ctrl_states.sp  = {
		                     name:  "SP",
		                     state: "BR.29",
		                     is_pointer: true
	                          } ;
        sim_p.ctrl_states.fp  = {
		                     name:  "FP",
		                     state: "BR.30",
		                     is_pointer: true
	                          } ;
        sim_p.ctrl_states.ir  = {
		                     name:  "IR",
		                     state: "REG_IR",
		                     default_eltos: {
						"co": { "begin":  0, "end":  5, "length": 6 },
						"cop":{ "begin": 27, "end": 31, "length": 5 },

						"oc": { "begin":  0, "end":  5, "length": 6 },
				 	        "eoc":{ "begin": 27, "end": 31, "length": 5 },
					     //	"eoc":{ "begin": [12,25], "end": [14,31], "lengths": [3,7], "length":10 }
						    },
		                     is_pointer: false
	                          } ;


	/*
	 *  Internal States
	 */

        sim_p.internal_states.io_hash      = {} ;
        sim_p.internal_states.fire_stack   = [] ;

        sim_p.internal_states.tri_state_names = [ "T1","T2","T3","T6","T8","T9","T10","T11","T12" ] ;
        sim_p.internal_states.fire_visible    = { 'databus': false, 'internalbus': false } ;
        sim_p.internal_states.filter_states   = [ "REG_IR_DECO,col-12",
                                                    "REG_IR,col-auto",  "REG_PC,col-auto",  "REG_SR,col-auto",
                                                    "REG_RT1,col-auto",
                                                    "REG_MAR,col-auto", "REG_MBR,col-auto", "REG_MICROADDR,col-auto" ] ;
        sim_p.internal_states.filter_signals  = [ "A0,0",   "B,0",    "C,0",
                                                    "SELA,5", "SELB,5", "SELC,2", "SELCOP,0",
                                                    "MRA,0",  "MRB,0",  "MRC,0",  "MC,0",
				            "C0,0", "C1,0",   "C2,0",   "C3,0",   "C4,0",     "C7,0",
				            "T1,0", "T2,0",   "T3,0",   "T6,0",   "T8,0",
                                            "T9,0", "T10,0",  "T11,0",
				                    "M1,0",   "M7,0", "MA,0",   "MB,0",
                                                    "LC,0",   "SE,0", "SIZE,0", "OFFSET,0",
                                                    "BW,0",   "R,0",  "W,0",    "TA,0",  "TD,0", "IOR,0","IOW,0",
                                                    "TEST_I,0", "TEST_U,0"  ] ;
        sim_p.internal_states.alu_flags       = { 'flag_n': 0, 'flag_z': 0, 'flag_v': 0, 'flag_c': 0 } ;


	/*
	 *  States
	 */

	/* REGISTER FILE STATES */
	sim_p.states.BR = [] ;
	sim_p.states.BR[0]          = { name:"R0",    verbal: "Register  0",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[1]          = { name:"R1",    verbal: "Register  1",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[2]          = { name:"R2",    verbal: "Register  2",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[3]          = { name:"R3",    verbal: "Register  3",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[4]          = { name:"R4",    verbal: "Register  4",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[5]          = { name:"R5",    verbal: "Register  5",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[6]          = { name:"R6",    verbal: "Register  6",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[7]          = { name:"R7",    verbal: "Register  7",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[8]          = { name:"R8",    verbal: "Register  8",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[9]          = { name:"R9",    verbal: "Register  9",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[10]         = { name:"R10",   verbal: "Register 10",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[11]         = { name:"R11",   verbal: "Register 11",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[12]         = { name:"R12",   verbal: "Register 12",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[13]         = { name:"R13",   verbal: "Register 13",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[14]         = { name:"R14",   verbal: "Register 14",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[15]         = { name:"R15",   verbal: "Register 15",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[16]         = { name:"R16",   verbal: "Register 16",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[17]         = { name:"R17",   verbal: "Register 17",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[18]         = { name:"R18",   verbal: "Register 18",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[19]         = { name:"R19",   verbal: "Register 19",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[20]         = { name:"R20",   verbal: "Register 20",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[21]         = { name:"R21",   verbal: "Register 21",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[22]         = { name:"R22",   verbal: "Register 22",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[23]         = { name:"R23",   verbal: "Register 23",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[24]         = { name:"R24",   verbal: "Register 24",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[25]         = { name:"R25",   verbal: "Register 25",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[26]         = { name:"R26",   verbal: "Register 26",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[27]         = { name:"R27",   verbal: "Register 27",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[28]         = { name:"R28",   verbal: "Register 28",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[29]         = { name:"R29",   verbal: "Register 29",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[30]         = { name:"R30",   verbal: "Register 30",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[31]         = { name:"R31",   verbal: "Register 31",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[32]         = { name:"R32",   verbal: "Register 32",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[33]         = { name:"R33",   verbal: "Register 33",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[34]         = { name:"R34",   verbal: "Register 34",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[35]         = { name:"R35",   verbal: "Register 35",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[36]         = { name:"R36",   verbal: "Register 36",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[37]         = { name:"R37",   verbal: "Register 37",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[38]         = { name:"R38",   verbal: "Register 38",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[39]         = { name:"R39",   verbal: "Register 39",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[40]         = { name:"R40",   verbal: "Register 40",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[41]         = { name:"R41",   verbal: "Register 41",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[42]         = { name:"R42",   verbal: "Register 42",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[43]         = { name:"R43",   verbal: "Register 43",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[44]         = { name:"R44",   verbal: "Register 44",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[45]         = { name:"R45",   verbal: "Register 45",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[46]         = { name:"R46",   verbal: "Register 46",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[47]         = { name:"R47",   verbal: "Register 47",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[48]         = { name:"R48",   verbal: "Register 48",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[49]         = { name:"R49",   verbal: "Register 49",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[50]         = { name:"R50",   verbal: "Register 50",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[51]         = { name:"R51",   verbal: "Register 51",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[52]         = { name:"R52",   verbal: "Register 52",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[53]         = { name:"R53",   verbal: "Register 53",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[54]         = { name:"R54",   verbal: "Register 54",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[55]         = { name:"R55",   verbal: "Register 55",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[56]         = { name:"R56",   verbal: "Register 56",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[57]         = { name:"R57",   verbal: "Register 57",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[58]         = { name:"R58",   verbal: "Register 58",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[59]         = { name:"R59",   verbal: "Register 59",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[60]         = { name:"R60",   verbal: "Register 60",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[61]         = { name:"R61",   verbal: "Register 61",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[62]         = { name:"R62",   verbal: "Register 62",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_p.states.BR[63]         = { name:"R63",   verbal: "Register 63",  visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };

	sim_p.states["REG_PC"]         = { name:"PC",  verbal: "Program Counter Register",
                                             visible:true, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };
	sim_p.states["REG_MAR"]        = { name:"MAR", verbal: "Memory Address Register",
                                             visible:true, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };
	sim_p.states["REG_MBR"]        = { name:"MBR", verbal: "Memory Data Register",
                                             visible:true, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };
	sim_p.states["REG_IR"]         = { name:"IR",  verbal: "Instruction Register",
                                             visible:true, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };
	sim_p.states["REG_SR"]         = { name:"SR", verbal: "State Register",
                                             visible:true, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };
	sim_p.states["REG_RT1"]        = { name:"RT1",  verbal: "Temporal Register 1",
                                             visible:true, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };

	/* BUSES */
	sim_p.states["BUS_IB"]         = { name:"I_BUS", verbal: "Internal Bus",
                                             visible:false, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };
	sim_p.states["BUS_AB"]         = { name:"A_BUS", verbal: "Address Bus",
                                             visible:false, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };
	sim_p.states["BUS_CB"]         = { name:"C_BUS", verbal: "Control Bus",
                                             visible:false, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };
	sim_p.states["BUS_DB"]         = { name:"D_BUS", verbal: "Data Bus",
                                             visible:false, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };

	/* REGISTER FILE (RELATED) STATES */
	sim_p.states["RA_T9"]          = { name: "RA_T9",  verbal: "Input of T9 Tristate",
                                             visible:false, nbits: "32", value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["RB_T10"]         = { name: "RB_T10", verbal: "Input of T10 Tristate",
                                             visible:false, nbits: "32", value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["HPC_T12"]        = { name: "HPC_T12", verbal: "Input of T12 Tristate",
				             visible:false, nbits: "32", value:0, default_value:0,
				             draw_data: [] };

	/* (RELATED) SELEC STATES */
	sim_p.states["SELEC_T3"]       = { name: "SELEC_T3", verbal: "Input of T3 Tristate",
                                             visible:false, nbits: "32", value:0, default_value:0,
                                             draw_data: [] };

	sim_p.states["ALU_T6"]         = { name:"ALU_T6",  verbal: "Input of T6 Tristate",
                                             visible:false, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };
	sim_p.states["MA_ALU"]         = { name:"MA_ALU",  verbal: "Input ALU via MA",
                                             visible:false, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };
	sim_p.states["MB_ALU"]         = { name:"MB_ALU",  verbal: "Input ALU via MB",
                                             visible:false, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };

	sim_p.states["FLAG_C"]         = { name: "FLAG_C", verbal: "Carry Flag",
                                             visible:true, nbits: "1", value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["FLAG_V"]         = { name: "FLAG_V", verbal: "Overflow Flag",
                                             visible:true, nbits: "1", value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["FLAG_N"]         = { name: "FLAG_N", verbal: "Negative Flag",
                                             visible:true, nbits: "1", value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["FLAG_Z"]         = { name: "FLAG_Z", verbal: "Zero Flag",
                                             visible:true, nbits: "1", value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["FLAG_I"]         = { name: "FLAG_I", verbal: "Interruption Flag",
                                             visible:true, nbits: "1", value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["FLAG_U"]         = { name: "FLAG_U", verbal: "User Flag",
                                             visible:true, nbits: "1", value:0, default_value:0,
                                             draw_data: [] };

	/* DEVICES AND MEMORY */
	sim_p.states["BS_M1"]          = { name: "BS_M1", verbal: "from Memory",
                                             visible:false, nbits: "32", value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["BS_TD"]          = { name: "BS_TD", verbal: "Memory",
                                             visible:false, nbits: "32", value:0, default_value:0,
                                             draw_data: [] };

	sim_p.states["INTV"]           = { name: "INTV", verbal: "Interruption Vector",
                                             visible:false, nbits: "8",  value:0, default_value:0,
                                             draw_data: [] };


	/* MUX A (RELATED) STATES */
	sim_p.states["M1_C1"]          = { name:"M1_C1", verbal: "Input of Memory Data Register",
                                             visible:false, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };
	sim_p.states["M7_C7"]          = { name:"M7_C7", verbal: "Input of State Register",
                                             visible:false, nbits:"32", value:0,  default_value:0,
                                             draw_data: [] };

	sim_p.states["VAL_ZERO"]       = { name: "VAL_ZERO", verbal: "Wired Zero",
                                             visible:false, nbits: "1",  value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["VAL_ONE"]        = { name: "VAL_ONE",  verbal: "Wired One",
                                             visible:false, nbits: "32", value:1, default_value:1,
                                             draw_data: [] };
	sim_p.states["VAL_FOUR"]       = { name: "VAL_FOUR", verbal: "Wired Four",
                                             visible:false, nbits: "32", value:4, default_value:4,
                                             draw_data: [] };

	/* VIRTUAL */
	sim_p.states["REG_IR_DECO"] = { name:"IR_DECO",  verbal: "Instruction Decoded",
                                          visible:true,  nbits:"0",  value:0,  default_value:0,
                                          draw_data: [] };
	sim_p.states["DECO_INS"]    = { name:"DECO_INS", verbal: "Instruction decoded in binary",
                                          visible:true,  nbits:"32", value:0,  default_value:0,
                                          draw_data: [] };
	sim_p.states["CLK"]         = { name:"CLK",      verbal: "Clock",
                                          visible:false, nbits:"32", value:0,  default_value:0,
                                          draw_data: [] };
	sim_p.states["ACC_TIME"]    = { name:"ACC_TIME", verbal: "Accumulated CPU time",
                                          visible:false, nbits:"32", value:0,  default_value:0,
                                          draw_data: [] };
	sim_p.states["TTCPU"]       = { name:"TTCPU", verbal: "Several Tristates to the internal data bus in CPU activated",
                                          visible:false, nbits:"32", value:0,  default_value:0,
                                          draw_data: [] };
	sim_p.states["ACC_PWR"]     = { name:"ACC_PWR", verbal: "Accumulated Energy Consumption",
                                          visible:false, nbits:"32", value:0,  default_value:0,
                                          draw_data: [] };


	/*
	 *  Signals
	 */

	/* REGISTER LOAD */
	 sim_p.signals["C0"]  = { name: "C0", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP", "MV REG_MAR BUS_IB"],
			            fire_name: ['svg_p:text3077'],
			            draw_data: [['svg_p:path3081']],
			            draw_name: [['svg_p:path3075']] };
	 sim_p.signals["C1"]  = { name: "C1", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP", "MV REG_MBR M1_C1"],
			            fire_name: ['svg_p:text3079'],
			            draw_data: [['svg_p:path3055']],
			            draw_name: [['svg_p:path3073']] };
	 sim_p.signals["C2"]  = { name: "C2", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP", "MV REG_PC BUS_IB; UPDATEDPC"],
			            fire_name: ['svg_p:text3179'],
			            draw_data: [['svg_p:path3217']],
			            draw_name: [['svg_p:path3177']] };
	 sim_p.signals["C3"]  = { name: "C3", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP", "MV REG_IR BUS_IB; DECO; FIRE_IFSET C 10"],
			            fire_name: ['svg_p:text3439'],
			            draw_data: [['svg_p:path3339', 'svg_p:path3913-4', 'svg_p:path3659-1']],
			            draw_name: [['svg_p:path3337']] };
	 sim_p.signals["C4"]  = { name: "C4", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP", "MV REG_RT1 BUS_IB"],
			            fire_name: ['svg_p:tspan482'],
			            draw_data: [['svg_p:path3339-4']],
			            draw_name: [['svg_p:path3337-0']] };
	 sim_p.signals["C7"]  = { name: "C7", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP", "MV REG_SR M7_C7"],
			            fire_name: ['svg_p:text3655'],
			            draw_data: [['svg_p:path3651-9']],
			            draw_name: [['svg_p:path3681']] };

	/* TRI-STATES */
	 sim_p.signals["TA"]  = { name: "TA",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP", "MV BUS_AB REG_MAR"],
			            fire_name: ['svg_p:text3091'],
			            draw_data: [['svg_p:path3083','svg_p:path3089', 'svg_p:path3597', 'svg_p:path3513', 'svg_p:path3601', 'svg_p:path3601-2', 'svg_p:path3187', 'svg_p:path3087', 'svg_p:path2995','svg_p:path3535']],
			            draw_name: [['svg_p:path3085']] };
	 sim_p.signals["TD"]  = { name: "TD",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP; CHECK_RTD", "MV BUS_DB REG_MBR; FIRE R; FIRE W; CHECK_RTD"],
			            fire_name: ['svg_p:text3103'],
			            draw_data: [['svg_p:path3093','svg_p:path3101','svg_p:path3587','svg_p:path3419-8','svg_p:path3071','svg_p:path3099','svg_p:path3097','svg_p:path3559-5','svg_p:path3419-1-0','svg_p:path3583','svg_p:path3419-1','svg_p:path3491','svg_p:path3641','svg_p:path3541']],
			            draw_name: [['svg_p:path3095']] };
	 sim_p.signals["T1"]  = { name: "T1",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP; RST_TT TTCPU 0", "MV BUS_IB REG_MBR; FIRE M7; FIRE M1; SET_TT TTCPU 0"],
			            fire_name: ['svg_p:text3105'],
			            draw_data: [['svg_p:path3065','svg_p:path3071', 'svg_p:path3069','svg_p:path3049','svg_p:path3063-9', 'svg_p:path3071']],
			            draw_name: [['svg_p:path3067']] };
	 sim_p.signals["T2"]  = { name: "T2",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP; RST_TT TTCPU 1", "MV BUS_IB REG_PC; FIRE M7; FIRE M1; SET_TT TTCPU 1"],
			            fire_name: ['svg_p:text3449'],
			            draw_data: [['svg_p:path3195','svg_p:path3199', 'svg_p:path3201','svg_p:path3049']],
			            draw_name: [['svg_p:path3329']] };
	 sim_p.signals["T3"]  = { name: "T3",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP; RST_TT TTCPU 2", "MV BUS_IB SELEC_T3; FIRE M7; FIRE M1; SET_TT TTCPU 2"],
			            fire_name: ['svg_p:text3451'],
			            draw_data: [['svg_p:path3347','svg_p:path3349', 'svg_p:path3931', 'svg_p:path3345','svg_p:path3049', 'svg_p:path3341']],
			            draw_name: [['svg_p:path3351']] };
	 sim_p.signals["T6"]  = { name: "T6",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP; RST_TT TTCPU 3", "MV BUS_IB ALU_T6; FIRE M7; FIRE M1; SET_TT TTCPU 3"],
			            fire_name: ['svg_p:text3457'],
			            draw_data: [['svg_p:path3315','svg_p:path3589', 'svg_p:path3317', 'svg_p:path3163-2','svg_p:path3049', 'svg_p:path3317-9', 'svg_p:path3321', 'svg_p:path3261-8']],
			            draw_name: [['svg_p:path3319']] };
	 sim_p.signals["T8"]  = { name: "T8",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP; RST_TT TTCPU 4", "MV BUS_IB REG_SR; FIRE M7; FIRE M1; SET_TT TTCPU 4"],
			            fire_name: ['svg_p:text3657'],
			            draw_data: [['svg_p:path3645','svg_p:path3651', 'svg_p:path3647','svg_p:path3049']],
			            draw_name: [['svg_p:path3649']] };
	 sim_p.signals["T9"]  = { name: "T9",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP; RST_TT TTCPU 5", "MV BUS_IB RA_T9; FIRE M7; FIRE M1; SET_TT TTCPU 5"],
			            fire_name: ['svg_p:text3147'],
			            draw_data: [['svg_p:path3131','svg_p:path3143', 'svg_p:path3139','svg_p:path3049','svg_p:path3143-9']],
			            draw_name: [['svg_p:path3133']] };
	 sim_p.signals["T10"] = { name: "T10", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP; RST_TT TTCPU 6", "MV BUS_IB RB_T10; FIRE M7; FIRE M1; SET_TT TTCPU 6"],
			            fire_name: ['svg_p:text3149'],
			            draw_data: [['svg_p:path3135','svg_p:path3145', 'svg_p:path3141','svg_p:path3049','svg_p:path3145-5']],
			            draw_name: [['svg_p:path3137']] };
	 sim_p.signals["T11"] = { name: "T11", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP; RST_TT TTCPU 7", "CP_FIELD BUS_IB REG_MICROINS/EXCODE; FIRE M7; FIRE M1; SET_TT TTCPU 7"],
			            fire_name: ['svg_p:text3147-5','svg_cu:tspan4426'],
			            draw_data: [['svg_p:path3131-3','svg_p:path3081-3','svg_p:path3139-7','svg_p:path3049','svg_cu:path3081-3','svg_cu:path3139-7','svg_cu:path3502']],
			            draw_name: [['svg_p:path3133-6','svg_cu:path3133-6']] };
	 sim_p.signals["T12"] = { name: "T12", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP; RST_TT TTCPU 8", "MV BUS_IB HPC_T12; FIRE M7; FIRE M1; SET_TT TTCPU 8"],
			            fire_name: ['svg_p:text3147-5-0-1-1'],
			            draw_data: [['svg_p:path3131-3-8-4-31','svg_p:path3139-7-1-4-3','svg_cu:path3049', 'svg_p:path3081-3-8-5-3', 'svg_p:path3081-3-8-5-3-7']],
			            draw_name: [['svg_p:path3133-6-9-7-5']] };

	/* MUX. */
	 sim_p.signals["M1"]  = { name: "M1", visible: true, type: "L",  value: 0, default_value:0, nbits: "1",
			            behavior: ["MV M1_C1 BUS_IB", "MV M1_C1 BUS_DB"],
                                    depends_on: ["C1"],
			            fire_name: ['svg_p:text3469'],
			            draw_data: [['svg_p:path3063','svg_p:path3061','svg_p:path3059'], ['svg_p:path3057','svg_p:path3641','svg_p:path3419','svg_p:path3583', 'svg_p:path3491']],
			            draw_name: [[], ['svg_p:path3447']] };
	 sim_p.signals["M7"]  = { name: "M7", visible: true, type: "L",  value: 0, default_value:0, nbits: "1",
			            behavior: ["MV M7_C7 BUS_IB",
				               "MV M7_C7 REG_SR; UPDATE_FLAG M7_C7 FLAG_C 31; UPDATE_FLAG M7_C7 FLAG_V 30; UPDATE_FLAG M7_C7 FLAG_N 29; UPDATE_FLAG M7_C7 FLAG_Z 28"],
                                    depends_on: ["C7"],
			            fire_name: ['svg_p:text3673'],
			            draw_data: [['svg_p:path3691', 'svg_p:path3693', 'svg_p:path3659'], ['svg_p:path3695', 'svg_p:path3331']],
			            draw_name: [[], ['svg_p:path3667']] };
	 sim_p.signals["MA"]  = { name: "MA",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["MV MA_ALU RA_T9; FIRE COP", "MV MA_ALU BUS_IB; FIRE COP"],
                                    depends_on: ["SELA","SELB"],
			            fire_name: ['svg_p:text3463'],
			            draw_data: [['svg_p:path3249', 'svg_p:path3161', 'svg_p:path3165'], ['svg_p:path3279']],
			            draw_name: [[], ['svg_p:path3423']] };
	 sim_p.signals["MB"]  = { name: "MB",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["MV MB_ALU RB_T10; FIRE COP", "MV MB_ALU REG_PC; FIRE COP"],
                                    depends_on: ["SELA","SELB"],
			            fire_name: ['svg_p:text3465'],
			            draw_data: [['svg_p:path3281', 'svg_p:path3171', 'svg_p:path3169'],
                                                ['svg_p:path3283']],
			            draw_name: [[], ['svg_p:path3425', 'svg_p:path3427']] };
	 sim_p.signals["MH"]  = { name: "MH", visible: true, type: "L",  value: 0, default_value:0, nbits: "2",
			            behavior: ["MV HPC_T12 CLK", "MV HPC_T12 ACC_TIME", "MV HPC_T12 ACC_PWR", "NOP"],
			            fire_name: ['svg_p:text3147-5-0-1-8-4'],
			            draw_data: [[], ['svg_p:path3081-3-8-5-3']],
			            draw_name: [[], ['svg_p:path3306-8-7-6']] };

	 sim_p.signals["COP"] = { name: "COP", visible: true, type: "L", value: 0, default_value:0, nbits: "5", forbidden: true,
			            behavior: ["NOP_ALU; UPDATE_NZVC",
                                               "AND ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "OR ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "NOT ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "XOR ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "SRL ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "SRA ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "SL ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "RR ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "RL ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "ADD ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "SUB ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "MUL ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "DIV ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "MOD ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "LUI ALU_T6 MA_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "ADDFOUR ALU_T6 MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "ADDONE ALU_T6 MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "SUBFOUR ALU_T6 MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "SUBONE ALU_T6 MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "FADD ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "FSUB ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "FMUL ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "FDIV ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "FMOD ALU_T6 MA_ALU MB_ALU; UPDATE_NZVC; FIRE_IFSET T6 1; FIRE_IFSET M7 1",
					       "NOP_ALU",
					       "NOP_ALU",
					       "NOP_ALU",
					       "NOP_ALU",
					       "NOP_ALU",
					       "NOP_ALU",
					       "NOP_ALU"],
                                    depends_on: ["SELCOP"],
			            fire_name: ['svg_p:text3303'],
			            draw_data: [['svg_p:path3237', 'svg_p:path3239',
                                                 'svg_p:path3261-8', 'svg_p:path3321', 'svg_p:path3901-6', 'svg_p:path3317-9']],
			            draw_name: [['svg_p:path3009', 'svg_p:path3301']] };
	 sim_p.signals["SELA"] = { name: "SELA", visible: true, type: "L", value: 0, default_value:0, nbits: "6",
			             behavior: ["FIRE_IFCHANGED MRA SELA; RESET_CHANGED SELA"],
                                     depends_on: ["RA"],
			             fire_name: ['svg_cu:text3164'],
			             draw_data: [[]],
			             draw_name: [[]] };
	 sim_p.signals["SELB"] = { name: "SELB", visible: true, type: "L", value: 0, default_value:0, nbits: "6",
			             behavior: ["FIRE_IFCHANGED MRB SELB; RESET_CHANGED SELB"],
                                     depends_on: ["RB"],
			             fire_name: ['svg_cu:text3168'],
			             draw_data: [[]],
			             draw_name: [[]] };
	 sim_p.signals["SELC"] = { name: "SELC", visible: true, type: "L", value: 0, default_value:0, nbits: "6",
			             behavior: ["FIRE_IFCHANGED MRC SELC; RESET_CHANGED SELC"],
                                     depends_on: ["RC"],
			             fire_name: ['svg_cu:text3172'],
			             draw_data: [[]],
			             draw_name: [[]] };
	 sim_p.signals["SELCOP"] = { name: "SELCOP", visible: true, type: "L", value: 0, default_value:0, nbits: "5",
			             behavior: ["FIRE_IFCHANGED MC SELCOP; RESET_CHANGED SELCOP"],
                                     depends_on: ["COP"],
			             fire_name: ['svg_cu:text3312'],
			             draw_data: [[]],
			             draw_name: [[]] };
	 sim_p.signals["EXCODE"] = { name: "EXCODE", visible: true, type: "L", value: 0, default_value:0, nbits: "4",
			          behavior: ["FIRE T11"],
			          fire_name: ['svg_cu:text3312-6'],
			          draw_data: [[]],
			          draw_name: [[]] };

	 sim_p.signals["RA"]  = { name: "RA", visible: true, type: "L", value: 0, default_value:0, nbits: "6", forbidden: true,
			            behavior: ["GET RA_T9 BR RA; FIRE_IFSET T9 1; FIRE_IFSET MA 0"],
                                    depends_on: ["SELA"],
			            fire_name: ['svg_p:text3107'],
			            draw_data: [[]],
			            draw_name: [['svg_p:path3109']] };
	 sim_p.signals["RB"]  = { name: "RB", visible: true, type: "L", value: 0, default_value:0, nbits: "6", forbidden: true,
			            behavior: ["GET RB_T10 BR RB; FIRE_IFSET T10 1; FIRE_IFSET MB 0"],
                                    depends_on: ["SELB"],
			            fire_name: ['svg_p:text3123'],
			            draw_data: [[]],
			            draw_name: [['svg_p:path3113']] };
	 sim_p.signals["RC"]  = { name: "RC", visible: true, type: "L", value: 0, default_value:0, nbits: "6", forbidden: true,
			            behavior: ["FIRE LC"],
                                    depends_on: ["SELC"],
			            fire_name: ['svg_p:text3125'],
			            draw_data: [[]],
			            draw_name: [['svg_p:path3117']] };
	 sim_p.signals["LC"]  = { name: "LC", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			            behavior: ["NOP", "SET BR RC BUS_IB"],
			            fire_name: ['svg_p:text3127'],
			            draw_data: [['svg_p:path3153', 'svg_p:path3151', 'svg_p:path3129']],
			            draw_name: [['svg_p:path3121']] };

	 sim_p.signals["SE"]  = { name: "SE",     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ["MBITS SELEC_T3 0 REG_RT1 OFFSET SIZE 0 SE; FIRE T3",
			                       "MBITS SELEC_T3 0 REG_RT1 OFFSET SIZE 0 SE; FIRE T3"],
                                    depends_on: ["T3"],
			            fire_name: ['svg_p:text3593'],
			            draw_data: [[]],
			            draw_name: [['svg_p:path3591','svg_p:path3447-7-7']] };
	 sim_p.signals["SIZE"] = { name: "SIZE",   visible: true, type: "L", value: 0, default_value:0, nbits: "5",
			            behavior: ['MBITS SELEC_T3 0 REG_RT1 OFFSET SIZE 0 SE; FIRE T3'],
                                    depends_on: ["T3"],
			            fire_name: ['svg_p:text3363'],
			            draw_data: [[]],
			            draw_name: [['svg_p:path3355']] };
	 sim_p.signals["OFFSET"] = { name: "OFFSET", visible: true, type: "L", value: 0, default_value:0, nbits: "5",
			            behavior: ['MBITS SELEC_T3 0 REG_RT1 OFFSET SIZE 0 SE; FIRE T3'],
                                    depends_on: ["T3"],
			            fire_name: ['svg_p:text3707'],
			            draw_data: [[]],
			            draw_name: [['svg_p:path3359']] };

	 sim_p.signals["MC"]  = { name: "MC", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			            behavior: ['MBIT COP REG_IR 0 5; FIRE_IFCHANGED COP MC',
					       'CP_FIELD COP REG_MICROINS/SELCOP; FIRE_IFCHANGED COP MC'],
                                    depends_on: ["SELCOP"],
			            fire_name: ['svg_cu:text3322','svg_cu:text3172-1-5'],
			            draw_data: [['svg_cu:path3320', 'svg_cu:path3142'],['svg_cu:path3318', 'svg_cu:path3502-6', 'svg_cu:path3232-6']],
			            draw_name: [[],['svg_cu:path3306']] }; /*path3210 print red color line of rest of control signals*/

	 sim_p.signals["MRA"]  = { name: "MRA", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			              behavior: ['MBIT_SN RA REG_IR REG_MICROINS/SELA 5; FIRE RA;',
					         'CP_FIELD RA REG_MICROINS/SELA; FIRE RA;'],
                                      depends_on: ["SELA"],
			              fire_name: ['svg_cu:text3222'],
			              draw_data: [['svg_cu:path3494','svg_cu:path3492','svg_cu:path3490','svg_cu:path3142b','svg_cu:path3188',
                                                   'svg_cu:path3190','svg_cu:path3192','svg_cu:path3194','svg_cu:path3276','svg_cu:path3290',
                                                   'svg_cu:path3260','svg_cu:path3200','svg_cu:path3266','svg_cu:path3138','svg_cu:path3268',
                                                   'svg_cu:path3198','svg_cu:path3200'],
				  	          ['svg_cu:path3270','svg_cu:path3258','svg_cu:path3260',
				  	           'svg_cu:path3294','svg_cu:path3288','svg_cu:path3280','svg_cu:path3258','svg_cu:path3280',
                                                   'svg_cu:path3266','svg_cu:path3268']],
			              draw_name: [[],['svg_cu:path3220']] };
	 sim_p.signals["MRB"]  = { name: "MRB", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			              behavior: ['MBIT_SN RB REG_IR REG_MICROINS/SELB 5; FIRE RB;',
					         'CP_FIELD RB REG_MICROINS/SELB; FIRE RB;'],
                                      depends_on: ["SELB"],
			              fire_name: ['svg_cu:text3242'],
			              draw_data: [['svg_cu:path3196','svg_cu:path3278','svg_cu:path3292','svg_cu:path3138-1',
                                                   'svg_cu:path3204','svg_cu:path3204','svg_cu:path3264'],
				  	          ['svg_cu:path3282','svg_cu:path3258-4','svg_cu:path3278',
                                                   'svg_cu:path3196','svg_cu:path3258-4','svg_cu:path3204','svg_cu:path3264']],
			              draw_name: [[],['svg_cu:path3240']] };
	 sim_p.signals["MRC"]  = { name: "MRC", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			              behavior: ['MBIT_SN RC REG_IR REG_MICROINS/SELC 5; FIRE RC;',
					         'CP_FIELD RC REG_MICROINS/SELC; FIRE RC;'],
                                      depends_on: ["SELC"],
			              fire_name: ['svg_cu:text3254'],
			              draw_data: [['svg_cu:path3494','svg_cu:path3492','svg_cu:path3490','svg_cu:path3142b','svg_cu:path3188',
                                                   'svg_cu:path3190','svg_cu:path3192','svg_cu:path3194','svg_cu:path3276','svg_cu:path3290',
                                                   'svg_cu:path3232','svg_cu:path3292','svg_cu:path3138-1-5','svg_cu:path3208','svg_cu:path3316'],
				  	          ['svg_cu:path3300','svg_cu:path3294','svg_cu:path3292','svg_cu:path3288','svg_cu:path3232']],
			              draw_name: [[],['svg_cu:path3252']] };

	/* I/O Devices */
	 sim_p.signals["DB_UPDATED"]  = { name: "DB_UPDATED", visible: false, type: "L", value: 0, default_value:0, nbits: "1",
			              behavior: ['FIRE M1',
					         'FIRE M1'],
			              fire_name: [],
			              draw_data: [[]],
			              draw_name: [[]] };
	 sim_p.signals["IOR"]   = { name: "IOR", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
				      behavior: ["NOP", "MOVE_BITS SCR_IOR 0 1 IOR; FIRE SCR_IOR; MOVE_BITS IO_IOR 0 1 IOR; FIRE IO_IOR; MOVE_BITS L3D_IOR 0 1 IOR; FIRE L3D_IOR; MOVE_BITS KBD_IOR 0 1 IOR; FIRE KBD_IOR; MOVE_BITS LEDM_IOR 0 1 IOR; FIRE LEDM_IOR"],
				      fire_name: [],
				      draw_data: [[], ['svg_p:path3733', 'svg_p:path3491', 'svg_p:text3715']],
				      draw_name: [[], []]};
	 sim_p.signals["IOW"]   = { name: "IOW", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		                      behavior: ["NOP", "MOVE_BITS SCR_IOW 0 1 IOW; FIRE SCR_IOW; MOVE_BITS IO_IOW 0 1 IOW; FIRE IO_IOW; MOVE_BITS L3D_IOW 0 1 IOW; FIRE L3D_IOW; MOVE_BITS LEDM_IOW 0 1 IOW; FIRE LEDM_IOW"],
				      fire_name: [],
				      draw_data: [[], ['svg_p:path3735', 'svg_p:path3491', 'svg_p:text3717']],
				      draw_name: [[], []]};

        /* Virtual Signals, for UI */
	 sim_p.signals["TEST_C"] = { name: "TEST_C", visible: true, type: "L", value: 0, default_value:0, nbits: "1", forbidden: true,
		  	               behavior: ["MV FLAG_C VAL_ZERO; FIRE M7", "MV FLAG_C VAL_ONE; FIRE M7"],
                                       depends_on: ["SELCOP"],
		  	               fire_name: ['svg_p:text3701-3'],
			               draw_data: [['svg_p:text3701-3']],
			               draw_name: [[]] };
	 sim_p.signals["TEST_V"] = { name: "TEST_V", visible: true, type: "L", value: 0, default_value:0, nbits: "1", forbidden: true,
		  	               behavior: ["MV FLAG_V VAL_ZERO; FIRE M7", "MV FLAG_V VAL_ONE; FIRE M7"],
                                       depends_on: ["SELCOP"],
		  	               fire_name: ['svg_p:text3701-3-1'],
			               draw_data: [['svg_p:text3701-3-1']],
			               draw_name: [[]] };
	 sim_p.signals["TEST_N"] = { name: "TEST_N", visible: true, type: "L", value: 0, default_value:0, nbits: "1", forbidden: true,
		  	               behavior: ["MV FLAG_N VAL_ZERO; FIRE M7", "MV FLAG_N VAL_ONE; FIRE M7"],
                                       depends_on: ["SELCOP"],
		  	               fire_name: ['svg_p:text3701-3-2'],
			               draw_data: [['svg_p:text3701-3-2']],
			               draw_name: [[]] };
	 sim_p.signals["TEST_Z"] = { name: "TEST_Z", visible: true, type: "L", value: 0, default_value:0, nbits: "1", forbidden: true,
		  	               behavior: ["MV FLAG_Z VAL_ZERO; FIRE M7", "MV FLAG_Z VAL_ONE; FIRE M7"],
                                       depends_on: ["SELCOP"],
		  	               fire_name: ['svg_p:text3701-3-5'],
			               draw_data: [['svg_p:text3701-3-5']],
			               draw_name: [[]] };
	 sim_p.signals["TEST_I"] = { name: "TEST_I", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		  	               behavior: ["MV FLAG_I VAL_ZERO; FIRE M7", "MV FLAG_I VAL_ONE; FIRE M7"],
                                       depends_on: ["CLK"],
		  	               fire_name: ['svg_cu:text3440'],
			               draw_data: [['svg_cu:text3440']],
			               draw_name: [[]] };
	 sim_p.signals["TEST_U"] = { name: "TEST_U", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			               behavior: ["MV FLAG_U VAL_ZERO; FIRE M7", "MV FLAG_U VAL_ONE; FIRE M7"],
                                       depends_on: ["CLK"],
			               fire_name: ['svg_cu:text3442'],
			               draw_data: [['svg_cu:text3442']],
			               draw_name: [[]] };
	 sim_p.signals["TEST_INTV"] = { name: "TEST_INTV", visible: true, type: "L", value: 0, default_value:0, nbits: "8", forbidden: true,
			               behavior: ["MBIT INTV TEST_INTV 0 32"],
                                       depends_on: ["INT"],
			               fire_name: ['svg_p:tspan4225'],
			               draw_data: [['svg_p:path3749']],
			               draw_name: [[]] };


	/*
	 *  Syntax of behaviors
	 */

	sim_p.behaviors["NOP"]     = { nparameters: 1,
				     operation: function(s_expr) { },
				        verbal: function(s_expr) { return "" ; }
				   };
	sim_p.behaviors["NOP_ALU"] = { nparameters: 1,
				     operation: function(s_expr)
		                                {
						   sim_p.internal_states.alu_flags.flag_n = 0 ;
						   sim_p.internal_states.alu_flags.flag_z = 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
						   return "Reset ALU flags. " ;
						}
				   };
        sim_p.behaviors["MV"]      = { nparameters: 3,
                                     types: ["X", "X"],
                                     operation: function(s_expr)
                                                {
						   sim_elto_org = get_reference(s_expr[2]) ;
						   sim_elto_dst = get_reference(s_expr[1]) ;
                                                   newval       = get_value(sim_elto_org) ;
                                                   set_value(sim_elto_dst, newval) ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var sim_elto_org = get_reference(s_expr[2]) ;
                                                   var newval       = get_value(sim_elto_org) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'short') {
                                                       return "Copy from " + show_verbal(s_expr[2]) +
							      " to " + show_verbal(s_expr[1]) + " value " + show_value(newval) + ". " ;
                                                   }
                                                   return show_verbal(s_expr[1]) + " = " +
                                                          show_verbal(s_expr[2]) +
                                                          " (" + show_value(newval) + "). " ;
                                                }
                                   };
        sim_p.behaviors["LOAD"]    = { nparameters: 3,
                                     types: ["X", "X"],
                                     operation: function(s_expr)
                                                {
						   sim_elto_org = get_reference(s_expr[2]) ;
						   sim_elto_dst = get_reference(s_expr[1]) ;
                                                   newval       = get_value(sim_elto_org) ;
                                                   set_value(sim_elto_dst, newval) ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var sim_elto_org = get_reference(s_expr[2]) ;
                                                   var newval       = get_value(sim_elto_org) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Load from " + show_verbal(s_expr[2]) +
							      " to " + show_verbal(s_expr[1]) + " value " + show_value(newval) + ". " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " +
							  show_value(newval) + " ( " +
						          show_verbal(s_expr[2]) + "). " ;
                                                }
                                   };
        sim_p.behaviors["CP_FIELD"] = { nparameters: 3,
                                     types: ["X", "X"],
                                     operation: function(s_expr)
                                                {
                                                   r = s_expr[2].split('/') ;
						   sim_elto_org = get_reference(r[0]) ;

                                                   newval = get_value(sim_elto_org) ;
						   newval = newval[r[1]] ;
                                                   if (typeof newval != "undefined")
						   {
						       sim_elto_dst = get_reference(s_expr[1]) ;
                                                       set_value(sim_elto_dst, newval);
						   }
                                                },
                                        verbal: function (s_expr)
                                                {
                                                   var r = s_expr[2].split('/') ;
						   var sim_elto_org = get_reference(r[0]) ;

                                                   var  newval = get_value(sim_elto_org) ;
						        newval = newval[r[1]] ;
                                                   if (typeof newval == "undefined")
						        newval = "&lt;undefined&gt;" ;
						   else newval = show_value(newval) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Copy from \"" + show_verbal(r[0]) + "\"[" + r[1] + "] " +
							      "to " + show_verbal(s_expr[1]) + " (value " + newval + "). " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " +
                                                          show_verbal(r[0]) + "." + r[1] +
                                                          " (" + newval + "). " ;
                                                }
                                   };
	sim_p.behaviors["NOT_ES"]   = { nparameters: 3,
				     types: ["S", "E"],
				     operation: function (s_expr)
		                                {
						   set_value( sim_p.signals[s_expr[1]], Math.abs(get_value(sim_p.states[s_expr[2]]) - 1));
						},
					verbal: function (s_expr)
						{
						   var value = Math.abs(get_value(sim_p.states[s_expr[2]]) - 1) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Set " + show_verbal(s_expr[1]) +
						              " with value " + show_value(value) +
						              " (Logical NOT of " + s_expr[2] + "). " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " + show_value(value) +
                                                          " (Logical NOT " + s_expr[2] + "). " ;
						}
				   };
	sim_p.behaviors["GET"]     = { nparameters: 4,
				     types: ["E", "E", "S"],
				     operation: function(s_expr)
		                                {
						   set_value(sim_p.states[s_expr[1]], get_value(sim_p.states[s_expr[2]][ sim_p.signals[s_expr[3]].value]));
						},
					verbal: function (s_expr)
						{
						   var value = get_value(sim_p.states[s_expr[2]][sim_p.signals[s_expr[3]].value]) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Set " + show_verbal(s_expr[1]) + " with value " + show_value(value) + " (Register File " + s_expr[3] + "). " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " + show_value(value) +
                                                          " (Register File " + s_expr[3] + "). " ;
						}
				   };
	sim_p.behaviors["SET"]     = { nparameters: 4,
				     types: ["E", "S", "E"],
				     operation: function(s_expr)
		                                {
						   set_value(sim_p.states[s_expr[1]][ sim_p.signals[s_expr[2]].value], get_value(sim_p.states[s_expr[3]]));
						},
					verbal: function (s_expr)
						{
						   var value = get_value(sim_p.states[s_expr[3]]) ;
						   var o_ref = sim_p.states[s_expr[1]][sim_p.signals[s_expr[2]].value] ;

						   var o_verbal = o_ref.name ;
						   if (typeof o_ref.verbal != "undefined")
						       o_verbal = o_ref.verbal ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Copy to " + o_verbal + " the value " + show_value(value) + ". " ;
                                                   }

                                                   return o_verbal + " = " + show_value(value) + ". " ;
						}
				   };
	sim_p.behaviors["AND"]     = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = get_value(sim_p.states[s_expr[2]]) & get_value(sim_p.states[s_expr[3]]) ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
				                   var result = get_value(sim_p.states[s_expr[2]]) & get_value(sim_p.states[s_expr[3]]) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU AND with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (AND). " ;
						}
				   };
	sim_p.behaviors["OR"]      = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = get_value(sim_p.states[s_expr[2]]) | get_value(sim_p.states[s_expr[3]]) ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
				                   var result = get_value(sim_p.states[s_expr[2]]) | get_value(sim_p.states[s_expr[3]]) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU OR with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (OR). " ;
						}
				   };
	sim_p.behaviors["NOT"]     = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = ~(get_value(sim_p.states[s_expr[2]])) ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
				                   var result = ~(get_value(sim_p.states[s_expr[2]])) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU NOT with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (NOT). " ;
						}
				   };
	sim_p.behaviors["XOR"]     = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = get_value(sim_p.states[s_expr[2]]) ^ get_value(sim_p.states[s_expr[3]]) ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
				                   var result = get_value(sim_p.states[s_expr[2]]) ^ get_value(sim_p.states[s_expr[3]]) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU XOR with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (XOR). " ;
						}
				   };
	sim_p.behaviors["SRL"]     = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = (get_value(sim_p.states[s_expr[2]])) >>> 1 ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
				                   var result = (get_value(sim_p.states[s_expr[2]])) >>> 1 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Shift Right Logical with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (SRL). " ;
						}
				   };
	sim_p.behaviors["SRA"]     = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = (get_value(sim_p.states[s_expr[2]])) >> 1 ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
				                   var result = (get_value(sim_p.states[s_expr[2]])) >> 1 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Shift Right Arithmetic with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (SRA). " ;
						}
				   };
	sim_p.behaviors["SL"]      = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = (get_value(sim_p.states[s_expr[2]])) << 1 ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
				                   var result = (get_value(sim_p.states[s_expr[2]])) << 1 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Shift Left with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (SL). " ;
						}
				   };
	sim_p.behaviors["RR"]      = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = ((get_value(sim_p.states[s_expr[2]])) >>> 1) | (((get_value(sim_p.states[s_expr[2]])) & 1) << 31) ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
				                   var result = ((get_value(sim_p.states[s_expr[2]])) >>> 1) | (((get_value(sim_p.states[s_expr[2]])) & 1) << 31) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Right Rotation with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (RR). " ;
						}
				   };
	sim_p.behaviors["RL"]      = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = ((get_value(sim_p.states[s_expr[2]])) << 1) | (((get_value(sim_p.states[s_expr[2]])) & 0X80000000) >>> 31) ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
				                   var result = ((get_value(sim_p.states[s_expr[2]])) << 1) | (((get_value(sim_p.states[s_expr[2]])) & 0X80000000) >>> 31) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Left Rotation with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (LR). " ;
						}
				   };
	sim_p.behaviors["ADD"]     = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a + b ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_c = (a >>> 31) && (b >>> 31) ;

						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   if ( (result  < 0) && (a >= 0) && (b >= 0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						   if ( (result >= 0) && (a <  0) && (b <  0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a + b ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU ADD with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (ADD). " ;
						}
				   };
	sim_p.behaviors["SUB"]     = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a - b ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_c = (a >>> 31) && (b >>> 31) ;

						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   if ( (result  < 0) && (a >= 0) && (b >= 0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						   if ( (result >= 0) && (a <  0) && (b <  0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a - b ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU SUB with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (SUB). " ;
						}
				   };
	sim_p.behaviors["MUL"]     = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a * b ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;

						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   if ( (result  < 0) && (a >= 0) && (b >= 0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						   if ( (result >= 0) && (a <  0) && (b <  0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a * b ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU MUL with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (MUL). " ;
						}
				   };
	sim_p.behaviors["DIV"]     = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = (get_value(sim_p.states[s_expr[2]]) << 0) ;
						   var b = (get_value(sim_p.states[s_expr[3]]) << 0) ;

						   if (0 == b) {
						       set_value(sim_p.states[s_expr[1]], 0) ;

						       sim_p.internal_states.alu_flags.flag_n = 0 ;
						       sim_p.internal_states.alu_flags.flag_z = 1 ;
						       sim_p.internal_states.alu_flags.flag_v = 1 ;
						       sim_p.internal_states.alu_flags.flag_c = 0 ;
                                                       return ;
                                                   }

				                   var result = Math.floor(a / b) ;
				                   set_value(sim_p.states[s_expr[1]], result) ;
						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;

						   if (0 == b) {
                                                       return "ALU DIV zero by zero (oops!). " ;
						   }

				                   var result = Math.floor(a / b) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU DIV with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (DIV). " ;
						}
				   };
	sim_p.behaviors["MOD"]     = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = (get_value(sim_p.states[s_expr[2]]) << 0) ;
						   var b = (get_value(sim_p.states[s_expr[3]]) << 0) ;

						   if (0 == b) {
						       set_value(sim_p.states[s_expr[1]], 0) ;

						       sim_p.internal_states.alu_flags.flag_n = 0 ;
						       sim_p.internal_states.alu_flags.flag_z = 1 ;
						       sim_p.internal_states.alu_flags.flag_v = 1 ;
						       sim_p.internal_states.alu_flags.flag_c = 0 ;
                                                       return ;
                                                   }

						   var result = a % b ;
						   set_value(sim_p.states[s_expr[1]], result) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
                                                },
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;

                                                   if (0 == b) {
                                                       return "ALU MOD zero by zero (oops!). " ;
                                                   }

						   var result = a % b ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU MOD with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (MOD). " ;
						}
				   };
	sim_p.behaviors["LUI"]     = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var result = (get_value(sim_p.states[s_expr[2]])) << 16 ;
						   set_value(sim_p.states[s_expr[1]], result) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
						   var result = (get_value(sim_p.states[s_expr[2]])) << 16 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Load Upper Immediate with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (LUI). " ;
						}
				   };
	sim_p.behaviors["ADDFOUR"] = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = 4 ;
						   var result = a + b ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_c = (a >>> 31) && (b >>> 31) ;

						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   if ( (result  < 0) && (a >= 0) && (b >= 0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						   if ( (result >= 0) && (a <  0) && (b <  0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
						   var result = a + 4 ;

                                                   return "ALU ADD 4 with result " + show_value(result) + ". " ;
						}
				   };
	sim_p.behaviors["ADDONE"]  = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = 1 ;
						   var result = a + b ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_c = (a >>> 31) && (b >>> 31) ;

						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   if ( (result  < 0) && (a >= 0) && (b >= 0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						   if ( (result >= 0) && (a <  0) && (b <  0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
						   var result = a + 1 ;

                                                   return "ALU ADD 1 with result " + show_value(result) + ". " ;
						}
				   };
	sim_p.behaviors["SUBFOUR"] = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = 4 ;
						   var result = a - b ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_c = (a >>> 31) && (b >>> 31) ;

						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   if ( (result  < 0) && (a >= 0) && (b >= 0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						   if ( (result >= 0) && (a <  0) && (b <  0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
						   var result = a - 4 ;

                                                   return "ALU SUB 4 with result " + show_value(result) + ". " ;
						}
				   };
	sim_p.behaviors["SUBONE"]  = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = 1 ;
						   var result = a - b ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_c = (a >>> 31) && (b >>> 31) ;

						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   if ( (result  < 0) && (a >= 0) && (b >= 0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						   if ( (result >= 0) && (a <  0) && (b <  0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
						   var result = a - 1 ;

                                                   return "ALU SUB 1 with result " + show_value(result) + ". " ;
						}
				   };
	sim_p.behaviors["FADD"]    = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                { // Dummy code added for testing only...
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a.toFixed(2) + b.toFixed(2) ;

						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0.0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0.0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;

						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   if ( (result  < 0.0) && (a >= 0.0) && (b >= 0.0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						   if ( (result >= 0.0) && (a <  0.0) && (b <  0.0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a.toFixed(2) + b.toFixed(2) ;

                                                   return "ALU Float ADD with result " + result + ". " ;
						}
				   };
	sim_p.behaviors["FSUB"]    = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                { // Dummy code added for testing only...
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a.toFixed(2) - b.toFixed(2) ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0.0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0.0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;

						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   if ( (result  < 0) && (a >= 0) && (b >= 0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						   if ( (result >= 0) && (a <  0) && (b <  0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a.toFixed(2) - b.toFixed(2) ;

                                                   return "ALU Float SUB with result " + result + ". " ;
						}
				   };
	sim_p.behaviors["FMUL"]    = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                { // Dummy code added for testing only...
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a.toFixed(2) * b.toFixed(2) ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0.0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0.0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;

						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   if ( (result  < 0) && (a >= 0) && (b >= 0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						   if ( (result >= 0) && (a <  0) && (b <  0) )
							sim_p.internal_states.alu_flags.flag_v = 1 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a.toFixed(2) * b.toFixed(2) ;

                                                   return "ALU Float MUL with result " + result + ". " ;
						}
				   };
	sim_p.behaviors["FDIV"]    = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                { // Dummy code added for testing only...
						   var a = (get_value(sim_p.states[s_expr[2]]) << 0) ;
						   var b = (get_value(sim_p.states[s_expr[3]]) << 0) ;

						   if (0 == b) {
						       set_value(sim_p.states[s_expr[1]], 0) ;
						       sim_p.internal_states.alu_flags.flag_n = 0 ;
						       sim_p.internal_states.alu_flags.flag_z = 1 ;
						       sim_p.internal_states.alu_flags.flag_v = 1 ;
						       sim_p.internal_states.alu_flags.flag_c = 0 ;
                                                       return ;
                                                   }

				                   var result = Math.floor(a / b) ;
				                   set_value(sim_p.states[s_expr[1]], result) ;
						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a.toFixed(2) / b.toFixed(2) ;

                                                   return "ALU Float DIV with result " + result + ". " ;
						}
				   };
	sim_p.behaviors["FMOD"]    = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                { // Dummy code added for testing only...
						   var result = (get_value(sim_p.states[s_expr[2]]) << 0) % (get_value(sim_p.states[s_expr[3]]) << 0) ;
						   set_value(sim_p.states[s_expr[1]], result) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim_p.states[s_expr[3]]) << 0 ;
						   var result = a.toFixed(2) % b.toFixed(2) ;

                                                   return "ALU Float MOD with result " + result + ". " ;
						}
				   };
	sim_p.behaviors["LUI"]     = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var result = (get_value(sim_p.states[s_expr[2]])) << 16 ;
						   set_value(sim_p.states[s_expr[1]], result) ;

						   sim_p.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   sim_p.internal_states.alu_flags.flag_v = 0 ;
						   sim_p.internal_states.alu_flags.flag_c = 0 ;
						},
					verbal: function (s_expr)
						{
						   var result = (get_value(sim_p.states[s_expr[2]])) << 16 ;

                                                   return "ALU Load Upper Immediate with result " + show_value(result) + ". " ;
						}
				   };
	sim_p.behaviors["PLUS1"]   = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
						   var result = a + 1 ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
						   var result = a + 1 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Add one to " + show_verbal(s_expr[2]) +
							      " and copy to " + show_verbal(s_expr[1]) +
							      " with result " + show_value(result) + ". " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " +
                                                          show_verbal(s_expr[2]) + " + 1" +
                                                          " (" + show_value(result) + "). " ;
                                                }
				   };
	sim_p.behaviors["PLUS4"]   = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
						   var result = a + 4 ;
						   set_value(sim_p.states[s_expr[1]], result >>> 0) ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim_p.states[s_expr[2]]) << 0 ;
						   var result = a + 4 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Add four to " + show_verbal(s_expr[2]) +
							      " and copy to " + show_verbal(s_expr[1]) +
							      " with result " + show_value(result) + ". " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " +
                                                          show_verbal(s_expr[2]) + " + 4" +
                                                          " (" + show_value(result) + "). " ;
                                                }
				   };
	sim_p.behaviors["SET_TT"] = { nparameters: 3,
				     types: ["E", "I"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim_p.states[s_expr[1]]) << 0 ;
                                                   var b = parseInt(s_expr[2]) ;
                                                   var m = Math.pow(2, b) ;
                                                   var r = a | m ;
						   set_value(sim_p.states[s_expr[1]], r) ;
						   update_cpu_bus_fire(r, b) ;
                                                },
                                        verbal: function (s_expr)
                                                {
                                                   return "" ;
                                                }
				   };
	sim_p.behaviors["RST_TT"] = { nparameters: 3,
				     types: ["E", "I"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim_p.states[s_expr[1]]) << 0 ;
                                                   var b = parseInt(s_expr[2]) ;
                                                   var m = Math.pow(2, b) ;
                                                   var r = a & ~m ;
						   set_value(sim_p.states[s_expr[1]], r) ;
						   update_cpu_bus_fire(r, b) ;
                                                },
                                        verbal: function (s_expr)
                                                {
                                                   return "" ;
                                                }
				   };
	sim_p.behaviors["CHECK_RTD"] = { nparameters: 1,
				     operation: function(s_expr)
		                                {
				                var number_active_tri = parseInt(simhw_sim_signal("TD").value) +
         							        parseInt(simhw_sim_signal("R").value) ;
        				            update_system_bus_fire(number_active_tri) ;
                                                },
                                        verbal: function (s_expr)
                                                {
                                                   return "" ;
                                                }
				   };
	sim_p.behaviors["MBIT"]     = { nparameters: 5,
				     types: ["X", "X", "I", "I"],
				     operation: function (s_expr)
		                                {
						   var sim_elto_dst = get_reference(s_expr[1]) ;
						   var sim_elto_org = get_reference(s_expr[2]) ;
						   var offset       = parseInt(s_expr[3]) ;
						   var size         = parseInt(s_expr[4]) ;

						   var n1 = get_value(sim_elto_org).toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32-n1.length) + n1;
						   n2 = n2.substr(31 - (offset + size - 1), size);

						   set_value(sim_elto_dst, parseInt(n2, 2));
						},
					verbal: function (s_expr)
						{
						   var sim_elto_dst = get_reference(s_expr[1]) ;
						   var sim_elto_org = get_reference(s_expr[2]) ;
						   var offset       = parseInt(s_expr[3]) ;
						   var size         = parseInt(s_expr[4]) ;

						   var n1 = get_value(sim_elto_org).toString(2) ; // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32-n1.length) + n1 ;
						       n2 = n2.substr(31 - (offset + size - 1), size) ;
						   var n3 = parseInt(n2, 2) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Copy from " + show_verbal(s_expr[2]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(n3) + " (copied " + size + " bits from bit " + offset + "). " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " +
                                                          show_verbal(s_expr[2]) +
                                                          " (" + show_value(n3) + ", " +
                                                                 size + " bits from bit " + offset + "). " ;
						}
				   };
	sim_p.behaviors["MBIT_SN"]  = { nparameters: 5,
				     types: ["S", "E", "E", "I"],
				     operation: function (s_expr)
		                                {
						   var base = 0;
						   var r = s_expr[3].split('/');
						   if (1 == r.length)
							base = get_value(sim_p.states[s_expr[3]]);
						   else
						   if (typeof  sim_p.states[r[0]].value[r[1]] != "undefined")
							base = sim_p.states[r[0]].value[r[1]];
                                                   // begin: REG_MICROINS/xxx by default is the default_value
					      else if (typeof   sim_p.signals[r[1]].default_value != "undefined")
						        base =  sim_p.signals[r[1]].default_value;
					      else if (typeof   sim_p.states[r[1]].default_value != "undefined")
						        base =  sim_p.states[r[1]].default_value;
                                                   // end: REG_MICROINS/xxx by default is the default_value
						   else ws_alert('WARN: undefined state/field pair -> ' + r[0] + '/' + r[1]);

						   var offset = parseInt(s_expr[4]) ;

						   var n1 = get_value(sim_p.states[s_expr[2]]).toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1 ;
						   var n3 = n2.substr(31 - (base + offset - 1), offset) ;

						   set_value( sim_p.signals[s_expr[1]], parseInt(n3, 2));
						},
					verbal: function (s_expr)
						{
						   // value
						   var base = 0;
						   var r = s_expr[3].split('/');
						   if (1 == r.length)
							base = get_value(sim_p.states[s_expr[3]]);
						   else
						   if (typeof  sim_p.states[r[0]].value[r[1]] != "undefined")
							base = sim_p.states[r[0]].value[r[1]];
                                                   // begin: REG_MICROINS/xxx by default is the default_value
					      else if (typeof   sim_p.signals[r[1]].default_value != "undefined")
						        base =  sim_p.signals[r[1]].default_value;
					      else if (typeof   sim_p.states[r[1]].default_value != "undefined")
						        base =  sim_p.states[r[1]].default_value;
                                                   // end: REG_MICROINS/xxx by default is the default_value
						   else ws_alert('WARN: undefined state/field pair -> ' + r[0] + '/' + r[1]);

						   var offset = parseInt(s_expr[4]) ;

						   var n1 = get_value(sim_p.states[s_expr[2]]).toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1 ;
						   var n3 = n2.substr(31 - (base + offset - 1), offset) ;

						   // name
					           var from_elto = "" ;
						   if (1 == r.length)
                                                        from_elto = show_verbal(s_expr[3]) ;
						   else from_elto = "\"" + show_verbal(s_expr[2]) + "\"[" + r[1] + "] " ;

		                                   //          0     1     2         3           4
	                                           // E.g.: MBIT_SN  RA REG_IR REG_MICROINS/SELA 5
                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Copy from " + from_elto +
							      "into "      + show_verbal(s_expr[1]) + " " +
						              "value "     + parseInt(n3, 2) + ". " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " + from_elto + " (" + parseInt(n3, 2) + "). " ;
						}
				   };
	sim_p.behaviors["SBIT_SIGNAL"] = { nparameters: 4,
				     types: ["X", "I", "I"],
				     operation: function (s_expr)
		                                {
						   sim_elto_dst = get_reference(s_expr[1]) ;

						   //    0             1    2  3
						   //   SBIT_SIGNAL  A0A1   1  0
						   var new_value = sim_elto_dst.value ;
						   var mask = (1 << s_expr[3]) ;
						   if (s_expr[2] == "1")
							new_value = new_value |  mask ;
						   else new_value = new_value & ~mask ;

						   set_value(sim_elto_dst, (new_value >>> 0));
                                                },
                                        verbal: function (s_expr)
                                                {
						   sim_elto_dst = get_reference(s_expr[1]) ;

                                                   // return verbal of the compound signal/value
						   var new_value = sim_elto_dst.value ;
						   var mask = (1 << s_expr[3]) ;
						   if (s_expr[2] == "1")
							new_value = new_value |  mask ;
						   else new_value = new_value & ~mask ;

                                                   return compute_signal_verbals(s_expr[1], (new_value >>> 0)) ;
                                                }
				   };
	sim_p.behaviors["UPDATE_FLAG"] = { nparameters: 4,
				     types: ["X", "X", "I"],
				     operation: function (s_expr)
		                                {
						   sim_elto_org = get_reference(s_expr[2]) ;
						   sim_elto_dst = get_reference(s_expr[1]) ;

						   //    0             1      2    3
				                   //   UPDATE_FLAG SELP_M7 FLAG_U 0
						   var new_value = (sim_elto_dst.value & ~(1 << s_expr[3])) |
						                         (sim_elto_org.value << s_expr[3]);
						   set_value(sim_elto_dst, (new_value >>> 0));
						},
					verbal: function (s_expr)
                                                {
						   sim_elto_org = get_reference(s_expr[2]) ;
						   sim_elto_dst = get_reference(s_expr[1]) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Update " + show_verbal(s_expr[2]) + " to value " + sim_elto_org.value + ". " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + "." + show_verbal(s_expr[3]) +
                                                          " = " + sim_elto_org.value + ". " ;
                                                }
				   };
	sim_p.behaviors["MBITS"]    = { nparameters: 8,
				     types: ["E", "I", "E", "S", "S", "I", "S"],
				     operation: function(s_expr)
						{
						   var offset = parseInt( sim_p.signals[s_expr[4]].value) ;
						   var size   = parseInt( sim_p.signals[s_expr[5]].value) ;

						   var n1 = get_value(sim_p.states[s_expr[3]]).toString(2); // to binary
						   var n2 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1) ;
						       n2 = n2.substr(31 - (offset + size - 1), size);

						   var n3 =  "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
						   if ( ("1" ==  sim_p.signals[s_expr[7]].value) && ("1" == n2.substr(0, 1)))
                                                   {    // check signed-extension
							n3 = "11111111111111111111111111111111".substring(0, 32 - n2.length) + n2;
						   }

						   set_value(sim_p.states[s_expr[1]], parseInt(n3, 2));
						},
					verbal: function (s_expr)
						{
						   var offset = parseInt(sim_p.signals[s_expr[4]].value) ;
						   var size   = parseInt(sim_p.signals[s_expr[5]].value) ;

						   var n1 = get_value(sim_p.states[s_expr[3]]).toString(2); // to binary
						   var n2 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1) ;
						       n2 = n2.substr(31 - (offset + size - 1), size);

						   var n3 =  "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
						   if ( ("1" ==  sim_p.signals[s_expr[7]].value) && ("1" == n2.substr(0, 1)))
                                                   {    // check signed-extension
							n3 = "11111111111111111111111111111111".substring(0, 32 - n2.length) + n2;
						   }

						   n1 = parseInt(n3, 2) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return " Copy from " + show_verbal(s_expr[3]) +
                                                         " to " + show_verbal(s_expr[1]) +
						         " value " + show_value(n1) +
                                                         " (copied " + size + " bits from bit " + offset + "). " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " +
							  show_verbal(s_expr[3]) + " (" + show_value(n1) +
						  	  ", " + size + " bits from bit " + offset + "). " ;
						}
				   };

	sim_p.behaviors["BSEL"] =  { nparameters: 6,
				     types: ["E", "I", "I", "E", "I"],
				     operation: function (s_expr)
		                                {
						   var posd = parseInt(s_expr[2]) ;
						   var poso = parseInt(s_expr[5]) ;
						   var len  = parseInt(s_expr[3]) ;

						   var n1 = get_value(sim_p.states[s_expr[4]]).toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1 ;
						       n2 = n2.substr(31 - (poso + len) + 1, len);
						   var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
						   var n4 = "00000000000000000000000000000000".substr(0, posd);
						   n3 = n3 + n4;

						   set_value(sim_p.states[s_expr[1]], parseInt(n3, 2));
						},
					verbal: function (s_expr)
						{
						   var posd = parseInt(s_expr[2]) ;
						   var len  = parseInt(s_expr[3]) ;
						   var poso = parseInt(s_expr[5]) ;

						   var n1 = get_value(sim_p.states[s_expr[4]]).toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1 ;
						       n2 = n2.substr(31 - (poso + len) + 1, len);
						   var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
						   var n4 = "00000000000000000000000000000000".substr(0, posd);
						       n3 = n3 + n4;
						   var n5 = parseInt(n3, 2) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Copy from " + show_verbal(s_expr[4]) + " to " + show_verbal(s_expr[1]) + " value " + show_value(n5) +
						              " (copied " + len + " bits, from bit " + poso + " of " + s_expr[4] + " to bit " + posd + " of " + s_expr[1] + "). " ;
                                                   }

                                                   return show_verbal(s_expr[1])+" = "+show_verbal(s_expr[4]) +
						          " (" + show_value(n5) + ", " + len + " bits, from bit " + poso +
						          " of " + s_expr[4] + " to bit " + posd + " of " + s_expr[1] + "). " ;
						}
				   };
	sim_p.behaviors["EXT_SIG"] =  { nparameters: 3,
				     types: ["E", "I"],
				     operation: function (s_expr)
		                                {
						   var n1 = get_value(sim_p.states[s_expr[1]]).toString(2); // to binary
						   var n2 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1) ;
						   var n3 = n2.substr(31 - s_expr[2], 31);
						   var n4 = n3;
						   if ("1" == n2[31 - s_expr[2]]) {  // check signed-extension
						       n4 = "11111111111111111111111111111111".substring(0, 32 - n3.length) + n4;
						   }

						   set_value(sim_p.states[s_expr[1]], parseInt(n4, 2));
						},
					verbal: function (s_expr)
						{
						   var n1 = get_value(sim_p.states[s_expr[1]]).toString(2); // to binary
						   var n2 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1) ;
						   var n3 = n2.substr(31 - s_expr[2], 31);
						   var n4 = n3;
						   if ("1" == n2[31 - s_expr[2]]) {  // check signed-extension
						       n4 = "11111111111111111111111111111111".substring(0, 32 - n3.length) + n4;
						   }
                                                   var n5 = parseInt(n4, 2) ;

                                                   return "Sign Extension with value " + show_value(n5) + ". " ;
						}
				   };
	sim_p.behaviors["MOVE_BITS"] =  { nparameters: 5,
				     types: ["S", "I", "I","S"],
				     operation: function (s_expr)
		                                {
						   var posd = parseInt(s_expr[2]) ;
						   var poso = 0 ;
						   var len  = parseInt(s_expr[3]) ;

						   var n1 =  sim_p.signals[s_expr[4]].value.toString(2); // to binary signal origin
						   n1 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1);
						   n1 = n1.substr(31 - poso - len + 1, len);

						   var n2 =  sim_p.signals[s_expr[1]].value.toString(2); // to binary signal destiny
						   n2 = ("00000000000000000000000000000000".substring(0, 32 - n2.length) + n2) ;
						   var m1 = n2.substr(0, 32 - (posd + len));
						   var m2 = n2.substr(31 - posd + 1, posd);
						   var n3 = m1 + n1 + m2;

						   set_value( sim_p.signals[s_expr[1]], parseInt(n3, 2));
						},
					verbal: function (s_expr)
						{
                                                   return "" ;
						}
				   };
	sim_p.behaviors["MOVE_BITSE"] = {
					  nparameters: 6,
				     types: ["S", "I", "I", "E", "I"],
				     operation: function (s_expr)
		                                {
						   var posd = parseInt(s_expr[2]) ;
						   var poso = parseInt(s_expr[5]) ;
						   var len  = parseInt(s_expr[3]) ;

						   var n1 =  get_value(sim_p.states[s_expr[4]]).toString(2); // to state signal origin
						   n1 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1);
						   n1 = n1.substr(31 - poso - len + 1, len);

						   var n2 =  sim_p.signals[s_expr[1]].value.toString(2); // to binary signal destiny
						   n2 = ("00000000000000000000000000000000".substring(0, 32 - n2.length) + n2);
						   var m1 = n2.substr(0, 32 - (posd + len));
						   var m2 = n2.substr(31 - posd + 1, posd);
						   var n3 = m1 + n1 + m2;

						   set_value( sim_p.signals[s_expr[1]], parseInt(n3, 2));
						},
					verbal: function (s_expr)
						{
						   return "" ;
						}
				  };
	sim_p.behaviors["DECO"]    = { nparameters: 1,
				     operation: function(s_expr)
						{
						    sim_p.states['INEX'].value = 0 ;

						    // 1.- IR -> oi
						    var oi = decode_instruction(sim_p.internal_states.FIRMWARE,
                                                                                sim_p.ctrl_states.ir,
						                                get_value(sim_p.states['REG_IR'])) ;
						    if (null == oi.oinstruction)
                                                    {
                                                         ws_alert('ERROR: undefined instruction code in IR (' +
							          'co:'  +  oi.op_code.toString(2) + ', ' +
							          'cop:' + oi.cop_code.toString(2) + ')') ;
							 sim_p.states['ROM_MUXA'].value = 0 ;
							 sim_p.states['INEX'].value = 1 ;
							 return -1;
						    }

						    // 2.- oi.oinstruction -> rom_addr
                                                    var rom_addr = oi.op_code << 6;
						    if (typeof oi.oinstruction.cop != "undefined") {
                                                        rom_addr = rom_addr + oi.cop_code ;
						    }

						    // 2.- ! sim_p.internal_states['ROM'][rom_addr] -> error
						    if (typeof sim_p.internal_states['ROM'][rom_addr] == "undefined")
						    {
							 ws_alert('ERROR: undefined rom address ' + rom_addr +
                                                                  ' in firmware') ;
							 sim_p.states['ROM_MUXA'].value = 0 ;
							 return -1;
						    }

						    // 3.- sim_p.internal_states['ROM'][rom_addr] -> mc-start -> ROM_MUXA
						    sim_p.states['ROM_MUXA'].value = sim_p.internal_states['ROM'][rom_addr] ;

						    // 4.-  Statistics
						    var val = get_value(sim_p.states['DECO_INS']) ;
						    set_value(sim_p.states["DECO_INS"], val + 1);

                                                    // 5.- Update UI
						    var pc = get_value(sim_p.states['REG_PC']) - 4 ;
                                                    var decins = get_deco_from_pc(pc) ;
						    set_value(sim_p.states['REG_IR_DECO'], decins) ;
                                                    show_dbg_ir(get_value(sim_p.states['REG_IR_DECO']));
						},
					verbal: function (s_expr)
						{
                                                   return "Decode instruction. " ;
						}
				   };

		sim_p.behaviors["FIRE"] = { nparameters: 2,
					     types: ["S"],
					     operation: function (s_expr)
							{
							    // 0.- avoid loops
							    if (sim_p.internal_states.fire_stack.indexOf(s_expr[1]) != -1) {
								return ;
							    }

							    sim_p.internal_states.fire_stack.push(s_expr[1]) ;

							    // 1.- update draw
							    update_draw( sim_p.signals[s_expr[1]],  sim_p.signals[s_expr[1]].value) ;

							    // 2.- for Level signals, propage it
							    if ("L" ==  sim_p.signals[s_expr[1]].type)
							    {
								update_state(s_expr[1]) ;
							    }

							    sim_p.internal_states.fire_stack.pop(s_expr[1]) ;
							},
						verbal: function (s_expr)
							{
                                                           return "" ;
							}
					   };

		sim_p.behaviors["FIRE_IFSET"] = { nparameters: 3,
					     types: ["S", "I"],
					     operation: function (s_expr)
							{
                                                            if (get_value( sim_p.signals[s_expr[1]]) != parseInt(s_expr[2])) {
                                                                return ;
                                                            }

                                                            sim_p.behaviors["FIRE"].operation(s_expr) ;
							},
						verbal: function (s_expr)
							{
							   return "" ;
							}
					   };

		sim_p.behaviors["FIRE_IFCHANGED"] = { nparameters: 3,
					     types: ["S", "X"],
					     operation: function (s_expr)
							{
						            sim_elto = get_reference(s_expr[2]) ;
							    if (sim_elto.changed == false)
								return ;

							    sim_p.behaviors["FIRE"].operation(s_expr) ;
							},
						verbal: function (s_expr)
							{
							   return "" ;
							}
					   };

		sim_p.behaviors["RESET_CHANGED"] = { nparameters: 2,
					     types: ["X"],
					     operation: function (s_expr)
							{
						            sim_elto = get_reference(s_expr[1]) ;
							    sim_elto.changed = false ; // todo: comment this line
							},
						verbal: function (s_expr)
							{
							   return "" ;
							}
					   };

		sim_p.behaviors["CLOCK"] = { nparameters: 1,
					     operation: function(s_expr)
							{
						            var new_maddr = null ;
							    var mcelto    = null ;

						            // measure time (1/2)
					                    var t0 = performance.now() ;

							    // 1.- Update counter
							    var val = get_value(sim_p.states["CLK"]) ;
							    set_value(sim_p.states["CLK"], val + 1);
						            set_value(sim_p.states["TTCPU"], 0) ;

							    // 2.- To treat the (Falling) Edge signals
						           new_maddr = get_value(sim_p.states["REG_MICROADDR"]);
							    mcelto = sim_p.internal_states['MC'][new_maddr];
                                                            if ( (typeof mcelto !== "undefined") &&
                                                                 (false == mcelto.is_native) )
							    {
							        for (var i=0; i<jit_fire_order.length; i++) {
								     fn_updateE_now(jit_fire_order[i]) ;
							        }
							    }

							    // 3.- The (Falling) Edge part of the Control Unit...
						          new_maddr = get_value(sim_p.states["MUXA_MICROADDR"]);
							    set_value(sim_p.states["REG_MICROADDR"], new_maddr);
							    mcelto = sim_p.internal_states['MC'][new_maddr];
							    if (typeof mcelto === "undefined")
							    {
								mcelto = {
							      value: sim_p.states["REG_MICROINS"].default_value,
									    is_native: false
									 } ;
							    }
							    var new_mins = Object.create(get_value(mcelto));
							    sim_p.states["REG_MICROINS"].value = new_mins;

                                                            // 4.- update signals
							    for (var key in sim_p.signals)
							    {
								 if (typeof new_mins[key] !== "undefined")
								      set_value(sim_p.signals[key],   new_mins[key]);
								 else set_value(sim_p.signals[key], sim_p.signals[key].default_value);
							    }

							    // 5.- Finally, 'fire' the (High) Level signals
							    if (mcelto.is_native)
							    {
							           if (typeof mcelto.NATIVE_JIT != "undefined")
							               mcelto.NATIVE_JIT() ;
						              else if (typeof mcelto.NATIVE != "undefined")
							               eval(mcelto.NATIVE) ;
							    }
							    else
							    {
							        for (var i=0; i<jit_fire_order.length; i++) {
							    	     fn_updateL_now(jit_fire_order[i]) ;
							        }
							    }

						            // measure time (2/2)
					                    var t1 = performance.now() ;

						            // update time
							    var val = get_value(sim_p.states["ACC_TIME"]) ;
                                                                val = val + (t1-t0) ;
							    set_value(sim_p.states["ACC_TIME"], val);

						            // update power consumption
							    val = Math.trunc(16*val) ;
							    set_value(sim_p.states["ACC_PWR"], val);
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "" ;
                                                        }
					   };

		sim_p.behaviors["CPU_RESET"] = { nparameters: 1,
					     operation: function(s_expr)
							{
							    // set states/signals to the default state
							    for (var key in sim_p.states) {
								 reset_value(sim_p.states[key]) ;
                                                            }
							    for (var key in  sim_p.signals) {
								 reset_value(sim_p.signals[key]) ;
                                                            }
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "Reset CPU. " ;
                                                        }
					   };

	sim_p.behaviors["UPDATEDPC"]     = { nparameters: 1,
				             operation: function(s_expr)
							{
                                                            show_asmdbg_pc();
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "" ;
                                                        }
					   };

	sim_p.behaviors["UPDATE_NZVC"]  = { nparameters: 1,
				            operation: function(s_expr)
							{
							   set_value(simhw_sim_state("FLAG_N"),
								     sim_p.internal_states.alu_flags.flag_n);
							   set_value(simhw_sim_state("FLAG_Z"),
								     sim_p.internal_states.alu_flags.flag_z);
							   set_value(simhw_sim_state("FLAG_V"),
								     sim_p.internal_states.alu_flags.flag_v);
							   set_value(simhw_sim_state("FLAG_C"),
								     sim_p.internal_states.alu_flags.flag_c);

							   set_value(simhw_sim_signal("TEST_N"),
								     sim_p.internal_states.alu_flags.flag_n);
							   set_value(simhw_sim_signal("TEST_Z"),
								     sim_p.internal_states.alu_flags.flag_z);
							   set_value(simhw_sim_signal("TEST_V"),
								     sim_p.internal_states.alu_flags.flag_v);
							   set_value(simhw_sim_signal("TEST_C"),
								     sim_p.internal_states.alu_flags.flag_c);

							   update_draw(sim_p.signals["TEST_N"], sim_p.signals["TEST_N"].value) ;
							   update_draw(sim_p.signals["TEST_Z"], sim_p.signals["TEST_Z"].value) ;
							   update_draw(sim_p.signals["TEST_V"], sim_p.signals["TEST_V"].value) ;
							   update_draw(sim_p.signals["TEST_C"], sim_p.signals["TEST_C"].value) ;
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "Update flags N-Z-V-C." ;
							  /*
                                                             + " to " +
							     sim_p.internal_states.alu_flags.flag_n + " " +
							     sim_p.internal_states.alu_flags.flag_z + " " +
							     sim_p.internal_states.alu_flags.flag_v + " " +
							     sim_p.internal_states.alu_flags.flag_c + ". " ;
							  */
                                                        }
					   };


        /*
         *  Model
	 * (Thanks to Juan Francisco Perez Carrasco for collaborating in the design of the following elements)
	 */

        // CPU - Tristates

        sim_p.elements.cpu_t1  = {
			      name:              "T1",
			      description:       "Tristate 1",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":    {
							      ref:  "REG_MBR"
							    },
						   "out":   {
							      ref:  "BUS_IB"
							    }
						 },
			      signals:           {
						   "ctl":   {
							      ref:  "T1"
							    }
						 },
			      states_inputs:     [ "in"  ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                } ;

        sim_p.elements.cpu_t2  = {
			      name:              "T2",
			      description:       "Tristate 2",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":    {
							      ref:  "REG_PC"
							    },
						   "out":   {
							      ref:  "BUS_IB"
							    }
						 },
			      signals:           {
						   "ctl":   {
							      ref:  "T2"
							    }
						 },
			      states_inputs:     [ "in"  ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                } ;

        sim_p.elements.cpu_t3  = {
			      name:              "T3",
			      description:       "Tristate 3",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":    {
							      ref:  "SELEC_T3"
							    },
						   "out":   {
							      ref:  "BUS_IB"
							    }
						 },
			      signals:           {
						   "ctl":   {
							      ref:  "T3"
							    }
						 },
			      states_inputs:     [ "in"  ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                } ;

        sim_p.elements.cpu_t6  = {
			      name:              "T6",
			      description:       "Tristate 6",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":    {
							      ref:  "ALU_C6"
							    },
						   "out":   {
							      ref:  "BUS_IB"
							    }
						 },
			      signals:           {
						   "ctl":   {
							      ref:  "T6"
							    }
						 },
			      states_inputs:     [ "in"  ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                } ;

        sim_p.elements.cpu_t8  = {
			      name:              "T8",
			      description:       "Tristate 8",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":    {
							      ref:  "REG_SR"
							    },
						   "out":   {
							      ref:  "BUS_IB"
							    }
						 },
			      signals:           {
						   "ctl":   {
							      ref:  "T8"
							    }
						 },
			      states_inputs:     [ "in"  ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                } ;

        sim_p.elements.cpu_t9  = {
			      name:              "T9",
			      description:       "Tristate 9",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":    {
							      ref:  "RA_T9"
							    },
						   "out":   {
							      ref:  "BUS_IB"
							    }
						 },
			      signals:           {
						   "ctl":   {
							      ref:  "T9"
							    }
						 },
			      states_inputs:     [ "in"  ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                } ;

        sim_p.elements.cpu_t10 = {
			      name:              "T10",
			      description:       "Tristate 10",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":    {
							      ref:  "RB_T10"
							    },
						   "out":   {
							      ref:  "BUS_IB"
							    }
						 },
			      signals:           {
						   "ctl":   {
							      ref:  "T10"
							    }
						 },
			      states_inputs:     [ "in"  ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                } ;

        sim_p.elements.cpu_t11 = {
			      name:              "T11",
			      description:       "Tristate 11",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":    {
							      ref:  "REG_MICROINS"
							    },
						   "out":   {
							      ref:  "BUS_IB"
							    }
						 },
			      signals:           {
						   "ctl":   {
							      ref:  "T11"
							    }
						 },
			      states_inputs:     [ "in"  ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                } ;

        sim_p.elements.cpu_t12 = {
			      name:              "T12",
			      description:       "Tristate 12",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":    {
							      ref:  "HPC_T12",
							    },
						   "out":   {
							      ref:  "BUS_IB",
							    }
						 },
			      signals:           {
						   "ctl":   {
							      ref:  "T12"
							    }
						 },
			      states_inputs:     [ "in"  ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                } ;

        sim_p.elements.cpu_ta  = {
			      name:              "Ta",
			      description:       "Tristate A",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":    {
							      ref:  "REG_MAR"
							    },
						   "out":   {
							      ref:  "BUS_AB"
							    }
						 },
			      signals:           {
						   "ctl":   {
							      ref:  "TA"
							    }
						 },
			      states_inputs:     [ "in"  ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                } ;

        sim_p.elements.cpu_tb  = {
			      name:              "Td",
			      description:       "Tristate D",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":    {
							      ref:  "REG_MBR"
							    },
						   "out":   {
							      ref:  "BUS_DB"
							    }
						 },
			      signals:           {
						   "ctl":   {
							      ref:  "TD"
							    }
						 },
			      states_inputs:     [ "in"  ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                } ;

        // CPU - Multiplexors

        sim_p.elements.cpu_mux_a  = {
			      name:              "MUX A",
			      description:       "MUX A",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0": {
							      ref:  "RA_T9"
							    },
						   "mux_1": {
							      ref:  "BUS_IB"
							    },
						   "mux_o": {
							      ref:  "MA_ALU"
							    }
						 },
			      signals:           {
						   "ma":    {
							      ref:  "MA"
							    }
						 },
			      states_inputs:     [ "mux_0", "mux_1" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "ma" ],
			      signals_output:    [ ]
	                   } ;

        sim_p.elements.cpu_mux_b  = {
			      name:              "MUX B",
			      description:       "MUX B",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0": {
							       ref:  "RB_T10"
							    },
						   "mux_1": {
							       ref:  "REG_PC"
							    },
						   "mux_o": {
							       ref:  "MB_ALU"
							    }
						 },
			      signals:           {
						   "mb":    {
							       ref:  "MB"
							    }
						 },
			      states_inputs:     [ "mux_0", "mux_1" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "mb" ],
			      signals_output:    [ ]
	                   } ;

        sim_p.elements.cpu_mux_1  = {
			      name:              "MUX 1",
			      description:       "MUX 1",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0": {
							       ref:  "BUS_IB"
							    },
						   "mux_1": {
							       ref:  "BUS_DB"
							    },
						   "mux_o": {
							       ref:  "M1_C1"
							    }
						 },
			      signals:           {
						   "m1":    {
							       ref:  "M1"
							    }
						 },
			      states_inputs:     [ "mux_0", "mux_1" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "m1" ],
			      signals_output:    [ ]
	                   } ;

        sim_p.elements.cpu_mux_7  = {
			      name:              "MUX 7",
			      description:       "MUX 7",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0": {
							       ref:  "BUS_IB"
							    },
						   "mux_1": {
							       ref:  "SELP_M7"
							    },
						   "mux_o": {
							       ref:  "M7_C7"
							    }
						 },
			      signals:           {
						   "m7":    {
							       ref:  "M7"
							    }
						 },
			      states_inputs:     [ "mux_0", "mux_1" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "m7" ],
			      signals_output:    [ ]
	                   } ;

        sim_p.elements.cpu_mux_h  = {
			      name:              "MUX H",
			      description:       "MUX H",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0": {
							       ref:  "CLK"
							    },
						   "mux_1": {
							       ref:  "ACC_TIME"
							    },
						   "mux_2": {
							       ref:  "ACC_PWR"
							    },
						   "mux_3": {
							       ref:  "VAL_ZERO"
							    },
						   "mux_o": {
							       ref:  "HPC_T12"
							    }
						 },
			      signals:           {
						   "mh":    {
							       ref:  "MH"
							    }
						 },
			      states_inputs:     [ "mux_0", "mux_1", "mux_2", "mux_3" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "mh" ],
			      signals_output:    [ ]
	                   } ;

        sim_p.elements.cu_mux_a   = {
			      name:              "MUX A",
			      description:       "MUX A",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0": {
							       ref:  "REG_MICROADDR"
							    },
						   "mux_1": {
							       ref:  "REG_MICROINS"
							    },
						   "mux_2": {
							       ref:  "ROM_MUXA"
							    },
						   "mux_3": {
							       ref:  "FETCH"
							    },
						   "mux_o": {
							       ref:  "MUXA_MICROADDR"
							    }
						 },
			      signals:           {
						   "a0":    {
							       ref:  "A0A1"
							    },
						   "a1":    {
							       ref:  "A0A1"
							    }
						 },
			      states_inputs:     [ "mux_0", "mux_1", "mux_2", "mux_3" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "a0", "a1" ],
			      signals_output:    [ ]
	                   } ;

        sim_p.elements.cu_mux_b   = {
			      name:              "MUX B",
			      description:       "MUX B",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0": {
							       ref:  "MUXC_MUXB"
							    },
						   "mux_1": {
							       ref:  "MUXC_MUXB"
							    },
						   "mux_o": {
							       ref:  "A1"
							    }
						 },
			      signals:           {
						   "mb":    {
							       ref:  "B"
							    }
						 },
			      states_inputs:     [ "mux_0", "mux_1" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "mb" ],
			      signals_output:    [ ]
	                   } ;

        sim_p.elements.cu_mux_c   = {
			      name:              "MUX C",
			      description:       "MUX C",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0":  {
							       ref:  "VAL_ZERO"
							     },
						   "mux_1":  {
							       ref:  "INT"
							     },
						   "mux_2":  {
							       ref:  "IORDY"
							     },
						   "mux_3":  {
							       ref:  "MRDY"
							     },
						   "mux_4":  {
							       ref:  "REG_SR/0"
							     },
						   "mux_5":  {
							       ref:  "REG_SR/1"
							     },
						   "mux_6":  {
							       ref:  "REG_SR/28"
							     },
						   "mux_7":  {
							       ref:  "REG_SR/29"
							     },
						   "mux_8":  {
							       ref:  "REG_SR/30"
							     },
						   "mux_9":  {
							       ref:  "REG_SR/31"
							     },
						   "mux_10": {
							       ref:  "INEX"
							     },
						   "mux_o":  {
							       ref:  "MUXC_MUXB"
							     }
						 },
			      signals:           {
						   "ctl":    {
							       ref:  "C"
							     }
						 },
			      states_inputs:     [ "mux_0", "mux_1", "mux_2", "mux_3", "mux_4", "mux_5", "mux_6", "mux_7", "mux_8", "mux_9", "mux_10" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                   } ;

        sim_p.elements.cu_mux_ra  = {
			      name:              "MUX RA",
			      description:       "MUX MR",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0":  {
							       ref:  "REG_IR"
							     },
						   "mux_1":  {
							       ref:  "REG_MICROINS/SELA"
							     },
						   "mux_o":  {
							       ref:  "RA"
							     }
						 },
			      signals:           {
						   "ctl":    {
							       ref:  "MRA"
							     }
						 },
			      states_inputs:     [ "mux_0", "mux_1" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                   } ;

        sim_p.elements.cu_mux_rb  = {
			      name:              "MUX RB",
			      description:       "MUX MR",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0":  {
							       ref:  "REG_IR"
							     },
						   "mux_1":  {
							       ref:  "REG_MICROINS/SELB"
							     },
						   "mux_o":  {
							       ref:  "RB"
							     }
						 },
			      signals:           {
						   "mr":     {
							       ref:  "MRB"
							     }
						 },
			      states_inputs:     [ "mux_0", "mux_1" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "mr" ],
			      signals_output:    [ ]
	                   } ;

        sim_p.elements.cu_mux_rc  = {
			      name:              "MUX RC",
			      description:       "MUX MR",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0":  {
							       ref:  "REG_IR"
							     },
						   "mux_1":  {
							       ref:  "REG_MICROINS/SELC"
							     },
						   "mux_o":  {
							       ref:  "RC"
							     }
						 },
			      signals:           {
						   "mr":     {
							       ref:  "MRC"
							     }
						 },
			      states_inputs:     [ "mux_0", "mux_1" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "mr" ],
			      signals_output:    [ ]
	                   } ;

        sim_p.elements.cu_mux_mc  = {
			      name:              "MUX MC",
			      description:       "MUX MC",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0":  {
							       ref:  "REG_IR"
							     },
						   "mux_1":  {
							       ref:  "REG_MICROINS/SELCOP"
							     },
						   "mux_o":  {
							       ref:  "COP"
							     }
						 },
			      signals:           {
						   "ctl":    {
							       ref:  "MC"
							     }
						 },
			      states_inputs:     [ "mux_0", "mux_1" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	                   } ;

        // CPU - Registers

        sim_p.elements.mar = {
			      name:              "MAR",
			      description:       "Memory Address Register",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":     {
							       ref:  "BUS_IB"
							     },
						   "out":    {
							       ref:  "REG_MAR"
							     }
						 },
			      signals:           {
						   "c0":     {
							       ref:  "C0"
							     }
						 },
			      states_inputs:     [ "in" ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "c0" ],
			      signals_output:    [ ]
	               } ;

        sim_p.elements.mbr = {
			      name:              "MBR",
			      description:       "Memory Data Register",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":     {
							       ref:  "M1_C1"
							     },
						   "out":    {
							       ref:  "REG_MBR"
							     }
						 },
			      signals:           {
						   "c1":     {
							       ref:  "C1"
							     }
						 },
			      states_inputs:     [ "in" ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "c1" ],
			      signals_output:    [ ]
	               } ;

        sim_p.elements.pc = {
			      name:              "PC",
			      description:       "Programm Counter",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":     {
							       ref:  "BUS_IB"
							     },
						   "out":    {
							       ref:  "REG_PC"
							     }
						 },
			      signals:           {
						   "ctl":    {
							       ref:  "C2"
							     }
						 },
			      states_inputs:     [ "in" ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	               } ;

        sim_p.elements.ir = {
			      name:              "IR",
			      description:       "Instruction Register",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":     {
							       ref:  "BUS_IB"
							     },
						   "out":    {
							       ref:  "REG_IR"
							     }
						 },
			      signals:           {
						   "c3":     {
							       ref:  "C3"
							     }
						 },
			      states_inputs:     [ "in" ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "c3" ],
			      signals_output:    [ ]
	               } ;

        sim_p.elements.rt1 = {
			      name:              "RT1",
			      description:       "Temporal Register 1",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":     {
							       ref:  "BUS_IB"
							     },
						   "out":    {
							       ref:  "REG_RT1"
							     }
						 },
			      signals:           {
						   "ctl":    {
							       ref:  "C4"
							     }
						 },
			      states_inputs:     [ "in" ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	               } ;

        sim_p.elements.sr = {
			      name:              "SR",
			      description:       "State Register",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":     {
							       ref:  "M7_C7"
							     },
						   "out":    {
							       ref:  "REG_SR"
							     }
						 },
			      signals:           {
						   "ctl":    {
							       ref:  "C7"
							     }
						 },
			      states_inputs:     [ "in" ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	               } ;

        sim_p.elements.register_file = {
			      name:              "RF",
			      description:       "Register File",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "a":     {
							       ref:  "RA_T9"
							    },
						   "b":     {
							       ref:  "RB_T10"
							    },
						   "c":     {
							       ref:  "BUS_IB"
							    }
						 },
			      signals:           {
						   "ra":    {
							       ref:  "RA"
							    },
						   "rb":    {
							       ref:  "RB"
							    },
						   "rc":    {
							       ref:  "RC"
							    },
						   "lc":    {
							       ref:  "LC"
							    }
						 },
			      states_inputs:     [ "c" ],
			      states_outputs:    [ "a", "b" ],
			      signals_inputs:    [ "ra", "rb", "rc", "lc" ],
			      signals_output:    [ ]
	               } ;

        // CPU - ALU

        sim_p.elements.cpu_alu = {
			      name:              "ALU",
			      description:       "Arithmetic-Logit Unit",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "a":     {
							       ref:  "MA_ALU"
							    },
						   "b":     {
							       ref:  "MB_ALU"
							    },
						   "alu":   {
							       ref:  "ALU_C6"
							    },
						   "flags": {
							       ref:  "M7"
							    }
						 },
			      signals:           {
						   "cop":   {
							       ref:  "COP"
							    }
						 },
			      states_inputs:     [ "a", "b" ],
			      states_outputs:    [ "alu", "flags" ],
			      signals_inputs:    [ "cop" ],
			      signals_output:    [ ]
	                } ;

        // CPU - Selectors

        sim_p.elements.select_rt1  = {
			      name:              "Sel-RT1",
			      description:       "Select RT1",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_i": {
							       ref:  "REG_RT1"
							    },
						   "mux_o": {
							       ref:  "SELEC_T3"
							    }
						 },
			      signals:           {
						   "se":     {
								ref:  "SE"
							     },
						   "size":   {
								ref:  "SIZE"
							      },
						   "offset":  {
								ref:  "OFFSET"
							      }
						 },
			      states_inputs:     [ "mux_i" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "se", "size", "offset" ],
			      signals_output:    [ ]
	                   } ;

        return sim_p ;
}

