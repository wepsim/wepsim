
#
# WepSIM (https://wepsim.github.io/wepsim/)
#


##
## Microcode Section
##

begin
{
    fetch:  (T2, C0),
            (TA, R, BW=11, M1=1, C1=1, MB=1, SelCop=10000, MC, T6, C2),
            (T1, C3, C4),
            (A0, B=0, C=0)
}


#
# ALU
#

and reg1 reg2 reg3 {
            co=000000,
            cop=00000,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            {
                (MC=1, MRA=0, SELA=1011, MRB=0, SELB=10000, MA=0, MB=0, SELCOP=1, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

andi reg1 reg2 val {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            val =inm(15,0),
            {
                (OFFSET=0, SIZE=10000, T3=1, MRC=1, SELC=101001, LC=1),
                (MC=1, MRA=0, SELA=10000, MRB=1, SELB=101001, MA=0, MB=0, SELCOP=1, T6=1, MRC=0, SELC=10101, LC=1, M7, C7, A0=1, B=1, C=0)
            }
}

or reg1 reg2 reg3 {
            co=000000,
            cop=00001,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            {
                (MC=1, MRA=0, SELA=1011, MRB=0, SELB=10000, MA=0, MB=0, SELCOP=10, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

ori reg1 reg2 val {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            val =inm(15,0),
            {
                (OFFSET=0, SIZE=10000, T3=1, MRC=1, SELC=101001, LC=1),
                (MC=1, MRA=0, SELA=10000, MRB=1, SELB=101001, MA=0, MB=0, SELCOP=10, T6=1, MRC=0, SELC=10101, LC=1, M7, C7, A0=1, B=1, C=0)
            }
}

xor reg1 reg2 reg3 {
            co=000000,
            cop=00100,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            {
                (MC=1, MRA=0, SELA=1011, MRB=0, SELB=10000, MA=0, MB=0, SELCOP=100, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

not reg {
            co=000000,
            cop=00010,
            nwords=1,
            reg=reg(25,21),
            {
                (MC=1, MRA=0, SELA=010100, MA=0, SELCOP=11, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

add reg1 reg2 reg3 {
            co=000000,
            cop=01001,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            {
                (MC=1, MRA=0, SELA=1011, MRB=0, SELB=10000, MA=0, MB=0, SELCOP=1010, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

addi reg1 reg2 val {
            co=111111,
            nwords=1,
            reg1 = reg(25,21),
            reg2 = reg(20,16),
            val  = inm(15,0),
            {
                (MRB=0, SELB=10000,                                              T10=1, M1=0, C1=1),
                (                              T1=1, MRC=1, SELC=100000, LC=1),
                (SE=1, OFFSET=0, SIZE=10000,   T3=1, MRC=1, SELC=100001, LC=1),
                (MC=1, MRA, SELA=100000, MRB, SELB=100001, MA=0, MB=0, SELCOP=1010, T6=1,  M1=0, C1=1, M7, C7),
                (                              T1=1, MRC=0, SELC=10101, LC=1, A0=1, B=1, C=0)
            }
}

add reg1 reg2 val {
            co=111111,
            nwords=1,
            reg1 = reg(25,21),
            reg2 = reg(20,16),
            val  = inm(15,0),
            {
                (SE=1, OFFSET=0, SIZE=10000, T3=1, MRC=1, SelC=1, LC=1),
                (MRA=0, SELA=10000, MA=0, MRB=1, SELB=1, MB=0, SELCOP=1010, T6=1, MRC=1, SELC=10101, LC=1, M7, C7, A0=1, B=1, C=0)
            }
}

sub reg1 reg2 reg3 {
            co=000000,
            cop=01010,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            {
                (MC=1, MRA=0, SELA=10000, MRB=0, SELB=1011, MA=0, MB=0, SELCOP=1011, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

sub reg1 reg2 val {
            co=111111,
            nwords=1,
            reg1 = reg(25,21),
            reg2 = reg(20,16),
            val  = inm(15,0),
            {
                (SE=1, OFFSET=0, SIZE=10000, T3=1, MRC=1, SelC=1, LC=1),
                (MRA=0, SELA=10000, MA=0, MRB=1, SELB=1, MB=0, SELCOP=1011, T6=1, MRC=1, SELC=10101, LC=1, M7, C7, A0=1, B=1, C=0)
            }
}

mul reg1 reg2 reg3 {
            co=000000,
            cop=01011,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            {
                (MC=1, MRA=0, SELA=1011, MRB=0, SELB=10000, MA=0, MB=0, SELCOP=1100, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

mul reg1 reg2 val {
            co=111111,
            nwords=1,
            reg1 = reg(25,21),
            reg2 = reg(20,16),
            val  = inm(15,0),
            {
                (SE=1, OFFSET=0, SIZE=10000, T3=1, MRC=1, SelC=1, LC=1),
                (MRA=0, SELA=10000, MA=0, MRB=1, SELB=1, MB=0, SELCOP=1100, T6=1, MRC=1, SELC=10101, LC=1, M7, C7, A0=1, B=1, C=0)
            }
}

div reg1 reg2 reg3 {
            co=000000,
            cop=01100,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            {
                (MC=1, MRA=0, SELA=10000, MRB=0, SELB=1011, MA=0, MB=0, SELCOP=1101, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

rem reg1 reg2 reg3 {
            co=000000,
            cop=01110,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            reg3=reg(15,11),
            {
                (MC=1, MRA=0, SELA=10000, MRB=0, SELB=1011, MA=0, MB=0, SELCOP=1110, T6=1, SELC=10101, LC=1,  M7, C7, A0=1, B=1, C=0)
            }
}

srl reg1 reg2 val {
            co=010111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            val=inm(5,0),
            {
                (SE=1, OFFSET=0, SIZE=110, T3=1, MRC=1, LC=1, SELC=110111),
                (MC=1, SELA=10000, MA=0, SELB=10000, MB=0, SELCOP=10, T6=1, MRC=0, SELC=10101, LC=1, M7, C7),
         loop9: (A0=0, B=0, C=110, MADDR=bck9ftch),
                (MC=1, SELA=10101, SELB=10101, MA=0, MB=0, SELCOP=101, T6=1, LC=1, SELC=10101),
                (MRB=1, SELB=110111, MB=0, MC=1, SELCOP=10011, T6=1, MRC=1, LC=1, SELC=110111, M7, C7),
                (A0=0, B=1, C=0, MADDR=loop9),
      bck9ftch: (A0=1, B=1, C=0)
            }
}

sll reg1 reg2 val {
            co=111111,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            val=inm(5,0),
            {
                (SE=1, OFFSET=0, SIZE=110, T3=1, MRC=1, LC=1, SELC=110111),
                (MC=1, SELA=10000, MA=0, SELB=10000, MB=0, SELCOP=10, T6=1, MRC=0, SELC=10101, LC=1, M7, C7),
        loop10: (A0=0, B=0, C=110, MADDR=bck10ftch),
                (MC=1, SELA=10101, SELB=10101, MA=0, MB=0, SELCOP=111, T6=1, LC=1, SELC=10101),
                (MRB=1, SELB=110111, MB=0, MC=1, SELCOP=10011, T6=1, MRC=1, LC=1, SELC=110111, M7, C7),
                (A0=0, B=1, C=0, MADDR=loop10),
     bck10ftch: (A0=1, B=1, C=0)
            }
}


#
# MV/L*
#

move reg1 reg2 {
            co=000001,
            nwords=1,
            reg1=reg(25,21),
            reg2=reg(20,16),
            {
                (SELA=10000, T9, SELC=10101, LC, A0=1, B=1, C=0)
            }
}

li reg val {
            co=000010,
            nwords=1,
            reg=reg(25,21),
            val=inm(15,0),
            {
                (SE=1, OFFSET=0, SIZE=10000, T3=1, LC=1, MRC=0, SELC=10101, A0=1, B=1, C=0)
            }
}

la  reg addr {
            co=000011,
            nwords=1,
            reg=reg(25,21),
            addr=address(15,0)abs,
            {
                (SE=0, OFFSET=0, SIZE=10000, T3=1, LC=1, MRC=0, SELC=10101, A0=1, B=1, C=0)
            }
}

lw reg addr {
            co=111111,
            nwords=1,
            reg=reg(25,21),
            addr=address(15,0)abs,
            {
                (SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
                (TA=1, R=1, BW=11, M1=1, C1=1),
                (T1=1, LC=1, MRC=0, SELC=10101, A0=1, B=1, C=0)
            }
}

sw reg addr {
            co=000101,
            nwords=1,
            reg=reg(25,21),
            addr=address(15,0)abs,
            {
                (SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
                (MRA=0, SELA=10101, T9=1, M1=0, C1=1),
                (TA=1, TD=1, BW=11, W=1, A0=1, B=1, C=0)
            }
}

lb reg addr {
            co=001000,
            nwords=1,
            reg=reg(25,21),
            addr=address(15,0)abs,
            {
                (SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
                (TA=1, R=1, BW=0, M1=1, C1=1),
                (T1=1, LC=1, MRC=0, SELC=10101, A0=1, B=1, C=0)
            }
}

sb reg addr {
            co=001001,
            nwords=1,
            reg=reg(25,21),
            addr=address(15,0)abs,
            {
                (SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
                (MRA=0, SELA=10101, T9=1, M1=0, C1=1),
                (TA=1, TD=1, BW=0, W=1, A0=1, B=1, C=0)
            }
}

lb reg1 (reg2) {
            co=100101,
            nwords=1,
            reg1 = reg(25,21),
            reg2 = reg(20,16),
            {
                (MRA=0, SELA=10000, T9=1, C0),
                (TA=1, R=1, BW=0, M1=1, C1=1),
                (T1=1, LC=1, MRC=0, SELC=10101, A0=1, B=1, C=0)
            }
}

sb reg1 (reg2) {
            co=100110,
            nwords=1,
            reg1 = reg(25,21),
            reg2 = reg(20,16),
            {
                (MRA=0, SELA=10000, T9=1, C0),
                (MRA=0, SELA=10101, T9=1, M1=0, C1=1),
                (TA=1, TD=1, BW=0, W=1, A0=1, B=1, C=0)
            }
}

lw reg1 (reg2) {
            co=111111,
            nwords=1,
            reg1 = reg(25,21),
            reg2 = reg(20,16),
            {
                (MRA=0, SELA=10000, T9=1, C0),
                (TA=1, R=1, BW=11, M1=1, C1=1),
                (T1=1, LC=1, MRC=0, SELC=10101, SE=1, A0=1, B=1, C=0)
            }
}

sw reg1 (reg2) {
            co=100111,
            nwords=1,
            reg1 = reg(25,21),
            reg2 = reg(20,16),
            {
                (MRA=0, SELA=10000, T9=1, C0),
                (MRA=0, SELA=10101, T9=1, M1=0, C1=1),
                (TA=1, TD=1, BW=11, W=1, A0=1, B=1, C=0)
            }
}


#
# IN/OUT
#

in reg val {
            co=001010,
            nwords=1,
            reg=reg(25,21),
            val=inm(15,0),
            {
                (SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
                (TA=1, IOR=1,    M1=1, C1=1),
                (T1=1, LC=1,     MRC=0, SELC=10101, A0=1, B=1, C=0)
            }
}

out reg val {
            co=001011,
            nwords=1,
            reg=reg(25,21),
            val=inm(15,0),
            {
                (SE=0, OFFSET=0,   SIZE=10000, T3=1, C0=1),
                (MRA=0, SELA=10101, T9=1,       M1=0, C1=1),
                (TA=1, TD=1,       IOW=1,      A0=1, B=1, C=0)
            }
}


#
# Loop
#

b offset {
            co=001100,
            nwords=1,
            offset=address(15,0)rel,
            {
                (SE=1, OFFSET=0, SIZE=10000, T3, MRC=1, SELC=110111, LC=1),
                (MRA=1, SELA=110111, MA=0, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0)
            }
}

beq reg reg offset {
            co=001101,
            nwords=1,
            reg=reg(25,21),
            reg=reg(20,16),
            offset=address(15,0)rel,
            {
                (T8, MRC=1, SELC=110111, LC=1),
                (SELA=10101, SELB=10000, MC=1, SELCOP=1011, M7, C7),
                (A0=0, B=1, C=110, MADDR=bck2ftch),
                (MRA=1, SELA=110111, M7=0, C7),
                (SE=1, OFFSET=0, SIZE=1101, T3, MRC=1, SELC=110111, LC=1),
                (MA=0, SELA=110111, MRA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
      bck2ftch: (SELA=110111, MRA=1, M7=0, C7),
                (A0=1, B=1, C=0)
            }
}

bne reg reg offset {
            co=001110,
            nwords=1,
            reg=reg(25,21),
            reg=reg(20,16),
            offset=address(15,0)rel,
            {
                (T8, SELC=110111, MRC=1, LC=1),
                (SELA=10101, SELB=10000, MC=1, SELCOP=1011, M7, C7),
                (A0=0, B=0, C=110, MADDR=bck3ftch),
                (SELA=110111, MRA=1, M7=0, C7),
                (SE=1, OFFSET=0, SIZE=1101, T3, SELC=110111, MRC=1, LC=1),
                (MA=0, SELA=110111, MRA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
      bck3ftch: (SELA=110111, MRA=1, M7=0, C7),
                (A0=1, B=1, C=0)
            }
}

bge reg reg offset {
            co=001111,
            nwords=1,
            reg=reg(25,21),
            reg=reg(20,16),
            offset=address(15,0)rel,
            {
                (T8, SELC=110111, MRC=1, LC=1),
                (SELA=10101, SELB=10000, MC=1, SELCOP=1011, M7, C7),
                (A0=0, B=0, C=111, MADDR=bck4ftch),
                (SELA=110111, MRA=1, M7=0, C7),
                (SE=1, OFFSET=0, SIZE=1101, T3, SELC=110111, MRC=1, LC=1),
                (MA=0, SELA=110111, MRA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
      bck4ftch: (SELA=110111, MRA=1, M7=0, C7),
                (A0=1, B=1, C=0)
            }
}

blt reg reg offset {
            co=010000,
            nwords=1,
            reg=reg(25,21),
            reg=reg(20,16),
            offset=address(15,0)rel,
            {
                (T8, SELC=110111, MRC=1, LC=1),
                (SELA=10101, SELB=10000, MC=1, SELCOP=1011, M7, C7),
                (A0=0, B=1, C=111, MADDR=bck5ftch),
                (SELA=110111, MRA=1, M7=0, C7),
                (SE=1, OFFSET=0, SIZE=1101, T3, SELC=110111, MRC=1, LC=1),
                (MA=0, SELA=110111, MRA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
      bck5ftch: (SELA=110111, MRA=1, M7=0, C7),
                (A0=1, B=1, C=0)
            }
}

bgt reg reg offset {
            co=010001,
            nwords=1,
            reg=reg(25,21),
            reg=reg(20,16),
            offset=address(15,0)rel,
            {
                (T8, SELC=110111, MRC=1, LC=1),
                (SELA=10101, SELB=10000, MC=1, SELCOP=1011, M7, C7),
                (A0=0, B=0, C=111, MADDR=bck6ftch),
                (SELA=110111, MRA=1, M7=0, C7),
                (SE=1, OFFSET=0, SIZE=1101, T3, SELC=110111, MRC=1, LC=1),
                (MA=0, SELA=110111, MRA=1, MB=1, MC=1, SELCOP=1010, T6, C2, A0=1, B=1, C=0),
      bck6ftch: (SELA=110111, MRA=1, M7=0, C7),
                (A0=1, B=1, C=0)
            }
}


#
# j*
#

j addr {
            co=010011,
            nwords=1,
            addr=address(15,0)abs,
            {
                (SE=0, OFFSET=0, SIZE=10000, T3=1, C2=1, A0=1, B=1, C=0)
            }
}

jal addr {
            co=010100,
            nwords=1,
            addr=address(15,0)abs,
            {
                (T2, SELC=11111, MRC=1, LC),
                (SE=0, OFFSET=0, SIZE=10000, T3=1, C2=1, A0=1, B=1, C=0)
            }
}

jr reg1 {
            co=010101,
            nwords=1,
            reg1=reg(25,21),
            {
                (SELA=10101, MRA=0, T9=1, C2=1, A0=1, B=1, C=0)
            }
}


#
# Misc
#

nop {
        co=010110,
        nwords=1,
        {
                (A0=1, B=1, C=0)
        }
}


##
## Register Section
##

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
        32=($r01, $32),
        33=($r02, $33),
        34=($r03, $34),
        35=($r04, $35),
        36=($r05, $36),
        37=($r06, $37),
        38=($r07, $38),
        39=($r08, $39),
        40=($r09, $40),
        41=($r10, $41),
        42=($r11, $42),
        43=($r12, $43),
        44=($r13, $44),
        45=($r14, $45),
        46=($r15, $46),
        47=($r16, $47),
        48=($r17, $48),
        49=($r18, $49),
        50=($r19, $50),
        51=($r20, $51),
        52=($r21, $52),
        53=($r22, $53),
        54=($r23, $54),
        55=($r24, $55),
        56=($r25, $56),
        57=($r26, $57),
        58=($r27, $58),
        59=($r28, $59),
        60=($r29, $60),
        61=($r30, $61),
        62=($r31, $62),
        63=($r32, $63)
}

pseudoinstructions
{
	li reg1=reg num=inm 
        {
            li  reg1 sel(31,16,num)
            sll reg1 reg1 16
            li  $0   sel(15,0,num)
            or  reg1 reg1 $0 
        }

}

