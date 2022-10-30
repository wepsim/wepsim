
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text

main:
    #
    # Arithmetic instructions
    #

    # Add: add, addi
    li      a0, 3
    li      a1, 2
    add     a2, a0, a1   # a2 = 3 + 2
    addi    a2, a0, 10   # a2 = 3 + 10

    # Subtract: sub
    li      a0, 0
    li      a1, 2
    sub     a2, a0, a1   # a2 = 0 - 2

    # Multiply: mul
    li      a0, 5
    li      a1, 2
    mul     a2, a0, a1   # a2 = 5 * 2

    # Divide Signed: div
    li      a0, 6
    li      a1, 2
    div     a2, a0, a1   # a2 = 6 / 2

    # Remainder Signed: rem
    li      a0, 5
    li      a1, 2
    rem     a2, a0, a1   # a2 = 5 % 2


    #
    # Logic instructions
    #

    # Or: or, ori
    li      a0, 0xF875
    li      a1, 0x00FF
    or      a2, a0, a1    # a2 = 0xF875 | 0x00FF
    ori     a3, a0, 0xFF  # a2 = 0xF875 | 0x00FF

    # And: and, andi
    li      a0, 0xF875
    li      a1, 0x00FF
    and     a2, a0, a1    # a2 = 0xF875 & 0x00FF
    andi    a3, a0, 0xFF  # a2 = 0xF875 & 0x00FF

    # Xor: xor, xori
    li      a0, 0xF875
    li      a1, 0x00FF
    xor     a2, a0, a1    # a2 = 0xF875 ^ 0x00FF
    xori    a3, a0, 0xFF  # a2 = 0xF875 ^ 0x00FF


    #
    # Shift instructions
    #

    # Shift Right Logical: srl, srli
    li      a0, 0x010
    li      a1, 0x3
    srl     a2, a0, a1   # a2 = 0x010 >> 3
    srli    a2, a0, 3    # a2 = 0x010 >> 3

    # Shift Left Logical: sll, slli
    li      a0, 0x010
    li      a1, 0x3
    sll     a2, a0, a1   # a2 = 0x010 << 3
    slli    a2, a0, 3    # a2 = 0x010 << 3

    # Shift Right Arithmetic: sra, srai
    li      a0, 0x010
    li      a1, 0x3
    sra     a2, a0, a1   # a2 = 0x010 >> 3
    srai    a2, a0, 3    # a2 = 0x010 >> 3


    # return
    jr      ra

