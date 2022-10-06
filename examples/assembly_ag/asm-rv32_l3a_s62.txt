
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
       #   if (a < b){
       #       // acción 1  
       #   } else {
       #       // acción 2 
       #   }
       #   ...
       # }

         li  t1 1
         li  t2 2

 if_3:   bge t1 t2 else_3

 then_3: # acción 1
         beq x0 x0 fi_3  # j fi_3

 else_3: # acción 2

 fi_3: # ...

