#!/usr/bin/env python3


#*
#*  Copyright 2022-2023 Felix Garcia Carballeira, Diego Carmarmas Alonso, Alejandro Calderon Mateos
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


import sys
import os

# Adapt assembly file...
try:
    fin  = open(sys.argv[1],  "rt")
    fout = open("main",       "wt")

    # add initial header
    fout.write(".text\n");
    fout.write(".type main, @function\n")
    fout.write(".globl main\n")

    # for each line in the input file...
    for line in fin:
        line2 = line.replace('ecall', '#### \n addi sp, sp, -8 \n sw ra, 0(sp) \n jal _myecall \n lw ra, 0(sp) \n addi sp, sp, 8 \n ####')
        line2 = line2.replace('rdcycle', '#### \n addi sp, sp, -8 \n sw ra, 0(sp) \n jal _esp_cpu_set_cycle_count \n lw ra, 0(sp) \n addi sp, sp, 8 \n ####')
        fout.write(line2)

    # close input + output files
    fin.close()
    fout.close()
except e:
    print("Error adapting assembly file... :-/")
