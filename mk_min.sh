#!/bin/sh
set -x

# 
#  hardware
# 
cat sim_hw_board.js sim_hw_cpu.js sim_hw_mem.js sim_hw_io.js sim_hw_kbd.js sim_hw_scr.js > sim_hw.js
/usr/bin/yui-compressor -o min.sim_hw.js sim_hw.js
rm -fr sim_hw.js

# 
#  simulator
# 
cat sim_cfg.js sim_core_ui.js sim_core_ctrl.js sim_lang.js sim_lang_firm.js sim_lang_asm.js > sim_all.js
/usr/bin/yui-compressor -o min.sim_all.js sim_all.js
rm -fr sim_all.js

# 
#  external
# 
cat external/bootstrap.min.js external/bootbox.min.js external/knockout-3.4.0.js external/codemirror.js external/codemirror.javascript.js external/spectrum.min.js external/bootstrap-notify.min.js > external/external.min.js
cat external/bootstrap.min.css external/bootstrap-theme.min.css external/spectrum.min.css external/codemirror.css > external/external.min.css

