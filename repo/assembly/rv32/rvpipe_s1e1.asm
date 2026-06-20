#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text

main:
    # Add 2 and 3
    addi    a0, x0, 2
    addi    a1, x0, 3
    add     a2, a0, a1   # a2 = 2 + 3 = 5
    add     a1, a0, a2   # a1 = 2 + a2 = 7
    add     a1, a0, a2   # a1 = 2 + a2 = 7
    add     a2, a0, a1   # a2 = 2 + a1 = 9
    add     a2, a0, a1   # a2 = 2 + a1 = 9
    add     a1, a0, a2   # a1 = 2 + a2 = 11
    add     a1, a0, a2   # a1 = 2 + a2 = 11
    add     a2, a0, a1   # a2 = 2 + a1 = 13
    add     a2, a0, a1   # a2 = 2 + a1 = 13
    add     a1, a0, a2   # a1 = 2 + a2 = 15
    add     a1, a0, a2   # a1 = 2 + a2 = 15
    add     a2, a0, a1   # a2 = 2 + a1 = 17
    add     a2, a0, a1   # a2 = 2 + a1 = 17
    nop # finish
