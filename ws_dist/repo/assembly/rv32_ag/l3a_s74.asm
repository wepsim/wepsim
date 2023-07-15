
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main:
         #  int i, s;
         #  s = i = 0;

         li t0 0
         li a0 0

         #  while (i < 10) 
         #  {
         #     s = s + i ;
         #     i = i + 1 ;
         #  }

         li t2 10
 while1:
         bgt  t0 t2 fin1
         add  a0 a0 t0
         addi t0 t0 1
         beq  x0 x0 while1  # j while1
 fin1: 

