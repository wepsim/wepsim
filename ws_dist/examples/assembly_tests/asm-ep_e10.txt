
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: instruction with more elements

.data
             .byte 2
	max: .word 1

.text
	main: la $t1 max $t2
	      jr $ra

