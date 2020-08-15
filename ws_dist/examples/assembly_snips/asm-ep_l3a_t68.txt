
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main:
         #  int i, s;
         #  s=i=0;

         li  $t0 0
         li  $v0 0

         #  while (i < 10) 
         #  {
         #     s = s + i ;
         #     i = i + 1 ;
         #  }

         li   $t1 10
 while1: bge  $t0 $t1 fin1
         add  $v0 $v0 $t0
         addi $t0 $t0 1
         b while1
 fin1:   # ...

