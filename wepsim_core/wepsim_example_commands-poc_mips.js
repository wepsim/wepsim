/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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


    // POC

    ws_examples.push({
                       id: 'S1E1',
                       title: "Instructions",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "poc_s1_e1",
                       description: "<span data-langkey='example_01_01'>Simple example.</span>"
                     });

    ws_examples.push({
                       id: 'S1E2',
                       title: "Memory access",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s1_e2",
                       description: "<span data-langkey='example_01_02'>Simple example with fetch, memory access, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S1E3',
                       title: "Looping",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s1_e3",
                       description: "<span data-langkey='example_01_03'>Simple example with fetch, branch, and basic .text segment.</span>"
                     });

    ws_examples.push({
                       id: 'S1E4',
                       title: "Vector",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s1_e4",
                       description: "<span data-langkey='example_01_04'>Simple example with fetch, branch, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S2E1',
                       title: "I/O",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e1",
                       description: "<span data-langkey='example_02_01'>Example with programmed I/O access, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S2E2',
                       title: "Subrutine",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e2",
                       description: "<span data-langkey='example_02_02'>Extended example with more instructions and I/O (keyboard, display).</span>"
                     });

    ws_examples.push({
                       id: 'S2E3',
                       title: "Masks & shift",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e3",
                       description: "<span data-langkey='example_02_03'>More extended example with masks, shift, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'S2E4',
                       title: "Matrix",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_base",
                       assembly:  "ep_s2_e4",
                       description: "<span data-langkey='example_02_04'>Extended example with subrutine and matrix.</span>"
                     });

    ws_examples.push({
                       id: 'S3E1',
                       title: "Interruptions",
                       type: "<span data-langkey='Advanced'>Advanced</span>",
                       level: "archived",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_s3",
                       assembly:  "ep_s3_e1",
                       description: "<span data-langkey='example_03_01'><b>Instructive</b> example with interruptions support: fetch, RETI, and .ktext/.kdata.</span>"
                     });

    ws_examples.push({
                       id: 'S3E2',
                       title: "System call",
                       type: "<span data-langkey='Advanced'>Advanced</span>",
                       level: "archived",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_s3",
                       assembly:  "ep_s3_e2",
                       description: "<span data-langkey='example_03_02'><b>Instructive</b> example with system call support.</span>"
                     });

    ws_examples.push({
                       id: 'S3E3',
                       title: "Exception",
                       type: "<span data-langkey='Advanced'>Advanced</span>",
                       level: "archived",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_s3",
                       assembly:  "ep_s3_e3",
                       description: "<span data-langkey='example_03_03'><b>Instructive</b> example with floating point exception.</span>"
                     });

    ws_examples.push({
                       id: 'S4E1',
                       title: "Int. + syscall + except.",
                       type: "<span data-langkey='Operating Systems'>Operating Systems</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_os",
                       assembly:  "ep_s4_e1",
                       description: "<span data-langkey='example_04_01'>Advanced example with interruption, system call, and exception.</span>"
                     });

    ws_examples.push({
                       id: 'S4E2',
                       title: "SC 1, 4-5, 8, 11-12",
                       type: "<span data-langkey='Operating Systems'>Operating Systems</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_os",
                       assembly:  "ep_s4_e2",
                       description: "<span data-langkey='example_04_02'>Example of syscall for printing/reading integer and string.</span>"
                     });

    ws_examples.push({
                       id: 'S4E3',
                       title: "Threads",
                       type: "<span data-langkey='Operating Systems'>Operating Systems</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_os",
                       assembly:  "ep_s4_e3",
                       description: "<span data-langkey='example_04_03'>Example of threads.</span>"
                     });

    ws_examples.push({
                       id: 'S4E4',
                       title: "Alloc.s",
                       type: "<span data-langkey='Operating Systems'>Operating Systems</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_os",
                       assembly:  "ep_s4_e4",
                       description: "<span data-langkey='example_04_04'>Example of malloc + free.</span>"
                     });

    ws_examples.push({
                       id: 'S5E1',
                       title: "Dummy instruction",
                       type: "<span data-langkey='Special'>Special</span>",
                       level: "actual",
                       modes:  "newbie,intro,poc",
                       hardware:  "poc",
                       microcode: "poc_bare",
                       assembly:  "poc_s5_e1",
                       description: "<span data-langkey='example_06_01'>Test example.</span>"
                     });

