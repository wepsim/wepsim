
#
# WepSIM (https://wepsim.github.io/wepsim/)
#


firmware {
   version  = 2,
   rel_mult = 4,
   endian   = little
}

begin 
	native,
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

syscall  {
	nwords=1,
	oc(31:26) = 000001,
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

reti  {
	nwords=1,
	oc(31:26) = 000010,
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

in reg val  {
	nwords=1,
	oc(31:26) = 000011,
	reg(25:21) = reg,
	imm(15:0) = val,
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

out reg val  {
	nwords=1,
	oc(31:26) = 000100,
	reg(25:21) = reg,
	imm(15:0) = val,
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

ld r1 r2  {
	nwords=1,
	oc(31:26) = 001000,
	reg(25:21) = r1,
	reg(20:16) = r2,
	native,
	{
       // fields is a default parameter with the instruction field information
       var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
       var reg2 = simcore_native_get_field_from_ir(fields, 1) ;

       var val1 = simcore_native_get_value("CPU", "BR." + reg2) ;
       simcore_native_set_value("CPU", "BR." + reg1, val1) ;

       simcore_native_go_maddr(0) ;
   
	}
}

ldi r1 u16  {
	nwords=1,
	oc(31:26) = 001001,
	reg(25:21) = r1,
	imm(15:0) = u16,
	native,
	{
       // fields is a default parameter with the instruction field information
       var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
       var u16  = simcore_native_get_field_from_ir(fields, 1) ;

       simcore_native_set_value("CPU", "BR." + reg1, u16) ;

       simcore_native_go_maddr(0) ;
   
	}
}

ld r1 r2  {
	nwords=1,
	oc(31:26) = 001010,
	reg(25:21) = r1,
	reg(20:16) = r2,
	native,
	{
       // fields is a default parameter with the instruction field information
       var r1 = simcore_native_get_field_from_ir(fields, 0) ;
       var r2 = simcore_native_get_field_from_ir(fields, 1) ;

       var addr   = simcore_native_get_value("CPU", "BR." + r2) ;
       var value  = simcore_native_get_value("MEMORY", addr) ;
       simcore_native_set_value("CPU", "BR." + r1, value) ;

       simcore_native_go_maddr(0) ;
   
	}
}

add_a reg1  {
	nwords=1,
	oc(31:26) = 001011,
	reg(25:21) = reg1,
	native,
	{
       // fields is a default parameter with the instruction field information
       var reg1   = simcore_native_get_field_from_ir(fields, 0) ;

       var result = simcore_native_get_value("CPU", "BR.4") + simcore_native_get_value("CPU", "BR." + reg1) ;
       simcore_native_set_value("CPU", "BR.4", result) ;

       var flags = 0 ;
       if (result == 0) flags = flags | 0x10000000 ;
       if (result <  0) flags = flags | 0x20000000 ;
       simcore_native_set_value("CPU", "REG_SR", flags) ;

       simcore_native_go_maddr(0) ;
   
	}
}

addi_a s16  {
	nwords=1,
	oc(31:26) = 001100,
	imm(15:0) = s16,
	native,
	{
       // fields is a default parameter with the instruction field information
       var s16   = simcore_native_get_field_from_ir(fields, 0) ;

       if (s16 & 0x00008000)
           s16 = s16 | 0xFFFF0000 ;
       var result = simcore_native_get_value("CPU", "BR.4") + s16 ;
       simcore_native_set_value("CPU", "BR.4", result) ;

       var flags = 0 ;
       if (result == 0) flags = flags | 0x10000000 ;
       if (result <  0) flags = flags | 0x20000000 ;
       simcore_native_set_value("CPU", "REG_SR", flags) ;

       simcore_native_go_maddr(0) ;
   
	}
}

inc reg1  {
	nwords=1,
	oc(31:26) = 001101,
	reg(25:21) = reg1,
	native,
	{
       // fields is a default parameter with the instruction field information
       var reg1   = simcore_native_get_field_from_ir(fields, 0) ;

       var result = simcore_native_get_value("CPU", "BR." + reg1) + 1 ;
       simcore_native_set_value("CPU", "BR." + reg1, result) ;

       var flags = 0 ;
       if (result == 0) flags = flags | 0x10000000 ;
       if (result <  0) flags = flags | 0x20000000 ;
       simcore_native_set_value("CPU", "REG_SR", flags) ;
       
       simcore_native_go_maddr(0) ;
   
	}
}

dec reg1  {
	nwords=1,
	oc(31:26) = 001110,
	reg(25:21) = reg1,
	native,
	{
       // fields is a default parameter with the instruction field information
       var reg1   = simcore_native_get_field_from_ir(fields, 0) ;

       var result = simcore_native_get_value("CPU", "BR." + reg1) - 1 ;
       simcore_native_set_value("CPU", "BR." + reg1, result) ;

       var flags = 0 ;
       if (result == 0) flags = flags | 0x10000000 ;
       if (result <  0) flags = flags | 0x20000000 ;
       simcore_native_set_value("CPU", "REG_SR", flags) ;

       simcore_native_go_maddr(0) ;
   
	}
}

jp s16  {
	nwords=1,
	oc(31:26) = 001111,
	address-rel(15:0) = s16,
	native,
	{
       // fields is a default parameter with the instruction field information
       var s16 = simcore_native_get_field_from_ir(fields, 0) ;
       if (s16 & 0x00008000) {
           s16 = s16 | 0xFFFF0000 ;
       }

       var pc = simcore_native_get_value("CPU", "REG_PC") ;
       simcore_native_set_value("CPU", "REG_PC", pc + 4*s16) ;

       simcore_native_go_maddr(0) ;
   
	}
}

jpz s16  {
	nwords=1,
	oc(31:26) = 010000,
	address-rel(15:0) = s16,
	native,
	{
       // fields is a default parameter with the instruction field information
       var s16   = simcore_native_get_field_from_ir(fields, 0) ;
       if (s16 & 0x00008000) {
           s16 = s16 | 0xFFFF0000 ;
       }

       var flags = simcore_native_get_value("CPU", "REG_SR") ;
       if (flags & 0x10000000) {
           var pc = simcore_native_get_value("CPU", "REG_PC") ;
           simcore_native_set_value("CPU", "REG_PC", pc + 4*s16) ;
       }

       simcore_native_go_maddr(0) ;
   
	}
}

call u16  {
	nwords=1,
	oc(31:26) = 010001,
	imm(15:0) = u16,
	native,
	{
       // fields is a default parameter with the instruction field information
       var u16   = simcore_native_get_field_from_ir(fields, 0) ;

       var value  = simcore_native_get_value("CPU", "REG_PC") ;
       var reg_sp = simcore_native_get_value("CPU", "BR.29") ;
       reg_sp = reg_sp - 4 ;
       simcore_native_set_value("CPU", "BR.29", reg_sp) ;
       simcore_native_set_value("MEMORY", reg_sp,   value) ;
       simcore_native_set_value("CPU", "REG_PC", u16) ;

       simcore_native_go_maddr(0) ;
   
	}
}

ret  {
	nwords=1,
	oc(31:26) = 010010,
	native,
	{
       var reg_sp = simcore_native_get_value("CPU", "BR.29") ;
       var value  = simcore_native_get_value("MEMORY", reg_sp) ;
       simcore_native_set_value("CPU", "REG_PC", value) ;
       reg_sp = reg_sp + 4 ;
       simcore_native_set_value("CPU", "BR.29", reg_sp) ;

       simcore_native_go_maddr(0) ;
   
	}
}

halt  {
	nwords=1,
	oc(31:26) = 010011,
	native,
	{
       simcore_native_set_value("CPU", "REG_PC", 0) ;

       simcore_native_go_maddr(0) ;
   
	}
}

push r1  {
	nwords=1,
	oc(31:26) = 010100,
	reg(25:21) = r1,
	native,
	{
       // fields is a default parameter with the instruction field information
       var reg1 = simcore_native_get_field_from_ir(fields, 0) ;

       var value  = simcore_native_get_value("CPU", "BR." + reg1) ;
       var reg_sp = simcore_native_get_value("CPU", "BR.29") ;
       reg_sp = reg_sp - 4 ;
       simcore_native_set_value("MEMORY", reg_sp, value) ;
       simcore_native_set_value("CPU", "BR.29", reg_sp) ;

       simcore_native_go_maddr(0) ;
   
	}
}

pop r1  {
	nwords=1,
	oc(31:26) = 010101,
	reg(25:21) = r1,
	native,
	{
       // fields is a default parameter with the instruction field information
       var reg1 = simcore_native_get_field_from_ir(fields, 0) ;

       var reg_sp = simcore_native_get_value("CPU", "BR.29") ;
       var value  = simcore_native_get_value("MEMORY", reg_sp) ;
       reg_sp = reg_sp + 4 ;
       simcore_native_set_value("CPU", "BR." + reg1, value) ;
       simcore_native_set_value("CPU", "BR.29", reg_sp) ;

       simcore_native_go_maddr(0) ;
   
	}
}

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
