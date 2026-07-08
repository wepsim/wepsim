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
 *  CLOCK/TIMER (rvpipe style)
 *  Port of io_clk_base.js for the 5-stage pipeline CPU (rvpipe)
 */

const IO_CLK_IOSR_ID = 0x1100;
const IO_CLK_IOCR_ID = 0x1104;
const IO_CLK_IODR_ID = 0x1108;

function io_clk_rvpipe_register(sim_p: Simulator): Simulator {
    const DEBUG = false;
    sim_p.components["IO"] = {
        name: "IO",
        version: "1",
        abilities: ["IO_TIMER"],

        details_name: ["IO_STATS", "IO_CONFIG"],
        details_fire: [['svg_p:text3775'], []],

        write_state: function (vec: any): any {
            return vec;
        },
        read_state: function (vec: any, check: any): boolean {
            return false;
        },
        get_state: function (reg: string): string | null {
            return null;
        },

        get_value: function (elto: any): number {
            var associated_state = simhw_internalState_get('io_hash', elto);
            if (typeof associated_state == "undefined") {
                throw new Error("unknown element named " + elto);
            }
            var value = (get_value(simhw_sim_state(associated_state)) >>> 0);

            set_value(simhw_sim_state('BUS_AB'), elto);
            set_value(simhw_sim_signal('IOR'), 1);
            signal_apply_behaviour("IOR");
            value = get_value(simhw_sim_state('BUS_DB'));

            return value;
        },
        set_value: function (elto: any, value: number): number {
            var associated_state = simhw_internalState_get('io_hash', elto);
            if (typeof associated_state == "undefined") {
                throw new Error("unknown element named " + elto);
            }
            set_value(simhw_sim_state(associated_state), value);

            set_value(simhw_sim_state('BUS_AB'), elto);
            set_value(simhw_sim_state('BUS_DB'), value);
            set_value(simhw_sim_signal('IOW'), 1);
            signal_apply_behaviour("IOW");

            return value;
        }
    };

    /* States - IO parameters */
    sim_p.internal_states.io_hash[IO_CLK_IOSR_ID] = "IOSR";
    sim_p.internal_states.io_hash[IO_CLK_IOCR_ID] = "IOCR";
    sim_p.internal_states.io_hash[IO_CLK_IODR_ID] = "IODR";

    /* Timer factory (8 timers) */
    sim_p.internal_states.io_int_factory = [];
    for (var i = 0; i < 8; i++) {
        sim_p.internal_states.io_int_factory[i] = {
            period: { value: 0 },
            probability: { value: 0.5 },
            accumulated: { value: 0 },
            since_prev: { value: 0 },
            active: { value: false }
        };
    }

    sim_p.internal_states.io_events_clk = {};

    /* States */
    sim_p.states["IOSR"] = {
        name: "IOSR", verbal: "IO State Register",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["IOCR"] = {
        name: "IOCR", verbal: "IO Control Register",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["IODR"] = {
        name: "IODR", verbal: "IO Data Register",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* Behaviors */

    sim_p.behaviors["IO_IOR"] = {
        nparameters: 7,
        types: ["E", "E", "E", "E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(JSON.stringify(s_expr), sim_p.behaviors[s_expr[0] ?? "NOP"]?.verbal(s_expr));
            var bus_ab = get_value(sim_p.states[s_expr[1]]);
            if (bus_ab == IO_CLK_IOSR_ID) {
                var idx = get_value(sim_p.states[s_expr[4]]);
                var iosr_val = 0;
                if (idx >= 0 && idx < 8) {
                    iosr_val = get_var(sim_p.internal_states.io_int_factory[idx].accumulated);
                }
                set_value(sim_p.states[s_expr[2]], iosr_val);
            }
            if (bus_ab == IO_CLK_IOCR_ID) {
                set_value(sim_p.states[s_expr[2]], get_value(sim_p.states[s_expr[4]]));
            }
            if (bus_ab == IO_CLK_IODR_ID) {
                set_value(sim_p.states[s_expr[2]], get_value(sim_p.states[s_expr[5]]));
            }
        },
        verbal: function (s_expr: string[]): string {
            var bus_ab = get_value(sim_p.states[s_expr[1]]);
            if (bus_ab == IO_CLK_IOSR_ID) {
                return "I/O device read at IOSR. ";
            }
            if (bus_ab == IO_CLK_IOCR_ID) {
                return "I/O device read at IOCR. ";
            }
            if (bus_ab == IO_CLK_IODR_ID) {
                return "I/O device read at IODR. ";
            }
            return "";
        }
    };

    sim_p.behaviors["IO_IOW"] = {
        nparameters: 7,
        types: ["E", "E", "E", "E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(JSON.stringify(s_expr), sim_p.behaviors[s_expr[0] ?? "NOP"]?.verbal(s_expr));
            var bus_ab = get_value(sim_p.states[s_expr[1]]);
            var bus_db = get_value(sim_p.states[s_expr[2]]);

            if (bus_ab != IO_CLK_IOSR_ID &&
                bus_ab != IO_CLK_IOCR_ID &&
                bus_ab != IO_CLK_IODR_ID) {
                return;
            }

            if (bus_ab == IO_CLK_IOSR_ID)
                set_value(sim_p.states[s_expr[3]], bus_db);
            if (bus_ab == IO_CLK_IOCR_ID)
                set_value(sim_p.states[s_expr[4]], bus_db);
            if (bus_ab == IO_CLK_IODR_ID)
                set_value(sim_p.states[s_expr[5]], bus_db);

            var iocr_id = get_value(sim_p.states[s_expr[4]]);
            var iodr_id = get_value(sim_p.states[s_expr[5]]);

            if (iocr_id < 0 || iocr_id > 7)
                return;

            set_var(sim_p.internal_states.io_int_factory[iocr_id].period, iodr_id);
            set_var(sim_p.internal_states.io_int_factory[iocr_id].probability, 1);
            if (0 == iodr_id) {
                set_var(sim_p.internal_states.io_int_factory[iocr_id].probability, 0);
            }
        },
        verbal: function (s_expr: string[]): string {
            var bus_ab = get_value(sim_p.states[s_expr[1]]);
            var bus_db = get_value(sim_p.states[s_expr[2]]);
            if (bus_ab == IO_CLK_IOSR_ID)
                return "I/O device write at IOSR with value " + bus_db + ". ";
            if (bus_ab == IO_CLK_IOCR_ID)
                return "I/O device write at IOCR with value " + bus_db + ". ";
            if (bus_ab == IO_CLK_IODR_ID)
                return "I/O device write at IODR with value " + bus_db + ". ";
            return "";
        }
    };

    sim_p.behaviors["IO_CHK"] = {
        nparameters: 4,
        types: ["E", "E", "X"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(JSON.stringify(s_expr), sim_p.behaviors[s_expr[0] ?? "NOP"]?.verbal(s_expr));
            const int = sim_p.states[s_expr[1]];
            const intv = sim_p.states[s_expr[2]];
            const ref = get_reference(s_expr[3]);
            var reg_epc = get_value(ref);
            if (reg_epc !== 0) return;
            for (var i = sim_p.internal_states.io_int_factory.length - 1; i >= 0; i--) {
                if (get_var(sim_p.internal_states.io_int_factory[i].period) == 0)
                    continue;
                if (DEBUG) console.log("io_int", i, JSON.stringify(sim_p.internal_states.io_int_factory[i]));
                if (DEBUG) console.log("int", get_value(int), "intv", get_value(intv));

                const since_prev = get_var(sim_p.internal_states.io_int_factory[i].since_prev);
                set_var(sim_p.internal_states.io_int_factory[i].since_prev, since_prev + 1);
                if (get_var(sim_p.internal_states.io_int_factory[i].active)) {
                    set_value(int, 1);
                    set_value(intv, i);
                    continue;
                }
                if (since_prev >= get_var(sim_p.internal_states.io_int_factory[i].period)) {
                    if (Math.random() > get_var(sim_p.internal_states.io_int_factory[i].probability))
                        continue;

                    set_var(sim_p.internal_states.io_int_factory[i].active, true);
                    if (DEBUG) console.log("Set signal", i, "active. Set", s_expr[2], "1 and", s_expr[3], i);

                    set_value(int, 1);
                    set_value(intv, i);
                }
            }
        },
        verbal: function (s_expr: string[]): string {
            return "Check I/O Interruption.";
        }
    };

    sim_p.behaviors["INTA"] = {
        nparameters: 5,
        types: ["E", "E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(JSON.stringify(s_expr), sim_p.behaviors[s_expr[0] ?? "NOP"]?.verbal(s_expr));
            const inta = get_value(sim_p.states[s_expr[1]]);
            const int = sim_p.states[s_expr[2]];
            const intv = get_value(sim_p.states[s_expr[3]]);
            const clk = get_value(sim_p.states[s_expr[4]]);
            if (inta == 1 && intv >= 0 && intv < sim_p.internal_states.io_int_factory.length) {
                set_var(sim_p.internal_states.io_int_factory[intv].active, false);
                set_var(sim_p.internal_states.io_int_factory[intv].since_prev, 0);
                const acc = get_var(sim_p.internal_states.io_int_factory[intv].accumulated);
                set_var(sim_p.internal_states.io_int_factory[intv].accumulated, acc + 1);

                if (typeof sim_p.internal_states.io_events_clk[clk] == "undefined") {
                    sim_p.internal_states.io_events_clk[clk] = [];
                }
                sim_p.internal_states.io_events_clk[clk].push(i);
                set_value(int, 0);
                if (DEBUG) console.log("INTA int", get_value(int), "intv", get_value(intv));
            }
        },
        verbal: function (s_expr: string[]): string {
            return "Mark timer as completed.";
        }
    };

    sim_p.behaviors["IO_RESET"] = {
        nparameters: 1,
        operation: function (): void {
            if (DEBUG) console.log("IO_RESET");
            sim_p.internal_states.io_events_clk = {};

            var io_int_factory = sim_p.internal_states.io_int_factory;
            if (io_int_factory) {
                for (var i = 0; i < io_int_factory.length; i++) {
                    set_var(io_int_factory[i].since_prev, 0);
                    set_var(io_int_factory[i].accumulated, 0);
                    set_var(io_int_factory[i].active, false);
                    set_var(io_int_factory[i].probability, 0.5);
                    set_var(io_int_factory[i].period, 0);
                }
            }
        },
        verbal: function (): string {
            return "Reset the I/O device.";
        }
    };

    /* Element for UI/model */
    sim_p.elements["iO"] = {
        name: "IO",
        description: "IO Clock Timer",
        type: "subcomponent",
        belongs: "IO",
        states: {
            "addr": { ref: "BUS_AB" },
            "data": { ref: "BUS_DB" },
            "control 1": { ref: IO_CLK_IOCR_ID },
            "data 1": { ref: IO_CLK_IODR_ID },
            "status 1": { ref: IO_CLK_IOSR_ID }
        },
        signals: {
            "ior": { ref: "IO_IOR" },
            "iow": { ref: "IO_IOW" }
        },
        states_inputs: ["addr", "data"],
        states_outputs: ["data"],
        signals_inputs: ["ior", "iow"],
        signals_output: [],
        states_mapping: ["control 1", "data 1", "status 1"]
    };

    return sim_p;
}
