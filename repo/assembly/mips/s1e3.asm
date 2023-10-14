
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
main:
           # for (x1=0; x1 != 5; x1++)
           li  $1  0
           li  $2  5
    loop1: beq $1 $2 end1
           # {
           #   ...
               addi $1 $1 1
               b loop1
           # }


    end1:
           # for (x1=0; x1 < 5; x1++)
           li  $1  0
           li  $2  5
    loop2: bge $1 $2 end2
           # {
           #   ...
               addi $1 $1 1
               b loop2
           # }


    end2:
           # for (x1=0; x1 <= 5; x1++)
           li  $1  0
           li  $2  5
    loop3: bgt $1 $2 end3
           # {
           #   ...
               addi $1 $1 1
               b loop3
           # }


     end3: jr $ra

