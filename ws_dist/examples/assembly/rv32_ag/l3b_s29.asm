
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
   # strings
   c1:  .zero 10       # 10 byte
   ac1: .string "hola" # 5 bytes (!)
   ac2: .byte 'h', 'o', 'l', 'a'

.text
  main:
   # printf("hola") ;
   li a7 4         
   la a0 ac1  
   ecall

