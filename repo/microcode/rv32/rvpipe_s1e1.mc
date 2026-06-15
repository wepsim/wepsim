#
# WepSIM (https://wepsim.github.io/wepsim/)
#

firmware {
   version  = 2,
   rel_mult = 2,
   endian   = little
}

begin
{
   fetch:   # IR <- MP[PC]
              (IMR),
            # Decode, PC <- PC + 4
              (AluOp=1010, M3=10, M4, PCWrite, IRWrite),
}

#  ADD rd,rs1,rs2         Add                                 rd ← rs1 + rs2
add rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=0000000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      {
          (M2, M3=0, AluOp=1010, M5=0, RW)
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
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1, M2, M3=11, AluOp=1010, M5=0, RW)
      }
}

#  JALR rd,rs1,offset       Jump and Link Register           rd = pc; pc = rs1 + offset
jalr rd rs1 offset {
      oc(6:0)=1100111,
      eoc(14:12)=000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-rel(31:20)=offset,
      {
          (M2=0, AluOp=11110, M5=0, RW)
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1, M2, M3=11, AluOp=1010, M4, PCWrite)
      }
}

#  LUI rd,imm               Load Upper Immediate             rd = (imm << 12)
lui rd imm {
      oc(6:0)=0010110,
      reg(11:7)=rd,
      imm(31:12)=imm,
      {
          (SE_IMM=1, OFFSET=1100, SIZE=10100, GEN_IMM=1, M2, M3=11, AluOp=11111, M5=0, RW)
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

    # jr rs                   jalr zero, rs, 0            Jump register
    jr rs=reg
    {
        jalr zero, rs, 0
    }

    # ret                     jalr zero, ra, 0            Return
    ret
    {
        jalr zero, ra, 0
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
