
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: empty directive

.data
	tag1: .byte 
        str: .string "string"

.text
	main: la t1 tag1
	      jr ra
