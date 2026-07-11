
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
  res1: .word 0x12345678

.text
main:
    li  a1, 5
    li  a0, res1
    lw  a3, 0(a0)

    add a4, a3, a1

    # return
    jr  ra

