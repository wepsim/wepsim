#!/bin/bash
set -x


#*
#*  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
#*
#*  This file is part of WepSIM.
#*
#*  WepSIM is free software: you can redistribute it and/or modify
#*  it under the terms of the GNU Lesser General Public License as published by
#*  the Free Software Foundation, either version 3 of the License, or
#*  (at your option) any later version.
#*
#*  WepSIM is distributed in the hope that it will be useful,
#*  but WITHOUT ANY WARRANTY; without even the implied warranty of
#*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#*  GNU Lesser General Public License for more details.
#*
#*  You should have received a copy of the GNU Lesser General Public License
#*  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
#*


echo "1) microcode + assembly"
./ws_dist/wepsim_node.sh run                   ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
./ws_dist/wepsim_node.sh stepbystep            ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
./ws_dist/wepsim_node.sh microstepbymicrostep  ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
./ws_dist/wepsim_node.sh check                 ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e1.txt
./ws_dist/wepsim_node.sh check                 ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e2.txt
./ws_dist/wepsim_node.sh microstepverbalized   ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
./ws_dist/wepsim_node.sh show-console          ep ./examples/microcode/mc-ep_os.txt   ./examples/assembly/asm-ep_s4_e1.txt

echo "2) checkpoint"
./ws_dist/wepsim_node.sh run                   checkpoint ./examples/checkpoint/tutorial_1.txt
./ws_dist/wepsim_node.sh stepbystep            checkpoint ./examples/checkpoint/tutorial_1.txt
./ws_dist/wepsim_node.sh microstepbymicrostep  checkpoint ./examples/checkpoint/tutorial_1.txt
./ws_dist/wepsim_node.sh check                 checkpoint ./examples/checkpoint/tutorial_1.txt                             ./examples/checklist/cl-ep_s1_e1.txt
./ws_dist/wepsim_node.sh microstepverbalized   checkpoint ./examples/checkpoint/tutorial_1.txt
./ws_dist/wepsim_node.sh show-console          checkpoint ./examples/checkpoint/tutorial_1.txt
./ws_dist/wepsim_node.sh show-record           checkpoint ./examples/checkpoint/tutorial_1.txt

