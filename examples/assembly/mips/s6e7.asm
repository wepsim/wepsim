
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
  a1: .float 3.5
  a2: .float 1.5

.text
main:
    #
    # Arithmetic instructions
    #

    # add:      $5 = 3.5 + 1.5
    lw  $2 a1
    lw  $3 a2
    add.s $5 $2 $3

    # subtract: $5 = 3.5 - 1.5
    lw  $2 a1
    lw  $3 a2
    sub.s $5 $2 $3

    # multiply: $5 = 3.5 * 1.5
    lw  $2 a1
    lw  $3 a2
    mul.s $5 $2 $3

    # divide:   $5 = 3.5 / 1.5
    lw  $2 a1
    lw  $3 a2
    div.s $5 $2 $3

    # convert:  $5 = (int) 3.5
    lw  $2 a1
    cvt.w.s $5 $2

    # convert:  $5 = (float32) 3
    li  $2  3
    cvt.s.w $5 $2

    # class:  $5 = class(3.5)
    lw  $2 a1
    fclass.s $5 $2

