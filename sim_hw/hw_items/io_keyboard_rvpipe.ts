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
 *  KEYBOARD (rvpipe style)
 */

const IO_KBD_KBDR_ID = 0x0100;
const IO_KBD_KBSR_ID = 0x0104;

function io_keyboard_rvpipe_register (sim_p: Simulator): Simulator
{
    const DEBUG = false;
    sim_p.components["KBD"] = {
        name: "KBD",
        version: "1",
        abilities: ["KEYBOARD"],

        details_name: ["KEYBOARD"],
        details_fire: [["svg_p:text3829"]],

        write_state: function (vec: any): any {
            return vec;
        },
        read_state: function (vec: any, check: any): boolean {
            return false;
        },
        get_state: function (reg: string): string | null {
            return null;
        },

        get_value: function (elto: any): string {
            return sim_p.internal_states.keyboard_content;
        },
        set_value: function (elto: any, value: string): string {
            sim_p.internal_states.keyboard_content = value;
            return value;
        }
    };

    /* States - IO parameters */
    sim_p.internal_states.io_hash[IO_KBD_KBDR_ID] = "KBDR";
    sim_p.internal_states.io_hash[IO_KBD_KBSR_ID] = "KBSR";

    /* Internal States */
    sim_p.internal_states.keyboard_content = "";

    /* States */
    sim_p.states["KBDR"] = {
        name: "KBDR", verbal: "Keyboard Data Register",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["KBSR"] = {
        name: "KBSR", verbal: "Keyboard Status Register",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* Behaviors */
    sim_p.behaviors["KBD_IOR"] = {
        nparameters: 6,
        types: ["E", "E", "E", "E", "E"],
        operation: function (s_expr: string[]): void {
            if (DEBUG) console.log(JSON.stringify(s_expr), sim_p.behaviors[s_expr[0] ?? "NOP"]?.verbal(s_expr));
            var bus_ab = get_value(sim_p.states[s_expr[1]]);
            var clk = get_value(sim_p.states[s_expr[5]]);

            if (DEBUG) console.log("[KBD_IOR] bus_ab=" + bus_ab + " kbdr=" + get_value(sim_p.states[s_expr[3]]) + " kbsr=" + get_value(sim_p.states[s_expr[4]]));

            if ((bus_ab != IO_KBD_KBDR_ID) && (bus_ab != IO_KBD_KBSR_ID)) {
                return;
            }


            if (typeof sim_p.events.keybd[clk] != "undefined") {
                if (DEBUG) console.log("[KBD_IOR] event keybd[" + clk + "]=" + sim_p.events.keybd[clk]);
                if (bus_ab == IO_KBD_KBDR_ID) {
                    if (DEBUG) console.log("[KBD_IOR] -> set BUS_DB from event");
                    set_value(sim_p.states[s_expr[2]], sim_p.events.keybd[clk]);
                }
                if (bus_ab == IO_KBD_KBSR_ID) {
                    if (DEBUG) console.log("[KBD_IOR] -> set BUS_DB=1 (event ready)");
                    set_value(sim_p.states[s_expr[2]], 1);
                }
                return;
            }

            if (get_value(sim_p.states[s_expr[4]]) == 0) {
                if (DEBUG) console.log("[KBD_IOR] KBSR=0, checking buffer");
                var keybuffer = get_keyboard_content();
                if (keybuffer.length !== 0) {
                    if (DEBUG) console.log("[KBD_IOR] buffer has data: '" + keybuffer[0] + "'");
                    var keybuffer_rest = keybuffer.substr(1, keybuffer.length - 1);
                    set_keyboard_content(keybuffer_rest);

                    set_value(sim_p.states[s_expr[4]], 1);
                    set_value(sim_p.states[s_expr[3]], keybuffer[0].charCodeAt(0));
                } else {
                    if (DEBUG) console.log("[KBD_IOR] buffer empty");
                }
            }
            if (get_value(sim_p.states[s_expr[4]]) == 1) {
                if (DEBUG) console.log("[KBD_IOR] KBSR=1, recording event keybd[" + clk + "]=" + get_value(sim_p.states[s_expr[3]]));
                sim_p.events.keybd[clk] = get_value(sim_p.states[s_expr[3]]);
            }

            if (bus_ab == IO_KBD_KBSR_ID) {
                if (DEBUG) console.log("[KBD_IOR] read KBSR -> " + get_value(sim_p.states[s_expr[4]]));
                set_value(sim_p.states[s_expr[2]], get_value(sim_p.states[s_expr[4]]));
            }
            if (bus_ab == IO_KBD_KBDR_ID) {
                if (DEBUG) console.log("[KBD_IOR] read KBDR -> " + get_value(sim_p.states[s_expr[3]]) + ", reset KBSR=0");
                if (get_value(sim_p.states[s_expr[4]]) == 1)
                    set_value(sim_p.states[s_expr[2]], get_value(sim_p.states[s_expr[3]]));
                set_value(sim_p.states[s_expr[4]], 0);
            }
        },
        verbal: function (s_expr: string[]): string {
            var bus_ab = get_value(sim_p.states[s_expr[1]]);
            if (bus_ab == IO_KBD_KBDR_ID)
                return "Read the keyboard data: " + get_value(sim_p.states[s_expr[2]]) + ". ";
            if (bus_ab == IO_KBD_KBSR_ID)
                return "Read the keyboard state: " + get_value(sim_p.states[s_expr[2]]) + ". ";
            return "";
        }
    };

    sim_p.behaviors["KBD_RESET"] = {
        nparameters: 1,
        operation: function (): void {
            if (DEBUG) console.log("[KBD_RESET] reset");
            sim_p.events.keybd = {};
        },
        verbal: function (): string {
            return "Reset the keyboard content. ";
        }
    };

    /* Element */
    sim_p.elements["keyboard"] = {
        name: "Keyboard",
        description: "Keyboard",
        type: "subcomponent",
        belongs: "KBD",
        states: {
            "addr": { ref: "BUS_AB" },
            "data": { ref: "BUS_DB" },
            "data 1": { ref: IO_KBD_KBDR_ID },
            "status 1": { ref: IO_KBD_KBSR_ID }
        },
        signals: {
            "ior": { ref: "KBD_IOR" }
        },
        states_inputs: ["addr", "data"],
        states_outputs: ["data"],
        signals_inputs: ["ior"],
        signals_output: [],
        states_mapping: ["data 1", "status 1"]
    };

    return sim_p;
}

