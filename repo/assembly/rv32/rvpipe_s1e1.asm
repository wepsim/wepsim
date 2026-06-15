#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text

main:
    # Add 2 and 3
    li      a0, 2
    li      a1, 3
    add     a2, a0, a1   # a2 = 2 + 3
    add     a2, a0, a2   # a2 = 2 + a2
    add     a2, a0, a2   # a2 = 2 + a2

    # return
    jr      ra
