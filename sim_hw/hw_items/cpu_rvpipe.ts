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

function cpu_rvpipe_register(sim_p: Simulator): Simulator {
    function create_op(behavior: BEHAVIORS, ...signals_or_states: (SIGNALS | STATES)[]): string {
        return behavior + " " + signals_or_states.join(" ") + ";";
    }
    const DEBUG = false;
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
                value = get_value(sim_p.states.BR[i]) >>> 0;
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
                value = get_value(sim_p.states['REG_' + internal_reg[i]]) >>> 0;
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

            set_value(r_ref, value);
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
        state: "REG_MICROADDR",
        is_pointer: false
    };

    enum STATES {
        REG_PC = "REG_PC",
        IF_FETCH_PC = "IF_FETCH_PC",
        ADDER_PC = "ADDER_PC",
        M1_ALU = "M1_ALU",
        M2_ALU = "M2_ALU",
        M3_ALU = "M3_ALU",
        ALU_OUT = "ALU_OUT",
        FLAG_N = "FLAG_N",
        FLAG_Z = "FLAG_Z",
        R_DATA1 = "R_DATA1",
        R_DATA2 = "R_DATA2",
        INTV = "INTV",
        IORdy = "IORdy",
        BUS_DB = "BUS_DB",
        BUS_AB = "BUS_AB",
        IF_ID_IR = "IF_ID_IR",
        IF_ID_PC = "IF_ID_PC",
        ID_EX_RS1 = "ID_EX_RS1",
        ID_EX_RS2 = "ID_EX_RS2",
        ID_EX_RS1_ADDR = "ID_EX_RS1_ADDR",
        ID_EX_RS2_ADDR = "ID_EX_RS2_ADDR",
        ID_EX_RD = "ID_EX_RD",
        ID_EX_ALUOP = "ID_EX_ALUOP",
        ID_EX_M3 = "ID_EX_M3",
        ID_EX_IMM = "ID_EX_IMM",
        ID_EX_PC = "ID_EX_PC",
        ID_EX_WB = "ID_EX_WB",
        ID_EX_DMR = "ID_EX_DMR",
        ID_EX_DMW = "ID_EX_DMW",
        ID_EX_WBE = "ID_EX_WBE",
        ID_EX_SE = "ID_EX_SE",
        EX_MEM_ALUOUT = "EX_MEM_ALUOUT",
        EX_MEM_WDATA = "EX_MEM_WDATA",
        EX_MEM_RD = "EX_MEM_RD",
        EX_MEM_WB = "EX_MEM_WB",
        EX_MEM_PC = "EX_MEM_PC",
        EX_MEM_DMR = "EX_MEM_DMR",
        EX_MEM_DMW = "EX_MEM_DMW",
        EX_MEM_WBE = "EX_MEM_WBE",
        EX_MEM_SE = "EX_MEM_SE",
        MEM_WB_DATA = "MEM_WB_DATA",
        MEM_WB_RD = "MEM_WB_RD",
        MEM_WB_WB = "MEM_WB_WB",
        MEM_WB_PC = "MEM_WB_PC",
        MEM_WB_LOAD = "MEM_WB_LOAD",
        DECODE_DMR = "DECODE_DMR",
        DECODE_DMW = "DECODE_DMW",
        DECODE_WBE = "DECODE_WBE",
        DECODE_SE = "DECODE_SE",
        DECODE_RS1_ADDR = "DECODE_RS1_ADDR",
        DECODE_RS2_ADDR = "DECODE_RS2_ADDR",
        DECODE_RD_ADDR = "DECODE_RD_ADDR",
        DECODE_ALUOP = "DECODE_ALUOP",
        DECODE_M3 = "DECODE_M3",
        DECODE_WB = "DECODE_WB",
        PIPE_STALL = "PIPE_STALL",
        RDATA = "RDATA",
        RDATAM = "RDATAM",
        VAL_ZERO = "VAL_ZERO",
        VAL_ONE = "VAL_ONE",
        VAL_FOUR = "VAL_FOUR",
        VAL_IMM = "VAL_IMM",
        CLK = "CLK",
        REG_IR_DECO = "REG_IR_DECO",
        REG_MICROADDR = "REG_MICROADDR",
        MUXA_MICROADDR = "MUXA_MICROADDR",
        REG_MICROINS = "REG_MICROINS",
        DECO_INS = "DECO_INS",
        ACC_TIME = "ACC_TIME",
        TTCPU = "TTCPU",
    };

    enum SIGNALS {
        ADDER_PC = "ADDER_PC",
        PIPE_FETCH = "PIPE_FETCH",
        RW = "RW",
        PIPE_DECODE = "PIPE_DECODE",
        PIPE_HAZARD = "PIPE_HAZARD",
        PIPE_FORWARD = "PIPE_FORWARD",
        PCWRITE = "PCWRITE",
        SE_IMM = "SE_IMM",
        SIZE = "SIZE",
        OFFSET = "OFFSET",
        X2_IMM = "X2_IMM",
        M1 = "M1",
        M2 = "M2",
        M3 = "M3",
        FORWARDING_UNIT = "FORWARDING_UNIT",
        M4 = "M4",
        IMR = "IMR",
        LOAD_MEM_WB_DATA = "LOAD_MEM_WB_DATA",
        LOAD_ALUOP = "LOAD_ALUOP",
        ALUOP = "ALUOP",
        PIPE_MEM_STAGE = "PIPE_MEM_STAGE",
        WBE = "WBE",
        IOCHK = "IOCHK",
        DB_UPDATED = "DB_UPDATED",
        CLK = "CLK",
        DMR = "DMR",
        DMW = "DMW",
        TEST_N = "TEST_N",
        TEST_Z = "TEST_Z",
        IF_ID_RST = "IF_ID_RST",
        ID_EX_RST = "ID_EX_RST",
        EX_MEM_RST = "EX_MEM_RST",
        MEM_WB_RST = "MEM_WB_RST",
    };

    enum BEHAVIORS {
        NOP = "NOP",
        NOP_ALU = "NOP_ALU",
        MV = "MV",
        AND = "AND",
        OR = "OR",
        XOR = "XOR",
        NOT = "NOT",
        ADD = "ADD",
        SUB = "SUB",
        ADDU = "ADDU",
        LUI = "LUI",
        MUL = "MUL",
        DIV = "DIV",
        MOD = "MOD",
        SUBU = "SUBU",
        MULU = "MULU",
        DIVU = "DIVU",
        SRL = "SRL",
        SRA = "SRA",
        SL = "SL",
        RR = "RR",
        RL = "RL",
        READ_IM = "READ_IM",
        FIRE = "FIRE",
        FIRE_IFSET = "FIRE_IFSET",
        DECO_IMM = "DECO_IMM",
        UPDATE_NZ = "UPDATE_NZ",
        CPU_RESET = "CPU_RESET",
        PIPE_IF = "PIPE_IF",
        PIPE_DECO = "PIPE_DECO",
        HAZARD_DETECTION_UNIT = "HAZARD_DETECTION_UNIT",
        FORWARDING_UNIT = "FORWARDING_UNIT",
        PIPE_WB_WRITE = "PIPE_WB_WRITE",
        PIPE_DISPLAY = "PIPE_DISPLAY",
        PIPE_WB_LOAD = "PIPE_WB_LOAD",
        PIPE_MEM_STAGE_OP = "PIPE_MEM_STAGE_OP",
        MEM_READ = "MEM_READ",
        MEM_WRITE = "MEM_WRITE",
        CLOCK = "CLOCK",
    };

    /*
     *  Internal States
     */

    sim_p.internal_states.io_hash = {};
    sim_p.internal_states.FIRMWARE = ws_empty_firmware;
    sim_p.internal_states.fire_once = [];
    sim_p.internal_states.MC = { 0: { is_native: true, value: {}, default_value: {} } };
    sim_p.internal_states.ROM = {};

    sim_p.internal_states.tri_state_names = [];
    sim_p.internal_states.fire_visible = { 'databus': false, 'internalbus': false };
    sim_p.internal_states.filter_states = ["REG_IR_DECO,virtual", "IF_ID_IR,real",
        "REG_PC,real",
        STATES.M1_ALU + ",real",
        STATES.M3_ALU + ",real",
        STATES.ALU_OUT + ",real",
        STATES.IF_ID_IR + ",real",
        STATES.IF_ID_PC + ",real",
        STATES.ID_EX_RS1 + ",real",
        STATES.ID_EX_RS2 + ",real",
        STATES.ID_EX_RS1_ADDR + ",real",
        STATES.ID_EX_RS2_ADDR + ",real",
        STATES.ID_EX_RD + ",real",
        STATES.ID_EX_ALUOP + ",real",
        STATES.ID_EX_M3 + ",real",
        STATES.ID_EX_IMM + ",real",
        STATES.ID_EX_PC + ",real",
        STATES.ID_EX_WB + ",real",
        STATES.ID_EX_DMR + ",real",
        STATES.ID_EX_DMW + ",real",
        STATES.ID_EX_WBE + ",real",
        STATES.ID_EX_SE + ",real",
        STATES.EX_MEM_ALUOUT + ",real",
        STATES.EX_MEM_WDATA + ",real",
        STATES.EX_MEM_RD + ",real",
        STATES.EX_MEM_WB + ",real",
        STATES.EX_MEM_PC + ",real",
        STATES.EX_MEM_DMR + ",real",
        STATES.EX_MEM_DMW + ",real",
        STATES.EX_MEM_WBE + ",real",
        STATES.EX_MEM_SE + ",real",
        STATES.MEM_WB_DATA + ",real",
        STATES.MEM_WB_RD + ",real",
        STATES.MEM_WB_WB + ",real",
        STATES.MEM_WB_PC + ",real",
        STATES.MEM_WB_LOAD + ",real"];
    sim_p.internal_states.filter_signals = ["ALUOP,0",
        "IMR,0", "RW,0", "DMR,0", "DMW,0"];
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

    sim_p.states[STATES.REG_PC] = {
        name: "PC", verbal: "Program Counter Register",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.IF_FETCH_PC] = {
        name: "IF_PC", verbal: "IF Stage Program Counter",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ADDER_PC] = {
        name: "ADDER_PC", verbal: "Result of PC + 4",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* ALU (RELATED) STATES */
    sim_p.states[STATES.M1_ALU] = {
        name: "M1_ALU", verbal: "Forwarded rs1. Input ALU via M1",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.M2_ALU] = {
        name: "M2_ALU", verbal: "Forwarded rs2",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.M3_ALU] = {
        name: "M3_ALU", verbal: "Input ALU via M3",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ALU_OUT] = {
        name: "ALU_OUT", verbal: "ALU out value",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    sim_p.states[STATES.FLAG_N] = {
        name: "FLAG_N", verbal: "Negative Flag",
        visible: true, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.FLAG_Z] = {
        name: "FLAG_Z", verbal: "Zero Flag",
        visible: true, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };

    /* REGISTER FILE INTERFACE STATES */
    sim_p.states[STATES.R_DATA1] = {
        name: "R_DATA1", verbal: "Read Data 1",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.R_DATA2] = {
        name: "R_DATA2", verbal: "Read Data 2",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* DEVICES AND BUSES */
    sim_p.states[STATES.INTV] = {
        name: "INTV", verbal: "Interruption Vector",
        visible: false, nbits: "8", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.IORdy] = {
        name: "IORdy", verbal: "From MUX-C/1 to JUMP",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.BUS_DB] = {
        name: "BUS_DB", verbal: "Data Bus",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.BUS_AB] = {
        name: "BUS_AB", verbal: "Address Bus",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* PIPELINE REGISTERS */
    // IF/ID
    sim_p.states[STATES.IF_ID_IR] = {
        name: "IF_ID_INS", verbal: "IF/ID Instruction",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.IF_ID_PC] = {
        name: "IF_ID_PC", verbal: "IF/ID PC",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    // ID/EX
    sim_p.states[STATES.ID_EX_RS1] = {
        name: "ID_EX_RS1", verbal: "ID/EX Read Data 1",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ID_EX_RS2] = {
        name: "ID_EX_RS2", verbal: "ID/EX Read Data 2",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ID_EX_RS1_ADDR] = {
        name: "ID_EX_RS1_ADDR", verbal: "ID/EX RS1 Addr",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ID_EX_RS2_ADDR] = {
        name: "ID_EX_RS2_ADDR", verbal: "ID/EX RS2 Addr",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ID_EX_RD] = {
        name: "ID_EX_RD", verbal: "ID/EX Dest Register",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ID_EX_ALUOP] = {
        name: "ID_EX_ALUOP", verbal: "ID/EX ALU Op",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ID_EX_M3] = {
        name: "ID_EX_M3", verbal: "ID/EX M3",
        visible: true, nbits: "2", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ID_EX_IMM] = {
        name: "ID_EX_IMM", verbal: "ID/EX Immediate",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    // EX/MEM
    sim_p.states[STATES.EX_MEM_ALUOUT] = {
        name: "EX_MEM_ALUOUT", verbal: "EX/MEM ALU Result",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.EX_MEM_WDATA] = {
        name: "EX_MEM_WDATA", verbal: "EX/MEM Write Data",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.EX_MEM_RD] = {
        name: "EX_MEM_RD", verbal: "EX/MEM Dest Register",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.EX_MEM_WB] = {
        name: "EX_MEM_WB", verbal: "EX/MEM WriteBack",
        visible: true, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    // MEM/WB
    sim_p.states[STATES.MEM_WB_DATA] = {
        name: "MEM_WB_DATA", verbal: "MEM/WB Write Data",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.MEM_WB_RD] = {
        name: "MEM_WB_RD", verbal: "MEM/WB Dest Register",
        visible: true, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.MEM_WB_WB] = {
        name: "MEM_WB_WB", verbal: "MEM/WB WriteBack",
        visible: true, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };

    // Pipeline control states for memory operations (load/store)
    // Decode stage
    sim_p.states[STATES.DECODE_DMR] = {
        name: "DECODE_DMR", verbal: "Decoded Data Mem Read",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.DECODE_DMW] = {
        name: "DECODE_DMW", verbal: "Decoded Data Mem Write",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    // ID/EX stage
    sim_p.states[STATES.ID_EX_DMR] = {
        name: "ID_EX_DMR", verbal: "ID/EX Data Mem Read",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ID_EX_DMW] = {
        name: "ID_EX_DMW", verbal: "ID/EX Data Mem Write",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    // EX/MEM stage
    sim_p.states[STATES.EX_MEM_DMR] = {
        name: "EX_MEM_DMR", verbal: "EX/MEM Data Mem Read",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.EX_MEM_DMW] = {
        name: "EX_MEM_DMW", verbal: "EX/MEM Data Mem Write",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    /* PIPE STALL */
    // Decode stage: WBE (byte select) and SE (sign extend for loads)
    sim_p.states[STATES.DECODE_WBE] = {
        name: "DECODE_WBE", verbal: "Decoded Write Byte Enable",
        visible: false, nbits: "2", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.DECODE_SE] = {
        name: "DECODE_SE", verbal: "Decoded Sign Extend",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    // ID/EX stage
    sim_p.states[STATES.ID_EX_WBE] = {
        name: "ID_EX_WBE", verbal: "ID/EX Write Byte Enable",
        visible: false, nbits: "2", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ID_EX_SE] = {
        name: "ID_EX_SE", verbal: "ID/EX Sign Extend",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    // EX/MEM stage
    sim_p.states[STATES.EX_MEM_WBE] = {
        name: "EX_MEM_WBE", verbal: "EX/MEM Write Byte Enable",
        visible: false, nbits: "2", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.EX_MEM_SE] = {
        name: "EX_MEM_SE", verbal: "EX/MEM Sign Extend",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };

    /* PIPE STALL */
    sim_p.states[STATES.PIPE_STALL] = {
        name: "PIPE_STALL", verbal: "Pipeline Stall Flag",
        visible: true, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };

    // Pipeline PC tracking (for debug display)
    sim_p.states[STATES.ID_EX_PC] = {
        name: "ID_EX_PC", verbal: "ID/EX PC",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ID_EX_WB] = {
        name: "ID_EX_WB", verbal: "ID/EX WriteBack flag",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.EX_MEM_PC] = {
        name: "EX_MEM_PC", verbal: "EX/MEM PC",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.MEM_WB_PC] = {
        name: "MEM_WB_PC", verbal: "MEM/WB PC",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.MEM_WB_LOAD] = {
        name: "MEM_WB_LOAD", verbal: "MEM/WB Is Load",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };

    /* MUX INTERFACE STATES (for signal compatibility) */
    sim_p.states[STATES.RDATA] = {
        name: "RDATA", verbal: "Read Data from Memory",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* CONSTANTS */
    sim_p.states[STATES.VAL_ZERO] = {
        name: "VAL_ZERO", verbal: "Wired Zero",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.VAL_ONE] = {
        name: "VAL_ONE", verbal: "Wired One",
        visible: false, nbits: "32", value: 1, default_value: 1,
        draw_data: []
    };
    sim_p.states[STATES.VAL_FOUR] = {
        name: "VAL_FOUR", verbal: "Wired Four",
        visible: false, nbits: "32", value: 4, default_value: 4,
        draw_data: []
    };
    sim_p.states[STATES.VAL_IMM] = {
        name: "VAL_IMM", verbal: "Immediate Value",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* DECODE STORAGE (survives microcode reset) */
    sim_p.states[STATES.DECODE_RS1_ADDR] = {
        name: "DECODE_RS1_ADDR", verbal: "Decoded RS1 address",
        visible: false, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.DECODE_RS2_ADDR] = {
        name: "DECODE_RS2_ADDR", verbal: "Decoded RS2 address",
        visible: false, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.DECODE_RD_ADDR] = {
        name: "DECODE_RD_ADDR", verbal: "Decoded RD address",
        visible: false, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.DECODE_ALUOP] = {
        name: "DECODE_ALUOP", verbal: "Decoded ALU operation",
        visible: false, nbits: "5", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.DECODE_M3] = {
        name: "DECODE_M3", verbal: "Decoded M3",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.DECODE_WB] = {
        name: "DECODE_WB", verbal: "Decoded write-back flag",
        visible: false, nbits: "1", value: 0, default_value: 0,
        draw_data: []
    };

    /* VIRTUAL */
    sim_p.states[STATES.CLK] = {
        name: "CLK", verbal: "Clock",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.REG_IR_DECO] = {
        name: "IR_DECO", verbal: "Instruction Decoded",
        visible: true, nbits: "0", value: 0, default_value: 0,
        draw_data: []
    };
    // Necessary for logic in wepsim but not in rvpipe
    sim_p.states[STATES.REG_MICROADDR] = {
        name: "uADDR", verbal: "Microaddress Register",
        visible: true, nbits: "12", value: 0, default_value: 0,
        draw_data: []
    };
    // Necessary for logic in wepsim but not in rvpipe
    sim_p.states[STATES.MUXA_MICROADDR] = {
        name: "MUXA_MICROADDR", verbal: "Input microaddress",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    // Necessary for logic in wepsim but not in rvpipe
    sim_p.states[STATES.REG_MICROINS] = {
        name: "uINS", verbal: "Microinstruction Register",
        visible: false, nbits: "32", value: {}, default_value: {},
        draw_data: []
    };
    sim_p.states[STATES.DECO_INS] = {
        name: "DECO_INS", verbal: "Instruction decoded in binary",
        visible: true, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.ACC_TIME] = {
        name: "ACC_TIME", verbal: "Accumulated CPU time",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states[STATES.TTCPU] = {
        name: "TTCPU", verbal: "Several Tristates to the internal data bus in CPU activated",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };


    /*
     *  Signals
     */

    /* Pipeline stage enable signals (L type, fire before other L signals) */
    sim_p.signals[SIGNALS.ADDER_PC] = {
        name: "PC_ADDER", visible: false, type: "E", value: 0, default_value: 0, nbits: "32",
        behavior: [create_op(BEHAVIORS.ADD, STATES.ADDER_PC, STATES.IF_FETCH_PC, STATES.VAL_FOUR)],
        depends_on: [],
        fire_name: [],
        draw_data: [[]],
        draw_name: [[]]
    };

    sim_p.signals[SIGNALS.PIPE_FETCH] = {
        name: "PIPE_FETCH", visible: false, type: "L", value: 1, default_value: 1, nbits: "1",
        behavior: [create_op(BEHAVIORS.PIPE_IF)],
        depends_on: [],
        fire_name: [],
        draw_data: [[]],
        draw_name: [[]]
    };

    /* REGISTER FILE WRITE (WB stage) - fires before PIPE_DECODE for WB->ID forwarding */
    sim_p.signals[SIGNALS.RW] = {
        name: "RW", visible: true, type: "L", value: 1, default_value: 1, nbits: "1",
        behavior: [create_op(BEHAVIORS.PIPE_WB_WRITE)],
        depends_on: [],
        fire_name: ['svg_p:text7229-4'],
        draw_data: [['svg_p:path6725', 'svg_p:path6727', 'svg_p:path6729',
            'svg_p:path6731', 'svg_p:path6733', 'svg_p:path6735', 'svg_p:path6915',
            'svg_p:path6913', 'svg_p:path6907', 'svg_p:path6909']],
        draw_name: [['svg_p:path7291']]
    };

    sim_p.signals[SIGNALS.PIPE_DECODE] = {
        name: "PIPE_DECODE", visible: false, type: "L", value: 1, default_value: 1, nbits: "1",
        behavior: [create_op(BEHAVIORS.PIPE_DECO)],
        depends_on: [],
        fire_name: [],
        draw_data: [[]],
        draw_name: [[]]
    };

    sim_p.signals[SIGNALS.PIPE_FORWARD] = {
        name: "PIPE_FORWARD", visible: false, type: "L", value: 1, default_value: 1, nbits: "1",
        behavior: [create_op(BEHAVIORS.FORWARDING_UNIT) + create_op(BEHAVIORS.MV, SIGNALS.M3, STATES.ID_EX_M3)],
        fire_name: ['ID_EX_RST'],
        draw_data: [[]],
        draw_name: [[]]
    };

    /* PC */
    sim_p.signals[SIGNALS.PCWRITE] = {
        name: "PCWRITE", visible: true, type: "E", value: 1, default_value: 1, nbits: "2",
        behavior: [create_op(BEHAVIORS.NOP),
        create_op(BEHAVIORS.MV, STATES.IF_FETCH_PC, STATES.ADDER_PC),
        create_op(BEHAVIORS.MV, STATES.IF_FETCH_PC, STATES.VAL_ZERO),
        create_op(BEHAVIORS.NOP)],
        depends_on: [SIGNALS.ADDER_PC, SIGNALS.IF_ID_RST],
        fire_name: ['svg_p:text7155'],
        draw_data: [[]],
        draw_name: [['svg_p:path7135', 'svg_p:path7125', 'svg_p:path7137']]
    };

    /* IMMEDIATE GENERATOR */
    sim_p.signals[SIGNALS.SE_IMM] = {
        name: "SE_IMM", visible: true, type: "L", value: 0, default_value: 0, nbits: "1",
        verbal: ['Set superior bits of immediate value to 0.',
            'Extend sign of immediate value.'],
        behavior: [create_op(BEHAVIORS.NOP)],
        depends_on: [],
        fire_name: ['svg_p:text7301'],
        draw_data: [[]],
        draw_name: [['svg_p:path7292', 'svg_p:path7292']]
    };
    sim_p.signals[SIGNALS.SIZE] = {
        name: "SIZE", visible: true, type: "L", value: 0, default_value: 0, nbits: "5",
        behavior: [create_op(BEHAVIORS.NOP)],
        depends_on: [],
        fire_name: ['svg_p:text7302'],
        draw_data: [[]],
        draw_name: [['svg_p:path7293']]
    };
    sim_p.signals[SIGNALS.OFFSET] = {
        name: "OFFSET", visible: true, type: "L", value: 0, default_value: 0, nbits: "5",
        behavior: [create_op(BEHAVIORS.NOP)],
        depends_on: [],
        fire_name: ['svg_p:text7303'],
        draw_data: [[]],
        draw_name: [['svg_p:path7294']]
    };
    sim_p.signals[SIGNALS.X2_IMM] = {
        name: "X2_IMM", visible: true, type: "L", value: 0, default_value: 0, nbits: "1",
        verbal: ['Multiply by 1.',
            'Multiply by 2.'],
        behavior: [create_op(BEHAVIORS.NOP)],
        depends_on: [],
        fire_name: ['svg_p:text7301-1'],
        draw_data: [[]],
        draw_name: [['svg_p:path7292-0']]
    };

    /* MUX Forwarding */
    sim_p.signals[SIGNALS.M1] = {
        name: "M1", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
        behavior: [create_op(BEHAVIORS.MV, STATES.M1_ALU, STATES.ID_EX_RS1),
        create_op(BEHAVIORS.MV, STATES.M1_ALU, STATES.MEM_WB_DATA),
        create_op(BEHAVIORS.MV, STATES.M1_ALU, STATES.EX_MEM_ALUOUT),
            ""],
        depends_on: [SIGNALS.PIPE_FORWARD, SIGNALS.CLK],
        fire_name: ['svg_p:text7229-7', 'svg_p:text7229'],
        draw_data: [['svg_p:path6775', 'svg_p:path6777'], [], [], []],
        draw_name: [[], ['svg_p:path7199', 'svg_p:path7013'], ['svg_p:path7199', 'svg_p:path7013']]
    };

    sim_p.signals[SIGNALS.M2] = {
        name: "M2", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
        behavior: [create_op(BEHAVIORS.MV, STATES.M2_ALU, STATES.ID_EX_RS2),
        create_op(BEHAVIORS.MV, STATES.M2_ALU, STATES.MEM_WB_DATA),
        create_op(BEHAVIORS.MV, STATES.M2_ALU, STATES.EX_MEM_ALUOUT),
            ""],
        depends_on: [SIGNALS.PIPE_FORWARD, SIGNALS.CLK],
        fire_name: ['svg_p:text7237', 'svg_p:text7237-0'],
        draw_data: [['svg_p:path6821', 'svg_p:path6823'], [], [], []],
        draw_name: [[], ['svg_p:path7197', 'svg_p:path7013-0'], ['svg_p:path7197', 'svg_p:path7013-0']]
    };

    sim_p.signals[SIGNALS.M3] = {
        name: "M3", visible: true, type: "L", value: 0, default_value: 0, nbits: "2",
        behavior: [create_op(BEHAVIORS.MV, STATES.M3_ALU, STATES.M2_ALU),
        create_op(BEHAVIORS.MV, STATES.M3_ALU, STATES.VAL_ONE),
        create_op(BEHAVIORS.MV, STATES.M3_ALU, STATES.VAL_FOUR),
        create_op(BEHAVIORS.MV, STATES.M3_ALU, STATES.ID_EX_IMM)],
        depends_on: [SIGNALS.M2, SIGNALS.CLK],
        fire_name: ['svg_p:text7237-3'],
        draw_data: [['svg_p:path6841', 'svg_p:path6823-2'],
        ['svg_p:path7003-3', 'svg_p:path7001-4'],
        ['svg_p:path6827-3', 'svg_p:path6825-7'],
        ['svg_p:path6903-8-4-9', 'svg_p:path7013-5', 'svg_p:path6827-3-4', 'svg_p:path6825-7-8']],
        draw_name: [[], ['svg_p:path7197-7'], ['svg_p:path7197-7'], ['svg_p:path7197-7']]
    };

    const F1_DRAW_DATA = ['svg_p:path7001-6', 'svg_p:path7013-9', 'svg_p:path7001', 'svg_p:path7003', 'svg_p:path7003-8', 'svg_p:path7567-0-8-6-9', 'svg_p:path7013-0-2-9-3', 'svg_p:path7567-0-6-9'];
    const F2_DRAW_DATA = ['svg_p:path7013-9-0', 'svg_p:path6825-8', 'svg_p:path6827-7', 'svg_p:path6827', 'svg_p:path6825', 'svg_p:path7567-0-8-6', 'svg_p:path7013-5-6-4'];
    const F1_F2_DRAW_DATA = [...F1_DRAW_DATA, ...F2_DRAW_DATA];
    sim_p.signals[SIGNALS.FORWARDING_UNIT] = {
        name: "M2", visible: true, type: "L", value: 0, default_value: 0, nbits: "4",
        behavior: [create_op(BEHAVIORS.NOP)], // TODO calculate forwarding and move to M1 and M2 the bits
        depends_on: [SIGNALS.CLK],
        fire_name: [],
        draw_data: [
            [],                     //  0
            [...F1_DRAW_DATA],      //  1 -> M1 0 M2 1
            [...F2_DRAW_DATA],      //  2 -> M1 0 M2 2
            [],                     //  3
            [...F1_DRAW_DATA],      //  4 -> M1 1 M2 0
            [...F1_DRAW_DATA],      //  5 -> M1 1 M2 1
            [...F1_F2_DRAW_DATA],   //  6 -> M1 1 M2 2
            [],                     //  7
            [...F2_DRAW_DATA],      //  8 -> M1 2 M2 0
            [...F1_F2_DRAW_DATA],   //  9 -> M1 2 M2 1
            [...F2_DRAW_DATA],      // 10 -> M1 2 M2 2
            [],                     // 11
            [],                     // 12
            [],                     // 13
            [],                     // 14
            [],                     // 15
        ],
        draw_name: [[]]
    };

    /* MUX 4 (PC source) */
    sim_p.signals[SIGNALS.M4] = {
        name: "M4", visible: true, type: "L", value: 0, default_value: 0, nbits: "1",
        behavior: [create_op(BEHAVIORS.NOP)],
        depends_on: [""],
        fire_name: ['svg_p:text7229-5'],
        draw_data: [[]],
        draw_name: [[]]
    };

    /* INSTRUCTION MEMORY READ */
    sim_p.signals[SIGNALS.IMR] = {
        name: "IMR", visible: true, type: "L", value: 1, default_value: 1, nbits: "1",
        behavior: [create_op(BEHAVIORS.READ_IM)],
        depends_on: [],
        fire_name: ['svg_p:text7417'],
        draw_data: [[]],
        draw_name: [[]]
    };

    /* LOAD WB DATA for loads: overwrite MEM_WB_DATA with RDATAM when load */
    sim_p.signals[SIGNALS.LOAD_MEM_WB_DATA] = {
        name: "LOAD_MEM_WB_DATA", visible: false, type: "E", value: 1, default_value: 1, nbits: "1",
        behavior: [create_op(BEHAVIORS.NOP), create_op(BEHAVIORS.PIPE_WB_LOAD)],
        depends_on: [SIGNALS.MEM_WB_RST],
        fire_name: [],
        draw_data: [[]],
        draw_name: [[]]
    };

    /* HAZARD CHECK: detect load-use hazard before ID/EX capture */
    sim_p.signals[SIGNALS.PIPE_HAZARD] = {
        name: "PIPE_HAZARD", visible: false, type: "L", value: 0, default_value: 0, nbits: "1",
        behavior: [create_op(BEHAVIORS.HAZARD_DETECTION_UNIT), create_op(BEHAVIORS.HAZARD_DETECTION_UNIT)],
        depends_on: [SIGNALS.CLK],
        fire_name: ['svg_p:text7229-7-2'],
        draw_data: [[]],
        draw_name: [[], ['svg_p:path7013-51']]
    };

    sim_p.signals[SIGNALS.IF_ID_RST] = {
        name: "IF_ID_RST", visible: false, type: "E", value: 0, default_value: 0, nbits: "2",
        behavior: [
            // 0 -> load values
            create_op(BEHAVIORS.MV, STATES.IF_ID_IR, STATES.RDATA) +
            create_op(BEHAVIORS.MV, STATES.IF_ID_PC, STATES.IF_FETCH_PC),
            // 1 -> reset values
            create_op(BEHAVIORS.MV, STATES.IF_ID_IR, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.IF_ID_PC, STATES.VAL_ZERO),
            // 2 and 3 -> nop
            create_op(BEHAVIORS.NOP),
            create_op(BEHAVIORS.NOP),
        ],
        depends_on: [SIGNALS.IMR, SIGNALS.ID_EX_RST, SIGNALS.PIPE_HAZARD, SIGNALS.CLK],
        fire_name: ['svg_p:textIF_ID_RST'],
        draw_data: [[]],
        draw_name: [[], ['svg_p:path7199-9-6-1'], ['svg_p:path7199-9-6-1'], ['svg_p:path7199-9-6-1']]
    }

    sim_p.signals[SIGNALS.ID_EX_RST] = {
        name: "ID_EX_RST", visible: false, type: "E", value: 0, default_value: 0, nbits: "2",
        behavior: [
            // 0 -> load values
            create_op(BEHAVIORS.MV, STATES.ID_EX_RS1, STATES.R_DATA1) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_RS2, STATES.R_DATA2) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_RS1_ADDR, STATES.DECODE_RS1_ADDR) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_RS2_ADDR, STATES.DECODE_RS2_ADDR) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_RD, STATES.DECODE_RD_ADDR) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_ALUOP, STATES.DECODE_ALUOP) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_M3, STATES.DECODE_M3) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_IMM, STATES.VAL_IMM) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_PC, STATES.IF_ID_PC) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_WB, STATES.DECODE_WB) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_DMR, STATES.DECODE_DMR) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_DMW, STATES.DECODE_DMW) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_WBE, STATES.DECODE_WBE) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_SE, STATES.DECODE_SE),
            // 1 -> reset values
            create_op(BEHAVIORS.MV, STATES.ID_EX_RS1, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_RS2, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_RS1_ADDR, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_RS2_ADDR, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_RD, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_ALUOP, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_M3, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_IMM, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_PC, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_WB, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_DMR, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_DMW, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_WBE, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.ID_EX_SE, STATES.VAL_ZERO),
            // 2 and 3 -> nop
            create_op(BEHAVIORS.NOP),
            create_op(BEHAVIORS.NOP),
        ],
        depends_on: [SIGNALS.PIPE_DECODE, SIGNALS.EX_MEM_RST, SIGNALS.PIPE_HAZARD, SIGNALS.CLK],
        fire_name: ['svg_p:textID_EX_RST'],
        draw_data: [[]],
        draw_name: [[], ['svg_p:path7199-9-6-14'], ['svg_p:path7199-9-6-14'], ['svg_p:path7199-9-6-14']]
    }

    sim_p.signals[SIGNALS.EX_MEM_RST] = {
        name: "EX_MEM_RST", visible: false, type: "E", value: 0, default_value: 0, nbits: "2",
        behavior: [
            // 0 -> load values
            create_op(BEHAVIORS.MV, STATES.EX_MEM_ALUOUT, STATES.ALU_OUT) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_WDATA, STATES.M2_ALU) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_PC, STATES.ID_EX_PC) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_RD, STATES.ID_EX_RD) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_WB, STATES.ID_EX_WB) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_DMR, STATES.ID_EX_DMR) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_DMW, STATES.ID_EX_DMW) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_WBE, STATES.ID_EX_WBE) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_SE, STATES.ID_EX_SE),
            // 1 -> reset values
            create_op(BEHAVIORS.MV, STATES.EX_MEM_ALUOUT, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_WDATA, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_PC, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_RD, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_WB, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_DMR, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_DMW, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_WBE, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.EX_MEM_SE, STATES.VAL_ZERO),
            // 2 and 3 -> nop
            create_op(BEHAVIORS.NOP),
            create_op(BEHAVIORS.NOP),
        ],
        depends_on: [SIGNALS.M2, SIGNALS.ALUOP, SIGNALS.MEM_WB_RST, SIGNALS.CLK],
        fire_name: ['svg_p:textEX_MEM_RST'],
        draw_data: [[]],
        draw_name: [[], ['svg_p:path7199-9-6-14-7'], ['svg_p:path7199-9-6-14-7'], ['svg_p:path7199-9-6-14-7']]
    }

    sim_p.signals[SIGNALS.MEM_WB_RST] = {
        name: "MEM_WB_RST", visible: false, type: "E", value: 0, default_value: 0, nbits: "2",
        behavior: [
            // 0 -> load values
            create_op(BEHAVIORS.MV, STATES.MEM_WB_DATA, STATES.EX_MEM_ALUOUT) +
            create_op(BEHAVIORS.MV, STATES.MEM_WB_RD, STATES.EX_MEM_RD) +
            create_op(BEHAVIORS.MV, STATES.MEM_WB_WB, STATES.EX_MEM_WB) +
            create_op(BEHAVIORS.MV, STATES.MEM_WB_PC, STATES.EX_MEM_PC) +
            create_op(BEHAVIORS.MV, STATES.MEM_WB_LOAD, STATES.EX_MEM_DMR),
            // 1 -> reset values
            create_op(BEHAVIORS.MV, STATES.MEM_WB_DATA, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.MEM_WB_RD, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.MEM_WB_WB, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.MEM_WB_PC, STATES.VAL_ZERO) +
            create_op(BEHAVIORS.MV, STATES.MEM_WB_LOAD, STATES.VAL_ZERO),
            // 2 and 3 -> nop
            create_op(BEHAVIORS.NOP),
            create_op(BEHAVIORS.NOP),
        ],
        depends_on: [SIGNALS.M2, SIGNALS.ALUOP, SIGNALS.CLK],
        fire_name: ['svg_p:textMEM_WB_RST'],
        draw_data: [[]],
        draw_name: [[], ['svg_p:path7199-9-6-14-0'], ['svg_p:path7199-9-6-14-0']]
    }

    /* ALU */
    sim_p.signals[SIGNALS.LOAD_ALUOP] = {
        name: "LOAD_ALUOP", visible: false, type: "L", value: 0, default_value: 0, nbits: "1",
        behavior: [create_op(BEHAVIORS.MV, SIGNALS.ALUOP, STATES.ID_EX_ALUOP)],
        depends_on: [],
        fire_name: [],
        draw_data: [[]],
        draw_name: [[]]
    };

    sim_p.signals[SIGNALS.ALUOP] = {
        name: "ALUOP", visible: true, type: "L", value: 0, default_value: 0, nbits: "5",
        behavior: [create_op(BEHAVIORS.NOP_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.AND, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.OR, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.NOT, STATES.ALU_OUT, STATES.M1_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.XOR, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.SRL, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.SRA, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.SL, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.RR, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.RL, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.ADD, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.SUB, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.MUL, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.DIV, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.MOD, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.LUI, STATES.ALU_OUT, STATES.M1_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.ADDU, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.SUBU, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.MULU, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.DIVU, STATES.ALU_OUT, STATES.M1_ALU, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.NOP_ALU),
        create_op(BEHAVIORS.NOP_ALU),
        create_op(BEHAVIORS.NOP_ALU),
        create_op(BEHAVIORS.NOP_ALU),
        create_op(BEHAVIORS.NOP_ALU),
        create_op(BEHAVIORS.NOP_ALU),
        create_op(BEHAVIORS.NOP_ALU),
        create_op(BEHAVIORS.NOP_ALU),
        create_op(BEHAVIORS.NOP_ALU),
        create_op(BEHAVIORS.NOP_ALU),
        create_op(BEHAVIORS.MV, STATES.ALU_OUT, STATES.M1_ALU) + create_op(BEHAVIORS.UPDATE_NZ),
        create_op(BEHAVIORS.MV, STATES.ALU_OUT, STATES.M3_ALU) + create_op(BEHAVIORS.UPDATE_NZ)],
        depends_on: [SIGNALS.LOAD_ALUOP, SIGNALS.M1, SIGNALS.M3],
        fire_name: ['svg_p:text7269'],
        draw_data: [['svg_p:path6845', 'svg_p:path6847', 'svg_p:path6843']],
        draw_name: [['svg_p:path7249']]
    };

    /* MEMORY STAGE control for load/store */
    sim_p.signals[SIGNALS.PIPE_MEM_STAGE] = {
        name: "PIPE_MEM_STAGE", visible: false, type: "L", value: 1, default_value: 1, nbits: "1",
        behavior: [create_op(BEHAVIORS.NOP), create_op(BEHAVIORS.PIPE_MEM_STAGE_OP)],
        depends_on: [],
        fire_name: [],
        draw_data: [[]],
        draw_name: [[]]
    };

    sim_p.signals[SIGNALS.WBE] = {
        name: "WBE", visible: false, type: "L", value: 0, default_value: 0, nbits: "2",
        behavior: [create_op(BEHAVIORS.NOP)],
        depends_on: [],
        fire_name: ['svg_p:text7555', 'svg_p:text7433'],
        draw_data: [['svg_p:path7075-2', 'svg_p:path7043-6', 'svg_p:path7203',
            'svg_p:path7579', 'svg_p:path7581', 'svg_p:path7075',
            'svg_p:path6911-8-3', 'svg_p:path7567-0-5-0',
            'svg_p:path6911-8', 'svg_p:path7421', 'svg_p:path7423']],
        draw_name: [['svg_p:path7529', 'svg_p:path7425']]
    };

    /* I/O Devices */
    sim_p.signals[SIGNALS.IOCHK] = {
        name: "IOCHK", visible: true, type: "L", value: 0, default_value: 0, nbits: "1",
        behavior: [create_op(BEHAVIORS.NOP)], // TODO
        depends_on: [],
        fire_name: [],
        draw_data: [[], []],
        draw_name: [[], []]
    };
    sim_p.signals[SIGNALS.DB_UPDATED] = {
        name: "DB_UPDATED", visible: false, type: "L", value: 0, default_value: 0, nbits: "1",
        behavior: [create_op(BEHAVIORS.NOP)],
        depends_on: [],
        fire_name: [],
        draw_data: [[]],
        draw_name: [[]]
    };

    /* Virtual Signals, for UI */
    sim_p.signals[SIGNALS.TEST_N] = {
        name: "TEST_N", visible: true, type: "L", value: 0, default_value: 0, nbits: "1", forbidden: true,
        behavior: [create_op(BEHAVIORS.MV, STATES.FLAG_N, STATES.VAL_ZERO), create_op(BEHAVIORS.MV, STATES.FLAG_N, STATES.VAL_ONE)],
        depends_on: [SIGNALS.ALUOP],
        fire_name: ['svg_p:text351', 'svg_p:text7185-5'],
        draw_data: [['svg_p:path7251']],
        draw_name: [['svg_p:path7157']]
    };
    sim_p.signals[SIGNALS.TEST_Z] = {
        name: "TEST_Z", visible: true, type: "L", value: 0, default_value: 0, nbits: "1", forbidden: true,
        behavior: [create_op(BEHAVIORS.MV, STATES.FLAG_Z, STATES.VAL_ZERO), create_op(BEHAVIORS.MV, STATES.FLAG_Z, STATES.VAL_ONE)],
        depends_on: [SIGNALS.ALUOP],
        fire_name: ['svg_p:text7615', 'svg_p:text7193-5'],
        draw_data: [['svg_p:path7617']],
        draw_name: [['svg_p:path7165']]
    };


    /*
     *  Behaviors
     */
    sim_p.behaviors[BEHAVIORS.NOP] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
        },
        verbal: function (s_expr: string[]): string { return ""; }
    };
    sim_p.behaviors[BEHAVIORS.NOP_ALU] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            sim_p.internal_states.alu_flags.flag_n = 0;
            sim_p.internal_states.alu_flags.flag_z = 0;
        },
        verbal: function (s_expr: string[]): string { return ""; }
    };
    sim_p.behaviors[BEHAVIORS.MV] = {
        nparameters: 3,
        types: ["X", "X"],
        operation: function (s_expr: string[]): void {
            var sim_elto_org = get_reference(s_expr[2]);
            var sim_elto_dst = get_reference(s_expr[1]);
            var newval = get_value(sim_elto_org);
            set_value(sim_elto_dst, newval);
            if (DEBUG) console.log(s_expr, "new value", newval);
        },
        verbal: function (s_expr: string[]): string {
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
    sim_p.behaviors[BEHAVIORS.AND] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var result = get_value(sim_p.states[s_expr[2]]) & get_value(sim_p.states[s_expr[3]]);
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var result = get_value(sim_p.states[s_expr[2]]) & get_value(sim_p.states[s_expr[3]]);
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU AND with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (AND). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.OR] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var result = get_value(sim_p.states[s_expr[2]]) | get_value(sim_p.states[s_expr[3]]);
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var result = get_value(sim_p.states[s_expr[2]]) | get_value(sim_p.states[s_expr[3]]);
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU OR with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (OR). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.XOR] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var result = get_value(sim_p.states[s_expr[2]]) ^ get_value(sim_p.states[s_expr[3]]);
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var result = get_value(sim_p.states[s_expr[2]]) ^ get_value(sim_p.states[s_expr[3]]);
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU XOR with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (XOR). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.NOT] = {
        nparameters: 3, types: ["E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var result = ~(get_value(sim_p.states[s_expr[2]]));
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var result = ~(get_value(sim_p.states[s_expr[2]]));
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU NOT with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (NOT). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.ADD] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a + b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            if (DEBUG) console.log("ALU ADD ", a, "+", b, "=", result);

            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a + b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU ADD with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (ADD). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.SUB] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a - b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a - b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU SUB with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (SUB). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.ADDU] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a + b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a + b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU ADDU with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (ADDU). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.LUI] = {
        nparameters: 3, types: ["E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var result = (get_value(sim_p.states[s_expr[2]])) << 16;
            set_value(sim_p.states[s_expr[1]], result);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var result = (get_value(sim_p.states[s_expr[2]])) << 16;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU Load Upper Immediate with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (LUI). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.MUL] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a * b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = a * b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU MUL with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (MUL). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.DIV] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = (b != 0) ? Math.floor(a / b) : 0;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = (b != 0) ? Math.floor(a / b) : 0;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU DIV with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (DIV). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.MOD] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = (b != 0) ? a % b : 0;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var a = get_value(sim_p.states[s_expr[2]]) << 0;
            var b = get_value(sim_p.states[s_expr[3]]) << 0;
            var result = (b != 0) ? a % b : 0;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU MOD with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (MOD). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.SUBU] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a - b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a - b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU SUBU with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (SUBU). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.MULU] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a * b;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = a * b;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU MULU with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (MULU). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.DIVU] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = (b != 0) ? Math.floor(a / b) : 0;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var a = get_value(sim_p.states[s_expr[2]]) >>> 0;
            var b = get_value(sim_p.states[s_expr[3]]) >>> 0;
            var result = (b != 0) ? Math.floor(a / b) : 0;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU DIVU with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (DIVU). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.SRL] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) >>> shifts;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) >>> shifts;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU Shift Right Logical with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (SRL). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.SRA] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) >> shifts;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) >> shifts;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU Shift Right Arithmetic with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (SRA). ";
        }
    };
    sim_p.behaviors[BEHAVIORS.SL] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) << shifts;
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) << shifts;
            var verbose = get_cfg('verbal_verbose');
            if (verbose !== 'math')
                return "ALU Shift Left with result " + show_value(result) + ". ";
            return "ALU output = " + show_value(result) + " (SL). ";
        }
    };

    /* READ INSTRUCTION MEMORY */
    sim_p.behaviors[BEHAVIORS.RR] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) >>> shifts;
            var carry = (get_value(sim_p.states[s_expr[2]])) >> (shifts - 1) & 1;
            result = result | (carry << (32 - shifts));
            set_value(sim_p.states[s_expr[1]], result >>> 0);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
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
    sim_p.behaviors[BEHAVIORS.RL] = {
        nparameters: 4, types: ["E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var shifts = get_value(sim_p.states[s_expr[3]]);
            var result = (get_value(sim_p.states[s_expr[2]])) << shifts;
            var carry = (get_value(sim_p.states[s_expr[2]])) >>> (32 - shifts);
            result = (result | carry) >>> 0;
            set_value(sim_p.states[s_expr[1]], result);
            sim_p.internal_states.alu_flags.flag_n = (result < 0) ? 1 : 0;
            sim_p.internal_states.alu_flags.flag_z = (result == 0) ? 1 : 0;
        },
        verbal: function (s_expr: string[]): string {
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
    sim_p.behaviors[BEHAVIORS.READ_IM] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var address = get_value(sim_p.states[STATES.REG_PC]);
            var clk = get_value(sim_p.states[STATES.CLK]);
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
            set_value(sim_p.states[STATES.RDATA], ins);
        },
        verbal: function (s_expr: string[]): string {
            var verbal = "";
            var address = get_value(sim_p.states[STATES.REG_PC]);
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

    function fire(key: string): void {
        if (DEBUG) console.log("FIRE", key, "fire_once", sim_p.internal_states.fire_once[key]);
        const signal = sim_p.signals[key];
        if (typeof signal == "undefined") { if (DEBUG) console.log("return not a signal"); return; }
        if (sim_p.internal_states.fire_once[key]) { if (DEBUG) console.log("return already fire"); return; }
        sim_p.internal_states.fire_once[key] = true;
        const deps = signal.depends_on;
        if (deps) {
            for (const d of deps) {
                // L:  only L
                // E: L and E
                const signal_dep_type = sim_p.signals[d]?.type;
                if (signal.type === signal_dep_type || signal_dep_type === 'E') {
                    fire(d);
                }
            }
        }
        update_state(key);
    }

    sim_p.behaviors[BEHAVIORS.FIRE] = {
        nparameters: 2, types: ["S"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            fire(s_expr[1]);
        },
        verbal: function (s_expr: string[]): string { return ""; }
    };

    sim_p.behaviors[BEHAVIORS.FIRE_IFSET] = {
        nparameters: 3, types: ["S", "I"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            if (get_value(sim_p.signals[s_expr[1]]) != parseInt(s_expr[2])) return;
            fire(s_expr[1]);
        },
        verbal: function (s_expr: string[]): string { return ""; }
    };

    sim_p.behaviors[BEHAVIORS.DECO_IMM] = {
        nparameters: 7, types: ["I", "S", "S", "S", "S", "S"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            const dest_state = s_expr[1];
            const ins_src = s_expr[2];
            const offset_sig = s_expr[3];
            const size_sig = s_expr[4];
            const se_imm_sig = s_expr[5];
            const x2_imm_sig = s_expr[6];
            let ins = get_value(sim_p.states[ins_src]);
            let oi = decode_instruction(sim_p.internal_states.FIRMWARE,
                sim_p.ctrl_states.ir, ins);
            if (null == oi.oinstruction) return;

            let imm_bits: any[] = [];
            for (let i = 0; i < oi.oinstruction.fields.length; i++) {
                if (oi.oinstruction.fields[i].type == "inm" ||
                    oi.oinstruction.fields[i].type == "imm" ||
                    oi.oinstruction.fields[i].type == "address") {
                    imm_bits = (oi.oinstruction.fields[i].bits !== undefined)
                        ? oi.oinstruction.fields[i].bits
                        : [[oi.oinstruction.fields[i].startbit, oi.oinstruction.fields[i].stopbit]];
                }
            }
            if (imm_bits.length > 0) {
                let offset_v = get_value(sim_p.signals[offset_sig]);
                let size_v = get_value(sim_p.signals[size_sig]);
                let se_imm = get_value(sim_p.signals[se_imm_sig]);
                let x2_imm = get_value(sim_p.signals[x2_imm_sig]);
                let imm_value = 0;
                for (let j = imm_bits.length - 1; j >= 0; j--) {
                    let bs = parseInt(imm_bits[j][0]);
                    let bp = parseInt(imm_bits[j][1]);
                    let field_len = bs - bp + 1;
                    let field_mask = field_len >= 32 ? -1 : (1 << field_len) - 1;
                    let field = (ins >> bp) & field_mask;
                    imm_value = (imm_value << field_len) | field;
                }
                if (size_v > 0) {
                    let size_mask = size_v >= 32 ? -1 : (1 << size_v) - 1;
                    imm_value = imm_value & size_mask;
                }
                let imm_bits_len = size_v > 0 ? size_v : 32;
                if (se_imm === 1 && imm_bits_len < 32 && ((imm_value >> (imm_bits_len - 1)) & 1)) {
                    imm_value = imm_value | ~((1 << imm_bits_len) - 1);
                }
                imm_value = imm_value << offset_v;
                if (x2_imm === 1) imm_value = 2 * imm_value;
                set_value(sim_p.states[dest_state], imm_value);
            }
        },
        verbal: function (s_expr: string[]): string { return "Generate immediate value"; }
    };

    /* UPDATE_NZ */
    sim_p.behaviors[BEHAVIORS.UPDATE_NZ] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            set_value(simhw_sim_state("FLAG_N"), sim_p.internal_states.alu_flags.flag_n);
            set_value(simhw_sim_state("FLAG_Z"), sim_p.internal_states.alu_flags.flag_z);
            set_value(simhw_sim_signal("TEST_N"), sim_p.internal_states.alu_flags.flag_n);
            set_value(simhw_sim_signal("TEST_Z"), sim_p.internal_states.alu_flags.flag_z);
            update_draw(sim_p.signals[SIGNALS.TEST_N], sim_p.signals[SIGNALS.TEST_N].value);
            update_draw(sim_p.signals[SIGNALS.TEST_Z], sim_p.signals[SIGNALS.TEST_Z].value);
        },
        verbal: function (s_expr: string[]): string {
            return "Update flags N (" + sim_p.internal_states.alu_flags.flag_n
                + ") and Z (" + sim_p.internal_states.alu_flags.flag_z + ").";
        }
    };

    /* CPU_RESET */
    sim_p.behaviors[BEHAVIORS.CPU_RESET] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            for (var key in sim_p.states) reset_value(sim_p.states[key]);
            for (var key in sim_p.signals) reset_value(sim_p.signals[key]);
            sim_p.internal_states.halt = 0;
            sim_p.internal_states.pipe_next_pc = undefined;
            // Set resets to 1 so that on cycle 0 all are zeroed
            set_value(sim_p.signals[SIGNALS.IF_ID_RST], 1);
            set_value(sim_p.signals[SIGNALS.ID_EX_RST], 1);
            set_value(sim_p.signals[SIGNALS.EX_MEM_RST], 1);
            set_value(sim_p.signals[SIGNALS.MEM_WB_RST], 1);
        },
        verbal: function (s_expr: string[]): string { return "Reset CPU. "; }
    };

    /* Pipeline custom behaviors */
    sim_p.behaviors[BEHAVIORS.PIPE_IF] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var pc_val = get_value(sim_p.states[STATES.IF_FETCH_PC]);
            var next_pc = 0;
            var ins_val = 0;
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
            if (in_bounds) {
                var address = pc_val & 0xFFFFFFFC;
                ins_val = main_memory_getvalue(sim_p.internal_states.MP, address) || 0;
                show_main_memory(sim_p.internal_states.MP, address, false, false);
                next_pc = pc_val + 4;
                set_value(sim_p.states[STATES.REG_PC], pc_val);
                if (next_pc >= code_end_s) {
                    next_pc = 0;
                }
            }
            set_value(sim_p.states[STATES.RDATA], ins_val);
            sim_p.internal_states.pipe_next_pc = next_pc >>> 0;
            // Termination: when next fetch address is 0,
            // tell PCWRITE to write 0 instead of +4 in next cycle.
            // Do NOT zero IF_FETCH_PC here: PCWRITE=2 will do it in Phase 1
            // of the next cycle, after IF_ID_RST has captured IF_FETCH_PC
            // (IF_ID_RST fires before PCWRITE).
            if (next_pc === 0) {
                set_value(sim_p.signals[SIGNALS.PCWRITE], 2);
            }
        },
        verbal: function (s_expr: string[]): string { return "Fetch instruction at PC. "; }
    };

    sim_p.behaviors[BEHAVIORS.PIPE_DECO] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            let ins = get_value(sim_p.states[STATES.IF_ID_IR]);

            set_value(sim_p.states[STATES.DECODE_RS1_ADDR], 0);
            set_value(sim_p.states[STATES.DECODE_RS2_ADDR], 0);
            set_value(sim_p.states[STATES.DECODE_RD_ADDR], 0);
            set_value(sim_p.states[STATES.R_DATA1], 0);
            set_value(sim_p.states[STATES.R_DATA2], 0);
            set_value(sim_p.states[STATES.VAL_IMM], 0);
            set_value(sim_p.states[STATES.DECODE_ALUOP], 0);
            set_value(sim_p.states[STATES.DECODE_M3], 0);
            set_value(sim_p.states[STATES.DECODE_WB], 0);

            let oi = decode_instruction(sim_p.internal_states.FIRMWARE,
                sim_p.ctrl_states.ir, ins);
            if (null == oi.oinstruction) return;
            // Extract register addresses from reg() fields
            for (let i = 0; i < oi.oinstruction.fields.length; i++) {
                let field = oi.oinstruction.fields[i];
                if (field.type == "reg") {
                    let bs = (field.bits !== undefined)
                        ? field.bits : [[field.startbit, field.stopbit]];
                    let startbit = parseInt(bs[0][0]);
                    let stopbit = parseInt(bs[0][1]);
                    let size = startbit - stopbit + 1;
                    let reg_num = (ins >>> stopbit) & ((1 << size) - 1);

                    if (stopbit == 15) {
                        set_value(sim_p.states[STATES.DECODE_RS1_ADDR], reg_num);
                    } else if (stopbit == 20) {
                        set_value(sim_p.states[STATES.DECODE_RS2_ADDR], reg_num);
                    } else if (stopbit == 7) {
                        set_value(sim_p.states[STATES.DECODE_RD_ADDR], reg_num);
                    }
                }
            }

            // Read register file
            let reg_rs1 = get_value(sim_p.states[STATES.DECODE_RS1_ADDR]);
            let reg_rs2 = get_value(sim_p.states[STATES.DECODE_RS2_ADDR]);
            if (typeof sim_p.states.BR[reg_rs1] !== "undefined")
                set_value(sim_p.states[STATES.R_DATA1], get_value(sim_p.states.BR[reg_rs1]) >>> 0);
            if (typeof sim_p.states.BR[reg_rs2] !== "undefined")
                set_value(sim_p.states[STATES.R_DATA2], get_value(sim_p.states.BR[reg_rs2]) >>> 0);

            // Get first microinstruction and set control signals
            let rd_addr = get_value(sim_p.states[STATES.DECODE_RD_ADDR]);
            if (oi.oinstruction.microcode && oi.oinstruction.microcode.length > 0) {
                let micro = oi.oinstruction.microcode[0];
                for (let key in micro) {
                    if (typeof sim_p.signals[key] !== "undefined") {
                        set_value(sim_p.signals[key], micro[key]);
                    }
                }

                let aluop_val = (typeof micro['ALUOP'] !== "undefined") ? micro['ALUOP'] :
                    (typeof micro['AluOp'] !== "undefined") ? micro['AluOp'] : 0;
                if (typeof aluop_val !== "number") aluop_val = parseInt(aluop_val);
                set_value(sim_p.states[STATES.DECODE_ALUOP], aluop_val);

                let m3_val = (typeof micro['M3'] !== "undefined") ? micro['M3'] : 0;
                if (typeof m3_val !== "number") m3_val = parseInt(m3_val);
                set_value(sim_p.states[STATES.DECODE_M3], m3_val);

                let rw_val = (typeof micro['RW'] !== "undefined") ? micro['RW'] : 0;
                if (typeof rw_val !== "number") rw_val = parseInt(rw_val);
                set_value(sim_p.states[STATES.DECODE_WB], (rw_val && rd_addr != 0) ? 1 : 0);

                let dmr_val = (typeof micro['DMR'] !== "undefined") ? micro['DMR'] : 0;
                if (typeof dmr_val !== "number") dmr_val = parseInt(dmr_val);
                set_value(sim_p.states[STATES.DECODE_DMR], dmr_val);

                let dmw_val = (typeof micro['DMW'] !== "undefined") ? micro['DMW'] : 0;
                if (typeof dmw_val !== "number") dmw_val = parseInt(dmw_val);
                set_value(sim_p.states[STATES.DECODE_DMW], dmw_val);

                let wbe_val = (typeof micro['WBE'] !== "undefined") ? micro['WBE'] : 0;
                if (typeof wbe_val !== "number") wbe_val = parseInt(wbe_val);
                set_value(sim_p.states[STATES.DECODE_WBE], wbe_val);

                let se_val = (typeof micro['SE'] !== "undefined") ? micro['SE'] : 0;
                if (typeof se_val !== "number") se_val = parseInt(se_val);
                set_value(sim_p.states[STATES.DECODE_SE], se_val);
            }

            sim_p.behaviors[BEHAVIORS.DECO_IMM].operation(
                [BEHAVIORS.DECO_IMM, STATES.VAL_IMM, STATES.IF_ID_IR, SIGNALS.OFFSET, SIGNALS.SIZE, SIGNALS.SE_IMM, SIGNALS.X2_IMM]);

            let decins = get_deco_from_pc(get_value(sim_p.states[STATES.IF_ID_PC]));
            set_value(sim_p.states[STATES.REG_IR_DECO], decins);
            show_dbg_ir(decins);
        },
        verbal: function (s_expr: string[]): string { return "Decode instruction using microcode. "; }
    };

    sim_p.behaviors[BEHAVIORS.HAZARD_DETECTION_UNIT] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            let id_ex_rs1a = get_value(sim_p.states[STATES.ID_EX_RS1_ADDR]);
            let id_ex_rs2a = get_value(sim_p.states[STATES.ID_EX_RS2_ADDR]);
            let id_ex_dmr = get_value(sim_p.states[STATES.ID_EX_DMR]);
            let id_ex_rd = get_value(sim_p.states[STATES.ID_EX_RD]);
            let ex_mem_dmr = get_value(sim_p.states[STATES.EX_MEM_DMR]);
            let ex_mem_rd = get_value(sim_p.states[STATES.EX_MEM_RD]);
            let decode_rs1 = get_value(sim_p.states[STATES.DECODE_RS1_ADDR]);
            let decode_rs2 = get_value(sim_p.states[STATES.DECODE_RS2_ADDR]);
            let stall = 0;
            // Check 1: load in EX (ID_EX_DMR), dependent in ID (DECODE matches)
            if (id_ex_dmr && id_ex_rd != 0) {
                if (id_ex_rd == decode_rs1 || id_ex_rd == decode_rs2) {
                    stall = 1;
                }
            }
            // Check 2: load in MEM (EX_MEM_DMR), dependent in EX (ID_EX matches)
            if (!stall && ex_mem_dmr && ex_mem_rd != 0) {
                if (ex_mem_rd == id_ex_rs1a || ex_mem_rd == id_ex_rs2a) {
                    stall = 1;
                }
            }
            set_value(sim_p.states[STATES.PIPE_STALL], stall);
            set_value(sim_p.signals[SIGNALS.PIPE_HAZARD], stall);
            if (stall) {
                // Not update PC because bubble
                set_value(sim_p.signals[SIGNALS.PCWRITE], 0);
                // IF_ID do nothing
                set_value(sim_p.signals[SIGNALS.IF_ID_RST], 2);
                // ID_EX reset values to make bubble
                set_value(sim_p.signals[SIGNALS.ID_EX_RST], 1);
            }
            if (DEBUG) console.log("HAZARD stall", stall);
        },
        verbal: function (s_expr: string[]): string { return "Detect load-use hazards."; }
    };

    sim_p.behaviors[BEHAVIORS.FORWARDING_UNIT] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var id_ex_rs1a = get_value(sim_p.states[STATES.ID_EX_RS1_ADDR]);
            var id_ex_rs2a = get_value(sim_p.states[STATES.ID_EX_RS2_ADDR]);
            var ex_mem_rd = get_value(sim_p.states[STATES.EX_MEM_RD]);
            var ex_mem_wb = get_value(sim_p.states[STATES.EX_MEM_WB]);
            var mem_wb_rd = get_value(sim_p.states[STATES.MEM_WB_RD]);
            var mem_wb_wb = get_value(sim_p.states[STATES.MEM_WB_WB]);
            var m1 = 0;
            var m2 = 0;
            if (mem_wb_wb && mem_wb_rd != 0 && mem_wb_rd == id_ex_rs1a) {
                m1 = 1;
            }
            if (mem_wb_wb && mem_wb_rd != 0 && mem_wb_rd == id_ex_rs2a) {
                m2 = 1;
            }
            if (ex_mem_wb && ex_mem_rd != 0 && ex_mem_rd == id_ex_rs1a) {
                m1 = 2;
            }
            if (ex_mem_wb && ex_mem_rd != 0 && ex_mem_rd == id_ex_rs2a) {
                m2 = 2;
            }
            set_value(sim_p.signals[SIGNALS.M1], m1);
            set_value(sim_p.signals[SIGNALS.M2], m2);
            var forwarding = [
                m1 == 2 ? '1' : '0',
                m1 == 1 ? '1' : '0',
                m2 == 2 ? '1' : '0',
                m2 == 1 ? '1' : '0'
            ];
            set_value(sim_p.signals[SIGNALS.FORWARDING_UNIT], parseInt(forwarding.join(''), 2));
            if (DEBUG) console.log("id_ex_rs1a", id_ex_rs1a);
            if (DEBUG) console.log("id_ex_rs2a", id_ex_rs2a);
            if (DEBUG) console.log("ex_mem_rd", ex_mem_rd);
            if (DEBUG) console.log("ex_mem_wb", ex_mem_wb);
            if (DEBUG) console.log("mem_wb_rd", mem_wb_rd);
            if (DEBUG) console.log("mem_wb_wb", mem_wb_wb);
            if (DEBUG) console.log("forwarding", forwarding);
        },
        verbal: function (s_expr: string[]): string { return "Compute forwarding for M1 and M2."; }
    };

    sim_p.behaviors[BEHAVIORS.PIPE_WB_WRITE] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var wb = get_value(sim_p.states[STATES.MEM_WB_WB]);
            var rd = get_value(sim_p.states[STATES.MEM_WB_RD]);
            if (wb && rd != 0) {
                var data = get_value(sim_p.states[STATES.MEM_WB_DATA]) << 0;
                set_value(sim_p.states.BR[rd], data >>> 0);
                if (DEBUG) console.log("Save value", data, "in reg", rd);
            }
        },
        verbal: function (s_expr: string[]): string { return "Write back to register file. "; }
    };

    sim_p.behaviors[BEHAVIORS.PIPE_DISPLAY] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var if_pc = get_value(sim_p.states[STATES.IF_FETCH_PC]);
            var if_id_pc = get_value(sim_p.states[STATES.IF_ID_PC]);
            var id_ex_pc = get_value(sim_p.states[STATES.ID_EX_PC]);
            var ex_mem_pc = get_value(sim_p.states[STATES.EX_MEM_PC]);
            var mem_wb_pc = get_value(sim_p.states[STATES.MEM_WB_PC]);
            show_pipeline_display(if_pc, if_id_pc, id_ex_pc, ex_mem_pc, mem_wb_pc);
            // When all pipeline stage PCs are zero, the program has finished
            if (if_pc === 0 && if_id_pc === 0 && id_ex_pc === 0 &&
                ex_mem_pc === 0 && mem_wb_pc === 0) {
                if (get_value(sim_p.states[STATES.REG_PC]) !== 0) {
                    set_value(sim_p.states[STATES.REG_PC], 0);
                }
                if (!sim_p.internal_states.halt) {
                    sim_p.internal_states.halt = 1;
                }
            }
            show_asmdbg_pc();
            set_value(sim_p.states[STATES.FLAG_N], sim_p.internal_states.alu_flags.flag_n);
            set_value(sim_p.states[STATES.FLAG_Z], sim_p.internal_states.alu_flags.flag_z);
            set_value(simhw_sim_signal("TEST_N"), sim_p.internal_states.alu_flags.flag_n);
            set_value(simhw_sim_signal("TEST_Z"), sim_p.internal_states.alu_flags.flag_z);
            update_draw(sim_p.signals[SIGNALS.TEST_N], sim_p.signals[SIGNALS.TEST_N].value);
            update_draw(sim_p.signals[SIGNALS.TEST_Z], sim_p.signals[SIGNALS.TEST_Z].value);
        },
        verbal: function (s_expr: string[]): string { return "Update pipeline display. "; }
    };

    /* PIPE_WB_LOAD: overwrite MEM_WB_DATA with RDATAM for loads */
    sim_p.behaviors[BEHAVIORS.PIPE_WB_LOAD] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var is_load = get_value(sim_p.states[STATES.MEM_WB_LOAD]);
            if (is_load) {
                var rd_data = get_value(sim_p.states[STATES.RDATAM]) << 0;
                set_value(sim_p.states[STATES.MEM_WB_DATA], rd_data >>> 0);
                if (DEBUG) console.log("LOAD WB: forward RDATAM to MEM_WB_DATA", rd_data);
            }
        },
        verbal: function (s_expr: string[]): string { return "Forward load data to WB stage."; }
    };

    /* PIPE_MEM_STAGE_OP: handle MEM stage memory operations (DMR/DMW) */
    sim_p.behaviors[BEHAVIORS.PIPE_MEM_STAGE_OP] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var dmr = get_value(sim_p.states[STATES.EX_MEM_DMR]);
            var dmw = get_value(sim_p.states[STATES.EX_MEM_DMW]);
            var wbe = get_value(sim_p.states[STATES.EX_MEM_WBE]);
            if (dmr) {
                sim_p.behaviors[BEHAVIORS.MEM_READ].operation(
                    [BEHAVIORS.MEM_READ, STATES.EX_MEM_ALUOUT, STATES.RDATAM, STATES.EX_MEM_WBE, STATES.CLK]);
                if (wbe == 1 || wbe == 2) {
                    var rd_data = get_value(sim_p.states[STATES.RDATAM]) >>> 0;
                    var addr = get_value(sim_p.states[STATES.EX_MEM_ALUOUT]) >>> 0;
                    var se = get_value(sim_p.states[STATES.EX_MEM_SE]);
                    if (wbe == 1) {
                        var byte_offset = addr & 3;
                        rd_data = (rd_data >>> (byte_offset * 8)) & 0xFF;
                        if (se && (rd_data & 0x80)) rd_data = rd_data | 0xFFFFFF00;
                    } else {
                        var half_offset = (addr >>> 1) & 1;
                        rd_data = (rd_data >>> (half_offset * 16)) & 0xFFFF;
                        if (se && (rd_data & 0x8000)) rd_data = rd_data | 0xFFFF0000;
                    }
                    set_value(sim_p.states[STATES.RDATAM], rd_data >>> 0);
                }
                set_value(sim_p.signals[SIGNALS.DMR], 1);
                update_draw(sim_p.signals[SIGNALS.DMR], 1);
                if (DEBUG) console.log("MEM: DMR at addr", get_value(sim_p.states[STATES.EX_MEM_ALUOUT]));
            }
            if (dmw) {
                sim_p.behaviors[BEHAVIORS.MEM_WRITE].operation(
                    [BEHAVIORS.MEM_WRITE, STATES.EX_MEM_ALUOUT, STATES.EX_MEM_WDATA, STATES.EX_MEM_WBE, STATES.CLK]);
                set_value(sim_p.signals[SIGNALS.DMW], 1);
                update_draw(sim_p.signals[SIGNALS.DMW], 1);
                if (DEBUG) console.log("MEM: DMW at addr", get_value(sim_p.states[STATES.EX_MEM_ALUOUT]));
            }
        },
        verbal: function (s_expr: string[]): string { return "Execute MEM stage load/store operations."; }
    };

    /* CLOCK - Pipeline execution */
    sim_p.behaviors[BEHAVIORS.CLOCK] = {
        nparameters: 1,
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(s_expr);
            var t0 = performance.now();

            // Update clock counter
            var clk = get_value(sim_p.states[STATES.CLK]);
            set_value(sim_p.states[STATES.CLK], clk + 1);
            set_value(sim_p.states[STATES.TTCPU], 0);

            if (DEBUG) console.log("--------------------BEGIN CLK", clk, "--------------------");

            if (sim_p.internal_states.halt) return;

            // Sync IF_FETCH_PC with initial PC on first cycle (val == 0);
            // prevent PCWRITE from advancing on cycle 0 so PIPE_IF
            // reads the correct first instruction address.
            // This must NOT fire after termination (val > 0) or it would
            // re-load the last valid address and prevent pipeline drain.
            var if_fetch_pc = get_value(sim_p.states[STATES.IF_FETCH_PC]);
            if (if_fetch_pc === 0 && clk === 0) {
                var reg_pc = get_value(sim_p.states[STATES.REG_PC]);
                if (reg_pc !== 0) {
                    set_value(sim_p.states[STATES.IF_FETCH_PC], reg_pc);
                    set_value(sim_p.signals[SIGNALS.PCWRITE], 0);
                }
            }

            // ====================================================================
            // PHASE 1 - E phase: fire Edge signals (pipeline register capture)
            // PCWRITE + ADDER_PC handle IF_FETCH_PC advancement.
            // IF_ID_RST captures old IF_FETCH_PC before PCWRITE modifies it.
            // ====================================================================
            for (const key of jit_fire_order) {
                if (sim_p.signals[key].type == 'E') {
                    fire(key);
                }
            }

            // ====================================================================
            // PHASE 2 - Microcode update (sets signal values for L phase)
            // ====================================================================
            // Reset fire_once for this cycle
            sim_p.internal_states.fire_once = [];

            // Update signals from microinstruction
            for (var key in sim_p.signals) {
                set_value(sim_p.signals[key], sim_p.signals[key].default_value);
            }

            // ====================================================================
            // PHASE 3 - L phase: fire Level signals (combinational pipeline logic)
            // Computes values that will be captured by the next cycle's E phase
            // ====================================================================
            for (const key of jit_fire_order) {
                if (sim_p.signals[key].type == 'L') {
                    fire(key);
                }
            }

            // ====================================================================
            // PHASE 4 - Pipeline display and cleanup
            // ====================================================================
            compute_behavior("PIPE_DISPLAY");
            // compute_behavior("DECO");

            // Register 0 must always be zero
            sim_p.states.BR[0].value = 0;

            var t1 = performance.now();
            var val2 = get_value(sim_p.states[STATES.ACC_TIME]);
            val2 = val2 + (t1 - t0);
            set_value(sim_p.states[STATES.ACC_TIME], val2);
            if (DEBUG) console.log("--------------------END CLK", clk, "--------------------");


            if (typeof wepsim_svg_is_drawing === 'function' && wepsim_svg_is_drawing()) {
                refresh();
            }
        },
        verbal: function (s_expr: string[]): string { return ""; }
    };

    // Helper: highlight pipeline stages in the assembly debugger
    function show_pipeline_display(if_pc: number, id_pc: number, ex_pc: number, mem_pc: number, wb_pc: number): void {
        if (typeof $ === "undefined") return;
        // Show the stage column (hidden by default for non-pipeline CPUs)
        $(".asm_stage").removeClass("d-none");
        var stage_pcs = [if_pc, id_pc, ex_pc, mem_pc, wb_pc];
        var stage_cls = ["bg-pipeline-if", "bg-pipeline-id", "bg-pipeline-ex",
            "bg-pipeline-mem", "bg-pipeline-wb"];
        var stage_names = ["IF", "ID", "EX", "MEM", "WB"];
        var svg_ids = ["textIF", "textID", "textEX", "textMEM", "textWB"];
        // Remove all pipeline highlights first
        var clsList = stage_cls.join(' ');
        $("[id^='asmdbg'] td").removeClass(clsList);
        // Clear all stage labels
        $("[id^='asmdbg'] td.asm_stage").text("");
        // Add highlights and stage labels for each active stage
        for (var i = 0; i < stage_pcs.length; i++) {
            var pc = stage_pcs[i];
            if (pc === 0) continue;
            $("td", "#asmdbg0x" + pc.toString(16)).addClass(stage_cls[i]);
            $("td.asm_stage", "#asmdbg0x" + pc.toString(16)).text(stage_names[i]);
        }
        // Update SVG text elements with decoded instruction at each pipeline stage
        var svg_o = document.getElementById('svg_p') as HTMLIFrameElement | null;
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
            "a": { ref: "M1_ALU" },
            "b": { ref: "M3_ALU" },
            "alu": { ref: "ALU_OUT" },
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
            "ir[19:15]": { ref: "REG_RS1" },
            "ir[24:20]": { ref: "REG_RS2" },
            "ir[11:7]": { ref: "REG_RD" },
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
