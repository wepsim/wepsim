
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
  accu: addi  sp, sp, -4
        sw    a0, 0(sp)
        li    a1, 0
    b1: beqz  a0, f1
        add   a1, a1, a0
        addi  a0, a0, -1
        beq   zero, zero, b1
    f1: lw    a0, 0(sp)
        addi  sp, sp, 4
        jr    ra

main:   addi  sp, sp, -4
        sw    ra, 0(sp)

        li    a0, 2
        jal   ra, accu

        lw    ra, 0(sp)
        addi  sp, sp, 4
        jr    ra

