#!/bin/bash
#set -x


#*
#*  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

# initialize
TEST_LIST=()

echo "1) microcode + assembly"
TEST_LIST+=('./ws_dist/wepsim.sh -a  run                   -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  stepbystep            -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  microstepbymicrostep  -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  check                 -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt -r ./examples/checklist/cl-ep_s1_e1.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  check                 -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt -r ./examples/checklist/cl-ep_s1_e2.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  microstepverbalized   -m ep -f ./examples/microcode/mc-ep_base.txt -s ./examples/assembly/asm-ep_s1_e1.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  show-console          -m ep -f ./examples/microcode/mc-ep_os.txt   -s ./examples/assembly/asm-ep_s4_e1.txt')

echo "2) checkpoint"
TEST_LIST+=('./ws_dist/wepsim.sh -a  run                   --checkpoint ./examples/checkpoint/tutorial_1.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  stepbystep            --checkpoint ./examples/checkpoint/tutorial_1.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  microstepbymicrostep  --checkpoint ./examples/checkpoint/tutorial_1.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  check                 --checkpoint ./examples/checkpoint/tutorial_1.txt -r ./examples/checklist/cl-ep_s1_e1.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  microstepverbalized   --checkpoint ./examples/checkpoint/tutorial_1.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  show-console          --checkpoint ./examples/checkpoint/tutorial_1.txt')
TEST_LIST+=('./ws_dist/wepsim.sh -a  show-record           --checkpoint ./examples/checkpoint/tutorial_1.txt')

