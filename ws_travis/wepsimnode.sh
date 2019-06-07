#!/bin/bash
set -x

echo "1) microcode + assembly"
./wepsim_node.sh run                   ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
./wepsim_node.sh stepbystep            ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
./wepsim_node.sh microstepbymicrostep  ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
./wepsim_node.sh check                 ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e1.txt
./wepsim_node.sh check                 ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e2.txt
./wepsim_node.sh microstepverbalized   ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
./wepsim_node.sh show-console          ep ./examples/microcode/mc-ep_os.txt   ./examples/assembly/asm-ep_s4_e1.txt

echo "2) checkpoint"
./wepsim_node.sh run                   checkpoint ./examples/checkpoint/tutorial_1.txt
./wepsim_node.sh stepbystep            checkpoint ./examples/checkpoint/tutorial_1.txt
./wepsim_node.sh microstepbymicrostep  checkpoint ./examples/checkpoint/tutorial_1.txt
./wepsim_node.sh check                 checkpoint ./examples/checkpoint/tutorial_1.txt                             ./examples/checklist/cl-ep_s1_e1.txt
./wepsim_node.sh microstepverbalized   checkpoint ./examples/checkpoint/tutorial_1.txt
./wepsim_node.sh show-console          checkpoint ./examples/checkpoint/tutorial_1.txt

