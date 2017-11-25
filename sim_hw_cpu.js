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
	 *  CPU
	 */

        sim_components["CPU"] = {
		                  name: "CPU", 
		                  version: "1", 
		                  write_state:  function ( vec ) {
                                                  if (typeof vec.CPU == "undefined")
                                                      vec.CPU = new Object() ;

					          // var internal_reg = ["PC", "MAR", "MBR", "IR", "RT1", "RT1", "RT2", "RT3", "SR"] ;
					          var internal_reg = ["PC", "SR"] ;

						  var value = 0 ;
					          for (var i=0; i<sim_states['BR'].length; i++)
						  {
						      value = parseInt(sim_states['BR'][i].value) ;
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
						      value = parseInt(sim_states['REG_' + internal_reg[i]].value) ;
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
                                                      vec.CPU = new Object() ;

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
					          if (typeof sim_states['REG_' + r_reg] != "undefined") {
					              return "0x" + get_value(sim_states['REG_' + r_reg]).toString(16) ;
					          }

					              r_reg = r_reg.replace('R','') ;
					          var index = parseInt(r_reg) ;
					          if (typeof sim_states['BR'][index] != "undefined") {
					              return "0x" + get_value(sim_states['BR'][index]).toString(16) ;
					          }

					          return null ;
				              }
                            	};

	/*
	 *  States - Memories
	 */

	var MC           = new Object();
	var MC_dashboard = new Object();
	var ROM          = new Object();
	var FIRMWARE     = new Object();


	/*
	 *  States
	 */

	/* REGISTER FILE STATES */
	sim_states["BR"] = new Array() ;
	sim_states["BR"][0]          = {name:"R0",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][1]          = {name:"R1",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][2]          = {name:"R2",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][3]          = {name:"R3",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][4]          = {name:"R4",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][5]          = {name:"R5",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][6]          = {name:"R6",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][7]          = {name:"R7",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][8]          = {name:"R8",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][9]          = {name:"R9",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][10]         = {name:"R10",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][11]         = {name:"R11",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][12]         = {name:"R12",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][13]         = {name:"R13",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][14]         = {name:"R14",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][15]         = {name:"R15",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][16]         = {name:"R16",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][17]         = {name:"R17",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][18]         = {name:"R18",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][19]         = {name:"R19",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][20]         = {name:"R20",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][21]         = {name:"R21",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][22]         = {name:"R22",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][23]         = {name:"R23",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][24]         = {name:"R24",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][25]         = {name:"R25",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][26]         = {name:"R26",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][27]         = {name:"R27",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][28]         = {name:"R28",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][29]         = {name:"R29",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][30]         = {name:"R30",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BR"][31]         = {name:"R31",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };

	sim_states["REG_PC"]         = {name:"PC",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_MAR"]        = {name:"MAR",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_MBR"]        = {name:"MBR",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_IR"]         = {name:"IR",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_RT1"]        = {name:"RT1",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_RT2"]        = {name:"RT2",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_RT3"]        = {name:"RT3",              visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_SR"]         = {name:"SR",               visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };

	/* BUSES */
	sim_states["BUS_IB"]         = {name:"I_BUS",            visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BUS_AB"]         = {name:"A_BUS",            visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BUS_CB"]         = {name:"C_BUS",            visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BUS_DB"]         = {name:"D_BUS",            visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };

	/* REGISTER PC (RELATED) STATES */
	sim_states["C2_T2"]          = {name: "C2_T2",           visible:false, nbits: "32", value:0, default_value:0, draw_data: [] };

	/* REGISTER FILE (RELATED) STATES */
	sim_states["RA_T9"]          = {name: "RA_T9",           visible:false, nbits: "32", value:0, default_value:0, draw_data: [] };
	sim_states["RB_T10"]         = {name: "RB_T10",          visible:false, nbits: "32", value:0, default_value:0, draw_data: [] };

	/* (RELATED) SELEC STATES */
	sim_states["SELEC_T3"]       = { name: "SELEC_T3",       visible:false, nbits: "32", value:0, default_value:0, draw_data: [] };
	sim_states["SELP_M7"]        = { name: "SELP_M7",        visible:false, nbits: "32", value:0, default_value:0, draw_data: [] };

	sim_states["SUM4_M2"]        = {name:"SUM4_M2",          visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["ALU_C6"]         = {name:"ALU_C6",           visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["MA_ALU"]         = {name:"MA_ALU",           visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["MB_ALU"]         = {name:"MB_ALU",           visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };

	sim_states["FLAG_C"]         = { name: "FLAG_C",         visible:true, nbits: "1", value:0, default_value:0, draw_data: [] };
	sim_states["FLAG_V"]         = { name: "FLAG_V",         visible:true, nbits: "1", value:0, default_value:0, draw_data: [] };
	sim_states["FLAG_N"]         = { name: "FLAG_N",         visible:true, nbits: "1", value:0, default_value:0, draw_data: [] };
	sim_states["FLAG_Z"]         = { name: "FLAG_Z",         visible:true, nbits: "1", value:0, default_value:0, draw_data: [] };
	sim_states["FLAG_I"]         = { name: "FLAG_I",         visible:true, nbits: "1", value:0, default_value:0, draw_data: [] };
	sim_states["FLAG_U"]         = { name: "FLAG_U",         visible:true, nbits: "1", value:0, default_value:0, draw_data: [] };

	/* CONTROL UNIT */
	sim_states["REG_MICROADDR"]  = { name: "µADDR",          visible:true, nbits: "12", value:0,  default_value:0,  draw_data: ['svg_cu:text4667']};
	sim_states["REG_MICROINS"]   = { name: "µINS",           visible:true, nbits: "77", value:{}, default_value:{}, draw_data: [] };

	sim_states["FETCH"]          = { name: "FETCH",          visible:false, nbits: "12", value:0, default_value:0, draw_data: [] };
	sim_states["ROM_MUXA"]       = { name: "ROM_MUXA",       visible:false, nbits: "12", value:0, default_value:0, draw_data: [] };
	sim_states["SUM_ONE"]        = { name: "SUM_ONE",        visible:false, nbits: "12", value:1, default_value:1, draw_data: [] };
	sim_states["MUXA_MICROADDR"] = { name: "MUXA_MICROADDR", visible:false, nbits: "12", value:0, default_value:0, draw_data: [] };

	sim_states["MUXC_MUXB"]      = { name: "MUXC_MUXB",      visible:false, nbits: "1",  value:0, default_value:0, draw_data: [] };
	sim_states["INEX"]           = { name: "INEX",           visible:false, nbits: "1",  value:0, default_value:0, draw_data: [] };

	/* DEVICES AND MEMORY */
	sim_states["BS_M1"]          = { name: "BS_M1",          visible:false, nbits: "32", value:0, default_value:0, draw_data: [] };
	sim_states["BS_TD"]          = { name: "BS_TD",          visible:false, nbits: "32", value:0, default_value:0, draw_data: [] };

	sim_states["INTV"]           = { name: "INTV",           visible:false, nbits: "8",  value:0, default_value:0, draw_data: [] };


	/* MUX A (RELATED) STATES */
	sim_states["M2_C2"]          = { name:"M2_C2",           visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["M1_C1"]          = { name:"M1_C1",           visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["M7_C7"]          = { name:"M7_C7",           visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };

	sim_states["VAL_ZERO"]       = { name: "VAL_ZERO",       visible:false, nbits: "1",  value:0, default_value:0, draw_data: [] };
	sim_states["VAL_ONE"]        = { name: "VAL_ONE",        visible:false, nbits: "32", value:1, default_value:1, draw_data: [] };
	sim_states["VAL_FOUR"]       = { name: "VAL_FOUR",       visible:false, nbits: "32", value:4, default_value:4, draw_data: [] };

	/* VIRTUAL */
	sim_states["REG_IR_DECO"]    = {name:"IR_DECO",          visible:true,  nbits:"0",  value:0,  default_value:0, draw_data: [] };
	sim_states["DECO_INS"]       = {name:"DECO_INS",         visible:true,  nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["CLK"]            = {name:"CLK",              visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };


	/*
	 *  Signals
	 */

	/* CONTROL UNIT */
	sim_signals["C"]    = { name: "C",    visible: true, type: "L", value: 0, default_value: 0, nbits: "4",
				behavior: ["MV MUXC_MUXB VAL_ZERO; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB",
					   "MBIT MUXC_MUXB INT 0 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB",
					   "MBIT MUXC_MUXB IORDY 0 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB",
					   "MBIT MUXC_MUXB MRDY 0 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB",
					   "MBIT MUXC_MUXB REG_SR 0 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB",
					   "MBIT MUXC_MUXB REG_SR 1 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB",
					   "MBIT MUXC_MUXB REG_SR 28 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB",
					   "MBIT MUXC_MUXB REG_SR 29 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB",
					   "MBIT MUXC_MUXB REG_SR 30 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB",
					   "MBIT MUXC_MUXB REG_SR 31 1; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB",
					   "MV MUXC_MUXB INEX; FIRE_IFCHANGED B MUXC_MUXB; RESET_CHANGED MUXC_MUXB"],
				fire_name: ['svg_cu:text3410'],
				draw_data: [['svg_cu:path3108'],
					    ['svg_cu:path3062'],
					    ['svg_cu:path3060'],
					    ['svg_cu:path3136'],
					    ['svg_cu:path3482'],
					    ['svg_cu:path3480'],
					    ['svg_cu:path3488'],
					    ['svg_cu:path3486'],
					    ['svg_cu:path3484'],
					    ['svg_cu:path3484-9'],
					    ['svg_cu:path3108-3','svg_cu:path3260-3-8-6','svg_cu:path3260-3-8','svg_cu:path3260-3']],
				draw_name: [['svg_cu:path3496','svg_cu:path3414','svg_cu:path3194-08']] };
	sim_signals["B"]   = { name: "B", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["MV A1 MUXC_MUXB; FIRE A1",
					  "NOT_ES A1 MUXC_MUXB; FIRE A1"],
                               depends_on: ["CLK"],
			       fire_name: ['svg_cu:text3408'],
			       draw_data: [['svg_cu:path3094-7'],
					   ['svg_cu:path3392','svg_cu:path3372','svg_cu:path3390','svg_cu:path3384','svg_cu:path3108-1','svg_cu:path3100-8-7']],
			       draw_name: [[],['svg_cu:path3194-0','svg_cu:path3138-8','svg_cu:path3498-6']] };
	sim_signals["A0"] = { name: "A0", visible: false, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["SBIT A0A1 A0 1; FIRE A0A1",
					  "SBIT A0A1 A0 1; FIRE A0A1"],
                               depends_on: ["CLK"],
			       fire_name: ['svg_cu:text3406'],
			       draw_data: [['svg_cu:path3096'], ['svg_cu:path3096']],
			       draw_name: [[],['svg_cu:path3138-8-1','svg_cu:path3098-2','svg_cu:path3124-2-5']] };
	sim_signals["A1"] = { name: "A1", visible: false, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["SBIT A0A1 A1 0; FIRE A0A1",
					  "SBIT A0A1 A1 0; FIRE A0A1"],
                               depends_on: ["CLK"],
			       fire_name: [],
			       draw_data: [['svg_cu:path3094'], ['svg_cu:path3094']],
			       draw_name: [[]] };
	sim_signals["A0A1"] = { name: "A0A1", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
				behavior: ["ADD MUXA_MICROADDR REG_MICROADDR SUM_ONE",
					   "MV MUXA_MICROADDR REG_MICROINS/MADDR",
					   "MV MUXA_MICROADDR ROM_MUXA",
					   "MV MUXA_MICROADDR FETCH"],
                                depends_on: ["CLK"],
				fire_name: [],
				draw_data: [['svg_cu:path3102', 'svg_cu:path3100', 'svg_cu:path3098', 'svg_cu:path3100-9', 'svg_cu:path3088'],
					    ['svg_cu:path3104', 'svg_cu:path3134', 'svg_cu:path3500', 'svg_cu:path3416'],
					    ['svg_cu:path3504', 'svg_cu:path3100-8', 'svg_cu:path3234-9'],
					    ['svg_cu:path3124']],
				draw_name: [[]] };

	/* REGISTER LOAD */
	sim_signals["C0"] = { name: "C0", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV REG_MAR BUS_IB"],
			       fire_name: ['svg_p:text3077'],
			       draw_data: [['svg_p:path3081']],
			       draw_name: [['svg_p:path3075']] };
	sim_signals["C1"] = { name: "C1", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV REG_MBR M1_C1"],
			       fire_name: ['svg_p:text3079'],
			       draw_data: [['svg_p:path3055']],
			       draw_name: [['svg_p:path3073']] };
	sim_signals["C2"] = { name: "C2", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV REG_PC M2_C2; UPDATEDPC"],
			       fire_name: ['svg_p:text3179'],
			       draw_data: [['svg_p:path3485']],
			       draw_name: [['svg_p:path3177']] };
	sim_signals["C3"] = { name: "C3", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV REG_IR BUS_IB; DECO; FIRE_IFSET C 10"],
			       fire_name: ['svg_p:text3439'],
			       draw_data: [['svg_p:path3339']],
			       draw_name: [['svg_p:path3337']] };
	sim_signals["C4"] = { name: "C4", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV REG_RT1 BUS_IB"],
			       fire_name: ['svg_p:text3441'],
			       draw_data: [['svg_p:path3263']],
			       draw_name: [['svg_p:path3255']] };
	sim_signals["C5"] = { name: "C5", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV REG_RT2 BUS_IB"],
			       fire_name: ['svg_p:text3443'],
			       draw_data: [['svg_p:path3277']],
			       draw_name: [['svg_p:path3269']] };
	sim_signals["C6"] = { name: "C6", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV REG_RT3 ALU_C6"],
			       fire_name: ['svg_p:text3445'],
			       draw_data: [['svg_p:path3325', 'svg_p:path3323']],
			       draw_name: [['svg_p:path3245']] };
	sim_signals["C7"] = { name: "C7", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV REG_SR M7_C7; FIRE C"],
			       fire_name: ['svg_p:text3655'],
			       draw_data: [['svg_p:path3651-9']],
			       draw_name: [['svg_p:path3681']] };

	/* TRI-STATES */
	sim_signals["TA"]  = { name: "TA",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_AB REG_MAR; MOVE_BITSE A1A0 0 2 BUS_AB 0; FIRE_IFCHANGED A1A0 A1A0"],
			       fire_name: ['svg_p:text3091'],
			       draw_data: [['svg_p:path3089', 'svg_p:path3597', 'svg_p:path3513', 'svg_p:path3601', 'svg_p:path3601-2', 'svg_p:path3187', 'svg_p:path3087', 'svg_p:path2995']],
			       draw_name: [['svg_p:path3085']] };
	sim_signals["TD"]  = { name: "TD",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_DB BS_TD; MOVE_BITSE A1A0 0 2 BUS_AB 0; FIRE_IFCHANGED A1A0 A1A0"],
			       fire_name: ['svg_p:text3103'],
			       draw_data: [['svg_p:path3101','svg_p:path3587','svg_p:path3515','svg_p:path3071','svg_p:path3419','svg_p:path3099','svg_p:path3097','svg_p:path3559-5','svg_p:path3419-1-0','svg_p:path3583','svg_p:path3419-1','svg_p:path3493','svg_p:path3641','svg_p:path3541']],
			       draw_name: [['svg_p:path3095']] };
	sim_signals["T1"]  = { name: "T1",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_IB REG_MBR; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3105'],
			       draw_data: [['svg_p:path3071', 'svg_p:path3069','svg_p:path3049','svg_p:path3063-9', 'svg_p:path3071']],
			       draw_name: [['svg_p:path3067']] };
	sim_signals["T2"]  = { name: "T2",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_IB REG_PC; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3449'],
			       draw_data: [['svg_p:path3199', 'svg_p:path3201','svg_p:path3049']],
			       draw_name: [['svg_p:path3329']] };
	sim_signals["T3"]  = { name: "T3",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_IB SELEC_T3; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3451'],
			       draw_data: [['svg_p:path3349', 'svg_p:path3931', 'svg_p:path3345','svg_p:path3049']],
			       draw_name: [['svg_p:path3351']] };
	sim_signals["T4"]  = { name: "T4",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_IB REG_RT1; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3453'],
			       draw_data: [['svg_p:path3261', 'svg_p:path3259','svg_p:path3049']],
			       draw_name: [['svg_p:path3305']] };
	sim_signals["T5"]  = { name: "T5",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_IB REG_RT2; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3455'],
			       draw_data: [['svg_p:path3275', 'svg_p:path3273','svg_p:path3049']],
			       draw_name: [['svg_p:path3307']] };
	sim_signals["T6"]  = { name: "T6",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_IB ALU_C6; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3457'],
			       draw_data: [['svg_p:path3589', 'svg_p:path3317', 'svg_p:path3163-2','svg_p:path3049']],
			       draw_name: [['svg_p:path3319']] };
	sim_signals["T7"]  = { name: "T7",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_IB REG_RT3; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3459'],
			       draw_data: [['svg_p:path3327', 'svg_p:path3311', 'svg_p:path3049']],
			       draw_name: [['svg_p:path3313']] };
	sim_signals["T8"]  = { name: "T8",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_IB REG_SR; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3657'],
			       draw_data: [['svg_p:path3651', 'svg_p:path3647','svg_p:path3049']],
			       draw_name: [['svg_p:path3649']] };
	sim_signals["T9"]  = { name: "T9",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_IB RA_T9; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3147'],
			       draw_data: [['svg_p:path3143', 'svg_p:path3139','svg_p:path3049','svg_p:path3143-9']],
			       draw_name: [['svg_p:path3133']] };
	sim_signals["T10"] = { name: "T10", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_IB RB_T10; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3149'],
			       draw_data: [['svg_p:path3145', 'svg_p:path3141','svg_p:path3049','svg_p:path3145-5']],
			       draw_name: [['svg_p:path3137']] };
	sim_signals["T11"] = { name: "T11", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "MV BUS_IB REG_MICROINS/EXCODE; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3147-5','svg_cu:tspan4426'],
			       draw_data: [['svg_p:path3145', 'svg_p:path3081-3','svg_p:path3139-7','svg_p:path3049','svg_cu:path3081-3','svg_cu:path3139-7','svg_cu:path3502']],
			       draw_name: [['svg_p:path3133-6','svg_cu:path3133-6']] };

	/* MUX. */
	sim_signals["M1"]  = { name: "M1", visible: true, type: "L",  value: 0, default_value:0, nbits: "1",
			       behavior: ["MV M1_C1 BUS_IB", "MV M1_C1 BS_M1"],
                               depends_on: ["C1"],
			       fire_name: ['svg_p:text3469'],
			       draw_data: [['svg_p:path3063','svg_p:path3061','svg_p:path3059'], ['svg_p:path3057','svg_p:path3641','svg_p:path3419','svg_p:path3583']],
			       draw_name: [[], ['svg_p:path3447']] };
	sim_signals["M2"]  = { name: "M2", visible: true, type: "L",  value: 0, default_value:0, nbits: "1",
			       behavior: ["MV M2_C2 BUS_IB", "ADD M2_C2 REG_PC VAL_FOUR"],
                               depends_on: ["C2"],
			       fire_name: ['svg_p:text3471'],
			       draw_data: [['svg_p:path3217', 'svg_p:path3215', 'svg_p:path3213', 'svg_p:path3213-9'],
					   ['svg_p:path3211', 'svg_p:path3209', 'svg_p:path3193', 'svg_p:path3207', 'svg_p:path3197', 'svg_p:path3201']],
			       draw_name: [[], ['svg_p:path3467', 'svg_p:path3467']]};
	sim_signals["M7"]  = { name: "M7", visible: true, type: "L",  value: 0, default_value:0, nbits: "1",
			       behavior: ["MV M7_C7 BUS_IB", "MV M7_C7 SELP_M7"],
                               depends_on: ["C7"],
			       fire_name: ['svg_p:text3673'],
			       draw_data: [['svg_p:path3691', 'svg_p:path3693', 'svg_p:path3659'], ['svg_p:path3695']],
			       draw_name: [[], ['svg_p:path3667']] };
	sim_signals["MA"]  = { name: "MA",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["MV MA_ALU RA_T9; FIRE COP", "MV MA_ALU REG_RT1; FIRE COP"],
                               depends_on: ["SELA","SELB","SELC"],
			       fire_name: ['svg_p:text3463'],
			       draw_data: [['svg_p:path3249', 'svg_p:path3161', 'svg_p:path3165'], ['svg_p:path3279']],
			       draw_name: [[], ['svg_p:path3423']] };
	sim_signals["MB"]  = { name: "MB",  visible: true, type: "L", value: 0, default_value:0, nbits: "2",
			       behavior: ["MV MB_ALU RB_T10; FIRE COP", "MV MB_ALU REG_RT2; FIRE COP", "MV MB_ALU VAL_FOUR; FIRE COP", "MV MB_ALU VAL_ONE; FIRE COP"],
                               depends_on: ["SELA","SELB","SELC"],
			       fire_name: ['svg_p:text3465'],
			       draw_data: [['svg_p:path3281', 'svg_p:path3171', 'svg_p:path3169'], ['svg_p:path3283'],
					   ['svg_p:path3295', 'svg_p:path3293'], ['svg_p:path3297', 'svg_p:path3299']],
			       draw_name: [[], ['svg_p:path3425', 'svg_p:path3427']] };
	sim_signals["COP"] = { name: "COP", visible: true, type: "L", value: 0, default_value:0, nbits: "4", forbidden: true,
			       behavior: ["NOP",
                                          "AND ALU_C6 MA_ALU MB_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "OR ALU_C6 MA_ALU MB_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "NOT ALU_C6 MA_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "XOR ALU_C6 MA_ALU MB_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "SRL ALU_C6 MA_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "SRA ALU_C6 MA_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "SL ALU_C6 MA_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "RR ALU_C6 MA_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "RL ALU_C6 MA_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "ADD ALU_C6 MA_ALU MB_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "SUB ALU_C6 MA_ALU MB_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "MUL ALU_C6 MA_ALU MB_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "DIV ALU_C6 MA_ALU MB_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "MOD ALU_C6 MA_ALU MB_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3",
					  "LUI ALU_C6 MA_ALU; FIRE_IFSET T6 1; FIRE_IFSET SELP 3"],
                               depends_on: ["SELCOP"],
			       fire_name: ['svg_p:text3303'],
			       draw_data: [['svg_p:path3237', 'svg_p:path3239', 
                                            'svg_p:path3261-8', 'svg_p:path3321', 'svg_p:path3901-6', 'svg_p:path3317-9']],
			       draw_name: [['svg_p:path3009', 'svg_p:path3301']] };
	sim_signals["SELP"] = { name: "SELP",   visible: true, type: "L", value: 0, default_value:0, nbits: "2",
				behavior: ['NOP',
				     'MV SELP_M7 REG_SR; SBIT SELP_M7 FLAG_U 0; FIRE M7',
				     'MV SELP_M7 REG_SR; SBIT SELP_M7 FLAG_I 1; FIRE M7',
				     'MV SELP_M7 REG_SR; SBIT SELP_M7 FLAG_C 31; SBIT SELP_M7 FLAG_V 30; SBIT SELP_M7 FLAG_N 29; SBIT SELP_M7 FLAG_Z 28; FIRE M7'],
				fire_name: ['svg_p:text3703'],
				draw_data: [[],['svg_p:path3643'],['svg_p:path3705'],['svg_p:path3675', 'svg_p:path3331']],
				draw_name: [[], ['svg_p:path3697']] };

	sim_signals["SELA"] = { name: "SELA", visible: true, type: "L", value: 0, default_value:0, nbits: "5",
			        behavior: ["FIRE_IFCHANGED MR_RA SELA; RESET_CHANGED SELA"],
                                depends_on: ["RA"],
			        fire_name: ['svg_cu:text3164'],
			        draw_data: [[]],
			        draw_name: [[]] };
	sim_signals["SELB"] = { name: "SELB", visible: true, type: "L", value: 0, default_value:0, nbits: "5",
			        behavior: ["FIRE_IFCHANGED MR_RB SELB; RESET_CHANGED SELB"],
                                depends_on: ["RB"],
			        fire_name: ['svg_cu:text3168'],
			        draw_data: [[]],
			        draw_name: [[]] };
	sim_signals["SELC"] = { name: "SELC", visible: true, type: "L", value: 0, default_value:0, nbits: "5",
			        behavior: ["FIRE_IFCHANGED MR_RC SELC; RESET_CHANGED SELC"],
                                depends_on: ["RC"],
			        fire_name: ['svg_cu:text3172'],
			        draw_data: [[]],
			        draw_name: [[]] };
	sim_signals["SELCOP"] = { name: "SELCOP", visible: true, type: "L", value: 0, default_value:0, nbits: "4",
			        behavior: ["FIRE_IFCHANGED MC SELCOP; RESET_CHANGED SELCOP"],
                                depends_on: ["COP"],
			        fire_name: ['svg_cu:text3312'],
			        draw_data: [[]],
			        draw_name: [[]] };
	sim_signals["EXCODE"] = { name: "EXCODE", visible: true, type: "L", value: 0, default_value:0, nbits: "4",
			          behavior: ["FIRE T11"],
			          fire_name: ['svg_cu:text3312-6'],
			          draw_data: [[]],
			          draw_name: [[]] };

	sim_signals["RA"]  = { name: "RA", visible: true, type: "L", value: 0, default_value:0, nbits: "5", forbidden: true,
			       behavior: ["GET RA_T9 BR RA; FIRE_IFSET T9 1; FIRE_IFSET MA 0"],
                               depends_on: ["SELA"],
			       fire_name: ['svg_p:text3107'],
			       draw_data: [[]],
			       draw_name: [['svg_p:path3109']] };
	sim_signals["RB"]  = { name: "RB", visible: true, type: "L", value: 0, default_value:0, nbits: "5", forbidden: true,
			       behavior: ["GET RB_T10 BR RB; FIRE_IFSET T10 1; FIRE_IFSET MB 0"],
                               depends_on: ["SELB"],
			       fire_name: ['svg_p:text3123'],
			       draw_data: [[]],
			       draw_name: [['svg_p:path3113']] };
	sim_signals["RC"]  = { name: "RC", visible: true, type: "L", value: 0, default_value:0, nbits: "5", forbidden: true,
			       behavior: ["FIRE LC"],
                               depends_on: ["SELC"],
			       fire_name: ['svg_p:text3125'],
			       draw_data: [[]],
			       draw_name: [['svg_p:path3117']] };
	sim_signals["LC"]  = { name: "LC", visible: true, type: "E", value: 0, default_value:0, nbits: "1",
			       behavior: ["NOP", "SET BR RC BUS_IB"],
			       fire_name: ['svg_p:text3127'],
			       draw_data: [['svg_p:path3153', 'svg_p:path3151', 'svg_p:path3129']],
			       draw_name: [['svg_p:path3121']] };

	sim_signals["SE"]  = { name: "SE",     visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ["MBITS SELEC_T3 0 REG_IR OFFSET SIZE 0 SE; FIRE T3; MOVE_BITS SBWA 4 1 SE; FIRE_IFCHANGED SBWA SE",
			                  "MBITS SELEC_T3 0 REG_IR OFFSET SIZE 0 SE; FIRE T3; MOVE_BITS SBWA 4 1 SE; FIRE_IFCHANGED SBWA SE"],
                               depends_on: ["T3"],
			       fire_name: ['svg_p:text3593', 'svg_p:text3431'],
			       draw_data: [[]],
			       draw_name: [['svg_p:path3591','svg_p:path3447-7-7']] };
	sim_signals["SIZE"] = { name: "SIZE",   visible: true, type: "L", value: 0, default_value:0, nbits: "5",
			       behavior: ['MBITS SELEC_T3 0 REG_IR OFFSET SIZE 0 SE; FIRE T3'],
                               depends_on: ["T3"],
			       fire_name: ['svg_p:text3363'],
			       draw_data: [[]],
			       draw_name: [['svg_p:path3355']] };
	sim_signals["OFFSET"] = { name: "OFFSET", visible: true, type: "L", value: 0, default_value:0, nbits: "5",
			       behavior: ['MBITS SELEC_T3 0 REG_IR OFFSET SIZE 0 SE; FIRE T3'],
                               depends_on: ["T3"],
			       fire_name: ['svg_p:text3707'],
			       draw_data: [[]],
			       draw_name: [['svg_p:path3359']] };

	sim_signals["MC"]  = { name: "MC", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ['MBIT COP REG_IR 0 4; FIRE_IFCHANGED COP MC',
					  'MV COP REG_MICROINS/SELCOP; FIRE_IFCHANGED COP MC'],
                               depends_on: ["SELCOP"],
			       fire_name: ['svg_cu:text3322','svg_cu:text3172-1-5'],
			       draw_data: [['svg_cu:path3320', 'svg_cu:path3142'],['svg_cu:path3318', 'svg_cu:path3502-6', 'svg_cu:path3232-6']],
			       draw_name: [[],['svg_cu:path3306']] }; /*path3210 print red color line of rest of control signals*/

	sim_signals["MR"]  = { name: "MR", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			       behavior: ['MV MR_RA MR; FIRE_IFCHANGED MR_RA MR; MV MR_RB MR; FIRE_IFCHANGED MR_RB MR; MV MR_RC MR; FIRE_IFCHANGED MR_RC MR; RESET_CHANGED MR'],
                               depends_on: ["SELA","SELB","SELC"],
			       fire_name: ['svg_cu:text3222','svg_cu:text3242','svg_cu:text3254','svg_cu:text3172-1'],
			       draw_data: [['svg_cu:path3494','svg_cu:path3492','svg_cu:path3490','svg_cu:path3142b','svg_cu:path3188',
                                            'svg_cu:path3190','svg_cu:path3192','svg_cu:path3194','svg_cu:path3276','svg_cu:path3290',
                                            'svg_cu:path3260','svg_cu:path3196','svg_cu:path3502','svg_cu:path3278','svg_cu:path3232','svg_cu:path3292'],
					   ['svg_cu:path3270','svg_cu:path3282','svg_cu:path3300', 'svg_cu:path3258', 'svg_cu:path3260', 
                                            'svg_cu:path3278', 'svg_cu:path3196', 'svg_cu:path3502',
					    'svg_cu:path3294', 'svg_cu:path3292', 'svg_cu:path3288', 'svg_cu:path3232', 'svg_cu:path3280']],
			       draw_name: [[],['svg_cu:path3220','svg_cu:path3240','svg_cu:path3252']] };
	sim_signals["MR_RA"] = { name: "MR_RA", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			         behavior: ['MBIT_SN RA REG_IR REG_MICROINS/SELA 5; FIRE RA;',
					    'MV RA REG_MICROINS/SELA; FIRE RA;'],
			         fire_name: [],
			         draw_data: [[]],
			         draw_name: [[]] };
	sim_signals["MR_RB"] = { name: "MR_RB", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			         behavior: ['MBIT_SN RB REG_IR REG_MICROINS/SELB 5; FIRE RB;',
					    'MV RB REG_MICROINS/SELB; FIRE RB;'],
			         fire_name: [],
			         draw_data: [[]],
			         draw_name: [[]] };
	sim_signals["MR_RC"] = { name: "MR_RC", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			         behavior: ['MBIT_SN RC REG_IR REG_MICROINS/SELC 5; FIRE RC;',
					    'MV RC REG_MICROINS/SELC; FIRE RC;'],
			         fire_name: [],
			         draw_data: [[]],
			         draw_name: [[]] };

	/* W-Byte & R-Byte Selector */
	sim_signals["BW"] =  { name: "BW", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
		               behavior: ['MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW',
				          'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW',
				          'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW',
				          'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; FIRE_IFCHANGED BWA BW; FIRE SBWA; RESET_CHANGED BW'],
				fire_name: ['svg_p:text3433'],
				draw_data: [['svg_p:path3061-2-6']],
				draw_name: [[],[]] };
	sim_signals["A1A0"] = { name: "A1A0", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
				behavior: ['MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					   'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					   'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					   'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA'],
				fire_name: ['svg_p:text3603'],
				draw_data: [[],[]],
				draw_name: [[],[]] };
	sim_signals["BWA"] = { name: "BWA", visible: false, type: "L", value: 0, default_value: 0, nbits: "4",
				behavior: ['BSEL BS_TD 0 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'BSEL BS_TD 8 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'BSEL BS_TD 16 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'BSEL BS_TD 24 8 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'BSEL BS_TD 0 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'BSEL BS_TD 16 16 REG_MBR 0; FIRE TD; FIRE R; FIRE W',
					   'MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W',
					   'MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W',
					   'MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W',
					   'MV BS_TD REG_MBR; FIRE TD; FIRE R; FIRE W'],
				 fire_name: [],
				 draw_data: [[],[]],
				 draw_name: [[],[]] };
	sim_signals["SBWA"] = { name: "SBWA", visible: false, type: "L", value: 0, default_value: 0, nbits: "5",
				behavior: ['BSEL BS_M1 0 8 BUS_DB 0; FIRE M1',
					   'BSEL BS_M1 0 8 BUS_DB 8; FIRE M1',
					   'BSEL BS_M1 0 8 BUS_DB 16; FIRE M1',
					   'BSEL BS_M1 0 8 BUS_DB 24; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 0; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 0; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 0; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 0; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 16; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 16; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 16; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 16; FIRE M1',
					   'MV BS_M1 BUS_DB; FIRE M1',
					   'MV BS_M1 BUS_DB; FIRE M1',
					   'MV BS_M1 BUS_DB; FIRE M1',
					   'MV BS_M1 BUS_DB; FIRE M1',
					   'BSEL BS_M1 0 8 BUS_DB 0; EXT_SIG BS_M1 7; FIRE M1',
					   'BSEL BS_M1 0 8 BUS_DB 8; EXT_SIG BS_M1 7; FIRE M1',
					   'BSEL BS_M1 0 8 BUS_DB 16; EXT_SIG BS_M1 7; FIRE M1',
					   'BSEL BS_M1 0 8 BUS_DB 24; EXT_SIG BS_M1 7; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 0; EXT_SIG BS_M1 15; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1',
					   'BSEL BS_M1 0 16 BUS_DB 16; EXT_SIG BS_M1 15; FIRE M1',
					   'MV BS_M1 BUS_DB; FIRE M1',
					   'MV BS_M1 BUS_DB; FIRE M1',
					   'MV BS_M1 BUS_DB; FIRE M1',
					   'MV BS_M1 BUS_DB; FIRE M1'],
				fire_name: [],
				draw_data: [[],[]],
				draw_name: [[],[]] };

	/* I/O Devices */
	sim_signals["IOR"]   = { name: "IOR", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
				 behavior: ["NOP", "MOVE_BITS KBD_IOR 0 1 IOR; MOVE_BITS SCR_IOR 0 1 IOR; FIRE KBD_IOR; FIRE SCR_IOR"],
				 fire_name: ['svg_p:text3715'],
				 draw_data: [[], ['svg_p:path3733', 'svg_p:path3493', 'svg_p:text3715', 'svg_p:path3493']],
				 draw_name: [[], []]};
	sim_signals["IOW"]   = { name: "IOW", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
				 behavior: ["NOP", "MOVE_BITS SCR_IOW 0 1 IOW; FIRE SCR_IOW; MOVE_BITS IO_IOW 0 1 IOW; FIRE IO_IOW;"],
				 fire_name: ['svg_p:text3715'],
				 draw_data: [[], ['svg_p:path3735', 'svg_p:path3493', 'svg_p:text3717', 'svg_p:path3493']],
				 draw_name: [[], []]};

        /* Virtual Signals, for UI */
	sim_signals["TEST_C"] = { name: "TEST_C", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		  	          behavior: ["MV FLAG_C VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_C VAL_ONE; FIRE_IFSET SELP 3"],
		  	          fire_name: ['svg_p:text3701-3'],
			          draw_data: [['svg_p:text3701-3']],
			          draw_name: [[]] };
	sim_signals["TEST_V"] = { name: "TEST_V", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		  	          behavior: ["MV FLAG_V VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_V VAL_ONE; FIRE_IFSET SELP 3"],
		  	          fire_name: ['svg_p:text3701-3-1'],
			          draw_data: [['svg_p:text3701-3-1']],
			          draw_name: [[]] };
	sim_signals["TEST_N"] = { name: "TEST_N", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		  	          behavior: ["MV FLAG_N VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_N VAL_ONE; FIRE_IFSET SELP 3"],
		  	          fire_name: ['svg_p:text3701-3-2'],
			          draw_data: [['svg_p:text3701-3-2']],
			          draw_name: [[]] };
	sim_signals["TEST_Z"] = { name: "TEST_Z", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		  	          behavior: ["MV FLAG_Z VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_Z VAL_ONE; FIRE_IFSET SELP 3"],
		  	          fire_name: ['svg_p:text3701-3-5'],
			          draw_data: [['svg_p:text3701-3-5']],
			          draw_name: [[]] };
	sim_signals["TEST_I"] = { name: "TEST_I", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
		  	          behavior: ["MV FLAG_I VAL_ZERO; FIRE_IFSET SELP 2", "MV FLAG_I VAL_ONE; FIRE_IFSET SELP 2"],
		  	          fire_name: ['svg_p:text3669'],
			          draw_data: [['svg_p:text3669']],
			          draw_name: [[]] };
	sim_signals["TEST_U"] = { name: "TEST_U", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			          behavior: ["MV FLAG_U VAL_ZERO; FIRE_IFSET SELP 1", "MV FLAG_U VAL_ONE; FIRE_IFSET SELP 1"],
			          fire_name: ['svg_p:text3669-1'],
			          draw_data: [['svg_p:text3669-1']],
			          draw_name: [[]] };
	sim_signals["TEST_INTV"] = { name: "TEST_INTV", visible: true, type: "L", value: 0, default_value:0, nbits: "8",
			          behavior: ["MBIT INTV TEST_INTV 0 32"],
			          fire_name: ['svg_p:tspan4225'],
			          draw_data: [['svg_p:path3749']],
			          draw_name: [[]] };


	/*
	 *  Syntax of behaviors
	 */

	syntax_behavior["NOP"]   = { nparameters: 1,
				     operation: function(s_expr) {}
				   };
        syntax_behavior["MV"]    = { nparameters: 3,
                                     types: ["X", "X"],
                                     operation: function(s_expr)
                                                {
                                                   r = s_expr[2].split('/');

						   sim_elto_dst = get_reference(s_expr[1]) ;
						   sim_elto_org = get_reference(r[0]) ;

                                                   newval = get_value(sim_elto_org) ;
                                                   if (1 != r.length) 
						       newval = newval[r[1]] ;

                                                   if (typeof newval != "undefined")
                                                       set_value(sim_elto_dst, newval);
                                                }
                                   };
	syntax_behavior["NOT_ES"] = { nparameters: 3,
				     types: ["S", "E"],
				     operation: function (s_expr) {
						   set_value(sim_signals[s_expr[1]], Math.abs(get_value(sim_states[s_expr[2]]) - 1));
						}
				   };
	syntax_behavior["GET"]   = { nparameters: 4,
				     types: ["E", "E", "S"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]], get_value(sim_states[s_expr[2]][sim_signals[s_expr[3]].value]));
						}
				   };
	syntax_behavior["SET"]   = { nparameters: 4,
				     types: ["E", "S", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]][sim_signals[s_expr[2]].value], get_value(sim_states[s_expr[3]]));
						}
				   };
	syntax_behavior["AND"]   = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]], get_value(sim_states[s_expr[2]]) & get_value(sim_states[s_expr[3]]));

						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], 0) ;
						}
				   };
	syntax_behavior["OR"]    = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]], get_value(sim_states[s_expr[2]]) | get_value(sim_states[s_expr[3]]));

						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], 0) ;
						}
				   };
	syntax_behavior["NOT"]   = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]], ~(get_value(sim_states[s_expr[2]]))) ;

						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], 0) ;
						}
				   };
	syntax_behavior["XOR"]   = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]], (get_value(sim_states[s_expr[2]])) ^ (get_value(sim_states[s_expr[3]])));

						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], 0) ;
						}
				   };
	syntax_behavior["SRL"]   = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]], (get_value(sim_states[s_expr[2]])) >>> 1);

						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], 0) ;
						}
				   };
	syntax_behavior["SRA"]   = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]], (get_value(sim_states[s_expr[2]])) >> 1);

						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], 0) ;
						}
				   };
	syntax_behavior["SL"]    = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]], (get_value(sim_states[s_expr[2]])) << 1);

						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], (get_value(sim_states[s_expr[2]])) >> 31) ;
						}
				   };
	syntax_behavior["RR"]    = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]],  ((get_value(sim_states[s_expr[2]])) >>> 1) | (((get_value(sim_states[s_expr[2]])) & 1) << 31));

						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], 0) ;
						}
				   };
	syntax_behavior["RL"]    = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]], ((get_value(sim_states[s_expr[2]])) << 1) | (((get_value(sim_states[s_expr[2]])) & 0X80000000) >>> 31));

						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], (get_value(sim_states[s_expr[2]])) >> 31) ;
						}
				   };
	syntax_behavior["ADD"]   = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr) {
						   var result = (get_value(sim_states[s_expr[2]]) << 0) + (get_value(sim_states[s_expr[3]]) << 0) ;
						   set_value(sim_states[s_expr[1]], result >>> 0) ;

						   set_value(sim_states["FLAG_N"], (result  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (result == 0) ? 1 : 0) ;

						   set_value(sim_states["FLAG_V"], 0) ;
						   if ( (result < 0) &&
							(get_value(sim_states[s_expr[2]]) >= 0) &&
							(get_value(sim_states[s_expr[3]]) >= 0) )
							set_value(sim_states["FLAG_V"], 1) ;
						   if ( (result >= 0) &&
							(get_value(sim_states[s_expr[2]]) < 0) &&
							(get_value(sim_states[s_expr[3]]) < 0) )
							set_value(sim_states["FLAG_V"], 1) ;

						   set_value(sim_states["FLAG_C"], ((get_value(sim_states[s_expr[2]])) >> 31) && ((get_value(sim_states[s_expr[3]])) >> 31)) ;
						}
				   };
	syntax_behavior["SUB"]   = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr) {
						   var result = (get_value(sim_states[s_expr[2]]) << 0) - (get_value(sim_states[s_expr[3]]) << 0) ;
						   set_value(sim_states[s_expr[1]], result >>> 0);

						   set_value(sim_states["FLAG_N"], (result  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (result == 0) ? 1 : 0) ;

						   set_value(sim_states["FLAG_V"], 0) ;
						   if ( (result < 0) &&
							(get_value(sim_states[s_expr[2]]) >= 0) &&
							(get_value(sim_states[s_expr[3]]) >= 0) )
							set_value(sim_states["FLAG_V"], 1) ;
						   if ( (result >= 0) &&
							(get_value(sim_states[s_expr[2]]) < 0) &&
							(get_value(sim_states[s_expr[3]]) < 0) )
							set_value(sim_states["FLAG_V"], 1) ;

						   set_value(sim_states["FLAG_C"], ((get_value(sim_states[s_expr[2]])) >> 31) && ((get_value(sim_states[s_expr[3]])) >> 31)) ;
						}
				   };
	syntax_behavior["MUL"]   = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr) {
						   var result = (get_value(sim_states[s_expr[2]]) << 0) * (get_value(sim_states[s_expr[3]]) << 0) ;
						   set_value(sim_states[s_expr[1]], result >>> 0);

						   set_value(sim_states["FLAG_N"], (result  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (result == 0) ? 1 : 0) ;

						   set_value(sim_states["FLAG_V"], 0) ;
						   if ( (result < 0) &&
							(get_value(sim_states[s_expr[2]]) >= 0) &&
							(get_value(sim_states[s_expr[3]]) >= 0) )
							set_value(sim_states["FLAG_V"], 1) ;
						   if ( (result >= 0) &&
							(get_value(sim_states[s_expr[2]]) < 0) &&
							(get_value(sim_states[s_expr[3]]) < 0) )
							set_value(sim_states["FLAG_V"], 1) ;

						   set_value(sim_states["FLAG_C"], 0) ;
						}
				   };
	syntax_behavior["DIV"]   = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr) {
						   var a = (get_value(sim_states[s_expr[2]]) << 0) ;
						   var b = (get_value(sim_states[s_expr[3]]) << 0) ;

						   if (0 == b) {
						       set_value(sim_states[s_expr[1]], 0) ;
						       set_value(sim_states["FLAG_Z"], 1) ;
						       set_value(sim_states["FLAG_V"], 1) ;
                                                       return ;
                                                   }

						   set_value(sim_states[s_expr[1]], Math.floor(a / b)) ;
						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], 0) ;
						}
				   };
	syntax_behavior["MOD"]   = { nparameters: 4,
				     types: ["E", "E", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]], (get_value(sim_states[s_expr[2]]) << 0) % (get_value(sim_states[s_expr[3]]) << 0));

						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], 0) ;
						}
				   };
	syntax_behavior["LUI"]   = { nparameters: 3,
				     types: ["E", "E"],
				     operation: function(s_expr) {
						   set_value(sim_states[s_expr[1]], (get_value(sim_states[s_expr[2]])) << 16);

						   set_value(sim_states["FLAG_N"], (get_value(sim_states[s_expr[1]])  < 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_Z"], (get_value(sim_states[s_expr[1]]) == 0) ? 1 : 0) ;
						   set_value(sim_states["FLAG_V"], 0) ;
						   set_value(sim_states["FLAG_C"], 0) ;
						}
				   };
	syntax_behavior["MBIT"]  = { nparameters: 5,
				     types: ["X", "X", "I", "I"],
				     operation: function (s_expr) 
		                                {
						   sim_elto_org = get_reference(s_expr[2]) ;
						   sim_elto_dst = get_reference(s_expr[1]) ;

						   var offset = parseInt(s_expr[3]) ;
						   var size   = parseInt(s_expr[4]) ;

						   var n1 = get_value(sim_elto_org).toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32-n1.length) + n1;
						   n2 = n2.substr(31 - (offset + size - 1), size);

						   set_value(sim_elto_dst, parseInt(n2, 2));
						}
				   };
	syntax_behavior["MBIT_SN"] = { nparameters: 5,
				     types: ["S", "E", "E", "I"],
				     operation: function (s_expr) {
						   var base = 0;
						   var r = s_expr[3].split('/');
						   if (1 == r.length)
							base = get_value(sim_states[s_expr[3]]);
						   else
						   if (typeof  sim_states[r[0]].value[r[1]] != "undefined")
							base = sim_states[r[0]].value[r[1]];
                                                   // begin: REG_MICROINS/xxx by default is the default_value
					      else if (typeof  sim_signals[r[1]].default_value != "undefined")
						        base = sim_signals[r[1]].default_value;
					      else if (typeof   sim_states[r[1]].default_value != "undefined")
						        base =  sim_states[r[1]].default_value;
                                                   // end: REG_MICROINS/xxx by default is the default_value
						   else alert('WARN: undefined state/field pair -> ' + r[0] + '/' + r[1]);

						   var offset = parseInt(s_expr[4]) ;

						   var n1 = get_value(sim_states[s_expr[2]]).toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1 ;
						   var n3 = n2.substr(31 - (base + offset - 1), offset) ;

						   set_value(sim_signals[s_expr[1]], parseInt(n3, 2));
						}
				   };
	syntax_behavior["SBIT"]  = { nparameters: 4,
				     types: ["X", "X", "I"],
				     operation: function (s_expr) 
		                                {
						   sim_elto_org = get_reference(s_expr[2]) ;
						   sim_elto_dst = get_reference(s_expr[1]) ;

						   //    0      1    2  3
						   //   SBIT  A0A1  A1  0
						   var new_value = (sim_elto_dst.value & ~(1 << s_expr[3])) | 
						                         (sim_elto_org.value << s_expr[3]);
						   set_value(sim_elto_dst, (new_value >>> 0));
						}
				   };
	syntax_behavior["MBITS"] = { nparameters: 8,
				     types: ["E", "I", "E", "S", "S", "I", "S"],
				     operation: function(s_expr)
						{
						   var offset = parseInt(sim_signals[s_expr[4]].value) ;
						   var size   = parseInt(sim_signals[s_expr[5]].value) ;

						   var n1 = get_value(sim_states[s_expr[3]]).toString(2); // to binary
						   var n2 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1) ;
						       n2 = n2.substr(31 - (offset + size - 1), size);

						   var n3 =  "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
						   if ( ("1" == sim_signals[s_expr[7]].value) && ("1" == n2.substr(0, 1)))
                                                   {    // check signed-extension
							n3 = "11111111111111111111111111111111".substring(0, 32 - n2.length) + n2;
						   }

						   set_value(sim_states[s_expr[1]], parseInt(n3, 2));
						}
				   };

	syntax_behavior["BSEL"] =  { nparameters: 6,
				     types: ["E", "I", "I", "E", "I"],
				     operation: function (s_expr) {
						   var posd = parseInt(s_expr[2]) ;
						   var poso = parseInt(s_expr[5]) ;
						   var len  = parseInt(s_expr[3]) ;

						   var n1 = get_value(sim_states[s_expr[4]]).toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1 ;
						       n2 = n2.substr(31 - (poso + len) + 1, len);
						   var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
						   var n4 = "00000000000000000000000000000000".substr(0, posd);
						   n3 = n3 + n4;

						   set_value(sim_states[s_expr[1]], parseInt(n3, 2));
						}
				   };
	syntax_behavior["EXT_SIG"] =  { nparameters: 3,
				     types: ["E", "I"],
				     operation: function (s_expr) {
						   var n1 = get_value(sim_states[s_expr[1]]).toString(2); // to binary
						   var n2 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1) ;
						   var n3 = n2.substr(31 - s_expr[2], 31);
						   var n4 = n3;
						   if ("1" == n2[31 - s_expr[2]]) {  // check signed-extension
						       n4 = "11111111111111111111111111111111".substring(0, 32 - n3.length) + n4;
						   }

						   set_value(sim_states[s_expr[1]], parseInt(n4, 2));
						}
				   };
	syntax_behavior["MOVE_BITS"] =  { nparameters: 5,
				     types: ["S", "I", "I","S"],
				     operation: function (s_expr) {
						   var posd = parseInt(s_expr[2]) ;
						   var poso = 0 ;
						   var len  = parseInt(s_expr[3]) ;

						   var n1 = sim_signals[s_expr[4]].value.toString(2); // to binary signal origin
						   n1 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1);
						   n1 = n1.substr(31 - poso - len + 1, len);

						   var n2 = sim_signals[s_expr[1]].value.toString(2); // to binary signal destiny
						   n2 = ("00000000000000000000000000000000".substring(0, 32 - n2.length) + n2) ;
						   var m1 = n2.substr(0, 32 - (posd + len));
						   var m2 = n2.substr(31 - posd + 1, posd);
						   var n3 = m1 + n1 + m2;

						   set_value(sim_signals[s_expr[1]], parseInt(n3, 2));
						}
				   };
	syntax_behavior["MOVE_BITSE"] = {
					  nparameters: 6,
				    types: ["S", "I", "I", "E", "I"],
				    operation: function (s_expr) {
						   var posd = parseInt(s_expr[2]) ;
						   var poso = parseInt(s_expr[5]) ;
						   var len  = parseInt(s_expr[3]) ;

						   var n1 =  get_value(sim_states[s_expr[4]]).toString(2); // to state signal origin
						   n1 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1);
						   n1 = n1.substr(31 - poso - len + 1, len);

						   var n2 = sim_signals[s_expr[1]].value.toString(2); // to binary signal destiny
						   n2 = ("00000000000000000000000000000000".substring(0, 32 - n2.length) + n2);
						   var m1 = n2.substr(0, 32 - (posd + len));
						   var m2 = n2.substr(31 - posd + 1, posd);
						   var n3 = m1 + n1 + m2;

						   set_value(sim_signals[s_expr[1]], parseInt(n3, 2));
						}
				  };
	syntax_behavior["DECO"] = { nparameters: 1,
				     operation: function(s_expr)
						{
						    var bits = get_value(sim_states['REG_IR']).toString(2) ;
						        bits = "00000000000000000000000000000000".substring(0, 32 - bits.length) + bits ;
						    var  op_code = parseInt(bits.substr(0,  6), 2) ; //  op-code of 6 bits
						    var cop_code = parseInt(bits.substr(28, 4), 2) ; // cop-code of 4 bits

						    // 1.- IR -> oi
						    sim_states['INEX'].value = 0 ;
						    var oi = decode_instruction(bits) ;
						    if (null == oi)
                                                    {
                                                         alert('ERROR: undefined instruction code in firmware ' +
                                                               '(co:' + op_code.toString(2) + ', cop:' + cop_code.toString(2) + ')') ;
							 sim_states['ROM_MUXA'].value = 0 ;
							 sim_states['INEX'].value = 1 ;
							 return -1;
						    }

						    // 2.- oi -> rom_addr
                                                    var rom_addr = op_code << 6;
						    if (typeof oi.cop != "undefined")
                                                        rom_addr = rom_addr + cop_code ;

						    // 2.- ! ROM[rom_addr] -> error
						    if (typeof ROM[rom_addr] == "undefined")
						    {
							 alert('ERROR: undefined rom address ' + rom_addr + ' in firmware') ;
							 sim_states['ROM_MUXA'].value = 0 ;
							 return -1;
						    }

						    // 3.- ROM[rom_addr] -> mc-start -> ROM_MUXA
						    sim_states['ROM_MUXA'].value = ROM[rom_addr] ;

						    // 4.-  Statistics
						    var val = get_value(sim_states['DECO_INS']) ;
						    set_value(sim_states["DECO_INS"], val + 1);

                                                    // 5.- Update UI
						    var pc = get_value(sim_states['REG_PC']) - 4 ;
                                                    var decins = get_deco_from_pc(pc) ;
						    set_value(sim_states['REG_IR_DECO'], decins) ;
                                                    show_dbg_ir(get_value(sim_states['REG_IR_DECO']));
						}
				   };

		syntax_behavior["FIRE"] = { nparameters: 2,
					     types: ["S"],
					     operation: function (s_expr)
							{
							    // 0.- avoid loops
							    if (fire_stack.indexOf(s_expr[1]) != -1) {
								return ;
							    }

							    fire_stack.push(s_expr[1]) ;

							    // 1.- update draw
							    update_draw(sim_signals[s_expr[1]], sim_signals[s_expr[1]].value) ;

							    // 2.- for Level signals, propage it
							    if ("L" == sim_signals[s_expr[1]].type)
							    {
								update_state(s_expr[1]) ;
							    }

							    fire_stack.pop(s_expr[1]) ;

							    // 3.- check conflicts
                                                            check_buses(s_expr[1]);
							}
					   };

		syntax_behavior["FIRE_IFSET"] = { nparameters: 3,
					     types: ["S", "I"],
					     operation: function (s_expr)
							{
                                                            if (get_value(sim_signals[s_expr[1]]) != parseInt(s_expr[2])) {
                                                                return ;
                                                            }

                                                            syntax_behavior["FIRE"].operation(s_expr) ;
							}
					   };

		syntax_behavior["FIRE_IFCHANGED"] = { nparameters: 3,
					     types: ["S", "X"],
					     operation: function (s_expr)
							{
						            sim_elto = get_reference(s_expr[2]) ;
							    if (sim_elto.changed == false)
								return ;

							    syntax_behavior["FIRE"].operation(s_expr) ;
							}
					   };

		syntax_behavior["RESET_CHANGED"] = { nparameters: 2,
					     types: ["X"],
					     operation: function (s_expr)
							{
						            sim_elto = get_reference(s_expr[1]) ;
							    sim_elto.changed = false ; // todo: comment this line
							}
					   };

		syntax_behavior["CLOCK"] = { nparameters: 1,
					     operation: function(s_expr)
							{
							    // 0.- Update counter
							    var val = get_value(sim_states["CLK"]) ;
							    set_value(sim_states["CLK"], val + 1);

							    // 1.- To treat the (Falling) Edge signals
							    for (var i=0; i<jit_fire_order.length; i++)
								 fn_updateE_now(jit_fire_order[i]) ;
							    //actions = jit_fire_order.map(fn_updateE_future) ;
							    //Promise.all(actions) ;

							    // 2.- The special (Falling) Edge part of the Control Unit...
							    var new_maddr = get_value(sim_states["MUXA_MICROADDR"]) ;
							    set_value(sim_states["REG_MICROADDR"], new_maddr) ;

							    if (typeof MC[new_maddr] != "undefined")
								     var new_mins = Object.create(MC[new_maddr]);
								else var new_mins = Object.create(sim_states["REG_MICROINS"].default_value);
							    sim_states["REG_MICROINS"].value = new_mins ;

                                                            // 3.- update signals
							    for (var key in sim_signals)
							    {
								 if (typeof new_mins[key] != "undefined") 
								      set_value(sim_signals[key], new_mins[key]);
								 else set_value(sim_signals[key], sim_signals[key].default_value);
							    }

							    // 4.- Finally, 'fire' the (High) Level signals
							    for (var i=0; i<jit_fire_order.length; i++)
								 fn_updateL_now(jit_fire_order[i]) ;
							    //actions = jit_fire_order.map(fn_updateL_future) ;
							    //Promise.all(actions) ;

							    // 5.- Native
							    if (typeof new_mins.NATIVE != "undefined") {
							        eval(new_mins.NATIVE) ;
							    }
							}
					   };

		syntax_behavior["RESET"] = { nparameters: 1,
					     operation: function(s_expr)
							{
							    // 1.a.- set states/signals to the default state
							    for (var key in sim_states)
								 reset_value(sim_states[key]) ;
							    for (var key in sim_signals)
								 reset_value(sim_signals[key]) ;

							    // 1.b.- reset events to empty
							    sim_events["screen"] = new Object() ;
							    sim_events["keybd"]  = new Object() ;
							    sim_events["io"]     = new Object() ;
							    sim_events["mem"]    = new Object() ;

							    // 2.- reset the I/O factory
							    for (var i=0; i<IO_INT_FACTORY.length; i++)
							    {
								IO_INT_FACTORY[i].accumulated(0) ;
								IO_INT_FACTORY[i].active(false) ;
							    }
							}
					   };

	syntax_behavior["UPDATEDPC"]     = { nparameters: 1,
				             operation: function(s_expr)
							{
                                                            show_asmdbg_pc();
							}
					   };

