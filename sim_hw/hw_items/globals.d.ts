// Global declarations for functions defined in other JS files

declare function get_value(obj: any): number;
declare function set_value(obj: any, value: number): void;
declare function reset_value(obj: any): void;
declare function get_var(obj: any): number;
declare function set_var(obj: any, value: number): void;
declare function get_reference(sim_name: string): any;
declare function show_verbal(key: string): string;
declare function show_value(value: number): string;
declare function update_value(obj: any): void;
declare function value_toString(elto_v: any): string;
declare function vue_observable(initial_value: any): any;
declare function vue_rebind_state(ref_obj: any, id_elto: string, f_computed_value?: any): void;

declare function simhw_sim_state_getref(id: string): any;
declare function simhw_sim_ctrlStates_get(): any;
declare function simhw_sim_state(id: string): any;
declare function simhw_sim_signal(id: string): any;
declare function simhw_sim_signals(): Record<string, any>;
declare function simhw_sim_states(): Record<string, any>;
declare function simhw_sim_components(): Record<string, any>;
declare function simhw_sim_component(id: string): any;
declare function simhw_active(): any;
declare function simhw_short_name(): string;
declare function simhw_add(newElto: any): void;
declare function simhw_getActive(): number;
declare function simhw_setActive(newActive: number): void;
declare function simhw_getIdByName(short_name: string): number;
declare function simhw_getObjByName(short_name: string): any;
declare function simhw_internalState(name: string): any;
declare function simhw_internalState_get(name: string, id: string): any;
declare function simhw_internalState_set(name: string, id: string, val: any): void;
declare function simhw_internalState_reset(name: string, val: any): void;
declare function simhw_syntax_behaviors(): Record<string, any>;
declare function simhw_syntax_behavior(id: string): any;
declare function simhw_hwset_init(): Record<string, string>;
declare function simhw_hwset_getSet(): Record<string, string>;
declare function simhw_hwset_loadAll(): boolean;
declare function simhw_hwset_load(p_name: string): boolean;

declare function show_main_memory(memory: any, index: number, redraw: boolean, updates: boolean): void;
declare function show_asmdbg_pc(): void;
declare function show_dbg_ir(value: number): void;
declare function update_draw(obj: any, value: number): void;
declare function update_state(key: string): void;
declare function fn_updateE_now(key: string): void;
declare function fn_updateL_now(key: string): void;
declare function compute_behavior(name: string): void;
declare var jit_fire_order: string[];
declare function refresh(): void;
declare function ws_alert(msg: string): void;
declare function get_cfg(field: string): string;
declare function get_deco_from_pc(pc: number): any;

declare function main_memory_getvalue(memory: any, elto: any): number | undefined;
declare function main_memory_set(memory: any, elto: any, melto: any): any;
declare function main_memory_get_program_counter(): number | null;
declare function main_memory_fusionvalues(dbvalue: number, value: number, filter: number): number;

declare function decode_instruction(curr_firm: any, ep_ir: any, binstruction: number): { oinstruction: any };

declare function cache_memory_access(memory: any, address: number, r_w: string, clock_timestamp: number): void;

declare function wepsim_svg_is_drawing(): boolean;

declare function compute_references(): void;
declare function check_behavior(): void;
declare function compile_behaviors(): void;
declare function firedep_to_fireorder(jit_fire_dep: any): void;
declare function compile_verbals(): void;

declare function simcore_hardware_import(data: string): void;
declare function simcore_init(flag: boolean): void;
declare function simcore_init_hw(name: string): void;
declare function simcore_reset(): void;
declare function simcore_record_init(recMsg: string, recPb: string): void;
declare function simcore_record_captureInit(): void;

declare function upgrade_cfg(): void;

declare var ws_empty_firmware: any;
declare var sim_references: Record<string, any>;
declare var ws_hw_hash: Record<string, string>;
declare var ws_hw_set: any[];
declare var sim: {
    systems: any[];
    active: any;
    index: number;
    [key: string]: any;
};

interface JQuery {
    [key: string]: any;
    length: number;
    text(): string;
    text(text: string): JQuery;
    addClass(cls: string): JQuery;
    removeClass(cls: string): JQuery;
    appendTo(target: string): JQuery;
    on(events: string, handler: any): JQuery;
    css(property: string, value: any): JQuery;
    val(): any;
    val(value: any): JQuery;
    html(): string;
    html(content: string): JQuery;
    data(key: string): any;
    attr(attribute: string): string;
    attr(attribute: string, value: string): JQuery;
    [method: string]: any;
}

interface JQueryStatic {
    (selector: string): JQuery;
    (selector: string, context: any): JQuery;
    (callback: () => void): void;
    (element: Element): JQuery;
    (html: string): JQuery;
    getJSON(settings: any): any;
    [key: string]: any;
}

declare var $: JQueryStatic;

// ============================================================
// Simulator types (for sim_p parameter in register functions)
// ============================================================

interface SimState {
    name: string;
    verbal: string;
    visible: boolean;
    nbits: string;
    value: any;
    default_value: any;
    draw_data: any[];
}

interface SimSignalBehavior {
    nparameters: number;
    types?: string[];
    operation: (s_expr: string[]) => void;
    verbal: (s_expr: string[]) => string;
}

interface SimSignal {
    name: string;
    verbal?: string | string[];
    visible: boolean;
    type: string;
    value: number;
    default_value: number;
    nbits: string;
    behavior: string[];
    depends_on?: string[];
    fire_name: string[];
    draw_data: string[][];
    draw_name: string[][];
    forbidden?: boolean;
}

interface SimCtrlState {
    name: string;
    state: string;
    is_pointer: boolean;
    default_eltos?: any;
}

interface SimElement {
    name: string;
    description: string;
    type: string;
    belongs: string;
    states: Record<string, { ref: string }>;
    signals: Record<string, { ref: string }>;
    states_inputs: string[];
    states_outputs: string[];
    signals_inputs: string[];
    signals_output: string[];
    states_mapping: any[];
}

interface SimComponent {
    name: string;
    version: string;
    abilities: string[];
    details_name?: string[];
    details_fire?: string[][];
    write_state?: (vec: any) => any;
    read_state?: (vec: any, check: any) => boolean;
    get_state?: (reg: string) => string | null;
    get_value?: (elto: any) => number;
    set_value?: (elto: any, value: number) => void;
}

interface Simulator {
    sim_name?: string;
    sim_short_name?: string;
    sim_img_processor?: string;
    sim_img_controlunit?: string;
    sim_img_cpu?: string;

    components: Record<string, SimComponent>;
    states: { BR: SimState[];[key: string]: any };
    signals: Record<string, SimSignal>;
    behaviors: Record<string, SimSignalBehavior>;
    elements: Record<string, SimElement>;
    ctrl_states: Record<string, SimCtrlState>;
    internal_states: Record<string, any>;
    events: Record<string, any>;
}

// Register functions (defined in other hw_items JS files)
declare function board_base_register(sim_p: Simulator): void;
declare function cpu_ep_register(sim_p: Simulator): void;
declare function mem_ep_register(sim_p: Simulator): void;
declare function cpu_ep2_register(sim_p: Simulator): void;
declare function mem_ep2_register(sim_p: Simulator): void;
declare function cpu_rv_register(sim_p: Simulator): void;
declare function mem_rv_register(sim_p: Simulator): void;
declare function cpu_poc_register(sim_p: Simulator): void;
declare function mem_poc_register(sim_p: Simulator): void;
declare function cu_poc_register(sim_p: Simulator): void;
declare function io_clk_base_register(sim_p: Simulator): void;
declare function io_screen_base_register(sim_p: Simulator): void;
declare function io_keyboard_base_register(sim_p: Simulator): void;
declare function io_ldm_base_register(sim_p: Simulator): void;
declare function io_l3d_base_register(sim_p: Simulator): void;
declare function io_sound_base_register(sim_p: Simulator): void;
