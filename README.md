
# WepSIM: Simulator of Elemental Processor 

[![Build Status](https://travis-ci.org/acaldero/wepsim.svg?branch=master)](https://travis-ci.org/acaldero/wepsim)
[![Maintainability](https://api.codeclimate.com/v1/badges/9efc2957158b5c67f775/maintainability)](https://codeclimate.com/github/acaldero/wepsim/maintainability)
 [![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
 
## Table of contents

- [Getting WepSIM](#get-wepsim)
- [Install WepSIM as Progressive Web Application](#get-wepsim-pwa)
- [Getting Started](#quick-start)

## Getting WepSIM

+ Web version (Google Chrome 65+, Mozilla Firefox 60+, Microsoft Edge 40+, and Apple Safari 11+):
     * Release version: **https://wepsim.github.io/wepsim**
     * Nightly build: https://acaldero.github.io/wepsim

+ Android version (Android 5.0+):
     * Install from: https://play.google.com/store/apps/details?id=es.uc3m.inf.arcos.wepsim

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
