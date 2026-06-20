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
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, M3=11, AluOp=1010, RW)
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
          (SE_IMM=0, OFFSET=0, SIZE=1100, M3=11, AluOp=10000, RW)
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
          (SE_IMM=1, OFFSET=0, SIZE=1100, M3=11, AluOp=0001, RW)
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
          (SE_IMM=1, OFFSET=0, SIZE=1100, M3=11, AluOp=0010, RW)
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
            (SE_IMM=1, OFFSET=0, SIZE=101, M3=11, AluOp=111, RW)
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
        (SE_IMM=1, OFFSET=0, SIZE=101, M3=11, AluOp=1011, RW)
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
            (SE_IMM=1, OFFSET=0, SIZE=101, M3=11, AluOp=110, RW)
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
            (SE_IMM=1, OFFSET=0, SIZE=101, M3=11, AluOp=101, RW)
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
          (SE_IMM=1, OFFSET=0, SIZE=1100, M3=11, AluOp=1011, RW)
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
          (SE_IMM=1, OFFSET=0, SIZE=1100, M3=11, AluOp=0100, RW)
      }
}

#  LUI rd,imm               Load Upper Immediate             rd = (imm << 12)
lui rd imm {
      oc(6:0)=0010110,
      reg(11:7)=rd,
      imm(31:12)=imm,
      {
          (SE_IMM=1, OFFSET=1100, SIZE=10100, M3=11, AluOp=11111, RW)
      }
}

pseudoinstructions
{
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
    
    # jr rs            jalr x0, rs, 0        Jump register
    jr rs=reg
    {
        addi zero, zero, 0 # nop TODO
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
