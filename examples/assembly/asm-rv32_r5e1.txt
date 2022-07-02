
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
    main:  # test turning on leds...
           li  s6 1

           # for (x=0; x<4; x++)
           li  s7 1
           li  s0 4
           li  s1 0
           li  s4 8
   loop_x: beq s1 s0 end_x
           # for (y=0; y<4; y++)
           li  s2 0
   loop_y: beq s2 s0 end_y
           # for (z=0; z<4; z++)
           li  s3 0
   loop_z: beq s3 s0 end_z
           # m = <x|y|z|v>
           li  s5 0
           or  s5 s5 s1
           sll s5 s5 s4
           or  s5 s5 s2
           sll s5 s5 s4
           or  s5 s5 s3
           sll s5 s5 s4
           or  s5 s5 s6
           # out <x|y|z|v>
           out s5 0x2104
           # for (z...
           add s3 s3 s7
           beq x0 x0 loop_z
    end_z: # for (y...
           add s2 s2 s7
           beq x0 x0 loop_y
    end_y: # for (x...
           add s1 s1 s7
           beq x0 x0 loop_x
    end_x:

           # the end
           jr ra

