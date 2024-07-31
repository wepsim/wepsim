
#
# Begin (https://wepsim.github.io/wepsim/)
#

begin
{
          # if (INT) go mrti
          (A0=0, B=0, C=1, MADDR=mrti),

   fetch: (T2, C0),
          (TA, R, BW=11, M1=1, C1=1),
          (M2, C2, T1, C3),
          (A0, B=0, C=0),

    mrti: # MBR <- DB <- INTV
          (INTA, BW=11, M1=1, C1=1),
          # RT1 <- MBR
          (T1=1, C4=1),

 csw_rt1: # push PC
          (MR=1, SELA=11101, MA=0, MB=10, MC=1, SELCOP=1011, T6=1, SELC=11101, LC=1, C0),
          (T2=1, M1=0, C1),
          (BW=11, TA=1, TD=1, W=1)
          # push SR
          (MR=1, SELA=11101, MA=0, MB=10, MC=1, SELCOP=1011, T6=1, SELC=11101, LC=1, C0),
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
# INT/SYSCALL
#

sret {
   co=000001,
   nwords=1,
   {
       # pop SR
       (MR=1, SELA=11101, T9, C0),
       (MR=1, SELA=11101, MA=0, MB=10, MC=1, SELCOP=1010, T6=1, SELC=11101, LC=1),
       (TA=1, R=1, BW=11, M1=1, C1),
       (T1=1, M7=0, C7),
       # pop PC
       (MR=1, SELA=11101, T9, C0),
       (MR=1, SELA=11101, MA=0, MB=10, MC=1, SELCOP=1010, T6=1, SELC=11101, LC=1),
       (TA=1, R=1, BW=11, M1=1, C1),
       (T1=1, M2=0, C2, A0=1, B=1 ,C=0)
   }
}

ecall {
   co=000010,
   nwords=1,
   {
       # RT1 <- ExCode=2
       (ExCode=10, T11, C4),
       # csw_rt1(2)
       (A0=0, B=1, C=0, MADDR=csw_rt1)
   }
}

#
# IN/OUT
#

in reg val {
    co=000011,
    nwords=1,
    reg=reg(25,21),
    val=imm(15,0),
    {
        (SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
        (TA=1, IOR=1, BW=11, M1=1, C1=1),
        (T1=1, LC=1,  MR=0, SELC=10101, A0=1, B=1, C=0)
    }
}

out reg val {
    co=000100,
    nwords=1,
    reg=reg(25,21),
    val=imm(15,0),
    {
       (SE=0, OFFSET=0,   SIZE=10000,   T3=1, C0=1),
       (MR=0, SELA=10101, T9=1,         M1=0, C1=1),
       (TA=1, TD=1,       IOW=1, BW=11, A0=1, B=1, C=0)
    }
}

#
# lb/sb
#

lb rd (rs1) {
    co=001000,
    nwords=1,
    rd=reg(25,21),
    rs1=reg(20,16),
    {
       (MR=0, SELA=10000, T9=1, C0),
       (TA=1, R=1, BW=00, SE=1, M1=1, C1=1),
       (T1=1, LC=1, MR=0, SELC=10101, SE=1, A0=1, B=1, C=0)
    }
}

sb rs2 (rs1) {
    co=001001,
    nwords=1,
    rs2=reg(25,21),
    rs1=reg(20,16),
    {
       (MR=0, SELA=10000, T9=1, C0=1),
       (MR=0, SELA=10101, T9=1, M1=0, C1=1),
       (BW=0, TA=1, TD=1, W=1,  A0=1, B=1, C=0)
    }
}

#
# ALU
#

mul reg1 reg2 reg3 {
    co=001010,
    nwords=1,
    reg1=reg(25,21),
    reg2=reg(20,16),
    reg3=reg(15,11),
    {
        (MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
    }
}

rem reg1 reg2 reg3 {
    co=001011,
    nwords=1,
    reg1=reg(25,21),
    reg2=reg(20,16),
    reg3=reg(15,11),
    {
        (MC=1, MR=0, SELA=10000, SELB=1011, MA=0, MB=0, SELCOP=1110, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
    }
}

div reg1 reg2 reg3 {
    co=001100,
    nwords=1,
    reg1=reg(25,21),
    reg2=reg(20,16),
    reg3=reg(15,11),
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

#
# Branch
#

bge rs1 rs2 offset {
    co=001101,
    nwords=1,
    rs1=reg(25,21),
    rs2=reg(20,16),
    offset=address(15,0)rel,
    {
        (T8, C5),
        (SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7, C7),
        (A0=0, B=0, C=111, MADDR=bge_t1),
        (T5, M7=0, C7),
        (T2, C5),
        (SE=1, OFFSET=0, SIZE=10000, T3, C4),
        (MA=1, MB=10, MC=1, SELCOP=1100, T6, C4),
        (MA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
bge_t1: (T5, M7=0, C7),
        (A0=1, B=1, C=0)
    }
}

bne rs1 rs2 offset {
    co=001110,
    nwords=1,
    rs1=reg(25,21),
    rs2=reg(20,16),
    offset=address(15,0)rel,
    {
         (T8, C5),
         (SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7, C7),
         (A0=0, B=0, C=110, MADDR=bne_t2),
         (T5, M7=0, C7),
         (T2, C5),
         (SE=1, OFFSET=0, SIZE=10000, T3, C4),
         (MA=1, MB=10, MC=1, SELCOP=1100, T6, C4),
         (MA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
 bne_t2: (T5, M7=0, C7),
         (A0=1, B=1, C=0)
    }
}


#
# ARM microcode
# 

mov r1 u32 {
    co=001111,
    nwords=2,
    r1=reg(20,16),
    u32=imm(63,32),
    {
        (T2, C0),
        (Ta, R, BW=11, M1, C1),
        (M2=1, C2),
        (T1, SelC=10000, MR=0, LC),
        (A0=1, B=1, C=0)
    }
}

str reg1 (reg2) {
    co=010000,
    nwords=1,
    reg1 = reg(25,21),
    reg2 = reg(20,16),
    {
        (MR=0,  SELA=10000, T9=1, C0=1),
        (MR=0,  SELA=10101, T9=1, M1=0, C1=1),
        (BW=11, TA=1, TD=1, W=1,  A0=1, B=1, C=0)
    }
}

ldr reg1 (reg2) {
    co=010001,
    nwords=1,
    reg1 = reg(25,21),
    reg2 = reg(20,16),
    help='$r1 = (MEM[$r2+3] ... MEM[$r2])',
    {
        (MR=0, SELA=10000, T9=1, C0),
        (TA=1, R=1, BW=11, M1=1, C1=1),
        (T1=1, LC=1, MR=0, SELC=10101, SE=1, A0=1, B=1, C=0)
    }
}

adds reg1 reg2 reg3 {
    co=010010,
    nwords=1,
    reg1=reg(25,21),
    reg2=reg(20,16),
    reg3=reg(15,11),
    {
         (SelA=10000, SelB=01011, SelC=10101, MR=0, MA=0, MB=0 SELCOP=1010, MC=1, T6, LC, SELP=11, M7, C7),
         (A0=1, B=1, C=0)
    }
}

adds reg1 reg2 s16 {
    co=010011,
    nwords=1,
    reg1=reg(25,21),
    reg2=reg(20,16),
    s16=imm(15,0),
    {
         (SIZE=10000, SE,OFFSET=0, T3, C5),
         (SelA=10000, SelC=10101, MR=0, MA=0, MB=01 SELCOP=1010, MC=1, T6, LC, SELP=11, M7, C7),
         (A0=1, B=1, C=0)
    }
}

mvns reg1 reg2 {
    co=010100,
    nwords=1,
    reg1=reg(25,21),
    reg2=reg(15,11),
    {
         (SelA=01011, SelC=10101, MR=0, MA=0, MC=1, SELCOP=0011, T6, LC, SELP=11, M7, C7),
         (A0=1, B=1, C=0)
    }
}

cmp reg reg {
    co=010101,
    nwords=1,
    reg=reg(25,21),
    reg=reg(15,11),
    {
        (SelA=10101, SelB=01011, MR=0, MA=0, MB=0, SELCOP=1011, MC=1, SELP=11, M7, C7),
        (A0=1, B=1, C=0)
    }
}

beq s16 {
    co=010110,
    nwords=1,
    s16=address(15,0)rel,
    {
            (T8, C5)
            (C=110, B=1, A0=0, MADDR=beqs16)
            (T2, C5)
            (SE=1, Size=10000, Offset=0, T3, C4)
            (MA=1, MB=10, MC=1, SELCOP=1100, T6, C4),
            (MA=1, MB=01, MC=1, SelCop=1010, T6, C2)
    beqs16: (T1, M7=0, C7)
            (A0=1, B=1, C=0)
    }
}

bl u16 {
    co=010111,
    nwords=1,
    u16=address(15,0)abs,
    {
         (T2=1, SELC=01110, LC=1, MR=1),
         (SE=0, OFFSET=0, SIZE=10000, T3=1, C2=1),
  	 (A0=1, B=1, C=0)
    }
}

bx RRE {
    co=011000,
    nwords=1,
    RRE=reg(20,16),
    {
        (SELA=10000, MR=0, T9=1, M2=0, C2=1),
        (A0=1, B=1, C=0)
    }
}

halt {
    co=011001,
    nwords=1,
    {
        (selA=0, MR=1, T9, M2=0, C2, SelC=1101, LC),
        (A0=1, B=1, C=0)
    }
}


#
# Register naming
#
#

registers
{
      0=($R0),
      1=($R1),
      2=($R2),
      3=($R3),
      4=($R4),
      5=($R5),
      6=($R6),
      7=($R7),
      8=($R8),
      9=($R9),
      10=($R10),
      11=($R11),
      12=($R12),
      13=($R13, $SP) (stack_pointer),
      14=($R14, $LR),
      15=($R15),
}

