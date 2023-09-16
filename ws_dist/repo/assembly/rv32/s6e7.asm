
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
  la1: .float 3.5
  la2: .float 1.5

.text
main:
    #
    # Arithmetic instructions
    #

    # add:      x5 = 3.5 + 1.5
    li  x2, la1
    lw  x2, 0(x2)
    li  x3, la2
    lw  x3, 0(x3)
    fadd.s x5 x2 x3

    # subtract: x5 = 3.5 - 1.5
    li  x2, la1
    lw  x2, 0(x2)
    li  x3, la2
    lw  x3, 0(x3)
    fsub.s x5 x2 x3

    # multiply: x5 = 3.5 * 1.5
    li  x2, la1
    lw  x2, 0(x2)
    li  x3, la2
    lw  x3, 0(x3)
    fmul.s x5 x2 x3

    # divide:   x5 = 3.5 / 1.5
    li  x2, la1
    lw  x2, 0(x2)
    li  x3, la2
    lw  x3, 0(x3)
    fdiv.s x5 x2 x3

    # convert:  x5 = (int) 3.5
    li  x2, la1
    lw  x2, 0(x2)
    fcvt.w.s x5 x2

    # convert:  x5 = (float32) 3
    li  x2, 3
    fcvt.s.w x5 x2

    # class:    x5 = class(3.5)
    li  x2, la1
    lw  x2, 0(x2)
    fclass.s x5 x2

