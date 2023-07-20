
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
main:
           li $1 0

           # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
           # notify: The for-loop "for (x1=0; x1 != 5; x1++)" can be represented:
           # notify: <li> In high-level languaje:
           # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
           # notify:   x1=0
           # notify:   while x1 != 5:
           # notify:         ...
           # notify:         x1++         </pre>
           # notify: <li> And in low-level languaje:
           # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
           # notify:      li reg1 initial-value
           # notify:      li reg2 last-value
           # notify:  B1: beq reg1 reg2 E1
           # notify:      ...
           # notify:      update reg1
           # notify:      branch B1
           # notify:  E1:          </pre>

           li  $1  0
           li  $2  5
    loop1: beq $1 $2 end1
           # {
           #   ...
               add $1 $1 1
               b loop1
           # }

    end1:


           # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
           # notify: The for-loop "for (x1=0; x1 < 5; x1++)" can be represented:
           # notify: <li> In high-level languaje:
           # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
           # notify:  x1=0
           # notify:  while x1 < 5:
           # notify:        ...
           # notify:        x1++          </pre>
           # notify: <li> In low-level languaje:
           # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
           # notify:      li reg1 initial-value
           # notify:      li reg2 last-value
           # notify:  B1: beq reg1 reg2 E1
           # notify:      ...
           # notify:      update reg1
           # notify:      branch B1
           # notify:  E1: </pre>

           li  $1  0
           li  $2  5
    loop2: bge $1 $2 end2
           # {
           #   ...
               add $1 $1 1
               b loop2
           # }

    end2:


           # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
           # notify: The for-loop "for (x1=0; x1 <= 5; x1++)" can be represented:
           # notify: <li> In high-level languaje:
           # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
           # notify:  x1=0
           # notify:  while x1 <= 5:
           # notify:        ...
           # notify:        x1++           </pre>
           # notify: <li> In low-level languaje:
           # notify: <pre  class="font-monospace m-0 overflow-visible lh-1">
           # notify:      li reg1 initial-value
           # notify:      li reg2 last-value
           # notify:  B1: bgt reg1 reg2 E1
           # notify:      ...
           # notify:      update reg1
           # notify:      branch B1
           # notify:  E1:                 </pre>

           li  $1  0
           li  $2  5
    loop3: bgt $1 $2 end3
           # {
           #   ...
               add $1 $1 1
               b loop3
           # }


     end3: jr $ra

