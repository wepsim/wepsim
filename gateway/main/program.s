.text
.type main, @function
.globl main
	  #### 
 addi sp, sp, -8 
 sw ra, 0(sp) 
 jal _myecall 
 lw ra, 0(sp) 
 addi sp, sp, 8 
 ####
           #### 
 addi sp, sp, -8 
 sw ra, 0(sp) 
 jal _myecall 
 lw ra, 0(sp) 
 addi sp, sp, 8 
 ####
	   #### 
 addi sp, sp, -8 
 sw ra, 0(sp) 
 jal _myecall 
 lw ra, 0(sp) 
 addi sp, sp, 8 
 ####
	   #### 
 addi sp, sp, -8 
 sw ra, 0(sp) 
 jal _myecall 
 lw ra, 0(sp) 
 addi sp, sp, 8 
 ####
