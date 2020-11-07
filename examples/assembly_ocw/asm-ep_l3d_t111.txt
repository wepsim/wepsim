
#
# ARCOS.INF.UC3M.ES
# BY-NC-SA (https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)
#


.text

     main: 
           # v1 = factorial(5)
           li $a0 5
           jal factorial

           # print_int(v1)
           move $a0 $v0
           li $v0 1
           syscall

           # exit
           li $v0 10
           syscall


factorial:
           # crear "stack frame" para $ra, $fp y una variable local
           subu $sp $sp 12
           sw   $ra 8($sp)
           sw   $fp 4($sp)
           addu $fp $sp 4

           # if ($a < 2):
           #     return 1
           bge  $a0 2 b_else
           li   $v0 1 
           b   b_efs
           # else:
           #    return $a0 * factorial($a0 - 1)
   b_else: sw   $a0 -4($fp)
           addi $a0 $a0 -1
           jal  factorial
           lw   $v1 -4($fp)
           mul  $v0 $v0 $v1

           # finalizar "stack frame"
   b_efs:  lw   $ra 8($sp)
           lw   $fp 4($sp)
           addu $sp $sp 12

           # return $v0
           jr $ra
