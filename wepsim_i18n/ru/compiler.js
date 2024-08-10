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


    i18n.eltos.compiler.ru = {

	        "PROBLEM AROUND LINE":          "Проблема вокруг линии",
		'NO TAG OR DIRECTIVE':		'Ожидаемый тег или директива, но нашел этот маркер вместо этого: ',
		'NO TAG, DIR OR INS':		'Обнаружен недействительный тег (например: tag1 :) директива (например: .data) или инструкция: ',
		'INVALID TAG FORMAT':		'Тег должен следовать буквенно-цифровому формату (начиная с буквой или подчеркиванием): ',
		'TAG OR INSTRUCTION':		'Тег не может иметь такое же имя, как и инструкция: ',
		'REPEATED TAG':			'Повторные теги: ',
		'NO NUMERIC DATATYPE':		'Ожидаемое значение числового типа данных, но найдено: ',
		'NO POSITIVE NUMBER':		'Ожидаемое положительное число, но было найдено: ',
		'NO NUMBER OF BYTES':		'Ожидаемое количество байтов для резервирования в .space но найдено: ',
		'INVALID ALIGN VALUE':		'Ожидаемое выравнивать параметр как положительное число, но было найдено: ',
		'REMEMBER ALIGN VAL':		'Помните, что число является степенью двойки для выравнивания см MIPS документации.',
		'NOT CLOSED STRING':		'Строка не закрыта (забыл закончить его в кавычки)',
		'NO QUOTATION MARKS':		'Ожидаемая строка в кавычках, но найдено: ',
		'UNEXPECTED DATATYPE':		'Неожиданное имя типа данных: ',
		'INVALID SEGMENT NAME':		'Ожидаемое .data / .text / ... сегмент, но нашел: ',
		'NO MAIN OR KMAIN':		'Метки «главный» или «KMAIN» не определены в текстовом сегменте (с). В обязательном порядке определить по крайней мере один из этих тегов для того, чтобы выполнить программу',
		'UNKNOWN 1':			'Произошла неизвестная ошибка (1) для типа поля: ',
		'UNKNOWN 2':			'Неожиданная ошибка (2)',
	        'EMPTY OBJECT CODE':	        'Пустой объектный код',
		'REMEMBER FORMAT USED':		'Это формат инструкций, используемый для ',
		'REMEMBER I. FORMAT':		'Помните, что формат команды был определен как: ',
		'SEVERAL CANDIDATES':		'Инструкция и полей совпадают с более чем одной микропрограммой. Пожалуйста, проверьте микрокод. В настоящее время формат команды может быть: ',
		'NOT MATCH FORMAT':		'Инструкция и поля не соответствуют заданному формату(ам) ',
		'NOT MATCH MICRO':		'Инструкция и поля не совпадают с микропрограммой. ',
		'CHECK MICROCODE':		'Пожалуйста, проверьте микрокод. ',
                'CHECKS':               	'Возможно, вы забыли добавить/удалить поле, число находится за пределами допустимого диапазона, использовалась неправильная инструкция и т. д.',
		'LABEL NOT DEFINED':		'Этикетка используется, но не определена в коде сборки: ',
		'INS. MISSING FIELD':		'Отсутствует поле в инструкции',
		'UNEXPECTED (REG)':		'Ожидаемый регистр, но нашел регистр между круглыми скобками.',
		'EXPECTED (REG)':		'Ожидаемый регистр между круглыми скобками, но найдено: ',
		'EXPECTED REG':			'Ожидаемый регистр (например.: $1/$a0/...), но найдено: ',
                'UNKNOWN ESCAPE CHAR':          'Неизвестный побег',
                'SPACE FOR # BITS':             " бит в двоичном формате, но есть место только для ",
                'NEEDS':                        ' это нужно ',
                'UNKNOWN MC FORMAT':            "(unknown format in microcode)",

           	// microcode
		'LABEL NOT FOUND':		'Ожидаемое <метка>: \'не найден, найден маркер: ',
		'REPEATED LABEL':		'Этикетка повторяется: ',
		'INVALID LABEL FORMAT':		'Формат этикетки не действителен для: ',
		'OPEN BRACE NOT FOUND':		'Ожидаемая «{» не найден',
		'CLOSE BRACE NOT FOUND':	'Ожидаемая «}» не найден',
		'OPEN PAREN. NOT FOUND':	'Ожидаемые «(» не найден',
		'CLOSE PAREN. NOT FOUND':	'Ожидаемая «)» не найден',
		'COMMA NOT FOUND':		'Ожидаемые «» не найден',
		'EQUAL NOT FOUND':		'Ожидаемое «=» не найден',
		'SIGNAL NOT EXISTS':		'Сигнал не существует: ',
		'SIGNAL NO DIRECTLY':		'сигнал не может быть использован непосредственно, пожалуйста, используйте сигналы Блок управления вместо этого.',
		'INCORRECT BIN. FORMAT':	'Некорректный двоичный формат: ',
		'OUT OF RANGE':			'Значение вне диапазона: ',
		'EMPTY MICROCODE':		'Пустой микрокода',
		'EMPTY NAME LIST':		'Пустой список имен для регистра: х = []',
		'DUPLICATE SP':			'Дубликат определение указателя стека',
		'NO SP':			'Ожидаемая stack_pointer лексема не найден',
		'UNDEF. INSTR.':		'Неопределенная инструкция: ',
		'MORE 100 FIELDS':		'Более 100 полей в одной команде.',
		'CO AS FIELD NAME':		'Инструкция поле имеет «со» в качестве имени.',
		'NW AS FIELD NAME':		'Инструкция поле имеет «nwords» как имя.',
		'NO CO FIELD':			'Ожидаемое ключевое слово «со» не найден',
		'INCORRECT CO BIN.':		'Некорректный двоичный формат на «со»: ',
		'INCORRECT COP BIN.':		'Некорректный двоичный формат на «полицейский»: ',
		'INVALID PARAMETER':		'Неверный параметр: ',
		'ALLOWED PARAMETER':		'Это позволяет только следующие поля: Reg, NUM, INM, адр, адрес',
		'MISSING TOKEN ON':		'«Маркер» отсутствует после того, как «(» на: ',
		'MISSING ) ON':			'«)» Отсутствует на: ',
		'CO ALREADY USED':		'«Со» уже были использованы: ',
		'CO+COP ALREADY USED':		'«Со + оп» уже был использован: ',
		'NO NWORDS':			'Ожидаемые ключевое слово «nwords» не найдено',
		'INCORRECT ADDRESSING':		'Тип адресации неправильные (ABS или REL)',
		'UNEXPECTED FIELD':		'Неожиданное поле найдено: ',
                'CHECK ORDER':                  'Пожалуйста, проверьте порядок полей',
		'STARTBIT OoR':			'startbit вне диапазона: ',
		'STOPBIT OoR':			'стоповый бит из диапазона: ',
		'OVERLAPPING FIELD':		'Перекрытие поля: ',
		'BAD COP BIN. LEN.':		'Неправильная бинарная длина «полицейский»: ',
		'SP NOT DEFINED':		'Стек регистр указатель не был определен',
		'NO LABEL FETCH':		'Метка «выборки» не определен',
		'NO LABEL BEGIN':		'«Начать» не найден',
		'NO CO CODES':			'Существует не достаточно «со» кодов для инструкций',
		'NO LABEL MADDR':		'MADDR метка не найдена: ',
		'INS. NAME':			'Название команды: \'',
		'NOT VALID FOR':		'\'Не является допустимым для: ',
		'BIGGER THAN':			'больше, чем',
		'BITS':				'биты',
		'EXPECTED VALUE':		'Ожидаемое значение, которое помещается в \'',
		'BUT INSERTED':			'но вставлено',
		'INSTEAD':			'вместо',

           	"BAD EOC BIN. LEN.":			"неправильное количество бит в поле eoc",
           	"BIT OoR":				"Bit OoR",
           	"COLON NOT FOUND":			": не найдено",
           	"COLON OR PIPE NOT FOUND":		": или | не найдено",
           	"INCORRECT EOC BIN.":			"Неправильный двоичный файл eoc",
           	"INCORRECT OC BIN.":			"Неправильный двоичный файл  oc",
           	"NO FIELD":				"No field",
           	"NO OC FIELD":				"No oc field",
           	"OC ALREADY USED":			"ок уже использовал",
           	"OC+EOC ALREADY USED":			"oc+eoc уже использовано",

		'_last_':			'_last_'

    };

