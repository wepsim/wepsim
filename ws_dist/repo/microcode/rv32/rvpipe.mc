#
# WepSIM (https://wepsim.github.io/wepsim/)
#

firmware {
   version  = 2,
   rel_mult = 2,
   endian   = little
}

begin{fetch:()}

#  ADD rd,rs1,rs2         Add                                 rd ← rs1 + rs2
add rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=0000000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='rd = rs1 + rs2',
      {
          (AluOp=1010, RW)
      }
}

#  ADDI rd,rs1,imm         Add Immediate                     rd ← rs1 + sx(imm)
addi rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 + imm',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M4=11, AluOp=1010, RW)
      }
}

#  ADDU rd,rs1,imm         Add Unsigned                         rd ← rs1 + sx(imm)
addu rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=101,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 + imm',
      {
          (SE_IMM=0, OFFSET=0, SIZE=1100, M4=11, AluOp=10000, RW)
      }
}

#  AND rd,rs1,rs2         And                                 rd ← ux(rs1) ∧ ux(rs2)
and rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=1110000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='r1 = r2 & r3',
      {
          (AluOp=0001, RW)
      }
}

#  ANDI rd,rs1,imm         And Immediate                         rd ← ux(rs1) ∧ ux(imm)
andi rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=111,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 & imm',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M4=11, AluOp=0001, RW)
      }
}

#  MULL rd,rs1,rs2         Multiply                            rd ← sx(rs1) × sx(rs2)
mul rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=0000000001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='r1 = r2 * r3',
      {
          (AluOp=1100, RW)
      }
}

# DIV rd,rs1,rs2         Divide Signed         rd ← sx(rs1) ÷ sx(rs2)
div rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=1000000001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='reg1 = reg2 / reg3',
      {
          (AluOp=1101, RW) # TODO handle div 0 exception
      }
}

# DIVU rd,rs1,rs2         Divide Unsigned         rd ← ux(rs1) ÷ ux(rs2)
divu rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=1010000001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='reg1 = ux(reg2) / ux(reg3)',
      {
          (AluOp=10011, RW) # TODO handle div 0 exception
      }
}

#  OR rd,rs1,rs2         Or                                    rd ← ux(rs1) ∨ ux(rs2)
or rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=1100000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='r1 = r2 | r3',
      {
          (AluOp=0010, RW)
      }
}

#  ORI rd,rs1,imm         Or Immediate                         rd ← ux(rs1) ∨ ux(imm)
ori rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=110,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 | imm',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M4=11, AluOp=0010, RW)
      }
}

# REM rd,rs1,rs2         Remainder Signed         rd ← sx(rs1) mod sx(rs2)
rem rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=1100000001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='reg1 = reg2 % reg3',
      {
          (AluOp=1110, RW)
      }
}

#  SLL rd,rs1,rs2         Shift Left Logical                     rd ← ux(rs1) « rs2
sll rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=0010000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='rd = rs1 <<< rs2',
      {
            (AluOp=111, RW)
      }
}

#  SLLI rd,rs1,imm         Shift Left Logical Immediate             rd ← ux(rs1) « ux(imm)
slli rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12|31:25)=0010000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(24:20)=imm,
      help='rd = (rs1 << imm)',
      {
            (SE_IMM=1, OFFSET=0, SIZE=101, M4=11, AluOp=111, RW)
      }
}

#  SLT rd,rs1,rs2         Set Less Than                         rd ← sx(rs1) < sx(rs2)
slt rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=0100000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='rd = (rs1 < rs2) ? 1 : 0',
      {
          (AluOp=1011, RW),
      }
}

#  SLTI rd,rs1,imm         Set Less Than Immediate             rd ← sx(rs1) < sx(imm)
slti rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=010,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = (rs1 < imm) ? 1 : 0',
      {
        (SE_IMM=1, OFFSET=0, SIZE=101, M4=11, AluOp=1011, RW)
      }
}

#  SLTU rd,rs1,rs2         Set Less Than Unsigned                     rd ← ux(rs1) < ux(rs2)
sltu rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=0110000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='rd = (ux(rs1) < ux(rs2)) ? 1 : 0',
      {
          (AluOp=10001, RW),
      }
}


#  SRA rd,rs1,rs2         Shift Right Arithmetic                     rd ← sx(rs1) » rs2
sra rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=1010100000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='rd = rs1 >> rs2',
      {
            (AluOp=110, RW)
      }
}

#  SRAI rd,rs1,imm         Shift Right Arithmetic Immediate         rd ← sx(rs1) » ux(imm)
srai rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12|31:25)=1010100000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(24:20)=imm,
      help='rd = (rs1 >> imm)',
      {
            (SE_IMM=1, OFFSET=0, SIZE=101, M4=11, AluOp=110, RW)
      }
}

#  SRL rd,rs1,rs2         Shift Right Logical                     rd ← ux(rs1) » rs2
srl rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=1010000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='rd = rs1 >>> rs2',
      {
            (AluOp=101, RW)
      }
}

#  SRLI rd,rs1,imm         Shift Right Logical Immediate             rd ← ux(rs1) » ux(imm)
srli rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12|31:25)=1010000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(24:20)=imm,
      help='rd = (rs1 >>> imm)',
      {
            (SE_IMM=1, OFFSET=0, SIZE=101, M4=11, AluOp=101, RW)
      }
}

#  SUB rd,rs1,rs2         Sub                                 rd ← sx(rs1) - sx(rs2)
sub rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=0000100000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='r1 = r2 + r3',
      {
          (AluOp=1011, RW)
      }
}

#  SUBI rd,rs1,imm         Sub Immediate                         rd ← rs1 - sx(imm)
subi rd rs1 imm {
      oc(6:0)=1000000,
      eoc(14:12)=001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 - SignEx(imm)',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M4=11, AluOp=1011, RW)
      }
}

#  XOR rd,rs1,rs2         Xor                                 rd ← ux(rs1) ⊕ ux(rs2)
xor rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=1000000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='r1 = r2 ^ r3',
      {
          (AluOp=0100, RW)
      }
}

#  XORI rd,rs1,imm         Xor Immediate                         rd ← ux(rs1) ⊕ ux(imm)
xori rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=100,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 ^ imm',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M4=11, AluOp=0100, RW)
      }
}

#  LUI rd,imm               Load Upper Immediate             rd = (imm << 12)
lui rd imm {
      oc(6:0)=0010110,
      reg(11:7)=rd,
      imm(31:12)=imm,
      help='rd = imm << 12',
      {
          (SE_IMM=1, OFFSET=1100, SIZE=10100, M4=11, AluOp=11111, RW)
      }
 }

#  LW rd,offset(rs1)         Load Word                         rd ← s32[rs1 + offset]
lw rd offset(rs1) {
      oc(6:0)=0000011,
      eoc(14:12)=010,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-abs(31:20)=offset,
      help='rd = (MEM[rs1+offset+3] .. MEM[rs1+offset])',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M4=11, AluOp=1010, DMR, RW)
      }
}

#  SW rs2,offset(rs1)         Store Word                         u32[rs1 + offset] ← rs2
sw rs2 offset(rs1) {
      oc(6:0)=0100011,
      eoc(14:12)=010,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:7|31:25)=offset,
      help='MEM[rs1+offset+3 .. rs1+offset] = rs2',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M4=11, AluOp=1010, DMW)
      }
}

#  LB rd,offset(rs1)         Load Byte                         rd ← s8[rs1 + offset]
lb rd offset(rs1) {
      oc(6:0)=0000011,
      eoc(14:12)=000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-abs(31:20)=offset,
      help='rd = s8[rs1 + offset]',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M4=11, AluOp=1010, DMR, WBE=1, RW)
      }
}

#  LH rd,offset(rs1)         Load Half                         rd ← s16[rs1 + offset]
lh rd offset(rs1) {
      oc(6:0)=0000011,
      eoc(14:12)=001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-abs(31:20)=offset,
      help='rd = s16[rs1 + offset]',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M4=11, AluOp=1010, DMR, WBE=10, RW)
      }
}

#  LBU rd,offset(rs1)         Load Byte Unsigned                     rd ← u8[rs1 + offset]
lbu rd offset(rs1) {
      oc(6:0)=0000011,
      eoc(14:12)=100,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-abs(31:20)=offset,
      help='rd = u8[rs1 + offset]',
      {
          (SE_IMM=0, OFFSET=0, SIZE=1100, M4=11, AluOp=1010, DMR, WBE=1, RW)
      }
}

#  LHU rd,offset(rs1)         Load Half Unsigned                     rd ← u16[rs1 + offset]
lhu rd offset(rs1) {
      oc(6:0)=0000011,
      eoc(14:12)=101,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-abs(31:20)=offset,
      help='rd = u16[rs1 + offset]',
      {
          (SE_IMM=0, OFFSET=0, SIZE=1100, M4=11, AluOp=1010, DMR, WBE=10, RW)
      }
}

#  SB rs2,offset(rs1)         Store Byte                         u8[rs1 + offset] ← rs2
sb rs2 offset(rs1) {
      oc(6:0)=0100011,
      eoc(14:12)=000,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:7|31:25)=offset,
      help='MEM[rs1 + offset] = rs2/8',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M4=11, AluOp=1010, DMW, WBE=1)
      }
}

#  SH rs2,offset(rs1)         Store Half                         u16[rs1 + offset] ← rs2
sh rs2 offset(rs1) {
      oc(6:0)=0100011,
      eoc(14:12)=001,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:7|31:25)=offset,
      help='MEM[rs1+offset+1 .. rs1+offset] = rs2/16',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M4=11, AluOp=1010, DMW, WBE=10)
      }
}

#  BEQ rs1,rs2,offset         Branch Equal                         if rs1 = rs2 then pc ← pc + sext(offset)
beq rs1 rs2 offset {
    oc(6:0)=1100011,
    eoc(14:12)=000,
    reg(19:15)=rs1,
    reg(24:20)=rs2,
    address-rel(11:8|30:25|7|31)=offset,
    help='if rs1 == rs2 then PC = PC + imm',
    {
        (SE_IMM=1, OFFSET=0, SIZE=1100, X2_IMM=1, M4=0, AluOp=10100, BRANCH=01)
    }
}

#  BNE rs1,rs2,offset         Branch Not Equal                     if rs1 != rs2 then pc ← pc + sext(offset)
bne rs1 rs2 offset {
    oc(6:0)=1100011,
    eoc(14:12)=001,
    reg(19:15)=rs1,
    reg(24:20)=rs2,
    address-rel(11:8|30:25|7|31)=offset,
    help='if rs1 != rs2 then PC = PC + imm',
    {
        (SE_IMM=1, OFFSET=0, SIZE=1100, X2_IMM=1, M4=0, AluOp=10101, BRANCH=01)
    }
}

#  BLT rs1,rs2,offset         Branch Less Than                     if rs1 < rs2 then pc ← pc + sext(offset)
blt rs1 rs2 offset {
    oc(6:0)=1100011,
    eoc(14:12)=100,
    reg(19:15)=rs1,
    reg(24:20)=rs2,
    address-rel(11:8|30:25|7|31)=offset,
    help='if rs1 < rs2 (signed) then PC = PC + imm',
    {
        (SE_IMM=1, OFFSET=0, SIZE=1100, X2_IMM=1, M4=0, AluOp=10110, BRANCH=01)
    }
}

#  BGE rs1,rs2,offset         Branch Greater or Equal              if rs1 >= rs2 then pc ← pc + sext(offset)
bge rs1 rs2 offset {
    oc(6:0)=1100011,
    eoc(14:12)=101,
    reg(19:15)=rs1,
    reg(24:20)=rs2,
    address-rel(11:8|30:25|7|31)=offset,
    help='if rs1 >= rs2 (signed) then PC = PC + imm',
    {
        (SE_IMM=1, OFFSET=0, SIZE=1100, X2_IMM=1, M4=0, AluOp=10111, BRANCH=01)
    }
}

#  BLTU rs1,rs2,offset        Branch Less Than Unsigned            if rs1 < rs2 then pc ← pc + sext(offset)
bltu rs1 rs2 offset {
    oc(6:0)=1100011,
    eoc(14:12)=110,
    reg(19:15)=rs1,
    reg(24:20)=rs2,
    address-rel(11:8|30:25|7|31)=offset,
    help='if rs1 < rs2 (unsigned) then PC = PC + imm',
    {
        (SE_IMM=1, OFFSET=0, SIZE=1100, X2_IMM=1, M4=0, AluOp=11000, BRANCH=01)
    }
}

#  BGEU rs1,rs2,offset        Branch Greater or Equal Unsigned     if rs1 >= rs2 then pc ← pc + sext(offset)
bgeu rs1 rs2 offset {
    oc(6:0)=1100011,
    eoc(14:12)=111,
    reg(19:15)=rs1,
    reg(24:20)=rs2,
    address-rel(11:8|30:25|7|31)=offset,
    help='if rs1 >= rs2 (unsigned) then PC = PC + imm',
    {
        (SE_IMM=1, OFFSET=0, SIZE=1100, X2_IMM=1, M4=0, AluOp=11001, BRANCH=01)
    }
}

#  JAL rd,offset              Jump and Link                       rd ← pc + 4
#                                                               pc ← pc + sext(offset)
addpc offset {
    oc(6:0)=1101111,
    address-rel(30:21|20|19:12|31)=offset,
    help='PC = PC + imm',
    {
        (SE_IMM=1, OFFSET=0, SIZE=10100, X2_IMM=1, M3=1, M4=11, AluOp=1010, BRANCH=10)
    }
}

#  JALR_SAVE rd               JALR Save (pseudo)                  rd ← pc + 4
#                                                               (no jump, for splitting JALR into two steps)
savepc rd imm {
    oc(6:0)=0001011,
    eoc(14:12|31:25)=0000000000,
    reg(11:7)=rd,
    imm(31:20)=imm,
    help='rd = PC + imm',
    {
        (SE_IMM=1, OFFSET=0, SIZE=1100, X2_IMM=0, M3=1, M4=11, AluOp=1010, RW)
    }
}

#  JALR_JUMP rs1,imm         JALR Jump (pseudo)                  pc ← rs1 + sext(imm)
#                                                               (no link, for splitting JALR into two steps)
jumpto rs1 imm {
    oc(6:0)=1100111,
    eoc(14:12)=000,
    reg(19:15)=rs1,
    imm(31:20)=imm,
    help='PC = rs1 + imm',
    {
        (SE_IMM=1, OFFSET=0, SIZE=1100, X2_IMM=0, M4=11, AluOp=1010, BRANCH=10)
    }
}

pseudoinstructions
{
    # beqz rs1, offset        beq rs, x0, offset        Branch if = zero
    beqz rs=reg, offset=imm
    {
        beq rs, zero, offset
    }

    # bnez rs1, offset        bne rs, x0, offset        Branch if != zero
    bnez rs=reg, offset=imm
    {
        bne rs, zero, offset
    }

    # blez rs1, offset        bge x0, rs, offset        Branch if <= zero
    blez rs=reg, offset=imm
    {
        bge zero, rs, offset
    }

    # bgez rs1, offset        bge rs, x0, offset        Branch if >= zero
    bgez rs=reg, offset=imm
    {
        bge rs, zero, offset
    }

    # bltz rs1, offset        blt rs, x0, offset        Branch if < zero
    bltz rs=reg, offset=imm
    {
        blt rs, zero, offset
    }

    # bgtz rs1, offset        blt x0, rs, offset        Branch if > zero
    bgtz rs=reg, offset=imm
    {
        blt zero, rs, offset
    }

    # bgt rs, rt, offset        blt rt, rs, offset        Branch if >
    bgt rs=reg, rt=reg, offset=imm
    {
        blt rt, rs, offset
    }

    # ble rs, rt, offset        bge rt, rs, offset        Branch if <=
    ble rs=reg, rt=reg, offset=imm
    {
        bge rt, rs, offset
    }

    # bgtu rs, rt, offset        bltu rt, rs, offset        Branch if >, unsigned
    bgtu rs=reg, rt=reg, offset=imm
    {
        bltu rt, rs, offset
    }

    # bleu rs, rt, offset        bgeu rt, rs, offset        Branch if <=, unsigned
    bleu rs=reg, rt=reg, offset=imm
    {
        bgeu rt, rs, offset
    }

    # li rd, expression        (several expansions)        Load immediate
    li rd=reg, expression=imm
    {
        lui  rd,     sel(31,12,expression)
        addi rd, rd, sel(11,0,expression)
    }

    # la rd, label        (several expansions)        Load address
    la rd=reg, label=imm
    {
        lui  rd,     sel(31,12,label)
        addu rd, rd, sel(11,0,label)
    }

    # mv rd, rs               addi rd, rs, 0              Copy register
    mv rd=reg, rs=reg
    {
        addi rd, rs, 0
    }

    # nop                     addi x0, x0, 0              No operation
    nop
    {
        addi zero, zero, 0
    }
    
    # not rd, rs1        xori rd, rs, -1        One’s complement
    not rd=reg, rs=reg
    {
        xori rd, rs, -1
    }

    # neg rd, rs1        sub rd, x0, rs        Two’s complement
    neg rd=reg, rs=reg
    {
        sub rd, zero, rs
    }

    # ret                jalr x0, x1, 0        Return from subroutine
    ret
    {
        jumpto ra, 0
    }
    
    # jal rd, offset              Jump and Link                rd ← pc + 4, pc ← pc + sext(offset)
    jal rd=reg, offset=imm
    {
        savepc rd 8
        addpc offset
    }

    # j offset          addpc x0, offset         Jump
    j offset=imm
    {
        addpc offset
    }

    # jr rs            jalr x0, rs, 0        Jump register
    jr rs=reg
    {
        jumpto rs, 0
    }

    # jalr rd, offset(rs1)              Jump and Link Register      rd ← pc + 4
    #                                                               pc ← rs1 + sext(imm)
    jalr rd=reg, rs1=reg, offset=imm
    {
        savepc rd 8 # PC at next of jumpto
        jumpto rs1, offset
    }
}

registers
{
    0=(zero,  x0),
    1=(ra,    x1),
    2=(sp,    x2) (stack_pointer),
    3=(gp,    x3),
    4=(tp,    x4),
    5=(t0,    x5),
    6=(t1,    x6),
    7=(t2,    x7),
    8=(s0,fp, x8),
    9=(s1,    x9),
    10=(a0,  x10),
    11=(a1,  x11),
    12=(a2,  x12),
    13=(a3,  x13),
    14=(a4,  x14),
    15=(a5,  x15),
    16=(a6,  x16),
    17=(a7,  x17),
    18=(s2,  x18),
    19=(s3,  x19),
    20=(s4,  x20),
    21=(s5,  x21),
    22=(s6,  x22),
    23=(s7,  x23),
    24=(s8,  x24),
    25=(s9,  x25),
    26=(s10, x26),
    27=(s11, x27),
    28=(t3,  x28),
    29=(t4,  x29),
    30=(t5,  x30),
    31=(t6,  x31)
}
