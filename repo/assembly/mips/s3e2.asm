
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word rti0
            .word rti1
            .word sys

   msgi0:   .asciiz "Interruption 0."
   msgi1:   .asciiz "Interruption 1."

.ktext
sys_print:
            li   $0 0
            li   $1 1
            beq  $26 $0 end1
        b5: lb   $27 ($26)
            beq  $27 $0 end1
            out  $27 0x1000
            add  $26 $26 $1
            b  sys_print
      end1: reti

  rti0:
            la   $26 msgi0
            b    sys_print

  rti1:
            la   $26 msgi1
            b    sys_print

  sys:
            move $26 $a0
            li   $27 4
            beq  $v0 $27 sys_print
            reti


.data
    helloworld: .asciiz "hello world..."

.text
    main:  # test syscall
           la  $a0 helloworld
           li  $v0 4
           syscall

           # the end
           jr $ra

