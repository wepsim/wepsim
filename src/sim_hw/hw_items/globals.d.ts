

// Simulator types

type DecodedInstruction = {
    oinstruction: {
        name:   any;
        fields: any[];
        microcode: any[];
    } | null;

    oc_code:  any;
    eoc_code: any;
};

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
// Simulator types
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
    states: Record<string, { ref: string | number }>;
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
    save_state?: (vec: any) => any;
    load_state?: (vec: any) => boolean;
    get_state?: (reg: string) => string | null;
    get_value?: (elto: any) => any;
    set_value?: (elto: any, value: any) => void;
}

interface Simulator {
    sim_name?:            string ;
    sim_short_name?:      string ;
    sim_img_processor?:   string ;
    sim_img_controlunit?: string ;
    sim_img_cpu?:         string ;
    sim_properties?:      string[] ;

    components:      Record<string, SimComponent> ;
    states:    { BR: Record<number, SimState> & { length?: number };[key: string]: SimState | Record<number, SimState> } ;
    signals:         Record<string, SimSignal> ;
    behaviors:       Record<string, SimSignalBehavior> ;
    elements:        Record<string, SimElement> ;
    ctrl_states:     Record<string, SimCtrlState> ;
    internal_states: Record<string, any> ;
    events:          Record<string, any> ;
}

