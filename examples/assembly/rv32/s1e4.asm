
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
           w3: .word 1, 2, 3, 4, 5

.text
main:
         li  x3  1
         li  x4  4
         la  x5  w3
         li  x7  0

         # loop initialization
         li  x1  0
         li  x2  5

         # loop header
  loop1: beq x1 x2 end1

         # loop body
         mul x6 x1 x4
         add x6 x6 x5
         lw  x6 0(x6)
         add x7 x7 x6

         # loop next...
         add x1 x1 x3
         beq x0 x0 loop1

         # loop end
   end1: jr ra


