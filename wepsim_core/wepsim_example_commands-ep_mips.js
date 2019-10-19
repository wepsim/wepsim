/*
 *  Copyright 2015-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


    // EP

    ws_examples.push({
                       id: 'S1E1',
                       title: "<span data-langkey='Instructions'>Instructions</span>",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_base",
                       assembly:  "ep_s1_e1",
                       description: "<span data-langkey='example_01_01'>Simple example with fetch, arithmetic instructions, and basic .text segment.</span>"
                     });

    ws_examples.push({
                       id: 'S1E2',
                       title: "<span data-langkey='Memory access'>Memory access</span>",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_base",
                       assembly:  "ep_s1_e2",
                       description: "<span data-langkey='example_01_02'>Simple example with fetch, memory access, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S1E3',
                       title: "<span data-langkey='Looping'>Looping</span>",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_enhanced",
                       assembly:  "ep_s1_e3",
                       description: "<span data-langkey='example_01_03'>Simple example with fetch, branch, and basic .text segment.</span>"
                     });

    ws_examples.push({
                       id: 'S1E4',
                       title: "<span data-langkey='Vector'>Vector</span>",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_enhanced",
                       assembly:  "ep_s1_e4",
                       description: "<span data-langkey='example_01_04'>Simple example with fetch, branch, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S2E1',
                       title: "<span data-langkey='I/O'>I/O</span>",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_base",
                       assembly:  "ep_s2_e1",
                       description: "<span data-langkey='example_02_01'>Example with programmed I/O access, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S2E2',
                       title: "<span data-langkey='Subrutine'>Subrutine</span>",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_enhanced",
                       assembly:  "ep_s2_e2",
                       description: "<span data-langkey='example_02_02'>Extended example with more instructions and I/O (keyboard, display).</span>"
                     });

    ws_examples.push({
                       id: 'S2E3',
                       title: "<span data-langkey='Masks & shift'>Masks & shift</span>",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_s2_e3",
                       assembly:  "ep_s2_e3",
                       description: "<span data-langkey='example_02_03'>More extended example with masks, shift, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S2E4',
                       title: "<span data-langkey='Matrix'>Matrix</span>",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_s2_e4",
                       assembly:  "ep_s2_e4",
                       description: "<span data-langkey='example_02_04'>Extended example with subrutine and matrix.</span>"
                     });

    ws_examples.push({
                       id: 'S3E1',
                       title: "<span data-langkey='Interruptions'>Interruptions</span>",
                       type: "<span data-langkey='Advanced'>Advanced</span>",
                       level: "archived",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s3_e1",
                       assembly:  "ep_s3_e1",
                       description: "<span data-langkey='example_03_01'><b>Instructive</b> example with interruptions support: fetch, RETI, and .ktext/.kdata.</span>"
                     });

    ws_examples.push({
                       id: 'S3E2',
                       title: "<span data-langkey='System call'>System call</span>",
                       type: "<span data-langkey='Advanced'>Advanced</span>",
                       level: "archived",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s3_e2",
                       assembly:  "ep_s3_e2",
                       description: "<span data-langkey='example_03_02'><b>Instructive</b> example with system call support.</span>"
                     });

    ws_examples.push({
                       id: 'S3E3',
                       title: "<span data-langkey='Exception'>Exception</span>",
                       type: "<span data-langkey='Advanced'>Advanced</span>",
                       level: "archived",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s3_e3",
                       assembly:  "ep_s3_e3",
                       description: "<span data-langkey='example_03_03'><b>Instructive</b> example with floating point exception.</span>"
                     });

    ws_examples.push({
                       id: 'S4E1',
                       title: "<span data-langkey='Int. + syscall + except.'>Int. + syscall + except.</span>",
                       type: "<span data-langkey='Operating Systems'>Operating Systems</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_s4_e1",
                       assembly:  "ep_s4_e1",
                       description: "<span data-langkey='example_04_01'>Advanced example with interruption, system call, and exception.</span>"
                     });

    ws_examples.push({
                       id: 'S4E2',
                       title: "<span data-langkey='SC 1, 4-5, 8, 11-12'>SC 1, 4-5, 8, 11-12</span>",
                       type: "<span data-langkey='Operating Systems'>Operating Systems</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_os",
                       assembly:  "ep_s4_e2",
                       description: "<span data-langkey='example_04_02'>Example of syscall for printing/reading integer and string.</span>"
                     });

    ws_examples.push({
                       id: 'S4E3',
                       title: "<span data-langkey='Threads'>Threads</span>",
                       type: "<span data-langkey='Operating Systems'>Operating Systems</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_os",
                       assembly:  "ep_s4_e3",
                       description: "<span data-langkey='example_04_03'>Example of threads.</span>"
                     });

    ws_examples.push({
                       id: 'S4E4',
                       title: "<span data-langkey='Alloc.s'>Alloc.s</span>",
                       type: "<span data-langkey='Operating Systems'>Operating Systems</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_os",
                       assembly:  "ep_s4_e4",
                       description: "<span data-langkey='example_04_04'>Example of malloc + free.</span>"
                     });

    ws_examples.push({
                       id: 'S7E1',
                       title: "<span data-langkey='MIPS32-like code'>MIPS32-like code</span>",
                       type: "<span data-langkey='Native'>Native</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s4_e2",
                       description: "<span data-langkey='example_04_02'>Example of syscall for printing/reading integer and string.</span>"
                     });

    ws_examples.push({
                       id: 'S7E2',
                       title: "<span data-langkey='RISCV32 code'>RISCV32 code</span>",
                       type: "<span data-langkey='Native'>Native</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_rv32",
                       assembly:  "ep_s7_e2",
                       description: "<span data-langkey='example_01_01'>Simple example with fetch, arithmetic instructions, and basic .text segment.</span>"
                     });

/*
    ws_examples.push({
                       id: 'S7E3',
                       title: "<span data-langkey='Z80-like code'>Z80-like code</span>",
                       type: "<span data-langkey='Native'>Native</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_z80",
                       assembly:  "ep_s7_e3",
                       description: "<span data-langkey='example_01_01'>Simple example with fetch, arithmetic instructions, and basic .text segment.</span>"
                     });
*/


    // EP+MIPS

    ws_examples.push({
                       id: 'S1E1',
                       title: "<span data-langkey='Instructions'>Instructions</span>",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e1",
                       description: "<span data-langkey='example_01_01'>Simple example with fetch, arithmetic instructions, and basic .text segment.</span>"
                     });

    ws_examples.push({
                       id: 'S1E2',
                       title: "<span data-langkey='Memory access'>Memory access</span>",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e2",
                       description: "<span data-langkey='example_01_02'>Simple example with fetch, memory access, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S1E3',
                       title: "<span data-langkey='Looping'>Looping</span>",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e3",
                       description: "<span data-langkey='example_01_03'>Simple example with fetch, branch, and basic .text segment.</span>"
                     });

    ws_examples.push({
                       id: 'S1E4',
                       title: "<span data-langkey='Vector'>Vector</span>",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e4",
                       description: "<span data-langkey='example_01_04'>Simple example with fetch, branch, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S2E1',
                       title: "<span data-langkey='I/O'>I/O</span>",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e1",
                       description: "<span data-langkey='example_02_01'>Example with programmed I/O access, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S2E2',
                       title: "<span data-langkey='Subrutine'>Subrutine</span>",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "archived",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e2",
                       description: "<span data-langkey='example_02_02'>Extended example with more instructions and I/O (keyboard, display).</span>"
                     });

    ws_examples.push({
                       id: 'S2E3',
                       title: "<span data-langkey='Masks & shift'>Masks & shift</span>",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e3",
                       description: "<span data-langkey='example_02_03'>More extended example with masks, shift, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S2E4',
                       title: "<span data-langkey='Matrix'>Matrix</span>",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e4",
                       description: "<span data-langkey='example_02_04'>Extended example with subrutine and matrix.</span>"
                     });

    ws_examples.push({
                       id: 'S3E1',
                       title: "<span data-langkey='Interruptions'>Interruptions</span>",
                       type: "<span data-langkey='Advanced'>Advanced</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s3_e1",
                       description: "<span data-langkey='example_03_01b'>Example with interruptions support: fetch, RETI, and .ktext/.kdata.</span>"
                     });

    ws_examples.push({
                       id: 'S3E2',
                       title: "<span data-langkey='System call'>System call</span>",
                       type: "<span data-langkey='Advanced'>Advanced</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s3_e2",
                       description: "<span data-langkey='example_03_02b'>Example with system call support.</span>"
                     });

    ws_examples.push({
                       id: 'S3E3',
                       title: "<span data-langkey='Exception'>Exception</span>",
                       type: "<span data-langkey='Advanced'>Advanced</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s3_e3",
                       description: "<span data-langkey='example_03_03b'>Example with floating point exception.</span>"
                     });

    ws_examples.push({
                       id: 'S4E1',
                       title: "<span data-langkey='Int. + syscall + except.'>Int. + syscall + except.</span>",
                       type: "<span data-langkey='Operating Systems'>Operating Systems</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s4_e1",
                       description: "<span data-langkey='example_04_01'>Advanced example with interruption, system call, and exception.</span>"
                     });

    ws_examples.push({
                       id: 'S4E2',
                       title: "<span data-langkey='syscall 1, 4-5, 8, 11-12'>syscall 1, 4-5, 8, 11-12</span>",
                       type: "<span data-langkey='Operating Systems'>Operating Systems</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_mips",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s4_e2",
                       description: "<span data-langkey='example_04_02'>Example of syscall for printing/reading integer and string.</span>"
                     });


    ws_examples.push({
                       id: 'S6E1',
                       title: "<span data-langkey='Dummy instruction'>Dummy instruction</span>",
                       type: "<span data-langkey='Special'>Special</span>",
                       level: "actual",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_bare",
                       assembly:  "ep_s6_e1",
                       description: "<span data-langkey='example_06_01'>Test example.</span>"
                     });

/*
    ws_examples.push({
                       id: 'S6E2',
                       title: "<span data-langkey='Compiler Explorer'>Compiler Explorer</span>",
                       type: "<span data-langkey='Special'>Special</span>",
                       level: "archived",
                       modes:  "newbie,intro,ep",
                       hardware:  "ep",
                       microcode: "ep_os",
                       assembly:  "ep_s6_e2",
                       description: "<span data-langkey='example_06_02'>Simple Compiler Explorer example</span>"
                     });
*/

