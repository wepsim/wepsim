
.section .text 

.type _misyscall, @function
.type _rdcyel, @function
.globl   _mysyscall, _rdcycle


_mysyscall:
        addi $sp, $sp, -12
        sw $ra, 8($sp)
        sw $a0, 4($sp)
        sw $a1, 0($sp)

        mv $a1, $a0
        mv $a0, $a7

        jal _mysyscall_c
        j end

end:
        lw $a1, 0($sp)
        lw $a0, 4($sp)
        lw $ra, 8($sp)
        addi $sp, $sp, 12
        jr $ra


_rdcycle:
        addi $sp, $sp, -8
        sw $ra, 0($sp)

        jal _esp_cpu_get_cycle_count

        lw $ra, 0($sp)
        addi $sp, $sp, 8

        jr $ra

