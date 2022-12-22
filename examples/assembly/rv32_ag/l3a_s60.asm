
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main: 

       # int a=1; 
       # int b=2;
       # 
       # main () 
       # {
       #   if (a < b) {
       #      a = b;
       #   }
       #   ...
       # }

         li  t1 1
         li  t2 2

 if_1:   blt t1 t2 then_1 
         beq x0 x0 fin_1  # j find_1

 then_1: mv t1 t2 

 fin_1:  # ...

