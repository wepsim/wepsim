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
 *  Control Unit
 */

function cu_poc_register ( sim_p )
{
	/*
	 *  Control States, and Default elements at the Instruction Register (IR)
	 */

        sim_p.ctrl_states.mpc = {
		                     name:  "mPC",
		                     state: "REG_MICROADDR",
		                     is_pointer: false
	                          } ;


	/*
	 *  Internal States
	 */

        sim_p.internal_states.MC           = {} ;
        sim_p.internal_states.ROM          = {} ;

        sim_p.internal_states.FIRMWARE     = ws_empty_firmware ;


	/*
	 *  States
	 */

	/* CONTROL UNIT */
	sim_p.states["REG_MICROADDR"]  = { name: "µADDR", verbal: "Microaddress Register",
                                             visible:true, nbits: "12", value:0,  default_value:0,
                                             draw_data: ['svg_cu:text4667'] };
	sim_p.states["REG_MICROINS"]   = { name: "µINS", verbal: "Microinstruction Register",
                                             visible:true, nbits: "77", value:{}, default_value:{},
                                             draw_data: [] };

	sim_p.states["FETCH"]          = { name: "FETCH",          verbal: "Input Fetch",
                                             visible:false, nbits: "12", value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["ROM_MUXA"]       = { name: "ROM_MUXA",       verbal: "Input ROM",
                                             visible:false, nbits: "12", value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["SUM_ONE"]        = { name: "SUM_ONE",        verbal: "Input next microinstruction",
                                             visible:false, nbits: "12", value:1, default_value:1,
                                             draw_data: [] };

	sim_p.states["MUXA_MICROADDR"] = { name: "MUXA_MICROADDR", verbal: "Input microaddress",
                                             visible:false, nbits: "12", value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["MUXC_MUXB"]      = { name: "MUXC_MUXB", verbal: "Output of MUX C",
                                             visible:false, nbits: "1",  value:0, default_value:0,
                                             draw_data: [] };
	sim_p.states["INEX"]           = { name: "INEX",      verbal: "Illegal Instruction Exception",
                                             visible:false, nbits: "1",  value:0, default_value:0,
                                             draw_data: [] };

	/*
	 *  Signals
	 */

	/* CONTROL UNIT */
	 sim_p.signals["C"]    = { name: "C",    visible: true, type: "L", value: 0, default_value: 0, nbits: "4",
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
	 sim_p.signals["B"]    = { name: "B", visible: true, type: "L", value: 0, default_value:0, nbits: "1",
			             behavior: ["MV A1 MUXC_MUXB; FIRE A1",
					        "NOT_ES A1 MUXC_MUXB; FIRE A1"],
                                     depends_on: ["CLK"],
			             fire_name: ['svg_cu:text3408'],
			             draw_data: [['svg_cu:path3094-7', 'svg_cu:path3100-8-7', 'svg_cu:path3198-7', 'svg_cu:path3200-1'],
					        ['svg_cu:path3392','svg_cu:path3372','svg_cu:path3390','svg_cu:path3384','svg_cu:path3108-1','svg_cu:path3100-8-7', 'svg_cu:path3200-1', 'svg_cu:path3386']],
			             draw_name: [[],['svg_cu:path3194-0','svg_cu:path3138-8','svg_cu:path3498-6']] };
	 sim_p.signals["A0"]   = { name: "A0", visible: false, type: "L", value: 0, default_value:0, nbits: "1",
			             behavior: ["SBIT_SIGNAL A0A1 0 1; FIRE A0A1",
					        "SBIT_SIGNAL A0A1 1 1; FIRE A0A1"],
                                     depends_on: ["CLK"],
			             fire_name: ['svg_cu:text3406'],
			             draw_data: [['svg_cu:path3096'], ['svg_cu:path3096']],
			             draw_name: [[],['svg_cu:path3138-8-1','svg_cu:path3098-2','svg_cu:path3124-2-5']] };
	 sim_p.signals["A1"]   = { name: "A1", visible: false, type: "L", value: 0, default_value:0, nbits: "1",
			             behavior: ["SBIT_SIGNAL A0A1 0 0; FIRE A0A1",
			 		        "SBIT_SIGNAL A0A1 1 0; FIRE A0A1"],
                                     depends_on: ["CLK"],
			             fire_name: [],
			             draw_data: [['svg_cu:path3094'], ['svg_cu:path3094']],
			             draw_name: [[]] };

	 sim_p.signals["A0A1"] = { name: "A0A1", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
				     behavior: ["PLUS1 MUXA_MICROADDR REG_MICROADDR",
					        "CP_FIELD MUXA_MICROADDR REG_MICROINS/MADDR",
					        "MV MUXA_MICROADDR ROM_MUXA",
					        "MV MUXA_MICROADDR FETCH"],
                                     depends_on: ["CLK"],
				     fire_name: [],
				     draw_data: [['svg_cu:path3102', 'svg_cu:path3100', 'svg_cu:path3098', 'svg_cu:path3100-9', 'svg_cu:path3088', 'svg_cu:path3082'],
					         ['svg_cu:path3104', 'svg_cu:path3134', 'svg_cu:path3500', 'svg_cu:path3416', 'svg_cu:path3124-2-4', 'svg_cu:path3124-2'],
					         ['svg_cu:path3504', 'svg_cu:path3100-8', 'svg_cu:path3234-9'],
					         ['svg_cu:path3124']],
				     draw_name: [[]] };

	return sim_p ;
}

