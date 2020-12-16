
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
             li   $1  '-'
             out  $1  0x1000
             li   $1  -1
             mul  $26 $26 $1
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


.text

        f: 
           # crear "stack frame"
           addi $sp, $sp, -4
           sw   $fp, ($sp)
           move $fp, $sp
           addi $sp, $sp, -16

           # tmp = n1+n2+n3+n4+n5+n6
           add  $t0, $a0, $a1
           add  $t0, $t0, $a2
           add  $t0, $t0, $a3
           lw   $t1, 4($fp)
           add  $t0, $t0, $t1
           lw   $t1, 8($fp)
           add  $t0, $t0, $t1

           # for (k=0; k<3; k++)
           #      v[i] = tmp
           li   $t1, 0         # indice
           move $t2, $fp
           addi $t2, $t2, -16  # desplaz.
           li   $t3, 3
    bucle: bgt  $t1, $t3, fin
           sw   $t0, ($t2)
           addi $t2, $t2, 4
           addi $t1, $t1, 1
           b bucle
      fin: # $v0 = v[1]
           lw   $v0, -12($fp)

           # finalizar "stack frame"
           lw   $fp,    ($fp)
           addi $sp, $sp, 20

           # return $v0
           jr $ra


     main:
           # v1 = f(3, 4, 23, 12, 6, 7)
           li   $a0, 3
           li   $a1, 4
           li   $a2, 23
           li   $a3, 12
           addi $sp, $sp, -8
           li   $t0, 6
           sw   $t0, ($sp)
           li   $t0, 7
           sw   $t0, 4($sp)
           jal f
           addi $sp, $sp,  8

           # print_int(v1)
           move $a0, $v0
           li   $v0 1
           syscall

           # exit
           li $v0 10
           syscall


