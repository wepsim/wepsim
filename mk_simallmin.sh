#!/bin/sh
set -x

cat sim_hw_board.js sim_hw_cpu.js sim_hw_mem.js sim_hw_io.js sim_hw_kbd.js sim_hw_scr.js sim_cfg.js sim_core_ui.js sim_core_ctrl.js sim_lang.js sim_lang_firm.js sim_lang_asm.js > sim_all.js

/usr/bin/yui-compressor -o sim_all.min.js sim_all.js

#rm -fr sim_all.js

