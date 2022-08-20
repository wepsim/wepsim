
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

### kernel ###

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

  rt_div0:  # 2.- exception
            la   $26 msgi1
            b    sys_print

  rt_sys:   # 3.- syscall
            move $26 $a0
            li   $27 4
            beq  $v0 $27 sys_print
            reti

### user ###

.data
   line1: .asciiz "uno\n"
   line2: .asciiz "dos y tres\n"
   lines: .word line1, line2

.text
main:
   lw $a0 lines
   li $v0 4
   syscall
