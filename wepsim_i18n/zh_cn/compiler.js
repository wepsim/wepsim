/*
 *  Copyright 2015-2024 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

	        "PROBLEM AROUND LINE":          "繞線問題",
		'NO TAG OR DIRECTIVE':		'期望tag或指令却发现此令牌来代替：',
		'NO TAG, DIR OR INS':		'找不到有效的标记（例如：tag1 :)指令（例如：.data）或指令：',
		'INVALID TAG FORMAT':		'的标签，必须按照字母数字格式（以字母开头或下划线）：',
		'TAG OR INSTRUCTION':		'一个标记不能有相同的名称作为指令：',
		'REPEATED TAG':			'重复标签：',
		'NO NUMERIC DATATYPE':		'对于数字数据类型，但发现期望值：',
		'NO POSITIVE NUMBER':		'预计正数，但发现：',
		'NO NUMBER OF BYTES':		'字节的预期数量。空间中保留，但发现：',
		'INVALID ALIGN VALUE':		'预期的那样正数，但发现对齐参数：',
		'REMEMBER ALIGN VAL':		'请记住这个数字是两个对位的力量，看到MIPS文档。',
		'NOT CLOSED STRING':		'字符串没有关闭（忘了加上引号结束它）',
		'NO QUOTATION MARKS':		'引号却发现之间期望的字符串：',
		'UNEXPECTED DATATYPE':		'意外的数据类型名称：',
		'INVALID SEGMENT NAME':		'预期。数据/的.text / ...段，但发现：',
		'NO MAIN OR KMAIN':		'标签“主”或“kmain”在文本段（一个或多个）不限定。它是强制性的定义，以执行程序的标记中的至少一个',
		'UNKNOWN 1':			'对于场类型发生未知错误（1）：',
		'UNKNOWN 2':			'意外的错误（2）',
	        'EMPTY OBJECT CODE':	        '空目標代碼',
		'REMEMBER FORMAT USED':		'这是用于的指令格式 ',
		'REMEMBER I. FORMAT':		'请记住，指令格式已经被定义为：',
		'SEVERAL CANDIDATES':		'指令和字段匹配多个微。请检查微代码。目前，指令格式可以是：',
		'NOT MATCH FORMAT':		'指令和字段與定義的格式不匹配 ',
		'NOT MATCH MICRO':		'指令字段不匹配与微。',
		'CHECK MICROCODE':		'请查看微代码。',
                'CHECKS':               	'您可能忘记添加/删除字段、数字超出范围、使用了错误的指令等。',
		'LABEL NOT DEFINED':		'使用的标记，但不是在汇编代码中定义：',
                "INS. MISSING FIELD":   	"指令中缺少字段",
                "UNEXPECTED (REG)":     	"预期的套准但在括号之间找到了套准.",
                "EXPECTED (REG)":       	"括号之间的预期寄存器，但是找到了: ",
                "EXPECTED REG":         	"预期的寄存器（$1，...）但找到了: ",
                'UNKNOWN ESCAPE CHAR':          '未知的转义字符',
                'SPACE FOR # BITS':             " 二进制位，但只有空间 ",
                'NEEDS':                        ' 需要 ',
                'UNKNOWN MC FORMAT':            "(unknown format in microcode)",

           // microcode
		'LABEL NOT FOUND':		'预期“<标签>：”没有找到，发现令牌：',
		'REPEATED LABEL':		'标签重复：',
		'INVALID LABEL FORMAT':		'标签格式无效：',
		'OPEN BRACE NOT FOUND':		'预计“{”未找到',
		'CLOSE BRACE NOT FOUND':	'预计“}”未找到',
		'OPEN PAREN. NOT FOUND':	'预期“（”未找到',
		'CLOSE PAREN. NOT FOUND':	'预计“）”未找到',
		'COMMA NOT FOUND':		'预计“”未找到',
		'EQUAL NOT FOUND':		'预计“=”未找到',
		'SIGNAL NOT EXISTS':		'信号不存在：',
		'SIGNAL NO DIRECTLY':		'信号不能直接使用，请使用控制单元的信号来代替。',
		'INCORRECT BIN. FORMAT':	'不正确的二进制格式：',
		'OUT OF RANGE':			'值范围进行：',
		'EMPTY MICROCODE':		'空微',
		'EMPTY NAME LIST':		'为寄存器空名称列表：X = []',
		'DUPLICATE SP':			'堆栈指针的重复定义',
		'NO SP':			'预计stack_pointer令牌未找到',
		'UNDEF. INSTR.':		'未定义指令：',
		'MORE 100 FIELDS':		'超过100名的字段中的单个指令。',
		'CO AS FIELD NAME':		'指令字段有“合作”作为名称。',
		'NW AS FIELD NAME':		'指令字段“nwords”作为名称。',
		'NO CO FIELD':			'预计关键字“联合”未找到',
		'INCORRECT CO BIN.':		'对“合作”不正确的二进制格式：',
		'INCORRECT COP BIN.':		'在“警察”不正确的二进制格式：',
		'INVALID PARAMETER':		'无效的参数：',
		'ALLOWED PARAMETER':		'它仅允许以下字段：REG，NUM，INM，地址，地址',
		'MISSING TOKEN ON':		'“令牌”是后“（”失踪：',
		'MISSING ) ON':			'“）”缺少的：',
		'CO ALREADY USED':		'“合作”已被使用：',
		'CO+COP ALREADY USED':		'“共同+ OP”已被使用的条件：',
		'NO NWORDS':			'预计关键字“nwords”未找到',
		'INCORRECT ADDRESSING':		'地址不正确（绝对或相对）的类型',
		'UNEXPECTED FIELD':		'意外发现场：',
                'CHECK ORDER':                  '请检查字段的顺序 ',
		'STARTBIT OoR':			'起始位的范围的：',
		'STOPBIT OoR':			'STOPBIT超出范围：',
		'OVERLAPPING FIELD':		'重叠的领域：',
		'BAD COP BIN. LEN.':		'关于“警察”不正确的二进制长度：',
		'SP NOT DEFINED':		'没有定义堆栈指针寄存器',
		'NO LABEL FETCH':		'标签“取”没有定义',
		'NO LABEL BEGIN':		'“开始”未找到',
		'NO CO CODES':			'没有可用于指示足够的“合作”码',
		'NO LABEL MADDR':		'MADDR标签未找到：',
		'INS. NAME':			'指令名：',
		'NOT VALID FOR':		'“是无效的：',
		'BIGGER THAN':			'比我的大',
		'BITS':				'位',
		'EXPECTED VALUE':		'预期值，在一个千篇一律“',
		'BUT INSERTED':			'但插入',
		'INSTEAD':			'代替',

           	"BAD EOC BIN. LEN.":			"eoc 字段的位數不正確",
           	"BIT OoR":				"Bit OoR",
           	"COLON NOT FOUND":			"： 未找到",
           	"COLON OR PIPE NOT FOUND":		": 或 |未找到",
           	"INCORRECT EOC BIN.":			"eoc 二進製文件不正確",
           	"INCORRECT OC BIN.":			" oc 二進製文件不正確",
           	"NO FIELD":				"No field",
           	"NO OC FIELD":				"No oc field",
           	"OC ALREADY USED":			"oc已经使用了",
           	"OC+EOC ALREADY USED":			"oc+eoc 已使用",

		'_last_':			'_last_'

    };

