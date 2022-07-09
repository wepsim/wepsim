
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
addupto: 
        # $v0 = 0
        li   $v0 0

        # for ($t0=$a0; $t0>0; $t0--):
        #      $v0 = $v0 + $t0
        move $t0 $a0
    b1: beq  $t0 $0 f1
        add  $v0 $v0 $t0
        addi $t0 $t0 -1
        b b1

        # return $v0
   f1:  jr $ra


main: 
      # push $a0 and $ra
        addi $sp $sp -8
        sw $a0 0($sp)
        sw $ra 4($sp)

      # call addupto function
        li $a0 10
        jal addupto

      # pop $ra and $a0
        lw $ra 4($sp)
        lw $a0 0($sp)
        addi $sp $sp 8

      # return
        jr $ra

