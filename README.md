
# WepSIM: Wep Elemental Processor Simulator

[![Build Status](https://travis-ci.org/acaldero/wepsim.svg?branch=master)](https://travis-ci.org/acaldero/wepsim)
[![Maintainability](https://api.codeclimate.com/v1/badges/9efc2957158b5c67f775/maintainability)](https://codeclimate.com/github/acaldero/wepsim/maintainability)
 [![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
 
## Table of contents

- [Getting WepSIM](#get-wepsim)
- [Install WepSIM as Progressive Web Application](#get-wepsim-pwa)
- [Getting Started](#quick-start-web)
- [Getting Started: Command Line](#quick-start-cl)
- [Getting Started: WepSIM API](#quick-start-api)

## Getting WepSIM

+ Web version (Google Chrome 65+, Mozilla Firefox 60+, Microsoft Edge 40+, and Apple Safari 11+):
     * Release version: **https://wepsim.github.io/wepsim**
     * Nightly build: https://acaldero.github.io/wepsim

+ Android version (Android 5.0+):
     * Install from: https://play.google.com/store/apps/details?id=es.uc3m.inf.arcos.wepsim

+ Linux/Unix version (Node 8.10.0+ and Bash 4.4.19+):
     * Install from: https://github.com/wepsim/wepsim.github.io/raw/master/wepsim-cl-lite.zip

+ WepSIM Source Code:
   * https://github.com/acaldero/wepsim

## Install WepSIM as Progressive Web Application

+ Install on iOS, Android, Windows, Linux, etc.:

Step   | iOS                       |  Android                  | Action to perform
------:|:-------------------------:|:-------------------------:|:------------------
1      | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios001.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android001.jpg) | First, open Safari (iOS, MacOS) or Chrome (Android, Windows, Linux) and load https://acaldero.github.io/wepsim. From the top-right corner tap on the share icon (Safari) or the menu icon (Chrome). 
2      | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios002.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android002.jpg) | Move within share options until 'add to home screen' option and click on it.
3      | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios003.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android003.jpg) | Finally, click in the 'add' option.
4      | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios004.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android004.jpg) | Then, WepSIM can be launched from the home screen icon.    

## Getting Started

+ The typical workflow consists in the following steps:

   1 From the menu, there are different examples available (click on the dark blue 'title' of the example you want to work with):
     ![screen:example](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/simulator015.jpg)
   2 Then you could go to the microcode editor workspace: 
     ![screen:menu](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/firmware001.jpg)
   3 You can modify the microcode (if you wish) and microcompile it: 
     ![screen:microcode](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/firmware002.jpg)
   4 Later, you could go to the assembly editor workspace: 
     ![screen:menu](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/assembly002.jpg)
   5 You can modify (if you wish) your assembly code (by using the instructions defined in the previous microcode) and compile it: 
     ![screen:code](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/assembly003.jpg)
   6 Finally, go back to the simulator workspace, and you can execute step by step and analyze the state of the components.
     It is possible to work at assembly level or at microcode level: 
     ![screen:simulation cpu](https://raw.githubusercontent.com/acaldero/wepsim/master/help/welcome/simulation_xinstruction.gif)

+ There are two main options to configure WepSIM (and make it more personal):
   + From the general toolbar, the configuration button let users to personalize several options:
     ![screen:configuration](https://raw.githubusercontent.com/acaldero/wepsim/master/help/welcome/config_usage.gif)
   + From the general toolbar, please use the left-upper slider to change the CPU/CU size:
     ![screen:configuration](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/simulator013.jpg)

+ WepSIM also has a 'state management':
   + From the execution toolbar, clicking over the 'state' button to show the state manager:
     ![screen:configuration](https://raw.githubusercontent.com/acaldero/wepsim/master/help/welcome/states_usage.gif)

## Getting Started: Command Line

+ From the command line it is possible to 'run' the 'exampleCodeS1E1.txt' assembly for the 'ep' architecture with the 'exampleMicrocodeS1E1.txt' microcode, and print the final state:

```bash
./wepsim_node.sh run ep ./examples/ep/exampleMicrocodeS1E1.txt ./examples/ep/exampleCodeS1E1.txt
screen>
screen>
screen>
register R2 = 0x2; register R3 = 0x1; register R5 = 0x1; register R29 = 0xffff; register PC = 0x8018; memory 0x8000 = 0x8400002; memory 0x8004 = 0x8600001; memory 0x8008 = 0xa21809; memory 0x800c = 0x8400002; memory 0x8010 = 0x8600001; memory 0x8014 = 0xa2180a;
```

+ It is also possible to 'run' 'step by step' the 'exampleCodeS1E1.txt' assembly for the 'ep' architecture with the 'exampleMicrocodeS1E1.txt' microcode, and print for each assembly instruction the state elementes that modify its value:

```bash
./wepsim_node.sh stepbystep ep ./examples/ep/exampleMicrocodeS1E1.txt ./examples/ep/exampleCodeS1E1.txt
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

+ And to 'run' 'microstep by microstep' the 'exampleCodeS1E1.txt' assembly for the 'ep' architecture with the 'exampleMicrocodeS1E1.txt' microcode, and print for each microinstruction the state elementes that modify its value:

```bash
./wepsim_node.sh microstepbymicrostep  ep ./examples/ep/exampleMicrocodeS1E1.txt ./examples/ep/exampleCodeS1E1.txt
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

+ You can check if the state at the end of the execution is the same as the one stored on file 'exampleChecklistS1E1.txt'. You can 'run' the 'exampleCodeS1E1.txt' assembly for the 'ep' architecture with the 'exampleMicrocodeS1E1.txt' microcode (**and if it matchs the expected state then the output is going to be**):

```bash
./wepsim_node.sh check ep ./examples/ep/exampleMicrocodeS1E1.txt ./examples/ep/exampleCodeS1E1.txt ./examples/ep/exampleChecklistS1E1.txt
screen>
screen>
screen>
OK: Execution: no error reported
```

+ You can check if the state at the end of the execution is the same as the one stored on file 'exampleChecklistS1E1.txt'. You can 'run' the 'exampleCodeS1E1.txt' assembly for the 'ep' architecture with the 'exampleMicrocodeS1E1.txt' microcode (**and if it fails to match the expected state then the output is going to be**):

```bash
./wepsim_node.sh check ep ./examples/ep/exampleMicrocodeS1E1.txt ./examples/ep/exampleCodeS1E1.txt ./examples/ep/exampleChecklistS1E2.txt
screen>
screen>
screen>
ERROR: Execution: different results: cpu[R1]='0' (expected '0xf'), cpu[R2]='0x2' (expected '0xf'), memory[0x1000]='0' (expected '0xa07ff0f'), memory[0x1004]='0' (expected '0x10061'), memory[0x1008]='0' (expected '0x7ffff'), memory[0x100c]='0' (expected '0x61000a'), memory[0x1010]='0' (expected '0xf'), memory[0x1014]='0' (expected '0xffffffff'), memory[0x1018]='0' (expected '0x7'), memory[0x101c]='0' (expected '0x12345678'), memory[0x1020]='0' (expected '0x61'), memory[0x1024]='0' (expected '0x6c6c6568'), memory[0x1028]='0' (expected '0x726f776f'), memory[0x102c]='0' (expected '0x646c'), memory[0x8000]='0x8400002' (expected '0x20201000'), memory[0x8004]='0x8600001' (expected '0x10601010'), memory[0x8008]='0xa21809' (expected '0x820000f'), memory[0x800c]='0x8400002' (expected '0x24201000'), memory[0x8010]='0x8600001' (expected '0x840000f'), memory[0x8014]='0xa2180a' (expected '0x14401010')
```

## Getting Started: WepSIM API

+ If you want to use WepSIM within your App, there is an WepSIM API in JavaScript available too. One simple example of using the WepSIM API is the following one:

```javascript
        /*
         * include the WepSIM nodejs engine
         */
        <script src="min.sim_all.js"   ></script><noscript>Your browser does not support JavaScript!</noscript>
        <script src="min.wepsim_web.js"></script><noscript>Your browser does not support JavaScript!</noscript>


        /*
         * input
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


	// 1) initialize ws
        var ret = sim_core_init(false, 'ep') ;
	if (false != ret.ok) {
	    sim_core_init_ui('', '', '', '', '', '') ;
        }

	// 2) reset hardware
	if (false != ret.ok) {
            sim_core_reset() ;
        }

	// 3) load firmware
	if (false != ret.ok) {
            ret = sim_core_compile_firmware(str_firmware) ;
        }

	// 4) load assembly
	if (false != ret.ok) {
            ret = sim_core_compile_assembly(str_assembly) ;
        }

	// 5) execute firmware-assembly
	if (false != ret.ok) {
	    ret = sim_core_execute_program(1, 1024, 10240) ;
        }

	// 6) show a final report
	if (false != ret.ok) {
	    var state_obj = simstate_current2state() ;
	    ret.msg = simstate_state2checklist(state_obj) ;
        }


        /*
         * output
         */

        console.log(ret.msg) ;
```

