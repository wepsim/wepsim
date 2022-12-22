
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
    w1: .byte 1, -1, 07, 0xa, 'a'
    w2: .half 1, -1, 07, 0xa, 'a'
    w3: .word 1, -1, 07, 0x12345678, 'a'
    w4: .ascii  "hello"
    w5: .asciiz "world"
    w6: .space 5

.text
main:
   li $1 0
   li $3 0

   # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
   # notify: TIP: load byte, word
   # notify: <ul>
   # notify: <li>lb  r1 label</li>
   # notify:     <ul><li> r1 = mem[label]</li></ul>
   # notify: <li>lw  r1 label</li>
   # notify:     <ul><li> r1 = mem[label]</li></ul>
   # notify: </ul>

   lb  $1  w1
   lw  $3  w3


   # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
   # notify: TIP: store byte, half, word
   # notify: <ul>
   # notify: <li>sb  r1 label</li>
   # notify:     <ul><li> mem[label] = r1</li></ul>
   # notify: <li>sw  r1 label</li>
   # notify:     <ul><li> mem[label] = r1</li></ul>
   # notify: </ul>

   li  $1  0xF
   sb  $1  w1

   li  $2  0x123
   sw  $2  w3


   # return
   jr  $ra

