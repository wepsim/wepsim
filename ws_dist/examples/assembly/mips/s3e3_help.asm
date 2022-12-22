
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word rt_i0
            .word rt_div0

   msgi0:   .asciiz "INT: 0\n"
   msgi1:   .asciiz "FPE: */0\n"

.ktext
sys_print:
            li   $0 0
            li   $1 1
            beq  $26 $0 end1
        b5: lb   $27 ($26)
            beq  $27 $0 end1
            out  $27 0x1000
            add  $26 $26 $1
            b    b5
      end1: reti

  rt_i0:    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
            # notify: TIP: Interruption zero
            # notify: Some hardware raises interruption
            # notify: For example the clock hardware fires the zero interruption
            # notify:
            # notify: Execute an assembly subrutine associated to the zero interruption
            # notify:

            # 1.- interruption
            la   $26 msgi0
            b    sys_print

  rt_div0:  # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
            # notify: TIP: Floating Point Exception
            # notify: Some arithmetic instruction found an exception.
            # notify: For example the div instruction, such as 0/0...
            # notify:
            # notify: Execute an assembly subrutine associated to the floating point execption.
            # notify:

            # 2.- exception
            la   $26 msgi1
            b    sys_print

.text
    main:  # test div 0/0
           li  $t0 0
           li  $t1 0
           div $t1 $t1 $t0

           # the end
           jr $ra

