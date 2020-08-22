
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: illegal tag --> max1

.data
	max: .byte 1

.text
	main: la $t1 max1
	      jr $ra

