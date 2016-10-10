
    var examples = new Array();

    examples.push({ 
                     id: 'S1E1',
                     title: "Initial: instructions",
                     description: "Very simple example with fetch, arithmetic instructions, and basic .text segment.<br>" +
                                  "Data types included: none<br>" +
                                  "Instructions included: li, add, sub"
                  });

    examples.push({ 
                     id: 'S1E2',
                     title: "Initial: memory access",
                     description: "Very simple example with fetch, memory access, and basic .text/.data segment.<br>" +
                                  "Data types included: byte, half, word, ascii, asciiz, .space<br>" +
                                  "Instructions included: li, lb, lh, lw, sb, sh, sw"
                  });

    examples.push({ 
                     id: 'S2E1',
                     title: "Intermediate: I/O",
                     description: "Very simple example with fetch, in/out access, and basic .text/.data segment.<br>" +
                                  "Data types included: asciiz<br>" +
                                  "Instructions included: li, lb, in, out"
                  });

    examples.push({ 
                     id: 'S2E2',
                     title: "Intermediate: subrutines",
                     description: "More extended example with more instructions and I/O (keyboard, display).<br>" +
                                  "Data types included: byte, half, word, ascii, asciiz, .space<br>" +
                                  "Instructions included: li, la, lb, lw, li, b, beq, bne, out, add, jr"
                  });

    examples.push({ 
                     id: 'S3E1',
                     title: "Advanced: Interruptions",
                     description: "Advanced example with interruptions support: fetch, RETI and .ktext/.data added.<br>" +
                                  "Data types included: byte, half, word, ascii, asciiz, .space<br>" +
                                  "Instructions included: li, la, lb, lw, li, b, beq, bne, out, add, jr"
                  });

