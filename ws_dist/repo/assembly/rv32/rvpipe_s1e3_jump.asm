
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main:
    # ============================================================
    # Test 4: JAL (jump and link to subroutine)
    # ============================================================
    addi a0, a0, 0          # a0 = 30 (already, but ensure)
    jal  x0, skip_over     # jump to skip_over (no link, rd=x0)
    addi a0, a0, 100        # skipped
 skip_over:
    # a0 should still be 30

    # ============================================================
    # Test 5: J (pseudoinstruction, expands to jal x0)
    # ============================================================
    j final               # jump to final
    addi a0, a0, 200        # skipped

 final:
    # a0 = 0
    nop
