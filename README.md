
# WepSIM: Web Elemental Processor Simulator

![Build Status](https://github.com/acaldero/wepsim/actions/workflows/node.js.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/9efc2957158b5c67f775/maintainability)](https://codeclimate.com/github/acaldero/wepsim/maintainability)
[![codebeat badge](https://codebeat.co/badges/66773495-9967-4514-8c2c-916293f584b5)](https://codebeat.co/projects/github-com-acaldero-wepsim-master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/579e744cedde4dc78f8084d9db7abd32)](https://app.codacy.com/gh/acaldero/wepsim/dashboard)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
[![Release](https://img.shields.io/badge/Stable-2.3.0-green.svg)](https://github.com/wepsim/wepsim/releases/tag/v2.3.0)


## Table of contents

- Getting WepSIM
  - [Run WepSIM](#getting-wepsim)
  - [Install WepSIM](#install-wepsim-as-pwa)
- Getting Started
  - [Visual UI](#getting-started-visualui)
  - [Command Line](#getting-started-command-line)
- [Getting Started: Developers](#getting-started-developers)
  - [WepSIM Source Code](#wepsim-source-code)
  - [WepSIM engine API](#wepsim-engine-api)
  - [WepSIM Links](#wepsim-links)
  - [WepSIM on Google Colab](#wepsim-gcolab)
  - [WepSIM for Apache Cordova](#wepsim-apache-cordova)


## Getting WepSIM

### 1) Run WepSIM

+ From Web, please:
  * Check you have a compatible Web browser:
    * Google Chrome 90+, Mozilla Firefox 90+, Microsoft Edge 90+, and Apple Safari 15+
  * Open your (compatible) Web browser
  * Click on the link https://wepsim.github.io/wepsim
    * A nightly build version is also available at https://acaldero.github.io/wepsim

+ From Linux/Unix command line, please:
  * Check you have installed Node v16.10+, and Bash 4.4.19+:
    ```bash
    sudo apt-get install nodejs npm bash -y
    ```
  * Get WepSIM by executing:
    ```bash
    wget https://github.com/wepsim/wepsim/releases/download/v2.3.0/wepsim-2.3.0.zip
    unzip wepsim-2.3.0.zip
    cd wepsim-2.3.0
    npm install terser jq jshint yargs clear inquirer fuzzy inquirer-command-prompt inquirer-autocomplete-prompt
    ``` 
  * Execute wepsim.sh with the help flag in order to show the available command switches:
    ```bash
    ./wepsim.sh -h
    ```

<a name="install-wepsim-as-pwa"/>

### 2) Install WepSIM (iOS, Android, Windows, Linux, etc.)

+ WepSIM can be installed on Android 9.0+ from the Goole Play Store at https://play.google.com/store/apps/details?id=es.uc3m.inf.arcos.wepsim
+ For other platforms, please follow those steps in order to install WepSIM as a Progressive Web Application (PWA):

Step   | iOS                       |  Android                  | Action to perform
------:|:-------------------------:|:-------------------------:|:------------------
 **1** | ![screen:pwa_ios](https://raw.githubusercontent.com/wepsim/wepsim/master/images/pwa/pwa_ios001.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/wepsim/wepsim/master/images/pwa/pwa_android001_short.jpg) | First, open Safari (iOS, MacOS) or Chrome (Android, Windows, Linux) and load https://wepsim.github.io/wepsim. <br/> From the top-right corner, tap on the share icon (Safari) or the menu icon (Chrome).
 **2** | ![screen:pwa_ios](https://raw.githubusercontent.com/wepsim/wepsim/master/images/pwa/pwa_ios002.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/wepsim/wepsim/master/images/pwa/pwa_android002_short.jpg) | Move within share options until 'add to home screen' option and click on it.
 **3** | ![screen:pwa_ios](https://raw.githubusercontent.com/wepsim/wepsim/master/images/pwa/pwa_ios003.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/wepsim/wepsim/master/images/pwa/pwa_android003_short.jpg) | Finally, click in the 'add' option.
 **4** | ![screen:pwa_ios](https://raw.githubusercontent.com/wepsim/wepsim/master/images/pwa/pwa_ios004.jpg) | ![screen:pwa_android](https://raw.githubusercontent.com/wepsim/wepsim/master/images/pwa/pwa_android004_short.jpg) | Then, WepSIM can be launched from the home screen icon.


<a name="getting-started-visualui"/>

## Getting Started: Visual User Interface

### A) Steps to execute a WepSIM example

1. First, we need to load WepSIM in your favorite web browser. Then click on the Examples button to open the Examples dialog:
   ![screen:example1](https://raw.githubusercontent.com/wepsim/wepsim/master/images/simulator/simulator021.jpg)
2. In the Examples dialog, please click on the colored 'title' of the example and WepSIM will load and compile the associated microcode and assembly code:
   ![screen:example2](https://raw.githubusercontent.com/wepsim/wepsim/master/images/simulator/simulator022.jpg)
3. In the simulator workspace you can execute step by step and analyze the state of the components. It is possible to work both, at assembly level or at microcode level:
   ![screen:simulation1](https://raw.githubusercontent.com/wepsim/wepsim/master/images/welcome/simulation_xinstruction.gif)

### B) Typical workflow to modify an existing example or build your own experiment

1. First, we need to load WepSIM in your web browser. Then you should go to the microcode editor workspace:
   ![screen:firmware1](https://raw.githubusercontent.com/wepsim/wepsim/master/images/simulator/firmware001.jpg)
2. You can load an existing microcode or edit a new one. You have to microcompile the microcode to load the binary into the CPU's control memory:
   ![screen:firmware2](https://raw.githubusercontent.com/wepsim/wepsim/master/images/simulator/firmware002.jpg)
3. Next, you could go to the assembly editor workspace. In the editor workspace you can load an existing assembly code or edit a new one:
   ![screen:firmware3](https://raw.githubusercontent.com/wepsim/wepsim/master/images/simulator/assembly002b.jpg)
4. The instructions set defined in the previous microcode is used to create your assembly code. You have to compile the assembly code to load the binary into the main memory:
   ![screen:assembly1](https://raw.githubusercontent.com/wepsim/wepsim/master/images/simulator/assembly003.jpg)
5. Finally, go back to the simulator workspace, and you can execute step by step and analyze the state of the components.
   It is possible to work at assembly level or at microcode level:
   ![screen:simulation cpu](https://raw.githubusercontent.com/wepsim/wepsim/master/images/welcome/simulation_xinstruction.gif)

### C) Step to change the WepSIM configuration

+ From the general toolbar, the configuration button allows users to personalize several options:
  ![screen:configuration](https://raw.githubusercontent.com/wepsim/wepsim/master/images/welcome/config_usage.gif)
+ From the general toolbar, please use the left-upper slider to change the CPU/CU size:
  ![screen:configuration](https://raw.githubusercontent.com/wepsim/wepsim/master/images/simulator/simulator013.jpg)

### D) Typical steps to use the "State Management" in WepSIM

+ The value of every visible hardware element is the state in a clock cycle. WepSIM has also a 'state management' dialog where users can see the current state, and check the differences between the two states.
+ From the execution toolbar, please click over the 'state' button to show the state manager dialog:
  ![screen:configuration](https://raw.githubusercontent.com/wepsim/wepsim/master/images/welcome/states_usage.gif)


<a name="getting-started-command-line"/>

## Getting Started: Command Line

### A) Run (and print the final state)

+ From the command line it is possible to 'run' the 's1e1.asm' assembly for the 'ep' architecture with the 'ep_base.mc' microcode, and print the final state:

```bash
./wepsim.sh -a run -m ep -f ./repo/microcode/mips/ep_base.mc -s ./repo/assembly/mips/s1e5.asm
register R9 = 0x1; register R10 = 0x2; register R29 = 0x100000; memory 0x8000 = 0x9200001; memory 0x8004 = 0x9400002; memory 0x8008 = 0x412a0004; memory 0x800c = 0x30000004; memory 0x8010 = 0x52a0000; memory 0x8014 = 0x9200001; memory 0x8018 = 0x9400002; memory 0x801c = 0x3d2a0004; memory 0x8020 = 0x52a0000; memory 0x8024 = 0x9200001; memory 0x8028 = 0x9400002; memory 0x802c = 0x3d2a0004; memory 0x8030 = 0x30000000; memory 0x8034 = 0x57e00000; 
```

### B) Run step by step

+ It is also possible to 'run' 'step by step' the 's1_e1.asm' assembly for the 'ep' architecture with the 'ep_base.mc' microcode, and print for each assembly instruction the state elements that modify its value:

```bash
./wepsim.sh -a stepbystep -m ep -f ./repo/microcode/mips/ep_base.mc -s ./repo/assembly/mips/s1e1.asm
pc,		instruction,			changes_from_zero_or_current_value
pc = 0x8000,	li $2 2,			register R2 = 0x2; register R29 = 0x100000; register PC = 0x8004
pc = 0x8004,	li $3 1,			register R3 = 0x1; register PC = 0x8008
pc = 0x8008,	add $5 $2 $3,			register R5 = 0x3; register PC = 0x800c
pc = 0x800c,	li $2 2,			register PC = 0x8010
pc = 0x8010,	li $3 1,			register PC = 0x8014
...
```

### C) Run microstep by microstep

+ And to 'run' 'microstep by microstep' the 's1e1.asm' assembly for the 'ep' architecture with the 'ep_base.mc' microcode, and print for each microinstruction the state elements that modify its value:

```bash
./wepsim.sh -a microstepbymicrostep -m ep -f ./repo/microcode/mips/ep_base.mc -s ./repo/assembly/mips/s1e1.asm
micropc,		microcode,				changes_from_zero_or_current_value
micropc = 0x0,		T2 C0,					
micropc = 0x1,		TA R BW=11 M1 C1,				
micropc = 0x2,		M2 C2 T1 C3,				register PC = 0x8004
micropc = 0x3,		A0 B=0 C=0,				
micropc = 0xd3,		SE OFFSET=0 SIZE=10000 T3 LC MR=0 SELC=10101 A0 B C=0,register R2 = 0x2; register R29 = 0x100000
micropc = 0x0,		T2 C0,					
micropc = 0x1,		TA R BW=11 M1 C1,				
micropc = 0x2,		M2 C2 T1 C3,				register PC = 0x8008
micropc = 0x3,		A0 B=0 C=0,				
micropc = 0xd3,		SE OFFSET=0 SIZE=10000 T3 LC MR=0 SELC=10101 A0 B C=0,register R3 = 0x1
...
```

### D) Run & check end state (example when o.k.)

+ You can check if the state at the end of the execution is the same as the one stored on file 'cl-s1e1.txt'. You can 'run' the 's1e1.asm' assembly for the 'ep' architecture with the 'ep_base.mc' microcode (**and if it matches the expected state, then the output is going to be**):

```bash
./wepsim.sh -a check -m ep -f ./repo/microcode/mips/ep_base.mc -s ./repo/assembly/mips/s1e1.asm -r ./repo/checklist/mips/cl-s1e1.txt
OK: Execution: no error reported
```

### E) Run & check end state (example when k.o.)

+ You can check if the state at the end of the execution is the same as the one stored on file 'cl-s1e1.txt'. You can 'run' the 's1e1.asm' assembly for the 'ep' architecture with the 'ep_base.mc' microcode (**and if it fails to match the expected state then the output is going to be**):

```bash
./wepsim.sh -a check -m ep -f ./repo/microcode/mips/ep_base.mc -s ./repo/assembly/mips/s1e1.asm -r ./repo/checklist/mips/cl-s1e2.txt
ERROR: Execution: different results: cpu[R1]='0' (expected '0xf'), cpu[R2]='0x2' (expected '0xf'), cpu[R3]='0' (expected '0x1'), cpu[R29]='0x100000' (expected '0xfffff'), cpu[PC]='0x8078' (expected '0x8018'), memory[0x1000]='0' (expected '0xa07ff0f'), memory[0x1004]='0' (expected '0x10061'), memory[0x1008]='0' (expected '0x7ffff'), memory[0x100c]='0' (expected '0x61000a'), memory[0x1010]='0' (expected '0xf'), memory[0x1014]='0' (expected '0xffffffff'), memory[0x1018]='0' (expected '0x7'), memory[0x101c]='0' (expected '0x12345678'), memory[0x1020]='0' (expected '0x61'), memory[0x1024]='0' (expected '0x6c6c6568'), memory[0x1028]='0' (expected '0x726f776f'), memory[0x102c]='0' (expected '0x646c'), memory[0x8000]='0x8400002' (expected '0x20201000'), memory[0x8004]='0x8600001' (expected '0x10601010'), memory[0x8008]='0xa21809' (expected '0x820000f'), memory[0x800c]='0x8400002' (expected '0x24201000'), memory[0x8010]='0x8600001' (expected '0x840000f'), memory[0x8014]='0xa2180a' (expected '0x14401010'), 
```

### F) Run microstep by microstep with verbalized output

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


## Getting Started: Developers

### WepSIM Source Code

- WepSIM GitHub Repository:
   * Stable  build: https://github.com/wepsim/wepsim
   * Nightly build: https://github.com/acaldero/wepsim

- The WepSIM architecture can be summarized in the following Figure (made by https://app.diagrams.net):
![screen:example1](https://raw.githubusercontent.com/wepsim/wepsim/master/docs/ws_arch_215-v2.png)


<a name="wepsim-engine-api"/>

### WepSIM engine API

+ If you want to use the WepSIM engine within your App, there is a WepSIM API in JavaScript available too.
  You will need to include the WepSIM engine in your proyect:

```javascript
  <script src="min.sim_all.js"   ></script><noscript>Your browser does not support JavaScript!</noscript>
  <script src="min.wepsim_web.js"></script><noscript>Your browser does not support JavaScript!</noscript>
```

+ And then, one simple example of using this WepSIM API is the following:

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
	var ui_cb = {} ;
	simcore_init_ui(ui_cb) ;
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
	var options = {
                         instruction_limit:  1024,
                         cycles_limit:      10240
		      } ;
	ret = simcore_execute_program(options) ;
    }

    // 6) show a final report
    if (false != ret.ok) {
	var state_obj = simcore_simstate_current2state() ;
	ret.msg = simcore_simstate_state2checklist(state_obj, '') ;
    }


    /*
     * Output: the final state (or error found)
     */

    console.log(ret.msg) ;
```


<a name="wepsim-gcolab"/>

### WepSIM from Google Colab

+ The following fragment is an example of how to use WepSIM command-line within Google Colab cell:

```html
!echo "(1/4) Installing pre-requisites..."
!npm install  terser jq jshint yargs clear inquirer >& /dev/null
!echo "(2/4) Downloading WepSIM..."
!wget https://github.com/wepsim/wepsim/releases/download/v2.3.0/wepsim-2.3.0.zip >& /dev/null
!unzip -o wepsim-2.3.0.zip  >& /dev/null
!rm -fr   wepsim-2.3.0.zip
!echo "(3/4) Executing WepSIM..."
!./wepsim-2.3.0/wepsim.sh -a stepbystep -m ep -f ./wepsim-2.3.0/repo/microcode/mips/ep_base.mc -s ./wepsim-2.3.0/repo/assembly/mips/s1e1.asm > ./result.csv
!rm -fr   wepsim-2.3.0
!echo "(4/4) Showing execution trace as table..."

import pandas as pd
import io

df1 = pd.read_csv('./result.csv')
df1.columns = df1.columns.str.strip()
for item in df1.columns[:]:
    df1[item].replace("\t","", inplace=True, regex=True)

df1
```


<a name="wepsim-links"/>

### WepSIM Links

In the WepSIM URL you can use several arguments to perform certain actions automatically.
This is an example:
<html>
<center>
 <h5>
 <table width="75%" border="2">
  <tr><td><a href="http://wepsim.github.io/wepsim/ws_dist/?mode=ep&amp;examples_set=RISCV&amp;example=0&amp;simulator=assembly:14&amp;notify=false">http://wepsim.github.io/wepsim/ws_dist/?mode=ep&amp;examples_set=RISCV&amp;example=0&amp;simulator=assembly:14&amp;notify=false</a></td></tr>
 </table>
 </h5>
 </center>
</html>

In particular, WepSIM supports the following arguments:
<html>
 <table border="1">
  <tr>
    <th>Name</th>
    <th>Included values</th>
    <th>Used for...</th>
   </tr>
    <tr>
    <td rowspan=4><i><b>mode</b></i></td>
    <td><i>ep</i></td>
    <td>Elemental Processor  with circuit and assembly (default)</td>
  </tr>
  <tr>
    <td><i>poc</i></td>
    <td>Proof-of-Concept  Processor with circuit and assembly</td>
  </tr>
  <tr>
    <td><i>asm_mips</i></td>
    <td>Elemental Processor (default) with MIPS assembly only</td>
  </tr>
  <tr>
    <td><i>asm_rv32</i></td>
    <td>Elemental Processor (default) with RISC-V assembly only</td>
  </tr>
  <tr>
    <td rowspan=4><i><b>config_set</b></i></td>
    <td><i>Desktop</i></td>
    <td>Interface for desktop computer (default)</td>
  </tr>
  <tr>
    <td><i>Mobile</i></td>
    <td>Interface for smartphone or tablet</td>
  </tr>
  <tr>
    <td><i>Desktop-Dark</i></td>
    <td>Interface for desktop computer and dark mode</td>
  </tr>
  <tr>
    <td><i>Mobile-Dark</i></td>
    <td>Interface for smartphone or tablet in dark mode</td>
  </tr>  
  <tr>
    <td rowspan=6><i><b>examples_set</b></i></td>
    <td><i>RISCV</i></td>
    <td>Examples for RISCV instruction set</td>
  </tr>
  <tr>
    <td><i>RISCV-Instructive</i></td>
    <td>Examples for RISCV instruction set with active comments</td>
  </tr>
    <tr>
    <td><i>MIPS</i></td>
    <td>Examples for MIPS instruction set</td>
  </tr>
  <tr>
    <td><i>MIPS-Instructive</i></td>
    <td>Examples for MIPS instruction set with active comments</td>
  </tr>
    <tr>
    <td><i>ARM</i></td>
    <td>Examples for ARM-like instruction set</td>
  </tr>
    <tr>
    <td><i>Z80</i></td>
    <td>Examples for Z80-like instruction set</td>
  </tr>
  <tr>
    <td rowspan=1><i><b>example</b></i></td>
    <td><i>0, 1, ...</i></td>
    <td>The indentifier of the example within the example set</td>
  </tr>
     <tr>
    <td rowspan=2><i><b>simulator</b></i></td>
    <td rowspan=2><i>&lt;main panel&gt;:&lt;details panel&gt;</i></td>
    <td>&lt;main panel&gt; can be:
    <ul>
    <li>microcode &rarr; to show the circuit panel.
    <li>assembly   &rarr; to show the assembly panel. 
    </ul>
    </td>
  </tr>
  <tr>
    <td>&lt;details panel&gt; can be:
       <ul>
       <li><i>registers</i>       &rarr; register file.
       <li><i>control_memory</i>  &rarr; control memory.
       <li><i>memory</i>          &rarr; memory.
       <li><i>keyboard</i>        &rarr; keyboard and screen.
       <li><i>ledmatrix</i>       &rarr; led-matrix.
       <li><i>3dled</i>           &rarr; 3d-led panel.
      </ul>
    </td>
  </tr>
  <tr>
    <td rowspan=1><i><b>checkpoint</b></i></td>
    <td><i>&lt;URL&gt;</i></td>
    <td>URL pointing to the checkpoint to be loaded</td>
  </tr>
  <tr>
    <td rowspan=2><i><b>notify</b></i></td>
    <td><i>true</i></td>
    <td>Show a dialog-box with the preloaded actions (default)</td>
  </tr>
  <tr>
    <td><i>false</i></td>
    <td>Don't show a dialog-box with the preloaded actions</td>
  </tr>
 </table>
</html>

But there is one more argument that can be added: ***asm***
***asm*** contains the assembly code to be loaded from the URL.

This assembly code can be obtained from the ***share*** option in the "Load/Save" dialog-box:
![screen:example1](https://raw.githubusercontent.com/wepsim/wepsim/master/images/simulator/simulator025.jpg)

This argument can be combined with the example argument so the assembly code in the URL is loaded instead of the assembly code in the example.

For example, the following link loads the RISC-V assembly code for the factorial and with the keyboard and screen detail panel:
<html>
<center>
 <table width="75%" border="2">
  <tr><td>
<a href="https://wepsim.github.io/wepsim/ws_dist/?mode=ep&examples_set=RISCV&example=14&simulator=assembly:keyboard&asm=FAYlAIHUFMAcGUCSBZcAKAFgFy7AzgFwD0RA7nHgJYC2AdAOaVYYCuARrZQPZkU1EBKUMGC0A1gBMAhlinBwCgG7QAxli4AnAgtqlNE8AFoAjPIXmLOvRoMmzly7v3gNWAPp4AnnhHis0AA8sYC88N1hXDywtcAAbSnMA4wVTBzT4xIAGBUz7NPM2aABHBQCAJgA2cADs6AA7CVT8tgBWbVi2RLKAdnBMtHKKoXzLQpLqnurahqaRhS4WLFLJzKTM9byRqQkDCarB6tm5sdLsqYVWzYV6xu08DWhgkO9wyMo6rHaE0uSjkZBwLAWHgMG42J5-GgAOQAHUyUOGcwUeE6pz6aDwsERSLw7GRsHAmMOVzSbHo0GW+2ybAAzCSHBkfgooYYofTLAsloccmsNkiFIzuUY-vlqCxYpS9sSRrTtACgSCwRDoGgHtQBgAaYyZAQAagALAAObFzAEBcAAXnAEkoik12pNI0FSXA2vZFjVy16ByS7vMNsUkp9IvS325Rr9Cm2u3K3smvv5cTDLpDDhRXV6-UxjvyuNRRKJCf5bDqFKlNXAtPZADMaXLARp3u48NF3vQMVjI+Bo-jCQSi0iOhn0dmuycJt7stWyl3OV6+rzconxxXzrWa2U7g8nuZIqFtAoAcZaIZCd4VFJYrEuz2pVJsjUu87Jvqx8Uo3HeqFXs3ok-k5MqajO+3afmeYQRO4TZdvcjy+P4QTANWUhqJolCXgQfoAngUjKC4UgaoS2RSA04BcKWcRcBeEqKFIjZSGwsQUuR4DMBSLYoWI4DVhoUjUNAfrRgkBYEiYM44qQu5SOAhodjmlh4JJyLZPqcmCTswnZESr5YeAlDVug97gAAPOAZQCC4jwsBodSun6GQBC0Zl+mSZZGVg1JuNAsR4AJg5hkZyQuSBFYVmwXnVj4SIAvphnZAAfFa5mWVg1m2UZABU3Eoeo9GxGg94mNi4Xeb5dxKd22SGKpeA6upNqVY1dhIgAVpeTLIaheX2RVWDJNVGJ1UiYoSo17mmLpDwtpoFJsYSsgqFxPF8X5FwRYQAoVbxMlqYOFW1eANWdkiQl9mdxgzpNVk2X6LUaPhIh5NQUjvNoulGVanW5eh+UtPJFiMkZLS3e1LpfWhl4iNFDZNm4TZoH1-3mIDvRAdc1HXrpgRMPZCRSKjS5zKol6Y0AA">https://wepsim.github.io/wepsim/ws_dist/?mode=ep&examples_set=RISCV&example=14&simulator=assembly:keyboard&asm=FAYlAIHUFMAcGUCSBZcAKAFgFy7AzgFwD0RA7nHgJYC2AdAOaVYYCuARrZQPZkU1EBKUMGC0A1gBMAhlinBwCgG7QAxli4AnAgtqlNE8AFoAjPIXmLOvRoMmzly7v3gNWAPp4AnnhHis0AA8sYC88N1hXDywtcAAbSnMA4wVTBzT4xIAGBUz7NPM2aABHBQCAJgA2cADs6AA7CVT8tgBWbVi2RLKAdnBMtHKKoXzLQpLqnurahqaRhS4WLFLJzKTM9byRqQkDCarB6tm5sdLsqYVWzYV6xu08DWhgkO9wyMo6rHaE0uSjkZBwLAWHgMG42J5-GgAOQAHUyUOGcwUeE6pz6aDwsERSLw7GRsHAmMOVzSbHo0GW+2ybAAzCSHBkfgooYYofTLAsloccmsNkiFIzuUY-vlqCxYpS9sSRrTtACgSCwRDoGgHtQBgAaYyZAQAagALAAObFzAEBcAAXnAEkoik12pNI0FSXA2vZFjVy16ByS7vMNsUkp9IvS325Rr9Cm2u3K3smvv5cTDLpDDhRXV6-UxjvyuNRRKJCf5bDqFKlNXAtPZADMaXLARp3u48NF3vQMVjI+Bo-jCQSi0iOhn0dmuycJt7stWyl3OV6+rzconxxXzrWa2U7g8nuZIqFtAoAcZaIZCd4VFJYrEuz2pVJsjUu87Jvqx8Uo3HeqFXs3ok-k5MqajO+3afmeYQRO4TZdvcjy+P4QTANWUhqJolCXgQfoAngUjKC4UgaoS2RSA04BcKWcRcBeEqKFIjZSGwsQUuR4DMBSLYoWI4DVhoUjUNAfrRgkBYEiYM44qQu5SOAhodjmlh4JJyLZPqcmCTswnZESr5YeAlDVug97gAAPOAZQCC4jwsBodSun6GQBC0Zl+mSZZGVg1JuNAsR4AJg5hkZyQuSBFYVmwXnVj4SIAvphnZAAfFa5mWVg1m2UZABU3Eoeo9GxGg94mNi4Xeb5dxKd22SGKpeA6upNqVY1dhIgAVpeTLIaheX2RVWDJNVGJ1UiYoSo17mmLpDwtpoFJsYSsgqFxPF8X5FwRYQAoVbxMlqYOFW1eANWdkiQl9mdxgzpNVk2X6LUaPhIh5NQUjvNoulGVanW5eh+UtPJFiMkZLS3e1LpfWhl4iNFDZNm4TZoH1-3mIDvRAdc1HXrpgRMPZCRSKjS5zKol6Y0AA</a>
  </td></tr>
 </table>
 </center>
</html>

For example, the following link loads the RISC-V assembly code for the factorial and shows the Elemental Processor and the register detail panel:
<html>
<center>
 <table width="75%" border="2">
  <tr><td>
<a href="https://wepsim.github.io/wepsim/ws_dist/?mode=ep&examples_set=RISCV&example=14&simulator=microcode:registers&asm=FAYlAIHUFMAcGUCSBZcAKAFgFy7AzgFwD0RA7nHgJYC2AdAOaVYYCuARrZQPZkU1EBKUMGC0A1gBMAhlinBwCgG7QAxli4AnAgtqlNE8AFoAjPIXmLOvRoMmzly7v3gNWAPp4AnnhHis0AA8sYC88N1hXDywtcAAbSnMA4wVTBzT4xIAGBUz7NPM2aABHBQCAJgA2cADs6AA7CVT8tgBWbVi2RLKAdnBMtHKKoXzLQpLqnurahqaRhS4WLFLJzKTM9byRqQkDCarB6tm5sdLsqYVWzYV6xu08DWhgkO9wyMo6rHaE0uSjkZBwLAWHgMG42J5-GgAOQAHUyUOGcwUeE6pz6aDwsERSLw7GRsHAmMOVzSbHo0GW+2ybAAzCSHBkfgooYYofTLAsloccmsNkiFIzuUY-vlqCxYpS9sSRrTtACgSCwRDoGgHtQBgAaYyZAQAagALAAObFzAEBcAAXnAEkoik12pNI0FSXA2vZFjVy16ByS7vMNsUkp9IvS325Rr9Cm2u3K3smvv5cTDLpDDhRXV6-UxjvyuNRRKJCf5bDqFKlNXAtPZADMaXLARp3u48NF3vQMVjI+Bo-jCQSi0iOhn0dmuycJt7stWyl3OV6+rzconxxXzrWa2U7g8nuZIqFtAoAcZaIZCd4VFJYrEuz2pVJsjUu87Jvqx8Uo3HeqFXs3ok-k5MqajO+3afmeYQRO4TZdvcjy+P4QTANWUhqJolCXgQfoAngUjKC4UgaoS2RSA04BcKWcRcBeEqKFIjZSGwsQUuR4DMBSLYoWI4DVhoUjUNAfrRgkBYEiYM44qQu5SOAhodjmlh4JJyLZPqcmCTswnZESr5YeAlDVug97gAAPOAZQCC4jwsBodSun6GQBC0Zl+mSZZGVg1JuNAsR4AJg5hkZyQuSBFYVmwXnVj4SIAvphnZAAfFa5mWVg1m2UZABU3Eoeo9GxGg94mNi4Xeb5dxKd22SGKpeA6upNqVY1dhIgAVpeTLIaheX2RVWDJNVGJ1UiYoSo17mmLpDwtpoFJsYSsgqFxPF8X5FwRYQAoVbxMlqYOFW1eANWdkiQl9mdxgzpNVk2X6LUaPhIh5NQUjvNoulGVanW5eh+UtPJFiMkZLS3e1LpfWhl4iNFDZNm4TZoH1-3mIDvRAdc1HXrpgRMPZCRSKjS5zKol6Y0AA">https://wepsim.github.io/wepsim/ws_dist/?mode=ep&examples_set=RISCV&example=14&simulator=microcode:registers&asm=FAYlAIHUFMAcGUCSBZcAKAFgFy7AzgFwD0RA7nHgJYC2AdAOaVYYCuARrZQPZkU1EBKUMGC0A1gBMAhlinBwCgG7QAxli4AnAgtqlNE8AFoAjPIXmLOvRoMmzly7v3gNWAPp4AnnhHis0AA8sYC88N1hXDywtcAAbSnMA4wVTBzT4xIAGBUz7NPM2aABHBQCAJgA2cADs6AA7CVT8tgBWbVi2RLKAdnBMtHKKoXzLQpLqnurahqaRhS4WLFLJzKTM9byRqQkDCarB6tm5sdLsqYVWzYV6xu08DWhgkO9wyMo6rHaE0uSjkZBwLAWHgMG42J5-GgAOQAHUyUOGcwUeE6pz6aDwsERSLw7GRsHAmMOVzSbHo0GW+2ybAAzCSHBkfgooYYofTLAsloccmsNkiFIzuUY-vlqCxYpS9sSRrTtACgSCwRDoGgHtQBgAaYyZAQAagALAAObFzAEBcAAXnAEkoik12pNI0FSXA2vZFjVy16ByS7vMNsUkp9IvS325Rr9Cm2u3K3smvv5cTDLpDDhRXV6-UxjvyuNRRKJCf5bDqFKlNXAtPZADMaXLARp3u48NF3vQMVjI+Bo-jCQSi0iOhn0dmuycJt7stWyl3OV6+rzconxxXzrWa2U7g8nuZIqFtAoAcZaIZCd4VFJYrEuz2pVJsjUu87Jvqx8Uo3HeqFXs3ok-k5MqajO+3afmeYQRO4TZdvcjy+P4QTANWUhqJolCXgQfoAngUjKC4UgaoS2RSA04BcKWcRcBeEqKFIjZSGwsQUuR4DMBSLYoWI4DVhoUjUNAfrRgkBYEiYM44qQu5SOAhodjmlh4JJyLZPqcmCTswnZESr5YeAlDVug97gAAPOAZQCC4jwsBodSun6GQBC0Zl+mSZZGVg1JuNAsR4AJg5hkZyQuSBFYVmwXnVj4SIAvphnZAAfFa5mWVg1m2UZABU3Eoeo9GxGg94mNi4Xeb5dxKd22SGKpeA6upNqVY1dhIgAVpeTLIaheX2RVWDJNVGJ1UiYoSo17mmLpDwtpoFJsYSsgqFxPF8X5FwRYQAoVbxMlqYOFW1eANWdkiQl9mdxgzpNVk2X6LUaPhIh5NQUjvNoulGVanW5eh+UtPJFiMkZLS3e1LpfWhl4iNFDZNm4TZoH1-3mIDvRAdc1HXrpgRMPZCRSKjS5zKol6Y0AA</a>
  </td></tr>
 </table>
 </center>
</html>


<a name="wepsim-apache-cordova"/>

## WepSIM for Apache Cordova

### 1) Prepare the Apache Cordova Project:

+ 1.1) Follow Apache Cordova tutorial in order to create a new project:
```bash
npm install -g cordova
cordova create wepsim es.uc3m.inf.arcos.wepsim WepSIM
cd wepsim
cordova platform add android
cordova platform add ios
```

+ 1.2) Install at least the following plugins:
```bash
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-dialogs
cordova plugin add https://github.com/apache/cordova-plugin-file-transfer.git
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-web-share
```

### 2) Update WepSIM files:

+ 2.1) Copy WepSIM files into the www directory:
```bash
wget https://github.com/wepsim/wepsim/archive/refs/heads/master.zip
unzip master.zip
```

+ 2.2) Build www for the Apache Cordova project:
```bash
./wepsim-master/devel/mk_cordova.sh
```

### 3) Build Android .apk:

+ 3.1) Build .apk:
```bash
cordova build android --debug
```

+ 3.2.a) Run WepSIM's App on Emulator:
```bash
cordova run android
```

+ 3.2.b) Run WepSIM's App on Device:
```bash
adb -d install -r ./platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

