
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

begin,
native
{
      if (simcore_native_get_signal("INT") == 1)
      {
            // RT1 <- MBR <- DB <- INTV
            var value  = simcore_native_get_value("CPU", "INTV") ;
            simcore_native_set_value("CPU", "REG_RT1", value) ;

            // INT down, INTA up
            simcore_native_set_signal("INT",  0) ;
            simcore_native_set_signal("INTA", 1) ;

            // push PC
            value  = simcore_native_get_value("CPU", "REG_PC") ;
            var reg_sp = simcore_native_get_value("BR", 29) ;
            reg_sp = reg_sp - 4 ;
            simcore_native_set_value("MEMORY", reg_sp, value) ;
            simcore_native_set_value("BR", 29, reg_sp) ;

            // push SR
            value  = simcore_native_get_value("CPU", "REG_SR") ;
            reg_sp = simcore_native_get_value("BR", 29) ;
            reg_sp = reg_sp - 4 ;
            simcore_native_set_value("MEMORY", reg_sp, value) ;
            simcore_native_set_value("BR", 29, reg_sp) ;

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

    var addr  = simcore_native_get_value("CPU", "REG_PC") ;
    var value = simcore_native_get_value("MEMORY", addr) ;

    simcore_native_set_value("CPU", "REG_IR", value) ;
    simcore_native_set_value("CPU", "REG_PC", addr + 4) ;

    simcore_native_deco() ;
    simcore_native_go_opcode() ;
}


#
# INT
#

syscall {
        co=111111,
        nwords=1,
        help='system call',
        native,
        {
            simcore_native_set_value("CPU", "REG_RT1", 2) ;

            // push PC
            var value  = simcore_native_get_value("CPU", "REG_PC") ;
            var reg_sp = simcore_native_get_value("BR", 29) ;
            reg_sp = reg_sp - 4 ;
            simcore_native_set_value("MEMORY", reg_sp, value) ;
            simcore_native_set_value("BR", 29, reg_sp) ;

            // push SR
            value  = simcore_native_get_value("CPU", "REG_SR") ;
            reg_sp = simcore_native_get_value("BR", 29) ;
            reg_sp = reg_sp - 4 ;
            simcore_native_set_value("MEMORY", reg_sp, value) ;
            simcore_native_set_value("BR", 29, reg_sp) ;

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

reti {
        co=111111,
        nwords=1,
        help='return from event (interruption, exception, syscall)',
        native,
        {
            // pop SR
            var reg_sp = simcore_native_get_value("BR", 29) ;
            var value  = simcore_native_get_value("MEMORY", reg_sp) ;
            reg_sp = reg_sp + 4 ;
            simcore_native_set_value("CPU", "REG_SR", value) ;
            simcore_native_set_value("BR", 29, reg_sp) ;

            // pop PC
            var reg_sp = simcore_native_get_value("BR", 29) ;
            var value  = simcore_native_get_value("MEMORY", reg_sp) ;
            reg_sp = reg_sp + 4 ;
            simcore_native_set_value("CPU", "REG_PC", value) ;
            simcore_native_set_value("BR", 29, reg_sp) ;

            simcore_native_go_maddr(0) ;
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
        native,
        {
            // fields is a default parameter with the instruction field information
            var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
            var addr   = simcore_native_get_field_from_ir(fields, 1) ;

            var value = simcore_native_get_value("DEVICE", addr) ;
            simcore_native_set_value("BR", reg1, value) ;

            simcore_native_go_maddr(0) ;
        }
}

out reg val {
        co=111111,
        nwords=1,
        reg=reg(25,21),
        val=inm(15,0),
        help='device_register[val] = reg',
        native,
        {
            // fields is a default parameter with the instruction field information
            var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
            var addr   = simcore_native_get_field_from_ir(fields, 1) ;

            var value = simcore_native_get_value("BR", reg1) ;
            simcore_native_set_value("DEVICE", addr, value) ;

            simcore_native_go_maddr(0) ;
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
        native,
        {
            // fields is a default parameter with the instruction field information
            var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
            var reg2 = simcore_native_get_field_from_ir(fields, 1) ;

            var val1 = simcore_native_get_value("BR", reg2) ;
            simcore_native_set_value("BR", reg1, val1) ;

            simcore_native_go_maddr(0) ;
        }
}

ldi r1 u16 {
        co=010010,
        nwords=1,
        r1=reg(25,21),
        u16=inm(15,0),
        help='r1 = u16',
        native,
        {
            // fields is a default parameter with the instruction field information
            var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
            var u16  = simcore_native_get_field_from_ir(fields, 1) ;

            simcore_native_set_value("BR", reg1, u16) ;

            simcore_native_go_maddr(0) ;
        }
}

ld r1 (r2) {
        co=010011,
        nwords=1,
        r1=reg(25,21),
        r2=reg(20,16),
        help='r1 = MEM[r2]',
        native,
        {
            // fields is a default parameter with the instruction field information
            var r1 = simcore_native_get_field_from_ir(fields, 0) ;
            var r2 = simcore_native_get_field_from_ir(fields, 1) ;

            var addr   = simcore_native_get_value("BR", r2) ;
            var value  = simcore_native_get_value("MEMORY", addr) ;
            simcore_native_set_value("BR", r1, value) ;

            simcore_native_go_maddr(0) ;
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

