
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
    w1: .byte 1, -1, 07, 0xa, 'a'
    w2: .half 1, -1, 07, 0xa, 'a'
    w3: .word 1, -1, 07, 0x12345678, 'a'
    w4: .ascii  "hello"
    w5: .asciiz "world"
    w6: .space 5

.text
main:
    # test load byte
   lb  $1  w1

    # test load word
   lw  $3  w3

    # test store byte
   li  $1  0xF
   sb  $1  w1

    # test store word
   li  $2  0x123
   sw  $2  w3

