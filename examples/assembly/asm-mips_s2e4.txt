
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data

   matrix: .word 1, 0, 3, 0, 0, 1
           .word 1, 2, 0, 1, 1, 0

.text

counting:
       # result = 0
       li   $v0 0

       # for ($t0=0; $t0 < $a1; ...
       li   $t0 0
   b1: bge  $t0 $a1 f1

       # for ($t1=0; $t1 < $a2; ...
       li   $t1 0
   b2: bge  $t1 $a2 f2

       # $t2 = ($t0*$a2 + $t1) * 4
       mul  $t2 $t0 $a2
       add  $t2 $t2 $t1
       li   $t3 4
       mul  $t2 $t2 $t3

       # elto = *( $a0 + $t2 )
       add  $t2 $a0 $t2
       lw   $t2 ($t2)

       bne  $t2 $0 nozero
       li   $t3 1
       add  $v0 $v0 $t3
nozero:

       # ... $t1++)
       li   $t3 1
       add  $t1 $t1 $t3
       b b2

f2:
       # ... $t0++)
       li   $t3 1
       add  $t0 $t0 $t3
       b b1

f1:
       # return
       jr $ra


main:
       # counting (matrix, 2, 6)
       la  $a0 matrix
       li  $a1 2
       li  $a2 6
       jal counting

