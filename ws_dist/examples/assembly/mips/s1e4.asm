
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.data
        w3: .word 1, 2, 3, 4, 5

.text
main:
        li  $3  1
        li  $4  4
        la  $5  w3
        li  $7  0

        # loop initialization
        li  $1  0
        li  $2  5

        # loop header
 loop1: beq $1 $2 end1

        # loop body
        mul $6 $1 $4
        add $6 $6 $5
        lw  $6 ($6)
        add $7 $7 $6

        # loop next...
        add $1 $1 $3
        b loop1

        # loop end
  end1: jr $ra

