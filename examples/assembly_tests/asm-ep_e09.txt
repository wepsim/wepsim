
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: invalid number --> 1hello2

.data
	max: .word 1hello2

.text
	main: la $t1 max
	      jr $ra

