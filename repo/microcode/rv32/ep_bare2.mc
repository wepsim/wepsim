
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

firmware_version = 2

begin
{
          # ensure R0 is zero
          (EXCODE=0, T11, MR=1, SelC=0, LC=1),

          # if (INT) go mrti
          (A0=0, B=0, C=1, MADDR=mrti),

 fetch:   # MAR <- PC
          # MBR <- Mem[MAR]
          # IR  <- MBR, PC <- PC + 4
          # jump to associated microcode for op. code
          (T2, C0),
          (TA, R, BW=11, M1=1, C1=1),
          (M2, C2, T1, C3),
          (A0, B=0, C=0),

 mrti:    # MBR <- DB <- INTV
          (INTA, BW=11, M1=1, C1=1),

          # RT1 <- MBR
          (T1=1, C4=1),

 csw_rt1: # push PC
          (MR=1, SELA=10, MA=0, MB=10, MC=1, SELCOP=1011, T6=1, SELC=10, LC=1, C0),
          (T2=1, M1=0, C1),
          (BW=11, TA=1, TD=1, W=1)

          # push SR
          (MR=1, SELA=10, MA=0, MB=10, MC=1, SELCOP=1011, T6=1, SELC=10, LC=1, C0),
          (T8=1, M1=0, C1),
          (BW=11, TA=1, TD=1, W=1),

          # MAR <- RT1*4
          (MA=1, MB=10, MC=1, SELCOP=1100, T6, M2=0, C0),

          # MBR <- MP[MAR]
          (TA=1, R=1, BW=11, M1=1, C1=1),

          # PC <- MAR
          (T1, M2=0, C2),

          # go fetch
          (A0=0, B=1, C=0, MADDR=fetch)
}


#
# INT
#

ecall {
     nwords=1,
     oc(31:26)=111111,
     help='system call',
     {
         # RT1 <- ExCode=2
         (ExCode=10, T11, C4),

         # csw_rt1(2)
         (A0=0, B=1, C=0, MADDR=csw_rt1)
     }
}

sret {
     nwords=1,
     oc(31:26)=111111,
     help='return from event (interruption, exception, syscall)',
     {
         # pop SR
         (MR=1, SELA=10, T9, C0),
         (MR=1, SELA=10, MA=0, MB=10, MC=1, SELCOP=1010, T6=1, SELC=10, LC=1),
         (TA=1, R=1, BW=11, M1=1, C1),
         (T1=1, M7=0, C7),

         # pop PC
         (MR=1, SELA=10, T9, C0),
         (MR=1, SELA=10, MA=0, MB=10, MC=1, SELCOP=1010, T6=1, SELC=10, LC=1),
         (TA=1, R=1, BW=11, M1=1, C1),
         (T1=1, M2=0, C2, A0=1, B=1 ,C=0)
     }
}


#
# IN/OUT
#

in reg val {
     oc(31:26)=111111,
     reg(25:21)=reg,
     inm(15:0)=val,
     help='reg = device_registers[val]',
     {
         (SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
         (TA=1, IOR=1, BW=11, M1=1, C1=1),
         (T1=1, LC=1,  MR=0, SELC=10101, A0=1, B=1, C=0)
     }
}

out reg val {
     oc(31:26)=111111,
     reg(25:21)=reg,
     inm(15:0)=val,
     help='device_register[val] = reg',
     {
         (SE=0, OFFSET=0,   SIZE=10000,   T3=1, C0=1),
         (MR=0, SELA=10101, T9=1,         M1=0, C1=1),
         (TA=1, TD=1,       IOW=1, BW=11, A0=1, B=1, C=0)
     }
}


#
# Related to power consumption
#

# RDCYCLE rd      Load clock cycles     rd ← ux(clock_cycles_acc)
rdcycle reg1  {
      nwords=1,
      oc(31:26)=111111,
      reg(25:21)=reg1,
      help='reg1 = load accumulated clock cycles',
      {
           (MH=1, T12=1, SELC=10101, LC=1, A0=1, B=1, C=0)
      }
}


#
# https://rv8.io/isa.html
# RV32I
# (More details at http://riscvbook.com/spanish/guia-practica-de-risc-v-1.0.5.pdf)
#

#  LUI rd,imm         Load Upper Immediate                     rd ← imm << 12
lui rd inm {
      oc(31:26)=111111,
      reg(25:21)=rd,
      inm(19:0)=inm,
      help='rd = (inm << 12)',
      {
          (SE=1, OFFSET=0, SIZE=10100, T3, C4),       # RT1 <- IR/inm
          (EXCODE=1000, T11, C5),                 # RT2 <- 8
          (MA=1, MB=1, MC=1, SelCop=1100, T6, C4),    # RT1 <- RT1 << 3
          (MA=1, MB=1, MC=1, SelCop=1100, T6, C4),    # RT1 <- RT1 << 3
          (MA=1, MB=1, MC=1, SelCop=1100, T6, C4),    # RT1 <- RT1 << 3
          (MA=1, MB=1, MC=1, SelCop=1100, T6, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
      }
}

#  AUIPC rd,offset         Add Upper Immediate to PC         rd ← pc + (offset << 12)
auipc rd offset {
      oc(31:26)=111111,
      reg(25:21)=rd,
      inm(19:0)=offset,
      help='rd = pc + (offset << 12)',
      {
          (SE=1, OFFSET=0, SIZE=10100, T3, C4),       # RT1 <- offset
          (EXCODE=1000, T11, C5),                 # RT2 <- 8
          (MA=1, MB=1, MC=1, SelCop=1100, T6, C4),    # RT1 <- RT1 << 3
          (MA=1, MB=1, MC=1, SelCop=1100, T6, C4),    # RT1 <- RT1 << 3
          (MA=1, MB=1, MC=1, SelCop=1100, T6, C4),    # RT1 <- RT1 << 3
          (MA=1, MB=1, MC=1, SelCop=1100, T6, C5),    # RT2 <- RT1 << 3
          (T2, C4),                           # RT1 <- PC
          (MA=1, MB=10, MC=1, SelCop=1011, T6, C4),   # RT1 <- RT1 - 4
          (MA=1, MB=1,  MC=1, SelCop=1010, T6, MR=0, SelC=10101, LC=1, A0=1, B=1, C=0)
      }
}

#  JAL rd,offset        Jump and Link           rd ← pc + length(inst)
#                                               pc ← pc + offset
jal rd offset {
      oc(31:26)=111111,
      reg(25:21)=rd,
      address-rel(19:0)=offset,
      help='rd = pc; pc = pc + sext(offset)',
      {
          (T2, MR=0, SelC=10101, LC, C5),                  # (rd, RT2) <- PC
          (SE=1, OFFSET=0, SIZE=10100, T3, C4),         #       RT1 <- offset
          (MA=1, MB=1, MC=1, SelCop=1010, T6, M2=0, C2, A0=1, B=1, C=0)
      }
}

#  JALR rd,rs1,offset   Jump and Link Register   rd ← pc + length(inst)
#                                              	 pc ← (rs1 + offset) & -2
jalr rd rs1 offset {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      address-rel(15:0)=offset,
      help='rd = pc; pc = rs1 + offset',
      {
          (T2, SelC=10101, MR=0, LC),                         # rd  <- pc
          (EXCODE=0, T11, MR=1, SelC=0, LC=1),
          (SE=1, OFFSET=0, SIZE=1100, T3, C5),                    # RT2 <- sign_ext(offset)
          (MR=0, SelA=10000, MA=0,  MB=1, MC=1, SelCop=1010, T6, C5), # RT2 <- offset + rs1
          (EXCODE=1, T11, C4),                                # RT1 <- 1
          (MA=1, MC=1, SelCop=11, T6, C4),                        # RT1 <- ~1 (0xFFFFFFFE)
          (MA=1, MB=1, MC=1, SelCop=1, T6, M2=0, C2),             # pc <- RT2 & 0xFFFFFFFE
          (EXCODE=0, T11, MR=1, SelC=0, LC=1, A0=1, B=1, C=0)
      }
}

#  BEQ rs1,rs2,offset         Branch Equal                         if rs1 = rs2 then pc ← pc + offset
beq rs1 rs2 offset {
      oc(31:26)=111111,
      reg(25:21)=rs1,
      reg(20:16)=rs2,
      address-rel(15:0)=offset,
      help='if (rs1 == rs2) pc += offset',
      {
          (T8, C5),
          (SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7, C7),
          (A0=0, B=1, C=110, MADDR=bck2ftch),
          (T5, M7=0, C7),
          (T2, C4),
          (SE=1, OFFSET=0, SIZE=10000, T3, C5),
          (MA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
bck2ftch: (T5, M7=0, C7),
          (A0=1, B=1, C=0)
      }
}

#  BNE rs1,rs2,offset         Branch Not Equal                     if rs1 ≠ rs2 then pc ← pc + offset
bne rs1 rs2 offset {
      oc(31:26)=111111,
      reg(25:21)=rs1,
      reg(20:16)=rs2,
      address-rel(15:0)=offset,
      help='if (rs1 != rs2) pc += offset',
      {
          (T8, C5),
          (SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7, C7),
          (A0=0, B=0, C=110, MADDR=bck3ftch),
          (T5, M7=0, C7),
          (T2, C4),
          (SE=1, OFFSET=0, SIZE=10000, T3, C5),
          (MA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
bck3ftch: (T5, M7=0, C7),
          (A0=1, B=1, C=0)
      }
}

#  BLT rs1,rs2,offset         Branch Less Than                     if rs1 < rs2 then pc ← pc + offset
blt rs1 rs2 offset {
      oc(31:26)=111111,
      reg(25:21)=rs1,
      reg(20:16)=rs2,
      address-rel(15:0)=offset,
      help='if (rs1 < rs2) pc += offset',
      {
          (T8, C5),
          (SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7, C7),
          (A0=0, B=1, C=111, MADDR=bck5ftch),
          (T5, M7=0, C7),
          (T2, C4),
          (SE=1, OFFSET=0, SIZE=10000, T3, C5),
          (MA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
bck5ftch: (T5, M7=0, C7),
          (A0=1, B=1, C=0)
      }
}

#  BGE rs1,rs2,offset         Branch Greater than Equal             if rs1 ≥ rs2 then pc ← pc + offset
bge rs1 rs2 offset {
      oc(31:26)=111111,
      reg(25:21)=rs1,
      reg(20:16)=rs2,
      address-rel(15:0)=offset,
      help='if (rs1 >= rs2) pc += offset',
      {
          (T8, C5),
          (SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7, C7),
          (A0=0, B=0, C=111, MADDR=bck4ftch),
          (T5, M7=0, C7),
          (T2, C4),
          (SE=1, OFFSET=0, SIZE=10000, T3, C5),
          (MA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
bck4ftch: (T5, M7=0, C7),
          (A0=1, B=1, C=0)
      }
}

#  BLTU rs1,rs2,offset         Branch Less Than Unsigned             if rs1 < rs2 then pc ← pc + offset
bltu rs1 rs2 offset {
      oc(31:26)=111111,
      reg(25:21)=rs1,
      reg(20:16)=rs2,
      address-rel(15:0)=offset,
      help='if (ux(rs1) < ux(rs2)) pc += offset',
      {
          (T8, C5),
          (SELA=10101, SELB=10000, MC=1, SELCOP=10111, SELP=11, M7, C7),
          (A0=0, B=1, C=111, MADDR=bck6ftch),
          (T5, M7=0, C7),
          (T2, C4),
          (SE=1, OFFSET=0, SIZE=10000, T3, C5),
          (MA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
bck6ftch: (T5, M7=0, C7),
          (A0=1, B=1, C=0)
      }
}

#  BGEU rs1,rs2,offset         Branch Greater than Equal Unsigned         if rs1 ≥ rs2 then pc ← pc + offset
bgeu rs1 rs2 offset {
      oc(31:26)=111111,
      reg(25:21)=rs1,
      reg(20:16)=rs2,
      address-rel(15:0)=offset,
      help='if (ux(rs1) >= ux(rs2)) pc += offset',
      {
          (T8, C5),
          (SELA=10101, SELB=10000, MC=1, SELCOP=10111, SELP=11, M7, C7),
          (A0=0, B=0, C=111, MADDR=bck7ftch),
          (T5, M7=0, C7),
          (T2, C4),
          (SE=1, OFFSET=0, SIZE=10000, T3, C5),
          (MA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
bck7ftch: (T5, M7=0, C7),
          (A0=1, B=1, C=0)
      }
}

#  LB rd,offset(rs1)         Load Byte                         rd ← s8[rs1 + offset]
lb rd offset(rs1) {
      oc(31:26)=111111,
      reg(25:21)=rd,
      inm(15:0)=offset,
      reg(20:16)=rs1,
      help='rd = (00, 00, 00, MEM[rs1 + offset])',
      {
          (SE=1, OFFSET=0, SIZE=10000, T3, C5),
          (MR=0, SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6, C0),
          (TA=1, R=1, BW=00, SE=1, M1=1, C1=1),
          (T1=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
      }
}

#  LH rd,offset(rs1)         Load Half                         rd ← s16[rs1 + offset]
lh rd offset(rs1) {
      oc(31:26)=111111,
      reg(25:21)=rd,
      inm(15:0)=offset,
      reg(20:16)=rs1,
      help='rd = (00, 00, MEM[rs1+offset+1], MEM[rs1+offset])',
      {
          (SE=1, OFFSET=0, SIZE=10000, T3, C5),
          (MR=0, SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6, C0),
          (TA=1, R=1,  BW=1, SE=1, M1=1, C1=1),
          (T1=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
      }
}

#  LW rd,offset(rs1)         Load Word                         rd ← s32[rs1 + offset]
lw rd offset(rs1) {
      oc(31:26)=111111,
      reg(25:21)=rd,
      inm(15:0)=offset,
      reg(20:16)=rs1,
      help='rd = (MEM[rs1+offset+3] .. MEM[rs1+offset])',
      {
          (SE=1, OFFSET=0, SIZE=10000, T3=1, C5=1),
          (MR=0, SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6=1, C0=1),
          (TA=1, R=1, BW=11, M1=1, C1=1),
          (T1=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
      }
}

#  LBU rd,offset(rs1)         Load Byte Unsigned                     rd ← u8[rs1 + offset]
lbu rd offset(rs1) {
      oc(31:26)=111111,
      reg(25:21)=rd,
      inm(15:0)=offset,
      reg(20:16)=rs1,
      help='rd = (00, 00, 00, ux(MEM[rs1 + offset]))',
      {
          (SE=1, OFFSET=0, SIZE=10000, T3, C5),
          (MR=0, SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6, C0),
          (TA=1, R=1,  BW=0, SE=0, M1=1, C1=1),
          (T1=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
      }
}

#  LHU rd,offset(rs1)         Load Half Unsigned                     rd ← u16[rs1 + offset]
lhu rd offset(rs1) {
      oc(31:26)=111111,
      reg(25:21)=rd,
      inm(15:0)=offset,
      reg(20:16)=rs1,
      help='rd = (00, 00, ux(MEM[rs1+offset+1]), ux(MEM[rs1+offset]))',
      {
          (SE=1, OFFSET=0, SIZE=10000, T3, C5),
          (MR=0, SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6, C0),
          (TA=1, R=1,  BW=1, SE=0, M1=1, C1=1),
          (T1=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
      }
}

#  SB rs2,offset(rs1)         Store Byte                         u8[rs1 + offset] ← rs2
sb rs2 offset(rs1) {
      oc(31:26)=111111,
      reg(25:21)=rs2,
      inm(15:0)=offset,
      reg(20:16)=rs1,
      help='MEM[rs1 + offset] = rs2/8',
      {
          (SE=1,  OFFSET=0, SIZE=10000, T3=1, C5=1),
          (MR=0,  SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6=1, C0=1),
          (MR=0,  SELA=10101, T9=1, M1=0, C1=1),
          (BW=0,  SE=1, TA=1, TD=1, W=1,  A0=1, B=1, C=0)
      }
}

#  SH rs2,offset(rs1)         Store Half                         u16[rs1 + offset] ← rs2
sh rs2 offset(rs1) {
      oc(31:26)=111111,
      reg(25:21)=rs2,
      inm(15:0)=offset,
      reg(20:16)=rs1,
      help='MEM[rs1+offset+1 .. rs1+offset] = rs2/16',
      {
          (SE=1,  OFFSET=0, SIZE=10000, T3=1, C5=1),
          (MR=0,  SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6=1, C0=1),
          (MR=0,  SELA=10101, T9=1, M1=0, C1=1),
          (BW=1,  SE=1, TA=1, TD=1, W=1,  A0=1, B=1, C=0)
      }
}

#  SW rs2,offset(rs1)         Store Word                         u32[rs1 + offset] ← rs2
sw reg1 val(reg2) {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      inm(15:0)=val,
      reg(20:16)=reg2,
      help='MEM[rs1+offset+3 .. rs1+offset] = rs2',
      {
          (SE=1, OFFSET=0, SIZE=10000, T3=1, C5=1),
          (MR=0, SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6=1, C0=1),
          (MR=0,  SELA=10101, T9=1, M1=0, C1=1),
          (BW=11, TA=1, TD=1, W=1,  A0=1, B=1, C=0)
      }
}

#  SBU rs2,offset(rs1)         Store Byte Unsigned                    u8[rs1 + offset] ← rs2
sbu rs2 offset(rs1) {
      oc(31:26)=111111,
      reg(25:21)=rs2,
      reg(20:16)=rs1,
      inm(15:0)=offset,
      help='MEM[rs1+offset] = (00, 00, 00, rs2/8)',
      {
          (SE=1,  OFFSET=0, SIZE=10000, T3=1, C5=1),
          (MR=0,  SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6=1, C0=1),
          (MR=0,  SELA=10101, T9=1, M1=0, C1=1),
          (BW=0,  SE=0, TA=1, TD=1, W=1,  A0=1, B=1, C=0)
      }
}

#  SHU rs2,offset(rs1)         Store Half Unsigned                    u16[rs1 + offset] ← rs2
shu rs2 offset(rs1) {
      oc(31:26)=111111,
      reg(25:21)=rs2,
      reg(20:16)=rs1,
      inm(15:0)=offset,
      help='MEM[rs1+offset+1 .. rs1+offset] = rs2/16',
      {
          (SE=1,  OFFSET=0, SIZE=10000, T3=1, C5=1),
          (MR=0,  SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6=1, C0=1),
          (MR=0,  SELA=10101, T9=1, M1=0, C1=1),
          (BW=1,  SE=0, TA=1, TD=1, W=1,  A0=1, B=1, C=0)
      }
}

#  ADDI rd,rs1,imm         Add Immediate                         rd ← rs1 + sx(imm)
addi rd rs1 inm {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      inm(11:0)=inm,
      help='rd = rs1 + SignEx(inm)',
      {
          (SE=1, OFFSET=0, SIZE=01100, T3=1, C4=1),
          (MC=1, MR=0, SELB=10000, MA=1, MB=0, SELCOP=1010, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  ADDU rd,rs1,imm         Add Unsigned                         rd ← rs1 + ux(imm)
addu rd rs1 inm {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      inm(11:0)=inm,
      help='rd = rs1 + UnsignEx(inm)',
      {
          (SE=0, OFFSET=0, SIZE=01100, T3=1, C4=1),
          (MC=1, MR=0, SELB=10000, MA=1, MB=0, SELCOP=1010, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  SLTI rd,rs1,imm         Set Less Than Immediate             rd ← sx(rs1) < sx(imm)
slti rd rs1 inm {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      inm(15:0)=inm,
      help='rd = (rs1 < inm) ? 1 : 0',
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

#  SLTIU rd,rs1,imm         Set Less Than Immediate Unsigned         rd ← ux(rs1) < ux(imm)
sltiu rd rs1 inm {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      inm(15:0)=inm,
      help='rd = (ux(rs1) < ux(inm)) ? 1 : 0',
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

#  XORI rd,rs1,imm         Xor Immediate                         rd ← ux(rs1) ⊕ ux(imm)
xori rd rs1 inm {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      inm(15:0)=inm,
      help='rd = ux(rs1) ^ ux(inm)',
      {
          (SE=1, OFFSET=0, SIZE=10000, T3=1, C5=1),
          (MC=1, MR=0, SELA=10000, MA=0, MB=01, SELCOP=100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  ORI rd,rs1,imm         Or Immediate                         rd ← ux(rs1) ∨ ux(imm)
ori rd rs1 inm {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      inm(15:0)=inm,
      help='rd = rs1 | inm',
      {
          (SE=1, OFFSET=0, SIZE=10000, T3=1, C5=1),
          (MC=1, MR=0, SELA=10000, MA=0, MB=01, SELCOP=10, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  ANDI rd,rs1,imm         And Immediate                         rd ← ux(rs1) ∧ ux(imm)
andi rd rs1 inm {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      inm(15:0)=inm,
      help='rd = rs1 & inm',
      {
          (SE=1, OFFSET=0, SIZE=10000, T3=1, C5=1),
          (MC=1, MR=0, SELA=10000, MA=0, MB=01, SELCOP=1, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  SLLI rd,rs1,imm         Shift Left Logical Immediate             rd ← ux(rs1) « ux(imm)
slli rd rs1 inm {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      inm(5:0)=inm,
      help='rd = (rs1 << inm)',
      {
            (SE=1, OFFSET=0, SIZE=110, T3=1, C4=1),
            (MC=1, MR=0, SELA=10000, MA=0, MB=11, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7),
   loop10a: (A0=0, B=0, C=110, MADDR=bck10aftch),
            (MC=1, MR=0, SELA=10101, SELB=10101, MA=0, MB=0, SELCOP=111, T6=1, LC=1, SELC=10101),
            (MC=1, MR=0, MA=1, MB=11, SELCOP=1011, T6=1, C4=1, SELP=11, M7, C7),
            (A0=0, B=1, C=0, MADDR=loop10a),
bck10aftch: (A0=1, B=1, C=0)
      }
}


#  SRLI rd,rs1,imm         Shift Right Logical Immediate             rd ← ux(rs1) » ux(imm)
srli rd rs1 inm {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      inm(5:0)=inm,
      help='rd = (rs1 >>> inm)',
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

#  SRAI rd,rs1,imm         Shift Right Arithmetic Immediate         rd ← sx(rs1) » ux(imm)
srai rd rs1 inm {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      inm(15:0)=inm,
      help='rd = (rs1 >> inm)',
      {
            (SE=1, OFFSET=0, SIZE=110, T3=1, C4=1),
            (MC=1, MR=0, SELA=10000, MA=0, MB=11, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7),
    loop9a: (A0=0, B=0, C=110, MADDR=bck9aftch),
            (MC=1, MR=0, SELA=10101, SELB=10101, MA=0, MB=0, SELCOP=110, T6=1, LC=1, SELC=10101),
            (MC=1, MR=0, MA=1, MB=11, SELCOP=1011, T6=1, C4=1, SELP=11, M7, C7),
            (A0=0, B=1, C=0, MADDR=loop9a),
 bck9aftch: (A0=1, B=1, C=0)
      }
}

#  ADD rd,rs1,rs2         Add                                 rd ← sx(rs1) + sx(rs2)
add reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='r1 = r2 + r3',
      {
          (MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=1010, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  SUB rd,rs1,rs2         Subtract                         rd ← sx(rs1) - sx(rs2)
sub reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='r1 = r2 - r3',
      {
          (MC=1, MR=0, SELB=1011, SELA=10000, MA=0, MB=0, SELCOP=1011, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  SLL rd,rs1,rs2         Shift Left Logical                     rd ← ux(rs1) « rs2
sll rd rs1 rs2 {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      reg(15:11)=rs2,
      help='rd = rs1 <<< rs2',
      {
            (MR=0, SELA=1011, T9=1, C4=1),
            (MC=1, MR=0, SELA=10000, MA=0, MB=11, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7),
   loop10b: (A0=0, B=0, C=110, MADDR=bck10bftch),
            (MC=1, MR=0, SELA=10101, SELB=10101, MA=0, MB=0, SELCOP=111, T6=1, LC=1, SELC=10101),
            (MC=1, MR=0, MA=1, MB=11, SELCOP=1011, T6=1, C4=1, SELP=11, M7, C7),
            (A0=0, B=1, C=0, MADDR=loop10b),
bck10bftch: (A0=1, B=1, C=0)
      }
}

#  SLT rd,rs1,rs2         Set Less Than                         rd ← sx(rs1) < sx(rs2)
slt rd rs1 rs2 {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      reg(15:11)=rs2,
      help='rd = (rs1 < rs2) ? 1 : 0',
      {
          (ExCode=0, T11, SelC=10101, MR=0, LC=1),
          (T8, C5),
          (SELA=10000, SELB=1011, MC=1, SELCOP=1011, SELP=11, M7, C7),
          (A0=0, B=1, C=111, MADDR=bck8ftch),
          (T5, M7=0, C7),
          (ExCode=1, T11, SelC=10101, MR=0, LC=1),
bck8ftch: (T5, M7=0, C7),
          (A0=1, B=1, C=0)
      }
}

#  SLTU rd,rs1,rs2         Set Less Than Unsigned                     rd ← ux(rs1) < ux(rs2)
sltu rd rs1 rs2 {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      reg(15:11)=rs2,
      help='rd = (ux(rs1) < ux(rs2)) ? 1 : 0',
      {
          (ExCode=0, T11, SelC=10101, MR=0, LC=1),
          (T8, C5),
          (SELA=10000, SELB=1011, MC=1, SELCOP=10111, SELP=11, M7, C7),
          (A0=0, B=1, C=111, MADDR=bck9ftch),
          (T5, M7=0, C7),
          (ExCode=1, T11, SelC=10101, MR=0, LC=1),
bck9ftch: (T5, M7=0, C7),
          (A0=1, B=1, C=0)
      }
}

#  XOR rd,rs1,rs2         Xor                                 rd ← ux(rs1) ⊕ ux(rs2)
xor reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='r1 = r2 ^ r3',
      {
          (MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  SRL rd,rs1,rs2         Shift Right Logical                     rd ← ux(rs1) » rs2
srl rd rs1 rs2 {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      reg(15:11)=rs2,
      help='rd = rs1 >>> rs2',
      {
            (MR=0, SELA=1011, T9=1, C4=1),
            (MC=1, MR=0, SELA=10000, MA=0, MB=11, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7),
    loop9b: (A0=0, B=0, C=110, MADDR=bck9bftch),
            (MC=1, MR=0, SELA=10101, SELB=10101, MA=0, MB=0, SELCOP=101, T6=1, LC=1, SELC=10101),
            (MC=1, MR=0, MA=1, MB=11, SELCOP=1011, T6=1, C4=1, SELP=11, M7, C7),
            (A0=0, B=1, C=0, MADDR=loop9b),
 bck9bftch: (A0=1, B=1, C=0)
      }
}

#  SRA rd,rs1,rs2         Shift Right Arithmetic                     rd ← sx(rs1) » rs2
sra rd rs1 rs2 {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      reg(15:11)=rs2,
      help='rd = rs1 >> rs2',
      {
            (MR=0, SELA=1011, T9=1, C4=1),
            (MC=1, MR=0, SELA=10000, MA=0, MB=11, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7),
    loop9c: (A0=0, B=0, C=110, MADDR=bck9cftch),
            (MC=1, MR=0, SELA=10101, SELB=10101, MA=0, MB=0, SELCOP=110, T6=1, LC=1, SELC=10101),
            (MC=1, MR=0, MA=1, MB=11, SELCOP=1011, T6=1, C4=1, SELP=11, M7, C7),
            (A0=0, B=1, C=0, MADDR=loop9c),
 bck9cftch: (A0=1, B=1, C=0)
      }
}

#  OR rd,rs1,rs2         Or                                 rd ← ux(rs1) ∨ ux(rs2)
or reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='r1 = r2 | r3',
      {
          (MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=10, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  AND rd,rs1,rs2         And                                 rd ← ux(rs1) ∧ ux(rs2)
and reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='r1 = r2 & r3',
      {
          (MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=1, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  FENCE pred,succ         Fence
fence pred succ {
      oc(31:26)=111111,
      inm(25:21)=pred,
      inm(15:0)=succ,
      {
          (A0=1, B=1, C=0)
      }
}

#  FENCE.I             Fence Instruction
fence.i {
      oc(31:26)=111111,
      {
          (A0=1, B=1, C=0)
      }
}


#
# https://rv8.io/isa.html
# RV32M
# (More details at http://riscvbook.com/spanish/guia-practica-de-risc-v-1.0.5.pdf)
#

# MUL rd,rs1,rs2         Multiply         rd ← ux(rs1) × ux(rs2)
mul reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='reg1 = reg2 * reg3',
      {
          (MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

# MULH rd,rs1,rs2         Multiply High Signed         rd ← (sx(rs1) × sx(rs2)) » xlen
mulh rd rs1 rs2 {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      reg(15:11)=rs2,
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
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      reg(15:11)=rs2,
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
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      reg(15:11)=rs2,
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

# DIV rd,rs1,rs2         Divide Signed         rd ← sx(rs1) ÷ sx(rs2)
div reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='reg1 = reg2 / reg3',
      {
          # if (reg3 == 0)
          (MC=1, MR=0, SELA=1011, MA=0, MB=11, SELCOP=1100, SELP=11, M7, C7),
          (A0=0, B=0, C=110, MADDR=fpe1),
          # reg1 = reg2 / reg3, go fetch
          (MC=1, MR=0, SELB=1011, SELA=10000, MA=0, MB=0, SELCOP=1101, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0),
    fpe1: # RT1 <- ExCode=1
          (ExCode=1, T11, C4),
          # csw_rt1(2)
          (A0=0, B=1, C=0, MADDR=csw_rt1)
      }
}

# DIVU rd,rs1,rs2         Divide Unsigned         rd ← ux(rs1) ÷ ux(rs2)
divu rd rs1 rs2 {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      reg(15:11)=rs2,
      help='reg1 = ux(reg2) / ux(reg3)',
      {
          # if (reg3 == 0)
          (MC=1, MR=0, SELA=1011, MA=0, MB=11, SELCOP=1100, SELP=11, M7, C7),
          (A0=0, B=0, C=110, MADDR=fpe2),
          # reg1 = reg2 / reg3, go fetch
          (MC=1, MR=0, SELB=1011, SELA=10000, MA=0, MB=0, SELCOP=11001, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0),
    fpe2: # RT1 <- ExCode=1
          (ExCode=1, T11, C4),
          # csw_rt1(2)
          (A0=0, B=1, C=0, MADDR=csw_rt1)
      }
}

# REM rd,rs1,rs2         Remainder Signed         rd ← sx(rs1) mod sx(rs2)
rem reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='reg1 = reg2 % reg3',
      {
            (MC=1, MR=0, SELA=10000, SELB=1011, MA=0, MB=0, SELCOP=1110, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

# REMU rd,rs1,rs2         Remainder Unsigned         rd ← ux(rs1) mod ux(rs2)
remu rd rs1 rs2 {
      oc(31:26)=111111,
      reg(25:21)=rd,
      reg(20:16)=rs1,
      reg(15:11)=rs2,
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


#
# RISC-V F
#

#  FADD.S rd,rs1,rs2         Add                      f(rd) ← f(rs1) + f(rs2)
fadd.s reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='r1 = r2 + r3',
      {
          (MC=1, MR=0, SELA=10000, SELB=1011, MA=0, MB=0, SELCOP=10000, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  FSUB.S rd,rs1,rs2         Subtract                 f(rd) ← f(rs1) - f(rs2)
fsub.s reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='r1 = r2 - r3',
      {
          (MC=1, MR=0, SELA=10000, SELB=1011, MA=0, MB=0, SELCOP=10001, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  FMUL.S rd,rs1,rs2         Multiply                 f(rd) ← f(rs1) * f(rs2)
fmul.s reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='r1 = r2 * r3',
      {
          (MC=1, MR=0, SELA=10000, SELB=1011, MA=0, MB=0, SELCOP=10010, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  FDIV.S rd,rs1,rs2         Divide                 f(rd) ← f(rs1) / f(rs2)
fdiv.s reg1 reg2 reg3 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      reg(15:11)=reg3,
      help='r1 = r2 / r3',
      {
          (MC=1, MR=0, SELA=10000, SELB=1011, MA=0, MB=0, SELCOP=10011, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  FCVT.W.S rd,rs1             Convert                 f(rd) ← sext(s32_{f32}(f(rs1)))
fcvt.w.s reg1 reg2 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      help='r1 = float2int(r2)',
      {
          (MC=1, MR=0, SELA=10000, MA=0, MB=11, SELCOP=10100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  FCVT.S.W rd,rs1             Convert                 f(rd) ← (f32)(x(rs1))
fcvt.s.w reg1 reg2 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      help='r1 = int2float(r2)',
      {
          (MC=1, MR=0, SELA=10000, MA=0, MB=10, SELCOP=10100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
      }
}

#  FCLASS.S rd,rs1             Convert                 x(rd) ← classify(f(rs1))
fclass.s reg1 reg2 {
      oc(31:26)=111111,
      reg(25:21)=reg1,
      reg(20:16)=reg2,
      help='r1 = classify(r2)',
      {
          (MC=1, MR=0, SELA=10000, SELB=0000, MA=0, MB=0, SELCOP=10101, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
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


#
# Pseudo-instructions
# https://content.riscv.org/wp-content/uploads/2017/05/riscv-spec-v2.2.pdf
#

pseudoinstructions
{
    # nop        addi zero,zero,0        No operation
    nop
    {
        addi zero zero 0
    }

    # li rd, expression        (several expansions)        Load immediate
    li rd=reg, expression=inm
    {
        lui  rd,     sel(31,12,expression)
        addu rd, rd, sel(11,0,expression)
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

    # seqz rd, rs1        sltiu rd, rs, 1        Set if = zero
    seqz rd=reg, rs1=reg
    {
        sltiu rd, rs, 1
    }

    # snez rd, rs1        sltu rd, x0, rs        Set if ≠ zero
    snez rd=reg, rs1=reg
    {
        sltu rd, x0, rs
    }

    # sltz rd, rs1        slt rd, rs, x0        Set if < zero
    sltz rd=reg, rs1=reg
    {
        slt rd, rs, x0
    }

    # sgtz rd, rs1        slt rd, x0, rs        Set if > zero
    sgtz rd=reg, rs1=reg
    {
        slt rd, x0, rs
    }

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


