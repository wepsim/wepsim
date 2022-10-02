
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
  msg_hola: .string "hola mundo\n"

.text
  main:
         # printf("hola mundo\n") ;
         li a7 4         
         la a0 msg_hola  
         ecall

