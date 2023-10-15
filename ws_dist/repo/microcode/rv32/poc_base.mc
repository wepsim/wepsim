
#
# WepSIM (https://wepsim.github.io/wepsim/)
#


##
## Microcode Section
##

begin
{
	  # ensure R0 is zero
	    (EXCODE=0, T11, MRC, SelC=0, LC=1),
	  # if (NOT INT) go fetch
	    (A0=0, B=1, C=1, MADDR=fetch),
	  # MBR <- DB <- INTV
	    (INTA, BW=11, M1=1, C1),
	  # RT1 <- MBR
	    (T1, C4),
	  # csw_rt1(intv)
	    (A0=0, B=1, C=0, MADDR=csw_rt1)

    fetch:
	  # MAR <- PC
	    (T2, C0),
	  # MBR <- M[MAR], PC <- PC+4
	    (TA, R, BW=11, M1=1, C1=1, MB=1, SelCop=10000, MC, T6, C2),
	  # RI <- MBR, RT1 <- MBR
	    (T1, C3, C4),
	  # go co2maddr
	    (A0, B=0, C=0)

    csw_rt1:
	  # push PC
	    (ExCode=100, T11, MRC, SELC=100000, LC)
	    (MRA, SELA=10, MA=0, MRB, SELB=100000, MB=0, MC, SELCOP=1011, T6=1, MRC, SELC=10, LC, C0),
	    (T2, M1=0, C1),
	    (BW=11, TA, TD, W)
	  # push SR
	    (ExCode=100, T11, MRC, SELC=100000, LC)
	    (MRA, SELA=10, MA=0, MRB, SELB=100000, MB=0, MC, SELCOP=1011, T6=1, MRC, SELC=10, LC, C0),
	    (T8, M1=0, C1),
	    (BW=11, TA, TD, W),
	  # SR.U=0
	    (MRC, SELC=100000, LC, T8),
	    (MRC, SELC=100000, LC, MA=0, MC=1, SELCOP=101, T6),
	    (MRC, SELC=100000, LC, MA=0, MC=1, SELCOP=111, T6),
	    (MRA, SELA=100000, T9, M7=0, C7),
	  # MAR <- RT1*4
	    (ExCode=100, T11, MRC, SELC=100000, LC)
	    (SIZE=10000, T3,  MRC, SELC=100001, LC)
	    (MRA, SELA=100001, MRB, SELB=100000, MA=0, MB=0, MC, SELCOP=1100, T6=1, C0),
	  # MBR <- MP[MAR]
	    (TA, R, BW=11, M1=1, C1=1),
	  # PC <- MAR
	    (T1, C2),
	  # go fetch
	    (A0=0, B=1, C=0, MADDR=fetch)
}


#
# INT
#

ecall {
         co=111111,
         nwords=1,
         help='system call',
         {
              # RT1 <- ExCode=2
              (ExCode=10, T11, C4),

              # csw_rt1(2)
              (A0=0, B=1, C=0, MADDR=csw_rt1)
         }
}

sret {
            co=111111,
            nwords=1,
            help='return from event (interruption, exception, syscall)',
            {
                     # pop SR
                     (MRA=1, SELA=10, T9, C0),
                     (TA, R, BW=11, M1, C1),
                     (T1, M7=0, C7),
                     (MRB, SELB=10, MB=0, MC, SELCOP=10000, T6=1, MRC, SELC=10, LC),

                     # pop PC
                     (MRA, SELA=10, T9, C0),
                     (TA=1, R=1, BW=11, M1=1, C1),
                     (T1, C2),
                     (MRB, SELB=10, MB=0, MC, SELCOP=10000, T6=1, MRC, SELC=10, LC),

                     # go begin
                     (A0=1, B=1 ,C=0)
            }
}


#
# IN/OUT
#

in reg val {
            co=111111,
            nwords=1,
            reg=reg(25,21),
            val=inm(15,0),
            help='reg = device_registers[val]',
            {
                (SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
                (TA=1, IOR=1,    M1=1, C1=1),
                (T1=1, LC=1,     MRC=0, SELC=10101, A0=1, B=1, C=0)
            }
}

out reg val {
            co=111111,
            nwords=1,
            reg=reg(25,21),
            val=inm(15,0),
            help='device_register[val] = reg',
            {
                (SE=0, OFFSET=0,   SIZE=10000, T3=1, C0=1),
                (MRA=0, SELA=10101, T9=1,       M1=0, C1=1),
                (TA=1, TD=1,       IOW=1,      A0=1, B=1, C=0)
            }
}


#
# Related to power consumption
#

# RDCYCLE rd  	Load clock cycles 	rd ← ux(clock_cycles_acc) 
rdcycle reg1  {
	    co=111111,
	    nwords=1,
	    reg1=reg(25,21),
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

#  LUI rd,imm         Load Upper Immediate                         rd ← imm << 12
lui rd inm {
        co=111111,
        nwords=1,
        rd=reg(25,21),
        inm=inm(19,0),
        help='rd = (inm << 12)',
        {
            (SE=1, OFFSET=0, SIZE=10100, T3, MRC, SelC=100001, LC),                           # RF[33] <- IR/inm
            (EXCODE=1000, T11, MRC, SelC=100010, LC),                                         # RF[34] <- 8
            (MRA, SelA=100001, MRB, SelB=100010, MC, SelCop=1100, T6, MRC, SelC=100001, LC),  # RF[33] <- RF[33] << 3
            (MRA, SelA=100001, MRB, SelB=100010, MC, SelCop=1100, T6, MRC, SelC=100001, LC),  # RF[33] <- RF[33] << 3
            (MRA, SelA=100001, MRB, SelB=100010, MC, SelCop=1100, T6, MRC, SelC=100001, LC),  # RF[33] <- RF[33] << 3
            (MRA, SelA=100001, MRB, SelB=100010, MC, SelCop=1100, T6, MRC=0, SelC=10101, LC), # RF[rd] <- RF[33] << 3
            (A0=1, B=1, C=0)
        }
}

#  AUIPC rd,offset         Add Upper Immediate to PC         rd ← pc + (offset << 12)
auipc rd offset {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=inm(19,0),
            help='rd = pc + (offset << 12)',
            {
               (SE=1, OFFSET=0, SIZE=10100, T3, MRC, SelC=100001, LC),                           # RF[33] <- IR/inm
               (EXCODE=1000, T11, MRC, SelC=100010, LC),                                         # RF[34] <- 8
               (MRA, SelA=100001, MRB, SelB=100010, MC, SelCop=1100, T6, MRC, SelC=100001, LC),  # RF[33] <- RF[33] << 3
               (MRA, SelA=100001, MRB, SelB=100010, MC, SelCop=1100, T6, MRC, SelC=100001, LC),  # RF[33] <- RF[33] << 3
               (MRA, SelA=100001, MRB, SelB=100010, MC, SelCop=1100, T6, MRC, SelC=100001, LC),  # RF[33] <- RF[33] << 3
               (MRA, SelA=100001, MRB, SelB=100010, MC, SelCop=1100, T6, MRC, SelC=100001, LC),  # RF[33] <- RF[33] << 3
               (MRA, SelA=100001, MB=1, MC, SelCop=1010, MRC=0, SelC=10101, LC),                 # RF[rd] <- PC + RF[33]
               (A0=1, B=1, C=0)
            }
}

#  JAL rd,offset        Jump and Link                           rd ← pc + length(inst)
#                                                               pc ← pc + offset
jal rd offset {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=address(19,0)rel,
            help='rd = pc; pc = pc + sext(offset)',
            {
                (T2, MRC=0, SelC=10101, LC),                               #     rd <- PC
                (SE=1, OFFSET=0, SIZE=10100, T3, MRC, SelC=100001, LC),    # RF[33] <- sext(offset)
                (MRA, SelA=100001, MA=0, MB=1, MC, SelCop=1010, T6, C2),   # PC <- PC + RF[33]
                (A0=1, B=1, C=0)
            }
}

#  JALR rd,rs1,offset   Jump and Link Register                  rd ← pc + length(inst)
#                                                               pc ← (rs1 + offset) & -2
jalr rd rs1 offset {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            offset=address(15,0)rel,
            help='rd = pc; pc = rs1 + offset',
            {
                (T2, MRC=0, SelC=10101, LC),                                 # rd  <- pc
                (EXCODE=0, T11, MRC=1, SelC=0, LC),                          # RF[0] <- 0
                (SE=1, OFFSET=0, SIZE=1100, T3, MRC, SelC=100010, LC),       # RF[34] <- sign_ext(offset)
                (MRA=0, SelA=10000, MA=0, MRB, SelB=100010, MB=0,
                   MC=1, SelCop=1010, T6, MRC, SelC=100010, LC),             # RF[34] <- RF[34] + rs1
                (EXCODE=1, T11, MRC, SelC=100001, LC),                       # RF[33] <- 1
                (MRA, SelA=100001, MC, SelCop=11, T6, MRC, SelC=100001, LC), # RF[33] <- ~1 (0xFFFFFFFE)
                (MRA, SelA=100001, MRB, SelB=100010, MC, SelCop=1, T6, C2),  # pc <- RF[34] & 0xFFFFFFFE
                (A0=1, B=1, C=0)
            }
}

#  BEQ rs1,rs2,offset         Branch Equal                                 if rs1 = rs2 then pc ← pc + offset
beq rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (rs1 == rs2) pc += offset',
            {
                (T8, SELC=110111, MRC=1, LC=1),
                (SELA=10101, SELB=10000, MC=1, SELCOP=1011, M7, C7),
                (A0=0, B=1, C=110, MADDR=bck2ftch),
                (SELA=110111, MRA=1, M7=0, C7),
                (SE=1, OFFSET=0, SIZE=1101, T3, SELC=110111, MRC=1, LC=1),
                (MA=0, SELA=110111, MRA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
      bck2ftch: (SELA=110111, MRA=1, M7=0, C7),
                (A0=1, B=1, C=0)
            }
}

#  BNE rs1,rs2,offset         Branch Not Equal                         if rs1 ≠ rs2 then pc ← pc + offset
bne rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (rs1 != rs2) pc += offset',
            {
                (T8, SELC=110111, MRC=1, LC=1),
                (SELA=10101, SELB=10000, MC=1, SELCOP=1011, M7, C7),
                (A0=0, B=0, C=110, MADDR=bck3ftch),
                (SELA=110111, MRA=1, M7=0, C7),
                (SE=1, OFFSET=0, SIZE=1101, T3, SELC=110111, MRC=1, LC=1),
                (MA=0, SELA=110111, MRA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
      bck3ftch: (SELA=110111, MRA=1, M7=0, C7),
                (A0=1, B=1, C=0)
            }
}

#  BLT rs1,rs2,offset         Branch Less Than                         if rs1 < rs2 then pc ← pc + offset
blt rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (rs1 < rs2) pc += offset',
            {
                (T8, SELC=110111, MRC=1, LC=1),
                (SELA=10101, SELB=10000, MC=1, SELCOP=1011, M7, C7),
                (A0=0, B=1, C=111, MADDR=bck5ftch),
                (SELA=110111, MRA=1, M7=0, C7),
                (SE=1, OFFSET=0, SIZE=1101, T3, SELC=110111, MRC=1, LC=1),
                (MA=0, SELA=110111, MRA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
      bck5ftch: (SELA=110111, MRA=1, M7=0, C7),
                (A0=1, B=1, C=0)
            }
}

#  BGE rs1,rs2,offset         Branch Greater than Equal                 if rs1 ≥ rs2 then pc ← pc + offset
bge rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (rs1 >= rs2) pc += offset',
            {
                (T8, SELC=110111, MRC=1, LC=1),
                (SELA=10101, SELB=10000, MC=1, SELCOP=1011, M7, C7),
                (A0=0, B=0, C=111, MADDR=bck4ftch),
                (SELA=110111, MRA=1, M7=0, C7),
                (SE=1, OFFSET=0, SIZE=1101, T3, SELC=110111, MRC=1, LC=1),
                (MA=0, SELA=110111, MRA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
      bck4ftch: (SELA=110111, MRA=1, M7=0, C7),
                (A0=1, B=1, C=0)
            }
}

#  BLTU rs1,rs2,offset         Branch Less Than Unsigned                 if rs1 < rs2 then pc ← pc + offset
bltu rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (ux(rs1) < ux(rs2)) pc += offset',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var offset = simcore_native_get_field_from_ir(fields, 2) ;

                reg1 = simcore_native_get_value("BR", reg1) ;
                reg2 = simcore_native_get_value("BR", reg2) ;
                if (reg1 < reg2)
                {
                    var pc = simcore_native_get_value("CPU", "REG_PC") ;
                    if ((offset & 0x8000) > 0)
                         offset = offset | 0xFFFF0000 ;
                    pc = pc + offset ;
                    simcore_native_set_value("CPU", "REG_PC", pc) ;
                }

                simcore_native_go_maddr(0) ;
            }
}

#  BGEU rs1,rs2,offset         Branch Greater than Equal Unsigned         if rs1 ≥ rs2 then pc ← pc + offset
bgeu rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (ux(rs1) >= ux(rs2)) pc += offset',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var offset = simcore_native_get_field_from_ir(fields, 2) ;

                reg1 = simcore_native_get_value("BR", reg1) ;
                reg2 = simcore_native_get_value("BR", reg2) ;
                if (reg1 >= reg2)
                {
                    var pc = simcore_native_get_value("CPU", "REG_PC") ;
                    if ((offset & 0x8000) > 0)
                         offset = offset | 0xFFFF0000 ;
                    pc = pc + offset ;
                    simcore_native_set_value("CPU", "REG_PC", pc) ;
                }

                simcore_native_go_maddr(0) ;
            }
}

#  LB rd,offset(rs1)         Load Byte                                 rd ← s8[rs1 + offset]
lb rd offset(rs1) {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=inm(15,0),
            rs1=reg(20,16),
            help='rd = (00, 00, 00, MEM[rs1 + offset])',
            {
                (SE=1, OFFSET=0, SIZE=10000, T3=1, MRC=1, SELC=100000, LC),
                (MRA=1, SELA=100000, MRB=0, SELB=10000, MA=0, MB=0, MC=1, SELCOP=1010, T6=1, C0=1),
                (TA=1, R=1, BW=0, M1=1, C1=1),
                (T1=1, LC=1, MRC=0, SELC=10101, A0=1, B=1, C=0)
            }
}

#  LH rd,offset(rs1)         Load Half                                 rd ← s16[rs1 + offset]
lh rd offset(rs1) {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=inm(15,0),
            rs1=reg(20,16),
            help='rd = (00, 00, MEM[rs1+offset+1], MEM[rs1+offset])',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd     = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 2) ;

                if (offset & 0x00008000)
                    offset = offset | 0xFFFF0000 ;

                var b_addr  = simcore_native_get_value("BR", rs1) + offset ;
                var w_addr  = b_addr & 0xFFFFFFFC ;
                var w_value = simcore_native_get_value("MEMORY", w_addr) ;
                var a_value = b_addr & 0x00000003 ;
                    b_value = w_value >>> (8 * a_value) ;
                // byte from other word
                if (a_value == 3) {
                    w_addr  = (b_addr + 1) & 0xFFFFFFFC ;
                    var w_value2 = simcore_native_get_value("MEMORY", w_addr) ;
                        w_value2 = w_value2 & 0x000000FF ;
                    b_value = (b_value & 0x000000FF) | (w_value2 << 8) ;
                }
                // sign-extension
                if  (b_value & 0x000008000)
                     b_value = b_value | 0xFFFF0000 ;
                else b_value = b_value & 0x0000FFFF ;
                // load value into the register file
                simcore_native_set_value("BR", rd, b_value) ;

                simcore_native_go_maddr(0) ;
            }
}

#  LW rd,offset(rs1)         Load Word                                 rd ← s32[rs1 + offset]
lw rd offset(rs1) {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=inm(15,0),
            rs1=reg(20,16),
            help='rd = (MEM[rs1+offset+3] .. MEM[rs1+offset])',
            {
                (SE=1, OFFSET=0, SIZE=10000, T3=1, MRC=1, SELC=100000, LC),
                (MRA=1, SELA=100000, MRB=0, SELB=10000, MA=0, MB=0, MC=1, SELCOP=1010, T6=1, C0=1),
                (TA=1, R=1, BW=11, M1=1, C1=1),
                (T1=1, LC=1, MRC=0, SELC=10101, A0=1, B=1, C=0)
            }
}

#  LBU rd,offset(rs1)         Load Byte Unsigned                         rd ← u8[rs1 + offset]
lbu rd offset(rs1) {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=inm(15,0),
            rs1=reg(20,16),
            help='rd = (00, 00, 00, ux(MEM[rs1 + offset]))',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd     = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 2) ;

                if (offset & 0x00008000)
                    offset = offset | 0xFFFF0000 ;

                var b_addr = simcore_native_get_value("BR", rs1) + offset ;
                var w_addr = b_addr & 0xFFFFFFFC ;
                var w_value = simcore_native_get_value("MEMORY", w_addr) ;
                var  b_value = b_addr & 0x00000003 ;
                     b_value = w_value >>> (8 * b_value) ;
                // unsigned
                b_value = b_value & 0x000000FF ;
                // load value into the register file
                simcore_native_set_value("BR", rd, b_value) ;

                simcore_native_go_maddr(0) ;
            }
}

#  LHU rd,offset(rs1)         Load Half Unsigned                         rd ← u16[rs1 + offset]
lhu rd offset(rs1) {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=inm(15,0),
            rs1=reg(20,16),
            help='rd = (00, 00, ux(MEM[rs1+offset+1]), ux(MEM[rs1+offset]))',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd     = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 2) ;

                if (offset & 0x00008000)
                    offset = offset | 0xFFFF0000 ;

                var b_addr  = simcore_native_get_value("BR", rs1) + offset ;
                var w_addr  = b_addr & 0xFFFFFFFC ;
                var w_value = simcore_native_get_value("MEMORY", w_addr) ;
                var a_value = b_addr & 0x00000003 ;
                    b_value = w_value >>> (8 * a_value) ;
                // byte from other word
                if (a_value == 3) {
                    w_addr  = (b_addr + 1) & 0xFFFFFFFC ;
                    var w_value2 = simcore_native_get_value("MEMORY", w_addr) ;
                        w_value2 = w_value2 & 0x000000FF ;
                    b_value = (b_value & 0x000000FF) | (w_value2 << 8) ;
                }
                // unsigned
                b_value = b_value & 0x0000FFFF ;
                // load value into the register file
                simcore_native_set_value("BR", rd, b_value) ;

                simcore_native_go_maddr(0) ;
            }
}

#  SB rs2,offset(rs1)         Store Byte                                 u8[rs1 + offset] ← rs2
sb rs2 offset(rs1) {
            co=111111,
            nwords=1,
            rs2=reg(25,21),
            offset=inm(15,0),
            rs1=reg(20,16),
            help='MEM[rs1 + offset] = rs2/8',
            {
                (SE=1, OFFSET=0, SIZE=10000, T3=1, MRC=1, SELC=100000, LC),
                (MRA=1, SELA=100000, MRB=0, SELB=10000, MA=0, MB=0, MC=1, SELCOP=1010, T6=1, C0=1),
                (MRA=0, SELA=10101, T9=1, M1=0, C1=1),
                (TA=1, TD=1, W=1, BW=0, A0=1, B=1, C=0)
            }
}

#  SH rs2,offset(rs1)         Store Half                                 u16[rs1 + offset] ← rs2
sh rs2 offset(rs1) {
            co=111111,
            nwords=1,
            rs2=reg(25,21),
            offset=inm(15,0),
            rs1=reg(20,16),
            help='MEM[rs1+offset+1 .. rs1+offset] = rs2/16',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rs2    = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 2) ;

                if (offset & 0x00008000)
                    offset = offset | 0xFFFF0000 ;

                var b_addr  = simcore_native_get_value("BR", rs1) + offset ;
                var b_value = simcore_native_get_value("BR", rs2) ;

                var value_1 = b_value & 0x000000FF ;
                var w_addr  = b_addr & 0xFFFFFFFC ;
                var w_value = simcore_native_get_value("MEMORY", w_addr) ;
                var b_off   = b_addr & 0x00000003 ;
                if (3 == b_off) w_value = (w_value & 0x00FFFFFF) | (value_1 << 24) ;
                if (2 == b_off) w_value = (w_value & 0xFF00FFFF) | (value_1 << 16) ;
                if (1 == b_off) w_value = (w_value & 0xFFFF00FF) | (value_1 <<  8) ;
                if (0 == b_off) w_value = (w_value & 0xFFFFFF00) | (value_1) ;
                simcore_native_set_value("MEMORY", w_addr, w_value) ;

                value_1 = b_value & 0x0000FF00 ;
                value_1 = value_1 >> 8 ;
                w_addr  = (b_addr + 1) & 0xFFFFFFFC ;
                w_value = simcore_native_get_value("MEMORY", w_addr) ;
                b_off   = (b_addr + 1) & 0x00000003 ;
                if (3 == b_off) w_value = (w_value & 0x00FFFFFF) | (value_1 << 24) ;
                if (2 == b_off) w_value = (w_value & 0xFF00FFFF) | (value_1 << 16) ;
                if (1 == b_off) w_value = (w_value & 0xFFFF00FF) | (value_1 <<  8) ;
                if (0 == b_off) w_value = (w_value & 0xFFFFFF00) | (value_1) ;
                simcore_native_set_value("MEMORY", w_addr, w_value) ;

                simcore_native_go_maddr(0) ;
            }
}

#  SW rs2,offset(rs1)         Store Word                                 u32[rs1 + offset] ← rs2
sw reg1 val(reg2) {
            co=111111,
            nwords=1,
            reg1 = reg(25,21),
            val  = inm(15,0),
            reg2 = reg(20,16),
            help='MEM[rs1+offset+3 .. rs1+offset] = rs2',
            {
                (SE=1, OFFSET=0, SIZE=10000, T3=1, MRC=1, SELC=100000, LC),
                (MRA=1, SELA=100000, MRB=0, SELB=10000, MA=0, MB=0, MC=1, SELCOP=1010, T6=1, C0=1),
                (MRA=0, SELA=10101, T9=1, M1=0, C1=1),
                (TA=1, TD=1, W=1, BW=11, A0=1, B=1, C=0)
            }
}

#  SBU rs2,offset(rs1)         Store Byte Unsigned                        u8[rs1 + offset] ← rs2
sbu rs2 offset(rs1) {
            co=111111,
            nwords=1,
            rs2=reg(25,21),
            offset=inm(15,0),
            rs1=reg(20,16),
            help='MEM[rs1+offset] = (00, 00, 00, rs2/8)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rs2    = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 2) ;

                if (offset & 0x00008000)
                    offset = offset | 0xFFFF0000 ;

                var b_addr  = simcore_native_get_value("BR", rs1) + offset ;
                var b_value = simcore_native_get_value("BR", rs2) ;
                    b_value = b_value >>> 0 ;
                    b_value = b_value & 0x000000FF ;
                var w_addr  = b_addr & 0xFFFFFFFC ;
                var w_value = simcore_native_get_value("MEMORY", w_addr) ;
                var b_off   = b_addr & 0x00000003 ;
                if (3 == b_off) w_value = (w_value & 0x00FFFFFF) | (b_value << 24) ;
                if (2 == b_off) w_value = (w_value & 0xFF00FFFF) | (b_value << 16) ;
                if (1 == b_off) w_value = (w_value & 0xFFFF00FF) | (b_value <<  8) ;
                if (0 == b_off) w_value = (w_value & 0xFFFFFF00) | (b_value) ;
                simcore_native_set_value("MEMORY", w_addr, w_value) ;

                simcore_native_go_maddr(0) ;
            }
}

#  SHU rs2,offset(rs1)         Store Half Unsigned                        u16[rs1 + offset] ← rs2
shu rs2 offset(rs1) {
            co=111111,
            nwords=1,
            rs2=reg(25,21),
            offset=inm(15,0),
            rs1=reg(20,16),
            help='MEM[rs1+offset+1 .. rs1+offset] = rs2/16',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rs2    = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 2) ;

                if (offset & 0x00008000)
                    offset = offset | 0xFFFF0000 ;

                var b_addr  = simcore_native_get_value("BR", rs1) + offset ;
                var b_value = simcore_native_get_value("BR", rs2) ;

                    b_value = b_value >>> 0 ;
                var value_1 = b_value & 0x000000FF ;
                var w_addr  = b_addr & 0xFFFFFFFC ;
                var w_value = simcore_native_get_value("MEMORY", w_addr) ;
                var b_off   = b_addr & 0x00000003 ;
                if (3 == b_off) w_value = (w_value & 0x00FFFFFF) | (value_1 << 24) ;
                if (2 == b_off) w_value = (w_value & 0xFF00FFFF) | (value_1 << 16) ;
                if (1 == b_off) w_value = (w_value & 0xFFFF00FF) | (value_1 <<  8) ;
                if (0 == b_off) w_value = (w_value & 0xFFFFFF00) | (value_1) ;
                simcore_native_set_value("MEMORY", w_addr, w_value) ;

                value_1 = b_value & 0x0000FF00 ;
                value_1 = value_1 >> 16 ;
            }
}

#  ADDI rd,rs1,imm         Add Immediate                                 rd ← rs1 + sx(imm)
addi rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=inm(15,0),
            help='rd = rs1 + SignEx(inm)',
            {
                (MRB=0, SELB=10000,                                              T10=1, M1=0, C1=1),
                (                              T1=1, MRC=1, SELC=100000, LC=1),
                (SE=1, OFFSET=0, SIZE=10000,   T3=1, MRC=1, SELC=100001, LC=1),
                (MC=1, MRA, SELA=100000, MRB, SELB=100001, MA=0, MB=0, SELCOP=1010, T6=1,  M1=0, C1=1, M7, C7),
                (                              T1=1, MRC=0, SELC=10101, LC=1, A0=1, B=1, C=0)
            }
}

#  ADDU rd,rs1,imm         Add Unsigned                                 rd ← rs1 + ux(imm)
addu rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=inm(15,0),
            help='rd = rs1 + UnsignEx(inm)',
            {
                (MRB=0, SELB=10000,                                              T10=1, M1=0, C1=1),
                (                              T1=1, MRC=1, SELC=100000, LC=1),
                (SE=0, OFFSET=0, SIZE=10000,   T3=1, MRC=1, SELC=100001, LC=1),
                (MC=1, MRA, SELA=100000, MRB, SELB=100001, MA=0, MB=0, SELCOP=1010, T6=1,  M1=0, C1=1, M7, C7),
                (                              T1=1, MRC=0, SELC=10101, LC=1, A0=1, B=1, C=0)
            }
}


#  SLTI rd,rs1,imm         Set Less Than Immediate                 rd ← sx(rs1) < sx(imm)
slti rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=inm(15,0),
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
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=inm(15,0),
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

#  XORI rd,rs1,imm         Xor Immediate                                 rd ← ux(rs1) ⊕ ux(imm)
xori rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=inm(15,0),
            help='rd = ux(rs1) ^ ux(inm)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var val    = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("BR", reg2) ^ val ;
                simcore_native_set_value("BR", reg1, result) ;

                simcore_native_go_maddr(0) ;
            }
}

#  ORI rd,rs1,imm         Or Immediate                                 rd ← ux(rs1) ∨ ux(imm)
ori rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=inm(15,0),
            help='rd = rs1 | inm',
            {
                (OFFSET=0, SIZE=10000, T3=1, MRC=1, SELC=101001, LC=1),
                (MC=1, MRA=0, SELA=10000, MRB=1, SELB=101001, MA=0, MB=0, SELCOP=10, T6=1, MRC=0, SELC=10101, LC=1, M7, C7, A0=1, B=1, C=0)
            }
}

#  ANDI rd,rs1,imm         And Immediate                                 rd ← ux(rs1) ∧ ux(imm)
andi rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=inm(15,0),
            help='rd = rs1 & inm',
            {
                (OFFSET=0, SIZE=10000, T3=1, MRC=1, SELC=101001, LC=1),
                (MC=1, MRA=0, SELA=10000, MRB=1, SELB=101001, MA=0, MB=0, SELCOP=1, T6=1, MRC=0, SELC=10101, LC=1, M7, C7, A0=1, B=1, C=0)
            }
}

#  SLLI rd,rs1,imm         Shift Left Logical Immediate                 rd ← ux(rs1) « ux(imm)
slli rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=inm(5,0),
            help='rd = (rs1 << inm)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
                var val1 = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("BR", reg2) << val1 ;
                simcore_native_set_value("BR", reg1, result) ;

                simcore_native_go_maddr(0) ;
            }
}


#  SRLI rd,rs1,imm         Shift Right Logical Immediate                 rd ← ux(rs1) » ux(imm)
srli rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=inm(5,0),
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
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=inm(15,0),
            help='rd = (rs1 >> inm)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
                var inm1 = simcore_native_get_field_from_ir(fields, 2) ;

                var val1 = simcore_native_get_value("BR", reg2) ;
                simcore_native_set_value("BR", reg1, val1 >> inm1) ;

                simcore_native_go_maddr(0) ;
            }
}

#  ADD rd,rs1,rs2         Add                                         rd ← sx(rs1) + sx(rs2)
add reg1 reg2 reg3 {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            help='r1 = r2 + r3',
            {
                (MC=1, MRA=0, SELA=1011, MRB=0, SELB=10000, MA=0, MB=0, SELCOP=1010, T6=1, MRC=0, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

#  SUB rd,rs1,rs2         Subtract                                 rd ← sx(rs1) - sx(rs2)
sub reg1 reg2 reg3 {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            help='r1 = r2 - r3',
            {
                (MC=1, MRA=0, SELA=10000, MRB=0, SELB=1011, MA=0, MB=0, SELCOP=1011, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

#  SLL rd,rs1,rs2         Shift Left Logical                         rd ← ux(rs1) « rs2
sll rd rs1 rs2 {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
            help='rd = rs1 <<< rs2',
            {
                (MRA=0, SELA=1011, T9, MRC=1, LC=1, SELC=110111),
                (MC=1, SELA=10000, MA=0, SELB=10000, MB=0, SELCOP=10, T6=1, MRC=0, SELC=10101, LC=1, M7, C7),
        loop10: (A0=0, B=0, C=110, MADDR=bck10ftch),
                (MC=1, SELA=10101, SELB=10101, MA=0, MB=0, SELCOP=111, T6=1, LC=1, SELC=10101),
                (MRB=1, SELB=110111, MB=0, MC=1, SELCOP=10011, T6=1, MRC=1, LC=1, SELC=110111, M7, C7),
                (A0=0, B=1, C=0, MADDR=loop10),
     bck10ftch: (A0=1, B=1, C=0)
            }
}

#  SLT rd,rs1,rs2         Set Less Than                                 rd ← sx(rs1) < sx(rs2)
slt rd rs1 rs2 {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
            help='rd = (rs1 < rs2) ? 1 : 0',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd  = simcore_native_get_field_from_ir(fields, 0) ;
                var rs1 = simcore_native_get_field_from_ir(fields, 1) ;
                var rs2 = simcore_native_get_field_from_ir(fields, 2) ;

                var reg1 = simcore_native_get_value("BR", rs1) ;
                var reg2 = simcore_native_get_value("BR", rs2) ;
                           simcore_native_set_value("BR", rd, (reg1 < reg2)) ;

                simcore_native_go_maddr(0) ;
            }
}

#  SLTU rd,rs1,rs2         Set Less Than Unsigned                         rd ← ux(rs1) < ux(rs2)
sltu rd rs1 rs2 {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
            help='rd = (ux(rs1) < ux(rs2)) ? 1 : 0',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd  = simcore_native_get_field_from_ir(fields, 0) ;
                var rs1 = simcore_native_get_field_from_ir(fields, 1) ;
                var rs2 = simcore_native_get_field_from_ir(fields, 2) ;

                var reg1 = simcore_native_get_value("BR", rs1) ;
                var reg2 = simcore_native_get_value("BR", rs2) ;
                           simcore_native_set_value("BR", rd, (Math.abs(reg1) < Math.abs(reg2))) ;

                simcore_native_go_maddr(0) ;
            }
}

#  XOR rd,rs1,rs2         Xor                                         rd ← ux(rs1) ⊕ ux(rs2)
xor reg1 reg2 reg3 {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            help='r1 = r2 ^ r3',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("BR", reg2) ^ simcore_native_get_value("BR", reg3) ;
                simcore_native_set_value("BR", reg1, result) ;

                simcore_native_go_maddr(0) ;
            }
}

#  SRL rd,rs1,rs2         Shift Right Logical                         rd ← ux(rs1) » rs2
srl rd rs1 rs2 {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
            help='rd = rs1 >>> rs2',
            {
                (MRA=0, SELA=1011, T9=1, MRC=1, LC=1, SELC=110111),
                (MC=1, SELA=10000, MA=0, SELB=10000, MB=0, SELCOP=10, T6=1, MRC=0, SELC=10101, LC=1, M7, C7),
         loop9: (A0=0, B=0, C=110, MADDR=bck9ftch),
                (MC=1, SELA=10101, SELB=10101, MA=0, MB=0, SELCOP=101, T6=1, LC=1, SELC=10101),
                (MRB=1, SELB=110111, MB=0, MC=1, SELCOP=10011, T6=1, MRC=1, LC=1, SELC=110111, M7, C7),
                (A0=0, B=1, C=0, MADDR=loop9),
      bck9ftch: (A0=1, B=1, C=0)
            }
}

#  SRA rd,rs1,rs2         Shift Right Arithmetic                         rd ← sx(rs1) » rs2
sra rd rs1 rs2 {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
            help='rd = rs1 >> rs2',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3 = simcore_native_get_field_from_ir(fields, 2) ;

                var val1 = simcore_native_get_value("BR", reg2) ;
                var val2 = simcore_native_get_value("BR", reg3) ;
                simcore_native_set_value("BR", reg1, val1 >> val2) ;

                simcore_native_go_maddr(0) ;
            }
}

#  OR rd,rs1,rs2         Or                                         rd ← ux(rs1) ∨ ux(rs2)
or reg1 reg2 reg3 {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            help='r1 = r2 | r3',
            {
                (MC=1, MRA=0, SELA=1011, MRB=0, SELB=10000, MA=0, MB=0, SELCOP=10, T6=1, SELC=10101, LC=1, M7, C7, A0=1, B=1, C=0)
            }
}

#  AND rd,rs1,rs2         And                                         rd ← ux(rs1) ∧ ux(rs2)
and reg1 reg2 reg3 {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            help='r1 = r2 & r3',
            {
                (MC=1, MRA=0, SELA=1011, MRB=0, SELB=10000, MA=0, MB=0,  SELCOP=1, T6=1, SELC=10101, LC=1, M7, C7, A0=1, B=1, C=0)
            }
}

#  FENCE pred,succ         Fence         
fence pred succ {
            co=111111,
            nwords=1,
            pred=inm(25,21),
            succ=inm(15,0),
            {
                (A0=1, B=1, C=0)
            }
}

#  FENCE.I                 Fence Instruction         
fence.i {
            co=111111,
            nwords=1,
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
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            help='reg1 = reg2 * reg3',
            {
                (MC=1, MRA=0, SELA=1011, MRB=0, SELB=10000, MA=0, MB=0, SELCOP=1100, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

# MULH rd,rs1,rs2         Multiply High Signed         rd ← (sx(rs1) × sx(rs2)) » xlen
mulh rd rs1 rs2 {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
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
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
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
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
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
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            help='reg1 = reg2 / reg3',
            {
                    # if (reg3 == 0)
                    (MRA=0, SELA=1011, MRB=0, SELB=1011, MA=0, MB=0, MC, SELCOP=10, M7, C7),
                    (A0=0, B=0, C=110, MADDR=fpe1),
                    # reg1 = reg2 / reg3, go fetch
                    (MC=1, MRA=0, SELA=10000, MRB=0, SELB=1011, MA=0, MB=0, SELCOP=1101, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
              fpe1: # RT1 <- ExCode=1
                    (ExCode=1, T11, C4),
                    # csw_rt1(2)
                    (A0=0, B=1, C=0, MADDR=csw_rt1)
            }
}

# DIVU rd,rs1,rs2         Divide Unsigned         rd ← ux(rs1) ÷ ux(rs2)
divu rd rs1 rs2 {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
            help='reg1 = ux(reg2) / ux(reg3)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3 = simcore_native_get_field_from_ir(fields, 2) ;

                if (simcore_native_get_value("BR", reg3) != 0)
                {
                    var val1 = simcore_native_get_value("BR", reg2) ;
                    var val2 = simcore_native_get_value("BR", reg3) ;
                    simcore_native_set_value("BR", reg1, Math.abs(val1) / Math.abs(val2)) ;
                    simcore_native_go_maddr(0) ;
                    return ;
                }

                simcore_native_set_value("CPU", "REG_RT1", 1) ;

                // push PC
                var value  = simcore_native_get_value("CPU", "REG_PC") ;
                var reg_sp = simcore_native_get_value("BR", 2) ;
                reg_sp = reg_sp - 4 ;
                simcore_native_set_value("MEMORY", reg_sp, value) ;
                simcore_native_set_value("BR", 2, reg_sp) ;

                // push SR
                value  = simcore_native_get_value("CPU", "REG_SR") ;
                reg_sp = simcore_native_get_value("BR", 2) ;
                reg_sp = reg_sp - 4 ;
                simcore_native_set_value("MEMORY", reg_sp, value) ;
                simcore_native_set_value("BR", 2, reg_sp) ;

                // MAR <- RT1*4
                var addr = simcore_native_get_value("CPU", "REG_RT1") ;
                addr = 4 * addr ;
                simcore_native_set_value("CPU", "REG_MAR", addr) ;

                // PC <- MBR <- MP[MAR]
                addr = simcore_native_get_value("MEMORY", addr) ;
                simcore_native_set_value("CPU", "REG_PC", addr) ;

                // fetch
                simcore_native_go_maddr(0) ;
            }
}

# REM rd,rs1,rs2         Remainder Signed         rd ← sx(rs1) mod sx(rs2)
rem reg1 reg2 reg3 {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            help='reg1 = reg2 % reg3',
            {
                (MC=1, MRA=0, SELA=10000, MRB=0, SELB=1011, MA=0, MB=0, SELCOP=1110, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

# REMU rd,rs1,rs2         Remainder Unsigned         rd ← ux(rs1) mod ux(rs2)
remu rd rs1 rs2 {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
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
# Register naming
#

#        ABI Name        Description                                Saver
#0        zero                Hard-wired zero                                --
#1        ra                Return address                                Caller
#2        sp                Stack pointer                                Callee
#3        gp                Global pointer                                --
#4        tp                Thread pointer                                --
#5        t0                Temporaries                                Caller
#6        t1                Temporaries                                Caller
#7        t2                Temporaries                                Caller
#8        s0/fp                Saved register/frame pointer                Caller
#9        s1                Saved register                                Callee
#10        a0                Function arguments/return values        Caller
#11        a1                Function arguments/return values        Caller
#12        a2                Function arguments                        Caller
#13        a3                Function arguments                        Caller
#14        a4                Function arguments                        Caller
#15        a5                Function arguments                        Caller
#16        a6                Function arguments                        Caller
#17        a7                Function arguments                        Caller
#18        s2                Saved registers                                Callee
#19        s3                Saved registers                                Callee
#20        s4                Saved registers                                Callee
#21        s5                Saved registers                                Callee
#22        s6                Saved registers                                Callee
#23        s7                Saved registers                                Callee
#24        s8                Saved registers                                Callee
#25        s9                Saved registers                                Callee
#26        s10                Saved registers                                Callee
#27        s11                Saved registers                                Callee
#28        t3                Temporaries                                Caller
#29        t4                Temporaries                                Caller
#30        t5                Temporaries                                Caller
#31        t6                Temporaries                                Caller

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
            addi rd, zero, expression
        }

        # la rd, label        (several expansions)        Load address
        la rd=reg, label=inm
        {
            addu rd, zero, label
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

        # jr rs                jalr x0, rs, 0        Jump register
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

