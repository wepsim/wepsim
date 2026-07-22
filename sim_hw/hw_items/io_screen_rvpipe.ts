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
 *  SCREEN (rvpipe style)
 */

const IO_SCR_DDR_ID = 0x1000;
const IO_SCR_DSR_ID = 0x1004;

function io_screen_rvpipe_register(sim_p: Simulator): Simulator
{
    const DEBUG = false;
    sim_p.components["SCREEN"] = {
        name: "SCREEN",
        version: "1",
        abilities: ["SCREEN"],

        details_name: ["SCREEN"],
        details_fire: [["svg_p:text3845"]],

        write_state: function (vec: any): any {
            if (typeof vec["SCREEN"] == "undefined") {
                vec["SCREEN"] = {};
            }
            var sim_screen = sim_p.internal_states.screen_content;
            var sim_lines = sim_screen.trim().split("\n");
            for (var i = 0; i < sim_lines.length; i++) {
                var value = sim_lines[i];
                if (value != "") {
                    vec["SCREEN"][i] = {
                        "type": "screen",
                        "default_value": "",
                        "id": i,
                        "op": "==",
                        "value": value
                    };
                }
            }
            return vec;
        },
        read_state: function (vec: any, check: any): boolean {
            if (typeof vec["SCREEN"] == "undefined") {
                vec["SCREEN"] = {};
            }
            if ("SCREEN" == check.type.toUpperCase().trim()) {
                vec["SCREEN"][check.id] = {
                    "type": "screen",
                    "default_value": "",
                    "id": check.id,
                    "op": check.condition,
                    "value": check.value
                };
                return true;
            }
            return false;
        },
        get_state: function (line: string): string | null {
            var sim_screen = sim_p.internal_states.screen_content;
            var sim_lines = sim_screen.trim().split("\n");
            var index = parseInt(line);
            if (typeof sim_lines[index] != "undefined")
                return sim_lines[index];
            return null;
        },

        get_value: function (elto: any): string {
            return sim_p.internal_states.screen_content;
        },
        set_value: function (elto: any, value: string): string {
            sim_p.internal_states.screen_content = value;
            return value;
        }
    };

    /* States - IO parameters */
    sim_p.internal_states.io_hash[IO_SCR_DDR_ID] = "DDR";
    sim_p.internal_states.io_hash[IO_SCR_DSR_ID] = "DSR";

    /* Internal States */
    sim_p.internal_states.screen_content = "";

    /* States */
    sim_p.states["DDR"] = {
        name: "DDR", verbal: "Display Data Register",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };
    sim_p.states["DSR"] = {
        name: "DSR", verbal: "Display State Register",
        visible: false, nbits: "32", value: 0, default_value: 0,
        draw_data: []
    };

    /* Behaviors */
    sim_p.behaviors["SCR_IOR"] = {
        nparameters: 6,
        types: ["E", "E", "E", "E", "E"],
        operation: function (s_expr: string[]): void {
            var bus_ab = get_value(sim_p.states[s_expr[1]]);
            var ddr = get_value(sim_p.states[s_expr[3]]);
            var dsr = get_value(sim_p.states[s_expr[4]]);
            if (DEBUG) console.log("[SCR_IOR] bus_ab=" + bus_ab + " ddr=" + ddr + " dsr=" + dsr);
            if (bus_ab == IO_SCR_DDR_ID)
                set_value(sim_p.states[s_expr[2]], ddr);
            if (bus_ab == IO_SCR_DSR_ID)
                set_value(sim_p.states[s_expr[2]], dsr);
        },
        verbal: function (s_expr: string[]): string {
            var bus_ab = get_value(sim_p.states[s_expr[1]]);
            var ddr = get_value(sim_p.states[s_expr[3]]);
            var dsr = get_value(sim_p.states[s_expr[4]]);
            if (bus_ab == IO_SCR_DDR_ID)
                return "Try to read from the screen the DDR value " + ddr + ". ";
            if (bus_ab == IO_SCR_DSR_ID)
                return "Try to read into the screen the DSR value " + dsr + ". ";
            return "";
        }
    };

    sim_p.behaviors["SCR_IOW"] = {
        nparameters: 6,
        types: ["E", "E", "E", "E", "E"],
        operation: function (s_expr: string[]): void {
            var bus_ab = get_value(sim_p.states[s_expr[1]]);
            if (bus_ab != IO_SCR_DDR_ID) {
                if (DEBUG) console.log("[SCR_IOW] ignored: bus_ab=" + bus_ab + " (not DDR)");
                return;
            }
            var bus_db = get_value(sim_p.states[s_expr[2]]);
            var clk = get_value(sim_p.states[s_expr[5]]);
            var ch = String.fromCharCode(bus_db);

            if (ch == String.fromCharCode(0x0007)) { // '\a'
                if (DEBUG) console.log("[SCR_IOW] clk=" + clk + " char='\\a' (audible) bus_db=" + bus_db);
                if (typeof simcore_sound_playNote === "function")
                    simcore_sound_playNote("C4", "8n");
            } else {
                var screen = get_screen_content();
                if (typeof sim_p.events.screen[clk] != "undefined") {
                    screen = screen.substr(0, screen.length - 1);
                    if (DEBUG) console.log("[SCR_IOW] clk=" + clk + " overwrite, removed last char");
                }
                set_screen_content(screen + ch);
                sim_p.events.screen[clk] = bus_db;
                if (DEBUG) console.log("[SCR_IOW] clk=" + clk + " char='" + ch + "' (0x" + bus_db.toString(16) + ") screen=\"" + screen + ch + "\"");
            }

            set_value(sim_p.states[s_expr[3]], bus_db);
            set_value(sim_p.states[s_expr[4]], 1);
        },
        verbal: function (s_expr: string[]): string {
            var bus_ab = get_value(sim_p.states[s_expr[1]]);
            var bus_db = get_value(sim_p.states[s_expr[2]]);
            var clk = get_value(sim_p.states[s_expr[5]]);
            var ch = String.fromCharCode(bus_db);
            if (bus_ab == IO_SCR_DDR_ID) {
                return "Try to write into the screen the code " + ch + " at clock cycle " + clk + ". ";
            }
            return "";
        }
    };

    sim_p.behaviors["SCREEN_RESET"] = {
        nparameters: 1,
        operation: function (): void {
            if (DEBUG) console.log("[SCREEN_RESET] reset");
            sim_p.events.screen = {};
        },
        verbal: function (): string {
            return "Reset the screen content. ";
        }
    };

    /* Element */
    sim_p.elements["display"] = {
        name: "Display",
        description: "Display",
        type: "subcomponent",
        belongs: "SCREEN",
        states: {
            "addr": { ref: "BUS_AB" },
            "data": { ref: "BUS_DB" },
            "data 1": { ref: IO_SCR_DDR_ID },
            "status 1": { ref: IO_SCR_DSR_ID }
        },
        signals: {
            "ior": { ref: "SCR_IOR" },
            "iow": { ref: "SCR_IOW" }
        },
        states_inputs: ["addr", "data"],
        states_outputs: ["data"],
        signals_inputs: ["ior", "iow"],
        signals_output: [],
        states_mapping: ["data 1", "status 1"]
    };

    return sim_p;
}

