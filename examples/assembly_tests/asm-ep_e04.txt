
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: illegal register t20

.data
	max: .byte 1

.text
	main: li $t20 0
	      jr $ra

