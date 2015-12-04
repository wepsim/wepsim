/*      
 *  Copyright 2015 Javier Prieto Cepeda, Felix Garcia Carballeira, Alejandro Calderon Mateos
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
	 *  States - Memories
	 */

	var MC  = new Object();
	var ROM = new Object();
	var FIRMWARE = new Object();


	/*
	 *  States
	 */

	/*ESTADOS DE REGISTROS*/
	sim_states["BR"] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	sim_states["REG_PC"]         = {name:"PC",          visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_MAR"]        = {name:"MAR",         visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_MBR"]        = {name:"MBR",         visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_IR"]         = {name:"IR",          visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_RT1"]        = {name:"RT1",         visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_RT2"]        = {name:"RT2",         visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_RT3"]        = {name:"RT3",         visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["REG_SR"]         = {name:"SR",          visible:true, nbits:"32", value:0,  default_value:0, draw_data: [] };        

	/*BUSES*/
	sim_states["BUS_IB"]         = {name:"I_BUS",          visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BUS_AB"]         = {name:"A_BUS",          visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BUS_CB"]         = {name:"C_BUS",          visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["BUS_DB"]         = {name:"D_BUS",          visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };

	/*ESTADOS DE REGISTRO A*/
	sim_states["C2_T2"]          = {name: "C2_T2",          visible:false, nbits: "32", value: 0, default_value:0, draw_data: [] };
	sim_states["RA_T9"]          = {name: "RA_T9",          visible:false, nbits: "32", value: 0, default_value:0, draw_data: [] };
	sim_states["RB_T10"]         = {name: "RB_T10",         visible:false, nbits: "32", value: 0, default_value:0, draw_data: [] };

	/*ESTADOS DE SELEC A*/
	sim_states["SELEC_T3"]       = { name: "SELEC_T3",      visible:false, nbits: "32", value: 0, default_value:0, draw_data: [] };
	sim_states["RBS_M1"]         = { name: "RBS_M1",        visible:false, nbits: "32", value: 0, default_value:0, draw_data: [] };
	sim_states["WBS_TD"]         = { name: "WBS_TD",        visible:false, nbits: "32", value: 0, default_value:0, draw_data: [] };
	sim_states["SELP_M7"]        = { name: "SELP_M7",       visible:false, nbits: "32", value: 0, default_value:0, draw_data: [] };

	sim_states["SUM4_M2"]        = {name:"SUM4_M2",         visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["ALU_C6"]         = {name:"ALU_C6",          visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["MA_ALU"]         = {name:"MA_ALU",          visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["MB_ALU"]         = {name:"MB_ALU",          visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };

	sim_states["FLAG_O"]         = { name: "FLAG_O",        visible:true, nbits: "32", value: 0, default_value:0, draw_data: [] };
	sim_states["FLAG_N"]         = { name: "FLAG_N",        visible:true, nbits: "32", value: 0, default_value:0, draw_data: [] };
	sim_states["FLAG_Z"]         = { name: "FLAG_Z",        visible:true, nbits: "32", value: 0, default_value:0, draw_data: [] };
	sim_states["FLAG_I"]         = { name: "FLAG_I",        visible:true, nbits: "32", value: 0, default_value:0, draw_data: [] };
	sim_states["FLAG_U"]         = { name: "FLAG_U",        visible:true, nbits: "32", value: 0, default_value:0, draw_data: [] };

	/*UNIDAD CONTROL*/
	sim_states["REG_MICROADDR"]  = { name: "µADDR",  visible:true, nbits: "12", value:0,  default_value:0, draw_data: ['svg_cu:text4667']};
	sim_states["REG_MICROINS"]   = { name: "µINS",   visible:true, nbits: "77", value:{"SELA":0, "SELB":0, "SELE":0, "COP":0}, 
											    default_value:{"SELA":0, "SELB":0, "SELE":0, "COP":0}, 
											    draw_data: [] };

	sim_states["FETCH"]          = { name: "FETCH",          visible:false, nbits: "12", value: 0, default_value:0, draw_data: [] };
	sim_states["ROM_MUXA"]       = { name: "ROM_MUXA",       visible:false, nbits: "12", value: 0, default_value:0, draw_data: [] };
	sim_states["SUM_ONE"]        = { name: "SUM_ONE",        visible:false, nbits: "12", value: 1, default_value:1, draw_data: [] };
	sim_states["MUXA_MICROADDR"] = { name: "MUXA_MICROADDR", visible:false, nbits: "12", value: 0, default_value:0, draw_data: [] };
	sim_states["MUXC_MUXB"]      = { name: "MUXC_MUXB",      visible:false, nbits: "1",  value: 0, default_value:0, draw_data: [] };

	/*MEMORIA y DISPOSITIVOS*/
	sim_states["WBS_TD"]         = { name: "WBS_TD",         visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
	sim_states["RBS_TD"]         = { name: "RBS_TD",         visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };

	sim_states["INTV"]           = { name: "INTV",           visible:false, nbits: "8", value: 0, default_value: 0, draw_data: [] };


	/*ESTADOS DE MUX A*/
	sim_states["M2_C2"]          = {name:"M2_C2",            visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["M1_C1"]          = {name:"M1_C1",            visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["M7_C7"]          = {name:"M7_C7",            visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };

	sim_states["VAL_ZERO"]       = { name: "VAL_ZERO",       visible:false, nbits: "1",  value: 0, default_value:0, draw_data: [] };
	sim_states["VAL_ONE"]        = { name: "VAL_ONE",        visible:false, nbits: "32", value: 1, default_value:1, draw_data: [] };
	sim_states["VAL_FOUR"]       = { name: "VAL_FOUR",       visible:false, nbits: "32", value: 4, default_value:4, draw_data: [] };

	/* VIRTUAL */
	sim_states["REG_IR_DECO"]    = {name:"IR_DECO",     visible:true,  nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["DECO_INS"]       = {name:"DECO_INS",    visible:true,  nbits:"32", value:0,  default_value:0, draw_data: [] };
	sim_states["CLK"]            = {name:"CLK",         visible:false, nbits:"32", value:0,  default_value:0, draw_data: [] };


	/*
	 *  Signals
	 */

	/*CONTROL UNIT*/
	sim_signals["C"]    = { name: "C",    visible: true, type: "L", value: 0, default_value: 0, nbits: "4", 
				behavior: ["MV MUXC_MUXB VAL_ZERO; FIRE B", 
					   "MV MUXC_MUXB INT; FIRE B", 
					   "MV MUXC_MUXB IORDY; FIRE B", 
					   "MV MUXC_MUXB MRDY; FIRE B", 
					   "MBIT_I MUXC_MUXB REG_SR 0 1; FIRE B",
					   "MBIT_I MUXC_MUXB REG_SR 1 1; FIRE B", 
					   "MBIT_I MUXC_MUXB REG_SR 29 1; FIRE B", 
					   "MBIT_I MUXC_MUXB REG_SR 30 1; FIRE B", 
					   "MBIT_I MUXC_MUXB REG_SR 31 1; FIRE B"],
				fire_name: ['svg_cu:text3410'],
				draw_data: [['svg_cu:path3108'], 
					    ['svg_cu:path3062'], 
					    ['svg_cu:path3060'], 
					    ['svg_cu:path3136'], 
					    ['svg_cu:path3482'], 
					    ['svg_cu:path3480'],
					    ['svg_cu:path3488'],
					    ['svg_cu:path3486'],
					    ['svg_cu:path3484']], 
				draw_name: [[]] };
	sim_signals["B"]   = { name: "B", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ["MV_ES A1 MUXC_MUXB; FIRE A1", 
					  "NOT_ES A1 MUXC_MUXB; FIRE A1"],
			       fire_name: ['svg_cu:text3408'], 
			       draw_data: [['svg_cu:path3370'], 
					   ['svg_cu:path3392','svg_cu:path3372','svg_cu:path3390','svg_cu:path3384']], 
			       draw_name: [[],['svg_cu:path3420']] };
	sim_signals["A0"] = { name: "A0", visible: false, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ["SBIT_S A0A1 A0 1; FIRE A0A1", 
					  "SBIT_S A0A1 A0 1; FIRE A0A1"],
			       fire_name: ['svg_cu:text3406'], 
			       draw_data: [[]], 
			       draw_name: [['svg_cu:path3096']] };
	sim_signals["A1"] = { name: "A1", visible: false, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ["SBIT_S A0A1 A1 0; FIRE A0A1", 
					  "SBIT_S A0A1 A1 0; FIRE A0A1"],
			       fire_name: [], 
			       draw_data: [[], ['svg_cu:path3094']], 
			       draw_name: [[]] };
	sim_signals["A0A1"] = { name: "A0A1", visible: true, type: "L", value: 0, default_value: 0, nbits: "2", 
				behavior: ["ADD MUXA_MICROADDR REG_MICROADDR SUM_ONE", 
					   "MV_EE MUXA_MICROADDR REG_MICROINS/MADDR",
					   "MV MUXA_MICROADDR ROM_MUXA", 
					   "MV MUXA_MICROADDR FETCH"],
				fire_name: [], 
				draw_data: [['svg_cu:path3102', 'svg_cu:path3100', 'svg_cu:path3098', 'svg_cu:path3100-9', 'svg_cu:path3088'], 
					    ['svg_cu:path3104', 'svg_cu:path3134', 'svg_cu:path3500', 'svg_cu:path3416'],
					    ['svg_cu:path3504', 'svg_cu:path3100-8', 'svg_cu:path3234-9'], 
					    ['svg_cu:path3124']], 
				draw_name: [[]] };

	/*CARGA EN REGISTROS*/
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
			       behavior: ["NOP", "MV REG_PC M2_C2"],     
			       fire_name: ['svg_p:text3179'], 
			       draw_data: [['svg_p:path3485']], 
			       draw_name: [['svg_p:path3177']] };
	sim_signals["C3"] = { name: "C3", visible: true, type: "E", value: 0, default_value:0, nbits: "1", 
			       behavior: ["NOP", "MV REG_IR BUS_IB; DECO"],
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
			       draw_data: [['svg_p:path3261-8', 'svg_p:path3901-6']], 
			       draw_name: [['svg_p:path3245']] };
	sim_signals["C7"] = { name: "C7", visible: true, type: "E", value: 0, default_value:0, nbits: "1", 
			       behavior: ["NOP", "MV REG_SR M7_C7; FIRE C"],     
			       fire_name: ['svg_p:text3655'], 
			       draw_data: [['svg_p:path3651-9']], 
			       draw_name: [['svg_p:path3681']] };

	/*TRIESTADOS*/
	sim_signals["TA"]  = { name: "TA",  visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ["NOP", "MV BUS_AB REG_MAR"],           
			       fire_name: ['svg_p:text3091'], 
			       draw_data: [['svg_p:path3089', 'svg_p:path3597', 'svg_p:path3513', 'svg_p:path3601', 'svg_p:path3187', 'svg_p:path3087', 'svg_p:path2995']], 
			       draw_name: [['svg_p:path3085']] };
	sim_signals["TD"]  = { name: "TD",  visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ["NOP", "MV BUS_DB WBS_TD; MOVE_BITSE A1A0 0 2 BUS_AB 0; FIRE A1A0"], 
			       fire_name: ['svg_p:text3103'], 
			       draw_data: [['svg_p:path3101', 'svg_p:path3587', 'svg_p:path3515', 'svg_p:path3505', 'svg_p:path3419', 'svg_p:path3099', 'svg_p:path3097']], 
			       draw_name: [['svg_p:path3095']] };
	sim_signals["T1"]  = { name: "T1",  visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ["NOP", "MV BUS_IB REG_MBR; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3105'], 
			       draw_data: [['svg_p:path3071', 'svg_p:path3069','svg_p:path3049']], 
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
			       draw_data: [['svg_p:path3589', 'svg_p:path3317', 'svg_p:path3321', 'svg_p:path3901-6', 'svg_p:path3163-2','svg_p:path3049']], 
			       draw_name: [['svg_p:path3319']] };
	sim_signals["T7"]  = { name: "T7",  visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ["NOP", "MV BUS_IB REG_RT3; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3459'], 
			       draw_data: [['svg_p:path3327', 'svg_p:path3311', 'svg_p:path3325', 'svg_p:path3323','svg_p:path3049']], 
			       draw_name: [['svg_p:path3313']] };
	sim_signals["T8"]  = { name: "T8",  visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ["NOP", "MV BUS_IB REG_SR; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3657'], 
			       draw_data: [['svg_p:path3651', 'svg_p:path3647','svg_p:path3049']], 
			       draw_name: [['svg_p:path3649']] };
	sim_signals["T9"]  = { name: "T9",  visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ["NOP", "MV BUS_IB RA_T9; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3147'], 
			       draw_data: [['svg_p:path3143', 'svg_p:path3139','svg_p:path3049']], 
			       draw_name: [['svg_p:path3133']] };
	sim_signals["T10"] = { name: "T10", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ["NOP", "MV BUS_IB RB_T10; FIRE M7; FIRE M2; FIRE M1"],
			       fire_name: ['svg_p:text3149'], 
			       draw_data: [['svg_p:path3145', 'svg_p:path3141','svg_p:path3049']], 
			       draw_name: [['svg_p:path3137']] };

	/*MULTIPLEXORES*/
	sim_signals["M1"]  = { name: "M1", visible: true, type: "L",  value: 0, default_value:0, nbits: "1",  
			       behavior: ["MV M1_C1 RBS_M1", "MV M1_C1 BUS_IB"], 
			       fire_name: ['svg_p:text3469'], 
			       draw_data: [['svg_p:path3057'], ['svg_p:path3063', 'svg_p:path3061', 'svg_p:path3059']], 
			       draw_name: [[], ['svg_p:path3447']] };
	sim_signals["M2"]  = { name: "M2", visible: true, type: "L",  value: 0, default_value:0, nbits: "1",  
			       behavior: ["MV M2_C2 BUS_IB", "ADD M2_C2 REG_PC VAL_FOUR"], 
			       fire_name: ['svg_p:text3471'], 
			       draw_data: [['svg_p:path3217', 'svg_p:path3215', 'svg_p:path3213'], 
					   ['svg_p:path3211', 'svg_p:path3209', 'svg_p:path3193', 'svg_p:path3207', 'svg_p:path3197']], 
			       draw_name: [[], ['svg_p:path3467', 'svg_p:path3467']]};
	sim_signals["M7"]  = { name: "M7", visible: true, type: "L",  value: 0, default_value:0, nbits: "1",  
			       behavior: ["MV M7_C7 BUS_IB", "MV M7_C7 SELP_M7"],          
			       fire_name: ['svg_p:text3673'], 
			       draw_data: [['svg_p:path3691', 'svg_p:path3693', 'svg_p:path3659'], ['svg_p:path3695']], 
			       draw_name: [[], ['svg_p:path3667']] };
	sim_signals["MA"]  = { name: "MA",  visible: true, type: "L", value: 0, default_value:0, nbits: "1",  
			       behavior: ["MV MA_ALU RA_T9; FIRE COP",  "MV MA_ALU REG_RT1; FIRE COP"],
			       fire_name: ['svg_p:text3463'], 
			       draw_data: [['svg_p:path3249', 'svg_p:path3161', 'svg_p:path3165'], ['svg_p:path3279']], 
			       draw_name: [[], ['svg_p:path3423']] };
	sim_signals["MB"]  = { name: "MB",  visible: true, type: "L", value: 0, default_value:0, nbits: "2",  
			       behavior: ["MV MB_ALU RB_T10; FIRE COP", "MV MB_ALU REG_RT2; FIRE COP", "MV MB_ALU VAL_FOUR; FIRE COP", "MV MB_ALU VAL_ONE; FIRE COP"], 
			       fire_name: ['svg_p:text3465'], 
			       draw_data: [['svg_p:path3281', 'svg_p:path3171', 'svg_p:path3169'], ['svg_p:path3283'], 
					   ['svg_p:path3295', 'svg_p:path3293'], ['svg_p:path3297', 'svg_p:path3299']], 
			       draw_name: [[], ['svg_p:path3425', 'svg_p:path3427']] };
	sim_signals["COP"] = { name: "COP", visible: true, type: "L", value: 0, default_value:0, nbits: "4",  
			       behavior: ["AND ALU_C6 MA_ALU MB_ALU; FIRE T6; FIRE SELP",
					  "OR ALU_C6 MA_ALU MB_ALU; FIRE T6; FIRE SELP",
					  "NOT ALU_C6 MA_ALU; FIRE T6; FIRE SELP",
					  "XOR ALU_C6 MA_ALU MB_ALU; FIRE T6; FIRE SELP",
					  "SRL ALU_C6 MA_ALU; FIRE T6; FIRE SELP",
					  "SRA ALU_C6 MA_ALU; FIRE T6; FIRE SELP",
					  "SL ALU_C6 MA_ALU; FIRE T6; FIRE SELP",
					  "RR ALU_C6 MA_ALU; FIRE T6; FIRE SELP",
					  "RL ALU_C6 MA_ALU; FIRE T6; FIRE SELP",
					  "ADD ALU_C6 MA_ALU MB_ALU; FIRE T6; FIRE SELP",
					  "SUB ALU_C6 MA_ALU MB_ALU; FIRE T6; FIRE SELP",
                                          "NOP",
					  "MUL ALU_C6 MA_ALU MB_ALU; FIRE T6; FIRE SELP",
					  "DIV ALU_C6 MA_ALU MB_ALU; FIRE T6; FIRE SELP",
					  "MOD ALU_C6 MA_ALU MB_ALU; FIRE T6; FIRE SELP",
					  "LUI ALU_C6 MA_ALU; FIRE T6; FIRE SELP"],
			       fire_name: ['svg_p:text3303'], 
			       draw_data: [['svg_p:path3237', 'svg_p:path3239']], 
			       draw_name: [['svg_p:path3009', 'svg_p:path3301']] };
	sim_signals["SELP"] = { name: "SELP",   visible: true, type: "L", value: 0, default_value:0, nbits: "2", 
				behavior: ['NOP',
				     'MV SELP_M7 REG_SR; SBIT_E SELP_M7 FLAG_U 0; FIRE M7',
				     'MV SELP_M7 REG_SR; SBIT_E SELP_M7 FLAG_I 1; FIRE M7',
				     'MV SELP_M7 REG_SR; SBIT_E SELP_M7 FLAG_O 31; SBIT_E SELP_M7 FLAG_N 30; SBIT_E SELP_M7 FLAG_Z 29; FIRE M7'],
				fire_name: ['svg_p:text3703'], 
				draw_data: [[],['svg_p:path3643'],['svg_p:path3705'],['svg_p:path3675', 'svg_p:path3331']], 
				draw_name: [[]]};
	sim_signals["I"]    = { name: "I", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			        behavior: ["MV FLAG_I VAL_ZERO; FIRE SELP", "MV FLAG_I VAL_ONE; FIRE SELP"],
			        fire_name: ['svg_p:tspan3894'], 
			        draw_data: [['svg_p:path3705']], 
			        draw_name: [[]] };
	sim_signals["U"]    = { name: "U", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			        behavior: ["MV FLAG_U VAL_ZERO; FIRE SELP", "MV FLAG_U VAL_ONE; FIRE SELP"],
			        fire_name: ['svg_p:tspan3891'], 
			        draw_data: [['svg_p:path3643']], 
			        draw_name: [[]] };

	sim_signals["SELA"] = { name: "SELA", visible: true, type: "L", value: 0, default_value:0, nbits: "5", 
			        behavior: ["FIRE MR"],  
			        fire_name: [], 
			        draw_data: [[]], 
			        draw_name: [[]] };
	sim_signals["SELB"] = { name: "SELB", visible: true, type: "L", value: 0, default_value:0, nbits: "5", 
			        behavior: ["FIRE MR"], 
			        fire_name: [], 
			        draw_data: [[]], /**/ 
			        draw_name: [[]] };
	sim_signals["SELE"] = { name: "SELE", visible: true, type: "L", value: 0, default_value:0, nbits: "5", 
			        behavior: ["FIRE MR"],              
			        fire_name: [], 
			        draw_data: [[]],                         
			        draw_name: [[]] };

	sim_signals["RA"]  = { name: "RA", visible: true, type: "L", value: 0, default_value:0, nbits: "5", 
			       behavior: ["GET RA_T9 BR RA; FIRE T9; FIRE MA;"],  
			       fire_name: ['svg_p:text3107'], 
			       draw_data: [[]], 
			       draw_name: [[]] };
	sim_signals["RB"]  = { name: "RB", visible: true, type: "L", value: 0, default_value:0, nbits: "5", 
			       behavior: ["GET RB_T10 BR RB; FIRE T10; FIRE MB;"], 
			       fire_name: ['svg_p:text3123'], 
			       draw_data: [[]], /**/ 
			       draw_name: [[]] };
	sim_signals["RE"]  = { name: "RE", visible: true, type: "L", value: 0, default_value:0, nbits: "5", 
			       behavior: ["FIRE LE"],              
			       fire_name: ['svg_p:text3125'], 
			       draw_data: [[]],                         
			       draw_name: [[]] };
	sim_signals["LE"]  = { name: "LE", visible: true, type: "E", value: 0, default_value:0, nbits: "1", 
			       behavior: ["NOP", "SET BR RE BUS_IB"], 
			       fire_name: ['svg_p:text3127'], 
			       draw_data: [['svg_p:path3153', 'svg_p:path3151', 'svg_p:path3129']], 
			       draw_name: [['svg_p:path3121']] };

	sim_signals["SE"]  = { name: "SE",     visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ['MBITS SELEC_T3 0 REG_IR OFFSET SIZE 0 SE; FIRE T3'], 
			       fire_name: ['svg_p:text3593', 'svg_p:text3431'], 
			       draw_data: [[]], 
			       draw_name: [['svg_p:path3591']] };
	sim_signals["SIZE"]   = { name: "SIZE",   visible: true, type: "L", value: 0, default_value:0, nbits: "5", 
			       behavior: ['MBITS SELEC_T3 0 REG_IR OFFSET SIZE 0 SE; FIRE T3'], 
			       fire_name: ['svg_p:text3363'], 
			       draw_data: [[]], 
			       draw_name: [[]] };
	sim_signals["OFFSET"] = { name: "OFFSET", visible: true, type: "L", value: 0, default_value:0, nbits: "5", 
			       behavior: ['MBITS SELEC_T3 0 REG_IR OFFSET SIZE 0 SE; FIRE T3'], 
			       fire_name: ['svg_p:text3707'], 
			       draw_data: [[]], 
			       draw_name: [[]] };

	sim_signals["MC"]  = { name: "MC", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ['MV_ES COP REG_IR/COP; FIRE COP', 
					  'MV_ES COP REG_MICROINS/COP; FIRE COP'],
			       fire_name: ['svg_cu:text3322'],
			       draw_data: [['svg_cu:path3320', 'svg_cu:path3142'],['svg_cu:path3318']],
			       draw_name: [[],['svg_cu:path3306']] }; /*path3210 print red color line of rest of control signals*/

	sim_signals["MR"]  = { name: "MR", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
			       behavior: ['MBIT_SN RA REG_IR REG_MICROINS/SELA 5; FIRE RA; MBIT_SN RB REG_IR REG_MICROINS/SELB 5; FIRE RB; MBIT_SN RE REG_IR REG_MICROINS/SELE 5; FIRE RE',
					  'MV_ES RA REG_MICROINS/SELA; MV_ES RB REG_MICROINS/SELB; MV_ES RE REG_MICROINS/SELE;'],
			       fire_name: ['svg_cu:text3222','svg_cu:text3242','svg_cu:text3254'],
			       draw_data: [['svg_cu:path3494','svg_cu:path3492','svg_cu:path3490','svg_cu:path3142b','svg_cu:path3188',
                                            'svg_cu:path3190','svg_cu:path3192','svg_cu:path3194','svg_cu:path3276','svg_cu:path3290',
                                            'svg_cu:path3260','svg_cu:path3196','svg_cu:path3502','svg_cu:path3278','svg_cu:path3232','svg_cu:path3292'],
					   ['svg_cu:path3270','svg_cu:path3282','svg_cu:path3300', 'svg_cu:path3258', 'svg_cu:path3260', 'svg_cu:path3278', 'svg_cu:path3196', 'svg_cu:path3502',
					    'svg_cu:path3294', 'svg_cu:path3292', 'svg_cu:path3288', 'svg_cu:path3232', 'svg_cu:path3280']],
			       draw_name: [[],['svg_cu:path3220','svg_cu:path3240','svg_cu:path3252']] };

	// W-Byte & R-Byte Selector
	sim_signals["BW"] =  { name: "BW", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
		      behavior: ['MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; MOVE_BITS RWBWA 2 2 BW; FIRE BWA; FIRE SBWA; FIRE RWBWA',
				 'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; MOVE_BITS RWBWA 2 2 BW; FIRE BWA; FIRE SBWA; FIRE RWBWA',
				 'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; MOVE_BITS RWBWA 2 2 BW; FIRE BWA; FIRE SBWA; FIRE RWBWA',
				 'MOVE_BITS BWA 2 2 BW; MOVE_BITS SBWA 2 2 BW; MOVE_BITS RWBWA 2 2 BW; FIRE BWA; FIRE SBWA; FIRE RWBWA'],
				fire_name: ['svg_p:text3433','svg_p:text3611'],
				draw_data: [[],[]],
				draw_name: [[],[]] };
	sim_signals["A1A0"] = { name: "A1A0", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
				behavior: ['MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					   'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					   'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA',
					   'MOVE_BITS BWA 0 2 A1A0; MOVE_BITS SBWA 0 2 A1A0; FIRE BWA; FIRE SBWA'],
				fire_name: ['svg_p:text3603','svg_p:text3609'],
				draw_data: [[],[]],
				draw_name: [[],[]] };
	sim_signals["BWA"] = { name: "BWA", visible: false, type: "L", value: 0, default_value: 0, nbits: "4",
				behavior: ['BSEL WBS_TD 0 8 REG_MBR 0; FIRE TD', 
					   'BSEL WBS_TD 8 8 REG_MBR 0; FIRE TD',
					   'BSEL WBS_TD 16 8 REG_MBR 0; FIRE TD',
					   'BSEL WBS_TD 24 8 REG_MBR 0; FIRE TD',
					   'BSEL WBS_TD 0 16 REG_MBR 0; FIRE TD',
					   'BSEL WBS_TD 0 16 REG_MBR 0; FIRE TD',
					   'BSEL WBS_TD 0 16 REG_MBR 0; FIRE TD',
					   'BSEL WBS_TD 0 16 REG_MBR 0; FIRE TD',
					   'BSEL WBS_TD 16 16 REG_MBR 0; FIRE TD',
					   'BSEL WBS_TD 16 16 REG_MBR 0; FIRE TD',
					   'BSEL WBS_TD 16 16 REG_MBR 0; FIRE TD',
					   'BSEL WBS_TD 16 16 REG_MBR 0; FIRE TD',
					   'MV WBS_TD REG_MBR; FIRE TD',
					   'MV WBS_TD REG_MBR; FIRE TD',
					   'MV WBS_TD REG_MBR; FIRE TD',
					   'MV WBS_TD REG_MBR; FIRE TD'],
				 fire_name: [],
				 draw_data: [[],[]],
				 draw_name: [[],[]] };
	sim_signals["SBWA"] = { name: "SBWA", visible: false, type: "L", value: 0, default_value: 0, nbits: "5",
				behavior: ['BSEL RBS_M1 0 8 BUS_DB 0; FIRE M1',
					   'BSEL RBS_M1 0 8 BUS_DB 8; FIRE M1',
					   'BSEL RBS_M1 0 8 BUS_DB 16; FIRE M1',
					   'BSEL RBS_M1 0 8 BUS_DB 24; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 0; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 0; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 0; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 0; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 16; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 16; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 16; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 16; FIRE M1',
					   'MV RBS_M1 BUS_DB; FIRE M1',
					   'MV RBS_M1 BUS_DB; FIRE M1',
					   'MV RBS_M1 BUS_DB; FIRE M1',
					   'MV RBS_M1 BUS_DB; FIRE M1',
					   'BSEL RBS_M1 0 8 BUS_DB 0; EXT_SIG RBS_M1 7; FIRE M1',
					   'BSEL RBS_M1 0 8 BUS_DB 8; EXT_SIG RBS_M1 7; FIRE M1',
					   'BSEL RBS_M1 0 8 BUS_DB 16; EXT_SIG RBS_M1 7; FIRE M1',
					   'BSEL RBS_M1 0 8 BUS_DB 24; EXT_SIG RBS_M1 7; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 0; EXT_SIG RBS_M1 15; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 0; EXT_SIG RBS_M1 15; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 0; EXT_SIG RBS_M1 15; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 0; EXT_SIG RBS_M1 15; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 16; EXT_SIG RBS_M1 15; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 16; EXT_SIG RBS_M1 15; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 16; EXT_SIG RBS_M1 15; FIRE M1',
					   'BSEL RBS_M1 0 16 BUS_DB 16; EXT_SIG RBS_M1 15; FIRE M1',
					   'MV RBS_M1 BUS_DB; FIRE M1',
					   'MV RBS_M1 BUS_DB; FIRE M1',
					   'MV RBS_M1 BUS_DB; FIRE M1',
					   'MV RBS_M1 BUS_DB; FIRE M1'],
				fire_name: [],
				draw_data: [[],[]],
				draw_name: [[],[]] };

	// I/O Devices
	sim_signals["IOR"]   = { name: "IOR", visible: true, type: "L", value: 0, default_value:0, nbits: "1",  
				 behavior: ["NOP", "MOVE_BITS KBD_IOR 0 1 IOR; MOVE_BITS SCR_IOR 0 1 IOR; FIRE KBD_IOR; FIRE SCR_IOR"],
				 fire_name: ['svg_p:text3715'],  
				 draw_data: [[], ['svg_p:path3733', 'svg_p:path3493', 'svg_p:text3715', 'svg_p:path3493']],  
				 draw_name: [[], []]};
	sim_signals["IOW"]   = { name: "IOW", visible: true, type: "L", value: 0, default_value:0, nbits: "1",  
				 behavior: ["NOP", "MOVE_BITS SCR_IOW 0 1 IOW; FIRE SCR_IOW"],
				 fire_name: ['svg_p:text3715'],  
				 draw_data: [[], ['svg_p:path3735', 'svg_p:path3493', 'svg_p:text3717', 'svg_p:path3493']],  
				 draw_name: [[], []]};


	/*
	*  Syntax of behaviors
	*/

	syntax_behavior["NOP"]   = { nparameters: 1,                         
				     operation: function(s_expr) {}  
				   };
	syntax_behavior["MV"]    = { nparameters: 3, 
				     types: ["E", "E"],      
				     operation: function(s_expr) { 
						   var r = s_expr[2].split('/');
						   if (1 == r.length)
							sim_states[s_expr[1]].value = sim_states[s_expr[2]].value; 
						   else sim_states[s_expr[1]].value = sim_states[r[0]].value[r[1]]; 
						}  
				   };
	syntax_behavior["MV_ES"] = { nparameters: 3, 
				     types: ["S", "E"],      
				     operation: function(s_expr) { 
						   var r = s_expr[2].split('/');
						   if (1 == r.length) {
						       sim_signals[s_expr[1]].value = sim_states[s_expr[2]].value; 
						       return;
						   }

						   if (typeof sim_states[r[0]].value[r[1]] != "undefined")
							sim_signals[s_expr[1]].value = sim_states[r[0]].value[r[1]]; 
						}  
				   };
	syntax_behavior["MV_EE"] = { nparameters: 3, 
				     types: ["E", "E"],      
				     operation: function(s_expr) { 
						   var r = s_expr[2].split('/');
						   if (1 == r.length) {
						       sim_states[s_expr[1]].value = parseInt(sim_states[s_expr[2]].value);
						       return;
						   }

						   if (typeof sim_states[r[0]].value[r[1]] != "undefined")
							sim_states[s_expr[1]].value = parseInt(sim_states[r[0]].value[r[1]]);
						}  
				   };
	syntax_behavior["NOT_ES"] = { nparameters: 3, 
				     types: ["S", "E"],
				     operation: function (s_expr) {
						   sim_signals[s_expr[1]].value = Math.abs(sim_states[s_expr[2]].value - 1); 
						} 
				   };
	syntax_behavior["GET"]   = { nparameters: 4, 
				     types: ["E", "E", "S"], 
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = sim_states[s_expr[2]][sim_signals[s_expr[3]].value]; 
						}  
				   };
	syntax_behavior["SET"]   = { nparameters: 4, 
				     types: ["E", "S", "E"], 
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]][sim_signals[s_expr[2]].value] = sim_states[s_expr[3]].value; 
						}  
				   };
	syntax_behavior["AND"]   = { nparameters: 4, 
				     types: ["E", "E", "E"], 
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = sim_states[s_expr[2]].value & 
										 sim_states[s_expr[3]].value;

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["OR"]    = { nparameters: 4, 
				     types: ["E", "E", "E"], 
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = sim_states[s_expr[2]].value | 
										 sim_states[s_expr[3]].value; 

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["NOT"]   = { nparameters: 3, 
				     types: ["E", "E"],      
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = ~(sim_states[s_expr[2]].value) ; 

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["XOR"]   = { nparameters: 4, 
				     types: ["E", "E", "E"], 
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = (sim_states[s_expr[2]].value) ^ 
										 (sim_states[s_expr[3]].value);

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["SRL"]   = { nparameters: 3, 
				     types: ["E", "E"],      
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = (sim_states[s_expr[2]].value) >>> 1; 

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["SRA"]   = { nparameters: 3, 
				     types: ["E", "E"],      
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = (sim_states[s_expr[2]].value) >> 1; 

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["SL"]    = { nparameters: 3, 
				     types: ["E", "E"],      
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = (sim_states[s_expr[2]].value) << 1; 

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["RR"]    = { nparameters: 3, 
				     types: ["E", "E"],      
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value =  ((sim_states[s_expr[2]].value) >>> 1) |
										 (((sim_states[s_expr[2]].value) & 1) << 31); 

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["RL"]    = { nparameters: 3, 
				     types: ["E", "E"],      
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value =  ((sim_states[s_expr[2]].value) << 1) | 
										 (((sim_states[s_expr[2]].value) & 0X80000000) >>> 31); 

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["ADD"]   = { nparameters: 4, 
				     types: ["E", "E", "E"], 
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = (sim_states[s_expr[2]].value << 0) + 
										 (sim_states[s_expr[3]].value << 0) ;
						   sim_states[s_expr[1]].value = sim_states[s_expr[1]].value & 0xFFFFFFFF ;

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;

						   if ( (sim_states[s_expr[1]].value < 0) && 
							(sim_states[s_expr[2]].value >= 0) && 
							(sim_states[s_expr[3]].value >= 0) )
							sim_states["FLAG_O"].value = 1 ;
						   else sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["SUB"]   = { nparameters: 4, 
				     types: ["E", "E", "E"], 
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = (sim_states[s_expr[2]].value << 0) - 
										 (sim_states[s_expr[3]].value << 0); 

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;

						   if ( (sim_states[s_expr[1]].value < 0) && 
							(sim_states[s_expr[2]].value >= 0) && 
							(sim_states[s_expr[3]].value >= 0) )
							sim_states["FLAG_O"].value = 1 ;
						   else sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["MUL"]   = { nparameters: 4, 
				     types: ["E", "E", "E"], 
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = (sim_states[s_expr[2]].value << 0) * 
										 (sim_states[s_expr[3]].value << 0); 

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;

						   if ( (sim_states[s_expr[1]].value < 0) && 
							(sim_states[s_expr[2]].value >= 0) && 
							(sim_states[s_expr[3]].value >= 0) )
							sim_states["FLAG_O"].value = 1 ;
						   else sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["DIV"]   = { nparameters: 4, 
				     types: ["E", "E", "E"], 
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = (sim_states[s_expr[2]].value << 0) / 
										 (sim_states[s_expr[3]].value << 0); 
						   sim_states[s_expr[1]].value = Math.floor(sim_states[s_expr[1]].value) ;

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["MOD"]   = { nparameters: 4, 
				     types: ["E", "E", "E"], 
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = (sim_states[s_expr[2]].value << 0) % 
										 (sim_states[s_expr[3]].value << 0); 

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["LUI"]   = { nparameters: 3, 
				     types: ["E", "E"],      
				     operation: function(s_expr) { 
						   sim_states[s_expr[1]].value = (sim_states[s_expr[2]].value) << 16; 

						   sim_states["FLAG_N"].value = (sim_states[s_expr[1]].value  < 0) ? 1 : 0 ;
						   sim_states["FLAG_Z"].value = (sim_states[s_expr[1]].value == 0) ? 1 : 0 ;
						   sim_states["FLAG_O"].value = 0 ;
						}  
				   };
	syntax_behavior["MBIT_I"] = { nparameters: 5, 
				     types: ["E", "E", "I", "I"],
				     operation: function (s_expr) { 
						   var offset = parseInt(s_expr[3]) ;
						   var size   = parseInt(s_expr[4]) ;

						   var n1 = sim_states[s_expr[2]].value.toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32-n1.length) + n1;
						   n2 = n2.substr(31 - (offset + size - 1), size);

						   sim_states[s_expr[1]].value = parseInt(n2, 2) ;
						}  
				   };
	syntax_behavior["MBIT_SN"] = { nparameters: 5, 
				     types: ["S", "E", "E", "I"],
				     operation: function (s_expr) {
						   var base = 0;
						   var r = s_expr[3].split('/');
						   if (1 == r.length) 
							base = sim_states[s_expr[3]].value; 
						   else
						   if (typeof  sim_states[r[0]].value[r[1]] != "undefined")
							base = sim_states[r[0]].value[r[1]]; 
						   else alert('WARN: undefined state/field pair -> ' + r[0] + '/' + r[1]);
						   var offset = parseInt(s_expr[4]) ;

						   var n1 = sim_states[s_expr[2]].value.toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1 ;
						   var n3 = n2.substr(31 - (base + offset - 1), offset) ;

						   sim_signals[s_expr[1]].value = parseInt(n3, 2) ;
						}  
				   };
	syntax_behavior["SBIT_E"] = { nparameters: 4, 
				     types: ["E", "E", "I"],
				     operation: function (s_expr) { 
						   sim_states[s_expr[1]].value = (sim_states[s_expr[1]].value & ~(1 << s_expr[3])) | 
										 (sim_states[s_expr[2]].value << s_expr[3]) ;
						}  
				   };
	syntax_behavior["SBIT_S"] = { nparameters: 4, 
				     types: ["S", "S", "I"],
				     operation: function (s_expr) {
						   //    0      1    2  3
						   // SBIT_S  A0A1  A1  0
						   sim_signals[s_expr[1]].value = (sim_signals[s_expr[1]].value & ~(1 << s_expr[3])) | 
										  (sim_signals[s_expr[2]].value << s_expr[3]) ;
						}  
				   };
	syntax_behavior["MBITS"] = { nparameters: 8, 
				     types: ["E", "I", "E", "S", "S", "I", "S"],
				     operation: function(s_expr) 
						{
						   var offset = parseInt(sim_signals[s_expr[4]].value) ;
						   var size   = parseInt(sim_signals[s_expr[5]].value) ;

						   var n1 = sim_states[s_expr[3]].value.toString(2); // to binary
						   var n2 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1) ;
						       n2 = n2.substr(31 - (offset + size - 1), size);

						   var n3 =  "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2; 
						   if ( ("1" == sim_signals[s_expr[7]].value) && ("1" == n2.substr(0, 1))) 
                                                   {    // check signed-extension
							n3 = "11111111111111111111111111111111".substring(0, 32 - n2.length) + n2;
						   }

						   sim_states[s_expr[1]].value = parseInt(n3, 2);
						}  
				   };

	syntax_behavior["BSEL"] =  { nparameters: 6, 
				     types: ["E", "I", "I", "E", "I"],
				     operation: function (s_expr) {
						   var posd = parseInt(s_expr[2]) ;
						   var poso = parseInt(s_expr[5]) ;
						   var len  = parseInt(s_expr[3]) ;

						   var n1 = sim_states[s_expr[4]].value.toString(2); // to binary
						   var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1 ;
						       n2 = n2.substr(31 - (poso + len) + 1, len);
						   var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
						   var n4 = "00000000000000000000000000000000".substr(0, posd);
						   n3 = n3 + n4;
						   sim_states[s_expr[1]].value = parseInt(n3, 2);
						}
				   };
	syntax_behavior["EXT_SIG"] =  { nparameters: 3, 
				     types: ["E", "I"],
				     operation: function (s_expr) {
						   var n1 = sim_states[s_expr[1]].value.toString(2); // to binary
						   var n2 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1) ;
						   var n3 = n2.substr(31 - s_expr[2], 31);
						   var n4 = n3;
						   if ("1" == n2[31 - s_expr[2]]) {  // check signed-extension
						       n4 = "11111111111111111111111111111111".substring(0, 32 - n3.length) + n4;
						   }
						   sim_states[s_expr[1]].value = parseInt(n4, 2);
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

						   sim_signals[s_expr[1]].value = parseInt(n3, 2);
						}
				   };
	syntax_behavior["MOVE_BITSE"] = {
					  nparameters: 6,
				    types: ["S", "I", "I", "E", "I"],
				    operation: function (s_expr) {
						   var posd = parseInt(s_expr[2]) ;
						   var poso = parseInt(s_expr[5]) ;
						   var len  = parseInt(s_expr[3]) ;

						   var n1 =  sim_states[s_expr[4]].value.toString(2); // to binary signal origin
						   n1 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1);
						   n1 = n1.substr(31 - poso - len + 1, len);

						   var n2 = sim_signals[s_expr[1]].value.toString(2); // to binary signal destiny
						   n2 = ("00000000000000000000000000000000".substring(0, 32 - n2.length) + n2);
						   var m1 = n2.substr(0, 32 - (posd + len));
						   var m2 = n2.substr(31 - posd + 1, posd);
						   var n3 = m1 + n1 + m2;

						   sim_signals[s_expr[1]].value = parseInt(n3, 2);
						}
				  };
	syntax_behavior["DECO"] = { nparameters: 1,                         
				     operation: function(s_expr) 
						{
						    var bits = sim_states['REG_IR'].value.toString(2) ;
						        bits = "00000000000000000000000000000000".substring(0, 32 - bits.length) + bits ;
						    var  op_code = parseInt(bits.substr(0,  6), 2) ; //  op-code of 6 bits
						    var cop_code = parseInt(bits.substr(28, 4), 2) ; // cop-code of 4 bits

						    // 1.- IR -> oi
						    var oi = decode_instruction(bits) ;
						    if (null == oi)
                                                    {
							 alert('ERROR: undefined instruction code ' + op_code + '/' + cop_code + ' in firmware') ;
							 sim_states['ROM_MUXA'].value = 0 ;
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

						    // 3.-  Decoded instruction
						    sim_states['REG_IR_DECO'].value = "<font color=blue>" + show_decode_instruction(oi,bits) + "</font>";
						    sim_states['DECO_INS'].value = sim_states['DECO_INS'].value + 1 ;
                                                    // F'elix request:
						    var o = document.getElementById('svg_p').contentDocument.getElementById('tspan3899'); 
						    if (o != null) o.innerHTML = show_decode_instruction(oi,bits);

						    // 4.- ROM[rom_addr] -> mc-start -> ROM_MUXA
						    sim_states['ROM_MUXA'].value = ROM[rom_addr] ;
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
								//show_states();
								//show_rf();
							    }

							    fire_stack.pop(s_expr[1]) ;

							    // 3.- check conflicts
                                                            check_ib(s_expr[1]);
							}  
					   };

		syntax_behavior["CLOCK"] = { nparameters: 1,                         
					     operation: function(s_expr) 
							{
							    // 0.- Update counter
							    var val = sim_states["CLK"].value() ;
							    sim_states["CLK"].value(val + 1);

							    // 1.- To treat the (Falling) Edge signals
							    for (var key in sim_signals) 
							    {
								 if ("E" == sim_signals[key].type) {
								     update_state(key) ;
								 }
							    }
							    //show_states();
							    //show_rf();

							    // 2.- The special (Falling) Edge part of the Control Unit...
						            sim_states["REG_MICROINS"].value = Object.create(sim_states["REG_MICROINS"].default_value);

							    sim_states["REG_MICROADDR"].value = sim_states["MUXA_MICROADDR"].value ;
							    if (typeof MC[sim_states["REG_MICROADDR"].value] != "undefined") 
							    {
								var mc_line = MC[sim_states["REG_MICROADDR"].value] ;
								for (var k in mc_line) {
								     sim_states["REG_MICROINS"].value[k] = mc_line[k];
								}
							    }

                                                            // 2.a.- update interface...
							    show_memories('MC', MC, sim_states['REG_MICROADDR'].value) ;
							    show_asmdbg_pc();

                                                            // 2.b.- update signals
							    for (var key in sim_signals)
							    {
								 sim_signals[key].value = sim_signals[key].default_value;

								 if (typeof sim_states["REG_MICROINS"].value[key] != "undefined") {
								     sim_signals[key].value = sim_states["REG_MICROINS"].value[key];
								 }
							    }

							    // 3.- Finally, 'fire' the (High) Level signals
							    for (var key in sim_signals) 
							    {
								 update_draw(sim_signals[key], sim_signals[key].value) ;

								 if ("L" == sim_signals[key].type) {
								     update_state(key) ;
								 }
							    }
							    show_states();
							    show_rf();
							}
					   };

		syntax_behavior["RESET"] = { nparameters: 1,                         
					     operation: function(s_expr) 
							{
							    // 1.a.- set states to the default state
							    for (var key in sim_states) 
							    {
								 if (typeof sim_states[key].value == "function")
						                     sim_states[key].value(sim_states[key].default_value) ;

								 else if (typeof sim_states[key].default_value == "object")
								      sim_states[key].value = Object.create(sim_states[key].default_value) ;
								 else sim_states[key].value = sim_states[key].default_value ;
							    }

							    for(var key=0; key<sim_states["BR"].length; key++)
							    {
								sim_states["BR"][key] = 0;
							    }

							    // 1.b.- reset events to empty
							    sim_events["screen"] = new Object() ;
							    sim_events["keybd"]  = new Object() ;
							    sim_events["io"]     = new Object() ;

							    // 2.- reset the I/O factory
							    for (var i=0; i<IO_INT_FACTORY.length; i++)
							    {
								IO_INT_FACTORY[i].accumulated(0) ;
								IO_INT_FACTORY[i].active = false ;
							    }

							    // 3.a.- show states & register file
							    show_states() ;
							    show_rf() ;

							    // 3.b.- show memories 
							    show_memories('MP',  MP,  1) ;
							    show_memories('MC',  MC,  1) ;
							}
					   };

