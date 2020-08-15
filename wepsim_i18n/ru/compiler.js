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


    i18n.eltos.compiler.ru = {

		'NO TAG OR DIRECTIVE':		'Ожидаемая метка (х :) или директива (.x), но нашел этот маркер вместо этого:',
		'INVALID TAG FORMAT':		'Тег должен следовать буквенно-цифровому формату (начиная с буквой или подчеркиванием):',
		'TAG OR INSTRUCTION':		'Тег не может иметь такое же имя, как и инструкция:',
		'REPEATED TAG':		'Повторные теги:',
		'NO NUMERIC DATATYPE':		'Ожидаемое значение числового типа данных, но найдено:',
		'NO POSITIVE NUMBER':		'Ожидаемое положительное число, но было найдено:',
		'NO NUMBER OF BYTES':		'Ожидаемое число зарезервированных байт в .space (натуральное число), но найдено:',
		'INVALID ALIGN VALUE':		'Ожидаемое выравнивать параметр как положительное число, но было найдено:',
		'REMEMBER ALIGN VAL':		'Помните, что число является степенью двойки для выравнивания см MIPS документации.',
		'NOT CLOSED STRING':		'Строка не закрыта (забыл закончить его в кавычки)',
		'NO QUOTATION MARKS':		'Ожидаемая строка в кавычках, но найдено:',
		'UNEXPECTED DATATYPE':		'Неожиданное имя типа данных:',
		'INVALID SEGMENT NAME':		'Ожидаемое .data / .text / ... сегмент, но нашел:',
		'NO MAIN OR KMAIN':		'Метки «главный» или «KMAIN» не определены в текстовом сегменте (с). В обязательном порядке определить по крайней мере один из этих тегов для того, чтобы выполнить программу',
		'UNKNOWN 1':		'Произошла неизвестная ошибка (1)',
		'UNKNOWN 2':		'Неожиданная ошибка (2)',
		'REMEMBER I. FORMAT':		'Помните, что формат команды был определен как:',
		'SEVERAL CANDIDATES':		'Инструкция и полей совпадают с более чем одной возможной инструкцией. Пожалуйста, проверьте микрокод. В настоящее время формат команды может быть:',
		'NOT MATCH MICRO':		'Инструкция и поля не совпадают с заданным форматом команд',
		'CHECK MICROCODE':		'Пожалуйста, проверьте микрокод. Возможно, вы забыли добавить поле, число не помещается в пространстве, или вы просто использовали неправильную инструкцию',

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

