
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word rt_i0
            .word rt_i1
            .word rt_sys

.ktext
sys_prt_str: li   zero 0
             li   t5 1
             beq  t3 zero end1
         b5: lb   t4 0(t3)
             beq  t4 zero end1
             out  t4 0x1000
             add  t3 t3 t5
             beq  zero zero  b5
       end1: sret

sys_prt_ch:  out  a0 0x1000
             sret

  rt_i0:     # 0.- interruption
             sret

  rt_i1:     # 1.- interruption
             lw  s1 4(s0)  # note: A4
             beq s1 x0 rt1e1
             out s1 0x4004
             lw  s1 0(s0)  # time: 8n
             out s1 0x4008
             li  s1 1      # play + silence
             out s1 0x4000
             addi s0 s0 8
      rt1e1: sret

  rt_sys:    # 2.- ecall
             li   t4 4
             beq  a7 t4 sys_prt_str
             li   t4 11
             beq  a7 t4 sys_prt_ch
             sret


.data
    toplay: .word 8,0x0004,
                  8,0x0100,
                  8,0x0104,
                  8,0x0204,
                  8,0x0304,
                  8,0x0300,
                  8,0x0404,
                  8,0x0504,
                  8,0x0604,
                  8,0x0005,
                  0,0

.text

main:
### int_IO ####################
           la  s0 toplay
           li  t0 1
           out t0 0x1104
           li  t0 300
           out t0 0x1108

           li  t0 0
           li  t2 20
       b1: beq t0 t2 e1
           li  a0 'x'
           li  a7 11
           ecall
           addi t0 t0 1
           beq zero zero b1
       e1: li  t0 0
           out t0 0x1104
           out t0 0x1108

### prog_IO #################
           la t0 toplay
           li t3 1 # play + silence
    loop2:
           # play untill 0,0
           lw t1 0(t0) # time
           lw t2 4(t0) # note
           addi t0 t0 8
           beq t1 x0 end2

           # play sound
           out t1 0x4008 # time
           out t2 0x4004 # note (A4)
           out t3 0x4000 # play + silence
           beq x0 x0 loop2

    end2:  # the end
           jr ra

