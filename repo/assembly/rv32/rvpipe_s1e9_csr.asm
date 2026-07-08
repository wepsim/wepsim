#
# WepSIM (https://wepsim.github.io/wepsim/)
#
# CSR instruction example for the RV32 pipeline (with Immediates)
#
# Demonstrates:
#   csrr    - read CSR (pseudo: csrrs rd, x0, csr)
#   csrrw   - write CSR, read old value
#   csrrs   - set bits in CSR
#   csrrc   - clear bits in CSR
#   csrrwi  - write CSR immediate, read old value
#   csrrsi  - set bits in CSR immediate
#   csrrci  - clear bits in CSR immediate
#

.text

main:
    # 1) CSR Read: read sstatus
    csrr    t0, sstatus          # t0 = sstatus (should be 0 initially)

    # 2) CSR Read/Write: write sie = 0x1, old value to t1
    li      t2, 0x1
    csrrw   t1, sie, t2          # t1 = old sie, sie = 1

    # 3) CSR Read/Write: confirm sie is now 1
    csrr    t3, sie              # t3 = sie (should be 1)

    # 4) CSR Set: set bit 3 in sie
    li      t4, 0x8
    csrrs   t5, sie, t4          # t5 = old sie, sie = sie | 8 = 9
    csrr    t6, sie              # t6 = sie (should be 9)

    # 5) CSR Clear: clear bit 0 in sie
    li      s0, 0x1
    csrrc   s1, sie, s0          # s1 = old sie, sie = sie & ~1 = 8
    csrr    s2, sie              # s2 = sie (should be 8)


    # --- NUEVA SECCIÓN CON INMEDIATOS ---

    # 6) CSR Read/Write Immediate: escribe 0x2 directamente en sie, guarda valor viejo (8) en s3
    csrrwi  s3, sie, 0x2         # s3 = 8 (viejo), sie = 2
    csrr    s4, sie              # s4 = sie (should be 2)

    # 7) CSR Set Immediate: enciende el bit 4 (0x10) directamente usando un inmediato
    csrrsi  s5, sie, 0x10        # s5 = 2 (viejo), sie = 2 | 16 = 18 (0x12)
    csrr    s6, sie              # s6 = sie (should be 18)

    # 8) CSR Clear Immediate: apaga el bit 1 (0x2) directamente usando un inmediato
    csrrci  s7, sie, 0x2         # s7 = 18 (viejo), sie = 18 & ~2 = 16 (0x10)
    csrr    s8, sie              # s8 = sie (should be 16)

    nop # finish