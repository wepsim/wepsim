
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text

main:
    li a2 0

    #
    # Arithmetic instructions
    #

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: add two numbers
    # notify: Instructions -> add, addi
    # notify: <ul>
    # notify: <li> add  r1 r2 r3
    # notify:      <ul><li> r1 = r2 + r3</li></ul>
    # notify: <li> addi r1 r2 inm
    # notify:      <ul><li> r1 = r2 + inm</li></ul>
    # notify: </ul>
    li      a0, 3
    li      a1, 2
    add     a2, a0, a1   # a2 = 3 + 2
    addi    a2, a0, 10   # a2 = 3 + 10

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: substract two numbers
    # notify: Instructions -> sub
    # notify: <ul>
    # notify: <li> sub  r1 r2 r3</li>
    # notify:      <ul><li> r1 = r2 - r3</li></ul>
    # notify: <li> subi r1 r2  inm</li>
    # notify: <li> addi r1 r2 -inm</li>
    # notify:      <ul>
    # notify:      <li> r1 = r2 - inm</li>
    # notify:      <li> r1 = r2 + (-inm)</li>
    # notify:      </ul>
    # notify: </ul>
    li      a0, 0
    li      a1, 2
    sub     a2, a0, a1   # a2 = 0 - 2

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: multiply two numbers
    # notify: Instructions -> mul
    # notify: <ul>
    # notify: <li> mul  r1 r2 r3
    # notify:      <ul><li> r1 = r2 * r3</li></ul>
    # notify: </ul>
    li      a0, 5
    li      a1, 2
    mul     a2, a0, a1   # a2 = 5 <li> 2

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: divide signed
    # notify: Instructions -> div
    # notify: <ul>
    # notify: <li> div  r1 r2 r3
    # notify:      <ul><li> r1 = r2 * r3</li></ul>
    # notify: </ul>
    li      a0, 6
    li      a1, 2
    div     a2, a0, a1   # a2 = 6 / 2

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: remainder signed
    # notify: Instructions -> rem
    # notify: <ul>
    # notify: <li> rem  r1 r2 r3
    # notify:      <ul><li> r1 = r2 * r3</li></ul>
    # notify: </ul>
    li      a0, 5
    li      a1, 2
    rem     a2, a0, a1   # a2 = 5 % 2


    #
    # Logic instructions
    #

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: bitwise Or
    # notify: Instructions -> or, ori
    # notify: <ul>
    # notify: <li> or   r1 r2 r3
    # notify:      <ul><li> r1 = r2 | r3</li></ul>
    # notify: <li> ori  r1 r2 inm
    # notify:      <ul><li> r1 = r2 | inm</li></ul>
    # notify: </ul>
    li      a0, 0xF875
    li      a1, 0x00FF
    or      a2, a0, a1    # a2 = 0xF875 | 0x00FF
    ori     a3, a0, 0xFF  # a2 = 0xF875 | 0x00FF

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: bitwise and
    # notify: Instructions -> and, andi
    # notify: <ul>
    # notify: <li> and  r1 r2 r3
    # notify:      <ul><li> r1 = r2 & r3</li></ul>
    # notify: <li> andi r1 r2 inm
    # notify:      <ul><li> r1 = r2 & inm</li></ul>
    # notify: </ul>
    li      a0, 0xF875
    li      a1, 0x00FF
    and     a2, a0, a1    # a2 = 0xF875 & 0x00FF
    andi    a3, a0, 0xFF  # a2 = 0xF875 & 0x00FF

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: bitwise xor
    # notify: Instructions -> xor, xori
    # notify: <ul>
    # notify: <li> xor  r1 r2 r3
    # notify:      <ul><li> r1 = r2 ^ r3</li></ul>
    # notify: <li> xori r1 r2 inm
    # notify:      <ul><li> r1 = r2 ^ inm</li></ul>
    # notify: </ul>
    li      a0, 0xF875
    li      a1, 0x00FF
    xor     a2, a0, a1    # a2 = 0xF875 ^ 0x00FF
    xori    a3, a0, 0xFF  # a2 = 0xF875 ^ 0x00FF


    #
    # Shift instructions
    #

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: shift right logical
    # notify: Instructions -> srl, srli
    # notify: <ul>
    # notify: <li> srl  r1 r2 r3
    # notify:      <ul><li> r1 = r2 >> r3</li></ul>
    # notify: <li> srli r1 r2 inm
    # notify:      <ul><li> r1 = r2 >> inm</li></ul>
    # notify: </ul>
    li      a0, 0x010
    li      a1, 0x3
    srl     a2, a0, a1   # a2 = 0x010 >> 3
    srli    a2, a0, 3    # a2 = 0x010 >> 3

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: shift left logical
    # notify: Instructions -> sll, slli
    # notify: <ul>
    # notify: <li> ssl  r1 r2 r3
    # notify:      <ul><li> r1 = r2 << r3</li></ul>
    # notify: <li> ssli r1 r2 inm
    # notify:      <ul><li> r1 = r2 << inm</li></ul>
    # notify: </ul>
    li      a0, 0x010
    li      a1, 0x3
    sll     a2, a0, a1   # a2 = 0x010 << 3
    slli    a2, a0, 3    # a2 = 0x010 << 3

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: shift right arithmetic
    # notify: Instructions -> sra, srai
    # notify: <ul>
    # notify: <li> sra  r1 r2 r3
    # notify:      <ul><li> r1 = r2 >> r3</li></ul>
    # notify: <li> srai r1 r2 inm
    # notify:      <ul><li> r1 = r2 >> inm</li></ul>
    # notify: </ul>
    li      a0, 0x010
    li      a1, 0x3
    sra     a2, a0, a1   # a2 = 0x010 >> 3
    srai    a2, a0, 3    # a2 = 0x010 >> 3


    # return
    jr      ra

