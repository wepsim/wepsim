
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

       # int vec[5] ;
       # ...
       # 
       # main () 
       # {
       #     vec[4] = 8;
       #     ...
       # }

.data
   .align     2    # siguiente dato alineado a 4    
   vec: .zero 20   # 5 elem. * 4 bytes/cada


.text
 main:   
         li  t0  12
         la  t1  vec
         add t3, t1, t0
         li  t2  8
         sw  t2, 0(t3)    	 
         # ...

