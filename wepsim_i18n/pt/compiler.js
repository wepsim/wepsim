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


    i18n.eltos.compiler.pt = {

		'NO TAG OR DIRECTIVE':		'tag esperado (x :) ou directiva (.x) mas encontrou este token em vez disso:',
		'INVALID TAG FORMAT':		'A tag deve seguir um formato alfanumérico (começando com uma letra ou sublinhado):',
		'TAG OR INSTRUCTION':		'A tag não pode ter o mesmo nome que uma instrução:',
		'REPEATED TAG':		'tag repetida:',
		'NO NUMERIC DATATYPE':		'valor esperado para tipo de dados numérico, mas encontrou:',
		'NO POSITIVE NUMBER':		'Espera um número positivo, mas encontrou:',
		'NO NUMBER OF BYTES':		'Número esperado de bytes para reserva em .space (número natural), mas encontrou:',
		'INVALID ALIGN VALUE':		'Espera o parâmetro align como número positivo, mas encontrou:',
		'REMEMBER ALIGN VAL':		'Lembre-se que o número é a potência de dois para um alinhamento, consulte a documentação MIPS.',
		'NOT CLOSED STRING':		'Cadeia não é fechado (esqueci de terminá-lo com aspas)',
		'NO QUOTATION MARKS':		'string esperado entre aspas, mas encontrado:',
		'UNEXPECTED DATATYPE':		'Nome do tipo de dados inesperado:',
		'INVALID SEGMENT NAME':		'Espera .data / .text / ... segmento, mas encontrou:',
		'NO MAIN OR KMAIN':		'Tags \'principal\' ou \'kmain\' não são definidos no segmento de texto (s). É obrigatória a definir pelo menos uma dessas marcas, a fim de executar um programa',
		'UNKNOWN 1':		'Ocorreu um erro desconhecido (1)',
		'UNKNOWN 2':		'erro inesperado (2)',
		'REMEMBER I. FORMAT':		'Lembre-se que o formato de instrução tem sido definida como:',
		'SEVERAL CANDIDATES':		'Instrução e campos de combinar com mais de uma instrução possível. Por favor, verifique o microcódigo. Atualmente, o formato de instrução pode ser:',
		'NOT MATCH MICRO':		'Instrução e campos não corresponder com o formato de instrução definido',
		'CHECK MICROCODE':		'Por favor, verifique o microcódigo. Provavelmente você esqueceu de adicionar um campo, um número não se encaixa no seu espaço, ou você acabou de usar uma instrução errada',

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

