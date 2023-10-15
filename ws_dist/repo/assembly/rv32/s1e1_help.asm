
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text

main:
    #
    # Arithmetic instructions
    #

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: add and substract two numbers
    # notify: <ul>
    # notify: <li> add   r1 r2  r3   <br># r1 = r2 + r3 </li>
    # notify: <li> addi  r1 r2  imm  <br># r1 = r2 + imm </li>
    # notify: <li> sub   r1 r2  r3   <br># r1 = r2 - r3 </li>
    # notify: <li> addi  r1 r2 -imm  <br># r1 = r2 - imm </li>
    # notify: </ul>

    li      a0, 3
    li      a1, 2
    add     a2, a0, a1   # a2 = 3 + 2
    addi    a2, a0, 10   # a2 = 3 + 10

    li      a0, 0
    li      a1, 2
    sub     a2, a0, a1   # a2 = 0 - 2

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: multiply and divide two numbers
    # notify: <ul>
    # notify: <li> mul   r1 r2  r3   <br># r1 = r2 * r3 </li>
    # notify: <li> div   r1 r2  r3   <br># r1 = r2 / r3 </li>
    # notify: <li> rem   r1 r2  r3   <br># r1 = r2 % r3 </li>
    # notify: </ul>

    li      a0, 5
    li      a1, 2
    mul     a2, a0, a1   # a2 = 5 * 2

    li      a0, 6
    li      a1, 2
    div     a2, a0, a1   # a2 = 6 / 2

    li      a0, 5
    li      a1, 2
    rem     a2, a0, a1   # a2 = 5 % 2


    #
    # Logic instructions
    #

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: Logical operations
    # notify: <ul>
    # notify: <li> or    r1 r2  r3   <br># r1 = r2 | r3 </li>
    # notify: <li> ori   r1 r2  imm  <br># r1 = r2 | imm </li>
    # notify: <li> and   r1 r2  r3   <br># r1 = r2 & r3 </li>
    # notify: <li> andi  r1 r2  imm  <br># r1 = r2 & imm </li>
    # notify: <li> xor   r1 r2  r3   <br># r1 = r2 ^ r3 </li>
    # notify: <li> xori  r1 r2  imm  <br># r1 = r2 ^ imm </li>
    # notify: </ul>
    li      a0, 0xF875
    li      a1, 0x00FF
    or      a2, a0, a1    # a2 = 0xF875 | 0x00FF
    ori     a3, a0, 0xFF  # a2 = 0xF875 | 0x00FF

    li      a0, 0xF875
    li      a1, 0x00FF
    and     a2, a0, a1    # a2 = 0xF875 & 0x00FF
    andi    a3, a0, 0xFF  # a2 = 0xF875 & 0x00FF

    li      a0, 0xF875
    li      a1, 0x00FF
    xor     a2, a0, a1    # a2 = 0xF875 ^ 0x00FF
    xori    a3, a0, 0xFF  # a2 = 0xF875 ^ 0x00FF


    #
    # Shift instructions
    #

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: Shift operations
    # notify: <ul>
    # notify: <li> srl   r1 r2  r3   <br># r1 = (0)r2 >> r3 </li>
    # notify: <li> srli  r1 r2  imm  <br># r1 = (0)r2 >> imm </li>
    # notify: <li> sll   r1 r2  r3   <br># r1 =    r2 << r3 </li>
    # notify: <li> slli  r1 r2  imm  <br># r1 =    r2 << imm </li>
    # notify: <li> sra   r1 r2  r3   <br># r1 = (s)r2 >> r3 </li>
    # notify: <li> srai  r1 r2  imm  <br># r1 = (s)r2 >> imm </li>
    # notify: </ul>
    li      a0, 0x010
    li      a1, 0x3
    srl     a2, a0, a1   # a2 = 0x010 >> 3
    srli    a2, a0, 3    # a2 = 0x010 >> 3

    li      a0, 0x010
    li      a1, 0x3
    sll     a2, a0, a1   # a2 = 0x010 << 3
    slli    a2, a0, 3    # a2 = 0x010 << 3

    li      a0, 0x010
    li      a1, 0x3
    sra     a2, a0, a1   # a2 = 0x010 >> 3
    srai    a2, a0, 3    # a2 = 0x010 >> 3


    # return
    jr      ra

