
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

       # int  resultado ;
       # int  op1 = 100 ;
       # int  op2 = -10 ;
       # ...
       # 
       # main () 
       # {
       #   resultado = op1+op2;
       #   ...
       # }

.data
   .align 2
   resultado: .zero 4  # 4 bytes
   op1:       .word 100
   op2:       .word -10
   # ...

.text
 main:  la  t0 op1
        lw  t1 0(t0)
        la  t0 op2
        lw  t2 0(t0)
        add t3 t1 t2
        la  t0 resultado
        sw  t3 0(t0)
        # ...

