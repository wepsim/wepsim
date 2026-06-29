
# WepSIM (https://wepsim.github.io/wepsim/)
#
# Keyboard example for the RV32 pipeline
# Uses in/out instructions to read from keyboard and write to display
#
# Memory map:
#   0x0100: KBDR (Keyboard Data Register) - read key here
#   0x0104: KBSR (Keyboard Status Register) - check if key is available
#   0x1000: DDR (Display Data Register) - write char here

.text

main:
    # Wait for a keypress
loop:
    in      t0, 0x0104    # Read KBSR (status)
    beqz    t0, loop      # Wait until a key is ready
    
    # Read the key and display it
    in      t0, 0x0100    # Read KBDR (key data)
    out     t0, 0x1000    # Write to screen (DDR)

    # End
    jr      ra
