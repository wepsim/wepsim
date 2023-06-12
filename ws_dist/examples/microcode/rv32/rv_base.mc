#
# WepSIM (https://wepsim.github.io/wepsim/)
#

begin
{
   fetch:   # IR <- MP[PC]
              (IMR),
            # Decode, PC <- PC + 4
              (AluOp=1010, M3=01, M4, PCWrite, IRWrite),
            # Control Unit signal
              (CU=10)

}


#  LUI rd,imm         Load Upper Immediate                     rd ← imm << 12
lui rd inm {
      co=111111,
      nwords=1,
      rd=reg(25,21),
      inm=inm(15,0),
      help='rd = (inm << 12)',
      {
          (OFFSET=0, SIZE=10000, GEN_IMM=1, REG_W2=10101, RW),
          # TODO: rd <- lui(imm)
          (M2, M3=10, AluOp=1010, WOut),
          (REG_W2=10101, RW, CU=11)
      }
}

#
# LOAD/STORE
#

lw reg addr {
         co=000100,
         nwords=1,
         reg=reg(25,21),
         addr=address(15,0)abs,
         help='r1 = (MEM[addr] ... MEM[addr+3])',
         {
             (OFFSET=0, SIZE=10000, GEN_IMM=1, M3=10, DMR),
             (REG_W2=10101, RW)
         }
}

sw reg addr {
         co=000101,
         nwords=1,
         reg=reg(25,21),
         addr=address(15,0)abs,
         help='MEM[addr] = r1',
         {
             (OFFSET=0, SIZE=10000, GEN_IMM=1, REG_R1=10101, M2, M3=10, AluOp=11111, WOut),
             (DMW),
             (REG_W2=10101, RW)
         }
}

lb reg addr {
         co=001000,
         nwords=1,
         reg=reg(25,21),
         addr=address(15,0)abs,
         help='r1 = MEM[addr]',
         {
             (OFFSET=0, SIZE=10000, GEN_IMM=1, M3=10, WBE, DMR),
             (REG_W2=10101, RW)
         }
}

sb reg addr {
         co=001001,
         nwords=1,
         reg=reg(25,21),
         addr=address(15,0)abs,
         help='MEM[addr] = r1',
         {
             (OFFSET=0, SIZE=10000, GEN_IMM=1, REG_R1=10101, M2, M3=10, AluOp=11111, WOut),
             (WBE, DMW),
             (REG_W2=10101, RW)
         }
}

#  AND rd,rs1,rs2         And                                 rd ← ux(rs1) ∧ ux(rs2)
and reg1 reg2 reg3 {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      reg2=reg(20,16),
      reg3=reg(15,11),
      help='r1 = r2 & r3',
      {
          (REG_R1=10000, REG_R2=1011, REG_W2=10101, RW),
          (M2, M3=0, AluOp=0001, WOut),
          (REG_W2=10101, RW, CU=11)
      }
}

#  ANDI rd,rs1,imm         And Immediate                         rd ← ux(rs1) ∧ ux(imm)
andi reg1 reg2 inm {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      reg2=reg(20,16),
      inm=inm(15,0),
      help='rd = rs1 & inm',
      {
          (OFFSET=0, SIZE=10000, GEN_IMM=1, REG_W2=10101, REG_R1=10000, RW),
          (M2, M3=10, AluOp=0001, WOut),
          (REG_W2=10101, RW, CU=11)
      }
}

#  OR rd,rs1,rs2         Or                                 rd ← ux(rs1) ∨ ux(rs2)
or reg1 reg2 reg3 {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      reg2=reg(20,16),
      reg3=reg(15,11),
      help='r1 = r2 | r3',
      {
          (REG_R1=10000, REG_R2=1011, REG_W2=10101, RW),
          (M2, M3=0, AluOp=0010, WOut),
          (REG_W2=10101, RW, CU=11)
      }
}

#  ORI rd,rs1,imm         Or Immediate                         rd ← ux(rs1) ∨ ux(imm)
ori reg1 reg2 inm {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      reg2=reg(20,16),
      inm=inm(15,0),
      help='rd = rs1 | inm',
      {
          (OFFSET=0, SIZE=10000, GEN_IMM=1, REG_W2=10101, REG_R1=10000, RW),
          (M2, M3=10, AluOp=0010, WOut),
          (REG_W2=10101, RW, CU=11)
      }
}

#  XOR rd,rs1,rs2         Xor                                 rd ← ux(rs1) ⊕ ux(rs2)
xor reg1 reg2 reg3 {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      reg2=reg(20,16),
      reg3=reg(15,11),
      help='r1 = r2 ^ r3',
      {
          (REG_R1=10000, REG_R2=1011, REG_W2=10101, RW),
          (M2, M3=0, AluOp=0100, WOut),
          (REG_W2=10101, RW, CU=11)
      }
}

#  XORI rd,rs1,imm         Xor Immediate                         rd ← ux(rs1) ⊕ ux(imm)
xori reg1 reg2 inm {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      reg2=reg(20,16),
      inm=inm(15,0),
      help='rd = ux(rs1) ^ ux(inm)',
      {
          (OFFSET=0, SIZE=10000, GEN_IMM=1, REG_W2=10101, REG_R1=10000, RW),
          (M2, M3=10, AluOp=0100, WOut),
          (REG_W2=10101, RW, CU=11)
      }
}

#  ADD rd,rs1,rs2         Add                                 rd ← sx(rs1) + sx(rs2)
add reg1 reg2 reg3 {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      reg2=reg(20,16),
      reg3=reg(15,11),
      help='r1 = r2 + r3',
      {
          (REG_R1=10000, REG_R2=1011, REG_W2=10101, RW),
          (M2, M3=0, AluOp=1010, WOut),
          (REG_W2=10101, RW, CU=11)
      }
}

#  ADDI rd,rs1,imm         Add Immediate                         rd ← rs1 + sx(imm)
addi reg1 reg2 inm {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      reg2=reg(20,16),
      inm=inm(15,0),
      help='rd = rs1 + SignEx(inm)',
      {
          (OFFSET=0, SIZE=10000, GEN_IMM=1, REG_W2=10101, REG_R1=10000, RW),
          (M2, M3=10, AluOp=1010, WOut),
          (REG_W2=10101, RW, CU=11)
      }
}

#  SUB rd,rs1,rs2         Subtract                         rd ← sx(rs1) - sx(rs2)
sub reg1 reg2 reg3 {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      reg2=reg(20,16),
      reg3=reg(15,11),
      help='r1 = r2 - r3',
      {
          (REG_R1=10000, REG_R2=1011, REG_W2=10101, RW),
          (M2, M3=0, AluOp=1011, WOut),
          (REG_W2=10101, RW, CU=11)
      }
}


#  SUBI rd,rs1,imm         Sub Immediate                         rd ← rs1 - sx(imm)
subi reg1 reg2 inm {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      reg2=reg(20,16),
      inm=inm(15,0),
      help='rd = rs1 - SignEx(inm)',
      {
          (OFFSET=0, SIZE=10000, GEN_IMM=1, REG_W2=10101, REG_R1=10000, RW),
          (M2, M3=10, AluOp=1011, WOut),
          (REG_W2=10101, RW, CU=11)
      }
}

# MUL rd,rs1,rs2         Multiply         rd ← ux(rs1) × ux(rs2)
mul reg1 reg2 reg3 {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      reg2=reg(20,16),
      reg3=reg(15,11),
      help='reg1 = reg2 * reg3',
      {
          (REG_R1=10000, REG_R2=1011, REG_W2=10101, RW),
          (M2, M3=0, AluOp=1100, WOut),
          (REG_W2=10101, RW, CU=11)
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
