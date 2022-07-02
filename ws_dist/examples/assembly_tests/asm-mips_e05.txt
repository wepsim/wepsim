
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: Incorrect syntax --> la max $t2

.data
	max: .byte 1

.text
	main: la max $t1
	      jr $ra

