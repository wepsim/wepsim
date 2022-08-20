
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
    main:  # test turning on leds...
           li  $t6 1

           # for (x=0; x<4; x++)
           li  $t7 1
           li  $t0 4
           li  $t1 0
   loop_x: beq $t1 $t0 end_x
           # for (y=0; y<4; y++)
           li  $t2 0
   loop_y: beq $t2 $t0 end_y
           # for (z=0; z<4; z++)
           li  $t3 0
   loop_z: beq $t3 $t0 end_z
           # m = <x|y|z|v>
           li  $t5 0
           or  $t5 $t5 $t3
           sll $t5 $t5 8
           or  $t5 $t5 $t2
           sll $t5 $t5 8
           or  $t5 $t5 $t1
           sll $t5 $t5 8
           or  $t5 $t5 $t6
           # out <x|y|z|v>
           out $t5 0x2104
           # for (z...
           add $t3 $t3 $t7
           b loop_z
    end_z: # for (y...
           add $t2 $t2 $t7
           b loop_y
    end_y: # for (x...
           add $t1 $t1 $t7
           b loop_x
    end_x:

           # the end
           jr $ra

