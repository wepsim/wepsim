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

# I/O Module
# ==========
# The following constraints hold for the device's standard I/O:
#
#  * Reading a character doesn't echo.
#  * Once a character is written you cannot delete it (backspace) or move
#    back (arrow keys).
#  * Writing doesn't echo until a line feed is issued.
#
# Therefore this module attempts to solve this by creating a very simple
# editable line where input can be modified using arrow keys, and characters
# can be removed with backspace.
#
# This file implements the following global functions:
#
#   int get_immediate ()
#   int get_character ()
#   int peek_character ()
#   void get_string (char *string, int length);
#
#   void put_immediate (char c)
#   void put_zstring (char *c);
#   void put_string (char *c, int length);
#
# TODO: Add latin-1 for accents
#
# AUTHOR: José Antonio Verde Jiménez

# ==== .rodata ============================================================== #
.section .rodata

go_right_str: .asciz "\033[1C"
go_left_str:  .asciz "\033[1D"

# ==== .data ================================================================ #

.section .data

# char line[]
# A very long string buffer (UTF-8) where the input characters are stored and
# modified. Writing is done to this string until a newline character is found
# (\n, \r or \r\n), then I/O operations can continue.
.set LINE_SIZE, 80
.align 2
line: .space LINE_SIZE
.align 2

# int begin
# Begin cursor, points to the beginning of the line, it increases while the
# line is being read.
begin:  .word 0

# int end
# End cursor, points to the end of the line.
end:    .word 0

# int next
# The next character to be read if any.
# If the number is -1, then we reached EOF.
# Otherwise, it stores the next 8 bit character in buffer.
next:   .word 0

# bool full
# True if there is a buffered character.
full:   .word 0

# ==== .rodata ============================================================== #

.section .rodata

.align 2
line_capacity: .word LINE_SIZE

# ==== .text ================================================================ #

.section .text

# FUNCTION:    int get_immediate ()
# PARAMETERS:  NONE
# RETURNS:     int a0 : -1 on EOF, otherwise the character read
# DESCRIPTION: Read the next character without echoing it.
    .type  get_immediate, @function
    .globl get_immediate
get_immediate:
    addi sp, sp, -8
    sw ra, 0(sp)
    sw s0, 4(sp)

    la t0, next
    la t1, full
    lw t2, 0(t1)
    beq t2, zero, get_immediate_read_new        # If not full read it.

    get_immediate_buffered:
    sw zero, 0(t1)  # full = 0
    lw a0, 0(t0)    # return next
    li t0, -1
    j get_immediate_end

    get_immediate_read_new:
    mv a0, zero
    la a1, next
    li a2, 1
    jal ra, read        # read(0, &next, 1)
    beq zero, a0, get_immediate_eof
    # TODO: Check if UTF-8 valid string
    la t0, next         # t0 = &next
    lb a0, 0(t0)        # a0 = next
    j get_immediate_end

    get_immediate_eof:
    li a0, -1           # Return -1

    get_immediate_end:
    lw ra, 0(sp)
    lw s0, 4(sp)
    addi sp, sp, 8
    jr ra

# FUNCTION:     void put_immediate (char c)
# PARAMETERS:   a0 : char c
# RETURNS:      NONE
# DESCRIPTION:  Put a character immediately on the screen.
    .type  put_immediate, @function
    .globl put_immediate
put_immediate:
    addi sp, sp, -4
    sw ra, 0(sp)

    jal ra, put
    jal ra, synchronise

    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

# FUNCTION:     void put_zstring (char *str)
# PARAMETERS:   a0 : char *str
# RETURNS:      NONE
# DESCRIPTION:  Put a zero-terminated string on the screen.
    .type  put_zstring, @function
    .globl put_zstring
put_zstring:
    addi sp, sp, -8
    sw ra, 0(sp)
    sw s0, 4(sp)

    mv s0, a0
    put_zstring_loop:
        lb a0, 0(s0)
        beq a0, zero, put_zstring_end
        jal ra, put
        addi s0, s0, 1
        j put_zstring_loop

    put_zstring_end:
    mv a0, zero
    jal ra, synchronise

    lw ra, 0(sp)
    lw s0, 4(sp)
    addi sp, sp, 8
    jr ra

# FUNCTION:     void put_string (char *str, int length)
# PARAMETERS:   a0 : char *str
#               a1 : int length
# RETURNS:      NONE
# DESCRIPTION:  Put a `length' bytes long string on the screen.
    .type  put_string, @function
    .globl put_string
put_string:
    addi sp, sp, -12
    sw ra, 0(sp)
    sw s0, 4(sp)
    sw s1, 8(sp)

    mv s0, a0
    mv s1, a1
    put_string_loop:
        beq s1, zero, put_string_end
        lb a0, 0(s0)
        jal ra, put
        addi s0, s0, 1
        addi s1, s1, -1
        j put_string_loop

    put_string_end:
    jal ra, synchronise

    lw ra, 0(sp)
    lw s0, 4(sp)
    lw s1, 8(sp)
    addi sp, sp, 12
    jr ra

# FUNCTION:     void get_string (char *str, int length)
# PARAMETERS:   a0 : char *str
#               a1 : int length
# RETURNS:      NONE
# DESCRIPTION:  Read a `length' bytes long string.
    .type  get_string, @function
    .globl get_string
get_string:
    addi sp, sp, -12
    sw ra, 0(sp)
    sw s0, 4(sp)
    sw s1, 8(sp)

    mv s0, a0   # s0 = str
    mv s1, a1   # s1 = length
    get_string_loop:
        beq s1, zero, get_string_end    # exit when length = 0
        jal ra, get_character           # a0 = get_character()
        li t0, -1
        beq t0, a0, get_string_end      # exit when EOF
        sw a0, 0(s0)                    # *s0 = a0
        addi s1, s1, -1
        addi s0, s0, 1
        j get_string_loop

    get_string_end:
    lw ra, 0(sp)
    lw s0, 4(sp)
    lw s1, 8(sp)
    addi sp, sp, 12
    jr ra

# FUNCTION:     int get_character ()
# PARAMETERS:   NONE
# RETURNS:      a0 : int
# DESCRIPTION:  Read one character from standard input
    .type  get_character, @function
    .globl get_character
get_character:
    addi sp, sp, -4
    sw ra, 0(sp)

    jal ra, refill
    la t0, begin
    la t1, line
    lw t2, 0(t0)
    add t3, t2, t1      # t2 = line + begin
    lb a0, 0(t3)        # return *(line + begin)
    addi t2, t2, 1
    sw t2, 0(t0)        # begin++

    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

# FUNCTION:     int peek_character ()
# PARAMETERS:   NONE
# RETURNS:      a0 : int
# DESCRIPTION:  Peek which will be the next character from standard input.
    .type  peek_character, @function
    .globl peek_character
peek_character:
    addi sp, sp, -4
    sw ra, 0(sp)

    jal ra, refill
    la t0, begin
    la t1, line
    lw t0, 0(t0)
    add t2, t1, t0
    lb a0, 0(t2)

    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

# ==== Utility ==== #

# FUNCTION:     int peek ()
# PARAMETERS:   NONE
# RETURNS:      a0 : int ch
# DESCRIPTION:  It checks the next character (if any) and returns it. The next
#               time it is read or peeked, it returns the same character until
#               it is read.
    .type peek, @function
peek:
    addi sp, sp, -4
    sw ra, 0(sp)

    la t1, full
    lw a1, 0(t1)
    bne a1, zero, peek_full     # If full, goto peek_full

    peek_empty:
    jal ra, get_immediate
    la t1, full
    li a1, 1
    sw a1, 0(t1)    # Fill it

    peek_full:
    la t0, next
    lw a0, 0(t0)

    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

# FUNCTION:     void read_line ()
# PARAMETERS:   NONE
# RETURNS:      NONE
# DESCRIPTION:  Reads full line.
    .type read_line, @function
read_line:
    addi sp, sp, -24
    sw ra, 0(sp)
    sw s0, 4(sp)
    sw s1, 8(sp)
    sw s2, 12(sp)
    sw s3, 16(sp)
    sw s4, 20(sp)

    la s0, line     # s0 (line)
    mv s1, zero     # s1 (end)
    mv s2, zero     # s2 (cursor)

    read_line_loop:
        jal ra, get_immediate

        li t0, -1       # EOF
        li t1, '\n'     # LF
        li t2, '\r'     # CR
        li t3, 27       # ESC
        li t4, '\b'     # Backspace

        beq a0, t0, read_line_end       # EOF
        beq a0, t1, read_line_LF        # Line Feed
        beq a0, t2, read_line_CR        # Carriage Return
        beq a0, t3, read_line_on_ESC    # Escape Sequence
        beq a0, t4, read_line_on_DEL    # Backspace

        read_line_normal:
            # Check line capacity
            la t0, line_capacity
            lw t0, 0(t0)
            addi t0, t0, -1
            bge s1, t0, read_line_loop  # Line too long

            # Shift right the line
            mv t0, s1           # t0 = end
            add t1, s0, s1      # char *t1 = &line[end]
            read_line_shift_right:
                blt t0, s2, read_line_end_shift_right   # exit when t0 = Cursor
                lb t2, 0(t1)
                sb t2, 1(t1)
                addi t1, t1, -1
                addi t0, t0, -1
                j read_line_shift_right
            read_line_end_shift_right:

            # Insert character
            add t0, s0, s2      # t0 = &line[cursor]
            sb a0, 0(t0)        # line[cursor] = a0
            addi s1, s1, 1      # end++
            addi s2, s2, 1      # cursor++

            # Redraw
            add a0, s0, s2
            addi a0, a0, -1     # str = line + cursor - 1
            sub a1, s1, s2
            addi a1, a1, 1      # length = end - cursor + 1
            jal ra, put_string  # put_string(t0, end - cursor + 1)

            # Move cursor back
            mv s3, s2       # s3 = cursor
            read_line_cursor_back:
                beq s3, s1, read_line_end_cursor_back
                la a0, go_left_str
                jal ra, put_zstring
                addi s3, s3, 1  # s3++
                j read_line_cursor_back
            read_line_end_cursor_back:

            j read_line_loop

        read_line_LF:
            add t0, s0, s1
            sb a0, 0(t0)        # line[end] = '\n'
            addi s1, s1, 1
            jal ra, put_immediate
            j read_line_end

        read_line_CR:
            jal ra, peek
            li t0, '\n'
            beq t0, a0, read_line_CR_win
            read_line_CR_mac:
            mv a0, t0
            j read_line_LF

            read_line_CR_win:
            jal ra, get_immediate   # Read it to skip it
            j read_line_LF

        read_line_on_ESC:
            jal ra, peek
            li t0, '['
            bne a0, t0, read_line_loop      # Bad sequence
            jal ra, get_immediate

            jal ra, peek
            li t0, 'A'
            li t1, 'B'
            li t2, 'C'
            li t3, 'D'

            beq a0, t0, read_line_on_ESC_UP_DOWN  
            beq a0, t1, read_line_on_ESC_UP_DOWN
            beq a0, t2, read_line_on_ESC_RIGHT
            beq a0, t3, read_line_on_ESC_LEFT
            j read_line_loop

            read_line_on_ESC_UP_DOWN:
            jal ra, get_immediate       # Buffer it and ignore it.
            j read_line_loop

            read_line_on_ESC_LEFT:
            jal ra, get_immediate
            beq s2, zero, read_line_loop    # Can't go to left.
            addi s2, s2, -1
            la a0, go_left_str
            jal ra, put_zstring
            j read_line_loop

            read_line_on_ESC_RIGHT:
            jal ra, get_immediate
            bge s2, s1, read_line_loop      # Can't go right.
            addi s2, s2, 1
            la a0, go_right_str
            jal ra, put_zstring
            j read_line_loop

        read_line_on_DEL:
            beq s2, zero, read_line_loop    # Cursor at the beginning
            beq s1, zero, read_line_loop    # End at the beginning

            # Shift the string left
            jal ra, put                     # Go back, not immediate.
            addi s1, s1, -1                 # end--
            addi s2, s2, -1                 # cursor--
            mv s3, s2                       # s3 = cursor
            add s4, s0, s2                  # s4 = line + cursor
            read_line_shift_left:
                beq s3, s1, read_line_end_shift_left
                lb a0, 1(s4)
                sb a0, 0(s4)    # *s4 = *(s4 + 1)
                jal ra, put     # put(a0),  Not buffered
                addi s3, s3, 1  # s3++
                addi s4, s4, 1  # s4++
                j read_line_shift_left
            read_line_end_shift_left:
            li a0, ' '
            jal ra, put
            li a0, '\b'
            jal ra, put_immediate

            # Return cursor to last position
            mv s3, s2       # s3 = cursor
            read_line_DEL_cursor_back:
                beq s3, s1, read_line_DEL_end_cursor_back
                la a0, go_left_str
                jal ra, put_zstring
                addi s3, s3, 1  # s3++
                j read_line_cursor_back
            read_line_DEL_end_cursor_back:
            j read_line_loop

    read_line_end:

    la t0, begin
    la t1, end
    sw zero, 0(t0)  # begin = 0
    sw s1, 0(t1)    # end = end

    lw ra, 0(sp)
    lw s0, 4(sp)
    lw s1, 8(sp)
    lw s2, 12(sp)
    lw s3, 16(sp)
    lw s4, 20(sp)
    addi sp, sp, 24
    jr ra

# FUNCTION:    void put (char c)
# PARAMETERS:  a0 : char c
# RETURNS:     NONE
# DESCRIPTION: Put a character on the screen without synchronising. If the
#              character is a line feed (\n) it transforms it to (\r\n).
    .type put, @function
put:
    addi sp, sp, -4
    sw ra, 0(sp)

    li t0, '\n'
    bne t0, a0, put_skip

    put_CR:
    li a0, '\r'
    jal ra, putchar
    li a0, '\n'

    put_skip:
    jal ra, putchar

    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

# FUNCTION:     void synchronise ()
# PARAMETERS:   NONE
# RETURNS:      NONE
# DESCRIPTION:  Flush and synchronise output
    .type synchronise, @function
synchronise:
    addi sp, sp, -4
    sw ra, 0(sp)

    li a0, 1        # a0 = STDOUT
    jal ra, fsync

    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

# FUNCTION:     void refill ()
# PARAMETERS:   NONE
# RETURNS:      NONE
# DESCRIPTION:  Refill the line buffer if it is empty.
    .type refill, @function
refill:
    addi sp, sp, -4
    sw ra, 0(sp)

    la t0, begin
    la t1, end
    lw t2, 0(t0)
    lw t3, 0(t1)
    sub t5, t3, t2                          # t5 = end - begin
    blt zero, t5, refill_end                # return when end - begin > 0
    jal ra, read_line                       # Otherwise re-read the line

    refill_end:
    lw ra, 0(sp)
    addi sp, sp, 4
    jr ra

# ======== END OF FILE ====================================================== #
