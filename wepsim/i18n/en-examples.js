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

    examples.en.push({
                       id: 'S1E1',
                       title: "Instructions",
                       level: "Initial",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_base",
                       assembly:  "ep_s1_e1",
                       description: "Simple example with fetch, arithmetic instructions, and basic .text segment.<br>"
                     });

    examples.en.push({
                       id: 'S1E2',
                       title: "Memory access",
                       level: "Initial",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_base",
                       assembly:  "ep_s1_e2",
                       description: "Simple example with fetch, memory access, and basic .text/.data segment.<br>"
                     });

    examples.en.push({
                       id: 'S1E3',
                       title: "Looping",
                       level: "Initial",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_enhanced",
                       assembly:  "ep_s1_e3",
                       description: "Simple example with fetch, branch, and basic .text segment.<br>"
                     });

    examples.en.push({
                       id: 'S1E4',
                       title: "Vector",
                       level: "Initial",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_enhanced",
                       assembly:  "ep_s1_e4",
                       description: "Simple example with fetch, branch, and basic .text/.data segment.<br>"
                     });

    examples.en.push({
                       id: 'S2E1',
                       title: "I/O",
                       level: "Intermediate",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_base",
                       assembly:  "ep_s2_e1",
                       description: "Example with programmed I/O access, and basic .text/.data segment.<br>"
                     });

    examples.en.push({
                       id: 'S2E2',
                       title: "Subrutine",
                       level: "Intermediate",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_enhanced",
                       assembly:  "ep_s2_e2",
                       description: "Extended example with more instructions and I/O (keyboard, display).<br>"
                     });

    examples.en.push({
                       id: 'S2E3',
                       title: "Masks & shift",
                       level: "Intermediate",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s2_e3",
                       assembly:  "ep_s2_e3",
                       description: "More extended example with masks, shift, and basic .text/.data segment.<br>"
                     });

    examples.en.push({
                       id: 'S2E4',
                       title: "Matrix",
                       level: "Intermediate",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s2_e4",
                       assembly:  "ep_s2_e4",
                       description: "Extended example with subrutine and matrix.<br>"
                     });

    examples.en.push({
                       id: 'S3E1',
                       title: "Interruptions",
                       level: "Advanced",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s3_e1",
                       assembly:  "ep_s3_e1",
                       description: "<b>Instructive</b> example with interruptions support: fetch, RETI, and .ktext/.kdata.<br>"
                     });

    examples.en.push({
                       id: 'S3E2',
                       title: "System call",
                       level: "Advanced",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s3_e2",
                       assembly:  "ep_s3_e2",
                       description: "<b>Instructive</b> example with system call support.<br>"
                     });

    examples.en.push({
                       id: 'S3E3',
                       title: "Exception",
                       level: "Advanced",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s3_e3",
                       assembly:  "ep_s3_e3",
                       description: "<b>Instructive</b> example with floating point exception.<br>"
                     });

    examples.en.push({
                       id: 'S4E1',
                       title: "Int. + S.C. + Exc.",
                       level: "Operating Systems",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s4_e1",
                       assembly:  "ep_s4_e1",
                       description: "Advanced example with interruption, system call, and exception.<br>"
                     });

    examples.en.push({
                       id: 'S4E2',
                       title: "SC 1, 4-5, 8, 11-12",
                       level: "Operating Systems",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_os",
                       assembly:  "ep_s4_e2",
                       description: "Example of syscall for printing/reading integer and string.<br>"
                     });

    examples.en.push({
                       id: 'S4E3',
                       title: "Threads",
                       level: "Operating Systems",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_os",
                       assembly:  "ep_s4_e3",
                       description: "Example of threads.<br>"
                     });

    examples.en.push({
                       id: 'S4E4',
                       title: "Alloc.s",
                       level: "Operating Systems",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_os",
                       assembly:  "ep_s4_e4",
                       description: "Example of malloc + free.<br>"
                     });

    examples.en.push({
                       id: 'S5E1',
                       title: "addv + seqv.",
                       level: "Laboratory",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s5_e1",
                       assembly:  "ep_s5_e1",
                       description: "Application-specific extension: addv + seqv.<br>"
                     });

    examples.en.push({
                       id: 'S5E2',
                       title: "strlen_2 + skipasciicode_2",
                       level: "Laboratory",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s5_e2",
                       assembly:  "ep_s5_e2",
                       description: "Application-specific extension: strlen_2 + skipasciicode_2.<br>"
                     });

    examples.en.push({
                       id: 'S5E3',
                       title: "madd, mmul, mxch",
                       level: "Laboratory",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_s5_e3",
                       assembly:  "ep_s5_e3",
                       description: "Application-specific extension: madd + mmul + mxch.<br>"
                     });

    examples.en.push({
                       id: 'S6E1',
                       title: "Dummy instruction",
                       level: "Special",
                       modes:  "newbie,intro,tutorial,ep",
                       hardware:  "ep",
                       microcode: "ep_bare",
                       assembly:  "ep_s6_e1",
                       description: "Test example.<br>"
                     });


    // EP+MIPS

    examples.en.push({
                       id: 'S1E1',
                       title: "Instructions",
                       level: "Initial",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e1",
                       description: "Simple example with fetch, arithmetic instructions, and basic .text segment.<br>"
                     });

    examples.en.push({
                       id: 'S1E2',
                       title: "Memory access",
                       level: "Initial",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e2",
                       description: "Simple example with fetch, memory access, and basic .text/.data segment.<br>"
                     });

    examples.en.push({
                       id: 'S1E3',
                       title: "Looping",
                       level: "Initial",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e3",
                       description: "Simple example with fetch, branch, and basic .text segment.<br>"
                     });

    examples.en.push({
                       id: 'S1E4',
                       title: "Vector",
                       level: "Initial",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s1_e4",
                       description: "Simple example with fetch, branch, and basic .text/.data segment.<br>"
                     });

    examples.en.push({
                       id: 'S2E1',
                       title: "I/O",
                       level: "Intermediate",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e1",
                       description: "Example with programmed I/O access, and basic .text/.data segment.<br>"
                     });

/*
    examples.en.push({
                       id: 'S2E2',
                       title: "Subrutine",
                       level: "Intermediate",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e2",
                       description: "Extended example with more instructions and I/O (keyboard, display).<br>"
                     });
*/

    examples.en.push({
                       id: 'S2E3',
                       title: "Masks & shift",
                       level: "Intermediate",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e3",
                       description: "More extended example with masks, shift, and basic .text/.data segment.<br>"
                     });

    examples.en.push({
                       id: 'S2E4',
                       title: "Matrix",
                       level: "Intermediate",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s2_e4",
                       description: "Extended example with subrutine and matrix.<br>"
                     });

    examples.en.push({
                       id: 'S3E1',
                       title: "Interruptions",
                       level: "Advanced",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s3_e1",
                       description: "Example with interruptions support: fetch, RETI, and .ktext/.kdata.<br>"
                     });

    examples.en.push({
                       id: 'S3E2',
                       title: "System call",
                       level: "Advanced",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s3_e2",
                       description: "Example with system call support.<br>"
                     });

    examples.en.push({
                       id: 'S3E3',
                       title: "Exception",
                       level: "Advanced",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s3_e3",
                       description: "Example with floating point exception.<br>"
                     });

    examples.en.push({
                       id: 'S3E4',
                       title: "Int. + syscall + except.",
                       level: "Advanced",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s3_e4",
                       description: "Advanced example with interruption, system call, and exception.<br>"
                     });

    examples.en.push({
                       id: 'S4E2',
                       title: "strlen_2 + skipasciicode_2",
                       level: "Laboratory",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s4_e2",
                       description: "Application-specific extension: strlen_2 + skipasciicode_2.<br>"
                     });

    examples.en.push({
                       id: 'S4E4',
                       title: "syscall 1, 4-5, 8, 11-12",
                       level: "Laboratory",
                       modes:  "newbie,intro,wepmips,tutorial",
                       hardware:  "ep",
                       microcode: "ep_mips",
                       assembly:  "ep_s4_e4",
                       description: "Example of syscall for printing/reading integer and string.<br>"
                     });

    // POC

    examples.en.push({
                       id: 'S1E1',
                       title: "Instructions",
                       level: "Initial",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "poc_s1_e1",
                       description: "Simple example.<br>"
                     });

    examples.en.push({
                       id: 'S1E2',
                       title: "Memory access",
                       level: "Initial",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s1_e2",
                       description: "Simple example with fetch, memory access, and basic .text/.data segment.<br>"
                     });

    examples.en.push({
                       id: 'S1E3',
                       title: "Looping",
                       level: "Initial",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s1_e3",
                       description: "Simple example with fetch, branch, and basic .text segment.<br>"
                     });

    examples.en.push({
                       id: 'S1E4',
                       title: "Vector",
                       level: "Initial",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s1_e4",
                       description: "Simple example with fetch, branch, and basic .text/.data segment.<br>"
                     });

    examples.en.push({
                       id: 'S2E1',
                       title: "I/O",
                       level: "Intermediate",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e1",
                       description: "Example with programmed I/O access, and basic .text/.data segment.<br>"
                     });

    examples.en.push({
                       id: 'S2E2',
                       title: "Subrutine",
                       level: "Intermediate",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e2",
                       description: "Extended example with more instructions and I/O (keyboard, display).<br>"
                     });

/*
    examples.en.push({
                       id: 'S2E3',
                       title: "Masks & shift",
                       level: "Intermediate",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e3",
                       description: "More extended example with masks, shift, and basic .text/.data segment.<br>"
                     });
*/

    examples.en.push({
                       id: 'S2E4',
                       title: "Matrix",
                       level: "Intermediate",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e4",
                       description: "Extended example with subrutine and matrix.<br>"
                     });

    examples.en.push({
                       id: 'S3E1',
                       title: "Interruptions",
                       level: "Advanced",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_s3",
                       assembly:  "ep_s3_e1",
                       description: "<b>Instructive</b> example with interruptions support: fetch, RETI, and .ktext/.kdata.<br>"
                     });

    examples.en.push({
                       id: 'S3E2',
                       title: "System call",
                       level: "Advanced",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_s3",
                       assembly:  "ep_s3_e2",
                       description: "<b>Instructive</b> example with system call support.<br>"
                     });

    examples.en.push({
                       id: 'S3E3',
                       title: "Exception",
                       level: "Advanced",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_s3",
                       assembly:  "ep_s3_e3",
                       description: "<b>Instructive</b> example with floating point exception.<br>"
                     });

    examples.en.push({
                       id: 'S3E4',
                       title: "Int. + syscall + except.",
                       level: "Advanced",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_s3",
                       assembly:  "ep_s3_e4",
                       description: "Advanced example with interruption, system call, and exception.<br>"
                     });

    examples.en.push({
                       id: 'S5E1',
                       title: "Dummy instruction",
                       level: "Special",
                       modes:  "newbie,intro,tutorial,poc",
                       hardware:  "poc",
                       microcode: "poc_bare",
                       assembly:  "poc_s5_e1",
                       description: "Test example.<br>"
                     });

