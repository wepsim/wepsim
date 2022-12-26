
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main: 

       # int b1 = 4; 
       # int b2 = 2;
       # 
       # main () 
       # {
       #   if (b2 == 8) {
       #       b1 = 1;
       #   }
       #   ...
       # }

         li   t0 4
         li   t1 2
         li   t2 8

         bne  t0 t2  fin1
         li   t1 1
  fin1:  # ...

