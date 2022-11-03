
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
        float1: .word 0x7F800000

.text
main:
     # notify: skip1st:true showas:offcanvas glow:btn_run_stop_exebar1 scroll2current:true showdetails:register_file
     # notify: TIP: binary mask
     # notify: 1.- to load float in hex form
     # notify: 2.- to load masks
     # notify:   sign  -> 1000 0000 0000 0000 ...
     # notify:   exp.  -> 0111 1111 1000 0000 ...
     # notify:   mant. -> 0000 0000 0111 1111 ...
     # notify: 3.- to apply mask
     # notify:   sign  -> x000 0000 0000 0000 ...
     # notify:   exp.  -> 0xxx xxxx 1000 0000 ...
     # notify:   mant. -> 0000 0000 0xxx xxxx ...
     # notify: 4.- to move as least significant byte

     # 1.- to load float in hex form
     lw   s1  float1(x0)

     # 2.- to load masks
     #   sign  -> 1000 0000 0000 0000 ...
     li   s5  0x8000
     slli s5  s5  16
     #   exp.  -> 0111 1111 1000 0000 ...
     li   s6  0x7F80
     slli s6  s6  16
     #   mant. -> 0000 0000 0111 1111 ...
     li   s7  0x001F
     slli s7  s7  16
     ori  s0  x0  0xFFFF
     or   s7  s7  s0

     # 3.- to apply mask
     #   sign  -> x000 0000 0000 0000 ...
     and  s2  s1  s5
     #   exp.  -> 0xxx xxxx 1000 0000 ...
     and  s3  s1  s6
     #   mant. -> 0000 0000 0xxx xxxx ...
     and  s4  s1  s7

     # 4.- to move as l.s.b.
     srli s2  s2  31
     srli s3  s3  23

     # end
     jr ra

