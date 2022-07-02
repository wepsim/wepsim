
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: illegal segment name 'udata'

.udata
	tag1: .byte 1

.text
	main: la $t1 tag1
	      jr $ra

