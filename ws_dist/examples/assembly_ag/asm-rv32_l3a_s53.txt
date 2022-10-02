
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
 main: 

       # t1 = (t0 < 0.0) ? 1 : 0

         li   t0 -3
         srli t1 t0 31

         #li   t0 -3
         #li   t1 1
         #rol  t1 t0 t1
         #andi t1 t1 0x0000 0001

