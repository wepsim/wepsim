
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word rt_i0
            .word rt_div0
            .word rt_sys

   msgi0:   .asciiz "INT: 0\n"
   msgi1:   .asciiz "FPE: */0\n"

.ktext
sys_print:  li   $0 0
            li   $1 1
            beq  $26 $0 end1
        b5: lb   $27 ($26)
            beq  $27 $0 end1
            out  $27 0x1000
            add  $26 $26 $1
            b  b5
      end1: reti

  rt_i0:    # 1.- interruption
            la   $26 msgi0
            b    sys_print

  rt_div0: # 2.- exception
            la   $26 msgi1
            b    sys_print

  rt_sys:   # 3.- syscall
            move $26 $a0
            li   $27 4
            beq  $v0 $27 sys_print
            reti


.data
    helloworld: .asciiz "hello world...\n"

.text
    main:  # test syscall
           la  $a0 helloworld
           li  $v0 4
           syscall

           # test div 0/0
           li  $t0 0
           li  $t1 0
           div $t1 $t1 $t0

           # test int0
           li  $t0 0
           out $t0 0x1104
           li  $t0 900
           out $t0 0x1108

           li  $t0 0
           li  $t1 1
           li  $t2 80
       b1: beq $t0 $t2 e1
           add $t0 $t0 $t1
           b b1

       e1: li  $t0 0
           out $t0 0x1104
           out $t0 0x1108

           # the end
           jr $ra

