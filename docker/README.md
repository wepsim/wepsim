
# WepSIM: Web Elemental Processor Simulator

![Build Status](https://github.com/acaldero/wepsim/actions/workflows/ci-dist.yml/badge.svg)
[![Maintainability](https://qlty.sh/gh/acaldero/projects/wepsim/maintainability.svg)](https://qlty.sh/gh/acaldero/projects/wepsim)
[![DeepSource](https://app.deepsource.com/gh/acaldero/wepsim.svg/?label=resolved+issues&show_trend=false&token=Re_wpCMdTb3y7nP4XtfWeKIY)](https://app.deepsource.com/gh/acaldero/wepsim/)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
[![Release](https://img.shields.io/badge/Stable-2.6.0-green.svg)](https://github.com/wepsim/wepsim/releases/tag/v2.6.0)


## Example

```bash
./docker/wepsim-cli.sh -a stepbystep \
                       -m ep \
		               -f ./repo/microcode/rv32/ep_mix2_l3.mc \
                       -s ./repo/assembly/rv32/s2e5.asm
```

