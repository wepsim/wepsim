
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
         var reg_sp = simcore_native_get_value("CPU", "BR.29") ;
         reg_sp = reg_sp - 4 ;
         simcore_native_set_value("MEMORY", reg_sp, value) ;
         simcore_native_set_value("CPU", "BR.29", reg_sp) ;

         // push SR
         value  = simcore_native_get_value("CPU", "REG_SR") ;
         reg_sp = simcore_native_get_value("CPU", "BR.29") ;
         reg_sp = reg_sp - 4 ;
         simcore_native_set_value("MEMORY", reg_sp, value) ;
         simcore_native_set_value("CPU", "BR.29", reg_sp) ;

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
        var reg_sp = simcore_native_get_value("CPU", "BR.29") ;
        reg_sp = reg_sp - 4 ;
        simcore_native_set_value("MEMORY", reg_sp, value) ;
        simcore_native_set_value("CPU", "BR.29", reg_sp) ;

        // push SR
        value  = simcore_native_get_value("CPU", "REG_SR") ;
        reg_sp = simcore_native_get_value("CPU", "BR.29") ;
        reg_sp = reg_sp - 4 ;
        simcore_native_set_value("MEMORY", reg_sp, value) ;
        simcore_native_set_value("CPU", "BR.29", reg_sp) ;

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
        var reg_sp = simcore_native_get_value("CPU", "BR.29") ;
        var value  = simcore_native_get_value("MEMORY", reg_sp) ;
        reg_sp = reg_sp + 4 ;
        simcore_native_set_value("CPU", "REG_SR", value) ;
        simcore_native_set_value("CPU", "BR.29", reg_sp) ;

        // pop PC
        var reg_sp = simcore_native_get_value("CPU", "BR.29") ;
        var value  = simcore_native_get_value("MEMORY", reg_sp) ;
        reg_sp = reg_sp + 4 ;
        simcore_native_set_value("CPU", "REG_PC", value) ;
        simcore_native_set_value("CPU", "BR.29", reg_sp) ;

        simcore_native_go_maddr(0) ;
    }
}


#
# Related to power consumption
#

# RDCYCLE rd        Load clock cycles     rd ← ux(clock_cycles_acc)
rdcycle reg1  {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     help='reg1 = load accumulated clock cycles',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;

         // get accumulated time (CLK) as power consumption (ACC_PWR)
         var result = simcore_native_get_value("CPU", "CLK") * 10 ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}


#
# ALU (logic)
#

and reg1 reg2 reg3 {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     reg3=reg(15,11),
     help='r1 = r2 & r3',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) & simcore_native_get_value("CPU", "BR." + reg3) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

andi reg1 reg2 val {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     val =imm(15,0),
     help='r1 = r2 & val',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var val    = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) & (val >>> 0) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

or reg1 reg2 reg3 {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     reg3=reg(15,11),
     help='r1 = r2 | r3',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) | simcore_native_get_value("CPU", "BR." + reg3) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

ori reg1 reg2 val {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     val =imm(15,0),
     help='r1 = r2 | val',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var val    = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) | (val >>> 0) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

not reg {
     co=111111,
     nwords=1,
     reg=reg(25,21),
     help='r1 = ~r1',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;

         var result = simcore_native_get_value("CPU", "BR." + reg1) ;
         simcore_native_set_value("CPU", "BR." + reg1, ~result) ;

         simcore_native_go_maddr(0) ;
     }
}

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

         var result = simcore_native_get_value("CPU", "BR." + reg2) ^ simcore_native_get_value("CPU", "BR." + reg3) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

xori reg1 reg2 val {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     val =imm(15,0),
     help='r1 = r2 ^ val',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var val    = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) ^ (val >>> 0) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

nor reg1 reg2 reg3 {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     reg3=reg(15,11),
     help='$r1 = ~($r2 | $r3)',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

         var result = ~(simcore_native_get_value("CPU", "BR." + reg2) | simcore_native_get_value("CPU", "BR." + reg3)) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

slt reg1 reg2 reg3 {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     reg3=reg(15,11),
     help='$r1 = ($r2 < $r3) ? 1 : 0',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

         var result = (simcore_native_get_value("CPU", "BR." + reg2) < simcore_native_get_value("CPU", "BR." + reg3)) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

slti reg1 reg2 val {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     val =imm(15,0),
     help='$r1 = ($r2 < val) ? 1 : 0',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var val    = simcore_native_get_field_from_ir(fields, 2) ;

         var result = (simcore_native_get_value("CPU", "BR." + reg2) < val) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}


#
# ALU (arith.)
#

add reg1 reg2 reg3 {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     reg3=reg(15,11),
     help='r1 = r2 + r3',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) + simcore_native_get_value("CPU", "BR." + reg3) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

addu reg1 reg2 reg3 {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     reg3=reg(15,11),
     help='r1 = ux(r2) + ux(r3)',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

         var op1 = simcore_native_get_value("CPU", "BR." + reg2) >>> 0 ;
         var op2 = simcore_native_get_value("CPU", "BR." + reg3) >>> 0 ;
         simcore_native_set_value("CPU", "BR." + reg1, op1 + op2) ;

         simcore_native_go_maddr(0) ;
     }
}

addi reg1 reg2 val {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     val =imm(15,0),
     help='r1 = r2 + val',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var val    = simcore_native_get_field_from_ir(fields, 2) ;

         if (val & 0x00008000)
             val = val | 0xFFFF0000 ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) + val ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

addiu reg1 reg2 val {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     val =imm(15,0),
     help='r1 = ux(r2) + ux(val)',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var val    = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) + val ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

sub reg1 reg2 reg3 {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     reg3=reg(15,11),
     help='r1 = r2 - r3',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) - simcore_native_get_value("CPU", "BR." + reg3) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

sub reg1 reg2 val {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     val =imm(15,0),
     help='r1 = r2 - val',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var val    = simcore_native_get_field_from_ir(fields, 2) ;

         if (val & 0x00008000)
             val = val | 0xFFFF0000 ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) - val ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

subu reg1 reg2 reg3 {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     reg3=reg(15,11),
     help='r1 = ux(r2) - ux(r3)',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

         var op1 = simcore_native_get_value("CPU", "BR." + reg2) >>> 0 ;
         var op2 = simcore_native_get_value("CPU", "BR." + reg3) >>> 0 ;
         simcore_native_set_value("CPU", "BR." + reg1, (op1 - op2) >>> 0) ;

         simcore_native_go_maddr(0) ;
     }
}

mul reg1 reg2 reg3 {
     co=111111,
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

         var result = simcore_native_get_value("CPU", "BR." + reg2) * simcore_native_get_value("CPU", "BR." + reg3) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

mul reg1 reg2 val {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     val =imm(15,0),
     help='r1 = r2 * val',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var val    = simcore_native_get_field_from_ir(fields, 2) ;

         if (val & 0x00008000)
             val = val | 0xFFFF0000 ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) * val ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

div reg1 reg2 reg3 {
     co=111111,
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

         if (simcore_native_get_value("CPU", "BR." + reg3) != 0)
         {
             var result = simcore_native_get_value("CPU", "BR." + reg2) / simcore_native_get_value("CPU", "BR." + reg3) ;
             simcore_native_set_value("CPU", "BR." + reg1, result) ;
             simcore_native_go_maddr(0) ;
             return ;
         }

        simcore_native_set_value("CPU", "REG_RT1", 1) ;

        // push PC
        var value  = simcore_native_get_value("CPU", "REG_PC") ;
        var reg_sp = simcore_native_get_value("CPU", "BR.29") ;
        reg_sp = reg_sp - 4 ;
        simcore_native_set_value("MEMORY", reg_sp, value) ;
        simcore_native_set_value("CPU", "BR.29", reg_sp) ;

        // push SR
        value  = simcore_native_get_value("CPU", "REG_SR") ;
        reg_sp = simcore_native_get_value("CPU", "BR.29") ;
        reg_sp = reg_sp - 4 ;
        simcore_native_set_value("MEMORY", reg_sp, value) ;
        simcore_native_set_value("CPU", "BR.29", reg_sp) ;

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

rem reg1 reg2 reg3 {
     co=111111,
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

         var result = simcore_native_get_value("CPU", "BR." + reg2) % simcore_native_get_value("CPU", "BR." + reg3) ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}


#
# Bitwise Shift
#

srl reg1 reg2 val {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     val=imm(5,0),
     help='$r1 = $r2 >>> val',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
         var val1 = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) >>> val1 ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

sll reg1 reg2 val {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     val=imm(5,0),
     help='$r1 = $r2 <<< val',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
         var val1 = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) << val1 ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}

sra reg1 reg2 val {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     val=imm(5,0),
     help='$r1 = $r2 >> val',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
         var val1 = simcore_native_get_field_from_ir(fields, 2) ;

         var result = simcore_native_get_value("CPU", "BR." + reg2) >> val1 ;
         simcore_native_set_value("CPU", "BR." + reg1, result) ;

         simcore_native_go_maddr(0) ;
     }
}


#
# LI/LA
#

li reg val {
     co=111111,
     nwords=1,
     reg=reg(25,21),
     val=imm(15,0),
     help='r1 = SignExt(val)',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var val1   = simcore_native_get_field_from_ir(fields, 1) ;

         if (val1 & 0x00008000)
             val1 = val1 | 0xFFFF0000 ;

         simcore_native_set_value("CPU", "BR." + reg1, val1) ;

         simcore_native_go_maddr(0) ;
     }
}

liu reg val {
     co=111111,
     nwords=1,
     reg=reg(25,21),
     val=imm(15,0),
     help='r1 = (00, 00, val)',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var val1   = simcore_native_get_field_from_ir(fields, 1) ;

         simcore_native_set_value("CPU", "BR." + reg1, val1) ;

         simcore_native_go_maddr(0) ;
     }
}

la  reg addr {
     co=111111,
     nwords=1,
     reg=reg(25,21),
     addr=address(15,0)abs,
     help='r1 = addr/16',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var val1   = simcore_native_get_field_from_ir(fields, 1) ;

         simcore_native_set_value("CPU", "BR." + reg1, val1) ;

         simcore_native_go_maddr(0) ;
     }
}

la  reg addr {
     co=111111,
     nwords=2,
     reg=reg(25,21),
     addr=address(63,32)abs,
     help='r1 = addr/32',
     native,
     {
          // fields is a default parameter with the instruction field information
          var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
        //var u32  = simcore_native_get_field_from_ir(fields, 1) ;

          var pc = simcore_native_get_value("CPU", "REG_PC") ;
          var value = simcore_native_get_value("MEMORY", pc) ;
          simcore_native_set_value("CPU", "BR." + reg1, value) ;
          simcore_native_set_value("CPU", "REG_PC", pc + 4) ;

          simcore_native_go_maddr(0) ;
     }
}


#
# LOAD/STORE
#

lw reg addr {
     co=111111,
     nwords=1,
     reg=reg(25,21),
     addr=address(15,0)abs,
     help='r1 = (MEM[addr+3] .. MEM[addr])',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var addr   = simcore_native_get_field_from_ir(fields, 1) ;

         var value = simcore_native_get_value("MEMORY", addr) ;
         simcore_native_set_value("CPU", "BR." + reg1, value) ;

         simcore_native_go_maddr(0) ;
     }
}

sw reg addr {
     co=111111,
     nwords=1,
     reg=reg(25,21),
     addr=address(15,0)abs,
     help='MEM[addr+3 .. addr] = r1',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var addr   = simcore_native_get_field_from_ir(fields, 1) ;

         var value = simcore_native_get_value("CPU", "BR." + reg1) ;
         simcore_native_set_value("MEMORY", addr, value) ;

         simcore_native_go_maddr(0) ;
     }
}

lb reg addr {
     co=111111,
     nwords=1,
     reg=reg(25,21),
     addr=address(15,0)abs,
     help='r1 = MEM[addr]/8',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var addr   = simcore_native_get_field_from_ir(fields, 1) ;

         var b_addr = addr ;
         var w_addr = b_addr & 0xFFFFFFFC ;
         var w_value = simcore_native_get_value("MEMORY", w_addr) ;
         var  b_value = b_addr & 0x00000003 ;
              b_value = w_value >>> (8 * b_value) ;
         if  (b_value & 0x00000080)
              b_value = b_value | 0xFFFFFF00 ;
         else b_value = b_value & 0x000000FF ;
         simcore_native_set_value("CPU", "BR." + reg1, b_value) ;

         simcore_native_go_maddr(0) ;
     }
}

sb reg addr {
     co=111111,
     nwords=1,
     reg=reg(25,21),
     addr=address(15,0)abs,
     help='MEM[addr] = r1/8',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var addr   = simcore_native_get_field_from_ir(fields, 1) ;

         var b_addr  = addr ;
         var b_value = simcore_native_get_value("CPU", "BR." + reg1) ;
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

lb reg1 (reg2) {
     co=111111,
     nwords=1,
     reg1 = reg(25,21),
     reg2 = reg(20,16),
     help='r1 = (00, 00, 00, MEM[r2])',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;

         var b_addr = simcore_native_get_value("CPU", "BR." + reg2) ;
         var w_addr = b_addr & 0xFFFFFFFC ;
         var w_value = simcore_native_get_value("MEMORY", w_addr) ;
         var  b_value = b_addr & 0x00000003 ;
              b_value = w_value >>> (8 * b_value) ;
         if  (b_value & 0x00000080)
              b_value = b_value | 0xFFFFFF00 ;
         else b_value = b_value & 0x000000FF ;
         simcore_native_set_value("CPU", "BR." + reg1, b_value) ;

         simcore_native_go_maddr(0) ;
     }
}

lb reg1 val(reg2) {
     co=111111,
     nwords=1,
     reg1 = reg(25,21),
     val  = imm(15,0),
     reg2 = reg(20,16),
     help='r1 = (00, 00, 00, MEM[r2+val])',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var val    = simcore_native_get_field_from_ir(fields, 1) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 2) ;

         if (val & 0x00008000)
             val = val | 0xFFFF0000 ;

         var b_addr = simcore_native_get_value("CPU", "BR." + reg2) + val ;
         var w_addr = b_addr & 0xFFFFFFFC ;
         var w_value = simcore_native_get_value("MEMORY", w_addr) ;
         var  b_value = b_addr & 0x00000003 ;
              b_value = w_value >>> (8 * b_value) ;
         if  (b_value & 0x00000080)
              b_value = b_value | 0xFFFFFF00 ;
         else b_value = b_value & 0x000000FF ;
         simcore_native_set_value("CPU", "BR." + reg1, b_value) ;

         simcore_native_go_maddr(0) ;
     }
}

lbu reg1 (reg2) {
     co=111111,
     nwords=1,
     reg1 = reg(25,21),
     reg2 = reg(20,16),
     help ='$r1 = (00, 00, 00, ux(MEM[$r2]))',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;

         var b_addr = simcore_native_get_value("CPU", "BR." + reg2) ;
         var w_addr = b_addr & 0xFFFFFFFC ;
         var w_value = simcore_native_get_value("MEMORY", w_addr) ;
         var b_value = b_addr & 0x00000003 ;
             b_value = w_value >>> (8 * b_value) ;
             b_value = b_value & 0x000000FF ;
         simcore_native_set_value("CPU", "BR." + reg1, b_value) ;

         simcore_native_go_maddr(0) ;
     }
}

sb reg1 (reg2) {
     co=111111,
     nwords=1,
     reg1 = reg(25,21),
     reg2 = reg(20,16),
     help='MEM[r2] = r1/8',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;

         var b_addr  = simcore_native_get_value("CPU", "BR." + reg2) ;
         var b_value = simcore_native_get_value("CPU", "BR." + reg1) ;
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

sb reg1 val(reg2) {
     co=111111,
     nwords=1,
     reg1 = reg(25,21),
     val  = imm(15,0),
     reg2 = reg(20,16),
     help='MEM[r2+val] = r1/8',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var val    = simcore_native_get_field_from_ir(fields, 1) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 2) ;

         if (val & 0x00008000)
             val = val | 0xFFFF0000 ;

         var b_addr  = simcore_native_get_value("CPU", "BR." + reg2) + val ;
         var b_value = simcore_native_get_value("CPU", "BR." + reg1) ;
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

lw reg1 (reg2) {
     co=111111,
     nwords=1,
     reg1 = reg(25,21),
     reg2 = reg(20,16),
     help='$r1 = (MEM[$r2+3] .. MEM[$r2])',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;

         var addr  = simcore_native_get_value("CPU", "BR." + reg2) ;
         var value = simcore_native_get_value("MEMORY", addr) ;
         simcore_native_set_value("CPU", "BR." + reg1, value) ;

         simcore_native_go_maddr(0) ;
     }
}

lw reg1 val(reg2) {
     co=111111,
     nwords=1,
     reg1 = reg(25,21),
     val  = imm(15,0),
     reg2 = reg(20,16),
     help='$r1 = (MEM[$r2+val+3], MEM[$r2+val+2], MEM[$r2+val+1], MEM[$r2+val])',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var val    = simcore_native_get_field_from_ir(fields, 1) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 2) ;

         if (val & 0x00008000)
             val = val | 0xFFFF0000 ;

         var addr  = simcore_native_get_value("CPU", "BR." + reg2) + val ;
         var value = simcore_native_get_value("MEMORY", addr) ;
         simcore_native_set_value("CPU", "BR." + reg1, value) ;

         simcore_native_go_maddr(0) ;
     }
}

sw reg1 val(reg2) {
     co=111111,
     nwords=1,
     reg1 = reg(25,21),
     val  = imm(15,0),
     reg2 = reg(20,16),
     help='(MEM[$r2+val+3] .. MEM[$r2+val]) = $r1',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var val    = simcore_native_get_field_from_ir(fields, 1) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 2) ;

         if ((val & 0x8000) > 0)
              val = val | 0xFFFF0000 ;

         var addr   = simcore_native_get_value("CPU", "BR." + reg2) + val ;
         var value1 = simcore_native_get_value("CPU", "BR." + reg1) ;
         simcore_native_set_value("MEMORY", addr, value1) ;

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
     val=imm(15,0),
     help='r1 = device_register(val)',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var addr   = simcore_native_get_field_from_ir(fields, 1) ;

         var value = simcore_native_get_value("DEVICE", addr) ;
         simcore_native_set_value("CPU", "BR." + reg1, value) ;

         simcore_native_go_maddr(0) ;
     }
}

out reg val {
     co=111111,
     nwords=1,
     reg=reg(25,21),
     val=imm(15,0),
     help='device_register(val) = r1',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var addr   = simcore_native_get_field_from_ir(fields, 1) ;

         var value = simcore_native_get_value("CPU", "BR." + reg1) ;
         simcore_native_set_value("DEVICE", addr, value) ;

         simcore_native_go_maddr(0) ;
     }
}


#
# b*
#

beq reg1 reg2 offset {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     offset=address(15,0)rel,
     help='if ($r1 == $r2) pc += 4*offset',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var offset = simcore_native_get_field_from_ir(fields, 2) ;

         reg1 = simcore_native_get_value("CPU", "BR." + reg1) ;
         reg2 = simcore_native_get_value("CPU", "BR." + reg2) ;
         if (reg1 == reg2)
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

bne reg1 reg2 offset {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     offset=address(15,0)rel,
     help='if ($r1 != $r2) pc += 4*offset',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var offset = simcore_native_get_field_from_ir(fields, 2) ;

         reg1 = simcore_native_get_value("CPU", "BR." + reg1) ;
         reg2 = simcore_native_get_value("CPU", "BR." + reg2) ;
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

bge reg1 reg2 offset {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     offset=address(15,0)rel,
     help='if ($r1 >= $r2) pc += 4*offset',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var offset = simcore_native_get_field_from_ir(fields, 2) ;

         reg1 = simcore_native_get_value("CPU", "BR." + reg1) ;
         reg2 = simcore_native_get_value("CPU", "BR." + reg2) ;
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

blt reg1 reg2 offset {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     offset=address(15,0)rel,
     help='if ($r1 < $r2) pc += 4*offset',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var offset = simcore_native_get_field_from_ir(fields, 2) ;

         reg1 = simcore_native_get_value("CPU", "BR." + reg1) ;
         reg2 = simcore_native_get_value("CPU", "BR." + reg2) ;
         if (reg1 < reg2)
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

bgt reg1 reg2 offset {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     reg2=reg(20,16),
     offset=address(15,0)rel,
     help='if ($r1 > $r2) pc += 4*offset',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var offset = simcore_native_get_field_from_ir(fields, 2) ;

         reg1 = simcore_native_get_value("CPU", "BR." + reg1) ;
         reg2 = simcore_native_get_value("CPU", "BR." + reg2) ;
         if (reg1 > reg2)
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

ble reg reg offset {
     co=111111,
     nwords=1,
     reg=reg(25,21),
     reg=reg(20,16),
     offset=address(15,0)rel,
     help='if ($r1 <= $r2) pc += 4*offset',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
         var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
         var offset = simcore_native_get_field_from_ir(fields, 2) ;

         reg1 = simcore_native_get_value("CPU", "BR." + reg1) ;
         reg2 = simcore_native_get_value("CPU", "BR." + reg2) ;
         if (reg1 <= reg2)
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
# j*
#

j addr {
     co=111111,
     nwords=1,
     addr=address(15,0)abs,
     help='pc = addr',
     native,
     {
         // fields is a default parameter with the instruction field information
         var address = simcore_native_get_field_from_ir(fields, 0) ;

         simcore_native_set_value("CPU", "REG_PC", address) ;

         simcore_native_go_maddr(0) ;
     }
}

jal addr {
     co=111111,
     nwords=1,
     addr=address(15,0)abs,
     help='$ra = pc; pc = addr',
     native,
     {
         // fields is a default parameter with the instruction field information
         var address = simcore_native_get_field_from_ir(fields, 0) ;

         var pc = simcore_native_get_value("CPU", "REG_PC") ;
         simcore_native_set_value("CPU", "BR.31",  pc) ;
         simcore_native_set_value("CPU", "REG_PC", address) ;

         simcore_native_go_maddr(0) ;
     }
}

jr reg1 {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     help='pc = r1',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1 = simcore_native_get_field_from_ir(fields, 0) ;

         var new_pc = simcore_native_get_value("CPU", "BR." + reg1) ;
         simcore_native_set_value("CPU", "REG_PC", new_pc) ;

         simcore_native_go_maddr(0) ;
     }
}

j reg1 {
     co=111111,
     nwords=1,
     reg1=reg(25,21),
     help='pc = r1',
     native,
     {
         // fields is a default parameter with the instruction field information
         var reg1 = simcore_native_get_field_from_ir(fields, 0) ;

         var new_pc = simcore_native_get_value("CPU", "BR." + reg1) ;
         simcore_native_set_value("CPU", "REG_PC", new_pc) ;

         simcore_native_go_maddr(0) ;
     }
}


#
# Register naming
#

registers
{
      0=($zero, $0),
      1=($at, $1),
      2=($v0, $2),
      3=($v1, $3),
      4=($a0, $4),
      5=($a1, $5),
      6=($a2, $6),
      7=($a3, $7),
      8=($t0, $8),
      9=($t1, $9),
     10=($t2, $10),
     11=($t3, $11),
     12=($t4, $12),
     13=($t5, $13),
     14=($t6, $14),
     15=($t7, $15),
     16=($s0, $16),
     17=($s1, $17),
     18=($s2, $18),
     19=($s3, $19),
     20=($s4, $20),
     21=($s5, $21),
     22=($s6, $22),
     23=($s7, $23),
     24=($t8, $24),
     25=($t9, $25),
     26=($k0, $26),
     27=($k1, $27),
     28=($gp, $28),
     29=($sp, $29) (stack_pointer),
     30=($fp, $30),
     31=($ra, $31)
}

##
## Pseudo-instruction section
##

pseudoinstructions
{
    move reg1=reg reg2=reg
    {
        or reg1 reg2 $zero
    }

    muli reg1=reg reg2=reg inm1=imm
    {
        mul reg1 reg2 inm1
    }

    clear reg1=reg
    {
        or reg1 $zero $zero
    }

    nop
    {
        sll $zero, $zero, 0
    }

    b label=address
    {
        beq $zero, $zero, label
    }

    sw reg1=reg (reg2)=reg
    {
        sw reg1 0(reg2)
    }

}

