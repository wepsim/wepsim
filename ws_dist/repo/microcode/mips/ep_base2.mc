
#
# WepSIM (https://wepsim.github.io/wepsim/)
#


firmware {
   version  = 2,
   rel_mult = 4,
   endian   = little
}

begin  {


		 # if (INT) go mrti
		(A0=0, B=0, C=1, MADDR=mrti),
fetch:	(T2=1, C0=1),
		(TA=1, R=1, BW=11, M1=1, C1=1),
		(M2=1, C2=1, T1=1, C3=1),
		(A0=1, B=0, C=0),

		 # MBR <- DB <- INTV
mrti:	(INTA=1, BW=11, M1=1, C1=1),

		 # RT1 <- MBR
		(T1=1, C4=1),

		 # push PC
csw_rt1:	(MR=1, SELA=11101, MA=0, MB=10, MC=1, SELCOP=1011, T6=1, SELC=11101, LC=1, C0=1),
		(T2=1, M1=0, C1=1),
		(BW=11, TA=1, TD=1, W=1),

		 # push SR
		(MR=1, SELA=11101, MA=0, MB=10, MC=1, SELCOP=1011, T6=1, SELC=11101, LC=1, C0=1),
		(T8=1, M1=0, C1=1),
		(BW=11, TA=1, TD=1, W=1),

		 # MAR <- RT1*4
		(MA=1, MB=10, MC=1, SELCOP=1100, T6=1, M2=0, C0=1),

		 # MBR <- MP[MAR]
		(TA=1, R=1, BW=11, M1=1, C1=1),

		 # PC <- MAR
		(T1=1, M2=0, C2=1),

		 # go fetch
		(A0=0, B=1, C=0, MADDR=fetch)
}

reti  {
	nwords=1,
	oc(31:26) = 111110,
	{

		 # pop SR
		(MR=1, SELA=11101, T9=1, C0=1),
		(MR=1, SELA=11101, MA=0, MB=10, MC=1, SELCOP=1010, T6=1, SELC=11101, LC=1),
		(TA=1, R=1, BW=11, M1=1, C1=1),
		(T1=1, M7=0, C7=1),

		 # pop PC
		(MR=1, SELA=11101, T9=1, C0=1),
		(MR=1, SELA=11101, MA=0, MB=10, MC=1, SELCOP=1010, T6=1, SELC=11101, LC=1),
		(TA=1, R=1, BW=11, M1=1, C1=1),
		(T1=1, M2=0, C2=1, A0=1, B=1, C=0)
	}
}

syscall  {
	nwords=1,
	oc(31:26) = 101110,
	{

		 # RT1 <- ExCode=2
		(EXCODE=10, T11=1, C4=1),

		 # csw_rt1(2)
		(A0=0, B=1, C=0, MADDR=csw_rt1)
	}
}

rdcycle reg1  {
	nwords=1,
	oc(31:26) = 111111,
	reg(25:21) = reg1,
	{
		(MH=0, T12=1, SELC=10101, LC=1, A0=1, B=1, C=0)
	}
}

and reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 000000,
	eoc(4:0) = 00000,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	reg(15:11) = reg3,
	{
		(MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=1, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

or reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 000000,
	eoc(4:0) = 00001,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	reg(15:11) = reg3,
	{
		(MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=10, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

not reg  {
	nwords=1,
	oc(31:26) = 000000,
	eoc(4:0) = 00010,
	reg(25:21) = reg,
	{
		(MC=1, MR=0, SELA=10101, MA=0, SELCOP=11, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

xor reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 000000,
	eoc(4:0) = 00011,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	reg(15:11) = reg3,
	{
		(MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=100, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

add reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 000000,
	eoc(4:0) = 01001,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	reg(15:11) = reg3,
	{
		(MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=1010, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

addi reg1 reg2 val  {
	nwords=1,
	oc(31:26) = 111111,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	imm(15:0) = val,
	{
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C4=1),
		(MC=1, MR=0, SELB=10000, MA=1, MB=0, SELCOP=1010, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

addiu reg1 reg2 val  {
	nwords=1,
	oc(31:26) = 111111,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	imm(15:0) = val,
	{
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C4=1),
		(MC=1, MR=0, SELB=10000, MA=1, MB=0, SELCOP=1010, T6=1, SELC=10101, LC=1, A0=1, B=1, C=0)
	}
}

sub reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 000000,
	eoc(4:0) = 01010,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	reg(15:11) = reg3,
	{
		(MC=1, MR=0, SELB=1011, SELA=10000, MA=0, MB=0, SELCOP=1011, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

sub reg1 reg2 val  {
	nwords=1,
	oc(31:26) = 111111,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	imm(15:0) = val,
	{
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C5=1),
		(MC=1, MR=0, SELA=10000, MA=0, MB=1, SELCOP=1011, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

mul reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 000000,
	eoc(4:0) = 01011,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	reg(15:11) = reg3,
	{
		(MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

mul reg1 reg2 val  {
	nwords=1,
	oc(31:26) = 111111,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	imm(15:0) = val,
	{
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C5=1),
		(MC=1, MR=0, SELA=10000, MA=0, MB=1, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

div reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 000000,
	eoc(4:0) = 01100,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	reg(15:11) = reg3,
	{

		 # if (reg3 == 0)
		(MC=1, MR=0, SELA=1011, MA=0, MB=11, SELCOP=1100, SELP=11, M7=1, C7=1),
		(A0=0, B=0, C=110, MADDR=fpe1),

		 # reg1 = reg2 / reg3, go fetch
		(MC=1, MR=0, SELB=1011, SELA=10000, MA=0, MB=0, SELCOP=1101, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0),

		 # RT1 <- ExCode=1
fpe1:	(EXCODE=1, T11=1, C4=1),

		 # csw_rt1(2)
		(A0=0, B=1, C=0, MADDR=csw_rt1)
	}
}

rem reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 000000,
	eoc(4:0) = 01110,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	reg(15:11) = reg3,
	{
		(MC=1, MR=0, SELA=10000, SELB=1011, MA=0, MB=0, SELCOP=1110, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

srl reg1 reg2 val  {
	nwords=1,
	oc(31:26) = 010111,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	imm(5:0) = val,
	{
		(SE=1, OFFSET=0, SIZE=110, T3=1, C4=1),
		(MC=1, MR=0, SELA=10000, MA=0, MB=11, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1),
loop9:	(A0=0, B=0, C=110, MADDR=bck9ftch),
		(MC=1, MR=0, SELA=10101, SELB=10101, MA=0, MB=0, SELCOP=101, T6=1, LC=1, SELC=10101),
		(MC=1, MR=0, MA=1, MB=11, SELCOP=1011, T6=1, C4=1, SELP=11, M7=1, C7=1),
		(A0=0, B=1, C=0, MADDR=loop9),
bck9ftch:	(A0=1, B=1, C=0)
	}
}

sll reg1 reg2 val  {
	nwords=1,
	oc(31:26) = 111111,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	imm(5:0) = val,
	{
		(SE=1, OFFSET=0, SIZE=110, T3=1, C4=1),
		(MC=1, MR=0, SELA=10000, MA=0, MB=11, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1),
loop10:	(A0=0, B=0, C=110, MADDR=bck10ftch),
		(MC=1, MR=0, SELA=10101, SELB=10101, MA=0, MB=0, SELCOP=111, T6=1, LC=1, SELC=10101),
		(MC=1, MR=0, MA=1, MB=11, SELCOP=1011, T6=1, C4=1, SELP=11, M7=1, C7=1),
		(A0=0, B=1, C=0, MADDR=loop10),
bck10ftch:	(A0=1, B=1, C=0)
	}
}

move reg1 reg2  {
	nwords=1,
	oc(31:26) = 000001,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	{
		(SELA=10000, T9=1, SELC=10101, LC=1, A0=1, B=1, C=0)
	}
}

li reg val  {
	nwords=1,
	oc(31:26) = 000010,
	reg(25:21) = reg,
	imm(15:0) = val,
	{
		(SE=1, OFFSET=0, SIZE=10000, T3=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
	}
}

liu reg val  {
	nwords=1,
	oc(31:26) = 111100,
	reg(25:21) = reg,
	imm(15:0) = val,
	{
		(SE=0, OFFSET=0, SIZE=10000, T3=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
	}
}

la reg addr  {
	nwords=1,
	oc(31:26) = 000011,
	reg(25:21) = reg,
	address-abs(15:0) = addr,
	{
		(SE=0, OFFSET=0, SIZE=10000, T3=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
	}
}

la reg addr  {
	nwords=2,
	oc(31:26) = 111111,
	reg(25:21) = reg,
	address-abs(63:32) = addr,
	{
		(T2=1, C0=1),
		(TA=1, R=1, BW=11, M1=1, C1=1),
		(M2=1, C2=1, T1=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
	}
}

lw reg addr  {
	nwords=1,
	oc(31:26) = 000100,
	reg(25:21) = reg,
	address-abs(15:0) = addr,
	{
		(SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
		(TA=1, R=1, BW=11, M1=1, C1=1),
		(T1=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
	}
}

sw reg addr  {
	nwords=1,
	oc(31:26) = 000101,
	reg(25:21) = reg,
	address-abs(15:0) = addr,
	{
		(SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
		(MR=0, SELA=10101, T9=1, M1=0, C1=1),
		(BW=11, TA=1, TD=1, W=1, A0=1, B=1, C=0)
	}
}

lb reg addr  {
	nwords=1,
	oc(31:26) = 001000,
	reg(25:21) = reg,
	address-abs(15:0) = addr,
	{
		(SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
		(TA=1, R=1, BW=0, SE=1, M1=1, C1=1),
		(T1=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
	}
}

sb reg addr  {
	nwords=1,
	oc(31:26) = 001001,
	reg(25:21) = reg,
	address-abs(15:0) = addr,
	{
		(SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
		(MR=0, SELA=10101, T9=1, M1=0, C1=1),
		(BW=0, TA=1, TD=1, W=1, A0=1, B=1, C=0)
	}
}

lb reg1 (reg2)  {
	nwords=1,
	oc(31:26) = 100101,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	{
		(MR=0, SELA=10000, T9=1, C0=1),
		(TA=1, R=1, BW=0, SE=1, M1=1, C1=1),
		(T1=1, LC=1, MR=0, SELC=10101, SE=1, A0=1, B=1, C=0)
	}
}

lbu reg1 (reg2)  {
	nwords=1,
	oc(31:26) = 101111,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	{
		(MR=0, SELA=10000, T9=1, C0=1),
		(TA=1, R=1, BW=0, M1=1, C1=1),
		(T1=1, LC=1, MR=0, SELC=10101, SE=0, A0=1, B=1, C=0)
	}
}

sb reg1 (reg2)  {
	nwords=1,
	oc(31:26) = 100111,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	{
		(MR=0, SELA=10000, T9=1, C0=1),
		(MR=0, SELA=10101, T9=1, M1=0, C1=1),
		(BW=0, TA=1, TD=1, W=1, A0=1, B=1, C=0)
	}
}

lw reg1 (reg2)  {
	nwords=1,
	oc(31:26) = 111001,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	{
		(MR=0, SELA=10000, T9=1, C0=1),
		(TA=1, R=1, BW=11, M1=1, C1=1),
		(T1=1, LC=1, MR=0, SELC=10101, SE=1, A0=1, B=1, C=0)
	}
}

sw reg1 (reg2)  {
	nwords=1,
	oc(31:26) = 111010,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	{
		(MR=0, SELA=10000, T9=1, C0=1),
		(MR=0, SELA=10101, T9=1, M1=0, C1=1),
		(BW=11, TA=1, TD=1, W=1, A0=1, B=1, C=0)
	}
}

lw reg1 val (reg2)  {
	nwords=1,
	oc(31:26) = 111111,
	reg(25:21) = reg1,
	imm(15:0) = val,
	reg(20:16) = reg2,
	{
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C5=1),
		(MR=0, SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6=1, C0=1),
		(TA=1, R=1, BW=11, M1=1, C1=1),
		(T1=1, LC=1, MR=0, SELC=10101, SE=1, A0=1, B=1, C=0)
	}
}

sw reg1 val (reg2)  {
	nwords=1,
	oc(31:26) = 111111,
	reg(25:21) = reg1,
	imm(15:0) = val,
	reg(20:16) = reg2,
	{
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C5=1),
		(MR=0, SELA=10000, MA=0, MB=1, MC=1, SELCOP=1010, T6=1, C0=1),
		(MR=0, SELA=10101, T9=1, M1=0, C1=1),
		(BW=11, TA=1, TD=1, W=1, A0=1, B=1, C=0)
	}
}

in reg val  {
	nwords=1,
	oc(31:26) = 001010,
	reg(25:21) = reg,
	imm(15:0) = val,
	{
		(SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
		(TA=1, IOR=1, BW=11, M1=1, C1=1),
		(T1=1, LC=1, MR=0, SELC=10101, A0=1, B=1, C=0)
	}
}

out reg val  {
	nwords=1,
	oc(31:26) = 001011,
	reg(25:21) = reg,
	imm(15:0) = val,
	{
		(SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
		(MR=0, SELA=10101, T9=1, M1=0, C1=1),
		(TA=1, TD=1, IOW=1, BW=11, A0=1, B=1, C=0)
	}
}

b offset  {
	nwords=1,
	oc(31:26) = 001100,
	address-rel(15:0) = offset,
	{
		(T2=1, C5=1),
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C4=1),
		(MA=1, MB=10, MC=1, SELCOP=1100, T6=1, C4=1),
		(MA=1, MB=1, MC=1, SELCOP=1010, T6=1, C2=1, A0=1, B=1, C=0)
	}
}

beq reg reg offset  {
	nwords=1,
	oc(31:26) = 001101,
	reg(25:21) = reg,
	reg(20:16) = reg,
	address-rel(15:0) = offset,
	{
		(T8=1, C5=1),
		(SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7=1, C7=1),
		(A0=0, B=1, C=110, MADDR=bck2ftch),
		(T5=1, M7=0, C7=1),
		(T2=1, C5=1),
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C4=1),
		(MA=1, MB=10, MC=1, SELCOP=1100, T6=1, C4=1),
		(MA=1, MB=1, MC=1, SELCOP=1010, T6=1, C2=1, A0=1, B=1, C=0),
bck2ftch:	(T5=1, M7=0, C7=1),
		(A0=1, B=1, C=0)
	}
}

bne reg reg offset  {
	nwords=1,
	oc(31:26) = 001110,
	reg(25:21) = reg,
	reg(20:16) = reg,
	address-rel(15:0) = offset,
	{
		(T8=1, C5=1),
		(SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7=1, C7=1),
		(A0=0, B=0, C=110, MADDR=bck3ftch),
		(T5=1, M7=0, C7=1),
		(T2=1, C5=1),
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C4=1),
		(MA=1, MB=10, MC=1, SELCOP=1100, T6=1, C4=1),
		(MA=1, MB=1, MC=1, SELCOP=1010, T6=1, C2=1, A0=1, B=1, C=0),
bck3ftch:	(T5=1, M7=0, C7=1),
		(A0=1, B=1, C=0)
	}
}

bge reg reg offset  {
	nwords=1,
	oc(31:26) = 001111,
	reg(25:21) = reg,
	reg(20:16) = reg,
	address-rel(15:0) = offset,
	{
		(T8=1, C5=1),
		(SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7=1, C7=1),
		(A0=0, B=0, C=111, MADDR=bck4ftch),
		(T5=1, M7=0, C7=1),
		(T2=1, C5=1),
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C4=1),
		(MA=1, MB=10, MC=1, SELCOP=1100, T6=1, C4=1),
		(MA=1, MB=1, MC=1, SELCOP=1010, T6=1, C2=1, A0=1, B=1, C=0),
bck4ftch:	(T5=1, M7=0, C7=1),
		(A0=1, B=1, C=0)
	}
}

ble reg reg offset  {
	nwords=1,
	oc(31:26) = 010010,
	reg(25:21) = reg,
	reg(20:16) = reg,
	address-rel(15:0) = offset,
	{
		(T8=1, C5=1),
		(SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7=1, C7=1),
		(A0=0, B=0, C=111, MADDR=ble_ys),
		(A0=0, B=0, C=110, MADDR=ble_ys),
		(T5=1, M7=0, C7=1),
		(A0=1, B=1, C=0),
ble_ys:	(T5=1, M7=0, C7=1),
		(T2=1, C5=1),
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C4=1),
		(MA=1, MB=10, MC=1, SELCOP=1100, T6=1, C4=1),
		(MA=1, MB=1, MC=1, SELCOP=1010, T6=1, C2=1, A0=1, B=1, C=0)
	}
}

blt reg reg offset  {
	nwords=1,
	oc(31:26) = 010000,
	reg(25:21) = reg,
	reg(20:16) = reg,
	address-rel(15:0) = offset,
	{
		(T8=1, C5=1),
		(SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7=1, C7=1),
		(A0=0, B=1, C=111, MADDR=bck5ftch),
		(T5=1, M7=0, C7=1),
		(T2=1, C5=1),
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C4=1),
		(MA=1, MB=10, MC=1, SELCOP=1100, T6=1, C4=1),
		(MA=1, MB=1, MC=1, SELCOP=1010, T6=1, C2=1, A0=1, B=1, C=0),
bck5ftch:	(T5=1, M7=0, C7=1),
		(A0=1, B=1, C=0)
	}
}

bgt reg reg offset  {
	nwords=1,
	oc(31:26) = 010001,
	reg(25:21) = reg,
	reg(20:16) = reg,
	address-rel(15:0) = offset,
	{
		(T8=1, C5=1),
		(SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7=1, C7=1),
		(A0=0, B=0, C=111, MADDR=bck6ftch),
		(A0=0, B=0, C=110, MADDR=bck6ftch),
		(T5=1, M7=0, C7=1),
		(T2=1, C5=1),
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C4=1),
		(MA=1, MB=10, MC=1, SELCOP=1100, T6=1, C4=1),
		(MA=1, MB=1, MC=1, SELCOP=1010, T6=1, C2=1, A0=1, B=1, C=0),
bck6ftch:	(T5=1, M7=0, C7=1),
		(A0=1, B=1, C=0)
	}
}

j addr  {
	nwords=1,
	oc(31:26) = 010011,
	address-abs(15:0) = addr,
	{
		(SE=0, OFFSET=0, SIZE=10000, T3=1, M2=0, C2=1, A0=1, B=1, C=0)
	}
}

jal addr  {
	nwords=1,
	oc(31:26) = 010100,
	address-abs(15:0) = addr,
	{
		(T2=1, SELC=11111, MR=1, LC=1),
		(SE=0, OFFSET=0, SIZE=10000, T3=1, M2=0, C2=1, A0=1, B=1, C=0)
	}
}

jr reg1  {
	nwords=1,
	oc(31:26) = 010101,
	reg(25:21) = reg1,
	{
		(SELA=10101, T9=1, C2=1, A0=1, B=1, C=0)
	}
}

j reg1  {
	nwords=1,
	oc(31:26) = 111111,
	reg(25:21) = reg1,
	{
		(SELA=10101, T9=1, C2=1, A0=1, B=1, C=0)
	}
}

nop  {
	nwords=1,
	oc(31:26) = 010110,
	{
		(A0=1, B=1, C=0)
	}
}

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
