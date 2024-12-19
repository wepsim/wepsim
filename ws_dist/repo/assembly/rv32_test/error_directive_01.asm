
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: illegal directive --> .bytes

.data
        str: .asciiz "Good string"
	tag1: .bytes a

.text
	main: la t1 tag1
	      jr ra

