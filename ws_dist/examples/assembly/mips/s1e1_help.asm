
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
main:
       li $5 0

       #
       # Arithmetic instructions
       #

       # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
       # notify: TIP: $5 = 2 + 1
       # notify: Instructions -> add
       # notify: <ul>
       # notify: <li> add r1 r2 r3
       # notify:      <ul><li> r1 = r2 + r3</li></ul>
       # notify: </ul>
       li  $2 2
       li  $3 1
       add $5 $2 $3

       # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
       # notify: TIP: $5 = 2 - 1
       # notify: Instructions -> sub
       # notify: <ul>
       # notify: <li> sub r1 r2 r3
       # notify:      <ul><li> r1 = r2 - r3</li></ul>
       # notify: </ul>
       li  $2 2
       li  $3 1
       sub $5 $2 $3

       # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
       # notify: TIP: $5 = 2 * 3
       # notify: Instructions -> mul
       # notify: <ul>
       # notify: <li> mul r1 r2 r3
       # notify:      <ul><li> r1 = r2 * r3</li></ul>
       # notify: </ul>
       li  $2 2
       li  $3 3
       mul $5 $2 $3

       # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
       # notify: TIP: $5 = 3 / 2
       # notify: Instructions -> div
       # notify: <ul>
       # notify: <li> div r1 r2 r3
       # notify:      <ul><li> r1 = r2 / r3</li></ul>
       # notify: </ul>
       li  $2 3
       li  $3 2
       div $5 $2 $3

       # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
       # notify: TIP: $5 = 3 % 2
       # notify: Instructions -> rem
       # notify: <ul>
       # notify: <li> rem r1 r2 r3
       # notify:      <ul><li> r1 = r2 % r3</li></ul>
       # notify: </ul>
       li  $2 3
       li  $3 2
       rem $5 $2 $3

       #
       # Logic instructions
       #

       # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
       # notify: TIP: $5 = 1 & 0
       # notify: Instructions -> and
       # notify: <ul>
       # notify: <li> and r1 r2 r3
       # notify:      <ul><li> r1 = r2 & r3</li></ul>
       # notify: </ul>
       li  $2 1
       li  $3 0
       and $5 $2 $3

       # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
       # notify: TIP: $5 = 1 | 0
       # notify: Instructions -> or
       # notify: <ul>
       # notify: <li> or  r1 r2 r3
       # notify:      <ul><li> r1 = r2 | r3</li></ul>
       # notify: </ul>
       li  $2 1
       li  $3 0
       or $5 $2 $3

       # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
       # notify: TIP: $5 = ! $5
       # notify: Instructions -> not
       # notify: <ul>
       # notify: <li> not r1 r2
       # notify:      <ul><li> r1 = ! r2</li></ul>
       # notify: </ul>
       li  $5 0
       not $5

       # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
       # notify: TIP: $5 = 1 ^ 0
       # notify: Instructions -> xor
       # notify: <ul>
       # notify: <li> xor r1 r2 r3
       # notify:      <ul><li> r1 = r2 ^ r3</li></ul>
       # notify: </ul>
       li  $2 1
       li  $3 0
       xor $5 $2 $3

       #
       # Bitwise instructions
       #

       # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
       # notify: TIP: $5 = 8 >> 2
       # notify: Instructions -> srl (shift right logical)
       # notify: <ul>
       # notify: <li> srl r1 r2 inm
       # notify:      <ul><li> r1 = r2 >> inm</li></ul>
       # notify: </ul>
       li  $2 8
       srl $5 $2 2

       # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
       # notify: TIP: $5 = 1 << 3
       # notify: Instructions -> sll (shift left logical)
       # notify: <ul>
       # notify: <li> sll r1 r2 inm
       # notify:      <ul><li> r1 = r2 << inm</li></ul>
       # notify: </ul>
       li  $2 2
       sll $5 $2 3


       # return
       jr  $ra

