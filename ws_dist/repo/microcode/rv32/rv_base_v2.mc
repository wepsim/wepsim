#
# WepSIM (https://wepsim.github.io/wepsim/)
#

firmware_version=2,
begin
{
   fetch:   # IR <- MP[PC]
              (IMR),
            # Decode, PC <- PC + 4
              (AluOp=1010, M3=01, M4, PCWrite, IRWrite),
            # Control Unit signal
              (CU=10)

}

#  ADD rd,rs1,rs2         Add                                 rd ← sx(rs1) + sx(rs2)
add rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=0000000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='r1 = r2 + r3',
      {
          (),
          (M2, M3=0, AluOp=1010, WOut),
          (RW, CU=11)
      }
}

#  ADDI rd,rs1,imm         Add Immediate                         rd ← rs1 + sx(imm)
addi rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 + SignEx(inm)',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1010, WOut),
          (RW, CU=11)
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
          (),
          (M2, M3=0, AluOp=0001, WOut),
          (RW, CU=11)
      }
}

#  ANDI rd,rs1,imm         And Immediate                         rd ← ux(rs1) ∧ ux(imm)
andi rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=111,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 & inm',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=0001, WOut),
          (RW, CU=11)
      }
}

#  AUIPC rd,offset         Add Upper Immediate to PC         rd ← pc + (offset << 12)
auipc rd offset {
      oc(6:0)=0010111
      reg(11:7)=rd,
      imm(31:12)=offset,
      help='rd = pc + (offset << 12)',
      {
          (SE_IMM=1, OFFSET=1100, SIZE=10100, GEN_IMM=1, M2=0, M3=10, AluOp=1010, WOut),
          (RW, CU=11)
      }
}

#  BEQ rs1,rs2,offset         Branch Equal                         if rs1 = rs2 then pc ← pc + offset
beq rs1 rs2 offset {
      oc(6:0)=1100011,
      eoc(14:12)=000,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:8|30:25|7|31)=offset,
      help='if ($r1 == $r2) pc += offset',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1, M2=0, M3=10, AluOp=1010, WOut),
          (),
          (M2, M3=0, AluOp=1011),
          (CU=111, MADDR=bck2ftch),
          (CU=11),
bck2ftch: (PCWrite, CU=11)
      }
}

#  BGE rs1,rs2,offset         Branch Greater than Equal             if rs1 ≥ rs2 then pc ← pc + offset
bge rs1 rs2 offset {
      oc(6:0)=1100011,
      eoc(14:12)=101
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:8|30:25|7|31)=offset,
      help='if (rs1 >= rs2) pc += offset',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1, M2=0, M3=10, AluOp=1010, WOut),
          (),
          (M2, M3=0, AluOp=1011, jump, CU=11)
      }
}

#  BGEU rs1,rs2,offset         Branch Greater than Equal             if rs1 ≥ rs2 then pc ← pc + offset
bgeu rs1 rs2 offset {
      oc(6:0)=1100011,
      eoc(14:12)=111
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:8|30:25|7|31)=offset,
      help='if (rs1 >= rs2) pc += offset',
      {
          (SE_IMM=0, OFFSET=0, SIZE=1100, GEN_IMM=1, M2=0, M3=10, AluOp=1010, WOut),
          (),
          (M2, M3=0, AluOp=1011, jump, CU=11)
      }
}

# BLT
#  BLT rs1,rs2,offset         Branch Less Than             if rs1 < rs2 then pc ← pc + offset
blt rs1 rs2 offset {
      oc(6:0)=1100011,
      eoc(14:12)=100,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:8|30:25|7|31)=offset,
      help='if ($r1 < $r2) pc += offset',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1, M2=0, M3=10, AluOp=1010, WOut),
          (),
          (M2, M3=0, AluOp=1011),
          (CU=101, MADDR=bck3ftch),
          (CU=11),
bck3ftch: (PCWrite, CU=11)
      }
}

#  BLTU rs1,rs2,offset         Branch Less Than Unsigned             if rs1 < rs2 then pc ← pc + offset
bltu rs1 rs2 offset {
      oc(6:0)=1100011,
      eoc(14:12)=110,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:8|30:25|7|31)=offset,
      help='if ($r1 < $r2) pc += offset',
      {
          (SE_IMM=0, OFFSET=0, SIZE=1100, GEN_IMM=1, M2=0, M3=10, AluOp=1010, WOut),
          (),
          (M2, M3=0, AluOp=1011),
          (CU=101, MADDR=bck4ftch),
          (CU=11),
bck4ftch: (PCWrite, CU=11)
      }
}

#  BNE rs1,rs2,offset         Branch Not Equal                     if rs1 ≠ rs2 then pc ← pc + offset
bne rs1 rs2 offset {
      oc(6:0)=1100011,
      eoc(14:12)=001,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:8|30:25|7|31)=offset,
      help='if ($r1 != $r2) pc += offset',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1, M2=0, M3=10, AluOp=1010, WOut),
          (),
          (M2, M3=0, AluOp=1011),
          (CU=110, MADDR=bck5ftch),
          (CU=11),
bck5ftch: (PCWrite, CU=11)
      }
}

#  JAL rd,offset        Jump and Link                       rd ← pc + 4
#                                                           pc ← pc + offset
jal rd offset {
      oc(6:0)=1101111,
      reg(11:7)=rd,
      address-abs(30:21|20|19:12|31)=offset,
      help='rd = pc; pc = pc + sext(offset)',
      {
          (M2=0, AluOp=11110, WOut),
          (RW),
          (SE_IMM=1, OFFSET=0, SIZE=10100, GEN_IMM=1, M2=0, M3=10, AluOp=1010, M4, PCWrite, CU=11)
      }
}

#  JALR rd,rs1,offset   Jump and Link Register              rd ← pc + 4
#                                                           pc ← (rs1 + offset) & -2 # FIX -1
jalr rd rs1 offset {
      oc(6:0)=1100111,
      eoc(14:12)=000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-rel(31:20)=offset,
      help='rd = pc; pc = rs1 + offset',
      {
          (M2=0, AluOp=11110, WOut),
          (RW),
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1, M2, M3=10, AluOp=1010, M4, PCWrite, CU=11)
      }
}

#  LUI rd,imm         Load Upper Immediate                     rd ← imm << 12
lui rd imm {
      oc(6:0)=0110111,
      reg(11:7)=rd,
      imm(31:12)=imm,
      help='rd = (inm << 12)',
      {
          (SE_IMM=1, OFFSET=10100, SIZE=10100, GEN_IMM=1, M2, M3=10, AluOp=11111, WOut),
          (RW, CU=11)
      }
}

#  LW rd,offset(rs1)         Load Word                         rd ← s32[rs1 + offset]
lw rd offset(rs1) {
      oc(6:0)=0000011,
      eoc(14:12)=010,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-abs(31:20)=offset,
      help='r1 = (MEM[addr] ... MEM[addr+3])',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1010, DMR),
          (RW, CU=11)
      }
}

#  OR rd,rs1,rs2         Or                                 rd ← ux(rs1) ∨ ux(rs2)
or rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=1100000000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='r1 = r2 | r3',
      {
          (),
          (M2, M3=0, AluOp=0010, WOut),
          (RW, CU=11)
      }
}

#  ORI rd,rs1,imm         Or Immediate                         rd ← ux(rs1) ∨ ux(imm)
ori rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=110,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 | inm',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=0010, WOut),
          (RW, CU=11)
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
          (),
          (M2, M3=0, AluOp=1011, WOut),
          (RW, CU=11)
      }
}

#  SUBI rd,rs1,imm         Sub Immediate                         rd ← rs1 - sx(imm)
subi rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 - SignEx(inm)',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1011, WOut),
          (RW, CU=11)
      }
}

#  SW rs2,offset(rs1)         Store Word                         u32[rs1 + offset] ← rs2
sw rs2 offset(rs1) {
      oc(6:0)=0100011,
      eoc(14:12)=010,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:7|31:25)=offset,
      help='MEM[addr] = r1',
      {
          (),
          (M2, M3=0, AluOp=11111, WOut),
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1010),
          (DMW, CU=11)
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
          (),
          (M2, M3=0, AluOp=0100, WOut),
          (RW, CU=11)
      }
}

#  XORI rd,rs1,imm         Xor Immediate                         rd ← ux(rs1) ⊕ ux(imm)
xori rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=100,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 ^ inm',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=0100, WOut),
          (RW, CU=11)
      }
}

pseudoinstructions
{
    # nop        addi zero,zero,0        No operation
    nop
    {
        addi zero zero 0
    }

    # j offset        jal x0, offset        Jump
    j offset=inm
    {
        jal zero, offset
    }

    # jal offset        jal x1, offset        Jump register
    jal offset=inm
    {
        jal ra, offset
    }

    # jr rs            jalr x0, rs, 0        Jump register
    jr rs=reg
    {
        jalr zero, rs, 0
    }

    # ret        jalr x0, x1, 0        Return from subroutine
    ret
    {
        jalr zero, ra, 0
    }
}

#
# Register naming
#

#        ABI Name       Description                        Saver
#0        zero          Hard-wired zero                    --
#1        ra            Return address                     Caller
#2        sp            Stack pointer                      Callee
#3        gp            Global pointer                     --
#4        tp            Thread pointer                     --
#5        t0            Temporaries                        Caller
#6        t1            Temporaries                        Caller
#7        t2            Temporaries                        Caller
#8        s0/fp         Saved register/frame pointer       Caller
#9        s1            Saved register                     Callee
#10       a0            Function arguments/return values   Caller
#11       a1            Function arguments/return values   Caller
#12       a2            Function arguments                 Caller
#13       a3            Function arguments                 Caller
#14       a4            Function arguments                 Caller
#15       a5            Function arguments                 Caller
#16       a6            Function arguments                 Caller
#17       a7            Function arguments                 Caller
#18       s2            Saved registers                    Callee
#19       s3            Saved registers                    Callee
#20       s4            Saved registers                    Callee
#21       s5            Saved registers                    Callee
#22       s6            Saved registers                    Callee
#23       s7            Saved registers                    Callee
#24       s8            Saved registers                    Callee
#25       s9            Saved registers                    Callee
#26       s10           Saved registers                    Callee
#27       s11           Saved registers                    Callee
#28       t3            Temporaries                        Caller
#29       t4            Temporaries                        Caller
#30       t5            Temporaries                        Caller
#31       t6            Temporaries                        Caller

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
    8=(s0,    x8),
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

