
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
  res1: .word 0x12345678

.text
  main:
     li a1 0
     li a2 0

     # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
     # notify: TIP: load byte, half, word
     # notify: <ul>
     # notify: <li>lb  r1 inm(r2)</li>
     # notify:     <ul><li> r1 = mem[r2 + inm]/8</li></ul>
     # notify: <li>lh  r1 inm(r2)</li>
     # notify:     <ul><li> r1 = mem[r2 + inm]/16</li></ul>
     # notify: <li>lw  r1 inm(r2)</li>
     # notify:     <ul><li> r1 = mem[r2 + inm]/32</li></ul>
     # notify: </ul>

     la      a0, res1
     lb      a1, 0(a0)

     la      a0, res1
     lh      a2, 0(a0)

     la      a0, res1
     lw      a3, 0(a0)


     # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
     # notify: TIP: store byte, half, word
     # notify: <ul>
     # notify: <li>sb  r1 inm(r2)</li>
     # notify:     <ul><li> mem[r2 + inm] = r1/8</li></ul>
     # notify: <li>sh  r1 inm(r2)</li>
     # notify:     <ul><li> mem[r2 + inm] = r1/16</li></ul>
     # notify: <li>sw  r1 inm(r2)</li>
     # notify:     <ul><li> mem[r2 + inm] = r1/32</li></ul>
     # notify: </ul>

     la      a0, res1
     li      a1, 0x1
     sb      a1, 0(a0)

     la      a0, res1
     li      a2, 0x2
     sh      a2, 0(a0)

     la      a0, res1
     li      a3, 0x3
     sw      a3, 0(a0)


     # return
     jr      ra

