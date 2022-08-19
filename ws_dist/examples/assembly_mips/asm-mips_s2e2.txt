
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
         w1: .byte 1, -1, 07, 0xa, 'a'
             .half 1, -1, 07, 0xa, 'a'
             .word 1, -1, 07, 0x12345678, 'a'
         w2: .ascii  "hello"
             .asciiz "world"
         w3: .space 5

    errorLb: .asciiz "Error in lb."
       tlb1: .word 0x12345678
    errorLi: .asciiz "Error in li."
       tli1: .word -128
    errorLw: .asciiz "Error in lw."
       tlw1: .word 0x00000000
   errorAdd: .asciiz "Error in add."
   errorSub: .asciiz "Error in sub."
   errorMul: .asciiz "Error in mul."
   errorDiv: .asciiz "Error in div."

.text
printMsg:    lb   $27 ($26)
             li   $1 0
             beq  $27 $1 end2
             out  $27 0x1000
             li   $1 1
             add  $26 $26 $1
             b printMsg
       end2: jr   $ra

main:
             # push $ra
            addi $sp $sp -4
            sw   $ra ($sp)

             # test li
            li  $1 0x12345678

             # test lb
            la   $26 errorLb
            la   $1 tlb1
            lb   $2 ($1)
            li   $4 0x78
            bne  $2 $4 printError

            li   $3 1
            add  $1 $1 $3
            lb   $2 ($1)
            li   $4 0x56
            bne  $2 $4 printError

            add  $1 $1 $3
            lb   $2 ($1)
            li   $4 0x34
            bne  $2 $4 printError

            add  $1 $1 $3
            lb   $2 ($1)
            li   $4 0x12
            bne  $2 $4 printError

             # test li
            la   $26 errorLi
            li   $2 -128
            lw   $4 tli1
            bne  $2 $4 printError

             # test lw
            la   $26 errorLw
            li   $2 0x1234
            sw   $2 tlw1
            li   $4 0
            lw   $4 tlw1
            bne  $2 $4 printError

             # test add
            la   $26 errorAdd
            li   $2 2
            li   $3 1
            add  $5 $2 $3
            li   $4 3
            bne  $5 $4 printError

             # test sub
            la   $26 errorSub
            li   $2 2
            li   $3 1
            sub  $5 $2 $3
            li   $4 1
            bne  $5 $4 printError

             # test mul
            la  $26 errorMul
            li  $2 2
            li  $3 3
            li  $4 6
            mul $5 $2 $3
            bne $5 $4 printError

             # test div
            la  $26 errorDiv
            li  $2 6
            li  $3 3
            li  $4 2
            div $5 $2 $3
            bne $5 $4 printError

             # pop $ra
            lw   $ra ($sp)
            addi $sp $sp 4

             # the end
            jr  $ra


printError: jal printMsg

             # pop $ra
            lw   $ra ($sp)
            addi $sp $sp 4

            jr   $ra

