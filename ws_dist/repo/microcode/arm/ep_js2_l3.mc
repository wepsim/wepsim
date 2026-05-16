
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

sret  {
	nwords=1,
	oc(31:26) = 000001,
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

ecall  {
	nwords=1,
	oc(31:26) = 000010,
	{

		 # RT1 <- ExCode=2
		(EXCODE=10, T11=1, C4=1),

		 # csw_rt1(2)
		(A0=0, B=1, C=0, MADDR=csw_rt1)
	}
}

in reg val  {
	nwords=1,
	oc(31:26) = 000011,
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
	oc(31:26) = 000100,
	reg(25:21) = reg,
	imm(15:0) = val,
	{
		(SE=0, OFFSET=0, SIZE=10000, T3=1, C0=1),
		(MR=0, SELA=10101, T9=1, M1=0, C1=1),
		(TA=1, TD=1, IOW=1, BW=11, A0=1, B=1, C=0)
	}
}

lb rd rs1  {
	nwords=1,
	oc(31:26) = 001000,
	reg(25:21) = rd,
	reg(20:16) = rs1,
	{
		(MR=0, SELA=10000, T9=1, C0=1),
		(TA=1, R=1, BW=0, SE=1, M1=1, C1=1),
		(T1=1, LC=1, MR=0, SELC=10101, SE=1, A0=1, B=1, C=0)
	}
}

sb rs2 rs1  {
	nwords=1,
	oc(31:26) = 001001,
	reg(25:21) = rs2,
	reg(20:16) = rs1,
	{
		(MR=0, SELA=10000, T9=1, C0=1),
		(MR=0, SELA=10101, T9=1, M1=0, C1=1),
		(BW=0, TA=1, TD=1, W=1, A0=1, B=1, C=0)
	}
}

mul reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 001010,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	reg(15:11) = reg3,
	{
		(MC=1, MR=0, SELA=1011, SELB=10000, MA=0, MB=0, SELCOP=1100, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

rem reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 001011,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	reg(15:11) = reg3,
	{
		(MC=1, MR=0, SELA=10000, SELB=1011, MA=0, MB=0, SELCOP=1110, T6=1, SELC=10101, LC=1, SELP=11, M7=1, C7=1, A0=1, B=1, C=0)
	}
}

div reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 001100,
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

bge rs1 rs2 offset  {
	nwords=1,
	oc(31:26) = 001101,
	reg(25:21) = rs1,
	reg(20:16) = rs2,
	address-rel(15:0) = offset,
	{
		(T8=1, C5=1),
		(SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7=1, C7=1),
		(A0=0, B=0, C=111, MADDR=bge_t1),
		(T5=1, M7=0, C7=1),
		(T2=1, C5=1),
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C4=1),
		(MA=1, MB=10, MC=1, SELCOP=1100, T6=1, C4=1),
		(MA=1, MB=1, MC=1, SELCOP=1010, T6=1, C2=1, A0=1, B=1, C=0),
bge_t1:	(T5=1, M7=0, C7=1),
		(A0=1, B=1, C=0)
	}
}

bne rs1 rs2 offset  {
	nwords=1,
	oc(31:26) = 001110,
	reg(25:21) = rs1,
	reg(20:16) = rs2,
	address-rel(15:0) = offset,
	{
		(T8=1, C5=1),
		(SELA=10101, SELB=10000, MC=1, SELCOP=1011, SELP=11, M7=1, C7=1),
		(A0=0, B=0, C=110, MADDR=bne_t2),
		(T5=1, M7=0, C7=1),
		(T2=1, C5=1),
		(SE=1, OFFSET=0, SIZE=10000, T3=1, C4=1),
		(MA=1, MB=10, MC=1, SELCOP=1100, T6=1, C4=1),
		(MA=1, MB=1, MC=1, SELCOP=1010, T6=1, C2=1, A0=1, B=1, C=0),
bne_t2:	(T5=1, M7=0, C7=1),
		(A0=1, B=1, C=0)
	}
}

mov r1 u32  {
	nwords=2,
	oc(31:26) = 001111,
	reg(20:16) = r1,
	imm(63:32) = u32,
	{
		(T2=1, C0=1),
		(TA=1, R=1, BW=11, M1=1, C1=1),
		(M2=1, C2=1),
		(T1=1, SELC=10000, MR=0, LC=1),
		(A0=1, B=1, C=0)
	}
}

str reg1 reg2  {
	nwords=1,
	oc(31:26) = 010000,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	{
		(MR=0, SELA=10000, T9=1, C0=1),
		(MR=0, SELA=10101, T9=1, M1=0, C1=1),
		(BW=11, TA=1, TD=1, W=1, A0=1, B=1, C=0)
	}
}

ldr reg1 reg2  {
	nwords=1,
	oc(31:26) = 010001,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	{
		(MR=0, SELA=10000, T9=1, C0=1),
		(TA=1, R=1, BW=11, M1=1, C1=1),
		(T1=1, LC=1, MR=0, SELC=10101, SE=1, A0=1, B=1, C=0)
	}
}

adds reg1 reg2 reg3  {
	nwords=1,
	oc(31:26) = 010010,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	reg(15:11) = reg3,
	{
		(SELA=10000, SELB=1011, SELC=10101, MR=0, MA=0, MB=0, SELCOP=1010, MC=1, T6=1, LC=1, SELP=11, M7=1, C7=1),
		(A0=1, B=1, C=0)
	}
}

adds reg1 reg2 s16  {
	nwords=1,
	oc(31:26) = 010011,
	reg(25:21) = reg1,
	reg(20:16) = reg2,
	imm(15:0) = s16,
	{
		(SIZE=10000, SE=1, OFFSET=0, T3=1, C5=1),
		(SELA=10000, SELC=10101, MR=0, MA=0, MB=1, SELCOP=1010, MC=1, T6=1, LC=1, SELP=11, M7=1, C7=1),
		(A0=1, B=1, C=0)
	}
}

mvns reg1 reg2  {
	nwords=1,
	oc(31:26) = 010100,
	reg(25:21) = reg1,
	reg(15:11) = reg2,
	{
		(SELA=1011, SELC=10101, MR=0, MA=0, MC=1, SELCOP=11, T6=1, LC=1, SELP=11, M7=1, C7=1),
		(A0=1, B=1, C=0)
	}
}

cmp reg reg  {
	nwords=1,
	oc(31:26) = 010101,
	reg(25:21) = reg,
	reg(15:11) = reg,
	{
		(SELA=10101, SELB=1011, MR=0, MA=0, MB=0, SELCOP=1011, MC=1, SELP=11, M7=1, C7=1),
		(A0=1, B=1, C=0)
	}
}

beq s16  {
	nwords=1,
	oc(31:26) = 010110,
	address-rel(15:0) = s16,
	{
		(T8=1, C5=1),
		(C=110, B=1, A0=0, MADDR=beqs16),
		(T2=1, C5=1),
		(SE=1, SIZE=10000, OFFSET=0, T3=1, C4=1),
		(MA=1, MB=10, MC=1, SELCOP=1100, T6=1, C4=1),
		(MA=1, MB=1, MC=1, SELCOP=1010, T6=1, C2=1),
beqs16:	(T1=1, M7=0, C7=1),
		(A0=1, B=1, C=0)
	}
}

bl u16  {
	nwords=1,
	oc(31:26) = 010111,
	address-abs(15:0) = u16,
	{
		(T2=1, SELC=1110, LC=1, MR=1),
		(SE=0, OFFSET=0, SIZE=10000, T3=1, C2=1),
		(A0=1, B=1, C=0)
	}
}

bx RRE  {
	nwords=1,
	oc(31:26) = 011000,
	reg(20:16) = RRE,
	{
		(SELA=10000, MR=0, T9=1, M2=0, C2=1),
		(A0=1, B=1, C=0)
	}
}

halt  {
	nwords=1,
	oc(31:26) = 011001,
	{
		(SELA=0, MR=1, T9=1, M2=0, C2=1, SELC=1101, LC=1),
		(A0=1, B=1, C=0)
	}
}

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
	15=($R15)
}
