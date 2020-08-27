
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
  # int vec[5] ;
  # int mat[2][3] = {{11, 12, 13},
  #                  {21, 22, 23}};

  vec: .space 20
  mat: .word 11, 12, 13
       .word 21, 22, 23

.text
main: 
  # m[1][2] = m[1][1] + m[2][1] ;

    lw $t1 mat+0
    lw $t2 mat+12
    add $t3 $t1 $t2
    sw $t3 mat+4

