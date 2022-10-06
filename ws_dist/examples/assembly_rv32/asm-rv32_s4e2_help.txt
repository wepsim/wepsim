
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word rt_i0
            .word rt_div0
            .word rt_sys

   msgi0:   .string "INT: 0\n"
   msgi1:   .string "FPE: / by 0\n"

.ktext
sys_prt_str: li   zero 0
             beq  t3 zero end1
         b5: lb   t4 0(t3)
             beq  t4 zero end1
             out  t4 0x1000
             addi t3 t3 1
             beq  zero zero b5
       end1: sret

sys_prt_int: li   t1 1
             # push_byte('\0')
             sb   zero 0(sp)
             sub  sp sp t1
             bge  t3 zero b3
             li   t1  '-'
             out  t1  0x1000
             li   t1  -1
             mul  t3 t3 t1
         b3: # push_byte(rem(x,10)+48)
             # x = div(x,10)
             li   t1 10
             rem  t4 t3 t1
             div  t3 t3 t1
             addi t4 t4 48
             li   t1 1
             sb   t4 0(sp)
             sub  sp sp t1
             bne  t3 zero b3
         f3: # print_string(sp)
             add  sp sp t1
             lb   t4 0(sp)
             beq  t4 zero f2
             out  t4 0x1000
             beq  zero zero f3
         f2: sret

sys_prt_ch:  out  a0 0x1000
             sret

sys_rd_str:  li   zero  0
             li   t1  4
             sub  sp sp t1
             sw   a1 0(sp)
             li   t1  1
  notready1: beq  a1 zero eos1
             # ch=get_char()
             in   t4 0x0104
             beq  t4 zero notready1
             in   t4 0x0100
             out  t4 0x1000 # echo
             # str[] = ch
             sb   t4 0(t3)
             addi t3 t3 1
             sub  a1 a1 t1
             beq  zero zero notready1
       eos1: # str[] = '\0'
             sb   zero 0(t3)
             lw   a1 0(sp)
             addi sp sp 4
             sret

sys_rd_int:  li   zero  0
             li   a7 0
  notready2: # ch = get_char()
             in   t4 0x0104
             beq  t4 zero notready2
             in   t4 0x0100
             out  t4 0x1000 # echo
             # if (ch<'0') || (ch>'9') -> eos2
             li   t1  57
             bgt  t4 t1 eos2
             li   t1  48
             blt  t4 t1 eos2
             # a7 = a7*10 + (ch-48)
             sub  t4 t4 t1
             li   t1  10
             mul  a7 a7 t1
             add  a7 a7 t4
             beq  zero zero notready2
       eos2: sret

sys_rd_ch:   li   zero  0
  notready3: # ch=get_char()
             in   t4 0x0104
             beq  t4 zero notready3
             in   a7 0x0100
             out  a7 0x1000 # echo
             sret

   rt_sys:   # 1.- ecall
             mv   t3 a0
             li   t4 4
             beq  a7 t4 sys_prt_str
             li   t4 1
             beq  a7 t4 sys_prt_int
             li   t4 8
             beq  a7 t4 sys_rd_str
             li   t4 5
             beq  a7 t4 sys_rd_int
             li   t4 11
             beq  a7 t4 sys_prt_ch
             li   t4 12
             beq  a7 t4 sys_rd_ch
             sret

   rt_i0:    # 2.- interruption
             la  t3 msgi0
             beq zero zero  sys_prt_str

   rt_div0:  # 3.- exception
             la  t3 msgi1
             beq zero zero sys_prt_str


.data
    intro_str: .string " * Please write a short string (5 chars): "
    intro_int: .string " * Please write a integer: "
    enter:     .string "\n"
    str1:      .zero   127

.text
    main:
           # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
           # notify: TIP: print(intro_str)
           # notify: To request the print service:
           # notify: <ul>
           # notify: <li> Place address of first caracter on a0 (la a0 intro_str)
           # notify: <li> Place print_string service code on a7 (li a7 4)
           # notify: <li> Request service by special instruction (ecall)
           # notify: </ul>

           # test ecall 4
           la  a0 intro_str
           li  a7 4
           ecall

           # test ecall 8 + 4
           la  a0 str1
           li  a1 5
           li  a7 8
           ecall

           la  a0 enter
           li  a7 4
           ecall

           # test ecall 4
           la  a0 intro_int
           li  a7 4
           ecall

           # test ecall 5 + 4
           li  a7 5
           ecall

           la  a0 enter
           li  a7 4
           ecall

           # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
           # notify: TIP: print('a')
           # notify: To request the print char service:
           # notify: <ul>
           # notify: <li> Place caracter on a0 (li a0 'a')
           # notify: <li> Place print_char service code on a7 (li a7 11)
           # notify: <li> Request service by special instruction (ecall)
           # notify: </ul>

           # test ecall 11
           li  a0 'a'
           li  a7 11
           ecall

           # the end
           jr ra

