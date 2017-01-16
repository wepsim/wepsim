
    var tut_welcome = new Array();

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Welcome...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100'></td>" +
                                  "<td>" +
                                  "Welcome to WepSIM simulator!<br>" + 
                                  "<br>" +
                                  "To begin with WepSIM, you might click in the menu button." +
                                  "</td>" +
                                  "</tr>" +
                                  "</table>",
                     code_pre:    function() { $('#menu1').click(); },
                     code_post:   function() { $('#menu1').click(); },
                     wait_next:   1500
                  });

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Load example...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100px'></td>" +
                                  "<td>" +
                                  "In order to load some example you have to:<br>" + 
                                  "a) Click in the example button, then<br>" +
                                  "b) Click in the 'title' name of the example.<br>" +
                                  "<br>" +
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
                                  },
                     wait_next:   1200
                  });

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Execute the example...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100px'></td>" +
                                  "<td>" +
                                  "Once the example is loaded we come back to the simulator to run the example:<br>" + 
                                  "a) Click on next microinstruction to see each cycle signals.<br>" +
                                  "<br>" +
                                  "Please see how signals change in the processor/control_unit diagram in three clock cycles." +
                                  "</td>" +
                                  "</tr>" +
                                  "</table>",
                     code_pre:    function() {  },
                     code_post:   function() {
                                      wepsim_execute_microinstruction() ;
                                      setTimeout(function() { 
                                              wepsim_execute_microinstruction() ;
					      setTimeout(function() { 
						      wepsim_execute_microinstruction() ;
						      setTimeout(function() { 
							   wepsim_execute_microinstruction() ;
						      }, 800) ;
					      }, 800) ;
                                      }, 800) ;
                                  },
                     wait_next:   2500
                  });

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Configuration...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100'></td>" +
                                  "<td>" +
                                  "If you want to configure the simulator:<br>" + 
                                  "a) Click in the menu again, then<br>" +
                                  "b) Click in the configuration button...<br>" +
                                  "<br>" +
                                  "We are going to show the configuration popup in next step for two seconds." +
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
                                  },
                     wait_next:   3200
                  });

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Help...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100'></td>" +
                                  "<td>" +
                                  "If you want additional help for the simulator:<br>" + 
                                  "a) Click in the menu again, then<br>" +
                                  "b) Click in the green help button...<br>" +
                                  "<br>" +
                                  "We are going to show the help popup in next step for two seconds." +
                                  "</td>" +
                                  "</tr>" +
                                  "</table>",
                     code_pre:    function() { $('#menu1').click(); },
                     code_post:   function() { 
                                      $('#menu1').click(); 
                                      setTimeout(function() { 
                                              wepsim_open_help_index();
					      setTimeout(function() { 
                                                   wepsim_close_help(); 
					      }, 2000) ;
                                      }, 1000) ;
                                  },
                     wait_next:   3200
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
                     code_post:   function() {  },
                     wait_next:   1000
                  });

