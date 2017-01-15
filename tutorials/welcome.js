
    var tut_welcome = new Array();

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Welcome...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100'></td>" +
                                  "<td>" +
                                  "Welcome to WepSIM simulator!<br><br>" + 
                                  "To begin with WepSIM, you might click in the menu button..." +
                                  "</td>" +
                                  "</tr>" +
                                  "</table>",
                     code_pre:    function() { $('#menu1').click(); },
                     code_post:   function() { $('#menu1').click(); }
                  });

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Load example...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100px'></td>" +
                                  "<td>" +
                                  "...And you can load some example to play with.<br><br>" + 
                                  "Please, click in the example button," +
                                  "and click in the 'title' name of the example.<br><br>" +
                                  "We are going to load the first one in this tutorial in next step." +
                                  "</td>" +
                                  "</tr>" +
                                  "</table>",
                     code_pre:    function() {  },
                     code_post:   function() { 
                                      wepsim_open_examples_index(); 
                                      setTimeout(function() { 
                                           load_from_example_firmware("S1E1", true); 
                                      }, 1000) ;
                                  }
                  });

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Execute the example...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100px'></td>" +
                                  "<td>" +
                                  "...Once the example is loaded we come back to the simulator.<br><br>" + 
                                  "Then we can start the simulation.<br>" +
                                  "Click on next instruction, next microinstruction..." +
                                  "</td>" +
                                  "</tr>" +
                                  "</table>",
                     code_pre:    function() {  },
                     code_post:   function() {
                                      wepsim_execute_microinstruction() ;
                                      setTimeout(function() { 
                                           wepsim_execute_microinstruction() ;
                                      }, 500) ;
                                  }
                  });

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Configuration...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100'></td>" +
                                  "<td>" +
                                  "If you want to configure the simulator,<br><br>" + 
                                  "just click in the menu again, and then in the configuration button..." +
                                  "</td>" +
                                  "</tr>" +
                                  "</table>",
                     code_pre:    function() { $('#menu1').click(); },
                     code_post:   function() { 
                                      $('#menu1').click(); 
                                      setTimeout(function() { 
					      $('#config1').popup('open') ;
					      setTimeout(function() { 
					           $('#config1').popup('close') ;
					      }, 2000) ;
                                      }, 1000) ;
                                  }
                  });

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Welcome...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100'></td>" +
                                  "<td>" +
                                  "Please explorer the help section for more information!<br><br>" + 
                                  "</td>" +
                                  "</tr>" +
                                  "</table>",
                     code_pre:    function() {  },
                     code_post:   function() {  }
                  });

