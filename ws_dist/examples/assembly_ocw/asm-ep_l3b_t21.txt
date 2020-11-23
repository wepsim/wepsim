
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word -1
            .word -1
            .word rt_sys

.ktext
sys_prt_str: li   $1  1
             li   $0  0
             beq  $26 $0 fin1
         b5: lb   $27 ($26)
             beq  $27 $0 fin1
             out  $27 0x1000
             add  $26 $26 $1
             b  b5
       fin1: reti
      
sys_prt_int: li   $1 1
             # push_byte('\0')
             sb   $0 ($sp)
             sub  $sp $sp $1
             bge  $26 $0 b3
             li  $1  '-'
             out $1  0x1000
             li  $1  -1
             mul $26 $26 $1
         b3: # push_byte(rem(x,10)+48)
             # x = div(x,10)
             li   $1 10
             rem  $27 $26 $1
             div  $26 $26 $1
             li   $1 48
             add  $27 $27 $1
             li   $1 1
             sb   $27 ($sp)
             sub  $sp $sp $1
             bne  $26 $0 b3
         f3: # print_string($sp)
             add  $sp $sp $1
             lb   $27 ($sp)
             beq  $27 $0 f2
             out  $27 0x1000
             b f3
         f2: reti

   rt_sys:   # 1.- syscall
             move $26 $a0
             li   $27 4
             beq  $v0 $27 sys_prt_str
             li   $27 1
             beq  $v0 $27 sys_prt_int
             reti 


.data
  msg_hola: .asciiz "hola mundo\n"

.text
  main:
        # printf("Hola mundo\n") ;
        li $v0 4
        la $a0 msg_hola
        syscall

