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


    i18n.eltos.compiler.zh_cn = {

		'NO TAG OR DIRECTIVE':		'预计标签（X :)或指令（.X），但发现此令牌来代替：',
		'INVALID TAG FORMAT':		'的标签，必须按照字母数字格式（以字母开头或下划线）：',
		'TAG OR INSTRUCTION':		'一个标记不能有相同的名称作为指令：',
		'REPEATED TAG':		'重复标签：',
		'NO NUMERIC DATATYPE':		'对于数字数据类型，但发现期望值：',
		'NO POSITIVE NUMBER':		'预计正数，但发现：',
		'NO NUMBER OF BYTES':		'预计数。空间（自然数），但发现字节储备：',
		'INVALID ALIGN VALUE':		'预期的那样正数，但发现对齐参数：',
		'REMEMBER ALIGN VAL':		'请记住这个数字是两个对位的力量，看到MIPS文档。',
		'NOT CLOSED STRING':		'字符串没有关闭（忘了加上引号结束它）',
		'NO QUOTATION MARKS':		'引号却发现之间期望的字符串：',
		'UNEXPECTED DATATYPE':		'意外的数据类型名称：',
		'INVALID SEGMENT NAME':		'预期。数据/的.text / ...段，但发现：',
		'NO MAIN OR KMAIN':		'标签“主”或“kmain”在文本段（一个或多个）不限定。它是强制性的定义，以执行程序的标记中的至少一个',
		'UNKNOWN 1':		'发生未知错误（1）',
		'UNKNOWN 2':		'意外的错误（2）',
		'REMEMBER I. FORMAT':		'请记住，指令格式已经被定义为：',
		'SEVERAL CANDIDATES':		'指令和字段匹配不止一个可能的指令。请检查微代码。目前，指令格式可以是：',
		'NOT MATCH MICRO':		'指令和领域不匹配定义的指令格式',
		'CHECK MICROCODE':		'请检查微代码。也许你忘了添加一个字段，一些不适合它的空间，或者你只是使用了错误指令',

           // microcode
           "LABEL NOT FOUND":        "Expected '<label>:' not found, found token: ",
           "REPEATED LABEL":         "Label is repeated: ",
           "OPEN BRACE NOT FOUND":   "Expected '{' not found",
           "CLOSE BRACE NOT FOUND":  "Expected '}' not found",
           "OPEN PAREN. NOT FOUND":  "Expected '(' not found",
           "CLOSE PAREN. NOT FOUND": "Expected ')' not found",
           "COMMA NOT FOUND":        "Expected ',' not found",
           "EQUAL NOT FOUND":        "Expected '=' not found",
           "SIGNAL NOT EXISTS":      "Signal does not exists: ",
           "SIGNAL NO DIRECTLY":     "signal cannot be used directly, please use the Control Unit signals instead.",
           "INCORRECT BIN. FORMAT":  "Incorrect binary format: ",
           "OUT OF RANGE":           "Value out of range: ",
	   "EMPTY MICROCODE":        "Empty microcode",
           "EMPTY NAME LIST":        "Empty name list for register: x=[]",
	   "DUPLICATE SP":           "Duplicate definition of stack pointer",
	   "NO SP":                  "Expected stack_pointer token not found",
	   "UNDEF. INSTR.":          "Undefined instruction: ",
           "MORE 100 FIELDS":        "More than 100 fields in a single instruction.",
	   "CO AS FIELD NAME":       "Instruction field has 'co' as name.",
	   "NW AS FIELD NAME":       "Instruction field has 'nwords' as name.",
	   "NO CO FIELD":            "Expected keyword 'co' not found",
           "INCORRECT CO BIN.":      "Incorrect binary format on 'co': ",
           "INCORRECT COP BIN.":     "Incorrect binary format on 'cop': ",

		'_last_':		'_last_'

    };

