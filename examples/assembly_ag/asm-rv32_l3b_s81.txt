
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

       # bool_t b1 = false;
       # bool_t b2 = true;
       # ...
       # 
       # main () 
       # {
       #    b1 = true ;
       #    ...
       # }

.data
       b1: .byte  0      # 1 byte
       b2: .byte  1
       # ...

.text
 main: la t0 b1
       li t1 1
       sb t1 0(t0)
       # ...

