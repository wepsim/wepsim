
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: non-valid .space parameter

.data
	tag1: .space novalid

.text
	main: la $t1 tag1
	      jr $ra

