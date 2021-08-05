/*
 *  Copyright 2015-2021 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve, Juan Francisco Perez Carrasco
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

 sim.ep.model = {
		   "cpu_t1":
		   {
		      name:              "T1",
		      description:       "Tristate 1",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "MBR>",
						      ref:  "REG_MBR",
						      description: "Input is the value of MBR register"
						    },
					   "out":   {
						      name: ">IDB",
						      ref:  "BUS_IB",
						      description: "Output goes to the IDB"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "T1",
						      ref:  "T1",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_t2":
		   {
		      name:              "T2",
		      description:       "Tristate 2",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "IDB>",
						      ref:  "BUS_IB",
						      description: "Input is the PC register output"
						    },
					   "out":   {
						      name: ">PC",
						      ref:  "REG_PC",
						      description: "Output goes to the IDB"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "T2",
						      ref:  "T2",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_t3":
		   {
		      name:              "T3",
		      description:       "Tristate 3",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "IR>SELECT>",
						      ref:  "SELEC_T3",
						      description: "Input is the IR register output selector"
						    },
					   "out":   {
						      name: ">IDB",
						      ref:  "BUS_IB",
						      description: "Output goes to the IDB"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "T3",
						      ref:  "T3",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_t4":
		   {
		      name:              "T4",
		      description:       "Tristate 4",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "RT1>",
						      ref:  "REG_RT1",
						      description: "Input is the RT1 register output"
						    },
					   "out":   {
						      name: ">IDB",
						      ref:  "BUS_IB",
						      description: "Output goes to the IDB"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "T4",
						      ref:  "T4",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_t5":
		   {
		      name:              "T5",
		      description:       "Tristate 5",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "RT2>",
						      ref:  "REG_RT2",
						      description: "Input is the RT2 register output"
						    },
					   "out":   {
						      name: ">IDB",
						      ref:  "BUS_IB",
						      description: "Output goes to the IDB"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "T5",
						      ref:  "T5",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_t6":
		   {
		      name:              "T6",
		      description:       "Tristate 6",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "ALU>",
						      ref:  "ALU_C6",
						      description: "Input is the ALU output"
						    },
					   "out":   {
						      name: ">IDB",
						      ref:  "BUS_IB",
						      description: "Output goes to the IDB"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "T6",
						      ref:  "T6",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_t7":
		   {
		      name:              "T7",
		      description:       "Tristate 7",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "RT3>",
						      ref:  "REG_RT3",
						      description: "Input is the RT3 register output"
						    },
					   "out":   {
						      name: ">IDB",
						      ref:  "BUS_IB",
						      description: "Output goes to the IDB"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "T7",
						      ref:  "T7",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_t8":
		   {
		      name:              "T8",
		      description:       "Tristate 8",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: ">SR",
						      ref:  "REG_SR",
						      description: "Input is the SR register output"
						    },
					   "out":   {
						      name: ">IDB",
						      ref:  "BUS_IB",
						      description: "Output goes to the IDB"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "T8",
						      ref:  "T8",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_t9":
		   {
		      name:              "T9",
		      description:       "Tristate 9",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "RF/A>",
						      ref:  "RA_T9",
						      description: "Input is the RF/A output"
						    },
					   "out":   {
						      name: ">IDB",
						      ref:  "BUS_IB",
						      description: "Output goes to the IDB"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "T9",
						      ref:  "T9",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_t10":
		   {
		      name:              "T10",
		      description:       "Tristate 10",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "RF/B>",
						      ref:  "RB_T10",
						      description: "Input is the RF/B output"
						    },
					   "out":   {
						      name: ">IDB",
						      ref:  "BUS_IB",
						      description: "Output goes to the IDB"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "T10",
						      ref:  "T10",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_t11":
		   {
		      name:              "T11",
		      description:       "Tristate 11",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "REG_MICROINS/EXCODE>",
						      ref:  "REG_MICROINS/EXCODE",
						      description: "Input is the MIR/ExCode output"
						    },
					   "out":   {
						      name: ">IDB",
						      ref:  "BUS_IB",
						      description: "Output goes to the IDB"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "T11",
						      ref:  "T11",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_ta":
		   {
		      name:              "Ta",
		      description:       "Tristate A",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "MAR>",
						      ref:  "REG_MAR",
						      description: "Input is the MAR register output"
						    },
					   "out":   {
						      name: ">AB",
						      ref:  "BUS_AB",
						      description: "Output goes to the address bus"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "Ta",
						      ref:  "TA",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cpu_td":
		   {
		      name:              "Td",
		      description:       "Tristate D",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":    {
						      name: "BS>",
						      ref:  "BS_TD",
						      description: "Input is the byte selector output"
						    },
					   "out":   {
						      name: ">DB",
						      ref:  "BUS_DB",
						      description: "Output goes to the data bus"
						    }
					 },
		      signals:           {
					   "ctl":   {
						      name: "Td",
						      ref:  "TD",
						      description: "Confirm that output is connected to the input"
						    }
					 },
		      states_inputs:     [ "in"  ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },


		   "cpu_mux_a":
		   {
		      name:              "MUX A",
		      description:       "MUX A",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0": {
						      name: "MUX/0",
						      ref:  "RA_T9",
						      description: "Input 0 of MUX A, from RF/A"
						    },
					   "mux_1": {
						      name: "MUX/1",
						      ref:  "REG_RT1",
						      description: "Input 1 of MUX A, from RT1"
						    },
					   "mux_o": {
						      name: "MA OUT",
						      ref:  "MA_ALU",
						      description: "Output to ALU/0, from MUX A"
						    }
					 },
		      signals:           {
					   "ma":    {
						      name: "MA",
						      ref:  "MA",
						      description: "Select the input value to send to the output"
						    }
					 },
		      states_inputs:     [ "mux_0", "mux_1" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "ma" ],
		      signals_output:    [ ]
		   },
		   "cpu_mux_b":
		   {
		      name:              "MUX B",
		      description:       "MUX B",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0": {
						       name: "MUX/0",
						       ref:  "RB_T10",
						       description: "Input 0 of MUX B, from RF/A"
						    },
					   "mux_1": {
						       name: "MUX/1",
						       ref:  "REG_RT2",
						       description: "Input 1 of MUX B, from RT2"
						    },
					   "mux_2": {
						       name: "MUX/2",
						       ref:  "VAL_FOUR",
						       description: "Input 2 of MUX B, value 4"
						    },
					   "mux_3": {
						       name: "MUX/3",
						       ref:  "VAL_ONE",
						       description: "Input 3 of MUX B, value 1"
						    },
					   "mux_o": {
						       name: "MA OUT",
						       ref:  "MB_ALU",
						       description: "Output to ALU/1, from MUX B"
						    }
					 },
		      signals:           {
					   "mb":    {
						       name: "MB",
						       ref:  "MB",
						       description: "Select the input value to send to the output"
						    }
					 },
		      states_inputs:     [ "mux_0", "mux_1", "mux_2", "mux_3" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "mb" ],
		      signals_output:    [ ]
		   },
		   "cpu_mux_1":
		   {
		      name:              "MUX 1",
		      description:       "MUX 1",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0": {
						       name: "MUX/0",
						       ref:  "BUS_IB",
						       description: "Input 0 of MUX 1, from IDB"
						    },
					   "mux_1": {
						       name: "MUX/1",
						       ref:  "BS_M1",
						       description: "Input 1 of MUX 1, from byte selector"
						    },
					   "mux_o": {
						       name: "MA OUT",
						       ref:  "M1_C1",
						       description: "Output to MBR, from MUX 1"
						    }
					 },
		      signals:           {
					   "m1":    {
						       name: "M1",
						       ref:  "M1",
						       description: "Select the input value to send to the output"
						    }
					 },
		      states_inputs:     [ "mux_0", "mux_1" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "m1" ],
		      signals_output:    [ ]
		   },
		   "cpu_mux_2":
		   {
		      name:              "MUX 2",
		      description:       "MUX 2",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0": {
						       name: "MUX/0",
						       ref:  "BUS_IB",
						       description: "Input 0 of MUX 2, from IDB"
						    },
					   "mux_1": {
						       name: "MUX/1",
						       ref:  "REG_PC",
						       description: "Input 1 of MUX 2, PC + 4"
						    },
					   "mux_o": {
						       name: "MA OUT",
						       ref:  "M2_C2",
						       description: "Output to PC, from MUX 2"
						    }
					 },
		      signals:           {
					   "m2":    {
						       name: "M2",
						       ref:  "M2",
						       description: "Select the input value to send to the output"
						    }
					 },
		      states_inputs:     [ "mux_0", "mux_1" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "m2" ],
		      signals_output:    [ ]
		   },
		   "cpu_mux_7":
		   {
		      name:              "MUX 7",
		      description:       "MUX 7",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0": {
						       name: "MUX/0",
						       ref:  "BUS_IB",
						       description: "Input 0 of MUX 7, from IDB"
						    },
					   "mux_1": {
						       name: "MUX/1",
						       ref:  "SELP_M7",
						       description: "Input 1 of MUX 7, from Flag Selector"
						    },
					   "mux_o": {
						       name: "MA OUT",
						       ref:  "M7_C7",
						       description: "Output to SR, from MUX 7"
						    }
					 },
		      signals:           {
					   "m7":    {
						       name: "M7",
						       ref:  "M7",
						       description: "Select the input value to send to the output"
						    }
					 },
		      states_inputs:     [ "mux_0", "mux_1" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "m7" ],
		      signals_output:    [ ]
		   },
		   "cu_mux_a":
		   {
		      name:              "MUX A",
		      description:       "MUX A",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0": {
						       name: "MUX A/0",
						       ref:  "REG_MICROADDR", // TODO: REG_MICROADDR+1
						       description: "Input 0 of MUX A, from mADDR + 1"
						    },
					   "mux_1": {
						       name: "MUX A/1",
						       ref:  "REG_MICROINS/MADDR",
						       description: "Input 1 of MUX A, from co2maddr"
						    },
					   "mux_2": {
						       name: "MUX A/2",
						       ref:  "ROM_MUXA",
						       description: "Input 2 of MUX A, from mIR/MADDR"
						    },
					   "mux_3": {
						       name: "MUX A/3",
						       ref:  "FETCH",
						       description: "Input 3 of MUX A, from 0"
						    },
					   "mux_o": {
						       name: "MUX A/OUT",
						       ref:  "MUXA_MICROADDR",
						       description: "Output to mADDR, from MUX A"
						    }
					 },
		      signals:           {
					   "a0":    {
						       name: "a0",
						       ref:  "A0A1",
						       description: "mIR/A0"
						    },
					   "a1":    {
						       name: "a1",
						       ref:  "A0A1",
						       description: "Output of control unit MUX B"
						    }
					 },
		      states_inputs:     [ "mux_0", "mux_1", "mux_2", "mux_3" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "a0", "a1" ],
		      signals_output:    [ ]
		   },
		   "cu_mux_b":
		   {
		      name:              "MUX B",
		      description:       "MUX B",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0": {
						       name: "MUX B/0",
						       ref:  "MUXC_MUXB",
						       description: "Input 0 of MUX B, from MUX C"
						    },
					   "mux_1": {
						       name: "MUX B/1",
						       ref:  "MUXC_MUXB", // TODO: NOT MUXC_MUXB
						       description: "Input 1 of MUX B, from NOT (MUX C)"
						    },
					   "mux_o": {
						       name: "MUX B/OUT",
						       ref:  "A1",
						       description: "Output to MUX A/A1, from MUX B"
						    }
					 },
		      signals:           {
					   "mb":    {
						       name: "MB",
						       ref:  "B",
						       description: "Select the input value to send to the output"
						    }
					 },
		      states_inputs:     [ "mux_0", "mux_1" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "mb" ],
		      signals_output:    [ ]
		   },
		   "cu_mux_c":
		   {
		      name:              "MUX C",
		      description:       "MUX C",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0":  {
						       name: "MUX/0",
						       ref:  "VAL_ZERO",
						       description: "Input  0 of MUX C, from 0"
						     },
					   "mux_1":  {
						       name: "MUX/1",
						       ref:  "INT",
						       description: "Input  1 of MUX C, from INT"
						     },
					   "mux_2":  {
						       name: "MUX/2",
						       ref:  "IORDY",
						       description: "Input  2 of MUX C, from IORdy"
						     },
					   "mux_3":  {
						       name: "MUX/3",
						       ref:  "MRDY",
						       description: "Input  3 of MUX C, from MRdy"
						     },
					   "mux_4":  {
						       name: "MUX/4",
						       ref:  "REG_SR/0",
						       description: "Input  4 of MUX C, from SR/U"
						     },
					   "mux_5":  {
						       name: "MUX/5",
						       ref:  "REG_SR/1",
						       description: "Input  5 of MUX C, from SR/I"
						     },
					   "mux_6":  {
						       name: "MUX/6",
						       ref:  "REG_SR/28",
						       description: "Input  6 of MUX C, from SR/Z"
						     },
					   "mux_7":  {
						       name: "MUX/7",
						       ref:  "REG_SR/29",
						       description: "Input  7 of MUX C, from SR/N"
						     },
					   "mux_8":  {
						       name: "MUX/8",
						       ref:  "REG_SR/30",
						       description: "Input  8 of MUX C, from SR/V"
						     },
					   "mux_9":  {
						       name: "MUX/9",
						       ref:  "REG_SR/31",
						       description: "Input  9 of MUX C, from SR/C"
						     },
					   "mux_10": {
						       name: "MUX/10",
						       ref:  "INEX",
						       description: "Input 10 of MUX C, from InEx"
						     },
					   "mux_o":  {
						       name: "MC OUT",
						       ref:  "MUXC_MUXB",
						       description: "Output to MUX B"
						     }
					 },
		      signals:           {
					   "ctl":    {
						       name: "c",
						       ref:  "C",
						       description: "Output of control unit MUX C"
						     }
					 },
		      states_inputs:     [ "mux_0", "mux_1", "mux_2", "mux_3", "mux_4", "mux_5", "mux_6", "mux_7", "mux_8", "mux_9", "mux_10" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cu_mux_ra":
		   {
		      name:              "MUX MR/RA",
		      description:       "MUX MR",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0":  {
						       name: "MUX/0",
						       ref:  "REG_IR REG_MICROINS/SELA",
						       description: "Input 0 of MUX MR, from IR[SelA...SelA+5]"
						     },
					   "mux_1":  {
						       name: "MUX/1",
						       ref:  "REG_MICROINS/SELA",
						       description: "Input 1 of MUX MR, from SelA"
						     },
					   "mux_o":  {
						       name: "MR OUT",
						       ref:  "RA",
						       description: "Output to RA"
						     }
					 },
		      signals:           {
					   "ctl":    {
						       name: "MR",
						       ref:  "MR_RA",
						       description: "Select the input value to send to the output"
						     }
					 },
		      states_inputs:     [ "mux_0", "mux_1" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "cu_mux_rb":
		   {
		      name:              "MUX MR/RB",
		      description:       "MUX MR",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0":  {
						       name: "MUX/0",
						       ref:  "REG_IR REG_MICROINS/SELB",
						       description: "Input 0 of MUX MR, from IR[SelB...SelB+5]"
						     },
					   "mux_1":  {
						       name: "MUX/1",
						       ref:  "REG_MICROINS/SELB",
						       description: "Input 1 of MUX MR, from SelB"
						     },
					   "mux_o":  {
						       name: "MR OUT",
						       ref:  "RB",
						       description: "Output to RB"
						     }
					 },
		      signals:           {
					   "mr":     {
						       name: "MR",
						       ref:  "MR_RB",
						       description: "Select the input value to send to the output"
						     }
					 },
		      states_inputs:     [ "mux_0", "mux_1" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "mr" ],
		      signals_output:    [ ]
		   },
		   "cu_mux_rc":
		   {
		      name:              "MUX MR/RC",
		      description:       "MUX MR",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0":  {
						       name: "MUX/0",
						       ref:  "REG_IR REG_MICROINS/SELC",
						       description: "Input 0 of MUX MR, from IR[SelC...SelC+5]"
						     },
					   "mux_1":  {
						       name: "MUX/1",
						       ref:  "REG_MICROINS/SELC",
						       description: "Input 1 of MUX MR, from SelC"
						     },
					   "mux_o":  {
						       name: "MR OUT",
						       ref:  "RC",
						       description: "Output to RC"
						     }
					 },
		      signals:           {
					   "mr":     {
						       name: "MR",
						       ref:  "MR_RC",
						       description: "Select the input value to send to the output"
						     }
					 },
		      states_inputs:     [ "mux_0", "mux_1" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "mr" ],
		      signals_output:    [ ]
		   },
		   "cu_mux_mc":
		   {
		      name:              "MUX MC",
		      description:       "MUX MC",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_0":  {
						       name: "REG_IR/0..4",
						       ref:  "REG_IR",
						       description: "Input 0 of MUX MC, from IR3...IR0"
						     },
					   "mux_1":  {
						       name: "SELCOP",
						       ref:  "REG_MICROINS/SELCOP",
						       description: "Input 1 of MUX MC, from SelCop"
						     },
					   "mux_o":  {
						       name: "COP",
						       ref:  "COP",
						       description: "Output to COP"
						     }
					 },
		      signals:           {
					   "ctl":    {
						       name: "MC",
						       ref:  "MC",
						       description: "Select the input value to send to the output"
						     }
					 },
		      states_inputs:     [ "mux_0", "mux_1" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },


		   "mar":
		   {
		      name:              "mar",
		      description:       "Memory Address Register",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":     {
						       name: "IDB>",
						       ref:  "BUS_IB",
						       description: "Input is the IDB"
						     },
					   "out":    {
						       name: ">MAR",
						       ref:  "REG_MAR",
						       description: "Output goes to the Ta tristate"
						     }
					 },
		      signals:           {
					   "c0":     {
						       name: "c0",
						       ref:  "C0",
						       description: "Confirm that input is stored"
						     }
					 },
		      states_inputs:     [ "in" ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "c0" ],
		      signals_output:    [ ]
		   },
		   "mbr":
		   {
		      name:              "mbr",
		      description:       "Memory Data Register",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":     {
						       name: "M1>",
						       ref:  "M1_C1",
						       description: "Input is the M1 output"
						     },
					   "out":    {
						       name: ">MBR",
						       ref:  "REG_MBR",
						       description: "Output goes to the T1 tristate"
						     }
					 },
		      signals:           {
					   "c1":     {
						       name: "c1",
						       ref:  "C1",
						       description: "Confirm that input is stored"
						     }
					 },
		      states_inputs:     [ "in" ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "c1" ],
		      signals_output:    [ ]
		   },
		   "pc":
		   {
		      name:              "pc",
		      description:       "Programm Counter",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":     {
						       name: "M2>",
						       ref:  "M2_C2",
						       description: "Input is the M2 output"
						     },
					   "out":    {
						       name: ">PC",
						       ref:  "REG_PC",
						       description: "Output goes to the T2 tristate"
						     }
					 },
		      signals:           {
					   "ctl":    {
						       name: "c2",
						       ref:  "C2",
						       description: "Confirm that input is stored"
						     }
					 },
		      states_inputs:     [ "in" ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "ir":
		   {
		      name:              "ir",
		      description:       "Instruction Register",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":     {
						       name: "IDB>",
						       ref:  "BUS_IB",
						       description: "Input is the IDB"
						     },
					   "out":    {
						       name: ">IR",
						       ref:  "REG_IR",
						       description: "Output goes to the IR selector and the CU"
						     }
					 },
		      signals:           {
					   "c3":     {
						       name: "c3",
						       ref:  "C3",
						       description: "Confirm that input is stored"
						     }
					 },
		      states_inputs:     [ "in" ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "c3" ],
		      signals_output:    [ ]
		   },
		   "rt1":
		   {
		      name:              "rt1",
		      description:       "Temporal Register 1",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":     {
						       name: "IDB>",
						       ref:  "BUS_IB",
						       description: "Input is the IDB"
						     },
					   "out":    {
						       name: ">RT1",
						       ref:  "REG_RT1",
						       description: "Output goes to the T4 tristate"
						     }
					 },
		      signals:           {
					   "ctl":    {
						       name: "c4",
						       ref:  "C4",
						       description: "Confirm that input is stored"
						     }
					 },
		      states_inputs:     [ "in" ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "rt2":
		   {
		      name:              "rt2",
		      description:       "Temporal Register 2",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":     {
						       name: "IDB>",
						       ref:  "BUS_IB",
						       description: "Input is the IDB"
						     },
					   "out":    {
						       name: ">RT2",
						       ref:  "REG_RT2",
						       description: "Output goes to the T5 tristate"
						     }
					 },
		      signals:           {
					   "ctl":    {
						       name: "c5",
						       ref:  "C5",
						       description: "Confirm that input is stored"
						     }
					 },
		      states_inputs:     [ "in" ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "rt3":
		   {
		      name:              "rt3",
		      description:       "Temporal Register 3",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":     {
						       name: "ALU>",
						       ref:  "ALU_C6",
						       description: "Input is the output of the ALU"
						     },
					   "out":    {
						       name: ">RT3",
						       ref:  "REG_RT3",
						       description: "Output goes to the T7 tristate"
						     }
					 },
		      signals:           {
					   "ctl":    {
						       name: "c6",
						       ref:  "C6",
						       description: "Confirm that input is stored"
						     }
					 },
		      states_inputs:     [ "in" ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "sr":
		   {
		      name:              "sr",
		      description:       "State Register",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "in":     {
						       name: "M7>",
						       ref:  "M7_C7",
						       description: "Input is the output of the M7"
						     },
					   "out":    {
						       name: ">SR",
						       ref:  "REG_SR",
						       description: "Output goes to the T8 input and the CU"
						     }
					 },
		      signals:           {
					   "ctl":    {
						       name: "c7",
						       ref:  "C7",
						       description: "Confirm that input is stored"
						     }
					 },
		      states_inputs:     [ "in" ],
		      states_outputs:    [ "out" ],
		      signals_inputs:    [ "ctl" ],
		      signals_output:    [ ]
		   },
		   "register_file":
		   {
		      name:              "RF",
		      description:       "Register File",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "a":     {
						       name: "A",
						       ref:  "RA_T9",
						       description: "Output of RF to  T9 and MA/0"
						    },
					   "b":     {
						       name: "B",
						       ref:  "RB_T10",
						       description: "Output of RF to T10 and MB/0"
						    },
					   "c":     {
						       name: "C",
						       ref:  "BUS_IB",
						       description: "Input to RF from IDB"
						    }
					 },
		      signals:           {
					   "ra":    {
						       name: "RA",
						       ref:  "RA",
						       description: "Select the register which value is sent to A"
						    },
					   "rb":    {
						       name: "RB",
						       ref:  "RB",
						       description: "Select the register which value is sent to B"
						    },
					   "rc":    {
						       name: "RC",
						       ref:  "RC",
						       description: "Select the register where C's value is stored"
						    },
					   "lc":    {
						       name: "LC",
						       ref:  "LC",
						       description: "Confirm that RC is going to be updated"
						    }
					 },
		      states_inputs:     [ "c" ],
		      states_outputs:    [ "a", "b" ],
		      signals_inputs:    [ "ra", "rb", "rc", "lc" ],
		      signals_output:    [ ]
		   },

		   "cpu_alu":
		   {
		      name:              "ALU",
		      description:       "Arithmetic-Logit Unit",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "a":     {
						       name: "A",
						       ref:  "MA_ALU",
						       description: "Output from MUX A multiplexor"
						    },
					   "b":     {
						       name: "B",
						       ref:  "MB_ALU",
						       description: "Output from MUX B multiplexor"
						    },
					   "alu":   {
						       name: "ALU",
						       ref:  "ALU_C6",
						       description: "Result goes to the input of T6 and RT3"
						    },
					   "flags": {
						       name: "flags",
						       ref:  "SELP_M7",
						       description: "Updated C,V,N,Z flags"
						    }
					 },
		      signals:           {
					   "cop":   {
						       name: "COP",
						       ref:  "COP",
						       description: "Operation code (+, -, *, ...)"
						    }
					 },
		      states_inputs:     [ "a", "b" ],
		      states_outputs:    [ "alu", "flags" ],
		      signals_inputs:    [ "cop" ],
		      signals_output:    [ ]
		   },


		   "select_sr":
		   {
		      name:              "select SR",
		      description:       "select SR",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_1": {
						       name: "U>",
						       ref:  "FLAG_U",
						       description: "Input 1 of SELECT-SR, U"
						    },
					   "mux_2": {
						       name: "I>",
						       ref:  "FLAG_I",
						       description: "Input 2 of SELECT-SR, I"
						    },
					   "mux_3": {
						       name: "C V N Z>",
						       ref:  "SELP_M7",
						       description: "Input 3 of SELECT-SR, C V N Z"
						    },
					   "mux_o": {
						       name: ">MUX 7/1",
						       ref:  "SELP_M7",
						       description: "Output to MUX 7/1"
						    }
					 },
		      signals:           {
					   "selp":  {
						       name: "SelP",
						       ref:  "SELP",
						       description: "Select the input value to send to the output"
						    }
					 },
		      states_inputs:     [ "mux_1", "mux_2", "mux_3" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "selp" ],
		      signals_output:    [ ]
		   },
		   "select_ir":
		   {
		      name:              "select IR",
		      description:       "select IR",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "mux_i": {
						       name: "IR>",
						       ref:  "IR",
						       description: "Input of SELECT-IR from IR"
						    },
					   "mux_o": {
						       name: ">T3",
						       ref:  "SELEC_T3",
						       description: "Output to IDB though T3"
						    }
					 },
		      signals:           {
					   "se":     {
							name: "SE",
							ref:  "SE",
							description: "Sign Extension"
						     },
					   "size":   {
							name: "SIZE",
							ref:  "SIZE",
							description: "Size"
						      },
					   "offset":  {
							name: "OFFSET",
							ref:  "OFFSET",
							description: "Offset"
						      }
					 },
		      states_inputs:     [ "mux_i" ],
		      states_outputs:    [ "mux_o" ],
		      signals_inputs:    [ "se", "size", "offset" ],
		      signals_output:    [ ]
		   },
		   "byte_selector":
		   {
		      name:              "byte selector",
		      description:       "main memory byte selector",
		      type:              "component",
		      belongs:           "cpu",
		      states:            {
					   "from_mbr":  {
							  name: "MBR",
							  ref:  "REG_MBR",
							  description: "Input from MBR"
							},
					   "from_data": {
							  name: "DATA",
							  ref:  "BUS_DB",
							  description: "Input from Data Bus"
							},
					   "be":        {
							  name: "BE",
							  ref:  "BE",
							  description: "Output to BE"
							},
					   "to_mbr":    {
							  name: "M1/1",
							  ref:  "BS_M1",
							  description: "Output to M1/1"
							},
					   "to_td":     {
							  name: "TD",
							  ref:  "BS_TD",
							  description: "Output to Td/input"
							}
					 },
		      signals:           {
					   "w":         {
							  name: "W",
							  ref:  "W",
							  description: "Write into main memory"
							},
					   "se":        {
							  name: "SE",
							  ref:  "SE",
							  description: "Sign Extension"
							},
					   "a1a0":      {
							  name: "A1A0",
							  ref:  "A1A0",
							  description: "A1A0"
							},
					   "bw":        {
							  name: "BW",
							  ref:  "BW",
							  description: "Number of bytes to pack"
							}
					 },
		      states_inputs:     [ "from_mbr", "from_data" ],
		      states_outputs:    [ "be", "to_mbr", "to_td" ],
		      signals_inputs:    [ "w", "se", "a1a0", "bw" ],
		      signals_output:    [ ]
		   },


		   "memory":
		   {
		      name:              "RAM",
		      description:       "Main memory",
		      type:              "component",
		      belongs:           "computer",
		      states:            {
					   "addr":      {
							   name: "ADDR",
							   ref:  "BUS_AB",
							   description: "Address bus"
							},
					   "data":      {
							   name: "DATA",
							   ref:  "BUS_DB",
							   description: "Data bus"
							},
					   "mrdy":      {
							   name: "MRDY",
							   ref:  "MRDY",
							   description: "Memory ready"
							}
					 },
		      signals:           {
					   "be":        {
							   name: "BE",
							   ref:  "BWA",
							   description: "BW+A1A0"
							},
					   "r":         {
							   name: "R",
							   ref:  "R",
							   description: "Read"
							},
					   "w":         {
							   name: "W",
							   ref:  "W",
							   description: "Write"
							}
					 },
		      states_inputs:     [ "addr", "data" ],
		      states_outputs:    [ "mrdy", "data" ],
		      signals_inputs:    [ "be", "r", "w" ],
		      signals_output:    [ ]
		   },

		   "keyboard":
		   {
		      name:              "keyboard",
		      description:       "Keyboard",
		      type:              "component",
		      belongs:           "computer",
		      states:            {
					   "addr":      {
							   name: "ADDR",
							   ref:  "BUS_AB",
							   description: "Address bus"
							},
					   "data":      {
							   name: "DATA",
							   ref:  "BUS_DB",
							   description: "Data bus"
							}
					 },
		      signals:           {
					   "ior":       {
							   name: "IOR",
							   ref:  "IOR",
							   description: "Read from keyboard"
							}
					 },
		      states_inputs:     [ "addr", "data" ],
		      states_outputs:    [ "data" ],
		      signals_inputs:    [ "ior" ],
		      signals_output:    [ ]
		   },
		   "display":
		   {
		      name:              "display",
		      description:       "display",
		      type:              "component",
		      belongs:           "computer",
		      states:            {
					   "addr":      {
							   name: "ADDR",
							   ref:  "BUS_AB",
							   description: "Address bus"
							},
					   "data":      {
							   name: "DATA",
							   ref:  "BUS_DB",
							   description: "Data bus"
							}
					 },
		      signals:           {
					   "ior":       {
							   name: "IOR",
							   ref:  "SCR_IOR",
							   description: ""
							},
					   "iow":       {
							   name: "IOW",
							   ref:  "SCR_IOW",
							   description: "Write into the display"
							}
					 },
		      states_inputs:     [ "addr", "data" ],
		      states_outputs:    [ "data" ],
		      signals_inputs:    [ "ior", "iow" ],
		      signals_output:    [ ]
		   },

		   "_last":
		   {
		      name:              "_last",
		      description:       "",
		      type:              "",
		      belongs:           "",
		      states:            [ ],
		      signals:           [ ],
		      states_inputs:     [ ],
		      states_outputs:    [ ],
		      signals_inputs:    [ ],
		      signals_output:    [ ]
		   }
		} ;

