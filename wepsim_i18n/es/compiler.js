/*
 *  Copyright 2015-2023 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
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

	        "PROBLEM AROUND LINE":          "Problema entorno a la línea",
		'NO TAG OR DIRECTIVE':		'No es una etiqueta (ej.: tag1:) o directiva (ej.: .data) válida, se encontró: ',
		'NO TAG, DIR OR INS':		'No es una etiqueta (ej.: tag1:) directiva (ej.: .data) o instrucción válida, se encontró: ',
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
		'REMEMBER FORMAT USED':		'Este es el formato de instrucción usado para ',
		'REMEMBER I. FORMAT':		'Recuerde que el formato de instrucción se ha definido como: ',
		'SEVERAL CANDIDATES':		'Instrucción y campos coincide con más de una instrucción posible. Por favor, compruebe el microcódigo. En la actualidad, el formato de la instrucción puede ser: ',
		'NOT MATCH FORMAT':		'Instrucción y campos no coinciden con el/los formato(s) de instrucción definido(s) ',
		'NOT MATCH MICRO':		'Instrucción y campos no coinciden con el formato de instrucción definido. ',
		'CHECK MICROCODE':		'Por favor, compruebe el microcódigo. ',
                'CHECKS':               	'Probablemente se olvidó añadir/quitar un campo, un número no encaja en su rango, se usa una instrucción equivocada, etc.',
                "LABEL NOT DEFINED":    	"Etiqueta usada pero no definida en el código ensamblador: ",
		'INS. MISSING FIELD':		'Falta un campo en la instrucción',
		'UNEXPECTED (REG)':		'Se esperaba un registro pero se encontró un registro entre paréntesis.',
		'EXPECTED (REG)':		'Registro esperado entre paréntesis, pero se encontró: ',
		'EXPECTED REG':			'Se esperaba un registro (e.g.: $1/$a0/...) pero se encontró: ',
                'UNKNOWN ESCAPE CHAR':          'Secuencia de escape desconocida',
                'SPACE FOR # BITS':             " bits en binario pero hay espacio para solo ",
                'NEEDS':                        ' necesita ',
                'UNKNOWN MC FORMAT':            "(unknown format in microcode)",

           // microcode
           "LABEL NOT FOUND":        "Esperada '<etiqueta>:' no encontrada, se encontró: ",
           "REPEATED LABEL":         "Etiqueta repetida: ",
           "INVALID LABEL FORMAT":   "Formato de etiqueta no válido para: ",
           "OPEN BRACE NOT FOUND":   "Esperado '{' no encontrado",
           "CLOSE BRACE NOT FOUND":  "Esperado '}' no encontrado",
           "OPEN PAREN. NOT FOUND":  "Esperado '(' no encontrado",
           "CLOSE PAREN. NOT FOUND": "Esperado ')' no encontrado",
           "COMMA NOT FOUND":        "Esperado ',' no encontrado",
           "EQUAL NOT FOUND":        "Esperado '=' no encontrado",
           "SIGNAL NOT EXISTS":      "Señal no existente: ",
           "SIGNAL NO DIRECTLY":     " no puede usarse directamente, por favor use las señales de la Unidad de Control en su lugar para generarlas.",
           "INCORRECT BIN. FORMAT":  "Formato binario incorrecto: ",
           "OUT OF RANGE":           "Valor fuera de rango: ",
	   "EMPTY MICROCODE":        "No hay microcódigo",
           "EMPTY NAME LIST":        "Lista vacía de nombres asociada al registro: x=[]",
	   "DUPLICATE SP":           "Definición de puntero de pila duplicada",
	   "NO SP":                  "Esperado token stack_pointer no encontrado",
	   "UNDEF. INSTR.":          "Instrucción no definida: ",
           "MORE 100 FIELDS":        "Más de 100 campos en una sola instrucción.",
	   "CO AS FIELD NAME":       "Campo de instrucción tiene 'co' como nombre.",
	   "NW AS FIELD NAME":       "Campo de instrucción tiene 'nwords' como nombre.",
	   "NO CO FIELD":            "Esperada palabra clave 'co' no encontrada",
           "INCORRECT CO BIN.":      "Formato binary incorrecto en 'co': ",
           "INCORRECT COP BIN.":     "Formato binary incorrecto en 'cop': ",
           "INVALID PARAMETER":      "Parámetro invalido: ",
           "ALLOWED PARAMETER":      "Solo se permite los siguientes campos: reg, num, inm, addr, address",
           "MISSING TOKEN ON":       "'token' no está despues de '(' en: ",
           "MISSING ) ON":           "')' no se encuentra en: ",
           "CO ALREADY USED":        "'co' ya se está usando por: ",
           "CO+COP ALREADY USED":    "'co+cop' is already been used by: ",
           "NO NWORDS":              "Palabra clave 'nwords' esperado no encontrada",
           "INCORRECT ADDRESSING":   "Tipo de direccionamiento incorrecto (abs o rel)",
           "UNEXPECTED FIELD":       "Encontrado un campo no esperado: ",
           "CHECK ORDER":            "Por favor compruebe el orden de los campos",
           "STARTBIT OoR":           "startbit fuera de rango: ",
           "STOPBIT OoR":            "stopbit fuera de rango: ",
           "OVERLAPPING FIELD":      "Campos que se solapan: ",
           "BAD COP BIN. LEN.":      "Longitud binaria incorrecta para 'cop': ",
           "SP NOT DEFINED":         "Registro puntero de pila no definido",
           "NO LABEL FETCH":         "Etiqueta 'fetch' no definida",
           "NO LABEL BEGIN":         "'begin' no encontrado",
           "NO CO CODES":            "No hay códigos suficientes en 'co' para instrucciones",
           "NO LABEL MADDR":         "Etiqueta MADDR no encontrada: ",
           "INS. NAME":              "Nombre de instrucción: '",
           "NOT VALID FOR":          "' no es válido para: ",
           "BIGGER THAN":            "es mayor que ",
           "BITS":                   " bits",
           "EXPECTED VALUE":         "Valor se esperaba que quepa en un '",
           "BUT INSERTED":           "pero insertado ",
           "INSTEAD":                "en su lugar",

           "BAD EOC BIN. LEN.":				"número incorrecto de bits para el campo eoc",
           "BIT OoR":					"bit OoR",
           "COLON NOT FOUND":				"falta ':'",
           "COLON OR PIPE NOT FOUND":			"falta ':' o '|'",
           "INCORRECT EOC BIN.":			"binario incorrecto para eoc",
           "INCORRECT OC BIN.":				"binario incorrecto para oc",
           "NO FIELD":					"falta campo",
           "NO OC FIELD":				"falta campo oc",
           "OC ALREADY USED":				"campo oc ya usado",
           "OC+EOC ALREADY USED":			"oc+eoc ya usados",

	   '_last_':		     '_last_'

    };

