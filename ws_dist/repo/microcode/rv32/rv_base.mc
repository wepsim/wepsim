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
      help='rd = rs1 + SignEx(imm)',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1010, WOut),
          (RW, CU=11)
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
          (SE_IMM=0, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=10000, WOut),
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
      help='rd = rs1 & imm',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=0001, WOut),
          (RW, CU=11)
      }
}

#  AUIPC rd,offset         Add Upper Immediate to PC         rd ← pc + (offset << 12)
auipc rd offset {
      oc(6:0)=0010111,
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
      eoc(14:12)=101,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:8|30:25|7|31)=offset,
      help='if (rs1 >= rs2) pc += offset',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1, M2=0, M3=10, AluOp=1010, WOut),
          (),
          (M2, M3=0, AluOp=1011),
          (CU=100, MADDR=bck3ftch),
          (CU=11),
bck3ftch: (PCWrite, CU=11)
      }
}

#  BGEU rs1,rs2,offset         Branch Greater than Equal             if rs1 ≥ rs2 then pc ← pc + offset
bgeu rs1 rs2 offset {
      oc(6:0)=1100011,
      eoc(14:12)=111,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      address-rel(11:8|30:25|7|31)=offset,
      help='if (rs1 >= rs2) pc += offset',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1, M2=0, M3=10, AluOp=1010, WOut),
          (),
          (M2, M3=0, AluOp=10001),
          (CU=100, MADDR=bck4ftch),
          (CU=11),
bck4ftch: (PCWrite, CU=11)
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
          (CU=101, MADDR=bck5ftch),
          (CU=11),
bck5ftch: (PCWrite, CU=11)
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
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1, M2=0, M3=10, AluOp=1010, WOut),
          (),
          (M2, M3=0, AluOp=10001),
          (CU=101, MADDR=bck6ftch),
          (CU=11),
bck6ftch: (PCWrite, CU=11)
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
          (CU=110, MADDR=bck7ftch),
          (CU=11),
bck7ftch: (PCWrite, CU=11)
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
          #if (rs2 == 0)
          (),
          (M2, M3=1, AluOp=1100),
          (CU=111, MADDR=fpe1),
          # rd = rs1 / rs2, go fetch
          (M2, M3=0, AluOp=1101, WOut),
          (RW, CU=11)
    fpe1: # future work: to signal exception so it can be handled
          (CU=11)
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
          #if (rs2 == 0)
          (),
          (M2, M3=1, AluOp=1100),
          (CU=111, MADDR=fpe2),
          # rd = rs1 / rs2, go fetch
          (M2, M3=0, AluOp=10011, WOut),
          (RW, CU=11)
    fpe2: # future work: to signal exception so it can be handled
          (CU=11)
      }
}

ecall {
     oc(6:0)=1110011,
     eoc(14:12|31:25)=0000000000,
     help='environment call',
     {
         (CU=11)
     }
}

ebreak {
     oc(6:0)=1110011,
     eoc(14:12|31:25)=0000000001,
     help='environment break',
     {
         (CU=11)
     }
}

#  FENCE pred,succ         Fence
fence pred succ {
      oc(6:0)=0001111,
      imm(27:24)=pred,
      imm(23:20)=succ,
      {
          (CU=11)
      }
}

#  FENCE.I             Fence Instruction
fence.i {
      oc(6:0)=0011111,
      {
          (CU=11)
      }
}

#  JAL rd,offset        Jump and Link                       rd ← pc + 4
#                                                           pc ← pc + offset
jal rd offset {
      oc(6:0)=1101111,
      reg(11:7)=rd,
      address-rel(30:21|20|19:12|31)=offset,
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

#  LB rd,offset(rs1)         Load Byte                         rd ← s8[rs1 + offset]
lb rd offset(rs1) {
      oc(6:0)=0000011,
      eoc(14:12)=000,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-abs(31:20)=offset,
      help='rd = (00, 00, 00, MEM[rs1 + offset])',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1010, SE=1, WBE=1, DMR, RW, CU=11)
      }
}

#  LBU rd,offset(rs1)         Load Byte Unsigned                rd ← s8[rs1 + offset]
lbu rd offset(rs1) {
      oc(6:0)=0000011,
      eoc(14:12)=100,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-abs(31:20)=offset,
      help='rd = (00, 00, 00, MEM[rs1 + offset])',
      {
          (SE_IMM=0, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1010, SE=0, WBE=1, DMR, RW, CU=11)
      }
}

#  LH rd,offset(rs1)         Load Half                         rd ← s16[rs1 + offset]
lh rd offset(rs1) {
      oc(6:0)=0000011,
      eoc(14:12)=001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-abs(31:20)=offset,
      help='rd = (00, 00, MEM[rs1+offset+1], MEM[rs1+offset])',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1010, SE=1, WBE=10, DMR, RW, CU=11)
      }
}

#  LHU rd,offset(rs1)         Load Half Unsigned                rd ← s16[rs1 + offset]
lhu rd offset(rs1) {
      oc(6:0)=0000011,
      eoc(14:12)=101,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      address-abs(31:20)=offset,
      help='rd = (00, 00, MEM[rs1+offset+1], MEM[rs1+offset])',
      {
          (SE_IMM=0, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1010, SE=0, WBE=10, DMR, RW, CU=11)
      }
}

#  LUI rd,imm         Load Upper Immediate                     rd ← imm << 12
lui rd imm {
      oc(6:0)=0010110,
      reg(11:7)=rd,
      imm(31:12)=imm,
      help='rd = (imm << 12)',
      {
          (SE_IMM=1, OFFSET=1100, SIZE=10100, GEN_IMM=1, M2, M3=10, AluOp=11111, WOut),
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
      help='rd = (MEM[rs1+offset+3] .. MEM[rs1+offset])',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1010, DMR, RW, CU=11)
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
          (),
          (M2, M3=0, AluOp=1100, WOut),
          (RW, CU=11)
      }
}

# MULH rd,rs1,rs2         Multiply High Signed         rd ← (sx(rs1) × sx(rs2)) » xlen
mulh rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=0010000001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='r1 = r2 * r3',
      help='reg1 = reg2/16 * reg3/16',
      native,
      {
          // fields is a default parameter with the instruction field information
          var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
          var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
          var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

          var op1 = simcore_native_get_value("BR", reg2) ;
          var op2 = simcore_native_get_value("BR", reg3) ;
          var result = (op1 * op2) >> 32 ;
          simcore_native_set_value("BR", reg1, result) ;

          simcore_native_go_maddr(0) ;
      }
}

# MULHSU rd,rs1,rs2         Multiply High Signed Unsigned         rd ← (sx(rs1) × ux(rs2)) » xlen
mulhsu rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=0100000001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='r1 = r2 * r3',
      help='reg1 = reg2/16 * ux(reg3/16)',
      native,
      {
          // fields is a default parameter with the instruction field information
          var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
          var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
          var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

          var op1 = simcore_native_get_value("BR", reg2) ;
          var op2 = simcore_native_get_value("BR", reg3) >>> 0 ;
          var result = (op1 * op2) >> 32 ;
          simcore_native_set_value("BR", reg1, result) ;

          simcore_native_go_maddr(0) ;
      }
}

# MULHU rd,rs1,rs2         Multiply High Unsigned Unsigned         rd ← (ux(rs1) × ux(rs2)) » xlen
mulhu rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=0110000001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='r1 = r2 * r3',
      help='reg1 = ux(reg2/16) * ux(reg3/16)',
      native,
      {
          // fields is a default parameter with the instruction field information
          var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
          var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
          var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

          var op1 = simcore_native_get_value("BR", reg2) >>> 0 ;
          var op2 = simcore_native_get_value("BR", reg3) >>> 0 ;
          var result = (op1 * op2) >> 32 ;
          simcore_native_set_value("BR", reg1, result) ;

          simcore_native_go_maddr(0) ;
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
      help='rd = rs1 | imm',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=0010, WOut),
          (RW, CU=11)
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
          (),
          (M2, M3=0, AluOp=1110, WOut),
          (RW, CU=11)
      }
}

# REMU rd,rs1,rs2         Remainder Unsigned         rd ← ux(rs1) mod ux(rs2)
remu rd rs1 rs2 {
      oc(6:0)=0110011,
      eoc(14:12|31:25)=1110000001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      reg(24:20)=rs2,
      help='reg1 = ux(reg2) % ux(reg3)',
      native,
      {
          // fields is a default parameter with the instruction field information
          var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
          var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
          var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

          var val1 = simcore_native_get_value("BR", reg2) ;
          var val2 = simcore_native_get_value("BR", reg3) ;
          simcore_native_set_value("BR", reg1, Math.abs(val1) % Math.abs(val2)) ;

          simcore_native_go_maddr(0) ;
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
            (),
            (M2, M3=0, AluOp=111, WOut),
            (RW, CU=11)
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
            (SE_IMM=1, OFFSET=0, SIZE=101, GEN_IMM=1),
            (M2, M3=10, AluOp=111, WOut),
            (RW, CU=11)
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
          (),
          (M2, M3=0, AluOp=1011, M1, RW, CU=11),
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
      native,
      {
          // fields is a default parameter with the instruction field information
          var rd   = simcore_native_get_field_from_ir(fields, 0) ;
          var rs1  = simcore_native_get_field_from_ir(fields, 1) ;
          var inm1 = simcore_native_get_field_from_ir(fields, 2) ;

          if (inm1 & 0x00008000)
              inm1 = inm1 | 0xFFFF0000 ;

          var reg1 = simcore_native_get_value("BR", rs1) ;
          simcore_native_set_value("BR", rd, (reg1 < inm1)) ;

          simcore_native_go_maddr(0) ;
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
          (),
          (M2, M3=0, AluOp=10001, M1, RW, CU=11),
      }
}

#  SLTIU rd,rs1,imm         Set Less Than Immediate Unsigned         rd ← ux(rs1) < ux(imm)
sltiu rd rs1 imm {
      oc(6:0)=0010011,
      eoc(14:12)=011,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = (ux(rs1) < ux(imm)) ? 1 : 0',
      native,
      {
          // fields is a default parameter with the instruction field information
          var rd   = simcore_native_get_field_from_ir(fields, 0) ;
          var rs1  = simcore_native_get_field_from_ir(fields, 1) ;
          var inm1 = simcore_native_get_field_from_ir(fields, 2) ;

          var reg1 = simcore_native_get_value("BR", rs1) ;
          simcore_native_set_value("BR", rd, (Math.abs(reg1) < Math.abs(inm1))) ;

          simcore_native_go_maddr(0) ;
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
            (),
            (M2, M3=0, AluOp=110, WOut),
            (RW, CU=11)
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
            (SE_IMM=1, OFFSET=0, SIZE=101, GEN_IMM=1),
            (M2, M3=10, AluOp=110, WOut),
            (RW, CU=11)
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
            (),
            (M2, M3=0, AluOp=101, WOut),
            (RW, CU=11)
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
      native,
      {
          // fields is a default parameter with the instruction field information
          var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
          var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
          var val1 = simcore_native_get_field_from_ir(fields, 2) ;

          var result = simcore_native_get_value("BR", reg2) >>> val1 ;
          simcore_native_set_value("BR", reg1, result) ;

          simcore_native_go_maddr(0) ;
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
      oc(6:0)=1000000,
      eoc(14:12)=001,
      reg(11:7)=rd,
      reg(19:15)=rs1,
      imm(31:20)=imm,
      help='rd = rs1 - SignEx(imm)',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1011, WOut),
          (RW, CU=11)
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
          (),
          (M2, M3=0, AluOp=11111, WOut),
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1010),
          (WBE=1, DMW, CU=11)
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
          (),
          (M2, M3=0, AluOp=11111, WOut),
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=1010),
          (WBE=10, DMW, CU=11)
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
      help='rd = rs1 ^ imm',
      {
          (SE_IMM=1, OFFSET=0, SIZE=1100, GEN_IMM=1),
          (M2, M3=10, AluOp=0100, WOut),
          (RW, CU=11)
      }
}

pseudoinstructions
{
    # beqz rs1, offset        beq rs, x0, offset        Branch if = zero
    beqz rs=reg, offset=inm
    {
        beq rs, zero, offset
    }

    # bnez rs1, offset        bne rs, x0, offset        Branch if ≠ zero
    bnez rs=reg, offset=inm
    {
        bne rs, zero, offset
    }

    # blez rs1, offset        bge x0, rs, offset        Branch if ≤ zero
    blez rs=reg, offset=inm
    {
        bge zero, rs, offset
    }

    # bgez rs1, offset        bge rs, x0, offset        Branch if ≥ zero
    bgez rs=reg, offset=inm
    {
        bge rs, zero, offset
    }

    # bltz rs1, offset        blt rs, x0, offset        Branch if < zero
    bltz rs=reg, offset=inm
    {
        blt rs, zero, offset
    }

    # bgtz rs1, offset        blt x0, rs, offset        Branch if > zero
    bgtz rs=reg, offset=inm
    {
        blt zero, rs, offset
    }

    # bgt rs, rt, offset        blt rt, rs, offset        Branch if >
    bgt rs=reg, rt=reg, offset=inm
    {
        blt rt, rs, offset
    }

    # ble rs, rt, offset        bge rt, rs, offset        Branch if ≤
    ble rs=reg, rt=reg, offset=inm
    {
        bge rt, rs, offset
    }

    # bgtu rs, rt, offset        bltu rt, rs, offset        Branch if >, unsigned
    bgtu rs=reg, rt=reg, offset=inm
    {
        bltu rt, rs, offset
    }

    # bleu rs, rt, offset        bltu rt, rs, offset        Branch if ≤, unsigned
    bleu rs=reg, rt=reg, offset=inm
    {
        bgeu rt, rs, offset
    }

    # li rd, expression        (several expansions)        Load immediate
    li rd=reg, expression=inm
    {
        lui  rd,     sel(31,12,expression)
        addi rd, rd, sel(11,0,expression)
    }

    # la rd, label        (several expansions)        Load address
    la rd=reg, label=inm
    {
        lui  rd,     sel(31,12,label)
        addu rd, rd, sel(11,0,label)
    }

    # mv rd, rs1        addi rd, rs, 0        Copy register
    mv rd=reg, rs=reg
    {
        addi rd, rs, 0
    }

    # nop        addi zero,zero,0        No operation
    nop
    {
        addi zero zero 0
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

    # j offset        jal x0, offset        Jump
    j offset=inm
    {
        jal zero, offset
    }

    # jal offset        jal x1, offset        Jump register
    #jal offset=inm
    #{
    #    jal ra, offset
    #}

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

