
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

       # char c1 ;
       # char c2 = 'a' ;
       # ...
       # 
       # main () 
       # {
       #    c1 = c2;
       #    ...
       # }

.data
       c1: .space  1     # 1 byte
       c2: .byte  'a'
       # ...

.text
 main: la  t0 c1
       la  t1 c2
       lbu t2 0(t1)
       sb  t2 0(t0)
