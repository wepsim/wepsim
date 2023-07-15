
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

       # char c1 ;
       # char c2 = 'h' ;
       # char *ac1 = "hola" ;
       # ...
       # 
       # main () 
       # {
       #   printf("%s",ac1) ;
       #   ...
       # }

.data
   c1:  .zero    1  # 1 byte
   c2:  .byte   'h'
   ac1: .string "hola"
   # ...

.text
 main:   
	 li a7 4
	 la a0 ac1
	 ecall
         # ...

