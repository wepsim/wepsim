
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

       # float  resultado ;
       # float  op1 = 100 ;
       # float  op2 = 2.5 ;
       # ...
       # 
       # main () 
       # {
       #   resultado = op1 + op2 ;
       #   ...
       # }

 .data
.align 2
    resultado:  .zero 4 # 4 bytes 
    op1: 	.float 100
    op2: 	.float 2.5
    # ...

.text

 main:  flw    f0 op1(x0)
        flw    f1 op2(x0)
        fadd.s f3 f1 f2
        fsw    f3 resultado(x0)
        # ...

