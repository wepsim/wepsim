
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

       # double resultado ;
       # double op1 = 100 ;
       # double op2 = -10.27 ;
       # ...
       # 
       # main () 
       # {
       #   resultado = op1 * op2 ;
       #   ...
       # }

 .data
 .align 3
    resultado:  .space 8 
    op1: 	 .double 100
    op2: 	 .double -10.27
    # ...

.text
 main:  fld    f0 op1(x0)
        fld    f1 op2(x0)
        fadd.d f3 f1 f2
        fsd    f3 resultado(x0)
        # ...

