
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

.text
main:
    #
    # Arithmetic instructions
    #

    # add: $5 = 2 + 1
    li  $2 2
    li  $3 1
    add $5 $2 $3

    # subtract: $5 = 2 - 1
    li  $2 2
    li  $3 1
    sub $5 $2 $3

    # multiply: $5 = 2 * 3
    li  $2 2
    li  $3 3
    mul $5 $2 $3

    # divide: $5 = 3 / 2
    li  $2 3
    li  $3 2
    div $5 $2 $3

    # reminder: $5 = 3 % 2
    li  $2 3
    li  $3 2
    rem $5 $2 $3

    #
    # Logic instructions
    #

    # and: $5 = 1 & 0
    li  $2 1
    li  $3 0
    and $5 $2 $3

    # or: $5 = 1 | 0
    li  $2 1
    li  $3 0
    or $5 $2 $3

    # not: $5 = ! $5
    li  $5 0
    not $5

    # xor: $5 = 1 ^ 0
    li  $2 1
    li  $3 0
    xor $5 $2 $3

    #
    # Bitwise instructions
    #

    # shift right logical: $5 = 8 >> 2
    li  $2 8
    srl $5 $2 2

    # shift left logical: $5 = 1 << 3
    li  $2 2
    sll $5 $2 3

