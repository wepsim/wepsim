
#
# WepSIM (https://wepsim.github.io/wepsim/)
#

begin
{

 fetch:   # IR <- MP[PC]
          (IMR),
          # Decode, PC <- PC + 4
          (AluOp=1010, M3=01, M4, PCWrite, IRWrite),
          # Control Unit signal
          (CU=10)

}

#  ADDI rd,rs1,imm         Add Immediate                         rd ← rs1 + sx(imm)
addi rd rs1 inm {
      co=111111,
      nwords=1,
      rd=reg(11,7),
      rs1=reg(19,15),
      inm=inm(24,20),
      help='rd = rs1 + SignEx(inm)',
      {
          (RW),
          (M2, M3=10, AluOp=1010, WOUT,CU=11)
      }
}

#  SUBI rd,rs1,imm         Sub Immediate                         rd ← rs1 - sx(imm)
subi rd rs1 inm {
      co=111111,
      nwords=1,
      rd=reg(25,21),
      rs1=reg(20,16),
      inm=inm(11,0),
      help='rd = rs1 + SignEx(inm)',
      {
          (M2, M3=10, AluOp=1011, WOUT, CU=11)
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

