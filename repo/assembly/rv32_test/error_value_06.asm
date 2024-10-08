
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

# Error: non-valid .align parameter

.data
        .align novalid
	tag1: .space 4

.text
	main: la t1 tag1
	      jr ra

