
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.kdata
   vector:  .word rt_int
            .word rt_int
            .word rt_sys

.ktext
sys_prt_str: li   $1  1
             li   $0  0
             beq  $26 $0 end1
         b5: lb   $27 ($26)
             beq  $27 $0 end1
             out  $27 0x1000
             add  $26 $26 $1
             b  b5
       end1: reti

sys_prt_ch:  out  $a0 0x1000
             reti

  rt_int:    # 1.- interruption
             lb  $s2 ($s1)  # get time
             beq $s2 $0 rt1e1
             out $s2 0x4008 # out time

             lw  $s2 ($s0)  # get note
             out $s2 0x4004 # out note (A4)
             li  $s2 2      # play + silence
             out $s2 0x4000 # play + silence

             addi $s1 $s1 1
             addi $s0 $s0 4
      rt1e1: reti

  rt_sys:    # 2.- syscall
             li   $t4 4
             beq  $v0 $t4 sys_prt_str
             li   $t4 11
             beq  $v0 $t4 sys_prt_ch
             reti


.data
   notes: .ascii  "  G2", "    ", "  G2", "    ", " Bb2", "  C3", "  G2", "    ", "  G2", "    ", "  F2", " F#2", "  G2", "    ", "  G2", "    ", "    "
   times: .byte        5,      8,      8,      8,      8,      8,      8,      5,      5,      8,      8,      8,      5,      8,      8,      8,      0

.text
main:
### prog_IO #################

           la $t0 notes
           la $t1 times
    loop2:
           # play untill time is 0
           lb  $t2 ($t1)  # get time
           beq $t2 $0 end2
           out $t2 0x4008 # out time

           lw  $t2 ($t0)  # get note
           out $t2 0x4004 # out note (A4)
           li  $t2 2      # play + silence
           out $t2 0x4000 # play + silence

           li  $a0 'x'
           li  $v0 11
           syscall

           addi $t1 $t1 1
           addi $t0 $t0 4
           beq  $0 $0 loop2

    end2:  li  $a0 '\n'
           li  $v0 11
           syscall

### int_IO ####################

           la  $s0 notes
           la  $s1 times

           # fire int.1 every 200 clock cycles
           li  $t0 1
           out $t0 0x1104
           li  $t0 200
           out $t0 0x1108

           # print 'x'
           li  $t0 0
           li  $t2 12
       b1: beq $t0 $t2 e1
           li  $a0 'x'
           li  $v0 11
           syscall
           addi $t0 $t0 1
           beq $zero $zero b1
       e1:
           # stop firing int.1
           li  $t0 0
           out $t0 0x1104
           out $t0 0x1108

###############################

           # the end
           jr $ra

