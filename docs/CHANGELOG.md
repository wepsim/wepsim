
1.9.6 -> 1.9.7:
* Interface:
  + Bootstrap 4.3.1 (2019)
  + Improved missing UI translation in state dialog
* Content:
  + Improved POC processor examples

1.9.5 -> 1.9.6:
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

1.9.3 -> 1.9.5:
* New panel with all notifications (in case you miss one)
* Signal description improved
* Improved voice support 
* Formal introduction of the WepSIM engine API (example in README.md) 
* Minor clean-up on external dependencies

1.9.2 -> 1.9.3:
* 'States' management revamped
* Packing in both, source directory and into the 'dist' directory

1.9.1 -> 1.9.2:
* Transition compleated: Jquery Mobile 1.4.5 (2014) => Bootstrap 4.1.3 (2018)
* CodeMirror updated up to 5.39.2
* Examples are loaded quicker than before

1.9.0 -> 1.9.1:
* Update Bootstrap up to 4.1.3
* Added a Proof-Of-Concept (poc) simulated hardware as example for possible modularity.

1.8.9 -> 1.9.0:
* Command line version added
* Example, help, and configuration dialog simplified
* Bugfixes: inertial scroll restored, button placement, etc.

1.8.7 -> 1.8.9:
* Update bootstrap 3.x -> 4.1
* Menu moved into a new toolbar
* Clarify the modularity of the Elemental Processor simulated

1.8.6 -> 1.8.7:
* Code refactoring
* More jshint recommendations
* More non-web tools support

1.8.5 -> 1.8.6:
* Progressive Wep Application added
* Travis-CI added
* Initial support for non-web tools
* Code Climate added
* Minor improvements on UI (bootstrap)

1.8.2 -> 1.8.5:
* ALU Flag is highlighted in a clock cycle if it is active
* New configuration option in order to limit the number of the assembly instructions executed
* Help on memory components has been improved
* New example, and many of them have been updated
* New stop icons
* Statistical information about instruction and clock cycles are now part of the "CPU Stats"
* Initial native mode support
* Initial deployment as Progressive Wep Application

1.8.1 -> 1.8.2:
* Added 'break:' and 'state:' actions at microcode level
* Updated 'notify:' for tutorials
* Links to the tutorials in help 
* Added 'copy to clipboard' action to the current state dialog

1.8.0 -> 1.8.1:
* Colorized syntax
* Compact visualization controls
* Initial support for voice control

1.7.7 -> 1.8.0:
* Support for simple state inspection
* CPU behaviour has been slighly simplified
* Added support for FIRE_IFCHANGED
* Initial support for native in microcode
* Auto-assign 'co' value (free available) with co=111111

1.7.6 -> 1.7.7:
* Sticky segment name on memory visualization
* Improved full CPU image on help
* Initial support for promises on CLOCK

1.7.5 -> 1.7.6:
* Tutorials support (welcome tutorial as example)
* Several UI tweaks (slider positions, home help button, etc.)
* Help index translated (English/Spanish)
* Up to 50% faster than 1.7.5 in many examples
* Speed-up configuration is now persistent
* Labels are now shown in simulator Memory
* Instructions are now shown in simulator Control Memory

1.7.3 -> 1.7.5:
* Faster: Up to 3 times faster than 1.7.1 version!
* Easier: The new help center provides one place for all help
* Convenient: tables for compact and uniform help-examples-configuration visualization
* Signal dependencies graph included
* New addv+seqv example

1.7.2 -> 1.7.3:
* Up to 50% faster execution 
* Edit register values popup shows negative values properly
* I/O tab renamed to Stats
* Improved Control Unit image

1.7.1 -> 1.7.2:
* FLAGS interaction moved from register tab into processor image (you can click on the associated letter C, V, N, Z...)
* Improved processor image
* Completed some signal drawing
* Try to avoid accidentally close the browser tab with WepSIM
* Register file' registers can be updated with negative values easier

1.7.0 -> 1.7.1:
* All register can be visualized and changed (not only the register file elements)
* English help on signals has been updated
* Some examples has been updated
* CPU/CU slider position now is saved (for next executions)
* Console font for binary visualization (same size for ones and zeroes)
* Centered knob in multi-bit values selection
* IO device can be configured programmatically

