
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: empty directive

.data
	max: .byte 
        str: .asciiz "string"

.text
	main: la $t1 max
	      jr $ra
