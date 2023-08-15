.text
  main:
  	# U-Type instructions
    auipc t1 0x12345        # R6 = 0x1234D004
    lui t2 0x12345          # R7 = 0x12345000

    # S-Type instructions
    sb t1 0(sp)				# 0x04 at 0x100000
    sh t1 4(sp)				# 0xD004 at 0x100004
    sw t1 8(sp)				# 0x1234D004 at 0x100008

  	# I-Type instructions
  	addi t1 x0 1			# R6 = 1
    addi t2 t1 0			# R7 = 0
    addi t3 t3 1			# R28 = 1

    xori t4 t1 1			# R29 = 0
    ori t4 t1 1				# R29 = 1
    andi t4 t1 1			# R29 = 1
    slli t4 t1 4			# R29 = 16
    srli t4 t4 1			# R29 = 8
    addi t4 t4 -9
    srai t4 t4 1			# R29 = 4294967295
   	slti t4 x0 1			# R29 = 1

    lb t5 0(sp)				# R30 = 0x04
    lbu t6 0(sp)			# R31 = 0x04
    lh t5 4(sp)				# R30 = 0xFFFFD004
    lhu t6 4(sp)			# R31 = 0xD004
    lw t5 8(sp)				# R30 = 0x1234D004

  	# R-Type instructions
    add t1 t2 t3			# R6 = 2
    sub t1 t2 t3			# R6 = 0
    xor t4 t1 t2			# R29 = 1
    or t4 t1 t1				# R29 = 0
    and t4 t1 t2			# R29 = 0
    sll t4 t2 t3			# R29 = 2
    srl t4 t4 t3			# R29 = 1
    sra t4 t4 t3			# R29 = 0
    slt t4 t1 t2			# R29 = 1

    addi t1 t1 4
    addi t2 t2 8
    mul t3 t2 t1			# R28 = 32
    div t3 t2 t1			# R28 = 2
    div t4 t2 zero          # Fetch
    rem t4 t2 t1			# R29 = 1

    # B and J-Type instructions
    addi t1 x0 1
    addi t2 x0 1
    Loop1:
    bne t1 t2 End1
    addi t2 t2 1			# Run 1 time
    beq x0 x0 0xFF4
    End1:

    Loop2:
    blt t1 t2 End2
    addi t1 t1 -1           # Won't run
    beq x0 x0 0xFF4
    End2:

    addi t2 t2 4
    Loop3:
    bge t1 t2 End3
    addi t1 t1 1			# Run 4 times
    jal zero 0xFFFF4
    End3:

    jr ra
