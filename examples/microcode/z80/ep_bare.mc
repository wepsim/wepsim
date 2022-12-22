
#
# WepSIM (https://wepsim.github.io/wepsim/)
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
# INT
#

syscall {
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

reti {
   co=111111,
   nwords=1,
   help='return from event (interruption, exception, syscall)',
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
        (TA=1, IOR=1, BW=11, M1=1, C1=1),
        (T1=1, LC=1,  MR=0, SELC=10101, A0=1, B=1, C=0)
    }
}

out reg val {
     co=111111,
     nwords=1,
     reg=reg(25,21),
     val=inm(15,0),
     help='device_register[val] = reg',
     {
        (SE=0, OFFSET=0,   SIZE=10000,   T3=1, C0=1),
        (MR=0, SELA=10101, T9=1,         M1=0, C1=1),
        (TA=1, TD=1,       IOW=1, BW=11, A0=1, B=1, C=0)
     }
}


#
# https://www.zilog.com/manage_directlink.php?filepath=docs/z80/um0080&extn=.pdf
# Z80-like
#

ld r1 r2 {
   co=010000,
   nwords=1,
   r1=reg(25,21),
   r2=reg(20,16),
   help='r1 = r2',
   {
       (SELA=10000, T9, SELC=10101, LC, A0=1, B=1, C=0)
   }
}

ldi r1 u16 {
   co=010010,
   nwords=1,
   r1=reg(25,21),
   u16=inm(15,0),
   help='r1 = u16',
   {
       (SE=1, OFFSET=0, SIZE=10000, T3=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
   }
}

ld r1 (r2) {
   co=010011,
   nwords=1,
   r1=reg(25,21),
   r2=reg(20,16),
   help='r1 = MEM[r2]',
   {
       (MR=0, SELA=10000, T9=1, C0),
       (TA=1, R=1, BW=11, M1=1, C1=1),
       (T1=1, LC=1, MR=0, SELC=10101, SE=1, A0=1, B=1, C=0)
   }
}

add_a reg1 {
        co=011000,
        nwords=1,
        reg1=reg(25,21),
        help='acc = acc1 + reg1; update(sr)',
        native,
        {
            // fields is a default parameter with the instruction field information
            var reg1   = simcore_native_get_field_from_ir(fields, 0) ;

            var result = simcore_native_get_value("BR", "4") + simcore_native_get_value("BR", reg1) ;
            simcore_native_set_value("BR", "4", result) ;

            var flags = 0 ;
            if (result == 0) flags = flags | 0x10000000 ;
            if (result <  0) flags = flags | 0x20000000 ;
            simcore_native_set_value("CPU", "REG_SR", flags) ;

            simcore_native_go_maddr(0) ;
        }
}

addi_a s16 {
        co=011010,
        nwords=1,
        s16=inm(15,0),
        help='acc = acc1 + SignExt(s16); update(sr)',
        native,
        {
            // fields is a default parameter with the instruction field information
            var s16   = simcore_native_get_field_from_ir(fields, 0) ;

            if (s16 & 0x00008000)
                s16 = s16 | 0xFFFF0000 ;
            var result = simcore_native_get_value("BR", "4") + s16 ;
            simcore_native_set_value("BR", "4", result) ;

            var flags = 0 ;
            if (result == 0) flags = flags | 0x10000000 ;
            if (result <  0) flags = flags | 0x20000000 ;
            simcore_native_set_value("CPU", "REG_SR", flags) ;

            simcore_native_go_maddr(0) ;
        }
}

inc reg1 {
        co=011100,
        nwords=1,
        reg1=reg(25,21),
        help='reg1 = reg1 + 1',
        native,
        {
            // fields is a default parameter with the instruction field information
            var reg1   = simcore_native_get_field_from_ir(fields, 0) ;

            var result = simcore_native_get_value("BR", reg1) + 1 ;
            simcore_native_set_value("BR", reg1, result) ;

            var flags = 0 ;
            if (result == 0) flags = flags | 0x10000000 ;
            if (result <  0) flags = flags | 0x20000000 ;
            simcore_native_set_value("CPU", "REG_SR", flags) ;
            
            simcore_native_go_maddr(0) ;
        }
}

dec reg1 {
        co=011101,
        nwords=1,
        reg1=reg(25,21),
        help='reg1 = reg1 - 1',
        native,
        {
            // fields is a default parameter with the instruction field information
            var reg1   = simcore_native_get_field_from_ir(fields, 0) ;

            var result = simcore_native_get_value("BR", reg1) - 1 ;
            simcore_native_set_value("BR", reg1, result) ;

            var flags = 0 ;
            if (result == 0) flags = flags | 0x10000000 ;
            if (result <  0) flags = flags | 0x20000000 ;
            simcore_native_set_value("CPU", "REG_SR", flags) ;

            simcore_native_go_maddr(0) ;
        }
}

jp s16 {
        co=110000,
        nwords=1,
        s16=address(15,0)rel,
        help='pc = pc + SignExt(s16)',
        native,
        {
            // fields is a default parameter with the instruction field information
            var s16 = simcore_native_get_field_from_ir(fields, 0) ;
            if (s16 & 0x00008000)
                s16 = s16 | 0xFFFF0000 ;

            var pc = simcore_native_get_value("CPU", "REG_PC") ;
            simcore_native_set_value("CPU", "REG_PC", pc + s16) ;

            simcore_native_go_maddr(0) ;
        }
}

jpz s16 {
        co=110011,
        nwords=1,
        s16=address(15,0)rel,
        help='if (sr.z == 1) -> pc = pc + SignExt(s16)',
        native,
        {
            // fields is a default parameter with the instruction field information
            var s16   = simcore_native_get_field_from_ir(fields, 0) ;
            if (s16 & 0x00008000)
                s16 = s16 | 0xFFFF0000 ;

            var flags = simcore_native_get_value("CPU", "REG_SR") ;
            if (flags & 0x10000000) {
                var pc = simcore_native_get_value("CPU", "REG_PC") ;
                simcore_native_set_value("CPU", "REG_PC", pc + s16) ;
            }

            simcore_native_go_maddr(0) ;
        }
}

call u16 {
        co=100001,
        nwords=1,
        u16=inm(15,0),
        help='sp -= 4; MEM[pc] = r1',
        native,
        {
            // fields is a default parameter with the instruction field information
            var u16   = simcore_native_get_field_from_ir(fields, 0) ;

            var value  = simcore_native_get_value("CPU", "REG_PC") ;
            var reg_sp = simcore_native_get_value("BR", 29) ;
            reg_sp = reg_sp - 4 ;
            simcore_native_set_value("BR",     29,       reg_sp) ;
            simcore_native_set_value("MEMORY", reg_sp,   value) ;
            simcore_native_set_value("CPU",    "REG_PC", u16) ;

            simcore_native_go_maddr(0) ;
        }
}

ret {
        co=100010,
        nwords=1,
        help='pc = MEM[sp]; sp += 4',
        native,
        {
            var reg_sp = simcore_native_get_value("BR",     29) ;
            var value  = simcore_native_get_value("MEMORY", reg_sp) ;
            simcore_native_set_value("CPU", "REG_PC", value) ;
            reg_sp = reg_sp + 4 ;
            simcore_native_set_value("BR", 29, reg_sp) ;

            simcore_native_go_maddr(0) ;
        }
}

halt {
        co=100011,
        nwords=1,
        help='pc = 0',
        native,
        {
            simcore_native_set_value("CPU", "REG_PC", 0) ;

            simcore_native_go_maddr(0) ;
        }
}

push r1 {
        co=100100,
        nwords=1,
        r1=reg(25,21),
        help='sp -= 4; MEM[sp] = r1',
        native,
        {
            // fields is a default parameter with the instruction field information
            var reg1 = simcore_native_get_field_from_ir(fields, 0) ;

            var value  = simcore_native_get_value("BR", reg1) ;
            var reg_sp = simcore_native_get_value("BR", 29) ;
            reg_sp = reg_sp - 4 ;
            simcore_native_set_value("MEMORY", reg_sp,   value) ;
            simcore_native_set_value("BR",         29,   reg_sp) ;

            simcore_native_go_maddr(0) ;
        }
}

pop r1 {
        co=100101,
        nwords=1,
        r1=reg(25,21),
        help='r1 = MEM[sp]; sp += 4',
        native,
        {
            // fields is a default parameter with the instruction field information
            var reg1 = simcore_native_get_field_from_ir(fields, 0) ;

            var reg_sp = simcore_native_get_value("BR",     29) ;
            var value  = simcore_native_get_value("MEMORY", reg_sp) ;
            reg_sp = reg_sp + 4 ;
            simcore_native_set_value("BR", reg1, value) ;
            simcore_native_set_value("BR",   29, reg_sp) ;

            simcore_native_go_maddr(0) ;
        }
}


#
# Register naming
#

registers
{
    0=(R0),
    4=(A),
    5=(BC),
    6=(DE),
    7=(HL),
    8=(IX),
    9=(IY),
    29=(sp) (stack_pointer)
}

