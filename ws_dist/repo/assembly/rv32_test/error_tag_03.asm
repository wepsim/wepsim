
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: non-existing tag11

.data
	tag1: .byte 1

.text
	main: la t1 tag11
	      jr ra

