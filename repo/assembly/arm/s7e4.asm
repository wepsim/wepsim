
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
addupto:   # $R3 = 0
           mov  $R3 0

           # while ($R1 != 0)
       b1: cmp  $R1 $R0
           beq  f1
           adds $R3 $R3 $R1
           adds $R1 $R1 -1
           cmp  $R0 $R0
           beq  b1
       f1: 

           # return $R3
           bx   $LR


main:    
         # push $R1
           str  $R1 ($SP)
           adds $SP $SP -4

         # call subrutine
           mov  $R1 10
           bl   addupto

         # pop $R1
           ldr  $R1 ($SP)
           adds $SP $SP 4

         # end execution
           halt

