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
         *  States
         */

        var sim_states = new Object() ;
        var sim_events = new Object() ;


        /*
         *  Signals
         */

        var sim_signals = new Object();
        var fire_stack  = new Array() ;


        /*
         *  Syntax of behaviors
         */

        var syntax_behavior = new Object();

        // Print Signal
        syntax_behavior["PRINT_S"] = { nparameters: 2,
                                       types: ["S"],
                                       operation: function(s_expr)
                                                  {
                                                      console.log(s_expr[1] + ': ' + sim_signals[s_expr[1]].value);
                                                  }
                                     };

        // Print State
        syntax_behavior["PRINT_E"] = { nparameters: 2,
                                       types: ["E"],
                                       operation: function(s_expr)
                                                  {
                                                      console.log(s_expr[1] + ': ' + sim_states[s_expr[1]].value);
                                                  }
                                     };

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


        var MP       = new Object();
        var segments = new Object();


        /*
         *  States
         */

        sim_states["MRDY"]           = { name: "MRDY",           visible:false, nbits: "1", value: 0, default_value: 0, draw_data: [] };


        /*
         *  Signals
         */

        sim_signals["R"]     = { name: "R", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                 behavior: ["NOP", "MEM_READ BUS_AB BUS_DB; MOVE_BITS RWBWA 5 1 R; FIRE RWBWA"],
                                 fire_name: ['svg_p:text3533-5-2','svg_p:text3713'], 
                                 draw_data: [[], ['svg_p:path3557', 'svg_p:path3571']], 
                                 draw_name: [[], []]};

        sim_signals["W"]     = { name: "W", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                 behavior: ["NOP", "MOVE_BITS RWBWA 4 1 W; FIRE RWBWA; MEM_WRITE BUS_AB BUS_DB"],
                                 fire_name: ['svg_p:text3533-5-08','svg_p:text3527'], 
                                 draw_data: [[], ['svg_p:path3559', 'svg_p:path3575']], 
                                 draw_name: [[], []] };

        sim_signals["RWBWA"] = { name: "RWBWA", visible: false, type: "L", value: 0, default_value:0, nbits: "6", 
                                 behavior: ['NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'BSEL BUS_DB 0 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 8 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 24 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 8 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 24 8 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 16 16 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'BSEL BUS_DB 0 32 BUS_DB 0; FIRE SBWA',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP',
                                            'NOP'],
                                 fire_name: [], 
                                 draw_data: [[], []], 
                                 draw_name: [[], []] };


        /*
         *  Syntax of behaviors
         */

        syntax_behavior["MEM_READ"] = { nparameters: 3, 
                                        types: ["E", "E"],
                                        operation: function (s_expr) 
                                                   {
						      var value   = 0;
						      var address = sim_states[s_expr[1]].value ;
						      if (typeof MP[address] != "undefined") {
						   	  value = MP[address];
						      }
                                                      sim_states[s_expr[2]].value = value ;
				                      show_memories('MP', MP, address) ;
                                                   }
                                   };

        syntax_behavior["MEM_WRITE"] = { nparameters: 3, 
                                         types: ["E", "E"],
                                         operation: function (s_expr) {
						      var value   = sim_states[s_expr[2]].value ;
						      var address = sim_states[s_expr[1]].value ;
						      MP[address] = value ;
				                      show_memories('MP', MP, address) ;
                                                    }
                                   };


/*      
 *  Copyright 2015 Alejandro Calderon Mateos, Felix Garcia Carballeira, Javier Prieto Cepeda
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

        sim_signals["INTA"]     = { name: "INTA",    visible: true, type: "L", value: 1, default_value: 1, nbits: "1", 
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

                                                              sim_states[s_expr[2]].value = 1 ; // ['INT']=1
                                                           }
                                                      }
                                                   }
                                      };

/*      
 *  Copyright 2015 Alejandro Calderon Mateos, Felix Garcia Carballeira, Javier Prieto Cepeda
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


        var KBDR_ID   = 0x0100 ;
        var KBSR_ID   = 0x0104 ;


        /*
         *  States
         */

        sim_states["KBDR"]   = { name: "KBDR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };
        sim_states["KBSR"]   = { name: "KBSR",    visible:false, nbits: "32", value: 0, default_value: 0, draw_data: [] };


        /*
         *  Signals
         */

        sim_signals["KBD_IOR"] = { name: "IOR", visible: true, type: "L", value: 0, default_value:0, nbits: "1", 
		                   behavior: ["NOP", "KBD_IOR BUS_AB BUS_DB KBDR KBSR CLK; FIRE SBWA"],
                                   fire_name: ['svg_p:tspan4057'], 
                                   draw_data: [[], ['svg_p:path3863', 'svg_p:path3847']], 
                                   draw_name: [[], []]};


        /*
         *  Syntax of behaviors
         */

        syntax_behavior["KBD_IOR"] = { nparameters: 6,
                                        types: ["E", "E", "E", "E", "E"],
                                        operation: function (s_expr) 
                                                   {
                                                      var bus_ab = sim_states[s_expr[1]].value ;
                                                      var clk    = sim_states[s_expr[5]].value() ;

                                                      if ( (bus_ab != KBDR_ID) && (bus_ab != KBSR_ID) ) {
                                                              return; 
                                                      }

						      if (typeof sim_events["keybd"][clk] != "undefined")
                                                      {
						              if (bus_ab == KBDR_ID)
							          sim_states[s_expr[2]].value = sim_events["keybd"][clk];
							      if (bus_ab == KBSR_ID)
								  sim_states[s_expr[2]].value = 1;
                                                              return;
                                                      }

                                                      if (sim_states[s_expr[4]].value == 0) 
                                                      {
							      var keybuffer = document.getElementById("kdb_key").value;
							      if (keybuffer.length != 0) 
                                                              {
							          var keybuffer_rest = keybuffer.substr(1, keybuffer.length-1);
							          document.getElementById("kdb_key").value = keybuffer_rest;

							          sim_states[s_expr[4]].value = 1;
							          sim_states[s_expr[3]].value = keybuffer[0].charCodeAt(0);
							      }
                                                      }
                                                      if (sim_states[s_expr[4]].value == 1) 
                                                      {
						              sim_events["keybd"][clk] = sim_states[s_expr[3]].value;
                                                      }

						      if (bus_ab == KBSR_ID) {
							      sim_states[s_expr[2]].value = sim_states[s_expr[4]].value;
						      }
						      if (bus_ab == KBDR_ID) {
							      if (sim_states[s_expr[4]].value == 1) 
							          sim_states[s_expr[2]].value = sim_states[s_expr[3]].value;
							      sim_states[s_expr[4]].value = 0;
						      }
                                                   }
                                   };

/*      
 *  Copyright 2015 Alejandro Calderon Mateos, Felix Garcia Carballeira, Javier Prieto Cepeda
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


        var DDR_ID   = 0x1000 ;
        var DSR_ID   = 0x1004 ;


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
                                   fire_name: ['svg_p:tspan4004'], 
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
                                                      var clk    = sim_states[s_expr[5]].value() ;

                                                      if (bus_ab != DDR_ID) {
                                                          return;
                                                      }

                                                      var screen = document.getElementById("kdb_con").value;
                                                      if (typeof sim_events["screen"][clk] != "undefined") 
                                                          screen = screen.substr(0, screen.length-1);
                                                      screen = screen + String.fromCharCode(bus_db);
                                                      document.getElementById("kdb_con").value = screen;

                                                      sim_states[s_expr[3]].value = bus_db ;
                                                      sim_states[s_expr[4]].value = 1 ;
                                                      sim_events["screen"][clk]   = bus_db ;
                                                   }
                                   };

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
         *  UI configuration
         */

        var color_data_active   = "#0066FF" ;
        var color_data_inactive = "rgb(0, 0, 0)" ; // "black"

        var color_name_active   = "red" ;
        var color_name_inactive = "rgb(0, 0, 0)" ; // "black"

        var is_interactive      = false;

	var size_active         = 1.22;
	var size_inactive       = 0.02;

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
         *  get/set simware
         */

        function get_simware ( )
        {
	    if (typeof FIRMWARE['firmware'] == "undefined") 
            {
                FIRMWARE['firmware']           = new Array() ;
                FIRMWARE['mp']                 = new Object() ;
                FIRMWARE['seg']                = new Object() ;
                FIRMWARE['assembly']           = new Object() ;
                FIRMWARE['labels']             = new Object() ;
                FIRMWARE['registers']          = new Object() ;
                FIRMWARE['cihash']             = new Object() ;
                FIRMWARE['pseudoInstructions'] = new Object() ;
		FIRMWARE['stackRegister']      = new Object() ;
            }

            return FIRMWARE ;
	}
 
        function set_simware ( preSIMWARE )
        {
	    if (typeof preSIMWARE['firmware'] != "undefined") 
                FIRMWARE['firmware'] = preSIMWARE['firmware'] ;
	    if (typeof preSIMWARE['mp'] != "undefined") 
                FIRMWARE['mp'] = preSIMWARE['mp'] ;
	    if (typeof preSIMWARE['seg'] != "undefined") 
                FIRMWARE['seg'] = preSIMWARE['seg'] ;
	    if (typeof preSIMWARE['assembly'] != "undefined") 
                FIRMWARE['assembly'] = preSIMWARE['assembly'] ;
	    if (typeof preSIMWARE['labels'] != "undefined") 
                FIRMWARE['labels'] = preSIMWARE['labels'] ;
	    if (typeof preSIMWARE['registers'] != "undefined") 
                FIRMWARE['registers'] = preSIMWARE['registers'] ;
	    if (typeof preSIMWARE['cihash'] != "undefined") 
                FIRMWARE['cihash'] = preSIMWARE['cihash'] ;
	    if (typeof preSIMWARE['pseudoInstructions'] != "undefined") 
                FIRMWARE['pseudoInstructions'] = preSIMWARE['pseudoInstructions'] ;
	    if (typeof preSIMWARE['stackRegister'] != "undefined")
		FIRMWARE['stackRegister'] = preSIMWARE['stackRegister'] ;
	}
 

        /*
         *  draw
         */

	function obj_draw ( obj_name, active, color_active, color_inactive, size_active, size_inactive )
        {
	   var r = obj_name.split(':') ;

	   var o = document.getElementById(r[0]) ;
           if (o == null) return;

	   o = o.contentDocument;
           if (o == null) return;

	   o = o.getElementById(r[1]);
           if (o == null) return;

           if (active)
           {
               o.style.setProperty("stroke",       color_active, "");
               o.style.setProperty("fill",         color_active, "");
               o.style.setProperty("stroke-width", size_active,  "");
           }
           else
           {
               if (o.style.getPropertyValue("stroke") == color_inactive)
                   return;

               o.style.setProperty("stroke",       color_inactive, "");
               o.style.setProperty("fill",         color_inactive, "");
               o.style.setProperty("stroke-width", size_inactive,  "");
           }
        }

	function update_draw ( obj, value )
        {
	    if (obj.draw_data.length > 1)
	    // (different draws)
	    {
		    for (var i=0; i<obj.draw_data.length; i++)
		    for (var j=0; j<obj.draw_data[i].length; j++) {
	                   obj_draw(obj.draw_data[i][j], (i==value), color_data_active, color_data_inactive, size_active, size_inactive);
		    }

		    for (var i=0; i<obj.draw_name.length; i++)
		    for (var j=0; j<obj.draw_name[i].length; j++) {
	                   obj_draw(obj.draw_name[i][j], (i==value), color_name_active, color_name_inactive, size_active, size_inactive);
		    }
	    }
	    else if (obj.nbits == 1)
	    // (same draw) && (nbits == 1)
	    {
		    for (var j=0; j<obj.draw_data[0].length; j++) {
	                   obj_draw(obj.draw_data[0][j], (0!=value), color_data_active, color_data_inactive, size_active, size_inactive);
		    }

		    for (var j=0; j<obj.draw_name[0].length; j++) {
	                   obj_draw(obj.draw_name[0][j], (0!=value), color_name_active, color_name_inactive, size_active, size_inactive);
		    }
	    }
	    else if (obj.draw_data.length == 1)
	    // (same draw) && (nbits > 1)
	    {
		    for (var j=0; j<obj.draw_data[0].length; j++) {
	                   obj_draw(obj.draw_data[0][j], true, color_data_active, color_data_inactive, size_active, size_inactive);
		    }

		    for (var j=0; j<obj.draw_name[0].length; j++) {
	                   obj_draw(obj.draw_name[0][j], true, color_name_active, color_name_inactive, size_active, size_inactive);
		    }
	    }
	}
 
        function refresh()
        {
	    for (var key in sim_signals)
	    {
		 update_draw(sim_signals[key], sim_signals[key].value) ;
	    }
        }


        /*
         *  init_x & show_x
         */

        function init_rf ( jqdiv )
        {
            if (jqdiv == "")
            {   // without ui
                return ;
            }

            var o1_rf = "" ;

	    for (var index=0; index < sim_states['BR'].length; index++) 
            {
		 o1_rf += "<div class='col-xs-2 col-sm-1 col-md-2 col-lg-1' id='name_RF" + index + "' style='padding: 0 15 0 5;'>" +
                          "R" + index + "</div>" + 
                          "<div class='col-xs-4 col-sm-3 col-md-4 col-lg-3' id='tbl_RF"  + index + "' style='padding: 0 5 0 35;'>" +
                          sim_states['BR'][index] + "</div>" ; 
	    }

            $(jqdiv).html("<div class='row-fluid'>" + o1_rf + "</div>");
        }

        function show_rf ( ) 
        {
            // (x >>> 0): http://stackoverflow.com/questions/16155592/negative-numbers-to-binary-string

            var SIMWARE = get_simware() ;

	    for (var index=0; index < sim_states['BR'].length; index++) 
            {
                 var br_value = (sim_states['BR'][index] >>> 0).toString(16).toUpperCase() ;
                     br_value = "00000000".substring(0, 8 - br_value.length) + br_value ;

                 var obj = document.getElementById("tbl_RF" + index);
                 if (obj != null)
                     obj.innerHTML = br_value ;

		 var obj = document.getElementById("name_RF" + index);
		 if (obj != null)
                     if (typeof SIMWARE['registers'][index] != "undefined")
		         obj.innerHTML = index + "=" + SIMWARE['registers'][index] ;
	    }
        }


        var filter_states = [ "REG_IR_DECO,1",   
                              "REG_PC,0",        "REG_MAR,0", "REG_MBR,0",    "REG_IR,0", 
                              "REG_RT1,0",       "REG_RT2,0", "REG_RT3,0",    "REG_SR,0", 
                              "FLAG_O,0",        "FLAG_N,0",  "FLAG_Z,0",     "FLAG_I,0",    "FLAG_U,0", 
                              "REG_MICROADDR,0" ] ;

        var divclasses = [ "col-xs-3 col-sm-3 col-md-3 col-lg-2",
                           "col-xs-6 col-sm-6 col-md-6 col-lg-6" ] ;

        function init_eltos ( jqdiv, sim_eltos, filter, divclasses ) 
        {
            if (jqdiv == "")
            {   // without ui
                return ;
            }

            var o1 = "" ;
            for (var i=0; i<filter.length; i++)
            {
                var s = filter[i].split(",")[0] ;

                var showkey = sim_eltos[s].name;
                if (showkey.length > 7)
                    showkey = showkey.substring(0,7) + "..." ;

                var b = filter[i].split(",")[1] ;
                var divclass = divclasses[b] ;

                o1 += "<div class='" + divclass + "' style='padding: 0 5 0 5;'>" + showkey + "</div>" +
                      "<div class='" + divclass + "' id='tbl_" + s + "' style='padding: 0 5 0 0;'>" +
                      sim_eltos[s].value.toString(16) +
                      "</div>" ;
            }

            $(jqdiv).html("<div class='row-fluid'>" + o1 + "</div>");
        }

        function show_eltos ( sim_eltos, filter ) 
        {
            for (var i=0; i<filter.length; i++)
            {
                var key = filter[i].split(",")[0] ;

		var obj = document.getElementById("tbl_" + key);
		if (obj != null)
                    obj.innerHTML = sim_eltos[key].value.toString(16) ;
            }
        }

        function init_states ( jqdiv ) 
        {
            return init_eltos(jqdiv, sim_states, filter_states, divclasses ) ;
        }

        function show_states ( ) 
        {
            return show_eltos(sim_states, filter_states) ;
        }

        function init_stats ( jqdiv )
        {
            if (jqdiv == "")
            {       // without ui
		    sim_states['CLK'].value = ko.observable(sim_states['CLK'].value);
		    sim_states['DECO_INS'].value = ko.observable(sim_states['DECO_INS'].value);
		    for (var i=0; i<IO_INT_FACTORY.length; i++)
			 IO_INT_FACTORY[i].accumulated = ko.observable(IO_INT_FACTORY[i].accumulated) ;
                    return ;
            }

            // stats holder
            var o1 = "<center>" ;
            o1 += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'>Instructions</div>" +
                  "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' id='ins_context'>" +
                  "<span data-bind='text: value'>&nbsp;</span>" + 
                  "</div>" ;
            o1 += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'>CLK ticks</div>" +
                  "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' id='clk_context'>" +
                  "<span data-bind='text: value'>&nbsp;</span>" + 
                  "</div>" ;
            o1 += "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>&nbsp;</div>" ;
            for (var i=0; i<IO_INT_FACTORY.length; i++)
            {
               o1 += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'>Interrupt " + i + "</div>" +
                     "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6' id='int" + i + "_context'>" +
                     "<span data-bind='text: accumulated'>&nbsp;</span>" + 
                     "</div>" ;
            }
            o1 += "</center>" ;
            $(jqdiv).html("<div class='row-fluid'>" + o1 + "</div>");

            // knockout binding
            sim_states['CLK'].value = ko.observable(sim_states['CLK'].value);
            var ko_context = document.getElementById('clk_context');
            ko.applyBindings(sim_states['CLK'], ko_context);

            sim_states['DECO_INS'].value = ko.observable(sim_states['DECO_INS'].value);
            var ko_context = document.getElementById('ins_context');
            ko.applyBindings(sim_states['DECO_INS'], ko_context);

            for (var i=0; i<IO_INT_FACTORY.length; i++)
            {
                 IO_INT_FACTORY[i].accumulated = ko.observable(IO_INT_FACTORY[i].accumulated) ;
                 var ko_context = document.getElementById('int' + i + '_context');
                 ko.applyBindings(IO_INT_FACTORY[i], ko_context);
            }
        }

        function init_io ( jqdiv )
        {
            if (jqdiv == "")
            {       // without ui
		    for (var i=0; i<IO_INT_FACTORY.length; i++) {
			 IO_INT_FACTORY[i].period = ko.observable(IO_INT_FACTORY[i].period) ;
			 IO_INT_FACTORY[i].probability = ko.observable(IO_INT_FACTORY[i].probability) ;
		    }
                    return ;
            }

            // io holder
            var o1 = "<center>" ;
            for (var i=0; i<8; i++)
            {
               if (4==i)
               o1 += "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>Interrupt</div>" +
                     "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>Period</div>" +
                     "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>Probability</div>" ;

               o1 += "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4' style='padding: 15 5 0 10;'>" + 
                     i + 
                     "</div>" +
                     "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4' style='padding: 0 5 0 10;' id='int" + i + "_per'>" +
                     "<input type=number data-bind='value: period'>" + 
                     "</div>" +
                     "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4' style='padding: 0 5 0 10;' id='int" + i + "_pro'>" +
                     "<input type=number data-bind='value: probability' min='0' max='1' step='.1'>" + 
                     "</div>" ;
            }
            o1 += "</center>" ;
            $(jqdiv).html("<div class='row-fluid'>" + o1 + "</div>");

            // knockout binding
            for (var i=0; i<IO_INT_FACTORY.length; i++)
            {
                 IO_INT_FACTORY[i].period = ko.observable(IO_INT_FACTORY[i].period) ;
                 var ko_context = document.getElementById('int' + i + '_per');
                 ko.applyBindings(IO_INT_FACTORY[i], ko_context);

                 IO_INT_FACTORY[i].probability = ko.observable(IO_INT_FACTORY[i].probability) ;
                 var ko_context = document.getElementById('int' + i + '_pro');
                 ko.applyBindings(IO_INT_FACTORY[i], ko_context);
            }
        }


        /*
         *  show_memories
         */

        function show_memories ( name, memory, index ) 
        {
	    var o1 = "" ;
            var value = "" ;

            for (var key in memory)
            {
                 if (typeof memory[key] == "object") 
                 {
                        value = "" ;
                        for (var ks in memory[key])
                        {
                                  if (ks == "MADDR")
			              value += ks + "=0x" + parseInt(memory[key][ks]).toString(16) + " ";
                             else if (memory[key][ks] == 1)
                                      value += ks + " ";
                             else     value += ks + "="   + memory[key][ks] + " ";
                        }

			if (key == index)
			     o1 += "<tr>" + 
                                   "<td width=15%>" + "0x" + parseInt(key).toString(16) + "</td>" + 
                                   "<td><b><div style='color: blue'>" + value + "</div></b></td></tr>";
			else o1 += "<tr>" + 
                                   "<td width=15%><small>" + "0x" + parseInt(key).toString(16) + "</small></td>" + 
                                   "<td          ><div><small>" + value + "</small></div></td></tr>";
		 }
                 else 
                 {
                        value  = memory[key].toString(16) ;
                        value  = "00000000".substring(0, 8 - value.length) + value ;
                        value2 = value[0] + value[1] + ' ' +
                                 value[2] + value[3] + ' ' +
                                 value[4] + value[5] + ' ' +
                                 value[6] + value[7] ;

                        key2 = parseInt(key).toString(16) ;
                      //key2 = "00000000".substring(0, 8 - key2.length) + key2 ;

                        key3 = (parseInt(key) + 3).toString(16) ;
                      //key3 = "00000000".substring(0, 8 - key3.length) + key3 ;

                        for (skey in segments) {
                             if (parseInt(segments[skey].begin) == parseInt(key))
			         o1 += "</tbody>" + "<tbody id=begin_" + skey + ">";
                        }

			if (key == index)
			     o1 += "<tr>" +
                                   "<td width=50%><font color=blue><b>" + "0x" + key3 + "-" + key2 + "</b></font></td>" +
                                   "<td          ><font color=blue><b>" +                   value2 + "</b></font></td></tr>" ;
			else o1 += "<tr>" +
                                   "<td width=50%><small>"              + "0x" + key3 + "-" + key2 + "</small></td>" +
                                   "<td          ><small>"              + value2                   + "</small></td></tr>" ;
		 }
            }

	    if (typeof memory[index] == "undefined")
		o1 += "<tr>" + 
		      "<td width=15%><font color=blue>0x" + parseInt(index).toString(16) + "</font></td>" + 
		      "<td><font color=blue><b>&nbsp;</b></font></td></tr>";

            $("#memory_" + name).html("<center><table class='table table-hover table-condensed table-responsive'>" + 
                                      "<tbody id=none>" + o1 + "</tbody>" +
                                      "</table></center>");
        }

	function show_asmdbg_pc ( )
	{
                var SIMWARE  = get_simware() ;
                var o1 = null ;

                for (l in SIMWARE.assembly)
                {
                     o1 = $("#asmdbg" + l) ;
                     o1.css('background-color', SIMWARE.assembly[l].bgcolor);
                }

                var reg_pc     = sim_states["REG_PC"].value ;
                var curr_addr  = "0x" + reg_pc.toString(16) ;

                o1 = $("#asmdbg" + curr_addr) ;
                o1.css('background-color', '#00EE88');
	}


        /*
         *  obj2html
         */

	function firmware2html ( fir, showBinary ) 
	{
		var filter =  [ "A0,0",   "B,0",    "C,0",   "SELA,5", "SELB,5", "SELE,2", "MR,0",  "MC,0",
				"C0,0",   "C1,0",   "C2,0",  "C3,0",   "C4,0",   "C5,0",   "C6,0",  "C7,0",
				"T1,0",   "T2,0",   "T3,0",  "T4,0",   "T5,0",   "T6,0",   "T7,0",  "T8,0",  "T9,0",  "T10,0",
				"M1,0",   "M2,0",   "M7,0",  "MA,0",   "MB,0",  
                                "SELP,0", "LE,0",   "SE,0",  "SIZE,0", "OFFSET,0",
                                "BW,0",   "R,0",    "W,0",   "TA,0",   "TD,0",   "IOR,0",  "IOW,0",  
                                "I,0",    "U,0",    "COP,0" ] ;

		var h = "<tr bgcolor=#FF9900>" + 
                        "<td bgcolor=white     style='border-style: solid; border-width:0px; border-color:lightgray;'></td>" + 
                        "<td bgcolor=lightblue style='border-style: solid; border-width:1px; border-color:lightgray;'>co</td>" + 
                        "<td bgcolor=#FFCC00   style='border-style: solid; border-width:1px; border-color:lightgray;' align=center><small><b>&#181;dir</b></small></td>" +
                        "<td bgcolor=white     style='border-style: solid; border-width:0px; border-color:lightgray;'>&nbsp;&nbsp;</td>" ;
		var contSignals=1;
		for (var i=0; i<filter.length; i++) {
                     var s = filter[i].split(",")[0] ;
		     h += "<td align=center style='border-style: solid; border-width:1px;'><small><b>" + sim_signals[s].name + "</b></small></td>";
		     contSignals++;
		}
		h += "</tr>" ; 
		
		var o  = "<center>";
		    o += "<table style='table-layout:auto; border-style: solid: border-width:0px; border-collapse:collapse;'>";

                var l = 0;
                var line = "";
		var ico  = "";
		var madd = "";
		for (var i=0; i<fir.length; i++)
		{
		    var mstart = fir[i]["mc-start"];
		    var mcode  = fir[i].microcode;
		    for (j=0; j<mcode.length; j++)
		    {
                         if (++l % 10 == 1)
		             o = o + h ;
 
			 ico = "";
			 if (typeof fir[i].co != "undefined")
			     ico = parseInt(fir[i].co, 2) ;
                         var isignature = fir[i].signature.split(',')[0] ;

                         line = "";
                         if (j==0)
                              line += "<td style='border-style: solid; border-width:0px; border-color:lightgray;'><span class='badge'>" + isignature + "</span>&nbsp;</td>" +
                                      "<td style='border-style: solid; border-width:1px; border-color:lightgray;'>" + ico + "</td>" ;
                         else line += "<td style='border-style: solid; border-width:0px; border-color:lightgray;'>&nbsp;</td>" +
                                      "<td style='border-style: solid; border-width:1px; border-color:lightgray;'>&nbsp;</td>" ;

                         if (showBinary) 
                              madd = "0x" + (mstart + j).toString(16) ;
                         else madd = mstart + j ;

			 line += "<td align=center  style='border-style: solid; border-width:1px; border-color:lightgray;' bgcolor=white>" + madd + "</td>" +
                                 "<td bgcolor=white style='border-style: solid; border-width:0px; border-color:lightgray;'>&nbsp;</td>" ;
			 var mins = mcode[j] ;
		         for (var k=0; k<filter.length; k++)
			 {
                              var s = filter[k].split(",")[0] ;

			      var svalue = parseInt(sim_signals[s].default_value);
                              var newval = false;
			      if ( (typeof mins[s] != "undefined") && (!isNaN(parseInt(mins[s]))) ) 
                              {
				   svalue = parseInt(mins[s]);
                                   newval = true;
                              }

			      if ( (s == "SELA" || s == "SELB" || s == "SELE") &&
                                   (typeof mins["MADDR"] != "undefined") && (!isNaN(parseInt(mins["MADDR"]))) ) 
                              {
				   var fragment = parseInt(mins["MADDR"]).toString(2) ;
                                   fragment = "000000000000".substring(0, 12 - fragment.length) + fragment + "000" ;
                                   if (s == "SELA") {
                                       svalue = parseInt(fragment.substring(0,   5), 2);
                                       newval = true;
                                   }
                                   if (s == "SELB") {
                                       svalue = parseInt(fragment.substring(5,  10), 2);
                                       newval = true;
                                   }
                                   if (s == "SELE") {
                                       svalue = parseInt(fragment.substring(10, 15), 2);
                                       newval = true;
                                   }
                              }

                              if (showBinary) 
                              {
			          var fragment = svalue.toString(2) ;
			          var nbits    = parseInt(sim_signals[s].nbits);
			          svalue = "00000000000000000000000000000000".substring(0, nbits - fragment.length) + fragment;

                                  var ngreen = filter[k].split(",")[1] ;
                                  var part1  = svalue.substring(0, ngreen);
                                  var part2  = svalue.substring(ngreen);
                                  svalue     = "<font color=green>" + part1 + "</font>" + part2 ;
                              }

			      if (newval)
			           line += "<td align=center style='border-style: solid; border-width:1px;'><b>" + svalue + "</b></td>";
			      else line += "<td align=center style='border-style: solid; border-width:1px;'><font color='grey'>" + svalue + "</font></td>";
			 }

			 o += "<tr>" + line + "</tr>" ;
		    }
		}

		o += "</table></center>";
		return o;
	}

	function labels2html_aux ( slebal, c )
	{
	     var clabel = "" ;
	     var wadd   = "" ;

	     wadd = "0x" + (parseInt(c)+0).toString(16);
	     if (typeof slebal[wadd] != "undefined") 
		  clabel = clabel + "<span class='badge'>" + slebal[wadd] + "</span>" ;
	     else clabel = clabel + "&nbsp;" ;
	     wadd = "0x" + (parseInt(c)+1).toString(16);
	     if (typeof slebal[wadd] != "undefined") 
		  clabel = clabel + "<span class='badge'>" + slebal[wadd] + "</span>" ;
	     else clabel = clabel + "&nbsp;" ;
	     wadd = "0x" + (parseInt(c)+2).toString(16);
	     if (typeof slebal[wadd] != "undefined") 
		  clabel = clabel + "<span class='badge'>" + slebal[wadd] + "</span>" ;
	     else clabel = clabel + "&nbsp;" ;
	     wadd = "0x" + (parseInt(c)+3).toString(16);
	     if (typeof slebal[wadd] != "undefined") 
		  clabel = clabel + "<span class='badge'>" + slebal[wadd] + "</span>" ;
	     else clabel = clabel + "&nbsp;" ;

	     return clabel ;
	}

	function mp2html ( mp, labels, seg )
	{
                var slebal = new Object();
                for (l in labels)
                     slebal[labels[l]] = l;

		var o  = "";
		    o += "<center>" +
		 	 "<table style='table-layout:auto; border-style: solid; border-width:0px;'>" +
			 "<tr>" +
			 "<th style='border-style: solid; border-width:0px;'>labels</th>" +
			 "<th style='border-style: solid; border-width:1px;'>address</th>" +
			 "<th style='border-style: solid; border-width:1px;'>" + 
                         "<table border=0 width=100%><tr>" + 
                         "<td width=20% align=left>&nbsp;<sub>31</sub></td><td width=60% align=center>content (binary)</td><td width=20% align=right><sub>0</sub>&nbsp;</td>" +
                         "</tr></table>" +
			 "<th style='border-style: solid; border-width:0px;' align=right>&nbsp;&nbsp;segment</th>" +
			 "</tr>" ;

	   	var color="white";
	        for (skey in seg) 
	        {
                     c_begin =  parseInt(seg[skey].begin) ;
                     c_end   =  parseInt(seg[skey].end) ;
		     color   =  seg[skey].color;
                     rows    =  0 ;
                     var x   =  "" ;

		     for (var i = c_begin; i<c_end; i++)
		     {
                             c = "0x" + i.toString(16) ;
                             if (typeof mp[c] == "undefined") {
                                 continue;
                             }

                             if (0 == rows) {
			         o += "<tr style='font-family:verdana; font-size:12pt;'>" +
				      "<td align=right  style='border-style: solid; border-width:0px;'>" + labels2html_aux(slebal,c) + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + c + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + 
                                       mp[c].substr(0,8)  + "&nbsp;" + mp[c].substr(8,8)  + "&nbsp;" + mp[c].substr(16,8) + "&nbsp;" + mp[c].substr(24,8) + "</td>" +
				      "<td rowspan=" ;
                             } else {
			         x += "<tr style='font-family:verdana; font-size:12pt;'>" +
				      "<td align=right  style='border-style: solid; border-width:0px;'>" + labels2html_aux(slebal,c) + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + c + "</td>" +
				      "<td              style='border-style: solid; border-width:1px;' bgcolor=" + color + ">" + 
                                      mp[c].substr(0,8)  + "&nbsp;" + mp[c].substr(8,8)  + "&nbsp;" + mp[c].substr(16,8) + "&nbsp;" + mp[c].substr(24,8) + "</td>" +
				      "</tr>" ;
                             }

                             rows++;
	             }

		     if (0 == rows) {
			 o += "<tr style='font-family:verdana; font-size:12pt;'>" +
			      "<td>&nbsp;</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">0x" + parseInt(seg[skey].begin).toString(16) + "</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">&nbsp;</td>" +
			      "<td rowspan=" ;
			 x += "<tr style='font-family:verdana; font-size:12pt;'>" +
			      "<td>&nbsp;</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">0x" + parseInt(seg[skey].end).toString(16) + "</td>" +
			      "<td style='border-style: solid; border-width:1px;' bgcolor=" + color + ">&nbsp;</td>" +
			      "<td>&nbsp;</td>" +
			      "</tr>" ;
                        rows = 2 ;
		     } 

                     o += rows + " align=right>" + seg[skey].name + "&nbsp;</td></tr>" + x ;

	             if (seg[skey].name != "stack") {
		         o += "<tr style='font-family:verdana; font-size:12pt;'>" + 
                              "<td>&nbsp;</td>" + 
                              "<td valign=middle align=center height=25px>...</td>" + 
                              "<td valign=middle align=center height=25px>...</td>" + 
                              "<td>&nbsp;</td>" + 
                              "</tr>" ;
	             }
	        }

		o += "</table>" +
		     "</center><br>" ;

		return o;
	}

        function segments2html ( segments )
        {
	   var o1 = "<br>" ;

	   o1 += " <center>" + 
                 " <table height=400px>" +
	         " <tr>" +
	         " <td>" +
	         "<table style='border-style: solid' border=1 width=100% height=100%>" ;
	   for (skey in segments) 
	   {
	        if (segments[skey].name != "stack")
	   	    o1 += "<tr><td valign=middle align=center bgcolor=" + segments[skey].color + ">" + 
                                segments[skey].name + "</td></tr>" +
	   	          "<tr><td valign=middle align=center height=25px>...</td></tr>" ;
	   }
	   o1 += "<tr><td valign=middle align=center bgcolor=" + segments['stack'].color + 
	         ">" + segments['stack'].name + "</td></tr>" +
	         "</table>" +
	         " </td>" +
	         " <td width=20px>&nbsp;</td>" +
	         " <td>" +
	         " <table style='border-style: solid; border-width:0px; width:100%; height:100%'>" ;

           var offset = 0 ;
	   for (skey in segments) 
	   {
               offset += 1 ;
	       if (segments[skey].name != "stack")
	   	 o1 += "<tr>" +
	   	       "    <td valign=middle align=center style='display: block; position: absolute;'>" +
	   	       "    <div id='compile_begin_" + segments[skey].name + "' " + 
                       "         style='position:relative; bottom:" + (3*offset) + "px;'>" + segments[skey].begin + "</div>" +
	   	       "    </td>" +
	   	       " </tr>" +
	   	       " <tr>" +
	   	       "    <td valign=middle align=center style='display: block; position: absolute;'>" +
	   	       "    <div id='compile_end_"   + segments[skey].name + "' " + 
                       "         style='position:relative; bottom:" + (2*offset) + "px;'>" + segments[skey].end + "</div>" +
	   	       "    </td>" +
	   	       " </tr>" ;
	   }
	   o1 += "  <tr>" +
	         "  <td valign=middle align=center style='display: block; position: absolute;'>" +
	         "<div id='compile_end_"  + segments['stack'].name + "' style='position:relative;bottom:25px;'>[SP_n]</div>"+
	         "<div id='compile_begin_" + segments['stack'].name + "' style='position:relative;bottom:-20px;'>[SP_0]</div>"+
	         "  </td>" +
	         "  </tr>" +
	         " </table>" +
	         " </td>" +
	         " </tr>" +
	         " </table>" +
	         " </center>" ;

	   return o1 ;
        }

	function assembly2html ( mp, labels, seg, asm )
	{
                var s1_label = "" ;
                var s1_instr = "" ;
                var s2_label = "" ;
                var s2_instr = "" ;
                var bgc = "#F0F0F0" ;
                var o = "" ;

                o += "<center><table data-role=table class='table ui-responsive'><tbody>" ;
                for (l in asm)
                {
                     if  (bgc == "#F0F0F0")
                          bgc = "#F8F8F8" ;
                     else bgc = "#F0F0F0" ;

                     asm[l].bgcolor = bgc ;

                     // without pseudo
                     r = asm[l].source.split(":") ;
                     if (r.length > 1) 
                     {
                         s1_label = r[0] + ":" ;
                         s1_instr = r[1] ;
                     }
                     else
                     {
                         s1_label = "&nbsp;" ;
                         s1_instr = r[0] ;
                     }

                     // with pseudo
                     r = asm[l].source_original.split(":") ;
                     if (r.length > 1) 
                     {
                         s2_label = r[0] + ":" ;
                         s2_instr = r[1] ;
                     }
                     else
                     {
                         s2_label = "&nbsp;" ;
                         s2_instr = r[0] ;
                     }

                     // join the pieces...
                     o +=  "<tr id='asmdbg" + l + "' bgcolor='" + asm[l].bgcolor + "'>" +
                           "<td style='line-height:0.9;' width='10%' id='bp" + l + "' " + 
                           "    onclick='asmdbg_set_breakpoint(" + l + "); if(event.stopPropagation) event.stopPropagation();'>&nbsp;</td>" +
                           "<td style='line-height:0.9;' width='15%'>" + l + "</td>" +
                           "<td style='line-height:0.9;' width='12%' align=right>" + s1_label               + "</td>" +
                           "<td style='line-height:0.9;' width='25%' align=left>"  + s1_instr               + "</td>" +
                           "<td style='line-height:0.9;' width='12%' align=right>" + s2_label               + "</td>" +
                           "<td style='line-height:0.9;' width='25%' align=left>"  + s2_instr               + "</td>" +
                           "</tr>" ;
                }
                o += "</tbody></table></center>" ;

                return o ;
	}


        /*
         *  play/stop
         */

	function asmdbg_set_breakpoint ( addr )
	{
                var SIMWARE  = get_simware() ;
                var hexaddr  = "0x" + addr.toString(16) ;

                var o1       = document.getElementById("bp"+hexaddr) ;
                var bp_state = SIMWARE.assembly[hexaddr].breakpoint ;

                if (bp_state === true) {
		    bp_state = false ;
                    o1.innerHTML = '&nbsp;' ;
	        } else {
	 	    bp_state = true ;
                    o1.innerHTML = '<img height=22 src="images/stop.png">' ;
	        }

                SIMWARE.assembly[hexaddr].breakpoint = bp_state ;
	}

        var DBG_stop  = true ;
        var DBG_delay = 300 ;
        var DBG_level = "instruction" ;

	function asmdbg_stop ( btn1 )
	{
                $(btn1).text("Run") ;
                $(btn1).removeClass("ui-icon-minus") ;
                $(btn1).addClass("ui-icon-carat-r") ;
                $(btn1).css("backgroundColor", "#313131") ;

                DBG_stop = true;
	}

	function asmdbg_play ( btn1 )
	{
                $(btn1).css("backgroundColor", 'rgb(51, 136, 204)') ;
                $(btn1).text("Stop") ;
                $(btn1).removeClass("ui-icon-carat-r") ;
                $(btn1).addClass("ui-icon-minus") ;

                if (DBG_stop) 
                {
	            asmdbg_stop(btn1) ;
                    return ;
                }

                var ret = false ;
	        if (DBG_level == "instruction")
                     ret = execute_instruction() ;
                else ret = execute_microinstruction() ;

                if (ret === false) 
                {
	            asmdbg_stop(btn1) ;
                    return ;
                }

                var SIMWARE = get_simware() ;
                reg_pc      = sim_states["REG_PC"].value ;
                curr_addr   = "0x" + reg_pc.toString(16) ;

                if ( (typeof SIMWARE.assembly[curr_addr] != "undefined") && (SIMWARE.assembly[curr_addr].breakpoint) ) 
                {
	            asmdbg_stop(btn1) ;
                    alert("Breakpoint @ " + curr_addr + ":\n" + 
                          "Instruction at " + curr_addr + " is going to be fetched.") ;
                    return ;
                }

                setTimeout(asmdbg_play, DBG_delay, btn1) ;
	}

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
         *  checking & updating
         */

        function check_ib ( fired )
        {
            var tri_name = "";
            var tri_state_names = [ "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10" ] ;

            if (tri_state_names.indexOf(fired) == -1)
                return; 

            // 1.- counting the number of active tri-states 
            var tri_activated = 0;
	    var tri_activated_name = "";
            for (var i=0; i<tri_state_names.length; i++)
            {
                 tri_name = tri_state_names[i] ;
                 if (sim_signals[tri_name].value !=0)
		 {
                     tri_activated ++ ;
		     tri_activated_name=tri_name;
		 }
                 if (tri_activated > 1)
                     break ;
            }

            // 2.- paint the bus if any tri-state is active
            if (tri_activated > 0) 
                update_draw(sim_signals[tri_activated_name], 1) ;

            // 3.- check if more than one tri-state is active
            $("#busfire").hide();
            if (tri_activated > 1) {
                $("#busfire").show();
                sim_states["BUS_IB"].value = 0xFFFFFFFF;
            }       
        }

        function check_behavior ( )
        {
            for (var key in sim_signals)
            {
                for (var key2 in sim_signals[key].behavior)
                {
		    // 1.- Split several behaviors, example: "MV D1 O1; MV D2 O2"
                    var behaviors = sim_signals[key].behavior[key2].split(";") ;

		    // 2.- For every behavior...
		    for (var i=0; i<behaviors.length; i++)
                    {
			    var behavior_i = behaviors[i].trim();
			    var behavior_k = behavior_i.split(" ") ;

			    if (typeof (syntax_behavior[behavior_k[0]]) == "undefined")
			    {
				alert("ALERT: Unknown operation -> " + behavior_k[0] + " (" + behavior_i + ")");
				return;
			    }

			    if (behavior_k.length != syntax_behavior[behavior_k[0]].nparameters)
			    {
				alert("ALERT: Behavior has an incorrect number of elements --> " + behavior_i + "/" + syntax_behavior[behavior_k[0]].nparameters);
				return;
			    }

			    for (var i=1; i<behavior_k.length; i++) 
			    {
				if ("E" == syntax_behavior[behavior_k[0]].types[i-1])
				{
				     var s = behavior_k[i].split('/') ;

				     if (typeof (sim_states[s[0]]) == "undefined") 
				     {
					 alert("ALERT: Behavior has an undefined reference to a object state -> '" + behavior_i);
					 return;
				     }
				}
				else if ("S" == syntax_behavior[behavior_k[0]].types[i-1])
				{
				     var s = behavior_k[i].split('/') ;

				     if (typeof (sim_signals[s[0]]) == "undefined")
				     {
					 alert("ALERT: Behavior has an undefined reference to a signal -> '" + behavior_i);
					 return;
				     }
				}
			    }
                    }
                }
            }
        }

        function load_check()
        {
            // 1.- check if no signals are defined...
            if (0 == sim_signals.length) {
                alert("ALERT: empty signals!!!");
            }

            // 2.- check if no states are defined...
            if (0 == sim_states.length) {
                alert("ALERT: empty states!!!");
            }

            // 3.- check behavior syntax...
            check_behavior();
        }

        function compute_behavior (input_behavior)
        {
            // 1.- Split several behaviors, e.g.: "MV D1 O1; MV D2 O2"
            var s_exprs = input_behavior.split(";");

            // 2.- For every behavior...
            for (var i=0; i<s_exprs.length; i++)
            {
                    // 2.1.- ...to remove white spaces from both sides, e.g.: "  MV D1 O1  " (skip empty expression, i.e. "")
		    s_exprs[i] = s_exprs[i].trim() ;
                    if ("" == s_exprs[i]) continue ;

                    // 2.2.- ...to split into expression, e.g.: "MV D1 O1"
		    var s_expr = s_exprs[i].split(" ");

                    // 2.3.- ...to do the operation 
		    syntax_behavior[s_expr[0]].operation(s_expr);
            }
        }

        function update_state ( key )
        {
           var signal_value = 0;
           var input_behavior = "";

           switch(sim_signals[key].behavior.length)
           {
                case 0:
                     return; // Cuando behavior no tiene comportamiento, no hacemos nada en actualizacion de estado
                     break;

                case 1:
                     signal_value = sim_signals[key].value ;
                     input_behavior = sim_signals[key].behavior[0] ;
                     break;

                default:
                     signal_value = sim_signals[key].value ;
                     if (signal_value < sim_signals[key].behavior.length)
                          input_behavior = sim_signals[key].behavior[signal_value] ;
                     else alert('ALERT: there are more signals values than behaviors defined!!!!\n' +
                                'key: ' + key + ' and signal value: ' + signal_value);
                     break;
           }

           compute_behavior(input_behavior) ;
        }

        function update_signal_firmware ( key )
        {
            var SIMWARE = get_simware() ;

	    var assoc_i = -1;
            for (var i=0; i<SIMWARE['firmware'].length; i++) {
		 if (parseInt(SIMWARE['firmware'][i]["mc-start"]) > sim_states["REG_MICROADDR"].value) { break; }
		 assoc_i = i ;
            }

            if (-1 == assoc_i) 
            {
	        alert("A new 'unknown' instruction is inserted,\n" + 
                      "please edit it (co, nwords, etc.) in the firmware textarea.") ;

                var new_ins = new Object() ;
                new_ins["name"]            = "unknown" ;
                new_ins["signature"]       = "unknown" ;
                new_ins["signatureGlobal"] = "unknown" ;
                new_ins["co"]              = 0 ;
                new_ins["nwords"]          = 0 ;
                new_ins["mc-start"]        = 0 ;
                new_ins["fields"]          = new Array() ;
                new_ins["microcode"]       = new Array() ;

                SIMWARE['firmware'].push(new_ins) ;
                assoc_i = SIMWARE['firmware'].length - 1 ;
            }

	    var pos = sim_states["REG_MICROADDR"].value - parseInt(SIMWARE['firmware'][assoc_i]["mc-start"]) ;
	    if (typeof SIMWARE['firmware'][assoc_i]["microcode"][pos] == "undefined") {
		SIMWARE['firmware'][assoc_i]["microcode"][pos] = new Object() ;
	    }
	    SIMWARE['firmware'][assoc_i]["microcode"][pos][key] = sim_signals[key].value ;

            if (sim_signals[key].default_value == sim_signals[key].value)
	        delete SIMWARE['firmware'][assoc_i]["microcode"][pos][key] ;

	    // show memories...
	    var bits = sim_states['REG_IR'].value.toString(2) ;
	    bits = "00000000000000000000000000000000".substring(0, 32 - bits.length) + bits ;
	    //var op_code = parseInt(bits.substr(0, 6), 2) ; // op-code of 6 bits

            show_memories('MP',  MP,  sim_states['REG_PC'].value) ;
            show_memories('MC',  MC,  sim_states['REG_MICROADDR'].value) ;
	}
 
        function update_signal (event)
        {
	    if (false === is_interactive)
                return;

            var user_input = null ;

            for (var key in sim_signals)
            {
                for (var j=0; j<sim_signals[key].fire_name.length; j++)
                {
	            var r = sim_signals[key].fire_name[j].split(':') ;
                    if (r[1] == event.currentTarget.id)
                    {
                        if (sim_signals[key].nbits == 1)
                        {
                            sim_signals[key].value = (sim_signals[key].value + 1) % 2;
                        }

                        if (sim_signals[key].nbits > 1)
                        {
                            var input_help = "";
                            var nvalues = Math.pow(2, sim_signals[key].nbits) ;
                            if (sim_signals[key].behavior.length == nvalues)
                            {
                                for (var k = 0; k < sim_signals[key].behavior.length; k++) {
                                     input_help = input_help + "\n  " + k.toString(10) ;
                                     input_help = input_help + ": " + sim_signals[key].behavior[k].split(";")[0];
                                }
                            }
                            else {
                                input_help = input_help + "\n  " + "0 - " + (nvalues - 1);
                            }

                           if (user_input == null)
                           {
                                user_input = prompt("Decimal values for " + key + ": " + input_help + "\n", 
                                                    sim_signals[key].value) ;
                           }
                           if (user_input != null)
                           {
                                sim_signals[key].value = user_input ;
                           }
                        }

	                if (true === is_interactive) 
                        {
			    // update REG_MICROINS
			    sim_states["REG_MICROINS"].value[key] = sim_signals[key].value ;

			    // update MC[uADDR]
			    if (typeof MC[sim_states["REG_MICROADDR"].value] == "undefined") {
				MC[sim_states["REG_MICROADDR"].value] = new Object() ;
			    }
			    MC[sim_states["REG_MICROADDR"].value][key] = sim_signals[key].value ;

	                    // update ROM[..]
                            update_signal_firmware(key) ;

			    // update save-as...
                            var SIMWARE = get_simware() ;
			    document.getElementById("inputFirmware").value = saveFirmware(SIMWARE) ;
			}
			
                        // fire signal
                        compute_behavior('FIRE ' + key) ;
                    }

                }
            }

	    show_states();
	    show_rf();
        }

        function update_memories ( preSIMWARE )
        {
	    // 1.- load the SIMWARE
            set_simware(preSIMWARE) ;
            var SIMWARE = get_simware() ;

	    // 2.- load the MC from ROM['firmware']
            MC = new Object() ;
            for (var i=0; i<SIMWARE['firmware'].length; i++)
	    {
	       var last = SIMWARE['firmware'][i]["microcode"].length ; // mc = microcode
               var mci  = SIMWARE['firmware'][i]["mc-start"] ;
	       for (var j=0; j<last; j++)
	       {
		   MC[mci] = SIMWARE['firmware'][i]["microcode"][j] ;
		   mci++;
	       }
	    }

	    // 3.- load the ROM (2/2)
            ROM = new Object() ;
            for (var i=0; i<SIMWARE['firmware'].length; i++)
	    {
               if ("fetch" == SIMWARE['firmware'][i]['name']) {
                   continue ;
               }

	       var ma = SIMWARE['firmware'][i]["mc-start"] ;
	       var co = parseInt(SIMWARE['firmware'][i]["co"], 2) ;
               var cop = 0 ;
	       if (typeof SIMWARE['firmware'][i]["cop"] != "undefined")
	           cop = parseInt(SIMWARE['firmware'][i]["cop"], 2) ;

               var rom_addr = 64*co + cop ;
	       ROM[rom_addr] = ma ;
               SIMWARE['cihash'][rom_addr] = SIMWARE['firmware'][i]['signature'] ;
	    }

	    // 4.- load the MP from SIMWARE['mp']
            MP = new Object() ;
	    for (var key in SIMWARE['mp'])
	    {
	       var kx = parseInt(key)
	       var kv = parseInt(SIMWARE['mp'][key].replace(/ /g,''), 2) ;
	       MP[kx] = kv ;
	    }

	    // 5.- load the segments from SIMWARE['seg'] 
            segments = new Object() ;
	    for (var key in SIMWARE['seg'])
	    {
	       segments[key] = SIMWARE['seg'][key] ;
	    }

	    // 6.- show memories...
            show_memories('MP',  MP,  1) ;
            show_memories('MC',  MC,  1) ;
	}
 

        /*
         *  USER INTERFACE
         */

        /* 1) INIT */
        function init ()
        {
            // 1.- it checks if everything is ok 
            load_check() ;

            // 2.- display the information holders
            init_states("#states_ALL") ; 
            init_rf("#states_BR") ; 

            init_stats("#stats_ALL") ; 
            init_io("#io_ALL") ; 
        }

        function init_eventlistener ()
        {
            // 3.- for every signal, set the click event handler
            for (var key in sim_signals) 
            {
                for (var j=0; j<sim_signals[key].fire_name.length; j++)
                {
			   var r  = sim_signals[key].fire_name[j].split(':') ;
  			   var o  = document.getElementById(r[0]).contentDocument;
                           if (o != null) 
  			       o.getElementById(r[1]).addEventListener('click', update_signal, false);
                }
            }
        }

        /* 2) INTERACTIVE MODE */
        function set_interactive_mode ( interactive )
        {
            // 1.- set the global variable of in which mode we are
	    is_interactive = interactive ;

            // // 2.- be sure of starting on mc=1
            // if (0 == sim_states["REG_MICROADDR"].value) {
            //     compute_behavior("CLOCK") ;
            // }
        }

        function get_interactive_mode()
        {
            // 1.- get the global variable of in which mode we are
	    return is_interactive ;
        }

        /* 3) EXECUTION */
        function reset()
        {
            compute_behavior("RESET") ;

            if (typeof segments['code'] != "undefined") 
            {
                sim_states["REG_PC"].value = parseInt(segments['code'].begin) ;
                show_asmdbg_pc() ;
            }
	    if (typeof segments['stack']!= "undefined")
	    {
		sim_states["BR"][FIRMWARE.stackRegister] = parseInt(segments['stack'].begin);
	    }
            compute_behavior("CLOCK") ;
        }

        function execute_microinstruction ()
        {
	        if (false === is_interactive)
                {
			if (typeof segments['code'] == "undefined")
			{
			    alert('code segment does not exist!');
			    return false;
			}

			if (  (parseInt(sim_states["REG_MICROADDR"].value) == 0) &&
                             ((parseInt(sim_states["REG_PC"].value) >= parseInt(segments['code'].end)) || 
                              (parseInt(sim_states["REG_PC"].value) <  parseInt(segments['code'].begin))) )
			{
			    alert('PC register points outside the code segment!');
			    return false;
			}
                }

                compute_behavior("CLOCK") ;
        }

        function execute_microprogram ()
        {
                // 1.- while the microaddress register doesn't store the fetch address (0), execute micro-instructions
		do    
            	{
                	compute_behavior("CLOCK") ;
            	}
		while (
                         (0 != sim_states["REG_MICROADDR"].value) && 
                         (typeof MC[sim_states["REG_MICROADDR"].value] != "undefined") 
                      );
        }

        function execute_instruction ()
        {
                if (typeof segments['code'] == "undefined")
                {
                    alert('code segment does not exist!');
                    return false;
                }

		if (  (parseInt(sim_states["REG_MICROADDR"].value) == 0) &&
		     ((parseInt(sim_states["REG_PC"].value) >= parseInt(segments['code'].end)) || 
		      (parseInt(sim_states["REG_PC"].value) <  parseInt(segments['code'].begin))) )
                {
                    alert('PC register points outside the code segment!');
                    return false;
                }

                execute_microprogram() ;
                return true;
        }

        /* 5) LOAD/SAVE */
        function load_firmware ( textFromFileLoaded )
        {
                if ("" == textFromFileLoaded.trim())
                {
                    var preSIMWARE = new Object() ;
                    preSIMWARE.error = 'Empty Firmware' ;
                    return preSIMWARE;
                }

                try 
                {
			var preSIMWARE = JSON.parse(textFromFileLoaded);
			update_memories(preSIMWARE);
                        preSIMWARE.error = null;
                        return preSIMWARE;
                }
                catch (e) 
                {
			try 
			{
                            var preSIMWARE = loadFirmware(textFromFileLoaded);
                            if (preSIMWARE.error == null) 
                                update_memories(preSIMWARE);

                            return preSIMWARE;
			}
			catch (e) {
			    // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError
                            var preSIMWARE = new Object() ;
                            preSIMWARE.error = 'ERROR: at line: ' + e.lineNumber + ' and column: ' + e.columnNumber ;
                            return preSIMWARE;
			}
                }
        }

/*      
 *  Copyright 2015 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda
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
 *  Token management
 */

function nextToken ( context )
{
          // skip whitespaces
          while ( ("# \t\n\r".indexOf(context.text[context.t]) != -1) && (context.t < context.text.length) )
          {
                 // # till end of line
                 if (context.text[context.t] == '#') {
		     while ( ("\n".indexOf(context.text[context.t]) == -1) && (context.t < context.text.length) ) {
		    	      context.t++;
		     }
                 }

                 if (context.text[context.t] == '\n') {
                     context.line++;
                     context.newlines.push(context.t) ;
                 }

		 context.t++;
	  }
	  
          // if {},()=: token, insert token
          if ( ("{},()=:".indexOf(context.text[context.t]) != -1) && (context.t < context.text.length) )
          {
               var tok = context.text[context.t] ;
               context.t++ ;
               context.tokens.push(tok) ;
               context.i = context.tokens.length - 1 ;
               return context ;
          }

          // read until whitespaces
          var first = context.t ;
          while ( ("{},()=:# \t\n\r".indexOf(context.text[context.t]) == -1) && (context.t < context.text.length) ) {
		 context.t++;
	  }
          var last = context.t ;

          // insert token
          var tok  = context.text.substring(first, last) ;
	  tok = tok.toLowerCase().trim() ;
          context.tokens.push(tok) ;
          context.i = context.tokens.length - 1 ;
          return context ;
}

function getToken ( context )
{
	 return context.tokens[context.i] ;
}

function isToken ( context, text )
{
         return (getToken(context) == text.trim()) ;
}

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
 *  Error handler
 */

function firmwareError ( context, msgError )
{
        // detect lines
	var line2 = 0 ;
        if (context.newlines.length > 0)
            line2 = context.newlines[context.newlines.length - 1] + 1;

	var line1 = 0 ;
        if (context.newlines.length > 1)
            line1 = context.newlines[context.newlines.length - 2] + 1;

        var lowI = line1 ;

        var highI = context.t;
        for (; (typeof context.text[highI+1] != "undefined") && (context.text[highI+1] != '\n'); highI++) ;
        var line3 = highI + 2 ;

        highI++;
        for (; (typeof context.text[highI+1] != "undefined") && (context.text[highI+1] != '\n'); highI++) ;

        // print lines
        context.error = "...\n" ;
        for (var i=lowI; i<highI; i++) 
        {
             if (i == line1) context.error += " " + (context.line-1) + "\t" ;
             if (i == line2) context.error += "*" + context.line     + "\t" ;
             if (i == line3) context.error += " " + (context.line+1) + "\t" ;

             context.error += context.text[i];
        }
        context.error += "\n...\n\n" +
                         "(*) Problem around line " + context.line + ": " + msgError + ".\n" ;

        return context;
}


/*
 *  Load Firmware
 */

function read_microprg ( context )
{
	   // {
	   //           (TA, R, BW=11, C1=1),
	   //    etiq:  (T2, C0),
	   //           (A0, B=0, C=0)
	   // }

           var microprograma = new Array();

	   // match mandatory {
	   if (! isToken(context, "{") )
	         return firmwareError(context, "Expected '{' not found") ;

           nextToken(context) ;
	   while (! isToken(context, "}") )
	   {
	       var microInstruccionAux = new Object();

	       // match optional etiq:
	       if (! isToken(context, "(") )
	       {
	           // match mandatory LABEL
		   var newLabelName = getToken(context) ;
		   for (var contadorMCAux in context.etiquetas)
		   {
			if (context.etiquetas[contadorMCAux] == newLabelName)
			    return firmwareError(context, "Label '" + getToken(context) + "' is repeated");
		   }
		   context.etiquetas[context.contadorMC] = newLabelName ; 

                   // semantic check: valid token
                   if (context.tokens[context.i].match("[a-zA-Z_0-9]*")[0] != getToken(context) )
		       return firmwareError(context, "Label '" + getToken(context)  + "' not valid") ;

                   nextToken(context) ;
	           // match mandatory :
		   if (! isToken(context, ":") )
		       return firmwareError(context, 
                                           "Expected ':' for label '" + context.etiquetas[context.contadorMC] + "' not found");

                   nextToken(context) ;
	       }
	       // match mandatory (
	       if (! isToken(context, "(") )
		     return firmwareError(context, "Expected '(' not found") ;

               nextToken(context) ;
	       while (! isToken(context, ")") )
	       {
		   // match mandatory SIGNAL
		   var nombre_tok = getToken(context).toUpperCase();

		   if (nombre_tok == "MADDR")
		   {
                        nextToken(context) ;
			// match mandatory =
			if (! isToken(context, "=") )
			    return firmwareError(context, "Expected '=' not found") ;

                        nextToken(context) ;
			// match mandatory VALUE
			var labelsNotFoundAux=new Object();
			labelsNotFoundAux["nombre"] = getToken(context) ;
			labelsNotFoundAux["cycle"]  = microprograma.length;
			labelsNotFoundAux["index"]  = context.i;
			labelsNotFoundAux["instruction"] = context.instrucciones.length;

			var etiquetaFounded = 0;
			for (var k in context.etiquetas)
			{
				if ( isToken(context, context.etiquetas[k]) )
				{
					microInstruccionAux[nombre_tok] = k.toString();
					etiquetaFounded = 1;
				}
			}

			if (etiquetaFounded == 0)
			{
				context.labelsNotFound.push(labelsNotFoundAux);
			}

                        nextToken(context) ;
			// match optional ,
			if ( isToken(context, ",") )
                            nextToken(context) ;

			continue ;
		   }

                   // semantic check: valid signal id
		   if (typeof sim_signals[nombre_tok] == "undefined")
		       return firmwareError(context, "Signal '" + nombre_tok + "' does not exists") ;

		   microInstruccionAux[nombre_tok] = 1; // signal is active so far...

                   nextToken(context) ;
		   // match optional =
		   if ( isToken(context, "=") )
		   {
                        nextToken(context) ;
			// match mandatory VALUE
			microInstruccionAux[nombre_tok] = parseInt(getToken(context) , 2);

                        // semantic check: valid value
                        if (getToken(context).match("[01]*")[0] != getToken(context))
			    return firmwareError(context, "Incorrect binary format: " + getToken(context)) ;

                        // semantic check: value within range
		        if (microInstruccionAux[nombre_tok] >= Math.pow(2, sim_signals[nombre_tok].nbits))
		            return firmwareError(context, "Value out of range: " + getToken(context)) ;

                        nextToken(context) ;
		   }

		   // match optional ,
		   if ( isToken(context, ",") )
                        nextToken(context) ;
	       }

	       microprograma.push(microInstruccionAux);
	       context.contadorMC++;

               nextToken(context) ;
	       if ( isToken(context, ",") )
                    nextToken(context) ;
	   }

	   // match mandatory }
           nextToken(context) ;

           return microprograma ;
}

function loadFirmware (text)
{
           var context = new Object() ;
	   context.line           	= 1 ;
	   context.error          	= null ;
	   context.i              	= 0 ;
	   context.contadorMC     	= 0 ;
	   context.etiquetas      	= new Object() ;
	   context.labelsNotFound 	= new Array() ;
	   context.instrucciones  	= new Array() ;
	   context.co_cop         	= new Object() ;
	   context.registers      	= new Array() ;
           context.text           	= text ;
	   context.tokens         	= new Array() ;
	   context.t              	= 0 ;
	   context.newlines       	= new Array() ;
	   context.pseudoInstructions	= new Array();
	   context.stackRegister	= null ;

           nextToken(context) ;
           while (context.t < context.text.length)
           {

// *registers
// {
//    0=$zero,
//    30=$fp,
//    31=$ra
// }*

               if (isToken(context,"registers"))
               {
                       nextToken(context) ;
                       if (! isToken(context, "{")) 
                             return firmwareError(context, "Expected '{' not found") ;

                       nextToken(context) ;
                       while (! isToken(context, "}"))
                       {
                           var nombre_reg = getToken(context) ;

                           nextToken(context) ;
                           if (! isToken(context, "=")) 
				 return firmwareError(context, "Expected '=' not found") ;

                           nextToken(context) ;
                           context.registers[nombre_reg] = getToken(context) ;

                           nextToken(context) ;
			   if (isToken(context, "("))
			   {
				if (context.stackRegister != null)
				    return firmwareError(context, "Duplicate definition of stack pointer");

				nextToken(context);
				if (! isToken(context, "stack_pointer"))
				    return firmwareError(context, "Expected stack_pointer token not found");

				context.stackRegister = nombre_reg;

				nextToken(context);
				if (! isToken(context, ")"))
				    return firmwareError(context, "Expected ')' not found");

				nextToken(context);
			   }
			
                           if (isToken(context,",")) 
                               nextToken(context);
                       }

                       nextToken(context);
                       continue ;
               }

//
// *pseudoinstructions 
// {
//    li reg num { lui reg high(num) ; ori reg reg low(num) }
// }*
//

	       if (isToken(context,"pseudoinstructions"))
	       {
			nextToken(context);
			if(! isToken(context, "{"))
			     return firmwareError(context, "Expected '{' not found");

			nextToken(context);
			while (! isToken(context, "}"))
			{
				var pseudoInstructionAux = new Object();			
				var pseudoInitial	 = new Object();
				pseudoInitial.signature	 = "";
				pseudoInitial.name	 = "";
				pseudoInitial.fields	 = new Array();
				pseudoInitial.name	 = getToken(context);
				pseudoInitial.signature	 = pseudoInitial.signature + getToken(context) + "," ;
				nextToken(context);
				while (! isToken(context, "{"))
				{
					var pseudoFieldAux	  = new Object();
					pseudoFieldAux.name	  = getToken(context);
					pseudoInitial.fields.push(pseudoFieldAux);
					pseudoInitial.signature = pseudoInitial.signature + getToken(context) + ",";
					nextToken(context);
					if(isToken(context, ","))
						nextToken(context);
				}
			 	nextToken(context);
				pseudoInstructionAux["initial"]=pseudoInitial;	
				var contPseudoFinish=0;

				var pseudoFinishAux = new Object();
				pseudoFinishAux.signature="";
				while (! isToken(context, "}"))
				{
					pseudoFinishAux.signature = pseudoFinishAux.signature + getToken(context) + " ";
					nextToken(context);
				}
				pseudoInstructionAux["finish"]=pseudoFinishAux;
				pseudoInstructionAux["finish"].signature=pseudoInstructionAux["finish"].signature.replace(';','\n');
				context.pseudoInstructions.push(pseudoInstructionAux);
				nextToken(context);
			}

			nextToken(context);
			continue ;
		}

// *fetch {
//            (XX, Y, BW=11),
//     fetch: (X2, X0),
//            (A0, B=0, C=0)
// }*

               if (isToken(context,"fetch"))
               {
                   var instruccionAux = new Object();
                   instruccionAux["name"]     = getToken(context) ;
                   instruccionAux["mc-start"] = context.contadorMC ;

	           nextToken(context);
                   var ret = read_microprg(context) ;
                   if (typeof ret.error != "undefined")
                       return ret ;

                   instruccionAux["signature"]       = "fetch" ;
		   instruccionAux["signatureGlobal"] = "fetch" ;
                   instruccionAux["microcode"]       = ret ;
		   context.instrucciones.push(instruccionAux);

                   context.contadorMC = context.contadorMC + 9; // padding between instrucctions
                   continue ;
               }

// *li reg val {*
//             co=000000,
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

               var instruccionAux = new Object();
	       instruccionAux["name"]     = getToken(context) ;
	       instruccionAux["mc-start"] = context.contadorMC ;

	       var firma = "";
	       var firmaGlobal= "";
	       var numeroCampos = 0;
	       var campos = new Array();

	       firma = firma + getToken(context)  + ',';
	       nextToken(context);

               // match optional ,
	       while (isToken(context, ',')) 
	    	      nextToken(context);

	       while (! isToken(context,"{"))
	       {
                   // match optional ,
	           while (isToken(context, ',')) 
			  nextToken(context);

                   // match optional FIELD
		   if ( !isToken(context, ",") && !isToken(context, "(") && !isToken(context, ")") )
                   {
		       var campoAux = new Object();
		       campoAux["name"] = getToken(context) ;
		       campos.push(campoAux);
		       numeroCampos++;
		       firma = firma + getToken(context)  ;
		       nextToken(context);
		   } 

                   // match optional "(" FIELD ")"
		   if (isToken(context, "(")) 
                   {
		           firma = firma + '(';
		           nextToken(context);

			   if ( !isToken(context, ",") && !isToken(context, "(") && !isToken(context, ")") )
			   {
			       var campoAux = new Object();
			       campoAux["name"] = getToken(context) ;
			       campos.push(campoAux);
			       numeroCampos++;

			       firma = firma + getToken(context) ;
			       nextToken(context);
			   }
			   else
		           {
			       return firmwareError(context,
			    			    "'token' is missing after '(' on: " + 
                                                    context.co_cop[instruccionAux.co].signature) ;
		           }

			   if (isToken(context,")"))
			   {
				firma = firma + ')';
  				nextToken(context);
			   }
			   else
		           {
			       return firmwareError(context,
			    			    "')' is missing on: " + 
                                                    context.co_cop[instruccionAux.co].signature) ;
		           }
                   }

	           firma = firma + ',';
	       }

	       firma = firma.substr(0, firma.length-1);
	       instruccionAux["signature"] = firma;
               instruccionAux["signatureGlobal"] = firma;

// li reg val {
//             *co=000000,*
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

	       nextToken(context);
	       // match mandatory co
	       if (! isToken(context,"co"))
		     return firmwareError(context, "Expected keyword 'co' not found") ;

	       nextToken(context);
	       // match mandatory =
	       if (! isToken(context,"="))
	    	     return firmwareError(context, "Expected '=' not found") ;

	       nextToken(context);
	       // match mandatory CO
	       instruccionAux["co"] = getToken(context) ;

	       // semantic check: valid value
	       if ( (getToken(context).match("[01]*")[0] != getToken(context)) || (getToken(context).length != 6) )
	             return firmwareError(context, "Incorrect binary format on 'co': " + getToken(context)) ;

	       // semantic check: 'co' is not already used
	       if ( (typeof context.co_cop[instruccionAux["co"]] != "undefined") &&
	                   (context.co_cop[instruccionAux["co"]].cop == null) )
	       {
	   	   return firmwareError(context,
				        "'co' is already been used by: " + context.co_cop[instruccionAux.co].signature) ;
	       }
	       context.co_cop[instruccionAux.co] = new Object() ;
	       context.co_cop[instruccionAux.co].signature = instruccionAux.signature ;
	       context.co_cop[instruccionAux.co].cop       = null ;

	       nextToken(context);
	       // match optional ,
	       if (isToken(context,","))
	           nextToken(context);

// li reg val {
//             co=000000,
//             *[cop=0000,]*
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

	       // match optional cop
	       if (isToken(context,"cop"))
               {
		       nextToken(context);
		       // match mandatory =
		       if (! isToken(context,"="))
			     return firmwareError(context, "Expected '=' not found") ;

		       nextToken(context);
		       // match mandatory CO
		       instruccionAux["cop"] = getToken(context) ;

		       // semantic check: valid value
		       if ( (getToken(context).match("[01]*")[0] != getToken(context)) || (getToken(context).length != 4) )
			     return firmwareError(context, "Incorrect binary format on 'cop': " + getToken(context)) ;

		       // semantic check: 'co+cop' is not already used
	               if (        (context.co_cop[instruccionAux.co].cop != null) &&
	                    (typeof context.co_cop[instruccionAux.co].cop[instruccionAux.cop] != "undefined") )
		       {
		   	   return firmwareError(context,
			     "'co+cop' is already been used by: " + context.co_cop[instruccionAux.co].cop[instruccionAux.cop]);
		       }
	               if (context.co_cop[instruccionAux.co].cop == null)
	                   context.co_cop[instruccionAux.co].cop = new Object();
	                   context.co_cop[instruccionAux.co].cop[instruccionAux.cop] = instruccionAux.signature ;

		       nextToken(context);
		       // match optional ,
		       if (isToken(context,","))
			   nextToken(context);
               }

// li reg val {
//             co=000000,
//             *nwords=1,*
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

	       // match mandatory nwords
	       if (! isToken(context,"nwords")) 
		   return firmwareError(context, "Expected keyword 'nwords' not found") ;

	       nextToken(context);
	       // match mandatory =
	       if (! isToken(context,"=")) 
		   return firmwareError(context, "Expected '=' not found") ;

	       nextToken(context);
	       // match mandatory NWORDS
	       instruccionAux["nwords"] = getToken(context) ;

	       nextToken(context);
	       // match optional ,
	       if (isToken(context,",")) 
		   nextToken(context);

// li reg val {
//             co=000000,
//             nwords=1,
//             *reg=reg(25,21),
//              val=inm(15,0),*
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// }

	       var camposInsertados = 0;
	       while (camposInsertados < numeroCampos)
	       {
	           // match mandatory FIELD
	           campos[camposInsertados]["name"] = getToken(context) ;

	           nextToken(context);
	           // match mandatory =
	           if (! isToken(context,"=")) 
		       return firmwareError(context, "Expected '=' not found") ;

	           nextToken(context);
	           // match mandatory reg|inm|address
	           if ( !isToken(context, "reg") && !isToken(context, "inm") && !isToken(context, "address") )
		        return firmwareError(context, "Incorrect type of field (reg, inm or address)") ;

	           campos[camposInsertados]["type"] = getToken(context) ;
	           firma = firma.replace("," + campos[camposInsertados]["name"], "," + campos[camposInsertados]["type"]);
	           firma = firma.replace("(" + campos[camposInsertados]["name"], "(" + campos[camposInsertados]["type"]);
	           firma = firma.replace(")" + campos[camposInsertados]["name"], ")" + campos[camposInsertados]["type"]);
                   
                   
	           instruccionAux["signature"] = firma;
	           firmaGlobal = firma.replace("address","num");
	           firmaGlobal = firmaGlobal.replace("inm" , "num");
	           instruccionAux["signatureGlobal"] = firmaGlobal;

	           nextToken(context);
	           // match mandatory (
	           if (! isToken(context,"(")) 
		       return firmwareError(context, "Expected '(' not found") ;

	           nextToken(context);
	           // match mandatory START_BIT
	           campos[camposInsertados]["startbit"] = getToken(context) ;

                   // check startbit range
                   if (parseInt(campos[camposInsertados]["startbit"]) > 32*parseInt(instruccionAux["nwords"]))
		       return firmwareError(context, "startbit out of range: " + getToken(context)) ;

	           nextToken(context);
	           // match mandatory ,
	           if (! isToken(context,","))
		       return firmwareError(context, "Expected ',' not found") ;

	           nextToken(context);
	           // match mandatory STOP_BIT
	           campos[camposInsertados]["stopbit"] = getToken(context) ;

                   // check stopbit range
                   if (parseInt(campos[camposInsertados]["stopbit"]) > 32*parseInt(instruccionAux["nwords"]))
		       return firmwareError(context, "stopbit out of range: " + getToken(context)) ;

	           nextToken(context);
	           // match mandatory )
	           if (! isToken(context,")"))
		       return firmwareError(context, "Expected ')' not found") ;

	           nextToken(context);
	           if (campos[camposInsertados]["type"] == "address")
	           {
	               // match mandatory abs|rel
		       if (getToken(context) !="abs" && getToken(context) !="rel")
		    	   return firmwareError(context, "Type of addressing incorrect (abs or rel)") ;

	               // match mandatory ADDRESS_TYPE
		       campos[camposInsertados]["address_type"] = getToken(context) ;
		       nextToken(context);
	           }

	           // match optional ,
	           if (isToken(context, ","))
		       nextToken(context);

	           camposInsertados++;
	       }

	       instruccionAux["fields"] = campos;

// li reg val {
//             co=000000,
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             *{
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }*
// }

               var ret = read_microprg(context) ;
               if (typeof ret.error != "undefined")
                   return ret ;

               instruccionAux["microcode"] = ret ;
	       context.instrucciones.push(instruccionAux);

               context.contadorMC = context.contadorMC + 9; // padding between instrucctions

// li reg val {
//             co=000000,
//             nwords=1,
//             reg=reg(25,21),
//             val=inm(15,0),
//             {
//                 (SE=0, OFFSET=0, SIZE=10000, T3=1, LE=1, MR=0, RE=10101, A0=1, B=1, C=0)
//             }
// *}*

               if (! isToken(context,"}")) 
                   return firmwareError(context, "Expected '}' not found") ;

               nextToken(context);
           }

           // CHECK: fetch exists + fetch label
           var found = false ;
           for (var i=0; i<context.instrucciones.length; i++)
           {
                if (context.instrucciones[i].name == "fetch")
                {
                    for (var j=0; j<context.instrucciones[i].microcode.length; j++)
                    {
		         if ( (typeof context.etiquetas[j] != "undefined") && (context.etiquetas[j] == "fetch") ) {
                               found = true;
                         }
                    }
		    if (found === false)
		        return firmwareError(context, "label 'fetch' not defined") ;
                }
           }
           if (found === false)
	       return firmwareError(context, "'fetch' not found") ;

           // TO RESOLVE labels
	   var labelsFounded=0;
	   if (context.labelsNotFound.length>0)
	   {
		for (var i=0; i<context.labelsNotFound.length; i++)
		{
			for (var j in context.etiquetas)
			{
				if (context.etiquetas[j] == context.labelsNotFound[i].nombre)
				{
				    context.instrucciones[context.labelsNotFound[i].instruction].microcode[context.labelsNotFound[i].cycle].MADDR = j;
				    labelsFounded++;		
				}	
			}

			if (labelsFounded == 0)
			{
                                // CHECK: label is defined
				return firmwareError(context, "MADDR label not found : " + context.labelsNotFound[i].nombre) ;
			}
		}
	   }

           var ret = new Object();
           ret.error              = null;
           ret.firmware           = context.instrucciones ;
           ret.labels             = context.etiquetas;
           ret.mp                 = new Object();
           ret.seg                = new Object();
           ret.registers          = context.registers ;
           ret.pseudoInstructions = context.pseudoInstructions ;
	   ret.stackRegister	  = context.stackRegister;

           return ret ;
}

/*
 *  Save Firmware
 */

function saveFirmware ( SIMWARE )
{
	var file = "";
	for (var i=0; i<SIMWARE.firmware.length; i++)
	{
		file += SIMWARE.firmware[i].name;
		if (typeof SIMWARE.firmware[i].fields != "undefined")
		{
			if (SIMWARE.firmware[i].fields.length>0)
			{
				for (var j=0; j<SIMWARE.firmware[i].fields.length; j++)
				{
					file += " " + SIMWARE.firmware[i].fields[j].name;
				}
			}
		}

		file += " {" + '\n';
		if (typeof SIMWARE.firmware[i].co != "undefined")
		{
			file += '\t' +"co=" + SIMWARE.firmware[i].co + "," + '\n';
		}

		if (typeof SIMWARE.firmware[i].cop != "undefined")
		{
			file += '\t' +"cop=" + SIMWARE.firmware[i].cop + "," + '\n';
		}

		if (typeof SIMWARE.firmware[i].nwords != "undefined")
		{
			file += '\t' + "nwords=" + SIMWARE.firmware[i].nwords + "," + '\n'; 
		}

		if (typeof SIMWARE.firmware[i].fields != "undefined")
		{	
			if (SIMWARE.firmware[i].fields.length>0)
			{
				for (var j=0;j<SIMWARE.firmware[i].fields.length;j++)
				{
					file += '\t' + SIMWARE.firmware[i].fields[j].name + " = " + SIMWARE.firmware[i].fields[j].type;
					file += " (" + SIMWARE.firmware[i].fields[j].startbit + "," + SIMWARE.firmware[i].fields[j].stopbit + ")";					
					if (SIMWARE.firmware[i].fields[j].type == "address")
					{
						file += SIMWARE.firmware[i].fields[j].address_type;
					}
					file += "," + '\n'; 
				}
			}
		}

		if (typeof SIMWARE.firmware[i].microcode != "undefined")
		{
			var addr=SIMWARE.firmware[i]["mc-start"];
			if (SIMWARE.firmware[i].name!="fetch")
			{
				file += '\t' + "{";
			}

			for (var j=0; j<SIMWARE.firmware[i].microcode.length; j++)
			{
				file += '\n' + '\t' + '\t';
				if (typeof SIMWARE.labels[addr] != "undefined")
				{
					file += SIMWARE.labels[addr] + " : "; 
				}

				file += "( ";
				var anySignal=0;
				for (var k in SIMWARE.firmware[i].microcode[j])
				{
					if (k!="MADDR")
					     file += k + "=" + SIMWARE.firmware[i].microcode[j][k].toString(2) + ", ";
                                        else file += k + "=" + SIMWARE.labels[SIMWARE.firmware[i].microcode[j][k]] + ", ";
					anySignal=1;
				}
				if (anySignal==1)
				{
					file = file.substr(0, file.length-1);
				}
				file += "),";
				addr++;
			}

			file = file.substr(0, file.length-1);
			if (SIMWARE.firmware[i].name!="fetch")
			{
				file += '\n\t}';
			}
		}

		file += '\n}\n\n';
	}	

	if ( (typeof SIMWARE.registers != "undefined") && (SIMWARE.registers.length > 0) )
	{
		file += 'registers' + '\n{\n';
		for (var i = 0; i< SIMWARE.registers.length; i++)
		{
		     if (SIMWARE.stackRegister == i)
		     	  file += '\t' + "$" + i + "=" + SIMWARE.registers[i] + " (stack_pointer)," + '\n';
                     else file += '\t' + "$" + i + "=" + SIMWARE.registers[i] + "," + '\n';
		}
		file  = file.substr(0, file.length-2);
		file += '\n}\n';
	}

	return file;
}


/*
 *  Auxiliar firmware interface
 */

function decode_instruction ( binstruction )
{
    var co  = binstruction.substring(0,   6) ;
    var cop = binstruction.substring(28, 32) ;

    // try to find instruction in the loaded firmware
    var oinstruction = null ;
    for (var fi in FIRMWARE['firmware'])
    {
         if (FIRMWARE.firmware[fi].name == "fetch") 
         {
             continue ;
         }

         if ( (FIRMWARE.firmware[fi].co == co) && (typeof FIRMWARE.firmware[fi].cop == "undefined") )
         {
             oinstruction = FIRMWARE.firmware[fi] ;
             break ;
         }

         if ( (FIRMWARE.firmware[fi].co == co) && (typeof FIRMWARE.firmware[fi].cop != "undefined") && (FIRMWARE.firmware[fi].cop == cop) )
         {
             oinstruction = FIRMWARE.firmware[fi] ;
             break ;
         }
    }

    return oinstruction ;
}

function show_decode_instruction ( oinstruction, binstruction )
{
    // if found, show its information. In other case, show error
    if (null == oinstruction) {
        return "ERROR: instruction " + co + " not found" ;
    }

    var sinstruction = oinstruction.name + " " ;
    var split_ins    = oinstruction.signature.split(",") ;
    var sinstruction_length = parseInt(oinstruction.nwords) * 32; /* nbits of instruction */
    for (var i=1; i < split_ins.length; i++)
    {
	 if (
              ( (oinstruction.fields[i-1].stopbit) < (sinstruction_length - 1     ) ) && 
              ( (oinstruction.fields[i-1].stopbit) > (sinstruction_length - 1 - 32) )
         )
	 {
	 	var binvalue = binstruction.substring(sinstruction_length - oinstruction.fields[i-1].startbit - 1,
					       	      sinstruction_length - oinstruction.fields[i-1].stopbit) ;
	 	if (split_ins[i] == "reg")
	      	     sinstruction +=  "$" + parseInt(binvalue,2) + " ";
	 	else sinstruction += "0x" + parseInt(binvalue,2).toString(16) + " ";
    	}
	else
	{
		sinstruction += "... ";
	}
    }

    return sinstruction ;
}

function decode_ram ( )
{
    var sram = "\n" ;
    for (var address in MP)
    {
        var binstruction = MP[address].toString(2) ;
            binstruction = "00000000000000000000000000000000".substring(0, 32 - binstruction.length) + binstruction ;
        sram += "0x" + parseInt(address).toString(16) + ":" + decode_instruction(binstruction) + "\n" ;
    }

    return sram ;
}

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


function dataSegment(tokens,dataSegment) 
{
    /*DIRECCION COMIENZO*/
    var posicionEnMemoria = parseInt(dataSegment.begin);
    var alineacion = 1;
    //text = text.toLowerCase();
    //text = text.replace(/\n/g, ' ; ');
    var resultDataSegment=new Array();
    var segmentData = new Array();
    var compileSegmentDataByteLevel= new Object();
    var compileSegmentDataWordLevel= new Object();
    var byteCounter=posicionEnMemoria;
    var wordCounter=posicionEnMemoria;
    var i = 0;
    var j = 0;
    var z=0;

    for (i = 0; i < tokens.length; i++) 
    {
        j = 0;
        var linea = tokens[i].split("\"");
        if (linea.length > 1) 
        {
            linea[0] = linea[0].replace(/:/g, " : ");
            linea[0] = linea[0].replace(/,/g, " , ");
            linea[0] = linea[0].replace(/\(/g, " ( ");
            linea[0] = linea[0].replace(/\)/g, " )");
            linea[0] = linea[0].replace(/#/g, "# ");
            linea[0] = linea[0].replace(/\t/g, "");
            linea[0] = linea[0].replace(/  /g, " ");
            linea[0] = linea[0].replace(/\s{2,}/g, ' ');
	    linea[0] = linea[0].trim();
            var parteInicial = linea[0].split(" ");
            if (parteInicial[0].trim() == "#" || parteInicial[0].trim() == "") 
            {
                if (parteInicial[0].trim() == "#") 
                {
                    // console.log("COMENTARIO");
                } else 
                {
                    // console.log("LINEA EN BLANCO");
                }
            } else 
            {
                var dataObject = new Object();
                var tamVar = 0;
                var texto = "";
                var traduction=new Array();
		var defaultAlign;
                dataObject["name"] = parteInicial[j].trim();
                j++;
                if (parteInicial[j].trim() != ":") {
			return assemblyError("Error, ':' not found: ", linea[0], j);
                }
                j++;
                switch (parteInicial[j].trim()) 
                {
                    case ".ascii":
                        // console.log("TIPO: " + parteInicial[j].trim());
			defaultAlign=0;
		        if(defaultAlign>alineacion) 
		        {
			       alineacion=defaultAlign;
		        }
                        dataObject["tipo"] = parteInicial[j].trim();
                        j++;
                        texto = linea[1];
                        /*RECORREMOS LA CADENA DE CARACTERES*/
                        for(z=0;z<texto.length;z++)
                        {
                        	var n2="00000000";
                        	if (texto[z]=="\"")
                        	{
                        			if(texto[z+1]=='t') /*CASO /t --> dec=9*/
                        			{
                        				var n3=9;
                        				n2=n2+n3.toString(2);
                        				n3=n2.substr(n2.length-1-8,8);
                        				traduction.push(n3);
                        				z++;
                        			}else
                        			{
                        				if(texto[z+1]=='n') /*CASO /n --> dec=10*/
                            			{
                        				var n3=10;
                            				n2=n2+n3.toString(2);
                            				n3=n2.substr(n2.length-1-8,8);
                            				traduction.push(n3);
                        				z++;
                            			}else
                            			{
                            				if(texto[z+1]=='0') /*EOF --> /0 --> dec=3*/
                                			{
                            					var n3=0;
                                				n2=n2+n3.toString(2);
                                				n3=n2.substr(n2.length-1-8,8);
                                				traduction.push(n3);
                            					z++;
                                			}else
                                			{
                                				var n3=texto.charCodeAt(z).toString(2);
                                				n2=n2+n3;
                                				n3=n2.substr(n2.length-1-8,8);
                                				traduction.push(n3);
                                			}
                            			}
                        			}
                        	}else
                        	{
                        		var n3=texto.charCodeAt(z).toString(2);
               				n2=n2+n3;
               				n3=n2.substr(n2.length-1-8,8);
               				traduction.push(n3);
                        	}
                        }
                        /**/
                        tamVar = traduction.length;
                        // console.log("BYTES VARIABLE:" + tamVar);
                        dataObject["contenido"] = texto;
                        dataObject["longitud"] = tamVar;
                        dataObject["traduccion"]= traduction;
                        /*CALCULO DE POSICION*/
                        while (posicionEnMemoria % Math.pow(2, alineacion) != 0) {
                            //compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            compileSegmentDataByteLevel[byteCounter]="00000000";
                            byteCounter++;
                        	posicionEnMemoria++;
                        }
                        for(z=0;z<traduction.length;z++)
                        {
                        	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z];
                        	compileSegmentDataByteLevel[byteCounter]=traduction[z];
                        	byteCounter++;
                        }
                        dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                        posicionEnMemoria = posicionEnMemoria + tamVar;
                        byteCounter=posicionEnMemoria;
                        alineacion=0;
			break;
                    case ".asciiz":
                        // console.log("TIPO: " + parteInicial[j]);
			defaultAlign=0;
                        dataObject["tipo"] = parteInicial[j].trim();
		        if(defaultAlign>alineacion) 
		        {
			       alineacion=defaultAlign;
		        }
                        j++;
                        texto = linea[1];
                        j++;
                        /*RECORREMOS LA CADENA DE CARACTERES*/
                        for(z=0;z<texto.length;z++)
                        {
                        	var n2="00000000";
                        	if(texto[z]=="\"")
                        	{
                        			if(texto[z+1]=='t') /*CASO /t --> dec=9*/
                        			{
                        				var n3=9;
                        				n2=n2+n3.toString(2);
                        				n3=n2.substr(n2.length-1-8,8);
                        				traduction.push(n3);
                        				z++;
                        			}else
                        			{
                        				if(texto[z+1]=='n') /*CASO /n --> dec=10*/
                            				{
                       						var n3=10;
                            					n2=n2+n3.toString(2);
                            					n3=n2.substr(n2.length-1-8,8);
                            					traduction.push(n3);
                       						z++;
                            				}else
                            				{
                            					if(texto[z+1]=='0') /*EOF --> /0 --> dec=3*/
                                				{
                            						var n3=0;
                                					n2=n2+n3.toString(2);
                                					n3=n2.substr(n2.length-1-8,8);
                                					traduction.push(n3);
                            						z++;
                                				}else
                                				{
                                					var n3=texto.charCodeAt(z).toString(2);
                                					n2=n2+n3;
                                					n3=n2.substr(n2.length-1-8,8);
                                					traduction.push(n3);
                                				}
                            				}
                        			}
                        	}else
                        	{
                        		var n3=texto.charCodeAt(z).toString(2);
               				n2=n2+n3;
               				n3=n2.substr(n2.length-1-8,8);
               				traduction.push(n3);
                        	}
                        }
                        var n3=0;
                        n2="00000000";
     			n2=n2+n3.toString(2);
        		n3=n2.substr(n2.length-1-8,8);
        		traduction.push(n3);
                        /**/
                        tamVar = traduction.length;
                        texto = texto + '\0';
                        // console.log("BYTES VARIABLE:" + tamVar);
                        dataObject["contenido"] = texto;
                        dataObject["traduccion"]= traduction;
                        dataObject["longitud"] = tamVar;
                        /*CALCULO DE POSICION*/
                        while (posicionEnMemoria % Math.pow(2, alineacion) != 0) 
			{
                        	 //compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                        	compileSegmentDataByteLevel[byteCounter]="00000000";
                        	byteCounter++;
                        	posicionEnMemoria++;
                        }
                        for(z=0;z<traduction.length;z++)
                        {
                        	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z];
                        	compileSegmentDataByteLevel[byteCounter]=traduction[z];
                        	byteCounter++;
                        }
                        dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                        posicionEnMemoria = posicionEnMemoria + tamVar;
                        byteCounter=posicionEnMemoria;
                        alineacion=0;
			break;
		    default:	
			return assemblyError("Error, type of variable incorrect: ", linea[0], j);
			break;	
                }
                // console.log(dataObject);
                segmentData.push(dataObject);
                // console.log(segmentData);
            }
        } else
        {
            tokens[i] = tokens[i].replace(/:/g, " : ");
            tokens[i] = tokens[i].replace(/,/g, " , ");
            tokens[i] = tokens[i].replace(/\(/g, " ( ");
            tokens[i] = tokens[i].replace(/\)/g, " ) ");
            tokens[i] = tokens[i].replace(/#/g, "# ");
            tokens[i] = tokens[i].replace(/\t/g, "");
            tokens[i] = tokens[i].replace(/  /g, " ");
            tokens[i] = tokens[i].replace(/\s{2,}/g, ' ');
	    tokens[i] = tokens[i].trim();
	    var linea = tokens[i].split(" ");
            if (linea[j]== "#" || linea[j].trim() == "") 
            {
                if (linea[j] == "#") {
                    // console.log("COMENTARIO");
                } else 
                {
                    // console.log("LINEA EN BLANCO");
                }
            }
            else
            {
                if (linea[j].trim() == ".align" || linea[j].trim() == ".text") 
                {
                    if (linea[j].trim() == ".text") {
                        /*FIN DEL .DATA*/
                        // console.log("FIN DE .DATA");
                        break;
                    } else 
                    {
                        /*CAMBIAMOS LA ALINEACION EN MEMORIA*/
                        /*igualamos el valor de alineacion a este valor y comprobamos que se encuentra en el rango permitido*/
                        j++;
                        alineacion = parseInt(linea[j].trim());
                        // console.log("ALIGN: " + alineacion);
                     }
                } else 
                {
                    var dataObject = new Object();
                    var traduction=new Array();
                    var tamVar = 0;
                    var texto = "";
                    var contenido="";
                    var longitud=0;
	    	    var defaultAlign;
                    dataObject["name"] = linea[j].trim();
                    j++;
                    if (linea[j].trim() != ":") 
                    {
			return assemblyError("Error, ':' not found: ", linea, j);
                    }
                    j++;
                    switch (linea[j].trim()) 
                    {
                        case ".byte":
                            // console.log("TIPO: " + linea[j]);
			    defaultAlign=0;
			    if(defaultAlign>alineacion) 
			    {
				alineacion=defaultAlign;
			    }
                            dataObject["tipo"] = linea[j].trim();
                            j++;
                            do
                            {
                            	if(linea[j].trim()==",")
                            	{
                            		contenido = contenido + ",";
                            		j++;
                            	}
                            	if(linea[j].trim().toLowerCase().substring(0,2)=="0x")
                                {
                                	if(linea[j].trim().substr(2,linea[j].trim().length-2).match(/^[0-9a-fA-F]+$/))
                                	{
                                		texto=parseInt(linea[j].trim()).toString();
                                	}else
                                	{
                                		//HEXADECIMAL INCORRECTO
						return assemblyError("Error in Hex format: ", linea, j);
                                	}
                                }else
                                {
                                	if(linea[j].trim().substring(0,1)=="0" && linea[j].trim().match(/^[0-9]+$/))
                                	{
                                		texto=parseInt(linea[j].trim(),8).toString();	/*octal*/
                                	}else
                                	{
                                		if(linea[j].trim().match(/^[0-9]+$/))
                                		{
                                			texto=parseInt(linea[j].trim(),10).toString();									/*DECIMAL*/
                                		}else
                                		{
							if(linea[j].trim().substring(0,1)=="'" && linea[j].trim().length>2)
							{
								if(linea[j].trim().substring(linea[j].trim().length-1,1)!="'")
								{
									var auxChar=linea[j];
									if(auxChar.length==3)
									{
                                						texto=auxChar[1].charCodeAt();   /*CARACTER*/
									}else
									{
										if(auxChar==4)
										{
											if(auxChar[2]=='t') /*CASO /t --> dec=9*/
											{
												texto=parseInt("9");   /*CARACTER*/
											}else
											{
												if(auxChar[2]=='n') /*CASO /n --> dec=10*/
												{
													texto=parseInt("10");   /*CARACTER*/
												}else
												{
													if(auxChar[2]=='0') /*EOF --> /0 --> dec=3*/
													{
														texto=parseInt("10");   /*CARACTER*/
													}else
													{
														return assemblyError("Error, char format incorrect: ",linea,j);
													}
												}
											}
										}
										else
										{
											return assemblyError("Error, char format incorrect: ",linea,j);
										}
									}	
								}else
								{	
											return assemblyError("Error, char format incorrect: ",linea,j);
								}
							}else
							{
								if(linea[j].trim()=="'" && linea[j+1].trim()=="'")
								{
									var auxChar=" ";
									texto=auxChar.charCodeAt();
									j++;
								}else
								{
									if(linea[j].trim()=="'#" && linea[j+1].trim()=="'")
									{
										var auxChar="#";
										texto=auxChar.charCodeAt();
										j++;
									}else
									{
										if((linea[j].trim()=="'" && linea[j+2].trim()=="'") &&
										(linea[j+1].trim()==":" || linea[j+1].trim()=="," || linea[j+1].trim()=="("
										 || linea[j+1].trim()==")"))
										{
											var auxChar=linea[j+1].trim();
											texto=auxChar.charCodeAt();
											j=j+2;
										}else
										{		
											return assemblyError("Error, numeric format incorrect: ", linea, j);
										}
									} 
								}
							}
                                		}
                                	}
                                }
                            	contenido = contenido + texto;
                                texto = parseInt(texto).toString(2);
                                if(texto.length>8)
                                {
                                	// console.log("En la linea i, el tipo byte sera truncado."); /*WARNING*/
                                }
                                var n2 = "00000000000000000000000000000000".substring(0, 32 - texto.length) + texto ;
                                texto=n2.substr(24,8);
                                traduction.push(texto);
                                longitud++;
                                j++;
                            }while(j<linea.length && linea[j].trim()==",");
                            dataObject["contenido"] = contenido;
                            dataObject["traduccion"] = traduction;
                            dataObject["longitud"] = longitud;
                            /*CALCULO DE POSICION*/
                            while (posicionEnMemoria % Math.pow(2, alineacion) != 0) {
                                //compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            	compileSegmentDataByteLevel[byteCounter]="00000000";
                            	byteCounter++;
                            	posicionEnMemoria++;
                            }
                            for(z=0;z<traduction.length;z++)
                            {
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z];
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z];
                            	byteCounter++;
                            }
                            dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                            posicionEnMemoria = posicionEnMemoria + longitud;
                            byteCounter=posicionEnMemoria;
                            alineacion=0;
			    break;
                        case ".half":
                            // console.log("TIPO: " + linea[j]);
			    defaultAlign=1;
			    if(defaultAlign>alineacion) 
			    {
				alineacion=defaultAlign;
			    }
                            dataObject["tipo"] = linea[j].trim();
                            j++;
                            do
                            {
                            	if(linea[j].trim()==",")
                            	{
                            		contenido = contenido + ",";
                            		j++;
                            	}
                            	if(linea[j].trim().toLowerCase().substring(0,2)=="0x")
                                {
                                	if(linea[j].trim().substr(2,linea[j].trim().length-2).match(/^[0-9a-fA-F]+$/))
                                	{
                                		texto=parseInt(linea[j].trim()).toString();
                                	}else
                                	{
                                		//HEXADECIMAL INCORRECTO
						return assemblyError("Error in Hex format: ", linea, j);
                                	}
                                }else
                                {
                                	if(linea[j].trim().substring(0,1)=="0" && linea[j].trim().match(/^[0-9]+$/))
                                	{
                                		texto=parseInt(linea[j].trim(),8).toString();	/*octal*/
                                	}else
                                	{
                                		if(linea[j].trim().match(/^[0-9]+$/))
                                		{
                                			texto=parseInt(linea[j].trim(),10).toString();									/*DECIMAL*/
                                		}else
                                		{
							return assemblyError("Error, numeric format incorrect: ", linea, j);
                                		}
                                	}
                                }
                            	contenido = contenido + texto;
                                texto = parseInt(texto).toString(2);
                                if(texto.length>16)
                                {
                                	// console.log("En la linea i, el tipo half sera truncado.");  /*WARNING*/
                                }
                                var n2 = "00000000000000000000000000000000".substring(0, 32 - texto.length) + texto ;
                                texto=n2.substr(16,16);
                                traduction.push(texto);
                                longitud=longitud+2;
                                j++;
                            }while(j<linea.length && linea[j].trim()==",");
                            dataObject["contenido"] = contenido;
                            dataObject["traduccion"] = traduction;
                            dataObject["longitud"] = longitud;
                            /*CALCULO DE POSICION*/
                            while (posicionEnMemoria % Math.pow(2, alineacion) != 0) {
                                //compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            	compileSegmentDataByteLevel[byteCounter]="00000000";
                                byteCounter++;
                            	posicionEnMemoria++;
                            }
                            for(z=0;z<traduction.length;z++)
                            {
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(8,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(8,8);
                            	byteCounter++;
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(0,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(0,8);
                            	byteCounter++;
                            }
                            dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                            posicionEnMemoria = posicionEnMemoria + longitud;
                            byteCounter=posicionEnMemoria;
                            alineacion=0;
			    break;
                        case ".word":
                            // console.log("TIPO: " + linea[j]);
			    defaultAlign=2;
			    if(defaultAlign>alineacion) 
			    {
				alineacion=defaultAlign;
			    }
                            dataObject["tipo"] = linea[j].trim();
                            j++;
                            do
                            {
                            	if(linea[j].trim()==",")
                            	{
                            		contenido = contenido + ",";
                            		j++;
                            	}
                            	if(linea[j].trim().toLowerCase().substring(0,2)=="0x")
                                {
                                	if(linea[j].trim().substr(2,linea[j].trim().length-2).match(/^[0-9a-fA-F]+$/))
                                	{
                                		texto=parseInt(linea[j].trim()).toString();
                                	}else
                                	{
                                		//HEXADECIMAL INCORRECTO
						return assemblyError("Error in Hex format: ", linea, j);
                                	}
                                }else
                                {
                                	if(linea[j].trim().substring(0,1)=="0" && linea[j].trim().match(/^[0-9]+$/))
                                	{
                                		texto=parseInt(linea[j].trim(),8).toString();	/*octal*/
                                	}else
                                	{
                                		if(linea[j].trim().match(/^[0-9]+$/))
                                		{
                                			texto=parseInt(linea[j].trim(),10).toString();									/*DECIMAL*/
                                		}else
                                		{
							return assemblyError("Error, numeric format incorrect: ", linea, j);
                                		}
                                	}
                                }
                            	contenido = contenido + texto;
                                texto = parseInt(texto).toString(2);
                                if(texto.length>32)
                                {
                                	// console.log("En la linea i, el tipo word sera truncado.");   /*WARNING*/
                                }
                                var n2 = "00000000000000000000000000000000".substring(0, 32 - texto.length) + texto ;
                                texto=n2;
                                traduction.push(texto);
                                longitud=longitud+4;
                                j++;
                            }while(j<linea.length && linea[j].trim()==",");
                            dataObject["contenido"] = contenido;
                            dataObject["traduccion"] = traduction;
                            dataObject["longitud"] = longitud;
                            /*CALCULO DE POSICION*/
                            while (posicionEnMemoria % Math.pow(2, alineacion) != 0) {
                                //compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            	compileSegmentDataByteLevel[byteCounter]="00000000";
                                byteCounter++;
                            	posicionEnMemoria++;
                            }
                            for(z=0;z<traduction.length;z++)
                            {
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(24,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(24,8);
                            	byteCounter++;
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(16,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(16,8);
                            	byteCounter++;
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(8,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(8,8);
                            	byteCounter++;
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]=traduction[z].substr(0,8);
                            	compileSegmentDataByteLevel[byteCounter]=traduction[z].substr(0,8);
                            	byteCounter++;
                            }
                            dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                            posicionEnMemoria = posicionEnMemoria + longitud;
                            byteCounter=posicionEnMemoria;
		            alineacion=0;
                            break;
                        case ".space":
                            // console.log("TIPO: " + linea[j]);
			    defaultAlign=0;
			    if(defaultAlign>alineacion) 
			    {
				alineacion=defaultAlign;
			    }
                            dataObject["tipo"] = linea[j].trim();
                            /*ESPACIO DE N BYTES RESERVADOS EN MEMORIA*/
                            j++;
                            if(linea[j].trim().match(/^[0-9]+$/))
                    	    {
                    			tamVar=parseInt(linea[j].trim(),10);									/*DECIMAL*/
                    	    }else
                    	    {
					return assemblyError("Error, numeric format incorrect: ", linea, j);
                    			
                    	    }
                            dataObject["contenido"]="";
                            dataObject["longitud"]=tamVar;
                            /*CALCULO DE POSICION*/
                            while (posicionEnMemoria % Math.pow(2, alineacion) != 0) 
                            {
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            	compileSegmentDataByteLevel[byteCounter]="00000000";
                                byteCounter++;
                            	posicionEnMemoria++;
                            }
                            for(z=0;z<tamVar;z++)
                            {
                            	//compileSegmentDataByteLevel["0x" + byteCounter.toString(16)]="00000000";
                            	compileSegmentDataByteLevel[byteCounter]="00000000";
                            	byteCounter++;
                            }
                            dataObject["posicion"] = "0x" + posicionEnMemoria.toString(16);
                            posicionEnMemoria = posicionEnMemoria + tamVar;
                            byteCounter=posicionEnMemoria;
			    alineacion=0;
                            break;
			default:
			    return assemblyError("Error, type of variable incorrect: ", linea, j);
			    break;
                    }
                    // console.log(dataObject);
                    segmentData.push(dataObject);
                    // console.log(tokens[i]);
                }
            }  
        }
    }
    // console.log(segmentData);
    compileSegmentDataWordLevel["0x" + wordCounter.toString(16)]="";
    for(z=parseInt(dataSegment.begin);z<byteCounter;z++)
    {
    	if(z%4==0)
    	{
    		if(z!=parseInt(dataSegment.begin))
    		{
    			wordCounter=wordCounter+4;
    			word="";
    			compileSegmentDataWordLevel["0x" + wordCounter.toString(16)]="";
    		}
    		compileSegmentDataWordLevel["0x" + wordCounter.toString(16)]=compileSegmentDataByteLevel[z] + compileSegmentDataWordLevel["0x" + wordCounter.toString(16)];
    	}else
    	{
    		compileSegmentDataWordLevel["0x" + wordCounter.toString(16)]=compileSegmentDataByteLevel[z] + compileSegmentDataWordLevel["0x" + wordCounter.toString(16)];
    	}
    }
    while(compileSegmentDataWordLevel["0x" + wordCounter.toString(16)].length<32)
    {
    	compileSegmentDataWordLevel["0x" + wordCounter.toString(16)]="00000000" + compileSegmentDataWordLevel["0x" + wordCounter.toString(16)];
    }
    wordCounter=wordCounter+4;
    dataSegment.end=parseInt(wordCounter.toString(16),16);
    resultDataSegment.segmentData=segmentData;
    resultDataSegment.compileSegmentData=compileSegmentDataWordLevel;
    // console.log(compileSegmentDataWordLevel);
    return resultDataSegment;
}

function textSegment(tokens, datosCU, objText)
{
    var offset=parseInt(objText.begin);
    var instrucciones = new Array();
    var registers = new Array();
    var mp = new Array();
    var segments = new Object();
    var state = 0;
    var posInState = 0;
    var programa = new Object();
    /*aqui llega sin lineas vac�as, es decir, instruccion por linea*/
    //text = text.replace(/\n/g, ' ; ');
    var etiquetas = new Object;
    var lineasBorrar = new Array();
    var i = 0;
    var error = 0;
    var binaryCodeAssemblyTraduction=new Object();
    var selectionPseudoInstructions = new Array();
    //pasada 1 borrar lineas comentadas
    for (i = 0; i < tokens.length; i++) 
    {
    	  	tokens[i] = tokens[i].toLowerCase();
    		tokens[i] = tokens[i].replace(/:/g, " : ");
    		tokens[i] = tokens[i].replace(/,/g, " , ");
    		tokens[i] = tokens[i].replace(/\(/g, " ( ");
    		tokens[i] = tokens[i].replace(/\)/g, " )");
    		tokens[i] = tokens[i].replace(/\t/g, "");
    		tokens[i] = tokens[i].replace(/#/g, "# ");
    		tokens[i] = tokens[i].replace(/  /g, " ");
    		tokens[i] = tokens[i].replace(/\s{2,}/g, ' ');
		tokens[i] = tokens[i].trim();
    		var linea = tokens[i].toString().split(" ");
    		var j = 0;
    		if (linea[j] == "#") 
    		{
    			lineasBorrar.push(i);
    		}
    }
    j = lineasBorrar.length - 1;
    for (j = lineasBorrar.length - 1; j >= 0; j--) 
    {
        tokens.splice(parseInt(lineasBorrar[j]), 1);
    }
    //COMENTARIOS ELIMINADOS

    //COMENZAMOS EL REEMPLAZO DE ETIQUETAS
    //primera pasada
	/*REEMPLAZO DE PSEUDOINSTRUCCIONES*/
	var tokensAux=new Array();
	var tokensPrint1=new Array();
	var tokensPrint2=new Array();
	for(i = 0; i < tokens.length;i++)
	{
		j = 0;
		var labelPseudoExist=0;
		var linea2 = tokens[i].trim().toString().split(" ");
		var pseudoReplaced=0;
		if (linea2[1 + j] == ":") 
		{
		    	j += 2
			var labelPseudoAux="";
			labelPseudoAux=linea2[0] + " : ";
			labelPseudoExist=1;
		}
		var nameInstruction="";
		if (typeof linea2[j] == "undefined")
		    return assemblyError("Error in syntax of label, is have not instruction associated: ", linea2, j);
		nameInstruction = linea2[j].trim();
		j++;
		for(var z=0;z<datosCU.pseudoInstructions.length;z++)
		{
			if(datosCU.pseudoInstructions[z]["initial"].name==nameInstruction)
			{
				/*reemplazo*/
				var newLineCodeAux="";
				var newCode= new Array();
				newLineCodeAux=datosCU.pseudoInstructions[z]["finish"].signature;
				for(var k=0;k<datosCU.pseudoInstructions[z]["initial"].fields.length;k++)
				{
					var fieldAux="";
					fieldAux=datosCU.pseudoInstructions[z]["initial"].fields[k].name;
					var re = new RegExp(fieldAux,'g');
					newLineCodeAux=newLineCodeAux.replace(re,linea2[j]);
					j++;
				}
				pseudoReplaced=1;
				var newCode=newLineCodeAux.split('\n');
				break;
			}
		}

		if(pseudoReplaced==0)
		{
			tokensAux.push(tokens[i]);

                        tokensPrint1.push(tokens[i]); 
		        tokensPrint2.push(tokens[i]);

                        continue;
		}

		for(var k=0;k<newCode.length;k++)
		{
			var numAux;
			if(numAux=newCode[k].search("sel ")!=-1)
			{
				var fieldsInstruction=newCode[k].trim().split(" ");
				var lineAux="";
				var pseudoReplace=new Object();
				pseudoReplace.pos=tokensAux.length;
				pseudoReplace.label="";
				pseudoReplace.bi=0;
				pseudoReplace.bf=0;
				var l=0;
				while(fieldsInstruction[l]!="sel")
				{
					lineAux=lineAux + " " + fieldsInstruction[l];
					l++;
				}
				if(k==0 && labelPseudoExist==1)
				{
					pseudoReplace.fieldPos=l+2;
				}else
				{
					pseudoReplace.fieldPos=l;
				}
				lineAux=lineAux.trim();
				l=l+2;
				pseudoReplace.bi=fieldsInstruction[l];
				l=l+2;
				pseudoReplace.bf=fieldsInstruction[l];
				l=l+2;
				pseudoReplace.label=fieldsInstruction[l];
				lineAux=lineAux + " " + fieldsInstruction[l];
				selectionPseudoInstructions.push(pseudoReplace);

				if(k==0 && labelPseudoExist==1)
				{
					newCode[k]=labelPseudoAux + lineAux;
				}else
				{
					newCode[k]=lineAux;
				}
			}

			tokensAux.push(newCode[k]);

                        if (k == 0)
			     tokensPrint1.push(tokens[i]);
			else tokensPrint1.push("&nbsp;");
			tokensPrint2.push(newCode[k]);
		}

	}
	tokens=tokensAux;

	/*FIN REEMPLAZO DE PSEUDOINSTRUCCIONES*/
    for (i = 0; i < tokens.length; i++) 
    {
        var arrayLinea2 = new Array();
        j = 0;
        var linea2 = tokens[i].trim().toString().split(" ");
        var firmaAssembly2 = "";
	if(linea2.length>1)
	{
        	if (linea2[1 + j] == ":") 
        	{
            		etiquetas[linea2[j].trim()] = offset.toString(16);
            		j += 2
        	}
	}
        firmaAssembly2 += linea2[j].trim();
        j++;
        while (j < linea2.length) 
        {
            if (linea2[j].trim().substring(0, 1) == "$") 
            {
                //REGISTRO
                if (linea2[j - 1].trim() == "(") 
                {
                    firmaAssembly2 += "reg";
                } else 
                {
                    firmaAssembly2 += ",reg";
                }
                j++;
            } else
    	    {
		if(linea2[j].trim().substring(0,2) == "0x")
		{
				if(linea2[j].trim().substr(2,linea2[j].trim().length-2).match(/^[0-9a-fA-F]+$/))
				{
					firmaAssembly2 += ",num";
					j++;
				}else
				{
					return assemblyError("Error in Hex format: ", linea2, j);
				}
		}else
		{
			if(linea2[j].trim().substring(0,1)=="0" && linea2[j].trim().match(/^[0-9]+$/))
			{
				firmaAssembly2 += ",num";
				j++;
			}else
			{
				if((linea2[j].trim().substring(0,1)=="-" &&  linea2[j].trim().substr(1,linea2[j].trim().length-1).match(/^[0-9]+$/)) || (linea2[j].trim().match(/^[0-9]+$/)))
				{
					firmaAssembly2 += ",num";		
					j++;
				}else
				{
					if(linea2[j].trim()=="(")
					{
						firmaAssembly2 += "(";
						j++;
					}else
					{
						if(linea2[j].trim()== ")")
						{
							firmaAssembly2 += ")";
							j++;
						}else
						{
							if(linea2[j].trim()==",")
							{
								j++;
							}else
							{
								firmaAssembly2 += ",num";		
								j++;
							}
						}
					}
				}
			}
                  }        
            }
        }
	var signatureCorrect = 0;
        for (j = 1; j < datosCU.firmware.length; j++) 
        {
            if (datosCU.firmware[j].signatureGlobal == firmaAssembly2.trim()) 
            {
                offset = offset + 4 * parseInt(datosCU.firmware[j].nwords);
		signatureCorrect = 1;
                break;
            }
        }
	if(signatureCorrect == 0)
	{	
		return assemblyError("Signature not found, assembly instruction incorrect: ", linea2, 0);
	}
    }

    //SUSTITUCION DE VALOR DE ETIQUETA
    var x;
    for (x in etiquetas) 
    {
        for (i = 0; i < tokens.length; i++) 
        {
	   tokens[i]=tokens[i] + " ";
           tokens[i]=tokens[i].replace(" " + x + " ", " 0x" + etiquetas[x] + " ");
           tokens[i]=tokens[i].trim();
        }
    }
    //REEMPLAZO DE SEL EN PSEUDOINSTRUCCIONES
    for(i=0;i<selectionPseudoInstructions.length;i++)
    {
	var replacePos=selectionPseudoInstructions[i].pos;
	var replacePosLabel=selectionPseudoInstructions[i].fieldPos;
	var replaceLabel=selectionPseudoInstructions[i].label;
	var fieldAux=tokens[replacePos].split(" ");
	var labelAux=fieldAux[replacePosLabel].toString();
	fieldAux=parseInt(fieldAux[replacePosLabel]).toString(2);
	var n1="00000000000000000000000000000000";
	var n2=n1+fieldAux;
	n2=n2.substr(n2.length-32,32);
	n2=n2.substr(31-selectionPseudoInstructions[i].bi,(selectionPseudoInstructions[i].bi-selectionPseudoInstructions[i].bf)+1);
	tokens[replacePos]=tokens[replacePos].replace(labelAux,parseInt(n2,2).toString());
	tokensPrint2[replacePos]=tokens[replacePos];
    }

    //generamos binario
    offset = parseInt(objText.begin);
    var binaryCode = new Object();
    var error = 0;
    for (i = 0; i < tokens.length; i++) 
    {
        var arrayLinea = new Array();
        j = 0;
        var linea = tokens[i].trim().toString().split(" ");
        var firmaAssembly = "";
        if(linea.length>1)
	{
        	if (linea[1 + j].trim() == ":") 
        	{
            		j+=2
        	}
	}
        firmaAssembly += linea[j].trim();
        arrayLinea.push(linea[j].trim());
        j++;
        while (j < linea.length) 
        {
            	if (linea[j].trim().substring(0, 1) == "$") 
            	{
                	//REGISTRO
                	if (linea[j - 1].trim() == "(") 
                	{
                    		firmaAssembly += "reg";
                	} else 
                	{
                    		firmaAssembly += ",reg";
                	}
                	arrayLinea.push(linea[j].trim());
                	j++;
            	} else 
            	{	
			if(linea[j].trim().substring(0,2) == "0x")
			{
					if(linea[j].trim().substr(2,linea[j].trim().length-2).match(/^[0-9a-fA-F]+$/))
					{
						firmaAssembly += ",num";
						arrayLinea.push(linea[j].trim());
						j++;
					}else
					{
						// console.log("ERROR EN FORMATO HEXADECIMAL");
					}
			}else
			{
				if(linea[j].trim().substring(0,1)=="0" && linea[j].trim().match(/^[0-9]+$/))
				{
					firmaAssembly += ",num";
					arrayLinea.push(linea[j].trim());
					j++;
				}else
				{
					if((linea[j].trim().substring(0,1)=="-" &&  linea[j].trim().substr(1,linea[j].trim().length-1).match(/^[0-9]+$/)) || (linea[j].trim().match(/^[0-9]+$/)))
					{
						firmaAssembly += ",num";
						arrayLinea.push(linea[j].trim());		
						j++;
					}else
					{
						if(linea[j].trim()=="(")
						{
							firmaAssembly += "(";
							j++;
						}else
						{
							if(linea[j].trim()== ")")
							{
								firmaAssembly += ")";
								j++;
							}else
							{
								if(linea[j].trim()==",")
								{
									j++;
								}else
								{
									return assemblyError("Error, field not correct: ", linea, j);
								}
							}
						}
					}
				}
			  }       
                }
            }

            for (j = 1; j < datosCU.firmware.length; j++) 
            {
                var lineaAssembly = "";
                if (datosCU.firmware[j].signatureGlobal == firmaAssembly) 
                {
                    //REEMPLAZO DE INSTRUCCION !!!
                    var longitud = parseInt(datosCU.firmware[j].nwords);
                    lineaAssembly = "00000000000000000000000000000000";
                    for (z = 1; z < longitud; z++)
                    {
                        lineaAssembly = lineaAssembly + "00000000000000000000000000000000" ;
                    }

                    var camposInsertar = datosCU.firmware[j].co;
                    lineaAssembly = camposInsertar + lineaAssembly.substr(6, lineaAssembly.length - 6);
                    //instr.substr(0, start) + "replacement" + instr.substr(start + length);
                    //iteramos por los campos
                    for (z = 0; z < datosCU.firmware[j].fields.length; z++) 
                    {
                        switch (camposInsertar = datosCU.firmware[j].fields[z].type) 
                        {
                            case "reg":
                                /*SE HA DE VERIFICAR SI ES PSEUDONOMBRE --- CORREGIR*/
				//quitamos $ y sacamos el valor en binario
				var registerAux="";
				registerAux=arrayLinea[z+1].substr(1,arrayLinea[z+1].length -1);
				registerAux=parseInt(registerAux);
				if(registerAux>=0 && registerAux<=32)
				{
					camposInsertar = (parseInt(arrayLinea[z + 1].substr(1, arrayLinea[z + 1].length - 1))).toString(2);
				}else
				{
					var registerCorrect=0;
					for(var k in datosCU.registers)
					{
						if(datosCU.registers[k]==arrayLinea[z+1])
						{
							camposInsertar = parseInt(k).toString(2);
							registerCorrect=1;
						}
					}
					if(registerCorrect==0)
					{

						return assemblyError("Error, name of register incorrect: ", arrayLinea, z+1);
					}
				}
                                break;

                            case "address":
				if(arrayLinea[z+1].trim().substring(0,2) == "0x")
                        	{
                                        if(arrayLinea[z+1].trim().substr(2,arrayLinea[z+1].trim().length-2).match(/^[0-9a-fA-F]+$/))
                                        {
                                                camposInsertar = parseInt(arrayLinea[z + 1]).toString(2);
                                        }else
                                        {
						return assemblyError("Error in Hex format: ", arrayLinea, z+1);
                                        }
                        	}else
                        	{
                                	if(arrayLinea[z+1].trim().substring(0,1)=="0" && arrayLinea[z+1].trim().match(/^[0-9]+$/))
                                	{
                                        	camposInsertar = parseInt(arrayLinea[z + 1],8).toString(2);
                                	}else
                                	{
                                                if((arrayLinea[z+1].trim().substring(0,1)=="-" &&  arrayLinea[z+1].trim().substr(1,arrayLinea[z+1].trim().length).match(/^[0-9]+$/)) || 
						(arrayLinea[z+1].trim().match(/^[0-9]+$/)))
                                        	{
                                                	camposInsertar = parseInt(arrayLinea[z + 1] >>> 0).toString(2);
                                        	}else
                                        	{	
							return assemblyError("Error in numeric format: ", arrayLinea, z+1);
                                        	}
                                	}
                          	}
				if(datosCU.firmware[j].fields[z].address_type=="abs")
				{
					/*YA REALIZADO PREVIAMENTE EN EL REEMPLAZO DE ETIQUETA*/
				}else
				{
					if(datosCU.firmware[j].fields[z].address_type=="rel")
					{
						var rel = parseInt(camposInsertar,2);
						rel = rel - offset - 4;
						camposInsertar= (rel >>> 0).toString(2);
     					}else
					{
						// console.log("DIRECCIONAMIENTO NO ACEPTADO");
					}
				}
                                break;

                            case "inm":
                              	if(arrayLinea[z+1].trim().substring(0,2) == "0x")
                                {
                                        if(arrayLinea[z+1].trim().substr(2,arrayLinea[z+1].trim().length-2).match(/^[0-9a-fA-F]+$/))
                                        {
                                                camposInsertar = parseInt(arrayLinea[z + 1]).toString(2);
                                        }else
                                        {
						return assemblyError("Error in Hex format: ", arrayLinea, z+1);
                                        }
                                }else
                                {
                                        if(arrayLinea[z+1].trim().substring(0,1)=="0" && arrayLinea[z+1].trim().match(/^[0-9]+$/))
                                        {
                                                camposInsertar = parseInt(arrayLinea[z + 1],8).toString(2);
                                        }else
                                        {
                                                if((arrayLinea[z+1].trim().substring(0,1)=="-" &&  arrayLinea[z+1].trim().substr(1,arrayLinea[z+1].trim().length).match(/^[0-9]+$/)) || 
						(arrayLinea[z+1].trim().match(/^[0-9]+$/)))
                                                {
                                                        camposInsertar = parseInt(arrayLinea[z + 1] >>> 0).toString(2);
                                                }else
                                                {
							return assemblyError("Error in numeric format: ", arrayLinea, z+1);
                                                }
                                        }
                                }
				camposInsertar = parseInt(arrayLinea[z + 1] >>> 0).toString(2);
                                break;
                        }
                        //consultamos bi y bf, y procedemos a : outstr= instr.substr(0, start) + "replacement" + instr.substr(start + length, longitud- start+length);
                        //convertir bi
                        var bi = ((longitud*32) - 1) - parseInt(datosCU.firmware[j].fields[z].startbit);
                        var bf = ((longitud*32) - 1) - parseInt(datosCU.firmware[j].fields[z].stopbit);
                        var padding = "00000000000000000000000000000000";
                        if(camposInsertar.length>32)
			{
				return assemblyError("Error, number out of range (>32 bits)", arrayLinea, z+1);
			}
			if(camposInsertar.length > (Math.abs(bf-bi)+1))
			{
				return assemblyError("Error, number out of range (>" + (Math.abs(bf-bi)+1)+ " bits)",arrayLinea, z+1);
			}
			camposInsertar = padding + camposInsertar;
                        camposInsertar = camposInsertar.substr((camposInsertar.length - 1) - (bf - bi), (bf - bi) + 1);
                        //convertir bf
                        lineaAssembly = lineaAssembly.substr(0, bi) + camposInsertar + lineaAssembly.substr(bf + 1, parseInt(datosCU.firmware[j].fields[z].stopbit));
                    }

                    var initial_offset = "0x" + offset.toString(16) ;
                    for (var k = 0; k < longitud; k++) 
                    {
			    if ( (k==0) && (typeof datosCU.firmware[j].cop != "undefined") )
			    {
				var auxLineaAssemblyCop=lineaAssembly.substr(0,32-4);
				lineaAssembly=lineaAssembly.substr(31,lineaAssembly.length-32);
				auxLineaAssemblyCop=auxLineaAssemblyCop + datosCU.firmware[j].cop;
				lineaAssembly=auxLineaAssemblyCop + lineaAssembly;
			    }
		    	    //.toString(16)
		            binaryCode["0x" + offset.toString(16)] = lineaAssembly.substr(32 * k, 32);
		    	    offset = offset + 4;
                    }

		    var line = "";
		    for (var m=0; m<arrayLinea.length; m++) {
		         line = line + " " + arrayLinea[m];
		    }

		    var lineObj = new Object();
		//  lineObj.source          = line.trim();
		    lineObj.source_original = tokensPrint1[i] ;
		    lineObj.source          = tokensPrint2[i] ;
		    lineObj.breakpoint      = false;
		    lineObj.binary          = binaryCode[initial_offset];

		    binaryCodeAssemblyTraduction[initial_offset] = lineObj;
                    break;
                }
            }

            // console.log("Ensamblador");
            // console.log(arrayLinea);
            // console.log("Firma");
            // console.log(firmaAssembly);
            // console.log("Linea compilada");
            // console.log(lineaAssembly);
            //firma generada --> reemplazo
        }

        objText.end   = parseInt(offset.toString(16),16);
      //objText.begin = parseInt(objText.begin).toString(16);

	var finalTextSegmentCompilation	= new Object();
	finalTextSegmentCompilation.binaryCode		=	binaryCode;
	finalTextSegmentCompilation.assemblyCode	=	binaryCodeAssemblyTraduction;
	finalTextSegmentCompilation.etiquetas		= 	etiquetas;
        finalTextSegmentCompilation.error		= 	null;
	return finalTextSegmentCompilation;
}

function simlang_compile (text, datosCU)
{
	var memory=new Array();
	var tokens = text.split("\n");
	var textSegmentData=new Array();
	var textSegmentText=new Array();
    	var i = 0;
    	var j = 0;
    	var state=0; /*1==segment data --- 2==segment text*/
	var ret = new Object();
	ret.seg = {
                    "system": { "name":"system", "begin":0x0000, "end":0x0200, "color": "#A9D0F5" },
                    "data":   { "name":"data",   "begin":0x1000, "end":0xFFFF, "color": "#FACC2E" },
                    "code":   { "name":"code",   "begin":0x8000, "end":0xFFFF, "color": "#BEF781" },
                    "stack":  { "name":"stack",  "begin":0xFFFF, "end":0xFFFF, "color": "#F1F2A3" }
                  };

    for (i = 0; i < tokens.length; i++) 
    {
    	var lineaAux=tokens[i];
    	lineaAux= lineaAux.replace(/:/g, " : ");
    	lineaAux = lineaAux.replace(/,/g, " , ");
    	lineaAux = lineaAux.replace(/\(/g, " ( ");
    	lineaAux = lineaAux.replace(/\)/g, " )");
    	lineaAux = lineaAux.replace(/#/g, "# ");
    	lineaAux = lineaAux.replace(/\t/g, "");
    	lineaAux = lineaAux.replace(/  /g, " ");
    	lineaAux = lineaAux.replace(/\s{2,}/g, ' ');
        lineaAux = lineaAux.trim();
        var linea = lineaAux.split(" ");
        if(linea[0].trim() == ".data")
        {
        	state=1;
        }
        if(linea[0].trim() == ".text")
        {
        	state=2;
        }
        switch(state)
        {
        	case 1:
        		if(linea[0].length>0)
			{
				if(linea[0][0].trim () =="#" || linea[0].trim() == ".data")
               	 		{
                			//LINEA COMENTADA;
	                	}else
         	        	{
                			textSegmentData.push(tokens[i].trim());	
                		}
			}
        		break;
        	case 2:
        		if(linea[0].length>0)
			{
				if(linea[0][0].trim() == "#" || linea[0].trim() == ".text" || (linea[0].trim() == ".globl"))
                		{
                			//LINEA COMENTADA;
	                	}else
        	        	{
                			textSegmentText.push(tokens[i].trim());	
                		}
			}
        		break;
        	default:
        		break;
        }
    }

	if(state==1)
	{
		ret.mp		=	null;
		ret.labels2	=	null;
		ret.error	=	"Error, '.text' not defined.";
		return ret;
	}
    	var resultSegmentData=dataSegment(textSegmentData,ret.seg["data"]);
    	if(resultSegmentData.error!=null)
    	{
		ret.mp		=	null;
		ret.labels2	=	null;
		ret.error	=	resultSegmentData.error;
		return ret;
    	}
	var dataSegmentData=resultSegmentData.segmentData;
	var binarySegmentData=resultSegmentData.compileSegmentData;
	// console.log(dataSegmentData);
	/*generamos array de etiquetas*/
	var etiquetas = new Object;
	for(i=0;i<dataSegmentData.length;i++)
	{
		etiquetas[dataSegmentData[i].name]=dataSegmentData[i].posicion;	
	}
	var x;
	for (x in etiquetas) 
	{
		for (i = 0; i < textSegmentText.length; i++) 
		{
 			textSegmentText[i]=textSegmentText[i] + " ";
 			textSegmentText[i]=textSegmentText[i].replace(" "+ x + " ", " " + etiquetas[x].toString(16) + " ");
			textSegmentText[i]=textSegmentText[i].trim();
		}
	}
	var compilationSegmentText=textSegment(textSegmentText, datosCU, ret.seg["code"]);
	if(compilationSegmentText.error!=null)   
	{
		ret.mp		=	null;
		ret.labels2	=	null;
		ret.error	=	compilationSegmentText.error;
		return ret;
	}
	var dataSegmentText=compilationSegmentText.binaryCode;
	// console.log(dataSegmentData);
	// console.log(dataSegmentText);
	for(x in compilationSegmentText.etiquetas)
	{
		etiquetas[x]="0x" + compilationSegmentText.etiquetas[x];
	}    
	var finalMp = {};
	for (var attrname in dataSegmentText)   { finalMp[attrname] = dataSegmentText[attrname]; }
	for (var attrname in binarySegmentData) { finalMp[attrname] = binarySegmentData[attrname]; }
	// packing everything
	ret.mp      	= finalMp;
	ret.labels2 	= etiquetas;
	ret.error   	= null;
	ret.assembly	= compilationSegmentText.assemblyCode;
	return ret ;
}


function assemblyError (msgError, tokens, index)
{
	var ret = new Object();
	ret.binaryCode	= null;
	ret.etiquetas	= null;	
	ret.error	= null;
	ret.error = msgError + ":\n";
	for (var i=index-8; i<(index+8); i++)
	{
		if (typeof tokens[i] != "undefined")
			ret.error = ret.error + " " + tokens[i];
	}
	ret.error = "..." + ret.error + "...";

	return ret;
}

function dataError (msgError, tokens, index)
{
	var ret = new Object();
	ret.binaryCode		= null;
	ret.etiquetas		= null;	
	ret.error		= null;
	ret.assemblyCode 	= null;
	ret.error = msgError + ":\n";
	for (var i=index-8; i<(index+8); i++)
	{
		if (typeof tokens[i] != "undefined")
			ret.error = ret.error + " " + tokens[i];
	}
	ret.error = "..." + ret.error + "...";

	return ret;
}

