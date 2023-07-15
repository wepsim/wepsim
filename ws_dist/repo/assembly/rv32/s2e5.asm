
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
           sw   a0 -4(s0)
           addi a0 a0 -1
           jal  ra factorial

           lw   x28 -4(s0)
           mul  a0 a0 x28

   b_efs:
           # restore the "stack frame"
           lw   ra 8(sp)
           lw   s0 4(sp)
           addi sp sp 12

           # return a0
           jr ra


     main:
           # a0 = factorial(2)
           li  a0 2
           jal ra factorial

           # print_int(a0)
           li   a7 1
           ecall

           # exit
           li   a7 10
           ecall

