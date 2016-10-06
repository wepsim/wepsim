
    var examples = new Array();

    examples.push({ 
                     title: "Simple",
                     description: "Very simple example with fetch, arithmetic instructions, and basic .text/.data segment.<br>" +
                                  "Data types included: byte, half, word, ascii, asciiz, .space<br>" +
                                  "Instructions included: li, add, sub"
                  });

    examples.push({ 
                     title: "Intermediate",
                     description: "More extended example with more instructions and I/O (keyboard, display).<br>" +
                                  "Data types included: byte, half, word, ascii, asciiz, .space<br>" +
                                  "Instructions included: li, la, lb, lw, li, b, beq, bne, out, add, jr"
                  });

    examples.push({ 
                     title: "Advanced",
                     description: "Advanced example with interruptions support: fetch, RETI and .ktext/.data added.<br>" +
                                  "Data types included: byte, half, word, ascii, asciiz, .space<br>" +
                                  "Instructions included: li, la, lb, lw, li, b, beq, bne, out, add, jr"
                  });

