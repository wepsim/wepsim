
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main:
       li $t1 5
       li $t2 7
       li $t3 8

       # li   $t0 10
       # sub  $t4 $t2 $t0
       # mul  $t4 $t4 $t1
       # add  $t4 $t4 $t3
       # li   $t0 -1
       # mul  $t4 $t4 $t0
       addi  $t4 $t2 -10
       mul   $t4 $t4 $t1
       add   $t4 $t4 $t3
       muli  $t4 $t4 -1

