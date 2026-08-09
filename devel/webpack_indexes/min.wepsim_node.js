
import '../../src/wepsim_nodejs/wepsim_node_adapt.js';

import '../../src/sim_core/sim_cfg.js';
import '../../src/sim_core/sim_core_ga.js';
import '../../src/sim_core/sim_adt_core.js';
import '../../src/sim_core/sim_core_record.js';
import '../../src/sim_core/sim_core_ctrl.js';
import '../../src/sim_core/sim_core_ui.js';
import '../../src/sim_core/sim_api_core.js';
import '../../src/sim_core/sim_api_native.js';
import '../../src/sim_core/sim_api_stateshots.js';
import '../../src/sim_core/sim_core_voice.js';
import '../../src/sim_core/sim_core_sound.js';
import '../../src/sim_core/sim_core_rest.js';
import '../../src/sim_core/sim_core_notify.js';
import '../../src/sim_core/sim_core_values.js';
import '../../src/sim_core/sim_core_decode.js';
import '../../src/sim_core/sim_adt_ctrlmemory.js';
import '../../src/sim_core/sim_adt_mainmemory.js';
import '../../src/sim_core/sim_adt_cachememory.js';
 import '../../src/sim_hw/sim_hw_index.js';
import '../../src/sim_hw/sim_hw_values.js';
import '../../src/sim_hw/sim_hw_behavior.js';
import '../../src/sim_hw/sim_hw_signal.js';
import '../../src/sim_hw/sim_hw_eltos.js';
 import '../../src/sim_hw/hw_items/board_base.js';
import '../../src/sim_hw/hw_items/cpu_ep.js';
import '../../src/sim_hw/hw_items/mem_ep.js';
import '../../src/sim_hw/hw_items/cpu_ep2.js';
import '../../src/sim_hw/hw_items/mem_ep2.js';
import '../../src/sim_hw/hw_items/cpu_rv.js';
import '../../src/sim_hw/hw_items/mem_rv.js';
import '../../src/sim_hw/hw_items/cpu_poc.js';
import '../../src/sim_hw/hw_items/mem_poc.js';
import '../../src/sim_hw/hw_items/cu_poc.js';
import '../../src/sim_hw/hw_items/io_clk_base.js';
import '../../src/sim_hw/hw_items/io_screen_base.js';
import '../../src/sim_hw/hw_items/io_keyboard_base.js';
import '../../src/sim_hw/hw_items/io_ldm_base.js';
import '../../src/sim_hw/hw_items/io_l3d_base.js';
import '../../src/sim_hw/hw_items/io_sound_base.js';
 import '../../src/sim_hw/hw_ep.js';
import '../../src/sim_hw/hw_ep2.js';
import '../../src/sim_hw/hw_rv.js';
import '../../src/sim_hw/hw_poc.js';
 import '../../src/sim_sw/firmware/lexical.js';
import '../../src/sim_sw/firmware/firm_mcode.js';
import '../../src/sim_sw/firmware/firm_metadata.js';
import '../../src/sim_sw/firmware/firm_begin.js';
import '../../src/sim_sw/firmware/firm_pseudoinstructions.js';
import '../../src/sim_sw/firmware/firm_registers.js';
import '../../src/sim_sw/firmware/firm_fields_v1.js';
import '../../src/sim_sw/firmware/firm_fields_v2.js';
import '../../src/sim_sw/firmware/firm_oc_eoc_v1.js';
import '../../src/sim_sw/firmware/firm_oc_eoc_v2.js';
import '../../src/sim_sw/firmware/firm_instruction.js';
import '../../src/sim_sw/firmware.js';
import '../../src/sim_sw/assembly/lexical.js';
import '../../src/sim_sw/assembly/memory_segments.js';
import '../../src/sim_sw/assembly/directives.js';
import '../../src/sim_sw/assembly/datatypes.js';
import '../../src/sim_sw/assembly/compiler1_prepare_wepsim.js';
import '../../src/sim_sw/assembly/compiler2_asm_obj.js';
import '../../src/sim_sw/assembly/compiler3_obj2mem_wepsim.js';
import '../../src/sim_sw/assembly/compiler_options.js';
import '../../src/sim_sw/assembly.js'
import '../../src/wepsim_i18n/i18n.js';
import '../../src/wepsim_i18n/es/gui.js';
import '../../src/wepsim_i18n/es/tutorial-welcome.js';
import '../../src/wepsim_i18n/es/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/es/tour-intro.js';
import '../../src/wepsim_i18n/es/cfg.js';
import '../../src/wepsim_i18n/es/help.js';
import '../../src/wepsim_i18n/es/states.js';
import '../../src/wepsim_i18n/es/examples.js';
import '../../src/wepsim_i18n/es/compiler.js';
import '../../src/wepsim_i18n/es/hw.js';
import '../../src/wepsim_i18n/es/dialogs.js';

import '../../src/wepsim_i18n/en/gui.js';
import '../../src/wepsim_i18n/en/tutorial-welcome.js';
import '../../src/wepsim_i18n/en/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/en/tour-intro.js';
import '../../src/wepsim_i18n/en/cfg.js';
import '../../src/wepsim_i18n/en/help.js';
import '../../src/wepsim_i18n/en/states.js';
import '../../src/wepsim_i18n/en/examples.js';
import '../../src/wepsim_i18n/en/compiler.js';
import '../../src/wepsim_i18n/en/hw.js';
import '../../src/wepsim_i18n/en/dialogs.js';

import '../../src/wepsim_i18n/fr/gui.js';
import '../../src/wepsim_i18n/fr/tutorial-welcome.js';
import '../../src/wepsim_i18n/fr/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/fr/tour-intro.js';
import '../../src/wepsim_i18n/fr/cfg.js';
import '../../src/wepsim_i18n/fr/help.js';
import '../../src/wepsim_i18n/fr/states.js';
import '../../src/wepsim_i18n/fr/examples.js';
import '../../src/wepsim_i18n/fr/compiler.js';
import '../../src/wepsim_i18n/fr/hw.js';
import '../../src/wepsim_i18n/fr/dialogs.js';

import '../../src/wepsim_i18n/kr/gui.js';
import '../../src/wepsim_i18n/kr/tutorial-welcome.js';
import '../../src/wepsim_i18n/kr/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/kr/tour-intro.js';
import '../../src/wepsim_i18n/kr/cfg.js';
import '../../src/wepsim_i18n/kr/help.js';
import '../../src/wepsim_i18n/kr/states.js';
import '../../src/wepsim_i18n/kr/examples.js';
import '../../src/wepsim_i18n/kr/compiler.js';
import '../../src/wepsim_i18n/kr/hw.js';
import '../../src/wepsim_i18n/kr/dialogs.js';

import '../../src/wepsim_i18n/ja/gui.js';
import '../../src/wepsim_i18n/ja/tutorial-welcome.js';
import '../../src/wepsim_i18n/ja/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/ja/tour-intro.js';
import '../../src/wepsim_i18n/ja/cfg.js';
import '../../src/wepsim_i18n/ja/help.js';
import '../../src/wepsim_i18n/ja/states.js';
import '../../src/wepsim_i18n/ja/examples.js';
import '../../src/wepsim_i18n/ja/compiler.js';
import '../../src/wepsim_i18n/ja/hw.js';
import '../../src/wepsim_i18n/ja/dialogs.js';

import '../../src/wepsim_i18n/it/gui.js';
import '../../src/wepsim_i18n/it/tutorial-welcome.js';
import '../../src/wepsim_i18n/it/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/it/tour-intro.js';
import '../../src/wepsim_i18n/it/cfg.js';
import '../../src/wepsim_i18n/it/help.js';
import '../../src/wepsim_i18n/it/states.js';
import '../../src/wepsim_i18n/it/examples.js';
import '../../src/wepsim_i18n/it/compiler.js';
import '../../src/wepsim_i18n/it/hw.js';
import '../../src/wepsim_i18n/it/dialogs.js';

import '../../src/wepsim_i18n/pt/gui.js';
import '../../src/wepsim_i18n/pt/tutorial-welcome.js';
import '../../src/wepsim_i18n/pt/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/pt/tour-intro.js';
import '../../src/wepsim_i18n/pt/cfg.js';
import '../../src/wepsim_i18n/pt/help.js';
import '../../src/wepsim_i18n/pt/states.js';
import '../../src/wepsim_i18n/pt/examples.js';
import '../../src/wepsim_i18n/pt/compiler.js';
import '../../src/wepsim_i18n/pt/hw.js';
import '../../src/wepsim_i18n/pt/dialogs.js';

import '../../src/wepsim_i18n/hi/gui.js';
import '../../src/wepsim_i18n/hi/tutorial-welcome.js';
import '../../src/wepsim_i18n/hi/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/hi/tour-intro.js';
import '../../src/wepsim_i18n/hi/cfg.js';
import '../../src/wepsim_i18n/hi/help.js';
import '../../src/wepsim_i18n/hi/states.js';
import '../../src/wepsim_i18n/hi/examples.js';
import '../../src/wepsim_i18n/hi/compiler.js';
import '../../src/wepsim_i18n/hi/hw.js';
import '../../src/wepsim_i18n/hi/dialogs.js';

import '../../src/wepsim_i18n/zh_cn/gui.js';
import '../../src/wepsim_i18n/zh_cn/tutorial-welcome.js';
import '../../src/wepsim_i18n/zh_cn/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/zh_cn/tour-intro.js';
import '../../src/wepsim_i18n/zh_cn/cfg.js';
import '../../src/wepsim_i18n/zh_cn/help.js';
import '../../src/wepsim_i18n/zh_cn/states.js';
import '../../src/wepsim_i18n/zh_cn/examples.js';
import '../../src/wepsim_i18n/zh_cn/compiler.js';
import '../../src/wepsim_i18n/zh_cn/hw.js';
import '../../src/wepsim_i18n/zh_cn/dialogs.js';

import '../../src/wepsim_i18n/ru/gui.js';
import '../../src/wepsim_i18n/ru/tutorial-welcome.js';
import '../../src/wepsim_i18n/ru/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/ru/tour-intro.js';
import '../../src/wepsim_i18n/ru/cfg.js';
import '../../src/wepsim_i18n/ru/help.js';
import '../../src/wepsim_i18n/ru/states.js';
import '../../src/wepsim_i18n/ru/examples.js';
import '../../src/wepsim_i18n/ru/compiler.js';
import '../../src/wepsim_i18n/ru/hw.js';
import '../../src/wepsim_i18n/ru/dialogs.js';

import '../../src/wepsim_i18n/sv/gui.js';
import '../../src/wepsim_i18n/sv/tutorial-welcome.js';
import '../../src/wepsim_i18n/sv/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/sv/tour-intro.js';
import '../../src/wepsim_i18n/sv/cfg.js';
import '../../src/wepsim_i18n/sv/help.js';
import '../../src/wepsim_i18n/sv/states.js';
import '../../src/wepsim_i18n/sv/examples.js';
import '../../src/wepsim_i18n/sv/compiler.js';
import '../../src/wepsim_i18n/sv/hw.js';
import '../../src/wepsim_i18n/sv/dialogs.js';

import '../../src/wepsim_i18n/de/gui.js';
import '../../src/wepsim_i18n/de/tutorial-welcome.js';
import '../../src/wepsim_i18n/de/tutorial-simpleusage.js';
import '../../src/wepsim_i18n/de/tour-intro.js';
import '../../src/wepsim_i18n/de/cfg.js';
import '../../src/wepsim_i18n/de/help.js';
import '../../src/wepsim_i18n/de/states.js';
import '../../src/wepsim_i18n/de/examples.js';
import '../../src/wepsim_i18n/de/compiler.js';
import '../../src/wepsim_i18n/de/hw.js';
import '../../src/wepsim_i18n/de/dialogs.js';

import '../../src/wepsim_core/wepsim_url.js';
import '../../src/wepsim_core/wepsim_clipboard.js';
import '../../src/wepsim_core/wepsim_preload_commands.js';
import '../../src/wepsim_core/wepsim_preload.js';
import '../../src/wepsim_core/wepsim_checkpoint.js';
import '../../src/wepsim_core/wepsim_signal.js';
import '../../src/wepsim_core/wepsim_state.js';
import '../../src/wepsim_core/wepsim_execute.js';
import '../../src/wepsim_core/wepsim_notify.js';
import '../../src/wepsim_core/wepsim_mode.js';
import '../../src/wepsim_core/wepsim_share.js';
import '../../src/wepsim_core/wepsim_dialog.js';
import '../../src/wepsim_core/wepsim_example.js';
import '../../src/wepsim_core/wepsim_help.js';
import '../../src/wepsim_core/wepsim_help_commands.js';
import '../../src/wepsim_core/wepsim_tutorial.js';
import '../../src/wepsim_core/wepsim_tutorial_welcome.js';
import '../../src/wepsim_core/wepsim_tutorial_simpleusage.js';
import '../../src/wepsim_core/wepsim_tour.js';
import '../../src/wepsim_core/wepsim_tour_commands.js';
import '../../src/wepsim_core/wepsim_voice.js';
import '../../src/wepsim_core/wepsim_voice_commands.js';
import '../../src/wepsim_core/wepsim_dbg_breakpointicons.js';

import '../../src/wepsim_nodejs/wepsim_node_core.js';

import { wepsim_nodejs_doActionError,
         wepsim_nodejs_doAction,
         wepsim_nodejs_loadCheckpoint
} from '../../src/wepsim_nodejs/wepsim_node_action.js';
export {
    wepsim_nodejs_doActionError,
    wepsim_nodejs_doAction,
    wepsim_nodejs_loadCheckpoint
};
