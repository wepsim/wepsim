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

# ecall Module
# AUTHOR: José Antonio Verde Jiménez

# ==== .rodata ============================================================== #
.section .rodata

.align 2

vector:
    .word unknown               # a7 = 0
    .word print_int             # a7 = 1
    .word print_float           # a7 = 2
    .word print_double          # a7 = 3
    .word print_string          # a7 = 4
    .word read_int              # a7 = 5
    .word read_float            # a7 = 6
    .word read_double           # a7 = 7
    .word read_string           # a7 = 8
    .word sbrk                  # a7 = 9
    .word exit                  # a7 = 10
    .word print_char            # a7 = 11
    .word read_char             # a7 = 12

vector_size:
    .word (vector_size - vector) / 4

unknown_msg:
    .asciz "\033[31;1m¡Unknown system call!\033[0m\n"

not_implemented_msg:
    .asciz "\033[31;1mNot implemented\033[0m\n"

sbrk_error_msg:
    .asciz "\033[31;1mSBRK: Memory exhausted\033[0m\n"

integers:
    .byte -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
    .byte -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
    .byte -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
    .byte  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, -1, -1, -1, -1, -1, -1
    .byte -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1
    .byte -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
    .byte -1, 10, 11, 12, 13, 14, 15, -1, -1, -1, -1, -1, -1, -1, -1, -1
    .byte -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1

images: .byte '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'

# ==== .data ================================================================ #
.section .data

.set POOL_CAPACITY, 65536

.align 2
pool_capacity:  .word  POOL_CAPACITY
pool_size:      .word  0

pool:           .space POOL_CAPACITY

# A small buffer for strings
buffer: .space 256
buffer_end:

# ==== .text ================================================================ #
.section .text 

.type  _ecall, @function
.globl  _myecall

_not_implemented:
    addi sp, sp, -4
    sw ra, 0(sp)
    la a0, not_implemented_msg
    li a7, 4
    jal ra, _myecall
    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

unknown:
    addi sp, sp, -4
    sw ra, 0(sp)
    li a7, 4
    la a0, unknown_msg
    jal ra, _myecall
    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

# FUNCTION:     void print_int (int number, int base = 10)
# PARAMETERS:   int a0 : The number base, it is ignored, 10 is always used.
# RETURNS:      NONE
# DESCRIPTION:  Print an integer into the string using the given base.

print_int:
    addi sp, sp, -4
    sw ra, 0(sp)

    # a0 : number
    # a1 : base
    li a1, 10
    la a2, buffer_end
    la a3, images

    sgtz t0, a0         # t0 := a0 > 0 ? 1 : 0
    seqz t1, a0         # t1 := a0 == 0 ? 1 : 0
    or   t0, t0, t1     # t0 := t0 or t1
    slli t0, t0, 1      # t0 := 2 * t0
    addi t4, t0, -1     # t4 := t0 - 1
    # Now, t4 is -1 if negative and 1 if positive or zero
    sltz a4, a0         # a4 := a0 < 0 ? 1 : 0

    # End the string with a zero
    sb zero, -1(a2)
    addi a2, a2, -2

    print_int_loop:
        rem t0, a0, a1      # value := number rem base
        mul t0, t0, t4      # Negative number case
        div a0, a0, a1      # number := number / base
        add t0, a3, t0      # images + value
        lb t0, 0(t0)        # *(images + value)
        sb t0, 0(a2)        # *buffer = *(images + value)
        addi a2, a2, -1
        bne a0, zero, print_int_loop

    beq a4, zero, print_int_positive
    print_int_negative:
    li t0, '-'
    sb t0, 0(a2)
    addi a2, a2, -1

    print_int_positive:
    addi a0, a2, 1

    jal ra, put_zstring

    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

print_float:
    j _not_implemented      # TODO
print_double:
    j _not_implemented      # TODO

print_string:
    j put_zstring

# FUNCTION:     (int, bool) read_int (int base = 10)
# PARAMETERS:   int a0  : The number base, it is ignored, 10 is always used.
# RETURNS:      int a0  : The result of reading the integer
#               bool a1 : true if it succeeded, false if it failed
# DESCRIPTION:  Read an integer from standard input and return it. It stops
#               reading if it finds a non integer value.
read_int:
    addi sp, sp, -20
    sw ra, 0(sp)
    sw s0, 4(sp)    # For the result
    sw s1, 8(sp)    # For the base
    sw s2, 12(sp)   # For the sign
    sw s3, 16(sp)   # Characters read

    jal ra, skip_separators

    mv s0, zero     # Result = 0
    li a0, 10       # s0 will contain the base, in a future this parameter will
    mv s1, a0       # be accepted.
    li s2, 1        # Positive
    mv s3, zero

    li t0, 2
    li t1, 16
    blt s1, t0, read_int_bad_base   # a1 < 2    (Invalid base)
    bgt s1, t1, read_int_bad_base   # a1 > 16   (Invalid base)

    jal ra, peek_character
    li t0, '+'
    li t1, '-'
    beq a0, t0, read_int_positive
    beq a0, t1, read_int_negative
    j read_int_parse
    read_int_negative:
    li s2, -1
    read_int_positive:
    jal ra, get_character   # Feed a character and ignore it.
    read_int_parse:
        jal ra, peek_character
        blt a0, zero, read_int_stop     # exit when char < 0
        la t0, integers
        add t0, t0, a0
        lb t0, 0(t0)                    # t0 = integers[char]
        blt t0, zero, read_int_stop     # exit when t0 < -1
        bge t0, s1, read_int_stop       # exit when not in base
        addi s3, s3, 1
        mul s0, s0, s1
        add s0, s0, t0                  # result = result * base + integers[char]
        jal ra, get_character           # read it
        j read_int_parse

    read_int_stop:
    beq s3, zero, read_int_failed       # No characters read.
    mul a0, s0, s2
    li a1, 1            # return (result * sign, true)
    j read_int_end

    read_int_failed:
    read_int_bad_base:
    mv a0, zero
    mv a1, zero
    j read_int_end

    read_int_end:
    lw ra, 0(sp)
    lw s0, 4(sp)
    lw s1, 8(sp)
    lw s2, 12(sp)
    lw s3, 16(sp)
    addi sp, sp, 20
    jr ra

read_float:
    j _not_implemented      # TODO
read_double:
    j _not_implemented      # TODO
read_string:
    j get_string

# TODO: Implement a good memory pool
sbrk:
    addi sp, sp, -4
    sw ra, 0(sp)

    la t0, pool_capacity
    la t1, pool_size
    la t2, pool

    lw t3, 0(t0)    # capacity
    lw t4, 0(t1)    # size
    add t5, t4, a0  # t5 = size + a0
    bgt t5, t3, sbrk_overflow

    sbrk_valid:
    sw t5, 0(t1)    # size = size'old + a0
    add a0, t2, t4  # return pool + size'old
    j sbrk_end

    sbrk_overflow:
    la a0, sbrk_error_msg
    la a7, 4
    jal ra, _myecall

    sbrk_end:
    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

exit:
    j _exit

print_char:
    j put_immediate

read_char:
    j get_character

_myecall:
    addi sp, sp, -4
    sw ra, 0(sp)

    # Check it is in range
    la t0, vector_size
    lw t0, 0(t0)
    blt a7, zero, _myecall_unknown
    bgt a7, t0, _myecall_unknown

    # # Call it
    la t0, vector
    slli a7, a7, 2
    add t0, t0, a7
    lw t0, 0(t0)
    jalr ra, t0             # goto vector[a7 * 4]
    j _myecall_end

    _myecall_unknown:
    la a0, unknown_msg
    li a7, 4
    jal ra, _myecall    # print_string

    _myecall_end:
    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

# FUNCTION:     skip_separators
# PARAMETERS:   NONE
# RETURNS:      NONE
# DESCRIPTION:  This function skips separators (spaces, tabulations...), until
#               it finds something different.
    .type skip_separators, @function
skip_separators:
    addi sp, sp, -4
    sw ra, 0(sp)
    skip_separators_loop:
        jal ra, peek_character
        li t0, '\n'     # Line feed
        li t1, '\r'     # Carriage return
        li t2, ' '      # Space
        li t3, '\t'     # Tabulator
        beq a0, t0, skip_separators_skip_it
        beq a0, t1, skip_separators_skip_it
        beq a0, t2, skip_separators_skip_it
        beq a0, t3, skip_separators_skip_it
        j skip_separators_end
        skip_separators_skip_it:
        jal ra, get_character
        j skip_separators_loop
    skip_separators_end:
    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra
