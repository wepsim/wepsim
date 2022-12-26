
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main:
       # int a = 5;
       # int b = 7;
       # int c = 8;
       # int i;
  
         li  t1 5
         li  t2 7
         li  t3 8

       # i = -(a * (b - 10) + c)

         li    t0 10
         sub   t4  t2  t0
         mul   t4  t4  t1
         add   t4  t4  t3
         li    t0 -1
         mul   t4  t4  t0

