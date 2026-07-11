
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main:
    # ============================================================
    # Test 1: BEQ taken (x0 == x0, always branches)
    # ============================================================
    addi a0, x0, 0          # a0 = 0
    addi t0, x0, 5          # t0 = 5
    beq  x0, x0, test1_done # should branch (skip addi)
    addi a0, a0, 1          # skipped
 test1_done:
    addi a0, a0, 10         # a0 = 0 + 10 = 10

    # ============================================================
    # Test 2: BEQ not taken (a0=10 != t0=5)
    # ============================================================
    beq  a0, t0, test2_done # should NOT branch
    addi a0, a0, 20         # a0 = 10 + 20 = 30
 test2_done:
    # a0 should be 30

    # ============================================================
    # Test 3: BEQ in a loop (sum 0..4 = 10)
    # ============================================================
    addi t1, x0, 0          # i = 0
    addi t2, x0, 5          # limit = 5
    addi a1, x0, 0          # sum = 0
 loop3:
    add  a1, a1, t1         # sum += i
    addi t1, t1, 1          # i++
    beq  t1, t2, loop3_done # if i == 5 exit
    beq  x0, x0, loop3      # else loop (always taken)
 loop3_done:
    # a1 should be 10

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
    # a0 = 30, a1 = 10, t0 = 5, t1 = 5
    # Program ends when PC goes out of .text bounds
