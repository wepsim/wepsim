
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: invalid number --> 1hello2

.data
	tag1: .word 1hello2

.text
	main: la t1 tag1
	      jr ra

