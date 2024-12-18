
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: instruction with more elements

.data
             .byte 2
	tag1: .word 1

.text
	main: la t1 tag1 t2
	      jr ra

