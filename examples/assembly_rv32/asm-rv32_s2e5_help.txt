
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word -1
            .word -1
            .word rt_sys

.ktext
sys_prt_str: li   x1  1
             li   x0  0
             beq  x26 x0 end1
         b5: lb   x27 0(x26)
             beq  x27 x0 end1
             out  x27 0x1000
             add  x26 x26 x1
             beq  x0  x0  b5
       end1: sret

sys_prt_int: li   x1 1
             # push_byte('\0')
             sb   x0 0(sp)
             sub  sp sp x1
             bge  x26 x0 b3
             li   x1  '-'
             out  x1  0x1000
             li   x1  -1
             mul  x26 x26 x1
         b3: # push_byte(rem(x,10)+48)
             # x = div(x,10)
             li   x1 10
             rem  x27 x26 x1
             div  x26 x26 x1
             li   x1 48
             add  x27 x27 x1
             li   x1 1
             sb   x27 0(sp)
             sub  sp sp x1
             bne  x26 x0 b3
         f3: # print_string(sp)
             add  sp sp x1
             lb   x27 0(sp)
             beq  x27 x0 f2
             out  x27 0x1000
             beq  x0  x0 f3
         f2: sret

   rt_sys:   # 1.- syscall
             add  x26 a0 x0
             li   x27 4
             beq  a7 x27 sys_prt_str
             li   x27 1
             beq  a7 x27 sys_prt_int
             sret


.text

factorial:
           # notify: TIP: Calling conventions
           # notify:  Summary: A subrutine might modify t0..t9 but keep the value of everything else.
           # notify:
           # notify:  If subrutine A calls B then:
           # notify:  >* B should save values it might need on all registers but t0..t9, at the beginning.
           # notify:   * B should restore the saved values, just before "jr ra"
           # notify:
           # notify: Factorial need to save 3 registers: ra, fp and a local variable:
           # notify:  * SP = SP - 3*4
           # notify:  * Memory[SP+8] = RA
           # notify:  * Memory[SP+4] = FP
           # notify:  * FP = SP + 4

           addi sp sp -12
           sw   ra 8(sp)
           sw   s0 4(sp)
           addi s0 sp 4

           # if (a0 < 2):
           #     return 1
           li   t0 2
           bge  a0 t0 b_else
           li   a0 1
           beq  x0 x0  b_efs
           # else:
           #    return a0 * factorial(a0 - 1)

   b_else:
           # notify: TIP: Calling conventions
           # notify:  Summary: A subrutine might modify t0..t9 but keep the value of everything else.
           # notify:
           # notify:  If subrutine A calls B then:
           # notify:  >* A should save values on registers t0..t9 it needs, before parameter passing and "jal"
           # notify:   * A should restore the saved values, just after "jal"
           # notify:
           # notify: Factorial save a0 as local variable:
           # notify:  * Memory[SP+0] = A0

           sw   a0 -4(s0)
           addi a0 a0 -1
           jal  ra factorial

           # notify: TIP: Calling conventions
           # notify:  Summary: A subrutine might modify t0..t9 but keep the value of everything else.
           # notify:
           # notify:  If subrutine A calls B then:
           # notify:   * A should save values on registers t0..t9 it needs, before parameter passing and "jal"
           # notify:  >* A should restore the saved values, just after "jal"
           # notify:
           # notify: Factorial restore a0 on x28
           # notify:  * x28 = Memory[SP+0]

           lw   x28 -4(s0)
           mul  a0 a0 x28

   b_efs:
           # notify: TIP: Calling conventions
           # notify:  Summary: A subrutine might modify t0..t9 but keep the value of everything else.
           # notify:
           # notify:  If subrutine A calls B then:
           # notify:   * B should save values it might need on all registers but t0..t9, at the beginning.
           # notify:  >* B should restore the saved values, just before "jr ra"
           # notify:
           # notify: Factorial restore the ra and fp values.
           # notify:  * SP = SP + 3*4
           # notify:  * RA = Memory[SP+8]
           # notify:  * FP = Memory[SP+4]

           # restore the "stack frame"
           lw   ra 8(sp)
           lw   s0 4(sp)
           addi sp sp 12

           # return a0
           jr ra


   main:
           addi  sp, sp, -4
           sw    ra, 0(sp)

           # a0 = factorial(2)
           li  a0 2
           jal ra factorial

           # print_int(a0)
           li   a7 1
           ecall

           # exit
           li   a7 10
           ecall

           lw    ra, 0(sp)
           addi  sp, sp, 4

           # return
           jr    ra

