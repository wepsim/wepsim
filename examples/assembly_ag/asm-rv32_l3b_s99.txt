
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

       # char  c1 ;
       # char  c2  = 'h' ;
       # char *ac1 = "hola" ;
       # char *c;
       # ...
       # 
       # main () 
       # {
       #   c = ac1; int l = 0;
       #   while (c[l] != NULL) {
       #          l++;
       #   }
       #   printf("%d", l);
       #   ...
       # }

       # 


.data
   c1:  .zero   1    # 1 byte
   c2:  .byte   'h'
   ac1: .string "hola"
   .align 2
   c:   .zero 4  # puntero => dirección
   # ...

.text
main:	        la   t0, ac1
	        li   a0, 0
      	        lbu  t1, 0(t0)
	buc1:	beqz t1, fin1
		addi t0, t0, 1
		addi a0, a0, 1
		lbu  t1, 0(t0)
		beq  x0, x0, buc1  # j buc1

	fin1:	li a7 1
                ecall
        # ...


