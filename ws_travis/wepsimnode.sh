./wepsim_node.sh run                   ep ./examples/microcode/mc-ep_s1_e1.txt ./examples/assembly/asm-ep_s1_e1.txt
./wepsim_node.sh stepbystep            ep ./examples/microcode/mc-ep_s1_e1.txt ./examples/assembly/asm-ep_s1_e1.txt
./wepsim_node.sh microstepbymicrostep  ep ./examples/microcode/mc-ep_S1_e1.txt ./examples/assembly/asm-ep_s1_e1.txt
./wepsim_node.sh check                 ep ./examples/microcode/mc-ep_s1_e1.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e1.txt
./wepsim_node.sh check                 ep ./examples/microcode/mc-ep_s1_e1.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e2.txt
./wepsim_node.sh microstepverbalized   ep ./examples/microcode/mc-ep_s1_e1.txt ./examples/assembly/asm-ep_s1_e1.txt
