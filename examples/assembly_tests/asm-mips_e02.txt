
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: non-closed string ("...)

.data
        str: .asciiz "Bad string
	max: .byte   1

.text
	main: li $t1 0
	      jr $ra

