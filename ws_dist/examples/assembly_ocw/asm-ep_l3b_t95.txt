
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
  # boolean
    # bool_t b1 ;
    b1: .space 1
    # bool_t b2 = false;
    b2: .byte 0

  # caracter
    # char c1 ;
    c1: .byte  0
    # char c2 = 'x';
    c2: .byte 'x'

  # enteros
    # int res1 ;
    res1: .space 4
    # int op1 = -10
    op1:  .word -10

  # coma flotante
    # float  f0 ;
    f0: .float 0.0
    # float  f1 = 1.2 ;
    f1: .float 1.2
    # double d2 = 3.0e10 ;
    d2: .double 3.0e10

