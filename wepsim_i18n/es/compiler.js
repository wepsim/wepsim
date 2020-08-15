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
           "LABEL NOT FOUND":        "Se esperaba '<label>:' pero no se encontró, en su lugar: ",
           "REPEATED LABEL":         "Etiqueta repetida: ",
           "OPEN BRACE NOT FOUND":   "Se esperaba '{' pero no se encontró",
           "CLOSE BRACE NOT FOUND":  "Se esperaba '}' pero no se encontró",
           "OPEN PAREN. NOT FOUND":  "Se esperaba '(' pero no se encontró",
           "CLOSE PAREN. NOT FOUND": "Se esperaba ')' pero no se encontró",
           "COMMA NOT FOUND":        "Se esperaba ',' pero no se encontró",
           "EQUAL NOT FOUND":        "Se esperaba '=' pero no se encontró",

		'_last_':		'_last_'

    };

