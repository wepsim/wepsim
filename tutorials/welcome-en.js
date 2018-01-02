
    tutorials.welcome.en = [] ;

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "Welcome to the WepSIM simulator!",
                     message:     "<img src='help/simulator/simulator012.jpg' style='width:100%; max-height:50vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "This brief tutorial is going to show you how to:" +
                                  "<ol>" +
                                  "<li>Load an example.</li>" +
                                  "<li>Execute an example.</li>" +
                                  "<li>Configure the simulation.</li>" +
                                  "<li>Get help.</li>" +
                                  "</ol>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "The menu button",
                     message:     "<img src='tutorials/welcome/menu_open.gif' style='max-height:50vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "On the top, it let you access to the microcode editor, the assembly editor, and the simulation screen. " + 
                                  "On the bottom, help, examples, and the configuration dialogs." +
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "How to load some example.",
                     message:     "<img src='tutorials/welcome/example_usage.gif' style='width:100%; max-height:60vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "Click in the menu button and then in the example button, <br>then click in the example 'title' name." +
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "How to execute an example.",
                     message:     "<img src='tutorials/welcome/simulation_xinstruction.gif' style='width:100%; max-height:60vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "Click on next instruction/microinstruction to execute step by step. <br>" + 
		                  "Click on run button to execute until the first breakpoint or the end of the assembly program." +
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "How to configure WepSIM.",
                     message:     "<img src='tutorials/welcome/config_usage.gif' style='width:100%; max-height:60vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "Click in the menu again, then click in the configuration button." +
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "How to get the basic help.",
                     message:     "<img src='tutorials/welcome/help_usage.gif' style='width:100%; max-height:60vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "Click in the menu again, <br>then click in the green help button.<br>" +
                                  "You can get Spanish/English version, go to the help index, or close the help popup." +
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() { },
                     code_post:   function() { },
                     wait_next:   100
                  });

    tutorials.welcome.en.push({
                     id:          "welcome",
                     title:       "Welcome to WepSIM!",
                     message:     "<img src='tutorials/welcome/help_usage.gif' style='width:100%; max-height:60vh'>" +
                                  "<br>" +
                                  "<h4>" +
                                  "<br>" +
                                  "Please explorer the help sections for more information. <br>" + 
                                  "If you click on the end button of the tutorial then WepSIM is going to load the first example for you. Enjoy!" + 
                                  "<br>" +
                                  "</h4>",
                     code_pre:    function() {  },
                     code_post:   function() {
                                      load_from_example_firmware("S1E1", true);
                                  },
                     wait_next:   100
                  });

