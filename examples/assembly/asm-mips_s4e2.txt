
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word rt_i0
            .word rt_div0
            .word rt_sys

   msgi0:   .asciiz "INT: 0\n"
   msgi1:   .asciiz "FPE: / by 0\n"

.ktext
sys_prt_str: li   $0 0
             beq  $26 $0 end1
         b5: lb   $27 ($26)
             beq  $27 $0 end1
             out  $27 0x1000
             addi $26 $26 1
             b  b5
       end1: reti

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
             addi $27 $27 48
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

sys_prt_ch:  out  $a0 0x1000
             reti

sys_rd_str:  li   $0  0
             li   $1  4
             sub  $sp $sp $1
             sw   $a1 ($sp)
             li   $1  1
  notready1: beq  $a1 $0 eos1
             # ch=get_char()
             in   $27 0x0104
             beq  $27 $0 notready1
             in   $27 0x0100
             out  $27 0x1000 # echo
             # str[] = ch
             sb   $27 ($26)
             addi $26 $26 1
             sub  $a1 $a1 $1
             b notready1
       eos1: # str[] = '\0'
             sb   $0 ($26)
             lw   $a1 ($sp)
             addi $sp $sp 4
             reti

sys_rd_int:  li   $0  0
             li   $v0 0
  notready2: # ch = get_char()
             in   $27 0x0104
             beq  $27 $0 notready2
             in   $27 0x0100
             out  $27 0x1000 # echo
             # if (ch<'0') || (ch>'9') -> eos2
             li   $1  57
             bgt  $27 $1 eos2
             li   $1  48
             blt  $27 $1 eos2
             # $v0 = $v0*10 + (ch-48)
             sub  $27 $27 $1
             li   $1  10
             mul  $v0 $v0 $1
             add  $v0 $v0 $27
             b notready2
       eos2: reti

sys_rd_ch:   li   $0  0
  notready3: # ch=get_char()
             in   $27 0x0104
             beq  $27 $0 notready3
             in   $v0 0x0100
             out  $v0 0x1000 # echo
             reti

   rt_sys:   # 1.- syscall
             move $26 $a0
             li   $27 4
             beq  $v0 $27 sys_prt_str
             li   $27 1
             beq  $v0 $27 sys_prt_int
             li   $27 8
             beq  $v0 $27 sys_rd_str
             li   $27 5
             beq  $v0 $27 sys_rd_int
             li   $27 11
             beq  $v0 $27 sys_prt_ch
             li   $27 12
             beq  $v0 $27 sys_rd_ch
             reti

   rt_i0:    # 2.- interruption
             la   $26 msgi0
             b    sys_prt_str

   rt_div0:  # 3.- exception
             la   $26 msgi1
             b    sys_prt_str


.data
    intro_str: .asciiz " * Please write a short string (5 chars): "
    intro_int: .asciiz " * Please write a integer: "
    enter:     .asciiz "\n"
    str1:      .space  127

.text
    main:  # test syscall 4
           la  $a0 intro_str
           li  $v0 4
           syscall

           # test syscall 8 + 4
           la  $a0 str1
           li  $a1 5
           li  $v0 8
           syscall

           la  $a0 enter
           li  $v0 4
           syscall

           # test syscall 4
           la  $a0 intro_int
           li  $v0 4
           syscall

           # test syscall 5 + 4
           li  $v0 5
           syscall

           la  $a0 enter
           li  $v0 4
           syscall

           # test syscall 11
           li  $a0 'a'
           li  $v0 11
           syscall

           # the end
           jr $ra

