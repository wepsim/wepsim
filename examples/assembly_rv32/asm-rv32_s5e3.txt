
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

### kernel ###

.kdata
   vector:  .word rt_i0
            .word rt_div0
            .word rt_sys

   msgi0:   .string "INT: 0\n"
   msgi1:   .string "FPE: */0\n"

.ktext
sys_print:  li   zero 0
            li   t5 1
            beq  t3 zero end1
        b5: lb   t4 0(t3)
            beq  t4 zero end1
            out  t4 0x1000
            add  t3 t3 t5
            beq  zero zero b5
      end1: sret

  rt_i0:    # 1.- interruption
            la   t3 msgi0
            beq  zero zero sys_print

  rt_div0:  # 2.- exception
            la   t3 msgi1
            beq  zero zero sys_print

  rt_sys:   # 3.- syscall
            mv   t3 a0
            li   t4 4
            beq  a7 t4 sys_print
            sret

### user ###

.data
   line1: .string "uno\n"
   line2: .string "dos y tres\n"
   lines: .word line1, line2

.text
main:
   la a0 lines
   lw a0 0(a0)
   li a7 4
   ecall
