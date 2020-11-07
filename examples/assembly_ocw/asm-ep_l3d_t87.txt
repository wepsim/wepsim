
#
# ARCOS.INF.UC3M.ES
# BY-NC-SA (https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)
#


.text

     main: 
           # v1 = f(3, 4, 23, 12, 6, 7)
           li   $a0, 3
           li   $a1, 4
           li   $a2, 23
           li   $a3, 12
           addu $sp, $sp, -8
           li   $t0, 6
           sw   $t0, ($sp)
           li   $t0, 7
           sw   $t0, 4($sp)
           jal f
           addu $sp, $sp,  8

           # print_int(v1)
           move $a0, $v0
           li   $v0 1
           syscall

           # exit
           li $v0 10
           syscall


        f: 
           # crear "stack frame"
           addu $sp, $sp, -4
           sw   $fp, ($sp)
           move $fp, $sp
           addu $sp, $sp, -16

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
           addu $sp, $sp, 20

           # return $v0
           jr $ra
