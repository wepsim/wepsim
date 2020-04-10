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


    // EP+RV32

    ws_examples.push({
                       id: 'R1E2',
                       title: "Instructions",
                       type: "<span data-langkey='Initial'>Initial</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_rv32",
                       hardware:  "ep",
                       microcode: "ep_rv32",
                       assembly:  "ep_r1_e1",
                       description: "<span data-langkey='example_01_01'>Simple example with fetch, arithmetic instructions, and basic .text segment.</span>"
                     });

    ws_examples.push({
                       id: 'R2E1',
                       title: "Memory access",
                       type: "<span data-langkey='Intermediate'>Intermediate</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_rv32",
                       hardware:  "ep",
                       microcode: "ep_rv32",
                       assembly:  "ep_r2_e1",
                       description: "<span data-langkey='example_01_02'>Simple example with fetch, memory access, and basic .text/.data segment.</span>"
                     });

    ws_examples.push({
                       id: 'R3E1',
                       title: "Subrutine",
                       type: "<span data-langkey='Advanced'>Advanced</span>",
                       level: "actual",
                       modes:  "newbie,intro,asm_rv32",
                       hardware:  "ep",
                       microcode: "ep_rv32",
                       assembly:  "ep_r3_e1",
                       description: "<span data-langkey='example_01_03'>Simple example with fetch, branch, and basic .text segment.</span>"
                     });

