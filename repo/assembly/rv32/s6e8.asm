
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word rt_int
            .word rt_int
            .word rt_sys

.ktext
sys_prt_str: li   zero 0
             li   t5 1
             add  t3 a0 zero
             beq  t3 zero end1
         b5: lb   t4 0(t3)
             beq  t4 zero end1
             out  t4 0x1000
             add  t3 t3 t5
             beq  zero zero  b5
       end1: sret

sys_prt_ch:  out  a0 0x1000
             sret

  rt_int:    # 1.- interruption
             lb  s2 0(s1)  # time
             beq s2 x0 rt1e1
             out s2 0x4008

             lw  s2 0(s0)  # note
             out s2 0x4004
             li  s2 2      # play + silence
             out s2 0x4000

             addi s1 s1 1
             addi s0 s0 4
      rt1e1: sret

  rt_sys:    # 2.- ecall
             li   t4 4
             beq  a7 t4 sys_prt_str
             li   t4 11
             beq  a7 t4 sys_prt_ch
             sret


.data
   notes: .ascii  "  G2", "    ", "  G2", "    ", " Bb2", "  C3", "  G2", "    ", "  G2", "    ", "  F2", " F#2", "  G2", "    ", "  G2", "    ", "    "
   eos:   .byte   0
   times: .byte        5,      8,      8,      8,      8,      8,      8,      5,      5,      8,      8,      8,      5,      8,      8,      8,      0

.text
main:
### prog_IO #################

           la t0 notes
           la t1 times
    loop2:
           # play untill time is 0
           lb  t2 0(t1)  # get time
           beq t2 x0 end2
           out t2 0x4008 # out time

           lw  t2 0(t0)  # get note
           out t2 0x4004 # out note (A4)
           li  t2 2      # play + silence
           out t2 0x4000 # play + silence

           li  a0 'o'
           li  a7 11
           ecall

           addi t1 t1 1
           addi t0 t0 4
           beq x0 x0 loop2

    end2:  li  a0 '\n'
           li  a7 11
           ecall

### int_IO ####################

           la  s0 notes
           la  s1 times

           # fire int.1 every 300 clock cycles
           li  t0 1
           out t0 0x1104
           li  t0 300
           out t0 0x1108

           la  a0 notes
           li  a7 4
           ecall

           # stop firing int.1
           li  t0 0
           out t0 0x1104
           out t0 0x1108

###############################

           # the end
           jr ra

