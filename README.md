
# WepSIM: Wep Elemental Processor Simulator

[![Build Status](https://travis-ci.org/acaldero/wepsim.svg?branch=master)](https://travis-ci.org/acaldero/wepsim)
[![Maintainability](https://api.codeclimate.com/v1/badges/9efc2957158b5c67f775/maintainability)](https://codeclimate.com/github/acaldero/wepsim/maintainability)
 [![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
 

## Table of contents

- [Getting WepSIM](#getting-wepsim)
- [Install WepSIM as Progressive Web Application](#install-wepsim-as-progressive-web-application)
- [Getting Started](#getting-started)
- [Getting Started: Command Line](#getting-started-command-line)
- [Getting Started: WepSIM API](#getting-started-wepsim-api)


## Getting WepSIM

### Run WepSIM

+ From Web (Google Chrome 70+, Mozilla Firefox 64+, Microsoft Edge 40+, and Apple Safari 11+):
     * Please, load in your Web Browser the link: https://wepsim.github.io/wepsim
       * A nightly build version is available too: https://acaldero.github.io/wepsim

+ From Linux/Unix command line (Node 8.10.0+ and Bash 4.4.19+):
     * wget https://github.com/acaldero/wepsim/releases/download/v2.0.6/wepsim-206.zip
     * unzip wepsim-202.zip 
     * cd wepsim
     * ./wepsim_node.sh

### Install WepSIM

+ WepSIM as Progressive Web Application on iOS, Android, Windows, Linux, etc.:
    * Please, the following actions must be taken:

Step   | iOS                       |  Android                  | Action to perform
------:|:-------------------------:|:-------------------------:|:------------------
 **1** | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios001.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android001_short.jpg) | First, open Safari (iOS, MacOS) or Chrome (Android, Windows, Linux) and load https://acaldero.github.io/wepsim. From the top-right corner tap on the share icon (Safari) or the menu icon (Chrome). 
 **2** | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios002.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android002_short.jpg) | Move within share options until 'add to home screen' option and click on it.
 **3** | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios003.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android003_short.jpg) | Finally, click in the 'add' option.
 **4** | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios004.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android004_short.jpg) | Then, WepSIM can be launched from the home screen icon.    

+ WepSIM on Android 5.0+:
    * Please, install from the official Goole Play Store link: https://play.google.com/store/apps/details?id=es.uc3m.inf.arcos.wepsim

### WepSIM Source Code

+ WepSIM GitHub Repository:
   * https://github.com/acaldero/wepsim


## Getting Started

### To learn with some WepSIM example

+ Please, follow these these steps:

  1. First, we need to load WepSIM in your favorite web browser. Then click on the Examples button to open the Examples dialog:
    ![screen:example1](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/simulator021.jpg)
  2. In the Examples dialog please click on the colored 'title' of the example and WepSIM will load and compile the associated microcode and assembly code:
    ![screen:example2](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/simulator022.jpg)
  3. In the simulator workspace you can execute step by step and analyze the state of the components. It is possible to work both, at assembly level or at microcode level: 
    ![screen:simulation1](https://raw.githubusercontent.com/acaldero/wepsim/master/help/welcome/simulation_xinstruction.gif)

### You can modify an existing example or build your own

+ The typical workflow consists in the following steps:

   1. First, we need to load WepSIM in your web browser. Then you should go to the microcode editor workspace:
     ![screen:firmware1](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/firmware001.jpg)
   2. You can load an existing microcode or edit a new one. You have to microcompile the microcode to load the binary into the CPU's control memory:
     ![screen:firmware2](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/firmware002.jpg)
   3. Next, you could go to the assembly editor workspace. In the editor workspace you can load an existing assembly code or edit a new one:
     ![screen:firmware3](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/assembly002b.jpg)
   4. The instructions set defined in the previous microcode is used to create your assembly code. You have to compile the assembly code to load the binary into the main memory:
     ![screen:assembly1](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/assembly003.jpg)
   5. Finally, go back to the simulator workspace, and you can execute step by step and analyze the state of the components.
     It is possible to work at assembly level or at microcode level: 
     ![screen:simulation cpu](https://raw.githubusercontent.com/acaldero/wepsim/master/help/welcome/simulation_xinstruction.gif)

### Configure WepSIM

+ From the general toolbar, the configuration button let users to personalize several options:
  ![screen:configuration](https://raw.githubusercontent.com/acaldero/wepsim/master/help/welcome/config_usage.gif)
+ From the general toolbar, please use the left-upper slider to change the CPU/CU size:
  ![screen:configuration](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/simulator013.jpg)

### WepSIM and its 'state management'

+ The values of every visible hardware element is the state in a clock cycle. WepSIM has also a 'state management' dialog where users can see the current state, and check the differences between two states.
+ From the execution toolbar, please click over the 'state' button to show the state manager dialog:
     ![screen:configuration](https://raw.githubusercontent.com/acaldero/wepsim/master/help/welcome/states_usage.gif)


## Getting Started: Command Line

### Run

+ From the command line it is possible to 'run' the 'asm-ep_s1_e1.txt' assembly for the 'ep' architecture with the 'mc-ep_base.txt' microcode, and print the final state:

```bash
./wepsim_node.sh run ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
screen>
screen>
screen>
register R2 = 0x2; register R3 = 0x1; register R5 = 0x1; register R29 = 0xffff; register PC = 0x8018; memory 0x8000 = 0x8400002; memory 0x8004 = 0x8600001; memory 0x8008 = 0xa21809; memory 0x800c = 0x8400002; memory 0x8010 = 0x8600001; memory 0x8014 = 0xa2180a;
```

### Step by step

+ It is also possible to 'run' 'step by step' the 'asm-ep-S1E1.txt' assembly for the 'ep' architecture with the 'mc-ep_base.txt' microcode, and print for each assembly instruction the state elementes that modify its value:

```bash
./wepsim_node.sh stepbystep ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
screen>
screen>
screen>
pc(0x8000):	li $2 2:			register R2 = 0x2; register R29 = 0xffff; register PC = 0x8004
pc(0x8004):	li $3 1:			register R3 = 0x1; register PC = 0x8008
pc(0x8008):	add $5 $2 $3:			register R5 = 0x3; register PC = 0x800c
pc(0x800c):	li $2 2:			register PC = 0x8010
pc(0x8010):	li $3 1:			register PC = 0x8014
pc(0x8014):	sub $5 $2 $3:			register R5 = 0x1; register PC = 0x8018
```

### Microstep by microstep

+ And to 'run' 'microstep by microstep' the 'asm-ep_s1_e1.txt' assembly for the 'ep' architecture with the 'mc-ep_base.txt' microcode, and print for each microinstruction the state elementes that modify its value:

```bash
./wepsim_node.sh microstepbymicrostep  ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
screen>
screen>
screen>
micropc(0x0):	T2 C0:
micropc(0x1):	TA R BW=11 M1 C1:
micropc(0x2):	M2 C2 T1 C3:			register PC = 0x8004
micropc(0x3):	A0 B=0 C=0:
micropc(0x53):	SE OFFSET=0 SIZE=10000 T3 LC MR=0 SELC=10101 A0 B C=0:			register R2 = 0x2; register R29 = 0xffff
micropc(0x0):	T2 C0:
micropc(0x1):	TA R BW=11 M1 C1:
micropc(0x2):	M2 C2 T1 C3:			register PC = 0x8008
micropc(0x3):	A0 B=0 C=0:
micropc(0x53):	SE OFFSET=0 SIZE=10000 T3 LC MR=0 SELC=10101 A0 B C=0:			register R3 = 0x1
micropc(0x0):	T2 C0:
micropc(0x1):	TA R BW=11 M1 C1:
micropc(0x2):	M2 C2 T1 C3:			register PC = 0x800c
micropc(0x3):	A0 B=0 C=0:
micropc(0x35):	MC MR=0 SELA=1011 SELB=10000 MA=0 MB=0 SELCOP=1010 T6 SELC=10101 LC SELP=11 M7 C7 A0 B C=0: register R5 = 0x3
micropc(0x0):	T2 C0:
micropc(0x1):	TA R BW=11 M1 C1:
micropc(0x2):	M2 C2 T1 C3:			register PC = 0x8010
micropc(0x3):	A0 B=0 C=0:
micropc(0x53):	SE OFFSET=0 SIZE=10000 T3 LC MR=0 SELC=10101 A0 B C=0:
micropc(0x0):	T2 C0:
micropc(0x1):	TA R BW=11 M1 C1:
micropc(0x2):	M2 C2 T1 C3:			register PC = 0x8014
micropc(0x3):	A0 B=0 C=0:
micropc(0x53):	SE OFFSET=0 SIZE=10000 T3 LC MR=0 SELC=10101 A0 B C=0:
micropc(0x0):	T2 C0:
micropc(0x1):	TA R BW=11 M1 C1:
micropc(0x2):	M2 C2 T1 C3:			register PC = 0x8018
micropc(0x3):	A0 B=0 C=0:
micropc(0x3f):	MC MR=0 SELB=1011 SELA=10000 MA=0 MB=0 SELCOP=1011 T6 SELC=10101 LC SELP=11 M7 C7 A0 B C=0: register R5 = 0x1
```

### Run & check (o.k.)

+ You can check if the state at the end of the execution is the same as the one stored on file 'cl-ep_s1_e1.txt'. You can 'run' the 'asm-ep_s1_e1.txt' assembly for the 'ep' architecture with the 'mc-ep_base.txt' microcode (**and if it matchs the expected state then the output is going to be**):

```bash
./wepsim_node.sh check ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e1.txt
screen>
screen>
screen>
OK: Execution: no error reported
```

### Run & check (k.o.)

+ You can check if the state at the end of the execution is the same as the one stored on file 'cl-ep_s1_e1.txt'. You can 'run' the 'asm-ep_s1_e1.txt' assembly for the 'ep' architecture with the 'mc-ep_base.txt' microcode (**and if it fails to match the expected state then the output is going to be**):

```bash
./wepsim_node.sh check ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt ./examples/checklist/cl-ep_s1_e2.txt
screen>
screen>
screen>
ERROR: Execution: different results: cpu[R1]='0' (expected '0xf'), cpu[R2]='0x2' (expected '0xf'), memory[0x1000]='0' (expected '0xa07ff0f'), memory[0x1004]='0' (expected '0x10061'), memory[0x1008]='0' (expected '0x7ffff'), memory[0x100c]='0' (expected '0x61000a'), memory[0x1010]='0' (expected '0xf'), memory[0x1014]='0' (expected '0xffffffff'), memory[0x1018]='0' (expected '0x7'), memory[0x101c]='0' (expected '0x12345678'), memory[0x1020]='0' (expected '0x61'), memory[0x1024]='0' (expected '0x6c6c6568'), memory[0x1028]='0' (expected '0x726f776f'), memory[0x102c]='0' (expected '0x646c'), memory[0x8000]='0x8400002' (expected '0x20201000'), memory[0x8004]='0x8600001' (expected '0x10601010'), memory[0x8008]='0xa21809' (expected '0x820000f'), memory[0x800c]='0x8400002' (expected '0x24201000'), memory[0x8010]='0x8600001' (expected '0x840000f'), memory[0x8014]='0xa2180a' (expected '0x14401010')
```

### Verbalized

+ And finally, it is possible to execute microstep by microstep but with a more verbose description:

```bash
./wepsim_node.sh microstepverbalized ep ./examples/microcode/mc-ep_base.txt ./examples/assembly/asm-ep_s1_e1.txt
screen> 
screen> 
screen> 
Micropc at 0x0.	Activated signals are: T2 C0. Associated actions are: Copy from Program Counter Register to Internal Bus value 0x8000. Load from Internal Bus to Memory Address Register value 0x8000. 
Micropc at 0x1.	Activated signals are: TA R BW M1 C1. Associated actions are: Copy from Memory Address Register to Address Bus value 0x8000. Try to read a word from memory at address 0x8000 with value 8400002. Select the full Word. Copy from from Memory to Input of Memory Data Register value 0x8400002. Load from Input of Memory Data Register to Memory Data Register value 0x8400002. 
Micropc at 0x2.	Activated signals are: M2 C2 T1 C3. Associated actions are: Copy to Input of Program Counter Program Counter Register plus four with result 0x8004. Load from Input of Program Counter to Program Counter Register value 0x8004. Copy from Memory Data Register to Internal Bus value 0x8400002. Load from Internal Bus to Instruction Register value 0x8400002. Decode instruction. 
Micropc at 0x3.	Activated signals are: A0 B C. Associated actions are: Set bit 1 of A0A1 to value 1. Copy from Output of MUX C to A1 value 0x0. Copy from Wired Zero to Output of MUX C value 0x0. 
Micropc at 0x53.	Activated signals are: SE OFFSET SIZE T3 LC MR SELC A0 B C. Associated actions are: Copy from Instruction Register to Input of T3 Tristate value 0x2 (copied 16 bits from bit 0). Copy from Instruction Register to Input of T3 Tristate value 0x2 (copied 16 bits from bit 0). Copy from Instruction Register to Input of T3 Tristate value 0x2 (copied 16 bits from bit 0). Copy from Input of T3 Tristate to Internal Bus value 0x2. Copy to Register 2 the value 0x2. Copy from IR[SelA], from IR[SelB], and from IR[SelB] into RA, RB, and RC. Set bit 1 of A0A1 to value 1. Set A1 with value 0x1 (Logical NOT of MUXC_MUXB). Copy from Wired Zero to Output of MUX C value 0x0. 
Micropc at 0x0.	Activated signals are: T2 C0. Associated actions are: Copy from Program Counter Register to Internal Bus value 0x8004. Load from Internal Bus to Memory Address Register value 0x8004. 
Micropc at 0x1.	Activated signals are: TA R BW M1 C1. Associated actions are: Copy from Memory Address Register to Address Bus value 0x8004. Try to read a word from memory at address 0x8004 with value 8600001. Select the full Word. Copy from from Memory to Input of Memory Data Register value 0x8600001. Load from Input of Memory Data Register to Memory Data Register value 0x8600001. 
Micropc at 0x2.	Activated signals are: M2 C2 T1 C3. Associated actions are: Copy to Input of Program Counter Program Counter Register plus four with result 0x8008. Load from Input of Program Counter to Program Counter Register value 0x8008. Copy from Memory Data Register to Internal Bus value 0x8600001. Load from Internal Bus to Instruction Register value 0x8600001. Decode instruction. 
Micropc at 0x3.	Activated signals are: A0 B C. Associated actions are: Set bit 1 of A0A1 to value 1. Copy from Output of MUX C to A1 value 0x0. Copy from Wired Zero to Output of MUX C value 0x0. 
Micropc at 0x53.	Activated signals are: SE OFFSET SIZE T3 LC MR SELC A0 B C. Associated actions are: Copy from Instruction Register to Input of T3 Tristate value 0x1 (copied 16 bits from bit 0). Copy from Instruction Register to Input of T3 Tristate value 0x1 (copied 16 bits from bit 0). Copy from Instruction Register to Input of T3 Tristate value 0x1 (copied 16 bits from bit 0). Copy from Input of T3 Tristate to Internal Bus value 0x1. Copy to Register 3 the value 0x1. Copy from IR[SelA], from IR[SelB], and from IR[SelB] into RA, RB, and RC. Set bit 1 of A0A1 to value 1. Set A1 with value 0x1 (Logical NOT of MUXC_MUXB). Copy from Wired Zero to Output of MUX C value 0x0. 
Micropc at 0x0.	Activated signals are: T2 C0. Associated actions are: Copy from Program Counter Register to Internal Bus value 0x8008. Load from Internal Bus to Memory Address Register value 0x8008. 
Micropc at 0x1.	Activated signals are: TA R BW M1 C1. Associated actions are: Copy from Memory Address Register to Address Bus value 0x8008. Try to read a word from memory at address 0x8008 with value a21809. Select the full Word. Copy from from Memory to Input of Memory Data Register value 0xa21809. Load from Input of Memory Data Register to Memory Data Register value 0xa21809. 
Micropc at 0x2.	Activated signals are: M2 C2 T1 C3. Associated actions are: Copy to Input of Program Counter Program Counter Register plus four with result 0x800c. Load from Input of Program Counter to Program Counter Register value 0x800c. Copy from Memory Data Register to Internal Bus value 0xa21809. Load from Internal Bus to Instruction Register value 0xa21809. Decode instruction. 
Micropc at 0x3.	Activated signals are: A0 B C. Associated actions are: Set bit 1 of A0A1 to value 1. Copy from Output of MUX C to A1 value 0x0. Copy from Wired Zero to Output of MUX C value 0x0. 
Micropc at 0x35.	Activated signals are: MC MR SELA SELB MA MB SELCOP T6 SELC LC SELP M7 C7 A0 B C. Associated actions are: Copy from Field SELCOP of Microinstruction Register to COP value 0xa. Copy from IR[SelA], from IR[SelB], and from IR[SelB] into RA, RB, and RC. Copy from Input of T9 Tristate to Input ALU via MA value 0x1. Copy from Input of T10 Tristate to Input ALU via MB value 0x2. Copy from Input of Temporal 3 Register to Internal Bus value 0x3. Copy to Register 5 the value 0x3. Copy from State Register to Output of MUX SelP value 0x0. Set bit 31 of Output of MUX SelP to value 0. Set bit 30 of Output of MUX SelP to value 0. Set bit 29 of Output of MUX SelP to value 0. Set bit 28 of Output of MUX SelP to value 0. Copy from Output of MUX SelP to Input of State Register value 0x0. Load from Input of State Register to State Register value 0x0. Set bit 1 of A0A1 to value 1. Set A1 with value 0x1 (Logical NOT of MUXC_MUXB). Copy from Wired Zero to Output of MUX C value 0x0. 
Micropc at 0x0.	Activated signals are: T2 C0. Associated actions are: Copy from Program Counter Register to Internal Bus value 0x800c. Load from Internal Bus to Memory Address Register value 0x800c. 
Micropc at 0x1.	Activated signals are: TA R BW M1 C1. Associated actions are: Copy from Memory Address Register to Address Bus value 0x800c. Try to read a word from memory at address 0x800c with value 8400002. Select the full Word. Copy from from Memory to Input of Memory Data Register value 0x8400002. Load from Input of Memory Data Register to Memory Data Register value 0x8400002. 
Micropc at 0x2.	Activated signals are: M2 C2 T1 C3. Associated actions are: Copy to Input of Program Counter Program Counter Register plus four with result 0x8010. Load from Input of Program Counter to Program Counter Register value 0x8010. Copy from Memory Data Register to Internal Bus value 0x8400002. Load from Internal Bus to Instruction Register value 0x8400002. Decode instruction. 
Micropc at 0x3.	Activated signals are: A0 B C. Associated actions are: Set bit 1 of A0A1 to value 1. Copy from Output of MUX C to A1 value 0x0. Copy from Wired Zero to Output of MUX C value 0x0. 
Micropc at 0x53.	Activated signals are: SE OFFSET SIZE T3 LC MR SELC A0 B C. Associated actions are: Copy from Instruction Register to Input of T3 Tristate value 0x2 (copied 16 bits from bit 0). Copy from Instruction Register to Input of T3 Tristate value 0x2 (copied 16 bits from bit 0). Copy from Instruction Register to Input of T3 Tristate value 0x2 (copied 16 bits from bit 0). Copy from Input of T3 Tristate to Internal Bus value 0x2. Copy to Register 2 the value 0x2. Copy from IR[SelA], from IR[SelB], and from IR[SelB] into RA, RB, and RC. Set bit 1 of A0A1 to value 1. Set A1 with value 0x1 (Logical NOT of MUXC_MUXB). Copy from Wired Zero to Output of MUX C value 0x0. 
Micropc at 0x0.	Activated signals are: T2 C0. Associated actions are: Copy from Program Counter Register to Internal Bus value 0x8010. Load from Internal Bus to Memory Address Register value 0x8010. 
Micropc at 0x1.	Activated signals are: TA R BW M1 C1. Associated actions are: Copy from Memory Address Register to Address Bus value 0x8010. Try to read a word from memory at address 0x8010 with value 8600001. Select the full Word. Copy from from Memory to Input of Memory Data Register value 0x8600001. Load from Input of Memory Data Register to Memory Data Register value 0x8600001. 
Micropc at 0x2.	Activated signals are: M2 C2 T1 C3. Associated actions are: Copy to Input of Program Counter Program Counter Register plus four with result 0x8014. Load from Input of Program Counter to Program Counter Register value 0x8014. Copy from Memory Data Register to Internal Bus value 0x8600001. Load from Internal Bus to Instruction Register value 0x8600001. Decode instruction. 
Micropc at 0x3.	Activated signals are: A0 B C. Associated actions are: Set bit 1 of A0A1 to value 1. Copy from Output of MUX C to A1 value 0x0. Copy from Wired Zero to Output of MUX C value 0x0. 
Micropc at 0x53.	Activated signals are: SE OFFSET SIZE T3 LC MR SELC A0 B C. Associated actions are: Copy from Instruction Register to Input of T3 Tristate value 0x1 (copied 16 bits from bit 0). Copy from Instruction Register to Input of T3 Tristate value 0x1 (copied 16 bits from bit 0). Copy from Instruction Register to Input of T3 Tristate value 0x1 (copied 16 bits from bit 0). Copy from Input of T3 Tristate to Internal Bus value 0x1. Copy to Register 3 the value 0x1. Copy from IR[SelA], from IR[SelB], and from IR[SelB] into RA, RB, and RC. Set bit 1 of A0A1 to value 1. Set A1 with value 0x1 (Logical NOT of MUXC_MUXB). Copy from Wired Zero to Output of MUX C value 0x0. 
Micropc at 0x0.	Activated signals are: T2 C0. Associated actions are: Copy from Program Counter Register to Internal Bus value 0x8014. Load from Internal Bus to Memory Address Register value 0x8014. 
Micropc at 0x1.	Activated signals are: TA R BW M1 C1. Associated actions are: Copy from Memory Address Register to Address Bus value 0x8014. Try to read a word from memory at address 0x8014 with value a2180a. Select the full Word. Copy from from Memory to Input of Memory Data Register value 0xa2180a. Load from Input of Memory Data Register to Memory Data Register value 0xa2180a. 
Micropc at 0x2.	Activated signals are: M2 C2 T1 C3. Associated actions are: Copy to Input of Program Counter Program Counter Register plus four with result 0x8018. Load from Input of Program Counter to Program Counter Register value 0x8018. Copy from Memory Data Register to Internal Bus value 0xa2180a. Load from Internal Bus to Instruction Register value 0xa2180a. Decode instruction. 
Micropc at 0x3.	Activated signals are: A0 B C. Associated actions are: Set bit 1 of A0A1 to value 1. Copy from Output of MUX C to A1 value 0x0. Copy from Wired Zero to Output of MUX C value 0x0. 
Micropc at 0x3f.	Activated signals are: MC MR SELB SELA MA MB SELCOP T6 SELC LC SELP M7 C7 A0 B C. Associated actions are: Copy from Field SELCOP of Microinstruction Register to COP value 0xb. Copy from IR[SelA], from IR[SelB], and from IR[SelB] into RA, RB, and RC. Copy from Input of T9 Tristate to Input ALU via MA value 0x2. Copy from Input of T10 Tristate to Input ALU via MB value 0x1. Copy from Input of Temporal 3 Register to Internal Bus value 0x1. Copy to Register 5 the value 0x1. Copy from State Register to Output of MUX SelP value 0x0. Set bit 31 of Output of MUX SelP to value 0. Set bit 30 of Output of MUX SelP to value 0. Set bit 29 of Output of MUX SelP to value 0. Set bit 28 of Output of MUX SelP to value 0. Copy from Output of MUX SelP to Input of State Register value 0x0. Load from Input of State Register to State Register value 0x0. Set bit 1 of A0A1 to value 1. Set A1 with value 0x1 (Logical NOT of MUXC_MUXB). Copy from Wired Zero to Output of MUX C value 0x0. 
```


## Getting Started: WepSIM API

+ If you want to use WepSIM within your App, there is a WepSIM API in JavaScript available too. 
  You will need to include the WepSIM engine in your proyect:

```javascript
        <script src="min.sim_all.js"   ></script><noscript>Your browser does not support JavaScript!</noscript>
        <script src="min.wepsim_web.js"></script><noscript>Your browser does not support JavaScript!</noscript>
```

  And then, one simple example of using this WepSIM API is the following:

```javascript
        /*
         * Input: minimal firmware and minimal assembly code
         */

        str_firmware = 'begin {\n' +
		       '  fetch:  (T2, C0),\n' +
		       '          (TA, R, BW=11, M1=1, C1=1),\n' +
		       '          (M2, C2, T1, C3),\n' +
		       '          (A0, B=0, C=0)\n' +
		       '}\n' +
		       'nop {\n' +
		       '        co=010110,\n' +
		       '        nwords=1,\n' +
		       '        {\n' +
		       '                (A0=1, B=1, C=0)\n' +
		       '        }\n' +
                       '}\n' +
                       'registers {\n' +
                       '        0=$zero,\n' +
                       '        29=$sp (stack_pointer)\n' +
                       '}\n' ;

        str_assembly = '.text\n' +
		       'main: nop\n' ;


        /*
         * Code: Initialize WepSIM + reset + compile firmware + compile assembly + execute + get final state
         */

	// 1) initialize WepSIM engine
        var ret = simcore_init(false) ;

	if (false != ret.ok) {
            ret = simcore_init_hw('ep') ;
        }

	if (false != ret.ok) {
	    simcore_init_ui('', '', '', '', '', '') ;
        }

	// 2) reset hardware
	if (false != ret.ok) {
            simcore_reset() ;
        }

	// 3) load firmware
	if (false != ret.ok) {
            ret = simcore_compile_firmware(str_firmware) ;
        }

	// 4) load assembly
	if (false != ret.ok) {
            ret = simcore_compile_assembly(str_assembly) ;
        }

	// 5) execute firmware-assembly
	if (false != ret.ok) {
	    ret = simcore_execute_program(1, 1024, 10240) ;
        }

	// 6) show a final report
	if (false != ret.ok) {
	    var state_obj = simcore_simstate_current2state() ;
	    ret.msg = simcore_simstate_state2checklist(state_obj) ;
        }


        /*
         * Output: the final state (or error found)
         */

        console.log(ret.msg) ;
```

