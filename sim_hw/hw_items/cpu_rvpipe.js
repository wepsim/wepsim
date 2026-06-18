/*
 *  Copyright 2015-2026 The WepSIM team (see docs/WEPSIM-TEAM.md)
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
 *  CPU - 5-stage pipeline (IF, ID, EX, MEM, WB)
 */

function cpu_rvpipe_register(sim_p) {
    sim_p.components["CPU"] = {
        name: "CPU",
        version: "1",
        abilities: ["CPU"],

        details_name: ["REGISTER_FILE", "CONTROL_MEMORY", "CLOCK", "CPU_STATS"],
        details_fire: [['svg_p:text6639'],
        ['svg_p:path7363', 'svg_p:path7365', 'svg_p:path7367', 'svg_p:path7369',
            'svg_p:path7371', 'svg_p:path7373', 'svg_p:path7375', 'svg_p:path7377', 'svg_p:path7379'],
        ['svg_p:text7327']],

        write_state: function (vec) {
            if (typeof vec.CPU == "undefined") {
                vec.CPU = {};
            }

            var internal_reg = ["PC"];

            var value = 0;
            for (var i = 0; i < sim_p.states.BR.length; i++) {
                value = parseInt(get_value(sim_p.states.BR[i])) >>> 0;
                if (value != 0) {
                    vec.CPU["R" + i] = {
                        "type": "register",
                        "default_value": 0x0,
                        "id": "R" + i,
                        "op": "=",
                        "value": "0x" + value.toString(16)
                    };
                }
            }

            for (i = 0; i < internal_reg.length; i++) {
                value = parseInt(get_value(sim_p.states['REG_' + internal_reg[i]])) >>> 0;
                if (value != 0) {
                    vec.CPU[internal_reg[i]] = {
                        "type": "register",
                        "default_value": 0x0,
                        "id": internal_reg[i],
                        "op": "=",
                        "value": "0x" + value.toString(16)
                    };
                }
            }

            return vec;
        },
        read_state: function (vec, check) {
            if (typeof vec.CPU == "undefined") {
                vec.CPU = {};
            }

            var key = check["id"].toUpperCase().trim();
            var val = parseInt(check["value"]).toString(16);
            if ("REGISTER" == check["type"].toUpperCase().trim()) {
                vec.CPU[key] = {
                    "type": "register",
                    "default_value": 0,
                    "id": key,
                    "op": check["condition"],
                    "value": "0x" + val
                };
                return true;
            }

            return false;
        },
        get_state: function (reg) {
            var value = 0;
            var r_reg = reg.toUpperCase().trim();
            if (typeof sim_p.states['REG_' + r_reg] != "undefined") {
                value = get_value(sim_p.states['REG_' + r_reg]) >>> 0;
                return "0x" + value.toString(16);
            }

            r_reg = r_reg.replace('R', '');
            var index = parseInt(r_reg);
            if (typeof sim_p.states.BR[index] != "undefined") {
                value = get_value(sim_p.states.BR[index]) >>> 0;
                return "0x" + value.toString(16);
            }

            return null;
        },

        get_value: function (elto) {
            var r_ref = simhw_sim_state_getref(elto);
            if (typeof r_ref == "undefined") {
                throw new Error("unknown element named " + elto);
            }

            return (get_value(r_ref) >>> 0);
        },
        set_value: function (elto, value) {
            var pc_name = simhw_sim_ctrlStates_get().pc.state;
            if (pc_name === elto) {
                show_asmdbg_pc();
            }

            var r_ref = simhw_sim_state_getref(elto);
            if (typeof r_ref == "undefined") {
                throw new Error("unknown element named " + elto);
            }

            return set_value(r_ref, value);
        }
    };


    /*
     *  Control States
     */

    sim_p.ctrl_states.pc = {
        name: "PC",
        state: "REG_PC",
        is_pointer: true
    };
    sim_p.ctrl_states.sp = {
        name: "SP",
        state: "BR.29",
        is_pointer: true
    };
    sim_p.ctrl_states.fp = {
        name: "FP",
        state: "BR.30",
        is_pointer: true
    };
    sim_p.ctrl_states.ir = {
        name: "IR",
        state: "REG_IR",
        default_eltos: {
            "oc": { "begin": 25, "end": 31, "length": 7 },
            "eoc": [{ "begin": 17, "end": 19, "length": 3 }, { "begin": 0, "end": 6, "length": 7 }]
        },
        is_pointer: false
    };
    sim_p.ctrl_states.mpc = {
        name: "mPC",
        state: "MUXA_MICROADDR",
        is_pointer: false
    };


    /*
     *  Internal States
     */

    sim_p.internal_states.io_hash = {};
    sim_p.internal_states.fire_stack = [];
    sim_p.internal_states.FIRMWARE = ws_empty_firmware;
    sim_p.internal_states.MC = { 0: { is_native: true, value: {}, default_value: {} } };
    sim_p.internal_states.ROM = {};
    sim_p.internal_states.drain = 0;
    sim_p.internal_states.draining = false;

    sim_p.internal_states.tri_state_names = [];
    sim_p.internal_states.fire_visible = { 'databus': false, 'internalbus': false };
    sim_p.internal_states.filter_states = ["REG_IR_DECO,virtual", "REG_IR,real",
        "REG_PC,real"];
    sim_p.internal_states.filter_signals = ["ALUOP,0", "PCWRITE,0",
        "IMR,0", "IRWRITE,0", "RW,0", "DMR,0", "DMW,0"];
    sim_p.internal_states.alu_flags = { 'flag_n': 0, 'flag_z': 0 };
    sim_p.internal_states.halt = 0;


    /*
     *  States
     */

    /* REGISTER FILE STATES */
    sim_p.states.BR = [];
    sim_p.states.BR[0] = { name: "R0", verbal: "Register 0", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[1] = { name: "R1", verbal: "Register 1", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[2] = { name: "R2", verbal: "Register 2", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[3] = { name: "R3", verbal: "Register 3", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[4] = { name: "R4", verbal: "Register 4", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[5] = { name: "R5", verbal: "Register 5", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[6] = { name: "R6", verbal: "Register 6", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[7] = { name: "R7", verbal: "Register 7", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[8] = { name: "R8", verbal: "Register 8", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[9] = { name: "R9", verbal: "Register 9", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[10] = { name: "R10", verbal: "Register 10", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[11] = { name: "R11", verbal: "Register 11", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[12] = { name: "R12", verbal: "Register 12", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[13] = { name: "R13", verbal: "Register 13", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[14] = { name: "R14", verbal: "Register 14", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[15] = { name: "R15", verbal: "Register 15", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[16] = { name: "R16", verbal: "Register 16", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[17] = { name: "R17", verbal: "Register 17", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[18] = { name: "R18", verbal: "Register 18", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[19] = { name: "R19", verbal: "Register 19", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[20] = { name: "R20", verbal: "Register 20", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[21] = { name: "R21", verbal: "Register 21", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[22] = { name: "R22", verbal: "Register 22", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[23] = { name: "R23", verbal: "Register 23", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[24] = { name: "R24", verbal: "Register 24", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[25] = { name: "R25", verbal: "Register 25", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[26] = { name: "R26", verbal: "Register 26", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[27] = { name: "R27", verbal: "Register 27", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[28] = { name: "R28", verbal: "Register 28", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[29] = { name: "R29", verbal: "Register 29", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[30] = { name: "R30", verbal: "Register 30", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };
    sim_p.states.BR[31] = { name: "R31", verbal: "Register 31", visible: true, nbits: "32", value: 0, default_value: 0, draw_data: [] };

    sim_p.states["REG_PC"] = {
        name: "PC", verbal: "Program Counter Register",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["REG_IR"] = {
        name: "IR", verbal: "Instruction Register",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["REG_OUT"] = {
        name: "OUT", verbal: "Out Register",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* ALU (RELATED) STATES */
    sim_p.states["M2_ALU"] = {
        name: "M2_ALU", verbal: "Input ALU via M2",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["M3_ALU"] = {
        name: "M3_ALU", verbal: "Input ALU via M3",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["ALU_WOUT"] = {
        name: "ALU_WOUT", verbal: "Input of OUT Register",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    sim_p.states["FLAG_N"] = {
        name: "FLAG_N", verbal: "Negative Flag",
        visible: true, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["FLAG_Z"] = {
        name: "FLAG_Z", verbal: "Zero Flag",
        visible: true, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };

    /* REGISTER FILE INTERFACE STATES */
    sim_p.states["M1_RW"] = {
        name: "M1_RW", verbal: "Input Register File via M1",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["W_DATA"] = {
        name: "W_DATA", verbal: "Write Data",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["R_DATA1"] = {
        name: "R_DATA1", verbal: "Read Data 1",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["R_DATA2"] = {
        name: "R_DATA2", verbal: "Read Data 2",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* DEVICES AND BUSES */
    sim_p.states["INTV"] = {
        name: "INTV", verbal: "Interruption Vector",
        visible: false, nbits: "8", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["IORdy"] = {
        name: "IORdy", verbal: "From MUX-C/1 to JUMP",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["BUS_DB"] = {
        name: "BUS_DB", verbal: "Data Bus",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["BUS_AB"] = {
        name: "BUS_AB", verbal: "Address Bus",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* PIPELINE REGISTERS */
    // IF/ID
    sim_p.states["IF_ID_INS"] = {
        name: "IF_ID_INS", verbal: "IF/ID Instruction",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    // ID/EX
    sim_p.states["ID_EX_RS1"] = {
        name: "ID_EX_RS1", verbal: "ID/EX Read Data 1",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["ID_EX_RS2"] = {
        name: "ID_EX_RS2", verbal: "ID/EX Read Data 2",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["ID_EX_RS1_ADDR"] = {
        name: "ID_EX_RS1_ADDR", verbal: "ID/EX RS1 Addr",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["ID_EX_RS2_ADDR"] = {
        name: "ID_EX_RS2_ADDR", verbal: "ID/EX RS2 Addr",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["ID_EX_RD"] = {
        name: "ID_EX_RD", verbal: "ID/EX Dest Register",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["ID_EX_ALUOP"] = {
        name: "ID_EX_ALUOP", verbal: "ID/EX ALU Op",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["ID_EX_ALUSRC"] = {
        name: "ID_EX_ALUSRC", verbal: "ID/EX ALU Src (0=rs2,1=imm)",
        visible: true, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["ID_EX_IMM"] = {
        name: "ID_EX_IMM", verbal: "ID/EX Immediate",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    // EX/MEM
    sim_p.states["EX_MEM_ALUOUT"] = {
        name: "EX_MEM_ALUOUT", verbal: "EX/MEM ALU Result",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["EX_MEM_WDATA"] = {
        name: "EX_MEM_WDATA", verbal: "EX/MEM Write Data",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["EX_MEM_RD"] = {
        name: "EX_MEM_RD", verbal: "EX/MEM Dest Register",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["EX_MEM_WB"] = {
        name: "EX_MEM_WB", verbal: "EX/MEM WriteBack",
        visible: true, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    // MEM/WB
    sim_p.states["MEM_WB_DATA"] = {
        name: "MEM_WB_DATA", verbal: "MEM/WB Write Data",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["MEM_WB_RD"] = {
        name: "MEM_WB_RD", verbal: "MEM/WB Dest Register",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["MEM_WB_WB"] = {
        name: "MEM_WB_WB", verbal: "MEM/WB WriteBack",
        visible: true, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };

    // Pipeline PC tracking (for debug display)
    sim_p.states["IF_ID_PC"] = {
        name: "IF_ID_PC", verbal: "IF/ID PC",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["ID_EX_PC"] = {
        name: "ID_EX_PC", verbal: "ID/EX PC",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["EX_MEM_PC"] = {
        name: "EX_MEM_PC", verbal: "EX/MEM PC",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["MEM_WB_PC"] = {
        name: "MEM_WB_PC", verbal: "MEM/WB PC",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* MUX INTERFACE STATES (for signal compatibility) */
    sim_p.states["M4_PC"] = {
        name: "M4_PC", verbal: "Input PCWrite via M4",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["M1_RW"] = {
        name: "M1_RW", verbal: "Input Register File via M1",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["RDATA"] = {
        name: "RDATA", verbal: "Read Data from Memory",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* CONSTANTS */
    sim_p.states["VAL_ZERO"] = {
        name: "VAL_ZERO", verbal: "Wired Zero",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["VAL_ONE"] = {
        name: "VAL_ONE", verbal: "Wired One",
        visible: false, nbits: "32", value: 1, default_value: 1,
        draw_data: []
    };
    sim_p.states["VAL_FOUR"] = {
        name: "VAL_FOUR", verbal: "Wired Four",
        visible: false, nbits: "32", value: 4, default_value: 4,
        draw_data: []
    };
    sim_p.states["VAL_IMM"] = {
        name: "VAL_IMM", verbal: "Immediate Value",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* VIRTUAL */
    sim_p.states["CLK"] = {
        name: "CLK", verbal: "Clock",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["REG_IR_DECO"] = {
        name: "IR_DECO", verbal: "Instruction Decoded",
        visible: true, nbits: "0", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["MUXA_MICROADDR"] = {
        name: "MUXA_MICROADDR", verbal: "Input microaddress",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["REG_MICROINS"] = {
        name: "uINS", verbal: "Microinstruction Register",
        visible: false, nbits: "32", value: {}, default_value: {},
        draw_data: []
    };
    sim_p.states["DECO_INS"] = {
        name: "DECO_INS", verbal: "Instruction decoded in binary",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["ACC_TIME"] = {
        name: "ACC_TIME", verbal: "Accumulated CPU time",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["TTCPU"] = {
        name: "TTCPU", verbal: "Several Tristates to the internal data bus in CPU activated",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };


    /*
     *  Signals
     */

    /* PC */
    sim_p.signals["PCWRITE"] = {
        name: "PCWRITE", visible: true, type: "E", value: 0, default_value: 0, nbits: "1",
        behavior: ["NOP", "LOAD REG_PC M4_PC; UPDATEDPC"],
        fire_name: ['svg_p:text7155'],
        draw_data: [[]],
        draw_name: [['svg_p:path7135', 'svg_p:path7125', 'svg_p:path7137']]
    };

    /* IR */
    sim_p.signals["IRWRITE"] = {
        name: "IRWRITE", visible: true, type: "E", value: 0, default_value: 0, nbits: "1",
        behavior: ["NOP", "LOAD REG_IR RDATA; DECO"],
        fire_name: ['svg_p:text7309'],
        draw_data: [['svg_p:path6711', 'svg_p_path:6713', 'svg_p:path6981', 'svg_p:path6903', 'svg_p:path6905']],
        draw_name: [['svg_p:path7301']]
    };

    /* IMMEDIATE GENERATOR */
    sim_p.signals["GEN_IMM"] = {
        name: "GEN_IMM", visible: true, type: "L", value: 0, default_value: 0, nbits: "1",
        behavior: ["NOP", "DECO_IMM VAL_IMM 0 REG_IR OFFSET SIZE 0 SE_IMM X2_IMM"],
        fire_name: ['svg_p:text7300'],
        draw_data: [['svg_p:path6981', 'svg_p:path6903', 'svg_p:path:6904']],
        draw_name: [['svg_p:path7146']]
    };
    sim_p.signals["SE_IMM"] = {
        name: "SE_IMM", visible: true, type: "L", value: 0, default_value: 1, nbits: "1",
        verbal: ['Set superior bits of immediate value to 0.',
            'Extend sign of immediate value.'],
        behavior: ["NOP", "NOP"],
        fire_name: ['svg_p:text7301'],
        draw_data: [[]],
        draw_name: [['svg_p:path7292', 'svg_p:path7292']]
    };
    sim_p.signals["SIZE"] = {
        name: "SIZE", visible: true, type: "L", value: 0, default_value: 0, nbits: "5",
        behavior: ["NOP"],
        fire_name: ['svg_p:text7302'],
        draw_data: [[]],
        draw_name: [['svg_p:path7293']]
    };
    sim_p.signals["OFFSET"] = {
        name: "OFFSET", visible: true, type: "L", value: 0, default_value: 0, nbits: "5",
        behavior: ["NOP"],
        fire_name: ['svg_p:text7303'],
        draw_data: [[]],
        draw_name: [['svg_p:path7294']]
    };
    sim_p.signals["X2_IMM"] = {
        name: "X2_IMM", visible: true, type: "L", value: 0, default_value: 0, nbits: "1",
        verbal: ['Multiply by 1.',
            'Multiply by 2.'],
        behavior: ["NOP", "NOP"],
        fire_name: ['svg_p:text7301-1'],
        draw_data: [[]],
        draw_name: [['svg_p:path7292-0']]
    };

    /* REGISTER FILE */
    sim_p.signals["REG_R1"] = {
        name: "REG_R1", visible: true, type: "L", value: 0, default_value: 0, nbits: "5",
        behavior: ["NOP"],
        fire_name: [],
        draw_data: [[]],
        draw_name: [[]]
    };
    sim_p.signals["REG_R2"] = {
        name: "REG_R2", visible: true, type: "L", value: 0, default_value: 0, nbits: "5",
        behavior: ["NOP"],
        fire_name: [],
        draw_data: [[]],
        draw_name: [[]]
    };
    sim_p.signals["REG_W2"] = {
        name: "REG_W2", visible: true, type: "L", value: 0, default_value: 0, nbits: "5",
        behavior: ["NOP"],
        fire_name: [],
        draw_data: [[]],
        draw_name: [[]]
    };
    sim_p.signals["RW"] = {
        name: "RW", visible: true, type: "E", value: 0, default_value: 0, nbits: "1",
        behavior: ["NOP", "NOP"],
        fire_name: ['svg_p:text7299'],
        draw_data: [['svg_p:path6725', 'svg_p:path6727', 'svg_p:path6729',
            'svg_p:path6731', 'svg_p:path6733', 'svg_p:path6735', 'svg_p:path6915',
            'svg_p:path6913', 'svg_p:path6907', 'svg_p:path6909']],
        draw_name: [['svg_p:path7291']]
    };

    /* MUX Forwarding */
    sim_p.signals["M1"] = {
        name: "M1", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
        behavior: ["NOP"],
        depends_on: ["CLK"],
        fire_name: ['svg_p:text7229-7', 'svg_p:text7229'],
        draw_data: [['svg_p:path6775', 'svg_p:path6777'],['svg_p:path7001-6', 'svg_p:path7013-9', 'svg_p:path7003-8'],['svg_p:path7013-9-0', 'svg_p:path6825-8', 'svg_p:path6827-7']],
        draw_name: [['svg_p:path7199', 'svg_p:path7013']]
    };
    
    sim_p.signals["M2"] = {
        name: "M2", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
        behavior: ["NOP"],
        depends_on: ["CLK"],
        fire_name: ['svg_p:text7237', 'svg_p:text7237-9-0'],
        draw_data: [['svg_p:path6821', 'svg_p:path6823'],['svg_p:path7001', 'svg_p:path7003', 'svg_p:path7003-8'],['svg_p:path6827', 'svg_p:path6825', 'svg_p:path7013-9-0']],
        draw_name: [['svg_p:path7197', 'svg_p:path7013-0']]
    };

    /* MUX 4 (PC source) */
    sim_p.signals["M4"] = {
        name: "M4", visible: true, type: "L", value: 0, default_value: 0, nbits: "1",
        behavior: ["NOP", "NOP"],
        depends_on: ["PCWRITE"],
        fire_name: ['svg_p:text7289'],
        draw_data: [['svg_p:path7075', 'svg_p:path7043', 'svg_p:path7045', 'svg_p:path7047',
            'svg_p:path7123', 'svg_p:path7121', 'svg_p:path7041', 'svg_p:path7039',
            'svg_p:path7035', 'svg_p:path7037'],
        ['svg_p:path6837-6', 'svg_p:path7073', 'svg_p:path7115', 'svg_p:path7117',
            'svg_p:path7119', 'svg_p:path7123', 'svg_p:path7121', 'svg_p:path7041',
            'svg_p:path7039', 'svg_p:path7035', 'svg_p:path7037']],
        draw_name: [[], ['svg_p:path7281']]
    };

    /* MUX 5 */
    sim_p.signals["M5"] = {
        name: "M5", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
        behavior: ["NOP", "NOP", "NOP", "NOP"],
        fire_name: ['svg_p:text7289-2'],
        draw_data: [[]],
        draw_name: [[]]
    };

    /* C signal (jump condition) */
    sim_p.signals["C"] = {
        name: "C", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
        behavior: ["NOP", "NOP", "NOP", "NOP"],
        fire_name: ['svg_p:text7289-2-8-3'],
        draw_data: [[]],
        draw_name: [[]]
    };

    /* ALU */
    sim_p.signals["ALUOP"] = {
        name: "ALUOP", visible: true, type: "L", value: 0, default_value: 0, nbits: "5",
        behavior: ["NOP_ALU; UPDATE_NZ",
            "AND ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "OR ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "NOT ALU_WOUT M2_ALU; UPDATE_NZ",
            "XOR ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "SRL ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "SRA ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "SL ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "RR ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "RL ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "ADD ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "SUB ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "MUL ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "DIV ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "MOD ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "LUI ALU_WOUT M2_ALU; UPDATE_NZ",
            "ADDU ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "SUBU ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "MULU ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "DIVU ALU_WOUT M2_ALU M3_ALU; UPDATE_NZ",
            "NOP_ALU", "NOP_ALU", "NOP_ALU", "NOP_ALU",
            "NOP_ALU", "NOP_ALU", "NOP_ALU", "NOP_ALU",
            "NOP_ALU", "NOP_ALU", "NOP_ALU",
            "MV ALU_WOUT M2_ALU; UPDATE_NZ",
            "MV ALU_WOUT M3_ALU; UPDATE_NZ"],
        fire_name: ['svg_p:text7269'],
        draw_data: [['svg_p:path6845', 'svg_p:path6847', 'svg_p:path6841', 'svg_p:path6843']],
        draw_name: [['svg_p:path7249']]
    };

    sim_p.signals["WBE"] = {
        name: "WBE", visible: false, type: "L", value: 0, default_value: 0, nbits: "2",
        behavior: ["NOP"], // TODO
        fire_name: ['svg_p:text7555', 'svg_p:text7433'],
        draw_data: [['svg_p:path7075-2', 'svg_p:path7043-6', 'svg_p:path7203',
            'svg_p:path7579', 'svg_p:path7581', 'svg_p:path7075',
            'svg_p:path6911-8-3', 'svg_p:path7567-0-5-0',
            'svg_p:path6911-8', 'svg_p:path7421', 'svg_p:path7423']],
        draw_name: [['svg_p:path7529', 'svg_p:path7425']]
    };
    /* MUX 2 (ALU input A) */
    // sim_p.signals["M2"] = {
    //     name: "M2", visible: true, type: "L", value: 0, default_value: 0, nbits: "1",
    //     behavior: ["MV M2_ALU REG_PC; FIRE ALUOP", "MV M2_ALU R_DATA1; FIRE ALUOP"],
    //     depends_on: ["ALUOP"],
    //     fire_name: ['svg_p:text7229'],
    //     draw_data: [['svg_p:path6691-3', 'svg_p:path6987', 'svg_p:path6989', 'svg_p:path6983',
    //         'svg_p:path6991', 'svg_p:path6775', 'svg_p:path6777'],
    //     ['svg_p:path6779', 'svg_p:path6781']],
    //     draw_name: [['svg_p:path7199']]
    // };

    /* MUX 3 (ALU input B) */
    sim_p.signals["M3"] = {
        name: "M3", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
        behavior: ["MV M3_ALU R_DATA2; FIRE ALUOP",
            "MV M3_ALU VAL_ONE; FIRE ALUOP",
            "MV M3_ALU VAL_FOUR; FIRE ALUOP",
            "MV M3_ALU VAL_IMM; FIRE ALUOP"],
        // fire_name: ['svg_p:text7237'],
        fire_name: [''],
        depends_on: ["ALUOP"],
        draw_data: [[]],
        // draw_data: [['svg_p:path6821', 'svg_p:path6823'],
        // ['svg_p:path7001', 'svg_p:path7003'],
        // ['svg_p:path7003-3', 'svg_p:path7001-9'],
        // ['svg_p:path7015', 'svg_p:path7013', 'svg_p:path6825', 'svg_p:path6827']],
        draw_name: [[]]
    };

    /* I/O Devices */
    sim_p.signals["IOCHK"] = {
        name: "IOCHK", visible: true, type: "L", value: 0, default_value: 0, nbits: "1",
        behavior: ["FIRE IO_IE", "FIRE IO_IE"],
        fire_name: [],
        draw_data: [[], []],
        draw_name: [[], []]
    };
    sim_p.signals["DB_UPDATED"] = {
        name: "DB_UPDATED", visible: false, type: "L", value: 0, default_value: 0, nbits: "1",
        behavior: ['NOP'],
        fire_name: [],
        draw_data: [[]],
        draw_name: [[]]
    };

    /* Virtual Signals, for UI */
    sim_p.signals["TEST_N"] = {
        name: "TEST_N", visible: true, type: "L", value: 0, default_value: 0, nbits: "1", forbidden: true,
        behavior: ["MV FLAG_N VAL_ZERO", "MV FLAG_N VAL_ONE"],
        depends_on: ["ALUOP"],
        fire_name: ['svg_p:text351', 'svg_p:text7185-5'],
        draw_data: [['svg_p:path7251']],
        draw_name: [['svg_p:path7157']]
    };
    sim_p.signals["TEST_Z"] = {
        name: "TEST_Z", visible: true, type: "L", value: 0, default_value: 0, nbits: "1", forbidden: true,
        behavior: ["MV FLAG_Z VAL_ZERO", "MV FLAG_Z VAL_ONE"],
        depends_on: ["ALUOP"],
        fire_name: ['svg_p:text7615', 'svg_p:text7193-5'],
        draw_data: [['svg_p:path7617']],
        draw_name: [['svg_p:path7165']]
    };


    /*
     *  Behaviors
     */

    sim_p.behaviors["NOP"] = {
        nparameters: 1,
        operation: function (s_expr) { },
        verbal: function (s_expr) { return ""; }
    };
    sim_p.behaviors["NOP_ALU"] = {
        nparameters: 1,
        operation: function (s_expr) {
            sim_p.internal_states.alu_flags.flag_n = 0;
            sim_p.internal_states.alu_flags.flag_z = 0;
        },
        verbal: function (s_expr) { return ""; }
    };
    sim_p.behaviors["MV"] = {
        nparameters: 3,
        types: ["X", "X"],
        operation: function (s_expr) {
            sim_elto_org = get_reference(s_expr[2]);
            sim_elto_dst = get_reference(s_expr[1]);
            newval = get_value(sim_elto_org);
            set_value(sim_elto_dst, newval);
        },
        verbal: function (s_expr) {
            var sim_elto_org = get_reference(s_expr[2]);
            var newval = get_value(sim_elto_org);
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math') {
                return "Copy from " + show_verbal(s_expr[2]) +
                    " to " + show_verbal(s_expr[1]) +
                    " value " + show_value(newval) + ". ";
            }
            return show_verbal(s_expr[1]) + " = " +
                show_verbal(s_expr[2]) + " (" + show_value(newval) + "). ";
        }
    };
    sim_p.behaviors["LOAD"] = {
        nparameters: 3,
        types: ["X", "X"],
        operation: function (s_expr) {
            var sim_elto_org = get_reference(s_expr[2]);
            var sim_elto_dst = get_reference(s_expr[1]);
            var newval = get_value(sim_elto_org);
            set_value(sim_elto_dst, newval);
        },
        verbal: function (s_expr) {
            var sim_elto_org = get_reference(s_expr[2]);
            var newval = get_value(sim_elto_org);
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math') {
                return "Load from " + show_verbal(s_expr[2]) +
                    " to " + show_verbal(s_expr[1]) +
                    " value " + show_value(newval) + ". ";
            }
            return show_verbal(s_expr[1]) + " = " +
                show_verbal(s_expr[2]) +
                " (" + show_value(newval) + "). ";
        }
    };
    sim_p.behaviors["AND"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var result = get_value(sim_p.states[s_expr[2]]) & get_value(sim_p.states[s_expr[3]]);
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var result = get_value(sim_p.states[s_expr[2]]) & get_value(sim_p.states[s_expr[3]]);
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU AND with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (AND). ";
        }
    };
    sim_p.behaviors["OR"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var result = get_value(sim_p.states[s_expr[2]]) | get_value(sim_p.states[s_expr[3]]);
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var result = get_value(sim_p.states[s_expr[2]]) | get_value(sim_p.states[s_expr[3]]);
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU OR with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (OR). ";
        }
    };
    sim_p.behaviors["XOR"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var result = get_value(sim_p.states[s_expr[2]]) ^ get_value(sim_p.states[s_expr[3]]);
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var result = get_value(sim_p.states[s_expr[2]]) ^ get_value(sim_p.states[s_expr[3]]);
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU XOR with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (XOR). ";
        }
    };
    sim_p.behaviors["NOT"] = {
        nparameters: 3, types: ["E", "E"],
        operation: function (s_expr) {
            var result = ~(get_value(sim_p.states[s_expr[2]]));
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var result = ~(get_value(sim_p.states[s_expr[2]]));
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU NOT with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (NOT). ";
        }
    };
    sim_p.behaviors["ADD"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a + b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a + b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU ADD with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (ADD). ";
        }
    };
    sim_p.behaviors["SUB"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a - b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a - b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU SUB with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (SUB). ";
        }
    };
    sim_p.behaviors["ADDU"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a + b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a + b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU ADDU with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (ADDU). ";
        }
    };
    sim_p.behaviors["LUI"] = {
        nparameters: 3, types: ["E", "E"],
        operation: function (s_expr) {
            var result = (get_value(sim_p.states[s_expr[2]])) << 16;
            set_value(sim_p.states[s_expr[1]], result);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var result = (get_value(sim_p.states[s_expr[2]])) << 16;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU Load Upper Immediate with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (LUI). ";
        }
    };
    sim_p.behaviors["MUL"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a * b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a * b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU MUL with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (MUL). ";
        }
    };
    sim_p.behaviors["DIV"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = (b != 0) ? Math.floor(a / b) : 0;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = (b != 0) ? Math.floor(a / b) : 0;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU DIV with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (DIV). ";
        }
    };
    sim_p.behaviors["MOD"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = (b != 0) ? a % b : 0;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = (b != 0) ? a % b : 0;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU MOD with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (MOD). ";
        }
    };
    sim_p.behaviors["SUBU"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a - b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a - b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU SUBU with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (SUBU). ";
        }
    };
    sim_p.behaviors["MULU"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a * b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a * b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU MULU with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (MULU). ";
        }
    };
    sim_p.behaviors["DIVU"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = (b != 0) ? Math.floor(a / b) : 0;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = (b != 0) ? Math.floor(a / b) : 0;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU DIVU with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (DIVU). ";
        }
    };
    sim_p.behaviors["SRL"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) >>> shifts;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) >>> shifts;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU Shift Right Logical with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (SRL). ";
        }
    };
    sim_p.behaviors["SRA"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) >> shifts;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) >> shifts;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU Shift Right Arithmetic with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (SRA). ";
        }
    };
    sim_p.behaviors["SL"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) << shifts;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) << shifts;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU Shift Left with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (SL). ";
        }
    };

    /* READ INSTRUCTION MEMORY */
    sim_p.behaviors["RR"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) >>> shifts;
            var carry = (get_value(sim_p.states[s_expr[2]])) >> (shifts - 1) & 1;
            result = result | (carry << (32 - shifts));
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var carry = (get_value(sim_p.states[s_expr[2]])) >> (shifts - 1) & 1;
            var result = (get_value(sim_p.states[s_expr[2]])) >>> shifts;
            result = result | (carry << (32 - shifts));
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU RR with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (RR). ";
        }
    };
    sim_p.behaviors["RL"] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr) {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) << shifts;
            var carry = (get_value(sim_p.states[s_expr[2]])) >>> (32 - shifts);
            result = (result | carry) >>> 0;
            set_value(sim_p.states[s_expr[1]], result);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr) {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) << shifts;
            var carry = (get_value(sim_p.states[s_expr[2]])) >>> (32 - shifts);
            result = (result | carry) >>> 0;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU RL with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (RL). ";
        }
    };
    sim_p.behaviors["READ_IM"] = {
        nparameters: 1,
        operation: function (s_expr) {
            var address = get_value(sim_p.states['REG_PC']);
            var clk = get_value(sim_p.states['CLK']);
            var remain = get_value(sim_p.internal_states.MP_wc);
            if (
                (typeof sim_p.events.mem[clk - 1] != "undefined") &&
                (sim_p.events.mem[clk - 1] > 0)
            ) {
                remain = sim_p.events.mem[clk - 1] - 1;
            }
            var first_time = typeof sim_p.events.mem[clk] == "undefined";
            sim_p.events.mem[clk] = remain;
            if (remain > 0) return;
            address = address & 0xFFFFFFFC;
            var value = main_memory_getvalue(sim_p.internal_states.MP, address);
            var full_redraw = false;
            if (typeof value === "undefined") {
                value = 0;
                full_redraw = true;
            }
            show_main_memory(sim_p.internal_states.MP, address, full_redraw, false);
            if (first_time && (sim_p.internal_states.CM.length > 0)) {
                cache_memory_access(sim_p.internal_states.CM[0], address, "read", clk);
            }
            var ins = main_memory_getvalue(sim_p.internal_states.MP, address);
            if (typeof ins === "undefined") ins = 0;
            set_value(sim_p.states['RDATA'], ins);
        },
        verbal: function (s_expr) {
            var verbal = "";
            var address = get_value(sim_p.states['REG_PC']);
            var value = main_memory_getvalue(sim_p.internal_states.MP, address);
            if (typeof value === "undefined") value = 0;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math') {
                verbal = "Try to read an instruction from Instruction Memory " +
                    "at address 0x" + address.toString(16) + " with value 0x" + value.toString(16) + ". ";
                return verbal;
            }
            verbal = "Memory output = 0x" + value.toString(16) +
                " (Read an instruction from Instruction Memory" +
                " at address 0x" + address.toString(16) + "). ";
            return verbal;
        }
    };

    sim_p.behaviors["DECO"] = {
        nparameters: 1,
        operation: function (s_expr) {
            var oi = decode_instruction(sim_p.internal_states.FIRMWARE,
                sim_p.ctrl_states.ir,
                get_value(sim_p.states['REG_IR']));
            if (null == oi.oinstruction) return -1;
            var val = get_value(sim_p.states['DECO_INS']);
            set_value(sim_p.states["DECO_INS"], val + 1);
            var pc = get_value(sim_p.states['REG_PC']) - 4;
            var decins = get_deco_from_pc(pc);
            set_value(sim_p.states['REG_IR_DECO'], decins);
            show_dbg_ir(get_value(sim_p.states['REG_IR_DECO']));
        },
        verbal: function (s_expr) { return "Decode instruction. "; }
    };

    sim_p.behaviors["FIRE"] = {
        nparameters: 2, types: ["S"],
        operation: function (s_expr) {
            if (sim_p.internal_states.fire_stack.indexOf(s_expr[1]) != -1) return;
            sim_p.internal_states.fire_stack.push(s_expr[1]);
            update_draw(sim_p.signals[s_expr[1]], sim_p.signals[s_expr[1]].value);
            if ("L" == sim_p.signals[s_expr[1]].type)
                update_state(s_expr[1]);
            sim_p.internal_states.fire_stack.pop(s_expr[1]);
        },
        verbal: function (s_expr) { return ""; }
    };

    sim_p.behaviors["FIRE_IFSET"] = {
        nparameters: 3, types: ["S", "I"],
        operation: function (s_expr) {
            if (get_value(sim_p.signals[s_expr[1]]) != parseInt(s_expr[2])) return;
            sim_p.behaviors["FIRE"].operation(s_expr);
        },
        verbal: function (s_expr) { return ""; }
    };

    sim_p.behaviors["MBIT_SN"] = {
        nparameters: 5, types: ["S", "E", "E", "I"],
        operation: function (s_expr) {
            var base = 0;
            var r = s_expr[3].split('/');
            if (1 == r.length)
                base = get_value(sim_p.states[s_expr[3]]);
            else if (typeof sim_p.states[r[0]].value[r[1]] != "undefined")
                base = sim_p.states[r[0]].value[r[1]];
            else if (typeof sim_p.signals[r[1]].default_value != "undefined")
                base = sim_p.signals[r[1]].default_value;
            else if (typeof sim_p.states[r[1]].default_value != "undefined")
                base = sim_p.states[r[1]].default_value;
            else ws_alert('WARN: undefined state/field pair -> ' + r[0] + '/' + r[1]);
            var offset = parseInt(s_expr[4]);
            var n1 = get_value(sim_p.states[s_expr[2]]).toString(2);
            var n2 = "00000000000000000000000000000000".substring(0, 32 - n1.length) + n1;
            var n3 = n2.substr(31 - (base + offset - 1), offset);
            set_value(sim_p.signals[s_expr[1]], parseInt(n3, 2));
        },
        verbal: function (s_expr) { return ""; }
    };

    sim_p.behaviors["GET"] = {
        nparameters: 4, types: ["E", "E", "S"],
        operation: function (s_expr) {
            set_value(sim_p.states[s_expr[1]], get_value(sim_p.states[s_expr[2]][sim_p.signals[s_expr[3]].value]));
        },
        verbal: function (s_expr) { return ""; }
    };

    sim_p.behaviors["SET"] = {
        nparameters: 4, types: ["E", "S", "E"],
        operation: function (s_expr) {
            var rf_name = s_expr[1];
            var reg_w_name = s_expr[2];
            var state_name = s_expr[3];
            var reg_w_obj = sim_p.signals[reg_w_name];
            if (typeof reg_w_obj === "undefined") {
                ws_alert('ERROR: undefined register name ' + reg_w_name);
                return;
            }
            var state_obj = sim_p.states[state_name];
            if (typeof state_obj === "undefined") {
                ws_alert('ERROR: undefined state name ' + state_name);
                return;
            }
            var rf_obj = sim_p.states[rf_name][reg_w_obj.value];
            if (typeof rf_obj === "undefined") {
                ws_alert('ERROR: undefined register element at ' + rf_name);
                return;
            }
            set_value(rf_obj, get_value(state_obj));
        },
        verbal: function (s_expr) { return ""; }
    };

    sim_p.behaviors["DECO_IMM"] = {
        nparameters: 9, types: ["E", "I", "E", "S", "S", "I", "S", "S"],
        operation: function (s_expr) {
            var oi = decode_instruction(sim_p.internal_states.FIRMWARE,
                sim_p.ctrl_states.ir,
                get_value(sim_p.states['REG_IR']));
            var bits = [];
            for (var i = 0; i < oi.oinstruction.fields.length; i++) {
                if (oi.oinstruction.fields[i].type == "inm" ||
                    oi.oinstruction.fields[i].type == "imm" ||
                    oi.oinstruction.fields[i].type == "address") {
                    if (oi.oinstruction.fields[i].bits !== undefined)
                        bits = oi.oinstruction.fields[i].bits;
                    else {
                        bits[0] = new Array(2);
                        bits[0][0] = oi.oinstruction.fields[i].startbit;
                        bits[0][1] = oi.oinstruction.fields[i].stopbit;
                    }
                }
            }
            var offset = parseInt(sim_p.signals[s_expr[4]].value);
            var size = parseInt(sim_p.signals[s_expr[5]].value);
            var n1 = get_value(sim_p.states[s_expr[3]]).toString(2);
            n1 = ("00000000000000000000000000000000".substring(0, 32 - n1.length) + n1);
            var n2 = "";
            for (var i = bits.length - 1; i >= 0; i--)
                for (var j = 31 - bits[i][0]; j <= 31 - bits[i][1]; j++)
                    n2 += n1[j];
            n2 = ("00000000000000000000000000000000".substring(0, 32 - n2.length) + n2);
            n2 = n2.substr(31 - (size - 1), size);
            n2 = n2 + "0".repeat(offset);
            var n3 = "00000000000000000000000000000000".substring(0, 32 - n2.length) + n2;
            if (("1" == sim_p.signals[s_expr[7]].value) && ("1" == n2[0]))
                n3 = "11111111111111111111111111111111".substring(0, 32 - n2.length) + n2;
            if ("1" == n3[0]) n3 = parseInt(n3, 2) >> 0;
            else n3 = parseInt(n3, 2) >>> 0;
            if ("1" == sim_p.signals[s_expr[8]].value) n3 = 2 * n3;
            set_value(sim_p.states[s_expr[1]], n3);
        },
        verbal: function (s_expr) { return "Generate immediate value"; }
    };

    /* UPDATE UPDATEDPC */
    sim_p.behaviors["UPDATEDPC"] = {
        nparameters: 1,
        operation: function (s_expr) {
            show_asmdbg_pc();
        },
        verbal: function (s_expr) { return ""; }
    };

    /* UPDATE_NZ */
    sim_p.behaviors["UPDATE_NZ"] = {
        nparameters: 1,
        operation: function (s_expr) {
            set_value(simhw_sim_state("FLAG_N"), sim_p.internal_states.alu_flags.flag_n);
            set_value(simhw_sim_state("FLAG_Z"), sim_p.internal_states.alu_flags.flag_z);
            set_value(simhw_sim_signal("TEST_N"), sim_p.internal_states.alu_flags.flag_n);
            set_value(simhw_sim_signal("TEST_Z"), sim_p.internal_states.alu_flags.flag_z);
            update_draw(sim_p.signals["TEST_N"], sim_p.signals["TEST_N"].value);
            update_draw(sim_p.signals["TEST_Z"], sim_p.signals["TEST_Z"].value);
        },
        verbal: function (s_expr) {
            return "Update flags N (" + sim_p.internal_states.alu_flags.flag_n
                + ") and Z (" + sim_p.internal_states.alu_flags.flag_z + ").";
        }
    };

    /* CPU_RESET */
    sim_p.behaviors["CPU_RESET"] = {
        nparameters: 1,
        operation: function (s_expr) {
            for (var key in sim_p.states) reset_value(sim_p.states[key]);
            for (var key in sim_p.signals) reset_value(sim_p.signals[key]);
            sim_p.internal_states.MP_wc = 0;
            sim_p.internal_states.halt = 0;
        },
        verbal: function (s_expr) { return "Reset CPU. "; }
    };

    /* PIPELINE HELPERS */
    function get_rs1(ins) {
        return (ins >>> 15) & 0x1F;
    }
    function get_rs2(ins) {
        return (ins >>> 20) & 0x1F;
    }
    function get_rd(ins) {
        return (ins >>> 7) & 0x1F;
    }
    function get_opcode(ins) {
        return ins & 0x7F;
    }
    function get_funct3(ins) {
        return (ins >>> 12) & 0x7;
    }
    function get_funct7(ins) {
        return (ins >>> 25) & 0x7F;
    }
    function is_rtype(op) { return op == 0x33; }
    function is_itype(op) { return op == 0x13 || op == 0x03 || op == 0x67; }
    function is_stype(op) { return op == 0x23; }
    function is_btype(op) { return op == 0x63; }
    function is_lui(op) { return op == 0x16; }
    function is_auipc(op) { return op == 0x17; }
    function is_jal(op) { return op == 0x6F; }
    function is_jalr(op) { return op == 0x67; }

    function decode_aluop(ins) {
        var op = get_opcode(ins);
        var f3 = get_funct3(ins);
        var f7 = get_funct7(ins);
        if (is_rtype(op) || is_itype(op)) {
            if (f3 == 0x0) {
                if (is_rtype(op) && (f7 & 0x20)) return 11; // SUB
                return 10; // ADD/ADDI
            }
            if (f3 == 0x1) return 7;  // SLLI/SLL
            if (f3 == 0x2) return 11; // SLT/SLTI
            if (f3 == 0x3) return 11; // SLTU/SLTIU
            if (f3 == 0x4) return 4;  // XOR/XORI
            if (f3 == 0x5) {
                if (f7 & 0x20) return 6; // SRAI/SRA
                return 5; // SRLI/SRL
            }
            if (f3 == 0x6) return 2;  // OR/ORI
            if (f3 == 0x7) return 1;  // AND/ANDI
        }
        if (is_lui(op) || is_auipc(op)) return 15; // LUI
        return 10; // default to ADD
    }

    function imm_i(ins) {
        var val = (ins >>> 20) & 0xFFF;
        if (val & 0x800) val |= 0xFFFFF000;
        return val;
    }

    function imm_s(ins) {
        var val = ((ins >>> 25) << 5) | ((ins >>> 7) & 0x1F);
        if (val & 0x800) val |= 0xFFFFF000;
        return val;
    }

    function imm_b(ins) {
        var val = ((ins >>> 31) << 12) | ((ins >>> 25) << 5) |
            ((ins >>> 8) & 0xF) << 1 | ((ins >>> 7) & 1) << 11;
        if (val & 0x1000) val |= 0xFFFFE000;
        return val;
    }

    function imm_u(ins) {
        return ins & 0xFFFFF000;
    }

    function imm_j(ins) {
        var val = ((ins >>> 31) << 20) | ((ins >>> 21) & 0x3FF) << 1 |
            ((ins >>> 20) & 1) << 11 | ((ins >>> 12) & 0xFF) << 12;
        if (val & 0x100000) val |= 0xFFE00000;
        return val;
    }

    /* CLOCK - Pipeline execution */
    sim_p.behaviors["CLOCK"] = {
        nparameters: 1,
        operation: function (s_expr) {
            var t0 = performance.now();

            // Update clock counter
            var val = get_value(sim_p.states["CLK"]);
            set_value(sim_p.states["CLK"], val + 1);
            set_value(sim_p.states["TTCPU"], 0);

            if (sim_p.internal_states.halt) return;

            // Read current pipeline register values
            var if_id_ins = get_value(sim_p.states["IF_ID_INS"]);

            var id_ex_rs1 = get_value(sim_p.states["ID_EX_RS1"]) << 0;
            var id_ex_rs2 = get_value(sim_p.states["ID_EX_RS2"]) << 0;
            var id_ex_rs1a = get_value(sim_p.states["ID_EX_RS1_ADDR"]);
            var id_ex_rs2a = get_value(sim_p.states["ID_EX_RS2_ADDR"]);
            var id_ex_rd = get_value(sim_p.states["ID_EX_RD"]);
            var id_ex_aluop = get_value(sim_p.states["ID_EX_ALUOP"]);
            var id_ex_alusrc = get_value(sim_p.states["ID_EX_ALUSRC"]);
            var id_ex_imm = get_value(sim_p.states["ID_EX_IMM"]) << 0;

            var ex_mem_alu = get_value(sim_p.states["EX_MEM_ALUOUT"]) << 0;
            var ex_mem_rd = get_value(sim_p.states["EX_MEM_RD"]);
            var ex_mem_wb = get_value(sim_p.states["EX_MEM_WB"]);

            var mem_wb_data = get_value(sim_p.states["MEM_WB_DATA"]) << 0;
            var mem_wb_rd = get_value(sim_p.states["MEM_WB_RD"]);
            var mem_wb_wb = get_value(sim_p.states["MEM_WB_WB"]);

            // Read pipeline PC tracking values
            var if_id_pc = get_value(sim_p.states["IF_ID_PC"]);
            var id_ex_pc = get_value(sim_p.states["ID_EX_PC"]);
            var ex_mem_pc = get_value(sim_p.states["EX_MEM_PC"]);
            var mem_wb_pc = get_value(sim_p.states["MEM_WB_PC"]);

            // ==========================================
            // STAGE 1: WB (Write-Back)
            // ==========================================
            if (mem_wb_wb && mem_wb_rd != 0) {
                set_value(sim_p.states.BR[mem_wb_rd], mem_wb_data >>> 0);
                set_value(sim_p.states["W_DATA"], mem_wb_data >>> 0);
            }

            // ==========================================
            // STAGE 2: MEM (Memory Access)
            // ==========================================
            var mem_wb_data_next = ex_mem_alu;
            var mem_wb_rd_next = ex_mem_rd;
            var mem_wb_wb_next = ex_mem_wb;

            // ==========================================
            // STAGE 3: EX (Execute) - reads from ID/EX
            // ==========================================
            // Forwarding: compare rs1/rs2 addr in ID/EX against rd in EX/MEM and MEM/WB
            var rs1_val = id_ex_rs1;
            var rs2_val = id_ex_rs2;

            set_value(sim_p.signals["M1"], 0);
            set_value(sim_p.signals["M2"], 0);
            // Forward from MEM/WB to EX for rs1
            if (mem_wb_wb && mem_wb_rd != 0 && mem_wb_rd == id_ex_rs1a) {
                rs1_val = mem_wb_data;
                set_value(sim_p.signals["M1"], 1);
            }
            // Forward from MEM/WB to EX for rs2
            if (mem_wb_wb && mem_wb_rd != 0 && mem_wb_rd == id_ex_rs2a) {
                rs2_val = mem_wb_data;
                set_value(sim_p.signals["M2"], 1);
            }
            // Forward from EX/MEM to EX for rs1 (check that EX/MEM isn't same as MEM/WB)
            if (ex_mem_wb && ex_mem_rd != 0 && ex_mem_rd == id_ex_rs1a) {
                rs1_val = ex_mem_alu;
                set_value(sim_p.signals["M1"], 2);
            }
            // Forward from EX/MEM to EX for rs2
            if (ex_mem_wb && ex_mem_rd != 0 && ex_mem_rd == id_ex_rs2a) {
                rs2_val = ex_mem_alu;
                set_value(sim_p.signals["M2"], 2);
            }

            var alu_in_a = rs1_val << 0;
            var alu_in_b;
            if (id_ex_alusrc) {
                alu_in_b = id_ex_imm;
            } else {
                alu_in_b = rs2_val << 0;
            }

            var ex_result = alu_in_a;
            switch (id_ex_aluop) {
                case 1: ex_result = alu_in_a & alu_in_b; break;  // AND
                case 2: ex_result = alu_in_a | alu_in_b; break;  // OR
                case 4: ex_result = alu_in_a ^ alu_in_b; break;  // XOR
                case 5: ex_result = (alu_in_a >>> (alu_in_b & 0x1F)) >>> 0; break; // SRL
                case 6: ex_result = (alu_in_a >> (alu_in_b & 0x1F)); break; // SRA
                case 7: ex_result = (alu_in_a << (alu_in_b & 0x1F)); break; // SLL
                case 10: ex_result = (alu_in_a + alu_in_b); break; // ADD
                case 11: ex_result = (alu_in_a - alu_in_b); break; // SUB
                case 15: ex_result = alu_in_b; break; // LUI/AUIPC (pass immediate)
                default: ex_result = alu_in_a; break; // NOP/MV
            }

            sim_p.internal_states.alu_flags.flag_n = (ex_result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (ex_result == 0) ? 1 : 0;

            set_value(sim_p.states["M2_ALU"], alu_in_a >>> 0);
            set_value(sim_p.states["M3_ALU"], alu_in_b >>> 0);
            set_value(sim_p.states["ALU_WOUT"], ex_result >>> 0);

            var ex_mem_alu_next = ex_result;
            var ex_mem_rd_next = id_ex_rd;
            // wb if the instruction in ID/EX writes a register
            // We stored all control signals in ID/EX already
            var ex_mem_wb_next = (id_ex_rd != 0) ? 1 : 0;
            var ex_mem_wdata_next = id_ex_rs2;

            // ==========================================
            // STAGE 4: ID (Instruction Decode) - reads from IF/ID
            // ==========================================
            var ins = if_id_ins;
            var id_opcode = get_opcode(ins);
            var id_rs1_addr = get_rs1(ins);
            var id_rs2_addr = get_rs2(ins);
            var id_rd_addr = get_rd(ins);
            var id_rs1_val = sim_p.states.BR[id_rs1_addr].value;
            var id_rs2_val = sim_p.states.BR[id_rs2_addr].value;
            set_value(sim_p.states["R_DATA1"], id_rs1_val >>> 0);
            set_value(sim_p.states["R_DATA2"], id_rs2_val >>> 0);
            var id_aluop = decode_aluop(ins);
            // alusrc = 1 if I-type or U-type (uses immediate), 0 if R-type (uses rs2)
            var id_alusrc = (is_rtype(id_opcode) || is_btype(id_opcode) ||
                is_stype(id_opcode)) ? 0 : 1;

            var id_imm = 0;
            if (is_itype(id_opcode) || is_jalr(id_opcode)) {
                id_imm = imm_i(ins);
            } else if (is_stype(id_opcode)) {
                id_imm = imm_s(ins);
            } else if (is_btype(id_opcode)) {
                id_imm = imm_b(ins);
            } else if (is_lui(id_opcode) || is_auipc(id_opcode)) {
                id_imm = imm_u(ins);
            } else if (is_jal(id_opcode)) {
                id_imm = imm_j(ins);
            }

            var id_ex_rs1_next = id_rs1_val << 0;
            var id_ex_rs2_next = id_rs2_val << 0;
            var id_ex_rs1a_next = id_rs1_addr;
            var id_ex_rs2a_next = id_rs2_addr;
            var id_ex_rd_next = id_rd_addr;
            var id_ex_aluop_next = id_aluop;
            var id_ex_alusrc_next = id_alusrc;
            var id_ex_imm_next = id_imm;

            // ==========================================
            // STAGE 5: IF (Instruction Fetch)
            // ==========================================
            var pc_val = get_value(sim_p.states["REG_PC"]);
            var next_pc = pc_val + 4;
            var ins_val = 0x00000013; // NOP (ADDI x0,x0,0)

            // Check if PC is within code bounds
            var segments = sim_p.internal_states.segments;
            var in_bounds = false;
            var code_begin_s = 0;
            var code_end_s = 0;
            if (typeof segments !== "undefined") {
                if (typeof segments['.text'] !== "undefined") {
                    code_begin_s = parseInt(segments['.text'].begin);
                    code_end_s = parseInt(segments['.text'].end);
                    if (pc_val >= code_begin_s && pc_val < code_end_s) in_bounds = true;
                }
                if (!in_bounds && typeof segments['.ktext'] !== "undefined") {
                    var kbegin = parseInt(segments['.ktext'].begin);
                    var kend = parseInt(segments['.ktext'].end);
                    if (pc_val >= kbegin && pc_val < kend) { in_bounds = true; code_begin_s = kbegin; code_end_s = kend; }
                }
            }

            if (in_bounds && !sim_p.internal_states.draining) {
                var address = pc_val & 0xFFFFFFFC;
                ins_val = main_memory_getvalue(sim_p.internal_states.MP, address);
                if (typeof ins_val === "undefined") ins_val = 0;
                show_main_memory(sim_p.internal_states.MP, address, false, false);
                next_pc = pc_val + 4;
                // If next PC would be past code_end, enter drain
                if (next_pc >= code_end_s) {
                    sim_p.internal_states.draining = true;
                    sim_p.internal_states.drain = 0;
                    next_pc = pc_val; // stay at last addr so while loop continues
                } else {
                    sim_p.internal_states.drain = 0;
                }
            } else {
                sim_p.internal_states.drain++;
                if (sim_p.internal_states.drain >= 4) {
                    sim_p.internal_states.draining = false;
                    next_pc = pc_val + 4;
                } else {
                    next_pc = pc_val;
                }
            }

            // ==========================================
            // Update all pipeline registers
            set_value(sim_p.states["IF_ID_INS"], ins_val);
            set_value(sim_p.states["ID_EX_RS1"], id_ex_rs1_next >>> 0);
            set_value(sim_p.states["ID_EX_RS2"], id_ex_rs2_next >>> 0);
            set_value(sim_p.states["ID_EX_RS1_ADDR"], id_ex_rs1a_next);
            set_value(sim_p.states["ID_EX_RS2_ADDR"], id_ex_rs2a_next);
            set_value(sim_p.states["ID_EX_RD"], id_ex_rd_next);
            set_value(sim_p.states["ID_EX_ALUOP"], id_ex_aluop_next);
            set_value(sim_p.states["ID_EX_ALUSRC"], id_ex_alusrc_next);
            set_value(sim_p.states["ID_EX_IMM"], id_ex_imm_next >>> 0);
            set_value(sim_p.states["EX_MEM_ALUOUT"], ex_mem_alu_next >>> 0);
            set_value(sim_p.states["EX_MEM_WDATA"], ex_mem_wdata_next >>> 0);
            set_value(sim_p.states["EX_MEM_RD"], ex_mem_rd_next);
            set_value(sim_p.states["EX_MEM_WB"], ex_mem_wb_next);
            set_value(sim_p.states["MEM_WB_DATA"], mem_wb_data_next >>> 0);
            set_value(sim_p.states["MEM_WB_RD"], mem_wb_rd_next);
            set_value(sim_p.states["MEM_WB_WB"], mem_wb_wb_next);

            // Propagate PC values through pipeline stages
            set_value(sim_p.states["IF_ID_PC"], pc_val);
            set_value(sim_p.states["ID_EX_PC"], if_id_pc);
            set_value(sim_p.states["EX_MEM_PC"], id_ex_pc);
            set_value(sim_p.states["MEM_WB_PC"], ex_mem_pc);

            // Update pipeline stage display
            show_pipeline_display(sim_p, pc_val, if_id_pc, id_ex_pc, ex_mem_pc, mem_wb_pc);

            // Update PC
            set_value(sim_p.states["REG_PC"], next_pc >>> 0);
            set_value(sim_p.states["REG_IR"], ins_val);
            show_asmdbg_pc();

            // Update flags in UI
            set_value(sim_p.states["FLAG_N"], sim_p.internal_states.alu_flags.flag_n);
            set_value(sim_p.states["FLAG_Z"], sim_p.internal_states.alu_flags.flag_z);
            set_value(simhw_sim_signal("TEST_N"), sim_p.internal_states.alu_flags.flag_n);
            set_value(simhw_sim_signal("TEST_Z"), sim_p.internal_states.alu_flags.flag_z);
            update_draw(sim_p.signals["TEST_N"], sim_p.signals["TEST_N"].value);
            update_draw(sim_p.signals["TEST_Z"], sim_p.signals["TEST_Z"].value);

            // Register 0 must always be zero
            sim_p.states.BR[0].value = 0;

            var t1 = performance.now();
            var val2 = get_value(sim_p.states["ACC_TIME"]);
            val2 = val2 + (t1 - t0);
            set_value(sim_p.states["ACC_TIME"], val2);

            if (typeof wepsim_svg_is_drawing === 'function' && wepsim_svg_is_drawing()) {
                refresh();
            }
        },
        verbal: function (s_expr) { return ""; }
    };

    // Helper: highlight pipeline stages in the assembly debugger
    function show_pipeline_display(sim_p, if_pc, id_pc, ex_pc, mem_pc, wb_pc) {
        if (typeof $ === "undefined") return;
        var stage_pcs = [if_pc, id_pc, ex_pc, mem_pc, wb_pc];
        var stage_pc_names = ["if_pc", "id_pc", "ex_pc", "mem_pc", "wb_pc"];
        var stage_cls = ["bg-pipeline-if", "bg-pipeline-id", "bg-pipeline-ex",
            "bg-pipeline-mem", "bg-pipeline-wb"];
        var svg_ids = [null, "textID", "textEX", "textMEM", "textWB"];
        // Remove all pipeline highlights first
        var clsList = stage_cls.join(' ');
        $("[id^='asmdbg'] td").removeClass(clsList);
        // Add highlights for each active stage
        for (var i = 0; i < stage_pcs.length; i++) {
            var pc = stage_pcs[i];
            if (pc === 0) continue;
            $("td", "#asmdbg0x" + pc.toString(16)).addClass(stage_cls[i]);
        }
        // Update SVG text elements with decoded instruction at each pipeline stage
        var svg_o = document.getElementById('svg_p');
        if (svg_o !== null) {
            var svg = svg_o.contentDocument;
            if (svg !== null) {
                for (var i = 0; i < svg_ids.length; i++) {
                    var sid = svg_ids[i];
                    if (sid === null) continue;
                    var el = svg.getElementById(sid);
                    if (el === null) continue;
                    var pc = stage_pcs[i];
                    var insText = "";
                    if (pc !== 0) {
                        var td = $("td.asm_ins", "#asmdbg0x" + pc.toString(16));
                        if (td.length > 0) {
                            insText = td.text();
                        }
                    }
                    var tspan = el.querySelector('tspan');
                    if (tspan !== null) {
                        tspan.textContent = insText;
                    }
                }
            }
        }
    }

    // Inject pipeline stage CSS once
    if (typeof $ !== "undefined" && $("#pipeline-stage-styles").length === 0) {
        $("<style id='pipeline-stage-styles'>" +
            ".bg-pipeline-if { background-color: #a8d8ff !important; }" +
            ".bg-pipeline-id { background-color: #b8ffb8 !important; }" +
            ".bg-pipeline-ex { background-color: #ffffa8 !important; }" +
            ".bg-pipeline-mem { background-color: #ffd8a8 !important; }" +
            ".bg-pipeline-wb { background-color: #d8b8ff !important; }" +
            "</style>").appendTo("head");
    }

    /*
     *  Model elements
     */

    // CPU - ALU
    sim_p.elements.cpu_alu = {
        name: "ALU",
        description: "Arithmetic-Logic Unit",
        type: "subcomponent",
        belongs: "CPU",
        states: {
            "a": { ref: "M2_ALU" },
            "b": { ref: "M3_ALU" },
            "alu": { ref: "ALU_WOUT" },
            "flagn": { ref: "FLAG_N" },
            "flagz": { ref: "FLAG_Z" }
        },
        signals: {
            "cop": { ref: "ALUOP" }
        },
        states_inputs: ["a", "b"],
        states_outputs: ["alu", "flagn", "flagz"],
        signals_inputs: ["cop"],
        signals_output: [],
        states_mapping: []
    };

    // CPU - Register File
    sim_p.elements.register_file = {
        name: "RF",
        description: "Register File",
        type: "subcomponent",
        belongs: "CPU",
        states: {
            "ir[19:15]": { ref: "REG_R1" },
            "ir[24:20]": { ref: "REG_R2" },
            "ir[11:7]": { ref: "REG_W2" },
            "w_data": { ref: "W_DATA" },
            "r_data1": { ref: "R_DATA1" },
            "r_data2": { ref: "R_DATA2" }
        },
        signals: {
            "rw": { ref: "RW" }
        },
        states_inputs: ["ir[19:15]", "ir[24:20]", "ir[11:7]", "w_data"],
        states_outputs: ["r_data1", "r_data2"],
        signals_inputs: ["rw"],
        signals_output: [],
        states_mapping: []
    };

    return sim_p;
}
