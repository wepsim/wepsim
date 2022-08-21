
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

fibonacci:
           addi sp sp -16
           sw   ra 8(sp)
           sw   s0 4(sp)
           sw   s1 0(sp)

           # if (a0 < 3) return 1
           mv   s0 a0
           li   a0 1
           li   s1 2
           ble  s0 s1 fend1

           # s1 = fibonacci(a0 - 1)
           addi a0 s0 -1
           jal  ra fibonacci
           mv   s1 a0

           # v0 = fibonacci(a0 - 2)
           addi a0 s0 -2
           jal  ra fibonacci

           # return s1+a0
           add  a0 s1 a0

    fend1: lw   ra 8(sp)
           lw   s0 4(sp)
           lw   s1 0(sp)
           addi sp sp 16

           # return a0
           jr ra


     main:
           addi  sp, sp, -4
           sw    ra, 0(sp)

           # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
           # notify: TIP: fibonacci(3)
           # notify: To call a subrutine:
           # notify: <ul>
           # notify: <li> Place argument on a0 (li a0 3)
           # notify: <li> Call subrutine with "jal ra fibonacci" where ra stores the return address
           # notify: <li> After returning from subrutine, return value is on register a0
           # notify: </ul>

           # a0 = fibonacci(3)
           li  a0 3
           jal ra fibonacci

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
