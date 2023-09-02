
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

test {
   co=010110,
   nwords=1,
   {
       (),
       (),
       (),
       (),
       (),
       (),
       (),
       (),
       (),
       (),
       (RW, CU=11)
   }
}

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

