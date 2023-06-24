
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
main:
        li x1 0

        # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
        # notify: for (x1=0; x1 != 5; x1++)
        # notify: <li> In high-level:
        # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
        # notify:   x1=0
        # notify:   while x1 != 5:
        # notify:         ...
        # notify:         x1++     </pre>
        # notify: <li> In low-level:
        # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
        # notify:       li reg1 initial-value
        # notify:       li reg2 last-value
        # notify:   B1: beq reg1 reg2 E1
        # notify:       ...
        # notify:       update reg1
        # notify:       branch B1
        # notify:   E1:   </pre>

        li  x1  0
        li  x2  5
 loop1: beq x1 x2 end1
        # {
        #   ...
            addi x1 x1 1
            beq x0 x0 loop1
        # }

 end1:


        # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
        # notify: for (x1=0; x1 < 5; x1++)
        # notify: <li> In high-level:
        # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
        # notify:  x1=0
        # notify:  while x1 < 5:
        # notify:        ...
        # notify:        x1++   </pre>
        # notify: <li> In low-level:
        # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
        # notify:      li reg1 initial-value
        # notify:      li reg2 last-value
        # notify:  B1: beq reg1 reg2 E1
        # notify:      ...
        # notify:      update reg1
        # notify:      branch B1
        # notify:  E1:   </pre>

        li  x1  0
        li  x2  5
 loop2: bge x1 x2 end2
        # {
        #   ...
            addi x1 x1 1
            beq x0 x0 loop2
        # }

 end2:


        # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
        # notify: for (x1=0; x1 <= 5; x1++)
        # notify: <li> In high-level:
        # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
        # notify:  x1=0
        # notify:  while x1 <= 5:
        # notify:        ...
        # notify:        x1++   </pre>
        # notify: <li> In low-level:
        # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
        # notify:      li reg1 initial-value
        # notify:      li reg2 last-value
        # notify:  B1: bgt reg1 reg2 E1
        # notify:      ...
        # notify:      update reg1
        # notify:      branch B1
        # notify:  E1:   </pre>

        li  x1  0
        li  x2  5
 loop3: bgt x1 x2 end3
        # {
        #   ...
            addi x1 x1 1
            beq x0 x0 loop3
        # }


  end3: jr ra

