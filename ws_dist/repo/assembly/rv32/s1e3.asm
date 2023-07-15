
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
main:
         # for (x1=0; x1 != 5; x1++)
         li  x1  0
         li  x2  5
  loop1: beq x1 x2 end1
         # {
         #   ...
             addi x1 x1 1
             beq x0 x0 loop1
         # }


  end1:
         # for (x1=0; x1 < 5; x1++)
         li  x1  0
         li  x2  5
  loop2: bge x1 x2 end2
         # {
         #   ...
             addi x1 x1 1
             beq x0 x0 loop2
         # }


  end2:
         # for (x1=0; x1 <= 5; x1++)
         li  x1  0
         li  x2  5
  loop3: bgt x1 x2 end3
         # {
         #   ...
             addi x1 x1 1
             beq x0 x0 loop3
         # }


   end3: jr ra

