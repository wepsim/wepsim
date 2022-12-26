
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

 if_2:   bge t1 t2 fin_2

 then_2: mv t1 t2

 fin_2: # ...

