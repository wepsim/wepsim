
    var tut_welcome = new Array();

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Welcome...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100'></td>" +
                                  "<td>" +
                                  "Welcome to WepSIM simulator.<br>" + 
                                  "You can click in the menu button..." +
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
                                  "...And you can load some example to play with.<br>" + 
                                  "Please, click in the example button..." +
                                  "</td>" +
                                  "</tr>" +
                                  "</table>",
                     code_pre:    function() {  },
                     code_post:   function() { wepsim_open_examples_index(); }
                  });

    tut_welcome.push({
                     id:          "welcome",
                     title:       "Load example...",
                     message:     "<table width=100% height=50%>" +
                                  "<tr>" +
                                  "<td><img src='images/monitor2.png' height='100px'></td>" +
                                  "<td>" +
                                  "...Once the example is loaded we come back to the simulator.<br>" + 
                                  "Then we can start the simulation..." +
                                  "</td>" +
                                  "</tr>" +
                                  "</table>",
                     code_pre:    function() {  },
                     code_post:   function() { load_from_example_firmware("S1E1", true); }
                  });

