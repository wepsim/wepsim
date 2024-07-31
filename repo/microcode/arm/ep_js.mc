
#
# Begin (https://wepsim.github.io/wepsim/)
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
# INT/SYSCALL
#

sret {
    co=000001,
    nwords=1,
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

ecall {
    co=000010,
    nwords=1,
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


#
# IN/OUT
#

in reg val {
    co=000011,
    nwords=1,
    reg=reg(25,21),
    val=imm(15,0),
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
    co=000100,
    nwords=1,
    reg=reg(25,21),
    val=imm(15,0),
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
# lb/sb
#

lb rd (rs1) {
    co=001000,
    nwords=1,
    rd=reg(25,21),
    rs1=reg(20,16),
    help='r1 = (00, 00, 00, MEM[r2])',
    native,
    {
        // fields is a default parameter with the instruction field information
        var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
        var reg2   = simcore_native_get_field_from_ir(fields, 1) ;

        var b_addr = simcore_native_get_value("BR", reg2) ;
        var w_addr = b_addr & 0xFFFFFFFC ;
        var w_value = simcore_native_get_value("MEMORY", w_addr) ;
        var  b_value = b_addr & 0x00000003 ;
             b_value = w_value >>> (8 * b_value) ;
        if  (b_value & 0x00000080)
             b_value = b_value | 0xFFFFFF00 ;
        else b_value = b_value & 0x000000FF ;
        simcore_native_set_value("BR", reg1, b_value) ;

        simcore_native_go_maddr(0) ;
    }
}

sb rs2 (rs1) {
    co=001001,
    nwords=1,
    rs2=reg(25,21),
    rs1=reg(20,16),
    help='MEM[r2] = r1/8',
    native,
    {
        // fields is a default parameter with the instruction field information
        var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
        var reg2   = simcore_native_get_field_from_ir(fields, 1) ;

        var b_addr  = simcore_native_get_value("BR", reg2) ;
        var b_value = simcore_native_get_value("BR", reg1) ;
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

#
# ALU
#

mul reg1 reg2 reg3 {
    co=001010,
    nwords=1,
    reg1=reg(25,21),
    reg2=reg(20,16),
    reg3=reg(15,11),
    help='r1 = r2 * r3',
    native,
    {
        // fields is a default parameter with the instruction field information
        var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
        var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
        var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

        var result = simcore_native_get_value("BR", reg2) * simcore_native_get_value("BR", reg3) ;
        simcore_native_set_value("BR", reg1, result) ;

        simcore_native_go_maddr(0) ;
    }
}

rem reg1 reg2 reg3 {
    co=001011,
    nwords=1,
    reg1=reg(25,21),
    reg2=reg(20,16),
    reg3=reg(15,11),
    help='r1 = r2 % r3',
    native,
    {
        // fields is a default parameter with the instruction field information
        var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
        var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
        var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

        var result = simcore_native_get_value("BR", reg2) % simcore_native_get_value("BR", reg3) ;
        simcore_native_set_value("BR", reg1, result) ;

        simcore_native_go_maddr(0) ;
    }
}

div reg1 reg2 reg3 {
    co=001100,
    nwords=1,
    reg1=reg(25,21),
    reg2=reg(20,16),
    reg3=reg(15,11),
    help='r1 = r2 / r3',
    native,
    {
        // fields is a default parameter with the instruction field information
        var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
        var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
        var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

        if (simcore_native_get_value("BR", reg3) != 0)
        {
            var result = simcore_native_get_value("BR", reg2) / simcore_native_get_value("BR", reg3) ;
            simcore_native_set_value("BR", reg1, result) ;
            simcore_native_go_maddr(0) ;
            return ;
        }

       simcore_native_set_value("CPU", "REG_RT1", 1) ;

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

#
# Branch
#

bge rs1 rs2 offset {
    co=001101,
    nwords=1,
    rs1=reg(25,21),
    rs2=reg(20,16),
    offset=address(15,0)rel,
    help='if ($r1 >= $r2) pc += 4*offset',
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
            if ((offset & 0x8000) > 0) {
                offset = offset | 0xFFFF0000 ;
            }
            pc = pc + 4*offset ;
            simcore_native_set_value("CPU", "REG_PC", pc) ;
        }

        simcore_native_go_maddr(0) ;
    }
}

bne rs1 rs2 offset {
    co=001110,
    nwords=1,
    rs1=reg(25,21),
    rs2=reg(20,16),
    offset=address(15,0)rel,
    help='if ($r1 != $r2) pc += 4*offset',
    native,
    {
        // fields is a default parameter with the instruction field information
        var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
        var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
        var offset = simcore_native_get_field_from_ir(fields, 2) ;

        reg1 = simcore_native_get_value("BR", reg1) ;
        reg2 = simcore_native_get_value("BR", reg2) ;
        if (reg1 != reg2)
        {
            var pc = simcore_native_get_value("CPU", "REG_PC") ;
            if ((offset & 0x8000) > 0) {
                offset = offset | 0xFFFF0000 ;
            }
            pc = pc + 4*offset ;
            simcore_native_set_value("CPU", "REG_PC", pc) ;
        }

        simcore_native_go_maddr(0) ;
    }
}


#
# ARM-like instruction set
# 

mov r1 u32 {
    co=001111,
    nwords=2,
    r1=reg(20,16),
    u32=imm(63,32),
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
    reg2 = reg(15,11),
    native,
    {
        var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
        var reg2   = simcore_native_get_field_from_ir(fields, 1) ;

        var addr   = simcore_native_get_value("BR", reg2) ;
        var value1 = simcore_native_get_value("BR", reg1) ;
        simcore_native_set_value("MEMORY", addr, value1) ;

        simcore_native_go_maddr(0) ;
    }
}

ldr reg1 (reg2) {
    co=010001,
    nwords=1,
    reg1 = reg(25,21),
    reg2 = reg(15,11),
    native,
    {
        // fields is a default parameter with the instruction field information
        var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
        var reg2   = simcore_native_get_field_from_ir(fields, 1) ;

        var addr  = simcore_native_get_value("BR", reg2) ;
        var value = simcore_native_get_value("MEMORY", addr) ;
        simcore_native_set_value("BR", reg1, value) ;

        simcore_native_go_maddr(0) ;
    }
}

adds reg1 reg2 reg3 {
    co=010010,
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
    co=010011,
    nwords=1,
    reg1=reg(25,21),
    reg2=reg(20,16),
    s16 =imm(15,0),
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
    co=010100,
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
    co=010101,
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
    co=010110,
    nwords=1,
    s16=address(15,0)rel,
    native,
    {
        // fields is a default parameter with the instruction field information
        var s16 = simcore_native_get_field_from_ir(fields, 0) ;
        if (s16 & 0x00008000) {
            s16 = s16 | 0xFFFF0000 ;
        }

        var flags = simcore_native_get_value("CPU", "REG_SR") ;
        if (flags & 0x10000000)
        {
            var pc = simcore_native_get_value("CPU", "REG_PC") ;
            simcore_native_set_value("CPU", "REG_PC", pc + 4*s16) ;
        }

        simcore_native_go_maddr(0) ;
    }
}

bl u16 {
    co=010111,
    nwords=1,
    u16=address(15,0)abs,
    native,
    {
        // fields is a default parameter with the instruction field information
        var u16 = simcore_native_get_field_from_ir(fields, 0) ;

        var pc = simcore_native_get_value("CPU", "REG_PC") ;
        simcore_native_set_value("BR", 14, pc) ;
        simcore_native_set_value("CPU", "REG_PC", u16) ;

        simcore_native_go_maddr(0) ;
    }
}

bx reg1 {
    co=011000,
    nwords=1,
    reg1=reg(20,16),
    native,
    {
        // fields is a default parameter with the instruction field information
        var reg1 = simcore_native_get_field_from_ir(fields, 0) ;

        var new_pc = simcore_native_get_value("BR", reg1) ;
        simcore_native_set_value("CPU", "REG_PC", new_pc) ;

        simcore_native_go_maddr(0) ;
    }
}

halt {
    co=011001,
    nwords=1,
    native,
    {
        simcore_native_set_value("BR",  13,       0) ; // SP
        simcore_native_set_value("CPU", "REG_PC", 0) ;

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


