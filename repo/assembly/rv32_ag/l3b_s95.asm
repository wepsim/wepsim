
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

       # // variables globales
       # 
       # char v1;
       # int v2 ;
       # float v3 = 3.14 ;
       # 
       # char v4 = "ec" ;
       # 
       # int v5[] = { 20, 22 } ;

.data
   v1: .byte 0

.align 2
   v2: .zero   4
   v3: .float  3.14
   v4: .string "ec"

.align 2
   v5: .word 20, 22 

