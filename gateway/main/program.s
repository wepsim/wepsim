.text
.type main, @function
.globl main
.text
     main:
           addi sp, sp, -8
           sw ra, 0(sp)
          li a7, 5
          #### 
 addi sp, sp, -8 
 sw ra, 0(sp) 
 jal _myecall 
 lw ra, 0(sp) 
 addi sp, sp, 8 
 ####
           # t1 = factorial(5)
#rdcycle t0
           jal factorial
#rdcycle t1
           # print_int(t1)
           li  a7, 1
           #### 
 addi sp, sp, -8 
 sw ra, 0(sp) 
 jal _myecall 
 lw ra, 0(sp) 
 addi sp, sp, 8 
 ####
           li a0, '\n'
           li a7, 11
           #### 
 addi sp, sp, -8 
 sw ra, 0(sp) 
 jal _myecall 
 lw ra, 0(sp) 
 addi sp, sp, 8 
 ####
           sub a0, t1, t0
           li a7, 1
           #### 
 addi sp, sp, -8 
 sw ra, 0(sp) 
 jal _myecall 
 lw ra, 0(sp) 
 addi sp, sp, 8 
 ####
           lw ra, 0(sp)
           addi sp, sp, 8
           jr ra
factorial:
           # crear "stack frame" para $ra, $fp y una variable local
           addi sp, sp, -12
           sw   ra, 8(sp)
           sw   fp, 4(sp)
           addi fp, sp, 4
           # if (a0 < 2):
           #     return 1
           li x5, 2
           bge  a0, t0, b_else
           li   a0, 1
           beq  x0, x0, b_efs
           # else:
           #    return a0 * factorial(a0 - 1)
   b_else: sw   a0, -4(fp)
           addi a0, a0, -1
           jal  x1, factorial
           lw   t1, -4(fp)
           mul  a0, a0, t1
           # finalizar "stack frame"
   b_efs:  lw   ra, 8(sp)
           lw   fp, 4(sp)
           addi sp, sp, 12
           # return t0
           jr ra
