
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main:
   
       #   i = 0;
       #   n = 45;  # número
       #   s = 0;
       #   while (i < 32) 
       #   {
       #     b = n & 1;
       #     s = s + b;
       #     n = n >> 1;
       #     i = i + 1 ;
       #   }

	 li   t0, 0    #i
	 li   t1, 45   #n
	 li   t2, 32

         li   t3, 0    #s
while:   bge  t0, t2, fin
         andi t4, t1, 1
         add  t3, t3, t4
         srli t1, t1, 1
         addi t0, t0, 1
         beq  x0, x0, while  # j while
fin:     # ...

