
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
    msg: .byte 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
               0,1,0,1,0,1,1,1, 0,1,1,1,0,1,1,1, 0,1,0,1,0,0,0,0,
               0,1,0,1,0,1,0,1, 0,1,0,1,0,1,0,1, 0,1,0,1,0,0,0,0,
               0,1,1,1,0,1,1,1, 0,1,1,1,0,1,1,1, 0,1,1,1,0,0,0,0,
               0,1,0,1,0,1,0,1, 0,1,0,0,0,1,0,0, 0,0,0,1,0,0,0,0,
               0,1,0,1,0,1,0,1, 0,1,0,0,0,1,0,0, 0,1,1,1,0,0,0,0,
               0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,

               0,1,0,1,0,1,1,1, 0,1,1,1,0,1,1,1, 0,0,0,0,0,0,0,0,
               0,1,0,1,0,1,0,0, 0,1,0,1,0,1,0,1, 0,0,0,0,0,0,0,0,
               0,1,1,1,0,1,1,1, 0,1,1,1,0,1,0,1, 0,0,0,0,0,0,0,0,
               0,0,0,1,0,1,0,0, 0,1,0,1,0,1,1,0, 0,0,0,0,0,0,0,0,
               0,1,1,1,0,1,1,1, 0,1,0,1,0,1,0,1, 0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,

               0,1,1,1,0,1,1,1, 0,1,1,1,0,1,1,1, 0,0,1,0,0,0,0,0,
               0,0,0,1,0,1,0,1, 0,0,0,1,0,1,0,0, 0,0,1,0,0,0,0,0,
               0,1,1,1,0,1,0,1, 0,1,1,1,0,1,1,1, 0,0,1,0,0,0,0,0,
               0,1,0,0,0,1,0,1, 0,1,0,0,0,0,0,1, 0,0,0,0,0,0,0,0,
               0,1,1,1,0,1,1,1, 0,1,1,1,0,1,1,1, 0,0,1,0,0,0,0,0,
               0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,
               0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0

.text

   main:   # initial address
           la   s5 msg

           # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:ledmatrix
           # notify: TIP: led-matrix
           # notify: Request action to the led-matrix device:
           # notify: <ul>
           # notify: <li> Send the address of a matrix (out  s5 0x3108)
           # notify: <li> Send command to led-matrix (out 0x20 0x3104)
           # notify: </ul>

           # for (i=22; i!=0; i--)
           li   s0 22
    loop3: beq  s0 zero end3

           # out address to data
           out  s5 0x3108

           # out 'DMA'   to control
           li   s6 0x20
           out  s6 0x3104

           # next
           addi  s5 s5 24
           addi  s0 s0 -1
           beq zero zero loop3
     end3:
           # the end
           jr ra


    # a) Using Programmed I/O
   main_a: la  s8 msg
           # for (y=0; y<24; y++)
           li  s7 1
           li  s0 24
           li  s1 0
           li  s4 8
   loop_y: beq s1 s0 end_y
           # for (x=0; x<24; x++)
           li  s2 0
   loop_x: beq s2 s0 end_x
           lb   s6 0(s8)
           addi s8 s8 1
           # m = <x|y|0|v>
           li   s5 0
           or   s5 s5 s2
           sll  s5 s5 s4
           or   s5 s5 s1
           sll  s5 s5 s4
           or   s5 s5 zero
           sll  s5 s5 s4
           or   s5 s5 s6
           # out <x|y|0|v> to data
           out  s5 0x3108
           # out set pixel to control
           li   s5 0x10
           out  s5 0x3104
           # for (x...
           add  s2 s2 s7
           beq zero zero loop_x
    end_x: # for (y...
           add  s1 s1 s7
           beq zero zero loop_y
    end_y:
           # the end
           jr ra


    # b) Using DMA
   main_b: # out 'initial address' to the data register
           la   s5  msg
           out  s5  0x3108
           # out 'use DMA' to the control register
           li   s5  0x20
           out  s5  0x3104
           # the end
           jr ra

