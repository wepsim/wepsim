
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 func:
    addi a0, a0, 7            # a0 = a0 + 7
    jr ra                   # return
 main:
    # ============================================================
    # Test 5: JALR via function call with jal ra / jr ra
    # ============================================================
    addi  sp, sp, -4
    sw    ra, 0(sp)         # save ra

    addi a0, a0, 5            # a0 = 5
    jal ra, func             # call func, ra = PC+4
    addi a0, a0, 30           # a0 = 42 (after returning)

    # Second call
    addi a0, a0, 200          # a0 = 242
    jal ra func             # call func again
    addi a0, a0, 50           # a0 = 299 (after returning)

    # Return
    lw    ra, 0(sp)
    addi  sp, sp, 4
    jr ra

