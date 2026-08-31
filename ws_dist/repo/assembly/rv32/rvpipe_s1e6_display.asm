
# WepSIM (https://wepsim.github.io/wepsim/)
#
# Hello World example for the RV32 pipeline
# Uses in/out instructions to write to display
#
# Memory map:
#   0x1000: DDR (Display Data Register) - write char here

.data
msg:    .string "Hello World!\n"

.text

# print: prints a null-terminated string pointed by a0
print:
    lbu     t1, 0(a0)
    beq     t1, x0, print_end
    out     t1, 0x1000
    addi    a0, a0, 1
    j       print
print_end: jr      ra

main:
    # Print "Hello World!\n"
    la      a0, msg
    jal     ra, print