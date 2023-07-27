
# Changelog

## 2.2.2 -> 2.3.0:
* Main improvements:
  * Migration to bootstrap 5.3 colors and dark mode
  * Support added for firmware version 2
* Main external dependencies updated:
  * Bump bootstrap   from 5.2.3 to 5.3.1
  * Bump jquery      from 3.6.0 to 3.7.0
  * Bump introjs     from 4.3.0 to 7.0.1
  * Bump fontawesome from 6.2.1 to 6.4.0

## 2.2.1 -> 2.2.2:
* Main improvements:
  * Initial support for 32-bits floating point ALU
  * Share by link improved
  * Several minor improvements
* Main external dependencies updated:
  * Bump bootbox     from 5.5.3 to 6.0.0
  * Bump fontawesome from 6.2.0 to 6.2.1

## 2.2.0 -> 2.2.1:
* Main improvements:
  * Examples updated
  * Initial version of a single L1 cache simulator
  * Minor bugfixes
* Main external dependencies updated:
  * Bump bootstrap from 5.2.0 to 5.2.3

## 2.1.9 -> 2.2.0:
* Main improvements:
  * Skip "notify:" added to configuration options.
  * New Hardware Performance Counter added.
  * Examples updated
* Minor bugs fixed and several refinements added:
  * Translation into Chinesse improved thanks to https://github.com/shiptux
  * Replace + find operations added to Codemirror editor
* Main external dependencies updated:
  * Bump bootstrap   from 4.6.1  to 5.2.0
  * Bump fontawesome from 5.15.4 to 6.2.0

## 2.1.8 -> 2.1.9:
* Main improvements:
  * Improved example dialog box
* Minor bugs fixed and several refinements added:
  * Examples has been reorganized
* Main external dependencies updated:
  * Bump bootstrap   from 4.6.1  to 5.2.0 beta 1
  * Bump async       from 3.0.0  to 3.2.2

## 2.1.7 -> 2.1.8:
* Main improvements:
  * Adapting WepSIM to Bootstrap 5.x
  * Representation of processor as text table is now a little bit faster.
* Minor bugs fixed and several refinements added.
  * Unlimited instruction/clock cycles now works
  * Bootstrap color picker replace the old spectrum color picker
* Main external dependencies updated:
  * Bump bootstrap   from 4.6.1  to 5.2.0 beta 1
  * Bump bootbox     from 5.5.2  to 5.5.3

## 2.1.6 -> 2.1.7:
* New:
  * Processor represented also as text table.
  * Quick config for processor panel.
* Minor bugs fixed and several refinements added:
  * More UI text translated.
  * Updated detection of several activated tri-states
* Main external dependencies updated:
  * Bump bootstrap   from 4.6.0  to 4.6.1
  * Bump introjs     from 4.1.0  to 4.3.0
  * Bump codemirror  from 5.52.2 to 5.65.0
  * Bump fontawesome from 5.8.1  to 5.15.4

## 2.1.5 -> 2.1.6:
* Several minor improvements on RISC-V examples
* Reworked "Hardware" detail panel and hardware help
* New options for the command-line WepSIM:
  * New "show-microcode-fields" option
  * New help option for listing hardware elements
  * New help option for one hardware element
* Minor bugs fixed and several refinements added.

## 2.1.4 -> 2.1.5:
* Initial support for a compact description for each instruction
* knockoutjs replaced by vuex v3.6.0 + vue.js v2.6.12 
* Minor bugs fixed and several refinements added.

## 2.1.3 -> 2.1.4:
* Special comments in assembly:
  * "# state:" now saves the state
  * "# notify: lorem ipsum" to show a dialog box
* Interactive mode added to command-line
* Minor bugs fixed and several refinements added.

## 2.1.2 -> 2.1.3:
* Bump bootstrap from 4.5.2 to 4.5.3
* Improved register file panel
* Reworked "Memory" detail panel
* Minor bugs fixed and several refinements added.

## 2.1.1 -> 2.1.2:
* Bump bootstrap from 4.5.0 to 4.5.2
* Examples sets dropdown: able to change the examples to be used.
* Register section in firmware now supports several names for one register: 0=[zero, x0],
* Initial support for interactive command-line version.
* Minor bugs fixed and several refinements added.

## 2.1.0 -> 2.1.1:
* Command line version move from 'conversational parameters' to 'switched parameters':
  From: ./wepsim.sh    run    ep    microcode.txt    assembly.txt
  To:   ./wepsim.sh -a run -m ep -f microcode.txt -s assembly.txt
  We write little bit more but we get more flexibility in orden, combine options, etc.
* The examples microcode has been simplified.
* Minor bugs fixed and several refinaments added.

## 2.0.12 -> 2.1.0:
* Re-designed from scratch:
  * Modals (dialogs) engine
  * Main UI elements based on Web Components
* Minor bugs fixed and several refinaments added:
  * Reload dialog added (for recovering examples, configuration and processors)
  * Support for defining set of examples
* Main external dependencies updated:
  * Bootstrap   updated to bootstrap-4.5.0
  * Knockout    updated to knockout-3.5.1
  * CodeMirror  updated to codemirror-5.52.2
  * Vis-network updated to vis-network-7.6.10

## 2.0.11 -> 2.0.12:
* Update to bootstrap 4.4.1
* "# notify: lorem ipsum" in microcode added ("interactive" mode no longer required)
* "# state:" in microcode now shows saved states from microcode
* Native execution shows current instruction properly

## 2.0.10 -> 2.0.11:
* Dark Mode
* Initial support for RISC-V
* Initial support for Z80-like

## 2.0.9 -> 2.0.10:
* Fix pseudo-instruction 'li' in 'Subrutine' example.
* Improved command-line version: faster and more modular code.
* Added support for translating an instruction set (JSON) into native microcode.
* Improved UI for common tasks: quick links in the hardware dropdown and in the assembly initial text.

## 2.0.8 -> 2.0.9:
* Interface:
   + Notifications: 
      * Added action to clear all notifications.
      * Show/hide timestamps.
   + Configuration: 
      * Introduced the Student (simple) & Teacher (full) views.
      * By default breakpoints works in both, microcode and assembly code.
   + Details dropdown: Simulation section added:
       * Microcode editor side-by-side with circuitery.
       * Summary of the processor model associated to the simulation.
* Core:
   + Configuration tries to resolve missing elements one by one (with default values).
   + Execution microinstruction by microinstruction a little bit more efficient.
   + Stack segment is shown in main memory details
   + Added more Idioms thanks to Google Translate.

## 2.0.7 -> 2.0.8:
* Improved UI
* Added translation for the simulator help and about dialog

## 2.0.6 -> 2.0.7:
* Core:
  * Revamped simcore_init_ui() API function: it now accepts callbacks functions to update UI.
  * Improved command line version: progressive output rather than wait to the end for the output.
* Interface:
  * New quick UI configuration for registers in the register file
  * Improved update-signal dialog
* Deployment:
  * Improved translation subsystem with i18n_builder.py script:
    ** Based on googletrans library (https://pypi.org/project/googletrans/), and Google Translate (https://translate.google.com/?hl=es).
    ** i18n_builder.py used for Italian + Korean + Hindi + Japanese + Portuguese + Chinese + French + German
  * Codacy + Codebeat

## 2.0.5 -> 2.0.6:
* Initial support for the WepSIM control API
* Initial support for recording
* Improved support for Checkpoint

## 2.0.3 -> 2.0.5:
* Initial support for Checkpoint
* Improved translation subsystem
* Improved preloaded work

## 2.0.2 -> 2.0.3:
* Initial support for preloading work
* Tutorials with initial index
* Improved translation

## 1.9.6 -> 2.0.2:
* Interface:
  + Bootstrap 4.3.1 (2019)
  + Improved missing UI translation in state dialog
* Content:
  + Improved POC processor examples
  + Added EP example: round-robin with two co-routines

## 1.9.5 -> 1.9.6:
* Interface:
  + Updated to the new Bootstrap 4.2.1
  + Added a new compact view for the main screen
  + Added a new quick interative signal updates
* Content:
  + New example added
  + Minor help updates
  + Examples' engine revamped internally
* Deployment:
  + Simpler deployment: packing into 'ws_dist' directory only
  + Boot time improved

## 1.9.3 -> 1.9.5:
* New panel with all notifications (in case you miss one)
* Signal description improved
* Improved voice support
* Formal introduction of the WepSIM engine API (example in README.md)
* Minor clean-up on external dependencies

## 1.9.2 -> 1.9.3:
* 'States' management revamped
* Packing in both, source directory and into the 'dist' directory

## 1.9.1 -> 1.9.2:
* Transition compleated: Jquery Mobile 1.4.5 (2014) => Bootstrap 4.1.3 (2018)
* CodeMirror updated up to 5.39.2
* Examples are loaded quicker than before

## 1.9.0 -> 1.9.1:
* Update Bootstrap up to 4.1.3
* Added a Proof-Of-Concept (poc) simulated hardware as example for possible modularity.

## 1.8.9 -> 1.9.0:
* Command line version added
* Example, help, and configuration dialog simplified
* Bugfixes: inertial scroll restored, button placement, etc.

## 1.8.7 -> 1.8.9:
* Update bootstrap 3.x -> 4.1
* Menu moved into a new toolbar
* Clarify the modularity of the Elemental Processor simulated

## 1.8.6 -> 1.8.7:
* Code refactoring
* More jshint recommendations
* More non-web tools support

## 1.8.5 -> 1.8.6:
* Progressive Wep Application added
* Travis-CI added
* Initial support for non-web tools
* Code Climate added
* Minor improvements on UI (bootstrap)

## 1.8.2 -> 1.8.5:
* ALU Flag is highlighted in a clock cycle if it is active
* New configuration option in order to limit the number of the assembly instructions executed
* Help on memory components has been improved
* New example, and many of them have been updated
* New stop icons
* Statistical information about instruction and clock cycles are now part of the "CPU Stats"
* Initial native mode support
* Initial deployment as Progressive Wep Application

## 1.8.1 -> 1.8.2:
* Added 'break:' and 'state:' actions at microcode level
* Updated 'notify:' for tutorials
* Links to the tutorials in help
* Added 'copy to clipboard' action to the current state dialog

## 1.8.0 -> 1.8.1:
* Colorized syntax
* Compact visualization controls
* Initial support for voice control

## 1.7.7 -> 1.8.0:
* Support for simple state inspection
* CPU behaviour has been slighly simplified
* Added support for FIRE_IFCHANGED
* Initial support for native in microcode
* Auto-assign 'co' value (free available) with co=111111

## 1.7.6 -> 1.7.7:
* Sticky segment name on memory visualization
* Improved full CPU image on help
* Initial support for promises on CLOCK

## 1.7.5 -> 1.7.6:
* Tutorials support (welcome tutorial as example)
* Several UI tweaks (slider positions, home help button, etc.)
* Help index translated (English/Spanish)
* Up to 50% faster than 1.7.5 in many examples
* Speed-up configuration is now persistent
* Labels are now shown in simulator Memory
* Instructions are now shown in simulator Control Memory

## 1.7.3 -> 1.7.5:
* Faster: Up to 3 times faster than 1.7.1 version!
* Easier: The new help center provides one place for all help
* Convenient: tables for compact and uniform help-examples-configuration visualization
* Signal dependencies graph included
* New addv+seqv example

## 1.7.2 -> 1.7.3:
* Up to 50% faster execution
* Edit register values popup shows negative values properly
* I/O tab renamed to Stats
* Improved Control Unit image

## 1.7.1 -> 1.7.2:
* FLAGS interaction moved from register tab into processor image (you can click on the associated letter C, V, N, Z...)
* Improved processor image
* Completed some signal drawing
* Try to avoid accidentally close the browser tab with WepSIM
* Register file' registers can be updated with negative values easier

## 1.7.0 -> 1.7.1:
* All register can be visualized and changed (not only the register file elements)
* English help on signals has been updated
* Some examples has been updated
* CPU/CU slider position now is saved (for next executions)
* Console font for binary visualization (same size for ones and zeroes)
* Centered knob in multi-bit values selection
* IO device can be configured programmatically

