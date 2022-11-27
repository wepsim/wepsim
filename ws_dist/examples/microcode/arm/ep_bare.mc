
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
   co=111111,
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
   co=111111,
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
    co=000100,
    nwords=1,
    reg=reg(25,21),
    val=inm(15,0),
    {
        (SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
        (TA=1, IOR=1, BW=11, M1=1, C1=1),
        (T1=1, LC=1,  MR=0, SELC=10101, A0=1, B=1, C=0)
    }
}

out reg val {
     co=000101,
     nwords=1,
     reg=reg(25,21),
     val=inm(15,0),
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
     co=000011,
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
     co=000110,
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
     co=001000,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     reg3=reg(15,11),
     {
         (MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
     }
}

rem reg1 reg2 reg3 {
     co=001001,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     reg3=reg(15,11),
     {
         (MC=1, MR=0, SELA=10000, SELB=1011, MA=0, MB=0, SELCOP=1110, T6=1, SELC=10101, LC=1, SELP=11, M7, C7, A0=1, B=1, C=0)
     }
}

div reg1 reg2 reg3 {
     co=001010,
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
     co=000111,
     nwords=1,
     rs1=reg(25,21),
     rs2=reg(20,16),
     offset=address(15,0)rel,
     {
         (T8, C5),
         (SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7, C7),
         (A0=0, B=0, C=111, MADDR=bge_t1),
         (T5, M7=0, C7),
         (T2, C4),
         (SE=1, OFFSET=0, SIZE=10000, T3, C5),
         (MA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
 bge_t1: (T5, M7=0, C7),
         (A0=1, B=1, C=0)
     }
}

bne rs1 rs2 offset {
     co=001011,
     nwords=1,
     rs1=reg(25,21),
     rs2=reg(20,16),
     offset=address(15,0)rel,
     {
         (T8, C5),
         (SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7, C7),
         (A0=0, B=0, C=110, MADDR=bne_t2),
         (T5, M7=0, C7),
         (T2, C4),
         (SE=1, OFFSET=0, SIZE=10000, T3, C5),
         (MA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
 bne_t2: (T5, M7=0, C7),
         (A0=1, B=1, C=0)
     }
}


#
# P2 code
# 

mov r1 u32 {
     co=010010,
     nwords=2,
     r1=reg(20,16),
     u32=inm(63,32),
     native,
     {
          // fields is a default parameter with the instruction field information
          var reg1 = simcore_native_get_field_from_ir(fields, 0) ;

          var pc = simcore_native_get_value("CPU", "REG_PC") ;
          var value = simcore_native_get_value("MEMORY", pc) ;
          simcore_native_set_value("BR", reg1, value) ;  

          simcore_native_set_value("CPU", "REG_PC", pc+4) ;
        //simcore_native_set_value("BR",   15,      pc+4) ;

          simcore_native_go_maddr(0) ;
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
     co=010011,
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
     co=011000,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     reg3=reg(15,11),
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("BR", reg2) + simcore_native_get_value("BR", reg3) ;
         simcore_native_set_value("BR", reg1, result) ;

         var flags = 0 ;
         if (result == 0) flags = flags | 0x10000000 ;
         if (result <  0) flags = flags | 0x20000000 ;
         simcore_native_set_value("CPU", "REG_SR", flags) ;

         simcore_native_go_maddr(0) ;
     }
}

adds reg1 reg2 s16 {
     co=011010,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     s16 =inm(15,0),
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
         var s16  = simcore_native_get_field_from_ir(fields, 2) ;

         if (s16 & 0x00008000)
             s16 = s16 | 0xFFFF0000 ;
         var result = simcore_native_get_value("BR", reg2) + s16 ;
         simcore_native_set_value("BR", reg1, result) ;

         var flags = 0 ;
         if (result == 0) flags = flags | 0x10000000 ;
         if (result <  0) flags = flags | 0x20000000 ;
         simcore_native_set_value("CPU", "REG_SR", flags) ;

         simcore_native_go_maddr(0) ;
     }
}

mvns reg1 reg2 {
     co=011011,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(15,11),
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;

         var result = ~simcore_native_get_value("BR", reg1) ;
         simcore_native_set_value("BR", reg1, result) ;

         var flags = 0 ;
         if (result == 0) flags = flags | 0x10000000 ;
         if (result <  0) flags = flags | 0x20000000 ;
         simcore_native_set_value("CPU", "REG_SR", flags) ;

         simcore_native_go_maddr(0) ;
     }
}

cmp reg reg {
     co=010110,
     nwords=1,
     reg=reg(25,21),
     reg=reg(15,11),
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2 = simcore_native_get_field_from_ir(fields, 1) ;

         reg1 = simcore_native_get_value("BR", reg1) ;
         reg2 = simcore_native_get_value("BR", reg2) ;
         var result = reg1 - reg2 ;

         var flags = 0 ;
         if (result == 0) flags = flags | 0x10000000 ;
         if (result <  0) flags = flags | 0x20000000 ;
         simcore_native_set_value("CPU", "REG_SR", flags) ;

         simcore_native_go_maddr(0) ;
     }
}

beq s16 {
     co=110100,
     nwords=1,
     s16=address(15,0)rel,
     native,
     {
         // fields is a default parameter with the instruction field information
         var s16 = simcore_native_get_field_from_ir(fields, 0) ;
         if (s16 & 0x00008000)
             s16 = s16 | 0xFFFF0000 ;

         var flags = simcore_native_get_value("CPU", "REG_SR") ;
         if (flags & 0x10000000)
         {
               var pc = simcore_native_get_value("CPU", "REG_PC") ;
               simcore_native_set_value("CPU", "REG_PC", pc + s16) ;
            // simcore_native_set_value("BR",  15,       pc + s16) ;
         }

         simcore_native_go_maddr(0) ;
     }
}

bl u16 {
     co=100001,
     nwords=1,
     u16=address(15,0)abs,
     native,
     {
         // fields is a default parameter with the instruction field information
         var u16 = simcore_native_get_field_from_ir(fields, 0) ;

         var pc = simcore_native_get_value("CPU", "REG_PC") ;
         simcore_native_set_value("BR", 14, pc) ;
         simcore_native_set_value("CPU", "REG_PC", u16) ;
      // simcore_native_set_value("BR", 15, u16) ;

         simcore_native_go_maddr(0) ;
     }
}

bx reg1 {
     co=100010,
     nwords=1,
     reg1=reg(20,16),
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1 = simcore_native_get_field_from_ir(fields, 0) ;

         var new_pc = simcore_native_get_value("BR", reg1) ;
         simcore_native_set_value("CPU", "REG_PC", new_pc) ;
      // simcore_native_set_value("BR",  15,       new_pc) ;

         simcore_native_go_maddr(0) ;
     }
}

halt {
     co=100011,
     nwords=1,
     native,
     {
         simcore_native_set_value("BR",  13,       0) ; // SP
         simcore_native_set_value("CPU", "REG_PC", 0) ;
      // simcore_native_set_value("BR",  15,       0) ;

         simcore_native_go_maddr(0) ;
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

