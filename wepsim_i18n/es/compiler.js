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


    i18n.eltos.compiler.es = {

		'NO TAG OR DIRECTIVE':		'Se esperaba etiqueta (x :) o directiva (.x), pero encontrado este token en su lugar: ',
		'INVALID TAG FORMAT':		'Una etiqueta debe seguir un formato alfanumérico (comenzando con una letra o un guión bajo): ',
		'TAG OR INSTRUCTION':		'Una etiqueta no puede tener el mismo nombre que una instrucción: ',
		'REPEATED TAG':		        'Etiqueta repetida: ',
		'NO NUMERIC DATATYPE':		'Se esperaba un valor para el tipo de datos numéricos, pero se encontró: ',
		'NO POSITIVE NUMBER':		'Se esperaba un número positivo, pero se encontró: ',
		'NO NUMBER OF BYTES':		'Se esperaba un número natural para los bytes a reservar en .space, pero se encontró: ',
		'INVALID ALIGN VALUE':		'Se esperaba que el parámetro align sea un número positivo, pero se encontró: ',
		'REMEMBER ALIGN VAL':		'Recuerde que el número para .align será una potencia de dos, consulte la documentación de MIPS',
		'NOT CLOSED STRING':		'La cadena de caracteres no está cerrada (posiblemente se olvidó de terminar con comillas)',
		'NO QUOTATION MARKS':		'Cadena prevista entre comillas, pero encontrado: ',
		'UNEXPECTED DATATYPE':		'Inesperada nombre de tipo de datos: ',
		'INVALID SEGMENT NAME':		'Se espera un segmento .data/.text/..., pero se encontró: ',
		'NO MAIN OR KMAIN':		'Tags \'main\' o \'kmain\' no están definidos en el segmento de texto (s). Es obligatorio para definir al menos una de esas etiquetas con el fin de ejecutar un programa',
		'UNKNOWN 1':			'Se produjo un error desconocido (1)',
		'UNKNOWN 2':			'Error inesperado (2)',
		'REMEMBER I. FORMAT':		'Recuerde que el formato de instrucción se ha definido como: ',
		'SEVERAL CANDIDATES':		'Instrucción y campos coincide con más de una instrucción posible. Por favor, compruebe el microcódigo. En la actualidad, el formato de la instrucción puede ser: ',
		'NOT MATCH MICRO':		'Instrucción y campos no coinciden con el formato de instrucción definido',
		'CHECK MICROCODE':		'Por favor, compruebe el microcódigo. Probablemente se olvidó de agregar un campo, un número no encaja en su espacio, o simplemente usa una instrucción equivocada',

           // microcode
           "LABEL NOT FOUND":        "Esperada '<etiqueta>:' no encontrada, se encontr'o: ",
           "REPEATED LABEL":         "Etiqueta repetida: ",
           "INVALID LABEL FORMAT":   "Formato de etiqueta no v'alido para: ",
           "OPEN BRACE NOT FOUND":   "Esperado '{' no encontrado",
           "CLOSE BRACE NOT FOUND":  "Esperado '}' no encontrado",
           "OPEN PAREN. NOT FOUND":  "Esperado '(' no encontrado",
           "CLOSE PAREN. NOT FOUND": "Esperado ')' no encontrado",
           "COMMA NOT FOUND":        "Esperado ',' no encontrado",
           "EQUAL NOT FOUND":        "Esperado '=' no encontrado",
           "SIGNAL NOT EXISTS":      "Señal no existente: ",
           "SIGNAL NO DIRECTLY":     "signal cannot be used directly, please use the Control Unit signals instead.",
           "INCORRECT BIN. FORMAT":  "Incorrect binary format: ",
           "OUT OF RANGE":           "Valor fuera de rango: ",
	   "EMPTY MICROCODE":        "No hay microc'odigo",
           "EMPTY NAME LIST":        "Empty name list for register: x=[]",
	   "DUPLICATE SP":           "Duplicate definition of stack pointer",
	   "NO SP":                  "Expected stack_pointer token not found",
	   "UNDEF. INSTR.":          "Instrucci'on no definida: ",
           "MORE 100 FIELDS":        "More than 100 fields in a single instruction.",
	   "CO AS FIELD NAME":       "Instruction field has 'co' as name.",
	   "NW AS FIELD NAME":       "Instruction field has 'nwords' as name.",
	   "NO CO FIELD":            "Expected keyword 'co' not found",
           "INCORRECT CO BIN.":      "Incorrect binary format on 'co': ",
           "INCORRECT COP BIN.":     "Incorrect binary format on 'cop': ",
           "INVALID PARAMETER":      "Invalid parameter: ",
           "ALLOWED PARAMETER":      "It only allows the following fields: reg, num, inm, addr, address",
           "MISSING TOKEN ON":       "'token' is missing after '(' on: ",
           "MISSING ) ON":           "')' is missing on: ",
           "CO ALREADY USED":        "'co' is already been used by: ",
           "CO+COP ALREADY USED":    "'co+cop' is already been used by: ",
           "NO NWORDS":              "Expected keyword 'nwords' not found",
           "INCORRECT ADDRESSING":   "Type of addressing incorrect (abs or rel)",
           "UNEXPECTED FIELD":       "Unexpected field found: ",
           "STARTBIT OoR":           "startbit out of range: ",
           "STOPBIT OoR":            "stopbit out of range: ",
           "OVERLAPPING FIELD":      "Overlapping field: ",
           "BAD COP BIN. LEN.":      "Incorrect binary length for 'cop': ",
           "SP NOT DEFINED":         "Stack pointer register was not defined",
           "NO LABEL FETCH":         "Label 'fetch' not defined",
           "NO LABEL BEGIN":         "'begin' not found",
           "NO CO CODES":            "There is not enough 'co' codes available for instructions",
           "NO LABEL MADDR":         "MADDR label not found: ",
           "INS. NAME":              "Instruction name: '",
           "NOT VALID FOR":          "' is not valid for: ",
           "BIGGER THAN":            "is bigger than ",
           "BITS":                   " bits",
           "EXPECTED VALUE":         "Expected value that fits in a '",
           "BUT INSERTED":           "but inserted ",
           "INSTEAD":                "instead",

	   '_last_':		     '_last_'

    };

