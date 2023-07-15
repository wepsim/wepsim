
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
        msg: .asciiz "Please, press letter '0' to end the 'echo' effect.\n"

.text
main:
            # print msg
            la   $26 msg
   loop1:   lb   $27 ($26)
            li   $1 0
            beq  $27 $1 end1
            out  $27 0x1000
            li   $1 1
            add  $26 $26 $1
            b loop1

            # do echo (read char + write char)...
   end1:    li   $25 '0'

 notready1: in   $27 0x0104
            beq  $27 $0 notready1
            in   $26 0x0100

            out  $26 0x1000
 notready2: in   $27 0x1004
            beq  $27 $0 notready2

            bne  $26 $25 notready1

            # the end
            jr $ra

