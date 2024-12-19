
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: illegal tag in .data: li

.data
	li: .byte 1

.text
	main: la t1 li
	      jr ra

