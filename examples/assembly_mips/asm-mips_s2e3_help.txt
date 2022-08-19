
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
        float1: .word 0x7F800000

.text
main:
        # 1.- to load float in hex form
        lw   $t8 float1

        # 2.- to load masks
        #   sign  -> 1000 0000 0000 0000 ...
        li  $t5 0x8000
        sll $t5 $t5 16
        #   exp.  -> 0111 1111 1000 0000 ...
        li  $t6 0x7F80
        sll $t6 $t6 16
        #   mant. -> 0000 0000 0111 1111 ...
        li  $t7 0x001F
        sll $t7 $t7 16
        ori $t0 $0 0xFFFF
        or  $t7 $t7 $t0

        # 3.- to apply mask
        #   sign  -> x000 0000 0000 0000 ...
        and  $t2 $t8 $t5
        #   exp.  -> 0xxx xxxx 1000 0000 ...
        and  $t3 $t8 $t6
        #   mant. -> 0000 0000 0xxx xxxx ...
        and  $t4 $t8 $t7

        # 4.- to move as l.s.b.
        srl  $t2 $t2 31
        srl  $t3 $t3 23

        # end
        jr $ra

