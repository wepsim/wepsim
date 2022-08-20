
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

   # number of process in ptable
     pcounter: .word 0
   # processes table (slice + address + id + free slot) x n
     ptable:   .word 5, 0x1FFFFFFF, 1, 0
               .word 5, 0x2FFFFFFF, 2, 0


.ktext
sys_prt_str: li   $0 0
             beq  $26 $0 end1
         b5: lb   $27 ($26)
             beq  $27 $0 end1
             out  $27 0x1000
             addi $26 $26 1
             b  b5
       end1: reti

sys_prt_ch:  out  $a0 0x1000
             reti

sys_thcreat: # pcounter++
             lw   $1 pcounter
             addi $1 $1 1
             sw   $1 pcounter
             # $27 = &(ptable[pcounter])
             sub  $1 $1 1
             mul  $1 $1 16
             la   $27 ptable
             add  $27 $27 $1
             # *($27) = { 5, $a0, pcounter, 0 }
             li  $1 5
             sw  $1  0($27)
             sw  $a0 4($27)
             lw  $1 pcounter
             sw  $1  8($27)
             li  $1 0
             sw  $1 12($27)
             # default stack: 0, pc
             sw  $0  0($a0)
             sw  $a1 4($a0)
             # return
             reti

sys_thstart: # id -> PCB address
             move $1 $a0
             sub  $1 $1 1
             mul  $1 $1 16
             la   $27 ptable
             add  $27 $27 $1
             sw   $27 current
             # previous <-> thread
             lw   $26 4($27)
             sw   $29 previous
             move $29 $26
             reti

sys_thexit:  # pA->free = true
             lw  $27 current
             li  $26 1
             sw  $26 12($27)
             # pA = scheduler() // pA->next
             lw  $26 8($27)
             lw  $27 pcounter
             rem $26 $26 $27
             mul $26 $26 16
             la  $27 ptable
             add $27 $27 $26
             sw  $27 current
             # if pA->free == true return
             lw  $27 current
             lw  $26 12($27)
             li  $1 1
             beq $26 $1 end2
             # cpu.sp = pA->sp
             lw  $27 current
             lw  $29 4($27)
             # return
             reti
       end2: # exit from both threads
             li $26 0
             sw $26 current
             lw $29 previous
             # return
             reti

   rt_div0:  reti

   rt_sys:   # 1.- syscall
             move $26 $a0
             li   $27 4
             beq  $v0 $27 sys_prt_str
             li   $27 11
             beq  $v0 $27 sys_prt_ch
             li   $27 30
             beq  $v0 $27 sys_thcreat
             li   $27 20
             beq  $v0 $27 sys_thstart
             li   $27 10
             beq  $v0 $27 sys_thexit
             reti

   rt_i0:    # 2.- interrupt
             # if pA == NULL return
             lw  $27 current
             beq $27 $0 e_i0
             # pA->r = pA->r - 1
             lw  $26 ($27)
             sub $26 $26 1
             sw  $26 ($27)
             # if pA->r != 0 return
             bne $26 $0 e_i0
       r_i0: # pA->r = 5 (SLICE=5)
             li  $26 5
             sw  $26 ($27)
             # pA->sp = cpu.sp
             sw  $29 4($27)
             # pA = scheduler() // pA->next
             lw  $26 8($27)
             lw  $27 pcounter
             rem $26 $26 $27
             mul $26 $26 16
             la  $27 ptable
             add $27 $27 $26
             sw  $27 current
             # cpu.sp = pA->sp
             lw  $27 current
             lw  $29 4($27)
             # return
       e_i0: reti


   kmain:    # 1.- setup process table
             la $a0 0x1FFFFFFF
             la $a1 thread1
             li $v0 30
             syscall

             la $a0 0x2FFFFFFF
             la $a1 thread2
             li $v0 30
             syscall

             # 2.- enable i0 each 550 ticks
   begin_rr: li  $t0 0
             out $t0 0x1104
             li  $t0 550
             out $t0 0x1108

             # 3.- start for thread 1
             la $a0 1
             li $v0 20
             syscall

             # 4.- disable i0
   end_rr:   li  $t0 0
             out $t0 0x1104
             li  $t0 0
             out $t0 0x1108

             # 5.- the end
             jr $ra


.text
    thread1:
           # thread 1
           li  $t0 0
       c1: li  $t1 101
           bge  $t0 $t1 e1
           # print 'a'
           li   $a0 'a'
           li   $v0 11
           syscall
           # +1
           addi $t0 $t0 1
           b c1
       e1: li  $v0 10
           syscall

    thread2:
           # thread 2
           li  $t2 0
       c2: li  $t3 102
           bge $t2 $t3 e2
           # print 'b'
           li  $a0 'b'
           li  $v0 11
           syscall
           # +1
           addi $t2 $t2 1
           b c2
       e2: li  $v0 10
           syscall

