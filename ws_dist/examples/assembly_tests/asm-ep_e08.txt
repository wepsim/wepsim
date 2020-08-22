
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: illegal directive --> .bytes

.data
        str: .asciiz "Good string"
	max: .bytes a

.text
	main: la $t1 max
	      jr $ra

