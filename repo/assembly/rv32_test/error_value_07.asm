
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: missing comma between two consecutive values

.data
	tag1: .byte 1 2 3 4

.text
	main: la t1 tag1
	      jr ra

