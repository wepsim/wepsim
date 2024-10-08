
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: Incorrect syntax --> la tag1 t2

.data
	tag1: .byte 1

.text
	main: la tag1 t1
	      jr ra

