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


    i18n.eltos.compiler.de = {

		'NO TAG OR DIRECTIVE':		'Erwartete Tag (x :) oder Richtlinie (.x) fand aber dieses Token statt:',
		'INVALID TAG FORMAT':		'Ein Tag muss ein alphanumerisches Format (beginnend mit einem Buchstaben oder Unterstrich) wie folgt vor:',
		'TAG OR INSTRUCTION':		'Ein Tag kann nicht die gleichen Namen wie ein Befehl:',
		'REPEATED TAG':		'Wiederholte tag:',
		'NO NUMERIC DATATYPE':		'Erwartungswert für numerischen Datentyp aber gefunden:',
		'NO POSITIVE NUMBER':		'Erwartet eine positive Zahl aber gefunden:',
		'NO NUMBER OF BYTES':		'Erwartete Anzahl von Bytes Reserve in .space (natürliche Zahl), aber gefunden:',
		'INVALID ALIGN VALUE':		'Erwartet die align Parameter als positive Zahl aber gefunden:',
		'REMEMBER ALIGN VAL':		'Denken Sie daran, dass die Zuständigkeit dafür übertragen von zwei für die Ausrichtung ist, siehe MIPS-Dokumentation.',
		'NOT CLOSED STRING':		'String ist nicht geschlossen (vergessen Sie es mit Anführungszeichen zu beenden)',
		'NO QUOTATION MARKS':		'Erwartetes Zeichenfolge zwischen Anführungszeichen aber gefunden:',
		'UNEXPECTED DATATYPE':		'Unerwartete Datentyp Name:',
		'INVALID SEGMENT NAME':		'Erwartete .data / .text / ... Segment aber gefunden:',
		'NO MAIN OR KMAIN':		'Tags \'main\' oder \'kmain\' ist nicht im Text-Segment (en) definiert ist. Es ist Pflicht, mindestens eines dieses Tags zu definieren, um ein Programm auszuführen,',
		'UNKNOWN 1':		'Ein unbekannter Fehler aufgetreten ist (1)',
		'UNKNOWN 2':		'Unerwarteter Fehler (2)',
		'REMEMBER I. FORMAT':		'Denken Sie daran, dass das Befehlsformat hat wie definiert:',
		'SEVERAL CANDIDATES':		'Instruktion und Felder übereinstimmen mit mehr als einer möglichen Anweisung. Bitte überprüfen Sie das Mikro. Derzeit kann das Befehlsformat sein:',
		'NOT MATCH MICRO':		'Instruktion und Felder nicht mit dem definierten Befehlsformat entsprechen',
		'CHECK MICROCODE':		'Bitte überprüfen Sie das Mikro. Wahrscheinlich vergessen Sie ein Feld hinzufügen, wird eine Zahl von nicht in seinem Raum passen, oder Sie einfach eine falsche Anweisung verwendet',

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

