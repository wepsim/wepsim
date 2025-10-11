
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

begin,
native
{
      // R0 <- 0
      simcore_native_set_value("CPU", "BR.0", 0) ;

      // check if INT
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
            var reg_sp = simcore_native_get_value("CPU", "BR.2") ;
            reg_sp = reg_sp - 4 ;
            simcore_native_set_value("MEMORY", reg_sp, value) ;
            simcore_native_set_value("CPU", "BR.2", reg_sp) ;

            // push SR
            value  = simcore_native_get_value("CPU", "REG_SR") ;
            reg_sp = simcore_native_get_value("CPU", "BR.2") ;
            reg_sp = reg_sp - 4 ;
            simcore_native_set_value("MEMORY", reg_sp, value) ;
            simcore_native_set_value("CPU", "BR.2", reg_sp) ;

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

ecall {
            co=111111,
            nwords=1,
            help='system call',
            native,
            {
                  simcore_native_set_value("CPU", "REG_RT1", 2) ;

                  // push PC
                  var value  = simcore_native_get_value("CPU", "REG_PC") ;
                  var reg_sp = simcore_native_get_value("CPU", "BR.2") ;
                  reg_sp = reg_sp - 4 ;
                  simcore_native_set_value("MEMORY", reg_sp, value) ;
                  simcore_native_set_value("CPU", "BR.2", reg_sp) ;

                  // push SR
                  value  = simcore_native_get_value("CPU", "REG_SR") ;
                  reg_sp = simcore_native_get_value("CPU", "BR.2") ;
                  reg_sp = reg_sp - 4 ;
                  simcore_native_set_value("MEMORY", reg_sp, value) ;
                  simcore_native_set_value("CPU", "BR.2", reg_sp) ;

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

sret {
            co=111111,
            nwords=1,
            help='return from event (interruption, exception, syscall)',
            native,
            {
                // pop SR
                var reg_sp = simcore_native_get_value("CPU", "BR.2") ;
                var value  = simcore_native_get_value("MEMORY", reg_sp) ;
                reg_sp = reg_sp + 4 ;
                simcore_native_set_value("CPU", "REG_SR", value) ;
                simcore_native_set_value("CPU", "BR.2", reg_sp) ;

                // pop PC
                var reg_sp = simcore_native_get_value("CPU", "BR.2") ;
                var value  = simcore_native_get_value("MEMORY", reg_sp) ;
                reg_sp = reg_sp + 4 ;
                simcore_native_set_value("CPU", "REG_PC", value) ;
                simcore_native_set_value("CPU", "BR.2", reg_sp) ;

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
            help='reg = device_registers[val]',
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
            help='device_register[val] = reg',
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
# Related to power consumption
#

# RDCYCLE rd      Load clock cycles     rd ← ux(clock_cycles_acc)
rdcycle reg1  {
      co=111111,
      nwords=1,
      reg1=reg(25,21),
      help='reg1 = load accumulated clock cycles',
      {
           (MH=0, T12=1, SELC=10101, LC=1, A0=1, B=1, C=0)
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
            inm=imm(19,0),
            help='rd = (inm << 12)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var val1   = simcore_native_get_field_from_ir(fields, 1) ;

                val1 = val1 << 12 ;
                simcore_native_set_value("CPU", "BR." + reg1, val1) ;

                simcore_native_go_maddr(0) ;
            }
}

#  AUIPC rd,offset         Add Upper Immediate to PC         rd ← pc + (offset << 12)
auipc rd offset {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=imm(19,0),
            help='rd = pc + (offset << 12)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var val1   = simcore_native_get_field_from_ir(fields, 1) ;

                val1 = val1 << 12 ;
                var reg_pc = simcore_native_get_value("CPU", "REG_PC") ;
                simcore_native_set_value("CPU", "BR." + reg1, reg_pc + val1 - 4) ;

                simcore_native_go_maddr(0) ;
            }
}

#  JAL rd,offset         Jump and Link                                 rd ← pc + length(inst)
#                                                               pc ← pc + offset
jal rd offset {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=address(19,0)rel,
            help='rd = pc; pc = pc + 4*sext(offset)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd     = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;

                if ((offset & 0x8000) > 0) {
                     offset = offset | 0xFFFF0000 ;
                }

                var pc = simcore_native_get_value("CPU", "REG_PC") ;
                simcore_native_set_value("CPU", "BR." + rd, pc) ;
                simcore_native_set_value("CPU", "REG_PC", pc + 4*offset) ;

                simcore_native_go_maddr(0) ;
            }
}


#  JALR rd,rs1,offset         Jump and Link Register        rd ← pc + length(inst)
#                                                           pc ← (rs1 + offset) & -2
jalr rd rs1 offset {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            offset=address(15,0)rel,
            help='rd = pc; pc = rs1 + 4*offset',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd     = simcore_native_get_field_from_ir(fields, 0) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 1) ;
                var offset = simcore_native_get_field_from_ir(fields, 2) ;

                if ((offset & 0x8000) > 0) {
                     offset = offset | 0xFFFF0000 ;
                }

                var     pc = simcore_native_get_value("CPU", "REG_PC") ;
                var new_pc = simcore_native_get_value("CPU", "BR." + rs1) + 4*offset ;
                if (0 != rd) {
                    simcore_native_set_value("CPU", "BR." + rd, pc) ;
                }
                simcore_native_set_value("CPU", "REG_PC", new_pc & 0xFFFFFFFE) ;

                simcore_native_go_maddr(0) ;
            }
}

#  BEQ rs1,rs2,offset         Branch Equal                         if rs1 = rs2 then pc ← pc + offset
beq rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (rs1 == rs2) pc += 4*offset',
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

#  BNE rs1,rs2,offset         Branch Not Equal                         if rs1 ≠ rs2 then pc ← pc + offset
bne rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (rs1 != rs2) pc += 4*offset',
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

#  BLT rs1,rs2,offset         Branch Less Than                         if rs1 < rs2 then pc ← pc + offset
blt rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (rs1 < rs2) pc += 4*offset',
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

#  BGE rs1,rs2,offset         Branch Greater than Equal                 if rs1 ≥ rs2 then pc ← pc + offset
bge rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (rs1 >= rs2) pc += 4*offset',
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

#  BLTU rs1,rs2,offset         Branch Less Than Unsigned                 if rs1 < rs2 then pc ← pc + offset
bltu rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (rs1 < rs2) pc += 4*offset',
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

#  BGEU rs1,rs2,offset         Branch Greater than Equal Unsigned         if rs1 ≥ rs2 then pc ← pc + offset
bgeu rs1 rs2 offset {
            co=111111,
            nwords=1,
            rs1=reg(25,21),
            rs2=reg(20,16),
            offset=address(15,0)rel,
            help='if (rs1 >= rs2) pc += 4*offset',
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

#  LB rd,offset(rs1)         Load Byte                                 rd ← s8[rs1 + offset]
lb rd offset(rs1) {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=imm(15,0),
            rs1=reg(20,16),
            help='rd = MEM[rs1 + offset]',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd     = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 2) ;

                if (offset & 0x00008000)
                    offset = offset | 0xFFFF0000 ;

                var b_addr = simcore_native_get_value("CPU", "BR." + rs1) + offset ;
                var w_addr = b_addr & 0xFFFFFFFC ;
                var w_value = simcore_native_get_value("MEMORY", w_addr) ;
                var  b_value = b_addr & 0x00000003 ;
                     b_value = w_value >>> (8 * b_value) ;
                // sign-extension
                if  (b_value & 0x00000080)
                     b_value = b_value | 0xFFFFFF00 ;
                else b_value = b_value & 0x000000FF ;
                // load value into the register file
                simcore_native_set_value("CPU", "BR." + rd, b_value) ;

                simcore_native_go_maddr(0) ;
            }
}

#  LH rd,offset(rs1)         Load Half                                 rd ← s16[rs1 + offset]
lh rd offset(rs1) {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=imm(15,0),
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

                var b_addr  = simcore_native_get_value("CPU", "BR." + rs1) + offset ;
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
                simcore_native_set_value("CPU", "BR." + rd, b_value) ;

                simcore_native_go_maddr(0) ;
            }
}

#  LW rd,offset(rs1)         Load Word                                 rd ← s32[rs1 + offset]
lw rd offset(rs1) {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=imm(15,0),
            rs1=reg(20,16),
            help='rd = (MEM[rs1+offset+3] .. MEM[rs1+offset])',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd     = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 2) ;

                if (offset & 0x00008000)
                    offset = offset | 0xFFFF0000 ;

                var addr   = simcore_native_get_value("CPU", "BR." + rs1) + offset ;
                var value  = simcore_native_get_value("MEMORY", addr) ;
                simcore_native_set_value("CPU", "BR." + rd, value) ;

                simcore_native_go_maddr(0) ;
            }
}

#  LBU rd,offset(rs1)         Load Byte Unsigned                         rd ← u8[rs1 + offset]
lbu rd offset(rs1) {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=imm(15,0),
            rs1=reg(20,16),
            help='rd = MEM[rs1 + offset]',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd     = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 2) ;

                if (offset & 0x00008000)
                    offset = offset | 0xFFFF0000 ;

                var b_addr = simcore_native_get_value("CPU", "BR." + rs1) + offset ;
                var w_addr = b_addr & 0xFFFFFFFC ;
                var w_value = simcore_native_get_value("MEMORY", w_addr) ;
                var  b_value = b_addr & 0x00000003 ;
                     b_value = w_value >>> (8 * b_value) ;
                // unsigned
                b_value = b_value & 0x000000FF ;
                // load value into the register file
                simcore_native_set_value("CPU", "BR." + rd, b_value) ;

                simcore_native_go_maddr(0) ;
            }
}

#  LHU rd,offset(rs1)         Load Half Unsigned                         rd ← u16[rs1 + offset]
lhu rd offset(rs1) {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            offset=imm(15,0),
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

                var b_addr  = simcore_native_get_value("CPU", "BR." + rs1) + offset ;
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
                simcore_native_set_value("CPU", "BR." + rd, b_value) ;

                simcore_native_go_maddr(0) ;
            }
}

#  SB rs2,offset(rs1)         Store Byte                                 u8[rs1 + offset] ← rs2
sb rs2 offset(rs1) {
            co=111111,
            nwords=1,
            rs2=reg(25,21),
            offset=imm(15,0),
            rs1=reg(20,16),
            help='MEM[rs1 + offset] = rs2/8',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rs2    = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 2) ;

                if (offset & 0x00008000)
                    offset = offset | 0xFFFF0000 ;

                var b_addr  = simcore_native_get_value("CPU", "BR." + rs1) + offset ;
                var b_value = simcore_native_get_value("CPU", "BR." + rs2) ;
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

#  SH rs2,offset(rs1)         Store Half                                 u16[rs1 + offset] ← rs2
sh rs2 offset(rs1) {
            co=111111,
            nwords=1,
            rs2=reg(25,21),
            offset=imm(15,0),
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

                var b_addr  = simcore_native_get_value("CPU", "BR." + rs1) + offset ;
                var b_value = simcore_native_get_value("CPU", "BR." + rs2) ;

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
            val  = imm(15,0),
            reg2 = reg(20,16),
            help='MEM[rs1+offset+3 .. rs1+offset] = rs2',
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

#  SBU rs2,offset(rs1)         Store Byte Unsigned                        u8[rs1 + offset] ← rs2
sbu rs2 offset(rs1) {
            co=111111,
            nwords=1,
            rs2=reg(25,21),
            offset=imm(15,0),
            rs1=reg(20,16),
            help='MEM[rs1 + offset] = ux(rs2/8)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rs2    = simcore_native_get_field_from_ir(fields, 0) ;
                var offset = simcore_native_get_field_from_ir(fields, 1) ;
                var rs1    = simcore_native_get_field_from_ir(fields, 2) ;

                if (offset & 0x00008000)
                    offset = offset | 0xFFFF0000 ;

                var b_addr  = simcore_native_get_value("CPU", "BR." + rs1) + offset ;
                var b_value = simcore_native_get_value("CPU", "BR." + rs2) ;
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
            offset=imm(15,0),
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

                var b_addr  = simcore_native_get_value("CPU", "BR." + rs1) + offset ;
                var b_value = simcore_native_get_value("CPU", "BR." + rs2) ;

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
                w_addr  = (b_addr + 1) & 0xFFFFFFFC ;
                w_value = simcore_native_get_value("MEMORY", w_addr) ;
                b_off   = b_addr & 0x00000003 ;
                if (3 == b_off) w_value = (w_value & 0x00FFFFFF) | (value_1 << 24) ;
                if (2 == b_off) w_value = (w_value & 0xFF00FFFF) | (value_1 << 16) ;
                if (1 == b_off) w_value = (w_value & 0xFFFF00FF) | (value_1 <<  8) ;
                if (0 == b_off) w_value = (w_value & 0xFFFFFF00) | (value_1) ;
                simcore_native_set_value("MEMORY", w_addr, w_value) ;

                simcore_native_go_maddr(0) ;
            }
}

#  ADDI rd,rs1,imm         Add Immediate                                 rd ← rs1 + sx(imm)
addi rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=imm(11,0),
            help='rd = rs1 + SignEx(inm)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var val    = simcore_native_get_field_from_ir(fields, 2) ;

                if (val & 0x00000800)
                    val = val | 0xFFFFF000 ;

                var result = simcore_native_get_value("CPU", "BR." + reg2) + val ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

                var flags = 0 ;
                if (result == 0) flags = flags | 0x10000000 ;
                if (result <  0) flags = flags | 0x20000000 ;
                simcore_native_set_value("CPU", "REG_SR", flags) ;

                simcore_native_go_maddr(0) ;
            }
}

#  ADDU rd,rs1,imm         Add Unsigned                                 rd ← rs1 + ux(imm)
addu rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=imm(11,0),
            help='rd = rs1 + UnsignEx(inm)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var val    = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("CPU", "BR." + reg2) + val ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

                var flags = 0 ;
                if (result == 0) flags = flags | 0x10000000 ;
                if (result <  0) flags = flags | 0x20000000 ;
                simcore_native_set_value("CPU", "REG_SR", flags) ;

                simcore_native_go_maddr(0) ;
            }
}

#  SLTI rd,rs1,imm         Set Less Than Immediate                 rd ← sx(rs1) < sx(imm)
slti rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=imm(15,0),
            help='rd = (rs1 < inm) ? 1 : 0',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd   = simcore_native_get_field_from_ir(fields, 0) ;
                var rs1  = simcore_native_get_field_from_ir(fields, 1) ;
                var inm1 = simcore_native_get_field_from_ir(fields, 2) ;

                if (inm1 & 0x00008000)
                    inm1 = inm1 | 0xFFFF0000 ;

                var reg1 = simcore_native_get_value("CPU", "BR." + rs1) ;
                           simcore_native_set_value("CPU", "BR." + rd, (reg1 < inm1)) ;

                simcore_native_go_maddr(0) ;
            }
}

#  SLTIU rd,rs1,imm         Set Less Than Immediate Unsigned         rd ← ux(rs1) < ux(imm)
sltiu rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=imm(15,0),
            help='rd = (ux(rs1) < ux(inm)) ? 1 : 0',
            native,
            {
                // fields is a default parameter with the instruction field information
                var rd   = simcore_native_get_field_from_ir(fields, 0) ;
                var rs1  = simcore_native_get_field_from_ir(fields, 1) ;
                var inm1 = simcore_native_get_field_from_ir(fields, 2) ;

                var reg1 = simcore_native_get_value("CPU", "BR." + rs1) ;
                           simcore_native_set_value("CPU", "BR." + rd, (Math.abs(reg1) < Math.abs(inm1))) ;

                simcore_native_go_maddr(0) ;
            }
}

#  XORI rd,rs1,imm         Xor Immediate                                 rd ← ux(rs1) ⊕ ux(imm)
xori rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=imm(15,0),
            help='rd = ux(rs1) ^ ux(inm)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var val    = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("CPU", "BR." + reg2) ^ val ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

                simcore_native_go_maddr(0) ;
            }
}

#  ORI rd,rs1,imm         Or Immediate                                 rd ← ux(rs1) ∨ ux(imm)
ori rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=imm(15,0),
            help='rd = rs1 | inm',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var val    = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("CPU", "BR." + reg2) | val ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

                simcore_native_go_maddr(0) ;
            }
}

#  ANDI rd,rs1,imm         And Immediate                                 rd ← ux(rs1) ∧ ux(imm)
andi rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=imm(15,0),
            help='rd = rs1 + inm',
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

#  SLLI rd,rs1,imm         Shift Left Logical Immediate                 rd ← ux(rs1) « ux(imm)
slli rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=imm(5,0),
            help='rd = rs1 <<< inm',
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


#  SRLI rd,rs1,imm         Shift Right Logical Immediate                 rd ← ux(rs1) » ux(imm)
srli rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=imm(5,0),
            help='rd = rs1 >>> inm',
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

#  SRAI rd,rs1,imm         Shift Right Arithmetic Immediate         rd ← sx(rs1) » ux(imm)
srai rd rs1 inm {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            inm=imm(15,0),
            help='rd = rs1 >> inm',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
                var inm1 = simcore_native_get_field_from_ir(fields, 2) ;

                var val1 = simcore_native_get_value("CPU", "BR." + reg2) ;
                simcore_native_set_value("CPU", "BR." + reg1, val1 >> inm1) ;

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
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3 = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("CPU", "BR." + reg2) + simcore_native_get_value("CPU", "BR." + reg3) ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

                simcore_native_go_maddr(0) ;
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
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3 = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("CPU", "BR." + reg2) - simcore_native_get_value("CPU", "BR." + reg3) ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

                simcore_native_go_maddr(0) ;
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
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3 = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("CPU", "BR." + reg2) << simcore_native_get_value("CPU", "BR." + reg3) ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

                simcore_native_go_maddr(0) ;
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

                var reg1 = simcore_native_get_value("CPU", "BR." + rs1) ;
                var reg2 = simcore_native_get_value("CPU", "BR." + rs2) ;
                           simcore_native_set_value("CPU", "BR." + rd, (reg1 < reg2)) ;

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

                var reg1 = simcore_native_get_value("CPU", "BR." + rs1) ;
                var reg2 = simcore_native_get_value("CPU", "BR." + rs2) ;
                           simcore_native_set_value("CPU", "BR." + rd, (Math.abs(reg1) < Math.abs(reg2))) ;

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

                var result = simcore_native_get_value("CPU", "BR." + reg2) ^ simcore_native_get_value("CPU", "BR." + reg3) ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

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
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("CPU", "BR." + reg2) >> simcore_native_get_value("CPU", "BR." + reg3) ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

                simcore_native_go_maddr(0) ;
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

                var val1 = simcore_native_get_value("CPU", "BR." + reg2) ;
                var val2 = simcore_native_get_value("CPU", "BR." + reg3) ;
                simcore_native_set_value("CPU", "BR." + reg1, val1 >> val2) ;

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

#  AND rd,rs1,rs2         And                                         rd ← ux(rs1) ∧ ux(rs2)
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

#  FENCE pred,succ         Fence        
fence pred succ {
            co=111111,
            nwords=1,
            pred=imm(25,21),
            succ=imm(15,0),
            native,
            {
                simcore_native_go_maddr(0) ;
            }
}

#  FENCE.I                 Fence Instruction        
fence.i {
            co=111111,
            nwords=1,
            native,
            {
                simcore_native_go_maddr(0) ;
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

# MULH rd,rs1,rs2         Multiply High Signed Signed         rd ← (sx(rs1) × sx(rs2)) » xlen
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

                var op1 = simcore_native_get_value("CPU", "BR." + reg2) ;
                var op2 = simcore_native_get_value("CPU", "BR." + reg3) ;
                var result = (op1 * op2) >> 32 ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

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

                var op1 = simcore_native_get_value("CPU", "BR." + reg2) ;
                var op2 = simcore_native_get_value("CPU", "BR." + reg3) >>> 0 ;
                var result = (op1 * op2) >> 32 ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

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

                var op1 = simcore_native_get_value("CPU", "BR." + reg2) >>> 0 ;
                var op2 = simcore_native_get_value("CPU", "BR." + reg3) >>> 0 ;
                var result = (op1 * op2) >> 32 ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

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
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1 = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2 = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3 = simcore_native_get_field_from_ir(fields, 2) ;

                if (simcore_native_get_value("CPU", "BR." + reg3) != 0)
                {
                    var val1 = simcore_native_get_value("CPU", "BR." + reg2) ;
                    var val2 = simcore_native_get_value("CPU", "BR." + reg3) ;
                    simcore_native_set_value("CPU", "BR." + reg1, val1 / val2) ;
                    simcore_native_go_maddr(0) ;
                    return ;
                }

                simcore_native_set_value("CPU", "REG_RT1", 1) ;

                // push PC
                var value  = simcore_native_get_value("CPU", "REG_PC") ;
                var reg_sp = simcore_native_get_value("CPU", "BR.2") ;
                reg_sp = reg_sp - 4 ;
                simcore_native_set_value("MEMORY", reg_sp, value) ;
                simcore_native_set_value("CPU", "BR.2", reg_sp) ;

                // push SR
                value  = simcore_native_get_value("CPU", "REG_SR") ;
                reg_sp = simcore_native_get_value("CPU", "BR.2") ;
                reg_sp = reg_sp - 4 ;
                simcore_native_set_value("MEMORY", reg_sp, value) ;
                simcore_native_set_value("CPU", "BR.2", reg_sp) ;

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

                if (simcore_native_get_value("CPU", "BR." + reg3) != 0)
                {
                    var val1 = simcore_native_get_value("CPU", "BR." + reg2) ;
                    var val2 = simcore_native_get_value("CPU", "BR." + reg3) ;
                    simcore_native_set_value("CPU", "BR." + reg1, Math.abs(val1) / Math.abs(val2)) ;
                    simcore_native_go_maddr(0) ;
                    return ;
                }

                simcore_native_set_value("CPU", "REG_RT1", 1) ;

                // push PC
                var value  = simcore_native_get_value("CPU", "REG_PC") ;
                var reg_sp = simcore_native_get_value("CPU", "BR.2") ;
                reg_sp = reg_sp - 4 ;
                simcore_native_set_value("MEMORY", reg_sp, value) ;
                simcore_native_set_value("CPU", "BR.2", reg_sp) ;

                // push SR
                value  = simcore_native_get_value("CPU", "REG_SR") ;
                reg_sp = simcore_native_get_value("CPU", "BR.2") ;
                reg_sp = reg_sp - 4 ;
                simcore_native_set_value("MEMORY", reg_sp, value) ;
                simcore_native_set_value("CPU", "BR.2", reg_sp) ;

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
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

                var val1 = simcore_native_get_value("CPU", "BR." + reg2) ;
                var val2 = simcore_native_get_value("CPU", "BR." + reg3) ;
                simcore_native_set_value("CPU", "BR." + reg1, val1 % val2) ;

                simcore_native_go_maddr(0) ;
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

                var val1 = simcore_native_get_value("CPU", "BR." + reg2) ;
                var val2 = simcore_native_get_value("CPU", "BR." + reg3) ;
                simcore_native_set_value("CPU", "BR." + reg1, Math.abs(val1) % Math.abs(val2)) ;

                simcore_native_go_maddr(0) ;
            }
}


#
# RV32B
#

# MIN rd,rs1,rs2         Minimum                         rd ← min( ux(rs1) , ux(rs2) )
min rd rs1 rs2 {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
            help='rd = min(ux(rs1), ux(rs2))',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

                var val1 = simcore_native_get_value("CPU", "BR." + reg2) ;
                var val2 = simcore_native_get_value("CPU", "BR." + reg3) ;

                if (val1 < val2)
                     simcore_native_set_value("CPU", "BR." + reg1, val1) ;
                else simcore_native_set_value("CPU", "BR." + reg1, val2) ;

                simcore_native_go_maddr(0) ;
            }
}

# MAX rd,rs1,rs2         Maximum                         rd ← max( ux(rs1) , ux(rs2) )
max rd rs1 rs2 {
            co=111111,
            nwords=1,
            rd=reg(25,21),
            rs1=reg(20,16),
            rs2=reg(15,11),
            help='rd = max(ux(rs1), ux(rs2))',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

                var val1 = simcore_native_get_value("CPU", "BR." + reg2) ;
                var val2 = simcore_native_get_value("CPU", "BR." + reg3) ;

                if (val1 > val2)
                     simcore_native_set_value("CPU", "BR." + reg1, val1) ;
                else simcore_native_set_value("CPU", "BR." + reg1, val2) ;

                simcore_native_go_maddr(0) ;
            }
}

#  ANDN rd,rs1,rs2         And with rs2 inverted                         rd ← ux(rs1) ∧ ~ux(rs2)
andn reg1 reg2 reg3 {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            help='reg1 = ux(rs1) & ~ux(rs2)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("CPU", "BR." + reg2) & ~simcore_native_get_value("CPU", "BR." + reg3) ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

                simcore_native_go_maddr(0) ;
            }
}

#  ORN rd,rs1,rs2         Or with rs2 inverted                         rd ← ux(rs1) v ~ux(rs2)
orn reg1 reg2 reg3 {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            help='reg1 = ux(rs1) | ~ux(rs2)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("CPU", "BR." + reg2) | ~simcore_native_get_value("CPU", "BR." + reg3) ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

                simcore_native_go_maddr(0) ;
            }
}

#  xnor rd,rs1,rs2         Xnor with rs2 inverted                         rd ← ux(rs1) xor ~ux(rs2)
xnor reg1 reg2 reg3 {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            help='reg1 = ux(rs1) xor ~ux(rs2)',
            native,
            {
                // fields is a default parameter with the instruction field information
                var reg1   = simcore_native_get_field_from_ir(fields, 0) ;
                var reg2   = simcore_native_get_field_from_ir(fields, 1) ;
                var reg3   = simcore_native_get_field_from_ir(fields, 2) ;

                var result = simcore_native_get_value("CPU", "BR." + reg2) ^ ~simcore_native_get_value("CPU", "BR." + reg3) ;
                simcore_native_set_value("CPU", "BR." + reg1, result) ;

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
        0=(zero, x0),
        1=(ra, x1),
        2=(sp, x2) (stack_pointer),
        3=(gp, x3),
        4=(tp, x4),
        5=(t0, x5),
        6=(t1, x6),
        7=(t2, x7),
        8=(s0,  x8),
        9=(s1,  x9),
        10=(a0, x10),
        11=(a1, x11),
        12=(a2, x12),
        13=(a3, x13),
        14=(a4, x14),
        15=(a5, x15),
        16=(a6, x16),
        17=(a7, x17),
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
        28=(t3, x28),
        29=(t4, x29),
        30=(t5, x30),
        31=(t6, x31)
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
    li rd=reg, expression=imm
    {
        addi rd x0 expression
    }

    li rd=reg, expression=imm
    {
        lui  rd,     sel(31,12,expression)
        addu rd, rd, sel(11,0,expression)
    }

    # la rd, label        (several expansions)        Load address
    la rd=reg, label=imm
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
    beqz rs=reg, offset=imm
    {
        beq rs, zero, offset
    }

    # bnez rs1, offset        bne rs, x0, offset        Branch if ≠ zero
    bnez rs=reg, offset=imm
    {
        bne rs, zero, offset
    }

    # blez rs1, offset        bge x0, rs, offset        Branch if ≤ zero
    blez rs=reg, offset=imm
    {
        bge zero, rs, offset
    }

    # bgez rs1, offset        bge rs, x0, offset        Branch if ≥ zero
    bgez rs=reg, offset=imm
    {
        bge rs, zero, offset
    }

    # bltz rs1, offset        blt rs, x0, offset        Branch if < zero
    bltz rs=reg, offset=imm
    {
        blt rs, zero, offset
    }

    # bgtz rs1, offset        blt x0, rs, offset        Branch if > zero
    bgtz rs=reg, offset=imm
    {
        blt zero, rs, offset
    }

    # bgt rs, rt, offset        blt rt, rs, offset        Branch if >
    bgt rs=reg, rt=reg, offset=imm
    {
        blt rt, rs, offset
    }

    # ble rs, rt, offset        bge rt, rs, offset        Branch if ≤
    ble rs=reg, rt=reg, offset=imm
    {
        bge rt, rs, offset
    }

    # bgtu rs, rt, offset        bltu rt, rs, offset        Branch if >, unsigned
    bgtu rs=reg, rt=reg, offset=imm
    {
        bltu rt, rs, offset
    }

    # bleu rs, rt, offset        bltu rt, rs, offset        Branch if ≤, unsigned
    bleu rs=reg, rt=reg, offset=imm
    {
        bgeu rt, rs, offset
    }

    # j offset        jal x0, offset        Jump
    j offset=imm
    {
        jal zero, offset
    }

    # jal offset        jal x1, offset        Jump register
    #jal offset=imm
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

