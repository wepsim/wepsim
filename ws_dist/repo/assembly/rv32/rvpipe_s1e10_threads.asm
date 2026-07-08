
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   # event handler table
     vector:   .word rt_i0
               .word rt_div0
               .word rt_sys

   # point to the process table entry of the running thread
     previous: .word 0
   # point to the kmain stack
     current:  .word 0
   # kernel return sepc (kmain's sepc after sys_thstart)
     kret:     .word 0

   # number of process in ptable
     pcounter: .word 0
   # processes table (slice + sp + pc + id + free slot) x n
     ptable:   .word 5, 0x1FFFFFFF, 0, 1, 0
               .word 5, 0x2FFFFFFF, 0, 2, 0


.ktext
sys_prt_str: li   zero 0
             mv   x28 a0
             beq  x28 zero end1
         b5: lb   x29 0(x28)
             beq  x29 zero end1
             out  x29 0x1000
             addi x28 x28 1
             beq  zero zero  b5
       end1: sret

sys_prt_ch:  out  a0 0x1000
             sret

sys_thcreat: # pcounter++
             lw   x6 pcounter(x0)
             addi x6 x6 1
             sw   x6 pcounter(x0)
             # x29 = &(ptable[pcounter])
             addi x6 x6 -1
             li   x5 20
             mul  x6 x6 x5
             la   x29 ptable
             add  x29 x29 x6
             # *(x29) = { 5, a0, a1, pcounter, 0 }
             li   x6 5
             sw   x6  0(x29)   # slice
             sw   a0 4(x29)    # sp
             sw   a1 8(x29)    # pc
             lw   x6 pcounter(x0)
             sw   x6  12(x29)  # id
             li   x6 0
             sw   x6 16(x29)   # free
             # return
             sret

sys_thstart: # id -> PCB address
             mv   x6 a0
             addi x6 x6 -1
             li   x5 20
             mul  x6 x6 x5
             la   x29 ptable
             add  x29 x29 x6
             sw   x29 current(x0)
             # save kernel's sepc (return to kmain)
             csrr x28 sepc
             sw   x28 kret(x0)
             # previous <-> thread
             lw   x28 4(x29)    # load thread's sp
             sw   sp previous(x0)
             mv   sp x28
             # set sepc to thread's initial PC
             lw   x28 8(x29)
             csrw sepc x28
             nop
             nop
             sret

sys_thexit:  # pA->free = true
             lw  x29 current(x0)
             li  x28 1
             sw  x28 16(x29)
             # pA = scheduler() // pA->next
             lw  x28 12(x29)
             lw  x29 pcounter(x0)
             rem x28 x28 x29
             li   x5 20
             mul x28 x28 x5
             la  x29 ptable
             add x29 x29 x28
             sw  x29 current(x0)
             # if pA->free == true return
             lw  x29 current(x0)
             lw  x28 16(x29)
             li  x6 1
             beq x28 x6 end2
             # cpu.sp = pA->sp
             lw  x29 current(x0)
             lw  sp 4(x29)
             # cpu.pc = pA->pc
             lw  x28 8(x29)
             csrw sepc x28
             nop
             nop
             # return
             sret
       end2: # exit from both threads
             lw  x28 kret(x0)
             csrw sepc x28
             li  x28 0
             sw  x28 current(x0)
             lw  sp previous(x0)
             # return
             sret

   rt_div0:  sret

   rt_sys:   # 1.- ecall
             li   x29 4
             beq  a7 x29 sys_prt_str
             li   x29 11
             beq  a7 x29 sys_prt_ch
             li   x29 30
             beq  a7 x29 sys_thcreat
             li   x29 20
             beq  a7 x29 sys_thstart
             li   x29 10
             beq  a7 x29 sys_thexit
             sret

   rt_i0:    # 2.- interrupt
             # if pA == NULL return
             lw   x29 current(x0)
             beq  x29 zero e_i0
             # pA->r = pA->r - 1
             lw   x28 0(x29)
             addi x28 x28 -1
             sw   x28 0(x29)
             # if pA->r != 0 return
             bne  x28 zero e_i0
       r_i0: # pA->r = 5 (SLICE=5)
             li   x28 5
             sw   x28 0(x29)
             # pA->sp = cpu.sp
             sw   sp 4(x29)
             # pA->pc = sepc
             csrr x28 sepc
             sw   x28 8(x29)
             # pA = scheduler() // pA->next
             lw   x28 12(x29)
             lw   x29 pcounter(x0)
             rem  x28 x28 x29
             li   x5 20
             mul  x28 x28 x5
             la   x29 ptable
             add  x29 x29 x28
             sw   x29 current(x0)
             # cpu.sp = pA->sp
             lw   x29 current(x0)
             lw   sp 4(x29)
             # cpu.pc = pA->pc
             lw   x28 8(x29)
             csrw sepc x28
             nop
             nop
             # return
       e_i0: sret


   kmain:    # 1.- setup process table
             la a0 0x1FFF
             la a1 thread1
             li a7 30
             ecall

             la a0 0x2FFF
             la a1 thread2
             li a7 30
             ecall

             # 2.- enable i0 each 580 ticks
   begin_rr: li  x5 0
             out x5 0x1104
             li  x5 50
             out x5 0x1108

             # 3.- start for thread 1
             la  a0 1
             li  a7 20
             ecall

             # 4.- disable i0
   end_rr:   li  x5 0
             out x5 0x1104
             li  x5 0
             out x5 0x1108

             # 5.- the end
             jr  ra


.text
    thread1:
           # thread 1
           li   s0 0
       c1: li   s1 101
           bge  s0 s1 e1
           # print 'a'
           li   a0 'a'
           li   a7 11
           ecall
           # +1
           addi s0 s0 1
           beq  zero zero c1
       e1: li   a7 10
           ecall

    thread2:
           # thread 2
           li  s2 0
       c2: li  s3 102
           bge s2 s3 e2
           # print 'b'
           li  a0 'b'
           li  a7 11
           ecall
           # +1
           addi s2 s2 1
           beq  zero zero c2
       e2: li   a7 10
           ecall

