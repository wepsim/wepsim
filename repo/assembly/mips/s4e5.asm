
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word rt_i0
            .word rt_dis3
            .word rt_sys

   msgi0:   .asciiz "INT: 0\n"
   msgi1:   .asciiz "FPE: */0\n"

.ktext
sys_print:  li   $zero 0
            li   $t5 1
            beq  $t3 $zero end1
        b5: lb   $t4 ($t3)
            beq  $t4 $zero end1
            out  $t4 0x1000
            add  $t3 $t3 $t5
            b  b5
      end1: reti

  rt_i0:
            # 1.- interruption
            li   $t3  msgi0
            b sys_print

  rt_dis3:
            # 2.- exception
            li   $t3  msgi1
            b sys_print

  rt_sys:
            # 3.- syscall
            move $t3  $a0
            li   $t4  4
            beq  $v0  $t4 sys_print
            reti

### user ###

.data
   guessing: .byte 's', 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0
   password: .asciiz "srt"
   nopass:   .asciiz "x"

.text
strcmp2:   # save stack
           addi $sp $sp -20
           sw $s0 16($sp)
           sw $s1 12($sp)
           sw $s2  8($sp)
           sw $s3  4($sp)
           sw $s4  0($sp)
       
           # $s3 -> 1 (found) | 0 (not found)
           # $s4 -> # iterations (simulated clk cycles)
           li $s3 0
           li $s4 0

       l3: # $s0 <- a0[s4]
           add  $s0 $a0 $s4
           lb   $s0 ($s0)
           # $s1 <- a1[s4]
           add  $s1 $a1 $s4
           lb   $s1 ($s1)
           # (a0 == a1) ?
           bne  $s0   $s1   no3
           beq  $s0   $zero yes3
           addi $s4 $s4 1
           b l3
         
     yes3: li  $v0 1
           b e3
      no3: li  $v0 0
           b e3

       e3: # restore stack
           lw  $s4  0($sp)
           lw  $s3  4($sp)
           lw  $s2  8($sp)
           lw  $s1 12($sp)
           lw  $s0 16($sp)
           addi $sp $sp 20

           # return
           jr $ra


main:    # save stack
         addi $sp $sp -12
         sw   $ra 8($sp)
         sw   $s0 4($sp)
         sw   $s1 0($sp)
         
         # reference value to s1
         la   $a0 nopass
         la   $a1 password
         rdcycle  $s0
         jal  strcmp2
         rdcycle  $s1
         sub  $s1 $s1 $s0        

         # loop to guess keyword
         la  $t0 guessing
         li  $t3 -1
         li  $t4 1
     l1: # for (offset=0; $t3 != 1; offset++) {
         beq $t3 $t4 e1
       
         li  $t1 'a'   
         li  $t2 'z'
     l2: # for ($t1='a'; $t1<'z'; $t1++) {
         beq $t1 $t2 e2
       
         # guessing[offset] = $t1
         sb  $t1 ($t0)
       
         # $t3 = strcpy(guessing, pass)
         la   $a0 guessing
         la   $a1 password
         sub  $t5 $t0 $a0
         move $a0 $t0
         add  $a1 $a1 $t5
         rdcycle  $s0
         jal  strcmp2
         rdcycle  $t3
         sub  $t3 $t3 $s0
       
         # if ($v0 == 1) return
         bne $v0 $zero e1
         bgt $t3 $s1 e2 # 2+ loops
       
         # }
         addi $t1 $t1 1
         b l2
         
      
     e2: # }
         addi $t0 $t0 1
         b l1
       
     e1: # print(guessing)
         la $a0 guessing
         li $v0 4
         syscall

         # restore stack
         lw   $s0 4($sp)
         lw   $s0 4($sp)
         lw   $ra 8($sp)
         addi $sp $sp 12

         # return
         jr $ra

