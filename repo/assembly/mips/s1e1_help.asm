
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
    # notify: TIP: add and substract two numbers
    # notify: <ul>
    # notify: <li> add   $r1 $r2  $r3   <br># r1 = r2 + r3 </li>
    # notify: <li> addi  $r1 $r2  imm   <br># r1 = r2 + imm </li>
    # notify: <li> sub   $r1 $r2  $r3   <br># r1 = r2 - r3 </li>
    # notify: <li> addi  $r1 $r2 -imm   <br># r1 = r2 - imm </li>
    # notify: </ul>

       li  $2 2
       li  $3 1
       add $5 $2 $3

       li  $2 2
       li  $3 1
       sub $5 $2 $3

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: multiply and divide two numbers
    # notify: <ul>
    # notify: <li> mul   $r1 $r2  $r3   <br># r1 = r2 * r3 </li>
    # notify: <li> div   $r1 $r2  $r3   <br># r1 = r2 / r3 </li>
    # notify: <li> rem   $r1 $r2  $r3   <br># r1 = r2 % r3 </li>
    # notify: </ul>

       li  $2 2
       li  $3 3
       mul $5 $2 $3

       li  $2 3
       li  $3 2
       div $5 $2 $3

       li  $2 3
       li  $3 2
       rem $5 $2 $3

       #
       # Logic instructions
       #

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: Logical operations
    # notify: <ul>
    # notify: <li> and   $r1 $r2  $r3   <br># r1 = r2 & r3 </li>
    # notify: <li> or    $r1 $r2  $r3   <br># r1 = r2 | r3 </li>
    # notify: <li> not   $r1 $r2        <br># r1 = ! r2 </li>
    # notify: <li> xor   $r1 $r2  $r3   <br># r1 = r2 ^ r3 </li>
    # notify: <li> xori  $r1 $r2  imm   <br># r1 = r2 ^ imm </li>
    # notify: </ul>

       li  $2 1
       li  $3 0
       and $5 $2 $3

       li  $2 1
       li  $3 0
       or $5 $2 $3

       li  $5 0
       not $5

       li  $2 1
       li  $3 0
       xor $5 $2 $3


       #
       # Bitwise instructions
       #

    # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
    # notify: TIP: Shift operations
    # notify: <ul>
    # notify: <li> srl   $r1 $r2  $r3  <br># r1 = (0)r2 >> r3 </li>
    # notify: <li> sll   $r1 $r2  $r3  <br># r1 =    r2 << r3 </li>
    # notify: <li> sra   $r1 $r2  $r3  <br># r1 = (s)r2 >> r3 </li>
    # notify: <li> srai  $r1 $r2  imm  <br># r1 = (s)r2 >> imm </li>
    # notify: </ul>

       li  $2 8
       srl $5 $2 2

       li  $2 2
       sll $5 $2 3


       # return
       jr  $ra

