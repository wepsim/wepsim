
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main:

         # int i;
         # 
         # main () 
         # {
         #    i=0;
         #    while (i < 10) {
         #      /* acción */
         #      i = i + 1 ;
         #    }
         # }

         li  t0 0
         li  t1 10
while:
         bge  t0 t1  fin
         # acción
         addi t0 t0 1
         beq x0 x0 while   # j while
fin: # ...

