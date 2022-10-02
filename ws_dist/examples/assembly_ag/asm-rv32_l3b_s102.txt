
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

       # int vec[5] ;
       # int mat[2][3] = {{11,12,13}, 
       #                  {21,22,23}};
       # ...
       # 
       # main () 
       # {
       #   mat[1][2] = mat[1][1] + mat[2][1];
       #   ...
       # }

.data
.align 2
    vec: .zero 20   #5 elem.*4 bytes
    mat: .word 11, 12, 13
         .word 21, 22, 23
    # ...

.text
 main:
        li  t0 0
        lw  t1 mat(t0)
        li  t0 12
        lw  t2 mat(t0)
        add t3 t1 t2
        li  t0 4
        sw  t3 mat(t0)
        # ...

