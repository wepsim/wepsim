
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
  main:
         # . . . 

         # readInt(&valor)
         li a7 5
         ecall
         mv  t0 a0 # valor en t0

         # valor = valor + 1
         addi t0 t0 1

         # printInt
         mv  a0 t0
         li  a7 1
         ecall

         # . . . 

