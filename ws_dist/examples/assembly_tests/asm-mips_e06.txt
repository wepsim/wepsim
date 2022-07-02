
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: Repeated tag --> max

.data
	max: .byte 1
	max: .byte 2

.text
	main: la $t1 max
	      jr $ra

