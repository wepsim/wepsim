
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: illegal tag name

.data
	10_tag: .byte 1

.text
	main: la $t1 10_tag1
	      jr $ra

