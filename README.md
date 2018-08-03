# WepSIM: Simulator of Elemental Processor 


[![Build Status](https://travis-ci.org/acaldero/wepsim.svg?branch=master)](https://travis-ci.org/acaldero/wepsim)
[![Maintainability](https://api.codeclimate.com/v1/badges/9efc2957158b5c67f775/maintainability)](https://codeclimate.com/github/acaldero/wepsim/maintainability)
 [![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
 

+ WepSIM Simulator Source Code:

   * https://github.com/acaldero/wepsim

+ Get WepSIM Simulator:

   * on-line => Web version (Google Chrome 65+, Mozilla Firefox 60+, Microsoft Edge 40+, and Apple Safari 11+):
     * Release version: https://wepsim.github.io/wepsim
     * Nightly build: https://acaldero.github.io/wepsim

   * off-line => Install WepSIM:
     * Install on Android 5.0+: <br/> 
https://play.google.com/store/apps/details?id=es.uc3m.inf.arcos.wepsim

     * Install WepSIM on iOS/Android as Progressive Web Application:

       1 Once the https://acaldero.github.io/wepsim is loaded in Safari (iOS, MacOS) or Chrome (Android, Windows, Linux), from the top-right corner tap on the share icon (Safari) or the menu icon (Chrome). <br>
       2 Move within share options until 'add to home screen' option and click on it. <br>
       3 Then click in the 'add' option. <br>
       4 Finally WepSIM can be launched from the home screen icon.

Step   | iOS                       |  Android
------:|:-------------------------:|:-------------------------:
1    | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios001.jpg){width=480} | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android001.jpg) {width=480}
2    | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios002.jpg =480x) | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android002.jpg =480x)
3    | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios003.jpg =480x) | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android003.jpg =480x)
4    | ![screen:pwa_ios](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_ios004.jpg =480x) | ![screen:pwa_android](https://raw.githubusercontent.com/acaldero/wepsim/master/help/pwa/pwa_android004.jpg =480x)         


+ Quick Start:

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

+ Main configuration options:

   + From the general toolbar, the configuration button let users to personalize several options:
     ![screen:configuration](https://raw.githubusercontent.com/acaldero/wepsim/master/help/welcome/config_usage.gif)
   + From the general toolbar, please use the left-upper slider to change the CPU/CU size:
     ![screen:configuration](https://raw.githubusercontent.com/acaldero/wepsim/master/help/simulator/simulator013.jpg)
   + From the execution toolbar, clicking over the 'state' button to show the state manager:
     ![screen:configuration](https://github.com/acaldero/wepsim/blob/master/help/welcome/states_usage.gif)

