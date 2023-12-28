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

# WepSIM Module
# AUTHOR: José Antonio Verde Jiménez

.section .text

    .type  wepsim_udelay, @function
    .globl wepsim_udelay
wepsim_udelay:         # void (uint32_t)
    # push ra
    addi sp, sp, -4
    sw ra, 0(sp)
    # usleep()
    jal ra, usleep
    # popd ra
    lw ra, 0(sp)
    addi sp, sp, 4
    # return
    jr ra


    .type  wepsim_random, @function
    .globl wepsim_random
wepsim_random:         # int ()
    # push ra
      addi sp, sp, -4
      sw ra, 0(sp)
    # wepsim_random()
      jal ra, _wepsim_random
    # pop ra
      lw ra, 0(sp)
      addi sp, sp, 4
    # return
      jr ra


    .type  wepsim_random_array, @function
    .globl wepsim_random_array
wepsim_random_array:   # void (void * ptr, size_t length)
    # push ra
      addi sp, sp, -4
      sw ra, 0(sp)
    # wepsim_random_array()
      jal ra, _wepsim_random_array
    # pop ra
      lw ra, 0(sp)
      addi sp, sp, 4
    # return
      jr ra

