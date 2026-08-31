
# WepSIM (https://wepsim.github.io/wepsim/)
#
# Timer interrupt example for the RV32 pipeline
# Uses the clock/timer device to fire periodic interrupts
#
# Memory map:
#   0x1100: IOSR (IO State Register)
#   0x1104: IOCR (IO Control Register) - select timer (0-7)
#   0x1108: IODR (IO Data Register) - set period in clock cycles
#   0x1000: DDR (Display Data Register) - write char here
#
# The interrupt handler writes "TICK" to the display
# every time the timer fires.
#

.kdata
   vector:  .word timer_handler
            .word timer2_handler

.ktext
timer_handler:
            # Print "!"
            li      t0, 0x21
            out     t0, 0x1000
            sret
timer2_handler:
            # Print "?"
            li      t0, 0x3F
            out     t0, 0x1000
            sret

.text
main:
            # Configure timer 0 with period = 20 clock cycles
            li      t0, 0              # timer 0
            out     t0, 0x1104         # IOCR = 0
            li      t0, 20             # period = 20 cycles
            out     t0, 0x1108         # IODR = 20

            # Configure timer 1 with period = 40 clock cycles
            li      t0, 1              # timer 1
            out     t0, 0x1104         # IOCR = 1
            li      t0, 40             # period = 40 cycles
            out     t0, 0x1108         # IODR = 40

            # Main loop: count in a register and print "."
            li      t1, 100
loop:
            addi    t1, t1, -1
            li      t2, 0x2e           # '.'
            out     t2, 0x1000
            bnez    t1, loop
