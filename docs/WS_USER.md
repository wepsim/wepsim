
# Users: Getting Started

## Table of contents

- [Getting Started: Web](#getting-started-web)
  - [How to learn with a WepSIM example](#how-to-learn-with-a-wepsim-example)
  - [How to modify an existing example or build your own](#how-to-modify-an-existing-example-or-build-your-own)
  - [WepSIM configuration](#wepsim-configuration)
  - [WepSIM and its 'State Management'](#wepsim-and-its-state-management)
- [Getting Started: Command Line](#getting-started-command-line)
  - [Run](#run)
  - [Step by step](#step-by-step)
  - [Microstep by microstep](#microstep-by-microstep)
  - [Run & check (o.k.)](#run-&-check-ok)
  - [Run & check (k.o.)](#run-&-check-ko)
  - [Verbalized](#verbalized)


## Getting Started: Web

### How to learn with a WepSIM example

+ Please, follow these these steps:

  1. First, we need to load WepSIM in your favorite web browser. Then click on the Examples button to open the Examples dialog:
    ![screen:example1](https://raw.githubusercontent.com/acaldero/wepsim/master/images/simulator/simulator021.jpg)
  2. In the Examples dialog please click on the colored 'title' of the example and WepSIM will load and compile the associated microcode and assembly code:
    ![screen:example2](https://raw.githubusercontent.com/acaldero/wepsim/master/images/simulator/simulator022.jpg)
  3. In the simulator workspace you can execute step by step and analyze the state of the components. It is possible to work both, at assembly level or at microcode level: 
    ![screen:simulation1](https://raw.githubusercontent.com/acaldero/wepsim/master/images/welcome/simulation_xinstruction.gif)


### How to modify an existing example or build your own

+ The typical workflow consists in the following steps:

   1. First, we need to load WepSIM in your web browser. Then you should go to the microcode editor workspace:
     ![screen:firmware1](https://raw.githubusercontent.com/acaldero/wepsim/master/images/simulator/firmware001.jpg)
   2. You can load an existing microcode or edit a new one. You have to microcompile the microcode to load the binary into the CPU's control memory:
     ![screen:firmware2](https://raw.githubusercontent.com/acaldero/wepsim/master/images/simulator/firmware002.jpg)
   3. Next, you could go to the assembly editor workspace. In the editor workspace you can load an existing assembly code or edit a new one:
     ![screen:firmware3](https://raw.githubusercontent.com/acaldero/wepsim/master/images/simulator/assembly002b.jpg)
   4. The instructions set defined in the previous microcode is used to create your assembly code. You have to compile the assembly code to load the binary into the main memory:
     ![screen:assembly1](https://raw.githubusercontent.com/acaldero/wepsim/master/images/simulator/assembly003.jpg)
   5. Finally, go back to the simulator workspace, and you can execute step by step and analyze the state of the components.
     It is possible to work at assembly level or at microcode level: 
     ![screen:simulation cpu](https://raw.githubusercontent.com/acaldero/wepsim/master/images/welcome/simulation_xinstruction.gif)


### WepSIM configuration 

+ From the general toolbar, the configuration button allows users to personalize several options:
  ![screen:configuration](https://raw.githubusercontent.com/acaldero/wepsim/master/images/welcome/config_usage.gif)
+ From the general toolbar, please use the left-upper slider to change the CPU/CU size:
  ![screen:configuration](https://raw.githubusercontent.com/acaldero/wepsim/master/images/simulator/simulator013.jpg)


### WepSIM and its 'State Management'

+ The values of every visible hardware element is the state in a clock cycle. WepSIM has also a 'state management' dialog where users can see the current state, and check the differences between two states.
+ From the execution toolbar, please click over the 'state' button to show the state manager dialog:
     ![screen:configuration](https://raw.githubusercontent.com/acaldero/wepsim/master/images/welcome/states_usage.gif)


## Getting Started: Command Line

### Run (and print the final state)

+ From the command line it is possible to 'run' the 's1e1.asm' assembly for the 'ep' architecture with the 'mc-ep_base.txt' microcode, and print the final state:

```bash
./wepsim.sh -a run -m ep -f ./repo/microcode/mips/mc-ep_base.txt -s ./repo/assembly/mips/s1e1.asm
register R2 = 0x2; register R3 = 0x1; register R5 = 0x1; register R29 = 0xfffff; register PC = 0x8018; memory 0x8000 = 0x8400002; memory 0x8004 = 0x8600001; memory 0x8008 = 0xa21809; memory 0x800c = 0x8400002; memory 0x8010 = 0x8600001; memory 0x8014 = 0xa2180a;
```

### Run step by step

+ It is also possible to 'run' 'step by step' the 's1_e1.asm' assembly for the 'ep' architecture with the 'mc-ep_base.txt' microcode, and print for each assembly instruction the state elements that modify its value:

```bash
./wepsim.sh -a stepbystep -m ep -f ./repo/microcode/mips/ep_base.mc -s ./repo/assembly/mips/s1e1.asm
pc,		instruction,			changes_from_zero_or_current_value
pc = 0x8000,	li $2 2,			register R2 = 0x2; register R29 = 0xfffff; register PC = 0x8004
pc = 0x8004,	li $3 1,			register R3 = 0x1; register PC = 0x8008
pc = 0x8008,	add $5 $2 $3,			register R5 = 0x3; register PC = 0x800c
pc = 0x800c,	li $2 2,			register PC = 0x8010
pc = 0x8010,	li $3 1,			register PC = 0x8014
pc = 0x8014,	sub $5 $2 $3,			register R5 = 0x1; register PC = 0x8018
```

### Run microstep by microstep

+ And to 'run' 'microstep by microstep' the 's1e1.asm' assembly for the 'ep' architecture with the 'ep_base.mc' microcode, and print for each microinstruction the state elements that modify its value:

```bash
./wepsim.sh -a microstepbymicrostep -m ep -f ./repo/microcode/mips/ep_base.mc -s ./repo/assembly/mips/s1e1.asm
micropc,		microcode,				changes_from_zero_or_current_value
micropc = 0x0,		T2 C0,					
micropc = 0x1,		TA R BW=11 M1 C1,				
micropc = 0x2,		M2 C2 T1 C3,				register PC = 0x8004
micropc = 0x3,		A0 B=0 C=0,				
micropc = 0x67,		SE OFFSET=0 SIZE=10000 T3 LC MR=0 SELC=10101 A0 B C=0,register R2 = 0x2; register R29 = 0xfffff
micropc = 0x0,		T2 C0,					
micropc = 0x1,		TA R BW=11 M1 C1,				
micropc = 0x2,		M2 C2 T1 C3,				register PC = 0x8008
micropc = 0x3,		A0 B=0 C=0,				
micropc = 0x67,		SE OFFSET=0 SIZE=10000 T3 LC MR=0 SELC=10101 A0 B C=0,register R3 = 0x1
micropc = 0x0,		T2 C0,					
micropc = 0x1,		TA R BW=11 M1 C1,				
micropc = 0x2,		M2 C2 T1 C3,				register PC = 0x800c
micropc = 0x3,		A0 B=0 C=0,				
micropc = 0x35,		MC MR=0 SELA=1011 SELB=10000 MA=0 MB=0 SELCOP=1010 T6 SELC=10101 LC SELP=11 M7 C7 A0 B C=0,register R5 = 0x3
```

### Run & check end state (example when o.k.)

+ You can check if the state at the end of the execution is the same as the one stored on file 'cl-s1e1.txt'. You can 'run' the 's1e1.asm' assembly for the 'ep' architecture with the 'ep_base.mc' microcode (**and if it matches the expected state, then the output is going to be**):

```bash
./wepsim.sh -a check -m ep -f ./repo/microcode/mips/ep_base.mc -s ./repo/assembly/mips/s1e1.asm -r ./repo/checklist/mips/cl-s1e1.txt
OK: Execution: no error reported
```

### Run & check end state (example when k.o.)

+ You can check if the state at the end of the execution is the same as the one stored on file 'cl-s1e1.txt'. You can 'run' the 's1e1.asm' assembly for the 'ep' architecture with the 'ep_base.mc' microcode (**and if it fails to match the expected state then the output is going to be**):

```bash
./wepsim.sh -a check -m ep -f ./repo/microcode/mips/ep_base.mc -s ./repo/assembly/mips/s1e1.asm -r ./repo/checklist/mips/cl-s1e2.txt
ERROR: Execution: different results: cpu[R1]='0' (expected '0xf'), cpu[R2]='0x2' (expected '0xf'), cpu[R3]='0' (expected '0x1'), cpu[R29]='0x100000' (expected '0xfffff'), cpu[PC]='0x8078' (expected '0x8018'), memory[0x1000]='0' (expected '0xa07ff0f'), memory[0x1004]='0' (expected '0x10061'), memory[0x1008]='0' (expected '0x7ffff'), memory[0x100c]='0' (expected '0x61000a'), memory[0x1010]='0' (expected '0xf'), memory[0x1014]='0' (expected '0xffffffff'), memory[0x1018]='0' (expected '0x7'), memory[0x101c]='0' (expected '0x12345678'), memory[0x1020]='0' (expected '0x61'), memory[0x1024]='0' (expected '0x6c6c6568'), memory[0x1028]='0' (expected '0x726f776f'), memory[0x102c]='0' (expected '0x646c'), memory[0x8000]='0x8400002' (expected '0x20201000'), memory[0x8004]='0x8600001' (expected '0x10601010'), memory[0x8008]='0xa21809' (expected '0x820000f'), memory[0x800c]='0x8400002' (expected '0x24201000'), memory[0x8010]='0x8600001' (expected '0x840000f'), memory[0x8014]='0xa2180a' (expected '0x14401010'),
```

### Run microstep by microstep with verbalized output

+ And finally, it is possible to execute microstep by microstep but with a more verbose description:

```bash
./wepsim.sh -a microstepverbalized -m ep -f ./repo/microcode/mips/ep_base.mc -s ./repo/assembly/mips/s1e1.asm
Micropc at 0x0.	Activated signals are: T2 C0. Associated actions are: Copy from Program Counter Register to Internal Bus value 0x8000. Load from Internal Bus to Memory Address Register value 0x8000.
Micropc at 0x1.	Activated signals are: TA R BW M1 C1. Associated actions are: Copy from Memory Address Register to Address Bus value 0x8000. Memory output = 0x8400002 (Read a word from 0x8000). Select the full Word. Copy from from Memory to Input of Memory Data Register value 0x8400002. Load from Input of Memory Data Register to Memory Data Register value 0x8400002.
Micropc at 0x2.	Activated signals are: M2 C2 T1 C3. Associated actions are: Copy to Input of Program Counter Program Counter Register plus four with result 0x8004. Load from Input of Program Counter to Program Counter Register value 0x8004. Copy from Memory Data Register to Internal Bus value 0x8400002. Load from Internal Bus to Instruction Register value 0x8400002. Decode instruction.
Micropc at 0x3.	Activated signals are: A0 B C. Associated actions are: Copy from Input ROM to Input microaddress value 0x67. Copy from Output of MUX C to A1 value 0x0. Copy from Wired Zero to Output of MUX C value 0x0.
Micropc at 0x67.	Activated signals are: SE OFFSET SIZE T3 LC MR SELC A0 B C. Associated actions are:  Copy from Instruction Register to Input of T3 Tristate value 0x2 (copied 16 bits from bit 0).  Copy from Instruction Register to Input of T3 Tristate value 0x2 (copied 16 bits from bit 0).  Copy from Instruction Register to Input of T3 Tristate value 0x2 (copied 16 bits from bit 0). Copy from Input of T3 Tristate to Internal Bus value 0x2. Copy to Register 2 the value 0x2. Copy from IR[SelA], from IR[SelB], and from IR[SelB] into RA, RB, and RC. Copy from Input Fetch to Input microaddress value 0x0. Set A1 with value 0x1 (Logical NOT of MUXC_MUXB). Copy from Wired Zero to Output of MUX C value 0x0.
Micropc at 0x0.	Activated signals are: T2 C0. Associated actions are: Copy from Program Counter Register to Internal Bus value 0x8004. Load from Internal Bus to Memory Address Register value 0x8004.
Micropc at 0x1.	Activated signals are: TA R BW M1 C1. Associated actions are: Copy from Memory Address Register to Address Bus value 0x8004. Memory output = 0x8600001 (Read a word from 0x8004). Select the full Word. Copy from from Memory to Input of Memory Data Register value 0x8600001. Load from Input of Memory Data Register to Memory Data Register value 0x8600001.
...
```

