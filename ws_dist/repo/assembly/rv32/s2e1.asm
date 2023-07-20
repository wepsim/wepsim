
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
        msg: .string "Please, press letter '0' to end the 'echo' effect.\n"

.text
main:
            # print msg
            la   x26 msg
   loop1:   lb   x27 0(x26)
            li   x1 0
            beq  x27 x1 end1
            out  x27 0x1000
            li   x1 1
            add  x26 x26 x1
            beq  x0 x0 loop1

            # do echo (read char + write char)...
   end1:    li   x25 '0'

 notready1: in   x27 0x0104
            beq  x27 x0 notready1
            in   x26 0x0100

            out  x26 0x1000
 notready2: in   x27 0x1004
            beq  x27 x0 notready2

            bne  x26 x25 notready1

            # the end
            jr ra

