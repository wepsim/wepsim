#
#  Copyright 2018-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Diego Camarmas Alonso, José Antonio Verde Jiménez
#
#  This file is part of WepSIM.
#
#  WepSIM is free software: you can redistribute it and/or modify
#  it under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  (at your option) any later version.
#
#  WepSIM is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU Lesser General Public License for more details.
#
#  You should have received a copy of the GNU Lesser General Public License
#  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
#

# rdcycle Module
# ==============
# This module implements the function _rdcycle which returns the number of
# cycles that have passed since the device was booted.

.section .text

    .type  _rdcycle, @function
    .globl _rdcycle
_rdcycle:
    addi sp, sp, -4
    sw ra, 0(sp)

    jal esp_cpu_get_cycle_count

    lw ra, 0(sp)
    addi sp, sp, 4

    jr ra

