
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word rt_i0
            .word rt_i1
            .word rt_i2

   msgi0:   .asciiz "INT: 0\n"
   msgi1:   .asciiz "INT: 1\n"
   msgi2:   .asciiz "INT: 2\n"

.ktext
sys_print:  li   $0 0
            beq  $26 $0 end1
            lb   $27 ($26)
            li   $1 0
            beq  $27 $1 end1
            out  $27 0x1000
            li   $1 1
            add  $26 $26 $1
            b  sys_print
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

  rt_i1:    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
            # notify: TIP: Interruption one
            # notify: Some hardware raises interruption
            # notify: For example the clock hardware fires the one interruption
            # notify:
            # notify: Execute an assembly subrutine associated to the one interruption
            # notify:

            # 2.- interruption
            la   $26 msgi1
            b    sys_print

  rt_i2:    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
            # notify: TIP: Interruption two
            # notify: Some hardware raises interruption
            # notify: For example the clock hardware fires the two interruption
            # notify:
            # notify: Execute an assembly subrutine associated to the two interruption
            # notify:

            # 3.- interruption
            la   $26 msgi2
            b    sys_print


.text

    main:  # test int0
           li  $t0 0
           out $t0 0x1104
           li  $t0 600
           out $t0 0x1108

           li  $t0 0
           li  $t1 1
           li  $t2 25
       b1: bge $t0 $t2 e1
           add $t0 $t0 $t1
           b b1

       e1: li  $t0 0
           out $t0 0x1104
           out $t0 0x1108


           # test int1
           li  $t0 1
           out $t0 0x1104
           li  $t0 700
           out $t0 0x1108

           li  $t0 0
           li  $t1 1
           li  $t2 16
       b2: bge $t0 $t2 e2
           add $t0 $t0 $t1
           b b2

       e2: li  $t0 1
           out $t0 0x1104
           li  $t0 0
           out $t0 0x1108


           # the end
           jr $ra

