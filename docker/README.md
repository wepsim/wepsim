
# WepSIM: Web Elemental Processor Simulator

![Build Status](https://github.com/acaldero/wepsim/actions/workflows/ci-dist.yml/badge.svg)
[![Maintainability](https://qlty.sh/gh/acaldero/projects/wepsim/maintainability.svg)](https://qlty.sh/gh/acaldero/projects/wepsim)
[![DeepSource](https://app.deepsource.com/gh/acaldero/wepsim.svg/?label=resolved+issues&show_trend=false&token=Re_wpCMdTb3y7nP4XtfWeKIY)](https://app.deepsource.com/gh/acaldero/wepsim/)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
[![Release](https://img.shields.io/badge/Stable-2.6.0-green.svg)](https://github.com/wepsim/wepsim/releases/tag/v2.6.0)


## Executing

* Example for running some work and showing the console output after execution:
  ```bash
   ./docker/wepsim-cli.sh -a show-console -m ep -f ./repo/microcode/rv32/ep_mix2_l3.mc -s ./repo/assembly/rv32/s2e5.asm
  ```

* Example for running some work and showing the final state:
  ```bash
   ./docker/wepsim-cli.sh -a run          -m ep -f ./repo/microcode/rv32/ep_mix2_l3.mc -s ./repo/assembly/rv32/s2e5.asm
  ```
  And from a checkpoint:
  ```bash
   ./docker/wepsim-cli.sh -a run  --checkpoint ./repo/checkpoint/tutorial_1.txt
  ```

* Example for running some work and showing the modified state on each assembly instruction executed:
  ```bash
   ./docker/wepsim-cli.sh -a stepbystep   -m ep -f ./repo/microcode/rv32/ep_mix2_l3.mc -s ./repo/assembly/rv32/s2e5.asm
  ```
  And from a checkpoint:
  ```bash
   ./docker/wepsim-cli.sh -a stepbystep --checkpoint ./repo/checkpoint/tutorial_1.txt
  ```

* Example for running some work and showing the modified state on each microinstruction executed:
  ```bash
   ./docker/wepsim-cli.sh -a microstepbymicrostep -m ep -f ./repo/microcode/rv32/ep_mix2_l3.mc -s ./repo/assembly/rv32/s2e5.asm
  ```

* Example for running in an interactive mode:
  ```bash
   ./docker/wepsim-cli.sh -a interactive --checkpoint ./repo/checkpoint/tutorial_1.txt
  ```


## Checkpoint

### Building a checkpoint file

* Example of building from assembly and microcode, and print it to standard output:
  ```bash
  ./docker/wepsim-cli.sh -a build-checkpoint -m ep -f ./repo/microcode/rv32/ep_mix2_l3.mc -s ./repo/assembly/rv32/s2e5.asm
  ```

### Disassembling a checkpoint file

 * Example that shows assembly within checkpoint:
   ```bash
   ./docker/wepsim-cli.sh -a show-assembly  --checkpoint ./repo/checkpoint/tutorial_1.txt
   ```

 * Show microcode within checkpoint:
   ```bash
   ./docker/wepsim-cli.sh -a show-microcode --checkpoint ./repo/checkpoint/tutorial_1.txt
   ```

 * Show mode used in the checkpoint:
   ```bash
   ./docker/wepsim-cli.sh -a show-mode      --checkpoint ./repo/checkpoint/tutorial_1.txt
   ```

