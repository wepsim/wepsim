
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
  result1: .word 0x12345678

.text
main:
    # load byte, half, word
    li  a0, result1
    lb  a1, 0(a0)

    li  a0, result1
    lh  a2, 0(a0)

    li  a0, result1
    lw  a3, 0(a0)

    # store byte, half, word
    li  a1, 0x1
    sb  a1, 0(a0)

    li  a2, 0x2
    sh  a2, 0(a0)

    li  a3, 0x3
    sw  a3, 0(a0)

    # return
    jr  ra

