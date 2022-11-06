
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: illegal instruction lx

.data
	max: .byte   1

.text
	main: lx $t1 0
	      jr $ra

