
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: Repeated tag in .data

.data
	tag1: .byte 1
	tag1: .byte 2

.text
	main: la t1 tag1
	      jr ra

