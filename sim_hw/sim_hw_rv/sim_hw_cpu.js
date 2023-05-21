/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

        sim.rv.components["CPU"] = {
		                  name: "CPU",
		                  version: "1",
		                  abilities:    [ "CPU" ],

		                  // ui: details
                                  details_name: [ "REGISTER_FILE", "CONTROL_MEMORY", "CLOCK", "CPU_STATS" ],
                                  details_fire: [ ['svg_p:id17'], ['svg_p:id155', 'svg_p:id156', 'svg_p:id157', 'svg_p:id158',
								  'svg_p:id159', 'svg_p:id160', 'svg_p:id161', 'svg_p:id162', 'svg_p:id163'], ['svg_p:id148'] ],

		                  // state: write_state, read_state, get_state
		                  write_state:  function ( vec ) {
                                                  if (typeof vec.CPU == "undefined") {
                                                      vec.CPU = {} ;
                                                  }

					          var internal_reg = ["PC", "SR"] ;

						  var value = 0 ;
					          for (var i=0; i<sim.rv.states.BR.length; i++)
						  {
						      value = parseInt(get_value(sim.rv.states.BR[i])) >>> 0;
						      if (value != 0) {
							  vec.CPU["R" + i] = {"type":  "register",
								              "default_value": 0x0,
								              "id":    "R" + i,
								              "op":    "=",
								              "value": "0x" + value.toString(16)} ;
						      }
						  }

					          for (i=0; i<internal_reg.length; i++)
						  {
						      value = parseInt(get_value(sim.rv.states['REG_' + internal_reg[i]])) >>> 0;
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
                                                  if (typeof vec.CPU == "undefined") {
                                                      vec.CPU = {} ;
                                                  }

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
					          var value = 0 ;
					          var r_reg = reg.toUpperCase().trim() ;
					          if (typeof sim.rv.states['REG_' + r_reg] != "undefined") {
					              value = get_value(sim.rv.states['REG_' + r_reg]) >>> 0;
					              return "0x" + value.toString(16) ;
					          }

					              r_reg = r_reg.replace('R','') ;
					          var index = parseInt(r_reg) ;
					          if (typeof sim.rv.states.BR[index] != "undefined") {
					              value = get_value(sim.rv.states.BR[index]) >>> 0;
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

        sim.rv.ctrl_states.pc  = {
		                    name:  "PC",
		                    state: "REG_PC",
		                    is_pointer: true
	                         } ;
        sim.rv.ctrl_states.sp  = {
		                    name:  "SP",
		                    state: "BR.29",
		                    is_pointer: true
	                         } ;
        sim.rv.ctrl_states.fp  = {
		                    name:  "FP",
		                    state: "BR.30",
		                    is_pointer: true
	                         } ;
        sim.rv.ctrl_states.ir  = {
		                    name:  "IR",
		                    state: "REG_IR",
		                    default_eltos: {  "co": { "begin":  0, "end":  5, "length": 6 },
			                             "cop": { "begin": 28, "end": 31, "length": 4 } },
		                    is_pointer: false
	                         } ;
		sim.rv.ctrl_states.mpc = {
		                    name:  "mPC",
		                    state: "REG_MICROADDR",
		                    is_pointer: false
	                         } ;


	/*
	 *  Internal States
	 */

        sim.rv.internal_states.MC           = {} ;
        sim.rv.internal_states.ROM          = {} ;

        sim.rv.internal_states.FIRMWARE     = ws_empty_firmware ;
        sim.rv.internal_states.io_hash      = {} ;
        sim.rv.internal_states.fire_stack   = [] ;

        sim.rv.internal_states.tri_state_names = [] ;
        sim.rv.internal_states.fire_visible    = { 'databus': false, 'internalbus': false } ;
        sim.rv.internal_states.filter_states   = [ "REG_IR_DECO,col-12", "REG_IR,col-auto", "REG_PC,col-auto", "REG_OUT,col-auto",
												  "REG_SR,col-auto", "REG_MICROADDR,col-auto", "RDATA,col-auto", "ROM_MUXA,col-auto", "MUXA_MICROADDR,col-auto", "R_DATA1,col-auto", "R_DATA2,col-auto", "VAL_IMM,col-auto"] ;
        sim.rv.internal_states.filter_signals  = [ "CU,0", "ALUOP,0", "COP,0", "M1,0", "M2,0", "M3,0", "M4,0",
												"JUMP,0", "PCWRITE,0", "IMR,0", "IRWRITE,0", "RW,0", "WOUT,0",
												"DMR,0", "DMW,0", "Word BE,0", "Byte BE,0" ] ;
        sim.rv.internal_states.alu_flags       = { 'flag_n': 0, 'flag_z': 0 } ;

	/*
	 *  States
	 */

	/* REGISTER FILE STATES */
	sim.rv.states.BR = [] ;
	sim.rv.states.BR[0]      = { name:"R0", verbal: "Register 0",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[1]      = { name:"R1", verbal: "Register 1",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[2]      = { name:"R2", verbal: "Register 2",
                                    visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[3]      = { name:"R3", verbal: "Register 3",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[4]      = { name:"R4", verbal: "Register 4",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[5]      = { name:"R5", verbal: "Register 5",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[6]      = { name:"R6", verbal: "Register 6",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[7]      = { name:"R7", verbal: "Register 7",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[8]      = { name:"R8", verbal: "Register 8",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[9]      = { name:"R9", verbal: "Register 9",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[10]     = { name:"R10", verbal: "Register 10",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[11]     = { name:"R11", verbal: "Register 11",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[12]     = { name:"R12", verbal: "Register 12",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[13]     = { name:"R13", verbal: "Register 13",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[14]     = { name:"R14", verbal: "Register 14",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[15]     = { name:"R15", verbal: "Register 15",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[16]     = { name:"R16", verbal: "Register 16",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[17]     = { name:"R17", verbal: "Register 17",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[18]     = { name:"R18", verbal: "Register 18",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[19]     = { name:"R19", verbal: "Register 19",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[20]     = { name:"R20", verbal: "Register 20",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[21]     = { name:"R21", verbal: "Register 21",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[22]     = { name:"R22", verbal: "Register 22",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[23]     = { name:"R23", verbal: "Register 23",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[24]     = { name:"R24", verbal: "Register 24",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[25]     = { name:"R25", verbal: "Register 25",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[26]     = { name:"R26", verbal: "Register 26",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[27]     = { name:"R27", verbal: "Register 27",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[28]     = { name:"R28", verbal: "Register 28",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[29]     = { name:"R29", verbal: "Register 29",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[30]     = { name:"R30", verbal: "Register 30",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states.BR[31]     = { name:"R31", verbal: "Register 31",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };

	sim.rv.states["REG_PC"]  = { name:"PC",  verbal: "Program Counter Register",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	//MAR y MBR problemas
	sim.rv.states["REG_MAR"] = { name:"MAR", verbal: "Memory Address Register",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states["REG_MBR"] = { name:"MBR", verbal: "Memory Data Register",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states["REG_IR"]  = { name:"IR",  verbal: "Instruction Register",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	//CONSULTAR
	sim.rv.states["REG_SR"]  = { name:"SR", verbal: "State Register",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };

	sim.rv.states["REG_OUT"]  = { name:"OUT", verbal: "Out Register",
                                     visible:true, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };

	/* REGISTER PC (RELATED) STATES */
	sim.rv.states["M4_PC"]  = { name:"M4_PC", verbal: "Input PCWrite via M4",
                                     visible:false, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };

	/* INSTRUCTION REGISTER (RELATED) STATES */
	sim.rv.states["RDATA"]  = { name:"RDATA", verbal: "Read data form Instruction Memory (Input Instruction Register via Instruction Memory)",
                                     visible:false, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };

	/* ALU (RELATED) STATES */
	sim.rv.states["M2_ALU"]  = { name:"M2_ALU", verbal: "Input ALU via M2",
                                     visible:false, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states["M3_ALU"]  = { name:"M3_ALU", verbal: "Input ALU via M3",
                                     visible:false, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states["ALU_WOUT"]  = { name:"ALU_WOUT", verbal: "Input of OUT Register",
                                     visible:false, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };

	sim.rv.states["FLAG_N"]  = { name: "FLAG_N", verbal: "Negative Flag",
                                     visible:true, nbits: "1", value:0, default_value:0,
                                     draw_data: [] };
	sim.rv.states["FLAG_Z"]  = { name: "FLAG_Z", verbal: "Zero Flag",
                                     visible:true, nbits: "1", value:0, default_value:0,
                                     draw_data: [] };

	/* CONTROL UNIT */
	sim.rv.states["REG_MICROADDR"]  = { name: "µADDR", verbal: "Microaddress Register",
                                            visible:true, nbits: "12", value:0,  default_value:0,
											draw_data: [] };
	sim.rv.states["REG_MICROINS"]   = { name: "µINS", verbal: "Microinstruction Register",
                                            visible:true, nbits: "77", value:{}, default_value:{},
                                            draw_data: [] };

	sim.rv.states["FETCH"]          = { name: "FETCH",          verbal: "Input Fetch",
                                            visible:false, nbits: "12", value:0, default_value:0,
                                            draw_data: [] };
	sim.rv.states["ROM_MUXA"]       = { name: "ROM_MUXA",       verbal: "Input ROM",
                                            visible:false, nbits: "12", value:0, default_value:0,
                                            draw_data: [] };

	sim.rv.states["MUXA_MICROADDR"] = { name: "MUXA_MICROADDR", verbal: "Input microaddress",
                                            visible:false, nbits: "12", value:0, default_value:0,
                                            draw_data: [] };
	sim.rv.states["MUXC_MUXB"]      = { name: "MUXC_MUXB", verbal: "Output of MUX C",
                                            visible:false, nbits: "1",  value:0, default_value:0,
                                            draw_data: [] };
	sim.rv.states["INEX"]           = { name: "INEX",      verbal: "Illegal Instruction Exception",
                                            visible:false, nbits: "1",  value:0, default_value:0,
                                            draw_data: [] };

	/* DEVICES AND MEMORY */
	sim.rv.states["DM_BS"]          = { name: "DM_BS", verbal: "From Data Memory to Byte/Word Selector",
                                            visible:false, nbits: "32", value:0, default_value:0,
                                            draw_data: [] };
	sim.rv.states["BS_M1"]          = { name: "BS_M1", verbal: "From Byte/Word Selector to Mux 1",
                                            visible:false, nbits: "32", value:0, default_value:0,
                                            draw_data: [] };
	sim.rv.states["BS_BS"]          = { name: "BS_BS", verbal: "Internal Byte/Word Selector",
                                            visible:false, nbits: "32", value:0, default_value:0,
                                            draw_data: [] };

	/* MUX 3 (RELATED) STATES */

	sim.rv.states["VAL_ZERO"]       = { name: "VAL_ZERO", verbal: "Wired Zero",
                                            visible:false, nbits: "1",  value:0, default_value:0,
                                            draw_data: [] };
	sim.rv.states["VAL_ONE"]        = { name: "VAL_ONE",  verbal: "Wired One",
                                            visible:false, nbits: "32", value:1, default_value:1,
                                            draw_data: [] };
	sim.rv.states["VAL_FOUR"]       = { name: "VAL_FOUR", verbal: "Wired Four",
                                            visible:false, nbits: "32", value:4, default_value:4,
                                            draw_data: [] };
	sim.rv.states["VAL_IMM"]       	= { name: "VAL_IMM", verbal: "Immediate Value Generator",
                                            visible:false, nbits: "32", value:0, default_value:0,
                                            draw_data: [] };

	/* VIRTUAL */
	sim.rv.states["REG_IR_DECO"] = { name:"IR_DECO",  verbal: "Instruction Decoded",
                                         visible:true,  nbits:"0",  value:0,  default_value:0,
                                         draw_data: [] };
	sim.rv.states["DECO_INS"]    = { name:"DECO_INS", verbal: "Instruction decoded in binary",
                                         visible:true,  nbits:"32", value:0,  default_value:0,
                                         draw_data: [] };
	sim.rv.states["CLK"]         = { name:"CLK",      verbal: "Clock",
                                         visible:false, nbits:"32", value:0,  default_value:0,
                                         draw_data: [] };
	sim.rv.states["ACC_TIME"]    = { name:"ACC_TIME", verbal: "Accumulated CPU time",
                                         visible:false, nbits:"32", value:0,  default_value:0,
                                         draw_data: [] };
	sim.rv.states["TTCPU"]      = { name:"TTCPU", verbal: "Several Tristates to the internal data bus in CPU activated",
                                         visible:false, nbits:"32", value:0,  default_value:0,
                                         draw_data: [] };
	sim.rv.states["ACC_PWR"]    = { name:"ACC_PWR", verbal: "Accumulated Energy Consumption",
                                         visible:false, nbits:"32", value:0,  default_value:0,
                                         draw_data: [] };


	/*
	 *  Signals
	 */

	/* CONTROL UNIT */
	sim.rv.signals["CU"] = { name: "CU", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
				behavior: ["PLUS1 MUXA_MICROADDR REG_MICROADDR",
					   "CP_FIELD MUXA_MICROADDR REG_MICROINS/MADDR",
					   "MV MUXA_MICROADDR ROM_MUXA",
					   "MV MUXA_MICROADDR FETCH"],
                                depends_on: ["CLK"],
				fire_name: ['svg_p:id170'],
				draw_data: [['svg_p:id166', 'svg_p:id167', 'svg_p:id168'],['svg_p:id169']],
				draw_name: [['svg_p:id153', 'svg_p:id149']] };

	/* REGISTER LOAD */
	sim.rv.signals["PCWRITE"] = { name: "PCWRITE", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
				   behavior: ["NOP", "LOAD REG_PC M4_PC; UPDATEDPC"],
				   fire_name: ['svg_p:id112'],
				   draw_data: [['svg_p:id101']],
				   draw_name: [['svg_p:id110']] };
	//Logic gates PC
	sim.rv.signals["JUMP"] = { name: "JUMP", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
				   behavior: ["NOP", "LOAD_J REG_PC M4_PC; UPDATEDPC_J"],
				   fire_name: ['svg_p:id118'],
				   draw_data: [['svg_p:id104']],
				   draw_name: [['svg_p:id102']] };

	/* IR REGISTER */

	//Read immediate value
	sim.rv.signals["R_IMM"] = { name: "R_IMM", visible: true, type: "L", value: 0, default_value:20, nbits: "5",
			        behavior:  ["NOP"],
			        fire_name: [],
			        draw_data: [[]],
			        draw_name: [[]] };

	sim.rv.signals["IRWRITE"] = { name: "IRWRITE", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
				   behavior: ["NOP", "LOAD REG_IR RDATA; DECO; MBIT_SN R_IMM REG_IR REG_MICROINS/R_IMM 5; LOAD VAL_IMM R_IMM"],
				   fire_name: ['svg_p:id146'],
				   draw_data: [['svg_p:id28']],
				   draw_name: [['svg_p:id145']] };

	/* OUT REGISTER */
	sim.rv.signals["WOUT"] = { name: "WOUT", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
				   behavior: ["NOP", "LOAD REG_OUT ALU_WOUT"],
				   fire_name: ['svg_p:id140'],
				   draw_data: [['svg_p:id47']],
				   draw_name: [['svg_p:id139']] };

	/* INSTRUCTION MEMORY */
	sim.rv.signals["IMR"] = { name: "IMR", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
				   behavior: ["NOP", "READ_IM"],
				   fire_name: ['svg_p:id128'],
				   draw_data: [['svg_p:id25']],
				   draw_name: [['svg_p:id127']] };


	/* MUX. */
	sim.rv.signals["M1"]  = { name: "M1", visible: true, type: "L",  value: 0, default_value:0, nbits: "1",
			       behavior: ["MV M1_RW BS_M1", "MV M1_RW REG_SR"],
                               depends_on: ["RW"],
			       fire_name: ['svg_p:id129'],
			       draw_data: [['svg_p:id155','svg_p:id159','svg_p:id195'], ['svg_p:id156','svg_p:id179','svg_p:id178','svg_p:id208', 'svg_p:id181', 'svg_p:id182']],
			       draw_name: [[], ['svg_p:id123']] };
	sim.rv.signals["M2"]  = { name: "M2",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["MV M2_ALU REG_PC; FIRE ALUOP", "MV M2_ALU R_DATA1; FIRE ALUOP"],
			       fire_name: ['svg_p:id130'],
			       draw_data: [['svg_p:id38', 'svg_p:id72', 'svg_p:id69', 'svg_p:id71', 'svg_p:id70'], ['svg_p:id39']],
			       draw_name: [[], ['svg_p:id125']] };
	sim.rv.signals["M3"]  = { name: "M3",  visible: true, type: "L", value: 0, default_value:0, nbits: "2",
			       behavior: ["MV M3_ALU R_DATA2; FIRE ALUOP", "MV M3_ALU VAL_FOUR; FIRE ALUOP", "MV M3_ALU VAL_IMM; FIRE ALUOP", "NOP"],
			       fire_name: ['svg_p:id131'],
			       draw_data: [['svg_p:id44'], ['svg_p:id74'], ['svg_p:id45', 'svg_p:id76', 'svg_p:id77']],
			       draw_name: [[], ['svg_p:id124']] };
	sim.rv.signals["M4"]  = { name: "M4", visible: true, type: "L",  value: 0, default_value:0, nbits: "1",
			       behavior: ["MV M4_PC REG_OUT", "MV M4_PC ALU_WOUT"],
                               depends_on: ["PCWRITE"],
			       fire_name: ['svg_p:id142'],
			       draw_data: [['svg_p:id87','svg_p:id86','svg_p:id126'], ['svg_p:id97','svg_p:id96','svg_p:id90']],
			       draw_name: [[], ['svg_p:id141']] };

	sim.rv.signals["ALUOP"] = { name: "ALUOP", visible: true, type: "L", value: 0, default_value:0, nbits: "4",
					behavior: ["NOP_ALU; UPDATE_NZ",
								"AND ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
								"OR ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
								"NOT ALU_WOUT M2_ALU; UPDATE_NZ",
								"XOR ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
								"SRL ALU_WOUT M2_ALU; UPDATE_NZ",
								"SRA ALU_WOUT M2_ALU; UPDATE_NZ",
								"SL ALU_WOUT M2_ALU; UPDATE_NZ",
								"RR ALU_WOUT M2_ALU; UPDATE_NZ",
								"RL ALU_WOUT M2_ALU; UPDATE_NZ",
								"ADD ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
								"SUB ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
								"MUL ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
								"DIV ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
								"MOD ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
								"LUI ALU_WOUT M2_ALU; UPDATE_NZ"],
			       fire_name: ['svg_p:id138'],
			       draw_data: [['svg_p:id49', 'svg_p:id48', 'svg_p:id47']],
			       draw_name: [['svg_p:id134', 'svg_p:id136']] };

				   /*
					behavior: ["NOP_ALU; UPDATE_NZ",
                                          "AND ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
					  "OR ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
					  "NOT ALU_WOUT M2_ALU; UPDATE_NZ",
					  "XOR ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
					  "SRL ALU_WOUT M2_ALU; UPDATE_NZ",
					  "SRA ALU_WOUT M2_ALU; UPDATE_NZ",
					  "SL ALU_WOUT M2_ALU; UPDATE_NZ",
					  "RR ALU_WOUT M2_ALU; UPDATE_NZ",
					  "RL ALU_WOUT M2_ALU; UPDATE_NZ",
					  "ADD ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
					  "SUB ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
					  "MUL ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
					  "DIV ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
					  "MOD ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
					  "LUI ALU_WOUT M2_ALU; UPDATE_NZ",
					  "FADD; UPDATE_NZ",
					  "FSUB; UPDATE_NZ",
					  "FMUL; UPDATE_NZ",
					  "FDIV; UPDATE_NZ",
					  "FCVT; UPDATE_NZ",
					  "FCLASS; UPDATE_NZ",
					  "ADDU; UPDATE_NZ",
					  "SUBU; UPDATE_NZ",
					  "MULU; UPDATE_NZ",
					  "DIVU; UPDATE_NZ",
                                          "NOP_ALU",
                                          "NOP_ALU",
                                          "NOP_ALU",
                                          "NOP_ALU",
                                          "NOP_ALU",
                                          "NOP_ALU"],
										  */


	/* REGISTER FILE */
	sim.rv.signals["REG_R1"] = { name: "REG_R1", visible: true, type: "L", value: 0, default_value:15, nbits: "5",
			        behavior:  ["NOP"],
			        fire_name: [],
			        draw_data: [[]],
			        draw_name: [[]] };
	sim.rv.signals["REG_R2"] = { name: "REG_R2", visible: true, type: "L", value: 0, default_value:20, nbits: "5",
			        behavior:  ["NOP"],
			        fire_name: [],
			        draw_data: [[]],
			        draw_name: [[]] };
	sim.rv.signals["REG_W2"] = { name: "REG_W2", visible: true, type: "L", value: 0, default_value:7, nbits: "5",
			        behavior:  ["NOP"],
			        fire_name: [],
			        draw_data: [[]],
			        draw_name: [[]] };

	sim.rv.states["M1_RW"]  = { name:"M1_RW", verbal: "Input Register File via M1",
                                     visible:false, nbits:"32", value:0,  default_value:0,
                                     draw_data: [] };
	sim.rv.states["W_DATA"] = { name:"W_DATA", verbal: "Write Data",
                                     visible:true, nbits:"32", value:0, default_value:0,
                                     draw_data: [] };

	sim.rv.states["R_DATA1"] = { name:"R_DATA1", verbal: "Read Data 1",
                                     visible:true, nbits:"32", value:0, default_value:0,
                                     draw_data: [] };
	sim.rv.states["R_DATA2"] = { name:"R_DATA2", verbal: "Read Data 2",
                                     visible:true, nbits:"32", value:0, default_value:0,
                                     draw_data: [] };

	sim.rv.signals["RW"]  = { name: "RW", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
					behavior: ["NOP", "MBIT_SN REG_R1 REG_IR REG_MICROINS/REG_R1 5; GET R_DATA1 BR REG_R1; MBIT_SN REG_R2 REG_IR REG_MICROINS/REG_R2 5; GET R_DATA2 BR REG_R2; MBIT_SN REG_W2 REG_IR REG_MICROINS/REG_W2 5; SET BR REG_W2 M1_RW"],
					fire_name: ['svg_p:id144'],
					draw_data: [['svg_p:id58', 'svg_p:id60', 'svg_p:id61']],
					draw_name: [['svg_p:id143']] };

	/* W-Byte & R-Byte Selector */
	sim.rv.signals["BW"] =  { name: "BW",
		               verbal: ['Select one byte (based on A1A0) from Word. ',
                                        'Select two bytes (one Half Word based on A1A0) from Word. ',
                                        '',
                                        'Select the full Word. '],
                               visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
		               behavior: ['MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW',
				          'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW',
				          'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW',
				          'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW'],
				fire_name: ['svg_p:id174'],
				draw_data: [['svg_p:id80','svg_p:id195','svg_p:id59', 'svg_p:id55']],
				draw_name: [[],[]] };
	sim.rv.signals["A1A0"] = { name: "A1A0", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
				behavior: ['MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					   'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					   'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					   'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA'],
				//fire_name: ['svg_p:text3603'],
				fire_name: [],
				draw_data: [[],[]],
				draw_name: [[],[]] };
	sim.rv.signals["BWA"] = { name: "BWA", visible: false, type: "L", value: 0, default_value: 0, nbits: "4",
				behavior: ['BSEL BS_BS 0 8 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'BSEL BS_BS 8 8 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'BSEL BS_BS 16 8 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'BSEL BS_BS 24 8 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'BSEL BS_BS 0 16 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'BSEL BS_BS 0 16 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'BSEL BS_BS 0 16 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'BSEL BS_BS 0 16 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'BSEL BS_BS 16 16 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'BSEL BS_BS 16 16 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'BSEL BS_BS 16 16 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'BSEL BS_BS 16 16 REG_MBR 0; FIRE DMR; FIRE DMW',
					   'MV BS_BS REG_MBR; FIRE DMR; FIRE DMW',
					   'MV BS_BS REG_MBR; FIRE DMR; FIRE DMW',
					   'MV BS_BS REG_MBR; FIRE DMR; FIRE DMW',
					   'MV BS_BS REG_MBR; FIRE DMR; FIRE DMW'],
				 //fire_name: ['svg_p:text3533-5'],
				 fire_name: [],
				 draw_data: [[],[]],
				 draw_name: [[],[]] };
	sim.rv.signals["SBWA"] = { name: "SBWA", visible: false, type: "L", value: 0, default_value: 0, nbits: "5",
				behavior: ['BSEL BS_M1 0 8 DM_BS 0',
					   'BSEL BS_M1 0 8 DM_BS 8',
					   'BSEL BS_M1 0 8 DM_BS 16',
					   'BSEL BS_M1 0 8 DM_BS 24',
					   'BSEL BS_M1 0 16 DM_BS 0',
					   'BSEL BS_M1 0 16 DM_BS 0',
					   'BSEL BS_M1 0 16 DM_BS 0',
					   'BSEL BS_M1 0 16 DM_BS 0',
					   'BSEL BS_M1 0 16 DM_BS 16',
					   'BSEL BS_M1 0 16 DM_BS 16',
					   'BSEL BS_M1 0 16 DM_BS 16',
					   'BSEL BS_M1 0 16 DM_BS 16',
					   'MV BS_M1 DM_BS',
					   'MV BS_M1 DM_BS',
					   'MV BS_M1 DM_BS',
					   'MV BS_M1 DM_BS',
					   'BSEL BS_M1 0 8 DM_BS 0; EXT_SIG BS_M1 7',
					   'BSEL BS_M1 0 8 DM_BS 8; EXT_SIG BS_M1 7',
					   'BSEL BS_M1 0 8 DM_BS 16; EXT_SIG BS_M1 7',
					   'BSEL BS_M1 0 8 DM_BS 24; EXT_SIG BS_M1 7',
					   'BSEL BS_M1 0 16 DM_BS 0; EXT_SIG BS_M1 15',
					   'BSEL BS_M1 0 16 DM_BS 0; EXT_SIG BS_M1 15',
					   'BSEL BS_M1 0 16 DM_BS 0; EXT_SIG BS_M1 15',
					   'BSEL BS_M1 0 16 DM_BS 0; EXT_SIG BS_M1 15',
					   'BSEL BS_M1 0 16 DM_BS 16; EXT_SIG BS_M1 15',
					   'BSEL BS_M1 0 16 DM_BS 16; EXT_SIG BS_M1 15',
					   'BSEL BS_M1 0 16 DM_BS 16; EXT_SIG BS_M1 15',
					   'BSEL BS_M1 0 16 DM_BS 16; EXT_SIG BS_M1 15',
					   'MV BS_M1 DM_BS',
					   'MV BS_M1 DM_BS',
					   'MV BS_M1 DM_BS',
					   'MV BS_M1 DM_BS'],
				fire_name: [],
				draw_data: [[],[]],
				draw_name: [[],[]] };

	/* Virtual Signals, for UI */
	sim.rv.signals["TEST_N"] = { name: "TEST_N", visible: true, type: "L", value: 0, default_value:0, nbits: "1", forbidden: true,
		  	          behavior: ["MV FLAG_N VAL_ZERO", "MV FLAG_N VAL_ONE"],
                                  depends_on: ["ALUOP"],
		  	          fire_name: ['svg_p:id204', 'svg_p:id121'],
			          draw_data: [['svg_p:id204', 'svg_p:id113']],
			          draw_name: [[]] };
	sim.rv.signals["TEST_Z"] = { name: "TEST_Z", visible: true, type: "L", value: 0, default_value:0, nbits: "1", forbidden: true,
		  	          behavior: ["MV FLAG_Z VAL_ZERO", "MV FLAG_Z VAL_ONE"],
                                  depends_on: ["ALUOP"],
		  	          fire_name: ['svg_p:id205', 'svg_p:id122'],
			          draw_data: [['svg_p:id205', 'svg_p:id104']],
			          draw_name: [[]] };


	/*
	 *  Syntax of behaviors
	 */

	sim.rv.behaviors["NOP"]      = { nparameters: 1,
				     operation: function(s_expr) { },
				        verbal: function(s_expr) { return "" ; }
				   };
	sim.rv.behaviors["NOP_ALU"]  = { nparameters: 1,
				     operation: function(s_expr)
                                                {
                                                   sim.rv.internal_states.alu_flags.flag_n = 0 ;
                                                   sim.rv.internal_states.alu_flags.flag_z = 0 ;
                                                   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
                                                   return "" ;
                                                }
				   };
        sim.rv.behaviors["MV"]       = { nparameters: 3,
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
                                                       return "Copy from " + show_verbal(s_expr[2]) +
						              " to " + show_verbal(s_expr[1]) +
                                                              " value " + show_value(newval) + ". " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " +
                                                          show_verbal(s_expr[2]) + " ("+show_value(newval)+"). ";
                                                }
                                   };
        sim.rv.behaviors["LOAD"]     = { nparameters: 3,
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
						    	      " to " + show_verbal(s_expr[1]) +
                                                              " value " + show_value(newval) + ". " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " +
                                                          show_verbal(s_expr[2]) +
                                                          " (" + show_value(newval) + "). " ;
                                                }
                                   };
		sim.rv.behaviors["LOAD_J"]     = { nparameters: 3,
                                     types: ["X", "X"],
                                     operation: function(s_expr)
                                                {
							if (!(get_value(sim.rv.states["FLAG_N"]) || get_value(sim.rv.states["FLAG_Z"]))) {
									return ;
								}
						   sim_elto_org = get_reference(s_expr[2]) ;
						   sim_elto_dst = get_reference(s_expr[1]) ;
                                                   newval       = get_value(sim_elto_org) ;
                                                   set_value(sim_elto_dst, newval) ;
                                                },
                                        verbal: function (s_expr)
                                                {
													return "Jump if N or Z" ;
                                                }
                                   };
        sim.rv.behaviors["CP_FIELD"] = { nparameters: 3,
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
						   var newval = 0 ;
                                                   var r = s_expr[2].split('/') ;
						   var sim_elto_org = get_reference(r[0]) ;
						   var sim_elto_dst = get_reference(r[1]) ;
						   if (typeof sim_elto_dst == "undefined")
						       sim_elto_dst = {} ;
						   if (typeof    sim_elto_org.value[r[1]] != "undefined")
							newval = sim_elto_org.value[r[1]];
					      else if (typeof    sim_elto_dst.default_value != "undefined")
							newval = sim_elto_dst.default_value;
					      else      newval = "&lt;undefined&gt;" ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Copy from Field " + r[1] + " of " + show_verbal(r[0]) +
							      " to " + show_verbal(s_expr[1]) +
                                                              " value " + newval + ". " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " +
                                                          show_verbal(r[0]) + "." + r[1] +
                                                          " (" + newval + "). " ;
                                                }
                                   };
	sim.rv.behaviors["NOT_ES"]   = { nparameters: 3,
				     types: ["S", "E"],
				     operation: function (s_expr)
		                                {
						   set_value( sim.rv.signals[s_expr[1]], Math.abs(get_value(sim.rv.states[s_expr[2]]) - 1));
                                                },
                                        verbal: function (s_expr)
                                                {
						   var value = Math.abs(get_value(sim.rv.states[s_expr[2]]) - 1) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Set " + show_verbal(s_expr[1]) + " with value " + show_value(value) + " (Logical NOT of " + s_expr[2] + "). " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " + show_value(value) +
                                                          " (Logical NOT " + s_expr[2] + "). " ;
                                                }
				   };
	sim.rv.behaviors["GET"]      = { nparameters: 4,
				     types: ["E", "E", "S"],
				     operation: function(s_expr)
		                                {
						   set_value(sim.rv.states[s_expr[1]], get_value(sim.rv.states[s_expr[2]][ sim.rv.signals[s_expr[3]].value]));
                                                },
                                        verbal: function (s_expr)
                                                {
						   var value = get_value(sim.rv.states[s_expr[2]][sim.rv.signals[s_expr[3]].value]) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Set " + show_verbal(s_expr[1]) + " with value " + show_value(value) + " (Register File " + s_expr[3] + "). " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " + show_value(value) +
                                                          " (Register File " + s_expr[3] + "). " ;
                                                }
				   };
	sim.rv.behaviors["SET"]      = { nparameters: 4,
				     types: ["E", "S", "E"],
				     operation: function(s_expr)
		                                {
						   set_value(sim.rv.states[s_expr[1]][ sim.rv.signals[s_expr[2]].value], get_value(sim.rv.states[s_expr[3]]));
                                                },
                                        verbal: function (s_expr)
                                                {
						   var value = get_value(sim.rv.states[s_expr[3]]) ;
						   var o_ref = sim.rv.states[s_expr[1]][sim.rv.signals[s_expr[2]].value] ;

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
	sim.rv.behaviors["AND"]      = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = get_value(sim.rv.states[s_expr[2]]) & get_value(sim.rv.states[s_expr[3]]) ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
				                   var result = get_value(sim.rv.states[s_expr[2]]) & get_value(sim.rv.states[s_expr[3]]) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU AND with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (AND). " ;
                                                }
				   };
	sim.rv.behaviors["OR"]       = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = get_value(sim.rv.states[s_expr[2]]) | get_value(sim.rv.states[s_expr[3]]) ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
				                   var result = get_value(sim.rv.states[s_expr[2]]) | get_value(sim.rv.states[s_expr[3]]) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU OR with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (OR). " ;
                                                }
				   };
	sim.rv.behaviors["NOT"]      = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = ~(get_value(sim.rv.states[s_expr[2]])) ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
				                   var result = ~(get_value(sim.rv.states[s_expr[2]])) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU NOT with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (NOT). " ;
                                                }
				   };
	sim.rv.behaviors["XOR"]      = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = get_value(sim.rv.states[s_expr[2]]) ^ get_value(sim.rv.states[s_expr[3]]) ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
				                   var result = get_value(sim.rv.states[s_expr[2]]) ^ get_value(sim.rv.states[s_expr[3]]) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU XOR with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (XOR). " ;
                                                }
				   };
	sim.rv.behaviors["SRL"]      = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = (get_value(sim.rv.states[s_expr[2]])) >>> 1 ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
				                   var result = (get_value(sim.rv.states[s_expr[2]])) >>> 1 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Shift Right Logical with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (SRL). " ;
                                                }
				   };
	sim.rv.behaviors["SRA"]      = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = (get_value(sim.rv.states[s_expr[2]])) >> 1 ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
				                   var result = (get_value(sim.rv.states[s_expr[2]])) >> 1 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Shift Right Arithmetic with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (SRA). " ;
                                                }
				   };
	sim.rv.behaviors["SL"]       = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = (get_value(sim.rv.states[s_expr[2]])) << 1 ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = ((result) >>> 31) ;
                                                },
                                        verbal: function (s_expr)
                                                {
				                   var result = (get_value(sim.rv.states[s_expr[2]])) << 1 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Shift Left with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (SL). " ;
                                                }
				   };
	sim.rv.behaviors["RR"]       = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = ((get_value(sim.rv.states[s_expr[2]])) >>> 1) | (((get_value(sim.rv.states[s_expr[2]])) & 1) << 31) ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
				                   var result = ((get_value(sim.rv.states[s_expr[2]])) >>> 1) | (((get_value(sim.rv.states[s_expr[2]])) & 1) << 31) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Right Rotation with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (RR). " ;
                                                }
				   };
	sim.rv.behaviors["RL"]       = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
				                   var result = ((get_value(sim.rv.states[s_expr[2]])) << 1) | (((get_value(sim.rv.states[s_expr[2]])) & 0X80000000) >>> 31) ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
				                   var result = ((get_value(sim.rv.states[s_expr[2]])) << 1) | (((get_value(sim.rv.states[s_expr[2]])) & 0X80000000) >>> 31) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Left Rotation with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (LR). " ;
                                                }
				   };
	sim.rv.behaviors["ADD"]  = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) << 0 ;
						   var result = a + b ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = (a >>> 31) && (b >>> 31) ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) << 0 ;
						   var result = a + b ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU ADD with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (ADD). " ;
                                                }
				   };
	sim.rv.behaviors["SUB"]      = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) << 0 ;
						   var result = a - b ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = (a >>> 31) && (b >>> 31) ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) << 0 ;
						   var result = a - b ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU SUB with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (SUB). " ;
                                                }
				   };
	sim.rv.behaviors["MUL"]  = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) << 0 ;
						   var result = a * b ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = 0 ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) << 0 ;
						   var result = a * b ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU MUL with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (MUL). " ;
                                                }
				   };
	sim.rv.behaviors["DIV"] = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = (get_value(sim.rv.states[s_expr[2]]) << 0) ;
						   var b = (get_value(sim.rv.states[s_expr[3]]) << 0) ;

						   if (0 == b) {
						       set_value(sim.rv.states[s_expr[1]], 0) ;

						       sim.rv.internal_states.alu_flags.flag_n = 0 ;
						       sim.rv.internal_states.alu_flags.flag_z = 1 ;
						       // sim.rv.internal_states.alu_flags.flag_v = 1 ;
						       // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                       return ;
                                                   }

				                   var result = Math.floor(a / b) ;
				                   set_value(sim.rv.states[s_expr[1]], result) ;
						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) << 0 ;

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
	sim.rv.behaviors["MOD"]      = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = (get_value(sim.rv.states[s_expr[2]]) << 0) ;
						   var b = (get_value(sim.rv.states[s_expr[3]]) << 0) ;

						   if (0 == b) {
						       set_value(sim.rv.states[s_expr[1]], 0) ;

						       sim.rv.internal_states.alu_flags.flag_n = 0 ;
						       sim.rv.internal_states.alu_flags.flag_z = 1 ;
						       // sim.rv.internal_states.alu_flags.flag_v = 1 ;
						       // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                       return ;
                                                   }

						   var result = a % b ;
						   set_value(sim.rv.states[s_expr[1]], result) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) << 0 ;

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
	sim.rv.behaviors["LUI"]      = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var result = (get_value(sim.rv.states[s_expr[2]])) << 16 ;
						   set_value(sim.rv.states[s_expr[1]], result) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var result = (get_value(sim.rv.states[s_expr[2]])) << 16 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU Load Upper Immediate with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (LUI). " ;
                                                }
				   };
	sim.rv.behaviors["ADDU"] = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) >>> 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) >>> 0 ;
						   var result = a + b ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = 0 ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) >>> 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) >>> 0 ;
						   var result = a + b ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU ADDU with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (ADDU). " ;
                                                }
				   };
	sim.rv.behaviors["SUBU"] = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) >>> 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) >>> 0 ;
						   var result = a - b ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = 0 ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) >>> 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) >>> 0 ;
						   var result = a - b ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU SUBU with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (SUBU). " ;
                                                }
				   };
	sim.rv.behaviors["MULU"] = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) >>> 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) >>> 0 ;
						   var result = a * b ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = 0 ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) >>> 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) >>> 0 ;
						   var result = a * b ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU MULU with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (MULU). " ;
                                                }
				   };
	sim.rv.behaviors["DIVU"] = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) >>> 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) >>> 0 ;

						   if (0 == b) {
						       set_value(sim.rv.states[s_expr[1]], 0) ;

						       sim.rv.internal_states.alu_flags.flag_n = 0 ;
						       sim.rv.internal_states.alu_flags.flag_z = 1 ;
						       // sim.rv.internal_states.alu_flags.flag_v = 1 ;
						       // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                       return ;
                                                   }

				                   var result = Math.floor(a / b) ;
				                   set_value(sim.rv.states[s_expr[1]], result) ;
						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						   // sim.rv.internal_states.alu_flags.flag_v = 0 ;
						   // sim.rv.internal_states.alu_flags.flag_c = 0 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) >>> 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) >>> 0 ;

						   if (0 == b) {
                                                       return "ALU DIVU zero by zero (oops!). " ;
						   }

				                   var result = Math.floor(a / b) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU DIVU with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (DIVU). " ;
                                                }
				   };
	sim.rv.behaviors["FADD"] = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) ;

						   var result = hex2float(a) + hex2float(b) ;

						   set_value(sim.rv.states[s_expr[1]], float32_to_uint(result)) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0.0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0.0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = 0 ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) ;

						   var result = hex2float(a) + hex2float(b) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU FADD with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (FADD). " ;
                                                }
				   };
	sim.rv.behaviors["FSUB"] = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) ;

						   var result = hex2float(a) - hex2float(b) ;

						   set_value(sim.rv.states[s_expr[1]], float32_to_uint(result)) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0.0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0.0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = 0 ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) ;

						   var result = hex2float(a) - hex2float(b) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU FSUB with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (FSUB). " ;
                                                }
				   };
	sim.rv.behaviors["FMUL"] = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) ;

						   var result = hex2float(a) * hex2float(b) ;

						   set_value(sim.rv.states[s_expr[1]], float32_to_uint(result)) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0.0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0.0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = 0 ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) ;

						   var result = hex2float(a) * hex2float(b) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU FMUL with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (FMUL). " ;
                                                }
				   };
	sim.rv.behaviors["FDIV"] = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) ;

						   var result = hex2float(a) / hex2float(b) ; // TODO

						   set_value(sim.rv.states[s_expr[1]], float32_to_uint(result)) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0.0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0.0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = 0 ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) ;

						   var result = hex2float(a) - hex2float(b) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU FDIV with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (FDIV). " ;
                                                }
				   };
	sim.rv.behaviors["FCVT"] = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) >>> 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) ;

						   var result = a ;
						   switch (b)
						   {
						     case 1:
						       result =  hex2float(result) ;
						       result = Math.trunc(result) ;
						       break;

						     case 2:
						       result =  hex2float(result) ;
						       result = Math.round(result) ;
						       break;

						     case 4:
						       result = result.toFixed(5) ;
						       result =    parseFloat(result) ;
						       result = float2decimal(result) ;
						       break;

						     default:
						       break;
						   }

						   set_value(sim.rv.states[s_expr[1]], result) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = 0 ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) >>> 0 ;
                                                   var b = get_value(sim.rv.states[s_expr[3]]) ;

						   var result = a ;
						   switch (b)
						   {
						     case 1:
						       result =  hex2float(result) ;
						       result = Math.trunc(result) ;
						       break;

						     case 2:
						       result =  hex2float(result) ;
						       result = Math.round(result) ;
						       break;

						     case 4:
						       result = result.toFixed(5) ;
						       result =    parseFloat(result) ;
						       result = float2decimal(result) ;
						       break;

						     default:
						       break;
						   }

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU FCVT with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (FCVT). " ;
                                                }
				   };
	sim.rv.behaviors["FCLASS"] = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) >>> 0 ;

						   // get float type
						   var result = float_class(a) ;

						   set_value(sim.rv.states[s_expr[1]], result) ;

						   sim.rv.internal_states.alu_flags.flag_n = (result  < 0) ? 1 : 0 ;
						   sim.rv.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0 ;
						 //   sim.rv.internal_states.alu_flags.flag_c = 0 ;
       //
						 //   sim.rv.internal_states.alu_flags.flag_v = 0 ;
						 //   if ( (result < 0) && (a >= 0) && (b >= 0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
						 //   if ( (result >= 0) && (a <  0) && (b <  0) )
							// sim.rv.internal_states.alu_flags.flag_v = 1 ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[1]]) >>> 0 ;

						   // get float type
						   var result = float_class(a) ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "ALU FCLASS with result " + show_value(result) + ". " ;
                                                   }

                                                   return "ALU output = " + show_value(result) + " (FCLASS). " ;
                                                }
				   };
	sim.rv.behaviors["PLUS1"]    = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
						   var result = a + 1 ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
						   var result = a + 1 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Copy to " + show_verbal(s_expr[1]) + " " +
                                                              show_verbal(s_expr[2]) + " plus one with result " +
                                                              show_value(result) + ". " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " +
                                                          show_verbal(s_expr[2]) + " + 1" +
                                                          " (" + show_value(result) + "). " ;
                                                }
				   };
	sim.rv.behaviors["PLUS4"]    = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
						   var result = a + 4 ;
						   set_value(sim.rv.states[s_expr[1]], result >>> 0) ;
                                                },
                                        verbal: function (s_expr)
                                                {
						   var a = get_value(sim.rv.states[s_expr[2]]) << 0 ;
						   var result = a + 4 ;

                                                   var verbose = get_cfg('verbal_verbose') ;
                                                   if (verbose !== 'math') {
                                                       return "Copy to " + show_verbal(s_expr[1]) + " " +
                                                             show_verbal(s_expr[2]) + " plus four with result " +
                                                             show_value(result) + ". " ;
                                                   }

                                                   return show_verbal(s_expr[1]) + " = " +
                                                          show_verbal(s_expr[2]) + " + 4" +
                                                          " (" + show_value(result) + "). " ;
                                                }
				   };
	sim.rv.behaviors["SET_TT"] = { nparameters: 3,
				     types: ["E", "I"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[1]]) << 0 ;
                                                   var b = parseInt(s_expr[2]) ;
                                                   var m = Math.pow(2, b) ;
                                                   var r = a | m ;
						   set_value(sim.rv.states[s_expr[1]], r) ;
						   update_cpu_bus_fire(r, b) ;
                                                },
                                        verbal: function (s_expr)
                                                {
                                                   return "" ;
                                                }
				   };
	sim.rv.behaviors["RST_TT"] = { nparameters: 3,
				     types: ["E", "I"],
				     operation: function(s_expr)
		                                {
						   var a = get_value(sim.rv.states[s_expr[1]]) << 0 ;
                                                   var b = parseInt(s_expr[2]) ;
                                                   var m = Math.pow(2, b) ;
                                                   var r = a & ~m ;
						   set_value(sim.rv.states[s_expr[1]], r) ;
						   update_cpu_bus_fire(r, b) ;
                                                },
                                        verbal: function (s_expr)
                                                {
                                                   return "" ;
                                                }
				   };
	//COMPROBAR POR TD
	sim.rv.behaviors["CHECK_RTD"] = { nparameters: 1,
				     operation: function(s_expr)
		                                {
								//CONSULTAR
				                // var number_active_tri = parseInt(simhw_sim_signal("TD").value) +
         							    //     parseInt(simhw_sim_signal("R").value) ;
        				        //     update_system_bus_fire(number_active_tri) ;
                                                },
                                        verbal: function (s_expr)
                                                {
                                                   return "" ;
                                                }
				   };
	sim.rv.behaviors["MBIT"]     = { nparameters: 5,
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
	sim.rv.behaviors["MBIT_SN"]  = { nparameters: 5,
				     types: ["S", "E", "E", "I"],
				     operation: function (s_expr)
		                                {
						   var base = 0;
						   var r = s_expr[3].split('/');
						   if (1 == r.length)
							base = get_value(sim.rv.states[s_expr[3]]);
						   else
						   if (typeof  sim.rv.states[r[0]].value[r[1]] != "undefined")
							base = sim.rv.states[r[0]].value[r[1]];
                                                   // begin: REG_MICROINS/xxx by default is the default_value
					      else if (typeof   sim.rv.signals[r[1]].default_value != "undefined")
						        base =  sim.rv.signals[r[1]].default_value;
					      else if (typeof   sim.rv.states[r[1]].default_value != "undefined")
						        base =  sim.rv.states[r[1]].default_value;
                                                   // end: REG_MICROINS/xxx by default is the default_value
						   else ws_alert('WARN: undefined state/field pair -> ' + r[0] + '/' + r[1]);

						   var offset = parseInt(s_expr[4]) ;

						   var n1 = get_value(sim.rv.states[s_expr[2]]).toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1 ;
						   var n3 = n2.substr(31 - (base + offset - 1), offset) ;

						   set_value( sim.rv.signals[s_expr[1]], parseInt(n3, 2));
                                                },
                                        verbal: function (s_expr)
                                                {
						   // value
						   var base = 0;
						   var r = s_expr[3].split('/');
						   if (1 == r.length)
							base = get_value(sim.rv.states[s_expr[3]]);
						   else
						   if (typeof  sim.rv.states[r[0]].value[r[1]] != "undefined")
							base = sim.rv.states[r[0]].value[r[1]];
                                                   // begin: REG_MICROINS/xxx by default is the default_value
					      else if (typeof   sim.rv.signals[r[1]].default_value != "undefined")
						        base =  sim.rv.signals[r[1]].default_value;
					      else if (typeof   sim.rv.states[r[1]].default_value != "undefined")
						        base =  sim.rv.states[r[1]].default_value;
                                                   // end: REG_MICROINS/xxx by default is the default_value
						   else ws_alert('WARN: undefined state/field pair -> ' + r[0] + '/' + r[1]);

						   var offset = parseInt(s_expr[4]) ;

						   var n1 = get_value(sim.rv.states[s_expr[2]]).toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1 ;
						   var n3 = n2.substr(31 - (base + offset - 1), offset) ;

						   // name
					           var from_elto = "" ;
						   if (1 == r.length)
                                                        from_elto = show_verbal(s_expr[3]) ;
						   else from_elto = show_verbal(s_expr[2]) + "[" + r[1] + "] " ;

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
	sim.rv.behaviors["SBIT_SIGNAL"] = { nparameters: 4,
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
	sim.rv.behaviors["UPDATE_FLAG"] = { nparameters: 4,
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
	sim.rv.behaviors["MBITS"]    = { nparameters: 8,
				     types: ["E", "I", "E", "S", "S", "I", "S"],
				     operation: function(s_expr)
						{
						   var offset = parseInt(sim.rv.signals[s_expr[4]].value) ;
						   var size   = parseInt(sim.rv.signals[s_expr[5]].value) ;

						   var n1 = get_value(sim.rv.states[s_expr[3]]).toString(2); // to binary
						   var n2 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1) ;
						       n2 = n2.substr(31 - (offset + size - 1), size);

						   var n3 =  "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
						   if ( ("1" ==  sim.rv.signals[s_expr[7]].value) && ("1" == n2.substr(0, 1)))
                                                   {    // check signed-extension
							n3 = "11111111111111111111111111111111".substring(0, 32 - n2.length) + n2;
						   }

						   set_value(sim.rv.states[s_expr[1]], parseInt(n3, 2));
                                                },
                                        verbal: function (s_expr)
                                                {
						   var offset = parseInt(sim.rv.signals[s_expr[4]].value) ;
						   var size   = parseInt(sim.rv.signals[s_expr[5]].value) ;

						   var n1 = get_value(sim.rv.states[s_expr[3]]).toString(2); // to binary
						   var n2 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1) ;
						       n2 = n2.substr(31 - (offset + size - 1), size);

						   var n3 =  "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
						   if ( ("1" ==  sim.rv.signals[s_expr[7]].value) && ("1" == n2.substr(0, 1)))
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

	sim.rv.behaviors["BSEL"] =  { nparameters: 6,
				     types: ["E", "I", "I", "E", "I"],
				     operation: function (s_expr)
		                                {
						   var posd = parseInt(s_expr[2]) ;
						   var poso = parseInt(s_expr[5]) ;
						   var len  = parseInt(s_expr[3]) ;

						   var n1 = get_value(sim.rv.states[s_expr[4]]).toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1 ;
						       n2 = n2.substr(31 - (poso + len) + 1, len);
						   var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
						   var n4 = "00000000000000000000000000000000".substr(0, posd);
						   n3 = n3 + n4;

						   set_value(sim.rv.states[s_expr[1]], parseInt(n3, 2));
                                                },
                                        verbal: function (s_expr)
                                                {
						   var posd = parseInt(s_expr[2]) ;
						   var len  = parseInt(s_expr[3]) ;
						   var poso = parseInt(s_expr[5]) ;

						   var n1 = get_value(sim.rv.states[s_expr[4]]).toString(2); // to binary
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
	sim.rv.behaviors["EXT_SIG"] =  { nparameters: 3,
				     types: ["E", "I"],
				     operation: function (s_expr)
		                                {
						   var n1 = get_value(sim.rv.states[s_expr[1]]).toString(2); // to binary
						   var n2 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1) ;
						   var n3 = n2.substr(31 - s_expr[2], 31);
						   var n4 = n3;
						   if ("1" == n2[31 - s_expr[2]]) {  // check signed-extension
						       n4 = "11111111111111111111111111111111".substring(0, 32 - n3.length) + n4;
						   }

						   set_value(sim.rv.states[s_expr[1]], parseInt(n4, 2));
                                                },
                                        verbal: function (s_expr)
                                                {
						   var n1 = get_value(sim.rv.states[s_expr[1]]).toString(2); // to binary
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
	sim.rv.behaviors["MOVE_BITS"] =  { nparameters: 5,
				     types: ["S", "I", "I","S"],
				     operation: function (s_expr)
		                                {
						   var posd = parseInt(s_expr[2]) ;
						   var poso = 0 ;
						   var len  = parseInt(s_expr[3]) ;

						   var n1 =  sim.rv.signals[s_expr[4]].value.toString(2); // to binary signal origin
						   n1 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1);
						   n1 = n1.substr(31 - poso - len + 1, len);

						   var n2 =  sim.rv.signals[s_expr[1]].value.toString(2); // to binary signal destiny
						   n2 = ("00000000000000000000000000000000".substring(0, 32 - n2.length) + n2) ;
						   var m1 = n2.substr(0, 32 - (posd + len));
						   var m2 = n2.substr(31 - posd + 1, posd);
						   var n3 = m1 + n1 + m2;

						   set_value( sim.rv.signals[s_expr[1]], parseInt(n3, 2));
                                                },
                                        verbal: function (s_expr)
                                                {
                                                   return "" ;
                                                }
				   };
	sim.rv.behaviors["MOVE_BITSE"] = {
					  nparameters: 6,
				    types: ["S", "I", "I", "E", "I"],
				    operation: function (s_expr)
		                               {
						   var posd = parseInt(s_expr[2]) ;
						   var poso = parseInt(s_expr[5]) ;
						   var len  = parseInt(s_expr[3]) ;

						   var n1 =  get_value(sim.rv.states[s_expr[4]]).toString(2); // to state signal origin
						   n1 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1);
						   n1 = n1.substr(31 - poso - len + 1, len);

						   var n2 =  sim.rv.signals[s_expr[1]].value.toString(2); // to binary signal destiny
						   n2 = ("00000000000000000000000000000000".substring(0, 32 - n2.length) + n2);
						   var m1 = n2.substr(0, 32 - (posd + len));
						   var m2 = n2.substr(31 - posd + 1, posd);
						   var n3 = m1 + n1 + m2;

						   set_value( sim.rv.signals[s_expr[1]], parseInt(n3, 2));
                                                },
                                        verbal: function (s_expr)
                                                {
                                                   return "" ;
                                                }
				  };

	sim.rv.behaviors["READ_IM"]    = { nparameters: 1,
				     operation: function(s_expr)
						{
							var address = get_value(sim.rv.states['REG_PC']);
							var clk     = get_value(sim.rv.states['CLK']) ;

							var remain = get_value(sim.rv.internal_states.MP_wc);
						      if (
                                                           (typeof sim.rv.events.mem[clk-1] != "undefined") &&
						           (sim.rv.events.mem[clk-1] > 0)
                                                         ) {
						              remain = sim.rv.events.mem[clk-1] - 1;
                                                           }
						      var first_time = typeof sim.rv.events.mem[clk] == "undefined" ;
						      sim.rv.events.mem[clk] = remain;
                                                      if (remain > 0) {
                                                          return;
                                                      }

                                                      address = address & 0xFFFFFFFC;
                                                      var value = main_memory_getvalue(sim.rv.internal_states.MP,
                                                                                       address) ;
                                                      var full_redraw = false ;
                                                      if (typeof value === "undefined") {
                                                          value = 0 ;
                                                          full_redraw = true ;
               					      }
							show_main_memory(sim.rv.internal_states.MP, address, full_redraw, false) ;
							// cache
							if (first_time && (sim.rv.internal_states.CM.length > 0)) {
                                                          cache_memory_access(sim.rv.internal_states.CM[0], address, "read", clk) ;
                                                      }

							var ins = main_memory_getvalue(sim.rv.internal_states.MP, address) ;
							if (typeof ins === "undefined")
								ins = 0 ;
							set_value(sim.rv.states['RDATA'], ins);
                                                   },
                                           verbal: function (s_expr)
                                                   {
							var verbal = "" ;

							var address = get_value(sim.rv.states['REG_PC']);

							var value = main_memory_getvalue(sim.rv.internal_states.MP, address) ;

							if (typeof value === "undefined")
								value = 0 ;

							var verbose = get_cfg('verbal_verbose') ;
							if (verbose !== 'math') {
								verbal = "Try to read an instruction from Instruction Memory " +
										"at address 0x"  + address.toString(16) + " with value 0x" + value.toString(16) + ". " ;
							}

							verbal = "Memory output = 0x" + value.toString(16) +
										" (Read an instruction from Instruction Memory" +
										" at address 0x" + address.toString(16)  + "). " ;

							return verbal ;
												   }
				   };

	sim.rv.behaviors["DECO"]    = { nparameters: 1,
				     operation: function(s_expr)
						{

						    sim.rv.states['INEX'].value = 0 ;

						    // 1.- IR -> oi
						    var oi = decode_instruction(sim.rv.internal_states.FIRMWARE,
                                                                                sim.rv.ctrl_states.ir,
						                                get_value(sim.rv.states['REG_IR'])) ;
						    if (null == oi.oinstruction)
                                                    {
                                                         ws_alert('ERROR: undefined instruction code in IR (' +
							          'co:'  +  oi.op_code.toString(2) + ', ' +
							          'cop:' + oi.cop_code.toString(2) + ')') ;
							 sim.rv.states['ROM_MUXA'].value = 0 ;
							 sim.rv.states['INEX'].value = 1 ;
							 return -1;
						    }

						    // 2.- oi.oinstruction -> rom_addr
                                                    var rom_addr = oi.op_code << 6;
						    if (typeof oi.oinstruction.cop != "undefined") {
                                                        rom_addr = rom_addr + oi.cop_code ;
						    }

						    // 2.- ! sim.rv.internal_states['ROM'][rom_addr] -> error
						    if (typeof sim.rv.internal_states['ROM'][rom_addr] == "undefined")
						    {
							 ws_alert('ERROR: undefined rom address ' + rom_addr +
                                                                  ' in firmware') ;
							 sim.rv.states['ROM_MUXA'].value = 0 ;
							 return -1;
						    }

						    // 3.- sim.rv.internal_states['ROM'][rom_addr] -> mc-start -> ROM_MUXA
						    sim.rv.states['ROM_MUXA'].value = sim.rv.internal_states['ROM'][rom_addr] ;

						    // 4.-  Statistics
						    var val = get_value(sim.rv.states['DECO_INS']) ;
						    set_value(sim.rv.states["DECO_INS"], val + 1);

                                                    // 5.- Update UI
						    var pc = get_value(sim.rv.states['REG_PC']) - 4 ;
                                                    var decins = get_deco_from_pc(pc) ;
						    set_value(sim.rv.states['REG_IR_DECO'], decins) ;
                                                    show_dbg_ir(get_value(sim.rv.states['REG_IR_DECO']));
                                                },
                                        verbal: function (s_expr)
                                                {
                                                   return "Decode instruction. " ;
                                                }
				   };

		sim.rv.behaviors["FIRE"] = { nparameters: 2,
					       types: ["S"],
					   operation: function (s_expr)
							{
							    // 0.- avoid loops
							    if (sim.rv.internal_states.fire_stack.indexOf(s_expr[1]) != -1) {
								return ;
							    }

							    sim.rv.internal_states.fire_stack.push(s_expr[1]) ;

							    // 1.- update draw
							    update_draw(sim.rv.signals[s_expr[1]], sim.rv.signals[s_expr[1]].value) ;

							    // 2.- for Level signals, propage it
							    if ("L" ==  sim.rv.signals[s_expr[1]].type)
							    {
								update_state(s_expr[1]) ;
							    }

							    sim.rv.internal_states.fire_stack.pop(s_expr[1]) ;
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "" ;
                                                        }
					   };

		sim.rv.behaviors["FIRE_IFSET"] = { nparameters: 3,
					     types: ["S", "I"],
					     operation: function (s_expr)
							{
                                                            if (get_value( sim.rv.signals[s_expr[1]]) != parseInt(s_expr[2])) {
                                                                return ;
                                                            }

                                                            sim.rv.behaviors["FIRE"].operation(s_expr) ;
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "" ;
                                                        }
					   };

		sim.rv.behaviors["FIRE_IFCHANGED"] = { nparameters: 3,
					     types: ["S", "X"],
					     operation: function (s_expr)
							{
						            sim_elto = get_reference(s_expr[2]) ;
							    if (sim_elto.changed == false) {
								return ;
                                                            }

							    sim.rv.behaviors["FIRE"].operation(s_expr) ;
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "" ;
                                                        }
					   };

		sim.rv.behaviors["RESET_CHANGED"] = { nparameters: 2,
					     types: ["X"],
					     operation: function (s_expr)
							{
						            sim_elto = get_reference(s_expr[1]) ;
							    sim_elto.changed = false ; // Disable by Default
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "" ;
                                                        }
					   };

		sim.rv.behaviors["CLOCK"] = { nparameters: 1,
					     operation: function(s_expr)
							{
                                                            var new_maddr = null ;
                                                            var mcelto    = null ;

						            // measure time (1/2)
					                    var t0 = performance.now() ;

							    // 1.- Update counter
							    var val = get_value(sim.rv.states["CLK"]) ;
							    set_value(sim.rv.states["CLK"], val + 1);
						            set_value(sim.rv.states["TTCPU"], 0) ;

                                                            // 2.- To treat the (Falling) Edge signals
                                                           new_maddr = get_value(sim.rv.states["REG_MICROADDR"]);
                                                            mcelto = sim.rv.internal_states['MC'][new_maddr];
                                                            if ( (typeof mcelto !== "undefined") &&
                                                                 (false == mcelto.is_native) )
                                                            {
                                                                for (var i=0; i<jit_fire_order.length; i++) {
                                                                     fn_updateE_now(jit_fire_order[i]) ;
                                                                }
                                                            }

                                                            // 3.- The (Falling) Edge part of the Control Unit...
                                                          new_maddr = get_value(sim.rv.states["MUXA_MICROADDR"]);
                                                            set_value(sim.rv.states["REG_MICROADDR"], new_maddr);
                                                            mcelto = sim.rv.internal_states['MC'][new_maddr];
                                                            if (typeof mcelto === "undefined")
                                                            {
                                                                mcelto = {
                                                              value: sim.rv.states["REG_MICROINS"].default_value,
                                                                            is_native: false
                                                                         } ;
                                                            }
                                                            var new_mins = Object.create(get_value(mcelto));
                                                            sim.rv.states["REG_MICROINS"].value = new_mins;

                                                            // 4.- update signals
							    for (var key in sim.rv.signals)
							    {
								 if (typeof new_mins[key] != "undefined")
								      set_value(sim.rv.signals[key],   new_mins[key]);
								 else set_value(sim.rv.signals[key], sim.rv.signals[key].default_value);
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
							    var val = get_value(sim.rv.states["ACC_TIME"]) ;
                                                                val = val + (t1-t0) ;
							    set_value(sim.rv.states["ACC_TIME"], val);

						            // update power consumption
							    val = Math.trunc(16*val) ;
							    set_value(sim.rv.states["ACC_PWR"], val);
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "" ;
                                                        }
					   };

		sim.rv.behaviors["CPU_RESET"] = { nparameters: 1,
					     operation: function(s_expr)
							{
							    // set states/signals to the default state
							    for (var key in sim.rv.states) {
								 reset_value(sim.rv.states[key]) ;
                                                            }
							    for (var key in  sim.rv.signals) {
								 reset_value(sim.rv.signals[key]) ;
                                                            }
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "Reset CPU. " ;
                                                        }
					   };

	sim.rv.behaviors["UPDATEDPC"]     = { nparameters: 1,
				            operation: function(s_expr)
							{
                                                            show_asmdbg_pc();
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "" ;
                                                        }
					   };
	sim.rv.behaviors["UPDATEDPC_J"]     = { nparameters: 1,
				            operation: function(s_expr)
							{
								if (!(get_value(sim.rv.states["FLAG_N"]) || get_value(sim.rv.states["FLAG_Z"]))) {
									return ;
								}
                                                            show_asmdbg_pc();
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "" ;
                                                        }
					   };

	sim.rv.behaviors["UPDATE_NZ"]   = { nparameters: 1,
				            operation: function(s_expr)
							{
							   set_value(simhw_sim_state("FLAG_N"),
								     sim.rv.internal_states.alu_flags.flag_n);
							   set_value(simhw_sim_state("FLAG_Z"),
								     sim.rv.internal_states.alu_flags.flag_z);

							   set_value(simhw_sim_signal("TEST_N"),
								     sim.rv.internal_states.alu_flags.flag_n);
							   set_value(simhw_sim_signal("TEST_Z"),
								     sim.rv.internal_states.alu_flags.flag_z);

							   update_draw(sim.rv.signals["TEST_N"], sim.rv.signals["TEST_N"].value) ;
							   update_draw(sim.rv.signals["TEST_Z"], sim.rv.signals["TEST_Z"].value) ;
                                                        },
                                                verbal: function (s_expr)
                                                        {
                                                           return "Update flags N-Z." ;
/*
								  sim.rv.internal_states.alu_flags.flag_n + " " +
								  sim.rv.internal_states.alu_flags.flag_z + " " +
*/
                                                        }
					   };


        /*
         *  Model
	 * (Thanks to Juan Francisco Perez Carrasco for collaborating in the design of the following elements)
	 */

		// CPU - Multiplexors

		sim.rv.elements.cpu_mux_1  = {
			      name:              "MUX 1",
			      description:       "MUX 1",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0": {
							      ref:  "BW"
							    },
						   "mux_1": {
							      ref:  "ZN"
							    },
						   "mux_o": {
							      ref:  "W_DATA"
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

		sim.rv.elements.cpu_mux_2  = {
			      name:              "MUX 2",
			      description:       "MUX 2",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0": {
							      ref:  "PC"
							    },
						   "mux_1": {
							      ref:  "R_DATA1"
							    },
						   "mux_o": {
							      ref:  "M2_ALU"
							    }
						 },
			      signals:           {
						   "m2":    {
							      ref:  "M2"
							    }
						 },
			      states_inputs:     [ "mux_0", "mux_1" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "m2" ],
			      signals_output:    [ ]
	                   } ;

		sim.rv.elements.cpu_mux_3  = {
			      name:              "MUX 3",
			      description:       "MUX 3",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0": {
							      ref:  "R_DATA2"
							    },
						   "mux_1": {
							      ref:  "VAL_FOUR"
							    },
							"mux_2": {
							      ref:  "VAL_IMM"
							    },
						   "mux_o": {
							      ref:  "M3_ALU"
							    }
						 },
			      signals:           {
						   "m3":    {
							      ref:  "M3"
							    }
						 },
			      states_inputs:     [ "mux_0", "mux_1", "mux_2" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "m3" ],
			      signals_output:    [ ]
	                   } ;

		sim.rv.elements.cpu_mux_4  = {
			      name:              "MUX 4",
			      description:       "MUX 4",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "mux_0": {
							      ref:  "WOUT"
							    },
						   "mux_1": {
							      ref:  "ALU_WOUT"
							    },
						   "mux_o": {
							      ref:  "REG_PC"
							    }
						 },
			      signals:           {
						   "m4":    {
							      ref:  "M4"
							    }
						 },
			      states_inputs:     [ "mux_0", "mux_1" ],
			      states_outputs:    [ "mux_o" ],
			      signals_inputs:    [ "m4" ],
			      signals_output:    [ ]
	                   } ;

        // CPU - Registers

        sim.rv.elements.pc = {
			      name:              "PC",
			      description:       "Programm Counter",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":     {
							       ref:  "N_OR_Z_AND_JUMP_PCWRITE"
							     },
						   "out":    {
							       ref:  "REG_PC"
							     }
						 },
			      signals:           {
						   "ctl":    {
							       ref:  "PCWRITE"
							     }
						 },
			      states_inputs:     [ "in" ],
			      states_outputs:    [ "out" ],
			      signals_inputs:    [ "ctl" ],
			      signals_output:    [ ]
	               } ;

        sim.rv.elements.ir = {
			      name:              "IR",
			      description:       "Instruction Register",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "in":     {
							       ref:  "RDATA"
							     },
						   "out":    {
							       ref:  "REG_IR"
							     },
							"imm":   {
							       ref:  "VAL_IMM"
							     }
						 },
			      signals:           {
						   "IRWRITE":     {
							       ref:  "IRWRITE"
							     }
						 },
			      states_inputs:     [ "in" ],
			      states_outputs:    [ "out", "imm" ],
			      signals_inputs:    [ "IRWRITE" ],
			      signals_output:    [ ]
	               } ;

        sim.rv.elements.sr = {
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

        sim.rv.elements.register_file = {
			      name:              "RF",
			      description:       "Register File",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "ir[19:15]":     {
							       ref:  "REG_R1"
							    },
						   "ir[24:20]":     {
							       ref:  "REG_R2"
							    },
						   "ir[11:7]":     {
							       ref:  "REG_W2"
							    },
						   "w_data":     {
							       ref:  "W_DATA"
								},
						   "r_data1":     {
							       ref:  "R_DATA1"
							    },
						   "r_data2":     {
							       ref:  "R_DATA2"
							    }
						 },
			      signals:           {
						   "rw":    {
							       ref:  "RW"
							    }
						 },
			      states_inputs:     [ "ir[19:15]", "ir[24:20]", "ir[11:7]", "w_data" ],
			      states_outputs:    [ "r_data1", "r_data2" ],
			      signals_inputs:    [ "rw"],
			      signals_output:    [ ]
	               } ;

        // CPU - ALU

        sim.rv.elements.cpu_alu = {
			      name:              "ALU",
			      description:       "Arithmetic-Logit Unit",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "a":     {
							       ref:  "M2_ALU"
							    },
						   "b":     {
							       ref:  "M3_ALU"
							    },
						   "alu":   {
							       ref:  "ALU_WOUT"
							    },
						   "flags": {
							       ref:  "ZN"
							    }
						 },
			      signals:           {
						   "cop":   {
							       ref:  "ALUOP"
							    }
						 },
			      states_inputs:     [ "a", "b" ],
			      states_outputs:    [ "alu", "flags" ],
			      signals_inputs:    [ "cop" ],
			      signals_output:    [ ]
	                } ;

        // CPU - Selectors

        sim.rv.elements.byte_selector = {
			      name:              "Byte Selector",
			      description:       "Main memory byte selector",
			      type:              "subcomponent",
			      belongs:           "CPU",
			      states:            {
						   "from_mbr":  {
								  ref:  "REG_MBR"
								},
						   "from_data": {
								  ref:  "DM_BS"
								},
						   "be":        {
								  ref:  "BE"
								},
						   "to_mbr":    {
								  ref:  "BS_M1"
								},
						   "to_td":     {
								  ref:  "BS_BS"
								}
						 },
			      signals:           {
						   "w":         {
								  ref:  "W"
								},
						   "se":        {
								  ref:  "SE"
								},
						   "a1a0":      {
								  ref:  "A1A0"
								},
						   "bw":        {
								  ref:  "BW"
								}
						 },
			      states_inputs:     [ "from_mbr", "from_data" ],
			      states_outputs:    [ "be", "to_mbr", "to_td" ],
			      signals_inputs:    [ "w", "se", "a1a0", "bw" ],
			      signals_output:    [ ]
	                   } ;
